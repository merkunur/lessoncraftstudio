# 127 — Right-Angle Finder

## Identity
- Slug: `right-angle-finder`
- Subject / topic: Mathematics / right angles in 2D shapes — finding every corner that is a right angle, whatever way the shape is turned
- Age band: `8-9`
- Interaction pattern: `P3` — tap to count (tap each right-angle corner; a corner-checker snaps in; then state the count on a P1 numeral tile)
- Estimated build size: ~520 lines

Shared contract: `catalogue/BUILD-CONVENTIONS.md`. Pattern contract: `catalogue/PATTERNS.md` P3 (objects = the shape's corners; the answer = a numeral tile). Content is language-neutral (shapes, corners, numerals); no `LOCALE_DATA`. No angle names other than "right angle" are used anywhere, and that only in the one caption; degrees are never shown (they are 9-10 content in most systems).

## Learning
- Objective: Taps every corner of a shape that is a right angle — and none that is not — using a corner-checker that only fits a true right angle, then states how many right angles the shape has.
- Prerequisites: Recognises the basic shapes and knows that a corner is where two sides meet; reads numerals to 6. Has met the word "right angle" at least once (the checker teaches it by fitting or not).
- Curriculum links: F-115 (prototype orientation — a rotated square is "a diamond"; loses place counting sides/vertices; responses: rotate live, vary orientation from level 1, count as feedback), F-31 row "Symmetry" and "2D shapes" neighbourhood — right angles and quarter turns are 8-9 content in the conservative systems (England Y3 "identify right angles, recognise that two right angles make a half-turn … identify whether angles are greater than or less than a right angle"; US 3.G / 4.G.A.1 "identify … right angles in two-dimensional figures"; Germany Klasse 3 "rechte Winkel in Figuren erkennen"; France CE2 "reconnaître un angle droit à l'aide de l'équerre"; Netherlands groep 5 "rechte hoek"; Spain 2º ciclo "ángulo recto"; Brazil EF03MA — ; Sweden åk 3 "vinklar"; Norway 4. trinn; Finland 3-4), F-21. Invalid taps are refused by the object (F-61); the count is enacted, not told (F-43); brute force cannot score (F-65).
- Common misconceptions (F-115 corner and orientation errors; the responses rest on F-43, F-61), each with this game's response:
  1. **A right angle must look like an upright "L" (the corners of a tilted square or a diamond "are not right angles").** Response: the checker (`ART.checker`) rotates as it snaps in, so on the tilted rectangle it sits at 30° and still fits exactly; L1 already includes the square turned 45°.
  2. **A sharp, pointy corner "is a right angle" (acute taken for right) — or any corner of a triangle.** Response: the checker tries to fit: one edge lies along a side, the other sticks out beyond the shape, and the coral wedge (`ART.gapWedge`) between the checker's edge and the real side shows the mismatch; the checker `ANIM.wobble`s and slides off (`ANIM.slideOff`). Refused, not punished.
  3. **A wide, open corner "is a right angle" (obtuse taken for right; the 100° corner at L3).** Response: the same fit attempt; now the wedge lies INSIDE the shape between the checker and the side — the corner is wider than the checker. Near-miss corners (80° / 100°) make the wedge thin, and it is drawn at 4-px accent stroke plus fill so it still reads.
  4. **Counting all the corners instead of the right angles (a rectangle "has 4" is fine; a right triangle "has 3").** Response: the numeral tiles always include the total corner count as a distractor; tapping it plays the replay — the checker visits every corner in turn, fits and leaves a badge at the right angles, refuses at the others — and the last badge grows (`ANIM.lastBadge`).
  5. **Losing place — marking a corner twice or missing one.** Response: a marked corner keeps its checker and badge and ignores further taps (one-to-one is enforced by the object, F-101); a wrong numeral while right angles remain unmarked triggers the replay, which marks them all.

## How it plays
1. **Start screen**: title "Right-Angle Finder", the koala (`ART.koala`) at (360, 200), Start, picker (hidden under `?embed=1`).
2. **Item 1 (L1: rectangle)**: rail of 12 dots (§6) at y = 28 with `t("question_x_of_y")` in 18 px `THEME.colour.inkSoft` at (610, 28). Zone A: the shape (`ART.shapePoly` with the item's points) centred at (360, 176); the koala at (90, 176) holding the loose checker (`ART.checker` at (90, 236), its resting place). Every vertex of the shape is a corner tile (`makeTile` 64 × 64 with `ART.cornerTile` tokens — transparent body; the library's focus ring is the only visible chrome) centred on the vertex. Caption `S("howManyRight")` ("How many right angles?") at (360, 296), 22 px `THEME.font.body` `THEME.colour.inkSoft`, `wordWrap` 600. Zone B: four numeral tiles (`ART.numeralTile`, 80 × 80) at y = 400, x = 180 / 300 / 420 / 540, showing the item's four numerals (Content) in a shuffled order; enabled from the start (the child decides when the count is done).
3. **Checking corners**: the child taps a corner.
   - **A right angle**: a copy of the checker glides from the koala (`ANIM.glide`) to the vertex and snaps in (`ANIM.snap`): it is a 40 × 40 square outline placed with one edge along the side to the NEXT vertex (clockwise) and its corner on the vertex, extending into the shape; its other edge lies along the side to the PREVIOUS vertex — it fits. `tone("tap", k)` with k = the number of corners marked so far; `ART.countBadge` k appears just inside the corner at 30 px along the bisector; the corner tile is `setEnabled(false)` but stays at full alpha (the checker and badge are its state).
   - **Not a right angle**: the checker glides in and tries: one edge along the side to the next vertex; its other edge does not meet the previous side; `ART.gapWedge` = the triangle [vertex, vertex + 40 × unit(previous side), vertex + 40 × unit(checker's second edge)] appears in accent (35 % fill + 4-px stroke) for 900 ms; the checker `ANIM.wobble`s, `tone("nudge")`, then `ANIM.slideOff`s back to the koala; the wedge fades. The corner stays enabled (the child may test it again — a second refusal plays the same cue, still one attempt). Attempt 2 on the item.
   - **A marked corner tapped again**: nothing happens.
4. **Answering**: the child taps a numeral tile.
   - **Correct, all right angles marked**: `ANIM.pop` on the tile, `tone("correct")`, the numeral glides (`ANIM.glide`) to the shape's centre and sits there (`ART.centreNumeral`), the koala `ANIM.nod`s, `GameCore.showPraise` with the next key in rotation, the rail dot fills; after 800 ms the next item builds (shape `ANIM.rise`s away, new shape `ANIM.appear`). First-try = no refused corner and the first numeral tapped was correct.
   - **Wrong numeral, or the right numeral with right angles still unmarked**: `ANIM.nudge`, `tone("nudge")`, the tile de-selects; then the **replay** (all tiles disabled for its duration): the checker visits every corner in clockwise order from the topmost vertex, 500 ms apart — at a right angle it snaps in and leaves a badge with `tone("tap", k)`; at any other corner the wedge shows and it slides on; when it returns to the koala, the last badge `ANIM.lastBadge`s. Every right angle is now marked. Attempt 2.
   - **Wrong numeral after the replay (attempt 3)**: nudge and tone; the correct numeral tile gains the show-me ring (`ART.showRing`, `ANIM.showMe`); tapping it completes the item as solved-with-help (the numeral goes to the centre; no praise pop).
5. **Items 2-12**: per Content/Rules. L1: rectangle, square, right triangle, the square turned 45°, and an isosceles triangle with no right angles; L2: right trapezium, the house pentagon (3 right angles, one at the apex), parallelogram (0), the rectangle turned 30° (4), a right triangle with its right angle at the top; L3: a quadrilateral with 80° / 100° corners (2), a skinny right triangle (1), a kite with two right angles, a pentagon with two, an obtuse triangle (0), a rhombus (0).
6. **Finish**: `t("all_done")` (360, 110); the koala (360, 200) `ANIM.celebrate`; the summary = the twelve shapes at 0.3 scale (`ART.miniShape`) with a small `ART.miniChecker` in each right-angle corner, in two rows of six from y = 330 (x = 100 + (i mod 6) × 104, rows 90 px apart) — the right angles found, not a score; optionally `t("question_x_of_y")` with n = first-try items and total 12 at (360, 460), 20 px; `play_again` (250, 510), `menu` (470, 510); `tone("finish")`; `GameCore.reportHeight()`.

Session ≈ 6 minutes (12 items × 25-35 s).

## Art registry
```js
const ART = {
  koala:         { kind: "emoji", value: "🐨", size: 88 },
  shapePoly:     { kind: "shape", shape: "polygon", points: [], fill: "structureSoft", stroke: "structure", strokeWidth: 3 },   // points per item (Content)
  cornerTile:    { kind: "shape", shape: "roundRect", w: 64, h: 64, fill: "bg", stroke: "bg", strokeWidth: 0, radius: 32 },     // invisible tile body on each vertex
  checker:       { kind: "shape", shape: "rect", w: 40, h: 40, stroke: "ink", strokeWidth: 3 },      // the corner-checker; drawn with a 10 × 10 inner square mark at the vertex corner (a second rect of the same tokens)
  gapWedge:      { kind: "shape", shape: "polygon", points: [], fill: "accent", stroke: "accent", strokeWidth: 4 },   // 35 % fill; points computed per refused corner
  countBadge:    { kind: "shape", shape: "circle", r: 14, fill: "structure" },                       // numeral 18 px display, color bg
  centreNumeral: { kind: "text",  value: "", size: 48, font: "display", color: "structure" },       // the solved count at the shape's centre
  numeralTile:   { kind: "shape", shape: "roundRect", w: 80, h: 80, fill: "surface", stroke: "line", strokeWidth: 2, radius: 12 },   // numeral 36 px display ink
  showRing:      { kind: "shape", shape: "roundRect", w: 92, h: 92, stroke: "structure", strokeWidth: 4, radius: 16 },
  miniShape:     { kind: "shape", shape: "polygon", points: [], fill: "structureSoft", stroke: "structure", strokeWidth: 1 },   // finish summary at 0.3 scale
  miniChecker:   { kind: "shape", shape: "rect", w: 12, h: 12, stroke: "ink", strokeWidth: 1 },
  dotEmpty:      { kind: "shape", shape: "circle", r: 8, stroke: "line", strokeWidth: 2 },
  dotFull:       { kind: "shape", shape: "circle", r: 8, fill: "structure" }
};
```
Checker placement rule (the only geometry the builder computes): for a vertex V with next vertex N (clockwise) and previous vertex P, let u = unit(N − V) and w = the unit vector perpendicular to u pointing into the shape — for the clockwise polygons listed here, in screen coordinates (y down), w = (−u.y, u.x). The checker's corner sits on V, one edge along u, the other along w. The corner is a right angle when |dot(unit(P − V), u)| < 0.03; then w = unit(P − V) and the checker fits. Otherwise the wedge is the triangle [V, V + 40·unit(P − V), V + 40·w]. All polygons in Content are listed clockwise starting from the topmost vertex.

## Animation registry
```js
const ANIM = {
  glide:      { duration: 260, ease: "Sine.InOut", trigger: "the checker to a corner and back; the solved numeral to the centre (x,y set at call)" },
  snap:       { scale: 1.15, duration: 140, ease: "Back.Out", yoyo: true, trigger: "the checker fitting a right angle" },
  wobble:     { angle: "+=6", duration: 90, ease: "Sine.InOut", yoyo: true, repeat: 2, trigger: "the checker at a corner that is not a right angle" },
  slideOff:   { duration: 260, ease: "Sine.In", trigger: "the refused checker returning to the koala (x,y set at call)" },
  pop:        { scale: 1.12, duration: 140, ease: "Back.Out", yoyo: true, trigger: "correct numeral tile" },
  nudge:      { x: "+=10", duration: 80, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "wrong numeral tile" },
  lastBadge:  { scale: 1.4, duration: 220, ease: "Back.Out", yoyo: true, trigger: "the last badge after the replay or after the last right angle is marked" },
  appear:     { alpha: 1, scale: 1, duration: 200, ease: "Back.Out", trigger: "new shape, badges, wedges (from alpha 0, scale 0.6)" },
  fadeOut:    { alpha: 0, duration: 300, ease: "Sine.In", trigger: "a wedge after 900 ms" },
  rise:       { y: "-=40", alpha: 0, duration: 400, ease: "Sine.In", trigger: "the solved shape leaving" },
  nod:        { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "koala on a correct answer" },
  showMe:     { alpha: 1, duration: 500, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "show-me ring on the correct numeral (from alpha 0.2)" },
  celebrate:  { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "finish koala" }
};
```
No flashing: `showMe` at 1 Hz; the replay steps at 2 per second.

## Screen layout
```
y   0 ┌──────────────────────────────────────────────────────────────┐
      │ [lang]     ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○  rail y=28   "3 of 12" (610,28)│  zone T
 56   ├──────────────────────────────────────────────────────────────┤
      │                      ┌──────────────┐  corner tiles on        │
      │  koala (90,176)      │    shape     │  every vertex (64×64)   │  zone A
      │  checker (90,236)    └──────────────┘  centre (360,176)       │
260   ├──────────────────────────────────────────────────────────────┤
      │            "How many right angles?" (360,296)                │
      │       [ 2 ]     [ 3 ]     [ 4 ]     [ 5 ]   y=400 (80×80)     │  zone B
      │       x=180     x=300     x=420     x=540                    │
480   ├──────────────────────────────────────────────────────────────┤
      │                 (praise pop appears centred)                 │  zone C
560   └──────────────────────────────────────────────────────────────┘
```
Fixed layout, FIT scaling. Shapes fit inside x 240-480, y 70-282 (vertex coordinates within ±120, ±106 of the centre).

## Visual specification
- Background `THEME.colour.bg`; rail per §6: 12 × `ART.dotEmpty` at y = 28 (x = 239 + i × 22) → `ART.dotFull`; `t("question_x_of_y")` at (610, 28).
- `ART.koala` (90, 176); the resting `ART.checker` at (90, 236).
- `ART.shapePoly` centred (360, 176) with the item's points; `ART.cornerTile` on each vertex (tiles are 64 ≥ 56; the closest two vertices in any item are 70 px apart, so gaps ≥ 6 px between tile bodies and the tap regions never overlap — see Content, the skinny triangle).
- A fitted `ART.checker` sits on its vertex at the computed rotation; `ART.countBadge` 30 px along the corner's bisector inside the shape; `ART.gapWedge` per the placement rule.
- Caption `S("howManyRight")` at (360, 296), 22 px, two lines max. Numeral tiles: `makeTile` 80 × 80 with `ART.numeralTile` tokens, numeral 36 px `THEME.font.display` `THEME.colour.ink`; `ART.showRing` behind the correct one on attempt 3; `ART.centreNumeral` at the shape's centre when solved.
- Tab order: the corner tiles in clockwise order from the topmost vertex, then the four numeral tiles left to right. Text on the play screen: the caption and the progress label (≤ 2 short sentences, F-42).

## Content
Language-neutral. Each item = (name; polygon points clockwise from the topmost vertex, relative to (360, 176); right-angle vertices by index; the four numeral tiles = correct + three distractors, always including the total corner count when it differs from the correct count).

- **L1** (prototype poses plus one turned square):
  1. rectangle · [(−110,−70),(110,−70),(110,70),(−110,70)] · RA {0,1,2,3} = 4 · tiles 4, 2, 3, 1
  2. square · [(−80,−80),(80,−80),(80,80),(−80,80)] · RA {0,1,2,3} = 4 · tiles 4, 3, 2, 0
  3. right triangle (right angle bottom-left) · [(−110,−80),(110,80),(−110,80)] · RA {2} = 1 · tiles 1, 3, 2, 0
  4. square turned 45° · [(0,−100),(100,0),(0,100),(−100,0)] · RA {0,1,2,3} = 4 · tiles 4, 0, 2, 3
  5. isosceles triangle · [(0,−90),(110,80),(−110,80)] · RA {} = 0 · tiles 0, 3, 1, 2
- **L2** (mixed corners in one shape; turned shapes):
  6. right trapezium · [(−110,−70),(60,−70),(110,70),(−110,70)] · RA {0,3} = 2 · tiles 2, 4, 1, 3
  7. house · [(0,−90),(70,−20),(70,80),(−70,80),(−70,−20)] · RA {0,2,3} = 3 · tiles 3, 5, 2, 4
  8. parallelogram · [(−80,−60),(120,−60),(80,60),(−120,60)] · RA {} = 0 · tiles 0, 4, 2, 1
  9. rectangle turned 30° · [(−57,−102),(117,−2),(57,102),(−117,2)] · RA {0,1,2,3} = 4 · tiles 4, 2, 0, 3
  10. right triangle (right angle top-left) · [(−110,−80),(110,−80),(−110,80)] · RA {0} = 1 · tiles 1, 3, 0, 2
- **L3** (near-misses, skinny, and shapes with some right angles among many corners):
  11. near-miss quadrilateral (80° / 100°) · [(−110,−70),(110,−70),(85,70),(−110,70)] · RA {0,3} = 2 · tiles 2, 4, 3, 1
  12. skinny right triangle · [(110,10),(110,80),(−110,80)] · RA {1} = 1 · tiles 1, 3, 2, 0
  13. kite · [(0,−100),(80,−60),(0,100),(−80,−60)] · RA {1,3} = 2 · tiles 2, 4, 1, 3
  14. pentagon · [(−100,−60),(100,−60),(100,40),(0,90),(−100,40)] · RA {0,1} = 2 · tiles 2, 5, 3, 1
  15. obtuse triangle · [(60,−40),(110,80),(−110,80)] · RA {} = 0 · tiles 0, 3, 1, 2
  16. rhombus · [(0,−80),(100,0),(0,80),(−100,0)] · RA {} = 0 · tiles 0, 4, 2, 1

Play list of 12 per Rules (level pools shuffled, no item repeats; if a pool runs out it is reshuffled); the correct numeral's slot never repeats twice running (§13). Items with 0 right angles are never two in a row.

Worked example: item 1 (rectangle) taps the four corners — the checker snaps in at each, badges 1-4 — then taps 4: first-try · item 2 (square) first-try → L2 · item 3 (house) taps the two base corners, then the apex: the checker fits at the top too (badge 3); the child taps 3: first-try · item 4 (parallelogram) taps a wide corner: the checker sits with a coral wedge inside the shape and slides off; the child taps 0 (helped — a refusal was made) → L1 · item 5 (right triangle) taps the sharp corner: the wedge sticks out beyond the shape; taps the square corner (badge 1); taps 3 (all corners): the replay visits all three corners, fits at one, the badge grows; taps 1 (helped) · items 6-7 first-try → L2 · items 8-9 first-try → L3 · item 10 (near-miss quadrilateral) taps the 80° corner: a thin coral wedge, the checker slides off; marks the two left corners; taps 2 (helped) · items 11-12 first-try · Finish shows twelve small shapes with little squares in their right-angle corners.

## Rules
- Item count: 12.
- Difficulty progression: 2 consecutive first-try items → next level (cap L3).
- Adaptation: any refused corner or wrong numeral on an item, or a non-first-try item twice in a row → next item one level down (floor L1). The current item is never abandoned.
- What happens on a correct answer: `ANIM.pop`, `tone("correct")`, the numeral glides to the shape's centre, koala `ANIM.nod`, praise rotation ["well_done", "great_job", "excellent", "you_did_it", "keep_going"], rail dot, next item after 800 ms.
- What happens on a wrong answer (per anticipated mistake):
  - Acute corner tapped (pointy = right angle): the checker tries, the coral wedge sticks out beyond the shape, `ANIM.wobble`, `tone("nudge")`, `ANIM.slideOff`. One attempt.
  - Obtuse or near-miss corner tapped (wide = right angle; 80°/100°): the same, with the wedge inside the shape (thin for near-misses, drawn with a 4-px stroke).
  - Total corner count tapped as the answer (all corners = right angles): `ANIM.nudge`, `tone("nudge")`, the replay — the checker visits every corner, fits and badges the right ones, refuses the others, last badge grows.
  - Correct numeral tapped while right angles remain unmarked (lost place): nudge and tone, the replay marks them all; the child taps again.
  - Any other wrong numeral: nudge, tone, the replay.
- Retry behaviour: attempt 1 unaided → attempt 2 after the wedge or the replay → attempt 3 with the show-me ring on the correct numeral; the ringed tile completes the item as solved-with-help. No attempt 4. An item with any refused corner or wrong numeral is not first-try.
- Finish condition: 12 items. No losing state; no clock.

## Strings
- `GameCore.t()` keys: `t("start")`, `t("question_x_of_y")`, `t("all_done")`, `t("play_again")`, `t("menu")`, `t("well_done")`, `t("great_job")`, `t("excellent")`, `t("you_did_it")`, `t("keep_going")`.
- Game-specific (`STRINGS.en`, via `S(key)`): `title` = "Right-Angle Finder"; `howManyRight` = "How many right angles?".

## Sound
`tone("tap", k)` when the k-th right angle is marked (pitch climbs with the count, F-213); `tone("nudge")` on a refused corner and on a wrong numeral; `tone("correct")` on the right count; `tone("finish")` once. Silent under `?sound=off`; no audio files. The checker and wedge carry the meaning; sound never does alone.

## Testing checklist
- [ ] Works in all 11 languages (Start, All done, Play again, Menu, the progress label, praise and the caption change with the picker).
- [ ] Works at narrow width (400-px iframe: koala, shape, all corner targets and four numeral tiles visible; corner targets remain separate).
- [ ] Keyboard operable (Tab walks the corners clockwise then the numerals; Enter tests a corner / picks a numeral; Enter on a marked corner does nothing).
- [ ] Never auto-starts.
- [ ] No losing state (any number of refused corners and wrong numerals still ends with the item completing via the replay and the show-me ring).
- [ ] Tapping a rectangle's corner makes the checker fly in and snap into it with a badge; tapping the same corner again does nothing.
- [ ] Tapping the pointy corner of a right triangle makes the checker wobble with a coral wedge sticking out, then slide back to the koala.
- [ ] On the square turned like a diamond the checker snaps in tilted and fits all four corners.
- [ ] On the house shape the apex accepts the checker (3 right angles in all).
- [ ] Tapping the numeral for the total number of corners on a right triangle replays the checker round all three corners and leaves one badge.
- [ ] At level 3 the 80° corner is refused with a thin wedge inside the shape; the two square corners of the same shape are accepted.
- [ ] Two first-try items in a row bring mixed shapes; a refused corner brings a simpler shape next.
- [ ] The finish screen shows twelve small shapes with little squares in their right-angle corners and, at most, "n of 12".
- [ ] With `?sound=off` nothing is audible.
