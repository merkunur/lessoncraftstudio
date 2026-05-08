# Flashcard validation batch — Pillar 4 Arc 1 Phase 3

**Generated:** 2026-05-08
**Pipeline:** `frontend/scripts/generate-flashcards.ts`
**Design canonical:** Sky+v2 (per docs/lesson-plans/flashcard-design-exploration.md)
**Total cards rendered:** 72 (72 digital + print PDFs successful)

## Locales sampled (6)

- **de** — long-word stress + gendered articles
- **en** — canonical reference
- **es** — Romance gendered (un/una)
- **fi** — longest-word + agglutinative + simplified frame
- **it** — Romance gendered + vowel elision
- **nl** — Germanic uniform article (een)

## Images sampled (12)

- `animals/cat`
- `animals/elephant`
- `body parts/ankle`
- `clothing/shirt`
- `colors/red`
- `emotions/angry`
- `fruits/apple`
- `fruits/strawberry`
- `occupations/actor`
- `shapes/hexagon`
- `vehicles/airplane`
- `vehicles/ambulance`

## Directory structure

```
flashcard-validation-batch/
  de/
    deck.html      — digital viewer (open in browser)
    print-6up.pdf  — A4 6-per-page print layout
    print-9up.pdf  — A4 9-per-page print layout
  en/
    deck.html      — digital viewer (open in browser)
    print-6up.pdf  — A4 6-per-page print layout
    print-9up.pdf  — A4 9-per-page print layout
  es/
    deck.html      — digital viewer (open in browser)
    print-6up.pdf  — A4 6-per-page print layout
    print-9up.pdf  — A4 9-per-page print layout
  fi/
    deck.html      — digital viewer (open in browser)
    print-6up.pdf  — A4 6-per-page print layout
    print-9up.pdf  — A4 9-per-page print layout
  it/
    deck.html      — digital viewer (open in browser)
    print-6up.pdf  — A4 6-per-page print layout
    print-9up.pdf  — A4 9-per-page print layout
  nl/
    deck.html      — digital viewer (open in browser)
    print-6up.pdf  — A4 6-per-page print layout
    print-9up.pdf  — A4 9-per-page print layout
```

## How to validate

### Digital viewer (`deck.html`)

Open in browser. Defaults to deck-overview (horizontal-scroll strip). Click any card → single-card-focus modal (per Sky+v2 ratified architecture).

**Modal navigation:**
- Click cards or arrows (← →) for prev/next
- Keyboard: arrow keys + space (next) + ESC (close)
- Mobile: swipe left/right; tap close

**Validation focus areas:**
- Card composition — image + word + sentence layout balance
- Theme-color top accent rule visible at top of card
- Sentence frame: non-italic + curly-quoted + 6% indent + left-rule (NOT italic per Plan-agent review)
- Cross-locale typography — German/Finnish/Swedish words fit without distortion
- Touch responsiveness on mobile (test at 375px viewport)

### Print PDFs

`print-6up.pdf` — primary K-3 classroom-display layout. Print at 100% scale on A4. Cut along faint dashed corner guides.

`print-9up.pdf` — secondary take-home pack layout. Smaller cards; verify K-3 readability at intended use distance.

**Validation focus areas:**
- Card legibility at print scale
- Cut-line guides visible but unobtrusive
- Color reproduction (theme accent rule + image)
- Typography crispness (Fredoka + Lexend Deca render correctly)
- Cross-locale text-length: long words fit within reserved word-band

## Iteration cycles

Maximum 2 iteration cycles before architectural-finding surface per Pillar 4 spec §Phase 4. **Iteration 1 already absorbed pre-surface (see below).**

---

## Plan-agent Phase 3 implementation review (independent design-specialist-equivalent)

Plan-agent reviewed the rendered output + pipeline source against Sky+v2 spec.

**Verdict:** Phase 3 implementation substantially faithful to Sky+v2 canonical. 1 blocking-class finding + 7 informational items.

### Verification points (PASS unless noted)

1. **Sentence-frame italic — PASS.** No `font-style: italic` declarations anywhere; Lexend Deca Regular only. Curly-quote framing + 6% indent + 1px left-rule all present.
2. **Soft-hyphen substrate — INITIAL GAP, NOW CLOSED.**
   - First-pass substrate covered ambulance.fi/sv but missed German validation-batch words.
   - Iteration absorbed: extended SOFT_HYPHENS for `ambulance.de`, `airplane.de`, `actor.de`, `strawberry.de`, `elephant.de`, `hexagon.de`. Re-rendered de deliverables.
   - Verification: `de/deck.html` now emits `Kranken­wagen`, `Flug­zeug`, `Schau­spieler` with U+00AD soft-hyphen markers correctly placed at morpheme boundaries.
3. **Modal-as-primary architecture — PASS** (with operator-ratification informational note).
   - Architecture is correct: modal hidden by default, click-from-deck-overview opens modal, single-card focus when open.
   - Pragmatic UX: deck-overview is the landing state (visible scroll strip); modal triggers on click.
   - Plan-agent finding: this is "honestly the better K-3 UX" — discoverability via strip + focus via modal. CC adjudicates current behavior is acceptable; no change.
4. **Print PDF structure — PASS.** A4 + 10mm margins; page-break-after correctly set; cut-line guides at every card corner; clamp() chromium-supported.
5. **clamp() math at 6-up A4 — PASS.** `Krankenwagen` (12 chars) at 14pt floor fits with ~37% margin in 60mm card. Caveat at 9-up resolved by Phase 3 iteration soft-hyphen extension.
6. **Theme-color accent rule — PASS.** Verified animals/cat → `#4caf50` green and body parts/ankle → `#ec407a` pink in de/deck.html source.
7. **Implementation gaps not flagged at Phase 1 — mostly PASS.** Image alt text + aria-modal + lang attributes — all present. Sharp PNG palette quantization concern absorbed (palette:true → palette:false; trades file size for K-3 quality bar).

### Phase 3 iteration 1 deltas (applied 2026-05-08, pre-operator-surface)

Two CC-adjudicated iterations absorbed:

1. **SOFT_HYPHENS extension** (`frontend/scripts/lib/flashcard-data.ts`) — added 6 entries covering validation-batch German + Nordic stress-tests. Pre-fix: 23 entries; post-fix: 29 entries.
2. **Sharp palette mode** (`frontend/scripts/lib/flashcard-render.ts`) — `palette: true` → `palette: false`. Validation batch size 18MB → 40MB; preserves gradient + alpha quality for K-3 image library.

### Items deferred to Phase 5 / Arc 2

- Modal focus management implementation (~6 LOC; tab-order edge case)
- 9-up font-size floor margin tuning for 12+char words (consider 12pt floor)
- Font-loading offline fallback (bundle Google Fonts as base64)
- Soft-hyphen silent-fallback warning instrumentation
- Touch-swipe threshold tuning post-K-3-usability-test
- `0.5px dashed` cut-line consider `0.25mm` for printer predictability

None of the deferred items are blocking-class for Arc 1 sign-off.

### Plan-agent overall verdict

> "Phase 4 sign-off can proceed after the soft-hyphen extension; remaining informational items can roll into Phase 5 recon or Arc 2 commission spec."

Phase 3 iteration 1 closed the soft-hyphen blocker before operator surface. Remaining items deferred per Plan-agent's recommendation.

## Operator review surface

Validation batch ready for operator visual review. Open `<locale>/deck.html` in browser; print `<locale>/print-6up.pdf` and `<locale>/print-9up.pdf` at 100% scale on A4.

After operator review, surface back to CC with one of:
- **Pass** — proceed to Phase 5 (recon + Arc 2 commission spec)
- **Iterate** — specific findings to address; CC re-renders + re-surfaces (1 iteration cycle remaining per spec)
- **Architectural finding** — issue beyond pipeline scope; surface for re-spec or scope amendment
