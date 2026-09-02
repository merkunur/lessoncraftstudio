# Design studio A — apparatus / number pages (nt20-B)

Types: **#2 K-285 Dot-to-Dot · #3 K-286 Copy the Grid Picture · #7 G1-243 Number of the Day · #10 G1-246 Number Walls · #12 G1-248 Where on the Number Line? · #17 G2-277 Read the Calendar · #19 G2-279 Grid Coordinates.**

Shared conventions used below (all measurements CSS px at the 703×945 page):
- **Body box** = 675 × ≈740 (page 703 minus 14px side padding; header ≈60 + instruction ≈64 + footer ≈30 taken off 945). Every layout below is sized to ≤ 675 × 740 with slack.
- **Answer slot** = `answerBox` (white, dashed `grid`-colour 2px, radius 10) in HTML; inside SVG the same look is `roundedRect({dash:'6 5', strokeColor: coral, strokeWidth: 2.5, fill: white})` — the K-243 dashed-coral blank is the house signal for "write here".
- **Content lint**: every full-page layout stamps `[data-ws-content]` on its outermost body div (or uses `.ws-card-stage` inside `cardGrid`), per `qa/lints.js CONTENT_SEL`.
- **B&W rule**: every state difference is carried by *shape* (solid vs dashed, filled vs hollow, ring vs dot), never by hue alone.
- **Figure data** (sections 2 and 3) was run through a checker (`design-A-check.js`, poison-tested with a self-intersecting bowtie) and rendered to a contact sheet (`design-A-sheet.png`) — the arrays below are the verified ones, not sketches.
- **New `codeColors` (4)** — muted, print-friendly against cream, distinct from coral `#F2784B` and from each other in greyscale: `codeOrange: '#D9661C'`, `codePurple: '#7A4E9C'`, `codeBrown: '#8C5A2B'`, `codePink: '#D66A8E'`. (Greyscale lightness order red 0.30 · brown 0.40 · purple 0.42 · orange 0.52 · blue 0.42 · green 0.48 · pink 0.58 · yellow 0.68 — the colour WORD stays the load-bearing B&W signal, as in K-241.)

---

## #2 K-285 — Dot-to-Dot 1 to 20  (`dot-to-dot`, K, K.CC.A.2)

### 1. Page concept
One big picture hides on the page as numbered dots. The child finds **1** (the only coral dot), draws to 2, to 3 … and a star / whale / rocket appears — the reveal IS the reward. Small pre-printed details (an eye, a porthole, a window) are already there so the finished picture "comes alive" the moment the last line closes. A counting strip along the bottom (1…20) is the K.CC.A.2 apparatus: the child can touch the next number before hunting for it. d1 is "finish the picture": 10 numbered dots complete a figure whose remainder is already drawn in light ink. d3 counts by 2s to 40 — the same picture, the skip-count strip becomes the scaffold.

### 2. Layout (d2)
```
┌──────────────────────────── .ws-card 660×618 ─────────────────────────────┐
│                                                                            │
│                      figure stage 560×560 (5.6 px per unit)                │
│                      dots r5 teal · dot 1 coral r6 + ring r10              │
│                      numerals Baloo 2 20px, 16px outside the outline       │
│                      pre-printed details in ink (eye, window)              │
│                                                                            │
└────────────────────────────────────────────────────────────────────────────┘
  gap 14
┌─ counting strip 660×60 ────────────────────────────────────────────────────┐
│ (1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)…(20)   20 chips 26px, Baloo 2 15px     │
└────────────────────────────────────────────────────────────────────────────┘
```
- Stage: the figure's 0-100 box scales to 560×560 → 5.6 px/unit → min vertex spacing 7 units = **39 px** (gate floor 22 px). Stage is centred in a single `.ws-card` (no badge). Total body 618+14+60 = 692 ≤ 740.
- Numerals: placed along the outward angle bisector at each vertex, 16 px from the dot, then a **collision pass**: try the bisector at 16 px, then 24 px, then the 8 compass directions at 16/24 px; accept the first candidate whose 24×20 label bbox overlaps no other label bbox, no dot (r+4) and no pre-printed detail, and lies inside the stage. This is required — the contact sheet showed collisions at concave notches (house door, tree tiers, sailboat mast).
- d1: stage identical; only dots 1-10 numbered (vertices 0-9); the remaining outline (vertex 9 → … → last → vertex 0) is pre-printed as a solid 3 px `grid`-colour polyline (`data-lcs-preprinted="1"`). Counting strip 1-10 (chips 34 px).
- d3: 20 dots labelled **2, 4, 6 … 40**; strip shows 2 4 6 … 40 (odd numbers absent — the strip IS the skip-count sequence). Otherwise identical to d2.

### 3. Difficulty ladder
| | dots | labels | figure vertex source | strip |
|---|---|---|---|---|
| d1 | 10 | 1…10 | vertices 0-9 of the figure; remainder pre-printed | 1…10, chip 34 px |
| d2 | 20 | 1…20 | figure resampled to exactly 20 (rule below) | 1…20, chip 26 px |
| d3 | 20 | 2…40 step 2 | same 20-dot resample as d2 | 2…40, chip 26 px |

**Resample rule (renderer, deterministic):** while count < N, split the *longest admissible* segment at its integer midpoint; a midpoint is admissible when it is ≥ 7 units from every existing vertex and ≥ 5 units from every non-incident edge; if no segment ≥ 14 units is admissible → throw (refuse, never ship a cramped page). All 16 figures below resample to 20 with min spacing ≥ 7.2 units (checked). A figure with > 20 vertices is not allowed in this set (umbrella was reduced 22 → 19 for this reason).

Figure per deck = seeded pick from the 16; one figure per page. The wave fans by figure later (16 decks × 11 locales).

### 4. Answer-hiding + uniqueness — verify() asserts
Stamps: svg root `data-lcs-prim="dot-figure" data-lcs-figure="<key>" data-lcs-count="20" data-lcs-step="1|2" data-lcs-window="10"` (d1 only); each dot `<circle data-lcs-dot="<k>" data-lcs-x data-lcs-y>` (k = 1-based order); each numeral `<text data-lcs-label="<k>">`; pre-printed remainder `<polyline data-lcs-preprinted>`; details `<g data-lcs-detail>`.
- No `path/polyline/polygon` on the page passes through two consecutive numbered dots (recompute: for every element with points, no pair of consecutive dot coordinates both lie within 2 px of its vertex list) — the answer path is never drawn (d1's pre-printed polyline must start at dot 10 and end at dot 1 and touch no other numbered dot).
- Label text sequence = `step × k` for k = 1..count; count = 20 (d2/d3) or 10 (d1); exactly one coral dot and it is k = 1.
- Re-derive the vertex list from `DOT_FIGURES[key]` + the resample rule; every `data-lcs-x/y` matches to ±0.5 px (the gate implements its own subdivide — it does not read the renderer's).
- Rendered min pairwise dot distance ≥ 22 px; closed dot sequence has no self-intersection (segment test incl. closing edge).
- Label bboxes (`getBBox`) overlap no other label bbox and no dot circle; every label inside the stage.
- Strip chips = count, values = step × k.
- Uniqueness: a numbered sequence has exactly one path by construction; verify additionally asserts no two labels share text.

### 5. Primitives / new drawing
Reuse: `_svg` (`svgRoot, circle, label, el`), `.ws-card`, chip styling from `.ws-chip` (strip).
**NEW `primitives/dot-figure.js`** `dotFigure({figure, count, step, window, size=560})` → `{svg, meta:{points}}`: scales `figure.pts` (0-100, y-down) to `size`; resamples per §3; draws details (`marks`: `dot` = filled ink circle r×scale; `square` = ink 2 px hollow square; `line` = `grid`-colour 2 px polyline — kite spars, umbrella shaft, ice-cream cone rim, antennae); dots teal r5, dot 1 coral r6 with a coral 2 px ring r10 (ring = B&W-safe start signal); numerals Baloo 2 20 px `ink`, weight 700, placed by the collision pass. `window` (d1) draws the remainder polyline first (under the dots).
**NEW `data/b2/dot-figures.js`** — 16 figures, clockwise, index 0 = dot 1 (top of the figure), y-down, all in [4,96]:
```js
const DOT_FIGURES = [
  { key: 'star', pts: [[50,4],[61,31],[90,27],[72,50],[90,73],[61,69],[50,96],[39,69],[10,73],[28,50],[10,27],[39,31]], marks: [] },
  { key: 'house', pts: [[50,15],[72,35],[72,22],[80,22],[80,42],[94,50],[82,50],[82,90],[62,90],[62,70],[48,70],[48,90],[18,90],[18,50],[6,50]],
    marks: [{ type: 'square', x: 24, y: 58, s: 12 }] },
  { key: 'boat', pts: [[44,18],[52,18],[52,30],[60,30],[60,46],[70,46],[70,62],[94,62],[80,82],[20,82],[6,62],[22,62],[22,46],[34,46],[34,30],[44,30]],
    marks: [{ type: 'dot', x: 50, y: 72, r: 3.5 }, { type: 'dot', x: 64, y: 72, r: 3.5 }, { type: 'dot', x: 36, y: 72, r: 3.5 }] },
  { key: 'rocket', pts: [[50,6],[62,20],[66,40],[66,62],[84,78],[84,92],[66,80],[60,92],[40,92],[34,80],[16,92],[16,78],[34,62],[34,40],[38,20]],
    marks: [{ type: 'dot', x: 50, y: 36, r: 6 }] },
  { key: 'fish', pts: [[40,24],[58,26],[72,36],[76,44],[94,28],[90,50],[94,72],[76,56],[72,64],[58,74],[40,76],[22,68],[8,50],[22,32]],
    marks: [{ type: 'dot', x: 24, y: 46, r: 3 }] },
  { key: 'kite', pts: [[50,6],[68,23],[86,40],[71,55],[56,70],[64,78],[58,86],[50,94],[42,86],[36,78],[44,70],[29,55],[14,40],[32,23]],
    marks: [{ type: 'line', pts: [[50,6],[50,70]] }, { type: 'line', pts: [[14,40],[86,40]] }] },
  { key: 'heart', pts: [[40,20],[50,30],[60,20],[70,16],[82,20],[90,32],[90,46],[78,64],[50,92],[22,64],[10,46],[10,32],[18,20],[30,16]], marks: [] },
  { key: 'butterfly', pts: [[50,12],[58,22],[74,12],[90,20],[94,38],[84,52],[92,66],[86,82],[70,88],[58,74],[50,86],[42,74],[30,88],[14,82],[8,66],[16,52],[6,38],[10,20],[26,12],[42,22]],
    marks: [{ type: 'line', pts: [[50,12],[44,2]] }, { type: 'line', pts: [[50,12],[56,2]] }] },
  { key: 'tree', pts: [[50,6],[64,28],[56,28],[72,50],[62,50],[82,72],[58,72],[58,92],[42,92],[42,72],[18,72],[38,50],[28,50],[44,28],[36,28]], marks: [] },
  { key: 'car', pts: [[38,30],[64,30],[78,48],[94,54],[94,68],[82,68],[76,80],[64,80],[60,68],[40,68],[36,80],[24,80],[18,68],[6,68],[6,52],[28,48]],
    marks: [{ type: 'square', x: 46, y: 40, s: 10 }, { type: 'square', x: 60, y: 40, s: 10 }] },
  { key: 'cat', pts: [[24,8],[32,22],[44,20],[56,20],[68,22],[76,8],[84,30],[82,46],[90,60],[92,84],[80,92],[20,92],[8,84],[10,60],[18,46],[16,30]],
    marks: [{ type: 'dot', x: 38, y: 34, r: 3 }, { type: 'dot', x: 62, y: 34, r: 3 }, { type: 'dot', x: 50, y: 42, r: 2.5 }] },
  { key: 'ice-cream', pts: [[50,6],[64,8],[74,18],[72,28],[80,36],[80,46],[70,54],[60,74],[50,94],[40,74],[30,54],[20,46],[20,36],[28,28],[26,18],[36,8]],
    marks: [{ type: 'line', pts: [[40,74],[60,74]] }] },
  { key: 'umbrella', pts: [[50,8],[78,16],[94,50],[84,44],[74,50],[64,44],[54,50],[54,84],[46,92],[34,90],[28,80],[38,78],[46,82],[46,50],[36,44],[26,50],[16,44],[6,50],[22,16]],
    marks: [{ type: 'line', pts: [[50,8],[50,50]] }] },
  { key: 'whale', pts: [[30,32],[52,32],[70,40],[80,50],[96,34],[88,56],[96,76],[80,62],[66,72],[60,84],[50,80],[24,76],[8,70],[6,58],[12,42]],
    marks: [{ type: 'dot', x: 18, y: 50, r: 3 }] },
  { key: 'sailboat', pts: [[56,14],[66,26],[78,42],[86,60],[56,60],[56,70],[92,70],[82,86],[50,90],[18,86],[8,70],[48,70],[48,60],[24,60],[48,24],[48,14]], marks: [] },
  { key: 'crown', pts: [[50,8],[60,44],[72,14],[80,46],[96,24],[88,70],[88,90],[12,90],[12,70],[4,24],[20,46],[28,14],[40,44]],
    marks: [{ type: 'dot', x: 50, y: 80, r: 3.5 }, { type: 'dot', x: 30, y: 80, r: 3.5 }, { type: 'dot', x: 70, y: 80, r: 3.5 }] },
];
```
Checked: every figure 12-20 vertices, clockwise, closed, no self-intersection, min pairwise vertex distance ≥ 7.2 units (39 px), no vertex within 5 units of a non-incident edge, all `dot`/`square` marks inside the polygon, resample-to-20 succeeds for all 16 with min spacing ≥ 7.2. `verify-dot-figure.js` = the checker in `design-A-check.js` (ship it as the gate; it already carries the bowtie poison).
**Strip component** (`components.js` `numberStrip({values, chip})`): a flex row of `.ws-chip`-styled circles (white, teal 2 px, Baloo 2, chip 26/34 px) — also reusable by #7 d3.

### 6. Locale slots
None on the apparatus (numerals only). `data/b2/dot-figure-names.js` ×11 (`star, house, boat, rocket, fish, kite, heart, butterfly, tree, car, cat, ice-cream, umbrella, whale, sailboat, crown` — 11 of these already exist in `data/symmetry/figure-names.js` (star, house, rocket, heart, butterfly, tree, cat, ice-cream, umbrella, sailboat, crown); reuse those strings verbatim, panels add boat, fish, kite, car, whale). Names are **NOT printed on the page** (the surprise is the point); they feed the deck meta description / landing copy only. Panels own the title genre word (Punkt zu Punkt · points à relier · une los puntos · ligue os pontos · unisci i puntini · van stip naar stip · prick till prick · prik til prik · prikk til prikk · pisteestä pisteeseen) and the instruction.

### 7. Alternatives
- **Two figures per page (half size)** — 2.8 px/unit → 20 px dot spacing, under the 22 px gate and under the K 56 px element rule; rejected.
- **"Guess the picture" writing line under the figure** — asks K to write a noun (authoring ×11, and gives the picture away in the deck title); rejected for K; could be a d3 variation later.
- **Recommendation: one large figure + counting strip.** Only layout that keeps K spacing and gives the K.CC.A.2 scaffold (the strip) without words.

### 8. Risks
- Label collisions at concave notches → collision pass + measured bbox assertion (§4). Poison: render `house` at 3 px/unit — must FAIL.
- A midpoint from resampling landing near another edge (whale fluke) → admissible-midpoint rule (already in the checker).
- Pre-printed d1 remainder could be mistaken for "already drawn part of my task" → it is light `grid` colour, 3 px, and starts exactly at dot 10 / ends at dot 1 so the child's line meets it.
- d3 skip-count could invite the child to draw 2→3 (skipping strip) — the strip shows only even numbers, and no odd numeral exists on the page.
- B&W: coral start dot prints mid-grey → the ring makes it the only ringed dot.

---

## #3 K-286 — Copy the Grid Picture  (`grid-copy`, K, readiness)

### 1. Page concept
A cheerful pixel duck sits on the left grid; an empty twin grid waits on the right with a coral arrow between them. The child colours the same squares — counting across and down — until the duck appears again. Two pictures per page. Every figure is deliberately **asymmetric** (verified under all three flips), so the copy must be a true copy: orientation counts. It is the reproduction-on-quadrillage staple of fr/pt K classes, language-free.

### 2. Layout (d2)
```
┌ .ws-card row 1 (660×322) ──────────────────────────────────────────────┐
│  ┌ model 7×7 @42 = 294 ┐   (→)   ┌ target 7×7 @42 = 294 (empty) ┐       │
│  │  teal-filled cells  │  36px   │  answer markers invisible     │       │
│  └─────────────────────┘  coral  └───────────────────────────────┘       │
└──────────────────────────────────────────────────────────────────────────┘
  gap 14
┌ .ws-card row 2 (660×322) ── second figure, same geometry ────────────────┐
└──────────────────────────────────────────────────────────────────────────┘
```
Row inner width 294 + 40 + 294 = 628 (centred in 660). Body 322 + 14 + 322 = 658 ≤ 740.
- Model: cells solid `teal` (`x+1,y+1,cell-2`), grid lines `grid` 1 px, outer frame `teal` 2 px radius 6; target: identical frame + lines, all cells white.
- Arrow chip: 36 px circle `coralSoft` fill with a coral `→` glyph (SVG path, 3 px) — the language-free "copy this way".
- d1: 6×6 @ 48 (288) · d3: 8×8 @ 36 (288) **plus coordinate labels** (A-H across the top, 1-8 down the left of BOTH grids, Baloo 2 12 px `inkSoft`) — the bridge to #19.

### 3. Difficulty ladder
| | grid | cell | figures/page | filled cells per figure | labels |
|---|---|---|---|---|---|
| d1 | 6×6 | 48 | 2 | 18-25 | none |
| d2 | 7×7 | 42 | 2 | 20-25 | none |
| d3 | 8×8 | 36 | 2 | 29-36 | A-H / 1-8 on both grids |
Figures per page: two distinct keys from the size bucket (seeded). Model is mono teal at all levels (one pencil; B&W-proof); the colour letters in the data serve #19.

### 4. Answer-hiding + uniqueness — verify()
Stamps: row `[data-lcs-copy="<key>"]`; model svg `data-lcs-prim="grid-copy-model" data-lcs-cols data-lcs-rows data-lcs-filled=<n>`, each filled cell `data-lcs-given="c,r"`; target svg `data-lcs-prim="grid-copy-target"` with an invisible `rect fill="none" data-lcs-answer-cell="c,r"` per figure cell.
- Model given-set == target answer-set == cells recomputed from `PIXEL_FIGURES[key]` (any non-'.' char = filled).
- Target contains no visible fill (every `rect` inside it has `fill` ∈ {none, white}); model and target have identical `cols/rows/cell`.
- Figure asymmetric: the mono cell set ≠ its left-right, top-bottom and 180° images (recomputed) — so a mirrored copy is wrong and the answer is unique.
- Fill ≥ 40 %; one 8-connected component; two figure keys on the page distinct; cell ≥ 36 px.

### 5. Primitives / new drawing
**NEW `primitives/grid-copy.js`** `gridCopy({figure, cell, labels:false})` → `{modelSvg, targetSvg, filled}` — grid drawing lifted from `sym-grid.js` (same line/fill idiom, no mirror line). Arrow chip in `components.js` (`copyArrow()`).
**NEW `data/b2/pixel-figures.js`** — 12 asymmetric figures; `'.'` empty, letters = colour (r red · b blue · y yellow · g green · o orange · n brown; `p` purple / `k` pink reserved). Verified: square, 6-8, ≥40 % fill, asymmetric under all three flips, single 8-connected component:
```js
const PIXEL_FIGURES = [
  { key: 'duck',     rows: ['.yy...', '.yyyo.', '..y...', '.yyyy.', 'yyyyyy', '.yyyy.'] },              // 21 cells
  { key: 'flag',     rows: ['nrrrr.', 'nbbbb.', 'nrrrr.', 'n.....', 'n.....', 'n.....'] },              // 18
  { key: 'cup',      rows: ['bbbb..', 'bbbbo.', 'yyyy.o', 'bbbbo.', 'bbbb..', '.bb...'] },              // 25
  { key: 'boot',     rows: ['.rr...', '.rr...', '.rr...', '.rrr..', '.rrrr.', 'nnnnnn'] },              // 19
  { key: 'boat',     rows: ['...r...', '..rr...', '..rrr..', '..rrrr.', '...b...', 'bbbbbbb', '.bbbbb.'] },   // 23
  { key: 'key',      rows: ['.yyy...', 'yy.yy..', 'yy.yy..', '.yyy...', '..y....', '..yyy..', '..yy...'] },   // 20
  { key: 'fish',     rows: ['...b...', '..bbb..', '.bybbbb', 'bbbbb.b', '.bbbbbb', '..bbb..', '.......'] },   // 25
  { key: 'cherries', rows: ['....ggg', '...g.gg', '...g...', '..g.g..', '.rr.rr.', 'rrr.rrr', '.rr.rr.'] },   // 23
  { key: 'elephant', rows: ['..gggggg', '.ggygggg', '.ggggggg', 'g..gg.gg', 'g..gg.gg', 'g..gg.gg', 'g.......', '........'] }, // 36
  { key: 'bird',     rows: ['....bb..', '...bybbo', '...bbbb.', '.bbbbb..', 'bbbbbb..', '.bbbbb..', '...b.b..', '...n.n..'] }, // 31
  { key: 'giraffe',  rows: ['yyy.....', 'yyy.....', '.y......', '.y......', '.yoyyoy.', '.yyoyyy.', '.yyyyyy.', '.y.y..y.'] }, // 29
  { key: 'umbrella', rows: ['...rr...', '..rrrr..', '.rrrrrr.', 'rrrrrrrr', 'r.rnr.r.', '...n....', '...n....', '..nn....'] }, // 29
];
```
Names ×11 → `data/b2/pixel-figure-names.js` (duck, flag, cup, boot, boat, key, fish, cherries, elephant, bird, giraffe, umbrella — `umbrella` exists in the symmetry table; `boat`/`fish` are authored once for #2 and shared here).

### 6. Locale slots
None on the page. Names for meta/landing only. Title genre word per panel (Gitterbilder abmalen · reproduction sur quadrillage · copia el dibujo en la cuadrícula · copie o desenho na malha · riproduci il disegno sui quadretti · natekenen op ruitjes · rita av på rutnät · tegn efter på ternet papir · tegn av på rutenett · kopioi ruudukkokuva).

### 7. Alternatives
- **One 8×8 figure at cell 40, side by side** — 320+40+320 = 680 > 675 body; and a single figure makes a thin K page.
- **Model above target (stacked)** — fits bigger cells (8×8 @ 44) but "copy across" reads better for the eye than "copy down" (row-by-row scanning stays horizontal).
- **Recommendation: two rows, side by side.**

### 8. Risks
- Child loses the row on 8×8 → d3 carries A-H/1-8 labels on both grids; d1/d2 stay label-free (K, no letters needed).
- A symmetric figure would make a mirrored copy "also correct" → asymmetry is a load-time assertion in the data module AND in verify().
- Heavy figures (elephant 36 cells) tire a K hand → the d3 bucket only; d1/d2 buckets are 18-25 cells.
- B&W: mono teal fill prints dark grey; grid lines light → unambiguous.

---

## #7 G1-243 — Number of the Day  (`number-of-the-day`, G1, K.NBT.A.1 / 1.NBT.B.2)

### 1. Page concept
One number, shown huge in a white card, and the whole page asks "how many ways can you show it?" — write its word, split it into tens and ones, draw it with blocks, find it on the number line, ten more / ten less, before / after, odd or even. Every cell is an empty apparatus the child fills; nothing but the number itself is printed. It is the classroom morning-routine mat teachers already use, done properly: language-light cells, icon headers, generous boxes.

### 2. Layout (d2, N ≤ 50)
```
Row A (h 170)
┌ numeral 170×170 ┐ ┌ number word 300×170 ─────────┐ ┌ before / after 175×170 ┐
│   (white card)  │ │ label                        │ │ label                  │
│      47         │ │ ── writing row 270×60 ──      │ │  ◁ [ 56 ]  47  [ 56 ] ▷ │
│  Baloo 110px    │ │ ── writing row 270×60 ──      │ │   dashed boxes 56×50   │
└─────────────────┘ └──────────────────────────────┘ └────────────────────────┘
Row B (h 220)                       gap 16
┌ tens & ones 214 ┐ ┌ draw it with blocks 214 ──────┐ ┌ ten more / ten less 214 ┐
│ label           │ │ label   legend: ▮=10  ▪=1      │ │ label                    │
│ [rod] [cube]    │ │ ┌ dot-grid box 190×150 ┐       │ │  47 + 10 = [   ]         │
│ [ 62 ] [ 62 ]   │ │ └──────────────────────┘       │ │  47 − 10 = [   ]         │
└─────────────────┘ └────────────────────────────────┘ └──────────────────────────┘
Row C (h 120)
┌ number line 675 ── label ── 0 ─┼─┼─┼─┼─ 5 ─ … ─ 50 (tick 1, label 5, no mark) ┐
└──────────────────────────────────────────────────────────────────────────────┘
Row D (h 88)
┌ odd or even? 320 ┐   ┌ count on 339 ─────────────────────────────┐
│  ( odd ) ( even ) │   │  47 → [   ] → [   ] → [   ]                │
└───────────────────┘   └────────────────────────────────────────────┘
```
Heights 170 + 16 + 220 + 16 + 120 + 16 + 88 = 646 ≤ 740. All cells are `.ws-card` (cream, no badge) with a 14 px Nunito 800 `inkSoft` label at top-left; the numeral card is white with teal 3 px border radius 16. Row C's number line is `numberLine({min:0,max:50,tickStep:1,labelEvery:5,width:560})` with **no marks** — the child draws an arrow/X at N.
- d1 (N ≤ 20): Row B = tens & ones · **two empty ten-frames** (`tenFrame({a:0, cell:34})` ×2 stacked, 176×74 each — the child draws the counters) · **tally** (white box 190×150 with a 5-tally legend glyph `tally({n:5, strokeH:22})` in the corner); Row C line 0-20 tick 1 label 1 → wait, label every 5 (0,5,10,15,20) so the mark is a real find; Row D as d2.
- d3 (N ≤ 100): Row B = tens & ones · draw it · **ten more / ten less + one more / one less** (4 boxes in 2 columns); Row C line 0-100 tick 5 label 10; Row D = odd/even · **count on by tens** `47 → [ ] → [ ] → [ ]` (57, 67, 77).

### 3. Difficulty ladder
| | N range | cells |
|---|---|---|
| d1 | 11-20 | word · before/after · tens&ones · 2 ten-frames · tally · line 0-20 · odd/even · count on (+1) |
| d2 | 21-50, not a multiple of 10 | word · before/after · tens&ones · draw it (blocks) · ±10 · line 0-50 · odd/even · count on (+1) |
| d3 | 21-99, not a multiple of 10 | word · before/after · tens&ones · draw it · ±10 and ±1 · line 0-100 · odd/even · count on by 10s |
N avoids multiples of 10 so tens/ones both non-zero and −10 never lands on 0-9 confusion; N ≥ 11 so "ten less" is ≥ 1.

### 4. Answer-hiding + uniqueness — verify()
Stamps: page div `[data-ws-content] data-lcs-n="47"`; each cell `[data-lcs-cell="word|tens-ones|frames|tally|before-after|draw|plus-minus-10|plus-minus-1|line|odd-even|count-on"]`; deterministic answers on their boxes: `data-lcs-answer` (word cell: `data-lcs-word="<numberWord(N,locale)>"`; tens/ones boxes; before/after; ±10/±1; count-on boxes; odd-even cell `data-lcs-parity`; line `data-lcs-expect="47"`); open cells (frames/tally/draw) carry `data-lcs-expect="47"` only.
- Every `data-lcs-answer` equals the recomputed function of N (tens = ⌊N/10⌋, ones = N mod 10, N±1, N±10, parity, count-on N+1..N+3 or N+10..N+30).
- The number word (`lib/number-words.js numberWord(N, locale)`) appears in **no** text node (case-insensitive, also with spaces/hyphens stripped — de compounds, fi agglutination).
- The digits of any answer value (before, after, ±10, ±1, count-on) appear in no text node other than the allowed prints: N in the numeral card, N in the before/after centre, N at the head of the ±10 / count-on expressions, and number-line tick labels (`data-lcs-ticklabel` — labels are structural: 40 and 50 must be allowed to print even when N+10 = 50; verify exempts ticklabels but asserts N itself is never a `ticklabel` — the generator guarantees this by the not-a-multiple-of-10 rule at d2/d3 and label-every-5 vs N ∉ {5,10,15,20} at d1).
- Number line has zero `data-lcs-mark` dots and zero `data-lcs-hop` arcs; ten-frames (d1) have `data-lcs-a="0"`; tally legend shows exactly 5 strokes.
- Odd/even: both chips present, neither pre-marked, chip texts equal the locale label table's `odd` / `even`.
- Labels: no raw `{key}` / English fallback leak — every label text ∈ the locale's label table (refuse-don't-guess in build).

### 5. Primitives / components
Reuse: `tenFrame`, `tally`, `baseTenBlocks` (legend glyphs: `rod(unit 8)` and `unitCube(unit 8)` as the icon headers over the tens/ones boxes — a base-ten *picture* label, not a word), `numberLine`, `writingRow` (`trace-path.js`, `xHeight:true`, glyphH 30 → h 60), `answerBox`, the G1-213 dot-grid think panel (extract to `components.js dotGridBox({w,h})` — 3rd consumer). New: `pillChoice({items})` in `components.js` — two white pills (Baloo 2 20 px, teal 2 px border, radius 999, padding 6 24) for odd/even.

### 6. Locale slots — `data/b2/number-of-day-labels.js` ×11
Keys: `numberWord, tensOnes, tens, ones, tenFrames, tally, beforeAfter, before, after, numberLine, oddEven, odd, even, drawIt, tenMoreTenLess, oneMoreOneLess, countOn, countOnByTens`. Frame-free: every cell is a label + apparatus. The number word is generated (`numberWord`) — the panel must confirm the engine's form for the locale's K-1 convention (de "siebenundvierzig" one word; fr "quarante-sept" hyphen; sv "fyrtiosju"; fi "neljäkymmentäseitsemän"). Header word by panel (Zahl des Tages · nombre du jour · número del día · número do dia · numero del giorno · getal van de dag · dagens tal · dagens tal · dagens tall · päivän luku).

### 7. Alternatives
- **Uniform 4×3 grid of equal cells** (the classic mat) — cells 150 px wide; the 0-50 number line and two ten-frames do not fit; rejected.
- **Poster: giant numeral centred, cells radiating** — wastes ~30 % of the page on the numeral; rejected.
- **Recommendation: hero row + apparatus rows**, the number line taking a full-width row (it needs 560 px to be markable).

### 8. Risks
- Long number words (fi 22 chars, de 17) → two 270 px writing rows at glyphH 30 (≈ 18 chars each); the word cell is 300 wide.
- fi/de labels at 14 px in 214 px cells ("Kymmenen enemmän / vähemmän") → labels wrap to 2 lines; cell label zone is 34 px tall.
- Odd/even words long (de *ungerade*) → pills are auto-width; the cell is 320 px.
- The number line labels can equal an answer value (N+10 = 50 on a 0-50 line) — structural, exempted explicitly (see §4) so the gate is neither vacuous nor a false positive.
- B&W: rod/cube icon headers are teal/coral fills → both have 2 px strokes and different shapes.

---

## #10 G1-246 — Number Walls  (`number-walls`, G1, 1.OA.C.6 / 1.OA.D.8)

### 1. Page concept
Brick pyramids: each brick is the sum of the two beneath it. The base is given; the child builds upward, writing sums in the dashed bricks until the top stone sits. d3 knocks a hole in the base — the brick above it is given, so the child must think backwards (unknown addend). It is the Zahlenmauer, beloved across de/nl/sv/fi classrooms, drawn as real masonry (offset courses) so the "two below" relation is visible without a word.

### 2. Layout (d2)
```
cardGrid 2×3 (cards ≈ 330×222)                 brick 88×52, course offset 44
┌ 1 ─────────────────┐ ┌ 2 ─────────────────┐        ┌────────┐
│        ┌────────┐   │ │                    │        │ dashed │      top (blank)
│    ┌────────┬────────┐                      │    ┌────────┬────────┐
│    │ dashed │ dashed │                      │    │ dashed │ dashed │ row 2 (blank)
│ ┌────────┬────────┬────────┐                │ ┌────────┬────────┬────────┐
│ │   4    │   7    │   3    │                │ │ given  │ given  │ given  │ base
└────────────────────┘ └────────────────────┘
(rows 3 same)
```
Wall width 3×88 = 264, height 3×52 = 156 (+ 2 px stroke). Cards from `cardGrid({cols:2, rows:3})` with `.ws-card-stage`. d1: 4 walls in 2×2, brick 100×60. d3: 4 walls in 2×2, 4 courses, brick 78×48 → 312×192.
Brick: white fill, `teal` 2.5 px stroke, radius 8; numeral Baloo 2 28 px `ink` (26 px at d3). Blank brick: white, **coral 2.5 px dashed (6 5)**, no text.

### 3. Difficulty ladder
| | courses | walls | base values | top ≤ | blanks |
|---|---|---|---|---|---|
| d1 | 3 | 4 | 1-4, a+2b+c ≤ 10 | 10 | 3 (rows 2-3) |
| d2 | 3 | 6 | 1-9, a+2b+c ≤ 20 | 20 | 3 |
| d3 | 4 | 4 | 1-5, a+3b+3c+d ≤ 20 | 20 | 6: one base brick + both row-2 bricks above it are NOT both given — exactly one of them is given; rows 3-4 blank |
d3 pattern precisely: pick gap index g ∈ {0..3}; given = the other three base bricks + ONE row-2 brick adjacent to the gap (`[g−1,g]` if g>0 else `[g,g+1]`, seeded when both exist); everything else blank (6 blanks). The gap is solved by subtraction (1.OA.D.8), then the wall propagates by sums. Walls per page deduped on the ordered base tuple.

### 4. Answer-hiding + uniqueness — verify()
Stamps: svg `data-lcs-prim="number-wall" data-lcs-rows="3" data-lcs-base="4,7,3"`; each brick `<g data-lcs-brick="r,c" data-lcs-value="v" [data-lcs-given|data-lcs-blank] >`; blank bricks carry `data-lcs-answer="v"` and no `<text>`.
- Recompute the full pyramid from `data-lcs-base`; every brick's `data-lcs-value` matches; blanks' answers match; givens' printed text matches.
- **Uniqueness by propagation**: starting from the given set only, repeat {if two adjacent lower bricks known → upper known; if an upper brick and one of its two lower bricks known → the other lower known} to fixpoint; every brick must resolve. (Poison: a d3 wall with the gap's both row-2 bricks blank must FAIL.)
- Base values ≥ 1; top ≤ band max; d3 has exactly one base blank; blank count per wall = expected; no `<text>` inside a blank brick; the top numeral is not printed anywhere on the card (except when given at… never given in this design).
- Walls distinct on the page.

### 5. Primitives
**NEW `primitives/number-wall.js`** `numberWall({base:[…], blanks:Set('r,c'), brick:{w,h}, radius 8})` → `{svg, meta:{values}}`: computes courses bottom-up; course r has (n−r) bricks, x offset r×w/2; draws bottom course first; uses `roundedRect` + `label` from `_svg`. Nothing else new; `cardGrid` for the layout.

### 6. Locale slots
None on the apparatus. Title/instruction by panel (Zahlenmauern · pyramides additives · pirámides numéricas · pirâmides numéricas · piramidi di numeri · rekenpiramides · talpyramider · talpyramider · tallpyramider · lukupyramidit).

### 7. Alternatives
- **Top given, base blank ("find the base")** — infinitely many solutions; rejected outright.
- **Flat "number train" rows** — loses the two-below spatial rule that makes the genre self-explanatory; rejected.
- **Recommendation: masonry pyramid, base-up at d1/d2, one subtraction gap at d3.**

### 8. Risks
- Two-digit sums in 88 px bricks → 28 px numerals need 40 px; fine. d3 bricks 78 px with 26 px numerals; fine.
- Sums at d2 can reach 20 with duplicates across walls → dedupe on base tuple and also on the top value across the page (≥ 4 distinct tops of 6).
- B&W: dashed vs solid carries the blank state.

---

## #12 G1-248 — Where on the Number Line?  (`number-lines` REUSE, G1, 1.NBT.A.1 / 2.MD.B.6)

### 1. Page concept
A number line shows only a few landmark labels (0, 5, 10, 15, 20). Coral arrows point down at three unlabelled ticks, each with an empty box above: "what number lives here?" The child counts on from the nearest landmark and writes it. Distinct from G1-138 (numeral given → circle the mark): here the *position* is given and the *numeral* is the answer.

### 2. Layout (d2)
```
cardGrid 1×4 (cards 675×≈168)
┌ 1 ──────────────────────────────────────────────────────────────────────┐
│        [  ]           [  ]                     [  ]     dashed 52×44    │
│         ▼              ▼                        ▼       coral arrow     │
│ ◀─┼─┼─┼─┼─┼─┼─┼─┼─┼─┼─┼─┼─┼─┼─┼─┼─┼─┼─┼─┼─▶                             │
│   0         5         10        15        20            width 560       │
└──────────────────────────────────────────────────────────────────────────┘
```
`numberLine({min:0,max:20,tickStep:1,labelEvery:5,width:560, pointers:[{value:7},{value:12},{value:18}]})` — the line primitive gains an **additive** `pointers` param (absent → byte-identical output). Each pointer: coral 3 px line from the box bottom (y−36) to the tick (y−8) with a 9 px arrowhead at the tick; above it a dashed `roundedRect` 52×44 (coral 2.5 dash 6 5, white) centred on `xFor(value)`, stamped `data-lcs-pointer="7" data-lcs-answer="7"`. Primitive height grows to arcH 72 when pointers exist.

### 3. Difficulty ladder
| | range | tick | labels | lines | pointers/line | min gap |
|---|---|---|---|---|---|---|
| d1 | 0-10 | 1 | 0, 5, 10 | 3 | 2 | 2 ticks |
| d2 | 0-20 | 1 | every 5 | 4 | 3 | 2 ticks |
| d3 | 0-100 | 5 | every 10 | 4 | 3 | 2 ticks (=10) |
Pointer values: unlabelled ticks only, distinct, ≥ 2 ticks apart (boxes are 52 px, ticks 28 px apart on both 0-20 and 0-100/5 lines). Across the page no pointer value repeats.

### 4. Answer-hiding + uniqueness — verify()
- Each pointer's value ∉ the set of printed `data-lcs-ticklabel` values; its box contains no text; `data-lcs-answer == data-lcs-pointer`.
- Arrow tip x equals the x of `[data-lcs-tick="<value>"]` within 1 px (the gate reads the tick, not the pointer's own x).
- Pointer count per line = expected; values distinct on the page; adjacent pointers ≥ 2 ticks apart; labels printed only at the expected step (`labelEvery`); a line with `labelEvery` = 1 FAILS (would print the answer).
- Uniqueness: a tick has one value.

### 5. Primitives
`number-line.js` + additive `pointers` (see §2) — the only change; the byte-identity baseline (30 published number-line coordinates) must be re-checked after the edit. `cardGrid` layout.

### 6. Locale slots
None on the apparatus. Title/instruction by panel (Zahlenstrahl beschriften · placer sur la droite graduée · ¿qué número es? recta numérica · reta numérica · linea dei numeri · getallenlijn · tallinjen · tallinjen · tallinja · lukusuora).

### 7. Alternatives
- **Box below the line at the tick** — collides with the landmark labels; rejected.
- **Write directly on the tick, no box** — no clear slot for a 6-year-old; rejected.
- **Recommendation: arrow from above + box.** Also allows the box to stay 52 px wide for "100".

### 8. Risks
- 0-100 with tick 5 is 20 intervals at 28 px — legible; "100" label 17 px Baloo fits under its tick.
- Two pointers 2 ticks apart put boxes 4 px apart — accept, or raise min gap to 3 ticks when a line has 3 pointers (spec: 3 pointers → min gap 3 ticks on 0-20; 0-100 keeps 2).
- B&W: coral arrows print mid-grey but the arrowhead shape is unambiguous.

---

## #17 G2-277 — Read the Calendar  (`calendar`, G2, readiness — de Zeit / fr CP-CE1)

### 1. Page concept
A real month page — weekday header, numbered days, three little stickers (a ball on the 6th, a kite on the 19th…) — and six questions that can only be answered by *reading the grid*: what day is the 14th? how many Fridays? on which date is the [kite]? one week later? The month/year are the same in all 11 locales; only the day and month names and the question frames change. Monday-first everywhere except en (Sunday-first).

### 2. Layout (d2)
```
┌ month bar 643×40: "März 2026"  Baloo 2 24px teal ─────────────────────────┐
┌ calendar 643×(40 + 6×56 = 376) ─────────────────────────────────────────────┐
│ Mo   Di   Mi   Do   Fr   Sa   So    header row teal fill, white 16px       │
│      1    2    3    4    5    6     cells 88×56, white, grid 1px           │
│ 7    8    9    10   11   12   13    day numeral Baloo 20 top-left          │
│ …                        [🎈]       sticker 34px bottom-right (image)     │
│ leading/trailing empty cells creamDeep                                      │
└──────────────────────────────────────────────────────────────────────────────┘
  gap 18
┌ questions: grid 2 cols × 3 rows, each 315×80, gap 12 ───────────────────────┐
│ ① What day of the week is the 14th?              [ ________ ]  (160×40)      │
│ ② How many Fridays are there?                    [    ]       (64×40)        │
│ ③ On which date is the [🎈]?                     [    ]                      │
│ ④ What is the date one week after the 6th?       [    ]                      │
│ ⑤ How many days does this month have?            [    ]                      │
│ ⑥ What day of the week is the first day?         [ ________ ]                │
└──────────────────────────────────────────────────────────────────────────────┘
```
Heights 40 + 376 + 18 + 3×80 + 24 = 698 ≤ 740 (5-row months give 56 px more slack). Question chips are `.ws-card` (cream) with a teal 24 px number badge; question text Nunito 800 15 px, max 2 lines; answer slot right-aligned.
- d1: 4 questions (①②③⑤) in 2×2, stickers 2; d3: 6 questions incl. ⑦ "How many days from the [A] to the [B]?" replacing ⑤, and ④ crossing a week boundary.

### 3. Difficulty ladder
| | questions | kinds | stickers | month pick |
|---|---|---|---|---|
| d1 | 4 | dayOfDate · countWeekday · stickerDate · daysInMonth | 2 | any |
| d2 | 6 | + weekLater · firstDay | 3 | any |
| d3 | 6 | dayOfDate · countWeekday · stickerDate · weekLater · between · lastDay | 3 | 31-day month starting Fri/Sat/Sun (6 rows) |
Seed: `(year ∈ 2025..2027, month 0..11)` from rng; stickers = 2-3 distinct label-safe nouns from a fixed `STICKER_THEME = 'toys'` (pictures only, never named) on distinct days ≥ 2 apart; the `dayOfDate` date is never a sticker day and never the 1st.

### 4. Answer-hiding + uniqueness — verify()
Stamps: calendar svg `data-lcs-prim="calendar" data-lcs-year data-lcs-month data-lcs-weekstart="1|0" data-lcs-days="31"`; each day cell `data-lcs-day="14" data-lcs-col="c"`; stickers `data-lcs-sticker="<noun>" data-lcs-day`; each question `[data-lcs-q="dayOfDate" data-lcs-arg="14" data-lcs-answer="Samstag"]` (arg2 for `between`); answer slot `data-lcs-slot="word|number"`.
- **Own date math**: `new Date(Date.UTC(y, m, 1)).getUTCDay()` → first-day column = `(dow − weekStart + 7) % 7`; day count = `new Date(Date.UTC(y, m+1, 0)).getUTCDate()`; every `data-lcs-day` cell sits in the recomputed column; header order = `dayNames` rotated by `weekStart`; en has `weekstart=0`, all others `1`.
- Every question answer recomputed from (y, m, weekStart, stickers, args): weekday-word answers ∈ the locale `dayNames` (full form); numeric answers 1..31; `countWeekday` equals the recomputed count; `between` = |dayB − dayA|.
- The answer word never appears in the question text; no raw `{slot}`; every sticker referenced by a question exists on the grid; sticker days distinct; a question's arg date exists in the month.
- Slot width matches answer kind (word → 160 px).

### 5. Primitives / components
**NEW `primitives/calendar.js`** `calendar({year, month, weekStart, dayAbbr[7], stickers:[{day, href}], cell:{w:88,h:56}})` → `{svg, meta:{firstCol, days}}` — `roundedRect` frame teal 3 px, header row teal fill, `label` numerals, `<image>` stickers (`fileUri`). Month bar in HTML. Questions: plain HTML chips; inline sticker = 26 px `<img>` inside the sentence (language-free reference, avoids article/gender).

### 6. Locale slots — `data/b2/calendar.js` ×11
`weekStart` (en 0, others 1) · `dayNames[7]` full (Monday-first order) · `dayAbbr[7]` (≤ 3 chars) · `dayPlural[7]` for countWeekday ("Freitage", "vendredis", "viernes", "sextas-feiras", "venerdì", "vrijdagen", "fredagar", "fredage", "fredager", "perjantaita" — fi partitive plural, panel-owned) · `monthNames[12]` · `ordinal(n)` formatter (en "14th", de "14.", fr "14" / "1er", es/pt/it "14", nl "14e", sv/da/no "14." / "den 14.", fi "14." ) · frames: `dayOfDate: "What day of the week is the {date}?"`, `countWeekday: "How many {dayPlural} are there this month?"`, `stickerDate: "On which date is the {sticker}?"` ({sticker} = the inline picture), `weekLater: "What is the date one week after the {date}?"`, `daysInMonth`, `firstDay`, `lastDay`, `between: "How many days from the {stickerA} to the {stickerB}?"`. Casing rule per locale (lowercase day/month names in fr/es/pt/it/nl/sv/da/no/fi; capitalised de/en) is the panel's. Validator: every frame contains exactly its slots; ≤ 70 chars.

### 7. Alternatives
- **Calendar left, questions in a right column** — 643 px calendar leaves no column; rejected.
- **Questions as a fill-in table (date → weekday)** — drier, loses the sticker "events" that make the reading purposeful; rejected.
- **Recommendation: full-width month + 2×3 question chips.**

### 8. Risks
- de/fi frames 30-40 % longer → 315×80 chips hold 2 lines of ~34 chars at 15 px; frames capped at 70 chars by the validator; slot for word answers 160 px (fi "sunnuntai", de "Donnerstag" fit at 16 px).
- 6-row months are handled by the 56 px cell (376 px total); never a 7th row.
- Sticker pictures grey in B&W — the question repeats the same picture inline, so matching by shape works.
- Header teal fill prints dark grey with white text — legible.

---

## #19 G2-279 — Grid Coordinates: Color the Squares  (`grid-coordinates`, G2, readiness — repérage sur quadrillage)

### 1. Page concept
An empty lettered grid on the left, a colour-coded list of cell codes on the right: **red: C4 · D4 · D5 …**. The child finds each cell (letter across, number down), colours it, and a boot / bird / cherry pair emerges — pixel art from coordinates. A tiny 3×3 legend shows what "B2" means, so the page teaches itself without a sentence.

### 2. Layout (d2)
```
┌ grid area 396×396 ────────────────────┐   ┌ code list column 240 ───────────┐
│     A   B   C   D   E   F   G   H     │   │ ┌ how-to 3×3 mini grid ┐ "B2" → │
│ 1 ┌───┬───┬───┬───┬───┬───┬───┬───┐   │   │ └──────────────────────┘        │
│ 2 │   │   │   │   │   │   │   │   │   │   │ ■ red     C4  D4  D5  E5        │
│ 3 │   │   … 8×8 cells @46, white …  │   │   │           E6  F6  F3            │
│ … │                                   │   │ ■ blue    B3  C3  …             │
│ 8 └───┴───┴───┴───┴───┴───┴───┴───┘   │   │ ■ yellow  D3                    │
└───────────────────────────────────────┘   └─────────────────────────────────┘
```
Grid: letters (Baloo 2 16 px `inkSoft`) across the top gutter (28 px), numbers 1..N down the left gutter, **top-down** (table convention, fr "case B3"); lines `grid` 1 px, frame teal 2.5 px radius 6; every cell white. List column: per colour group a row with a 22 px swatch (codeColors) + the colour WORD (Nunito 800 15 px) + code chips (white pills 44×24, `grid` 1 px border, Baloo 2 15 px), wrapping 4 per line. How-to legend: 3×3 mini grid (cell 18, A-C / 1-3) with B2 filled teal and the chip "B2" beside it — language-free.
d1: 6×6 grid @ 56 (336+28), 6×6 figure at offset (0,0). d3: 10×10 @ 40 (400+28) with 8×8 figure at seeded offset ∈ {0,1,2}².

### 3. Difficulty ladder
| | grid | cell | figure | offset | codes | colours |
|---|---|---|---|---|---|---|
| d1 | 6×6 | 56 | 6×6 bucket | 0,0 | 18-25 | 2-3 |
| d2 | 8×8 | 46 | 7×7 bucket | {0,1}² | 20-25 | 2-3 |
| d3 | 10×10 | 40 | 8×8 bucket | {0,1,2}² | 29-36 | 2-4 |
Codes within a colour group are **shuffled** (seeded) — sorted codes would spell the drawing row by row. One figure per page.

### 4. Answer-hiding + uniqueness — verify()
Stamps: grid svg `data-lcs-prim="coord-grid" data-lcs-cols data-lcs-rows data-lcs-figure="boot" data-lcs-ox data-lcs-oy`; invisible `rect fill="none" data-lcs-answer-cell="C4" data-lcs-color="r"` per figure cell; list `[data-lcs-group="r"]` with chips `[data-lcs-code="C4"]`; legend `[data-lcs-demo]` (excluded from the fill check).
- Code set (all chips) == answer-cell set == cells recomputed from `PIXEL_FIGURES[figure]` + offset (letter = `'ABCDEFGHIJ'[c+ox]`, number = `r+oy+1`); bijective, no duplicates.
- Every code's letter < cols and number ≤ rows; the figure fits at the offset.
- No visible fill in the main grid (every `rect` fill ∈ {none, white}); the only teal cell on the page is inside `[data-lcs-demo]`.
- Group colours == the figure's letter set; each group's chip count == the figure's count for that letter; colour words == `COLOR_WORDS[locale][key]`; swatch hex == `codeColors[key]`.
- Codes within a group are not in row-major order (guards the shuffle; poison: a sorted list must FAIL).

### 5. Primitives / components
**NEW `primitives/coord-grid.js`** `coordGrid({cols, rows, cell, figure, offset, demo:false})` → `{svg, cells:[{code, color}]}` (grid idiom from `sym-grid.js`; letters/numbers via `label`). **NEW `components.js codeList({groups, words, swatches})`** and `coordDemo()`. `_tokens.js codeColors` grows by the 4 colours above; `data/color-words.js` grows to 8 words ×11 (K-241 still reads the first 4 — byte-identity proven per the plan).

### 6. Locale slots
8 colour words ×11 (panel-authored, lowercase where the language does; the K-241 four stay byte-identical). Nothing else — "B2" codes and A-J letters are shared by all 11 (Latin alphabets throughout; å/ä/ö never appear in A-J). Title genre by panel (Koordinaten: Kästchen ausmalen · pixel art sur quadrillage · pixel art en cuadrícula · pixel art na malha quadriculada · pixel art sui quadretti · pixelkunst op ruitjes · rutnät koordinater · koordinater pixelkunst · koordinater rutenett · koordinaatit ruudukko).

### 7. Alternatives
- **Cartesian (letters bottom, numbers bottom-up)** — the G3 coordinate-plane convention; held for a later G3 type, not this readiness page.
- **Checkbox before each code** ("tick as you go") — real scaffold but adds 36 tiny boxes; instead each colour group sits on its own line so the child can cross off chips.
- **Recommendation: table convention (top-down), grouped-by-colour shuffled chips, mini legend.**

### 8. Risks
- 36 chips in a 240 px column → 4 per line × 9 lines × 28 px + 4 headers ≈ 370 px; fits beside the 428 px grid.
- Long colour words (fi *oranssi*, de *violett*, pt *castanho*) → header line is its own row; chips wrap below.
- B&W: swatches collapse but the colour word carries the code (K-241 precedent); different colours also never share a cell, so a mono-coloured page still yields the right silhouette.
- Orange vs coral confusion → coral is used only for instruction badge/dashes on this page; no dashed boxes at all here.

---

### Cross-type notes for the engineer
- Two gates ship with data: `qa/verify-dot-figure.js` (= `design-A-check.js` polygon half, incl. the admissible-midpoint resampler and the bowtie poison) and `qa/verify-pixel-figures.js` (square 6-8, ≥40 %, asymmetric under 3 flips, 8-connected; poison: any symmetric figure).
- Additive shared edits, each byte-identity-checked against the 30-coordinate baseline: `number-line.js pointers`, `_tokens.js codeColors ×4`, `data/color-words.js ×8`, `components.js` (+`numberStrip`, `copyArrow`, `pillChoice`, `dotGridBox`, `codeList`, `coordDemo`).
- Figure-name tables: `star, house, rocket, heart, butterfly, tree, cat, ice-cream, umbrella, sailboat, crown` already exist ×11 in `data/symmetry/figure-names.js` (reuse verbatim); fresh ×11 authoring is needed only for `boat, fish, kite, car, whale` (#2) and `duck, flag, cup, boot, key, cherries, elephant, bird, giraffe` (#3/#19) — 14 names, one shared `data/b2/figure-names.js` keyed by figure key.
