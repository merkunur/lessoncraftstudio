# 194 — Word Tap

## Identity
- Slug: `word-tap`
- Subject / topic: Literacy / concept of word in print — tapping each word of a short picture caption once and stating how many words it has
- Age band: `5-6`
- Interaction pattern: `P3` — tap to count (tap each word once; a P1 numeral choice states the count)
- Estimated build size: ~420 lines

Shared contract: `catalogue/BUILD-CONVENTIONS.md`. Pattern contract: `catalogue/PATTERNS.md` P3 (each tap marks one object and plays one rising tone; a second tap on a counted object does nothing; the answer is a numeral tile). Locale note: **nothing is spoken and the child does not read** — the caption is a string of printed word-shapes under a picture that names the caption's subject; the task is to see WHERE ONE WORD ENDS AND THE NEXT BEGINS (the space) and count the words. Captions are language-bound (F-128; A-15) and are stored in `LOCALE_DATA`; English is authored in full, the other ten locales are declared as needing a native caption set (en pilot).

## Learning
- Objective: Taps each printed word of a 3-4-word caption once, using the spaces as the boundaries, and then taps the numeral that says how many words the caption has.
- Prerequisites: Counts to 5 by tapping (game 001); knows that print carries a message (the picture and the caption belong together). No reading; no letter names.
- Curriculum links: F-22 (sentence conventions — "spaces between words" — by 8 in all twelve systems; concept of word is the pre-reading step every reading-method family starts from, F-24), F-31 row "Letter names + sounds; initial sound" as the age anchor for print awareness — conservative 6-7, earliest 4 → 5-6 (US RF.K.1.c "understand that words are separated by spaces in print"; England Reception "words are separated by spaces"; Germany Klasse 1 "Wörter im Satz erkennen"; France GS "notion de mot"; Spain Infantil "conciencia léxica"; Brazil EF01LP02 "segmentação de palavras"; Netherlands groep 2 "woordbesef"; Sweden förskoleklass; Denmark 0. klasse; Norway 1. trinn; Finland esiopetus "sanatietoisuus"). Demand: F-7 (sentence boundaries / concept of word is a universal literacy skill).
- Common misconceptions (F-128, F-126, F-101), each with this game's response:
  1. **Counts letters or syllables instead of words (taps a long word twice — "elephant" as two).** Response: structural — each word is ONE tile; a second tap on a counted word does nothing (one-to-one enforced by the object, F-101). If the numeral tapped is higher than the word count, the caption replays its words in order with their numerals (`ANIM.replay`) and the last numeral pulses; at L3 a long word and a one-letter word sit in the same caption so length is visibly not the count.
  2. **Treats two short words as one ("a cat" as one word) — misses a boundary.** Response: the spaces are drawn: under each gap between words a small space marker (`ART.spaceMark`, a coral dash) is drawn permanently at L1, appears only on a wrong answer at L2, and never at L3; a numeral lower than the word count makes the untapped words `ANIM.pulse` and each shows its numeral badge — "this is a word too".
  3. **Stops tapping early and answers from the number found (F-101 exhaustiveness).** Response: the count tiles stay enabled; if the numeral tapped equals the number tapped so far but words remain, the untapped words pulse with their badge for 1200 ms and the item continues (attempt 2).
  4. **Miscounts the tapped words (taps 4 after tapping 3).** Response: every tapped word wears its running numeral (`ART.countBadge` 1, 2, 3 …), so the count is written on the caption; a wrong numeral replays the badges in order (P3 feedback) and pulses the last one.
  5. **Taps the picture or a space instead of a word.** Response: the picture is not a tile (nothing happens); spaces are not tiles either; only words respond. Nothing is refused with a message (F-61).

## How it plays
1. **Start screen**: title "Word Tap", the chipmunk (`ART.chipmunk`) at (360, 200), Start, picker.
2. **Item 1 (L1: caption "The cat sleeps." under a cat picture)**: rail of 8 dots (§6). Zone A: the picture card (`ART.pictureCard`, 200 × 150) at (360, 130) showing the caption's subject at 88 px (`ART.picCat`); the chipmunk at (100, 130). Below the picture the caption strip (`ART.captionStrip`, 640 × 80) at (360, 232): the caption's words as separate tiles (`ART.wordTile`, height 80, width = word width + 32 px, min 80) laid in a centred row with 24 px gaps, each showing its word at 34 px; under each gap `ART.spaceMark` (L1 only). Zone B: three numeral tiles (`ART.numeralTile`, 96 × 96) at y = 390, x = 240 / 360 / 480, showing the true count and two distractors (Content), shuffled, ENABLED from the start. No caption text beyond the content caption itself — the picture plus the row of word tiles is the prompt.
3. **Tapping words**: the child taps a word tile.
   - **Untapped word**: `ANIM.pop`, `tone("tap", k)` with k = 1 for the first word tapped, 2 for the second …; the tile lifts and takes the tapped look (`ART.wordTapped` tokens via `api.setSelected(true)`) and a `ART.countBadge` with the numeral k appears at its top-right. Words may be tapped in any order (the count is the objective, not the reading order).
   - **Already-tapped word**: nothing (no sound, no motion).
4. **Answering**: the child taps a numeral.
   - **Correct (3, all three words tapped)**: `ANIM.pop`, `tone("correct")`, praise pop (rotation); the three words slide together (`ANIM.gather`) into one line under the picture with their badges, and the picture card `ANIM.bob`; the chipmunk `ANIM.hop`; rail dot fills; next item after 700 ms (`ANIM.appear`).
   - **Numeral equals the number tapped so far, but words remain** (misconception 3): `ANIM.nudge` + `tone("nudge")` on the numeral; the untapped words `ANIM.pulse` and show their next numerals as badges for 1200 ms (then the badges clear again — the child taps them); at L2 the `ART.spaceMark`s appear under the gaps for the same 1200 ms. Attempt 2.
   - **Numeral wrong with all words tapped** (miscount, or a letter/syllable count): nudge + tone; the badges replay in order 300 ms apart with `tone("tap", k)` (`ANIM.replay`), the last badge `ANIM.lastBadge`. Attempt 2.
   - **Second wrong (any kind)**: the cue again, then show-me: every untapped word gains `ART.showRing` with `ANIM.showMe`; once all words are tapped the correct numeral tile gains the ring; tapping it completes the item as solved-with-help (no praise pop).
5. **Items 2-8**: per Content/Rules. L1 three words, space markers always shown; L2 four words, markers only on error; L3 four words including one long word and one one-letter word, no markers.
6. **Finish**: `t("all_done")` (360, 110); the chipmunk (360, 200) `ANIM.celebrate`; the summary = the eight captions as chips (`ART.captionChip`, 300 × 28, caption 16 px with its word count in a small `ART.countBadge` at the right) in two columns of four from y = 320 (x = 200 / 520, 34 px pitch) — the captions counted this session; `play_again` (250, 510), `menu` (470, 510); `tone("finish")`.

Session ≈ 4-5 minutes (8 captions × ~30 s).

## Art registry
```js
const ART = {
  chipmunk:     { kind: "emoji", value: "🐿️", size: 80 },
  pictureCard:  { kind: "shape", shape: "roundRect", w: 200, h: 150, fill: "surface", stroke: "structure", strokeWidth: 3, radius: 18 },
  captionStrip: { kind: "shape", shape: "roundRect", w: 640, h: 80, fill: "surface2", stroke: "line", strokeWidth: 2, radius: 14 },
  wordTile:     { kind: "shape", shape: "roundRect", w: 120, h: 80, fill: "surface", stroke: "line", strokeWidth: 2, radius: 12 },   // w = word width + 32 at runtime (min 80); word 34 px display ink
  wordTapped:   { kind: "shape", shape: "roundRect", w: 120, h: 80, fill: "structureSoft", stroke: "structure", strokeWidth: 3, radius: 12 },
  spaceMark:    { kind: "shape", shape: "rect", w: 14, h: 5, fill: "accent" },                // under each gap between word tiles
  countBadge:   { kind: "shape", shape: "circle", r: 15, fill: "structure" },                 // numeral 18 px display, color bg
  numeralTile:  { kind: "shape", shape: "roundRect", w: 96, h: 96, fill: "surface", stroke: "line", strokeWidth: 2, radius: 12 },   // numeral 44 px
  captionChip:  { kind: "shape", shape: "roundRect", w: 300, h: 28, fill: "structureSoft", stroke: "structure", strokeWidth: 1, radius: 8 },
  showRing:     { kind: "shape", shape: "roundRect", w: 108, h: 108, stroke: "structure", strokeWidth: 4, radius: 16 },   // resized to the tile it rings (w = tile w + 12)
  dotEmpty:     { kind: "shape", shape: "circle", r: 8, stroke: "line", strokeWidth: 2 },
  dotFull:      { kind: "shape", shape: "circle", r: 8, fill: "structure" },
  // caption subjects (the picture names the first noun of the caption; English gloss in the comment)
  picCat:       { kind: "emoji", value: "🐱", size: 88 },   // cat
  picDog:       { kind: "emoji", value: "🐶", size: 88 },   // dog
  picSun:       { kind: "emoji", value: "☀️", size: 88 },   // sun
  picFish:      { kind: "emoji", value: "🐟", size: 88 },   // fish
  picBee:       { kind: "emoji", value: "🐝", size: 88 },   // bee
  picFrog:      { kind: "emoji", value: "🐸", size: 88 },   // frog
  picDuck:      { kind: "emoji", value: "🦆", size: 88 },   // duck
  picBird:      { kind: "emoji", value: "🐦", size: 88 },   // bird
  picCow:       { kind: "emoji", value: "🐮", size: 88 },   // cow
  picPig:       { kind: "emoji", value: "🐷", size: 88 },   // pig
  picElephant:  { kind: "emoji", value: "🐘", size: 88 },   // elephant
  picButterfly: { kind: "emoji", value: "🦋", size: 88 },   // butterfly
  picRabbit:    { kind: "emoji", value: "🐰", size: 88 },   // rabbit
  picMonkey:    { kind: "emoji", value: "🐒", size: 88 },   // monkey
  picOwl:       { kind: "emoji", value: "🦉", size: 88 },   // owl
  picSnail:     { kind: "emoji", value: "🐌", size: 88 },   // snail
  picHorse:     { kind: "emoji", value: "🐴", size: 88 },   // horse
  picPenguin:   { kind: "emoji", value: "🐧", size: 88 }    // penguin
};
```
All emoji are Unicode 9 or older (the chipmunk is Unicode 7); no fallbacks needed. The chipmunk is the mascot only; it is never a caption subject.

## Animation registry
```js
const ANIM = {
  pop:       { scale: 1.12, duration: 140, ease: "Back.Out", yoyo: true, trigger: "word tapped; correct numeral" },
  nudge:     { x: "+=10", duration: 80, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "wrong numeral" },
  pulse:     { scale: 1.12, duration: 300, ease: "Sine.InOut", yoyo: true, repeat: 2, trigger: "untapped words after an early numeral" },
  replay:    { scale: 1.25, duration: 200, ease: "Sine.InOut", yoyo: true, trigger: "each count badge in order, 300 ms apart, after a miscount" },
  lastBadge: { scale: 1.4, duration: 220, ease: "Back.Out", yoyo: true, trigger: "last count badge in a replay" },
  gather:    { duration: 300, ease: "Sine.InOut", trigger: "word tiles close their gaps to 8 px under the picture on a correct answer (x at call)" },
  bob:       { y: "-=10", duration: 200, ease: "Sine.InOut", yoyo: true, trigger: "picture card on a correct answer" },
  hop:       { y: "-=16", duration: 150, ease: "Sine.Out", yoyo: true, trigger: "chipmunk on a correct answer" },
  markIn:    { alpha: 1, duration: 200, ease: "Sine.Out", yoyo: true, hold: 1200, trigger: "spaceMarks at L2 during a cue (from alpha 0)" },
  appear:    { alpha: 1, scale: 1, duration: 200, ease: "Back.Out", trigger: "new picture, caption and tiles (from alpha 0, scale 0.6)" },
  showMe:    { alpha: 1, duration: 500, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "ring on untapped words, then on the correct numeral (from alpha 0.2)" },
  celebrate: { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "finish chipmunk" }
};
```

## Screen layout
```
y   0 ┌──────────────────────────────────────────────────────────────┐
      │ [lang]            ○ ○ ○ ○ ○ ○ ○ ○  rail y=28                   │  zone T
 56   ├──────────────────────────────────────────────────────────────┤
      │  chipmunk           ┌────────────┐                            │
      │  (100,130)          │    cat     │  picture card (360,130)    │  zone A
      │                     └────────────┘  200×150                   │
      │     ┌──────────────────────────────────────────────────┐      │
      │     │   [ The ]   [ cat ]   [ sleeps. ]   words y=232   │      │
      │     └─────────▔─────────▔───────────────────────────────┘      │  (▔ = spaceMark)
260   ├──────────────────────────────────────────────────────────────┤
      │            [ 2 ]      [ 3 ]      [ 4 ]   numerals y=390       │  zone B
      │           x=240      x=360      x=480    (96×96)              │
480   ├──────────────────────────────────────────────────────────────┤
      │                                                              │  zone C
560   └──────────────────────────────────────────────────────────────┘
```
Fixed layout, FIT scaling. The caption strip overlaps the boundary of zones A/B by design (the strip is the counting stage).

## Visual specification
- Background `THEME.colour.bg`; rail per §6: 8 × `ART.dotEmpty` (x = 283 + i × 22, y = 28) → `ART.dotFull`.
- `ART.pictureCard` centred (360, 130) with the item's subject picture at 88 px; `ART.chipmunk` at (100, 130).
- `ART.captionStrip` centred (360, 232); word tiles are `makeTile`s with `ART.wordTile` tokens, height 80, width = measured word width at 34 px + 32 (min 80, max 200), laid out centred with 24 px gaps (total width ≤ 620: a four-word caption of 4 × ~120 + 3 × 24 = 552 fits; the 1.6× locale budget is met by the `makeTile` fit-to-width shrink inside a 200-px cap); word at 34 px `THEME.font.display` `THEME.colour.ink`; tapped look = `ART.wordTapped` tokens; `ART.countBadge` at the tile's top-right (+w/2 − 10, −28) with the numeral at 18 px `THEME.font.display` `THEME.colour.bg`; `ART.spaceMark` centred under each gap at y = 262.
- Numeral tiles: `makeTile` 96 × 96 (`ART.numeralTile`), numeral 44 px `THEME.font.display` `THEME.colour.ink`.
- `ART.showRing` behind a tile (resized to it). Tap floors: word tiles ≥ 80 × 80, numerals 96 (≥ 80); gaps 24.
- Tab order: the word tiles left to right, then the three numeral tiles.

## Content
Captions are language-bound. `LOCALE_DATA[GameCore.lang].items` supplies, per level, `{ words: ["The", "cat", "sleeps."], pic: <ART key> }`. The English (`en`) set is authored in full below. **Other locales: a native caption set is required — en pilot** (`LOCALE_DATA[lang] = "en"` until then). Native authors keep 3 words at L1 and 4 at L2/L3, include one long word (≥ 7 letters) and one one- or two-letter word in every L3 caption, and never hyphenate; the picture names the caption's subject noun.

The count-tile set is the true count plus the two nearest numerals (3 → 2, 4; 4 → 3, 5), shuffled.

- **L1 — three words** (space markers always shown): The cat sleeps. (`ART.picCat`) · The dog runs. (`ART.picDog`) · The sun shines. (`ART.picSun`) · Fish can swim. (`ART.picFish`) · The bee hums. (`ART.picBee`) · The frog jumps. (`ART.picFrog`) · Ducks like water. (`ART.picDuck`) · The bird sings. (`ART.picBird`)
- **L2 — four words** (space markers only on a wrong answer): The cow eats grass. (`ART.picCow`) · The pig is muddy. (`ART.picPig`) · The dog is wet. (`ART.picDog`) · The owl is awake. (`ART.picOwl`) · The horse runs fast. (`ART.picHorse`) · The snail is slow. (`ART.picSnail`) · The rabbit hops away. (`ART.picRabbit`) · The monkey eats bananas. (`ART.picMonkey`)
- **L3 — four words with one long word (≥ 7 letters) and one one- or two-letter word** (no markers): A butterfly is beautiful. (`ART.picButterfly`) · An elephant is enormous. (`ART.picElephant`) · A penguin is waddling. (`ART.picPenguin`) · A caterpillar is crawling. (`ART.picButterfly` — the butterfly's young; a native author may swap the subject) · An elephant is splashing. (`ART.picElephant`) · A snail is crawling. (`ART.picSnail`) · A monkey is swinging. (`ART.picMonkey`) · A butterfly is fluttering. (`ART.picButterfly`)

Play list: 8 items; start at L1; levels change per Rules; no caption repeats within a session; word tiles keep reading order (never shuffled — the caption must read as a caption); the correct numeral slot never repeats twice running (§13).

## Rules
- Item count: 8.
- Difficulty progression: 2 consecutive first-try items (every word tapped once AND the first numeral correct) → next level (cap L3).
- Adaptation: any wrong numeral on an item, or wrong first-try on 2 consecutive items → next item one level down (floor L1). The current item is never abandoned.
- What happens on a correct answer: `ANIM.pop`, `tone("correct")`, praise rotation ["well_done", "great_job", "excellent", "you_did_it", "keep_going"], the words `ANIM.gather` under the picture, picture `ANIM.bob`, chipmunk `ANIM.hop`, rail dot fills, next caption after 700 ms.
- What happens on a wrong answer (per anticipated mistake):
  - Numeral tapped while words remain (stopped early, or two words taken as one): nudge + tone on the numeral; the untapped words `ANIM.pulse` with their next badges for 1200 ms; at L2 the `ART.spaceMark`s appear for the same time.
  - Numeral too high with all words tapped (letters or syllables counted): nudge + tone; the badges `ANIM.replay` in order with rising tones and the last badge `ANIM.lastBadge`.
  - Numeral too low with all words tapped (miscount): the same replay.
  - Second tap on a tapped word: nothing (one-to-one enforced by the object).
  - Tap on the picture or a gap: nothing.
- Retry behaviour: attempt 1 → attempt 2 after the cue → attempt 3 = show-me (rings on untapped words, then on the correct numeral); completing with the ring is solved-with-help. No attempt 4. An item with any wrong numeral never counts as first-try.
- Finish condition: 8 items. No losing state, no clock.

## Strings
- `GameCore.t()` keys: `t("start")`, `t("all_done")`, `t("play_again")`, `t("menu")`, `t("well_done")`, `t("great_job")`, `t("excellent")`, `t("you_did_it")`, `t("keep_going")`.
- Game-specific: `title` = "Word Tap". No instruction words on the play screen; the caption is content (locale data), not UI copy.

## Sound
`tone("tap", k)` on the k-th word tapped (pitch rises with the count — F-213); `tone("nudge")` on a wrong numeral; `tone("correct")` on the right numeral; `tone("finish")` once. Silent under `?sound=off`. The caption is NOT read aloud — there are no audio files; the picture carries the meaning and the spaces carry the boundaries.

## Testing checklist
- [ ] Works in all 11 languages (chrome strings change with the picker; with `?lang=de` the game reads `LOCALE_DATA.de` — until a native list exists it must fall back to `en` without crashing and the reviewer notes it as "en pilot").
- [ ] Works at narrow width (400-px iframe: picture, all four word tiles and three numerals visible and separate; a long word shrinks to fit its tile rather than overflowing).
- [ ] Keyboard operable (Tab walks the word tiles then the numerals; Enter taps a word / picks a numeral).
- [ ] Never auto-starts.
- [ ] No losing state (any number of wrong taps still ends with rings guiding the item to completion).
- [ ] For "The cat sleeps." tapping the three words marks each with 1, 2, 3 and a rising note; tapping a marked word again does nothing.
- [ ] At the first level a coral dash sits under each space between words; at the third level there is none.
- [ ] Tapping "2" after tapping two of three words makes the third word pulse with a "3" badge; the item continues.
- [ ] Tapping "4" for a three-word caption replays the badges 1, 2, 3 and grows the last one.
- [ ] At the third level "An elephant is enormous." counts as 4 and the long word is one tile.
- [ ] Two clean items in a row move from three-word to four-word captions; a wrong numeral moves back.
- [ ] After a correct answer the words close up under the picture; the finish screen shows eight caption chips with their counts and no score.
- [ ] With `?sound=off` nothing is audible.
