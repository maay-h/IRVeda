# Deploying the IR Veda demo (Vercel + Neon)

Three things deploy, as three separate Vercel projects, sharing one database:

| # | Vercel project | Folder (Root Directory) | Served as |
|---|---|---|---|
| A | `irveda-site` | `IRV2/IR veda/frontend` | marketing site + booking (patient side) |
| B | `irveda-admin` | `client` | staff portal (login required) |
| C | `irveda-api` | `server` | REST API + database access |

Everything talks to **one Neon Postgres database**, so a booking made on A shows up in B.

---

## 1. Create the database (Neon)

1. Sign up at https://neon.tech (free) and create a project.
2. Open **Connection Details** and copy **both** strings:
   - **Pooled** (host contains `-pooler`) → this is `DATABASE_URL`
   - **Direct** (host has no `-pooler`) → this is `DIRECT_URL`

## 2. Point the app at Neon (local machine)

Open `server/.env` and paste your two strings:

```
DATABASE_URL="<neon pooled url>"
DIRECT_URL="<neon direct url>"
JWT_SECRET="<a long random string>"
PORT=4000
```

Then create the tables and seed the demo data (one time):

```bash
npm --prefix server run db:push
npm --prefix server run db:seed
```

> Note: after this change, local development also uses Neon (not SQLite).
> See "Going back to SQLite" at the bottom if you ever want offline dev.

## 3. Put the code on GitHub

The folder is not a git repo yet. From the project root:

```bash
git init
git add .
git commit -m "IR Veda appointments portal"
git branch -M main
git remote add origin https://github.com/<you>/<repo>.git
git push -u origin main
```

`.env` is gitignored, so no secrets are pushed.

## 4. Create the three Vercel projects

In Vercel → **Add New → Project**, import the same GitHub repo three times,
setting a different **Root Directory** each time:

### Project C — API (`server`)
- Root Directory: `server`
- Environment Variables:
  - `DATABASE_URL` = Neon **pooled** URL
  - `DIRECT_URL` = Neon **direct** URL
  - `JWT_SECRET` = same long random string
- Deploy. Verify: open `https://<c>.vercel.app/api/health` → `{"ok":true}`

### Project B — Admin portal (`client`)
- Root Directory: `client`
- Environment Variable: `VITE_API_BASE_URL` = `https://<c>.vercel.app/api`
- Deploy. Visit `https://<b>.vercel.app` → redirects to admin login.

### Project A — Marketing site (`IRV2/IR veda/frontend`)
- Root Directory: `IRV2/IR veda/frontend`
- Environment Variable: `VITE_API_BASE_URL` = `https://<c>.vercel.app/api`
- Deploy.

> `VITE_*` variables are read at **build time** — after changing one, redeploy the project.

## 5. Verify

1. `https://<c>.vercel.app/api/health` → `{"ok":true}`
2. `https://<b>.vercel.app` → admin login → `admin@irveda.com` / `admin123` → dashboard loads
3. Book an appointment on the marketing site → it appears in the admin portal

## 6. Custom subdomains (optional, later)

In Vercel → project → Domains:
- Project A → `irveda.com`
- Project B → `admin.irveda.com`
- Project C → `api.irveda.com`

Then update `VITE_API_BASE_URL` on B and A to `https://api.irveda.com/api` and redeploy.

---

## Notes & gotchas

- **CORS:** the API currently reflects any origin (`origin: true`) so the two
  frontends can call it. Tighten this before real use.
- **Free tier:** Neon free projects can pause when idle; Vercel Hobby is
  non-commercial. Fine for a demo; upgrade before real patients.
- **Marketing build:** `vercel.json` overrides the build command to `vite build`
  to skip the `tsc` step (the repo mixes `.ts`/`.jsx` files and `tsc` can fail).
- **Serverless:** the API runs as a Vercel Node function via `server/api/index.js`,
  which exports the Express app from `server/src/app.js`.

## Going back to SQLite (offline development)

1. `server/prisma/schema.prisma` → set `provider = "sqlite"` and
   `url = "file:./dev.db"` (remove `directUrl`).
2. `server/.env` → `DATABASE_URL="file:./dev.db"`.
3. `npx prisma db push` then `node prisma/seed.js` (run inside `server/`).
