# New 251 — The Chart Patches: a piece cut out of the hundreds chart only sinks back where its numbers agree (1.NBT.C.5)

## 0. Identity
- **id** `chart-patches.play.1-nbt-c-5` · grade 1 · CCSS 1.NBT.C.5 (+ 1.NBT.A.1 chart reading, 2.NBT.B.8 chart moves) · strand Number & Operations in Base Ten · key `chart-patches` → `chart-patches-core.js`, `chart-patches-activity.js`, `chart-patches-activity.html`, `chart-patches-activities.json`. Start with `node scripts/new-activity.js --num=251`.
- **Worksheets covered:** G1-129 The Hundreds Chart · G1-130 Color the Counting Path · G1-310 Hundreds Chart Puzzle Pieces: Fill In the Numbers · G1-347 Where Does the Piece Go? · G1-348 Find the Wrong Number on the Piece · G2-321 Jump Puzzles: Follow the Arrows · G2-322 Mystery Number: Two Arrows, One Square · G2-323 How Far Apart? Count the Jumps.
- **Merged:** grade-2 "The Chart Rover" — its three tasks (follow arrows, two paths meet, count the jumps) become the **arrow faces of the patches** below. The rover car and its program cards are dropped on purpose: a build-a-program-then-run-it loop is the interaction of the premium tool `arrow-strip`, and the patches already carry the idea (an arrow path *is* a patch shape).

## 1. The pitch
"Pieces have been cut out of the hundreds chart like a jigsaw; each piece shows one number, you fill in the rest — one step right is one more, one step down is ten more — and the piece only sinks back into its hole when every number agrees with its neighbours."

## 2. Why a child will want it again
- **Jigsaw satisfaction.** A filled piece glides over the chart; above its own hole it hesitates, then sinks flush with a satisfying *thock*, the seams vanish, and its ink turns the same colour as the chart's. The chart is whole again.
- **The torn edge.** Holes in the chart are drawn with a paper-cut edge; the pieces have matching tabs. The child sees the hole's shape before the numbers — a shape-matching puzzle hiding a number puzzle.
- **Paint that refuses.** In the counting-path face a fat paint dab follows the finger; it soaks into the right cells (a watercolour bloom, 200 ms) and simply beads up and rolls off a wrong cell. As the path grows, columns or diagonals appear — a pattern the child made.
- **Tear-off arrows.** In the arrow faces the piece grows out of the start cell one square at a time, peeled off the chart in the arrow's direction like a strip of tape; the arrow card flips as its square appears.
- **Free play:** a "patchwork" state after each round: the child can lift any seated piece out again and drop it back, or drag the paint dab over the chart to colour any counting pattern (by 2, 5, 10), with the colours staying until Next.

## 3. The skill and the misconception
- **Skill:** read the hundreds chart as rows of ten: one step right is +1, one step left −1, one step down +10, one step up −10 (1.NBT.C.5 — mentally finding 10 more/less; G2-321/322/323 chart moves); continue a counting pattern on the chart (G1-130).
- **Misconception 1 — the chart is one long line:** the number under 34 is 35. **Pushback:** a piece filled that way does not sink — the cell with "35" stays raised and glowing over the hole while the agreeing cells settle, and the chart's own printed 35 sits plainly one step to the right of 34, in the row above the hole. A number cannot be in two places: the neighbours speak.
- **Misconception 2 — the row wraps sideways:** the cell left of 31 is 32 (or 30). **Pushback:** pieces never cross the chart's left/right edge; in rounds where a piece touches column 1 or 10, the chart's frame is a wall — "left of 31" is the frame, so a piece with a cell there cannot even be built (the tear-off stops at the frame with a bump).
- **Misconception 3 — counting jumps one by one along the row** for 23 → 57 (34 hops). **Pushback:** the jumps face stretches a measuring L-piece from start to end: tens down first, ones right — 3 ↓ and 4 →, and the child sees 7 squares, not 34.

## 4. The stage
**At 704 px (split: chart 460 px left, tray 200 px right):**
- **The chart:** 10 columns × 10 rows (1–100; setting 1–50 = 5 rows, 1–120 = 12 rows), cells 44 × 44 px (numerals 18 px Nunito bold, ink on cream; every tenth column a faint teal tint so the columns of ten read). Holes are cut with a torn-paper edge and show the bench behind (darker wood). The chart is printed in the normal school order (1 top-left, 10 top-right, 11 starts row two).
- **The tray (right):** the current piece(s), drawn at the chart's cell size, each piece a thick card with tabs; the given number printed in ink, the empty cells as pale squares. Keypad 3 × 4 (44 px keys) under the piece.
- **Arrow strip** (arrow faces, above the tray): 2–5 arrow cards (52 × 52) ↓ ↑ ← →, each with "+10 / −10 / +1 / −1" as small numerals in a corner (content numerals).
- **Paint pot** (paint face): a round pot (72 px) with a dab; colour by step: by 2 coral, by 5 teal, by 10 gold.
- **The chart's convention (decided):** 1–100, 1 at the top left, in every locale — the school hundreds chart is 1–100 in all eleven (de *Hundertertafel*, nl *honderdveld*, sv *hundraruta*, da *hundredtavle*, no *hundrerute/hundretavle*, fi *satataulu*, fr *tableau des nombres*, es *tabla del 100*, pt *quadro numérico até 100*, it *tabella del 100*). Some sv/da/no materials also print a 0–99 board, but it is not the dominant grade-1 chart in any locale, it would put 0 on a counting surface, and it moves the decade numbers from the end of each row to its start (10, 20, 30 … stand in the last column of a 1–100 chart but in the first column of a 0–99 board, so every "where does it go" landmark would move) — so there is **no 0–99 setting**. The 1–120 setting covers the US/en 120 chart (1.NBT.A.1).
- **Task line** (≤ 24 px), EN default: **"Fill in the piece, then put it back in the chart."**
- **No words on the apparatus.**

**At 360 px (stacked):** the **whole 10 × 10 chart stays on screen** — the rows of ten are the lesson, so it is never cut into a window: cells 32 px (320 × 320, numerals 13 px), every chart cell a *reading* target only. Things the finger must hit are never chart cells: pieces are dragged as wholes (≥ 64 px), piece cells being filled are drawn at 44 px in the tray, paint is a drag with a 40 px brush that snaps to the cell under its centre, and the keypad (keys 44 px) docks as a bottom sheet only while a piece cell is focused. The 1–120 chart (12 rows, 384 px) scrolls vertically with the active hole kept in view. Check above the 740 fold. At 320: cells 28 px (280 × 280), same rules.

## 5. The hand
- **Fill a cell:** tap an empty cell on the piece (it gets a coral focus ring ≤ 100 ms) → keypad → digits appear in the cell; ⌫ clears. Cells can be filled in any order.
- **Drag the piece:** the piece lifts (shadow, 1.05 scale) and follows the finger; over the chart it snaps to the cell grid. Over a hole of the right shape it slows (magnetic, 80 ms). Release: if every cell agrees with the chart's numbering, it sinks (*thock*, 220 ms) and its seams fade (400 ms). If not, the cells that disagree stay raised and glow coral, the agreeing cells settle, and after 700 ms the whole piece pops back to the tray (no miss is counted for the pop — the Check is the miss; the pop is free information).
- **Paint:** drag the dab from the pot over cells. On a cell on the counting path: bloom (200 ms, soft *shff*). On a cell off the path: the paint beads, rolls off with a tiny wobble, nothing stays.
- **Tear-off (arrow faces):** the start cell glows on the chart; tap the first arrow card → a square peels off the chart next to the start in that direction (the chart under it shows a hole), joined to the start square: the piece grows. Each arrow card, tapped in order, adds its square. The child fills the new squares (the start number is printed). At the frame, a tear-off bumps and does not happen (rounds never require it).
- **Stretch (jumps face):** the start and end cells glow; the child drags from the start: a measuring L stretches — first down (tens), then right/left (ones), squares appearing under the finger; the counts appear as small numerals on the elbow (3 ↓ · 4 →) only after Check.
- **Undo:** pieces return to the tray by dragging them off the chart; paint on a path cell can be wiped by dragging the dab back over it with a long press.

## 6. The rounds
**Face "Fill the piece"** (default; G1-129/310): shapes vary, given number never always in the same position, pieces never only on the chart edge.
| # | shape | given | cells to fill |
|---|---|---|---|
| 1 | plus | 45 (centre) | 35, 44, 46, 55 |
| 2 | L | 23 (top) | 33, 43, 44 |
| 3 | square 2×2 | 67 (top-left) | 68, 77, 78 |
| 4 | T | 18 (top-middle) | 17, 19, 28 |
| 5 | line of 3 down | 52 (middle) | 42, 62 |
| 6 | plus | 81 (bottom arm) | 61, 70, 71, 72 |
| 7 | S | 26 (top-left) | 27, 37, 38 |
| 8 | J at the right edge | 90 | 80, 100, 99 |
| 9 | T at the right edge | 40 (end of row) | 30, 39, 50 |

**Face "Find the wrong number"** (G1-348): a filled piece; exactly one cell is wrong; the child taps it, then types the right number; then seats the piece.
| # | piece (shown) | wrong cell → right | the error it models | position of the error |
|---|---|---|---|---|
| 1 | 34, 35, **36** (L down from 35) | 36 → 45 | below = +1 | bottom |
| 2 | **55** above 56; 55, 56, 57; 66 (plus) | top 55 → 46 | above = −1 | top |
| 3 | 23, **24**, 43 (line down) | 24 → 33 | below = +1 | middle |
| 4 | **60**, 62, 63 (row) | 60 → 61 | row wraps back | left |
| 5 | 44, 45, **46**, 56 (S) | 46 → 55 | below = +1 | inner corner |
| 6 | 77, 78, 87, **89** (2×2) | 89 → 88 | +2 slip | bottom-right |
| 7 | 13; 22, 23, 24; **34** (plus) | 34 → 33 | below = +11 | bottom |
| 8 | **15**, 24, 34 (line down) | 15 → 14 | above = −9 | top |
Error positions per pass: top 2 · bottom 3 · middle/inner 2 · left 1 (no class more than 3; the order shuffle spreads them).

**Face "Where does it go?"** (G1-347): a filled piece; the chart shows only landmarks (1, 10, 50, 91, 100 and the first column) with every other cell blank; the child drags the piece to its place — it sinks only at its true place: 46-47-56-57 (square) · 72-82-83 (L) · 18-19-28 (corner) · 33-43-53 (line) · 64-65-66 (row) · 25-34-35-36-45 (plus) · 89-90-99-100 (square at the corner) · 11-12-22 (L at the left edge).

**Face "Paint a counting path"** (G1-130): two cells painted; the child paints the next six.
- by 2: 4, 6 → 8, 10, 12, 14, 16, 18 · 11, 13 → 15, 17, 19, 21, 23, 25
- by 5: 5, 10 → 15, 20, 25, 30, 35, 40 · 2, 7 → 12, 17, 22, 27, 32, 37
- by 10: 10, 20 → 30 … 80 · 3, 13 → 23 … 73 · 8, 18 → 28 … 78
- by 2 from 31: 31, 33 → 35 … 45

**Face "Arrow pieces"** (G2-321/322/323 — the merged Chart Rover):
- follow (tear off and fill): 26 ↓→→ (36, 37, 38) · 33 ↑↑← (23, 13, 12) · 47 →↓↓ (48, 58, 68) · 92 ←↑ (91, 81) · 15 ↓↓↓→ (25, 35, 45, 46) · 88 ↑←← (78, 77, 76) · 82 →→↓ (83, 84, 94) · 23 ↑↑→ (13, 3, 4). Landings 38, 12, 68, 81, 46, 76, 94, 4 lie in 8 different rows (rows 1, 2, 4, 5, 7, 8, 9, 10). **No trip ever needs a step through the frame** (the designer's "71 ←" asked for the square left of 71, which is the frame — the exact wrap-around misconception this instrument exists to refuse; removed). Each round differs from Row 97's tube trips.
- two paths, one square: two pieces from two starts; the last cell of each is the same blank square and the two pieces dovetail there only if both say the same number: (12 ↓↓→ | 44 ↑←) → 33 · (57 ↑→ | 38 ↓) → 48 · (61 →→↓ | 84 ↑←) → 73.
- count the jumps: stretch from start to end and type the counts: 14 → 47 (3 ↓, 3 →) · 22 → 65 (4 ↓, 3 →) · 31 → 56 (2 ↓, 5 →) · 76 → 43 (3 ↑, 3 ←).
- landings of the follow rounds fall in 8 different rows; no path ever leaves the chart or crosses its left/right frame (gate-checked step by step, not just at the landing).
- **Answer position:** answers are typed or painted. Measured instead: the given cell's position within the piece varies (centre / top / bottom / corner / edge ≥ 1 each per pass); wrong-number positions as above; painted starts distinct; landings spread across rows.
- **Order:** order-only reshuffle per pass; never the same order twice. No 0 anywhere (the chart starts at 1).

## 7. Check, the misses, the success
- **Check with nothing filled** → bubble "Tap a square on the piece and write its number." (no miss).
- **Check with a piece not yet put in** → the piece's hole on the chart pulses once; bubble "Now put the piece back in the chart." (no miss).
- **Miss 1:** the row and the column through the given number light on the chart like a cross of light, with tiny step labels along them (+1 → to the right, +10 ↓ below), and the wrong cells glow. EN **"One step right is 1 more. One step down is 10 more."** (paint: the step is drawn as a bracket between the two starting cells, **"Each step is {s}. What is {s} more?"**; jumps: the L flashes its elbow, **"Go down first — each step down is 10 more."**)
- **Miss 2:** the true numbers ghost in pencil under the wrong cells. EN **"Under {given} is {given+10}."** (using the actual neighbour that was wrong).
- A new move takes the help away until the next Check.
- **Success:** the piece sinks flush, seams fade, its numbers turn chart-ink; the column (or row) it joined does a quick ripple of light down its numbers (34, 44, 54 …) so the child sees the tens line up. EN **"45 — 35 above, 55 below, 44 and 46 beside it."** (wrong number: **"36 was wrong — under 35 is 45."**; paint: **"4, 6, 8, 10 … counting by 2!"**; arrows: **"From 26: ↓ → → lands on 38."**; jumps: **"From 14 to 47: 3 down and 3 right."**)

## 8. Settings
1. **Chart:** 1–50 / 1–100 (default) / 1–120 — changes the chart at rest (5, 10 or 12 rows); rounds outside the range are filtered and replaced by the same shapes shifted into range (precomputed lists for 1–50 and 1–120 in the manifest).
2. **Task:** fill the piece (default) / find the wrong number / where does it go? / paint a path / arrow pieces — changes the tray (one piece, a filled piece, the paint pot, the arrow strip) at rest.

## 9. Words (EN source)
- title: **"The Hundreds Chart Patches"**
- instructions: **"Fill in the piece, then put it back in the chart."** · **"One number on this piece is wrong. Find it and fix it."** · **"Where does this piece go? Put it in its place."** · **"Paint the next numbers in the counting pattern."** · **"Follow the arrows. Fill in each new square."** · **"Both pieces end on the same square. What number is it?"** · **"How many steps down and across?"**
- hints: **"Tap a square on the piece and write its number."** · **"Now put the piece back in the chart."** · **"One step right is 1 more. One step down is 10 more."** · **"Each step is {s}. What is {s} more?"** · **"Go down first — each step down is 10 more."** · **"Under {a} is {b}."** · **"Left of {a} is {b}."**
- celebrations: **"{n} — {up} above, {down} below, {left} and {right} beside it."** · **"{bad} was wrong — {rel} {a} is {b}."** · **"{list} … counting by {s}!"** · **"From {a}: {arrows} lands on {b}."** · **"From {a} to {b}: {d} down and {r} across."**
- settings: **"Chart"**: "1 to 50" / "1 to 100" / "1 to 120" · **"Task"**: "fill the piece" / "wrong number" / "where does it go?" / "paint a path" / "arrow pieces"
- **Locale traps:** (a) **Chart convention — DECIDED: 1–100 everywhere, no 0–99 setting** (see §4; the reviewer checks wording only). (b) **Arrow meaning** follows the printed chart (down = +10) — never "north/south" words. (c) **"above / below / beside"** in the celebration need natural prepositions (de *über / unter / neben*, fr *au-dessus / en dessous / à côté*, fi *yläpuolella / alapuolella / vieressä* with genitive — the fi frame uses numerals before the postposition: "luvun 45 yläpuolella"); author whole sentences, never assemble prepositions. (d) **Counting-by words** (de *in Zweierschritten*, fr *de 2 en 2*, es *de 2 en 2*, pt *de 2 em 2*, it *di 2 in 2*, nl *met sprongen van 2*, sv *två steg i taget / hoppa 2*, da *2-tabellen*-adjacent but say *tæl med 2*, no *telle med 2*, fi *kahden välein*). (e) Numerals are Western digits everywhere; no thousand separators below 120.

## 10. Sound off, access, phones
- Legible with sound off: holes, raised glowing cells, paint beading, the cross of light, ghost numerals; the *thock* is a bonus.
- Keyboard: Tab to a piece cell; digits type; Tab to "place" — arrows move the piece over the chart one cell at a time, Enter drops; in paint, arrows move a cursor and Space paints; arrow cards play with Enter.
- aria: chart cells `aria-label="45"`; hole `aria-label="hole, 4 squares"`; piece cells `aria-label="empty square, right of 45"`.
- Taps: piece cells being filled 44 px; pieces dragged as wholes (≥ 64 px); paint is a drag (no small target); keypad 44 px. Check above the fold at 360×740 and 320×640.

## 11. Distinct from
- **arrow-strip (tool):** build a program, predict, run a beetle. Here nothing is run — the child writes each square's number and the chart's numbering is the referee.
- **number-hotel (tool):** a 0–99 building of corridors; **choral-counting (tool):** a whole-class chart that inks the next number and highlights patterns. Here the chart has holes and the child repairs it; paint refuses wrong cells.
- **Row 97 Nine-Stop Tubes (this batch):** the same arrow grammar acting on *quantities* (tubes), not on the chart.
- **Row 92 Track Repair (to come):** repairing a number line to 120 by ones; here two-dimensional, rows of ten.

## 12. Build plan
- **Core state:** `{ range:50|100|120, task, chart:{holes:[cells]}, pieces:[{cells:[{r,c,given?:n, typed?:n}], placed:false}], paint:{step, start:[a,b], painted:Set}, arrows:[dir], stretch:{down, across} }`.
- **Functions:** `numAt(r,c)` = 10r + c + 1 · `fill(piece, cell, n)` · `fits(piece, r0, c0)` → `{ok, bad:[cells]}` (every cell's number equals `numAt`) · `place(piece, r0, c0)` · `paintCell(n)` → `'soak'|'bead'` (soak iff n > start and (n − start) % step == 0 and n in the next six) · `tearOff(dir)` (refused at the frame) · `stretchTo(r,c)` · `check()`.
- **Gate's truth (`verify-chart-patches-core.js`):** its own `numAt` oracle; every fill round has exactly one completion; every wrong-number piece has exactly one wrong cell and it is the listed one; every "where does it go" piece fits exactly one place; paint rounds soak exactly the six listed cells and bead every other cell in the visible window; arrow paths never leave the chart, both "two paths" land on the same cell, jump counts equal |Δrow| and |Δcol|; landings cover ≥ 8 rows; given-cell positions vary as specified; 1–50 / 1–120 lists are in range.
- **Mutations:** `numAt` reading the chart as one line (+1 down) · tear-off allowed through the frame · a follow round whose trip steps from column 1 leftwards (the old 71 ←) · fits accepts a piece with one wrong cell · paint soaks an off-path cell · wrong-number round with two wrong cells · a piece that fits two places · jumps counted along the row · same order twice · error always at the bottom · 1–50 setting keeps a round with 67 · a chart cell used as the only tap target at 360.
- **Pictures:** none (the rover car is dropped with the rover). **Risks:** the five-row window at 360 must keep the piece's hole fully visible (the window recentres on the active hole). Nothing blocked.

## 13. The four questions
1. **Choose it again?** Yes — jigsaw pieces that sink with a *thock*, paint that refuses wrong cells, strips that tear off the chart.
2. **Teacher on the board?** Yes — every hundreds-chart puzzle teachers print (missing numbers, pieces, wrong number, paths, arrows) becomes one instrument where the chart's own numbering checks the child, and "down is ten more" is seen in every seat.
3. **Parent trust?** Calm, numerals only, the familiar school chart.
4. **Invention:** pieces cut out of the hundreds chart show one number; the child fills the rest, and a piece only sinks back where every number agrees with its neighbours.

## 14. Critic review (2026-10-17)
Scores before → after: invention 5→5 · fun 5→5 · completeness 4→5 · correctness 3→5 · distinctness 4→5 · reality 4→5
What changed:
- **A round taught the misconception:** "71 ←↑ (70, 60)" stepped left out of column 1 and wrapped to 70 — the very error the frame is supposed to refuse. Replaced; three more follow rounds replaced so the landings really cover 8 rows (the designer's claim was false: they covered 4).
- Every fill, wrong-number, where-does-it-go, paint and arrow round re-computed against `numAt`; each wrong-number piece checked to have exactly one fixable cell.
- **Open question decided:** 1–100 in all eleven locales, no 0–99 setting (it would put 0 on a counting surface and is not the dominant grade-1 chart anywhere); 1–120 stays for en.
- 360 layout fixed: 10 × 34 px cells overflow a 360 screen; the whole chart now stays visible at 32 px (rows of ten are the lesson — no five-row window), with every tap target off the chart cells.
- Distinctness: the premium `arrow-strip` (plan → predict → run a beetle) stays excluded — the rover is dropped and nothing runs; mystery rounds no longer duplicate Row 97's.
