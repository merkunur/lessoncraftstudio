# 005 — Shape Sorter

## Identity
- Slug: `shape-sorter`
- Subject / topic: Mathematics / 2D shapes — circle, square, triangle, rectangle — recognised in any orientation and size
- Age band: `5-6`
- Interaction pattern: `P8` — sort into bins (tap the item, then tap a bin)
- Estimated build size: ~440 lines

Shared contract: `catalogue/BUILD-CONVENTIONS.md`. Pattern contract: `catalogue/PATTERNS.md` P8.

## Learning
- Objective: Sorts circles, squares, triangles and rectangles into the right bin regardless of the shape's rotation, size or fill.
- Prerequisites: None beyond tapping. The bins carry a prototype-pose icon; the child does not need to read.
- Curriculum links: F-1 (2D/3D shapes in 11 of 15 sources), F-4, F-21, F-31 row "2D shapes named (4 basic)" — conservative age 6-7, earliest 4 → 5-6 (US K.G.A.2 "correctly name shapes regardless of their orientations or overall size"; England Reception ELG / Y1 "recognise and name common 2-D shapes"; Germany Klasse 1 "ebene Figuren"; France GS "reconnaître … carré, triangle, rond, rectangle"; Spain Infantil; Brazil EF01MA14 (4 shapes); Sweden förskoleklass "geometriska objekt"; Norway 1. trinn).
- Common misconceptions (F-115), each with this game's response:
  1. **Prototype orientation — a rotated square is "a diamond, not a square"; a triangle standing on a point is "not a triangle".** Response: every level shows shapes in random rotations; when a rotated square is put in the wrong bin, the shape glides back to centre and ROTATES to its prototype pose (`ANIM.settleUpright`) before the bin's icon pulses — the child sees it become "the square they know", then it rotates back and waits.
  2. **Skinny / obtuse triangles are "not triangles".** Response: L2 introduces long and obtuse triangles; on error the three sides light one by one (`ART.sideGlow`, `tone("tap", k)`) and a "3" badge appears (`ART.countBadge`): a triangle is three sides, whatever its shape.
  3. **Square vs rectangle — a square goes in the rectangle bin (or the reverse).** Response: at L1 and L2 the square bin and the rectangle bin are NOT both present in the same round (only three bins), so the distinction is not tested before it is taught; at L3 all four bins appear and a square placed in the rectangle bin is accepted as CORRECT with the bin icon showing a square inside the rectangle outline (`ART.squareInRect`) — mathematically a square is a rectangle; the game never teaches otherwise. A rectangle in the square bin is refused with the side-length cue (`ART.sideGlow` on the two long sides).
  4. **Sorting by colour or size instead of shape.** Response: shape fill colours are assigned at random per item from three palette tokens and sizes vary 60-120 px, so colour and size are never a valid cue; on a colour-based error nothing special is shown beyond the standard refusal — the varied palette itself removes the shortcut.

## How it plays
1. **Start screen**: title "Shape Sorter", the crab (`ART.crab`) at (360, 200), Start, picker.
2. **Round 1 (L1)**: rail of 10 dots (§6). Zone A: a conveyor strip (`ART.belt`, a rounded bar across zone A at y = 170) with the crab at the left end (80, 170); the first item — a shape drawn from `ART.shapeCircle` / `ART.shapeSquare` / `ART.shapeTriangle` / `ART.shapeRect` — slides in from the right (`ANIM.slideIn`) to the centre (360, 170) as a `makeTile` 120 × 120 (transparent fill, the shape drawn inside, rotation applied to the shape graphic only). Zone B: three bins (`ART.bin`, 140 × 110) at y = 390, x = 180 / 360 / 540, each with a prototype icon on its front (`ART.iconCircle` / `ART.iconSquare` / `ART.iconTriangle` / `ART.iconRect`, 44 px, upright) and a count sub-label (`ART.binCount`, "0"). Caption: none.
3. **Sorting**: tap the shape (it lifts, `ANIM.lift`), then tap a bin. The shape glides (`ANIM.glide`) into the bin.
   - **Correct bin**: the bin's count goes up by one, `ANIM.pop` on the bin, `tone("correct")`; every third correct sort plays a praise pop (not every one — ten items would be too many pops); the rail dot fills; the next shape slides in after 400 ms.
   - **Wrong bin**: the shape glides back to the centre, `tone("nudge")`; then the enacted cue for the error type (Rules); the bin the child tapped shows no mark. Attempt 2.
   - **Second wrong bin**: the cue again, then the correct bin's icon gains the show-me ring (`ART.showRing`, `ANIM.showMe`); placing the shape there completes the item as solved-with-help.
   - Tapping a bin with no shape selected: the bin's icon does `ANIM.pop` (a harmless preview of what it takes); nothing else.
4. **Rounds**: 10 shapes per session. L1: the four basic shapes in prototype-ish poses (rotation 0° or 90° only), three bins per round chosen so square and rectangle are never both present. L2: any rotation 0-359°, skinny/obtuse triangles, long thin rectangles, three bins (still never square + rectangle together). L3: four bins, all rotations, sizes 60-120, square accepted in the rectangle bin (see misconception 3).
5. **Finish**: `t("all_done")` (360, 110); the crab (360, 200) `ANIM.celebrate`; the four bins in a row at y = 400 (x = 150 / 290 / 430 / 570, 120 × 90) showing their final counts — the visual summary; `play_again` (250, 510), `menu` (470, 510); `tone("finish")`.

Session ≈ 4-5 minutes.

## Art registry
```js
const ART = {
  crab:          { kind: "emoji", value: "🦀", size: 80 },
  belt:          { kind: "shape", shape: "roundRect", w: 600, h: 24, fill: "surface2", stroke: "line", strokeWidth: 2, radius: 12 },
  shapeCircle:   { kind: "shape", shape: "circle", r: 44, fill: "structureSoft", stroke: "structure", strokeWidth: 3 },
  shapeSquare:   { kind: "shape", shape: "rect", w: 84, h: 84, fill: "structureSoft", stroke: "structure", strokeWidth: 3 },
  shapeRect:     { kind: "shape", shape: "rect", w: 110, h: 60, fill: "structureSoft", stroke: "structure", strokeWidth: 3 },
  shapeTriangle: { kind: "shape", shape: "polygon", points: [[0,-48],[46,34],[-46,34]], fill: "structureSoft", stroke: "structure", strokeWidth: 3 },
  shapeTriSkinny:{ kind: "shape", shape: "polygon", points: [[0,-56],[18,44],[-18,44]], fill: "structureSoft", stroke: "structure", strokeWidth: 3 },
  shapeTriObtuse:{ kind: "shape", shape: "polygon", points: [[-56,30],[56,30],[30,-26]], fill: "structureSoft", stroke: "structure", strokeWidth: 3 },
  shapeRectThin: { kind: "shape", shape: "rect", w: 120, h: 34, fill: "structureSoft", stroke: "structure", strokeWidth: 3 },
  bin:           { kind: "shape", shape: "roundRect", w: 140, h: 110, fill: "surface", stroke: "line", strokeWidth: 2, radius: 14 },
  iconCircle:    { kind: "shape", shape: "circle", r: 20, stroke: "ink", strokeWidth: 3 },
  iconSquare:    { kind: "shape", shape: "rect", w: 40, h: 40, stroke: "ink", strokeWidth: 3 },
  iconRect:      { kind: "shape", shape: "rect", w: 52, h: 30, stroke: "ink", strokeWidth: 3 },
  iconTriangle:  { kind: "shape", shape: "polygon", points: [[0,-22],[22,16],[-22,16]], stroke: "ink", strokeWidth: 3 },
  squareInRect:  { kind: "shape", shape: "rect", w: 30, h: 30, stroke: "structure", strokeWidth: 2 },   // drawn inside iconRect when a square is accepted there
  binCount:      { kind: "text",  value: "0", size: 22, font: "display", color: "inkSoft" },
  sideGlow:      { kind: "shape", shape: "line", w: 4, fill: "accent", stroke: "accent", strokeWidth: 6 },   // drawn along one side; length set at runtime
  countBadge:    { kind: "shape", shape: "circle", r: 16, fill: "structure" },      // numeral on it 20 px display, color bg
  showRing:      { kind: "shape", shape: "roundRect", w: 152, h: 122, stroke: "structure", strokeWidth: 4, radius: 18 },
  dotEmpty:      { kind: "shape", shape: "circle", r: 8, stroke: "line", strokeWidth: 2 },
  dotFull:       { kind: "shape", shape: "circle", r: 8, fill: "structure" }
};
```
Fill variation: per item the shape's `fill` token is chosen at random from `structureSoft`, `surface2`, `bg` (three cream/teal tints — never a strong hue, and never the cue). Colour-blind safety: shape identity is carried by outline geometry; bins by icon geometry; the chosen state by lift + outline weight.

## Animation registry
```js
const ANIM = {
  slideIn:       { x: 360, duration: 320, ease: "Sine.Out", trigger: "new shape from x = 760 to centre" },
  lift:          { y: "-=8", scale: 1.06, duration: 120, ease: "Sine.Out", trigger: "shape selected" },
  glide:         { duration: 260, ease: "Sine.InOut", trigger: "shape to bin / back to centre (x,y at call)" },
  pop:           { scale: 1.12, duration: 140, ease: "Back.Out", yoyo: true, trigger: "bin receives a correct shape; bin icon preview tap" },
  settleUpright: { angle: 0, duration: 400, ease: "Sine.InOut", yoyo: true, hold: 500, trigger: "rotated shape shows its prototype pose after a wrong bin, then returns (yoyo)" },
  pulse:         { scale: 1.1, duration: 300, ease: "Sine.InOut", yoyo: true, repeat: 2, trigger: "correct bin icon after the cue" },
  glow:          { alpha: 1, duration: 200, ease: "Sine.Out", trigger: "each sideGlow in turn (from alpha 0), 300 ms apart" },
  showMe:        { alpha: 1, duration: 500, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "ring around the correct bin (from alpha 0.2)" },
  celebrate:     { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "finish crab" }
};
```

## Screen layout
```
y   0 ┌──────────────────────────────────────────────────────────────┐
      │ [lang]          ○ ○ ○ ○ ○ ○ ○ ○ ○ ○  rail y=28                 │  zone T
 56   ├──────────────────────────────────────────────────────────────┤
      │ crab(80,170)  ═══════════ belt y=170 ═══════════   shape enters→│  zone A
      │                        [ shape (360,170) ]                     │
260   ├──────────────────────────────────────────────────────────────┤
      │    ┌──────┐        ┌──────┐        ┌──────┐   bins y=390       │
      │    │  ○   │        │  □   │        │  △   │   x=180/360/540    │  zone B
      │    │  0   │        │  0   │        │  0   │   (140×110)        │
      │    └──────┘        └──────┘        └──────┘                    │
480   ├──────────────────────────────────────────────────────────────┤
      │                                                              │  zone C
560   └──────────────────────────────────────────────────────────────┘
```
L3 uses four bins at x = 120 / 280 / 440 / 600 (120 × 110). Fixed layout, FIT scaling.

## Visual specification
- Background `THEME.colour.bg`; rail per §6: 10 × `ART.dotEmpty` at y = 28 (x = 261 + i × 22) → `ART.dotFull` as items are solved.
- `ART.crab` (80, 170); `ART.belt` centred (390, 170).
- The item shape: a `makeTile` 120 × 120 at (360, 170) with transparent fill and no stroke (fill and stroke passed as `THEME.colour.bg` tokens so the tile itself is invisible; the shape graphic is a child of the tile container, rotated by the item's angle). Selected look: `ANIM.lift` plus the tile's `selectedStroke` outline (`THEME.colour.structure`, 3 px) drawn as a rounded square around the shape.
- Bins: `makeTile` 140 × 110 (`ART.bin` tokens) with the icon centred at (0, −14) and `ART.binCount` at (0, +34).
- Cue shapes: `ART.sideGlow` drawn along each side of the current shape in turn; `ART.countBadge` at the shape's top-right; `ART.squareInRect` inside `ART.iconRect` when a square is accepted in the rectangle bin.
- `ART.showRing` around the correct bin.
- Tap floors: shape tile 120, bins 140 × 110 (≥ 80). Gaps ≥ 20.

## Content
Language-neutral. Ten items per session drawn as below; bins for each round are listed with the item. Shape words map to ART keys: circle = `ART.shapeCircle`, square = `ART.shapeSquare`, rectangle = `ART.shapeRect`, rectangle thin = `ART.shapeRectThin`, triangle = `ART.shapeTriangle`, triangle skinny = `ART.shapeTriSkinny`, triangle obtuse = `ART.shapeTriObtuse`; bin icons = `ART.iconCircle` / `ART.iconSquare` / `ART.iconRect` / `ART.iconTriangle`.

- **L1** (rotation 0° or 90°; three bins never containing both square and rectangle): (circle; bins ○ □ △) · (square; ○ □ △) · (triangle; ○ □ △) · (rectangle; ○ ▭ △) · (circle; ○ ▭ △) · (square 90°; ○ □ △) · (triangle 90°; ○ □ △) · (rectangle 90°; ○ ▭ △)
- **L2** (any rotation; skinny/obtuse triangles; thin rectangles): (square 45°; ○ □ △) · (triangle skinny 200°; ○ □ △) · (rectangle thin 30°; ○ ▭ △) · (triangle obtuse 120°; ○ ▭ △) · (circle; ○ □ △) · (square 20°; ○ □ △) · (rectangle 70°; ○ ▭ △) · (triangle 300°; ○ □ △)
- **L3** (four bins; sizes 60-120; a square in the rectangle bin is accepted): (square 45°; ○ □ ▭ △) · (rectangle thin 110°; ○ □ ▭ △) · (triangle obtuse 45°; ○ □ ▭ △) · (square small; ○ □ ▭ △) · (rectangle 90°; ○ □ ▭ △) · (circle small; ○ □ ▭ △) · (triangle skinny 90°; ○ □ ▭ △) · (square 10°; ○ □ ▭ △)

Bin order left-to-right shuffled per round; the correct bin is never in the same slot twice running; fill token per item random from the three tints; size per item random in 60-120 px at L3 (scale of the ART shape), 84-110 otherwise.

## Rules
- Item count: 10.
- Difficulty progression: 3 consecutive first-try correct → next level (cap L3). (Three, not two: items are quick, ~15 s each.)
- Adaptation: a wrong bin, or wrong first-try on 2 consecutive items → next item one level down (floor L1).
- What happens on a correct answer: shape glides into the bin, bin `ANIM.pop`, count +1, `tone("correct")`; praise pop (rotation ["well_done", "great_job", "excellent", "you_did_it", "keep_going"]) on every third correct item and on the tenth; rail dot fills; next shape in 400 ms.
- What happens on a wrong answer (per anticipated mistake):
  - Rotated square or triangle in the wrong bin (orientation): shape returns, `ANIM.settleUpright` shows its prototype pose for 500 ms and returns, then the correct bin icon `ANIM.pulse`.
  - Skinny/obtuse triangle refused as a triangle (put in another bin): shape returns, each side glows in turn with `tone("tap", k)`, `ART.countBadge` "3", then the triangle bin icon pulses.
  - Rectangle placed in the square bin: shape returns, the two long sides glow, then the rectangle bin icon pulses.
  - Square placed in the rectangle bin (L3): ACCEPTED — count +1 on the rectangle bin, `ART.squareInRect` shown on its icon for 1200 ms, `tone("correct")`.
  - Circle in any other bin: shape returns, the circle bin icon pulses (no side cue — a circle has no sides).
- Retry behaviour: attempt 1 → attempt 2 after the cue → attempt 3 with the show-me ring on the correct bin; solved-with-help. No attempt 4.
- Finish condition: 10 items. No losing state, no clock.

## Strings
- `GameCore.t()` keys: `t("start")`, `t("all_done")`, `t("play_again")`, `t("menu")`, `t("well_done")`, `t("great_job")`, `t("excellent")`, `t("you_did_it")`, `t("keep_going")`.
- Game-specific: `title` = "Shape Sorter". No text on the play screen (bin counts are numerals).

## Sound
`tone("tap")` on selecting a shape; `tone("correct")` on a correct bin; `tone("nudge")` on a wrong bin; `tone("tap", k)` per glowing side; `tone("finish")` once. Silent under `?sound=off`.

## Testing checklist
- [ ] Works in all 11 languages (All done, Play again, Menu, praise change with the picker; the play screen has no words).
- [ ] Works at narrow width (400-px iframe: belt, shape and all bins visible; four bins at level 3 still separate).
- [ ] Keyboard operable (Tab: the shape, then the bins left to right; Enter selects the shape / drops it in a bin).
- [ ] Never auto-starts.
- [ ] No losing state (wrong bins never end the session; the show-me ring always leads to completion).
- [ ] Shapes arrive rotated; a square turned 45° is accepted in the square bin.
- [ ] Putting a rotated square in the wrong bin makes it turn upright for a moment, then the square bin's icon pulses.
- [ ] A long thin triangle put in the wrong bin lights its three sides one by one with a "3" badge.
- [ ] Square and rectangle bins never appear together before level 3; at level 3 a square in the rectangle bin is accepted and a small square appears inside the rectangle icon.
- [ ] A rectangle in the square bin is refused and its two long sides glow.
- [ ] Bin counts go up only on correct sorts; the finish screen shows the four bins with their counts and no score.
- [ ] Three first-try corrects in a row bring rotated/skinny shapes; a wrong bin brings simpler poses next.
- [ ] Shape colours vary and never predict the bin.
- [ ] With `?sound=off` nothing is audible.
