# 150 — Read and Match

## Identity
- Slug: `read-and-match-sentence`
- Subject / topic: Literacy / reading a short sentence for meaning — choosing the one picture of three that the sentence describes, when the pictures differ in a single detail
- Age band: `6-8`
- Interaction pattern: `P1` — tap one of N (three picture cards)
- Estimated build size: ~480 lines

Shared contract: `catalogue/BUILD-CONVENTIONS.md`. Pattern contract: `catalogue/PATTERNS.md` P1. Locale note: the sentences are language-bound (F-128: word order differs — V2 in de/nl/sv/da/no, free order in fi — so sentences are per-locale sets, never translated English) and live in `LOCALE_DATA`; the SCENES are language-neutral compositions of emoji and shapes and are shared by all locales. Nothing is spoken (no audio files). F-125 note: the three pictures share every detail but one, and the distractors match the sentence's FIRST words, so guessing from the first word plus a picture fails — the sentence must be read to the end.

## Learning
- Objective: Reads a 4-6-word sentence and taps the picture it describes, when the other two pictures match all but one word (the animal, the object, the number, the position or the size).
- Prerequisites: Decodes regular words and a few high-frequency function words in the play language (6-8 decoding games); knows the pictured animals and objects.
- Curriculum links: F-22 (reading short texts with comprehension by 8 in all twelve systems), F-31 row "Read short text; retell/sequence; simple inference" — conservative 8, earliest 6 → 6-8 (US RL.K.10 / RF.1.4 "read with sufficient accuracy and fluency to support comprehension"; England Y1 "understanding … by drawing on what they already know"; Germany Klasse 1-2 "Sätze sinnverstehend lesen"; France CP "comprendre des phrases"; Spain 1º "comprensión de frases"; Brazil EF01LP-EF02LP "ler e compreender"; Netherlands groep 3-4 "begrijpend lezen AVI"; Sweden åk 1-2 "läsförståelse"; Denmark 1.-2. klasse; Norway 2. trinn; Finland 1.-2. luokka "lukemisen ymmärtäminen"). Demand: F-1 (reading comprehension 5 of 15; sight words 7).
- Common misconceptions (F-129, F-125, F-128), each with this game's response:
  1. **Reading the first word or two and guessing the rest from the picture (three-cueing) — F-125.** Response: every distractor matches the sentence's opening words; on a wrong tap the KEY word — the one the tapped picture contradicts — gains `ART.keyBar` beneath it and grows (`ANIM.grow`) for 1400 ms while the contradicting element in the tapped card `ANIM.pulse`s: "the sentence says DOG; this card shows a cat".
  2. **Not reading to the end — the last word carries the difference ("… a ball" vs "… an apple") — F-129.** Response: L1 and L3 place the differing detail at the END of the sentence on half the items; the key-bar cue lands on the last word, teaching where to look.
  3. **Skipping small function words that carry meaning (on / under / in; two / three) — F-129.** Response: L2 items differ ONLY in a position word or a number word; the scenes make the difference visible (an animal on top of a table vs under it; two vs three); the key bar lands on the small word.
  4. **Integrating two details (big + under; two + small) — F-129 "poor comprehenders don't integrate across the sentence".** Response: L3 sentences carry two constraints and each distractor breaks a different one; the cue names the broken one each time.
  5. **Choosing by card position — F-65.** Response: card positions shuffle per item; the correct slot never repeats twice running; after two wrong taps the show-me ring identifies the card.

## How it plays
1. **Start screen**: title "Read and Match", the chipmunk (`ART.chipmunk`) at (360, 200), Start, picker.
2. **Item 1 (L1: "The dog has a ball.")**: rail of 12 dots (§6) with `t("question_x_of_y")` at (600, 28). Zone A: the sentence on a strip (`ART.sentenceStrip`, 640 × 80) centred at (360, 150), each word a separate text object (30 px `THEME.font.body` `THEME.colour.ink`, 14 px word gaps, centred as a group, wrapping to two lines if wider than 600 px); the chipmunk at (640, 80) above the strip's right end. Caption `S("tapThePicture")` ("Tap the picture the sentence tells about") at (360, 225), 22 px `THEME.colour.inkSoft`. Zone B: three scene cards (`ART.card`, 190 × 160) at y = 370, x = 150 / 360 / 570, each a `makeTile` whose face is a composed scene: card 1 `ART.picDog` with `ART.picBall`, card 2 `ART.picCat` with `ART.picBall`, card 3 `ART.picDog` with `ART.picApple` (shuffled).
3. **Answering**: the child taps a card.
   - **Correct**: `ANIM.pop`, `tone("correct")`, praise pop (rotation); the sentence strip `ANIM.glide`s down to sit just above the correct card (y = 260) and shrinks to 0.7 scale — the sentence is now captioning its picture; the chipmunk `ANIM.hop`; rail dot fills; next item after 800 ms (`ANIM.appear` on the new strip and cards).
   - **Wrong (the cat card)**: `ANIM.nudge`, `tone("nudge")`, the card de-selects and stays enabled; the **key-word cue**: `ART.keyBar` slides in under "dog" (`ANIM.barIn`) and the word `ANIM.grow`s, while the cat in the tapped card `ANIM.pulse`s — both for 1400 ms, then the bar fades and the word settles. Attempt 2.
   - **Second wrong**: the cue for that card's own key word; then the correct card gains `ART.showRing` with `ANIM.showMe`; tapping it completes the item as solved-with-help (no praise pop).
4. **Items 2-12**: per Content/Rules. L1 4-5-word sentences differing in the animal or the object; L2 5-6 words differing in a number or position word; L3 6 words with two constraints, each distractor breaking one.
5. **Finish**: `t("all_done")` (360, 110); the chipmunk (360, 200) `ANIM.celebrate`; the summary = the twelve correct scene cards as `ART.cardMini` (84 × 70) in two rows of six from y = 340 (x = 360 − 2.5 × 96 + i × 96, row pitch 84) with the scene drawn at 0.4 scale — the pictures read; `t("question_x_of_y", {n: firstTry, total: 12})` at (360, 470) 20 px `inkSoft`; `play_again` (250, 510), `menu` (470, 510); `tone("finish")`.

Session ≈ 6 minutes.

## Art registry
```js
const ART = {
  chipmunk:      { kind: "emoji", value: "🐿️", size: 72 },
  sentenceStrip: { kind: "shape", shape: "roundRect", w: 640, h: 80, fill: "surface", stroke: "line", strokeWidth: 2, radius: 16 },
  keyBar:        { kind: "shape", shape: "rect", w: 60, h: 6, fill: "accent" },   // width = measured width of the key word; 20 px below its baseline
  card:          { kind: "shape", shape: "roundRect", w: 190, h: 160, fill: "surface", stroke: "line", strokeWidth: 2, radius: 16 },
  cardMini:      { kind: "shape", shape: "roundRect", w: 84, h: 70, fill: "surface", stroke: "structure", strokeWidth: 2, radius: 10 },
  showRing:      { kind: "shape", shape: "roundRect", w: 202, h: 172, stroke: "structure", strokeWidth: 4, radius: 20 },
  dotEmpty:      { kind: "shape", shape: "circle", r: 8, stroke: "line", strokeWidth: 2 },
  dotFull:       { kind: "shape", shape: "circle", r: 8, fill: "structure" },
  // scene furniture (shapes; language-neutral)
  tableTop:      { kind: "shape", shape: "roundRect", w: 110, h: 12, fill: "structureSoft", stroke: "structure", strokeWidth: 2, radius: 6 },
  tableLeg:      { kind: "shape", shape: "rect", w: 8, h: 48, fill: "structure" },
  openBox:       { kind: "shape", shape: "rect", w: 96, h: 64, fill: "surface2", stroke: "structure", strokeWidth: 3 },   // an open-topped box: no top edge drawn (three sides)
  // scene actors (English name in the comment)
  picDog:    { kind: "emoji", value: "🐶", size: 56 },   // dog
  picCat:    { kind: "emoji", value: "🐱", size: 56 },   // cat
  picRabbit: { kind: "emoji", value: "🐰", size: 56 },   // rabbit
  picFrog:   { kind: "emoji", value: "🐸", size: 56 },   // frog
  picBear:   { kind: "emoji", value: "🐻", size: 56 },   // bear
  picPig:    { kind: "emoji", value: "🐷", size: 56 },   // pig
  picMouse:  { kind: "emoji", value: "🐭", size: 56 },   // mouse
  picHen:    { kind: "emoji", value: "🐔", size: 56 },   // hen
  picDuck:   { kind: "emoji", value: "🦆", size: 56 },   // duck
  picBee:    { kind: "emoji", value: "🐝", size: 40 },   // bee
  picChick:  { kind: "emoji", value: "🐤", size: 40 },   // chick
  // scene objects
  picBall:    { kind: "emoji", value: "⚽", size: 40 },   // ball
  picApple:   { kind: "emoji", value: "🍎", size: 40 },   // apple
  picFish:    { kind: "emoji", value: "🐟", size: 40 },   // fish
  picCarrot:  { kind: "emoji", value: "🥕", size: 40 },   // carrot
  picBanana:  { kind: "emoji", value: "🍌", size: 40 },   // banana
  picBalloon: { kind: "emoji", value: "🎈", size: 40 },   // balloon
  picGift:    { kind: "emoji", value: "🎁", size: 40 },   // gift
  picFlower:  { kind: "emoji", value: "🌸", size: 40 },   // flower
  picPizza:   { kind: "emoji", value: "🍕", size: 40 },   // pizza
  picEgg:     { kind: "emoji", value: "🥚", size: 40 },   // egg
  picLeaf:    { kind: "emoji", value: "🍃", size: 56 },   // leaf
  picCake:    { kind: "emoji", value: "🎂", size: 40 }    // cake
};
```
No emoji newer than Unicode 12; no `fallback` needed.

## Animation registry
```js
const ANIM = {
  pop:       { scale: 1.12, duration: 140, ease: "Back.Out", yoyo: true, trigger: "correct card" },
  nudge:     { x: "+=10", duration: 80, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "wrong card" },
  glide:     { duration: 300, ease: "Sine.InOut", trigger: "sentence strip down to y = 260 above the correct card, scale 0.7 (x,y at call)" },
  barIn:     { scaleX: 1, duration: 200, ease: "Sine.Out", trigger: "keyBar under the key word (from scaleX 0, left-anchored)" },
  grow:      { scale: 1.2, duration: 200, ease: "Back.Out", trigger: "the key word; reversed by settle" },
  settle:    { scale: 1.0, duration: 120, ease: "Sine.Out", trigger: "the key word after 1400 ms" },
  pulse:     { scale: 1.15, duration: 300, ease: "Sine.InOut", yoyo: true, repeat: 2, trigger: "the contradicting element in the tapped card" },
  fadeOut:   { alpha: 0, duration: 250, ease: "Sine.In", trigger: "keyBar after 1400 ms" },
  hop:       { y: "-=12", duration: 120, ease: "Sine.Out", yoyo: true, repeat: 1, trigger: "chipmunk on a correct answer" },
  appear:    { alpha: 1, scale: 1, duration: 200, ease: "Back.Out", trigger: "new strip and cards (from alpha 0, scale 0.6)" },
  showMe:    { alpha: 1, duration: 500, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "ring on the correct card (from alpha 0.2)" },
  celebrate: { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "finish chipmunk" }
};
```
No flashing; `showMe` cycles at 1 Hz.

## Screen layout
```
y   0 ┌──────────────────────────────────────────────────────────────┐
      │ [lang]        ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○  rail y=28   "1 of 12" (600,28)│  zone T
 56   ├──────────────────────────────────────────────────────────────┤
      │                                              chipmunk (640,80)│
      │   ┌──────────────────────────────────────────────────┐       │  zone A
      │   │        The  dog  has  a  ball.   (360,150)        │ strip │
      │   └──────────────────────────────────────────────────┘ 640×80│
      │          "Tap the picture the sentence tells about" (360,225)  │
260   ├──────────────────────────────────────────────────────────────┤
      │   ┌──────────┐      ┌──────────┐      ┌──────────┐            │
      │   │ cat ball │      │ dog ball │      │ dog apple│  cards y=370│  zone B
      │   │(150,370) │      │(360,370) │      │(570,370) │  190×160   │
      │   └──────────┘      └──────────┘      └──────────┘            │
480   ├──────────────────────────────────────────────────────────────┤
      │                                                              │  zone C
560   └──────────────────────────────────────────────────────────────┘
```
Fixed layout, FIT scaling. Scene layouts inside a card (card-centre relative) are given in Content.

## Visual specification
- Background `THEME.colour.bg`; rail per §6: 12 × `ART.dotEmpty` (x = 239 + i × 22, y = 28) → `ART.dotFull`; `t("question_x_of_y")` at (600, 28) 18 px `inkSoft`.
- `ART.sentenceStrip` centred (360, 150); words 30 px `THEME.font.body` `THEME.colour.ink`, each its own text object, laid left to right from the group's left edge with 14 px gaps; if the total width exceeds 600 px the words wrap to a second line at y + 36 (two lines maximum; the strip grows to 116 px high). `ART.keyBar` under the key word, width = the word's measured width.
- Caption `S("tapThePicture")` at (360, 225), 22 px `THEME.font.body` `THEME.colour.inkSoft`, `wordWrap` width 620.
- `ART.chipmunk` (640, 80).
- Cards: `makeTile` 190 × 160 (`ART.card` tokens) whose face is a composed scene drawn from the item's scene list; each scene element is drawn through the ART helper at the listed offset and scale; selected = library selected look.
- Scene conventions (card-centre relative): a lone actor at (0, +8); actor + object: actor at (−30, +8), object at (+45, +12); **on the table**: `ART.tableTop` at (0, +30) with `ART.tableLeg`s at (−40, +60) and (+40, +60), actor at (0, −12); **under the table**: table as above, actor at (0, +58) scaled 0.75; **in the box**: `ART.openBox` at (0, +28), actor at (0, +24) scaled 0.75 drawn OVER the box; **over the flower**: flower at (0, +40), bees at y = −30 spaced 40 px, centred; **counts**: repeated actors/objects spaced 40 px, centred as a row; **big / small**: scale 1.3 / 0.7 of the actor's ART size. Nothing is written inside a card.
- `ART.showRing` behind the correct card. Tap floors: cards 190 × 160 (≥ 56); gap between cards 20. Tab order: cards left to right.

## Content
Language-bound sentences; language-neutral scenes. `LOCALE_DATA[GameCore.lang].items` supplies, per level, items `{ words: ["The","dog","has","a","ball."], correct: <scene>, wrong: [{ scene: <scene>, key: <word index> }, { … }] }`; a scene is a list of `{ art, dx, dy, scale }` or one of the named conventions above. The English (`en`) set is authored in full below. **Other locales: a native sentence set is required — en pilot.** Native authors keep the scenes and write sentences in that language's natural order (de/nl/sv/da/no V2 "Der Hund hat einen Ball", fi free order with case endings, es/pt/it/fr article and gender agreement), then set each distractor's `key` to the index of the word the wrong scene contradicts in THAT sentence — never the English index. Until then `LOCALE_DATA[lang] = "en"` and the English sentences play with the chrome in the chosen language.

Scene vocabulary → ART keys (the scene lists below use these names): dog `ART.picDog` · cat `ART.picCat` · rabbit `ART.picRabbit` · frog `ART.picFrog` · bear `ART.picBear` · pig `ART.picPig` · mouse `ART.picMouse` · hen `ART.picHen` · duck `ART.picDuck` · bee `ART.picBee` · chick `ART.picChick` · ball `ART.picBall` · apple `ART.picApple` · fish `ART.picFish` · carrot `ART.picCarrot` · banana `ART.picBanana` · balloon `ART.picBalloon` · gift `ART.picGift` · flower `ART.picFlower` · pizza `ART.picPizza` · egg `ART.picEgg` · leaf `ART.picLeaf` · cake `ART.picCake` · table `ART.tableTop` + `ART.tableLeg` · box `ART.openBox`.

Items (sentence; correct scene; distractor 1 → key word; distractor 2 → key word):
- **L1 — 4-5 words; the animal or the object differs** (misconceptions 1 and 2): ("The dog has a ball."; dog + ball; cat + ball → "dog"; dog + apple → "ball.") · ("The cat eats a fish."; cat + fish; cat + apple → "fish."; dog + fish → "cat") · ("The rabbit has a carrot."; rabbit + carrot; rabbit + banana → "carrot."; pig + carrot → "rabbit") · ("The bear holds a balloon."; bear + balloon; bear + gift → "balloon."; frog + balloon → "bear") · ("The duck is in the box."; duck in the box; duck on the table → "in"; frog in the box → "duck") · ("The mouse is on the table."; mouse on the table; mouse under the table → "on"; cat on the table → "mouse") · ("The pig has a flower."; pig + flower; pig + pizza → "flower."; bear + flower → "pig") · ("The hen has two eggs."; hen + 2 eggs; hen + 1 egg → "two"; duck + 2 eggs → "hen")
- **L2 — 5-6 words; only a number word or a position word differs** (misconception 3): ("Two cats sit on the table."; 2 cats on the table; 1 cat on the table → "Two"; 2 cats under the table → "on") · ("The frog is under the leaf."; frog under a leaf (leaf at (0, −20), frog at (0, +36) scaled 0.75); frog on the leaf (frog at (0, −40) scaled 0.75, leaf at (0, +10)) → "under"; bee under the leaf → "frog") · ("Three bees fly over the flower."; 3 bees over the flower; 2 bees over the flower → "Three"; 3 bees over the apple → "flower.") · ("The small dog is in the box."; small dog in the box; big dog in the box → "small"; small dog on the table → "in") · ("The big frog sits on the table."; big frog on the table; small frog on the table → "big"; big frog under the table → "on") · ("The rabbit has two carrots."; rabbit + 2 carrots; rabbit + 3 carrots → "two"; rabbit + 2 apples → "carrots.") · ("The mouse hides under the leaf."; mouse under the leaf; mouse on the leaf → "under"; mouse under the table → "leaf.") · ("The bear holds two balloons."; bear + 2 balloons; bear + 1 balloon → "two"; bear + 2 gifts → "balloons.")
- **L3 — 6 words; two constraints, each distractor breaks one** (misconception 4): ("The big cat sits on the table."; big cat on the table; small cat on the table → "big"; big cat under the table → "on") · ("Two small frogs sit on the leaf."; 2 small frogs on the leaf; 2 big frogs on the leaf → "small"; 3 small frogs on the leaf → "Two") · ("The dog has a ball and an apple."; dog + ball + apple; dog + ball + banana → "apple."; cat + ball + apple → "dog") · ("The pig in the box has a flower."; pig in the box + flower; pig on the table + flower → "in"; pig in the box + pizza → "flower.") · ("Three bees fly over the big flower."; 3 bees over a big flower (scale 1.3); 3 bees over a small flower (scale 0.7) → "big"; 2 bees over the big flower → "Three") · ("The small mouse hides under the leaf."; small mouse under the leaf; big mouse under the leaf → "small"; small mouse on the leaf → "under") · ("The hen has one egg and one chick."; hen + 1 egg + 1 chick; hen + 2 eggs + 1 chick → "one"; hen + 1 egg + 1 duck → "chick.") · ("The rabbit and the bear have a cake."; rabbit + bear + cake; rabbit + cat + cake → "bear"; rabbit + bear + pizza → "cake.")

Scene notes: "actor + two objects" draws the actor at (−50, +8) and the objects at (+15, +12) and (+60, +12); "two actors + object" draws the actors at (−55, +8) and (−5, +8) and the object at (+55, +12); "1 egg + 1 chick" is two objects. The key word index is the position of the named word in the `words` array (punctuation attached to the word).

Play list: 12 items; start at L1; levels per Rules; no sentence repeats within a session; card positions shuffled per item; the correct slot never repeats twice running (§13). In every item the correct scene and both distractors share the sentence's first two words' content (same opening), so the first words never single out a card.

## Rules
- Item count: 12.
- Difficulty progression: 2 consecutive first-try correct → next level (cap L3).
- Adaptation: a wrong tap, or wrong first-try on 2 consecutive items → next item one level down (floor L1).
- What happens on a correct answer: `ANIM.pop`, `tone("correct")`, praise rotation ["well_done", "great_job", "excellent", "you_did_it", "keep_going"], the sentence glides down to caption its card, chipmunk `ANIM.hop`, rail dot, next item after 800 ms.
- What happens on a wrong answer (per anticipated mistake):
  - Wrong animal or object (guessed from the first words): `ANIM.nudge`, `tone("nudge")`; `ART.keyBar` under the contradicted word ("dog" / "ball.") with `ANIM.grow`, the contradicting element in the tapped card `ANIM.pulse`s, 1400 ms.
  - Wrong number or position (small word skipped): the same cue on "two" / "on" / "under" / "in"; the tapped card's actor pulses (its position or count is the difference).
  - One of two constraints broken (L3): the cue on whichever word that card breaks (each distractor carries its own key).
  - Position habit (a wrong card at the same slot twice): no extra cue; the show-me ring after the second wrong tap.
- Retry behaviour: attempt 1 → attempt 2 after the cue → attempt 3 with the show-me ring; solved-with-help. No attempt 4.
- Finish condition: 12 items. No losing state, no clock.

## Strings
- `GameCore.t()` keys: `t("start")`, `t("question_x_of_y")`, `t("all_done")`, `t("play_again")`, `t("menu")`, `t("well_done")`, `t("great_job")`, `t("excellent")`, `t("you_did_it")`, `t("keep_going")`.
- Game-specific: `title` = "Read and Match"; `tapThePicture` = "Tap the picture the sentence tells about". The sentences are content from `LOCALE_DATA`, not UI copy.

## Sound
`tone("correct")` on the right card; `tone("nudge")` on a wrong card; `tone("tap")` when the key bar slides in; `tone("finish")` once. Silent under `?sound=off`. The sentence is never read aloud; the child reads it.

## Testing checklist
- [ ] Works in all 11 languages (chrome strings change; `?lang=xx` reads `LOCALE_DATA.xx` and falls back to `en` without crashing while native sentence sets are pending — reviewer notes "en pilot").
- [ ] Works at narrow width (400-px iframe: the sentence strip and three cards visible and separate; a six-word sentence fits on one or two lines inside the strip).
- [ ] Keyboard operable (Tab across the three cards; Enter picks).
- [ ] Never auto-starts.
- [ ] No losing state (wrong taps never end the session; the ring always completes the item).
- [ ] For "The dog has a ball." the three cards show dog + ball, cat + ball and dog + apple; tapping the cat card wiggles it, underlines "dog" (which grows) and pulses the cat.
- [ ] Tapping the dog + apple card underlines "ball." — the last word.
- [ ] At the second level "Two cats sit on the table." offers one cat on the table and two cats under it as the wrong cards, and the cue lands on "Two" or "on".
- [ ] At the third level each wrong card breaks a different word and the cue names that word.
- [ ] After a correct tap the sentence moves down to sit above its picture.
- [ ] The correct card is never in the same position twice in a row; the three cards always share the sentence's opening.
- [ ] The finish screen shows the twelve correct pictures small, the first-try count, and no score beyond that count.
- [ ] With `?sound=off` nothing is audible.
