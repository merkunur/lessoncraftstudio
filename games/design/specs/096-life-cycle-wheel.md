# 096 — Life-Cycle Wheel

## Identity
- Slug: `life-cycle-wheel`
- Subject / topic: Science / animal life cycles as observable sequences — chicken, frog, butterfly — from egg to adult and back to egg
- Age band: `8-9`
- Interaction pattern: `P4` — tap in order (each tapped stage moves to the next slot of a cycle wheel)
- Estimated build size: ~520 lines

Shared contract: `catalogue/BUILD-CONVENTIONS.md`. Pattern contract: `catalogue/PATTERNS.md` P4. Science scope per F-218 / A-11: the order a child can observe in a tank or a jar; no genetics, no "metamorphosis" vocabulary — nothing is spoken and no science word appears on the play screen.

## Learning
- Objective: Orders the stages of an animal's life cycle (chicken, frog, butterfly) on a wheel from any starting stage, leaving out a stage that belongs to a different animal.
- Prerequisites: Has ordered a plant cycle (game 093); recognises an egg, a chick, a tadpole, a caterpillar from pictures. Reads the position numerals 1-6.
- Curriculum links: F-23 (life cycles in 10 of 12 systems; Denmark and Norway only at 9-10 → band 8-9, the conservative common age per F-215), F-30, F-218, F-5. US 3-LS1-1 "organisms have unique and diverse life cycles … birth, growth, reproduction, death"; England Y2/Y5 "offspring grow into adults; life cycles"; Germany Sachunterricht Klasse 3 "Entwicklung von Tieren"; France CE1-CE2 "cycles de vie des animaux"; Spain 2º ciclo; Brazil EF03CI (ciclos de vida); Sweden åk 1-3 "djurs livscykler"; Finland ympäristöoppi 3-4.
- Common misconceptions (F-133, F-129), each with this game's response:
  1. **The caterpillar and the butterfly are two different animals (and the tadpole and the frog).** Response: when a stage is placed correctly the previous slot's stage draws a short `ART.growArrow` to it (`ANIM.arrowDraw`) — the same creature, one step older; when the wheel closes, `ART.cycleArrow` sweeps from the adult back to the egg and a copy of the egg `ANIM.appear`s beside slot 1: the adult lays the egg the cycle started from.
  2. **The tadpole is "a fish" and does not belong to the frog (F-133: anything in water is a fish).** Response: L3 frog wheels include a real fish tile as an INTRUDER (`ART.intruderFish`); tapping it nudges it and `ART.crossArrow` (an arrow that bends away from the wheel) shows it does not join the cycle; tapping the tadpole in its turn places it, and the arrow from the eggs to the tadpole enacts that the tadpole came from the frog's eggs.
  3. **Sequencing by how striking a stage looks — the butterfly or the hen is tapped first (salience order, F-129).** Response: a stage tapped out of turn nudges; `ART.growArrow` draws from the last placed stage to the correct NEXT tile, which `ANIM.grow`s (0.8 → 1.0); `t("look_carefully")` on the feedback line.
  4. **Believing a cycle has a fixed start and cannot begin at the adult.** Response: at L3 slot 1 is pre-filled with a NON-egg stage (the hen, the frog, the butterfly) and the child continues clockwise; the egg is placed as a stage in the middle of the wheel, and the closing arrow still returns to slot 1.

## How it plays
1. **Start screen**: title "Life-Cycle Wheel", the lizard (`ART.lizard`) at (360, 200), Start, picker.
2. **Item 1 (L1: chicken, 4 stages)**: rail of 10 dots (§6) at y = 28; `t("question_x_of_y")` at (360, 48), 18 px `THEME.colour.inkSoft`. Zone A: the wheel — `ART.wheel` centred at (360, 170) with 4 dashed slots (`ART.wheelSlot`, 76 × 76) at 12, 3, 6 and 9 o'clock: (360, 92), (438, 170), (360, 248), (282, 170); each slot has `ART.posBadge` "1" … "4" at its top-right; slot 1 is ringed by `ART.startMark`. The lizard sits at (90, 170). Zone B: the four loose stage tiles (`ART.stageTile`, 96 × 96) in a shuffled row at y = 380, x = 180 / 300 / 420 / 540: `ART.egg`, `ART.hatching`, `ART.chick`, `ART.hen`. Zone C: the feedback line (22 px `THEME.colour.inkSoft`) at (360, 500), empty.
3. **Ordering**: the child taps the egg (correct first) → a copy glides (`ANIM.glide`) into slot 1; the original dims to alpha 0.35 and gains `ART.posBadge` "1"; `tone("tap", 1)`. Then the hatching egg → slot 2 with `ART.growArrow` drawn briefly from slot 1 to slot 2 (`ANIM.arrowDraw`, 500 ms) and `tone("tap", 2)`; the chick → slot 3; the hen → slot 4.
   - **Item complete** (wheel full, every step first-try): `ART.cycleArrow` sweeps from the last slot round to slot 1 (`ANIM.cycleClose`) ending in `ART.arrowHead`, an egg copy `ANIM.appear`s beside slot 1 at (400, 60), just outside the wheel; the wheel `ANIM.pop`s, `tone("correct")`, praise pop (rotation), the lizard `ANIM.bob`; rail dot fills; next item after 900 ms (`ANIM.rise` clears the wheel, new tiles `ANIM.appear`).
   - **Wrong tap (a stage out of turn)**: `ANIM.nudge`, `tone("nudge")`; `ART.growArrow` + `ART.arrowHead` draw from the last filled slot (or from slot 1's centre when the wheel is empty) to the correct next tile in the row (`ANIM.arrowDraw`), which `ANIM.grow`s; `t("look_carefully")` for 1200 ms. Attempt 2 on this step.
   - **Intruder tapped (L3)**: `ANIM.nudge`, `tone("nudge")`; `ART.crossArrow` draws from the wheel's centre toward the intruder and bends away off the wheel (`ANIM.crossDraw`) — it is not part of this cycle; the tile stays where it is (it is never placed). Counts as a wrong tap on the current step.
   - **Second wrong tap on the same step**: the arrow again, then the correct next tile gains `ART.hintRing` (`ANIM.showMe`); tapping it places it; the item is solved-with-help.
   - Tapping a filled slot removes the LAST placed copy back to the row (undo, `ANIM.rise`). A pre-filled slot (L3) cannot be undone. Tapping a dimmed tile does nothing.
4. **Items 2-10**: per Content/Rules. L1 chicken (4 stages). L2 frog (5 stages: eggs → tadpole → tadpole with legs → froglet → frog) and butterfly (5 stages: egg → caterpillar → chrysalis → butterfly → eggs on a leaf), five slots at −90°, −18°, 54°, 126°, 198° on radius 88. L3: the same two cycles with slot 1 pre-filled by the adult and ONE intruder tile from another animal in the row (six tiles: five stages, one of them already on the wheel, plus the intruder — so five loose tiles).
5. **A full worked session**: item 1 (L1) egg ✓ hatching ✓ chick ✓ hen ✓ → cycle closes, an egg appears by slot 1 · item 2 (L1) hen tapped first ✗ → arrow from slot 1 to the egg tile; egg ✓ hatching ✓ chick ✓ hen ✓ · item 3 (L1) ✓ · item 4 (L1) ✓ → step up · item 5 (L2 frog) eggs ✓ tadpole ✓ frog ✗ (skipped two) → arrow to the tadpole-with-legs tile; ✓ froglet ✓ frog ✓ · item 6 (L2 butterfly) ✓✓✓✓✓ · item 7 (L2 frog) ✓ → step up · item 8 (L3 frog, slot 1 = frog, intruder = fish) eggs ✓ fish ✗ → the bending arrow; tadpole ✓ tadpole-with-legs ✓ froglet ✓ → closes · item 9 (L3 butterfly, slot 1 = butterfly, intruder = tadpole) ✓ · item 10 (L3 chicken, slot 1 = chick, intruder = caterpillar) ✓ → Finish.
6. **Finish**: `t("all_done")` (360, 110); the lizard (360, 200) `ANIM.celebrate`; the summary = ten small wheels (`ART.miniWheel`, r 22) in two rows of five (y = 340 and 400; x = 100 + i × 130) each with its stages at size 14 around the ring in the order placed, `ART.dotFull` at its left for a first-try item and `ART.dotEmpty` for a helped one; `t("question_x_of_y")` with n = first-try items, total 10, at (360, 460); `play_again` (250, 510), `menu` (470, 510); `tone("finish")`.

Session ≈ 6-7 minutes.

## Art registry
```js
const ART = {
  lizard:      { kind: "emoji", value: "🦎", size: 80 },                          // Unicode 9
  wheel:       { kind: "shape", shape: "circle", r: 96, stroke: "structureSoft", strokeWidth: 14 },
  wheelSlot:   { kind: "shape", shape: "roundRect", w: 76, h: 76, fill: "surface2", stroke: "line", strokeWidth: 2, radius: 12 },   // dashed: lineDash [8,6]
  startMark:   { kind: "shape", shape: "roundRect", w: 84, h: 84, stroke: "structure", strokeWidth: 3, radius: 14 },
  posBadge:    { kind: "shape", shape: "circle", r: 12, fill: "accent" },                                                            // numeral 14 px display inkOnAccent
  stageTile:   { kind: "shape", shape: "roundRect", w: 96, h: 96, fill: "surface", stroke: "line", strokeWidth: 2, radius: 14 },
  // chicken
  egg:         { kind: "emoji", value: "🥚", size: 56 },
  hatching:    { kind: "emoji", value: "🐣", size: 56 },
  chick:       { kind: "emoji", value: "🐤", size: 56 },
  hen:         { kind: "emoji", value: "🐔", size: 56 },
  // frog (the early stages have no emoji — drawn shapes)
  frogEggs:    { kind: "shape", shape: "circle", r: 9, fill: "surface2", stroke: "ink", strokeWidth: 2 },                            // drawn 5× in a cluster: (0,0),(−16,−8),(16,−8),(−10,12),(12,12); each with ART.eggDot at its centre
  eggDot:      { kind: "shape", shape: "circle", r: 3, fill: "ink" },
  tadpole:     { kind: "shape", shape: "ellipse", w: 30, h: 22, fill: "ink" },                                                       // head; ART.tadTail drawn behind it
  tadTail:     { kind: "shape", shape: "polygon", points: [[0,-4],[26,-10],[34,0],[26,10],[0,4]], fill: "ink" },                      // tail to the right of the head
  tadLeg:      { kind: "shape", shape: "line", w: 14, stroke: "ink", strokeWidth: 3 },                                              // two back legs at (−4,10) and (4,10), angled down-out — the "tadpole with legs" stage = tadpole + tadTail + 2× tadLeg
  froglet:     { kind: "emoji", value: "🐸", size: 40 },                                                                             // small frog with ART.tadTail (scale 0.6) behind it
  frog:        { kind: "emoji", value: "🐸", size: 56 },
  // butterfly
  bfEgg:       { kind: "shape", shape: "ellipse", w: 18, h: 22, fill: "surface2", stroke: "ink", strokeWidth: 2 },                   // one egg on a leaf: drawn on ART.leaf
  leaf:        { kind: "emoji", value: "🍃", size: 48 },
  caterpillar: { kind: "emoji", value: "🐛", size: 56 },
  chrysalis:   { kind: "shape", shape: "polygon", points: [[0,-26],[12,-14],[12,12],[0,26],[-12,12],[-12,-14]], fill: "structureSoft", stroke: "ink", strokeWidth: 2 },   // hangs from ART.thread
  thread:      { kind: "shape", shape: "line", w: 16, stroke: "ink", strokeWidth: 2 },                                               // vertical, above the chrysalis
  butterfly:   { kind: "emoji", value: "🦋", size: 56 },                                                                             // Unicode 9
  // intruders (L3)
  intruderFish:{ kind: "emoji", value: "🐟", size: 56 },
  // cues
  growArrow:   { kind: "shape", shape: "line", w: 200, stroke: "accent", strokeWidth: 5 },                                          // length/angle set at runtime
  arrowHead:   { kind: "shape", shape: "polygon", points: [[0,0],[-14,-8],[-14,8]], fill: "accent" },
  crossArrow:  { kind: "shape", shape: "polygon", points: [[0,0],[40,0],[40,-6],[60,6],[40,18],[40,12],[0,12]], fill: "inkSoft" },   // a bent arrow pointing off the wheel; rotated toward the intruder
  cycleArrow:  { kind: "shape", shape: "arc", r: 118, stroke: "structure", strokeWidth: 5 },
  hintRing:    { kind: "shape", shape: "roundRect", w: 108, h: 108, stroke: "structure", strokeWidth: 4, radius: 16 },
  miniWheel:   { kind: "shape", shape: "circle", r: 22, stroke: "structureSoft", strokeWidth: 5 },
  dotEmpty:    { kind: "shape", shape: "circle", r: 8, stroke: "line", strokeWidth: 2 },
  dotFull:     { kind: "shape", shape: "circle", r: 8, fill: "structure" }
};
```
No emoji newer than Unicode 12; no fallback needed. Stage pictures with no emoji (frog eggs, tadpole, tadpole with legs, chrysalis, butterfly egg) are drawn shapes composed as the comments say, so the art upgrade replaces each with one SVG entry. Colour-blind safety: stages differ by shape and size; slots by dashed stroke; arrows are coral (or grey for the bent one) AND carry heads.

## Animation registry
```js
const ANIM = {
  glide:      { duration: 260, ease: "Sine.InOut", trigger: "a copy from a stage tile to the next wheel slot (x,y set at call)" },
  nudge:      { x: "+=10", duration: 80, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "a stage tapped out of turn; the intruder" },
  arrowDraw:  { alpha: 1, scaleX: 1, duration: 320, ease: "Sine.Out", yoyo: true, hold: 1000, trigger: "growArrow + arrowHead (from alpha 0, scaleX 0.1 anchored at the start), hold, then fade; on a correct placement hold = 500" },
  grow:       { scale: 1.0, duration: 320, ease: "Back.Out", trigger: "the correct next tile scales up from 0.8 during arrowDraw" },
  crossDraw:  { alpha: 1, scale: 1, duration: 320, ease: "Back.Out", yoyo: true, hold: 900, trigger: "crossArrow from the wheel centre toward the intruder (from alpha 0, scale 0.4), hold, fade" },
  cycleClose: { alpha: 1, duration: 600, ease: "Sine.InOut", trigger: "cycleArrow sweeps from the last slot to slot 1 (drawn progressively by angle), then arrowHead appears" },
  pop:        { scale: 1.06, duration: 140, ease: "Back.Out", yoyo: true, trigger: "the whole wheel when an item completes" },
  bob:        { y: "-=12", duration: 140, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "lizard on item completion" },
  rise:       { y: "-=30", alpha: 0, duration: 260, ease: "Sine.In", trigger: "undo of the last slot; clearing the wheel before the next item" },
  appear:     { alpha: 1, scale: 1, duration: 200, ease: "Back.Out", trigger: "new tiles; the egg copy beside slot 1 (from alpha 0, scale 0.6)" },
  showMe:     { alpha: 1, duration: 500, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "hintRing on the correct next tile (from alpha 0.2)" },
  celebrate:  { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "finish lizard" }
};
```

## Screen layout
```
y   0 ┌──────────────────────────────────────────────────────────────┐
      │ [lang]           ○ ○ ○ ○ ○ ○ ○ ○ ○ ○  rail y=28  "1 of 10" y=48 │  zone T
 56   ├──────────────────────────────────────────────────────────────┤
      │                        [slot 1] (360,92)      egg copy (400,60)│
      │   lizard       [slot 4]    wheel     [slot 2]                 │  zone A
      │   (90,170)     (282,170)  (360,170)  (438,170)                │
      │                        [slot 3] (360,248)                     │
260   ├──────────────────────────────────────────────────────────────┤
      │    [ chick ]  [ hen ]  [ egg ]  [ hatching ]     tiles y=380  │  zone B
      │     x=180     x=300    x=420     x=540          (96×96)       │
480   ├──────────────────────────────────────────────────────────────┤
      │              feedback line (360,500)                          │  zone C
560   └──────────────────────────────────────────────────────────────┘
```
Five-slot wheels (L2, L3): slots at angles −90°, −18°, 54°, 126°, 198° on radius 88 from (360, 170): (360, 82), (444, 143), (412, 241), (308, 241), (276, 143); five loose tiles at x = 152 / 256 / 360 / 464 / 568 (96 × 96). L3 rows also hold five loose tiles (four remaining stages + the intruder) at the same positions. Fixed layout, FIT scaling.

## Visual specification
- Background `THEME.colour.bg`; rail per §6: 10 × `ART.dotEmpty` at y = 28 (x = 261 + i × 22) → `ART.dotFull`; `t("question_x_of_y")` at (360, 48).
- `ART.lizard` (90, 170); `ART.wheel` centred (360, 170); slots are `makeTile` 76 × 76 with `ART.wheelSlot` tokens, dashed; `ART.startMark` around slot 1; `ART.posBadge` at each slot's (+28, −28) with the numeral 14 px `THEME.font.display` `THEME.colour.inkOnAccent`.
- Stage tiles: `makeTile` 96 × 96 with `ART.stageTile` tokens; the stage art centred at size 56 (composed shapes as listed in the registry: frog eggs = 5 × `ART.frogEggs` + `ART.eggDot`; tadpole = `ART.tadpole` + `ART.tadTail`; tadpole with legs = the same + 2 × `ART.tadLeg`; froglet = `ART.froglet` + `ART.tadTail` at scale 0.6; butterfly egg = `ART.bfEgg` on `ART.leaf`; chrysalis = `ART.chrysalis` under `ART.thread`; eggs on a leaf = 3 × `ART.bfEgg` on `ART.leaf`). A placed copy is drawn at scale 0.75 inside its slot; the original dims to alpha 0.35 with `ART.posBadge`.
- A pre-filled slot (L3) shows its stage copy with a solid `THEME.colour.structure` 2 px stroke and no badge; its tile is absent from the row. The intruder tile looks exactly like a stage tile (nothing marks it).
- Cues: `ART.growArrow` + `ART.arrowHead` from the last filled slot's centre to the correct tile's centre (or, on a correct placement, from the previous slot to the new one); `ART.crossArrow` at the wheel centre rotated toward the intruder; `ART.cycleArrow` on radius 118 from the last slot's angle clockwise to slot 1's angle, ending in `ART.arrowHead`; `ART.hintRing` behind a tile.
- Tap floors: tiles 96, slots 76 (≥ 56). Gaps ≥ 8 at five tiles (pitch 104), ≥ 24 at four.
- Tab order: stage tiles left to right, then the wheel slots clockwise from slot 1.
- During a cue (≈ 1.6 s) all tiles are `setEnabled(false)`.

## Content
Language-neutral (pictures and position numerals only). Each item = (animal; stage order; pre-filled slot; intruder). Stage words map to ART compositions: egg `ART.egg`, hatching `ART.hatching`, chick `ART.chick`, hen `ART.hen`; eggs (frog) `ART.frogEggs`, tadpole `ART.tadpole`, legs (tadpole with legs) `ART.tadLeg`, froglet `ART.froglet`, frog `ART.frog`; egg-on-leaf `ART.bfEgg`, caterpillar `ART.caterpillar`, chrysalis `ART.chrysalis`, butterfly `ART.butterfly`, eggs-on-leaf (3 × `ART.bfEgg`); intruders: fish `ART.intruderFish`, tadpole, caterpillar, chick.

- **L1** (chicken, 4 stages, egg first, no intruder): (chicken; egg → hatching → chick → hen) × 4 items with different tile shuffles (deliberate repetition, F-41).
- **L2** (5 stages, egg first, no intruder): (frog; eggs → tadpole → legs → froglet → frog) · (butterfly; egg-on-leaf → caterpillar → chrysalis → butterfly → eggs-on-leaf) · (frog; …) · (butterfly; …) — each cycle twice.
- **L3** (5 stages; slot 1 pre-filled with the named stage; one intruder tile from another animal): (frog; pre-filled frog; intruder fish) · (butterfly; pre-filled butterfly; intruder tadpole) · (chicken 5-stage: egg → hatching → chick → young hen (`ART.chick` at size 48) → hen; pre-filled chick; intruder caterpillar) · (frog; pre-filled froglet; intruder fish) · (butterfly; pre-filled caterpillar; intruder chick)

Play list of 10 per Rules; tile order shuffled per item; the correct first tile is never in the leftmost slot on two consecutive items; the intruder is never in the leftmost or rightmost slot.

## Rules
- Item count: 10.
- Difficulty progression: 2 consecutive items completed with no wrong tap → next level (cap L3).
- Adaptation: 2 wrong taps within one item, or a wrong tap in each of 2 consecutive items → next item one level down (floor L1).
- What happens on a correct answer: each correct tap glides a copy to the next slot with `tone("tap", k)` and a 500 ms `ART.growArrow` from the previous slot; on the last tap `ANIM.cycleClose` with an egg copy `ANIM.appear`ing beside slot 1, wheel `ANIM.pop`, `tone("correct")`, praise rotation ["well_done", "great_job", "excellent", "you_did_it", "keep_going"] (items with no wrong tap only), lizard `ANIM.bob`, rail dot, next item after 900 ms.
- What happens on a wrong answer (each begins with `ANIM.nudge` + `tone("nudge")`):
  - The adult (hen, frog, butterfly) tapped before its turn — salience order: `ART.growArrow` from the last slot to the correct next tile, `ANIM.grow` on it, `t("look_carefully")`.
  - A stage skipped (froglet tapped when the tadpole is next): the same arrow + grow.
  - The intruder tapped (fish among frog stages; tadpole among butterfly stages; caterpillar or chick among the others): `ART.crossArrow` `ANIM.crossDraw`s from the wheel centre toward it and bends off the wheel; the tile is never placed; `t("look_carefully")`.
  - Tap on an already placed (dimmed) tile or the pre-filled slot: nothing (not an attempt).
- Retry behaviour: per step — attempt 1 → attempt 2 after the arrow → attempt 3 with `ART.hintRing` on the correct next tile; the item is solved-with-help if any ring was used. Undo (tapping the last filled slot) is free and never counts. No attempt 4 on a step.
- Finish condition: 10 items. No losing state, no clock.

## Strings
- `GameCore.t()` keys: `t("start")`, `t("all_done")`, `t("play_again")`, `t("menu")`, `t("question_x_of_y")`, `t("look_carefully")`, `t("well_done")`, `t("great_job")`, `t("excellent")`, `t("you_did_it")`, `t("keep_going")`.
- Game-specific: `title` = "Life-Cycle Wheel". No other words on the play screen.

## Sound
`tone("tap", k)` on the k-th correct placement (the pitch climbs around the wheel); `tone("correct")` when the wheel closes; `tone("nudge")` on an out-of-turn tap or the intruder; `tone("tap", 8)` when the cycle arrow reaches slot 1; `tone("finish")` once. Silent under `?sound=off`. Nothing is spoken.

## Testing checklist
- [ ] Works in all 11 languages ("Question 1 of 10", Look carefully, All done, Play again, Menu, praise change with the picker).
- [ ] Works at narrow width (400-px iframe: the wheel, five slots and a five-tile row fully visible with separate tiles).
- [ ] Keyboard operable (Tab: stage tiles left to right, then slots clockwise; Enter places / undoes).
- [ ] Never auto-starts.
- [ ] No losing state (any number of out-of-turn taps still fills the wheel; the hint ring appears on the second miss of a step).
- [ ] Tapping the hen first wiggles it and draws a coral arrow from slot 1 to the egg tile, which grows slightly.
- [ ] Each correct placement briefly draws an arrow from the previous slot to the new one.
- [ ] When the wheel closes a teal arrow sweeps from the last stage back to slot 1 and an egg appears beside slot 1.
- [ ] Frog eggs, the tadpole, the tadpole with legs and the chrysalis are drawn shapes that read as those stages at 56 px.
- [ ] At the third level slot 1 is already filled with an adult or a middle stage, and tapping the fish among the frog stages draws a grey bent arrow pointing off the wheel; the fish is never placed.
- [ ] Tapping the last filled slot returns that stage to the row; the pre-filled slot cannot be removed.
- [ ] Two clean items in a row bring the frog and butterfly wheels; two wrong taps in one item bring the chicken wheel next.
- [ ] The finish screen shows ten small wheels with their stages in order and "Question n of 10" where n counts first-try items — no score word.
- [ ] With `?sound=off` nothing is audible.
