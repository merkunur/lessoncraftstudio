# G1-310 `hundreds-chart-puzzles` : the FIVE variation faces (Phase 2, 2026-09-14)

Built from `G1-310-hundreds-chart-puzzles.md` §3 + §5 under `_FACE-BRIEF.md`, on the base of `_work/G1-310-build.md`. Ids from `_records/b3var-id-allocation.json`. Nothing shared was edited (`git diff --name-only -- scripts/worksheet-gen` shows only this family's four files + the six new ones; the other modified files in the tree belong to sibling builders); nothing was committed. (m) = measured in the real pipeline this session.

## Files

| file | what |
|---|---|
| `scripts/worksheet-gen/tools/b3var-rows/hundreds-chart-puzzles.js` | NEW: the five rows (`HANDWRITTEN: []`) |
| `types/g1/G1-347-hundreds-chart-puzzles-where-does-the-piece-go.js` · `types/g2/G2-321-hundreds-chart-puzzles-jump-puzzles.js` · `types/g2/G2-322-hundreds-chart-puzzles-mystery-number.js` · `types/g1/G1-348-hundreds-chart-puzzles-find-the-wrong-number.js` · `types/g2/G2-323-hundreds-chart-puzzles-count-the-jumps.js` | emitted by `node tools/gen-b3var-specs.js` |
| `types/g1/G1-310-hundreds-chart-puzzles.js` | the additive `mode` knob: `_buildWith` dispatches to `buildFace()` BEFORE the base path (a config without `mode` is byte-identical); `verify(page)` reads `data-lcs-mode` (stamped only by a face) and runs `verifyFaceInPage` (all five branches, own position arithmetic), else the untouched base evaluate. `_buildWith(bank, cfg, {locale, unit, items})`: `items` is the gate's injection seam (a face DRAWS injected items; verify enforces the rules). |
| `primitives/chart-fragment.js` (this family's own primitive; `grep -l chart-fragment types/` = G1-310 only) | additive `guideValues({start,end,step,guides})` export (the one guide formula, used by `chartOutline`, the F1 composer, and re-derived in-page); `chartOutline` target rect now IS the cell (`x:cx, y:cy, w:cell, h:cell, r:0`, white on white — the write-in space the child has is the cell between the grid lines; see deviation 1). `chartFragment` untouched. |
| `templates/components-b3/hundreds-chart-puzzles.js` | `chartCompass` gains `step` (default 1 → identical output; `tens` reads −100 +100 −10 +10); NEW `chartRiddle` (F3 card), `chartDistance` (F5 card), `chartGiven` (the tealSoft given cell, exported). Namespace merge checked: 155 exports, no duplicate name. |
| `qa/verify-b3-hundreds-chart-puzzles.js` | section E (faces) + 45 face poisons; the 7 base-deferred poisons (P4 P5 P6 P7 P9 P10 + the wrap decoy) are now COUNTED |
| `data/b3/hundreds-chart-puzzles.js` | untouched — the base already shipped `strings.F1..F5`; every row's EN title + instruction equals them verbatim (the gate asserts one source) |

## The five faces

| face | id | dir | kind | knob / override (on `{...base.difficulty[2]}`) | what the child does |
|---|---|---|---|---|---|
| F1 | **G1-347** | g1 | CODE | `mode:'place'` + `{pieces:4, piecePool:[sq3,plus,L3,T3,S,Z,sq3-holes], pieceCell:48, pieceFont:20, pieceGap:22, boardCell:46, boardFont:16, guides:'edges'}` | An almost empty board (`chartOutline` 468×468, guides = row 1 + column 1 at 16 px inkSoft) over a row of four FULLY printed pieces (152×152, labels 20 px, no tint, no letter, no badge; `data-lcs-piece="k"`). The child reads a piece, finds its place (tens = row, ones = column) and writes its numbers into the board; every piece cell has a board target `data-lcs-target="k" data-lcs-answer`, nothing printed there. Pieces never cover a guide, are disjoint (bounding boxes at generation; cells in verify), four DISTINCT shapes sampled from the 3×3-box pool. Row 674 ≤ 675; stack 634 ≤ 710. |
| F2 | **G2-321** | g2 | CODE | `mode:'jumps'` + `{items:8, arrows:3, noReverse:true, showSteps:false, pointer:true, chip:36, gap:8}`; extra `gradeBand:'G2'` | Compass (−10 +10 −1 +1, chips 36) + 2×4 cards, each a `jumpChain` `[given 64×52][3 arrow chips 36][coral pointer][open box 64×52]` = 296 ≤ 302 (m). Every step obeys the column rule and the range, no immediate reversal, 8 distinct starts, 8 distinct landings, all 16 distinct, landings on BOTH sides of their starts. The child follows the arrows and writes the landing. |
| F3 | **G2-322** | g2 | CODE | `mode:'riddle'` + `{items:8, kinds:[10,1], chip:36, box:{w:84,h:56}, gap:8}`; extra `gradeBand:'G2'` | Compass + 2×4 cards, each a `chartRiddle`: two clue rows `[given][arrow chip][coral pointer]` (52 + 6 + 52 = 110 ≤ 124) converging on ONE open box 84×56 at the right (228 ≤ 302). One clue is ±10 (U/D), the other ±1 (L/R) under the column rule, in random order; both resolve to the same cell; 8 targets + 16 starts all distinct on the page; the answer prints nowhere. Language-free. |
| F4 | **G1-348** | g1 | CODE | `mode:'error'` + `{shapes:[sq3,L3,T3,plus,T3,L3], cell:56, fontSize:20, box:{w:84,h:56}, gap:16, padLeft:18, cleanPieces:0}` | The base 2×3 grid; each card a fully printed piece (176×176, no anchor tint, ≥ 5 cells) with exactly ONE wrong number (`data-lcs-wrong`), an `errorKind` off the true value (±1 ±10 ±9 ±11, or the last-two-digit swap), in range, equal to no other value on the page (printed or hidden) and to no other wrong value; + a coral open box 84×56 (`data-lcs-errbox`, answer = the right number). The child circles the wrong number and writes the right one. The TRUE piece obeys the column rule (a wrap-legal decoy is a P1 FAIL). |
| F5 | **G2-323** | g2 | CODE | `mode:'distance'` + `{items:8, counterMin:1, counterMax:6, chip:36, box:44, gap:8}`; extra `gradeBand:'G2'` | Compass + 2×4 cards, each a `chartDistance`: row 1 `[A 64×52][coral chevron][B 64×52]`, row 2 `[D chip 36][box 44][16][R chip 36][box 44]` = 192 wide, 104 high. B is below-right of A with both counters in 1..6; 16 printed numbers distinct; counters never constant across the page. The child writes how many jumps down and how many right. |

The three G2 faces are the only faces that accept the `tens` unit (`UNITS.tens`, step 10; the compass, the chains, the riddles and the pairs all fold by position with `step`); F1 and F4 refuse it (`G2-face-only`), like the base.

## Renders (looked at, every one; lints + verify clean)

`scripts/worksheet-gen/out/dev/`:
- `G1-347-null-d2-en.png` — the 1-100 board with 19 guides (1..10 across, 11..91 down), four printed pieces (plus 28/37/38/39/48 · S 16/25/26/35 · T3 24/32/33/34/44 · L3 64/65/66/74/84) in one row under it; the target cells are invisible (white on white, by design: "nothing printed there"); pieces clear of every guide; ~130 px of slack above the footer on the shipped 1-line title.
- `G2-321-null-d2-en.png` — compass + 8 chains; chain 3 `2 ← 1 ↓ 11 ↓ 21` and chain 8 `98 ↑ 88 → 89 → 90` show the column rule holding at the chart edges; landings on both sides of their starts.
- `G2-322-null-d2-en.png` — 8 riddles; card 1 `24↓` and `33→` both = 34, card 6 `20↓` + `29→` = 30, card 2 `8↓` + `19←` = 18; the two pointers meet one box.
- `G1-348-null-d2-en.png` — 6 printed pieces, one error each: 84 for 48 (swap), 63 for 54 (+9), 33 for 24 (+9), 55 for 45 (+10), 87 for 86 (+1), 7 for 17 (−10); the row starts right of the badge (padLeft 18).
- `G2-323-null-d2-en.png` — 8 pairs; 4 → 35 = down 3 right 1, 13 → 78 = down 6 right 5, 87 → 99 = down 1 right 2.
- gate renders under `out/dev/g1310-gate/`: `<id>-d2-en`, `-u0-99` / `-u1-120` / `-u101-200` (+ `-utens` on the G2 faces), `-longchrome` (733), `-worstchrome` (710), `-seedN`, `<id>-control`, `<id>-poison-*`. Montages read: `g1310-faces-montage-A.png` (F1 on `1-120` at the 44 cell with 3-digit labels 102/103/104; F4 shipped; F4 under the worst chrome — 3-line German title + 3-line Finnish instruction — pieces clear of badge and footer) and `g1310-faces-montage-B.png` (F2 + F5 on `tens`: compass −100/+100/−10/+10, `740 ↑↑↑ → 440`, `440 → 690 = down 2 right 5`; F3 under the worst chrome).

## Deviations from §3 (each measured)

1. **F1 target cell = the whole cell, floor measured on the cell.** The design stamps the target "cell"; my first build inset the rect by 1 (44 at cell 46) and the gate then measured 42 on the 12-row `1-120` board, where the cell must drop to 44 (12 × 46 + 8 + 14 + 152 = 726 > 710; at 44 = 702 ≤ 710). The rect is white on a white board — invisible — so the write-in space the child actually has is the cell between the grid lines; the rect now IS the cell (`r:0`) and the floor is measured on it (≥ 44 at G1). Fixed WHAT is measured, not the threshold. `boardCell` 46 on 10-row units; 44 on `1-120`; a taller unit is refused.
2. **F1 d2 shape pool.** §3 names no d2 shapes; four DISTINCT shapes are sampled from `[sq3, plus, L3, T3, S, Z, sq3-holes]` (every 3×3-box shape; `rect4x3` is 200 px and a row of four would be 866 > 675). The design's d1/d3 F1 variants (3 pieces + `'rich'`, `'corners'`) are config-expressible (`pieces`, `guides`, `pieceCell`) but not emitted — the waves ship d2 only.
3. **F1 pieces disjoint by bounding box** at generation (stricter than "targets disjoint"); verify + gate assert cell-level disjointness (P6) and that every target sits on its derived (row, col) of the board (pixel-checked against `data-lcs-boardpx`).
4. **F3 target range = rows 1..rows−2** (`start+10 .. end−10`), a hair wider than the design's `start+11 .. end−11`: the ±10 clue needs both neighbouring rows, the column rule then picks the legal ±1 clue (column 0 → only `[t+1][L]`, column 9 → only `[t−1][R]`). 8 targets + 16 starts distinct on the page as designed.
5. **F3 "two coral pointers converging on one square"** is built as one horizontal pointer per clue row, both aimed at the shared box that spans both rows (vertically centred) — not diagonal lines; it reads as converging (render read).
6. **F4 wrong cell vs the anchor.** `chartFragment` prints the anchor's own value at `anchorIdx` (the composer cannot put the error there), so the composer picks `wrongIdx` FIRST and moves the untinted, invisible `anchorIdx` off it — every cell is equally suspect on the page. Digit swap = the last two digits (`147 → 174`), never a leading zero, only when it changes the value.
7. **F4 row is left-aligned with `padLeft:18`** (design: piece + 16 + box, centred). Centred, under 3-line chrome the card inner is 199 and the piece corner lands at (27, 25.5) from the card corner — inside the 30 px badge square; the gate's badge rule fires (m). At 18 px the piece starts at 32 and the row ends at 308 ≤ 316.
8. **F5 arrow glyphs 36, not the design's 32** (G2 element floor 36 — a 32 chip is below it); row 2 = 192 ≤ 302, height 104 ≤ 124.
9. **Compass chips on the G2 faces are 36** (`chartCompass({chip:36, step})`), not the base's 32 d1 legend chip (below the G2 floor); the strip stays 675 wide (m); the base's d1 compass is untouched (baseline PASS). The compass labels scale with `step` on `tens`.
10. **F2 d1/d3 variants not built**: `showSteps` / `pointer` exist as config; labelled chips (d1) and the inverse item (d3) are not implemented — d2 only ships.
11. **The faces' open boxes are `blankNumeralBox`** (coral dashed), the README rule the base record's deviation 5 already stated for the faces; the design wrote `answerBox`.

## Per-locale refusals visible from the bank shape (Phase 4 lowers `hub-expectations.json` explicitly)

- **None from the bank shape.** The apparatus is numerals, arrows and boxes in every face; the locale blocks carry `exemplar` + six strings only, so no locale can be refused by content (§4: 6 × 11 = 66 rows stands). Non-EN blocks are simply absent until the panels author them (`bank()` throws a refusal at build, never an en fallback) — that is Phase 4, not a lowered expectation.
- **A `tens` fan refuses F1 and F4 in every locale** (G1 faces; `G2-face-only`, by design, like the base — one recorded refusal per locale per G1 face if a wave fans all five units). fr's possible `0-99` pin renders clean on every face (m, en render on `0-99`).
- **`1-120` on F1 ships at the 44 board cell** (deviation 1) — legal, not a refusal.

## Open items for the panels / Phase 4

1. The panels author `strings.F1..F5` ×10 and audit the EN as a SOURCE; the §5 validator (`tools/validate-b3-draft.js`, absent) must carry the gate's bank rules (rule 3 head-containment still undecided — base record deviation 8).
2. Hub registration (§7): `apps['hundreds-chart-puzzles']`, `axes['exercise-type'][…]` slug/name ×11, `scripts/verify-hub-type-rows.js` — the batch's registration step.
3. The gate renders the unit variants at the SHIPPED chrome; F1 on `1-120` under the WORST chrome is arithmetic (702 ≤ 710), not rendered. Add a `1-120 × worstchrome` render when `unitAxis` fans that unit.
4. F1's target cells are invisible (white on white). A reviewer may prefer a faint tint so the child sees a board with nothing to distinguish targets from the rest — the design says nothing is printed there, and a tint would give the position away; recorded, not changed. One token (`fill`) in `chartOutline` if ruled otherwise.
5. F3's teaching weight (critic open item 5) is unchanged: clue 1 alone solves; clue 2 confirms. The d3 two-arrow-clue shape is not built.
6. F2 `inverse` (d3) and labelled d1 chips remain unimplemented config.

## Gate output

Quick (`node qa/verify-b3-hundreds-chart-puzzles.js --quick`, 6 seeds; base d1-d3 + 4 units + LONG/WORST chrome + sweep, then each face at d2 on the exemplar + the other units (+ tens on G2) + LONG/WORST + sweep, then 66 poisons):
```
G1-310 gate (base + 5 faces): PASS (6361 assertions, 66/66 poisons killed)
```
Poisons: the base's 21 + 45 face poisons — P6a (refused at build + a hand-moved target) · P6b (refused at build + one piece drawn twice) · P5a `40 R` · P5b `5 U` · P7a clues disagree · P7b start = target · P4 two wrong cells · P10 a 4-cell and a 3-cell piece · the wrap decoy `[39][40][41]` · P9 B in A's row · plus the label / target / box / chip / row / compass / mode-stamp / blank-page / errorKind / duplicate / constant-counter / stretched-card cases listed in the gate header. The design's distinctness poison (F4 with `mode` removed) was run by hand against `gate-variation-distinct.js`: `G1-348 resolves to the SAME config as its base G1-310 at d2` → exit 1; rows restored, G1-348 re-emitted identically.

Distinctness (`node tools/gate-variation-distinct.js --batch=b3 --diffs=2 --family=hundreds-chart-puzzles`):
```
[b3:hundreds-chart-puzzles] compared 15 pairs over 5 faces against their bases + pairwise within family
every variation differs from the deck its base publishes and from its siblings
```
(The first run tripped on a SIBLING's rows module — `spelling-rules` listed a handwritten spec not yet on disk; retried a minute later, clean.)

Baseline (`node tools/b3-baseline.js --check --quick`, after every edit incl. the primitive + component file):
```
checked build 3268 + enum 211 in 16s: 0 drifted (0 expected), 0 missing
PASS
```
`node i18n/build-en.js` → `build-en: 578 types … (title lint clean)`; `i18n/strings.en.json` restored with `git checkout --`.
