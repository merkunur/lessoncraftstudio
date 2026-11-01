# 06 — Logic puzzles with one proven solution, fast in the browser (task 6, Fable 5.1, 2026-11-01)

Design: ENGINES [logic-puzzles-Q1], Part 2 B3 #22, NEW-TEMPLATES §22. Built locally, nothing deployed. The catalogue is
byte-identical (slots gate against HEAD; the only touched published types, G1-158 / G3-348, gained marks on the key and
screen builds only).

## What is built — commit `cae5fff55`

- **Four pure engines** under `scripts/worksheet-gen/lib/` (no Node module, no DOM; bundled into the maker): `logic-sudoku.js`
  (4 × 4 with 2 × 2 boxes, 6 × 6 with 2 × 3 boxes), `logic-cages.js` (KenKen-style 3 × 3 / 4 × 4, sum cages, one product cage
  at the top level), `logic-code.js` (code addition as a CHAIN: a double / triple first, every later row adds one new picture),
  `logic-balance.js` (two or three unknown shapes: a ratio balance + a value balance, then a third). Each has
  `countSolutions` (exhaustive backtracking, early exit), `grade` (a forced-step solver that records the techniques it needed)
  and `generate({…, level, rng})` that keeps a puzzle only while the counter says 1 AND the grade fits the level.
- **Graded by TECHNIQUE, measured, never a clue count.** Sudoku: L1 counting only (the last empty cell of a unit; 8 / 23 clues
  by construction), L2 hidden singles (1–3 on 4 × 4, 1–6 on 6 × 6), L3 many hidden singles (≥ 4 / ≥ 10; the 6 × 6 may need
  one naked single). Measured: with hidden singles tried first a naked single is NEVER needed on a 4 × 4 and on 3 % of 6 × 6
  at minimum clues — the ladder stands on what the child actually does. Cages: L1 givens + counting (+ the forced cage on
  4 × 4), L2 needs a hidden single, L3 two hidden singles and (4 × 4) one product cage; the cage-aware naked single is never
  needed. Code: L1 three pictures to 10, L2 four to 20, L3 five, three-addend rows, rows SHUFFLED so the child must find the
  solvable row. Balance: substitute + divide (L1 to 20, L2 to 50), L3 a third shape read with both known. Every level is
  monotone (a level-3 puzzle fails `fitsLevel` for 1 and 2 — asserted). 0 generation failures over 1,800 + 1,800 + 900 + 900 seeds.
- **Eight templates**, `types/_shared/logic-more.js` + thin files, family `visual-logic` (→ the logic-puzzles maker), all
  `puzzle: true`: G1-470 number sudoku 4 × 4 (two per page) · G1-471 picture sudoku 4 × 4 graded · G3-470 number sudoku 6 × 6 ·
  G3-471 picture sudoku 6 × 6 · G2-470 cage puzzles 3 × 3 (two per page) · G3-472 cage puzzles 4 × 4 (two per page; the 4 × 4
  instruction carries `{RULE}`, filled with the product-cage sentence only on the level that prints one) · G1-472 picture code
  addition · G3-473 shape balance puzzles (three per page). Ids leave a gap (470+) so the main session's sequence never
  collides. Numeral cells are `answerBox`es (key text + type screen); picture cells get the solution picture faint on the KEY
  build and `data-lcs-drop` + legend `data-lcs-bin` on the SCREEN build (place screen). Pictures through `lib/slot.js` (pic
  slots), look-alikes filtered where the theme has data (`picture-distinct`). Every puzzle rides on the page as
  `data-lcs-puzzle` — clues only, never a solution; `verify()` re-counts it with its own inline exhaustive counter (a second
  implementation) and checks the printed answers ARE the unique solution.
- **G1-158 / G3-348** (published picture sudoku): key sample + screen place marks on the key/screen builds only (§E tap-place).
- **Tests** `lib/logic-puzzles.test.js` — 54 checks, INDEPENDENT oracles (every Latin square enumerated for cages; a
  most-constrained search for sudoku; nested loops for code / balance). Poisoned both ways: a generator that skips the counter
  (the "remove and hope" bug) is caught; one clue too few, a merged cage, the opening equation / balance dropped → ≥ 2
  solutions in both counters; a level-3 puzzle fails level 1; every real puzzle passes.
- **Gate** `scripts/makers/gates/unique-solution.js` (ENGINES' "gate 15"): every `puzzle: true` template of a built maker ×
  levels × colour + B&W theme × 2 copies × en + fi — the stamp leaks no solution key, the ENGINE counter says exactly 1, the key's
  boxes are that solution; non-vacuous; poisoned both ways on every run (a two-solution stamp, a leaked key, a wrong box; the
  real page passes). `gates/slots.js`: the five numeral/shape templates on NO_SLOT. `gates/screen-from-marks.js`: the bot
  re-tapped the bin before every target and the runtime's bin tap is a TOGGLE — two consecutive targets of one picture left the
  second empty ("Check disabled after answering everything"); no marks-place template existed before, so it never fired. The
  bot now taps a bin only when it is not already selected (one line).
- **Strings** `scripts/worksheet-gen/i18n/logic-puzzles-makers.json` (mine): title + instruction ×11 for the eight ids + `_rule`
  ×11. NOT read by `i18n/strings.js` — see NOT done.

## Measured

- `lib/logic-puzzles.bench.js --seeds=300` (Node, this PC): every engine p95 ≤ 1.4 ms, max 2.5 ms (4 × 4 cages L3 is the
  heaviest); a full page build (engine + markup + shell + key + screen build) p95 ≤ 6.8 ms, max 10 ms (G3-472 L3). In the
  browser: live-gate per-page timing (headless Chrome, generate() = engine + markup + lints + verify): 132 pages, p50 37 ms, p95 59 ms, max 84 ms. The brief's "well under a second" holds with two orders of magnitude to spare.
- Chrome render of all 8 templates × 3 levels × themes × 2 copies (84 pages): lints + verify + pageFill + cardFill 0 fails,
  every key ≥ 1 mark, every screen derives (type / place). Read by me: G1-470, G1-471, G3-470, G3-471, G2-470, G3-472,
  G1-472, G3-473 pages + two keys (the code key's values re-added by hand: 3+3+11, 17+3, 3+3+7, 3+3, 9+3 ✓).
- Maker build `--makers=logic-puzzles` (5 s): 28 templates, mine offered in en. Gates on it: unique-solution 8 templates /
  66 pages / 96 puzzles, 0 failures · parity 92 cases 0 different · screen-from-marks 45 screens, 28 classified, 1 failing (G3-353 venn-sort: NO verdict — pre-existing, not mine) · live-gate 132 pages en, 6 failing — all G3-353 ("blank worksheet", pre-existing), 0 retries ·
  slots my 8 new templates pass (pic slots on G1-471 / G3-471 / G1-472); G1-158 + G3-348 catalogue 18/18 IDENTICAL; 20 failures = every pre-existing template of this maker "draws from a pool but exposes no slot" (the per-maker recipe, not mine) · answer-keys 1,520 key pages, 1 failing (G3-353: no key and no NO_KEY reason — pre-existing).

## NOT done — what the main session must do to finish the maker

1. **Strings**: merge each locale block of `i18n/logic-puzzles-makers.json` into `i18n/strings.<loc>.json` after the native
   review (until then the eight templates ship in English only — `strings.js` reads only those files). `_rule` stays in my file
   (the type reads it).
2. **Inventory**: run `extract-type-inventory.js` (the eight rows; I built with a preload that injects them, never editing the
   file) + coverage map (G1-470/471 → 1:picture-sudoku; G3-470/471, G2-470, G3-472 → logical reasoning; G1-472 → 1.OA.D.8 /
   2.OA.B.2; G3-473 → 3.OA.D.8) + BUILD-LOG + `screen-verdicts.json` (G3-353 venn-sort has NO verdict — pre-existing).
3. **The maker's other templates (pre-existing, not mine)**: the G2-319 logic-grid family (G1-349, G2-319, G2-344/345, G3-378/379)
   refuses EVERY theme the maker offers (its bank allows only the curated `SETS.distinct` themes; the build records the first two
   manifest themes) — give the family a theme restriction (e.g. `themeAxis.only`) so the maker offers only its allowlist.
   G3-353 has no marks and no verdict. The number-walls / visual-logic templates bundle without a change.
4. **Not built from NEW-TEMPLATES §22**: T3 "Who am I?" riddles — already LIVE as G2-405 in the place-value maker (the same
   frames); building it here would duplicate; T5 "solve to rebuild the picture" (tile crops + tap-edit, Family F) — not a
   proof-of-uniqueness problem; the code-addition SECRET WORD (a per-locale word with the letters claim) — an i18n decision.
5. Thumbnails (`build-thumbs.js`) not run; the full gate loop not run (rule 8).

## Native review needed (8 × 11 + 11 strings)

`scripts/worksheet-gen/i18n/logic-puzzles-makers.json` — every block. Watch: "cage" (Käfig / cage / jaula / gaiola / gabbia /
kooi / bur / häkki) is my coinage for the thick-lined group; the multiplication sign is `·` in de/sv/da/no/fi (the page uses
`notation.js`'s glyph); the 6 × 6 "box" is a 2 × 3 rectangle (pt says retângulo; the others say box).

## Operator decisions

- Picture sudoku on the maker: two graded faces (G1-471 / G3-471) now sit beside the published G1-158 / G3-348 (clue-count
  levels). Keep both, or hide the old ones in the maker (`hideIds`)?
- G1-472 L3 drew a cat beside a cheetah (both orange cats; `animals` look-alike data does not pair them) — a data decision for
  `data/graph-lookalikes.js`, not a code one.

## Traps paid for

- An engine's `countSolutions` that restores the grid on the way out returns the CLUES as "the solution": verify compared every
  box against -1 and failed 100 % — capture the solution at the leaf.
- `pageFill` / `cardFill` count a stage's direct `<span>`, `[data-lcs-table]`, boxes and pictures — NOT a `<div>` grid of empty
  cells: a puzzle with few clues read as "53 % used / 25 % band". The grid is a `<span data-lcs-table>`.
- A level ladder written before measuring was wrong twice: "naked single = level 3" (never needed on 4 × 4), "cage-aware
  naked single = level 3" (never needed). Measure the technique distribution, then write the ladder.
- The bot/runtime toggle above; a `{RULE}` token must resolve to '' on the levels without the apparatus, or the instruction
  names a sign that is not on the page.
