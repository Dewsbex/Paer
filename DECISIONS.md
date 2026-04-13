# DECISIONS.md — Architecture Decision Records

**Format: ADR-[number] — [title]**
**Status: Proposed → Accepted → Superseded**

---

## ADR-001 — Thin reader with backend delegation

**Status:** Accepted
**Date:** 2026-04-13
**Context:** Building a full RSS feed fetching/parsing/storage backend from scratch would consume 80% of effort on undifferentiated plumbing that Feedbin, Miniflux, and FreshRSS already solve.
**Decision:** Paer delegates feed fetching to existing backends via their APIs. Users connect Feedbin, Miniflux, FreshRSS, or Inoreader accounts. A built-in lightweight backend exists for new users without an existing service. Paer owns the experience layer: reading UI, clustering, annotations, synthesis, export.
**Consequences:** Faster to ship. Avoids cold-start problem (users bring feeds). Dependent on third-party API stability. Must abstract backend connectors behind a common interface for swappability.

---

## ADR-002 — SvelteKit + FastAPI + PostgreSQL stack

**Status:** Accepted
**Date:** 2026-04-13
**Context:** Need a modern, fast frontend framework with SSR capability, a Python backend (for AI/ML clustering features), and a reliable relational database.
**Decision:** SvelteKit + Tailwind CSS (frontend), FastAPI + Celery + Redis (backend), PostgreSQL (database), Docker (deployment).
**Consequences:** SvelteKit is lightweight and fast. FastAPI enables async Python with good typing. Celery handles background feed polling. PostgreSQL handles relational data well. Docker makes deployment reproducible. Solo founder can manage this stack.

---

## ADR-003 — Mobile-first CSS architecture

**Status:** Accepted
**Date:** 2026-04-13
**Context:** Red team feedback: three-panel layout doesn't work on mobile. 50%+ of target users will access on phones (train commutes, quick checks).
**Decision:** All CSS written mobile-first. Base styles target 320px. Three-panel layout only activates at 1024px+. Below that: single-column with navigation via bottom tabs or slide-out panels. Touch targets minimum 44×44px.
**Consequences:** More work upfront but prevents the common failure mode of "we'll make it responsive later" which never happens. Every component must be designed twice: mobile and desktop.

---

## ADR-004 — Accessibility as a design feature, not compliance

**Status:** Accepted
**Date:** 2026-04-13
**Context:** Target users include researchers, analysts, and journalists who read for hours daily. Several red team panellists flagged contrast, font size, and screen reader concerns.
**Decision:** Use Atkinson Hyperlegible (Braille Institute) for UI text. Literata for body. All text passes WCAG AA. Font size adjustable 13–22px. Dark mode at launch. Reduced motion support. Keyboard navigation for all core flows.
**Consequences:** Slightly more constrained font choices. Accessibility testing adds to QA time. But it's a genuine differentiator in a market where most readers treat accessibility as an afterthought.

---

## ADR-005 — AI features are additive, not structural

**Status:** Accepted
**Date:** 2026-04-13
**Context:** Paer uses AI for topic clustering and optional article summarisation. But dependence on a single AI provider creates fragility.
**Decision:** Core reading, annotation, and export features work without any AI. Clustering uses lightweight local embeddings (sentence-transformers) as default. AI summarisation is opt-in, user brings their own API key (Claude, ChatGPT, Gemini, OpenRouter). No AI provider is required for the app to function.
**Consequences:** Users without AI keys still get a complete product. Clustering may be slower with local models. Multi-provider support adds complexity but eliminates single-vendor dependency.

---

## ADR-006 — Logo: Sieve Mark + Accent Ligature

**Status:** Accepted
**Date:** 2026-04-13
**Context:** Needed a visual identity that communicates "signal from noise" and differentiates from generic tech branding.
**Decision:** Sieve Mark (3×3 grid, one highlighted cell) paired with accent ligature wordmark (pær, æ in accent colour). Three scales: full lockup, wordmark only, mark only. Dark and light variants. Brand mandate in docs/BRAND.md governs all external outputs.
**Consequences:** Every external-facing component must include the logo per BRAND.md. The æ character requires Literata font loaded. URLs and domains use plain "paer" spelling.
