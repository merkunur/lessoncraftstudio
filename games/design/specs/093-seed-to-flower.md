# 093 — Seed to Flower

## Identity
- Slug: `seed-to-flower`
- Subject / topic: Science / the plant life cycle as an observable sequence — seed, sprout, plant, bud, flower, and seeds again
- Age band: `6-8`
- Interaction pattern: `P4` — tap in order (each tapped stage moves to the next slot of a growth wheel)
- Estimated build size: ~480 lines

Shared contract: `catalogue/BUILD-CONVENTIONS.md`. Pattern contract: `catalogue/PATTERNS.md` P4. Science scope per F-218 / A-11: the growth sequence a child can watch on a windowsill; nothing causal.

## Learning
- Objective: Orders the stages of a plant's life from seed to flower and back to seed by tapping the stage pictures in growth order onto a wheel.
- Prerequisites: Has seen a plant grow (game 092 is the natural predecessor); recognises pictures of a seed, a sprout and a flower. Reads nothing — the wheel's position numerals are the only text-like element.
- Curriculum links: F-23 (growth and life cycles in 10 of 12 systems before 9; DK/NO at 9-10 so the band is 6-8, the conservative common age — F-215), F-30, F-218, F-5. US 2-LS2 / K-LS1-1 (plants grow and change); England Y2 "seeds and bulbs grow into mature plants"; Germany Sachunterricht Klasse 2 "vom Samen zur Pflanze"; France CP-CE1 "cycle de vie des végétaux"; Spain 1º ciclo; Brazil EF02CI04 (ciclo de vida das plantas); Sweden åk 1-3 "växters livscykler"; Finland ympäristöoppi 1-2.
- Common misconceptions (F-132, F-129), each with this game's response:
  1. **Sequencing by how striking a stage looks — the flower is tapped first because it is the "main" picture (salience order, F-129).** Response: a stage tapped out of turn nudges and stays; then `ART.growArrow` draws from the last placed stage on the wheel to the correct NEXT stage among the loose tiles (`ANIM.arrowDraw`), and that tile does `ANIM.grow` (scale up from 0.8 to 1.0) — growth goes one step at a time, from small to bigger.
  2. **Thinking the cycle ends at the flower (no link back to the seed).** Response: L2 and L3 wheels include the seed-head / fruit stage; when the last slot fills, `ART.cycleArrow` draws from the last slot back around to slot 1 (`ANIM.cycleClose`) and a copy of the seed stage `ANIM.appear`s beside slot 1 — the wheel closes on itself. The first item of every session is L1 (seed → flower only) so the closing step is introduced once the linear order is secure.
  3. **A seed is "not a plant yet / not alive" (F-132 fruit, seeds, trees not plants).** Response: the seed is always slot 1 at L1 and L2 and the wheel's only pre-filled slot is never the seed at L3 (Content), so the child has to place the seed as a STAGE of the plant; when the seed is placed correctly a tiny `ART.sproutHint` (a small sprout) peeks from it for 600 ms (`ANIM.peek`).
  4. **Reversing two adjacent middle stages (sprout ↔ leafy plant, bud ↔ flower).** Response: standard out-of-turn nudge; on the second error on the same step the correct next tile gains `ART.hintRing` (`ANIM.showMe`); the wheel keeps every correct placement — nothing resets.

## How it plays
1. **Start screen**: title "Seed to Flower", the ladybird (`ART.ladybird`) at (360, 200), Start, picker.
2. **Item 1 (L1: sunflower, 4 stages)**: rail of 10 dots (§6) at y = 28; `t("question_x_of_y")` at (360, 48), 18 px `THEME.colour.inkSoft`. Zone A holds the growth wheel: `ART.wheel` (a large ring) centred at (360, 170), with 4 dashed slots (`ART.wheelSlot`, 80 × 80) on it at the clock positions 12, 3, 6, 9: (360, 92), (438, 170), (360, 248), (282, 170); each slot carries a small position numeral (`ART.posBadge` "1" … "4") at its top-right; slot 1 (12 o'clock) is outlined a little thicker (`ART.startMark`) so the child knows where the wheel begins. The ladybird sits at (90, 170). Zone B: the four loose stage tiles (`ART.stageTile`, 100 × 100) in a shuffled row at y = 380, x = 180 / 300 / 420 / 540: `ART.seed`, `ART.sprout`, `ART.leafy`, `ART.flower`. Zone C: the feedback line (22 px `THEME.colour.inkSoft`) at (360, 500), empty.
3. **Ordering**: the child taps the seed (correct first) → a copy glides (`ANIM.glide`) into slot 1, the original dims to alpha 0.35 and gains `ART.posBadge` "1", `tone("tap", 1)`, and the `ART.sproutHint` peeks from the placed seed for 600 ms. Then the sprout → slot 2 (`tone("tap", 2)`), the leafy plant → slot 3, the flower → slot 4.
   - **Item complete** (wheel full, every step first-try): `ART.cycleArrow` draws from the last slot around to slot 1 (`ANIM.cycleClose`) — at L1 it is drawn thin and grey (`THEME.colour.line`) as a foretaste; from L2 in `structure` colour with a seed copy `ANIM.appear`ing beside slot 1; the wheel `ANIM.pop`s, `tone("correct")`, praise pop (rotation), the ladybird `ANIM.bob`; rail dot fills; next item after 900 ms (`ANIM.rise` clears the wheel, new tiles `ANIM.appear`).
   - **Wrong tap (a stage that is not the correct next)**: `ANIM.nudge`, `tone("nudge")`; `ART.growArrow` draws from the last placed slot (or from the start mark if the wheel is empty) to the correct next tile in the row (`ANIM.arrowDraw`) and that tile `ANIM.grow`s; `t("look_carefully")` on the feedback line for 1200 ms. Attempt 2 on this step.
   - **Second wrong tap on the same step**: the arrow again, then the correct next tile gains `ART.hintRing` (`ANIM.showMe`); tapping it places it; the item is solved-with-help (no praise pop; the ladybird still bobs).
   - Tapping a filled wheel slot removes the LAST placed copy back to the row (undo, `ANIM.rise`; the original brightens and loses its badge). Tapping a dimmed (already placed) tile does nothing.
4. **Items 2-10**: per Content/Rules. L1 four stages (seed → sprout → leafy → flower). L2 five stages with the bud and the closing seed head (seed → sprout → leafy → bud → flower → seed head is six; L2 uses seed → sprout → leafy → flower → seed head, five slots at 12, 2:24, 4:48, 7:12, 9:36 o'clock). L3 six stages of a TREE (acorn → sprout → sapling → tree → blossom → apple) with slot 1 PRE-FILLED by a non-seed stage (Content), so the child continues the cycle from the middle and must place the acorn as a stage.
5. **A full worked session**: item 1 (L1) seed ✓ sprout ✓ leafy ✓ flower ✓ · item 2 (L1) flower tapped first ✗ → arrow from the start mark to the seed tile, the seed tile grows; seed ✓ sprout ✓ leafy ✓ flower ✓ (solved, not first-try) · item 3 (L1) ✓✓✓✓ · item 4 (L1) ✓✓✓✓ → step up · item 5 (L2) seed ✓ sprout ✓ flower ✗ (leafy skipped) → arrow to the leafy tile; leafy ✓ flower ✓ seed head ✓ → the cycle arrow closes the wheel and a seed appears by slot 1 · items 6-7 (L2) ✓ → step up · item 8 (L3, slot 1 pre-filled with the tree) blossom ✓ apple ✓ acorn ✓ sprout ✓ sapling ✓ → cycle closes · items 9-10 (L3) ✓ → Finish.
6. **Finish**: `t("all_done")` (360, 110); the ladybird (360, 200) `ANIM.celebrate`; the summary = ten small wheels (`ART.miniWheel`, r 22) in two rows of five (y = 340 and 400; x = 100 + i × 130) each with its stage emoji at size 14 around the ring in the order placed, a filled `ART.dotFull` at its left for a first-try item and a hollow `ART.dotEmpty` for a helped one; `play_again` (250, 510), `menu` (470, 510); `tone("finish")`.

Session ≈ 6 minutes.

## Art registry
```js
const ART = {
  ladybird:   { kind: "emoji", value: "🐞", size: 80 },
  wheel:      { kind: "shape", shape: "circle", r: 96, stroke: "structureSoft", strokeWidth: 14 },
  wheelSlot:  { kind: "shape", shape: "roundRect", w: 80, h: 80, fill: "surface2", stroke: "line", strokeWidth: 2, radius: 12 },     // dashed: lineDash [8,6]
  startMark:  { kind: "shape", shape: "roundRect", w: 88, h: 88, stroke: "structure", strokeWidth: 3, radius: 14 },                   // around slot 1
  posBadge:   { kind: "shape", shape: "circle", r: 12, fill: "accent" },                                                              // position numeral 14 px display inkOnAccent
  stageTile:  { kind: "shape", shape: "roundRect", w: 100, h: 100, fill: "surface", stroke: "line", strokeWidth: 2, radius: 14 },
  // sunflower stages (L1, L2)
  seed:       { kind: "shape", shape: "ellipse", w: 34, h: 52, fill: "inkSoft", stroke: "ink", strokeWidth: 2 },                      // a plain seed; tilted 20° when drawn
  sprout:     { kind: "emoji", value: "🌱", size: 60 },
  leafy:      { kind: "emoji", value: "🌿", size: 60 },
  bud:        { kind: "emoji", value: "🌷", size: 60 },                                                                                // a closed bud (L2 alternate sets)
  flower:     { kind: "emoji", value: "🌻", size: 60 },
  seedHead:   { kind: "emoji", value: "🌾", size: 60 },                                                                                // dried head full of seeds
  // tree stages (L3)
  acorn:      { kind: "emoji", value: "🌰", size: 60 },
  sapling:    { kind: "emoji", value: "🌿", size: 60 },
  tree:       { kind: "emoji", value: "🌳", size: 60 },
  blossom:    { kind: "emoji", value: "🌸", size: 60 },
  apple:      { kind: "emoji", value: "🍎", size: 60 },                                                                                // the fruit that carries the seed
  // cues
  sproutHint: { kind: "emoji", value: "🌱", size: 22 },
  growArrow:  { kind: "shape", shape: "line", w: 200, stroke: "accent", strokeWidth: 5 },                                              // from a slot to a tile; length/angle set at runtime; arrowhead = ART.arrowHead
  arrowHead:  { kind: "shape", shape: "polygon", points: [[0,0],[-14,-8],[-14,8]], fill: "accent" },
  cycleArrow: { kind: "shape", shape: "arc", r: 118, stroke: "structure", strokeWidth: 5 },                                            // from the last slot's angle round to slot 1; ends in ART.arrowHead
  hintRing:   { kind: "shape", shape: "roundRect", w: 112, h: 112, stroke: "structure", strokeWidth: 4, radius: 16 },
  miniWheel:  { kind: "shape", shape: "circle", r: 22, stroke: "structureSoft", strokeWidth: 5 },
  dotEmpty:   { kind: "shape", shape: "circle", r: 8, stroke: "line", strokeWidth: 2 },
  dotFull:    { kind: "shape", shape: "circle", r: 8, fill: "structure" }
};
```
No emoji newer than Unicode 12; no fallback needed. `ART.leafy` and `ART.sapling` share a glyph on purpose (a young leafy plant looks the same for a flower and a tree); they never appear on the same wheel. Colour-blind safety: stages differ by shape; slots by dashed stroke; the arrows are coral AND have arrowheads.

## Animation registry
```js
const ANIM = {
  glide:      { duration: 260, ease: "Sine.InOut", trigger: "a copy from a stage tile to the next wheel slot (x,y set at call)" },
  nudge:      { x: "+=10", duration: 80, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "a stage tapped out of turn" },
  arrowDraw:  { alpha: 1, scaleX: 1, duration: 320, ease: "Sine.Out", yoyo: true, hold: 1000, trigger: "growArrow + arrowHead from the last slot to the correct next tile (from alpha 0, scaleX 0.1 anchored at the slot), hold, then fade" },
  grow:       { scale: 1.0, duration: 320, ease: "Back.Out", trigger: "the correct next tile scales up from 0.8 during arrowDraw" },
  peek:       { y: "-=14", alpha: 1, duration: 300, ease: "Sine.Out", yoyo: true, hold: 300, trigger: "sproutHint rises out of the placed seed (from alpha 0), then sinks back" },
  cycleClose: { alpha: 1, duration: 600, ease: "Sine.InOut", trigger: "cycleArrow sweeps from the last slot to slot 1 (drawn progressively by angle), then arrowHead appears" },
  pop:        { scale: 1.06, duration: 140, ease: "Back.Out", yoyo: true, trigger: "the whole wheel when an item completes" },
  bob:        { y: "-=12", duration: 140, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "ladybird on item completion" },
  rise:       { y: "-=30", alpha: 0, duration: 260, ease: "Sine.In", trigger: "undo of the last slot; clearing the wheel before the next item" },
  appear:     { alpha: 1, scale: 1, duration: 200, ease: "Back.Out", trigger: "new tiles; the seed copy beside slot 1 (from alpha 0, scale 0.6)" },
  showMe:     { alpha: 1, duration: 500, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "hintRing on the correct next tile (from alpha 0.2)" },
  celebrate:  { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "finish ladybird" }
};
```

## Screen layout
```
y   0 ┌──────────────────────────────────────────────────────────────┐
      │ [lang]           ○ ○ ○ ○ ○ ○ ○ ○ ○ ○  rail y=28  "1 of 10" y=48 │  zone T
 56   ├──────────────────────────────────────────────────────────────┤
      │                        [slot 1] (360,92)                      │
      │   ladybird     [slot 4]    wheel     [slot 2]                 │  zone A
      │   (90,170)     (282,170)  (360,170)  (438,170)                │
      │                        [slot 3] (360,248)                     │
260   ├──────────────────────────────────────────────────────────────┤
      │    [ sprout ]  [ flower ]  [ seed ]  [ leafy ]   tiles y=380  │  zone B
      │     x=180       x=300      x=420     x=540      (100×100)     │
480   ├──────────────────────────────────────────────────────────────┤
      │              feedback line (360,500)                          │  zone C
560   └──────────────────────────────────────────────────────────────┘
```
Five-slot wheels (L2): slots at angles −90°, −18°, 54°, 126°, 198° on a radius of 88 from (360, 170): (360, 82), (444, 143), (412, 241), (308, 241), (276, 143); tiles at x = 152 / 256 / 360 / 464 / 568 (96 × 96). Six-slot wheels (L3): angles −90°, −30°, 30°, 90°, 150°, 210°: (360, 82), (436, 126), (436, 214), (360, 258), (284, 214), (284, 126); tiles at x = 105 / 207 / 309 / 411 / 513 / 615 (90 × 90, pitch 102, gap 12). Fixed layout, FIT scaling.

## Visual specification
- Background `THEME.colour.bg`; rail per §6: 10 × `ART.dotEmpty` at y = 28 (x = 261 + i × 22) → `ART.dotFull`; `t("question_x_of_y")` at (360, 48).
- `ART.ladybird` (90, 170); `ART.wheel` centred (360, 170); slots are `makeTile` (80 × 80, or 76 × 76 on six-slot wheels) with `ART.wheelSlot` tokens, dashed; `ART.startMark` around slot 1; `ART.posBadge` at each slot's (+30, −30) with the numeral 14 px `THEME.font.display` `THEME.colour.inkOnAccent`.
- Stage tiles: `makeTile` with `ART.stageTile` tokens; the stage art centred at size 60 (`ART.seed` is a shape drawn tilted 20°). A placed copy is drawn at scale 0.8 inside its slot; the original dims to alpha 0.35 with `ART.posBadge`.
- A pre-filled slot (L3) shows its stage copy with a solid `THEME.colour.structure` 2 px stroke and no badge; its tile is absent from the row.
- Cues: `ART.growArrow` + `ART.arrowHead` from the last filled slot's centre (or slot 1's centre when empty) to the correct tile's centre; `ART.cycleArrow` on radius 118 from the last slot's angle clockwise to slot 1's angle, ending in `ART.arrowHead`; `ART.sproutHint` at the placed seed's (0, −20); `ART.hintRing` behind a tile.
- Tap floors: tiles 90-100 (four-tile rows 100, five-tile rows 96, six-tile rows 90), slots 76-80 (≥ 56). Gaps ≥ 12 on every row (six-tile row: pitch 102 − 90 = 12).
- Tab order: stage tiles left to right, then the wheel slots clockwise from slot 1.
- During a cue (≈ 1.6 s) all tiles are `setEnabled(false)`.

## Content
Language-neutral (pictures and position numerals only). Each item = (stage order; pre-filled slot, if any). Stage words map to ART keys: seed `ART.seed`, sprout `ART.sprout`, leafy `ART.leafy`, bud `ART.bud`, flower `ART.flower`, seed head `ART.seedHead`, acorn `ART.acorn`, sapling `ART.sapling`, tree `ART.tree`, blossom `ART.blossom`, apple `ART.apple`.

- **L1** (4 stages, linear, seed first; cycle arrow drawn grey): (seed → sprout → leafy → flower) × 4 items with different tile shuffles — the same cycle four times is deliberate (F-41 spacing): items 1-4 of a session are all L1 unless the child steps up.
- **L2** (5 stages, the cycle closes): (seed → sprout → leafy → flower → seed head) · (seed → sprout → bud → flower → seed head) · (seed → sprout → leafy → bud → flower) · (seed → leafy → bud → flower → seed head)
- **L3** (6 tree stages; slot 1 pre-filled with the named stage, the child continues clockwise and the acorn must be placed as a stage): (acorn → sprout → sapling → tree → blossom → apple; pre-filled: tree) · (…; pre-filled: blossom) · (…; pre-filled: apple) · (…; pre-filled: sapling)

Play list of 10 per Rules; tile order shuffled per item; the correct first tile is never in the leftmost slot on two consecutive items.

## Rules
- Item count: 10.
- Difficulty progression: 2 consecutive items completed with no wrong tap → next level (cap L3).
- Adaptation: 2 wrong taps within one item, or a wrong tap in each of 2 consecutive items → next item one level down (floor L1).
- What happens on a correct answer: each correct tap glides a copy to the next slot with `tone("tap", k)` (k = slot number); the seed placement plays `ANIM.peek`; on the last tap `ANIM.cycleClose` (grey at L1, `structure` from L2 with a seed copy `ANIM.appear`ing beside slot 1), wheel `ANIM.pop`, `tone("correct")`, praise rotation ["well_done", "great_job", "excellent", "you_did_it", "keep_going"] (items with no wrong tap only), ladybird `ANIM.bob`, rail dot, next item after 900 ms.
- What happens on a wrong answer (each begins with `ANIM.nudge` + `tone("nudge")`):
  - The flower (or blossom/apple) tapped before its turn — salience order: `ART.growArrow` from the last slot to the correct next tile, `ANIM.grow` on that tile, `t("look_carefully")`.
  - A stage skipped (leafy tapped when the sprout is next): the same arrow + grow — the arrow's short length shows it is the NEXT step that is wanted.
  - The seed tapped last or skipped at L3 (the seed "is not a stage"): the arrow points at the acorn tile and it grows.
  - Tap on an already placed (dimmed) tile: nothing (not an attempt).
- Retry behaviour: per step — attempt 1 → attempt 2 after the arrow → attempt 3 with `ART.hintRing` on the correct next tile; the item is solved-with-help if any ring was used. Undo (tapping the last filled slot) is free and never counts. No attempt 4 on a step.
- Finish condition: 10 items. No losing state, no clock.

## Strings
- `GameCore.t()` keys: `t("start")`, `t("all_done")`, `t("play_again")`, `t("menu")`, `t("question_x_of_y")`, `t("look_carefully")`, `t("well_done")`, `t("great_job")`, `t("excellent")`, `t("you_did_it")`, `t("keep_going")`.
- Game-specific: `title` = "Seed to Flower". No other words on the play screen.

## Sound
`tone("tap", k)` on the k-th correct placement (the pitch climbs around the wheel); `tone("correct")` when the wheel closes; `tone("nudge")` on an out-of-turn tap; `tone("tap", 8)` when the cycle arrow reaches slot 1; `tone("finish")` once. Silent under `?sound=off`. Nothing is spoken.

## Testing checklist
- [ ] Works in all 11 languages ("Question 1 of 10", Look carefully, All done, Play again, Menu, praise change with the picker).
- [ ] Works at narrow width (400-px iframe: the wheel, six slots and a six-tile row fully visible with separate tiles).
- [ ] Keyboard operable (Tab: stage tiles left to right, then slots clockwise; Enter places / undoes).
- [ ] Never auto-starts.
- [ ] No losing state (any number of out-of-turn taps still fills the wheel; the hint ring appears on the second miss of a step).
- [ ] Tapping the flower first makes it wiggle and draws a coral arrow from the start mark to the seed tile, which grows slightly.
- [ ] Placing the seed makes a tiny sprout peek out of it for a moment.
- [ ] At the first level the closing arrow is thin and grey; from the second level it is teal and a seed appears beside slot 1 when the wheel closes.
- [ ] At the third level one slot is already filled with a tree stage and the acorn must be placed by the child.
- [ ] Tapping the last filled slot returns that stage to the row; tapping a dimmed tile does nothing.
- [ ] Two clean items in a row bring a five-slot wheel; two wrong taps in one item bring a four-slot wheel next.
- [ ] The finish screen shows ten small wheels with their stages in order and no score.
- [ ] With `?sound=off` nothing is audible.
