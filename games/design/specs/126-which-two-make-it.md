# 126 — Which Two Make It

## Identity
- Slug: `which-two-make-it`
- Subject / topic: Mathematics / composing a shape from two parts (two pieces that together fill a square, a rectangle or a triangle exactly)
- Age band: `5-6`
- Interaction pattern: `P1` — tap one of N (three pairs of pieces; tap the pair that fills the target outline)
- Estimated build size: ~480 lines

Shared contract: `catalogue/BUILD-CONVENTIONS.md`. Pattern contract: `catalogue/PATTERNS.md` P1. Content is language-neutral (an outline and shape pieces; no numerals, no words); no `LOCALE_DATA`. Nothing is dragged: the child taps a pair and the pieces travel by themselves (F-49), so the game is about SEEING which two make it, not about steering them.

## Learning
- Objective: Chooses, from three pairs of pieces, the pair that together fills a target outline exactly — with no gap and nothing sticking out — including when the pieces are shown turned the wrong way.
- Prerequisites: Has met the four basic shapes (game 005). No reading, no counting; the first item is discoverable by tapping any pair (the pieces travel and show whether they fit).
- Curriculum links: F-115 (prototype orientation — a rotated square "is a diamond", flipped/skinny triangles fail for ~half of 4-6-year-olds — responses: rotate the shape live, vary orientation from level 1), F-21 ("2D shapes" and "halves as equal parts (informal)" in the common core; composing shapes from parts precedes both), F-31 row "2D shapes named (4 basic)" — conservative 6-7, earliest 4 → 5-6 (US K.G.B.6 "compose simple shapes to form larger shapes — join two triangles to make a rectangle" and 1.G.A.2 "compose two-dimensional shapes … to create a composite shape"; England Reception ELG "compose and decompose shapes so that children recognise a shape can have other shapes within it"; Germany Klasse 1 "Figuren legen und zerlegen"; France GS "reproduire un assemblage à partir d'un modèle"; Netherlands groep 1-2 "figuren samenstellen"; Spain Infantil "composición de formas"; Brazil EI03ET05; Sweden förskoleklass "konstruera med geometriska former"; Finland esiopetus "rakentelu"). Feedback is enacted (F-43): the pieces go where they would go and the gap or the overhang is seen, never described; an invalid choice is refused by the outline, not punished (F-61).
- Common misconceptions (F-115; the responses rest on F-43 and F-61), each with this game's response:
  1. **"Two of the right kind of shape make it" — two small squares chosen for the big square, two thin rectangles for the wide rectangle.** Response: the two pieces glide into the outline and sit where they fit best; the part of the outline they do NOT cover shows as `ART.gapMark` (accent, 35 % alpha, drawn beneath the pieces) for 1000 ms, then the pieces glide back. The size of the gap is the feedback.
  2. **A round piece can fill a cornered space.** Response: L1 already offers a triangle-and-circle pair; the circle glides into the corner space and the coral gap shows all round it — corners stay uncovered.
  3. **Pieces shown turned the "wrong" way cannot fit (two rectangles lying flat "don't make a standing square"; a triangle with its point down "isn't the half").** Response: from L2 the fitting pair is shown on its tile rotated away from its slot pose; on a correct tap each piece turns as it travels (`ANIM.turnToFit`) and lands exactly; on a wrong tap of another pair the fitting pair's pieces do a small turn in place (`ANIM.hintTurn`) on the 2nd error, so the child sees that pieces can turn.
  4. **Bigger is better — two big rectangles for the square "because they cover it".** Response: L3 offers a pair that is too big; the second piece sticks out past the outline and the overhanging part shows as `ART.overhangMark` (accent outline, 4 px) — covering is not the same as fitting.
  5. **Choosing by count — "it's two pieces, so it works".** Response: every pair on every tile is exactly two pieces, so counting never separates them; only shape and size do.

## How it plays
1. **Start screen**: title "Which Two Make It", the turtle (`ART.turtle`) at (360, 200), Start, picker (hidden under `?embed=1`).
2. **Item 1 (L1: target = square; pairs = two triangles [fit], two small squares, triangle + circle)**: rail of 8 dots (§6). Zone A: the turtle at (110, 176); the target outline centred at (420, 160) — `ART.targetSquare` (a dashed 120 × 120 outline via graphics lineDash [8, 6]). Zone B: three pair tiles (`makeTile` 200 × 130 with `ART.pairTile` tokens — invisible body, the library's selected outline) at y = 380, x = 140 / 360 / 580; on each tile its two pieces are drawn at 70 % scale, the first centred at tile (−48, 0) and the second at (48, 0), in the pose the Content table gives for that level. Tile order shuffled. No caption; no words anywhere.
3. **Answering**: the child taps a tile.
   - **Correct (the fitting pair)**: `api.setSelected(true)`, `ANIM.pop`, `tone("correct")`; full-size copies of the two pieces glide from the tile (`ANIM.glide`, scaling 0.7 → 1 with `ANIM.grow` and, where the tile pose differs from the slot pose, turning with `ANIM.turnToFit`) to their slots inside the outline (Content gives each piece's slot centre and rotation), landing 120 ms apart with `tone("tap", 1)` and `tone("tap", 3)`; the dashed outline becomes solid (`ART.targetDone` drawn over it, `ANIM.appear`); the turtle `ANIM.nod`s; `GameCore.showPraise` with the next key in rotation; the rail dot fills; after 900 ms the next item builds (the filled shape `ANIM.rise`s away, new tiles `ANIM.appear`). First-try correct.
   - **Wrong (a non-fitting pair)**: `ANIM.nudge`, `tone("nudge")`, the tile de-selects and stays enabled; then the **fit cue** (all tiles `setEnabled(false)` for its ≈ 1.9 s): the pair's pieces glide into the outline to the resting positions the Content table gives; `ART.gapMark` (the listed gap polygon) is drawn BENEATH them at 35 % alpha so coral shows wherever they do not cover; for a too-big pair `ART.overhangMark` outlines the part beyond the outline; both `ANIM.pulse` once; after 1000 ms the marks `ANIM.fadeOut` and the pieces glide back to the tile. Attempt 2.
   - **Wrong on attempt 2**: the fit cue again, the fitting pair's pieces `ANIM.hintTurn` on their tile (a small turn and back), and the correct tile gains the show-me ring (`ART.showRing`, `ANIM.showMe`); tapping it completes the item as solved-with-help (the pieces travel and fit; no praise pop).
4. **Items 2-8**: per Content/Rules. L1: the square target; the fitting pair shown in slot pose; L2: the wide rectangle target, and square items whose fitting pair is shown rotated on its tile; L3: the big triangle target, too-big pairs, and rotated fitting pairs.
5. **Finish**: `t("all_done")` (360, 110); the turtle (360, 200) `ANIM.celebrate`; the summary = the eight completed shapes drawn small (`ART.miniOutline` scaled 0.4 with its two pieces inside and the join line between them) in a row at y = 400 (x = 360 − 3.5 × 76 + i × 76) — eight shapes made of two, not a score; `play_again` (250, 510), `menu` (470, 510); `tone("finish")`; `GameCore.reportHeight()`.

Session ≈ 4 minutes.

## Art registry
```js
const ART = {
  turtle:        { kind: "emoji", value: "🐢", size: 88 },
  targetSquare:  { kind: "shape", shape: "rect", w: 120, h: 120, stroke: "structure", strokeWidth: 3 },                       // dashed via lineDash [8,6]
  targetRect:    { kind: "shape", shape: "rect", w: 160, h: 80, stroke: "structure", strokeWidth: 3 },                        // dashed
  targetTri:     { kind: "shape", shape: "polygon", points: [[-80,-80],[80,80],[-80,80]], stroke: "structure", strokeWidth: 3 },   // dashed
  targetDone:    { kind: "shape", shape: "polygon", points: [], stroke: "structure", strokeWidth: 4 },                        // solid outline of the target, points set per target
  pairTile:      { kind: "shape", shape: "roundRect", w: 200, h: 130, fill: "bg", stroke: "bg", strokeWidth: 0, radius: 14 },   // invisible tile body; selected look = structure 3 px outline
  piecePoly:     { kind: "shape", shape: "polygon", points: [], fill: "structureSoft", stroke: "structure", strokeWidth: 3 },  // any triangle / rectangle / square piece; points per piece
  pieceCircle:   { kind: "shape", shape: "circle", r: 30, fill: "structureSoft", stroke: "structure", strokeWidth: 3 },
  gapMark:       { kind: "shape", shape: "polygon", points: [], fill: "accent" },                    // 35 % alpha, beneath the pieces; points per pair
  overhangMark:  { kind: "shape", shape: "polygon", points: [], stroke: "accent", strokeWidth: 4 },  // the part of a too-big piece outside the outline
  showRing:      { kind: "shape", shape: "roundRect", w: 212, h: 142, stroke: "structure", strokeWidth: 4, radius: 18 },
  miniOutline:   { kind: "shape", shape: "polygon", points: [], stroke: "structure", strokeWidth: 2 },   // finish summary at 0.4 scale
  dotEmpty:      { kind: "shape", shape: "circle", r: 8, stroke: "line", strokeWidth: 2 },
  dotFull:       { kind: "shape", shape: "circle", r: 8, fill: "structure" }
};
```
All pieces share one fill token so colour never marks the fitting pair. Piece geometry (points relative to the piece's own centre, then placed at the slot centre with the slot rotation) is listed per pair in Content. The tile shows the same pieces at scale 0.7.

## Animation registry
```js
const ANIM = {
  pop:        { scale: 1.12, duration: 140, ease: "Back.Out", yoyo: true, trigger: "the fitting tile tapped" },
  nudge:      { x: "+=10", duration: 80, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "a wrong tile tapped" },
  glide:      { duration: 320, ease: "Sine.InOut", trigger: "each piece to its slot / resting position and back (x,y set at call)" },
  grow:       { scale: 1, duration: 320, ease: "Sine.InOut", trigger: "a piece leaving its tile (from scale 0.7); reversed on the way back" },
  turnToFit:  { angle: 0, duration: 320, ease: "Sine.InOut", trigger: "a piece turning from its tile pose to its slot rotation while it glides (angle set per piece)" },
  hintTurn:   { angle: "+=25", duration: 220, ease: "Sine.InOut", yoyo: true, trigger: "the fitting pair's pieces on their tile, 2nd error" },
  pulse:      { scale: 1.06, duration: 300, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "gapMark / overhangMark" },
  appear:     { alpha: 1, scale: 1, duration: 200, ease: "Back.Out", trigger: "targetDone; new tiles (from alpha 0, scale 0.6)" },
  fadeOut:    { alpha: 0, duration: 300, ease: "Sine.In", trigger: "gap and overhang marks after the cue" },
  rise:       { y: "-=40", alpha: 0, duration: 400, ease: "Sine.In", trigger: "the completed shape leaving between items" },
  nod:        { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "turtle after a correct tap" },
  showMe:     { alpha: 1, duration: 500, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "show-me ring on the fitting tile (from alpha 0.2)" },
  celebrate:  { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "finish turtle" }
};
```
No flashing: `showMe` at 1 Hz; marks pulse once.

## Screen layout
```
y   0 ┌──────────────────────────────────────────────────────────────┐
      │ [lang]                ○ ○ ○ ○ ○ ○ ○ ○  rail y=28                │  zone T
 56   ├──────────────────────────────────────────────────────────────┤
      │                              ┌ ─ ─ ─ ┐                       │
      │  turtle (110,176)            ╎ target ╎  outline (420,160)    │  zone A
      │                              └ ─ ─ ─ ┘                       │
260   ├──────────────────────────────────────────────────────────────┤
      │  ┌──────────┐      ┌──────────┐      ┌──────────┐   y=380     │
      │  │ ◺    ◹   │      │ [ ]  [ ] │      │ ◺    ○   │   200×130   │  zone B
      │  └──────────┘      └──────────┘      └──────────┘             │
      │     x=140             x=360             x=580                 │
480   ├──────────────────────────────────────────────────────────────┤
      │                 (praise pop appears centred)                 │  zone C
560   └──────────────────────────────────────────────────────────────┘
```
Fixed layout, FIT scaling. Travelling pieces are full-size copies; the tile keeps its 70 % pieces so the choice stays visible.

## Visual specification
- Background `THEME.colour.bg`; rail per §6: 8 × `ART.dotEmpty` at y = 28 (x = 283 + i × 22) → `ART.dotFull`.
- `ART.turtle` (110, 176). Target outline centred (420, 160): `ART.targetSquare` / `ART.targetRect` / `ART.targetTri` dashed; `ART.targetDone` over it on completion.
- Tiles: `makeTile` 200 × 130 with `ART.pairTile` tokens at (140, 380), (360, 380), (580, 380); pieces (`ART.piecePoly` / `ART.pieceCircle`) at scale 0.7, centred at tile (−48, 0) and (48, 0) in the level's tile pose. Gaps between tiles 20 px; each tile ≥ 80 (5-6 floor).
- `ART.gapMark` and `ART.overhangMark` in target coordinates; `ART.showRing` around the fitting tile.
- Tab order: the three tiles left to right. Under `?embed=1` the picker is not created. No text on the play screen.

## Content
Language-neutral. Coordinates are relative to the target centre (420, 160). A piece is given by its polygon points (or circle radius) about its own centre, its slot centre and its slot rotation; a pair's "tile pose" says how the two pieces are drawn on the tile (slot pose = same rotation as the slot; "turned" = the stated extra rotation, which `ANIM.turnToFit` removes on the way in). FIT pairs fill the outline; NO pairs list their resting positions and the `ART.gapMark` polygon (drawn beneath them) and, if any, the `ART.overhangMark` polygon.

**Target S — square 120 × 120**, outline [(−60,−60),(60,−60),(60,60),(−60,60)].
- S-a FIT · two right triangles, legs 120: A [(−40,−40),(80,−40),(−40,80)] centred at slot (−20,−20); B [(40,40),(−80,40),(40,−80)] at slot (20,20); rotation 0. Tile pose L1 = slot pose; L2/L3 = B turned 180°.
- S-b FIT · two rectangles 60 × 120 (points [(−30,−60),(30,−60),(30,60),(−30,60)]): slots (−30,0) and (30,0), rotation 0. Tile pose L1 = slot pose; L2/L3 = both turned 90° (lying flat).
- S-c NO · two squares 60 (points [(−30,−30),(30,−30),(30,30),(−30,30)]): rest at (−30,−30) and (30,−30); gap [(−60,0),(60,0),(60,60),(−60,60)].
- S-d NO · rectangle 60 × 120 + square 60: rest at (−30,0) and (30,−30); gap [(0,0),(60,0),(60,60),(0,60)].
- S-e NO · right triangle (as S-a A) + `ART.pieceCircle` r 30: triangle rests at (−20,−20), circle at (30,30); gap [(60,−60),(60,60),(−60,60)] (drawn beneath the circle, so coral shows all round it).
- S-f NO (too big) · two rectangles 80 × 120 (points [(−40,−60),(40,−60),(40,60),(−40,60)]): rest at (−20,0) and (60,0); overhang [(60,−60),(100,−60),(100,60),(60,60)]; no gap.
- S-g NO · two `ART.pieceCircle`s r 30: rest at (−30,0) and (30,0); gap = the whole outline [(−60,−60),(60,−60),(60,60),(−60,60)].

**Target R — rectangle 160 × 80**, outline [(−80,−40),(80,−40),(80,40),(−80,40)].
- R-a FIT · two squares 80 (points [(−40,−40),(40,−40),(40,40),(−40,40)]): slots (−40,0), (40,0). Tile pose L2 = slot pose; L3 = both turned 45°.
- R-b FIT · two right triangles, legs 160 and 80: A polygon [(−80,−40),(80,−40),(−80,40)], B polygon [(80,−40),(80,40),(−80,40)] (about the target centre, each with its centroid as its centre); rotation 0. Tile pose L2 = slot pose; L3 = B turned 180°.
- R-c NO · two rectangles 40 × 80 (points [(−20,−40),(20,−40),(20,40),(−20,40)]): rest at (−60,0) and (−20,0); gap [(0,−40),(80,−40),(80,40),(0,40)].
- R-d NO · square 80 + right triangle legs 80 ([(−40,−40),(40,−40),(−40,40)] about its centre (−13,−13)): square rests at (−40,0), triangle so that its polygon sits at [(0,−40),(80,−40),(0,40)]; gap [(80,−40),(80,40),(0,40)].
- R-e NO · two squares 60: rest at (−50,0) and (10,0); gap = the whole outline [(−80,−40),(80,−40),(80,40),(−80,40)].
- R-f NO (too big) · square 80 + rectangle 120 × 80 (points [(−60,−40),(60,−40),(60,40),(−60,40)]): rest at (−40,0) and (60,0); overhang [(80,−40),(120,−40),(120,40),(80,40)]; no gap.

**Target T — right triangle**, outline [(−80,−80),(80,80),(−80,80)] (right angle at bottom-left).
- T-a FIT · two right isosceles triangles: A polygon [(−80,80),(−80,−80),(0,0)], B polygon [(−80,80),(80,80),(0,0)] (about the target centre, each with its centroid as its centre); rotation 0. Tile pose L3 = slot pose.
- T-b FIT · the same two pieces, tile pose: A turned 90°, B turned 180° (turn to fit on the way in).
- T-c NO · square 80 + right triangle legs 80: square rests at (−40,40); triangle so that its polygon sits at [(−80,−80),(0,0),(−80,0)]; gap [(0,0),(80,80),(0,80)].
- T-d NO · two squares 80: rest at (−40,40) and (40,40); overhang [(0,0),(80,0),(80,80)]; gap [(−80,−80),(0,0),(−80,0)].
- T-e NO · right triangle legs 80 (at [(−80,−80),(0,0),(−80,0)]) + `ART.pieceCircle` r 30 at (−40,40); gap [(−80,0),(0,0),(80,80),(−80,80)] beneath the circle.

**Items** (target · fitting pair · two distractor pairs):
- **L1** (square; fitting pair in slot pose): 1. S · S-a · S-c, S-e · 2. S · S-b · S-g, S-d · 3. S · S-a · S-d, S-g · 4. S · S-b · S-c, S-e
- **L2** (rectangle; square items with the fitting pair turned on its tile): 5. R · R-a · R-c, R-e · 6. R · R-b · R-d, R-c · 7. S · S-b turned · S-c, S-e · 8. S · S-a turned · S-g, S-d · 9. R · R-a · R-d, R-e
- **L3** (triangle; too-big pairs; turned fitting pairs): 10. T · T-a · T-c, T-e · 11. S · S-a turned · S-f, S-c · 12. T · T-b · T-d, T-c · 13. R · R-b turned · R-f, R-c · 14. T · T-a · T-d, T-e

Play list of 8 per Rules: start at L1; within a level take items in a shuffled order without repeats; the fitting tile's slot never repeats twice running (§13); tile order shuffled per item.

Worked example: item 1 (S; two triangles) first-try · item 2 (S; two rectangles) first-try → L2 · item 3 (R; two squares — with the thin rectangles and the two small squares) taps the thin rectangles: they glide in and the right half of the outline glows coral; then the squares (helped) → L1 · item 4 (S) first-try · item 5 (S) taps the triangle-and-circle: the circle sits in the corner with coral all round it; then the fit (helped) · item 6 first-try · item 7 first-try → L2 · item 8 (S; rectangles shown lying flat) first-try: the rectangles stand up as they travel · Finish shows eight small made shapes.

## Rules
- Item count: 8.
- Difficulty progression: 2 consecutive first-try correct → next level (cap L3).
- Adaptation: any wrong tap on an item, or wrong first-try on 2 consecutive items → next item one level down (floor L1). The current item is never abandoned.
- What happens on a correct answer: `ANIM.pop`, `tone("correct")`, the pieces glide, grow and (if turned) turn to fit, the outline becomes solid, turtle `ANIM.nod`, praise rotation ["well_done", "great_job", "excellent", "you_did_it", "keep_going"], rail dot, next item after 900 ms.
- What happens on a wrong answer (per anticipated mistake):
  - Two small pieces of the right kind (S-c, R-c, R-e, S-d): `ANIM.nudge`, `tone("nudge")`, the pieces glide in, the uncovered part glows coral beneath them for 1000 ms, they glide back.
  - A round piece for a cornered space (S-e, S-g, T-e): nudge and tone; the circle sits inside and coral shows around it — corners uncovered.
  - Too big (S-f, R-f, T-d): nudge and tone; the part outside the outline is outlined in coral (`ART.overhangMark`) while any gap glows.
  - Turned fitting pair not recognised (the child taps another pair on a "turned" item): the standard cue for the tapped pair, and on the 2nd error the fitting pair's pieces `ANIM.hintTurn` on their tile.
- Retry behaviour: attempt 1 unaided → attempt 2 after the fit cue → attempt 3 with the show-me ring on the fitting tile; the ringed tile completes the item as solved-with-help. No attempt 4. An item completed after any wrong tap does not count as first-try.
- Finish condition: 8 items. No losing state; no clock.

## Strings
- `GameCore.t()` keys: `t("start")`, `t("all_done")`, `t("play_again")`, `t("menu")`, `t("well_done")`, `t("great_job")`, `t("excellent")`, `t("you_did_it")`, `t("keep_going")`.
- Game-specific (`STRINGS.en`, via `S(key)`): `title` = "Which Two Make It". No words on the play screen.

## Sound
`tone("correct")` on the fitting pair; `tone("tap", 1)` and `tone("tap", 3)` as the two pieces land; `tone("nudge")` on a non-fitting pair; `tone("finish")` once. Silent under `?sound=off`; no audio files. Nothing is spoken; the coral gap and overhang carry the meaning.

## Testing checklist
- [ ] Works in all 11 languages (Start, All done, Play again, Menu and praise change with the picker; the play screen has no words in any language).
- [ ] Works at narrow width (400-px iframe: turtle, outline and all three pair tiles fully visible; tiles remain separate targets).
- [ ] Keyboard operable (Tab cycles the three tiles; Enter picks; the outline and turtle are not focusable).
- [ ] Never auto-starts.
- [ ] No losing state (8 wrong taps in a row still reach All done via the show-me ring).
- [ ] Tapping the two triangles for the square makes them fly into the outline, meet along the diagonal, and the dashed outline turns solid.
- [ ] Tapping the two small squares makes them fly in and the bottom half of the square glows coral, then they fly back.
- [ ] Tapping the triangle-and-circle pair leaves coral showing all round the circle in its corner.
- [ ] At level 2 a fitting pair drawn lying flat on its tile stands up while it travels and fits.
- [ ] At level 3 a too-big pair shows a coral outline on the part that sticks out past the target.
- [ ] Every tile always shows exactly two pieces, all in the same colour.
- [ ] Two first-try corrects in a row bring the wide rectangle (then the triangle); a wrong tap brings the square again.
- [ ] The finish screen shows eight small shapes each made of two pieces and no score.
- [ ] With `?sound=off` nothing is audible.
