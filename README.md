# IR Veda — Appointment Portal

Appointment + pre-consultation management system for IR Veda Ayurvedic Hospital.
Consists of a **public booking portal** (multi-step wizard with dynamic pre-consultation
questionnaires) and a **staff admin portal** (appointment, patient, doctor, schedule,
questionnaire, and staff management).

**Body Detox** is featured prominently throughout the booking journey and the admin
dashboard, per the hospital's priority.

## Tech Stack

| Layer    | Choice                                    |
| -------- | ----------------------------------------- |
| Frontend | React 19 + Vite 6 + Tailwind CSS 4        |
| Backend  | Node.js + Express                          |
| Database | SQLite (dev) via Prisma — swap to PostgreSQL on Render |
| Auth     | JWT + bcrypt, role-based access            |

## Quick Start

```bash
npm run setup     # installs server + client deps, creates & seeds the SQLite DB
```

Then run two terminals:

```bash
npm run server    # API on http://localhost:4000
npm run client    # portal on http://localhost:5173
```

Or run each individually from `server/` and `client/`:

```bash
# server/
npm install
npm run db:setup   # prisma db push + seed
npm run dev

# client/
npm install
npm run dev
```

## Demo Accounts (seeded)

| Role         | Email                      | Password |
| ------------ | -------------------------- | -------- |
| Super Admin  | admin@irveda.com           | admin123 |
| Receptionist | reception@irveda.com       | admin123 |
| Doctor       | doctor@irveda.com          | admin123 |

## Routes

### Entry point — Admin portal
- `/` redirects to `/admin` (or `/admin/login` when not signed in)
- `/admin/login` — staff login
- `/admin` — dashboard
- `/admin/appointments`, `/admin/patients`, `/admin/doctors`, `/admin/questionnaires`, `/admin/staff`

### Public booking flow (kept for main-website integration)
The marketing website is built by a separate team and will link into these routes later.

- `/book` — 5-step booking wizard (Concern → Details → Questionnaire → Date/Time → Review)
  - `?service=body-detox` deep-links straight into a service
- `/success` — confirmation with Appointment ID (e.g. `IRV-2026-00001`)
- `/track` — public status lookup by Appointment ID + phone

## Key Behaviors

- **Admin portal** features: dashboard (today/pending/confirmed/completed counts, Body Detox analytics, by-service & by-doctor), appointments (filter by date/doctor/service/status/search; status workflow PENDING → CONFIRMED → CHECKED_IN → COMPLETED, plus RESCHEDULED / CANCELLED / NO_SHOW; detail view shows private questionnaire answers), patients (search, profile with history + answers), doctors & schedules (CRUD, weekly sessions → 30-min slots, exceptions), questionnaires, and staff management (super-admin only).
- **Slots** are generated from doctor weekly schedules minus exceptions minus already-booked slots.
- **Double-booking prevention** is enforced at the database level (`@@unique([doctorId, date, startTime])`); simultaneous bookings return HTTP 409.
- **Private data**: questionnaire answers are never exposed on public endpoints — only authorized staff can read them via the admin API.
- Doctor role sees only the admin sections permitted; receptionists cannot manage doctors/questionnaires; staff management is super-admin only.

## Deploying (later)

- Build the client: `npm --prefix client run build` (outputs to `client/dist`), serve it from Render static or a CDN.
- Swap `server/prisma/schema.prisma` datasource to `postgresql` and set `DATABASE_URL`.
- Set `JWT_SECRET` and `PORT` in the server environment.
- The client `vite.config.js` proxies `/api` to `localhost:4000` in dev; in production point the API base at your deployed backend.
