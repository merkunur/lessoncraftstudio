# G1-378 `earth-and-space` : DESIGN B (nt10-E, 2026-09-23)

Designer B. Read: `_ROLE-DESIGN.md`, `_STUDIO-BRIEF.md`, `_SUBSTRATE.md` (DELTA + sheet), `_PANEL-FINDINGS.md` (lock row 6 + the earth-and-space ruling), the `space` sections of the four `_work/_selection-*.md`, `_work/G1-378-pedagogy.md` (the content contract: six moves, fact pool, forbidden facts, hemisphere rule, planet-picture refusal), `primitives/water-cycle.js` (sun geometry), `primitives/_tokens.js`, `templates/components-b2.js` (`wordBank` :228, `pillChoice` :244), `templates/components-b3/ordinal-numbers.js blankNumeralBox` (:151, default 68 × 44, stamps `data-lcs-answer`), `primitives/trace-path.js writingRow` (:681). Looked at renders `out/b4-sweep/en/G3-385` (water-cycle page: 3 px teal line art, coral markers, dashed coral lanes), `K-354` (body figure + leader lines), `G1-357` (bins). Designer A's file NOT read. (m) = read from the repo; *est.* = engineer measures in the real render (Baloo 2 / Nunito woff2 from `file://`). No library picture is used anywhere on this type (pedagogy ruling: 4 of 8 planet pictures wrong, `space/sun` blocked, `space/moon` is itself a phase), so no picture had to be opened for this file.

## Boundary

This page is NOT K-208 `science-sort` "Day and Night" (pictures into Day/Night bins: a classification of things), NOT K-211 hot/cold, NOT K-322 seasons (+K-338..341), NOT K-356 weather-symbols (+G3-385 water cycle, whose drawn sun this type reuses as geometry only), NOT G1-203 `science-sequence` (ordering library pictures), and NOT G1-376 plants (shares the sun glyph only). It owns the three bodies by one-body-only facts, the Moon's shape pattern and its four school names, day and night as a CONSEQUENCE of a spinning Earth facing the Sun, and the eight planets by name, order and size class. **Visual signature: "the Sun at the edge".** Every face that shows the Sun shows it as a large coral arc CUT by the lane edge (never a small disc with a face), so the Sun always reads as the biggest thing on the page without a size fact printed; everything else is 3 px teal line art on cream/white with one mid-grey (`inkSoft`) for shadow. No picture, no scene, no dark sky fill.

## 1 Page concept (base): "Three portraits, eight clues"

Across the top of the body sit three large portraits in one row, reading outward from the Sun: the Sun as a huge coral arc sliced by the left lane edge, the Earth as a 132 px teal-and-cream globe, the Moon as a 48 px white disc. Under each portrait: its name plate and a **pocket of four empty numeral boxes**. Below, eight numbered clue strips ("3 · It is a star."). The child reads a clue and writes its NUMBER in a box under the body it is true of. From across the room a teacher sees the Sun-Earth-Moon row (the family's head image) and three pockets; checking takes three glances (three pockets) instead of eight rows × three chips. Top quality: one focal apparatus (the portrait row, 260 px), clue text at 18 px on generous 44-52 px rows, pencil-first (numerals in 44 px boxes), and the pockets carry the SAME four boxes each, so the count of true facts per body is never printed.

Why not three chips per row (the obvious form): 24 printed body names in a column is visual noise at G1 and the portraits would be decoration; here the portraits ARE the answer targets, so the drawing does work.

## 2 Layout (d2, 722 body)

Body width `.ws-page` inner 675; everything sits in one `.ws-lane`-width block **639** (default padding; no override). Root `<div data-ws-content data-lcs-layout="base">` (base: attribute ABSENT, byte-identical rule applies to the knob, see §5).

```
.ws-body 639 wide                                                          y
+---------------------------------------------------------------------+   0
| PORTRAIT ROW  3 columns x 205 + 2 gaps 12 = 639                     |
| [ sunEdge col 205 x 150 ] [ earth d132 centred ] [ moon d48 centred ]|
|   coral arc, cut at x=0     globe, 3 land blobs    white disc, teal  |
+---------------------------------------------------------------------+ 150
| gap 8                                                                |
| [ name plate 36 ]          [ name plate 36 ]        [ name plate 36 ]| 158
| gap 8                                                                |
| [ 4 x blankNumeralBox 44x44, gap 8 = 200 ] x 3 pockets (one per col) | 202..246
+---------------------------------------------------------------------+ 246
| gap 22 (a 1.5 px grid rule at y 257, full width, separates zones)    |
+---------------------------------------------------------------------+ 268
| CLUE LIST  8 rows, grid-template-rows: repeat(8, minmax(44px, 1fr)) |
| [badge 32][12][ clue text Nunito 800 18, one line, <= 595 px ]       |
|  x 8 rows, row gap 8                                                 |
+---------------------------------------------------------------------+ 268 + 8x44 + 7x8 = 676
```

Arithmetic at the floor: 150 + 8 + 36 + 8 + 44 + 22 + (8 × 44 + 7 × 8 = 408) = **676 ≤ 722** (and ≤ 677, the 4-line fi title case: 1 px slack, so at 677 the rows sit at their 44 floor; at 722 the 46 px surplus is absorbed by the `1fr` rows → 49.75 px each). Worst-case chrome is the 722 case; the 814 one-line case gives rows 61 px, capped by `max-height` 60 on the row so the page stays calm (surplus goes to the gap above the list).

- **Portrait columns** `display:grid; grid-template-columns: repeat(3, 205px); column-gap: 12px`. Column 1 holds `sunEdge({side:'left', w:205, h:150, depth:118})` (§5): the visible coral cap is 118 px deep, full column height, with 5 rays. Column 2: `earthPortrait({d:132})` centred vertically in 150. Column 3: `moonPhase({phase:4, r:24, hemisphere})` = the full-Moon disc (d 48 ≥ G1 44 floor), centred. Honest size order Sun > Earth > Moon; Earth:Moon = 132:48 = **2.75** (≥ 1.6 rule; true ratio 3.67; not to scale).
- **Name plate**: white pill, border 2 teal, radius 999, height 36, padding 0 16, Baloo 2 700 **20** teal, centred in its column, `white-space:nowrap`, max inner width 173 (205 − 32). Longest plate *est.* ≤ 110 px (fi "Aurinko", de "die Sonne"; the panel may print bare nouns). Stamped `data-lcs-plate="<body>"`.
- **Pocket**: `display:flex; gap:8px; justify-content:center`, 4 × `blankNumeralBox({w:44, h:44})` = 200 wide, stamped `data-lcs-pocket="<body>"`; each box `data-lcs-answer=""` (open box; the pocket is open-ended, the ANSWER lives on the clue row).
- **Clue row**: `display:grid; grid-template-columns: 32px 1fr; column-gap:12px; align-items:center`. Badge = `.ws-card-badge`-style coral disc 32, numeral Baloo 2 700 18 white. Clue = panel literal, Nunito 800 **18** ink, `white-space:nowrap`; the validator MEASURES each literal ≤ **595 px** (639 − 32 − 12) in the real font (≈ 73 chars at 8.1 px/char; de +40 % on the en ≤ 44-char pool = 62 chars *est.* 500 px), so no clue ever wraps and the stack above is exact. Row `data-lcs-fact="<id>" data-lcs-body="<sun|earth|moon>" data-lcs-n="<1..8>"`.
- Every element ≥ G1 floor 44 (boxes 44, Moon 48, Earth 132); answer numeral written by the child in a 44 box (26 px numeral fits with 9 px margins).

## 3 Ladder (base)

| key | d1 | d2 (ships) | d3 |
|---|---|---|---|
| `rows` (clues) | 6 | **8** | 10 |
| `facts` per body | 2 / 2 / 2 | **≥ 2 each, rng (m pool: sun 3, earth 5, moon 3 non-size)** | ≥ 3 each |
| `sizeFacts` (biggest / smallest) | true | **false** | false |
| `slotsPerBody` (boxes in a pocket) | 3 | **4** | 5 |
| `portraitD` earth / moon | 144 / 52 | **132 / 48** | 120 / 44 |
| `factPx` / row min | 20 / 56 | **18 / 44** | 17 / 40 (fi measured at 677; d3 unpublished) |
| `bodyNamesOnPlates` | true | **true** | true |

`slotsPerBody` is always ≥ the maximum possible per-body count at that level (d2: 8 clues, each body ≥ 2 → max 4), so a pocket never runs out and never reveals a count. d1's size facts are readable off the portraits (scaffold); d2 excludes them (pedagogy).

## 4 Answer-hiding + uniqueness

The page prints clues and three empty pockets; the mapping clue → body lives only in `data-lcs-body` on each clue row. Each fact literal is true of exactly one body (pedagogy truth vector; forbidden-fact list enforced by the validator). The child writes clue numbers into the pocket of the body. Wrong answers are visible at a glance: a numeral in the wrong pocket, or a numeral written twice. The teacher's key is one line: "Sun: 2, 5, 7 · Earth: 1, 4, 8 · Moon: 3, 6" (not printed; the ZIP carries no answer key). **verify()** (base branch): 3 portraits in order sun, earth, moon; plates === `bodies[loc]`; three pockets × `slotsPerBody` boxes, all `data-lcs-answer=""`; clue rows `n` 1..rows contiguous; each row's `data-lcs-body` === the single 1 in `FACTS[id].truth`; per-body count ≥ 2; body sequence down the list has no run of 3 and is not periodic (period 2 or 3); no two clues share an id; clue text === `facts[loc][id]`; no size fact when `sizeFacts:false`; Sun visible depth > Earth d > Moon d (measured from the stamped geometry); no library `img` on the page.

## 5 Primitives / components

**Reused (exact).** `blankNumeralBox({w, h, answer})` (`templates/components-b3/ordinal-numbers.js:151`) · `wordBank({words, wordPx})` (`templates/components-b2.js:228`; 59 px single row + `margin-bottom:10`) · `writingRow({w, h, glyphH, xHeight:true})` (`primitives/trace-path.js:681`) · `svgRoot el circle line roundedRect label` (`primitives/_svg.js`) · the sun disc + ray geometry of `primitives/water-cycle.js` (core r 30, rays r 38 → 54, 8 × 45°, coral 4, round caps: copied as a RATIO 1 : 1.267 : 1.8, never imported from that file) · `.ws-achip` pill class (`page/page.css:406`) for the F3 day/night chips · the K-208 bin labels `data/science/day-vs-night.json bins[].label` ×11 (read-only) as the F3 chip words · tokens `cream creamDeep white teal tealSoft coral coralSoft ink inkSoft grid`, `stroke.primitive 3 / grid 1.5 / accent 4`, `density.G1 44/26`, `density.G23 36/22` · `lib/b5-common.js bank('earth-and-space', loc)`.

**NOT used.** Every `space/*` library picture (pedagogy ruling, see NEW planet disc below) · `science-category-sort` / `.sci-bin` (K-208's look; F5 bins are drawn by this family so the two never read alike) · `science-pair-match` / `.ws-match` · `answerBox` (stamps `data-lcs-answer="undefined"` open) · `sceneStage` · `unitAxis` · `image-vocabulary.js` at render (every word is a panel literal) · `thermometer.js`, `water-cycle.js` (import) · `pillChoice` (fixed padding; the F3 chips need a 44 px height).

**Layout knob.** One additive `layout` key on the base config: undefined (base, byte-identical, no `data-lcs-layout` attribute) | `'phase-order' | 'phase-names' | 'day-night-model' | 'planet-order' | 'planet-sizes'`; each face stamps `data-lcs-layout`. Guards key on `d.layout` and the named config keys, never the level index.

### NEW `primitives/moon-phase.js`

`moonPhase({phase, hemisphere = 'N', r, id}) -> {svg, width, height, meta:{phase, litFraction, litSide}}`

- viewBox `0 0 (2r+6) (2r+6)`, centre `c = r + 3` (3 px keeps the 3 px outline inside the box). `r` in px; **throws** if `r < 24` (base Moon) and, when `phase ∈ {1,7}`, if `r < 36` (crescent lit width at the equator = r(1 − cos 45°) = 0.293 r ≥ 10.5 px). `phase` integer 0..7 (throws otherwise).
- θ = 45° · phase; `litFraction = (1 − cos θ)/2` → 0, .146, .5, .854, 1, .854, .5, .146; `a = r·|cos θ|` (terminator semi-axis).
- `litSide`: N → `right` for 1..3, `left` for 5..7; S → mirrored; `none` for 0 and 4. Mirroring is a `transform="translate(2c,0) scale(-1,1)"` on the lit group only.
- **Draw order:** (1) dark disc `circle(c,c,r)` fill **inkSoft**, no stroke. (2) lit region fill **white**, drawn for the RIGHT side then mirrored if needed: phase 4 → full `circle`; phase 2/6 → `M c,c−r A r r 0 0 1 c,c+r L c,c−r Z`; crescent (phase 1/7, cos θ > 0): `M c,c−r A r r 0 0 1 c,c+r A a r 0 0 0 c,c−r Z`; gibbous (3/5, cos θ < 0): `M c,c−r A r r 0 0 1 c,c+r A a r 0 0 1 c,c−r Z` (sweep 1 = the terminator bulges into the dark half). (3) outline `circle(c,c,r)` fill none, stroke **teal 3** (always: a new Moon is a grey disc with a teal ring, the Moon is "still there"). No craters, no face, no halo.
- Root `<svg data-lcs-prim="moon-phase" data-lcs-phase data-lcs-lit="<litFraction 3dp>" data-lcs-litside role="img" aria-label="">`.
- Greyscale: white (L 100) vs inkSoft (#8A8276, L ≈ 55) vs teal ring (L ≈ 40): three distinct steps on a mono laser.
- **Gate `qa/verify-moon-phase.js`:** rasterise each of 8 × 2 hemispheres at r 36 and r 56; measured lit pixel area / disc area within ±0.03 of `litFraction`; lit centroid x on `litSide` (poison: a pt page drawn N fails; a crescent path with sweep flipped fails); crescent lit width at y = c ≥ 10 px; only token hexes.

### NEW `primitives/sky-bodies.js`

1. `sunEdge({side = 'left'|'right'|'top', w, h, depth})` → the Sun cut by the box edge. For `left`: circle centre `(depth − R, h/2)` with `R = max(h, (h²/4 + depth²)/(2·depth)) + 20` (so the visible chord at x = 0 exceeds h: the arc spans the full height and is clipped by a `clipPath` = the box). Fill **coral**, no stroke. Rays: 5 lines on the visible limb at angles −40°, −20°, 0°, 20°, 40° from the inward normal, from `R + 10` to `R + 30`, coral 4, round caps, clipped to the box. `right` mirrors; `top` rotates (normal = down). Stamps `data-lcs-prim="sun-edge" data-lcs-side data-lcs-depth`. Min `depth` 60 (throws). NO face, no text.
2. `earthPortrait({d})` (base only): viewBox `-50 -50 100 100` scaled to d. Disc r 48 fill **tealSoft**, stroke teal 3 (in px, `vector-effect:non-scaling-stroke`). Three land blobs fill **cream**, stroke teal 1.5, clipped to the disc: A `M -30 -22 C -22 -36 -2 -34 -4 -20 C -6 -8 -20 -4 -26 -10 C -32 -14 -36 -16 -30 -22 Z` · B `M 6 2 C 18 -8 34 0 30 14 C 26 28 12 34 6 24 C 2 16 0 8 6 2 Z` · C `M -24 22 C -16 18 -8 24 -12 32 C -16 38 -26 36 -28 30 C -30 26 -28 24 -24 22 Z`. Stylised, not a map; no continents named. Min d 96 (throws).
3. `earthTop({r, sunDir = 'left'|'right', pins:[{angle, n}]})` (F3): viewBox `0 0 (2r+40) (2r+40)`, centre `C = r + 20`. Disc fill **white**, stroke teal 3 (white, NOT tealSoft: nothing on the disc may suggest a lit half). Pole dot `circle r 5 fill teal` at C. Rotation arrow: arc radius 0.32 r from 200° to 340° (screen angles, y down) drawn **counter-clockwise as seen from above the North Pole** = `sweep-flag 0`, teal 3, filled teal arrowhead 10 × 10 at the 340°-end, tangent. Pins: angle measured from the Sun direction (0° = the point of the rim facing the Sun), positive counter-clockwise; pin centre at radius `0.80 r`; pin = white halo circle r 17 stroke white 4 + coral disc r 14 + numeral white Baloo 2 700 16 centred (the water-cycle marker recipe, m); `<g data-lcs-pin data-lcs-n data-lcs-angle>`. Pins may not sit within 40° of ±90° (throws: `min(| |angle| − 90 |) ≥ 40`) and must be ≥ 50 px apart (throws). Min r 120 (throws).
4. `planetDisc({d, n})` (F4): circle d, fill **white**, stroke teal 3, numeral `n` Baloo 2 700 18 ink centred; IDENTICAL geometry for all eight (no ring, no band, no size), `data-lcs-slot="<n>"`. Min d 36.

### NEW `templates/components-b5/earth-and-space.js` (behind `templates/components-b5.js` barrel)

`portraitRow({bodies, plates, slotsPerBody, earthD, moonD, hemisphere})` · `clueList({rows:[{n, id, body, text}], factPx, rowMin})` · `moonRow({phases, hemisphere, r, cue:'grow'|'shrink'})` (§7 F1) · `growCue({dir, w:120, h:40})` · `phaseCard({phase, hemisphere, r, lineW})` (§7 F2) · `dayNightModel({sunDir, r, pins, chips})` (§7 F3) · `orbitFan({pitch, discD, lineGlyphH})` (§7 F4) · `sizeBins({labels, lines:4, pitch})` (§7 F5). Scoped inline CSS; no `page.css` edit; every stage root stamps `[data-ws-content]`.

## 6 Locale slot structure

| surface | font | size | reserve (longest locale) | source |
|---|---|---|---|---|
| name plates (base) | Baloo 2 700 | 20 | 173 px inner; *est.* ≤ 110 | `bodies.*` |
| clue strips (base) | Nunito 800 | 18 | **measured ≤ 595 px** (validator) | `facts.*` |
| pocket / F1 boxes | child's pencil | numeral 26 in 44 box | none | none |
| F2 word bank | Nunito 800 (`.ws-bankword`) | 18 | 4 words in one 639 row; *est.* de "abnehmender Halbmond" ≈ 175 + padding 24 → 4 × ≤ 200 + gaps fits; if the measured row > 639 it wraps to 2 rows (+44, budgeted) | `phaseNames.*` |
| F2 / F4 / F5 writing lines | pencil, glyphH 24 | none | line ≥ 290 (F2), ≥ 200 (F4), 181 (F5) vs longest handwritten name *est.* 12 px/char: de 20 chars = 240 (F2 fits), fi "Merkurius" 108 (F4/F5 fit) | none |
| F3 chips | Baloo 2 700 | 18 | chip inner 104; K-208 labels ≤ 8 chars (de "Nacht", fi "yö", pt "noite") | `day-vs-night.json` |
| F4 / F5 banks | Nunito 800 | 18 | 8 or 10 names, 2 rows | `planets.*`, `notPlanet.*` |
| F5 bin headers | Baloo 2 700 | 18 | 181 px inner, up to 2 lines (48 high budgeted) | `classLabels.*` |
| pin / planet numerals | Baloo 2 700 | 16 / 18 | digits only | none |

Floor: smallest text 16 (pin numerals) vs the 9 px lint. de keeps noun capitals; no surface inflects (every string is a whole literal); the +40 % reserve is honoured by measurement, never by shrinking a font below the listed size (a literal that overflows is sent back to the panel).

## 7 Five variation faces

**F1 · Moon Phases in Order (G1, `G1-3xx` TBD, CODE `layout:'phase-order'`). Delta: the portrait row and clue list are gone; the page is two tall "Moon rails".** Each rail = a cream card 639 × 256 (radius 16, border 2 creamDeep): at its top-left a `growCue` (120 × 40: a teal-outlined wedge that widens left → right for "grow", narrows for "shrink", with a coral arrow 4 px along its base; NO moon icons, so the extremes are not printed as answers), then 5 `moonPhase` discs **r 56** (d 112, +6 box = 118) on a 127.8 px pitch, each above a centred `blankNumeralBox({w:56, h:44})`. Rail stack: 16 pad + 40 cue + 12 + 118 + 12 + 44 + 14 pad = 256; two rails + gap 28 = **540 ≤ 722**, centred with `1fr` spacers. Rail A = phases {0,1,2,3,4}, rail B = {4,5,6,7,0}, each shuffled, never sorted, never reversed, never the same box-answer sequence in both rails. Crescent lit width at r 56 = 16.4 px. pt renders mirrored. Instruction: "The Moon seems to grow, then shrink. Write 1 to 5 under the moons in each row, in that order." Verify hook: `data-lcs-phase/lit/litside` per disc, `data-lcs-answer` 1..5 per box; rank by litFraction (asc A, desc B); litSide per `hemisphere[loc]`. Query face: "moon phases in order".

**F2 · Name the Moon Phases (G2, `G2-3xx` TBD, CODE `layout:'phase-names'`). Delta: a word bank + a 2 × 4 grid of moon cards with writing lines.** `wordBank` of the 4 names (59 + 10) at the top; then `cardGrid`-style grid 2 columns × 4 rows, column 313.5 (639 − 12 gap) / 2, row gap 12; each `phaseCard` = moon **r 36** (d 78) centred at the top, 8 gap, one `writingRow({w:290, h:44, glyphH:24, xHeight:true})`, padding 10: card 10 + 78 + 8 + 44 + 10 = 150. Stack 69 + 16 + 4 × 150 + 3 × 12 = **721 ≤ 722** at d2; at the 677 fi case the card drops to r 32 (d 70, `phaseR` computed from the measured chrome, never below 32 = G2 floor 64 d) → 69 + 16 + 4 × 138 + 36 = 673. *est.*, engineer confirms. Phases {0,2,4,6} × 2, no identical neighbours in reading order (left-right, top-bottom), bank order ≠ first-four-cards order. Instruction: "Look at each moon. Write its name on the line. Use each word in the word bank twice." Verify: `data-lcs-phase` per card, bank `data-lcs-bank=<phase>`, name = `phaseNames[loc][phase]`, lines empty. Query face: "name the moon phases".

**F3 · Why Do We Have Day and Night? (G2, `G2-3xx` TBD, CODE `layout:'day-night-model'`). Delta: ONE big model instead of cards: the Sun at the lane edge, one large top-view Earth with six numbered pins, and an answer table.** Model panel 639 × 380: `sunEdge({side: sunDir, w:639, h:380, depth:96})`; three coral dashed "light" arrows (4 px, dash 12 8) from the Sun's limb toward the Earth, stopping 16 px short of the rim (they show where light comes from, they do not shade); `earthTop({r:150, sunDir, pins})` centred at x = 639/2 + 48 (left sun) with 6 pins. `sunDir` ∈ {left, right} by rng (locale-neutral seed). Pin angles: 3 from {0, ±25, ±50} (day) and 3 from {180, ±155, ±130} (night), every pin ≥ 40° from the terminator, pins ≥ 50 px apart, pin NUMBERS assigned in a shuffled order so number 1..6 does not walk the rim (never 1-2-3 all day). Answer table below: 2 columns × 3 rows, each row = pin badge (coral disc 32, white numeral) + two `.ws-achip` chips 120 × 44 (day word, night word from `day-vs-night.json`, same order every row), row gap 10: 3 × 44 + 2 × 10 = 152. Stack 380 + 20 + 152 = **552 ≤ 722** (677 fine). No shading anywhere (the gate asserts no `inkSoft`/`tealSoft` fill on the Earth). Instruction: "Look where the Sun is. At each numbered pin, is it day or night? Circle the word in the table." Verify: `data-lcs-angle` per pin, hidden `data-lcs-answer` per table row = day iff |angle| < 90; 3/3 split; pin angle recomputed from the pin's pixel centre within ±5°; rotation arrow sweep = counter-clockwise; chips unmarked. Query face: "why do we have day and night".

**F4 · Planets in Order from the Sun (G3, `G3-3xx` TBD, CODE `layout:'planet-order'`). Delta: the "orbit fan": the Sun as a quarter-disc in the top-left corner and eight dashed orbits sweeping down-right, one plain numbered planet disc on each, a writing line to its right.** Panel 639 × H, H = 150 + 7 × pitch + 28, `pitch` = `minmax(50, 56)` (56 → 570; 50 → 528). Sun: coral circle centre (−40, −40) r 110, 4 rays on its limb (−10°..100° span), clipped. Row k (1..8): y_k = 150 + (k − 1) · pitch; orbit radius ρ_k = 1.25 · (y_k + 40); disc centre x_k = −40 + √(ρ_k² − (y_k + 40)²) = −40 + 0.75 (y_k + 40) (102 at k = 1, 396 at k = 8, pitch 56). Orbit arc k = dashed `grid` 1.5 (dash 6 6), drawn ONLY from the disc down-left to the panel's left/bottom edge (the part above-right of the disc is omitted, so no arc crosses a writing line; checked: for y > y_k the arc's x < x_k < x_j of every lower row). `planetDisc({d:36, n:k})` at (x_k, y_k). Writing line `writingRow({w: 639 − (x_k + 30), h:44, glyphH:24})` from x_k + 30, baseline y_k + 14 (row 8 line = 213 px ≥ 108 fi "Merkurius" *est.*). Bank: `wordBank` of the 8 names (2 rows *est.* 110) below. Stack 570 + 16 + 110 = **696 ≤ 722**; at 677, pitch 50 → 528 + 16 + 110 = 654. Bank order ≠ answer, ≠ reverse, ≠ alphabetical. Never Pluto. Instruction: "Write the name of each planet on its line, starting next to the Sun. Use every name in the bank once." Verify: `data-lcs-slot` 1..8 + hidden `data-lcs-answer=<planetId>`; all eight disc SVGs byte-identical except the numeral; lines empty. Query face: "planets in order".

**F5 · Giant and Rocky Planets (G3, `G3-3xx` TBD, CODE `layout:'planet-sizes'`). Delta: three drawn size bins with a size glyph each; no orbit, no Sun art.** Bank of 10 names (8 planets + the Sun's and the Moon's literal) at the top (*est.* 2 rows, 110); then 3 bins 205 × 400 (gap 12), each a white box radius 16 border 3 teal: header zone 108 = glyph (giant: an outline circle d 56 teal 3; rocky: an outline circle d 24; not a planet: an outline circle d 40 crossed by a teal 3 diagonal, the "no" sign) + label Baloo 2 700 18 teal, ≤ 2 lines in 181 px; then **4 writing lines in EVERY bin** (12 lines for 10 names, so line counts never print the 4/4/2 answer), each `writingRow({w:181, h:64, glyphH:24})`, pitch 68: 4 × 68 = 272; bin 108 + 272 + 20 pad = 400. Stack 110 + 20 + 400 = **530 ≤ 722**. Bank order: no 3 consecutive of one class. Labels "giant" never "gas". Instruction: "Sort the names. Write each one in the right box: giant planet, small rocky planet or not a planet." Verify: hidden `data-lcs-class` per bank name from `SIZE_CLASS`; 4/4/2; bins empty; no planet drawing, no number, no size on the page. Query face: "giant and rocky planets" / "planet sizes".

**Why these five.** They are the pedagogy's five moves, each with a visibly different apparatus (rails · cards · one globe · orbit fan · size bins), so no two faces look like a re-skin and every title owns its own head (order / name / why / order-from-the-Sun / sizes). Two moon faces are justified by demand (the moon-phase head is A-tier in en/es/fr/pt/sv/da) and by a different move (pattern vs vocabulary). **First to cut:** F5 (G3, weakest search head outside da/no/fi, and the only face whose apparatus is plain boxes); F2 next if the native panels cannot give four one-shape-only names (Germanic/Nordic "zunehmend/tiltagende" risk).

**Hub visibility contract.** `apps['earth-and-space']` (`default_subject:'science'`, `default_age_range:'6-8'`), `axes['exercise-type']['earth-and-space']` slug + name ×11, exactly one landing per face per locale with `coordinate.type:'earth-and-space'`, `coordinate.mode` ∈ {`base`, `moon-phases-in-order`, `moon-phase-names`, `day-and-night-model`, `planets-in-order`, `planet-sizes`}, `theme:''`, level key from the band table, `canonicalDeckSlug` = the published deck; committed and deployed. Gate `scripts/verify-hub-type-rows.js` expects **6 rows per locale × 11 = 66** (no refusals recorded).

## 8 Two alternatives + recommendation

**Alt 1: fact rows with three picture chips** (each row ends in a sun glyph / earth glyph / moon glyph to circle; pedagogy's layout with icons instead of words). Simple for the child and pre-reader friendly, but 24 small body glyphs repeat down the page (the picture becomes wallpaper), the checking load is 8 rows, and the chips' left-to-right order is the same on every row, which invites a column tell that verify must police. Rejected in favour of pockets: one apparatus, three targets, no printed per-row choice.

**Alt 2: a patterned planet set** (the "8 planets distinguishable in greyscale" idea). Recipe considered: Mercury = grey disc + 5 grid crater rings; Venus = white disc + 3 inkSoft swirl arcs; Earth = the `earthPortrait` blobs; Mars = coral-soft disc + inkSoft polar cap; Jupiter = 5 horizontal inkSoft bands + an oval; Saturn = banded disc + ellipse ring rx 1.9 r; Uranus = plain tealSoft disc + a VERTICAL thin ring; Neptune = tealSoft disc + one inkSoft oval spot; drawn at true size class. Rejected for every shipped face: on F4 the ring prints Saturn = slot 6 and the bands print the giants (half the order), on F5 the drawn size IS the answer, and a stylised pattern is not something a K-3 child is taught to recognise (the curriculum teaches names, order and class). Kept here so the critic can adopt it for a future non-answer surface (a hub thumbnail or a landing illustration), never on a sheet.

**Recommendation.** The chosen set (portraits + pockets base; rails; cards; one-globe model; orbit fan; size bins) wins because each face has a single focal drawing a teacher recognises from across the room, the Sun-at-the-edge signature keeps size honest without a size fact, and every answer surface (pocket, rail box, line, chip) is empty and count-neutral.

## 9 Risks, mitigations, print check

- **Long locales.** Base clues measured ≤ 595 px by the validator (a longer literal is returned to the panel, never wrapped); F2 bank measured, wraps to a second row inside the budget; F5 labels allowed 2 lines; fi 4-line title: base 676 fits 677 at row floor, F2 drops to r 32 by computation, F4 pitch 50.
- **Greyscale.** Coral Sun prints ~55 % grey as a large solid shape (unmistakable); moon shadow = inkSoft solid (mid grey) vs white lit part vs teal ring: three steps; pins keep their white halo on a white globe; F3 light arrows are dashed coral (grey dashes). Nothing depends on coral-vs-teal hue: every distinction is shape or fill value.
- **Ink.** Largest dark fills: F1 two rails of partly dark discs (≈ 10 discs × ~5,000 px² × ~0.5 dark) and the Sun cap; acceptable; no dark sky background anywhere.
- **Pencil space.** Boxes 44 × 44 (base), 56 × 44 (F1); lines 290 / ≥ 213 / 181 at glyphH 24; F3 chips 120 × 44 with 12 px between for a ring.
- **Physics sanity only a human eye catches.** F1/F2 moons are drawn with no Sun nearby (a Sun on a phase page would contradict the lit side unless placed correctly); the base Earth blobs must not read as a real map; F3's globe must not look shaded; the pt pages must look mirrored against de.
- **Cut lines:** none (no cutting on this type).
- **QA lint catches:** overflow, footer intrusion, the 9 px floor, off-palette hex, blank page (every stage stamps `[data-ws-content]`). **The family gate `qa/verify-b5-earth-and-space.js` must catch (no generic lint does):** element floors per band; litFraction ±0.03 and litSide per hemisphere on the render; Sun visible size > Earth > Moon; F3 pin angle from pixels ±5°, no Earth shading; F4 identical discs and no arc crossing a writing line (bbox test); pocket / line counts count-neutral; no `img` from `space/`; no answer printed.
- **Print check (engineer, mono laser, 100 %):** print base, F1 (en and pt), F3; write "7" in a pocket box, a name on an F4 row 8 line; confirm the r 56 crescent is a clear sliver, the new Moon is a grey disc with a ring, and the pt waxing crescent is lit on the LEFT.

## 10 Summary

1. Signature "the Sun at the edge": a big coral arc cut by the lane, teal line art, inkSoft shadow, no library picture anywhere.
2. Base "three portraits, eight clues": Sun | Earth | Moon row with four-box pockets; the child writes clue numbers under the true body (676 px at the floor).
3. Faces: Moon rails (F1, r 56 discs, wedge cues), moon cards + bank (F2, 4 names × 2), one-globe day/night model with six pins (F3), orbit fan with identical planet discs (F4), three size bins with count-neutral lines (F5).
4. NEW `moon-phase.js` (exact arc recipe, hemisphere mirror, measured lit area) and `sky-bodies.js` (sunEdge, earthPortrait, earthTop, planetDisc) + `components-b5/earth-and-space.js`.
5. 66/66 pages expected; first cut F5; the patterned-planet set is specified but kept off every sheet because it prints answers.
