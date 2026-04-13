# CLAUDE.md — Paer Project Protocol

**Project type:** MULTI (SvelteKit frontend + FastAPI backend + PostgreSQL + Docker)
**Hooksetup version:** 3.0
**Installed:** 13 April 2026

---

## SECTION 0 — SESSION OPENER (MANDATORY)

Before starting ANY work in this project, Claude must:

Step 1: Read NEXT.md in full.
Step 2: Read the last 5 entries of CHANGELOG.md.
Step 3: Read docs/BRAND.md to confirm brand compliance requirements.
Step 4: State out loud what you understand the current task to be.
Step 5: Propose a plan before executing — do not start building until the plan is confirmed.
Step 6: If anything in steps 1-2 contradicts what the user says, flag the conflict before proceeding.

**Never begin work without completing steps 1-5.**

---

## SECTION 0.1 — BRAND COMPLIANCE GATE

**Every external-facing output must include the Paer logo.** Before producing any file, page, component, email template, or export that a user or the public will see, check:

- [ ] Does this output include the Paer logo (full lockup or appropriate variant)?
- [ ] Does the logo follow the specs in docs/BRAND.md?
- [ ] Are the correct fonts loaded (Literata, Atkinson Hyperlegible Next, IBM Plex Mono)?
- [ ] Do all colours match the BRAND.md palette?
- [ ] Do all text elements pass WCAG AA contrast ratios?

If any check fails, fix it before presenting the output.

The logo component lives at: `frontend/src/lib/components/PaerLogo.svelte`
SVG assets live at: `frontend/src/assets/sieve-mark-*.svg`

---

## SECTION 0.2 — LEARN-ON-ERROR PROTOCOL

**When Claude makes a mistake or discovers a wrong assumption during this session:**

1. Stop immediately when the error is identified.
2. Append a one-line learning to Section 0.3 (Accumulated Learnings).
3. Format: `[DATE] ERROR: [what went wrong] → CORRECTION: [what to do instead]`
4. Do NOT continue the task until the learning is written.

---

## SECTION 0.3 — ACCUMULATED LEARNINGS (Append-only — never delete)

*Updated automatically when Section 0.2 triggers. Each line = one session learning.*

<!-- Entries appended here by Claude when errors are caught -->

---

## SECTION 0.4 — SESSION CLOSE PROTOCOL

**Before this session ends, Claude must complete ALL of the following:**

- [ ] Update NEXT.md: mark completed items, set the next 3 prioritised actions
- [ ] Append to CHANGELOG.md: one line per decision or change made this session
- [ ] Run the verify checklist for whatever was produced this session (see Section 4)
- [ ] If any errors were caught: confirm Section 0.3 entry was written
- [ ] State explicitly: "Session close complete. Next session should start with: [one sentence]"

**Claude must not close a session without completing this checklist.**

---

## SECTION 1 — ZERO-DRIFT ARCHITECTURE

### 1.1 Session Gates
- Read NEXT.md and CHANGELOG.md before every session
- Confirm understanding with user before executing
- Never assume context from a previous session — always verify

### 1.2 Post-Task Gate
After completing any task:
- Run stop hooks (see Section 4)
- Update NEXT.md
- Append to CHANGELOG.md

### 1.3 Drift Detection
If at any point the current work diverges from what NEXT.md says should be happening:
1. Stop
2. Flag the divergence to the user
3. Wait for confirmation before continuing

---

## SECTION 2 — CODE STANDARDS

### 2.1 Language Gate

| Layer | Language | Framework | Lint/Check Command |
|-------|----------|-----------|-------------------|
| Frontend | TypeScript/Svelte | SvelteKit + Tailwind | `cd frontend && npm run check` |
| Database | SQL | PostgreSQL (Supabase) | Supabase migrations |
| Edge Functions | TypeScript | Supabase Edge Functions (Deno) | `supabase functions serve` |
| Workers | TypeScript | Cloudflare Workers | `wrangler dev` |

### 2.2 Mobile-First Mandate
- All CSS written mobile-first: base styles for 320px+, then `@media (min-width: ...)` for larger
- Breakpoints: 640px (sm), 768px (md), 1024px (lg), 1280px (xl)
- Three-panel layout only activates at lg (1024px+)
- Below lg: single-column with bottom nav or slide-out panels
- Touch targets minimum 44×44px on mobile
- Test every component at 320px, 390px, 768px, 1024px, 1440px

### 2.3 Accessibility Standards
- All interactive elements keyboard-accessible
- ARIA labels on custom components
- Colour contrast WCAG AA minimum (4.5:1 normal text, 3:1 large text)
- Font size adjustable 13px–22px
- Reduced motion support via `prefers-reduced-motion`
- Screen reader tested for core flows

### 2.4 Dependency Validation
- Frontend: only add dependencies listed in package.json or explicitly approved
- Backend: only add dependencies listed in requirements.txt or explicitly approved
- No new dependencies without checking: size, maintenance status, licence

---

## SECTION 3 — TESTING

### 3.1 Frontend
- Component tests with Vitest + Testing Library
- Accessibility tests with axe-core
- Visual regression: manual until CI is set up

### 3.2 Backend
- pytest for API endpoints
- Test database uses SQLite in-memory for speed
- Every API endpoint has at least one happy-path test

### 3.3 Test Before Commit
Never commit code that hasn't passed:
```bash
cd frontend && npm run check && npm run test
cd backend && python -m pytest
```

---

## SECTION 4 — STOP HOOKS (Run after every task)

### 4.1 Code Task Completed
```
- [ ] Frontend check passes: npm run check
- [ ] Backend compiles: python -m py_compile app/main.py
- [ ] Tests pass (if tests exist for changed code)
- [ ] No secrets in code (grep for API keys, passwords, tokens)
- [ ] Brand compliance checked (Section 0.1) for any UI changes
- [ ] Mobile-first verified: component works at 320px
- [ ] NEXT.md updated
- [ ] CHANGELOG.md entry written
```

### 4.2 Docker/Infra Change
```
- [ ] docker compose config --quiet passes
- [ ] Containers build: docker compose build
- [ ] .env.example updated if new env vars added
- [ ] NEXT.md updated
- [ ] CHANGELOG.md entry written
```

---

## SECTION 5 — COMMIT CONVENTIONS

Format: `type(scope): description`

Types: feat, fix, refactor, style, test, docs, chore, brand
Scopes: frontend, backend, api, db, docker, brand, docs

Examples:
- `feat(frontend): add time-window selector component`
- `brand(frontend): add PaerLogo component and sieve mark SVGs`
- `fix(backend): handle malformed RSS feed encoding`
- `docs: update BRAND.md with dark mode icon specs`

---

## SECTION 6 — MULTI-FILE ATOMICITY

When a change touches multiple files (e.g., API endpoint + frontend component + test):
1. List all files that will change before starting
2. Make all changes
3. Run stop hooks
4. If any check fails, revert ALL changes, not just the failing file
5. Commit all related files in a single commit

---

## SECTION 7 — ARCHITECTURE DECISIONS

All architectural decisions recorded in DECISIONS.md.
Format: ADR (Architecture Decision Record)

Before making any decision about:
- Adding a new dependency
- Changing the database schema
- Modifying the API contract
- Changing the auth approach
- Altering the deployment architecture

Write the decision in DECISIONS.md FIRST, get confirmation, THEN implement.

---

## SECTION 8 — PROJECT STRUCTURE

```
paer/
├── CLAUDE.md              ← You are here
├── NEXT.md                ← Sprint board (read first every session)
├── CHANGELOG.md           ← Decision log (append-only)
├── DECISIONS.md           ← Architecture decision records
├── README.md              ← Public-facing project readme
├── docker-compose.yml     ← Container orchestration
├── .env.example           ← Environment variable template
├── docs/
│   ├── BRAND.md           ← Brand mandate (logo, fonts, colours)
│   └── PROJECT_BRIEF.md   ← Full project brief
├── frontend/
│   ├── package.json
│   ├── svelte.config.js
│   ├── tailwind.config.js
│   ├── src/
│   │   ├── app.html
│   │   ├── app.css
│   │   ├── routes/         ← SvelteKit pages
│   │   ├── lib/
│   │   │   └── components/ ← Reusable components (PaerLogo.svelte etc.)
│   │   └── assets/         ← SVG logos, static assets
│   └── static/             ← Favicon, manifest
└── backend/
    ├── requirements.txt
    ├── Dockerfile
    ├── app/
    │   ├── main.py         ← FastAPI app entry
    │   ├── core/           ← Config, auth, dependencies
    │   ├── models/         ← SQLAlchemy models
    │   ├── api/            ← Route handlers
    │   └── services/       ← Business logic (feed parsing, clustering)
    └── migrations/         ← Alembic migrations
```
