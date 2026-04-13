# Project Brief: Paer

**Owner:** Steven Dewsbery  
**Date:** 13 April 2026  
**Version:** 1.0  
**Status:** Draft

---

## 1. Mission Statement

Paer is an RSS/feed reader built for synthesis, not just consumption — helping knowledge workers see patterns across sources, turn reading into structured output, and stay informed without drowning.

---

## 2. End Goal

A web-based feed reader where users can subscribe to RSS/Atom feeds and other sources, read with zero guilt or noise, annotate and highlight articles, see cross-feed topic clustering ("these five sources all covered this story"), export insights to their knowledge management tools, and optionally share feed intelligence with a small team.

**What users can do that they can't do now:**
- See convergence across sources (the same story from multiple angles, surfaced automatically)
- Highlight, annotate, and export reading to Obsidian/Notion/Logseq in one flow
- Read without unread counts, badges, or guilt — time-window mode shows only recent content
- Connect feeds from existing backends (Feedbin, Miniflux, FreshRSS, Inoreader) or use Paer's built-in default

**What stops being a problem:**
- Information overload disguised as "staying informed"
- Reading 20 articles about the same story without realising they're connected
- Losing annotations and highlights inside a reader with no export path
- Needing enterprise pricing just to share feeds with 3 colleagues

---

## 3. Scope

### In Scope (Phase 1 — MVP)

- RSS/Atom feed subscription and reading (built-in lightweight backend for new users)
- Backend connector support for Feedbin, Miniflux, FreshRSS APIs (bring your existing feeds)
- OPML import/export
- Time-window reading mode (last 1hr / 24hr / 3 days — no unread counts)
- Calm mode (opt-in: no badges, no guilt, no infinite scroll)
- Cross-feed topic clustering (AI embeddings group articles covering the same story)
- Highlight, annotate, and export to markdown (Obsidian/Notion/Logseq compatible)
- Newsletter ingestion (unique email address per user, newsletters appear as feed items)
- Multi-source: Reddit and Hacker News via native RSS
- Keyboard-driven UI for power users
- Web-first, responsive for mobile (no native app)

### In Scope (Phase 2)

- Weekly synthesis digest ("what your feeds collectively told you this week")
- AI summarisation per article (multi-provider: Claude, ChatGPT, Gemini, OpenRouter)
- Full-text extraction for truncated feeds
- YouTube transcript integration
- Team shared feeds with annotations (3–10 people)
- GitHub releases and regulatory/government feed support

### Out of Scope

- Native mobile apps (iOS/Android) — web responsive only for now
- Podcast playback — RSS feed tracking only, no audio player
- Social features beyond team sharing — no public profiles, no social graph
- Content creation or publishing tools
- Ad-supported model or algorithmic feed ranking
- AI-generated content inserted into the feed

---

## 4. Constraints

| Constraint | Detail |
|------------|--------|
| Deadline | No hard deadline — quality over speed. Target MVP in 8–12 weeks. |
| Budget | Bootstrapped. Claude subscription (~$20/mo), VPS hosting (~$14–28/mo), domain registration. Total runway: minimal ongoing cost. |
| Tech stack | Web-first. SvelteKit + Tailwind (frontend), Python FastAPI + PostgreSQL (backend), Docker containers, small VPS. |
| Compliance / Legal | GDPR compliance required (UK/EU users). No user data sold. Privacy-first positioning. |
| Team / Resource limits | Solo founder + AI tooling. No employees. Design, build, market, support — all one person. |
| Other | Must not depend on a single AI provider for core functionality. AI features are additive, not structural. |

---

## 5. Technical Context

- **Primary stack:** SvelteKit + Tailwind CSS (frontend), Python FastAPI (backend), Celery + Redis (task queue), PostgreSQL (database)
- **Infra / deployment target:** Docker containers on small VPS (Hetzner, DigitalOcean, or similar). ~$14–28/mo.
- **External dependencies:** Feedbin API, Miniflux API, FreshRSS Google Reader-compatible API, Inoreader API. AI providers (Claude, OpenAI, Gemini, OpenRouter) for optional summarisation. Email ingestion service for newsletter support.
- **Secrets / access:** API keys for feed backends (user-provided). AI provider keys (user-provided or platform-managed). Auth: email + password or magic link.
- **Existing systems touched:** None. Greenfield build. Integrates with users' existing feed backends and PKM tools via export.

### Architecture Decision

Paer is a **thin reader that delegates feed fetching to existing backends** but owns the experience layer. Users connect their Feedbin/Miniflux/FreshRSS/Inoreader account, or use Paer's built-in lightweight backend. Paer does not re-implement feed parsing at scale. Everything above the feed layer — reading UI, clustering, annotations, synthesis, calm mode, team features, export — is Paer's domain.

**Rationale:** Skip 80% undifferentiated plumbing. Ship faster. Differentiate on the layer nobody else is building. Avoid cold-start problem (users bring existing feeds). Build own backend later once product-market fit is proven.

---

## 6. Stakeholders

| Role | Person | Responsibility |
|------|--------|----------------|
| Owner | Steven Dewsbery | Final decision-maker, product direction |
| Builder | Steven + Claude Code | Primary implementer |
| User | Knowledge workers: journalists, researchers, analysts, developers | End user of the product |
| Reviewer | Early adopters / beta testers from target audience | Feedback on UX, feature priorities |
| Maintainer | Steven | Owns it post-launch, server ops, support |

---

## 7. Success Criteria

### Minimum Viable (must-have)
- [ ] User can subscribe to RSS/Atom feeds and read articles in a clean, calm UI
- [ ] User can connect an existing Feedbin or Miniflux backend and see their feeds in Paer
- [ ] Time-window mode works (1hr / 24hr / 3 days) with no unread counts
- [ ] Cross-feed topic clustering groups articles covering the same story
- [ ] User can highlight text, add notes, and export annotations as markdown
- [ ] OPML import brings existing feed library in
- [ ] Newsletter ingestion works via unique email address
- [ ] Keyboard navigation covers all core actions
- [ ] Web app is responsive and usable on mobile browsers

### Excellent (stretch)
- [ ] Weekly synthesis digest summarises cross-feed intelligence
- [ ] AI summarisation per article with user-chosen provider
- [ ] Team shared feeds with annotations for 3–10 users
- [ ] Full-text extraction for truncated feeds
- [ ] YouTube transcript integration as a feed source
- [ ] Paid tier converts at >2% of registered users within 6 months

### Failure Conditions
- Product ships but the clustering is so noisy it adds cognitive load instead of removing it
- Reading experience is worse than Feedbin/Miniflux — users connect their backend but never open Paer
- Annotation export is unreliable or loses data — trust destroyed immediately
- Ongoing VPS/maintenance burden exceeds solo founder's capacity and the product degrades

---

## 8. Risks and Mitigations

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Feed backend APIs change or break | Medium | High | Abstract backend connectors behind interface. Support multiple backends. Built-in fallback. |
| AI embedding costs for clustering exceed budget | Medium | Medium | Use local/lightweight embedding models (e.g., sentence-transformers). Only cluster on user request, not continuous. |
| Solo founder bottleneck — can't ship, support, and market simultaneously | High | High | Ruthless scope control. Ship MVP with P1 features only. No Phase 2 until Phase 1 is stable. |
| Incumbents (Feedly, Readwise) add synthesis features | Medium | Medium | Speed advantage: ship the synthesis layer before they build it. They optimise for enterprise; Paer optimises for individual knowledge workers and small teams. |
| Name collision risk with "Pare" adjacent brands | Low | Low | PAER spelling is confirmed clean. Register domains and trademarks early. |
| Newsletter ingestion is technically messy (spam, formatting) | High | Medium | Start with basic email-to-feed. Iterate based on real usage. Don't over-engineer before launch. |
| GDPR compliance complexity for solo founder | Medium | Medium | Privacy-first architecture from day one. No analytics beyond essential. Minimal data collection. Use GDPR-compliant EU-based hosting. |

---

## 9. Open Questions

- [ ] Pricing model: freemium (limited feeds free, paid for clustering/annotations/team) or flat subscription?
- [ ] Which embedding model for topic clustering? Local (cost-free, slower) vs API (fast, ongoing cost)?
- [ ] Newsletter ingestion: build custom or use existing service (e.g., Kill the Newsletter)?
- [ ] Auth approach: magic link only, or email+password as well?
- [ ] Domain: paer.app, getpaer.com, paer.io — which is available and preferred?
- [ ] Open source strategy: open core (reader open, synthesis proprietary) or fully proprietary?
- [ ] Beta launch channel: Hacker News Show HN, Product Hunt, or direct outreach to RSS community?
- [ ] Inoreader API access: requires partnership/approval — is this worth pursuing for MVP or defer?

---

## 10. Next Steps
> To be populated by the **Next Milestone** skill.

---

## Appendix A: Competitive Landscape

| Competitor | Strength | Gap Paer Fills |
|------------|----------|----------------|
| Feedly | Market leader, AI features (Leo), enterprise | No cross-feed synthesis. AI is per-article, not cross-source. Enterprise pricing excludes individuals. |
| Inoreader | Power-user favourite, rules, multi-source | No annotation export to PKM. No clustering. Complex for new users. |
| Feedbin | Clean, indie, open-source backend | No AI, no clustering, no synthesis. Reading only. |
| Miniflux | Self-hosted, minimal | No experience layer. Raw reader. No collaboration. |
| Readwise Reader | Best annotation/PKM export | Read-it-later app that bolted on RSS. Not RSS-first. $10/mo minimum. |
| RSScal | Time-window filtering, multi-AI | New, unproven. No clustering, no annotations, no team features. |
| Current | Calm reading, no unread counts | No synthesis, no annotations, no multi-source. |

**Paer's positioning:** The only reader optimised for synthesis — turning reading into structured intelligence, not just consumption.

---

## Appendix B: Prioritised Backlog Summary

### P1 — High demand, low-to-medium effort
1. Cross-feed topic clustering
2. Highlight, annotate, export to PKM
3. Time-window reading mode
4. Calm mode (no unread counts)
5. Newsletter ingestion
6. Multi-source (Reddit, HN via RSS)
7. OPML import/export
8. Backend connector (Feedbin, Miniflux)

### P2 — High demand, high effort / Medium demand, low effort
1. Full-text extraction for truncated feeds
2. AI summarisation per article
3. Weekly synthesis digest
4. Team shared feeds with annotations
5. Keyboard-driven UI

### P3 — Lower demand or very high effort
1. Government/legal/regulatory feed support
2. Read history and pattern tracking
3. Native mobile app
4. Rich data portability beyond OPML
5. Browser extension for web highlighting

---

_Brief confirmed by owner: [ ] Yes / [ ] Pending_
