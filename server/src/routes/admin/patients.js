import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { asyncHandler } from "../../middleware/auth.js";

const router = Router();
const prisma = new PrismaClient();

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const where = {};
    if (req.query.q) {
      where.OR = [
        { name: { contains: req.query.q } },
        { phone: { contains: req.query.q } },
      ];
    }
    const patients = await prisma.patient.findMany({
      where,
      orderBy: { createdAt: "desc" },
      include: { _count: { select: { appointments: true } } },
      take: 500,
    });
    res.json(patients);
  })
);

router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const patient = await prisma.patient.findUnique({
      where: { id: Number(req.params.id) },
      include: {
        appointments: {
          include: {
            service: true,
            doctor: true,
            responses: { include: { answers: { include: { question: true } } } },
          },
          orderBy: [{ date: "desc" }, { startTime: "desc" }],
        },
      },
    });
    if (!patient) return res.status(404).json({ error: "Patient not found" });
    res.json(patient);
  })
);

export default router;
