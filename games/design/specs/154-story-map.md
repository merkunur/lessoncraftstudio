# 154 — Story Map

## Identity
- Slug: `story-map`
- Subject / topic: Literacy / story structure — identifying the main character (WHO) and the setting (WHERE) of a three-panel picture story
- Age band: `6-8`
- Interaction pattern: `P2` — tap to place (select a picture from the tray, then tap the WHO or WHERE slot of the map), judged per placement
- Estimated build size: ~480 lines

Shared contract: `catalogue/BUILD-CONVENTIONS.md`. Pattern contract: `catalogue/PATTERNS.md` P2. Locale note: the stories are PICTURES (language-neutral); only the L3 captions are text and live in `LOCALE_DATA` — English authored in full, the other ten locales declared as needing a native caption set (en pilot; the pictures play unchanged). Character names in captions are the animals' kind names (Fox, Duck) — never people's names. Nothing is spoken.

## Learning
- Objective: After looking at a three-panel picture story, places the character who is in every panel into the WHO slot and the place framed in every panel into the WHERE slot of a story map, rejecting a character or place that appears only once.
- Prerequisites: Reads a three-panel picture story left to right (game 156 is the 5-6 sibling). Knows the P2 two-tap move (select, then destination). No reading at L1-L2; L3 captions are ≤ 8 words.
- Curriculum links: F-22 (reading short narrative texts with comprehension and retell by 8 in all twelve systems — "who and where" are the first retell elements), F-129 (literal recall fine at 6; picture-supported items), F-1 (comprehension in 5 of 15 sources), F-31 row "Read short text; retell/sequence; simple inference" — conservative 8, earliest 6 → 6-8 (US RL.1.3 "describe characters, settings, and major events"; England Y1-2 "discussing the sequence of events … and characters"; Germany Klasse 1-2 "Figuren und Ort einer Geschichte"; France CP "personnages et lieu"; Netherlands groep 3-4 "wie en waar"; Spain 1º ciclo "personajes y lugar"; Brazil EF12LP18; Sweden åk 1-3 "berättelsens personer och miljö"; Finland 1.-2. luokka "henkilöt ja tapahtumapaikka").
- Common misconceptions (F-129), each with this game's response:
  1. **Picks the most striking or most recent character (the visitor in panel 2 or 3) as the main character — salience over story.** Response: a wrong character lands in the WHO slot for 800 ms while the three panels are checked in turn (`ANIM.check`, 300 ms apart): a panel that CONTAINS that character glows (`ART.panelGlow`), a panel that does not dims to alpha 0.5 — the child sees "only in one picture"; the tile then glides back to the tray. The main character is in all three panels by construction.
  2. **Takes a place that is pictured inside a scene (a house the character looks at) as the setting.** Response: the setting is the framed badge in every panel's corner (`ART.settingFrame`); a wrong place lands in the WHERE slot for 800 ms while the panels are checked the same way (glow where that place is drawn, dim where it is not) and all three corner frames pulse (`ANIM.pulse`) — "the frame tells where"; the tile glides back.
  3. **Confusing WHO and WHERE (puts a character in the WHERE slot).** Response: structural — each slot accepts only its own kind: a character tile tapped onto the WHERE slot springs back (`ANIM.nudge`, no message, F-61) and the slot's icon (`ART.whoIcon` paw / `ART.whereIcon` pin) `ANIM.pulse`s; nothing is judged.
  4. **Answers from one panel instead of integrating all three (F-129: does not integrate across the story).** Response: L3 puts the secondary character and the pictured place in TWO of the three panels, so only checking all three decides; the panel-check cue shows exactly which panels agree.
  5. **Guessing by tapping tray tiles in turn.** Response: a wrong placement costs an 800 ms check before the tile returns, and after two wrong placements in the same slot the correct tile gains the show-me ring; a brute-forced item never counts as first-try (F-65).

## How it plays
1. **Start screen**: title "Story Map", the chipmunk (`ART.chipmunk`) at (360, 200), Start, picker.
2. **Item 1 (L1: Fox at the pond)**: rail of 10 dots (§6) at y = 28; `t("question_x_of_y")` at (360, 48). Zone A: three panels (`ART.panel`, 180 × 150) at x = 160 / 360 / 560, y = 150, appearing one after another 400 ms apart (`ANIM.appear`). Each panel: the setting badge in a small frame (`ART.settingFrame`, 40 × 40) at the panel's top-left (−70, −55) holding `ART.picPond` at 26 px; the main character (`ART.picFox`, 52 px) at (−30, +12); the panel's object (`ART.picFish` / `ART.picBoat` / `ART.picSun`, 44 px) at (+40, +12). Zone B: the story map (`ART.mapCard`, 300 × 160) at (200, 380) with two slots: the WHO slot (`ART.slot`, 100 × 100, dashed) at (140, 385) with `ART.whoIcon` at its top-left (−38, −38) and the WHERE slot at (260, 385) with `ART.whereIcon`. The tray on the right: four tiles (`ART.trayTile`, 96 × 96) at x = 476 / 584, y = 320 / 430 holding `ART.picFox`, `ART.picBear`, `ART.picPond`, `ART.picForest` at 56 px, positions shuffled. Caption `S("whoWhere")` ("Who is it about? Where is it?") at (360, 262), 22 px `THEME.font.body` `THEME.colour.inkSoft`. The chipmunk sits at (60, 470).
3. **Placing**: tap a tray tile (it lifts: `api.setSelected(true)`, `ANIM.lift`, `tone("tap")`), then tap a slot:
   - **Right kind, right answer** (`ART.picFox` → WHO): the tile glides into the slot (`ANIM.glide`) and stays; `tone("correct")`; all three panels ring the fox (`ART.panelRing` around the character spot in each panel, `ANIM.ringIn`) for 900 ms — "in every picture".
   - **Right kind, wrong answer** (`ART.picBear` → WHO): the tile glides in, then the panel check runs (`ANIM.check`: panels containing the bear glow, others dim, 300 ms apart), `tone("nudge")`, the tile glides back to its tray spot. Counts as a wrong placement for that slot.
   - **Wrong kind** (`ART.picPond` → WHO): the tile springs back at once (`ANIM.nudge`), the slot's icon `ANIM.pulse`s; no sound beyond `tone("tap")`; not counted.
   - Tapping a placed tile returns it to the tray (undo, free) unless the item is complete. Tapping a second tray tile before a slot switches the selection.
   - **Second wrong placement in the same slot**: the check again, then the correct tray tile gains `ART.hintRing` (`ANIM.showMe`) — the show-me; placing it completes that slot as solved-with-help.
4. **Item complete** (both slots correct): the map glows (`ART.mapGlow`, `ANIM.glow`), the panels light 1-2-3 (`ANIM.readBack`), praise pop if no wrong placement, the chipmunk `ANIM.hop`; rail dot; next item after 900 ms.
5. **Items 2-10**: per Content/Rules. L1 four tray tiles (2 characters, 2 places; the distractors never appear in the story); L2 six tiles (3 + 3; a visiting character in ONE panel and a place drawn inside ONE scene are the distractors), tray in a 3 × 2 grid; L3 six tiles, the visitor and the pictured place appear in TWO panels each, and each panel carries a one-line caption (≤ 8 words).
6. **Re-queue** (F-41): an item with any wrong placement re-enters after 2 intervening items; the count stays 10.
7. **Finish**: `t("all_done")` (360, 110); the chipmunk (360, 200) `ANIM.celebrate`; the summary = the ten completed maps as small chips (`ART.mapChip`, 120 × 48: the WHO picture and the WHERE picture side by side at 28 px) in two rows of five from y = 330 (x = 120 + i × 120) with `ART.dotFull` at the chip's left for first-try items and `ART.dotEmpty` for helped ones; `play_again` (250, 510), `menu` (470, 510); `tone("finish")`.

Session ≈ 6 minutes.

## Art registry
```js
const ART = {
  chipmunk:     { kind: "emoji", value: "🐿️", size: 80 },                     // mascot (Unicode 7)
  panel:        { kind: "shape", shape: "roundRect", w: 180, h: 150, fill: "surface", stroke: "structure", strokeWidth: 3, radius: 14 },
  settingFrame: { kind: "shape", shape: "roundRect", w: 40, h: 40, fill: "structureSoft", stroke: "structure", strokeWidth: 2, radius: 8 },   // holds the setting picture at 26 px
  panelGlow:    { kind: "shape", shape: "roundRect", w: 192, h: 162, fill: "structureSoft", radius: 18 },   // behind a panel, alpha 0 → 1 → 0
  panelRing:    { kind: "shape", shape: "circle", r: 34, stroke: "accent", strokeWidth: 4 },                // around the character spot / setting frame in a panel
  caption:      { kind: "text",  value: "", size: 16, font: "body", color: "inkSoft" },                       // L3 only, under a panel
  mapCard:      { kind: "shape", shape: "roundRect", w: 300, h: 160, fill: "surface", stroke: "line", strokeWidth: 2, radius: 16 },
  mapGlow:      { kind: "shape", shape: "roundRect", w: 316, h: 176, fill: "structureSoft", radius: 20 },
  slot:         { kind: "shape", shape: "roundRect", w: 100, h: 100, fill: "surface2", stroke: "line", strokeWidth: 2, radius: 12 },   // dashed (lineDash [8,6]) while empty; solid structure stroke when filled
  whoIcon:      { kind: "emoji", value: "🐾", size: 24 },                      // WHO slot marker (paw prints)
  whereIcon:    { kind: "emoji", value: "📍", size: 24 },                      // WHERE slot marker (pin)
  trayTile:     { kind: "shape", shape: "roundRect", w: 96, h: 96, fill: "surface", stroke: "line", strokeWidth: 2, radius: 12 },
  hintRing:     { kind: "shape", shape: "roundRect", w: 108, h: 108, stroke: "structure", strokeWidth: 4, radius: 16 },
  mapChip:      { kind: "shape", shape: "roundRect", w: 120, h: 48, fill: "structureSoft", stroke: "structure", strokeWidth: 1, radius: 8 },
  dotEmpty:     { kind: "shape", shape: "circle", r: 8, stroke: "line", strokeWidth: 2 },
  dotFull:      { kind: "shape", shape: "circle", r: 8, fill: "structure" },
  // characters
  picFox:       { kind: "emoji", value: "🦊", size: 56 },   // Fox
  picBear:      { kind: "emoji", value: "🐻", size: 56 },   // Bear
  picRabbit:    { kind: "emoji", value: "🐰", size: 56 },   // Rabbit
  picDuck:      { kind: "emoji", value: "🦆", size: 56 },   // Duck
  picFrog:      { kind: "emoji", value: "🐸", size: 56 },   // Frog
  picMouse:     { kind: "emoji", value: "🐭", size: 56 },   // Mouse
  picOwl:       { kind: "emoji", value: "🦉", size: 56 },   // Owl
  picCat:       { kind: "emoji", value: "🐱", size: 56 },   // Cat
  picDog:       { kind: "emoji", value: "🐶", size: 56 },   // Dog
  picPig:       { kind: "emoji", value: "🐷", size: 56 },   // Pig
  picHen:       { kind: "emoji", value: "🐔", size: 56 },   // Hen
  picBee:       { kind: "emoji", value: "🐝", size: 56 },   // Bee
  // places (settings and pictured places)
  picPond:      { kind: "emoji", value: "🌊", size: 56 },   // pond (water)
  picForest:    { kind: "emoji", value: "🌲", size: 56 },   // forest (evergreen tree)
  picHouse:     { kind: "emoji", value: "🏠", size: 56 },   // house / home
  picBeach:     { kind: "emoji", value: "🏖️", size: 56 },   // beach (Unicode 7)
  picMountain:  { kind: "emoji", value: "⛰️", size: 56 },   // mountain
  picGarden:    { kind: "emoji", value: "🌷", size: 56 },   // garden (tulip)
  picFarm:      { kind: "emoji", value: "🚜", size: 56 },   // farm (tractor)
  picCamp:      { kind: "emoji", value: "⛺", size: 56 },   // camp (tent)
  // objects inside scenes
  picFish:      { kind: "emoji", value: "🐟", size: 44 },   // fish
  picBoat:      { kind: "emoji", value: "⛵", size: 44 },   // boat
  picSun:       { kind: "emoji", value: "☀️", size: 44 },   // sun
  picCarrot:    { kind: "emoji", value: "🥕", size: 44 },   // carrot
  picFlower:    { kind: "emoji", value: "🌸", size: 44 },   // flower
  picUmbrella:  { kind: "emoji", value: "☂️", size: 44 },   // umbrella
  picShell:     { kind: "emoji", value: "🐚", size: 44 },   // shell
  picBall:      { kind: "emoji", value: "⚽", size: 44 },   // ball
  picHoney:     { kind: "emoji", value: "🍯", size: 44 },   // honey
  picNut:       { kind: "emoji", value: "🥜", size: 44 },   // nut
  picBed:       { kind: "emoji", value: "🛏️", size: 44 },   // bed
  picCheese:    { kind: "emoji", value: "🧀", size: 44 },   // cheese
  picBook:      { kind: "emoji", value: "📕", size: 44 },   // book
  picEgg:       { kind: "emoji", value: "🥚", size: 44 },   // egg
  picMoon:      { kind: "emoji", value: "🌙", size: 44 },   // moon
  picApple:     { kind: "emoji", value: "🍎", size: 44 },   // apple
  picCake:      { kind: "emoji", value: "🎂", size: 44 }    // cake
};
```
All emoji are Unicode 9 or older; no fallbacks needed. The same place key is drawn at 26 px inside `ART.settingFrame` and at 56 px on a tray tile.

## Animation registry
```js
const ANIM = {
  lift:      { y: "-=8", scale: 1.06, duration: 120, ease: "Sine.Out", trigger: "tray tile selected" },
  glide:     { duration: 260, ease: "Sine.InOut", trigger: "tile to a slot / back to its tray spot (x,y at call)" },
  nudge:     { x: "+=10", duration: 80, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "wrong-kind placement springs back" },
  check:     { alpha: 1, duration: 200, ease: "Sine.Out", yoyo: true, hold: 500, trigger: "panelGlow behind each panel that contains the tapped picture, 300 ms apart from panel 1; panels without it are set to alpha 0.5 for the same span" },
  ringIn:    { alpha: 1, scale: 1, duration: 200, ease: "Back.Out", yoyo: true, hold: 900, trigger: "panelRing in all three panels on a correct placement (from alpha 0, scale 0.6)" },
  pulse:     { scale: 1.15, duration: 300, ease: "Sine.InOut", yoyo: true, repeat: 2, trigger: "all three settingFrames after a wrong place; a slot icon after a wrong-kind placement" },
  readBack:  { alpha: 0.4, duration: 150, ease: "Sine.InOut", yoyo: true, trigger: "each panel in turn, 300 ms apart, on completion" },
  glow:      { alpha: 1, duration: 260, ease: "Sine.Out", yoyo: true, trigger: "mapGlow on completion (from alpha 0)" },
  hop:       { y: "-=14", duration: 150, ease: "Sine.Out", yoyo: true, repeat: 1, trigger: "chipmunk on completion" },
  appear:    { alpha: 1, scale: 1, duration: 200, ease: "Back.Out", trigger: "panels one by one (400 ms apart), then map and tray (from alpha 0, scale 0.6)" },
  showMe:    { alpha: 1, duration: 500, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "hintRing on the correct tray tile (from alpha 0.2)" },
  celebrate: { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "finish chipmunk" }
};
```

## Screen layout
```
y   0 ┌──────────────────────────────────────────────────────────────┐
      │ [lang]        ○ ○ ○ ○ ○ ○ ○ ○ ○ ○  rail y=28; "3 of 10" y=48    │  zone T
 56   ├──────────────────────────────────────────────────────────────┤
      │  ┌[pond]──────┐   ┌[pond]──────┐   ┌[pond]──────┐            │
      │  │ fox   fish │   │ fox   boat │   │ fox   sun  │  panels    │  zone A
      │  └────────────┘   └────────────┘   └────────────┘  y=150     │
      │     x=160            x=360            x=560     (180×150)    │
      │   L3 captions under each panel at y=236 (16 px)              │
260   ├──────────────────────────────────────────────────────────────┤
      │      "Who is it about? Where is it?" (360,262)                │
      │  ┌── map (200,380) 300×160 ──┐     [fox ] [bear]  y=320       │  zone B
      │  │ paw[ WHO ]  pin[ WHERE ]  │     [pond] [tree]  y=430       │
      │  │   (140,385)   (260,385)   │     x=476  x=584  (96×96)      │
      │  └───────────────────────────┘   L2/L3: 3×2 at x=420/528/636 │
480   ├──────────────────────────────────────────────────────────────┤
      │ chipmunk (60,470)                                             │  zone C
560   └──────────────────────────────────────────────────────────────┘
```
Fixed layout, FIT scaling.

## Visual specification
- Background `THEME.colour.bg`; rail per §6: 10 × `ART.dotEmpty` (x = 261 + i × 22) → `ART.dotFull`; `t("question_x_of_y")` at (360, 48).
- Panels: `ART.panel` at (160 / 360 / 560, 150); inside each, relative to its centre: `ART.settingFrame` at (−70, −55) with the setting picture at 26 px; the main character at (−30, +12) at 52 px; the object at (+40, +12) at 44 px; when a panel holds a visiting character it is drawn at (+40, +12) and the object moves to (+40, −40) at 36 px; when a panel holds a pictured place it is drawn at (+62, −40) at 32 px. L3 `ART.caption` centred under the panel at (x, 236), `wordWrap` 176, max 2 lines. `ART.panelGlow` behind each panel at alpha 0; `ART.panelRing` around the character spot (−30, +12) or the setting frame.
- Map: `ART.mapCard` at (200, 380); slots as `makeTile` 100 × 100 with `ART.slot` tokens (dashed while empty) at (140, 385) and (260, 385); `ART.whoIcon` / `ART.whereIcon` at each slot's (−38, −38); a placed tile's picture is drawn at 56 px in the slot; `ART.mapGlow` behind the map at alpha 0.
- Tray: `makeTile` 96 × 96 with `ART.trayTile` tokens, picture 56 px; L1 2 × 2 at x = 476 / 584, y = 320 / 430; L2-L3 3 × 2 at x = 420 / 528 / 636, y = 320 / 430. `ART.hintRing` behind a tray tile.
- `ART.chipmunk` at (60, 470) at 56 px. Tap floors: slots 100, tray 96 (≥ 56). Gaps ≥ 12.
- Keyboard: Tab walks the tray tiles (row-major) then the two slots; Enter selects / places / returns.

## Content
Picture stories are language-neutral. `CONTENT` = `{ L1: [...], L2: [...], L3: [...] }`; an item = `{ setting, who, panels: [{ obj, visitor?, place? }, …3], trayWho: [3 keys], trayWhere: [3 keys], captions: { en: [3 strings] } }` (L1 trays hold 2 + 2). `who` and `setting` are the answers; every other tray key is a distractor. Captions (L3 only) are language-bound: `LOCALE_DATA[lang].captions[itemId]`; **other locales: a native caption set is required — en pilot** (English captions show until then; the pictures play unchanged).

- **L1** (the distractor character and place never appear in the story):
  1. setting `ART.picPond`, who `ART.picFox`; panels: fish · boat · sun; trayWho [`ART.picFox`, `ART.picBear`]; trayWhere [`ART.picPond`, `ART.picForest`]
  2. setting `ART.picGarden`, who `ART.picRabbit`; panels: carrot · flower · umbrella; trayWho [`ART.picRabbit`, `ART.picDuck`]; trayWhere [`ART.picGarden`, `ART.picBeach`]
  3. setting `ART.picBeach`, who `ART.picDuck`; panels: shell · ball · boat; trayWho [`ART.picDuck`, `ART.picFrog`]; trayWhere [`ART.picBeach`, `ART.picMountain`]
  4. setting `ART.picForest`, who `ART.picBear`; panels: honey · nut · bed; trayWho [`ART.picBear`, `ART.picOwl`]; trayWhere [`ART.picForest`, `ART.picHouse`]
  5. setting `ART.picHouse`, who `ART.picMouse`; panels: cheese · book · bed; trayWho [`ART.picMouse`, `ART.picCat`]; trayWhere [`ART.picHouse`, `ART.picPond`]
  6. setting `ART.picFarm`, who `ART.picPig`; panels: apple · sun · bed; trayWho [`ART.picPig`, `ART.picBear`]; trayWhere [`ART.picFarm`, `ART.picBeach`]
- **L2** (a visitor in ONE panel; a pictured place inside ONE scene):
  7. setting `ART.picPond`, who `ART.picFrog`; panels: fish · (visitor `ART.picDuck`) · boat + (place `ART.picHouse`); trayWho [`ART.picFrog`, `ART.picDuck`, `ART.picPig`]; trayWhere [`ART.picPond`, `ART.picHouse`, `ART.picForest`]
  8. setting `ART.picFarm`, who `ART.picHen`; panels: egg · (visitor `ART.picPig`) · flower + (place `ART.picGarden`); trayWho [`ART.picHen`, `ART.picPig`, `ART.picCat`]; trayWhere [`ART.picFarm`, `ART.picGarden`, `ART.picBeach`]
  9. setting `ART.picForest`, who `ART.picOwl`; panels: moon · (visitor `ART.picMouse`) · nut + (place `ART.picCamp`); trayWho [`ART.picOwl`, `ART.picMouse`, `ART.picFox`]; trayWhere [`ART.picForest`, `ART.picCamp`, `ART.picBeach`]
  10. setting `ART.picHouse`, who `ART.picCat`; panels: ball + (place `ART.picGarden`) · (visitor `ART.picDog`) · cake; trayWho [`ART.picCat`, `ART.picDog`, `ART.picRabbit`]; trayWhere [`ART.picHouse`, `ART.picGarden`, `ART.picPond`]
- **L3** (visitor in TWO panels, pictured place in TWO panels, captions):
  11. setting `ART.picHouse`, who `ART.picCat`; panels: ball · (visitor `ART.picDog`, place `ART.picForest`) · (visitor `ART.picDog`, place `ART.picForest`) + honey; trayWho [`ART.picCat`, `ART.picDog`, `ART.picMouse`]; trayWhere [`ART.picHouse`, `ART.picForest`, `ART.picPond`]; captions en: "Cat plays with a ball." / "Dog comes to see Cat." / "They look at the far trees."
  12. setting `ART.picGarden`, who `ART.picBee`; panels: flower + (place `ART.picPond`) · (visitor `ART.picRabbit`, place `ART.picPond`) · (visitor `ART.picRabbit`) + honey; trayWho [`ART.picBee`, `ART.picRabbit`, `ART.picHen`]; trayWhere [`ART.picGarden`, `ART.picPond`, `ART.picFarm`]; captions en: "Bee finds a flower by the water." / "Rabbit hops over to drink." / "Bee gives Rabbit some honey."
  13. setting `ART.picBeach`, who `ART.picDuck`; panels: shell + (place `ART.picMountain`) · (visitor `ART.picFrog`, place `ART.picMountain`) · (visitor `ART.picFrog`) + ball; trayWho [`ART.picDuck`, `ART.picFrog`, `ART.picOwl`]; trayWhere [`ART.picBeach`, `ART.picMountain`, `ART.picHouse`]; captions en: "Duck finds a shell." / "Frog hops over to Duck." / "Duck and Frog play ball."
  14. setting `ART.picCamp`, who `ART.picBear`; panels: apple + (place `ART.picMountain`) · (visitor `ART.picFox`, place `ART.picMountain`) · (visitor `ART.picFox`) + moon; trayWho [`ART.picBear`, `ART.picFox`, `ART.picRabbit`]; trayWhere [`ART.picCamp`, `ART.picMountain`, `ART.picFarm`]; captions en: "Bear eats an apple at the tent." / "Fox comes to sit with Bear." / "They watch the moon rise."

Object keys used in panels: `ART.picFish`, `ART.picBoat`, `ART.picSun`, `ART.picCarrot`, `ART.picFlower`, `ART.picUmbrella`, `ART.picShell`, `ART.picBall`, `ART.picHoney`, `ART.picNut`, `ART.picBed`, `ART.picCheese`, `ART.picBook`, `ART.picEgg`, `ART.picMoon`, `ART.picApple`, `ART.picCake`. Every caption ≤ 8 words. Play list: 10 items per Rules; shuffled within level; tray positions shuffled per item; no item repeats except by re-queue.

## Rules
- Item count: 10 (re-queued repeats replace unplayed items); each item = 2 placements.
- Difficulty progression: 2 consecutive items completed with no wrong placement → next level (cap L3).
- Adaptation: an item with a wrong placement, or wrong first-try on 2 consecutive items → next item one level down (floor L1); a single miss re-queues the item after 2 intervening items.
- What happens on a correct answer: each correct placement lands with `tone("correct")` and `ART.panelRing` in all three panels; on completion `ANIM.glow` + `ANIM.readBack`, praise rotation ["well_done", "great_job", "excellent", "you_did_it", "keep_going"] on every item completed with no wrong placement, chipmunk `ANIM.hop`, rail dot, next item after 900 ms.
- What happens on a wrong answer:
  - Wrong character in WHO (visitor / never-seen / most recent): the tile sits in the slot while the panels are checked (glow where present, dim where absent), `tone("nudge")`, the tile returns.
  - Wrong place in WHERE (a place drawn inside a scene, or never seen): the check + all three setting frames pulse, `tone("nudge")`, the tile returns.
  - Wrong kind in a slot: springs back, slot icon pulses, no count.
  - Second wrong placement in the same slot: the check + `ART.hintRing` on the correct tray tile (show-me); solved-with-help.
- Retry behaviour: per slot: attempt 1 → attempt 2 after the check → the ringed tile (no attempt 4). Undo of a placed tile is free before completion.
- Finish condition: 10 items. No losing state, no clock.

## Strings
- `GameCore.t()` keys: `t("start")`, `t("question_x_of_y")`, `t("all_done")`, `t("play_again")`, `t("menu")`, `t("well_done")`, `t("great_job")`, `t("excellent")`, `t("you_did_it")`, `t("keep_going")`.
- Game-specific: `title` = "Story Map"; `whoWhere` = "Who is it about? Where is it?". L3 captions are content from `LOCALE_DATA`.

## Sound
`tone("tap")` on selecting a tile; `tone("correct")` on a correct placement; `tone("nudge")` on a wrong placement; `tone("finish")` once. Silent under `?sound=off`. Captions are never read aloud.

## Testing checklist
- [ ] Works in all 11 languages (chrome strings change; L1-L2 stories are identical in every language; `?lang=sv` shows the English L3 captions until a Swedish set exists and nothing breaks).
- [ ] Works at narrow width (400-px iframe: three panels, the map, both slots and all six tray tiles visible and separate).
- [ ] Keyboard operable (Tab across the tray then the two slots; Enter selects, places and returns).
- [ ] Never auto-starts.
- [ ] No losing state (any number of returned tiles still ends with both slots filled; the hint ring always names the right tile).
- [ ] The three panels appear one after another, and the same small framed picture sits in every panel's corner.
- [ ] Placing the bear in the WHO slot of the fox story makes all three panels dim (the bear is in none), then the bear returns to the tray.
- [ ] Placing the pond in the WHO slot springs it back and makes the paw icon pulse; nothing else happens.
- [ ] Placing the fox in the WHO slot rings the fox in all three panels and the tile stays.
- [ ] At the second level, placing the house (drawn inside one scene) in WHERE lights only that panel and pulses the three corner frames.
- [ ] Tapping a placed tile before the item completes returns it to the tray.
- [ ] Two clean items in a row bring a story with a visitor; a wrong placement brings a simpler story next.
- [ ] The finish screen shows ten who/where chips with filled or hollow dots and no score.
- [ ] With `?sound=off` nothing is audible.
