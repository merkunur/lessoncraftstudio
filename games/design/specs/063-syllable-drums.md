# 063 — Syllable Drums

## Identity
- Slug: `syllable-drums`
- Subject / topic: Literacy / syllable counting — beating a drum once per syllable of a pictured word and stating the count
- Age band: `5-6`
- Interaction pattern: `P3` — tap to count (one drum tap per syllable; a P1 numeral choice states the count)
- Estimated build size: ~440 lines

Shared contract: `catalogue/BUILD-CONVENTIONS.md`. Pattern contract: `catalogue/PATTERNS.md` P3 (each tap adds one token and one rising tone; the answer is a numeral tile; a wrong answer replays the count slowly). Locale note: **nothing is spoken** (no audio files); the word is carried by a PICTURE whose name the child says to themselves (A-15). Syllable conventions differ by language (F-126: English counts vowel sounds and elides in fast speech; Spanish/Italian/Portuguese/Finnish syllables are clear and taught explicitly; German compounds and French mute-e endings change counts; Dutch and the Nordic languages split on their own rules) — every word list and every syllable split lives in `LOCALE_DATA`; the mechanic is universal (F-217).

## Learning
- Objective: Says a pictured word to themselves, taps the drum once per syllable, and taps the numeral that matches the number of beats.
- Prerequisites: Knows the names of common pictured objects in the play language; can count 1-4 taps (game 001). No reading — the syllable chunks that appear in the slow replay are a cue, never something to decode (F-125 applies to decoding tasks only).
- Curriculum links: F-22 (phonological awareness — syllables — at 5-7 in all twelve systems), F-24 (syllable work is the entry point for the Romance and Finnish reading methods — this game is Romance-first in value), F-31 row "Rhyme, syllable clapping" — conservative 6-7, earliest 5 → 5-6 (US RF.K.2.b "count, pronounce, blend, and segment syllables"; England Reception "clapping syllables"; Germany Klasse 1 Silben schwingen; France GS "syllabes orales"; Spain Infantil sílabas; Brazil EF01LP06 "segmentar oralmente palavras em sílabas"; Italy classe 1 metodo fono-sillabico; Netherlands groep 2 "klankgroepen"; Sweden förskoleklass "stavelser"; Finland esiopetus tavut).
- Common misconceptions (F-126, F-101), each with this game's response:
  1. **Fast-speech elision — tapping too few because the word is said quickly ("ele-phant" → 2, "banana" → 2).** Response: on a wrong numeral the **slow model replay** runs: the word's syllable chunks appear one at a time under the picture (`ART.chunk` tiles: "ba", "na", "na"), each arriving with a drum beat token (`ART.beat`) and `tone("tap", k)` 600 ms apart — slow enough to see every chunk; the last chunk pulses. The child then taps again.
  2. **Tapping per LETTER or per phoneme instead of per syllable (c-a-t → 3).** Response: the replay shows chunks, not letters — "cat" appears as ONE chunk with ONE beat; the child sees that the whole short word is one beat.
  3. **Tapping once per word regardless of length (everything is 1).** Response: L1 mixes 1- and 2-syllable words from the first item, so "always 1" is wrong by the second item; the replay shows two chunks for a two-beat word.
  4. **Losing count of their own taps (tapped 3, answers 2) — F-101 cardinality.** Response: every tap places a visible token on the beat rail (`ART.beat`) with its numeral (`ART.beatNumeral`); the tokens stay until the numeral is tapped, so the count is written on the screen; a tap on a token removes it (undo), so an accidental extra tap is fixable without a wrong answer.
  5. **Extra taps from enthusiasm (drumming for fun).** Response: the rail holds at most 5 tokens; a 6th tap makes the drum `ANIM.nudge` and adds nothing; tokens are removable by tapping them.

## How it plays
1. **Start screen**: title "Syllable Drums", the monkey drummer (`ART.monkey`) at (360, 180) with the drum (`ART.drum`) at (360, 250), Start, picker.
2. **Item 1 (L1: banana)**: rail of 8 dots (§6). Zone A: the picture card (`ART.card`, 160 × 160) centred at (200, 160) with the picture (`ART.picBanana`, 96 px) on it — the prompt. The monkey sits at (520, 120). Zone B: the drum — a `makeTile` 140 × 140 at (200, 380) with `ART.drum` as its label (the child's counting object); to its right the beat rail: five hollow slots (`ART.beatSlot`, r 18) at y = 300, x = 330 / 386 / 442 / 498 / 554, empty; below the rail three numeral tiles (`ART.numeralTile`, 88 × 88) at y = 400, x = 330 / 442 / 554 showing the true count and two distractors (Content), shuffled, disabled until at least one beat exists. No caption.
3. **Beating**: the child taps the drum. Each tap: `ANIM.hit` on the drum (scale squash), `tone("tap", k)` for the k-th beat, and a token (`ART.beat`) with the numeral k (`ART.beatNumeral`) appears in the k-th rail slot (`ANIM.appear`). Tapping a token removes it and every token after it (undo; `ANIM.fadeOut`, `tone("tap")`). A 6th tap does nothing but `ANIM.nudge` on the drum. The numeral tiles enable as soon as one token exists.
4. **Answering**: the child taps a numeral.
   - **Correct (3)** — the numeral equals the word's syllable count, whatever the tokens say: `ANIM.pop`, `tone("correct")`, praise pop (rotation); the tokens on the rail glide (`ANIM.glide`) onto the card and settle along its bottom edge as small beat marks (`ART.beatMark`), so the picture ends wearing its beats; the monkey `ANIM.bounce`; rail dot fills; next item after 700 ms.
   - **Wrong** (2 or 4): `ANIM.nudge`, `tone("nudge")`, the numeral de-selects; the tokens on the rail fade; then the **slow model replay** (misconception 1): the chunks (`ART.chunk`, 32 px) appear under the card at y = 250, spaced 72 px, one every 600 ms, each with a token on the rail and `tone("tap", k)`; the last chunk `ANIM.lastChunk`; after 900 ms the chunks fade, the tokens stay (the count is now on the rail). Attempt 2.
   - **Second wrong**: the replay again; the correct numeral gains `ART.showRing` with `ANIM.showMe`; tapping it completes the item as solved-with-help (no praise pop).
5. **Items 2-8**: per Content/Rules. L1 words of 1 and 2 syllables; L2 words of 2 and 3; L3 words of 3 and 4 including elision-prone words (elephant, watermelon).
6. **Finish**: `t("all_done")` (360, 110); the monkey (360, 200) with the drum `ANIM.celebrate`; the summary = the eight pictures of the session in a row at y = 380 as `ART.cardMini` (64 × 76) each with its beat marks along the bottom (1-4 small `ART.beatMark`) — the words and their beats; `play_again` (250, 510), `menu` (470, 510); `tone("finish")`.

Session ≈ 4-5 minutes.

## Art registry
```js
const ART = {
  monkey:      { kind: "emoji", value: "🐵", size: 80 },
  drum:        { kind: "emoji", value: "🥁", size: 96 },
  card:        { kind: "shape", shape: "roundRect", w: 160, h: 160, fill: "surface", stroke: "structure", strokeWidth: 3, radius: 18 },
  cardMini:    { kind: "shape", shape: "roundRect", w: 64, h: 76, fill: "surface", stroke: "structure", strokeWidth: 2, radius: 10 },
  beatSlot:    { kind: "shape", shape: "circle", r: 18, stroke: "line", strokeWidth: 2 },
  beat:        { kind: "shape", shape: "circle", r: 18, fill: "structure" },
  beatNumeral: { kind: "text",  value: "", size: 20, font: "display", color: "bg" },
  beatMark:    { kind: "shape", shape: "circle", r: 6, fill: "structure" },
  chunk:       { kind: "shape", shape: "roundRect", w: 64, h: 44, fill: "structureSoft", stroke: "structure", strokeWidth: 2, radius: 10 },   // chunk text 28 px display ink
  numeralTile: { kind: "shape", shape: "roundRect", w: 88, h: 88, fill: "surface", stroke: "line", strokeWidth: 2, radius: 12 },      // numeral 44 px
  showRing:    { kind: "shape", shape: "roundRect", w: 100, h: 100, stroke: "structure", strokeWidth: 4, radius: 16 },
  dotEmpty:    { kind: "shape", shape: "circle", r: 8, stroke: "line", strokeWidth: 2 },
  dotFull:     { kind: "shape", shape: "circle", r: 8, fill: "structure" },
  // picture pool (English name and syllable count in the comment)
  picCat:        { kind: "emoji", value: "🐱", size: 96 },   // cat 1
  picDog:        { kind: "emoji", value: "🐶", size: 96 },   // dog 1
  picSun:        { kind: "emoji", value: "☀️", size: 96 },   // sun 1
  picFish:       { kind: "emoji", value: "🐟", size: 96 },   // fish 1
  picFrog:       { kind: "emoji", value: "🐸", size: 96 },   // frog 1
  picBee:        { kind: "emoji", value: "🐝", size: 96 },   // bee 1
  picStar:       { kind: "emoji", value: "⭐", size: 96 },   // star 1
  picMoon:       { kind: "emoji", value: "🌙", size: 96 },   // moon 1
  picRabbit:     { kind: "emoji", value: "🐰", size: 96 },   // rabbit 2
  picMonkey:     { kind: "emoji", value: "🐒", size: 96 },   // monkey 2
  picApple:      { kind: "emoji", value: "🍎", size: 96 },   // apple 2
  picTiger:      { kind: "emoji", value: "🐯", size: 96 },   // tiger 2
  picSpider:     { kind: "emoji", value: "🕷️", size: 96 },   // spider 2
  picPizza:      { kind: "emoji", value: "🍕", size: 96 },   // pizza 2
  picPenguin:    { kind: "emoji", value: "🐧", size: 96 },   // penguin 2
  picPanda:      { kind: "emoji", value: "🐼", size: 96 },   // panda 2
  picRocket:     { kind: "emoji", value: "🚀", size: 96 },   // rocket 2
  picCarrot:     { kind: "emoji", value: "🥕", size: 96 },   // carrot 2
  picBanana:     { kind: "emoji", value: "🍌", size: 96 },   // banana 3
  picElephant:   { kind: "emoji", value: "🐘", size: 96 },   // elephant 3
  picButterfly:  { kind: "emoji", value: "🦋", size: 96 },   // butterfly 3
  picTomato:     { kind: "emoji", value: "🍅", size: 96 },   // tomato 3
  picDinosaur:   { kind: "emoji", value: "🦕", size: 96 },   // dinosaur 3
  picUmbrella:   { kind: "emoji", value: "☂️", size: 96 },   // umbrella 3
  picKangaroo:   { kind: "emoji", value: "🦘", size: 96 },   // kangaroo 3
  picStrawberry: { kind: "emoji", value: "🍓", size: 96 },   // strawberry 3
  picOctopus:    { kind: "emoji", value: "🐙", size: 96 },   // octopus 3
  picWatermelon: { kind: "emoji", value: "🍉", size: 96 },   // watermelon 4
  picHelicopter: { kind: "emoji", value: "🚁", size: 96 },   // helicopter 4
  picTelevision: { kind: "emoji", value: "📺", size: 96 },   // television 4
  picAvocado:    { kind: "emoji", value: "🥑", size: 96 }    // avocado 4
};
```
No emoji newer than Unicode 12; no `fallback` needed. Every picture's English name is unambiguous (the crocodile/alligator and bug/caterpillar pairs are deliberately absent because their names carry different counts).

## Animation registry
```js
const ANIM = {
  hit:       { scaleY: 0.85, scaleX: 1.08, duration: 90, ease: "Sine.Out", yoyo: true, trigger: "drum on every beat" },
  appear:    { alpha: 1, scale: 1, duration: 200, ease: "Back.Out", trigger: "a beat token; a chunk; a new picture (from alpha 0, scale 0.6)" },
  fadeOut:   { alpha: 0, duration: 250, ease: "Sine.In", trigger: "removed tokens; chunks after the replay" },
  nudge:     { x: "+=10", duration: 80, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "drum on a 6th tap; wrong numeral" },
  pop:       { scale: 1.12, duration: 140, ease: "Back.Out", yoyo: true, trigger: "correct numeral" },
  lastChunk: { scale: 1.25, duration: 220, ease: "Back.Out", yoyo: true, trigger: "the last chunk of the slow replay" },
  glide:     { duration: 260, ease: "Sine.InOut", trigger: "tokens onto the card as beat marks (x,y at call), 100 ms apart" },
  bounce:    { y: "-=16", duration: 140, ease: "Sine.Out", yoyo: true, repeat: 1, trigger: "monkey on a correct answer" },
  showMe:    { alpha: 1, duration: 500, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "ring on the correct numeral (from alpha 0.2)" },
  celebrate: { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "finish monkey" }
};
```
No flashing; the replay adds one chunk per 600 ms.

## Screen layout
```
y   0 ┌──────────────────────────────────────────────────────────────┐
      │ [lang]            ○ ○ ○ ○ ○ ○ ○ ○  rail y=28                   │  zone T
 56   ├──────────────────────────────────────────────────────────────┤
      │        ┌──────────┐                                          │
      │        │ picture  │  card (200,160) 160×160    monkey (520,120)│  zone A
      │        │          │                                          │
      │        └──────────┘  chunks y=250: [ba] [na] [na] (replay)    │
260   ├──────────────────────────────────────────────────────────────┤
      │                       ( ) ( ) ( ) ( ) ( )  beat rail y=300    │
      │      [  drum  ]       x=330/386/442/498/554                   │  zone B
      │      (200,380)        [ 2 ]     [ 3 ]     [ 4 ]  numerals y=400│
      │      140×140          x=330     x=442     x=554  (88×88)      │
480   ├──────────────────────────────────────────────────────────────┤
      │                                                              │  zone C
560   └──────────────────────────────────────────────────────────────┘
```
Fixed layout, FIT scaling. Chunks are centred as a group under the card: for n chunks the first x = 200 − (n−1) × 36.

## Visual specification
- Background `THEME.colour.bg`; rail per §6: 8 × `ART.dotEmpty` (x = 283 + i × 22, y = 28) → `ART.dotFull`.
- `ART.card` centred (200, 160) with the item's picture (96 px) centred on it; `ART.monkey` at (520, 120).
- Drum: `makeTile` 140 × 140 at (200, 380) with `ART.drum` as label and `THEME.colour.surface2` fill / `THEME.colour.line` stroke; `ANIM.hit` plays on the label.
- Beat rail: 5 × `ART.beatSlot` at y = 300; a placed token = `ART.beat` on the slot with `ART.beatNumeral` centred; tokens are `makeTile` 44 × 44 (transparent fill) so they are tappable for undo — the tap floor exception is deliberate: tokens are an undo affordance, not the primary control, and are 56 px apart (a mis-tap on a neighbour still undoes, and undo is never a wrong answer).
- Chunks: `ART.chunk` at y = 250 with the chunk text 28 px `THEME.font.display` `THEME.colour.ink`.
- Numeral tiles: `makeTile` 88 × 88 (`ART.numeralTile`), numeral 44 px `THEME.font.display` `THEME.colour.ink`; disabled (alpha 0.5) until one token exists.
- `ART.beatMark` copies along the card's bottom edge at y = 232, x = 200 − (n−1) × 12 + i × 24 after a correct answer; `ART.showRing` behind the correct numeral.
- Tap floors: drum 140, numerals 88 (≥ 80); gaps ≥ 24.
- Tab order: drum, then the numeral tiles, then the tokens (undo).

## Content
Language-bound. `LOCALE_DATA[GameCore.lang].items` supplies, per item, the picture key, the syllable count, and the chunk strings shown in the slow replay. The English (`en`) list is authored in full below with the school-style chunking used in the replay. **Other locales: a native word list is required — en pilot.** Native authors must choose pictures whose name in that language has the intended count by that language's school convention (F-126 — e.g. de "Ba-na-ne" 3 but "Ap-fel" 2, es "e-le-fan-te" 4, fi "kis-sa" 2 where en "cat" is 1, fr "banane" 2 in oral counting), must write the chunks in that language's syllable-division style, and must not translate the English list. The distractor numerals are always the two nearest counts (1 → 2, 3; 2 → 1, 3; 3 → 2, 4; 4 → 3, 5).

Each item = (picture; count; chunks).
- **L1 — 1 and 2 syllables** (misconception 3): (`ART.picCat`; 1; "cat") · (`ART.picRabbit`; 2; "rab", "bit") · (`ART.picSun`; 1; "sun") · (`ART.picMonkey`; 2; "mon", "key") · (`ART.picDog`; 1; "dog") · (`ART.picApple`; 2; "ap", "ple") · (`ART.picFish`; 1; "fish") · (`ART.picTiger`; 2; "ti", "ger") · (`ART.picBee`; 1; "bee") · (`ART.picPizza`; 2; "piz", "za") · (`ART.picFrog`; 1; "frog") · (`ART.picPanda`; 2; "pan", "da")
- **L2 — 2 and 3 syllables**: (`ART.picBanana`; 3; "ba", "na", "na") · (`ART.picSpider`; 2; "spi", "der") · (`ART.picTomato`; 3; "to", "ma", "to") · (`ART.picPenguin`; 2; "pen", "guin") · (`ART.picButterfly`; 3; "but", "ter", "fly") · (`ART.picRocket`; 2; "rock", "et") · (`ART.picKangaroo`; 3; "kan", "ga", "roo") · (`ART.picCarrot`; 2; "car", "rot") · (`ART.picStrawberry`; 3; "straw", "ber", "ry") · (`ART.picStar`; 1; "star") · (`ART.picOctopus`; 3; "oc", "to", "pus") · (`ART.picMoon`; 1; "moon")
- **L3 — 3 and 4 syllables, elision-prone words** (misconception 1): (`ART.picElephant`; 3; "el", "e", "phant") · (`ART.picWatermelon`; 4; "wa", "ter", "mel", "on") · (`ART.picDinosaur`; 3; "di", "no", "saur") · (`ART.picHelicopter`; 4; "hel", "i", "cop", "ter") · (`ART.picUmbrella`; 3; "um", "brel", "la") · (`ART.picTelevision`; 4; "tel", "e", "vi", "sion") · (`ART.picAvocado`; 4; "av", "o", "ca", "do") · (`ART.picBanana`; 3; "ba", "na", "na") · (`ART.picStrawberry`; 3; "straw", "ber", "ry")

Play list: 8 items; start at L1; levels per Rules; no picture repeats within a session; the numeral slot of the correct answer never repeats twice running (§13). Chunk text uses `THEME.font.display`.

## Rules
- Item count: 8.
- Difficulty progression: 2 consecutive first-try correct (first numeral tapped is correct) → next level (cap L3).
- Adaptation: a wrong numeral, or wrong first-try on 2 consecutive items → next item one level down (floor L1). Undo taps on tokens are never errors.
- What happens on a correct answer: `ANIM.pop`, `tone("correct")`, praise rotation ["well_done", "great_job", "excellent", "you_did_it", "keep_going"], the tokens glide onto the card as beat marks, monkey `ANIM.bounce`, rail dot fills, next item after 700 ms. The numeral is judged against the word's count, not against the child's tokens — a child who drummed 4 but answers 3 for "banana" is right, and the replay is not shown.
- What happens on a wrong answer (per anticipated mistake):
  - Too few (elision — "elephant" → 2): `ANIM.nudge`, `tone("nudge")`; slow replay: chunks one every 600 ms with tokens and rising tones; the last chunk `ANIM.lastChunk`.
  - Too many (letters or phonemes counted — "cat" → 3, or "rabbit" → 4): nudge + tone; the same slow replay shows the true number of chunks; tokens beyond the count are absent afterwards.
  - Miscounted own taps (tokens 3, tapped 2): nudge + tone; the replay; the tokens on the rail are the count to read.
  - 6th drum tap: the drum nudges, nothing is added (not an attempt).
  - Numeral tapped before any beat: cannot happen (tiles disabled until one token exists).
- Retry behaviour: attempt 1 → attempt 2 after the replay → attempt 3 with the show-me ring; solved-with-help. No attempt 4.
- Finish condition: 8 items. No losing state, no clock.

## Strings
- `GameCore.t()` keys: `t("start")`, `t("all_done")`, `t("play_again")`, `t("menu")`, `t("well_done")`, `t("great_job")`, `t("excellent")`, `t("you_did_it")`, `t("keep_going")`.
- Game-specific: `title` = "Syllable Drums". The chunk strings are locale content from `LOCALE_DATA`, not UI copy; no other text on the play screen.

## Sound
`tone("tap", k)` on the k-th drum beat (pitch rises with each beat — one note per syllable, F-213 / F-70); `tone("tap")` on an undo; `tone("correct")` on the right numeral; `tone("nudge")` on a wrong numeral or a 6th beat; `tone("tap", k)` again per chunk in the slow replay; `tone("finish")` once. Silent under `?sound=off`. The word is never spoken; the picture carries it and the chunks show it.

## Testing checklist
- [ ] Works in all 11 languages (chrome strings change; `?lang=xx` reads `LOCALE_DATA.xx` and falls back to `en` without crashing while native lists are pending — reviewer notes "en pilot").
- [ ] Works at narrow width (400-px iframe: card, drum, five rail slots and three numerals visible and separate).
- [ ] Keyboard operable (Tab: drum, numerals, tokens; Enter beats / answers / undoes).
- [ ] Never auto-starts.
- [ ] No losing state (wrong numerals never end the session; the ring always completes the item).
- [ ] Each drum tap adds one numbered token on the rail with a higher note than the last; the sixth tap adds nothing and wiggles the drum.
- [ ] Tapping a token removes it and the tokens after it.
- [ ] The numeral tiles are dimmed until the first beat.
- [ ] For the banana, tapping "2" shows "ba", "na", "na" appearing one by one under the picture with a beat each, the last one growing.
- [ ] For the cat, tapping "3" shows a single chunk "cat" and one beat.
- [ ] Tapping "3" for the banana after drumming four times is accepted as correct.
- [ ] Two first-try corrects in a row bring longer words; a wrong numeral brings shorter ones.
- [ ] After a correct answer the tokens settle along the bottom of the picture card; the finish screen shows eight small cards with their beat marks and no score.
- [ ] With `?sound=off` nothing is audible.
