# 058 — Shape Detective 3D

## Identity
- Slug: `shape-detective-3d`
- Subject / topic: Mathematics / naming 3D shapes — cube, sphere, cone, cylinder, cuboid — from a turning solid, and telling a solid from its flat shadow
- Age band: `6-8`
- Interaction pattern: `P1` — tap one of N (three name tiles with icons; four at L3)
- Estimated build size: ~470 lines

Shared contract: `catalogue/BUILD-CONVENTIONS.md`. Pattern contract: `catalogue/PATTERNS.md` P1. The solids and their icons are language-neutral shapes; the five shape NAMES are game-specific strings translated by the translation step (§9) — no `LOCALE_DATA` table is needed because nothing else varies by locale.

## Learning
- Objective: Names a 3D solid (cube, sphere, cone, cylinder, cuboid) shown turning through three views by tapping its name tile, and distinguishes the solid from the 2D shadow it casts.
- Prerequisites: Names the four basic 2D shapes (game 005); reads single words (the tiles carry an icon beside each name at L1-L2 so a weak reader can still play).
- Curriculum links: F-115 (3D shapes called by 2D names — "ball is a circle"; cube = cuboid; "curved surfaces have no faces" — with the responses rotate live, show shadow vs object, count faces), F-21 (3D cube/sphere + cylinder/cone/cuboid in the common core by 8), F-31 row "3D shapes named" — conservative 7-9, earliest 5 → 6-8 (US K.G.A.2-3 / 1.G.A.1 "cubes, cones, cylinders, spheres … two-dimensional or three-dimensional"; England Y1 "3-D shapes … cuboids (including cubes), pyramids and spheres"; Germany Klasse 1-2 "Körper: Würfel, Quader, Kugel, Zylinder, Kegel"; France CP-CE1 "cube, pavé droit, boule, cylindre, cône"; Netherlands groep 3-4 "kubus, bol, cilinder, kegel, balk"; Spain 1º ciclo "cuerpos geométricos"; Brazil EF02MA14; Sweden åk 1-3 "klot, kub, rätblock, cylinder, kon"; Finland grade 1-2 "kappaleet").
- Common misconceptions (F-115), each with this game's response:
  1. **A 3D solid named by its 2D face ("the ball is a circle", "the box is a square").** Response: the solid casts a shadow — on a wrong tap the `ART.lamp` lights, a flat `ART.shadowCircle` / `ART.shadowSquare` / `ART.shadowRect` / `ART.shadowTri` slides out beneath the solid (`ANIM.castShadow`) and the solid keeps TURNING (`ANIM.turn`) while the shadow stays flat and still; the 2D name is never on a tile, so the cue is the reveal itself: the shadow is the circle, the object is the sphere.
  2. **Cube and cuboid confused (any box is a cube).** Response: L2 introduces the cuboid beside the cube; on a wrong tap between them the solid's edges light one by one (`ART.edgeGlow`, `tone("tap", k)`) and the `ART.edgeTick`s show equal marks on a cube's edges and two lengths of tick on a cuboid's — same faces, different edge lengths.
  3. **Cylinder and cone confused (both "round"), or cone named "triangle".** Response: on a wrong tap the solid turns to show its top: a cone comes to a point (`ART.apexDot` pulses), a cylinder shows a second circular face (`ART.faceGlow` on the top ellipse); the shadow reveal then shows the cone's triangle shadow versus the cylinder's rectangle.
  4. **Prototype pose only (a cylinder lying down "isn't a cylinder").** Response: the solid is drawn in three poses per item (`ANIM.turn` cycles them, 900 ms each) and at L2-L3 the starting pose is a lying or tilted one; the name does not change with the pose, and the solid keeps turning after the answer as confirmation.
  5. **Guessing by tile position or icon colour.** Response: tile order is shuffled per item, the correct slot never repeats twice running (§13); all icons are the same ink outline; at L3 the icons are withdrawn from the tiles (cue fading, F-46) and only the names remain, with four tiles.

## How it plays
1. **Start screen**: title "Shape Detective 3D", the owl detective (`ART.owl`) with `ART.magnifier` at (360, 200), Start, picker.
2. **Item 1 (L1: sphere; tiles sphere / cube / cone)**: rail of 10 dots (§6). Zone A: a display plinth (`ART.plinth`, 220 × 20) at (360, 228); on it the solid — `ART.sphere` (r 64) at (360, 150) — which turns: `ANIM.turn` rotates the solid's container to −20°, 0°, +20° in a slow cycle (900 ms per pose, 400 ms eased motion between) so three views are seen; the sphere's shading arc (`ART.sphereShade`) makes its turning visible. The owl at (110, 160) with the magnifier at (150, 190); `ART.lamp` at (600, 100), unlit. Zone B: three tiles (`ART.nameTile`, 200 × 96) at y = 380, x = 140 / 360 / 580, each with an icon (`ART.iconSphere` / `ART.iconCube` / `ART.iconCone`, 40 px, ink outline) at the tile's (−64, 0) and the name (`S("sphere")` etc., 24 px, `wordWrap` 120) at (+20, 0), shuffled. Caption `S("whatShape")` ("What shape is it?") at (360, 290), 24 px `THEME.colour.inkSoft`, `wordWrap` 600.
3. **Answering**: the child taps a tile.
   - **Correct**: `api.setSelected(true)`, `ANIM.pop`, `tone("correct")`; the name glides (`ANIM.glide`) from the tile to a label slot under the plinth (`ART.plinthLabel` at (360, 252)) and the solid does a full extra turn (`ANIM.turnFull`); praise pop (next key in rotation); the owl `ANIM.peer` (a lean toward the plinth); rail dot fills; after 900 ms the next solid arrives (`ANIM.appear`). First-try correct.
   - **Wrong (a 2D-name confusion cannot happen — 2D names are not tiles — so a wrong tap is another SOLID's name)**: `ANIM.nudge`, `tone("nudge")`, the tile de-selects and stays enabled; then the cue for the pair (Rules): the shadow reveal (the lamp lights, the shadow slides out flat, the solid keeps turning above it, 1200 ms, then the shadow slides back and the lamp dims) and, for cube/cuboid or cone/cylinder pairs, the edge or top cue first. Tiles are disabled during the cue and re-enable after. Attempt 2.
   - **Wrong on attempt 2**: the cue again, then the correct tile gains the show-me ring (`ART.showRing`, `ANIM.showMe`); tapping it completes the item as solved-with-help (no praise pop).
4. **Items 2-10**: per Content/Rules. L1: cube, sphere, cone, cylinder in upright poses, three tiles, icons on. L2: cuboid joins; lying and tilted starting poses; the confusable pair is always among the tiles (cube with cuboid, cone with cylinder); icons on. L3: four tiles, names only (icons withdrawn), the solid drawn smaller (scale 0.8) and starting in its least typical pose.
5. **Finish**: `t("all_done")` (360, 110); the owl (360, 200) `ANIM.celebrate` with the magnifier; the summary = the five solids in a row at y = 400 (x = 120 / 240 / 360 / 480 / 600, drawn at scale 0.5) each with its name label beneath (16 px) — the set the detective can now name; `play_again` (250, 510), `menu` (470, 510); `tone("finish")`; `GameCore.reportHeight()`.

Session ≈ 5-6 minutes.

## Art registry
```js
const ART = {
  owl:          { kind: "emoji", value: "🦉", size: 80 },
  magnifier:    { kind: "emoji", value: "🔍", size: 40 },
  lamp:         { kind: "emoji", value: "🔦", size: 44 },
  plinth:       { kind: "shape", shape: "roundRect", w: 220, h: 20, fill: "surface2", stroke: "line", strokeWidth: 2, radius: 8 },
  plinthLabel:  { kind: "shape", shape: "roundRect", w: 160, h: 40, fill: "structureSoft", stroke: "structure", strokeWidth: 2, radius: 10 },   // holds the solved name, 22 px display ink
  cube:         { kind: "shape", shape: "polygon", points: [[0,-70],[60,-35],[60,35],[0,70],[-60,35],[-60,-35]], fill: "structureSoft", stroke: "structure", strokeWidth: 3 },   // isometric outline; three seams from (0,0) to (0,-70)... see note
  cubeSeam:     { kind: "shape", shape: "line", w: 3, stroke: "structure", strokeWidth: 3 },   // drawn 3 times from the cube's centre (0,0) to (0,70), (60,-35), (-60,-35): the three visible edges
  cuboid:       { kind: "shape", shape: "polygon", points: [[-30,-60],[70,-30],[70,30],[-30,60],[-70,40],[-70,-40]], fill: "structureSoft", stroke: "structure", strokeWidth: 3 },   // longer along one axis
  cuboidSeam:   { kind: "shape", shape: "line", w: 3, stroke: "structure", strokeWidth: 3 },   // 3 lines from (-30,-20) to (-30,60), (70,-30), (-70,-40)
  sphere:       { kind: "shape", shape: "circle", r: 64, fill: "structureSoft", stroke: "structure", strokeWidth: 3 },
  sphereShade:  { kind: "shape", shape: "arc", r: 50, stroke: "structure", strokeWidth: 3 },      // a curved shading arc from 200° to 300° inside the sphere; turns with the container
  cone:         { kind: "shape", shape: "polygon", points: [[0,-72],[58,48],[-58,48]], fill: "structureSoft", stroke: "structure", strokeWidth: 3 },
  coneBase:     { kind: "shape", shape: "ellipse", w: 116, h: 32, fill: "structureSoft", stroke: "structure", strokeWidth: 3 },   // at (0,48)
  cylinder:     { kind: "shape", shape: "rect", w: 100, h: 110, fill: "structureSoft", stroke: "structure", strokeWidth: 3 },
  cylEnd:       { kind: "shape", shape: "ellipse", w: 100, h: 30, fill: "structureSoft", stroke: "structure", strokeWidth: 3 },   // at (0,-55) and (0,55)
  apexDot:      { kind: "shape", shape: "circle", r: 9, fill: "accent" },                          // the cone's point during the top cue
  faceGlow:     { kind: "shape", shape: "ellipse", w: 104, h: 34, stroke: "accent", strokeWidth: 4 },   // the cylinder's top face during the top cue
  edgeGlow:     { kind: "shape", shape: "line", w: 4, stroke: "accent", strokeWidth: 5 },         // drawn along one edge at a time; endpoints set at call
  edgeTick:     { kind: "shape", shape: "rect", w: 10, h: 3, fill: "ink" },                        // one tick on a cube edge; two ticks 6 px apart on a cuboid's long edges
  shadowCircle: { kind: "shape", shape: "ellipse", w: 140, h: 40, fill: "line" },                 // flat shadow of a sphere (an ellipse in perspective) — drawn as a circle r 64 at scaleY 0.3
  shadowSquare: { kind: "shape", shape: "rect", w: 120, h: 120, fill: "line" },                    // cube shadow, drawn at scaleY 0.3
  shadowRect:   { kind: "shape", shape: "rect", w: 160, h: 100, fill: "line" },                    // cuboid / lying cylinder shadow, scaleY 0.3
  shadowTri:    { kind: "shape", shape: "polygon", points: [[0,-72],[58,48],[-58,48]], fill: "line" },   // cone shadow, scaleY 0.3
  nameTile:     { kind: "shape", shape: "roundRect", w: 200, h: 96, fill: "surface", stroke: "line", strokeWidth: 2, radius: 14 },
  iconCube:     { kind: "shape", shape: "polygon", points: [[0,-20],[17,-10],[17,10],[0,20],[-17,10],[-17,-10]], stroke: "ink", strokeWidth: 2 },
  iconCuboid:   { kind: "shape", shape: "polygon", points: [[-8,-16],[20,-8],[20,8],[-8,16],[-20,10],[-20,-10]], stroke: "ink", strokeWidth: 2 },
  iconSphere:   { kind: "shape", shape: "circle", r: 18, stroke: "ink", strokeWidth: 2 },
  iconCone:     { kind: "shape", shape: "polygon", points: [[0,-20],[16,14],[-16,14]], stroke: "ink", strokeWidth: 2 },
  iconCylinder: { kind: "shape", shape: "rect", w: 28, h: 32, stroke: "ink", strokeWidth: 2 },
  showRing:     { kind: "shape", shape: "roundRect", w: 212, h: 108, stroke: "structure", strokeWidth: 4, radius: 18 },
  dotEmpty:     { kind: "shape", shape: "circle", r: 8, stroke: "line", strokeWidth: 2 },
  dotFull:      { kind: "shape", shape: "circle", r: 8, fill: "structure" }
};
```
Each solid is one container holding its parts (e.g. `cylEnd` at (0, −55), `cylinder`, `cylEnd` at (0, +55) in that draw order, with the lower ellipse's top half hidden by the rect; `cone` then `coneBase`; `cube` then three `cubeSeam`s; `sphere` then `sphereShade`). Poses: upright = angle 0; lying = angle 90; tilted = angle −35. `ANIM.turn` adds ±20° about the pose angle. The icons are the same outline geometry in miniature; the shadows are the solid's 2D outline squashed flat (`scaleY` 0.3) on the plinth.

## Animation registry
```js
const ANIM = {
  turn:       { angle: "+=20", duration: 400, ease: "Sine.InOut", yoyo: true, repeat: -1, hold: 900, trigger: "the solid's container rocks between pose −20° and pose +20°, pausing 900 ms at each of the three views; runs for the whole item" },
  turnFull:   { angle: "+=360", duration: 900, ease: "Sine.InOut", trigger: "one full turn on a correct answer" },
  pop:        { scale: 1.12, duration: 140, ease: "Back.Out", yoyo: true, trigger: "correct tile" },
  nudge:      { x: "+=10", duration: 80, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "wrong tile" },
  castShadow: { x: "+=0", y: "+=90", alpha: 1, duration: 400, ease: "Sine.Out", trigger: "the shadow slides down out of the solid onto the plinth (from alpha 0 at the solid's centre); reversed to withdraw" },
  lampOn:     { scale: 1.2, duration: 200, ease: "Back.Out", yoyo: true, trigger: "the lamp when the shadow is cast" },
  glow:       { alpha: 1, duration: 200, ease: "Sine.Out", trigger: "each edgeGlow in turn (from alpha 0), 250 ms apart; the faceGlow; the apexDot" },
  pulse:      { scale: 1.2, duration: 300, ease: "Sine.InOut", yoyo: true, repeat: 2, trigger: "apexDot / faceGlow during the top cue" },
  glide:      { duration: 260, ease: "Sine.InOut", trigger: "the solved name from its tile to the plinth label (x,y set at call)" },
  appear:     { alpha: 1, scale: 1, duration: 200, ease: "Back.Out", trigger: "a new solid on the plinth (from alpha 0, scale 0.6)" },
  peer:       { angle: -12, duration: 160, ease: "Sine.InOut", yoyo: true, trigger: "owl leans toward the plinth on a correct answer" },
  showMe:     { alpha: 1, duration: 500, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "ring around the correct tile (from alpha 0.2)" },
  celebrate:  { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "finish owl" }
};
```
No flashing: the turn is a slow rock (one reversal per 1.3 s); `showMe` at 1 Hz.

## Screen layout
```
y   0 ┌──────────────────────────────────────────────────────────────┐
      │ [lang]          ○ ○ ○ ○ ○ ○ ○ ○ ○ ○  rail y=28                 │  zone T
 56   ├──────────────────────────────────────────────────────────────┤
      │                                              lamp (600,100)   │
      │  owl (110,160)          (  solid  )  (360,150), turning       │  zone A
      │     magnifier (150,190) ══ plinth ══ (360,228)                │
      │                         [ name ] plinthLabel (360,252)        │
260   ├──────────────────────────────────────────────────────────────┤
      │                  "What shape is it?" (360,290)               │
      │  ┌────────────┐   ┌────────────┐   ┌────────────┐  y=380     │  zone B
      │  │ ○  sphere  │   │ ⬡  cube    │   │ △  cone    │  x=140/360/580│
      │  └────────────┘   └────────────┘   └────────────┘  (200×96)  │
480   ├──────────────────────────────────────────────────────────────┤
      │                 (praise pop appears centred)                 │  zone C
560   └──────────────────────────────────────────────────────────────┘
```
L3 uses four tiles 160 × 96 at x = 100 / 273 / 447 / 620 (pitch 173), names only. The shadow lies on the plinth at (360, 236) during a cue. Fixed layout, FIT scaling.

## Visual specification
- Background `THEME.colour.bg`; rail per §6: 10 × `ART.dotEmpty` (x = 261 + i × 22) → `ART.dotFull`.
- `ART.owl` (110, 160) with `ART.magnifier` (150, 190); `ART.lamp` (600, 100), alpha 0.5 until a shadow cue lights it (alpha 1 + `ANIM.lampOn`).
- `ART.plinth` (360, 228); the solid container at (360, 150) (scale 0.8 at L3), built per item from: cube = `ART.cube` + 3 × `ART.cubeSeam`; cuboid = `ART.cuboid` + 3 × `ART.cuboidSeam`; sphere = `ART.sphere` + `ART.sphereShade`; cone = `ART.cone` + `ART.coneBase`; cylinder = `ART.cylEnd` (top) + `ART.cylinder` + `ART.cylEnd` (bottom); `ART.plinthLabel` (360, 252) empty until solved, then holds the name at 22 px `THEME.font.display` `THEME.colour.ink`.
- Shadows (`ART.shadowCircle` / `ART.shadowSquare` / `ART.shadowRect` / `ART.shadowTri`) drawn beneath the solid at (360, 236), depth below the solid, only during a cue. Cue overlays: `ART.edgeGlow` along edges with `ART.edgeTick`s; `ART.apexDot` at the cone's point; `ART.faceGlow` on the cylinder's top ellipse.
- Tiles: `makeTile` 200 × 96 (`ART.nameTile` tokens) with the icon (`ART.iconCube` / `ART.iconCuboid` / `ART.iconSphere` / `ART.iconCone` / `ART.iconCylinder`) at (−64, 0) and the name at (+20, 0), 24 px `THEME.font.body` `THEME.colour.ink`, `wordWrap` 120, two lines max (German "Zylinder", Finnish "suorakulmainen särmiö" for cuboid are expected to wrap); `ART.showRing` around the correct tile.
- Caption `S("whatShape")` 24 px `THEME.font.body` `THEME.colour.inkSoft` at (360, 290), two lines max.
- Tap floors 200 × 96 / 160 × 96 ≥ 56; gaps ≥ 13. Tab order: tiles left to right. During a cue (≈ 2 s) the tiles are `setEnabled(false)`.

## Content
The solids and icons are language-neutral; names come from `STRINGS` (five keys). Items as (solid; starting pose; tiles):
- **L1** (upright; three tiles; icons on): (sphere; upright; sphere, cube, cone) · (cube; upright; cube, cylinder, sphere) · (cone; upright; cone, cylinder, cube) · (cylinder; upright; cylinder, cone, sphere) · (sphere; upright; sphere, cylinder, cube)
- **L2** (cuboid joins; lying/tilted poses; the confusable pair always present; icons on): (cuboid; lying; cuboid, cube, sphere) · (cube; tilted; cube, cuboid, cone) · (cylinder; lying; cylinder, cone, cuboid) · (cone; tilted; cone, cylinder, sphere) · (cuboid; tilted; cuboid, cube, cylinder) · (sphere; upright; sphere, cylinder, cuboid)
- **L3** (four tiles; names only; scale 0.8; least typical pose): (cylinder; lying; cylinder, cone, cuboid, cube) · (cuboid; tilted; cuboid, cube, cylinder, cone) · (cone; lying; cone, cylinder, sphere, cube) · (cube; tilted; cube, cuboid, sphere, cylinder) · (sphere; upright; sphere, cylinder, cone, cuboid)

Play list of 10 per Rules; within a level the pool is shuffled and not repeated until exhausted; tile order shuffled per item; the correct slot never repeats twice running (§13).

Worked example: item 1 (sphere) first-try · item 2 (cone) first-try → L2 · item 3 (cuboid; lying) taps "cube" → the edges light in turn, long edges with double ticks, then the lamp lights and a long rectangle shadow slides out beneath the turning cuboid; then taps "cuboid" (helped) · item 4 (cylinder; lying) first-try · item 5 (cone; tilted) first-try → L3 · item 6 (cylinder; lying; names only) first-try · items 7-10 with one miss → Finish shows the five named solids.

## Rules
- Item count: 10.
- Difficulty progression: 2 consecutive first-try correct → next level (cap L3).
- Adaptation: any wrong tap on an item, or wrong first-try on 2 consecutive items → next item one level down (floor L1).
- What happens on a correct answer: `ANIM.pop`, `tone("correct")`, the name glides to the plinth label, the solid makes one full turn, praise rotation ["well_done", "great_job", "excellent", "you_did_it", "keep_going"], owl `ANIM.peer`, rail dot, next item after 900 ms.
- What happens on a wrong answer (per anticipated mistake):
  - Sphere ↔ cylinder / cube, or any "round vs flat-faced" confusion: `ANIM.nudge`, `tone("nudge")`, then the shadow reveal — the lamp lights, the solid's flat shadow slides onto the plinth while the solid keeps turning, 1200 ms, then withdraws.
  - Cube ↔ cuboid: nudge, tone, the edges light one by one with `tone("tap", k)` and edge ticks (single on a cube, double on a cuboid's long edges), then the shadow reveal (square vs rectangle).
  - Cone ↔ cylinder: nudge, tone, the solid turns to show its top — the apex dot pulses on a cone, the top face glows on a cylinder — then the shadow reveal (triangle vs rectangle).
  - Any other pair: nudge, tone, the shadow reveal.
- Retry behaviour: attempt 1 unaided → attempt 2 after the cue → attempt 3 with the show-me ring; the ringed tile completes the item as solved-with-help. No attempt 4.
- Finish condition: 10 items. No losing state; no clock.

## Strings
- `GameCore.t()` keys: `t("start")`, `t("all_done")`, `t("play_again")`, `t("menu")`, `t("well_done")`, `t("great_job")`, `t("excellent")`, `t("you_did_it")`, `t("keep_going")`.
- Game-specific (`STRINGS.en`, via `S(key)`): `title` = "Shape Detective 3D"; `whatShape` = "What shape is it?"; `cube` = "cube"; `sphere` = "sphere"; `cone` = "cone"; `cylinder` = "cylinder"; `cuboid` = "cuboid". (The translation step supplies each locale's school term — e.g. "ball"-type words for the sphere and the local cuboid term; tiles wrap to two lines at 24 px.)

## Sound
`tone("correct")` on the right name; `tone("nudge")` on a wrong name; `tone("tap", k)` per edge in the edge cue; `tone("tap")` when the shadow lands; `tone("finish")` once. Silent under `?sound=off`; no audio files. The turning solid and the shadow carry the meaning; sound never does alone.

## Testing checklist
- [ ] Works in all 11 languages (All done, Play again, Menu, praise change with the picker; the five shape names and the caption once translated, wrapping to two lines where long).
- [ ] Works at narrow width (400-px iframe: the turning solid, the plinth and all tiles — four at level 3 — visible and separate).
- [ ] Keyboard operable (Tab cycles the tiles; Enter picks; the solid is not focusable).
- [ ] Never auto-starts.
- [ ] No losing state (wrong taps never end the session; the show-me ring always completes the item).
- [ ] The solid rocks slowly between three views for the whole item; a lying cylinder is accepted as a cylinder.
- [ ] Tapping "cube" for a sphere lights the lamp and a flat oval shadow slides out under the still-turning sphere, then withdraws.
- [ ] Tapping "cube" for a cuboid lights its edges one by one with double ticks on the long edges before the shadow reveal.
- [ ] Tapping "cylinder" for a cone makes the cone's point pulse; tapping "cone" for a cylinder makes its top face glow.
- [ ] No tile ever offers a 2D shape name (circle, square, triangle, rectangle).
- [ ] At level 3 the tiles show names only and there are four of them.
- [ ] A correct answer moves the name under the plinth and the solid makes one full turn.
- [ ] The finish screen shows the five solids with their names and no score.
- [ ] With `?sound=off` nothing is audible.
