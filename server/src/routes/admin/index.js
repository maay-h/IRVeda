import { Router } from "express";
import appointmentRoutes from "./appointments.js";
import patientRoutes from "./patients.js";
import doctorRoutes from "./doctors.js";
import questionnaireRoutes from "./questionnaires.js";
import dashboardRoutes from "./dashboard.js";
import staffRoutes from "./staff.js";

const router = Router();

router.use("/appointments", appointmentRoutes);
router.use("/patients", patientRoutes);
router.use("/doctors", doctorRoutes);
router.use("/questionnaires", questionnaireRoutes);
router.use("/dashboard", dashboardRoutes);
router.use("/staff", staffRoutes);

export default router;
