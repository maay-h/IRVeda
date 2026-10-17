import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const passwordHash = bcrypt.hashSync("admin123", 10);

async function main() {
  // ---- Staff ----
  const staff = await prisma.staff.createMany({
    data: [
      { name: "Super Admin", email: "admin@irveda.com", passwordHash, role: "SUPER_ADMIN" },
      { name: "Receptionist", email: "reception@irveda.com", passwordHash, role: "RECEPTIONIST" },
      { name: "Dr. Doctor", email: "doctor@irveda.com", passwordHash, role: "DOCTOR" },
    ],
  });
  console.log("Seeded staff:", staff.count);

  // ---- Doctors ----
  const doctors = await prisma.doctor.createMany({
    data: [
      {
        name: "Dr. Yakhooth Naveen",
        qualification: "BAMS, PGDHM",
        specialization: "General Ayurvedic Consultation",
        bio: "Consulting physician at IR Veda Clinic, Mandi Mohalla, Mysore.",
        photoUrl: null,
      },
      {
        name: "Dr. Madhurya Sharma",
        qualification: "BAMS, MD (Ayurveda)",
        specialization: "Panchakarma & Detox",
        bio: "Specialist in Ayurvedic Panchakarma, detoxification and lifestyle disorders with 12+ years of practice.",
        photoUrl: null,
      },
      {
        name: "Dr. Ananya Iyer",
        qualification: "BAMS, MS (Prasuti & Stri Roga)",
        specialization: "Women's Health",
        bio: "Expert in Ayurvedic management of PCOD, PCOS and female infertility.",
        photoUrl: null,
      },
      {
        name: "Dr. Rohan Deshmukh",
        qualification: "BAMS, MD (Kayachikitsa)",
        specialization: "Metabolic & Hormonal Health",
        bio: "Focused on Ayurvedic care for thyroid, diabetes and metabolic conditions.",
        photoUrl: null,
      },
      {
        name: "Dr. Kavitha Nair",
        qualification: "BAMS, PhD (Rasa Shastra)",
        specialization: "Skin & Bone Health",
        bio: "Treats psoriasis, allergies, and bone health through classical Ayurvedic formulations.",
        photoUrl: null,
      },
    ],
  });
  console.log("Seeded doctors:", doctors.count);

  // ---- Service categories & services ----
  const featuredCat = await prisma.serviceCategory.create({
    data: {
      name: "Featured",
      slug: "featured",
      displayOrder: 1,
      services: {
        create: [
          {
            name: "Body Detox",
            slug: "body-detox",
            tagline: "Ayurvedic Detox & Wellness",
            description:
              "A comprehensive Ayurvedic detoxification program tailored to remove toxins (ama) and restore balance. Includes consultation, assessment and a personalised detox plan.",
            icon: "🌿",
            featured: true,
            displayOrder: 1,
          },
        ],
      },
    },
  });

  const womenCat = await prisma.serviceCategory.create({
    data: {
      name: "Women's Health",
      slug: "womens-health",
      displayOrder: 2,
      services: {
        create: [
          { name: "PCOD", slug: "pcod", tagline: "Polycystic Ovarian Disease care", displayOrder: 1 },
          { name: "PCOS", slug: "pcos", tagline: "Polycystic Ovarian Syndrome care", displayOrder: 2 },
          { name: "Infertility in Women", slug: "infertility-women", tagline: "Ayurvedic fertility support", displayOrder: 3 },
        ],
      },
    },
  });

  const metabolicCat = await prisma.serviceCategory.create({
    data: {
      name: "Metabolic & Hormonal Health",
      slug: "metabolic-hormonal-health",
      displayOrder: 3,
      services: {
        create: [
          { name: "Thyroid", slug: "thyroid", tagline: "Ayurvedic support for thyroid conditions", displayOrder: 1 },
          { name: "Diabetes", slug: "diabetes", tagline: "Ayurvedic management for diabetes", displayOrder: 2 },
        ],
      },
    },
  });

  const skinCat = await prisma.serviceCategory.create({
    data: {
      name: "Skin & Allergy Care",
      slug: "skin-allergy-care",
      displayOrder: 4,
      services: {
        create: [
          { name: "Psoriasis", slug: "psoriasis", tagline: "Ayurvedic care for psoriasis", displayOrder: 1 },
          { name: "Allergies", slug: "allergies", tagline: "Ayurvedic management for allergies", displayOrder: 2 },
        ],
      },
    },
  });

  const boneCat = await prisma.serviceCategory.create({
    data: {
      name: "Bone & Joint Health",
      slug: "bone-joint-health",
      displayOrder: 5,
      services: {
        create: [
          { name: "Bone Health Ayurveda", slug: "bone-health-ayurveda", tagline: "Ayurvedic bone health consultation", displayOrder: 1 },
          { name: "Customized Bone Health Ayurvedic Medicine", slug: "customized-bone-health-medicine", tagline: "Personalised Ayurvedic bone health medication", displayOrder: 2 },
        ],
      },
    },
  });

  await prisma.serviceCategory.create({
    data: {
      name: "Other Ayurvedic Services",
      slug: "other-services",
      displayOrder: 6,
      services: {
        create: [
          { name: "Stones", slug: "stones", tagline: "Ayurvedic consultation for stones", displayOrder: 1 },
          { name: "Suvarna Prasha", slug: "suvarna-prasha", tagline: "Ayurvedic immunity booster for children", displayOrder: 2 },
        ],
      },
    },
  });

  console.log("Seeded categories:", featuredCat.name, womenCat.name, metabolicCat.name, skinCat.name, boneCat.name);

  // ---- Doctor schedules (Monday-Saturday, 09:00-13:00 & 14:00-18:00) ----
  const allDoctors = await prisma.doctor.findMany();
  const scheduleData = [];
  for (const d of allDoctors) {
    for (let day = 1; day <= 6; day++) {
      scheduleData.push(
        { doctorId: d.id, dayOfWeek: day, startTime: "09:00", endTime: "13:00" },
        { doctorId: d.id, dayOfWeek: day, startTime: "14:00", endTime: "18:00" }
      );
    }
  }
  await prisma.doctorSchedule.createMany({ data: scheduleData });
  console.log("Seeded doctor schedules:", scheduleData.length);

  // ---- Questionnaires ----
  const detoxService = await prisma.service.findUnique({ where: { slug: "body-detox" } });
  const pcodService = await prisma.service.findUnique({ where: { slug: "pcod" } });
  const boneService = await prisma.service.findUnique({ where: { slug: "bone-health-ayurveda" } });

  const generalQ = await prisma.questionnaire.create({
    data: {
      title: "General Pre-Consultation Questionnaire",
      description: "Helps our physicians understand your health before the consultation.",
      serviceId: null,
      questions: {
        create: [
          { label: "What is your main health concern?", questionType: "TEXT", required: true, displayOrder: 1 },
          { label: "How long have you been experiencing this?", questionType: "TEXT", required: false, displayOrder: 2 },
          { label: "Do you currently take any regular medication?", questionType: "YES_NO", required: true, displayOrder: 3 },
          { label: "If yes, please list your current medications or supplements.", questionType: "TEXT", required: false, displayOrder: 4 },
          { label: "Do you have any known allergies?", questionType: "YES_NO", required: true, displayOrder: 5 },
          { label: "If yes, please list your allergies.", questionType: "TEXT", required: false, displayOrder: 6 },
          { label: "Have you had any previous treatments for this concern?", questionType: "YES_NO", required: false, displayOrder: 7 },
          { label: "Any other information you would like to share?", questionType: "TEXT", required: false, displayOrder: 8 },
        ],
      },
    },
  });

  if (detoxService) {
    await prisma.questionnaire.create({
      data: {
        title: "Body Detox Pre-Consultation Questionnaire",
        description: "Specific questions to prepare your personalised detox plan.",
        serviceId: detoxService.id,
        questions: {
          create: [
            { label: "What made you consider a body detox?", questionType: "TEXT", required: true, displayOrder: 1 },
            { label: "Describe any current symptoms (digestion, energy, skin, sleep etc.).", questionType: "TEXT", required: true, displayOrder: 2 },
            { label: "Have you undergone any detox or Panchakarma before?", questionType: "YES_NO", required: true, displayOrder: 3 },
            { label: "If yes, when and what type?", questionType: "TEXT", required: false, displayOrder: 4 },
            { label: "How is your daily routine (sleep, food, exercise)?", questionType: "TEXT", required: false, displayOrder: 5 },
            { label: "Do you have any chronic conditions?", questionType: "YES_NO", required: true, displayOrder: 6 },
            { label: "If yes, please specify.", questionType: "TEXT", required: false, displayOrder: 7 },
            { label: "Current medications or supplements?", questionType: "TEXT", required: false, displayOrder: 8 },
            { label: "Any allergies?", questionType: "YES_NO", required: true, displayOrder: 9 },
            { label: "If yes, please list.", questionType: "TEXT", required: false, displayOrder: 10 },
          ],
        },
      },
    });
  }

  if (pcodService) {
    await prisma.questionnaire.create({
      data: {
        title: "Women's Health Pre-Consultation Questionnaire",
        description: "Specific questions for PCOD / PCOS / fertility consultation.",
        serviceId: pcodService.id,
        questions: {
          create: [
            { label: "Please describe your menstrual cycle (regularity, duration).", questionType: "TEXT", required: true, displayOrder: 1 },
            { label: "How old were you when your symptoms began?", questionType: "NUMBER", required: false, displayOrder: 2 },
            { label: "Are you currently trying to conceive?", questionType: "YES_NO", required: false, displayOrder: 3 },
            { label: "Are you currently taking hormonal medication (contraceptives etc.)?", questionType: "YES_NO", required: true, displayOrder: 4 },
            { label: "Any relevant reports (hormone panels, ultrasound) you can share?", questionType: "TEXT", required: false, displayOrder: 5 },
            { label: "Other health conditions or medications?", questionType: "TEXT", required: false, displayOrder: 6 },
          ],
        },
      },
    });
  }

  if (boneService) {
    await prisma.questionnaire.create({
      data: {
        title: "Bone Health Pre-Consultation Questionnaire",
        description: "Specific questions for bone & joint consultation.",
        serviceId: boneService.id,
        questions: {
          create: [
            { label: "Which joints or bones are affected?", questionType: "TEXT", required: true, displayOrder: 1 },
            { label: "How long have you had this condition?", questionType: "TEXT", required: true, displayOrder: 2 },
            { label: "Have you had a bone density scan or X-ray?", questionType: "YES_NO", required: false, displayOrder: 3 },
            { label: "If yes, please share the findings.", questionType: "TEXT", required: false, displayOrder: 4 },
            { label: "Are you currently taking calcium or vitamin supplements?", questionType: "YES_NO", required: false, displayOrder: 5 },
            { label: "Current medications?", questionType: "TEXT", required: false, displayOrder: 6 },
          ],
        },
      },
    });
  }

  console.log("Seeded questionnaires:", generalQ.id);

  console.log("\nSeeding complete.");
  console.log("Login: admin@irveda.com / admin123 (also reception@irveda.com, doctor@irveda.com)");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
