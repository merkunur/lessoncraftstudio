# 149 — Spelling Choice

## Identity
- Slug: `spelling-choice`
- Subject / topic: Literacy / orthographic choice — picking the conventional spelling of a pictured word from candidates that differ only in the spelling pattern (magic-e, vowel teams, doubled letters, -ck / -tch / -dge)
- Age band: `8-9`
- Interaction pattern: `P1` — tap one of N (three word tiles, four at the top level)
- Estimated build size: ~440 lines

Shared contract: `catalogue/BUILD-CONVENTIONS.md`. Pattern contract: `catalogue/PATTERNS.md` P1. Locale note: **nothing is spoken** (no audio files); the word is carried by a PICTURE whose name the child knows (A-15). Spelling patterns are language-bound (F-127 is English-derived; transparent orthographies have few genuine choice points — F-7, F-24) — every item lives in `LOCALE_DATA`; the mechanic (picture, N candidate spellings, the pattern marked on error) is universal (F-217). F-125 note: the picture is the prompt, not a crutch beside a word to be decoded — the candidates share every letter except the pattern, so a first-letter guess cannot separate them.

## Learning
- Objective: Looks at a picture and taps the conventionally spelled word among candidates that are phonetically plausible or carry a different pattern, and on error sees the correct pattern marked (the magic-e arc, the vowel team, the doubled letters).
- Prerequisites: Reads regular words fluently (6-8 decoding games); has spelled by sounds (games 070, 085); knows the pictured objects' names.
- Curriculum links: F-22 (spelling by segmenting sounds THEN patterns in 11 of 12 systems), F-31 row "Spell regular words by sounds" — conservative 8, earliest 6 → the pattern stretch bands at 8-9 (US L.2.2.d "generalize learned spelling patterns", L.3.2.f "use spelling patterns and generalizations … doubling"; England Y2 "the /aɪ/ sound spelt i-e", "double consonants", Y3 "-tch / -dge"; Germany Klasse 2-3 "Doppelkonsonanten, Dehnungs-h, ie"; France CE1-CE2 "les graphies du son [o]: o, au, eau"; Spain 2º-3º "b/v, ll/y, h"; Brazil EF02LP-EF03LP "regularidades ortográficas"; Italy classe 2-3 "doppie, cu/qu"; Netherlands groep 4-5 "ei/ij, au/ou"; Sweden åk 2-3 "dubbelteckning, sj-ljudet"; Denmark 2.-3. klasse; Norway 3. trinn (NO has no spelling aim by year 2 — F-22); Finland 2.-3. luokka "pitkät vokaalit, kaksoiskonsonantit"). Demand: F-1 (spelling 5 of 15).
- Common misconceptions (F-127, F-123, F-125), each with this game's response:
  1. **Phonetic spelling kept past the alphabetic phase ("cak", "rane", "rabit") — F-127.** Response: on a wrong tap the correct tile's pattern letters gain `ART.patternBar` beneath them (and, for magic-e, `ART.magicArc` drawn from the e back over the vowel) for 1400 ms, while the tapped tile shows `ART.patternGhost` (a hollow bar) under the place where the pattern should be — "this is the part that changed".
  2. **Silent e omitted or misplaced ("bik", "biek") — F-127.** Response: L1 is entirely magic-e words; the arc shows the e "reaching back" to change the vowel; a misplaced-e distractor is present on every L1 item.
  3. **Vowel spelling chosen by sound alone — a REAL other pattern used ("plain" for the aircraft, "boan", "sheap") — F-123 / F-127.** Response: L2 items always include one wrong-pattern distractor that sounds right; the bar marks the conventional team; where the distractor is a real word (plain / plane) the item is kept — the picture decides.
  4. **Doubling not applied or over-applied ("rabit", "dukk") — F-127 (8-9 only).** Response: L3 items are doubled-letter and -ck / -tch / -dge words; the bar covers both letters of the double (or the whole -tch / -dge).
  5. **Choosing by tile position — F-65.** Response: candidate positions shuffle per item; the correct slot never repeats twice running; after two wrong taps the show-me ring identifies the tile.

## How it plays
1. **Start screen**: title "Spelling Choice", the owl (`ART.owl`) at (360, 200), Start, picker.
2. **Item 1 (L1: cake; tiles cake / cak / caik)**: rail of 14 dots (§6) with `t("question_x_of_y")` at (600, 28). Zone A: the picture card (`ART.card`, 150 × 150) centred at (360, 150) with `ART.picCake` (96 px); the owl at (560, 130). Caption `S("whichSpelling")` ("Which spelling is right?") at (360, 245), 22 px `THEME.colour.inkSoft`. Zone B: three word tiles (`ART.wordTile`, 200 × 80) at y = 380, x = 140 / 360 / 580, showing the candidates (32 px, lowercase, `THEME.font.body`), shuffled.
3. **Answering**: the child taps a tile.
   - **Correct (cake)**: `ANIM.pop`, `tone("correct")`, praise pop (rotation); the word glides (`ANIM.glide`) up under the picture card and settles as `ART.wordDone` (28 px) — the picture now wears its spelling; the owl `ANIM.blink`; rail dot fills; next item after 700 ms (`ANIM.appear`).
   - **Wrong (cak)**: `ANIM.nudge`, `tone("nudge")`, the tile de-selects and stays enabled; the **pattern cue** (misconception 1): `ART.patternBar` slides in under "a_e" of the correct tile — for magic-e items `ART.magicArc` is drawn from the e curving back over the a — and `ART.patternGhost` appears under the tail of the tapped tile, for 1400 ms; then both fade. Attempt 2.
   - **Second wrong**: the cue again; then the correct tile gains `ART.showRing` with `ANIM.showMe`; tapping it completes the item as solved-with-help (no praise pop).
4. **Items 2-14**: per Content/Rules. L1 magic-e (3 tiles); L2 vowel teams (3 tiles); L3 doubled letters and -ck / -tch / -dge (4 tiles at x = 111 / 277 / 443 / 609, tiles 150 × 72, words 28 px).
5. **Finish**: `t("all_done")` (360, 110); the owl (360, 200) `ANIM.celebrate`; the summary = the fourteen words as `ART.wordChip` (130 × 34) in two rows of seven from y = 350 (x = 360 − 3 × 138 + i × 138, row pitch 44), each with its pattern letters drawn 4 px larger — the patterns learned; `t("question_x_of_y", {n: firstTry, total: 14})` at (360, 470) 20 px `inkSoft`; `play_again` (250, 510), `menu` (470, 510); `tone("finish")`.

Session ≈ 6 minutes.

## Art registry
```js
const ART = {
  owl:          { kind: "emoji", value: "🦉", size: 80 },
  card:         { kind: "shape", shape: "roundRect", w: 150, h: 150, fill: "surface", stroke: "structure", strokeWidth: 3, radius: 18 },
  wordTile:     { kind: "shape", shape: "roundRect", w: 200, h: 80, fill: "surface", stroke: "line", strokeWidth: 2, radius: 14 },   // word 32 px body ink (150×72, 28 px at L3)
  patternBar:   { kind: "shape", shape: "rect", w: 40, h: 6, fill: "accent" },     // width = measured width of the pattern letters; 22 px below the word baseline
  patternGhost: { kind: "shape", shape: "rect", w: 40, h: 6, stroke: "accent", strokeWidth: 2 },   // hollow; under the tapped tile's pattern position
  magicArc:     { kind: "shape", shape: "arc", r: 26, stroke: "accent", strokeWidth: 4 },          // from the e back over the vowel: centre midway between the two letters, y − 18, drawn 200°→340°
  wordDone:     { kind: "text",  value: "", size: 28, font: "body", color: "structure" },
  wordChip:     { kind: "shape", shape: "roundRect", w: 130, h: 34, fill: "structureSoft", stroke: "structure", strokeWidth: 2, radius: 8 },   // word 18 px body ink, pattern letters 22 px
  showRing:     { kind: "shape", shape: "roundRect", w: 212, h: 92, stroke: "structure", strokeWidth: 4, radius: 18 },   // 162×84 at L3
  dotEmpty:     { kind: "shape", shape: "circle", r: 8, stroke: "line", strokeWidth: 2 },
  dotFull:      { kind: "shape", shape: "circle", r: 8, fill: "structure" },
  // picture pool (English word in the comment; every name unambiguous)
  picCake:   { kind: "emoji", value: "🎂", size: 96 },   // cake
  picBike:   { kind: "emoji", value: "🚲", size: 96 },   // bike
  picBone:   { kind: "emoji", value: "🦴", size: 96 },   // bone
  picRose:   { kind: "emoji", value: "🌹", size: 96 },   // rose
  picNose:   { kind: "emoji", value: "👃", size: 96 },   // nose
  picFive:   { kind: "emoji", value: "5️⃣", size: 96 },   // five
  picPlane:  { kind: "emoji", value: "✈️", size: 96 },   // plane
  picSnake:  { kind: "emoji", value: "🐍", size: 96 },   // snake
  picGlobe:  { kind: "emoji", value: "🌍", size: 96 },   // globe
  picWhale:  { kind: "emoji", value: "🐳", size: 96 },   // whale
  picRain:   { kind: "emoji", value: "🌧️", size: 96 },   // rain
  picTree:   { kind: "emoji", value: "🌳", size: 96 },   // tree
  picBoat:   { kind: "emoji", value: "⛵", size: 96 },   // boat
  picLight:  { kind: "emoji", value: "💡", size: 96 },   // light
  picMoon:   { kind: "emoji", value: "🌙", size: 96 },   // moon
  picSheep:  { kind: "emoji", value: "🐑", size: 96 },   // sheep
  picTrain:  { kind: "emoji", value: "🚂", size: 96 },   // train
  picLeaf:   { kind: "emoji", value: "🍃", size: 96 },   // leaf
  picBee:    { kind: "emoji", value: "🐝", size: 96 },   // bee
  picGoat:   { kind: "emoji", value: "🐐", size: 96 },   // goat
  picBook:   { kind: "emoji", value: "📖", size: 96 },   // book
  picSnail:  { kind: "emoji", value: "🐌", size: 96 },   // snail
  picRabbit: { kind: "emoji", value: "🐰", size: 96 },   // rabbit
  picDuck:   { kind: "emoji", value: "🦆", size: 96 },   // duck
  picClock:  { kind: "emoji", value: "🕰️", size: 96 },   // clock
  picWatch:  { kind: "emoji", value: "⌚", size: 96 },   // watch
  picBridge: { kind: "emoji", value: "🌉", size: 96 },   // bridge
  picBottle: { kind: "emoji", value: "🍾", size: 96 },   // bottle
  picApple:  { kind: "emoji", value: "🍎", size: 96 },   // apple
  picDress:  { kind: "emoji", value: "👗", size: 96 },   // dress
  picEgg:    { kind: "emoji", value: "🥚", size: 96 },   // egg
  picButter: { kind: "emoji", value: "🧈", size: 96 },   // butter
  picKitten: { kind: "emoji", value: "🐈", size: 96 },   // kitten
  picHammer: { kind: "emoji", value: "🔨", size: 96 },   // hammer
  picCarrot: { kind: "emoji", value: "🥕", size: 96 },   // carrot
  picPepper: { kind: "emoji", value: "🌶️", size: 96 }    // pepper
};
```
No emoji newer than Unicode 12 (bone is Unicode 11, butter Unicode 12); no `fallback` needed.

## Animation registry
```js
const ANIM = {
  pop:       { scale: 1.12, duration: 140, ease: "Back.Out", yoyo: true, trigger: "correct tile" },
  nudge:     { x: "+=10", duration: 80, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "wrong tile" },
  glide:     { duration: 260, ease: "Sine.InOut", trigger: "the correct word up under the picture card (x,y at call)" },
  barIn:     { scaleX: 1, duration: 200, ease: "Sine.Out", trigger: "patternBar and patternGhost (from scaleX 0, left-anchored); magicArc alpha 0 → 1" },
  fadeOut:   { alpha: 0, duration: 250, ease: "Sine.In", trigger: "bars and arc after 1400 ms" },
  blink:     { scaleY: 0.8, duration: 100, ease: "Sine.InOut", yoyo: true, trigger: "owl on a correct answer" },
  appear:    { alpha: 1, scale: 1, duration: 200, ease: "Back.Out", trigger: "new picture and tiles (from alpha 0, scale 0.6)" },
  showMe:    { alpha: 1, duration: 500, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "ring on the correct tile (from alpha 0.2)" },
  celebrate: { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "finish owl" }
};
```
No flashing; `showMe` cycles at 1 Hz.

## Screen layout
```
y   0 ┌──────────────────────────────────────────────────────────────┐
      │ [lang]      ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○  rail y=28   "1 of 14" (600,28)│  zone T
 56   ├──────────────────────────────────────────────────────────────┤
      │                     ┌──────────┐                              │
      │                     │  cake    │  card (360,150)   owl (560,130)│  zone A
      │                     └──────────┘  wordDone (360,232)          │
      │             "Which spelling is right?" (360,245)              │
260   ├──────────────────────────────────────────────────────────────┤
      │   [   cak   ]      [   cake   ]      [   caik   ]  tiles y=380 │  zone B
      │    x=140            x=360             x=580    (200×80)       │
      │                     ‾‾‾‾  patternBar under "a_e" (cue)        │
480   ├──────────────────────────────────────────────────────────────┤
      │                                                              │  zone C
560   └──────────────────────────────────────────────────────────────┘
```
Four tiles (L3): 150 × 72 at x = 111 / 277 / 443 / 609. Fixed layout, FIT scaling.

## Visual specification
- Background `THEME.colour.bg`; rail per §6: 14 × `ART.dotEmpty` (x = 217 + i × 22, y = 28) → `ART.dotFull`; `t("question_x_of_y")` at (600, 28) 18 px `inkSoft`.
- `ART.card` centred (360, 150) with the item's picture (96 px); `ART.wordDone` at (360, 232) after a correct answer (the caption moves nothing; it sits at y = 245 and is hidden while `ART.wordDone` shows).
- Caption `S("whichSpelling")` at (360, 245), 22 px `THEME.font.body` `THEME.colour.inkSoft`, `wordWrap` width 600.
- `ART.owl` (560, 130).
- Word tiles: `makeTile` 200 × 80 (`ART.wordTile`), word 32 px `THEME.font.body` `THEME.colour.ink`, lowercase; L3 tiles 150 × 72 with 28 px words. Tiles are wide enough for 1.6 × the English width (longest candidate "chocolate"-length words are not used; the longest is 7 letters).
- Cue: `ART.patternBar` under the correct tile's pattern letters — for a split pattern (a_e) the bar spans from the vowel's left edge to the e's right edge; `ART.magicArc` for magic-e items; `ART.patternGhost` under the tapped tile at the same character span as the correct tile's pattern (index-mapped). Bars are 22 px below the word baseline.
- `ART.showRing` behind the correct tile. Tap floors: tiles 200 × 80 / 150 × 72 (≥ 56); gaps ≥ 16. Tab order: tiles left to right.

## Content
Language-bound. `LOCALE_DATA[GameCore.lang].items` supplies, per level, items `{ pic, answer, pattern: [from, to], magicE: [vowelIndex, eIndex] | null, wrong: [{ text, kind }] }` where `kind` is `phonetic`, `wrongPattern` or `misplaced`. The English (`en`) set is authored in full below. **Other locales: a native list is required — en pilot.** Native authors pick that language's genuine choice points (de ie / ih / doubled consonants / ss vs ß; fr o / au / eau, ai / è, silent finals; nl ei / ij, au / ou; es b / v, ll / y, silent h, g / j; pt s / ss / ç / z, x / ch; it doubled consonants, cu / qu, gli / li; sv / da / no doubled consonants, sj / skj / stj; fi long vowels and double consonants — tuli / tuuli, kuka / kukka are real fi spelling choices). Until then `LOCALE_DATA[lang] = "en"`.

Items (picture; correct; pattern letters; distractors with their kind):
- **L1 — magic-e (split digraph); three tiles; one misplaced-e distractor on every item** (misconception 2): (`ART.picCake`; cake; a_e; cak phonetic, caik wrongPattern) · (`ART.picBike`; bike; i_e; bik phonetic, biek misplaced) · (`ART.picBone`; bone; o_e; bon phonetic, boan wrongPattern) · (`ART.picRose`; rose; o_e; roz phonetic, roes misplaced) · (`ART.picNose`; nose; o_e; noz phonetic, noes misplaced) · (`ART.picFive`; five; i_e; fiv phonetic, fiev misplaced) · (`ART.picPlane`; plane; a_e; plan phonetic, plain wrongPattern) · (`ART.picSnake`; snake; a_e; snak phonetic, snaek misplaced) · (`ART.picGlobe`; globe; o_e; glob phonetic, gloeb misplaced) · (`ART.picWhale`; whale; a_e; wale phonetic, whail wrongPattern)
- **L2 — vowel teams; three tiles; one wrong-pattern distractor that sounds right** (misconception 3): (`ART.picRain`; rain; ai; rane wrongPattern, ran phonetic) · (`ART.picTree`; tree; ee; tre phonetic, trea wrongPattern) · (`ART.picBoat`; boat; oa; bote wrongPattern, bot phonetic) · (`ART.picLight`; light; igh; lite wrongPattern, lit phonetic) · (`ART.picMoon`; moon; oo; mune wrongPattern, mon phonetic) · (`ART.picSheep`; sheep; ee; sheap wrongPattern, shep phonetic) · (`ART.picTrain`; train; ai; trane wrongPattern, tran phonetic) · (`ART.picLeaf`; leaf; ea; leef wrongPattern, lef phonetic) · (`ART.picBee`; bee; ee; bea wrongPattern, be phonetic) · (`ART.picGoat`; goat; oa; gote wrongPattern, got phonetic) · (`ART.picBook`; book; oo; booke misplaced, buk phonetic) · (`ART.picSnail`; snail; ai; snale wrongPattern, snal phonetic)
- **L3 — doubled letters and -ck / -tch / -dge; four tiles** (misconception 4): (`ART.picRabbit`; rabbit; bb; rabit phonetic, rabbet wrongPattern, rabitt misplaced) · (`ART.picDuck`; duck; ck; duk phonetic, duc phonetic, dukk misplaced) · (`ART.picClock`; clock; ck; clok phonetic, cloc phonetic, klock wrongPattern) · (`ART.picWatch`; watch; tch; wach phonetic, woch phonetic, watsh wrongPattern) · (`ART.picBridge`; bridge; dge; brige phonetic, brij phonetic, bridg misplaced) · (`ART.picBottle`; bottle; tt; botle phonetic, bottel wrongPattern, botel phonetic) · (`ART.picApple`; apple; pp; aple phonetic, appel wrongPattern, apel phonetic) · (`ART.picDress`; dress; ss; dres phonetic, dresse misplaced, drass wrongPattern) · (`ART.picEgg`; egg; gg; eg phonetic, egge misplaced, ege wrongPattern) · (`ART.picButter`; butter; tt; buter phonetic, buttor wrongPattern, butta phonetic) · (`ART.picKitten`; kitten; tt; kiten phonetic, kittin wrongPattern, kitn phonetic) · (`ART.picHammer`; hammer; mm; hamer phonetic, hammor wrongPattern, hamma phonetic) · (`ART.picCarrot`; carrot; rr; carot phonetic, carret wrongPattern, karrot wrongPattern) · (`ART.picPepper`; pepper; pp; peper phonetic, pepar wrongPattern, peppar wrongPattern)

Pattern spans for the bar: magic-e = from the vowel to the e inclusive (a_e in cake = indices 1-3); vowel team = the two or three team letters; double = both letters; -ck / -tch / -dge = the whole group. `ART.patternGhost` on a tapped distractor is drawn under the character span that maps to the pattern in that candidate (the same start index, the candidate's own length for that span; a missing letter gives a shorter ghost).

Play list: 14 items; start at L1; levels per Rules; no picture repeats within a session; candidates shuffled per item; the correct slot never repeats twice running (§13). Words use `THEME.font.body` (Nunito) throughout.

## Rules
- Item count: 14.
- Difficulty progression: 2 consecutive first-try correct → next level (cap L3).
- Adaptation: a wrong tap, or wrong first-try on 2 consecutive items → next item one level down (floor L1).
- What happens on a correct answer: `ANIM.pop`, `tone("correct")`, praise rotation ["well_done", "great_job", "excellent", "you_did_it", "keep_going"], the word glides up under the picture as `ART.wordDone`, owl `ANIM.blink`, rail dot, next item after 700 ms.
- What happens on a wrong answer (per anticipated mistake):
  - Phonetic distractor (cak, ran, rabit): `ANIM.nudge`, `tone("nudge")`; `ART.patternBar` (+ `ART.magicArc` on L1) under the correct tile's pattern and `ART.patternGhost` under the tapped tile for 1400 ms.
  - Wrong-pattern distractor (caik, plain, sheap, rabbet): the same cue — the bar marks the conventional pattern, the ghost marks the substituted one.
  - Misplaced-e distractor (biek, roes, dukk): the same cue; on L1 the arc shows where the e belongs.
  - Position habit (a wrong tile at the same slot twice): no extra cue; the show-me ring after the second wrong tap.
- Retry behaviour: attempt 1 → attempt 2 after the cue → attempt 3 with the show-me ring; solved-with-help. No attempt 4.
- Finish condition: 14 items. No losing state, no clock.

## Strings
- `GameCore.t()` keys: `t("start")`, `t("question_x_of_y")`, `t("all_done")`, `t("play_again")`, `t("menu")`, `t("well_done")`, `t("great_job")`, `t("excellent")`, `t("you_did_it")`, `t("keep_going")`.
- Game-specific: `title` = "Spelling Choice"; `whichSpelling` = "Which spelling is right?". Candidate words are content from `LOCALE_DATA`.

## Sound
`tone("correct")` on the right spelling; `tone("nudge")` on a wrong tile; `tone("tap")` when the pattern bar slides in; `tone("finish")` once. Silent under `?sound=off`. Nothing is spoken; the picture carries the word.

## Testing checklist
- [ ] Works in all 11 languages (chrome strings change; `?lang=xx` reads `LOCALE_DATA.xx` and falls back to `en` without crashing while native lists are pending — reviewer notes "en pilot").
- [ ] Works at narrow width (400-px iframe: the card, the owl and four word tiles visible and separate; no word is clipped).
- [ ] Keyboard operable (Tab across the word tiles; Enter picks).
- [ ] Never auto-starts.
- [ ] No losing state (wrong taps never end the session; the ring always completes the item).
- [ ] For the cake, tapping "cak" wiggles it, draws a coral bar under "a…e" on the "cake" tile with an arc from the e back over the a, and a hollow bar under "ak" on the tapped tile; both fade after about a second and a half.
- [ ] For the rain, tapping "rane" marks "ai" on the "rain" tile.
- [ ] At the third level four tiles appear and tapping "rabit" marks "bb" on "rabbit".
- [ ] The candidates on any item differ only in the spelling pattern; every candidate starts with the same letter.
- [ ] Two first-try corrects in a row move from magic-e words to vowel-team words; a wrong tap moves back.
- [ ] The correct tile is never in the same position twice in a row.
- [ ] After a correct tap the word appears under the picture; the finish screen shows the fourteen words with their pattern letters enlarged, the first-try count, and no score beyond that count.
- [ ] With `?sound=off` nothing is audible.
