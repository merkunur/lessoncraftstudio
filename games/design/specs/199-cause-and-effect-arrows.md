# 199 — Because

## Identity
- Slug: `cause-and-effect-arrows`
- Subject / topic: Literacy / cause and effect — pairing a cause card with its effect card from a short picture story, so that an arrow draws from the cause to the effect
- Age band: `6-8`
- Interaction pattern: `P12` — match pairs (all cards visible; cause cards in one column, effect cards in the other)
- Estimated build size: ~480 lines

Shared contract: `catalogue/BUILD-CONVENTIONS.md`. Pattern contract: `catalogue/PATTERNS.md` P12 (visible board, tap two, pairs lock; the pair test is a predicate over card data, never label equality). Locale note: the cards are language-bound (F-129; A-15) and are stored in `LOCALE_DATA`; English is authored in full, the other ten locales are declared as needing a native set (en pilot). Nothing is spoken; each card is one sentence of at most 6 words with a small picture, and every board has a scene picture (picture support, F-129). Text budget (F-42, 6-8 ≤ 8 words): there is no instruction text on the play screen; the six cards ARE the reading task and are read one at a time.

## Learning
- Objective: On a board of three cause cards and three effect cards from one picture story, taps a cause and the effect it brings about so the two link with an arrow, for every pair on the board.
- Prerequisites: Reads a 4-6-word sentence for meaning (game 150); orders three story pictures first to last (game 078); has met "because" in classroom talk.
- Curriculum links: F-22 (reading short narrative texts with comprehension, retell and sequence by 8 in all twelve systems), F-129 (inference poor at 6; poor comprehenders do not integrate across sentences; the researched response is "picture-sequence with cause→effect arrows" — this game IS that response), F-31 row "Read short text; retell/sequence; simple inference" — conservative 8, earliest 6 → 6-8 (US RL.1.3 / RI.2.3 "describe the connection between … events"; England Y2 "making inferences on the basis of what is being said and done"; Germany Klasse 2 "Ursache und Wirkung im Text erkennen"; France CP-CE1 "comprendre les liens de cause"; Netherlands groep 4 "oorzaak en gevolg"; Spain 1º ciclo "relaciones causa-efecto"; Brazil EF15LP03 "inferir informações"; Sweden åk 1-3 "läsförståelse"; Finland 1.-2. luokka "syy ja seuraus"). Demand: F-1 / F-3 (reading comprehension).
- Common misconceptions (F-129, F-125), each with this game's response:
  1. **Pairs by a shared word instead of by the link ("The cat is wet." paired with "The cat purrs." because both say cat).** Response: L2-L3 boards use ONE character across all six cards, so word-sharing cannot decide; a non-pair makes both cards nudge and the clue word on each (`ART.clueMark` under the word that carries the link: rain → wet; hungry → eats) is underlined for 1200 ms — the link is between the clue words, not the repeated name.
  2. **Reverses cause and effect (thinks the wet cat made the rain).** Response: the arrow ALWAYS draws from the cause column to the effect column (`ART.arrow`, `ANIM.draw`), whichever card the child tapped first, and the word "because" (`S("because")`) appears on the arrow's midpoint — the direction is enacted, never marked as an error; tap order is free.
  3. **Pairs by adjacency or by picture similarity (the two cards side by side; two cards with the same small picture).** Response: the columns are shuffled independently so the true pairs are never on the same row on a fresh board; small pictures are the clue's picture (a raindrop on the cause, a puddle on the effect), so matching pictures IS reading the clue; on the second non-pair involving the same card its true partner gains `ART.hintRing`.
  4. **Not integrating — treats each card as a stand-alone fact (F-129).** Response: the scene picture at the top shows the story's setting so the six cards are read as one story; on completion the three arrows glow in story order (`ANIM.glowArrows`, top to bottom, 300 ms apart) — the story replays as a chain.
  5. **Tapping the same card twice expecting a match.** Response: the second tap de-selects it (no error, `tone("tap")`).

## How it plays
1. **Start screen**: title "Because", the fox (`ART.fox`) at (360, 200), Start, picker.
2. **Board 1 (L1: scene = rain; three pairs)**: the rail shows 3 dots (§6 — one per board). Zone A is small: the scene card (`ART.sceneCard`, 120 × 70) at (360, 84) with the scene picture (`ART.picRain`, 44 px) and the fox at (60, 84) at 40 px. Zones A/B are otherwise merged for this pattern: the board — a cause column at x = 200 and an effect column at x = 520, three cards each (`ART.card`, 280 × 80) at y = 170 / 270 / 370; each card shows its small picture (32 px) at its left and its sentence at 20 px `THEME.font.body` `THEME.colour.ink`, `wordWrap` 220, up to two lines. A column head glyph above each column: `ART.causeHead` (a plain dot) at (200, 122) and `ART.effectHead` (a dot with an arrow stub) at (520, 122) — the heads are shapes, not words. Cards within each column are shuffled so no true pair shares a row. No caption.
3. **Pairing**: tap a card → it lifts and outlines (`api.setSelected(true)`, `ANIM.lift`, `tone("tap")`). Tap a card in the OTHER column:
   - **Pair (cause + its effect)**: `ART.arrow` draws from the cause card's right edge to the effect card's left edge (`ANIM.draw`: a line that grows over 400 ms with `ART.arrowHead` at the effect end) and `S("because")` appears at the arrow's midpoint (`ART.becauseTag`); `tone("correct")`; both cards lock (alpha 0.75, `ART.card` stroke turns `structure`); the fox `ANIM.nod`. Praise pop when the board completes.
   - **Not a pair**: both `ANIM.nudge`, `tone("nudge")`, both de-select; each card's clue word is underlined (`ART.clueMark`) for 1200 ms; if the FIRST-tapped card has now been in two non-pairs, its true partner gets `ART.hintRing` (`ANIM.showMe`) until the pair is made. The board never resets.
   - **Two cards in the same column**: the second tap moves the selection to the new card (no error, `tone("tap")`).
   - **Same card twice**: de-select, `tone("tap")`.
4. **Board complete**: all three arrows drawn → the arrows glow in story order (`ANIM.glowArrows`), praise pop (rotation), the rail dot fills, `ANIM.boardOut` (cards and arrows rise and fade), then the next board `ANIM.appear`s after 600 ms.
5. **Boards 2-3**: L1 three distinct characters, links carried by plain words (rain / wet); L2 one character across all six cards, links carried by clue words; L3 one character, one card whose surface words overlap a wrong card (the shared-word trap), and one link that needs a small inference (the sun is hot → the ice cream melts).
6. **Finish**: `t("all_done")` (360, 110); the fox (360, 200) `ANIM.celebrate`; the summary = the nine pairs as chips (`ART.pairChip`, 600 × 26: cause sentence 14 px, a small `ART.arrowMini`, effect sentence 14 px) stacked from y = 290 at 28 px pitch — the story chains the child built; `play_again` (250, 510), `menu` (470, 510); `tone("finish")`.

Session ≈ 6 minutes (3 boards × ~2 minutes).

## Art registry
```js
const ART = {
  fox:         { kind: "emoji", value: "🦊", size: 80 },                     // mascot
  sceneCard:   { kind: "shape", shape: "roundRect", w: 120, h: 70, fill: "surface", stroke: "structure", strokeWidth: 3, radius: 14 },
  card:        { kind: "shape", shape: "roundRect", w: 280, h: 80, fill: "surface", stroke: "line", strokeWidth: 2, radius: 12 },   // sentence 20 px body ink; small picture 32 px at the left
  causeHead:   { kind: "shape", shape: "circle", r: 10, fill: "structure" },
  effectHead:  { kind: "shape", shape: "polygon", points: [[-14, -8], [6, -8], [6, -14], [16, 0], [6, 14], [6, 8], [-14, 8]], fill: "structure" },   // a dot-with-arrow stub, column head
  arrow:       { kind: "shape", shape: "line", w: 40, stroke: "structure", strokeWidth: 5 },   // endpoints set at runtime: cause right edge → effect left edge
  arrowHead:   { kind: "shape", shape: "polygon", points: [[0, 0], [-16, -9], [-16, 9]], fill: "structure" },   // rotated to the arrow's angle at the effect end
  arrowMini:   { kind: "shape", shape: "line", w: 24, stroke: "structure", strokeWidth: 3 },
  becauseTag:  { kind: "shape", shape: "roundRect", w: 96, h: 28, fill: "structureSoft", stroke: "structure", strokeWidth: 1, radius: 8 },   // holds S("because") 16 px display structure; w = text width + 20
  clueMark:    { kind: "shape", shape: "rect", w: 40, h: 4, fill: "accent" },   // width = the clue word's width at runtime
  hintRing:    { kind: "shape", shape: "roundRect", w: 292, h: 92, stroke: "structure", strokeWidth: 4, radius: 16 },
  pairChip:    { kind: "shape", shape: "roundRect", w: 600, h: 26, fill: "structureSoft", stroke: "structure", strokeWidth: 1, radius: 8 },
  dotEmpty:    { kind: "shape", shape: "circle", r: 8, stroke: "line", strokeWidth: 2 },
  dotFull:     { kind: "shape", shape: "circle", r: 8, fill: "structure" },
  // scene pictures (the board's setting)
  picRain:     { kind: "emoji", value: "🌧️", size: 44 },   // rainy day
  picFarm:     { kind: "emoji", value: "🌾", size: 44 },   // farm / field
  picHouse:    { kind: "emoji", value: "🏠", size: 44 },   // at home
  picSunny:    { kind: "emoji", value: "☀️", size: 44 },   // hot sunny day
  picGarden:   { kind: "emoji", value: "🌻", size: 44 },   // garden
  picNight:    { kind: "emoji", value: "🌙", size: 44 },   // night
  // small card pictures (the clue's picture; 32 px)
  picDrop:     { kind: "emoji", value: "💧", size: 32 },   // rain / water
  picUmbrella: { kind: "emoji", value: "☂️", size: 32 },   // umbrella
  picPuddle:   { kind: "emoji", value: "🌊", size: 32 },   // wet
  picCat:      { kind: "emoji", value: "🐱", size: 32 },   // cat
  picDog:      { kind: "emoji", value: "🐶", size: 32 },   // dog
  picHen:      { kind: "emoji", value: "🐔", size: 32 },   // hen
  picEgg:      { kind: "emoji", value: "🥚", size: 32 },   // egg
  picBone:     { kind: "emoji", value: "🦴", size: 32 },   // bone (Unicode 11)
  picBowl:     { kind: "emoji", value: "🍲", size: 32 },   // food bowl
  picBed:      { kind: "emoji", value: "🛏️", size: 32 },   // bed / sleep
  picIceCream: { kind: "emoji", value: "🍦", size: 32 },   // ice cream
  picHat:      { kind: "emoji", value: "🧢", size: 32 },   // sun hat (cap)
  picSeed:     { kind: "emoji", value: "🌱", size: 32 },   // seed / sprout
  picFlower:   { kind: "emoji", value: "🌸", size: 32 },   // flower
  picWind:     { kind: "emoji", value: "🌬️", size: 32 },   // wind
  picLeaf:     { kind: "emoji", value: "🍃", size: 32 },   // leaves
  picBall:     { kind: "emoji", value: "⚽", size: 32 },   // ball
  picMud:      { kind: "emoji", value: "🐷", size: 32 },   // mud (pig)
  picBath:     { kind: "emoji", value: "🛁", size: 32 },   // bath
  picBee:      { kind: "emoji", value: "🐝", size: 32 },   // bee
  picHoney:    { kind: "emoji", value: "🍯", size: 32 },   // honey
  picSnow:     { kind: "emoji", value: "❄️", size: 32 },   // snow / cold
  picCoat:     { kind: "emoji", value: "🧥", size: 32 },   // coat (Unicode 11)
  picStar:     { kind: "emoji", value: "⭐", size: 32 },   // stars
  picOwl:      { kind: "emoji", value: "🦉", size: 32 }    // owl
};
```
All emoji are Unicode 11 or older; no fallbacks needed. The column heads and arrows are shapes; the "because" tag is text; the clue underline is a bar — meaning is never colour alone.

## Animation registry
```js
const ANIM = {
  lift:       { y: "-=6", scale: 1.04, duration: 120, ease: "Sine.Out", trigger: "card selected" },
  nudge:      { x: "+=10", duration: 80, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "both cards of a non-pair" },
  draw:       { scaleX: 1, duration: 400, ease: "Sine.Out", trigger: "arrow from scaleX 0 (origin at the cause end); arrowHead and becauseTag appear at the end" },
  markIn:     { alpha: 1, duration: 200, ease: "Sine.Out", yoyo: true, hold: 1200, trigger: "clueMark under a clue word (from alpha 0)" },
  nod:        { y: "-=8", duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "fox on each pair" },
  showMe:     { alpha: 1, duration: 500, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "hintRing on the true partner (from alpha 0.2)" },
  glowArrows: { alpha: 0.4, duration: 200, ease: "Sine.InOut", yoyo: true, trigger: "each arrow in story order, 300 ms apart, when the board completes" },
  boardOut:   { y: "-=30", alpha: 0, duration: 300, ease: "Sine.In", trigger: "all cards and arrows when a board completes" },
  appear:     { alpha: 1, scale: 1, duration: 200, ease: "Back.Out", trigger: "new board (from alpha 0, scale 0.6)" },
  celebrate:  { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "finish fox" }
};
```
Implementation note: each card's sentence is drawn as one text object per WORD (20 px, 6 px gaps, wrapping to a second line at 220 px) so `ART.clueMark` can sit under the clue word; `LOCALE_DATA` names the clue word index per card. The arrow is a Graphics line inside a container whose origin is the cause end, so `ANIM.draw` scales it out along its own length.

## Screen layout
```
y   0 ┌──────────────────────────────────────────────────────────────┐
      │ [lang]                     ○ ○ ○   rail y=28 (one dot per board)│  zone T
 56   ├──────────────────────────────────────────────────────────────┤
      │  fox (60,84)              [ scene ] (360,84) 120×70           │
      │            ●  causes (200,122)          ●> effects (520,122)  │
      │   ┌────────────────────┐          ┌────────────────────┐     │
      │   │[pic] It rains hard. │ y=170    │[pic] The cat is wet.│     │  zones A+B
      │   └────────────────────┘          └────────────────────┘     │
      │   ┌────────────────────┐          ┌────────────────────┐     │
      │   │[pic] ...            │ y=270    │[pic] ...            │     │
      │   └────────────────────┘          └────────────────────┘     │
      │   ┌────────────────────┐          ┌────────────────────┘     │
      │   │[pic] ...            │ y=370    │[pic] ...            │     │
      │   └────────────────────┘          └────────────────────┘     │
      │        x=200 (280×80)                  x=520 (280×80)         │
480   ├──────────────────────────────────────────────────────────────┤
      │                                                              │  zone C
560   └──────────────────────────────────────────────────────────────┘
```
Fixed layout, FIT scaling. ● and ●> stand for `ART.causeHead` and `ART.effectHead`; arrows draw across the 40-px gap between the columns (from x = 340 to x = 380 plus the row offset).

## Visual specification
- Background `THEME.colour.bg`; rail per §6 with 3 × `ART.dotEmpty` centred at y = 28, swapped for `ART.dotFull` as boards complete.
- `ART.sceneCard` at (360, 84) with the board's scene picture at 44 px; `ART.fox` at (60, 84) at 40 px; `ART.causeHead` at (200, 122); `ART.effectHead` at (520, 122).
- Cards: `makeTile` 280 × 80 with `ART.card` tokens; the small picture at the card's (−112, 0) at 32 px; the sentence from the card's (−88, 0), 20 px `THEME.font.body` `THEME.colour.ink`, `wordWrap` 220, at most two lines (a 1.6× locale of a 6-word line ≈ 300 px wraps to two lines of 20 px; a card that would need a third line drops to 17 px — never three lines). Selected = library selected look + `ANIM.lift`; locked = alpha 0.75 with the `structure` stroke.
- `ART.arrow` from the cause card's right edge (x = 340) to the effect card's left edge (x = 380) at the two cards' y; `ART.arrowHead` at the effect end rotated to the arrow's angle; `ART.becauseTag` at the arrow's midpoint holding `S("because")` at 16 px `THEME.font.display` `THEME.colour.structure`.
- `ART.clueMark` 4 px under a clue word; `ART.hintRing` behind a card.
- Tap floors: cards 280 × 80 (≥ 56); row gap 20; column gap 40.
- Keyboard: Tab walks the cause column top to bottom, then the effect column; Enter selects; a second Enter on a card in the other column attempts the pair.

## Content
Boards are language-bound. `LOCALE_DATA[lang].boards` = `{ L1: [...], L2: [...], L3: [...] }`; a board = `{ scene: <ART key>, pairs: [{ cause: { text, pic, clue }, effect: { text, pic, clue } }, ×3] }` where `clue` is the word index of the link word. The English set is complete (three boards per level, one used per level per session). **Other locales: a native board set is required — en pilot** (`LOCALE_DATA[lang] = "en"` until then; the `because` string is a game string translated with the UI, not board data). Author's rules: ≤ 6 words per card; L2-L3 boards use one character throughout; L3 includes one shared-word trap and one small inference.

**en** — scene; cause → effect (clue words in the two cards):
- **L1** (three characters; plain links):
  - Board A `ART.picRain`: It rains hard. (`ART.picDrop`; rains) → The cat is wet. (`ART.picPuddle`; wet) · The dog is hungry. (`ART.picDog`; hungry) → The dog eats its food. (`ART.picBowl`; eats) · The hen lays an egg. (`ART.picHen`; lays) → We eat the egg. (`ART.picEgg`; eat)
  - Board B `ART.picSunny`: The sun is very hot. (`ART.picSunny`; hot) → The ice cream melts. (`ART.picIceCream`; melts) · The wind blows hard. (`ART.picWind`; blows) → The leaves fly away. (`ART.picLeaf`; fly) · The dog rolls in mud. (`ART.picMud`; mud) → The dog needs a bath. (`ART.picBath`; bath)
  - Board C `ART.picGarden`: We plant a seed. (`ART.picSeed`; plant) → A flower grows. (`ART.picFlower`; grows) · The bee finds flowers. (`ART.picBee`; finds) → The bee makes honey. (`ART.picHoney`; honey) · It starts to rain. (`ART.picDrop`; rain) → We open the umbrella. (`ART.picUmbrella`; umbrella)
- **L2** (one character throughout; clue-word links):
  - Board D `ART.picHouse` (the cat): The cat is sleepy. (`ART.picCat`; sleepy) → The cat goes to bed. (`ART.picBed`; bed) · The cat is hungry. (`ART.picCat`; hungry) → The cat eats its food. (`ART.picBowl`; eats) · The cat sits in the rain. (`ART.picDrop`; rain) → The cat is wet. (`ART.picPuddle`; wet)
  - Board E `ART.picFarm` (the dog): The dog runs all day. (`ART.picDog`; runs) → The dog is tired. (`ART.picBed`; tired) · The dog rolls in mud. (`ART.picMud`; mud) → The dog gets a bath. (`ART.picBath`; bath) · The dog finds a bone. (`ART.picBone`; finds) → The dog is happy. (`ART.picDog`; happy)
  - Board F `ART.picNight` (the owl): The sun goes down. (`ART.picNight`; down) → The owl wakes up. (`ART.picOwl`; wakes) · The owl is hungry. (`ART.picOwl`; hungry) → The owl hunts a mouse. (`ART.picOwl`; hunts) · The stars come out. (`ART.picStar`; stars) → The sky looks bright. (`ART.picStar`; bright)
- **L3** (one character; one shared-word trap; one small inference):
  - Board G `ART.picSunny` (the girl): The sun is very hot. (`ART.picSunny`; hot) → Her ice cream melts. (`ART.picIceCream`; melts) · She forgets her hat. (`ART.picHat`; forgets) → Her face gets red. (`ART.picSunny`; red) · She drinks cold water. (`ART.picDrop`; drinks) → She feels better. (`ART.picDrop`; better) — trap: "The sun is very hot." shares "hot" with nothing but tempts "Her face gets red." (the true cause of red is the forgotten hat)
  - Board H `ART.picRain` (the boy): It rains all morning. (`ART.picDrop`; rains) → The ground is muddy. (`ART.picPuddle`; muddy) · He kicks the ball hard. (`ART.picBall`; kicks) → The ball lands in mud. (`ART.picMud`; lands) · The ball is muddy. (`ART.picMud`; muddy) → He washes the ball. (`ART.picBath`; washes) — trap: two cards say "muddy"; the ground being muddy does not cause the washing, the muddy BALL does
  - Board I `ART.picSnow` (the cat): Snow falls all night. (`ART.picSnow`; snow) → The garden is white. (`ART.picSnow`; white) · The cat goes outside. (`ART.picCat`; outside) → The cat feels cold. (`ART.picSnow`; cold) · The cat is cold. (`ART.picCat`; cold) → The cat gets a coat. (`ART.picCoat`; coat) — trap: "cold" appears twice; feeling cold is the EFFECT of going out and the CAUSE of the coat — the chain is enacted by the two arrows
- Every card ≤ 6 words. `ART.picSnow` serves as a scene picture for Board I at 44 px through the same entry.

Play list: one board per level, chosen at random from that level's three; levels change per Rules; columns shuffled so no true pair shares a row at the start.

## Rules
- Item count: one "item" = one board; 3 boards per session (9 pairs ≈ 6 minutes).
- Difficulty progression: a board completed with at most one non-pair → next board one level up (cap L3).
- Adaptation: a board with three or more non-pairs → next board one level down (floor L1); a board with exactly two non-pairs → same level.
- What happens on a correct answer: `ART.arrow` `ANIM.draw` from cause to effect with `ART.arrowHead` and `ART.becauseTag`, `tone("correct")`, both cards lock, fox `ANIM.nod`; on board completion the arrows `ANIM.glowArrows` in story order, a praise pop (rotation ["well_done", "great_job", "excellent", "you_did_it", "keep_going"]) and the rail dot.
- What happens on a wrong answer:
  - Shared-word pairing (two cards that repeat a name or a word but are not linked): both nudge, `tone("nudge")`, both de-select; the clue word on each is underlined for 1200 ms.
  - Adjacency / picture pairing (two cards on the same row or with the same small picture): the same cue.
  - Reversed tap order (effect tapped first, then its cause): NOT an error — the pair locks and the arrow draws from the cause anyway.
  - The same card in two non-pairs: its true partner gains `ART.hintRing` (the show-me step for this pattern); the ring stays until the pair is made.
- Retry behaviour: unlimited within the board; support escalates per card (two misses → its partner is shown). A board always completes (success is certain).
- Finish condition: 3 boards complete. No losing state, no clock.

## Strings
- `GameCore.t()` keys: `t("start")`, `t("all_done")`, `t("play_again")`, `t("menu")`, `t("well_done")`, `t("great_job")`, `t("excellent")`, `t("you_did_it")`, `t("keep_going")`.
- Game-specific: `title` = "Because"; `because` = "because" (the arrow tag). The cards are content from `LOCALE_DATA`.

## Sound
`tone("tap")` on select / de-select; `tone("correct")` on a pair (as the arrow finishes drawing); `tone("nudge")` on a non-pair; `tone("tap", k)` as the k-th arrow glows on board completion; `tone("finish")` once. Silent under `?sound=off`. Nothing is read aloud.

## Testing checklist
- [ ] Works in all 11 languages ("because" and the chrome strings change with the picker; `?lang=es` plays the English boards until a Spanish set exists and nothing breaks).
- [ ] Works at narrow width (400-px iframe: scene, both columns of three cards and the arrows visible; no card needs a third text line).
- [ ] Keyboard operable (Tab down the cause column then the effect column; Enter selects; Enter on a card in the other column attempts the pair).
- [ ] Never auto-starts.
- [ ] No losing state (any number of non-pairs still ends with three arrows on every board; hint rings appear after two misses on a card).
- [ ] All six cards are face up; no true pair sits on the same row when a board appears.
- [ ] Tapping "It rains hard." then "The cat is wet." draws an arrow from the left card to the right card with "because" on it; tapping them in the other order draws the same arrow the same way.
- [ ] Tapping "The dog is hungry." then "The cat is wet." nudges both and underlines "hungry" and "wet".
- [ ] At the second level every card is about the same animal and pairing by the animal's name does not work.
- [ ] At the third level the two "muddy" cards do not pair with each other; the ball card pairs with the washing card.
- [ ] Completing a board glows the three arrows from top to bottom with rising notes.
- [ ] A board with 0-1 mistakes is followed by a harder board; a board with 3+ mistakes by an easier one.
- [ ] The finish screen lists nine cause → effect chips and no score.
- [ ] With `?sound=off` nothing is audible.
