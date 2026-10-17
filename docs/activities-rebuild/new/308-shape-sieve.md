# New 308 — The Shape Sieve: THE NAME STAMPS ON THE WAY DOWN (3.G.A.1)

## 0. Identity
- id `shape-sieve.play.3-g-a-1` · grade 3 · CCSS 3.G.A.1 · strand Geometry · key `shape-sieve` → `mini tools/shape-sieve-core.js`, `shape-sieve-activity.js`, `shape-sieve-activity.html`, `shape-sieve-activities.json` (scaffold `node scripts/new-activity.js --num=308`). 0 lines to `lcs-shell.*` or any shared core.
- worksheets it covers: **G3-340 "Quad Squad"** ("Is it a rectangle? Squares are rectangles too. Draw a line from each shape to the right box"): every round asks the same question the sheet asks — which boxes does this shape belong in — and level 1's rectangle tray takes every square, turned or not, exactly as the sheet's key does.
- new instrument (no old activity). New metadata for all 11 locales at build (title "The Shape Sieve", grade 3).

## 1. The pitch
"Drop a shape into the sieve tower: every sieve it falls through stamps its name on it — so a square comes out the bottom carrying four names, because it passed every test."

## 2. Why a child will want it again
- **A gravity machine.** A shape is a stiff card that drops down a glass tower of four sieves. Each sieve is a little test bench that really does something: lights run along the sides counting them, four set-squares clamp into the corners, a pair of dividers walks from side to side. Then the floor of the sieve *clacks* open (or stays shut) and the shape falls — or rests.
- **The stamps.** Every time a shape passes a test, a rubber stamp on that sieve comes down *thunk* and prints that sieve's mark on the card. A square lands in the bottom tray covered in four stamps — the child watches the "only one name" idea break in front of them.
- **The bet.** Before the drop the child bets: tap the tray where it will end up. Watching your bet come true (or the shape sail straight past your tray) is the reason to press Next.
- **The turn knob (the misconception in your own hand).** Every landed card grows a round turn knob (44 px). Twist it and the card spins on the bench in 15° clicks; pull the lever again and it drops through the same tests to the same tray — a square turned into a "diamond" lands in the square tray again, with the same four stamps. Children twist a square every way they can think of, trying to fool the sieve; it cannot be fooled.
- **The workbench (free play).** Between rounds the shape on the bench has four round corner grips. Drag them on the dot grid to make any four-sided shape, then press the chute lever and drop it. Children try to make "a shape that gets stuck at the very top" or "a sneaky square nobody notices". Not graded.
- No timer, no score, no streak, no lives.

## 3. The skill and the misconception
- **Skill (3.G.A.1):** shapes in different categories share attributes, and the shared attributes define a larger category. Rectangles, rhombuses and squares are all quadrilaterals; a square is a rectangle *and* a rhombus; and some quadrilaterals are none of these (trapezoid, kite) — "draw examples of quadrilaterals that do not belong" is the build round (§6).
- **Misconceptions and how the material pushes back:**
  1. *"A square is not a rectangle."* The corner sieve does not know what a square looks like — it only clamps four set-squares. A square passes and drops to the rectangle level, and gets the right-angle stamp, in plain sight.
  2. *"A tilted square is a diamond, not a square."* The tests turn with the shape: the set-squares swing to each corner wherever it points, and the dividers measure along each side however it lies. Turned squares pass every test exactly like upright ones. (Rounds turn squares in 4 of 5 squares.)
  3. *"A shape is only one thing."* The stamps accumulate. The bottom tray is under *both* the rectangle sieve and the rhombus sieve, so a square physically falls through both — and the bubble reads back every stamp.
  4. *"Two square corners make a rectangle"* / *"two equal sides make a rhombus"* (the near misses). The right trapezoid gets two set-squares flush and two with a light gap; the kite's dividers fit two sides and miss two. The sieve floor stays shut: you can see exactly which corner or side stopped it.

## 4. The stage
**At 704 (layout `split`).** Apparatus column 452 px wide, bubble column 200 px.
- **The chute** (top, 452 × 150): a short glass slide with the round's shape card resting on it, drawn at grid unit u = min(22, 132 ÷ the shape's box height) px — the widest box (9 × 4 u, L1-8 / L2-5) is 198 × 88 px, the tallest (6 u: L2-4, L2-8) 132 px tall. A lever (48 × 48) on its right.
- **The sieve tower** (452 × 420), four levels, each a pale glass shelf with a drawn tray front:
  - **Level 0 — the top tray** "stays here": the first sieve's grid sits under it. Mark on the tray front: a crossed four-dot glyph (four dots with one struck through).
  - **Level 1 — the four-sides sieve** and below it the **quadrilateral tray**. Mark: four dots joined in a loop (four corners, four straight sides).
  - **Level 2 — two sieves side by side**, the **corner sieve** (left, mark: a right-angle square ⌐) and the **side sieve** (right, mark: two little equal ticks). Under the corner sieve's left half is the **rectangle tray**; under the side sieve's right half the **rhombus tray**. The two sieves *overlap* in the middle third — their grids cross like a lattice there.
  - **Level 3 — the square tray**, directly under the overlap. Its mark is both marks together (⌐ plus ticks).
  - Each tray front is 120 × 52 px (tap target for the bet); the square tray is 150 × 56. Tray contents drawn at 0.6 scale after landing.
- **The stamps**: one rubber-stamp block (30 × 24) on each sieve's right edge; its mark is the sieve's mark.
- **Bubble column** (200 px): Sprocket-free; the library picture is not needed — the bubble is a plain cream card. Holds the feedback sentence and, after landing, the **name list** (the category words — they are the content).
- **Task line** (above the tower, 20 px, one line): "Where will it land? Tap a tray, then pull the lever."
- **Words on the apparatus:** none. Trays carry marks only; the category NAMES appear in the bubble and on name tags in mode 2 (they are the content being taught).

**At 360 (stacked).** Chute 328 × 100 (u = 14 px; widest box 126 × 56, tallest 84 px); tower 328 × 380 (tray fronts 98 × 46, square tray 120 × 48, all ≥ 44 tall); bubble below the tower, Check/lever row directly under the chute so it sits above the fold. The level-2 sieves sit side by side (each 156 wide, overlapping 52 px in the middle).

**Colours (shell palette, never meaning by colour alone):** shapes in one fill per round (cycling cream-yellow, teal-light, coral-light by round index — never by kind); corner sieve teal ink, side sieve coral ink, square tray both. Every mark is a shape, not only a colour.

**Pictures:** none. All geometry is drawn apparatus (the shapes theme draws each shape in a different colour and calls a turned square "diamond" — refused, see PICTURE-RULINGS).

## 5. The hand
- **Bet (mode "predict the tray"):** tap a tray front → it lifts 4 px and gets a coral bet flag (drawn pennant, 18 px) within 50 ms; tap another tray → the flag moves; tap the same → flag off. Soft wood *tock*.
- **Pull the lever** (= Check in this mode; the shell's Check button does the same): the drop sequence runs, ≈ 3.2 s total, every step answering within 100 ms:
  1. **Four-sides sieve (600 ms):** a light runs along each side in turn; each straight side lights and *ticks* once; a curved side glows coral and the light stops; a shape with 3, 5 or 6 sides shows its count as lit dots (3 or 5 or 6) against the sieve's four holes. Pass → floor clacks open, stamp ⧈ prints, shape drops. Fail → stays on the top tray.
  2. **Level 2 (1,400 ms), both tests at once:** four drawn set-squares swing in to the four corners. A square corner: the set-square lies flush and turns teal. Not square: a light wedge shows between the set-square edge and the side (wedge drawn, ≥ 6 px wide at the corner's arm end). At the same time the dividers (two thin legs, coral) open to the first side's length and walk to the next three sides: they fit (legs land on both corners, a tiny *tink*) or overshoot/fall short (one leg lands off the corner by the length difference, drawn exactly).
  3. **Routing:** all four corners flush → the corner sieve's floor opens; all four sides fit → the side sieve's floor opens. The shape slides left (corner only) to the rectangle tray, right (sides only) to the rhombus tray, straight down through the overlap (both) into the square tray — on the way it passes *through* both open floors and both stamps print. Neither → it stays on the quadrilateral tray.
  4. **Landing (300 ms):** the card settles with a soft bounce; its stamps stay printed on it.
- **Mode "tap every name":** under the tower, five name tags (each 120 × 48 at 704, 98 × 46 at 360): *not a quadrilateral* · *quadrilateral* · *rectangle* · *rhombus* · *square*, each with its mark. Tap a tag to clip it to the shape (tag flips onto the card's edge, 80 ms); tap again to unclip. Check runs the same drop and the stamps check the tags.
- **Undo:** everything before Check is free to change. After a landing the shape stays in its tray until Next.
- **Turn knob (after a landing):** drag round the knob (or ←/→) → the card rotates in 15° clicks about its centre (integer vertices are kept; the drawing turns, the tests read the integer vectors, so no rounding can change a verdict); the lever re-drops it. Not graded — the round is already won.
- **Workbench (free play):** after a round lands, a fresh card with four corner grips (44 px hit circles, 16 px drawn) appears on the chute on a dot grid (u as above); grips snap to grid dots; the lever drops it through the real tests. Hidden while a task is unanswered.
- **Keyboard:** Tab through tray fronts / tags, Space to bet / clip, Enter = lever. Workbench grips: Tab to a grip, arrow keys move one dot.

## 6. The rounds
One round = one shape card. The shape's vertices are integer grid points (exact: equal sides = equal squared lengths, square corners = zero dot product), drawn at the stage unit.

**Level 1 — "rectangles, squares, rhombuses" (12 drop rounds; deepest tray 3 × top, 3 × rectangle, 3 × rhombus, 3 × square; + 1 build round):**

| # | shape | vertices (grid) | lands in |
|---|---|---|---|
| L1-1 | square, upright | (0,0)(4,0)(4,4)(0,4) | square |
| L1-2 | square turned 45° | (2,0)(4,2)(2,4)(0,2) | square |
| L1-3 | square tilted ≈18° | (0,1)(3,0)(4,3)(1,4) | square |
| L1-4 | rectangle, wide | (0,0)(6,0)(6,3)(0,3) | rectangle |
| L1-5 | rectangle, tall | (0,0)(2,0)(2,5)(0,5) | rectangle |
| L1-6 | rectangle turned 45° | (0,3)(3,0)(5,2)(2,5) | rectangle |
| L1-7 | rhombus, diamond | (0,2)(3,0)(6,2)(3,4) | rhombus |
| L1-8 | rhombus, leaning | (0,0)(5,0)(8,4)(3,4) | rhombus |
| L1-9 | rhombus in a square box | (0,0)(3,1)(4,4)(1,3) | rhombus |
| L1-10 | triangle | (0,4)(3,0)(6,4) | top |
| L1-11 | pentagon | (0,2)(3,0)(6,2)(5,5)(1,5) | top |
| L1-12 | rectangle with one curved side | (0,0)(5,0)(5,4)(0,4), right side an arc | top |
| L1-13 | **build:** "Make a rectangle that is not a square." | child drags the 4 grips | four square corners, sides not all equal |

**Level 2 — "also trapezoids and kites" (10 drop rounds, 2 per tray, + 2 build rounds):**

| # | shape | vertices | lands in |
|---|---|---|---|
| L2-1 | small square turned | (1,0)(3,1)(2,3)(0,2) | square |
| L2-2 | big square tilted | (0,1)(4,0)(5,4)(1,5) | square |
| L2-3 | long rectangle | (0,0)(7,0)(7,2)(0,2) | rectangle |
| L2-4 | rectangle turned 45° in a square box | (0,4)(4,0)(6,2)(2,6) | rectangle |
| L2-5 | wide rhombus | (0,0)(5,0)(9,3)(4,3) | rhombus |
| L2-6 | rhombus in a square box | (0,0)(4,1)(5,5)(1,4) | rhombus |
| L2-7 | right trapezoid (2 square corners) | (0,0)(6,0)(4,4)(0,4) | quadrilateral |
| L2-8 | kite (1 square corner, 2 pairs of equal sides) | (3,0)(5,2)(3,6)(1,2) | quadrilateral |
| L2-9 | hexagon | (1,0)(4,0)(5,2)(4,4)(1,4)(0,2) | top |
| L2-10 | right triangle | (0,0)(0,5)(4,5) | top |
| L2-11 | **build:** "Make a four-sided shape that stops on the quadrilateral tray." | child drags the 4 grips | any shape the tests leave on that tray |
| L2-12 | **build:** "Make a rhombus that is not a square." | child drags | equal sides, not four square corners |

Measured (critic, `work-c37/sieve.js`, own oracle): every classification recomputed from integer dot products and squared lengths; squares turned in L1-2, L1-3, L2-1, L2-2 (≥ 2 ✓), non-square rhombuses L1-7/8/9, L2-5/6 (≥ 2 ✓); no two drop rounds are congruent, across BOTH levels (the designer's L2-6 was L1-7 turned 90° — replaced). Smallest corner that is not square: 67.4° (L1-7) — the set-square wedge is never thin. Side-count is only a test, not a tell: all four four-sided trays get 3 (L1) / 2 (L2) shapes.

**Answer position.** The answer is a tray, and trays are fixed places, so balance is by count: L1 3/3/3/3, L2 2/2/2/2/2 (+ two build rounds with no fixed tray). Shortcut bots, measured on the four-sided rounds:
- "has a level side → rectangle (square if the box is square); no level side → rhombus": 5/9 in L1, 2/8 in L2 — it fails every turned square and turned rectangle.
- "bounding box is square → square": fails L1-6 (rectangle, 5 × 5 box) and L1-9 (rhombus, 4 × 4 box), and in L2 the new L2-4 (rectangle, 6 × 6 box) and L2-6 (rhombus, 5 × 5 box). (The designer's L2 failed this bot in NO round — its L2-4 box is 5 × 4 — so its own gate line "fails ≥ 2 rounds per level" would have refused the table.)
- "always the most common tray": 3/12 and 2/10.
Shape size does not tell: the biggest shape in L1 is a rhombus, the smallest in L2 is a square; rectangles span 2 × 5 to 7 × 2.

**Mode "tap every name":** same shapes; the right set is computed from the tray: square → {quadrilateral, rectangle, rhombus, square}; rectangle → {quadrilateral, rectangle}; rhombus → {quadrilateral, rhombus}; quadrilateral → {quadrilateral}; top → {not a quadrilateral}. Tag order on screen is fixed (it is a list of names, not an answer position); the set size varies 1–4.

**Order:** order-only reshuffle per pass, never the same order twice; the build round(s) always come last (L1-13; L2-11, L2-12).

## 7. Check, the misses, the success
- **Check with nothing done** (no bet / no tag): the tower shakes its lever once; hint "Tap the tray where you think it will land." / "Tap every name that fits it." — no miss.
- **Miss 1** (shape lands somewhere else than the bet, or the tag set is wrong): the drop has already shown the truth. The tray the child bet on blinks its mark twice, and the *test that decided* replays slowly (1.5×): if the bet was too deep, the failing set-square wedge or the divider leg that missed is drawn and held, glowing; if too shallow, the test the child forgot passes again with its stamp re-printing. The shape goes back up the chute.
  - Hint (too deep): "Look at the corner the set-square did not fit." / "Look at the side the dividers did not fit."
  - Hint (too shallow, e.g. bet rectangle for a square): "It passed the corner test — and the side test too. Where does a shape go that passes both?"
  - Hint (sideways — bet rhombus, it is a rectangle, or the other way): "It passed the corner test, not the side test." / "It passed the side test, not the corner test." (the passing test replays with its stamp, the failing one with its wedge or off-corner divider leg).
  - Hint (tags missing): "It got more stamps than you gave it names. Count the stamps."
  - Hint (extra tag): "One of your names needs a stamp it did not get."
- **Miss 2:** before the next drop the shape shows its measurements on itself: every square corner gets a small square mark, every non-square corner a curved arc; equal sides get matching tick marks (1, 2 or 3 ticks per length class). The bet tray glows only after the child bets again.
  - Hint: "Now the corners and sides are marked. Which tests can it pass?"
- A new bet or tag change takes the marks away until the next Check.
- **Success:** the shape settles in the tray with its stamps; the bubble lists the names in order from the biggest family to the smallest, each with its mark:
  - square: "Yes! It passed every test: a quadrilateral, a rectangle, a rhombus — and a square."
  - rectangle: "Yes! Four square corners: a quadrilateral and a rectangle."
  - rhombus: "Yes! Four equal sides: a quadrilateral and a rhombus."
  - quadrilateral: "Yes! Four straight sides, but not four square corners or four equal sides: a quadrilateral."
  - top: "Yes! It does not have four straight sides, so it stays at the top."
  - The stamps glint once in turn as their names are read.
- **Build rounds:** Check drops the built shape; success if it lands where asked ("Yes! Your shape is a quadrilateral that is none of the others." / "Yes! Four equal sides and no square corners: a rhombus that is not a square."). A built square in L2-12 lands in the square tray: "That one passed the corner test too — so it is a square. Lean it over!" (miss).

## 8. Settings
1. **Shapes:** *rectangles, squares, rhombuses* (L1, the quadrilateral-only tray stays visibly empty with a dashed outline) / *also trapezoids and kites* (L2, the quadrilateral tray is solid and in play). Visible at rest: the dashed vs solid tray.
2. **Mode:** *predict the tray* (the bet flags + lever) / *tap every name* (the name-tag row appears under the tower). Visible at rest.

## 9. Words (EN source)
- title: "The Shape Sieve"
- task line (predict): "Where will it land? Tap a tray, then pull the lever."
- task line (names): "Which names fit this shape? Tap every one."
- build prompts: "Make a four-sided shape that stops on the quadrilateral tray." · "Make a rhombus that is not a square."
- name tags: "not a quadrilateral" · "quadrilateral" · "rectangle" · "rhombus" · "square"
- hints and success sentences: as in §7.
- settings: "Shapes" — "rectangles, squares, rhombuses" / "also trapezoids and kites"; "Mode" — "predict the tray" / "tap every name".
- aria: tray "{name} tray"; shape "a shape with {n} sides"; stamp "stamp: {name}".

**Locale traps.**
- Category words follow each school's own terms (same source as `scripts/worksheet-gen/data/geometry-words.js` for rectangle / not rectangle; author the rest by hand): de *Viereck, Rechteck, Raute, Quadrat* (Raute, not Rhombus, in Grundschule); fr *quadrilatère, rectangle, losange, carré*; es (MX) *cuadrilátero, rectángulo, rombo, cuadrado*; pt-BR *quadrilátero, retângulo, losango, quadrado*; it *quadrilatero, rettangolo, rombo, quadrato*; nl *vierhoek, rechthoek, ruit, vierkant*; sv *fyrhörning, rektangel, romb, kvadrat*; da *firkant, rektangel, rombe, kvadrat*; no *firkant, rektangel, rombe, kvadrat*; fi *nelikulmio, suorakulmio, neljäkäs, neliö*. ⚠ da/no *firkant* is also the everyday word for "square-ish thing" — the reviewer confirms *firkant* vs *firkantet figur*; fi *neljäkäs* is the school word for rhombus (not *vinoneliö*, which some books use — reviewer picks one and the name tags, hints and stamps use it everywhere).
- "Square corner": de *rechter Winkel*, fr *angle droit*, sv *rät vinkel*, fi *suora kulma* — the hints say "square corner" in en only; every locale uses its school term for a right angle.
- Gender/agreement: the success sentences list nouns without articles ("a quadrilateral, a rectangle…" is authored per locale as a list, never assembled from a template with an article slot).
- The name tags sit in a fixed order; the longest word (fi *suorakulmio*, de *Viereck* is short; fr *quadrilatère* 12 letters) must fit 98 px at 16 px Nunito — at 360 the tags may wrap to two lines, never shrink below 14 px.

## 10. Sound off, access, phones
- Legible with the sound off: every test is drawn (light along sides, set-square wedges, divider legs); stamps are printed marks; tray marks are shapes. TTS (5 locales) reads the names on success only.
- Keyboard as §5; the shell's Check = the lever.
- aria-live bubble announces each test result in words: "4 straight sides — yes. Square corners: 4 of 4. Equal sides: 2 of 4." (screen-reader only).
- Taps: tray fronts ≥ 98 × 46, tags ≥ 98 × 46, grips 44 px hit circles, lever 48 px.
- No library pictures, so no picture floor applies; shape cards ≥ 126 px on the long side at 360.
- Fold: at 360 × 740 the chute + lever + bet trays fit in 560 px; at 320 × 640 the tower compresses (level gaps 8 px) and the bubble moves below the fold — Check/lever stays above it.

## 11. Distinct from
- **Row 169 Trundle Wheel** (2.G.A.1) counts sides by rolling; **Row 105 Take-Apart Tray** (1.G.A.1) breaks a shape into sticks to name it; **Row 38 Pip's Museum** (K.G.A.2) clasps close round one shape name. None has categories inside categories.
- **New 212 Geoboard Band** (K.G.B.5) builds shapes with a rubber band and reads back corners/sides. The workbench here is four snapping grips, used only to feed the sieve; the invention is the cascade, not the building.
- **New 309 Corner Card** (this batch): the child operates the corner card by hand to judge angles. Here the set-squares are part of an automatic test the child bets on; the skill is the category hierarchy, not angle judging.
- **New 312 Lasso Hoops** (this batch): sorting pictures by two given attributes. The sieve is a vertical cascade where categories nest; no hoops, no ropes.
- **Premium tool Shape Stretcher**: the teacher drags one shape and watches two tags hold or break. No prediction, no cascade, no stamps, no categories beyond two properties.
- Not in REGISTRY-BUILT.

## 12. Build plan
- **Core state:** `{ level, mode, round:{id, verts:[[x,y]…], arc:bool}, bet:null|tray, tags:Set, misses, phase:'idle'|'dropping'|'landed', build:{verts}|null }`.
- **Core functions:** `sides(verts)` → squared lengths; `corners(verts)` → dot products; `isFourStraight(round)`; `cornerTest(verts)` → `{flush:[bool×4]}`; `sideTest(verts)` → `{fit:[bool×4]}`; `trayFor(round)` → `'top'|'quad'|'rect'|'rhombus'|'square'`; `namesFor(tray)`; `stampsFor(tray)`; `grade(bet|tags)`; `dropScript(round)` → the ordered list of test events the renderer animates (so the animation and the grade come from one function).
- **verify gate (own oracle):** recomputes every round's tray from integer vertices with its own code (never `trayFor`); asserts L1 3/3/3/3 and L2 2/2/2/2/2; ≥ 2 turned squares and ≥ 2 non-square rhombuses per level; no two rounds congruent within a level; every square lands in the square tray in names mode with all four names; the level-side bot scores ≤ 5/9 (L1) and ≤ 2/8 (L2) and the box-square bot fails ≥ 2 rounds per level; no two drop rounds congruent across both levels; the turn knob re-drop lands in the same tray for every round at every 15° turn (24 turns × 22 rounds); `dropScript` events agree with the oracle (a set-square drawn flush only on a zero dot product; divider "fit" only on equal squared lengths); build-round grading accepts every lattice quad in the right class within a 9 × 6 grid (exhaustive enumeration) and rejects every other.
- **Mutations (one per rule):** square counted only as square (names mode drops rectangle) · corner test by `|angle−90|<5` instead of exact dot · side test compares only opposite sides · turned square classified rhombus · curved side counted as straight · square tray reachable from the rectangle sieve alone · stamps not accumulated · bet compared to the first sieve passed instead of the deepest · build round accepts a square as "rhombus not square" · order reshuffle repeats the previous pass.
- **Local test:** real pointer bets on every tray in every round; lever; names mode set toggles; workbench grip drags; widths 320·360·412·704·768·1024·1366; tray fronts and tags ≥ 44 px; no shape card overflows the chute.
- **Pictures:** none to verify (all drawn).
- **Risks:** the drop sequence must stay ≤ 3.5 s (children press Next fast) — a "tap to skip to the landing" on the tower after the first test; divider legs must be visibly off by small differences (the dividers open to side 1 and walk; smallest miss against side 1 in the rounds: L1-6, √18 vs √8 = 1.41 u ≈ 31 px at 704, 20 px at 360 ✓; L2-7 1.53 u, L2-8 1.64 u).
- **Blocked:** nothing.

## 13. The four questions
1. **Would a 5–8-year-old choose it again?** Yes — a marble-run tower with stamps and a bet, plus a workbench to make "a sneaky square".
2. **Would a teacher put it on the board?** Yes — "a square is a rectangle" stops being a rule to memorise: the class watches the square drop past the rectangle sieve and get its stamp, and argues where a right trapezoid will stop before the lever is pulled.
3. **Would a parent trust it?** Calm, drawn geometry only, exact tests, school words in every language, nothing for sale.
4. **The invention:** every sieve a shape falls through stamps its name on it, so the categories nest in front of your eyes and a square arrives with four names.

## 14. Critic review (2026-10-17)
Scores before → after: invention 4→5 · fun 5→5 · completeness 4→5 · correctness 3→5 · distinctness 5→5 · reality 4→5
What changed:
- Re-solved every shape with my own integer oracle. Two defects in the tables: L2-6 was L1-7 turned 90° (congruent), and L2 had NO round where a square bounding box lies — the "box is square → square" bot scored 8/8 and the design's own gate line would have refused it. Replaced L2-4 (rectangle turned 45° in a 6 × 6 box) and L2-6 (rhombus in a 5 × 5 box); re-measured: level-side bot 5/9 and 2/8 (the design said 4/8), box bot fails 2 per level.
- The chute could not hold its own shapes (70 px tall for cards up to 6 u = 132 px): chute 150 / 100 px with a per-shape unit.
- The child's hand now carries the misconception, not only the bet: the turn knob re-drops any landed card at any 15° turn to the same tray; L1 gained a build round (rectangle that is not a square).
- Added the sideways miss (rectangle bet for a rhombus) the hint ladder had no line for; corrected the smallest divider-miss figure (1.41 u, not the kite's 1.6 u).
