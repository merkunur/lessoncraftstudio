# 069 — Sound Slide

## Identity
- Slug: `sound-slide`
- Subject / topic: Literacy / blending — sliding three (or four) sound tiles together into a word and picking the picture the word names
- Age band: `6-8`
- Interaction pattern: `P2` — tap to place (tap a sound tile, then tap the next free join slot; the tiles slide together in order), then a P1 picture choice
- Estimated build size: ~500 lines

Shared contract: `catalogue/BUILD-CONVENTIONS.md`. Pattern contract: `catalogue/PATTERNS.md` P2 (source tiles + destination slots; an invalid placement springs back with no message; correctness judged when the arrangement is complete). Locale note: **nothing is spoken**; the child blends the letters in their head and proves it by choosing the PICTURE (A-15). Letter-tile blending is the Germanic/Nordic/English shape of this skill; the Romance systems and Finnish blend SYLLABLE tiles (F-24 "syllable tiles for Romance, letter tiles for Germanic/Nordic") and digraph inventories differ (F-124) — every tile set and word lives in `LOCALE_DATA`; the mechanic accepts 2-4 tiles of any length, so a locale may hand it "ca" + "sa" instead of "c" + "a" + "t".

## Learning
- Objective: Slides the sound tiles of a word together in left-to-right order and then taps, from three pictures whose names start with the same letter, the one the blended word names.
- Prerequisites: Knows most letter-sound correspondences (games 061/067/068); knows the names of the pictured objects. The word tiles ARE the decoding task; no picture is placed beside them until the child has built the word, and the picture choices share their first letter so first-letter guessing cannot work (F-125).
- Curriculum links: F-22 (blending letter-sounds or syllables into words at 6-7 in all twelve systems), F-24 (reading-method families: synthetic phonics en/us, Silbenmethode de, klankzuiver nl, KÄTS fi, fono-sillabico it/es/pt), F-31 row "Blending to words (CVC / syllables)" — conservative 7, earliest 4 → 6-8 (US RF.K.2.c / RF.1.2.b "orally produce single-syllable words by blending sounds"; England Y1 "blend sounds in unfamiliar words"; Germany Klasse 1 "Laute zu Wörtern verbinden"; France CP "fusion syllabique"; Spain 1º lectura de sílabas; Brazil EF01LP08; Netherlands groep 3 "hakken en plakken"; Sweden åk 1 "ljuda ihop"; Denmark 1. klasse; Norway 1. trinn; Finland vuosiluokka 1 tavut).
- Common misconceptions (F-124, F-125, F-123), each with this game's response:
  1. **Says each sound but cannot synthesise them ("c … a … t" then "cup?") — F-124.** Response: the tiles physically slide together (`ANIM.glide`) and each join plays a HIGHER note (`tone("tap", k)`) so the sounds become one object with one rising sound; on a wrong picture the built word "re-blends": its tiles pop in order 350 ms apart with the same rising notes and then the whole word `ANIM.seal`s — continuous blending shown as motion.
  2. **Guessing from the first letter (three-cueing) — F-125.** Response: all three pictures share the word's first letter (cat / cap / car); at L3 they share the first TWO letters (cat / cap / can) so only the last sound decides; a wrong picture shows its own word under it in small boxes (`ART.miniWord`) with the differing box coloured `accent` — "you read c-a-t; this one is c-a-p".
  3. **Splitting a digraph into two sounds (s-h-i-p as four) — F-124.** Response: a digraph is ONE tile (`sh`, `ch`, `ck`, `ll`, `ee`, `oo`) — it cannot be split because it is a single physical object; at L2 the tile is drawn slightly wider (`ART.tileWide`) so the pair reads as one unit.
  4. **Dropping the nasal / liquid inside a cluster (t-e-n-t read as "tet") — F-124.** Response: at L3 four-tile words carry the nasal/liquid as its own tile that must be placed like any other; the build cannot complete without it, and the re-blend pops it in turn.
  5. **Short-vowel confusion (pen read as pin, cat as cot) — F-123.** Response: at L2-L3 one distractor picture differs from the word only in the vowel where the picture pool allows (pen / pin; bag / bug); the miniWord shows the vowel box in `accent`.

## How it plays
1. **Start screen**: title "Sound Slide", the penguin (`ART.penguin`) at (360, 200), Start, picker.
2. **Item 1 (L1: c-a-t; pictures cat, cap, car)**: rail of 10 dots (§6) with `t("question_x_of_y")` at (600, 28). Zone A: the ice — a pale strip (`ART.ice`, 640 × 60) at y = 150 — with the three sound tiles (`ART.tile`, 88 × 88) resting apart on it at x = 160 / 360 / 560, y = 150, each showing its letter (48 px); the penguin at (80, 150) at the left end. Below the ice, the join row: three dashed slots (`ART.slot`, 88 × 88) side by side, centred at (360, 250): x = 268 / 360 / 452 — slot 1 carries `ART.nextMark` (a small coral arrow) because it is the next slot to fill. Caption `S("slideTogether")` ("Slide the sounds together") at (360, 88), 24 px `inkSoft`. Zone B: three picture tiles (`ART.picTile`, 100 × 100) at y = 400, x = 240 / 360 / 480, labels `ART.picCat`, `ART.picCap`, `ART.picCar`, shuffled, DISABLED (alpha 0.5) until the word is built.
3. **Building**: tap a sound tile (it lifts: `ANIM.lift`, `tone("tap")`); tap a slot. Only the NEXT free slot accepts, and only the tile that belongs there — a tile placed in the wrong slot, or the wrong tile in the next slot, springs back (`ANIM.glide` to its ice spot, `ANIM.nudge`, no message; F-61). A valid placement glides the tile into the slot with `tone("tap", k)` (k = the slot number) — the pitch climbs as the word assembles; the `ART.nextMark` moves to the next slot. Tapping a placed tile returns it to the ice (undo, only the last placed). When the last slot fills, the joined tiles `ANIM.seal` (a brief glow), `tone("tap", 7)` plays, and the picture tiles enable.
4. **Choosing the picture**: the child taps a picture.
   - **Correct (cat)**: `ANIM.pop`, `tone("correct")`, praise pop (rotation); the picture glides up (`ANIM.glide`) to sit at the right end of the built word (x = 540, y = 250) — the word and its meaning together; the penguin `ANIM.slideOff` (x +60 and back); rail dot fills; next item after 800 ms.
   - **Wrong (cap)**: `ANIM.nudge`, `tone("nudge")`; the built word re-blends (tiles pop in order with rising notes, then `ANIM.seal`); the tapped picture shows `ART.miniWord` boxes under it ("c a p", 20 px) with the differing box in `accent`, 1400 ms, then fades. Attempt 2.
   - **Second wrong**: the re-blend again; the correct picture gains `ART.showRing` with `ANIM.showMe`; tapping it completes the item as solved-with-help.
5. **Items 2-10**: per Content/Rules. L1 three single-letter tiles; L2 three tiles with one digraph tile; L3 four tiles (a cluster with a nasal/liquid, or a digraph plus a cluster) with distractors sharing the first two letters.
6. **Finish**: `t("all_done")` (360, 110); the penguin (360, 200) `ANIM.celebrate`; the summary = the ten built words as `ART.wordChip` (120 × 40) in two rows of five from y = 340 (x = 160 / 260 / 360 / 460 / 560), each showing the word (24 px) and its picture small (`ART.miniPic`, 24 px) at the right end — the words read this session; optional `t("question_x_of_y")` first-try count at (360, 470); `play_again` (250, 510), `menu` (470, 510); `tone("finish")`.

Session ≈ 6 minutes.

## Art registry
```js
const ART = {
  penguin:  { kind: "emoji", value: "🐧", size: 80 },
  ice:      { kind: "shape", shape: "roundRect", w: 640, h: 60, fill: "surface2", stroke: "line", strokeWidth: 2, radius: 30 },
  tile:     { kind: "shape", shape: "roundRect", w: 88, h: 88, fill: "surface", stroke: "structure", strokeWidth: 3, radius: 12 },   // letter 48 px display ink
  tileWide: { kind: "shape", shape: "roundRect", w: 110, h: 88, fill: "surface", stroke: "structure", strokeWidth: 3, radius: 12 },  // digraph tile, letters 44 px
  slot:     { kind: "shape", shape: "roundRect", w: 88, h: 88, fill: "surface2", stroke: "line", strokeWidth: 2, radius: 12 },       // dashed via lineDash [8,6]
  nextMark: { kind: "shape", shape: "polygon", points: [[-8,-12],[8,0],[-8,12]], fill: "accent" },   // above the next slot
  picTile:  { kind: "shape", shape: "roundRect", w: 100, h: 100, fill: "surface", stroke: "line", strokeWidth: 2, radius: 14 },
  miniWord: { kind: "shape", shape: "roundRect", w: 28, h: 28, fill: "surface", stroke: "line", strokeWidth: 1, radius: 4 },        // one box per sound, letter 20 px; the differing box fill accent
  showRing: { kind: "shape", shape: "roundRect", w: 112, h: 112, stroke: "structure", strokeWidth: 4, radius: 18 },
  wordChip: { kind: "shape", shape: "roundRect", w: 120, h: 40, fill: "structureSoft", stroke: "structure", strokeWidth: 2, radius: 8 },
  miniPic:  { kind: "text",  value: "", size: 24, font: "body", color: "ink" },     // value = a picture emoji read through ART at runtime
  dotEmpty: { kind: "shape", shape: "circle", r: 8, stroke: "line", strokeWidth: 2 },
  dotFull:  { kind: "shape", shape: "circle", r: 8, fill: "structure" },
  // picture pool (English name in the comment)
  picCat:    { kind: "emoji", value: "🐱", size: 60 },   // cat
  picCap:    { kind: "emoji", value: "🧢", size: 60 },   // cap
  picCar:    { kind: "emoji", value: "🚗", size: 60 },   // car
  picCan:    { kind: "emoji", value: "🥫", size: 60 },   // can
  picDog:    { kind: "emoji", value: "🐶", size: 60 },   // dog
  picDuck:   { kind: "emoji", value: "🦆", size: 60 },   // duck
  picDrum:   { kind: "emoji", value: "🥁", size: 60 },   // drum
  picDonut:  { kind: "emoji", value: "🍩", size: 60 },   // donut
  picPig:    { kind: "emoji", value: "🐷", size: 60 },   // pig
  picPen:    { kind: "emoji", value: "🖊️", size: 60 },   // pen
  picPin:    { kind: "emoji", value: "📌", size: 60 },   // pin
  picPan:    { kind: "emoji", value: "🍳", size: 60 },   // pan
  picPear:   { kind: "emoji", value: "🍐", size: 60 },   // pear
  picHat:    { kind: "emoji", value: "🎩", size: 60 },   // hat
  picHen:    { kind: "emoji", value: "🐔", size: 60 },   // hen
  picHouse:  { kind: "emoji", value: "🏠", size: 60 },   // house
  picHand:   { kind: "emoji", value: "✋", size: 60 },   // hand
  picBus:    { kind: "emoji", value: "🚌", size: 60 },   // bus
  picBee:    { kind: "emoji", value: "🐝", size: 60 },   // bee
  picBed:    { kind: "emoji", value: "🛏️", size: 60 },   // bed
  picBag:    { kind: "emoji", value: "👜", size: 60 },   // bag
  picBug:    { kind: "emoji", value: "🐛", size: 60 },   // bug
  picBell:   { kind: "emoji", value: "🔔", size: 60 },   // bell
  picSun:    { kind: "emoji", value: "☀️", size: 60 },   // sun
  picSock:   { kind: "emoji", value: "🧦", size: 60 },   // sock
  picStar:   { kind: "emoji", value: "⭐", size: 60 },   // star
  picSheep:  { kind: "emoji", value: "🐑", size: 60 },   // sheep
  picShip:   { kind: "emoji", value: "🚢", size: 60 },   // ship
  picShell:  { kind: "emoji", value: "🐚", size: 60 },   // shell
  picFish:   { kind: "emoji", value: "🐟", size: 60 },   // fish
  picFox:    { kind: "emoji", value: "🦊", size: 60 },   // fox
  picFrog:   { kind: "emoji", value: "🐸", size: 60 },   // frog
  picFlag:   { kind: "emoji", value: "🏁", size: 60 },   // flag
  picChick:  { kind: "emoji", value: "🐣", size: 60 },   // chick
  picCheese: { kind: "emoji", value: "🧀", size: 60 },   // cheese
  picChair:  { kind: "emoji", value: "🪑", size: 60 },   // chair (Unicode 12)
  picMoon:   { kind: "emoji", value: "🌙", size: 60 },   // moon
  picMouse:  { kind: "emoji", value: "🐭", size: 60 },   // mouse
  picMilk:   { kind: "emoji", value: "🥛", size: 60 },   // milk
  picMap:    { kind: "emoji", value: "🗺️", size: 60 },   // map
  picNut:    { kind: "emoji", value: "🥜", size: 60 },   // nut
  picNose:   { kind: "emoji", value: "👃", size: 60 },   // nose
  picNet:    { kind: "emoji", value: "🥅", size: 60 },   // net
  picTent:   { kind: "emoji", value: "⛺", size: 60 },   // tent
  picTree:   { kind: "emoji", value: "🌳", size: 60 },   // tree
  picTiger:  { kind: "emoji", value: "🐯", size: 60 },   // tiger
  picLamp:   { kind: "emoji", value: "🪔", size: 60 },   // lamp (Unicode 12)
  picLion:   { kind: "emoji", value: "🦁", size: 60 },   // lion
  picLeaf:   { kind: "emoji", value: "🍃", size: 60 },   // leaf
  picCrab:   { kind: "emoji", value: "🦀", size: 60 },   // crab
  picCrown:  { kind: "emoji", value: "👑", size: 60 },   // crown
  picClock:  { kind: "emoji", value: "⏰", size: 60 }    // clock
};
```
No emoji newer than Unicode 12; no `fallback` needed.

## Animation registry
```js
const ANIM = {
  lift:      { y: "-=8", scale: 1.06, duration: 120, ease: "Sine.Out", trigger: "sound tile selected" },
  glide:     { duration: 260, ease: "Sine.InOut", trigger: "tile to its slot / back to the ice; picture up to the word (x,y at call)" },
  nudge:     { x: "+=10", duration: 80, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "refused placement; wrong picture" },
  pop:       { scale: 1.12, duration: 140, ease: "Back.Out", yoyo: true, trigger: "each tile in the re-blend (350 ms apart); correct picture" },
  seal:      { alpha: 0.8, duration: 160, ease: "Sine.InOut", yoyo: true, trigger: "all placed tiles when the word completes / after a re-blend" },
  fadeOut:   { alpha: 0, duration: 300, ease: "Sine.In", trigger: "miniWord boxes after 1400 ms" },
  slideOff:  { x: "+=60", duration: 300, ease: "Sine.InOut", yoyo: true, trigger: "penguin on a correct picture" },
  appear:    { alpha: 1, scale: 1, duration: 200, ease: "Back.Out", trigger: "new tiles, slots and pictures (from alpha 0, scale 0.6)" },
  showMe:    { alpha: 1, duration: 500, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "ring on the correct picture (from alpha 0.2)" },
  celebrate: { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "finish penguin" }
};
```

## Screen layout
```
y   0 ┌──────────────────────────────────────────────────────────────┐
      │ [lang]          ○ ○ ○ ○ ○ ○ ○ ○ ○ ○  rail y=28   Question 1 of 10│  zone T
 56   ├──────────────────────────────────────────────────────────────┤
      │              "Slide the sounds together" (360,88)             │
      │ penguin ════[ c ]══════════[ a ]══════════[ t ]════ ice y=150 │  zone A
      │ (80,150)    x=160          x=360          x=560   (88×88)     │
      │                  ▸[ 1 ] [ 2 ] [ 3 ]   join slots y=250        │
260   ├──────────────────────────────────────────────────────────────┤
      │        [ cat ]      [ cap ]      [ car ]   pictures y=400     │
      │        x=240        x=360        x=480     (100×100, dimmed)  │  zone B
480   ├──────────────────────────────────────────────────────────────┤
      │                                                              │  zone C
560   └──────────────────────────────────────────────────────────────┘
```
Four-tile items: ice positions x = 120 / 280 / 440 / 600; slots x = 222 / 314 / 406 / 498. Digraph tiles use `ART.tileWide` (110 wide) and the slot for that position is 110 wide too. Fixed layout, FIT scaling.

## Visual specification
- Background `THEME.colour.bg`; rail per §6: 10 × `ART.dotEmpty` (x = 261 + i × 22, y = 28) → `ART.dotFull`; `t("question_x_of_y")` at (600, 28), 18 px `THEME.font.body` `THEME.colour.inkSoft`.
- Caption `S("slideTogether")` at (360, 88), 24 px `THEME.font.body` `THEME.colour.inkSoft`, `wordWrap` 600.
- `ART.penguin` (80, 150); `ART.ice` centred (390, 150).
- Sound tiles: `makeTile` 88 × 88 (`ART.tile`; `ART.tileWide` 110 × 88 for a digraph) with the letters 48 px (44 for a digraph) `THEME.font.display` `THEME.colour.ink`, lowercase; slots: `makeTile` 88 × 88 (`ART.slot`, dashed) at the join row; `ART.nextMark` 12 px above the next slot.
- Picture tiles: `makeTile` 100 × 100 (`ART.picTile`), label = the picture emoji via `ART[picKey].value`; disabled alpha 0.5 until the word is built.
- `ART.miniWord` boxes centred under a tapped picture at y = 462, pitch 32, letters 20 px; the differing box fill `THEME.colour.accent` with the letter in `THEME.colour.inkOnAccent`.
- `ART.showRing` behind the correct picture. Tap floors 88 / 100 ≥ 56; gaps ≥ 12 (slots are adjacent by design: 92 pitch → 4 px gap between 88-px slots is acceptable because slots accept only in order, so a mis-tap on the neighbour is refused, never wrong).
- Tab order: sound tiles left to right, then the slots, then the pictures.

## Content
Language-bound. `LOCALE_DATA[GameCore.lang].items` supplies, per item, the tiles in order, the correct picture and two distractors. The English (`en`) list is authored in full below. **Other locales: a native word list is required — en pilot.** Native authors decide the tile grain (letters for de/nl/sv/da/no; syllables for es/it/pt/fr per F-24 — e.g. es "ca" + "sa", it "so" + "le"; fi either, "ki" + "ssa" or k-i-s-s-a) and the digraph inventory (de "sch", "ch"; nl "oe", "ij"; F-124), and pick distractor pictures that share the first tile in that language.

Each item = (tiles; correct; distractor A, distractor B). Distractors share the first letter (L1-L2) or the first two letters (L3) with the word.
- **L1 — three single-letter tiles**: (c-a-t; `ART.picCat`; `ART.picCap`, `ART.picCar`) · (d-o-g; `ART.picDog`; `ART.picDuck`, `ART.picDrum`) · (p-i-g; `ART.picPig`; `ART.picPen`, `ART.picPear`) · (h-a-t; `ART.picHat`; `ART.picHen`, `ART.picHouse`) · (b-u-s; `ART.picBus`; `ART.picBee`, `ART.picBed`) · (s-u-n; `ART.picSun`; `ART.picSock`, `ART.picStar`) · (p-e-n; `ART.picPen`; `ART.picPig`, `ART.picPear`) · (n-u-t; `ART.picNut`; `ART.picNose`, `ART.picNet`) · (m-a-p; `ART.picMap`; `ART.picMoon`, `ART.picMouse`) · (b-e-d; `ART.picBed`; `ART.picBus`, `ART.picBee`)
- **L2 — one digraph tile** (misconception 3) **and, where possible, a vowel-neighbour distractor** (misconception 5): (f-i-sh; `ART.picFish`; `ART.picFox`, `ART.picFrog`) · (sh-i-p; `ART.picShip`; `ART.picSheep`, `ART.picShell`) · (s-o-ck; `ART.picSock`; `ART.picSun`, `ART.picStar`) · (d-u-ck; `ART.picDuck`; `ART.picDog`, `ART.picDonut`) · (b-e-ll; `ART.picBell`; `ART.picBee`, `ART.picBug`) · (ch-i-ck; `ART.picChick`; `ART.picCheese`, `ART.picChair`) · (m-oo-n; `ART.picMoon`; `ART.picMouse`, `ART.picMilk`) · (sh-ee-p; `ART.picSheep`; `ART.picShip`, `ART.picShell`) · (p-e-n; `ART.picPen`; `ART.picPin` (vowel), `ART.picPan` (vowel)) · (b-u-g; `ART.picBug`; `ART.picBag` (vowel), `ART.picBed`)
- **L3 — four tiles with a nasal / liquid or a cluster; distractors share the first TWO letters where the pool allows** (misconceptions 2, 4): (c-a-t; `ART.picCat`; `ART.picCap`, `ART.picCan`) · (t-e-n-t; `ART.picTent`; `ART.picTree`, `ART.picTiger`) · (h-a-n-d; `ART.picHand`; `ART.picHat`, `ART.picHen`) · (l-a-m-p; `ART.picLamp`; `ART.picLion`, `ART.picLeaf`) · (m-i-l-k; `ART.picMilk`; `ART.picMoon`, `ART.picMap`) · (f-r-o-g; `ART.picFrog`; `ART.picFlag`, `ART.picFish`) · (c-r-a-b; `ART.picCrab`; `ART.picCrown`, `ART.picCar`) · (d-r-u-m; `ART.picDrum`; `ART.picDuck`, `ART.picDonut`) · (f-l-a-g; `ART.picFlag`; `ART.picFrog`, `ART.picFox`) · (c-l-o-ck; `ART.picClock`; `ART.picCrab`, `ART.picCap`) · (p-i-n; `ART.picPin`; `ART.picPig`, `ART.picPen` (vowel))

Play list: 10 items; start at L1; levels per Rules; no word repeats within a session (a picture may recur as a distractor); the ice order of the tiles is shuffled per item (the tiles never start in reading order — the child must find the first sound); the correct picture's slot never repeats twice running.

## Rules
- Item count: 10.
- Difficulty progression: 2 consecutive first-try items (no refused placement counted — placements are never errors — AND the first picture tapped is correct) → next level (cap L3).
- Adaptation: a wrong picture, or wrong first-try on 2 consecutive items → next item one level down (floor L1).
- What happens on a correct answer: `ANIM.pop`, `tone("correct")`, praise rotation ["well_done", "great_job", "excellent", "you_did_it", "keep_going"], the picture glides to the end of the word, penguin `ANIM.slideOff`, rail dot fills, next item after 800 ms.
- What happens on a wrong answer (per anticipated mistake):
  - Wrong picture sharing the first letter (first-letter guess): `ANIM.nudge`, `tone("nudge")`; the built word re-blends (tiles pop in order with rising notes, `ANIM.seal`); `ART.miniWord` under the tapped picture with the differing box in `accent`; 1400 ms.
  - Wrong picture differing only in the vowel (pin for pen): the same; the vowel box is the accented one.
  - Wrong picture at L3 that lacks the nasal/liquid word's extra sound (hat for hand): the same; the miniWord "h a t" is one box shorter and the re-blend pops the n tile.
  - A tile placed in the wrong slot or out of order: springs back with `ANIM.nudge`, no message, not an attempt (F-61).
  - A picture tapped before the word is built: cannot happen (pictures disabled).
- Retry behaviour: attempt 1 → attempt 2 after the re-blend → attempt 3 with the show-me ring; solved-with-help. No attempt 4.
- Finish condition: 10 items. No losing state, no clock.

## Strings
- `GameCore.t()` keys: `t("start")`, `t("question_x_of_y")`, `t("all_done")`, `t("play_again")`, `t("menu")`, `t("well_done")`, `t("great_job")`, `t("excellent")`, `t("you_did_it")`, `t("keep_going")`.
- Game-specific: `title` = "Sound Slide"; `slideTogether` = "Slide the sounds together". Tile letters are locale content.

## Sound
`tone("tap")` on selecting a tile; `tone("tap", k)` when the k-th tile lands in slot k (the pitch climbs as the word assembles — the audible stand-in for a gliding blend, F-213); `tone("tap", 7)` when the word seals; the same rising run again during a re-blend; `tone("correct")` on the right picture; `tone("nudge")` on a wrong picture or a refused placement; `tone("finish")` once. Silent under `?sound=off`. Nothing is spoken.

## Testing checklist
- [ ] Works in all 11 languages (chrome, caption and counter change; `?lang=xx` reads `LOCALE_DATA.xx` and falls back to `en` without crashing while native lists are pending — reviewer notes "en pilot"; a syllable-tile list with two tiles must also build and seal).
- [ ] Works at narrow width (400-px iframe: ice with four tiles, four slots and three pictures visible and separate).
- [ ] Keyboard operable (Tab: tiles, slots, pictures; Enter selects / places / picks).
- [ ] Never auto-starts.
- [ ] No losing state (wrong pictures never end the session; the ring always completes the item).
- [ ] The three tiles start out of reading order on the ice; tapping "c" then slot 1 slides it in with a note; "a" into slot 2 is a higher note; "t" into slot 3 higher still, then the word glows and the pictures light up.
- [ ] Tapping "t" then slot 1 springs the tile back with a wiggle and no message.
- [ ] The pictures are dimmed and unresponsive until all slots are filled.
- [ ] Tapping the cap after building c-a-t makes the word pop tile by tile and shows "c a p" under the cap with the p box in coral.
- [ ] At the second level "sh" is one wide tile; it cannot be split.
- [ ] At the third level t-e-n-t has four tiles and cannot seal without the n.
- [ ] Two first-try items in a row bring digraph tiles, then four-tile words; a wrong picture brings three-letter words back.
- [ ] The finish screen shows the ten words read with their pictures and no score other than the optional first-try count.
- [ ] With `?sound=off` nothing is audible.
