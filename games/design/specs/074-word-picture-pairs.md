# 074 — Word Picture Pairs

## Identity
- Slug: `word-picture-pairs`
- Subject / topic: Literacy / decoding — reading a written word all the way through and pairing it with its picture when the decoys share the first letter (cat / can / cap)
- Age band: `6-8`
- Interaction pattern: `P12` — match pairs (all tiles visible; memory is not the objective)
- Estimated build size: ~460 lines

Shared contract: `catalogue/BUILD-CONVENTIONS.md`. Pattern contract: `catalogue/PATTERNS.md` P12. Locale note: the word lists are language-bound (F-125; A-15) and live in `LOCALE_DATA`; English is authored in full, the other ten locales are declared as needing a native list (en pilot). Nothing is spoken; the picture tiles are the meaning side of each pair and are never drawn beside the word tiles (F-125).

## Learning
- Objective: Pairs each written word on a visible board with its picture when every other word on the board starts with the same letter, so only reading through the whole word separates them.
- Prerequisites: Blends three-letter words (games 071/072 or the free CVC builder). Reads no sentences.
- Curriculum links: F-22 (blending into words at 6-7; reading short texts with comprehension by 8 — all twelve systems), F-24 (the decoding strand of every reading method: synthetic phonics EN/US, grapheme-phoneme FR, Silbenmethode DE, klankzuiver NL, letter-sound SE/NO, syllabic ES/BR/IT), F-1 (CVC/blending 8 of 15; sight words 7 of 15 — this game deliberately replaces the sight-word genre with a decode-through-the-word task, F-7/F-217), F-31 row "Blending to words" → 6-8 (US RF.1.3 "decode regularly spelled one-syllable words"; England Y1 "read accurately by blending"; Germany Klasse 1 "Wörter erlesen"; Netherlands groep 3 AVI-start; Finland 1. luokka).
- Common misconceptions (F-125, F-124), each with this game's response:
  1. **Guessing from the first letter plus the pictures on the board (three-cueing).** Response: structural — every word on a board starts with the same letter (cat, can, cap), so the first letter identifies nothing. When a word is paired with the wrong picture, the word tile's letters after the shared first letter enlarge and gain a coral bar beneath (`ART.letterMark`, `ANIM.growTail`) for 1000 ms — "read past the first letter" — then the pair nudges apart.
  2. **Reading a word as a whole shape and failing in a new case or font.** Response: L3 boards show two of the five words in UPPERCASE `THEME.font.display` and three in lowercase `THEME.font.body`; when an uppercase word is mis-paired, its lowercase form (`ART.plainWord`) appears beneath the tile during the cue so the two dresses of the same word are linked.
  3. **Stopping the blend before the last letter (ca- then a guess).** Response: L2 boards add words that share the first TWO letters (cat / cap; bat / bag), so the last letter alone decides; the same tail cue applies and the coral bar sits under the final letter only.
  4. **Pairing two pictures (or two words) because they "go together" (cat and cow).** Response: a picture-picture or word-word selection is not a pair type; both nudge, `tone("nudge")`, no cue — the board only accepts word + picture, which the tile shapes make visible (word tiles are rectangles with a `line` stroke; picture tiles are rounded squares with a `structure` stroke).
  5. **Tapping the same tile twice expecting a match.** Response: the second tap de-selects (no error).

## How it plays
1. **Start screen**: title "Word Picture Pairs", the elephant (`ART.elephant`) at (360, 200), Start, picker.
2. **Board 1 (L1: 3 pairs = 6 tiles)**: rail with one dot per board (3 or 4, §6) at y = 28; `t("question_x_of_y")` at (360, 48) counts boards. Zones A and B are merged: a 3 × 2 grid centred at (360, 300) — columns x = 228 / 360 / 492, rows y = 230 / 370 — holding three word tiles (`ART.wordTile`, 120 × 90) showing cat, can, cap (lowercase, 34 px) and three picture tiles (`ART.picTile`, 120 × 90) showing `ART.picCat`, `ART.picCan`, `ART.picCap` at 56 px, all six shuffled. The elephant stands at (80, 300). Caption `S("matchWords")` ("Match the words") at (360, 480), 22 px `THEME.colour.inkSoft`.
3. **Pairing**: tap a tile → it lifts (`api.setSelected(true)`, `ANIM.lift`, `tone("tap")`). Tap a second tile:
   - **Pair (a word and the picture with the same id)**: both glide 20 px toward each other (`ANIM.join`), `tone("correct")`, then lock: both dim to alpha 0.6 with `ART.link` (a short `structure` bar) drawn between their facing edges; the elephant `ANIM.trumpet` (a small angle wobble). Praise pop when the board completes.
   - **Word + wrong picture**: `tone("nudge")`; the tail cue — the word's letters after the shared prefix grow to 1.3× with `ART.letterMark` beneath (`ANIM.growTail`) for 1000 ms (plus `ART.plainWord` below an uppercase word) — then both `ANIM.nudge` and de-select. If the FIRST-tapped tile has now been in two wrong pairs, its true partner gains `ART.hintRing` (`ANIM.showMe`) until the pair is made.
   - **Word + word or picture + picture**: both `ANIM.nudge`, `tone("nudge")`, de-select; no cue.
   - **Same tile twice**: de-select, `tone("tap")`.
4. **Board complete**: all pairs locked → praise pop (rotation), rail dot fills, `ANIM.boardOut`, next board `ANIM.appear` after 600 ms.
5. **Boards 2-4**: L1 3 pairs, three-letter words, shared first letter; L2 4 pairs (8 tiles, 4 × 2: x = 162 / 294 / 426 / 558), words of 3-4 letters sharing the first letter, two of them sharing the first two letters; L3 5 pairs (10 tiles, 5 × 2: x = 100 / 230 / 360 / 490 / 620, tiles 118 × 90), words of 3-5 letters, mixed case and font. Session = 3 boards at the base pace, 4 when the child reaches L3 by the end of board 2 (Rules).
6. **Finish**: `t("all_done")` (360, 110); the elephant (360, 200) `ANIM.celebrate`; the summary = every pair made as a chip (`ART.pairChip`, 140 × 40: picture 24 px left, word 18 px right) in rows of five from y = 320 (x = 80 + i × 140) — the words the child read, not a score; `play_again` (250, 510), `menu` (470, 510); `tone("finish")`.

Session ≈ 5-6 minutes.

## Art registry
```js
const ART = {
  elephant:  { kind: "emoji", value: "🐘", size: 80 },                     // mascot (never a board picture)
  wordTile:  { kind: "shape", shape: "rect", w: 120, h: 90, fill: "surface", stroke: "line", strokeWidth: 2 },                     // word 34 px; square corners = "word"
  picTile:   { kind: "shape", shape: "roundRect", w: 120, h: 90, fill: "surface", stroke: "structure", strokeWidth: 2, radius: 22 },  // picture 56 px; round corners = "picture"
  link:      { kind: "shape", shape: "rect", w: 24, h: 6, fill: "structure" },
  letterMark:{ kind: "shape", shape: "rect", w: 18, h: 5, fill: "accent" },
  plainWord: { kind: "text",  value: "", size: 22, font: "body", color: "inkSoft" },
  hintRing:  { kind: "shape", shape: "roundRect", w: 132, h: 102, stroke: "structure", strokeWidth: 4, radius: 16 },
  pairChip:  { kind: "shape", shape: "roundRect", w: 140, h: 40, fill: "structureSoft", stroke: "structure", strokeWidth: 1, radius: 8 },
  dotEmpty:  { kind: "shape", shape: "circle", r: 8, stroke: "line", strokeWidth: 2 },
  dotFull:   { kind: "shape", shape: "circle", r: 8, fill: "structure" },
  // board pictures — one unambiguous English noun each (the intended word in the comment)
  picCat:    { kind: "emoji", value: "🐱", size: 56 },   // cat
  picCan:    { kind: "emoji", value: "🥫", size: 56 },   // can
  picCap:    { kind: "emoji", value: "🧢", size: 56 },   // cap
  picCup:    { kind: "emoji", value: "🥤", size: 56 },   // cup
  picCow:    { kind: "emoji", value: "🐮", size: 56 },   // cow
  picCar:    { kind: "emoji", value: "🚗", size: 56 },   // car
  picBat:    { kind: "emoji", value: "🦇", size: 56 },   // bat
  picBag:    { kind: "emoji", value: "👜", size: 56 },   // bag
  picBus:    { kind: "emoji", value: "🚌", size: 56 },   // bus
  picBed:    { kind: "emoji", value: "🛏️", size: 56 },   // bed
  picBee:    { kind: "emoji", value: "🐝", size: 56 },   // bee
  picBell:   { kind: "emoji", value: "🔔", size: 56 },   // bell
  picBox:    { kind: "emoji", value: "📦", size: 56 },   // box
  picBall:   { kind: "emoji", value: "⚽", size: 56 },   // ball
  picPig:    { kind: "emoji", value: "🐷", size: 56 },   // pig
  picPin:    { kind: "emoji", value: "📌", size: 56 },   // pin
  picPen:    { kind: "emoji", value: "🖊️", size: 56 },   // pen
  picPan:    { kind: "emoji", value: "🍳", size: 56 },   // pan
  picPear:   { kind: "emoji", value: "🍐", size: 56 },   // pear
  picHat:    { kind: "emoji", value: "🎩", size: 56 },   // hat
  picHen:    { kind: "emoji", value: "🐔", size: 56 },   // hen
  picHand:   { kind: "emoji", value: "✋", size: 56 },   // hand
  picHouse:  { kind: "emoji", value: "🏠", size: 56 },   // house
  picHorse:  { kind: "emoji", value: "🐴", size: 56 },   // horse
  picDog:    { kind: "emoji", value: "🐶", size: 56 },   // dog
  picDuck:   { kind: "emoji", value: "🦆", size: 56 },   // duck
  picDrum:   { kind: "emoji", value: "🥁", size: 56 },   // drum
  picDress:  { kind: "emoji", value: "👗", size: 56 },   // dress
  picDoor:   { kind: "emoji", value: "🚪", size: 56 },   // door
  picSun:    { kind: "emoji", value: "☀️", size: 56 },   // sun
  picSock:   { kind: "emoji", value: "🧦", size: 56 },   // sock
  picStar:   { kind: "emoji", value: "⭐", size: 56 },   // star
  picShip:   { kind: "emoji", value: "🚢", size: 56 },   // ship
  picShop:   { kind: "emoji", value: "🏪", size: 56 },   // shop
  picSnail:  { kind: "emoji", value: "🐌", size: 56 },   // snail
  picFox:    { kind: "emoji", value: "🦊", size: 56 },   // fox
  picFish:   { kind: "emoji", value: "🐟", size: 56 },   // fish
  picFrog:   { kind: "emoji", value: "🐸", size: 56 },   // frog
  picFlag:   { kind: "emoji", value: "🚩", size: 56 },   // flag
  picMap:    { kind: "emoji", value: "🗺️", size: 56 },   // map
  picMoon:   { kind: "emoji", value: "🌙", size: 56 },   // moon
  picMouse:  { kind: "emoji", value: "🐭", size: 56 },   // mouse
  picMilk:   { kind: "emoji", value: "🥛", size: 56 },   // milk
  picRat:    { kind: "emoji", value: "🐀", size: 56 },   // rat
  picRing:   { kind: "emoji", value: "💍", size: 56 },   // ring
  picRain:   { kind: "emoji", value: "🌧️", size: 56 },   // rain
  picRocket: { kind: "emoji", value: "🚀", size: 56 },   // rocket
  picTen:    { kind: "emoji", value: "🔟", size: 56 },   // ten
  picTent:   { kind: "emoji", value: "⛺", size: 56 },   // tent
  picTrain:  { kind: "emoji", value: "🚂", size: 56 },   // train
  picTruck:  { kind: "emoji", value: "🚚", size: 56 },   // truck
  picTree:   { kind: "emoji", value: "🌳", size: 56 }    // tree
};
```
All emoji are Unicode 10 or older; no fallbacks needed.

## Animation registry
```js
const ANIM = {
  lift:      { y: "-=8", scale: 1.06, duration: 120, ease: "Sine.Out", trigger: "tile selected" },
  join:      { duration: 220, ease: "Back.Out", trigger: "each of a correct pair moves 20 px toward the other (x,y at call)" },
  growTail:  { scale: 1.3, duration: 200, ease: "Back.Out", yoyo: true, hold: 1000, trigger: "each letter object after the shared prefix of a mis-paired word; letterMark drawn beneath for the hold" },
  nudge:     { x: "+=10", duration: 80, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "both tiles of a wrong pair" },
  trumpet:   { angle: 8, duration: 110, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "elephant on each correct pair" },
  showMe:    { alpha: 1, duration: 500, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "hintRing on the true partner (from alpha 0.2)" },
  boardOut:  { y: "-=30", alpha: 0, duration: 300, ease: "Sine.In", trigger: "all tiles when a board completes" },
  appear:    { alpha: 1, scale: 1, duration: 200, ease: "Back.Out", trigger: "new board tiles (from alpha 0, scale 0.6)" },
  celebrate: { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "finish elephant" }
};
```
Implementation note: each word label is drawn as one text object per LETTER (advance 22 px at 34 px, the word centred on the tile) so `growTail` and `ART.letterMark` can address single letters.

## Screen layout
```
y   0 ┌──────────────────────────────────────────────────────────────┐
      │ [lang]              ○ ○ ○   rail y=28 (one dot per board)      │  zone T
 56   ├──────────────────────────────────────────────────────────────┤
      │                                                              │
      │  elephant     [ cat ]    ( pic )    [ cap ]    row y=230      │
      │  (80,300)                                                    │  zones A+B
      │               ( pic )    [ can ]    ( pic )    row y=370      │
      │               x=228      x=360      x=492     (120×90)       │
480   ├──────────────────────────────────────────────────────────────┤
      │                 "Match the words" (360,480)                   │  zone C
560   └──────────────────────────────────────────────────────────────┘
```
4-pair boards: x = 162 / 294 / 426 / 558. 5-pair boards: x = 100 / 230 / 360 / 490 / 620 with 118 × 90 tiles (gap 12). Rows always y = 230 / 370. Fixed layout, FIT scaling.

## Visual specification
- Background `THEME.colour.bg`; rail per §6 with one `ART.dotEmpty` per board (3 or 4) → `ART.dotFull`; `t("question_x_of_y")` at (360, 48) (n = board, total = boards).
- Word tiles: `makeTile` with `ART.wordTile` tokens (square corners), label letters 34 px `THEME.colour.ink` in `THEME.font.display` (L1/L2), or per L3 word: UPPERCASE in `THEME.font.display` / lowercase in `THEME.font.body`. Longest word "house"/"horse"/"snail"/"truck"/"train" = 5 letters = 110 px at advance 22 — inside 118. Picture tiles: `makeTile` with `ART.picTile` tokens (round corners), picture centred 56 px.
- Selected = library selected look + `ANIM.lift`; locked = alpha 0.6 + `ART.link` between the two facing edges.
- `ART.letterMark` 6 px under each tail letter; `ART.plainWord` 30 px below an uppercase tile during the cue; `ART.hintRing` behind a tile; `ART.elephant` at (80, 300).
- Caption `S("matchWords")` at (360, 480), 22 px `THEME.font.body` `THEME.colour.inkSoft`.
- Tap floors: 118-120 × 90 (≥ 56). Gaps ≥ 12. Keyboard: arrows across the grid (row-major), Enter selects.

## Content
Word lists are language-bound. `LOCALE_DATA[lang]` = `{ boards: { L1: [...], L2: [...], L3: [...] } }`; a board is an array of `{ id: "cat", word: "cat", pic: <ART key>, upper: false, font: "display" }`; the pair test is `word.id === picture.id`. The English set is complete. **Other locales: a native word list is required — en pilot** (`LOCALE_DATA[lang] = "en"` for de/fr/it/es/pt/nl/sv/da/no/fi until then). Author's rule for a native list: every word on a board starts with the same letter (L1), two words share the first two letters (L2), and the L3 case/font mix is kept.

**en**:
- L1 (3 pairs, three-letter words, shared first letter): [cat `ART.picCat`, can `ART.picCan`, cap `ART.picCap`] · [bat `ART.picBat`, bag `ART.picBag`, bus `ART.picBus`] · [pig `ART.picPig`, pin `ART.picPin`, pen `ART.picPen`] · [hat `ART.picHat`, hen `ART.picHen`, hand `ART.picHand`] · [dog `ART.picDog`, duck `ART.picDuck`, drum `ART.picDrum`] · [sun `ART.picSun`, sock `ART.picSock`, star `ART.picStar`]
- L2 (4 pairs, 3-4 letters, shared first letter, one pair sharing two letters): [cat, cap, cup `ART.picCup`, cow `ART.picCow`] · [bat, bag, bed `ART.picBed`, bell `ART.picBell`] · [pig, pin, pan `ART.picPan`, pear `ART.picPear`] · [fox `ART.picFox`, fish `ART.picFish`, frog `ART.picFrog`, flag `ART.picFlag`] · [map `ART.picMap`, moon `ART.picMoon`, mouse `ART.picMouse`, milk `ART.picMilk`] · [rat `ART.picRat`, ring `ART.picRing`, rain `ART.picRain`, rocket `ART.picRocket`]
- L3 (5 pairs, 3-5 letters; words 1-2 of each board UPPERCASE display, 3-5 lowercase body): [ship `ART.picShip`, shop `ART.picShop`, sun, sock, snail `ART.picSnail`] · [hat, hen, hand, house `ART.picHouse`, horse `ART.picHorse`] · [bus, bed, bee `ART.picBee`, box `ART.picBox`, ball `ART.picBall`] · [ten `ART.picTen`, tent `ART.picTent`, train `ART.picTrain`, truck `ART.picTruck`, tree `ART.picTree`] · [dog, duck, drum, dress `ART.picDress`, door `ART.picDoor`] · [cat, can, cap, cup, car `ART.picCar`]

Shared prefix per board (for the tail cue) = the longest common prefix of the two words in the wrong pair, minimum 1 letter. Boards are drawn one per level in the play list without repeats; tile positions shuffled; a word and its picture are never side by side in the same row on a fresh board.

## Rules
- Item count: one item = one board; 3 boards minimum, 4 when the child reaches L3 by the end of board 2 (cap 4 boards, at most 17 pairs ≈ 6 minutes).
- Difficulty progression: a board completed with at most one wrong pair → next board one level up (cap L3).
- Adaptation: a board with three or more wrong pairs → next board one level down (floor L1); exactly two → same level.
- What happens on a correct answer: `ANIM.join`, `tone("correct")`, tiles lock with `ART.link`, elephant `ANIM.trumpet`; on board completion a praise pop (rotation ["well_done", "great_job", "excellent", "you_did_it", "keep_going"]) and the rail dot.
- What happens on a wrong answer:
  - Word paired with a picture whose word shares only the first letter (first-letter guessing): the tail letters grow with coral bars for 1000 ms, then nudge apart.
  - Word paired with a picture whose word shares the first two letters (blend stopped early): the same cue, the bar under the last letter only.
  - An UPPERCASE word mis-paired: the cue plus its lowercase form beneath.
  - Word + word or picture + picture: nudge only.
  - The same tile in two wrong pairs: its true partner gains `ART.hintRing` until the pair is made.
- Retry behaviour: unlimited within a board; support escalates per tile. A board always completes.
- Finish condition: the session's boards complete. No losing state, no clock.

## Strings
- `GameCore.t()` keys: `t("start")`, `t("question_x_of_y")`, `t("all_done")`, `t("play_again")`, `t("menu")`, `t("well_done")`, `t("great_job")`, `t("excellent")`, `t("you_did_it")`, `t("keep_going")`.
- Game-specific: `title` = "Word Picture Pairs"; `matchWords` = "Match the words". Board words are content from `LOCALE_DATA`.

## Sound
`tone("tap")` on select/de-select; `tone("correct")` on a pair; `tone("nudge")` on a non-pair; `tone("finish")` once. Silent under `?sound=off`. Words are never spoken.

## Testing checklist
- [ ] Works in all 11 languages (chrome strings change; with `?lang=nl` and no Dutch list the English boards play and nothing breaks).
- [ ] Works at narrow width (400-px iframe: a 5 × 2 board is fully visible with separate tiles).
- [ ] Keyboard operable (arrows move across the grid, Enter selects; a second Enter on another tile attempts the pair).
- [ ] Never auto-starts.
- [ ] No losing state (any number of wrong pairs still ends with every pair locked; hint rings appear after two misses on a tile).
- [ ] Every word on a board starts with the same letter; no picture is ever drawn on or beside a word tile.
- [ ] Pairing "can" with the cat picture makes the "an" grow with coral bars beneath, then the tiles nudge apart.
- [ ] Pairing "cap" with the cat picture puts the coral bar under the "p" only (second level).
- [ ] Two pictures tapped in a row nudge apart with no letter cue.
- [ ] At the third level two words are in CAPITALS and three in a different, plainer font; mis-pairing a capital word shows its small-letter form beneath.
- [ ] A locked pair is dimmed with a bar between the tiles and cannot be tapped again.
- [ ] A board with 0-1 mistakes is followed by a bigger board; 3+ mistakes by a smaller one.
- [ ] The finish screen lists every pair as a picture-word chip and no score.
- [ ] With `?sound=off` nothing is audible.
