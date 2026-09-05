# 159 — Goes Together

## Identity
- Slug: `goes-together`
- Subject / topic: Literacy / vocabulary associations — pairing two pictured objects that belong together in use or by nature (sock and shoe, key and lock, bee and flower)
- Age band: `5-6`
- Interaction pattern: `P12` — match pairs (all tiles visible; memory is not the objective)
- Estimated build size: ~400 lines

Shared contract: `catalogue/BUILD-CONVENTIONS.md`. Pattern contract: `catalogue/PATTERNS.md` P12. Band note: **no instruction text on the play screen** — six picture tiles are the whole prompt, the first pair is discoverable by tapping two tiles, and every tile is ≥ 80 px. Language-neutral by construction (pictures only; the associations chosen are functional or natural — a sock and a shoe, a hen and an egg — not verbal, so they hold in all 11 languages; no currency, holiday or word play). Nothing is spoken.

## Learning
- Objective: On a visible board of six pictures, pairs each picture with the one it goes together with (by use — sock/shoe, key/lock; or by nature — bee/flower, hen/egg), including boards where two animals or two foods are present so that "same kind" is not enough.
- Prerequisites: Names the pictured objects in the play language (all are everyday nouns from the picture pool used across the catalogue). Knows the P12 move (tap one, tap another) — or discovers it here.
- Curriculum links: F-22 (vocabulary and oral-language development in every system's pre-primary year — the "which things belong together" task is a standard early-vocabulary format), F-126 ("matches on first sound or meaning (cat–cow, cat–dog)" — semantic-association errors are the same error class this game surfaces deliberately), F-40 (cued recognition with immediate feedback), F-217 (language-universal mechanic, per-locale review of the picture pool only), F-31 row "Sort/classify by one attribute" — conservative 6, earliest 4 → 5-6 (US L.K.5.a "sort common objects into categories"; England Reception ELG "understanding the world"; Germany Vorschule Wortschatz "was gehört zusammen"; France GS "associer des objets"; Netherlands groep 1-2 "wat hoort bij elkaar"; Spain Infantil "asociaciones"; Brazil EI03EO; Sweden förskoleklass "begrepp"; Finland esiopetus "käsitteet").
- Common misconceptions (F-126, F-129), each with this game's response:
  1. **Pairs by category instead of by association — two animals together, two foods together (cat with dog; carrot with banana).** Response: L3 boards hold three animals and three things that each belong to ONE animal (rabbit/carrot, monkey/banana, mouse/cheese), so "both animals" is never a pair; a wrong pair nudges apart, and after the same tile has been in two wrong pairs its true partner gains a soft outline (`ART.hintRing`) — the board never resets.
  2. **Pairs by look — two round things, two red things (ball with sun).** Response: a wrong pair nudges apart with `tone("nudge")` and nothing else — no verdict; boards avoid two tiles that look alike unless they ARE the pair; the correct pair, when made, slides together and a link bar (`ART.link`) joins them so the "belong together" idea is enacted, not just rewarded.
  3. **Pairs by adjacency — the two tiles next to each other.** Response: on a fresh board the two tiles of one pair are never horizontally adjacent in the same row (§13); tile positions are shuffled per board.
  4. **Tapping the same tile twice expecting a match.** Response: the second tap de-selects it (`tone("tap")` only; no error).
  5. **Locking a pair the child made by accident (two taps in a row on a pair by luck).** Response: acceptable — success is certain (F-46); a board completed with two or more wrong pairs stays at its level so the next board offers the same challenge again.

## How it plays
1. **Start screen**: title "Goes Together", the chick (`ART.chick`) at (360, 200), Start, picker.
2. **Board 1 (L1: 3 pairs, 6 tiles)**: the rail shows 3 dots (§6 — one per board; three boards per session). Zones A and B merge: a 3 × 2 grid of picture tiles (`ART.tile`, 100 × 100, gap 20) centred on (360, 300): columns x = 240 / 360 / 480, rows y = 240 / 360. The six tiles show `ART.picSock`, `ART.picShoe`, `ART.picKey`, `ART.picLock`, `ART.picPencil`, `ART.picPaper` at 60 px in a shuffled layout. The chick stands at (80, 300). No caption, no words.
3. **Pairing**: tap a tile → it lifts and outlines (`api.setSelected(true)`, `ANIM.lift`, `tone("tap")`). Tap a second tile:
   - **Pair** (sock + shoe): both tiles glide 20 px toward each other (`ANIM.join`), `tone("correct")`, then lock: both dim to alpha 0.6 with `ART.link` (a short teal bar) drawn between their facing edges; the chick `ANIM.hop`. Praise pop only when the board completes.
   - **Not a pair** (sock + key): both `ANIM.nudge`, `tone("nudge")`, both de-select; if the FIRST-tapped tile has now been in two wrong pairs, its partner gets `ART.hintRing` (`ANIM.showMe`) until the pair is made.
   - **Same tile twice**: de-select, `tone("tap")`.
4. **Board complete**: all three pairs locked → praise pop (rotation), the rail dot fills, `ANIM.boardOut` (all tiles rise and fade), the next board `ANIM.appear`s after 600 ms.
5. **Boards 2-3**: per Content/Rules. L1 things that are used together; L2 an animal and the thing it goes with (each board three animals + three things, each thing belonging to one animal only); L3 boards that mix animal/thing pairs with thing/thing pairs and include a tempting cross-pair (a cat and a bone on the same board as a dog).
6. **Finish**: `t("all_done")` (360, 110); the chick (360, 210) `ANIM.celebrate`; the summary = every pair made this session as joined chips (`ART.pairChip`, 96 × 44: the two pictures at 28 px side by side with a tiny `ART.link` between them) in rows of five from y = 340 (x = 160 + i × 100) — the visual record of the learning; no score, no numbers (5-6 band); `play_again` (250, 510), `menu` (470, 510); `tone("finish")`.

Session ≈ 4-5 minutes (3 boards × ~80 s).

## Art registry
```js
const ART = {
  chick:      { kind: "emoji", value: "🐥", size: 80 },                     // mascot
  tile:       { kind: "shape", shape: "roundRect", w: 100, h: 100, fill: "surface", stroke: "line", strokeWidth: 2, radius: 14 },   // picture 60 px
  link:       { kind: "shape", shape: "rect", w: 24, h: 6, fill: "structure" },
  hintRing:   { kind: "shape", shape: "roundRect", w: 112, h: 112, stroke: "structure", strokeWidth: 4, radius: 18 },
  pairChip:   { kind: "shape", shape: "roundRect", w: 96, h: 44, fill: "structureSoft", stroke: "structure", strokeWidth: 2, radius: 8 },
  dotEmpty:   { kind: "shape", shape: "circle", r: 8, stroke: "line", strokeWidth: 2 },
  dotFull:    { kind: "shape", shape: "circle", r: 8, fill: "structure" },
  // picture pool (each an object whose English name is unambiguous; the intended word in the comment)
  picSock:      { kind: "emoji", value: "🧦", size: 60 },   // sock (Unicode 11)
  picShoe:      { kind: "emoji", value: "👟", size: 60 },   // shoe
  picKey:       { kind: "emoji", value: "🔑", size: 60 },   // key
  picLock:      { kind: "emoji", value: "🔒", size: 60 },   // lock
  picPencil:    { kind: "emoji", value: "✏️", size: 60 },   // pencil
  picPaper:     { kind: "emoji", value: "📄", size: 60 },   // paper
  picUmbrella:  { kind: "emoji", value: "☂️", size: 60 },   // umbrella
  picRain:      { kind: "emoji", value: "🌧️", size: 60 },   // rain
  picBed:       { kind: "emoji", value: "🛏️", size: 60 },   // bed
  picMoon:      { kind: "emoji", value: "🌙", size: 60 },   // moon (night)
  picSpoon:     { kind: "emoji", value: "🥄", size: 60 },   // spoon
  picBowl:      { kind: "emoji", value: "🥣", size: 60 },   // bowl (Unicode 10)
  picBall:      { kind: "emoji", value: "⚽", size: 60 },   // ball
  picGoal:      { kind: "emoji", value: "🥅", size: 60 },   // goal (net)
  picScissors:  { kind: "emoji", value: "✂️", size: 60 },   // scissors
  picCandle:    { kind: "emoji", value: "🕯️", size: 60 },   // candle
  picCake:      { kind: "emoji", value: "🎂", size: 60 },   // cake
  picBrush:     { kind: "emoji", value: "🖌️", size: 60 },   // paintbrush
  picPalette:   { kind: "emoji", value: "🎨", size: 60 },   // paints (palette)
  picBee:       { kind: "emoji", value: "🐝", size: 60 },   // bee
  picFlower:    { kind: "emoji", value: "🌸", size: 60 },   // flower
  picRabbit:    { kind: "emoji", value: "🐰", size: 60 },   // rabbit
  picCarrot:    { kind: "emoji", value: "🥕", size: 60 },   // carrot
  picDog:       { kind: "emoji", value: "🐶", size: 60 },   // dog
  picBone:      { kind: "emoji", value: "🦴", size: 60 },   // bone (Unicode 11)
  picMonkey:    { kind: "emoji", value: "🐒", size: 60 },   // monkey
  picBanana:    { kind: "emoji", value: "🍌", size: 60 },   // banana
  picHen:       { kind: "emoji", value: "🐔", size: 60 },   // hen
  picEgg:       { kind: "emoji", value: "🥚", size: 60 },   // egg
  picSpider:    { kind: "emoji", value: "🕷️", size: 60 },   // spider
  picWeb:       { kind: "emoji", value: "🕸️", size: 60 },   // web
  picCow:       { kind: "emoji", value: "🐮", size: 60 },   // cow
  picMilk:      { kind: "emoji", value: "🥛", size: 60 },   // milk
  picSquirrel:  { kind: "emoji", value: "🐿️", size: 60 },   // squirrel
  picAcorn:     { kind: "emoji", value: "🌰", size: 60 },   // acorn (chestnut glyph)
  picFish:      { kind: "emoji", value: "🐟", size: 60 },   // fish
  picWater:     { kind: "emoji", value: "🌊", size: 60 },   // water
  picCat:       { kind: "emoji", value: "🐱", size: 60 },   // cat
  picYarn:      { kind: "emoji", value: "🧶", size: 60 },   // ball of wool (Unicode 11)
  picMouse:     { kind: "emoji", value: "🐭", size: 60 },   // mouse
  picCheese:    { kind: "emoji", value: "🧀", size: 60 },   // cheese
  picSunglasses:{ kind: "emoji", value: "🕶️", size: 60 },   // sunglasses
  picSun:       { kind: "emoji", value: "☀️", size: 60 },   // sun
  picScarf:     { kind: "emoji", value: "🧣", size: 60 },   // scarf (Unicode 11)
  picSnow:      { kind: "emoji", value: "❄️", size: 60 }    // snowflake
};
```
No emoji newer than Unicode 12 is used, so no `fallback` is required. No words appear on the play screen.

## Animation registry
```js
const ANIM = {
  lift:      { y: "-=8", scale: 1.06, duration: 120, ease: "Sine.Out", trigger: "tile selected" },
  join:      { duration: 220, ease: "Back.Out", trigger: "each of a correct pair moves 20 px toward the other (x,y at call)" },
  nudge:     { x: "+=10", duration: 80, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "both tiles of a wrong pair" },
  hop:       { y: "-=12", duration: 140, ease: "Sine.Out", yoyo: true, repeat: 1, trigger: "chick on each correct pair" },
  showMe:    { alpha: 1, duration: 500, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "hintRing on the true partner (from alpha 0.2)" },
  boardOut:  { y: "-=30", alpha: 0, duration: 300, ease: "Sine.In", trigger: "all tiles when a board completes" },
  appear:    { alpha: 1, scale: 1, duration: 200, ease: "Back.Out", trigger: "new board tiles (from alpha 0, scale 0.6)" },
  celebrate: { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "finish chick" }
};
```
No flashing: `showMe` cycles at 1 Hz; nothing else repeats.

## Screen layout
```
y   0 ┌──────────────────────────────────────────────────────────────┐
      │ [lang]                     ○ ○ ○   rail y=28 (one per board)  │  zone T
 56   ├──────────────────────────────────────────────────────────────┤
      │                                                              │
      │  chick        [sock]      [key ]      [paper]    row y=240    │
      │  (80,300)                                                    │  zones A+B
      │               [lock]      [shoe]      [pencil]   row y=360    │
      │               x=240       x=360       x=480     (100×100)    │
480   ├──────────────────────────────────────────────────────────────┤
      │                                                              │  zone C
560   └──────────────────────────────────────────────────────────────┘
```
Fixed layout, FIT scaling. Six tiles on every board (the catalogue's "visible board of six pictures").

## Visual specification
- Background `THEME.colour.bg`; rail per §6 with 3 × `ART.dotEmpty` at y = 28 (x = 338 + i × 22), swapped for `ART.dotFull` as boards complete.
- Tiles: `makeTile` 100 × 100 with `ART.tile` tokens; label = the picture at 60 px read through `ART[picKey].value`; selected = library selected look + `ANIM.lift`; locked = alpha 0.6 + `ART.link` drawn at the midpoint between the two locked tiles (rotated 90° when the tiles are in the same column).
- `ART.hintRing` behind a tile. `ART.chick` at (80, 300).
- Tap floors 100 ≥ 80; gaps 20. Meaning is never carried by colour: the locked state is dim + bar, the selected state is outline + lift.
- Keyboard: arrows move across the 3 × 2 grid (row-major), Enter selects; a second Enter on another tile attempts the pair.

## Content
Language-neutral (pictures only). `CONTENT` = `{ L1: [...], L2: [...], L3: [...] }`; a board = three pairs `[[keyA, keyB], [keyC, keyD], [keyE, keyF]]`; the pair predicate is "the two tiles carry the same pair index" (never label equality). Boards are authored, not drawn from a pool, so no board contains a plausible cross-pair except where the level intends one.

- **L1** (things used together):
  1. [`ART.picSock`, `ART.picShoe`] · [`ART.picKey`, `ART.picLock`] · [`ART.picPencil`, `ART.picPaper`]
  2. [`ART.picUmbrella`, `ART.picRain`] · [`ART.picBed`, `ART.picMoon`] · [`ART.picSpoon`, `ART.picBowl`]
  3. [`ART.picBall`, `ART.picGoal`] · [`ART.picScissors`, `ART.picPaper`] · [`ART.picCandle`, `ART.picCake`]
  4. [`ART.picBrush`, `ART.picPalette`] · [`ART.picSock`, `ART.picShoe`] · [`ART.picKey`, `ART.picLock`]
- **L2** (an animal and its thing; three animals + three things per board, each thing belonging to one animal):
  5. [`ART.picBee`, `ART.picFlower`] · [`ART.picRabbit`, `ART.picCarrot`] · [`ART.picDog`, `ART.picBone`]
  6. [`ART.picMonkey`, `ART.picBanana`] · [`ART.picHen`, `ART.picEgg`] · [`ART.picSpider`, `ART.picWeb`]
  7. [`ART.picCow`, `ART.picMilk`] · [`ART.picSquirrel`, `ART.picAcorn`] · [`ART.picFish`, `ART.picWater`]
- **L3** (mixed boards with a tempting cross-pair):
  8. [`ART.picDog`, `ART.picBone`] · [`ART.picCat`, `ART.picYarn`] · [`ART.picBee`, `ART.picFlower`] — tempting: cat + bone, dog + yarn
  9. [`ART.picRabbit`, `ART.picCarrot`] · [`ART.picMonkey`, `ART.picBanana`] · [`ART.picMouse`, `ART.picCheese`] — tempting: any animal + any food
  10. [`ART.picUmbrella`, `ART.picRain`] · [`ART.picSunglasses`, `ART.picSun`] · [`ART.picScarf`, `ART.picSnow`] — tempting: scarf + rain, umbrella + sun
  11. [`ART.picHen`, `ART.picEgg`] · [`ART.picCow`, `ART.picMilk`] · [`ART.picSpoon`, `ART.picBowl`] — tempting: hen + bowl, spoon + egg

Tile layout shuffled per board; the two tiles of one pair are never horizontally adjacent in the same row on a fresh board. Play list: 3 boards per session by level per Rules; a board never repeats within a session.

## Rules
- Item count: one "item" = one board of 3 pairs; 3 boards per session (9 pairs).
- Difficulty progression: a board completed with at most one wrong pair → next board one level up (cap L3).
- Adaptation: a board with three or more wrong pairs → next board one level down (floor L1); exactly two wrong pairs → same level.
- What happens on a correct answer: `ANIM.join`, `tone("correct")`, tiles lock with `ART.link`, chick `ANIM.hop`; on board completion a praise pop (rotation ["well_done", "great_job", "excellent", "you_did_it", "keep_going"]) and the rail dot.
- What happens on a wrong answer:
  - Two tiles of the same kind (two animals, two foods) or two look-alikes: both nudge, `tone("nudge")`, both de-select; the board is never reset.
  - A tempting cross-pair at L3 (cat + bone): the same nudge; the hint ring after two misses on a tile shows its true partner.
  - The same tile in two wrong pairs: its partner gains `ART.hintRing` (the show-me step for this pattern); the ring stays until the pair is made.
  - Same tile tapped twice: de-select only.
- Retry behaviour: unlimited within the board; support escalates per tile (two misses → its partner is shown). A board always completes (F-46, success certain).
- Finish condition: 3 boards complete. No losing state, no clock.

## Strings
- `GameCore.t()` keys: `t("start")`, `t("all_done")`, `t("play_again")`, `t("menu")`, `t("well_done")`, `t("great_job")`, `t("excellent")`, `t("you_did_it")`, `t("keep_going")`.
- Game-specific: `title` = "Goes Together". No words on the play screen.

## Sound
`tone("tap")` on select / de-select; `tone("correct")` on a pair; `tone("nudge")` on a non-pair; `tone("finish")` once. Silent under `?sound=off`. Nothing is spoken; object names are never said or shown.

## Testing checklist
- [ ] Works in all 11 languages (only the chrome strings change; the boards are identical in every language).
- [ ] Works at narrow width (400-px iframe: the 3 × 2 board fully visible with separate tiles).
- [ ] Keyboard operable (arrows move across the grid, Enter selects; a second Enter on another tile attempts the pair).
- [ ] Never auto-starts.
- [ ] No losing state (any number of wrong pairs still ends with every pair locked; a hint ring appears after two misses on a tile).
- [ ] All six tiles are face up at all times; nothing has to be remembered; no word appears on the play screen.
- [ ] Tapping the sock then the shoe slides them together, joins them with a bar, and dims them; they cannot be tapped again.
- [ ] Tapping the sock then the key nudges both apart and leaves them tappable.
- [ ] Tapping a tile twice de-selects it with no error.
- [ ] On the third-level board with the dog, the cat and the bone, pairing the cat with the bone nudges apart; after two misses on the cat its wool gets a ring.
- [ ] A board with 0-1 mistakes is followed by a harder board; a board with 3+ mistakes by an easier one.
- [ ] The finish screen shows every pair made as joined picture chips and no score or numbers.
- [ ] With `?sound=off` nothing is audible.
