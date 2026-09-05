# 156 — Who Did It

## Identity
- Slug: `who-did-it`
- Subject / topic: Literacy / literal recall from a picture story — remembering which character did the named thing in a three-panel picture story
- Age band: `5-6`
- Interaction pattern: `P1` — tap one of N
- Estimated build size: ~420 lines

Shared contract: `catalogue/BUILD-CONVENTIONS.md`. Pattern contract: `catalogue/PATTERNS.md` P1. Band note: **no instruction text anywhere on the play screen** — the story is three pictures that appear one after another, the question is a picture (a question glyph + the thing asked about), and the answers are three character tiles ≥ 80 px. Language-neutral by construction (pictures only, F-22 comprehension-as-concept; F-7); no `LOCALE_DATA` is needed. Nothing is spoken.

## Learning
- Objective: After watching a three-panel picture story in which each character does one thing, taps the character who had the thing (or was at the place) shown in the picture question.
- Prerequisites: None beyond following three pictures left to right. No reading, no letters, no numerals.
- Curriculum links: F-22 (reading short narrative texts with comprehension, retell and sequence by 8 in all twelve systems — picture stories are its pre-reading form), F-129 ("literal recall fine" at 6 — this game trains exactly the literal-recall layer with picture support), F-7 (comprehension-as-concept transfers to all 11 languages), F-40 (cued recognition with immediate feedback is the retrieval format that works at 5-6), F-31 row "Read short text; retell/sequence" — the picture-story precursor is in every system's pre-primary year (US RL.K.3 "identify characters, settings, and major events … with prompting"; England Reception ELG "retell stories"; Germany Vorschule Bilderbuchbetrachtung; France GS "raconter une histoire à partir d'images"; Netherlands groep 1-2 "prentenboeken"; Spain Infantil "comprensión de cuentos"; Brazil EI03EF04; Sweden förskoleklass "berättande"; Finland esiopetus "kuvasta kertominen").
- Common misconceptions (F-129, F-101), each with this game's response:
  1. **Recency — taps the character from the LAST panel whatever was asked.** Response: the asked object comes from panel 1 or 2 in two of every three items; on a wrong tap the panel that holds the asked thing REPLAYS (`ANIM.replay`: it scales up to 1.15 for 1200 ms while the object is ringed, then the character), so the child is shown where to look, not told.
  2. **Salience — taps the character that looks biggest or most interesting, or the one the child likes.** Response: the same replay; all three character tiles are drawn at the same size (64 px on 110 px tiles) and the tile order is shuffled per item.
  3. **Binding error — remembers the object and the character but pairs them wrongly (at L2 one character appears in two panels).** Response: L2 stories give one character two objects across two panels and the third panel to another character; the replay rings the OBJECT first, then the CHARACTER in the same panel, so the pairing is enacted.
  4. **Confusing "who had it" with "who was there" (L3 place questions).** Response: the question strip shows a place badge inside a small frame (`ART.placeFrame`) when the question is about a place and a bare object when it is about a thing; the replay rings the matching element in the panel.
  5. **Position habit.** Response: the correct tile's slot never repeats twice running (§13); at 5-6 tiles keep their positions after a wrong tap (the item counts as retried); the third attempt gets the show-me ring.

## How it plays
1. **Start screen**: title "Who Did It", the mouse detective (`ART.mouse`) at (360, 200) with the magnifier (`ART.lens`) at (410, 230), Start, picker.
2. **Item 1 (L1)**: rail of 8 dots (§6) at y = 28 (no numbers — 5-6 band). Zone A: three story panels (`ART.panel`, 170 × 140) at x = 170 / 360 / 550, y = 140, appearing one after another 900 ms apart (`ANIM.appear`, `tone("tap", k)` with k = panel number): panel 1 `ART.picFox` at (−30, 0) with `ART.picApple` at (+40, 0); panel 2 `ART.picBear` with `ART.picBall`; panel 3 `ART.picDuck` with `ART.picBook`. 600 ms after the third panel the question strip appears at (360, 236): `ART.qCard` (220 × 56) holding `ART.whoMark` ("?", 40 px, `THEME.colour.accent`) at (318, 236) and the asked object (`ART.picBall`, 40 px) at (392, 236). Zone B: three character tiles (`ART.charTile`, 110 × 110) at y = 380, x = 220 / 360 / 500 holding `ART.picFox`, `ART.picBear`, `ART.picDuck` at 64 px, shuffled; they enable when the question strip appears. The mouse sits at (60, 470) with the lens. No caption; no words.
3. **Answering**: the child taps a character tile.
   - **Correct** (`ART.picBear`): `ANIM.pop`, `tone("correct")`, praise pop (rotation); the asked panel glows (`ART.panelGlow`, `ANIM.glow`) and its character is ringed (`ART.charRing`, `ANIM.ringIn`); the mouse `ANIM.peer`; rail dot fills; next item after 800 ms.
   - **Wrong** (`ART.picFox`): `ANIM.nudge`, `tone("nudge")`, the tile de-selects and stays where it is; then the replay: the asked panel `ANIM.replay`s (scale 1.15 for 1200 ms) with `ART.objRing` around the object for the first 600 ms and `ART.charRing` around the character for the next 600 ms; tiles disabled during the replay. Attempt 2.
   - **Second wrong tap**: the replay again, then the show-me ring (`ART.showRing`, `ANIM.showMe`) on the correct tile; tapping it completes the item as solved-with-help (no praise pop; the glow and ring still play).
4. **Items 2-8**: per Content/Rules. L1 three characters, three things, a thing question; L2 one character in two panels (two things), another in the third, plus a never-seen character on the tiles; L3 each panel also carries a place badge in its corner (`ART.placeFrame` + place picture) and the question is about a place (the strip shows the framed place) or a thing.
5. **Re-queue** (F-41): an item wrong first-try re-enters after 2 intervening items with re-shuffled tiles; the count stays 8.
6. **Finish**: `t("all_done")` (360, 110); the mouse (360, 200) `ANIM.celebrate` with the lens; the summary = the eight answers as small chips (`ART.answerChip`, 110 × 48: the character at 28 px and the asked thing at 24 px side by side) in two rows of four from y = 330 (x = 195 + i × 110) — what the child remembered, no score (5-6 band); `play_again` (250, 510), `menu` (470, 510); `tone("finish")`.

Session ≈ 4-5 minutes (8 items × ~30 s including the story playing).

## Art registry
```js
const ART = {
  mouse:        { kind: "emoji", value: "🐭", size: 80 },                     // mascot (the detective)
  lens:         { kind: "emoji", value: "🔍", size: 40 },                     // the detective's magnifier
  panel:        { kind: "shape", shape: "roundRect", w: 170, h: 140, fill: "surface", stroke: "structure", strokeWidth: 3, radius: 14 },
  panelGlow:    { kind: "shape", shape: "roundRect", w: 182, h: 152, fill: "structureSoft", radius: 18 },   // behind the asked panel, alpha 0 → 1 → 0
  placeFrame:   { kind: "shape", shape: "roundRect", w: 40, h: 40, fill: "structureSoft", stroke: "structure", strokeWidth: 2, radius: 8 },   // holds a place picture at 26 px (L3 panels; the question strip)
  qCard:        { kind: "shape", shape: "roundRect", w: 220, h: 56, fill: "surface", stroke: "accent", strokeWidth: 3, radius: 14 },
  whoMark:      { kind: "text",  value: "?", size: 40, font: "display", color: "accent" },                // the question glyph
  charTile:     { kind: "shape", shape: "roundRect", w: 110, h: 110, fill: "surface", stroke: "line", strokeWidth: 2, radius: 16 },
  objRing:      { kind: "shape", shape: "circle", r: 32, stroke: "accent", strokeWidth: 4 },              // around the asked thing in its panel
  charRing:     { kind: "shape", shape: "circle", r: 38, stroke: "structure", strokeWidth: 4 },           // around the character in its panel
  showRing:     { kind: "shape", shape: "roundRect", w: 122, h: 122, stroke: "structure", strokeWidth: 4, radius: 20 },
  answerChip:   { kind: "shape", shape: "roundRect", w: 110, h: 48, fill: "structureSoft", stroke: "structure", strokeWidth: 1, radius: 8 },
  dotEmpty:     { kind: "shape", shape: "circle", r: 8, stroke: "line", strokeWidth: 2 },
  dotFull:      { kind: "shape", shape: "circle", r: 8, fill: "structure" },
  // characters
  picFox:       { kind: "emoji", value: "🦊", size: 64 },   // fox
  picBear:      { kind: "emoji", value: "🐻", size: 64 },   // bear
  picDuck:      { kind: "emoji", value: "🦆", size: 64 },   // duck
  picRabbit:    { kind: "emoji", value: "🐰", size: 64 },   // rabbit
  picFrog:      { kind: "emoji", value: "🐸", size: 64 },   // frog
  picOwl:       { kind: "emoji", value: "🦉", size: 64 },   // owl
  picCat:       { kind: "emoji", value: "🐱", size: 64 },   // cat
  picDog:       { kind: "emoji", value: "🐶", size: 64 },   // dog
  picPig:       { kind: "emoji", value: "🐷", size: 64 },   // pig
  picHen:       { kind: "emoji", value: "🐔", size: 64 },   // hen
  picMonkey:    { kind: "emoji", value: "🐒", size: 64 },   // monkey
  picCow:       { kind: "emoji", value: "🐮", size: 64 },   // cow
  // things (each has an unambiguous English name)
  picApple:     { kind: "emoji", value: "🍎", size: 48 },   // apple
  picBall:      { kind: "emoji", value: "⚽", size: 48 },   // ball
  picBook:      { kind: "emoji", value: "📕", size: 48 },   // book
  picBalloon:   { kind: "emoji", value: "🎈", size: 48 },   // balloon
  picCarrot:    { kind: "emoji", value: "🥕", size: 48 },   // carrot
  picFish:      { kind: "emoji", value: "🐟", size: 48 },   // fish
  picHat:       { kind: "emoji", value: "🎩", size: 48 },   // hat
  picCake:      { kind: "emoji", value: "🎂", size: 48 },   // cake
  picUmbrella:  { kind: "emoji", value: "☂️", size: 48 },   // umbrella
  picDrum:      { kind: "emoji", value: "🥁", size: 48 },   // drum
  picFlower:    { kind: "emoji", value: "🌸", size: 48 },   // flower
  picKey:       { kind: "emoji", value: "🔑", size: 48 },   // key
  // places (L3 corner badges and place questions)
  picPond:      { kind: "emoji", value: "🌊", size: 48 },   // pond (water)
  picTree:      { kind: "emoji", value: "🌳", size: 48 },   // tree
  picHouse:     { kind: "emoji", value: "🏠", size: 48 },   // house
  picTent:      { kind: "emoji", value: "⛺", size: 48 }    // tent
};
```
All emoji are Unicode 9 or older; no fallbacks needed. Every picture is an object whose English name is unambiguous; no words appear on the play screen.

## Animation registry
```js
const ANIM = {
  appear:    { alpha: 1, scale: 1, duration: 260, ease: "Back.Out", trigger: "each panel in turn (900 ms apart), then the question strip and tiles (from alpha 0, scale 0.6)" },
  pop:       { scale: 1.12, duration: 140, ease: "Back.Out", yoyo: true, trigger: "correct tile" },
  nudge:     { x: "+=10", duration: 80, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "wrong tile" },
  replay:    { scale: 1.15, duration: 250, ease: "Sine.Out", yoyo: true, hold: 1200, trigger: "the asked panel after a wrong tap" },
  ringIn:    { alpha: 1, scale: 1, duration: 200, ease: "Back.Out", yoyo: true, hold: 600, trigger: "objRing (first 600 ms of a replay), then charRing (next 600 ms); charRing alone on a correct answer (from alpha 0, scale 0.6)" },
  glow:      { alpha: 1, duration: 250, ease: "Sine.Out", yoyo: true, hold: 500, trigger: "panelGlow behind the asked panel on a correct answer (from alpha 0)" },
  peer:      { angle: 12, duration: 200, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "mouse on a correct answer" },
  showMe:    { alpha: 1, duration: 500, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "showRing on the correct tile (from alpha 0.2)" },
  celebrate: { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "finish mouse" }
};
```
No flashing: `showMe` cycles at 1 Hz; nothing else repeats. No decorative motion while the child thinks (F-42) — the panels stay still once shown.

## Screen layout
```
y   0 ┌──────────────────────────────────────────────────────────────┐
      │ [lang]            ○ ○ ○ ○ ○ ○ ○ ○  rail y=28                   │  zone T
 56   ├──────────────────────────────────────────────────────────────┤
      │  ┌───────────┐    ┌───────────┐    ┌───────────┐              │
      │  │ fox  apple│    │ bear  ball│    │ duck  book│  panels y=140│  zone A
      │  └───────────┘    └───────────┘    └───────────┘  (170×140)   │
      │     x=170            x=360            x=550                   │
      │                 [  ?   ball  ]  question strip (360,236)      │
260   ├──────────────────────────────────────────────────────────────┤
      │        [ fox ]      [ bear ]      [ duck ]   tiles y=380      │  zone B
      │        x=220        x=360        x=500      (110×110)         │
480   ├──────────────────────────────────────────────────────────────┤
      │ mouse + lens (60,470)                                         │  zone C
560   └──────────────────────────────────────────────────────────────┘
```
Fixed layout, FIT scaling. L3 panels carry `ART.placeFrame` at their top-left (−65, −50).

## Visual specification
- Background `THEME.colour.bg`; rail per §6: 8 × `ART.dotEmpty` (x = 283 + i × 22) → `ART.dotFull`; no `question_x_of_y` (5-6).
- Panels: `ART.panel` at (170 / 360 / 550, 140); inside each, relative to its centre: the character at (−30, 0) at 56 px, the thing at (+40, 0) at 48 px; L3 adds `ART.placeFrame` at (−65, −50) with the place at 26 px. `ART.panelGlow` behind each at alpha 0; `ART.objRing` centred on the thing; `ART.charRing` centred on the character.
- Question strip: `ART.qCard` at (360, 236); `ART.whoMark` at (318, 236); the asked thing at (392, 236) at 40 px, or `ART.placeFrame` at (392, 236) with the asked place at 26 px.
- Tiles: `makeTile` 110 × 110 with `ART.charTile` tokens; character 64 px; `ART.showRing` behind the correct tile. `ART.mouse` at (60, 470) at 56 px with `ART.lens` at (92, 490) at 28 px.
- Tap floors: tiles 110 ≥ 80; gaps 30. Tiles are `setEnabled(false)` until the question strip is shown and during a replay.
- Keyboard: Tab across the three tiles; Enter taps.

## Content
Language-neutral (pictures only). `CONTENT` = `{ L1: [...], L2: [...], L3: [...] }`; an item = `{ panels: [{ who, thing, place? }, ×3], ask: { thing | place, panel }, tiles: [3 character keys] }` — `ask.panel` is the index (0-2) of the panel that answers; the correct tile is that panel's `who`.

- **L1** (three characters, three things; the question about one thing):
  1. panels: `ART.picFox` + `ART.picApple` · `ART.picBear` + `ART.picBall` · `ART.picDuck` + `ART.picBook`; ask `ART.picBall` (panel 2); tiles [`ART.picFox`, `ART.picBear`, `ART.picDuck`]
  2. panels: `ART.picRabbit` + `ART.picCarrot` · `ART.picFrog` + `ART.picUmbrella` · `ART.picOwl` + `ART.picHat`; ask `ART.picCarrot` (panel 1); tiles [`ART.picRabbit`, `ART.picFrog`, `ART.picOwl`]
  3. panels: `ART.picCat` + `ART.picFish` · `ART.picDog` + `ART.picBalloon` · `ART.picPig` + `ART.picCake`; ask `ART.picCake` (panel 3); tiles [`ART.picCat`, `ART.picDog`, `ART.picPig`]
  4. panels: `ART.picHen` + `ART.picFlower` · `ART.picMonkey` + `ART.picDrum` · `ART.picCow` + `ART.picKey`; ask `ART.picDrum` (panel 2); tiles [`ART.picHen`, `ART.picMonkey`, `ART.picCow`]
- **L2** (one character in two panels with two things; another in the third; a never-seen character on the tiles):
  5. panels: `ART.picFox` + `ART.picHat` · `ART.picFox` + `ART.picFish` · `ART.picBear` + `ART.picBalloon`; ask `ART.picFish` (panel 2); tiles [`ART.picFox`, `ART.picBear`, `ART.picRabbit`]
  6. panels: `ART.picDuck` + `ART.picUmbrella` · `ART.picCat` + `ART.picBook` · `ART.picCat` + `ART.picApple`; ask `ART.picUmbrella` (panel 1); tiles [`ART.picDuck`, `ART.picCat`, `ART.picOwl`]
  7. panels: `ART.picPig` + `ART.picCake` · `ART.picHen` + `ART.picKey` · `ART.picPig` + `ART.picDrum`; ask `ART.picKey` (panel 2); tiles [`ART.picPig`, `ART.picHen`, `ART.picDog`]
  8. panels: `ART.picMonkey` + `ART.picBall` · `ART.picMonkey` + `ART.picFlower` · `ART.picFrog` + `ART.picCarrot`; ask `ART.picFlower` (panel 2); tiles [`ART.picMonkey`, `ART.picFrog`, `ART.picCow`]
- **L3** (each panel has a place badge; the question is a place in two items and a thing in two):
  9. panels: `ART.picBear` + `ART.picFish` @ `ART.picPond` · `ART.picOwl` + `ART.picBook` @ `ART.picTree` · `ART.picRabbit` + `ART.picCake` @ `ART.picHouse`; ask place `ART.picTree` (panel 2); tiles [`ART.picBear`, `ART.picOwl`, `ART.picRabbit`]
  10. panels: `ART.picDog` + `ART.picBall` @ `ART.picHouse` · `ART.picDuck` + `ART.picUmbrella` @ `ART.picPond` · `ART.picFox` + `ART.picApple` @ `ART.picTent`; ask place `ART.picPond` (panel 2); tiles [`ART.picDog`, `ART.picDuck`, `ART.picFox`]
  11. panels: `ART.picCat` + `ART.picHat` @ `ART.picTent` · `ART.picPig` + `ART.picDrum` @ `ART.picTree` · `ART.picHen` + `ART.picKey` @ `ART.picPond`; ask `ART.picHat` (panel 1); tiles [`ART.picCat`, `ART.picPig`, `ART.picHen`]
  12. panels: `ART.picMonkey` + `ART.picBalloon` @ `ART.picTree` · `ART.picCow` + `ART.picFlower` @ `ART.picHouse` · `ART.picFrog` + `ART.picCarrot` @ `ART.picPond`; ask place `ART.picHouse` (panel 2); tiles [`ART.picMonkey`, `ART.picCow`, `ART.picFrog`]

Across every level, the asked panel is panel 3 in at most one item of three (recency guard). Play list: 8 items per Rules; shuffled within level; no item repeats except by re-queue; tile order shuffled per item; the correct slot never repeats twice running.

## Rules
- Item count: 8 (re-queued repeats replace unplayed items).
- Difficulty progression: 2 consecutive first-try correct → next level (cap L3).
- Adaptation: a wrong tap, or wrong first-try on 2 consecutive items → next item one level down (floor L1); a single miss re-queues the item after 2 intervening items.
- Inactivity cue (never a clock, nothing ends): if 8 s pass after the question strip with no tap, the asked panel `ANIM.replay`s once without rings; repeats every 8 s of inactivity.
- What happens on a correct answer: `ANIM.pop`, `tone("correct")`, praise rotation ["well_done", "great_job", "excellent", "you_did_it", "keep_going"] on every first-try item, the asked panel `ANIM.glow` + `ART.charRing`, mouse `ANIM.peer`, rail dot, next item after 800 ms.
- What happens on a wrong answer:
  - Last-panel character tapped (recency) or the biggest / favourite one (salience): nudge + `tone("nudge")`; the asked panel replays with the thing ringed, then the character ringed; tiles stay in place.
  - Wrong pairing at L2 (the character's OTHER panel remembered): the same replay — the object ring then the character ring enact the pairing.
  - Wrong character at an L3 place question: the same replay; the place badge in the panel is what the strip's framed place matches.
  - Second wrong tap: the replay again + the show-me ring on the correct tile.
- Retry behaviour: attempt 1 → attempt 2 after the replay → attempt 3 with the show-me ring; solved-with-help. No attempt 4; the item re-queues later. A brute-forced item never counts as first-try (F-65).
- Finish condition: 8 items. No losing state, no clock.

## Strings
- `GameCore.t()` keys: `t("start")`, `t("all_done")`, `t("play_again")`, `t("menu")`, `t("well_done")`, `t("great_job")`, `t("excellent")`, `t("you_did_it")`, `t("keep_going")`.
- Game-specific: `title` = "Who Did It". No words on the play screen; the question is `ART.whoMark` plus a picture.

## Sound
`tone("tap", k)` as each panel k appears (the story "plays" as three rising notes); `tone("correct")` on a correct tap; `tone("nudge")` on a wrong tap; `tone("tap")` when a replay starts; `tone("finish")` once. Silent under `?sound=off`. Nothing is spoken; the pictures carry the story.

## Testing checklist
- [ ] Works in all 11 languages (only the chrome strings change; the stories and the question glyph are identical in every language).
- [ ] Works at narrow width (400-px iframe: three panels, the question strip and three tiles visible and separate).
- [ ] Keyboard operable (Tab across the three tiles; Enter picks; tiles are not focusable until the question strip appears).
- [ ] Never auto-starts.
- [ ] No losing state (wrong taps never end the session; the show-me ring always completes the item).
- [ ] The three panels appear one after another with three rising notes; the question strip appears after the third.
- [ ] No word appears on the play screen — only pictures and the "?" glyph.
- [ ] Tapping the fox when the strip shows the ball nudges the fox tile, enlarges the bear's panel, rings the ball, then rings the bear; the tiles do not move.
- [ ] Tapping the bear pops it, lights the bear's panel and rings the bear.
- [ ] At the second level one character appears in two panels and a character not in the story is on a tile.
- [ ] At the third level each panel has a small framed place in its corner and the strip can show a framed place instead of a thing.
- [ ] The asked panel is not always the last one.
- [ ] The finish screen shows eight character/thing chips and no score or numbers.
- [ ] With `?sound=off` nothing is audible.
