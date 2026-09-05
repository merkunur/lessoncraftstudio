# 191 — Question Order

## Identity
- Slug: `sentence-scramble-question`
- Subject / topic: Literacy / word order in questions — ordering 3-5 word cards into the one question a picture asks, with the question word or verb first and the card carrying the question mark last, per the play language's own question order
- Age band: `8-9`
- Interaction pattern: `P4` — tap in order (per-tap judgement)
- Estimated build size: ~500 lines

Shared contract: `catalogue/BUILD-CONVENTIONS.md`. Pattern contract: `catalogue/PATTERNS.md` P4. Locale note: question order is language-bound and is NEVER translated English (F-128: English uses do-support and auxiliary inversion; de/nl/sv/da/no put the finite verb first in a yes/no question and second after a question word; fi uses the -ko/-kö particle and a freer order; es/pt/it can keep statement order with the marks). Each locale's set is stored in `LOCALE_DATA` with its own accepted orders. English is authored in full; German is authored as the V2 / verb-first exemplar (native review before ship); the other nine locales are declared as needing a native set (en pilot). Nothing is spoken; the question is cued by a scene picture. Sibling of game 075 (statements) and game 077 (ask or tell) — here the child BUILDS the question.

## Learning
- Objective: Taps 3-5 word cards in the order that makes the one question the scene asks, putting the question word or the fronted verb first and the card that carries the question mark last, and rejecting a decoy verb form when one is offered.
- Prerequisites: Builds statements from word cards (game 075); tells a question from a statement by its first word and end mark (game 077); reads sentences of up to 8 words.
- Curriculum links: F-22 (sentence conventions — capital to start, question mark to end — by 8 in all twelve systems; explicit grammar terms from 8 in EN/FR/DE/ES/IT and NL), F-128, F-31 row "Capital + full stop; sentence order" — conservative 7-8 → 8-9 for the question form (US L.2.1.f "produce, expand, and rearrange complete simple sentences", L.3.1.i; England Y2 "sentences with different forms: statement, question"; Germany Klasse 2-3 "Fragesätze bilden, Satzarten"; France CE1-CE2 "la phrase interrogative"; Netherlands groep 4-5 "vraagzinnen"; Spain 2º ciclo "la oración interrogativa"; Brazil EF03LP; Sweden åk 1-3 "frågor"; Finland 2.-3. luokka "kysymyslause"). F-6 notes grammar is a niche game genre; this is the catalogue's one question-order game.
- Common misconceptions (F-128, F-129), each with this game's response:
  1. **Keeps statement order and just adds the mark ("You can swim?" — the card "You" tapped first).** Response: a wrong first tap makes every card that can legally start THIS locale's question show a coral ring on its first letter (`ART.startMark`, `ANIM.markIn`) for 1200 ms; in English that is the capitalised question word or auxiliary (`Can`, `Where`); the ring never appears on a lowercase card. On the second wrong first tap the correct first card gains `ART.hintRing`.
  2. **Puts the card with the question mark anywhere ("swim? you Can").** Response: tapping the mark-card before the last slot is free makes it glide as a ghost (alpha 0.5, `ANIM.ghostToEnd`) to the LAST slot with the question mark ringed (`ART.qMark`), then back — "this one is for the end".
  3. **Question word first but the auxiliary in statement position ("Where Fox is?", "What cows do eat?").** Response: a wrong middle tap replays the slots filled so far (`ANIM.readBack`, each filled slot lights in turn, 250 ms apart) and the next empty slot pulses (`ART.nextPulse`, `ANIM.pulse`); on the second wrong tap for the same slot the correct next card gains `ART.hintRing`. The read-back lets the child hear the question in their head up to the gap.
  4. **Uses the wrong verb form after do-support ("Does the dog barks?") — the L3 decoy card.** Response: the decoy card (`extra`) glides to the bubble, finds no free slot (it travels past the last slot to x = 690, `ANIM.ghostToEnd`) and returns; nothing is said — the bubble's length IS the question's length (F-61 refusal). If the child taps the decoy when the bare verb is due, the decoy and the true verb card both show `ART.endMark` on their endings for 1200 ms (the "-s" of "barks" ringed; the bare "bark" ringed at its end with nothing there) so the difference is visible.
  5. **Transferring English order to another language.** Response: structural — every locale's questions and accepted orders are native-authored in `LOCALE_DATA`; a locale with more than one accepted order lists them all and the game accepts any of them card by card.

## How it plays
1. **Start screen**: title "Question Order", the parrot (`ART.parrot`) at (360, 200), Start, picker.
2. **Item 1 (L1: "Where is Fox?" — cards Where / is / Fox?)**: rail of 12 dots (§6) at y = 28; `t("question_x_of_y")` at (360, 48). Zone A: the scene card (`ART.sceneCard`, 160 × 84) at (360, 96) showing the scene picture at 44 px (`ART.picFox` at (340, 96)) with a small question badge beside it (`ART.askBadge`, a 28 px "?" in a coral circle at (392, 84)) — the picture is what the question is ABOUT, and the badge says "ask"; below it the parrot's speech bubble (`ART.bubble`, 600 × 90) centred at (360, 205) with the parrot at (60, 205) beside its tail; inside the bubble three empty slots (`ART.slot`, 150 × 64, dashed) at x = 210 / 360 / 510, each with its position numeral (`ART.slotNum` "1", "2", "3", 16 px) at its top-left corner. Zone B: the tray — three word cards (`ART.wordCard`, 150 × 70, word 26 px) at (200, 330), (520, 330), (360, 420), assignment shuffled. Caption `S("buildQuestion")` ("Build the question") at (360, 282), 22 px `THEME.colour.inkSoft`.
3. **Tapping in order**: the child taps a card.
   - **Correct next card**: `tone("tap", k)` (k = slot index; the pitch climbs across the bubble), the card glides (`ANIM.glide`) into the next free slot and becomes its load (the slot stroke turns solid `structure`); the position numeral stays. Tapping the LAST-filled slot returns its card to its tray spot (undo, `ANIM.glide`, no penalty); earlier slots are locked.
   - **Wrong card (any)**: `ANIM.nudge`, `tone("nudge")`, then the cue for the situation (Learning 1-4): start rings when slot 1 is empty; the mark-card ghost when the tapped card carries the question mark and a later slot is not the last free one; the read-back + next-slot pulse otherwise; the no-slot trip for the decoy card. The item counts as retried.
   - **Second wrong tap for the same slot**: the cue again, then the correct next card gains `ART.hintRing` (`ANIM.showMe`) until it is tapped; the item is solved-with-help from here.
   - **All slots filled** (only possible in an accepted order): the bubble bobs (`ANIM.bob`), the full question appears under the bubble as one line (`ART.questionText`, 26 px) at (360, 262) over `ART.questionGlow`, `tone("correct")`, praise pop (only if no wrong tap), the parrot `ANIM.flap`; rail dot fills; next item after 900 ms (`ANIM.appear`).
4. **Items 2-12**: L1 three cards (question word + is + subject); L2 four cards (auxiliary inversion or question word + do-support; slots at x = 150 / 290 / 430 / 570, tray spots (200, 330) (520, 330) (200, 420) (520, 420)); L3 five cards — either a five-word question (slots 110 × 64 at x = 120 / 240 / 360 / 480 / 600; spots (180, 330) (360, 330) (540, 330) (270, 420) (450, 420)) or a four-word question plus one decoy verb-form card (four slots, five cards).
5. **Re-queue** (F-41): an item with any wrong tap re-enters after 2 intervening items with a fresh card shuffle; the count stays 12.
6. **Finish**: `t("all_done")` (360, 110); the parrot (360, 200) `ANIM.celebrate`; the summary = the twelve questions as one-line chips (`ART.questionChip`, 600 × 26, question 16 px) stacked from y = 290 at 26 px pitch — the questions the child built — with `ART.dotFull` at the left of first-try ones and `ART.dotEmpty` for helped ones; `play_again` (250, 510), `menu` (470, 510); `tone("finish")`.

Session ≈ 6-7 minutes.

## Art registry
```js
const ART = {
  parrot:        { kind: "emoji", value: "🦜", size: 72 },                  // asker / mascot (Unicode 11)
  sceneCard:     { kind: "shape", shape: "roundRect", w: 160, h: 84, fill: "surface", stroke: "structure", strokeWidth: 3, radius: 16 },
  askBadge:      { kind: "shape", shape: "circle", r: 16, fill: "accent" },   // "?" 22 px display inkOnAccent drawn on it
  bubble:        { kind: "shape", shape: "roundRect", w: 600, h: 90, fill: "surface", stroke: "line", strokeWidth: 2, radius: 28 },   // a small triangle tail (polygon, same fill/stroke) points to the parrot
  slot:          { kind: "shape", shape: "roundRect", w: 150, h: 64, fill: "surface2", stroke: "line", strokeWidth: 2, radius: 10 },  // dashed (lineDash [8,6]) while empty; solid structure stroke when loaded
  slotNum:       { kind: "text",  value: "", size: 16, font: "body", color: "inkSoft" },
  wordCard:      { kind: "shape", shape: "roundRect", w: 150, h: 70, fill: "surface", stroke: "line", strokeWidth: 2, radius: 12 },   // word 26 px display ink
  startMark:     { kind: "shape", shape: "circle", r: 16, stroke: "accent", strokeWidth: 3 },
  qMark:         { kind: "shape", shape: "circle", r: 14, stroke: "accent", strokeWidth: 3 },
  endMark:       { kind: "shape", shape: "roundRect", w: 26, h: 34, stroke: "accent", strokeWidth: 3, radius: 6 },   // around a card's last letter(s)
  nextPulse:     { kind: "shape", shape: "roundRect", w: 162, h: 76, stroke: "structure", strokeWidth: 3, radius: 12 },
  hintRing:      { kind: "shape", shape: "roundRect", w: 162, h: 82, stroke: "structure", strokeWidth: 4, radius: 16 },
  questionText:  { kind: "text",  value: "", size: 26, font: "display", color: "structure" },
  questionGlow:  { kind: "shape", shape: "roundRect", w: 600, h: 40, fill: "structureSoft", radius: 12 },
  questionChip:  { kind: "shape", shape: "roundRect", w: 600, h: 26, fill: "structureSoft", stroke: "structure", strokeWidth: 1, radius: 8 },
  dotEmpty:      { kind: "shape", shape: "circle", r: 8, stroke: "line", strokeWidth: 2 },
  dotFull:       { kind: "shape", shape: "circle", r: 8, fill: "structure" },
  // scene pictures (what the question is about; English gloss in the comment)
  picFox:        { kind: "emoji", value: "🦊", size: 44 },   // fox
  picBear:       { kind: "emoji", value: "🐻", size: 44 },   // bear
  picDuck:       { kind: "emoji", value: "🦆", size: 44 },   // duck
  picOwl:        { kind: "emoji", value: "🦉", size: 44 },   // owl
  picCat:        { kind: "emoji", value: "🐱", size: 44 },   // cat
  picDog:        { kind: "emoji", value: "🐶", size: 44 },   // dog
  picBee:        { kind: "emoji", value: "🐝", size: 44 },   // bee
  picCow:        { kind: "emoji", value: "🐮", size: 44 },   // cow
  picHen:        { kind: "emoji", value: "🐔", size: 44 },   // hen
  picMouse:      { kind: "emoji", value: "🐭", size: 44 },   // mouse
  picBox:        { kind: "emoji", value: "📦", size: 44 },   // a box (for "What is that?")
  picApple:      { kind: "emoji", value: "🍎", size: 44 },   // apple (for "What is red?")
  picMoon:       { kind: "emoji", value: "🌙", size: 44 }    // night (for "When do owls hunt?")
};
```
The parrot is Unicode 11 (2018), inside the Unicode 12 limit; no fallbacks needed. Character names in the questions are the animals' own kind names (Fox, Bear) — never people's names.

## Animation registry
```js
const ANIM = {
  glide:      { duration: 260, ease: "Sine.InOut", trigger: "card to a slot / back to its tray spot (x,y at call)" },
  nudge:      { x: "+=10", duration: 80, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "wrong card" },
  markIn:     { alpha: 1, duration: 200, ease: "Sine.Out", yoyo: true, hold: 1200, trigger: "startMark / qMark / endMark rings (from alpha 0)" },
  ghostToEnd: { alpha: 0.5, duration: 400, ease: "Sine.InOut", yoyo: true, trigger: "a card travels to the last slot (or to x = 690 when no slot is free) and back; x,y at call; alpha returns to 1" },
  readBack:   { alpha: 0.4, duration: 125, ease: "Sine.InOut", yoyo: true, trigger: "each filled slot in turn, 250 ms apart, from slot 1" },
  pulse:      { scale: 1.06, duration: 300, ease: "Sine.InOut", yoyo: true, repeat: 2, trigger: "nextPulse outline on the next empty slot" },
  showMe:     { alpha: 1, duration: 500, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "hintRing on the correct next card (from alpha 0.2)" },
  bob:        { y: "-=12", duration: 220, ease: "Sine.InOut", yoyo: true, trigger: "the bubble container when the question completes" },
  flap:       { angle: 10, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 2, trigger: "parrot on completion" },
  appear:     { alpha: 1, scale: 1, duration: 200, ease: "Back.Out", trigger: "new scene, slots and cards (from alpha 0, scale 0.6)" },
  celebrate:  { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "finish parrot" }
};
```

## Screen layout
```
y   0 ┌──────────────────────────────────────────────────────────────┐
      │ [lang]        ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○  rail y=28; "3 of 12" y=48 │  zone T
 56   ├──────────────────────────────────────────────────────────────┤
      │                    [ fox  (?) ]  scene (360,96) 160×84         │
      │  parrot  ╭─────────────────────────────────────────────╮      │  zone A
      │ (60,205) ┤  ┌1──────┐    ┌2──────┐    ┌3──────┐          │      │
      │          │  │       │    │       │    │       │  slots  │      │
      │          ╰──x=210──────x=360──────x=510──(150×64)──────╯      │
260   ├──────────────────────────────────────────────────────────────┤
      │               "Build the question" (360,282)                  │
      │     [ Where  ]                     [  Fox?  ]   spots y=330    │  zone B
      │                    [   is   ]                   spot y=420     │
480   ├──────────────────────────────────────────────────────────────┤
      │        question line (360,262) shown on completion            │  zone C
560   └──────────────────────────────────────────────────────────────┘
```
Four slots (150 × 64): x = 150 / 290 / 430 / 570. Five slots (110 × 64): x = 120 / 240 / 360 / 480 / 600. Fixed layout, FIT scaling. The bubble, its tail and the slots are one container for `ANIM.bob`.

## Visual specification
- Background `THEME.colour.bg`; rail per §6: 12 × `ART.dotEmpty` (x = 239 + i × 22) → `ART.dotFull`; `t("question_x_of_y")` at (360, 48).
- `ART.sceneCard` at (360, 96) with the item's scene picture at (340, 96) and `ART.askBadge` at (392, 84) carrying "?" at 22 px `THEME.font.display` `THEME.colour.inkOnAccent`.
- `ART.bubble` centred (360, 205) with a tail polygon toward `ART.parrot` at (60, 205); slots as `makeTile` (150 × 64 or 110 × 64) with `ART.slot` tokens (dashed while empty), `ART.slotNum` at each slot's (−64, −22); a loaded slot shows the word at 22 px `THEME.colour.ink` (fit-to-width shrink for long words).
- Word cards: `makeTile` 150 × 70 with `ART.wordCard` tokens; word 26 px `THEME.font.display` `THEME.colour.ink`; the library shrink rule covers the 1.6× locale budget ("schwimmen?" at 26 px is 150 px → shrinks to fit).
- Cues: `ART.startMark` centred on a card's first letter; `ART.qMark` centred on the question-mark glyph; `ART.endMark` around a card's final letter(s); `ART.nextPulse` around the next empty slot; `ART.hintRing` behind a card; `ART.questionText` at (360, 262) over `ART.questionGlow`.
- Tap floors: cards 150 × 70, slots 110-150 × 64 (≥ 56). Gaps ≥ 10 between slots, ≥ 20 between cards.
- Keyboard: Tab walks the tray cards left-to-right, top-to-bottom, then the slots; Enter taps. During a cue (≤ 1.5 s) cards are `setEnabled(false)`.

## Content
Question sets are language-bound. `LOCALE_DATA[lang]` = `{ items: { L1: [...], L2: [...], L3: [...] } }`; each item = `{ cards: ["Where", "is", "Fox?"], orders: [[0,1,2]], extra: null | "sleeps", starters: [0], scene: <ART key> }`. `orders` lists every accepted card order (a tapped card is accepted iff some accepted order begins with the slots so far followed by that card); the first order is shown as the completed question. `starters` lists the indices of the cards that may legally begin the question in this locale (the ring cue, misconception 1). `extra` is the L3 decoy card that belongs nowhere.

**en** (do-support and inversion; one accepted order per item; `starters` = the capitalised card):
- **L1** (3 cards, question word + is + subject): Where is Fox? (`ART.picFox`) · Who is hungry? (`ART.picBear`) · What is that? (`ART.picBox`) · Where is Duck? (`ART.picDuck`) · Who is asleep? (`ART.picCat`) · What is red? (`ART.picApple`) · Where is Owl? (`ART.picOwl`) · Who is first? (`ART.picHen`)
- **L2** (4 cards, auxiliary first or question word + do-support): Can the fox swim? (`ART.picFox`) · Do bees make honey? (`ART.picBee`) · Is the cat asleep? (`ART.picCat`) · Where does Fox sleep? (`ART.picFox`) · What do cows eat? (`ART.picCow`) · Are the ducks wet? (`ART.picDuck`) · Does the dog bark? (`ART.picDog`) · Why is Bear sad? (`ART.picBear`) · When do owls hunt? (`ART.picMoon`) · Can a hen swim? (`ART.picHen`)
- **L3** (5 cards): Where does the owl sleep? (`ART.picOwl`) · What does the fox eat? (`ART.picFox`) · Does the little cat purr? (`ART.picCat`) · Why is the duck wet? (`ART.picDuck`) · Can the big dog jump? (`ART.picDog`) · Where does the mouse hide? (`ART.picMouse`) · **with a decoy** (four slots, five cards): Where does Fox sleep? + extra "sleeps" · Do bees make honey? + extra "makes" · Can the fox swim? + extra "swims" · Does the dog bark? + extra "barks" · What do cows eat? + extra "eats"
- In every en item the capital pins the first card and the question mark the last; the middle admits no other grammatical reading with those forms, so `orders` has one entry.

**de** (finite verb first in yes/no questions, second after a question word; nouns capitalised, so `starters` is authored per item, never derived from capitals; native review before ship): L1: Wer ist hungrig? (`ART.picBear`) · Was ist das? (`ART.picBox`) · Wer schläft hier? (`ART.picCat`) · Wo ist Fuchs? (`ART.picFox`) · Wer ist müde? (`ART.picOwl`) · Was ist rot? (`ART.picApple`). L2: Kann der Fuchs schwimmen? · Machen die Bienen Honig? · Schläft die Katze jetzt? · Wo schläft der Fuchs? · Was fressen die Kühe? · Sind die Enten nass? · Bellt der Hund laut? · Warum ist Bär traurig? L3: Wo schläft die kleine Eule? · Was frisst der Fuchs gern? · Kann der große Hund springen? · Warum ist die Ente nass? · **with a decoy**: Kann der Fuchs schwimmen? + extra "schwimmt" · Wo schläft der Fuchs? + extra "schlafen" · Machen die Bienen Honig? + extra "macht". Scenes as the en item with the same animal. In the yes/no items the finite verb card ("Kann", "Schläft") is the only starter; in the W-items only the question word.

**fr, it, es, pt, nl, sv, da, no, fi: a native question set is required — en pilot** (`LOCALE_DATA[lang] = "en"` until then). Author's rules: 3 / 4 / 5 cards; list EVERY grammatical order in `orders` (fi and the Romance locales in particular — "Tu peux nager ?" and "Peux-tu nager ?" are both accepted if both are taught at this age); `starters` per item; es items carry the opening mark on the first card ("¿Dónde") and the closing mark on the last; the decoy at L3 is that language's own trap (de/nl/sv verb agreement, fr "est-ce que" fragments, fi the wrong particle form).

Play list: 12 items per Rules; shuffled within level; scene pictures never repeat within a session except by re-queue; card spots shuffled per item.

## Rules
- Item count: 12 (re-queued repeats replace unplayed items).
- Difficulty progression: 2 consecutive items completed without a wrong tap → next level (cap L3).
- Adaptation: an item with a wrong tap, or wrong first-try on 2 consecutive items → next item one level down (floor L1); a single miss re-queues the item after 2 intervening items.
- What happens on a correct answer: each correct card glides to its slot with `tone("tap", k)`; on the last card `ANIM.bob`, `ART.questionText` + `ART.questionGlow`, `tone("correct")`, praise rotation ["well_done", "great_job", "excellent", "you_did_it", "keep_going"] on every item completed without a wrong tap, parrot `ANIM.flap`, rail dot, next item after 900 ms.
- What happens on a wrong answer:
  - Wrong first card (statement order kept): nudge + `ART.startMark` on every card in `starters` for 1200 ms.
  - The mark-card tapped early: nudge + the ghost trip of that card to the last slot with `ART.qMark` ringed.
  - Wrong middle card (auxiliary left in statement position, or any order slip): nudge + `ANIM.readBack` over the filled slots + `ART.nextPulse` on the next empty slot.
  - The decoy verb form (L3): nudge + the no-slot trip to x = 690 and back; when the bare verb is due, `ART.endMark` on both the decoy's ending and the true card's ending for 1200 ms.
  - Second wrong tap for the same slot: the cue again + `ART.hintRing` on the correct next card until tapped (solved-with-help).
- Retry behaviour: per slot: attempt 1 → attempt 2 after the cue → the ringed card (no attempt 4). Undo of the last slot is always free.
- Finish condition: 12 items. No losing state, no clock.

## Strings
- `GameCore.t()` keys: `t("start")`, `t("question_x_of_y")`, `t("all_done")`, `t("play_again")`, `t("menu")`, `t("well_done")`, `t("great_job")`, `t("excellent")`, `t("you_did_it")`, `t("keep_going")`.
- Game-specific: `title` = "Question Order"; `buildQuestion` = "Build the question". The cards are content from `LOCALE_DATA`.

## Sound
`tone("tap", k)` when the k-th slot is loaded (pitch climbs across the bubble); `tone("nudge")` on a wrong card; `tone("correct")` on completion; `tone("finish")` once. Silent under `?sound=off`. No question is ever spoken.

## Testing checklist
- [ ] Works in all 11 languages (chrome strings change; `?lang=de` shows the German cards with the verb-first / verb-second sets and rings only the authored starter card; `?lang=fr` plays the English set until a French set exists).
- [ ] Works at narrow width (400-px iframe: scene, bubble with five slots, five cards visible without overlap).
- [ ] Keyboard operable (Tab across the cards then the slots; Enter loads / unloads).
- [ ] Never auto-starts.
- [ ] No losing state (any number of wrong taps still ends with the bubble full; the hint ring always names the next card).
- [ ] Tapping "is" first for "Where is Fox?" nudges it and rings the W of "Where" for about a second.
- [ ] Tapping "Fox?" second sends it as a ghost to the last slot and back.
- [ ] Tapping "you" first for "Can the fox swim?" rings only "Can", never a lowercase card.
- [ ] At the third level the decoy card ("sleeps") travels past the last slot and comes back; when it is tapped in the verb's turn, its "-s" and the end of "sleep" are ringed together.
- [ ] Tapping the last loaded slot returns its card to the tray; earlier slots stay locked.
- [ ] Two clean items in a row bring a longer question; a wrong tap brings a shorter one next.
- [ ] A completed bubble bobs and the whole question appears beneath it with its question mark.
- [ ] The finish screen lists the twelve questions with filled/hollow dots and no score.
- [ ] With `?sound=off` nothing is audible.
