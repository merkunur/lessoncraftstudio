# 158 — Find the Spaces

## Identity
- Slug: `find-the-spaces`
- Subject / topic: Literacy / word boundaries — finding where the spaces go in a short phrase whose words have been run together ("thecatsat" → "the cat sat")
- Age band: `6-8`
- Interaction pattern: `P3` — tap to count (tap each seam between two letters where a space belongs, once; a Done tile states that every space is placed)
- Estimated build size: ~460 lines

Shared contract: `catalogue/BUILD-CONVENTIONS.md`. Pattern contract: `catalogue/PATTERNS.md` P3 (each tap opens one space and plays one rising tone; tapping an open space closes it; the Done tile judges completeness). Locale note: **word boundaries are language-general; the phrases are language-bound** (F-128, F-22; A-15) and live in `LOCALE_DATA`. English is authored in full; the other ten locales are declared as needing a native set (en pilot). Every phrase is ≤ 9 letters so the letter row fits the stage at a 68 px pitch; German and Finnish authors keep to two- or three-word phrases of short words. Nothing is spoken; a picture beside the row supports the meaning, never the split.

## Learning
- Objective: In a phrase of 2-4 words written with no spaces, taps the seams between letters where each word ends so that a space opens there, and taps nowhere inside a word.
- Prerequisites: Reads short words of 2-4 letters (games 071-074). Knows that written words are separated by spaces (game 075 builds sentences from word cards; this game finds the boundaries inside a run of letters).
- Curriculum links: F-22 (sentence conventions including word spaces by 8 in all twelve systems), F-128 ("cannot find sentence boundaries … reassemble cut-up sentences with the boundary as a gap" — the word-level analogue), F-124 (splitting a digraph is the segmenting error this game surfaces at its top level), F-31 row "Capital + full stop; sentence order" — the "spaces between words" strand of England Y1 ("leaving spaces between words") and its equivalents; conservative 7-8, earliest 5 → 6-8 (US L.K.1 / L.1.1 print conventions; Germany Klasse 1 "Wortgrenzen"; France CP "segmenter la phrase en mots"; Netherlands groep 3 "woorden los schrijven"; Spain 1º ciclo "separación de palabras"; Brazil EF01LP05 "segmentar palavras"; Sweden åk 1 "mellanrum mellan ord"; Finland 1. luokka "sanaväli").
- Common misconceptions (F-128, F-124, F-126), each with this game's response:
  1. **Splits inside a word — after a syllable or an onset ("the cat s at", "th ecat").** Response: the space opens for 700 ms (the letters to the right slide 16 px) and the whole word that the seam sits inside gets `ART.wordBar` (a coral bar under all its letters, `ANIM.markIn`) — "these letters belong together" — then the letters slide back (`ANIM.snapBack`) and the seam is empty. No verdict.
  2. **Splits a digraph or a consonant blend ("s hip", "fis h") — F-124.** Response: L3 phrases contain a digraph (sh, th, ch); a seam inside it first shows `ART.digraphBar` (a teal bar under exactly those two letters) for 600 ms, then the word bar — the two letters are one sound and the word is one word.
  3. **Runs two short words together ("thecat" left as one word, or "a" attached to the next word).** Response: Done with seams missing nudges the Done tile; the unsplit run's letters light left to right (`ANIM.readBack`) and the picture pulses (`ANIM.pulse`) — "read it against the picture"; on the second Done the run's words get their word bars one after another and each missing seam gains `ART.hintRing` (show-me).
  4. **Opens a space after every letter or every two letters (no concept of the word as a unit).** Response: each in-word seam gets the word-bar refusal and snaps back; nothing sticks that is not a true boundary, so the row can never end up shredded.
  5. **Loses count of what has been done.** Response: every open space carries a `ART.spaceMark` (a small teal wedge in the gap) with its running numeral (`ART.countBadge`) — the spaces found are written on the row (P3).

## How it plays
1. **Start screen**: title "Find the Spaces", the lizard (`ART.lizard`) at (360, 200), Start, picker.
2. **Item 1 (L1: "thecat")**: rail of 10 dots (§6) at y = 28; `t("question_x_of_y")` at (360, 48). Zone A: the letter row — six letters (`ART.letter`, 40 px `THEME.font.display` `THEME.colour.ink`) at y = 160, pitch 68, centred as a group (x = 190, 258, 326, 394, 462, 530); between every two consecutive letters a seam tile (`ART.seamTile`, 56 × 80, invisible against the page) centred on the midpoint with a faint `ART.seamDot` at its bottom; the lizard sits at (70, 160) at 60 px. Zone B: the phrase's picture (`ART.picCat`, 56 px) at (360, 330) and the Done tile (`makeButton ok`) at (360, 430), enabled from the start. Caption `S("findSpaces")` ("Tap where the spaces go") at (360, 96), 22 px `THEME.font.body` `THEME.colour.inkSoft`.
3. **Opening spaces**: the child taps a seam.
   - **A true boundary** (between "e" and "c"): the row re-lays out with a 16 px space at that seam (letters and seams to the right `ANIM.glide` 16 px right, the group re-centred), `ART.spaceMark` appears in the gap with `ART.countBadge` k above it, `tone("tap", k)` (k = spaces open, pitch rising). Tapping the open space (the same seam tile) closes it again (undo, free: the letters glide back, the mark fades).
   - **A seam inside a word** (between "c" and "a"): the space opens for 700 ms while `ART.wordBar` shows under "cat", `tone("nudge")`, then `ANIM.snapBack` closes it; the seam stays enabled. Counts as a wrong tap.
   - **A seam inside a digraph** (L3, between "s" and "h" of "she"): `ART.digraphBar` under "sh" for 600 ms, then the word bar, `tone("nudge")`, snap back. Counts as a wrong tap.
   - Keyboard: Tab walks the seams left to right; Enter opens / closes.
4. **Done**: the child taps `ok`.
   - **All boundaries open** (the only complete state — in-word taps never stay): the words settle into word cards one by one (`ART.wordCard` fades in behind each word, `ANIM.settle`, 200 ms apart), `tone("correct")`, praise pop (only if no wrong tap), the lizard `ANIM.flick`; rail dot; next item after 900 ms (`ANIM.appear`).
   - **Boundaries remain**: `ANIM.nudge` on Done, `tone("nudge")`; the letters of the unsplit run `ANIM.readBack` left to right and the picture `ANIM.pulse`s; the hunt continues. Attempt 2.
   - **Second Done with boundaries remaining**: the run's words get `ART.wordBar`s one after another (300 ms apart) and each missing seam gains `ART.hintRing` (`ANIM.showMe`) — the show-me; opening them and tapping Done completes the item as solved-with-help.
5. **Items 2-10**: per Content/Rules. L1 two words (4-7 letters); L2 three words (7-9 letters); L3 three or four words (8-9 letters) with a digraph or a one-letter word.
6. **Re-queue** (F-41): an item with any wrong tap or an early Done re-enters after 2 intervening items; the count stays 10.
7. **Finish**: `t("all_done")` (360, 110); the lizard (360, 200) `ANIM.celebrate`; the summary = the ten phrases as chips (`ART.phraseChip`, 300 × 30, 18 px, the words spaced, each space drawn as a small `ART.spaceMark`) in two columns of five from y = 300 at 34 px pitch (x = 200 and x = 520), with `ART.dotFull` at the chip's left for first-try items and `ART.dotEmpty` for helped ones; `play_again` (250, 510), `menu` (470, 510); `tone("finish")`.

Session ≈ 5-6 minutes.

## Art registry
```js
const ART = {
  lizard:     { kind: "emoji", value: "🦎", size: 80 },                     // mascot (Unicode 9)
  letter:     { kind: "text",  value: "", size: 40, font: "display", color: "ink" },                  // one letter of the row
  seamTile:   { kind: "shape", shape: "roundRect", w: 56, h: 80, fill: "bg", radius: 8 },              // the tap target between two letters (bg on bg — invisible)
  seamDot:    { kind: "shape", shape: "circle", r: 4, fill: "line" },                                  // at a seam's bottom centre so the seam can be found
  spaceMark:  { kind: "shape", shape: "polygon", points: [[-7,8],[7,8],[0,-4]], fill: "structure" },   // a small wedge in an open space, at the baseline
  countBadge: { kind: "shape", shape: "circle", r: 12, fill: "structure" },                            // numeral 14 px display, color bg, above the wedge
  wordBar:    { kind: "shape", shape: "rect", w: 120, h: 6, fill: "accent" },                          // under all letters of one word; width at runtime
  digraphBar: { kind: "shape", shape: "rect", w: 68, h: 6, fill: "structure" },                        // under the two letters of a digraph
  wordCard:   { kind: "shape", shape: "roundRect", w: 120, h: 64, fill: "structureSoft", stroke: "structure", strokeWidth: 2, radius: 10 },   // behind a completed word; width at runtime
  hintRing:   { kind: "shape", shape: "roundRect", w: 68, h: 92, stroke: "structure", strokeWidth: 4, radius: 12 },
  phraseChip: { kind: "shape", shape: "roundRect", w: 300, h: 30, fill: "structureSoft", stroke: "structure", strokeWidth: 1, radius: 8 },
  dotEmpty:   { kind: "shape", shape: "circle", r: 8, stroke: "line", strokeWidth: 2 },
  dotFull:    { kind: "shape", shape: "circle", r: 8, fill: "structure" },
  // phrase pictures (meaning support; English gloss in the comment)
  picCat:     { kind: "emoji", value: "🐱", size: 56 },   // cat
  picBus:     { kind: "emoji", value: "🚌", size: 56 },   // bus
  picSun:     { kind: "emoji", value: "☀️", size: 56 },   // sun
  picDog:     { kind: "emoji", value: "🐶", size: 56 },   // dog
  picHat:     { kind: "emoji", value: "🎩", size: 56 },   // hat
  picPig:     { kind: "emoji", value: "🐷", size: 56 },   // pig
  picChair:   { kind: "emoji", value: "🪑", size: 56 },   // chair (sit) — Unicode 12
  picMilk:    { kind: "emoji", value: "🥛", size: 56 },   // milk
  picHouse:   { kind: "emoji", value: "🏠", size: 56 },   // home
  picFox:     { kind: "emoji", value: "🦊", size: 56 },   // fox
  picFish:    { kind: "emoji", value: "🐟", size: 56 },   // fish
  picHen:     { kind: "emoji", value: "🐔", size: 56 },   // hen
  picEyes:    { kind: "emoji", value: "👀", size: 56 },   // see (eyes)
  picBath:    { kind: "emoji", value: "🛁", size: 56 },   // bath
  picBed:     { kind: "emoji", value: "🛏️", size: 56 }    // bed
};
```
No emoji newer than Unicode 12 is used, so no `fallback` is required.

## Animation registry
```js
const ANIM = {
  glide:     { duration: 220, ease: "Sine.InOut", trigger: "letters and seams re-laying out when a space opens or closes (x at call)" },
  snapBack:  { duration: 220, ease: "Back.In", trigger: "letters returning after a refused seam (x at call)" },
  markIn:    { alpha: 1, duration: 150, ease: "Sine.Out", yoyo: true, hold: 700, trigger: "wordBar under a word (from alpha 0); digraphBar holds 600 ms" },
  nudge:     { x: "+=10", duration: 80, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "the Done button when boundaries remain" },
  readBack:  { alpha: 0.4, duration: 100, ease: "Sine.InOut", yoyo: true, trigger: "each letter of the unsplit run in turn, 120 ms apart" },
  pulse:     { scale: 1.15, duration: 300, ease: "Sine.InOut", yoyo: true, repeat: 2, trigger: "the picture after an early Done" },
  settle:    { alpha: 1, scale: 1, duration: 200, ease: "Back.Out", trigger: "wordCard behind each completed word, 200 ms apart (from alpha 0, scale 0.8)" },
  fadeOut:   { alpha: 0, duration: 200, ease: "Sine.In", trigger: "spaceMark and its badge when a space is closed" },
  flick:     { angle: -12, duration: 140, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "lizard on completion" },
  appear:    { alpha: 1, scale: 1, duration: 200, ease: "Back.Out", trigger: "new row, picture (from alpha 0, scale 0.6)" },
  showMe:    { alpha: 1, duration: 500, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "hintRing on each missing seam after the second Done (from alpha 0.2)" },
  celebrate: { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "finish lizard" }
};
```

## Screen layout
```
y   0 ┌──────────────────────────────────────────────────────────────┐
      │ [lang]        ○ ○ ○ ○ ○ ○ ○ ○ ○ ○  rail y=28; "3 of 10" y=48    │  zone T
 56   ├──────────────────────────────────────────────────────────────┤
      │              "Tap where the spaces go" (360,96)               │
      │ lizard        t · h · e · c · a · t         letters y=160     │  zone A
      │ (70,160)      pitch 68, · = seam tile 56×80 on the midpoint   │
      │               after a split:  t h e ▲ c a t  (16 px gap)      │
260   ├──────────────────────────────────────────────────────────────┤
      │                        [cat] (360,330)                        │  zone B
      │                    [   OK   ] (360,430)                       │
480   ├──────────────────────────────────────────────────────────────┤
      │                                                              │  zone C
560   └──────────────────────────────────────────────────────────────┘
```
Fixed layout, FIT scaling. A 9-letter row spans 8 × 68 = 544 px plus up to 3 × 16 = 48 px of open spaces = 592 px, centred.

## Visual specification
- Background `THEME.colour.bg`; rail per §6: 10 × `ART.dotEmpty` (x = 261 + i × 22) → `ART.dotFull`; `t("question_x_of_y")` at (360, 48).
- Letters: `ART.letter` at y = 160; letter i at x = x0 + i × 68 + 16 × (open spaces before i), with x0 = 360 − ((n − 1) × 68 + 16 × openSpaces) / 2 — recomputed on every open/close and applied with `ANIM.glide`.
- Seams: `makeTile` 56 × 80 with `ART.seamTile` tokens (fill `bg`, no stroke) centred at the midpoint between letters i and i + 1 (moving with them) and `ART.seamDot` at (0, +34); the library's focus ring makes a seam visible to keyboard users. An open space: `ART.spaceMark` at the seam's (0, +22) and `ART.countBadge` at (0, −34) with the numeral 14 px `THEME.font.display` `THEME.colour.bg`.
- Cues: `ART.wordBar` under a word at y = 190, from the word's first letter x − 20 to its last letter x + 20; `ART.digraphBar` likewise under two letters; `ART.hintRing` behind a seam; `ART.wordCard` behind a completed word (width = the bar width + 16, height 64) at alpha 0 → 1.
- Zone B: the item's picture at (360, 330) at 56 px (two pictures: x = 320 / 400). `makeButton ok` at (360, 430). `ART.lizard` at (70, 160) at 60 px.
- Tap floors: seams 56 × 80 (≥ 56); adjacent seams are 68 apart (gap 12); OK 220 × 72.
- Keyboard: Tab walks the seams left to right, then OK; Enter opens / closes a space.

## Content
Phrases are language-bound. `LOCALE_DATA[lang]` = `{ items: { L1: [...], L2: [...], L3: [...] } }`; an item = `{ letters: "thecat", spaces: [2], digraphs: [], pictures: ["picCat"] }` — `spaces` = seam indices (a seam index s lies between letter s and letter s + 1; the seam after the 3rd letter is s = 2); `digraphs` = seam indices that lie inside a digraph. The English set is complete. **Other locales: a native phrase set is required — en pilot** (`LOCALE_DATA[lang] = "en"` until then). Author's rules: ≤ 9 letters; 2-4 words; letters of the locale's alphabet (ä, ö, å, ß, ç … are single letters in the row); mark the locale's digraphs (de sch/ch, nl oe/ij, es ch/ll, fi none — F-124).

**en**:
- **L1** (two words, 4-7 letters):
  1. thecat — spaces [2] — `ART.picCat`
  2. abus — [0] — `ART.picBus`
  3. thesun — [2] — `ART.picSun`
  4. mydog — [1] — `ART.picDog`
  5. bigpig — [2] — `ART.picPig`
  6. redbus — [2] — `ART.picBus`
- **L2** (three words, 7-9 letters):
  7. thecatsat — [2, 5] — `ART.picCat`
  8. ilikemilk — [0, 4] — `ART.picMilk`
  9. abigdog — [0, 3] — `ART.picDog`
  10. itishot — [1, 3] — `ART.picSun`
  11. wegohome — [1, 3] — `ART.picHouse`
  12. mydogruns — [1, 4] — `ART.picDog`
  13. wesitdown — [1, 4] — `ART.picChair`
- **L3** (three or four words, 8-9 letters, a digraph or a one-letter word):
  14. shecansee — [2, 5], digraphs [0] — `ART.picEyes`
  15. thehenran — [2, 5], digraphs [0] — `ART.picHen`
  16. ihaveahat — [0, 4, 5] — `ART.picHat`
  17. seethefox — [2, 5], digraphs [3] — `ART.picFox`
  18. abigfish — [0, 3], digraphs [6] — `ART.picFish`
  19. abigbath — [0, 3], digraphs [6] — `ART.picBath`
  20. gotobed — [1, 3] — `ART.picBed`

Word extents for the word-bar cue are derived from `spaces` (the words are the runs between boundaries). Play list: 10 items per Rules; shuffled within level; no phrase repeats except by re-queue.

## Rules
- Item count: 10 (re-queued repeats replace unplayed items).
- Difficulty progression: 2 consecutive items completed with no wrong tap and a first Done → next level (cap L3).
- Adaptation: an item with a wrong tap or an early Done, or wrong first-try on 2 consecutive items → next item one level down (floor L1); a single miss re-queues the item after 2 intervening items.
- Inactivity cue (never a clock, nothing ends): after 8 s with a boundary unopened and no tap, the unsplit run `ANIM.readBack`s once; repeats every 8 s of inactivity.
- What happens on a correct answer: each true boundary opens with `tone("tap", k)`, the wedge and badge; on a complete Done the words settle into word cards, `tone("correct")`, praise rotation ["well_done", "great_job", "excellent", "you_did_it", "keep_going"] on every item completed with no wrong tap, lizard `ANIM.flick`, rail dot, next item after 900 ms.
- What happens on a wrong answer:
  - Seam inside a word (syllable / onset / every-letter splitting): the space opens for 700 ms with `ART.wordBar` under the word, `tone("nudge")`, then snaps shut.
  - Seam inside a digraph (L3): `ART.digraphBar` for 600 ms, then the word bar, `tone("nudge")`, snap shut.
  - Done with a boundary missing: Done nudges; the unsplit run reads back letter by letter and the picture pulses.
  - Second Done with a boundary missing: the run's word bars appear in turn + `ART.hintRing` on each missing seam (show-me); completing is solved-with-help.
  - Tapping an open space: closes it (undo, free, no count).
- Retry behaviour: attempt 1 → attempt 2 after the cue → attempt 3 with the rings (no attempt 4). An item with any wrong tap never counts as first-try.
- Finish condition: 10 items. No losing state, no clock.

## Strings
- `GameCore.t()` keys: `t("start")`, `t("question_x_of_y")`, `t("ok")`, `t("all_done")`, `t("play_again")`, `t("menu")`, `t("well_done")`, `t("great_job")`, `t("excellent")`, `t("you_did_it")`, `t("keep_going")`.
- Game-specific: `title` = "Find the Spaces"; `findSpaces` = "Tap where the spaces go". The phrases are content from `LOCALE_DATA`.

## Sound
`tone("tap", k)` on the k-th space opened (pitch rising — F-213); `tone("nudge")` on a refused seam or an early Done; `tone("correct")` on a complete Done; `tone("finish")` once. Silent under `?sound=off`. Nothing is spoken.

## Testing checklist
- [ ] Works in all 11 languages (chrome strings change; `?lang=de` plays the English phrases until a German set exists and nothing breaks).
- [ ] Works at narrow width (400-px iframe: a 9-letter row with three open spaces, the picture and OK all visible).
- [ ] Keyboard operable (Tab walks the seams left to right then OK; Enter opens or closes a space; a focused seam shows the focus ring).
- [ ] Never auto-starts.
- [ ] No losing state (any number of refused seams or early Dones still ends with every space open; the rings always complete an item).
- [ ] Tapping between "e" and "c" in "thecat" slides "cat" to the right, shows a small wedge with "1" in the gap and plays a note.
- [ ] Tapping between "c" and "a" opens a gap for a moment with a coral bar under "cat", then the letters close up again.
- [ ] At the third level tapping between "s" and "h" in "shecansee" shows a teal bar under "sh" first, then the coral word bar, and closes up.
- [ ] Tapping an open space closes it and its wedge disappears.
- [ ] Tapping OK with a space missing nudges OK, lights the unsplit letters one by one and pulses the picture; a second OK draws bars under the words and rings the missing seam.
- [ ] A complete OK puts each word on its own card before the next phrase.
- [ ] Two clean items in a row bring a longer phrase; a refused seam brings a shorter one next.
- [ ] The finish screen lists the ten phrases with spaces and filled or hollow dots and no score.
- [ ] With `?sound=off` nothing is audible.
