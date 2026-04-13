# NEXT.md — Live Sprint Board

**Read this first. Update this last. Never let it go stale.**

---

## SESSION OPENER INSTRUCTION

Before starting any work in this project, Claude must:
1. Read this document in full
2. Read the last 5 entries of CHANGELOG.md
3. Read docs/BRAND.md for brand compliance
4. State what it understands the current task to be
5. Propose a plan and wait for confirmation before executing

---

## Last Completed
- [2026-04-13] Project brief drafted and confirmed
- [2026-04-13] Brand identity finalised: Sieve Mark + Accent Ligature (pær)
- [2026-04-13] Design mockup v2 complete (dark mode, density toggle, search, accessible fonts)
- [2026-04-13] Project-rails installed, repo structure scaffolded

## In Progress
- Repository creation and initial push

## Next 3 Actions (in priority order)
1. **Create GitHub repo and push scaffold** — user creates repo, pushes all files
2. **Sprint 1, Task 1: Project scaffolding** — SvelteKit + FastAPI + PostgreSQL + Redis + Docker Compose, all containers talking, hello world on both ends (2–3 hrs)
3. **Sprint 1, Task 2: Database models** — Users, Feeds, Articles, Subscriptions with Alembic migrations (1–2 hrs)

---

## Blockers
| Blocker | Impact | Owner | ETA |
|---------|--------|-------|-----|
| GitHub repo not yet created | Can't push scaffold | Steven | Today |
| Domain not registered (paer.app / getpaer.com) | No public URL | Steven | This week |

---

## Context for Next Session
Project Paer is an RSS feed reader built for synthesis. The brief, brand identity, design system, and project protocols are all complete. The repo scaffold exists locally with CLAUDE.md, BRAND.md, logo components, and directory structure. Next session should begin with the user confirming the repo is created and pushed, then immediately start Sprint 1 Task 1 (Docker Compose + SvelteKit + FastAPI scaffolding). The design mockup at paer-design-revised.jsx is the reference for all UI work. Mobile-first is mandatory — all CSS starts at 320px.

---

## Sprint 1 Full Task List (Reference)

| # | Task | Est. Time | Status |
|---|------|-----------|--------|
| 1 | Project scaffolding (Docker + SvelteKit + FastAPI) | 2–3 hrs | ⬜ |
| 2 | Database models (Users, Feeds, Articles, Subscriptions) | 1–2 hrs | ⬜ |
| 3 | RSS/Atom feed parser (Celery task) | 3–4 hrs | ⬜ |
| 4 | Auth — magic link | 2–3 hrs | ⬜ |
| 5 | Feed subscription API | 2–3 hrs | ⬜ |
| 6 | Reading UI (mobile-first, article cards, reading pane) | 4–5 hrs | ⬜ |
| 7 | Time-window filtering (15m/1h/24h/3d) | 1–2 hrs | ⬜ |
| 8 | OPML import | 1–2 hrs | ⬜ |
| 9 | Docker production config | 2–3 hrs | ⬜ |
