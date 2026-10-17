import { Router } from "express";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import { asyncHandler, roleGuard } from "../../middleware/auth.js";

const router = Router();
const prisma = new PrismaClient();

router.use(roleGuard("SUPER_ADMIN"));

router.get(
  "/",
  asyncHandler(async (_req, res) => {
    const staff = await prisma.staff.findMany({
      select: { id: true, name: true, email: true, role: true, active: true, createdAt: true },
      orderBy: { createdAt: "asc" },
    });
    res.json(staff);
  })
);

router.post(
  "/",
  asyncHandler(async (req, res) => {
    const { name, email, password, role } = req.body || {};
    if (!name || !email || !password || !role) {
      return res.status(400).json({ error: "Name, email, password and role are required" });
    }
    const exists = await prisma.staff.findUnique({ where: { email: String(email).toLowerCase().trim() } });
    if (exists) return res.status(409).json({ error: "A staff member with this email already exists" });

    const staff = await prisma.staff.create({
      data: {
        name,
        email: String(email).toLowerCase().trim(),
        passwordHash: bcrypt.hashSync(password, 10),
        role,
      },
    });
    res.status(201).json({ id: staff.id, name: staff.name, email: staff.email, role: staff.role });
  })
);

router.patch(
  "/:id",
  asyncHandler(async (req, res) => {
    const { name, role, active, password } = req.body || {};
    const staff = await prisma.staff.update({
      where: { id: Number(req.params.id) },
      data: {
        name,
        role,
        active,
        passwordHash: password ? bcrypt.hashSync(password, 10) : undefined,
      },
    });
    res.json({ id: staff.id, name: staff.name, email: staff.email, role: staff.role, active: staff.active });
  })
);

export default router;
