# K-369 `road-safety`: DESIGN A (2026-09-23)

Designer A. Read: `_ROLE-DESIGN`, `_STUDIO-BRIEF`, `_SUBSTRATE` (+ DELTA), `_PANEL-FINDINGS` (row 2, the road-safety ruling), the road-safety sections of `_work/_selection-*.md`, `_work/K-369-pedagogy.md` (the content contract: six faces, per-locale sign tables, `pedLight`, `amber`, `lightRule`, the no-pictures ruling). Looked at: `out/b4-sweep/en/K-356-null-d2-en.png` (weather match, `.ws-match`), `K-357-null-d2-en.png` (bin strip over labelled bins), `K-358-null-d2-en.png` (2×2 cardGrid). Read: `primitives/_tokens.js`, `primitives/bin.js` (px-geometry primitive precedent, `data-lcs-*` part groups), `qa/lints.js` (palette = tokens + codeColors page-wide, SVG fill/stroke attrs), `templates/layouts/card-grid.js`, `ordinal-numbers.js blankNumeralBox`, `components-b2.js pillChoice`, `science-category-sort.js` scoped `.sci-bin` CSS, `page.css .ws-card/.ws-match`. **Pictures named: none** (pedagogy opened and rejected every candidate; I add none). (m) measured from a file; *est.* = engineer measures in a real `render/one.js` render. No em-dashes.

## Boundary

This page is NOT K-210 transportation (no vehicle classification, no vehicle picture, never "vehicles/transportation" in a title), NOT K-213 helper-tool, NOT colour-by-code K-241/K-265..269 (F1 colours by lamp POSITION with no printed code or swatch), NOT G1-203 science-sequence (F3 orders a behaviour, never "sequence"), NOT K-368 2d-shapes (no shape name anywhere; a sign is never drawn as a free-floating polygon), NOT G1-379 maps (no route), NOT a safe/unsafe scene judgement. **Visual signature, my concept: "street furniture on a kerb".** Every signal and every sign on every face stands on a grey POST planted in a teal kerb line, exactly as a child meets it on the pavement; lights are tall (car, 3 lamps) or short (pedestrian, 2 lamps, head at child height); nothing floats. The post is load-bearing twice: it makes an octagon a SIGN and not a shape (the K-368 fence drawn, not just worded), and it gives the pedestrian light and the car light different HEIGHTS, an actor cue that survives a black-and-white printer.

## 1 Page concept (base)

**"Six lights along one pavement."** Two rows of three numbered cards; inside each card a single traffic light on its post, standing on a kerb band that runs the full card width, with exactly one lamp lit (colour fill + two "glow ears" of short ink rays). Under the kerb sit two pictogram answer chips, STOP on the left and GO on the right, always in that order; the child circles one. From across the room a teacher sees six lights at two heights (three tall car heads, three short walker heads) and twelve calm white chips: one apparatus type, one decision, repeated. Top quality because: the only colour on the page is the six lit lamps (the eye goes straight to the one fact per card); the chips are pictograms first and words second (a pre-reader can do the page); every answer chip is a 72 px white tile with 8 px circling margin (pencil-first); and the kerb gives the page a single horizontal rhythm instead of a grid of floating objects.

## 2 Layout (d2, 722 body)

Lane 639 (default padding). cardGrid 3 cols × 2 rows, column gap 12, row gap 12. Card w = (639 − 2×12)/3 = **205**; card padding 8 → inner 189.

```
body 722 (budget) ─────────────────────────────────────────── lane 639
┌──[1]──────────┐ ┌──[2]──────────┐ ┌──[3]──────────┐   card 205 × 348
│      ┌──┐     │ │               │ │      ┌──┐     │   stage 228:
│      │○ │ car │ │               │ │      │● │     │    car head y 6..202 (196)
│      │● │ 3   │ │     ┌──┐      │ │      │○ │     │    ped head y 54..196 (142)
│      │○ │lamps│ │     │▣ │ ped  │ │      │○ │     │    post to y 218
│      └┬─┘     │ │     │▣ │ 2    │ │      └┬─┘     │    kerb y 218..228
│       │       │ │     └┬─┘      │ │       │       │
│▔▔▔▔▔▔▔┴▔▔▔▔▔▔▔│ │▔▔▔▔▔▔┴▔▔▔▔▔▔▔▔│ │▔▔▔▔▔▔▔┴▔▔▔▔▔▔▔│   gap 8
│ ┌──────┐┌──────┐│ ...                               │   chips 90 × 96:
│ │ STOP ││ GO   ││                                   │    tile 72×72 + 4 + word 20
│ └──────┘└──────┘│                                   │
└───────────────┘ └───────────────┘ └───────────────┘   row gap 12
[4] [5] [6] same                                         card 205 × 348
```

Arithmetic (per card): 8 pad + 228 stage + 8 gap + 96 chips + 8 pad = **348**. Grid: 2 × 348 + 12 = **708 ≤ 722** (14 px slack; rows `minmax(348px, 1fr)` absorb up to 106 px when the chrome is one line). Width: 3 × 205 + 2 × 12 = 639 ✓.

- **Car head** (`lampD` 56): housing w = 56 + 24 = 80, h = 3×56 + 2×6 + 2×8 = 196; centred x in the 189 inner (54.5 px each side, the glow ears need 16 → clear). Post 12 wide, 16 tall (202..218).
- **Ped head** (`pedLampD` 60, rounded-square lamps r 10): w 60 + 24 = 84, h 2×60 + 6 + 2×8 = 142, top y 54 → bottom 196; post 22 tall (196..218). **Top-y difference car 6 vs ped 54 = 48 px** (the height cue; gated ≥ 40).
- **Kerb band**: full inner width 189, teal 4 px top edge + creamDeep 6 px pavement below it (10 px), square ends.
- **Chip pair**: two chips 90 wide, gap 9 (90 + 9 + 90 = 189). Chip = white tile 72 × 72, r 12, teal 2 px stroke, pictogram 60 px tall centred; word line 20 px (Nunito 800, 15 px, `white-space:nowrap`, centred, ≤ 88 px measured, *est.* 13 en-chars).
- Card badge (`.ws-card-badge`, 30 px, top-left) sits over empty stage corner (heads are centred, ≥ 54 px from the card edge) ✓.
- **Worst-case chrome**: 3-line de/fi/pt title + 3-line instruction = the 722 budget; the page needs 708, never shrinks below its floors. A 4-line fi title (677) would overflow by 31: fi title literal capped at 3 lines by the validator (`titleLines ≤ 3` measured in `render/one.js`), else the panel shortens it.

## 3 Ladder

| key | d1 | d2 (ships) | d3 |
|---|---|---|---|
| mode | `base` | `base` | `base` |
| cards | 4 (2 × 2, card 313 wide) | **6 (3 × 2)** | 6 |
| ped / car | 4 / 0 | **3 / 3** (pt: 0 / 6 until `pedLight.stop` is set) | 3 / 3 |
| lit set | red, green | **red, green; each light kind shows red ≥ 1 and green ≥ 1; page red 3 / green 3** | red, amber, green (amber only where `amberMeans:'stop'`; en d3 = d2) |
| lampD / pedLampD | 64 / 68 | **56 / 60** | 56 / 60 |
| chips | pictogram + word | **pictogram + word (`chipWords:true`)** | pictogram only (`chipWords:false`: the decision without a reading crutch) |
| chip order | stop left, go right | **stop left, go right (fixed)** | fixed |
| postCue | on | **on** | on |

d2 is the best page: both actors (the real teaching point, "which light is YOURS"), both answers balanced, words present for the teacher and the early reader. d1 and d3 do not ship.

## 4 Answer-hiding + uniqueness

- The page shows the SIGNAL, never the verdict: no chip is pre-marked, no lamp carries a word, the lit lamp's colour is not echoed anywhere else on the page.
- Exactly one lamp lit per light (`data-lcs-lit-index`); the answer is derived from the INDEX by `lightRule = {ped:{0:'stop',1:'go'}, car:{0:'stop',1:'stop',2:'go'}}` (pedagogy D.4), never from the fill.
- Both chips always printed in fixed order; the child circles one. A wrong answer is visible to the teacher at a glance: the circle sits under GO while the lit lamp is the TOP one (position is readable even on a mono copy).
- Actor ambiguity is closed by the chip pictograms: a ped card's chips are two walkers (standing at the kerb / walking on stripes); a car card's chips are two cars (stopped at a stop bar / moving with speed lines). The height of the head is a second, redundant cue.
- Balance: red 3 / green 3 on the page, never 3 identical in a row (reading order), so "always circle GO" scores 50 %.

## 5 Primitives / components

**Reused (exact):** `templates/layouts/card-grid.js cardGrid` (base, F1, F3, F5) · `.ws-match` two-column layout from `page.css` (F2; clone the K-356 pattern) · `blankNumeralBox` from `templates/components-b3/ordinal-numbers.js` (F3 numeral boxes, open, no `answerBox`) · the `.sci-bins`/`.sci-bin`/`.sci-bin-label` scoped CSS block from `types/_shared/science-category-sort.js` (F4; COPY the rule text into the component, never call that factory: its 52 px items fail these floors) · `primitives/_svg.js` helpers (`roundedRect`, `label`) · `primitives/_tokens.js` (`color`, `codeColors`, `stroke`).

**NOT used:** any library picture (pedagogy §A: every candidate opened and rejected; a green car next to a red lamp teaches "green = go" wrongly) · `bin.js` (its lid marks mean waste classes) · `pillChoice` for the base chips (pills are words; the chips must be pictograms) · `colorLegend`/`codeList` (F1 must not show a colour key: that turns recall into copying, K-241's move) · `science-category-sort.build()` (floors).

**NEW `primitives/road-sign.js`** (sign face + optional post):

`roadSign({shape, rim, field, glyph, text, size = 72, post = true, postH = 0.32})` → `{svg, w, h, meta}`; viewBox of the FACE is 0 0 100 100 scaled to `size` px; the post is drawn below the face in the same svg (w = size, h = size × (1 + postH) + 10 for the kerb foot). Stamps `<g data-lcs-signal data-lcs-sign-shape data-lcs-sign-rim data-lcs-sign-field data-lcs-sign-glyph>`; parts are `<g data-lcs-sign-part="rim|field|glyph|text|post|kerb">`.

| shape | geometry (face units, 100 × 100) | rim / field |
|---|---|---|
| `octagon` | vertices at radius 51.95 (apothem 48) around (50,50), angles 22.5° + 45°k | field `codeRed`; white inner border = octagon apothem 44.5 stroke `white` 2.5; text white |
| `triUp` | outer (50,4) (97,90) (3,90), stroke-linejoin round, stroke 6 same colour as rim | rim `codeRed` 10 units: inner triangle = outer scaled 0.63 about the incentre (50, 62.9); field `white` or `codeYellow` (per locale); glyph box centre (50,65) 40 × 32 |
| `triDown` | outer (3,10) (97,10) (50,96), same rim rule mirrored | yield; field white; text optional (US YIELD / es-MX, see §9) |
| `circle` rim | outer r 48 `codeRed`, inner r 37 field | field `white`/`codeYellow`; glyph box 50 × 50; optional `slash`: bar `codeRed` 8 wide (24,24)→(76,76), drawn over the glyph |
| `circle` filled | r 48 `codeRed` (no-entry, white `bar` 60 × 14 rx 2) or `codeBlue` (mandatory) + white ring r 45 stroke 2 | glyph white |
| `square` | rect 4,4 92 × 92 rx 8 `codeBlue`, white ring inset 3 stroke 2 | `crossingTriangle`: white triangle (50,14) (86,78) (14,78), ink `walkerOnStripes` in box (50,56) 40 × 34 |
| `diamond` (US) | (50,2) (98,50) (50,98) (2,50) `codeYellow`; ink border inset 4, stroke 3 | glyph ink, box 50 × 50 |
| `pentagon` (US S1-1) | (50,3) (96,40) (96,97) (4,97) (4,40) `codeYellow`; ink border inset 4 stroke 3 | glyph `adultChild` ink |
| `crossbuck` | two white rects 96 × 20 rotated ±45°, ink stroke 2.5 | text REFUSED below size 104 (see §9) |

Post: rect x 46..54 (8 units wide) from face bottom to the kerb, fill `inkSoft` (grey metal); kerb foot = teal 4 px line + 6 px creamDeep band, 0.8 × size wide. Glyphs (closed set, pedagogy D.2): `walker` `walkerOnStripes` `crossingTriangle` `twoChildren` `adultChild` `bicycle` `trafficLightMini` `bar` `slash` `text`; each glyph is a path in a 50 × 50 box, filled `ink` (on white/yellow fields) or `white` (on red/blue fields); `bicycle` = two circles r 11 stroke 4 + frame polyline stroke 4, round joins; `twoChildren` = two `walker` walking silhouettes at 0.9 and 0.7 scale, the smaller behind. Text: Baloo 2 800, centred, font-size in face units (STOP/ALTO/PARE 30 units → 21.6 px at size 72; *est.*, measured fit ≤ 78 units wide). Min sizes: K 72 (on a post), G1 72, G2 64. Gate `qa/verify-b5-road-sign.js`: parses the RENDERED svg, classifies the rim polygon by vertex count + orientation, reads the field fill, asserts the glyph bbox inside the field box, every `<text>` ≥ 9 px at the rendered scale.

**NEW `primitives/traffic-light.js`**:

`trafficLight({kind:'car'|'ped', on, lampD = 56, fill:'lit'|'none', pedLight, amberToken, post = true, stageH})` → `{svg, w, h, meta:{kind, lamps, on, headTop}}`. Housing: rounded rect teal stroke 3, fill `creamDeep`, r 12, w = lampD + 24, h = n × lampD + (n − 1) × 6 + 16. Car lamps: circles r = lampD/2, top→bottom index 0,1,2 = red, amber, green (`codeRed`, `amberToken` = `codeYellow`|`codeOrange` per locale, `codeGreen`). Ped lamps: rounded squares side lampD, r 10, index 0 stop (top), 1 go (bottom); it may set 3 (`pedLamps`), the middle never lit. Unlit lamp: fill `white`, ring teal 2; ped unlit lamp carries its figure in `grid` (#C8BFAE, "off"). Lit lamp (`fill:'lit'`): fill = the lamp's code colour, ped figure `white` on it (US exception, MUTCD: the lit SHAPE carries the colour, so the lit lamp is `ink` with the walker in `white` or the hand in `codeOrange`; unlit US lamps are `white` with the shape in `grid`). **Glow ears** on the "on" lamp: 3 rays each side at −30°, 0°, +30°, from r + 4 to r + 16, stroke `ink` 3, round caps (never up/down: they would hit the neighbour lamp; at ±30° the vertical reach is ≤ 22 < half the 62 px pitch). `fill:'none'` (F1): every lamp white, the "on" lamp keeps its ears and its ped figure in `ink` 2.5 outline (the shape the child colours). Post: 12 px wide `inkSoft`, down to the kerb; the car head's top at y 6, the ped head's bottom aligned so its top sits ≥ 40 px lower (`headTop` stamped for the gate). Parts `data-lcs-light-part="housing|lamp|figure|ray|post|kerb"`, lamp `data-lcs-kind data-lcs-index data-lcs-on`. Gate `qa/verify-b5-traffic-light.js`: finds ray groups in the render, the lamp centre each surrounds, the index by lamp-centre y order; never reads `meta`.

**NEW `primitives/road-pictogram.js`** (the walking figure + car):

`walker({pose, view:'front'|'back', px, fill = ink})`, viewBox 60 × 100, stroke-built silhouettes with round caps (so thickness survives scaling):
- head circle (30,11) r 9 filled.
- `standing` / `stand-kerb`: torso (30,24)→(30,58) w 14; arms (22,28)→(20,56), (38,28)→(40,56) w 7; legs (26,58)→(25,95), (34,58)→(35,95) w 9.
- `walking` / `walk-stripes`: head (33,11); torso (32,24)→(29,58) w 14; arms (33,28)→(44,50), (31,28)→(18,48) w 7; legs (30,58)→(42,95), (29,58)→(16,93) w 9.
- `hand` (US stop): viewBox 60 × 80: palm rect x 12..48 y 34..72 rx 10; fingers 4 rects w 7 at x 13/22/31/40, y 8..40, rx 3.5; thumb rect 8 × 22 rotated −40° anchored at (14,52).
- `look-left` / `look-right` (back view): standing body + head drawn as a PROFILE (circle + a nose wedge 4 units protruding toward the look side) + an ink chevron arrow 3 px above the head: shaft 26 units from x 30 toward the look side, head 8 units. `look-left` points to the VIEWER'S left (back view: the figure's left is the child's left); gated by parsing the arrowhead x < shaft start.
- `look-both`: two arrows. `listen`: standing + a cupped hand at the ear + 3 arcs (r 4/7/10, stroke 2).
- Scene strip for F3 (drawn by the pictogram module, not a scene): road band = white rect with teal 2 px edges; zebra = 4 trapezoid bars `ink` converging upward (perspective, bottom 14 wide, top 8 wide); kerb = teal 4 px line; pavement = creamDeep band.

`car({state:'stopped'|'moving', px})`, viewBox 120 × 60, side view, fill `teal` (NEVER a code colour): lower body rect (20,26) 96 × 20 rx 6; cabin (40,26)→(50,10)→(86,10)→(96,26); two white windows inset 3; wheels circles (42,48) and (94,48) r 9 `ink`, hub r 3.5 `white`; ground line y 58 `grid` 2. `moving`: 3 ink speed lines x 2..16 at y 20/30/40, stroke 3. `stopped`: a stop bar `ink` 4 × 14 standing on the ground line at x 118 in front of the bumper.

**NEW `templates/components-b5/road-safety.js`** (behind `templates/components-b5.js`): `signalCard({kind, on, chips})` · `poseChip({pose|carState, word})` (72 tile + word) · `lightPost({…})` (F1 card inner) · `stepCard({step})` (F3) · `signPost({role, spec, size})` · `meaningPill({text})` (F2) · `kindBins({classes})` (F4, copied `.sci-bin` CSS) · `quizCard({text, roles})` (F5). Every stage stamps `data-ws-content`.

## 6 Locale slot structure

| slot | where | font | floor | longest reserve |
|---|---|---|---|---|
| chip word (base) | under each 72 tile, one line, 88 px | Nunito 800 15 px | 15 | ≤ 13 chars en *est.*; validator measures ≤ 88 px in a real render (de "Auto fährt", fr "je traverse", nl "oversteken"); overflow → the panel picks a shorter literal, never a smaller font |
| sign text | inside octagon / yield / R5-1 | Baloo 2 800 | 9 px rendered | per-sign measured fit (§9) |
| meaning pill (F2) | right column, 300 × 60..76, 2 lines | Nunito 700 16 px | 16 | ≤ 70 chars (38/line *est.*) |
| bin label (F4) | `.sci-bin-label` pill | Baloo 2 700 17 px | 17 | ≤ 18 chars; de "Gebotszeichen" 13, fi "määräysmerkit" 13 |
| situation (F5) | card top, 2 lines × 297 | Nunito 700 17 px | 16 | ≤ 90 chars (pedagogy D.5 rule 8) |
| title / instruction | shell | shell | shell | 3 lines each max |

No text is placed inside a lamp or on a post. No inflected token on any face (pedagogy: 0 noun forms); every literal is whole.

## 7 Five variation faces (b c d e f)

**b · F1 Colour the Traffic Lights (K, CODE `mode:'colour-lights'`).** Same pavement, no chips: six posts (4 car + 2 ped; en 6 car), 2 rows × 3, `fill:'none'`, `lampD` 70 / `pedLampD` 74 (bigger colouring targets). Card: 8 + stage 288 (car head 3×70 + 12 + 16 = 238, post 34, kerb 10, top 6) + 8 = 304; grid 2 × 304 + 12 = **620** (102 px slack, rows `minmax`). Every lamp white; the "on" lamp is marked ONLY by glow ears (ped: its figure outlined in ink). No colour key anywhere. Delta vs base: no chips, fill none, larger lamps, `data-lcs-on` answer. Verify: 0 filled lamps on the page (poison: a pre-filled red), every car index 0/1/2 on at least once, ped 0 and 1 once each, ears present on every on-lamp, lamp ≥ 56. Query face: "colour the traffic light".

**c · F3 Crossing the Road Safely: the Steps (K, CODE `mode:'crossing-steps'`).** No lights, no posts: five step cards, row 1 three (205 wide), row 2 two centred. Card: 8 + strip 190 (road band 60 + zebra + kerb + pavement 70, walker 120 px tall, back view) + 8 + `blankNumeralBox` 64 × 56 right-aligned + 8 = 270; grid 2 × 270 + 16 = **556**. Every card shares one identical strip so only the FIGURE changes (the child reads pose + arrow, not the background). Delta: numeral writing, back-view poses, no colour at all (the whole face is teal/ink/cream: prints identically in mono). Verify: KIND sequence (the two `look-left` cards interchangeable), printed order off by ≥ 3, the two `look-left` not adjacent, 0 numerals printed, arrows parsed pointing to the viewer's left on `look-left`. Query face: "crossing the road steps".

**d · F2 Road Signs and What They Mean (G1, CODE `mode:'sign-meaning'`).** `.ws-match`, 6 rows: left column signs ON POSTS (face 72, item 120 × 104), right column meaning pills 300 wide × 60..76, dots per the K-356 pattern; row pitch 104 + 5 × 16 = **704**. Right column deranged (≤ 1 straight across). Delta: signs instead of lights, words on the right, G1 reading. Verify: 6 distinct roles, pill `data-lcs-role` = sign role, no pill contains the sign's printed text word, derangement. Query face: "traffic signs and their meanings".

**e · F4 Kinds of Road Signs: Sort Them (G2, CODE `mode:'sign-kinds'`).** Top strip: 8 posted signs in ONE row (face 64, item 72 wide, 8 × 72 + 7 × 9.6 = 639, item h 64 + 20 post + 10 kerb + 14 dot = 108); middle line zone 220; 3 word bins (`.sci-bin`, 195 wide, 185 tall + 32 label) = 217. Stack 108 + 220 + 217 = **545**. en 2 bins (263 wide). Bins carry WORDS only (a shape on a bin makes it shape-matching). **Design ruling: F4 draws NO filled red disc** (`no-entry`): in greyscale `codeRed` ≈ 95 and `codeBlue` ≈ 97 luminance, so a filled red prohibition disc and a filled blue mandatory disc print as the same grey disc with a white glyph; prohibitions on F4 are rim-only (white or yellow field). Verify: class re-derived from the parsed polygon + rim-vs-fill with the gate's own table (pedagogy D.4 `classOfGeometry`), ≥ 2 signs per bin, no `stop`/`yield` on a Vienna page, no filled-red disc, bin order ≠ strip order. Query face: "types of road signs".

**f · F5 Road Sign Quiz: Which Sign Is It? (G2, CODE `mode:'sign-quiz'`).** cardGrid 2 × 3, card 313 × 228: sentence block 2 lines × 24 (17 px) + 8 pad = 56, then 3 posted sign chips (face 64, chip 84 × 100, gap 24, circling margin 8). Card 8 + 56 + 10 + 100 + 8 + margins = 228; grid 3 × 228 + 2 × 12 = **708**. Delta: meaning → sign direction, sentence reading, three-way choice. Verify: exactly one chip = card role, no confusable pair on a card, no target sign text in the sentence (letter-boundary, `(?<!\p{L})…(?!\p{L})`), correct-slot histogram ≤ 60 % per slot over 20 seeds AND the shipped seed not a staircase (measured both directions). Query face: "road sign quiz".

**Why these five:** they are the pedagogy file's five moves (produce colour from position · order the national routine · read sign → meaning · classify by the regulation code · meaning → sign), each with a visually distinct page (posts without chips / step strips without posts / match columns / strip over bins / sentence cards), so no two share a resolved config or a thumbnail. **First to cut:** F5 (it is F2 reversed; its demand is the thinnest "quiz / verifica" face and it carries the highest per-locale authoring load, 16 situations). Hub contract: each face = one landing per locale with `coordinate.type:'road-safety'`, the face's `mode`, `theme:''`; `apps['road-safety']` + `axes['exercise-type']['road-safety']` ×11; gate `scripts/verify-hub-type-rows.js` expects 6 rows per locale (66 total, 0 recorded refusals at design).

## 8 Two alternatives + recommendation

1. **Floating cards (the plain house grid):** lights and signs centred in cards with no post or kerb. Rejected: a free-floating octagon, triangle or disc reads as a SHAPE (it is K-368's apparatus exactly), the car and pedestrian lights differ only by lamp count (weak in mono at K), and the page has no real-world anchor.
2. **One crossing, six moments:** a single large crossing diagram at the top (pavement, zebra, both lights) and six small "freeze frame" boxes below, each showing the ped light in a state. Rejected: it is scene art by another name (the lock forbids scene faces), the big diagram would hold a lit reference lamp the child copies from, and the six frames at 90 px break the K 56 px lamp floor once three lamps are stacked.

**Chosen: street furniture on a kerb.** Same build cost as the plain grid (one post + one kerb path per item), and it buys three things the alternatives cannot: the K-368 fence is visible, the actor cue (tall/short head) prints in black and white, and all six faces share one family look without sharing a layout.

## 9 Risks, mitigations, print check

- **Greyscale (measured from token hexes, luminance 0.299R + 0.587G + 0.114B):** codeRed 95 · codeGreen 111 · codeBlue 97 · codeOrange 128 · codeYellow 166 · teal 80 · ink 54 · inkSoft 131 · grid 192 · white 255. **Red and green lamps differ by only 16:** colour does NOT carry the base or F1 on a mono printer; the lamp INDEX (top/bottom), the ped figure POSE and the glow ears do, and the gate re-derives every answer from index only. Lit vs unlit (95/111 vs 255) is unmistakable. Red rim on white (95 vs 255) and on yellow (95 vs 166) both separate, so sv/fi yellow-field triangles survive. **Red disc vs blue disc (95 vs 97) are identical in mono**: hence F4's no-filled-red-disc ruling; on F2/F5 the `bar` glyph vs the mandatory glyphs (walker, bicycle, arrow) carries identity.
- **True sign colours cannot be matched, stated honestly:** regulation red (RAL 3020 class) → `codeRed` #C0392B, a muted brick; traffic blue (RAL 5017 class) → `codeBlue` #2E6DA4, lighter; traffic yellow (RAL 1023) → `codeYellow` #E0A800, more amber; US fluorescent yellow-green (S1-1 school, often W11-2) → NOT matchable, drawn `codeYellow` (a recorded approximation; `codeGreen` would read as a guide sign and is rejected); US Portland-orange hand → `codeOrange`; US lunar-white walker → `white` on an `ink` lamp; sign black → `ink` #3A3530 (warm near-black); signal green → `codeGreen`. The landings say "simplified colours for printing".
- **Sign text floor:** at face 72, STOP/ALTO/PARE 30 units ≈ 21.6 px ✓; US R5-1 DO NOT ENTER needs 12 units → 8.6 px at 72: drawn only at face ≥ 80 (9.6 px, *est.*); crossbuck RAILROAD CROSSING 9 units → below floor until 104 px: the role is refused on every face (en d3 swaps it, pedagogy D.2 list); es-MX CEDA EL PASO (three words in a point-down triangle) UNKNOWN fit: engineer measures at 72, refuse the text role below 9 px rather than shrink.
- **Overflow in long locales:** chip words measured ≤ 88 px, bin labels ≤ 18 chars, pills ≤ 70 chars, situations ≤ 90; every stack budgeted at 722 with `minmax` rows; fi title capped at 3 lines (the 677 case would cost the base 31 px).
- **Pencil space:** base chips have 8 px around each 72 tile for a circle; F3 boxes 64 × 56; F2 dots 26 px outboard; F5 chips 24 px apart.
- **Cut lines:** none (no cutting on any face).
- **9 px floor:** only sign text is at risk (above); nothing else under 15 px.
- **What QA lint catches:** overflow, footer intrusion, font < 9, off-palette hex (codeColors are page-wide whitelisted, m `qa/lints.js:12-17`). **What only a human eye catches:** whether the glow ears read as "on" to a five-year-old (critic must look at a mono print), whether the back-view profile head reads as "looking left", whether each locale's drawn sign matches its regulation annex (the signed per-locale sign review is the gate; a close-enough sign is misinformation), whether a teal car pictogram reads as a car at 60 px.

## 10 Summary

- Concept "street furniture on a kerb": every light and sign stands on a grey post in a teal kerb line; nothing floats.
- Base: six lights (3 tall car heads, 3 short walker heads), one lamp lit, circle the STOP or GO pictogram chip; 708 of 722 px.
- Faces: F1 colour the lamp that is on (no key) · F3 five back-view crossing steps, write 1-5 · F2 posted signs matched to meanings · F4 posted signs sorted into word bins · F5 sentence → circle the posted sign.
- New primitives with exact geometry: `road-sign.js`, `traffic-light.js` (glow ears, height cue), `road-pictogram.js` (walker, hand, car); 0 library pictures.
- Mono print is carried by index, pose, ears, rim-vs-fill; red ≈ green and red ≈ blue in grey are measured and designed around (F4 draws no filled red disc).
