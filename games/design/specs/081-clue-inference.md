# 081 — Clue Inference

## Identity
- Slug: `clue-inference`
- Subject / topic: Literacy / reading comprehension — inferring an unstated fact by joining two clues that sit in different sentences of a short text
- Age band: `8-9`
- Interaction pattern: `P1` — tap one of N (three pictured answer tiles under a three-sentence text)
- Estimated build size: ~480 lines

Shared contract: `catalogue/BUILD-CONVENTIONS.md`. Pattern contract: `catalogue/PATTERNS.md` P1. Locale note: the texts, questions and answer words are language-bound (F-129, F-128 — sentence structure differs by language and a translated English text is not a native text) and live in `LOCALE_DATA`; the `en` set is authored in full below; **other locales: a native list is required — en pilot** (A-15). The mechanic — three sentence rows, a question, three pictured tiles, two rows that light up — is universal.

## Learning
- Objective: Reads a three-sentence text and taps the pictured answer to a question whose answer is never stated but follows from two of the sentences taken together.
- Prerequisites: Reads simple sentences fluently enough to read three in a row (6-8 decoding done); knows the everyday objects in the pictures.
- Curriculum links: F-1 (reading comprehension in 5 of 15 sources — mid-tier demand), F-22 ("reading short narrative texts with comprehension … by 8" in all twelve systems), F-31 row "Read short text; retell/sequence; simple inference" — conservative 8, earliest 6 → 8-9 (US RL.2.1/RL.3.1 "ask and answer questions … referring explicitly to the text"; England Y2-3 "making inferences on the basis of what is being said and done"; Germany Klasse 2-3 "Texte erschließen, Schlussfolgerungen ziehen"; France CE1-CE2 "comprendre un texte: inférences"; Netherlands groep 4-5 "begrijpend lezen"; Spain 2º-3º "comprensión lectora"; Brazil EF02LP-EF03LP "inferir informações implícitas"; Sweden åk 1-3 "läsförståelse: läsa mellan raderna"; Norway 2.-3. trinn; Finland grade 2-3 "tekstin ymmärtäminen"). Nothing is spoken (no audio files) — the child reads.
- Common misconceptions (F-129, F-125, F-43), each with this game's response:
  1. **Answering from ONE sentence (literal recall): "boots" → snow, ignoring the umbrella.** Response: the two clue rows light up one after the other (`ART.clueWash` behind each, `ART.clueBar` at its left edge, `ANIM.clueOn`), and a key-word chip (`ART.keyChip`) rises beside each clue row naming the clue ("boots", then "umbrella"). The child sees there are TWO clues, then taps again.
  2. **Answering from the most vivid or the last thing read (salience): "washed his hands" → a bath.** Response: the sentence that pulled the child is the NON-clue sentence; it is veiled (`ART.dimVeil` at alpha 0.55, `ANIM.veil`) while the two clue rows light — the distracting sentence is shown to be the one that does not count.
  3. **Not integrating: reads both clues but does not join them (F-129 "poor comprehenders don't integrate across sentences").** Response: on the second wrong tap a join line (`ART.joinLine`) draws from the first key chip to the second (`ANIM.join`) and the feedback line shows `S("twoClues")` ("Put the two clues together."); the magnifier (`ART.lens`) slides from chip to chip.
  4. **Picture-guessing without reading (three-cueing, F-125).** Response: all three tile pictures are equally plausible for the FIRST sentence alone (each item's distractors are built that way — see Content classes), so the text is the only route; no special cue beyond the standard ones.

## How it plays
1. **Start screen**: title "Clue Inference", the raccoon detective (`ART.raccoon`) at (360, 200) with the magnifier (`ART.lens`) at (410, 230), Start, picker.
2. **Item 1 (L1: the rabbit's boots and umbrella)**: rail of 12 dots (§6) at y = 28; `t("question_x_of_y")` at (360, 48), 18 px `THEME.colour.inkSoft`. Zone A: the text card (`ART.textCard`, 550 × 186) centred at (325, 150); inside it three sentence rows (`ART.sentText`, 20 px `THEME.font.body`, left-aligned at x = 70, wrap width 520, max two lines) at y = 88, 144, 200: "The rabbit pulled on his boots." / "He picked up his umbrella." / "He opened the door." The raccoon sits at (660, 110) at 48 px. Zone B: the question (`ART.questionText`, 22 px, `THEME.colour.structure`) at (360, 282): "What is the weather like?"; three answer tiles (`ART.optionTile`, 190 × 96, `makeTile`) at y = 380, x = 150 / 360 / 570, each holding a picture at 40 px on its left third and a word (20 px `THEME.font.body` `THEME.colour.ink`, wrap width 110) on its right two-thirds: rain `ART.iconRain` / snow `ART.iconSnow` / sun `ART.iconSun`, in a shuffled order. Zone C: the feedback line (22 px `THEME.colour.inkSoft`) at (360, 500), empty.
3. **Answering**: the child reads and taps a tile.
   - **Correct (rain)**: `ANIM.pop`, `tone("correct")`, praise pop (rotation); the two clue rows light with `ART.clueWash` + `ART.clueBar` and their key chips ("boots", "umbrella") appear (`ANIM.clueOn`, 400 ms apart) — the reasoning is shown even when the child got it right (F-43: confirm with the structure, not a verdict); the raccoon `ANIM.nod`; rail dot fills; next item after 1200 ms (`ANIM.rise` clears the rows, the new text `ANIM.appear`s).
   - **Wrong — single-clue class (snow)**: `ANIM.nudge`, `tone("nudge")`, tile de-selects; the two clue rows light in turn with their key chips; the feedback line shows `t("look_carefully")`. Attempt 2.
   - **Wrong — salience class (sun)**: nudge + tone; the non-clue row is veiled (`ART.dimVeil`, `ANIM.veil`) and the two clue rows light with chips. Attempt 2.
   - **Second wrong tap (any class)**: the rows light again; `ART.joinLine` draws between the two chips (`ANIM.join`); `ART.lens` glides from chip 1 to chip 2 (`ANIM.glide`); the feedback line shows `S("twoClues")`; then the correct tile gains the show-me ring (`ART.showRing`, `ANIM.showMe`). Tapping it completes the item as solved-with-help (no praise pop).
4. **Items 2-12**: per Content/Rules. L1 texts put the two clues in sentences 1 and 2 with a neutral third sentence; L2 separates the clues (sentences 1 and 3) with a distracting middle sentence that names a wrong tile; L3 texts need a piece of everyday knowledge to bridge the clues (ice cream drips → it is hot; an owl at sunrise → bedtime).
5. **Finish**: `t("all_done")` (360, 110); the raccoon (360, 200) `ANIM.celebrate` with the lens beside it; the summary = the twelve answers as `ART.answerChip`s (44 × 44, each holding the answer picture at 28 px) in two rows of six (y = 340 and 400; x = 185 + i × 70), each with a filled `ART.dotFull` at its top-left for a first-try item and a hollow `ART.dotEmpty` for a helped one — a record of what the child worked out, not a score; `play_again` (250, 510), `menu` (470, 510); `tone("finish")`.

Session ≈ 6-7 minutes (12 items, ~30 s each).

## Art registry
```js
const ART = {
  raccoon:      { kind: "emoji", value: "🦝", size: 64 },                       // the detective (Unicode 11)
  lens:         { kind: "emoji", value: "🔍", size: 40 },                       // magnifier that slides between the clue chips
  textCard:     { kind: "shape", shape: "roundRect", w: 550, h: 186, fill: "surface", stroke: "line", strokeWidth: 2, radius: 16 },
  sentText:     { kind: "text",  value: "", size: 20, font: "body", color: "ink" },
  clueWash:     { kind: "shape", shape: "roundRect", w: 530, h: 50, fill: "structureSoft", radius: 8 },     // behind a clue row, alpha 0 → 1
  clueBar:      { kind: "shape", shape: "rect", w: 6, h: 40, fill: "accent" },                               // left edge of a clue row
  dimVeil:      { kind: "shape", shape: "roundRect", w: 530, h: 50, fill: "bg", radius: 8 },                // over the non-clue row at alpha 0.55
  keyChip:      { kind: "shape", shape: "roundRect", w: 100, h: 34, fill: "accent", radius: 8 },            // key word 16 px display inkOnAccent, wrap 92
  joinLine:     { kind: "shape", shape: "line", w: 4, stroke: "accent", strokeWidth: 4 },                    // endpoints = the two chips' centres
  questionText: { kind: "text",  value: "", size: 22, font: "display", color: "structure" },
  optionTile:   { kind: "shape", shape: "roundRect", w: 190, h: 96, fill: "surface", stroke: "line", strokeWidth: 2, radius: 14 },
  iconRain:     { kind: "emoji", value: "🌧", size: 40 },   // rain
  iconSun:      { kind: "emoji", value: "☀", size: 40 },    // sun / hot
  iconSnow:     { kind: "emoji", value: "❄", size: 40 },    // snow / cold
  iconPlate:    { kind: "emoji", value: "🍽", size: 40 },   // hungry / lunchtime
  iconBed:      { kind: "emoji", value: "🛏", size: 40 },   // sleepy / bedtime / in bed / go to sleep
  iconScarf:    { kind: "emoji", value: "🧣", size: 40 },   // cold (feeling)
  iconTree:     { kind: "emoji", value: "🌳", size: 40 },   // under the tree / up a tree
  iconHouse:    { kind: "emoji", value: "🏠", size: 40 },   // in the house
  iconFish:     { kind: "emoji", value: "🐟", size: 40 },   // in the pond
  iconMoon:     { kind: "emoji", value: "🌙", size: 40 },   // night
  iconSunrise:  { kind: "emoji", value: "🌅", size: 40 },   // morning
  iconSwim:     { kind: "emoji", value: "🏊", size: 40 },   // swimming
  iconCart:     { kind: "emoji", value: "🛒", size: 40 },   // the shop
  iconBooks:    { kind: "emoji", value: "📚", size: 40 },   // the library
  iconCake:     { kind: "emoji", value: "🎂", size: 40 },   // a party
  iconBath:     { kind: "emoji", value: "🛁", size: 40 },   // a bath
  iconWave:     { kind: "emoji", value: "🌊", size: 40 },   // on the water
  iconFishing:  { kind: "emoji", value: "🎣", size: 40 },   // fishing
  iconPaint:    { kind: "emoji", value: "🎨", size: 40 },   // painting
  iconSandwich: { kind: "emoji", value: "🥪", size: 40 },   // eating lunch / a sandwich (Unicode 10)
  iconGift:     { kind: "emoji", value: "🎁", size: 40 },   // a present
  iconBin:      { kind: "emoji", value: "🗑", size: 40 },   // rubbish
  iconBread:    { kind: "emoji", value: "🍞", size: 40 },   // bread
  iconSnowman:  { kind: "emoji", value: "⛄", size: 40 },   // a snowman
  iconBoat:     { kind: "emoji", value: "⛵", size: 40 },   // a boat
  iconDog:      { kind: "emoji", value: "🐕", size: 40 },   // the dog
  iconCat:      { kind: "emoji", value: "🐈", size: 40 },   // the cat
  iconBird:     { kind: "emoji", value: "🐦", size: 40 },   // a bird
  iconTent:     { kind: "emoji", value: "⛺", size: 40 },   // camping
  iconTooth:    { kind: "emoji", value: "🦷", size: 40 },   // the dentist (Unicode 11)
  iconSchool:   { kind: "emoji", value: "🏫", size: 40 },   // school
  iconBall:     { kind: "emoji", value: "⚽", size: 40 },   // play football
  showRing:     { kind: "shape", shape: "roundRect", w: 202, h: 108, stroke: "structure", strokeWidth: 4, radius: 18 },
  answerChip:   { kind: "shape", shape: "roundRect", w: 44, h: 44, fill: "structureSoft", stroke: "structure", strokeWidth: 1, radius: 8 },
  dotEmpty:     { kind: "shape", shape: "circle", r: 8, stroke: "line", strokeWidth: 2 },
  dotFull:      { kind: "shape", shape: "circle", r: 8, fill: "structure" }
};
```
Every picture is an object or scene whose English name is unambiguous; the intended answer word is the comment beside each entry. Tiles always carry the picture AND the word, so no meaning rests on the picture alone.

## Animation registry
```js
const ANIM = {
  pop:       { scale: 1.08, duration: 140, ease: "Back.Out", yoyo: true, trigger: "correct tile" },
  nudge:     { x: "+=10", duration: 80, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "wrong tile" },
  clueOn:    { alpha: 1, duration: 300, ease: "Sine.Out", trigger: "clueWash + clueBar behind a clue row, then its keyChip (from alpha 0); second clue 400 ms after the first" },
  veil:      { alpha: 0.55, duration: 300, ease: "Sine.Out", trigger: "dimVeil over the non-clue row (from alpha 0); salience-class wrong tap" },
  join:      { alpha: 1, scaleX: 1, duration: 320, ease: "Sine.Out", trigger: "joinLine from chip 1 to chip 2 (from alpha 0, scaleX 0, anchored at chip 1); second wrong tap" },
  glide:     { duration: 400, ease: "Sine.InOut", trigger: "lens from chip 1 to chip 2 (x,y set at call)" },
  nod:       { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "raccoon on a correct tap" },
  rise:      { y: "-=30", alpha: 0, duration: 300, ease: "Sine.In", trigger: "washes, chips, veil, join line and lens clearing before the next item" },
  appear:    { alpha: 1, scale: 1, duration: 200, ease: "Back.Out", trigger: "new text card, question and tiles (from alpha 0, scale 0.6)" },
  showMe:    { alpha: 1, duration: 500, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "showRing around the correct tile (from alpha 0.2)" },
  celebrate: { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "finish raccoon" }
};
```

## Screen layout
```
y   0 ┌──────────────────────────────────────────────────────────────┐
      │ [lang]     ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○  rail y=28; "3 of 12" y=48 │  zone T
 56   ├──────────────────────────────────────────────────────────────┤
      │ ┌────────────────────────────────────────────┐  [chip]        │
      │ │▌The rabbit pulled on his boots.      y=88  │  (655,88)  🞄   │
      │ │▌He picked up his umbrella.           y=144 │  (655,144) raccoon│  zone A
      │ │  He opened the door.                 y=200 │  (660,110)     │
      │ └──────── textCard (325,150) 550×186 ───────┘                 │
260   ├──────────────────────────────────────────────────────────────┤
      │            What is the weather like?   (360,282)              │
      │   [ rain ]        [ snow ]        [ sun ]   tiles y=380       │  zone B
      │   x=150           x=360           x=570    (190×96)           │
480   ├──────────────────────────────────────────────────────────────┤
      │              feedback line (360,500)                          │  zone C
560   └──────────────────────────────────────────────────────────────┘
```
(The `▌` marks in the diagram stand for `ART.clueBar`; the diagram's small dot marks the chip column — neither is drawn as text.) Fixed layout, FIT scaling. Key chips sit at x = 655 on the same y as their clue row; the join line runs chip-centre to chip-centre.

## Visual specification
- Background `THEME.colour.bg`; rail per §6: 12 × `ART.dotEmpty` at y = 28 (x = 239 + i × 22) → `ART.dotFull`; `t("question_x_of_y")` at (360, 48).
- `ART.textCard` centred (325, 150). Sentence rows: `ART.sentText` left-aligned (origin 0, 0.5) at x = 70, y = 88 / 144 / 200, `wordWrap: { width: 520 }`, max two lines (a two-line row keeps its centre y; the second line falls 22 px below the first — the rows are 56 px apart so two-line rows never touch).
- Clue cue: `ART.clueWash` centred at (325, rowY) behind the row (alpha 0 at rest); `ART.clueBar` at (58, rowY); `ART.keyChip` centred (655, rowY) with the key word at 16 px `THEME.font.display` `THEME.colour.inkOnAccent`, `wordWrap` 92, one line (fit-to-width shrink to 12 px minimum); `ART.dimVeil` over the non-clue row; `ART.joinLine` between chips; `ART.lens` starts on chip 1.
- `ART.raccoon` at (660, 110) at 48 px (registry size 64 on the start/finish screens; the play screen passes `size: 48`).
- `ART.questionText` centred (360, 282), `wordWrap: { width: 640 }`, max two lines.
- Tiles: `makeTile` 190 × 96 with `ART.optionTile` tokens; the picture (the item's icon entry, e.g. `ART.iconRain`) drawn at tile-relative (−60, 0) at 40 px; the word at (+25, 0) 20 px `THEME.font.body` `THEME.colour.ink`, `wordWrap` 110, max two lines, origin (0.5, 0.5). Tile spacing: x = 150 / 360 / 570 (gap 20 ≥ 12). Tap floor 96 ≥ 56.
- `ART.showRing` behind the correct tile. Feedback line at (360, 500), 22 px `THEME.font.body` `THEME.colour.inkSoft`.
- Keyboard: Tab order = the three tiles left to right; Enter taps. The text card is not focusable.

## Content
Language-bound: `LOCALE_DATA[lang].items` (texts, questions, key words, option words). `en` is authored in full here. **Other locales: a native list is required — en pilot.** Until a native list exists, `LOCALE_DATA[lang]` falls back to `LOCALE_DATA.en` for the ITEMS only (chrome strings stay localised); the build must not machine-translate.

Notation per item: s1 / s2 / s3 = the three sentences; Q = the question; then the three options as `word — ART key — class`, where class ∈ {correct, single-clue (fits one clue sentence alone), salience (named or suggested by the non-clue sentence), unrelated}; clues = which two sentences carry the answer; keys = the two key-word chips (one per clue sentence, in clue order).

- **L1 — clues in s1 and s2, s3 neutral**
  1. s1 "The rabbit pulled on his boots." s2 "He picked up his umbrella." s3 "He opened the door." Q "What is the weather like?" — rain — `ART.iconRain` — correct · snow — `ART.iconSnow` — single-clue · sun — `ART.iconSun` — salience. clues s1+s2; keys "boots", "umbrella".
  2. s1 "The cat sniffed her empty bowl." s2 "Her tummy rumbled." s3 "She jumped onto the sofa." Q "How does the cat feel?" — hungry — `ART.iconPlate` — correct · sleepy — `ART.iconBed` — salience · cold — `ART.iconScarf` — unrelated. clues s1+s2; keys "empty bowl", "rumbled".
  3. s1 "The dog carried his bone into the garden." s2 "He dug a hole under the big tree." s3 "Then he ran back for his dinner." Q "Where is the bone now?" — under the tree — `ART.iconTree` — correct · in the house — `ART.iconHouse` — salience · in the pond — `ART.iconFish` — unrelated. clues s1+s2; keys "bone", "under the tree".
  4. s1 "The hen yawned and looked out of the window." s2 "The sky was black and full of stars." s3 "She fluffed up her feathers." Q "What time is it?" — night — `ART.iconMoon` — correct · morning — `ART.iconSunrise` — single-clue · lunchtime — `ART.iconPlate` — unrelated. clues s1+s2; keys "yawned", "stars".
  5. s1 "The frog packed a towel in his bag." s2 "He put on his goggles." s3 "He hopped down the path." Q "Where is the frog going?" — swimming — `ART.iconSwim` — correct · the shop — `ART.iconCart` — salience · the library — `ART.iconBooks` — unrelated. clues s1+s2; keys "towel", "goggles".
- **L2 — clues in s1 and s3, s2 distracts**
  6. s1 "The pig blew up ten balloons." s2 "He washed his hands." s3 "Then he put on a paper hat." Q "What is the pig getting ready for?" — a party — `ART.iconCake` — correct · a bath — `ART.iconBath` — salience · bedtime — `ART.iconBed` — unrelated. clues s1+s3; keys "balloons", "paper hat".
  7. s1 "The duck's feathers were dripping." s2 "She shook her head at the tall tree." s3 "Her little boat was tied to the bank." Q "Where has the duck been?" — on the water — `ART.iconWave` — correct · up a tree — `ART.iconTree` — salience · in bed — `ART.iconBed` — unrelated. clues s1+s3; keys "dripping", "boat".
  8. s1 "The fox held a long net." s2 "He ate a sandwich on the rock." s3 "He came home with three fish." Q "What was the fox doing?" — fishing — `ART.iconFishing` — correct · eating lunch — `ART.iconSandwich` — salience · painting — `ART.iconPaint` — unrelated. clues s1+s3; keys "net", "three fish".
  9. s1 "The sheep wrapped a box in shiny paper." s2 "She put her lunch on the table." s3 "She wrote 'For Cow' on a little card." Q "What is in the box?" — a present — `ART.iconGift` — correct · a sandwich — `ART.iconSandwich` — salience · rubbish — `ART.iconBin` — unrelated. clues s1+s3; keys "shiny paper", "card".
  10. s1 "The bear's paws were white with flour." s2 "He looked out at the snow." s3 "A warm smell came from the oven." Q "What has the bear made?" — bread — `ART.iconBread` — correct · a snowman — `ART.iconSnowman` — salience · a boat — `ART.iconBoat` — unrelated. clues s1+s3; keys "flour", "oven".
- **L3 — a knowledge bridge is needed; the non-clue sentence names a wrong tile**
  11. s1 "The rabbit's ice cream dripped down her paw." s2 "Her ball rolled under the bench." s3 "She fanned her face with a big leaf." Q "What is the weather like?" — hot — `ART.iconSun` — correct · rainy — `ART.iconRain` — single-clue · snowy — `ART.iconSnow` — unrelated. clues s1+s3; keys "dripped", "fanned".
  12. s1 "The owl closed her book and yawned." s2 "Her lamp was still on." s3 "Outside, the sun was coming up." Q "What will the owl do next?" — go to sleep — `ART.iconBed` — correct · go to school — `ART.iconSchool` — salience · play football — `ART.iconBall` — unrelated. clues s1+s3; keys "yawned", "sun coming up".
  13. s1 "The cat's tail drooped." s2 "One bowl was empty and one bowl was full." s3 "The dog was licking his lips." Q "Who ate the cat's food?" — the dog — `ART.iconDog` — correct · the cat — `ART.iconCat` — salience · a bird — `ART.iconBird` — unrelated. clues s2+s3; keys "empty", "licking his lips".
  14. s1 "The mouse zipped up her coat." s2 "Her breath made little clouds." s3 "She hurried past the pond." Q "How does the air feel?" — cold — `ART.iconSnow` — correct · wet — `ART.iconRain` — salience · hot — `ART.iconSun` — unrelated. clues s1+s2; keys "coat", "little clouds".
  15. s1 "The hedgehog packed a torch." s2 "His mum gave him a big hug." s3 "He rolled up his sleeping bag and got on the bus." Q "Where is the hedgehog going?" — camping — `ART.iconTent` — correct · to school — `ART.iconSchool` — salience · to the dentist — `ART.iconTooth` — unrelated. clues s1+s3; keys "torch", "sleeping bag".

Play list: 12 of the 15 per Rules (shuffle within level, levels in order; the sequence draws a new item from the current level each time, so a session may skip some items of a level); no item repeats in a session; the correct tile's slot never repeats twice running (§13). Characters are emoji animals in the text (no people's names — §14); the same animal never leads two consecutive items.

## Rules
- Item count: 12.
- Difficulty progression: 2 consecutive first-try correct → next level (cap L3).
- Adaptation: 2 wrong taps on one item, or wrong first-try on 2 consecutive items → next item one level down (floor L1).
- What happens on a correct answer: `ANIM.pop`, `tone("correct")`, praise rotation ["well_done", "great_job", "excellent", "you_did_it", "keep_going"] (first-try items only), the two clue rows light with their key chips (the reasoning shown), raccoon `ANIM.nod`, rail dot, next item after 1200 ms.
- What happens on a wrong answer (each begins with `ANIM.nudge` + `tone("nudge")` and the tile de-selecting):
  - Single-clue class (answered from one sentence): both clue rows light in turn with key chips; `t("look_carefully")` on the feedback line.
  - Salience class (answered from the distracting sentence): the non-clue row is veiled, then both clue rows light with chips; `t("look_carefully")`.
  - Unrelated class: both clue rows light with chips (no veil); `t("look_carefully")`.
  - Second wrong tap (not integrating): rows light again, `ART.joinLine` draws chip to chip, the lens glides along it, `S("twoClues")` on the feedback line, then the show-me ring on the correct tile.
- Retry behaviour: attempt 1 → attempt 2 with the two clues lit → attempt 3 with the join line and the show-me ring; solved-with-help. No attempt 4. Tiles stay enabled throughout (no lock-out); only the correct tile completes the item.
- Finish condition: 12 items. No losing state, no clock.

## Strings
- `GameCore.t()` keys: `t("start")`, `t("question_x_of_y")`, `t("look_carefully")`, `t("all_done")`, `t("play_again")`, `t("menu")`, `t("well_done")`, `t("great_job")`, `t("excellent")`, `t("you_did_it")`, `t("keep_going")`.
- Game-specific (`STRINGS.en`): `title` = "Clue Inference"; `twoClues` = "Put the two clues together.". The 15 texts, 15 questions, 30 key words and 45 option words are `LOCALE_DATA.en.items` (listed in Content), not STRINGS — they are content, translated by native re-authoring, never by the translation step.

## Sound
`tone("tap")` when a clue row lights; `tone("correct")` on a correct tap; `tone("nudge")` on a wrong tap; `tone("tap", 3)` when the join line draws; `tone("finish")` once. Silent under `?sound=off`. Nothing is read aloud (no audio files); the text is read by the child.

## Testing checklist
- [ ] Works in all 11 languages (Question x of y, Look carefully, All done, Play again, Menu and praise change with the picker; with `?lang=de` the texts still show the English pilot set until a native German list is added, and no raw key names appear).
- [ ] Works at narrow width (400-px iframe: the text card, three tiles and the key-chip column are visible and no chip is cut off at the right edge).
- [ ] Keyboard operable (Tab walks the three tiles; Enter taps; the text card is not a tab stop).
- [ ] Never auto-starts.
- [ ] No losing state (wrong taps never end the session; the show-me ring always completes the item).
- [ ] Every text has exactly three sentences; a long sentence wraps to a second line inside its row without overlapping the next row.
- [ ] Tapping "snow" for the rabbit item lights the "boots" row and then the "umbrella" row, each with a coral chip naming the clue.
- [ ] Tapping "a bath" for the pig item veils "He washed his hands." while the balloon and paper-hat rows light.
- [ ] A second wrong tap draws a line between the two chips, slides the magnifier along it and shows "Put the two clues together."
- [ ] A correct first tap also lights the two clue rows before the next item.
- [ ] Two first-try corrects in a row bring an item whose clues are in the first and third sentences; two wrong taps bring the clues back to adjacent sentences.
- [ ] The correct tile is never in the same slot twice in a row.
- [ ] The finish screen shows twelve small answer pictures with filled or hollow dots and no score.
- [ ] With `?sound=off` nothing is audible.
