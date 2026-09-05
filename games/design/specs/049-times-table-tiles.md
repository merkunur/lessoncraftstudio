# 049 — Times-Table Tiles

## Identity
- Slug: `times-table-tiles`
- Subject / topic: Mathematics / retrieval of the 2, 5 and 10 times tables (products to 10 × 10) from a choice of three
- Age band: `8-9`
- Interaction pattern: `P1` — tap one of N (three product tiles; the array is the enacted hint)
- Estimated build size: ~460 lines

Shared contract: `catalogue/BUILD-CONVENTIONS.md`. Pattern contract: `catalogue/PATTERNS.md` P1 (brute-force guard: after a wrong tap the tiles re-shuffle and the item never counts as first-try).

## Learning
- Objective: Retrieves the product of a fact from the 2, 5 or 10 times table (a × b, a ∈ {2, 5, 10}, b ≤ 10) by tapping it among three product tiles, and repairs a miss by reading the array.
- Prerequisites: Understands multiplication as rows of equal groups (games 047/048); skip counts in 2s, 5s and 10s; reads numerals to 100.
- Curriculum links: F-2 (times tables are the strongest popularity signal on the web), F-26 (tables retrieval is an 8-9 objective everywhere; EN 2/5/10 first, NL 1-5 and 10, DE core facts 1, 2, 5, 10, FI 1-5 and 10, BR 2-5 and 10), F-110, F-41 (expanding re-queue of misses within a session), F-31 row "Tables to 10 retrieval" → 8-9 (US 3.OA.C.7 "fluently multiply within 100"; England Y2 tables 2, 5, 10 recalled, Y3-4 all; Germany Klasse 2-3 "Kernaufgaben des Einmaleins"; France CE1-CE2; Netherlands groep 4-5 "tafels van 2, 5, 10"; Italy classe seconda-terza; Brazil 2º-3º ano; Spain 2º-3º; Finland grade 2-3).
- Common misconceptions (F-110, F-109, F-102), each with this game's response:
  1. **Skip-count drift / near-fact error (5 × 7 = 30 or 40).** Response: the wrong tile nudges, the tiles re-shuffle, and the array for the fact draws itself in zone A (`ART.gridBack` + `ART.dot`s, 5 rows of 7) with the rows lighting one by one and `ART.rowTotal`s (5, 10, 15 … 35, `tone("tap", k)`): a child who picked 30 sees 30 land on row 6 with one row still to come (the last row `ANIM.pulse`s); a child who picked 40 sees a dashed `ART.ghostRow` draw under the array and fade — 40 would need a row that is not there.
  2. **Adding instead of multiplying (5 × 7 = 12).** Response: the array draws, and beneath the fact a single strip of 12 dots (`ART.addStrip`) draws at the same time so the two quantities sit side by side; the strip fades after 1200 ms. The child re-chooses with the array visible.
  3. **Commutativity not used (knows 2 × 7 but not 7 × 2 when the fact is written the other way).** Response: after any reveal a turn tile (`ART.turnTile` with `ART.turnGlyph`) appears; tapping it rotates the array (`ANIM.turn`) and re-plays the row totals in the other order (7, 14 for 2 rows of 7 → 2, 4, 6 … 14 for 7 rows of 2). L3 writes some facts with the multiplier first (7 × 5).
  4. **Digit-order slips (35 read as 53) and "5s always end in 5".** Response: L3 offers the digit-swap product as a distractor; the reveal's row totals (5, 10, … 35) show the number being built, and the last total pulses; nothing is said about digits — the array is the argument.
  5. **× 0 and × 1 treated as special or impossible (F-110 "always makes bigger").** Response: L3 includes 5 × 0, 2 × 0, 10 × 1 and 5 × 1 with distractors 5, 2, 11 and 6; the reveal shows an empty grid (total 0) or a single row.
  6. **Speed anxiety around tables (F-45).** Response: no clock; a tap is never final until the tile pops — there is no "commit" button, but tiles re-enable after a miss so a second look costs nothing but first-try status.

## How it plays
1. **Start screen**: title "Times-Table Tiles", the rabbit (`ART.rabbit`) at (360, 200), Start, picker.
2. **Item 1 (L1: 2 × 3)**: rail of 12 dots (§6) at y = 28; `t("question_x_of_y")` at (360, 48), 18 px `THEME.colour.inkSoft`. Zone A: the fact (`ART.factText`, 48 px) "2 × 3" at (360, 100); the rabbit at (70, 200); the array area at (360, 200) is EMPTY (the array appears only as a hint). Zone B: three product tiles (`ART.numeralTile`, 96 × 96) at y = 380, x = 240 / 360 / 480, showing 6, 4, 8 in a shuffled order. Zone C: empty (no Check — P1).
3. **Answering**: the child taps a tile.
   - **Correct**: `ANIM.pop`, `tone("correct")`, praise pop (rotation); the fact completes (`ART.factText` "2 × 3 = 6"); the rabbit `ANIM.hop`; rail dot fills; the other tiles disable; next item after 700 ms. First-try.
   - **Wrong (a × (b − 1), e.g. 4)**: `ANIM.nudge`, `tone("nudge")`, the tile de-selects; the three tiles re-shuffle positions (`ANIM.glide`, the brute-force guard) and stay enabled; the array draws in zone A: `ART.gridBack` `ANIM.appear`s, then each row's dots light (`ANIM.rowOn`, 300 ms apart) with `ART.rowTotal` at the row's right (2, 4, 6) and `tone("tap", k)`; the last row and its total `ANIM.pulse`; `ART.turnTile` appears at (600, 200). Tiles disabled during the draw (≈ 1.5 s). Attempt 2 with the array visible.
   - **Wrong (a × (b + 1), e.g. 8)**: the array draws as above, then `ART.ghostRow` with hollow `ART.ghostDot`s draws under it (`ANIM.ghostIn`) and fades. Attempt 2.
   - **Wrong (a + b, L2/L3)**: the array draws and `ART.addStrip` (a + b dots in one row, pitch 14) draws under the fact at (360, 140), fades after 1200 ms. Attempt 2.
   - **Wrong (any other, incl. the digit swap)**: the array draws; the last total pulses. Attempt 2.
   - **Attempt 2 correct**: `tone("correct")`, the fact completes, rail dot; no praise pop; solved-with-help (the array was visible).
   - **Attempt 2 wrong**: the array re-counts its rows, then the correct tile gains `ART.showRing` (`ANIM.showMe`); tapping it completes the item as solved-with-help.
   - **Turn tile**: optional; tapping it rotates the array container 90° and re-plays the totals in the other order with `ART.factText` showing the swapped fact ("3 × 2 = 6" after solving); it never changes the item's state.
4. **Re-queue (F-41)**: a fact missed on its first tap re-enters after 1 intervening item (fresh distractors and positions); if missed again, after 3 intervening items; a third miss is not re-queued (its "last look" is done). Re-queued repeats replace the last unplayed items of the same level; the item count stays 12.
5. **Items 2-12**: per Content/Rules. L1 = 2s and 10s to × 5 with 5s to × 5; L2 = all three tables to × 10, interleaved, with additive distractors; L3 = the hard multipliers (× 6 … × 9), × 0 and × 1, multiplier-first facts and digit-swap distractors.
6. **Finish**: `t("all_done")` (360, 110); the rabbit (360, 200) `ANIM.celebrate`; the summary = the twelve facts as `ART.factChip`s (120 × 36, "5 × 7 = 35" in 18 px) in three rows of four (y = 320, 366, 412; x = 210 + i × 100), with a filled `ART.dotFull` at the left for first-try facts and a hollow `ART.dotEmpty` for helped ones — a record of what was retrieved unaided, not a score; `play_again` (250, 510), `menu` (470, 510); `tone("finish")`.

Session ≈ 6 minutes.

## Art registry
```js
const ART = {
  rabbit:      { kind: "emoji", value: "🐇", size: 64 },
  factText:    { kind: "text",  value: "", size: 48, font: "display", color: "structure" },
  gridBack:    { kind: "shape", shape: "roundRect", w: 372, h: 150, fill: "surface", stroke: "line", strokeWidth: 2, radius: 14 },
  dot:         { kind: "shape", shape: "circle", r: 12, fill: "structureSoft", stroke: "structure", strokeWidth: 2 },   // lit = fill structure; r scales with pitch
  ghostRow:    { kind: "shape", shape: "roundRect", w: 340, h: 30, stroke: "accent", strokeWidth: 2, radius: 8 },       // dashed [6,6]; holds ghostDots
  ghostDot:    { kind: "shape", shape: "circle", r: 12, stroke: "accent", strokeWidth: 2 },
  rowTotal:    { kind: "text",  value: "", size: 20, font: "display", color: "structure" },
  addStrip:    { kind: "shape", shape: "circle", r: 6, fill: "accent" },        // a + b of these in one row, pitch 14, centred at (360, 140)
  numeralTile: { kind: "shape", shape: "roundRect", w: 96, h: 96, fill: "surface", stroke: "line", strokeWidth: 2, radius: 12 },   // product 40 px display ink
  turnTile:    { kind: "shape", shape: "roundRect", w: 64, h: 64, fill: "surface", stroke: "structure", strokeWidth: 2, radius: 12 },
  turnGlyph:   { kind: "text",  value: "↻", size: 36, font: "display", color: "structure" },
  showRing:    { kind: "shape", shape: "roundRect", w: 108, h: 108, stroke: "structure", strokeWidth: 4, radius: 16 },
  factChip:    { kind: "shape", shape: "roundRect", w: 120, h: 36, fill: "structureSoft", stroke: "structure", strokeWidth: 1, radius: 8 },
  dotEmpty:    { kind: "shape", shape: "circle", r: 8, stroke: "line", strokeWidth: 2 },
  dotFull:     { kind: "shape", shape: "circle", r: 8, fill: "structure" }
};
```
Array sizing (as in game 010): rows = the first factor, columns = the second; cell pitch = min(34, 150 / rows) so a 10-row array fits the 150-px back (pitch 15, dot r = pitch × 0.35); columns at pitch 34 never exceed 340 px.

## Animation registry
```js
const ANIM = {
  pop:       { scale: 1.12, duration: 140, ease: "Back.Out", yoyo: true, trigger: "correct tile" },
  nudge:     { x: "+=10", duration: 80, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "wrong tile" },
  glide:     { duration: 260, ease: "Sine.InOut", trigger: "tiles re-shuffling after a wrong tap (x set at call)" },
  appear:    { alpha: 1, scale: 1, duration: 200, ease: "Back.Out", trigger: "gridBack, turn tile, new item (from alpha 0, scale 0.6)" },
  rowOn:     { alpha: 1, duration: 200, ease: "Sine.Out", trigger: "each row's dots switch to the lit fill, 300 ms apart" },
  pulse:     { scale: 1.15, duration: 300, ease: "Sine.InOut", yoyo: true, repeat: 2, trigger: "last row + its total after a wrong tap" },
  ghostIn:   { alpha: 1, duration: 300, ease: "Sine.Out", yoyo: true, hold: 900, trigger: "ghost row for an a × (b + 1) pick (from alpha 0), then fades" },
  stripIn:   { alpha: 1, duration: 300, ease: "Sine.Out", yoyo: true, hold: 1200, trigger: "addStrip for an a + b pick (from alpha 0), then fades" },
  turn:      { angle: 90, duration: 500, ease: "Sine.InOut", trigger: "array container on the turn tile; totals re-play after" },
  hop:       { y: "-=20", duration: 150, ease: "Sine.Out", yoyo: true, trigger: "rabbit on a correct tap" },
  showMe:    { alpha: 1, duration: 500, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "showRing on the correct tile (from alpha 0.2)" },
  celebrate: { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "finish rabbit" }
};
```

## Screen layout
```
y   0 ┌──────────────────────────────────────────────────────────────┐
      │ [lang]     ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○  rail y=28; "3 of 12" y=48  │  zone T
 56   ├──────────────────────────────────────────────────────────────┤
      │                      5 × 7   (360,100)                        │
      │ (rabbit)        · · · · · · · · · · · ·  addStrip (360,140)   │  zone A
      │ (70,200)   ┌───────────────────────────┐                      │
      │            │  array (hint only)        │  ↻ (600,200)         │
      │            │  (360,200)  372×150       │  after a reveal      │
      │            └───────────────────────────┘                      │
260   ├──────────────────────────────────────────────────────────────┤
      │        [ 30 ]       [ 35 ]       [ 40 ]   tiles y=380         │  zone B
      │        x=240        x=360        x=480    (96×96)             │
480   ├──────────────────────────────────────────────────────────────┤
      │                                                              │  zone C
560   └──────────────────────────────────────────────────────────────┘
```
Fixed layout, FIT scaling. `ART.rowTotal`s sit at x = 560 beside their rows; the ghost row sits directly under the last row.

## Visual specification
- Background `THEME.colour.bg`; rail per §6: 12 × `ART.dotEmpty` (x = 239 + i × 22) → `ART.dotFull`; `t("question_x_of_y")` at (360, 48).
- `ART.factText` at (360, 100); `ART.rabbit` at (70, 200).
- Array (hint only): `ART.gridBack` centred (360, 200); dots on the pitch rule above, centred; `ART.rowTotal` at (560, row y); `ART.ghostRow` + `ART.ghostDot`s under the last row; `ART.addStrip` dots centred at (360, 140).
- Tiles: `makeTile` 96 × 96 with `ART.numeralTile` tokens, product 40 px `THEME.font.display` `THEME.colour.ink`. `ART.turnTile` = `makeTile` 64 × 64 with `ART.turnGlyph`, at (600, 200), visible only after a reveal. `ART.showRing` behind the correct tile.
- Tap floors 96 / 64 ≥ 56; gaps 24.
- Keyboard: Tab across the three tiles then the turn tile (when present); Enter taps.

## Content
Language-neutral. Items as (fact; distractor 1, distractor 2). The first factor is the number of rows in the array.
- **L1** (2s, 5s and 10s to × 5; distractors a × (b − 1) and a × (b + 1)): (2 × 3; 4, 8) · (2 × 5; 8, 12) · (10 × 2; 10, 30) · (10 × 4; 30, 50) · (2 × 4; 6, 10) · (5 × 2; 5, 15) · (5 × 4; 15, 25) · (10 × 5; 40, 60) · (2 × 2; 2, 6) · (5 × 5; 20, 30) · (10 × 3; 20, 40) · (2 × 1; 4, 3)
- **L2** (all three tables to × 10, interleaved; one distractor may be a + b): (5 × 6; 25, 11) · (2 × 7; 12, 16) · (10 × 7; 60, 17) · (5 × 8; 35, 45) · (2 × 9; 16, 11) · (10 × 9; 80, 100) · (5 × 7; 30, 40) · (2 × 8; 14, 10) · (10 × 6; 50, 16) · (5 × 9; 40, 50) · (2 × 6; 10, 14) · (10 × 8; 70, 90)
- **L3** (hard multipliers, × 0 and × 1, multiplier-first facts, digit swaps): (5 × 7; 53, 30) · (10 × 10; 90, 20) · (5 × 0; 5, 50) · (2 × 0; 2, 20) · (10 × 1; 11, 1) · (5 × 1; 6, 15) · (7 × 5; 12, 30) · (9 × 2; 11, 16) · (5 × 6; 11, 35) · (10 × 9; 19, 80) · (5 × 8; 13, 45) · (8 × 10; 18, 70) · (5 × 3; 8, 20) · (2 × 8; 61, 14)

Play list of 12 per Rules with expanding re-queue; shuffle within level, levels in order; tile positions shuffled per item and re-shuffled after every wrong tap; the correct tile's slot never repeats twice running; two consecutive items never come from the same table when the level pool allows it.

## Rules
- Item count: 12 (re-queued repeats replace unplayed items).
- Difficulty progression: 3 consecutive first-try correct → next level (cap L3).
- Adaptation: a wrong first tap on 2 consecutive items → next item one level down (floor L1). A single miss re-queues the fact without changing the level.
- What happens on a correct answer: `ANIM.pop`, `tone("correct")`, praise rotation ["well_done", "great_job", "excellent", "you_did_it", "keep_going"] (first-try items only), the fact completes, rabbit `ANIM.hop`, rail dot, next item after 700 ms.
- What happens on a wrong answer (each begins with `ANIM.nudge` + `tone("nudge")`, the tiles re-shuffle, and the array draws with row totals):
  - a × (b − 1) (stopped a row short): the last row and its total pulse.
  - a × (b + 1) (one row too many): the dashed ghost row draws under the array and fades.
  - a + b (added instead): the add strip of a + b dots draws under the fact beside the array and fades.
  - Digit swap or any other product: the last total pulses.
  - After the reveal the turn tile is offered; using it never counts as an attempt.
- Retry behaviour: attempt 1 (retrieval) → attempt 2 with the array visible → attempt 3 = the show-me ring on the correct tile; solved-with-help; the fact re-queues after 1 item, then after 3, then no more. No attempt 4.
- Finish condition: 12 items. No losing state; no clock (F-45).

## Strings
- `GameCore.t()` keys: `t("start")`, `t("question_x_of_y")`, `t("all_done")`, `t("play_again")`, `t("menu")`, `t("well_done")`, `t("great_job")`, `t("excellent")`, `t("you_did_it")`, `t("keep_going")`.
- Game-specific: `title` = "Times-Table Tiles". Facts are numerals and symbols only.

## Sound
`tone("tap")` on selecting a tile; `tone("tap", k)` per row lit during a reveal (pitch rises row by row — F-213); `tone("correct")`, `tone("nudge")`, `tone("finish")`. Silent under `?sound=off`.

## Testing checklist
- [ ] Works in all 11 languages (Question x of y, All done, Play again, Menu and praise change with the picker; the play screen is numerals).
- [ ] Works at narrow width (400-px iframe: the fact, three tiles and, after a miss, the array with its totals all visible; a 10-row array fits the array box).
- [ ] Keyboard operable (Tab across the tiles and the turn tile; Enter taps).
- [ ] Never auto-starts.
- [ ] No losing state (wrong taps never end the session; the show-me ring always completes the item).
- [ ] No array is shown before the first tap; after a wrong tap the tiles change places and the array draws row by row with running totals.
- [ ] Tapping 30 for 5 × 7 makes the seventh row and "35" pulse; tapping 40 draws a dashed extra row that fades.
- [ ] Tapping 12 for 5 × 7 draws a strip of twelve coral dots under the fact beside the 35-dot array, then the strip fades.
- [ ] Tapping the turn tile after a reveal rotates the array and re-plays the totals in the other order.
- [ ] A missed fact returns after one item and, if missed again, after three more; it is not re-queued a third time.
- [ ] "5 × 0" and "2 × 0" are answered by 0 and reveal an empty grid; "10 × 1" reveals one row.
- [ ] At level 3 some facts are written multiplier-first (7 × 5) and a digit-swap tile (53) can appear.
- [ ] Three first-try corrects in a row bring the harder multipliers; two misses in a row bring easier facts.
- [ ] The finish screen lists the twelve facts with a filled dot for unaided ones and a hollow dot for helped ones; no score, no time.
- [ ] With `?sound=off` nothing is audible.
