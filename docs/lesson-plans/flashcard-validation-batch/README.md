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

## Plan-agent independent review (post-Phase-3)

Submit batch to Plan-agent (or design-specialist agent if available) for independent review per Pillar 4 spec §Phase 4.

CC adjudicates pass/iterate based on combined operator + agent findings.

## Iteration cycles

Maximum 2 iteration cycles before architectural-finding surface per Pillar 4 spec §Phase 4.
