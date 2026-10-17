import { Router } from "express";
import { PrismaClient, Prisma } from "@prisma/client";
import { asyncHandler } from "../middleware/auth.js";

const router = Router();
const prisma = new PrismaClient();

const SLOT_DURATION = 30;

function generateSlots(start, end, duration) {
  const slots = [];
  const [sh, sm] = start.split(":").map(Number);
  const [eh, em] = end.split(":").map(Number);
  let t = sh * 60 + sm;
  const endMin = eh * 60 + em;
  while (t + duration <= endMin) {
    slots.push(
      `${String(Math.floor(t / 60)).padStart(2, "0")}:${String(t % 60).padStart(2, "0")}`
    );
    t += duration;
  }
  return slots;
}

function timeToMin(t) {
  const [h, m] = String(t).split(":").map(Number);
  return h * 60 + m;
}

router.get(
  "/services",
  asyncHandler(async (_req, res) => {
    const categories = await prisma.serviceCategory.findMany({
      where: { active: true },
      orderBy: { displayOrder: "asc" },
      include: {
        services: {
          where: { active: true },
          orderBy: { displayOrder: "asc" },
          select: {
            id: true,
            name: true,
            slug: true,
            description: true,
            tagline: true,
            icon: true,
            featured: true,
          },
        },
      },
    });
    res.json(categories.filter((c) => c.services.length > 0));
  })
);

router.get(
  "/services/:slug",
  asyncHandler(async (req, res) => {
    const service = await prisma.service.findFirst({
      where: { slug: req.params.slug, active: true },
      include: { category: true },
    });
    if (!service) return res.status(404).json({ error: "Service not found" });
    res.json(service);
  })
);

router.get(
  "/services/:slug/questionnaire",
  asyncHandler(async (req, res) => {
    const service = await prisma.service.findUnique({
      where: { slug: req.params.slug },
    });
    if (!service) return res.status(404).json({ error: "Service not found" });

    const questionnaire = await prisma.questionnaire.findFirst({
      where: { serviceId: service.id, active: true },
      include: {
        questions: { where: { active: true }, orderBy: { displayOrder: "asc" } },
      },
    });

    if (!questionnaire) {
      const general = await prisma.questionnaire.findFirst({
        where: { serviceId: null, active: true },
        include: {
          questions: { where: { active: true }, orderBy: { displayOrder: "asc" } },
        },
      });
      return res.json(general);
    }
    res.json(questionnaire);
  })
);

router.get(
  "/doctors",
  asyncHandler(async (_req, res) => {
    const doctors = await prisma.doctor.findMany({
      where: { active: true },
      orderBy: { name: "asc" },
      select: {
        id: true,
        name: true,
        qualification: true,
        specialization: true,
        bio: true,
        photoUrl: true,
      },
    });
    res.json(doctors);
  })
);

router.get(
  "/schedules/:doctorId/slots",
  asyncHandler(async (req, res) => {
    const { date } = req.query;
    const doctorId = Number(req.params.doctorId);

    if (!/^\d{4}-\d{2}-\d{2}$/.test(date || "")) {
      return res.status(400).json({ error: "Valid date (YYYY-MM-DD) is required" });
    }

    const doctor = await prisma.doctor.findUnique({ where: { id: doctorId } });
    if (!doctor || !doctor.active) return res.status(404).json({ error: "Doctor not found" });

    const dayOfWeek = new Date(date + "T00:00:00").getDay();
    const schedules = await prisma.doctorSchedule.findMany({
      where: { doctorId, dayOfWeek },
      orderBy: { startTime: "asc" },
    });

    const exceptions = await prisma.scheduleException.findMany({
      where: { doctorId, date },
    });

    const booked = await prisma.appointment.findMany({
      where: {
        doctorId,
        date,
        status: { notIn: ["CANCELLED", "NO_SHOW"] },
      },
      select: { startTime: true },
    });
    const bookedTimes = new Set(booked.map((b) => b.startTime));

    const excluded = new Set();
    const allDayOff = exceptions.some((e) => e.allDay);
    for (const e of exceptions) {
      if (e.allDay) continue;
      const from = timeToMin(e.fromTime || "00:00");
      const to = timeToMin(e.toTime || "23:59");
      for (let t = from; t < to; t += SLOT_DURATION) {
        const s = `${String(Math.floor(t / 60)).padStart(2, "0")}:${String(t % 60).padStart(2, "0")}`;
        excluded.add(s);
      }
    }

    let slots = [];
    if (!allDayOff) {
      for (const s of schedules) {
        for (const slot of generateSlots(s.startTime, s.endTime, SLOT_DURATION)) {
          if (!excluded.has(slot) && !bookedTimes.has(slot)) slots.push(slot);
        }
      }
    }

    res.json({
      doctor: { id: doctor.id, name: doctor.name, specialization: doctor.specialization },
      date,
      slots,
    });
  })
);

router.post(
  "/appointments",
  asyncHandler(async (req, res) => {
    const {
      serviceSlug,
      doctorId,
      date,
      startTime,
      patient,
      answers,
      notes,
    } = req.body || {};

    if (!serviceSlug || !doctorId || !date || !startTime || !patient?.name || !patient?.phone) {
      return res.status(400).json({ error: "Missing required appointment details" });
    }
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      return res.status(400).json({ error: "Invalid date" });
    }

    const service = await prisma.service.findUnique({ where: { slug: serviceSlug, active: true } });
    if (!service) return res.status(404).json({ error: "Service not found" });

    const doctor = await prisma.doctor.findUnique({ where: { id: Number(doctorId) } });
    if (!doctor || !doctor.active) return res.status(404).json({ error: "Doctor not found" });

    const dayOfWeek = new Date(date + "T00:00:00").getDay();
    const schedule = await prisma.doctorSchedule.findFirst({
      where: { doctorId: doctor.id, dayOfWeek },
    });
    const exception = await prisma.scheduleException.findFirst({
      where: { doctorId: doctor.id, date },
    });
    if (!schedule || (exception?.allDay ?? false)) {
      return res.status(400).json({ error: "Doctor is not available on this date" });
    }

    const appointment = await prisma.$transaction(async (tx) => {
      const patientRecord = await tx.patient.create({
        data: {
          name: patient.name.trim(),
          phone: String(patient.phone).trim(),
          email: patient.email?.trim() || null,
          age: patient.age ? Number(patient.age) : null,
          gender: patient.gender || null,
          city: patient.city || null,
        },
      });

      const last = await tx.appointment.findFirst({ orderBy: { id: "desc" }, select: { id: true } });
      const appointmentNo = `IRV-${new Date().getFullYear()}-${String((last?.id ?? 0) + 1).padStart(5, "0")}`;

      let created;
      try {
        created = await tx.appointment.create({
          data: {
            appointmentNo,
            patientId: patientRecord.id,
            serviceId: service.id,
            doctorId: doctor.id,
            date,
            startTime,
            durationMin: SLOT_DURATION,
            notes: notes?.trim() || null,
          },
        });
      } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2002") {
          throw Object.assign(new Error("This time slot has just been booked by another patient. Please choose a different slot."), { status: 409 });
        }
        throw e;
      }

      let questionnaire = await tx.questionnaire.findFirst({
        where: { serviceId: service.id, active: true },
      });
      if (!questionnaire) {
        questionnaire = await tx.questionnaire.findFirst({ where: { serviceId: null, active: true } });
      }

      if (questionnaire && Array.isArray(answers) && answers.length > 0) {
        const response = await tx.questionnaireResponse.create({
          data: { appointmentId: created.id, questionnaireId: questionnaire.id },
        });
        for (const a of answers) {
          if (!a?.questionId) continue;
          await tx.questionnaireAnswer.create({
            data: {
              responseId: response.id,
              questionId: Number(a.questionId),
              value: String(a.value ?? ""),
            },
          });
        }
      }

      await tx.appointmentStatusHistory.create({
        data: {
          appointmentId: created.id,
          toStatus: "PENDING",
          note: "Request submitted by patient",
        },
      });

      return created;
    });

    res.status(201).json({
      appointmentNo: appointment.appointmentNo,
      status: appointment.status,
      date: appointment.date,
      startTime: appointment.startTime,
      service: service.name,
      doctor: doctor.name,
    });
  })
);

router.get(
  "/appointments/:ref",
  asyncHandler(async (req, res) => {
    const { phone } = req.query;
    const appointment = await prisma.appointment.findUnique({
      where: { appointmentNo: req.params.ref },
      include: {
        service: { select: { name: true } },
        doctor: { select: { name: true } },
        patient: { select: { phone: true } },
      },
    });
    if (!appointment) return res.status(404).json({ error: "Appointment not found" });
    if (phone && String(phone).trim() !== appointment.patient.phone) {
      return res.status(403).json({ error: "Phone number does not match this appointment" });
    }
    res.json({
      appointmentNo: appointment.appointmentNo,
      status: appointment.status,
      date: appointment.date,
      startTime: appointment.startTime,
      service: appointment.service.name,
      doctor: appointment.doctor.name,
    });
  })
);

export default router;
