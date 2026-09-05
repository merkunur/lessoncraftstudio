# 080 — Who Said It

## Identity
- Slug: `who-said-it`
- Subject / topic: Literacy / reading comprehension — literal recall from a two-line text, answered by tapping a picture (who / what / where)
- Age band: `6-8`
- Interaction pattern: `P1` — tap one of N
- Estimated build size: ~440 lines

Shared contract: `catalogue/BUILD-CONVENTIONS.md`. Pattern contract: `catalogue/PATTERNS.md` P1. Locale note: the texts and questions are language-bound (F-129; A-15) and live in `LOCALE_DATA`; English is authored in full, the other ten locales are declared as needing a native set (en pilot). Nothing is spoken; the child reads two lines of at most 8 words each, and every question is picture-supported by a scene picture that never shows the answer.

## Learning
- Objective: Reads a two-line text in which two animal characters each do or say one thing, then answers a who / what / where question about it by tapping the matching picture among three.
- Prerequisites: Reads sentences of up to 8 words (games 074-077). Knows the animal characters as pictures (the same emoji set as the other literacy games).
- Curriculum links: F-22 (reading short narrative texts with comprehension, retell and sequence by 8 in all twelve systems), F-129 (literal recall fine, inference poor at 6; poor comprehenders do not integrate across sentences), F-1 (reading comprehension 5 of 15 sources; SplashLearn Comprehension 44 games, F-3), F-31 row "Read short text; retell/sequence; simple inference" — conservative 8, earliest 6 → 6-8 (US RL.1.1 "ask and answer questions about key details in a text"; England Y1 "discussing the significance of … events"; Germany Klasse 1-2 "Texte verstehen, Fragen beantworten"; France CP "comprendre un texte lu"; Netherlands groep 3-4 "begrijpend lezen"; Spain 1º ciclo "comprensión lectora"; Brazil EF12LP17; Sweden åk 1-3 "läsförståelse"; Finland 1.-2. luokka "luetun ymmärtäminen").
- Common misconceptions (F-129, F-125), each with this game's response:
  1. **Answering from the scene picture or from salience instead of from the text (taps the character shown in the scene, or the most striking picture).** Response: the scene picture never shows the answer (it shows the object or place the question names, or the character asked ABOUT for what/where items); after a wrong tap the line that contains the answer glows (`ART.lineGlow`, `ANIM.glow`) for 1200 ms — "the answer is written here".
  2. **Recency — answering with the LAST character or thing mentioned.** Response: half the items place the answer in line 1 and half in line 2, and the same line glow shows which line holds it; L1 questions alternate which line they target.
  3. **Not integrating the two lines (F-129: poor comprehenders do not integrate across sentences).** Response: L3 questions can only be answered from BOTH lines ("Fox has a hat. Owl takes the hat. — Who has the hat now?"); on a wrong tap the two lines glow one after the other (`ANIM.glow` on line 1, then line 2, 600 ms apart) so the child reads them as one story.
  4. **Confusing who / what / where (answers a where-question with a character).** Response: structural — the question word is drawn in `THEME.colour.accent` (`ART.qWord`) and all three answer tiles are of ONE kind matching it (three characters for who, three objects for what, three places for where), so a category error is impossible and the child's only job is the recall.
  5. **Position habit.** Response: the correct tile's slot shuffles and never repeats twice running (§13); a wrong tap re-shuffles the tiles (P1 brute-force guard); the third wrong tap gets the show-me ring.

## How it plays
1. **Start screen**: title "Who Said It", the elephant (`ART.elephant`) at (360, 200), Start, picker.
2. **Item 1 (L1)**: rail of 12 dots (§6) at y = 28; `t("question_x_of_y")` at (360, 48). Zone A: the text card (`ART.textCard`, 620 × 110) centred at (360, 130): the scene picture (`ART.picNut`, 56 px) at (110, 130) on the left, and two text lines at 24 px `THEME.font.body` `THEME.colour.ink`, left-aligned at x = 160: line 1 `Fox says, "I want an apple."` at y = 110 and line 2 `Owl says, "I want a nut."` at y = 150. Under the card the question (`ART.qText`, 26 px `THEME.font.display` `THEME.colour.structure`) centred at (360, 222): "Who wants a nut?" with "Who" drawn as `ART.qWord` in `THEME.colour.accent`. The elephant stands at (640, 60) at 44 px. Zone B: three answer tiles (`ART.answerTile`, 140 × 110) at y = 380, x = 200 / 360 / 520, each holding one picture at 64 px: `ART.picFox`, `ART.picOwl`, `ART.picFrog`, shuffled. Caption: none (the question is the prompt).
3. **Answering**: the child taps a tile.
   - **Correct**: `ANIM.pop`, `tone("correct")`, praise pop; the answer word in the text (`keyWord`) gets `ART.wordMark` beneath it and the answer line `ART.lineGlow` (`ANIM.glow`) — the text confirms the answer visibly; the elephant `ANIM.trumpet`; rail dot fills; next item after 900 ms (`ANIM.appear`).
   - **Wrong (any)**: `ANIM.nudge`, `tone("nudge")`, the tile de-selects; then the line cue: `ART.lineGlow` behind the answer line for 1200 ms (at L3 behind line 1, then line 2, 600 ms apart); tiles re-shuffle. Attempt 2.
   - **Second wrong tap**: the line cue again plus `ART.wordMark` under the key word in the text; attempt 3 with the show-me ring (`ART.showRing`, `ANIM.showMe`) on the correct tile; tapping it completes the item as solved-with-help.
4. **Items 2-12**: per Content/Rules. L1 who-questions (the answer is a character; tiles = three characters); L2 what/where-questions (tiles = three objects or three places); L3 two-line integration questions (who/where/what "now").
5. **Re-queue** (F-41): an item wrong first-try re-enters after 2 intervening items with re-shuffled tiles; the count stays 12.
6. **Finish**: `t("all_done")` (360, 110); the elephant (360, 200) `ANIM.celebrate`; the summary = the twelve answers as chips (`ART.answerChip`, 150 × 40: the answer picture 24 px on the left, the question word 16 px on the right) in three rows of four from y = 320 (x = 135 + i × 150), with `ART.dotFull` at the chip's left for first-try items and `ART.dotEmpty` for helped ones — what was recalled unaided, not a score; `play_again` (250, 510), `menu` (470, 510); `tone("finish")`.

Session ≈ 6-7 minutes.

## Art registry
```js
const ART = {
  elephant:   { kind: "emoji", value: "🐘", size: 80 },                    // mascot (never a text character)
  textCard:   { kind: "shape", shape: "roundRect", w: 620, h: 110, fill: "surface", stroke: "structure", strokeWidth: 3, radius: 16 },
  lineGlow:   { kind: "shape", shape: "roundRect", w: 470, h: 34, fill: "structureSoft", radius: 8 },   // behind one text line, alpha 0 → 1 → 0
  wordMark:   { kind: "shape", shape: "rect", w: 40, h: 5, fill: "accent" },                             // width = key word width at runtime
  qText:      { kind: "text",  value: "", size: 26, font: "display", color: "structure" },
  qWord:      { kind: "text",  value: "", size: 26, font: "display", color: "accent" },
  answerTile: { kind: "shape", shape: "roundRect", w: 140, h: 110, fill: "surface", stroke: "line", strokeWidth: 2, radius: 16 },
  showRing:   { kind: "shape", shape: "roundRect", w: 152, h: 122, stroke: "structure", strokeWidth: 4, radius: 20 },
  answerChip: { kind: "shape", shape: "roundRect", w: 150, h: 40, fill: "structureSoft", stroke: "structure", strokeWidth: 1, radius: 8 },
  dotEmpty:   { kind: "shape", shape: "circle", r: 8, stroke: "line", strokeWidth: 2 },
  dotFull:    { kind: "shape", shape: "circle", r: 8, fill: "structure" },
  // characters (who-answers)
  picFox:     { kind: "emoji", value: "🦊", size: 64 },   // Fox
  picOwl:     { kind: "emoji", value: "🦉", size: 64 },   // Owl
  picFrog:    { kind: "emoji", value: "🐸", size: 64 },   // Frog
  picCat:     { kind: "emoji", value: "🐱", size: 64 },   // Cat
  picDog:     { kind: "emoji", value: "🐶", size: 64 },   // Dog
  picPig:     { kind: "emoji", value: "🐷", size: 64 },   // Pig
  picBee:     { kind: "emoji", value: "🐝", size: 64 },   // Bee
  picDuck:    { kind: "emoji", value: "🦆", size: 64 },   // Duck
  picHen:     { kind: "emoji", value: "🐔", size: 64 },   // Hen
  picCow:     { kind: "emoji", value: "🐮", size: 64 },   // Cow
  picMouse:   { kind: "emoji", value: "🐭", size: 64 },   // Mouse
  picRabbit:  { kind: "emoji", value: "🐰", size: 64 },   // Rabbit
  picHorse:   { kind: "emoji", value: "🐴", size: 64 },   // Horse
  picBird:    { kind: "emoji", value: "🐦", size: 64 },   // Bird
  picMonkey:  { kind: "emoji", value: "🐒", size: 64 },   // Monkey
  // objects and places (what / where answers and scene pictures)
  picApple:   { kind: "emoji", value: "🍎", size: 64 },   // apple
  picNut:     { kind: "emoji", value: "🥜", size: 64 },   // nut
  picHat:     { kind: "emoji", value: "🎩", size: 64 },   // hat
  picLeaf:    { kind: "emoji", value: "🍃", size: 64 },   // leaf
  picLake:    { kind: "emoji", value: "🌊", size: 64 },   // lake / pond (water)
  picCarrot:  { kind: "emoji", value: "🥕", size: 64 },   // carrot
  picGrass:   { kind: "emoji", value: "🌿", size: 64 },   // grass
  picBall:    { kind: "emoji", value: "⚽", size: 64 },   // ball
  picBook:    { kind: "emoji", value: "📕", size: 64 },   // book
  picFlower:  { kind: "emoji", value: "🌸", size: 64 },   // flower
  picTree:    { kind: "emoji", value: "🌳", size: 64 },   // tree
  picHouse:   { kind: "emoji", value: "🏠", size: 64 },   // house
  picBanana:  { kind: "emoji", value: "🍌", size: 64 },   // banana
  picEgg:     { kind: "emoji", value: "🥚", size: 64 },   // egg
  picShell:   { kind: "emoji", value: "🐚", size: 64 },   // shell
  picShoe:    { kind: "emoji", value: "👟", size: 64 },   // shoe
  picBox:     { kind: "emoji", value: "📦", size: 64 },   // box
  picBed:     { kind: "emoji", value: "🛏️", size: 64 },   // bed
  picFish:    { kind: "emoji", value: "🐟", size: 64 },   // fish
  picCheese:  { kind: "emoji", value: "🧀", size: 64 }    // cheese
};
```
All emoji are Unicode 9 or older; no fallbacks needed. Character names in the texts are the animals' own kind names (Fox, Owl) — never people's names.

## Animation registry
```js
const ANIM = {
  pop:       { scale: 1.12, duration: 140, ease: "Back.Out", yoyo: true, trigger: "correct tile" },
  nudge:     { x: "+=10", duration: 80, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "wrong tile" },
  glow:      { alpha: 1, duration: 250, ease: "Sine.Out", yoyo: true, hold: 700, trigger: "lineGlow behind the answer line (from alpha 0); at L3 line 1 then line 2, 600 ms apart" },
  trumpet:   { angle: 8, duration: 110, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "elephant on correct" },
  appear:    { alpha: 1, scale: 1, duration: 200, ease: "Back.Out", trigger: "new text, question and tiles (from alpha 0, scale 0.6)" },
  showMe:    { alpha: 1, duration: 500, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "ring on the correct tile (from alpha 0.2)" },
  celebrate: { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "finish elephant" }
};
```
Implementation note: each text line is drawn as one text object per WORD (24 px, 8 px word gaps, left-aligned from x = 160) so `ART.wordMark` can sit under the key word; the glow is a single rectangle behind the whole line.

## Screen layout
```
y   0 ┌──────────────────────────────────────────────────────────────┐
      │ [lang]       ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○  rail y=28; "3 of 12" y=48 │  zone T
 56   ├──────────────────────────────────────────────────────────────┤
      │  ┌──────────────────────────────────────────────┐ elephant   │
      │  │ [scene]  Fox says, "I want an apple."  y=110 │ (640,60)   │  zone A
      │  │ (110,130) Owl says, "I want a nut."     y=150 │            │
      │  └──────────────────────────────────────────────┘ card (360,130) 620×110
      │                 Who wants a nut?  (360,222)                   │
260   ├──────────────────────────────────────────────────────────────┤
      │          ┌───────┐   ┌───────┐   ┌───────┐   tiles y=380      │  zone B
      │          │  fox  │   │  owl  │   │ frog  │   x=200/360/520    │
      │          └───────┘   └───────┘   └───────┘   (140×110)        │
480   ├──────────────────────────────────────────────────────────────┤
      │                                                              │  zone C
560   └──────────────────────────────────────────────────────────────┘
```
Fixed layout, FIT scaling.

## Visual specification
- Background `THEME.colour.bg`; rail per §6: 12 × `ART.dotEmpty` (x = 239 + i × 22) → `ART.dotFull`; `t("question_x_of_y")` at (360, 48).
- `ART.textCard` at (360, 130); the item's scene picture at (110, 130) at 56 px; lines at y = 110 and y = 150 from x = 160, 24 px `THEME.font.body` `THEME.colour.ink`, `wordWrap` 480 (8 English words ≈ 300 px; a 1.6× locale fits; a line that still wraps drops to 20 px — never a third line).
- `ART.lineGlow` centred behind a line at (395, y) at alpha 0; `ART.wordMark` 4 px under the key word.
- `ART.qText` at (360, 222) with the question word rendered as `ART.qWord` (accent) followed by the rest in `structure`.
- Tiles: `makeTile` 140 × 110 with `ART.answerTile` tokens; picture centred 64 px. `ART.showRing` behind the correct tile. `ART.elephant` at (640, 60) at 44 px.
- Tap floors: tiles 140 × 110 (≥ 56); gaps 20. During a cue (≤ 1.8 s) tiles are `setEnabled(false)`.
- Keyboard: Tab across the three tiles; Enter taps.

## Content
Texts are language-bound. `LOCALE_DATA[lang]` = `{ items: { L1: [...], L2: [...], L3: [...] } }`; an item = `{ line1, line2, question, qWord, answerLine: 1 | 2 | "both", keyWord, scene: <ART key>, answer: <ART key>, distractors: [<ART key>, <ART key>] }`. All tiles of an item are of one kind (characters / objects / places). The English set is complete. **Other locales: a native text set is required — en pilot** (`LOCALE_DATA[lang] = "en"` until then; quotation style per locale — de „…“, fr « … », es «…» or — ; the `qWord` is the locale's own question word; keep each line ≤ 8 words).

**en** — line 1 / line 2 — question (`qWord`) → answer [distractors]; scene; answer line; key word:
- **L1** (who; tiles = characters):
  1. Fox says, "I want an apple." / Owl says, "I want a nut." — Who wants a nut? (Who) → `ART.picOwl` [`ART.picFox`, `ART.picFrog`]; scene `ART.picNut`; line 2; nut
  2. Cat has a red hat. / Dog has a blue hat. — Who has the red hat? (Who) → `ART.picCat` [`ART.picDog`, `ART.picPig`]; scene `ART.picHat`; line 1; red
  3. Bee sits on the flower. / Frog sits on the leaf. — Who sits on the leaf? (Who) → `ART.picFrog` [`ART.picBee`, `ART.picDuck`]; scene `ART.picLeaf`; line 2; leaf
  4. Duck swims in the lake. / Hen sleeps in the house. — Who swims in the lake? (Who) → `ART.picDuck` [`ART.picHen`, `ART.picCow`]; scene `ART.picLake`; line 1; swims
  5. Mouse eats the cheese. / Rabbit eats the carrot. — Who eats the carrot? (Who) → `ART.picRabbit` [`ART.picMouse`, `ART.picMonkey`]; scene `ART.picCarrot`; line 2; carrot
  6. Pig rolls in the mud. / Cow eats the grass. — Who eats the grass? (Who) → `ART.picCow` [`ART.picPig`, `ART.picHorse`]; scene `ART.picGrass`; line 2; grass
- **L2** (what / where; tiles = objects or places):
  7. Fox has a ball. / Owl has a book. — What does the owl have? (What) → `ART.picBook` [`ART.picBall`, `ART.picApple`]; scene `ART.picOwl`; line 2; book
  8. The cat sleeps in the box. / The dog sleeps on the bed. — Where does the cat sleep? (Where) → `ART.picBox` [`ART.picBed`, `ART.picTree`]; scene `ART.picCat`; line 1; box
  9. Bee flies to the flower. / Bird flies to the tree. — Where does the bird fly? (Where) → `ART.picTree` [`ART.picFlower`, `ART.picHouse`]; scene `ART.picBird`; line 2; tree
  10. Rabbit eats a carrot. / Monkey eats a banana. — What does the rabbit eat? (What) → `ART.picCarrot` [`ART.picBanana`, `ART.picCheese`]; scene `ART.picRabbit`; line 1; carrot
  11. Frog jumps into the lake. / Mouse hides in the shoe. — Where does the mouse hide? (Where) → `ART.picShoe` [`ART.picLake`, `ART.picBox`]; scene `ART.picMouse`; line 2; shoe
  12. Hen finds an egg. / Duck finds a shell. — What does the hen find? (What) → `ART.picEgg` [`ART.picShell`, `ART.picNut`]; scene `ART.picHen`; line 1; egg
- **L3** (integration across both lines; tiles = one kind):
  13. Fox has a hat. / Owl takes the hat. — Who has the hat now? (Who) → `ART.picOwl` [`ART.picFox`, `ART.picFrog`]; scene `ART.picHat`; both; takes
  14. Cat wants the fish. / Dog gives the fish to Cat. — Who gets the fish? (Who) → `ART.picCat` [`ART.picDog`, `ART.picBee`]; scene `ART.picFish`; both; gives
  15. The ball is in the box. / Dog takes the ball to the bed. — Where is the ball now? (Where) → `ART.picBed` [`ART.picBox`, `ART.picTree`]; scene `ART.picBall`; both; bed
  16. Bee has a flower. / Bee gives it to Frog. — Who has the flower now? (Who) → `ART.picFrog` [`ART.picBee`, `ART.picDuck`]; scene `ART.picFlower`; both; gives
  17. Mouse hides in the shoe. / Then Mouse runs to the box. — Where is the mouse now? (Where) → `ART.picBox` [`ART.picShoe`, `ART.picBed`]; scene `ART.picMouse`; both; box
  18. Rabbit has a carrot. / Rabbit gives it to Pig. — Who eats the carrot now? (Who) → `ART.picPig` [`ART.picRabbit`, `ART.picMouse`]; scene `ART.picCarrot`; both; gives

Every line is ≤ 8 words; every scene picture is the object, place or asked-about character, never the answer. Play list: 12 items per Rules, shuffled within level, no item repeats except by re-queue; the correct tile's slot never repeats twice running.

## Rules
- Item count: 12 (re-queued repeats replace unplayed items).
- Difficulty progression: 2 consecutive first-try correct → next level (cap L3).
- Adaptation: a wrong tap, or wrong first-try on 2 consecutive items → next item one level down (floor L1); a single miss re-queues the item after 2 intervening items.
- What happens on a correct answer: `ANIM.pop`, `tone("correct")`, praise rotation ["well_done", "great_job", "excellent", "you_did_it", "keep_going"] on every first-try item, `ART.wordMark` under the key word + `ART.lineGlow` on the answer line, elephant `ANIM.trumpet`, rail dot, next item after 900 ms.
- What happens on a wrong answer:
  - Answer taken from the scene picture or by salience (any wrong character/object): `ANIM.nudge` + `tone("nudge")`, then the answer line glows for 1200 ms; tiles re-shuffle.
  - Recency (the last-mentioned character/thing tapped): the same line glow — it lands on line 1 when the answer is there.
  - L3 integration miss: line 1 glows, then line 2, 600 ms apart.
  - Second wrong tap: the line glow plus `ART.wordMark` under the key word; then the show-me ring on the correct tile.
- Retry behaviour: attempt 1 → attempt 2 after the line glow → attempt 3 with the word mark and the show-me ring; solved-with-help. No attempt 4; the item re-queues later.
- Finish condition: 12 items. No losing state, no clock.

## Strings
- `GameCore.t()` keys: `t("start")`, `t("question_x_of_y")`, `t("all_done")`, `t("play_again")`, `t("menu")`, `t("well_done")`, `t("great_job")`, `t("excellent")`, `t("you_did_it")`, `t("keep_going")`.
- Game-specific: `title` = "Who Said It". The texts and questions are content from `LOCALE_DATA`, not UI strings.

## Sound
`tone("correct")` on a correct tap; `tone("nudge")` on a wrong tap; `tone("tap")` when a line glow starts; `tone("finish")` once. Silent under `?sound=off`. The text is never read aloud.

## Testing checklist
- [ ] Works in all 11 languages (chrome strings change; `?lang=it` plays the English texts until an Italian set exists and nothing breaks).
- [ ] Works at narrow width (400-px iframe: the text card, both lines, the question and three tiles visible; no line wraps to a third line).
- [ ] Keyboard operable (Tab across the three tiles; Enter picks).
- [ ] Never auto-starts.
- [ ] No losing state (wrong taps never end the session; the show-me ring always completes the item).
- [ ] The scene picture never shows the answer (for "Who wants a nut?" it shows the nut, not the owl).
- [ ] Tapping the fox for "Who wants a nut?" nudges it and lights the line "Owl says, ..." for about a second.
- [ ] Tapping the owl pops it and underlines "nut" in the text.
- [ ] Where-questions offer three places and what-questions three objects; who-questions three characters.
- [ ] At the third level a wrong tap lights line 1 and then line 2.
- [ ] After a wrong tap the tiles come back in a different order.
- [ ] A missed item comes back two items later.
- [ ] The finish screen shows twelve picture chips with filled or hollow dots and no score.
- [ ] With `?sound=off` nothing is audible.
