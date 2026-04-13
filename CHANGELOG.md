# CHANGELOG.md — Session Decision Log

**Append-only. Never delete entries. One line per decision or change.**
Format: `[DATE] [TYPE] [What changed / was decided]`
Types: DECISION | CHANGE | FIX | ADD | REMOVE | DEFER

---

<!-- Entries appended below, newest at top -->
[2026-04-13] FIX RLS policies: wrapped auth.uid() in (select ...) to prevent per-row re-evaluation. All WARN advisories resolved.
[2026-04-13] ADD Missing FK indexes: annotations.article_id, cluster_articles.article_id, flags.article_id, read_status.article_id, subscriptions.feed_id.
[2026-04-13] ADD Favicon (sieve mark SVG), Cloudflare Pages _headers (security headers).
[2026-04-13] ADD Supabase Edge Functions deployed: parse-feed (RSS/Atom parser) + poll-feeds (cron orchestrator).
[2026-04-13] ADD Reading UI: feeds page with time-window selector, article cards (compact/comfortable), mobile reading pane, "Nothing missed. Nothing owed."
[2026-04-13] ADD Feed subscription: AddFeed component with URL input + OPML import, bottom sheet mobile / modal desktop
[2026-04-13] ADD Auth flow: magic link login, callback handler, session store, protected routes
[2026-04-13] ADD SvelteKit scaffolded: Cloudflare adapter, Tailwind with full brand palette, PaerLogo Svelte 5 component, dark mode, safe area insets
[2026-04-13] ADD Supabase database schema: feeds, articles, subscriptions, read_status, annotations, clusters, flags. RLS enabled.
[2026-04-13] ADD Supabase project created: moarpiqwynhuwxkfrzlr (eu-west-2 London, free tier).
[2026-04-13] DECISION Architecture pivot: serverless (Cloudflare Pages + Supabase) replaces VPS/Docker/FastAPI. ADR-007 supersedes ADR-002.
[2026-04-13] ADD GitHub repo created and pushed: github.com/Dewsbex/Paer
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
