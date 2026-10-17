# Row 38 — Professor Pip's Museum: pedestals whose clasps only close round their own shape (K.G.A.2)

## 0. Identity
- id `pip-museum.curate-wing.k-g-a-2` (KEPT; slugs/metadata frozen en, de, fr, es, pt, it, nl — sv/da/no/fi slug, title and intro new at build) · grade K · CCSS K.G.A.2 · strand Geometry · own files at rebuild: `pip-museum-core.js` (new; replaces the shared `curate-wing-core.js` dependency), `pip-museum-activity.js`, `pip-museum-activity.html`, `pip-museum-activities.json`.
- page title (frozen): "Professor Pip's Museum — Name Shapes Any Way They Turn (Kindergarten)"; the frozen intro promises a conveyor of tilted / tiny / stretched / upside-down treasures routed to the pedestal that names them, "a square is a square even when it's turned like a diamond" — all kept, and now *proved* by the clasp.
- worksheets it covers: **K-368** 2D Shapes and **G1-381** Real or Not? (shape hall; fakes go to the Mystery Gallery) · **G1-382** Write the Names (plates show the name only) · **G1-383** Shape Riddles (plates show a riddle) · **G2-243** Solid Shapes Around Us (solids hall: drawn solids routed to real library objects) · **K-241 / K-265** colour by shape code (each pedestal has its colour; on success the museum floor's tiles under the pedestal light in that colour as a shape-coded mosaic of the round's treasures) · **K-359** count triangles and squares (capstone round: Pip asks how many triangles and squares the hall now holds — counted from the clasped treasures).
- old activity: a conveyor and 3 pedestals with colour + nameplate + mini-exemplars, seven facet acts (transformed route, exclude to Mystery Gallery, square-vs-rectangle, name→shape, match pair, confirm Pip's claim, capstone), parametric SVG shapes, an SVG penguin stub. **Kept:** the conveyor, the pedestals, the Mystery Gallery, spin-upright on success, the treasures' disguises (tilt, tiny, stretch, upside-down), the per-locale shape-name tables (`GNAME`, `SHAPE_FR`… with their article-free frames), the round content (triangle/square/circle/hexagon/rectangle routing, rhombus and oval to the Mystery Gallery, the near-square rectangle). **Dropped:** the drawn penguin (now the library `animals/penguin`), the confirm-claim and match-pair facets (folded into routing), the mini-exemplar trios.

## 1. The pitch
"Each pedestal holds a brass clasp built from what makes its shape — three hinged rods for a triangle, four equal rods locked square for a square, a hoop for a circle — so the clasp swings round to meet a treasure however it is turned and stretches to any size, but it can only close round its own shape."

## 2. Why a child will want it again
- **A museum that runs.** Treasures ride up a conveyor belt (rollers turning, a soft rumble) tilted, tiny, stretched, upside-down. The child drags each one onto a pedestal's tray. Pip the penguin, curator, watches from the side.
- **The clasp show.** Check: pedestal by pedestal, the brass clasp lowers over its tray. For the right treasure the rods swing in, turn with the treasure, stretch or shrink, and *click-click-click* lock on each corner — then the treasure spins upright inside its clasp, a spotlight comes on and a velvet rope clips into place. For a wrong one the rods reach, one rod hangs in the air or a corner won't meet, the clasp springs open with a *boing* and the treasure slides back down to the belt. Children love watching a clasp fail.
- **The Mystery Gallery:** a curtained doorway for treasures no pedestal can hold (an oval when there is only a circle hoop, a leaky open triangle, a rhombus). The curtain swishes; Pip nods.
- **Earned show per round:** when every treasure is home, the floor tiles under the pedestals light up in each pedestal's colour, the rope barriers lift, and Pip waddles across the hall (a 900 ms slide with a bob). No timer, score, streak or lives.

## 3. The skill and the misconception
- **Skill:** name shapes whatever their orientation or size (K.G.A.2), by what defines them — straight sides, corners, equal sides, square corners, roundness; reject figures that are not that shape; read shape names and riddles; match a solid (sphere, cube, cylinder, rectangular box) to an everyday object of the same shape (G2-243).
- **Misconceptions and the push-back (by the clasp, not a message):**
  - *A turned square is "a diamond":* the square clasp turns to 45° with the treasure and locks all four corners — it holds; then the treasure spins upright to show it was a square all along. A real rhombus (60°/120°) cannot be held by the square clasp: its four rods are locked at right angles, so two corners stay open.
  - *Size or stretch changes the name:* rods stretch and shrink (the triangle's three rods to any lengths, the rectangle's two pairs), the hoop scales — but the square clasp's four rods must stay equal, so a near-square rectangle (1.15 : 1) leaves a visible step at one corner.
  - *Any round thing is a circle:* the hoop scales but stays round; on an oval it touches two sides and leaves crescent gaps at the other two.
  - *Open or curved figures are shapes:* the triangle clasp's three rods cannot lock on an open triangle (one corner has nothing to meet) or a curved side (the rod stands off the bulge).
  - *Solids — "a ball is a circle", "a can is a rectangle":* in the solids hall each pedestal holds a real object and a wire CAGE of its solid (sphere = three crossed hoops, cube = 12 equal edges, cylinder = two hoops joined by two straight lines, box = 12 edges in three lengths). The cage closes round a drawn solid only if it is the same kind; a cube's corners poke through a sphere cage.

## 4. The stage
**At 704:**
- **Task line** (20 px).
- **The hall** (656 × 420): a cream wall with a teal dado line; **Pip** (`animals/penguin`, 96 px) at the left; **pedestals** across the middle — 3 (or 3 + the Mystery Gallery doorway): each a drawn plinth 132 px wide × 90 px tall with a **tray** on top (132 × 120 zone where routed treasures wait, side by side) and the **clasp** hanging above it in brass (#C79A3B, 4 px rods, 8 px round hinges): visible at rest as a folded clasp, so the child sees what each pedestal is "made of". A **plate** on the plinth front (100 × 36): *names* setting = the shape's name (18 px) + a 24 px canonical outline; *riddles* setting = a riddle line read by TTS plus its icon clue (dots for corners, ticks for equal sides); each pedestal has its colour stripe on the plate.
- **Mystery Gallery** (when present): a doorway 120 × 190 with a teal velvet curtain, at the right end.
- **The conveyor** (656 × 110) along the bottom: a belt with turning rollers carrying 4–5 treasures (each in a 96 × 96 cell, drawn shapes in pastel fills with 3 px ink outlines, disguised by tilt / size 40–100 % / stretch / flip).
- **Solids hall:** the pedestals hold real objects (library pictures, 96 px) beside an open wire cage; treasures are drawn solids (shaded, 3 px ink, 96 px cells).
- Bubble under the belt, Check right.

**At 360:** Pip 64 px tucked at the top-left above the pedestals; pedestals 3–4 in a row, 76 px wide (trays 76 × 84, treasures sit stacked 2 high on a tray), plates 72 × 30 (names 14 px); the conveyor becomes a 2-row tray of treasures (cells 72 px); real objects 64 px. 320: pedestals 70 px.

Pictures (theme JSON + contact sheets): `animals/penguin` (Pip) · solids hall objects: `toys/ball`, `fruits/orange` (spheres) · `toys/dice`, `christmas/present` (cubes) · `at-the-supermarket/can`, `music/drum` (cylinders) · `classroom/book`, `classroom/eraser` (rectangular boxes — the eraser stands upright, the book lies flat, so a box is seen both ways). Refused: `at-the-supermarket/butter` (drawn as a yellow block with holes — every child will call it cheese, and the object's name would be wrong on screen), `shapes/cone` (drawn as a cut-off cone with a flat top — not a cone), `shapes/diamond` (a square turned 45°), `post-office/package` (cube-or-box ambiguous), `classroom/globe` (on a stand), `christmas/candle` (flame). Clasps, cages, plinths, belt, curtain, shapes and solids: drawn apparatus.

## 5. The hand
- **Drag a treasure** from the belt onto a tray (or tap a treasure, then tap a pedestal) → it hops onto the tray (180 ms) and waits there still disguised; trays hold any number. Drag it again to another tray or back to the belt. First response < 60 ms (the treasure lifts with a shadow).
- **Tap a clasp at rest** → it opens and closes once with a brass jingle, showing its rods (free play: children learn what each pedestal is made of).
- **Check** → the clasps work left to right (§7). The belt keeps turning only when it still holds treasures.
- **Keyboard:** Tab to a treasure, Enter picks it up, ←/→ chooses a pedestal (highlighted), Enter drops; Tab to Check.
- **Free play after success:** drag a clasped treasure out and put it on another pedestal to see the clasp refuse it (no miss, nothing changes the round).

## 6. The rounds
A round = one belt of treasures and 3 pedestals (± the Mystery Gallery). Every treasure has exactly one right destination. Transforms: angle in degrees, size as % of the cell, stretch as width:height.

**Shape hall (9 rounds):**
| # | pedestals | belt (treasure → destination) |
|---|---|---|
| 1 | triangle · square · circle | square 30° 50 % → square · triangle 180° 95 % → triangle · circle 40 % → circle · skinny triangle 70° 80 % → triangle |
| 2 | hexagon · triangle · circle | hexagon 30° 95 % → hexagon · triangle 250° 45 % → triangle · irregular hexagon 0° 75 % → hexagon · circle 90 % → circle |
| 3 | circle · square · Mystery | square 45° 70 % → square · rhombus 60° → Mystery · circle 45 % → circle · oval 20° (1.6:1) → Mystery |
| 4 | square · triangle · Mystery | square 10° 35 % → square · rectangle 1.15:1 → Mystery · triangle 120° 70 % → triangle · open square → Mystery |
| 5 | rectangle · hexagon · Mystery | rectangle 1:3 at 60° → rectangle · pentagon → Mystery · rectangle 2:1 at 0° 45 % → rectangle · hexagon 15° → hexagon · rounded-corner rectangle → Mystery |
| 6 | triangle · rectangle · circle · Mystery | triangle with one curved side → Mystery · rectangle 1.6:1 at 100° → rectangle · circle 70 % → circle · obtuse triangle 200° → triangle |
| 7 | hexagon · square · circle | square 60° 95 % → square · hexagon 40 % → hexagon · circle 30 % → circle · square 0° 50 % → square · irregular hexagon 45° → hexagon |
| 8 | circle · rectangle · triangle · Mystery | oval 0° (1.4:1) → Mystery · rectangle 1:5 at 20° → rectangle · open circle (C) → Mystery · triangle 300° 35 % → triangle · circle 100 % → circle |
| 9 (capstone) | triangle · square · hexagon | square 45° → square · hexagon 0° → hexagon · triangle 160° → triangle · square 30 % → square · hexagon 30° → hexagon · triangle 20° 30 % → triangle · triangle 260° stretched → triangle · square 75° → square — then Pip's count (below) |
Squares never ride the belt in a round with a rectangle pedestal (a square IS a rectangle; never asked to be refused by one). Mystery treasures are only things no listed pedestal can name.

**Capstone count (round 9):** the belt is eight treasures long; after the hall is complete Pip lifts a sign with two chip rows (a triangle row and a square row, chips 1–6, the row's outline at its left): "How many triangles? How many squares?" Answer from the clasped treasures: triangles 3, squares 3 (hexagons 2 are the distractor). Wrong chip = a miss with the same ladder as #37's count (pulse one by one, then numerals).

**Solids hall (8 rounds)** — pedestals hold objects; the belt carries drawn solids:
| # | pedestals (object = solid) | belt (solid → destination) |
|---|---|---|
| 1 | ball (sphere) · dice (cube) · can (cylinder) | sphere 70 % → ball · cube turned 20° → dice · cylinder lying on its side → can · cube 45 % → dice |
| 2 | orange (sphere) · book (box) · drum (cylinder) | box lying flat → book · sphere 40 % → orange · cylinder upright 95 % → drum · box standing on end → book |
| 3 | dice (cube) · can (cylinder) · Mystery | cylinder 50 % → can · cone → Mystery · cube 35° 95 % → dice · pyramid → Mystery |
| 4 | ball (sphere) · eraser (box) · Mystery | long box → eraser · sphere 100 % → ball · cone → Mystery · box upright → eraser |
| 5 | present (cube) · drum (cylinder) · orange (sphere) | cube 15° → present · cylinder lying → drum · sphere 30 % → orange · cylinder upright 50 % → drum |
| 6 | ball (sphere) · can (cylinder) · book (box) · Mystery | box → book · cylinder → can · sphere → ball · pyramid → Mystery · box turned 30° → book |
| 7 | present (cube) · orange (sphere) · can (cylinder) | cube → present · sphere → orange · cylinder lying → can · cylinder upright 35 % → can |
| 8 | eraser (box) · drum (cylinder) · Mystery | box → eraser · cylinder → drum · cone → Mystery · sphere → Mystery (no round object here) |
A cube never shares a round with a box pedestal (a cube IS a rectangular box); cones and pyramids only ever go to the Mystery Gallery because no pedestal object has those shapes (stated honestly in prose: "none of these things is a cone").

**Answer position:** destinations are pedestals, whose left-to-right order is shuffled per round; across a pass the right pedestal for each treasure is in slot 1/2/3 within ±1 of a third; the Mystery Gallery (always at the right end — it is a doorway) receives 0–2 treasures per round, ≤ 25 % of all treasures. The belt order is shuffled per round so the answer sequence never repeats.
**Order:** order-only reshuffle per pass.

## 7. Check, the misses, the success
- **Check with treasures still on the belt** → hint "Put every treasure on a pedestal or in the Mystery Gallery." (no miss).
- **Check** → the clasp show runs pedestal by pedestal (≈ 700 ms per treasure): holds → locks, spins upright, spotlight; refuses → rods reach, the failing rod/corner flashes coral, clasp springs open, treasure slides to the belt. Any refusal = a miss.
- **Miss 1 — the treasure's own clasp:** beside each returned treasure a ghost clasp BUILDS ITSELF out of the treasure — one brass rod laid along each side (rods of equal length get the same colour), a hinge at each corner, a square-corner lock where a corner is square; a curved edge gets a hoop that visibly stretches into an oval or a bent rod. The ghost then slides up next to the clasp that refused it, so the child compares clasp with clasp: four rods against three, unequal rods against equal ones, a stretched hoop against a round one (solids: the treasure's own wire cage builds beside the object's cage). Hint: "Count its corners and look at its sides. Which clasp can hold it?"
- **Miss 2:** while a returned treasure is being dragged, the pedestal (or doorway) that can hold it glows. Hint: "The glowing clasp can hold it."
- **A new drag** clears the showing.
- **Success:** floor tiles light in the pedestals' colours (the shape-coded mosaic), ropes lift, Pip waddles across. Bubble: "Yes — every treasure has its place! A {shape} is still a {shape} when it turns." (one shape per round, the round's most-disguised treasure) · solids: "Yes — the {object} and the {solid} have the same shape!" (one pair per round) · capstone: "Yes — {t} triangles and {s} squares!"

## 8. Settings (each visibly changes the board at rest)
1. **Hall:** shapes / solids — flat treasures and brass clasps vs real objects with wire cages and drawn solids.
2. **Plates:** names / riddles — the plate shows the name and outline, or a riddle (spoken) with its corner/side icon.

## 9. Words (EN source)
- title (in-tool): "Professor Pip's Museum"
- instruction: shapes "Put each treasure on the pedestal that names it. Then Check." · solids "Put each solid with the thing that has the same shape. Then Check."
- plates (names): circle, square, triangle, rectangle, hexagon · Mystery Gallery (as a plate on the doorway, with its curtain).
- riddles (plates, spoken): triangle "Three straight sides, three corners." · square "Four equal sides, four square corners." · rectangle "Four square corners, opposite sides match." · circle "Round, the same all the way round." · hexagon "Six straight sides, six corners."
- solid names (aria, prose, success): sphere, cube, cylinder, rectangular box (also cone, pyramid for the Mystery).
- hints: hintBelt "Put every treasure on a pedestal or in the Mystery Gallery." · hintTruth "Count its corners and look at its sides. Which clasp can hold it?" · hintTruthSolid "Look at its faces and corners. Which cage can hold it?" · hintGlow "The glowing clasp can hold it." · hintCount "Count the triangles in the hall, then the squares."
- success: as §7. · settings: "Hall" · "shapes" · "solids" · "Plates" · "names" · "riddles"
- **Locale traps:**
  - Shape-name gender and plural: de *der Kreis / das Quadrat / das Dreieck / das Rechteck / das Sechseck* (the old file's article-free frames with {n}/{np} stay); fr all masculine (*un cercle, un carré, un triangle, un rectangle, un hexagone* — elision trap *l'hexagone* avoided by "un {n}"); es/pt/it masculine (*círculo, cuadrado / quadrado, triângulo…*); nl de/het (*de cirkel, het vierkant, de driehoek, de rechthoek, de zeshoek*); sv/da/no/fi new at build from `shapes.json` labels + native check (fi "Ympyrä on yhä ympyrä, kun se kääntyy" — nominative frame).
  - "A {shape} is still a {shape} when it turns" must read naturally with the noun's gender per locale (fr "Un carré reste un carré, même tourné !" — the old revealTilted frame is the precedent).
  - Solid names: sphere → de *Kugel*, fr *sphère/boule*, es *esfera*, pt *esfera*, it *sfera*, nl *bol*, sv *klot*, da *kugle*, no *kule*, fi *pallo*; cube → *Würfel / cube / cubo / cubo / cubo / kubus / kub / terning / kube / kuutio*; cylinder → *Zylinder / cylindre / cilindro / cilindro / cilindro / cilinder / cylinder / cylinder / sylinder / lieriö*; rectangular box (cuboid) → de *Quader*, fr *pavé*, es *prisma rectangular*, pt *paralelepípedo*, it *parallelepipedo*, nl *balk*, sv *rätblock*, da *kasse*, no *rett prisme* (native check), fi *suorakulmainen särmiö*. Note: da/no say *terning* for both "dice" and "cube" — the success sentence would read "the dice and the dice"; da/no use the frame "The {object} has the shape of a {solid}" with *terning* and a different object word for the dice (*spilleterning*).
  - Mystery Gallery: de *Rätsel-Galerie*, fr *Salle Mystère*, es *Sala de misterio*, pt *Galeria dos Mistérios*, it *Sala dei misteri*, nl *Raadselgalerij* (old file); sv/da/no/fi at build.
  - Pip's name per locale as the old file (nl *Professor Tobbe*).
- **Sound off:** the clasps show everything; plates carry the outline in names mode; riddles need TTS or reading (a grade-1 setting).

## 10. Sound off, access, phones
- Keyboard path §5; aria per treasure "treasure {k}" (never its name — that would answer) and its state (on the belt / on the {pedestal} pedestal); pedestals "pedestal: {name}".
- Taps: treasures ≥ 64 px; pedestal trays ≥ 76 px.
- Pictures: Pip 96 / 64 px; real objects 96 / 64 px.
- Fold: 360 × 740 → task 24 + Pip/plates 80 + pedestals 190 + belt tray 2 × 72 + bubble/Check 56 ≈ 500 px; 320 × 640 ≈ 480. Check above the fold.

## 11. Distinct from
- Sibling **#37 Paint the Shapes** (same standard): a picture painted with tins whose paint accepts or refuses; nothing is routed or clasped. Here treasures are sorted by routing and the clasp's physical build (rods, hinges, a hoop) is the definition.
- Tool **shape-stretcher**: one shape on a pane and two attribute tags that survive turning — a teacher's pane. Here many disguised shapes, multiple clasps, a commit-then-test sort, and a solids hall.
- Planned **#275 ink-pad-solids** counts faces/edges/corners by printing; **#39 Flat or Solid** sorts flat vs solid at a letterbox. Here solids are matched to everyday objects by a cage — no counting, no printing.

## 12. Build plan
- **Core state:** `{hall:'shapes'|'solids', plates:'names'|'riddles', round, pedestals:[{kind, colour, object?}], mystery:bool, belt:[treasure], trays:{pedestalId:[treasureId]}, clasped:[ids], count:{t,s}, miss, help}`; treasure `{id, kind, verts|curve, open, curvedSide, rounded, angle, scale, stretch}` (solids `{kind, pose, scale}`).
- **Core functions:** `canHold(pedestalKind, treasure)` computed from GEOMETRY (side count, closedness, straightness, equal sides within 1 %, right angles within 1°, constant radius; solids by kind with cube ⊂ box handled by the round rule) · `route(t, dest)` · `check()` → per treasure `{held|refused, failingPart}` · `ghostClasp(t)` (the rods/hinges/locks/hoop built from the treasure's geometry) · `layout(width)`.
- **Gate ground truth:** for every treasure exactly one destination can hold it (by geometry, independent of `kind`); Mystery treasures can be held by no listed pedestal; no square in a rectangle-pedestal round; no cube in a box-pedestal round; every round's disguises include ≥ 1 turn ≥ 30° and ≥ 1 size ≤ 50 %; pedestal-slot balance per pass; Mystery ≤ 25 %; capstone counts 3 / 3.
- **Mutations:** canHold reads `kind` · square clasp accepts a 60° rhombus · hoop accepts an oval · triangle clasp locks an open triangle · rectangle clasp refuses a 1:3 rectangle turned 60° · a square placed in a rectangle round · a cube in a box round · cone routed to a sphere object accepted · capstone count off by one · help survives a new drag. · ghostClasp built from `kind` instead of geometry (a 1.15 : 1 rectangle gets four equal rods).

- **Pictures to confirm at build:** ball, orange, dice, present, can, drum, book, eraser at 96 / 64 px on a plinth beside a cage; penguin.
- **BLOCKED (partial, honest fallback in place):** no everyday CONE or PYRAMID object exists in the vocabulary-labelled library (the library holds an `At the Supermarket/ice_cream` picture but it has no vocabulary entry, so `lcs-pictures.js` cannot serve it; no pyramid object at all). Fallback: cones and pyramids ride the belt only as Mystery treasures. Unblock with a vocab entry for `ice_cream` (a cone) and a pyramid object (e.g. a tent or a party hat) — then add a cone pedestal and a pyramid pedestal.

## 13. The four questions
1. **Would a 5–8-year-old choose it again?** Yes — a conveyor, brass clasps that click shut or spring open, a curtain to send oddities through, a penguin curator.
2. **Would a teacher put it on the board?** Yes — the clasps ARE the definitions (three rods, four equal rods locked square, a hoop), so "why is a turned square still a square?" is answered by watching the clasp turn and lock.
3. **Would a parent trust it?** Yes — calm museum, library penguin and objects, no score.
4. **The invention, in one sentence:** every pedestal's clasp is built from what makes its shape, so it turns and stretches to meet any disguise but only closes round its own shape.

## 14. Critic review (2026-10-17)
Scores before → after: invention 5→5 · fun 5→5 · completeness 5→5 · correctness 5→5 · distinctness 4→5 · reality 4→5
What changed:
- Miss 1 no longer drops corner beads and side ticks (that is #37's brush trace — the two siblings on K.G.A.2 were showing the same thing): the returned treasure now **builds its own ghost clasp** out of its sides and corners, which slides up beside the clasp that refused it — clasp against clasp, the invention used as its own explanation. `truthMarks` → `ghostClasp`, with a mutation.
- Contact sheet: `at-the-supermarket/butter` is drawn as a holed yellow block that reads as cheese — refused; the rectangular-box object is now `classroom/eraser` (upright box), beside `classroom/book` (box lying flat). `animals/penguin`, ball, orange, dice, present, can, drum, book confirmed. Line added to PICTURE-RULINGS.md.
- G2-243 is shared by three designs with three different acts — #38 matches by closing a wire cage, #39 opens an everyday box into its net, #275 compares ink prints — so the coverage overlaps on the worksheet, never on the mechanic. The cone/pyramid BLOCKED note stands (the `ice_cream` picture exists but has no vocabulary label).
