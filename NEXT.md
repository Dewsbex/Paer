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
- [2026-04-13] GitHub repo created and pushed: github.com/Dewsbex/Paer
- [2026-04-13] Architecture pivot: serverless (Cloudflare Pages + Supabase)
- [2026-04-13] Supabase project created (eu-west-2 London) with full schema + RLS

## In Progress
- Cloudflare Pages build config fix (Steven — dashboard)
- Supabase auth configuration (Steven — dashboard)

## Next 3 Actions (in priority order)
1. **Fix Cloudflare Pages build** — set root dir `frontend`, build output `.svelte-kit/cloudflare`, add env vars PUBLIC_SUPABASE_URL + PUBLIC_SUPABASE_ANON_KEY, add custom domain paer.dewsbery.uk
2. **Enable Supabase magic link auth** — Supabase dashboard → Auth → set site URL to https://paer.dewsbery.uk, enable email provider
3. **Supabase Edge Function for RSS parsing** — parse feed XML, upsert articles into database

---

## Blockers
| Blocker | Impact | Owner | ETA |
|---------|--------|-------|-----|
| Cloudflare Pages not yet connected to repo | No auto-deploy, no live URL | Steven (dashboard) | Today |
| dewsbery.uk DNS not yet configured | No custom domain | Steven (Cloudflare DNS) | Today |

---

## Context for Next Session
Architecture has pivoted to serverless: Cloudflare Pages (frontend) + Supabase (database + auth). No VPS, no Docker, no FastAPI. The Supabase project (moarpiqwynhuwxkfrzlr) is live in London with the full schema deployed (feeds, articles, subscriptions, annotations, clusters, flags — all with RLS). Next session should connect Cloudflare Pages to the GitHub repo for auto-deploy, scaffold the SvelteKit app with Supabase client, and build the first reading UI. Everything is mobile-first — base styles at 320px. The design reference is the paer-design-revised.jsx mockup.

---

## Sprint 1 Full Task List (Revised for Serverless)

| # | Task | Est. Time | Status |
|---|------|-----------|--------|
| 1 | Connect Cloudflare Pages + DNS (paer.dewsbery.uk) | 15 min | ⬜ Steven — set root dir to `frontend`, build output `.svelte-kit/cloudflare` |
| 2 | SvelteKit scaffold with Supabase client + auth | 2–3 hrs | ✅ Done |
| 3 | Mobile-first app shell (nav, theme toggle, logo) | 2–3 hrs | ✅ Done |
| 4 | Feed subscription UI + OPML import | 3–4 hrs | ✅ Done |
| 5 | Article reading UI (time-window filtering, article cards, reading pane) | 3–4 hrs | ✅ Done |
| 6 | OPML import | 1–2 hrs | ✅ Done (in AddFeed component) |
| 7 | Cloudflare Worker cron for feed polling | 2–3 hrs | ⬜ Next |
