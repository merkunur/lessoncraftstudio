# 147 — Sound Count

## Identity
- Slug: `sound-count`
- Subject / topic: Literacy / phoneme counting — tapping a drum once per SOUND in a pictured word (a digraph is one sound; a cluster is two) and stating the count
- Age band: `6-8`
- Interaction pattern: `P3` — tap to count (one drum tap per sound; a P1 numeral choice states the count)
- Estimated build size: ~470 lines

Shared contract: `catalogue/BUILD-CONVENTIONS.md`. Pattern contract: `catalogue/PATTERNS.md` P3 (each tap adds one token and one rising tone; the answer is a numeral tile; a wrong answer replays the count slowly). Locale note: **nothing is spoken** (no audio files); the word is carried by a PICTURE whose name the child knows (A-15). Phoneme inventories and digraph sets are language-bound (F-124: en sh/ch/th/ck/ee/oo, de sch/ch/ei, nl oe/ij, fi almost none — in Finnish letters ≈ sounds, so the fi list is a counting-letters list with double vowels as one long sound) — every word list lives in `LOCALE_DATA`; the mechanic is universal (F-217). The harder sibling of game 063 (syllables at 5-6): same drum, same rail, but the beats are phonemes.

## Learning
- Objective: Says a pictured word to themselves, taps the drum once per sound in it, and taps the numeral that matches — counting a digraph as one sound and both consonants of a cluster as two.
- Prerequisites: Has drummed syllables (game 063); knows some letter-sound correspondences (5-6 letter games) so the replay's sound chips make sense; knows the pictured objects' names. The chips are a cue, not a decoding prompt (F-125 applies to decoding tasks only).
- Curriculum links: F-22 (phonological awareness → phonemic segmenting at 6-7; spelling by segmenting sounds in 11 of 12 systems), F-24 (synthetic phonics in EN/US/SE/NO; KÄTS sound-letter in FI), F-31 rows "Blending to words" and "Spell regular words by sounds" — conservative 7-8 → 6-8 (US RF.K.2.d / RF.1.2.d "segment spoken single-syllable words into their complete sequence of individual sounds"; England Y1 "segment spoken words into phonemes"; Germany Klasse 1 "Laute hören und zählen"; France CP "phonèmes"; Spain 1º "conciencia fonémica"; Brazil EF01LP07 "fonemas"; Netherlands groep 3 "hakken"; Sweden åk 1 "ljud"; Denmark 1. klasse "lyde"; Norway 1.-2. trinn "lyder"; Finland 1. luokka "äänteet"). Demand: F-3 (Phonics 2,225 games — blending 432).
- Common misconceptions (F-124, F-126, F-101), each with this game's response:
  1. **Counting letters instead of sounds (fish → 4, duck → 4) — F-124 "splits digraphs".** Response: on a wrong numeral the **slow replay** shows the word's sound chips under the picture (`ART.chip` per single-letter sound, `ART.chipWide` for a digraph — ONE chip for "sh", "ck", "oo"), one every 600 ms with a beat token and `tone("tap", k)`; L2 is built from digraph words so the letter strategy fails there.
  2. **Dropping the nasal or liquid inside a cluster (tent → t-e-t, milk → m-i-k) — F-124.** Response: L3 words carry clusters; in the replay the cluster's inside sound ("n" in tent, "l" in milk) is drawn with `ART.chipMark` beneath and plays `ANIM.lastChunk` — the sound that was missed is the one that jumps.
  3. **Segmenting onset-rime instead of phonemes (c-at → 2) — F-124.** Response: the replay shows three chips for cat; L1 pairs 2-sound words (bee, cow) with 3-sound words so "2" is right sometimes and wrong other times.
  4. **Losing count of their own taps — F-101 cardinality.** Response: every tap places a numbered token (`ART.beat` + `ART.beatNumeral`) on the rail that stays until the numeral is tapped; a tap on a token removes it and those after it (undo), so an accidental extra tap is fixable without a wrong answer.
  5. **Drumming for fun beyond the count (F-65 brute force).** Response: the rail holds at most 6 tokens; a 7th tap makes the drum `ANIM.nudge` and adds nothing; the numeral is judged against the word's true count, never against the tokens.

## How it plays
1. **Start screen**: title "Sound Count", the turtle (`ART.turtle`) at (360, 180) with the drum (`ART.drum`) at (360, 250), Start, picker.
2. **Item 1 (L1: cat)**: rail of 12 dots (§6) with `t("question_x_of_y")` at (600, 28). Zone A: the picture card (`ART.card`, 160 × 160) centred at (200, 160) with `ART.picCat` (96 px). The turtle sits at (520, 110). Caption `S("tapOncePerSound")` ("Tap the drum once for each sound") at (360, 240), 22 px `THEME.colour.inkSoft`. Zone B: the drum — a `makeTile` 140 × 140 at (200, 380) with `ART.drum` as its label; to its right the beat rail: six hollow slots (`ART.beatSlot`, r 18) at y = 300, x = 330 / 380 / 430 / 480 / 530 / 580; below the rail three numeral tiles (`ART.numeralTile`, 88 × 88) at y = 400, x = 330 / 442 / 554 showing the true count and two distractors (Content), shuffled, disabled until at least one beat exists.
3. **Beating**: the child taps the drum. Each tap: `ANIM.hit` on the drum, `tone("tap", k)` for the k-th beat, and a token (`ART.beat`) with the numeral k (`ART.beatNumeral`) appears in the k-th slot (`ANIM.appear`). Tapping a token removes it and every token after it (undo; `ANIM.fadeOut`, `tone("tap")`). A 7th tap only `ANIM.nudge`s the drum. The numeral tiles enable at the first token.
4. **Answering**: the child taps a numeral.
   - **Correct (3)**: `ANIM.pop`, `tone("correct")`, praise pop (rotation); the tokens glide (`ANIM.glide`) onto the card and settle along its bottom edge as `ART.beatMark`s; the turtle `ANIM.nodSlow`; rail dot fills; next item after 700 ms.
   - **Wrong (2 or 4)**: `ANIM.nudge`, `tone("nudge")`, the numeral de-selects; the tokens fade; the **slow replay**: the sound chips ("c", "a", "t") appear under the card at y = 250 one every 600 ms (the caption hides during the replay), each with a token on the rail and `tone("tap", k)`; a marked chip (cluster inside sound) shows `ART.chipMark` and plays `ANIM.lastChunk`; the last chip pulses; after 900 ms the chips fade, the tokens stay. Attempt 2.
   - **Second wrong**: the replay again; the correct numeral gains `ART.showRing` with `ANIM.showMe`; tapping it completes the item as solved-with-help (no praise pop).
5. **Items 2-12**: per Content/Rules. L1 2- and 3-sound words where letters match sounds; L2 3-sound words with a digraph (more letters than sounds); L3 4- and 5-sound cluster words.
6. **Finish**: `t("all_done")` (360, 110); the turtle (360, 200) with the drum `ANIM.celebrate`; the summary = the twelve pictures of the session in two rows of six at y = 350 and y = 430 as `ART.cardMini` (72 × 84, x = 360 − 2.5 × 88 + i × 88) each with its beat marks along the bottom (2-5 small `ART.beatMark`) — the words and their sounds; `t("question_x_of_y", {n: firstTry, total: 12})` at (360, 490) 20 px `inkSoft`; `play_again` (250, 510), `menu` (470, 510); `tone("finish")`.

Session ≈ 5-6 minutes.

## Art registry
```js
const ART = {
  turtle:      { kind: "emoji", value: "🐢", size: 80 },
  drum:        { kind: "emoji", value: "🥁", size: 96 },
  card:        { kind: "shape", shape: "roundRect", w: 160, h: 160, fill: "surface", stroke: "structure", strokeWidth: 3, radius: 18 },
  cardMini:    { kind: "shape", shape: "roundRect", w: 72, h: 84, fill: "surface", stroke: "structure", strokeWidth: 2, radius: 10 },
  beatSlot:    { kind: "shape", shape: "circle", r: 18, stroke: "line", strokeWidth: 2 },
  beat:        { kind: "shape", shape: "circle", r: 18, fill: "structure" },
  beatNumeral: { kind: "text",  value: "", size: 20, font: "display", color: "bg" },
  beatMark:    { kind: "shape", shape: "circle", r: 6, fill: "structure" },
  chip:        { kind: "shape", shape: "roundRect", w: 52, h: 44, fill: "structureSoft", stroke: "structure", strokeWidth: 2, radius: 10 },   // one grapheme 28 px display ink
  chipWide:    { kind: "shape", shape: "roundRect", w: 76, h: 44, fill: "structureSoft", stroke: "structure", strokeWidth: 2, radius: 10 },   // a digraph — ONE chip, 26 px
  chipMark:    { kind: "shape", shape: "rect", w: 40, h: 6, fill: "accent" },   // under the cluster's inside sound
  numeralTile: { kind: "shape", shape: "roundRect", w: 88, h: 88, fill: "surface", stroke: "line", strokeWidth: 2, radius: 12 },      // numeral 44 px
  showRing:    { kind: "shape", shape: "roundRect", w: 100, h: 100, stroke: "structure", strokeWidth: 4, radius: 16 },
  dotEmpty:    { kind: "shape", shape: "circle", r: 8, stroke: "line", strokeWidth: 2 },
  dotFull:     { kind: "shape", shape: "circle", r: 8, fill: "structure" },
  // picture pool (English word and sound count in the comment; every name unambiguous)
  picBee:    { kind: "emoji", value: "🐝", size: 96 },   // bee 2
  picCow:    { kind: "emoji", value: "🐮", size: 96 },   // cow 2
  picKey:    { kind: "emoji", value: "🔑", size: 96 },   // key 2
  picEgg:    { kind: "emoji", value: "🥚", size: 96 },   // egg 2
  picOwl:    { kind: "emoji", value: "🦉", size: 96 },   // owl 2
  picTie:    { kind: "emoji", value: "👔", size: 96 },   // tie 2
  picCat:    { kind: "emoji", value: "🐱", size: 96 },   // cat 3
  picDog:    { kind: "emoji", value: "🐶", size: 96 },   // dog 3
  picSun:    { kind: "emoji", value: "☀️", size: 96 },   // sun 3
  picPig:    { kind: "emoji", value: "🐷", size: 96 },   // pig 3
  picBus:    { kind: "emoji", value: "🚌", size: 96 },   // bus 3
  picHat:    { kind: "emoji", value: "🎩", size: 96 },   // hat 3
  picCup:    { kind: "emoji", value: "☕", size: 96 },   // cup 3
  picPen:    { kind: "emoji", value: "🖊️", size: 96 },   // pen 3
  picAnt:    { kind: "emoji", value: "🐜", size: 96 },   // ant 3
  picFish:   { kind: "emoji", value: "🐟", size: 96 },   // fish 3 (f, i, sh)
  picShip:   { kind: "emoji", value: "🚢", size: 96 },   // ship 3 (sh, i, p)
  picDuck:   { kind: "emoji", value: "🦆", size: 96 },   // duck 3 (d, u, ck)
  picSock:   { kind: "emoji", value: "🧦", size: 96 },   // sock 3
  picBell:   { kind: "emoji", value: "🔔", size: 96 },   // bell 3 (b, e, ll)
  picMoon:   { kind: "emoji", value: "🌙", size: 96 },   // moon 3 (m, oo, n)
  picSheep:  { kind: "emoji", value: "🐑", size: 96 },   // sheep 3 (sh, ee, p)
  picChick:  { kind: "emoji", value: "🐤", size: 96 },   // chick 3 (ch, i, ck)
  picTooth:  { kind: "emoji", value: "🦷", size: 96 },   // tooth 3 (t, oo, th)
  picRing:   { kind: "emoji", value: "💍", size: 96 },   // ring 3 (r, i, ng)
  picBoat:   { kind: "emoji", value: "⛵", size: 96 },   // boat 3 (b, oa, t)
  picRain:   { kind: "emoji", value: "🌧️", size: 96 },   // rain 3 (r, ai, n)
  picBook:   { kind: "emoji", value: "📖", size: 96 },   // book 3 (b, oo, k)
  picCheese: { kind: "emoji", value: "🧀", size: 96 },   // cheese 3 (ch, ee, se)
  picStop:   { kind: "emoji", value: "🛑", size: 96 },   // stop 4
  picFrog:   { kind: "emoji", value: "🐸", size: 96 },   // frog 4
  picTent:   { kind: "emoji", value: "⛺", size: 96 },   // tent 4
  picMilk:   { kind: "emoji", value: "🥛", size: 96 },   // milk 4
  picHand:   { kind: "emoji", value: "✋", size: 96 },   // hand 4
  picCrab:   { kind: "emoji", value: "🦀", size: 96 },   // crab 4
  picDrum:   { kind: "emoji", value: "🥁", size: 96 },   // drum 4
  picFlag:   { kind: "emoji", value: "🏁", size: 96 },   // flag 4
  picClock:  { kind: "emoji", value: "🕰️", size: 96 },   // clock 4 (c, l, o, ck)
  picTruck:  { kind: "emoji", value: "🚚", size: 96 },   // truck 4 (t, r, u, ck)
  picSnail:  { kind: "emoji", value: "🐌", size: 96 },   // snail 4 (s, n, ai, l)
  picBrush:  { kind: "emoji", value: "🖌️", size: 96 },   // brush 4 (b, r, u, sh)
  picTrain:  { kind: "emoji", value: "🚂", size: 96 },   // train 4 (t, r, ai, n)
  picGift:   { kind: "emoji", value: "🎁", size: 96 },   // gift 4
  picSkunk:  { kind: "emoji", value: "🦨", size: 96 }    // skunk 5 (s, k, u, ng, k)
};
```
No emoji newer than Unicode 12 (tooth and skunk are Unicode 11); no `fallback` needed. The stop sign is used ONLY with the intended word "stop".

## Animation registry
```js
const ANIM = {
  hit:       { scaleY: 0.85, scaleX: 1.08, duration: 90, ease: "Sine.Out", yoyo: true, trigger: "drum on every beat" },
  appear:    { alpha: 1, scale: 1, duration: 200, ease: "Back.Out", trigger: "a beat token; a chip; a new picture (from alpha 0, scale 0.6)" },
  fadeOut:   { alpha: 0, duration: 250, ease: "Sine.In", trigger: "removed tokens; chips after the replay; caption during the replay" },
  nudge:     { x: "+=10", duration: 80, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "drum on a 7th tap; wrong numeral" },
  pop:       { scale: 1.12, duration: 140, ease: "Back.Out", yoyo: true, trigger: "correct numeral" },
  lastChunk: { scale: 1.25, duration: 220, ease: "Back.Out", yoyo: true, trigger: "the marked chip and the last chip of the slow replay" },
  glide:     { duration: 260, ease: "Sine.InOut", trigger: "tokens onto the card as beat marks (x,y at call), 100 ms apart" },
  nodSlow:   { angle: 5, duration: 200, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "turtle on a correct answer" },
  showMe:    { alpha: 1, duration: 500, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "ring on the correct numeral (from alpha 0.2)" },
  celebrate: { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "finish turtle" }
};
```
No flashing; the replay adds one chip per 600 ms.

## Screen layout
```
y   0 ┌──────────────────────────────────────────────────────────────┐
      │ [lang]        ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○  rail y=28   "1 of 12" (600,28)│  zone T
 56   ├──────────────────────────────────────────────────────────────┤
      │        ┌──────────┐                                          │
      │        │ picture  │  card (200,160) 160×160    turtle (520,110)│  zone A
      │        │          │                                          │
      │        └──────────┘  chips y=250: [c] [a] [t] (replay only)   │
      │          "Tap the drum once for each sound" (360,240)         │
260   ├──────────────────────────────────────────────────────────────┤
      │                     ( ) ( ) ( ) ( ) ( ) ( )  beat rail y=300  │
      │      [  drum  ]     x=330/380/430/480/530/580                 │  zone B
      │      (200,380)      [ 2 ]     [ 3 ]     [ 4 ]  numerals y=400 │
      │      140×140        x=330     x=442     x=554  (88×88)        │
480   ├──────────────────────────────────────────────────────────────┤
      │                                                              │  zone C
560   └──────────────────────────────────────────────────────────────┘
```
Chips are centred as a group under the card: for n chips of widths w_i with 8 px gaps, the group is centred at x = 200 (for 5 chips the group is 52 × 4 + 76 + 32 = 316 wide, from x = 42 — inside the safe margin). Fixed layout, FIT scaling.

## Visual specification
- Background `THEME.colour.bg`; rail per §6: 12 × `ART.dotEmpty` (x = 239 + i × 22, y = 28) → `ART.dotFull`; `t("question_x_of_y")` at (600, 28) 18 px `inkSoft`.
- `ART.card` centred (200, 160) with the item's picture (96 px) centred on it; `ART.turtle` at (520, 110).
- Caption `S("tapOncePerSound")` at (360, 240), 22 px `THEME.font.body` `THEME.colour.inkSoft`, `wordWrap` width 640, hidden while chips are showing.
- Drum: `makeTile` 140 × 140 at (200, 380) with `ART.drum` as label and `THEME.colour.surface2` fill / `THEME.colour.line` stroke; `ANIM.hit` plays on the label.
- Beat rail: 6 × `ART.beatSlot` at y = 300 (pitch 50); a placed token = `ART.beat` with `ART.beatNumeral` centred; tokens are `makeTile` 44 × 44 (transparent fill) so they are tappable for undo — a deliberate exception to the 56 floor: tokens are an undo affordance, not the primary control, and a mis-tap on a neighbour still undoes, never a wrong answer.
- Chips: `ART.chip` / `ART.chipWide` at y = 250 with the grapheme 28 / 26 px `THEME.font.display` `THEME.colour.ink`; `ART.chipMark` 24 px below a marked chip's centre.
- Numeral tiles: `makeTile` 88 × 88 (`ART.numeralTile`), numeral 44 px `THEME.font.display` `THEME.colour.ink`; alpha 0.5 until one token exists.
- `ART.beatMark` copies along the card's bottom edge at y = 232 (x = 200 − (n−1) × 12 + i × 24) after a correct answer; `ART.showRing` behind the correct numeral.
- Tap floors: drum 140, numerals 88 (≥ 56); gaps ≥ 24. Tab order: drum, numeral tiles, tokens.

## Content
Language-bound. `LOCALE_DATA[GameCore.lang].items` supplies, per item, `{ pic, count, chips: ["c","a","t"], mark: null | <chip index> }` (a chip string of two or more letters is drawn as `ART.chipWide`; `mark` names the cluster's inside sound). The English (`en`) list is authored in full below. **Other locales: a native word list is required — en pilot.** Native authors must choose pictures whose native name has the intended sound count by that language's phoneme conventions (de "Fisch" = f-i-sch 3, "Schiff" = sch-i-ff 3; nl "vis" 3, "boek" = b-oe-k 3; es "sol" 3, "pez" 3; fi "kissa" = k-i-s-s-a 5 with double letters as long sounds — a fi list may instead mark double letters as one wide chip; fr "chat" = ch-a 2 with the silent t as no chip), must set the marked cluster sounds for that language (de "Hund" d… n; nl "hand"), and must not translate the English list. Until then `LOCALE_DATA[lang] = "en"`. Distractor numerals are always the two nearest counts (2 → 1, 3; 3 → 2, 4; 4 → 3, 5; 5 → 4, 6).

Each item = (picture; count; chips; marked chip).
- **L1 — 2 and 3 sounds, letters ≈ sounds** (misconception 3): (`ART.picBee`; 2; "b", "ee"; —) · (`ART.picCat`; 3; "c", "a", "t"; —) · (`ART.picCow`; 2; "c", "ow"; —) · (`ART.picDog`; 3; "d", "o", "g"; —) · (`ART.picKey`; 2; "k", "ey"; —) · (`ART.picSun`; 3; "s", "u", "n"; —) · (`ART.picEgg`; 2; "e", "gg"; —) · (`ART.picPig`; 3; "p", "i", "g"; —) · (`ART.picOwl`; 2; "ow", "l"; —) · (`ART.picBus`; 3; "b", "u", "s"; —) · (`ART.picTie`; 2; "t", "ie"; —) · (`ART.picHat`; 3; "h", "a", "t"; —) · (`ART.picCup`; 3; "c", "u", "p"; —) · (`ART.picPen`; 3; "p", "e", "n"; —) · (`ART.picAnt`; 3; "a", "n", "t"; 1)
- **L2 — 3 sounds with a digraph (more letters than sounds)** (misconception 1): (`ART.picFish`; 3; "f", "i", "sh"; —) · (`ART.picShip`; 3; "sh", "i", "p"; —) · (`ART.picDuck`; 3; "d", "u", "ck"; —) · (`ART.picSock`; 3; "s", "o", "ck"; —) · (`ART.picBell`; 3; "b", "e", "ll"; —) · (`ART.picMoon`; 3; "m", "oo", "n"; —) · (`ART.picSheep`; 3; "sh", "ee", "p"; —) · (`ART.picChick`; 3; "ch", "i", "ck"; —) · (`ART.picTooth`; 3; "t", "oo", "th"; —) · (`ART.picRing`; 3; "r", "i", "ng"; —) · (`ART.picBoat`; 3; "b", "oa", "t"; —) · (`ART.picRain`; 3; "r", "ai", "n"; —) · (`ART.picBook`; 3; "b", "oo", "k"; —) · (`ART.picCheese`; 3; "ch", "ee", "se"; —)
- **L3 — 4 and 5 sounds with clusters; the inside sound is marked** (misconception 2): (`ART.picStop`; 4; "s", "t", "o", "p"; 1) · (`ART.picFrog`; 4; "f", "r", "o", "g"; 1) · (`ART.picTent`; 4; "t", "e", "n", "t"; 2) · (`ART.picMilk`; 4; "m", "i", "l", "k"; 2) · (`ART.picHand`; 4; "h", "a", "n", "d"; 2) · (`ART.picCrab`; 4; "c", "r", "a", "b"; 1) · (`ART.picDrum`; 4; "d", "r", "u", "m"; 1) · (`ART.picFlag`; 4; "f", "l", "a", "g"; 1) · (`ART.picClock`; 4; "c", "l", "o", "ck"; 1) · (`ART.picTruck`; 4; "t", "r", "u", "ck"; 1) · (`ART.picSnail`; 4; "s", "n", "ai", "l"; 1) · (`ART.picBrush`; 4; "b", "r", "u", "sh"; 1) · (`ART.picTrain`; 4; "t", "r", "ai", "n"; 1) · (`ART.picGift`; 4; "g", "i", "f", "t"; 2) · (`ART.picSkunk`; 5; "s", "k", "u", "ng", "k"; 1)

Play list: 12 items; start at L1; levels per Rules; no picture repeats within a session; the numeral slot of the correct answer never repeats twice running (§13). Chip text uses `THEME.font.display`.

## Rules
- Item count: 12.
- Difficulty progression: 2 consecutive first-try correct (the first numeral tapped is correct) → next level (cap L3).
- Adaptation: a wrong numeral, or wrong first-try on 2 consecutive items → next item one level down (floor L1). Undo taps on tokens are never errors.
- What happens on a correct answer: `ANIM.pop`, `tone("correct")`, praise rotation ["well_done", "great_job", "excellent", "you_did_it", "keep_going"], the tokens glide onto the card as beat marks, turtle `ANIM.nodSlow`, rail dot fills, next item after 700 ms. The numeral is judged against the word's count, not against the tokens — a child who drummed 5 but answers 4 for "stop" is right and no replay is shown.
- What happens on a wrong answer (per anticipated mistake):
  - Too many (letters counted — fish → 4): `ANIM.nudge`, `tone("nudge")`; the slow replay shows three chips with "sh" as ONE wide chip.
  - Too few (cluster sound dropped — tent → 3): nudge + tone; the replay shows four chips and the "n" chip carries `ART.chipMark` and jumps with `ANIM.lastChunk`.
  - Onset-rime split (cat → 2): nudge + tone; the replay shows three chips.
  - Miscounted own taps (tokens 4, answered 3): nudge + tone; the replay; the tokens on the rail are the count to read for attempt 2.
  - 7th drum tap: the drum nudges, nothing is added (not an attempt).
  - Numeral tapped before any beat: cannot happen (tiles disabled until one token exists).
- Retry behaviour: attempt 1 → attempt 2 after the replay → attempt 3 with the show-me ring; solved-with-help. No attempt 4.
- Finish condition: 12 items. No losing state, no clock.

## Strings
- `GameCore.t()` keys: `t("start")`, `t("question_x_of_y")`, `t("all_done")`, `t("play_again")`, `t("menu")`, `t("well_done")`, `t("great_job")`, `t("excellent")`, `t("you_did_it")`, `t("keep_going")`.
- Game-specific: `title` = "Sound Count"; `tapOncePerSound` = "Tap the drum once for each sound". The chip strings are locale content from `LOCALE_DATA`, not UI copy.

## Sound
`tone("tap", k)` on the k-th drum beat (pitch rises with each beat — one note per sound, F-213 / F-70); `tone("tap")` on an undo; `tone("correct")` on the right numeral; `tone("nudge")` on a wrong numeral or a 7th beat; `tone("tap", k)` again per chip in the slow replay; `tone("finish")` once. Silent under `?sound=off`. The word is never spoken; the picture carries it and the chips show its sounds.

## Testing checklist
- [ ] Works in all 11 languages (chrome strings change; `?lang=xx` reads `LOCALE_DATA.xx` and falls back to `en` without crashing while native lists are pending — reviewer notes "en pilot").
- [ ] Works at narrow width (400-px iframe: card, drum, six rail slots and three numerals visible and separate).
- [ ] Keyboard operable (Tab: drum, numerals, tokens; Enter beats / answers / undoes).
- [ ] Never auto-starts.
- [ ] No losing state (wrong numerals never end the session; the ring always completes the item).
- [ ] Each drum tap adds one numbered token with a higher note than the last; the seventh tap adds nothing and wiggles the drum.
- [ ] Tapping a token removes it and the tokens after it; the numeral tiles are dimmed until the first beat.
- [ ] For the fish, tapping "4" shows "f", "i" and one wide "sh" chip appearing one by one with a beat each.
- [ ] For the tent, tapping "3" shows four chips and the "n" chip has a coral bar under it and jumps.
- [ ] For the cat, tapping "2" shows three chips.
- [ ] Tapping "4" for "stop" after drumming five times is accepted as correct.
- [ ] Two first-try corrects in a row bring digraph words, then cluster words; a wrong numeral brings simpler words.
- [ ] After a correct answer the tokens settle along the bottom of the picture card; the finish screen shows twelve small cards with their beat marks and the first-try count, nothing else scored.
- [ ] With `?sound=off` nothing is audible.
