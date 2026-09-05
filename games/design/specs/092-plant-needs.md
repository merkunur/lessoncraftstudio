# 092 — Plant Needs

## Identity
- Slug: `plant-needs`
- Subject / topic: Science / what a plant needs to live — sunlight, water and air (soil is where it stands, not what it eats)
- Age band: `5-6`
- Interaction pattern: `P2` — tap to place (select a tray item, then a slot by the plant)
- Estimated build size: ~460 lines

Shared contract: `catalogue/BUILD-CONVENTIONS.md`. Pattern contract: `catalogue/PATTERNS.md` P2. Science scope per F-218 / A-11: observational needs only — no photosynthesis, no words for it.

## Learning
- Objective: Gives a wilting plant exactly the three things it needs — sunlight, water and air — from a tray of six, leaving the things a plant does not need (sweets, a hat, a ball, juice) in the tray.
- Prerequisites: None beyond tapping. The wilting plant is the whole prompt; the tray is discoverable by tapping (a wrong item simply glides back). Nothing is spoken and nothing is read.
- Curriculum links: F-23 (needs of plants — water, food, light — in all 12 systems at 5-8), F-30 (science lives inside world-knowledge subjects at 5-8), F-218 (observational core), F-5 (no game supply for this topic). US K-LS1-1 "plants need water and light to live and grow"; England Y1/Y2 "what plants need to grow"; Germany Sachunterricht Klasse 1-2 "Was Pflanzen brauchen"; France CP "besoins des végétaux"; Spain Conocimiento del Medio 1º; Brazil EF02CI (seres vivos — necessidades); Sweden åk 1-3 "växters livsvillkor"; Finland ympäristöoppi 1-2.
- Common misconceptions (F-132, F-131), each with this game's response:
  1. **"Plants eat food like we do" (a plant is given an apple, a sweet, a pizza).** Response: food placed by the plant glides back to the tray; the tray's sun `ANIM.pulse`s and three `ART.ray` lines reach from the sun to the plant's leaf (`ANIM.rays`), and the leaf `ANIM.glowLeaf` — the plant makes what it needs from light. No word for it; the picture is the whole hint.
  2. **"Plants drink anything wet" (juice, milk).** Response: a juice box placed by the plant glides back; the tray's water drop pulses and a copy of the drop falls onto the soil (`ANIM.drip`) — it is WATER that goes into the soil.
  3. **"Plants get their food from the soil" (soil is treated as the meal).** Response: the pot always shows soil (`ART.soil`) as the place the plant STANDS; soil is never a tray item, so the child never "feeds" soil to the plant. When the plant perks up on the third correct need, the roots (`ART.roots`) show gripping the soil — the soil holds the plant.
  4. **Objects that make the CHILD happy (a teddy, a hat, a ball) are offered to the plant.** Response: the object glides back, no cue beyond the standard nudge; on the second wrong placement of the item the three empty slots pulse in turn (`ANIM.pulse`), showing there are exactly three things to find.

## How it plays
1. **Start screen**: title "Plant Needs", the bee (`ART.bee`) at (360, 200), Start, picker.
2. **Round 1 (L1)**: rail of 8 dots (§6) at y = 28 — one per round. Zone A: a pot (`ART.pot`) at (360, 220) with soil (`ART.soil`) in its top and the wilting plant (`ART.plantWilt`) standing in it at (360, 150); the bee hovers at (150, 130). Three empty slots (`ART.slot`, 88 × 88, dashed) in a row at y = 100, x = 470 / 570 / 670 — the plant's "needs shelf". Zone B: a tray of four tiles (`ART.trayTile`, 96 × 96) at y = 380, x = 180 / 300 / 420 / 540, holding `ART.sun`, `ART.water`, `ART.air`, `ART.sweet` in shuffled order. No caption.
3. **Placing**: tap a tray item (it lifts: `api.setSelected(true)`, `ANIM.lift`, `tone("tap")`), then tap an empty slot; the item glides (`ANIM.glide`) into the slot. Tapping a second tray item before a slot switches the selection. Tapping a placed item sends it back to the tray (undo, no sound but `tone("tap")`). A full slot refuses (the arriving item springs back with `ANIM.nudge`, no message).
   - **A need placed (sun, water or air)**: `tone("correct")`; the plant perks up one step — after the first need `ART.plantWilt` is replaced by `ART.plantMid` (`ANIM.perk`), after the second by `ART.plantUp`, after the third by `ART.plantBloom` with `ANIM.bloom`; the item stays on the shelf and does its own small motion (sun: `ANIM.rays`; water: `ANIM.drip` onto the soil; air: `ANIM.breeze`, the leaves sway). Round complete when all three needs are on the shelf: `ART.roots` appear in the soil, praise pop, rail dot fills, next round after 900 ms.
   - **A non-need placed (a sweet, a hat, an apple, juice …)**: the item glides back to the tray, `tone("nudge")`, then the cue for that item's class (Rules); attempt 2 on this item. The needs already on the shelf stay.
   - **The same non-need placed a second time, or a second different non-need**: the cue, then the three slots pulse in turn; the plant keeps whatever it has. On the third wrong placement in a round, the remaining need(s) in the tray gain the show-me ring (`ART.showRing`, `ANIM.showMe`); placing them completes the round as solved-with-help.
4. **A full worked session**: round 1 (L1: sun, water, air, sweet) — sun ✓ (plant lifts a little), sweet ✗ (glides back; rays from the sun to the leaf), water ✓, air ✓ → bloom, roots, praise · round 2 (L1: sun, water, air, hat) ✓✓✓ → step up · round 3 (L2, six tiles: sun, water, air, ball, teddy, pizza) — pizza ✗ (rays cue), then ✓✓✓ · round 4 (L2) ✓✓✓ · round 5 (L2) ✓✓✓ → step up · round 6 (L3: sun, water, air, apple, juice, chocolate) — juice ✗ (a drop falls onto the soil), apple ✗ (rays cue; slots pulse in turn), then ✓✓✓ (solved after two wrong placements → step down) · round 7 (L2) ✓✓✓ · round 8 (L2) ✓✓✓ → Finish.
5. **Finish**: `t("all_done")` (360, 110); the bee (360, 200) `ANIM.celebrate`; the summary = eight blooming plants (`ART.plantBloom` at size 44) in a row at y = 400 (x = 360 − 3.5 × 76 + i × 76), one per round, each standing in a small pot (`ART.miniPot`) — the garden the child grew; `play_again` (250, 510), `menu` (470, 510); `tone("finish")`.

Session ≈ 5 minutes.

## Art registry
```js
const ART = {
  bee:        { kind: "emoji", value: "🐝", size: 72 },
  pot:        { kind: "shape", shape: "polygon", points: [[-70,-40],[70,-40],[56,60],[-56,60]], fill: "structureSoft", stroke: "structure", strokeWidth: 3 },
  soil:       { kind: "shape", shape: "roundRect", w: 128, h: 28, fill: "inkSoft", radius: 8 },       // sits in the pot's top
  roots:      { kind: "shape", shape: "polygon", points: [[0,0],[-30,26],[-12,14],[0,30],[12,14],[30,26]], stroke: "surface", strokeWidth: 3 },   // white root lines drawn on the soil
  plantWilt:  { kind: "emoji", value: "🥀", size: 96 },                                               // Unicode 9
  plantMid:   { kind: "emoji", value: "🌱", size: 96 },
  plantUp:    { kind: "emoji", value: "🌿", size: 96 },
  plantBloom: { kind: "emoji", value: "🌷", size: 96 },
  slot:       { kind: "shape", shape: "roundRect", w: 88, h: 88, fill: "surface2", stroke: "line", strokeWidth: 2, radius: 12 },   // dashed: lineDash [8,6]
  trayTile:   { kind: "shape", shape: "roundRect", w: 96, h: 96, fill: "surface", stroke: "line", strokeWidth: 2, radius: 12 },
  // needs
  sun:        { kind: "emoji", value: "☀️", size: 60 },
  water:      { kind: "emoji", value: "💧", size: 60 },
  air:        { kind: "emoji", value: "💨", size: 60 },
  // not needs
  sweet:      { kind: "emoji", value: "🍬", size: 60 },
  hat:        { kind: "emoji", value: "🎩", size: 60 },
  ball:       { kind: "emoji", value: "⚽", size: 60 },
  teddy:      { kind: "emoji", value: "🧸", size: 60 },                                              // Unicode 11
  pizza:      { kind: "emoji", value: "🍕", size: 60 },
  tv:         { kind: "emoji", value: "📺", size: 60 },
  apple:      { kind: "emoji", value: "🍎", size: 60 },
  juice:      { kind: "emoji", value: "🧃", size: 60 },                                              // Unicode 11
  chocolate:  { kind: "emoji", value: "🍫", size: 60 },
  shoe:       { kind: "emoji", value: "👟", size: 60 },
  // cues
  ray:        { kind: "shape", shape: "line", w: 120, stroke: "accent", strokeWidth: 4 },            // from the tray sun to the leaf; length set at runtime
  leafGlow:   { kind: "shape", shape: "circle", r: 40, fill: "accent" },                             // drawn at 25% alpha behind the plant's leaves
  showRing:   { kind: "shape", shape: "roundRect", w: 108, h: 108, stroke: "structure", strokeWidth: 4, radius: 16 },
  miniPot:    { kind: "shape", shape: "polygon", points: [[-22,-10],[22,-10],[17,20],[-17,20]], fill: "structureSoft", stroke: "structure", strokeWidth: 2 },
  dotEmpty:   { kind: "shape", shape: "circle", r: 8, stroke: "line", strokeWidth: 2 },
  dotFull:    { kind: "shape", shape: "circle", r: 8, fill: "structure" }
};
```
Every emoji names an unambiguous object (sun, drop of water, puff of air, sweet, top hat …). No entry is newer than Unicode 12, so no fallback is needed. Colour-blind safety: the four plant stages differ by shape (drooping / sprout / leaves / flower), not by colour; slots differ from tray tiles by the dashed stroke.

## Animation registry
```js
const ANIM = {
  lift:      { y: "-=8", scale: 1.06, duration: 120, ease: "Sine.Out", trigger: "tray item selected" },
  glide:     { duration: 260, ease: "Sine.InOut", trigger: "item to slot / back to tray (x,y set at call)" },
  nudge:     { x: "+=10", duration: 80, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "refused placement (slot full)" },
  perk:      { y: "-=10", scale: 1.08, duration: 260, ease: "Back.Out", yoyo: true, trigger: "plant stage swap after a need is placed" },
  bloom:     { scale: 1.2, duration: 300, ease: "Back.Out", yoyo: true, trigger: "plantBloom appears on the third need" },
  rays:      { alpha: 1, scaleX: 1, duration: 300, ease: "Sine.Out", yoyo: true, hold: 900, trigger: "three ray lines from the sun to the leaf (from alpha 0, scaleX 0.1 anchored at the sun)" },
  glowLeaf:  { alpha: 0.25, duration: 300, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "leafGlow behind the plant during the rays cue (from alpha 0)" },
  drip:      { y: "+=90", alpha: 0, duration: 600, ease: "Sine.In", trigger: "a copy of the water drop falls from the shelf/tray onto the soil (from alpha 1)" },
  breeze:    { angle: 6, duration: 220, ease: "Sine.InOut", yoyo: true, repeat: 2, trigger: "the plant sways when air is placed" },
  pulse:     { scale: 1.15, duration: 300, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "tray sun / tray water during a cue; the three slots in turn (300 ms apart) on a second wrong placement" },
  showMe:    { alpha: 1, duration: 500, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "showRing on each remaining need in the tray (from alpha 0.2)" },
  appear:    { alpha: 1, scale: 1, duration: 200, ease: "Back.Out", trigger: "new round's plant and tray (from alpha 0, scale 0.6)" },
  celebrate: { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "finish bee" }
};
```

## Screen layout
```
y   0 ┌──────────────────────────────────────────────────────────────┐
      │ [lang]              ○ ○ ○ ○ ○ ○ ○ ○  rail y=28                 │  zone T
 56   ├──────────────────────────────────────────────────────────────┤
      │                                 [slot] [slot] [slot]  y=100   │
      │   bee(150,130)      plant(360,150)   x=470/570/670 (88×88)    │  zone A
      │                     ┌─ pot (360,220) ─┐                        │
      │                     │   soil (360,190) │                        │
260   ├──────────────────────────────────────────────────────────────┤
      │    [ sun ]   [ drop ]   [ air ]   [ sweet ]     tray y=380     │  zone B
      │    x=180      x=300     x=420     x=540         (96×96)        │
480   ├──────────────────────────────────────────────────────────────┤
      │                                                              │  zone C
560   └──────────────────────────────────────────────────────────────┘
```
Six-tile trays (L2, L3): six tiles of 96 at pitch 108, x = 90 / 198 / 306 / 414 / 522 / 630, y = 380. Fixed layout, FIT scaling.

## Visual specification
- Background `THEME.colour.bg`; rail per §6: 8 × `ART.dotEmpty` at y = 28 (x = 283 + i × 22) → `ART.dotFull` per completed round.
- `ART.bee` at (150, 130). `ART.pot` centred (360, 220); `ART.soil` centred (360, 190) drawn after the pot; `ART.roots` centred (360, 196) drawn on the soil only when the round completes.
- The plant: one of `ART.plantWilt` / `ART.plantMid` / `ART.plantUp` / `ART.plantBloom` centred (360, 150), swapped by stage; `ART.leafGlow` behind it at (360, 140) during the rays cue.
- Slots: `makeTile` 88 × 88 with `ART.slot` tokens at (470, 100), (570, 100), (670, 100), stroke drawn dashed (graphics lineDash [8, 6]); a filled slot shows the item's emoji at size 60 and a solid `THEME.colour.structure` 3 px stroke.
- Tray: `makeTile` 96 × 96 with `ART.trayTile` tokens; the item emoji centred at size 60. Four tiles at x = 180 / 300 / 420 / 540 (L1); six at x = 90 / 198 / 306 / 414 / 522 / 630 (L2, L3), all at y = 380.
- Cues: three `ART.ray` lines from the tray sun's centre to (360, 130), fanned ±12°; `ART.showRing` behind each remaining need tile.
- Tap floors: tray 96, slots 88 (≥ 80). Gaps ≥ 12 (six-tile tray pitch 108 → gap 12).
- Tab order: tray tiles left to right, then the three slots left to right.
- While a cue plays (≈ 1.2 s) the tray and slots are `setEnabled(false)`.

## Content
Language-neutral (pictures only). Every round has exactly the three needs `ART.sun`, `ART.water`, `ART.air` plus the listed non-needs; tray order shuffled per round; the three needs are never all in the first three tray positions.

- **L1** (four tiles: the three needs + one obvious non-need): (+ `ART.sweet`) · (+ `ART.hat`) · (+ `ART.ball`) · (+ `ART.shoe`)
- **L2** (six tiles: the three needs + three non-needs, at most one of them food): (+ `ART.ball`, `ART.teddy`, `ART.pizza`) · (+ `ART.hat`, `ART.tv`, `ART.sweet`) · (+ `ART.shoe`, `ART.teddy`, `ART.chocolate`) · (+ `ART.ball`, `ART.tv`, `ART.apple`)
- **L3** (six tiles: the three needs + three near-miss non-needs — foods and a drink): (+ `ART.apple`, `ART.juice`, `ART.chocolate`) · (+ `ART.pizza`, `ART.juice`, `ART.sweet`) · (+ `ART.apple`, `ART.juice`, `ART.teddy`) · (+ `ART.chocolate`, `ART.juice`, `ART.pizza`)

Non-need classes for the cue: `food` = sweet, pizza, apple, chocolate; `drink` = juice; `object` = hat, ball, teddy, tv, shoe. Play list of 8 rounds per Rules; no round repeats within a session.

## Rules
- Item count: 8 rounds, each = 3 placements (24 placements ≈ 5 minutes).
- Difficulty progression: 2 consecutive rounds completed with no wrong placement → next level (cap L3).
- Adaptation: 2 wrong placements within one round, or a wrong placement in each of 2 consecutive rounds → next round one level down (floor L1).
- What happens on a correct answer: `tone("correct")`, the plant swaps to its next stage with `ANIM.perk` (third need: `ANIM.bloom`), the placed item plays its own motion (sun `ANIM.rays`, water `ANIM.drip`, air `ANIM.breeze`); on the third need `ART.roots` appear, praise pop (rotation ["well_done", "great_job", "excellent", "you_did_it", "keep_going"], rounds with no wrong placement only), rail dot fills, next round after 900 ms.
- What happens on a wrong answer (each begins with the item gliding back to the tray and `tone("nudge")`):
  - A food (sweet, pizza, apple, chocolate) placed — "plants eat food": the tray sun `ANIM.pulse`s, `ART.ray` lines reach the leaf (`ANIM.rays`), `ART.leafGlow` `ANIM.glowLeaf`.
  - A drink (juice) placed — "any liquid will do": the tray water `ANIM.pulse`s and a copy of `ART.water` `ANIM.drip`s onto the soil.
  - An object (hat, ball, teddy, tv, shoe) placed: no extra cue on the first wrong placement; on the second wrong placement in the round (any item) the three slots `ANIM.pulse` in turn.
  - A need placed into a full slot: refused, `ANIM.nudge`, no attempt counted.
- Retry behaviour: per round — wrong placement 1 → its cue → wrong placement 2 → cue + slots pulse → wrong placement 3 → `ART.showRing` on every remaining need; the round completes as solved-with-help. Undo (tapping a placed item) is free.
- Finish condition: 8 rounds complete. No losing state, no clock.

## Strings
- `GameCore.t()` keys: `t("start")`, `t("all_done")`, `t("play_again")`, `t("menu")`, `t("well_done")`, `t("great_job")`, `t("excellent")`, `t("you_did_it")`, `t("keep_going")`.
- Game-specific: `title` = "Plant Needs". No words on the play screen.

## Sound
`tone("tap")` on selecting an item or undoing; `tone("correct")` on each need placed; `tone("nudge")` on a non-need; `tone("tap", 6)` when the plant blooms; `tone("finish")` once. Silent under `?sound=off`. Nothing is spoken.

## Testing checklist
- [ ] Works in all 11 languages (All done, Play again, Menu, praise change with the picker; the play screen has no words).
- [ ] Works at narrow width (400-px iframe: pot, plant, three slots and a six-tile tray fully visible).
- [ ] Keyboard operable (Tab: tray tiles left to right, then the slots; Enter selects / places / undoes).
- [ ] Never auto-starts.
- [ ] No losing state (any number of wrong placements still ends in a blooming plant; the show-me ring appears on the third).
- [ ] The wilting plant stands up a step for each of sun, water, air, and blooms on the third with roots showing in the soil.
- [ ] Placing the sweet makes it glide back and draws three lines from the sun to the leaf.
- [ ] Placing the juice makes it glide back and a drop falls onto the soil.
- [ ] Placing the hat glides back with no extra cue; a second wrong item makes the three slots pulse one after another.
- [ ] Tapping a placed item returns it to the tray; a full slot refuses a second item.
- [ ] Soil is always drawn in the pot and never appears as a tray item.
- [ ] Two clean rounds in a row bring a six-tile tray; two wrong placements in a round bring a four-tile tray next.
- [ ] The finish screen shows eight small blooming plants in pots and no score.
- [ ] With `?sound=off` nothing is audible.
