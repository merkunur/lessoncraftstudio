# New 307 — The Cube Stacker: lift a layer and the hidden cubes turn coral (5.MD.C.4, taught in Grade 3)

## 0. Identity
- id `cube-stacker.play.5-md-c-4` · grade label 3 (as the worksheet; 5.MD.C.4 is the code) · strand Measurement & Data · files `mini tools/cube-stacker-core.js`, `cube-stacker-activity.js`, `cube-stacker-activity.html`, `cube-stacker-activities.json` (key `cube-stacker`; scaffold `node scripts/new-activity.js --num=307`).
- worksheets it covers: **G3-346 "Cube Towers"** (count all the cubes in each tower, write the total — single-depth walls) — the first rounds of the small pool ARE those walls; the instrument then goes where the worksheet deliberately stops (the worksheet uses one-deep walls because "a full box hides cubes in the picture") — and teaches exactly that hidden part.
- new instrument (no old activity).

## 1. The pitch
"Every tower comes apart in layers — lift the top layer and it floats over to the shelf and lies flat, and every cube you could NOT see in the tower lights up coral on that flat layer: you find out exactly how many were hiding."

## 2. Why a child will want it again (the fun)
- **Lifting is delicious.** Grab the lift bar on the top layer and pull up: the whole slab of cubes rises with the finger, a little wobble of weight, then swings over to the shelf and *unfolds flat* — the iso slab turns into a top-down grid of squares (300 ms rotation) and settles with a soft wooden *tock*.
- **The coral surprise.** On the flat layer, every square whose cube was invisible in the tower blushes coral one by one (60 ms each) with a tiny *pip* — "there were four hiding in there!" The bigger the tower, the bigger the hidden crowd, and children start predicting how many will blush.
- **The turntable.** A round turn button spins the tower a quarter turn (400 ms) — you see other sides, but the cubes in the middle never show from any side. The child can spin it all they like; the middle stays secret until lifted. That is a discovery, not a rule.
- **The re-stack.** After the answer, the layers fly back and stack with a satisfying *tock-tock-tock*, bottom first, each landing exactly on the one below.
- **The earned show:** on success the whole tower is drawn as glass for a second — every cube's outline visible, the hidden ones glowing coral inside — then it solidifies again. The child *sees through* the tower they just counted.

## 3. The skill and the misconception
- **Skill (5.MD.C.4, G3-346):** find the number of unit cubes in a solid by counting, including the cubes you cannot see; a box is layers that are all the same, so count one layer and count the layers.
- **Misconception 1 — counting only the cubes you can see** (3×3×2 looks like 14 cubes). *Push-back:* the lifted layer lies flat, all its cubes visible, and the ones the tower hid are coral — the child sees the difference between "seen" and "there".
- **Misconception 2 — counting faces instead of cubes** (top + front + side squares: 21 for that box). *Push-back:* on a miss with the face number, every visible face of the tower gets a dot and the cubes that show three faces get three dots — the child sees one cube being counted three times.
- **Misconception 3 — adding the dimensions (3 + 3 + 2).** *Push-back:* the layer shelf shows layers as flat grids; 3 + 3 + 2 = 8 is visibly smaller than ONE flat layer of 9.

## 4. The stage
Layout `split` at ≥ 700 px; stacked below. All cubes are drawn apparatus (isometric unit cubes, three shades of one colour: top light, left mid, right dark, 2 px ink outline) — no pictures.

**At 704 — left 420 px, right 252 px:**
- **The tower stage (left, 420 × 380):** the solid in isometric view (view from the front-right, showing top, front and right faces), on a drawn round turntable (ellipse 300 × 80, teal rim). Cube edge: chosen per round so the tower's bounding box fits 380 × 340, clamped **28–56 px** (a 5×4×3 box uses 36 px; a 2×2×2 uses 56 px).
- **The lift bar:** a 44 px-tall teal bar with a white grip dot, floating just above the top layer, as wide as that layer's iso width (min 88 px). In "just the top layer" mode the lower layers carry a small drawn padlock instead of a bar.
- **The turn button:** a 52 px round button at the turntable's right with a curved-arrow icon (geometry).
- **The layer shelf (right, 252 × 340):** a wooden shelf with slots stacked top to bottom; each lifted layer lies flat as a top-view grid of squares (cell ≥ 18 px at 704: a 5×4 layer = 5 × 4 cells of 22 px); grey squares = cubes you could see in the tower, coral squares = cubes the tower hid. Layers on the shelf are numbered by their layer, bottom = 1, with a small drawn layer-stripe (not a word).
- **The answer box:** under the shelf, a big answer box (120 × 64, Baloo 2 40 px) and the shell's number keypad (keys 52 px) — the child types the total.
- **Task line** above, 22 px, ≤ 2 lines.

**At 360 — stacked:** task line · the tower stage 330 × 260 (cube edge clamped 22–40 px; 5×4×3 → 26 px) with lift bar (44 px tall) and turn button (48 px) · the layer shelf becomes a horizontal tray 330 × 120 below the tower: flat layers sit side by side, scaled to fit (cell ≥ 12 px; a 5×4 layer at 14 px) and the tray scrolls sideways if four layers do not fit · answer box (100 × 52) + keypad (4 columns, keys 48 px) · Check. Check at y ≈ 700 on 360 × 740: the keypad is the tallest block, so on phones the keypad opens as a sheet over the tray only when the answer box is tapped (the box is ≤ 520 px down), keeping Check above the fold at 360 × 740 and 320 × 640.

No words on the apparatus: numerals (answer, layer stripes) and icons only.

**Task lines (EN):**
- count: "How many cubes are in this tower? Count the ones you cannot see too."
- count, one layer only: "How many cubes are in this tower? You may lift only the top layer."
- stepped: "How many cubes are in this stepped tower? Some are hiding at the back."

## 5. The hand
- **Lift:** pointerdown on the lift bar (hit 56 px) → the top layer detaches (its cubes move as one slab, 1.02 scale "picked up" shadow) and follows the finger upward (≤ 16 ms response). Releasing anywhere above the tower's top (or a drag ≥ 40 px) sends it: the slab flies to the next free shelf slot (360 ms), rotates from iso to top view (300 ms), lands (*tock*), then the coral blush runs. Release below the threshold: the slab drops back (spring, 200 ms). The next layer then shows its lift bar.
- **Put back:** dragging a flat layer from the shelf back over the tower (or tapping the tower's top when the shelf is non-empty) re-stacks the most recent layer (reverse animation). Layers can only come back in order (the top of the shelf first), so the tower always rebuilds correctly.
- **Turn:** tap the turn button → the tower and turntable rotate 90° (400 ms); the iso view redraws from the next corner. Lifting works from any turn.
- **Type:** tap the answer box → keypad; digits appear in 40 px; ⌫ deletes.
- **Keyboard:** Tab → lift bar (Enter lifts, Shift+Enter puts back) → turn button → answer box (digits) → Check.
- **Free play:** lifting, re-stacking and turning are free and unscored at any time — the child can fully dismantle the tower before answering. In "just the top layer" mode only one lift is allowed; the next bar is padlocked.

**What "coral" means, exactly (one honest rule):** a square is coral when its cube had **no face showing in the view the tower was standing in** at the moment its layer was lifted — "you could not see it from where you were looking". The marks are fixed at lift time and travel with the layer. So a child who turns the tower first and then lifts gets different coral squares on the outside of a layer (the back cubes they now can see turn grey), but the middle cubes of a big box are coral from every turn — the turntable lets the child discover that by themselves. The answer and the hints never depend on the turn: the hidden count printed in hints is always the default-view number of §6, and in any other turn the bubble uses the count actually marked on the shelf.

## 6. The rounds
One round = one solid; the child types the total. Computed in `work-39/cubes.js` (tot = cubes; vis = cubes with a visible face in the default view; faces = visible faces in the default view).

**Pool "small boxes" (≤ 24 cubes, 9 rounds):**

| # | solid (l × w × h) | total | visible in the default view | hidden there | faces seen | layers |
|---|---|---|---|---|---|---|
| 1 | wall 3 × 1 × 3 | 9 | 9 | 0 | 15 | 3, 3, 3 |
| 2 | wall 5 × 1 × 2 | 10 | 10 | 0 | 17 | 5, 5 |
| 3 | box 2 × 2 × 2 | 8 | 7 | 1 | 12 | 4, 4 |
| 4 | box 3 × 2 × 2 | 12 | 10 | 2 | 16 | 6, 6 |
| 5 | box 2 × 2 × 4 | 16 | 13 | 3 | 20 | 4, 4, 4, 4 |
| 6 | box 3 × 3 × 2 | 18 | 14 | 4 | 21 | 9, 9 |
| 7 | box 2 × 3 × 3 | 18 | 14 | 4 | 21 | 6, 6, 6 |
| 8 | box 5 × 2 × 2 | 20 | 16 | 4 | 24 | 10, 10 |
| 9 | box 4 × 2 × 3 | 24 | 18 | 6 | 26 | 8, 8, 8 |

(The two walls are the worksheet's G3-346 page, warm-ups with nothing hidden; #6 and #7 have the same total and a different shape on purpose — the lift shows 9 + 9 against 6 + 6 + 6.)

**Pool "big boxes" (≤ 60 cubes, 9 rounds):**

| # | solid | total | visible | hidden | faces | layers |
|---|---|---|---|---|---|---|
| 1 | 4 × 3 × 2 | 24 | 18 | 6 | 26 | 12, 12 |
| 2 | 7 × 2 × 2 | 28 | 22 | 6 | 32 | 14, 14 |
| 3 | 5 × 3 × 2 | 30 | 22 | 8 | 31 | 15, 15 |
| 4 | 4 × 3 × 3 | 36 | 24 | 12 | 33 | 12, 12, 12 |
| 5 | 5 × 4 × 2 | 40 | 28 | 12 | 38 | 20, 20 |
| 6 | 7 × 3 × 2 | 42 | 30 | 12 | 41 | 21, 21 |
| 7 | 5 × 3 × 3 | 45 | 29 | 16 | 39 | 15, 15, 15 |
| 8 | 4 × 4 × 3 | 48 | 30 | 18 | 40 | 16, 16, 16 |
| 9 | 5 × 4 × 3 | 60 | 36 | 24 | 47 | 20, 20, 20 |

(Big #1, 4 wide × 3 deep × 2 high, has the same 24 cubes as small #9, 4 wide × 2 deep × 3 high — on purpose: the same box lying down shows 12 + 12 on the shelf instead of 8 + 8 + 8, and the hidden count is 6 both times. 3 × 3 × 3 and 4 × 4 × 2 are deliberately absent: their visible-face count equals their cube count — 27 and 32 — so the face-counting misconception would be "right" by coincidence and its hint could never fire.)

**Pool "stepped towers" (9 rounds; height map rows listed back → front, columns left → right):**

| # | heights | total | visible | hidden | faces | layers (bottom → top) |
|---|---|---|---|---|---|---|
| 1 | [2,2,1] / [2,1,1] | 9 | 7 | 2 | 15 | 6, 3 |
| 2 | [3,2,1] / [2,1,1] | 10 | 7 | 3 | 17 | 6, 3, 1 |
| 3 | [2,2,2] / [2,2,1] | 11 | 9 | 2 | 16 | 6, 5 |
| 4 | [3,3] / [2,2] / [1,1] | 12 | 9 | 3 | 18 | 6, 4, 2 |
| 5 | [3,2,1] / [2,2,1] / [1,1,1] | 14 | 9 | 5 | 21 | 9, 4, 1 |
| 6 | [4,3,2,1] / [3,2,1,1] | 17 | 11 | 6 | 25 | 8, 5, 3, 1 |
| 7 | [3,3,2] / [3,2,2] / [2,2,1] | 20 | 13 | 7 | 25 | 9, 8, 3 |
| 8 | [3,3,3] / [3,3,2] / [2,2,1] | 22 | 14 | 8 | 26 | 9, 8, 5 |
| 9 | [4,3,3] / [3,3,2] / [3,2,1] | 24 | 15 | 9 | 29 | 9, 8, 6, 1 |

Every stepped tower falls (never rises) toward the front and toward the right, so nothing overhangs and a cube's visibility is decided by its three neighbours (the gate checks this property). In every non-wall round the total, the visible count, the face count and l + w + h (boxes) are four different numbers (asserted), so each misconception has its own hint; in the two walls visible = total by nature (nothing hides — the warm-up the worksheet asks).

**Answer position:** none — the answer is typed. Guessability is measured instead: the gate asserts no constant answer appears twice in a row and that the "visible-only" bot (types the visible count) scores 2/9 in the small pool (only the two walls), 0/9 in big and stepped; the "faces" bot 0/27; the "l + w + h" bot 0/27.

**Order:** order-only reshuffle per pass, except small-pool rounds 1–2 (the walls) open the first pass of the small pool, then join the shuffle from pass 2.

## 7. Check, the misses, the success
- **Check with an empty box** → hint, no miss: "Type how many cubes. You can lift the layers first."
- **Miss 1** → the apparatus answers the specific error:
  - typed = the visible count: the top layer lifts itself (if still on the tower), lands flat and its coral squares blush slowly; hint "You counted the cubes you can see: {typed}. Some cubes are hiding inside — lift the layers and look for coral."
  - typed = the visible-face count: every visible face gets a dot, the corner cube's three dots pulse together; hint "That counts faces, not cubes. A cube on the corner shows 3 faces but it is still 1 cube."
  - typed = l + w + h: the shelf shows one full flat layer beside the number; hint "One layer alone has {layer} cubes — more than {typed}."
  - any other wrong: the next unlifted layer lifts itself; hint "Lift the layers and count each one."
- **Miss 2** → every layer lifts onto the shelf (staggered 250 ms), each flat layer's squares number themselves 1…n (rows first), and a running total appears beside each layer as it is counted: for a box "{layer} + {layer} …" written once under the shelf — the child reads it and types. Hint: "Each layer has {layer} cubes. There are {layers} layers." (stepped: "Count each layer on the shelf, then add them.")
- A new action (lift, put back, turn or typing) takes the help away until the next Check.
- **Success** → the layers fly back and stack (*tock-tock-tock*), the tower turns to glass for 1.2 s showing every cube with the hidden ones glowing coral inside, then solid again; the answer box flashes gold. Bubble: box "Yes! {layers} layers of {layer} cubes: {total} cubes, and {hidden} of them were hiding." · stepped "Yes! {total} cubes — {hidden} of them were hiding at the back." · wall "Yes! {total} cubes — every one of them shows."

## 8. Settings
1. **Solids: small boxes (≤ 24) · big boxes (≤ 60) · stepped towers.** Visible at rest: the tower on the turntable changes size/shape.
2. **Lifting: every layer · just the top layer.** Visible at rest: in "just the top layer" the lower layers show padlocks instead of lift bars. Stepped towers have layers of different sizes, so this setting is greyed out for them (the control shows its padlock; aria "only for boxes").

## 9. Words (EN source)
- title: "The Cube Stacker" · instruction: "Lift the layers off the tower. Coral squares are the cubes you could not see."
- prompts: the three task lines in §4 · hints: §7 (empty, four miss-1 variants, two miss-2 variants) · celebrations: three in §7 · settings: "Solids", "small boxes", "big boxes", "stepped towers", "Lifting", "every layer", "just the top layer", aria "only for boxes".
- aria: tower "A tower of cubes, {w} wide, {d} deep, {h} high" (stepped: "A stepped tower, {h} cubes at its highest") · lift bar "Lift the top layer" · turn button "Turn the tower" · shelf layer "Layer {n}: {cells} squares, {coral} were hidden".
- **Locale traps:** "cube" — de *Würfel* also means a die (fine here: unit cubes are taught as *Einheitswürfel*/*Würfel* in German maths; never pair with a dice picture); da *terning* likewise means die — use *klods*/*terning* per the da panel (Danish maths uses *centicubes*/*terninger*); fr *cube*, es *cubo*, it *cubetto*, pt *cubinho*, nl *kubus/blokje*, sv *kub*, no *kube/terning*, fi *kuutio*. Plurals after numerals authored per class (fi partitive "24 kuutiota", "kerrosta"). "layer" (de *Schicht*, fr *couche/étage*, es *capa*, it *strato*, pt *camada*, nl *laag*, sv *lager*, da *lag*, no *lag*, fi *kerros*). No decimal, money or date traps.

## 10. Sound off, access, phones
- Legible with the sound off: coral squares, dots on faces, numbered squares and the typed numeral carry everything; sounds (*tock*, *pip*) are decoration.
- Keyboard path as §5; aria-live on the shelf ("Layer 2 on the shelf: 9 squares, 4 were hidden").
- Taps: lift bar 44 px tall (hit 56), turn button 52/48 px, keypad keys ≥ 48 px, Check 48 px.
- No pictures, so no picture floor applies; cube edges ≥ 22 px at 360.
- Phones: the shelf becomes a sideways tray, the keypad a sheet (§4); Check above the fold at 360 × 740 and 320 × 640.

## 11. Distinct from
- **Premium `build-plan` (The Blueprint)**: nine numerals on a blueprint edit an isometric building and its front/side views. The Cube Stacker has no blueprint, no views, no editing: it takes a given solid apart by layers and marks the hidden cubes.
- **#20 The Block Towers** (one column per number, K.CC.C.7) and **New 305 Tile Roller** (area as rows × row): flat or single-column; no hidden cubes.
- **New 275 The Ink-Pad Solids** (faces of solids print on an ink pad): about faces, not counting cubes.
- Registry: no built or designed invention lifts layers or reveals hidden cubes.

## 12. Build plan
- **Core (`CubeStackerCore`, pure):** `voxels(solid)` from a box (l,w,h) or height map · `layers(voxels)` → arrays of cells per z · `visibleIn(view, voxels)` → set of cubes with an exposed face toward the camera in that view (top, front, right relative to the view; occlusion by neighbours, valid because solids are monotone toward the viewer in the default view — for the three other turns the core rasterises: project each cube's three faces in draw order back-to-front and keep cubes that own ≥ 1 painted pixel on a 4 px grid) · `hiddenAtLift(view, voxels, z)` = the layer-z cubes not in `visibleIn(view)` (frozen onto the shelf layer when it lands) · `faceCount(view)` · `grade(round, typed)` → `{ok, kind: 'visible'|'faces'|'sum'|'other'}`.
- **Paint order:** ascending x + y + z in the current view frame (correct for any monotone stack — the recorded #44 lesson: never copy a box-only z/y/x loop).
- **Gate (`scripts/verify-cube-stacker-core.js`):** recompute every number in §6 from voxels (never from stored values); assert total ≠ visible ≠ faces ≠ l+w+h in every round; assert each stepped height map is monotone (non-increasing toward front and right); assert the rasterised visible set equals the neighbour rule in the default view (a cross-check of the two methods); assert the default-view hidden set is non-empty in every non-wall round and that the cubes hidden in ALL four turns (the true middle) are exactly (l − 2)(w − 2)(h − 1) — non-empty in every box with l ≥ 3, w ≥ 3, h ≥ 2 (small #6; big #1, #3–#9), and honestly 0 elsewhere (so the prose never claims "hidden from every side" for them); assert every EN bubble/hint number equals the model; poison: a stepped map with an overhang must be rejected.
- **Mutations:** visible set ignores the right face · coral marks recomputed after a turn (must stay frozen at lift time) · layers counted top-down with an off-by-one · grade accepts the visible count · grade's kind 'faces' vs 'visible' swapped · paint order z/y/x (fails the stepped cross-check) · put-back allows out-of-order layers · "just the top layer" lets a second lift happen · walls promoted into the shuffle in pass 1 · the bubble's hidden count read from the default view after the child turned the tower.
- **Local test:** real pointer lifts of every layer, put-backs, all four turns, every round, 7 widths; screenshot each flat layer and assert the coral squares on each layer = the model's hidden-at-lift set for the turn the child was in.
- **Pictures:** none. **Risks:** the coral rule is explained only by showing (squares blush on the flat layer) — the prose never states a formula. Nothing blocked.

## 13. The four questions
1. **Choose it again?** Yes — pulling a slab of cubes off and watching it unfold flat, then the coral blush, is pure toy.
2. **Teacher on the board?** Yes — it shows the step the worksheet avoids (cubes you cannot see), and "count one layer, count the layers" falls out of the shelf.
3. **Parent trust?** Calm, drawn cubes, nothing scored, no words on the apparatus.
4. **The invention:** lift a tower apart layer by layer and every cube the tower was hiding turns coral on the flat layer.

## 14. Critic review (2026-10-17)
Scores before → after: invention 5→5 · fun 5→5 · completeness 5→5 · correctness 5→5 · distinctness 5→5 · reality 5→5
What changed:
- Re-solved all 27 solids with my own voxel oracle (`work-c39/cubes.js`: top/front/right exposure, monotone check, four-turn "true middle"): every total, visible, hidden, face count and layer list in §6 is right; every stepped map is monotone; the true-middle formula (l − 2)(w − 2)(h − 1) holds and is non-zero exactly in the rounds §12 names; total ≠ visible ≠ faces ≠ l + w + h in every non-wall round, and the 3 × 3 × 3 / 4 × 4 × 2 face-count coincidence is correctly excluded.
- Named the deliberate twin (big #1 vs small #9, the same 24-cube box lying vs standing) so a builder does not "fix" it.
- No other change: the lift-and-blush invention is the skill, the coral rule is honest and frozen at lift time, and "just the top layer" forces layers × layer.
