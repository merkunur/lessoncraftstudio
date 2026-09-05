# 079 — What Happened Next

## Identity
- Slug: `what-happened-next`
- Subject / topic: Literacy / predicting and sequencing — choosing the picture panel that fits between two shown story panels
- Age band: `6-8`
- Interaction pattern: `P1` — tap one of N
- Estimated build size: ~440 lines

Shared contract: `catalogue/BUILD-CONVENTIONS.md`. Pattern contract: `catalogue/PATTERNS.md` P1. Content is language-neutral (picture panels; the one caption is a game string); nothing is spoken. Sibling of game 078 (same picture stories, a different task: infer the missing middle rather than order the whole chain).

## Learning
- Objective: Looks at the first and third panels of a picture story and taps, from three candidates, the panel that happened in between.
- Prerequisites: Has ordered a whole picture story (game 078) or an equivalent; reads the three-word caption or ignores it (the "?" gap carries the task).
- Curriculum links: F-22 (retell, sequence and simple inference on short narratives by 8, all twelve systems), F-129 (inference poor at 6 → every item carries ≥ 2 visible clues; picture-supported), F-31 row "Read short text; retell/sequence; simple inference" — conservative 8, earliest 6 → 6-8 (US RL.1.3 / RL.1.7 "use illustrations and details … to describe … events"; England Y1 "predicting what might happen on the basis of what has been read so far"; Germany Klasse 1-2 "Bildergeschichten"; France CP "comprendre un récit"; Netherlands groep 3-4 "verhaalbegrip"; Spain 1º ciclo; Brazil EF01LP16; Sweden åk 1-3 "berättande texter"; Finland 1.-2. luokka).
- Common misconceptions (F-129, F-116), each with this game's response:
  1. **Choosing the most exciting candidate rather than the one the clues support (salience).** Response: the wrong candidate sits in the gap for 400 ms, then returns while the CLUE in panel 1 is ringed in coral (`ART.clueRing`, `ANIM.markIn`) — the thing that continues into the middle (the egg, the cloud, the caterpillar) — for 1200 ms. Panel 1 and panel 3 both stay visible; the child re-looks and taps again.
  2. **Picking a panel that belongs to the story but in the wrong place (before panel 1 or after panel 3).** Response: enacted placement — the candidate shrinks to 0.66 and glides to a ghost slot just LEFT of panel 1 (for a "before" panel) or just RIGHT of panel 3 (for an "after" panel) (`ANIM.ghostAway`), holds 900 ms, then returns to its tray spot: "this one belongs there, not in the gap". L2 introduces one such distractor, L3 two.
  3. **Not integrating the two shown panels (uses panel 1 only, ignores where the story ENDS).** Response: on the second wrong tap the two faint arrows on the rail (`ART.arrow` from panel 1 to the gap and from the gap to panel 3) brighten and pulse in turn (`ANIM.arrowPulse`) so the gap is read as "between", and the correct candidate gains the show-me ring.
  4. **Not recognising the same character/object across panels (F-116 unit continuity).** Response: as in 078 — every panel of a story shares `ART.ground` and its anchor object, and the clue ring names the shared element.
  5. **Position habit.** Response: the correct candidate's slot shuffles and never repeats twice running (§13); a wrong tap re-shuffles the candidates (P1 brute-force guard).

## How it plays
1. **Start screen**: title "What Happened Next", the owl (`ART.owl`) at (360, 200), Start, picker.
2. **Item 1 (L1: Egg story — panel 1 egg, panel 3 chick; candidates: hatching (correct), car, fish)**: rail of 10 dots (§6) at y = 28; `t("question_x_of_y")` at (360, 48). Zone A: the story rail — panel 1 (`ART.panel`, 150 × 130) at (200, 160) showing `ART.picEgg`; the gap slot (`ART.gapSlot`, 150 × 130, dashed) at (360, 160) with `ART.question` ("?", 56 px) in it; panel 3 (`ART.panel`) at (520, 160) showing `ART.picChick`; two faint arrows (`ART.arrow` at alpha 0.35) at (280, 160) and (440, 160); the two ghost slots (`ART.ghostSlot`, 100 × 86) at (70, 160) and (650, 160), invisible (alpha 0) until used. The owl perches at (640, 70) at 48 px. Zone B: three candidate panels (`ART.candidate`, 150 × 130) at y = 380, x = 200 / 360 / 520, shuffled. Caption `S("whatNext")` ("What happened next?") at (360, 282), 22 px `THEME.colour.inkSoft`.
3. **Answering**: the child taps a candidate; it glides (`ANIM.glide`) into the gap slot.
   - **Correct**: the gap slot's stroke turns solid, the two arrows brighten (`ANIM.arrowOn`, alpha to 1, 1 → 2 then 2 → 3, 300 ms apart), `tone("correct")`, praise pop, the owl `ANIM.blink` (a quick scale-y squash); rail dot fills; next item after 900 ms (`ANIM.appear`).
   - **Wrong — unrelated panel**: it sits in the gap 400 ms, `tone("nudge")`, glides back to its tray spot; `ART.clueRing` around the story's clue element in panel 1 for 1200 ms; candidates re-shuffle. Attempt 2.
   - **Wrong — a "before" or "after" panel of the same story**: it sits 400 ms, `tone("nudge")`, then `ANIM.ghostAway` to the matching ghost slot (which fades in to alpha 1 while occupied), holds 900 ms, returns to its tray spot; candidates re-shuffle. Attempt 2.
   - **Second wrong tap**: the cue for that candidate type again, then the arrows `ANIM.arrowPulse` and the correct candidate gains the show-me ring (`ART.showRing`, `ANIM.showMe`); tapping it completes the item as solved-with-help.
4. **Items 2-10**: per Content/Rules. L1 candidates = correct + 2 unrelated; L2 = correct + 1 unrelated + 1 before/after panel of the same story; L3 = correct + the story's before panel + its after panel (every candidate belongs to the story; only sequence separates them).
5. **Re-queue** (F-41): an item wrong first-try re-enters after 2 intervening items with re-shuffled candidates; the count stays 10.
6. **Finish**: `t("all_done")` (360, 110); the owl (360, 200) `ANIM.celebrate`; the summary = the last three completed stories as mini three-panel strips (`ART.miniPanel`, 88 × 76, with `ART.arrow` at 0.6 scale between panels) stacked at y = 320 / 410 / 500? — no: two strips at y = 330 and y = 430 (the last two stories), each strip centred (panels at x = 240 / 360 / 480); `play_again` (250, 510), `menu` (470, 510); `tone("finish")`. The chosen middle panel carries `ART.dotFull` at its top-left if it was first-try, `ART.dotEmpty` if helped.

Session ≈ 5-6 minutes.

## Art registry
```js
const ART = {
  owl:        { kind: "emoji", value: "🦉", size: 80 },                     // mascot
  panel:      { kind: "shape", shape: "roundRect", w: 150, h: 130, fill: "surface", stroke: "structure", strokeWidth: 3, radius: 14 },
  gapSlot:    { kind: "shape", shape: "roundRect", w: 150, h: 130, fill: "surface2", stroke: "line", strokeWidth: 2, radius: 14 },   // dashed (lineDash [8,6]) while empty
  ghostSlot:  { kind: "shape", shape: "roundRect", w: 100, h: 86, fill: "surface2", stroke: "line", strokeWidth: 2, radius: 10 },    // dashed; alpha 0 until used
  candidate:  { kind: "shape", shape: "roundRect", w: 150, h: 130, fill: "surface", stroke: "line", strokeWidth: 2, radius: 14 },
  miniPanel:  { kind: "shape", shape: "roundRect", w: 88, h: 76, fill: "surface", stroke: "structure", strokeWidth: 2, radius: 10 },
  ground:     { kind: "shape", shape: "roundRect", w: 110, h: 10, fill: "structureSoft", radius: 5 },   // shared floor inside every panel at (0, +44)
  cocoon:     { kind: "shape", shape: "ellipse", w: 40, h: 60, fill: "structureSoft", stroke: "structure", strokeWidth: 3 },
  question:   { kind: "text",  value: "?", size: 56, font: "display", color: "structure" },
  arrow:      { kind: "shape", shape: "polygon", points: [[-30,-5],[6,-5],[6,-13],[30,0],[6,13],[6,5],[-30,5]], fill: "accent" },   // 60 × 26, points right
  clueRing:   { kind: "shape", shape: "circle", r: 40, stroke: "accent", strokeWidth: 4 },
  showRing:   { kind: "shape", shape: "roundRect", w: 162, h: 142, stroke: "structure", strokeWidth: 4, radius: 18 },
  dotEmpty:   { kind: "shape", shape: "circle", r: 8, stroke: "line", strokeWidth: 2 },
  dotFull:    { kind: "shape", shape: "circle", r: 8, fill: "structure" },
  // story pictures (English gloss in the comment)
  picEgg:      { kind: "emoji", value: "🥚", size: 64 },   // egg
  picHatch:    { kind: "emoji", value: "🐣", size: 64 },   // hatching chick
  picChick:    { kind: "emoji", value: "🐥", size: 64 },   // chick
  picHen:      { kind: "emoji", value: "🐔", size: 64 },   // hen
  picSeed:     { kind: "emoji", value: "🌰", size: 64 },   // seed (chestnut)
  picSprout:   { kind: "emoji", value: "🌱", size: 64 },   // seedling
  picPlant:    { kind: "emoji", value: "🌿", size: 64 },   // leafy plant
  picFlower:   { kind: "emoji", value: "🌻", size: 64 },   // sunflower
  picBee:      { kind: "emoji", value: "🐝", size: 40 },   // bee
  picSun:      { kind: "emoji", value: "☀️", size: 56 },   // sun
  picCloud:    { kind: "emoji", value: "☁️", size: 64 },   // cloud
  picRain:     { kind: "emoji", value: "🌧️", size: 64 },   // rain cloud
  picUmbrella: { kind: "emoji", value: "☔", size: 64 },   // umbrella in rain
  picRainbow:  { kind: "emoji", value: "🌈", size: 64 },   // rainbow
  picLeaf:     { kind: "emoji", value: "🍃", size: 48 },   // leaf
  picBug:      { kind: "emoji", value: "🐛", size: 64 },   // caterpillar
  picButterfly:{ kind: "emoji", value: "🦋", size: 64 },   // butterfly
  picBlossom:  { kind: "emoji", value: "🌸", size: 48 },   // blossom
  picSnowCloud:{ kind: "emoji", value: "🌨️", size: 64 },   // snow cloud
  picSnowman:  { kind: "emoji", value: "⛄", size: 64 },   // snowman
  picDrop:     { kind: "emoji", value: "💧", size: 48 },   // water drop (puddle)
  picMilk:     { kind: "emoji", value: "🥛", size: 48 },   // milk
  picBowl:     { kind: "emoji", value: "🥣", size: 64 },   // mixing bowl
  picCake:     { kind: "emoji", value: "🎂", size: 64 },   // cake
  picSlice:    { kind: "emoji", value: "🍰", size: 64 },   // slice of cake
  picPlate:    { kind: "emoji", value: "🍽️", size: 64 },   // empty plate
  picIceCream: { kind: "emoji", value: "🍦", size: 64 },   // ice cream
  picSnowflake:{ kind: "emoji", value: "❄️", size: 40 },   // snowflake (cold)
  picMoon:     { kind: "emoji", value: "🌙", size: 64 },   // moon
  picSunrise:  { kind: "emoji", value: "🌅", size: 64 },   // sunrise
  picSunset:   { kind: "emoji", value: "🌇", size: 64 },   // sunset
  picRocket:   { kind: "emoji", value: "🚀", size: 56 },   // rocket
  picFire:     { kind: "emoji", value: "🔥", size: 40 },   // launch flame
  picFlag:     { kind: "emoji", value: "🚩", size: 48 },   // flag
  picTree:     { kind: "emoji", value: "🌳", size: 64 },   // tree
  picApple:    { kind: "emoji", value: "🍎", size: 44 },   // apple
  picBasket:   { kind: "emoji", value: "🧺", size: 64 },   // basket
  picPie:      { kind: "emoji", value: "🥧", size: 64 },   // pie
  // unrelated distractor pictures
  picCar:      { kind: "emoji", value: "🚗", size: 64 },   // car
  picBalloon:  { kind: "emoji", value: "🎈", size: 64 },   // balloon
  picFish:     { kind: "emoji", value: "🐟", size: 64 },   // fish
  picBall:     { kind: "emoji", value: "⚽", size: 64 },   // ball
  picTrain:    { kind: "emoji", value: "🚂", size: 64 },   // train
  picBoat:     { kind: "emoji", value: "⛵", size: 64 }    // boat
};
```
All emoji are Unicode 11 or older; no fallbacks needed.

## Animation registry
```js
const ANIM = {
  glide:      { duration: 260, ease: "Sine.InOut", trigger: "candidate into the gap / back to its tray spot (x,y at call)" },
  arrowOn:    { alpha: 1, duration: 300, ease: "Sine.Out", trigger: "each rail arrow on a correct answer, 300 ms apart (from alpha 0.35)" },
  arrowPulse: { scale: 1.2, duration: 300, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "each rail arrow in turn after the second wrong tap" },
  markIn:     { alpha: 1, duration: 200, ease: "Sine.Out", yoyo: true, hold: 1200, trigger: "clueRing around the clue element in panel 1 (from alpha 0)" },
  ghostAway:  { scale: 0.66, duration: 400, ease: "Sine.InOut", yoyo: true, hold: 900, trigger: "a before/after candidate to its ghost slot (x,y at call) and back; the ghost slot fades to alpha 1 for the hold, then to 0" },
  blink:      { scaleY: 0.7, duration: 90, ease: "Sine.InOut", yoyo: true, trigger: "owl on correct" },
  appear:     { alpha: 1, scale: 1, duration: 200, ease: "Back.Out", trigger: "new panels and candidates (from alpha 0, scale 0.6)" },
  showMe:     { alpha: 1, duration: 500, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "ring on the correct candidate (from alpha 0.2)" },
  celebrate:  { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "finish owl" }
};
```

## Screen layout
```
y   0 ┌──────────────────────────────────────────────────────────────┐
      │ [lang]        ○ ○ ○ ○ ○ ○ ○ ○ ○ ○  rail y=28; "3 of 10" y=48    │  zone T
 56   ├──────────────────────────────────────────────────────────────┤
      │                                                 owl (640,70) │
      │ (ghost)  ┌───────┐  →  ┌ ─ ─ ─ ┐  →  ┌───────┐   (ghost)      │  zone A
      │ (70,160) │ panel1│     │   ?   │     │ panel3│   (650,160)    │
      │          └───────┘     └ ─ ─ ─ ┘     └───────┘   y=160        │
      │           x=200          x=360         x=520     (150×130)    │
260   ├──────────────────────────────────────────────────────────────┤
      │              "What happened next?" (360,282)                  │
      │          ┌───────┐   ┌───────┐   ┌───────┐   candidates y=380  │  zone B
      │          │       │   │       │   │       │   (150×130)        │
      │          └───────┘   └───────┘   └───────┘                    │
480   ├──────────────────────────────────────────────────────────────┤
      │                                                              │  zone C
560   └──────────────────────────────────────────────────────────────┘
```
Fixed layout, FIT scaling.

## Visual specification
- Background `THEME.colour.bg`; rail per §6: 10 × `ART.dotEmpty` (x = 261 + i × 22) → `ART.dotFull`; `t("question_x_of_y")` at (360, 48).
- Panels 1 and 3: `ART.panel` at (200, 160) and (520, 160), each with `ART.ground` at (0, +44) and its pictures at the offsets in Content; the gap: `ART.gapSlot` at (360, 160) with `ART.question` centred (hidden once filled); `ART.arrow` at (280, 160) and (440, 160) at alpha 0.35; `ART.ghostSlot` at (70, 160) and (650, 160) at alpha 0.
- Candidates: `makeTile` 150 × 130 with `ART.candidate` tokens and the panel's pictures drawn inside (same composition rules as the rail panels).
- `ART.clueRing` centred on the clue element's position in panel 1; `ART.showRing` behind the correct candidate; `ART.owl` at (640, 70) at 48 px during play.
- Caption `S("whatNext")` at (360, 282), 22 px `THEME.font.body` `THEME.colour.inkSoft`, `wordWrap` 480.
- Tap floors: candidates 150 × 130 (≥ 56); gaps 10 (candidates at pitch 160 with width 150 — acceptable, a mis-tap lands on a neighbour candidate, which is a normal tap). During a cue (≤ 1.6 s) candidates are `setEnabled(false)`.
- Keyboard: Tab across the three candidates; Enter taps.

## Content
Language-neutral (pictures only; the caption is the one string). Each story has five panels P0-P4; an item shows P1 and P3, the correct answer is P2, the "before" distractor is P0 and the "after" distractor is P4. A panel = a list of `[ART key, dx, dy, size]`; default one picture at (0, 0); two at (−28, 0) / (+28, 0); a small extra at (+40, −34). The clue element is the picture in P1 that the ring goes around.

| Story | P0 (before) | P1 (shown) | P2 (correct) | P3 (shown) | P4 (after) | Clue in P1 |
|---|---|---|---|---|---|---|
| Egg | `ART.picHen` (−20, 0), `ART.picEgg` (+30, +10) size 40 | `ART.picEgg` | `ART.picHatch` | `ART.picChick` | `ART.picHen` | the egg |
| Seed | `ART.picSeed` | `ART.picSprout` | `ART.picPlant` | `ART.picFlower` | `ART.picFlower`, `ART.picBee` (+40, −34) | the sprout |
| Rain | `ART.picSun` at 64 | `ART.picCloud` | `ART.picRain` | `ART.picUmbrella` | `ART.picRainbow` | the cloud |
| Caterpillar | `ART.picEgg` (−20, 0) size 40, `ART.picLeaf` (+30, +10) | `ART.picBug` (−20, 0), `ART.picLeaf` (+30, +10) | `ART.cocoon` (0, 0), `ART.picLeaf` (+30, +10) | `ART.picButterfly` | `ART.picButterfly` (−20, −10), `ART.picBlossom` (+30, +14) | the caterpillar |
| Snowman | `ART.picCloud` | `ART.picSnowCloud` | `ART.picSnowman` | `ART.picSun` (+40, −34), `ART.picSnowman` (−10, +6) size 48 | `ART.picSun` (+40, −34), `ART.picDrop` (−10, +20) | the snow cloud |
| Cake | `ART.picEgg` (−26, 0) size 48, `ART.picMilk` (+26, 0) | `ART.picBowl` | `ART.picCake` | `ART.picSlice` | `ART.picPlate` | the bowl |
| Ice cream | `ART.picIceCream` (−20, 0), `ART.picSnowflake` (+34, −24) | `ART.picIceCream` | `ART.picSun` (+40, −34), `ART.picIceCream` (−10, +4) | `ART.picSun` (+40, −34), `ART.picIceCream` (−10, +4) size 48, `ART.picDrop` (+20, +30) | `ART.picSun` (+40, −34), `ART.picDrop` (−10, +20) | the ice cream |
| Day | `ART.picMoon` | `ART.picSunrise` | `ART.picSun` at 64 | `ART.picSunset` | `ART.picMoon` | the sunrise |
| Rocket | `ART.picRocket` (0, +14), `ART.picFire` (0, +44) | `ART.picRocket` (0, +10) | `ART.picRocket` (0, −16), `ART.picCloud` (+36, +20) size 40 | `ART.picRocket` (−20, −30), `ART.picMoon` (+30, −20) size 48 | `ART.picFlag` (−10, −10), `ART.picMoon` (+30, −20) size 48 | the rocket |
| Apple | `ART.picTree` | `ART.picTree` (0, 0), `ART.picApple` (+26, −14) | `ART.picApple` (0, +24) at 64 | `ART.picBasket` (0, 0), `ART.picApple` (+20, −20) | `ART.picPie` | the apple |

Unrelated distractor pool (never from the item's story): `ART.picCar`, `ART.picBalloon`, `ART.picFish`, `ART.picBall`, `ART.picTrain`, `ART.picBoat` — two drawn at random per L1 item, one per L2 item, none at L3.

Level composition: L1 = P2 + 2 unrelated; L2 = P2 + 1 unrelated + one of P0/P4 (random); L3 = P2 + P0 + P4. Any story may appear at any level; the play list draws 10 stories without repeats (Rules); the correct candidate's slot never repeats twice running.

## Rules
- Item count: 10 (re-queued repeats replace unplayed items).
- Difficulty progression: 2 consecutive first-try correct → next level (cap L3).
- Adaptation: a wrong tap, or wrong first-try on 2 consecutive items → next item one level down (floor L1); a single miss re-queues the story after 2 intervening items.
- What happens on a correct answer: the candidate settles in the gap, `ANIM.arrowOn` on both arrows, `tone("correct")`, praise rotation ["well_done", "great_job", "excellent", "you_did_it", "keep_going"] on every first-try item, owl `ANIM.blink`, rail dot, next item after 900 ms.
- What happens on a wrong answer:
  - Unrelated panel (salience / not using the clues): 400 ms in the gap, `tone("nudge")`, back to the tray, `ART.clueRing` on the clue element in panel 1 for 1200 ms; candidates re-shuffle.
  - "Before" panel: 400 ms in the gap, `tone("nudge")`, `ANIM.ghostAway` to the left ghost slot and back.
  - "After" panel: the same to the right ghost slot.
  - Second wrong tap: the cue again + `ANIM.arrowPulse` + the show-me ring on the correct candidate; solved-with-help.
- Retry behaviour: attempt 1 → attempt 2 after the cue → attempt 3 with the show-me ring. No attempt 4; the story re-queues later.
- Finish condition: 10 items. No losing state, no clock.

## Strings
- `GameCore.t()` keys: `t("start")`, `t("question_x_of_y")`, `t("all_done")`, `t("play_again")`, `t("menu")`, `t("well_done")`, `t("great_job")`, `t("excellent")`, `t("you_did_it")`, `t("keep_going")`.
- Game-specific: `title` = "What Happened Next"; `whatNext` = "What happened next?".

## Sound
`tone("tap")` on a candidate tap; `tone("correct")` on a correct middle; `tone("nudge")` on a wrong one; `tone("tap", 4)` and `tone("tap", 8)` as the two arrows brighten; `tone("finish")` once. Silent under `?sound=off`. Nothing is spoken; the stories are pictures.

## Testing checklist
- [ ] Works in all 11 languages (chrome strings and the caption change; the stories are pictures).
- [ ] Works at narrow width (400-px iframe: both panels, the gap, both ghost slots and three candidates visible).
- [ ] Keyboard operable (Tab across the three candidates; Enter chooses).
- [ ] Never auto-starts.
- [ ] No losing state (wrong taps never end the session; the show-me ring always completes the item).
- [ ] Tapping the car for the egg story puts it in the gap briefly, returns it, and rings the egg in panel 1.
- [ ] Tapping the hatching chick fills the gap and lights the two arrows left to right.
- [ ] At the second level tapping the grown hen sends it, shrunk, to the slot right of panel 3 and back.
- [ ] At the third level all three candidates come from the same story and only the middle one stays in the gap.
- [ ] After two wrong taps the arrows pulse and the correct candidate gains a pulsing outline.
- [ ] Candidates re-shuffle after a wrong tap; the correct one is never in the same slot twice running.
- [ ] A missed story comes back two items later.
- [ ] The finish screen shows the last two stories as three-panel strips with arrows and no score.
- [ ] With `?sound=off` nothing is audible.
