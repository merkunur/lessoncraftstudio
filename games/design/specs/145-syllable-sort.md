# 145 — Syllable Sort

## Identity
- Slug: `syllable-sort`
- Subject / topic: Literacy / syllable count families — sorting pictured words into bins by how many beats their name has
- Age band: `6-8`
- Interaction pattern: `P8` — sort into bins (tap the picture, then tap a bin; three bins; one picture at a time)
- Estimated build size: ~470 lines

Shared contract: `catalogue/BUILD-CONVENTIONS.md`. Pattern contract: `catalogue/PATTERNS.md` P8 (3 bins for 6-8; a wrong bin refuses gently and the bin's rule icon pulses; 3rd wrong → the correct bin pulses). Locale note: **nothing is spoken** (no audio files); each item is a PICTURE whose name the child knows (A-15). Syllable counts and the school-style chunking are language-bound (F-126, F-24: Romance and Finnish methods segment by syllable explicitly; German compounds and French mute-e endings change counts) — every word list lives in `LOCALE_DATA`; the mechanic is universal (F-217). Harder sibling of game 063 (one word, tap a drum, pick a numeral): here the child classifies a STREAM of words into families and watches each family grow.

## Learning
- Objective: Says a pictured word to themselves, decides how many syllables it has, and sorts it into the 1-, 2- or 3-beat bin (2-, 3- or 4-beat at the top level), including long-sounding two-beat words and fast-spoken three-beat words.
- Prerequisites: Has clapped or drummed syllables (game 063 or classroom); knows the names of the pictured objects in the play language. No reading — the chunks in the replay are a cue, never something to decode (F-125 applies to decoding tasks only).
- Curriculum links: F-22 (phonological awareness — syllables — at 5-7 in all twelve systems; sorting by count is the 6-8 consolidation), F-24 (syllable work is the entry point of the Romance and Finnish methods and the Silbenmethode in Germany), F-31 row "Rhyme, syllable clapping" — conservative 6-7 → 6-8 for the classification form (US RF.K.2.b / RF.1.3.d "syllables"; England Y1 phonics "syllables"; Germany Klasse 1 Silben schwingen und zählen; France CP "syllabes orales"; Spain 1º "sílabas"; Brazil EF01LP06 "segmentar … sílabas"; Italy classe prima metodo fono-sillabico; Netherlands groep 3 "klankgroepen"; Sweden åk 1 "stavelser"; Denmark 1. klasse; Norway 1.-2. trinn; Finland 1. luokka "tavut"). Demand: F-7.
- Common misconceptions (F-126, F-101), each with this game's response:
  1. **Fast-speech elision — a three-beat word sorted as two ("ele-phant", "ba-nana") — F-126.** Response: on a wrong bin the **slow replay** runs under the picture: the word's chunks appear one at a time (`ART.chunk`, 600 ms apart) each with a beat token (`ART.beat`) and `tone("tap", k)`, the last chunk pulses; then the correct bin's drum icons `ANIM.pulse` — the count is shown, not told.
  2. **Counting letters or sounds instead of beats ("cat" into the 3 bin) — F-126.** Response: the replay shows "cat" as ONE chunk with ONE beat; L1 pairs short one-beat words with long-looking three-beat words so the letter strategy fails from the first items.
  3. **Long word = many beats, short word = few ("penguin" into 3, "bee" is 1 so "sock" must be 2).** Response: L2 includes long two-beat words (penguin, rocket, carrot) and a short three-beat word (tomato, potato); the replay shows two chunks for "pen-guin" however long it looks.
  4. **Losing the count between saying the word and choosing the bin — F-101 cardinality.** Response: the bin labels are drum icons (`ART.drumIcon` × 1/2/3) WITH the numeral (`ART.binNumeral`), so a child who drummed on the table can match beats to drums by one-to-one, not by number word; the replay leaves its tokens in view until the bin is chosen.
  5. **Sorting by the bin's position (always the middle bin) — F-65.** Response: bin order is shuffled when the level changes; the correct bin never sits in the same position more than 3 items running; counts on the bins show all three filling.

## How it plays
1. **Start screen**: title "Syllable Sort", the gorilla (`ART.gorilla`) at (360, 190) with the drum (`ART.drum`) at (360, 260), Start, picker.
2. **Item 1 (L1: bins 1 / 2 / 3; first picture: banana)**: rail of 12 dots (§6) with `t("question_x_of_y")` at (600, 28) in 18 px `THEME.colour.inkSoft`. Zone A: a conveyor strip (`ART.belt`) across y = 160 with the gorilla at (80, 150); the first picture slides in from the right (`ANIM.slideIn`) to the centre (360, 160) as a `makeTile` 120 × 120 with `ART.picBanana` as its label. Under the picture, a replay area at y = 236 (empty until a wrong bin). Zone B: three bins (`ART.bin`, 180 × 120) at y = 390, x = 150 / 360 / 570; on each bin's front its drum icons in a row (`ART.drumIcon`, 32 px, one per beat: 1, 2 or 3) and its numeral (`ART.binNumeral`, 36 px) at the right, plus a count (`ART.binCount`, "0") in the top corner. Caption `S("howManyBeats")` ("How many beats?") at (360, 80), 24 px `THEME.colour.inkSoft` (≤ 8 words, F-42).
3. **Sorting**: tap the picture (it lifts: `ANIM.lift`, `tone("tap")`), then tap a bin. The picture glides (`ANIM.glide`) into the bin.
   - **Correct bin (3)**: the bin `ANIM.pop`, its count 0 → 1, `tone("correct")`; the picture shrinks into the bin as a small copy (`ART.miniPic`) along the bin's bottom edge; every third correct sort plays a praise pop (rotation); the rail dot fills; the next picture slides in after 400 ms.
   - **Wrong bin (2)**: the picture glides back to the centre, `tone("nudge")`; the **slow replay** (misconception 1): chunks `ART.chunk` "ba", "na", "na" appear under the picture at y = 236 one every 600 ms, each with `ART.beat` (a filled circle with the beat numeral) on a token row at y = 290 and `tone("tap", k)`; the last chunk `ANIM.lastChunk`; then the correct bin's drum icons `ANIM.pulse` together. The chunks fade after 900 ms; the tokens stay until the picture is sorted. Attempt 2.
   - **Second wrong bin**: the replay again; then the correct bin gains `ART.showRing` with `ANIM.showMe` (show-me); placing the picture there completes the item as solved-with-help (no praise pop).
   - **Tapping a bin with nothing selected**: its drum icons `ANIM.pop` in turn with `tone("tap", k)` — a harmless preview of the bin's beat count; not an attempt.
4. **Level changes**: when the level changes (Rules), the bins `ANIM.binOut` and new bins `ANIM.appear` with the new labels in a shuffled order; counts restart at 0; `tone("tap", 4)`.
5. **Items 2-12**: per Content/Rules. L1 bins 1 / 2 / 3 with clear contrasts; L2 bins 1 / 2 / 3 with long two-beat and short three-beat words; L3 bins 2 / 3 / 4 with elision-prone words.
6. **Finish**: `t("all_done")` (360, 110); the gorilla (360, 200) with the drum `ANIM.celebrate`; the summary = the session's three (or six, when the level changed) bins as `ART.binMini` (110 × 80) in a row at y = 400 (x from 360 − (n−1) × 62), each showing its drum icons and the small pictures it received along its bottom — the families sorted; `t("question_x_of_y", {n: firstTry, total: 12})` at (360, 470) 20 px `inkSoft`; `play_again` (250, 510), `menu` (470, 510); `tone("finish")`.

Session ≈ 5-6 minutes.

## Art registry
```js
const ART = {
  gorilla:    { kind: "emoji", value: "🦍", size: 80 },
  drum:       { kind: "emoji", value: "🥁", size: 72 },
  drumIcon:   { kind: "emoji", value: "🥁", size: 32 },
  belt:       { kind: "shape", shape: "roundRect", w: 600, h: 24, fill: "surface2", stroke: "line", strokeWidth: 2, radius: 12 },
  bin:        { kind: "shape", shape: "roundRect", w: 180, h: 120, fill: "surface", stroke: "line", strokeWidth: 2, radius: 16 },
  binMini:    { kind: "shape", shape: "roundRect", w: 110, h: 80, fill: "surface", stroke: "structure", strokeWidth: 2, radius: 10 },
  binNumeral: { kind: "text",  value: "", size: 36, font: "display", color: "ink" },
  binCount:   { kind: "text",  value: "0", size: 20, font: "display", color: "inkSoft" },
  chunk:      { kind: "shape", shape: "roundRect", w: 64, h: 40, fill: "structureSoft", stroke: "structure", strokeWidth: 2, radius: 10 },   // chunk text 24 px display ink
  beat:       { kind: "shape", shape: "circle", r: 16, fill: "structure" },      // beat numeral 18 px display, color bg
  miniPic:    { kind: "text",  value: "", size: 22, font: "body", color: "ink" },  // value = a picture emoji read through ART at runtime
  showRing:   { kind: "shape", shape: "roundRect", w: 192, h: 132, stroke: "structure", strokeWidth: 4, radius: 20 },
  dotEmpty:   { kind: "shape", shape: "circle", r: 8, stroke: "line", strokeWidth: 2 },
  dotFull:    { kind: "shape", shape: "circle", r: 8, fill: "structure" },
  // picture pool (English name and syllable count in the comment; every name unambiguous)
  picCat:        { kind: "emoji", value: "🐱", size: 72 },   // cat 1
  picDog:        { kind: "emoji", value: "🐶", size: 72 },   // dog 1
  picSun:        { kind: "emoji", value: "☀️", size: 72 },   // sun 1
  picFish:       { kind: "emoji", value: "🐟", size: 72 },   // fish 1
  picFrog:       { kind: "emoji", value: "🐸", size: 72 },   // frog 1
  picBee:        { kind: "emoji", value: "🐝", size: 72 },   // bee 1
  picStar:       { kind: "emoji", value: "⭐", size: 72 },   // star 1
  picMoon:       { kind: "emoji", value: "🌙", size: 72 },   // moon 1
  picSock:       { kind: "emoji", value: "🧦", size: 72 },   // sock 1
  picTruck:      { kind: "emoji", value: "🚚", size: 72 },   // truck 1
  picRabbit:     { kind: "emoji", value: "🐰", size: 72 },   // rabbit 2
  picMonkey:     { kind: "emoji", value: "🐒", size: 72 },   // monkey 2
  picApple:      { kind: "emoji", value: "🍎", size: 72 },   // apple 2
  picTiger:      { kind: "emoji", value: "🐯", size: 72 },   // tiger 2
  picPizza:      { kind: "emoji", value: "🍕", size: 72 },   // pizza 2
  picPenguin:    { kind: "emoji", value: "🐧", size: 72 },   // penguin 2
  picRocket:     { kind: "emoji", value: "🚀", size: 72 },   // rocket 2
  picCarrot:     { kind: "emoji", value: "🥕", size: 72 },   // carrot 2
  picSpider:     { kind: "emoji", value: "🕷️", size: 72 },   // spider 2
  picPanda:      { kind: "emoji", value: "🐼", size: 72 },   // panda 2
  picBanana:     { kind: "emoji", value: "🍌", size: 72 },   // banana 3
  picElephant:   { kind: "emoji", value: "🐘", size: 72 },   // elephant 3
  picButterfly:  { kind: "emoji", value: "🦋", size: 72 },   // butterfly 3
  picTomato:     { kind: "emoji", value: "🍅", size: 72 },   // tomato 3
  picPotato:     { kind: "emoji", value: "🥔", size: 72 },   // potato 3
  picDinosaur:   { kind: "emoji", value: "🦕", size: 72 },   // dinosaur 3
  picUmbrella:   { kind: "emoji", value: "☂️", size: 72 },   // umbrella 3
  picKangaroo:   { kind: "emoji", value: "🦘", size: 72 },   // kangaroo 3
  picOctopus:    { kind: "emoji", value: "🐙", size: 72 },   // octopus 3
  picStrawberry: { kind: "emoji", value: "🍓", size: 72 },   // strawberry 3
  picWatermelon: { kind: "emoji", value: "🍉", size: 72 },   // watermelon 4
  picHelicopter: { kind: "emoji", value: "🚁", size: 72 },   // helicopter 4
  picTelevision: { kind: "emoji", value: "📺", size: 72 },   // television 4
  picAvocado:    { kind: "emoji", value: "🥑", size: 72 },   // avocado 4
  picCaterpillar:{ kind: "emoji", value: "🐛", size: 72 }    // caterpillar 4 (the bug emoji is used ONLY with the intended word "caterpillar")
};
```
No emoji newer than Unicode 12 (kangaroo is Unicode 11); no `fallback` needed. The alligator/crocodile pair is absent because its name is ambiguous.

## Animation registry
```js
const ANIM = {
  slideIn:   { x: 360, duration: 320, ease: "Sine.Out", trigger: "new picture from x = 760 to the centre" },
  lift:      { y: "-=8", scale: 1.06, duration: 120, ease: "Sine.Out", trigger: "picture selected" },
  glide:     { duration: 260, ease: "Sine.InOut", trigger: "picture to a bin / back to the centre (x,y at call)" },
  pop:       { scale: 1.12, duration: 140, ease: "Back.Out", yoyo: true, trigger: "bin receives a correct picture; drum icons on a preview tap" },
  pulse:     { scale: 1.15, duration: 300, ease: "Sine.InOut", yoyo: true, repeat: 2, trigger: "the correct bin's drum icons after the replay" },
  appear:    { alpha: 1, scale: 1, duration: 200, ease: "Back.Out", trigger: "a chunk; a beat token; new bins (from alpha 0, scale 0.6)" },
  lastChunk: { scale: 1.25, duration: 220, ease: "Back.Out", yoyo: true, trigger: "the last chunk of the slow replay" },
  fadeOut:   { alpha: 0, duration: 300, ease: "Sine.In", trigger: "chunks 900 ms after the replay; tokens when the picture is sorted" },
  binOut:    { y: "+=40", alpha: 0, duration: 300, ease: "Sine.In", trigger: "old bins when the level changes" },
  showMe:    { alpha: 1, duration: 500, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "ring around the correct bin (from alpha 0.2)" },
  celebrate: { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "finish gorilla" }
};
```
No flashing; the replay adds one chunk per 600 ms.

## Screen layout
```
y   0 ┌──────────────────────────────────────────────────────────────┐
      │ [lang]        ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○  rail y=28   "3 of 12" (600,28)│  zone T
 56   ├──────────────────────────────────────────────────────────────┤
      │              "How many beats?" (360,80)                       │
      │ gorilla(80,150) ══════════ belt y=160 ══════════ picture in→  │  zone A
      │                     [ picture (360,160) ] 120×120             │
      │                 [ba] [na] [na]  chunks y=236 (replay only)    │
      │                  (1)  (2)  (3)  tokens y=290                  │
260   ├──────────────────────────────────────────────────────────────┤
      │  ┌──────────┐      ┌──────────┐      ┌──────────┐             │
      │  │ d      1 │      │ d d    2 │      │ d d d  3 │  bins y=390 │  zone B
      │  │(150,390) │      │(360,390) │      │(570,390) │  180×120    │
      │  └──────────┘      └──────────┘      └──────────┘             │
480   ├──────────────────────────────────────────────────────────────┤
      │                                                              │  zone C
560   └──────────────────────────────────────────────────────────────┘
```
"d" marks a drum icon. Chunks are centred as a group under the picture: for n chunks the first x = 360 − (n−1) × 36; tokens the same at y = 290. Fixed layout, FIT scaling.

## Visual specification
- Background `THEME.colour.bg`; rail per §6: 12 × `ART.dotEmpty` (x = 239 + i × 22, y = 28) → `ART.dotFull`; `t("question_x_of_y")` at (600, 28).
- Caption `S("howManyBeats")` at (360, 80), 24 px `THEME.font.body` `THEME.colour.inkSoft`, `wordWrap` width 600.
- `ART.gorilla` (80, 150); `ART.belt` centred (390, 160).
- The item picture: `makeTile` 120 × 120 at (360, 160), fill `THEME.colour.surface`, stroke `THEME.colour.line`, label = the picture emoji (72 px) read through `ART[picKey].value`; selected look = library selected + `ANIM.lift`.
- Replay: `ART.chunk` × n at y = 236 (chunk text 24 px `THEME.font.display` `THEME.colour.ink`); `ART.beat` × n at y = 290 with the beat numeral 18 px `THEME.colour.bg`.
- Bins: `makeTile` 180 × 120 (`ART.bin` tokens) with `ART.drumIcon` × k in a row starting at (−70, −12) with 36 px pitch, `ART.binNumeral` at (+62, −12), `ART.binCount` at (+70, −44); received pictures as `ART.miniPic` along the bin's bottom edge at y = +40, from x = −70 with 24 px pitch (max 7 shown; further ones are counted only).
- `ART.showRing` around the correct bin. Tap floors: picture 120, bins 180 × 120 (≥ 56); gap between bins 30.
- Tab order: the picture, then the bins left to right.

## Content
Language-bound. `LOCALE_DATA[GameCore.lang].items` supplies, per level, items `{ pic, count, chunks }` and the bin set per level. The English (`en`) list is authored in full below with school-style chunking for the replay. **Other locales: a native word list is required — en pilot.** Native authors must choose pictures whose native name has the intended count by that language's school convention (de "Ba-na-ne" 3, "Ap-fel" 2, "Ka-rot-te" 3; es "e-le-fan-te" 4, "sol" 1; fr oral counting "ba-nane" 2; fi "kis-sa" 2 where en "cat" is 1), write chunks in that language's division style, rebuild the long-2 / short-3 contrasts, and must not translate the English list. Until then `LOCALE_DATA[lang] = "en"` and the English set plays with the chrome in the chosen language.

Each item = (picture; count; chunks).
- **L1 — bins 1 / 2 / 3; short one-beat vs long-looking three-beat contrasts** (misconception 2): (`ART.picCat`; 1; "cat") · (`ART.picBanana`; 3; "ba", "na", "na") · (`ART.picRabbit`; 2; "rab", "bit") · (`ART.picSun`; 1; "sun") · (`ART.picButterfly`; 3; "but", "ter", "fly") · (`ART.picApple`; 2; "ap", "ple") · (`ART.picDog`; 1; "dog") · (`ART.picKangaroo`; 3; "kan", "ga", "roo") · (`ART.picTiger`; 2; "ti", "ger") · (`ART.picFish`; 1; "fish") · (`ART.picOctopus`; 3; "oc", "to", "pus") · (`ART.picMonkey`; 2; "mon", "key") · (`ART.picBee`; 1; "bee") · (`ART.picPizza`; 2; "piz", "za")
- **L2 — bins 1 / 2 / 3; long two-beat and short three-beat words** (misconception 3): (`ART.picPenguin`; 2; "pen", "guin") · (`ART.picTomato`; 3; "to", "ma", "to") · (`ART.picTruck`; 1; "truck") · (`ART.picRocket`; 2; "rock", "et") · (`ART.picPotato`; 3; "po", "ta", "to") · (`ART.picStar`; 1; "star") · (`ART.picCarrot`; 2; "car", "rot") · (`ART.picStrawberry`; 3; "straw", "ber", "ry") · (`ART.picSock`; 1; "sock") · (`ART.picSpider`; 2; "spi", "der") · (`ART.picDinosaur`; 3; "di", "no", "saur") · (`ART.picMoon`; 1; "moon") · (`ART.picPanda`; 2; "pan", "da") · (`ART.picFrog`; 1; "frog")
- **L3 — bins 2 / 3 / 4; elision-prone three- and four-beat words** (misconception 1): (`ART.picElephant`; 3; "el", "e", "phant") · (`ART.picWatermelon`; 4; "wa", "ter", "mel", "on") · (`ART.picRabbit`; 2; "rab", "bit") · (`ART.picHelicopter`; 4; "hel", "i", "cop", "ter") · (`ART.picUmbrella`; 3; "um", "brel", "la") · (`ART.picTelevision`; 4; "tel", "e", "vi", "sion") · (`ART.picPenguin`; 2; "pen", "guin") · (`ART.picAvocado`; 4; "av", "o", "ca", "do") · (`ART.picBanana`; 3; "ba", "na", "na") · (`ART.picCaterpillar`; 4; "cat", "er", "pil", "lar") · (`ART.picTomato`; 3; "to", "ma", "to") · (`ART.picCarrot`; 2; "car", "rot")

Stream rule: within a level, items are drawn shuffled with at most 2 of the same count in a row and each bin used at least 3 times per 12 items when a level lasts the whole session; a picture is never repeated in a session (rabbit/penguin/banana/tomato/carrot appear in two levels' lists but are drawn once). The correct bin's position never repeats more than 3 items running.

Play list: 12 items; start at L1; levels per Rules; bins re-labelled and shuffled at each level change.

## Rules
- Item count: 12.
- Difficulty progression: 3 consecutive first-try correct sorts → next level (cap L3) with new bins. Three, not two: sorts take ~10 s.
- Adaptation: a wrong bin, or wrong first-try on 2 consecutive items → next item one level down (floor L1) with that level's bins.
- What happens on a correct answer: picture glides into the bin, bin `ANIM.pop`, count +1, small picture added to the bin, `tone("correct")`; praise pop (rotation ["well_done", "great_job", "excellent", "you_did_it", "keep_going"]) on every third correct item and on the twelfth; rail dot fills; next picture after 400 ms.
- What happens on a wrong answer (per anticipated mistake):
  - Too few (elision — elephant into 2): picture returns, `tone("nudge")`, the slow replay (chunks 600 ms apart with tokens and rising tones, last chunk pulses), then the correct bin's drum icons pulse.
  - Too many (letters counted — cat into 3, or long word — penguin into 3): the same replay shows the true number of chunks; the tokens beyond the count are absent.
  - Count lost between word and bin: the same replay; the tokens stay in view until the picture is sorted, so the count is on the screen for attempt 2.
  - Bin tapped with nothing selected: drum-icon preview; not an attempt.
- Retry behaviour: attempt 1 → attempt 2 after the replay → attempt 3 with the show-me ring on the correct bin; solved-with-help. No attempt 4.
- Finish condition: 12 items. No losing state, no clock.

## Strings
- `GameCore.t()` keys: `t("start")`, `t("question_x_of_y")`, `t("all_done")`, `t("play_again")`, `t("menu")`, `t("well_done")`, `t("great_job")`, `t("excellent")`, `t("you_did_it")`, `t("keep_going")`.
- Game-specific: `title` = "Syllable Sort"; `howManyBeats` = "How many beats?". The chunk strings are locale content from `LOCALE_DATA`, not UI copy.

## Sound
`tone("tap")` on selecting a picture; `tone("tap", k)` per chunk in the slow replay and per drum icon on a bin preview (one note per beat, pitch rising — F-213 / F-70); `tone("correct")` on a correct bin; `tone("nudge")` on a wrong bin; `tone("tap", 4)` when the bins change; `tone("finish")` once. Silent under `?sound=off`. The word is never spoken; the picture carries it and the chunks show it.

## Testing checklist
- [ ] Works in all 11 languages (chrome strings change; `?lang=xx` reads `LOCALE_DATA.xx` and falls back to `en` without crashing while native lists are pending — reviewer notes "en pilot").
- [ ] Works at narrow width (400-px iframe: belt, picture and three bins visible and separate).
- [ ] Keyboard operable (Tab: picture, then the three bins; Enter selects / drops).
- [ ] Never auto-starts.
- [ ] No losing state (wrong bins never end the session; the ring always leads to completion).
- [ ] Each bin shows as many drum icons as its numeral; tapping a bin with nothing selected pops its drums one by one with rising notes.
- [ ] The banana tapped then the 3 bin makes the bin pop, its count go to 1 and a small banana appear in the bin.
- [ ] The banana into the 2 bin returns it and shows "ba", "na", "na" appearing one by one with a beat each, the last one growing, then the 3 bin's drums pulse.
- [ ] The cat into the 3 bin shows a single chunk "cat" and one beat.
- [ ] Three first-try sorts in a row swap in new bins; at the third level the bins read 2 / 3 / 4 and the elephant belongs in 3.
- [ ] The same picture never appears twice in a session; the correct bin is not in the same position more than three times running.
- [ ] The finish screen shows the bins with their small pictures, the first-try count, and no stars or score beyond that count.
- [ ] With `?sound=off` nothing is audible.
