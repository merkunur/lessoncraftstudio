# Row 105 — Is It Still a Triangle? → THE TAKE-APART TRAY (1.G.A.1)

## 0. Identity
- id `sort-bins.defining-attributes.1-g-a-1` (KEPT; slugs, titles and intros frozen in all 11 locales) · grade 1 · CCSS 1.G.A.1 (distinguish defining attributes — closed, number of straight sides — from non-defining attributes — colour, orientation, overall size) · Geometry · own files `take-apart-core.js`, `take-apart-activity.js`, `take-apart-activity.html`, `take-apart-activities.json` (the `sort-bins.defining-attributes.1-g-a-1` row moves out of `sort-bins-activities.json`; the sibling row `sort-bins.sort-by-sides.2-g-a-1` and `sort-bins-core.js` stay untouched).
- worksheets it covers: G1-381 2D Shapes: Real or Not? (L1 — "circle every shape that really is that shape") · G1-382 2D Shapes: Write the Names (L2 — name the shape) · G1-383 2D Shape Riddles (L3).
- old activity: a target name + six shapes (true triangles of different kinds vs other polygons), drag each into the right box. **Kept**: the 8-round target list (triangle, quadrilateral, pentagon, hexagon ×2 each), the shape catalogue ids (`tri_equi`, `tri_right`, `tri_obtuse`, `quad_square`, `quad_rect`, `quad_trap`, `quad_rhombus`, `quad_para`, `pent_reg`, `pent_house`, `hex_reg`, `hex_irreg`) and the two-box sort. **Added**: the non-examples that make 1.G.A.1 bite — an OPEN three-stick shape, a "triangle" with one curved side, a half-circle, a concave four-sider, an L-shaped hexagon, an open six-stick shape — plus disguises the old rounds never used (rotation, tiny size, skinny), and two new levels for the mapped worksheets.

## 1. The pitch
"Tap any shape and it falls apart into its sticks and joints on a tray — a triangle is three straight sticks and three joints, however it was turned, painted or stretched."

## 2. Why a child will want it again
- **Taking things apart.** Every shape is built like a construction-kit model: straight wooden sticks joined by round brass joints. Tap it and it pops apart — sticks fly onto the tray and line up side by side from the longest to the shortest, joints roll into a row of cups beside them. Tap again and they fly back and snap together with a click. It is irresistible to do over and over.
- **The surprise.** The upside-down, tiny, pink, skinny "is that even a triangle?" shape falls apart into exactly three straight sticks and three joints — the same as the big upright one. A curved "triangle" drops a bent stick that wobbles on the tray. The open shape has a stick with a loose end and one joint cup stays EMPTY.
- **The end of the round**: the "yes" box closes its lid, and all its shapes take themselves apart at once and their sticks stack into one bundle that ties itself with a ribbon — three sticks per shape, every bundle the same height of sticks. The tray chimes once per shape.
- **Free play**: a paint pot, a turn knob and a stretch handle sit beside the tray: drag the paint pot onto a shape to change its colour, twist the knob to turn it, pull the handle to make it bigger or smaller — and take it apart again: the sticks never change. (Non-defining attributes, played with.)

## 3. The skill and the misconception
- Skill (1.G.A.1 and G1-381/382/383): a shape's name is decided by what it is made of — closed, straight sides, how many — not by its colour, its size or how it is turned. For squares and rectangles: the side lengths and square corners.
- Misconceptions made visible:
  1. **"A triangle points up"** (prototype thinking): a triangle turned 180°, a long skinny one, a lopsided one are rejected. Push-back: taken apart, they lie on the tray as three straight sticks + three full joint cups — identical in kind to the prototype's.
  2. **"Big shapes and small shapes are different"**: the tiny triangle has short sticks, but three of them.
  3. **"Pointy = triangle"** / **"almost closed counts"**: the open three-stick shape takes apart into three sticks but only TWO joints — one joint cup stays empty, a loose stick end hangs off the tray edge. Closed means every stick end is joined.
  4. **"Curved counts as a side"**: the curved "triangle" drops a bent stick that rocks on the tray; a circle drops one bent hoop and NO joints.
  5. **Square vs rectangle vs rhombus** (L2/L3): sticks line up by length — four equal sticks (square, rhombus) vs two long + two short (rectangle); joints that make a square corner show a small square mark in their cup.

## 4. The stage
At 704 (stacked, stage ≈ 660 × 480):
- **The shelf** (top, 660 × 170): the round's shapes stand on a drawn wooden shelf (#C99A6B, 3 px ink), 6 shapes in a row at 108 px pitch, each in a 100 × 100 box (a shape's model coordinates are in a 100 × 100 box; drawn with **5 px "stick" strokes** in a warm wood tone #B87B3C with a 2 px ink outline, and **joints** as 12 px brass circles #D9A441 at the vertices; the shape's interior is filled with the shape's round colour at 70 % (6 colours: coral, teal, sun, plum, sky, leaf) so colour is a visible, non-defining feature). Scales 0.55 / 0.8 / 1.0 of the box; rotations as listed.
- **The take-apart tray** (centre, 660 × 150): a drawn tray (#FFF8EC with a 3 px ink rim) with a **stick rack** (left 460 px: up to 6 lanes, sticks laid horizontally, left-aligned, sorted longest to shortest, so lengths compare at a glance; a curved stick keeps its curve) and a **joint row** (right 180 px: cups, one per place where two stick ends should meet: cup count = stick ENDS ÷ 2 — an open triangle shows 3 cups with one empty, a half-circle 2 full cups, while a circle's hoop has no ends and shows NO cups; an empty cup is only ever drawn for a shape that really is open). A cup whose joint is a square corner shows a small 10 px square mark (L2/L3 and the "square corners" riddles only).
- **The boxes** (bottom, 660 × 150): L1 — two drawn open boxes, 300 × 130 each: left "{name}" (the target name as a word on the box front — content, 22 px), right "not a {name}" (a full literal phrase per locale, §9). L2 — one **name board** with 4 name tiles (word tiles 140 × 56) and an empty name slot. L3 — the **riddle card** (440 × 120, the riddle text 20 px) with an empty answer frame (110 × 110) beside it.
- **Free-play tools** (to the right of the tray, appear after success): a paint pot (48 px), a turn knob (48 px), a stretch handle (48 px) — drawn geometry.
- Task line above (≤ 24 px). Check button and bubble under the boxes.

At 360 (stacked, stage ≈ 336 × 640): shelf as two rows of 3 shapes (shape boxes 96 × 96 at 108 px pitch; scale 0.55 of a 96 box would be 53 px, under the 64 px floor, so on phones the smallest scale is lifted to 0.68 = 65 px — the order small < medium < big is kept, only the floor rises), tray 336 × 150 (stick rack 230 px, joint row 96 px with cups in two columns), boxes 160 × 120 side by side (L1), name tiles 2 × 2 (150 × 52), riddle card 336 × 110 with the frame (96 × 96) under it. Check at y ≈ 600 at 360 × 740; at 320 × 640 shapes are 88 px boxes (smallest 0.72), tray 320 × 130, Check y ≈ 572.

**No library pictures** — shapes are the content, drawn as geometry (allowed: apparatus geometry, and the shapes ARE the mathematics). The only words: the target name on the box, the riddle, the name tiles (content).

## 5. The hand
1. **Tap a shape** (on the shelf or in a box) → it **takes apart** (≤ 100 ms to start): the joints pop (a tiny scale-up 1.2× then release), the sticks fly to the stick rack in an arc (350 ms, staggered 40 ms), rotating to horizontal and sorting by length; the joints roll into their cups (300 ms). A curved stick keeps its curve and rocks twice (300 ms). For an open shape, the loose end bobs and its joint cup stays empty with a dashed outline. Tap the tray (or the empty shape outline left on the shelf) → everything flies back and snaps together (350 ms, a click per joint). Only one shape is on the tray at a time; tapping another shape first reassembles the current one.
2. **Drag a shape** from the shelf into a box (L1) / the answer frame (L3) → it lifts (1.1×, shadow), follows, drops with a 120 ms settle. A shape in a box can be dragged back (undo). Tap-tap works (tap selects → tap a box), but a tap on a selected shape takes it apart — selection is by a 300 ms press, take-apart by a quick tap (the gate measures both paths).
3. **L2 name tiles**: tap a tile → it slides into the name slot (180 ms); tap the slot to return it.
4. **TTS** (where a voice exists): tapping a box or a tile speaks its word; a long-press on the riddle reads it.
5. **Free play** (after success): drag the paint pot onto a shape (it floods with the next colour, 200 ms), drag the turn knob around (the shape on the tray turns live; dropping the knob on any shape on the shelf or in a box turns that one), pull the stretch handle (it scales 0.5–1.1 live). Take it apart again: the same sticks, longer or shorter, never more or fewer.
- Sound: a wooden *clack* for take-apart, a brass *click* per joint on reassembly, a soft *thunk* in a box.

## 6. The rounds
Shape catalogue (model points in a 100 × 100 box; sticks = edges; joints = vertices where two sticks meet; "open" shapes have a missing joint):
- triangles: `tri_equi` (50,8)(94,84)(6,84) · `tri_right` (12,12)(12,88)(88,88) · `tri_obtuse` (6,72)(94,72)(36,48) (id kept; the old points with apex (30,30) made an ACUTE triangle — the apex angle is now ≈ 119°) · `tri_skinny` (50,4)(62,96)(38,96) · `tri_scalene` (4,60)(96,80)(40,22)
- triangle non-examples: `tri_open` = tri_equi with the joint at (94,84) missing (the two sticks stop 7 units short of each other) · `tri_curved` = tri_equi with the base bowed down into an arc (sagitta 14) · `half_circle` (D shape: one straight stick + one arc, 2 joints)
- four sides: `quad_square` (15,15)(85,15)(85,85)(15,85) · `quad_rect` (5,30)(95,30)(95,70)(5,70) · `quad_rhombus` (50,5)(90,50)(50,95)(10,50) · `quad_trap` (25,25)(75,25)(95,80)(5,80) · `quad_para` (25,25)(95,25)(75,75)(5,75) · `quad_kite` (50,5)(85,40)(50,95)(15,40) · `quad_dart` (concave) (50,5)(90,92)(50,64)(10,92)
- five / six sides: `pent_reg` (regular, r = 46) · `pent_house` (20,45)(50,10)(80,45)(80,92)(20,92) · `pent_irreg` (10,40)(55,8)(92,35)(80,92)(22,85) · `hex_reg` (regular, r = 46) · `hex_irreg` (2,50)(20,18)(82,22)(98,50)(70,90)(24,84) · `hex_L` (L-shape) (10,10)(45,10)(45,60)(90,60)(90,90)(10,90) · `hex_open` = hex_reg with one joint missing
- round: `circle` (r = 46, one closed curved hoop, no joints) · `oval` (rx 46, ry 30)

Notation `id r<deg> s<scale>`; colours are dealt (never by answer).

**Level 1 — Real or not?** (two boxes; G1-381)
| # | target | true ones | false ones |
|---|---|---|---|
| 1 | triangle | tri_equi r0 s1.0 · tri_right r90 s0.55 · tri_obtuse r180 s0.8 | quad_square r45 s0.8 · tri_open r0 s1.0 · pent_reg r0 s0.55 |
| 2 | four-sided shape (quadrilateral) | quad_square r0 s0.55 · quad_rect r30 s1.0 · quad_trap r180 s0.8 | tri_equi r0 s0.8 · pent_house r0 s0.8 · hex_reg r0 s0.55 |
| 3 | pentagon | pent_reg r36 s0.8 · pent_house r180 s1.0 | tri_right r0 s0.8 · quad_rhombus r0 s0.8 · hex_irreg r0 s1.0 · circle s0.55 |
| 4 | hexagon | hex_reg r0 s0.55 · hex_irreg r90 s1.0 · hex_L r0 s0.8 | tri_obtuse r0 s0.8 · quad_para r0 s1.0 · pent_reg r0 s0.8 |
| 5 | triangle | tri_skinny r0 s1.0 · tri_scalene r200 s0.55 | quad_rect r0 s0.8 · tri_curved r0 s1.0 · quad_trap r180 s0.8 · half_circle r270 s0.8 |
| 6 | four-sided shape | quad_rhombus r0 s0.8 · quad_para r150 s0.55 · quad_dart r0 s0.8 · quad_kite r20 s1.0 | tri_right r0 s0.8 · oval s1.0 |
| 7 | pentagon | pent_reg r0 s0.55 · pent_house r90 s0.8 · pent_irreg r0 s1.0 | tri_equi r0 s0.8 · quad_square r45 s1.0 · hex_irreg r0 s0.8 |
| 8 | hexagon | hex_reg r30 s1.0 · hex_irreg r0 s0.55 | tri_right r0 s0.8 · quad_rect r0 s1.0 · hex_open r0 s0.8 · pent_irreg r180 s0.8 |
| 9 | circle | circle s0.55 · circle s1.0 | oval s0.8 · half_circle r0 s0.8 · hex_reg r0 s0.8 · tri_curved r0 s0.8 |

Every round has at least one "disguised true" (turned ≥ 90°, scale 0.55, skinny/lopsided or concave) and at least one "nearly" false (open, curved, one side too many or too few). True count per round: 2–4.

**Level 2 — Name it** (one shape at a time, 4 name tiles; G1-382)
| # | shape | right name | tiles offered (right one + 3) |
|---|---|---|---|
| 1 | tri_obtuse r180 s0.8 | triangle | triangle, square, pentagon, circle |
| 2 | quad_square r45 s0.8 | square | square, triangle, hexagon, circle (never "rectangle" — a square IS a rectangle, so it cannot be a wrong tile) |
| 3 | quad_rect r90 s1.0 | rectangle | rectangle, square, triangle, pentagon |
| 4 | hex_irreg r0 s1.0 | hexagon | hexagon, pentagon, rectangle, circle |
| 5 | pent_house r0 s0.8 | pentagon | pentagon, hexagon, triangle, square |
| 6 | half_circle r0 s0.8 | half-circle | half-circle, circle, triangle, rectangle |
| 7 | tri_skinny r150 s1.0 | triangle | triangle, rectangle, hexagon, half-circle |
| 8 | circle s0.55 | circle | circle, half-circle, square, pentagon |
| 9 | quad_rect r0 s0.55 | rectangle | rectangle, square, hexagon, triangle |

**Level 3 — Riddles** (riddle card + three shapes on the shelf; G1-383)
| # | riddle (EN) | answer | the other two |
|---|---|---|---|
| 1 | "I have 3 straight sides and 3 corners. What am I?" | tri_equi r180 s0.8 | quad_square r0 s0.8 · pent_reg r0 s0.8 |
| 2 | "I have 4 sides, all the same length, and 4 square corners." | quad_square r30 s0.8 | quad_rect r0 s0.8 · quad_rhombus r0 s0.8 |
| 3 | "I have 4 sides and 4 square corners. Two sides are long and two are short." | quad_rect r0 s1.0 | quad_square r0 s0.8 · quad_para r0 s0.8 |
| 4 | "I am closed, and I have 3 straight sides." | tri_obtuse r90 s0.8 | tri_open r0 s0.8 · tri_curved r0 s0.8 |
| 5 | "I have 5 sides and 5 corners." | pent_house r180 s0.8 | hex_reg r0 s0.8 · quad_trap r0 s0.8 |
| 6 | "I have 6 straight sides." | hex_L r0 s0.8 | pent_reg r0 s0.8 · quad_rect r0 s0.8 |
| 7 | "I have one straight side and one curved side." | half_circle r90 s0.8 | circle s0.8 · tri_equi r0 s0.8 |
| 8 | "I have no corners and no straight sides." | circle s0.8 | half_circle r0 s0.8 · hex_reg r0 s0.8 |
| 9 | "I have 4 sides, all the same length, but no square corners." | quad_rhombus r0 s0.8 | quad_square r0 s0.8 · quad_rect r0 s0.8 |

Riddle 6's answer is the L-shaped hexagon on purpose (a hexagon that looks nothing like the honeycomb prototype); riddles 2 and 9 split square from rhombus only by the square-corner mark.

- **Answer position**: shelf positions are dealt fresh per pass; in L1 every shelf slot holds a true shape with p ∈ [true share ± 0.06] over 2,000 deals, and the two disguised-true shapes are never both at the ends; in L2 the right tile is each tile slot ⌈9/4⌉ or ⌊9/4⌋ times per pass; in L3 the answer is each of the 3 shelf slots 3 times per pass. A "put everything that looks like the first one in the yes box" bot (nearest-prototype matcher by outline similarity) must fail ≥ 1 shape in every L1 round (gate).
- **Order**: order-only reshuffle per pass per level; L1 #1 always opens.

## 7. Check, the misses, the success
- **Check with shapes still on the shelf (L1) / empty slot or frame (L2/L3)** → no miss; the unplaced shapes bob once; bubble: "Put every shape in a box first." / "Choose a name." / "Put a shape in the frame."
- **Miss 1** → every misplaced shape **takes itself apart** in place, one after another (or the chosen L2/L3 shape does), and its sticks and joints lie on the tray long enough to read (stays until the next move); the box's own rule is shown as a **stick pattern** on the box front for the rest of the round: three small stick icons + three joint dots under "triangle" (for "not a triangle" nothing changes). Bubble by cause:
  - a true shape in "not": "Take it apart: {count} straight sticks and {count} joints. Turning and painting don't change that."
  - an open shape in "yes": "One joint cup is empty — this shape is not closed."
  - a curved one in "yes": "One stick is bent. A {name} has only straight sides."
  - wrong side count: "Count the sticks: {count}. A {name} has {n}."
  - L2/L3: "Take it apart and count the sticks." (+ "Line up the sticks — are they all the same length?" for square/rectangle/rhombus)
- **Miss 2** → the stronger showing: the misplaced shape is taken apart AND the target prototype (`tri_equi r0` for triangles, etc.) is taken apart beside it on a second tray row, stick for stick, joint for joint: same count / different count is visible side by side; for open shapes the empty cup flashes. Bubble: "Look at both trays — do they have the same sticks and joints?"
- A new move clears the stick pattern help and reassembles the shapes (help taken away until the next Check).
- **Success** → L1: the "yes" box's lid closes, all its shapes take themselves apart at once, and their sticks gather into bundles of {n} that tie themselves with a ribbon (600 ms) — every bundle the same count; bubble: "Every {name} has {n} straight sides, big or small, turned or not!" (circle: "Every circle is round all the way, with no corners!"). L2: the name tile glows and the shape spins once on the tray; bubble: "{Name} — {n} straight sides!" (circle / half-circle: their own lines). L3: the riddle card flips to show the shape's stick bundle; bubble: "Riddle solved: I am a {name}!"

## 8. Settings (each visibly changes the board at rest)
1. **Take-apart tray**: open (default; the tray is visible and any shape may be taken apart before deciding) · help only (the tray is folded away into a slim closed drawer at rest — shapes come apart only at a miss) — for children who should judge by looking first.
2. **Shapes**: 6 (default) · 4 per round (L1 only: the shelf shows 4 shapes — the round keeps its disguised-true and its nearly-false shapes, drops one of each other kind).
Level picker (shell): Real or not? · Name it · Riddles.

## 9. Words (EN source)
- title (frozen): Defining Attributes of Shapes — Is It Still a Triangle? (Grade 1 Geometry)
- instruction: "Tap a shape to take it apart. Sort by its sticks — not by its colour, size or turn."
- task lines: L1 "Which are real {namePlural}? Put them in the {name} box." · L2 "What is this shape called?" · L3 "Read the riddle. Which shape is it?"
- box labels (L1): "{name}" / "not a {name}" — names: triangle, four-sided shape (quadrilateral), pentagon, hexagon, circle.
- name tiles: triangle, square, rectangle, pentagon, hexagon, circle, half-circle.
- riddles: the table above (EN).
- hints and celebrations: §7.
- settings labels: "Take-apart tray" — "open" / "help only"; "Shapes" — "6" / "4"; levels "Real or not?" / "Name it" / "Riddles".

**Locale traps**:
- **Negation box labels are full literal phrases per (target, locale)** (§A.13.61 negation corollary), never a `not a {name}` token: de *kein Dreieck* / *kein Viereck* / *kein Fünfeck* / *kein Sechseck* / *kein Kreis* (gender: *kein* for n. and m. nominative), fr *pas un triangle*, es *no es un triángulo* (es/pt/it plural or singular per the box style — choose singular "no es un…" consistently), pt *não é um triângulo*, it *non è un triangolo*, nl *geen driehoek*, sv *inte en triangel*, da *ikke en trekant*, no *ikke en trekant*, fi *ei kolmio*.
- **"Quadrilateral" at grade 1**: use each locale's school word for a four-sided shape — de *Viereck*, fr *quadrilatère* is CP-acceptable but *figure à quatre côtés* clearer, es *cuadrilátero*, nl *vierhoek*, sv *fyrhörning*, da *firkant*, no *firkant*, fi *nelikulmio*. The EN box reads "four-sided shape"; the aria adds "(quadrilateral)".
- **Square ⊂ rectangle**: never offer "rectangle" as a wrong tile for a square in any locale (gate rule). Note de *Rechteck* / *Quadrat*, da/no *rektangel* / *kvadrat*, fi *suorakulmio* / *neliö* — and fi *nelikulmio* (quadrilateral) vs *neliö* (square) are look-alikes: the reviewer checks the L1 box vs the L2 tile never collide.
- **"Corners" vs "vertices"**: grade-1 word in each locale (de *Ecken*, fr *sommets* vs *coins* — school uses *sommets*; es *vértices* vs *esquinas* — es-MX school *vértices*; sv *hörn*, fi *kulmat*); "square corner" (fr *angle droit*, de *rechter Winkel*, sv *rät vinkel*, fi *suora kulma*) — the riddle wording follows the national school word.
- **Half-circle**: de *Halbkreis*, fr *demi-cercle*, es *semicírculo*, fi *puoliympyrä*.
- **Riddle grammar**: first-person shape riddles are natural in all 11 ("Ich habe 3 gerade Seiten"); numerals are written as digits (no number-word agreement issues); fi partitive after numbers (*3 suoraa sivua*), da/no/sv plural agreement of *rette sider*/*raka sidor*.
- TTS optional; the sticks carry the meaning with the sound off.

## 10. Sound off, access, phones
- Sound off: the take-apart, the empty joint cup, the bent stick, the side-by-side trays and the stick bundles carry every result.
- Keyboard: Tab to a shape, Space takes it apart / reassembles, Enter lifts it, Left/Right picks a box, Enter drops; L2 Tab through tiles; L3 Tab to a shape, Enter places it in the frame.
- aria: each shape `aria-label="shape {n}: {colour}, turned, small|medium|big"` (deliberately NOT its name in L2/L3, and not its side count — that would answer the question); after take-apart the live region announces "{k} straight sticks, {j} curved, {m} joints, {e} empty".
- Taps: shapes ≥ 88 px boxes, tiles 140 × 56 (phone 150 × 52), tray tap area full width.
- Shape short side ≥ 64 px at every width (scale floor lifted on phones, §4).
- Check above the fold: y ≈ 600 at 360 × 740, y ≈ 572 at 320 × 640.

## 11. Distinct from
- **New 212 The Geoboard Band** (stretch a band peg to peg; the board reads back corners, matching sides, square corners): the child BUILDS a shape. Here the child TESTS given shapes by disassembling them; the reading is the child's own (sticks on a rack, joints in cups), and the point is invariance under colour/size/turn.
- **Row 40 Number Post Box** (a shape-sorter with numbered slots): no slots, no stick-count doors; boxes take any shape and judgement comes at Check.
- **shape-stretcher tool** (one shape, tags for equal sides / square corners that turning never removes): a single shape with attribute tags; here a set of disguised shapes, disassembly into parts, open/curved non-examples.
- **sort-bins.sort-by-sides.2-g-a-1** (the sibling row, sorting by number of sides into three bins) keeps the old engine; this row now owns defining-vs-non-defining with the take-apart.
- No built invention reused.

## 12. Build plan
- **Core** `TakeApartCore`: shapes as `{id, points, closed, edges:[{a,b,kind:'line'|'arc',sagitta?}], transform:{r,s}, colour}`; functions `takeApart(shape)` → `{sticks:[{length, curved}], joints:[{filled, square}]}` (lengths in model units after scale; joints = closed vertices; cups = stick ends ÷ 2 (a closed hoop has no ends → 0 cups); an open vertex = an empty cup; square = |angle − 90°| < 2°); `sides(shape)` = straight edges; `isClosed`, `curvedCount`; `nameOf(shape)` (triangle 3 straight closed; quadrilateral 4; square = 4 equal (±1 %) + 4 square corners; rectangle = 4 square corners; rhombus = 4 equal, no square corners; pentagon 5; hexagon 6; circle = 1 closed arc, 0 joints; half-circle = 1 line + 1 arc closed); `belongs(shape, target)`; `checkL1/L2/L3`; `deal(rng)`.
- **Gate's own ground truth** (`verify-take-apart-core.js`): the gate recomputes every shape's attributes from the catalogue points with its own geometry (edge count, closure, curvature, side-length equality, right angles) — never calling the core; asserts (a) each L1 round's true/false split equals the gate's classification; (b) every round has a disguised true and a nearly false; (c) L2: exactly one tile names the shape, "rectangle" never offered for a square; (d) L3: exactly one of the three shapes satisfies the riddle's attribute list (the riddle is stored with a machine attribute list `{straight:3, closed:true}` etc. that the gate checks against the EN text's numbers); (e) transforms never change `takeApart` counts (property test over 1,000 random r/s/colour); (f) the prototype-matcher bot fails ≥ 1 shape per L1 round; (g) the phone scale floor keeps every shape's short side ≥ 64 px at 320; (h) answer-position balance.
- **Mutations**: `takeApart` counts an open vertex as a joint · a circle shows an empty cup (cups not derived from stick ends) · a curved edge counted as a straight side · rotation changes the side count (transform applied to the count) · square accepted for "rectangle" tile as wrong · rhombus named square (square-corner check skipped) · L1 accepts a curved triangle · prototype bot passes a round (disguise removed) · empty cup not drawn · help persists after a new move · Check with unplaced shapes counts a miss · colour dealt by answer (true shapes always coral).
- **No pictures.** Risks: (1) quick-tap vs press-drag disambiguation on touch — the gate drives both with real pointer events at every width; (2) the L-shaped hexagon may surprise teachers — the success line names it ("an L can be a hexagon too: 6 straight sides"); (3) the fi *nelikulmio*/*neliö* collision (reviewer).
- **Nothing BLOCKED.**

## 13. The four questions
1. **Would a 5–8-year-old choose it again?** Yes — taking a model apart and snapping it back together is a toy in itself, and the paint pot, turn knob and stretch handle invite them to try to "break" a triangle and find they can't.
2. **Would a teacher put it on the board?** Yes — it is the defining/non-defining attribute lesson made physical: count the sticks, check every joint is closed, sticks must be straight; the disguised shapes and the open/curved near-misses are exactly the 1.G.A.1 examples, and riddles and naming cover the worksheets.
3. **Would a parent trust it?** Calm, clear geometry, no score; words only where they are the content.
4. **The invention in one sentence:** tap any shape and it falls apart into its straight sticks and its joints on a tray — the same sticks however the shape was turned, painted or stretched, with an empty joint cup if it was never closed.

## 14. Critic review (2026-10-17)
Scores before → after: invention 5→5 · fun 4→5 · completeness 4→5 · correctness 4→5 · distinctness 5→5 · reality 5→5
What changed:
- **Cup rule fixed.** "As many cups as sticks" would have shown a circle (one hoop) with one EMPTY cup — telling the child a circle is open, the opposite of the lesson. Cups are now stick ends ÷ 2: a hoop has no ends and no cups; an open triangle shows 3 cups with one empty. Mutation added.
- **`tri_obtuse` was acute** at the old points (all three angles < 90°); new points give a ≈ 119° apex, id kept.
- Shape rules re-checked: a square is never offered as a wrong "rectangle" (gate rule kept, all locales); the concave dart and the L-hexagon are TRUE members of their families; the open triangle, open hexagon, curved "triangle", half-circle and oval are the non-examples; riddles 2/3/9 each admit exactly one of their three shapes (square / rectangle / rhombus separated by one attribute each).
- Fun: the turn knob now works on any shape (shelf or box), so "try to break a triangle" is a real between-rounds game.
