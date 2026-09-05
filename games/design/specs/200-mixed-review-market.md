# 200 — Market Day

## Identity
- Slug: `mixed-review-market`
- Subject / topic: Mathematics / mixed retrieval of addition and subtraction facts to 20, interleaved, with expanding re-queue of misses
- Age band: `6-8`
- Interaction pattern: `P1` — tap one of N (three answer tiles; the twenty-frame is the enacted hint)
- Estimated build size: ~480 lines

Shared contract: `catalogue/BUILD-CONVENTIONS.md`. Pattern contract: `catalogue/PATTERNS.md` P1 (brute-force guard: after a wrong tap the tiles re-shuffle and the item never counts as first-try). This is the catalogue's closing REVIEW game: it adds no new fact, it interleaves the facts of games 003-004 / 015-020 / 030-040 (F-41: interleaving related problem types doubled next-day scores) and re-queues every miss with the expanding lags 1 → 3 → 7. Content is language-neutral (numerals and the two signs); the only words are the chrome.

## Learning
- Objective: Retrieves the answer to a mixed stream of addition and subtraction facts within 20 (a + b ≤ 20, a − b with a ≤ 20) by tapping it among three tiles, reading the sign each time, and repairs a miss by reading the twenty-frame.
- Prerequisites: Adds and subtracts within 10 fluently (games 003-004, 015-018); has met make-ten and count-back strategies to 20 (games 030-040); reads numerals to 20.
- Curriculum links: F-1 (addition within 20 in 14 of 15 sources, subtraction within 20 in 12 — the two most-demanded topics), F-21 (+/− facts to 20 in all twelve systems by age 8), F-41 (expanding re-queue of misses 1-2-3-7; interleave after an introduction block for 6-9), F-46 (three-step support ladder), F-31 row "Addition/subtraction facts to 20" — conservative 7-8, earliest 5 → 6-8 (US 1.OA.C.6 "add and subtract within 20", 2.OA.B.2 "fluently add and subtract within 20"; England Y1-Y2 "addition and subtraction facts within 20"; Germany Klasse 1-2 "Addition und Subtraktion im Zahlenraum bis 20"; France CP-CE1 "tables d'addition, compléments"; Netherlands groep 3-4 "optellen en aftrekken tot 20"; Spain 1º ciclo; Brazil EF01MA06 / EF02MA05; Sweden åk 1-3; Finland 1.-2. luokka "yhteen- ja vähennyslasku 0-20").
- Common misconceptions (F-105, F-106, F-104, F-41), each with this game's response:
  1. **Reads the wrong sign — adds when the tag says minus (13 − 8 → 21) or subtracts when it says plus.** Response: interleaving makes the sign load-bearing (F-41); every fact offers the OTHER operation's result as a distractor; on that tap the sign on the price tag is ringed (`ART.signRing`, `ANIM.markIn`) and the twenty-frame enacts the RIGHT operation (counters join for +, counters leave for −) so the child sees what the sign does.
  2. **Counting-on starts AT the first addend (7 + 5: "7, 8, 9, 10, 11" → 11) — F-105.** Response: the off-by-one-below answer is a distractor; the frame shows the first addend already filled (`ART.counter`), then the second addend's counters arrive one by one with numerals 8, 9, 10, 11, 12 on them (`ART.counterNum`, `tone("tap", k)`) — the first new counter is 8, not 7.
  3. **Counting back off by one (13 − 8: "13, 12, 11, 10, 9, 8, 7, 6" → 6) — F-106.** Response: the off-by-one distractor; the frame shows 13 counters and 8 of them fade to hollow one by one (`ART.counterGone`) with numerals 1…8 on the leaving ones; the remaining 5 stay solid and the total `ART.frameTotal` shows 5 — the start is not a jump.
  4. **Crossing ten by count-all instead of make-ten (8 + 5 counted from 1).** Response: L3 facts cross ten and the frame is a twenty-frame (two rows of ten); on a miss the second addend's counters fill the first row to ten FIRST and the rest spill into the second row (`ANIM.fill`), showing 8 + 2 + 3; nothing is said, the frame is the argument.
  5. **Speed anxiety around fact drills (F-45).** Response: no clock, no score, no streak; a tap is never final until it pops; tiles re-enable after a miss so a second look costs only first-try status; the finish shows what was retrieved unaided as filled dots and what needed the frame as hollow dots — a record, not a grade.

## How it plays
1. **Start screen**: title "Market Day", the cow stall-keeper (`ART.cow`) at (360, 200), Start, picker.
2. **Item 1 (L1: 4 + 3)**: rail of 12 dots (§6) at y = 28; `t("question_x_of_y")` at (360, 48). Zone A: the market stall (`ART.stall`, 640 × 170) centred at (360, 160) with its striped awning (`ART.awning`) along its top at y = 84; the cow behind the counter at (120, 150); a customer (`ART.picHen` for this item) arrives from the right (`ANIM.arrive`) to (600, 170) holding a basket (`ART.basket`); between them the price tag (`ART.tag`, 220 × 80) at (360, 150) showing the fact (`ART.factText`, 44 px) "4 + 3". The twenty-frame area at (360, 232) is EMPTY (the frame appears only as a hint). Zone B: three answer tiles (`ART.numeralTile`, 96 × 96) at y = 380, x = 240 / 360 / 480, showing 7, 6, 1 in a shuffled order. Zone C: empty (no Check — P1).
3. **Answering**: the child taps a tile.
   - **Correct**: `ANIM.pop`, `tone("correct")`, praise pop (rotation); the fact completes on the tag ("4 + 3 = 7"); the goods (`ART.picApple` for this item) hop into the customer's basket (`ANIM.hopIn`); the customer walks off right (`ANIM.leave`); rail dot fills; the next customer arrives after 700 ms. First-try.
   - **Wrong (the other operation's result, e.g. 1 for 4 + 3)**: `ANIM.nudge`, `tone("nudge")`, the tile de-selects; the three tiles re-shuffle (`ANIM.glide`, the brute-force guard) and stay enabled; `ART.signRing` rings the "+" on the tag; the frame draws in zone A at (360, 232): `ART.frame` `ANIM.appear`s, 4 solid counters (`ART.counter`) fill from the left, then 3 more arrive one by one (`ANIM.fill`, 300 ms apart) each wearing its running numeral 5, 6, 7 (`ART.counterNum`) with `tone("tap", k)`; `ART.frameTotal` "7" appears at the frame's right. Tiles disabled during the draw (≈ 1.6 s). Attempt 2 with the frame visible.
   - **Wrong (off by one, e.g. 6 for 4 + 3 or 6 for 13 − 8)**: the frame draws as above; for + the first arriving counter's numeral `ANIM.pulse`s (it is 5, not 4); for − the last leaving counter and the total pulse.
   - **Wrong (any other)**: the frame draws; the total pulses.
   - **Attempt 2 correct**: `tone("correct")`, the fact completes, the goods hop in, rail dot; no praise pop; solved-with-help.
   - **Attempt 2 wrong**: the frame re-plays its counters, then the correct tile gains `ART.showRing` (`ANIM.showMe`); tapping it completes the item as solved-with-help.
4. **Re-queue (F-41, expanding 1 → 3 → 7)**: a fact missed on its first tap re-enters after 1 intervening item (fresh distractors and tile positions, a different customer); if missed again, after 3 intervening items; if missed a third time, after 7; a fourth miss is not re-queued (its "last look" is done). A re-queued repeat replaces the last unplayed item of the same level; if fewer unplayed items remain than the lag requires, the repeat is appended at the end of the play list (the count may grow to at most 15). Never the same fact back-to-back.
5. **Interleaving**: the play list alternates operations — no more than 2 additions or 2 subtractions in a row (a re-queued fact may break the alternation once); within a level, facts are shuffled.
6. **Items 2-12**: per Content/Rules. L1 = facts within 10, both operations; L2 = facts to 20 that do not cross ten (10 + 5, 15 − 5, 12 + 3, 17 − 4) and doubles; L3 = facts that cross ten (8 + 5, 13 − 7, 9 + 6, 15 − 8).
7. **Finish**: `t("all_done")` (360, 110); the cow (360, 200) `ANIM.celebrate`; the summary = the session's facts as price tags (`ART.tagChip`, 120 × 36, "8 + 5 = 13" in 18 px) in three rows of four (y = 320, 366, 412; x = 210 + i × 100; a 13-15-item session adds a fourth row at y = 458), with a filled `ART.dotFull` at the left for facts retrieved unaided on their FIRST appearance and a hollow `ART.dotEmpty` for facts that needed the frame — the record of what was retrieved, not a score; `play_again` (250, 510), `menu` (470, 510); `tone("finish")`.

Session ≈ 6 minutes.

## Art registry
```js
const ART = {
  cow:         { kind: "emoji", value: "🐮", size: 72 },                    // stall-keeper / mascot
  basket:      { kind: "emoji", value: "🧺", size: 40 },                    // the customer's basket (Unicode 11)
  stall:       { kind: "shape", shape: "roundRect", w: 640, h: 170, fill: "surface", stroke: "structure", strokeWidth: 3, radius: 18 },
  awning:      { kind: "shape", shape: "rect", w: 640, h: 26, fill: "structureSoft", stroke: "structure", strokeWidth: 2 },   // 8 vertical stripes of "structure" at alpha 0.25, 80 px apart
  tag:         { kind: "shape", shape: "roundRect", w: 220, h: 80, fill: "bg", stroke: "structure", strokeWidth: 3, radius: 12 },
  factText:    { kind: "text",  value: "", size: 44, font: "display", color: "structure" },
  signRing:    { kind: "shape", shape: "circle", r: 22, stroke: "accent", strokeWidth: 4 },
  frame:       { kind: "shape", shape: "roundRect", w: 360, h: 76, fill: "surface2", stroke: "line", strokeWidth: 2, radius: 10 },   // twenty-frame back: 2 rows × 10 cells, cell pitch 34; a thin "line" divider after the 5th column of each row
  counter:     { kind: "shape", shape: "circle", r: 13, fill: "structure" },
  counterGone: { kind: "shape", shape: "circle", r: 13, stroke: "structure", strokeWidth: 2 },   // a hollow counter: one that left in a subtraction
  counterNum:  { kind: "text",  value: "", size: 14, font: "display", color: "bg" },        // running numeral drawn ON a counter (inkOnAccent-safe: bg on structure)
  frameTotal:  { kind: "text",  value: "", size: 28, font: "display", color: "structure" },
  numeralTile: { kind: "shape", shape: "roundRect", w: 96, h: 96, fill: "surface", stroke: "line", strokeWidth: 2, radius: 12 },   // answer 40 px display ink
  showRing:    { kind: "shape", shape: "roundRect", w: 108, h: 108, stroke: "structure", strokeWidth: 4, radius: 16 },
  tagChip:     { kind: "shape", shape: "roundRect", w: 120, h: 36, fill: "structureSoft", stroke: "structure", strokeWidth: 1, radius: 8 },
  dotEmpty:    { kind: "shape", shape: "circle", r: 8, stroke: "line", strokeWidth: 2 },
  dotFull:     { kind: "shape", shape: "circle", r: 8, fill: "structure" },
  // customers (one per item, rotating) and goods (one per item, rotating)
  picHen:      { kind: "emoji", value: "🐔", size: 56 },   // hen
  picPig:      { kind: "emoji", value: "🐷", size: 56 },   // pig
  picRabbit:   { kind: "emoji", value: "🐰", size: 56 },   // rabbit
  picGoat:     { kind: "emoji", value: "🐐", size: 56 },   // goat
  picDuck:     { kind: "emoji", value: "🦆", size: 56 },   // duck
  picSheep:    { kind: "emoji", value: "🐑", size: 56 },   // sheep
  picApple:    { kind: "emoji", value: "🍎", size: 32 },   // apples
  picCarrot:   { kind: "emoji", value: "🥕", size: 32 },   // carrots
  picEgg:      { kind: "emoji", value: "🥚", size: 32 },   // eggs
  picBread:    { kind: "emoji", value: "🍞", size: 32 },   // bread
  picCheese:   { kind: "emoji", value: "🧀", size: 32 },   // cheese
  picCorn:     { kind: "emoji", value: "🌽", size: 32 }    // corn
};
```
All emoji are Unicode 11 or older; no fallbacks needed. No currency is shown anywhere: the "price tag" carries the fact, never a coin or a symbol (F-29 — money is market-conditional and is NOT this game's objective).

## Animation registry
```js
const ANIM = {
  pop:       { scale: 1.12, duration: 140, ease: "Back.Out", yoyo: true, trigger: "correct tile" },
  nudge:     { x: "+=10", duration: 80, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "wrong tile" },
  glide:     { duration: 260, ease: "Sine.InOut", trigger: "tiles re-shuffling after a wrong tap (x set at call)" },
  arrive:    { x: 600, duration: 500, ease: "Sine.Out", trigger: "customer from x = 760 to its spot" },
  leave:     { x: 780, duration: 500, ease: "Sine.In", trigger: "customer walking off after a correct answer" },
  hopIn:     { y: "-=30", duration: 180, ease: "Sine.Out", yoyo: true, trigger: "goods hopping into the basket (then parented to it)" },
  appear:    { alpha: 1, scale: 1, duration: 200, ease: "Back.Out", trigger: "frame, new item (from alpha 0, scale 0.6)" },
  fill:      { alpha: 1, scale: 1, duration: 200, ease: "Back.Out", trigger: "each arriving counter (from alpha 0, scale 0.4), 300 ms apart" },
  fade:      { alpha: 0.35, duration: 250, ease: "Sine.In", trigger: "each leaving counter turning hollow (the solid counter fades; counterGone drawn beneath), 300 ms apart" },
  markIn:    { alpha: 1, duration: 200, ease: "Sine.Out", yoyo: true, hold: 1200, trigger: "signRing on the tag's sign (from alpha 0)" },
  pulse:     { scale: 1.15, duration: 300, ease: "Sine.InOut", yoyo: true, repeat: 2, trigger: "a counter numeral or the frame total after a miss" },
  showMe:    { alpha: 1, duration: 500, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "showRing on the correct tile (from alpha 0.2)" },
  celebrate: { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "finish cow" }
};
```

## Screen layout
```
y   0 ┌──────────────────────────────────────────────────────────────┐
      │ [lang]     ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○  rail y=28; "3 of 12" y=48  │  zone T
 56   ├──────────────────────────────────────────────────────────────┤
      │  ╔════════════ awning y=84 ═══════════════════════════════╗   │
      │  ║  cow        ┌────────────┐            customer + basket ║   │  zone A
      │  ║ (120,150)   │   4 + 3    │  tag (360,150)   (600,170)   ║   │
      │  ║             └────────────┘                              ║   │
      │  ║   [ frame (360,232) 360×76 — hint only ]                ║   │
      │  ╚═════════════════════════════════════════════════════════╝   │
260   ├──────────────────────────────────────────────────────────────┤
      │        [  6 ]       [  7 ]       [  1 ]   tiles y=380         │  zone B
      │        x=240        x=360        x=480    (96×96)             │
480   ├──────────────────────────────────────────────────────────────┤
      │                                                              │  zone C
560   └──────────────────────────────────────────────────────────────┘
```
Fixed layout, FIT scaling. The frame's two rows sit at y = 214 and y = 250 inside the stall; `ART.frameTotal` at (560, 232).

## Visual specification
- Background `THEME.colour.bg`; rail per §6: 12 × `ART.dotEmpty` (x = 239 + i × 22) → `ART.dotFull` (a 13-15-item session extends the rail at the same pitch); `t("question_x_of_y")` at (360, 48) with `total` = the current play-list length.
- `ART.stall` centred (360, 160); `ART.awning` centred (360, 84); `ART.cow` at (120, 150); the customer at (600, 170) at 56 px with `ART.basket` at (640, 196); `ART.tag` at (360, 150) with `ART.factText` centred on it.
- Frame (hint only): `ART.frame` centred (360, 232); cells at pitch 34 from x = 207 (2 rows × 10); `ART.counter` / `ART.counterGone` centred in cells; `ART.counterNum` on a counter; `ART.frameTotal` at (560, 232). Fill order mirrors the physical twenty-frame (F-48): row 1 left → right to ten, then row 2.
- Tiles: `makeTile` 96 × 96 with `ART.numeralTile` tokens, answer 40 px `THEME.font.display` `THEME.colour.ink`. `ART.showRing` behind the correct tile. `ART.signRing` centred on the sign glyph of the tag.
- Tap floors 96 ≥ 56; gaps 24. During the frame draw (≈ 1.6 s) tiles are `setEnabled(false)`.
- Keyboard: Tab across the three tiles; Enter taps.

## Content
Language-neutral (numerals and the signs + and −). Items as (fact; distractor 1, distractor 2), where distractor 1 is the OTHER operation's result (a − b for a + b, a + b for a − b; when that equals the answer or is outside 0-20 the off-by-two answer is used instead) and distractor 2 is the off-by-one answer (below for +, above for − at L1; both directions from L2). Customers and goods rotate through their pools in order, independent of the facts: customers `ART.picHen`, `ART.picPig`, `ART.picRabbit`, `ART.picGoat`, `ART.picDuck`, `ART.picSheep` (then from the start again); goods `ART.picApple`, `ART.picCarrot`, `ART.picEgg`, `ART.picBread`, `ART.picCheese`, `ART.picCorn` (likewise). A re-queued fact takes the next customer and goods in the rotation like any other item.

- **L1** (within 10, both operations; ~half and half): (4 + 3; 1, 6) · (7 − 3; 10, 5) · (5 + 2; 3, 6) · (9 − 4; 13, 6) · (6 + 4; 2, 9) · (8 − 5; 13, 4) · (3 + 6; 3, 8) · (10 − 7; 17, 4) · (2 + 7; 5, 8) · (9 − 2; 11, 6) · (5 + 5; 0, 9) · (8 − 4; 12, 5)
- **L2** (to 20, no ten-crossing; doubles): (10 + 5; 5, 14) · (15 − 5; 20, 11) · (12 + 3; 9, 14) · (17 − 4; 15, 14) · (6 + 6; 0, 11) · (14 − 7; 9, 8) · (11 + 4; 7, 14) · (18 − 6; 14, 13) · (13 + 5; 8, 17) · (16 − 8; 10, 9) · (7 + 7; 0, 13) · (19 − 9; 12, 11) · (10 + 10; 0, 19) · (12 − 6; 18, 5)
- **L3** (crossing ten): (8 + 5; 3, 12) · (13 − 7; 20, 7) · (9 + 6; 3, 14) · (15 − 8; 9, 8) · (7 + 4; 3, 10) · (12 − 5; 17, 8) · (6 + 8; 2, 13) · (14 − 9; 7, 6) · (9 + 9; 0, 17) · (11 − 4; 15, 8) · (7 + 6; 1, 12) · (16 − 9; 9, 8) · (5 + 9; 4, 13) · (17 − 8; 11, 10)
- Where the other operation's result would fall outside 0-20 (e.g. 17 + 4 = 21 for 17 − 4), the list above already carries the off-by-two answer in its place; every pair above is stored exactly as written.

Play list: 12 base items per Rules; shuffle within level, levels in order; operations alternate (≤ 2 of one kind in a row); tile positions shuffled per item and re-shuffled after every wrong tap; the correct tile's slot never repeats twice running; expanding re-queue per How it plays step 4.

## Rules
- Item count: 12 base items; re-queued repeats replace unplayed items of the same level, and are appended (to a cap of 15) when none remain.
- Difficulty progression: 3 consecutive first-try correct → next level (cap L3).
- Adaptation: a wrong first tap on 2 consecutive items → next item one level down (floor L1). A single miss re-queues the fact (lag 1, then 3, then 7) without changing the level.
- What happens on a correct answer: `ANIM.pop`, `tone("correct")`, praise rotation ["well_done", "great_job", "excellent", "you_did_it", "keep_going"] (first-try items only), the fact completes on the tag, goods `ANIM.hopIn`, customer `ANIM.leave`, rail dot, next customer after 700 ms.
- What happens on a wrong answer (each begins with `ANIM.nudge` + `tone("nudge")`, the tiles re-shuffle, and the frame draws):
  - The other operation's result (sign misread): `ART.signRing` on the sign + the frame enacts the right operation (counters arrive for +, counters turn hollow for −).
  - Off by one on +: the first arriving counter's numeral pulses (counting-on starts after the first addend).
  - Off by one on −: the last leaving counter and the total pulse (the start is not a jump).
  - Any other answer: the total pulses.
  - Attempt 2 wrong: the frame re-plays, then the show-me ring on the correct tile.
- Retry behaviour: attempt 1 (retrieval) → attempt 2 with the frame visible → attempt 3 = the show-me ring; solved-with-help; the fact re-queues after 1, then 3, then 7 items, then no more. No attempt 4.
- Finish condition: the play list is exhausted (12-15 items). No losing state; no clock (F-45).

## Strings
- `GameCore.t()` keys: `t("start")`, `t("question_x_of_y")`, `t("all_done")`, `t("play_again")`, `t("menu")`, `t("well_done")`, `t("great_job")`, `t("excellent")`, `t("you_did_it")`, `t("keep_going")`.
- Game-specific: `title` = "Market Day". Facts are numerals and signs only; no currency, no words on the tag.

## Sound
`tone("tap")` on selecting a tile; `tone("tap", k)` per counter arriving or leaving during a frame draw (pitch rises with the count — F-213); `tone("correct")`, `tone("nudge")`, `tone("finish")`. Silent under `?sound=off`.

## Testing checklist
- [ ] Works in all 11 languages (Question x of y, All done, Play again, Menu and praise change with the picker; the play screen is numerals and signs; no currency symbol anywhere).
- [ ] Works at narrow width (400-px iframe: stall, tag, customer, three tiles and, after a miss, the twenty-frame with its total all visible).
- [ ] Keyboard operable (Tab across the tiles; Enter taps).
- [ ] Never auto-starts.
- [ ] No losing state (wrong taps never end the session; the show-me ring always completes the item).
- [ ] No frame is shown before the first tap; after a wrong tap the tiles change places and the frame draws counter by counter with running numerals.
- [ ] Tapping 1 for 4 + 3 rings the "+" on the tag and shows 4 counters then 3 more arriving with 5, 6, 7 on them.
- [ ] Tapping 6 for 13 − 8 shows 13 counters with 8 turning hollow one by one, and the total "5" pulses.
- [ ] Additions and subtractions alternate: never more than two of the same sign in a row (except once after a re-queue).
- [ ] A missed fact returns after one item, then (if missed again) after three, then after seven; it is not re-queued a fourth time; it never comes back immediately.
- [ ] At the third level the facts cross ten and the second addend fills the first row to ten before spilling into the second row.
- [ ] Three first-try corrects in a row bring harder facts; two misses in a row bring easier facts.
- [ ] The finish screen lists the session's facts on tags with a filled dot for those retrieved unaided and a hollow dot for those that needed the frame; no score, no time.
- [ ] With `?sound=off` nothing is audible.
