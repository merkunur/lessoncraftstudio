# 061 — Sound Hunt

## Identity
- Slug: `sound-hunt`
- Subject / topic: Literacy / initial sound identification — finding every picture in a scene whose name starts with a shown letter's sound, then stating how many there were
- Age band: `5-6`
- Interaction pattern: `P3` — tap to count (tap each target picture once; a P1 numeral choice states the count)
- Estimated build size: ~460 lines

Shared contract: `catalogue/BUILD-CONVENTIONS.md`. Pattern contract: `catalogue/PATTERNS.md` P3 (each tap marks one object and plays one rising tone; the answer is a numeral tile). Locale note: **nothing is spoken** (no audio files). The target is a SHOWN letter and every "sound" is carried by a PICTURE whose name the child already knows (A-15). Word lists are language-bound (F-122: letter-name / sound mismatches differ per language) and live in `LOCALE_DATA`; the mechanic is universal (F-217).

## Learning
- Objective: Given a letter shown large, taps every picture in a scene of eight whose name begins with that letter's sound, and then taps the numeral that says how many there were.
- Prerequisites: Knows the names of common pictured objects in the play language; can count to 4 by tapping (game 001). No reading; the letter is a visual anchor, not a word.
- Curriculum links: F-22 (phonological awareness — initial sounds — at 5-7 in all twelve systems; letter-sound correspondence 5-7), F-24 (letter-sound games are universal across the reading-method families), F-31 row "Letter names + sounds; initial sound" — conservative 6-7, earliest 4 → 5-6 (US RF.K.3.a; England Reception/Y1 phonics "say a sound for each letter"; Germany Klasse 1 Anlaute; France GS "discriminer des sons"; Spain Infantil conciencia fonológica; Brazil EF01LP05; Netherlands groep 2 "beginklank"; Sweden förskoleklass "ljud"; Finland esiopetus äänteet). Demand: F-7 (letter recognition / initial sound are universal-demand literacy topics).
- Common misconceptions (F-122, F-101, F-126), each with this game's response:
  1. **Letter NAME used as the sound (y read as /w/ "why", w as /d/ "double-u", h as /ch/ "aitch") — F-122.** Response: y, w and h appear only at L3 and every L3 scene contains 2-3 **trap pictures** whose name starts with the name-sound (for target Y: web, wolf, whale; for W: dog, duck, drum; for H: cheese, chick, chair). Tapping a trap picture nudges it and shows its OWN first letter as a badge on it (`ART.letterBadge` reading "w"), beside the target card's letter — the child sees the letters differ. Name-initial letters (b, d, p, t — "bee, dee, pee, tee") make up L1 because their name starts with their sound.
  2. **Sounds at the END of the letter name are harder (f "eff", m "em", s "ess", l "ell", n "en", r "ar") — F-122.** Response: these six letters form L2, after the child has succeeded with name-initial letters; the wrong-tap badge (the picture's own first letter) is the same enacted cue.
  3. **Missing a target (stops hunting early) — one-to-one / exhaustiveness (F-101).** Response: the count tiles stay enabled, so a child may answer early; if the tapped numeral equals the number FOUND but targets remain, the unfound targets pulse (`ANIM.pulse`) and each shows its first-letter badge for 1200 ms — "these start with it too" — and the item continues (attempt 2).
  4. **Matching on a shared LATER sound or on meaning (taps "cat" for target T because "cat" contains t; taps "bee" for target D because bees and ducks both fly) — F-126.** Response: the badge shows the tapped picture's FIRST letter (c), which does not match the card; at L2 one non-target per scene ends with the target sound (for T: cat; for S: bus) so the "anywhere in the word" error is surfaced and answered by the badge.
  5. **Miscounting the found pictures (taps 3 after finding 4).** Response: every found picture wears its running numeral (`ART.countBadge` 1, 2, 3 …) so the count is written on the scene; a wrong numeral replays the badges in order (P3 feedback) and pulses the last one.

## How it plays
1. **Start screen**: title "Sound Hunt", the owl (`ART.owl`) at (360, 200), Start, picker.
2. **Item 1 (L1: target B; scene = bus, bee, bear + sun, cat, fish, moon, dog)**: rail of 8 dots (§6). Zone A left: the target card (`ART.card`, 140 × 170) centred at (120, 160) showing the letter in both cases — `ART.targetUpper` "B" at (120, 130) 88 px and `ART.targetLower` "b" at (120, 205) 44 px — with the magnifier (`ART.lens`) at (176, 96) on the card's corner (the "hunt" icon; the only prompt beside the letter). Zone A right: the scene — a 4 × 2 grid of picture tiles (`ART.picTile`, 80 × 80, gap 12): x = 272 / 364 / 456 / 548, y = 118 / 210; each tile's label is one picture from ART (e.g. `ART.picBus`), positions shuffled. Zone B: three numeral tiles (`ART.numeralTile`, 88 × 88) at y = 380, x = 248 / 360 / 472, showing the true count and two distractors (Content), shuffled, ENABLED from the start. The owl sits at (120, 300) under the card. No caption.
3. **Hunting**: the child taps a picture.
   - **Target picture (bus)**: `ANIM.pop`, `tone("tap", k)` with k = 1 for the first find, 2 for the second …; the tile takes the found look (`ART.picFound` tokens via `api.setSelected(true)`), and a `ART.countBadge` with the numeral k appears at its top-right. A second tap on a found picture does nothing.
   - **Non-target picture (sun)**: `ANIM.nudge`, `tone("nudge")`; `ART.letterBadge` with the picture's own first letter ("s") appears on it for 1200 ms, then fades (`ANIM.fadeOut`). The tile stays enabled. This counts as a wrong tap (attempt counter +1).
4. **Answering**: the child taps a numeral.
   - **Correct (3, and all three targets found)**: `ANIM.pop`, `tone("correct")`, praise pop (rotation), the found pictures glide (`ANIM.glide`) one by one into the card and shrink (`ANIM.tuck`) so the card ends showing "B" with three tiny pictures along its bottom (`ART.miniPic`, 28 px) — the letter "collects" its words; owl `ANIM.blink`; rail dot fills; next scene after 700 ms (`ANIM.appear`).
   - **Numeral equals the number found, but targets remain** (misconception 3): `ANIM.nudge` + `tone("nudge")` on the numeral; the unfound targets `ANIM.pulse` and show their letter badge ("b") for 1200 ms. Attempt 2.
   - **Numeral wrong with all targets found** (miscount): nudge + tone; the count badges replay in order 300 ms apart with `tone("tap", k)`, the last badge `ANIM.lastBadge`. Attempt 2.
   - **Second wrong (any kind)**: the cue again, then show-me: every unfound target gains `ART.showRing` with `ANIM.showMe`; once all targets are found the correct numeral tile gains the ring; tapping it completes the item as solved-with-help (no praise pop).
5. **Items 2-8**: per Content/Rules. L1 name-initial letters (b, d, p, t), 3 targets in 8; L2 name-final letters (s, m, f, l, n, r), 2-4 targets, one non-target ending in the target sound; L3 y / w / h with 2-3 trap pictures each.
6. **Finish**: `t("all_done")` (360, 110); the owl (360, 200) `ANIM.celebrate`; the summary = the eight target cards in a row at y = 380 as small `ART.cardMini` (64 × 76) each showing its letter (36 px) and its count badge — the letters hunted this session; `play_again` (250, 510), `menu` (470, 510); `tone("finish")`.

Session ≈ 5 minutes (8 scenes × ~35 s).

## Art registry
```js
const ART = {
  owl:          { kind: "emoji", value: "🦉", size: 80 },
  lens:         { kind: "emoji", value: "🔍", size: 40 },
  card:         { kind: "shape", shape: "roundRect", w: 140, h: 170, fill: "surface", stroke: "structure", strokeWidth: 4, radius: 18 },
  cardMini:     { kind: "shape", shape: "roundRect", w: 64, h: 76, fill: "surface", stroke: "structure", strokeWidth: 2, radius: 10 },
  targetUpper:  { kind: "text",  value: "", size: 88, font: "display", color: "structure" },
  targetLower:  { kind: "text",  value: "", size: 44, font: "display", color: "inkSoft" },
  picTile:      { kind: "shape", shape: "roundRect", w: 80, h: 80, fill: "surface", stroke: "line", strokeWidth: 2, radius: 12 },
  picFound:     { kind: "shape", shape: "roundRect", w: 80, h: 80, fill: "structureSoft", stroke: "structure", strokeWidth: 3, radius: 12 },
  countBadge:   { kind: "shape", shape: "circle", r: 15, fill: "structure" },      // numeral 18 px display, color bg
  letterBadge:  { kind: "shape", shape: "circle", r: 18, fill: "accent" },         // the picture's first letter, 22 px display, color inkOnAccent
  numeralTile:  { kind: "shape", shape: "roundRect", w: 88, h: 88, fill: "surface", stroke: "line", strokeWidth: 2, radius: 12 },   // numeral 44 px
  miniPic:      { kind: "text",  value: "", size: 28, font: "body", color: "ink" },  // value = the found picture's emoji, read through ART at runtime
  showRing:     { kind: "shape", shape: "roundRect", w: 92, h: 92, stroke: "structure", strokeWidth: 4, radius: 16 },
  dotEmpty:     { kind: "shape", shape: "circle", r: 8, stroke: "line", strokeWidth: 2 },
  dotFull:      { kind: "shape", shape: "circle", r: 8, fill: "structure" },
  // picture pool (English names in the key; every picture's name is unambiguous in English)
  picBus:       { kind: "emoji", value: "🚌", size: 52 },   // bus
  picBee:       { kind: "emoji", value: "🐝", size: 52 },   // bee
  picBear:      { kind: "emoji", value: "🐻", size: 52 },   // bear
  picBanana:    { kind: "emoji", value: "🍌", size: 52 },   // banana
  picBell:      { kind: "emoji", value: "🔔", size: 52 },   // bell
  picDog:       { kind: "emoji", value: "🐶", size: 52 },   // dog
  picDuck:      { kind: "emoji", value: "🦆", size: 52 },   // duck
  picDrum:      { kind: "emoji", value: "🥁", size: 52 },   // drum
  picDonut:     { kind: "emoji", value: "🍩", size: 52 },   // donut
  picPig:       { kind: "emoji", value: "🐷", size: 52 },   // pig
  picPen:       { kind: "emoji", value: "🖊️", size: 52 },   // pen
  picPizza:     { kind: "emoji", value: "🍕", size: 52 },   // pizza
  picPear:      { kind: "emoji", value: "🍐", size: 52 },   // pear
  picPenguin:   { kind: "emoji", value: "🐧", size: 52 },   // penguin
  picTree:      { kind: "emoji", value: "🌳", size: 52 },   // tree
  picTiger:     { kind: "emoji", value: "🐯", size: 52 },   // tiger
  picTurtle:    { kind: "emoji", value: "🐢", size: 52 },   // turtle
  picTent:      { kind: "emoji", value: "⛺", size: 52 },   // tent
  picTomato:    { kind: "emoji", value: "🍅", size: 52 },   // tomato
  picSun:       { kind: "emoji", value: "☀️", size: 52 },   // sun
  picSnake:     { kind: "emoji", value: "🐍", size: 52 },   // snake
  picSock:      { kind: "emoji", value: "🧦", size: 52 },   // sock
  picStar:      { kind: "emoji", value: "⭐", size: 52 },   // star
  picMoon:      { kind: "emoji", value: "🌙", size: 52 },   // moon
  picMouse:     { kind: "emoji", value: "🐭", size: 52 },   // mouse
  picMonkey:    { kind: "emoji", value: "🐵", size: 52 },   // monkey
  picMushroom:  { kind: "emoji", value: "🍄", size: 52 },   // mushroom
  picFish:      { kind: "emoji", value: "🐟", size: 52 },   // fish
  picFox:       { kind: "emoji", value: "🦊", size: 52 },   // fox
  picFrog:      { kind: "emoji", value: "🐸", size: 52 },   // frog
  picFlower:    { kind: "emoji", value: "🌸", size: 52 },   // flower
  picLion:      { kind: "emoji", value: "🦁", size: 52 },   // lion
  picLemon:     { kind: "emoji", value: "🍋", size: 52 },   // lemon
  picLeaf:      { kind: "emoji", value: "🍃", size: 52 },   // leaf
  picLock:      { kind: "emoji", value: "🔒", size: 52 },   // lock
  picNose:      { kind: "emoji", value: "👃", size: 52 },   // nose
  picNut:       { kind: "emoji", value: "🥜", size: 52 },   // nut
  picNewspaper: { kind: "emoji", value: "📰", size: 52 },   // newspaper
  picRabbit:    { kind: "emoji", value: "🐰", size: 52 },   // rabbit
  picRocket:    { kind: "emoji", value: "🚀", size: 52 },   // rocket
  picRainbow:   { kind: "emoji", value: "🌈", size: 52 },   // rainbow
  picRing:      { kind: "emoji", value: "💍", size: 52 },   // ring
  picCat:       { kind: "emoji", value: "🐱", size: 52 },   // cat
  picCake:      { kind: "emoji", value: "🎂", size: 52 },   // cake
  picYoyo:      { kind: "emoji", value: "🪀", size: 52 },   // yo-yo (Unicode 12)
  picYarn:      { kind: "emoji", value: "🧶", size: 52 },   // yarn
  picWeb:       { kind: "emoji", value: "🕸️", size: 52 },   // web
  picWolf:      { kind: "emoji", value: "🐺", size: 52 },   // wolf
  picWhale:     { kind: "emoji", value: "🐋", size: 52 },   // whale
  picWatermelon:{ kind: "emoji", value: "🍉", size: 52 },   // watermelon
  picHat:       { kind: "emoji", value: "🎩", size: 52 },   // hat
  picHorse:     { kind: "emoji", value: "🐴", size: 52 },   // horse
  picHouse:     { kind: "emoji", value: "🏠", size: 52 },   // house
  picHammer:    { kind: "emoji", value: "🔨", size: 52 },   // hammer
  picCheese:    { kind: "emoji", value: "🧀", size: 52 },   // cheese
  picChick:     { kind: "emoji", value: "🐣", size: 52 },   // chick
  picChair:     { kind: "emoji", value: "🪑", size: 52 }    // chair (Unicode 12)
};
```
No emoji newer than Unicode 12 is used, so no `fallback` is required. Every picture is an object whose English name is unambiguous and starts with the sound its key says.

## Animation registry
```js
const ANIM = {
  pop:       { scale: 1.12, duration: 140, ease: "Back.Out", yoyo: true, trigger: "target picture found; correct numeral" },
  nudge:     { x: "+=10", duration: 80, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "non-target picture; wrong numeral" },
  fadeOut:   { alpha: 0, duration: 300, ease: "Sine.In", trigger: "letter badge after 1200 ms" },
  pulse:     { scale: 1.15, duration: 300, ease: "Sine.InOut", yoyo: true, repeat: 2, trigger: "unfound targets after an early numeral" },
  lastBadge: { scale: 1.4, duration: 220, ease: "Back.Out", yoyo: true, trigger: "last count badge in a miscount replay" },
  glide:     { duration: 260, ease: "Sine.InOut", trigger: "found pictures into the card (x,y at call), 120 ms apart" },
  tuck:      { scale: 0.5, duration: 200, ease: "Sine.In", trigger: "a picture shrinking as it lands on the card" },
  blink:     { scaleY: 0.85, duration: 100, ease: "Sine.InOut", yoyo: true, trigger: "owl on a correct answer" },
  appear:    { alpha: 1, scale: 1, duration: 200, ease: "Back.Out", trigger: "new scene, card and tiles (from alpha 0, scale 0.6)" },
  showMe:    { alpha: 1, duration: 500, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "ring on unfound targets, then on the correct numeral (from alpha 0.2)" },
  celebrate: { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "finish owl" }
};
```

## Screen layout
```
y   0 ┌──────────────────────────────────────────────────────────────┐
      │ [lang]            ○ ○ ○ ○ ○ ○ ○ ○  rail y=28                   │  zone T
 56   ├──────────────────────────────────────────────────────────────┤
      │  ┌ card ┐ lens(176,96)   [p][p][p][p]   row y=118             │
      │  │  B   │ (120,160)      x=272/364/456/548  (80×80, gap 12)   │  zone A
      │  │  b   │                [p][p][p][p]   row y=210             │
      │  └──────┘                                                    │
260   ├──────────────────────────────────────────────────────────────┤
      │  owl (120,300)                                               │
      │            [ 2 ]      [ 3 ]      [ 4 ]   numerals y=380       │  zone B
      │           x=248      x=360      x=472    (88×88)              │
480   ├──────────────────────────────────────────────────────────────┤
      │                                                              │  zone C
560   └──────────────────────────────────────────────────────────────┘
```
Fixed layout, FIT scaling. p = a picture tile (`ART.picTile` with one picture label from the pool).

## Visual specification
- Background `THEME.colour.bg`; rail per §6: 8 × `ART.dotEmpty` (x = 283 + i × 22, y = 28) → `ART.dotFull`.
- `ART.card` centred (120, 160); `ART.targetUpper` at (120, 130); `ART.targetLower` at (120, 205); `ART.lens` at (176, 96) overlapping the card's top-right corner; `ART.owl` at (120, 300).
- Scene tiles: `makeTile` 80 × 80 (`ART.picTile` tokens) with the picture emoji (52 px) as label, read through `ART[picKey].value`; found look = `ART.picFound` tokens via `selectedFill` / `selectedStroke`; `ART.countBadge` at tile (+28, −28) with the numeral 18 px `THEME.font.display` `THEME.colour.bg`; `ART.letterBadge` centred on the tile with the letter 22 px `THEME.font.display` `THEME.colour.inkOnAccent` (lowercase, the picture's first letter).
- Numeral tiles: `makeTile` 88 × 88 (`ART.numeralTile`), numeral 44 px `THEME.font.display` `THEME.colour.ink`.
- `ART.miniPic` copies along the card's bottom edge at y = 232, x = 120 − (n−1) × 16 + i × 32 after a correct answer; `ART.showRing` behind a tile.
- Tap floors: 80 (pictures), 88 (numerals) ≥ 80; gaps 12 (scene), 24 (numerals).
- Tab order: the eight picture tiles row by row, then the three numeral tiles.

## Content
Language-bound. `LOCALE_DATA[GameCore.lang].items` supplies the letter, the target pictures, the non-target pictures and (L3) the trap pictures. The English (`en`) list is authored in full below. **Other locales: a native word list is required — en pilot.** A native author must choose pictures from the ART pool (or add emoji to it) whose name in that language starts with the letter's primary sound, must rebuild the L3 trap sets from that language's letter names (F-122 — e.g. German "Vau" for v, Spanish "hache" for h, French "double-vé"), and must not assume the English sets transfer: "sun" is Sonne (s) in de but sol (s) in es and aurinko (a) in fi.

Each item = (letter; targets; non-targets [; traps]). The scene always holds 8 pictures: targets + non-targets (+ traps) = 8. The count-tile set is the true count plus the two nearest numerals (2 → 1, 3; 3 → 2, 4; 4 → 3, 5), shuffled.

- **L1 — name-initial letters, 3 targets** (F-122): (B; `ART.picBus`, `ART.picBee`, `ART.picBear`; `ART.picSun`, `ART.picCat`, `ART.picFish`, `ART.picMoon`, `ART.picDog`) · (D; `ART.picDog`, `ART.picDuck`, `ART.picDrum`; `ART.picPig`, `ART.picSun`, `ART.picTree`, `ART.picBell`, `ART.picFox`) · (P; `ART.picPig`, `ART.picPen`, `ART.picPizza`; `ART.picBus`, `ART.picLion`, `ART.picSock`, `ART.picTent`, `ART.picMoon`) · (T; `ART.picTree`, `ART.picTiger`, `ART.picTurtle`; `ART.picBee`, `ART.picDonut`, `ART.picHat`, `ART.picFrog`, `ART.picStar`) · (B; `ART.picBanana`, `ART.picBell`, `ART.picBear`; `ART.picPear`, `ART.picDuck`, `ART.picLemon`, `ART.picRing`, `ART.picNose`) · (P; `ART.picPear`, `ART.picPenguin`, `ART.picPen`; `ART.picBanana`, `ART.picTomato`, `ART.picMouse`, `ART.picLeaf`, `ART.picHouse`)
- **L2 — name-final letters, 2-4 targets; one non-target ENDS with the target sound** (misconception 4): (S; `ART.picSun`, `ART.picSnake`, `ART.picSock`, `ART.picStar`; `ART.picBus` (ends s), `ART.picMoon`, `ART.picFrog`, `ART.picHat`) · (M; `ART.picMoon`, `ART.picMouse`, `ART.picMonkey`; `ART.picDrum` (ends m), `ART.picSun`, `ART.picTree`, `ART.picPig`, `ART.picLock`) · (F; `ART.picFish`, `ART.picFox`, `ART.picFrog`, `ART.picFlower`; `ART.picLeaf` (ends f), `ART.picBee`, `ART.picCake`, `ART.picRing`) · (L; `ART.picLion`, `ART.picLemon`, `ART.picLeaf`; `ART.picBell` (ends l), `ART.picDog`, `ART.picStar`, `ART.picNut`, `ART.picHouse`) · (N; `ART.picNose`, `ART.picNut`, `ART.picNewspaper`; `ART.picSun` (ends n), `ART.picFish`, `ART.picPear`, `ART.picTent`, `ART.picBear`) · (R; `ART.picRabbit`, `ART.picRocket`, `ART.picRainbow`, `ART.picRing`; `ART.picBear` (ends r), `ART.picMoon`, `ART.picPig`, `ART.picLeaf`) · (M; `ART.picMushroom`, `ART.picMouse`; `ART.picDrum` (ends m), `ART.picSock`, `ART.picTiger`, `ART.picBus`, `ART.picNose`, `ART.picLock`)
- **L3 — letter-name traps (F-122), 2-3 targets + 2-3 traps**: (Y; `ART.picYoyo`, `ART.picYarn`; traps `ART.picWeb`, `ART.picWolf`, `ART.picWhale`; `ART.picSun`, `ART.picCat`, `ART.picHat`) · (W; `ART.picWeb`, `ART.picWolf`, `ART.picWatermelon`; traps `ART.picDog`, `ART.picDuck`; `ART.picSun`, `ART.picLemon`, `ART.picRing`) · (H; `ART.picHat`, `ART.picHorse`, `ART.picHouse`; traps `ART.picCheese`, `ART.picChick`, `ART.picChair`; `ART.picMoon`, `ART.picBee`) · (W; `ART.picWhale`, `ART.picWeb`; traps `ART.picDrum`, `ART.picDonut`; `ART.picStar`, `ART.picFox`, `ART.picNut`, `ART.picPear`) · (H; `ART.picHammer`, `ART.picHat`, `ART.picHorse`; traps `ART.picCheese`, `ART.picChair`; `ART.picTree`, `ART.picRocket`, `ART.picLock`)

Play list: 8 items; start at L1; levels change per Rules; no letter+set repeats within a session; scene positions shuffled per item; the correct numeral slot never repeats twice running (§13). The card shows the letter in `THEME.font.display` (Baloo 2) — single-storey a and g — so the badge letters match the target's face.

## Rules
- Item count: 8.
- Difficulty progression: 2 consecutive first-try items (no wrong picture tap AND the first numeral correct) → next level (cap L3).
- Adaptation: any wrong tap (non-target picture or wrong numeral) on an item, or wrong first-try on 2 consecutive items → next item one level down (floor L1). The current item is never abandoned.
- What happens on a correct answer: `ANIM.pop`, `tone("correct")`, praise rotation ["well_done", "great_job", "excellent", "you_did_it", "keep_going"], found pictures glide into the card with `ANIM.tuck`, owl `ANIM.blink`, rail dot fills, next scene after 700 ms.
- What happens on a wrong answer (per anticipated mistake):
  - Non-target picture tapped (wrong initial sound, or matched on meaning / a later sound): `ANIM.nudge`, `tone("nudge")`, `ART.letterBadge` with the picture's first letter for 1200 ms; the picture stays enabled.
  - Trap picture tapped at L3 (letter name used as the sound): the same badge — the child sees "w" beside the card's "Y"; nothing else, no words.
  - Numeral tapped while targets remain (stopped hunting early): nudge + tone on the numeral; unfound targets `ANIM.pulse` and wear their letter badge for 1200 ms.
  - Wrong numeral after all targets found (miscount): nudge + tone; count badges replay in order with rising tones; the last badge `ANIM.lastBadge`.
  - Second tap on a found picture: nothing (one-to-one enforced by the object).
- Retry behaviour: attempt 1 → attempt 2 after the cue → attempt 3 = show-me (rings on unfound targets, then on the correct numeral); completing with the ring is solved-with-help. No attempt 4. An item with any wrong tap never counts as first-try.
- Finish condition: 8 items. No losing state, no clock.

## Strings
- `GameCore.t()` keys: `t("start")`, `t("all_done")`, `t("play_again")`, `t("menu")`, `t("well_done")`, `t("great_job")`, `t("excellent")`, `t("you_did_it")`, `t("keep_going")`.
- Game-specific: `title` = "Sound Hunt". No words on the play screen; the letters on the card and badges are content (locale data), not UI copy.

## Sound
`tone("tap", k)` on the k-th target found (pitch rises with the count — F-213); `tone("nudge")` on a non-target or wrong numeral; `tone("correct")` on the right numeral; `tone("finish")` once. Silent under `?sound=off`. Letter sounds are NOT spoken — there are no audio files; the picture carries the sound and the badge carries the letter.

## Testing checklist
- [ ] Works in all 11 languages (chrome strings change with the picker; with `?lang=de` the game reads `LOCALE_DATA.de` — until a native list exists it must fall back to `en` without crashing and the reviewer notes it as "en pilot").
- [ ] Works at narrow width (400-px iframe: card, all eight pictures and three numerals visible and separate).
- [ ] Keyboard operable (Tab walks the eight pictures then the numerals; Enter marks a picture / picks a numeral).
- [ ] Never auto-starts.
- [ ] No losing state (any number of wrong taps still ends with rings guiding the item to completion).
- [ ] With target B, tapping the bus, bee and bear marks each with 1, 2, 3 and a rising note; tapping the sun nudges it and shows an "s" badge for about a second.
- [ ] Tapping a marked picture again does nothing.
- [ ] Tapping "2" after finding two of three targets makes the third target pulse with a "b" badge; the item continues.
- [ ] Tapping "4" after finding three replays the badges 1, 2, 3 and grows the last one.
- [ ] At the third level with target Y, tapping the web shows a "w" badge on it.
- [ ] Two clean items in a row move from b/d/p/t to s/m/f/l/n/r; a wrong tap moves back.
- [ ] After a correct answer the found pictures shrink into the letter card; the finish screen shows eight small letter cards with their counts and no score.
- [ ] With `?sound=off` nothing is audible.
