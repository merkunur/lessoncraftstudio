# 143 — First-Sound Pairs

## Identity
- Slug: `first-sound-pairs`
- Subject / topic: Literacy / initial sound matching — pairing two pictures whose names start with the same sound; the sound's letter appears on the link once the pair is made
- Age band: `5-6`
- Interaction pattern: `P12` — match pairs (all tiles visible; memory is not the objective)
- Estimated build size: ~460 lines

Shared contract: `catalogue/BUILD-CONVENTIONS.md`. Pattern contract: `catalogue/PATTERNS.md` P12. Locale note: **nothing is spoken** (no audio files); every item is a PICTURE whose name the child already knows (A-15). Which pictures share a first sound is language-bound (F-122: "sun" starts with s in English but "Sonne" with z-sound in German; "cat" is "gato" in Spanish) — every board lives in `LOCALE_DATA`; the mechanic is universal (F-217). Sibling of game 067 (sort pictures into two letter bins): here no letter is given in advance — the child must hear the shared sound between two pictures first; the letter is revealed as the reward.

## Learning
- Objective: Pairs two pictures on a visible board whose names begin with the same sound, when other pictures on the board rhyme with or belong with them, and sees the sound's letter appear on the link.
- Prerequisites: Knows the names of common pictured objects in the play language; can say a word and attend to its first sound (the free initial-sound activities or game 061). No reading; the letter on the link is a reward, never something to decode.
- Curriculum links: F-22 (phonological awareness — initial sounds — at 5-7 in all twelve systems), F-24 (letter-sound work is universal across reading methods), F-31 row "Letter names + sounds; initial sound" — conservative 6-7, earliest 4 → 5-6 (US RF.K.2.d "isolate and pronounce the initial … sounds"; England Reception "hear and say the initial sound in words"; Germany Klasse 1 Anlaute hören; France GS "repérer le son d'attaque"; Spain Infantil conciencia fonológica; Brazil EF01LP05 "identificar fonemas iniciais"; Netherlands groep 2 "beginklank"; Sweden förskoleklass "första ljudet"; Denmark 0. klasse forlyd; Norway 1. trinn; Finland esiopetus "alkuäänne"). Demand: F-7 (letter sounds are universal).
- Common misconceptions (F-126, F-122, F-121), each with this game's response:
  1. **Matching on the rhyme instead of the first sound (cat with hat) — F-126.** Response: L2 boards hold a rhyming pair split across two true pairs (cat pairs with cow, hat with hen); a wrong pair shows the two words' first letters as chips (`ART.firstChip` "c" and "h") side by side for 900 ms — different letters, no pair — then the nudge. The link letter of a correct pair is the same cue in reverse (one letter, two pictures).
  2. **Matching on meaning (dog with cat, pear with apple) — F-126.** Response: L3 boards hold a semantically related pair split across two true pairs (dog pairs with duck, cat with cow); the same first-letter chips show the mismatch.
  3. **Letter name used as the sound (a "y" picture matched to something starting with w) — F-122.** Response: the base pools avoid the letters whose names mislead (y, w, h are excluded from the English pools; c/k are never both present) so no board can be solved wrongly by a letter-name strategy; the chips show lowercase letters.
  4. **Mirror confusion on the revealed letters (reading the link "b" as "d") — F-121.** Response: b-pairs and d-pairs never appear on the same board before L3; at L3 both may appear and each link letter carries `ART.bellyDot` on its bowl.
  5. **Tapping the same tile twice expecting a match.** Response: the second tap de-selects it (no error; `tone("tap")`).

## How it plays
1. **Start screen**: title "First-Sound Pairs", the koala (`ART.koala`) at (360, 200), Start, picker.
2. **Board 1 (L1: 3 pairs, 6 tiles)**: the rail shows 2 dots (§6 — one per board). Zones A/B are merged: a 3 × 2 grid of picture tiles (`ART.tile`, 100 × 100, gap 20) centred at (360, 300): columns x = 240 / 360 / 480, rows y = 240 / 360, showing e.g. `ART.picSun`, `ART.picMoon`, `ART.picBus`, `ART.picSock`, `ART.picMouse`, `ART.picBee` (pairs s, m, b) in a shuffled layout. The koala sits at (80, 300). No caption; no words on the play screen.
3. **Pairing**: tap a picture → it lifts and outlines (`api.setSelected(true)`, `ANIM.lift`, `tone("tap")`). Tap a second picture:
   - **Pair (same first sound — sun + sock)**: both glide 20 px toward each other (`ANIM.join`), `tone("correct")`; `ART.linkLetter` (a coral circle with the letter "s" in lowercase) appears between them (`ANIM.appear`) and stays; both tiles lock at alpha 0.6; the koala `ANIM.blink` (a small scale wobble).
   - **Not a pair (cat + hat, or any two)**: `ART.firstChip` × 2 appear above the two tiles (`ANIM.appear`) showing each word's first letter ("c", "h") for 900 ms, then fade; both `ANIM.nudge`, `tone("nudge")`, both de-select. If the FIRST-tapped tile has now been in two wrong pairs, its true partner gains `ART.hintRing` (`ANIM.showMe`) until the pair is made.
   - **Same tile twice**: de-select, `tone("tap")`.
4. **Board complete**: all pairs locked → praise pop (rotation), the rail dot fills, `ANIM.boardOut`, then the next board `ANIM.appear`s after 600 ms.
5. **Boards 2-N**: L2 4 pairs (8 tiles, 4 × 2 grid: x = 180 / 300 / 420 / 540) with a cross-pair rhyme decoy; L3 5 pairs (10 tiles, 5 × 2 grid: x = 152 / 256 / 360 / 464 / 568, tiles 96 × 96) with a cross-pair semantic decoy and, where the pool allows, b- and d-pairs together. Session = 2 boards at L1 pace, 3 boards when the child reaches L3 by the end of board 2 (Rules).
6. **Finish**: `t("all_done")` (360, 110); the koala (360, 210) `ANIM.celebrate`; the summary = every pair made this session as `ART.pairChip` (110 × 40): the two small pictures (`ART.miniPic`, 22 px) with the link letter between, in rows of five from y = 360 (x = 360 − 2 × 122 + i × 122, row pitch 50) — the sound families found; `play_again` (250, 510), `menu` (470, 510); `tone("finish")`.

Session ≈ 4-5 minutes.

## Art registry
```js
const ART = {
  koala:      { kind: "emoji", value: "🐨", size: 80 },
  tile:       { kind: "shape", shape: "roundRect", w: 100, h: 100, fill: "surface", stroke: "line", strokeWidth: 2, radius: 14 },   // picture label 64 px
  linkLetter: { kind: "shape", shape: "circle", r: 20, fill: "accent" },        // lowercase letter 24 px display, color inkOnAccent, centred
  firstChip:  { kind: "shape", shape: "roundRect", w: 44, h: 44, fill: "structureSoft", stroke: "structure", strokeWidth: 2, radius: 10 },   // lowercase letter 26 px display ink
  hintRing:   { kind: "shape", shape: "roundRect", w: 112, h: 112, stroke: "structure", strokeWidth: 4, radius: 18 },
  bellyDot:   { kind: "shape", shape: "circle", r: 5, fill: "bg" },              // on the link letter's bowl at L3 (b / d)
  pairChip:   { kind: "shape", shape: "roundRect", w: 110, h: 40, fill: "structureSoft", stroke: "structure", strokeWidth: 2, radius: 8 },
  miniPic:    { kind: "text",  value: "", size: 22, font: "body", color: "ink" },  // value = a picture emoji read through ART at runtime
  dotEmpty:   { kind: "shape", shape: "circle", r: 8, stroke: "line", strokeWidth: 2 },
  dotFull:    { kind: "shape", shape: "circle", r: 8, fill: "structure" },
  // picture pool (English name and first letter in the comment; every name unambiguous)
  picSun:      { kind: "emoji", value: "☀️", size: 64 },   // sun s
  picSock:     { kind: "emoji", value: "🧦", size: 64 },   // sock s
  picSnake:    { kind: "emoji", value: "🐍", size: 64 },   // snake s
  picStar:     { kind: "emoji", value: "⭐", size: 64 },   // star s
  picMoon:     { kind: "emoji", value: "🌙", size: 64 },   // moon m
  picMouse:    { kind: "emoji", value: "🐭", size: 64 },   // mouse m
  picMonkey:   { kind: "emoji", value: "🐵", size: 64 },   // monkey m
  picMushroom: { kind: "emoji", value: "🍄", size: 64 },   // mushroom m
  picBus:      { kind: "emoji", value: "🚌", size: 64 },   // bus b
  picBee:      { kind: "emoji", value: "🐝", size: 64 },   // bee b
  picBear:     { kind: "emoji", value: "🐻", size: 64 },   // bear b
  picBanana:   { kind: "emoji", value: "🍌", size: 64 },   // banana b
  picBell:     { kind: "emoji", value: "🔔", size: 64 },   // bell b
  picTree:     { kind: "emoji", value: "🌳", size: 64 },   // tree t
  picTiger:    { kind: "emoji", value: "🐯", size: 64 },   // tiger t
  picTurtle:   { kind: "emoji", value: "🐢", size: 64 },   // turtle t
  picTomato:   { kind: "emoji", value: "🍅", size: 64 },   // tomato t
  picFish:     { kind: "emoji", value: "🐟", size: 64 },   // fish f
  picFox:      { kind: "emoji", value: "🦊", size: 64 },   // fox f
  picFrog:     { kind: "emoji", value: "🐸", size: 64 },   // frog f
  picFlower:   { kind: "emoji", value: "🌸", size: 64 },   // flower f
  picDog:      { kind: "emoji", value: "🐶", size: 64 },   // dog d
  picDuck:     { kind: "emoji", value: "🦆", size: 64 },   // duck d
  picDrum:     { kind: "emoji", value: "🥁", size: 64 },   // drum d
  picDonut:    { kind: "emoji", value: "🍩", size: 64 },   // donut d
  picLion:     { kind: "emoji", value: "🦁", size: 64 },   // lion l
  picLemon:    { kind: "emoji", value: "🍋", size: 64 },   // lemon l
  picLeaf:     { kind: "emoji", value: "🍃", size: 64 },   // leaf l
  picLock:     { kind: "emoji", value: "🔒", size: 64 },   // lock l
  picPig:      { kind: "emoji", value: "🐷", size: 64 },   // pig p
  picPen:      { kind: "emoji", value: "🖊️", size: 64 },   // pen p
  picPizza:    { kind: "emoji", value: "🍕", size: 64 },   // pizza p
  picPear:     { kind: "emoji", value: "🍐", size: 64 },   // pear p
  picCat:      { kind: "emoji", value: "🐱", size: 64 },   // cat c
  picCow:      { kind: "emoji", value: "🐮", size: 64 },   // cow c
  picCar:      { kind: "emoji", value: "🚗", size: 64 },   // car c
  picCake:     { kind: "emoji", value: "🎂", size: 64 },   // cake c
  picHat:      { kind: "emoji", value: "🎩", size: 64 },   // hat h
  picHen:      { kind: "emoji", value: "🐔", size: 64 },   // hen h
  picHouse:    { kind: "emoji", value: "🏠", size: 64 },   // house h
  picHorse:    { kind: "emoji", value: "🐴", size: 64 },   // horse h
  picRabbit:   { kind: "emoji", value: "🐰", size: 64 },   // rabbit r
  picRocket:   { kind: "emoji", value: "🚀", size: 64 },   // rocket r
  picRainbow:  { kind: "emoji", value: "🌈", size: 64 },   // rainbow r
  picRing:     { kind: "emoji", value: "💍", size: 64 },   // ring r
  picNose:     { kind: "emoji", value: "👃", size: 64 },   // nose n
  picNut:      { kind: "emoji", value: "🥜", size: 64 },   // nut n
  picGoat:     { kind: "emoji", value: "🐐", size: 64 },   // goat g
  picGift:     { kind: "emoji", value: "🎁", size: 64 }    // gift g
};
```
No emoji newer than Unicode 12; no `fallback` needed. h-pictures (hat, hen, house, horse) are used ONLY as the rhyme decoys at L2 and L3 (the h letter-name trap of F-122 does not arise because no board asks the child to find "h" from its name — the h-pair is simply another pair). y, w, k, j, q, v, x, z pictures are absent from the English base by design.

## Animation registry
```js
const ANIM = {
  lift:      { y: "-=8", scale: 1.06, duration: 120, ease: "Sine.Out", trigger: "tile selected" },
  join:      { duration: 220, ease: "Back.Out", trigger: "each tile of a correct pair moves 20 px toward the other (x,y at call)" },
  nudge:     { x: "+=10", duration: 80, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "both tiles of a wrong pair" },
  appear:    { alpha: 1, scale: 1, duration: 200, ease: "Back.Out", trigger: "linkLetter; firstChips; a new board (from alpha 0, scale 0.6)" },
  fadeOut:   { alpha: 0, duration: 250, ease: "Sine.In", trigger: "firstChips after 900 ms" },
  blink:     { scale: 1.08, duration: 110, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "koala on each correct pair" },
  showMe:    { alpha: 1, duration: 500, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "hintRing on the true partner (from alpha 0.2)" },
  boardOut:  { y: "-=30", alpha: 0, duration: 300, ease: "Sine.In", trigger: "all tiles and link letters when a board completes" },
  celebrate: { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "finish koala" }
};
```
No flashing; `showMe` cycles at 1 Hz.

## Screen layout
```
y   0 ┌──────────────────────────────────────────────────────────────┐
      │ [lang]                      ○ ○   rail y=28 (one dot per board)│  zone T
 56   ├──────────────────────────────────────────────────────────────┤
      │                  [c] [h]  firstChips above a wrong pair (900 ms)│
      │  koala          [sun ]     [moon]     [bus ]    row y=240     │
      │  (80,300)                (s)  ← linkLetter between a made pair │  zones A+B
      │                 [mouse]    [sock]     [bee ]    row y=360     │
      │                x=240      x=360      x=480     (100×100)     │
480   ├──────────────────────────────────────────────────────────────┤
      │                                                              │  zone C
560   └──────────────────────────────────────────────────────────────┘
```
Picture names in brackets are documentation only — the tiles show pictures, never words. 4-pair boards use x = 180 / 300 / 420 / 540; 5-pair boards x = 152 / 256 / 360 / 464 / 568 with 96 × 96 tiles. Fixed layout, FIT scaling.

## Visual specification
- Background `THEME.colour.bg`; rail per §6 with one `ART.dotEmpty` per board (2 or 3) centred at y = 28, swapped for `ART.dotFull` as boards complete.
- Tiles: `makeTile` with `ART.tile` tokens; label = the picture emoji at 64 px read through `ART[picKey].value`; selected = library selected look + `ANIM.lift`; locked = alpha 0.6, plus `ART.linkLetter` drawn at the midpoint between the two locked tiles' centres with the lowercase letter (24 px `THEME.font.display` `THEME.colour.inkOnAccent`); at L3 a b- or d-link letter carries `ART.bellyDot` on its bowl (b: (+5, +3); d: (−5, +3) relative to the letter centre).
- `ART.firstChip` × 2 at 36 px above each of the two tiles of a wrong pair (letter 26 px `THEME.font.display` `THEME.colour.ink`).
- `ART.hintRing` behind a tile. `ART.koala` (80, 300). Tap floors 96-100 ≥ 80; gaps ≥ 8 at 5 columns (tiles 96, pitch 104), ≥ 20 otherwise.

## Content
Language-bound. `LOCALE_DATA[GameCore.lang].boards` supplies, per level, boards of pairs `{ letter, a: <ART key>, b: <ART key> }` plus the decoy note. The English (`en`) set is authored in full below. **Other locales: a native word list is required — en pilot.** Native authors must choose pictures whose native names share a first SOUND by that language's convention (de "Sonne"/"Socke" share /z/; es "sol"/"sapo" share /s/ but "cebra" does not belong with "casa"; fi "aurinko"/"auto" share /a/ — vowels are common first sounds in Finnish and Italian and are welcome), must rebuild the rhyme and meaning decoys from that language, and must set the link letter to the letter that language writes for the sound (de "Sch" for "Schaf"/"Schuh" is a legitimate multi-letter link). Until then `LOCALE_DATA[lang] = "en"` and the English set plays with the chrome in the chosen language.

Pairs available per letter (a board draws pairs without repeating a picture in the session): s: (`ART.picSun`, `ART.picSock`) (`ART.picSnake`, `ART.picStar`) · m: (`ART.picMoon`, `ART.picMouse`) (`ART.picMonkey`, `ART.picMushroom`) · b: (`ART.picBus`, `ART.picBee`) (`ART.picBear`, `ART.picBanana`) (`ART.picBell`, `ART.picBus`) · t: (`ART.picTree`, `ART.picTiger`) (`ART.picTurtle`, `ART.picTomato`) · f: (`ART.picFish`, `ART.picFox`) (`ART.picFrog`, `ART.picFlower`) · d: (`ART.picDog`, `ART.picDuck`) (`ART.picDrum`, `ART.picDonut`) · l: (`ART.picLion`, `ART.picLemon`) (`ART.picLeaf`, `ART.picLock`) · p: (`ART.picPig`, `ART.picPen`) (`ART.picPizza`, `ART.picPear`) · c: (`ART.picCat`, `ART.picCow`) (`ART.picCar`, `ART.picCake`) · h: (`ART.picHat`, `ART.picHen`) (`ART.picHouse`, `ART.picHorse`) · r: (`ART.picRabbit`, `ART.picRocket`) (`ART.picRainbow`, `ART.picRing`) · n: (`ART.picNose`, `ART.picNut`) · g: (`ART.picGoat`, `ART.picGift`)

Boards by level:
- **L1 — 3 pairs, sounds far apart, no decoys** (drawn from): [s, m, b] · [t, f, l] · [p, r, d] · [s, t, g] · [m, f, n]
- **L2 — 4 pairs including one RHYME decoy across pairs** (misconception 1; the decoy is named; where a letter has two pairs the pair to use is written out): [c (cat, cow), h (hat, hen), s (sun, sock), b (bus, bee) — decoy cat/hat] · [b (bus, bee), t (tree, tiger), m (moon, mouse), l (lion, lemon) — decoy bee/tree] · [m (moon, mouse), h (house, horse), d (dog, duck), p (pig, pen) — decoy mouse/house] · [c (car, cake), s (star, snake), f (fish, fox), r (rabbit, rocket) — decoy car/star] · [g (goat, gift), b (bear, banana), p (pear, pizza), n (nose, nut) — decoy bear/pear]
- **L3 — 5 pairs including one MEANING decoy across pairs, b and d together where possible** (misconceptions 2 and 4): [d (dog, duck), c (cat, cow), b (bus, bee), s (sun, sock), l (leaf, lock) — decoy dog/cat; b + d links carry belly dots] · [p (pear, pizza), b (banana, bear), d (drum, donut), m (monkey, mushroom), t (turtle, tomato) — decoy pear/banana; belly dots] · [h (hen, house), d (duck, dog), f (fish, fox), r (rainbow, ring), g (goat, gift) — decoy hen/duck] · [l (lion, lemon), t (tiger, tree), c (cat, car), s (snake, star), n (nose, nut) — decoy lion/tiger] · [r (rocket, rainbow), s (star, sun), m (moon, mushroom), b (bell, bus), p (pig, pen) — decoy rocket/star]

Board rules: an L1 board names letters only — it takes, per letter, the first pair of that letter not yet used in the session; when several boards qualify for the next level the game picks at random among those whose pictures are all unused this session, and only if none qualifies does it allow a repeated picture; the two pictures of one pair are never horizontally adjacent in the same row on a fresh board; the decoy pair's two pictures ARE adjacent (so the tempting wrong pair is right there); a picture is used once per session; c- and k-initial pictures never mix (no k pictures exist in the base).

## Rules
- Item count: one "item" = one board; 2 boards minimum, 3 boards when the child reaches L3 by the end of board 2 (session cap 3 boards, 12 pairs at most ≈ 5 minutes).
- Difficulty progression: a board completed with at most one wrong pair → next board one level up (cap L3).
- Adaptation: a board with three or more wrong pairs → next board one level down (floor L1); a board with exactly two wrong pairs → same level.
- What happens on a correct answer: `ANIM.join`, `tone("correct")`, `ART.linkLetter` appears with the sound's letter and stays, tiles lock, koala `ANIM.blink`; on board completion a praise pop (rotation ["well_done", "great_job", "excellent", "you_did_it", "keep_going"]) and the rail dot.
- What happens on a wrong answer (per anticipated mistake):
  - Rhyme decoy (cat + hat): `ART.firstChip` "c" and "h" above the tiles for 900 ms, then both nudge, `tone("nudge")`, de-select.
  - Meaning decoy (dog + cat): chips "d" and "c", then the nudge.
  - Any other non-pair: chips of the two first letters, then the nudge; the board never resets.
  - The same tile in two wrong pairs: its true partner gains `ART.hintRing` (the show-me step for this pattern); the ring stays until the pair is made.
- Retry behaviour: unlimited within the board; support escalates per tile (two misses → its partner is shown). A board always completes.
- Finish condition: the session's boards complete. No losing state, no clock.

## Strings
- `GameCore.t()` keys: `t("start")`, `t("all_done")`, `t("play_again")`, `t("menu")`, `t("well_done")`, `t("great_job")`, `t("excellent")`, `t("you_did_it")`, `t("keep_going")`.
- Game-specific: `title` = "First-Sound Pairs". No words on the play screen; the link letters and chips are content from `LOCALE_DATA`.

## Sound
`tone("tap")` on select/de-select; `tone("correct")` on a pair; `tone("nudge")` on a non-pair; `tone("finish")` once. Silent under `?sound=off`. Sounds are NOT spoken; the pictures carry them and the link letter names them.

## Testing checklist
- [ ] Works in all 11 languages (chrome strings change; `?lang=xx` reads `LOCALE_DATA.xx` and falls back to `en` without crashing while native lists are pending — reviewer notes "en pilot").
- [ ] Works at narrow width (400-px iframe: a 5 × 2 board is fully visible with separate tiles).
- [ ] Keyboard operable (arrows move across the grid, Enter selects; a second Enter on another tile attempts the pair).
- [ ] Never auto-starts.
- [ ] No losing state (any number of wrong pairs still ends with every pair locked; hint rings appear after two misses on a tile).
- [ ] Tapping the sun then the sock joins them and a coral circle with "s" appears between them and stays.
- [ ] Tapping the cat then the hat shows "c" and "h" chips above them, then they nudge apart.
- [ ] On a board with dog and cat, tapping the two together shows "d" and "c" chips and no pair.
- [ ] Every picture on a board has exactly one partner; the decoy pictures sit side by side.
- [ ] At the third level a b-link and a d-link on the same board each carry a small dot on the letter's belly.
- [ ] Tapping a tile twice de-selects it with no error; a locked pair is dimmed and cannot be tapped again.
- [ ] A board with 0-1 mistakes is followed by a bigger board; a board with 3+ mistakes by a smaller one.
- [ ] The finish screen shows the pairs made with their letters and no score.
- [ ] With `?sound=off` nothing is audible.
