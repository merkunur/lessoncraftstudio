# Manual "Export for Storybook" — 29-app audit + fix (2026-07-02)

The operator drives the **manual** SEP export (generate a worksheet → click **Export for Storybook** → drag the crop box around the ONE exercise → transparent-background `{descriptor.json, visual@2x.webp}` ZIP). This audit ran every interactive app through that exact path (at its **default** pre-filled crop box, plus a wide crop) and fixed every structural discrepancy so each app exports a clean, word-guess-quality transparent exercise.

**How to regenerate:** `node scripts/storybook/audit-sep-export.js [--only=<app,…>]` → writes `<app>/{descriptor.json, visual@2x.webp, wide.webp}` here. Then eyeball the `visual@2x.webp` (the transparent render as the player ingests it).

## The two fixes shipped

1. **Universal background-panel suppression** (`REFERENCE TRANSLATIONS/catalog-export.js` → `_sepRenderTransparent`). An exercise's stimulus is images / cells / text — never a giant filled rectangle. The transparent renderer now hides any **filled `rect` covering ≥80% of the crop**, recursing into groups (apps build the exercise as an `isGeneratedItem` group with the card rect nested inside; absolute coords come from `calcTransformMatrix` per §14.7). Stroke-only rects (dashed drop-zones, grid/equation cells, the missing-piece hole) have no fill → untouched; small content boxes never approach 80% → untouched. Also added the inert `isSepHidden` decor tag for any future explicit case. **One edit fixed all panel leaks; zero app-HTML changes.**
2. **Content-missing default crops** (3 apps, additive `cropExerciseBBox` in each app's `sepOpts`). `word-guess` / `word-scramble` now span the picture clue + full word row + scrambled source letters (not just the blanks); `chart-count` now crops the whole chart group so the bottom column-key animals + y-axis are included.

Every fix is **additive + SEP-flow-only** — printable/interactive/day-job output is byte-identical (no existing code path touched).

## Per-app result (all 29)

| App | Family | Before | After |
|---|---|---|---|
| word-guess | A | default crop = blank slots only, picture clue omitted | ✅ FIXED — clue + full word row (`cropExerciseBBox`) |
| word-scramble | A | default clipped the scrambled source letters | ✅ FIXED — answer row + source letters |
| chart-count | D | default clipped the column-key animals + y-axis | ✅ FIXED — whole chart group |
| math-worksheet | A | opaque white card + "Puzzle 1" panel behind the equations | ✅ FIXED — card gone, equations float on alpha |
| find-and-count | C | light-blue filled I-Spy panel behind the grid | ✅ FIXED — panel gone |
| big-small | C | pale card panel behind the two animals | ✅ FIXED — card gone |
| more-less | C | pale card panel behind the groups | ✅ FIXED — card gone |
| odd-one-out | C | pale card panel behind the items | ✅ FIXED — card gone |
| pattern-worksheet | C | pale card panel behind the pattern row | ✅ FIXED — card gone (see crop tip) |
| addition | A | — | ✅ clean (`🐈 + 1 = ___`) |
| subtraction | A | — | ✅ clean |
| code-addition | A | — | ✅ clean (legend → add → decode) |
| find-objects | C | — | ✅ clean (animal scatter) |
| matching | E | — | ✅ clean (connect-the-pairs) |
| shadow-match | E | — | ✅ clean (item → silhouette) |
| grid-match | F | — | ✅ clean (fragments → grid) |
| missing-pieces | F | — | ✅ clean (hole + option tiles; hole preserved) |
| math-puzzle | F | — | ✅ clean (equations → fragment tiles) |
| bingo | F | — | ✅ clean (grid + tokens) |
| sudoku | F | — | ✅ clean (4×4 picture sudoku; box-shading preserved) |
| wordsearch | B | (fixed earlier this session: multi-word find-all) | ✅ clean (5×5 + labeled word list) |
| treasure-hunt | B | — | ✅ clean (5×5 animal grid) |
| prepositions | C | — | ✅ clean (scene + option circles; scene is intended) |
| cryptogram | A | — | ✅ clean (decode cells + picture clues) |
| picture-path | B | — | ✅ clean; a light-blue **stroke** frame remains (outline only, not an opaque panel) |
| picture-sort | C | — | ✅ clean; bin labels sit at the very top edge → **crop tip** below |
| alphabet-train | F | — | ✅ clean; empty band above the train → **crop tip** below |
| pattern-train | F | — | ✅ clean; empty band above the train → **crop tip** below |
| crossword | A | — | ✅ clean grid; **no clues in the crop by design** (clues live on the deck page) |

## Operator crop tips (the default box is a starting point — drag it)

- **Trains (alphabet-train / pattern-train) + pattern-worksheet:** the default box includes empty space above the exercise — drag the top handle **down** to the train / pattern row.
- **picture-sort:** the two bin labels ("animals" / "food") sit at the very top — drag the top handle **up** a little to include them.
- **crossword:** the grid has no clues baked in (they're on the deck page) — use crossword exercises where the story text supplies the words, or pair with a clue image.
- **Everything else:** the default box already frames the exercise; nudge only if you want tighter/looser margins.

## Residual minor chrome (does not block transparency; crop or ignore)

- **big-small** keeps a small blue "1" problem-number badge in the corner (a `circle`, not a panel) — crop it out if unwanted.
- **math-worksheet** keeps the "Puzzle 1" text label (an i-text, not a panel).
- **picture-path** keeps a light-blue rounded **outline** around the maze (stroke-only — you can see through it).

These are small labels/outlines within the exercise, not opaque backgrounds — the transparent background itself is clean everywhere.
