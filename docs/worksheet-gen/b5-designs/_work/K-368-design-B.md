# K-368 `2d-shapes`: DESIGN B (2026-09-23)

Designer B. Read: `_ROLE-DESIGN`, `_STUDIO-BRIEF`, `_SUBSTRATE`, `_PANEL-FINDINGS` (row 2 + cross-panel rulings), the `2d-shapes` sections of the four `_work/_selection-*.md`, `_work/K-368-pedagogy.md` (the content plan; its six moves, CCSS, bands, bank and validator are taken as given), `lib/shape-data.js`, `page/page.css` (`.ws-card` `.ws-achip` `.ws-pill` `.ws-lane` `.ws-bankword`), `templates/components-b2.js` (`pillChoice`, `rulingBlock`), `templates/layouts/card-grid.js`, `../b4-designs/K-353-tangram.md` §2 (layout convention). LOOKED at: `out/batchS/K-070-animals-d2-en.png`, `K-075-animals-d2-en.png`, `out/b4-sweep/en/K-359-null-d2-en.png`, `K-354-null-d2-en.png`. (m) = measured by a scratch node script this session (`K-368-B-geo.js`, `K-368-B-enum.js`); (o) = picture OPENED with the Read tool this session; *est.* = not measured in a real render with the shell fonts, engineer measures. No em-dashes.

## Boundary

This page is NOT: K-070 find shapes like a model (no name), K-075 count sides, K-076 / G2-241 sort by sides, K-077 patterns, K-078 twins, K-079 big/small, K-080 odd shape out, K-265 colour by shape code, G2-234 partition, G2-242..248 faces/edges/vertices, G2-243/244 solids and flat-vs-solid, G3-340 quadrilaterals; not tangram K-353/K-358/K-359/G1-354/G1-355/G2-347 (composing WITH pieces, counting triangles/squares in a seamed figure); not the `matching` app mode `name` x theme `shapes` (library shape art joined to a word by a line), nor `crossword`/`wordsearch` x `shapes`. It owns only the NAME of the four core flat shapes (both directions), non-prototypical recognition against near-misses, flat shapes in real objects, riddles, writing the name, drawing on dots. **Visual signature (my concept): the "shape picture".** The base (and F3) show ONE friendly figure built from exact, separate flat shapes (a robot, a rocket, a house), cream with a 3 px teal outline, with coral ring pointers on six of its parts. From across the room a teacher sees one picture, not a grid; up close every pointed part is a real K.G.A.2 item: turned, skinny, big and small in the same picture. The figures share no key, no seam and no silhouette with the tangram figures (tree boat arrow cat rectangle rabbit): tangram tans TOUCH along seams and are counted; here every part stands alone (measured gap ≥ 6 px or wholly inset ≥ 8 px) and is NAMED.

## 1 Page concept (base)

**"2D Shapes: Name the Shape" = the Shape Robot.** A 300 x 520 figure in the middle of the page, three callout boxes on each side, a teal leader line from each box to a coral ring on one part of the figure. Each box holds three stacked name chips; the child circles the name of the part the line points to. Why this beats the obvious grid of six cards: (1) ONE focal apparatus instead of six boxes of the same size, the calm the house pages (K-354 body, K-353 tangram) already have; (2) the misconception rule is carried by the picture, not imposed on it: a robot's arms hang at 30 degrees (turned rectangles that are also skinny, aspect 3.3), its chest button is a square turned 45 degrees (the "that's a diamond" item K.G.A.2 names verbatim), its body is 2.7x the size of the button (size variety is native to a composite, a grid has to fake it); (3) it is the bridge K teachers draw on the board ("the robot's head is a SQUARE"), the most-requested follow-up to naming, without leaving the naming task: the chips hold only shape names, never part names; (4) a composite reads instantly at thumbnail size on the hub card, a grid of six shapes looks like every competitor page (K5, Education.com, Math Salamanders). Top quality: 202 px of vertical slack at the worst chrome goes around the stage, never inside it; pencil-first (the child's only mark is a ring round a 36 px chip); no text inside any drawing; the figure is unnamed (the page never says "robot").

## 2 Layout (d2, 722 body)

Body 722 at 3-line title + 3-line instruction; checked at 677 (4-line fi). `.ws-body` flex column, `justify-content:space-evenly`; the stage is fixed-size and centred, slack goes above and below it.

```
body 675 x 722                                                   (stage 660 x 520, x-offset 7.5)
+-- callout L1 170x140 --+ 10 +----- figure SVG 300 x 520 -----+ 10 +-- callout R1 170x140 --+
| ( square      ) 36     |    |        [head 100 sq]            |    | ( circle      ) 36     |
| ( circle      ) 36     o----------o                    o--------------o( rectangle   ) 36     |
| ( triangle    ) 36     |    |  arm    [body 130x200]  arm     |    | ( square      ) 36     |
+------------------------+    |  30deg  (dial d72)       -30deg  |    +------------------------+
          50 gap              |         <button sq 45deg>        |              50 gap
+-- callout L2 170x140 --+    |        [leg]  [leg]              |    +-- callout R2 --------+
| ... 3 chips            o---------o                    o---------------o ...                |
+------------------------+    |      /foot|  |foot\             |    +------------------------+
          50 gap              |                                  |              50 gap
+-- callout L3 170x140 --+    |                                  |    +-- callout R3 --------+
+------------------------+    +----------------------------------+    +------------------------+
width 170 + 10 + 300 + 10 + 170 = 660 <= 675
height stage 520 (3 x 140 + 2 x 50) ; 722 - 520 = 202 slack (101 above, 101 below) ; at 677: 157 slack
```

- **Callout box** (`.s2d-callout`): 170 x 140, cream `#FBF3E4`, border 2 `#F0E4CB`, r 14, padding 8 (the `.ws-lane` look at a narrower padding, stated inline). Inside: 3 chips stacked, gap 6: 3 x 36 + 2 x 6 = 120; 120 + 16 + 4 = 140. Column: `display:flex; flex-direction:column; justify-content:space-between` over 520.
- **Chip** = `.ws-achip` (white, 2.5 teal, r 24, Baloo 2 700) with inline `height:36px; padding:0 14px; font-size:18px; width:100%` (full box width 150 so every chip is the same target and width never hints). Longest core name "suorakulmio" (fi, 11 chars) at Baloo 700 18 px *est.* 103 px + 28 padding + 5 border = 136 <= 150.
- **Figure SVG** 300 x 520 (`viewBox 0 0 300 520`, rendered 1:1). House is 300 x 360 and is vertically centred in the 520 slot.
- **Leader overlay**: one absolutely positioned SVG 660 x 520 over the stage, drawn AFTER the figure. Per callout: teal dot r 4.5 at the callout's inner-edge midpoint (x 170 or 490), a 2.5 px `T.teal` line, a coral `T.coral` ring r 9, stroke 3, no fill, at the part's ring point (below). Lines are straight.
- **Ring point** per pointed part: the grid point (2 px step) inside the part and outside every part it contains, that maximises the distance to all those boundaries, restricted to the half of the part facing its callout side when the part straddles x = 150; required distance ≥ 12 (ring r 9 + 3). Measured candidates (m): body right strip x 186.8..215 is 28 px wide beside the button, ring fits at about (201, 250); robot button inset margin 9.2 inside the body, ring at its centre.
- **Side assignment**: sort the 6 pointed parts by centroid x; the 3 smallest go left, the 3 largest right; ties at x 150 fill the side that is short. Within a side, callouts top to bottom = rings sorted by y. Gate: no two leader segments intersect, no leader passes within 10 px of another ring; on failure the composer re-draws the selection (the robot has 6 valid d2 sets, below).
- **Floors (asserted by the family gate)**: pointed part bbox long side ≥ 72, its shortest side ≥ 30 (K; measured minimum on the robot = arms 30 x 100, legs 34 x 110; circle d 72); chip text 18 px (K ≥ 16); ring stroke 3; figure stroke 3 (`stroke.primitive`).

**The three figures (data `data/b5/shape-pictures.js`, px in the figure box, y down; every number measured by `K-368-B-geo.js`).** `rect(cx,cy,w,h,rot)` = rectangle centred at (cx,cy), rot degrees clockwise on screen; triangles are explicit vertices; circles `(cx,cy,d)`. `in:` = wholly inset in that part. `decor` = drawn, never pointed.

| figure (box) | part | kind | geometry | bbox W x H | turned (min side angle to horizontal) | short/long side |
|---|---|---|---|---|---|---|
| robot (300x520) | head | square | rect(150,70,100,100,0) | 100x100 | 0 | 1.00 |
| | eyeL, eyeR | circle decor, in head | (125,60,20), (175,60,20) | 20 | | |
| | mouth | rectangle decor, in head | rect(150,97,44,10,0) | 44x10 | | 0.23 |
| | body | rectangle | rect(150,240,130,200,0) | 130x200 | 0 | 0.65 |
| | dial | circle, in body | (150,198,72) | 72 | | |
| | button | square, in body | rect(150,294,52,52,45) | 74x74 | 45 | 1.00 |
| | armL / armR | rectangle | rect(40,225,30,100,30) / rect(260,225,30,100,-30) | 76x102 | 30 | 0.30 |
| | legL / legR | rectangle | rect(118,402,34,110,0) / rect(182,402,34,110,0) | 34x110 | 0 | 0.31 |
| | footL / footR | triangle (right) | (135,464)(63,504)(135,504) / (165,464)(237,504)(165,504) | 72x40 | 0 | 0.49 |
| rocket (300x520) | planet | circle | (50,60,80) | 80 | | |
| | nose | triangle | (150,20)(100,120)(200,120) | 100x100 | 0 | 0.89 |
| | body | rectangle | rect(150,246,100,240,0) | 100x240 | 0 | 0.42 |
| | windowC | circle, in body | (150,190,72) | 72 | | |
| | windowS | square, in body | rect(150,280,52,52,45) | 74x74 | 45 | 1.00 |
| | finL / finR | triangle | (94,290)(94,380)(40,420) / (206,290)(206,380)(260,420) | 54x130 | 36.5 | 0.48 |
| | flame | triangle (points DOWN) | (132,372)(168,372)(150,480) | 36x108 | 0 | 0.33 |
| house (300x360) | sun | circle | (50,60,72) | 72 | | |
| | kite | square | rect(245,70,54,54,30) + a 2 px `T.inkSoft` wavy tail path (decor, not a shape) | 74x74 | 30 | 1.00 |
| | roof | triangle | (20,190)(280,190)(150,60) | 260x130 | 0 | 0.71 |
| | walls | rectangle | rect(150,271,225,150,0) | 225x150 | 0 | 0.67 |
| | window | square, in walls | rect(95,271,56,56,45) | 79x79 | 45 | 1.00 |
| | door | rectangle, in walls | rect(200,286,44,104,0) | 44x104 | 0 | 0.42 |

Measured (m): no part leaves its box; minimum gap between separate parts robot 7.0 (body/leg), rocket 6.0 (nose/body), house 6.0 (roof/walls); minimum inset margin 8.0 (house door in walls), 9.2 (robot button in body). Every rectangle is ≥ 1.5 aspect (no rectangle a child could read as a square: walls 1.5, robot body 1.54); every square is exactly square. Skinny (pedagogy thresholds: rectangle aspect ≥ 2.2 i.e. short/long ≤ 0.455, triangle short/long ≤ 0.35): robot arms + legs, rocket body + flame, house door. Turned (15..75): robot button 45 + arms 30; rocket windowS 45 + fins 36.5; house window 45 + kite 30. Draw order: parts in table order, inset parts after their container.

## 3 Ladder

| key | d1 | **d2 (ships)** | d3 |
|---|---|---|---|
| `figure` | `house` | `robot` | `rocket` |
| `callouts` (pointed parts) | 4 (2 per side) | 6 (3 per side) | 8 (4 per side; box stays 140, so the stage grows to 4 x 140 + 3 x 6 = 578 tall, figure centred) |
| `chips` per callout | 2 | 3 | 3 |
| `kindsAll` (all 4 core names pointed) | true | true | true |
| `repeatPattern` | none (4 distinct) | exactly two names twice (1-1-2-2) | free |
| `turnedMin` | 1 | 2 | 3 |
| `skinnyMin` | 0 | 1 | 2 |
| `turnedSquare` (a square at 45) | 1 | 1 | 1 |
| `sizeRatioMin` (largest / smallest pointed bbox long side) | 1.8 | 1.8 | 1.8 |
| chip px | 20 | 18 | 18 |

- d1 house: 4 valid sets (sun + roof + window|kite + walls|door), all distinct kinds, 2 chips (target + one distractor): the gentlest page; walls vs door both rectangles, so a d1 page never points both.
- **d2 robot: exactly 6 valid 6-sets (m, `K-368-B-enum.js`)**: `head body dial button arm(L|R) foot(L|R)` (4) and `body dial button arm(L|R) footL footR` (2). The composer picks one with the seed; every set contains the body (size ratio 200/72 = 2.8), the button (turned square) and one arm (turned + skinny). Kinds: circle 1, triangle 1 or 2, square 2 or 1, rectangle 2 (the 1-1-2-2 pattern).
- d3 rocket: all 8 parts pointed (planet, nose, body, windowC, windowS, finL, finR, flame): 3 turned (windowS, fins), 2 skinny (body, flame), one downward triangle. Stage 578 still fits 722 (144 slack) and 677 (99).
- **Hexagon**: no figure carries one; the base stays on the core four at every level (the pedagogy's d3 hexagon lives on F4). A panel that wants a hexagon item gets it as a data edit (a hexagon part added to a figure, re-measured by the geometry gate), never by code.
- Guards key on these config keys (`figure`, `callouts`, `chips`...), never the level index.

## 4 Answer-hiding + uniqueness

- No shape name is printed anywhere near the figure; names appear only as chips, three per callout, and the three always include two wrong names. The figure carries no text, no part names, no number.
- **Chip sets obey the square/rectangle rule**: a square part's chips are exactly {square, circle, triangle} (a rectangle chip is never offered to a square); a rectangle part's distractors are drawn from {square, circle, triangle}; circle and triangle parts draw 2 of the other 3. Chip order is `rng.shuffle`d per callout; the gate asserts the correct chip's slot (1/2/3) over the page is spread over ≥ 2 slots and, over 20 seeds, no slot > 60 %, measured on the SHIPPED seed too (the nt10-D staircase lesson: the seed carries no locale, so one bad order ships to all 11).
- **verify()**: every part `<path|circle data-lcs-part=<id> data-lcs-kind=<kind> data-lcs-verts="x,y x,y..." data-lcs-pointed=0|1>`; every callout `data-lcs-callout=<n> data-lcs-target=<partId>`; every chip `data-lcs-chip=<kind>`. The gate re-parses the drawn `d` / `r` (never `data-lcs-kind`), runs its OWN `classify(verts)` (sides, equal ±1 %, right angles ±1 degree, circle = `<circle>`), asserts exactly one chip per callout equals it, no square target has a rectangle chip, the leader segment of callout n ends inside part `target` (ring centre inside the part polygon and outside its inset parts), and the d2 constraints in §3 re-derive from the pointed parts' measured geometry.
- **Wrong is visible**: the teacher's key is one ring per callout; a ring round any other chip, or two rings in one box, is wrong at a glance because the three chips differ in length and first letter.

## 5 Primitives / components

**Reused (exact names + file).** `svgRoot`, `el`, `circle`, `esc` (`primitives/_svg.js`) · tokens `color` (`cream creamDeep white teal tealSoft coral ink inkSoft grid`), `stroke.primitive` 3, `stroke.grid` 1.5 (`primitives/_tokens.js`) · `.ws-achip` chip look (`page/page.css:406`) · `.ws-lane` look for callouts (`page.css`, stated inline) · `cardGrid({cards,cols,rows,numbered})` (`templates/layouts/card-grid.js`) for F1 lanes-free faces F2 F4 F5 · `rulingBlock({rows,w,h,glyphH})` + `wordBank({words,wordPx})` (`templates/components-b2.js`) for F3 · `pillChoice` NOT for the base (its `.ws-pill` padding 6 x 24 is 48 px of padding: fi overflows a 150 box, *est.*) · `lib/b3-picture-index.js pictureFor` + `lib/b2-common.js displayWord` for F2 · `lib/b5-common.js bank('2d-shapes', loc)` (pedagogy D.2) · `rng.sample/shuffle/pick`.

**NOT used.** Any library shape picture (`shapes/*`: prototypical colour art, `shapes/diamond` is a 45-degree square, K-078/matching territory) · `iconRows / sceneStage` (a figure is a composition of primitives, not a scene) · `tangram.js` (different set, seams, counted) · `answerBox` / `blankNumeralBox` (no numeral is ever written) · `dot-figure.js` / `grid-copy.js` (copying a model is grid-copy's move; F5 has no model) · `objForms` / `approved-words` (nothing agrees, nothing is split).

**NEW `primitives/flat-shape.js`** (pure SVG, Node-testable; the pedagogy's D.1 API plus an explicit `verts` form so the figures can be authored as data):

`flatShape({kind, verts, cx, cy, w, h, s, d, rot = 0, variant = 'none', variantAt = 0, fill = T.cream, stroke = 3})` returns `{svg, verts, meta}`.
- Geometry (px, y down, rot clockwise on screen, applied as `x' = x cos - y sin, y' = x sin + y cos` about (cx,cy)): `square` side `s`; `rectangle` `w x h`; `circle` diameter `d`, drawn as `<circle>`, `verts` = 64 samples for the gate; `ellipse` `w x h` (aspect ≥ 1.4); `triangle` by `verts` or sub-kind `equilateral|right|obtuse|scalene|skinny` sized to `w x h` then rotated; `rhombus` side `s` acute 60; `parallelogram` `w x h` lean 70; `trapezoid` top 0.55 `w`; `kite` (4-sided near-miss for triangle) diagonals `w x h`, cross at 0.3 `h`; `hexagon` regular circumradius `s`.
- Stroke `T.teal` 3 px, `stroke-linejoin:round`, `stroke-linecap:round`, fill `T.cream` (base/F3 figures) or `T.white` (F1 tiles, so the fill of an open near-miss is invisible and cannot be a tell).
- **Near-miss variants** (F1): `gap` = side `variantAt` loses its middle 16 % (and ≥ 10 px); the outline is ONE open `<path>` from the gap's far end round to its near end; `curved` = side `variantAt` becomes a quadratic Bezier with control point at the side midpoint + outward normal x (2 x sagitta), sagitta = 0.18 x side (≥ 15 %); `round` = corner `variantAt` (or `'all'`) replaced by a tangent arc of radius 0.24 x the shortest side (≥ 20 %; geometry, not linejoin); `chord` = circle with a flat chord of length 0.5 d. Every variant emits `data-lcs-variant` and the gate re-measures the gap, sagitta, fillet radius or chord from the drawn path.
- Output root for standalone use: `svgRoot` sized to the rotated bbox + 2 x (stroke/2 + 1); inside a figure: a bare `<g>` in figure coordinates. Every root stamps `data-ws-content`.
- Ships with `qa/verify-b5-flat-shape.js`: renders every kind x variant x rot in {0, 20, 45, 70}, re-parses the path, recomputes side lengths, angles, gap, sagitta, fillet and asserts them against the spec numbers above (render-measuring, the b4 primitive pattern). Plus `qa/verify-b5-shape-pictures.js`: re-runs the §2 measurements on the rendered figures (box containment, gap ≥ 6, inset ≥ 8, aspect ≥ 1.5 on every rectangle, squares exact, floors, turned/skinny tags) and fails on any drift from the table.

**NEW `templates/components-b5/2d-shapes.js`** (behind `templates/components-b5.js`, a clone of the b4 barrel): `shapePicture({figure, pointed, mode:'rings'|'numbers'})` (figure SVG + ring or numbered-disc points) · `shapeCallout({chips, side})` · `calloutStage({figure, pointed, chipSets})` (base: 660 x 520 stage + leader overlay) · `nameRail({target, figures})` (F1) · `objectChoiceCard({picture, kinds})` + `shapeGlyph(kind, px)` (F2) · `numberedWriteColumn({n, w})` (F3) · `riddleCard({text, chips})` + `mysteryBox(px)` (F4) · `dotLattice({n, pitch, given})` + `dotCard({name, given})` (F5).

## 6 Locale slot structure

| surface | font | size | longest reserve |
|---|---|---|---|
| base chips (3 per callout) | Baloo 2 700 | 18 (d1 20) | fi `suorakulmio` 11 chars; budget 12 chars in 150 px *est.* |
| F1 name tab | Baloo 2 700 | 20 | same 11 chars in 130 px *est.* |
| F2 choice chip (glyph + name) | Baloo 2 700 | 17 | 11 chars + 26 px glyph in 152 px *est.* |
| F3 word bank | Nunito 800 (`wordBank`) | 20 | 4 (5) words, one row, ≤ 639 |
| F3 writing rows | none printed (open lines) | glyphH 32 | 11-letter handwritten word in 287 px *est.* |
| F4 riddle | Nunito 800 | 17 | ≤ 90 chars (validator rule 3) = 3 lines in 234 px |
| F4 chips | Baloo 2 700 | 16 | 3 across in 302 px: fi 136 + 80 + 76 + 16 gaps = 308 *est.*, else wrap to 2 rows |
| F5 name pill | Baloo 2 700 | 22 | 11 chars in 300 px |

- Names display via `displayWord` (lower-case; de keeps `Kreis/Quadrat/Dreieck/Rechteck`). The panel may choose the K literal (fr `rond` vs `cercle`); the chip carries whatever literal the bank holds, one literal per kind per band.
- Nothing on any face agrees with a noun, so no slots: instructions and riddles are whole literals (fi writes its inflected objects out). F2 instruction inlines the two bin names as literals (validator rule 6).
- ⚠ **en verb/noun clash on F2**: "Circle its shape: circle or rectangle" reads badly; en uses "Draw a ring around". de has the same echo (`Kreise ... ein` / `Kreis`); the de panel rules. Other locales use unrelated verbs.
- Font floor: the smallest text on any face is 16 px; the 9 px lint cannot fire.

## 7 Five variation faces (b c d e f)

**b = F1 "2D Shapes: Real or Not?" (G1, CODE `mode:'real-or-not'`).** Visual delta: the picture goes; the page becomes three calm "name rails". Each rail is a `.ws-lane` (inner 639): a `T.tealSoft` name tab 150 x 108 (r 14, Baloo 20, `T.ink` text) then 4 white tiles 108 x 108 (border 2 `T.grid`, r 12), gap 12: 150 + 12 + 4 x 108 + 3 x 12 = 630 ≤ 639. Rail 108 + 24 + 4 = 136; 3 rails + 2 x 18 = 444 ≤ 722 (and 677); rows `minmax(136px, 1fr)`. Figures by `flatShape` at fill white, bbox long side 84..92 in the tile (G1 ≥ 80), truths turned/skinny, near-misses per the pedagogy pools (gap, curved, round, kite; parallelogram/trapezoid/rounded never a square in a rectangle rail; ellipse/gap/chord in a circle rail). d2 rails triangle, rectangle, square; `trueCount` 1..3 per rail. Verify hook: `data-lcs-target` per rail, the gate's own `classify` + variant measurement per tile. Query face: recognise / erkennen / reconocer / reconnaître / herkennen.

**c = F2 "2D Shapes Around Us" (K, CODE `mode:'around-us'`).** Visual delta: real library pictures, 8 cards in a 2 x 4 `cardGrid` (cell 330 x 170 at 722; 330 x 159 at 677, inner 302 x 131). Card: picture box 110 x 110 left (contain), gap 16, then two stacked choice chips 152 x 44, gap 8 (96): chip = `shapeGlyph` (circle d 24, or rectangle 34 x 20, teal 2.5, no fill) + the name, fixed order circle on top, rectangle below (a legend order, not an answer; the split is 4/4 so position carries no information). I replace the pedagogy's "draw a line to one of two bins" with a per-card choice: 8 lines from 8 pictures into 2 bins cross each other and run over pictures at K, the key is unreadable, and a card choice is verified per card. Pictures (o, all nine opened this session; the pedagogy's bank): clock (red-rimmed round wall clock, flat), plate (round, flat), pizza (whole, top view), cookie (round), lollipop (round candy on a stick: the candy is the circle, flag for the panel), door (upright panel door), envelope (rectangle with a flap: the flap's triangle is not offered, only circle/rectangle are), whiteboard (framed rectangle with tray), notebook (slightly tilted, visible thickness: the upright face reads as a rectangle). d2 uses 8 of the 9 (4 circle, 4 rectangle; drop one circle by seed). Verify: `data-lcs-noun` + `data-lcs-answer` from the bank's `shape`. Query face: "found at home / in der Umwelt / en objetos / autour de nous".

**d = F3 "2D Shapes: Write the Names" (G1, CODE `mode:'write-name'`).** Visual delta: the base's shape picture returns (figure `rocket` at d2, so the published pair never shows the same picture), but pointers are teal discs r 14 carrying a white Baloo 16 numeral 1..6 at each ring point, no leader lines, no chips. Top: `wordBank` of the 4 names, shuffled, once each (59 + 10 = 69). Below: figure 300 x 520 left, gap 14, a writing column 325: 6 rows of [teal numeral disc 30][8][`rulingBlock` w 287, h 64, glyphH 32 *est.*], `space-between` over 520 (6 x 64 + 5 x 27). 300 + 14 + 325 = 639; 69 + 520 = 589 ≤ 722 and ≤ 677. Rocket d2 pointed set: planet, nose or flame, body, windowC, windowS, one fin (6 of 8, same §3 constraints). No letter boxes (their count gives away length). Verify: key per numeral = `classify(part)`; bank contains every answer; bank order ≠ answer order. Query face: "write the names / Namen schreiben / escribe el nombre".

**e = F4 "2D Shape Riddles" (G1, CODE `mode:'riddles'`).** Visual delta: no figure at all; a 2 x 3 `cardGrid` of riddle cards (cell 330 x 231 at 722, inner 302 x 203; 216 / 188 at 677). Card: a 36 x 36 coral-dashed "mystery box" with a Baloo 22 teal `?` (the speaker), gap 8, then a speech bubble 258 wide (white, 2 px teal, r 16, a 10 px tail toward the box) holding the riddle literal at Nunito 800 17 (≤ 90 chars = 3 lines = 69 + 16 padding = 85); below it, gap 10, a row of 3 name chips (`.ws-achip`, 16 px, height 44), `flex-wrap` (two rows in the worst case: 85 + 10 + 96 = 191 ≤ 203 at 722; fi fits one row *est.*, 139 ≤ 188 at 677). The `?` box is not a drawing area and the instruction never mentions it. Verify: `data-lcs-riddle=<kind>:<i>`; the answer string never occurs in the riddle (letter-boundary, NFC). Query face: riddles / Rätsel / adivinanzas / devinettes / gåtor.

**f = F5 "Draw 2D Shapes on Dots" (K, CODE `mode:'dot-draw'`, OPEN).** Visual delta: 2 x 2 `cardGrid` (cell 330 x 354; at 677 inner 302 x 303). Card: the name in a `.ws-pill` (Baloo 22, height 44) centred on top, gap 10, a 6 x 6 dot lattice, pitch 44 (5 x 44 = 220 + 2 x 10 pad = 240 square), dots r 4.5 `T.teal`; on `givenSide` cards one side is pre-printed as a 4 px `T.coral` segment between two lattice points on a slant vector (1,2) or (2,1). 44 + 10 + 240 = 294 ≤ 303. d2 kinds square, rectangle, triangle, triangle, 2 given sides (the square and one triangle). Layout gate: the given segment joins two lattice points and a completion exists wholly inside the lattice (square with side (1,2) spans 3 x 3 of 5: fits; rectangle (1,2) x k(2,-1), k = 1: fits). No verify. Query face: "dot paper / Punktefeld / malha pontilhada / puntini".

**Why these five.** Each changes what the child DOES: circle a name from a pointed part (base), decide true vs almost (F1), see the shape in a real thing (F2), produce the word (F3), reason from attributes (F4), produce the shape (F5). Two faces share my shape-picture apparatus (base, F3) so the family has one recognisable look; the other three use the house grid where a grid is the right tool. Pairwise, the resolved d2 configs differ in `mode` and in their apparatus, so `tools/gate-variation-distinct.js` passes by construction. **First to cut: F5** (open, no verify, and the nearest to dot-to-dot/grid-copy on a hub page); second F4 (text-heavy, the riddle literals are the most panel work).

**Hub visibility contract.** Every face appears under `2d-shapes` on `/[locale]/worksheets` iff `apps['2d-shapes']` exists in `topics-taxonomy.json` (subject `math`), `axes['exercise-type']['2d-shapes']` has `slug` + `name` in all 11 locales (a compound head, never the theme word `shapes` nor the geometry name), exactly one landing per face per locale with `coordinate.type === '2d-shapes'`, `coordinate.mode` = the face's mode string (`'base'` for the base), a band level key, `theme:''`, a unique slug and `canonicalDeckSlug` = the published deck, and the landing JSON is committed AND deployed. Gate: `scripts/verify-hub-type-rows.js` expects 6 rows per locale (no refusal recorded at design time; 66/66).

## 8 Two alternatives + recommendation

**Alt 1: the obvious grid (the pedagogy's base).** 2 x 3 cards, one exact turned figure per card, 3 stacked chips under it. Buildable, safe, what every competitor ships. Loses on: six equal boxes (no focal point), size variety has to be faked by scaling inside cards of equal size, the page looks like K-075 Count the Sides (same 2 x 3 cards with one shape each, looked at) and K-078 Twins on the hub. Kept as the fallback if a critic or panel finds the composite context too leading.

**Alt 2: the clothesline.** Three curved teal lines with pegs, 2-3 shape cards hanging on each, each card swinging at a different angle (rotation motivated by the metaphor), chips below. Charming, but the pegs and ropes are decoration without a job, the swinging turns every shape (including the "easy" ones) so the page loses its prototypical anchors, and the ropes eat 90 px of height. Rejected.

**Recommendation: the shape picture.** One apparatus, native size and orientation variety, measured geometry, and a family look (base + F3) that no other type on the site has. The risk that a picture primes the answer ("roofs are triangles") is handled by WHICH parts are pointed: the d2 robot never points a prototypical triangle (its triangles are lying right triangles), always points the 45-degree square and a 30-degree skinny arm.

## 9 Risks, mitigations, print check

- **Context priming / prototypes.** The house (roof, walls) is the most prototypical picture in shape teaching, so it is d1 only; d2 is the robot, d3 the rocket (downward flame, swept fins). A figure is added only with a looked-at render and a re-run of `verify-b5-shape-pictures.js`.
- **Pointer ambiguity with inset parts** (dial and button sit inside the body): the ring point excludes inset parts with a 12 px margin; the gate asserts the ring centre lies inside the target and outside its insets; a human reads the render for "which part is this ring on".
- **Leader tangles**: sorted-by-y assignment + segment-intersection gate + re-selection among the 6 valid sets; a human looks at the 20-seed contact sheet.
- **Long locales**: every chip and tab width above is *est.* at Baloo 700; the engineer measures fi `suorakulmio`, pt `retângulo`, sv `rektangel`, es `rectángulo` in `render/one.js` (file:// fonts) and, if a chip overflows 150, drops that locale to 17 px (never below 16) before touching the layout.
- **Greyscale print**: teal 3 px outlines and leader lines print near-black; cream fills print as a pale grey on white, so the figure still reads as separate shapes; coral rings print mid-grey and are distinguished by being rings on a line end, not by hue; F5's coral given side prints grey, 4 px, heavier than the dots; F2 pictures lose colour but keep outline (clock, plate, door checked for outline at 110 px (o)).
- **Pencil space**: a ring round a 36 px chip needs ~8 px around it: chips gap 6 + box padding 8 (base); F3 writing rows 287 wide; F5 dots at pitch 44 (a K pencil line).
- **Cut lines**: none; nothing on any face is cut.
- **9 px floor**: smallest text 16 px; nothing near it.
- **What the lints catch**: overflow, footer intrusion, font floor, palette (`codeColors` are not used anywhere; only tokens). **What only the family gate catches**: floors, geometry drift, chip uniqueness, slot spread. **What only a human eye catches**: whether a 30-degree arm reads as "a rectangle" to a six-year-old, whether the lollipop reads as a circle, whether the rocket fins read as triangles at print size; the engineer prints the d2 robot at 100 % on a mono laser before the wave.

## 10 Summary

1. Base = one "shape picture" (robot at d2) built from exact flat shapes, 6 coral-ringed parts, 3 name chips per callout: one focal apparatus instead of a grid.
2. Geometry of the three figures (robot, rocket, house) is authored as data and measured: gaps ≥ 6, insets ≥ 8, rectangles ≥ 1.5 aspect, 6 valid d2 selections.
3. NEW `primitives/flat-shape.js` (kinds + near-miss variants with numbers) and `components-b5/2d-shapes.js`; both ship render-measuring verifies.
4. Faces: F1 name rails with near-misses, F2 8 opened objects with a per-card circle/rectangle choice, F3 the picture again with numbered writing rows, F4 riddle bubbles, F5 dot lattices with slanted given sides.
5. Open for the engineer: every chip width in fi/pt, F3 glyphH 32 row width, print legibility of the turned arms and rings.
