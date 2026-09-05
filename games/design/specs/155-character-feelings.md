# 155 — Feelings Faces

## Identity
- Slug: `character-feelings`
- Subject / topic: Literacy / inference — working out how a character feels from a picture and one or two sentences that never name the feeling
- Age band: `6-8`
- Interaction pattern: `P1` — tap one of N
- Estimated build size: ~440 lines

Shared contract: `catalogue/BUILD-CONVENTIONS.md`. Pattern contract: `catalogue/PATTERNS.md` P1. Locale note: the sentences and questions are language-bound (F-129; A-15) and live in `LOCALE_DATA`; English is authored in full, the other ten locales are declared as needing a native set (en pilot). The six feeling faces are pictures and language-neutral. Every item carries ≥ 2 visible text clues plus a scene picture (F-129), and no sentence contains a feeling word — the feeling must be inferred. Nothing is spoken.

## Learning
- Objective: Reads a picture-supported sentence (two sentences at the top level) about a character and taps the face that shows how that character feels, using the action and its consequence as clues.
- Prerequisites: Reads sentences of up to 8 words (games 074-077, 080). Recognises the six feeling faces as happy, sad, angry, scared, surprised, tired (a pre-reader can name them from the pictures).
- Curriculum links: F-22 (reading short narrative texts with comprehension by 8 in all twelve systems), F-129 ("literal recall fine, inference poor at 6 … inference items carry ≥ 2-3 visible clues, picture-supported"), F-1 (comprehension in 5 of 15 sources), F-31 row "Read short text; retell/sequence; simple inference" — conservative 8, earliest 6 → 6-8 (US RL.1.3 / RL.2.3 "describe how characters … respond to major events"; England Y1-2 "making inferences on the basis of what is being said and done"; Germany Klasse 2 "Gefühle von Figuren erschließen"; France CE1 "comprendre les sentiments des personnages"; Netherlands groep 4 "gevoelens van personages"; Spain 1º ciclo "inferencias sencillas"; Brazil EF12LP19; Sweden åk 1-3 "läsförståelse — tolka"; Finland 1.-2. luokka "päättely").
- Common misconceptions (F-129, F-125), each with this game's response:
  1. **Answers from one salient word or from the picture's mood ("cake" → happy, even though the cake fell on the floor).** Response: every item has two clue words — the action and its consequence ("falls", "floor"); on a wrong tap both are underlined in the text (`ART.clueMark`, `ANIM.markIn`) and the clue picture in the scene is ringed (`ART.clueRing`) for 1200 ms — the answer is in what HAPPENED, not in what is pictured.
  2. **Reports the feeling of the other character, or their own.** Response: the question names the character asked about ("How does Fox feel?") and that character is ringed in the scene (`ART.charRing`) whenever the item appears; items with two characters (L2-L3) make the ring the second cue.
  3. **Conflates near feelings — sad with angry, scared with surprised, tired with sad.** Response: L2-L3 distractor sets contain the near feeling; the deciding clue word (the one that separates them — "hides" → scared, "on purpose" → angry) is the SECOND underline and pulses (`ANIM.pulse`) after the first, so the child sees which word decides.
  4. **Answers from the character's fixed drawn expression (the picture always looks the same).** Response: structural — the scene character carries no expression cue; on a correct tap the chosen face is stamped beside the character (`ART.faceBadge`, `ANIM.stamp`) so the feeling visibly belongs to the character after the reading, never before.
  5. **Position habit / brute force.** Response: the correct tile's slot never repeats twice running (§13); after a wrong tap the three faces re-shuffle (P1 guard, F-65); the third attempt gets the show-me ring.

## How it plays
1. **Start screen**: title "Feelings Faces", the panda (`ART.panda`) at (360, 200), Start, picker.
2. **Item 1 (L1: "Fox gets a big cake.")**: rail of 12 dots (§6) at y = 28; `t("question_x_of_y")` at (360, 48). Zone A: the scene card (`ART.sceneCard`, 620 × 120) centred at (360, 130): on its left the scene — the character (`ART.picFox`, 56 px) at (110, 130) with `ART.charRing` around it, and the clue object (`ART.picCake`, 48 px) at (180, 130); on its right the sentence at 24 px `THEME.font.body` `THEME.colour.ink`, left-aligned from x = 240, `wordWrap` 400, max 2 lines (one line at L1-L2, two at L3). Under the card the question (`ART.qText`, 26 px `THEME.font.display` `THEME.colour.structure`) centred at (360, 222): "How does Fox feel?". The panda sits at (650, 60) at 44 px. Zone B: three face tiles (`ART.faceTile`, 140 × 110) at y = 380, x = 200 / 360 / 520, each holding one face at 64 px (`ART.faceHappy`, `ART.faceSad`, `ART.faceAngry` here), shuffled. No caption (the question is the prompt).
3. **Answering**: the child taps a face.
   - **Correct**: `ANIM.pop`, `tone("correct")`, praise pop (rotation); the two clue words underline (`ART.clueMark`) and the face is stamped beside the character (`ART.faceBadge` at (150, 100) holding the face at 28 px, `ANIM.stamp`); the panda `ANIM.nod`; rail dot; next item after 900 ms (`ANIM.appear`).
   - **Wrong (any)**: `ANIM.nudge`, `tone("nudge")`, the tile de-selects; then the clue cue: clue word 1 underlines, 300 ms later clue word 2 underlines and `ANIM.pulse`s, and the clue object in the scene gets `ART.clueRing`; all for 1200 ms; the faces re-shuffle (`ANIM.appear`). Attempt 2.
   - **Second wrong tap**: the clue cue again; then the show-me ring (`ART.showRing`, `ANIM.showMe`) on the correct face; tapping it completes the item as solved-with-help (no praise pop; the stamp still plays).
   - During a cue (≤ 1.5 s) tiles are `setEnabled(false)`.
4. **Items 2-12**: per Content/Rules. L1 one sentence, one character, distractors far apart (happy / sad / angry); L2 one sentence, often two characters, one near-feeling distractor; L3 two sentences, the second holds the deciding clue, near-feeling distractors.
5. **Re-queue** (F-41): an item wrong first-try re-enters after 2 intervening items with re-shuffled tiles; the count stays 12.
6. **Finish**: `t("all_done")` (360, 110); the panda (360, 200) `ANIM.celebrate`; the summary = the twelve answers as chips (`ART.answerChip`, 150 × 40: the character at 24 px on the left, the chosen face at 24 px on the right) in three rows of four from y = 320 (x = 135 + i × 150), with `ART.dotFull` at the chip's left for first-try items and `ART.dotEmpty` for helped ones; `play_again` (250, 510), `menu` (470, 510); `tone("finish")`.

Session ≈ 6 minutes.

## Art registry
```js
const ART = {
  panda:        { kind: "emoji", value: "🐼", size: 80 },                     // mascot
  sceneCard:    { kind: "shape", shape: "roundRect", w: 620, h: 120, fill: "surface", stroke: "structure", strokeWidth: 3, radius: 16 },
  charRing:     { kind: "shape", shape: "circle", r: 36, stroke: "structure", strokeWidth: 3 },        // around the character asked about
  clueRing:     { kind: "shape", shape: "circle", r: 32, stroke: "accent", strokeWidth: 3 },           // around the clue object, alpha 0 → 1 → 0
  clueMark:     { kind: "shape", shape: "rect", w: 40, h: 5, fill: "accent" },                          // under a clue word; width = word width at runtime
  qText:        { kind: "text",  value: "", size: 26, font: "display", color: "structure" },
  faceTile:     { kind: "shape", shape: "roundRect", w: 140, h: 110, fill: "surface", stroke: "line", strokeWidth: 2, radius: 16 },
  faceBadge:    { kind: "shape", shape: "circle", r: 20, fill: "surface", stroke: "structure", strokeWidth: 2 },   // holds the chosen face at 28 px beside the character
  showRing:     { kind: "shape", shape: "roundRect", w: 152, h: 122, stroke: "structure", strokeWidth: 4, radius: 20 },
  answerChip:   { kind: "shape", shape: "roundRect", w: 150, h: 40, fill: "structureSoft", stroke: "structure", strokeWidth: 1, radius: 8 },
  dotEmpty:     { kind: "shape", shape: "circle", r: 8, stroke: "line", strokeWidth: 2 },
  dotFull:      { kind: "shape", shape: "circle", r: 8, fill: "structure" },
  // the six feeling faces (language-neutral)
  faceHappy:     { kind: "emoji", value: "😀", size: 64 },   // happy
  faceSad:       { kind: "emoji", value: "😢", size: 64 },   // sad
  faceAngry:     { kind: "emoji", value: "😠", size: 64 },   // angry
  faceScared:    { kind: "emoji", value: "😨", size: 64 },   // scared
  faceSurprised: { kind: "emoji", value: "😮", size: 64 },   // surprised
  faceTired:     { kind: "emoji", value: "😴", size: 64 },   // tired
  // characters
  picFox:       { kind: "emoji", value: "🦊", size: 56 },   // Fox
  picDuck:      { kind: "emoji", value: "🦆", size: 56 },   // Duck
  picCat:       { kind: "emoji", value: "🐱", size: 56 },   // Cat
  picDog:       { kind: "emoji", value: "🐶", size: 56 },   // Dog
  picBear:      { kind: "emoji", value: "🐻", size: 56 },   // Bear
  picFrog:      { kind: "emoji", value: "🐸", size: 56 },   // Frog
  picOwl:       { kind: "emoji", value: "🦉", size: 56 },   // Owl
  picPig:       { kind: "emoji", value: "🐷", size: 56 },   // Pig
  picMouse:     { kind: "emoji", value: "🐭", size: 56 },   // Mouse
  picHen:       { kind: "emoji", value: "🐔", size: 56 },   // Hen
  picRabbit:    { kind: "emoji", value: "🐰", size: 56 },   // Rabbit
  // clue objects
  picCake:      { kind: "emoji", value: "🎂", size: 48 },   // cake
  picBall:      { kind: "emoji", value: "⚽", size: 48 },   // ball
  picRain:      { kind: "emoji", value: "🌧️", size: 48 },   // rain
  picShell:     { kind: "emoji", value: "🐚", size: 48 },   // shell
  picMoon:      { kind: "emoji", value: "🌙", size: 48 },   // moon / night
  picKite:      { kind: "emoji", value: "🪁", size: 48 },   // kite (Unicode 12)
  picSun:       { kind: "emoji", value: "☀️", size: 48 },   // sun / all day
  picBone:      { kind: "emoji", value: "🦴", size: 48 },   // bone (Unicode 11)
  picBed:       { kind: "emoji", value: "🛏️", size: 48 },   // bed
  picApple:     { kind: "emoji", value: "🍎", size: 48 },   // apple
  picCheese:    { kind: "emoji", value: "🧀", size: 48 },   // cheese
  picMountain:  { kind: "emoji", value: "⛰️", size: 48 },   // hill / mountain
  picBricks:    { kind: "emoji", value: "🧱", size: 48 }    // tower (bricks, Unicode 11)
};
```
No emoji newer than Unicode 12 is used, so no `fallback` is required. Character names in the texts are the animals' kind names (Fox, Duck) — never people's names.

## Animation registry
```js
const ANIM = {
  pop:       { scale: 1.12, duration: 140, ease: "Back.Out", yoyo: true, trigger: "correct face tile" },
  nudge:     { x: "+=10", duration: 80, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "wrong face tile" },
  markIn:    { alpha: 1, duration: 200, ease: "Sine.Out", yoyo: true, hold: 1200, trigger: "clueMark under clue word 1, then clue word 2 (300 ms later), and clueRing (from alpha 0)" },
  pulse:     { scale: 1.3, duration: 250, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "the second clueMark (the deciding word)" },
  stamp:     { alpha: 1, scale: 1, duration: 220, ease: "Back.Out", trigger: "faceBadge beside the character on a correct answer (from alpha 0, scale 1.6)" },
  nod:       { angle: 6, duration: 110, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "panda on correct" },
  appear:    { alpha: 1, scale: 1, duration: 200, ease: "Back.Out", trigger: "new scene, question and tiles; re-shuffled tiles after a wrong tap (from alpha 0, scale 0.6)" },
  showMe:    { alpha: 1, duration: 500, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "showRing on the correct face (from alpha 0.2)" },
  celebrate: { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "finish panda" }
};
```
Implementation note: the sentence is drawn as one text object per WORD (24 px, 8 px word gaps, wrapping at 400 px) so `ART.clueMark` can sit under a clue word; a two-word clue ("on purpose") gets one mark spanning both words.

## Screen layout
```
y   0 ┌──────────────────────────────────────────────────────────────┐
      │ [lang]       ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○  rail y=28; "3 of 12" y=48 │  zone T
 56   ├──────────────────────────────────────────────────────────────┤
      │  ┌──────────────────────────────────────────────┐  panda     │
      │  │ (fox) cake   Fox gets a big cake.            │  (650,60)  │  zone A
      │  │ (110) (180)  text from x=240, y=130          │            │
      │  └──────────────────────────────────────────────┘ card (360,130) 620×120
      │                 How does Fox feel?  (360,222)                │
260   ├──────────────────────────────────────────────────────────────┤
      │        ┌───────┐    ┌───────┐    ┌───────┐   tiles y=380     │  zone B
      │        │ happy │    │  sad  │    │ angry │   x=200/360/520   │
      │        └───────┘    └───────┘    └───────┘   (140×110)       │
480   ├──────────────────────────────────────────────────────────────┤
      │                                                              │  zone C
560   └──────────────────────────────────────────────────────────────┘
```
Fixed layout, FIT scaling. A two-character scene draws the second character at (180, 130) and the clue object at (215, 100) at 36 px.

## Visual specification
- Background `THEME.colour.bg`; rail per §6: 12 × `ART.dotEmpty` (x = 239 + i × 22) → `ART.dotFull`; `t("question_x_of_y")` at (360, 48).
- `ART.sceneCard` at (360, 130); the character at (110, 130) at 56 px inside `ART.charRing`; the clue object at (180, 130) at 48 px (or the second character at (180, 130) and the object at (215, 100) at 36 px); `ART.clueRing` around the clue object at alpha 0.
- Text: words from x = 240, first line y = 118 for two-line items and y = 130 for one-line items, 24 px `THEME.font.body` `THEME.colour.ink`, wrap 400; a line that would still overflow drops to 20 px — never a third line. `ART.clueMark` 4 px under a clue word, width = the word (or two-word phrase) width.
- `ART.qText` at (360, 222). `ART.faceBadge` at (150, 100) with the chosen face at 28 px.
- Tiles: `makeTile` 140 × 110 with `ART.faceTile` tokens; face 64 px. `ART.showRing` behind the correct tile. `ART.panda` at (650, 60) at 44 px.
- Tap floors: tiles 140 × 110 (≥ 56); gaps 20.
- Keyboard: Tab across the three tiles; Enter taps.

## Content
Texts are language-bound. `LOCALE_DATA[lang]` = `{ items: { L1: [...], L2: [...], L3: [...] } }`; an item = `{ text, question, character: <ART key>, second: <ART key> | null, clueObject: <ART key>, clues: [word1, word2], answer: <face key>, distractors: [<face key>, <face key>] }`. The English set is complete. **Other locales: a native text set is required — en pilot** (`LOCALE_DATA[lang] = "en"` until then). Author's rules: ≤ 8 words per sentence; never a feeling word in the text; two clue words per item, the second the deciding one; L3 = two sentences.

**en** — text — question → answer [distractors]; character (+ second); clue object; clues:
- **L1** (one sentence; far-apart distractors):
  1. Fox gets a big cake. — How does Fox feel? → `ART.faceHappy` [`ART.faceSad`, `ART.faceAngry`]; `ART.picFox`; `ART.picCake`; gets, cake
  2. Duck loses her red ball. — How does Duck feel? → `ART.faceSad` [`ART.faceHappy`, `ART.faceScared`]; `ART.picDuck`; `ART.picBall`; loses, ball
  3. A loud dog barks at Cat. — How does Cat feel? → `ART.faceScared` [`ART.faceHappy`, `ART.faceSad`]; `ART.picCat` + `ART.picDog`; `ART.picDog`; loud, barks
  4. Bear waits all day in the rain. — How does Bear feel? → `ART.faceSad` [`ART.faceHappy`, `ART.faceSurprised`]; `ART.picBear`; `ART.picRain`; waits, rain
  5. Frog finds a shiny shell. — How does Frog feel? → `ART.faceHappy` [`ART.faceSad`, `ART.faceAngry`]; `ART.picFrog`; `ART.picShell`; finds, shiny
  6. Owl stays up all night. — How does Owl feel? → `ART.faceTired` [`ART.faceHappy`, `ART.faceAngry`]; `ART.picOwl`; `ART.picMoon`; stays up, night
- **L2** (one sentence; one near-feeling distractor):
  7. Pig breaks his new kite. — How does Pig feel? → `ART.faceSad` [`ART.faceAngry`, `ART.faceHappy`]; `ART.picPig`; `ART.picKite`; breaks, new
  8. Mouse hears a bang in the dark. — How does Mouse feel? → `ART.faceScared` [`ART.faceSurprised`, `ART.faceHappy`]; `ART.picMouse`; `ART.picMoon`; bang, dark
  9. A frog jumps out of Hen's hat! — How does Hen feel? → `ART.faceSurprised` [`ART.faceSad`, `ART.faceTired`]; `ART.picHen` + `ART.picFrog`; `ART.picFrog`; jumps out, hat
  10. Rabbit hops and hops all day. — How does Rabbit feel? → `ART.faceTired` [`ART.faceAngry`, `ART.faceScared`]; `ART.picRabbit`; `ART.picSun`; hops and hops, all day
  11. Dog takes Fox's bone and runs. — How does Fox feel? → `ART.faceAngry` [`ART.faceHappy`, `ART.faceTired`]; `ART.picFox` + `ART.picDog`; `ART.picBone`; takes, runs
  12. Cat gets a hug from Bear. — How does Cat feel? → `ART.faceHappy` [`ART.faceSad`, `ART.faceScared`]; `ART.picCat` + `ART.picBear`; `ART.picBear`; hug, gets
- **L3** (two sentences; the second decides; near-feeling distractors):
  13. Duck bakes a cake all morning. Then the cake falls on the floor. — How does Duck feel? → `ART.faceSad` [`ART.faceAngry`, `ART.faceTired`]; `ART.picDuck`; `ART.picCake`; falls, floor
  14. Bear hears a knock at night. He hides under the bed. — How does Bear feel? → `ART.faceScared` [`ART.faceSurprised`, `ART.faceAngry`]; `ART.picBear`; `ART.picBed`; knock, hides
  15. Fox waits for Owl. Owl comes and they share apples. — How does Fox feel? → `ART.faceHappy` [`ART.faceSad`, `ART.faceTired`]; `ART.picFox` + `ART.picOwl`; `ART.picApple`; comes, share
  16. Mouse looks for a bit of cheese. He finds a mountain of it! — How does Mouse feel? → `ART.faceSurprised` [`ART.faceSad`, `ART.faceTired`]; `ART.picMouse`; `ART.picCheese`; finds, mountain
  17. Rabbit builds a tall tower. Dog knocks it down on purpose. — How does Rabbit feel? → `ART.faceAngry` [`ART.faceSad`, `ART.faceScared`]; `ART.picRabbit` + `ART.picDog`; `ART.picBricks`; knocks, on purpose
  18. Hen walks up the big hill. At the top she sits and yawns. — How does Hen feel? → `ART.faceTired` [`ART.faceHappy`, `ART.faceSad`]; `ART.picHen`; `ART.picMountain`; big hill, yawns

Every sentence ≤ 8 words. Play list: 12 items per Rules, shuffled within level, no item repeats except by re-queue; the correct tile's slot never repeats twice running.

## Rules
- Item count: 12 (re-queued repeats replace unplayed items).
- Difficulty progression: 2 consecutive first-try correct → next level (cap L3).
- Adaptation: a wrong tap, or wrong first-try on 2 consecutive items → next item one level down (floor L1); a single miss re-queues the item after 2 intervening items.
- What happens on a correct answer: `ANIM.pop`, `tone("correct")`, praise rotation ["well_done", "great_job", "excellent", "you_did_it", "keep_going"] on every first-try item, both clue words underline, `ART.faceBadge` stamped beside the character, panda `ANIM.nod`, rail dot, next item after 900 ms.
- What happens on a wrong answer:
  - Answer from one word or the picture's mood (a far-apart wrong face): nudge + `tone("nudge")`; clue 1 underlines, clue 2 underlines and pulses, the clue object is ringed, 1200 ms; tiles re-shuffle.
  - Other character's feeling (L2-L3 two-character items): the same cue — the ringed character in the scene and the question name are the standing cues.
  - Near feeling (sad for angry, surprised for scared): the same cue — the pulse on the deciding word is the discriminating hint.
  - Second wrong tap: the clue cue again + the show-me ring on the correct face.
- Retry behaviour: attempt 1 → attempt 2 after the clue cue → attempt 3 with the show-me ring; solved-with-help. No attempt 4; the item re-queues later.
- Finish condition: 12 items. No losing state, no clock.

## Strings
- `GameCore.t()` keys: `t("start")`, `t("question_x_of_y")`, `t("all_done")`, `t("play_again")`, `t("menu")`, `t("well_done")`, `t("great_job")`, `t("excellent")`, `t("you_did_it")`, `t("keep_going")`.
- Game-specific: `title` = "Feelings Faces". The texts and questions are content from `LOCALE_DATA`, not UI strings.

## Sound
`tone("correct")` on a correct tap; `tone("nudge")` on a wrong tap; `tone("tap")` when a clue cue starts; `tone("finish")` once. Silent under `?sound=off`. The text is never read aloud.

## Testing checklist
- [ ] Works in all 11 languages (chrome strings change; `?lang=pt` plays the English texts until a Portuguese set exists and nothing breaks).
- [ ] Works at narrow width (400-px iframe: the scene card, the text, the question and three faces visible; no third text line).
- [ ] Keyboard operable (Tab across the three faces; Enter picks).
- [ ] Never auto-starts.
- [ ] No losing state (wrong taps never end the session; the show-me ring always completes the item).
- [ ] No sentence contains the words happy, sad, angry, scared, surprised or tired.
- [ ] The character asked about has a ring around it in the scene, and the question names it.
- [ ] Tapping the sad face for "Fox gets a big cake." nudges it, underlines "gets" then "cake" (the second one pulses), rings the cake, and re-shuffles the faces.
- [ ] Tapping the happy face pops it and stamps a small happy face beside the fox.
- [ ] At the third level the text has two sentences and the underlined clues are in the second sentence.
- [ ] After a wrong tap the faces come back in a different order; the correct face is never in the same slot twice running.
- [ ] A missed item comes back two items later.
- [ ] The finish screen shows twelve character/face chips with filled or hollow dots and no score.
- [ ] With `?sound=off` nothing is audible.
