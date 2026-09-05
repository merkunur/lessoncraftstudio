# 129 — Count to 100 Walk

## Identity
- Slug: `count-to-100-walk`
- Subject / topic: Mathematics / counting on from any number to 100 — the next five numbers, across the decade boundary
- Age band: `6-8`
- Interaction pattern: `P4` — tap in order (the five stepping stones are the rail; per-tap judgement)
- Estimated build size: ~470 lines

Shared contract: `catalogue/BUILD-CONVENTIONS.md`. Pattern contract: `catalogue/PATTERNS.md` P4 (per-tap; the rail = the stones the rabbit hops along). Content is language-neutral (numerals only; number WORDS are game 130); no `LOCALE_DATA`.

## Learning
- Objective: Continues counting from a given number between 12 and 95 by tapping the next five numerals in order, including across a decade (39 → 40, 69 → 70, 99 → 100), among near-numeral decoys.
- Prerequisites: Counts to 20 aloud; reads two-digit numerals well enough to find one on a tile. Has seen a hundred square (the hint draws two rows of it).
- Curriculum links: F-101 (counting — stable order, count-on instead of count-all; response: the count starts from a given number so counting from 1 is impossible), F-108 (place value — teens, "eleventeen", digits as independent numbers; the decade crossing is where "thirty-nine, thirty-ten" appears; response: tens shown as rows, empty tens as an empty row), F-21 ("counting and cardinality to 20 then 100; skip counting / number sequences" in all twelve systems), F-31 row "Count to 100; number line to 100" — conservative 7-8, earliest 5 → 6-8 (US K.CC.A.2 "count forward beginning from a given number" and 1.NBT.A.1 "count to 120, starting at any number"; England Y1 "count to and across 100, forwards … beginning with 0 or 1, or from any given number"; Germany Klasse 1-2 "Zahlenraum bis 100, Zählen in Schritten"; France CP "suite orale des nombres … jusqu'à 100"; Netherlands groep 3 "tellen tot 100 vanaf een willekeurig getal"; Spain 1º ciclo "series numéricas"; Brazil EF01MA01; Sweden åk 1 "talraden"; Finland grade 1 "lukujono"). Feedback is enacted (F-43); a wrong tap is refused, not punished (F-61); brute force cannot count as first-try (F-65).
- Common misconceptions (F-101, F-108, F-102), each with this game's response:
  1. **The decade crossing — after 39 the child says "thirty-ten" and, since no such tile exists, taps a same-tens decoy (34) or the wrong decade (30 / 50).** Response: the hundred-square strip (`ART.stripCell` × 20) appears under the stones: the row 31-40 with 39 filled and the 40 cell pulsing at the row's END, and the row 41-50 beneath it — the next number is the last cell of this row, and the one after that is the first cell of the next row. The strip stays for the rest of the item.
  2. **Digit reversal — 32 tapped after 23, 21 after 12 (F-102 order reversal; F-108 digits as independent numbers).** Response: the strip appears for the row 21-30 and the decoy tile's tens digit and the current stone's tens digit are underlined (`ART.tensMark`, accent) — same tens digit means same row; 32 has a different one and is not in this row.
  3. **Counting back or repeating (22 tapped after 23; 23 tapped again).** Response: the strip appears with `ART.walkArrow` along its top pointing right and the rabbit's stone pulsing — the walk goes one way; the already-used numeral is on a stone and has no tile to tap.
  4. **Skipping (25 tapped after 23).** Response: the strip appears with the 24 cell pulsing empty between the filled 23 and the tapped 25's cell outlined — the gap is shown.
  5. **Restarting from 1 or from the nearest ten (count-all, F-101).** Response: structural — the walk starts on the given numeral, the tile bank never holds 1 or the decade below the start, and the first stone is already stood on.

## How it plays
1. **Start screen**: title "Count to 100 Walk", the rabbit (`ART.rabbit`) at (360, 200), Start, picker (hidden under `?embed=1`).
2. **Item 1 (L1: start 23)**: rail of 10 dots (§6) at y = 28, `t("question_x_of_y")` in 18 px `THEME.colour.inkSoft` at (610, 28). Zone A: six stepping stones (`ART.stone`, 84 × 56) in a row at y = 150, x = 100 / 200 / 300 / 400 / 500 / 600 (each a `makeTile` so it is keyboard-reachable; the first is disabled); the first stone carries the start numeral (`ART.stoneNumeral` "23") and the rabbit stands on it (`ART.rabbit` at (100, 108), facing right); the other five are blank. Below the stones, hidden until needed, the hundred-square strip: two rows of ten `ART.stripCell`s (44 × 30, pitch 44) at y = 232 and y = 266, x from 162 to 558, alpha 0. Zone B: the tile bank — eight numeral tiles (`makeTile` 88 × 72 with `ART.numTile` tokens) in two rows of four at y = 340 and y = 430, x = 180 / 300 / 420 / 540, holding the five next numerals (24 25 26 27 28) and three decoys (32, 22, 30) in a shuffled layout. Caption `S("keepCounting")` ("Keep counting") at (360, 300), 22 px `THEME.colour.inkSoft`.
3. **Walking**: the child taps a tile.
   - **Correct (the next number)**: `ANIM.pop`, `tone("tap", k)` (k = 1…5, the pitch climbs along the walk), the tile glides (`ANIM.glide`) onto the next blank stone and becomes its numeral; the rabbit `ANIM.hop`s onto that stone (an arc: up 30 px, across 100 px, down); the tile's place in the bank empties. If the strip is showing, the number's cell fills (`ART.stripCellFull`). When the fifth stone is filled: `tone("correct")`, `GameCore.showPraise` with the next key in rotation, the rabbit `ANIM.hop`s once more in place, the rail dot fills; after 900 ms the next item builds (stones clear with `ANIM.rise`, the rabbit `ANIM.glide`s back to the first stone, new tiles `ANIM.appear`). First-try = five correct taps with no wrong tap.
   - **Wrong (any other tile)**: `ANIM.nudge`, `tone("nudge")`, the tile de-selects and stays where it is; then the **strip cue**: the strip `ANIM.appear`s (alpha 0.9) showing the decade row that contains the rabbit's current number (row r = the ten numbers ending in a multiple of 10: 21-30 for 23) with every number up to and including the current one filled (`ART.stripCellFull`) and the NEXT number's cell pulsing (`ANIM.pulse` on `ART.stripCellNext`), and the following decade row beneath it (31-40), empty; the misconception-specific extra plays (Rules); the strip stays visible until the item ends. Attempt 2 on this step. Tiles are `setEnabled(false)` for 1200 ms.
   - **Second wrong tap on the same step**: the cue again, then the correct tile gains `ART.hintRing` (`ANIM.showMe`); the item continues.
   - **Third wrong tap on the same step**: show-me — the correct tile pulses at full contrast until tapped; the item completes as solved-with-help (no praise pop; the rabbit still hops).
   - **Tapping the last filled stone**: undo — its numeral glides back to its bank slot and the rabbit hops back one stone (no penalty; not counted as a wrong tap). The first stone cannot be tapped.
4. **Items 2-10**: per Content/Rules. L1: no decade boundary inside the five (12 → 17; 23 → 28; 44 → 49; 63 → 68); L2: one boundary inside the five (37 → 42; 68 → 73; 26 → 31; 87 → 92; 55 → 60); L3: the boundary is the FIRST step, or the walk reaches 100 (49 → 54; 95 → 100; 79 → 84; 89 → 94; 69 → 74; 91 → 96).
5. **Finish**: `t("all_done")` (360, 110); the rabbit (360, 200) `ANIM.celebrate`; the summary = the ten walks as chips (`ART.walkChip`, 100 × 36) reading "23 – 28" in 18 px `THEME.font.display` `THEME.colour.ink`, two rows of five from y = 350 (x = 120 + (i mod 5) × 120, rows 50 px apart); optionally `t("question_x_of_y")` with n = first-try walks and total 10 at (360, 460), 20 px; `play_again` (250, 510), `menu` (470, 510); `tone("finish")`; `GameCore.reportHeight()`.

Session ≈ 5-6 minutes (10 items × 25-35 s).

## Art registry
```js
const ART = {
  rabbit:        { kind: "emoji", value: "🐇", size: 56 },
  stone:         { kind: "shape", shape: "ellipse", w: 84, h: 56, fill: "surface", stroke: "structure", strokeWidth: 3 },      // six in a row; blank ones use stroke "line" until filled
  stoneNumeral:  { kind: "text",  value: "", size: 28, font: "display", color: "ink" },                                       // the numeral on a filled stone
  numTile:       { kind: "shape", shape: "roundRect", w: 88, h: 72, fill: "surface", stroke: "line", strokeWidth: 2, radius: 12 },   // numeral 32 px display ink
  stripCell:     { kind: "shape", shape: "rect", w: 44, h: 30, fill: "surface2", stroke: "line", strokeWidth: 1 },              // numeral 14 px body inkSoft
  stripCellFull: { kind: "shape", shape: "rect", w: 44, h: 30, fill: "structureSoft", stroke: "structure", strokeWidth: 2 },    // counted numbers; numeral 14 px ink
  stripCellNext: { kind: "shape", shape: "rect", w: 44, h: 30, fill: "surface", stroke: "accent", strokeWidth: 3 },             // the next number's cell (pulses)
  walkArrow:     { kind: "text",  value: "→", size: 26, font: "display", color: "accent" },                                    // above the strip's current row, pointing along the count
  tensMark:      { kind: "shape", shape: "rect", w: 16, h: 4, fill: "accent" },                                                 // under the tens digit of the current stone numeral and of a reversed decoy tile
  hintRing:      { kind: "shape", shape: "roundRect", w: 100, h: 84, stroke: "structure", strokeWidth: 4, radius: 16 },
  walkChip:      { kind: "shape", shape: "roundRect", w: 100, h: 36, fill: "structureSoft", stroke: "structure", strokeWidth: 1, radius: 8 },
  dotEmpty:      { kind: "shape", shape: "circle", r: 8, stroke: "line", strokeWidth: 2 },
  dotFull:       { kind: "shape", shape: "circle", r: 8, fill: "structure" }
};
```
The strip's two rows are the hundred-square rows d+1 … d+10 and d+11 … d+20 where d is the multiple of 10 below the rabbit's current number (for 40 itself, the current row is 31-40). For the 95 → 100 walk the second row is 101-110 and is NOT drawn (the strip shows one row and the count ends at 100).

## Animation registry
```js
const ANIM = {
  pop:       { scale: 1.12, duration: 140, ease: "Back.Out", yoyo: true, trigger: "a correct tile" },
  nudge:     { x: "+=10", duration: 80, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "a wrong tile" },
  glide:     { duration: 260, ease: "Sine.InOut", trigger: "a tile to its stone / back to the bank on undo; the rabbit to the first stone between items (x,y set at call)" },
  hop:       { y: "-=30", duration: 160, ease: "Sine.Out", yoyo: true, trigger: "the rabbit rising while its x tweens 100 px to the next stone (two tweens started together); in place on the fifth stone" },
  pulse:     { scale: 1.1, duration: 350, ease: "Sine.InOut", yoyo: true, repeat: 2, trigger: "stripCellNext; the rabbit's stone in the count-back cue; the skipped cell" },
  appear:    { alpha: 0.9, scale: 1, duration: 200, ease: "Back.Out", trigger: "the strip (from alpha 0); new tiles at alpha 1 (from alpha 0, scale 0.6)" },
  rise:      { y: "-=30", alpha: 0, duration: 300, ease: "Sine.In", trigger: "stone numerals and the strip clearing between items" },
  showMe:    { alpha: 1, duration: 500, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "hintRing on the correct tile (from alpha 0.2; capped at 0.6 on the 2nd wrong tap, full on the 3rd)" },
  celebrate: { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "finish rabbit" }
};
```
No flashing: `showMe` at 1 Hz; `pulse` three cycles then stops.

## Screen layout
```
y   0 ┌──────────────────────────────────────────────────────────────┐
      │ [lang]           ○ ○ ○ ○ ○ ○ ○ ○ ○ ○  rail y=28   "3 of 10"    │  zone T
 56   ├──────────────────────────────────────────────────────────────┤
      │   rabbit (100,108)                                           │
      │  (23)   (  )   (  )   (  )   (  )   (  )   stones y=150      │  zone A
      │  x=100  200    300    400    500    600    (84×56)           │
      │  [21][22][23][24][25][26][27][28][29][30]  strip row 1 y=232 │
      │  [31][32][33][34][35][36][37][38][39][40]  strip row 2 y=266 │
260   ├──────────────────────────────────────────────────────────────┤
      │                 "Keep counting" (360,300)                    │
      │     [ 26 ]   [ 32 ]   [ 24 ]   [ 28 ]   tiles y=340 (88×72)  │  zone B
      │     [ 22 ]   [ 27 ]   [ 30 ]   [ 25 ]   tiles y=430          │
480   ├──────────────────────────────────────────────────────────────┤
      │                 (praise pop appears centred)                 │  zone C
560   └──────────────────────────────────────────────────────────────┘
```
Fixed layout, FIT scaling. The strip overlaps the bottom of zone A and is hidden (alpha 0) until a wrong tap.

## Visual specification
- Background `THEME.colour.bg`; rail per §6: 10 × `ART.dotEmpty` at y = 28 (x = 261 + i × 22) → `ART.dotFull`; `t("question_x_of_y")` at (610, 28).
- Stones: six `makeTile` 84 × 56 with `ART.stone` tokens at (100 + 100i, 150); blank stones use `THEME.colour.line` stroke, filled stones `THEME.colour.structure`; `ART.stoneNumeral` centred on each filled stone; the first stone `setEnabled(false)`. `ART.rabbit` at (stone x, 108).
- Strip: 20 × `ART.stripCell` at (162 + 44j, 232) and (162 + 44j, 266), numerals 14 px; `ART.stripCellFull` / `ART.stripCellNext` swapped in per cell; `ART.walkArrow` at (580, 232) beside row 1 during the count-back cue; `ART.tensMark` under a numeral's tens digit at (−8, 16) relative to the numeral centre.
- Tiles: `makeTile` 88 × 72 with `ART.numTile` tokens, numeral 32 px `THEME.font.display` `THEME.colour.ink`; `ART.hintRing` around the correct tile. Tap floors 88 × 72 ≥ 56; gaps 32 (x) / 18 (y).
- Caption `S("keepCounting")` at (360, 300), 22 px, one line. Text on the play screen: the caption, the progress label and numerals (≤ 8 words, F-42).
- Tab order: the five blank stones left to right (for undo), then the eight tiles row by row. Under `?embed=1` the picker is not created.

## Content
Language-neutral. Item = (start; the five next numerals; three decoys). The bank holds all eight, shuffled.

- **L1** (no decade boundary inside the walk):
  1. 12 · 13 14 15 16 17 · decoys 21, 11, 19
  2. 23 · 24 25 26 27 28 · decoys 32, 22, 30
  3. 44 · 45 46 47 48 49 · decoys 54, 43, 50
  4. 63 · 64 65 66 67 68 · decoys 36, 62, 70
- **L2** (one decade boundary inside the walk):
  5. 37 · 38 39 40 41 42 · decoys 30, 50, 34
  6. 68 · 69 70 71 72 73 · decoys 60, 80, 79
  7. 26 · 27 28 29 30 31 · decoys 20, 40, 92
  8. 87 · 88 89 90 91 92 · decoys 80, 98, 79
  9. 55 · 56 57 58 59 60 · decoys 50, 70, 65
- **L3** (the boundary is the first step, or the walk reaches 100):
  10. 49 · 50 51 52 53 54 · decoys 40, 60, 94
  11. 95 · 96 97 98 99 100 · decoys 90, 89, 59
  12. 79 · 80 81 82 83 84 · decoys 70, 90, 97
  13. 89 · 90 91 92 93 94 · decoys 80, 100, 98
  14. 69 · 70 71 72 73 74 · decoys 60, 80, 76
  15. 91 · 92 93 94 95 96 · decoys 19, 90, 100

Decoy design: each item carries a same-decade near miss or a reversal (34, 32, 43, 36, 79, 94, 97, 98, 19, 65, 76), the decade below or above (30/50, 60/80, 20/40, 80, 50/70, 40/60, 90, 70/90, 80/100, 60/80, 90/100), and where it fits a "next-next" number (30, 50, 70, 100) that tempts a skip. Play list of 10 per Rules: start at L1; within a level take items in a shuffled order without repeats; two consecutive items never share a decade (§13); tile layout shuffled per item, and the next correct tile is never in the slot the previous correct tile occupied.

Worked example: item 1 (23) taps 24 25 26 27 28 — first-try · item 2 (44) first-try → L2 · item 3 (37) taps 38, 39, then 30: the strip appears with 31-39 filled, 40 pulsing at the end of the row and 41-50 empty beneath; taps 40, 41, 42 (helped) → L1 · item 4 (12) first-try · item 5 (63) first-try → L2 · item 6 (68) taps 69, 70, 71, 72, 73 first-try · item 7 (26) first-try → L3 · item 8 (95) taps 96 97 98 99 100 first-try · item 9 (49) taps 40: the strip shows 41-49 filled and 50 pulsing; taps 50 … 54 (helped) → L2 · item 10 (55) first-try · Finish shows ten walk chips.

## Rules
- Item count: 10.
- Difficulty progression: 2 consecutive first-try walks → next level (cap L3).
- Adaptation: any wrong tap on a walk, or a non-first-try walk twice in a row → next item one level down (floor L1). The current walk is never abandoned.
- What happens on a correct answer: `ANIM.pop`, `tone("tap", k)`, the tile glides to the stone, the rabbit `ANIM.hop`s; on the fifth stone `tone("correct")`, praise rotation ["well_done", "great_job", "excellent", "you_did_it", "keep_going"], rail dot, next item after 900 ms.
- What happens on a wrong answer (per anticipated mistake):
  - Wrong decade at the boundary (30 or 50 after 39; 60 or 80 after 69): `ANIM.nudge`, `tone("nudge")`, the strip appears with the current row filled to the current number, the next cell pulsing at the row's end and the next row empty beneath.
  - Reversed digits (32 after 23, 94 after 49, 19 after 91): nudge, tone, the strip appears and `ART.tensMark` underlines the tens digit on the current stone and on the tapped tile.
  - Counting back or a number already used (22 after 23; 60 after 68): nudge, tone, the strip with `ART.walkArrow` pointing right and the rabbit's stone `ANIM.pulse`.
  - Skipping (26 after 24; 50 after 44): nudge, tone, the strip with the skipped cell pulsing empty and the tapped number's cell outlined (`ART.stripCellNext` tokens without the pulse).
  - Any other wrong tile: nudge, tone, the strip.
- Retry behaviour: attempt 1 unaided → attempt 2 after the strip → attempt 3 with `ART.hintRing` on the correct tile (low contrast on the 2nd wrong tap, full show-me on the 3rd); the ringed tile continues the walk; the walk completes as solved-with-help. No attempt 4. A walk with any wrong tap is not first-try; an undo is not a wrong tap.
- Finish condition: 10 walks. No losing state; no clock.

## Strings
- `GameCore.t()` keys: `t("start")`, `t("question_x_of_y")`, `t("all_done")`, `t("play_again")`, `t("menu")`, `t("well_done")`, `t("great_job")`, `t("excellent")`, `t("you_did_it")`, `t("keep_going")`.
- Game-specific (`STRINGS.en`, via `S(key)`): `title` = "Count to 100 Walk"; `keepCounting` = "Keep counting".

## Sound
`tone("tap", k)` on the k-th correct stone (pitch climbs along the walk, F-213); `tone("nudge")` on a wrong tile; `tone("correct")` when the fifth stone is filled; `tone("tap")` on an undo; `tone("finish")` once. Silent under `?sound=off`; no audio files. Nothing is spoken: the strip and the stones carry the meaning.

## Testing checklist
- [ ] Works in all 11 languages (Start, All done, Play again, Menu, the progress label, praise and the caption change with the picker; numerals are the same everywhere).
- [ ] Works at narrow width (400-px iframe: six stones, the rabbit, the strip and all eight tiles fully visible; tiles remain separate targets).
- [ ] Keyboard operable (Tab walks the stones then the tiles; Enter taps; Enter on the first stone does nothing).
- [ ] Never auto-starts.
- [ ] No losing state (ten wrong taps in a row still end with the walk completing via the ringed tile and the session reaching All done).
- [ ] Tapping the next number moves it onto the next stone and the rabbit hops onto it with a rising note.
- [ ] Tapping 30 after 39 shows two rows of the hundred square with 40 pulsing at the end of the top row; the strip stays until the walk ends.
- [ ] Tapping 32 after 23 underlines the tens digit on the stone and on the 32 tile.
- [ ] Tapping the last filled stone puts its numeral back in the bank and the rabbit hops back one stone.
- [ ] The walk from 95 reaches 100 and its strip shows a single row.
- [ ] Two clean walks in a row bring a walk that crosses a ten; a wrong tap brings a walk inside one ten.
- [ ] The first stone always shows the start number and cannot be tapped; 1 is never in the bank.
- [ ] The finish screen shows ten chips like "37 – 42" and, at most, "n of 10".
- [ ] With `?sound=off` nothing is audible.
