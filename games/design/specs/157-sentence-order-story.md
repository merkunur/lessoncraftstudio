# 157 — Sentence Order

## Identity
- Slug: `sentence-order-story`
- Subject / topic: Literacy / story sequencing — ordering three sentences first-to-last so they tell one story, using time words and then cause-and-effect links as the cues
- Age band: `8-9`
- Interaction pattern: `P4` — tap in order (per-tap judgement)
- Estimated build size: ~470 lines

Shared contract: `catalogue/BUILD-CONVENTIONS.md`. Pattern contract: `catalogue/PATTERNS.md` P4. Locale note: the sentence sets are language-bound (F-128 — time words sit in different positions and word order differs per language; F-129; A-15) and live in `LOCALE_DATA`; English is authored in full, the other ten locales are declared as needing a native set (en pilot). Every story is picture-supported by a two-picture scene strip that shows the story's things, never the order. Nothing is spoken. Stage height is 620 (BUILD-CONVENTIONS §2 allows up to 720) so three slots and three cards each keep a 56 px tap height.

## Learning
- Objective: Taps three sentence cards in the order that makes the story happen first-to-last, using the time word in each sentence (First / Then / Last; morning / lunch / night) and, at the top level, the cause-and-effect and back-reference links ("a key … it … the door") when no time word is present.
- Prerequisites: Reads sentences of up to 8 words fluently (games 080, 155). Has ordered picture panels first-to-last (game 154 for who/where; picture sequencing games earlier in the catalogue).
- Curriculum links: F-22 (reading short narrative texts with comprehension, retell and sequence by 8 in all twelve systems; writing a short text by 8-9), F-129 ("sequencing by salience not story time … picture-sequence with cause→effect arrows"), F-128 (per-locale sentence sets, never translated English), F-31 row "Read short text; retell/sequence; simple inference" — conservative 8 → 8-9 (US RL.2.5 / W.3.3.c "use temporal words … to signal event order"; England Y2-3 "sequencing sentences to form short narratives"; Germany Klasse 3 "Texte in die richtige Reihenfolge bringen"; France CE2 "ordre chronologique d'un récit"; Netherlands groep 5 "volgorde in een verhaal"; Spain 2º ciclo "ordenar secuencias"; Brazil EF03LP24; Sweden åk 3 "berättande texters struktur"; Finland 3. luokka "tapahtumien järjestys").
- Common misconceptions (F-129, F-128), each with this game's response:
  1. **Orders by salience — the most exciting sentence first (the splash, the crash).** Response: a wrong tap nudges the card and underlines the time word in EVERY card (`ART.timeMark`, `ANIM.markIn`) for 1200 ms — First / Then / Last, or morning / lunch / night — so the child compares the cues, not the excitement; the next empty slot pulses (`ART.nextPulse`).
  2. **Ignores time words that are not "First / Then / Last" (does not read "After lunch" as later than "In the morning").** Response: L2 stories use only such phrases; the same underline cue lands on the phrase, and on the second wrong tap for a slot the correct next card gains `ART.hintRing` so the child sees which phrase means "next".
  3. **Cannot use cause-and-effect or back-reference to order (puts "The door opens" before "She tries the key in the door").** Response: L3 stories carry no time words; a wrong tap underlines the back-reference word in the tapped card ("it", "the door") AND the word it refers back to in the card that must come earlier (`ART.linkMark`) and draws an arrow (`ART.arrow`) from the earlier card to the tapped one for 1200 ms — the thing must be introduced before it can be referred to.
  4. **Puts the ending first because it is the "result" (reads the story backwards).** Response: the rail's position numerals (`ART.railNum` 1, 2, 3) and the read-back after each correct placement (`ANIM.readBack` over the filled slots) keep the story growing from the top; undo of the last slot is free.
  5. **Position habit — always taps the top card first.** Response: the cards' order is shuffled per item; the correct first card's position never repeats twice running (§13).

## How it plays
1. **Start screen**: title "Sentence Order", the cow (`ART.cow`) at (360, 200), Start, picker.
2. **Item 1 (L1: seed → plant → flower)**: rail of 12 dots (§6) at y = 28; `t("question_x_of_y")` at (360, 48). Zone A: the scene strip (`ART.sceneCard`, 240 × 56) at (360, 92) holding two pictures at 40 px (`ART.picSeed` at (330, 92), `ART.picFlower` at (390, 92)); below it the ordered rail — three slots (`ART.slot`, 560 × 52, dashed) at x = 380, y = 150 / 208 / 266, each with its position numeral (`ART.railNum`, 22 px) at x = 84. Zone B: three sentence cards (`ART.sentenceCard`, 560 × 56, text 20 px) at x = 360, y = 350 / 418 / 486, shuffled: "Then Fox plants it in a pot." / "Last, a small flower opens." / "First, Fox finds a seed.". Caption `S("putInOrder")` ("Put the story in order") at (360, 318), 20 px `THEME.font.body` `THEME.colour.inkSoft`. The cow stands at (60, 570).
3. **Tapping in order**: the child taps a card.
   - **Correct next card**: `tone("tap", k)` (k = slot number, pitch climbing down the rail), the card glides (`ANIM.glide`) into the next free slot (the slot's stroke turns solid `structure`); the filled slots read back (`ANIM.readBack`, top to bottom). Tapping the LAST-filled slot's card returns it to its place in zone B (undo, `ANIM.glide`, free); earlier slots are locked.
   - **Wrong card**: `ANIM.nudge`, `tone("nudge")`, then the cue for the level: at L1-L2 the time word/phrase in every card underlines (`ART.timeMark`) and the next empty slot pulses (`ART.nextPulse`, `ANIM.pulse`); at L3 the back-reference link (`ART.linkMark` on both words + `ART.arrow`) shows for 1200 ms. Cards disabled during the cue. The item counts as retried.
   - **Second wrong tap for the same slot**: the cue again, then the correct next card gains `ART.hintRing` (`ANIM.showMe`) until tapped; the item is solved-with-help from here.
   - **All three slots filled** (only possible in the right order): the whole story appears as one paragraph (`ART.storyText`, 20 px, 3 lines) at (360, 580) over `ART.storyGlow`, `tone("correct")`, praise pop (only if no wrong tap), the cow `ANIM.wag`; rail dot; next item after 1000 ms (`ANIM.appear`).
4. **Items 2-12**: per Content/Rules. L1 explicit First / Then / Last; L2 time phrases (morning / lunch / night; before / at / after; one day / soon / at last); L3 no time words — cause-and-effect and back-reference only.
5. **Re-queue** (F-41): an item with any wrong tap re-enters after 2 intervening items with a fresh card shuffle; the count stays 12.
6. **Finish**: `t("all_done")` (360, 110); the cow (360, 200) `ANIM.celebrate`; the summary = the twelve stories as one-line chips (`ART.storyChip`, 640 × 24, 14 px: the three first words of each sentence joined by arrows, e.g. "First… → Then… → Last…") stacked from y = 300 at 24 px pitch, with `ART.dotFull` at the left of first-try items and `ART.dotEmpty` for helped ones; `play_again` (250, 570), `menu` (470, 570); `tone("finish")`.

Session ≈ 7 minutes.

## Art registry
```js
const ART = {
  cow:          { kind: "emoji", value: "🐮", size: 80 },                     // mascot
  sceneCard:    { kind: "shape", shape: "roundRect", w: 240, h: 56, fill: "surface", stroke: "structure", strokeWidth: 3, radius: 14 },
  slot:         { kind: "shape", shape: "roundRect", w: 560, h: 52, fill: "surface2", stroke: "line", strokeWidth: 2, radius: 10 },   // dashed (lineDash [8,6]) while empty; solid structure stroke when filled
  railNum:      { kind: "text",  value: "", size: 22, font: "display", color: "structure" },
  sentenceCard: { kind: "shape", shape: "roundRect", w: 560, h: 56, fill: "surface", stroke: "line", strokeWidth: 2, radius: 12 },   // sentence 20 px body ink, left-aligned from x = 100
  timeMark:     { kind: "shape", shape: "rect", w: 40, h: 4, fill: "accent" },                          // under a time word/phrase; width at runtime
  linkMark:     { kind: "shape", shape: "rect", w: 40, h: 4, fill: "structure" },                       // under a back-reference word and its antecedent; width at runtime
  arrow:        { kind: "shape", shape: "polygon", points: [[-8,-6],[8,0],[-8,6]], fill: "structure" },   // arrowhead; the shaft is a line from the antecedent card to the tapped card
  arrowShaft:   { kind: "shape", shape: "line", w: 60, stroke: "structure", strokeWidth: 3 },           // endpoints set at runtime
  nextPulse:    { kind: "shape", shape: "roundRect", w: 572, h: 64, stroke: "structure", strokeWidth: 3, radius: 12 },
  hintRing:     { kind: "shape", shape: "roundRect", w: 572, h: 68, stroke: "structure", strokeWidth: 4, radius: 14 },
  storyText:    { kind: "text",  value: "", size: 20, font: "body", color: "structure" },
  storyGlow:    { kind: "shape", shape: "roundRect", w: 640, h: 72, fill: "structureSoft", radius: 12 },
  storyChip:    { kind: "shape", shape: "roundRect", w: 640, h: 24, fill: "structureSoft", stroke: "structure", strokeWidth: 1, radius: 6 },
  dotEmpty:     { kind: "shape", shape: "circle", r: 8, stroke: "line", strokeWidth: 2 },
  dotFull:      { kind: "shape", shape: "circle", r: 8, fill: "structure" },
  // scene pictures (the story's things; English gloss in the comment)
  picSeed:      { kind: "emoji", value: "🌱", size: 40 },   // seed / seedling
  picFlower:    { kind: "emoji", value: "🌸", size: 40 },   // flower
  picEgg:       { kind: "emoji", value: "🥚", size: 40 },   // egg
  picCake:      { kind: "emoji", value: "🎂", size: 40 },   // cake
  picRain:      { kind: "emoji", value: "🌧️", size: 40 },   // rain / puddle
  picSun:       { kind: "emoji", value: "☀️", size: 40 },   // sun
  picBag:       { kind: "emoji", value: "🎒", size: 40 },   // bag
  picTent:      { kind: "emoji", value: "⛺", size: 40 },   // tent
  picStar:      { kind: "emoji", value: "⭐", size: 40 },   // star
  picYarn:      { kind: "emoji", value: "🧶", size: 40 },   // wool (Unicode 11)
  picCat:       { kind: "emoji", value: "🐱", size: 40 },   // cat
  picMoon:      { kind: "emoji", value: "🌙", size: 40 },   // moon / night
  picHen:       { kind: "emoji", value: "🐔", size: 40 },   // hen
  picPalette:   { kind: "emoji", value: "🎨", size: 40 },   // painting
  picHouse:     { kind: "emoji", value: "🏠", size: 40 },   // home
  picChick:     { kind: "emoji", value: "🐣", size: 40 },   // chick
  picBird:      { kind: "emoji", value: "🐦", size: 40 },   // bird
  picTomato:    { kind: "emoji", value: "🍅", size: 40 },   // tomato
  picKite:      { kind: "emoji", value: "🪁", size: 40 },   // kite (Unicode 12)
  picTree:      { kind: "emoji", value: "🌳", size: 40 },   // tree / park
  picKey:       { kind: "emoji", value: "🔑", size: 40 },   // key
  picDoor:      { kind: "emoji", value: "🚪", size: 40 },   // door
  picBanana:    { kind: "emoji", value: "🍌", size: 40 },   // banana
  picBear:      { kind: "emoji", value: "🐻", size: 40 },   // bear
  picBalloon:   { kind: "emoji", value: "🎈", size: 40 },   // balloon
  picRose:      { kind: "emoji", value: "🌹", size: 40 },   // rose (the thorn)
  picPond:      { kind: "emoji", value: "🌊", size: 40 },   // pond
  picBricks:    { kind: "emoji", value: "🧱", size: 40 },   // blocks / tower (Unicode 11)
  picFox:       { kind: "emoji", value: "🦊", size: 40 }    // fox
};
```
No emoji newer than Unicode 12 is used, so no `fallback` is required. Character names in the sentences are the animals' kind names (Fox, Bear) — never people's names.

## Animation registry
```js
const ANIM = {
  glide:     { duration: 260, ease: "Sine.InOut", trigger: "card to a slot / back to its zone-B place (x,y at call)" },
  nudge:     { x: "+=10", duration: 80, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "wrong card" },
  markIn:    { alpha: 1, duration: 200, ease: "Sine.Out", yoyo: true, hold: 1200, trigger: "timeMark / linkMark / arrow and arrowShaft (from alpha 0)" },
  pulse:     { scale: 1.02, duration: 300, ease: "Sine.InOut", yoyo: true, repeat: 2, trigger: "nextPulse on the next empty slot" },
  readBack:  { alpha: 0.4, duration: 150, ease: "Sine.InOut", yoyo: true, trigger: "each filled slot in turn, 300 ms apart, from slot 1" },
  showMe:    { alpha: 1, duration: 500, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "hintRing on the correct next card (from alpha 0.2)" },
  storyIn:   { alpha: 1, y: "-=6", duration: 300, ease: "Sine.Out", trigger: "storyText + storyGlow on completion (from alpha 0)" },
  wag:       { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 2, trigger: "cow on completion" },
  appear:    { alpha: 1, scale: 1, duration: 200, ease: "Back.Out", trigger: "new scene, slots and cards (from alpha 0, scale 0.6)" },
  celebrate: { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "finish cow" }
};
```
Implementation note: each sentence is drawn as one text object per WORD (20 px, 6 px gaps, left-aligned from the card's x = 100) so `ART.timeMark` / `ART.linkMark` can sit under a word or a phrase (a phrase gets one mark spanning its words).

## Screen layout
Stage 720 × 620 (`height: 620` in the Phaser config; nothing else changes).
```
y   0 ┌──────────────────────────────────────────────────────────────┐
      │ [lang]       ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○  rail y=28; "3 of 12" y=48 │  zone T
 56   ├──────────────────────────────────────────────────────────────┤
      │                 [ seed  flower ]  scene (360,92) 240×56        │
      │  1 ┌────────────────────────────────────────────┐ slot y=150   │  zone A
      │  2 ┌────────────────────────────────────────────┐ slot y=208   │
      │  3 ┌────────────────────────────────────────────┐ slot y=266   │
      │  numerals x=84       slots x=380 (560×52)                     │
310   ├──────────────────────────────────────────────────────────────┤
      │              "Put the story in order" (360,318)               │
      │  [ Then Fox plants it in a pot.                 ]  y=350      │  zone B
      │  [ Last, a small flower opens.                  ]  y=418      │
      │  [ First, Fox finds a seed.                     ]  y=486      │
      │   cards x=360 (560×56)                                        │
540   ├──────────────────────────────────────────────────────────────┤
      │ cow (60,570)      story paragraph (360,580) on completion     │  zone C
620   └──────────────────────────────────────────────────────────────┘
```
Fixed layout, FIT scaling.

## Visual specification
- Background `THEME.colour.bg`; rail per §6: 12 × `ART.dotEmpty` (x = 239 + i × 22) → `ART.dotFull`; `t("question_x_of_y")` at (360, 48).
- `ART.sceneCard` at (360, 92) with the item's two pictures at (330, 92) and (390, 92) at 40 px (three pictures: 300 / 360 / 420).
- Slots: `makeTile` 560 × 52 with `ART.slot` tokens (dashed while empty) at (380, 150 / 208 / 266); `ART.railNum` "1" / "2" / "3" at (84, same y). A placed card is drawn in the slot at 20 px `THEME.colour.ink`.
- Cards: `makeTile` 560 × 56 with `ART.sentenceCard` tokens at (360, 350 / 418 / 486); sentence 20 px `THEME.font.body` `THEME.colour.ink`, left-aligned from x = 100, `wordWrap` 540, max 2 lines (an 8-word English sentence ≈ 300 px; a 1.6× locale fits on one line; a sentence that still wraps drops to 18 px).
- Cues: `ART.timeMark` / `ART.linkMark` 3 px under a word or phrase; `ART.arrowShaft` from the antecedent card's right edge (x = 640) curving is NOT required — a straight line from (650, yAntecedent) to (650, yTapped) with `ART.arrow` at the tapped end; `ART.nextPulse` around the next empty slot; `ART.hintRing` behind a card.
- `ART.storyGlow` at (360, 580) with `ART.storyText` centred on it (three sentences joined by spaces, `wordWrap` 620, max 3 lines at 20 px; drops to 16 px if a fourth line would be needed). `ART.cow` at (60, 570) at 56 px.
- Tap floors: cards 560 × 56, slots 560 × 52 → the placed card (56) is the tappable object; gaps 12 (cards) / 6 (slots, non-adjacent targets since only the last-filled slot is tappable).
- Keyboard: Tab walks the three cards top to bottom, then the last-filled slot; Enter taps. During a cue (≤ 1.5 s) cards are `setEnabled(false)`.

## Content
Sentence sets are language-bound. `LOCALE_DATA[lang]` = `{ items: { L1: [...], L2: [...], L3: [...] } }`; an item = `{ sentences: [s1, s2, s3] (in story order), cues: [[words…], [words…], [words…]] (the time word/phrase per sentence, or the back-reference pairs at L3), links: [[antecedentWord, refWord], …] (L3), scene: [<ART key>, <ART key>] }`. The English set is complete. **Other locales: a native sentence set is required — en pilot** (`LOCALE_DATA[lang] = "en"` until then). Author's rules: ≤ 8 words per sentence; the locale's own time words in their natural position (de "Zuerst … Dann … Zuletzt"; fr "D'abord … Ensuite … Enfin"; fi "Ensin … Sitten … Lopuksi"); L3 back-references must be real pronoun/definite links in that language.

**en** — s1 / s2 / s3 — cue words — scene:
- **L1** (First / Then / Last):
  1. First, Fox finds a seed. / Then Fox plants it in a pot. / Last, a small flower opens. — First, Then, Last — `ART.picSeed`, `ART.picFlower`
  2. First, Bear mixes eggs and flour. / Then the cake bakes in the oven. / Last, Bear eats a big slice. — First, Then, Last — `ART.picEgg`, `ART.picCake`
  3. First, Duck finds a big puddle. / Then she jumps in with a splash. / Last, she dries off in the sun. — First, Then, Last — `ART.picRain`, `ART.picSun`
  4. First, Rabbit packs a bag. / Then he walks to the tent. / Last, he sleeps under the stars. — First, Then, Last — `ART.picBag`, `ART.picTent`, `ART.picStar`
  5. First, Cat sees a ball of wool. / Then she rolls it across the floor. / Last, the wool is one big knot. — First, Then, Last — `ART.picYarn`, `ART.picCat`
- **L2** (time phrases):
  6. In the morning Owl goes to bed. / After lunch Owl is still asleep. / At night Owl wakes up and hunts. — In the morning, After lunch, At night — `ART.picSun`, `ART.picMoon`
  7. Before school Pig feeds the hens. / At school Pig paints a picture. / After school Pig shows it at home. — Before school, At school, After school — `ART.picHen`, `ART.picPalette`, `ART.picHouse`
  8. One day Frog finds an egg. / Soon a tiny chick pecks out. / At last the chick can fly. — One day, Soon, At last — `ART.picEgg`, `ART.picChick`, `ART.picBird`
  9. Early in spring Mouse plants three seeds. / A week later small leaves show. / In the summer there are tomatoes. — Early in spring, A week later, In the summer — `ART.picSeed`, `ART.picTomato`
  10. Today Dog gets a new kite. / Tomorrow he will fly it at the park. / Next week he will show his friend. — Today, Tomorrow, Next week — `ART.picKite`, `ART.picTree`
- **L3** (no time words; cause → effect and back-reference; links = [antecedent in the earlier card, reference in the later card]):
  11. Hen finds a shiny key on the path. / She tries it in the old door. / The door opens with a creak. — links [key, it], [door, door] — `ART.picKey`, `ART.picDoor`
  12. Monkey drops a banana skin. / Bear steps on the skin and slips. / Bear laughs and picks it up. — links [skin, skin], [skin, it] — `ART.picBanana`, `ART.picBear`
  13. Cow blows up a red balloon. / A thorn pops the balloon. / Cow blows up a blue one instead. — links [balloon, balloon], [balloon, one] — `ART.picBalloon`, `ART.picRose`
  14. Rain fills the pond to the top. / The pond spills over the path. / Duck swims along the wet path. — links [pond, pond], [path, path] — `ART.picRain`, `ART.picPond`
  15. Fox builds a tower of blocks. / The tall tower wobbles. / It crashes down on the rug. — links [tower, tower], [tower, It] — `ART.picBricks`, `ART.picFox`

Every sentence ≤ 8 words. At L3 the cue for a wrong tap: if the tapped card is s2 or s3 tapped too early, underline the reference word in it and the antecedent in the card that must come first, and draw the arrow from that card to the tapped card; if s1 is tapped while s1 is already placed (impossible) or a card is tapped for slot 3 out of turn, the same rule applies to the s2/s3 pair. Play list: 12 items per Rules; shuffled within level; no story repeats except by re-queue; card order shuffled per item.

## Rules
- Item count: 12 (re-queued repeats replace unplayed items).
- Difficulty progression: 2 consecutive items completed without a wrong tap → next level (cap L3).
- Adaptation: an item with a wrong tap, or wrong first-try on 2 consecutive items → next item one level down (floor L1); a single miss re-queues the item after 2 intervening items.
- What happens on a correct answer: each correct card glides to its slot with `tone("tap", k)` and the filled slots read back; on the third card `ART.storyText` + `ART.storyGlow` (`ANIM.storyIn`), `tone("correct")`, praise rotation ["well_done", "great_job", "excellent", "you_did_it", "keep_going"] on every item completed without a wrong tap, cow `ANIM.wag`, rail dot, next item after 1000 ms.
- What happens on a wrong answer:
  - Salience or backwards order at L1-L2 (wrong card for the slot): nudge + `tone("nudge")`; the time word/phrase underlines in all three cards for 1200 ms and the next empty slot pulses.
  - Wrong card at L3: nudge + tone; the back-reference word and its antecedent underline and the arrow joins their cards for 1200 ms.
  - Second wrong tap for the same slot: the cue again + `ART.hintRing` on the correct next card until tapped (solved-with-help).
  - Tapping the last-filled slot: returns its card (undo, free, no count).
- Retry behaviour: per slot: attempt 1 → attempt 2 after the cue → the ringed card (no attempt 4).
- Finish condition: 12 items. No losing state, no clock.

## Strings
- `GameCore.t()` keys: `t("start")`, `t("question_x_of_y")`, `t("all_done")`, `t("play_again")`, `t("menu")`, `t("well_done")`, `t("great_job")`, `t("excellent")`, `t("you_did_it")`, `t("keep_going")`.
- Game-specific: `title` = "Sentence Order"; `putInOrder` = "Put the story in order". The sentences are content from `LOCALE_DATA`.

## Sound
`tone("tap", k)` when the k-th slot is filled (pitch climbs down the rail); `tone("nudge")` on a wrong card; `tone("correct")` on completion; `tone("finish")` once. Silent under `?sound=off`. No sentence is ever read aloud.

## Testing checklist
- [ ] Works in all 11 languages (chrome strings change; `?lang=fi` plays the English set until a Finnish set exists and nothing breaks).
- [ ] Works at narrow width (400-px iframe: the scene strip, three slots and three cards visible; no sentence wraps to a third line).
- [ ] Keyboard operable (Tab across the cards then the last-filled slot; Enter places / returns).
- [ ] Never auto-starts.
- [ ] No losing state (any number of wrong taps still ends with the rail full; the hint ring always names the next card).
- [ ] Tapping "Then Fox plants it in a pot." first nudges it and underlines "First", "Then" and "Last" in the three cards for about a second; slot 1 pulses.
- [ ] Tapping "First, Fox finds a seed." moves it into slot 1 and it reads back; tapping it in the slot returns it.
- [ ] At the second level the underlines land on phrases such as "In the morning" and "After lunch".
- [ ] At the third level tapping "The door opens with a creak." before "She tries it in the old door." underlines "door" in both cards and draws an arrow from the earlier card to the tapped one.
- [ ] Two clean items in a row bring the next level; a wrong tap brings an easier story next.
- [ ] A completed story appears as one paragraph under the cards.
- [ ] The finish screen lists the twelve stories with filled or hollow dots and no score.
- [ ] With `?sound=off` nothing is audible.
