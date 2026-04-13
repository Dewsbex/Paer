# BRAND.md — Paer Brand Mandate

**Status:** ACTIVE — All external outputs MUST comply.
**Last updated:** 13 April 2026
**Owner:** Steven Dewsbery

---

## Brand Name

**Paer** — always lowercase in running text: **paer**
Written with the æ ligature where supported: **pær**
Spoken as: "pair"

---

## Logo System

### Primary Lockup: Sieve Mark + Accent Ligature

The logo consists of two elements used together:

1. **Sieve Mark** — a 3×3 grid of rounded squares. Eight cells are stroked at 22% opacity. One cell (position row 1, column 2 — middle row, far right) is filled with the accent colour at 100% opacity. This represents signal found among noise.

2. **Accent Ligature Wordmark** — "pær" set in Literata serif. The "p" and "r" use the primary text colour. The "æ" uses the accent colour. Letter-spacing: -0.03em on the word, -0.06em on the æ.

### Mark Sizing
- Mark height = 85% of type size
- Gap between mark and type = 30% of type size
- Minimum clear space around full lockup = width of one grid cell

### Colour

| Token | Light Mode | Dark Mode | Usage |
|-------|-----------|-----------|-------|
| Accent | #B5521E | #D4793A | æ in wordmark, highlighted grid cell, CTAs |
| Text Primary | #1A1A18 | #E4E4DC | p and r in wordmark, grid cell strokes |
| Grid Opacity | 22% | 22% | Non-highlighted grid cells |

### Icon Variants

| Context | Treatment |
|---------|-----------|
| App icon (dark) | Sieve mark on #1C1C1A rounded square, grid strokes #555550, accent cell #D4793A |
| App icon (light) | Sieve mark on #FFFFFF rounded square, grid strokes #C0C0B8, accent cell #B5521E |
| App icon (brand) | Sieve mark on #B5521E rounded square, grid strokes rgba(255,255,255,0.35), accent cell #FFFFFF |
| Favicon | Sieve mark only, 16×16 |
| Browser tab | Sieve mark + "Paer — [context]" |

### Wordmark Only (no mark)
Permitted when space is extremely constrained (e.g. mobile nav bar at <320px).
Always use the accent ligature form: p**æ**r

### Mark Only (no wordmark)
Permitted for icon contexts: favicon, app icon, loading states.
Never use the mark alone in print or marketing without the wordmark nearby.

---

## Typography

| Role | Font | Weight | Fallback |
|------|------|--------|----------|
| Article body | Literata | 400 | Georgia, serif |
| Headlines | Literata | 400–500 | Georgia, serif |
| UI / Navigation | Atkinson Hyperlegible Next | 400–700 | system-ui, sans-serif |
| Metadata / Code | IBM Plex Mono | 300–400 | monospace |
| Logo wordmark | Literata | 400 | Georgia, serif |

### Accessibility Mandate
- Atkinson Hyperlegible was chosen because it was designed by the Braille Institute for maximum legibility. This is not decoration — it is a functional choice.
- Minimum body text size: 16px
- User-adjustable font size: 13px–22px range
- All text must pass WCAG AA contrast ratios (4.5:1 for normal text, 3:1 for large text)

---

## Colour Palette

### Light Mode
| Token | Hex | Usage |
|-------|-----|-------|
| Background | #F5F4F0 | Page background |
| Surface | #FFFFFF | Cards, reading pane |
| Text Primary | #1A1A18 | Body text, headings |
| Text Secondary | #5C5C52 | Supporting text (passes AA) |
| Text Tertiary | #85857A | Metadata, hints (passes AA for large text) |
| Accent | #B5521E | Links, CTAs, source labels, æ |
| Border | #E2E2DA | Dividers, card borders |
| Cluster | #E0EBD9 | Topic cluster badges |
| Highlight | #FFF3C4 | User highlights |

### Dark Mode
| Token | Hex | Usage |
|-------|-----|-------|
| Background | #141413 | Page background |
| Surface | #1C1C1A | Cards, reading pane |
| Text Primary | #E4E4DC | Body text, headings |
| Text Secondary | #A0A094 | Supporting text |
| Text Tertiary | #6E6E64 | Metadata, hints |
| Accent | #D4793A | Links, CTAs, source labels, æ |
| Border | #2A2A27 | Dividers, card borders |
| Cluster | #1E2A1A | Topic cluster badges |
| Highlight | #3D3520 | User highlights |

---

## Tagline

**Primary:** Many sources. One signal.
**Alternatives (approved):**
- Your feeds. Nothing else.
- Read less. Know more.
- Chaff removed.

---

## Mandatory Application

The following MUST include the Paer logo (full lockup or appropriate variant):

- [ ] Landing page / marketing site
- [ ] Web app top bar
- [ ] Browser tab (favicon + title)
- [ ] Email templates (newsletter ingestion confirmations, etc.)
- [ ] OPML export files (as comment/metadata)
- [ ] Markdown export footers
- [ ] Open Graph / social sharing images
- [ ] Documentation
- [ ] App store listings (if applicable)
- [ ] README.md in any public repository
- [ ] Presentation decks about the project

---

## What NOT to Do

- Never use the wordmark without the æ ligature in digital contexts
- Never change the accent colour
- Never place the logo on busy backgrounds without a container
- Never stretch, rotate, or animate the logo mark
- Never add drop shadows, outlines, or effects to the wordmark
- Never use the old "paer" spelling (without æ) in the logo — plain spelling is for URLs and domains only
