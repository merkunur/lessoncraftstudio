# 075 — Sentence Train

## Identity
- Slug: `sentence-train`
- Subject / topic: Literacy / word order in a sentence — ordering 3-5 word cards into the one sentence a picture shows, using the capital letter and the full stop as boundary cues
- Age band: `6-8`
- Interaction pattern: `P4` — tap in order (per-tap judgement)
- Estimated build size: ~480 lines

Shared contract: `catalogue/BUILD-CONVENTIONS.md`. Pattern contract: `catalogue/PATTERNS.md` P4. Locale note: sentence sets are language-bound and are NEVER translated English (F-128: V2 word order in de/nl/sv/da/no, verb-final subordinate clauses in de, free order in fi); each locale's set lives in `LOCALE_DATA` with its own accepted orders and its own boundary-cue flags. English is authored in full; German is authored as the V2 exemplar (native review before ship); the other nine locales are declared as needing a native set (en pilot). Nothing is spoken; the target sentence is cued by a two-picture scene.

## Learning
- Objective: Taps 3-5 word cards in the order that makes the one sentence the scene shows, putting the card with the capital first and the card with the full stop last.
- Prerequisites: Reads single short words (games 071-074). Recognises a capital letter and a full stop as marks (game 076 is the sibling that teaches placing them).
- Curriculum links: F-22 (sentence conventions — capital to start, full stop to end, word spaces — by 8 in all twelve systems), F-128, F-31 row "Capital + full stop; sentence order" — conservative 7-8, earliest 5 → 6-8 (US L.1.1.j "produce … simple sentences"; England Y1 "sequencing sentences", "leaving spaces between words"; Germany Klasse 1-2 "Sätze bilden, Satzanfang groß"; France CP "la phrase"; Netherlands groep 3-4 "zinnen maken"; Spain 1º ciclo "la oración"; Brazil EF01LP10; Sweden åk 1-3 "stor bokstav och punkt"; Norway 2. trinn; Finland 1.-2. luokka "lause").
- Common misconceptions (F-128, F-129), each with this game's response:
  1. **Cannot find the sentence boundary — starts with any word.** Response: a wrong tap while the first wagon is empty makes every card whose first letter is a capital show a coral ring on that letter (`ART.capMark`, `ANIM.markIn`) for 1200 ms — the capital is the cue for "first". In English exactly one card qualifies; in German several do (nouns are capitalised — `LOCALE_DATA.de.capitalCue = false` turns this cue off and only the stop cue remains, which is why German L1 sentences are authored so that the case forms of the cards still pin the order).
  2. **Puts the word with the full stop anywhere.** Response: tapping the stop-card before the last wagon is free makes the card glide to the LAST wagon as a ghost (alpha 0.5, `ANIM.ghostToEnd`) with the full stop ringed (`ART.stopMark`), then back to the platform — "this one is for the end".
  3. **Orders by meaning salience or by the pictures (object before verb: "The dog balls chases").** Response: a wrong mid-sentence tap replays the wagons filled so far (`ANIM.readBack`: each filled wagon lights in turn, 250 ms apart) and the next empty wagon pulses (`ART.nextPulse`, `ANIM.pulse`) — the sentence is re-read up to the gap, then the child chooses again; on the second wrong tap for the same wagon the correct next card gains `ART.hintRing`.
  4. **Adding a word that does not belong (L3 has one extra card).** Response: the extra card glides to the train, finds no free wagon (it travels to beyond the last wagon, `ANIM.ghostToEnd`) and returns; nothing is said — the train's length IS the sentence's length (F-61 refusal, not punishment).
  5. **Transferring English order to another language.** Response: structural — every locale's sentences and accepted orders are native-authored in `LOCALE_DATA`; the game never reorders English.

## How it plays
1. **Start screen**: title "Sentence Train", the bear driver (`ART.bear`) at (360, 200), Start, picker.
2. **Item 1 (L1: "Cats like fish." — cards Cats / like / fish.)**: rail of 10 dots (§6) at y = 28; `t("question_x_of_y")` at (360, 48). Zone A: the scene card (`ART.sceneCard`, 160 × 84) at (360, 96) showing the two scene pictures side by side at 44 px (`ART.picCat` at (330, 96), `ART.picFish` at (390, 96)); below it the train at y = 200: the engine (`ART.engine`) at (90, 200) with the bear in the cab (`ART.bear` at 40 px at (90, 176)), then three empty wagons (`ART.wagon`, 110 × 70, dashed) at x = 200 / 320 / 440, each with its position numeral (`ART.railNum` "1", "2", "3", 16 px) at its top-left corner. Zone B: the platform — three word cards (`ART.wordCard`, 150 × 70, word 26 px) at the platform spots for three cards: (200, 330), (520, 330), (360, 420), assignment shuffled. Caption `S("buildSentence")` ("Build the sentence") at (360, 282), 22 px `THEME.colour.inkSoft`.
3. **Tapping in order**: the child taps a card.
   - **Correct next card**: `tone("tap", k)` (k = wagon index, so the pitch climbs along the train), the card glides (`ANIM.glide`) into the next free wagon and becomes the wagon's load (the wagon stroke turns solid `structure`); the position numeral stays visible. Tapping the LAST-placed wagon returns its card to its platform spot (undo, `ANIM.glide`, no penalty); earlier wagons are locked in place.
   - **Wrong card (any)**: `ANIM.nudge`, `tone("nudge")`, then the cue for the situation (Learning 1-4): capital rings when wagon 1 is empty; the stop-card ghost when the tapped card carries the full stop and a later wagon is not the last free one; the read-back + next-wagon pulse otherwise; the no-wagon trip for an extra card. The item counts as retried.
   - **Second wrong tap for the same wagon**: the cue again, then the correct next card gains `ART.hintRing` (`ANIM.showMe`) until it is tapped; the item is solved-with-help from here.
   - **All wagons filled** (only possible in the right order): the train rolls 60 px right and back (`ANIM.roll`), the full sentence appears under the train as one line (`ART.sentenceText`, 26 px) at (400, 262) with `ART.sentenceGlow` behind it, `tone("correct")`, praise pop (only if no wrong tap), the bear `ANIM.wave`; rail dot fills; next item after 900 ms (`ANIM.appear`).
4. **Items 2-10**: L1 three cards; L2 four cards (wagons at x = 200 / 320 / 440 / 560; platform spots (200, 330) (520, 330) (200, 420) (520, 420)); L3 five cards — either a five-word sentence (wagons 100 × 70 at x = 170 / 280 / 390 / 500 / 610; spots (180, 330) (360, 330) (540, 330) (270, 420) (450, 420)) or a four-word sentence plus one extra card that belongs nowhere (four wagons, five cards).
5. **Re-queue** (F-41): an item with any wrong tap re-enters after 2 intervening items with a fresh card shuffle; the count stays 10.
6. **Finish**: `t("all_done")` (360, 110); the bear (360, 200) `ANIM.celebrate`; the summary = the ten sentences as one-line chips (`ART.sentenceChip`, 600 × 30, sentence 18 px) stacked from y = 300 at 30 px pitch — the sentences the child built — with `ART.dotFull` at the left of first-try ones and `ART.dotEmpty` for helped ones; `play_again` (250, 510), `menu` (470, 510); `tone("finish")`.

Session ≈ 6 minutes.

## Art registry
```js
const ART = {
  bear:         { kind: "emoji", value: "🐻", size: 80 },                   // driver / mascot
  engine:       { kind: "emoji", value: "🚂", size: 72 },                   // the engine
  wagon:        { kind: "shape", shape: "roundRect", w: 110, h: 70, fill: "surface2", stroke: "line", strokeWidth: 2, radius: 10 },   // dashed (lineDash [8,6]) while empty; solid structure stroke when loaded
  railNum:      { kind: "text",  value: "", size: 16, font: "body", color: "inkSoft" },
  wordCard:     { kind: "shape", shape: "roundRect", w: 150, h: 70, fill: "surface", stroke: "line", strokeWidth: 2, radius: 12 },   // word 26 px display ink
  sceneCard:    { kind: "shape", shape: "roundRect", w: 160, h: 84, fill: "surface", stroke: "structure", strokeWidth: 3, radius: 16 },
  capMark:      { kind: "shape", shape: "circle", r: 16, stroke: "accent", strokeWidth: 3 },
  stopMark:     { kind: "shape", shape: "circle", r: 12, stroke: "accent", strokeWidth: 3 },
  nextPulse:    { kind: "shape", shape: "roundRect", w: 122, h: 82, stroke: "structure", strokeWidth: 3, radius: 12 },
  hintRing:     { kind: "shape", shape: "roundRect", w: 162, h: 82, stroke: "structure", strokeWidth: 4, radius: 16 },
  sentenceText: { kind: "text",  value: "", size: 26, font: "display", color: "structure" },
  sentenceGlow: { kind: "shape", shape: "roundRect", w: 560, h: 40, fill: "structureSoft", radius: 12 },
  sentenceChip: { kind: "shape", shape: "roundRect", w: 600, h: 30, fill: "structureSoft", stroke: "structure", strokeWidth: 1, radius: 8 },
  dotEmpty:     { kind: "shape", shape: "circle", r: 8, stroke: "line", strokeWidth: 2 },
  dotFull:      { kind: "shape", shape: "circle", r: 8, fill: "structure" },
  // scene pictures (the actor and the thing; English gloss in the comment)
  picCat:       { kind: "emoji", value: "🐱", size: 44 },   // cat
  picDog:       { kind: "emoji", value: "🐶", size: 44 },   // dog
  picBee:       { kind: "emoji", value: "🐝", size: 44 },   // bee
  picCow:       { kind: "emoji", value: "🐮", size: 44 },   // cow
  picHen:       { kind: "emoji", value: "🐔", size: 44 },   // hen
  picDuck:      { kind: "emoji", value: "🦆", size: 44 },   // duck
  picRabbit:    { kind: "emoji", value: "🐰", size: 44 },   // rabbit
  picMonkey:    { kind: "emoji", value: "🐒", size: 44 },   // monkey
  picOwl:       { kind: "emoji", value: "🦉", size: 44 },   // owl
  picFox:       { kind: "emoji", value: "🦊", size: 44 },   // fox
  picMouse:     { kind: "emoji", value: "🐭", size: 44 },   // mouse
  picFish:      { kind: "emoji", value: "🐟", size: 44 },   // fish
  picBall:      { kind: "emoji", value: "⚽", size: 44 },   // ball
  picHoney:     { kind: "emoji", value: "🍯", size: 44 },   // honey
  picMilk:      { kind: "emoji", value: "🥛", size: 44 },   // milk
  picEgg:       { kind: "emoji", value: "🥚", size: 44 },   // egg
  picWave:      { kind: "emoji", value: "🌊", size: 44 },   // water (swim)
  picRain:      { kind: "emoji", value: "🌧️", size: 44 },   // rain
  picCarrot:    { kind: "emoji", value: "🥕", size: 44 },   // carrot
  picBanana:    { kind: "emoji", value: "🍌", size: 44 },   // banana
  picApple:     { kind: "emoji", value: "🍎", size: 44 },   // apple
  picCheese:    { kind: "emoji", value: "🧀", size: 44 }    // cheese
};
```
All emoji are Unicode 9 or older; no fallbacks needed.

## Animation registry
```js
const ANIM = {
  glide:      { duration: 260, ease: "Sine.InOut", trigger: "card to a wagon / back to its platform spot (x,y at call)" },
  nudge:      { x: "+=10", duration: 80, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "wrong card" },
  markIn:     { alpha: 1, duration: 200, ease: "Sine.Out", yoyo: true, hold: 1200, trigger: "capMark / stopMark rings (from alpha 0)" },
  ghostToEnd: { alpha: 0.5, duration: 400, ease: "Sine.InOut", yoyo: true, trigger: "a card travels to the last wagon (or to x = 680 when no wagon is free) and back; x,y at call; alpha returns to 1" },
  readBack:   { alpha: 0.4, duration: 125, ease: "Sine.InOut", yoyo: true, trigger: "each filled wagon in turn, 250 ms apart, from wagon 1" },
  pulse:      { scale: 1.06, duration: 300, ease: "Sine.InOut", yoyo: true, repeat: 2, trigger: "nextPulse outline on the next empty wagon" },
  showMe:     { alpha: 1, duration: 500, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "hintRing on the correct next card (from alpha 0.2)" },
  roll:       { x: "+=60", duration: 500, ease: "Sine.InOut", yoyo: true, trigger: "the whole train container when the sentence completes" },
  wave:       { angle: 10, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 2, trigger: "bear on completion" },
  appear:     { alpha: 1, scale: 1, duration: 200, ease: "Back.Out", trigger: "new scene, wagons and cards (from alpha 0, scale 0.6)" },
  celebrate:  { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "finish bear" }
};
```

## Screen layout
```
y   0 ┌──────────────────────────────────────────────────────────────┐
      │ [lang]        ○ ○ ○ ○ ○ ○ ○ ○ ○ ○  rail y=28; "3 of 10" y=48    │  zone T
 56   ├──────────────────────────────────────────────────────────────┤
      │                    [ cat  fish ]  scene (360,96) 160×84        │
      │   bear                                                        │  zone A
      │  engine   ┌1─────┐  ┌2─────┐  ┌3─────┐        wagons y=200    │
      │  (90,200) │      │  │      │  │      │        x=200/320/440   │
      │           └──────┘  └──────┘  └──────┘        (110×70)        │
260   ├──────────────────────────────────────────────────────────────┤
      │               "Build the sentence" (360,282)                  │
      │     [  Cats  ]                     [  fish. ]   spots y=330    │  zone B
      │                    [  like  ]                   spot y=420     │
480   ├──────────────────────────────────────────────────────────────┤
      │        sentence line (400,262) shown on completion             │  zone C
560   └──────────────────────────────────────────────────────────────┘
```
Four wagons: x = 200 / 320 / 440 / 560. Five wagons (100 × 70): x = 170 / 280 / 390 / 500 / 610. Fixed layout, FIT scaling. The engine, wagons and the bear are one container for `ANIM.roll`.

## Visual specification
- Background `THEME.colour.bg`; rail per §6: 10 × `ART.dotEmpty` (x = 261 + i × 22) → `ART.dotFull`; `t("question_x_of_y")` at (360, 48).
- `ART.sceneCard` at (360, 96) with the item's two scene pictures at (330, 96) and (390, 96).
- `ART.engine` at (90, 200) with `ART.bear` drawn at 40 px at (90, 176) in the cab; wagons as `makeTile` (110 × 70 or 100 × 70) with `ART.wagon` tokens (dashed while empty), `ART.railNum` at each wagon's (−44, −26); a loaded wagon shows the word at 24 px `THEME.colour.ink`.
- Word cards: `makeTile` 150 × 70 with `ART.wordCard` tokens; word 26 px `THEME.font.display` `THEME.colour.ink` (fit-to-width for long words — "schwimmen." at 26 px is 140 px, so the library shrink applies; the 1.6× budget is met by the shrink rule, not the box).
- Cues: `ART.capMark` centred on a card's first letter; `ART.stopMark` centred on the full stop glyph; `ART.nextPulse` around the next empty wagon; `ART.hintRing` behind a card; `ART.sentenceText` at (400, 262) over `ART.sentenceGlow`.
- Tap floors: cards 150 × 70, wagons 100-110 × 70 (≥ 56). Gaps ≥ 10 between wagons, ≥ 20 between cards.
- Keyboard: Tab walks the platform cards left-to-right, top-to-bottom, then the wagons; Enter taps. During a cue (≤ 1.5 s) cards are `setEnabled(false)`.

## Content
Sentence sets are language-bound. `LOCALE_DATA[lang]` = `{ capitalCue: true|false, items: { L1: [...], L2: [...], L3: [...] } }`; each item = `{ cards: ["Cats", "like", "fish."], orders: [[0,1,2]], extra: null | "tree", scene: [<ART key>, <ART key>] }`. `orders` lists every accepted card order (a tapped card is accepted iff some accepted order begins with the wagons so far followed by that card); the first order is the one shown as the completed sentence. `extra` is the L3 belongs-nowhere card.

**en** (`capitalCue: true`):
- L1 (3 cards): Cats like fish. (`ART.picCat` `ART.picFish`) · Dogs chase balls. (`ART.picDog` `ART.picBall`) · Bees make honey. (`ART.picBee` `ART.picHoney`) · Cows give milk. (`ART.picCow` `ART.picMilk`) · Hens lay eggs. (`ART.picHen` `ART.picEgg`) · Fish can swim. (`ART.picFish` `ART.picWave`) · Ducks like rain. (`ART.picDuck` `ART.picRain`) · Rabbits eat carrots. (`ART.picRabbit` `ART.picCarrot`) · Monkeys eat bananas. (`ART.picMonkey` `ART.picBanana`) · Owls hunt mice. (`ART.picOwl` `ART.picMouse`)
- L2 (4 cards): The cat likes fish. · The dog chases balls. · The cow gives milk. · The hen lays eggs. · The bee makes honey. · The fox eats apples. (`ART.picFox` `ART.picApple`) · The duck likes rain. · The rabbit eats carrots. · The monkey eats bananas. · The mouse likes cheese. (`ART.picMouse` `ART.picCheese`) — scenes as the L1 pairs for the same actor.
- L3 (5 cards): The big dog chases balls. · The little mouse likes cheese. · The brown cow gives milk. · The red hen lays eggs. · The busy bee makes honey. · The hungry fox eats apples. · The wet duck likes rain. · The cat likes fish. + extra "tree" · The hen lays eggs. + extra "milk" · The owl hunts mice. + extra "balls."
- Every en item has exactly one accepted order (the capital pins the first card, the stop the last, and the middle words admit no other grammatical reading with those case forms).

**de** (`capitalCue: false` — nouns are capitalised; native review before ship): L1: Katzen mögen Fisch. · Hunde jagen Bälle. · Bienen machen Honig. · Kühe geben Milch. · Hühner legen Eier. · Fische können schwimmen. · Enten mögen Regen. · Hasen fressen Möhren. · Affen fressen Bananen. · Eulen jagen Mäuse. L2: Die Katze mag Fisch. · Der Hund jagt Bälle. · Die Kuh gibt Milch. · Das Huhn legt Eier. · Die Biene macht Honig. · Der Fuchs frisst Äpfel. · Die Ente mag Regen. · Der Hase frisst Möhren. · Der Affe frisst Bananen. · Die Maus mag Käse. L3 (V2 with a fronted adverb, cards Heute / mag / die / Katze / Fisch.): Heute mag die Katze Fisch. · Morgen legt das Huhn Eier. · Der große Hund jagt Bälle. · Die kleine Maus mag Käse. · Die braune Kuh gibt Milch. · Das rote Huhn legt Eier. · Die Katze mag Fisch. + extra "Baum" · Das Huhn legt Eier. + extra "Milch". Scenes identical to the en items with the same actor. In the V2 items the lowercase article card ("die", "das") cannot start the sentence, so the order is pinned by case forms even without the capital cue.

**fr, it, es, pt, nl, sv, da, no, fi: a native sentence set is required — en pilot** (`LOCALE_DATA[lang] = "en"` until then). Author's rules: 3 / 4 / 5 cards; list EVERY grammatical order in `orders` (fi in particular); set `capitalCue: false` if the language capitalises mid-sentence words; es statements only (no ¿ here — see game 077).

Play list: 10 items per Rules; shuffled within level; scene pairs never repeat within a session except by re-queue; card spots shuffled per item.

## Rules
- Item count: 10 (re-queued repeats replace unplayed items).
- Difficulty progression: 2 consecutive items completed without a wrong tap → next level (cap L3).
- Adaptation: an item with a wrong tap, or wrong first-try on 2 consecutive items → next item one level down (floor L1); a single miss re-queues the item after 2 intervening items.
- What happens on a correct answer: each correct card glides to its wagon with `tone("tap", k)`; on the last card `ANIM.roll`, `ART.sentenceText` + `ART.sentenceGlow`, `tone("correct")`, praise rotation ["well_done", "great_job", "excellent", "you_did_it", "keep_going"] on every item completed without a wrong tap, bear `ANIM.wave`, rail dot, next item after 900 ms.
- What happens on a wrong answer:
  - Wrong first card (boundary not found): nudge + `ART.capMark` on every capitalised card for 1200 ms (skipped when `capitalCue` is false — then the read-back + next-wagon pulse plays instead).
  - The stop-card tapped early: nudge + the ghost trip of that card to the last wagon with `ART.stopMark` ringed.
  - Wrong middle card (meaning/salience order): nudge + `ANIM.readBack` over the filled wagons + `ART.nextPulse` on the next empty wagon.
  - The extra card (L3): nudge + the no-wagon trip to x = 680 and back.
  - Second wrong tap for the same wagon: the cue again + `ART.hintRing` on the correct next card until tapped (solved-with-help).
- Retry behaviour: per wagon: attempt 1 → attempt 2 after the cue → the ringed card (no attempt 4). Undo of the last wagon is always free.
- Finish condition: 10 items. No losing state, no clock.

## Strings
- `GameCore.t()` keys: `t("start")`, `t("question_x_of_y")`, `t("all_done")`, `t("play_again")`, `t("menu")`, `t("well_done")`, `t("great_job")`, `t("excellent")`, `t("you_did_it")`, `t("keep_going")`.
- Game-specific: `title` = "Sentence Train"; `buildSentence` = "Build the sentence". The cards are content from `LOCALE_DATA`.

## Sound
`tone("tap", k)` when the k-th wagon is loaded (pitch climbs along the train); `tone("nudge")` on a wrong card; `tone("correct")` on completion; `tone("finish")` once. Silent under `?sound=off`. No sentence is ever spoken.

## Testing checklist
- [ ] Works in all 11 languages (chrome strings change; `?lang=de` shows the German cards with capitalised nouns and no capital-ring cue; `?lang=fr` plays the English set until a French set exists).
- [ ] Works at narrow width (400-px iframe: engine, five wagons, five cards and the scene visible without overlap).
- [ ] Keyboard operable (Tab across the cards then the wagons; Enter loads / unloads).
- [ ] Never auto-starts.
- [ ] No losing state (any number of wrong taps still ends with the train full; the hint ring always names the next card).
- [ ] Tapping "like" first for "Cats like fish." nudges it and rings the C of "Cats" for about a second.
- [ ] Tapping "fish." second sends it as a ghost to the last wagon and back.
- [ ] Tapping the last loaded wagon returns its card to the platform; earlier wagons stay locked.
- [ ] At the third level the extra card ("tree") travels past the last wagon and comes back; the train still completes with the four real words.
- [ ] Two clean items in a row bring a longer train; a wrong tap brings a shorter one next.
- [ ] A completed train rolls right and back and the whole sentence appears beneath it.
- [ ] The finish screen lists the ten sentences with filled/hollow dots and no score.
- [ ] With `?sound=off` nothing is audible.
