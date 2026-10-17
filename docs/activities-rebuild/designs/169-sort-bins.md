# Row 169 — Sort Shapes by Sides: THE TRUNDLE WHEEL — roll a shape and it prints its own sides (2.G.A.1)

## 0. Identity
- id `sort-bins.sort-by-sides.2-g-a-1` (KEPT; slugs, titles and intros frozen in all 11 locales) · grade 2 · CCSS 2.G.A.1 · strand Geometry.
- own files at rebuild (the row leaves the shared sort-bins engine; `sort-bins-activities.json` keeps row 105's entry): `trundle-wheel-core.js`, `trundle-wheel-activity.js`, `trundle-wheel-activity.html`, `trundle-wheel-activities.json`. 0 lines to `sort-bins-core.js`, `lcs-shell.*` or any shared core.
- page title (frozen): "Sort Shapes by Sides — Triangles, Quadrilaterals, Pentagons & Hexagons (Grade 2)"; intro (frozen): "drag each shape into the right bin … by counting its sides" — kept exactly: the child still drags shapes into bins by counting sides; the wheel is how the sides get counted.
- worksheets it covers: **K-075** Count the Sides (bins show numerals only) · **K-076** Sort by Sides and **G2-241** Shape Sorter (sides bins) · **G3-340** Quad Squad ("Is it a rectangle? Squares are rectangles too" — the corner column of the quad cabinet) · **G3-353** Two-Circle Sort (two rules at once: the two-ring board) · the row × column table and the missing cell (quad cabinet rounds Q5–Q8).
- old activity: drag 5–7 shapes into 2–4 bins (triangle / quadrilateral / pentagon / hexagon), Check. **Kept:** all 8 old rounds and their 12 shapes (`tri_equi, tri_right, tri_obtuse, quad_square, quad_rect, quad_rhombus, quad_trap, quad_para, pent_reg, pent_house, hex_reg, hex_irreg`) with their vertex tables, the bin names, the drag-into-bin verb. **Changed:** the old `quad_rhombus` is a regular 4-gon (a square turned 45°, `_reg [90,0,270,180]`); it keeps its places in the sides rounds but is RENAMED `quad_square45` in the catalogue, and a true rhombus (60°/120°) is added for the quad cabinet. Two old shapes are **re-cut** because the new boards judge corners (measured 2026-10-17): the old `tri_obtuse` (8,70)(92,70)(66,30) has an **88.4°** corner — it is not obtuse and would look square to every child while the ring "square corner" refuses it; it becomes (8,72)(92,72)(34,46) with a 110.9° corner. The old `pent_house` roof apex is **93.7°** (looks square, is not); the roof is raised to (50,6), 77.3°. Both keep their side counts, so the sides rounds are unchanged. **Dropped:** nothing; the old bins become one of three boards.

## 1. The pitch
"Every shape is a wonky trundle wheel: roll it along the lane and it clicks at each corner and prints a chalk dash for each side — so the sides come out of the loop and lie in a row you can count, and the coral side tells you when it has gone all the way round."

## 2. Why a child will want it again
- **A wheel that isn't round.** Drop a triangle on the lane and push it: it doesn't roll, it *tumbles* — tips up on its corner, *clack*, crashes onto its next side, tips again. A hexagon almost rolls; a skinny triangle lurches like a rocking horse; a long rectangle goes *ka-chunk … ka-chunk*. Children push every shape just to see how it walks.
- **It leaves footprints.** Each time a side lands on the lane, a chalk dash is printed on the paper strip underneath — exactly as long as that side. Each corner it tips over leaves a little mark between two dashes: a round dot, or — when the corner is a square corner — a tiny open chalk square. The shape's whole outline comes out straight, like a tape measure unrolling.
- **The coral side.** Whichever side the shape lands on first gets a coral chalk stripe. When the coral side comes down again, a bell rings *ding*, the strip snips off and hangs under the shape like a luggage ticket. "It went all the way round!" — the child never loses track of where they started.
- **The surprise that teaches.** The upside-down "house", the squashed hexagon, the square standing on its point — each prints exactly the same kind of ticket as its tidy cousin. A square turned like a diamond prints four equal dashes and four little squares: it is just a square.
- **Earned show per round:** when every shape is in its place, the crates' lids close (or the cabinet drawers slide shut, or the rings glow), each place pins its tickets on its front (three-dash tickets on the triangle crate, five-dash tickets on the pentagon crate…), and the whole set does a **trundle parade** — every shape tumbles once along the lane in a line, *clack-clack-clack*, and drops back into its place. No timer, score, streak or lives.
- **Free play:** any shape can be rolled any number of times, before or after sorting; dragging backwards reels the print back in.

## 3. The skill and the misconception
- **Skill (2.G.A.1 and the worksheets):** recognise and name triangles, quadrilaterals, pentagons and hexagons by the number of their sides (= the number of their corners); count sides without missing or double-counting; classify quadrilaterals by equal sides and square corners (a square is a rectangle AND a rhombus); sort by two attributes at once (two rings; a row × column table; the missing cell).
- **Misconceptions and the push-back:**
  1. **Losing count around a loop** (start somewhere, go round, count the first side twice or stop one short): the wheel turns the closed loop into an open row of dashes with a coral start — a row has a first and a last; a loop doesn't.
  2. **"Only the tidy one is a hexagon/pentagon"** (regular-prototype thinking): the irregular pentagon, the long hexagon and the "house" print 5, 6 and 5 dashes. The dashes are uneven — and there are still five.
  3. **"A turned square is a diamond", "an upside-down triangle isn't a triangle"**: rolling cannot see orientation. Wherever you drop a shape it prints the same ticket (only starting from a different dash), so turning is shown to change nothing.
  4. **"A square isn't a rectangle"** (quad cabinet): the square's ticket has four little corner-squares — exactly what the left column's header ticket shows — AND four equal dashes, exactly what the top row's header shows. The square sits where the rectangle column meets the rhombus row: it is both.
  5. **"Square corner means square"** (rings): the "house" pentagon has two square corners and lands in ring B only; the right triangle too.
  6. **Corner-word vs side-word languages** (de *Viereck*, nl *vierhoek*, sv *fyrhörning*, fi *nelikulmio* name the CORNERS): the ticket shows both — n dashes and n corner marks, interleaved — so a child who counts corners and a child who counts sides get the same number.

## 4. The stage
**At 704 — lane on top, split work area below:**
- **Task line** (20 px, ≤ 2 lines).
- **The lane** (660 × 170 px): a wooden track (warm sand #E9D3A8, 3 px ink outline). At its left a **dock** (a raised block 110 × 40 with a coral notch where the coral side will land). Under the lane surface runs a **paper strip** (cream #FFFDF6, 520 × 30 px) where prints appear: dashes 5 px thick in teal #146B5E, corner dots 7 px teal, square-corner marks 9 × 9 px open squares (2 px), the start side's dash coral #F2784B. A shape placed on the dock is drawn at **roll scale** `k = min(470 / perimeter, 130 / longest diagonal)` — the diagonal term is what keeps a shape standing on a corner mid-tip inside the lane (measured 2026-10-17, critic script `work-c26/g169.js`: with perimeter-only scaling the old claim "tallest ≤ 120 px" was false — tri_obtuse reached 214 px and quad_rect_thin 196 px mid-tip). With the two-term scale every shape's tip height is ≤ 130 px and its ticket is 285 px (tri_obtuse) to 402 px (pent_reg) long — all inside the 520 px strip. Tickets of different shapes are therefore different lengths; only the dash RATIOS within one ticket carry meaning, and the mini-tickets under tray shapes are drawn at one common scale per round.
- **Left work column (300 px): the tray** — a 2 × 3 grid (2 × 4 when 7–8 items) of cream cells 140 × 96, each holding one shape at tray scale (longest side of its bounding box 76–92 px, ink outline 3 px, fill pale teal #CFE7E2 — every shape the SAME fill so colour never tells). A rolled shape carries its ticket (the print strip at 0.25 scale, 120 × 12 px) under it.
- **Right work column (340 px): the board**, one of three (setting §8):
  - **Sides crates:** 2–4 open-top crates 78 × 128 px in a row (gap 8). On each crate front: a big numeral (34 px, Baloo 2), under it the plural name (15 px, ≤ 2 lines, e.g. "pentagons"), and above the numeral a mini ticket showing that many dashes and marks. (Numeral, name and ticket are content; setting "Crates show" hides some.)
  - **Quad cabinet:** a 2 × 2 cabinet 320 × 300. Column headers above (icons, 26 px tall): left = a mini ticket whose four corner marks are **little squares**; right = the same ticket with **corner dots**. Row headers at the left (icons): top = **four equal dashes with matching tick marks**; bottom = **dashes of two lengths**. No words. Cells 140 × 120. (Top-left = square · bottom-left = rectangle · top-right = rhombus · bottom-right = other quadrilateral — the names are never printed; the celebration says them.)
  - **Two rings:** two overlapping rings (radius 110, centres 120 apart) on a cream mat 340 × 260; ring A's tag (top-left) = a mini ticket of **exactly four dashes**; ring B's tag (top-right) = **one corner-square mark**. The mat outside both rings is the fourth region.
- **Bubble** under the board; Check at the right (shell).

**At 360 — fully stacked:** task (≤ 2 lines) · lane 328 × 118 (dock 64 wide, strip 248 × 24, roll scale `min(236 / perimeter, 84 / longest diagonal)` → tickets 184–236 px, tip height ≤ 84) · tray 3 cells per row (104 × 84; shapes 64–72 px) · board: crates 4 × 78 × 108 (numeral 28 px, name 13 px), cabinet 328 × 252 (cells 146 × 100, header icons 22 px), rings 328 × 230 (radius 92) · bubble · Check. **At 320:** lane 296, tray cells 94 × 80 (shapes 60 px — geometry, not a library picture; tap target still ≥ 44 px).

**Pictures:** none. Every element is drawn apparatus geometry (polygons, track, paper, chalk dashes, crates, cabinet, rings). The library `shapes/*` pictures are NOT used: each is a different colour (colour would tell) and `shapes/diamond` is a turned square (PICTURE-RULINGS).

## 5. The hand
- **Drag a shape from the tray** → it lifts (scale 1.06, shadow, 80 ms) and follows the finger. Drop it:
  - **on the dock** → it grows to roll scale (160 ms) and settles onto the side nearest its lowest point; that side gets the coral stripe; any old ticket on that shape is cleared.
  - **in a crate / cabinet cell / ring region** → it drops in at board scale (crates: stacked loosely up to 3; cells and rings: placed where dropped, nudged so no two overlap); a soft "tok".
  - **anywhere else** → it glides back to its tray cell (200 ms).
- **Roll it** (shape on the dock): drag right along the lane. The shape pivots about its front-bottom corner in step with the finger (rotation = the finger's x-travel mapped onto that corner's exterior angle; visual lag ≤ 100 ms). When the next side lands: *clack* (a wood tone; pitch rises one step per side, so a hexagon plays a little scale), that side's dash is drawn on the strip (60 ms), and the corner just tipped over leaves its mark (dot, or corner-square when the interior angle is 90° ± 0.5°). **Tap** the docked shape = roll exactly one side (phones, keyboard). Dragging left un-rolls (marks erase in reverse).
  - When the **coral side lands again**: *ding*, the strip snips (scissor sound), and the ticket flies to sit under the shape; the shape glides back to the tray carrying it.
  - A shape can be rolled again (a fresh ticket replaces the old one).
- **Tap a ticket** → it zooms to 2× over the lane for 2 s (a reading aid; no numbers on it).
- **Drag a shape out of a crate/cell/ring** → back to the tray or into another place (undo).
- **Keyboard:** Tab cycles tray shapes → Enter picks up → arrow keys choose a target (dock, then crates/cells/regions in reading order) → Enter drops; on the dock ArrowRight rolls one side, ArrowLeft un-rolls.

## 6. The rounds
A round = a tray of shapes and one board. The child places every shape, then Check. Every shape is convex (the lane only rolls convex shapes; no concave shape is in any round). Shapes appear at the rotation in the round table and a seeded size 0.8–1.0 of the tray cell.

**Shape catalogue (unit box 0–100; `_reg` = regular, inscribed r 40 at 50,50; `rot` applied per round):**
| id | sides | vertices | square corners | equal sides |
|---|---|---|---|---|
| tri_equi | 3 | _reg [90,210,330] | 0 | all 3 |
| tri_right | 3 | (16,16) (16,86) (86,86) | 1 | 2 legs |
| tri_obtuse (re-cut) | 3 | (8,72) (92,72) (34,46) — 110.9° corner | 0 | — |
| tri_tall (new) | 3 | (50,8) (30,92) (70,92) | 0 | 2 |
| tri_scalene (new) | 3 | (10,80) (90,62) (38,14) | 0 | — |
| quad_square | 4 | (18,18) (82,18) (82,82) (18,82) | 4 | all 4 |
| quad_square45 (was quad_rhombus) | 4 | _reg [90,0,270,180] | 4 | all 4 |
| quad_rect | 4 | (8,28) (92,28) (92,72) (8,72) | 4 | 2 + 2 |
| quad_rect_thin (new) | 4 | (6,40) (94,40) (94,60) (6,60) | 4 | 2 + 2 |
| quad_rhombus60 (new) | 4 | (14,50) (50,29.2) (86,50) (50,70.8) | 0 | all 4 |
| quad_trap | 4 | (26,28) (74,28) (92,78) (8,78) | 0 | 2 legs |
| quad_right_trap (new) | 4 | (16,20) (60,20) (88,80) (16,80) | 2 | — |
| quad_para | 4 | (30,28) (92,28) (70,78) (8,78) | 0 | 2 + 2 |
| quad_kite (new) | 4 | (50,4) (80,40) (50,92) (20,40) | 0 | 2 + 2 adjacent |
| quad_irreg (new) | 4 | (85,48) (37,9) (20,46) (35,86) — 76° 76° 135° 73° | 0 | — |
| pent_reg | 5 | _reg [90,162,234,306,18] | 0 | all 5 |
| pent_house (roof raised) | 5 | (18,46) (50,6) (82,46) (82,84) (18,84) — roof 77° | 2 | — |
| pent_irreg (new) | 5 | (20,24) (66,12) (90,48) (64,88) (14,72) | 0 | — |
| hex_reg | 6 | _reg [90,150,210,270,330,30] | 0 | all 6 |
| hex_irreg | 6 | (30,18) (70,18) (90,50) (70,82) (30,82) (10,50) | 0 | — |
| hex_long (new) | 6 | (8,50) (26,22) (74,22) (92,50) (74,78) (26,78) | 0 | — |
| hex_lopsided (new) | 6 | (20,14) (62,10) (90,38) (84,78) (40,92) (10,58) | 0 | — |
The core and the gate re-derive sides, square corners (|interior − 90°| ≤ 0.5°) and equal sides (all lengths within 1 %) from the vertices — never from this table. The builder nudges any new vertex the gate finds near a threshold (e.g. a corner at 89.7°) until it is clearly one or the other (≥ 3° away).

**Board A — sides crates (9 rounds; the 8 old rounds kept as A1–A8, each now with turned copies; A9 new):**
| # | crates (shown in seeded order) | tray (id@rot°) |
|---|---|---|
| A1 | 3 · 4 · 5 | tri_equi@180 · tri_right@0 · quad_square@0 · quad_rect@90 · pent_reg@0 · pent_house@180 |
| A2 | 3 · 4 · 6 | tri_equi@0 · tri_obtuse@200 · quad_square45@0 · quad_trap@180 · hex_reg@0 · hex_irreg@30 |
| A3 | 4 · 5 · 6 | quad_square@20 · quad_para@0 · pent_reg@36 · pent_house@0 · hex_reg@15 · hex_irreg@90 |
| A4 | 3 · 4 | tri_equi@0 · tri_right@135 · tri_obtuse@0 · quad_square@0 · quad_rect@30 · quad_square45@0 · quad_trap@0 |
| A5 | 3 · 4 · 5 · 6 | tri_tall@0 · quad_trap@0 · pent_reg@0 · hex_reg@0 · quad_rect@0 · hex_irreg@0 |
| A6 | 3 · 5 | tri_equi@60 · tri_right@0 · tri_obtuse@0 · pent_reg@180 · pent_house@90 |
| A7 | 4 · 6 | quad_square@0 · quad_rect@0 · quad_square45@0 · hex_reg@0 · hex_irreg@0 |
| A8 | 3 · 4 · 5 · 6 | tri_obtuse@0 · quad_para@180 · pent_house@0 · hex_irreg@0 · quad_rect@0 · pent_reg@0 |
| A9 | 5 · 6 | pent_irreg@0 · pent_house@200 · pent_reg@0 · hex_long@0 · hex_lopsided@0 · hex_reg@30 |
Every crate gets 1–4 shapes (A4's quadrilateral crate holds 4 — the crate stacks 4 at 704 and 360; measured counts per round: A1 2/2/2 · A2 2/2/2 · A3 2/2/2 · A4 3/4 · A5 1/2/1/2 · A6 3/2 · A7 3/2 · A8 1/2/2/1 · A9 3/3); no crate is ever empty; every round holds at least one shape turned off its tidy pose.

**Board B — quad cabinet (8 rounds; Q5–Q8 have the missing cell).** Each cell is ONE yes/no pair (top row = all four sides equal; left column = four square corners), so the cells are exclusive and every quadrilateral has exactly one:
| # | tray | missing cell → 3 candidates in the drawer (seeded order; ✓ = the one that fits) |
|---|---|---|
| Q1 | quad_square@0 · quad_rect@0 · quad_rhombus60@0 · quad_trap@0 · quad_square45@0 | — |
| Q2 | quad_square45@0 · quad_rect_thin@30 · quad_rhombus60@90 · quad_para@0 · quad_kite@0 | — |
| Q3 | quad_square@15 · quad_rect@90 · quad_rhombus60@30 · quad_irreg@0 · quad_right_trap@0 | — |
| Q4 | quad_square@0 (size 0.6) · quad_square45@0 · quad_rect@60 · quad_rhombus60@150 · quad_para@120 | — |
| Q5 | quad_rect@0 · quad_rhombus60@0 · quad_trap@0 → top-left (square) empty | quad_square@45 ✓ · quad_rhombus60@45 · quad_rect_thin@0 |
| Q6 | quad_square@0 · quad_rhombus60@0 · quad_kite@0 → bottom-left (rectangle, not all equal) empty | quad_rect_thin@45 ✓ · quad_para@0 · quad_kite@90 |
| Q7 | quad_square45@0 · quad_rect@0 · quad_irreg@0 → top-right (all equal, no square corner) empty | quad_rhombus60@120 ✓ · quad_kite@0 · quad_rect@20 |
| Q8 | quad_square@0 · quad_rect@0 · quad_rhombus60@0 → bottom-right (neither) empty | quad_para@0 ✓ · quad_square@30 · quad_rect_thin@60 |
(Measured: Q1–Q4 each fill all four cells — the draft's Q4 had no rhombus and left the top-right cell empty, so the kite was swapped for a turned rhombus; Q4's lesson is now "two squares of different size and turn share one drawer". In Q5–Q8 the tray fills exactly the three other cells and exactly one drawer candidate fits. No drawer ever offers a shape that also fits the empty cell; a square is never offered for the rectangle cell — it has its own cell, which is the honest table form of "a square is a rectangle": the square lives in the rectangle COLUMN.)

**Board C — two rings (8 rounds)** — ring A "four sides", ring B "a square corner":
| # | tray (region: A = ring A only · B = ring B only · AB = both · out = outside) |
|---|---|
| C1 | quad_square AB · quad_rhombus60 A · tri_right B · tri_equi out · pent_house B · hex_reg out |
| C2 | quad_rect AB · quad_para A · tri_right@135 B · pent_reg out · quad_kite A |
| C3 | quad_right_trap AB · quad_trap A · pent_house@180 B · hex_long out · quad_square45 AB |
| C4 | quad_rect_thin@30 AB · quad_irreg A · tri_right@200 B · tri_obtuse out · pent_irreg out |
| C5 | quad_square@15 AB · quad_rhombus60 A · pent_house B · hex_irreg out · tri_tall out |
| C6 | quad_para@90 A · quad_kite A · tri_right B · quad_rect AB · hex_lopsided out |
| C7 | quad_square45 AB · quad_trap@180 A · pent_house@90 B · pent_reg out · tri_scalene out |
| C8 | quad_right_trap@90 AB · quad_rhombus60@60 A · tri_right@45 B · hex_reg out · quad_irreg A |
Every region holds ≥ 1 shape in every round (measured; region totals over C1–C8: A-only 11 · B-only 9 · both 9 · outside 12). Because all four regions are occupied in every round, a one-rule bot (four sides only, or square corner only) misplaces at least one shape in EVERY round — the gate asserts this per round.

- **Answer position:** the gate measures (a) crates are shown in seeded order and each label stands in each crate position within ±1 of uniform over a pass; (b) in board A the crate in any one position never receives the most shapes in more than 2 rounds in a row; (c) in Q5–Q8 the fitting candidate stands in drawer slots 1/2/3 with counts 2/1/1, the slot permuted per pass so two passes give 3/3/2; (d) on every board the tray order is reshuffled per serving and no three consecutive tray cells share a destination.
- **Order:** order-only reshuffle per pass (never the same round order twice in a row).

## 7. Check, the misses, the success
- **Check with a shape still in the tray** → hint "Every shape needs a place. Roll one if you are not sure." (no miss).
- **Miss** = at least one shape in a wrong crate/cell/region.
  - **Miss 1:** each wrong shape hops out (bounce, 300 ms) and is **rolled by the wheel itself**, one after another (900 ms each) — the child watches its dashes print — then sits in the tray wearing its ticket. Right shapes stay put. Hint: A "Count the dashes on its ticket. Which crate has that many?" · B "Look at its ticket: are the dashes all the same? Are the corners little squares?" · C "Look at its ticket. Does it have four dashes? A square corner?"
  - **Miss 2:** those tickets now show a small numeral under every dash (1, 2, 3 …, 12 px) and the destination that fits pulses twice (A: the crate; B: the row header AND the column header that apply; C: the ring tag(s) that apply). Hint: "Count with the numbers, then match the ticket."
- **A new move** (any drag) takes the numerals and pulses away until the next Check. Shapes placed right stay placed after a miss.
- **Success:** the trundle parade (§2). Bubble: A "Yes — {list}!" built from the round's crates, e.g. "Yes — 2 triangles, 3 quadrilaterals and 1 pentagon!" · B "Yes! The square has equal sides AND square corners — so it is a rectangle and a rhombus too." · C "Yes! {k} shapes have four sides and a square corner — they go in both rings."

## 8. Settings (each visibly changes the board at rest)
1. **Board:** sides crates / quadrilaterals / two rules — the right column shows crates, the 2 × 2 cabinet, or the two rings (and the tray loads that board's rounds).
2. **Crates show** (board A only; greyed elsewhere): numbers and names / numbers / names — the crate fronts change (K-075 = numbers only; naming practice = names only, numeral and mini ticket hidden).

## 9. Words (EN source; the other 10 locales authored by hand, then one native + pedagogy reviewer)
- title (in-tool): "Roll and Sort"
- instruction: "Roll a shape along the lane to print its sides. Then put it where it belongs."
- task lines: A "Put each shape in the crate with its number of sides." · B "Put each four-sided shape in its drawer." · B missing "One drawer is empty. Which shape belongs there?" · C "Put each shape in the right ring — or in both, or outside."
- names (singular / plural): triangle(s), quadrilateral(s), pentagon(s), hexagon(s); B celebration: square, rectangle, rhombus.
- hints: hintPlace "Every shape needs a place. Roll one if you are not sure." · hintCount "Count the dashes on its ticket. Which crate has that many?" · hintCabinet "Look at its ticket: are the dashes all the same? Are the corners little squares?" · hintRings "Look at its ticket. Does it have four dashes? A square corner?" · hintNumbers "Count with the numbers, then match the ticket."
- celebrations: as §7 (built per locale from `{n}` + noun functions).
- settings: "Board" · "sides crates" · "quadrilaterals" · "two rules" · "Crates show" · "numbers and names" · "numbers" · "names"
- aria: tray shape "shape {k} of {n}, {rolled|not rolled}" — never its name or side count; after a roll "{n} dashes printed" (the child produced the count by rolling); crates "crate for {n} sides, {name}" (name/numeral per setting); cabinet cells by header pair ("all sides equal, square corners"); rings "ring: four sides", "both rings", "outside".
- **Locale traps:**
  - **Corner names vs side names.** de *Dreieck/Viereck/Fünfeck/Sechseck*, nl *driehoek/vierhoek/vijfhoek/zeshoek*, sv *triangel/fyrhörning/femhörning/sexhörning*, fi *kolmio/nelikulmio/viisikulmio/kuusikulmio* count CORNERS; fr/es/it/pt *quadrilatère/cuadrilátero/quadrilatero/quadrilátero* and da/no *firkant* (kant = edge) count SIDES. The ticket shows both, so the name never fights the apparatus; the de task line may say "Ecken" (the frozen de title says "nach Ecken sortieren").
  - **rhombus:** de *Raute*, fr *losange*, nl *ruit*, sv *romb*, da/no *rombe*, fi *neljäkäs*, es/it *rombo*, pt *losango* — all rhombus words; the square IS a rhombus in all eleven curricula.
  - **square ⊂ rectangle:** fi *suorakulmio* literally means "right-angled figure", so a square naturally belongs; fr/de/sv teach the inclusion later but the cabinet never says "a square is not a rectangle".
  - **no:** *firkant* is also colloquial for "square" — the no names use *kvadrat* (square) and *firkant* (quadrilateral) per LK20; da likewise *kvadrat* / *firkant*.
  - **plural after numerals:** fi partitive singular after a numeral ("2 kolmiota", "1 viisikulmio"); 1 takes the singular in every locale — the celebration is built by a per-locale function, never string-glued.
  - fr U+202F before ! ? : ;
- **Sound off:** the ticket carries the whole count visually (dashes, marks); crates carry numerals/names/mini tickets; nothing needs hearing.

## 10. Sound off, access, phones
- Keyboard path §5; every tray shape, crate, cell and region is a focusable button; the lane rolls with ArrowRight.
- Taps: tray cells ≥ 94 × 80; crates ≥ 78 × 108; cabinet cells ≥ 146 × 100; ring regions ≥ 60 px across at their narrowest (the lens of the two rings is 100 px wide at 360).
- Fold: 360 × 740 → task 48 + lane 118 + tray 2 rows 176 + crates 116 + bubble/Check 60 = 518 px; cabinet 252 → 654; rings 230 → 632. 320 × 640: lane 112, tray 168, crates 104 → 492; cabinet 236 → 624 (Check at 584–624). Check above both folds.
- Phone layout: the board moves under the tray; the lane stays on top (it is the tool).

## 11. Distinct from
- **Row 105 (grade 1) — the sticks-and-joints tray:** a shape is taken APART and its sticks are sorted by length. Here nothing comes apart: the whole shape ROLLS as a wheel and its outline is printed in its own order from a start mark — it is about the loop (counting round without losing your start) and about orientation not mattering, which disassembly never shows; and it carries the two-attribute boards.
- **Row 40 (K) — the number post box** (sticks one per side open a numbered door) and **Row 37** (a brush trace drops corner beads): neither moves the shape; here the shape itself becomes the counting machine.
- **Tool unroll-tape** straightens a strand round a shape to MEASURE the perimeter; this tumbles the shape to PRINT and COUNT sides and corners, with square-corner marks. **Tool sorting-hoops** (hidden rule, the hoop decides) — here the rules are shown as tickets and the child decides; nothing is hidden.
- **New #308 shape-sieve** (quadrilateral sieves) and **#212 geoboard-band** (making shapes) — different verbs; no rolling, no prints.

## 12. Build plan
- **Core state:** `{board:'sides'|'quads'|'rings', cratesShow:'both'|'num'|'name', round, items:[{id, rot, scale, place:null|crateIdx|cell|region, ticket:null|{dashes:[len], marks:['dot'|'sq'], start:int}}], docked:null|itemIdx, rollStep:int, miss, help}`.
- **Core functions:** `geom(id, rot, scale)` → vertices · `sides(v)` · `squareCorners(v)` · `equalSides(v)` · `classify(v)` → `{n, allEqual, allSquare, hasSquareCorner}` · `rollPose(v, step, t)` (rotation about the current front-bottom vertex by t × exterior angle) · `ticket(v, startSide)` → dashes in roll order from the start side, marks between them · `placeOK(item)` (A: n = crate n; B: cell = (allEqual, allSquare); C: region = (n == 4, hasSquareCorner)) · `check()` · `drawer()` (Q5–Q8).
- **Measured by the critic (2026-10-17, `work-c26/g169.js`, `r169.js`):** all 22 shapes convex; interior angles tri_obtuse 45.0/24.1/110.9 · pent_house 141.3/77.3/141.3/90/90 · quad_irreg 76.3/75.6/134.8/73.3 · quad_right_trap 90/115/65/90 · quad_rhombus60 60/120 · quad_kite 79.6/110.2/60/110.2; no corner of any shape lies within 3° of 90° unless it is exactly 90°; equal-side sets exactly as the table.
- **Gate's own ground truth (verify-trundle-wheel-core.js, its own shoelace/angle code):** every catalogue shape is convex; sides / square corners / equal sides recomputed equal the core's; a full roll from ANY start side prints exactly n dashes and n marks and returns to the start side with total rotation 360° ± 0.01°; dash-length ratios = side-length ratios within 0.5 %; square marks exactly at 90° corners; tickets of one shape at different `rot` are cyclic shifts of each other; every round's crates/cells/regions are non-empty (and Q1–Q4 use all four cells); every shape's tip height at roll scale ≤ the lane's shape band (130 px at 704, 84 px at 360); each Q-drawer has exactly one fitting candidate; the position balance of §6.
- **Mutations (each must be killed):** sides read from the catalogue instead of the vertices · the roll stops one side early (n−1) · the start side printed twice (n+1) · an 85° corner marked square · ticket depends on rot · the square refused by the left column · quad_square45 classed as rhombus-not-square · a concave shape admitted · a round with an empty crate · a drawer with two fitting candidates · help survives a new drag · a right shape un-placed by a later miss · crates always in the same order.
- **Pictures to verify:** none.
- **Risks:** the tumble must pivot exactly on the vertex (no sliding) or it reads as wrong physics; hexagon corners tip only 60° — the clack is the landmark. The open corner-square mark (9 px) must stay distinct from the 5 px dash at 360 (draw the mark 2 px outline, the dash solid).
- **BLOCKED:** nothing.

## 13. The four questions
1. **Would a 5–8-year-old choose it again?** Yes — tumbling a lopsided shape along a lane, hearing it clack and watching it print its own footprints, with a bell when it has gone round, is a toy before it is a task.
2. **Would a teacher put it on the board?** Yes — it turns the classic counting mistake (losing your starting place) into something the class can see, proves a turned shape is the same shape, and makes "a square is a rectangle and a rhombus" a visible place in a table instead of a rule to memorise.
3. **Would a parent trust it?** Yes — calm, no score, no words on the apparatus, and every count is derived from the shape itself.
4. **The invention, in one sentence:** every shape is a trundle wheel that prints a dash for each side and a mark for each corner as it tumbles, so its outline comes out as a countable row that ends when the coral side comes round again.

## 14. Critic review (2026-10-17)
Scores before → after: invention 5→5 · fun 5→5 · completeness 4→5 · correctness 4→5 · distinctness 5→5 · reality 4→5
What changed:
- Measured all 22 shapes (convexity, every interior angle, square-corner and equal-side sets): the catalogue is right; no corner sits within 3° of 90° unless it is 90°.
- The roll scale was wrong: perimeter-only scaling put a tipping shape at up to 214 px in a 150 px lane. Now k = min(470/perimeter, 130/longest diagonal); lane 170 px at 704; tickets 285–402 px (360: 184–236 px, tip ≤ 84).
- Q4 left the rhombus cell empty (measured) → kite swapped for a turned rhombus; Q1–Q4 now fill all four cells; Q5–Q8 drawers have exactly one fitting candidate (measured).
- A4 puts 4 shapes in one crate → the rule is now 1–4 per crate, with the measured counts written in.
- Rings: region totals measured (11/9/9/12) and every region occupied every round, so a one-rule bot fails every round; gate asserts it.
