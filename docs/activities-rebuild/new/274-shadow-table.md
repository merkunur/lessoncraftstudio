# New 274 — The Shadow Table: THE SINKING INLAY — the shadow is a hollow carved in the table, and a piece only sinks in when it lies exactly inside (1.G.A.2)

## 0. Identity
- id `shadow-table.play.1-g-a-2` · grade 2 (the worksheet's grade) · CCSS 1.G.A.2 (compose two-dimensional shapes to create a composite shape) · strand Geometry · files: `shadow-table-core.js`, `shadow-table-activity.js`, `shadow-table-activity.html`, `shadow-table-activities.json` (new engine → registered in `frontend/lib/activities.ts MANIFEST_FILES`).
- worksheet it covers: **G2-347** Tangram Puzzles: Which Solution Matches the Shadow? ("Look at each shadow. Circle the solution that stands exactly like the shadow. Turned or flipped solutions do not match.") — the match board; the build board is the hands-on face of the same K-353 tangram family.
- figure data: the activity reads the SAME validated figure bank as the worksheets — `scripts/worksheet-gen/data/b4/tangram-figures.js` (10 seven-tan figures on the √2 lattice, each with derived `silhouette`, `symmetryGroup`, `chiral`) — exported at build time by a small script into `mini tools/shadow-table-figures.json` (read-from-SoT; never re-authored by hand). The 8 lattice transforms are the bank's `TRANSFORM_NAMES` (id, rot90, rot180, rot270, mirX, mirY, mirD, mirA).

## 1. The pitch
"The shadow is a hollow carved into the wooden table: drop a tangram piece in and it sinks flush only if it lies completely inside the hollow — a piece that sticks out sits up on the rim, wobbling — and a finished solution plate only drops in if it stands exactly like the shadow, not turned and not flipped."

## 2. Why a child will want it again
- **The clunk.** Real wooden tangram sets come in a tray with a carved hollow, and this is that toy. A piece that fits drops the last few millimetres with a deep wooden *clunk*, sits level with the table, and its edge shadow disappears. A piece that doesn't fit stays perched on the rim, tilted, wobbling, its overhanging corner glowing coral. Children chase the clunk.
- **The table goes smooth.** Every sunk piece makes the table flatter. When the seventh piece clunks in, the table is perfectly flat — a little marble (a drawn circle) rolls right across it without a bump, *wheeee*, and drops off the far edge into a cup.
- **The figure stands up.** Then the whole filled hollow pops out as one solid wooden figure — the cat, the boat, the rabbit — stands up on its base and does one small move (the cat stretches, the boat rocks, the rabbit hops, the tree sways, the arrow flies across), and lands on the **shelf** with the other figures the child has made.
- **The handedness secret.** Only ONE of the seven pieces — the parallelogram — ever needs flipping. Flip a triangle and nothing changes; flip the parallelogram and it becomes its mirror twin — and when the last hole left is the parallelogram's, only one of the twins sinks into it. (Early in a round a wrong-way-up parallelogram may still sink somewhere roomy; the dead-end help in §7 then points at it.) Children discover this themselves and love knowing it.
- **The turned-plate trick** (match board): a plate that is "only turned" perches on the rim with corners sticking out — then, at the second miss, it visibly turns (or flips over) in the air, becomes the right one, and drops in. The child SEES what "turned" and "flipped" mean.
- No timer, score, streak or lives. **Free play:** after each round the figure can be pressed back into the table and the pieces lifted out and played with; a "spill" button tips all seven out for a fresh go.

## 3. The skill and the misconception
- **Skill (1.G.A.2 + G2-347):** compose a figure from the seven tangram pieces so that they fill a shadow exactly — no gaps, no overlaps, nothing sticking out — choosing each piece's size, turn and (for the parallelogram) side; recognise that a turned or flipped arrangement makes a turned or flipped shadow, and pick the solution that stands exactly like the given shadow.
- **Misconceptions and the push-back:**
  1. **"Turned or flipped is the same picture"** (G2-347's whole point): a turned or flipped plate cannot sink — the hollow holds it up on the parts that disagree, which glow coral where it overhangs and show as dark holes where it leaves the hollow empty.
  2. **"A shape only fits one way round"** (the opposite error): rounds where the shadow itself is turned or mirrored (the arrow = the tree turned, the boat facing left) are filled by the same seven pieces turned; the turn button is how.
  3. **"A triangle is a triangle"** (size ignored): a small triangle in a big triangle's place leaves a gap — the piece sinks (it is inside) but the region beside it stays dark and empty, and at the end the last piece will not fit; the dead-end help (§7) names the piece that went in the wrong place.
  4. **"Flip any piece that doesn't fit"**: flipping a triangle or the square changes nothing (they look the same flipped); only the parallelogram has a mirror twin — the flip button shows it by changing the parallelogram's grain direction and nothing else's.

## 4. The stage
**At 704 — split layout:**
- **Task line** (20 px, ≤ 2 lines).
- **The table** (left, 400 × 400): light birch wood (#EAD9BC with a faint grain), 3 px ink frame. The **hollow** (the shadow) is the figure's silhouette carved into it: deep charcoal #3A3530 with a 4 px inner bevel (darker top-left, lighter bottom-right edge) so it reads as a hollow, not a print. Figure scale: the figure's bounding box fitted in 340 × 340 (unit square S = 340 / max(w, h) of the transformed figure — e.g. cat 1.25 × 1.5 → S 227; boat 1.414 × 1.707 → S 199; trapezoid 2.12 wide → S 160).
- **Build board — the tray** (right, 240 × 400): the seven tans in a 2-column layout at 0.5 × table scale (at 0.6 a large triangle's long side, 0.6 × 227 = 136 px for the cat, overflows the 120 px column), each in its classic colour (large triangles teal and coral, medium gold, small plum and leaf, square sky, parallelogram rose). The parallelogram's wood grain runs diagonally so its flip is visible.
- **Match board — the three plates** (right, stacked vertically, each 230 × 120 slot): each plate is a finished solution (the 7 tans in their colours with 2 px seams) glued on a thin board. All three plates of a round are drawn at ONE common scale — the largest at which every plate (a turned plate is taller than it is wide) fits its 230 × 120 slot — so a plate's size never tells; at Check the lifted plate grows to table scale as it is lowered. (A flat 0.5 × table scale would make the cat plate 142 × 170 px — taller than its slot.)
- **Turn & flip chip** (appears beside a picked-up piece, 44 × 44 each): ↻ turn 45° · ⇋ flip (drawn icons, no words).
- **The shelf** (a thin strip 660 × 40 at the bottom): the figures made this session, as little silhouettes.
- **Bubble** under the table; Check at the right (shell).

**At 360 — stacked:** task · table 328 × 300 (figure fitted 280 × 260 → cat S 173, boat S 152, trapezoid S 132; a small triangle's legs ≥ 46 px) · tray 328 × 150 (tans fitted in 7 cells 76 × 64 in two rows; each cell is the tap target) or the three plates in a row (104 × 96 each) · shelf hidden (shown on the round-end only) · bubble · Check. At 320: table 296 × 270.

**Pictures:** none. Tans, table, hollow, plates, marble, cup and shelf are drawn apparatus geometry; the figures are silhouettes MADE OF the seven pieces (never a drawn animal).

## 5. The hand
- **Drag a tan** (build) → it lifts to full table scale under the finger (120 ms, soft shadow), the ↻ ⇋ chip appears beside it. **Tap a tan** (in the tray, on the table, or held) → it turns 45° clockwise about its centre (150 ms, a click). **⇋** flips it over (mirror about its vertical axis, 200 ms card-flip animation; the grain shows the side).
- **Release over the table:** the core looks for a lattice placement of that piece, in its current turn and side, within 14 px (704) / 12 px (360) of where it was dropped, that lies completely inside the hollow and overlaps no sunk piece.
  - **Found** → it slides into that spot and sinks (scale 1.00 → 0.98, its drop shadow vanishes, *clunk*, 180 ms).
  - **Not found** → it rests where dropped, raised: tilted 3°, a drop shadow under it, wobbling twice (300 ms); the part outside the hollow tinted coral, any part over another piece tinted coral too. It can be dragged again.
- **Drag a sunk piece out** → it lifts back out (undo); **tap a sunk piece** → it lifts out and turns (the same as picking it up and tapping).
- **Spill** (a small tray-tip button, free play) → all pieces lift out and slide back to the tray.
- **Match board:** tap a plate → it rises into "the hand" (lifted 10 px, shadow; another tap swaps). Check lowers it into the hollow (§7). In "name the trick" rounds, after the right plate is in, drag each other plate to the ↻ tray or the ⇋ tray (two small trays appear under the plates).
- **Keyboard:** Tab cycles tans → Enter picks up → arrow keys move it one lattice step (S/8 or S√2/8 alternately along the axis) → R turns, F flips → Enter drops; match: Left/Right choose a plate, Enter lifts it.

## 6. The rounds
**Build board (9 rounds; all seven tans every round; the hollow in the listed transform):**
| # | figure | hollow transform | what it teaches |
|---|---|---|---|
| B1 | rectangle | id | the gentlest: two large triangles + the five small pieces |
| B2 | triangle | id | the big triangle |
| B3 | trapezoid | mirX (same as id — symmetric) | a long base |
| B4 | parallelogram | id | the parallelogram's side matters (the last hole takes the piece only one way up) |
| B5 | tree | rot90 (the "arrow" shadow — the bank measured arrow ≡ tree turned) | a familiar figure, lying on its side |
| B6 | boat | mirX (facing the other way) | the same boat, mirrored |
| B7 | cat | id | a figure with a head and tail |
| B8 | rabbit | mirX | the rabbit facing left |
| B9 | square | id (the classic seven-piece square; the square has all 8 lattice symmetries, so its shadow never looks turned) | the hardest: the original tangram square |
Help setting "outlines" draws the seams of the bank's stored solution in the hollow (2 px pale lines); "no outlines" shows the plain shadow.

**Match board (10 rounds; ✓ = the plate standing exactly like the shadow; distractors are the same stored tiling under transforms OUTSIDE the figure's symmetry group, so their outline really differs):**
| # | figure | shadow | plates |
|---|---|---|---|
| M1 | cat | id | id ✓ · mirX · rot180 |
| M2 | boat | mirX | mirX ✓ · id · rot90 |
| M3 | rabbit | id | id ✓ · mirX · rot270 |
| M4 | tree | rot90 | rot90 ✓ · rot270 · id |
| M5 | parallelogram | id | id ✓ · mirX · rot90 |
| M6 | trapezoid | rot180 | rot180 ✓ · id · rot90 |
| M7 | triangle | rot90 | rot90 ✓ · rot270 · id |
| M8 | cat | mirX | mirX ✓ · id · rot90 |
| M9 | boat | id | id ✓ · mirX · rot180 |
| M10 | rabbit | rot90 | rot90 ✓ · mirD · rot270 |
(Never a distractor whose outline equals the shadow's: e.g. no mirX plate for the tree or the triangle — mirX is in their symmetry group, so that plate WOULD stand exactly like the shadow. The gate asserts it from the bank's `symmetryGroup`.)
**Measured by the critic (2026-10-17, `work-c26/t274.js`, reading the bank and `primitives/tangram.js` transforms):** symmetry groups — square all 8 · rectangle {id, rot180, mirX, mirY} · triangle {id, mirX} · tree {id, mirX} · arrow {id, mirY} · trapezoid {id, mirX} · parallelogram {id, rot180} · boat, cat, rabbit {id}. The **four mirror-asymmetric (chiral) figures are boat, cat, rabbit and parallelogram** — exactly the name-the-trick pool. In every match round M1–M10 exactly one plate's outline equals the shadow's; in N1–N8 every "turned" plate is a rotation of the shadow and every "flipped" plate a reflection (N3 and N6: mirY relative to mirX = rot180, a turn; N5: mirD relative to rot90 = mirX, a flip). Every match round has a distractor with the ✓'s bounding box (10 of 10, ≥ 4 required). Plates compared among themselves only (no look at the shadow): the "odd plate out" is the ✓ in 2 of the 7 rounds that have an odd one (M2, M8) — no tell.

**Name the trick (setting; 8 rounds, chiral figures only — cat, boat, rabbit, parallelogram — where a turn can never look like a flip):** the match round as above, then the two wrong plates go to ↻ (turned: its transform is a rotation) or ⇋ (flipped: a reflection).
| # | figure | shadow | turned plate | flipped plate |
|---|---|---|---|---|
| N1 | cat | id | rot180 | mirX |
| N2 | boat | id | rot90 | mirY |
| N3 | rabbit | mirX | mirY (= mirX turned 180°) | id |
| N4 | parallelogram | id | rot90 | mirX |
| N5 | cat | rot90 | id | mirD |
| N6 | boat | mirX | rot180 ∘ mirX (= mirY) | id |
| N7 | rabbit | id | rot270 | mirX |
| N8 | parallelogram | rot90 | id | mirA |
("Turned" and "flipped" are measured RELATIVE to the shadow: the gate composes the plate's transform with the inverse of the shadow's and classifies the result as a rotation or a reflection. N3: shadow mirX, plate mirY; mirY = rot180 ∘ mirX, a rotation of the shadow → "turned". N6 likewise.)

- **Answer position:** match: the ✓ plate stands in slots 1/2/3 with counts 4/3/3 over 10, the slot permuted per pass so two passes give 7/7/6; never the same slot three rounds running. Name the trick: the turned plate is above the flipped plate in 4 of 8 rounds. The gate also asserts the ✓ plate is not identifiable by its bounding box: in ≥ 4 of 10 rounds a distractor has the same bounding box as the ✓ (mirrors always do).
- **Order:** order-only reshuffle per pass.

## 7. Check, the misses, the success
**Build board:**
- The round succeeds the moment the seventh piece sinks (the table cannot be full otherwise — the seven tans' area equals the hollow's). Check before then is the "how am I doing?" button:
- **Check with no piece sunk** → hint "Drag a piece into the shadow. It sinks in when it fits." (no miss).
- **Check with pieces left and a solution still possible** → hint "Keep going — {n} pieces to go." (no miss).
- **Dead end** (the sunk pieces agree with NO tiling of this hollow — computed against the precomputed list of all tilings, §12):
  - **Miss 1:** the most recently sunk piece that broke every tiling glows coral and rises a few pixels. Hint: "This piece is in a spot where the others can't fit. Lift it out."
  - **Miss 2:** additionally, a pale ghost of that piece appears where it belongs in the nearest tiling (the one sharing the most sunk pieces). Hint: "Try it where the ghost is."
- **Success:** the marble roll, the figure standing up and doing its move, the shelf (§2). Bubble: "All seven pieces fit — {figure}!" naming the figure from the figure-word table (§9; the B5 shadow is "a tree lying down", since the bank's arrow is the tree turned) — e.g. "All seven pieces fit — a cat!".

**Match board:**
- **Check with no plate lifted** → hint "Pick the solution that stands exactly like the shadow." (no miss).
- **Check** lowers the lifted plate (250 ms).
- **Right:** it drops in flush, *clunk*, and the success sequence runs.
- **Miss 1:** the plate stops on the rim, tilted, and the hollow shows the disagreement: overhanging parts of the plate glow coral, parts of the hollow it leaves uncovered stay dark with a pale dashed edge. It goes back to its slot after 1.5 s. Hint: "It doesn't lie flat. Look for one that stands exactly like the shadow — not turned, not flipped."
- **Miss 2:** that wrong plate rises, performs the transform that would make it match — it TURNS in the air (with a drawn ↻ arc) or FLIPS over (card-flip with a drawn ⇋) — drops in to show it would fit if turned/flipped, then pops back out to its slot in its original pose. Hint: "That one is the same shape turned (or flipped). Find the one that is already standing the right way."
- **Name the trick:** after the right plate is in, the task line becomes "Is each of the others turned ↻ or flipped ⇋?" Check: a plate in the wrong tray demonstrates its true transform (turn or flip animation, as miss 2) and slides to the other tray; miss 2 adds the arc/arrow drawn on the plate. Success: "Yes — one is turned, one is flipped!"
- A new action clears any help until the next Check.

## 8. Settings (each visibly changes the board at rest)
1. **Board:** build the shadow / pick the solution / pick and name the trick — the right column shows the tray of seven pieces, the three plates, or the three plates plus the ↻ and ⇋ trays.
2. **Help** (build board; greyed elsewhere): outlines / no outlines — the hollow shows the solution's seams faintly, or is a plain shadow.

## 9. Words (EN source; the other 10 locales authored by hand, then one native + pedagogy reviewer)
- title (in-tool): "The Shadow Table"
- instruction: "Fill the shadow with all seven pieces. A piece sinks in when it lies exactly inside."
- task lines: build "Fill the shadow with all seven pieces." · match "Which solution stands exactly like the shadow?" · name "Is each of the others turned ↻ or flipped ⇋?"
- hints: hintStart "Drag a piece into the shadow. It sinks in when it fits." · hintGoing "Keep going — {n} pieces to go." · hintStuck "This piece is in a spot where the others can't fit. Lift it out." · hintGhost "Try it where the ghost is." · hintPick "Pick the solution that stands exactly like the shadow." · hintFlat "It doesn't lie flat. Look for one that stands exactly like the shadow — not turned, not flipped." · hintSame "That one is the same shape turned (or flipped). Find the one that is already standing the right way." (split into hintSameTurned / hintSameFlipped so no "(or …)" ships)
- figure words (celebration only): cat, boat, rabbit, tree, "a tree lying down" (the B5/M4 shadow), rectangle, triangle, trapezoid, parallelogram, square.
- celebrations: build "All seven pieces fit — {figureWithArticle}!" · match "Yes — it stands exactly like the shadow!" · name "Yes — one is turned, one is flipped!"
- settings: "Board" · "build the shadow" · "pick the solution" · "pick and name the trick" · "Help" · "outlines" · "no outlines"
- aria: tans by their kind and size ("large triangle", "small triangle", "square", "parallelogram") — naming the PIECE is the child's vocabulary, not the answer; state "in the tray / sunk / sticking out"; plates "solution {k} of 3"; the hollow "shadow of seven pieces".
- **Locale traps:**
  - **"turned" / "flipped":** de *gedreht / gespiegelt* (or *umgeklappt*), fr *tourné / retourné* (fr *retourné* = flipped over; *tourné* = turned — close words: the icons ↻ ⇋ carry the difference, and the panel must keep them distinct), es *girada / volteada*, it *girata / ribaltata* (or *capovolta*), pt *girada / virada* (pt *virada* can mean "turned" too — the panel may prefer *espelhada*), nl *gedraaid / gespiegeld*, sv *vriden / spegelvänd*, da *drejet / spejlvendt*, no *dreid / speilvendt*, fi *käännetty / peilattu*. Agreement with "solution" (fr *solution* f, es *solución* f, it *soluzione* f, pt *solução* f, de *Lösung* f) — the adjectives agree with the noun used.
  - **"shadow":** de *Schatten*, fr *ombre*, es *sombra*, it *ombra*, pt *sombra*, nl *schaduw*, sv *skugga*, da *skygge*, no *skygge*, fi *varjo* — the worksheet's own word in each locale (the native panel matches the G2-347 strings in `i18n/strings.<loc>.json`).
  - **figure articles:** "a cat" — de *eine Katze*, fr *un chat*, fi has no article ("kissa!"), sv/da/no use the indefinite article (*en katt*, *en kat*, *en katt*) — the celebration takes a per-locale `figureWithArticle` table, never string-glued. The tree vs fir tree: the bank renamed the figure from "house" to "tree" because it reads as a fir tree — de *Tannenbaum*, fr *sapin*, sv *gran*, fi *kuusi*: the panel uses the fir word, not the generic tree word.
  - **piece names (aria):** de *großes Dreieck / Quadrat / Parallelogramm*, fr *grand triangle / carré / parallélogramme*, fi *iso kolmio / neliö / suunnikas*.
  - fr U+202F before ! ? : ;
- **Sound off:** clunk vs perch, coral overhangs, the dark uncovered parts and the turn/flip animations carry everything.

## 10. Sound off, access, phones
- Keyboard path §5; every tan and plate is a focusable button; the turn/flip chip is reachable by Tab when a piece is held.
- Taps: tray cells ≥ 76 × 64; plates ≥ 104 × 96; turn/flip chip 44 × 44; sunk pieces are at least 46 px on their short side at 360.
- Fold: 360 × 740 → task 48 + table 300 + tray 150 + bubble/Check 60 = 558. 320 × 640: table 270 + tray 140 → 518. Check above both folds.
- Phone layout: the tray (or the plate row) goes under the table; the turn/flip chip floats above the finger so the finger never covers it.

## 11. Distinct from
- **Row 106 (grade 1) — Mim's Glow Workshop, the lantern:** light leaks through gaps and an overhang throws a shadow on a wall; its tangram match is done by holding a solution up to a lamp. Here the instrument is a carved INLAY BOARD: the shadow is a hollow, and depth is the judge — a piece sinks or perches; a turned plate rests on the rim and then demonstrates the turn or flip that would make it fit. 106 is about filling (no gaps, no overlaps) with many kinds of blocks; this is about the seven tangram pieces, their turns, the parallelogram's mirror twin, and naming turned vs flipped.
- **New #227 the shadow lamp** (a picture's shadow slides onto a wall shadow), **#228 the fold mirror**, **#229 the lightbox**: readiness picture-matching by light or folding; no composing, no pieces.
- **Row 37 / 38** (naming shapes) and **tool build-plan** (cube buildings): different skills.

## 12. Build plan
- **Core state:** `{board:'build'|'match'|'name', help:'outlines'|'none', round:{figure, T, plates?}, tans:[{id, rot (0..7 × 45°), flip:bool, pos:null|{x,y}, state:'tray'|'sunk'|'proud'}], lifted:null|plateIdx, named:{turned:null|i, flipped:null|i}, miss, help}`.
- **Core functions:** `hollow()` → the transformed silhouette loop (from the exported bank) · `placement(tan, x, y)` → nearest lattice placement within the snap radius · `inside(poly, hollow)` (concave-capable containment, the bank primitive's own algorithm ported) · `overlaps(poly, sunk)` · `tryDrop(tan)` → `'sunk'|'proud'` · `consistentTilings(sunk)` → filter of the precomputed tilings list · `deadEnd()` · `classify(platesT, shadowT)` → 'same'|'turned'|'flipped' (compose with the inverse; rotation vs reflection by determinant) · `check()`.
- **Precomputed data (build time):** for every build round's (figure, T), ALL lattice tilings of the hollow by the seven tans, enumerated with the bank primitive `countTilings` (extended to return the tilings) and stored in `shadow-table-figures.json`; the gate re-enumerates and compares counts.
- **Gate's own ground truth (verify-shadow-table-core.js):** for each build round the stored tiling sinks all seven pieces in some order and the hollow is then exactly covered (area and outline); a piece shifted one lattice step outward perches; flipping any non-parallelogram tan leaves its polygon set-equal; for each match round exactly one plate's outline equals the shadow's (outline keys compared under no transform) and every distractor's transform lies outside the figure's symmetry group; name rounds' classifications by determinant; slot balance; same-bounding-box decoys in ≥ 4 match rounds.
- **Mutations:** a piece that sticks out 1 lattice step still sinks · overlap with a sunk piece allowed · flip changes a triangle · the parallelogram sinks either side up · a distractor plate whose transform is in the symmetry group (would also match) · match judged by bounding box instead of outline · "turned/flipped" classified by the plate's absolute transform instead of relative to the shadow (kills N3/N6) · dead end missed (a sunk piece breaking every tiling is not flagged) · the ✓ plate always in slot 1 · help survives a new drop.
- **Pictures to verify:** none (all geometry).
- **Risks:** snap radius vs lattice density — the √2 lattice has close candidate spots; prefer the spot nearest the drop AND inside; perf of `consistentTilings` is trivial (tens of tilings per figure). The extended tiler must return tilings, not only count them (bank primitive change happens in a NEW script under `mini tools/` tooling, never by editing the worksheet primitive).
- **BLOCKED:** nothing. (Optional growth: more figures — house, swan, fish, candle, rocket — can be added to the bank only through its load-time validator `tools/gate-tangram-figures.js`; the activity takes them automatically.)

## 13. The four questions
1. **Would a 5–8-year-old choose it again?** Yes — it is the wooden tangram tray they know, with the clunk of a piece dropping in, a marble rolling across the finished table, and a figure that stands up and moves.
2. **Would a teacher put it on the board?** Yes — composing with exact fit, the parallelogram's mirror twin, and "turned or flipped is not the same" are all shown by the board itself, and the name-the-trick step gives the class words for the transformations.
3. **Would a parent trust it?** Yes — calm, no score, the same validated figures as the printable worksheets, nothing hand-drawn.
4. **The invention, in one sentence:** the shadow is a hollow carved into the table, so a piece sinks flush only when it lies exactly inside, and a turned or flipped solution perches on the rim until it shows you the turn or flip that would make it fit.

## 14. Critic review (2026-10-17)
Scores before → after: invention 5→5 · fun 5→5 · completeness 4→5 · correctness 4→5 · distinctness 5→5 · reality 4→5
What changed:
- Read the real bank + transforms: symmetry groups measured; the four chiral figures are boat, cat, rabbit, parallelogram; M1–M10 each have exactly one matching plate; N1–N8 turned/flipped classifications all correct relative to the shadow; same-bbox decoys 10/10; no "odd plate out" tell.
- "The parallelogram sinks only one way up" was overstated (a wrong-way piece can sink in a roomy hollow) → reworded to the last hole; dead-end help covers the rest.
- Plates at 0.5 × table scale overflowed their 120 px slot (cat 170 px) → one common fit scale per round; tray at 0.5 (0.6 overflowed the 120 px column).
- Distinct from row 106 (light-leak lantern): depth inlay + turn/flip demonstration + name-the-trick.
