# Flashcard validation batch — Pillar 4 Arc 1 Phase 3

**Generated:** 2026-05-08
**Pipeline:** `frontend/scripts/generate-flashcards.ts`
**Design canonical:** Sky+v2 (per docs/lesson-plans/flashcard-design-exploration.md)
**Total cards rendered:** 72 (72 digital + print PDFs successful)

## Locales sampled (6)

- **de** — long-word + Germanic compound stress (e.g., Krankenwagen + Schauspieler)
- **en** — canonical reference
- **es** — Romance text-length baseline
- **fi** — longest-word + agglutinative compound stress
- **it** — Romance text-length baseline
- **nl** — Germanic short-word baseline

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

**Validation focus areas (post-iteration-2 two-element layout):**
- Card composition — image + word balance (sentence-frame DROPPED at Phase 4 iteration 2)
- Theme-color top accent rule visible at top of card
- Word-band legibility — expanded to 30% (was 18%); short words render larger; long-word locales soft-wrap via U+00AD soft-hyphen substrate
- Cross-locale typography — German/Finnish/Swedish words fit without distortion
- Touch responsiveness on mobile (test at 375px viewport)

### Print PDFs

`print-6up.pdf` — primary K-3 classroom-display layout. Print at 100% scale on A4. Cut along faint dashed corner guides.

`print-9up.pdf` — secondary take-home pack layout. Smaller cards; verify K-3 readability at intended use distance.

**Validation focus areas:**
- Card legibility at print scale (word-band 30% gives large word rendering at 6-up)
- Cut-line guides visible but unobtrusive
- Color reproduction (theme accent rule + image)
- Typography crispness (Fredoka renders correctly; sentence-band Lexend Deca usage no longer in scope)
- Cross-locale text-length: long words fit within reserved word-band

## Plan-agent independent review (Phase 3 + Phase 4)

Plan-agent reviewed at Phase 3 (implementation against Sky+v2 spec). Findings absorbed at iteration 1 (soft-hyphen substrate extension + Sharp palette mode change).

Phase 4 iteration 2 absorbs operator composition revision (sentence-frame drop). No additional Plan-agent review required for the simpler two-element layout — the dropped element was the source of multiple Plan-agent findings (italic concern, scaffolding rule).

## Iteration cycles

Maximum 2 iteration cycles before architectural-finding surface per Pillar 4 spec §Phase 4. **Both iterations consumed pre-second-surface (records below).**

---

## Iteration log

### Iteration 1 — Plan-agent findings absorbed (CC-adjudicator-forward, applied 2026-05-08 pre-first-surface)

Plan-agent independent implementation review against Sky+v2 spec surfaced 1 blocking-class finding + 7 informational items.

**Iteration 1 deltas:**

1. **SOFT_HYPHENS extension** (`frontend/scripts/lib/flashcard-data.ts`) — first-pass substrate covered ambulance.fi/sv but missed German validation-batch words. Without the extension, validation batch wouldn't actually exercise the substrate's behavior on the locale most needing it (de at K-3 reading distance with 12+char compounds). Added 6 entries:
   - `ambulance.de = 'Kranken­wagen'`
   - `airplane.de + sv + fi`
   - `actor.de + sv + fi`
   - `strawberry.de + sv + fi`
   - `elephant` (across long-word locales; pure stems, soft-hyphen unnecessary)
   - `hexagon.de + sv + fi`

2. **Sharp palette mode** (`frontend/scripts/lib/flashcard-render.ts`) — `palette: true` → `palette: false`. Plan-agent finding #7g flagged `palette: true` could degrade gradient + transparency for color-rich K-3 illustrations. Quality-bar trade-off: validation batch size 18MB → 40MB; preserves cleanliness.

### Iteration 2 — operator composition revision (applied 2026-05-08 second-surface)

Operator revised Sky+v2 canonical composition: drop sentence frame entirely. Two-element layout (image + word) replaces three-element layout.

**Iteration 2 deltas:**

1. **Sentence-frame substrate REMOVED** from `flashcard-data.ts`:
   - `buildSentence()` function deleted
   - Per-locale sentence-frame templates table deleted
   - Finnish K-3 simplified frame "Tässä on {word}." NSR-flag retired (no Finnish sentence-frame substrate exists)
   - Sentence-frame substrate filed as NOT recommissioned for Pillar 4 Arc 2 OR Arc N+ unless operator explicitly resurfaces

2. **Card markup simplified** in `flashcard-render.ts`:
   - `<div class="sentence-band">` element removed
   - `<p class="sentence">` element removed
   - Curly-quote framing + 6% indent + 1px left-rule scaffolding removed (no longer needed)
   - CSS variables `--sentence-color` + `--sentence-rule` removed

3. **Word-band space reallocation** (CC adjudication):
   - Grid rows: `4mm 60% 18% 13% 1fr` → `4mm 60% 30% 1fr`
   - Word-band expanded 18% → 30% (gain entire 13% sentence-band space + 5% extra)
   - Word clamp ceiling raised: `clamp(14pt, 9cqw, 32pt)` → `clamp(16pt, 12cqw, 44pt)` (digital)
   - Print word clamp raised to `clamp(16pt, 11cqw, 42pt)` at 6-up (was 30pt) and `clamp(14pt, 11cqw, 30pt)` at 9-up (was 22pt)
   - Image-band stays at 60% (visual primacy preserved)
   - Footer absorbs remainder (~7%)
   - Pedagogical rationale: two-element vocabulary-acquisition card → word is load-bearing pedagogical anchor → maximize K-3 reading-distance legibility

**Cross-locale long-word handling preserved:** SOFT_HYPHENS substrate from iteration 1 stays load-bearing. de/fi/sv long words still soft-wrap via `hyphens: auto` + U+00AD markers. de/deck.html iteration 2 verified: `Kranken­wagen`, `Flug­zeug`, `Schau­spieler` continue rendering with soft-hyphen markers at morpheme boundaries.

**Verification post-iteration 2:**
- 72/72 cards re-rendered cleanly
- No `class="sentence"` or `sentence-band` markup in any deck.html
- Theme-color top accent rule preserved
- Word-band visually expanded (30% vertical real estate; clamp ceiling 44pt)
- Soft-hyphen substrate continues working
- Validation batch size: 40MB (palette:false retained)

## Plan-agent independent review status

Phase 3 Plan-agent review: COMPLETE; findings absorbed at iteration 1.
Phase 4 iteration 2 (composition revision): no additional Plan-agent review — the dropped element (sentence frame) was source of multiple Plan-agent findings (italic concern; scaffolding rule complexity); two-element layout is structurally simpler with no remaining design-fidelity concerns.

## Operator review surface (post-iteration-2)

Validation batch ready for operator second visual review.

After review, surface back to CC with one of:
- **Pass** → CC commences Phase 5 (recon + Arc 2 commission spec; Arc 2 envelope shrinks slightly per simplified per-render generation cost)
- **Architectural finding** → issue beyond pipeline scope; surface for re-spec or scope amendment

**No iteration cycles remaining** — both Phase 4 iterations consumed (1 = Plan-agent absorption pre-first-surface; 2 = operator composition revision). Per spec §Phase 4: "Maximum 2 iteration cycles before surfacing as an architectural finding."
