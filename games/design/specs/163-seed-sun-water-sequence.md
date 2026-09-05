# 163 — Grow a Bean

## Identity
- Slug: `seed-sun-water-sequence`
- Subject / topic: Science / growth needs over time — a bean changes a little every day when it gets water and light, and droops on a day it is given neither
- Age band: `5-6`
- Interaction pattern: `P2` — tap to place (select a tray item, then a slot by the pot); a moon tile ends each day
- Estimated build size: ~480 lines

Shared contract: `catalogue/BUILD-CONVENTIONS.md`. Pattern contract: `catalogue/PATTERNS.md` P2. Science scope per F-218 / A-11: needs and the visible change they produce day by day; no photosynthesis, no words for it. Game 092 teaches WHICH things a plant needs on one screen; this game adds TIME — five days, one change per day, and a diary of the change. The two are a deliberate pair (F-41 spacing across games).

## Learning
- Objective: Grows a bean from seed to pods over five days by giving it water and light each day, ending each day with the moon tile, and watching the plant change one stage per day (a day with a need missing produces a droop, not growth).
- Prerequisites: None beyond tapping. The seed in the pot and the tray are the whole prompt; the moon tile is discoverable (tapping it before the needs are placed shows the droop and points at the missing need). Nothing is read; nothing is spoken.
- Curriculum links: F-23 (needs of plants — water, light — and growth, in all 12 systems at 5-8), F-132 (plant misconceptions), F-30, F-218, F-5. US K-LS1-1 "plants need water and light to live and grow" / 2-LS2-1; England Y1-Y2 "observe and describe how seeds grow into plants; what plants need to grow and stay healthy"; Germany Sachunterricht Klasse 1-2 "Pflanzen wachsen — Bohne im Glas"; France GS-CP "les besoins des végétaux; observer une germination"; Spain Conocimiento del Medio 1º; Brazil EF02CI05 (plantas — necessidades e crescimento); Sweden åk 1-3 "växters livsvillkor"; Finland ympäristöoppi 1-2 "kasvin kasvun seuraaminen".
- Common misconceptions (F-132, F-131), each with this game's response:
  1. **"A plant grows on its own once it is planted" — the moon is tapped with the slots empty.** Response: night falls (`ANIM.night`) but the bean does NOT change; instead it `ANIM.droop`s (tilts and pales) and the tray's water and sun tiles `ANIM.pulse` in turn. The day is not over — the diary gains no card — until both needs are given; then the plant `ANIM.perk`s and grows.
  2. **"Plants eat food" (a sweet, an apple or a pizza is placed by the pot).** Response: the food glides back to the tray; the tray sun pulses and three `ART.ray` lines reach the plant (`ANIM.rays`) — light is what it takes in.
  3. **"Any liquid will do" (juice or milk is placed).** Response: the drink glides back; the tray water pulses and a copy of the drop falls onto the soil (`ANIM.drip`) — it is WATER that goes into the soil.
  4. **"Water it again and it grows faster" (a second water into the full water slot on a rainy L3 day).** Response: the slot is full, so the second drop springs back (`ANIM.nudge`, no message — F-61); one water per day is the rule the object enforces.

## How it plays
1. **Start screen**: title "Grow a Bean", the snail (`ART.snail`) at (360, 200), Start, picker.
2. **Day 1 of bean 1 (L1)**: rail of 10 dots (§6) at y = 28 — one per day (two beans × five days). Zone A: the diary strip (`ART.diaryStrip`) across the top of zone A at y = 84 with five empty `ART.diaryCard`s (56 × 56) at x = 180 / 250 / 320 / 390 / 460; a pot (`ART.pot`) at (360, 220) with soil (`ART.soil`) in its top and the bean seed (`ART.seed`) half-buried at (360, 196); the snail at (110, 210). Two empty slots (`ART.slot`, 88 × 88, dashed) at (560, 150) and (660, 150) — the day's needs shelf. Zone B: a tray of four tiles (`ART.trayTile`, 96 × 96) at y = 380, x = 180 / 300 / 420 / 540, holding `ART.water`, `ART.sun`, `ART.ball`, `ART.teddy` in shuffled order. Zone C: the moon tile (`ART.moonTile`, 200 × 72, showing `ART.moon`) at (360, 516). No caption.
3. **Placing**: tap a tray item (it lifts: `api.setSelected(true)`, `ANIM.lift`, `tone("tap")`), then tap an empty slot; the item glides (`ANIM.glide`) into it. Tapping a second tray item first switches the selection. Tapping a placed item sends it back (undo, `tone("tap")`). A full slot refuses (`ANIM.nudge`, no message).
   - **A need placed (water or sun)**: `tone("correct")`; water: a copy of the drop `ANIM.drip`s from the slot onto the soil and the soil darkens (`ART.soilWet` swaps in); sun: `ART.ray` lines `ANIM.rays` from the slot to the plant. The item stays on the shelf.
   - **A non-need placed**: it glides back to the tray, `tone("nudge")`, then its class cue (Rules). Counts as one wrong action for the day.
4. **Ending the day**: tap the moon tile.
   - **Both needs on the shelf**: `ART.nightShade` `ANIM.night`s over zone A (dims to 35 % and back over 900 ms) while `ART.moon` rises at (600, 90) and sinks; at the darkest moment the bean swaps to its next stage (`ANIM.grow`), the shelf empties (`ANIM.rise`), the soil returns to dry, and the day's stage is copied into the next diary card (size 30, `ANIM.appear`); `tone("tap", d)` where d = the day number; praise pop for a day with no wrong action; the rail dot fills; the next day's tray `ANIM.appear`s after 700 ms.
   - **A need missing**: the same night falls, but the plant `ANIM.droop`s instead of growing; the missing need's tray tile `ANIM.pulse`s (both, in turn, if both are missing); no diary card; `tone("nudge")`. The day continues; the next moon tap with both needs present makes the plant `ANIM.perk` and then grow. Counts as one wrong action.
   - **Third wrong action in a day**: the remaining need(s) in the tray gain the show-me ring (`ART.showRing`, `ANIM.showMe`); the day completes as solved-with-help.
5. **Days 2-5, then bean 2**: per Content/Rules. The stages: seed → root → sprout → leafy → tall → pods (five changes over five days). After day 5 the pods appear (`ANIM.bloom`) and the diary holds five cards; a fresh pot with a new seed `ANIM.appear`s for bean 2 (days 6-10) with an empty diary.
6. **A full worked session**: day 1 (L1: water, sun, ball, teddy) water ✓ sun ✓ moon → night, the seed cracks and a root shows, card 1 · day 2 (L1) sun ✓, moon tapped ✗ → night, the seed droops, the tray drop pulses; water ✓, moon → perk, sprout, card 2 · day 3 (L1) ✓✓ → leafy · day 4 (L1) ✓✓ → tall → step up · day 5 (L2, six tiles: water, sun, hat, tv, apple, ball) apple ✗ (rays cue), ✓✓ → pods, the diary is full · bean 2, day 6 (L2) ✓✓ → root · day 7 (L2) ✓✓ → step up · day 8 (L3, rainy: the water slot already holds `ART.rainCloud`; tray water, sun, juice, chocolate, teddy, milk) water → refused (slot full); juice ✗ (drip cue); sun ✓ moon → leafy (solved after two wrong actions → step down) · day 9 (L2) ✓✓ → tall · day 10 (L2) ✓✓ → pods → Finish.
7. **Finish**: `t("all_done")` (360, 110); the snail (360, 190) `ANIM.celebrate`; the summary = the two grown beans (`ART.tall` with `ART.pod`s, at 60 %) in two `ART.miniPot`s at (250, 330) and (470, 330), each with its five diary cards (size 24) in a row beneath at y = 400 (x = pot x − 2 × 34 + i × 34); `play_again` (250, 510), `menu` (470, 510); `tone("finish")`.

Session ≈ 5-6 minutes.

## Art registry
```js
const ART = {
  snail:      { kind: "emoji", value: "🐌", size: 72 },
  pot:        { kind: "shape", shape: "polygon", points: [[-70,-40],[70,-40],[56,60],[-56,60]], fill: "structureSoft", stroke: "structure", strokeWidth: 3 },
  soil:       { kind: "shape", shape: "roundRect", w: 128, h: 28, fill: "inkSoft", radius: 8 },
  soilWet:    { kind: "shape", shape: "roundRect", w: 128, h: 28, fill: "ink", radius: 8 },              // after water is given
  // bean stages
  seed:       { kind: "shape", shape: "ellipse", w: 30, h: 44, fill: "accent", stroke: "ink", strokeWidth: 2 },   // tilted 20°
  root:       { kind: "shape", shape: "polygon", points: [[0,0],[-14,22],[-6,14],[0,28],[6,14],[14,22]], stroke: "surface", strokeWidth: 3 },   // white root lines below the seed
  sprout:     { kind: "emoji", value: "🌱", size: 96 },
  leafy:      { kind: "emoji", value: "🌿", size: 96 },
  tall:       { kind: "emoji", value: "🌿", size: 128 },                                                   // the same plant, bigger; ART.stem beneath
  stem:       { kind: "shape", shape: "rect", w: 6, h: 40, fill: "structure" },
  pod:        { kind: "shape", shape: "ellipse", w: 14, h: 40, fill: "structure", stroke: "ink", strokeWidth: 1 },   // two pods hang from the tall plant
  flowerDot:  { kind: "shape", shape: "circle", r: 7, fill: "surface", stroke: "accent", strokeWidth: 2 },
  // day chrome
  slot:       { kind: "shape", shape: "roundRect", w: 88, h: 88, fill: "surface2", stroke: "line", strokeWidth: 2, radius: 12 },   // dashed: lineDash [8,6]
  trayTile:   { kind: "shape", shape: "roundRect", w: 96, h: 96, fill: "surface", stroke: "line", strokeWidth: 2, radius: 12 },
  moonTile:   { kind: "shape", shape: "roundRect", w: 200, h: 72, fill: "surface", stroke: "structure", strokeWidth: 3, radius: 18 },
  moon:       { kind: "emoji", value: "🌙", size: 44 },
  nightShade: { kind: "shape", shape: "rect", w: 720, h: 204, fill: "ink" },                                // over zone A at alpha 0 → 0.35 → 0
  diaryStrip: { kind: "shape", shape: "roundRect", w: 360, h: 68, fill: "surface2", stroke: "line", strokeWidth: 2, radius: 12 },
  diaryCard:  { kind: "shape", shape: "roundRect", w: 56, h: 56, fill: "surface", stroke: "line", strokeWidth: 2, radius: 8 },
  // needs
  water:      { kind: "emoji", value: "💧", size: 60 },
  sun:        { kind: "emoji", value: "☀️", size: 60 },
  rainCloud:  { kind: "emoji", value: "🌧️", size: 60 },                                                   // pre-fills the water slot on a rainy day
  // not needs
  ball:       { kind: "emoji", value: "⚽", size: 60 },
  teddy:      { kind: "emoji", value: "🧸", size: 60 },                                                   // Unicode 11
  hat:        { kind: "emoji", value: "🎩", size: 60 },
  tv:         { kind: "emoji", value: "📺", size: 60 },
  shoe:       { kind: "emoji", value: "👟", size: 60 },
  apple:      { kind: "emoji", value: "🍎", size: 60 },
  pizza:      { kind: "emoji", value: "🍕", size: 60 },
  sweet:      { kind: "emoji", value: "🍬", size: 60 },
  chocolate:  { kind: "emoji", value: "🍫", size: 60 },
  juice:      { kind: "emoji", value: "🧃", size: 60 },                                                   // Unicode 11
  milk:       { kind: "emoji", value: "🥛", size: 60 },
  // cues
  ray:        { kind: "shape", shape: "line", w: 160, stroke: "accent", strokeWidth: 4 },                 // from the sun to the plant; length set at runtime
  showRing:   { kind: "shape", shape: "roundRect", w: 108, h: 108, stroke: "structure", strokeWidth: 4, radius: 16 },
  miniPot:    { kind: "shape", shape: "polygon", points: [[-42,-24],[42,-24],[34,36],[-34,36]], fill: "structureSoft", stroke: "structure", strokeWidth: 2 },
  dotEmpty:   { kind: "shape", shape: "circle", r: 8, stroke: "line", strokeWidth: 2 },
  dotFull:    { kind: "shape", shape: "circle", r: 8, fill: "structure" }
};
```
Every emoji names an unambiguous object (drop of water, sun, rain cloud, crescent moon, ball, teddy …). No glyph is newer than Unicode 12; no fallback needed. Colour-blind safety: the six stages differ by shape and size; wet soil differs from dry soil by tone AND by the drop that visibly fell; slots differ from tray tiles by the dashed stroke.

## Animation registry
```js
const ANIM = {
  lift:      { y: "-=8", scale: 1.06, duration: 120, ease: "Sine.Out", trigger: "tray item selected" },
  glide:     { duration: 260, ease: "Sine.InOut", trigger: "item to slot / back to tray (x,y set at call)" },
  nudge:     { x: "+=10", duration: 80, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "refused placement (slot full)" },
  drip:      { y: "+=110", alpha: 0, duration: 600, ease: "Sine.In", trigger: "a copy of the drop falls from the water slot (or the tray water during a drink cue) onto the soil (from alpha 1)" },
  rays:      { alpha: 1, scaleX: 1, duration: 300, ease: "Sine.Out", yoyo: true, hold: 900, trigger: "three ray lines from the sun (slot or tray) to the plant at (360,180), fanned ±12° (from alpha 0, scaleX 0.1 anchored at the sun)" },
  night:     { alpha: 0.35, duration: 450, ease: "Sine.InOut", yoyo: true, trigger: "nightShade over zone A; moon rises 30 px at (600,90) and sinks with the same timing" },
  grow:      { scale: 1.0, alpha: 1, duration: 320, ease: "Back.Out", trigger: "the next stage glyph appears at the darkest moment of night (from scale 0.7, alpha 0); the old stage is removed" },
  bloom:     { scale: 1.15, duration: 300, ease: "Back.Out", yoyo: true, trigger: "pods and flowerDots appear on day 5" },
  droop:     { angle: 25, alpha: 0.6, duration: 400, ease: "Sine.InOut", trigger: "the plant tilts and pales when the moon is tapped with a need missing" },
  perk:      { angle: 0, alpha: 1, duration: 320, ease: "Back.Out", trigger: "the plant stands up again when the day is completed after a droop" },
  pulse:     { scale: 1.15, duration: 300, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "the missing need's tray tile after a droop (water first, then sun, 400 ms apart); the tray sun / tray water during a food / drink cue" },
  rise:      { y: "-=30", alpha: 0, duration: 260, ease: "Sine.In", trigger: "shelf items clearing at night" },
  appear:    { alpha: 1, scale: 1, duration: 200, ease: "Back.Out", trigger: "new day's tray; a diary card's picture; the new pot for bean 2 (from alpha 0, scale 0.6)" },
  showMe:    { alpha: 1, duration: 500, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "showRing on each remaining need in the tray (from alpha 0.2)" },
  celebrate: { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "finish snail" }
};
```

## Screen layout
```
y   0 ┌──────────────────────────────────────────────────────────────┐
      │ [lang]          ○ ○ ○ ○ ○ ○ ○ ○ ○ ○  rail y=28                 │  zone T
 56   ├──────────────────────────────────────────────────────────────┤
      │        [d1][d2][d3][d4][d5]  diary y=84 (x=180…460)  moon(600,90)│
      │  snail(110,210)      plant (360,180)       [slot] [slot] y=150│  zone A
      │                    ┌─ pot (360,220) ─┐     x=560   x=660     │
      │                    │  soil (360,190)  │                        │
260   ├──────────────────────────────────────────────────────────────┤
      │    [ water ]  [ sun ]  [ ball ]  [ teddy ]   tray y=380       │  zone B
      │     x=180     x=300    x=420     x=540       (96×96)          │
480   ├──────────────────────────────────────────────────────────────┤
      │                  [  moon tile (360,516)  ]  200×72             │  zone C
560   └──────────────────────────────────────────────────────────────┘
```
Six-tile trays (L2, L3): tiles of 96 at pitch 108, x = 90 / 198 / 306 / 414 / 522 / 630, y = 380. Fixed layout, FIT scaling. The night shade covers y = 56-260 only, so the tray and moon tile stay bright.

## Visual specification
- Background `THEME.colour.bg`; rail per §6: 10 × `ART.dotEmpty` at y = 28 (x = 261 + i × 22) → `ART.dotFull` per completed day.
- `ART.diaryStrip` centred (320, 84) with five `ART.diaryCard`s at x = 180 / 250 / 320 / 390 / 460, y = 84; a filled card shows the day's stage at size 30 (the seed and root stages drawn at 55 %).
- `ART.pot` centred (360, 220); `ART.soil` or `ART.soilWet` centred (360, 190) drawn after the pot. The plant is drawn centred at (360, 180) with its base on the soil: stage 0 `ART.seed` (tilted 20°) at (360, 196); stage 1 the seed plus `ART.root` at (360, 210); stage 2 `ART.sprout`; stage 3 `ART.leafy`; stage 4 `ART.tall` at (360, 160) over `ART.stem` at (360, 196); stage 5 stage 4 plus two `ART.pod`s at (334, 176) and (386, 176) and three `ART.flowerDot`s at (340, 140), (372, 128), (394, 150).
- `ART.nightShade` centred (360, 158) at alpha 0; `ART.moon` at (600, 90) at alpha 0 except during `ANIM.night`.
- Slots: `makeTile` 88 × 88 with `ART.slot` tokens at (560, 150) and (660, 150), stroke dashed (graphics lineDash [8, 6]); a filled slot shows the item at size 60 with a solid `THEME.colour.structure` 3 px stroke; a rainy-day slot is pre-filled with `ART.rainCloud` and cannot be emptied (tapping it does nothing).
- Tray: `makeTile` 96 × 96 with `ART.trayTile` tokens; item glyph centred at size 60; four tiles at x = 180 / 300 / 420 / 540 (L1), six at x = 90 / 198 / 306 / 414 / 522 / 630 (L2, L3), y = 380.
- `ART.moonTile` as a `makeTile` 200 × 72 at (360, 516) with `ART.moon` centred; always enabled except during cues.
- Cues: three `ART.ray` lines from the sun's centre to (360, 180), fanned ±12°; `ART.showRing` behind each remaining need tile.
- Tap floors: tray 96, slots 88, moon tile 200 × 72 (≥ 80 on the short side is not met by 72 — so the moon tile's hit area is padded to 200 × 88 by `makeTile` hitArea; visual height stays 72). Gaps ≥ 12.
- Tab order: tray tiles left to right, then the two slots, then the moon tile.
- While a cue or the night plays (≈ 1.2-1.6 s) the tray, slots and moon tile are `setEnabled(false)`.

## Content
Language-neutral (pictures only). Every day has exactly the two needs `ART.water` and `ART.sun` in the tray (except rainy L3 days, where the water slot is pre-filled with `ART.rainCloud` and the tray still holds a water tile that will be refused) plus the listed non-needs; tray order shuffled per day; the two needs are never both in the first two tray positions.

- **L1** (four tiles: the two needs + two obvious non-needs): (+ `ART.ball`, `ART.teddy`) · (+ `ART.hat`, `ART.shoe`) · (+ `ART.tv`, `ART.ball`) · (+ `ART.teddy`, `ART.hat`)
- **L2** (six tiles: the two needs + four non-needs, at most one of them food): (+ `ART.hat`, `ART.tv`, `ART.apple`, `ART.ball`) · (+ `ART.shoe`, `ART.teddy`, `ART.pizza`, `ART.tv`) · (+ `ART.ball`, `ART.hat`, `ART.sweet`, `ART.shoe`) · (+ `ART.teddy`, `ART.tv`, `ART.chocolate`, `ART.ball`)
- **L3** (six tiles: near-miss non-needs — foods and drinks; every other L3 day is RAINY): (+ `ART.juice`, `ART.chocolate`, `ART.teddy`, `ART.milk`; rainy) · (+ `ART.apple`, `ART.juice`, `ART.sweet`, `ART.pizza`) · (+ `ART.milk`, `ART.pizza`, `ART.hat`, `ART.juice`; rainy) · (+ `ART.chocolate`, `ART.apple`, `ART.milk`, `ART.sweet`)

Non-need classes for the cue: `food` = apple, pizza, sweet, chocolate; `drink` = juice, milk; `object` = ball, teddy, hat, tv, shoe. Stage order is fixed: seed → root → sprout → leafy → tall → pods; bean 1 is days 1-5, bean 2 is days 6-10; no day set repeats within a bean.

## Rules
- Item count: 10 days (two beans × five days), each = 2 placements + the moon tap (≈ 5-6 minutes).
- Difficulty progression: 2 consecutive days completed with no wrong action → next level for the following day (cap L3).
- Adaptation: 2 wrong actions within one day, or a wrong action on each of 2 consecutive days → next day one level down (floor L1).
- What happens on a correct answer: each need placed plays `tone("correct")` and its own motion (water `ANIM.drip` + wet soil; sun `ANIM.rays`); the moon tap with both needs present plays `ANIM.night`, the stage `ANIM.grow`s (day 5: `ANIM.bloom`), the diary card fills, `tone("tap", d)`, praise pop (rotation ["well_done", "great_job", "excellent", "you_did_it", "keep_going"], days with no wrong action only), the rail dot fills, next day after 700 ms.
- What happens on a wrong answer:
  - The moon tapped with a need missing — "it grows by itself": `ANIM.night` without growth, the plant `ANIM.droop`s, the missing need's tray tile(s) `ANIM.pulse`, `tone("nudge")`, no diary card.
  - A food (apple, pizza, sweet, chocolate) placed — "plants eat food": it glides back, the tray sun `ANIM.pulse`s and `ART.ray` lines `ANIM.rays` reach the plant.
  - A drink (juice, milk) placed — "any liquid will do": it glides back, the tray water pulses and a copy of `ART.water` `ANIM.drip`s onto the soil.
  - An object (ball, teddy, hat, tv, shoe) placed: it glides back with `tone("nudge")` only; on the second wrong action of the day both slots `ANIM.pulse` in turn.
  - A second water on a rainy day (slot full): refused with `ANIM.nudge`, no attempt counted.
- Retry behaviour: per day — wrong action 1 → its cue → wrong action 2 → cue + slots pulse → wrong action 3 → `ART.showRing` on every remaining need; the day completes as solved-with-help. Undo (tapping a placed need) is free.
- Finish condition: 10 days complete (two beans with pods). No losing state, no clock.

## Strings
- `GameCore.t()` keys: `t("start")`, `t("all_done")`, `t("play_again")`, `t("menu")`, `t("well_done")`, `t("great_job")`, `t("excellent")`, `t("you_did_it")`, `t("keep_going")`.
- Game-specific: `title` = "Grow a Bean". No words on the play screen.

## Sound
`tone("tap")` on selecting an item or undoing; `tone("correct")` on each need placed; `tone("nudge")` on a non-need or a droop; `tone("tap", d)` when day d's stage grows (the pitch climbs with the plant); `tone("tap", 8)` when the pods appear; `tone("finish")` once. Silent under `?sound=off`. Nothing is spoken.

## Testing checklist
- [ ] Works in all 11 languages (All done, Play again, Menu, praise change with the picker; the play screen has no words).
- [ ] Works at narrow width (400-px iframe: diary, pot, two slots, a six-tile tray and the moon tile fully visible).
- [ ] Keyboard operable (Tab: tray tiles left to right, then the two slots, then the moon tile; Enter selects / places / ends the day).
- [ ] Never auto-starts.
- [ ] No losing state (any number of wrong actions still ends in a bean with pods; the show-me ring appears on the third).
- [ ] Placing water darkens the soil and a drop falls; placing the sun draws three lines to the plant.
- [ ] Tapping the moon with both needs placed dims the top of the screen, the plant changes to its next stage, and a small picture of it appears in the diary.
- [ ] Tapping the moon with a slot empty dims the screen, the plant tilts and fades, and the missing need's tray tile pulses; no diary card is added.
- [ ] Placing the apple makes it glide back and draws lines from the sun; placing the juice makes a drop fall onto the soil.
- [ ] After five days the plant shows pods and small flowers, the diary has five cards, and a fresh seed appears for the second bean.
- [ ] On a rainy day the water slot already holds a rain cloud and a second water springs back.
- [ ] Two clean days in a row bring a six-tile tray; two wrong actions in a day bring a four-tile tray next.
- [ ] The finish screen shows two grown beans with their diaries and no score.
- [ ] With `?sound=off` nothing is audible.
