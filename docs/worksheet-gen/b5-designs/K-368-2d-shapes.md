# K-368 `2d-shapes` (K/G1) : FINAL design (editor merge, 2026-09-23)

Merged from `_work/K-368-pedagogy.md` + `_work/K-368-design-A.md` (lens + tag) + `_work/K-368-design-B.md` (shape picture); every ruling and why: `_work/K-368-critic.md`. Concept: **Design A's lens-and-tag apparatus on every face**, with B's per-card choice on F2, B's 44 px G1 targets, the pedagogy's six moves, and the editor's re-measured floors. (m) = re-measured 2026-09-23 by read-only node (scratch `K-368-measure.js` with the shell woff2 from `file://`, `K-368-geo.js`, `K-368-geo2.js`; `lib/b2-common.js vocab/displayWord/excluded`, `lib/b3-picture-index.js pictureIndex`, `page/page.css`, `templates/layouts/card-grid.js`, `frontend/config/topics-taxonomy.json`, `frontend/content/seo-landing/<loc>.json`, `frontend/lib/seo/strand-names.ts`, `scripts/seo-landing/gen-b3-landings.js LEVEL_KEYS`) or by OPENING the picture (editor contact sheets `K-368-f2-objects.png`, `K-368-f2-more.png`). *est.* = the engineer measures in the real render (`render/one.js`). No em-dashes.

**Boundary (load-bearing).** The `geometry` family owns every attribute and comparison move on shapes and this type repeats none of them: K-070 "Shape Hunt" (find shapes LIKE a model, no name), K-075 "Count the Sides", K-076 / G2-241 "Sort by Sides" / "Shape Sorter" (line to a side count), K-077 "Shape Patterns", K-078 "Shape Twins", K-079 "Big Shapes, Small Shapes", K-080 "Which Shape Is Different?", K-265 "Color by Shape Code", G2-234 partition, G2-242 / G2-245 / G2-246 faces, edges, corners of SOLIDS, G2-243 "Solid Shapes Around Us", G2-244 "Flat or Solid?", G2-247 / G2-248 symmetry, G3-340 quadrilaterals (all m, `types/k`, `types/g2`). Tangram K-353 / K-358 / K-359 / G1-354 / G1-355 / G2-347 owns composing a picture FROM shapes and counting shapes inside a figure (de "Formen legen" is its head). The `matching` app mode `name` x theme `shapes` ("Picture Word Match for Kindergarten – Shapes", live in 11 locales, m) owns library shape ART joined to its word by a line, and `crossword` / `wordsearch` x `shapes` own spelling the names in a grid. **This family owns only:** the shape NAME in both directions on EXACT, non-prototypical drawings (shape to name, name to shape), defining-attribute recognition against near-misses, flat shapes in real objects, riddles (attributes to name), writing the name, drawing a named shape on dots. Every figure except F2's pictures is drawn by the NEW `primitives/flat-shape.js`; no face uses a library `shapes/*` picture (prototypical colour art; `shapes/diamond` is a 45 degree square that 10 of 11 vocab entries name "rhombus", m). No face counts sides as its task, sorts by sides, matches shape to shape, colours by a code, composes a picture from shapes, or shows a solid. **Visual signature:** an exact teal outline (3 px, NO fill) on a round white "lens" that gives the eye no horizontal or vertical axis; white tags are circled, teal pills are only read. The geometry pages (filled pastel library art on square cards) and the tangram pages (seamed composite figures) read differently from across the room.

## 1 Identity

| field | value |
|---|---|
| id / key / bands | `K-368` / `2d-shapes` / base **K**; F2 F5 **K** (`K-371+ TBD by the emitter`); F1 F3 F4 **G1** (`G1-381+ TBD by the emitter`), allocated by a `tools/alloc-b5var-ids.js` clone of `alloc-b4var-ids.js` (exists, m) in `_PANEL-FINDINGS` table order. |
| subject | `apps['2d-shapes'] = {default_subject:'math', default_age_range:'5-7', exercise_type_axis_key:'2d-shapes'}` (shape of `apps.geometry`, m); `apps['2d-shapes']` and `axes['exercise-type']['2d-shapes']` ABSENT today (m); register with a `register-b4-taxonomy.js` clone (exists, m). `assetClass: geometry`, `exerciseType: 2d-shapes`. |
| theme axis | **OFF** on all six faces: `themeAxis:{applicable:false}`, `coordinate.theme:''`. Five faces draw 0 library pictures; F2 draws 9 PINNED `{theme, noun}` pictures from the bank through `fileUri(theme, noun)` (NOT `pictureFor`, which rng-picks among themes: `clock` has 2 candidates incl. the 3D `around the house/clock`, `cookie` 4, `plate` 2, m). |
| unitAxis | not applicable (the shape inventory is a per-locale literal list, not a fan). |
| CCSS en (honest) | base **K.G.A.2** · F1 **1.G.A.1** (+ K.G.A.2) · F2 **K.G.A.1** · F3 **K.G.A.2** (a G1 production page; prose says it reviews the kindergarten naming standard in writing, no G1 code claimed) · F4 **1.G.A.1** · F5 **K.G.B.5**. `educationalAlignment` with those codes (no `targetUrl`). Strand row `'Geometry'` exists x11 (m, `strand-names.ts`). pt G1 faces cite BNCC **EF01MA14** verbatim in prose. |
| new primitives / data | `primitives/flat-shape.js` + `qa/verify-b5-flat-shape.js` (§2) · `templates/components-b5/2d-shapes.js` behind a new `templates/components-b5.js` barrel · `data/b5/2d-shapes.js` + `data/b5/locales/2d-shapes.<loc>.json` via `lib/b5-common.js bank()` (§5). |

| loc | genre head (compound; panels) | ASCII slug | level K / G1 (`LEVEL_KEYS`, m) | names (vocab singulars, m) + width of the longest at Baloo 2 700 18 px (m) | national strand (`strand-names.ts` Geometry row, m) |
|---|---|---|---|---|---|
| en | 2D Shapes | `2d-shapes` | `kindergarten` / `grade-1` | circle square triangle rectangle (hexagon d3) · rectangle 77.2 | Geometry |
| de | Geometrische Formen | `geometrische-formen` | `vorschule` / `1-klasse` | Kreis Quadrat Dreieck Rechteck (Sechseck) · KEEP_CASE | Geometrie (Lehrplan: Raum und Form) |
| es (MX) | Figuras geométricas planas | `figuras-geometricas-planas` | `preescolar` / `primer-grado` | círculo cuadrado triángulo rectángulo (hexágono) · rectángulo 88.2 | Forma, espacio y medida |
| pt (BR) | Figuras geométricas planas | `figuras-geometricas-planas` | `educacao-infantil` / `1o-ano` | círculo quadrado triângulo retângulo (hexágono) · retângulo 79.5 | Geometria (BNCC) |
| fr | Figures planes | `figures-planes` | `maternelle` / `cp` | cercle carré triangle rectangle (hexagone); K literal `rond` is the panel's call · rectangle 77.2 | Espace et géométrie |
| it | Figure geometriche piane | `figure-geometriche-piane` | `infanzia` / `classe-prima` | cerchio quadrato triangolo rettangolo (esagono) · rettangolo 86.5 | Spazio e figure |
| nl | Vlakke figuren | `vlakke-figuren` | `kleuters` / `groep-3` | cirkel vierkant driehoek rechthoek (zeshoek) · rechthoek 83.2 | Meetkunde |
| sv | Geometriska former | `geometriska-former` | `forskola` / `ak-1` | cirkel kvadrat triangel rektangel (sexhörning 91.2) · never "fyrkant" | Geometri [NSR] |
| da | Geometriske figurer | `geometriske-figurer` | `boernehaveklasse` / `1-klasse` | cirkel kvadrat trekant rektangel (sekskant) | Geometri og måling [NSR] |
| no | Geometriske figurer | `geometriske-figurer` | `1-trinn` / `2-trinn` | sirkel kvadrat trekant rektangel (sekskant) | Geometri [NSR] |
| fi | Tasokuviot | `tasokuviot` | `esikoulu` / `1-luokka` | ympyrä neliö kolmio suorakulmio (kuusikulmio 99.0) · **suorakulmio 101.3 = the widest name in 11 locales** | Geometria [NSR] |

Slugs: none equals or contains an existing `axes.*` slug in its locale (m: the only `figur`/`geometri` slugs are `geometry.*` = `geometrie|geometria|geometri|forme-geometriche` and pt `contar-figuras` / `vocabulario-com-figuras` / `escreva-o-nome-da-figura` / `cartoes-de-figura-e-palavra`). Theme `shapes` names (Shapes · Formen · Formas · Formes · Forme · Vormen · Former · Muodot, m) and `geometry` names (Geometry · Geometrie · Geometría · Géométrie · **Forme geometriche** · Geometria · Meetkunde · Geometri · **Geometri og former**, m) are never a type name or a title. ⚠ **de: the live de geometry K landing title already LEADS with "Geometrische Formen"** ("Geometrische Formen – Arbeitsblätter Kindergarten", slug `formen-vorschule-seiten-ecken`, m), so the de BASE title carries the naming element (§6).

**The rule that locks the type.** Every closed answer is re-derived by the gate's OWN `classify()` from the DRAWN geometry (the parsed `path d` / `circle`), never from a label, and the K/G1 square/rectangle convention is structural: a square figure is never offered the name "rectangle", a rectangle target never shares a row with a square, and the key is always the most specific name. Every word on the page is a whole panel literal from the bank; the code substitutes and never inflects.

## 2 The base page

**Concept.** "2D Shapes" (K). Six round white lenses in a 2 x 3 card grid, each holding ONE exact outline shape, each with three name tags to its right; the child circles one tag per lens. The lens is the thesis: a turned square inside a square card edge reads as a "diamond" because the frame supplies an axis (Mach's square/diamond effect); a disc supplies none, so K.G.A.2's "regardless of orientation" is carried by the apparatus. Horizontal cards (look left, read right) give a 156 px lens and a tag column that holds the widest name in 11 locales without wrapping. One apparatus repeated six times, no pictures, teal only, whitespace inside every card.

**Chrome budget.** Body **722** (3-line title + 3-line instruction; 814 one-line; **677** with a 4-line fi title). `.ws-page` inner 675. Every stack is quoted at 722 and checked at 677.

**Layout d2**
```
.ws-body 675 x 722 : cardGrid({cols:2, rows:3}), .ws-cardgrid gap 14 (m), rows minmax(0,1fr) (card-grid.js, m)
card = (675 - 14) / 2 = 330.5 wide ; .ws-card border 2 + padding 12 (m) -> inner 302.5
rows (722 - 2x14) / 3 = 231.3 -> inner 203.3        [at 677: 216.3 -> inner 188.3]
+--[1]-------------------------------------------------------+
|   ,----------.      +-- tag 132 x 48 --+                    |
|  /  lens d156 \  14 | circle           |                    |
| |  white disc  |    +------------------+  10                |
| |  flat-shape  |    | square           |                    |
|  \ R 44..69   /     +------------------+  10                |
|   `----------'      | rectangle        |                    |
|                     +------------------+                    |
+-------------------------------------------------------------+
width  lens 156 + 14 + tags 132 = 302 <= 302.5
height lens 156 <= 188.3 ; tags 3 x 48 + 2 x 10 = 164 <= 188.3 (<= 203.3 at 722)
badge 30 x 30 at the card corner; lens top >= 14 + (188.3 - 156)/2 = 30.2 > 29 at 677 (disc curve keeps the corner empty)
```
- **Lens:** `<circle r=78 fill=T.white>` under the figure; figure circumradius R in [44, 69] + stroke 1.5 <= 70.5 < 78: clearance >= 7.5 px at every rotation (the box is rotation-invariant, §primitive).
- **Tag** `.s2d-tag` (inline style, no `page.css` edit): 132 x **48** (the `pillChoice` 48 px K precedent; A's 40 raised: a K ring target), white, 2 px teal border, radius 999, Baloo 2 700 **18 px**, padding 0 8, text centred. Widest name fi `suorakulmio` = **101.3 px (m)**; inner 132 - 4 - 16 = 112 >= 101.3 (10.7 px margin). The gate asserts `scrollWidth <= clientWidth` for every name in every locale; an overflowing panel literal is sent back, never shrunk.

**Ladder** (guards key on these config keys, never the level index):

| key | d1 | d2 (ships) | d3 |
|---|---|---|---|
| `cards` / grid | 4 / 2x2 | **6 / 2x3** | 6 / 2x3 |
| `lens` / `R` | 188 / [52, 82] | **156 / [44, 69]** | 156 / [44, 69] |
| `kinds` | core 4 | **core 4** | core 4 + `hexagon` iff `inventory.hexagon` |
| `tags` per card | 2 | **3** | 3 |
| `turnedMin` (true figures at 15..75 deg; circle excluded) | 1 | **3** | 4 |
| `turnedSquare` (one square at exactly 45 deg) | 0 | **1** | 1 |
| `skinnyMin` (triangle short/long <= 0.35 or rectangle aspect >= 2.2) | 0 | **1** (the recipe yields 2) | 2 |
| `sizeSpread` (R_max / R_min over true figures) | >= 1.3 | **>= 1.375** (one R <= 48, one R >= 66) | >= 1.375 |
| tag px | 20 | **18** | 18 |

**d3 ruling:** d3 adds `hexagon` (a locale flag) and one more turned figure; same page, not shipped, no copy describes it. d1 and d3 are easier/harder pages of the same move, never faces.

**Composer (d2 recipe, seeded, locale-neutral: the same six figures in 11 locales).** Slot A circle · slot B square at rot 45 · slot C triangle `skinny` at rot in [15, 75] · slot D rectangle aspect in [2.2, 2.6] at rot in [15, 40] (or its mirror) · slots E F = two draws from {triangle `right` or `obtuse`, square rot 0..12, rectangle aspect [1.5, 2.0] rot 0 or 90} with no kind three times (so every core name appears, exactly two repeat); `rng.shuffle` into the grid; then one NON-skinny figure is set to R <= 48 and one figure to R >= 66. **Per-kind minimum R (m, `K-368-geo.js`):** R >= max(30 / minWidth, 72 / maxWidth) per unit polygon: square 36 · circle 36 · equilateral 47.6 · right 36 · obtuse (re-shaped, below) 49.4 · skinny 54.1 · rect 2.2 36.2 · rect 2.6 41.8. A composer draw below its kind's minimum is re-drawn.

**Answer-hiding + uniqueness.** Tag sets: the answer + 2 distinct distractors from core 4; **a square card's tags are exactly {square, circle, triangle}** (never rectangle); a rectangle card may carry `square` (wrong, correctly). Tag order `rng.shuffle`d per card, redrawn until the answer occupies >= 2 different slots on the page. Stamps: figure `<svg data-lcs-prim="flat-shape" data-lcs-verts="x,y;..." data-lcs-variant="none" data-lcs-rot data-lcs-R data-lcs-kind>` (`data-lcs-kind` is DEBUG ONLY, the gate is forbidden to read it); tag `data-lcs-tag="<kind>"`; card stage `data-ws-content`. **verify():** per card, `classify(parsed path)` (the gate's own), exactly one tag === it; no square card carries a rectangle tag; turned / skinny / size-spread / per-kind R minima re-derived from the parsed geometry; no text inside any SVG; no `<img>`; answer slot spread >= 2 per page and, over 20 seeds INCLUDING the shipped seed, no slot > 60 % (the nt10-D staircase lesson: the seed carries no locale, one bad order ships to all 11). The page ships no answer key (nt10-D ruling): the exactness of the drawings is the key.

**Reused (exact).** `cardGrid({cards, cols, rows, numbered})` (`templates/layouts/card-grid.js`, m) · `.ws-card` / `.ws-card-badge` / `.ws-cardgrid` / `.ws-lane` / `.ws-scene-banner` / `.ws-bankword` (`page/page.css`, m) · `rulingBlock({rows, w, h, glyphH})` + `wordBank({words, wordPx})` (`templates/components-b2.js:76, :228`, m; F3) · `svgRoot el circle esc` (`primitives/_svg.js`) · tokens `primitives/_tokens.js` · `fileUri(theme, noun)` (`lib/b2-common.js` export, m; F2) · `displayWord` (m; de KEEP_CASE) · `rng.shuffle/sample/int`.

**NOT used.** `pillChoice` (`.ws-pill` padding 6 x 24: three 11-letter names overflow) · `answerBox` / `blankNumeralBox` (no numeral is written) · `pictureFor` (rng-picks among themes, see §1) · library `shapes/*` art · `tangram.js` · `dot-figure.js` / `sym-grid.js` / `grid-copy.js` (copy / symmetry apparatus; F5 needs a bare lattice) · `iconRows` / `sceneStage` · `objForms` / `approved-words-*.json` (nothing inflects, nothing is split) · `image-vocabulary.js` at render.

**NEW `primitives/flat-shape.js`** (pure SVG on tokens, Node-testable, no DOM). `flatShape({kind, sub, variant='none', vside=0, rot=0, flip=false, aspect=1, R, pad=3, sw=3, lens=0}) -> {svg, box, verts, meta}`; also exports `UNIT`, `minR(kind, sub, aspect, {minWidth, maxWidth})`.
1. Take the unit polygon (x right, y down); `flip` mirrors x.
2. Translate its bbox centre to the origin; scale so the largest vertex distance = 1 (unit circumradius).
3. Rotate by `rot` degrees clockwise, scale by `R`.
4. Translate to the box centre `(R+pad+lens, R+pad+lens)`; **box = square of side 2(R+pad+lens), independent of `rot`** (layout never depends on rotation).
5. Apply `variant` to side `vside`.
6. Emit ONE `<path fill="none" stroke=T.teal stroke-width=sw stroke-linejoin="round" stroke-linecap="round">`; circle / ellipse as `<circle>` / `<ellipse>` with 64 sampled `verts` stamped; if `lens > 0` a `<circle r=R+pad+lens fill=T.white>` is emitted FIRST. No text, no fill on any figure.

| kind / sub | unit vertices (before step 2) | notes |
|---|---|---|
| `square` | (-1,-1) (1,-1) (1,1) (-1,1) | |
| `rectangle` aspect a | (-a,-1) (a,-1) (a,1) (-a,1) | a in [1.5, 3.0]; **a < 1.5 throws** (no near-square rectangle ever reaches a page); skinny = a >= 2.2 |
| `triangle` equilateral | (0,-1) (0.866,0.5) (-0.866,0.5) | |
| `triangle` right | (0,0) (0,1.4) (2,1.4) | |
| `triangle` obtuse | **(0,0) (2,0) (2.7,1.4)** | 116.6 deg; minWidth 0.607 R (m). A's (2.9,1) is REJECTED: minWidth 0.425 R needs R >= 70.5 for a 30 px floor, above the lens maximum 69 (m) |
| `triangle` scalene | (0,0) (2,0) (0.6,1.3) | |
| `triangle` skinny | (0,0) (2.6,0) (0.45,0.75) | short/long 0.336, min angle 19.2 deg, minWidth 0.554 R (m) |
| `hexagon` regular | (cos 60k, sin 60k), k = 0..5 | d3 only |
| `circle` | `<circle>`; 64 verts | |
| near-miss `rhombus` | (0,0) (2,0) (3,1.732) (1,1.732) | square rows only |
| near-miss `parallelogram` | (0,0) (2.4,0) (3.084,1.879) (0.684,1.879) | 70 deg; rectangle rows only |
| near-miss `trapezoid` | (0,0) (3,0) (2.3,1.3) (0.7,1.3) | rectangle rows only |
| near-miss `kite` | (0,-1.2) (0.8,0) (0,1.6) (-0.8,0) | the 4-sided "triangle"; triangle rows only |
| near-miss `ellipse` | rx a, ry 1, a in [1.4, 1.8] | circle rows only |
| near-miss `chord` | unit circle cut by the chord y = 0.75 | chord 66 % of the diameter, sagitta 0.25 R (a 25 % chord has a 3.2 % sagitta = 2 px at R 60, invisible; m) |

Variants (on side `vside`; the stamped vertex list is the UNMODIFIED polygon, so the gate knows what was altered): **`gap`** removes the middle g = clamp(max(14 / L, 0.16), 0.16, 0.30) of the side; the path runs from the gap's far end round to its near end; visible gap after round caps = gL - sw >= 11 px; circle gap = a 30 deg missing arc (visible chord >= 20 px at R 44). **`curved`**: quadratic Bezier, control point = midpoint + 0.40 L n (outward normal), sagitta 0.20 L. **`round`**: EVERY corner filleted, r = 0.25 x shortest side, trim t = r / tan(theta/2) asserted <= 0.45 of each adjacent side (else throws); true figures use `stroke-linejoin:round` (radius sw/2 = 1.5 px, far below the gate's 20 % fillet threshold). Near-misses are never drawn at R < 44.

Root stamps: `data-lcs-prim="flat-shape" data-lcs-verts data-lcs-variant data-lcs-vside data-lcs-rot data-lcs-R data-lcs-kind(debug)`. **`qa/verify-b5-flat-shape.js`** (NEW, measures the RENDER, the tangram / body-figure precedent): renders every kind x sub x variant x 8 rotations x R {32, 44, 69}; re-parses each `path d` (never `meta`); recomputes side count, side ratios (+-1 %), right angles (+-1 deg), minimum caliper width and maximum extent (the floors), visible gap (>= 10 px after caps), sagitta (>= 15 % of the side), fillet radius (>= 20 % of the shortest side), ellipse aspect (>= 1.4), chord sagitta (>= 0.2 R); asserts the bbox fits `box - 1` at every rotation and tokens only. Its poison: a `gap` at 0.10, a `curved` at 0.05, a `rectangle` at aspect 1.2, a `round` at 0.10, the old obtuse (2.9,1) at R 69 under a 30 px floor: each must FAIL.

**NEW `templates/components-b5/2d-shapes.js`** (behind a `templates/components-b5.js` barrel cloned from `components-b4.js`, refusing duplicate export names): `nameTag({kind, label, w=132, h=48, px=18})` · `givenPill({kind, label, px=20})` (teal fill, white Baloo 700, `data-lcs-given`: read, never circled) · `lensFigure({shape, lensD})` · `nameCard({shape, tags})` (base) · `realRow({target, figures})` (F1) · `objectCard({src, choices})` + `shapeChoice({kind, label})` (F2) · `writeLane({shape, rowW, rowH, glyphH})` (F3) · `riddleCard({text, tags})` + `bubble({text})` (F4) · `dotCard({target, given})` + `dotLattice({n=6, pitch=46, given})` (F5). Inline CSS only; every stage stamps `data-ws-content`.

**Alternatives (rejected).** (1) **Design B's "shape picture"** (a robot / rocket / house built from separate exact shapes, 6 coral rings, leader lines to 170 x 140 callouts): rejected as the base, see the critic file; in short: a picture composed of shapes is the tangram / "Formen legen" genre and K-354's figure-with-leaders signature (Boundary), its nested parts put a ring on the robot body 28 px from a 45 degree square button and between the head's eyes (a ring whose referent a five-year-old can misread and no gate can see), 4 of its 6 d2 sets point an axis-aligned head, body or leg (prototypes dominate), and it needs a leader overlay, a ring-point search and a crossing re-selector where a card grid needs none. (2) The pedagogy's figure over a vertical chip stack in a 3 x 2 grid: a square card edge is exactly the axis frame the page exists to remove, and ~120 px figures. (3) Six figures left, six names right, draw lines: the `matching` name x `shapes` mechanic; the last pair solves by elimination.

**Risks -> mitigations.** Mono print: 3 px teal prints near-black; the white lens on cream vanishes (it is spacing, not information); no colour carries an answer. Long names: every name is a closed literal measured by the gate. The 45 degree square: correct in every curriculum (K.G.A.2 verbatim) and no tag ever offers "rhombus"; a panel dispute is OPEN item 2, never a per-locale page variant (the seed is locale-neutral). **Palette:** cream, creamDeep, white, teal, tealSoft, coral, coralSoft, ink, inkSoft, grid only; no `codeColors`. **Font floor:** smallest body text 16 px (F4 riddles, F2 tile names); tags 18; the 9 px lint cannot fire.

## 3 Faces 2-6

All five are **CODE** faces on ONE additive knob `mode` (`d.mode` undefined = the base path, byte-identical; a face stamps `data-lcs-mode` only when declared) with a `verify()` branch each; guards key on the config (`d.mode`, `d.rows`, `d.items`, `d.cards`, `d.given`), never the level index. None is PARAM: each changes the apparatus (tag cards / named lanes of lenses / object cards with shape tiles / lens + writing lanes under a bank / riddle bubbles / dot lattices), so the resolved d2 configs are pairwise distinct by construction (`tools/gate-variation-distinct.js`, exists, m). Density: K faces 4-8 items with figures / pictures >= 72 px max extent and targets >= 48; G1 faces 6-12 items, targets 44, text >= 16. **Recognition faces (base, F1) carry >= 2 turned and >= 1 skinny TRUE example, measured.**

### F1 : Real or Not? (G1, CODE `mode:'real-or-not'`)
**Move:** name to shape against NEAR-MISSES: in each row, circle every figure that truly IS the named shape (defining vs non-defining attributes; Clements-Sarama set). The row head is a name to READ (no model drawing: a model would make it K-070).
**Layout:** three `.ws-lane` (default padding 12 x 16, inner 639, m) in a flex column, gap 12. Lane inner = teal `givenPill` 40 + gap 8 + a row of 4 lenses d 132 = 180; lane 180 + 24 + 4 = 208; **3 x 208 + 2 x 12 = 648 <= 677** (slack 29; 74 at 722). Lens row 4 x 132 + 3 x 37 = 639. R true in [33, 60] subject to the per-kind minima (skinny triangle >= 54.1), near-misses R in [44, 60]; R + 1.5 <= 61.5 < 66.
**Config d2** `{mode:'real-or-not', rows:['triangle','rectangle','square'], perRow:4, trueMin:1, trueMax:3, lens:132}`; d1 `{rows:['triangle','rectangle'], perRow:4}`; d3 `{rows:['triangle','rectangle','square','circle'], perRow:3}`. True pools: triangle {equilateral turned, right, obtuse, skinny}; rectangle {rot 20-70, aspect 1.5-3.0, skinny >= 2.2}; square {axis, rot 45, rot 20, small}; circle {small, large}. Near-miss pools: triangle {gap, curved, round, kite}; rectangle {parallelogram, trapezoid, round, gap} and **never a square**; square {rectangle aspect >= 1.5, rhombus, gap, round}; circle {ellipse, gap, chord}. Per row `trueCount` in 1..3, the three rows not all equal; true positions shuffled.
**Verify:** row stamps `data-lcs-target`; answer set = lenses where `classify(parsed path, measured variant) === target`; trueCount in [1, 3]; >= 2 true figures turned 15..75 deg and >= 1 skinny on the page; 0 figures classifying as `square` in the rectangle row; every near-miss measurable (§primitive thresholds, from the path); over 20 seeds no lens column holds > 40 % of the true figures.
**Query face:** recognise (en "recognizing 2d shapes" · de "erkennen" · es "reconocer" · pt "reconhecer" · fr "reconnaître" · it "riconoscere" · nl "herkennen" · sv "känna igen" · da "genkende" · no "kjenne igjen" · fi "tunnista").
**Refusals:** none.

### F2 : Shapes Around Us (K, CODE `mode:'around-us'`)
**Move:** find the flat shape IN a real object (K.G.A.1): for each opened library picture, COLOUR the tile of its shape, circle or rectangle. Colouring is a second pencil move (the base owns circling a tag) and avoids the en/de verb-noun echo ("circle the circle", "Kreise ... den Kreis").
**Layout:** `cardGrid({cols:2, rows:4})`; card 330.5 wide, (722 - 3 x 14)/4 = 170 tall (inner 302.5 x 142); at 677: 158.75 (inner **130.75**). Card = picture 110 x 110 (contain) left, gap 16, a column of two shape tiles 176 x **56**, gap 10 = 122; 110 + 16 + 176 = 302 <= 302.5; 122 <= 130.75. Tile = white, 2 px teal, radius 12, padding 0 8: [glyph (circle d 44, or rectangle 56 x 34, `flatShape` rot 0, sw 2.5, no fill)][8][name Baloo 700 **16**]; widest `suorakulmio` at 16 px = 101.3 x 16/18 = **90.0 (m, scaled)**: 56 + 8 + 90 = 154 <= 156 inner (*est.* the engineer confirms in `render/one.js`). Tile order FIXED (circle above rectangle, a legend order): the 4/4 split makes position carry nothing.
**Config d2** `{mode:'around-us', items:8, split:{circle:4, rectangle:4}, pic:110, tile:[176,56]}`; d1 `{items:6, split:{circle:3, rectangle:3}, rows:3, pic:128}`; d3 `{items:8, split:{circle:4, rectangle:4}, tileNames:false}` (glyph-only tiles; a triangle or square tile is never offered, see the ceiling below).
**Object bank (all OPENED by design A AND the editor; B opened the pedagogy's nine):** circle `classroom/clock` (flat face, red rim) · `around the house/plate` (flat, top view) · `At the Supermarket/pizza` (whole, top view) · `bakery/cookie` (round) · `desserts and sweets/lollipop` (round candy on a stick: the candy is the circle; panel flag) ; rectangle `around the house/door` (framed upright) · `post office/envelope` (landscape, flap drawn inside the outline) · `classroom/whiteboard` (framed, tray below) · `classroom/tablet` (landscape, turned ~4 deg; corner radius *est.* ~5 % of the short side, far below F1's 25 % rounded near-miss). d2 = 4 of the 5 circles (seed) + all 4 rectangles, shuffled. **Rejected after opening:** `classroom/notebook` (3D, a visibly rounded page corner, index tabs: contradicts F1's rounded-corner lesson) · `classroom/ruler` (rounded end caps; the ruler family's apparatus) · `classroom/eraser` (3D, rounded top) · `desserts and sweets/chocolate_bar` (3D, turned) · `around the house/carpet`, `furniture/rug` (fringe breaks the outline) · `breakfast/pancake`, `At the Supermarket/donut` (3D) · `around the house/clock` (3D rim) · `classroom/folder` (tab) · `around the house/picture_frame` (a clean rectangle but **no vocab key, m**: not in the picture index; a candidate if the operator adds the vocab entry) · plus the pedagogy's list (window, mirrors, watermelon, tent, pie, cheese, christmas tree, kite, cards, television, flag, book, rug, cushion, paper, letter, stamp, waffle, toast, biscuit, badge, chess, sailboat). **Measured ceiling:** no library object is a clean square or triangle, so the face is circle / rectangle only; it never shows a square or triangle tile (a tile no picture can take teaches "never triangle").
**Verify:** each card stamps `data-lcs-obj="<theme>/<noun>"` + `data-lcs-answer` from the bank's `shape` field (independent of the picture); split === config; every object `picOpened:true`; no object twice; the `img src` === `fileUri(theme, noun)` of the bank entry (never another theme's file); tiles exactly {circle, rectangle} in fixed order; picture `img` complete.
**Query face:** "2d shapes found at home" · de "in der Umwelt" · es "en objetos" · pt "no dia a dia" · fr "autour de nous" · it "intorno a noi" · nl "om je heen" · sv "i vardagen" · da "omkring os" · no "rundt oss" · fi "ympärillämme".
**Refusals:** none (pictures are locale-neutral; only two name literals print).

### F3 : Write the Names (G1, CODE `mode:'write-name'`)
**Move:** PRODUCE the name in writing (shape to written word), a word bank as spelling support. No letter boxes (their count gives the length away).
**Layout:** `wordBank` 59 + margin 10 = 69 (m); 6 full-width `.ws-lane`s with inline **`padding:4px 12px`** (stated override: inner width 675 - 4 - 24 = 647), gap 8: lane (722 - 69 - 5 x 8)/6 = 102.2 (inner 94.2); at 677: 94.7 (inner **86.7**). Lane = lens d 78 left, gap 22, `rulingBlock({rows:1, w:547, h:70, glyphH:32})` (+ ~6 px wrapper, m substrate): 70 + 6 = 76 <= 86.7; 78 <= 86.7; 78 + 22 + 547 = 647. Lens R in [33, 36]; the elongated rectangle is aspect 2.0 at R >= 33.5 (minWidth 0.894 R, m) so its short side stays >= 30.
**Config d2** `{mode:'write-name', lanes:6, bank:true, bankKinds:'core4', turnedMin:2, elongated:1 (rect aspect 2.0), lens:78, rowW:547, rowH:70, glyphH:32}`; d1 `{lanes:4, bank:true}`; d3 `{lanes:6, bank:false}`. Bank = the 4 core names once each, `rng.shuffle`d until its order differs from the first-appearance order of the answers.
**Verify:** lane stamps verts; key = `classify`; every key is in the bank; no name printed in any lane; `data-lcs-ruling-row` present per lane and empty (no starter: `verify-ruling-starters.js` finds none); >= 2 turned; bank has exactly 4 words, no hexagon at d2.
**Query face:** "write the names" (de "Namen schreiben" · es "escribe el nombre" · pt "escreva o nome" · fr "écris le nom" · it "scrivi il nome" · nl "namen schrijven" · sv "skriv namnet" · da / no "skriv navnet" · fi "kirjoita nimet").
**Refusals:** none; fi `suorakulmio` (11 letters) in 547 px at glyphH 32: *est.* ~24 px per handwritten letter = ~265 px.

### F4 : Shape Riddles (G1, CODE `mode:'riddles'`)
**Move:** REASON from attributes (sides, corners, round, equal sides, long and short sides) to the name; no drawing at all (a drawing would make it the base).
**Layout:** `cardGrid({cols:2, rows:3})` (the base's grid: shape-then-name vs clue-then-name read as siblings). Card inner 302.5 x 203.3 (722) / **188.3** (677). A tealSoft bubble 302 wide, radius 14, padding 10, text width 282, Nunito 800 **16**, line-height 20, a coral "?" disc d 30 (white Baloo 20 "?") on its top-right corner; below, gap 8, three name tags 132 x **44** (G1 target floor; A's 36 raised) wrapping 2 + 1 with gap 6: bubble 3 x 20 + 20 = 80, tags 44 + 6 + 44 = 94: **80 + 8 + 94 = 182 <= 188.3** (6.3 slack at 677). Measured Nunito 800 16 = 7.48 to 7.65 px per char (m: fi 62 chars 463.8 px, de 70 chars 535.8 px) -> ~36 chars per 282 px line; the validator caps a riddle at 90 chars and the render gate asserts `bubble.scrollHeight <= 3 lines` (a German compound that forces a fourth line is sent back).
**Config d2** `{mode:'riddles', cards:6, tags:3, kinds:'core4', riddlesPerKind:2}`; d1 `{cards:4, tags:2}`; d3 `{cards:6, tags:4, includeHexagon:inventory.hexagon}`. Each core kind appears >= 1; riddles drawn without replacement.
**Single answer by construction:** square riddles carry an equal-sides clue ("All my 4 sides are the same length.") and their tags never include `rectangle`; rectangle riddles carry a long/short clue ("I have 2 long sides and 2 short sides.") and may carry `square` (wrong); a rectangle riddle that says only "4 sides, 4 corners" is invalid (a square fits); circle riddles never meet an `oval` tag (not in the closed set).
**Verify:** card stamps `data-lcs-riddle="<kind>:<i>"`; answer = kind; exactly one tag === kind; the answer name AND the panel's listed inflections (sv "kvadraten") are absent from the riddle (NFC, case-fold, `(?<!\p{L})...(?!\p{L})`); square / rectangle tag rule; slot spread as base.
**Query face:** riddles (Rätsel · adivinanzas · adivinhas · devinettes · indovinelli · raadsels · gåtor · gåder · gåter · arvoitukset).
**Refusals:** none.

### F5 : Draw on Dots (K, CODE `mode:'dot-draw'`, OPEN: no verify)
**Move:** name to DRAWING (K.G.B.5) on a bare dot lattice; two cards give one side on a SLANT so the child finishes a TURNED shape by hand (the non-prototypical move produced, not recognised).
**Layout:** `cardGrid({cols:2, rows:2})`; card 330.5 x 354 (inner 302.5 x 326) / at 677 331.5 (inner **303.5**). Card = teal `givenPill` (name, Baloo 700 22, h 40) + gap 12 + a 6 x 6 lattice, pitch 46, dots r 3.5 `T.teal`, margin 6: 5 x 46 + 12 = 242; 40 + 12 + 242 = 294 <= 303.5; 242 <= 302.5. Given side: `T.coral` 5 px, round caps, coral end dots r 6 (heavier than any lattice mark, so it survives mono as "the thick line").
**Config d2** `{mode:'dot-draw', cards:4, kinds:['triangle','square','square','rectangle'], given:[null, null, [1,2], [2,4]], pitch:46, n:6}`: card 1 triangle (free), card 2 square (free), card 3 square with a given side (1,2), card 4 rectangle with its given LONG side (2,4). **Measured (m, `K-368-geo.js`):** on a 6 x 6 lattice the (1,2) square closes with (2,-1) or (-2,1) and fits; the (2,4) side admits NO square completion (the perpendicular (4,-2) spans 6 intervals > 5) and exactly the 2 : 1 rectangle completion (2,-1) / (-2,1) fits: the rectangle card cannot be finished as a square. d1 `{cards:4, kinds:['square','rectangle','triangle','triangle'], given:[]}`; d3 `{cards:4, given:[[1,2],[2,4],[1,3],[3,1]]}`. Circle never (not drawable on dots).
**Layout gate (no verify):** every given segment joins two lattice points; each given card has >= 1 completion wholly inside the lattice; the rectangle card has NO square completion; no text inside the lattice.
**Query face:** "draw 2d shapes on dot paper" (de "zeichnen im Punktefeld" · es "dibuja en puntos" · pt "malha pontilhada" · fr "tracer sur les points" · it "disegna sui puntini" · nl "tekenen op stippen" · sv "rita på prickar" · da "tegn på prikker" · no "tegn på prikker" · fi "piirrä pisteisiin").
**Refusals:** none.

**Rejected non-moves.** count sides / corners (K-075, G2-246) · sort by sides (K-076, G2-241) · find like a model (K-070) · shape twins (K-078) · odd shape out (K-080) · big / small (K-079) · shape patterns (K-077) · colour by shape code (K-265) · flat vs solid, solids in real life (G2-243 / G2-244) · partition (G2-234) · compose a picture from shapes, count shapes in a figure (tangram; this is also why B's shape picture is not a face) · trace-and-name (a tracing-lane repeat of the base; the tracing families own the stroke) · picture-word match on library shape art (`matching` name x `shapes`) · "circle the rectangles" with squares present · a square / rectangle hierarchy face (G2-3 content in every locale) · F2 with lines into two bins (8 crossing lines at K are ungradable; replaced by per-card tiles) · relabelling base d1 / d3 as a face.

## 4 Native rebuild plan x11

The panel authors, per locale: `names` (4 core literals + `hexagon` if `inventory.hexagon`; each === `displayWord(vocab singular)` unless `overrides[kind] = {word, reason}`, e.g. fr K `circle -> rond`) · `inflections` (the case / definite forms of each name a riddle might contain, for the answer-leak check: sv "kvadraten", fi "neliön", de "Quadrats") · `riddles` (2 per core kind = 8, + 2 hexagon if flagged; each tagged `clue: 'round'|'three'|'equal'|'longShort'`) · `strings` (6 titles + 6 instructions) · 0 noun forms (F2 prints no object word; nothing agrees with anything). Frames never inflect; no `objForms`. Every instruction names only apparatus on its page (tags, rows of shapes, tiles, the line and the box, riddles, dots and the thick line), is one imperative a 5-8-year-old follows, and F2's instruction inlines both shape names. The EN is a SOURCE TO AUDIT.

| loc | literals | forms / slots | refusal | traps |
|---|---|---|---|---|
| en | 4 (+1) names · 8 (+2) riddles · 12 strings | none | none | "diamond" never an answer; "corners" at K / G1, "vertices" not before G2; US "Color"; title never "Shapes" bare (theme) |
| de | same | none (KEEP_CASE) | none | base title "Geometrische Formen benennen" (the de geometry K landing owns the bare head, m); "Formen legen" = tangram, "Körper" = G2-244, never in a title; "Raute" never an answer; F2 verb "Male ... an" (never "Kreise ... ein" next to "Kreis") |
| es (MX) | same | none | none | "ficha" never in a title (domino tile AND worksheet); "lados / vértices" SEP 1°, "aristas" = 3D, out; lead with "planas" (the es geometry K landing is "Figuras geométricas para preescolar – contar lados y esquinas", m) |
| pt (BR) | same | none | none | lead with "planas" (the pt geometry K landing is "formas geométricas educação infantil", m); "figura" also means PICTURE in pt (live `contar-figuras`, m): F2 copy says "objetos"; "atividade" never in a title; K literal register EI vs fundamental is the panel's |
| fr | same | none | none | K (GS) name literal "rond" vs "cercle" = `overrides.circle` with a reason (CP faces "cercle"); "sommets" vs "coins" at CP; "fiche" never in a title; NBSP before `?` `:` |
| it | same | none | none | never lead with "Forme geometriche" (= the geometry type name, m); "scheda" never in a title; "rombo" never an answer |
| nl | same | none | none | "vormen" bare = theme slug and dictation noise; "vlakke figuren" leans Flemish, K titles may use "vormen" + a groep word (panel); "ruit" never an answer |
| sv | same | none | none | "fyrkant" colloquial, never an answer; "former" = nails / "formerly" noise; `\b` is ASCII-only in any sv lint (å/ä/ö) [NSR] |
| da | same | none | none | never "Former og figurer" (near-duplicate of the geometry name "Geometri og former", m); "formering" noise [NSR] |
| no | same | none | none | bokmål; "former og mønster" is a K-077-like head, avoid [NSR] |
| fi | same (riddles written whole: "Minulla on kolme sivua ja kolme kulmaa. Mikä olen?") | inflected objects written out ("Ympyröi muodon nimi.") | none | `suorakulmio` 101.3 px is the family's width driver (tags 132 hold it, m); "vinoneliö" never an answer; no bare nominative token inside a sentence [NSR] |

Every panel OPENS the 9 F2 pictures (the lollipop and the tablet are the two to rule on) and reads one render of every face in its locale.

## 5 Data + gates

`data/b5/2d-shapes.js` (locale-neutral, hand-authored) + `data/b5/locales/2d-shapes.<loc>.json` GENERATED from `i18n/.draft-b5-<loc>.json` by `tools/apply-b5-locale.js` after `tools/validate-b5-draft.js` (clones of the b4 pair, both exist, m; `data/` is gitignored, `git add -f`), read through `lib/b5-common.js bank('2d-shapes', loc)` (a `lib/b4-common.js` clone over `data/b5/`). `apply-b5-locale.js` writes BOTH `strings.<mode>` in the bank AND `i18n/strings.<loc>.json[<ID>]`, and `tools/check-b5-string-parity.js` (a clone of `check-b4-string-parity.js`, exists, m) asserts they are identical (the nt10-D two-places trap).
```
// data/b5/2d-shapes.js
module.exports = {
  kinds: ['circle','square','triangle','rectangle'], optionalKinds: ['hexagon'],
  objects: [ // F2; pinned file, never pictureFor; opened 2026-09-23 by design A + editor (B: the pedagogy's nine)
    {theme:'classroom', noun:'clock', shape:'circle', picOpened:true},
    {theme:'around the house', noun:'plate', shape:'circle', picOpened:true},
    {theme:'At the Supermarket', noun:'pizza', shape:'circle', picOpened:true},
    {theme:'bakery', noun:'cookie', shape:'circle', picOpened:true},
    {theme:'desserts and sweets', noun:'lollipop', shape:'circle', picOpened:true},
    {theme:'around the house', noun:'door', shape:'rectangle', picOpened:true},
    {theme:'post office', noun:'envelope', shape:'rectangle', picOpened:true},
    {theme:'classroom', noun:'whiteboard', shape:'rectangle', picOpened:true},
    {theme:'classroom', noun:'tablet', shape:'rectangle', picOpened:true},
  ],
};
// data/b5/locales/2d-shapes.<loc>.json
{ "names": {"circle":"…","square":"…","triangle":"…","rectangle":"…","hexagon":"…"},
  "overrides": {"circle": {"word":"rond","reason":"GS register"}} | {},
  "inflections": {"square":["…"], …},
  "inventory": {"hexagon": true},
  "riddles": {"circle":[{"text":"…","clue":"round"},…], "square":[{"text":"…","clue":"equal"},…],
              "triangle":[{"text":"…","clue":"three"},…], "rectangle":[{"text":"…","clue":"longShort"},…]},
  "strings": {"base":{"title":"…","instruction":"…"}, "real-or-not":{…}, "around-us":{…},
              "write-name":{…}, "riddles":{…}, "dot-draw":{…}} }
```
Helper contract: `bank('2d-shapes', loc)` returns the merged object; `shapeName(loc, kind)`, `riddle(loc, kind, i)`, `stringsFor(loc, mode)` THROW on a missing literal (never fall back to the vocab or to en).

**`tools/validate-b5-draft.js` (`2d-shapes` block; exit 1 on any):**
1. `names` has the 4 core kinds, non-empty, pairwise distinct after `toLocaleLowerCase(loc)`; each === `displayWord(vocab[kind][loc][0], loc)` OR `overrides[kind]` has a non-empty `reason`; `hexagon` present iff `inventory.hexagon`.
2. No name equals or contains the locale's `axes['exercise-type'].geometry.name` or `axes.theme.shapes.name` (case-fold).
3. Every riddle: 1-2 sentences, <= 90 chars, contains no `names` value and no `inflections` value (NFC, case-fold, `(?<!\p{L})...(?!\p{L})`), no digit-free requirement (digits allowed).
4. `clue` tags: circle `round`, triangle `three`, square `equal`, rectangle `longShort`; exactly 2 riddles per core kind.
5. No name or override is the locale's oval / rhombus / diamond / star / heart / moon vocab singular.
6. Instructions <= 150 chars, one sentence (fi two only with a recorded reason); `around-us` contains both the circle and the rectangle literal; `write-name` refers to the line and the box; no "tick", no "letter boxes", no "line to"; `dot-draw` refers to the dots.
7. Titles <= 70 chars, no worksheet-word (the b3 `WORKSHEET_WORD` regex), no visible free-word, never equal to the theme name or slug (`axes.theme.shapes`), unique across the 6, pairwise differing by at least one noun or verb token; da never "Former og figurer"; it never starts with "Forme geometriche"; de base contains the naming verb.
8. F2 `objects`: every `picOpened:true`; `cache/themes/<theme>/<noun>@3x.webp` exists; the theme is not a `bw` directory; the noun has a vocab entry and is not in `B2_EXCLUDE` for the locale; shapes exactly {circle, rectangle}; >= 4 per shape.
9. `inventory.hexagon === false` => no hexagon riddle / string / name.
10. `strings` keys === the 6 mode strings, none missing, none extra.

**`qa/verify-b5-2d-shapes.js`:** renders base + 5 faces x 11 locales x d2 x 20 seeds through `render/render-instance.js` (file:// fonts) under the 722 stack (3-line de title + 150-char instruction) AND the 4-line fi title (677); asserts `verify()` empty and `qa/lints.js` clean; then the floors ITSELF (no size lint exists): K true figures minimum caliper >= 30 and maximum extent >= 72, G1 >= 30 / >= 45, from the parsed path; tags 48 (K) / 44 (G1) high; F2 pictures >= 110 and tiles 56; text >= 16; every tag `scrollWidth <= clientWidth`; F4 bubble <= 3 lines; F3 ruling rows present and empty; the square / rectangle rule (0 square tags-with-rectangle, 0 squares in rectangle rows); turned / skinny counts on base and F1; slot / column spread over 20 seeds incl. the shipped seed; every printed literal === the locale bank (node cross-check); everything above the footer.

**Poison (each must FAIL for its OWN reason; the correct EN draft is the control):** P1 `names.square === names.rectangle` -> rule 1 · P2 it title "Forme geometriche piane: i nomi" -> rule 7 · P3 riddle "I am a triangle with 3 sides." -> rule 3 · P4 sv square riddle containing "kvadraten" -> rule 3 (inflection list) · P5 a square riddle tagged `longShort` -> rule 4 · P6 da title "Former og figurer" -> rule 7 · P7 object `around the house/window` with `picOpened:false` -> rule 8 · P8 object `classroom/notebook` re-added with `shape:'rectangle'` and no `picOpened` -> rule 8 · P9 base instruction "Tick the right name." -> rule 6 · P10 pt title "Formas" -> rule 7 · P11 `inventory.hexagon:false` with a hexagon riddle -> rule 9 · P12 de title containing "kostenlos" -> rule 7 · **render:** PR1 a square card carrying a `rectangle` tag -> square / rectangle rule · PR2 an F1 rectangle row containing a square -> same · PR3 swap two `data-lcs-kind` stamps -> the gate must stay GREEN (it never reads them; a red gate here is itself a defect) · PR4 A's old obtuse (2.9,1) drawn at R 60 -> "min caliper 25.5 < 30" · PR5 tag width 110 -> fi `suorakulmio` overflow · PR6 F2 `clock` resolved through `pictureFor` to `around the house/clock` -> "src !== fileUri(bank entry)" · PR7 the answer tag forced to slot 0 on every card -> slot spread · PR8 an F1 near-miss `gap` at 0.10 -> "visible gap < 10" · PR9 an F4 riddle forced to 4 lines -> bubble height · PR10 F3 `rulingBlock` with a starter string -> "ruling row not empty" · PR11 base with `turnedMin:3` read from a level-index guard (`difficulty === 2`) on a face config -> the config guard fires before render · PR12 F5 rectangle card given (1,2) -> "square completion exists".

**Page reads:** `bank('2d-shapes', loc)`, `primitives/flat-shape.js`, `fileUri(theme, noun)` of the pinned bank objects, `displayWord` (validator only); NEVER `image-vocabulary.js`, `pictureFor`, `objForms` or `approved-words-*.json` at render.

## 6 SEO plan

| face | title pattern (Germanic en / de / nl · Romance es / pt / fr / it · Nordic sv / da / no + fi) | meta MIDDLE (en; the child's instruction; whole 120-170 measured by `tools/measure-instruction-window.js`, exists, m) | coordinate |
|---|---|---|---|
| base | 2D Shapes · Geometrische Formen benennen · Vlakke figuren · Figuras geométricas planas · Figuras geométricas planas · Les figures planes · Figure geometriche piane · Geometriska former · Geometriske figurer · Geometriske figurer · Tasokuviot | Look at each shape, even the turned and skinny ones, and circle its name | `{type:'2d-shapes', mode:'base', theme:'', level:<K>}` |
| F1 | 2D Shapes: Real or Not? · Geometrische Formen erkennen · Vlakke figuren herkennen · Reconoce las figuras geométricas planas · Reconhecer figuras geométricas planas · Reconnaître les figures planes · Riconoscere le figure geometriche piane · Känna igen geometriska former · Genkend geometriske figurer · Kjenne igjen geometriske figurer · Tunnista tasokuviot | Read the name in each row and circle every shape that really is that shape, not the ones that only look close | `mode:'real-or-not'`, G1 |
| F2 | 2D Shapes Around Us · Geometrische Formen in der Umwelt · Vlakke figuren om je heen · Figuras geométricas planas en objetos · Figuras geométricas planas no dia a dia · Les figures planes autour de nous · Figure geometriche piane intorno a noi · Geometriska former i vardagen · Geometriske figurer omkring os · Geometriske figurer rundt oss · Tasokuviot ympärillämme | Look at a clock, a door, a pizza and more, and color the shape each one has: the circle or the rectangle | `mode:'around-us'`, K |
| F3 | 2D Shapes: Write the Names · Geometrische Formen: Namen schreiben · Vlakke figuren: namen schrijven · Escribe el nombre de las figuras planas · Escreva o nome das figuras planas · Écris le nom des figures planes · Scrivi il nome delle figure piane · Skriv namnet på geometriska former · Skriv navnet på geometriske figurer · Skriv navnet på geometriske figurer · Kirjoita tasokuvioiden nimet | Look at each shape and write its name on the line, using the names in the box | `mode:'write-name'`, G1 |
| F4 | 2D Shape Riddles · Geometrische Formen: Rätsel · Raadsels over vlakke figuren · Adivinanzas de figuras geométricas planas · Adivinhas de figuras geométricas planas · Devinettes sur les figures planes · Indovinelli sulle figure geometriche piane · Gåtor om geometriska former · Gåder om geometriske figurer · Gåter om geometriske figurer · Tasokuvioarvoitukset | Read each riddle about sides and corners and circle the name of the shape | `mode:'riddles'`, G1 |
| F5 | Draw 2D Shapes on Dot Paper · Geometrische Formen zeichnen im Punktefeld · Vlakke figuren tekenen op stippen · Dibuja figuras planas en puntos · Desenhe figuras planas na malha pontilhada · Trace les figures planes sur les points · Disegna figure piane sui puntini · Rita geometriska former på prickar · Tegn geometriske figurer på prikker · Tegn geometriske figurer på prikker · Piirrä tasokuvioita pisteisiin | Read the shape name and join the dots to draw it, starting from the thick line where there is one | `mode:'dot-draw'`, K |

All titles are candidates the panels rewrite (<= 70, no worksheet-word, base = the bare compound head except de, each face adds ONE noun / verb, never an adjective). `coordinate.mode` is ALWAYS the face's mode string (base `'base'`), `coordinate.theme:''`, level = the K key for base / F2 / F5 and the G1 key for F1 / F3 / F4. h1 = title; eyebrow = level label; strand chip = the Geometry row literal (framework NAME only in non-EN prose: Lehrplan, SEP/NEM, BNCC, programmes officiels, Indicazioni nazionali, SLO kerndoelen, Lgr22, Fælles Mål, LK20, OPS 2014). JSON-LD `LearningResource` with the §1 `educationalAlignment` (en codes; no `targetUrl`); pt G1 prose cites EF01MA14 verbatim. No title, meta or landing promises an answer key (printable-only decks ship none, nt10-D ruling). The meta lead `seo.words.free_printable` is metadata only; no visible copy claims "free". `topicMeta['2d-shapes']` >= 50 chars x11 + `skill-sentences.<loc>.json['2d-shapes']` via a `register-b4-en-content.js` clone (exists, m).

**Non-cannibalisation** (whole-landing 3-gram Jaccard, `scripts/seo-landing/gate.js` FAIL >= 0.80 / WARN 0.65; *est.*, the gate measures):

| pair | what the copy says differently | est. |
|---|---|---|
| base vs F3 | circle one of three names beside a turned shape vs write the name on a line from a word box; K vs grade 1 | 0.20 |
| base vs F1 | a shape and its name vs a name and the shapes that are really it, near-misses | 0.12 |
| F1 vs F4 | drawn near-misses vs text riddles, no drawing | 0.10 |
| base vs F4 | shape to name vs clue to name | 0.15 |
| F2 vs any face | real objects, "around us / found at home", colour | <= 0.08 |
| F5 vs any face | dots, draw, the thick line | <= 0.08 |
| base vs `matching` name x `shapes` ("Picture Word Match for Kindergarten – Shapes") | exact turned outlines and circling vs library art joined by lines; never "match" / "picture word" | 0.10 |
| de base vs de geometry K "Geometrische Formen – Arbeitsblätter Kindergarten" (m) | "benennen" + turned shapes vs sides and corners | 0.25 |
| es / pt / it / fr base vs the geometry K landings (m: "…para preescolar – contar lados y esquinas", "formas geométricas educação infantil – lados e cantos", "Schede forme geometriche infanzia – lati e angoli", "Formes géométriques – exercices") | "planas / piane / figures planes" + names; never "lados / lati / cantos / côtés" | <= 0.15 |
| base vs K-070 "Shape Hunt" / de "Formenjagd" | never hunt / find / Jagd / caza | 0.05 |
| F1 vs K-080 "Which Shape Is Different?" | never different / odd / passt nicht | 0.05 |
| F4 vs K-075 "Count the Sides" | never "count"; riddles | 0.08 |
| F2 vs G2-243 "Solid Shapes Around Us" | FLAT circle / rectangle, K vs solid shapes, G2 | 0.20 |
| F5 vs dot-to-dot / grid-copy | draw a named shape vs join numbered dots / copy a model | 0.06 |
| any face vs tangram K-353 | naming exact single shapes vs composing a picture from pieces | 0.05 |

Boundary sentence on every landing: "Your child names flat shapes, including turned and skinny ones, and finds them in real things. Counting sides and sorting shapes are on the Geometry pages; building pictures from pieces is on the Tangram page."

## 7 Hub visibility contract

A face appears under `2d-shapes` on `/[locale]/worksheets` IFF all four hold: (1) `apps['2d-shapes']` exists in `frontend/config/topics-taxonomy.json` with `default_subject:'math'` (ABSENT today, m; missing = rendered NOWHERE in the rail); (2) `axes['exercise-type']['2d-shapes']` has `slug` + `name` in all 11 locales (§1 table B, slugs collision-free, m); (3) exactly one landing per face per locale with `coordinate.type === '2d-shapes'` verbatim, `mode` per §6, `theme:''`, the level key of §1 (K for base / F2 / F5, G1 for F1 / F3 / F4), a unique slug (never the en deck slug `2d-shapes-attributes` of G2-241, m) and `canonicalDeckSlug` = the published deck; (4) the landing JSON committed AND deployed (per-process cache).

Gate: `node scripts/verify-hub-type-rows.js --keys=2d-shapes` (exists, m; expectations from `b5-designs/hub-expectations.json`, exported by `tools/export-hub-expectations.js --batch=b5`; poison = drop one landing / drop `apps['2d-shapes']` must FAIL).

**Expected rows per locale:** en 6 · de 6 · es 6 · pt 6 · fr 6 · it 6 · nl 6 · sv 6 · da 6 · no 6 · fi 6 = **66**. No face is refused in any locale: the pools are the 4 core names (all 11 have them in the vocab, m), 8 riddles authored per locale, 9 locale-neutral pictures, and no face depends on a grammar feature a locale lacks. Contingencies recorded, none expected to fire: a panel refusing the 45 degree square (OPEN 2: it becomes a 30 degree square in ALL locales, 0 rows lost); a panel ruling the lollipop not a circle (drop it; 4 circles remain, d2 still 4/4, 0 rows lost).
