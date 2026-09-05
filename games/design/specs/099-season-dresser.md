# 099 — Season Dresser

## Identity
- Slug: `season-dresser`
- Subject / topic: Science / seasons as observable patterns — reading the cues of a season scene (tree, sky, thermometer band) and choosing the clothes and objects that fit it
- Age band: `5-6`
- Interaction pattern: `P2` — tap to place (select an item from the tray, then a slot beside the character)
- Estimated build size: ~470 lines

Shared contract: `catalogue/BUILD-CONVENTIONS.md`. Pattern contract: `catalogue/PATTERNS.md` P2. Science scope per F-135 / F-218: seasons as what you can SEE and FEEL (trees, sky, warmth), never why they happen. Hemisphere-neutral by construction — see Content.

## Learning
- Objective: Reads a season scene (tree state, sky, thermometer band) and gives the bear the three clothes or objects that fit it, leaving the ones for another season in the tray.
- Prerequisites: None beyond tapping; the scene and the bear are the whole prompt and the tray is discoverable by tapping. Nothing is read or spoken.
- Curriculum links: F-23 (seasons and weather as observable patterns in all 12 systems at 5-8), F-30, F-218, F-5, F-135 (seasons as patterns of clothes, trees and temperature — no causal astronomy). US K-ESS2-1 (weather patterns over time); England Y1 "observe changes across the four seasons; weather associated with the seasons"; Germany Sachunterricht Klasse 1 "Jahreszeiten"; France GS/CP "les saisons"; Spain Infantil/1º "las estaciones"; Brazil EF02CI (estações do ano, observação); Sweden förskoleklass "årstider"; Finland esiopetus "vuodenajat".
- Common misconceptions (F-135), each with this game's response:
  1. **"Winter means snow" — a cold scene without snow is not read as winter.** Response: the cold scene never uses snow as its cue: a bare tree (`ART.treeBare`, drawn branches), a grey sky (`ART.cloud`) and the thermometer's LOW band lit (`ART.thermoLow`) carry the cold; snow never appears in the game. A child in southern Brazil, Portugal or Italy sees a winter they recognise.
  2. **"The same season looks the same everywhere / the year is the same everywhere."** Response: the scenes carry no calendar, no month, no holiday and no fixed order; scenes are drawn in a shuffled order and the thermometer band is the one cue that is true in every hemisphere. (pt is Brazilian Portuguese: the northern "December = cold" assumption never appears.)
  3. **Reading the sun as "hot" whatever the tree and thermometer say (the rainy-mild scene shows a bright gap in the cloud at L3).** Response: at L3 the mild scene shows `ART.sunPeek` behind the rain cloud; a summer item placed there glides back and the thermometer's MID band `ANIM.pulse`s while the rain (`ART.rainDrops`) `ANIM.rainFall`s — look at the whole scene, not one cue.
  4. **Dressing by what the child LIKES rather than what fits (the sunglasses on the cold scene because they are fun).** Response: a mismatched item glides back and the bear reacts to the scene, not to the item: on the cold scene the bear `ANIM.shiver`s and the low band pulses; on the hot scene the bear `ANIM.wilt`s (droops) and the sun `ANIM.pulse`s; on the rainy scene the rain falls harder and the mid band pulses. The scene explains the refusal.

## How it plays
1. **Start screen**: title "Season Dresser", the bear (`ART.bear`) at (360, 200), Start, picker.
2. **Round 1 (L1: the cold scene)**: rail of 8 dots (§6) at y = 28 — one per round. Zone A is the scene: a ground line (`ART.ground` at y = 236); the tree at (150, 170) — for the cold scene `ART.treeBare`; the sky element at (560, 110) — `ART.cloud`; the thermometer (`ART.thermo`, a tall rounded bar) at (660, 160) with its three bands (`ART.thermoLow` / `ART.thermoMid` / `ART.thermoHigh`) and the active band drawn filled with `ART.thermoFill` and ringed — the cold scene lights the LOW band. The bear stands on the ground at (360, 180). Three dashed slots (`ART.slot`, 88 × 88) beside the bear at y = 290, x = 260 / 360 / 460 — what the bear will wear or carry. Zone B: a tray of six tiles (`ART.trayTile`, 96 × 96) at y = 400, x = 90 / 198 / 306 / 414 / 522 / 630: `ART.coat`, `ART.scarf`, `ART.gloves` and three hot-scene items in shuffled order. No caption.
3. **Placing**: tap a tray item (it lifts: `api.setSelected(true)`, `ANIM.lift`, `tone("tap")`), then tap an empty slot; the item glides (`ANIM.glide`) into the slot. Tapping a second tray item before a slot switches the selection. Tapping a placed item returns it to the tray (undo). A full slot refuses (the arriving item springs back, `ANIM.nudge`, no message).
   - **A fitting item placed**: `tone("correct")`; the item settles with `ANIM.pop` and the bear `ANIM.bob`s. Round complete when all three slots hold fitting items: the bear `ANIM.jump`s, the three items `ANIM.pop` together, praise pop, rail dot fills; next round after 900 ms (`ANIM.rise` clears the scene, the new scene `ANIM.appear`s).
   - **A non-fitting item placed**: the item glides back to the tray, `tone("nudge")`, then the scene's cue (Rules): the bear reacts (`ANIM.shiver` / `ANIM.wilt` / stands under harder rain) and the scene's strongest cue pulses (low band / sun / mid band with rain). Attempt 2 on this item.
   - **Second wrong placement in the round**: the cue again, then the three slots `ANIM.pulse` in turn. **Third**: every remaining fitting item in the tray gains the show-me ring (`ART.showRing`, `ANIM.showMe`); placing them completes the round as solved-with-help.
4. **Rounds 2-8**: per Content/Rules. L1 alternates the cold and hot scenes with far-off distractors. L2 adds the rainy-mild scene (blossom tree `ART.treeBlossom` or leaf-fall tree `ART.treeLeafFall`, rain cloud, MID band). L3 uses near-miss distractors (a cap and an umbrella on the hot scene; sunglasses and gloves on the rainy scene) and the sun peeking behind the rain cloud.
5. **A full worked session**: round 1 (cold: coat, scarf, gloves + sun hat, sunglasses, ice cream) — sunglasses ✗ → back; the bear shivers; the low band pulses; coat ✓ scarf ✓ gloves ✓ → jump · round 2 (hot: sun hat, sunglasses, ice cream + coat, scarf, gloves) ✓✓✓ · round 3 (cold) ✓✓✓ → step up · round 4 (rainy-mild: umbrella, boots, cap + sunglasses, sun hat, ice cream) — sun hat ✗ → rain falls harder, mid band pulses; umbrella ✓ boots ✓ cap ✓ · round 5 (hot) ✓✓✓ · round 6 (rainy) ✓✓✓ → step up · round 7 (L3 hot, sun peeking is not in this scene: t-shirt, sunglasses, sunscreen + cap, umbrella, scarf) — cap ✗ → the bear droops, the sun pulses; t-shirt ✓ sunglasses ✓ sunscreen ✓ · round 8 (L3 rainy with the sun peeking: umbrella, boots, coat + sunglasses, gloves, ice cream) — sunglasses ✗ → rain harder, mid band pulses; ✓✓✓ → Finish.
6. **Finish**: `t("all_done")` (360, 110); the bear (360, 200) `ANIM.celebrate`; the summary = the eight completed scenes as `ART.sceneChip`s (100 × 56) in two rows of four (y = 350 and 420; x = 165 + i × 130) each showing its tree, its sky and its three items at size 16 — a year of outfits; `play_again` (250, 510), `menu` (470, 510); `tone("finish")`.

Session ≈ 5 minutes.

## Art registry
```js
const ART = {
  bear:         { kind: "emoji", value: "🐻", size: 96 },
  ground:       { kind: "shape", shape: "rect", w: 640, h: 4, fill: "line" },
  // trees (the cold tree is a drawn shape so no snow is needed)
  treeBare:     { kind: "shape", shape: "polygon", points: [[-6,60],[6,60],[6,10],[36,-30],[30,-34],[4,-2],[4,-40],[-4,-40],[-4,-6],[-30,-36],[-36,-30],[-6,6]], fill: "inkSoft" },   // trunk with bare branches
  treeFull:     { kind: "emoji", value: "🌳", size: 110 },
  treeBlossom:  { kind: "emoji", value: "🌸", size: 96 },                       // drawn on top of ART.treeBare's trunk: a blossoming tree
  treeLeafFall: { kind: "emoji", value: "🍂", size: 96 },                       // drawn beside ART.treeBare: leaves falling
  // sky
  sun:          { kind: "emoji", value: "☀️", size: 80 },
  cloud:        { kind: "emoji", value: "☁️", size: 80 },
  rainCloud:    { kind: "emoji", value: "🌧️", size: 80 },                       // Unicode 7
  sunPeek:      { kind: "emoji", value: "☀️", size: 44 },                       // behind the rain cloud at L3
  rainDrops:    { kind: "emoji", value: "💧", size: 20 },                        // drawn 4× under the rain cloud during the rainy cue
  // thermometer
  thermo:       { kind: "shape", shape: "roundRect", w: 36, h: 150, fill: "surface", stroke: "structure", strokeWidth: 3, radius: 18 },
  thermoLow:    { kind: "shape", shape: "roundRect", w: 22, h: 36, stroke: "line", strokeWidth: 2, radius: 6 },    // band outline at (0,+48)
  thermoMid:    { kind: "shape", shape: "roundRect", w: 22, h: 36, stroke: "line", strokeWidth: 2, radius: 6 },    // at (0,0)
  thermoHigh:   { kind: "shape", shape: "roundRect", w: 22, h: 36, stroke: "line", strokeWidth: 2, radius: 6 },    // at (0,−48)
  thermoFill:   { kind: "shape", shape: "roundRect", w: 22, h: 36, fill: "accent", radius: 6 },                    // fills the active band; ART.thermoRing around it
  thermoRing:   { kind: "shape", shape: "roundRect", w: 32, h: 46, stroke: "structure", strokeWidth: 3, radius: 9 },
  thermoBulb:   { kind: "shape", shape: "circle", r: 16, fill: "accent", stroke: "structure", strokeWidth: 3 },    // at (0,+84)
  // slots and tray
  slot:         { kind: "shape", shape: "roundRect", w: 88, h: 88, fill: "surface2", stroke: "line", strokeWidth: 2, radius: 12 },   // dashed: lineDash [8,6]
  trayTile:     { kind: "shape", shape: "roundRect", w: 96, h: 96, fill: "surface", stroke: "line", strokeWidth: 2, radius: 12 },
  // cold set
  coat:         { kind: "emoji", value: "🧥", size: 60 },                       // Unicode 10
  scarf:        { kind: "emoji", value: "🧣", size: 60 },                       // Unicode 10
  gloves:       { kind: "emoji", value: "🧤", size: 60 },                       // Unicode 10
  // hot set
  sunHat:       { kind: "emoji", value: "👒", size: 60 },
  sunglasses:   { kind: "emoji", value: "🕶️", size: 60 },                       // Unicode 7
  iceCream:     { kind: "emoji", value: "🍦", size: 60 },
  tshirt:       { kind: "emoji", value: "👕", size: 60 },
  sunscreen:    { kind: "emoji", value: "🧴", size: 60 },                       // Unicode 11
  // rainy-mild set
  umbrella:     { kind: "emoji", value: "☂️", size: 60 },
  boots:        { kind: "emoji", value: "🥾", size: 60 },                       // Unicode 11
  cap:          { kind: "emoji", value: "🧢", size: 60 },                       // Unicode 10
  // cues and chrome
  showRing:     { kind: "shape", shape: "roundRect", w: 108, h: 108, stroke: "structure", strokeWidth: 4, radius: 16 },
  sceneChip:    { kind: "shape", shape: "roundRect", w: 100, h: 56, fill: "structureSoft", stroke: "structure", strokeWidth: 2, radius: 8 },
  dotEmpty:     { kind: "shape", shape: "circle", r: 8, stroke: "line", strokeWidth: 2 },
  dotFull:      { kind: "shape", shape: "circle", r: 8, fill: "structure" }
};
```
Every emoji names one garment, object or sky element unambiguously in English (the key is the intended word). No glyph is newer than Unicode 12; no fallback needed. Colour-blind safety: the thermometer band is shown by FILL + a ring + its position (low/mid/high), never by hue alone; the cold tree is a distinct drawn shape; slots are dashed.

## Animation registry
```js
const ANIM = {
  lift:      { y: "-=8", scale: 1.06, duration: 120, ease: "Sine.Out", trigger: "tray item selected" },
  glide:     { duration: 260, ease: "Sine.InOut", trigger: "item to slot / back to tray (x,y set at call)" },
  nudge:     { x: "+=10", duration: 80, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "refused placement (slot full)" },
  pop:       { scale: 1.12, duration: 140, ease: "Back.Out", yoyo: true, trigger: "a fitting item settles; the three items together on completion" },
  bob:       { y: "-=10", duration: 140, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "bear on each fitting item" },
  jump:      { y: "-=30", duration: 220, ease: "Back.Out", yoyo: true, trigger: "bear when the round completes" },
  shiver:    { x: "+=4", duration: 60, ease: "Sine.InOut", yoyo: true, repeat: 7, trigger: "bear on the cold scene after a non-fitting item" },
  wilt:      { y: "+=14", scaleY: 0.9, duration: 300, ease: "Sine.InOut", yoyo: true, hold: 500, trigger: "bear droops on the hot scene after a non-fitting item" },
  rainFall:  { y: "+=60", alpha: 0, duration: 500, ease: "Sine.In", trigger: "each rainDrop falls from under the rain cloud (from alpha 1), 120 ms apart, repeated twice" },
  pulse:     { scale: 1.2, duration: 300, ease: "Sine.InOut", yoyo: true, repeat: 2, trigger: "the active thermometer band fill + ring, or the sun; the three slots in turn on a second wrong placement" },
  rise:      { y: "-=30", alpha: 0, duration: 260, ease: "Sine.In", trigger: "clearing the scene before the next round" },
  appear:    { alpha: 1, scale: 1, duration: 200, ease: "Back.Out", trigger: "new scene and tray (from alpha 0, scale 0.6)" },
  showMe:    { alpha: 1, duration: 500, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "showRing on each remaining fitting item in the tray (from alpha 0.2)" },
  celebrate: { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "finish bear" }
};
```

## Screen layout
```
y   0 ┌──────────────────────────────────────────────────────────────┐
      │ [lang]              ○ ○ ○ ○ ○ ○ ○ ○  rail y=28                 │  zone T
 56   ├──────────────────────────────────────────────────────────────┤
      │                                    sky (560,110)   ┃thermo┃  │
      │   tree (150,170)      bear (360,180)               ┃(660, ┃  │  zone A
      │ ─────────────────── ground y=236 ───────────────── ┃ 160) ┃  │
      │              [slot] [slot] [slot]  y=290, x=260/360/460       │
      │                          (88×88)                              │
      │ [coat] [scarf] [gloves] [hat] [glasses] [ice]   tray y=400    │  zone B
      │  x=90   198     306     414    522      630     (96×96)       │
480   ├──────────────────────────────────────────────────────────────┤
      │                                                              │  zone C
560   └──────────────────────────────────────────────────────────────┘
```
Fixed layout, FIT scaling. The slot row sits at the top of zone B so the tray keeps its full row.

## Visual specification
- Background `THEME.colour.bg`; rail per §6: 8 × `ART.dotEmpty` at y = 28 (x = 283 + i × 22) → `ART.dotFull` per completed round.
- Scene: `ART.ground` centred (360, 236). Tree at (150, 170): cold = `ART.treeBare`; hot = `ART.treeFull`; rainy-mild = `ART.treeBare` with `ART.treeBlossom` drawn on its crown at (150, 140) OR with `ART.treeLeafFall` at (200, 200) (Content says which). Sky at (560, 110): cold = `ART.cloud`; hot = `ART.sun`; rainy-mild = `ART.rainCloud` (L3: `ART.sunPeek` at (600, 84) drawn BEHIND it). Thermometer: `ART.thermo` centred (660, 160), `ART.thermoBulb` at (660, 244), band outlines `ART.thermoHigh` (660, 112), `ART.thermoMid` (660, 160), `ART.thermoLow` (660, 208); the scene's active band gets `ART.thermoFill` + `ART.thermoRing`.
- `ART.bear` at (360, 180) standing on the ground.
- Slots: `makeTile` 88 × 88 with `ART.slot` tokens at (260, 290), (360, 290), (460, 290), dashed (graphics lineDash [8, 6]); a filled slot shows the item at size 60 with a solid `THEME.colour.structure` 3 px stroke.
- Tray: `makeTile` 96 × 96 with `ART.trayTile` tokens at x = 90 / 198 / 306 / 414 / 522 / 630, y = 400; item emoji centred at size 60.
- Cues: `ART.rainDrops` × 4 at (530, 150), (550, 150), (570, 150), (590, 150) during the rainy cue; `ART.showRing` behind each remaining fitting tray tile.
- Tap floors: tray 96, slots 88 (≥ 80). Gaps: tray pitch 108 → 12; slots pitch 100 → 12.
- Tab order: tray tiles left to right, then the three slots left to right.
- During a cue (≈ 1.3 s) the tray and slots are `setEnabled(false)`.

## Content
Language-neutral (pictures only) and hemisphere-neutral: no scene carries a month, a holiday or snow, and the scenes appear in a shuffled order so no "first season" is implied — a child in Brazil (pt), Portugal, Finland or Italy reads the same tree, sky and thermometer cues. Item words map to ART keys: coat `ART.coat`, scarf `ART.scarf`, gloves `ART.gloves`, sun hat `ART.sunHat`, sunglasses `ART.sunglasses`, ice cream `ART.iceCream`, t-shirt `ART.tshirt`, sunscreen `ART.sunscreen`, umbrella `ART.umbrella`, boots `ART.boots`, cap `ART.cap`.

Scenes: **COLD** = `ART.treeBare` + `ART.cloud` + LOW band; **HOT** = `ART.treeFull` + `ART.sun` + HIGH band; **RAINY-MILD** = bare tree with `ART.treeBlossom` (or `ART.treeLeafFall`, alternating) + `ART.rainCloud` + MID band (L3 adds `ART.sunPeek`).

Each round = (scene; the three fitting items; the three distractors). Tray order shuffled per round; the three fitting items are never all in the first three tray positions.
- **L1** (cold and hot only; distractors from the opposite scene): (COLD; coat, scarf, gloves; sun hat, sunglasses, ice cream) · (HOT; sun hat, sunglasses, ice cream; coat, scarf, gloves) · (COLD; coat, scarf, gloves; t-shirt, sunscreen, sun hat) · (HOT; t-shirt, sunglasses, sunscreen; coat, gloves, scarf)
- **L2** (the rainy-mild scene joins; distractors still from a clearly different scene): (RAINY-MILD blossom; umbrella, boots, cap; sunglasses, sun hat, ice cream) · (HOT; sun hat, sunglasses, ice cream; umbrella, boots, coat) · (RAINY-MILD leaf-fall; umbrella, boots, cap; sun hat, sunscreen, ice cream) · (COLD; coat, scarf, gloves; umbrella, sun hat, sunglasses)
- **L3** (near-miss distractors — a head-covering or a coat from another scene; the sun peeks behind the rain cloud): (HOT; t-shirt, sunglasses, sunscreen; cap, umbrella, scarf) · (RAINY-MILD blossom + sunPeek; umbrella, boots, coat; sunglasses, gloves, ice cream) · (COLD; coat, scarf, gloves; cap, umbrella, t-shirt) · (RAINY-MILD leaf-fall + sunPeek; umbrella, boots, cap; sun hat, scarf, sunscreen)

Note the coat is a fitting item on the L3 rainy scene and a distractor on the hot scene — the tray never contains an item that fits in two ways within one round. Play list of 8 rounds per Rules; no round repeats within a session; two consecutive rounds never show the same scene.

## Rules
- Item count: 8 rounds, each = 3 placements (24 placements ≈ 5 minutes).
- Difficulty progression: 2 consecutive rounds completed with no wrong placement → next level (cap L3).
- Adaptation: 2 wrong placements within one round, or a wrong placement in each of 2 consecutive rounds → next round one level down (floor L1).
- What happens on a correct answer: `tone("correct")`, item `ANIM.pop`, bear `ANIM.bob`; on the third fitting item the bear `ANIM.jump`s, the three items `ANIM.pop` together, praise pop (rotation ["well_done", "great_job", "excellent", "you_did_it", "keep_going"], rounds with no wrong placement only), rail dot fills, next round after 900 ms.
- What happens on a wrong answer (each begins with the item gliding back and `tone("nudge")`):
  - A hot-scene or rainy item on the COLD scene ("I like sunglasses"; "winter needs snow to be cold"): the bear `ANIM.shiver`s and the LOW band's fill + ring `ANIM.pulse`.
  - A cold or rainy item on the HOT scene: the bear `ANIM.wilt`s and `ART.sun` `ANIM.pulse`s.
  - A hot or cold item on the RAINY-MILD scene (reading the peeking sun as "hot", or the grey sky as "cold"): four `ART.rainDrops` `ANIM.rainFall` twice and the MID band's fill + ring pulses.
  - Second wrong placement in a round (any item): the scene cue again, then the three slots `ANIM.pulse` in turn.
  - An item placed into a full slot: refused, `ANIM.nudge`, not an attempt.
- Retry behaviour: per round — wrong placement 1 → scene cue → wrong placement 2 → cue + slots pulse → wrong placement 3 → `ART.showRing` on every remaining fitting item; the round completes as solved-with-help. Undo is free.
- Finish condition: 8 rounds complete. No losing state, no clock.

## Strings
- `GameCore.t()` keys: `t("start")`, `t("all_done")`, `t("play_again")`, `t("menu")`, `t("well_done")`, `t("great_job")`, `t("excellent")`, `t("you_did_it")`, `t("keep_going")`.
- Game-specific: `title` = "Season Dresser". No words on the play screen; the thermometer carries no numbers.

## Sound
`tone("tap")` on selecting an item or undoing; `tone("correct")` on a fitting item; `tone("nudge")` on a non-fitting item; `tone("tap", 6)` on the bear's completion jump; `tone("finish")` once. Silent under `?sound=off`. Nothing is spoken.

## Testing checklist
- [ ] Works in all 11 languages (All done, Play again, Menu, praise change with the picker; the play screen has no words or numbers).
- [ ] Works at narrow width (400-px iframe: tree, bear, thermometer, three slots and the six-tile tray fully visible).
- [ ] Keyboard operable (Tab: tray tiles left to right, then the slots; Enter selects / places / undoes).
- [ ] Never auto-starts.
- [ ] No losing state (any number of wrong placements still dresses the bear; the show-me ring appears on the third).
- [ ] Snow never appears anywhere; the cold scene shows a bare drawn tree, a grey cloud and the lowest thermometer band filled and ringed.
- [ ] Putting the sunglasses on the cold scene sends them back; the bear shivers and the low band pulses.
- [ ] Putting the coat on the hot scene sends it back; the bear droops and the sun pulses.
- [ ] Putting the sun hat on the rainy scene sends it back; drops fall from the cloud and the middle band pulses.
- [ ] At the third level a small sun shows behind the rain cloud and summer items are still refused on that scene.
- [ ] Two consecutive rounds never show the same scene; scenes appear in no fixed yearly order.
- [ ] Two clean rounds in a row bring the rainy scene, then near-miss trays; two wrong placements in a round bring cold/hot again.
- [ ] The finish screen shows eight small scene chips with their outfits and no score.
- [ ] With `?sound=off` nothing is audible.
