# G1-378 `earth-and-space` : DESIGN A (nt10-E, 2026-09-23)

Designer A. Read: `_ROLE-DESIGN.md`, `_STUDIO-BRIEF.md`, `_SUBSTRATE.md`, `_PANEL-FINDINGS.md` (lock row 6), `_work/G1-378-pedagogy.md` (the content contract; every move, fact id, bound and verify rule below is ITS, this file owns only the drawing and the layout), `primitives/water-cycle.js` (the new-diagram precedent: palette-only, viewBox verbatim, anchors exported, a render-measuring verify), `primitives/_tokens.js`, `primitives/_svg.js`, `templates/components-b3/ordinal-numbers.js blankNumeralBox`, `data/science/day-vs-night.json bins[].label`. LOOKED at `out/b4-sweep/en/G3-385-null-d2-en.png` (water cycle: coral sun r 30 + rays, teal line art, tealSoft water, cream land, coral numbered markers, dashed coral writing lanes) and `G1-363-null-d2-en.png` (weekly forecast strip). OPENED `cache/themes/space/earth@3x.webp` (photoreal globe, Europe/Africa, deep shaded ocean) and `space/moon@3x.webp` (colour + greyscale: a cratered near-full Moon with a dark limb on the LEFT). Scratch: `scratchpad/G1-378-A-*.png`. *est.* = the engineer measures in the real render (Baloo 2 / Nunito woff2 from `file://`). No em-dashes.

**Boundary.** Not K-208 `science-sort` "Day and Night" (12 pictures into two word bins: day/night as a classification of THINGS; my F3 never sorts a picture and never titles itself "Day and Night"); not K-211 hot/cold, not K-322 seasons (+K-338..341), not K-356 weather-symbols (+G3-385 water cycle: its coral sun is the house sun I reuse as geometry, never its scene), not G1-203 `science-sequence` (ordering library pictures), not G1-341 read-and-check (true/false on a sentence: my base asks WHICH of three bodies a fact is true of, never true/false). This type owns the three bodies told apart by one-body-only facts, the Moon's shape as an ordered pattern, the four phase names, day/night CAUSED by a spinning Earth, and the eight planets by name, order and size class. **Visual signature: one consistent hand of flat line-art astronomy drawn by three NEW primitives, no library picture anywhere on any face** (the opened Earth is a photoreal render that would sit beside a flat coral sun like a sticker on a diagram; the opened Moon is itself a phase and wrong for pt). Every page is an astronomy CHART: a table, a strip, a model card, a fan of orbits.

## 1 Page concept (base): "the Sky Chart"

A three-column chart whose column HEADS are the three bodies, drawn at honest relative size (Sun > Earth > Moon, labelled "not to scale" on the landing), and whose eight ROWS are one-line facts. The child reads a fact and ticks ONE box under the body it is true of. From across the room a teacher sees a clean table crowned by a big coral Sun, a teal Earth and a small white Moon; at the desk the answer key is a column pattern the teacher reads in one glance down the page (a tick in the wrong column is a mark in the wrong lane).

Why this beats a key strip plus three word chips per row: the three names are printed ONCE (in the heads), not 24 times, so the page carries 16 fewer words for a first-grader to parse; the drawing and the answer lane are the same object (the Sun's column IS the Sun), so the page has one focal apparatus instead of a key plus a list; the tick lanes align vertically, which is how a teacher checks 25 sheets. Whitespace: a white chart card on cream, zebra rows in creamDeep, generous 64 px rows, no decoration outside the chart.

## 2 Layout (d2, 722 body)

Lane 639 (default padding). The chart is ONE `div.es-chart[data-ws-content]` (white card, `border:2px solid creamDeep`, radius 16, `padding:8px`), CSS grid:
`grid-template-columns: 30px 10px 1fr 92px 92px 92px` (fact column = 639 - 16 pad - 30 - 10 - 276 = 307 px) ;
`grid-template-rows: 128px repeat(8, minmax(56px, 1fr))`.

```
+------------------------------------------------------------------ 639 ---+
| .es-chart  (white, pad 8)                                                 |
| [ ][ ][                               ][  SUN   ][ EARTH  ][  MOON  ]     |  head 128
|  30 10  307 (empty, cream)             | d 88*  | d 44    | d 26    |     |   drawing box 88x88 (bottom-aligned)
|                                        |(Sun)   |(Earth)  |(Moon)   |     |   + 6 gap + name pill 30
|----------------------------------------+--------+---------+---------|     |
| (1)  It makes its own light.           |  [  ]  |  [  ]   |  [  ]   |     |  row 64 (zebra white)
| (2)  We live on it.                    |  [  ]  |  [  ]   |  [  ]   |     |  row 64 (zebra creamDeep)
|  ...  8 rows                           |        |         |         |     |
| (8)  It is covered in craters.         |  [  ]  |  [  ]   |  [  ]   |     |
+---------------------------------------------------------------------------+
```

Arithmetic: head 128 + 8 × 64 = 640 + card pad 16 + border 4 = **660 ≤ 722** (three-line title + three-line instruction); at the fi four-line title (677) still fits; rows `minmax(56px,1fr)` absorb the slack (722 → rows 71). Floors (G1: element 44, numeral 26): tick box **44 × 44** dashed coral (`stroke-dasharray` via `.ws-blankbox` style: `border:2.5px dashed coral; border-radius:8px; background:white`), centred in its 92 × 64 cell; row badge = 30 px circle, teal 2 px ring, Baloo 2 700 17 px ink numeral (a label, not an answer; the answer is the tick); fact text Nunito 800 **18 px**, `line-height:1.2`, max 2 lines in 307 px (≈ 2 × 40 = 80 chars *est.* at 7.6 px/char; en longest 44 chars = 1 line; de/fi/pt +40 % ≈ 62 chars = 2 lines, 2 × 22 = 44 ≤ 56). Column separators: 1.5 px `grid` vertical rules between the three body columns only (not between badge and fact). Row separators: none (zebra carries the row).

Head cells: drawing box 88 × 88, `skyBody` centred horizontally, bottom of each body sits at y 84 of the box (so the three bodies stand on one invisible line: size is read left to right as big, middle, small). Name pill under it: Baloo 2 700 17 px, height 30, `padding:0 8px`, teal 2 px ring, white fill, `max-width:92px`, `white-space:nowrap`; longest names *est.* "le Soleil" 9 chars ≈ 78 px, fi "Aurinko" ≈ 64 px, es "la Tierra" ≈ 76 px. If a panel literal measures > 88 px the pill drops to 15 px (never wraps; gate asserts pill ≤ 92).

## 3 Ladder (base)

| key | d1 | d2 (ships) | d3 |
|---|---|---|---|
| `rows` | 6 | **8** | 10 |
| `facts` (per body) | 2/2/2 | **≥2 each, rng-balanced (3/3/2 or 3/2/3 or 2/3/3)** | ≥3 each |
| `sizeFacts` (`biggest`, `smallest`) | true (readable off the heads: the scaffold) | **false** | false |
| `rowMin` px | 72 | **56 (renders 64..71)** | 52 |
| `tickPx` | 48 | **44** | 44 |
| `factPx` | 20 | **18** | 17 |
| `headPx` (drawing box) | 96 | **88** | 80 |
| `zebra` | true | **true** | true |

d3 stack: 128 + 10 × 52 = 648 + 20 = 668 ≤ 722. d2 is the best page: every fact is a real test (no size fact that the heads answer).

## 4 Answer-hiding + uniqueness

- Nothing on the page is pre-ticked; the heads carry only the body name (validator: a head never contains a fact word). The fact is printed; the body it belongs to is the hidden stamp `data-lcs-body` on the row.
- Exactly one true body per fact (pedagogy truth vector, one `1`), so each row has exactly one correct box.
- The child marks one box per row (tick, cross or colour: any mark). A wrong answer = a mark in a different column; the teacher's key is the column sequence (e.g. S E M E S M S E), readable down the page.
- Position tells, measured on the SHIPPED seed (the seed carries no locale, so one tell ships to all eleven): column counts 3/3/2 in some order, no run of 3 same column, sequence not periodic (period 2 or 3), first row not always Sun.
- Stamps: row `data-lcs-row=<n> data-lcs-fact=<id> data-lcs-body=<sun|earth|moon>`; tick box `data-lcs-tick=<body>`; head `data-lcs-head=<body>`; chart `data-lcs-layout` ABSENT on the base (byte-identical rule).

## 5 Primitives / components

**Reused (exact):** `blankNumeralBox` (`templates/components-b3/ordinal-numbers.js`, F1 numeral boxes, `w:52 h:52`); `rulingBlock({rows,w,h,glyphH,starters,gap})` (`templates/components-b2.js`, F2/F4/F5 writing lines); `wordBank({words,wordPx})` (`components-b2.js`, F2/F5 banks); `svgRoot, el, circle, line` (`primitives/_svg.js`); sun geometry of `primitives/water-cycle.js` (disc r 30, 8 rays r 38 → 54, coral 4, round caps: copied as the unit recipe, not imported, because water-cycle does not export it); `data/science/day-vs-night.json bins[].label` ×11 (F3 chips, read-only).

**NOT used:** any `space/*` library picture (earth = photoreal, style clash with flat line-art and not needed; moon = a phase; the planets are wrong or grey-identical per the pedagogy ruling; sun BLOCKED); `cardGrid` (the base is a table, not cards; F2/F3 use it, see §7); `iconRows/fitIcons` (no pictures); `answerBox` (would stamp `data-lcs-answer="undefined"`); `water-cycle.js` itself (a weather scene, K-356's).

**NEW `primitives/moon-phase.js`** : `moonPhase({phase, hemisphere, d = 104, id}) -> {svg, meta:{phase, litFraction, litSide}}`.
- viewBox `-50 -50 100 100`, disc radius r = 46 (stroke room 4). THROWS if `d < 72` (G2 floor) or phase ∉ 0..7 or hemisphere ∉ {N,S}.
- θ = 45° · phase; litFraction = (1 - cos θ)/2 (0, .146, .5, .854, 1, .854, .5, .146).
- litSide: phase 1..3 → 'right' if N, 'left' if S; phase 5..7 → 'left' if N, 'right' if S; 0 and 4 → 'none'.
- Paint order: (1) `<circle r=46 fill=inkSoft data-lcs-part="dark">` (the whole disc dark first: a new Moon is a DARK DISC, the Moon is still there); (2) the lit shape `data-lcs-part="lit"` fill **white**, no stroke: for phase 4 `<circle r=46>`; for phase 0 omitted; otherwise, drawn for litSide RIGHT and mirrored with `transform="scale(-1,1)"` for LEFT: `rx = 46·|cos θ|` (32.53 at 45°/135°, 0 at 90°); path `M 0 -46 A 46 46 0 0 1 0 46 A {rx} 46 0 0 {s} 0 -46 Z` with **s = 0 for a crescent (θ < 90°, the terminator bulges toward the lit limb) and s = 1 for a gibbous (θ > 90°)**; at the quarters (rx = 0) the second segment is `L 0 -46`. Area check: crescent = πr²/2 − πr·rx/2, gibbous = πr²/2 + πr·rx/2 → exactly litFraction (the gate measures it). (3) `<circle r=46 fill=none stroke=teal stroke-width=3 data-lcs-part="rim">` on top (the whole disc ALWAYS outlined). No craters, no face.
- Root `<svg data-lcs-prim="moon-phase" data-lcs-phase data-lcs-lit data-lcs-litside data-lcs-hemi role="img" aria-label="">`.
- Sizes: crescent lit width = 46(1 − cos45°)/100 · d = 0.135 d → 14.0 px at d 104 (F1), 11.9 px at d 88 (F2), both ≥ 10 (pedagogy floor, less 1.5 px of rim stroke: 12.5 / 10.4 ✓). Greyscale: white (L 100) vs inkSoft (L ≈ 55) = strong contrast on any laser printer; coral appears nowhere on a phase disc.

**NEW `primitives/sky-bodies.js`** (unit viewBox `-50 -50 100 100` unless stated; all palette tokens):
- `sunDisc({d, discR = 27.8})` : `circle r {discR} fill coral`; 8 rays every 45° from r discR+7.4 to r 50 (the water-cycle 30/38/54 recipe scaled × 0.926), coral, stroke-width 3.7 unit (≈ 3.3 px at d 88), round caps. No face. `data-lcs-body="sun"`.
- `earthDisc({d})` : `circle r 46 fill tealSoft stroke teal 3` (ocean) + two land blobs `fill teal`, `clip-path` to the r 44 circle: A `M -30 -24 C -18 -34 -6 -26 -10 -14 C -14 -4 -4 4 -10 14 C -14 24 -22 30 -26 22 C -30 12 -36 -4 -30 -24 Z`, B `M 8 -30 C 22 -34 34 -22 30 -10 C 26 0 34 10 24 22 C 14 32 6 20 10 8 C 12 -4 0 -18 8 -30 Z`; one cloud streak `M -40 4 Q -20 -2 0 6` white 3 round. Greyscale: tealSoft (L ≈ 92) vs teal (L ≈ 40): reads as a globe. `data-lcs-body="earth"`.
- `moonDisc({d})` (the base head only; a FULL Moon, it names the body, not a phase): `circle r 46 fill white stroke teal 3` + three craters `fill none stroke grid 3`: (-14,-12) r 9 · (16,6) r 12 · (-6,22) r 6. `data-lcs-body="moon"`.
- Base head sizes: Default Sun (disc Ø 49 at d 88) vs Earth d 44 is too close (1.1). **Base head: `sunDisc({d:88, discR:34})` (rays 41.4 → 50; *d 88 incl. rays)** so Sun disc Ø 60 : Earth 44 : Moon 26 (1.36 : 1 : 0.59; Earth:Moon 1.69 ≥ 1.6 ✓); gate asserts disc diameters strictly decreasing.
- `sunEdge({side, h, w = 64})` : a sun centred OUTSIDE its box so only an arc shows: box `w × h`, centre x = -86 (side left; mirrored for right), y = h/2, disc r 110 coral (visible sliver 24 px), 5 rays at −40°, −20°, 0°, 20°, 40° from r 118 to r 138 coral 4 round. Clipped to the box (`<clipPath>` rect). Reads as "a Sun far bigger than this Earth". `data-lcs-sunside`.
- `earthTop({r = 60, markerAngle, sunSide, shadeNight = false})` : Earth seen from above the North Pole, in a box `(2r + 2·(r*0.45)) square` centred: `circle r fill white stroke teal 3`; pole dot `circle r 4 fill teal`; rotation arrow = arc radius 0.55 r from 200° to 330° (screen angles), teal 3, round cap, arrowhead 10 × 10 teal at the 330° end pointing COUNTER-CLOCKWISE on screen, i.e. the arc is drawn with `sweep-flag 0` from 330° back to 200° and the head sits at 200°: **the head direction is the thing the gate checks (counter-clockwise seen from above the North Pole)**; pin: rim point P = C + r·u(φ) where φ = the sun direction angle + markerAngle (sun direction = 180° for sunSide left, 0° for right), stem `line` P → C + (r + 14)u coral 3, head `circle r 9 fill coral stroke white 2` at C + (r + 22)u. `data-lcs-pin data-lcs-angle=<markerAngle>`. `shadeNight:true` (d1 only) adds a half-disc `fill tealSoft data-lcs-part="night"` on the far half. No continents (they would hint at a place, and a place hints at a time zone).

**NEW `primitives/planets.js`** : honest, greyscale-distinguishable glyphs (the caller's requirement), used ONLY in the F4 bank (where a picture cannot print the answer, see §7 F4) and never in an orbit slot. `planetGlyph({id, box = 80})`, one shared viewBox `0 0 100 100`, centre (50,50), so relative sizes are honest across the set (order true, not to scale: the landing says so). Radii (unit): **jupiter 36 · saturn 30 · uranus 23 · neptune 22 · earth 15 · venus 14.5 · mars 11 · mercury 9** (every pairwise order matches NASA diameters; Venus < Earth, Uranus > Neptune).
| id | recipe (palette only) | greyscale signal |
|---|---|---|
| mercury | disc fill `grid`, stroke ink 2; 3 craters `circle fill inkSoft` r 1.8 at (−3,−3) (3,2) (−1,4) rel. centre | small, mid-grey, speckled |
| venus | disc fill white, stroke ink 2; 2 swirl lines `grid 1.5` `M c−9 c−3 Q c c+2 c+9 c−4` and translated +6 y | small, WHITE, featureless |
| earth | `earthDisc` recipe scaled to r 15 (tealSoft ocean, teal land) | small, light with dark blobs |
| mars | disc fill coral, stroke ink 2; white polar cap `path` = the top 18 % chord of the disc; 1 inkSoft patch ellipse rx 3 ry 2 | smallest-but-one, mid tone, WHITE CAP |
| jupiter | disc fill cream stroke ink 2; 5 horizontal bands clipped to the disc, alternating `coralSoft` / `creamDeep`, 7 unit high; spot ellipse rx 6 ry 4 fill coral at (58,60) | biggest, STRIPED, with a spot |
| saturn | back half of ring (ellipse rx 48 ry 11, rotate −12°, stroke inkSoft 4, fill none, clipped to y < centre) → disc fill creamDeep stroke ink 2 + 2 bands `grid` → front half of ring | the ONLY horizontal ring |
| uranus | disc fill tealSoft stroke ink 2; thin ring ellipse rx 5 ry 31 (VERTICAL) stroke grid 2 | pale, featureless, VERTICAL ring |
| neptune | disc fill teal stroke ink 2; one streak `M 38 44 Q 50 40 60 45` white 2 | DARK, plain |
Minimum: `box ≥ 72` (mercury Ø 13 px); THROWS below. Greyscale uniqueness is gated: the 8 glyphs rendered to greyscale must pairwise differ in (mean L, has-ring, ring orientation, band count) as stamped `data-lcs-sig`.

**NEW `templates/components-b5/earth-and-space.js`** (behind `templates/components-b5.js`): `skyChart`, `skyHead`, `factRow`, `tickBox`, `dirKey`, `phaseStrip`, `phaseNameCard`, `dayNightCard`, `solarFan`, `planetBankCard`, `classBox`, `notPlanetMark`. Each face root stamps `data-ws-content` and (faces only) `data-lcs-layout`.

## 6 Locale slot structure

| surface | font | size | slot | reserve |
|---|---|---|---|---|
| head name pills (base) | Baloo 2 700 | 17 (15 fallback) | `bodies.{sun,earth,moon}` | 92 px, no wrap |
| fact text | Nunito 800 | 18 | `facts.<id>` | 2 lines × 307 px (≈ 80 chars; en ≤ 44, +40 % = 62) |
| F1 | none | | (no words on the strips; direction is drawn) | |
| F2 bank + writing | Nunito 800 bank 18 / child writes | glyphH 24 | `phaseNames.{0,2,4,6}` | bank ≤ 639 one row (de "abnehmender Halbmond" 20 chars ≈ 160 px; 4 words ≤ 640 *est.*: if it overflows, the bank wraps to 2 rows and the grid rows shrink, stack re-checked at 722) ; 2 writing lines per card |
| F3 chips | Baloo 2 700 | 20 | `day-vs-night.json bins[].label` | chip min 96, auto width, 2 per card in 287 |
| F4 bank labels | Nunito 800 | 16 (15 fallback) | `planets.<id>` | 76 px per card (fi/sv "Merkurius" 9 chars ≈ 68 *est.*) |
| F5 box labels | Baloo 2 700 | 19 | `classLabels.{giant,rocky,notPlanet}` | 2 lines in 297 px |
| F5 bank | Nunito 800 | 18 | `planets.*` + `notPlanet.{sun,moon}` | 2 rows × 639 |
Font floor 9 px nowhere approached (smallest 15). Nothing inflects: every word is a whole panel literal (pedagogy rule).

## 7 Five variation faces (b c d e f)

Every face is CODE on the one additive `layout` knob (pedagogy); the base stays byte-identical. Hub contract (all six): `apps['earth-and-space']` with `default_subject:'science'`, `axes['exercise-type']['earth-and-space']` slug + name ×11, one landing per face per locale with `coordinate.type:'earth-and-space'`, the face's `mode`, the band's level key, `theme:''`, committed + deployed; gate `scripts/verify-hub-type-rows.js` expects **6 rows per locale, 66/66** (no refusals).

**b · F1 Moon Phases in Order (G1, `layout:'phase-order'`): two NIGHT STRIPS.** Delta: no chart, no words on the body at all; two white strip cards, each opening with a drawn direction key (`dirKey`: a mini new Moon d 28 → a teal arrow 120 × 4 with a 12 px head → a mini full Moon d 28, centred, 40 high; the SHRINK strip draws it full → new), then five slots 124 wide each holding a `moonPhase` d **104** and under it a `blankNumeralBox 52 × 52`. Stack: strip = pad 18 + key 40 + 12 + disc 104 + 14 + box 52 + pad 18 = 258; two strips + gap 28 = **544 ≤ 722** (slack absorbed by the strip gap, `minmax`). Width 5 × 124 = 620 ≤ 639. Verify hook: lit-area / disc-area per disc within ±0.03 of `data-lcs-lit`; lit centroid on `litSide[hemisphere]` (pt left for waxing); shuffled order ≠ sorted, ≠ reverse, the two strips' answer sequences differ. Query face: "moon phases in order".

**c · F2 Name the Moon Phases (G2, `layout:'phase-names'`): an OBSERVATION LOG.** Delta: the bank on top (4 words, `wordBank`, 59 + 10), then a 2 × 4 grid of log cards 313 × 150 (gap 12): `moonPhase` d **88** in a creamDeep square 104 × 104 on the card's left, a `rulingBlock rows:2 glyphH:24` 185 wide on the right (two lines so de/nl/Nordic two-word names fit child handwriting). Stack: 69 + 4 × 150 + 3 × 12 = **705 ≤ 722** (rows `minmax(132px,1fr)`; at the fi four-line title 677: rows 136 ✓ with the bank at one row; the gate asserts). Phases exactly {0,2,4,6} × 2, no identical neighbours. Verify: litSide per hemisphere (the first/last-quarter pair is the whole test in pt), lines empty, bank order ≠ first four cards. Query face: "name the moon phases".

**d · F3 Why Do We Have Day and Night? (G2, `layout:'day-night-model'`): six MODEL CARDS.** Delta: the only face with the Sun off the edge and a pin on a globe. `cardGrid`-like 2 × 3, card 313 × 204 (gap 12 × 12): stage 128 high = `sunEdge` w 64 on `sunSide` + three dashed sunbeam lines (grid 2, dash 8 6) from x 70 to the Earth's near rim at y centre −34/0/+34 + `earthTop r 60` centred at x 190 (sun left; mirrored for right; pin on the far side reaches x 272 ≤ 301, near side x 108 ≥ 64 + 40 ✓), then two chips h 44 (Baloo 20, a 20 px drawn glyph inside: sun for day, crescent for night; the chip glyph is not an answer). Stack: 3 × 204 + 2 × 12 = **636 ≤ 722**. d2: `shadeNight:false` (shading would print the answer); pin angles {0, ±30, ±150, 180} relative to the Sun, never within 40° of the boundary; 3 day / 3 night; sunSide balanced, not alternating. Verify: pin angle recomputed from the pin head's pixel centre vs Earth centre within ±5° of the stamp; arrowhead counter-clockwise; no `[data-lcs-part="night"]`. Query face: "why do we have day and night".

**e · F4 Planets in Order from the Sun (G3, `layout:'planet-order'`): the SOLAR FAN.** Delta: the one face with the honest planet glyphs and a drawn system. Top: a bank of 8 `planetBankCard`s (76 × 104: `planetGlyph box 72` + name 16 px), shuffled, one row across 639 (8 × 76 + 7 × 5 = 643: gap 4 → 636 ✓), 104 + 12 below. Body: a fan region 220 × 512 on the left: a Sun quarter-disc in the top-left corner (centre (−40,−40), r 90 coral, 4 rays) and eight concentric orbit arcs (grid 1.5, centre (−40,−40)) through eight IDENTICAL numbered slot discs (r 16 teal, Baloo 700 17 white numeral 1..8), slot i at row centre y_i = 32 + 64(i−1), x_i = 70 + 18(i−1), orbit radius R_i = √((x_i+40)² + (y_i+40)²) (131 … 571): the dots march outward and down the page; to the right of each slot a `rulingBlock rows:1 glyphH:24` from x 240 to 639 (399 wide). Stack: 104 + 12 + 8 × 64 = **628 ≤ 722** (rows `minmax(56px,1fr)`). Why honest glyphs are safe HERE: the bank already prints every name, so a picture beside a name adds knowledge (Venus is plain, Saturn has the ring) and cannot reveal the ORDER; the slots are byte-identical discs (no ring, no size). Verify: slot x strictly increasing, all slot discs byte-identical, bank set === PLANETS, bank order ≠ answer / reverse / locale-alphabetical, every bank glyph's `data-lcs-sig` distinct, no Pluto. Query face: "planets in order".

**f · F5 Giant and Rocky Planets (G3, `layout:'planet-sizes'`): three SORTING BOXES.** Delta: no planet picture at all (a size or a ring would print the class); class shown by an abstract header glyph. Bank of 10 names (`wordBank` 18 px, 2 rows, ≈ 100 high), then row 1: two `classBox`es 313 × 330 (header glyph 72 high: giant = a plain disc r 34 unit with 3 `grid` bands; rocky = a plain disc r 12 unit with 2 crater rings; label pill Baloo 19; `rulingBlock rows:4 glyphH:24` 281 wide), row 2: the `notPlanet` box full lane 639 × 120 (header = `notPlanetMark`: a ring r 18 teal 3 with a coral 4 slash; label; two lines side by side). Stack: 100 + 14 + 330 + 14 + 120 = **578 ≤ 722**. Counts 4/4/2; bank order no 3 same class in a row. Verify: boxes empty, no `planetGlyph` anywhere, header glyphs identical to the spec (not a named planet). Query face: "giant and rocky planets" / "planet sizes".

**Why these five:** each one changes WHAT IS ON THE PAGE, not an adjective: a strip of phase discs (order), a log of phase discs (names), a model card (cause), a fan with a picture bank (sequence), a sorting grid of names (class). They follow the band ladder G1 → G2 → G3 and five distinct query heads. **First to cut:** F5 (its move overlaps F4's vocabulary and its query face is the thinnest outside de/fr/fi; the three new drawings are all exercised by the other four).

## 8 Two alternatives + recommendation

- **A1 key strip + three word chips per row (the pedagogy sketch):** a 120 px strip of the three bodies, then 8 rows each ending in three word chips. Honest and simple, but the names print 24 times, the key and the answers are two apparatuses, and circled chips scatter horizontally (the teacher cannot scan a column). Rejected for the chart.
- **A2 an orbit scene with numbered facts:** a Sun edge, Earth on an orbit, the Moon on its small orbit, and the child writes each fact's NUMBER next to the body it fits. Beautiful poster, but many-to-one answers are hard to check, the numbers crowd three small targets, and a 26 px Moon cannot hold three written numerals. Rejected.
- **Chosen: the Sky Chart:** one focal apparatus, names printed once, answers aligned in columns, same honest drawings reused by every face.

## 9 Risks, mitigations, print check

- **Greyscale:** phase discs are white vs inkSoft (never coral vs teal); the pin is coral on a WHITE Earth (L ≈ 64 vs 100, visible); the Sun is coral with rays (shape identifies it, not hue); the planet glyphs carry pattern signatures (speckle, stripes, horizontal vs vertical ring, white cap, dark disc) gated by `data-lcs-sig`. A human must still print one F4 page on a B&W laser and confirm Venus (white) vs Earth (light + blobs) at 72 px.
- **Long locales:** facts wrap to 2 lines (budgeted); head pills fall to 15 px, never wrap; the F2 bank may wrap (re-checked at 722); F4 bank labels at 16 px *est.* 68 px for "Merkurius": if > 74 px the label drops to 15 px (gate asserts no label clips).
- **Hemisphere:** pt renders every waxing phase lit LEFT; the gate measures the lit centroid per disc (a northern pt page fails; poison P16 of the pedagogy).
- **Floors:** tick 44, numeral boxes 52, F1 disc 104 / F2 disc 88 (≥ 80 / 72), crescent lit ≥ 10 px, Earth r 60, pin head 18, slot discs 32, writing glyphH 24; the 9 px floor is never near.
- **Pencil space:** every mark lands in a white cell (tick box, numeral box, ruled line), never on a drawing.
- **No cut lines** on any face.
- **Lint catches:** overflow, footer intrusion, font floor, palette (all fills are tokens; `inkSoft` dark side, `grid` craters). **Only a human eye catches:** whether the Sun reads as bigger than the Earth in the base heads at 88 px, the crescent's elegance at d 88 in greyscale, the solar fan's orbit arcs not reading as clutter behind the slots, and the Earth's continent blobs not reading as a face.

## 10 Summary

1. Base = the Sky Chart: three honest drawn bodies head three tick columns, eight fact rows, 660 px of 722.
2. Three NEW primitives: `moon-phase.js` (exact lit-area terminator, hemisphere mirror), `sky-bodies.js` (sun, Earth, Moon, sun edge, Earth-from-the-pole with pin), `planets.js` (8 honest glyphs, distinct in greyscale by pattern and ring).
3. No library picture anywhere (earth photoreal clash, moon is a phase, planets wrong, sun blocked).
4. Faces: night strips (G1 order), observation log (G2 names), model cards (G2 cause), solar fan with a picture bank (G3 sequence), three sorting boxes (G3 class).
5. All CODE on `layout`, 66/66 rows expected, pt mirrored, first to cut F5.
