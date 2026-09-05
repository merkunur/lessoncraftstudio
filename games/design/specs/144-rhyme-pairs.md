# 144 — Rhyme Pairs

## Identity
- Slug: `rhyme-pairs`
- Subject / topic: Literacy / rhyme matching — pairing two pictures whose names rhyme; the shared rime is revealed on the link
- Age band: `5-6`
- Interaction pattern: `P12` — match pairs (all tiles visible; memory is not the objective)
- Estimated build size: ~460 lines

Shared contract: `catalogue/BUILD-CONVENTIONS.md`. Pattern contract: `catalogue/PATTERNS.md` P12. Locale note: **nothing is spoken** (no audio files); every item is a PICTURE whose name the child already knows (A-15). What rhymes is language-bound (F-126: French rhyme rests on the final vowel/syllable, Finnish early literacy barely uses rhyme) — every board lives in `LOCALE_DATA`; the mechanic is universal (F-217). Second surface for rhyme detection after game 062 (odd-one-out, P1): there the child rejects one of three; here the child must FIND partners among six to ten pictures, with the same two decoy types.

## Learning
- Objective: Pairs two pictures on a visible board whose names rhyme, when other pictures on the board share a first sound or a meaning with them instead, and sees the rhyming part of both words appear on the link.
- Prerequisites: Knows the names of common pictured objects in the play language; has met rhyme as an idea (songs; game 062). No reading — the revealed words are a cue after the pair is made, never a prompt to decode (F-125 applies to decoding tasks only).
- Curriculum links: F-22 (phonological awareness — rhyme — at 5-7 in all twelve systems), F-31 row "Rhyme, syllable clapping" — conservative 6-7, earliest 5 → 5-6 (US RF.K.2.a "recognize and produce rhyming words"; England Reception "rhyme"; Germany Klasse 1 Reimwörter; France GS "rimes"; Spain Infantil rimas; Brazil EF01LP05 "rimas"; Netherlands groep 2 "rijmen"; Sweden förskoleklass "rim"; Denmark 0. klasse "rim"; Norway 1. trinn "rim"; Finland esiopetus — the fi list may be marked out of scope, F-126). Demand: F-1 (rhyming 3 of 15 — niche as a game; kept because it is curriculum-universal and cheap).
- Common misconceptions (F-126, F-125), each with this game's response:
  1. **Matching on the first sound instead of the rhyme (cat with cow) — F-126.** Response: L2 boards hold a same-onset decoy split across two true pairs (cat pairs with hat, cow with … its own rhyme partner); a wrong pair shows the two words' TAILS as chips (`ART.tailChip` "-at" and "-ow") above the tiles for 900 ms — different tails, no rhyme — then the nudge.
  2. **Matching on meaning (cat with dog, goat with sheep) — F-126.** Response: L3 boards hold a meaning decoy split across two true pairs; the same tail chips show the mismatch.
  3. **Detection before production — the child can hear that two words rhyme but cannot say what rhymes (F-126).** Response: the task is pure detection (find, never produce); the `ART.rimeCard` after each pair shows both words with the rhyming letters marked by `ART.rimeBar` beneath them — production is modelled, never demanded.
  4. **Rhymes spelled differently are "not rhymes" once letters are seen (whale/snail, bed/bread).** Response: L1-L2 pairs share the rime spelling; L3 includes pairs whose rime is spelled differently, and the rime card marks the sounding part of each word separately so the child sees that the SOUND matches even when the letters differ.
  5. **Tapping the same tile twice expecting a match.** Response: the second tap de-selects it (no error; `tone("tap")`).

## How it plays
1. **Start screen**: title "Rhyme Pairs", the parrot (`ART.parrot`) at (360, 200), Start, picker.
2. **Board 1 (L1: 3 pairs, 6 tiles)**: the rail shows 2 dots (§6 — one per board). Zones A/B are merged: a 3 × 2 grid of picture tiles (`ART.tile`, 100 × 100, gap 20) centred at (360, 300): columns x = 240 / 360 / 480, rows y = 240 / 360, showing e.g. `ART.picCat`, `ART.picMoon`, `ART.picBee`, `ART.picSpoon`, `ART.picHat`, `ART.picTree` in a shuffled layout. The parrot perches at (80, 300). No caption; no words on the play screen until a pair is made.
3. **Pairing**: tap a picture → it lifts and outlines (`api.setSelected(true)`, `ANIM.lift`, `tone("tap")`). Tap a second picture:
   - **Pair (cat + hat)**: both glide 20 px toward each other (`ANIM.join`), `tone("correct")`; `ART.rimeCard` appears above the pair (`ANIM.appear`) showing "cat" and "hat" side by side (28 px) with `ART.rimeBar` under the rhyming letters of each ("at", "at") for 1200 ms, then fades (`ANIM.fadeOut`); both tiles lock at alpha 0.6 with `ART.link` between them; the parrot `ANIM.bob`.
   - **Not a pair (cat + cow)**: `ART.tailChip` × 2 appear above the two tiles (`ANIM.appear`) showing each word's tail ("-at", "-ow") for 900 ms, then fade; both `ANIM.nudge`, `tone("nudge")`, both de-select. If the FIRST-tapped tile has now been in two wrong pairs, its true partner gains `ART.hintRing` (`ANIM.showMe`) until the pair is made.
   - **Same tile twice**: de-select, `tone("tap")`.
4. **Board complete**: all pairs locked → praise pop (rotation), the rail dot fills, `ANIM.boardOut`, then the next board `ANIM.appear`s after 600 ms.
5. **Boards 2-N**: L2 4 pairs (8 tiles, 4 × 2 grid: x = 180 / 300 / 420 / 540) with a same-onset decoy; L3 5 pairs (10 tiles, 5 × 2 grid: x = 152 / 256 / 360 / 464 / 568, tiles 96 × 96) with a meaning decoy and one differently-spelled rhyme. Session = 2 boards at L1 pace, 3 boards when the child reaches L3 by the end of board 2 (Rules).
6. **Finish**: `t("all_done")` (360, 110); the parrot (360, 210) `ANIM.celebrate`; the summary = every pair made this session as `ART.pairChip` (120 × 40): the two small pictures (`ART.miniPic`, 22 px) with the rime text between ("at", 16 px), in rows of five from y = 360 (x = 360 − 2 × 132 + i × 132, row pitch 50) — the rhymes found; `play_again` (250, 510), `menu` (470, 510); `tone("finish")`.

Session ≈ 4-5 minutes.

## Art registry
```js
const ART = {
  parrot:    { kind: "emoji", value: "🦜", size: 80 },
  tile:      { kind: "shape", shape: "roundRect", w: 100, h: 100, fill: "surface", stroke: "line", strokeWidth: 2, radius: 14 },   // picture label 64 px
  link:      { kind: "shape", shape: "rect", w: 24, h: 6, fill: "structure" },
  rimeCard:  { kind: "shape", shape: "roundRect", w: 260, h: 64, fill: "structureSoft", stroke: "structure", strokeWidth: 2, radius: 14 },   // two words 28 px display ink at (−64,0) and (+64,0)
  rimeBar:   { kind: "shape", shape: "rect", w: 40, h: 6, fill: "accent" },     // width set at runtime to the measured width of the rime letters; drawn 20 px below the word baseline
  tailChip:  { kind: "shape", shape: "roundRect", w: 72, h: 44, fill: "structureSoft", stroke: "structure", strokeWidth: 2, radius: 10 },   // "-at" 24 px display ink
  hintRing:  { kind: "shape", shape: "roundRect", w: 112, h: 112, stroke: "structure", strokeWidth: 4, radius: 18 },
  pairChip:  { kind: "shape", shape: "roundRect", w: 120, h: 40, fill: "structureSoft", stroke: "structure", strokeWidth: 2, radius: 8 },
  miniPic:   { kind: "text",  value: "", size: 22, font: "body", color: "ink" },   // value = a picture emoji read through ART at runtime
  dotEmpty:  { kind: "shape", shape: "circle", r: 8, stroke: "line", strokeWidth: 2 },
  dotFull:   { kind: "shape", shape: "circle", r: 8, fill: "structure" },
  // picture pool (English name in the comment; every name unambiguous)
  picCat:    { kind: "emoji", value: "🐱", size: 64 },   // cat
  picHat:    { kind: "emoji", value: "🎩", size: 64 },   // hat
  picBat:    { kind: "emoji", value: "🦇", size: 64 },   // bat
  picRat:    { kind: "emoji", value: "🐀", size: 64 },   // rat
  picDog:    { kind: "emoji", value: "🐶", size: 64 },   // dog
  picFrog:   { kind: "emoji", value: "🐸", size: 64 },   // frog
  picMoon:   { kind: "emoji", value: "🌙", size: 64 },   // moon
  picSpoon:  { kind: "emoji", value: "🥄", size: 64 },   // spoon
  picStar:   { kind: "emoji", value: "⭐", size: 64 },   // star
  picCar:    { kind: "emoji", value: "🚗", size: 64 },   // car
  picBee:    { kind: "emoji", value: "🐝", size: 64 },   // bee
  picTree:   { kind: "emoji", value: "🌳", size: 64 },   // tree
  picKey:    { kind: "emoji", value: "🔑", size: 64 },   // key
  picHen:    { kind: "emoji", value: "🐔", size: 64 },   // hen
  picPen:    { kind: "emoji", value: "🖊️", size: 64 },   // pen
  picBell:   { kind: "emoji", value: "🔔", size: 64 },   // bell
  picShell:  { kind: "emoji", value: "🐚", size: 64 },   // shell
  picSnake:  { kind: "emoji", value: "🐍", size: 64 },   // snake
  picCake:   { kind: "emoji", value: "🎂", size: 64 },   // cake
  picFox:    { kind: "emoji", value: "🦊", size: 64 },   // fox
  picBox:    { kind: "emoji", value: "📦", size: 64 },   // box
  picGoat:   { kind: "emoji", value: "🐐", size: 64 },   // goat
  picBoat:   { kind: "emoji", value: "⛵", size: 64 },   // boat
  picMouse:  { kind: "emoji", value: "🐭", size: 64 },   // mouse
  picHouse:  { kind: "emoji", value: "🏠", size: 64 },   // house
  picDuck:   { kind: "emoji", value: "🦆", size: 64 },   // duck
  picTruck:  { kind: "emoji", value: "🚚", size: 64 },   // truck
  picClock:  { kind: "emoji", value: "🕰️", size: 64 },   // clock
  picLock:   { kind: "emoji", value: "🔒", size: 64 },   // lock
  picSock:   { kind: "emoji", value: "🧦", size: 64 },   // sock
  picTrain:  { kind: "emoji", value: "🚂", size: 64 },   // train
  picRain:   { kind: "emoji", value: "🌧️", size: 64 },   // rain
  picWhale:  { kind: "emoji", value: "🐳", size: 64 },   // whale
  picSnail:  { kind: "emoji", value: "🐌", size: 64 },   // snail
  picNose:   { kind: "emoji", value: "👃", size: 64 },   // nose
  picRose:   { kind: "emoji", value: "🌹", size: 64 },   // rose
  picBed:    { kind: "emoji", value: "🛏️", size: 64 },   // bed
  picBread:  { kind: "emoji", value: "🍞", size: 64 },   // bread
  picPear:   { kind: "emoji", value: "🍐", size: 64 },   // pear
  picBear:   { kind: "emoji", value: "🐻", size: 64 },   // bear
  picFish:   { kind: "emoji", value: "🐟", size: 64 },   // fish
  picDish:   { kind: "emoji", value: "🍽️", size: 64 }    // dish
};
```
No emoji newer than Unicode 12; no `fallback` needed.

## Animation registry
```js
const ANIM = {
  lift:      { y: "-=8", scale: 1.06, duration: 120, ease: "Sine.Out", trigger: "tile selected" },
  join:      { duration: 220, ease: "Back.Out", trigger: "each tile of a correct pair moves 20 px toward the other (x,y at call)" },
  nudge:     { x: "+=10", duration: 80, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "both tiles of a wrong pair" },
  appear:    { alpha: 1, scale: 1, duration: 200, ease: "Back.Out", trigger: "rimeCard; tailChips; a new board (from alpha 0, scale 0.6)" },
  fadeOut:   { alpha: 0, duration: 250, ease: "Sine.In", trigger: "rimeCard after 1200 ms; tailChips after 900 ms" },
  bob:       { y: "-=10", duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "parrot on each correct pair" },
  showMe:    { alpha: 1, duration: 500, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "hintRing on the true partner (from alpha 0.2)" },
  boardOut:  { y: "-=30", alpha: 0, duration: 300, ease: "Sine.In", trigger: "all tiles when a board completes" },
  celebrate: { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "finish parrot" }
};
```
No flashing; `showMe` cycles at 1 Hz.

## Screen layout
```
y   0 ┌──────────────────────────────────────────────────────────────┐
      │ [lang]                      ○ ○   rail y=28 (one dot per board)│  zone T
 56   ├──────────────────────────────────────────────────────────────┤
      │            rimeCard (360,150) "cat  hat" with bars (1200 ms)   │
      │  parrot         [cat ]     [moon]     [bee ]    row y=240     │
      │  (80,300)                                                    │  zones A+B
      │                 [tree]     [hat ]     [spoon]   row y=360     │
      │                x=240      x=360      x=480     (100×100)     │
480   ├──────────────────────────────────────────────────────────────┤
      │                                                              │  zone C
560   └──────────────────────────────────────────────────────────────┘
```
Picture names in brackets are documentation only — the tiles show pictures, never words. 4-pair boards use x = 180 / 300 / 420 / 540; 5-pair boards x = 152 / 256 / 360 / 464 / 568 with 96 × 96 tiles. Fixed layout, FIT scaling.

## Visual specification
- Background `THEME.colour.bg`; rail per §6 with one `ART.dotEmpty` per board (2 or 3) centred at y = 28, swapped for `ART.dotFull` as boards complete.
- Tiles: `makeTile` with `ART.tile` tokens; label = the picture emoji at 64 px read through `ART[picKey].value`; selected = library selected look + `ANIM.lift`; locked = alpha 0.6 + `ART.link` between the two locked tiles' facing edges.
- `ART.rimeCard` centred (360, 150) — on a 5-pair board the top row is at y = 240, so the card still clears it; the two words at 28 px `THEME.font.display` `THEME.colour.ink`; `ART.rimeBar` under each word's rime letters (its width = the measured text width of those letters; x = the word's right edge minus half that width) — the bar is the cue, the letters are NOT recoloured, so nothing depends on colour.
- `ART.tailChip` × 2 at 36 px above each of the two tiles of a wrong pair (text "-" + tail letters, 24 px).
- `ART.hintRing` behind a tile. `ART.parrot` (80, 300). Tap floors 96-100 ≥ 80; gaps ≥ 8 at 5 columns (tiles 96, pitch 104), ≥ 20 otherwise.

## Content
Language-bound. `LOCALE_DATA[GameCore.lang].boards` supplies, per level, boards of pairs `{ a: <ART key>, b: <ART key>, wordA, wordB, rimeA, rimeB }` (the rime strings are the letters to bar under each word) plus the decoy note. The English (`en`) set is authored in full below. **Other locales: a native word list is required — en pilot.** Native authors must pick pictures whose native names rhyme by that language's convention (fr final vowel/syllable — "chat"/"rat" rhyme, "chat"/"chien" do not; de "Haus"/"Maus"; es "gato"/"pato"; fi may mark the game out of scope), rebuild the same-onset and meaning decoys from that language, and set the rime letters per word. Until then `LOCALE_DATA[lang] = "en"` and the English set plays with the chrome in the chosen language.

Pairs (picture, picture; rime letters of each): (`ART.picCat`, `ART.picHat`; at, at) · (`ART.picBat`, `ART.picRat`; at, at) · (`ART.picDog`, `ART.picFrog`; og, og) · (`ART.picMoon`, `ART.picSpoon`; oon, oon) · (`ART.picStar`, `ART.picCar`; ar, ar) · (`ART.picBee`, `ART.picTree`; ee, ee) · (`ART.picKey`, `ART.picBee`; ey, ee — L3 only) · (`ART.picHen`, `ART.picPen`; en, en) · (`ART.picBell`, `ART.picShell`; ell, ell) · (`ART.picSnake`, `ART.picCake`; ake, ake) · (`ART.picFox`, `ART.picBox`; ox, ox) · (`ART.picGoat`, `ART.picBoat`; oat, oat) · (`ART.picMouse`, `ART.picHouse`; ouse, ouse) · (`ART.picDuck`, `ART.picTruck`; uck, uck) · (`ART.picClock`, `ART.picLock`; ock, ock) · (`ART.picSock`, `ART.picClock`; ock, ock) · (`ART.picTrain`, `ART.picRain`; ain, ain) · (`ART.picWhale`, `ART.picSnail`; ale, ail — L3 only) · (`ART.picNose`, `ART.picRose`; ose, ose) · (`ART.picBed`, `ART.picBread`; ed, ead — L3 only) · (`ART.picPear`, `ART.picBear`; ear, ear) · (`ART.picFish`, `ART.picDish`; ish, ish)

Boards by level (each pair written as its two pictures; the decoy is named):
- **L1 — 3 pairs, no decoys**: [cat/hat, moon/spoon, bee/tree] · [dog/frog, star/car, hen/pen] · [snake/cake, fox/box, goat/boat] · [duck/truck, bell/shell, nose/rose] · [mouse/house, train/rain, fish/dish]
- **L2 — 4 pairs, one SAME-ONSET decoy across pairs** (misconception 1): [cat/hat, car/star, bee/tree, dog/frog — decoy cat/car] · [fox/box, fish/dish, moon/spoon, hen/pen — decoy fox/fish] · [duck/truck, dog/frog, bell/shell, snake/cake — decoy duck/dog] · [bee/tree, bell/shell, goat/boat, clock/lock — decoy bee/bell] · [mouse/house, moon/spoon, train/rain, pear/bear — decoy mouse/moon] · [snake/cake, sock/clock, hen/pen, fox/box — decoy snake/sock]
- **L3 — 5 pairs, one MEANING decoy across pairs and one differently-spelled rhyme** (misconceptions 2 and 4): [cat/hat, dog/frog, whale/snail, moon/spoon, hen/pen — decoy cat/dog; whale/snail spelled ale/ail] · [moon/spoon, star/car, bed/bread, fox/box, bell/shell — decoy moon/star; bed/bread ed/ead] · [goat/boat, key/bee, pear/bear, train/rain, clock/lock — decoy goat/bear; key/bee ey/ee] · [fish/dish, whale/snail, sock/clock, hen/pen, duck/truck — decoy fish/whale; ale/ail] · [bat/rat, cat/hat, bed/bread, nose/rose, mouse/house — decoy mouse/rat (both animals; a wrong pair); bed/bread ed/ead; note bat, rat, cat and hat all share the rime "at", so ANY two of those four lock as a correct pair on this board]

Board rules: when several boards qualify for the next level the game picks at random among those whose pictures are all unused this session, else allows a repeat; the two pictures of one pair are never horizontally adjacent in the same row on a fresh board; the decoy pair's two pictures ARE adjacent; on the L3 bat/rat/cat/hat board the pair test is "same rime", so any two of the four lock as a pair (the pair predicate is `rimeSound(a) === rimeSound(b)`, a per-pair field, never label equality).

## Rules
- Item count: one "item" = one board; 2 boards minimum, 3 boards when the child reaches L3 by the end of board 2 (session cap 3 boards, 12 pairs at most ≈ 5 minutes).
- Difficulty progression: a board completed with at most one wrong pair → next board one level up (cap L3).
- Adaptation: a board with three or more wrong pairs → next board one level down (floor L1); a board with exactly two wrong pairs → same level.
- What happens on a correct answer: `ANIM.join`, `tone("correct")`, `ART.rimeCard` for 1200 ms with both words and their rime bars, tiles lock with `ART.link`, parrot `ANIM.bob`; on board completion a praise pop (rotation ["well_done", "great_job", "excellent", "you_did_it", "keep_going"]) and the rail dot.
- What happens on a wrong answer (per anticipated mistake):
  - Same-onset decoy (cat + car): `ART.tailChip` "-at" and "-ar" above the tiles for 900 ms, then both nudge, `tone("nudge")`, de-select.
  - Meaning decoy (cat + dog): chips "-at" and "-og", then the nudge.
  - Any other non-pair: chips of the two tails, then the nudge; the board never resets.
  - The same tile in two wrong pairs: its true partner gains `ART.hintRing` (the show-me step for this pattern); the ring stays until the pair is made.
- Retry behaviour: unlimited within the board; support escalates per tile (two misses → its partner is shown). A board always completes.
- Finish condition: the session's boards complete. No losing state, no clock.

## Strings
- `GameCore.t()` keys: `t("start")`, `t("all_done")`, `t("play_again")`, `t("menu")`, `t("well_done")`, `t("great_job")`, `t("excellent")`, `t("you_did_it")`, `t("keep_going")`.
- Game-specific: `title` = "Rhyme Pairs". No UI words on the play screen; the words on the rime card and the tail chips are content from `LOCALE_DATA`.

## Sound
`tone("tap")` on select/de-select; `tone("correct")` on a pair; `tone("nudge")` on a non-pair; `tone("finish")` once. Silent under `?sound=off`. Words are NOT spoken; the pictures carry them and the rime card shows the rhyme.

## Testing checklist
- [ ] Works in all 11 languages (chrome strings change; `?lang=xx` reads `LOCALE_DATA.xx` and falls back to `en` without crashing while native lists are pending — reviewer notes "en pilot").
- [ ] Works at narrow width (400-px iframe: a 5 × 2 board is fully visible with separate tiles).
- [ ] Keyboard operable (arrows move across the grid, Enter selects; a second Enter on another tile attempts the pair).
- [ ] Never auto-starts.
- [ ] No losing state (any number of wrong pairs still ends with every pair locked; hint rings appear after two misses on a tile).
- [ ] Tapping the cat then the hat joins them and a card above shows "cat" and "hat" with a coral bar under "at" in each, which then fades.
- [ ] Tapping the cat then the car shows "-at" and "-ar" chips above them, then they nudge apart.
- [ ] On a board with cat and dog, tapping them together shows "-at" and "-og" and no pair.
- [ ] At the third level the whale and the snail pair, and the card bars "ale" under whale and "ail" under snail.
- [ ] On the bat/rat/cat/hat board any two of those four pair.
- [ ] Tapping a tile twice de-selects it with no error; a locked pair is dimmed with a bar between the tiles.
- [ ] A board with 0-1 mistakes is followed by a bigger board; a board with 3+ mistakes by a smaller one.
- [ ] The finish screen shows the pairs made with their rhyme letters and no score.
- [ ] With `?sound=off` nothing is audible.
