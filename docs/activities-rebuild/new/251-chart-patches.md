# New #251 — The Hundreds Chart Patches (1.NBT.C.5)

Backlog entry #251 of the worksheet→activity coverage plan (`NEW-ORDER.md`). Grade 1 · Number & Operations in Base Ten. Planned files: `chart-patches-core.js`, `chart-patches-activity.js`, `chart-patches-activity.html`, `chart-patches-activities.json` (id `chart-patches.play.1-nbt-c-5`). Start with `node scripts/new-activity.js --num=251`, then `NEW-RECIPE.md`.

## The skill
The hundreds chart is rows of ten: one step right is +1, one step down is +10.

## The apparatus and its invention
JIGSAW PATCHES. A 1–100 chart (1–50, 1–120 by setting) has holes. A plus- or L-shaped patch of 3–5 cells lies beside it with ONE number printed. The child fills the patch's other cells (tap a cell, then the keypad), then drags the patch onto the chart: it seats only where every cell matches its neighbours; a wrong cell glows and the patch pops back. Wrong-number task: a filled patch has exactly one error and the child taps it. Paint task: two starting cells are painted; the child paints the next ones; a cell off the step will not take paint, and the columns or diagonals appear as the pattern grows. Arrow-path task (absorbed Chart Rover): the chart is under fog except the start square; the child lays 2–4 arrow cards (→ +1, ↓ +10, ← −1, ↑ −10) into a short program, types the predicted landing number, then presses Go: a library toy car drives the path, lifting the fog square by square, so a wrong prediction shows along the trail; 'two paths' rounds meet on one square, 'jumps' rounds show start and end and ask for the shortest program. Miss 1 (patch tasks): the row and column through the anchor light with their +1 / +10 steps; miss 2: the true numbers ghost under the wrong cells. Right: the patch sinks flush into the chart and its numbers join the chart's ink.

- **Misconception the apparatus makes visible:** Thinks the number below is +1 (reads the chart as one long line), or that the cell left of 31 is 32.
- **Pictures:** toys/car as the rover; otherwise none (chart tool-grade)
- **Settings:** Chart: 1–50 / 1–100 / 1–120 · Task: fill the patch / find the wrong number / paint a counting path (2, 5, 10) / arrow path
- **Rounds:** 8+ per task: random anchors and shapes (never only on the chart edge); the error in wrong-number rounds sits at each patch position equally often; paint starts distinct; rover programs never leave the chart and their landings are spread across the chart's rows; keypad answers.
- **Worksheet types it covers:** G1-129, G1-130, G1-310, G1-347, G1-348, G2-321, G2-322, G2-323
- **Distinct from:** Track Repair is a linear number line; Number Lift (#19) is a vertical 1-10 shaft. Nothing uses the two-dimensional +1/+10 grid.
- **Build risk:** Ten columns at 360 give < 34 px cells: on phones the patch tasks zoom to the three rows round the hole and the rover task to a 5×5 window that scrolls with the car.

## Merged into this instrument (cover each as a setting or round set)
- grade 2 "The Chart Rover — Moving on the Hundreds Chart" (chart-rover): Use the hundreds chart's structure (right = 1 more, down = 10 more) to find where a path of arrows lands, find a square from two paths, and count the jumps between two numbers. — A hundreds chart under FOG: only the start square shows its number. A rover sits on it and the child lays arrow cards (↑ ↓ ← →) into a program slot, then predicts the landing number on a keypad BEFORE pressing Go. The rover drives the path, lifting the fog square by square, so a wrong prediction is visible along the trail. Two-paths mode: two programs from two starts meet on one square. Jumps mode: start and end both show; the child builds the shortest program (tens down, ones right) and the arrow counts are the difference.

## Before building (the LAW's four questions — answer them here at build time)
1. Would a 5–8-year-old choose it again?
2. Would a teacher put it on the board?
3. Would a parent trust it?
4. Is it creative — what is the one-sentence invention?

## Layout
(at build: wide ≥ 560 / stack; pictures ≥ 96 px at 704 and ≥ 64 px at 360; taps ≥ 44; Check above the 360×740 and 320×640 fold.)

## Gates
(at build — NEW-RECIPE.md §3.)
