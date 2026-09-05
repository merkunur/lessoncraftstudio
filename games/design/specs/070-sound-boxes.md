# 070 — Sound Boxes

## Identity
- Slug: `sound-boxes`
- Subject / topic: Literacy / segmenting — placing letter tiles into one sound box per sound for a pictured word (a digraph is one tile; every box must be filled)
- Age band: `6-8`
- Interaction pattern: `P2` — tap to place (tap a letter tile, then tap a box; judged on Check)
- Estimated build size: ~520 lines

Shared contract: `catalogue/BUILD-CONVENTIONS.md`. Pattern contract: `catalogue/PATTERNS.md` P2 (sources + slots; invalid placements are refused; correctness judged on a Check tile because the whole arrangement matters). Mirror of game 069 (blending): there the tiles are given and the picture is chosen; here the picture is given and the tiles are chosen. Locale note: **nothing is spoken**; the word is carried by a PICTURE whose name the child knows (A-15). Segmenting grain and digraph inventories are language-bound (F-124; F-24: the Romance systems and Finnish segment into syllable boxes, "ca" + "sa"; German has "sch"/"ch", Dutch "oe"/"ij", Finnish almost no digraphs) — every word, box count and tile bank lives in `LOCALE_DATA`; the mechanic accepts 2-5 boxes of any tile length.

## Learning
- Objective: Segments a pictured word into its sounds by placing one letter (or digraph) tile in each sound box, including the vowel box in the middle and the nasal or liquid box inside a cluster, and confirms with Check.
- Prerequisites: Blends sound tiles into words (game 069) or identifies initial and final sounds (games 061/068); knows the names of the pictured objects. The picture is the prompt — it is NOT beside a word to be decoded; the child produces the word (F-125 does not apply to encoding).
- Curriculum links: F-22 (spelling by segmenting sounds at 6-8 in 11 of 12 systems — Norway has no spelling aim by year 2, so `no` may ship this game later), F-24, F-31 row "Blending to words (CVC / syllables)" — conservative 7, earliest 4 → 6-8 (US RF.K.2.d / L.K.2.d "spell simple words phonetically"; England Y1 "segment spoken words into phonemes and represent these by graphemes"; Germany Klasse 1 "lautgetreu schreiben"; France CP "encoder des mots"; Spain 1º escritura de palabras; Brazil EF01LP07 "segmentar oralmente palavras em sílabas / fonemas"; Netherlands groep 3 "hakken"; Sweden åk 1 "ljudenlig stavning"; Denmark 1. klasse "lydret stavning"; Finland vuosiluokka 1 "tavutus ja äänteet"). Demand: F-7 (spelling-as-skill is universal; the English-only genres are not used).
- Common misconceptions (F-124, F-123, F-127), each with this game's response:
  1. **Vowel omitted in early spelling ("bt" for bat) — F-123.** Response: the word has one box per sound and Check is disabled until EVERY box holds a tile, so a two-tile "bt" cannot be checked. If the child fills the first and last boxes and leaves the middle empty for 4 s, the empty box `ANIM.pulse`s and the vowel tiles in the bank glow (`ART.vowelGlow`) — "something goes in the middle" (the mandatory middle box).
  2. **Wrong short vowel (pin for pen, cot for cat; e/i and a/o) — F-123.** Response: on Check the wrong vowel tile glides back to the bank with `ANIM.nudge`; where the pool has the minimal-pair picture (pen/pin, pan/pen, bag/bug, ball/bell, cup/cap, net/nut, ship/shop) it appears beside the boxes (`ART.pairPic`, 56 px) for 1400 ms with the child's tiles still shown — "p-i-n spells THIS"; the correct vowel gains a soft outline on the second wrong Check.
  3. **Splitting a digraph into two boxes (s + h for sh; c + k for ck) — F-124.** Response: the bank holds the digraph as ONE tile (`ART.tileWide`) AND its two letters as single tiles at L2, so the split is possible and can be caught: on Check the two single tiles glide back and a bracket (`ART.digraphBracket`) draws over them in the bank, then the digraph tile `ANIM.pulse`s — "these two are one sound".
  4. **Dropping the nasal / liquid in a cluster (tet for tent, lap for lamp) — F-124.** Response: at L3 the word has four boxes, so the extra box is already there; the child who thinks "t-e-t" has a box left over; the leftover box pulses on Check and the nasal/liquid tile in the bank glows (`ART.vowelGlow` reused for any hinted tile).
  5. **Reversing letters within the word (tac for cat) — F-127 / F-121.** Response: on Check each box is judged separately: correct tiles lock (`ART.boxDone`), wrong tiles return; a tile that is correct but in the wrong box returns too, and the boxes keep their left-to-right numbering (`ART.boxNumeral` 1-4) so order is visible.

## How it plays
1. **Start screen**: title "Sound Boxes", the elephant (`ART.elephant`) at (360, 200), Start, picker.
2. **Item 1 (L1: cat)**: rail of 10 dots (§6) with `t("question_x_of_y")` at (600, 28). Zone A left: the picture card (`ART.card`, 140 × 140) at (110, 160) with `ART.picCat` (88 px). Zone A right: three sound boxes (`ART.box`, 80 × 80, dashed) side by side centred at (420, 160): x = 328 / 420 / 512, each with a tiny `ART.boxNumeral` (1, 2, 3) at its top-left; the elephant at (640, 100) above the boxes. Caption `S("putSounds")` ("Put one sound in each box") at (360, 80), 24 px `inkSoft`. Zone B: the letter bank — six tiles (`ART.tile`, 80 × 80) at y = 380, x = 130 / 222 / 314 / 406 / 498 / 590, holding the word's three tiles plus three distractors (Content), shuffled, letters at 44 px. Zone C: `makeButton` `ok` at (360, 510), disabled until every box holds a tile.
3. **Placing**: tap a bank tile (it lifts: `ANIM.lift`, `tone("tap")`), tap a box: the tile glides in (`ANIM.glide`, `tone("tap", boxIndex)`), the box's dashed outline becomes solid (`ART.boxFilled`). Any empty box accepts any tile (the arrangement is judged on Check). A full box refuses (the tile springs back, `ANIM.nudge`, no message). Tapping a placed tile returns it to the bank. When all boxes are full, OK enables. Idle hint: 4 s with an empty box while other boxes are full → the empty box `ANIM.pulse`s and, if it is the middle box, the bank's vowel tiles glow.
4. **Check**:
   - **All boxes correct**: `tone("correct")`, praise pop (rotation); the boxes `ANIM.seal` left to right (each pops 150 ms apart with `tone("tap", k)`) and lock as `ART.boxDone`; the word appears as text under the picture card (`ART.wordDone`, "cat", 28 px); the elephant `ANIM.trumpet` (angle wobble); rail dot fills; next item after 800 ms.
   - **Some boxes wrong**: `tone("nudge")`; correct tiles lock (`ART.boxDone`); each wrong tile glides back to the bank with `ANIM.nudge`; then the misconception cue (vowel pair picture / digraph bracket / leftover-box pulse per Rules); OK disables until the boxes are full again. Attempt 2.
   - **Second wrong Check**: the cue again; the correct tile for each still-wrong box gains `ART.hintRing` in the bank (`ANIM.showMe`); placing them and checking completes the item as solved-with-help.
5. **Items 2-10**: per Content/Rules. L1 CVC words, three boxes; L2 words with a digraph (three boxes; the bank contains the digraph tile AND its split letters); L3 four-box words with a cluster or a digraph plus a cluster.
6. **Finish**: `t("all_done")` (360, 110); the elephant (360, 200) `ANIM.celebrate`; the summary = the ten spelt words as `ART.wordChip` (120 × 40) in two rows of five from y = 340 (x = 160 / 260 / 360 / 460 / 560), each with the word (24 px) and its picture small (`ART.miniPic`, 24 px) — the words written this session; optional `t("question_x_of_y")` first-try count at (360, 470); `play_again` (250, 510), `menu` (470, 510); `tone("finish")`.

Session ≈ 6-7 minutes.

## Art registry
```js
const ART = {
  elephant:       { kind: "emoji", value: "🐘", size: 80 },
  card:           { kind: "shape", shape: "roundRect", w: 140, h: 140, fill: "surface", stroke: "structure", strokeWidth: 3, radius: 18 },
  box:            { kind: "shape", shape: "roundRect", w: 80, h: 80, fill: "surface2", stroke: "line", strokeWidth: 2, radius: 10 },        // dashed via lineDash [8,6] while empty
  boxFilled:      { kind: "shape", shape: "roundRect", w: 80, h: 80, fill: "surface", stroke: "structure", strokeWidth: 2, radius: 10 },
  boxDone:        { kind: "shape", shape: "roundRect", w: 80, h: 80, fill: "structureSoft", stroke: "structure", strokeWidth: 3, radius: 10 },
  boxNumeral:     { kind: "text",  value: "", size: 16, font: "display", color: "inkSoft" },
  tile:           { kind: "shape", shape: "roundRect", w: 80, h: 80, fill: "surface", stroke: "line", strokeWidth: 2, radius: 10 },        // letter 44 px display ink
  tileWide:       { kind: "shape", shape: "roundRect", w: 100, h: 80, fill: "surface", stroke: "line", strokeWidth: 2, radius: 10 },       // digraph tile, letters 40 px
  vowelGlow:      { kind: "shape", shape: "roundRect", w: 92, h: 92, stroke: "accent", strokeWidth: 4, radius: 14 },                       // around a hinted bank tile, alpha animated
  hintRing:       { kind: "shape", shape: "roundRect", w: 92, h: 92, stroke: "structure", strokeWidth: 4, radius: 14 },
  digraphBracket: { kind: "shape", shape: "arc", r: 60, stroke: "accent", strokeWidth: 5 },        // a half-arc over two adjacent bank tiles, from 180° to 360°
  pairPic:        { kind: "text",  value: "", size: 56, font: "body", color: "ink" },              // value = the minimal-pair picture emoji read through ART at runtime
  wordDone:       { kind: "text",  value: "", size: 28, font: "display", color: "structure" },
  wordChip:       { kind: "shape", shape: "roundRect", w: 120, h: 40, fill: "structureSoft", stroke: "structure", strokeWidth: 2, radius: 8 },
  miniPic:        { kind: "text",  value: "", size: 24, font: "body", color: "ink" },
  dotEmpty:       { kind: "shape", shape: "circle", r: 8, stroke: "line", strokeWidth: 2 },
  dotFull:        { kind: "shape", shape: "circle", r: 8, fill: "structure" },
  // picture pool (English name in the comment)
  picCat:   { kind: "emoji", value: "🐱", size: 88 },   // cat
  picDog:   { kind: "emoji", value: "🐶", size: 88 },   // dog
  picSun:   { kind: "emoji", value: "☀️", size: 88 },   // sun
  picPig:   { kind: "emoji", value: "🐷", size: 88 },   // pig
  picHat:   { kind: "emoji", value: "🎩", size: 88 },   // hat
  picBus:   { kind: "emoji", value: "🚌", size: 88 },   // bus
  picBed:   { kind: "emoji", value: "🛏️", size: 88 },   // bed
  picPen:   { kind: "emoji", value: "🖊️", size: 88 },   // pen
  picPin:   { kind: "emoji", value: "📌", size: 88 },   // pin
  picPan:   { kind: "emoji", value: "🍳", size: 88 },   // pan
  picHen:   { kind: "emoji", value: "🐔", size: 88 },   // hen
  picBat:   { kind: "emoji", value: "🦇", size: 88 },   // bat
  picNut:   { kind: "emoji", value: "🥜", size: 88 },   // nut
  picNet:   { kind: "emoji", value: "🥅", size: 88 },   // net
  picWeb:   { kind: "emoji", value: "🕸️", size: 88 },   // web
  picVan:   { kind: "emoji", value: "🚐", size: 88 },   // van
  picCap:   { kind: "emoji", value: "🧢", size: 88 },   // cap
  picCup:   { kind: "emoji", value: "🥤", size: 88 },   // cup
  picBag:   { kind: "emoji", value: "👜", size: 88 },   // bag
  picBug:   { kind: "emoji", value: "🐛", size: 88 },   // bug
  picMap:   { kind: "emoji", value: "🗺️", size: 88 },   // map
  picFish:  { kind: "emoji", value: "🐟", size: 88 },   // fish
  picShip:  { kind: "emoji", value: "🚢", size: 88 },   // ship
  picShop:  { kind: "emoji", value: "🏪", size: 88 },   // shop
  picChick: { kind: "emoji", value: "🐣", size: 88 },   // chick
  picDuck:  { kind: "emoji", value: "🦆", size: 88 },   // duck
  picSock:  { kind: "emoji", value: "🧦", size: 88 },   // sock
  picBell:  { kind: "emoji", value: "🔔", size: 88 },   // bell
  picBall:  { kind: "emoji", value: "🏐", size: 88 },   // ball
  picShell: { kind: "emoji", value: "🐚", size: 88 },   // shell
  picMoon:  { kind: "emoji", value: "🌙", size: 88 },   // moon
  picSheep: { kind: "emoji", value: "🐑", size: 88 },   // sheep
  picFrog:  { kind: "emoji", value: "🐸", size: 88 },   // frog
  picCrab:  { kind: "emoji", value: "🦀", size: 88 },   // crab
  picTent:  { kind: "emoji", value: "⛺", size: 88 },   // tent
  picLamp:  { kind: "emoji", value: "🪔", size: 88 },   // lamp (Unicode 12)
  picMilk:  { kind: "emoji", value: "🥛", size: 88 },   // milk
  picHand:  { kind: "emoji", value: "✋", size: 88 },   // hand
  picFlag:  { kind: "emoji", value: "🏁", size: 88 },   // flag
  picDrum:  { kind: "emoji", value: "🥁", size: 88 },   // drum
  picAnt:   { kind: "emoji", value: "🐜", size: 88 },   // ant
  picClock: { kind: "emoji", value: "⏰", size: 88 }    // clock
};
```
No emoji newer than Unicode 12; no `fallback` needed. "cup" uses the cup-with-straw glyph (a plain cup, not coffee) and "ball" the volleyball glyph (a plain ball); both are named "cup" and "ball" by children.

## Animation registry
```js
const ANIM = {
  lift:      { y: "-=8", scale: 1.06, duration: 120, ease: "Sine.Out", trigger: "bank tile selected" },
  glide:     { duration: 260, ease: "Sine.InOut", trigger: "tile into a box / back to the bank (x,y at call)" },
  nudge:     { x: "+=10", duration: 80, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "refused placement; a wrong tile returning" },
  pulse:     { scale: 1.15, duration: 300, ease: "Sine.InOut", yoyo: true, repeat: 2, trigger: "an empty box after 4 s; the leftover box on Check; the digraph tile after the bracket" },
  glow:      { alpha: 1, duration: 500, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "vowelGlow around hinted bank tiles (from alpha 0)" },
  bracket:   { alpha: 1, duration: 300, ease: "Sine.Out", yoyo: true, hold: 900, trigger: "digraphBracket over the two split letters in the bank (from alpha 0)" },
  pairShow:  { alpha: 1, scale: 1, duration: 200, ease: "Back.Out", yoyo: true, hold: 1000, trigger: "pairPic beside the boxes (from alpha 0, scale 0.6)" },
  seal:      { scale: 1.12, duration: 150, ease: "Back.Out", yoyo: true, trigger: "each box in turn on a correct Check, 150 ms apart" },
  trumpet:   { angle: 10, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "elephant on a correct Check" },
  appear:    { alpha: 1, scale: 1, duration: 200, ease: "Back.Out", trigger: "new picture, boxes and bank (from alpha 0, scale 0.6)" },
  showMe:    { alpha: 1, duration: 500, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "hintRing on the needed bank tiles after the 2nd wrong Check (from alpha 0.2)" },
  celebrate: { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "finish elephant" }
};
```

## Screen layout
```
y   0 ┌──────────────────────────────────────────────────────────────┐
      │ [lang]          ○ ○ ○ ○ ○ ○ ○ ○ ○ ○  rail y=28   Question 1 of 10│  zone T
 56   ├──────────────────────────────────────────────────────────────┤
      │             "Put one sound in each box" (360,80)   elephant   │
      │  ┌ card ┐          [1  ] [2  ] [3  ]   boxes y=160  (640,100) │  zone A
      │  │ pic  │          x=328  x=420  x=512  (80×80)               │
      │  └(110,160)        pairPic (600,160) on a vowel cue           │
260   ├──────────────────────────────────────────────────────────────┤
      │   [ t ] [ a ] [ o ] [ c ] [ k ] [ d ]   bank y=380 (80×80)    │  zone B
      │   x=130  222   314   406   498   590                          │
480   ├──────────────────────────────────────────────────────────────┤
      │                    [   OK   ] (360,510)                       │  zone C
560   └──────────────────────────────────────────────────────────────┘
```
Four-box words: boxes at x = 282 / 374 / 466 / 558. A digraph box and tile are 100 wide (`ART.tileWide`); the box row is re-centred on 420 with pitch 92 (112 for the wide one). Fixed layout, FIT scaling.

## Visual specification
- Background `THEME.colour.bg`; rail per §6: 10 × `ART.dotEmpty` (x = 261 + i × 22, y = 28) → `ART.dotFull`; `t("question_x_of_y")` at (600, 28), 18 px `THEME.font.body` `THEME.colour.inkSoft`.
- Caption `S("putSounds")` at (360, 80), 24 px `THEME.font.body` `THEME.colour.inkSoft`, `wordWrap` 600, max 2 lines.
- `ART.card` centred (110, 160) with the item's picture (88 px) on it; `ART.wordDone` at (110, 244) after a correct Check; `ART.elephant` at (640, 100).
- Boxes: `makeTile` 80 × 80 (`ART.box` tokens, dashed while empty → `ART.boxFilled` → `ART.boxDone`) at the box row; `ART.boxNumeral` at box (−30, −30); a placed tile's letter is drawn on the box (44 px `THEME.font.display` `THEME.colour.ink`).
- Bank tiles: `makeTile` 80 × 80 (`ART.tile`; `ART.tileWide` 100 × 80 for a digraph), letters lowercase 44 px (40 for a digraph); `ART.vowelGlow` / `ART.hintRing` drawn behind a bank tile; `ART.digraphBracket` over two adjacent bank tiles (the two split letters are always placed adjacent in the bank at L2 so the bracket spans them).
- `ART.pairPic` at (600, 160) during a vowel cue.
- OK: `makeButton` `ok` at (360, 510), alpha 0.5 while disabled.
- Tap floors 80 (tiles, boxes) ≥ 56; gaps 12 (bank), 12 (boxes).
- Tab order: bank tiles left to right, then the boxes, then OK.

## Content
Language-bound. `LOCALE_DATA[GameCore.lang].items` supplies, per item, the picture key, the box tiles in order, the three distractor tiles, and (optional) the minimal-pair picture per vowel distractor. The English (`en`) list is authored in full below. **Other locales: a native word list is required — en pilot.** Native authors decide the grain (letter boxes for de/nl/sv/da/no/en; syllable boxes for es/it/pt/fr/fi where the school method segments by syllable, F-24), the digraph inventory (de "sch"/"ch"/"ei"; nl "oe"/"ij"/"ui"; sv "sj"/"tj"; F-124), and the distractor letters from that language's confusable sets; `no` may be shipped later (no spelling aim by year 2, F-22).

Each item = (picture; boxes in order; distractors [; minimal-pair picture for a vowel distractor]). Distractors are always: one vowel neighbour (F-123) + one consonant neighbour (voicing or mirror: b/d, p/b, t/d, m/n, g/k) + one random letter not in the word.
- **L1 — CVC, three boxes**: (`ART.picCat`; c, a, t; o (pair: none), d, k) · (`ART.picDog`; d, o, g; a, b, m) · (`ART.picSun`; s, u, n; a, m, t) · (`ART.picPig`; p, i, g; e, b, t) · (`ART.picHat`; h, a, t; o, d, s) · (`ART.picBus`; b, u, s; a, d, p) · (`ART.picBed`; b, e, d; i, p, t) · (`ART.picPen`; p, e, n; i (pair `ART.picPin`), b, m) · (`ART.picHen`; h, e, n; i, m, t) · (`ART.picBat`; b, a, t; u, d, n) · (`ART.picNut`; n, u, t; e (pair `ART.picNet`), m, d) · (`ART.picWeb`; w, e, b; i, d, p) · (`ART.picVan`; v, a, n; e, m, b) · (`ART.picCap`; c, a, p; u (pair `ART.picCup`), b, t) · (`ART.picBag`; b, a, g; u (pair `ART.picBug`), d, k) · (`ART.picMap`; m, a, p; o, n, b) · (`ART.picPan`; p, a, n; e (pair `ART.picPen`), b, m)
- **L2 — one digraph; the bank holds the digraph tile AND its two letters as singles** (misconception 3): (`ART.picFish`; f, i, sh; s, h, e) · (`ART.picShip`; sh, i, p; s, h, o (pair `ART.picShop`)) · (`ART.picChick`; ch, i, ck; c, h, e) · (`ART.picDuck`; d, u, ck; c, k, o) · (`ART.picSock`; s, o, ck; c, k, a) · (`ART.picBell`; b, e, ll; l, a (pair `ART.picBall`), d) · (`ART.picShell`; sh, e, ll; s, h, i) · (`ART.picMoon`; m, oo, n; o, u, m) · (`ART.picSheep`; sh, ee, p; s, h, b)
- **L3 — four boxes with a nasal / liquid or a cluster** (misconception 4): (`ART.picTent`; t, e, n, t; i, m, d) · (`ART.picLamp`; l, a, m, p; o, n, b) · (`ART.picMilk`; m, i, l, k; e, r, g) · (`ART.picHand`; h, a, n, d; o, m, t) · (`ART.picAnt`; a, n, t; e, m, d) · (`ART.picFrog`; f, r, o, g; a, l, k) · (`ART.picCrab`; c, r, a, b; o, l, p) · (`ART.picFlag`; f, l, a, g; o, r, k) · (`ART.picDrum`; d, r, u, m; a, l, n) · (`ART.picClock`; c, l, o, ck; a, r, k)

Bank composition: the word's tiles + the three distractors = 6 tiles (7 when a word needs a repeated letter — tent needs two t tiles; the bank then drops the random distractor to stay at 6). The two split letters of an L2 digraph count as two of the three distractors (plus the vowel neighbour). Tiles are shuffled in the bank per item; a word's tiles never sit in reading order.

Play list: 10 items; start at L1; levels per Rules; no word repeats within a session; the correct tile for box 1 is never in the same bank slot twice running.

## Rules
- Item count: 10.
- Difficulty progression: 2 consecutive first-try Checks → next level (cap L3).
- Adaptation: a wrong Check, or wrong first-try on 2 consecutive items → next item one level down (floor L1).
- What happens on a correct answer: `tone("correct")`, praise rotation ["well_done", "great_job", "excellent", "you_did_it", "keep_going"], boxes `ANIM.seal` in turn with rising notes and lock, the word appears under the picture, elephant `ANIM.trumpet`, rail dot fills, next item after 800 ms.
- What happens on a wrong answer (per anticipated mistake):
  - Middle box left empty while others are full (vowel omitted): OK stays disabled; after 4 s the empty box `ANIM.pulse`s and the bank's vowel tiles get `ART.vowelGlow` (`ANIM.glow`). Not an attempt.
  - Wrong vowel checked (pin for pen): `tone("nudge")`; the vowel tile returns with `ANIM.nudge`; `ART.pairPic` (the pin) appears beside the boxes with `ANIM.pairShow` while the child's tiles are still visible; the other boxes lock if correct.
  - Digraph split (s + h in two boxes): `tone("nudge")`; both single tiles return; `ART.digraphBracket` draws over them in the bank (`ANIM.bracket`), then the digraph tile `ANIM.pulse`s.
  - Cluster with the nasal/liquid missing (a leftover empty box at L3): OK disabled; after 4 s the empty box pulses and the nasal/liquid tile in the bank glows; if a wrong tile was put there, on Check it returns and the same glow shows.
  - Letters in the wrong order (tac): each box judged; the misplaced tiles return; the box numerals stay visible.
  - A tile placed on a full box: springs back, no message, not an attempt.
- Retry behaviour: attempt 1 → attempt 2 after the cue → attempt 3 with `ART.hintRing` on the needed bank tiles (show-me); placing them and checking is solved-with-help. No attempt 4. Undo (tapping a placed tile) is never an error.
- Finish condition: 10 items. No losing state, no clock.

## Strings
- `GameCore.t()` keys: `t("start")`, `t("ok")`, `t("question_x_of_y")`, `t("all_done")`, `t("play_again")`, `t("menu")`, `t("well_done")`, `t("great_job")`, `t("excellent")`, `t("you_did_it")`, `t("keep_going")`.
- Game-specific: `title` = "Sound Boxes"; `putSounds` = "Put one sound in each box". Tile letters and the finished word are locale content.

## Sound
`tone("tap")` on selecting a tile; `tone("tap", k)` when a tile lands in box k (the pitch climbs left to right, F-213); `tone("correct")` on a correct Check followed by the rising seal run; `tone("nudge")` on a wrong Check or a refused placement; `tone("finish")` once. Silent under `?sound=off`. Nothing is spoken.

## Testing checklist
- [ ] Works in all 11 languages (chrome, caption, OK and the counter change; `?lang=xx` reads `LOCALE_DATA.xx` and falls back to `en` without crashing while native lists are pending — reviewer notes "en pilot"; a two-syllable-box list must also build and check).
- [ ] Works at narrow width (400-px iframe: picture card, four boxes, six bank tiles and OK visible and separate).
- [ ] Keyboard operable (Tab: bank tiles, boxes, OK; Enter selects / places / checks).
- [ ] Never auto-starts.
- [ ] No losing state (wrong Checks never end the session; the hint rings always lead to completion).
- [ ] OK is dimmed until every box holds a tile; with "c" and "t" placed and the middle box empty, the middle box pulses after a few seconds and the vowel tiles glow.
- [ ] Checking p-i-n for the pen returns the i, shows a pin beside the boxes for about a second, and locks the p and n.
- [ ] At the second level the bank shows "sh" as one wide tile as well as "s" and "h"; checking s-h-i-p in four boxes is impossible (three boxes), and checking s-h-i returns s and h with a bracket over them, then the "sh" tile pulses.
- [ ] At the third level "tent" has four boxes and two t tiles in the bank; leaving a box empty pulses it and glows the n.
- [ ] Tapping a placed tile returns it to the bank without a wiggle.
- [ ] Two first-try Checks in a row bring digraph words, then four-box words; a wrong Check brings three-box words back.
- [ ] After a correct Check the word appears under the picture; the finish screen shows the ten words with their pictures and no score other than the optional first-try count.
- [ ] With `?sound=off` nothing is audible.
