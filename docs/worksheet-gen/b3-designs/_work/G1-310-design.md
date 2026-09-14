# G1-310 `hundreds-chart-puzzles` : DESIGN (studio A+B, 2026-09-14)

Read: `_STUDIO-BRIEF.md`, `_SUBSTRATE.md`, README "Cross-type rulings" (722 body; `unitAxis`), `_PANEL-FINDINGS.md` 13, `G2-315-spelling-rules.md`, `G1-308-read-and-do.md` (the `minmax` budgeting idiom). Looked at: `out/dev/G1-129-animals-d2-en.png` (house chart: cell 60, coral dashed missing cells, teal frame), `out/batchI/G1-131-animals-d2-en.png` + `G2-226-vehicles-d2-en.png` (the tealSoft given cell + grey dashed answer box + coral `-1 / +1` labels). Code read: `primitives/hundreds-chart.js` (options `start end missing highlights cell`; 10 cols fixed; pad 4; missing = white + coral 2 px dash `5 4`; numeral `cell*0.36` Baloo 600; interior grid lines 1 px `grid`; stamps `data-lcs-prim/start/end/cell/missing/highlight`), `primitives/_svg.js` (`el svgRoot roundedRect line circle label tickRow`), `templates/components.js` (`answerBox({w,h,answer})` = `.ws-answerbox`, `chipRow`), `layouts/card-grid.js` (`cardGrid({cards,cols,rows,numbered})`, cells `minmax(0,1fr)`, gap 14), `page/page.css` (`.ws-card` padding 12 border 2 r 14 overflow hidden; badge 30; `.ws-answerbox` dashed `#C8BFAE` 2 px r 10 Baloo 26; `.ws-pattern-slot` 64 white; `.ws-nchip/.ws-nstrip`), `types/g1/G1-129-hundreds-chart-missing.js`, `types/_shared/neighbors.js` (G1-131: given = `.ws-pattern-slot` 84x64 tealSoft + teal border Baloo 28; blank = `answerBox` 84x64; arrow label coral Baloo 20), `primitives/number-line.js`, `primitives/_tokens.js`, `qa/lints.js`. (m) = measured today; *est.* = the engineer measures.

## 1 Page concept (base)

SIX pieces cut out of the hundreds chart, ONE number each. Six numbered cards (2 columns x 3 rows) each hold one chart piece: a teal-outlined shape (3x3, L, T, plus, 2x3) lying on the cream card with a small creamDeep drop shadow so it reads as a piece someone lifted off the chart. Inside, one cell is shaded tealSoft and prints its number; every other cell is white with the dashed grey answer square. The child reasons from the anchor: right = +1, down = +10, and writes the rest. Nothing on the apparatus is text; the instruction is the only sentence.

Why pieces on cards, not fragments drawn on a chart: drawn in place the page collapses into G1-129 (the child counts along the chart instead of reasoning +-10); loose pieces force the place-value step the genre exists for (de Hundertertafel-Ausschnitte, sv hundraruta-pusselbitar). Themeless (`themeAxis:{applicable:false}`; landings carry `coordinate.theme:''`); no `unitAxis` (nothing to fan but the range, which is the ladder).

## 2 Layout + px grid (d2)

`.ws-page` padding 0 14 -> inner **675**; body budgeted at **722** (README ruling; 814/781 are the easy cases and the grid absorbs the slack via `minmax(0,1fr)`).

```
 cardGrid({cols:2, rows:3, numbered:true})   gap 14   card 330 x 231 (at 722)
 +-(1)------------------------+  +-(2)------------------------+
 |      +----+----+----+      |  |      +----+----+----+      |
 |      |    |    |    |      |  |      | 47 |    |    |      |   3x3  188x188
 |      +----+----+----+      |  |      +----+----+----+      |   cell 60
 |      |    | 34 |    |      |  |      |    |    |    |      |
 |      +----+----+----+      |  |      +----+----+----+      |
 |      |    |    |    |      |  |      |    |    |    |      |
 |      +----+----+----+      |  |      +----+----+----+      |
 +----------------------------+  +----------------------------+
 +-(3) L  188x188 ------------+  +-(4) T  188x188 ------------+
 +-(5) plus 188x188 ----------+  +-(6) rect 2x3 188x128 ------+
```
- **Card** 330 x 231 (m: (675-14)/2, (722-28)/3); inner **302 x 203** (padding 12, border 2). Content = one `.ws-card-stage` (flex, centred) holding the piece SVG. Piece left edge sits at 12 + (302-188)/2 = 69, clear of the 30 px badge.
- **Piece** `chartFragment({shape, rot, origin, anchorIdx, cell:60, start:1, cols:10})`: SVG W = w*60+8, H = h*60+8 (pad 4, the `hundredsChart` convention). 3x3 / L / T / plus = 188x188; rect 2x3 = 188x128; rect 3x2 = 128x188; d3 rect 2x4 = 248x128 (<= 302).
- **Cell internals** (per cell, in draw order): shadow `roundedRect` creamDeep at (+3,+3) r 6, then the white cell rect; shared interior edges 1 px `grid` (as `hundreds-chart.js:45-46`); **anchor** = `roundedRect` inset 2, r 5, fill tealSoft, stroke teal 2 + `label` Baloo 700 **26** ink `data-lcs-cell`; **blank** = `roundedRect` inset 4 (52x52) r 6 fill white stroke `grid` 2 px dash `5 4` `data-lcs-answer` (the SVG twin of `.ws-answerbox`, `page.css:220-231`).
- **Outline**: every cell edge whose neighbour is NOT in the shape is emitted as a teal 3 px `line` (round caps) = the piece boundary; no path union needed.
- **Why grey dashed blanks, not the house chart's coral dashes**: G1-129 has 12 coral cells; this page has up to 48 blanks. 48 coral squares shout and cost ink; the `.ws-answerbox` convention is grey dashed and is what G1-131 puts beside its tealSoft given, so the child already knows it means "write here". Coral is reserved for the arrows and labels of face F2/F3.
- **Stack at the 722 floor**: 3 x 231 + 28 = 722 (slack 0 at the grid; inside each card 203 - 188 = 15). At 814 the cards grow to 259 and the pieces stay centred. Cell 60 >= G1 44; numeral 26 = G1 floor; 6 items within [6,12].
- **d1**: 6 pieces, all 3x3, anchor = centre cell, cell **56** (176) so a `chartCompass` strip (675 x 46, section 5) fits above: 46 + 14 + 3 x 207 + 28 = 709 <= 722; card inner 179 >= 176. Pieces avoid the decade column (no multiple of 10 inside) and rows 1 and 10. **d3**: range **1-120** (12 rows; `start:1, end:120`), shapes L / T / plus / rect 2x4 / L / T with rotations, anchor = a LEAF cell (a shape end, so the child chains two steps), cell 56, no compass.

## 3 Ladder (resolved config; guards key on keys, never the level index)

| | d1 | d2 (ships) | d3 |
|---|---|---|---|
| range | 1-100 | 1-100 | 1-120 |
| shapes | sq3 x6 | sq3, sq3, L, T, plus, rect(2x3 or 3x2) | L, T, plus, rect2x4, L, T |
| anchor | `center` | `any` | `leaf` |
| cell / compass | 56 / yes | 60 / no | 56 / no |
| extra | `avoidDecadeEdge:true` | | rotations 0-3 for L and T |

## 4 Answer-hiding + uniqueness

- Only the anchor prints. Stamps on the piece root: `data-lcs-frag data-lcs-shape="L" data-lcs-rot="2" data-lcs-w data-lcs-h data-lcs-origin="34" data-lcs-anchor="45" data-lcs-anchor-idx="3" data-lcs-cell="60" data-lcs-start="1" data-lcs-end="100"`; per cell `data-lcs-rc="r,c"`; blanks `data-lcs-answer`. `origin` = the value at the bounding box's top-left (it need not be a cell of an L; it is a coordinate, not an answer).
- **verify()** re-derives every cell as `origin + r*10 + c` and asserts: anchor text == derived; every `data-lcs-answer` == derived; exactly ONE anchor per piece; `(origin-start)%10 + (w-1) <= 9` (no column wrap) and `origin + (h-1)*10 + 9 <= end` (inside the range); cell sets of the six pieces pairwise DISJOINT (composer also keeps bounding boxes disjoint); six anchors distinct; anchors span >= 4 distinct chart rows (variety); d1 only: no derived value % 10 == 0.
- Uniqueness: a piece with a printed shape outline and one known cell has exactly one filling (the outline fixes r,c of every cell). The jump face stamps the path (section 7, F2).

## 5 Primitives / components

**Reused as is:** `_svg.js` (`svgRoot roundedRect line label el`), `components.js answerBox` (chains, error face), `layouts/card-grid.js cardGrid`, `.ws-pattern-slot` inline-styled as `neighbors.js:9` for the chain start cell, `.ws-card-stage` (lint content selector), `hundredsChart` conventions by reference only (pad 4, 1 px interior grid, `data-lcs-cell/start`). `hundredsChart` itself is NOT called: its columns are fixed at 10, its missing cells are coral, and it cannot draw holes; extending it risks `b3-baseline --check` drift.

**NEW `primitives/chart-piece.js`** (one cell-drawing helper, two exports):
- `chartFragment({shape:'sq3'|'L'|'T'|'plus'|'rect'|'row10'|'col10', rot:0-3, w, h, origin, anchorIdx|anchorIdxs:[], printed:'anchor'|'all', wrongIdx?, wrongValue?, cell, start, cols:10, fontSize:26, shadow:true, dashedBlanks:true})` -> `{svg, width, height, meta:{cells:[{r,c,value}]}}`. Shapes as (r,c) offset lists: sq3 = 9 cells; L = (0,0)(1,0)(2,0)(2,1)(2,2); T = (0,0)(0,1)(0,2)(1,1)(2,1); plus = (0,1)(1,0)(1,1)(1,2)(2,1); rect = w x h; row10 = 1x10; col10 = 10x1. `rot` rotates the offset list inside its bounding box.
- `chartOutline({start, end, cell, landmarks:'edge'|'none'|'all', holes:[[values]], targets:[[values]], fontSize})` -> a 10-column board, teal 3 px frame r 10, interior lines **inkSoft 1.5 px** (not `grid`: it must survive mono print), `landmarks:'edge'` prints row 1 + column 1 in inkSoft Baloo 600 16, `'all'` prints every numeral (fontSize 18), holes = creamDeep-filled cells with an inkSoft 1.5 px dashed boundary and no numeral, targets stamp `data-lcs-target="k" data-lcs-answer` on empty cells. Stamps `data-lcs-board data-lcs-start data-lcs-end data-lcs-cell`.

**NEW in `templates/components-b3.js`:**
- `arrowGlyph({dir:'U'|'D'|'L'|'R', size:48, label?})`: SVG chip, white r 10 border 2 creamDeep, a teal 4 px (`stroke.accent`) arrow (shaft + open head, 28 px), optional coral Baloo 700 16 label (`-10 +10 -1 +1`, U+2212 minus as `neighbors.js:12`) beneath (chip 48x66 when labelled). `data-lcs-move`.
- `jumpChain({start, moves:['D','D','R'], showSteps:false, cell:60})`: `[.ws-pattern-slot 60x60 tealSoft given][12][arrowGlyph x n, gap 10][12][coral pointer 24 px][12][answerBox 64x60]`; `showSteps:true` inserts an `answerBox` after every move. Root `data-lcs-chain data-lcs-start data-lcs-moves data-lcs-answer` (landing value), intermediate boxes stamped.
- `chartCompass()`: 675 x 46 strip, four groups `U -10 | D +10 | L -1 | R +1` (arrowGlyph 32 + coral Baloo 20 label), centred, `aria-hidden`, no `data-lcs-*`.

## 6 Locale slot structure

- Numerals, arrows, signs are universal: NO per-locale data on the apparatus. `i18n/strings.<loc>.json` carries only `{title, instruction}` per id (6 ids). Digits render as plain Baloo 2 text (`label`), never the `data/tracing` digit forms (the crossed 7 / flagged 1 are tracing models; G1-129 ships plain Baloo digits in all 11 locales today).
- **One data slot: `bank[loc].chartStart` = 1 (default) or 0.** fr "tableau des nombres" and some en "hundred square" traditions are 0-99; a panel may set 0 (data decision, no code: `chartFragment/chartOutline` take `start`, verify reads `data-lcs-start`). Range = `[start, start+99]` (d3 `+119`).
- RTL: none. Text growth: the instruction only (<= 150 chars, may wrap to 3 lines: that is the 722 case).

## 7 Five variation faces (all CODE: each is an additive `mode` knob on `build()` + a `verify()` branch; the base stays byte-identical with no `mode`)

Chosen: (b) (c) (d) (f) + a replacement for (e). **(e) "mystery number cards" is REJECTED**: "+10 then -1" as icons is the same DO as (c) with a different notation; `gate-variation-distinct` would pass it on config but the two landings share one query face. Its idea survives as F2's d1 scaffold (labelled arrows).

### F2 : Hundreds Chart Jumps (c) : `mode:'jumps'` (G1, `G1-3xx TBD`)
**Move**: follow arrows across the chart, write where you land. Layout: `chartCompass` 46 + 14 + `cardGrid({cols:1, rows:6, numbered:false})`: rows (722-60-70)/6 = **98**, inner 70 >= 60. Each row = `jumpChain` centred, width ~348 (60+12+3x48+20+12+24+12+64). d2: 3 moves, start anywhere the path fits, no immediate reversal (D then U), landing != start. d1: 2 moves, labelled arrows, `showSteps:true`. d3: 4 moves, no compass. **Verify**: re-walk `data-lcs-moves` from `data-lcs-start`: L/R stay in the row (`(v-start)%10` never wraps), U/D stay in range; final == `data-lcs-answer`; 6 landings distinct. Query face: "jumps" / "Sprünge auf der Hundertertafel" / "hopp i hundrarutan".

### F3 : Rows and Columns (d) : `mode:'strips'` (G1, `G1-3xx TBD`)
**Move**: the +-1 line against the +-10 line. Layout (cell **50**, numerals 26): compass 46 + 14 + a flex row `align-items:center`: LEFT 3 `row10` strips 508x58 stacked gap 24 (222, centred vertically) + gap 39 + RIGHT 2 `col10` strips 58x508 side by side gap 12 (128). Width 508+39+128 = 675; height 60+508 = 568 <= 722 (outer flex `justify-content:center`). Each strip: 2 anchors, indices >= 4 apart. **A row and a column always meet at one number** (row 31-40 meets column 4 at 34), so page-level disjointness is impossible here; rule: anchors never sit on an intersection value, anchors distinct across strips, the 3 rows are 3 distinct decades, the 2 columns 2 distinct units digits. d1: 2 rows + 2 columns, 3 anchors each; d3: 3 + 3, ONE anchor each, cell 46 (rows 468 + 39 + 3x58+24 = 681 <= 675? NO: d3 columns at cell 44: 3x52+24 = 180; 448+39+180 = 667 ok). **Verify**: per strip every blank == origin + i (row) or origin + 10i (column); `data-lcs-shape="row10|col10"`; the intersection rule above.

### F4 : Where Does the Piece Fit? (b) : `mode:'locate'` (G1, `G1-3xx TBD`)
**Move**: place a fully printed piece on an almost empty board by place value (tens = row, ones = column); draw its outline there and write its numbers into the board. Layout: `chartOutline({cell:46, landmarks:'edge'})` 468x468 centred + 14 + a row of 3 `chartFragment({printed:'all', cell:56})` 176x176, gap 40 (608 wide). Height 658 <= 722. Pieces avoid row 1 and column 1 (origin row >= 2, col >= 2) so no landmark is a target; pieces disjoint. Board target cells stamped `data-lcs-target="k" data-lcs-answer`; nothing printed there. d1: board 1-50 (5 rows, cell 56 = 288 tall) + 2 sq3 pieces at cell 60; d3: 4 pieces at cell 48 (152 x 4 + 42 = 650) printed with ONE anchor only (fill + locate). **Verify**: for every piece the board cells at its derived positions carry `data-lcs-target=k` and their `data-lcs-answer` == derived; no target on a landmark; targets disjoint. Query face: "where does the piece fit" / "Wo passt das Puzzleteil" / "var passar biten".

### F5 : Cut-and-Paste Chart Puzzle (f) : `mode:'cut'` (G1; d1 is the K-friendly 1-50 board)
**Move**: motor + matching: cut 4 printed pieces, glue each into its hole. Layout: `chartOutline({cell:46, landmarks:'all', fontSize:18, holes:[4 cell sets]})` 468x468 + 14 + a cut rule (full-width inkSoft 1.5 px dash `8 6`, `data-lcs-cutline`; scissors glyph: UNKNOWN, the engineer reuses the cutting family's glyph if one exists, else none) + 12 + 4 `chartFragment({printed:'all', cell:46, shadow:true})` 146x146 in a shuffled row, gap 24 (656 wide). Height 468+14+20+12+146 = 660. **Pieces and holes MUST share `cell` (46 = 46) or they do not physically fit; verify asserts it.** Holes: sq3 / L / T / plus, disjoint, at least one cell apart. d1: board 1-50, 3 holes, cell 56 (288 + 46 + 176 = 510); d3: 5 pieces for 4 holes, the 5th a distractor whose values are all printed on the board. **Verify**: each hole's cell set == exactly one piece's derived set; distractor values all present as printed board numerals; every printed numeral text == derived. No pencil answer (the answer is a position); layout lints + this consistency check.

### F6 : Find the Wrong Number (new, replaces e) : `mode:'error'` (G2, `G2-3xx TBD`)
**Move**: check instead of produce: every cell of the piece is printed, ONE is wrong; cross it out, write the right number in the box. Layout = the base grid; card content = `chartFragment({printed:'all', cell:56, wrongIdx, wrongValue, fontSize:24})` 176x176 + 16 + `answerBox({w:64,h:56})` in a row (256 <= 302; 176 <= 203). Wrong value drawn from {derived +-1, +-9, +-10, +-11, digit swap} inside the range and not equal to any other cell of the piece (so the odd cell is unique: the other cells fix the grid). Stamps `data-lcs-wrong-idx`, the wrong cell `data-lcs-printed`, box `data-lcs-answer` = derived. d1: sq3 only, error = +-1; d3: L/T/plus, error = digit swap or +-9/11. **Verify**: exactly one cell text != derived; box == derived of that cell; wrong value plausible-set member. Query face: "find the mistake" / "Fehler in der Hundertertafel" / "hitta felet".

## 8 Two alternatives + recommendation

1. **3 columns x 2 rows** (cards 216 x 354, inner 188 x 326): a 3x3 at cell 56 (176) just fits the width, but every card carries ~150 px of dead height, the d3 rect 2x4 (248) cannot fit, and six tall cards read as a table. Rejected.
2. **One board with six pieces drawn in place** (fragments outlined on a faint 10x10): cheaper (one SVG) but it is G1-129 with fewer blanks; the child counts across the board and the +-10 reasoning disappears. Rejected (kept as F4/F5 where the board IS the task).
**Recommendation**: 2 columns x 3 rows, cell 60, grey dashed blanks, one anchor, shadowed pieces (section 2).

## 9 Risks, mitigations, print check

- **722 floor**: the base grid has 0 px slack at the grid level and 15 px inside the card; de/fi/pt with a 3-line title + 3-line instruction are the test renders; if the footer lint (`qa/lints.js:50-66`) fires, `cell:58` (182) is the only knob, never the gap.
- **Column wrap / range**: composer places by `(origin-start)%10 + w-1 <= 9`; verify repeats it; d3's 1-120 uses `end:120` everywhere (`data-lcs-end`).
- **Shared numbers**: base/F4/F5/F6 = pairwise disjoint cell sets; F3 = the intersection rule (section 7). Poison: two pieces sharing 45 must FAIL.
- **Up = -10 is not obvious to every child**: the compass at d1 and on F2/F3; the base d2 relies on the genre (the child has met the chart in G1-129).
- **fr 0-99**: `chartStart` slot; verify reads `data-lcs-start`, never assumes 1.
- **F5 physical fit**: same `cell` for pieces and holes, asserted; pieces never rotated.
- **`.ws-card overflow:hidden`**: the piece is centred with >= 7 px margins on every side; the badge never touches it.
- **Print check**: teal 3 px outlines and ink numerals carry the page on mono; tealSoft `#DDEBE8` prints ~90 % grey (the numeral carries the anchor, the tint is a bonus); grey dashed blanks `#C8BFAE` 2 px print light but the 1 px interior lines + outline define the cells regardless (the dash is a hint, not the structure); the F4/F5 board uses inkSoft 1.5 px interior lines (~52 % grey) so a "faint" board survives a laser at 300 dpi; the creamDeep shadow may vanish on mono (decorative, no meaning). Ink budget: base = 6 outlines + 6 tints + 48 grey dashes, less ink than G1-129's 100 numerals; coral appears only on labels and pointers (F2/F3 compass, chain pointer). Palette: cream, creamDeep, white, teal, tealSoft, coral, ink, inkSoft, grid; no new hex. Smallest text 16 (landmarks) >= 9.
- **Engineer must measure**: Baloo 700 26 width of "88" and "120" inside a 46/50 cell (*est.* 30 / 42 px); the compass group widths in one row at 675.

## 10 Summary

1. Six chart pieces on 2x3 cards, one tealSoft anchor each, grey dashed blanks, teal outline + creamDeep shadow; cell 60, numerals 26, 722-budgeted (0/15 px slack).
2. NEW `primitives/chart-piece.js` (`chartFragment`, `chartOutline`) + `components-b3.js` (`arrowGlyph`, `jumpChain`, `chartCompass`); `hundredsChart` untouched.
3. Verify re-derives every cell as `origin + r*10 + c`, checks wrap/range/disjointness/one anchor; only the anchor prints.
4. Faces: F2 jumps (arrows, path stamped), F3 rows vs columns (intersection rule), F4 locate on an edge-landmarked board, F5 cut-and-paste with holes (same cell size), F6 find the wrong number (G2); (e) rejected as a notation twin of F2.
5. One locale slot (`chartStart` 1|0); numerals and arrows are the whole apparatus; the instruction is the only text.
