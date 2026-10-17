import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { asyncHandler, roleGuard } from "../../middleware/auth.js";

const router = Router();
const prisma = new PrismaClient();

router.use(roleGuard("SUPER_ADMIN", "ADMIN"));

router.get(
  "/services",
  asyncHandler(async (_req, res) => {
    const categories = await prisma.serviceCategory.findMany({
      orderBy: { displayOrder: "asc" },
      include: {
        services: { include: { _count: { select: { appointments: true } } }, orderBy: { displayOrder: "asc" } },
      },
    });
    res.json(categories);
  })
);

router.post(
  "/services",
  asyncHandler(async (req, res) => {
    const { name, slug, categoryId, description, tagline, icon, featured, displayOrder } = req.body || {};
    if (!name || !slug || !categoryId) {
      return res.status(400).json({ error: "Name, slug and category are required" });
    }
    const service = await prisma.service.create({
      data: {
        name,
        slug: String(slug).toLowerCase().replace(/\s+/g, "-"),
        categoryId: Number(categoryId),
        description,
        tagline,
        icon,
        featured: !!featured,
        displayOrder: displayOrder || 0,
      },
    });
    res.status(201).json(service);
  })
);

router.patch(
  "/services/:id",
  asyncHandler(async (req, res) => {
    const { name, slug, categoryId, description, tagline, icon, featured, active, displayOrder } = req.body || {};
    const service = await prisma.service.update({
      where: { id: Number(req.params.id) },
      data: {
        name,
        slug: slug ? String(slug).toLowerCase().replace(/\s+/g, "-") : undefined,
        categoryId: categoryId ? Number(categoryId) : undefined,
        description,
        tagline,
        icon,
        featured,
        active,
        displayOrder,
      },
    });
    res.json(service);
  })
);

router.get(
  "/",
  asyncHandler(async (_req, res) => {
    const questionnaires = await prisma.questionnaire.findMany({
      include: {
        service: true,
        questions: { orderBy: { displayOrder: "asc" } },
        _count: { select: { responses: true } },
      },
      orderBy: { id: "asc" },
    });
    res.json(questionnaires);
  })
);

router.post(
  "/",
  asyncHandler(async (req, res) => {
    const { title, description, serviceId, questions } = req.body || {};
    if (!title) return res.status(400).json({ error: "Title is required" });

    const questionnaire = await prisma.questionnaire.create({
      data: {
        title,
        description,
        serviceId: serviceId ? Number(serviceId) : null,
        questions: Array.isArray(questions)
          ? {
              create: questions.map((q, i) => ({
                label: q.label,
                questionType: q.questionType || "TEXT",
                required: !!q.required,
                displayOrder: q.displayOrder ?? i,
                options: Array.isArray(q.options) ? JSON.stringify(q.options) : null,
              })),
            }
          : undefined,
      },
      include: { questions: { orderBy: { displayOrder: "asc" } } },
    });
    res.status(201).json(questionnaire);
  })
);

router.patch(
  "/:id",
  asyncHandler(async (req, res) => {
    const { title, description, serviceId, active } = req.body || {};
    const questionnaire = await prisma.questionnaire.update({
      where: { id: Number(req.params.id) },
      data: {
        title,
        description,
        serviceId: serviceId === null || serviceId === undefined ? undefined : Number(serviceId),
        active,
      },
    });
    res.json(questionnaire);
  })
);

router.post(
  "/:id/questions",
  asyncHandler(async (req, res) => {
    const questionnaireId = Number(req.params.id);
    const { label, questionType, required, displayOrder, options } = req.body || {};
    if (!label) return res.status(400).json({ error: "Label is required" });
    const question = await prisma.questionnaireQuestion.create({
      data: {
        questionnaireId,
        label,
        questionType: questionType || "TEXT",
        required: !!required,
        displayOrder: displayOrder ?? 0,
        options: Array.isArray(options) ? JSON.stringify(options) : null,
      },
    });
    res.status(201).json(question);
  })
);

router.patch(
  "/questions/:id",
  asyncHandler(async (req, res) => {
    const { label, questionType, required, displayOrder, options, active } = req.body || {};
    const question = await prisma.questionnaireQuestion.update({
      where: { id: Number(req.params.id) },
      data: {
        label,
        questionType,
        required,
        displayOrder,
        options: Array.isArray(options) ? JSON.stringify(options) : options === null ? null : undefined,
        active,
      },
    });
    res.json(question);
  })
);

router.delete(
  "/questions/:id",
  asyncHandler(async (req, res) => {
    await prisma.questionnaireQuestion.delete({ where: { id: Number(req.params.id) } });
    res.json({ ok: true });
  })
);

export default router;
