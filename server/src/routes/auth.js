import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import { signToken, asyncHandler, JWT_SECRET } from "../middleware/auth.js";

const router = Router();
const prisma = new PrismaClient();

router.post(
  "/login",
  asyncHandler(async (req, res) => {
    const { email, password } = req.body || {};
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const staff = await prisma.staff.findUnique({
      where: { email: String(email).toLowerCase().trim() },
    });

    if (!staff || !staff.active) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const valid = await bcrypt.compare(password, staff.passwordHash);
    if (!valid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    res.json({
      token: signToken(staff),
      user: { id: staff.id, name: staff.name, email: staff.email, role: staff.role },
    });
  })
);

router.get(
  "/me",
  asyncHandler(async (req, res) => {
    const header = req.headers.authorization || "";
    const token = header.startsWith("Bearer ") ? header.slice(7) : null;
    if (!token) return res.status(401).json({ error: "Unauthorized" });

    let payload;
    try {
      payload = jwt.verify(token, JWT_SECRET);
    } catch {
      return res.status(401).json({ error: "Invalid token" });
    }

    const staff = await prisma.staff.findUnique({ where: { id: payload.id } });
    if (!staff) return res.status(401).json({ error: "Staff not found" });

    res.json({
      user: { id: staff.id, name: staff.name, email: staff.email, role: staff.role },
    });
  })
);

export default router;
