# New #298 — The Lantern Square (3.NBT.A.2)

Backlog entry #298 of the worksheet→activity coverage plan (`NEW-ORDER.md`). Grade 3 · Number & Operations in Base Ten. Planned files: `lantern-square-core.js`, `lantern-square-activity.js`, `lantern-square-activity.html`, `lantern-square-activities.json` (id `lantern-square.play.3-nbt-a-2`). Start with `node scripts/new-activity.js --num=298`, then `NEW-RECIPE.md`.

## The skill
Use addition and missing-addend reasoning so every row and column has the same sum.

## The apparatus and its invention
THE LANTERN SQUARE: a 3×3 grid; at the end of every row and column hangs a lantern holding a bar whose length is that line's current sum, next to a fixed glass marking the magic number. The child drags number tiles from a tray into the empty cells; each lantern's bar grows with the line's sum and lights only when it fills its glass exactly — too high and the bar overflows red. The square is done when all six lanterns are lit.

- **Misconception the apparatus makes visible:** Filling one line correctly and breaking a crossing line; guessing instead of computing the missing addend.
- **Pictures:** none (grid and lanterns drawn tool-grade)
- **Settings:** Magic number: 15 / 30+ (larger numbers) · Empty cells: 2-3 / 4-5
- **Rounds:** Rotations/reflections of magic squares scaled and shifted, ≥ 8 rounds, tray holds the exact tiles plus 1 distractor; empty cells spread over rows and columns.
- **Worksheet types it covers:** G3-349
- **Distinct from:** No multi-sum puzzle activity; distinct from even-beam (one equation) and latin-garden (no arithmetic).
- **Build risk:** One right answer: the generator must prove the filled square is the ONLY arrangement of the tray tiles that lights all six lanterns (brute-force the ≤ 6! placements per round) and drop rounds with two; the distractor tile must fit no cell.

## Before building (the LAW's four questions — answer them here at build time)
1. Would a 5–8-year-old choose it again?
2. Would a teacher put it on the board?
3. Would a parent trust it?
4. Is it creative — what is the one-sentence invention?

## Layout
(at build: wide ≥ 560 / stack; pictures ≥ 96 px at 704 and ≥ 64 px at 360; taps ≥ 44; Check above the 360×740 and 320×640 fold.)

## Gates
(at build — NEW-RECIPE.md §3.)
