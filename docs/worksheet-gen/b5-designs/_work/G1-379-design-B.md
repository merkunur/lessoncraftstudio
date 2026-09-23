# G1-379 `maps` : DESIGN B ("The Island Atlas") - nt10-E, 2026-09-23

Designer B. Read: `_ROLE-DESIGN.md`, `_STUDIO-BRIEF.md`, `_SUBSTRATE.md`, `_PANEL-FINDINGS.md` (lock row 7, maps ruling, open items 1-2), `_work/_selection-*.md` (maps sections), `_work/G1-379-pedagogy.md` (the content contract; every face below is its face, drawn differently), `primitives/water-cycle.js` + `primitives/bin.js` (the NEW-primitive pattern: px geometry, render-measuring verify), `templates/components-b3/ordinal-numbers.js` (`blankNumeralBox({w,h,answer,attrs})`), `page/page.css` (`.ws-match*`). Looked at: `out/b4-sweep/en/G3-385-null-d2-en.png` (numbered coral markers on a palette diagram + numbered writing lines: the house look this family continues), `K-356-null-d2-en.png` (`.ws-match`), `G2-351-null-d2-en.png` (card grid). No library picture is used (pedagogy §A: `camping/compass` baked English letters, `classroom/map`, `camping/map` REFUSED; I did not reopen them). (m) = measured here with node (scratch `scratchpad/G1-379-f5*.js`); *est.* = engineer measures in the real render. Designer A's file NOT read.

## Boundary

This page is NOT `grid-coordinates` G2-279/302/303/308 (no drawn grid, no letter/number axis on any plan, no "which square"), NOT `position-words` K-064..067 / `left-and-right` K-065 (no on/under/left/right answer words), NOT `mazes` / `picture-path` / `treasure-hunt` (no route, no steps, no counting squares; treasure-hunt's live `compass` mode owns "go 2 north": no face walks), NOT `hundreds-chart-puzzles` G1-310 `chartCompass` (+1/+10 arrows), NOT `weather-symbols` K-356 (symbols for weather). It owns the MAP AS A REPRESENTATION. **Visual signature: every page is one plate of the same printed atlas.** Plates 1, 2 and 6 show ONE invented island (a fixed, locale-neutral coastline with a village, a camp and a park, cream land on a tealSoft sea, no words on it), drawn from above; plate 2 shows the island's things from the side and from above; plate 3 is the atlas's compass-rose drill; plates 4 and 5 are the atlas's world map (Natural Earth projection, a curved pseudo-globe outline, coral numbered markers). One cartographic style (coast teal 3, sea hatch, coral markers, a north arrow on every plan) runs through all six, so a teacher recognises the family from across the room and can hand the six pages out as a sequence: "our island" first, then the world.

## 1 Page concept (base, G1-379 "Read the Map Key")

**One idea from across the room: a big island in a teal sea, full width at the top, with a folder-tabbed map key underneath.** The island is the focal apparatus (639 x 359 px, 50 % of the body); everything else is small and quiet. The child reads a word in a row, finds that word in the key, sees its symbol, and counts that symbol on the island. Why an island and not a park or a street plan:
- An island is a COMPLETE place: every edge is coast, so the map never looks cut off, and it is the smallest honest "whole world" a 6-year-old can hold. It is also the classic first map in early-years geography (UK KS1 teaches map skills on a fictional island), and every locale has the storybook trope.
- Water is on the page from plate 1: the coast, a river, a pond. That prepares plate 5's land-or-sea decision with the same colours (cream = land, tealSoft = water) the world map uses.
- It is invented, so it is locale-neutral and never wrong (no real town to mis-draw, no local road-sign or traffic convention), and a fixed coastline makes the verify deterministic.
- A street grid reads as coordinates (the G2-279 fence) and a park alone has no sea; the island has neither problem.

Top quality: one focal apparatus, generous sea margin (the island never touches the plate frame), symbols at the G1 floor (44 px, the SAME size in the key and on the map, as real map keys do), the key as a calm white card with a teal tab, five answer rows with dashed coral boxes. Pencil-first: only numerals are written.

## 2 Layout (d2, 722 body; lanes 639 at default padding)

```
body 639 wide, stack budgeted at 722 (worst chrome: 3-line title + 3-line instruction)
+---------------------------------------------------------------+
| ISLAND PLATE  639 x 359  (svg viewBox 640 x 360, scale 0.998) |  359
|  sea tealSoft + hatch; island cream, coast teal 3;            |
|  river, road, footpaths, bridges; 8..20 point symbols 44 px;  |
|  north arrow 40 x 56 in the top-right sea, letter = N_loc     |
+---------------------------------------------------------------+
  gap 14                                                           14
+--[ Key ]------------------------------------------------------+  <- teal tab 28 high, keyTitle 16 px Baloo 700 white
| [sym44] house        | [sym44] tree         | [sym44] bush     |  52
| [sym44] pond         | [sym44] tent         | [sym44] bench    |  52
+---------------------------------------------------------------+  box = 28 + 2x52 + 12 pad = 144
  gap 14                                                           14
|  (tree)[ 44 ]      (tent)[ 44 ]      (pond)[ 44 ]              |  56
|        (house)[ 44 ]      (bush)[ 44 ]                         |  56 + 8 gap
                                                         total 359+14+144+14+120 = 651 <= 722
```
- Rows block: CSS grid 3 columns x 2 rows `minmax(56px,1fr)`, 5 cells (3 + 2, second row centred). Cell = word pill (creamDeep `#F5E9D2`, 44 high, Nunito 800 17 px ink, max-width 140, 2-line wrap allowed) + 8 + `blankNumeralBox({w:48,h:44,answer})`. Cell width 213 (639/3): 140 + 8 + 48 = 196 fits.
- Key entry: white 48 x 48 square (teal 1.5, r 8) holding the symbol drawn at 44 + 8 + the word (Nunito 800 17 px ink, left-aligned, width 213 - 48 - 8 - 12 = 145 px, 2 lines max). Key box white, teal 2 border, r 12; tab = teal pill r 8, 28 high, text white Baloo 2 700 16 px, left 16.
- Slack 71 px (at worst chrome) is absorbed by the rows `1fr`; at one-line chrome (814) the plate stays 359 and the rows breathe. The plate never scales below 639 wide.
- Symbol floor: 44 px drawn on the map and in the key (G1 min element 44). Numeral boxes 48 x 44 (answer numeral written by the child; G1 numeral floor 26 is the child's, the box height 44 serves it).

## 3 Ladder (base)

| key | d1 | d2 (ships) | d3 |
|---|---|---|---|
| `layout` | undefined | undefined | undefined |
| `island` | `'isle-1'` | `'isle-1'` | `'isle-1'` |
| `keySize` | 4 | 6 | 8 |
| `asked` | 4 | 5 | 6 |
| `counts` | 1..4 | 1..5 (bridge 1..3) | 1..6 (bridge 1..3) |
| `nearMiss` | none (bush not in key) | `['tree','bush']` both in key, at least one asked | both asked |
| `rowsShowSymbol` | true (plain counting scaffold) | false | false |
| `symPx` / `keySymPx` | 48 / 48 | 44 / 44 | 44 / 44 |
| `placedMax` | 12 | 20 | 24 (*est.* slot capacity, see §5) |
| `footpaths` | 0 | 0..2 (= bridges - 1) | 0..2 |
| `northArrow` | true | true | true |
| rows layout | 2 x 2 | 3 + 2 | 3 x 2 |

d2 is the best page: the near-miss forces reading the key, the unasked 6th key entry forces reading the row (not assuming every key line is asked), and 5 rows fill the block calmly.

## 4 Answer-hiding + uniqueness

- Rows print only the WORD (d2 `rowsShowSymbol:false`); the key is the only word-to-symbol bridge; counts live only in `data-lcs-answer` on the empty boxes.
- One answer per row: the count of `[data-lcs-sym=<id>]` inside the plate. Symbols are pairwise >= 8 px apart (bbox gap), never on a line feature, never cut by the coast, so each is countable exactly once; a bridge exists only where a road/footpath crosses the river.
- Tells removed: row order != key order != ascending count; >= 4 distinct counts across 5 rows; the unasked key entry is never the last key cell (d2 seed check); no symbol is rotated (a rotated tree must not read as a different thing).
- A wrong answer is visible: the teacher counts the symbol on the island in seconds (symbols are big, few, and spread), and the near-miss error (tree counted as bush) produces a number the teacher recognises.

## 5 Primitives / components

**Reused:** `blankNumeralBox` (`templates/components-b3/ordinal-numbers.js`, base + F4; F2 draws its letter boxes inside the rose SVG) · `.ws-match`, `.ws-match-col`, `.ws-match-item`, `.ws-match-dot--left/--right` (`page/page.css`, F1, as `science-pair-match` / K-356) · `cardGrid` (`templates/layouts/card-grid.js`, F2 cards, `numbered:true`) · `rulingBlock({rows,w,h,glyphH:24})` (`components-b2.js`, F3 lines) · the chip/pill look of `.ws-achip` (F3 bank, F5 word chips) · marker style of `primitives/water-cycle.js` step (8) (white halo r 17 + coral disc + white Baloo numeral), re-declared inside `world-map.js` at its own size (not imported: water-cycle exports no marker function).

**NOT used:** any library picture (pedagogy refusals; a 3/4 perspective picture has no single correct top view); `coord-grid.js` (the grid-coordinates fence); `sceneStage` (one theme of photos, perspective); `water-cycle.js` itself; `answerBox` without an answer (the `undefined` stamp trap).

**NEW (all palette-only, px geometry like `bin.js`, each with a render-measuring `qa/verify-<name>.js`):**

### 5.1 `primitives/map-symbol.js` - `mapSymbol({id, px=44}) -> {svg, w, h}`
All TOP VIEW (a symbol is what the thing looks like from above; this is the family's teaching point, so no side-view pictogram). Box = `px` square, origin top-left; `u = px/44`. Stroke teal unless stated; min stroke 1.5.

| id | geometry at px 44 (u = 1) | fill (greyscale L) | separates from |
|---|---|---|---|
| `house` | roof rect x 4..40, y 7..37, r 3; ridge line x 22 from y 7 to 37 (teal 2); left half teal, right half tealSoft (a lit gable roof, the F1 house top view) | teal 0.12 + tealSoft 0.81, two-tone | the only dark two-tone |
| `tree` | 9-lobe scalloped circle: lobes = arcs of r 7 centred on a circle r 15 around (22,22), outline teal 2; inner texture: 3-lobe scallop r 6 teal 1 | tealSoft 0.81 | scalloped round outline |
| `bush` | clump of 3 overlapping circles: (15,25) r 11, (28,26) r 11, (22,15) r 10, one merged outline teal 1.5, no texture | tealSoft 0.81 | lumpy, 3 bumps, no scallop ring (the near-miss: same tone, different outline; BOTH >= 44 box, so the near-miss is never a sub-floor size cue) |
| `pond` | blob path through (6,22) (14,9) (30,8) (39,18) (36,33) (20,37) (8,31), teal 2; two wave strokes teal 1.5 (M 14 20 q 4 -3 8 0 t 8 0; same at y 27) | white 1.0 | white with waves |
| `tent` | rect x 8..36, y 10..34 (ridge tent from above); ridge line y 22 white 2; top half coral, bottom half coralSoft; 4 guy lines ink 1.5 from each corner outward 5 px at 45 deg ending in ink dots r 1.5 | coral 0.33 | the only mid-grey; guy lines |
| `bench` | seat rect x 4..40, y 16..30 white, ink 2; 2 slat lines ink 1 at y 21, 25; backrest bar ink 4 along y 15 | white + ink | thick one-sided edge |
| `flowerBed` | centre circle r 8 tealSoft teal 1.5; 6 coral dots r 4.5 on a circle r 15 at 0,60..300 deg | coral dots | a ring of dots |
| `bridge` | across the river band: two teal 2.5 brackets (vertical lines 30 long at x 10 and 34 with 4 px outward flares at both ends), cream deck between; rotated to the crossing's normal by the island primitive (the ONLY rotated symbol) | cream + teal | only on water |

Stamps `data-lcs-sym=<id>` on the root `<g>`. `px < 36` THROWS. No letters or digits inside any symbol.

**Pedagogy corrections (flag for the critic, reproduced from the pedagogy file's own rules):** (a) the pedagogy draws `tent` as a coral TRIANGLE, which is a SIDE view on a plan whose quality rule is "top-view symbols only"; drawn here as the ridge tent seen from above. (b) The pedagogy's `house` "square with a diagonal cross" is a hip roof; here it is the gable roof so the map symbol IS the F1 house's top view (plates 1 and 2 teach the same object). (c) `bush` at 0.6 x tree = 26 px falls under the G1 44 px floor; the near-miss is carried by outline instead.

### 5.2 `primitives/island-map.js` - `islandMap({w=639, h, symbols:[{id,x,y}], bridges:[slotId], footpaths:[slotId], northArrow:{letter}, rose:null|{letters}})`
ViewBox `0 0 640 360`, fixed geometry `ISLE_1` in `data/b5/island.js`; `h = w * 360/640`; `w < 480` THROWS.
- **Sea:** rect 0..640 x 0..360 tealSoft, frame teal 2 r 16; hatch = short wave strokes grid `#C8BFAE` 1.5 (M x y q 5 -4 10 0 t 10 0) on a 64 x 48 staggered lattice, skipped within 14 units of land.
- **Coast (`ISLE_1.coast`)**: closed centripetal Catmull-Rom through 21 points (clockwise, viewBox units): (96,62) (170,40) (252,48) (318,34) (398,44) (470,32) (548,52) (596,100) (606,164) (586,206) (610,256) (574,310) (490,326) (420,306) (352,330) (268,320) (190,334) (116,316) (60,266) (46,190) (62,118). Fill cream, stroke teal 3. Engineer may tune vertices; the gate asserts the rules below, not the numbers.
- **River:** centreline Catmull-Rom (452,82) (430,134) (440,196) (410,258) (388,312) (386,346); band 18 wide tealSoft with teal 1.5 edges; starts at a spring (a white circle r 6 teal 1.5 at the first point) and must cross the coast exactly once (the mouth).
- **Road (always drawn):** centreline (46,200) (180,192) (300,204) (440,196) (520,182) (606,172); two teal 1.5 lines 16 apart, cream between; crosses the river once = bridge slot `A` (always bridged; so bridge count >= 1).
- **Footpaths (seeded, 0..2):** dashed ink 2 (dash 6 5): `P1` from road (300,204) to (330,126) to (432,122) to (520,104), crossing the river = bridge slot `B`; `P2` from road (180,192) to (236,262) to (404,272) to (470,276), crossing = slot `C`. A footpath is drawn IFF its bridge is present (no path ends at water).
- **Symbol slots (`ISLE_1.slots`, precomputed by `tools/build-island-slots.js`, committed):** candidate centres on a 52-unit staggered lattice with seeded +-5 jitter at build time, kept iff the 22-unit disc is on land >= 6 units from the coast, >= 35 units from every river/road/footpath centreline (band half-width 9 + half-symbol 22 + 4) and >= 30 from each bridge slot. Capacity UNKNOWN (engineer must measure; d2 needs 20, d3 24: gate asserts `slots.length >= 30`).
- **North arrow:** in the top-right sea at (596,24)-(636,80): a narrow kite (tip up) teal/tealSoft two-tone 40 x 56 with the locale letter `dirLetters.n` in Baloo 2 700 18 px ink in a white circle r 12 above the tip. Base + F5 only.
- **Rose (F5 only):** the full `compassRose` (5.3) at px 96 in the top-right sea (upright, coral N tip, 4 letters 14 px in circles r 10, NOT answer boxes).
- Stamps: root `data-lcs-prim="island-map"`, each symbol `data-lcs-sym` + `data-lcs-x/y` (units), each bridge `data-lcs-sym="bridge" data-lcs-slot`.
- **`qa/verify-island-map.js`:** the river crosses the coast once; the road touches the coast only at its two ends; each bridge slot lies on a river/line intersection (computed, +-2 units); every slot disc is inside the coast polygon and off every band (point-in-polygon + point-to-polyline distance on the DATA) and, in the render, every placed symbol's bbox is inside the coast path's bbox-filled raster region (puppeteer: pixel under each symbol's corners is not tealSoft sea); symbols pairwise bbox gap >= 8 px.

### 5.3 `primitives/compass-rose.js` - `compassRose({px=216, letters:{n,e,s,w}, rotation:0|90|180|270, given:dir|null, blanks:[dir], northMark:true|false, box=40})`
Px geometry (no viewBox scaling; like `bin.js`). Centre c = px/2. Box B = `box`; tip radius R = px/2 - B - 6 (216 -> 62); box centre radius Rb = R + 4 + B/2 (-> 86; outer edge 106 <= 108); kite waist radius r = 0.24 R (15); ring circle r = 0.66 R (41) teal 2 no fill; centre dot r 5 white teal 1.5.
- Tip i (0 up, 1 right, 2 down, 3 left) at angle theta_i = -90 + 90 i + rotation (deg, y down). Kite i = [C, P(theta_i - 45, r), T(theta_i, R), P(theta_i + 45, r)], split along C-T: left half teal, right half tealSoft, outline teal 1.5. If `northMark` and rotation 0: the N kite halves are coral / coralSoft instead. Direction at tip i = `DIRS[(i - rotation/90 + 4) % 4]` with `DIRS = ['n','e','s','w']`.
- Box at each tip: centre (c + Rb cos theta_i, c + Rb sin theta_i), boxes never rotate (letters upright). Given: white fill, teal 2 solid, r 8, letter Baloo 2 700 24 px ink, `data-lcs-given`. Blank: white fill, coral 2 dashed (6 4), r 8, `data-lcs-dir`, hidden `data-lcs-answer=<letter>` on the `<g>`. Reference mode (F5 plan rose, px 96): letters 14 px in white circles r 10, no boxes.
- No intercardinal points (NE/SW refused everywhere: pt colaterais 4º ano).
- `px < 200` with boxes THROWS (box would fall under 36 or R under 50). Stamps `data-lcs-rot`.
- **`qa/verify-compass-rose.js`:** for each rendered rose, read the tip polygons' apex coordinates, recompute each tip's direction from the rendered apex angle and `data-lcs-rot`, assert it equals the stamped `data-lcs-dir`; assert box size >= 36, letter font >= 22, no coral kite when rotation != 0.

### 5.4 `primitives/top-side-view.js` - `topSideView({model, view:'side'|'top', px=96, scale})`
Correct by construction: ONE model record (solids in model space, 0..100 units: x left to right, y front to back, z up) projected orthographically twice. **Side view** = looking along +y (front elevation): draw (x, z), z up, painter order by y DESCENDING (back first). **Top view** = looking down: draw (x, -y) (back of the object at the top of the tile, like a north-up plan), painter order by top z ASCENDING (highest last). Hidden parts are not drawn (a table's legs vanish under its top; a tree's trunk vanishes under its crown). One `scale` per MODEL, shared by both views (true orthographic: the two views share their width, as in technical drawing): `scale = min(96/extentX, 84/extentZ, 96/extentY)`; each view's LARGER bbox dimension >= 56 px (K floor) else THROW.

Solid types: `box{x0,x1,y0,y1,z0,z1,fill}` (side rect x/z, top rect x/y) · `cyl{cx,cy,r,z0,z1}` (side rect, top circle) · `frustum{cx,cy,r0,r1,z0,z1}` (side trapezoid, top circle r0 + circle r1, centre dot if r1 = 0) · `cylY{cx,cz,r,y0,y1}` (axis along y: side circle, top rect) · `gableY{x0,x1,y0,y1,z0,z1}` (ridge along y: side triangle, top rect + ridge line at x mid, halves teal / tealSoft) · `crown{cx,cy,r,z0,z1}` (side 9-lobe scalloped ellipse, top 9-lobe scalloped circle r) · `handle{x0,x1,z0,z1,y}` (side C-arc teal 5, top bar 6 units thick) · `arc{x0,x1,z0,z1,y}` (bucket bail: side arc, top chord line).

Model pool (`data/b5/maps.js TOPSIDE`, class for the pedagogy's family limits):

| model | solids (model units) | top view reads as | class |
|---|---|---|---|
| cup | cyl (50,50) r 18 z 0..40 tealSoft; handle x 68..82 z 10..32 | circle + nub | circle |
| bucket | frustum (50,50) r0 16 r1 24 z 0..40 white; arc x 26..74 z 40..58 | 2 rings + chord | circle |
| roundTable | foot cyl r 18 z 0..3; post cyl r 5 z 3..36; top cyl r 40 z 36..42 creamDeep | one big circle | circle |
| tree | trunk cyl r 6 z 0..40 inkSoft; crown (50,50) r 34 z 30..95 tealSoft | scalloped circle | circle |
| rectTable | 4 legs box 4x4 at corners z 0..36; top box x 10..90 y 25..75 z 36..42 creamDeep | plain rectangle (legs hidden: the pedagogy's "4 corner dots" would draw hidden legs) | rect |
| bed | frame box x 10..90 y 20..80 z 10..30; headboard x 10..16 z 10..55; pillow x 18..34 y 28..72 z 30..36 white; blanket x 40..90 z 30..34 coralSoft | rect + bar + pillow + blanket | rect |
| car | body box x 5..95 y 30..70 z 12..36 coral; cabin box x 28..72 y 32..68 z 36..56 white; 4 cylY wheels cx 22/78, cz 11, r 11, y 26..34 and 66..74 ink | rounded rect + roof + 4 tyre tabs | rect |
| house | walls box x 15..85 y 20..80 z 0..50 cream; door box x 44..56 y 19..20 z 0..24 teal; gableY x 10..90 y 15..85 z 50..85 | two-tone roof + ridge (= `mapSymbol('house')`) | rect |
| chair | seat box x 20..80 y 25..75 z 40..46; legs hidden; back box x 20..80 y 69..75 z 46..85 | square + back bar at top edge | square |
| cone | base box x 18..82 y 18..82 z 0..6 inkSoft; frustum r0 24 r1 4 z 6..80 coral, white band z 40..50 | square + ring + dot | square |

Measured scales (m, by the formula): cup s 1.92 (side 96 x 77) · bucket 1.45 (70 x 84) · roundTable 1.2 (96 x 50) · tree 0.884 (60 x 84, top 60) · rectTable 1.2 (96 x 50, top 96 x 60) · bed 1.2 · car 1.07 (96 x 60) · house 0.988 (79 x 84) · chair 0.988 (59 x 84, top 59 x 59) · cone 1.05 (67 x 84). All >= 56 on the larger side. (The chair seat is 60 wide, back top z 85: at 50 wide / z 95 its top view is 44 px, under the K floor.)

### 5.5 `primitives/world-map.js` - `worldMap({w=639, set:[memberId], anchors:[{memberId, n}], antarctica:bool, leaders:true})`
**Projection: Natural Earth I** (Savric, Jenny, Patterson, Petrovic, Hurni 2011; public domain formula), central meridian lambda0 = 11 deg E:
x = lambda (0.870700 - 0.131979 phi^2 - 0.013791 phi^4 + 0.003971 phi^10 - 0.001529 phi^12), y = phi (1.007226 + 0.015085 phi^2 - 0.044475 phi^6 + 0.028874 phi^8 - 0.005916 phi^10). Why not equirectangular (the pedagogy default): at the same width it doubles Greenland and turns Antarctica into a band as wide as the equator; Natural Earth is the look of a school wall map (pseudo-cylindrical, rounded sides) and is a closed formula, no dependency.
- Scale at w 639: k = 639 / (2 pi 0.8707) = 116.80 px/rad (m). Crop top **84 deg N** (the pedagogy's 75 deg N would clip Greenland (83.6 N) and the Canadian Arctic: a clipped continent part). Crop bottom -57 deg (Cape Horn 55.98 S) when the locale set has no Antarctica: map height **277.8 px**; to -90 when it has: **327.6 px** (m). Europe 10 W..60 E at 50 N = **108.9 px wide, 67.6 px tall** (m); Great Britain 12 px; New Zealand 27 px tall; Antarctica band 34.9 px; Arctic sea band 72-84 N only 18.0 px; Southern Ocean band 57-65 S 14.9 px (m).
- Cut meridian = lambda0 - 180 = -169: every vertex with lon < -169 shifts +360 (Chukotka goes whole to the right edge; Alaska's mainland, west to -168, stays left). A ring straddling the cut after the shift is dropped (only tiny islands; the build asserts none of the KEEP list is dropped).
- **Data module `data/b5/world-map.js` (committed, <= 40 KB *est.*)**, generated once by `tools/build-world-map.js` from Natural Earth v5.1 **1:110m** GeoJSON (`ne_110m_admin_0_countries.geojson` for fills + region tags, `ne_110m_coastline.geojson` for the coast stroke; source `github.com/nvkelso/natural-earth-vector/geojson/`, public domain; the downloads live in a gitignored `cache/natural-earth/`; no npm dependency). Steps: project, normalise to width 1000 units (height 434.7 / 512.7, m), Douglas-Peucker at **0.9 units** (= 0.58 px at 639, under the 1.5 px coast stroke, so simplification is invisible), round to 1 decimal, drop rings with projected area < 12 px^2 at w 639 (about 36,000 km^2: sub-visual specks) EXCEPT the KEEP list (Great Britain, Ireland, Iceland, Madagascar, Sri Lanka, Tasmania, Cuba, New Zealand North + South, Honshu, Hokkaido, Kyushu), and assert every region keeps >= 60 points.
- **Drawing without polygon clipping:** each country ring filled cream with a cream 0.8 stroke (hides anti-alias seams, so no borders show), then the coastline lines on top in teal 1.5, then the Europe/Asia split as ink 1.5 dashed (4 3) on land only: Urals + Ural River polyline (66.0 E 69.3 N) (65.5 67.5) (60.0 64.0) (59.3 60.0) (58.8 56.0) (59.5 52.5) (58.5 51.2) (55.0 51.0) (51.8 47.0), and the Caucasus crest (49.5 41.2) (46.0 42.6) (42.0 43.3) (37.5 44.8). Eurasia still reads as one landmass. The projection outline (curved sides, flat crop lines) teal 2, sea inside tealSoft, no graticule (a grid would read as coordinates).
- **Regions (for anchors + verify, never drawn as colour):** each country ring tagged by NE `CONTINENT`, overrides: Russia split by the Urals line (point west of it or north of the Caucasus crest -> `europe`), Turkey + Cyprus -> `asia`, Egypt -> `africa`, Greenland -> `northAmerica`, per-POLYGON assignment for multi-part countries (French Guiana -> `southAmerica`), `oceania` = Australia + Papua New Guinea + New Zealand (Indonesian Papua stays `asia`, per NE; no numeral sits there). Every land region is filled the SAME cream (a colour-coded map prints the grouping; pedagogy rule).
- **Anchors:** coral disc r 15 + white halo r 18 + white numeral Baloo 2 700 20 px (the G3-385 marker at map size). The SAME style for continents and oceans (F4's land/sea decision is the task; a style difference would print it). Positions precomputed per region = pole of inaccessibility of the region's largest ring (polylabel, ~60 lines in the build tool), stored in the data module, hand-overridable; oceans at fixed lon/lat: atlantic (-35 E, 15 N), indian (78 E, -22 S), pacific TWO anchors (-140 E, 5 N) and (170 E, 22 N), same numeral (one ocean, one name).
- **Leaders (the thin-band fix):** the Arctic (18 px) and Southern (15 px) bands cannot hold a 36 px anchor, and the Antarctica band (35 px) only barely. So all three sit OUTSIDE the map in a 34 px tag band (Arctic above the map at lon 0; Antarctica and Southern Ocean below the map at lon 60 E and lon -60) with a teal 1.5 leader ending in a 4 px teal dot ON the region (Arctic dot at (0 E, 80 N), Southern at (-60 E, 60 S), Antarctica at (60 E, -78 S)). Leaders are used for one land member (Antarctica) and two sea members, so a leader never tells land from sea.
- **`qa/verify-world-map.js`:** data: test points land-in-region (Paris -> europe, Moscow -> europe, Novosibirsk -> asia, Cairo -> africa, Nuuk -> northAmerica, Sao Paulo -> southAmerica, Sydney -> oceania, McMurdo -> antarctica) and sea (30 W 30 N, 80 E 20 S, 150 W 0, 0 E 80 N, 60 W 60 S not in any land ring); Europe projected bbox width 95..125 px at w 639; Greenland top not clipped; no ring crosses the cut; file size <= 40 KB; >= 60 points per region. Render (puppeteer): each continent anchor disc fully inside its region's land (sample 16 rim points, all cream pixels or point-in-polygon on the data); each ocean anchor rim fully on sea >= 6 px from coast; each leader dot inside its target; no two anchors' halos overlap.

### 5.6 `templates/components-b5/maps.js` (behind a `templates/components-b5.js` barrel)
`mapKey({entries, keyTitle})` · `countRow({word, answer})` · `islandPlate({...})` (islandMap wrapper, stamps `[data-ws-content]`) · `viewPairColumns({pairs, order})` (F1, emits `.ws-match`) · `roseCard({...})` (F2) · `nameBank({names})` · `numberedLines({n, cols:2})` (F3, wraps `rulingBlock`) · `nameNumberRows({names})` (F4) · `directionRow({startId, dirWord, chips})` (F5) · `pictoEye({mode:'side'|'top'})` (F1 header pictograms, see §7 b). Every full-page layout stamps `[data-ws-content]` (the blank-page lint).

## 6 Locale slot structure

All words are stand-alone labels from `data/b5/locales/maps.<loc>.json` (pedagogy §D schema) plus ONE new literal: **`keyTitle`** (the tab: en Key · de Legende · es Simbología · pt Legenda · fr Légende · it Legenda · nl Legenda · sv Teckenförklaring · da Signaturforklaring · no Tegnforklaring · fi Karttamerkit; panel confirms). Nothing inflects.

| surface | font | size | width reserve | longest-locale check |
|---|---|---|---|---|
| key tab `keyTitle` | Baloo 2 700 | 16 px | tab auto, max 260 | da "Signaturforklaring" 18 ch x 8.6 = 155 *est.* |
| key word / row word pill | Nunito 800 | 17 px | 145 / 140, 2-line wrap | pt "canteiro de flores" 18 ch ~ 128 *est.*; validator: symbol words <= 22 graphemes |
| north-arrow letter, rose letters | Baloo 2 700 | 18 / 24 / 14 px | fixed circle / box | `Ø` `Ö` `Ä` present in the shell's Baloo 2 subset: UNKNOWN, engineer measures (da/no/sv letters) |
| F5 direction chip | Baloo 2 700 | 17 px | 130 fixed | fi "pohjoinen" 9, de "Norden"; +40 % = 13 ch ok |
| F3 bank chips | Nunito 800 | 16 px | wrap to 2 rows (budgeted) | de "Australien und Ozeanien" 23 ch |
| F3 lines | handwriting, glyphH 24 | - | 269 px per line | continent names <= 20 graphemes (validator) or the panel picks the short form (de "Ozeanien") |
| F4 name rows | Nunito 800 | 17 px | 240 | "Glacial Antártico" 17 ch ~ 125 *est.* |

Font floor: nothing under 14 px on the body (the 9 px lint is never approached). Titles/instructions are the shell's.

## 7 Five variation faces

**(b) F1 "Bird's-Eye View" (K, `K-3xx` TBD, CODE `layout:'top-view'`).** Delta: no island; a two-column `.ws-match`: left column = 5 side views each in a 160 x 112 cream card STANDING on a 2 px grid-colour ground line (the object visibly rests on the ground), right column = 5 top views each in a 112 x 112 "map tile" (white, teal 1.5 frame, r 8, a faint 1 px grid-colour inner border like a map sheet). Column headers are **wordless pictograms** 44 px (`pictoEye`): left = an eye in profile with a coral arrow pointing right (looking from the side), right = an eye above a coral arrow pointing down (looking from above). Layout: header 52 + 12 + 5 rows x 112 + 4 x 14 = 680 <= 722; horizontal 160 + 30 + 240 + 30 + 112 = 572, centred. Views drawn by `topSideView` at one scale per model (§5.4), each >= 56 px. Verify hook: `data-lcs-model` + `data-lcs-view` both columns, class-family limits (<= 2 circle, never cup + bucket; <= 2 rect, never rectTable + bed), right order != left order and != reversed, the render check that the two views of each model have equal x-extent (+-1 px: proof of one model record). Query face: "bird's-eye view" / Vogelperspektive / vue de dessus. ⚠ Critic decision: shared width per model is honest orthography but lets a child pair by width; the class-family limits keep at least two same-width-ish candidates apart. The pedagogy's "all views fit the same box" rule is kept (all <= 96 x 84).

**(c) F2 "Compass Rose" (G2, `G2-3xx` TBD, CODE `layout:'compass-rose'`).** Delta: six big roses on six cards, no map at all. `cardGrid` 2 cols x 3 rows, card 313 x 224, gap 12: 3 x 224 + 24 = 696 <= 722. Rose px 216 (§5.3: tips R 62, boxes 40, letters 24 px); upright roses (rot 0, 3 of them) carry the coral N kite and give E, S or W; turned roses (90, 180, 270 once each) are all-teal and give any letter; given letters cover all 4 across the page. Card badge number 1-6 top-left (house `.ws-card-badge`). Verify hook: `verify-compass-rose.js` recomputes each tip's direction from the rendered apex; rotation multiset {0,0,0,90,180,270}; no coral kite on a turned rose; given/rotation sequence measured for tells on the shipped seed. Query face: compass rose / Windrose / rose des vents.

**(d) F3 "Label the Continents" (G2, `G2-3xx` TBD, CODE `layout:'continents'`).** Delta: the world map plate replaces the island. Stack (with Antarctica): bank 112 (worst 2 rows) + 12 + map card 362 (map 327.6 + 34 bottom tag band for the Antarctica leader) + 12 + lines 2 cols x 4 rows `minmax(46px,1fr)` = 208 -> **706 <= 722**. Without Antarctica (es/fr/it sets per ruling): map 277.8, no tag band -> 566, rows absorb. Line = numbered circle 30 (teal 2, numeral Baloo 18) + `rulingBlock` 269 wide glyphH 24. A continent spanning two regions (merged "America") shows its numeral on both masses. Verify hook: anchors inside regions (`verify-world-map.js`), bank order != numeral order != alphabetical, anchor count = set size. Query face: label the continents / Kontinente beschriften / les continents.

**(e) F4 "Continents and Oceans" (G3, `G3-3xx` TBD, CODE `layout:'continents-oceans'`).** Delta from F3: oceans added AND the answer changes from writing names to **writing numbers**: the name list IS the answer sheet. 12 rows (en 7 + 5) in 2 cols x 6 rows: [name, Nunito 800 17 px, 240 wide][`blankNumeralBox` 48 x 44], rows 44 + 6 gap -> 294; map card = 34 top tag band (Arctic leader) + 327.6 + 34 bottom band (Antarctica + Southern leaders) = 396; stack 396 + 12 + 294 = **702 <= 722** (m arithmetic). Why numbers, argued: 12 handwritten names cannot fit (map 328 + a 12-chip bank ~132 in de/fi + 6 writing rows ~318 = ~800 > 722, measured arithmetic), 12 names x ~11 letters is a handwriting marathon rather than geography, and F3 already owns writing the names. The added move stays intact: every name must be decided land or sea, then found. Names mixed (no run of 3 of one kind, not land-then-sea); anchors identical in style (§5.5). This also separates F4's resolved config from F3's (`answer:'number'` vs `'write'`), which lowers the F3/F4 cannibalisation the pedagogy flags at 0.30. Verify hook: ocean anchors on water, continent anchors on land, name order != numeral order. Query face: continents and oceans.

**(f) F5 "Directions on a Map" (G2, `G2-3xx` TBD, CODE `layout:'directions-on-map'`).** Delta: the base's island returns (same coastline) at h 300 (w 533, centred) with exactly 7 places, each a DIFFERENT symbol (house tree bush pond bench tent flowerBed, once each; no bridges counted, road/river drawn) and the full reference rose (px 96, locale letters, N up) in the top-right sea. Below, 6 rows single column `minmax(52px,1fr)`: [row number 28][start: the symbol in a 48 teal-2 frame with a coral pin r 5 at its top-left corner][8][direction word chip 130 x 44, Baloo 17][24][3 answer chips: symbol 40 in a 52 round white frame, teal 1.5, 16 apart]. Width 28 + 10 + 48 + 8 + 130 + 24 + 3 x 52 + 32 = 436. Stack 300 + 14 + 6 x 52 + 5 x 6 = **656 <= 722**. No arrow beside the word (an arrow would pre-translate the word into a screen direction; the rose on the map is the tool). Tree and bush never both chips in one row. Verify hook: sector uniqueness recomputed from the rendered symbol centres (§9). Query face: cardinal directions on a map / Himmelsrichtungen auf der Karte.

**⚠ F5 construction finding (m), for pedagogy + critic:** the pedagogy's "hidden 3x3 lattice, 6 questions, no start used twice, exactly one place within +-45 deg" is **infeasible**: on every 7-of-9 lattice subset at 7 pitch/margin settings, at most **2** starts admit a valid question (scratch `G1-379-f5.js`); on 20,000 random 7-place layouts even with a 0 deg margin, at most **5** distinct starts qualify and never 6 (`G1-379-f5b.js`). Feasible rule (measured): 6 distinct (start, direction) questions, **>= 4 distinct starts, <= 2 per start, never two consecutive rows with one start**, all 4 directions asked, every other place's bearing >= 8 deg from the +-45 deg boundary, >= 1 place in the opposite sector (the E/W distractor): 133 of 20,000 random layouts in a 520 x 240 region with 80 px spacing (0.7 %), 45 with >= 5 starts (`G1-379-f5c.js`). The generator searches seeds deterministically over the island slots (free placement, no lattice) until a layout passes; engineer measures the hit rate on the real slot set.

**Hub visibility contract.** Each face appears under `maps` on `/[locale]/worksheets` iff `apps.maps` exists in `topics-taxonomy.json` (default_subject `spatial-reasoning`, open item 1), `axes['exercise-type'].maps` has slug + name x11, exactly one landing per face per locale with `coordinate.type === 'maps'`, `coordinate.mode` = the face's mode string (`'base'` for the base), `coordinate.theme: ''`, a band-table level key, a unique slug, `canonicalDeckSlug` = the published deck, committed and deployed. Gate: `scripts/verify-hub-type-rows.js` expects 6 rows per locale (66; no refusals designed).

**Why these five:** each changes what the child DOES on a different apparatus (match two projections / complete a rotating letter ring / write names on the world / sort names land-or-sea by number / read a relation across a plan), and each owns one query head demanded in the harvest (bird's-eye view, compass rose, continents, continents and oceans, directions on a map). Three of six faces share the island or its objects, so the family reads as one atlas and the world plates arrive after the child has learned what a map is.

**First to cut: F4** (highest cannibalisation with F3, G3 and above band in most locales; its land-or-sea move can live as F3's unpublished d3). Second: F2 (the letter drill partly overlaps F5's rose).

## 8 Two alternatives + recommendation

- **A. "The street plan" (a town block: streets, a school, a playground, houses; pedagogy's park map is its cousin).** Strong on "familiar place" (C3 D2.Geo.1, de Schulweg-Plan) but a street plan is a grid of blocks, which reads as a coordinate grid (the G2-279 fence) and invites "go two streets" routes (treasure-hunt); traffic furniture is locale-specific (road markings, signs); and it has no water, so F4's land/sea decision gets no preparation. Rejected.
- **B. "The classroom plan" (fr plan de la classe, de Klassenzimmer von oben).** The best familiar place for F1, but every symbol is a rectangle (desks, tables, shelves, rugs): greyscale-distinct symbols are impossible, the counting is monotonous, and furniture differs by country. Rejected; its idea survives in F1's pool (tables, chair, bed).
- Also considered and rejected for F2: each rose drawn on a thumbnail of the island rotated with it ("turn the map, north turns too"). Beautiful, but the island's orientation gives away the rotation, which is the thing the child must solve from the given letter.

**Recommendation: the Island Atlas.** One invented, complete, wordless island is locale-neutral by construction, never geographically wrong, prepares land/sea from plate 1, keeps every plan off the grid-coordinates and route fences, gives the base a single focal apparatus visible from across the room, and makes the six pages a coherent set a teacher can sequence. The world plates use a real projection and real data, so the family is honest at both scales.

## 9 Risks, mitigations, print check

- **Greyscale (B&W printer):** relative luminance (computed from the tokens): ink 0.04, teal 0.12, coral 0.33, grid 0.52, tealSoft 0.81, cream 0.90, white 1.0. Symbols differ by OUTLINE first and tone second (house dark two-tone, tent mid-grey, tree/bush light but scalloped vs 3-bump, pond white + waves, bench white + thick edge, flower bed dot ring). Land (0.90) vs sea (0.81) is weak in grey, so the coast is a 3 px teal line and the sea carries grid hatch; the world map coast is 1.5 px on a 639 px map (*est.* legible; human eye check). Coral vs teal rose tips separate (0.33 vs 0.12). Road vs river in grey: both two lines with a light fill; separated by form (river sinuous, starts at a spring, ends in the sea; road straight-ish coast to coast) and neither is ever counted.
- **Overflow:** every stack sums <= 722 with the worst chrome (base 651, F1 680, F2 696, F3 706, F4 702, F5 656). fi 4-line title (677): F3 (706) and F4 (702) overflow by 29/25 px -> engineer: rows `minmax(40px,1fr)` at F4 (-36) and bank chips 15 px at F3; measure in the real fi render, never shrink the map.
- **Long words:** validator caps (symbol words 22, continent names 20 graphemes on F3 lines); key and row pills wrap to 2 lines.
- **Glyphs:** `Ø`, `Ö`, `Ä`, `É` in Baloo 2 at 24/18/14 px: UNKNOWN in the shell subset (engineer renders da/no/sv letters and the fi P I E L set before building F2/F5).
- **Pencil space:** numeral boxes 48 x 44 (base, F4); letter boxes 40 x 40 (F2); F3 lines 269 x glyphH 24; F5 circles around 52 px chips (16 px apart so two circles never merge); F1 lines across a 240 px gap between 12 px coral dots.
- **Cut lines:** none (no face is cut).
- **Map honesty:** Natural Earth 1:110m + a 0.9-unit simplification keeps every continent recognisable; the KEEP list protects the islands a child looks for; the Europe/Asia dashed split and the merged "America" numeral are the only conventions drawn, and both are data per locale.
- **F5 uniqueness:** only feasible under the relaxed start rule (§7 f, measured); if the critic keeps "no start twice" the face is unbuildable.
- **QA lint catches:** overflow, footer intrusion, 9 px floor, off-palette hex, blank page (`[data-ws-content]`). **Only the family gate catches:** symbol counts, symbol sizes >= 44/40/36, bands clear, anchors in regions, rose directions from the render, sector uniqueness, F1 equal x-extent. **Only a human eye catches:** whether the island looks like a place a child wants to explore (not a blob), whether tree vs bush is a fair near-miss at arm's length, whether Europe and New Zealand read on paper, and the whole-page calm.

## 10 Summary

- Concept "The Island Atlas": one invented, wordless island (base + F5) and its objects (F1) are the plan plates; a real Natural Earth I world map (F3/F4) and a rose drill (F2) complete the set in one cartographic style.
- Base: island 639 x 359 + folder-tab key (6 entries, 44 px top-view symbols, same size as on the map) + 5 count rows; stack 651 <= 722.
- Four NEW primitives with exact geometry: `map-symbol` (8 top views, greyscale-distinct by outline), `island-map`, `compass-rose` (px geometry, locale letters, rotation), `top-side-view` (one model, two orthographic projections), plus `world-map` (NE 1:110m GeoJSON, lambda0 11 E, 84 N crop, DP 0.9 units, leaders for the polar bands).
- Corrections to the content plan: tent/house symbols were side views or off-model; bush was under the floor; table legs/tree trunk are hidden from above; 75 N crop clipped Greenland; F4 answers by number (12 written names cannot fit); F5 "no start twice" is measured infeasible (relaxed rule measured feasible).
- 66 pages (6 faces x 11), no refusals; first to cut F4.
