# K-368 `2d-shapes`: DESIGN A (designer A, 2026-09-23)

Read: `_ROLE-DESIGN.md`, `_STUDIO-BRIEF.md`, `_SUBSTRATE.md`, `_PANEL-FINDINGS.md` (row 1 + "2d-shapes owns only"), the `2d-shapes` sections of `_work/_selection-{pedagogy,seo-germanic,seo-romance,seo-nordic}.md`, `_work/K-368-pedagogy.md` (the content plan; its faces are designed here, three of its numbers are corrected in §9), `lib/shape-data.js` (42 lines: SHAPES_2D side/corner facts only, NO geometry, so every coordinate below is new), `primitives/_tokens.js`, `page/page.css:119-162,234-260,400-430`, `templates/components-b2.js` (`pillChoice`, `rulingBlock`, `wordBank`), `templates/layouts/card-grid.js`, `primitives/trace-path.js writingRow`, `../b4-designs/K-353-tangram.md` §1-2 (ASCII convention). LOOKED at: `out/b4-sweep/en/K-353`, `K-359`, `G1-351`, `out/batchS/K-070`, `K-075` (the geometry neighbours this page must not resemble). OPENED (Read tool, this session): `classroom/clock`, `around the house/plate`, `At the Supermarket/pizza`, `bakery/cookie`, `desserts and sweets/lollipop`, `around the house/door`, `post office/envelope`, `classroom/whiteboard`, `classroom/notebook`, `classroom/tablet`, `classroom/folder`, `toys/domino`. *est.* = the engineer measures in a real render (`render/one.js`, shell woff2 from `file://`). No em-dashes.

## Boundary

This family is the shape NAME and nothing else a neighbour already owns. It never asks the child to count sides or corners (K-075, G2-246), sort by sides (K-076, G2-241), find shapes like a model (K-070 "Shape Hunt"), match shape to shape (K-078), pick the odd shape (K-080), compare size (K-079), continue a pattern (K-077), colour by a shape code (K-265), tell flat from solid or name solids (G2-243/244), partition (G2-234), compose with tans or count tans inside a figure (tangram K-353/K-358/K-359/G1-354/G1-355/G2-347), or line-match library shape art to its word (`matching` name x theme `shapes`). It owns: shape to name, name to shape against near-misses, the flat shape inside a real object, riddle to name, writing the name, drawing the named shape on dots. **Visual signature: every figure is an exact outline (3 px teal, NO fill) drawn by the new `primitives/flat-shape.js`, centred in a round white "lens" that gives the eye no horizontal or vertical axis**, so a turned square is judged on its own sides and not against a rectangular frame; names live in white pills the child circles, GIVEN names live in teal pills the child only reads. The geometry pages this family must not resemble (K-075, K-070) use filled pastel library art on square cards; ours is outline-on-lens, and that difference is visible from across the room.

## 1 Page concept (base K-368 "Name the Shape")

**One idea from across the room: six round lenses, each holding one exact shape, each with three name tags beside it; the child circles one tag per lens.** The lens is the design's thesis. Mach's square/diamond effect is a reference-frame effect: a square inside a square card edge reads as a "diamond" because the frame supplies the axis. A white disc supplies none, so K.G.A.2's "regardless of orientation" is honoured by the page itself, not just by the rotation parameter. Horizontal cards (lens left, tags right) instead of the pedagogy's figure-over-stacked-chips give (a) a 156 px lens instead of ~120, (b) a 132 px tag column where the longest name in 11 locales (fi "suorakulmio", 11 letters) never wraps, (c) a left-to-right reading order (look, then read) that matches the instruction. Top quality comes from: one apparatus type repeated six times, no pictures, no colour except teal, ~45 % whitespace inside each card, and a pencil task (circle a 40 px tag) a K hand can do without touching the neighbour.

## 2 Layout (d2, 722 body)

Chrome worst case (3-line title + 3-line instruction) = 722; one-line chrome 814; fi 4-line title 677. Body = `cardGrid({cols:2, rows:3})`, grid rows `minmax(216px, 1fr)` (slack widens rows; card content is vertically centred, so slack becomes air above and below the lens).

```
.ws-body 675 x 722
+------------ card 330.5 x 231.3 ------------+ 14 +------------ card ------------+
|[1]                                          |    |[2]                            |
|   ,-----------.                             |    |                               |
|  /   lens     \   14   +-- tag 132x40 --+   |    |   (same)                      |
| |  white disc  |       | circle          |  |    |                               |
| |   d 156      |       +-----------------+  |    |                               |
| |  flat-shape  |        14                  |    |                               |
| |  R 44..69    |       +-----------------+  |    |                               |
|  \  no fill   /        | square          |  |    |                               |
|   `-----------'         14                  |    |                               |
|                        +-----------------+   |    |                               |
|                        | rectangle       |   |    |                               |
+---------------------------------------------+    +-------------------------------+
  14 gap
[3] [4]  (same card)
  14 gap
[5] [6]  (same card)
```

Arithmetic (all px):
- Columns: (675 - 14) / 2 = 330.5 per card. Card inner width = 330.5 - 2x2 border - 2x12 padding = 302.5. Lens 156 + gap 14 + tag column 132 = 302 <= 302.5.
- Rows at 722: (722 - 2x14) / 3 = 231.3 per card; inner 231.3 - 28 = 203.3. Lens 156 <= 203; tag stack 3x40 + 2x14 = 148 <= 203.
- Rows at 677 (fi 4-line title): (677 - 28) / 3 = 216.3; inner 188.3 >= 156 and >= 148. At 814: inner 234 (slack only).
- Badge 30x30 at the card corner; lens top = 12 + (203 - 156)/2 = 35.5 > 30, lens left 12: the disc's own curve keeps the badge corner empty. No overlap by construction.
- Figure: `flatShape` R (circumradius) in [44, 69]; SVG box 2(R+3) <= 144, lens disc radius 78, so the drawn figure clears the lens edge by >= 6 px at every rotation (the SVG box is rotation-invariant, §5).
- Tag: `.s2d-tag` 132 x 40, white, 2 px teal border, radius 999, Baloo 2 700 **18 px** (K `fontLabel`), text centred, padding 0 8. Longest name check (*est.*, gate measures `scrollWidth <= clientWidth`): fi "suorakulmio" 11 x ~9.4 = 104 + 16 = 120 <= 132; es "rectángulo" 10; sv "rektangel" 9; de "Rechteck" 8. At d3 "kuusikulmio" 11 and sv "sexhörning" 10 (*est.* same bound).
- Widths not measured in a real render: tag text widths (*est.*), lens clearance of a 2.6-aspect rectangle at R 69 (computed, not rendered).

## 3 Ladder (base)

| key | d1 | d2 (ships) | d3 |
|---|---|---|---|
| `cards` / grid | 4 / 2x2 | 6 / 2x3 | 6 / 2x3 |
| `lens` (disc diameter) | 188 | 156 | 156 |
| `R` range | [52, 82] | [44, 69] | [44, 69] |
| `kinds` | circle square triangle rectangle | same (core 4) | core 4 + `hexagon` iff `inventory.hexagon` |
| `tags` per card | 2 | 3 | 3 |
| `turned` (true figures rotated 15..75 deg, circle excluded) | 1 | 3 | 4 |
| `turnedSquare` (a square at exactly 45 deg) | 0 | 1 | 1 |
| `skinny` (triangle shortest/longest <= 0.35, or rectangle aspect >= 2.2) | 0 | 1 | 2 |
| `sizeSpread` (area ratio largest/smallest true figure) | >= 1.8 | >= 2.0 | >= 2.0 |
| tag font | 20 | 18 | 18 |

d2 card recipe (seeded, locale-neutral; the same six figures in 11 locales): slot A circle; slot B square at rot 45; slot C triangle `skinny` at rot in [15,75]; slot D rectangle aspect [2.2,2.6] at rot in [15,40] (or its mirror); slots E F = two repeats drawn from {triangle (right or obtuse), square (rot 0..12), rectangle (aspect [1.5,2.0], rot 0 or 90)} with no kind repeated three times; `rng.shuffle` the six into the grid; then force one card to R <= 48 and one to R >= 66 (sizeSpread). d1 and d3 are harder/easier pages of the SAME move and are not faces (§7 doctrine 2).

## 4 Answer-hiding + uniqueness

- The name is never adjacent to its figure alone: every card prints `tags` names, exactly one of which equals `classify(verts)`. Tag sets: answer + 2 distinct distractors from the core set; **a square card never offers `rectangle`** (a square IS a rectangle from G2/Kl 3 on; two right answers otherwise); a rectangle card may offer `square` (wrong, correctly).
- Answer slot (0/1/2) is shuffled per card; the gate asserts across the page that the answer occupies >= 2 different slots, and across 20 seeds that no slot holds > 60 % (measured on the SHIPPED seed too, the nt10-D staircase lesson).
- No fill, identical stroke, identical lens for every figure: nothing but the geometry distinguishes one kind from another (a filled triangle next to an outline "open triangle" would leak on F1; the base uses the same drawing rule so the family reads as one).
- The child circles one tag per lens. Visibly wrong to the teacher: a ring around "rectangle" beside an exact 45 deg square (or around "triangle" beside a 4-sided figure) is readable at arm's length because every figure is exact and big. The printable ships no answer key (nt10-D ruling); the exactness is the key.

## 5 Primitives / components

**Reused (exact names + file).** `cardGrid({cards, cols, rows, numbered})` (`templates/layouts/card-grid.js`) · `.ws-card` / `.ws-card-badge` / `.ws-lane` / `.ws-card-stage` (`page/page.css`) · `rulingBlock({rows, w, h, glyphH})` (`templates/components-b2.js`, F3) · `wordBank({words, wordPx})` (`components-b2.js`, F3) · `svgRoot el circle` (`primitives/_svg.js`) · tokens `color stroke density font` (`primitives/_tokens.js`) · `lib/b3-picture-index.js pictureFor/hasPicture` (F2, throws on a missing picture) · `lib/b2-common.js displayWord` (lower-case display, de keeps case) · `rng.shuffle/sample/int`.

**NOT used.** `pillChoice` (its `.ws-pill` has 24 px side padding; three pills of 11 letters overflow 132; our `.s2d-tag` is a fixed-width sibling) · `answerBox`/`blankNumeralBox` (no numerals on any face) · `iconRows`/`sceneStage` (no scenes) · library `shapes/*` art (prototypical, `shapes/diamond` is a gem-like 45 deg square named "rhombus" in 10 of 11 locales; it is K-078/matching territory) · `tangram.js` (composition) · `dot-figure.js` / `sym-grid.js` / `grid-copy.js` (their lattices are copy/symmetry apparatus with counting labels; F5 needs a bare lattice with one pre-printed segment, 30 lines of new code, §7f) · `colorLegend` (prints colour words).

**NEW `primitives/flat-shape.js`** (pure SVG on tokens, Node-testable, no DOM).

`flatShape({kind, sub, variant='none', vside=0, rot=0, flip=false, aspect=1, R, pad=3, sw=3, lens=0})` returns `{svg, box, verts, meta}`.

Construction (one rule for every kind):
1. Take the unit polygon below (x right, y down), `flip` mirrors x.
2. Translate so its bbox centre is the origin; scale so the largest vertex distance from the origin = 1 (the unit circumradius).
3. Rotate by `rot` degrees clockwise about the origin, scale by `R`.
4. Translate to the box centre `(R+pad+lens, R+pad+lens)`. **Box = square of side 2(R+pad+lens), independent of `rot`** (layout never depends on rotation; a figure can never touch its neighbour or overflow when rotated).
5. Apply `variant` to side `vside` (sides indexed from vertex 0).
6. Emit `<path>` with `fill="none" stroke=T.teal stroke-width=sw stroke-linejoin="round" stroke-linecap="round"`; if `lens>0` a `<circle r=R+pad+lens fill=T.white>` is emitted FIRST (under the path). No text, no fill on any figure.

Unit polygons (vertex lists before step 2):

| kind / sub | vertices | notes |
|---|---|---|
| `square` | (-1,-1) (1,-1) (1,1) (-1,1) | true square |
| `rectangle` aspect a | (-a,-1) (a,-1) (a,1) (-a,1) | a in [1.5, 3.0]; **a < 1.5 is refused** (no near-square rectangle ever reaches a K/G1 page); skinny = a >= 2.2 |
| `triangle` equilateral | (0,-1) (0.866,0.5) (-0.866,0.5) | |
| `triangle` right | (0,0) (0,1.4) (2,1.4) | legs 2 : 1.4, not isosceles |
| `triangle` obtuse | (0,0) (2,0) (2.9,1) | angle at (2,0) = 132 deg |
| `triangle` scalene | (0,0) (2,0) (0.6,1.3) | |
| `triangle` skinny | (0,0) (2.6,0) (0.45,0.75) | shortest/longest = 0.337; min angle 19.2 deg |
| `hexagon` regular | (cos 60k, sin 60k), k=0..5 | d3 only |
| `circle` | drawn as `<circle>`; `verts` = 64 samples | |
| near-miss `rhombus` 60 | (0,0) (2,0) (3,1.732) (1,1.732) | square row only |
| near-miss `parallelogram` 70 | (0,0) (2.4,0) (3.084,1.879) (0.684,1.879) | rectangle row only |
| near-miss `trapezoid` | (0,0) (3,0) (2.3,1.3) (0.7,1.3) | rectangle row only |
| near-miss `kite` (4-sided "triangle") | (0,-1.2) (0.8,0) (0,1.6) (-0.8,0) | triangle row only |
| near-miss `ellipse` | rx a, ry 1, a in [1.4, 1.8] | circle row only |
| near-miss `chord` | unit circle cut by the chord y = 0.75 | chord = 66 % of the diameter, sagitta 0.25R (the pedagogy's "chord >= 25 % of diameter" has a 3 % sagitta = 2 px at R 60, invisible; corrected) |

Variants (applied to side `vside`; every one leaves the vertex list stamped unchanged so the gate knows what was modified):
- `gap`: remove the middle of the side, length g = clamp(max(14/Lpx, 0.16), 0.16, 0.30) of the side. Path starts at the far gap end and ends at the near one. With round caps the **visible** gap = g·L - sw >= 10 px. Circle gap = a 30 deg missing arc (visible chord >= 20 px at R 44).
- `curved`: side replaced by a quadratic Bezier with control point = midpoint + 0.40·L·n (n = outward normal): sagitta = 0.20·L (>= 15 % of the side, clearly a bulge, never a wobble).
- `round`: EVERY corner filleted, radius r = 0.25 x shortest side; trim t = r / tan(theta/2) per corner, asserted t <= 0.45 x each adjacent side (refuse otherwise). Only near-misses carry `round`; true figures use `stroke-linejoin:round` whose radius is sw/2 = 1.5 px (the gate's fillet threshold is >= 20 % of the shortest side, so a linejoin never classifies as a rounded corner).

Stamps on the `<svg>` root: `data-lcs-prim="flat-shape"`, `data-lcs-verts="x,y;x,y;…"` (px, 1 dp, viewBox coords after step 4), `data-lcs-variant`, `data-lcs-vside`, `data-lcs-rot`, `data-lcs-R`, `data-lcs-kind` (DEBUG ONLY: the gate is forbidden to read it; poison = swap two `data-lcs-kind` stamps and the gate must stay green). The card stage carries `data-ws-content`.

Minimum sizes: K long side of the bbox >= 80, short >= 30; G1 long >= 45 (>= 44 `density.G1.minElement`), short >= 30; near-misses are never drawn at R < 44 (a gap or fillet must be readable, so "small" is reserved for TRUE examples: "a small square is still a square").

`qa/verify-b5-flat-shape.js` (NEW, measures the RENDER, the tangram/body-figure precedent): renders one sheet of every kind x sub x variant x 8 rotations x R {32, 44, 69}; re-parses each `path d` (not `meta`); recomputes side count, side ratios (+-1 %), right angles (+-1 deg), visible gap (>= 10 px after caps), sagitta (>= 15 % of side), fillet radius (>= 20 % of shortest side), ellipse aspect (>= 1.4), chord sagitta (>= 0.2R); asserts the bbox fits `box` minus 1 px at every rotation; asserts palette tokens only. Poison: a `gap` at 0.10, a `curved` at 0.05, a `rectangle` at aspect 1.2, a `round` at 0.1 must each FAIL.

**NEW `templates/components-b5/2d-shapes.js`** (behind a `templates/components-b5.js` barrel cloned from the b3/b4 barrels):
- `nameTag({key, label, w=132, h=40, px=18})` → `<span class="s2d-tag" data-lcs-tag="<kind>">` (white, 2 px teal, radius 999, Baloo 700, fixed width; inline style only, no page.css edit).
- `givenPill({key, label, px=20})` → teal-filled pill, white Baloo 700 text, `data-lcs-given="<kind>"` (F1 row head, F5 card head: a name to READ, visibly not a thing to circle).
- `lensFigure({shape, lensD})` → wraps `flatShape(... lens)` in a stage div.
- `nameCard({shape, tags})` (base), `realRow({target, figures})` (F1), `objectCard({pic, choices})` + `shapeChoice({kind, label})` (F2), `writeLane({shape, rowW, rowH, glyphH})` (F3), `riddleCard({text, tags})` + `bubble({text})` (F4), `dotCard({target, lattice, given})` + `dotLattice({n=6, pitch=46, given})` (F5).

## 6 Locale slot structure

| surface | font | size | reserve |
|---|---|---|---|
| name tag (base, F4) | Baloo 2 700 | 18 K / 16 G1 floor (18 used on F4 too) | fixed width 132; the 11 locales' 5 names are a closed list, so the reserve is the measured longest name, not +40 %; gate: `scrollWidth <= clientWidth` for every name in every locale; a panel literal that overflows is sent back (never shrunk, never truncated) |
| given pill (F1, F5) | Baloo 2 700 white on teal | 20 | auto width <= 300 |
| shape choice (F2) | Baloo 2 700 | 18 | 160 x 46 incl. glyph 36; name <= 100 px *est.* |
| word bank (F3) | Nunito 800 (`wordBank`) | 17 | one line: 5 names x ~110 incl. padding + gaps = ~560 <= 639 *est.* (fi) |
| riddle (F4) | Nunito 800, ink, line-height 20 | 16 | bubble text width 278: ~39 chars/line *est.* at 16 px; reserve 4 lines = 110 chars (validator caps 90; +22 % headroom for de/fi/pt) |
| instruction / title | shell | shell | brief limits (<= 150 / <= 70); F2 must inline both names |

Case: names from the b5 bank via `displayWord` (lower-case; de keeps the capital: "Quadrat"). fi riddles are written whole by the panel ("Minulla on kolme sivua ja kolme kulmaa. Mikä olen?"), no token is inserted into a sentence anywhere on any face. No slot inflects anything. Floors: nothing under 16 px on the body; the only 9-15 px text on the page is shell chrome.

## 7 Five variation faces (b c d e f)

Hub contract (restated): `apps['2d-shapes']` + `axes['exercise-type']['2d-shapes']` (slug + name x11, compound head, never the theme word Formen/Formas/Former/Muodot, never the `geometry` name) must be registered; one landing per face per locale with `coordinate.type === '2d-shapes'`, `coordinate.mode` = the face mode string (`'base'` for K-368), `coordinate.theme:''`, level key from the band table, `canonicalDeckSlug` = the published deck; committed AND deployed. `scripts/verify-hub-type-rows.js` (reading `b5-designs/hub-expectations.json`) expects **6 rows x 11 locales = 66**, no refusals at design time.

**b. F1 "Real or Not?" (G1, `G1-381+ TBD by the emitter`, CODE `mode:'real-or-not'`). Delta: three horizontal lanes instead of a card grid; each lane opens with a TEAL given-pill (the target name) and holds four lenses of 132 px; the child circles every lens whose figure truly is that shape.** Layout: `.ws-lane` x3 at default padding (inner 639): pill 40 + gap 8 + lens row 132 = 180 inner; lane 180 + 24 padding + 4 border = 208; 3 x 208 + 2 x 12 = 648 <= 722 (slack 74), <= 677 (slack 29). Lens row: 4 x 132 + 3 x 37 = 639. R in [33, 60] (true), [44, 60] (near-miss); area spread >= 3.0 across true examples. d2 rows `['triangle','rectangle','square']`, `trueCount` per row in 1..3, rows not all equal. Near-miss pools exactly as §5 table + variants (triangle: gap, curved, round, kite; rectangle: parallelogram, trapezoid, round, gap, **never a square**; square: rectangle aspect >= 1.5, rhombus, gap, round). Verify hook: row stamps `data-lcs-target`; answer set = lenses where the gate's own `classify(parsed path)` === target; assert trueCount in [1,3], >= 2 true figures turned 15..75 deg on the page, rectangle row contains no square by classify, every near-miss measurable per §5. Query face: "recognise" (erkennen / reconocer / reconhecer / reconnaître / riconoscere / herkennen / känna igen / genkend / kjenne igjen / tunnista).

**c. F2 "Shapes Around Us" (K, `K-371+ TBD`, CODE `mode:'around-us'`). Delta: library PICTURES replace figures (the only face with pictures); each card = one object at 110 px on the left, and on the right two stacked shape choices, each a drawn prototypical glyph (circle d 36 / rectangle 54 x 32, `flatShape` rot 0, sw 2.5) above nothing but beside its name; the child COLOURS the glyph of the shape the thing has.** Why colour, not circle: in English "circle the circle" puts the verb and the answer on the same word, and the base already owns the circle-a-tag routine; colouring the glyph is a second pencil move, greyscale-safe (graphite on white), and each glyph is 36-54 px (K floor 56 is met by the choice tile, 160 x 46). Choice order is FIXED (circle above rectangle, like a legend), which leaks nothing because both appear on every card. Layout: `cardGrid` 2 x 4; card (675-14)/2 = 330.5 wide, (722 - 3 x 14)/4 = 170 tall, inner 302.5 x 142; picture 110 + 20 + choice column 160 = 290; choices 2 x 46 + 10 = 102 <= 142; at 677: inner 130.8 >= 110. Object bank (OPENED; rectangle list changed from the pedagogy): **circle** `classroom/clock`, `around the house/plate`, `At the Supermarket/pizza`, `bakery/cookie`, `desserts and sweets/lollipop` (round candy on a stick; kept, the candy face is a clean disc); **rectangle** `around the house/door` (framed upright door), `post office/envelope` (landscape, sharp corners), `classroom/whiteboard` (framed, tray below), `classroom/tablet` (landscape, turned ~4 deg, small corner radius ~6 % of the short side: a real, slightly turned rectangle). **Dropped `classroom/notebook`**: its page corner is visibly rounded and the book is 3D, and F1 teaches that a round-cornered quadrilateral is NOT a rectangle; one family must not say both. Also opened and rejected: `classroom/folder` (tab + trapezoid front), `toys/domino` (two tiles = "how many"). d2 = 4 circles (sample of 5) + all 4 rectangles, shuffled. Verify hook: picture stamps `data-lcs-noun` + `data-lcs-answer` from the bank's own `shape` field; assert split 4/4, every noun `picOpened:true`, no noun twice, choices exactly {circle, rectangle}. en instruction proposal: "Look at each thing. Colour its shape: the circle or the rectangle." (66 chars). Query face: "around us / found at home / in der Umwelt / en objetos / no dia a dia / autour de nous / intorno a noi / om je heen / i vardagen / omkring os / rundt oss / ympärillämme".

**d. F3 "Write the Names" (G1, `G1-382+ TBD`, CODE `mode:'write-name'`). Delta: full-width writing lanes instead of cards; a word bank on top; each lane = a 78 px lens on the left + one ruled writing row of ~550 px.** Why lanes: a 6-8-year-old writes "suorakulmio" at ~8 mm x-height in 290-420 px; a 2-column card gives 278, a lane gives 550. Layout: `wordBank` 59 + margin 10 = 69; 6 lanes with inline `padding:6px 12px` (stated override: inner width 675 - 4 - 24 = 647); lane height (722 - 69 - 5 x 8)/6 = 102.2, inner 86.2; at 677: 94.7, inner 78.7 → **lens 78 fixed** (R in [32, 36], G1 long side >= 45); `rulingBlock({rows:1, w:547, h:78, glyphH:32})` (647 - 78 - 22 gap). NO letter boxes (their count gives the length away). Bank = each d2 answer name ONCE (4 or 5 names), shuffled, order asserted != answer order. d2 = 6 lanes, kinds core 4, `turned:2`, `skinny:1` (aspect 2.0 max here so the short side stays >= 31 at R 35). Verify hook: lane stamps verts; key = classify; assert every answer is in the bank, no name printed in a lane, ruling row `data-lcs-ruling-row` present per lane, `verify-ruling-starters.js` finds no starter (none printed). Query face: "write the names" (Namen schreiben / escribe el nombre / escreva o nome / écrire le nom / scrivi il nome / namen schrijven / skriv namnet / skriv navnet / kirjoita nimi).

**e. F4 "Shape Riddles" (G1, `G1-383+ TBD`, CODE `mode:'riddles'`). Delta: NO drawing at all; each card holds a tealSoft speech bubble (the riddle, whole-sentence panel literal) with a coral "?" disc on its top-right corner, and three name tags under it.** Layout: `cardGrid` 2 x 3 (same grid as the base, so base and F4 read as siblings: shape-then-name vs clue-then-name); bubble 302 wide, radius 14, fill `T.tealSoft`, padding 12, text width 278, tail 12 px down-left; reserve 4 lines x 20 + 24 = 104 (en uses 2-3 lines); tags wrap 2 + 1 at 132 x 36, 2 x 36 + 8 = 80; 104 + 8 + 80 = 192 <= 203 (722); at 677 inner 188.3: holds with 3-line riddles (84 + 8 + 80 = 172); a 4-line riddle at 677 = 192 > 188: the validator caps riddles at 90 chars so 4 lines occur only if a locale's 90 chars exceed 3 x 39 = 117, which cannot happen; recorded as the margin. "?" disc: coral circle d 30, white Baloo "?" 20 px (the glyph is locale-neutral; es wraps nothing). Verify hook: card stamps `data-lcs-riddle="<kind>:<i>"`; answer = kind; assert the answer name (NFC, case-fold, `(?<!\p{L})…(?!\p{L})` plus the panel's listed inflections, sv "kvadraten") is absent from the riddle; exactly one tag = kind; square/rectangle tag rule as base; slot spread as base. Query face: "riddles" (Rätsel / adivinanzas / adivinhas / devinettes / indovinelli / raadsels / gåtor / gåder / gåter / arvoitukset).

**f. F5 "Draw on Dots" (K, `K-372+ TBD`, CODE `mode:'dot-draw'`, OPEN, no verify). Delta: the child draws; each card = a teal given-pill + a bare 6 x 6 dot lattice; two cards carry one pre-printed side on a SLANT, so the child finishes a turned shape by hand.** Layout: `cardGrid` 2 x 2; card inner 302.5 x 326 (722) / 303 (677); pill 40 + 12 + lattice (5 x 46 + 2 x 6 margin = 242) = 294 <= 303; lattice 242 <= 302. Dots `T.teal` r 3.5. Given side: `T.coral` 5 px, round caps, coral end dots r 6 (thicker than any lattice mark, so it survives greyscale as "the thick line"). **d2 recipe (a correction of the pedagogy's kinds list, which printed two identical free triangles):** card 1 triangle (free), card 2 square (free), card 3 square with given side vector (1,2), card 4 rectangle with given side vector (2,4) = its LONG side. Proof the rectangle card cannot be completed as a square: the perpendicular that closes a square on (2,4) is (-4,2), whose vertex x-range is 6 intervals > 5 available; the only fitting completion is (-2,1) x 1, a 2 : 1 rectangle. The square card's completion (-2,1) spans 3 x 3 intervals and fits. Layout gate: every given segment joins two lattice points; for each given card at least one completion (either side) lies wholly inside the lattice, and for the rectangle card NO square completion does. en instruction proposal: "Read the shape name. Join the dots to draw it. Where a thick line is there, start from it." (95 chars). Query face: "draw on dot paper" (zeichnen im Punktefeld / dibuja en puntos / malha pontilhada / tracer sur les points / disegna sui puntini / tekenen op stippen / rita på prickar / tegn på prikker / piirrä pisteisiin).

**Why these five:** each changes what the child DOES (circle a tag / circle true figures / colour a glyph for a real object / write a word / reason from a clue / draw) and each owns one query element the base does not (recognise, around us, write, riddles, dots), all six PARAM-distinct at d2 by construction (different mode, layout, component set). **First to cut:** F4 riddles. It is the only face with zero drawing, its reading load pushes K-2 readers, and its head ("adivinanzas", "Rätsel") is the thinnest in the Nordic tails; the other four each carry a different pencil move.

## 8 Two alternatives + recommendation

1. **The pedagogy layout: figure above a vertical stack of chips in a 3 x 2 grid.** Rejected: 205 px cards force ~120 px figures and 180 px chips stacked under a figure whose card edge is an axis frame (the square/diamond effect the page exists to defeat); fi/pt names crowd a 205 px column; and a figure-above-tags card looks like K-075's cards from across the room.
2. **"Name gallery": six figures down the left, six names down the right, draw a line to match.** Rejected: it is the `matching` name x `shapes` mechanic already live in 11 locales; one-to-one matching lets the last pair be solved by elimination (the answer for item 6 is printed by the other five); six crossing lines are ungradable at K.

**Recommendation: the lens + tag design.** It is the only one of the three that encodes the standard in the apparatus (orientation-free frame), holds the longest name in 11 locales without wrapping, and gives every family face one shared visual grammar (outline on lens, white = circle it, teal = read it) so six landings read as one family, not six products.

## 9 Risks, mitigations, print check

- **Pedagogy numbers corrected (critic, please rule):** (1) "sizes vary >= 1.8x" and "K figure long side 104-128" cannot both hold (128/104 = 1.23); measured instead as AREA ratio >= 2.0 with R in [44, 69] (radius 1.57, area 2.46). (2) "chord >= 25 % of diameter" gives an invisible 3 % sagitta; set to 66 % chord / 0.25R sagitta. (3) F5 d2 kinds listed two free triangles; replaced by the progression free triangle / free square / slanted square / slanted rectangle. (4) F2 "draw a line to its shape" replaced by "colour its shape" (the en "circle the circle" collision; 8 lines into 2 bins is ungradable). (5) `classroom/notebook` swapped for `classroom/tablet` (rounded page corner contradicts F1).
- **Overflow, long locales:** tag width is fixed and every name is a known literal: the gate measures all 11 x 5 names, so overflow is caught at build, not in print. Riddles capped at 90 chars (validator) with a 4-line reserve. F2 instruction must hold two names (fi "ympyrä tai suorakulmio"): <= 150 is ample.
- **Greyscale:** every figure is teal 3 px on white/cream, prints near-black; the only coral on the body is the F5 given side (thicker, so it reads by weight) and the F4 "?" disc (decorative). The white lens on cream prints as almost nothing, which is fine: it is a spacing device, not information. No colour carries an answer anywhere.
- **Pencil space:** tag 132 x 40 with 14 px gaps (a K ring fits); F1 lens 132 with 37 px gaps; F2 glyph 36-54 for colouring; F3 row 547 x 78 at glyphH 32; F5 lattice pitch 46 (12 mm).
- **Cut lines:** none on any face.
- **9 px floor:** body text >= 16 px everywhere.
- **What the lints catch:** overflow, palette, font floor, blank page (`data-ws-content` on every stage). **What only the family gate catches:** classify-by-geometry answers, slot spread, square/rectangle rule, near-miss measurability, area spread, tag text fit, F5 completion existence. **What only a human eye catches:** whether a teacher in each locale accepts the 45 deg square as "square" at K without a rhombus dispute (if a panel says no, the turned-square slot becomes d3-only for that locale: a data flag), whether the 30 deg circle gap reads as "open" at print size, and whether the lollipop reads as a circle to a five-year-old.

## 10 Summary

1. Signature: exact outline shapes (new `primitives/flat-shape.js`, rotation-invariant box, measured-render verify) on an axis-free white lens; white tags are circled, teal pills are read.
2. Base K: 2 x 3 horizontal cards, lens 156 + three 132 px name tags; d2 = 6 figures, 3 turned incl. a 45 deg square, 1 skinny, area spread >= 2.
3. Faces: F1 G1 real-or-not lanes (4 lenses per named row, near-misses by gap/curve/fillet/kite/rhombus) · F2 K real objects (8 opened pictures, colour the circle or rectangle glyph) · F3 G1 write-name lanes (bank + 547 px ruling) · F4 G1 riddles (bubble + tags, no drawing) · F5 K dots (6 x 6 lattice, slanted given sides that make a square completion impossible on the rectangle card).
4. Every closed answer is re-derived from the parsed path by the gate's own classifier; `data-lcs-kind` is debug-only and poison-tested.
5. Five pedagogy numbers corrected in §9 for the critic; 66/66 faces, no refusals at design time; first to cut F4.
