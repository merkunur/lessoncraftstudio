# K-379 `story-sequencing` — DESIGN A: "the story washing line"

Designer A (children's-book illustrator + editorial designer). Inputs read: `_ROLE-DESIGN.md`, `_STUDIO-BRIEF.md`, `_SUBSTRATE.md` (DELTA + nt10-D sheet), `_PANEL-FINDINGS.md` (rows 12 / 20 / 29 / 39), `_work/_selection-pedagogy.md` §2 (A-D, six faces, traps). House language studied in code (`primitives/road-pictogram.js`, `life-stage.js`, `family-figure.js`, `_tokens.js`, `_svg.js`) and in the renders `out/b5-sweep/en/K-369`, `K-374` (crossing steps, the nearest "write 1-4 under pictures" page), `K-370` (family tree), `G1-377` (life-cycle, the science-sequence neighbour). Components read: `components-b3/ordinal-numbers.js` (`blankNumeralBox`, `wordChipRow`), `components-b3/read-and-do.js` (`drawBox`), `components-b4/cloze.js` (`sentenceMatch`, `derange`), `components-b4/question-words.js` (`starterLines`), `components-b2.js` (`rulingBlock`), `page/page.css` (`.ws-blankbox`, `.ws-achip` = Baloo 2 700, white, teal 2.5 border, r 24). **No library picture is named in this design** (one art source: every panel is drawn), so nothing needed opening; the F6 "title badge" the pedagogy allows is declined (§5).

## Boundary

This page is NOT: **G1-203** science-sequence or **G1-377 / G1-388** life cycles (no growth, hatching, melting, weather cycle; the snowman stops at "dressed", never melts; no seed, no plant anywhere in the panel vocabulary); **K-374** crossing-the-road steps and the future healthy-habits hand-washing procedure (a PROCEDURE is never drawn as a story: no hands washing, no road, no traffic light, no walker at a kerb); **days-and-months** ordering (no calendar, no clock); **read-and-do G1-340** ordinal positions (no "1st/2nd/3rd", no ordinal chip anywhere; the child writes plain numerals 1-4 or circles temporal WORDS); **reading-comprehension G2-254** (text stories: here the pictures ARE the story, the text on F5 describes pictures); **feelings K-319** (no faces, no emotion; the one person-shape in the vocabulary is the faceless `road-pictogram` walker and it is in a reserve story only); **cloze G1-350** story face `storyBlock` (library pictures + gap sentences; here no gap). It owns NARRATIVE order from drawn pictures: a small everyday story whose change the child can point at, the temporal words, predicting the next event, beginning-middle-end, retelling. **Visual signature: every story HANGS ON A WASHING LINE** (a sagging teal cord with clothes pegs), one line per story, and the child's answer hangs under each card as a paper TAG on a short string.

## 1 Page concept (base)

**The story washing line.** Across the room a teacher sees two cords sagging across the page, four square picture cards pegged to each, and under every card a little dashed tag dangling on a string. That is exactly the classroom routine in many curricula (cards pegged on a real washing line and re-ordered by the class; de "Bildergeschichte an der Wäscheleine", en "story washing line"; each panel confirms its local name for the landing, never on the sheet). The metaphor does three jobs at once: (1) it says "these belong together as ONE story" without a word (one cord = one story, so two stories on one page never blur), (2) it says "left to right" (a line is read along), which is precisely the order the scramble breaks and the numerals restore, (3) it is joyful and physical: pegs, a sag, tags that swing, a picture book's warmth on an otherwise geometric house style.

Top quality because: ONE focal apparatus per row (the line); large square panels (144 px, the biggest drawn pictures on any K sequencing page in the catalogue: K-374 frames are 180 tall but a quarter of each is road); calm flat art at the house weight (teal 3 px frame, token fills, no text in the art); whitespace is structural (the gaps between cards are where the cord shows); pencil-first (the tag is a 64 × 56 dashed coral box, the child writes one numeral).

## 2 Layout (d2, 722 body)

Lane: `.ws-lane` inner **639 at default padding**; the row content is **636** wide. Every row is a CSS grid row `minmax(<min>px, 1fr)`; the body is a flex column `justify-content: space-evenly`, so slack at 781 / 814 chrome becomes air between the two lines, never bigger art.

```
body 722 (worst case: three-line title + three-line instruction)          width 636 (lane 639)
+------------------------------------------------------------------------------------+
| o~~~~~~~~~~ peg ~~~~~~~~~~~ peg ~~~~~~~~~~~~ peg ~~~~~~~~~~~~ peg ~~~~~~~~~~~~~~o    |  line zone 24
|   +---------+   +---------+   +---------+   +---------+                             |
|   | panel   |   | panel   |   | panel   |   | panel   |   story 1                   |  card 144
|   | 144x144 |   |         |   |         |   |         |   (scrambled)               |
|   +----+----+   +----+----+   +----+----+   +----+----+                             |
|        |             |             |             |          tag string              |  12
|     [.....]       [.....]       [.....]       [.....]       blankNumeralBox 64x56   |  56
|                                                                                    |  row gap >= 36
| o~~~~~~~~~~~~~~~~~~~~~~~~~~~ (story 2, same geometry) ~~~~~~~~~~~~~~~~~~~~~~~~~~~o    |  24
|   [ 144 ]       [ 144 ]       [ 144 ]       [ 144 ]                                 |  144
|      |             |             |             |                                    |  12
|   [.....]       [.....]       [.....]       [.....]                                 |  56
+------------------------------------------------------------------------------------+
```

Arithmetic. Width: 4 × 144 + 3 × 20 = **636 ≤ 639**. Row: 24 (line zone) + 144 (card) + 12 (tag string) + 56 (tag) = **236**; two rows 472 + row gap 36 = **508 ≤ 677** (the four-line fi title case) **≤ 722**. Slack at 722 = 214 px, spread by `space-evenly` (≈ 71 px above, between, below).

Line zone geometry (one absolutely positioned SVG, 636 × 24, behind the cards): cord = `path M3,5 Q318,21 633,5` teal, stroke 2.5, fill none (sag 8 px at the middle: the quadratic's apex is y 13). Hooks: `circle r3.5` teal fill at (3,5) and (633,5). Cards all share ONE top y (24), so tags align on one baseline; the pegs absorb the sag: every card gets two pegs at x = card-left + 30 and card-right − 30; peg = `rect w8 h(24 − yCord(x) + 4) rx2` white, teal stroke 2, from yCord(x) − 3 down to y 27 (overlapping the card frame by 3), plus a centre spring line ink 1.2 across the peg at its middle. `yCord(x)` = the quadratic evaluated at x (engineer: `t = x/636`, `y = 5(1−t)² + 2·21·t(1−t) + 5t²`). Tag string: `line` teal 2 from card bottom-centre to tag top, 12 px. Tag = `blankNumeralBox({ w: 64, h: 56, answer: '' })` (numeral written ≥ 30 px, the K floor), with a 6 px white "eyelet" circle (teal 1.5 stroke) centred on its top edge where the string meets it.

Sizes vs floors: panel 144 ≥ K min element 56; tag 64 × 56 hosts a 30+ px numeral; no printed text in the body at all on the base (the instruction carries everything).

## 3 Ladder

Resolved config keys (base, `mode:'base'`).

| key | d1 | d2 (ships) | d3 |
|---|---|---|---|
| mode | base | base | base |
| stories | 2 | 2 | 2 |
| panels | 3 (the story's `three` subset) | 4 (`four`) | 5 (`five`; only the 7 five-step stories) |
| size (panel px) | 176 | 144 | 116 |
| gap (between cards) | 40 | 20 | 12 |
| width check | 3·176+2·40 = 608 | 636 | 5·116+4·12 = 628 |
| row height | 24+176+12+56 = 268 → 2 rows + 36 = 572 | 236 → 508 | 24+116+12+52 = 204 → 444 |
| tag | 64 × 56 | 64 × 56 | 60 × 52 |
| scramble | derangement, not reverse | derangement, not reverse, position-balanced | same |
| storyPool | all 13 | all 13 | 7 five-step |

d2 is the best page: four panels is where "what changed" still has one clear cue per step, 144 px keeps every state part ≥ 7 px, and 8 tags sit inside the K item band 4-8.

## 4 Answer-hiding + uniqueness

- **Printed:** the four panels of each story in a SCRAMBLED order, and empty tags. The answer (1-4 per card) is never printed; `blankNumeralBox` is always called with `answer: ''`. The truth is stamped on the card wrapper as `data-lcs-story="<id>" data-lcs-step="<true index 0..n-1>"` and `data-lcs-slot="<visual position>"`; `verify()` re-derives the expected numeral per tag = rank of its card's step within the story's shown subset.
- **Scramble rules (keyed on config, never on level):** per row a derangement of the true order (no card in its true slot, `components-b4/cloze.js derange`, which already rejects the exact reverse for n > 2); the two rows on a page never use the same permutation; over 200 seeds the TRUE FIRST card's visual slot is uniform (each slot 25 % ± 6 pts) and the true LAST card likewise (the nt10-D staircase lesson: measured on the shipped seed AND across seeds, both directions).
- **One legal order, computed:** each story in `data/b6/stories.js` declares its one-way `mono` features per step (e.g. snowman `balls:[1,1,2,3,3]`, `dressed:[0,0,0,0,1]`; cake `candlesIn:[0,1,1,1,0]`, `burnt:[0,0,0,1,1]`, `eaten:[0,0,0,0,1]`). The gate enumerates every permutation of the SHOWN subset (6 / 24 / 120) and asserts exactly ONE is non-decreasing on every feature and strictly changes at least one feature per adjacent pair. A story (or subset) with a second satisfying permutation is dropped, never fixed by instruction text. The native/pedagogy panel still does the human "could a child tell a second story" read; the gate proves the declared features admit one order only.
- **Visible to the teacher:** a wrong tag is a numeral that breaks the chain the teacher can see in one glance ("3 under the empty plate"); the quality rule holds by construction: every adjacent pair differs by a state part that is drawn larger than 7 px and outlined (the child points at it).

## 5 Primitives / components

**Reused (exact).** `primitives/_svg.js` (`svgRoot`, `el`, `esc`, `circle`) · `primitives/_tokens.js` (`color` only; **no** `codeColors`) · `blankNumeralBox({w,h,answer:''})` (`templates/components-b3/ordinal-numbers.js:151`) · `drawBox` style (white, dashed coral 2.5, r 12, `components-b3/read-and-do.js:124`; F4 calls it, flexing height is not needed) · `derange` (`templates/components-b4/cloze.js`) · `rulingBlock({rows,w,h,glyphH,starters,gap})` (`templates/components-b2.js:76`, starter px from the measured `starterFontPx`; F6) · `.ws-match` / `.ws-match-col` / `.ws-match-item` / `.ws-match-dot--left/--right` (`page/page.css`; F5) · `.ws-achip` (Baloo 2 700, `page/page.css:407`; F2 chips) · `road-pictogram.js glyphGroup({pose:'walking'})` for the RESERVE story only · `lib/rng.js` (`shuffle`, `int`).

**NOT used.** Any library picture (one art source per story; the life-stage precedent; the library draws one state per noun, `_selection-pedagogy.md` §2 C) and therefore no title badge on F6 either (a glossy badge beside flat panels is the mixed-source look the rule forbids). `family-figure.js` (a face-bearing bust; stories carry no faces). `cardGrid` (its badge numbers the cards = prints an order). `sentenceMatch` (its right column is a library `icon` at a fixed 56+ px, and it throws unless deranged against the LEFT index: F5 needs drawn SVG cards on the left; its derangement guard is re-used through `derange`). `wordChipRow` (horizontal `nowrap`: three chips under a 150 px card overflow in de). `storyBlock` (library pictures, gap text). `starterLines` (fixed 4-6 starters on 639: F6 pairs a card with two rows, so `rulingBlock` is called directly). `life-stage.js` lens (a magnifier says "science").

**NEW `primitives/story-panel.js`** (gate `qa/verify-b6-story-panel.js`).

```
storyPanel({ story, step, size, id }) -> { svg, width: size, height: size,
                                            meta: { story, step, parts: {<part>: count} } }
SCENES[story][step] -> array of part calls        PARTS: the vocabulary below
STORY_IDS, stepsOf(story)                         MIN_SIZE = 90 (throws below)
```

- **viewBox `0 0 100 100`, square.** Frame = `rect x1.5 y1.5 w97 h97 rx9` fill `white`, stroke `teal` **3 px at every size** (user units = 3 × 100 / size, the `family-figure` / `body-figure` constant-px rule). Content `<clipPath>` = `rect x3 y3 w94 h94 rx7`; every part lives inside it.
- **Strokes (constant px):** OUTLINE `O = clamp(size/50, 2, 3)` px (2 at 90-100, 2.9 at 144, 3 at ≥ 150); DETAIL `D = 1.5` px (1.2 below 110); round joins and caps. Outline colour `teal` always; detail `teal` unless the part says `ink` / `grid`.
- **Palette:** `white` `cream` `creamDeep` `tealSoft` `coralSoft` `coral` `teal` `ink` `grid` only. **Greyscale rule (load-bearing):** creamDeep / tealSoft / coralSoft are within ~2 % of each other in grey, so a STATE may never be carried by one of those fills alone: every state-bearing change is a new OUTLINED shape, a count of outlined shapes, a size change ≥ 20 %, or a fill jump of the strong family (`white` ↔ `coral` ↔ `teal` ↔ `ink`). The gate renders at `filter: grayscale(1)` and asserts it.
- **No `<text>`, no letters, no digits, no faces** (no eyes, no mouths; the snowman is dressed, not faced). Minimum state-bearing part: **5 units in its smaller dimension** (4.5 px at MIN_SIZE 90, 7.2 px at 144).
- **Stamps:** root `<svg data-lcs-story-panel data-lcs-story="…" data-lcs-step="…">`; every drawn shape `data-part="<id>"`; static scenery also `data-scenery="1"` (never counted as state).

**Scenery (static within a story; present in EVERY step so it is never an order cue).**

| part | geometry (units) | fill / stroke |
|---|---|---|
| `floor` | line (3,84)-(97,84) | `grid`, D×1.4 |
| `table(topY=60)` | top `rect x10 y=topY w80 h6 rx2`; legs `rect x16 y=topY+6 w5 h=78−topY` and `x79` | creamDeep, O |
| `plate(cy)` | `ellipse cx50 cy rx24 ry3.5` | white, O |
| `snow` | `path M3,80 Q28,74 50,78 Q74,82 97,76 V97 H3 Z` | white, top edge teal D |
| `beach` | `path M3,82 Q50,77 97,82 V97 H3 Z` + 6 `ink` dots r0.9 at (12,90)(26,87)(40,92)(58,89)(74,93)(88,88) | creamDeep, D |
| `easel` | legs lines (30,84)-(38,18), (70,84)-(62,18), (50,84)-(50,24) O; board `rect x30 y18 w40 h46 rx2` creamDeep O; paper `rect x33 y21 w34 h38` white D; tray `rect x28 y64 w44 h4` creamDeep O; crayon `rect x54 y60 w12 h4 rx1` coral O | |
| `pump` | barrel `rect x16 y56 w10 h28 rx2` creamDeep O; handle line (21,56)-(21,47) + bar (15,47)-(27,47) teal O; nozzle `rect x26 y62 w6 h3` teal | |
| `cactusPot` | pot `path M75,72 H93 L90,84 H78 Z` coralSoft O; body `rect x80 y50 w8 h22 rx4` tealSoft O; arm `rect x87 y57 w6 h4` + `rect x89.5 y51 w4 h10 rx2` tealSoft O; 4 spines ink D×0.8 | |
| `board` (pizza) | `circle cx50 cy50 r41` creamDeep O; handle `rect x45 y89 w10 h8 rx2` creamDeep O | |
| `rails` (fence) | `rect x10 y50 w80 h4` and `x10 y70 w80 h4` | creamDeep, O |

**State parts (the vocabulary; each parameterised, each outlined).**

| part | geometry (units) | fill |
|---|---|---|
| `snowball(cx,cy,r)` | circle | white, O |
| `hat` | brim `rect x42 y24.5 w16 h2.5`; crown `rect x44.5 y15 w11 h10` | ink |
| `scarf` | band `path M43.5,40 Q50,43 56.5,40 V43.5 Q50,46.5 43.5,43.5 Z`; tail `rect x52 y42 w4.5 h9 rx1` | coral, D |
| `stickArms` | lines (41,48)-(29,40), (59,48)-(71,39) + a 3-unit twig each | teal O |
| `buttons` | 2 circles r1.6 at (50,46),(50,52) | ink |
| `block(x,y,rot)` | `rect w14 h14 rx1.5` centred; inner `rect` inset 3 (detail) | alternating white / creamDeep, O; inner D |
| `toyBall(cx,cy)` | circle r7; stripe `path` arc through centre | coral O; stripe white D×1.4 |
| `motion(x,y)` | 3 lines length 5 at y−4, y, y+4 ending 2 units left of the ball | ink D |
| `balloon(cx,cy,rx,ry)` | ellipse + knot `path` triangle 3 units under it + white highlight arc | coral, O |
| `balloonLimp` | `path M36,84 Q38,76 44,78 Q50,80 47,84 Z` + knot | coral, O |
| `string(from,to)` | `path` 2-wave cubic | teal D |
| `burst(cx,cy)` | 6 ink lines length 6 radiating from (cx,cy), starting r 4 | ink D×1.3 |
| `fragment(k)` | 4 irregular quads ≈ 6 × 4 at fixed offsets (78,42)(70,52)(86,56)(76,62) | coral, O |
| `cake(full / half)` | full `rect x30 y44 w40 h21 rx3`; half `rect x30 y44 w20 h21 rx3` + cut-face `rect x30 y53 w20 h3` white | creamDeep, O |
| `icing(w)` | scalloped band: `M30,48 Q33.3,53 36.7,48 …` 6 scallops to x 30+w, `V44 H30 Z` | white, D |
| `candle(i,h)` | x = 35 + 8i (i 0..3), `rect w5`, tall h14 (y30-44) / burnt h7 (y37-44); wick ink line 2.5 up | white, D |
| `flame(i)` | teardrop `M c,t−11 Q c+4,t−5 c,t−2 Q c−4,t−5 c,t−11 Z` (c = candle centre, t = candle top) | coral, D |
| `smoke(i)` | `path M c,t−2 q2,−3 0,−6 q−2,−3 0,−6` | grid, D×1.4 |
| `slice(cake)` | `rect x58 y55 w12 h10 rx1` + white band `y59 h2` | creamDeep, O |
| `breadBottom` / `breadTop` | `rect x31 y51 w38 h6 rx3` / dome `M31,44 V40 Q31,33 38,33 H62 Q69,33 69,40 V44 Z` | creamDeep, O |
| `cheese` | `rect x30 y47 w40 h4` + drip `M60,51 L63,55 L66,51` | coralSoft, O |
| `lettuce` | zigzag band y 44..47, 10 teeth from x29 to x71 | tealSoft, O |
| `bite(x, ys)` | white discs r5 at (x, y) for each y + the inner half-arc stroked teal O | white |
| `crumbs` | 5 dots r1.6 at x 38,44,52,57,63, y 56 | creamDeep, D |
| `dough` / `sauce` | circle r32 / circle r26 + dashed teal D ring (3 2) at r26 | white O / coralSoft |
| `olive(k)` | 6 rings r3 at (40,40)(58,38)(64,54)(50,62)(36,58)(50,48) | white, ink D×1.3 |
| `basil(k)` | 5 ellipses rx4 ry2, fixed positions and angles | tealSoft, D |
| `cuts` | 3 lines through (50,50) at 0°, 60°, 120°, r 0..32 | teal D |
| `sliceGone` | the 60°..120° wedge of r32 (lower-centre) re-filled creamDeep, its two edges stroked O; toppings in it omitted | creamDeep |
| `apple(state)` | `M50,32 C43,26 31,30 32,43 C33,56 43,60 50,57 C57,60 67,56 68,43 C69,30 57,26 50,32 Z`; stem (50,32)-(52,24) O; leaf ellipse (57,26) rx5 ry2.5 −25° tealSoft D | coralSoft, O |
| `appleBite(side,r)` | white disc r7 (one) / r9 (both) at (69,44) / (31,44) + inner half-arc O + 1 white flesh line | white |
| `core` | `M44,30 Q50,34 56,30 L55,33 Q50,44 55,55 L56,58 Q50,54 44,58 L45,55 Q50,44 45,33 Z` + 2 ink seed ellipses (48,44)(52,44) + stem | creamDeep, O |
| `sunOutline` / `sun` / `grass` / `flower` (on the easel paper) | circle (44,32) r6 teal D / same filled coral + 8 rays length 3 from r8 teal D / zigzag band y52..58 across the paper tealSoft D / stem (58,58)-(58,46) + 5 white petals r2 D + coral centre r1.5 | |
| `sheet` / `sheetFolded` / `dart` / `dartFlying` | `rect x28 y22 w44 h60` / pentagon `M28,44 L50,22 L72,44 V82 H28 Z` + two creamDeep inner triangles + dashed centre fold / `M50,18 L66,80 L50,72 L34,80 Z` + centre + 2 wing fold lines D / dart at 0.6 scale rotated 45° centred (68,32) + trail `M10,86 Q30,60 54,46` grid D×1.4 dash 4 3 | white, O |
| `card` / `heart` | `rect x36 y26 w28 h34` (stands on table 60) / heart `path` 12 units centred (50,43) | white O / coral D |
| `envelope` | `rect x28 y40 w44 h20` + flap lines (28,40)-(50,52)-(72,40) D; card peeking `rect x38 y26 w24 h14` with the top half of the heart | white, O |
| `postBox` | post `rect x47 y62 w6 h22` teal; box `rect x32 y26 w36 h36 rx6` tealSoft O; slot `rect x39 y34 w22 h3` ink; envelope half in: `rect x41 y24 w18 h11.5` white O (bottom edge on the slot) | |
| `bucket(up / down)` | up `M38,52 L62,52 L59,80 L41,80 Z` + handle arc + sand dome `M38,52 Q50,44 62,52 Z` creamDeep / down `M41,54 L59,54 L62,82 L38,82 Z` + handle lying | white, O |
| `castle(full / half)` | full = the down-trapezoid in creamDeep + 3 merlons `rect w4 h4` at x 41, 48, 55 y 50 / half `M38,82 L41,54 H50 L52,62 Q60,76 70,82 Z` | creamDeep, O |
| `bucketLying` | the up-trapezoid scaled 0.7, rotated −80°, centred (18,76) | white, O |
| `wave(small / big)` | `M84,97 V80 Q88,74 94,78 Q96,76 97,77 V97 Z` / `M60,97 V84 Q70,74 80,80 Q88,72 97,76 V97 Z` + 3 white foam dots r1.5 | tealSoft, O |
| `box` / `lid` | `rect x30 y48 w40 h36` / `rect x27 y42 w46 h8`; `wrapped` = white fill + coral dots r1.8 on an 8-unit grid (clipped); `lidLeaning` = lid rotated 70° at (82,70) | creamDeep O (wrapped white O) |
| `ribbon` / `bow` | vertical `rect x47 y42 w6 h42` + band `rect x30 y62 w40 h5` / 2 ellipses rx7 ry4 at (43,39) +20°, (57,39) −20° + knot r2.5 | tealSoft, O |
| `tornPaper(k)` | 3 irregular white-with-coral-dot polygons on the floor at x 12-26, 64-74, 84-94 | white, O |
| `plank(i, painted)` | x = 14 + 13i (i 0..5): `M x,42 L x+5,36 L x+10,42 V84 H x Z`; painted adds 3 vertical teal D lines at x+3, +5, +7 from y 44 to 80 (the stripes carry the state in grey) | white O / tealSoft O |

**`SCENES` (step order = the true story order; `four` / `three` = the shown subsets).**

| id | set | steps (0..n-1) | four | three |
|---|---|---|---|---|
| `snowman` | snow | 0 small `snowball(30,73,6)` + dashed grid roll track (8,79)-(24,79) · 1 `snowball(50,65,13)` · 2 + `snowball(50,46,9)` · 3 + `snowball(50,31.5,6.5)` · 4 + hat, scarf, stickArms, buttons | 1 2 3 4 | 1 3 4 |
| `tower` | floor | 0 one `block` (50,77) · 1 three stacked (bottoms at 84, 70, 56) · 2 five stacked (top at y 14) · 3 five stacked + `toyBall(16,77)` + `motion` · 4 five blocks on the floor at x 13, 29, 59, 73, 88 (rot −18, 10, 24, −8, 15) + `toyBall(44,77)` | 0 1 3 4 | 0 3 4 |
| `balloon` | floor + pump + cactusPot | 0 `balloonLimp` · 1 `balloon(42,58,9,11)` on the nozzle · 2 `balloon(50,50,16,19)` on the nozzle · 3 `balloon(64,32,13,16)` tied, `string` to (56,70) · 4 `fragment`×4 + `burst(76,46)` + string lying on the floor | 0 1 3 4 | 0 3 4 |
| `cake` | floor + table(66) + plate(65) | 0 cake full + icing · 1 + 4 tall candles · 2 + 4 flames · 3 candles burnt + 4 smoke · 4 cake half + slice, no candles | 0 1 2 3 | 0 2 4 |
| `sandwich` | floor + table + plate(58) | 0 breadBottom · 1 + cheese + lettuce · 2 + breadTop · 3 + bite(69,[37,43,49]) · 4 plate + crumbs only | 0 1 2 3 | 0 2 3 |
| `pizza` | board | 0 dough · 1 + sauce · 2 + olives + basil · 3 + cuts · 4 + sliceGone | 0 1 2 4 | 0 2 4 |
| `apple` | floor + table + plate(58) | 0 apple · 1 + appleBite(right, 7) · 2 appleBite both sides r9 · 3 core | 0 1 2 3 | 0 2 3 |
| `drawing` | floor + easel | 0 blank paper · 1 sunOutline · 2 sun · 3 + grass · 4 + flower | 0 1 2 3 | 0 2 4 |
| `paperPlane` | none (white) | 0 sheet · 1 sheetFolded · 2 dart · 3 dartFlying | 0 1 2 3 | 0 2 3 |
| `letter` | floor + table (steps 0-2), floor only (3) | 0 card · 1 card + heart · 2 envelope · 3 postBox | 0 1 2 3 | 0 2 3 |
| `sandcastle` | beach | 0 bucket up · 1 bucket down · 2 castle full + bucketLying + wave small · 3 castle half + bucketLying + wave big | 0 1 2 3 | 0 2 3 |
| `gift` | floor | 0 box + lid · 1 wrapped box + lid · 2 + ribbon + bow · 3 box (unwrapped), `toyBall(50,46)` behind the box front, lidLeaning, tornPaper×3 | 0 1 2 3 | 0 2 3 |
| `fence` | floor + rails | 0 six planks unpainted · 1 planks 0-1 painted · 2 planks 0-3 painted · 3 all six painted | 0 1 2 3 | 0 1 3 |
| *reserve* `puddle` | floor | dry ground · raining cloud (grid) · puddle (tealSoft ellipse) · `glyphGroup({pose:'walking'})` at 0.5 scale + 6 white splash drops | — | — |

The twist endings (tower, balloon, sandcastle, gift) each show their CAUSE in the previous shown panel (ball rolling in, balloon drifting to the cactus, the small wave, the wrapped-and-bowed box). `puddle` is reserve only: rain → puddle borders on K-356 weather; the critic decides. Excluded with reason: pancakes (a 1 → 2 → 4 stack reads equally as "eating 4 → 2 → 1": two legal orders), getting dressed, juice glass, seed, ice cream (pedagogy list).

**NEW `templates/components-b6/story-sequencing.js`** (behind `templates/components-b6.js`; every export prefixed `ss`; inline CSS, class prefix `ss-`; every stage `data-ws-content`):
- `ssWashLine({ w, sag = 8, pegXs })` → the 24 px cord SVG with hooks and pegs (geometry §2).
- `ssHungRow({ cards:[{svg, story, step}], size, gap, under:'tag'|'chips'|'label'|'none', underOpts })` → the row of §2 (cards share a top y; the line behind; the "under" element on a 12 px string (tag) or directly below 10 px (chips, label)).
- `ssChipStack({ words:[first,next,last], w })` (F2): 3 `.ws-achip` stacked, gap 6, height 40, `font-size:18px`, width = max-content + 24, capped at `w`; stamped `data-lcs-chip-k="0|1|2"`.
- `ssQueryPeg()` (F3): a 22 × 22 coral circle with a white "?" drawn as SVG PATHS (no text), on the cord's end.
- `ssChoiceTray({ cards, size })` (F3): cream `rect` r12, creamDeep 2 px border, padding 5, 3 cards gap 6, stamped `data-lcs-choice="<story>:<step>"`.
- `ssDrawCard({ w, h })` (F4): a hung card whose face is the `drawBox` style (white, dashed coral 2.5, r 12) under two pegs.
- `ssStageLabel({ text })` (F4): Baloo 2 700 18 px pill, teal 2 border, height 32, max-width = card width.
- `ssBannerString({ h, rows })` (F5, F6): a VERTICAL cord at x 6 (teal 2.5, hook circle at the top) with one peg per card on the card's left edge.
- `ssSentenceCard({ text, w, h })` (F5): `.ws-match-item` white, teal 2 border, Nunito 800 18 px, `ws-match-dot--left`.

## 6 Locale slot structure

Text never enters a panel. The only word surfaces are: F2 chips (3 temporal words, panel literals `firstNextLast`), F4 stage labels (3, `bme`), F5 sentences (4 per story, `sentences.<story>`), F6 starters (4, `starters`), all read via `lib/b6-common.js bank('story-sequencing', loc)` from `data/b6/locales/story-sequencing.<loc>.json`; code substitutes, never inflects (the sentences are whole literals per story per step, no slots, so fi case and de V2 never arise in code).

| surface | font | size | box | longest-locale reserve |
|---|---|---|---|---|
| F2 chip | Baloo 2 700 (`.ws-achip`) | 18 px | h 40, w ≤ 196 | de "zum Schluss" ≈ 11 × 8.6 + 24 = 119 *est.*; +40 % = 167 ≤ 196 |
| F4 label | Baloo 2 700 | 18 px | h 32, w ≤ 170 | es "desarrollo" / fi "keskikohta" 10 × 9 + 24 = 114 *est.* ≤ 170 |
| F5 sentence | Nunito 800 | 18 px (G1 floor 16) | w 404, 2 lines | ≈ 52 chars/line *est.* → 104; en ≈ 40, de/fi/pt +40 % = 56 ✓ |
| F6 starter | Nunito 700 inkSoft | from `starterFontPx` (measured `font-metrics.json`) | first row of each pair | fi "Seuraavaksi" ≈ 11 chars ≈ 85 px *est.* of a 479 row |
| tags / draw / choices | — | — | — | no text |

Font floor 9 px never approached (smallest printed text 18 px). Instruction: ONE sentence ≤ 150 chars; names only the tags / words / pictures / lines / rows ON the face.

## 7 Five variation faces (b c d e f)

All five are **CODE** faces (`mode` knob on `build()` + a `verify()` branch, stamped only when declared; base byte-identical). None is PARAM: no base level is a different teaching move (base d1 is three panels with tags, not temporal words). IDs `K-3xx` / `G1-3xx` / `G2-3xx` (TBD by the emitter, bands as stated).

**(b) F2 First, Next, Last — K, `mode:'first-next-last'`.** Visual delta: three cards per line (not four), and instead of a tag each card has a STACK of three word chips under it (first / next / last, the same top-to-bottom order under every card), the child circles one per card; no numerals anywhere. Layout: 2 lines × 3 cards 150, column pitch 212 (3 × 212 = 636); row = 24 + 150 + 10 + chip stack (3 × 40 + 2 × 6 = 132) = 316; 2 rows + gap 28 = **660 ≤ 677**. Config d2 `{mode:'first-next-last', stories:2, panels:3, size:150, subset:'three'}`; d1 `{stories:1, size:190}`; d3 `{stories:3, size:112, stack:'row-of-3 short forms'}` only where every locale's words fit (else d3 = d2). Verify: per card exactly 3 chips with `data-lcs-chip-k` 0,1,2 in order; expected circled k = card's rank; cards deranged. Query face: temporal words "first next last".

**(c) F3 What Happens Next? — G1, `mode:'what-next'`.** Visual delta: the cards are hung IN ORDER (only three per line), the cord ends in a coral `ssQueryPeg`, and beside it a cream TRAY holds three candidate cards; the child circles the one that comes next. Layout per row: story 3 × 92 + 2 × 10 = 296, gap 6, peg 22, gap 6, tray 3 × 92 + 2 × 6 + 2 × 5 + 4 = 302 → **632 ≤ 639**; row = 24 + 92 = 116 (tray bottom-aligned with the cards); 3 rows + 2 × 40 = **428**, `1fr` absorbs the rest (panel 92 ≥ MIN_SIZE 90; G1 floor 44). Choices = {the true next step; a DUPLICATE of this story's first shown card (going backwards in time: never a plausible next, it tests the direction of time); the final card of a story that shares NO part id with this one}; correct slot uniform over seeds. Stories: `four` subsets, first three shown, the 4th is the target. Config d2 `{mode:'what-next', stories:3, shown:3, choices:3, size:92}`; d1 `{stories:2, choices:2}`; d3 `{stories:3, shown:2, choices:3}`. Verify: the target choice's step = last shown + 1 in the story's subset; distractor B's step < last shown; distractor C's story shares no part. **Flag for the critic:** the backwards duplicate is my addition to the pedagogy's "2 from other stories"; if refused, C is used twice (two other stories). Query face: "what happens next".

**(d) F4 Beginning, Middle, End — G1, `mode:'bme'`.** Visual delta: three cards per line where the MIDDLE one is an empty dashed drawing card (wider), and under each card a Baloo stage-label pill (beginning / middle / end) instead of a tag. Layout: begin 170 + middle 236 × 170 + end 170 + 2 × 30 = **636**; row = 24 + 170 + 8 + 32 = 234; 2 rows + 40 = **508**. Stories whose `three` subset has an unmistakable middle (snowman, tower, cake, sandwich, apple, drawing, sandcastle, gift). Open-ended (drawing): no `verify()` of the drawing; the layout lints + a config check (middle card has no `data-lcs-step`, ends are `three[0]` and `three[2]`). Config d2 `{mode:'bme', stories:2, size:170, midW:236}`; d1 `{stories:1, size:200, midW:236}`; d3 `{stories:2, panels:4, missing:[1,2]}` (two middles). Query face: "beginning middle end".

**(e) F5 Sequencing Sentences — G1, `mode:'sentences'`.** Visual delta: ONE story on a vertical banner string (cards stacked down the left, pegged on their left edge) matched by lines to four sentence cards on the right. **Deliberate inversion of the pedagogy's layout: the PICTURES are scrambled and the SENTENCES are in story order** (First / Then / Next / At the end). With pictures in order and sentences scrambled, the temporal word alone solves the match (First → top card) without reading the rest; inverted, the order words carry no position information and the child must READ the content to find the picture. Layout: string x 6, cards 132 at x 16-148, line zone 80, sentence cards w 404 (148 + 80 + 404 = 632), 4 rows × 132 + 3 × 16 = **576 ≤ 677**. Config d2 `{mode:'sentences', stories:1, panels:4, size:132, cardsOrder:'deranged', sentencesOrder:'story'}`; d1 `{panels:3, size:160}`; d3 `{panels:5, size:104}` (five-step stories). Verify: each sentence id = `<story>.<step>`, one per card, derangement of the cards; the panel's lint checks no sentence fits two panels (each names the state part that changed). Query face: "sequencing sentences".

**(f) F6 Retell the Story — G2, `mode:'retell'`.** Visual delta: one story IN ORDER on the vertical banner string, each card followed by two school-ruled writing rows, the first starting with a printed temporal starter; the page is half picture, half writing. Layout: cards 128 at x 16-144; ruling w = 639 − 160 = 479, `rulingBlock({rows:2, w:479, h:52, glyphH:24, starters:{0:starter[k]}, gap:8})` = 112; row = max(128, 112) = 128; 4 rows + 3 × 18 = **566**. Open-ended: no `verify()` of writing; config + starter checks (`verify-ruling-starters.js` discovers the surface). Config d2 `{mode:'retell', stories:1, panels:4, size:128, rows:2, glyphH:24}`; d1 `{panels:3, rows:1, glyphH:32}`; d3 `{panels:4, rows:3, glyphH:22 → refused: below the G2 floor 24, so d3 = rows 2 with a fifth card}`. Query face: "retell a story / write the story" (de Bildergeschichte schreiben).

**Why these five:** each changes what the child DOES (circle a word / predict / draw / read-and-match / write) and the apparatus that shows it (chip stack / tray / empty card / vertical string + sentences / ruled rows), while the washing line keeps the family recognisable. **First to cut:** F2 (b), if a critic judges three temporal chips under three cards too close to the base's numerals (it is the only face whose answer is still an ORDER label); F3 and F6 carry the most distinct query faces.

Hub contract (every face): `apps['story-sequencing']` + `axes['exercise-type']['story-sequencing']` slug + name ×11, one landing per face per locale with `coordinate.type === 'story-sequencing'`, `coordinate.mode` = the face's mode (`'base'` for the base), `theme:''`, level key from the band table, `canonicalDeckSlug` = the deck; gate `scripts/verify-hub-type-rows.js` (6 rows per locale, no refusal expected).

## 8 Two alternatives + recommendation

1. **Filmstrip** (panels as frames on a strip with sprocket holes top and bottom). Strong "sequence" signal, but the sprocket bands are 2 × 14 px of dark pattern per row (ink-heavy, dominant in greyscale print), the metaphor belongs to adults (a five-year-old in 2026 has never seen film), and frames touching edge-to-edge read as ALREADY in order: the strip argues against the scramble.
2. **Picture-book spread** (an open book, two pages, 2 × 2 panels per spread). Warm and on-genre, but a 2 × 2 grid has two reading orders (row-first vs column-first) so the page itself would create a second legal order for the numerals; the gutter eats 20-30 px; only one story fits.

**Recommendation: the washing line.** It is the only one of the three that is a real classroom routine for exactly this skill, separates two stories without labels, keeps left-to-right as the single reading axis, prints light (teal cord, white pegs), and gives every face a natural variant (a query peg at the cord's end, an empty card waiting on its pegs, a vertical banner string for writing pages).

## 9 Risks, mitigations, print check

- **Greyscale:** the soft trio (creamDeep / tealSoft / coralSoft) is ~indistinguishable in grey; mitigated by the greyscale rule in §5 (states are outlines, counts, sizes or strong fills: fence stripes, bites as white discs with teal arcs, flames coral with teal detail, smoke `grid`). Gate: render `grayscale(1)`, assert each adjacent pair of shown panels differs by ≥ 1 % of panel pixels at ΔL ≥ 20 inside the clip. Coral vs teal on B&W: coral prints ≈ 60 % grey, teal ≈ 40 %; coral is never the only difference (every coral part is also a shape).
- **Small sizes:** F3 at 92 is the smallest; `MIN_SIZE 90` throws below; the 5-unit state-part floor gives ≥ 4.6 px there. The gate renders every (story, step) at 90 and 144 and asserts no part < 4 px bbox.
- **Positional tells:** measured over 200 seeds per face (first-card slot, last-card slot, F3 correct-choice slot, F5 card order), both directions, and on the shipped seed; the sag of the cord is identical for every page (not a cue).
- **One legal order:** computed by the `mono` permutation gate (§4) + the pedagogy panel's human read; dropping, not rewording.
- **Long locales:** chips capped by a measured max-content check that REFUSES (throws) rather than shrinks below 18 px; F5 sentences 2 lines max, lint on `scrollHeight`; F6 starters sized from `font-metrics.json`, never derived.
- **Pencil space:** tags 64 × 56 (K numeral ≥ 30 px); F4 draw card 236 × 170; F6 rows 52 high with glyphH 24.
- **Cut lines:** none; nothing is cut (the washing line is drawn, not assembled). Teachers who want the classroom routine can cut the base cards out along the teal frames, which is why every card has a full frame and 20 px gutters, but the sheet never asks for it (no "cut" in any instruction).
- **Lints catch:** overflow, footer intrusion, 9 px floor, palette (the cord, pegs and panels use tokens only), blank page (`data-ws-content`). **Only a human eye catches:** whether a panel reads as the intended state at arm's length (a limp balloon vs a pebble; a folded sheet vs an envelope), whether a snowman without a face still reads as a snowman, and whether a child can SAY what changed. The panel review of the 13 × up-to-5 render sheet at 144 and 92 px is the gate for that.

## 10 Summary

1. Concept: each story hangs on its own sagging washing line; four square drawn cards pegged in a scrambled order; the child writes 1-4 on dashed tags dangling under the cards.
2. Base d2: 2 lines × 4 cards 144 px, row 236, body 508 of 722 (fits the 677 fi case), no printed text in the body.
3. NEW `primitives/story-panel.js`: 100-unit square, teal 3 px frame, constant-px strokes, ~45 reusable parts, 13 stories (+1 reserve), states carried by outlines/counts/size so greyscale holds; no text, no faces, MIN_SIZE 90.
4. One legal order is COMPUTED (declared one-way `mono` features, permutation gate) and scrambles are derangements balanced over seeds.
5. Five CODE faces: chip stacks (first/next/last), in-order line + tray (what next, incl. a backwards distractor), empty middle card (draw), vertical string + in-order sentences (read), string + ruled starter rows (retell).
