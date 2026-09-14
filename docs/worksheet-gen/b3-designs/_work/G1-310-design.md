# G1-310 `hundreds-chart-puzzles` : DESIGN (studio A+B, 2026-09-14)

Read: `_STUDIO-BRIEF.md`, `_SUBSTRATE.md`, README "Cross-type rulings" (722 body; `unitAxis`), `_PANEL-FINDINGS.md` 13, `G2-315-spelling-rules.md`, `G1-308-read-and-do.md`, and the parallel `_work/G1-310-pedagogy.md` (its faces, bands, verify rules, shape library and `unitAxis` range fan are ADOPTED; where the two files differ on LAYOUT or on the language-free rule this file rules and section 8 names the divergence). Looked at `out/dev/G1-129-animals-d2-en.png` (cell 60, coral dashed missing cells), `out/batchI/G1-131-animals-d2-en.png`, `G2-226-vehicles-d2-en.png` (tealSoft given + grey dashed box + coral `-1 / +1`). Code read: `primitives/hundreds-chart.js` (`start end missing highlights cell`; 10 cols fixed; pad 4; missing = coral 2 px dash `5 4`; numeral `cell*0.36`; 1 px `grid` interior lines), `primitives/_svg.js`, `templates/components.js` (`answerBox`), `layouts/card-grid.js` (`minmax(0,1fr)`, gap 14), `page/page.css` (`.ws-card` padding 12 border 2 overflow hidden, badge 30; `.ws-answerbox` dashed `#C8BFAE` 2 px; `.ws-pattern-slot`), `types/g1/G1-129-*.js`, `types/_shared/neighbors.js` (given = `.ws-pattern-slot` tealSoft + teal border; coral Baloo 20 labels; U+2212 minus), `primitives/number-line.js`, `_tokens.js`, `qa/lints.js`. (m) = measured today; *est.* = the engineer measures.

## 1 Page concept (base)

SIX pieces cut out of the hundreds chart, ONE number each. Six numbered cards (2 columns x 3 rows) each hold one piece: a teal-outlined shape (3x3, plus, L, T) lying on the cream card with a creamDeep drop shadow, so it reads as a piece lifted off the chart. One cell is shaded tealSoft and prints its number; every other cell is white with a dashed grey answer square. The child reasons from the anchor (right = +1, down = +10) and writes the rest. The apparatus carries numerals only; the instruction is the only sentence.

Why loose pieces, not fragments drawn on a chart: drawn in place the page collapses into G1-129 and the child counts along the board; loose pieces force the 2-D place-value step (row = tens, column = ones) the genre exists for. Themeless (`themeAxis:{applicable:false}`, landings `coordinate.theme:''`). The chart RANGE is the `unitAxis` fan (section 6), never a level and never a face.

## 2 Layout + px grid (d2)

`.ws-page` padding 0 14 -> inner **675**; body budgeted at **722** (README ruling; 814/781 are the easy cases, the grid absorbs slack via `minmax(0,1fr)`).

```
 cardGrid({cols:2, rows:3, numbered:true})   gap 14   card 330 x 231 (at 722)
 +-(1)------------------------+  +-(2)------------------------+
 |      +----+----+----+      |  |      +----+----+----+      |
 |      |    |    |    |      |  |      | 47 |    |    |      |  3x3 188x188
 |      +----+----+----+      |  |      +----+----+----+      |  cell 60
 |      |    | 34 |    |      |  |      |    |    |    |      |
 |      +----+----+----+      |  |      +----+----+----+      |
 |      |    |    |    |      |  |      |    |    |    |      |
 |      +----+----+----+      |  |      +----+----+----+      |
 +----------------------------+  +----------------------------+
 +-(3) L3 188x188 ------------+  +-(4) T3 188x188 ------------+
 +-(5) plus 188x188 ----------+  +-(6) T3 (rot 2) 188x188 ----+
```
- **Card** 330 x 231 (m: (675-14)/2, (722-28)/3); inner **302 x 203**. Content = one `.ws-card-stage` (centred) holding the piece SVG; piece left edge at 69, clear of the 30 px badge.
- **Piece** `chartFragment({shape, rot, origin, anchorIdx, cell:60, start, end})`: SVG W = w*60+8, H = h*60+8 (pad 4 as `hundredsChart`). sq3 / plus / L3 / T3 = 188x188; d3 rect4x3 at cell 56 = 232x176 (<= 302 x 203).
- **Cell internals**, draw order: shadow `roundedRect` creamDeep at (+3,+3) r 6; white cell rect; shared interior edges 1 px `grid`; **anchor** = `roundedRect` inset 2 r 5 fill tealSoft stroke teal 2 + `label` Baloo 700 **26** ink `data-lcs-anchor`; **blank** = `roundedRect` inset 4 (52x52) r 6 white, stroke `grid` 2 px dash `5 4`, `data-lcs-rc` + `data-lcs-answer` (the SVG twin of `.ws-answerbox`, `page.css:220`).
- **Outline**: every cell edge whose neighbour is not in the shape = a teal 3 px `line`, round caps (no path union needed).
- **Grey dashed blanks, not coral**: G1-129 has 12 coral cells; this page has up to 48 blanks. 48 coral squares shout and cost ink; grey dashed is the `.ws-answerbox` convention G1-131 already pairs with a tealSoft given. Coral is reserved for arrows, labels and pointers (F2/F3/F5).
- **Stack at 722**: 3 x 231 + 28 = 722 (grid slack 0; card slack 203 - 188 = 15). At 814 cards grow to 259, pieces stay centred. Cell 60 >= G1 44; numeral 26 = G1 floor; 6 items within [6,12].
- **d1**: six pieces from `sq2` / `bar-h3` / `bar-v3` / `plus`, anchor = centre or bar middle (every blank one move away), values 11-89, cell **56**, plus a `chartCompass` strip (675 x 46) above: 46 + 14 + 3x207 + 28 = 709 <= 722; card inner 179 >= 176. **d3**: `sq3-holes` (7), `S/Z` (4), `rect4x3` (12), L3, T3, plus, anchor at a corner (two-step chains), cell 56, no compass.

## 3 Ladder (resolved config; guards key on `d.shapes` / `d.anchorAt`, never the level index)

| | d1 | d2 (ships) | d3 |
|---|---|---|---|
| shapes | sq2, bar-h3, bar-v3, plus | sq3 x2, plus, L3, T3, T3 | sq3-holes, S/Z, rect4x3, L3, T3, plus |
| anchorAt | `centre` | `any` | `corner` |
| cell / compass | 56 / yes | 60 / no | 56 / no |
| values | 11-89 | unit range | unit range |

## 4 Answer-hiding + uniqueness

- Only the anchor prints. Piece root: `data-lcs-prim="chart-fragment" data-lcs-shape="L3" data-lcs-rot="2" data-lcs-w data-lcs-h data-lcs-origin="34" data-lcs-anchor="45" data-lcs-anchor-idx="3" data-lcs-cell="60" data-lcs-start data-lcs-end`; per cell `data-lcs-rc="r,c"`; blanks `data-lcs-answer`. `origin` = the value at the bounding box's top-left (a coordinate, not necessarily a cell of an L); it equals the pedagogy's `a - 10*ar - ac`, the same arithmetic.
- **verify()** re-derives every cell as `origin + r*10 + c` and asserts: anchor text == derived; every `data-lcs-answer` == derived; exactly ONE anchor per piece; `(origin-start)%10 + (w-1) <= 9` (no row-edge wrap: anchor 20 with a right neighbour is ILLEGAL); `origin + (h-1)*10 + (w-1) <= end`; the six cell sets pairwise DISJOINT (no number twice on a page, printed or hidden; composer also keeps bounding boxes disjoint); anchors distinct and on >= 4 chart rows; d1: no value % 10 == 0.
- A printed outline plus one known cell has exactly one filling. F2/F3/F5 stamp their paths (section 7).

## 5 Primitives / components

**Reused as is:** `_svg.js` (`svgRoot roundedRect line label el`), `answerBox`, `cardGrid`, `.ws-pattern-slot` inline-styled as `neighbors.js:9` (given chips), `.ws-card-stage` (lint content selector); `hundredsChart` conventions by reference (pad 4, 1 px interior lines, `data-lcs-cell/start`). `hundredsChart` itself is NOT called: 10 columns fixed, coral missing cells, no board guides; extending it risks `b3-baseline --check` drift.

**NEW `primitives/chart-fragment.js`** (one cell helper, two exports; shape library = explicit (r,c) lists per rotation, code, locale-free, per the pedagogy file section D):
- `chartFragment({shape, rot, origin, anchorIdx, printed:'anchor'|'all', wrongIdx?, wrongValue?, cell, start, end, fontSize:26, shadow:true})` -> `{svg, width, height, meta}`.
- `chartOutline({start, end, cell, guides:'edges'|'rich'|'corners', targets:[[values]], fontSize})`: a 10-column board, teal 3 px frame r 10, interior lines **inkSoft 1.5 px** (not `grid`: it must survive mono print); `'edges'` prints row 1 + column 1 (inkSoft Baloo 600 16), `'rich'` adds every multiple of 10, `'corners'` prints only the first and last value; targets stamp `data-lcs-target="k" data-lcs-answer` on empty cells. Root `data-lcs-board data-lcs-start data-lcs-end data-lcs-cell`.

**NEW in `templates/components-b3.js`:**
- `arrowGlyph({dir:'U'|'D'|'L'|'R', size:40, label?})`: white chip r 10 border 2 creamDeep, teal 4 px (`stroke.accent`) SVG chevron arrow (never a font glyph), optional coral Baloo 700 16 label (`-10 +10 -1 +1`, U+2212) beneath. `data-lcs-move`.
- `jumpChain({start, moves, showSteps:false})`: `[.ws-pattern-slot 64x56 given][8][arrowGlyph x n, gap 8][8][coral pointer 20][8][answerBox 64x56]`; `showSteps:true` adds an `answerBox` after every move. Root `data-lcs-chain data-lcs-start data-lcs-moves data-lcs-answer`.
- `chartCompass()`: 675 x 46 strip, four groups `U -10 | D +10 | L -1 | R +1` (arrowGlyph 32 + coral Baloo 20), centred, `aria-hidden`, no `data-lcs-*`.

## 6 Locale slot structure

- Numerals, arrows, signs are universal: NO per-locale data on the apparatus, no clue frames (F3 is icon-built, section 7). `i18n/strings.<loc>.json` carries `{title, instruction}` per id (6 ids). Digits are plain Baloo 2 `label` text, never the `data/tracing` digit forms (`FORM_BY_LOCALE` is imported only by K-237/252/253; G1-129 ships plain Baloo digits in all 11 locales).
- **The chart convention is the `unitAxis` unit**: `1-100` (exemplar) · `0-99` (fr Cap Maths, some sv/no/pt) · `1-120` (en 1.NBT.A.1) · `101-200` (de Klasse 2). A locale pins its exemplar via `unitOverrides` (fr may pin `0-99`): data, not code. Every face takes `start/end`; verify reads `data-lcs-start/end`, never assumes 1. `{U}` resolves in titles ("1 bis 120").
- RTL: none. Text growth affects only the instruction (<= 150 chars, 3 lines = the 722 case).

## 7 Five variation faces (all CODE: an additive `mode` knob on `build()` + a `verify()` branch; the base is byte-identical without `mode`)

From the brief's (b)-(f): **(b) and (c) taken; (e) taken in a LANGUAGE-FREE two-clue form; (d) and (f) rejected** (section 8); the fifth face is the pedagogy file's F5 (distance). Bands per the pedagogy: F1/F4 G1 (`G1-311+ TBD`), F2/F3/F5 G2 (`G2-320+ TBD`, floors 36/22/[8,16]). G2 faces use `cardGrid({cols:2, rows:4})` under the compass: rows (722-60-42)/4 = **155**, inner **127 x 302**.

### F1 : Where Does the Piece Fit? (b) : `mode:'place'` (G1)
**Move**: NUMBER -> POSITION: read a fully printed piece, find its place on an almost empty board (tens = row, ones = column), draw its outline there and write its numbers into the board. Layout: `chartOutline({cell:46, guides:'edges'})` 468x468 centred + 14 + four `chartFragment({printed:'all', cell:48})` 152x152 in a row, gap 22 (674). Height 634 <= 722. No badge on pieces (a letter is text, a numeral looks like a chart number; the printed values identify the piece). Pieces avoid row 1 and column 1, are disjoint; board target cells stamped `data-lcs-target="k" data-lcs-answer`, nothing printed there. d1: 3 pieces at cell 56, `guides:'rich'`; d3: 4 pieces at cell 48 with `guides:'corners'` (the pedagogy's fifth piece does not fit: 5 x 140 + 48 = 748 > 675 even at the 44 floor). **Verify**: board cells at each piece's derived positions carry `data-lcs-target=k` with `data-lcs-answer` == derived; no target on a guide; targets disjoint; each piece's printed values position-consistent (P6). Query face: "where does the piece go" / "Wo passt das Teil hin" / "var passar biten".

### F2 : Jump Puzzles (c) : `mode:'jumps'` (G2)
**Move**: chained moves as a map. Layout: compass + 2x4 cards; row = `jumpChain` 64+8+3x40+16+8+20+8+64 = **284 <= 302**, height 56 <= 127. d2: 8 items, 3 arrows, no immediate reversal, path never leaves the board, 8 distinct starts and landings. d1: 6 items (3x2 grid, rows 207), 2 labelled arrows, `showSteps:true`. d3: 4 arrows at **34 px, gaps 4, no pointer** (64+6+4x34+12+6+64 = 288 <= 302; 34 < 36 is a printed glyph, not a write-in, engineer renders), one item inverse (landing given, start blank, `data-lcs-inverse`). **Verify**: fold `data-lcs-moves` from `data-lcs-start`; `R` from column 9 or `L` from column 0 = FAIL (P5); `U/D` stay in range; landing == `data-lcs-answer`. Query face: "jumps" / "Sprünge" / "hopp".

### F3 : Mystery Number, Two Clues (e, language-free) : `mode:'riddle'` (G2)
**Move**: two independent clues MEET on one cell (a consistency check, not a chain): "10 more than 43" and "1 less than 54" as icons: `[43][D]` and `[54][L]` both point at ONE shared box. Layout: 2x4 cards; two clue rows `[given 64x52][8][arrowGlyph 36]` stacked gap 6 (110 <= 127), two coral pointers converging on one `answerBox({w:84,h:56})` at the right (64+8+36+8+20+8+84 = 228 <= 302). d2: one +-10 clue + one +-1 clue, random order; d1: clue 2 always +-1; d3: clue 1 = two arrows (272 wide). **Verify**: both clues resolve to the same `data-lcs-answer`; starts distinct; neither start equals the answer; the answer prints nowhere (P7). Divergence: the pedagogy authors worded clue frames x11 and allows a per-locale refusal; icons remove both (section 8).

### F4 : Find the Wrong Number : `mode:'error'` (G1)
**Move**: CHECK instead of produce: every cell printed, ONE wrong; circle it, write the right number. Layout = the base grid; card = `chartFragment({printed:'all', cell:56, wrongIdx, wrongValue})` 176x176 + 16 + `answerBox({w:84,h:56})` (276 <= 302). Wrong value from `errorKinds` {+-1, +-10, +-9, +-11, digit swap}, in range, equal to no other cell; pieces >= 5 cells so the majority identifies the error uniquely. Stamps `data-lcs-wrong` (the printed value) on the cell, box `data-lcs-answer` = derived; the right value prints nowhere. d1: plus / bar pieces, +-1 or +-10; d3: one piece CORRECT (`data-lcs-clean`, the child ticks it). **Verify**: exactly one `[data-lcs-wrong]` per piece (P4), its value != derived and in `errorKinds`; box == derived.

### F5 : How Far Apart? Count the Jumps : `mode:'distance'` (G2)
**Move**: DISTANCE = tens + ones: from A to B, how many jumps down and how many right (the inverse of F2; subtraction as position difference). Layout: 2x4 cards; row 1 `[A 64x52][coral chevron 24][B 64x52]` (160); row 2 `[arrowGlyph D 32][answerBox 44x44][16][arrowGlyph R 32][answerBox 44x44]` (168); 52+8+44 = 104 <= 127. d2: B below-right of A, both counters >= 1; d1: B in A's row OR column (one counter is 0); d3: B may be above/left, each counter carries a glyph pair (`U/D`, `L/R`) the child circles. **Verify**: `row(B)-row(A)` and `col(B)-col(A)` == the two `data-lcs-answer`s (P9); A != B; 8 distinct pairs. Query face: "count the jumps" / "Wie viele Sprünge" / "hur många hopp".

## 8 Alternatives, divergences, recommendation

1. **(d) row/column strips**: rejected. A 1x10 / 10x1 strip is 1-D, the `number-strip.js` family's object; and on one page a row and a column ALWAYS share a number (row 31-40 meets column 4 at 34), which breaks the no-number-twice rule by construction. Layout was solvable (cell 50: 3 rows 508 + gap 39 + 2 columns 128 = 675; height 568) and is recorded here in case the ruling is overturned.
2. **(f) cut-and-paste**: rejected. It is F1's act with scissors, has no pencil answer to verify, and the `cutting` family owns the motor skill. Layout was solvable (board cell 46 = 468, cut rule 20, four printed pieces at the SAME cell 46 = 146 each, 656 wide, height 660; pieces and holes must share `cell`).
3. **3 columns x 2 rows base grid** (cards 216 x 354): ~150 px dead height per card, rect4x3 (232) cannot fit. Rejected.
4. **Divergences from the pedagogy file (layout, this file rules)**: anchor tealSoft (not creamDeep: G1-131's given is tealSoft, and creamDeep is the shadow); blanks grey dashed (not coral: 48 cells); F1 board above the pieces (not a 448 + 213 side tray: pieces stay 48-56, not 44) and 4 pieces at d3 (5 do not fit 675); F2 compass strip + 40 px chips (the pedagogy's 36 px chips in 170 px cards had no compass); F3 icons instead of worded frames (the brief's language-free rule; removes the per-locale refusal, so the hub gate expects 6 rows in every locale).
**Recommendation**: base as section 2; faces F1-F5 as section 7.

## 9 Risks, mitigations, print check

- **722 floor**: base grid slack 0, card slack 15; G2 faces 155 px cards; de/fi/pt with 3-line title + 3-line instruction are the test renders; if the footer lint (`qa/lints.js:50-66`) fires, `cell:58` (182) is the knob, never the gap.
- **Wrap / range**: composer picks anchors from the computed LEGAL set (never trial-and-error); verify repeats `(origin-start)%10 + w-1 <= 9`. Poison: origin 39 with w 3 must FAIL; two pieces sharing 45 must FAIL.
- **Up = -10 is not obvious to every child**: compass at base d1 and on F2; F3/F5 arrows sit next to their numbers.
- **`0-99` / `1-120` units**: `start/end` everywhere; `b3-baseline --check` must treat a locale-pinned unit as authored (README additive-with-fallback: no unit = `1-100`).
- **`.ws-card overflow:hidden`**: pieces centred with >= 7 px margins; the shadow offset (+3) stays inside the SVG box (pad 4).
- **Print check**: teal 3 px outlines and ink numerals carry the page on mono; tealSoft `#DDEBE8` prints ~90 % grey (the numeral carries the anchor); grey dashes `#C8BFAE` print light but the 1 px interior lines + outline define the cells regardless (the dash is a hint, not the structure); the F1 board uses inkSoft 1.5 px interior lines (~52 % grey) so a faint board survives a 300 dpi laser; the creamDeep shadow may vanish (decorative). Ink: base = 6 outlines + 6 tints + 48 grey dashes, less than G1-129's 100 numerals; coral only on labels, chevrons and pointers. Palette: cream, creamDeep, white, teal, tealSoft, coral, ink, inkSoft, grid; no new hex. Smallest text 16 >= 9.
- **Engineer must measure**: Baloo 700 26 width of "88" / "120" in a 46-56 cell (*est.* 30 / 42); the compass row at 675; F2 d3 34 px chips against the G2 36 floor (a printed glyph, not a write-in: state it in the QA log or raise the cards to 3x3 at 6 items).

## 10 Summary

1. Six chart pieces on 2x3 cards, one tealSoft anchor each, grey dashed blanks, teal outline + creamDeep shadow; cell 60, numerals 26, budgeted at 722 (slack 0/15).
2. NEW `primitives/chart-fragment.js` (`chartFragment`, `chartOutline`) + `components-b3.js` (`arrowGlyph`, `jumpChain`, `chartCompass`); `hundredsChart` untouched.
3. Verify re-derives every cell as `origin + r*10 + c`; row-edge wrap, range, no-number-twice, one anchor; only the anchor prints.
4. Faces: F1 place the piece (G1), F2 jumps (G2), F3 two-clue mystery number as icons (G2), F4 find the wrong number (G1), F5 count the jumps (G2); (d) strips and (f) cut-and-paste rejected with their layouts recorded.
5. The chart range is the `unitAxis` unit (`1-100` exemplar, `0-99`, `1-120`, `101-200`, locale-pinned); numerals and arrows are the whole apparatus; the instruction is the only text.
