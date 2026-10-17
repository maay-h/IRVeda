import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { asyncHandler } from "../../middleware/auth.js";

const router = Router();
const prisma = new PrismaClient();

const STATUS_FLOW = ["PENDING", "CONFIRMED", "CHECKED_IN", "COMPLETED", "RESCHEDULED", "CANCELLED", "NO_SHOW"];

const include = {
  patient: true,
  service: { include: { category: true } },
  doctor: true,
  responses: { include: { answers: { include: { question: true } } } },
};

function buildWhere(query) {
  const where = {};
  if (query.date) where.date = query.date;
  if (query.doctorId) where.doctorId = Number(query.doctorId);
  if (query.serviceId) where.serviceId = Number(query.serviceId);
  if (query.status) where.status = query.status;
  if (query.q) {
    where.patient = { OR: [{ name: { contains: query.q } }, { phone: { contains: query.q } }] };
  }
  return where;
}

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const where = buildWhere(req.query);
    const appointments = await prisma.appointment.findMany({
      where,
      include,
      orderBy: [{ date: "desc" }, { startTime: "desc" }],
      take: 500,
    });
    res.json(appointments);
  })
);

router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const appointment = await prisma.appointment.findUnique({
      where: { id: Number(req.params.id) },
      include,
    });
    if (!appointment) return res.status(404).json({ error: "Appointment not found" });
    res.json(appointment);
  })
);

router.patch(
  "/:id/status",
  asyncHandler(async (req, res) => {
    const id = Number(req.params.id);
    const { status, note, date, startTime } = req.body || {};
    if (!STATUS_FLOW.includes(status)) {
      return res.status(400).json({ error: "Invalid status" });
    }

    const existing = await prisma.appointment.findUnique({ where: { id } });
    if (!existing) return res.status(404).json({ error: "Appointment not found" });

    const appointment = await prisma.$transaction(async (tx) => {
      const data = { status };
      if (date) data.date = date;
      if (startTime) data.startTime = startTime;

      let updated;
      try {
        updated = await tx.appointment.update({
          where: { id },
          data,
          include,
        });
      } catch (e) {
        if (e.code === "P2002") {
          throw Object.assign(new Error("That slot is already taken. Choose another."), { status: 409 });
        }
        throw e;
      }

      await tx.appointmentStatusHistory.create({
        data: {
          appointmentId: id,
          fromStatus: existing.status,
          toStatus: status,
          changedById: req.user.id,
          note: note || null,
        },
      });
      return updated;
    });

    res.json(appointment);
  })
);

export default router;
