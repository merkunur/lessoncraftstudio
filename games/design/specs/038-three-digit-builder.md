# 038 — Three-Digit Builder

## Identity
- Slug: `three-digit-builder`
- Subject / topic: Mathematics / place value to 1000 — hundreds, tens and ones, including a zero place (305, 240)
- Age band: `8-9`
- Interaction pattern: `P6` — build on a grid (three place rows of nine cells; tap fills the next cell in that row)
- Estimated build size: ~480 lines

Shared contract: `catalogue/BUILD-CONVENTIONS.md`. Pattern contract: `catalogue/PATTERNS.md` P6 (fill conventions mirror base-ten blocks, F-48). Sibling games: 003 (the same next-cell fill and self-count on a ten-frame), 034 (tens-then-ones sketch).

## Learning
- Objective: Builds a given three-digit number from flats (100), rods (10) and cubes (1) on three place rows, leaving a place row empty when its digit is 0, and checks it against the readout.
- Prerequisites: Reads three-digit numerals; knows that ten ones make a ten and ten tens make a hundred; has built two-digit numbers from rods and cubes.
- Curriculum links: F-21 (place value tens/ones then hundreds), F-31 row "Numbers to 1000; +/− 3-digit" — conservative 8-9 → 8-9 (US 2.NBT.A.1 "understand that the three digits of a three-digit number represent amounts of hundreds, tens, and ones"; England Y3 "recognise the place value of each digit in a three-digit number"; Germany Klasse 3 "Zahlenraum bis 1000, Stellenwerttafel"; France CE2 "nombres jusqu'à 999, unités de numération"; Netherlands groep 5 "getallen tot 1000, HTE"; Spain 1º ciclo "hasta 999"; Brazil EF03MA02; Sweden åk 1-3 "positionssystemet"; Denmark 3. klasse; Finland grade 3).
- Common misconceptions (F-108, F-102), each with this game's response:
  1. **The zero placeholder ignored (305 built as 3 flats and 5 rods, or read as 35).** Response: on Check each row reads itself out at its right end (`ART.rowRead` "300", "0", "5") and the assembled number (the built digits in the `ART.readSlot`s) lines up under the target digit by digit with the tens slot showing "0"; the rods in the wrong row rise away one by one (`ANIM.rise`, descending tones) and the ones row's next five cells pulse (`ART.needCell`). The empty row is shown AS a row with a zero, never as nothing (F-108).
  2. **Digits as independent numbers (the 3 of 305 built as 3 cubes).** Response: the readout shows what was built ("3" … or "8" when both land in the ones row) under the target "305"; the rows that differ are enacted as in 1; the row labels (`ART.placeLabel` 100 / 10 / 1 with a block icon) stay fixed so the value of a row is always in view.
  3. **Ten (or more) in one place — trying to build 120 as 12 rods.** Response: a row has exactly nine cells; the tenth tap on a full row `ANIM.nudge`s the row and the next empty cell of the row ABOVE pulses with `ART.regroupHint` ("10 → 1" drawn as ten small squares and an arrow to one bigger block) for 1200 ms — ten of these is one of those, shown not told.
  4. **Reversal of the middle and last digits (510 built as 501, and the reverse).** Response: L3 includes both members of such pairs in one session; the readout comparison lines the built digits under the target so the swapped pair is visible; the differing rows are enacted.
  5. **Language interference (de/nl/da say the ones before the tens: "dreihundertfünfundzwanzig").** Response: no number words anywhere; the rows run hundreds → tens → ones top to bottom and the readout is digit-aligned, so the visual order is the same in every locale.

## How it plays
1. **Start screen**: title "Three-Digit Builder", the elephant (`ART.elephant`) at (360, 200), Start, picker.
2. **Item 1 (L1: 234)**: rail of 12 dots (§6) plus `t("question_x_of_y")` at (360, 48), 18 px `THEME.colour.inkSoft`. Zone A: the target numeral (`ART.targetNum`, 72 px) "234" at (360, 110); the elephant at (110, 150); the readout row (`ART.readSlot` × 3, 48 × 56 each, at x = 312 / 360 / 408, y = 190) empty. Zone B: three place rows at y = 300 (hundreds), 370 (tens), 440 (ones): each row has `ART.placeLabel` at x = 70 ("100" over a small `ART.flatIcon`; "10" over `ART.rodIcon`; "1" over `ART.cubeIcon`) and nine cells (`ART.cell`, 56 × 56, pitch 60, x = 150 + 60 k); at each row's right end (x = 690) a hidden `ART.rowRead`. Zone C: Check (`makeButton ok`) at (360, 510), disabled until at least one block is placed.
3. **Building**: tap any cell in a row — the row's NEXT empty cell (from the left) fills with that row's block: `ART.flat` (a 40 × 40 square with `ART.flatGrid` lines), `ART.rod` (12 × 40 bar) or `ART.cube` (14 × 14 square), `ANIM.appear`, `tone("tap", k)` (k = the row's count). Tap a filled cell — the row's LAST block leaves (`ANIM.rise`, undo). A tenth tap on a full row triggers the regroup hint (Learning 3). Check enables at the first block.
4. **Check**: tap OK. Each row counts itself (badges `ART.countBadge` 1 … n on its blocks, 120 ms apart, `tone("tap", k)`), then its `ART.rowRead` appears ("200", "30", "4"; an empty row shows "0" with `ANIM.pop`), then the built digits land in the `ART.readSlot`s under the target (`ANIM.appear`).
   - **Match**: the readout slots `ANIM.pop` together, `tone("correct")`, praise pop, the elephant `ANIM.trumpet`; rail dot fills; after 800 ms the rows clear (`ANIM.rise` on all blocks) and the next target appears.
   - **Mismatch**: `tone("nudge")`; for each row that differs: too many → the extra blocks rise away one by one with descending tones and the row is left holding the correct count; too few → `ART.needCell` outlines pulse on the next cells needed. The readout slot of every differing digit shows `ART.slotMark` (a small hollow ring under it). The item is NOT complete: the target `ANIM.pulse`s and the child must fill the pulsing cells and tap OK again. Attempt 2. Check disables until the grid changes.
   - **Second mismatch**: show-me — the rows fill themselves (blocks appear in order with tones, rows top to bottom) and OK gains the show-me ring (`ART.showRing`, `ANIM.showMe`); tapping OK completes the item as solved-with-help (no praise pop).
5. **Items 2-12**: per Content/Rules. L1 no zero digits; L2 a zero in the tens or the ones; L3 zeros, large digits and swapped pairs (510 and 501 in one session).
6. **Finish**: `t("all_done")` (360, 110); the elephant (360, 200) `ANIM.celebrate`; the summary = the twelve numbers as chips (`ART.numChip`, 100 × 36, 20 px) in three rows of four from y = 320, first-try items with `ART.dotFull` at their left and helped ones with `ART.dotEmpty`; `play_again` (250, 510), `menu` (470, 510); `tone("finish")`.

Session ≈ 6-7 minutes.

## Art registry
```js
const ART = {
  elephant:    { kind: "emoji", value: "🐘", size: 80 },
  targetNum:   { kind: "text",  value: "", size: 72, font: "display", color: "structure" },
  readSlot:    { kind: "shape", shape: "roundRect", w: 48, h: 56, fill: "surface2", stroke: "line", strokeWidth: 2, radius: 8 },   // built digit 36 px display ink
  slotMark:    { kind: "shape", shape: "circle", r: 6, stroke: "accent", strokeWidth: 2 },        // under a differing readout slot
  placeLabel:  { kind: "text",  value: "", size: 20, font: "display", color: "inkSoft" },         // "100" / "10" / "1"
  flatIcon:    { kind: "shape", shape: "rect", w: 20, h: 20, fill: "structure" },
  rodIcon:     { kind: "shape", shape: "rect", w: 6, h: 20, fill: "structure" },
  cubeIcon:    { kind: "shape", shape: "rect", w: 8, h: 8, fill: "structure" },
  cell:        { kind: "shape", shape: "roundRect", w: 56, h: 56, fill: "surface", stroke: "line", strokeWidth: 2, radius: 8 },
  flat:        { kind: "shape", shape: "rect", w: 40, h: 40, fill: "structure", stroke: "bg", strokeWidth: 2 },
  flatGrid:    { kind: "shape", shape: "line", w: 40, stroke: "bg", strokeWidth: 1 },            // 3 horizontal + 3 vertical lines at 10-px spacing inside a flat
  rod:         { kind: "shape", shape: "rect", w: 12, h: 40, fill: "structure", stroke: "bg", strokeWidth: 1 },
  cube:        { kind: "shape", shape: "rect", w: 14, h: 14, fill: "structure", stroke: "bg", strokeWidth: 1 },
  needCell:    { kind: "shape", shape: "roundRect", w: 60, h: 60, stroke: "accent", strokeWidth: 3, radius: 10 },
  countBadge:  { kind: "shape", shape: "circle", r: 10, fill: "bg" },          // numeral 12 px structure, on a block during the self-count
  rowRead:     { kind: "text",  value: "", size: 22, font: "display", color: "structure" },
  regroupHint: { kind: "shape", shape: "roundRect", w: 120, h: 40, fill: "surface", stroke: "accent", strokeWidth: 2, radius: 8 },   // holds ten 6×6 accent squares, a 16-px arrow line and one 14×14 structure square
  showRing:    { kind: "shape", shape: "roundRect", w: 232, h: 84, stroke: "structure", strokeWidth: 4, radius: 22 },
  numChip:     { kind: "shape", shape: "roundRect", w: 100, h: 36, fill: "structureSoft", stroke: "structure", strokeWidth: 1, radius: 8 },
  dotEmpty:    { kind: "shape", shape: "circle", r: 8, stroke: "line", strokeWidth: 2 },
  dotFull:     { kind: "shape", shape: "circle", r: 8, fill: "structure" }
};
```

## Animation registry
```js
const ANIM = {
  appear:    { alpha: 1, scale: 1, duration: 160, ease: "Back.Out", trigger: "a block placed; readout digits; a new target (from alpha 0, scale 0.6)" },
  rise:      { y: "-=30", alpha: 0, duration: 260, ease: "Sine.In", trigger: "a block removed (undo, too-many correction, row clear)" },
  nudge:     { x: "+=10", duration: 80, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "tenth tap on a full row (whole row container)" },
  hintIn:    { alpha: 1, y: "-=8", duration: 200, ease: "Sine.Out", yoyo: true, hold: 800, trigger: "regroupHint over the row above (from alpha 0), then fades" },
  pulse:     { scale: 1.1, duration: 300, ease: "Sine.InOut", yoyo: true, repeat: 2, trigger: "needCell outlines; the target after a mismatch; the row-above next cell with the regroup hint" },
  pop:       { scale: 1.15, duration: 160, ease: "Back.Out", yoyo: true, trigger: "an empty row's '0' readout; readout slots on a match" },
  trumpet:   { angle: -10, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "elephant on a match" },
  showMe:    { alpha: 1, duration: 500, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "ring around the Check button (from alpha 0.2)" },
  celebrate: { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "finish elephant" }
};
```

## Screen layout
```
y   0 ┌──────────────────────────────────────────────────────────────┐
      │ [lang]     ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ rail y=28; "3 of 12" y=48   │  zone T
 56   ├──────────────────────────────────────────────────────────────┤
      │ elephant(110,150)          "234"  (360,110)                   │  zone A
      │                           [ ][ ][ ]  readout slots y=190       │
260   ├──────────────────────────────────────────────────────────────┤
      │ 100 ■ │[■][■][ ][ ][ ][ ][ ][ ][ ]│ "200"   hundreds y=300      │
      │  10 ▏ │[▮][▮][▮][ ][ ][ ][ ][ ][ ]│ "30"    tens y=370          │  zone B
      │   1 · │[·][·][·][·][ ][ ][ ][ ][ ]│ "4"     ones y=440          │
      │   labels x=70;  cells x = 150 + 60k (56×56);  rowRead x=690   │
480   ├──────────────────────────────────────────────────────────────┤
      │                    [   OK   ] (360,510)                       │  zone C
560   └──────────────────────────────────────────────────────────────┘
```
Fixed layout, FIT scaling. Rows never reorder: hundreds on top.

## Visual specification
- Background `THEME.colour.bg`; rail per §6: 12 × `ART.dotEmpty` (x = 239 + i × 22) → `ART.dotFull`; `t("question_x_of_y")` at (360, 48).
- `ART.elephant` at (110, 150); `ART.targetNum` at (360, 110); `ART.readSlot`s at (312, 190), (360, 190), (408, 190) with the built digits 36 px `THEME.font.display` `THEME.colour.ink`; `ART.slotMark` 34 px below a differing slot.
- Rows: `ART.placeLabel` at (70, row y − 10) with `ART.flatIcon` / `ART.rodIcon` / `ART.cubeIcon` beneath it at (70, row y + 16); 27 × `makeTile` 56 × 56 with `ART.cell` tokens; a filled cell draws its block centred (`ART.flat` with 6 `ART.flatGrid` lines, `ART.rod`, or `ART.cube`); `ART.needCell` over cells; `ART.countBadge` on blocks during a self-count; `ART.rowRead` at (690, row y); `ART.regroupHint` centred over the row above's next empty cell.
- Check: `makeButton` `ok` at (360, 510), alpha 0.5 while disabled; `ART.showRing` around it.
- Keyboard: arrows move between cells row-major, Enter fills / undoes in that row; Tab reaches OK.
- Tap floors: cells 56 (8-9 floor) at 4-px gaps — acceptable because any cell in a row fills the row's next cell, so a mis-tap within a row is harmless; a mis-tap into the neighbouring row fills the wrong place, and undo is one tap.

## Content
Language-neutral (numerals only; no number words, per F-108). Targets:
- **L1** (no zero digit; digits ≤ 5): 234 · 152 · 341 · 425 · 213 · 513 · 324 · 142 · 351 · 235 · 415 · 123
- **L2** (one zero in the tens or the ones): 305 · 240 · 407 · 130 · 603 · 520 · 208 · 350 · 106 · 470 · 502 · 610
- **L3** (zeros, large digits, and swapped pairs in one session): 510 · 501 · 709 · 790 · 860 · 806 · 900 · 100 · 409 · 940 · 678 · 386

Play list of 12 per Rules; shuffled within level except that at L3 a swapped pair (510/501, 709/790, 860/806) is kept within three items of each other; no repeats.

## Rules
- Item count: 12.
- Difficulty progression: 2 consecutive first-Check matches → next level (cap L3).
- Adaptation: a mismatched Check, or mismatched first-Check on 2 consecutive items → next item one level down (floor L1).
- What happens on a correct answer: self-count with badges and tones, row readouts, readout digits land and pop, `tone("correct")`, praise rotation ["well_done", "great_job", "excellent", "you_did_it", "keep_going"], elephant `ANIM.trumpet`, rail dot, rows clear, next target after 800 ms.
- What happens on a wrong answer:
  - Zero place filled / digit in the wrong row (305 as 3 flats + 5 rods): the rods rise away with descending tones, the tens readout shows "0" and pops, five `ART.needCell`s pulse in the ones row; `tone("nudge")`; target pulses; Check disabled until the grid changes.
  - Too few in a row: `ART.needCell`s pulse on the next cells needed.
  - Too many in a row: the extra blocks rise away; the row is left at the correct count but the item stays open until the child checks again.
  - A tenth block attempted in a row: refused with `ANIM.nudge` and the regroup hint over the row above (`ANIM.hintIn`); not an attempt.
- Retry behaviour: attempt 1 → attempt 2 after the enacted correction → attempt 3 the rows fill themselves and OK carries the show-me ring; solved-with-help. No attempt 4.
- Finish condition: 12 items. No losing state, no clock.

## Strings
- `GameCore.t()` keys: `t("start")`, `t("ok")`, `t("question_x_of_y")`, `t("all_done")`, `t("play_again")`, `t("menu")`, `t("well_done")`, `t("great_job")`, `t("excellent")`, `t("you_did_it")`, `t("keep_going")`.
- Game-specific: `title` = "Three-Digit Builder". The play screen shows only numerals.

## Sound
`tone("tap", k)` on each block placed or removed (k = that row's count, so undo sounds lower); `tone("tap", k)` per block during a self-count; `tone("correct")`, `tone("nudge")`, `tone("finish")`. Silent under `?sound=off`.

## Testing checklist
- [ ] Works in all 11 languages (OK, "Question 3 of 12", All done, Play again, Menu, praise change; the play screen is numerals).
- [ ] Works at narrow width (400-px iframe: the target, the readout slots, all 27 cells with their labels, and OK visible).
- [ ] Keyboard operable (arrows move between cells, Enter fills / undoes; Tab reaches OK; Enter checks).
- [ ] Never auto-starts.
- [ ] No losing state (mismatched Checks never end the session; the rows fill themselves and OK completes the item).
- [ ] Tapping any cell in the tens row adds a rod in the row's next empty cell from the left; tapping a filled cell removes that row's last block.
- [ ] A row never holds more than nine blocks; the tenth tap wiggles the row and shows the "ten → one" hint over the row above.
- [ ] OK is dimmed until at least one block is placed.
- [ ] Checking 305 built as 3 flats and 5 rods makes the rods float away, shows "0" for the tens row, and pulses five cells in the ones row; the item stays open until OK is tapped again.
- [ ] Checking 305 built as 3 flats, an empty tens row and 5 cubes reads out 300, 0, 5, lands "3 0 5" under the target and completes the item.
- [ ] At the third level 510 and 501 both appear within a few items of each other.
- [ ] Two first-Check matches in a row bring numbers with zeros; a mismatch brings numbers without zeros next.
- [ ] The finish screen lists the twelve numbers with filled or hollow dots and no score.
- [ ] With `?sound=off` nothing is audible.
