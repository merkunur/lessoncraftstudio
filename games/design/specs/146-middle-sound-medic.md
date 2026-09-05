# 146 — Middle Sound

## Identity
- Slug: `middle-sound-medic`
- Subject / topic: Literacy / medial vowel identification — choosing the vowel letter that fills the middle of a pictured word's frame (c_t + a cat picture → a)
- Age band: `6-8`
- Interaction pattern: `P1` — tap one of N (three vowel tiles, four at the top level)
- Estimated build size: ~460 lines

Shared contract: `catalogue/BUILD-CONVENTIONS.md`. Pattern contract: `catalogue/PATTERNS.md` P1. Locale note: **nothing is spoken** (no audio files); the word is carried by a PICTURE whose name the child knows (A-15) and by its consonant frame. Vowel inventories and minimal pairs are language-bound (F-123 is an English-derived catalogue; de has ä/ö/ü, fi has long vowels written double, es/it have five clean vowels) — every item lives in `LOCALE_DATA`; the mechanic is universal (F-217). This is an ENCODING task (the child supplies the vowel from the picture), so F-125's "no picture beside a word to decode" does not apply — the picture is the prompt and the frame has a hole. Sibling of game 071 (read three whole words and pick the one the picture names): here the consonants are given and only the middle is chosen.

## Learning
- Objective: Says a pictured word to themselves, hears its middle vowel sound, and taps the vowel letter that completes the word's consonant frame, including the close pairs e/i and a/o and frames whose consonants are digraphs or clusters.
- Prerequisites: Letter-sound correspondences for the five vowels and common consonants (5-6 games); has segmented simple words (game 070 or classroom); knows the pictured objects' names.
- Curriculum links: F-22 (blending letter-sounds into words at 6-7 and spelling by segmenting sounds in 11 of 12 systems), F-24 (letter-sound synthetic methods in EN/US/SE/NO, Fibel in DE, KÄTS in FI), F-31 rows "Blending to words (CVC / syllables)" and "Spell regular words by sounds" — conservative 7-8 → 6-8 (US RF.K.3.b / RF.1.2.a "distinguish long from short vowel sounds … in spoken single-syllable words"; England Y1 "vowel digraphs and the short vowels"; Germany Klasse 1 "Vokale hören"; France CP "voyelles"; Spain 1º "vocales en posición media"; Brazil EF01LP07; Netherlands groep 3 "klinker in het midden"; Sweden åk 1 "vokaler"; Denmark 1. klasse; Norway 1.-2. trinn; Finland 1. luokka "vokaalit"). Demand: F-3 (Vowels 158 games on SplashLearn).
- Common misconceptions (F-123, F-124, F-127), each with this game's response:
  1. **e/i confusion (pen → pin) and a/o confusion (cat → cot) — F-123.** Response: the wrong vowel is placed in the frame for 900 ms so the child sees the word it makes; when that word is a pictured word in the pool (pin, pan, bag, cap, nut, ball, shop) its picture appears beside the frame (`ART.wrongPic`) — "you made THIS" — then the vowel returns to the tray with `ANIM.nudge`. L1 offers only far-apart vowels; L2 always includes the close pair; L3 offers four vowels.
  2. **Vowel omitted altogether ("ct" for cat) — F-123.** Response: the frame has a mandatory gap (`ART.gapSlot`) and nothing else to do; the only action is to fill it, so the vowel cannot be skipped; the correct fill seals the word visibly (`ART.wordDone`).
  3. **Splitting a digraph or dropping a cluster consonant (s-h-i-p; "tet" for tent) — F-124.** Response: at L3 the frame's consonant graphemes are ONE tile each (`ART.frameWide` for sh, ch, ck, ng, ll; `ART.frameLetter` per single letter), so the child sees "sh" as one piece and "nt" as two pieces that both stay.
  4. **A wrong vowel that makes a real but different word (cot, tin, dock) is "still a word, so it must be right" — F-127.** Response: when the formed word is real but has no picture in the pool, it is shown in grey under the frame (`ART.formedWord`) and the picture card `ANIM.nudge`s — "a word, but not this picture"; when it is not a word at all, `ART.noWord` (a dashed card with "?") appears instead.
  5. **Choosing by tile position — F-65.** Response: vowel positions shuffle per item and the correct slot never repeats twice running; after two wrong taps the show-me ring identifies the tile.

## How it plays
1. **Start screen**: title "Middle Sound", the raccoon medic (`ART.raccoon`) at (360, 200) with the patch (`ART.patch`) at (410, 240), Start, picker.
2. **Item 1 (L1: cat; tiles a / o / u)**: rail of 12 dots (§6) with `t("question_x_of_y")` at (600, 28). Zone A: the picture card (`ART.card`, 140 × 140) at (150, 160) with `ART.picCat` (88 px); to its right the frame: `ART.frameLetter` "c" as a tile at (330, 160), the gap (`ART.gapSlot`, 80 × 80, dashed) at (420, 160), `ART.frameLetter` "t" at (510, 160); the raccoon at (640, 100). Caption `S("whatGoesInTheMiddle")` ("What goes in the middle?") at (360, 80), 24 px `THEME.colour.inkSoft`. Zone B: three vowel tiles (`ART.vowelTile`, 88 × 88) at y = 380, x = 240 / 360 / 480 showing a, o, u (shuffled), letters 48 px.
3. **Answering**: the child taps a vowel.
   - **Correct (a)**: the tile `ANIM.pop`, `tone("correct")`, a copy of the letter glides (`ANIM.glide`) into the gap; the gap becomes solid (`ART.gapFilled`); the three frame tiles `ANIM.seal` left to right (each pops 120 ms apart with `tone("tap", k)`); `ART.wordDone` ("cat", 28 px) appears under the picture card; `ART.patch` pops over the gap for 500 ms (`ANIM.appear` then `ANIM.fadeOut`); praise pop (rotation); rail dot fills; next item after 800 ms (`ANIM.appear` on the new card, frame and tiles).
   - **Wrong — forms a pictured word (L2 example: pen with i → pin)**: a copy of the letter glides into the gap, `tone("nudge")`; `ART.wrongPic` (a 96 × 96 card with the formed word's picture at 56 px) appears at (640, 200) with `ANIM.appear` for 900 ms while the frame reads "p i n"; then the wrong picture fades, the vowel copy `ANIM.nudge`s and glides back to its tile, the tile de-selects and stays enabled. Attempt 2.
   - **Wrong — forms a real word with no picture (cat with o → cot)**: the letter glides in, `tone("nudge")`; `ART.formedWord` ("cot", grey, 28 px) appears under the frame at (420, 236) for 900 ms and the picture card `ANIM.nudge`s (the cat is not a cot); then the letter returns. Attempt 2.
   - **Wrong — forms a non-word (sun with a → "san")**: the letter glides in, `tone("nudge")`; `ART.noWord` (a dashed 96 × 96 card with "?") appears at (640, 200) for 700 ms; the letter returns. Attempt 2.
   - **Second wrong tap**: the matching cue again, then the correct vowel tile gains `ART.showRing` with `ANIM.showMe`; tapping it completes the item as solved-with-help (no praise pop).
4. **Items 2-12**: per Content/Rules. L1 three-letter frames, far-apart vowels; L2 three-letter frames (some with a final digraph tile) with the close pair present; L3 four vowel tiles (x = 180 / 300 / 420 / 540) and frames with digraph and cluster tiles.
5. **Finish**: `t("all_done")` (360, 110); the raccoon (360, 200) `ANIM.celebrate`; the summary = the twelve completed words as `ART.wordChip` (100 × 36) in two rows of six from y = 360 (x = 360 − 2.5 × 110 + i × 110, row pitch 46), each with its vowel letter drawn 4 px larger than the rest — the middles found; `t("question_x_of_y", {n: firstTry, total: 12})` at (360, 470) 20 px `inkSoft`; `play_again` (250, 510), `menu` (470, 510); `tone("finish")`.

Session ≈ 5-6 minutes.

## Art registry
```js
const ART = {
  raccoon:     { kind: "emoji", value: "🦝", size: 80 },
  patch:       { kind: "emoji", value: "🩹", size: 40 },
  card:        { kind: "shape", shape: "roundRect", w: 140, h: 140, fill: "surface", stroke: "structure", strokeWidth: 3, radius: 18 },
  frameLetter: { kind: "shape", shape: "roundRect", w: 80, h: 80, fill: "surface", stroke: "line", strokeWidth: 2, radius: 12 },    // one consonant 48 px display ink
  frameWide:   { kind: "shape", shape: "roundRect", w: 110, h: 80, fill: "surface", stroke: "line", strokeWidth: 2, radius: 12 },   // one digraph (sh, ch, ck, ng, ll) 44 px — ONE tile
  gapSlot:     { kind: "shape", shape: "roundRect", w: 80, h: 80, fill: "surface2", stroke: "structure", strokeWidth: 2, radius: 12 },   // dashed via lineDash [8,6]
  gapFilled:   { kind: "shape", shape: "roundRect", w: 80, h: 80, fill: "structureSoft", stroke: "structure", strokeWidth: 3, radius: 12 },
  vowelTile:   { kind: "shape", shape: "roundRect", w: 88, h: 88, fill: "surface", stroke: "line", strokeWidth: 2, radius: 12 },    // vowel 48 px display ink
  wrongPic:    { kind: "shape", shape: "roundRect", w: 96, h: 96, fill: "surface", stroke: "accent", strokeWidth: 3, radius: 14 },  // holds a pool picture at 56 px
  noWord:      { kind: "shape", shape: "roundRect", w: 96, h: 96, fill: "surface2", stroke: "line", strokeWidth: 2, radius: 14 },   // dashed; "?" 44 px display inkSoft centred
  formedWord:  { kind: "text",  value: "", size: 28, font: "display", color: "inkSoft" },
  wordDone:    { kind: "text",  value: "", size: 28, font: "display", color: "structure" },
  wordChip:    { kind: "shape", shape: "roundRect", w: 100, h: 36, fill: "structureSoft", stroke: "structure", strokeWidth: 2, radius: 8 },   // word 20 px display ink, vowel 24 px
  showRing:    { kind: "shape", shape: "roundRect", w: 100, h: 100, stroke: "structure", strokeWidth: 4, radius: 16 },
  dotEmpty:    { kind: "shape", shape: "circle", r: 8, stroke: "line", strokeWidth: 2 },
  dotFull:     { kind: "shape", shape: "circle", r: 8, fill: "structure" },
  // picture pool (English word in the comment; every name unambiguous)
  picCat:   { kind: "emoji", value: "🐱", size: 88 },   // cat
  picDog:   { kind: "emoji", value: "🐶", size: 88 },   // dog
  picPin:   { kind: "emoji", value: "📌", size: 88 },   // pin
  picPan:   { kind: "emoji", value: "🍳", size: 88 },   // pan
  picBug:   { kind: "emoji", value: "🐛", size: 88 },   // bug
  picBag:   { kind: "emoji", value: "🎒", size: 88 },   // bag
  picHat:   { kind: "emoji", value: "🎩", size: 88 },   // hat
  picSun:   { kind: "emoji", value: "☀️", size: 88 },   // sun
  picCup:   { kind: "emoji", value: "☕", size: 88 },   // cup
  picCap:   { kind: "emoji", value: "🧢", size: 88 },   // cap
  picNet:   { kind: "emoji", value: "🥅", size: 88 },   // net
  picNut:   { kind: "emoji", value: "🥜", size: 88 },   // nut
  picLeg:   { kind: "emoji", value: "🦵", size: 88 },   // leg
  picBus:   { kind: "emoji", value: "🚌", size: 88 },   // bus
  picPen:   { kind: "emoji", value: "🖊️", size: 88 },   // pen
  picPig:   { kind: "emoji", value: "🐷", size: 88 },   // pig
  picBed:   { kind: "emoji", value: "🛏️", size: 88 },   // bed
  picSock:  { kind: "emoji", value: "🧦", size: 88 },   // sock
  picPot:   { kind: "emoji", value: "🍲", size: 88 },   // pot
  picFish:  { kind: "emoji", value: "🐟", size: 88 },   // fish
  picHen:   { kind: "emoji", value: "🐔", size: 88 },   // hen
  picBox:   { kind: "emoji", value: "📦", size: 88 },   // box
  picTen:   { kind: "emoji", value: "🔟", size: 88 },   // ten
  picLock:  { kind: "emoji", value: "🔒", size: 88 },   // lock
  picBell:  { kind: "emoji", value: "🔔", size: 88 },   // bell
  picBall:  { kind: "emoji", value: "⚽", size: 88 },   // ball
  picWeb:   { kind: "emoji", value: "🕸️", size: 88 },   // web
  picShip:  { kind: "emoji", value: "🚢", size: 88 },   // ship
  picShop:  { kind: "emoji", value: "🛒", size: 88 },   // shop
  picDuck:  { kind: "emoji", value: "🦆", size: 88 },   // duck
  picFrog:  { kind: "emoji", value: "🐸", size: 88 },   // frog
  picDrum:  { kind: "emoji", value: "🥁", size: 88 },   // drum
  picTent:  { kind: "emoji", value: "⛺", size: 88 },   // tent
  picCrab:  { kind: "emoji", value: "🦀", size: 88 },   // crab
  picMilk:  { kind: "emoji", value: "🥛", size: 88 },   // milk
  picClock: { kind: "emoji", value: "🕰️", size: 88 },   // clock
  picTruck: { kind: "emoji", value: "🚚", size: 88 },   // truck
  picHand:  { kind: "emoji", value: "✋", size: 88 },   // hand
  picChick: { kind: "emoji", value: "🐤", size: 88 },   // chick
  picRing:  { kind: "emoji", value: "💍", size: 88 }    // ring
};
```
No emoji newer than Unicode 12 (the raccoon is Unicode 11, the patch Unicode 12); no `fallback` needed.

## Animation registry
```js
const ANIM = {
  pop:       { scale: 1.12, duration: 140, ease: "Back.Out", yoyo: true, trigger: "correct vowel tile" },
  nudge:     { x: "+=10", duration: 80, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "returning vowel copy; picture card on a real-but-wrong word" },
  glide:     { duration: 260, ease: "Sine.InOut", trigger: "vowel copy into the gap and back (x,y at call)" },
  seal:      { scale: 1.15, duration: 120, ease: "Sine.InOut", yoyo: true, trigger: "each frame tile left to right on a correct fill, 120 ms apart" },
  appear:    { alpha: 1, scale: 1, duration: 200, ease: "Back.Out", trigger: "wrongPic; noWord; patch; a new item (from alpha 0, scale 0.6)" },
  fadeOut:   { alpha: 0, duration: 250, ease: "Sine.In", trigger: "wrongPic / formedWord after 900 ms; noWord after 700 ms; patch after 500 ms" },
  showMe:    { alpha: 1, duration: 500, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "ring on the correct vowel (from alpha 0.2)" },
  celebrate: { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "finish raccoon" }
};
```
No flashing; `showMe` cycles at 1 Hz.

## Screen layout
```
y   0 ┌──────────────────────────────────────────────────────────────┐
      │ [lang]        ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○  rail y=28   "1 of 12" (600,28)│  zone T
 56   ├──────────────────────────────────────────────────────────────┤
      │            "What goes in the middle?" (360,80)   raccoon (640,100)│
      │   ┌────────┐      [ c ]  [ _ ]  [ t ]   frame y=160           │  zone A
      │   │  cat   │     (330)  (420)  (510)    wrongPic / noWord (640,200)│
      │   └────────┘      formedWord (420,236)                        │
      │   card (150,160)  wordDone under the card (150,250)           │
260   ├──────────────────────────────────────────────────────────────┤
      │            [ o ]      [ a ]      [ u ]   vowels y=380 (88×88) │  zone B
      │            x=240     x=360     x=480                          │
480   ├──────────────────────────────────────────────────────────────┤
      │                                                              │  zone C
560   └──────────────────────────────────────────────────────────────┘
```
Frames with a wide tile: the frame is centred as a group at x = 420 with 10 px gaps (tiles 80 or 110 wide); for a four-piece frame (t, _, n, t) the group is centred the same way. Four vowel tiles use x = 180 / 300 / 420 / 540. Fixed layout, FIT scaling.

## Visual specification
- Background `THEME.colour.bg`; rail per §6: 12 × `ART.dotEmpty` (x = 239 + i × 22, y = 28) → `ART.dotFull`; `t("question_x_of_y")` at (600, 28) 18 px `inkSoft`.
- Caption `S("whatGoesInTheMiddle")` at (360, 80), 24 px `THEME.font.body` `THEME.colour.inkSoft`, `wordWrap` width 520.
- `ART.card` at (150, 160) with the item's picture (88 px) centred; `ART.wordDone` at (150, 250).
- Frame: `ART.frameLetter` / `ART.frameWide` tiles (consonant text 48 / 44 px `THEME.font.display` `THEME.colour.ink`, lowercase) and `ART.gapSlot` in reading order, centred as a group at (420, 160) with 10 px gaps; `ART.gapFilled` replaces the slot on a correct fill with the vowel at 48 px; `ART.formedWord` at (420, 236).
- `ART.raccoon` (640, 100); `ART.wrongPic` / `ART.noWord` at (640, 200).
- Vowel tiles: `makeTile` 88 × 88 (`ART.vowelTile`), vowel 48 px `THEME.font.display` `THEME.colour.ink`; `ART.showRing` behind the correct tile.
- Tap floors: vowels 88 (≥ 56); gaps ≥ 32. Frame tiles are not tappable. Tab order: vowel tiles left to right.

## Content
Language-bound. `LOCALE_DATA[GameCore.lang].items` supplies, per level, items `{ pic, frame: ["c", "_", "t"], answer: "a", tiles: ["a","o","u"], wrong: { o: { kind: "word", text: "cot" }, u: { kind: "word", text: "cut" } } }` where `wrong[v].kind` is `pic` (with `pic: <ART key>`), `word` (a real word, shown grey) or `none` (a non-word). The English (`en`) set is authored in full below. **Other locales: a native list is required — en pilot.** Native authors must rebuild the frames and minimal pairs from that language (de "Hut"/"Hat", "Bus"/"Bass"; es "pato"/"pito"; it "pane"/"pene" is to be avoided — a native chooses; fi long-vowel pairs such as "tuli"/"tuuli" belong to a different game), set each locale's vowel tiles (de may add ä/ö/ü at L3; es/it use a/e/i/o/u only), and tag every wrong fill as pic / word / none. Until then `LOCALE_DATA[lang] = "en"`.

Items (picture; frame; answer; tiles; wrong fills):
- **L1 — three-letter frames, far-apart vowels**: (`ART.picCat`; c _ t; a; a o u; o word "cot", u word "cut") · (`ART.picDog`; d _ g; o; o i u; i word "dig", u word "dug") · (`ART.picPin`; p _ n; i; i a u; a pic `ART.picPan`, u word "pun") · (`ART.picBug`; b _ g; u; u a o; a pic `ART.picBag`, o word "bog") · (`ART.picHat`; h _ t; a; a u i; u word "hut", i word "hit") · (`ART.picSun`; s _ n; u; u a i; a none, i none) · (`ART.picCup`; c _ p; u; u a o; a pic `ART.picCap`, o word "cop") · (`ART.picNet`; n _ t; e; e u o; u pic `ART.picNut`, o word "not") · (`ART.picLeg`; l _ g; e; e o u; o word "log", u word "lug") · (`ART.picBus`; b _ s; u; u a i; a none, i none)
- **L2 — the close pair present (e/i or a/o); some final digraph tiles** (misconception 1): (`ART.picPen`; p _ n; e; e i a; i pic `ART.picPin`, a pic `ART.picPan`) · (`ART.picPig`; p _ g; i; i e a; e word "peg", a none) · (`ART.picBed`; b _ d; e; e i a; i word "bid", a word "bad") · (`ART.picSock`; s _ ck; o; o a i; a word "sack", i word "sick") · (`ART.picPot`; p _ t; o; o a e; a word "pat", e word "pet") · (`ART.picFish`; f _ sh; i; i e a; e none, a none) · (`ART.picHen`; h _ n; e; e i o; i none, o none) · (`ART.picBox`; b _ x; o; o a i; a none, i none) · (`ART.picTen`; t _ n; e; e i a; i word "tin", a word "tan") · (`ART.picLock`; l _ ck; o; o a i; a word "lack", i word "lick") · (`ART.picBell`; b _ ll; e; e a i; a pic `ART.picBall`, i word "bill") · (`ART.picWeb`; w _ b; e; e i o; i none, o none)
- **L3 — four tiles; digraph and cluster frames** (misconception 3): (`ART.picShip`; sh _ p; i; i o a e; o pic `ART.picShop`, a none, e none) · (`ART.picDuck`; d _ ck; u; u o e a; o word "dock", e word "deck", a none) · (`ART.picFrog`; fr _ g; o; o i a u; i none, a none, u none) · (`ART.picDrum`; dr _ m; u; u a i o; a word "dram", i none, o none) · (`ART.picTent`; t _ nt; e; e i a u; i word "tint", a none, u none) · (`ART.picCrab`; cr _ b; a; a i o u; i word "crib", o none, u none) · (`ART.picMilk`; m _ lk; i; i e a u; e none, a none, u none) · (`ART.picClock`; cl _ ck; o; o i a u; i word "click", a word "clack", u word "cluck") · (`ART.picTruck`; tr _ ck; u; u i a o; i word "trick", a word "track", o none) · (`ART.picHand`; h _ nd; a; a i e o; i word "hind", e none, o none) · (`ART.picChick`; ch _ ck; i; i e o a; e word "check", o word "chock", a none) · (`ART.picRing`; r _ ng; i; i a u o; a word "rang", u word "rung", o none)

Frame pieces: "sh", "ch", "ck", "ng", "ll" are `ART.frameWide` (one tile each); "fr", "dr", "cr", "cl", "tr", "nt", "nd", "lk" are TWO `ART.frameLetter` tiles (a cluster is two sounds — F-124).

Play list: 12 items; start at L1; levels per Rules; no picture repeats within a session; tiles shuffled per item; the correct slot never repeats twice running (§13).

## Rules
- Item count: 12.
- Difficulty progression: 2 consecutive first-try correct → next level (cap L3).
- Adaptation: a wrong tap, or wrong first-try on 2 consecutive items → next item one level down (floor L1).
- What happens on a correct answer: `ANIM.pop`, `tone("correct")`, the vowel glides into the gap, the frame `ANIM.seal`s left to right with rising tones, `ART.wordDone` under the card, the patch pops for 500 ms, praise rotation ["well_done", "great_job", "excellent", "you_did_it", "keep_going"], rail dot, next item after 800 ms.
- What happens on a wrong answer (per anticipated mistake):
  - Close-pair vowel forming a pictured word (i for pen → pin): the letter sits in the gap, `tone("nudge")`, `ART.wrongPic` with the pin picture for 900 ms, then the letter returns with `ANIM.nudge`.
  - Vowel forming a real un-pictured word (o for cat → cot): the letter sits in the gap, `ART.formedWord` "cot" grey under the frame for 900 ms, the picture card nudges, then the letter returns.
  - Vowel forming a non-word (a for sun): the letter sits in the gap, `ART.noWord` "?" for 700 ms, then the letter returns.
  - Position habit (a wrong tile at the same slot twice): no extra cue; the show-me ring after the second wrong tap.
- Retry behaviour: attempt 1 → attempt 2 after the cue → attempt 3 with the show-me ring; solved-with-help. No attempt 4.
- Finish condition: 12 items. No losing state, no clock.

## Strings
- `GameCore.t()` keys: `t("start")`, `t("question_x_of_y")`, `t("all_done")`, `t("play_again")`, `t("menu")`, `t("well_done")`, `t("great_job")`, `t("excellent")`, `t("you_did_it")`, `t("keep_going")`.
- Game-specific: `title` = "Middle Sound"; `whatGoesInTheMiddle` = "What goes in the middle?". Frame letters, formed words and the "?" are content from `LOCALE_DATA`.

## Sound
`tone("correct")` on the right vowel; `tone("tap", k)` per frame tile in the seal (left to right, pitch rising); `tone("nudge")` on a wrong vowel; `tone("finish")` once. Silent under `?sound=off`. The word and the vowel are NOT spoken; the picture carries the word and the frame shows the letters.

## Testing checklist
- [ ] Works in all 11 languages (chrome strings change; `?lang=xx` reads `LOCALE_DATA.xx` and falls back to `en` without crashing while native lists are pending — reviewer notes "en pilot").
- [ ] Works at narrow width (400-px iframe: card, a four-piece frame, the raccoon and four vowel tiles visible and separate).
- [ ] Keyboard operable (Tab across the vowel tiles; Enter picks).
- [ ] Never auto-starts.
- [ ] No losing state (wrong vowels never end the session; the ring always completes the item).
- [ ] For the cat, tapping "a" fills the gap, the three frame tiles pop in turn with rising notes, "cat" appears under the picture and a small patch flashes once over the gap.
- [ ] For the pen, tapping "i" puts the i in the gap and shows a pin picture beside the frame for about a second, then the letter returns to its tile.
- [ ] For the cat, tapping "o" shows "cot" in grey under the frame and wiggles the cat card; for the sun, tapping "a" shows a dashed "?" card.
- [ ] At the third level "sh", "ck" and "ng" are single wide frame tiles and "fr" / "nt" are two tiles.
- [ ] Two first-try corrects in a row bring the close-pair vowels (e beside i); a wrong tap brings far-apart vowels next.
- [ ] The correct vowel is never in the same position twice in a row.
- [ ] The finish screen shows the twelve words with their middle letters enlarged, the first-try count, and no score beyond that count.
- [ ] With `?sound=off` nothing is audible.
