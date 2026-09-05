# 198 — Best Title

## Identity
- Slug: `title-picker`
- Subject / topic: Literacy / main idea — choosing the title that fits ALL of a short three-sentence text, not just one detail in it
- Age band: `8-9`
- Interaction pattern: `P1` — tap one of N (three title tiles; the text's sentences are the enacted hint)
- Estimated build size: ~450 lines

Shared contract: `catalogue/BUILD-CONVENTIONS.md`. Pattern contract: `catalogue/PATTERNS.md` P1. Locale note: the texts and titles are language-bound (F-129; A-15) and are stored in `LOCALE_DATA`; English is authored in full, the other ten locales are declared as needing a native set (en pilot). Nothing is spoken. **Text budget (F-42, 8-9 ≤ 2 short sentences):** the catalogue's objective is a THREE-sentence text, so each sentence is ≤ 6 words and the whole text ≤ 16 words — the same reading load as two short sentences; there is no instruction text on the play screen. Every text is picture-supported by a scene picture of its topic, and every inference item carries ≥ 2 visible clues (F-129).

## Learning
- Objective: Reads a three-sentence text and taps the title that fits the whole text, rejecting a title that names only one detail and a title that is about something else.
- Prerequisites: Reads two-line texts and answers who / what / where questions about them (game 080); infers a character's feeling from a picture and a line (game 155).
- Curriculum links: F-22 (reading short narrative and informational texts with comprehension by 8 in all twelve systems), F-129 (literal recall fine, inference poor at 6; poor comprehenders do not integrate across sentences — the main idea IS integration across sentences), F-31 row "Read short text; retell/sequence; simple inference" — conservative 8 → 8-9 (US RI.2.2 / RL.3.2 "identify the main topic … determine the central message"; England Y3 "identifying main ideas"; Germany Klasse 3 "Hauptgedanken eines Textes erfassen, Überschrift finden"; France CE2 "dégager l'idée principale, choisir un titre"; Netherlands groep 5 "hoofdgedachte"; Spain 2º ciclo "idea principal"; Italy classe terza "individuare il titolo adatto"; Brazil EF35LP03 "identificar a ideia central"; Sweden åk 1-3 "läsförståelse: budskap"; Finland 3. luokka "tekstin pääajatus"). Demand: F-1 / F-3 (reading comprehension in 5 of 15 sources; SplashLearn Comprehension 44 games).
- Common misconceptions (F-129, F-125), each with this game's response:
  1. **Picks the title that names one salient detail (the last sentence, the most striking word) — the DETAIL title.** Response: after a wrong tap, ONLY the sentence that contains that detail glows (`ART.lineGlow`, `ANIM.glow`) and the other two stay plain for 1200 ms — "this title fits one sentence"; after a correct tap ALL THREE sentences glow in turn (300 ms apart) — "this title fits every sentence". The contrast is the lesson.
  2. **Picks by the picture or by a familiar word rather than by reading (F-125 three-cueing) — the OFF-TOPIC title.** Response: the off-topic title shares a word with the scene picture's neighbourhood but nothing in the text supports it; on that tap the picture `ANIM.pulse`s and the topic word in each sentence gets `ART.wordMark` for 1200 ms — the text names its topic three times and the title names something else.
  3. **Does not integrate across sentences — thinks each sentence has its own title.** Response: L3 texts never state the topic word; each sentence gives one clue (long trunk / grey / big ears → "The Elephant") and the correct title can be chosen only from all three; a wrong tap glows the three clue words one after another (`ART.wordMark`, 300 ms apart) so the child reads them as one set.
  4. **Position habit / brute force.** Response: the correct tile's slot shuffles and never repeats twice running (§13); after a wrong tap the tiles re-shuffle; an item solved after a wrong tap is never first-try; the third wrong tap gets the show-me ring (F-65).
  5. **Reads only the first sentence (recency's twin, primacy).** Response: half the DETAIL titles name a detail from sentence 1, so "first sentence = title" fails as a rule, and the single-sentence glow shows it landing on sentence 1 alone.

## How it plays
1. **Start screen**: title "Best Title", the elephant (`ART.elephant`) at (360, 200), Start, picker.
2. **Item 1 (L1: text "Bees live in a hive. / Bees make sweet honey. / Bees visit many flowers." — titles "All About Bees" / "Sweet Honey" / "The Big Hive")**: rail of 12 dots (§6) at y = 28; `t("question_x_of_y")` at (360, 48). Zone A: the text card (`ART.textCard`, 620 × 140) centred at (360, 150): the scene picture (`ART.picBee`, 56 px) at (110, 150) on the left and three sentence lines at 22 px `THEME.font.body` `THEME.colour.ink`, left-aligned from x = 160 at y = 116 / 150 / 184. Under the card the title slot (`ART.titleSlot`, 360 × 40, dashed) at (360, 240) — the empty title line above the text, where the chosen title will land. The elephant stands at (640, 60) at 44 px. Zone B: three title tiles (`ART.titleTile`, 200 × 90, title 22 px, two lines allowed) at y = 380, x = 140 / 360 / 580, shuffled. Caption: none (the empty title slot is the prompt).
3. **Answering**: the child taps a tile.
   - **Correct**: `ANIM.pop`, `tone("correct")`, praise pop; the title glides (`ANIM.glide`) into the title slot (the slot turns solid); the three sentences glow one after another (`ART.lineGlow`, `ANIM.glow`, 300 ms apart); the elephant `ANIM.trumpet`; rail dot fills; next item after 1100 ms (`ANIM.appear`).
   - **Wrong — the DETAIL title**: `ANIM.nudge`, `tone("nudge")`, the tile de-selects; only the sentence holding that detail glows for 1200 ms (its detail word gets `ART.wordMark`); tiles re-shuffle (`ANIM.glide`). Attempt 2.
   - **Wrong — the OFF-TOPIC title**: nudge + tone; the scene picture `ANIM.pulse`s and the topic word in each sentence gets `ART.wordMark` for 1200 ms (at L3, the three clue words instead, 300 ms apart); tiles re-shuffle. Attempt 2.
   - **Second wrong tap**: the cue for that tile again; attempt 3 with the show-me ring (`ART.showRing`, `ANIM.showMe`) on the correct tile; tapping it completes the item as solved-with-help.
4. **Items 2-12**: per Content/Rules. L1 the topic word appears in every sentence; L2 the topic word appears once and is carried by pronouns or synonyms ("The fox … It … The animal"); L3 the topic is never named — three clues, inference.
5. **Re-queue** (F-41): an item wrong first-try re-enters after 2 intervening items with re-shuffled tiles; the count stays 12.
6. **Finish**: `t("all_done")` (360, 110); the elephant (360, 200) `ANIM.celebrate`; the summary = the twelve chosen titles as chips (`ART.titleChip`, 300 × 26: the scene picture 18 px on the left, the title 15 px on the right) in two columns of six from y = 290 (x = 200 / 520, 30 px pitch), with `ART.dotFull` at the chip's left for first-try items and `ART.dotEmpty` for helped ones — the titles found, not a score; `play_again` (250, 510), `menu` (470, 510); `tone("finish")`.

Session ≈ 6-7 minutes.

## Art registry
```js
const ART = {
  elephant:   { kind: "emoji", value: "🐘", size: 80 },                    // mascot
  textCard:   { kind: "shape", shape: "roundRect", w: 620, h: 140, fill: "surface", stroke: "structure", strokeWidth: 3, radius: 16 },
  lineGlow:   { kind: "shape", shape: "roundRect", w: 460, h: 30, fill: "structureSoft", radius: 8 },   // behind one sentence line, alpha 0 → 1 → 0
  wordMark:   { kind: "shape", shape: "rect", w: 40, h: 4, fill: "accent" },                             // width = the word's width at runtime
  titleSlot:  { kind: "shape", shape: "roundRect", w: 360, h: 40, fill: "surface2", stroke: "line", strokeWidth: 2, radius: 10 },   // dashed (lineDash [8,6]); solid structure stroke once filled; title 22 px display structure
  titleTile:  { kind: "shape", shape: "roundRect", w: 200, h: 90, fill: "surface", stroke: "line", strokeWidth: 2, radius: 14 },   // title 22 px display ink, wordWrap 180, max 2 lines
  showRing:   { kind: "shape", shape: "roundRect", w: 212, h: 102, stroke: "structure", strokeWidth: 4, radius: 18 },
  titleChip:  { kind: "shape", shape: "roundRect", w: 300, h: 26, fill: "structureSoft", stroke: "structure", strokeWidth: 1, radius: 8 },
  dotEmpty:   { kind: "shape", shape: "circle", r: 8, stroke: "line", strokeWidth: 2 },
  dotFull:    { kind: "shape", shape: "circle", r: 8, fill: "structure" },
  // scene pictures (the topic of the text; never a title)
  picBee:     { kind: "emoji", value: "🐝", size: 56 },   // bees
  picRain:    { kind: "emoji", value: "🌧️", size: 56 },   // rain
  picSnail:   { kind: "emoji", value: "🐌", size: 56 },   // snail
  picTrain:   { kind: "emoji", value: "🚂", size: 56 },   // train
  picSun:     { kind: "emoji", value: "☀️", size: 56 },   // sun
  picApple:   { kind: "emoji", value: "🍎", size: 56 },   // apple tree / apples
  picFox:     { kind: "emoji", value: "🦊", size: 56 },   // fox
  picMoon:    { kind: "emoji", value: "🌙", size: 56 },   // night / moon
  picBread:   { kind: "emoji", value: "🍞", size: 56 },   // bread
  picPenguin: { kind: "emoji", value: "🐧", size: 56 },   // penguin
  picBoat:    { kind: "emoji", value: "⛵", size: 56 },   // boat
  picOwl:     { kind: "emoji", value: "🦉", size: 56 },   // owl
  picGrass:   { kind: "emoji", value: "🌿", size: 56 },   // grass / savanna (L3 elephant text — never the elephant itself)
  picSnow:    { kind: "emoji", value: "❄️", size: 56 },   // snow (L3 snowman text)
  picPond:    { kind: "emoji", value: "🌊", size: 56 },   // water (L3 frog / duck texts)
  picGarden:  { kind: "emoji", value: "🌻", size: 56 },   // garden (L3 rabbit / butterfly texts)
  picSky:     { kind: "emoji", value: "☁️", size: 56 },   // sky (L3 rainbow / bird texts)
  picSea:     { kind: "emoji", value: "🐚", size: 56 }    // seaside (L3 crab text)
};
```
All emoji are Unicode 9 or older; no fallbacks needed. At L3 the scene picture shows the SETTING, never the answer (the elephant text shows grass, not an elephant), so the picture supports reading without giving the title away.

## Animation registry
```js
const ANIM = {
  pop:       { scale: 1.12, duration: 140, ease: "Back.Out", yoyo: true, trigger: "correct tile" },
  nudge:     { x: "+=10", duration: 80, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "wrong tile" },
  glide:     { duration: 260, ease: "Sine.InOut", trigger: "title into the slot; tiles re-shuffling after a wrong tap (x,y at call)" },
  glow:      { alpha: 1, duration: 250, ease: "Sine.Out", yoyo: true, hold: 700, trigger: "lineGlow behind a sentence (from alpha 0); all three 300 ms apart on correct, one alone on a detail miss" },
  markIn:    { alpha: 1, duration: 200, ease: "Sine.Out", yoyo: true, hold: 1200, trigger: "wordMark under topic / detail / clue words (from alpha 0)" },
  pulse:     { scale: 1.15, duration: 300, ease: "Sine.InOut", yoyo: true, repeat: 2, trigger: "scene picture on an off-topic miss" },
  trumpet:   { angle: 8, duration: 110, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "elephant on correct" },
  appear:    { alpha: 1, scale: 1, duration: 200, ease: "Back.Out", trigger: "new text, slot and tiles (from alpha 0, scale 0.6)" },
  showMe:    { alpha: 1, duration: 500, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "ring on the correct tile (from alpha 0.2)" },
  celebrate: { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "finish elephant" }
};
```
Implementation note: each sentence is drawn as one text object per WORD (22 px, 7 px word gaps, left-aligned from x = 160) so `ART.wordMark` can sit under one word; `LOCALE_DATA` names the word indices per sentence.

## Screen layout
```
y   0 ┌──────────────────────────────────────────────────────────────┐
      │ [lang]       ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○  rail y=28; "3 of 12" y=48 │  zone T
 56   ├──────────────────────────────────────────────────────────────┤
      │  ┌──────────────────────────────────────────────┐ elephant   │
      │  │ [scene]  Bees live in a hive.          y=116 │ (640,60)   │  zone A
      │  │ (110,150) Bees make sweet honey.       y=150 │            │
      │  │          Bees visit many flowers.      y=184 │            │
      │  └──────────────────────────────────────────────┘ card (360,150) 620×140
      │                 [ _ _ _ title slot _ _ _ ] (360,240) 360×40   │
260   ├──────────────────────────────────────────────────────────────┤
      │   ┌──────────┐      ┌──────────┐      ┌──────────┐  y=380     │  zone B
      │   │ All About│      │  Sweet   │      │ The Big  │            │
      │   │   Bees   │      │  Honey   │      │   Hive   │  (200×90)  │
      │   └──────────┘      └──────────┘      └──────────┘ x=140/360/580
480   ├──────────────────────────────────────────────────────────────┤
      │                                                              │  zone C
560   └──────────────────────────────────────────────────────────────┘
```
Fixed layout, FIT scaling.

## Visual specification
- Background `THEME.colour.bg`; rail per §6: 12 × `ART.dotEmpty` (x = 239 + i × 22) → `ART.dotFull`; `t("question_x_of_y")` at (360, 48).
- `ART.textCard` at (360, 150); the item's scene picture at (110, 150) at 56 px; sentences at y = 116 / 150 / 184 from x = 160, 22 px `THEME.font.body` `THEME.colour.ink`, `wordWrap` 480 (6 English words ≈ 200 px; a 1.6× locale fits; a sentence that still wraps drops to 18 px — never two lines).
- `ART.lineGlow` centred behind a line at (390, y) at alpha 0; `ART.wordMark` 4 px under a word.
- `ART.titleSlot` at (360, 240); once filled it shows the title at 22 px `THEME.font.display` `THEME.colour.structure`.
- Tiles: `makeTile` 200 × 90 with `ART.titleTile` tokens; the title at 22 px `THEME.font.display` `THEME.colour.ink`, `wordWrap` 180, at most two lines (fit-to-width shrink for a longer locale title). `ART.showRing` behind the correct tile. `ART.elephant` at (640, 60) at 44 px.
- Tap floors: tiles 200 × 90 (≥ 56); gaps 20. During a cue (≤ 1.8 s) tiles are `setEnabled(false)`.
- Keyboard: Tab across the three tiles; Enter taps.

## Content
Texts are language-bound. `LOCALE_DATA[lang]` = `{ items: { L1: [...], L2: [...], L3: [...] } }`; an item = `{ scene: <ART key>, lines: ["…", "…", "…"], best: "All About Bees", detail: { title: "Sweet Honey", line: 1, wordIndex: 2 }, offTopic: "The Big Hive", topicWords: [[0], [0], [0]] }`. `detail.line` is the one sentence the detail title fits (0-2) and `detail.wordIndex` the detail word in it; `topicWords` lists, per sentence, the word index of the topic word (L1-L2) or of the clue word (L3). Every sentence ≤ 6 words; the whole text ≤ 16 words. The English set is complete. **Other locales: a native text set is required — en pilot** (`LOCALE_DATA[lang] = "en"` until then). Author's rules: keep ≤ 6 words per line; the detail title must name a word that appears in exactly one line; the off-topic title must be plausible from the picture's setting but unsupported by the text; at L3 never name the topic.

**en** — scene; lines 1 / 2 / 3; **best** [detail (line n)] [off-topic]:
- **L1** (topic word in every line):
  1. `ART.picBee`; Bees live in a hive. / Bees make sweet honey. / Bees visit many flowers.; **All About Bees** [Sweet Honey (line 2)] [The Big Hive]
  2. `ART.picRain`; Rain falls from clouds. / Rain fills the rivers. / Rain helps plants grow.; **Why Rain Matters** [Growing Plants (line 3)] [A Sunny Day]
  3. `ART.picSnail`; A snail moves slowly. / A snail has a shell. / A snail likes wet grass.; **The Snail** [The Shell (line 2)] [Fast Runners]
  4. `ART.picTrain`; The train is long. / The train carries people. / The train stops at towns.; **The Train** [The Towns (line 3)] [The Aeroplane]
  5. `ART.picSun`; The sun gives light. / The sun gives warmth. / The sun rises each morning.; **The Sun** [Every Morning (line 3)] [The Cold Moon]
  6. `ART.picApple`; Apples grow on trees. / Apples can be red. / Apples are crunchy.; **All About Apples** [Red Things (line 2)] [Tall Trees]
- **L2** (topic named once, then carried by pronouns or synonyms):
  7. `ART.picFox`; The fox has a red coat. / It hunts at night. / The animal sleeps by day.; **The Fox** [Night Time (line 2)] [The Red Coat]
  8. `ART.picBread`; Bread is made from flour. / It is baked in an oven. / We eat it every day.; **How Bread Is Made** [The Hot Oven (line 2)] [A Bowl of Rice]
  9. `ART.picPenguin`; Penguins cannot fly. / They swim very fast. / These birds love the cold.; **Penguins** [Fast Swimmers (line 2)] [Flying Birds]
  10. `ART.picBoat`; The boat floats on the lake. / It has a white sail. / The wind pushes it along.; **The Boat** [The White Sail (line 2)] [The Deep Lake]
  11. `ART.picOwl`; The owl hunts at night. / It has big round eyes. / This bird hoots softly.; **The Owl** [Big Eyes (line 2)] [Singing Birds]
  12. `ART.picMoon`; Night comes after sunset. / It is dark and quiet. / Stars shine in the sky.; **Night** [The Stars (line 3)] [A Bright Morning]
- **L3** (the topic is never named — three clues; the scene shows the setting):
  13. `ART.picGrass`; It has a long trunk. / It is big and grey. / Its ears are huge.; **The Elephant** [Big Ears (line 3)] [The Green Grass]
  14. `ART.picSnow`; He is made of snow. / He has a carrot nose. / He melts in the sun.; **The Snowman** [The Carrot Nose (line 2)] [Winter Games]
  15. `ART.picPond`; It hops on the bank. / It croaks at night. / It catches flies.; **The Frog** [Catching Flies (line 3)] [The Deep Water]
  16. `ART.picGarden`; It has long ears. / It hops very fast. / It loves carrots.; **The Rabbit** [Fast Hopping (line 2)] [The Flower Bed]
  17. `ART.picSky`; It comes after rain. / It has seven colours. / It arches over the sky.; **The Rainbow** [Seven Colours (line 2)] [Grey Clouds]
  18. `ART.picSea`; It has a hard shell. / It walks sideways. / It has two claws.; **The Crab** [Two Claws (line 3)] [The Sandy Beach]
  19. `ART.picGarden`; It has bright wings. / It was once a caterpillar. / It drinks from flowers.; **The Butterfly** [The Caterpillar (line 2)] [The Buzzing Bee]
  20. `ART.picPond`; It has a yellow beak. / It swims on the pond. / It says quack.; **The Duck** [The Yellow Beak (line 1)] [The Jumping Fish]

Play list: 12 items per Rules, shuffled within level, no item repeats except by re-queue; the correct tile's slot never repeats twice running.

## Rules
- Item count: 12 (re-queued repeats replace unplayed items).
- Difficulty progression: 2 consecutive first-try correct → next level (cap L3).
- Adaptation: a wrong tap, or wrong first-try on 2 consecutive items → next item one level down (floor L1); a single miss re-queues the item after 2 intervening items.
- What happens on a correct answer: `ANIM.pop`, `tone("correct")`, praise rotation ["well_done", "great_job", "excellent", "you_did_it", "keep_going"] on every first-try item, the title glides into the slot, the three sentences glow in turn, elephant `ANIM.trumpet`, rail dot, next item after 1100 ms.
- What happens on a wrong answer (each begins with `ANIM.nudge` + `tone("nudge")` and the tiles re-shuffle):
  - Detail title (one salient sentence): only that sentence glows and its detail word is underlined, 1200 ms.
  - Off-topic title (picture / familiar-word guess): the scene picture pulses and the topic word in each sentence is underlined (at L3 the three clue words, 300 ms apart), 1200 ms.
  - Second wrong tap: the cue again; then the show-me ring on the correct tile.
- Retry behaviour: attempt 1 → attempt 2 after the cue → attempt 3 with the show-me ring; solved-with-help. No attempt 4; the item re-queues later.
- Finish condition: 12 items. No losing state, no clock.

## Strings
- `GameCore.t()` keys: `t("start")`, `t("question_x_of_y")`, `t("all_done")`, `t("play_again")`, `t("menu")`, `t("well_done")`, `t("great_job")`, `t("excellent")`, `t("you_did_it")`, `t("keep_going")`.
- Game-specific: `title` = "Best Title". The texts and titles are content from `LOCALE_DATA`, not UI strings.

## Sound
`tone("correct")` on a correct tap; `tone("nudge")` on a wrong tap; `tone("tap", k)` as the k-th sentence glows after a correct tap; `tone("finish")` once. Silent under `?sound=off`. The text is never read aloud.

## Testing checklist
- [ ] Works in all 11 languages (chrome strings change; `?lang=it` plays the English texts until an Italian set exists and nothing breaks).
- [ ] Works at narrow width (400-px iframe: text card with three lines, the title slot and three title tiles visible; no sentence wraps).
- [ ] Keyboard operable (Tab across the three tiles; Enter picks).
- [ ] Never auto-starts.
- [ ] No losing state (wrong taps never end the session; the show-me ring always completes the item).
- [ ] Every text has exactly three sentences of at most six words; no instruction sentence is shown.
- [ ] Tapping "Sweet Honey" for the bee text lights only the second sentence and underlines "honey".
- [ ] Tapping "The Big Hive" pulses the bee picture and underlines "Bees" in all three sentences.
- [ ] Tapping "All About Bees" glides it into the title slot and lights the three sentences one after another with rising notes.
- [ ] At the third level the scene picture is the setting (grass, snow, water), never the animal the title names.
- [ ] After a wrong tap the tiles come back in a different order; the correct tile is never in the same slot twice running.
- [ ] A missed item comes back two items later.
- [ ] The finish screen shows twelve title chips with filled or hollow dots and no score.
- [ ] With `?sound=off` nothing is audible.
