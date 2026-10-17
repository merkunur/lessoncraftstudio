# Row 172 — Make Thirds: THE RAIN TABLE — put up walls, let it rain, and equal parts fill their tubes to the same height (2.G.A.3)

## 0. Identity
- id `fractions.partition-thirds.2-g-a-3` (KEPT; slugs, titles, intros frozen in all 11 locales) · grade 2 · CCSS 2.G.A.3 · strand Geometry.
- own files at rebuild (the row leaves the shared fractions engine; `fractions-activities.json` keeps row 108): `rain-table-core.js`, `rain-table-activity.js`, `rain-table-activity.html`, `rain-table-activities.json`. 0 lines to `fractions-core.js`, `lcs-shell.*` or any shared core.
- page title (frozen): "Make Thirds — Partition Shapes into 3 Equal Parts (Grade 2)"; intro (frozen): "tap to cut circles, squares and rectangles into 3 equal parts — thirds." — kept: the child taps to make the partition (now by tapping notches and pegs to put up walls), thirds is the default and every listed shape is in the rounds.
- worksheets it covers (shared with row 171; this row carries the MAKING faces): **G2-229** Thirds and Quarters ("colour the fraction of each shape" — make the parts, then colour: thirds 1/3, 2/3; fourths 1/4–3/4) · **G2-228** Half and Half (halves setting + colour one half) · **G2-234** Cut It Right (partition into the named number of equal parts) · **G2-232/G3-343** Fair Shares / Equal Pieces (the rain proves equal vs unequal on the child's own cuts) · **G2-230/G2-231** read the made shape as its fraction (the colour step's celebration names it).
- old activity: dotted candidate cut-lines (the exact right lines plus one off-centre decoy) on 7 shapes — circle, triangle, hexagon, square, rectangle, "diamond" (a square turned 45°), ellipse; tap the right lines. **Kept:** all 7 old shapes and their exact thirds constructions (circle radii 90/210/330; triangle centroid→vertices; hexagon centre→alternate vertices; square/rect strips at 1/3, 2/3; turned square strips parallel to an edge at ±R/3; ellipse spokes at parametric 90/210/330), the tap verb, thirds as the default. **Changed:** the child is no longer offered just the right lines plus one decoy: every shape has a full set of notches and pegs, so wrong partitions (strips parallel to a triangle's base, a "peace sign" in a circle, uneven strips) can be built — and the rain shows why they are wrong. The "diamond" is called what it is: a square (PICTURE-RULINGS: never anything but a square). **Dropped:** nothing.

## 1. The pitch
"The shape is a little rain table: put up walls to split it into parts, then let the cloud rain evenly over it — each part drains into its own glass tube, so equal parts fill their tubes to exactly the same height, and a bigger part always catches more rain."

## 2. Why a child will want it again
- **It rains on the table.** Tap the cloud's string and a fat little cloud drifts over the table and rains — gentle pattering drops, tiny splashes. Every child wants to make it rain again.
- **The tubes fill up.** Under the table stand three glass tubes (two for halves, four for fourths). Each part of the table drains through its own spout into its own tube, *glug glug*, and the water climbs. Equal parts → the three water levels line up exactly with the gold line, and a rainbow arcs over the table. Unequal → one tube overflows, one stays low. Nobody has to explain it.
- **Walls you build.** Tapping a notch on the table's edge drops a wall straight across; tapping a peg on the rim swings a wall in from the centre pin. It feels like building a little sandpit dam.
- **The surprise round.** Three walls from the middle of a square to strange-looking places — three pieces that look nothing alike — and the three tubes fill to the very same line. "They're thirds?!" Yes.
- **Earned show per round:** on equal parts, the rainbow arcs over, the three tubes play a soft chord (do-mi-sol, one note each as its water touches the gold line), and in colour rounds the coloured parts' tubes turn coral. No timer, score, streak or lives.
- **Free play:** after the round the child may rebuild walls any way and rain again (the tubes empty with a drain-plug *gloop*).

## 3. The skill and the misconception
- **Skill (2.G.A.3 + the worksheets):** partition circles, rectangles, squares (and triangles, hexagons, ovals) into 2, 3 or 4 equal shares; describe a share as a half, a third, a fourth and the whole as two halves, three thirds, four fourths; recognise that equal shares need not have the same shape; colour a named fraction (1/2, 1/3, 2/3, 1/4, 2/4, 3/4) of a partitioned shape.
- **Misconceptions and the push-back:**
  1. **Thirds of a triangle by two strips parallel to the base** (equal heights, unequal areas — the classic): the tubes fill 1 : 3 : 5. The tip part catches a trickle; the bottom part overflows.
  2. **The "peace sign" in a circle** (one diameter + one radius = three parts, so "thirds"): tubes fill 2 : 1 : 1 — against the thirds gold line the half reaches 1.5 × the line and spills, the two quarters stop at three-quarters of the line (measured: 50 % / 25 % / 25 % of the table against 33.3 %).
  3. **"Equal parts must look the same":** the square hub round makes three non-matching pieces that fill three tubes to the same line.
  4. **Strips spaced by eye:** straight walls snap to twelfths, so a wrong strip on a square or rectangle is at least 1/12 of the whole off — a quarter of a third, a difference the tubes show plainly (and §6 removes the only near-misses, which came from mixing straight walls with centre walls).
  5. **Wrong number of parts** (three walls across a rectangle for thirds): there are only three tubes; the fourth part's water runs off the table into the puddle tray. Two parts leave a tube dry.
  6. **"The coloured part is the fraction" without equal parts** (colour step): the colour step only opens on equal parts; then coloured tubes show k of n equal amounts.

## 4. The stage
**Layout: stacked at every width** (layout check 2026-10-17: no `layout:'split'` — its stage column is only ≈ 370 px at 704, too narrow for this apparatus). The stage takes the full card width, ≈ 648 px at 704 (≈ 656 at 1024); whatever §4 places in a left, right, side or bubble column stays side by side inside the stage when the activity draws it, while the shell's bubble, keypad and Check sit under the stage. Sizes written for a wider stage fit the 648 px by closing margins and gaps first; no picture drops below 96 px, no tap below 44, no data mark or grid cell below 40.

**At 704 — stacked layout:**
- **Task line** (20 px, ≤ 2 lines).
- **The table** (left, 380 × 380): a wooden tray rim (6 px, warm sand #E9D3A8) holding the shape's surface (pale teal #CFE7E2, fitted in 300 × 300, 3 px ink outline). Around it:
  - **Edge notches** (for straight walls across): small brass ticks on the shape's frame edges at twelfths (shape-specific, §6), each with a 44 × 44 hit area outside the shape.
  - **Rim pegs** (for walls from the centre): 12 or 24 brass pegs (8 px, hit 44 × 44) on the rim, and a **centre pin** (10 px) at the shape's centre (the incentre for triangle/square/hexagon, the centre for circle/oval). Shapes without hub walls (rectangles) show no pin.
  - **Walls:** 5 px wooden strips (#B98A55, 2 px ink edge).
  - **Spouts:** one small drain mark per part at its lowest edge, appearing only during rain.
- **Right column (260 px):**
  - **The cloud** (top, 120 × 70, white with a soft blue shade, drawn geometry) on a string with a pull bead (44 px).
  - **The tube rack** (n tubes for the round's fraction: 2, 3 or 4), each tube 44 × 200 px glass with a **gold fill line** at the height one equal share reaches, plus a **puddle tray** (220 × 24) for any part that has no tube.
- **Bubble** under the table; Check at the right (shell). (The cloud's pull bead is the same action as Check; Check is always there.)

**At 360 — stacked:** task · table 328 × 300 (shape fitted 250; notches/pegs hit areas 44 px, overlapping hit areas resolved to the nearest) · cloud left + tube rack right in one row 328 × 150 (tubes 36 × 120, lying in a row) · puddle tray 328 × 18 · bubble · Check. At 320: table 296 × 270 (shape 224).

**Pictures:** none — table, walls, pegs, cloud, raindrops, tubes, rainbow are drawn apparatus geometry. (A cloud and drops are simple shapes in the shell palette, not an illustration; there is no character.)

## 5. The hand
- **Tap an edge notch** → a wall drops straight across the shape from that notch to the opposite side (220 ms, a wooden *tock*), along the notch's direction (§6). Tap the same notch (or the wall) again → the wall lifts away (undo).
- **Tap a rim peg** → a wall swings in from the centre pin to that peg (180 ms, *tock*). Tap again → it lifts away.
- **Walls limit:** 4 walls at most (enough for fourths; a fifth tap gives a gentle wobble of the newest wall and the hint "Four walls are the most you need.").
- **Live parts:** as walls go up, each closed part gets a faint outline glow (no colour, no numbers) so the child sees how many parts exist — never their sizes.
- **Rain** (Check or pulling the cloud): the cloud drifts across (500 ms) and rains for 1.5 s (drops uniformly spaced, 1 drop per 400 px² of table); each part's water flows through its spout down a channel into a tube (left-to-right by the part's centre); water rises in proportion to the part's area. The gold line marks where one equal share reaches.
- **Colour step** (when on, after equal parts): tap a part → it fills coral (tap again to clear). Check rains again; coloured parts send coral water.
- **Keyboard:** Tab cycles notches/pegs in clockwise order, Enter toggles a wall; Tab to the cloud/Check; in the colour step arrow keys move between parts, Enter colours.

## 6. The rounds
**Shape and wall vocabulary (all in a 100-unit box; the core and the gate compute every part's area by polygon clipping, never from a table):**
| shape | outline | edge notches (straight walls) | rim pegs + centre pin (walls from the centre) |
|---|---|---|---|
| circle | r 40 at 50,50 | top & left edges of its bounding square at twelfths → vertical / horizontal chords | 24 pegs every 15° |
| square | 20…80 | top & left edges at twelfths → vertical / horizontal walls | 24 pegs at equal steps of 10 along the perimeter (side 60), the first 5 units clockwise of top-middle — so no peg sits on a corner or an edge middle (centre pin) |
| rectangle | 8…92 × 26…74 (landscape) / 26…74 × 8…92 (tall) | top & left at twelfths | none |
| triangle | equilateral, r 40 at 50,50 | base at twelfths → vertical walls; left side at sixths → walls parallel to the base | 12 pegs at equal steps along the perimeter (vertices and edge midpoints among them) |
| hexagon | regular, r 40 | top at twelfths → vertical walls | 12 pegs (6 vertices + 6 edge midpoints) |
| turned square | square r 40 turned 45° | two lower edges at sixths → walls parallel to an edge | none (see the near-miss rule below) |
| oval | rx 44, ry 30 | top & left at twelfths | 12 pegs at parametric 30° steps (the old core's affine spokes) |
(Every peg set of a shape that has a centre pin is spaced so that walls to pegs equally far apart along the outline cut EQUAL areas — true for the circle, the regular polygons and the square, whose centre is the centre of a circle touching every side; and for the oval by the parametric steps. That is the honest geometry behind the "strange thirds" round. Rectangles get no pin, because walls from a rectangle's centre to equal perimeter steps do not cut equal areas.)

**Thirds (default; 9 rounds):**
| # | shape | walls offered | one way to be right (any equal three-part set is accepted) |
|---|---|---|---|
| T1 | circle | pegs + notches | pegs 0, 8, 16 (120° apart) |
| T2 | triangle | pegs + the base-parallel notches (no vertical notches in this round) | pegs at the 3 vertices (or any 3 pegs 4 steps apart) |
| T3 | hexagon | pegs + notches | pegs at alternate vertices |
| T4 | square | notches only | vertical walls at 4/12 and 8/12 (or horizontal) |
| T5 | rectangle (landscape) | notches | vertical walls at 4/12, 8/12 (horizontal at 4/12, 8/12 also right) |
| T6 | turned square | notches only | two walls parallel to one edge at 2/6 and 4/6 |
| T7 | oval | pegs + notches | pegs 0, 4, 8 (parametric 0°, 120°, 240°) |
| T8 | square — the surprise | pegs only | pegs 0, 8, 16 (perimeter 5, 85, 165: a 4-gon, a 5-gon and a 4-gon that are pairwise NOT congruent, 1200 each = ⅓) |
| T9 | rectangle (tall) | notches | horizontal walls at 4/12, 8/12 |

**Halves (8 rounds):** circle (2 opposite pegs, or the middle chord) · square — pegs only (any 2 pegs 12 apart: every line through the centre halves a square, the halves always congruent) · rectangle landscape (vertical or horizontal middle) · triangle (vertical wall at the base's middle — the line from the top corner) · hexagon (opposite pegs) · oval (either middle) · turned square (notches only: a wall parallel to an edge at 3/6) · rectangle tall.
**Fourths (8 rounds):** circle (4 pegs 6 apart) · square — notches only (both middles, or 3 vertical walls at 3, 6, 9/12) · rectangle landscape (strips or grid) · oval (both middles) · turned square (notches only: one wall in each direction at 3/6) · hexagon (4 pegs 3 apart) · triangle (4 pegs 3 apart) · rectangle tall (strips or grid).
**Colour step targets (when on):** thirds T1–T9: colour 1, 2, 1, 2, 1, 2, 1, 2, 1 (alternating) · halves: 1 · fourths: 1, 3, 2, 1, 3, 2, 1, 3.

- **One right answer:** each round has ONE right criterion — n parts, every part the same area (to 0.5 % of the whole). Many wall sets meet it (every rotation of a circle's spokes); the gate enumerates every buildable set (≤ 4 walls from the round's notches/pegs) and asserts that exactly the equal-area sets are accepted.
- **The near-miss rule (critic, measured 2026-10-17, `work-c26/e172.js` raster enumeration of every set of ≤ 3 walls, `t172.js` exact polygons):** the draft claimed every wrong set misses by ≥ 1/12; that is false where straight walls and centre walls MIX. Measured smallest non-equal three-part sets: circle 24 % off (v4 + two spokes), oval 25 %, hexagon 22 %, triangle with base-parallel notches 15 % — but triangle with VERTICAL notches 4.7 % (v5 + p3 + p11) and the square 4.2 % (v4 + p5 + p13 = 1200 / 1225 / 1175 exactly), which the tubes would show as a 2-mm wobble a child reads as "equal" while the rule says no. Hence: a square or turned-square round offers ONE wall family; triangle thirds offers pegs + base-parallel notches only. **The gate's rule: in every round, every buildable set that is not accepted misses equality by ≥ 10 % (largest part ÷ smallest part ≥ 1.10); a round that fails drops a wall family.** The draft's T8 pegs 0/4/8 on a 12-peg square starting top-middle were also measured: two of the three pieces are mirror images (congruent), so the "nothing alike" surprise was false — hence the offset 24-peg square.
- **Answer position:** not applicable (the child builds); the colour targets alternate so "colour one" is never the default answer.
- **Order:** order-only reshuffle per pass.

## 7. Check, the misses, the success
- **Check with no wall** → hint "Tap the edge or the pegs to put up walls." (no miss).
- **Check = rain** (always — the rain IS the verdict).
- **Miss 1:** after the rain, the tubes stand as they filled: a tube over the gold line shows its extra water spilling down its side (coral drips); a tube under the line shows the gap up to the line in dashed gold; a part with no tube sends its water into the puddle tray; an empty tube stands dry. The part that drains into each wrong tube outlines in the same coral/gold. Hint (unequal): "The parts caught different amounts of rain. Move a wall so they are the same." · (wrong number): "There are {n} tubes. Make {n} parts."
- **Miss 2:** the table shows a faint dotted ghost of ONE right wall set (from the old exact constructions: T-rounds use the old activity's lines), and the pegs/notches it uses glow teal. Hint: "Try the dotted walls."
- **A new wall** (or a lifted one) empties the tubes and clears the help until the next Check.
- **Success:** the rainbow and the chord (§2). Bubble: "Three equal parts — thirds! Each part is one third." (halves: "Two equal parts — halves! Each part is one half." · fourths: "Four equal parts — fourths! Each part is one fourth."). T8 adds: "They don't look the same, but each is one third."
- **Colour step** (setting on): after success the task line adds "Now colour {k} of the {n} parts." — Check rains again; right → coral tubes rise beside teal ones, bubble "Yes — {k} of {n} equal parts: {fraction}." (e.g. "2 of 3 equal parts: two thirds"); wrong count → miss 1 shows the coloured tubes against a {k}-tube gold bracket, hint "Colour {k} parts."; miss 2 pulses as many parts as are still needed.

## 8. Settings (each visibly changes the board at rest)
1. **Parts:** halves / thirds / fourths — the tube rack shows 2, 3 or 4 tubes with their gold line, and the task line names the fraction (thirds is the default; the page title is about thirds).
2. **Colour after:** off / on — on adds a small coral paint pot on the rack (the colour step), off hides it.

## 9. Words (EN source; the other 10 locales authored by hand, then one native + pedagogy reviewer)
- title (in-tool): "The Rain Table"
- instruction: "Put up walls to make equal parts. Then let it rain: equal parts fill their tubes the same."
- task lines: "Make {n} equal parts — {fractionPlural}." (n = 2/3/4: halves / thirds / fourths) · colour "Now colour {k} of the {n} parts."
- hints: hintStart "Tap the edge or the pegs to put up walls." · hintTooMany "Four walls are the most you need." · hintUnequal "The parts caught different amounts of rain. Move a wall so they are the same." · hintCount "There are {n} tubes. Make {n} parts." · hintGhost "Try the dotted walls." · hintColour "Colour {k} parts."
- celebrations: as §7 (including T8's line).
- settings: "Parts" · "halves" · "thirds" · "fourths" · "Colour after" · "off" · "on"
- aria: notch "edge notch {i}", peg "rim peg {i}", state "wall up"/"no wall"; parts "part {i} of {m}" (never "equal"); after rain "tube {i}: {over|at|under} the line".
- **Locale traps:**
  - **Fraction nouns:** de *Hälften / Drittel / Viertel*; fr *moitiés / tiers / quarts*; es *mitades / tercios / cuartos*; it *metà / terzi / quarti*; pt *metades / terços / quartos*; nl *helften / derde delen / kwarten*; sv *halvor / tredjedelar / fjärdedelar*; da *halvdele / tredjedele / fjerdedele*; no *halvdeler / tredeler / firedeler*; fi *puolikkaat / kolmasosat / neljäsosat*. "Each part is one third": de *Jeder Teil ist ein Drittel*, fr *Chaque part est un tiers*, fi *Jokainen osa on kolmasosa*. "Two thirds": fi *kaksi kolmasosaa* (partitive), nl *twee derde*, de *zwei Drittel*.
  - **en "fourths" vs "quarters":** the live en activities say fourths (row 108 "halves and fourths"); the worksheet G2-229 title says "Quarters" — the en copy keeps fourths everywhere in this activity.
  - **"wall":** de *Wand* (not *Mauer*), fr *cloison* (a child word; *mur* is a building wall — native picks), es *pared*/*tabique*, it *paretina*, pt *divisória*/*parede*, nl *schotje*, sv *vägg*, da *væg*, no *vegg*, fi *väliseinä*. The word is used only in hints; the walls themselves are unlabelled.
  - **"rain" verbs** are safe everywhere; "cloud" de *Wolke*, fi *pilvi*.
  - fr U+202F before ! ? : ;
- **Sound off:** the tubes and the gold line carry the verdict; the rack shows how many parts are wanted before any reading.

## 10. Sound off, access, phones
- Keyboard path §5; notches and pegs are focusable toggle buttons (aria-pressed); parts are buttons in the colour step.
- Taps: every notch/peg hit area 44 × 44; where two overlap (circle pegs 15° apart = 33 px apart on a 250 px circle at 360) the nearest wins and a press-and-slide shows a peg-highlight that follows the finger before release.
- Fold: 360 × 740 → task 48 + table 300 + cloud/rack 150 + puddle 18 + bubble/Check 60 = 576. 320 × 640: table 270, rack 140 → 536. Check above both folds.
- Phone layout: the rack lies under the table with the tubes in a row (36 px wide, 120 tall); the cloud sits at the rack's left.

## 11. Distinct from
- **Row 108 (grade 1) — cut and stamp:** a glass copy of one piece is stamped on the others, which proves equality only for pieces of the same shape. **Row 107 — the mobile:** fair cuts hang level. **Row 171 (sibling) — the dough press:** squashes given pieces into patties to RECOGNISE equal shares. This row is the MAKING instrument, and its measure is rain: area turned into an amount of water that fills a tube — which, unlike the stamp, works for pieces of any shape (the square-hub thirds).
- **Tool fraction-kitchen** drags a knife through food and shares slices; here the child builds walls on lattice notches and pegs and the rain judges; no food, no knife, and the triangle/circle/oval/turned-square constructions are the content.
- **Registry: the Tipping Pour (row 33)** compares the capacity of two cups by pouring one into the other; here no vessel is compared — rain falls on an area and the tubes are only a read-out.

## 12. Build plan
- **Core state:** `{parts:2|3|4, colourOn:bool, round:{shape, notchSets, pegSet, target:k}, walls:Set<wallId>, coloured:Set<partIdx>, step:'build'|'colour', miss, help}`.
- **Core functions:** `outline(shape)` · `wallSegment(wallId)` (a notch wall = a chord across the outline along its direction; a peg wall = centre→peg) · `parts()` → polygons (clip the outline by the walls; peg walls only close a part together with a neighbouring wall) · `area(poly)` · `isEqual(parts, n)` (count n, every area within 0.5 % of the whole/n) · `tubeLevels()` → area / (whole/n) per part, in left-to-right order of centroids · `ghost(round)` → the old exact construction for that shape and n · `check()`.
- **Gate's own ground truth (verify-rain-table-core.js, its own clipping code):** enumerates every buildable set of ≤ 4 walls per round; the accepted sets are exactly those whose parts have equal area (own computation); every round has ≥ 1 accepted set and every ghost set is accepted; the T2 base-parallel set gives 1:3:5; the circle "peace sign" gives 2:1:1; the T8 square-hub pieces (pegs 0, 8, 16 of the offset 24) are pairwise non-congruent (including mirror images) and equal; every non-accepted buildable set misses by ≥ 10 %; the old 7 thirds constructions are all accepted; tube levels ∝ areas; the oval's parametric pegs 4 apart give equal parts and polar 120° spokes would not (the gate checks the peg positions are parametric).
- **Mutations:** the square offered notches AND pegs in one round (re-admits the 4 % near miss) · square pegs started at top-middle (re-admits the congruent T8 pair) · accept by count only · accept by stored answer set (kills on a rotated circle answer) · rectangle given a centre pin with perimeter pegs · oval pegs at polar angles · tube level ∝ perimeter of the part instead of area · base-parallel triangle thirds accepted · colour step opens on unequal parts · help survives a new wall · the turned square called "diamond" in any string.
- **Pictures to verify:** none.
- **Risks:** the rain must read as EVEN (uniform drop spacing; no drop clusters) or the read-out looks rigged; tube heights for 1:3:5 must fit (the tube shows up to 1.6 × the gold line before the spill animation takes over).
- **BLOCKED:** nothing.

## 13. The four questions
1. **Would a 5–8-year-old choose it again?** Yes — building little walls and making it rain, then watching tubes fill and a rainbow appear, is something children do for its own sake.
2. **Would a teacher put it on the board?** Yes — it exposes the two famous thirds mistakes (triangle strips, the circle peace sign) by physics, shows equal shares that do not look alike, and carries the colour-the-fraction worksheets.
3. **Would a parent trust it?** Yes — calm, exact (every tube level is the part's true area), no score, no words on the apparatus.
4. **The invention, in one sentence:** the shape is a rain table whose parts drain into identical tubes, so equal shares fill to the same gold line and a bigger part always catches more rain.

## 14. Critic review (2026-10-17)
Scores before → after: invention 5→5 · fun 5→5 · completeness 4→5 · correctness 3→5 · distinctness 5→5 · reality 5→5
What changed:
- Ratios verified: base-parallel triangle thirds 1:3:5 (5/3 of the gold line → spills), oval parametric spokes equal, peg rule = tangential polygons only. The peace sign was misdescribed ("two stop at half") — the quarters reach ¾ of the thirds line, the half 1.5×.
- T8 surprise was false: pegs 0/4/8 on a 12-peg square starting top-middle give two mirror-congruent pieces (measured). Square now has 24 pegs offset 5 units; pegs 0/8/16 give three pairwise non-congruent ⅓ pieces (measured).
- "Every wrong set misses by ≥ 1/12" was false: raster enumeration of every ≤ 3-wall set found 4.2 % (square, chord + 2 spokes, exact 1200/1225/1175) and 4.7 % (triangle, vertical notch + spokes) near-misses. Square/turned square rounds now offer one wall family; triangle thirds offers pegs + base-parallel notches; gate requires every rejected set to miss by ≥ 10 % (circle 24 %, oval 25 %, hexagon 22 %, triangle-b 15 % measured).
- Layout check (2026-10-17): switched to stacked — split stage column is ~370 px at 704.
