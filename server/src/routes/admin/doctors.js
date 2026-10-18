import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { asyncHandler, roleGuard } from "../../middleware/auth.js";

const router = Router();
const prisma = new PrismaClient();

router.use(roleGuard("SUPER_ADMIN", "ADMIN"));

router.get(
  "/",
  asyncHandler(async (_req, res) => {
    const doctors = await prisma.doctor.findMany({
      orderBy: { name: "asc" },
      include: {
        schedules: { orderBy: { dayOfWeek: "asc" } },
        exceptions: { orderBy: { date: "desc" }, take: 100 },
        _count: { select: { appointments: true } },
      },
    });
    res.json(doctors);
  })
);

router.post(
  "/",
  asyncHandler(async (req, res) => {
    const { name, qualification, specialization, bio, photoUrl } = req.body || {};
    if (!name || !qualification || !specialization) {
      return res.status(400).json({ error: "Name, qualification and specialization are required" });
    }
    const doctor = await prisma.doctor.create({
      data: { name, qualification, specialization, bio, photoUrl },
    });
    res.status(201).json(doctor);
  })
);

router.patch(
  "/:id",
  asyncHandler(async (req, res) => {
    const { name, qualification, specialization, bio, photoUrl, active } = req.body || {};
    const doctor = await prisma.doctor.update({
      where: { id: Number(req.params.id) },
      data: {
        name,
        qualification,
        specialization,
        bio,
        photoUrl,
        active,
      },
    });
    res.json(doctor);
  })
);

router.put(
  "/:id/schedules",
  asyncHandler(async (req, res) => {
    const doctorId = Number(req.params.id);
    const { schedules } = req.body || {};
    if (!Array.isArray(schedules)) return res.status(400).json({ error: "Schedules array required" });

    await prisma.$transaction(async (tx) => {
      await tx.doctorSchedule.deleteMany({ where: { doctorId } });
      for (const s of schedules) {
        if (!s?.dayOfWeek || !s?.startTime || !s?.endTime) continue;
        await tx.doctorSchedule.create({
          data: {
            doctorId,
            dayOfWeek: Number(s.dayOfWeek),
            startTime: s.startTime,
            endTime: s.endTime,
          },
        });
      }
    });
    const doctor = await prisma.doctor.findUnique({
      where: { id: doctorId },
      include: { schedules: { orderBy: { dayOfWeek: "asc" } } },
    });
    res.json(doctor);
  })
);

router.post(
  "/:id/exceptions",
  asyncHandler(async (req, res) => {
    const doctorId = Number(req.params.id);
    const { date, reason, allDay, fromTime, toTime } = req.body || {};
    if (!date) return res.status(400).json({ error: "Date is required" });
    const exception = await prisma.scheduleException.create({
      data: {
        doctorId,
        date,
        reason,
        allDay: allDay !== false,
        fromTime: allDay === false ? fromTime : null,
        toTime: allDay === false ? toTime : null,
      },
    });
    res.status(201).json(exception);
  })
);

router.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    const doctorId = Number(req.params.id);
    const doctor = await prisma.doctor.findUnique({
      where: { id: doctorId },
      include: { _count: { select: { appointments: true } } },
    });
    if (!doctor) return res.status(404).json({ error: "Doctor not found" });
    if (doctor._count.appointments > 0) {
      return res.status(409).json({
        error:
          "Cannot delete: this doctor already has appointments. Use Deactivate instead so existing records stay intact.",
      });
    }
    // Schedules and exceptions are removed by the schema's onDelete: Cascade
    await prisma.doctor.delete({ where: { id: doctorId } });
    res.json({ ok: true });
  })
);

router.delete(
  "/:id/exceptions/:exceptionId",
  asyncHandler(async (req, res) => {
    await prisma.scheduleException.delete({ where: { id: Number(req.params.exceptionId) } });
    res.json({ ok: true });
  })
);

export default router;
