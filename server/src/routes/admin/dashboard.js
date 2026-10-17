import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { asyncHandler, roleGuard } from "../../middleware/auth.js";

const router = Router();
const prisma = new PrismaClient();

router.use(roleGuard("SUPER_ADMIN", "ADMIN"));

router.get(
  "/",
  asyncHandler(async (_req, res) => {
    const today = new Date().toISOString().slice(0, 10);

    const [all, todayAppointments, pending, confirmed, completed, cancelled, noShow, byService, byDoctor, byStatus, newPatients, bodyDetox, recent] =
      await Promise.all([
        prisma.appointment.count(),
        prisma.appointment.count({ where: { date: today } }),
        prisma.appointment.count({ where: { status: "PENDING" } }),
        prisma.appointment.count({ where: { status: "CONFIRMED" } }),
        prisma.appointment.count({ where: { status: "COMPLETED" } }),
        prisma.appointment.count({ where: { status: "CANCELLED" } }),
        prisma.appointment.count({ where: { status: "NO_SHOW" } }),
        prisma.appointment.groupBy({ by: ["serviceId"], _count: true }),
        prisma.appointment.groupBy({ by: ["doctorId"], _count: true }),
        prisma.appointment.groupBy({ by: ["status"], _count: true }),
        prisma.patient.count(),
        prisma.appointment.count({ where: { service: { slug: "body-detox" } } }),
        prisma.appointment.findMany({
          include: { patient: true, service: true, doctor: true },
          orderBy: { createdAt: "desc" },
          take: 10,
        }),
      ]);

    const serviceIds = byService.map((s) => s.serviceId);
    const services = serviceIds.length
      ? await prisma.service.findMany({ where: { id: { in: serviceIds } } })
      : [];
    const doctorIds = byDoctor.map((d) => d.doctorId);
    const doctors = doctorIds.length
      ? await prisma.doctor.findMany({ where: { id: { in: doctorIds } } })
      : [];

    res.json({
      today: todayAppointments,
      pending,
      confirmed,
      completed,
      cancelled,
      noShow,
      total: all,
      totalPatients: newPatients,
      bodyDetox,
      byStatus,
      byService: byService.map((s) => ({
        name: services.find((x) => x.id === s.serviceId)?.name || "Unknown",
        count: s._count,
      })),
      byDoctor: byDoctor.map((d) => ({
        name: doctors.find((x) => x.id === d.doctorId)?.name || "Unknown",
        count: d._count,
      })),
      recent,
    });
  })
);

export default router;
