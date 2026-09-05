# 168 — Tooth Care

## Identity
- Slug: `tooth-care-order`
- Subject / topic: Science / hygiene routines in order — the steps of brushing teeth, from paste on the brush to the brush back in its cup
- Age band: `5-6`
- Interaction pattern: `P4` — tap in order (each tapped step moves to the next slot of a rail; per-tap judgement)
- Estimated build size: ~440 lines

Shared contract: `catalogue/BUILD-CONVENTIONS.md`. Pattern contract: `catalogue/PATTERNS.md` P4. Science scope per F-218 / A-11: a daily routine as an observable sequence; no words, no reasons, no germs. Every step is a picture built from the registry; the routine enacts itself on a mouth at the top as the child orders it.

## Learning
- Objective: Orders the steps of brushing teeth (paste on the brush → brush the teeth → rinse the mouth → rinse the brush → brush back in the cup) by tapping the step pictures in order onto a rail, leaving out a picture that is not a step.
- Prerequisites: None beyond tapping; has brushed teeth. Nothing is read (the rail's position numerals are the only text-like element) and nothing is spoken.
- Curriculum links: F-23 (human body and health — hygiene routines — in all 12 systems at 5-8), F-30, F-218, F-5 (no game supply). US Health K-1 personal hygiene / K-LS1-1 (what people need); England EYFS "managing self — personal hygiene" and Y2 "importance of hygiene"; Germany HSU Klasse 1-2 "Zahnpflege"; France GS-CP "hygiène corporelle"; Spain Conocimiento del Medio 1º "hábitos de higiene"; Brazil EF01CI (hábitos de higiene); Netherlands groep 1-3 "zelfzorg"; Sweden förskoleklass-åk 1 "hälsa och hygien"; Finland esiopetus "terveys ja hygienia". Sequencing itself: F-129 (retell and sequence by 8; salience order).
- Common misconceptions (F-129, F-23), each with this game's response:
  1. **Sequencing by the most striking picture — the brushing picture is tapped first because it is "the" tooth-brushing picture (salience order).** Response: a step tapped out of turn nudges and stays; then `ART.nextArrow` draws from the last filled slot (or the rail's start mark when empty) to the correct NEXT tile in the row (`ANIM.arrowDraw`) and that tile does `ANIM.grow` — the routine goes one step at a time, from the paste.
  2. **"Rinse" and "put away" swapped — the brush goes back in the cup still foamy.** Response: L2 introduces the rinse step; when the put-away tile is tapped before the rinse, the arrow points to the rinse tile and, on the mouth stage, the brush beside the mouth keeps its `ART.pasteBlob` foam (`ANIM.pulse` on the blob) — it still needs rinsing.
  3. **A non-step is included (a sweet, a teddy, a ball) because it was in the row.** Response: at L3 one tile in the row is not a step; tapping it makes it nudge and dim to alpha 0.35 (`ANIM.dimOut`) — it takes no slot and the rail is unchanged; on the second error the correct next tile gets the hint ring.
  4. **Reversing two adjacent middle steps (rinse the mouth ↔ rinse the brush).** Response: standard out-of-turn nudge; on the second error on the same step the correct tile gains `ART.hintRing` (`ANIM.showMe`); the rail keeps every correct placement — nothing resets.

## How it plays
1. **Start screen**: title "Tooth Care", the big grin (`ART.mouth` at size 96) at (360, 200) with `ART.tooth` beside it at (440, 170), Start, picker.
2. **Item 1 (L1: 3 steps)**: rail of 8 dots (§6) at y = 28 — one per item. Zone A: the mouth stage — `ART.mouth` at (360, 130) with `ART.brushStage` (a brush drawn beside the mouth at (450, 150), tilted 30°) and `ART.cupStage` (a cup at (560, 160)); to the left, `ART.tubeStage` at (250, 160). Under the stage the rail: three dashed slots (`ART.railSlot`, 80 × 80) at y = 232, x = 260 / 360 / 460, each with a small position numeral (`ART.posBadge` "1" … "3") at its top-right; slot 1 has a thicker outline (`ART.startMark`). Zone B: the three loose step tiles (`ART.stepTile`, 110 × 110) in a shuffled row at y = 380, x = 240 / 360 / 480: `paste` (tube + brush + blob), `brush` (small mouth + brush), `away` (cup with the brush in it). No caption.
3. **Ordering**: the child taps the paste tile (correct first) → a copy glides (`ANIM.glide`) into slot 1, the original dims to alpha 0.35 and gains `ART.posBadge` "1", `tone("tap", 1)`, and on the stage `ART.pasteBlob` `ANIM.appear`s on the stage brush's bristles. Then the brush tile → slot 2 and the stage brush `ANIM.scrub`s over the mouth three times (`tone("tap", 2)`); then the away tile → slot 3 and the stage brush glides into the stage cup (`ANIM.glide`), standing upright.
   - **Item complete** (rail full, every step first-try): `ART.sparkle` `ANIM.shine`s at the mouth's corner, `tone("correct")`, praise pop (rotation), the mouth `ANIM.bob`; rail dot fills; next item after 900 ms (`ANIM.rise` clears the rail, new tiles `ANIM.appear`, the stage resets).
   - **Wrong tap (a step that is not the correct next)**: `ANIM.nudge`, `tone("nudge")`; `ART.nextArrow` draws from the last filled slot (or from the start mark) to the correct next tile (`ANIM.arrowDraw`) and that tile `ANIM.grow`s. Attempt 2 on this step.
   - **Second wrong tap on the same step**: the arrow again, then the correct next tile gains `ART.hintRing` (`ANIM.showMe`); tapping it places it; the item is solved-with-help (no praise pop; the mouth still bobs).
   - **A non-step tile (L3) tapped**: `ANIM.nudge`, `tone("nudge")`, `ANIM.dimOut`; counts as a wrong tap for the current step.
   - Tapping a filled rail slot removes the LAST placed copy back to the row (undo, `ANIM.rise`; the original brightens; the stage undoes that step). Tapping a dimmed (already placed) tile does nothing.
4. **Items 2-8**: per Content/Rules. L1 three steps (paste → brush → away). L2 four steps (paste → brush → rinse mouth → away; slots at x = 210 / 310 / 410 / 510). L3 five steps (paste → brush → rinse mouth → rinse brush → away; slots 76 × 76 at x = 168 / 264 / 360 / 456 / 552) plus ONE non-step tile in the row (six tiles of 96 at x = 90 / 198 / 306 / 414 / 522 / 630).
5. **A full worked session**: item 1 (L1) paste ✓ brush ✓ away ✓ · item 2 (L1) brush tapped first ✗ → arrow from the start mark to the paste tile, which grows; paste ✓ brush ✓ away ✓ (solved, not first-try) · item 3 (L1) ✓✓✓ · item 4 (L1) ✓✓✓ → step up · item 5 (L2) paste ✓ brush ✓ away ✗ (rinse skipped; the stage brush's foam pulses) → arrow to the rinse tile; rinse ✓ away ✓ · item 6 (L2) ✓ · item 7 (L2) ✓ → step up · item 8 (L3, with a sweet in the row) paste ✓ brush ✓ sweet ✗ (nudges, dims) rinse mouth ✓ rinse brush ✓ away ✓ → Finish.
6. **Finish**: `t("all_done")` (360, 110); the mouth (360, 200) at size 120 with `ART.sparkle` `ANIM.shine` and `ANIM.celebrate`; the summary = eight small rails (`ART.miniRail`, 120 × 26) in two rows of four (y = 340 and 400; x = 150 + i × 140) each showing its step pictures at size 18 in the order placed, with a filled `ART.dotFull` at its left for a first-try item and a hollow `ART.dotEmpty` for a helped one; `play_again` (250, 510), `menu` (470, 510); `tone("finish")`.

Session ≈ 5 minutes.

## Art registry
```js
const ART = {
  mouth:      { kind: "emoji", value: "😁", size: 96 },                                                               // the grinning mouth on the stage
  mouthSmall: { kind: "emoji", value: "😁", size: 40 },                                                               // inside step pictures
  tooth:      { kind: "emoji", value: "🦷", size: 40, fallback: "😁" },                                               // Unicode 11 → grin; decorates the start screen title
  sparkle:    { kind: "emoji", value: "✨", size: 40 },
  // drawn brush, tube, cup, water (no toothbrush emoji before Unicode 13, so these are shapes)
  brush:      { kind: "shape", shape: "roundRect", w: 70, h: 12, fill: "structure", radius: 6 },                       // handle; ART.bristles sits at its right end
  bristles:   { kind: "shape", shape: "rect", w: 22, h: 18, fill: "surface", stroke: "structure", strokeWidth: 2 },
  pasteBlob:  { kind: "shape", shape: "ellipse", w: 26, h: 14, fill: "structureSoft", stroke: "structure", strokeWidth: 2 },
  tube:       { kind: "shape", shape: "roundRect", w: 54, h: 22, fill: "accent", stroke: "ink", strokeWidth: 2, radius: 6 },   // ART.tubeCap at its right end
  tubeCap:    { kind: "shape", shape: "rect", w: 10, h: 14, fill: "ink" },
  cup:        { kind: "shape", shape: "polygon", points: [[-22,-26],[22,-26],[18,26],[-18,26]], fill: "surface2", stroke: "structure", strokeWidth: 3 },
  tap:        { kind: "emoji", value: "🚰", size: 44 },                                                               // running water
  waterDrop:  { kind: "emoji", value: "💧", size: 20 },
  bubble:     { kind: "shape", shape: "circle", r: 6, stroke: "structure", strokeWidth: 2 },
  // stage-only copies (same shapes, positioned on the mouth stage)
  brushStage: { kind: "shape", shape: "roundRect", w: 90, h: 14, fill: "structure", radius: 7 },                       // with a 28 × 22 ART.bristles at its right end
  cupStage:   { kind: "shape", shape: "polygon", points: [[-28,-34],[28,-34],[23,34],[-23,34]], fill: "surface2", stroke: "structure", strokeWidth: 3 },
  tubeStage:  { kind: "shape", shape: "roundRect", w: 70, h: 28, fill: "accent", stroke: "ink", strokeWidth: 2, radius: 8 },
  // non-steps (L3 distractors)
  sweet:      { kind: "emoji", value: "🍬", size: 60 },
  teddy:      { kind: "emoji", value: "🧸", size: 60 },                                                               // Unicode 11
  ball:       { kind: "emoji", value: "⚽", size: 60 },
  // rail and tiles
  stepTile:   { kind: "shape", shape: "roundRect", w: 110, h: 110, fill: "surface", stroke: "line", strokeWidth: 2, radius: 14 },
  railSlot:   { kind: "shape", shape: "roundRect", w: 80, h: 80, fill: "surface2", stroke: "line", strokeWidth: 2, radius: 12 },   // dashed: lineDash [8,6]
  startMark:  { kind: "shape", shape: "roundRect", w: 88, h: 88, stroke: "structure", strokeWidth: 3, radius: 14 },
  posBadge:   { kind: "shape", shape: "circle", r: 12, fill: "accent" },                                              // numeral 14 px display inkOnAccent
  // cues
  nextArrow:  { kind: "shape", shape: "line", w: 200, stroke: "accent", strokeWidth: 5 },                              // slot → tile; length/angle at runtime; ends in ART.arrowHead
  arrowHead:  { kind: "shape", shape: "polygon", points: [[0,0],[-14,-8],[-14,8]], fill: "accent" },
  hintRing:   { kind: "shape", shape: "roundRect", w: 122, h: 122, stroke: "structure", strokeWidth: 4, radius: 18 },
  miniRail:   { kind: "shape", shape: "roundRect", w: 120, h: 26, fill: "surface2", stroke: "line", strokeWidth: 2, radius: 8 },
  dotEmpty:   { kind: "shape", shape: "circle", r: 8, stroke: "line", strokeWidth: 2 },
  dotFull:    { kind: "shape", shape: "circle", r: 8, fill: "structure" }
};
```
Step pictures are composites of these entries (Content lists each). The only glyph newer than Unicode 12 is the tooth (decoration only) with a grin fallback. Colour-blind safety: steps differ by the objects in them (tube / mouth / tap / cup), never by colour; slots by dashed stroke; the arrow is a shape with a head; foam is a blob with an outline.

## Animation registry
```js
const ANIM = {
  glide:     { duration: 260, ease: "Sine.InOut", trigger: "a copy from a step tile to the next rail slot; the stage brush into the stage cup (x,y at call)" },
  nudge:     { x: "+=10", duration: 80, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "a step tapped out of turn; a non-step tapped" },
  dimOut:    { alpha: 0.35, duration: 300, ease: "Sine.In", trigger: "a non-step tile after its nudge; it stays dim for the rest of the item" },
  arrowDraw: { alpha: 1, scaleX: 1, duration: 320, ease: "Sine.Out", yoyo: true, hold: 1000, trigger: "nextArrow + arrowHead from the last slot to the correct next tile (from alpha 0, scaleX 0.1 anchored at the slot), hold, then fade" },
  grow:      { scale: 1.0, duration: 320, ease: "Back.Out", trigger: "the correct next tile scales up from 0.8 during arrowDraw" },
  appear:    { alpha: 1, scale: 1, duration: 200, ease: "Back.Out", trigger: "new tiles; the pasteBlob on the stage brush; water drops (from alpha 0, scale 0.6)" },
  scrub:     { x: "+=26", duration: 160, ease: "Sine.InOut", yoyo: true, repeat: 2, trigger: "the stage brush moves across the mouth three times when the brush step is placed" },
  rinse:     { y: "-=40", alpha: 0, duration: 500, ease: "Sine.Out", trigger: "three bubbles rise from the mouth (from alpha 1) when the rinse-mouth step is placed; two waterDrops fall onto the stage brush (y: +=40) when the rinse-brush step is placed" },
  pulse:     { scale: 1.2, duration: 300, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "the pasteBlob on the stage brush when put-away is tapped before rinsing" },
  shine:     { alpha: 1, scale: 1.2, duration: 300, ease: "Back.Out", yoyo: true, hold: 600, trigger: "sparkle at the mouth's corner on item complete (from alpha 0, scale 0.6)" },
  bob:       { y: "-=12", duration: 140, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "the mouth on item completion" },
  rise:      { y: "-=30", alpha: 0, duration: 260, ease: "Sine.In", trigger: "undo of the last slot; clearing the rail before the next item" },
  showMe:    { alpha: 1, duration: 500, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "hintRing on the correct next tile (from alpha 0.2)" },
  celebrate: { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "finish mouth" }
};
```

## Screen layout
```
y   0 ┌──────────────────────────────────────────────────────────────┐
      │ [lang]              ○ ○ ○ ○ ○ ○ ○ ○  rail y=28                 │  zone T
 56   ├──────────────────────────────────────────────────────────────┤
      │      tube(250,160)     MOUTH (360,130)   brush(450,150)  cup(560,160)│  zone A
      │                                                              │
      │              [slot 1]   [slot 2]   [slot 3]   rail y=232     │
      │               x=260      x=360      x=460    (80×80)         │
260   ├──────────────────────────────────────────────────────────────┤
      │          [ brush ]     [ away ]     [ paste ]   tiles y=380  │  zone B
      │           x=240         x=360        x=480     (110×110)     │
480   ├──────────────────────────────────────────────────────────────┤
      │                                                              │  zone C
560   └──────────────────────────────────────────────────────────────┘
```
Four-slot rails (L2): slots at x = 210 / 310 / 410 / 510; four tiles (100 × 100) at x = 180 / 300 / 420 / 540. Five-slot rails (L3): slots 76 × 76 at x = 168 / 264 / 360 / 456 / 552; six tiles (96 × 96, pitch 108) at x = 90 / 198 / 306 / 414 / 522 / 630. Fixed layout, FIT scaling.

## Visual specification
- Background `THEME.colour.bg`; rail per §6: 8 × `ART.dotEmpty` at y = 28 (x = 283 + i × 22) → `ART.dotFull`.
- Stage: `ART.mouth` (360, 130); `ART.tubeStage` (250, 160) with `ART.tubeCap` at its right end; `ART.brushStage` centred (450, 150) rotated 30° with `ART.bristles` (28 × 22) at its right end and `ART.pasteBlob` on the bristles when placed; `ART.cupStage` (560, 160). Bubbles (`ART.bubble` × 3) start at (330, 160), (360, 150), (390, 160); water drops start at (450, 110).
- Rail slots: `makeTile` with `ART.railSlot` tokens (80 × 80, or 76 × 76 at L3), dashed; `ART.startMark` around slot 1; `ART.posBadge` at each slot's (+30, −30) with the numeral 14 px `THEME.font.display` `THEME.colour.inkOnAccent`.
- Step tiles: `makeTile` with `ART.stepTile` tokens; the step picture centred (Content gives each composite). A placed copy is drawn at scale 0.7 inside its slot; the original dims to alpha 0.35 with `ART.posBadge`.
- Cues: `ART.nextArrow` + `ART.arrowHead` from the last filled slot's centre (or slot 1's centre when empty) to the correct tile's centre; `ART.hintRing` behind a tile.
- Tap floors: tiles 96-110, slots 76-80 (≥ 80 for tiles; slots are targets only for undo, and the 76-px L3 slots are padded to an 80-px hit area by `makeTile` hitArea). Gaps ≥ 12 on every row.
- Tab order: step tiles left to right, then the rail slots left to right.
- During a cue (≈ 1.6 s) all tiles are `setEnabled(false)`.

## Content
Language-neutral (pictures and position numerals only). Step pictures (composites, centred in the tile): `paste` = `ART.tube` + `ART.tubeCap` at (−20, −24) above `ART.brush` + `ART.bristles` at (0, 12) with `ART.pasteBlob` on the bristles; `brush` = `ART.mouthSmall` at (−16, 0) with `ART.brush` + `ART.bristles` at (18, 14) tilted 30°; `rinseMouth` = `ART.mouthSmall` at (0, 6) with three `ART.bubble`s above it at (−18, −26), (0, −34), (18, −26); `rinseBrush` = `ART.tap` at (0, −18) with `ART.brush` + `ART.bristles` under it at (0, 24) and one `ART.waterDrop` at (10, 4); `away` = `ART.cup` at (0, 10) with `ART.brush` + `ART.bristles` standing upright inside it (rotated 90°, handle down). Non-steps: `ART.sweet`, `ART.teddy`, `ART.ball`.

- **L1** (3 steps): (paste → brush → away) × 4 items with different tile shuffles — the same routine four times is deliberate (F-41 spacing).
- **L2** (4 steps): (paste → brush → rinseMouth → away) × 4 items, different shuffles.
- **L3** (5 steps + one non-step in the row): (paste → brush → rinseMouth → rinseBrush → away; non-step `ART.sweet`) · (…; `ART.teddy`) · (…; `ART.ball`) · (…; `ART.sweet`)

Play list of 8 per Rules; tile order shuffled per item; the correct first tile is never in the leftmost slot on two consecutive items; a non-step tile is never leftmost.

## Rules
- Item count: 8.
- Difficulty progression: 2 consecutive items completed with no wrong tap → next level (cap L3).
- Adaptation: 2 wrong taps within one item, or a wrong tap in each of 2 consecutive items → next item one level down (floor L1).
- What happens on a correct answer: each correct tap glides a copy to the next slot with `tone("tap", k)` (k = slot number) and enacts the step on the stage (paste: blob `ANIM.appear`; brush: `ANIM.scrub`; rinse mouth: bubbles `ANIM.rinse`; rinse brush: drops `ANIM.rinse` and the blob is removed; away: the stage brush `ANIM.glide`s into the cup); on the last tap `ART.sparkle` `ANIM.shine`, `tone("correct")`, praise rotation ["well_done", "great_job", "excellent", "you_did_it", "keep_going"] (items with no wrong tap only), mouth `ANIM.bob`, rail dot, next item after 900 ms.
- What happens on a wrong answer (each begins with `ANIM.nudge` + `tone("nudge")`):
  - The brushing picture tapped before the paste (salience order): `ART.nextArrow` from the start mark to the paste tile, `ANIM.grow` on it.
  - Put-away tapped before a rinse step: the arrow to the rinse tile; the stage brush's `ART.pasteBlob` `ANIM.pulse`s — still foamy.
  - A non-step (sweet, teddy, ball) tapped: `ANIM.dimOut` on it; no slot is used; the arrow to the correct next tile.
  - Two adjacent steps reversed (rinse mouth ↔ rinse brush): the arrow to the correct next tile.
  - Tap on an already placed (dimmed) tile: nothing (not an attempt).
- Retry behaviour: per step — attempt 1 → attempt 2 after the arrow → attempt 3 with `ART.hintRing` on the correct next tile; the item is solved-with-help if any ring was used. Undo (tapping the last filled slot) is free and never counts. No attempt 4 on a step.
- Finish condition: 8 items. No losing state, no clock; brushing time is never measured (BUILD-CONVENTIONS §8).

## Strings
- `GameCore.t()` keys: `t("start")`, `t("all_done")`, `t("play_again")`, `t("menu")`, `t("well_done")`, `t("great_job")`, `t("excellent")`, `t("you_did_it")`, `t("keep_going")`.
- Game-specific: `title` = "Tooth Care". No other words on the play screen.

## Sound
`tone("tap", k)` on the k-th correct placement (the pitch climbs along the rail); `tone("correct")` when the rail completes; `tone("nudge")` on an out-of-turn or non-step tap; `tone("tap", 6)` when the sparkle appears; `tone("finish")` once. Silent under `?sound=off`. Nothing is spoken.

## Testing checklist
- [ ] Works in all 11 languages (All done, Play again, Menu, praise change with the picker; the play screen has no words).
- [ ] Works at narrow width (400-px iframe: the mouth stage, a five-slot rail and a six-tile row fully visible with separate tiles).
- [ ] Keyboard operable (Tab: step tiles left to right, then rail slots; Enter places / undoes).
- [ ] Never auto-starts.
- [ ] No losing state (any number of out-of-turn taps still fills the rail; the hint ring appears on the second miss of a step).
- [ ] Tapping the brushing picture first makes it wiggle and draws a coral arrow from the start mark to the paste tile, which grows slightly.
- [ ] Placing the paste step puts a blob of paste on the stage brush; placing the brush step moves that brush across the mouth three times.
- [ ] At the second level, tapping put-away before rinse makes the foam on the stage brush pulse and the arrow point at the rinse tile.
- [ ] At the third level one tile in the row is a sweet, teddy or ball; tapping it makes it wiggle and fade, and no slot is used.
- [ ] Placing the last step makes the stage brush glide into the cup and a sparkle appear at the mouth.
- [ ] Tapping the last filled slot returns that step to the row; tapping a dimmed tile does nothing.
- [ ] Two clean items in a row bring a longer rail; two wrong taps in one item bring a shorter rail next.
- [ ] The finish screen shows eight small rails with their steps in order and no score.
- [ ] With `?sound=off` nothing is audible.
