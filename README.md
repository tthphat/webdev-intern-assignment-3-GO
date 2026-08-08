# G-Scores

A web app that visualizes the 2024 Vietnamese national high school exam scores (`diem_thi_thpt_2024`) — built for the Golden Owl web developer intern assignment.

## Features

- **Score lookup** — search a candidate's scores by registration number (SBD).
- **Score distribution** — per-subject chart with 4 bands (>=8, 6 to <8, 4 to <6, <4) + a combined aggregate chart.
- **Top 10 Group A** — top 10 students by total of Math + Physics + Chemistry.
- **Docker + live deployment** — full local stack via Docker Compose (PostgreSQL + API + web) and a public demo.

## Tech stack

| Layer | Tech |
| --- | --- |
| Frontend | React 19 + Vite, Tailwind CSS v4, React Router, react-hook-form + zod |
| Backend | NestJS 11, Prisma 7 (`@prisma/adapter-pg`) |
| Database | PostgreSQL |
| Monorepo | pnpm workspaces (`apps/api`, `apps/web`, `packages/shared`) |

## Repo layout

```
apps/
  api/          NestJS API (apps/api/src), Prisma schema + migrations + seeder
  web/          React SPA (vite)
packages/
  shared/       Shared schemas + subject constants/enum
assignment/
  dataset/      Raw CSV dataset (diem_thi_thpt_2024.csv)
  assignment.md Assignment brief
docker/         Dockerfile.api, Dockerfile.web, nginx.conf, docker-compose.yml
```

## Quick start (Docker)

Requires Docker with Docker Compose.

```bash
cd docker
docker compose up --build
```

Then open http://localhost:8080.

- Web: http://localhost:8080
- API: http://localhost:3000/api (Swagger / direct access)
- PostgreSQL: `postgres:5432` (user/pass: `postgres`/`postgres`, db: `score_analytics`)

On first start the API container runs `prisma migrate deploy` and seeds the database from the CSV (idempotent — safe to re-run). Seeding ~1M rows can take a minute.

## Run locally (development)

Requirements: Node 22+, pnpm 10.

```bash
pnpm install
```

### 1. Database

Start a Postgres instance, then create `apps/api/.env`:

```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/score_analytics
CORS_ORIGINS=http://localhost:5173
```

Run the migrations + seed:

```bash
cd apps/api
pnpm exec prisma migrate dev   # applies prisma/migrations
pnpm exec tsx prisma/seed.ts   # seeds data from the CSV
```

### 2. Run the API

```bash
cd apps/api
pnpm start:dev        # http://localhost:3000/api
```

### 3. Run the web

Create `apps/web/.env`:

```env
VITE_API_BASE_URL=http://localhost:3000/api
```

```bash
cd apps/web
pnpm dev              # http://localhost:5173
```

## Scripts

| Command | Description |
| --- | --- |
| `pnpm --filter @score-analytics/shared build` | Build the shared package |
| `pnpm --filter @score-analytics/api build` | Build the API (also runs `prisma generate`) |
| `pnpm --filter @score-analytics/api start:dev` | Dev server for the API |
| `pnpm --filter @score-analytics/web build` | Build the web app |
| `pnpm --filter @score-analytics/web dev` | Dev server for the web app |

## API endpoints

| Method | Path | Description |
| --- | --- | --- |
| GET | `/api/candidates/:registrationNumber` | Candidate score lookup |
| GET | `/api/analytics/top-group-a` | Top 10 Group A students |
| GET | `/api/analytics/score-distribution` | Per-subject score band distribution |

## Dataset

`assignment/dataset/diem_thi_thpt_2024.csv` — 1,061,605 rows. Columns: `sbd, toan, ngu_van, ngoai_ngu, vat_li, hoa_hoc, sinh_hoc, lich_su, dia_li, gdcd, ma_ngoai_ngu`.

## Demo

Live demo: [https://webdev-intern-assignment-3-go-web.vercel.app/](https://webdev-intern-assignment-3-go-web.vercel.app/)   
API: [https://webdev-intern-assignment-3-go-api-k.vercel.app/
](https://webdev-intern-assignment-3-go-api-k.vercel.app/api)