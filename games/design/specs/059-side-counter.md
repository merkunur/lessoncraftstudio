# 059 — Side Counter

## Identity
- Slug: `side-counter`
- Subject / topic: Mathematics / counting the sides (and, at the stretch level, the corners) of a polygon shown in any orientation
- Age band: `6-8`
- Interaction pattern: `P3` — tap to count (tap each side once; then a P1 numeral choice to state the count)
- Estimated build size: ~450 lines

Shared contract: `catalogue/BUILD-CONVENTIONS.md`. Pattern contract: `catalogue/PATTERNS.md` P3. Content is language-neutral (polygons and numerals); no `LOCALE_DATA`.

## Learning
- Objective: Counts the sides of a polygon (3-8 sides, any orientation) by tapping each side exactly once, then states the count by tapping the matching numeral.
- Prerequisites: Counts to 8 with one-to-one tapping (game 001); recognises the four basic shapes (game 005). No reading.
- Curriculum links: F-115 ("loses place counting sides/vertices"; prototype orientation; the response: vary orientation from level 1 and count sides as feedback — sides light one by one), F-101 (one-to-one and cardinality carried into a geometry context), F-21, F-31 row "2D shapes named (4 basic)" extended to attribute counting at 6-7 (US 1.G.A.1 "distinguish between defining attributes (e.g., triangles are closed and three-sided)"; 2.G.A.1 "recognize and draw shapes having specified attributes, such as a given number of angles"; England Y1-2 "properties of 2-D shapes, including the number of sides"; Germany Klasse 1-2 "Ecken und Seiten"; France CP-CE1 "nombre de côtés et de sommets"; Netherlands groep 3-4 "hoeken en zijden"; Spain 1º ciclo "lados y vértices"; Brazil EF02MA15; Sweden åk 1-3 "geometriska objekt … egenskaper"; Finland grade 1-2).
- Common misconceptions (F-115, F-101), each with this game's response:
  1. **Losing place — counting a side twice or skipping one when going round.** Response: each tapped side turns solid (`ART.sideLit`) and gets its numeral badge (`ART.sideBadge`); a second tap on a lit side does nothing (one-to-one enforced by the object, F-101); the numeral tiles stay disabled until every side is lit, so a skipped side is simply still hollow — it pulses after 6 s of inactivity (`ANIM.pulse`).
  2. **Counting corners when asked for sides (or the reverse).** Response: the prompt is an icon — `ART.sideIcon` (a short thick line segment) for sides, `ART.cornerIcon` (an angle mark with a dot) for corners at L3 — beside the count question; in sides mode the corners are not tappable at all (only the side tiles exist), so a corner tap does nothing; in corners mode only the corner tiles exist. The mode is carried by which things are tappable AND by the icon.
  3. **A rotated or irregular shape "has different sides" (prototype bias: the count changes with the pose).** Response: every polygon is drawn in a random orientation and from L2 with unequal side lengths; on a wrong numeral the replay lights the sides in order round the shape with rising tones, ending on the last badge growing (`ANIM.lastBadge`) — the count is what it is in any pose.
  4. **Cardinality slip — tapping the numeral of the last badge seen elsewhere, or off by one.** Response: after the last side is lit, its badge grows and the total (`ART.totalNumeral`) appears at the shape's centre for 900 ms before the tiles enable; a wrong numeral replays the count and re-shows the total.
  5. **Long sides counted as "more" (a long side = two).** Response: sides are tapped at their midpoints only (one tile per side, whatever its length); the lit stroke runs the full length of the side so a long side is seen to be ONE lit line.

## How it plays
1. **Start screen**: title "Side Counter", the beetle (`ART.beetle`) at (360, 200), Start, picker (hidden under `?embed=1`).
2. **Item 1 (L1: a triangle, rotated 25°)**: rail of 10 dots (§6). Zone A: the beetle at (90, 150) with a speech bubble (`ART.bubble`) at (90, 80) holding `ART.sideIcon` and `ART.question` — "how many sides?"; centred in zone A, the polygon (`ART.polygon`, outline only, radius 100) at (380, 158) rotated 25°; on the midpoint of each side an invisible `makeTile` 80 × 80 (`ART.sideTile`, transparent) — the side's tap target. Zone B: three numeral tiles (`ART.numeralTile`, 96 × 96) at y = 380, x = 240 / 360 / 480 showing 2, 3, 4 shuffled, **disabled** (dimmed) until every side is lit. Caption `S("howManySides")` ("How many sides?") at (360, 290), 24 px `THEME.colour.inkSoft`, `wordWrap` 600.
3. **Counting**: the child taps a side. `tone("tap", k)` (k = 1 for the first side, 2 for the second …); the side's stroke turns solid and thick (`ART.sideLit` drawn over the outline, `ANIM.litIn`) and `ART.sideBadge` with the numeral k appears just outside the side's midpoint (`ANIM.badgeIn`); the side tile is `setEnabled(false)` for tapping but stays fully visible. Tapping a lit side again does nothing. Sides may be tapped in any order (the badges show the order the child used; the count is the same).
4. **Last side**: its badge plays `ANIM.lastBadge` and `ART.totalNumeral` (52 px) appears at the polygon's centre with `ANIM.appear`; after 900 ms the numeral tiles enable.
5. **Answering**: the child taps a numeral tile.
   - **Correct (3)**: `ANIM.pop`, `tone("correct")`, praise pop (next key in rotation); the polygon fills (`ART.polygonFilled`) and glides (`ANIM.glide`) to a shelf slot in zone C (`ART.shelf`, positions x = 120 + i × 54, y = 512, drawn at scale 0.22); the beetle `ANIM.wiggle`; rail dot fills; after 700 ms the next polygon appears (`ANIM.appear`).
   - **Wrong (2 or 4)**: `ANIM.nudge`, `tone("nudge")`, the tile de-selects and stays enabled; then the **replay**: every badge hides, the sides un-light, and then re-light one after another going round the shape clockwise from the topmost side (300 ms apart, `tone("tap", k)`, badges 1 … n), the last badge `ANIM.lastBadge`, `ART.totalNumeral` `ANIM.pulse`. Tiles disabled during the replay, re-enabled after. Attempt 2.
   - **Wrong again (attempt 2)**: the same replay, and the correct tile gains the show-me ring (`ART.showRing`, `ANIM.showMe`); tapping it completes the item as solved-with-help (the polygon still goes to the shelf; no praise pop).
   - **Tap on a numeral while sides remain unlit**: cannot happen — the tiles are disabled until the count is complete.
6. **Items 2-10**: per Content/Rules. L1: regular triangles, squares and rectangles, 3-4 sides, tiles = n − 1, n, n + 1. L2: pentagons and hexagons, some irregular (unequal sides), 5-6 sides. L3: heptagons and octagons, and CORNERS mode on alternate items — the bubble shows `ART.cornerIcon`, the tap targets are 80 × 80 tiles at the vertices (`ART.cornerTile`), a tapped corner shows `ART.cornerLit` (a filled dot) and its badge, and the caption reads `S("howManyCorners")`.
7. **Finish**: `t("all_done")` (360, 110); the beetle (360, 200) `ANIM.celebrate`; the summary = the shelf of ten counted polygons (`ART.polygonFilled` at scale 0.35) in a row at y = 400 (x = 90 + i × 60), each with its count beneath (`ART.shelfCount`, 18 px) — the shapes the child counted, not a score; `play_again` (250, 510), `menu` (470, 510); `tone("finish")`; `GameCore.reportHeight()`.

Session ≈ 5 minutes.

## Art registry
```js
const ART = {
  beetle:        { kind: "emoji", value: "🐞", size: 80 },
  bubble:        { kind: "shape", shape: "roundRect", w: 130, h: 64, fill: "surface", stroke: "line", strokeWidth: 2, radius: 18 },
  sideIcon:      { kind: "shape", shape: "rect", w: 36, h: 6, fill: "structure" },                    // "a side" — a short thick segment, tilted 20°
  cornerIcon:    { kind: "shape", shape: "polygon", points: [[-16,14],[0,-14],[16,14]], stroke: "structure", strokeWidth: 4 },   // an angle mark (open at the bottom) with a 5-px structure dot at the apex
  question:      { kind: "text",  value: "?", size: 36, font: "display", color: "structure" },
  polygon:       { kind: "shape", shape: "polygon", points: [], stroke: "structure", strokeWidth: 4 },   // outline only; points set per item (regular: n vertices on a circle r 100; irregular: per Content)
  polygonFilled: { kind: "shape", shape: "polygon", points: [], fill: "structureSoft", stroke: "structure", strokeWidth: 4 },   // the counted shape (shelf)
  sideTile:      { kind: "shape", shape: "roundRect", w: 80, h: 80, fill: "bg", stroke: "bg", strokeWidth: 0, radius: 12 },   // invisible tap area at a side's midpoint (focus ring by the library)
  cornerTile:    { kind: "shape", shape: "roundRect", w: 80, h: 80, fill: "bg", stroke: "bg", strokeWidth: 0, radius: 12 },   // invisible tap area at a vertex (L3 corners mode)
  sideLit:       { kind: "shape", shape: "line", w: 8, stroke: "accent", strokeWidth: 8 },            // drawn along the full side; endpoints set at call
  cornerLit:     { kind: "shape", shape: "circle", r: 12, fill: "accent", stroke: "structure", strokeWidth: 2 },
  sideBadge:     { kind: "shape", shape: "circle", r: 16, fill: "structure" },                        // numeral 20 px display, color bg; placed 26 px outside the side's midpoint along the outward normal (or 26 px outside a vertex)
  totalNumeral:  { kind: "text",  value: "", size: 52, font: "display", color: "structure" },
  numeralTile:   { kind: "shape", shape: "roundRect", w: 96, h: 96, fill: "surface", stroke: "line", strokeWidth: 2, radius: 12 },   // numeral 44 px
  showRing:      { kind: "shape", shape: "roundRect", w: 108, h: 108, stroke: "structure", strokeWidth: 4, radius: 16 },
  shelf:         { kind: "shape", shape: "rect", w: 600, h: 4, fill: "line" },                         // zone C shelf line at y = 530 during play
  shelfCount:    { kind: "text",  value: "", size: 18, font: "display", color: "inkSoft" },
  dotEmpty:      { kind: "shape", shape: "circle", r: 8, stroke: "line", strokeWidth: 2 },
  dotFull:       { kind: "shape", shape: "circle", r: 8, fill: "structure" }
};
```
Polygon geometry: regular n-gons have vertices at angle 360 × i / n on a circle of radius 100 (triangle 130, so its sides are long enough); the item's rotation is added to every vertex. Side-midpoint tiles for an octagon of radius 100 are 76 px apart (side length), so adjacent 80 × 80 tiles would overlap by 4 px — the octagon therefore uses radius 110 (side 84, tiles 84 apart, gap 4) and its tiles are 72 × 72 (gap 12): an explicit, one-shape exception to the 80-px 5-6 floor that is still above the 6-8 floor of 56. All other shapes keep 80 × 80 with gaps ≥ 12.

## Animation registry
```js
const ANIM = {
  litIn:     { alpha: 1, duration: 160, ease: "Sine.Out", trigger: "a side's lit stroke (from alpha 0); a corner's dot" },
  badgeIn:   { alpha: 1, scale: 1, duration: 150, ease: "Back.Out", trigger: "a side/corner badge (from alpha 0, scale 0.5)" },
  lastBadge: { scale: 1.4, duration: 220, ease: "Back.Out", yoyo: true, trigger: "the last badge of a count or a replay" },
  pulse:     { scale: 1.15, duration: 300, ease: "Sine.InOut", yoyo: true, repeat: 2, trigger: "unlit side tiles after 6 s of inactivity (their outline drawn briefly as ART.sideLit at alpha 0.4); the total numeral on a replay" },
  appear:    { alpha: 1, scale: 1, duration: 200, ease: "Back.Out", trigger: "a new polygon; the total numeral (from alpha 0, scale 0.6)" },
  pop:       { scale: 1.12, duration: 140, ease: "Back.Out", yoyo: true, trigger: "correct numeral tile" },
  nudge:     { x: "+=10", duration: 80, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "wrong numeral tile" },
  glide:     { scale: 0.22, duration: 400, ease: "Sine.InOut", trigger: "the counted polygon to its shelf slot (x,y set at call)" },
  wiggle:    { angle: 8, duration: 100, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "beetle after a correct answer" },
  showMe:    { alpha: 1, duration: 500, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "ring behind the correct numeral tile (from alpha 0.2)" },
  celebrate: { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "finish beetle" }
};
```
No flashing: the inactivity pulse runs once per 6 s; `showMe` at 1 Hz.

## Screen layout
```
y   0 ┌──────────────────────────────────────────────────────────────┐
      │ [lang]          ○ ○ ○ ○ ○ ○ ○ ○ ○ ○  rail y=28                 │  zone T
 56   ├──────────────────────────────────────────────────────────────┤
      │  bubble [▬ ?] (90,80)          ╱╲                              │
      │  beetle (90,150)              ╱  ╲   polygon (380,158)         │  zone A
      │                              ╱ 3  ╲  side tiles at midpoints  │
      │                             ╱______╲ badges outside each side │
260   ├──────────────────────────────────────────────────────────────┤
      │                  "How many sides?" (360,290)                 │
      │        [ 2 ]        [ 3 ]        [ 4 ]   y=380 (dimmed)       │  zone B
480   ├──────────────────────────────────────────────────────────────┤
      │  ▲ ■ ● …  shelf of counted shapes y=512; shelf line y=530     │  zone C
560   └──────────────────────────────────────────────────────────────┘
```
The polygon's bounding circle (radius ≤ 130) fits zone A (y 56-260) with its centre at y = 158; badges sit 26 px outside, so the extreme badge reaches y ≈ 2 for a triangle pointing straight up — the triangle's rotation is therefore restricted to 15°-75° (never a vertex straight up), keeping badges below y = 56. Fixed layout, FIT scaling.

## Visual specification
- Background `THEME.colour.bg`; rail per §6: 10 × `ART.dotEmpty` (x = 261 + i × 22) → `ART.dotFull`.
- `ART.beetle` (90, 150); `ART.bubble` (90, 80) with `ART.sideIcon` (or `ART.cornerIcon` in corners mode) at its (−28, 0) and `ART.question` at (+24, 0).
- `ART.polygon` centred (380, 158) with the item's rotation; `ART.sideTile`s (`makeTile` 80 × 80, invisible: fill and stroke `THEME.colour.bg`, no label) at each side's midpoint; in corners mode `ART.cornerTile`s at each vertex instead. `ART.sideLit` along a tapped side; `ART.cornerLit` at a tapped vertex; `ART.sideBadge` outside each tapped side/vertex with the numeral in `THEME.colour.bg` 20 px `THEME.font.display`; `ART.totalNumeral` at the polygon's centre.
- Numeral tiles: `makeTile` 96 × 96 (`ART.numeralTile`), numeral 44 px `THEME.font.display` `THEME.colour.ink`; disabled (alpha 0.5) until the count is complete; `ART.showRing` behind the correct tile.
- `ART.shelf` at (360, 530) with the counted shapes (`ART.polygonFilled` at scale 0.22) from x = 120 at pitch 54 on y = 512.
- Caption `S("howManySides")` / `S("howManyCorners")` 24 px `THEME.font.body` `THEME.colour.inkSoft` at (360, 290), two lines max.
- Tap floors: side/corner tiles 80 (72 on the octagon — see the geometry note), numeral tiles 96; gaps ≥ 12. Tab order: side (or corner) tiles clockwise from the topmost, then the numeral tiles left to right.

## Content
Language-neutral. Items as (shape; sides; rotation; mode; tiles). Irregular shapes give their vertices explicitly (relative to the centre).
- **L1** (regular, 3-4 sides; sides mode): (triangle; 3; 25°; sides; 2, 3, 4) · (square; 4; 40°; sides; 3, 4, 5) · (rectangle 180 × 100; 4; 15°; sides; 3, 4, 5) · (triangle; 3; 60°; sides; 2, 3, 4) · (square; 4; 20°; sides; 3, 4, 5)
- **L2** (5-6 sides, some irregular; sides mode): (pentagon; 5; 30°; sides; 4, 5, 6) · (hexagon; 6; 10°; sides; 5, 6, 7) · (irregular pentagon (−90,−20) (−10,−95) (95,−40) (70,70) (−60,80); 5; 0°; sides; 4, 5, 6) · (irregular hexagon (−100,0) (−50,−85) (40,−90) (100,−10) (60,80) (−40,70); 6; 0°; sides; 5, 6, 7) · (pentagon; 5; 55°; sides; 4, 5, 6) · (irregular quadrilateral (−100,−30) (20,−90) (95,20) (−40,85); 4; 0°; sides; 3, 4, 5)
- **L3** (7-8 sides; corners mode on alternate items): (heptagon; 7; 20°; sides; 6, 7, 8) · (hexagon; 6; 35°; corners; 5, 6, 7) · (octagon r 110; 8; 12°; sides; 7, 8, 9) · (pentagon; 5; 45°; corners; 4, 5, 6) · (irregular heptagon (−100,10) (−70,−70) (0,−100) (75,−65) (100,20) (50,85) (−45,90); 7; 0°; sides; 6, 7, 8) · (heptagon; 7; 30°; corners; 6, 7, 8)

Play list of 10 per Rules; within a level the pool is shuffled and not repeated until exhausted; the correct numeral tile's slot never repeats twice running (§13).

Worked example: item 1 (triangle) taps three sides, badges 1-2-3, total 3, taps 3 → shelf · item 2 (square) first-try → L2 · item 3 (hexagon) skips a side, the tiles stay dim; after 6 s the unlit side pulses; taps it, total 6, taps 5 → replay round the hexagon 1 … 6, then taps 6 (helped) · item 4 (irregular pentagon) first-try · item 5 (pentagon) first-try → L3 · item 6 (hexagon; corners) taps the six vertices, total 6, first-try · items 7-10 with one miss → Finish shows the shelf of ten.

## Rules
- Item count: 10.
- Difficulty progression: 2 consecutive first-try correct → next level (cap L3). "First-try" = the correct numeral was the first numeral tapped.
- Adaptation: a wrong numeral, or wrong first-try on 2 consecutive items → next item one level down (floor L1).
- Stuck rule (an inactivity cue only, never a clock): after 6 s with unlit sides and no tap, the unlit sides pulse once; repeats every 6 s of inactivity. Nothing is displayed about time; nothing ends.
- What happens on a correct answer: `ANIM.pop`, `tone("correct")`, praise rotation ["well_done", "great_job", "excellent", "you_did_it", "keep_going"], the polygon fills and glides to the shelf, beetle `ANIM.wiggle`, rail dot, next item after 700 ms.
- What happens on a wrong answer (per anticipated mistake):
  - Wrong numeral after a complete count (cardinality / off-by-one): `ANIM.nudge`, `tone("nudge")`, the replay lights the sides in order round the shape with badges and rising tones, the last badge grows and the total pulses.
  - Sides left uncounted (skipped): no wrong answer is possible — the tiles are disabled; the stuck rule pulses the unlit sides.
  - Double tap on a lit side: nothing happens.
  - A corner tapped in sides mode (or a side in corners mode): nothing happens — there is no tile there.
- Retry behaviour: attempt 1 unaided → attempt 2 after the replay → attempt 3 with the show-me ring; the ringed tile completes the item as solved-with-help. No attempt 4.
- Finish condition: 10 items solved → Finish. No losing state; the only exits are Finish or Menu.

## Strings
- `GameCore.t()` keys: `t("start")`, `t("all_done")`, `t("play_again")`, `t("menu")`, `t("well_done")`, `t("great_job")`, `t("excellent")`, `t("you_did_it")`, `t("keep_going")`.
- Game-specific (`STRINGS.en`, via `S(key)`): `title` = "Side Counter"; `howManySides` = "How many sides?"; `howManyCorners` = "How many corners?".

## Sound
`tone("tap", k)` on the k-th side (or corner) tapped — one note per side, pitch rising with the count (F-213); `tone("correct")` on the right numeral; `tone("nudge")` on a wrong numeral; `tone("tap", k)` again per side during a replay; `tone("finish")` once. Silent under `?sound=off`; no audio files.

## Testing checklist
- [ ] Works in all 11 languages (All done, Play again, Menu, praise change with the picker; the captions once translated).
- [ ] Works at narrow width (400-px iframe: the polygon with its side targets, the three numeral tiles and the shelf visible; octagon side targets remain separate).
- [ ] Keyboard operable (Tab walks the sides clockwise then the numerals; Enter lights a side / picks a numeral; Enter on a lit side does nothing).
- [ ] Never auto-starts.
- [ ] No losing state (wrong numerals never end the session; the show-me ring always completes the item).
- [ ] Tapping a side lights its whole length in coral and shows a numbered badge outside it; tapping it again changes nothing.
- [ ] The numeral tiles are dimmed until every side is lit; then a big total appears at the shape's centre.
- [ ] A wrong numeral replays the count side by side round the shape with rising notes and a pulsing total.
- [ ] Shapes appear rotated and, from the second level, with unequal sides; a long side still counts as one.
- [ ] Tapping a corner in "sides" mode does nothing; at level 3 "corners" items make the corners tappable instead and the bubble shows the angle icon.
- [ ] After 6 seconds without tapping, the sides not yet counted pulse.
- [ ] Two first-try corrects in a row bring shapes with more sides; a wrong numeral brings simpler shapes next.
- [ ] The finish screen shows the ten counted shapes on a shelf with their counts and no score.
- [ ] With `?sound=off` nothing is audible; with sound on, each side tap is a higher note than the last.
