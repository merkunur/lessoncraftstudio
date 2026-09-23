# K-369 `road-safety`: DESIGN B ("a street in every row")

Designer B, 2026-09-23. Read: `_ROLE-DESIGN`, `_STUDIO-BRIEF`, `_SUBSTRATE` (+ DELTA), `_PANEL-FINDINGS` (lock row 2 + road-safety ruling), the road-safety sections of the four `_work/_selection-*.md`, `_work/K-369-pedagogy.md` (the content plan this file draws; its faces, sign sets, bank shape and poison list are adopted unless a line here says otherwise), `page/page.css` (`.ws-match` 354-391, `.ws-pill` 422, `.ws-blankbox` 445), `primitives/_tokens.js`, `primitives/bin.js` (the px-geometry primitive precedent), `primitives/_svg.js` exports, `templates/components-b3/ordinal-numbers.js:151 blankNumeralBox`, `templates/components-b2.js:244 pillChoice`, `qa/lints.js:12-17` (palette = `color` + `codeColors`, global), `../b4-designs/K-357-recycling.md` §2. LOOKED at `out/b4-sweep/en/K-357`, `K-356`, `K-354` (house look; K-357's 425 px empty line zone is the thing this design refuses to repeat). OPENED `occupations/crossing_guard@3x.webp` (orange round paddle, red vest: not any locale's regulation paddle; confirms the pedagogy's rejection). **This design names 0 library pictures**; every drawing is a new primitive specified in §5. (m) = measured in the repo; *est.* = engineer measures in a real render with Baloo 2 / Nunito loaded from `file://`. No em-dashes.

## Boundary

This page is NOT K-210 "Land, Water, and Air Transportation" (no vehicle classification, no "transportation/Verkehrsmittel" in any title), NOT K-213 helper↔tool, NOT the `vehicles` theme (never a title head, never a library vehicle picture), NOT K-241 / K-265..269 colour-by-code (F1 colours from knowledge of lamp POSITION, no legend maps a symbol to a colour), NOT G1-203 science-sequence (F3 orders a behaviour routine, never "sequence" as its head), NOT K-064..067 position words and NOT K-065 left/right (the look-left/right frames are steps of a routine, never a left-or-right discrimination item), NOT K-368 2d-shapes (no shape names on any page; F4 bins carry meaning-class words only), NOT maps G1-379 (no way-to-school map). **Visual signature: every apparatus stands on a ground line.** Each base row is a tiny side-view street cross-section: kerb on the left, the traffic light on the kerb corner in the middle, the zebra or the road on the right. Waiting happens LEFT of the light, going happens RIGHT of it, on every row of every page, so "stop" and "go" are also two places on a street.

## 1 Page concept (base)

**"Stop or go? Six little streets."** Two columns of three street strips. In the middle of each strip stands one traffic light with exactly one lamp lit; to its left, waiting (a person standing on the kerb, or a car waiting before the stop line), to its right, going (a person walking on the zebra, or a car driving on with motion lines). Each side carries its word pill above the drawing. The child circles the side that the lit lamp tells that road user to do. From across the room: six tall teal lights in two quiet columns, a single warm colour glowing in each, all standing on a shared ground line. Top quality because (a) the light is the one focal object and sits BETWEEN its two outcomes, so the decision is literally a fork the eye travels; (b) the answer layout is fixed (stop left, go right), so a five-year-old spends the page reading lights, not hunting for where the choices went; (c) the ground band tells whose light it is before any word is read (kerb + zebra = walker's light; road + stop line = car's light); (d) nothing floats: no empty 400 px line zone, the whitespace is the sky above the small figures next to the tall lights.

## 2 Layout (d2, 722 body; designed to 677 so the fi four-line title also fits)

Root `<div class="rs-fork" data-ws-content style="display:grid;grid-template-columns:306px 306px;column-gap:27px;row-gap:12px;grid-template-rows:repeat(3,minmax(212px,1fr));align-content:space-evenly;padding:0 18px">` (inner width 306 + 27 + 306 = **639**). A 1.5 px `grid` rule runs down the centre of the 27 px gutter (x 319.5 of 639), full body height, the only divider.

```
x  0     96 102       204 210    306 | 333   429 435      537 543    639
   +------+----+--------+----+------+ | +------+----+--------+----+------+
y0 |      |    |[hous-  |    |      | | |      |    | light  |    |      |
   |      |    | ing 76]|    |      | | |      |    |        |    |      |
   |      |    | lamp56 |    |      | | |      |    |        |    |      |   row 1  212
   |[pill]|    |=rays=  |    |[pill]| | |[pill]|    |        |    |[pill]|
   |[fig ]|    | lamp56 |    |[fig ]| | |[fig ]|    |        |    |[fig ]|
   |[ 84 ]|    | lamp56 |    |[ 84 ]| | |      |    |        |    |      |
y202|KKKKKKKKKKKKKK|pole|ZwZwZwZwZwZwZ| | ground band 10                        |
   +---------------------------------+ | +--------------------------------+
   row gap 12 ; rows 2 and 3 identical grid (212 each)
```

Vertical arithmetic: 3 rows × 212 + 2 gaps × 12 = **660** ≤ 677 (fi four-line) ≤ 722 (three-line title + three-line instruction; slack 62 opened by `align-content:space-evenly` + `minmax(212px,1fr)`; at one-line chrome 814 each row grows to ~259, the light and the figures stay bottom-anchored on the ground band, the sky grows).

**Triptych (306 × 212, row-local coordinates):**

| cell | x | w | content (bottom-anchored on y 202) |
|---|---|---|---|
| stop cell | 0 | 96 | word pill (h 36 one line / 56 two lines, width ≤ 96) · gap 8 · pictogram 96 × 84 (walker) or 96 × 52 (car) |
| gap | 96 | 6 | nothing |
| light cell | 102 | 102 | `trafficLight` housing 76 wide centred (x 115..191), side rays in the 13 px margins, pole to y 202 |
| gap | 204 | 6 | nothing |
| go cell | 210 | 96 | as the stop cell |
| ground band | 0 | 306 | y 202..212, see §5 `streetBand` |

Light sizes at d2: car housing 76 × 196 (3 lamps Ø56, lamp gap 6, housing pad 8: 3·56 + 2·6 + 2·8 = 196), pole 6 (y 196..202). Pedestrian housing 80 × 150 (2 lamps 60 × 60 rounded-square, gap 6, pad 10 and 12: 2·60 + 6 + 2·12 = 150), pole 52 (the ped housing sits at y 0..150 and its pole runs y 150..202, so car and pedestrian lights share the row's top edge and the columns read as even posts). Stop/go cell stack worst case: 56 + 8 + 84 = 148 ≤ 202 (54 px of sky above, next to the light's upper lamps).

Floors (K): lamp Ø56 = minElement 56 (m, `_tokens.js` density.K); pictogram 84 tall ≥ 56; pill word Baloo 2 700 **20 px** (fontLabel 18 is the floor; fit-shrink to 18, then two lines); ground band 10; rays 3 px stroke. Chrome: nothing on the page is under 9 px (the smallest drawn text is the pill at 18).

Widths I could not measure: every pill word width (*est.* Baloo 2 700 20 px ≈ 9.5-10.5 px/char, so a 72 px text box ≈ 7 chars per line; de "stehen bleiben", pt "esperar na calçada" type literals go to two lines, §6).

## 3 Ladder

| key | d1 | d2 (ships) | d3 |
|---|---|---|---|
| `layout` | `'fork'` | `'fork'` | `'fork'` |
| `rows` × `cols` | 2 × 2 (4 streets) | **3 × 2 (6 streets)** | 3 × 2 |
| `ped` / `car` | 4 / 0 | **3 / 3** (pt until `pedLight.stop` is set: 0 / 6) | 3 / 3 |
| `lit` | `['stop-lamp','go-lamp']` | **`['stop-lamp','go-lamp']`** | `+ 'amber'` only where `amberMeans === 'stop'` (en d3 = d2 config, recorded, never published) |
| `lampD` car / ped | 64 / 64 | **56 / 60** | 56 / 60 |
| `pillWords` | `'chipWords'` | **`'chipWords'`** (per actor, §6) | `'chipWords'` |
| balance | 2 stop + 2 go | **each column holds ≥ 1 stop and ≥ 1 go; each actor ≥ 1 stop and ≥ 1 go; page 3/3 ± 1** | as d2 |

d1 row height stays 212 (2 rows + gap = 436, slack opens the sky); d1 is pedestrian-only because the car-light reading ("the CAR stops") is the perspective switch the page teaches at d2.

## 4 Answer-hiding + uniqueness

The page prints the light and both outcomes; it never marks which side is right. The ONLY decisive feature is which lamp is lit: its INDEX (vertical position) and, on pedestrian lights, its glyph pose (standing / walking, or hand / walker in en). Exactly one lamp per light is lit (poison: two lit = FAIL). The answer side is re-derived by the gate from `lightRule = {ped:{0:'stop',1:'go'}, car:{0:'stop',1:'stop',2:'go'}}` (the pedagogy bank) applied to the INDEX read from the render (lamp centres sorted by y), never from the fill colour and never from a stamp alone. The child **circles** the stop side (pill + figure) or the go side. Wrong is visible to the teacher at a glance: a circle on the right of a red light, i.e. on the zebra side of a lit top lamp, is the one mistake that shows as "walking into the road" on the page itself. Positional tell check: the answer side is fixed by meaning (stop left, go right), so the thing the gate must keep non-guessable is the SEQUENCE of answers: no column may be all-stop or all-go, the reading-order answer string (col A rows 1-3 then col B) must not be `SSSGGG`, `GGGSSS`, `SGSGSG` or `GSGSGS` on the shipped seed (the nt10-D staircase lesson), and over 20 seeds no position is stop > 70 %.

## 5 Primitives / components

**Reused (exact names).** `blankNumeralBox` (`templates/components-b3/ordinal-numbers.js:151`, F3 open numerals; `answerBox` is NOT used anywhere, it stamps `undefined`) · `.ws-pill` class (`page.css:422`) for every word pill (white, teal 2 px, Baloo 2 700) · `.ws-match` / `.ws-match-col` / `.ws-match-item` / `.ws-match-dot` (`page.css:354-391`, F2 only) · `svgRoot`, `el`, `roundedRect`, `line`, `circle`, `label` (`primitives/_svg.js`) · `data/color-words.js` (F1 crayon words, with the `amber.word` override from the bank). If K-368's `primitives/flat-shape.js` lands first, `road-sign.js` may import its regular-polygon vertex helper; the sign primitive never imports a shape NAME.

**NOT used.** `cardGrid` (a numbered card per light breaks the street strip into boxes and adds a badge a five-year-old reads as a count) · `science-category-sort.build()` (52 px items fail every floor here) · `pillChoice` (its 14 px gap flex row cannot sit on a ground band; the pills here are placed by the triptych) · `bin.js` (F4 bins are not waste bins; a lidded bin would import recycling's meaning) · `answerBox` (never without an answer) · any library picture (0 named; the pedagogy's opened-and-rejected list stands).

**NEW `templates/components-b5/road-safety.js`** exports: `streetStrip({actor, light, side})` (one 306 × 212 triptych), `forkGrid({strips, rows, cols})` (the §2 grid), `lightStreet({lights, band:'kerb'})` (F1), `shoulderCard({step, box})` (F3), `signPost({spec, size, post})` (F2/F4/F5 sign on a post), `letterBadge({ch})` (F4), `classBin({label, boxes})` (F4), `quizRow({text, chips})` (F5). Every stage stamps `data-ws-content`; every drawn signal sits inside `<g data-lcs-signal>`.

### NEW `primitives/traffic-light.js` (px geometry from `lampD`, no viewBox scaling, the `bin.js` convention)

`trafficLight({kind:'car'|'ped', lamps:3|2|3(it ped), on:null|index, fill:'lit'|'none', pedLight, lampD=56, poleLen=0, amberToken})` → `{svg, w, h, meta:{kind,lamps,on}}`.

- **Housing** `<g data-lcs-light-part="housing">`: rounded rect, fill `creamDeep`, stroke `teal` 3, radius 0.3·lampD. Car: w = lampD + 16, h = 3·lampD + 2·6 + 16. Ped: w = lampD + 20, h = lamps·lampD + (lamps−1)·6 + 24.
- **Lamps** `<g data-lcs-lamp data-lcs-index="i" data-lcs-on="0|1">`, index 0 = TOP. Car lamp: circle r = lampD/2, centre x = w/2, y = 8 + lampD/2 + i·(lampD+6). Ped lamp: rounded square lampD, r 0.18·lampD, top-left (10, 12 + i·(lampD+6)). Unlit: fill `white`, stroke `teal` 2. Lit (`fill:'lit'`): fill = the lamp's token (car: `codeRed` / `amberToken` / `codeGreen`; ped: lamp field stays `white`, the GLYPH is filled, see below), stroke `teal` 2. `fill:'none'` (F1): every lamp white, lit state shown ONLY by rays.
- **Rays** (the "on" mark, colour-free) `<g data-lcs-rays data-lcs-for="i">`: 3 per side of the housing, ink `ink`, stroke 3, round caps, length 10, starting 3 px outside the housing edge, at −30°, 0°, +30° from horizontal, centred on the lit lamp's y. Rays never enter the housing and never touch a neighbour lamp (this is why they are side rays: 8 radial rays on a Ø56 lamp with a 6 px gap run into the next lamp, measured from the geometry above: top-lamp ray end y 80 vs middle lamp top y 72). Total drawn width = housing + 2·13.
- **Ped glyphs** (from `road-pictogram.js`, drawn in a 0.8·lampD box centred in the lamp): stop lamp = `standing` (Vienna) or `hand` (en; pt per `pedLight.stop`), go lamp = `walking`. Unlit glyph: outline only, `ink` 2 px, fill `white`. Lit glyph: fill `codeRed` (stop) / `codeGreen` (go) / `codeOrange` (en hand), no outline change. **en go lamp lit** = lamp field `ink`, walker fill `white` (the US "lunar white" walker on a dark lens); unlit = white field, outline walker.
- **Pole** `<g data-lcs-light-part="pole">`: rect x w/2−5..w/2+5, from housing bottom for `poleLen`, fill `teal`.
- Minimums: lampD ≥ 56 (K), ≥ 44 (G1 mini light inside a sign is a glyph, not this primitive). Stamps: `data-lcs-light="car|ped"`, `data-lcs-lit-index`.
- Gate `qa/verify-b5-traffic-light.js` (render-parsing, never reads `meta`): counts ray groups (must be exactly 1 per light when `on !== null`), locates the lamp centre each ray group is vertically centred on, reads its index from y order, asserts housing stroke 3, no ray segment inside the housing box, ped glyph pose at index 0 = standing|hand and at index 1 = walking, lamp Ø ≥ floor.

### NEW `primitives/road-pictogram.js` (flat ink silhouettes, no faces; all coordinates in a 100 × 100 unit box scaled to the requested height)

- `walker({pose, h})`. **standing** (Vienna stop man, also the kerb figure): head `circle(50,14,r10)`; body path `M38,28 H62 Q66,28 66,32 V60 H60 V94 H52 V62 H48 V94 H40 V60 H34 V32 Q34,28 38,28 Z` (arms at the sides are the body's width). **walking**: head `circle(55,12,r10)`; torso `M47,26 L61,26 L65,58 L51,58 Z`; front leg `M53,55 L61,55 L76,93 L67,96 Z`; back leg `M51,55 L59,58 L43,96 L34,93 Z`; front arm `M59,29 L65,27 L75,49 L69,52 Z`; back arm `M49,29 L43,31 L32,49 L38,52 Z` (stride angle ≥ 30° so the pose reads at 40 px, poison-tested against the standing pose at 40 px by silhouette-width ratio ≥ 1.25). **hand** (en stop): palm rounded rect x30..70 y44..92 r8; four fingers rounded rects w 8, x 31/41/51/61, y 14..48, r 4; thumb `M30,64 L18,50 L12,54 L26,74 Z`. **back** (F3): head `circle(50,18,r11)` with a hair cap = the top half-disc of the head in `ink` over a `white` face-less head with ink 2 outline; body as `standing`. **back-look-left / back-look-right**: `back` with the head centre moved 4 units toward the looking side, plus a sight arrow: dashed ink path (dash 5/4, stroke 3) from the head edge 26 units outward and a solid chevron head (10 × 10) at its end, pointing to the page's LEFT for look-left. **back-walk**: `back` with legs as the walking legs mirrored to a back view (feet apart 36 units), scaled 0.85 (further up the road).
- `car({state:'waiting'|'driving', h})` in a 120 × 60 box: lower body rounded rect x4..116 y26..48 r8; cabin `M30,26 L42,8 H82 L96,26 Z`; window `M44,12 H80 L90,24 H36 Z` fill `white`; wheels `circle(32,50,r10)` and `circle(90,50,r10)` ink with `white` hubs r4. Fill `ink`, facing RIGHT always (direction of travel). `driving` adds three motion lines behind (x −22..−4 at y 20/32/44, ink 3, round caps).
- `streetBand({kind:'walk'|'drive', w=306, kerbTo=153})` 10 px high: **walk**: x 0..kerbTo `teal` block (the kerb, the light's pole stands at its right edge); x kerbTo..w road fill `grid` with `white` bars 10 wide every 20 px, outline `ink` 1.5 (the zebra). **drive**: x 0..w road `grid` outline `ink` 1.5; stop line = a `white` bar 6 wide, ink 1.5 outline, at x kerbTo − 16 (in front of the waiting car's bumper at x ≤ 110).

### NEW `primitives/road-sign.js` (the pedagogy's spec §D.2 with the geometry pinned; px from `size` = the sign's bounding width)

`roadSign({shape, rim, field, glyph, text, size})` → `{svg, meta}`; stamps `data-lcs-sign-shape/-rim/-field/-glyph/-role`. Every sign carries an `ink` 1.5 hairline outer edge so a white rim is visible on cream.

| shape | outline (s = size) | rim / field | glyph box |
|---|---|---|---|
| `octagon` (STOP/ALTO/PARE) | regular, flat top: circumradius 0.5412·s, vertices at 22.5° + 45°k | outer white band 0.05·s, field `codeRed` | text: Baloo 2 700 `white`, fitted to 0.64·s wide, ≥ 12 px |
| `triUp` (warning) | equilateral, side s, height 0.866·s, corner radius 0.05·s | rim `codeRed` 0.10·s, field `white` or `codeYellow` (per locale bank) | centred at 0.60·h, 0.46·s square |
| `triDown` (yield) | inverted `triUp` | rim `codeRed` 0.10·s, field as locale | none; en YIELD / es CEDA EL PASO text in `codeRed`, measured |
| `circle` rim (prohibition) | Ø s | rim `codeRed` 0.12·s, field `white` or `codeYellow` | 0.56·s square |
| `circle` no-entry | Ø s | field `codeRed`, bar `white` 0.64·s × 0.16·s centred | en DO NOT / ENTER white text above/below the bar, measured ≥ 9 px at s ≥ 80 |
| `circle` mandatory | Ø s | field `codeBlue`, inner `white` ring 0.03·s | `white` glyph 0.60·s |
| `square` (information) | rounded square s, r 0.08·s | field `codeBlue`, inner white border 0.04·s | Vienna crossing: `white` triangle side 0.72·s holding `ink` walkerOnStripes |
| `diamond` (US/MX/BR warning) | square s/√2 rotated 45° | field `codeYellow`, inner `ink` border 0.035·s | `ink` glyph 0.48·s |
| `pentagon` (US school S1-1) | points (0.5,0) (1,0.42) (1,1) (0,1) (0,0.42) × s | field `codeYellow`, `ink` border 0.035·s | twoChildren |

Glyph set (closed, 100-unit boxes): `walker` / `walking` (above), `walkerOnStripes` (walking at 0.7 + 4 stripes x 10..90 y 88..96), `twoChildren` (walking at 1.0 left + walking at 0.7 right, offset 28), `bicycle` (wheels `circle(26,66,r18)` `circle(74,66,r18)` stroke 6 no fill; frame `M26,66 L44,40 L66,40 L74,66 L50,66 Z` + `M44,40 L50,66`; bar `M66,40 L62,30 L70,30`; seat `M38,36 L50,36`, all stroke 6), `trafficLightMini` (housing 30 × 70 with three Ø18 lamps red/amber/green: the one place three fills appear together, allowed because it IS the sign), `bar`, `slash` (prohibition diagonal `codeRed` 0.10·s, top-left to bottom-right), `text`. **Dropped from my face set: the US crossbuck R15-1** (its RAILROAD CROSSING text is under 9 px below s = 110, *est.*; the pedagogy's en d3 extra is replaced by `bike-warning` + `no-bikes`).

Gate `qa/verify-b5-road-sign.js`: re-parses each sign's outline path (vertex count, orientation of the triangle apex, presence of a rim ring vs a filled field), classifies with its own table, asserts glyph box inside the field, text ≥ 9 px, and renders a greyscale copy to assert (a) rim-only vs filled circles differ in mean luminance ≥ 25 %, (b) white vs yellow fields differ ≥ 20 %.

**Greyscale arithmetic (Rec. 601 luma from the tokens, m):** codeRed 96 · codeBlue 97 · codeGreen 111 · teal 80 · codeOrange 128 · codeYellow 166 · ink 54 · white 255. **Red, blue and green print as the SAME grey (96-111)**, which is why no answer on any face is carried by hue: lamp INDEX, lit-vs-unlit (grey vs white + rays), glyph POSE, sign SHAPE and FILL-vs-RIM carry every decision; hue only reinforces.

## 6 Locale slot structure

| surface | slot | font | reserve / rule |
|---|---|---|---|
| base pills | `chipWords.{ped,car}.{stop,go}` (4 literals, panel) | Baloo 2 700 20 → 18 min, max 2 lines, box 96 | +40 % de/fi/pt: the 2-line form is designed in (pill h 56); a literal that needs 3 lines at 18 px FAILS the validator (panel shortens: fi "odota"/"mene", de "stehen"/"gehen", "halten"/"fahren") |
| F1 crayon strip | `COLOR_WORDS[loc]` red/green + `amber.word` | Nunito 800 16 under a Ø34 swatch | 3 words, each ≤ 140 px *est.* |
| F3 | numerals only (child writes) | none printed | 0 words on the stage |
| F2 meanings | `meanings.<role>` (6) | Nunito 800 17, ≤ 2 lines in a 340 box | ≤ 44 chars per line *est.*; 86 chars max; de/fi measured |
| F4 bins | `classes[].label` (2-3) | Baloo 2 700 18 pill over the bin | ≤ 190 px; de "Gefahrzeichen" 13 chars fits *est.* |
| F4 badges | letters A-H (Latin, no locale variation) | Baloo 2 700 16 white on `teal` Ø26 | none |
| F5 situations | `situations.<role>[k]` | Nunito 800 16, ≤ 3 lines in a 360 box | pedagogy cap 90 chars en; de/fi up to 126 must fit 3 lines (*est.* 46 chars/line) |
| signs | regulation text only (STOP / ALTO / PARE / YIELD / CEDA EL PASO / DO NOT ENTER) | Baloo 2 700 | from the signed sign table; never translated |

Titles and instructions are pedagogy §E literals. Instruction per face (en, ≤ 150): base "Look at the light that is on. Circle what to do: stop or go." (60) · F1 "One lamp on each light is on. Colour it red, yellow or green." · F3 "How do you cross the road? Write 1, 2, 3, 4, 5 in the boxes." · F2 "Draw a line from each road sign to what it means." · F4 "Write the letter of each sign in its group." · F5 "Read each sentence. Circle the road sign that fits." Every one names only apparatus on its page (boxes, letters, lines, circles).

## 7 Five variation faces

**F1 Colour the Traffic Lights (K, `K-371+ TBD`, CODE `mode:'colour-lights'`): "a street of lights".** Delta: no fork, no figures, no pills. Two street rows, each a full-width `streetBand kind:'walk'` kerb (639 × 10) with three lights standing on it on poles, spaced `space-evenly`; every lamp white (`fill:'none'`), the "on" lamp marked by side rays only, so there is nothing to copy. Above the rows, a centred **crayon strip**: three Ø34 swatches (`codeRed`, `amberToken`, `codeGreen`) with their colour words, in a seeded horizontal order that is never red-amber-green nor its reverse (the strip tells WHICH crayons, never which lamp). Numbers: crayon strip 34 + 6 + 20 = 60; gap 20; row = car housing (lampD 62: 3·62 + 12 + 16 = 214) + pole 40 + band 10 = 264; two rows + gap 28 = 556; total 636 ≤ 677. d2 `{lights:6, car:4, ped:2, lampD:62, onMark:'rays'}`; en `{car:6}`; it ped `lamps:2` even when `pedLamps:3`. Verify: 0 filled lamps anywhere (poison: one leaked fill), exactly one ray group per light, car indices 0/1/2 each ≥ 1, the crayon-strip order ∉ {RAG, GAR}. Query face: "colour the traffic light" (per-locale list in pedagogy F1).

**F3 Crossing the Road Safely: the Steps (K, `K-372+ TBD`, CODE `mode:'crossing-steps'`): "over-the-shoulder frames".** Delta: every frame is drawn FROM BEHIND the child, so the page's left is the child's own left (no mirroring decision is ever asked of a five-year-old). Frame scene (100-unit box, scaled to 180): near kerb y 80..100 `tealSoft` with a `teal` 2 edge line at y 80; road y 34..80 `grid`; zebra = five `white` vertical bars x 28..72 (w 6, gap 3.5) with `ink` 1.5 outlines, y 36..78; far kerb y 26..34 `tealSoft`. Figures: `back` standing (feet on y 96) for stop-kerb; `back-look-left` / `back-look-right` with the sight arrow; `back-walk` with feet on y 70 on the stripes and a straight `ink` chevron pointing up the road. Cards: 3 + 2 centred, card 196 × 262 (frame 180 × 180 cream, r 14, `creamDeep` 2 border; gap 14; `blankNumeralBox` 64 × 60 centred; pad 4). Width 3·196 + 2·20 = 628 ≤ 639; height 2·262 + 28 = 552 ≤ 677. d2 `{cards:5, steps:locale.steps, shuffledOffBy:≥3}`; the two `look-left` cards never adjacent in print. Verify (render): arrow chevron x-direction on `look-left` < 0 (parsed path), 0 numerals inside boxes, KIND sequence compare with the two look-left cards interchangeable. Query face: "crossing the road steps".

**F2 Road Signs and What They Mean (G1, `G1-381+ TBD`, CODE `mode:'sign-meaning'`): "signs on posts".** Delta: the `.ws-match` two-column layout (proven in K-356's render) with each sign standing on a short `teal` post (w 6, h 20) and a 20 × 4 `teal` foot, so a sign still reads as "by the road"; meanings in `.ws-match-item--plain` boxes. Numbers: `.ws-match` padding 6 30 → inner 615; left column 110 (sign s = 80 + post 20 = 100 tall), right column 340; 6 rows at pitch (677 − 12)/6 = 110, items ≥ 96 tall; line zone 615 − 110 − 340 = 165. d2 `{pairs:6, roles:locale.setG1}`; right column deranged (≤ 1 straight-across). Verify: role stamps both sides + the glyph cross-check (`twoChildren` only in `children`/`school`), no meaning contains the sign's printed text word. Query face: "traffic signs and their meanings".

**F4 Kinds of Road Signs: Sort Them (G2, `G2-360+ TBD`, CODE `mode:'sign-kinds'`): "write the letter, no crossing lines".** Delta from the pedagogy's line-to-bin sort: eight lines from a two-row strip into three bins cross the lower row's own signs (the top-row line from sign 1 to a right-hand bin runs through signs 6-8); instead each sign carries a letter badge (A-H, `teal` Ø26, Baloo 16 `white`) and each bin holds **the same number of write-in boxes** (`blankNumeralBox` 52 × 50, answer letter ≥ 22 px handwritten) so box count never leaks class size: 3 bins × 4 boxes (Vienna/es/pt), en 2 bins × 6. Numbers: strip 2 rows × 4 cards 150 × 150 (sign s = 92, post 16, gap 8, badge 26, pad 8) + 14 = 314; gap 28; bins row 3 × 199 (gap 21): label pill 34 + 8 + 2 × 2 boxes (2·50 + 10) + pad 24 = 176; total 518 ≤ 677, slack to `space-between`. Bins carry WORDS only (no shape). d2 `{signs:8, bins:classes.length, perBin:≥2, boxesPerBin:4|6}`. Verify: gate classifies from geometry (own table), bin order ≠ strip order, no `stop`/`yield` on a Vienna page, every bin the same box count, letters A-H unique. Query face: "types of road signs".

**F5 Road Sign Quiz: Which Sign Is It? (G2, `G2-361+ TBD`, CODE `mode:'sign-quiz'`): "one sentence, three signs".** Delta: text-led rows, no posts. Row = situation box (`.ws-match-item--plain` style, 360 wide, Nunito 800 16, ≤ 3 lines) + three sign tiles 80 × 80 (sign s = 68 ≥ the G2 64 floor, cream tile r 12, `creamDeep` 2): 360 + 15 + 3·80 + 2·12 = **639**. 6 rows at pitch (677 − 5·10)/6 = 104. d2 `{cards:6, chips:3}`; confusable pairs never on one row (pedagogy list). Verify: exactly one chip role === row role; correct-slot histogram over 20 seeds ≤ 60 % per slot and the shipped seed not a staircase; situation text free of the target sign's printed word. Query face: "road sign quiz".

**Why these five:** they are the pedagogy's five teaching moves (read → produce the colour → order the routine → sign-to-meaning → meaning class → meaning-to-sign) and each owns a visibly different apparatus (fork / street of lights / shoulder frames / posts + lines / letters + bins / sentence + tiles), so no two pages look alike on the hub. **First to cut: F5** (its move is F2 reversed; if the Romance or Nordic panels cannot author 12 non-leaking situations, it is the one refusal that loses the least).

**Hub visibility (restated).** A face shows under `road-safety` on `/[locale]/worksheets` only if `apps['road-safety']` exists, `axes['exercise-type']['road-safety']` has slug + name ×11, exactly one landing per face per locale carries `coordinate.type:'road-safety'`, `coordinate.mode` = the face mode (`'base'` for the base), `theme:''`, a band-table level key, a unique slug and the published deck as `canonicalDeckSlug`, committed and deployed. Gate: `scripts/verify-hub-type-rows.js` against `hub-expectations.json` (66/66 expected at design time; any signed-review refusal lowers it explicitly).

## 8 Two alternatives + recommendation

- **A. Card grid with two chips under each light** (a numbered 3 × 2 `cardGrid`, light on top, stop/go pictogram chips below). Rejected: it works, but the light is ABOVE its choices, so the chips read as a separate question; the card badge numbers add a counting cue; and the "whose light is it" signal lives only in the chips. The fork puts the light between its outcomes and lets the ground band say whose light it is.
- **B. One sort: eight lights over a STOP bin and a GO bin** (the recycling pattern). Rejected: eight lines converging on two targets tangle at K, the lamp INDEX must be read at a smaller size to fit eight in a row (lampD ≤ 36 < 56 floor for a car light in a 72 px tile), and the recycling render shows the cost: a 425 px empty middle.
- **Recommendation: the fork.** Stop-left / go-right is constant across all six rows, so the page trains one reading habit (look at the lit lamp, then choose the place); the two actors are distinguished by the ground, not by a legend; and the layout fits the fi four-line chrome (660 ≤ 677) at full K floors.

## 9 Risks, mitigations, print check

- **Greyscale.** Red/blue/green collapse to 96-111 (§5). Mitigated by design: lit = grey fill + side rays vs white; ped lit glyph = filled vs outlined; sign classes = shape + fill-vs-rim; F1 uses rays only. Gate renders `filter:grayscale(1)` and asserts ray presence on every lit lamp and the 25 % rim/fill luminance gap.
- **Long locales.** Base pills two-line designed in (h 56, stack 148 ≤ 202). F2 meanings and F5 situations are the overflow risks: validator caps (86 / 126 chars) plus the 722 and 677 render checks in de, fi, pt.
- **Vertical fit.** Base 660, F1 636, F3 552, F2 677 (pitch-driven, `minmax`), F4 518, F5 670: every face fits the fi four-line 677; nothing relies on the 722 case.
- **Pencil space.** Base: circling room around each 96-wide side (6 px gaps are tight next to the light; the circle may cross the ground band, which is harmless; the target is the cell, verify does not read pencil). F3 boxes 64 × 60 ≥ K numeral 30 px. F4 boxes 52 × 50 for one G2 letter.
- **Cut lines:** none; no face is cut.
- **9 px floor:** smallest text is sign-internal (DO NOT ENTER at s = 80, *est.* 10 px): measured by `verify-b5-road-sign.js`; if < 9 the en F2 sign size rises to 88.
- **Palette:** tokens + `codeColors` only; the lint already whitelists `codeColors` globally (`qa/lints.js:15-17`), so the type gate adds the scope rule: `codeColors` fills appear ONLY inside `[data-lcs-signal]`.
- **Correctness beyond lint (human eye + signed review):** every regulation sign (pedagogy §C, all `(reg ?)` items), the zebra and kerb reading as a crossing at 10 px, the back-view look-left arrow legibility at 180 px, the car's "waiting before the line" vs "driving on" contrast at 52 px tall. The QA lint catches overflow, floors, palette; only a person catches "this does not look like our Ampelmännchen-free pedestrian light".

## 10 Summary

1. Base = "six little streets": each row is a side-view street cross-section with the traffic light standing between WAIT (left, kerb or stop line) and GO (right, zebra or road); the child circles one side.
2. Layout 2 × 3 triptychs 306 × 212 in 639, body 660 ≤ 677 (fi four-line) at K floors (lamp Ø56, pictogram 84, pill 20 px).
3. Answers re-derived from the lit lamp's INDEX in the render; stop-left/go-right fixed, answer sequence anti-staircase gated.
4. Faces: F1 street of lights (rays only + crayon strip), F3 over-the-shoulder frames, F2 signs on posts, F4 letters into equal-box bins (no crossing lines), F5 sentence + three sign tiles.
5. New primitives `traffic-light.js` (side rays), `road-pictogram.js`, `road-sign.js` with exact geometry; greyscale safe because red, blue and green print as one grey and no decision rests on hue.
