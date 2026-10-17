# New 275 — The Ink-Pad Solids: THE INK PAD — every flat face prints its shape, every counted edge and corner keeps its ink (2.G.A.1)

## 0. Identity
- id `ink-pad-solids.play.2-g-a-1` · grade 2 · CCSS 2.G.A.1 (recognise and draw shapes having specified attributes, such as a given number of angles or a given number of equal faces; identify … cubes) · strand Geometry · files: `ink-pad-solids-core.js`, `ink-pad-solids-activity.js`, `ink-pad-solids-activity.html`, `ink-pad-solids-activities.json` (new engine → `MANIFEST_FILES`).
- worksheets it covers: **G2-242** Count the Faces ("Write how many flat faces each solid has.") · **G2-245** Count the Edges · **G2-246** Count the Corners · **G2-243** Solid Shapes Around Us ("Draw a line from each solid to the object with the same shape.").
- conventions kept from the worksheet factory (`scripts/worksheet-gen/types/_shared/geometry-tasks.js`, measured): solids are drawn **see-through with hidden edges dashed**, as school books do; the cylinder is **left out of edge counting** (its "2 edges" is a convention some curricula count as 0); a cone and a sphere never appear where their answer would be a disputed or a zero count; the library `shapes/cone` is a truncated cone and is never used. Plus the standing rule: **no counting round ever has the answer 0** (so no sphere in faces, no cylinder/sphere/cone in corners or edges).

## 1. The pitch
"Tap a flat face and the solid rolls onto the ink pad and prints that face on the paper — the face keeps a blue ink stain so it can't print twice, and turning the solid brings the hidden faces round; a curved side only prints a line, because a face is something that prints a whole shape."

## 2. Why a child will want it again
- **Printing is a toy.** The solid tips over onto a fat blue ink pad, *pfff*, then onto the paper, *tup* — and lifts away leaving a crisp print: a square, a triangle, a circle. Children love stamping.
- **The paper tells the story.** The prints pile up on the sheet like a stamp collection: a cube leaves six squares, a pyramid one square and four triangles, a cylinder two circles. The paper IS the answer laid out flat.
- **The hidden ones.** At the start a cube shows three faces. Turn it — *thunk* — and the back faces come round, still clean. Tip it — the bottom appears. "There were three more hiding!" is the moment every round is built around.
- **The cheeky curve.** Tap the round side of a cylinder: it rolls onto the pad and presses… and leaves only a thin line. A ball leaves a single dot. The child laughs — and learns that only flat faces print a shape.
- **Edges in ink, corners in dots.** On the edge and corner boards the child runs a finger along an edge (it turns ink-blue) or taps a corner (a blue dot). Turning shows the dashed hidden ones becoming solid and reachable.
- **Earned show per round:** the sheet slides out like a print from a press, the prints (or the inked skeleton, or the dotted corners) rise into a little framed picture, and the frame hangs on the gallery wall at the top. No timer, score, streak or lives.
- **Free play:** the solid can be turned and tipped at any time; after a round the child can print anything again on a fresh sheet.

## 3. The skill and the misconception
- **Skill (2.G.A.1 + the worksheets):** count the flat faces, the edges and the corners (vertices) of solids — cube, rectangular prism (box), triangular prism, square pyramid, triangular pyramid, a house-shaped prism, cylinder, cone — including the ones you cannot see; recognise the shape of each face; match an everyday object to the solid with the same shape.
- **Misconceptions and the push-back:**
  1. **"A cube has 3 faces"** (counting only what is visible): the 3 visible faces print and stain; the turn and tip controls bring 3 clean faces into view — they are obviously still unprinted.
  2. **Counting a face twice** while turning: a stained face does not print again (it glistens and gives a dull "tck"), so the count on the paper cannot double.
  3. **"A cylinder has 3 faces" (the curved side counts) / "a ball has 1 face":** a curved surface pressed on the paper touches it only along a line (cylinder, cone) or at a point (sphere) — it prints a line or a dot, not a shape. A face is flat: it prints a whole shape.
  4. **Edges: counting only the solid lines** (missing the dashed hidden edges): dashed edges cannot be inked until turned into view; the inked count and the true count differ until the child turns.
  5. **Corners counted twice at a turn:** a corner that has a dot shows it from every view.
  6. **Objects matched by look, not shape** (a can is "a circle"): in the objects board, the object's prints are compared with the solid's prints — two circles and a curved side vs six squares.

## 4. The stage
**Layout: stacked at every width** (layout check 2026-10-17: no `layout:'split'` — its stage column is only ≈ 370 px at 704, too narrow for this apparatus). The stage takes the full card width, ≈ 648 px at 704 (≈ 656 at 1024); whatever §4 places in a left, right, side or bubble column stays side by side inside the stage when the activity draws it, while the shell's bubble, keypad and Check sit under the stage. Sizes written for a wider stage fit the 648 px by closing margins and gaps first; no picture drops below 96 px, no tap below 44, no data mark or grid cell below 40.

**At 704 — stacked layout:**
- **Task line** (20 px, ≤ 2 lines).
- **The bench** (left, 420 × 380): a warm wooden bench top. On it:
  - **The solid** (centre-left, fitted in 240 × 240): drawn in a fixed oblique-isometric projection (30° view from above), faces in a translucent warm cream (#F6EAD2 at 85 %) with 3 px ink edges; **hidden edges dashed** (2 px, dash 6/5). Inked faces carry a soft ink-blue stain (#3B6FB6 at 35 %); inked edges are 5 px ink-blue; inked corners carry a 10 px ink-blue dot.
  - **The ink pad** (front-left, 120 × 60): a dark blue pad in a tin.
  - **Turn controls** (under the solid, 44 × 44 each): ↺ turn left · ↻ turn right (90° about the vertical axis) · ⤵ tip over (90° about the left-right axis). Drawn icons, no words.
- **The paper** (right, 220 × 380, cream with a faint grid): prints land here in a loose grid in the order made (each print the face's true shape at 0.45 × scale, ink-blue). On the edge/corner boards the paper shows a flat **tally of inked marks** instead: one short blue bar per inked edge, one dot per inked corner (no numerals) — the record of what the child inked.
- **Keypad** (shell number keypad) under the paper — the child types the count.
- **Objects board:** the bench is replaced by the **object** (a library picture, 140 px at 704) on a small mat at the left, and **three solids** (each fitted in 130 × 130) on mats at the right; the paper sits below them (360 × 120).
- **Bubble** under the bench; Check at the right (shell).

**At 360 — stacked:** task · bench 328 × 280 (solid 200 × 200, pad 90 × 44, turn controls 44 px in a row under the solid) · paper 328 × 120 (prints 0.3 × scale in a row that wraps) · keypad · bubble · Check. Objects board: object 96 px left + three solids 100 × 100 in a row below, paper 328 × 90. At 320: solid 180, solids 92.

**Pictures:** library pictures ONLY on the objects board (verified on contact sheets 2026-10-17, see §12): `toys/dice`, `christmas/present`, `classroom/book`, `around-the-house/fridge`, `at-the-supermarket/can`, `christmas/candle`, `music/drum`, `camping/log`, `toys/ball`, `fruits/orange`, `space/earth` (a shaded globe; NOT space/moon — PICTURE-RULINGS: its blue left limb reads as a phase), `at-the-supermarket/cheese` (a wedge — the triangular prism; its back edge is the rounded rind, so its object prints are "2 wedge triangles with one rounded side + 3 sides" and it is matched by KIND, never by an exact print count). No cone or pyramid object exists in the library (the shapes-theme cone is a truncated cone; the supermarket ice cream has no vocab label; camping/tent is a DOME tent with a curved roof — opened 2026-10-17 — not a pyramid or prism), so the cone and the pyramid appear only on the counting boards and NOT on the objects board at all (§6: as distractors they could never be right, which a child exploits). Solids, pad, paper, bench and controls are drawn apparatus geometry.

## 5. The hand
- **Faces board — tap a face** (a visible face; hidden faces are behind and not tappable): the solid rolls so that face points down (400 ms, eased), drops onto the pad (*pfff*, the pad dimples), lifts, slides over the paper and presses (*tup*), lifts away and rolls back to the view the child had (400 ms). The print appears on the paper; the face keeps its stain. Total ≈ 1.3 s; any new tap during it is queued.
  - **A stained face** → the solid gives a small nod and the face glistens; "tck"; no print.
  - **A curved surface** (cylinder side, cone side) → the solid rolls onto it, presses, and leaves a thin straight line on the paper (the contact line), drawn grey and thin, with a little wobble of the solid as if shrugging; the line is NOT a face and is not part of the count. (A sphere never appears on the faces board; on the objects board the ball prints a single dot.)
- **Edges board — drag along an edge** (start within 22 px of the edge, move ≥ 60 % of its length) or **tap it**: the edge fills ink-blue from the finger's end (150 ms, a pen "sss"). Dashed (hidden) edges ignore touches until a turn brings them in front. Tap an inked edge → it un-inks (undo).
- **Corners board — tap a corner** (hit circle 22 px radius): a blue dot lands with a "pip". Corners hidden behind the solid are drawn as small hollow circles and cannot be tapped until turned into view. Tap again → removes.
- **Turn / tip** (any board): ↺ ↻ rotate the solid 90° about the vertical axis (350 ms, a wooden "thunk"); ⤵ tips it 90° forward. The stains, inked edges and dots turn with it.
- **Keypad:** type the count at any time.
- **Objects board:** tap a solid → it lifts 8 px with a shadow (another tap swaps). Check runs the comparison.
- **Keyboard:** Tab cycles visible faces/edges/corners (focus ring follows the part), Enter prints/inks/dots; Q / E turn, T tips; digits type; objects: Left/Right choose a solid.

## 6. The rounds
**Solid catalogue** (unit coordinates; the core and the gate count faces/edges/vertices from the mesh, never from this table):
| solid | flat faces | edges | corners | face shapes printed |
|---|---|---|---|---|
| cube | 6 | 12 | 8 | 6 squares |
| tall box (1 × 1 × 2, standing) | 6 | 12 | 8 | 2 squares + 4 long rectangles |
| flat box (2 × 1.4 × 0.6, lying) | 6 | 12 | 8 | 3 pairs of different rectangles |
| triangular prism (lying, triangle ends) | 5 | 9 | 6 | 2 triangles + 3 rectangles |
| square pyramid | 5 | 8 | 5 | 1 square + 4 triangles |
| triangular pyramid | 4 | 6 | 4 | 4 triangles |
| house prism (pentagon ends: a box with a roof) | 7 | 15 | 10 | 2 pentagons + 5 rectangles |
| cylinder | 2 | — | — | 2 circles (the side prints a line) |
| cone (a true cone, drawn) | 1 | — | — | 1 circle (the side prints a line) |

**Faces (8 rounds):** cube 6 · tall box 6 · triangular prism 5 · square pyramid 5 · cylinder 2 · cone 1 · triangular pyramid 4 · house prism 7.
**Edges (7 rounds):** cube 12 · flat box 12 · triangular prism 9 · square pyramid 8 · triangular pyramid 6 · house prism 15 · tall box 12.
**Corners (7 rounds):** cube 8 · flat box 8 · triangular prism 6 · square pyramid 5 · triangular pyramid 4 · house prism 10 · tall box 8.
Every solid starts at elevation 30° (looking down), untipped, at a seeded yaw from its allowed set — **yaw ∈ {30°, 120°, 210°, 300°}** for cube, both boxes, triangular prism, square pyramid and house prism; **yaw ∈ {0°, 120°, 240°}** for the triangular pyramid (at yaw 30°/210°/300° it shows 2 faces and hides only 1 edge and 0 corners — measured). **Measured hidden parts in every allowed start view (critic, `work-c26/s275.js`, meshes as §6, back-face test):** cube / boxes 3 faces · 3 edges · 1 corner · triangular prism 3 · 3 · 1 · square pyramid (height 0.9 × base) 3 · 3 · 1 · triangular pyramid 3 · 3 · 1 · house prism 3–4 faces · 3–5 edges · 1–2 corners (yaw 30°/210° hide 4 · 5 · 2). Cylinder and cone (faces board only): the bottom circle is hidden (1 face) — for the cone that is its ONLY face, so the cone round starts with nothing printable in view and the child must tip it. Euler F − E + V = 2 holds for all seven polyhedra (6·12·8, 6·12·8, 6·12·8, 5·9·6, 5·8·5, 4·6·4, 7·15·10). The gate's floor: ≥ 2 faces hidden for polyhedra, ≥ 1 for cylinder/cone; ≥ 3 edges; ≥ 1 corner. Never 0.

**Objects (12 rounds; ✓ = the matching solid; seeded slot order):**
| # | object (theme/noun) | solids offered |
|---|---|---|
| O1 | toys/dice | cube ✓ · cylinder · triangular prism |
| O2 | christmas/present | box ✓ · cylinder · sphere |
| O3 | classroom/book | box (flat) ✓ · cylinder · sphere |
| O4 | around-the-house/fridge | box (tall) ✓ · cylinder · triangular prism |
| O5 | at-the-supermarket/can | cylinder ✓ · sphere · triangular prism |
| O6 | christmas/candle | cylinder ✓ · cube · box |
| O7 | music/drum | cylinder ✓ · cube · sphere |
| O8 | camping/log | cylinder (lying) ✓ · box · triangular prism |
| O9 | toys/ball | sphere ✓ · cube · cylinder |
| O10 | fruits/orange | sphere ✓ · box · cylinder |
| O11 | space/earth | sphere ✓ · box · cylinder |
| O12 | at-the-supermarket/cheese | triangular prism ✓ · cube · cylinder |
Rules: a cube object is never offered a box and a box object is never offered a cube (a cube IS a box — PICTURE-RULINGS: "box never refuses a cube"); the present (nearly cubic) is a box round with no cube on offer.

- **Answer position:** counts are typed (no position). Objects: ✓ in slots 1/2/3 four times each over 12, permuted per pass, never the same slot three rounds running; every offered kind is also a right answer somewhere and appears as a distractor ≥ 4 times. **Measured (critic, `work-c26/o275.js`, `opt275.js`):** the draft used cone and square pyramid only as distractors — they can never be right, so a child who learns "never the cone or the pyramid" scored 5.0/12 expected (chance 4) and the best fixed-preference bot 7/12. With the table above the elimination bot is at chance (4.0/12) and the best fixed-preference bot is 5/12 — the floor for this answer mix (4 cylinders, 3 boxes, 3 spheres, 1 cube, 1 prism; an exhaustive local search over all legal distractor pairs found nothing lower). Cone and pyramid are fully covered on the counting boards, and the worksheet G2-243 itself matches no cone or pyramid object (`lib/shape-data.js SOLID_REAL_OBJECTS`).
- **Order:** order-only reshuffle per pass.

## 7. Check, the misses, the success
- **Check with nothing typed** → hint "Count them and type how many." (no miss). Objects: "Tap the solid with the same shape." (no miss).
- **Miss** = a wrong number.
  - **If some parts are not yet marked:** **Miss 1:** every unmarked visible part wobbles (faces lift 2 px and settle, edges shimmer, corner circles pulse), and every unmarked hidden part flashes its dashed outline twice. Hint (faces): "Some faces haven't printed yet. Turn the solid to find them." · (edges) "Some edges have no ink yet. Look for the dashed ones and turn." · (corners) "Some corners have no dot yet. Turn the solid."
  - **Miss 2:** the solid turns slowly once all the way round and tips once (3 s), every unmarked part glowing coral as it passes the front. Hint: "Watch it turn. Mark every one."
  - **If every part is marked (the child miscounted):** **Miss 1:** the marks pulse one at a time — prints on the paper, inked edges, dots (300 ms each), no numerals. Hint: "Count the {prints|blue edges|dots} one by one." **Miss 2:** each gets a small numeral as it pulses. Hint: "Count with the numbers."
- **Objects miss:** **Miss 1:** the object and the chosen solid both "press" on the pad and their prints land side by side on the paper (object prints from its catalogue print set: dice 6 squares, book 6 rectangles in 3 sizes, can 2 circles + a line, ball 1 dot, cheese 2 triangles + 3 rectangles…): different kinds or a different number are plain. Hint: "Look at the prints. Are they the same shapes?" **Miss 2:** all three solids press their prints in a row under each, so the matching set stands out. Hint: "Find the solid whose prints match."
- **A new mark, turn or digit** clears the help until the next Check.
- **Success:** the print slides out and hangs in the gallery (§2). Bubble: faces "Yes — a {solid} has {n} flat faces!" · edges "Yes — {n} edges!" · corners "Yes — {n} corners!" · objects "Yes — the {object} has the same shape as the {solid}!" ({object} from `image-vocabulary.js` in the page locale; see the dice trap §9).

## 8. Settings (each visibly changes the board at rest)
1. **Count:** faces / edges / corners / objects — the bench shows the pad and the print paper (faces), the inking pen tray and edge tally (edges), the dot tally (corners), or the object with three solids (objects).
2. **Help:** turning and tipping / turning only — "turning only" hides the ⤵ tip control and starts every solid upright, so only the bottom stays out of sight and must be reasoned (the harder, mental version; the gate checks that every bottom-only-hidden part is still countable from the solid's shape — a cube's bottom is the "sixth face" the child must infer). Greyed on the objects board.

## 9. Words (EN source; the other 10 locales authored by hand, then one native + pedagogy reviewer)
- title (in-tool): "The Ink Pad"
- instruction: "Print, ink and dot every part — even the hidden ones. Then type how many."
- task lines: faces "How many flat faces? Tap a face to print it." · edges "How many edges? Run your finger along each edge." · corners "How many corners? Tap each corner." · objects "Which solid has the same shape as the {object}?"
- solid names: cube · box (rectangular prism) · triangular prism · square pyramid · triangular pyramid · house-shaped prism · cylinder · cone · sphere (objects board).
- hints: hintType "Count them and type how many." · hintPickSolid "Tap the solid with the same shape." · hintFacesLeft "Some faces haven't printed yet. Turn the solid to find them." · hintEdgesLeft "Some edges have no ink yet. Look for the dashed ones and turn." · hintCornersLeft "Some corners have no dot yet. Turn the solid." · hintWatch "Watch it turn. Mark every one." · hintCountMarks "Count the {marks} one by one." (marks: prints / blue edges / dots) · hintNumbers "Count with the numbers." · hintPrints "Look at the prints. Are they the same shapes?" · hintFindPrints "Find the solid whose prints match."
- celebrations: as §7.
- settings: "Count" · "faces" · "edges" · "corners" · "objects" · "Help" · "turning and tipping" · "turning only"
- aria: parts "face {k}, {printed|not printed}", "edge {k}, {inked|no ink}", "corner {k}, {dot|no dot}"; hidden parts announce "hidden — turn the solid"; after a print "{shape} printed" (square, rectangle, triangle, pentagon, circle — the face's shape is what the child just discovered, fine to say); solids on the objects board "solid {k} of 3" (never its name — that would be the answer to a naming question; the object round asks shape matching).
- **Locale traps:**
  - **"corner" vs "vertex":** de *Ecke* (Grundschule; *Eckpunkt* later), fr *sommet* (CE1 uses *sommet*), es *vértice*, it *vertice*, pt *vértice*, nl *hoekpunt*, sv *hörn*, da *hjørne*, no *hjørne*, fi *kärki* — the native panel uses the grade-2 school word.
  - **"face":** de *Fläche* (not *Gesicht*), fr *face*, es *cara*, it *faccia*, pt *face*, nl *vlak*, sv *sida* or *yta* (sv school word *sida* clashes with "side" — the panel picks *yta*/"plan yta"), da *flade*, no *flate*, fi *tahko*. **"flat face"** must not double the idea awkwardly where the face word already means flat (nl *vlak*).
  - **"edge":** de *Kante*, fr *arête*, es *arista*, it *spigolo*, pt *aresta*, nl *ribbe*, sv *kant*, da *kant*, no *kant*, fi *särmä*.
  - **solid names:** box = de *Quader*, fr *pavé (droit)*, es *prisma rectangular* (es-MX *prisma rectangular*), it *parallelepipedo*, pt *paralelepípedo* (BNCC), nl *balk*, sv *rätblock*, da *kasse*, no *rett prisme*/*kasse* (panel), fi *suorakulmainen särmiö*; cube = *Würfel, cube, cubo, cubo, cubo, kubus, kub, terning, kube, kuutio*; sphere = *Kugel, boule (sphère), esfera, sfera, esfera, bol, klot, kugle, kule, pallo*. **de *Würfel* is both "cube" and "dice"** and da *terning* too — on O1 the celebration "the dice has the same shape as the cube" becomes "Würfel … Würfel"; the de/da celebration for O1 uses a frame without the object noun ("Yes — it has the same shape as a cube!").
  - **dice label trap:** `toys/dice` is labelled in the PLURAL in several locales (en "Dice", fr "Dés", es "Dados", it "Dadi", pt "Dados") while the drawing shows ONE die — the object noun on O1 uses a per-locale singular override recorded in the activity's string table, never the raw vocab label: fr *dé*, es *dado*, it *dado*, pt *dado* (en keeps "dice", which English-speaking children use for one die).
  - **cheese:** "cheese" alone does not say "wedge" — es *cuña de queso*, fr *morceau de fromage*, de *Käsestück* — the panel picks the word for a wedge.
  - plurals after numerals: fi partitive ("6 tahkoa", "12 särmää", "8 kärkeä").
  - fr U+202F before ! ? : ;
- **Sound off:** prints, stains, ink and dots carry everything; the paper is a visible record of the count.

## 10. Sound off, access, phones
- Keyboard path §5; every visible part is focusable; turn controls are buttons.
- Taps: faces are large; edges have a 44 px wide invisible hit band; where bands overlap at a corner, the edge closest to the finger's movement direction wins (drag) or the nearest (tap); corners 44 px circles. Turn controls 44 × 44. Solids on the objects board ≥ 92 px.
- Fold: 360 × 740 → task 48 + bench 280 + paper 120 + keypad 150 + bubble/Check 60 = 658. 320 × 640: bench 250, paper 100, keypad 140 → 598. Check above both folds.
- Phone layout: paper under the bench, keypad under the paper; on the edges/corners boards the paper strip is 60 px (tally only).

## 11. Distinct from
- **Row 39 — Flat or Solid (K):** a letterbox that only flat shapes slide through, and nets. Here the solid is examined part by part — faces printed, edges inked, corners dotted — with the hidden ones brought round by turning.
- **Tool build-plan** (isometric cube buildings with front/side views) and **row 23's stamp frame** (stamping counters into a ten-frame): different objects and skills; the ink pad here prints a solid's FACES, so the record on paper is the solid unfolded into its face shapes.
- **New #244 the rising camera** (a camera climbs an arc and objects stamp their TOP VIEW onto a map — points of view, one view per object). Here nothing is a view: every flat face of a solid is printed true-shape, one by one, including the bottom and back, and the count is the record. **Row 39 / designs/039** owns flat-vs-solid and nets; G2-245/246 (edges, corners) were handed to this design.
- **Row 169's trundle wheel** prints a FLAT shape's sides by rolling; here a SOLID prints its faces by stamping — the family resemblance (things that leave their own record) is deliberate, the skills and mechanics differ.

## 12. Build plan
- **Core state:** `{count:'faces'|'edges'|'corners'|'objects', help:'tip'|'turnOnly', round, solid:{mesh, R:rotation}, stained:Set<faceId>, inked:Set<edgeId>, dots:Set<vertexId>, prints:[{faceId, shape}], typed:'', pick:null|i, miss, help}`.
- **Core functions:** `mesh(solid)` → vertices, faces (polygons + `flat:bool`), edges (pairs between two FLAT faces only — the cylinder's rims are not counted edges, by the factory's convention) · `project(v, R)` · `visibleFaces(R)` (normal·view > 0) · `hiddenEdges(R)` (both adjacent faces back-facing → dashed) · `visibleVertices(R)` · `printFace(faceId)` → the face polygon unfolded flat (true shape) · `curvedPrint(solid)` → 'line'|'dot' · `turn(dir)` / `tip()` · `counts(solid)` → `{faces, edges, vertices}` via Euler (`F − E + V = 2` for the polyhedra; asserted) · `objectPrints(objectKey)` (from a catalogue: object → solid kind + proportions) · `check()`.
- **Gate's own ground truth (verify-ink-pad-solids-core.js):** recounts F/E/V from the meshes with its own code and checks Euler for every polyhedron; asserts the face-shape list per solid (squares, rectangles, triangles, pentagons, circles by vertex count/curvature); every round's start view hides ≥ 2 faces / ≥ 3 edges / ≥ 1 corner; no round's answer is 0; no cylinder/cone in edges, no sphere in faces, no cylinder/cone/sphere in corners; every part is reachable (visible in at least one of the views reachable by turns and tips; with "turning only", the hidden bottom set is non-empty and inferable); objects: exactly one solid matches each object's kind, no box offered for a cube object and vice versa, slot balance.
- **Mutations:** a stained face prints again (double count) · a curved side prints a shape · hidden edges inkable without turning · the cylinder's rims counted as edges · edges counted from projected lines (a hidden edge drawn twice) · counts read from the catalogue instead of the mesh · a sphere admitted to the faces board · a cube object offered a box · the ✓ solid always in slot 1 · help survives a new mark · the turn loses the stains.
- **Pictures verified on contact sheets (2026-10-17, `scratchpad/des/contact/`):** toys/dice (one red die, clearly a cube) · christmas/present (a wrapped box, nearly cubic → box only, never beside a cube) · classroom/book (a closed book lying flat — a flat box) · around-the-house/fridge (a tall box) · at-the-supermarket/can (a cylinder) · christmas/candle (a cylinder) · music/drum (a cylinder) · camping/log (a lying cylinder) · toys/ball, fruits/orange, space/earth (spheres; space/moon refused — PICTURE-RULINGS) · at-the-supermarket/cheese (a wedge with holes — a triangular prism). Every one has `lcs-pictures` labels in all 11 locales (`mini tools/pictures/<theme>.json`, checked).
- **Risks:** the 3D drawing must read as a solid at 200 px (faces translucent enough that dashed hidden edges show through); edge hit-testing near corners (resolved by movement direction); the roll-to-face animation must be quaternion-tweened so it never flips the long way round.
- **BLOCKED:** none for the counting boards. Objects board: no cone or pyramid object exists in the library (art need, `new/ART-NEEDS.md`): a party hat or an ice-cream cone (cone) and a toy pyramid (square pyramid — camping/tent is a dome and does not qualify). Honest fallback in place: cone and pyramid are counted on the counting boards and are left off the objects board until that art exists (then each enters as a right answer AND a distractor).

## 13. The four questions
1. **Would a 5–8-year-old choose it again?** Yes — stamping solids on an ink pad, finding faces that were hiding, and laughing at the ball that only prints a dot.
2. **Would a teacher put it on the board?** Yes — it makes the hidden faces, edges and corners countable on the projector, kills the "a cube has 3 faces" error, separates flat faces from curved surfaces by a physical fact, and follows the worksheets' conventions (dashed hidden edges, no disputed cylinder edges).
3. **Would a parent trust it?** Yes — calm, exact counts from real meshes, library pictures only for everyday objects, no score.
4. **The invention, in one sentence:** every flat face of the solid prints its own shape from an ink pad and keeps a stain so it can't print twice, edges and corners keep their ink, and turning brings the hidden ones round — while a curved side only ever prints a line.

## 14. Critic review (2026-10-17)
Scores before → after: invention 5→5 · fun 5→5 · completeness 4→5 · correctness 4→5 · distinctness 5→5 · reality 4→5
What changed:
- Counts verified by Euler on all seven meshes; start views now explicit and measured (elevation 30°, allowed yaws; triangular pyramid only at 0/120/240° — at 30° it hides 0 corners); hidden floors measured per solid; cylinder/cone floor corrected to ≥ 1 hidden face (the cone round starts with nothing printable in view). No answer 0 anywhere.
- Objects board: cone and pyramid could never be right (elimination bot 5/12, best preference bot 7/12) → removed from the objects board; new distractor table brings the elimination bot to chance and the best preference bot to 5/12 (the floor for this answer mix, searched).
- space/moon refused (PICTURE-RULINGS) → space/earth; camping/tent opened — a dome, not a pyramid; cheese matched by kind (rounded rind).
- Distinct from designs/039 (letterbox/nets) and new/244 (rising camera top views) stated; G2-245/246 owned here.
- Layout check (2026-10-17): switched to stacked — split stage column is ~370 px at 704.
