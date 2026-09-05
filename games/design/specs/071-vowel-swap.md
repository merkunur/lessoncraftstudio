# 071 — Vowel Swap

## Identity
- Slug: `vowel-swap`
- Subject / topic: Literacy / short-vowel discrimination — reading the one word of a minimal pair that names a picture (pin / pen / pan)
- Age band: `6-8`
- Interaction pattern: `P1` — tap one of N
- Estimated build size: ~420 lines

Shared contract: `catalogue/BUILD-CONVENTIONS.md`. Pattern contract: `catalogue/PATTERNS.md` P1. Locale note: the word pairs are language-bound (F-123 is an English-derived catalogue, A-15); the English set is authored here in full, the other ten locales are declared in `LOCALE_DATA` as needing a native minimal-pair list (en pilot). Nothing is spoken (no audio files, F-7): the "sound" of the vowel is cued entirely by the PICTURE, and the child's job is to read the written words and pick the one the picture names.

## Learning
- Objective: Given a picture, reads two or three written words that differ only in their vowel letter and taps the one that names the picture.
- Prerequisites: Knows the letter-sound links of the consonants used (game 006 territory) and can blend a three-letter word (the shipped free CVC builder is the natural predecessor). Reads no sentences; the play screen has at most three words.
- Curriculum links: F-1 (letter sounds/phonics in 8 of 15 sources; SplashLearn "Vowels" 158 games, F-3), F-22 (blending letter-sounds into words at 6-7 in all twelve systems), F-24 (synthetic phonics EN/US; grapheme-phoneme FR; klankzuiver NL; letter-sound SE/NO), F-31 row "Blending to words (CVC / syllables)" — conservative 7, earliest 4 → 6-8 (US RF.1.2.c "isolate and pronounce … medial vowel sounds", RF.K.3.b "short vowels"; England Y1 phonics screening; Germany Klasse 1 "Vokale"; Netherlands groep 3 klankzuivere woorden; Sweden åk 1 "ljud och bokstav"; Finland 1. luokka KÄTS).
- Common misconceptions (F-123, F-125, F-124), each with this game's response:
  1. **/e/ ↔ /i/ confusion (pen read for pin, and the reverse).** Response: L1 never pairs e with i (the far-apart contrasts a/i and a/u come first); e/i pairs arrive at L2. When the child taps the e/i partner, both words park side by side under the picture (`ANIM.glide`), every consonant dims to alpha 0.35 (`ANIM.dimLetters`) and the two vowel letters stand alone at full ink with a coral bar beneath each (`ART.vowelMark`) — the child sees that the ONLY difference is that one letter, then the tiles return. Never marked as a hard error; the item counts as retried.
  2. **/a/ ↔ /o/ confusion (cat/cot, sock/sack).** Response: the same vowel-isolation cue; a/o pairs appear from L2 on.
  3. **Reading by first letter and picture (three-cueing, F-125).** Response: structural — every tile on the board shares every letter except the vowel, so a first-letter or last-letter guess cannot separate them; the child must read through the middle. The picture is the PROMPT (what to find), never a label beside a word.
  4. **Reading the word as a whole shape and failing in a new case or font (F-125).** Response: L3 alternates lowercase items with UPPERCASE items and, on lowercase items, alternates `THEME.font.display` and `THEME.font.body` between consecutive items, so the same word appears in a different dress across the session; on a wrong tap in an uppercase item the vowel cue also shows the lowercase form of the two words beneath (`ART.lowerGhost`) for the same 1200 ms.
  5. **Choosing by position (always the left tile).** Response: the correct slot shuffles and never repeats twice running (§13); after two wrong taps the show-me ring names the tile.

## How it plays
1. **Start screen**: title "Vowel Swap", the parrot (`ART.parrot`) at (360, 200), Start, picker.
2. **Item 1 (L1: picture pin; tiles PIN / PAN — shown lowercase "pin" / "pan")**: rail of 12 dots (§6) at y = 28; this band may show `t("question_x_of_y")` at (360, 48), 18 px `THEME.colour.inkSoft` — it does. Zone A: the picture frame (`ART.frame`, 200 × 160) centred at (360, 160) holding the prompt picture (`ART.picPin`, 96 px); the parrot perches at (150, 150). Zone B: two word tiles (`ART.wordTile`, 200 × 88) at y = 380, x = 250 / 470 (pitch 220 per §7.1), each showing its word at 40 px `THEME.font.display` `THEME.colour.ink`, order shuffled. Caption `S("whichWord")` ("Which word?") at (360, 296), 24 px `THEME.font.body` `THEME.colour.inkSoft`.
3. **Answering**: the child taps a tile.
   - **Correct**: `ANIM.pop`, `tone("correct")`, praise pop (rotation), the word tile's text glides up into the frame under the picture (`ANIM.glide` to (360, 222)) and settles as `ART.wordLabel`; the parrot does `ANIM.bob`; the rail dot fills; after 700 ms the next item builds (`ANIM.appear` on the picture and tiles).
   - **Wrong (any vowel confusion)**: `ANIM.nudge`, `tone("nudge")`, the tile de-selects; then the **vowel-isolation cue**: both tiles (the tapped one and the correct one; at three tiles the third stays put) glide to the parking spots (300, 470) and (420, 470); `ANIM.dimLetters` fades every consonant to alpha 0.35; `ART.vowelMark` draws under each vowel letter; in an UPPERCASE item `ART.lowerGhost` shows each word's lowercase form 34 px below its tile. After 1200 ms everything returns (`ANIM.glide` back, letters to alpha 1). Attempt 2 — all tiles enabled, positions re-shuffled (P1 brute-force guard).
   - **Second wrong tap**: the cue again, then the correct tile gains the show-me ring (`ART.showRing`, `ANIM.showMe`); tapping it completes the item as solved-with-help (the word still glides to the frame; no praise pop).
4. **Items 2-12**: per Content/Rules. L1 = two tiles, contrasts a/i and a/u; L2 = three tiles including e/i and a/o; L3 = three tiles, four- and five-letter words with a digraph or cluster, alternating lowercase/UPPERCASE.
5. **Re-queue** (F-41): an item answered wrong first-try re-enters the play list after 2 intervening items with the same picture and re-shuffled tiles; the item count stays 12 (the repeat replaces the last unplayed item of the same level).
6. **Finish**: `t("all_done")` (360, 110); the parrot (360, 200) `ANIM.celebrate`; the summary = the twelve picture-word pairs as chips (`ART.pairChip`, 150 × 40: the picture at 28 px on the left, the word at 20 px on the right) in three rows of four from y = 320 (x = 135 + i × 150), first-try items with `ART.dotFull` at the chip's left edge, helped items with `ART.dotEmpty` — a record of what was read unaided, not a score; `play_again` (250, 510), `menu` (470, 510); `tone("finish")`.

Session ≈ 5-6 minutes.

## Art registry
```js
const ART = {
  parrot:     { kind: "emoji", value: "🦜", size: 80 },                    // mascot (Unicode 11)
  frame:      { kind: "shape", shape: "roundRect", w: 200, h: 160, fill: "surface", stroke: "structure", strokeWidth: 3, radius: 20 },
  wordTile:   { kind: "shape", shape: "roundRect", w: 200, h: 88, fill: "surface", stroke: "line", strokeWidth: 2, radius: 14 },   // word 40 px
  wordLabel:  { kind: "text",  value: "", size: 28, font: "display", color: "structure" },
  vowelMark:  { kind: "shape", shape: "rect", w: 26, h: 6, fill: "accent" },
  lowerGhost: { kind: "text",  value: "", size: 24, font: "body", color: "inkSoft" },
  showRing:   { kind: "shape", shape: "roundRect", w: 212, h: 100, stroke: "structure", strokeWidth: 4, radius: 18 },
  pairChip:   { kind: "shape", shape: "roundRect", w: 150, h: 40, fill: "structureSoft", stroke: "structure", strokeWidth: 1, radius: 8 },
  dotEmpty:   { kind: "shape", shape: "circle", r: 8, stroke: "line", strokeWidth: 2 },
  dotFull:    { kind: "shape", shape: "circle", r: 8, fill: "structure" },
  // prompt pictures — each is one unambiguous English noun (the intended word in the comment)
  picPin:     { kind: "emoji", value: "📌", size: 96 },                    // pin
  picPan:     { kind: "emoji", value: "🍳", size: 96 },                    // pan
  picPen:     { kind: "emoji", value: "🖊️", size: 96 },                    // pen
  picBag:     { kind: "emoji", value: "👜", size: 96 },                    // bag
  picBug:     { kind: "emoji", value: "🐛", size: 96 },                    // bug
  picCap:     { kind: "emoji", value: "🧢", size: 96 },                    // cap
  picCup:     { kind: "emoji", value: "🥤", size: 96 },                    // cup
  picHat:     { kind: "emoji", value: "🎩", size: 96 },                    // hat
  picBat:     { kind: "emoji", value: "🦇", size: 96 },                    // bat
  picCat:     { kind: "emoji", value: "🐱", size: 96 },                    // cat
  picNet:     { kind: "emoji", value: "🥅", size: 96 },                    // net
  picNut:     { kind: "emoji", value: "🥜", size: 96 },                    // nut
  picBell:    { kind: "emoji", value: "🔔", size: 96 },                    // bell
  picBall:    { kind: "emoji", value: "⚽", size: 96 },                    // ball
  picSock:    { kind: "emoji", value: "🧦", size: 96 },                    // sock
  picLock:    { kind: "emoji", value: "🔒", size: 96 },                    // lock
  picDog:     { kind: "emoji", value: "🐶", size: 96 },                    // dog
  picLeg:     { kind: "emoji", value: "🦵", size: 96 },                    // leg
  picBed:     { kind: "emoji", value: "🛏️", size: 96 },                    // bed
  picPig:     { kind: "emoji", value: "🐷", size: 96 },                    // pig
  picFox:     { kind: "emoji", value: "🦊", size: 96 },                    // fox
  picRat:     { kind: "emoji", value: "🐀", size: 96 },                    // rat
  picBin:     { kind: "emoji", value: "🗑️", size: 96 },                    // bin
  picShip:    { kind: "emoji", value: "🚢", size: 96 },                    // ship
  picShop:    { kind: "emoji", value: "🏪", size: 96 },                    // shop
  picTruck:   { kind: "emoji", value: "🚚", size: 96 },                    // truck
  picClock:   { kind: "emoji", value: "⏰", size: 96 },                    // clock
  picBlock:   { kind: "emoji", value: "🧱", size: 96 },                    // block
  picCrab:    { kind: "emoji", value: "🦀", size: 96 },                    // crab
  picDuck:    { kind: "emoji", value: "🦆", size: 96 },                    // duck
  picRing:    { kind: "emoji", value: "💍", size: 96 },                    // ring
  picTent:    { kind: "emoji", value: "⛺", size: 96 },                    // tent
  picBank:    { kind: "emoji", value: "🏦", size: 96 }                     // bank
};
```
All prompt emoji are Unicode 11 or older; no fallbacks are needed.

## Animation registry
```js
const ANIM = {
  pop:        { scale: 1.12, duration: 140, ease: "Back.Out", yoyo: true, trigger: "correct tile" },
  nudge:      { x: "+=10", duration: 80, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "wrong tile" },
  glide:      { duration: 260, ease: "Sine.InOut", trigger: "word text into the frame; two tiles to the parking spots and back (x,y at call)" },
  dimLetters: { alpha: 0.35, duration: 200, ease: "Sine.Out", yoyo: true, hold: 1200, trigger: "each consonant letter object of the two parked words; vowels stay at alpha 1" },
  bob:        { y: "-=10", duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "parrot on correct" },
  appear:     { alpha: 1, scale: 1, duration: 200, ease: "Back.Out", trigger: "new picture and tiles (from alpha 0, scale 0.6)" },
  showMe:     { alpha: 1, duration: 500, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "ring on the correct tile (from alpha 0.2)" },
  celebrate:  { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "finish parrot" }
};
```
Implementation note for `dimLetters`: each word on a tile is drawn as one text object per LETTER (letters 40 px, advance 26 px, the word centred), so a single letter can be dimmed or underlined. `ART.vowelMark` sits 6 px below the vowel letter's baseline, centred on that letter.

## Screen layout
```
y   0 ┌──────────────────────────────────────────────────────────────┐
      │ [lang]       ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○  rail y=28; "3 of 12" y=48 │  zone T
 56   ├──────────────────────────────────────────────────────────────┤
      │   parrot            ┌──────────────┐                          │
      │  (150,150)          │  ART.frame   │  (360,160) 200×160       │  zone A
      │                     │   [picture]  │  picture 96 px           │
      │                     │   word label │  (360,222) after solve   │
      │                     └──────────────┘                          │
260   ├──────────────────────────────────────────────────────────────┤
      │                 "Which word?" (360,296)                       │
      │      [   pin   ]          [   pan   ]      2 tiles y=380       │  zone B
      │        x=250                x=470          (200×88)           │
      │   [  pen  ]   [  pin  ]   [  pan  ]        3 tiles: x=140/360/580│
480   ├──────────────────────────────────────────────────────────────┤
      │   parking spots for the vowel cue: (300,470) (420,470)        │  zone C
560   └──────────────────────────────────────────────────────────────┘
```
Fixed layout, FIT scaling. Three-tile items use the same tile size at x = 140 / 360 / 580 (pitch 220, gap 20).

## Visual specification
- Background `THEME.colour.bg`; rail per §6: 12 × `ART.dotEmpty` at y = 28 (x = 239 + i × 22) → `ART.dotFull`; `t("question_x_of_y")` at (360, 48).
- `ART.frame` centred (360, 160); the prompt picture centred (360, 150); `ART.wordLabel` at (360, 222) once solved (empty before).
- `ART.parrot` at (150, 150).
- Tiles: `makeTile` 200 × 88 with `ART.wordTile` tokens; the label is built letter by letter (see Animation note) at 40 px in `THEME.font.display` (or `THEME.font.body` on alternate L3 lowercase items) `THEME.colour.ink`; uppercase items render the same letters uppercased. Text width budget: the longest word is 5 letters (130 px) — well inside 200.
- Cue drawing: `ART.vowelMark` under each vowel; `ART.lowerGhost` 34 px below the tile (uppercase items only); `ART.showRing` behind the correct tile.
- Caption `S("whichWord")` at (360, 296), 24 px `THEME.font.body` `THEME.colour.inkSoft`, `wordWrap` 400.
- While a cue plays (≈ 1.8 s) all tiles are `setEnabled(false)`; they re-enable when it ends.
- Tap floors: tiles 200 × 88 (≥ 56). Gaps ≥ 20.

## Content
Word content is language-bound. `LOCALE_DATA[lang]` holds `{ items: { L1: [...], L2: [...], L3: [...] } }`; each item is `{ pic: <ART key>, answer: "pin", tiles: ["pin", "pan"], vowelIndex: [1, 1] }` (`vowelIndex` = the position of the vowel letter in each tile word, for the cue). The English set below is complete. **Other locales: a native minimal-pair list is required — en pilot.** Until each native list exists, `LOCALE_DATA[lang]` for de/fr/it/es/pt/nl/sv/da/no/fi is the string `"en"` and the game plays the English set with the chrome in the chosen language (the picture prompt is language-neutral; the words are not).

English items — (picture; answer; the other tile words):
- **L1** (two tiles; contrasts a/i and a/u; three-letter words): (`ART.picPin`; pin; pan) · (`ART.picPan`; pan; pin) · (`ART.picBag`; bag; bug) · (`ART.picBug`; bug; bag) · (`ART.picCap`; cap; cup) · (`ART.picCup`; cup; cap) · (`ART.picHat`; hat; hut) · (`ART.picBat`; bat; bit) · (`ART.picCat`; cat; cut) · (`ART.picRat`; rat; rut)
- **L2** (three tiles; e/i and a/o present; three-letter words): (`ART.picPen`; pen; pin, pan) · (`ART.picPin`; pin; pen, pan) · (`ART.picNet`; net; nut, not) · (`ART.picNut`; nut; net, not) · (`ART.picBell`; bell; ball, bill) · (`ART.picBall`; ball; bell, bill) · (`ART.picSock`; sock; sack, sick) · (`ART.picLock`; lock; lick, luck) · (`ART.picDog`; dog; dig, dug) · (`ART.picLeg`; leg; log, lag) · (`ART.picBed`; bed; bad, bud) · (`ART.picPig`; pig; peg, pug) · (`ART.picFox`; fox; fix, fax) · (`ART.picBin`; bin; ban, bun)
- **L3** (four/five-letter words with a digraph or cluster; odd-numbered L3 items UPPERCASE, even-numbered lowercase; lowercase items alternate display/body font): (`ART.picShip`; ship; shop) · (`ART.picShop`; shop; ship) · (`ART.picTruck`; truck; track, trick) · (`ART.picClock`; clock; click, cluck) · (`ART.picBlock`; block; black) · (`ART.picCrab`; crab; crib) · (`ART.picDuck`; duck; deck, dock) · (`ART.picRing`; ring; rang, rung) · (`ART.picTent`; tent; tint) · (`ART.picBank`; bank; bunk)

Play list: 12 items per Rules; within a level items are shuffled; the same picture never appears twice except by re-queue; correct slot never repeats twice running.

## Rules
- Item count: 12 (re-queued repeats replace unplayed items).
- Difficulty progression: 2 consecutive first-try correct → next level (cap L3).
- Adaptation: a wrong tap, or wrong first-try on 2 consecutive items → next item one level down (floor L1). A single miss also re-queues the item after 2 intervening items.
- What happens on a correct answer: `ANIM.pop`, `tone("correct")`, praise rotation ["well_done", "great_job", "excellent", "you_did_it", "keep_going"] on every first-try correct item, word glides to the frame label, parrot `ANIM.bob`, rail dot, next item after 700 ms.
- What happens on a wrong answer:
  - e/i or a/o or any other vowel partner tapped (vowel confusion): `ANIM.nudge` + `tone("nudge")`, then the vowel-isolation cue (consonants dim, coral bars under both vowels) for 1200 ms; tiles re-shuffle.
  - Wrong tile in an UPPERCASE item (shape reading): the same cue plus `ART.lowerGhost` under both parked tiles.
  - Position habit (a wrong tile in the same slot twice): no special cue; the show-me ring after the second wrong tap.
- Retry behaviour: attempt 1 → attempt 2 after the cue (tiles re-shuffled, all enabled) → attempt 3 with the show-me ring; solved-with-help. No attempt 4. The item re-queues later.
- Finish condition: 12 items. No losing state, no clock.

## Strings
- `GameCore.t()` keys: `t("start")`, `t("question_x_of_y")`, `t("all_done")`, `t("play_again")`, `t("menu")`, `t("well_done")`, `t("great_job")`, `t("excellent")`, `t("you_did_it")`, `t("keep_going")`.
- Game-specific: `title` = "Vowel Swap"; `whichWord` = "Which word?". The words on the tiles are CONTENT from `LOCALE_DATA`, not UI strings.

## Sound
`tone("correct")` on a correct tap; `tone("nudge")` on a wrong tap; `tone("tap")` when the vowel cue starts; `tone("finish")` once. Silent under `?sound=off`. No word or letter is ever spoken (no audio files); the picture carries the meaning.

## Testing checklist
- [ ] Works in all 11 languages (Start, "Question 3 of 12", All done, Play again, Menu, praise change; with `?lang=de` and no German list yet the English words still appear and nothing breaks).
- [ ] Works at narrow width (400-px iframe: picture frame and three word tiles fully visible, no clipping).
- [ ] Keyboard operable (Tab across the tiles; Enter picks).
- [ ] Never auto-starts.
- [ ] No losing state (wrong taps never end the session; the show-me ring always completes the item).
- [ ] Every tile on a board differs from the others only in its vowel letter (pin / pen / pan, never pin / pig).
- [ ] Tapping "pen" for the pin picture parks both words below, fades their consonants and draws a coral bar under the e and the i, then returns them.
- [ ] After a wrong tap the tiles come back in a different order.
- [ ] At the third level some items show the words in CAPITALS; a wrong tap there also shows the small-letter forms beneath.
- [ ] A missed item comes back two items later with the same picture.
- [ ] Two first-try corrects in a row move from two tiles to three; a wrong tap moves back.
- [ ] The finish screen shows the twelve picture-word chips with a filled or hollow dot and no score.
- [ ] With `?sound=off` nothing is audible.
