import "dotenv/config";
import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.js";
import publicRoutes from "./routes/public.js";
import adminRoutes from "./routes/admin/index.js";
import { authRequired, handleError } from "./middleware/auth.js";

const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ limit: "2mb" }));

app.get("/api/health", (_req, res) => res.json({ ok: true }));

app.use("/api", publicRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", authRequired, adminRoutes);

app.use((_req, res) => res.status(404).json({ error: "Not found" }));
app.use(handleError);

export default app;
