# New 244 — The Rising Camera → THE CAMERA THAT CLIMBS (maps: points of view)

## 0. Identity
- id `rising-camera.play.maps-points-of-view` · grade K · framework SOCIAL-STUDIES (maps / points of view; `alignment.framework` from `frontend/lib/frameworks.ts`) · strand Social Studies · files `rising-camera-core.js`, `rising-camera-activity.js`, `rising-camera-activity.html`, `rising-camera-activities.json` (scaffold `--num=244`).
- Worksheets covered: **K-377 "Bird's-Eye View: From the Side and From Above"** (each thing drawn from the side; draw a line to the same thing seen from above) = Match mode; the worksheet's "derangement" rule (the top views never sit across from their side views) is kept: on the stage nothing sits where its footprint is.
- New instrument (no old activity).

## 1. The pitch
"Drag the camera up its arc and watch the table turn under it — the mug becomes a ring with a tab, the ball becomes a circle — then put each thing on its footprint on the map, and press Check: the camera climbs to the ceiling and takes the photo — and the map's outlines show in its viewfinder, so every thing either fills its outline or doesn't."

## 2. Why a child will want it again
- **A camera you can fly.** A camera knob rides a quarter-circle rail beside the stage. Drag it up and the view swings smoothly from "eye level at the table edge" to "straight down from the ceiling": the table top opens out from a thin line into a full rectangle, the cylinder's side shrinks while its top swells into a circle, the cone's point slides to the middle of its own circle. It is mesmerising; children sweep it up and down over and over.
- **The snapshot.** On Check the camera flies itself to the very top of its arc, the things on the table glide to the spots your cards gave them, the map's footprint outlines fade in as guide lines in the camera's viewfinder — and the shutter clicks with a white flash. Every thing that fills its outline turns it teal; the photo is the map. Children wait for the click like a school photo.
- **Guess-first rounds** later in the pass lock the camera at the side ("the camera is shy") — the child must imagine the top view, then Check flies the camera up for the reveal. Being right before seeing feels like magic.

## 3. The skill and the misconception
- **Skill:** a thing seen from above looks different from the side; match side views to top views (circle, ring, square, long rectangle…); the top view is what a map shows.
- **Misconceptions and how the camera pushes back:**
  1. *The top view looks like the side view* (drawing a mug from above as a mug). The continuous morph shows the side shape SHRINKING to nothing as the camera rises while the top surface grows; at 90° only the footprint is left. And the snapshot shows the object's real top inside the outline the child chose — a side-shaped guess visibly does not fill it.
  2. *Matching by position* (the object on the left goes to the footprint on the left). The table never puts an object where its footprint is on the map (a derangement every round).
  3. *Things that are "round" are all the same from above.* From the top a ball is a filled circle; a glass is a ring (you see into it); a mug is a ring with a tab (the handle) — in the snapshot each sits in its own outline, so the difference is visible.

## 4. The stage
Layout stacked (camera view on top, map + tray below); bubble under the map.

**At 704 px** (stage 640 × 580):
- **The camera view** (460 × 300, top-left): a cream backdrop with a drawn **table** (top 400 × 200 in table units; at camera angle φ its top projects to 400 × 200·sin φ, its front edge 400 × 24·cos φ, four legs visible below φ = 40°). On it, 3 or 5 **drawn solids** (apparatus geometry, flat colours, 2–3 px ink, one soft shade on curved sides): see the object table below. Rendered by a small orthographic SVG renderer (§12).
- **The arc rail** (right of the view, quarter circle radius 200, drawn as a teal track 8 px) with the **camera knob** (a drawn rounded box with a lens circle, 56 px; target 64 px). Tick marks at 0°, 30°, 60°, 90°. A thin dashed "sight line" runs from the lens to the table centre.
- **The map card** (bottom-left, 320 × 200): a paper card with a ruled border showing the table from straight above in ink outline: its footprints at 3 or 5 positions (ink outlines, no colour, 80–100 px). Footprints are the drop zones (each ≥ 96 × 96).
- **The tray** (bottom-right, 280 × 220): the side cards — library pictures, 96 px (5 things: 3 + 2 rows at 96).
- **Build-the-map mode:** the map card shows footprints; the table has 6 drawn spot rings (2 × 3 grid); the tray holds the drawn solids at side view (as they look at φ = 0).

**At 360 px** (stage 336 × 680): camera view 336 × 230 with the arc rail drawn along its right edge (knob 48 px, radius 150); map card 320 × 190 below; tray row of 3 cards at 80 px (5 things: rows of 3 + 2 at 72 px). At 320: view 296 × 210, cards 64.

**Objects** (side card = library; stage solid = drawn twin; footprint = what the camera sees at 90°):
| key | side card | drawn solid on the table | top view / footprint |
|---|---|---|---|
| cube | drawn cube, side view | violet cube | square |
| pyramid | drawn square pyramid, side view | pink square pyramid | square with an X (its four edges meeting at the apex) |
| cone | drawn true cone (pointed), side view | gold cone | circle with a dot in the middle |
| cylinder | drawn cylinder, side view | purple closed cylinder | circle |
| sphere | drawn sphere, side view | pink sphere | circle (shaded) |
| ball | toys/ball | white ball with one dark pentagon on top | circle with a small pentagon |
| glass | kitchen-tools/glass | pale-blue see-through open cylinder | ring (rim + bottom inside) |
| mug | kitchen-tools/mug | blue open cylinder with a loop handle | ring with a tab |
| book | classroom/book | red flat box with cream page edges | long rectangle |
| dice | toys/dice | red cube with white pips (5 on top) | square with five dots |
Contact sheets opened (`shapes.png`, `kitchen-tools.png`, `toys.png`, `classroom.png`). **Shapes-set side cards are DRAWN, not library:** the library shapes are drawn from above at varying angles in different colours, and `shapes/cone` is a TRUNCATED cone (flat top — PICTURE-RULINGS), whose top view would be a circle in a circle, not a circle with a dot. The side cards are therefore the renderer's own solids at a fixed eye height φ = 15° (just above the table edge — low enough that the top is a thin sliver, high enough that the cone's curved base and the pyramid's two faces tell apart two otherwise identical triangle silhouettes), in the same colour as their table twin — geometry is apparatus (rule 5). The Things set stays library pictures. **Refused:** sphere and cylinder in the same round (both are a circle from above); toys/blocks (a pile — no single footprint); cup (the same footprint as the mug); bowl and plate (rings like the glass); shapes/rectangular_box (no 11-locale label); a cone everyday object (none in the library — cones stay shapes only).

**Task lines** (≤ 24 px): Match "Lift the camera. Put each thing on its footprint." · Match, guess-first rounds "The camera stays low. Put each thing on its footprint, then Check." (prompt changes only between rounds, never within) · Build "Put the shapes on the table so the map is right."

No words on the apparatus.

## 5. The hand
- **Camera knob:** drag along the arc (pointer projected to the arc angle; ≤ 16 ms frame update). The view re-renders continuously; on release it settles to the nearest tick within 6° (120 ms). Tap a tick mark = glide there (400 ms). Keyboard ↑/↓ = 15° steps.
- **Side cards:** drag a card onto a footprint (lifts 6 px, shadow); it sits there at 70 % size over the footprint (the footprint outline still visible around it). Dropping on an occupied footprint swaps. Drag back to the tray to undo. Tap-tap works.
- **Build mode:** drag a drawn solid onto a table spot; it lands with a little bounce (side view at any φ — the solid is re-rendered at the current camera angle as soon as it lands).
- **Check = the snapshot (§7):** the camera glides to 90° (500 ms, from wherever it is — in a locked round this is the first time the child sees the top); each table object glides across the table to the spot that matches the map footprint holding its card (400 ms); the map's footprint outlines fade in as ink guide lines in the viewfinder (200 ms); the shutter closes and opens (a white flash at 30 % opacity, 120 ms — no strobe). Fit → the outline turns teal and fills with the solid's colour at 40 %. No fit → the outline turns dashed coral and the object's true top view sits inside it, visibly not filling it (a ring in a square, a circle in a long rectangle) for 1.2 s; then the camera stays up, the misfit object glides back to its table spot and its card returns to the tray. Nothing is pressed, printed or rolled — the check is a photograph taken from above.
- **Sound (optional):** a soft servo hum while the camera moves, a shutter click on the snapshot, a click on drop. TTS says the object name when a card is picked up.
- **Free play:** the camera is always live (outside guess-first rounds); after success the photo stays pinned over the map and the camera can be swept to watch the objects become their footprints.

## 6. The rounds
**Match — Shapes (3 objects), 9 rounds per pass** (table order left→right; map order left→right; no object sits at the same index on both — a derangement):
| # | table | map footprints | camera |
|---|---|---|---|
| 1 | cube, cone, cylinder | cone, cylinder, cube | free |
| 2 | sphere, pyramid, cube | pyramid, cube, sphere | free |
| 3 | cylinder, pyramid, cone | cone, cylinder, pyramid | free |
| 4 | cone, cube, sphere | sphere, cone, cube | free |
| 5 | pyramid, cylinder, cube | cube, pyramid, cylinder | locked |
| 6 | sphere, cone, pyramid | pyramid, sphere, cone | locked |
| 7 | cube, pyramid, cone | pyramid, cone, cube | locked |
| 8 | cylinder, cube, pyramid | pyramid, cylinder, cube | locked |
| 9 | cone, sphere, cube | cube, cone, sphere | locked |
(7 distinct 3-sets exist without the sphere–cylinder clash; rounds 7–9 reuse sets 1, 3, 4 shapes with new layouts.)

**Match — Things (5 objects), 9 rounds per pass:** all five every round; the table order and the map order share no index (a derangement) and the map is never a rotation of the table (so neighbour order is no tell either); each footprint stands in each of the 5 map positions once or twice per pass.
| # | table (left → right) | map footprints (left → right) | camera |
|---|---|---|---|
| 1 | mug, book, dice, glass, ball | glass, mug, ball, dice, book | free |
| 2 | book, mug, dice, ball, glass | ball, dice, glass, mug, book | free |
| 3 | ball, dice, glass, book, mug | book, ball, mug, dice, glass | free |
| 4 | glass, mug, book, dice, ball | book, dice, glass, ball, mug | free |
| 5 | ball, mug, dice, book, glass | dice, book, mug, glass, ball | locked |
| 6 | ball, mug, glass, dice, book | dice, glass, book, mug, ball | locked |
| 7 | dice, ball, mug, book, glass | mug, book, ball, glass, dice | locked |
| 8 | dice, mug, book, ball, glass | ball, glass, dice, book, mug | locked |
| 9 | dice, ball, mug, book, glass | glass, mug, book, ball, dice | locked |
- **Answer position:** footprint classes are balanced over map positions: Shapes — each footprint in each of the 3 positions 2–4 times per pass; Things — each in each of the 5 positions 1–2 times. The gate also asserts table-index ≠ map-index for every object in every round (no position tell), and that the first tray card's footprint is in map position 1 ≤ 1/3 of rounds.

**Build the map — 9 rounds:** the map card shows 3 shape footprints on 3 of 6 grid spots; the child places the solids on the matching table spots. Layouts (spot numbers 1–3 top row, 4–6 bottom): 1: cube@1 cone@5 cylinder@3 · 2: pyramid@4 sphere@2 cube@6 · 3: cone@1 pyramid@6 cylinder@2 · 4: cube@3 sphere@4 cone@5 · 5: cylinder@1 cube@2 pyramid@6 · 6: sphere@3 cone@4 pyramid@5 · 7: cube@4 pyramid@2 cone@6 · 8: cylinder@5 cube@1 pyramid@3 · 9: cone@2 sphere@6 cube@4. Every spot used 4–5 times per pass; one right arrangement each (all three footprints distinct).
- **Order:** order-only reshuffle per pass within the free block (1–4) and within the locked block (5–9) — the free rounds always come first (the ladder), each block reshuffled, pass 2 ≠ pass 1.

## 7. Check, the misses, the success
- **Check with a card still in the tray** → hint, no miss: "Put every thing on a footprint first." (Build: "Put every shape on the table first.")
- **Miss 1:** the snapshot shows every misfit inside the wrong outline (dashed coral); in a locked round the camera then UNLOCKS. Hint: "Lift the camera and watch the {object} from the top."
- **Miss 2:** for the first misfit, the camera glides up slowly by itself while only that object on the table stays in colour (the others fade to 30 %), and its footprint outline on the map glows. Hint: "Follow the {object} — this is what it looks like from above."
- A new move takes the help away until the next Check.
- **Success:** every outline in the viewfinder fills teal — the photo slides out of the camera and lays itself over the map card (they coincide, a soft sparkle runs round the border). "From above, a mug is a ring and a ball is a circle — just like the map!" (the sentence names two objects of the round: "From above, the {a} is a {fa} and the {b} is a {fb} — just like the map!").
- Build success: the camera lifts and the map lays over the view — "Your table matches the map."

## 8. Settings
1. **Mode:** match side to top / build the map — at rest: a filled table + a footprint map + side cards · an empty table with 6 spot rings + a footprint map + a shelf of solids.
2. **Objects:** 3 shapes / 5 everyday things — at rest the table and the tray visibly hold 3 geometric solids or 5 things.

## 9. Words (EN source)
- title "The Rising Camera" · instruction "Lift the camera to see things from above, and match each thing to its footprint on the map."
- promptMatch "Lift the camera. Put each thing on its footprint." · promptGuess "The camera stays low. Put each thing on its footprint, then Check." · promptBuild "Put the shapes on the table so the map is right."
- hints: hintFillFirst "Put every thing on a footprint first." · hintBuildFirst "Put every shape on the table first." · hintMiss1 "Lift the camera and watch the {object} from the top." · hintMiss2 "Follow the {object} — this is what it looks like from above."
- celebrations: celebrateMatch "From above, the {a} is a {fa} and the {b} is a {fb} — just like the map!" · celebrateBuild "Your table matches the map."
- footprint names {fa}: circle, ring, ring with a handle, square, square with lines, circle with a dot, long rectangle, square with dots — per locale.
- aria: ariaCamera "Camera: {side|low|high|top}." · ariaSnap "The {object} fits." / "The {object} does not fit that footprint."
- settings: setMode "Mode" · modeMatch "Match side to top" · modeBuild "Build the map" · setObjects "Objects" · objShapes "3 shapes" · objThings "5 things".
- **Locale traps:** object names from `image-vocabulary.js` with the article built by each locale's frame (de "der Becher/die Tasse" — the vocab label for `mug` wins; fr "la tasse" vs "le mug" — reviewer; sv "muggen"; fi "muki"); the success frame is authored per locale so both nouns take the case their frame needs (fi "ylhäältä muki on rengas" uses nominatives). Shape words (circle/ring/square) come from the shapes theme labels where they exist (circle, square, rectangle); ring, dot and "with a handle" are authored per locale (de Ring, Kreis mit Punkt; fr anneau, cercle avec un point). "Bird's-eye view" idioms differ (de Vogelperspektive, fr vue de dessus, sv fågelperspektiv, fi lintuperspektiivi) — used only in the page prose, never on the stage. Dice top face shows five pips (pips are universal).

## 10. Sound off, access, phones
- Legible with sound off: the morph, the snapshot flash, the teal/coral outlines, the overlay.
- Keyboard: camera ↑/↓; Tab through tray cards; Enter picks; ←/→ chooses a footprint; Enter drops; Check.
- aria-live for camera angle and every snapshot result; each footprint has an accessible name "footprint {n}" only (its shape is the question — never announced).
- Taps ≥ 44: knob target 64 (48 drawn at 360 + padding), footprints ≥ 96 at 704 / ≥ 64 at 360, cards ≥ 64.
- Pictures ≥ 96 at 704, ≥ 64 at 360.
- Fold at 360 × 740: header 56 + task 52 + view 230 + map 190 + tray 80 + Check 56 ≈ 664 (Things: tray 2 rows 150 → map shrinks to 170 → ≈ 714). At 320 × 640 Things puts the tray as a horizontal scroller of 64 px cards (the only scroller, labelled) so Check stays above the fold (≈ 620).
- The renderer draws only solids that read without heavy shading: one shade band on curved sides, ink outlines always.

## 11. Distinct from
- **#275 Ink-Pad Solids** (planned, 2.G.A.1): a solid is ROLLED onto an ink pad and PRESSED on paper to print its faces — contact printing of each face to count faces/edges/corners. Here nothing is pressed or printed: the observer moves (the camera climbs) and the check is a photograph from above laid on a map. The earlier "stamp" reveal was removed in the critic pass precisely so the two can never be confused. **#274 Shadow Table** (planned): a lamp casts shadows — the light moves; here the eye moves.
- Tool `build-plan` (blueprint numbers + front/side views of a cube building, grade 1–2): views of one block building, numbers; here everyday objects and a continuously rising viewpoint at K.
- Registry: no built/designed activity uses a draggable viewpoint.

## 12. Build plan
- **Core state** `{mode, objects, roundIdx, phi:0..90, locked:boolean, table:[{key, slot}], map:[{key, slot}], placed:{footprintSlot: key}, help}`.
- **Renderer (activity, not core):** orthographic: a point (x, y, z) (y = depth, z = height) → screen (x, −z·cos φ + y·sin φ). Horizontal circles → ellipses (r, r·sin φ); cylinder sides → rect height h·cos φ joined to the ellipses; cone apex at height h → (0, −h cos φ); cube/pyramid/box → projected polygons, painter's order by depth (y·cos φ + z·sin φ). Snapshot = the scene at φ = 90; side cards = the solids at φ = 15.
- **Core functions:** `footprint(key)` (fixed class table); `placeCard(key, slot)`; `check()` → per object fit = footprint(key) === mapFootprint(slot); `helpLevel()`; `hintKey()`; `isDeranged(round)`.
- **Gate's own truth (verify):** an independent footprint table; within every round all footprints are distinct (no two objects with the same footprint class — sphere+cylinder never together); table index ≠ map index for every object; footprint × map position balance per §6; the renderer at φ = 90 yields, for each solid, a shape whose bounding box and hole/dot/tab features match its footprint class (measured on the SVG: ring = two concentric circles, tab = a protrusion, X = two diagonals, pips = 5 small circles); at φ = 0 the cylinder/cube show no top area (height of the top ellipse = 0); locked rounds refuse camera input until a Check; Build: exactly one arrangement satisfies each map.
- **Mutations:** sphere + cylinder in one round · a fixed point (object on the same index as its footprint) · mug footprint drawn as a plain ring · glass footprint drawn filled · camera not locked in a guess-first round · snapshot accepts an object in the wrong outline · a side card rendered from the library cone (truncated) · map overlay at success misaligned · Check with a card in the tray counts a miss · help kept after a new move · free rounds shuffled into the locked block.
- **Pictures to verify:** toys/ball, toys/dice; kitchen-tools/glass, kitchen-tools/mug; classroom/book (seen). Everything on the table and map is drawn.
- **Risks:** the renderer (kept to 10 solids, unit-tested by the gate); the drawn twins must match the library cards' colours closely enough to be "the same thing". **Not blocked.**

## 13. The four questions
1. **Would a child choose it again?** Yes — a camera to fly up and down, objects that melt into their footprints, and a snapshot from the ceiling that becomes the map.
2. **Would a teacher put it on the board?** Yes — it is the "draw it from above" lesson made continuous; the class can predict each outline before the shutter clicks, and the map-over-view overlay is the bridge to reading maps.
3. **Would a parent trust it?** Calm geometry and library objects, no score or timer, honest projection (a glass from above really is a ring).
4. **The invention:** a camera on a climbing arc that turns side views into top views as you lift it — and a snapshot from the top that is laid over your map to check you.

## 14. Critic review (2026-10-17)
Scores before → after: invention 5→5 · fun 4→5 · completeness 5→5 · correctness 4→5 · distinctness 3→5 · reality 4→5
What changed:
- Orchestrator ruling (vs #275 Ink-Pad Solids, which rolls a solid on an ink pad and PRINTS its faces): the "objects stamp their top view onto the map" reveal is gone. Check is now THE SNAPSHOT — the camera itself climbs to 90°, the things glide to the spots the child's cards gave them, the map's outlines appear as guide lines in the viewfinder, the shutter clicks; fits fill teal, misfits sit visibly wrong inside a dashed coral outline. The check is done by the invention (the moving eye), and nothing is pressed or printed anywhere.
- `shapes/cone` is a truncated cone (PICTURE-RULINGS) whose top view is a circle-in-a-circle, contradicting the "circle with a dot" footprint; and the library shapes are drawn from above in clashing colours. The Shapes-set side cards are now the renderer's own solids at a fixed φ = 15° in their twin's colour (a true pointed cone), chosen so the cone and pyramid — identical triangles at φ = 0 — can be told apart. Mutation added.
- Distinct-from section rewritten against the actual #275 text.
