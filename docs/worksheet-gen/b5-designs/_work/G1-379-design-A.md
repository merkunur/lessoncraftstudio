# G1-379 `maps` : DESIGN A (nt10-E, designer A, 2026-09-23)

Read: `_ROLE-DESIGN.md`, `_STUDIO-BRIEF.md`, `_SUBSTRATE.md`, `_PANEL-FINDINGS.md` (lock row 7 + the maps ruling), the maps sections of the four `_work/_selection-*.md`, `_work/G1-379-pedagogy.md` (the content contract: six faces, four NEW primitives, no library picture). Looked at (Read on PNG): `out/b2-probe-en/G2-279-null-d2-en.png` (grid-coordinates: labelled 8x8 grid, codes in a coral legend), `out/b4-sweep/en/G3-385-null-d2-en.png` (water cycle: palette-only diagram, coral numbered discs, 2-column numbered writing lanes), `out/b4-sweep/en/K-356-null-d2-en.png` (`.ws-match` badges to word tiles). Read code: `primitives/water-cycle.js` (the NEW-primitive pattern: viewBox geometry in the header, anchors + hosts exported, render-measuring gate), `primitives/_tokens.js`, `templates/components-b4/weather-symbols.js` (`cycleLabels`), `templates/components-b3/ordinal-numbers.js` (`blankNumeralBox`), `templates/components-b2.js` (`wordBank`, `rulingBlock`), `templates/components-b3/hundreds-chart-puzzles.js` (`chartCompass`, the arrow legend this type must not resemble). Measured: no Natural Earth or topojson data anywhere in the repo or `node_modules` (m, `find -iname "*110m*"`, `ls node_modules | grep geo` = only `geoip-lite`). No library picture is named in this file, so none is opened; the pedagogy's opened-picture ruling (camping/compass, classroom/map, camping/map REFUSED) stands and every map mark below is drawn by a primitive. Widths marked *est.* were not measured in a real render. No em-dashes.

## Boundary

This page is NOT `grid-coordinates` G2-279 (+G2-302/303/308: a labelled letter-number grid, a code list, locate a cell), NOT `position-words` K-064..067 (on/under/left/right relative to the child), NOT `treasure-hunt` compass mode (walk "2 north, 3 east" over a grid, live in 8 locales), NOT `hundreds-chart-puzzles` G1-310 `chartCompass` (a +1/-1/+10/-10 arrow legend), NOT `weather-symbols` K-356 (symbols that stand for weather), NOT `mazes`/`picture-path` (routes). It owns the MAP AS A REPRESENTATION: a key, a plan seen from above, a compass rose with the locale's letters, directions as one-look relations, continents and oceans on an honest world map. **Visual signature: every face is a real printed map sheet.** A teal neat line (double frame) around the map, a boxed legend INSIDE the frame on the plan faces, a small north arrow carrying the locale's N letter in the map corner, land white and water tealSoft with a dark coastline, no grid lines and no axis labels anywhere (the G2-279 fence is visible from across the room: no letters or numbers along any edge).

## 1 Page concept (base: Read the Map Key, G1)

**"The park map on the wall."** The upper two thirds of the page is one framed map sheet: a small park drawn strictly from above (a road, a river with a bridge, a dashed footpath, and 16 to 20 plan-view symbols), with its legend box docked inside the right side of the frame exactly where a real map puts it, and a north arrow in the top corner. Below the map, a single "count strip" of five cards, each card a key WORD over an empty numeral box. The child's loop is: read the word on a card, find that word in the legend, see its symbol, hunt that symbol on the map, count, write the number. The legend is the only bridge (cards never print the symbol), so the page cannot be done without reading the key.

Why top quality: ONE focal apparatus (the map sheet, 639 x 440, the biggest object on any G1 page in the catalogue), the answer surface is small and calm (one row of five boxes), no picture from the library (every mark is a flat plan symbol, so nothing on the map is drawn from the side, which is the lie a picture map tells), and the symbols are designed so a B&W photocopy keeps all eight apart by SHAPE first and VALUE second. The house symbol is literally the F1 top view of the house model, so the family teaches one idea across faces: *a map symbol is the thing seen from above*.

Deliberate departure from the pedagogy file (for the critic): the pedagogy's `tent` symbol is "a coral triangle". A triangle is the SIDE view of a tent, the exact side/top mix this family teaches against. Design A draws a dome tent from above (coral disc with a white seam cross). The key is the bridge, so recognisability is not required, only distinguishability; the plan view keeps the family honest.

## 2 Layout (d2, body budget 722, lane 639 at default padding)

Worst-case chrome: three-line title + three-line instruction = 722 body; fi four-line title = 677. Every stack below is checked at both.

```
BASE d2 (G1)                                                        y (px)
+-------------------------------------------------------------------+  0
| MAP SHEET  639 x 440   outer frame teal 3, radius 16, fill white   |
| +-- inner neat line: grid 1.5 at 6 inset -----------------------+ |
| | FIELD 431 x 416 (x 12..443, y 12..428)   | LEGEND 172 x 416    | |
| |                                  [N]     | (x 455..627)        | |
| |   road (double line) / river / path      |  keyTitle  (2 lines | |
| |   16..20 plan symbols @ 44 px            |   reserve, 44)      | |
| |   gap >= 8 between symbols, >= 6 to bands|  6 entries x 52     | |
| |   north arrow 40 x 56 in field top-right |   [sym 40][word]    | |
| |   (exclusion rect 56 x 72)               |  word box 102 wide  | |
| |                                          |  2-line wrap @ 17px | |
| +------------------------------------------+---------------------+ |
+-------------------------------------------------------------------+  440
   spacer: clamp(20px, slack/3, 56px)                                   ~ 468
+-----------+ +-----------+ +-----------+ +-----------+ +-----------+
| CARD 119 x 120, white, teal 2, radius 12, gap 11 (5x119 + 4x11 = 639)|
|  word Nunito 800 17, <= 2 lines, box 44 high                         |
|  blankNumeralBox 64 x 48 (dashed coral), centred                     |
+-----------+ +-----------+ +-----------+ +-----------+ +-----------+  ~ 588
```

Sum: 440 + 28 + 120 = **588** (722: slack 134; 677: slack 89; 814: slack 226). The stack is `display:flex; flex-direction:column; justify-content:center`; the spacer between map and strip takes `clamp(20px, slack/3, 56px)`, the rest splits top/bottom. Nothing is `1fr`-stretched: the map is a fixed-aspect SVG and the cards are fixed, so slack is whitespace, never a bigger box.

Legend column: 172 wide, padding 10: symbol 40 + gap 10 + word 102 (Nunito 800 17 ~ 8.3 px/char *est.* = 12 chars per line, 2 lines max). Legend height: 10 + 44 (title) + 6 x 52 + 5 x 4 + 10 = **396 <= 416**. d3 (8 entries): rows 44, symbol 36: 10 + 44 + 8 x 44 + 7 x 3 + 10 = 437 > 416, so d3 uses a 2-column legend (2 x 4 entries, 86 wide each, word 36px-symbol + 44 word) *est.*; d3 is unpublished.

Field capacity (d2): field 431 x 416 = 179,296 px²; bands (road 20 + river 24 + path 2, each crossing the field once) <= 22 % by rule; north-arrow exclusion 4,032 px²; free ~ 135,800 px². 20 symbols x (44 + 8)² = 54,080 px² = **40 % density** (sampling feasible, reads calm). Symbol floors: placed 44 (G1 min element 44), legend 40, strip word 17, numeral box 64 x 48 (G1 answer numeral 26 fits a 48 box).

## 3 Ladder (base)

| key | d1 | d2 (ships) | d3 |
|---|---|---|---|
| layout | undefined | undefined | undefined |
| skeleton | S1 | seeded S1/S2/S3 | seeded S1/S2/S3 |
| keySize | 4 | 6 | 8 |
| asked (cards) | 4 | 5 | 6 |
| counts | 1..4 | 1..5, >= 4 distinct | 1..6, >= 5 distinct |
| unaskedKey | 0 | 1 (count 1..3, a live distractor) | 2 |
| nearMiss | none | tree + bush both in key, >= 1 asked | tree + bush both asked |
| rowsShowSymbol | true (scaffold) | false | false |
| symPx (placed) | 48 | 44 | 40 (G2 floor 36 ok; d3 is still G1, so 40 is BELOW the 44 floor; d3 stays unpublished or uses 44 with 24 max placed) |
| keySymPx | 44 | 40 | 36 |
| totalPlaced | <= 12 | <= 20 | <= 24 |
| lines | road | road, river (+ bridge), path | road, river, path, 2 bridges |
| legend cols | 1 | 1 | 2 |

d2 is the best page: the only level with a live distractor legend row AND the near-miss AND no scaffold.

## 4 Answer-hiding + uniqueness

- **Base:** the map shows every symbol; the answer is a count the child derives, the box is empty (`blankNumeralBox({answer:n})`, stamps `data-lcs-answer`). Cards print the WORD only (never the symbol at d2). Single answer by construction: count of `[data-lcs-sym=<id>]` in the field. Wrong is visible: a teacher sees e.g. "3" where the map has 4 bushes; the most likely error (counting trees as bushes) produces a number that is exactly the tree+bush sum, which the teacher recognises. Placement rules: no symbol touches another (>= 8 px), none on a band, none partly outside the field, none inside the north-arrow exclusion, bridges only where a road or path crosses the river.
- **F1:** both columns printed, no line drawn; pairs by model id; right column is a derangement (not identity, not reversal).
- **F2:** each rose prints ONE letter; three boxes empty; clockwise order fixes the rest. Turned roses carry no N marker, so a wrong guess "N is up" is visibly wrong against the given letter.
- **F3/F4:** numbered discs on the map, names in a bank, empty writing lanes (F3) or empty numeral boxes beside index names (F4); the map carries no name and no colour grouping.
- **F5:** plan shows places; row shows start + direction word + three chip symbols, none circled; exactly one chip lies in the sector.

## 5 Primitives / components

**Reused (exact names + file):** `blankNumeralBox` (`templates/components-b3/ordinal-numbers.js`, via the b3 barrel) for base cards and F4 index boxes · `cycleLabels({lanes, laneW, laneH, glyphH, perRow})` (`templates/components-b4/weather-symbols.js`, b4 barrel) for F3 numbered writing lanes (it already prints a 44 px numeral chip + a `writingRow` lane in a `.ws-blankbox`, stamps `data-lcs-label data-lcs-n data-lcs-anchor`) · `wordBank({words, wordPx:17})` (`templates/components-b2.js`) for the F3 name bank · `.ws-match` / `.ws-match-col` / `.ws-match-item` / `.ws-match-dot` classes (page.css, as `types/_shared/science-pair-match.js` uses them) for F1 · `cardGrid` (`templates/layouts/card-grid.js`) for F2 · `svgRoot, el, circle, line` (`primitives/_svg.js`) and `primitives/_tokens.js` for all drawing.

**NOT used:** `coordGrid`/`coord-grid.js` (the G2-279 fence: no labelled grid may appear) · `chartCompass`/`arrowGlyph` (arrow legend, reads as hundreds-chart moves) · `sceneStage`/`iconScatter` (library pictures in perspective; the family draws only plan symbols) · `symbolBadge`/`symbolMatch` (weather concepts, library art) · `camping/compass`, `classroom/map`, `camping/map` (REFUSED in the pedagogy file) · `waterCycle` (a side-section diagram, the opposite projection).

**NEW files:** `templates/components-b5/maps.js` (behind `templates/components-b5.js`, a clone of the b4 barrel) exporting `mapSheet`, `legendBox`, `northArrow`, `countStrip`, `viewPairRow`, `roseCard`, `worldMapCard`, `indexList`, `directionRow`. NEW primitives: `primitives/map-symbol.js`, `primitives/compass-rose.js`, `primitives/top-side-view.js`, `primitives/world-map.js` + generated `data/b5/world-map.js` + the offline tool `tools/build-world-map.js`. Gates: `qa/verify-map-symbols.js`, `qa/verify-compass-rose.js`, `qa/verify-top-side-view.js`, `qa/verify-world-map.js` (each measures the RENDER, the water-cycle pattern), plus the family gate `qa/verify-b5-maps.js` (pedagogy §D).

### 5.1 `primitives/map-symbol.js`

API `mapSymbol({id, px = 44}) -> {svg, meta:{id}}`; root `<svg data-lcs-prim="map-symbol" data-lcs-sym-id=<id>>`; throws on unknown id or `px < 36`. All in **viewBox 0 0 48 48**, centre (24,24), all plan view, no letter or digit in any symbol.

| id | geometry (viewBox units) | value in greyscale |
|---|---|---|
| house | rect x8 y12 w32 h24 rx2 fill teal; ridge line (8,24)-(40,24) white 2.5 (a gable roof from above; identical to the F1 house top view) | dark block + white line |
| tree | crown: 8-lobe scalloped circle, lobes = 8 arcs of r6 centred on a circle r15 around (24,24), outer radius 21; fill tealSoft, stroke teal 2.5; trunk dot circle (24,24) r3.5 fill ink | light disc, scalloped rim, dark dot |
| bush | 3-lobe blob = union of circles (19,27) r7, (29,27) r7, (24,19) r7 (bbox ~24 x 22); fill tealSoft, stroke teal 2; NO dot | small light blob, smooth rim, no dot |
| pond | closed path M8 24 C8 13 20 10 28 12 C38 14 41 22 39 29 C37 36 26 39 17 36 C11 34 8 30 8 24 Z; fill white, stroke teal 3; two waves M15 22 q4 -3 8 0 t8 0 and M19 30 q4 -3 8 0 t8 0, teal 1.5 | white blob, dark outline |
| bench | rect x6 y19 w36 h10 rx3 fill ink; slat lines y 22.5 and 25.5, x 9..39, white 1.2 | darkest thin bar |
| tent (dome, from above) | circle (24,24) r15 fill coral, stroke ink 2; seam cross (13.4,13.4)-(34.6,34.6) and (34.6,13.4)-(13.4,34.6) white 2.5 | mid-grey disc, white X |
| flowerBed | bed edge circle (24,24) r20 fill white, stroke teal 1.5; 6 coral dots r4 on circle r12 at 0,60..300 deg; centre dot r4 fill coralSoft stroke coral 1.5 | ring of mid-grey dots |
| bridge (key form) | tealSoft river stub rect x0 y16 w48 h16; two teal 3 lines y 13 and y 35, x 10..38; end flicks (10,13)-(6,9), (38,13)-(42,9), (10,35)-(6,39), (38,35)-(42,39) teal 3 | ][ over a light band |

Bridge on the map is not a symbol instance but a `mapSheet` overlay drawn ACROSS the river at the crossing (the two lines run the river width + 16 along the road's direction), still stamped `data-lcs-sym="bridge"` for counting.

Line features (drawn by `mapSheet`, never counted, never in a legend): road = two teal 2 lines 16 apart with white between (total 20); river = tealSoft band 24 wide with teal 2 edges, wavy (quadratic wave amplitude 6, period 60); path = ink 2, dash 8 6.

Gate `qa/verify-map-symbols.js`: renders each symbol at 44 px, binarises the silhouette (alpha > 0), asserts pairwise silhouette IoU <= 0.55 for every pair (tree vs bush measured on the render: bush silhouette sits inside tree's, IoU ~ 0.35 *est.*), and pairwise mean-luminance difference >= 12 % OR IoU <= 0.35 for every pair (greyscale distinguishability, luminance computed with Rec.601 on the rendered pixels); asserts only token hexes; asserts no `<text>` element. Poison: a bush drawn at tree size with a trunk dot must FAIL.

### 5.2 `primitives/compass-rose.js`

API `compassRose({letters:{n,e,s,w}, rotation = 0|90|180|270, given = null | 'n'|'e'|'s'|'w', blanks = [], marker = rotation === 0, px = 196}) -> {svg, meta:{tips:[{pos:'up'|'right'|'down'|'left', dir, letter, blank}]}}`. **viewBox 0 0 200 200**, centre (100,100). Throws if `px < 96`, if a letter is empty, if `marker && rotation !== 0` (pedagogy P12), or if rotation is not a multiple of 90.

- Four points, each a kite: tip at distance 54 from centre, shoulders at (±13, 13) relative to the axis, back to centre. Up point: M100 46 L113 87 L100 100 L87 87 Z. The others are this path rotated 90/180/270 about (100,100). Each kite split along its axis into two halves: the clockwise half fill teal, the other half fill white with teal 2 stroke (the classic rose shading, dark/light in greyscale).
- Ring: circle r30 stroke grid 2, no fill, drawn under the points. Centre pin circle r4 fill ink.
- N marker (upright only): the N point's halves filled coral and coralSoft (stroke coral 2). The marker is FILL only, never a letter, so "which tip is north" is apparatus.
- Letter boxes: 40 x 40 rx 8, centred at radius 80 on each axis: up (100,20), right (180,100), down (100,180), left (20,100). Gap tip to box = 6. Given: fill white, stroke teal 2, letter Baloo 2 700 26 viewBox units, ink, centred, `data-lcs-given`. Blank: fill white, stroke coral 2.5 dash 6 4, `data-lcs-answer=<letter>` (hidden stamp), `data-lcs-dir`.
- Letters stay upright regardless of rotation (rotation moves WHICH direction sits at each position, it never turns the glyphs).
- Stamps: root `data-lcs-rot`, per tip `data-lcs-dir` + `data-lcs-pos`.

At px 196 the letter renders 25.5 px and the box 39 px (G2 answer floor 22 / element 36 met). At px 120 (F5 corner rose, all given, marker on) letters 15.6 px, boxes 24 px: legal (>= 9 px) and a reading aid only.

Gate `qa/verify-compass-rose.js`: from the RENDER, finds each box's centre, classifies its position by angle, recomputes dir = DIRS[(posIndex - rotation/90) mod 4] and asserts the stamped letter; asserts coral appears only on upright roses; poison: a rotated rose with the marker, and a rose whose right box carries S at rotation 0, must FAIL.

### 5.3 `primitives/top-side-view.js`

API `topSideView({model, view:'side'|'top', px = 80}) -> {svg, meta:{model, view, xExtent:[x0,x1]}}`; **viewBox 0 0 64 64**; `viewGlyph({from:'side'|'above', px = 40})` draws the two column heads (an eye outline, lens circle, and a coral arrow pointing right for side, down for above; no word).

**Orthographic registration rule (asserted):** for every model, the side view and the top view share the same x-extent (the width seen from the front equals the width seen from above), and the top view is "looking down with the front of the object at the bottom". This makes every pair correct by construction and gives the gate a numeric check.

| model | side view (front elevation) | top view (plan) | x-extent |
|---|---|---|---|
| cup | body M20 20 L44 20 L42 50 L22 50 Z white/teal 3; handle M44 26 C54 26 54 42 43 42 teal 3 | circle (32,33) r12 white/teal 3; inner r8 tealSoft; handle nub rect x44 y30 w8 h6 rx2 teal 3 | 20..54 |
| bucket | M14 20 L50 20 L44 52 L20 52 Z white/teal 3; handle M14 20 Q32 2 50 20 ink 2.5 | rim circle (32,32) r18 white/teal 3; bottom circle r12 grid 2; handle chord (14,32)-(50,32) ink 2.5 | 14..50 |
| roundTable | slab rect x8 y20 w48 h6 teal; pedestal x29 y26 w6 h22 teal; foot x20 y48 w24 h4 teal | circle (32,32) r24 tealSoft/teal 3 (legs hidden) | 8..56 |
| rectTable | slab rect x6 y20 w52 h6 teal; legs x10 y26 w5 h26 and x49 y26 w5 h26 teal | rect x6 y16 w52 h32 tealSoft/teal 3 (legs hidden: the pedagogy's "4 corner dots" is dropped as dishonest, a table top hides its legs) | 6..58 |
| bed | frame x14 y38 w36 h8 teal; headboard x14 y22 w5 h24 teal; mattress x19 y32 w31 h7 white/teal 2 | rect x14 y4 w36 h56 white/teal 3; headboard bar x14 y4 w36 h4 teal; pillow rect x19 y10 w26 h9 rx4 tealSoft; blanket fold y26 teal 2 | 14..50 |
| chair | back post (20,10)-(20,52), seat (20,34)-(44,34), front leg (44,34)-(44,52), teal 4 round caps | seat square x20 y26 w24 h24 tealSoft/teal 3; back bar x20 y20 w24 h6 teal | 20..44 |
| car | body M8 44 L8 34 L18 32 L25 22 L41 22 L48 32 L56 34 L56 44 Z white/teal 3; wheels (20,46) r6 and (44,46) r6 ink; window tealSoft M27 25 L39 25 L44 32 L22 32 Z | rounded rect x8 y6 w48 h52 rx10 white/teal 3; windscreen x12 y16 w40 h8 tealSoft; rear window x14 y44 w36 h6 tealSoft (wheels hidden) | 8..56 |
| house | wall x12 y32 w40 h24 white/teal 3; roof triangle (8,32)-(32,10)-(56,32) teal; door x28 y42 w8 h14 ink | rect x8 y14 w48 h36 teal; ridge (8,32)-(56,32) white 2.5 (== map-symbol house) | 8..56 |
| tree | trunk x29 y36 w6 h20 ink; crown circle (32,24) r16 tealSoft/teal 3 | 8-lobe scalloped crown outer r21 tealSoft/teal 2.5 + trunk dot r3.5 ink (== map-symbol tree, scaled) | 11..53 (crown) |
| cone | M22 52 L32 8 L42 52 Z coral; stripe band M26 34 L38 34 L36 26 L28 26 Z white; base plate x16 y52 w32 h5 ink | base square x16 y16 w32 h32 ink; circle (32,32) r10 coral; stripe ring r6 white 2.5; tip dot r2 coral | 16..48 |

The tree x-extent differs between crown (side r16) and plan (r21): the gate tolerates +/- 6 viewBox units for the two organic models (tree, cup handle) and 0 for the rest. Gate `qa/verify-top-side-view.js`: renders both views, measures the ink bbox x-extent on the render and asserts the registration within tolerance; asserts no text; asserts each pair's top view differs from its side view (silhouette IoU < 0.8, pedagogy excludes ball/cube/box).

### 5.4 `primitives/world-map.js` + `data/b5/world-map.js` + `tools/build-world-map.js`

**Source.** Natural Earth 1:110m physical `ne_110m_land` (public domain, naturalearthdata.com; the GeoJSON of the nvkelso/natural-earth-vector repository, release tag recorded), vendored ONCE as `scripts/worksheet-gen/tools/vendor/ne_110m_land.geojson` with its SHA-256 written into the generated module header. If `ne_110m_land` does not carry the Caspian as a hole (UNKNOWN, engineer checks), the Caspian polygon is taken from `ne_110m_lakes` (vendored alongside, same SHA rule) and punched as a water hole: it is needed because the Europe/Asia line runs through it. No other lake is drawn. No npm dependency: the tool is plain Node (JSON parse, projection, simplification, rasterisation written in the tool, ~400 lines *est.*). Adding a vendored data file is not a `package.json` change.

**Projection: Natural Earth I** (Savric, Jenny, Patterson, Petrovic, Hurni 2011; closed-form, public), central meridian **11 deg E**:

```
x = lam * (0.8707 - 0.131979 p^2 + p^4 * (-0.013791 + p^4 * (0.003971 p^2 - 0.001529 p^4)))
y = p * (1.007226 + p^2 * (0.015085 + p^4 * (-0.044475 + 0.028874 p^2 - 0.005916 p^4)))
(lam = lon - 11 deg in radians, wrapped to (-pi, pi]; p = lat in radians)
```

Why not the pedagogy's equirectangular: equirectangular stretches the far north and south without limit (Greenland reads almost the size of South America, Antarctica a giant bar); Natural Earth I is the compromise projection used by classroom world maps, keeps shapes recognisable, and needs no library. Why 11 deg E and not 10: the seam is then 169 deg W, which falls in the Bering Strait BETWEEN Cape Dezhnev (169.7 deg W, wraps to the right edge with the rest of Asia) and Cape Prince of Wales (168.1 deg W, stays on the left with America). At 10 deg E the seam (170 deg W) would cut the tip of Chukotka. The tool asserts that after wrapping no kept land ring crosses the seam except Antarctica (closed along the bottom edge).

Extents (computed from the formula, m by hand): x span 5.4706 units; y(84 N) = 1.3822, y(58 S) ~ 1.017 *est.*, y(90 S) = 1.4224. **Crop north 84 N** (Greenland's north cape is 83.6 N; the pedagogy's 75 N would cut Greenland, dishonest). Crop south: 90 S when the locale set includes Antarctica, 58 S otherwise (Cape Horn 55.98 S plus margin). Render aspect: 1.951 with Antarctica (639 x 328), ~2.28 without (639 x 280 *est.*).

**Island rule.** Keep a land ring if its spherical area >= 20,000 km², plus a named keep list (Great Britain, Ireland, Iceland, Madagascar, New Zealand North and South, Sri Lanka, Tasmania, Sicily, Sardinia, Taiwan, Hainan, Hokkaido, Honshu, Kyushu, Cuba, Hispaniola, Borneo, Sumatra, Sulawesi, Java, New Guinea). Everything else is dropped, and the tool prints the dropped list for the log. **No country borders are drawn anywhere** (continent cuts only), which keeps every disputed border off a children's page.

**Simplification tolerance.** Douglas-Peucker in PROJECTED space with epsilon = **0.8 px at the 639 px render width** (0.00685 projection units); a ring that falls below 4 points or 12 px² at 639 is dropped unless on the keep list. Then coordinates are quantised to integers in a **viewBox 0 0 2000 H** (H = 2000 x y-span / 5.4706; 1 unit = 0.32 px at 639, sub-pixel). Stated tolerance: every simplified vertex within 0.8 px of the source outline at 639 wide (1 px at the 800 px print raster), i.e. visually lossless at print size. Output size target <= 40 KB *est.* (tool prints it).

**Continent regions (the membership, not the drawing).** The drawing is ONE land layer. Membership is computed by the tool on a raster (4 x the 639 render, i.e. 2556 px wide): each land pixel gets a region id from hand-authored lon/lat masks in the tool:
- Europe/Asia cut (lon, lat): (66.0 69.0) Baydaratskaya Bay, (60.0 67.0), (59.5 64.0), (59.0 61.0), (59.5 58.0), (59.0 55.0), (59.0 52.0) Ural crest, (58.6 51.2) Orsk, (55.0 51.5), (52.0 51.2), (51.4 50.0), (51.9 47.1) Ural River mouth, then through the Caspian to (48.5 41.8), Caucasus crest (46.5 42.6), (43.5 43.2), (40.0 43.4), Black Sea, Bosporus (29.0 41.1), Dardanelles (26.2 40.0), Aegean.
- Americas cut: Panama/Colombia border (77.2 8.7)-(77.9 7.2).
- Africa/Asia cut: Suez (32.3 31.3)-(32.6 29.9).
- Islands by representative point, with an override table: Greenland, Cuba, Hispaniola, Baffin, Vancouver -> northAmerica; Iceland, Great Britain, Ireland, Spitsbergen, Novaya Zemlya, Sicily, Sardinia -> europe; Madagascar -> africa; Japan, Sri Lanka, Taiwan, Hainan, Sakhalin, Borneo, Sumatra, Sulawesi, Java, Philippines -> asia; New Guinea (whole island), Tasmania, New Zealand -> oceania.
The DRAWN cut lines are the cut polylines clipped to land (sample every 2 px, keep segments whose midpoint lies on land), stroke ink 1.5, dash 4 3. A cut line is drawn ONLY between regions that belong to DIFFERENT members of the locale's `continentSet` (a merged "America" set draws no Panama line; Europe/Asia is drawn in every set because every panel set separates them *est.*, the gate asserts it from data, not assumption).

**Anchors.** For each region the tool runs a distance transform on the region raster and stores the pole of inaccessibility (max clearance point) in viewBox units plus its clearance; Europe's clearance is the tightest (the land between Baltic, White Sea, Black Sea and the Ural cut, ~ 16 px at 639 *est.*). Ocean anchors are lon/lat defaults the tool verifies on water in BOTH the simplified layer and the unsimplified source (so no anchor sits on a dropped island): pacific (-145, 5) and (160, 5) (one member, two discs), atlantic (-38, 25), indian (78, -22), arctic (38, 75.5) (Barents Sea, north of 70 N per the pedagogy rule), southern (20, -60). If a default fails clearance, the tool searches a 10 deg box for the max-clearance water point and records it.

**Data module shape** (`data/b5/world-map.js`, generated, force-added since `data/` is gitignored):
```
{ source:{file, sha256, release}, projection:{name:'natural-earth-1', lon0:11}, view:{w:2000, hFull, hNoAntarctica, yCut58S},
  land:[ 'M.. Z', ... ],            // quantised rings, drawing order largest first
  caspian:'M.. Z',
  cuts:{ europeAsia:[ 'M.. L..', ...], americas:[...], africaAsia:[...] },
  regions:{ northAmerica:{anchor:[x,y], clearance, bbox}, ... 7 },
  oceans:{ pacific:{anchors:[[x,y],[x,y]], clearance}, ... 5 },
  checkpoints:{ onLand:[{name, lon, lat, region}], onWater:[{name, lon, lat, ocean}] },
  mapOpened:{ by:'<engineer>', date:'YYYY-MM-DD' } }  // the human open, like picOpened
```

**Render API** `worldMap({w = 639, set, oceans = [], markers = []}) -> {svg, height, anchors}`: frame rect rx 12 teal 3 (clip-path inside); sea fill tealSoft; land fill white, stroke teal 1.5 (non-scaling); cut lines as above; markers = coral disc r15 with white halo 3, numeral white Baloo 2 700 20 px, `data-lcs-anchor=<memberId> data-lcs-n`; a member spanning several regions repeats its numeral on each region (pedagogy rule). `w < 480` throws (numerals must stay >= 20 px and Europe >= 50 px wide). A north arrow (5.5) sits in the South Pacific corner area (bottom-left water, lon -150 lat -45, verified on water).

**Verification** `qa/verify-world-map.js` (render-measuring, runs in the family gate):
1. Provenance: vendored file SHA-256 === module header.
2. Shape: for each region, projected area of the simplified land vs the unsimplified source within +/- 2 %; sampled Hausdorff distance <= 1.0 px at 639.
3. Position: 24 checkpoints projected and tested point-in-land on the RENDERED raster AND in the correct region: Cape of Good Hope, Cairo, Dakar, Mogadishu, Gibraltar, Oslo, Istanbul (Europe side 28.98 E 41.04 N), Moscow, Mumbai, Singapore, Tokyo, Beijing, Reykjavik, Nuuk, Anchorage, New York, Mexico City, Panama City (NA), Bogota (SA), Lima, Cape Horn, Sydney, Wellington, McMurdo (Antarctica, only when drawn). 8 water checkpoints (mid-Atlantic, both Pacific edges, Indian, Arctic, Southern, Mediterranean, Caspian) asserted on water.
4. Proportion (honesty statement, not a law invented from nothing): the projected area ORDER of Asia > Africa > North America > South America > Europe > Oceania matches real areas (44.6 / 30.4 / 24.7 / 17.8 / 10.2 / 8.5 million km²), and Greenland's projected area < 0.20 x Africa's (its true ratio is 0.07; the gate records the measured value so a projection change is visible).
5. Legibility at 639: Europe bbox width >= 60 px, New Zealand and Madagascar present (>= 6 px tall), Europe/Asia dashed cut visible (>= 40 px drawn), every anchor clearance >= 10 px (disc may overlap a coastline by <= 5 px, never cover a different region's land by > 5 px).
6. Human open: `qa/out/world-map-<set>.png` contact sheet at 639 and 480, opened with the Read tool by the engineer; `mapOpened` in the module is the gate (a module without it fails).

### 5.5 `templates/components-b5/maps.js` (layout components)

- `mapSheet({w=639, h=440, legend, skeleton, placed, northLetter, rng})`: frame + neat line + field + bands + symbols + bridges + `northArrow` + `legendBox`; stamps `[data-ws-content]`, per symbol `data-lcs-sym`, per legend row `data-lcs-key`. Skeletons S1..S3 are hand-authored band geometries in field coordinates (431 x 416): **S1** road enters left (0,150) and leaves right (431,196) as one cubic, river from (300,0) to (270,416) wavy, one bridge at the crossing, path from (60,416) to the road at (120,165); **S2** road vertical near x 118, river diagonal from (431,60) to (200,416), path loop in the lower right; **S3** river along the lower left as an arc, road L-shape top then right edge, path to the pond area. Engineer may retune coordinates, never the rules (bands <= 22 % of field, every symbol >= 6 px off a band, bridge only at a river crossing).
- `northArrow({letter, px=40})`: 40 x 56: letter box 24 x 22 on top (Baloo 2 700 18, ink), below it an arrow: kite M20 26 L30 54 L20 48 L10 54 Z, left half teal, right half white stroke teal 2. Same letter literal as `dirLetters.n`.
- `legendBox({title, rows:[{id, word}], symPx=40})`: white panel, teal 2, rx 10; title Baloo 2 700 18 (2-line reserve 44); rows 52 high `[symbol][word]`, word Nunito 800 17, line-height 1.15, max 2 lines, `overflow-wrap:anywhere` FORBIDDEN (a split word is a defect; the gate fails instead, 6).
- `countStrip({cards:[{id, word, answer}], cardW=119, cardH=120})`.
- `viewPairRow`, `roseCard`, `worldMapCard`, `indexList`, `directionRow`: see section 7.

## 6 Locale slot structure

| surface | slot (`maps.<loc>.json`) | font | box / reserve | floor |
|---|---|---|---|---|
| legend title | `keyTitle` (NEW, additive to the pedagogy bank: en Key, de Legende, fr Légende, es Simbología, pt Legenda, it Legenda, nl Legenda, sv Teckenförklaring, da Signaturforklaring, no Tegnforklaring, fi Karttamerkit: panels rule) | Baloo 2 700 18 | 152 wide, 2 lines | 18 |
| legend + strip words | `symbolWords.<id>` x 8 | Nunito 800 17 | legend 102 wide, strip 107 wide, 2 lines each; no single token may exceed the box at 17 px (gate measures; the panel re-authors, the code never shrinks) | 17 |
| north arrow + F5 rose + F2 given letters | `dirLetters` x 4 | Baloo 2 700 (18 / 15.6 / 25.5 px) | letter box 24 / 24 / 39 | 15.6 |
| F5 direction chip | `dirWords` x 4 | Nunito 800 18 | chip 118 wide (fi "pohjoinen" 9 chars ~ 81 px *est.*, +40 % = 113) | 18 |
| F3 bank / F4 index names | `continentNames`, `oceanNames` | Nunito 800 17 | bank wraps; index cell 150 wide, 2 lines | 17 |
| title / instruction | `strings.<mode>` | shell | shell | shell |

Longest-locale reserve: every word surface is sized for the en length x 1.4 or the measured longest panel literal, whichever is larger; the family gate renders all 11 locales and fails on any overflow or a word broken inside a token. **Diacritic glyphs in Baloo 2 at the letter boxes (Ø, Ö, Å, É, Ä, fi "Etelä") are UNKNOWN in the shell's subset (engineer must measure in a real render from `file://`)**; fallback if a glyph is missing: the letter surfaces switch to Nunito 800 at the same size (one config constant, not per locale). Only the four `dirLetters`, which are single graphemes, are at risk. Every word on the body is a stand-alone label (no frame inflects).

## 7 Five variation faces

All five are **CODE** on one additive `layout` knob (base `layout` undefined and byte-identical; each face stamps `data-lcs-layout`), guards keyed on `d.layout`, never on the level index. Face ids are allocated by the emitter: F1 `K-3xx` (K-371+), F2/F3/F5 `G2-3xx` (G2-360+), F4 `G3-3xx` (G3-392+).

**F1 `top-view` (K): "Bird's-Eye View".** Visual delta: no map at all; a two-column `.ws-match` page whose column heads are two wordless `viewGlyph`s (an eye with an arrow pointing right over the left column, an eye with an arrow pointing down over the right column). Left items: side view 80 px standing on a short teal 3 ground line (x-extent + 8) inside a cream card 112 x 100; right items: top view 80 px on a tealSoft "floor tile" square 100 x 100 rx 12 (the tile is the ground seen from above, the visual rhyme of the ground line). Match dots coral. Layout: heads 40 + 12, 5 rows x 100 + 4 x 22 = 588; total **640** (<= 677). K floors: views 80 >= 56. Verify hook: `data-lcs-model` + `data-lcs-view` on both columns, registration from the primitive meta, class-family limits (pedagogy), derangement. Query face: "bird's-eye view / Vogelperspektive / vue de dessus...".

**F2 `compass-rose` (G2): "Compass Rose".** Visual delta: the map disappears and the rose becomes the apparatus: `cardGrid` 3 cols x 2 rows of cream cards 202 x 220 (gap 16 horizontal via `(639 - 2x16)/3 = 202`, 20 vertical), each a `compassRose` at 196 px, upright roses first in reading order NOT guaranteed (positions shuffled so the three turned roses are not a block). Stack **460** (slack is whitespace, rows `minmax(220px, 260px)`). Verify hook: `qa/verify-compass-rose.js` per card + the pedagogy set rules (rotations {0,0,0,90,180,270}, each letter given >= 1, no marker on turned). Query face: "compass rose / Windrose / rosa de los vientos...".

**F3 `continents` (G2): "Label the Continents".** Visual delta: the park is replaced by the world: `worldMapCard` full lane (639 x 328 with Antarctica, 639 x ~280 without) with coral numbered discs, a `wordBank` of continent names above the lanes, then `cycleLabels({lanes, laneW:262, laneH:50, glyphH:24, perRow:2})` (item = 44 chip + 10 + 262 = 316; 2 x 316 + 7 = 639). Stack with Antarctica and 7 members: 328 + 14 + 69 (bank 59 + 10) + 6 + 4 x 50 + 3 x 8 = **641** (<= 677). Handwriting fit: longest expected name "Pohjois-Amerikka" 16 chars x ~13 px child handwriting at glyphH 24 *est.* = 208 < 262. Verify hook: `qa/verify-world-map.js` + pedagogy F3 rules (anchor count === set size, numeral on each member region, bank order not numeral order not alphabetical, Antarctica drawn iff in set, no colour grouping: land is ONE fill). Query face: "label the continents / Kontinente beschriften / los continentes...".

**F4 `continents-oceans` (G3): "Continents and Oceans", as a GAZETTEER INDEX (design A's proposal, deviation for the critic).** Visual delta: the same world map, discs now on land AND water (ocean discs identical in style, so the style never tells land from sea), and instead of a bank plus 12 writing lanes the page carries an atlas-style **index**: every continent and ocean name (mixed, not grouped, no run of 3 of one kind) in 3 columns, each entry `[name, Nunito 800 17, 150 wide, 2 lines][blankNumeralBox 44 x 40]` = 204 wide, 3 x 204 + 2 x 13 = 638. The child writes the MAP NUMBER beside each name: the land-or-sea decision is still the move, the answer is a numeral. Why: the budget measured here does not hold the pedagogy's written version: map 328 + bank of 12 names (3 wrapped lines, ~124 *est.*) + 6 lane rows x 44 + gaps = ~770 > 722. The index version: 328 + 16 + 4 rows x 48 + 3 x 8 = **560** (<= 677, calm). If the critic keeps writing, the fallback is map at 560 wide (h 287), lanes laneH 42: 287 + 10 + 124 + 8 + 6 x 42 + 5 x 6 = 711, which passes 722 but FAILS the fi 677 case; that is why A recommends the index. Verify hook: pedagogy F4 rules (ocean discs on water pixels, continents on land, Pacific two discs one member) + index: each box `data-lcs-answer=<n>`, index order !== numeral order, not land-then-sea. Query face: "continents and oceans / Kontinente und Ozeane / continentes e oceanos...".

**F5 `directions-on-map` (G2): "Directions on a Map".** Visual delta: the park map returns but without a legend: `mapSheet` field 510 x 290 with 7 places on a hidden 3 x 3 lattice (node x 85 / 255 / 425, y 50 / 145 / 240 in field coords; no grid line, no axis label), bands drawn between nodes; on the right of the sheet, outside the field, a `compassRose({px:120, blanks:[], marker:true})` with all four locale letters (the rose the child just learned in F2, now used). Below: 6 `directionRow`s, 54 high: `[start: white disc 52, teal 2, symbol 40][direction chip 118 x 44, coral 2 border, Nunito 800 18][rule][3 option chips: white disc 48, grid 2 border, symbol 40, gap 10]`, width 52 + 12 + 118 + 20 + 3 x 48 + 2 x 10 = 366, left-aligned in the lane with the rows centred as a block. Stack: sheet 300 + 16 + 6 x 54 + 5 x 6 = **670** (<= 677). Places: 7 of the 8 symbols minus `bridge`; a row's three chips never contain both tree and bush. Verify hook: pedagogy F5 (strict < 45 deg sector so lattice diagonals are in no sector; uniqueness recomputed from RENDERED symbol centres; distractor includes the opposite direction; no grid line, no axis label, no chip circled). Query face: "cardinal directions on a map / Himmelsrichtungen auf der Karte / puntos cardinales en el mapa...".

**Why these five:** they are the five distinct map ideas the base does not own (projection, the rose as a fixed order, directions as relations, continents, land versus sea), each with its own apparatus and query head, and together they form one ladder a teacher can see: K top view, G1 key, G2 rose then directions on the same park, G2/G3 the world. **First to cut: F4** (highest overlap with F3, Jaccard ~ 0.30 in the pedagogy estimate; above band in six locales; and it is the one face whose layout forced a deviation).

**Hub contract (restated):** `apps.maps` (default_subject `spatial-reasoning`, default_age_range `6-8`) and `axes['exercise-type'].maps` with `slug` + `name` in all 11 locales must exist (both measured ABSENT today); exactly one landing per face per locale with `coordinate.type === 'maps'`, `coordinate.mode` = the face's mode string (`'base'`, `'top-view'`, `'compass-rose'`, `'continents'`, `'continents-oceans'`, `'directions-on-map'`), a level key from the band table, `theme:''`, unique slug, `canonicalDeckSlug` = the published deck; committed and deployed. Gate: `scripts/verify-hub-type-rows.js` expects 6 rows per locale for `maps` (pedagogy records no refusal: 66/66).

## 8 Two alternatives + recommendation

- **Alt 1: "Town plan with a key colouring task"** (colour each symbol type with its legend colour, then count). Rejected: dies on a B&W printer, the colouring is the time sink not the map idea, and a colour legend drifts toward `read-and-color` / G2-279's colour groups.
- **Alt 2: "Classroom plan"** (a bird's-eye classroom: desks, door, board, teacher's desk as the base map, the fr "plan de la classe" idea). Strong for fr, but a classroom plan needs furniture symbols that overlap F1's models (table, chair) and would make base and F1 the same objects twice; its symbols are mostly rectangles, so greyscale distinguishability collapses (desk vs table vs board). Kept as a possible d3 skeleton only.
- **Chosen: "the park map on the wall"**, because it is the only concept where every symbol can be a DIFFERENT plan shape with a different greyscale value, where a near-miss (tree / bush) arises naturally, where the same sheet serves F5 (directions) without redrawing the family, and where the page visibly looks like a map (neat line, legend inside the frame, north arrow) rather than a worksheet about maps.

## 9 Risks, mitigations, print check

- **Long locales:** symbol words (pt "canteiro de flores", da "signaturforklaring" as a title) wrap to 2 lines by design; a single token wider than 102/107 px at 17 px is a panel re-author, measured per locale by the family gate. F5 direction chip sized for fi +40 %.
- **Greyscale:** symbols separated by shape first (`verify-map-symbols.js` IoU <= 0.55) and value second (teal ~ 38 % L, coral ~ 59 %, tealSoft ~ 88 %, ink ~ 21 %, all Rec.601 *est.*). Coral N marker vs teal halves on F2 reads as a lighter point on a B&W printer, which still marks north. World map: land white vs sea tealSoft is a faint grey step on cheap printers; the teal 1.5 coastline carries the shape; discs coral with white numerals and a white halo stay legible on both.
- **Pencil space:** base boxes 64 x 48; F3 lanes glyphH 24 in 50 px rows; F4 index boxes 44 x 40; F2 letter boxes 39 px; F5 chips are circled (48 px discs, 10 px gaps so a circle does not touch the next chip).
- **Cut lines:** none; nothing on this family is cut.
- **9 px floor:** smallest text is the F5 corner rose letter at 15.6 px.
- **World map honesty:** only a human sees whether the continents LOOK right: `mapOpened` gate + contact sheet. The lint cannot see a wrong-hemisphere mirror or a missing New Zealand; `verify-world-map.js` checkpoints and proportion order catch those mechanically.
- **Anchors in Europe:** the tightest clearance; disc may overlap coast by <= 5 px (gated), never another region.
- **Political:** no country borders; Europe/Asia cut along the conventional Ural-Ural River-Caspian-Caucasus line; the Caucasus variant (Kuma-Manych) is not drawn separately because no disc depends on it.
- **QA lint catches:** overflow, 9 px floor, palette, footer intrusion. **Only a human eye catches:** whether the park reads as calm (density), whether symbols look like what the key says they are, whether the world map is recognisable at 639 and 480.

## 10 Summary

1. The page is a real map sheet: neat line, legend inside the frame, north arrow with the locale's letter, and no grid or axis labels (the G2-279 fence).
2. Base G1: a park drawn from above with 8 plan symbols that stay distinguishable in greyscale (tree/bush near-miss), and a strip of 5 word cards with empty numeral boxes. Stack 588 of 722.
3. Four new primitives are fully specified: `map-symbol` (48 viewBox), `compass-rose` (200 viewBox, letters as locale data, coral N marker only when upright), `top-side-view` (10 orthographically registered model pairs), and `world-map` (Natural Earth 1:110m, Natural Earth I projection centred on 11°E, cropped at 84°N, Douglas-Peucker at 0.8 px, a 24-checkpoint verify and a human open).
4. The faces: F1 K bird's-eye match (640) · F2 G2 six roses (460) · F3 G2 continents with writing lanes (641) · F4 G3 continents and oceans as an atlas index of numbers (560; the written version does not fit fi's 677) · F5 G2 one-look directions on the park with a corner rose (670).
5. Two deviations are left for the critic: the tent is drawn from above (a triangle would be a side view), and F4 becomes an index of numbers. F4 is the first face to cut.
