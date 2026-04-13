# CHANGELOG.md — Session Decision Log

**Append-only. Never delete entries. One line per decision or change.**
Format: `[DATE] [TYPE] [What changed / was decided]`
Types: DECISION | CHANGE | FIX | ADD | REMOVE | DEFER

---

<!-- Entries appended below, newest at top -->
[2026-04-13] ADD Project-rails v3.0 installed. Session continuity protocols active.
[2026-04-13] ADD Brand mandate created (docs/BRAND.md) — all external outputs require Paer logo.
[2026-04-13] ADD PaerLogo.svelte component and sieve mark SVGs created.
[2026-04-13] DECISION Logo: Sieve Mark (concept 18) + Accent Ligature (concept 03). Mark = 3×3 grid, cell [1,2] highlighted in accent.
[2026-04-13] DECISION Tagline: "Many sources. One signal."
[2026-04-13] DECISION Typography: Literata (body), Atkinson Hyperlegible Next (UI), IBM Plex Mono (metadata).
[2026-04-13] DECISION Colour: warm neutrals with #B5521E accent (light), #D4793A (dark). All text passes WCAG AA.
[2026-04-13] DECISION Dark mode ships at launch, not deferred.
[2026-04-13] DECISION Mobile-first CSS: base styles at 320px, three-panel only at 1024px+.
[2026-04-13] DECISION Architecture: thin reader delegating feed fetching to existing backends (Feedbin/Miniflux/FreshRSS), with built-in fallback for new users.
[2026-04-13] DECISION Stack: SvelteKit + Tailwind (frontend), FastAPI + Celery + Redis + PostgreSQL (backend), Docker.
[2026-04-13] DECISION Name: Paer (spelled PAER, displayed as pær). Confirmed clean after 19 searches.
[2026-04-13] DECISION Product concept: RSS reader built for synthesis, not consumption. Cross-feed clustering, annotation export, calm reading.
[2026-04-13] ADD Project brief drafted (docs/PROJECT_BRIEF.md).
