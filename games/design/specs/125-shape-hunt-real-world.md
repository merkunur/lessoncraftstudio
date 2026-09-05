# 125 — Shape Hunt

## Identity
- Slug: `shape-hunt-real-world`
- Subject / topic: Mathematics / 2D shapes (circle, triangle, square, rectangle) recognised as the outline of everyday objects
- Age band: `5-6`
- Interaction pattern: `P1` — tap one of N (three everyday objects; tap the one whose outline is the shape in the prompt)
- Estimated build size: ~460 lines

Shared contract: `catalogue/BUILD-CONVENTIONS.md`. Pattern contract: `catalogue/PATTERNS.md` P1. Content is language-neutral (a shape outline as the prompt, emoji objects as the choices); no `LOCALE_DATA`; no shape names are ever written or spoken — the outline is the prompt in every locale. Sorting drawn shapes by name is game 005; this game is the step after it: seeing the shape INSIDE a real thing.

## Learning
- Objective: Looks at a shape outline — including rotated and skinny versions — and taps the one everyday object among three whose outline is that shape.
- Prerequisites: Has met the four basic shapes (game 005 is the natural predecessor). No reading, no counting required; the side-count badges 1-4 are support, not a gate.
- Curriculum links: F-115 (prototype orientation — a rotated square is "a diamond", ~⅓ of 4-6-year-olds; about half fail on flipped/skinny triangles; loses place counting sides — responses: vary orientation and type from level 1, count sides as feedback, sides light one by one), F-21 ("2D shapes circle/square/rectangle/triangle" in all twelve systems), F-31 row "2D shapes named (4 basic)" — conservative 6-7, earliest 4 → 5-6 (US K.G.A.2 "correctly name shapes regardless of their orientations or overall size" and K.G.B.4 "analyze and compare … using informal language to describe their similarities"; England Reception ELG / Y1 "recognise and name common 2-D shapes"; Germany Klasse 1 "ebene Figuren in der Umwelt entdecken"; France GS "reconnaître des formes dans l'environnement"; Netherlands groep 1-2 "vormen herkennen in de omgeving"; Spain Infantil "formas planas en objetos"; Brazil EF01MA14; Sweden förskoleklass "geometriska objekt i vardagen"; Finland esiopetus). Feedback is enacted, never written (F-43; F-42 zero text on the play screen for 5-6).
- Common misconceptions (F-115), each with this game's response:
  1. **A rotated square is a different shape ("that's a diamond, the gift box is a square").** Response: from L1 some prompts show the square turned 45°; when the child taps the wrong object, the prompt shape in the bubble turns live to its upright pose (`ANIM.turnUpright`) while its four sides light one by one — a square is four equal sides whichever way it sits; on a correct tap the overlay outline settles on the object in the object's own pose.
  2. **Skinny or upside-down triangles are "not triangles".** Response: L2 prompts show the triangle point-down or lying on a side; L3 shows a tall skinny one; a wrong tap lights the prompt's three sides with badges 1, 2, 3 (`ART.sideGlow`, `ART.countBadge`, `tone("tap", k)`) and then the tapped object's own outline appears over it and ITS sides light — the child sees 3 against 4 (or a round outline with no sides at all).
  3. **Square and rectangle confused (the door is "a square").** Response: L2 and L3 put a square object and a rectangle object on the same tile row; a wrong tap plays the side cue on both outlines, and for the square prompt the four `ART.sideGlow`s are the same length while for the rectangle two are visibly longer — the difference is shown by the glowing sides, not named.
  4. **Choosing by what the object IS ("a ball is round, so the clock is a ball") or by a detail (the bow on the gift).** Response: the overlay outline (`ART.overlayCircle` / `ART.overlaySquare` / `ART.overlayRect` / `ART.overlayTri`) is drawn on the object in the accent colour on every correct tap, so the shape is seen ON the thing; L3 objects are chosen so that no object repeats within a session's last three items.
  5. **Losing count of the sides.** Response: the sides light in order round the shape, each with its badge, 300 ms apart, and the last badge grows (`ANIM.lastBadge`) — the count is done for the child, the way game 001 counts berries.

## How it plays
1. **Start screen**: title "Shape Hunt", the owl (`ART.owl`) at (360, 200), Start, picker (hidden under `?embed=1`).
2. **Item 1 (L1: prompt = circle; objects ball, pizza, gift)**: rail of 8 dots (§6). Zone A: the owl at (110, 176) with a speech bubble (`ART.bubble`, 150 × 110) at (110, 88) holding the prompt outline: `ART.promptCircle` (or `ART.promptSquare` / `ART.promptRect` / `ART.promptTri`, drawn at the item's pose: rotation and, for rectangles/triangles, the item's proportions). Centred in zone A at (420, 160), a magnifying ring (`ART.lens`, r 70) as a decorative frame that the correct object will be drawn inside on completion — it starts empty. Zone B: three object tiles (`makeTile` 96 × 96 with `ART.objTile` tokens) at y = 380, x = 240 / 360 / 480, each labelled with one object emoji from the Content table (drawn through ART at 64 px), positions shuffled. No caption; no words anywhere.
3. **Answering**: the child taps a tile.
   - **Correct**: `api.setSelected(true)`, `ANIM.pop`, `tone("correct")`; the object's overlay outline (`ART.overlayCircle` etc., accent stroke) `ANIM.appear`s ON the object at the pose listed in Content; if the prompt was shown rotated, the prompt in the bubble `ANIM.turnUpright`s at the same time; a copy of the object with its outline glides (`ANIM.glide`) into the lens at (420, 160); the owl `ANIM.hoot`s; `GameCore.showPraise` with the next key in rotation; the rail dot fills; after 900 ms the next item builds (lens copy `ANIM.rise`s away, new tiles `ANIM.appear`). First-try correct.
   - **Wrong**: `ANIM.nudge`, `tone("nudge")`, the tile de-selects and stays enabled; then the **side cue** (all tiles `setEnabled(false)` for its ≈ 2.6 s): (a) the prompt shape in the bubble turns upright if rotated (`ANIM.turnUpright`), then its sides light one by one clockwise from the top-left corner — `ART.sideGlow` along each side with `ART.countBadge` k at the side's midpoint and `tone("tap", k)`, 300 ms apart, the last badge `ANIM.lastBadge`; a circle prompt instead shows `ART.roundGlow` once (`ANIM.pulse`) and no badges; (b) the tapped object's OWN overlay outline appears on its tile and its sides light the same way (or `ART.roundGlow` for a round object); (c) after 900 ms everything fades (`ANIM.fadeOut`) and the tiles re-enable. Attempt 2.
   - **Wrong on attempt 2**: the side cue again, and the correct tile gains the show-me ring (`ART.showRing`, `ANIM.showMe`); tapping it completes the item as solved-with-help (the overlay and the lens copy play; no praise pop).
4. **Items 2-8**: per Content/Rules. L1: prompts mostly in prototype pose with one square shown at 45°, and the three objects from three different shape families; L2: prompts rotated (square 45°, triangle point-down or on its side, rectangle landscape), and square + rectangle objects on the same row; L3: skinny prompts (tall thin rectangle 26 × 64, tall skinny triangle), prompts rotated by odd angles (20°, 30°), square + rectangle together, and a round object beside a "pointy" one.
5. **Finish**: `t("all_done")` (360, 110); the owl (360, 200) `ANIM.celebrate`; the summary = the eight found objects in play order, each drawn at 44 px with its accent overlay outline on a small `ART.foundChip` (60 × 60), in a row at y = 400 (x = 360 − 3.5 × 72 + i × 72) — a row of shapes found in things, not a score; `play_again` (250, 510), `menu` (470, 510); `tone("finish")`; `GameCore.reportHeight()`.

Session ≈ 4 minutes.

## Art registry
```js
const ART = {
  owl:           { kind: "emoji", value: "🦉", size: 88 },
  objBall:       { kind: "emoji", value: "⚽", size: 64 },
  objCookie:     { kind: "emoji", value: "🍪", size: 64 },
  objOrange:     { kind: "emoji", value: "🍊", size: 64 },
  objClock:      { kind: "emoji", value: "⏰", size: 64 },
  objDonut:      { kind: "emoji", value: "🍩", size: 64 },
  objPie:        { kind: "emoji", value: "🥧", size: 64 },
  objPizza:      { kind: "emoji", value: "🍕", size: 64 },
  objCheese:     { kind: "emoji", value: "🧀", size: 64 },
  objSetSquare:  { kind: "emoji", value: "📐", size: 64 },
  objTent:       { kind: "emoji", value: "⛺", size: 64 },
  objGift:       { kind: "emoji", value: "🎁", size: 64 },
  objDie:        { kind: "emoji", value: "🎲", size: 64 },
  objIce:        { kind: "emoji", value: "🧊", size: 64 },
  objBox:        { kind: "emoji", value: "📦", size: 64 },
  objBook:       { kind: "emoji", value: "📕", size: 64 },
  objDoor:       { kind: "emoji", value: "🚪", size: 64 },
  objCard:       { kind: "emoji", value: "💳", size: 64 },
  objPhone:      { kind: "emoji", value: "📱", size: 64 },
  objTicket:     { kind: "emoji", value: "🎫", size: 64 },
  bubble:        { kind: "shape", shape: "roundRect", w: 150, h: 110, fill: "surface", stroke: "line", strokeWidth: 2, radius: 18 },
  promptCircle:  { kind: "shape", shape: "circle", r: 32, stroke: "ink", strokeWidth: 4 },
  promptSquare:  { kind: "shape", shape: "rect", w: 60, h: 60, stroke: "ink", strokeWidth: 4 },
  promptRect:    { kind: "shape", shape: "rect", w: 72, h: 40, stroke: "ink", strokeWidth: 4 },     // w,h set per item (skinny: 26 × 64)
  promptTri:     { kind: "shape", shape: "polygon", points: [[0,-34],[36,28],[-36,28]], stroke: "ink", strokeWidth: 4 },   // points set per item (skinny: [[0,-40],[16,32],[-16,32]])
  lens:          { kind: "shape", shape: "circle", r: 70, fill: "surface2", stroke: "line", strokeWidth: 3 },
  objTile:       { kind: "shape", shape: "roundRect", w: 96, h: 96, fill: "surface", stroke: "line", strokeWidth: 2, radius: 12 },
  overlayCircle: { kind: "shape", shape: "circle", r: 30, stroke: "accent", strokeWidth: 4 },
  overlaySquare: { kind: "shape", shape: "rect", w: 56, h: 56, stroke: "accent", strokeWidth: 4 },
  overlayRect:   { kind: "shape", shape: "rect", w: 44, h: 58, stroke: "accent", strokeWidth: 4 },   // w,h per object (Content table)
  overlayTri:    { kind: "shape", shape: "polygon", points: [[-32,28],[32,28],[0,-28]], stroke: "accent", strokeWidth: 4 },   // points per object
  sideGlow:      { kind: "shape", shape: "line", w: 60, stroke: "accent", strokeWidth: 6 },           // one per side; length and angle set to the side at call
  roundGlow:     { kind: "shape", shape: "circle", r: 36, stroke: "accent", strokeWidth: 6 },         // a round shape's whole outline lights once
  countBadge:    { kind: "shape", shape: "circle", r: 14, fill: "structure" },                        // numeral 18 px display, color bg
  showRing:      { kind: "shape", shape: "roundRect", w: 108, h: 108, stroke: "structure", strokeWidth: 4, radius: 16 },
  foundChip:     { kind: "shape", shape: "roundRect", w: 60, h: 60, fill: "structureSoft", stroke: "structure", strokeWidth: 1, radius: 10 },
  dotEmpty:      { kind: "shape", shape: "circle", r: 8, stroke: "line", strokeWidth: 2 },
  dotFull:       { kind: "shape", shape: "circle", r: 8, fill: "structure" }
};
```
Overlay geometry per object (relative to the emoji's centre; a schematic outline, not a trace — ±6 px is fine): ball, cookie, orange, doughnut, pie → `overlayCircle` r 30; clock → r 28 at (0, 2); pizza → `overlayTri` [[−28,−26],[30,−30],[−22,30]]; cheese → [[−30,26],[30,26],[0,−28]]; set square → [[−30,28],[30,28],[30,−30]]; tent → [[−32,28],[32,28],[0,−28]]; gift → `overlaySquare` 56 at (0, 6); die, ice, box → 56 at (0, 0); book → `overlayRect` 44 × 58; door → 40 × 62; phone → 34 × 60; card → 60 × 40; ticket → 60 × 36. Prompt poses per item are in Content. All emoji are Unicode 12 or older; no fallbacks needed.

## Animation registry
```js
const ANIM = {
  pop:         { scale: 1.12, duration: 140, ease: "Back.Out", yoyo: true, trigger: "the correct tile" },
  nudge:       { x: "+=10", duration: 80, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "a wrong tile" },
  turnUpright: { angle: 0, duration: 400, ease: "Sine.InOut", trigger: "the prompt shape in the bubble turns from its item pose to upright (angle set from the item's rotation)" },
  lastBadge:   { scale: 1.4, duration: 220, ease: "Back.Out", yoyo: true, trigger: "the last side's badge" },
  pulse:       { scale: 1.12, duration: 300, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "roundGlow on a circle prompt or a round object" },
  appear:      { alpha: 1, scale: 1, duration: 200, ease: "Back.Out", trigger: "overlay outline on the object; new tiles; side glows (from alpha 0, scale 0.6)" },
  fadeOut:     { alpha: 0, duration: 300, ease: "Sine.In", trigger: "side glows, badges and the wrong object's outline after the cue" },
  glide:       { duration: 260, ease: "Sine.InOut", trigger: "a copy of the found object (with its outline) to the lens (x,y set at call)" },
  rise:        { y: "-=40", alpha: 0, duration: 400, ease: "Sine.In", trigger: "the lens copy leaving between items" },
  hoot:        { scale: 1.08, duration: 110, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "owl after a correct tap" },
  showMe:      { alpha: 1, duration: 500, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "show-me ring on the correct tile (from alpha 0.2)" },
  celebrate:   { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "finish owl" }
};
```
No flashing: `showMe` at 1 Hz; sides light once each, 300 ms apart.

## Screen layout
```
y   0 ┌──────────────────────────────────────────────────────────────┐
      │ [lang]                ○ ○ ○ ○ ○ ○ ○ ○  rail y=28                │  zone T
 56   ├──────────────────────────────────────────────────────────────┤
      │  bubble (110,88) [ prompt outline ]                          │
      │                                    ( lens (420,160) r 70 )   │  zone A
      │  owl (110,176)                                               │
260   ├──────────────────────────────────────────────────────────────┤
      │                                                              │
      │        [ obj ]      [ obj ]      [ obj ]   tiles y=380       │  zone B
      │        x=240        x=360        x=480     (96×96)           │
480   ├──────────────────────────────────────────────────────────────┤
      │                 (praise pop appears centred)                 │  zone C
560   └──────────────────────────────────────────────────────────────┘
```
Fixed layout, FIT scaling.

## Visual specification
- Background `THEME.colour.bg`; rail per §6: 8 × `ART.dotEmpty` at y = 28 (x = 283 + i × 22) → `ART.dotFull`.
- `ART.owl` (110, 176); `ART.bubble` (110, 88) with the prompt shape centred in it at the item's pose (rotation applied to the shape graphic; `ART.promptRect` and `ART.promptTri` take the item's proportions).
- `ART.lens` (420, 160); the found copy (emoji 64 px + its overlay) sits at the lens centre until the next item.
- Tiles: `makeTile` 96 × 96 with `ART.objTile` tokens, label = the object emoji through ART at 64 px; selected look = library outline; `ART.showRing` behind the correct tile on attempt 3.
- Side cue: `ART.sideGlow` per side over the prompt (and over the tapped object's overlay), `ART.countBadge` at each side's midpoint pushed 14 px outward; `ART.roundGlow` for circles.
- All tiles 96 ≥ 80 (5-6 floor); gaps 24. Tab order: the three tiles left to right. Under `?embed=1` the picker is not created. No text on the play screen.

## Content
Language-neutral. Item = (prompt shape and pose; correct object; two distractors). Pose: "up" = prototype; "45°" / "180°" / "90°" / "20°" / "30°" = rotation of the prompt outline; "land" = landscape rectangle 72 × 40; "tall" = 40 × 72; "skinny" = rectangle 26 × 64 or triangle [[0,−40],[16,32],[−16,32]]; "obtuse" = triangle [[−36,24],[36,24],[20,−24]].

Objects by ART key — round: `ART.objBall`, `ART.objCookie`, `ART.objOrange`, `ART.objClock`, `ART.objDonut`, `ART.objPie` · triangle: `ART.objPizza`, `ART.objCheese`, `ART.objSetSquare`, `ART.objTent` · square: `ART.objGift`, `ART.objDie`, `ART.objIce`, `ART.objBox` · rectangle: `ART.objBook`, `ART.objDoor`, `ART.objCard`, `ART.objPhone`, `ART.objTicket`.

- **L1** (prototype poses, one rotated square; the three objects from three different families):
  1. circle up · `ART.objBall` · `ART.objPizza`, `ART.objGift`
  2. triangle up · `ART.objPizza` · `ART.objCookie`, `ART.objDie`
  3. square up · `ART.objGift` · `ART.objOrange`, `ART.objTent`
  4. circle up · `ART.objDonut` · `ART.objSetSquare`, `ART.objIce`
  5. triangle up · `ART.objTent` · `ART.objClock`, `ART.objBox`
  6. square 45° · `ART.objDie` · `ART.objCookie`, `ART.objCheese`
- **L2** (rotated prompts; square and rectangle objects on the same row):
  7. rectangle tall · `ART.objBook` · `ART.objGift`, `ART.objBall`
  8. square 45° · `ART.objIce` · `ART.objCard`, `ART.objPizza`
  9. triangle 180° · `ART.objCheese` · `ART.objPhone`, `ART.objCookie`
  10. rectangle land · `ART.objCard` · `ART.objDie`, `ART.objDonut`
  11. circle up · `ART.objClock` · `ART.objTicket`, `ART.objSetSquare`
  12. triangle 90° · `ART.objSetSquare` · `ART.objBox`, `ART.objOrange`
- **L3** (skinny and oddly rotated prompts; near families together):
  13. rectangle skinny tall · `ART.objPhone` · `ART.objIce`, `ART.objGift`
  14. triangle skinny · `ART.objTent` · `ART.objIce`, `ART.objTicket`
  15. rectangle land 20° · `ART.objTicket` · `ART.objBox`, `ART.objDie`
  16. square 30° · `ART.objBox` · `ART.objDoor`, `ART.objPie`
  17. triangle obtuse · `ART.objPizza` · `ART.objDoor`, `ART.objDonut`
  18. rectangle tall · `ART.objDoor` · `ART.objIce`, `ART.objTent`

Play list of 8 per Rules: start at L1; within a level take items in a shuffled order without repeats; two consecutive items never share the same prompt family, and no object appears in two consecutive items (§13); the correct tile's slot never repeats twice running. Tile order shuffled per item.

Worked example: item 1 (circle; ball) first-try · item 2 (triangle; pizza) first-try → L2 · item 3 (rectangle tall; book — with gift and ball) taps the gift: the gift's square outline appears and its four equal sides light 1-4 while the prompt's two long and two short sides light 1-4 — then taps the book (helped) → L1 · item 4 (square 45°; die) taps the cookie: the prompt turns upright, its four sides light, the cookie shows a round glow with no badges; then the die (helped) → stays L1 · item 5 (circle; doughnut) first-try · item 6 (triangle; tent) first-try → L2 · item 7 (square 45°; ice) first-try · item 8 (triangle 180°; cheese) first-try · Finish shows eight objects with their outlines.

## Rules
- Item count: 8.
- Difficulty progression: 2 consecutive first-try correct → next level (cap L3).
- Adaptation: any wrong tap on an item, or wrong first-try on 2 consecutive items → next item one level down (floor L1). The current item is never abandoned.
- What happens on a correct answer: `ANIM.pop`, `tone("correct")`, the overlay outline on the object (and `ANIM.turnUpright` on a rotated prompt), the found copy glides into the lens, owl `ANIM.hoot`, praise rotation ["well_done", "great_job", "excellent", "you_did_it", "keep_going"], rail dot, next item after 900 ms.
- What happens on a wrong answer (per anticipated mistake):
  - Rotated prompt not recognised (a square shown at 45° / a triangle on its side): `ANIM.nudge`, `tone("nudge")`, the prompt turns upright, then the side cue on the prompt and on the tapped object.
  - Square taken for rectangle or the reverse: nudge and tone, then the side cue on both — four equal glows against two long + two short.
  - Round object tapped for a sided prompt (or the reverse): nudge and tone, the prompt's sides light with badges while the round object shows one round glow and no badges.
  - Any other wrong object: nudge and tone, the side cue on the prompt and on the object.
- Retry behaviour: attempt 1 unaided → attempt 2 after the side cue → attempt 3 with the show-me ring; the ringed tile completes the item as solved-with-help. No attempt 4. An item completed after any wrong tap does not count as first-try.
- Finish condition: 8 items. No losing state; no clock.

## Strings
- `GameCore.t()` keys: `t("start")`, `t("all_done")`, `t("play_again")`, `t("menu")`, `t("well_done")`, `t("great_job")`, `t("excellent")`, `t("you_did_it")`, `t("keep_going")`.
- Game-specific (`STRINGS.en`, via `S(key)`): `title` = "Shape Hunt". No words on the play screen; shape names are never displayed (declared out of scope — the outline is the prompt in every locale).

## Sound
`tone("correct")` on the right object; `tone("nudge")` on a wrong one; `tone("tap", k)` on the k-th side as it lights (pitch climbs with the side count); `tone("tap")` when the found copy lands in the lens; `tone("finish")` once. Silent under `?sound=off`; no audio files. Nothing is spoken.

## Testing checklist
- [ ] Works in all 11 languages (Start, All done, Play again, Menu and praise change with the picker; the play screen has no words in any language).
- [ ] Works at narrow width (400-px iframe: owl, bubble, lens and the three tiles fully visible; tiles remain separate targets).
- [ ] Keyboard operable (Tab cycles the three tiles; Enter picks; the owl, bubble and lens are not focusable).
- [ ] Never auto-starts.
- [ ] No losing state (8 wrong taps in a row still reach All done via the show-me ring).
- [ ] Tapping the right object draws a coral outline of the shape on it and a copy of it appears inside the lens.
- [ ] Tapping a wrong object lights the prompt's sides one by one with badges 1, 2, 3 (or 4) and rising notes, then outlines the tapped object and lights its sides too.
- [ ] A prompt square shown turned like a diamond turns upright during the cue; the gift box is still accepted as a square.
- [ ] A round object (ball, cookie, clock) tapped for a triangle prompt shows one round glow and no badges.
- [ ] At level 2 the tiles can show a book and a gift together; the tall rectangle prompt is answered by the book.
- [ ] At level 3 the prompt can be a thin tall rectangle or a skinny triangle and is still answered by the phone / the tent.
- [ ] Two first-try corrects in a row bring rotated prompts; a wrong tap brings upright prompts on the next item.
- [ ] The finish screen shows the eight found objects with their outlines and no score.
- [ ] With `?sound=off` nothing is audible.
