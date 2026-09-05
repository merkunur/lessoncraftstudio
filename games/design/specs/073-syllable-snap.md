# 073 — Syllable Snap

## Identity
- Slug: `syllable-snap`
- Subject / topic: Literacy / blending two syllables into a whole word that a picture shows (Romance-first surface: syllable tiles, not letter tiles)
- Age band: `6-8`
- Interaction pattern: `P12` — match pairs (all tiles visible; memory is not the objective)
- Estimated build size: ~470 lines

Shared contract: `catalogue/BUILD-CONVENTIONS.md`. Pattern contract: `catalogue/PATTERNS.md` P12. Locale note: syllable lists are language-bound (F-124, F-24; A-15) and live in `LOCALE_DATA`; English, Spanish, Italian and Brazilian Portuguese are authored below (the Romance three flagged for native review before ship); the other seven locales are declared as needing a native list. Nothing is spoken; each word is cued by its picture.

## Learning
- Objective: Taps two syllable tiles that together make one of the pictured words, so the syllables snap together into the whole word under its picture.
- Prerequisites: Recognises letters; has met the idea that a word can be broken into beats (the free syllable-clapping activities). Reads no sentences.
- Curriculum links: F-24 (ES método silábico, BR BNCC syllable-segmenting codes, IT metodo fono-sillabico, FI KÄTS sound-letter-syllable → syllable builders are Romance-first), F-22 (blending letter-sounds or syllables into words at 6-7 in all twelve systems), F-1 (CVC/blending in 8 of 15 sources), F-31 row "Blending to words (CVC / syllables)" — conservative 7, earliest 4 → 6-8 (Spain 1º ciclo "sílabas y palabras"; Brazil EF01LP06-08 "segmentar … sílabas"; Italy classe prima "sillabe"; France CP "syllabes"; US RF.1.3.d "syllables in a printed word"; Finland 1. luokka "tavu").
- Common misconceptions (F-124, F-126, F-125), each with this game's response:
  1. **Says each syllable but cannot synthesise them into the word.** Response: a correct pair does not just "lock" — the two tiles glide into the word slot under the picture and close the gap between them (`ANIM.snap`), the join line disappears and the whole word is re-drawn as one text (`ART.wordText`) with `ART.wordGlow` behind it; the blending is enacted (F-124 "letters physically slide together").
  2. **Matching on the first syllable only (pen- and then any second tile).** Response: L3 boards contain two words that share a first syllable (pen-guin and pen-cil), so the second tile decides. A wrong second tile shows what was made: the two syllables meet for 800 ms in a bubble (`ART.bubble`, `ART.madeWord` "penbit") in `THEME.colour.inkSoft` above the board, no picture beside it, then nudge apart — "that is not a word on this board".
  3. **Reversing the order (guin + pen).** Response: the pair test is order-free; on success the tiles always arrange themselves in the correct order in the slot (`ANIM.glide` puts the first syllable on the left), so the order is shown rather than penalised.
  4. **Choosing a syllable because it looks like the picture's word start (first-letter guessing, F-125).** Response: L2 and L3 boards hold several syllables with the same first LETTER (pan-, pen-, piz-, pump-) so the child must read the whole syllable; the picture is never drawn beside a syllable tile.
  5. **Tapping the same tile twice expecting a match.** Response: the second tap de-selects it (no error, only `tone("tap")`).

## How it plays
1. **Start screen**: title "Syllable Snap", the koala (`ART.koala`) at (360, 200), Start, picker.
2. **Board 1 (L1: 3 words = 6 syllable tiles)**: the rail shows one dot per board (3 or 4, §6) at y = 28; `t("question_x_of_y")` at (360, 48) counts boards. Zone A: three picture cards (`ART.picCard`, 130 × 110) at y = 130, x = 200 / 360 / 520, each holding its picture at 64 px (e.g. `ART.picRabbit`, `ART.picTiger`, `ART.picRobot`) and, beneath the card, an empty word slot (`ART.wordSlot`, 130 × 44, dashed) at y = 208. The koala sits at (70, 160). Zone B: six syllable tiles (`ART.sylTile`, 120 × 84) in a 3 × 2 grid — columns x = 228 / 360 / 492, rows y = 320 / 420 — showing rab, ti, bot, bit, ro, ger (shuffled), each at 34 px `THEME.font.display` `THEME.colour.ink`. Caption `S("makeWords")` ("Make the words") at (360, 262), 22 px `THEME.colour.inkSoft`.
3. **Pairing**: tap a tile → it lifts (`api.setSelected(true)`, `ANIM.lift`, `tone("tap")`). Tap a second tile:
   - **Pair (the two syllables, in either order, spell one of the board's words)**: `tone("correct")`; both tiles glide (`ANIM.glide`) into that word's slot, first syllable left, second right, 6 px apart; `ANIM.snap` closes the 6 px; the two labels are replaced by `ART.wordText` (the whole word, 28 px) on the slot with `ART.wordGlow` behind it (`ANIM.glow`); the picture card `ANIM.pop`; the koala `ANIM.nod`. Praise pop when the board completes, not per pair.
   - **Not a pair**: `tone("nudge")`; `ART.bubble` appears at (360, 62) with `ART.madeWord` = first-tapped syllable + second-tapped syllable (e.g. "tibit") for 800 ms (`ANIM.fadeOut` after), then both tiles `ANIM.nudge` and de-select. If the FIRST-tapped tile has now been in two wrong pairs, its true partner gains `ART.hintRing` (`ANIM.showMe`) until that pair is made.
   - **Same tile twice**: de-select, `tone("tap")`.
   - **A tile of an already-completed word**: not tappable (locked in the slot at alpha 0.8).
4. **Board complete**: all words in their slots → praise pop (rotation), rail dot fills, `ANIM.boardOut` on the tiles and cards, next board `ANIM.appear` after 600 ms.
5. **Boards 2-4**: L1 3 words; L2 4 words (8 tiles, 4 × 2 grid: x = 162 / 294 / 426 / 558; cards at x = 150 / 290 / 430 / 570, 120 wide); L3 4 words where two share a first syllable and several share a first letter. Session = 3 boards at the base pace, a 4th when the child reaches L3 by the end of board 2 (Rules).
6. **Finish**: `t("all_done")` (360, 110); the koala (360, 200) `ANIM.celebrate`; the summary = every word built this session as chips (`ART.wordChip`, 120 × 36, word 20 px with a thin `ART.joinMark` bar between its two syllables) in rows of five from y = 330 (x = 120 + i × 120) — the words the child blended, not a score; `play_again` (250, 510), `menu` (470, 510); `tone("finish")`.

Session ≈ 5-6 minutes.

## Art registry
```js
const ART = {
  koala:      { kind: "emoji", value: "🐨", size: 80 },                      // mascot
  picCard:    { kind: "shape", shape: "roundRect", w: 130, h: 110, fill: "surface", stroke: "structure", strokeWidth: 3, radius: 16 },
  wordSlot:   { kind: "shape", shape: "roundRect", w: 130, h: 44, fill: "surface2", stroke: "line", strokeWidth: 2, radius: 10 },   // dashed (lineDash [8,6]) while empty
  sylTile:    { kind: "shape", shape: "roundRect", w: 120, h: 84, fill: "surface", stroke: "line", strokeWidth: 2, radius: 14 },     // syllable 34 px display ink
  wordText:   { kind: "text",  value: "", size: 28, font: "display", color: "structure" },
  wordGlow:   { kind: "shape", shape: "roundRect", w: 138, h: 52, fill: "structureSoft", radius: 12 },
  bubble:     { kind: "shape", shape: "roundRect", w: 220, h: 56, fill: "surface", stroke: "line", strokeWidth: 2, radius: 16 },
  madeWord:   { kind: "text",  value: "", size: 28, font: "display", color: "inkSoft" },
  hintRing:   { kind: "shape", shape: "roundRect", w: 132, h: 96, stroke: "structure", strokeWidth: 4, radius: 18 },
  wordChip:   { kind: "shape", shape: "roundRect", w: 120, h: 36, fill: "structureSoft", stroke: "structure", strokeWidth: 1, radius: 8 },
  joinMark:   { kind: "shape", shape: "rect", w: 2, h: 20, fill: "structure" },
  dotEmpty:   { kind: "shape", shape: "circle", r: 8, stroke: "line", strokeWidth: 2 },
  dotFull:    { kind: "shape", shape: "circle", r: 8, fill: "structure" },
  // word pictures — one unambiguous noun each (English gloss in the comment; used by every locale list that names it)
  picRabbit:  { kind: "emoji", value: "🐰", size: 64 },   // rabbit
  picPenguin: { kind: "emoji", value: "🐧", size: 64 },   // penguin
  picTurtle:  { kind: "emoji", value: "🐢", size: 64 },   // turtle
  picMonkey:  { kind: "emoji", value: "🐒", size: 64 },   // monkey
  picTiger:   { kind: "emoji", value: "🐯", size: 64 },   // tiger
  picPanda:   { kind: "emoji", value: "🐼", size: 64 },   // panda
  picSpider:  { kind: "emoji", value: "🕷️", size: 64 },   // spider
  picDragon:  { kind: "emoji", value: "🐉", size: 64 },   // dragon
  picRobot:   { kind: "emoji", value: "🤖", size: 64 },   // robot
  picRocket:  { kind: "emoji", value: "🚀", size: 64 },   // rocket
  picCarrot:  { kind: "emoji", value: "🥕", size: 64 },   // carrot
  picLemon:   { kind: "emoji", value: "🍋", size: 64 },   // lemon
  picApple:   { kind: "emoji", value: "🍎", size: 64 },   // apple
  picCookie:  { kind: "emoji", value: "🍪", size: 64 },   // cookie
  picPizza:   { kind: "emoji", value: "🍕", size: 64 },   // pizza
  picPumpkin: { kind: "emoji", value: "🎃", size: 64 },   // pumpkin
  picCactus:  { kind: "emoji", value: "🌵", size: 64 },   // cactus
  picRainbow: { kind: "emoji", value: "🌈", size: 64 },   // rainbow
  picSnowman: { kind: "emoji", value: "⛄", size: 64 },   // snowman
  picHammer:  { kind: "emoji", value: "🔨", size: 64 },   // hammer
  picMagnet:  { kind: "emoji", value: "🧲", size: 64 },   // magnet
  picBasket:  { kind: "emoji", value: "🧺", size: 64 },   // basket
  picPencil:  { kind: "emoji", value: "✏️", size: 64 },   // pencil
  picCandle:  { kind: "emoji", value: "🕯️", size: 64 },   // candle
  picZebra:   { kind: "emoji", value: "🦓", size: 64 },   // zebra
  picCupcake: { kind: "emoji", value: "🧁", size: 64 },   // cupcake
  picCat:     { kind: "emoji", value: "🐱", size: 64 },   // cat
  picDog:     { kind: "emoji", value: "🐶", size: 64 },   // dog
  picDuck:    { kind: "emoji", value: "🦆", size: 64 },   // duck
  picBear:    { kind: "emoji", value: "🐻", size: 64 },   // bear
  picCow:     { kind: "emoji", value: "🐮", size: 64 },   // cow
  picFrog:    { kind: "emoji", value: "🐸", size: 64 },   // frog
  picWolf:    { kind: "emoji", value: "🐺", size: 64 },   // wolf
  picLion:    { kind: "emoji", value: "🦁", size: 64 },   // lion
  picMouse:   { kind: "emoji", value: "🐭", size: 64 },   // mouse
  picPig:     { kind: "emoji", value: "🐷", size: 64 },   // pig
  picFox:     { kind: "emoji", value: "🦊", size: 64 },   // fox
  picFish:    { kind: "emoji", value: "🐟", size: 64 },   // fish
  picHouse:   { kind: "emoji", value: "🏠", size: 64 },   // house
  picMoon:    { kind: "emoji", value: "🌙", size: 64 },   // moon
  picSun:     { kind: "emoji", value: "☀️", size: 64 },   // sun
  picRose:    { kind: "emoji", value: "🌹", size: 64 },   // rose
  picPear:    { kind: "emoji", value: "🍐", size: 64 },   // pear
  picGrapes:  { kind: "emoji", value: "🍇", size: 64 },   // grapes
  picBook:    { kind: "emoji", value: "📕", size: 64 },   // book
  picCup:     { kind: "emoji", value: "☕", size: 64 },   // cup (of coffee/tea)
  picGlass:   { kind: "emoji", value: "🥤", size: 64 },   // glass / cup with straw
  picBed:     { kind: "emoji", value: "🛏️", size: 64 },   // bed
  picSoup:    { kind: "emoji", value: "🍲", size: 64 },   // soup
  picMap:     { kind: "emoji", value: "🗺️", size: 64 },   // map
  picPine:    { kind: "emoji", value: "🍍", size: 64 },   // pineapple
  picCar:     { kind: "emoji", value: "🚗", size: 64 },   // car
  picShip:    { kind: "emoji", value: "🚢", size: 64 },   // ship
  picBall:    { kind: "emoji", value: "⚽", size: 64 },   // ball
  picCake:    { kind: "emoji", value: "🎂", size: 64 }    // cake
};
```
All emoji are Unicode 11 or older; no fallbacks needed.

## Animation registry
```js
const ANIM = {
  lift:      { y: "-=8", scale: 1.06, duration: 120, ease: "Sine.Out", trigger: "tile selected" },
  glide:     { duration: 260, ease: "Sine.InOut", trigger: "each tile of a correct pair to its half of the word slot (x,y at call)" },
  snap:      { x: "+=3", duration: 120, ease: "Back.Out", trigger: "left tile moves right 3 px and right tile moves left 3 px (−=3) so the two touch, then both labels are replaced by wordText" },
  glow:      { alpha: 1, duration: 220, ease: "Sine.Out", yoyo: true, trigger: "wordGlow behind the completed word (from alpha 0)" },
  pop:       { scale: 1.12, duration: 140, ease: "Back.Out", yoyo: true, trigger: "picture card of the completed word" },
  nudge:     { x: "+=10", duration: 80, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "both tiles of a wrong pair" },
  fadeOut:   { alpha: 0, duration: 250, ease: "Sine.In", trigger: "bubble after 800 ms" },
  nod:       { angle: 8, duration: 110, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "koala on each correct pair" },
  showMe:    { alpha: 1, duration: 500, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "hintRing on the true partner (from alpha 0.2)" },
  boardOut:  { y: "-=30", alpha: 0, duration: 300, ease: "Sine.In", trigger: "all tiles and cards when a board completes" },
  appear:    { alpha: 1, scale: 1, duration: 200, ease: "Back.Out", trigger: "new board (from alpha 0, scale 0.6); bubble on a wrong pair" },
  celebrate: { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "finish koala" }
};
```

## Screen layout
```
y   0 ┌──────────────────────────────────────────────────────────────┐
      │ [lang]              ○ ○ ○   rail y=28 (one dot per board)      │  zone T
 56   ├──────────────────────────────────────────────────────────────┤
      │  koala        bubble "tibit" (360,62) on a wrong pair          │
      │ (70,160)   ┌───────┐   ┌───────┐   ┌───────┐  cards y=130     │  zone A
      │            │rabbit │   │ tiger │   │ robot │  x=200/360/520   │
      │            └───────┘   └───────┘   └───────┘  (130×110)       │
      │            [ - - - ]   [ - - - ]   [ - - - ]  slots y=208     │
260   ├──────────────────────────────────────────────────────────────┤
      │                 "Make the words" (360,262)                    │
      │        [ rab ]      [  ti  ]      [ bot ]   row y=320          │  zone B
      │        [ bit ]      [  ro  ]      [ ger ]   row y=420          │
      │        x=228        x=360         x=492    (120×84)           │
480   ├──────────────────────────────────────────────────────────────┤
      │                                                              │  zone C
560   └──────────────────────────────────────────────────────────────┘
```
Four-word boards: cards 120 wide at x = 150 / 290 / 430 / 570 (slots 120 × 44 beneath), tiles in a 4 × 2 grid at x = 162 / 294 / 426 / 558 (pitch 132, gap 12). Fixed layout, FIT scaling.

## Visual specification
- Background `THEME.colour.bg`; rail per §6 with one `ART.dotEmpty` per board (3 or 4) centred at y = 28 → `ART.dotFull`; `t("question_x_of_y")` at (360, 48) (n = board, total = boards).
- Picture cards `ART.picCard` at y = 130 with the word's picture centred; `ART.wordSlot` at y = 208 (dashed while empty; solid `structure` stroke once filled) with `ART.wordText` centred on it and `ART.wordGlow` behind.
- Tiles: `makeTile` 120 × 84 with `ART.sylTile` tokens; label 34 px `THEME.font.display` `THEME.colour.ink` (a 4-letter syllable such as "pump" or "guin" is 4 × 20 = 80 px, inside 120 with the 1.6× budget). Selected = library selected look + `ANIM.lift`; locked (in a slot) = alpha 0.8, not interactive.
- `ART.bubble` at (360, 62) with `ART.madeWord` centred; `ART.hintRing` behind a tile; `ART.koala` at (70, 160).
- Tap floors: tiles 120 × 84, cards are not interactive. Gaps ≥ 12.
- Keyboard: arrows move across the tile grid (row-major), Enter selects; the picture cards are not focusable.

## Content
Syllable lists are language-bound. `LOCALE_DATA[lang]` = `{ boards: { L1: [...], L2: [...], L3: [...] } }`; each board is an array of words `{ pic: <ART key>, syl: ["rab", "bit"] }`. The pair test: two selected tiles form a word iff, in either order, `syl[0] + syl[1]` equals a board word not yet completed. Words are written as they are displayed: lowercase, no hyphen (the hyphen below only marks the split).

**en** (complete):
- L1 (3 words): [rab-bit `ART.picRabbit`, ti-ger `ART.picTiger`, ro-bot `ART.picRobot`] · [pan-da `ART.picPanda`, lem-on `ART.picLemon`, rock-et `ART.picRocket`] · [tur-tle `ART.picTurtle`, car-rot `ART.picCarrot`, pump-kin `ART.picPumpkin`] · [mon-key `ART.picMonkey`, ap-ple `ART.picApple`, ham-mer `ART.picHammer`]
- L2 (4 words): [pen-guin `ART.picPenguin`, spi-der `ART.picSpider`, cook-ie `ART.picCookie`, cac-tus `ART.picCactus`] · [drag-on `ART.picDragon`, piz-za `ART.picPizza`, rain-bow `ART.picRainbow`, bas-ket `ART.picBasket`] · [ze-bra `ART.picZebra`, snow-man `ART.picSnowman`, mag-net `ART.picMagnet`, can-dle `ART.picCandle`]
- L3 (4 words; a shared first syllable and shared first letters): [pen-guin, pen-cil `ART.picPencil`, pan-da, pump-kin] · [cup-cake `ART.picCupcake`, cook-ie, cac-tus, car-rot] · [ro-bot, rock-et, rab-bit, rain-bow]

**es** (native review before ship): L1 [ga-to `ART.picCat`, lu-na `ART.picMoon`, pe-ra `ART.picPear`] · [pa-to `ART.picDuck`, ca-sa `ART.picHouse`, u-va `ART.picGrapes`] · [o-so `ART.picBear`, ro-sa `ART.picRose`, ta-za `ART.picCup`] · [ra-na `ART.picFrog`, ma-pa `ART.picMap`, so-pa `ART.picSoup`]; L2 [pe-rro `ART.picDog`, va-ca `ART.picCow`, li-bro `ART.picBook`, ca-ma `ART.picBed`] · [mo-no `ART.picMonkey`, lo-bo `ART.picWolf`, pi-ña `ART.picPine`, co-che `ART.picCar`] · [ce-bra `ART.picZebra`, ga-to, lu-na, ta-za]; L3 [ca-sa, ca-ma, co-che, ce-bra] · [pe-rro, pe-ra, pa-to, pi-ña] · [lu-na, lo-bo, li-bro, le-ón `ART.picLion`].

**it** (native review before ship; double consonants split, "sce" stays whole): L1 [ca-ne `ART.picDog`, lu-na `ART.picMoon`, me-la `ART.picApple`] · [ra-na `ART.picFrog`, so-le `ART.picSun`, pe-ra `ART.picPear`] · [to-po `ART.picMouse`, ca-sa `ART.picHouse`, u-va `ART.picGrapes`] · [na-ve `ART.picShip`, ro-sa `ART.picRose`, li-bro `ART.picBook`]; L2 [gat-to `ART.picCat`, pal-la `ART.picBall`, or-so `ART.picBear`, tor-ta `ART.picCake`] · [pe-sce `ART.picFish`, muc-ca `ART.picCow`, vol-pe `ART.picFox`, taz-za `ART.picCup`] · [ca-ne, lu-na, na-ve, me-la]; L3 [ca-ne, ca-sa, gat-to, tor-ta] · [pe-ra, pe-sce, pal-la, or-so] · [lu-na, li-bro, muc-ca, me-la].

**pt** (Brazilian; native review before ship): L1 [ga-to `ART.picCat`, lu-a `ART.picMoon`, pe-ra `ART.picPear`] · [pa-to `ART.picDuck`, ca-sa `ART.picHouse`, u-va `ART.picGrapes`] · [sa-po `ART.picFrog`, bo-la `ART.picBall`, so-pa `ART.picSoup`] · [ra-to `ART.picMouse`, ro-sa `ART.picRose`, co-po `ART.picGlass`]; L2 [va-ca `ART.picCow`, ur-so `ART.picBear`, bo-lo `ART.picCake`, ca-ma `ART.picBed`] · [lo-bo `ART.picWolf`, por-co `ART.picPig`, li-vro `ART.picBook`, ma-çã `ART.picApple`] · [pei-xe `ART.picFish`, ga-to, lu-a, pe-ra]; L3 [bo-la, bo-lo, ca-sa, ca-ma] · [pa-to, pe-ra, por-co, pei-xe] · [sa-po, so-pa, ro-sa, ra-to].

**de, fr, nl, sv, da, no, fi: a native syllable list is required — en pilot** (`LOCALE_DATA[lang] = "en"` until then). Note for the author of each list: two-syllable words only, both syllables ≥ 2 letters, no two words on one board whose cross-combinations form another real word of that language.

Board order: one board per level in the play list; tile positions shuffled per board; the two tiles of one word are never side by side in the same row on a fresh board.

## Rules
- Item count: one item = one board; 3 boards minimum, 4 when the child reaches L3 by the end of board 2 (cap 4 boards ≈ 6 minutes).
- Difficulty progression: a board completed with at most one wrong pair → next board one level up (cap L3).
- Adaptation: a board with three or more wrong pairs → next board one level down (floor L1); exactly two wrong pairs → same level.
- What happens on a correct answer: `ANIM.glide` + `ANIM.snap` into the slot, `ART.wordText` with `ANIM.glow`, `tone("correct")`, card `ANIM.pop`, koala `ANIM.nod`; on board completion a praise pop (rotation ["well_done", "great_job", "excellent", "you_did_it", "keep_going"]) and the rail dot.
- What happens on a wrong answer:
  - First-syllable-only match (right first tile, wrong second): the made non-word shows in the bubble for 800 ms, then both nudge and de-select.
  - Meaning or first-letter guess (two syllables from different words): the same bubble and nudge.
  - Reversed order of a real pair: never wrong — accepted and re-ordered in the slot.
  - The same tile in two wrong pairs: its true partner gains `ART.hintRing` (this pattern's show-me) until the pair is made.
- Retry behaviour: unlimited within a board; support escalates per tile (two misses → partner shown). A board always completes.
- Finish condition: the session's boards complete. No losing state, no clock.

## Strings
- `GameCore.t()` keys: `t("start")`, `t("question_x_of_y")`, `t("all_done")`, `t("play_again")`, `t("menu")`, `t("well_done")`, `t("great_job")`, `t("excellent")`, `t("you_did_it")`, `t("keep_going")`.
- Game-specific: `title` = "Syllable Snap"; `makeWords` = "Make the words". Syllables and words are content from `LOCALE_DATA`.

## Sound
`tone("tap")` on select/de-select; `tone("correct")` on a snap; `tone("nudge")` on a non-pair; `tone("finish")` once. Silent under `?sound=off`. Syllables are never spoken.

## Testing checklist
- [ ] Works in all 11 languages (chrome strings change; `?lang=es` shows ga-to / lu-na boards with the cat and moon pictures; `?lang=de` plays the English boards until a German list exists).
- [ ] Works at narrow width (400-px iframe: four picture cards, four slots and an 8-tile grid fully visible, tiles separate).
- [ ] Keyboard operable (arrows move across the grid, Enter selects; a second Enter on another tile attempts the pair).
- [ ] Never auto-starts.
- [ ] No losing state (any number of wrong pairs still ends with every word in its slot; hint rings appear after two misses on a tile).
- [ ] Tapping "bit" then "rab" still builds "rabbit", written in that order under the rabbit picture.
- [ ] A correct pair slides into the slot under its picture, the two halves close up and the whole word appears with a glow.
- [ ] Tapping "ti" then "bit" shows "tibit" in a bubble for under a second, then the tiles nudge apart; no picture appears beside it.
- [ ] At the third level a board holds "pen" twice (penguin and pencil) and both words complete.
- [ ] A board with 0-1 mistakes is followed by a four-word board; a board with 3+ mistakes by a three-word board.
- [ ] The finish screen lists every built word as a chip with a thin bar at its syllable split, and no score.
- [ ] With `?sound=off` nothing is audible.
