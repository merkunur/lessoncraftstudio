# Row 40 — The Number Post Box (K.G.B.4)

## 0. Identity
- id `choice-board.count-sides.k-g-b-4` (KEPT; slugs, titles and intros frozen en..fi) · grade K · CCSS K.G.B.4 · strand Geometry · new own files `post-box-core.js`, `post-box-activity.js`, `post-box-activity.html`, `post-box-activities.json` (the row leaves `choice-board-activities.json`).
- Worksheets covered: K-075 Count the Sides (Count mode) · K-076 Sort by Sides + G2-241 Shape Sorter (Sort mode) · G1-381 2D Shapes: Real or Not? (Real mode, level "first") · G1-383 2D Shape Riddles (Real mode, level "more") · G1-382 Write the Names (Name mode: the doors carry shape NAMES instead of numerals — the child reads the name and posts the shape it names; the name IS content there, and the sticks still decide).
- Old activity: one library shape picture (triangle, square, pentagon, hexagon — always upright, always regular) and four number tiles; 4 rounds. **Kept:** those four shapes and their side counts are rounds 1, 3, 4 and 6 of Count mode; the number-tile idea survives as the numeral on each door. **Dropped:** upright-only regular shapes (they teach "a triangle points up") and the guessable 1-of-4 tile tap.

## 1. The pitch
"It's a shape-sorter toy where the slots are NUMBERS, not shapes — and a door only opens when its sticks can lie one on each side."

## 2. Why a child will want it again
Every child has pushed a block into a shape-sorter. Here the box is a bright red post box with numbered doors, and the shapes are flat coloured tiles that can be picked up, spun and posted. The surprise is the door: when a shape is offered, the door's sticks jump out and lay themselves along the shape's sides, *clack, clack, clack* — and the child watches whether they fit. A fit swallows the shape with a satisfying *thunk*; it slides down a little chute into the see-through drawer at the bottom of the box, where posted shapes pile up in colour. An open "shape" with a gap falls apart into loose sticks at the door. A shape with a curved side makes the straight stick rock like a seesaw and slide off. At the end of a round the drawer pops open and the posted shapes fan out with their names on little plates. Between rounds the child can pull any shape out of the drawer, spin it and post it again just to hear the thunk.

## 3. The skill and the misconception
- **Skill (K.G.B.4):** analyse 2D shapes by their parts — count the sides (and corners) whatever the size or the turn; sort shapes by number of sides; know a shape by its defining attributes (closed, straight sides, how many, for squares and rectangles the corners and lengths) and by its name.
- **Misconceptions the box pushes back on, by mechanism (never by a message):**
  1. *"A shape is what it looks like upright"* (a tilted square is "a diamond", a triangle must point up). Every shape after round 1 arrives turned, stretched or irregular; all the door mouths behind the flaps are the same round hole, so matching outlines is useless — only the count opens a door.
  2. *Double-counting or skipping a side.* When a door's sticks lie down there is exactly one stick per side: a door with too many sticks leaves one stick with nowhere to go (it tumbles off and rolls on the floor); a door with too few leaves a bare side that glows. The mismatch is seen.
  3. *"An open figure or a curvy figure is still a triangle."* In Real mode the sticks reveal it: an open figure has no closed loop to hold its sticks, so it collapses into a heap of loose sticks; a curved side cannot take a straight stick (the stick rocks twice and slides off).
  4. *"A long thin rectangle is a square" / "any four-sided shape is a rectangle".* The square door's four sticks are all one length: laid on a long rectangle, two sticks leave gaps at both ends and two overhang the corners. The rectangle door's sticks are two PAIRS — each stick the same length as the one opposite it — plus little square-corner marks: on a rhombus the marks cannot sit flat in the corners and tip over; on a trapezoid the opposite sticks do not match. ⚠ Mathematically a square fits the rectangle door (opposite sides equal, four square corners) and the door lets it in — the apparatus never teaches a falsehood. One-right-answer is kept by the ROUND TABLES instead: no round ever offers a square where a rectangle door could also take it (Real rectangle rounds contain no square; Name rounds never show the square and rectangle doors together).

## 4. The stage
**Layout: stacked at every width** (layout check 2026-10-17: no `layout:'split'` — its stage column is only ≈ 370 px at 704, too narrow for this apparatus). The stage takes the full card width, ≈ 648 px at 704 (≈ 656 at 1024); whatever §4 places in a left, right, side or bubble column stays side by side inside the stage when the activity draws it, while the shell's bubble, keypad and Check sit under the stage. Sizes written for a wider stage fit the 648 px by closing margins and gaps first; no picture drops below 96 px, no tap below 44, no data mark or grid cell below 40.

**At 704 px** (stage 460 × 440):
- **The work mat** (top 230 px): a cream rounded rectangle with a faint dot grid. Count mode: one shape tile centred, 150–190 px across (drawn polygon, 3 px ink outline, flat fill from the shell palette chosen by round index — never by side count). Sort / Real: a **tray** of 5–6 tiles, each 96–110 px across, two rows of three.
- **The post box** (bottom 200 px): red box 440 × 190, rounded top, a little brass slot-lip on each door. Its front carries 4 doors (6 at Count level "more"), each 96 × 120: a hinged flap showing a big **numeral** (36 px, white on teal), under it that many **sticks** in a row (22 × 6 px, rounded ends) and that many **corner dots** (6 px). Doors stand in numeral order left → right.
- **The drawer:** a clear strip across the box bottom (24 px) where posted shapes stack as mini tiles (28 px).
- **Counting pegs** (Count mode): little peg flags (14 px circle on a 16 px pin, numeral 12 px) planted on side midpoints.
- **Real mode:** the box has **one** big door (180 × 150) whose flap shows the target's defining parts: triangle = 3 sticks of mixed length + 3 dots; square = 4 equal sticks + 4 square-corner marks; rectangle = 2 matched pairs of sticks (each pair one colour) + 4 square-corner marks. The riddle level shows the same flap; the task line carries the clue.
**Name mode:** 3 doors (104 × 120 at 704; 96 × 104 at 360 in one row) whose flaps show a shape NAME in the page locale (20 px Nunito bold, ≤ 2 lines, the longest name measured per locale — fi *kahdeksankulmio* does not occur in Name mode; the longest used, fi *suorakulmio* / de *Sechseck*, fits 96 px at 18 px) and, under it, that shape's sticks. A tray of 5 tiles. The words are the content of this mode only.

**At 360 px** (stage 336 wide): mat 336 × 200 (Count shape 130–150 px; tray tiles 84 px in a 3 × 2 grid); post box 336 × 150 with 4 doors of 76 × 104 (numeral 30 px, sticks 16 px); at level "more" 6 doors in a 3 × 2 grid of 104 × 70 (numeral 26 px, sticks 12 px). Bubble under the box. At 320: tray tiles 76 px, doors 70 px wide.

**Task line** (≤ 24 px, ≤ 2 lines) — see §9.

No words on the apparatus: numerals, sticks and dots only. Shape names appear only on the drawer's name plates at the end of a round. No library pictures: every element is drawn apparatus geometry.

## 5. The hand
- **Pick up a tile** (pointerdown): it lifts 6 px with a shadow (< 50 ms) and follows the finger. **Tap-tap** also works: tap a tile (it lifts and pulses), tap a door.
- **Spin**: double-tap a tile (or the small round-arrow knob on its corner, 44 px) → it turns 45° (180 ms ease-out). Pure play: turning never changes the answer — and shows it.
- **Plant a peg** (Count mode): tap a side → a peg with the next number pops onto that side's midpoint (120 ms bounce, soft tick). Tap a pegged side → only the LAST peg lifts (undo); any other peg wiggles (already counted). Pegs are optional, never required.
- **Offer a shape to a door** (drop on / tap a door): the flap swings open 30° (150 ms) and its sticks fly to the shape (90 ms each, staggered 70 ms) and lie one per side, clockwise from the side nearest the door:
  - **Fit** (sticks = sides, closed, straight, and in Real mode the lengths/corners match): each stick clicks onto its side, the flap opens fully, the shape shrinks into the mouth (*thunk*, 260 ms) and slides into the drawer. The numeral flashes once.
  - **Too many sticks:** the extra stick tumbles off, bounces on the stage floor and rolls back into the flap (600 ms); the shape slides back to its spot.
  - **Too few sticks:** all sticks are used; each side without a stick glows coral for 700 ms; the sticks fly home; the shape slides back.
  - **Real-mode near-misses:** *open* — the shape's sides fall apart into a loose heap at the door, then reassemble on the tray (900 ms); *curved side* — the straight stick rocks on the curve twice and slides off; *lengths* (long rectangle at the square door) — the equal sticks lie on, two leave blinking gaps at both ends, two overhang the corners; *corners* (rhombus at a square/rectangle door) — the square-corner marks tip over in the slanted corners.
- Every offer is free (the box is the feedback). Check closes the round (§7).
- **Free play:** between rounds posted shapes can be dragged out of the drawer, spun and posted again.
- Sound (optional): wooden clacks for sticks, a hollow thunk for a post, a little tumble for a dropped stick; TTS speaks the numeral on a door tap ("four") and each name plate at the end.
- **Honest note on trying doors (Count mode).** A bounce costs nothing, so a child CAN try doors until one fits. That is allowed on purpose and is not a "solve by guessing" hole: every failed offer lays one stick per side and SHOWS the difference (one stick left over, or one side bare), so even a trying child is shown the count each time. The prose never claims the count "has to be counted first"; the help ladder brings the pegs after two bounces.

## 6. The rounds
**Shape catalogue** (vertices on a 100 × 100 grid; drawn at the round's turn):
T1 equilateral triangle · T2 right triangle (0,0)(80,0)(0,60) · T3 skinny triangle (0,40)(100,30)(0,60) · T4 scalene (0,0)(100,20)(30,70) · Q1 square · Q2 long rectangle 100 × 36 · Q3 trapezoid (20,0)(80,0)(100,60)(0,60) · Q4 rhombus (50,0)(90,50)(50,100)(10,50) · Q6 rectangle 100 × 60 · Q5 irregular quadrilateral (0,10)(70,0)(100,80)(20,60) · P1 regular pentagon · P2 "house" pentagon (0,40)(50,0)(100,40)(100,100)(0,100) · P3 irregular pentagon (0,30)(40,0)(100,20)(90,90)(15,80) · H1 regular hexagon · H2 long hexagon (0,30)(20,0)(80,0)(100,30)(80,60)(20,60) · S7 regular heptagon · S7b irregular convex heptagon · O8 regular octagon · O8b stretched octagon (O8 scaled 1.5 × 1).
Near-misses (Real mode only): N-open3 (triangle with a 12-unit gap at one corner) · N-curve3 (two straight sides + one arc) · N-4for3 (a quadrilateral in a triangle round) · N-open4 · N-curve4 (a square with one bulging side) · N-long (Q2 in a square round) · N-skew (Q4 rhombus in a square/rectangle round) · N-5for4 (P2 in a square/rectangle round).

**Count mode, level "first shapes"** (doors 3 4 5 6):
| # | shape | turn ° | answer |
|---|---|---|---|
| 1 | T1 | 0 | 3 |
| 2 | Q2 | 20 | 4 |
| 3 | P1 | 36 | 5 |
| 4 | H1 | 30 | 6 |
| 5 | T3 | 90 | 3 |
| 6 | Q1 | 45 | 4 |
| 7 | P2 | 180 | 5 |
| 8 | H2 | 15 | 6 |
| 9 | Q3 | 160 | 4 |
Answers 3 ×2, 4 ×3, 5 ×2, 6 ×2.

**Count mode, level "more shapes"** (doors 3 4 5 6 7 8):
| # | shape | turn ° | answer |
|---|---|---|---|
| 1 | T4 | 25 | 3 |
| 2 | Q4 | 0 | 4 |
| 3 | P3 | 200 | 5 |
| 4 | O8 | 22 | 8 |
| 5 | S7 | 10 | 7 |
| 6 | H2 | 75 | 6 |
| 7 | Q5 | 300 | 4 |
| 8 | S7b | 140 | 7 |
| 9 | O8b | 60 | 8 |

**Sort mode** (6 tiles, 3 doors, two tiles per door; turns seeded per pass, no two equal turns on one tray):
| # | doors | tiles |
|---|---|---|
| 1 | 3 4 5 | T1 T2 Q1 Q3 P1 P2 |
| 2 | 4 5 6 | Q2 Q4 P3 P1 H1 H2 |
| 3 | 3 4 6 | T3 T4 Q5 Q1 H2 H1 |
| 4 | 3 5 6 | T2 T1 P2 P3 H1 H2 |
| 5 | 3 4 5 | T4 T3 Q4 Q2 P3 P2 |
| 6 | 4 5 6 | Q3 Q5 P1 P2 H2 H1 |
| 7 | 3 4 6 | T1 T3 Q2 Q4 H1 H2 |
| 8 | 3 5 6 | T4 T2 P1 P3 H2 H1 |
| 9 | 3 4 5 | T3 T1 Q5 Q3 P2 P1 |
Level "more": a fourth door and two more tiles each round — rounds 1, 5, 9 add door 6 (H1, H2); rounds 2, 6 add door 7 (S7, S7b); rounds 3, 7 add door 5 (P1, P3); rounds 4, 8 add door 8 (O8, O8b). Every door is an answer in every round.

**Real-or-not mode** (5 tiles):
| # | target | real tiles | near-misses |
|---|---|---|---|
| 1 | triangle | T1 (150°), T3 | N-open3, N-curve3, N-4for3 |
| 2 | square | Q1 (45°) | N-long, N-curve4, N-open4, N-skew |
| 3 | rectangle | Q2 (0°), Q6 (70°) | N-skew, N-curve4, N-open4 |
| 4 | triangle | T2, T4, T3 (200°) | N-open3, N-4for3 |
| 5 | square | Q1 (0°), Q1 (20°) | N-long, N-skew, N-open4 |
| 6 | rectangle | Q6 (110°) | N-open4, N-curve4, N-skew, N-5for4 |
| 7 | triangle | T4 (90°) | N-curve3, N-open3, N-4for3, N-5for4 |
| 8 | square | Q1 (70°), Q1 (10°), Q1 (45°) | N-long, N-curve4 |
| 9 | rectangle | Q2 (30°), Q6 (160°) | N-skew, N-open4, N-curve4 |
Rectangle rounds never contain a square and square rounds never contain a non-square rectangle as real — one right set per round (the "a square is also a rectangle" conversation stays with the teacher; the prose says so). Real count 1–3 per round (as G1-381). Level "more" asks the same rounds by riddle (§9) and adds one N-curve near-miss.

**Name mode** (3 named doors, 5 tiles; door order left → right is a per-pass seeded shuffle; never the square and rectangle doors together):
| # | doors | tiles (each fits exactly one door) |
|---|---|---|
| 1 | triangle · square · pentagon | T1 (150°), T3, Q1 (45°), P1, P2 |
| 2 | rectangle · triangle · hexagon | Q2, Q6 (30°), T4, H1, H2 |
| 3 | square · hexagon · pentagon | Q1, Q1 (20°), H2 (75°), P3, P1 (36°) |
| 4 | triangle · rectangle · pentagon | T2, Q6, Q2 (110°), P2 (180°), T3 (90°) |
| 5 | hexagon · square · triangle | H1 (30°), Q1 (70°), T4, T1, H2 |
| 6 | pentagon · rectangle · hexagon | P1, P3 (200°), Q2 (160°), H1, Q6 |
| 7 | square · triangle · hexagon | Q1 (45°), T3, T2 (200°), H2, Q1 |
| 8 | rectangle · pentagon · triangle | Q6 (70°), P2, T1, Q2, P3 |
| 9 | hexagon · square · pentagon | H2 (15°), H1, Q1 (10°), P1 (36°), P2 |
Level "more" adds a 4th door (trapezoid, rhombus, heptagon or octagon by round) and its two tiles; Q4 rhombus never stands beside an open square door (it is refused by the square-corner marks there, so it would be a near-miss, not a second answer). Every door is an answer in every round.

- **Answer position:** Count doors are in numeral order and every door is present every round, so a door's place equals its number — position carries no clue that the count does not. Sort/Real tiles are dealt into tray slots by a seeded per-pass shuffle; the gate measures over 1,000 passes that each tray slot holds a real tile (Real) or each door's tile (Sort) within ±5 % of uniform, and that two consecutive rounds never share an arrangement.
- **Order:** order-only reshuffle per pass (`nextTask`), pass 2 ≠ pass 1, same set.

## 7. Check, the misses, the success
Count mode: a fit ends the round by itself (the post IS the answer). Sort/Real: Check is pressed when the child thinks the tray is done.
- **Check with nothing done** → hint, no miss: "Pick up the shape and try a door." (Sort/Real: "Pick up a shape and try a door.")
- **Count mode** — offers are free bounces; the help ladder counts bounces:
  - **miss 1 (2nd bounce):** every side of the shape gets a faint tick and every corner a faint dot, so the parts to count stand out · "Count each side once. The pegs can help."
  - **miss 2 (4th bounce):** the pegs plant themselves one by one (400 ms each) and stop on the last; the door with that numeral breathes · "The last peg tells how many sides."
- **Sort/Real Check with work left** (a real tile still on the tray, an unposted tile):
  - **miss 1:** every remaining real/unposted tile lifts 4 px and wobbles once · "Some shapes still fit through a door."
  - **miss 2:** on each remaining tile its sides get ticks and corners dots and the right door's sticks hover above it · "Count the sides of the shapes that wobble."
- A new move takes the help away until the next Check.
- **Success:** the drawer slides open, the round's posted shapes fan out on the mat with a name plate under each (word in the page locale) and the doors' numerals ring in order. Bubble: Count — "Yes! {n} sides — {shapePhrase}." Sort — "Every shape found its door." Real — "All real {shapePlural}: closed, straight sides, {n} corners."

## 8. Settings
1. **Mode:** count the sides / sort by sides / real or not / name the doors — at rest: one shape + 4 numbered doors · a tray of 6 + 3 numbered doors · a tray of 5 + one big door · a tray of 5 + 3 named doors.
2. **Shapes:** first shapes / more shapes — Count: doors 3–6 → 3–8; Sort: 3 doors → 4; Real: by name → by riddle; Name: 3 doors → 4.

## 9. Words (EN source)
- title (frozen) "Count the Sides — Kindergarten Geometry" · instruction "Count the sides of the shape, then post it through the door with that number."
- promptName "Read each door. Post every shape through the door with its name." · celebrateName "Every shape went through its name."
- promptCount "How many sides? Post the shape through its door." · promptSort "Post each shape through the door with its number of sides." · promptReal "Post every real {shape}." · promptRiddle3 "Post every shape with 3 straight sides and 3 corners." · promptRiddleSquare "Post every shape with 4 sides all the same length and 4 square corners." · promptRiddleRect "Post every shape with 2 long sides, 2 short sides and 4 square corners."
- hintStart "Pick up the shape and try a door." · hintStartTray "Pick up a shape and try a door." · hintCount1 "Count each side once. The pegs can help." · hintCount2 "The last peg tells how many sides." · hintTray1 "Some shapes still fit through a door." · hintTray2 "Count the sides of the shapes that wobble."
- celebrateCount "Yes! {n} sides — {shapePhrase}." · celebrateSort "Every shape found its door." · celebrateReal "All real {shapePlural}: closed, straight sides, {n} corners."
- shapePhrase / name plates (full phrase per shape per locale, never assembled): "it's a triangle", square, rectangle, pentagon, hexagon, heptagon, octagon, trapezoid, rhombus; Q5/P3/S7b plates read the count only ("4 sides", "5 sides", "7 sides") because they have no K name.
- settings: setMode "Mode" · modeCount "Count the sides" · modeSort "Sort by sides" · modeReal "Real or not" · modeName "Name the doors" · setShapes "Shapes" · shapesFirst "First shapes" · shapesMore "More shapes".
- aria: door "Door {n}: {n} sides" · tile "Shape {i} of {total}" · side "Side {i}" · result lines ("{a} sticks, {b} sides — one side has no stick").
- **Locale traps:** de *Seite* (school term for a polygon side; OK), fr *côté* (not *face*), nl *zijde* (school) not *kant*, fi *sivu* with partitive after numerals ("kolme sivua", "neljä kulmaa"); every {n} phrase is plural (n ≥ 3) except fi partitive singular — store whole prompt strings per n, never a plural suffix. Shape names: de *Dreieck, Quadrat, Rechteck, Fünfeck, Sechseck, Siebeneck, Achteck, Trapez, Raute*; fr *triangle, carré, rectangle, pentagone, hexagone, heptagone, octogone, trapèze, losange*; nl *driehoek, vierkant, rechthoek, vijfhoek, zeshoek, zevenhoek, achthoek, trapezium, ruit*; sv *triangel, kvadrat, rektangel, femhörning, sexhörning, sjuhörning, åttahörning, parallelltrapets, romb*; fi *kolmio, neliö, suorakulmio, viisikulmio, kuusikulmio, seitsenkulmio, kahdeksankulmio, puolisuunnikas, neljäkäs*. en "trapezoid" is US (UK "trapezium" means the opposite in some uses) — source is en-US. "Square corner" for K: de "rechte Ecke", fr "angle droit", sv "rät vinkel"; native reviewer confirms the K register. Articles live inside each shapePhrase (de "ein Dreieck / ein Quadrat", fr "un triangle / un carré", it "un triangolo / un quadrato", es "un triángulo / un cuadrado", pt "um triângulo / um quadrado").

## 10. Sound off, access, phones
- Legible with sound off: stick fits, the tumbling extra stick, glowing bare sides, the collapsing heap are all visual; numerals 26–36 px.
- Keyboard: Tab to a tile, Enter lifts it, Tab to a door, Enter offers; in Count mode arrow keys walk the sides, Space plants a peg, Backspace lifts the last; R spins the tile.
- aria-live bubble announces each offer's result.
- Taps: tiles ≥ 76 px; doors ≥ 70 × 70; side hit zones 44 px wide along each side; Count shapes ≥ 130 px so the octagon side is ≥ 50 px.
- Check above the fold: at 360 the stage is 200 + 150 + 12 = 362 px; with header 56 and task line 52 the Check sits at ≈ 520 px (fold 740); at 320 × 640 ≈ 500 px.

## 11. Distinct from
- Old count-sides card tap — replaced.
- Tools `shape-stretcher` (tags on a stretched shape) and `sorting-hoops` (hidden-rule hoops): neither posts shapes nor lays sticks side-by-side.
- #212 Geoboard Band (same batch) BUILDS a shape peg to peg; this ANALYSES given shapes by correspondence. #1 / #9 count objects; here the count is sticks ↔ sides.
- No registry mechanic reused.

## 12. Build plan
- **Core state** `{mode, level, roundIdx, tiles:[{id, verts, turn, posted}], doors:[n…], pegs:[sideIdx…], bounces, help}`. Functions: `sidesOf(verts)` (corners after merging collinear vertices; null for open/curved), `isClosed`, `hasCurve`, `matchesTarget(tile, target)`, `offer(tileId, door) → {result:'fit'|'tooMany'|'tooFew'|'open'|'curve'|'lengths'|'corners', diff, bareSides}`, `plantPeg(side)`, `liftPeg()`, `check()`, `helpLevel()`, `hintKey()`, `layout(width)`.
- **Gate's own truth (verify):** every catalogue polygon's side count recomputed independently (turn angle ≠ 0 ± 1e-6); every door set contains the round's answer; every Real round's real set = tiles closed, straight, matching the target (square: 4 equal sides + 4 right angles; rectangle: 4 right angles, unequal sides); no square in rectangle rounds; tooMany/tooFew diff = |door − sides|; pegs ≤ sides; slot uniformity ±5 % over 1,000 passes; drawn side ≥ 44 px at every width; ≥ 9 rounds per mode × level; no 0 anywhere; prose cites only shapes the rounds show.
- **Name mode truth:** every Name round has exactly one door per tile (computed by the gate's own classifier: square = 4 equal sides + 4 right angles; rectangle = opposite sides equal + 4 right angles; a square tile is never in a round with a rectangle door, nor a rectangle door with a square door); each door named in the round's locale string exists ×11.
- **Mutations (one per rule):** square refused at the rectangle door (lengths rule wrongly applied) · square and rectangle doors dealt together in a Name round · fit when door = sides + 1 · collinear vertex counted as a corner · open shape posted · curved side posted · long rectangle posted at the square door · rhombus posted at the rectangle door · peg planted on a pegged side · non-last peg lifted · tray not shuffled · help kept after a new move · Check with nothing counts a miss · round 6 square drawn at 0° · doors not in numeral order.
- **Pictures:** none.
- **Risks:** side hit zones on the heptagon/octagon at 320 (shape ≥ 140 px there); the rocking-stick animation must read at 360. Not blocked.

## 13. The four questions
1. **Would a child choose it again?** Yes — a shape-sorter toy with clacking sticks, a thunking post box and a drawer filling with colour.
2. **Would a teacher put it on the board?** Yes — the door's sticks enact the one-to-one correspondence between sides and count; turned and irregular shapes kill "looks like"; Real mode shows WHY a figure is not a shape.
3. **Would a parent trust it?** Calm, wordless apparatus, nothing drawn by hand, no score or timer.
4. **The invention:** a post box whose doors are numbers, and whose sticks must lie one on each side before the shape goes in.

## 14. Critic review (2026-10-17)
Scores before → after: invention 5→5 · fun 4→5 · completeness 4→5 · correctness 3→5 · distinctness 5→5 · reality 5→5
What changed:
- **Correctness:** the rectangle door no longer carries "2 long + 2 short sticks" — that door would have refused a square, teaching that a square is not a rectangle. It now carries two matched PAIRS of sticks and the square-corner marks, so it lets a square in, which is true. "One right answer" is kept by the round tables, not by a false door.
- **Coverage:** G1-382 "Write the Names" was covered only by name plates the child never acts on. Added a fourth mode, **Name the doors**: three doors carry shape names, and the sticks still decide. It has 9 rounds, level "more" adds a 4th door, the square and rectangle doors are never dealt together, and there are new strings, gate truths and mutations.
- Real mode used only one rectangle (100 × 36), so "rectangle" could come to mean "long and thin". Added Q6 (100 × 60) to rounds 3, 6 and 9.
- Added an honest note: trying doors in Count mode is allowed, and every failed offer still shows the difference stick by stick. The prose must never claim the count has to be read first. This is the #22 Nesting Pots reviewer lesson.
- **Fun:** the box already had a toy's feel (clack, thunk, the drawer). The Name doors add a reading reason to come back.
- Layout check (2026-10-17): switched to stacked — split stage column is ~370 px at 704.
