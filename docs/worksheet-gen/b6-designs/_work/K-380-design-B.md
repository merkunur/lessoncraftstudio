# K-380 `healthy-habits` : design B ("the sink sign": one pictogram language, legible at 60 px in greyscale)

Designer B, 2026-09-23. Read: `_ROLE-DESIGN.md`, `_STUDIO-BRIEF.md`, `_SUBSTRATE.md`, `_PANEL-FINDINGS.md` (lock row 2 + face list), `_work/_selection-pedagogy.md` §3 (A-E), `_work/_selection-seo-germanic.md` §3 (heads, KAI, stappenplan), `primitives/road-pictogram.js`, `templates/components-b5/road-safety.js` (the `backChild` and `rsCrossingCard` render rulings), `primitives/bin.js`, `templates/components-b3/ordinal-numbers.js:151` (`blankNumeralBox`), `templates/components-b3/picture-word-cards.js:73-90` (`scissorsGlyph`, `cutLines`), `page/page.css:354-391` (`.ws-match`), `data/b2/calendar.js` (`weekStart`, `dayAbbr`), `primitives/_tokens.js`, `../b5-designs/K-369-road-safety.md` §1-2. LOOKED at `out/b5-sweep/en/K-369-null-d2-en.png`, `K-374-null-d2-en.png`, `out/b4-sweep/en/K-355-null-d2-en.png`. OPENED (contact sheet `scratchpad/K-380-B-sheet1.png`, 20 pictures, results in §5 and §8). Widths marked *est.* were NOT measured with the shell fonts; the engineer measures them in `render/one.js`. No em-dashes.

**Boundary.** This page is NOT K-203 healthy/not-healthy FOOD or G1-207 food groups (no food, no plate with food, no drink other than water in a clear cup), NOT human-body K-354 (+K-360..363, G1-356: no body part is named or labelled; the figures are faceless and have no drawn parts to point at), NOT five-senses K-355 (+5), NOT feelings K-319 (no emotion, no face), NOT all-about-me K-323 (no "I can" self-report; the chart is a routine tracker, not a self-portrait), NOT K-212 wants/needs, NOT the road-safety family K-369 (+K-373/374, G1-384, G2-360/361: no street, no signal; the hand-washing steps borrow K-374's MOVE, write the order in boxes, but never its crossing frames), NOT G1-203 science-sequence / G1-377 life cycles (a hygiene PROCEDURE, never growth), NOT K-374's "the steps" title shape, and NOT K-357 recycling (the tissue bin carries no colour and no class). It owns daily self-care ACTIONS and their tools, their order, the germ-stopping choice, their reason, and a week of doing them. **Visual signature: every picture on every face is one flat pictogram language (ink faceless child, teal tools, white water and foam), the way a public-health sign is drawn; habits sit in CIRCLES, things sit in SQUARES, and the two step faces are "views into the same sink" (every card has the same basin rim and tap), so a teacher can cut them out and pin them above a real sink.**

## 1 Page concept (base)

**"What do I use?" : five circle signs, five square signs.** Left, five round sign badges, each a faceless child doing one habit (washing hands at a tap, brushing teeth, sleeping under a moon, combing hair, blowing the nose). Right, five square sign tiles, each one thing (soap, toothbrush, bed, comb, tissue box), in a different order. The child draws a line from each circle to its square. From across the room a teacher sees two tidy columns of big dark-on-white signs and nothing else: no words on the body, no colour except the coral dots, so it prints identically on a grey printer and needs no reading.

Why this is top quality:
- **One art source (lock ruling 4).** Soap and towel do not exist in the library, so any page that uses library objects would put a flat drawn soap next to a painted toothbrush. Drawing EVERY tool in the pictogram language removes the seam, and makes the six faces one family.
- **The habit never draws its own tool.** A pictogram of "brushing teeth" that shows a toothbrush turns the page into shape matching (the brush in the circle matches the brush in the square). Here a hand-held tool is replaced by one neutral marker, the **slot ring** (a dashed `grid` circle, identical on every pose), placed where the tool is used: at the mouth with scrub arcs, over the hair with comb strokes, in front of the nose between two hands. The child must know the tool; the pose only says where it goes. Tools that are not hand-held have a scene cue instead (tap + water for washing, a crescent moon for sleep).
- **Shape grammar teaches the move.** Circle = what I DO, square = what I USE. The same grammar carries into F4 (squares you circle) and F5 (circles joined to sentence cards).
- **Pinnable.** The step faces are built as sign plates; F3 literally produces a four-picture sink sign the child glues together.

## 2 Layout (d2, 722 body; every stack budgeted at 677 for the fi 4-line title)

```
.ws-body 675 x 722
root <div class="hh-match ws-match" data-ws-content data-lcs-healthy-habits data-lcs-mode="base">   (page.css .ws-match: padding 6 30)
  x 30          150 (dot 26 out)                          525 (dot 26 out)          645
  +-------------+ .                                      . +-------------+
  |  ( circle ) | habit badge 120 x 120                   | [ square ]  | tool tile 120 x 120
  |  pictogram  |  = white disc, teal 3 px ring            |  glyph 92   |  = .ws-match-item--plain, white,
  |     96      |  pictogram 96 x 96 centred               |             |    teal 3 px border, radius 16
  +-------------+ .                                      . +-------------+
        ... x5 rows (.ws-match-col gap 12, justify space-around)
  line field between the dots: 675 - 60 - 240 - 2 x 26 = 323 px
height: 5 x 120 + 4 x 12 = 648 <= 677 (fi) <= 722 ; rows grow via space-around (slack 74 at 722)
width : 30 + 120 + 375 + 120 + 30 = 675
```
- Badge: `<div class="hh-badge" data-lcs-habit="<key>">` = CSS circle 120 (border-radius 50%, white, `border:3px solid teal`), inner pictogram svg 96 (K floor 56 met by the whole glyph; the smallest meaningful part, the slot ring, is 18 unit = 17 px at 96).
- Tool tile: `<div class="ws-match-item ws-match-item--plain hh-tool" data-lcs-tool="<key>">` 120 x 120, radius 16, glyph 92.
- Dots: `.ws-match-dot--right` on badges, `--left` on tiles (coral 12, the only coral on the page).
- No text inside the body. Chrome only (title + instruction).

## 3 Ladder (base)

| key | d1 | d2 (ships) | d3 |
|---|---|---|---|
| `layout` | `match` | **`match`** | `match` |
| `habits` | wash-hands, brush-teeth, sleep, comb-hair | **wash-hands, brush-teeth, sleep, comb-hair, blow-nose** | as d2 |
| `pairs` | 4 | **5** | 5 |
| `distractorTools` | 0 | **0** | 1 (`cup` ONLY; never `towel`, which is a second right answer for wash-hands) |
| `badgePx` / `glyphPx` | 132 / 104 | **120 / 96 (tile glyph 92)** | 120 / 96 |
| `order` | derangement | **derangement, no pair on its own row, not the reverse, not a cyclic shift by 1** | as d2 |

d1 and d3 are harder/easier pages of the same move, never a face; no copy describes them.

## 4 Answer-hiding + uniqueness

- **Printed:** five habit circles and five tool squares. **Never printed:** any line, any tool inside a habit pictogram, any word pairing them.
- **Child marks:** five lines, dot to dot. A wrong line is visible to the teacher as a line into a square whose glyph is not the thing the pose uses (e.g. the sleep circle joined to the comb).
- **Uniqueness:** the tool set per page is one-to-one with the habits; exclusions are in the gate's own table `TOOL_OF = {wash-hands:soap, brush-teeth:toothbrush, sleep:bed, comb-hair:comb, blow-nose:tissue}` plus `NEVER_WITH = {wash-hands:[towel], sleep:[pillow], brush-teeth:[toothpaste]}` (toothpaste would make the toothbrush pair ambiguous, pedagogy §3 base).
- **Stamps + verify():** badges `data-lcs-habit`, tiles `data-lcs-tool`, the root `data-lcs-mode`. verify() reads the RENDERED pictogram part ids (never the stamp) and asserts: (a) no habit pictogram contains a `data-lcs-glyph` tool part (the no-own-tool rule); (b) every hand-held pose carries exactly one `data-lcs-slot` ring; (c) the tiles are a bijection onto `TOOL_OF` of the shown habits (+ the d3 distractor, which matches no shown habit); (d) the right column is a derangement of the left and not the reverse or a shift by 1; (e) over 20 seeds INCLUDING the shipped seed, no row index carries the same habit > 40 % (the seed has no locale: one bad order ships to all 11).

## 5 Primitives / components

**Reused (exact).**
- `primitives/_svg.js` (`svgRoot`, `el`) and `primitives/_tokens.js` (`color` only; NO `codeColors` on any face).
- `primitives/road-pictogram.js`: `walkerParts('walking', …)` (the leave-the-toilet option of F4 pool pair P4) and the SAME unit convention (100 x 100 box, scaled to px height, `fmt`). NOT its back poses (their white face circle under a hair cap read as a face with a hat, `road-safety.js:141` comment).
- `templates/components-b3/ordinal-numbers.js blankNumeralBox({w,h,answer:''})` (F2 boxes, always EMPTY answer).
- `templates/components-b3/picture-word-cards.js scissorsGlyph(26)` (F3 cut band).
- `page/page.css` `.ws-match .ws-match-col .ws-match-item(--plain) .ws-match-dot(--left/--right)` (base, F5).
- `data/b2/calendar.js CALENDAR.<loc>.weekStart + dayAbbr` (F6 column heads, in the locale's own week order).
- `rng` (`shuffle`, `int`, `sample`).

**NOT used.**
- Library pictures, all of them (one art source). Opened and recorded for the critic: `around the house/toothbrush` (red, fine) · `toothpaste` (tube) · `comb` (orange; reads as a hairbrush-comb hybrid) · `hospital/tissue` (pink box with a RED MEDICAL CROSS: says "hospital/first aid", not "nose") · `around the house/bed` (blue, fine) · `pillow` · `around the house/glass` (**a WINE glass with red wine**: never) · `kitchen tools/glass` (empty tumbler, fine) · `around the house|kitchen tools/cup` (both full of COFFEE/tea: never "water") · `sink` (pink pedestal basin) · `faucet` · `shampoo` (pump bottle, reads as liquid soap, word is shampoo: never) · `bathtub` · `clothing/pajamas` · `beach/sunscreen` (tube with a sun) · `clothing/hat` / `beach/sun_hat` · `hospital/mask` (surgical mask; screens/masks excluded as contested) · `around the house/toilet_paper`. Soap, towel, shower: absent from the library.
- `primitives/family-figure.js` (a head-and-shoulders bust; habits are whole-body or hand actions, and its faces would contradict the faceless rule).
- `primitives/body-figure.js` (a labelled body diagram is K-354's apparatus).
- `primitives/bin.js` (its lid colour carries a recycling class; a coloured bin beside a tissue teaches waste sorting). The tissue bin is drawn here, colourless.
- `templates/layouts/card-grid.js` numbered cards (a printed card numeral is an order tell on F2).
- `primitives/road-pictogram.js` `crossingFrame` / street bands.

**NEW `primitives/habit-pictogram.js`** (+ `qa/verify-b6-habit-pictogram.js`). Pure SVG on tokens, unit box 100 x 100 scaled to the requested px, like `road-pictogram.walker`. Exports:
```
figure({ pose, px = 96, slot = true, data = {} }) -> { svg, w, h, meta:{pose, parts[]} }
closeUp({ step, px = 176, data = {} })             -> { svg, w, h, meta:{step, state{}} }   (F2, F3)
tool({ kind, px = 92, data = {} })                  -> { svg, w, h, meta:{kind} }
figureParts / closeUpParts / toolParts               bare <g> strings for embedding
POSES, STEPS, TOOLS
```
Every element group carries `data-lcs-part="<id>"`; figures `<g data-lcs-pictogram="habit" data-lcs-pose>`; tools `<g data-lcs-glyph="<kind>">`; the slot ring `<circle data-lcs-slot>`.

*Figure grammar (unit space; ink `#3A3530` fill unless stated).* HEAD = solid ink circle, NO face, NO hair cap (the K-374 lesson). FRONT body: torso `M40,30 H60 Q64,30 64,34 V62 H36 V34 Q36,30 40,30 Z`, legs `rect x39 y60 w9 h34 rx3` + `rect x52 y60 w9 h34 rx3`. PROFILE body (faces right): torso `M42,30 H56 Q60,30 60,34 V62 H42 Z`, leg `rect x44 y60 w11 h34 rx3`. ARMS = polylines, `stroke ink`, `stroke-width 8`, `stroke-linecap/linejoin round`, `fill none` (the ISO 7001 limb). HANDS = ink circles r 5; a hand that overlaps the head or body gets `stroke white, stroke-width 2, paint-order stroke` so it separates in 1-bit print. SLOT RING = `circle r 9, fill white, stroke grid #C8BFAE, stroke-width 2.5, stroke-dasharray 4 3`. Motion marks = `stroke ink 2.5, round, fill none`.

| pose | view | parts (unit coords) | used on |
|---|---|---|---|
| `wash-hands` | front, behind a basin | head (50,14) r10; torso; arms L (40,34)->(30,47)->(46,55), R (60,34)->(70,47)->(54,55); hands (46,55) (54,55) r5; BASIN drawn OVER the legs: `M14,62 H86 L80,78 H20 Z` fill white, stroke teal 3; pedestal `rect x44 y78 w12 h18` teal; TAP teal: riser `rect x76 y34 w7 h28`, spout `rect x58 y34 w25 h7 rx3`, nozzle `rect x58 y41 w7 h5`; WATER (`data-lcs-part="water"`) 3 lines x 59.5/61.5/63.5, y 47..54, stroke teal 2, dash 3 3 | base, F4 P4/P5 |
| `brush-teeth` | profile R | head (48,16) r11; profile body; arm (54,34)->(64,50)->(62,24); fist (62,23) r5.5 white-stroked; SLOT at (66,20); scrub arcs `M74,12 q5,8 0,16` and `M80,9 q6,11 0,22` | base, F5, F6 |
| `sleep` | lying | head (20,56) r10; body `rect x32 y50 w54 h13 rx6` (torso+legs one bar), feet notch none; arm along body (none drawn); MOON teal: `path M78,14 a13,13 0 1,0 10,22 a10,10 0 1,1 -10,-22 Z`; 2 stars ink 4-point r4 at (62,20) (90,44) | base, F5, F6 |
| `comb-hair` | front | head (50,18) r11; arm R (60,34)->(74,22)->(60,6); fist (60,6) r5.5 white-stroked; SLOT at (57,5); comb strokes 3 WHITE lines over the head `M44,11 l-4,8`, `M50,9 l-4,9`, `M56,11 l-4,8` (stroke white 2); arm L down (40,34)->(34,50)->(34,60) | base |
| `blow-nose` | front | head (50,16) r11; arms (40,34)->(34,44)->(46,21), (60,34)->(66,44)->(54,21); hands (46,21) (54,21) r5 white-stroked; SLOT at (50,24) between the hands | base |
| `cough-elbow` | profile R | head (46,20) r11; arm (52,36)->(64,22)->(46,24) (the mouth sits in the elbow crook); 3 short puff lines INTO the crook `M58,19 l3,0` `M58,23 l4,0` `M58,27 l3,0` stroke ink 2 | F4 P1 |
| `cough-open` | profile R | head, body as cough-elbow; arm DOWN (52,36)->(56,50)->(56,60); SPRAY (`data-lcs-part="spray"`) 7 dots r2.2 fanned from (60,20) to x 70..88, y 10..30 + 2 lines | F4 P1 |
| `drop-tissue` | front | arm R (60,34)->(72,46)->(80,52); TISSUE glyph (white wave `M76,50 c2,-6 8,-6 10,0 c-2,5 -8,5 -10,0 Z`, ink 2) at the hand; BIN (drawn, colourless) `path M70,66 H92 L89,96 H73 Z` fill white stroke teal 3 + lid `rect x68 y61 w26 h5 rx2` teal | F4 P2 |
| `tissue-floor` | front | arms down; tissue glyph on the ground line y 96 at x 72..84; same bin drawn EMPTY at x 70..92 (so the pair differs only by where the tissue is) | F4 P2 |
| `own-cup` / `share-cup` | two profile figures at 0.72 scale facing each other (x 4..48 and 52..96) | own: each fist holds a CUP glyph at its mouth; share: ONE cup between them, both fists on it | F4 P3 |
| `wash-after-toilet` / `leave-toilet` | TOILET glyph (drawn: bowl `path M6,66 H34 Q34,84 20,86 Q6,84 6,66 Z` + tank `rect x8 y44 w24 h18 rx3`, white, stroke teal 3) + figure | wash: the `wash-hands` figure at 0.8 scale on the right; leave: road-pictogram `walking` at 0.8, facing right, away from both | F4 P4 |
| `wash-before-eating` / `eat-unwashed` | TABLE glyph (teal top `rect x56 y60 w40 h5`, legs) with an EMPTY PLATE (white ellipse rx12 ry4, ink 2) + figure | wash: figure at a basin left of the table; unwashed: figure seated at the table, hands at the plate | F4 P5 (pool) |
| `drink` | profile R | head (46,17) r11 tilted = body rotated -6 deg about (50,94); arm (52,34)->(62,46)->(62,18); CUP glyph (tumbler, water line) at (64,18) rotated -30 deg | F6 |
| `move` | running, faces R | torso `M48,28 L62,30 L60,58 L46,56 Z` (tilt 8 deg); legs polylines stroke 9: (52,56)->(66,72)->(58,92) and (50,56)->(40,74)->(26,76); arms (58,34)->(68,44)->(76,36), (50,34)->(40,44)->(34,54); head (60,14) r10 | F5, F6 |
| `sun-hat` | front | standing figure; HAT glyph on the head (brim `ellipse cx50 cy8 rx20 ry4` teal, crown `path M40,8 Q40,-4 50,-4 Q60,-4 60,8 Z` teal); SUN (drawn: circle r8 ink-outlined white + 8 rays, teal) at (16,14) | F5 |

*Tools (square glyph, `tool({kind})`, 100 x 100; teal = body, white fills with ink 2-3 outline, NO coral).* `soap`: bar `rect x22 y48 w56 h26 rx12` white ink 3 + bubbles circles (36,38) r6, (50,29) r4.5, (64,38) r7 white ink 2 · `toothbrush`: group rotated -35 deg about (50,50): handle `rect x12 y46 w58 h8 rx4` teal, head `rect x70 y44 w18 h12 rx3` white ink 2, bristles `rect x72 y31 w14 h13` white ink 2 with 3 vertical ink slits · `comb`: spine `rect x14 y32 w72 h16 rx5` teal + 11 teeth `rect w3.2 h22` teal from y 48, pitch 6.4, from x 18 · `bed`: headboard `rect x10 y28 w9 h50 rx2` teal, footboard `rect x81 y46 w9 h32` teal, mattress `rect x19 y56 w62 h12` white ink 2.5, pillow `ellipse cx30 cy51 rx9 ry5` white ink 2, blanket `rect x38 y50 w43 h12 rx4` tealSoft ink 2, legs · `tissue`: box `rect x20 y48 w60 h32 rx4` teal, slot `rect x36 y48 w28 h4` ink, sheet `M40,50 C38,34 46,26 50,20 C54,28 62,34 60,50 Z` white ink 2.5 (NO cross) · `towel`: rail `line x14..86 y22` teal 4 round, cloth `rect x28 y24 w44 h58 rx4` tealSoft ink 2.5, band `rect x28 y68 w44 h6` teal · `cup`: tumbler `M30,24 H70 L64,82 H36 Z` white ink 3, water `M33,46 H67 L64,82 H36 Z` tealSoft · `toothpaste` (F3 only): tube `M20,52 L70,46 L74,58 L24,64 Z` white ink 2.5 + cap `rect` teal.

*Close-ups (`closeUp({step})`, F2 + F3; "a view into the same sink").* Every close-up shares the SINK BAND: basin rim `rect x0 y78 w100 h8 rx4` teal + basin bowl `path M4,86 H96 L88,100 H12 Z` white stroke teal 2.5, and the TAP top-right (riser `rect x82 y8 w7 h22`, spout `rect x62 y8 w27 h7 rx3`, nozzle `rect x62 y15 w7 h5`, all teal). HANDS = two ink mitten shapes `path` (palm `rect w18 h22 rx9` + thumb `ellipse rx4 ry7` at 30 deg), mirrored. State flags stamped on the root: `data-lcs-tap="on|off"`, `data-lcs-bubbles="0|1"`, `data-lcs-soap="rim|hands|none"`, `data-lcs-towel="0|1"`, `data-lcs-brush="dry|paste|foam|rinse|cup"`.

| step | draws | state vector |
|---|---|---|
| `hw-wet` | tap ON (water lines under the nozzle), hands under it, soap bar on the rim, NO bubbles | on · 0 · rim · 0 |
| `hw-soap` | tap OFF, soap bar held between the hands, water drops (3 teardrops r2.5 teal) under the hands | off · 0 · hands · 0 |
| `hw-rub` | tap OFF, hands pressed together at centre, 6 bubbles (white r3..6, ink 2) around them, soap on the rim | off · 1 · rim · 0 |
| `hw-rinse` | tap ON, hands under it, 4 bubbles FALLING into the basin (below the hands) | on · 1 · rim · 0 |
| `hw-dry` | tap OFF, the TOWEL glyph held open between the hands, above the sink | off · 0 · rim · 1 |
| `tb-paste` | toothbrush held level in one hand, the other squeezes the toothpaste tube, a white paste curl on the bristles | brush paste |
| `tb-brush` | PROFILE head close-up (head r22 at (40,40), the slot-free fist at the mouth holding the brush, foam dots r2 at the mouth, scrub arcs) above the sink band | brush foam |
| `tb-rinse` | tap ON, the brush under the water, bristles up, no foam | brush rinse |
| `tb-cup` | tap OFF, the brush standing in the CUP glyph on the rim, hands absent | brush cup |
| `tb-zone-kau` / `-aussen` / `-innen` (de panel option only) | a top-view DENTAL ARCH (a U of 8 white rounded squares 9x9, ink 2) with the brush on the CHEWING tops (crowns filled tealSoft) / on the OUTER rim (outer arc stroked teal 5) / on the INNER rim (inner arc stroked teal 5) | zone |

**NEW `templates/components-b6/healthy-habits.js`** behind `templates/components-b6.js` (exports prefixed `hh`): `hhFace({mode, stamps, inner})` (the `[data-ws-content]` root, clone of `rsFace`) · `hhBadge({pose, px})` (circle) · `hhToolTile({kind, px})` (square) · `hhStepCard({step, frame, box})` (F2) · `hhSignPlate({slots, slotW, slotH, arrowW})` + `hhCutCard({step, w, h})` (F3) · `hhChoiceRow({left, right, tileW, tileH})` (F4) · `hhReasonCard({text, w})` (F5) · `hhChart({habits, days, headW, colW, rowH, star})` + `hhStar(px)` (F6: 5-point star, outer r = px/2, inner r 0.42, white, ink 2.5).

**NEW `qa/verify-b6-habit-pictogram.js` (the render-measuring primitive gate; the pictogram-first contribution).** Renders every pose, close-up and tool at **60 px**, rasterises, converts to 1-bit at luma < 160 (greyscale print), and asserts: (1) any two items that may share a page (the co-occurrence table in `data/b6/healthy-habits.js`) have 1-bit Jaccard < 0.72; (2) every F4 minimal pair differs by ≥ 6 % of the union's dark pixels and ONLY inside the declared differing parts (`spray`, `elbow`, `tissue`, `cup`, …); (3) every F2/F3 close-up state vector is pairwise distinct (the K-374 "two cards, one action" lesson); (4) no habit figure contains a `data-lcs-glyph` of its own `TOOL_OF`; (5) no `coral`, no `codeColors`; (6) the slot ring is present on exactly the hand-held poses. Poison-tested both ways: swap `cough-elbow` for a copy of `cough-open` (must fail 2), delete the rinse bubbles (must fail 3), add a toothbrush to `brush-teeth` (must fail 4).

## 6 Locale slot structure

- **Base, F2, F3, F4: no text on the body at all.** The only locale strings are the chrome title + instruction (`i18n/strings.<loc>.json`). This is deliberate: a pre-reader page, identical in 11 locales, nothing to overflow.
- **F5:** five reason cards, Nunito 800 **18 px**, line-height 22, max 2 lines, card inner width 302 *est.*; the literal is authored per locale in `data/b6/locales/healthy-habits.<loc>.json reasons.<habit>`; budget en ≤ 34 chars so de/fi/pt at +40 % (≤ 48) still fit two lines (≈ 36 chars/line at 8.1 px/char). The gate asserts `scrollHeight <= 2 * 22 + padding` per card; an overflowing literal is sent back to the panel, never shrunk. Frames avoid noun agreement (verb-led: "washes the germs away", "keeps the teeth strong").
- **F6:** column heads = `dayAbbr` in `weekStart` order, Baloo 2 700 **18 px** teal (≤ 3 chars in every locale: pt "sáb", fi "ma"); row heads are pictograms only, no text.
- Chrome: instruction ≤ ~150 chars; every instruction names only drawn apparatus (lines, boxes, sign + pictures + scissors, rows, cards, stars).
- Font floor 9 px: nothing on the body is below 18 px.

## 7 Five variation faces (b c d e f)

**F2 `hand-washing-steps` (K, `K-3xx TBD by the emitter`), CODE face (`layout:'steps-write'`, new build branch + verify branch).** Five close-up step cards `hw-wet hw-soap hw-rub hw-rinse hw-dry`, scrambled, each a square SIGN PLATE (white, teal 3 px ring, radius 16, 188 x 188, close-up 176) over an EMPTY `blankNumeralBox` 64 x 52; the child writes 1 to 5. Layout: grid 3 + 2 cards (second row centred), card 200 x 262 (6 pad + 188 + 10 + 52 + 6), column gap 19: **3 x 200 + 2 x 19 = 638 ≤ 639**; rows **2 x 262 + 30 = 554 ≤ 677**. Visual delta from the base: squares in a grid instead of two columns, every card shares the sink band, no lines. The unique order is carried by STATE (tap on/off, bubbles, soap position, towel), never by pose alone: wet and rinse are the same pose and differ ONLY by the falling bubbles, which is the teaching point (soap comes between them). Verify: derive the order from the gate's own state-rule table (`wet < soap < rub < rinse < dry`), assert the five state vectors distinct, the shuffle a derangement and not the reverse, and over 20 seeds incl. the shipped one no card sits in its own step position > 40 %. No seconds, no counting marks. Query face: "hand washing steps" / "Richtig Hände waschen: die fünf Schritte" / "stappenplan handen wassen".

**F3 `brushing-teeth` (K, `K-3xx TBD`), CODE face (`layout:'glue-strip'`).** The de/nl demand leader, built as the thing a teacher pins at the sink: a long SIGN PLATE at the top (639 wide, teal 3 px, radius 18, pad 10) holding **4 empty glue slots** (dashed coral 3 px, radius 12, **136 x 216**) joined by 3 teal chevrons (16 x 20, centred in 23 px gaps): **4 x 136 + 3 x 23 = 613 = 639 - 6 - 20**; below, a 44 px band with `scissorsGlyph(26)` at the left; then **4 separate cut cards** (dashed `grid` 2 px, 132 x 212, a hair smaller than a slot so a cut card fits) spaced **4 x 132 + 3 x 34 = 630**, each holding one close-up (`tb-paste tb-brush tb-rinse tb-cup`) scrambled. Height: 216 + 26 (plate) + 44 + 212 = **498 ≤ 677**. The order is shown by ARROWS, so **no numeral is printed or written anywhere** (the lock's "no numbers" held literally). Uniqueness by the toothbrush's own state: dry+paste, foam, under water, standing in the cup. **de re-target (data, not code):** the de panel may set `brushSteps:['tb-paste','tb-zone-kau','tb-zone-aussen','tb-zone-innen']` (the KAI method, the measured de query "richtig Zähne putzen KAI"), whose order is fixed by the mnemonic; the same layout carries it. Spit and mouth-rinse are NOT steps (dental advice differs: "spit, don't rinse"). Verify: 4 slots empty, 4 cut cards present, cards not in slot order, derived order from the gate's `BRUSH_RULE` (or `KAI_RULE`), cut cards each ≤ slot size in both axes (measured). Query face: "brushing teeth worksheet" / "Richtig Zähne putzen" / "tanden poetsen stappenplan".

**F4 `stop-the-germs` (G1, `G1-4xx TBD`), CODE face (`layout:'choice-pairs'`).** Four rows, each two option tiles (white, teal 3 px, radius 16, **200 x 146**, pictogram 124 high) 60 px apart, row width 460 centred; the child CIRCLES the tile that stops germs (a drawn circle is visible around a rounded square; the tiles are deliberately not circles). Rows **4 x 146 + 3 x 22 = 650 ≤ 677** (minmax(140px,1fr)). Pool of five minimal pairs, four per page: P1 cough-elbow / cough-open · P2 drop-tissue / tissue-floor · P3 own-cup / share-cup · P4 wash-after-toilet / leave-toilet · P5 wash-before-eating / eat-unwashed. The unhealthy twin is a NEUTRAL pose: no dirt, no germ monster, no frown, no red X (no shaming). Balance: the healthy tile left in exactly 2 of 4 rows, never alternating L R L R or R L R L, and over 20 seeds no position > 70 %. Visual delta: two-across rows of squares, the first face where the child judges between two versions of one scene. Verify: per row, the healthy tile is the one whose rendered parts match the gate's `HEALTHY` table (P1 has no `spray` part; P2's tissue is inside the bin rect; P3 has two cups; P4/P5 contain the `wash-hands` basin), and the primitive gate's minimal-pair rule (2) holds. Query face: "germs worksheet" / "como evitar germes" / "Keime".

**F5 `why-healthy-habits` (G2, `G2-3xx TBD`), PARAM+DATA face (`layout:'match'`, `right:'reason'`; the base build with a new right-column renderer, stamped only when declared).** `.ws-match`: left five habit circles **100** (pictogram 84; here the habit MAY show its tool, since the answer is the reason) `wash-hands brush-teeth sleep move sun-hat`; right five REASON CARDS (`.ws-match-item--plain`, **330** wide, min 84 high, Nunito 800 18/22, ≤ 2 lines, left-aligned, pad 10 14). Rows **5 x 100 + 4 x 18 = 572 ≤ 677**; width 30 + 100 + 185 + 330 + 30 = 675. Visual delta: the right column turns from signs into sentences, the only reading face. Reasons are panel literals (pedagogy: germs away · teeth strong · body rests and grows · heart and muscles strong · skin safe from the sun), each tagged with its habit; the panel certifies no reason fits two habits ("keeps you healthy" is banned as fitting all five). Verify: the tag bijection, derangement rule as base, no reason literal contains its habit's own noun (a fact never names its column, nt10-E class). Query face: "why do we wash our hands" / "por que lavar as mãos" (BNCC EF01CI03's razões).

**F6 `healthy-habits-chart` (G1, `G1-4xx TBD`), CODE face, OPEN (no verify of answers; layout lints + a structural gate only).** A week tracker: header row of 7 `dayAbbr` in the locale's `weekStart` order; five rows headed by habit circles **76** (pictogram 64): `wash-hands brush-teeth drink move sleep` (the sleep / move / drink rows the lock gives this face); each cell holds one outline STAR (52, white, ink 2.5) the child colours on a day she does it. Grid: head column 92 + **7 x 78 = 638 ≤ 639**; height header 40 + **5 x 100 = 540 ≤ 677** (rows minmax(96px,1fr)); rows alternate white / cream, rules `grid` 1.5. No numbers, no hours, no "x times". Visual delta: the only table, the only page used for a whole week. Structural gate: 7 columns in exactly `CALENDAR.<loc>` order, 35 empty stars, no text in rows. Query face: "healthy habits chart" / "tabla de hábitos" / "healthy habits tracker printable".

**Why these five.** Each is one of the lock's faces and each changes what the child DOES: join (base), write an order (F2), cut and glue an order into a sign (F3), judge between two (F4), read and join a reason (F5), record over a week (F6). Each maps to a measured query head (hygiene/what do I use · hand washing steps · Zähne putzen / tanden poetsen · germs · reasons · chart/tracker). No two differ only by an adjective; every resolved `layout` differs (`match` / `steps-write` / `glue-strip` / `choice-pairs` / `match+reason` / `chart`).

**First to cut:** F5 (G2, the only face that needs per-locale sentences and the thinnest measured demand); if a second must go, P5 leaves the F4 pool, never a face.

**Hub visibility contract (restated).** Each face appears under its type on `/[locale]/worksheets` IFF `apps['healthy-habits']` exists (subject `science`), `axes['exercise-type']['healthy-habits']` has `slug` + `name` ×11, exactly one landing per face per locale with `coordinate.type === 'healthy-habits'`, a band-table level key, a unique slug and `canonicalDeckSlug` = the published deck, committed + deployed. Gate `scripts/verify-hub-type-rows.js` expects **6 rows per locale ×11 = 66** (no refusal designed; a recorded refusal lowers the matrix).

## 8 Two alternatives + recommendation

- **Alt 1: library tools on the right (the pedagogy draft).** Painted toothbrush, comb, bed, tissue + a drawn soap. Rejected: (a) mixes art sources on one page (lock ruling 4), the drawn soap would look foreign; (b) the opened pictures carry traps: the tissue box wears a medical cross, `around the house/glass` is wine, both cups hold coffee, shampoo reads as soap; (c) colour pictures on the right vs grey pictograms on the left give a salience tell and print unevenly; (d) the step faces cannot use them anyway (no picture of a state), so the family would split into two looks.
- **Alt 2: "my morning" whole-figure scene boards.** Each habit as a full child figure in a small composed bathroom/bedroom. Rejected: at 60 px the actions shrink to a few pixels (the hands are where hygiene happens), scene furniture becomes a shape tell, and a composed room is scene art the generator does not draw.
- **Recommendation: the pictogram sign family.** It is the only concept in which all six faces share one look, every answer survives a black-and-white printer, the base needs no reading in any of 11 locales, and the step cards double as the sink sign a teacher actually wants on the wall. Its cost is one new primitive, and that primitive comes with a gate that measures confusability instead of trusting it.

## 9 Risks, mitigations, print check

- **Pose legibility is the whole bet.** `cough-elbow` (arm across the mouth) and `blow-nose` (two hands at the nose) are the hardest ISO-style poses to read. Mitigation: the 60 px 1-bit Jaccard gate + the minimal-pair rule; a human read of the 60 px sheet by the critic and the pedagogue before the face banks are frozen; if `blow-nose` fails the human read, base d2 swaps it for `drink ↔ cup` (drink pose WITHOUT its cup, slot ring at the mouth, head tilted) as a data change.
- **Slot ring misread** as "a ball" or "the answer box". It is `grid` dashed (not coral), 17 px, identical on every pose; the instruction never mentions it. Human-eye check only.
- **Profile vs front** with faceless heads: profile poses read by the arm and the one-leg body; the gate cannot judge "facing right", a human must.
- **Greyscale:** ink 54 / teal 80 / tealSoft and white light; every decision rests on SHAPE and PART (bubbles, spray, tissue position, cup count), never on hue. Coral appears only on match dots, F2 boxes and F3 glue slots. Water is a line pattern, not a tint.
- **Cut lines (F3):** cut cards are separate dashed rectangles with 34 px gutters (no shared edges), at the bottom of the sheet; the sign plate is never cut. Cards 132 x 212 < slots 136 x 216 (gated).
- **Overflow:** body text exists only on F5 (two-line cap, per-card scroll check) and F6 heads (≤ 3 chars). Every stack is budgeted to 677.
- **Pencil space:** base line field 323 px; F2 boxes 64 x 52 (K numeral 30 fits); F6 stars 52.
- **9 px floor:** smallest body text 18 px.
- **What QA lint catches:** overflow, footer intrusion, palette, font floor, blank page (`[data-ws-content]`). **What only the type gate catches:** tool leakage into a pose, state-vector duplicates, derangement/position tells, reason overlap, cut-card size. **What only a human eye catches:** whether a six-year-old reads the pose as the habit, whether the neutral twin looks neutral, whether the moon means sleep in every country (it does in all 11 picture traditions; a panel may still flag).
- **Science honesty:** elbow cough is the only correct cough; no seconds, hours, amounts, or frequencies anywhere; no food; drink = water in a clear tumbler.

## 10 Summary

1. One NEW flat pictogram language (`primitives/habit-pictogram.js`: faceless ink child poses, teal tool glyphs, sink close-ups) carries all six faces; zero library pictures, so one art source and identical greyscale print.
2. Base: five habit CIRCLES joined to five tool SQUARES; a pose never draws its own tool (a neutral dashed slot ring marks where it goes), so the page tests knowledge, not shape matching.
3. Faces: hand-washing 5 steps (write the order, unique by water/bubble/soap/towel state) · brushing teeth as a cut-and-glue sink sign with arrows, no numerals (de may pick KAI by data) · stop the germs minimal pairs (circle the square) · why (reason sentences) · a 7-day star chart.
4. Every stack fits 677 px (base 648, F2 554, F3 498, F4 650, F5 572, F6 540); only F5 has body text.
5. A new render gate measures 60 px 1-bit confusability, minimal-pair differences, distinct step states and tool leakage, poison-tested both ways; the human read of `cough-elbow` / `blow-nose` is the named residual risk.
