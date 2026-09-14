# G1-310 `hundreds-chart-puzzles` : BASE build record (2026-09-14)

Built from `G1-310-hundreds-chart-puzzles.md` §2 + §5 under `_BUILD-BRIEF.md`, `_SUBSTRATE.md` and the README cross-type rulings. Base face only (Phase 1); the five faces of §3 are NOT emitted, but every additive knob the base must already carry (`unit`, `printed:'all'`, `wrongIdx`, `chartOutline`, `arrowGlyph`, `jumpChain`, `chartCompass`) is in place. Nothing shared was edited (`git diff --name-only -- scripts/worksheet-gen` = 0); nothing was committed.

## Files (all type-scoped, all new)

| file | what |
|---|---|
| `scripts/worksheet-gen/types/g1/G1-310-hundreds-chart-puzzles.js` | the spec: `{id:'G1-310', slug:'hundreds-chart-puzzles', gradeBand:'G1', assetClass:'numeral-charts', exerciseType:'hundreds-chart-puzzles', themeAxis:{applicable:false}, unitAxis:{applicable:true, units:()=>['1-100','0-99','1-120','101-200','tens'], exemplar:(loc)=>bank.exemplar}, difficulty:{1,2,3}, i18n.en, build(), _buildWith() (the gate's injection seam), verify()}` |
| `scripts/worksheet-gen/primitives/chart-fragment.js` | NEW primitive: `chartFragment` · `chartOutline` (F1 board) · `SHAPES` (11 shapes / 20 explicit rotations, module-load assertion) · `UNITS` · `CELL_COUNT` · `shapeInfo` · `valueAt` · `boundaryLoops` |
| `scripts/worksheet-gen/templates/components-b3/hundreds-chart-puzzles.js` | `arrowGlyph` · `jumpChain` (F2) · `chartCompass` (d1 legend). Namespace merge verified with every sibling family present (66 exports, no duplicate name). |
| `scripts/worksheet-gen/data/b3/hundreds-chart-puzzles.js` | `HCP.en = { exemplar:'1-100', strings:{ 'G1-310', F1..F5 } }` per §5. `data/` is gitignored: the reviewer force-adds. |
| `scripts/worksheet-gen/qa/verify-b3-hundreds-chart-puzzles.js` | the §5 gate (sections A / S / C / D below) |

## What the base page is

Six pieces cut out of the hundreds chart on six numbered cards (`cardGrid({cols:2, rows:3, numbered:true})`, gap 14; every `.ws-card-stage` inline `padding:0`). A piece = a teal 3 px outline (per-edge `line`, round caps) round white cells with 1 px `grid` interior edges, on a creamDeep shadow (the polyomino boundary as ONE path offset +3/+3, `stroke-linejoin:round`); the anchor cell is tealSoft with a teal 2 px r 5 rim and a Baloo 2 700 26 ink numeral (`<text data-lcs-anchor>`); every other cell is a white r 6 blank with a `grid` 2 px `5 4` dash carrying `data-lcs-rc` + `data-lcs-answer`. Piece SVG = `w*cell + 8` × `h*cell + 8`. The apparatus is numerals only; the instruction is the only sentence.

Ladder (resolved config keys; every guard keys on these):

| key | d1 | d2 (ships) | d3 |
|---|---|---|---|
| shapes (6, shuffled per page) | plus ×2, bar-h3 ×2, bar-v3 ×2 (see deviation 1) | sq3 ×2, L3, T3, plus, T3 | sq3-holes, S, rect4x3, L3, T3, plus |
| anchorAt / cell / compass | centre (the hub cell) / 56 / yes | any / 60 / no | corner (an extremity) / 56 / no |
| innerRows / noTens | yes / yes (= "11-89, no %10" on 1-100) | no / no | no / no |
| blanks written | 16 | 32 | 32 |
| piece box (px) | 176 × 176 / 176 × 64 / 64 × 176 | 188 × 188 | 176 × 176 / 232 × 176 (rect4x3) |
| blank cell (px) | 48 | 52 | 48 |

Generation (`placePieces`): per piece the LEGAL origin set is computed (column rule `col(origin) + w - 1 <= 9`, range, the d1 inner-ring rows, the d1 no-multiple-of-10 rule on the piece's cells, a free bounding box on the chart) and one origin is drawn uniformly; the anchor is the hub (d1) / any cell (d2) / an extremity (d3). Distinct values on the page follow from disjoint boxes by construction. The only page-level retry is the ≥ 4-anchor-rows rule (`PAGE_ATTEMPTS` 300; never reached in the sweeps). A unit outside `UNITS`, the `tens` unit (G2-face-only), a non-EN locale (no bank block) and a cell below 52 THROW (refusal).

Answer hiding: root `<div data-ws-content data-lcs-hcp data-lcs-unit data-lcs-start data-lcs-end data-lcs-step data-lcs-pieces-n data-lcs-anchor-at data-lcs-compass data-lcs-cellpx data-lcs-innerrows data-lcs-notens>`; piece root `data-lcs-prim="chart-fragment" data-lcs-shape data-lcs-rot data-lcs-w data-lcs-h data-lcs-origin data-lcs-anchor data-lcs-anchor-idx data-lcs-cellpx data-lcs-start data-lcs-end data-lcs-step data-lcs-printed`; every cell rect `data-lcs-rc="r,c"`, the anchor rect `data-lcs-given`, blanks `data-lcs-answer`. `verify(page)` re-derives every value by `v(r,c) = origin + step*(10r + c)` and asserts: anchor text === derived === root stamp; every blank === derived; exactly ONE given + ONE `<text>` per piece and no `<text>` on a blank (by geometry too); the column rule ("row-edge wrap"); the range ("out of range"); the cells span exactly w × h; 4-connected; page-wide distinct values ("duplicate value"); disjoint bounding boxes; anchors on ≥ 4 chart rows; `pieces === pieces-n`; the compass present iff stamped and carrying no ground truth; d1 (`centre`): every blank one move from the anchor + no multiple of 10; d3 (`corner`): the anchor is an extremity; no `data-lcs-answer`/`-given` outside a piece.

## Deviations from the design file (each measured)

1. **`sq2` is not on the d1 ladder.** The design lists `sq2 / bar-h3 / bar-v3 / plus` for d1 with `anchorAt:'centre'` AND the verify rule "every blank one move from the anchor". A 2×2 has no centre and its diagonal cell is two moves from any anchor, so `sq2` cannot satisfy the design's own d1 rule. d1 ships `plus ×2, bar-h3 ×2, bar-v3 ×2` (16 blanks, 3 shape kinds, the compass explains the four moves). `sq2` stays in `SHAPES` (4 cells) for a face; the gate's "a d1 piece two moves from its anchor (sq2)" poison proves verify rejects it at d1.
2. **`anchorAt:'centre'` = the hub cell; `'corner'` = an extremity.** `shapeInfo` derives `hub` (the cell adjacent to every other cell: plus centre, bar middle) and `extremities` (fewest in-shape neighbours: the four arm ends of a plus, the ends of S/Z/L3/T3, the four corners of rect4x3 / sq3-holes). The design's "corner" cannot be a bounding-box corner for the plus (no cell sits there), so extremity is the honest reading; verify asserts it.
3. **`data-lcs-cell` (px) renamed `data-lcs-cellpx`** on the piece root, the page root and the F1 board root, because `printed:'all'` labels carry `data-lcs-cell` = a VALUE — two things under one attribute name is a recorded trap. `printed:'all'` cells also default to NO anchor tint (`anchorTint:false`) so F4's hunt has no "surely right" cell; pass `anchorTint:true` to keep it.
4. **The compass carries `class="ws-chart-compass"`** (no `data-lcs-*`, as designed) so verify can prove it is present iff `data-lcs-compass="1"` and that it holds no ground truth.
5. **The blanks stay grey-dashed SVG cells, not `blankNumeralBox`.** The README's `blankNumeralBox` rule exists because `answerBox` without an `answer` stamps `"undefined"`; every blank here is an SVG rect that carries its derived `data-lcs-answer`, so that defect class cannot occur, and the design RULED grey over coral (32 coral boxes read as a test; coral is reserved for the faces' pointers). No HTML numeral box exists on the base. The faces' boxes (F2 `jumpChain` today; F1 / F3 / F4 / F5 in Phase 2) use K-320's `blankNumeralBox` via the namespace (`jumpChain` resolves it at call time — a top-level require would be circular while the namespace merges). Reviewer: flipping the cell dash to coral is one token (`T.grid` → `T.coral` in `chartFragment`).
6. **Shapes are shuffled per page** (design diagram shows a fixed card order): the seed sweep needs distinct pages and the card order is not pedagogical. 20/20 distinct pages at every level.
7. **The worst legal chrome measures 733 (3-line title + 2-line instruction) and 710 (3-line + 3-line), not 722** — the K-320 finding reproduced on A4 in the real pipeline: a 150-char EN instruction wraps to TWO lines; three lines need long-word wrapping (a 150-char Finnish string does it). Stack at 710: d2 cards 227 → inner 199 vs piece 188 (margin 5.6 each side); d1 compass 46 + 14 + cards 207 → inner 179 vs 176; d3 rect4x3 232 × 176 in 302 × 199. At the shipped 2-line EN title (body 766) the margins are 24 / 20 / 30.
8. **The design's §5 validator rule (3) "each face title contains the head + ONE distinguishing element" contradicts its own §4 EN titles** (F1 "Where Does the Piece Go?", F5 "How Far Apart? Count the Jumps" carry no "Hundreds Chart"). The bank ships the §4/§6 titles verbatim (they are the SOURCE the panels audit); the gate asserts ≤ 70 / no worksheet-word / unique / never the bare head / no slot / an end mark, not head-containment. The validator author decides which way rule (3) goes.
9. **`unitAxis.units()` lists `tens`** (the README: the wave ships the exemplar; `unitsPerType:5` would enumerate it) and the base THROWS on it — a wave that fans all five records ONE refusal per locale for the base, by design.
10. **Anchor cell ground is tealSoft to the square edge** under its rounded rim (the first d3 render showed a white sliver between the r 5 rim and the teal outline at the piece corners; zoomed, fixed, re-rendered).

## Gate `qa/verify-b3-hundreds-chart-puzzles.js`

Own ground truth (the gate re-derives every value, the column rule, the range, connectivity, distinctness, boxes and anchor rows in its own in-page code, and reads `SHAPES`/`UNITS`/the bank directly). Sections: **A** bank (exemplar a `UNITS` key and not g2Only; 6 strings: ≤ 70, worksheet-word, unique, never the bare head, no non-unit slot, ≤ 150 + end mark, no free claim; `strings['G1-310'] === spec.i18n.en`) · **S** shapes + units (own connectivity / ≤ 4×4 / normalised / declared counts; whole rows; g2Only on tens only) · **C** real-pipeline renders: d1/d2/d3 on the exemplar, d2 on `0-99` / `1-120` / `101-200`, `tens` refused, LONG chrome (733) × d1-d3, WORST chrome (710) × d1-d3, 20-seed sweep × d1/d2/d3; per render: lints clean, verify empty, the audit, pieces === cfg, blanks ≥ 44 px (G1 floor), anchor numeral ≥ 26 px and inside its cell, piece inside the card's inner box and clear of the 30 px badge, compass ≤ 675 and inside the body iff cfg.compass, the probe title 3 lines / the WORST instruction 3 lines (a vacuous probe fails), non-vacuity; sweep: ≥ 3 distinct shapes per page, no two seeds identical · **D** poisons.

Quick run (`--quick`, 6 seeds):
```
G1-310 gate: 2201 assertions, 0 failures, poisons 21/21 killed (7 deferred to the faces) → PASS
```
Full run (20 seeds):
```
G1-310 gate: 5393 assertions, 0 failures, poisons 21/21 killed (7 deferred to the faces) → PASS
```
(sweep: d1 20/20, d2 20/20, d3 20/20 distinct pages.)

Poisons killed (21/21; the correct EN bank + d2 page is the control): **P1** anchor 20 with a cell one column right (bar-h3 at 19 → "row-edge wrap") · **P2** anchor 95 with a cell one row down (bar-v3 at 85 → "out of range") · **P3** two pieces both containing 45, one printed one hidden (sq3 at 34 anchor 45 + bar-h3 at 44 → "duplicate value") · **P8** a blank cell with its value as `<text>` ("answer printed") · **P11** the bare family head as a title (the validator's de "Hundertertafel" case, run on the EN bank check) · **P12** `exemplar:'1-99'` at the bank check AND refused at build ("unknown unit") · `tens` refused at build + as an exemplar · two anchors on one piece · bounding boxes overlapping without a shared cell (L3 at 11 + bar-h3 at 12) · anchors on two chart rows (six sq3 at 1/4/7/31/34/37) · a d1 sq2 (two moves) · a d1 piece carrying 20 · a detached cell (rc `0,1` → `0,3`) · cells shrunk to 40 (blank 32 < 44) · the flat-760 stack (cards `min-height:250` under 3-line chrome → footer lint) · a hand-edited anchor numeral · a page of 5 pieces · the compass stripped at d1 · a blank page.
**Deferred (need face code): P4 (F4 two wrong cells), P5 (F2 `40 R` / `5 U`), P6 (F1 guide cell / shared cell), P7 (F3 clues disagree / start = target), P9 (F5 d1 shape at d2), P10 (F4 2-cell piece), the F4 wrap decoy** — printed as DEFERRED, never counted.

## Renders (looked at, all lints + verify clean)

`scripts/worksheet-gen/out/dev/`:
- `G1-310-null-d1-en.png` · `G1-310-null-d2-en.png` · `G1-310-null-d3-en.png` (exemplar `1-100`, shipped chrome)
- `G1-310-null-d2-en-u0-99.png` (the second unit)
- gate renders under `out/dev/g1310-gate/`: `G1-310-d2-en-u1-120.png`, `G1-310-d2-en-u101-200.png` (3-digit anchors fit the 56 cell: "175" at 26 px), `G1-310-d{1,2,3}-en-longchrome.png` (733), `G1-310-d{1,2,3}-en-worstchrome.png` (710, German 3-line title + Finnish 3-line instruction), the seed sweep, the poison pages.
- `G1-310-faces-probe.png` — a scratch probe of the Phase-2 exports through the real lints: `chartOutline({cell:46, guides:'edges'})` = 468 × 468 with 19 guides at 16 px and 9 target cells; four `chartFragment({printed:'all', cell:48, fontSize:20})` = 152 px each; `jumpChain` d2 row **296 px** (design 296), d3 shape (4 chips, gap 4, no pointer) **292 px** — both ≤ 302. (The probe page itself overflows the footer because it stacks the F1 layout AND two chain cards on one sheet — a probe artefact, not a component defect.)

## `b3-baseline --check --quick`

```
checked build 2816 + enum 200 in 17s: 11 drifted (0 expected), 0 missing   (all 11 = wave:wave-001..011, legacy, ignored per the brief)
```
**build section 0 drift** → G1-310 touched nothing shared. `node i18n/build-en.js` → `494 types … (title lint clean)`; `strings.en.json` restored with `git checkout --` afterwards (the reviewer rebuilds it at merge).

## Open items for the faces / panels

1. **`unitAxis` tokens:** the default `{U}` is the raw unit key (`1-100`); a panel that wants "1 bis 120" / "de 0 à 99" in a title needs a per-unit label table (`unitAxis.tokens`) — add with the first such title, additively.
2. **Validator rule (3) vs the §4 titles** (deviation 8): decide head-containment before `validate-b3-draft.js` is written; the EN F1..F5 titles in the bank are the design's own.
3. **The faces reuse the base's seams:** `_buildWith(bank, cfg, {locale, unit}, ctx)` for injection; `chartFragment({printed:'all', anchorTint, wrongIdx, wrongValue})`; `chartOutline({guides, targets})`; `jumpChain({answer})` (the face computes the landing under the column rule and passes it — the arithmetic fold is the fallback); `chartCompass()`. F1 must add its own `data-lcs-piece="k"` stamp and board-target verify; F2 the `data-lcs-move` fold with the column rule (P5); F3 the two-clue agreement (P7); F4 the `data-lcs-wrong` uniqueness (P4/P10) and the wrap-decoy ban; F5 the `data-lcs-answer` counters (P9).
4. **`tens` on the G2 faces:** `UNITS.tens` carries `step:10`; `chartFragment` and `verify` already read `step` from the stamps (values = `origin + 10*(10r + c)`); the anchor numeral at `fontSize:24` for "1000" (52 px) is the design's knob.
5. **Grey vs coral blanks** (deviation 5) — a one-token reviewer call.
6. **Hub registration** (§7): `apps['hundreds-chart-puzzles']` + `axes['exercise-type']['hundreds-chart-puzzles']` slug/name ×11 are ABSENT; `scripts/verify-hub-type-rows.js` is absent — both are the batch's registration step, not this build.
