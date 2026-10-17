# New #261 — The Sudoku Garden (READINESS picture-sudoku)

Backlog entry #261 of the worksheet→activity coverage plan (`NEW-ORDER.md`). Grade 1 · Logic & Visual Thinking. Planned files: `sudoku-garden-core.js`, `sudoku-garden-activity.js`, `sudoku-garden-activity.html`, `sudoku-garden-activities.json` (id `sudoku-garden.play.picture-sudoku`). Start with `node scripts/new-activity.js --num=261`, then `NEW-RECIPE.md`.

## The skill
In a 4x4 picture sudoku every row, column and box holds each picture once; use what is already planted to decide.

## The apparatus and its invention
GARDEN BEDS: a 4x4 bed in four 2x2 boxes with some flowers already planted. The child drags seed packets onto empty soil. A seed that repeats a flower already in its row, column or box will not root: a thread lights between the two same flowers and the seedling wilts back into its packet. A "why" tap on an empty cell lights its row, column and box together so the child sees the three missing sets.

- **Misconception the apparatus makes visible:** Checks only the row (or only the box), and guesses rather than finding the cell with one possibility.
- **Pictures:** flowers (4 distinct), vegetables, fruits
- **Settings:** Size: 4x4 with 8 given / 6 given · Pictures: 4 flowers / 4 fruits.
- **Rounds:** 8+ puzzles from a generator that guarantees a unique solution; at least one forced single per puzzle; given cells never form a solvable pattern by position alone.
- **Worksheet types it covers:** G1-158, G3-348
- **Distinct from:** No activity uses Latin-square constraints.
- **Build risk:** Uniqueness generator must be verified exhaustively (4x4 is small: enumerate).

## Merged into this instrument (cover each as a setting or round set)
- grade 3 "The Latin Garden" (latin-garden): Each row, column and box holds every picture exactly once; deduce empty cells from what is already there. — THE LATIN GARDEN: a 6×6 (4×4 on the easier setting) garden of beds; six flower or vegetable pictures. The child drags a picture into an empty bed; if that picture already grows in the same row, column or box, a vine draws from the new one to its twin and the new one wilts back to the tray — the constraint is visible. Tapping an empty bed shows little ghost pictures of only those still possible there, as a help the child can switch on. The garden blooms when full.

## Before building (the LAW's four questions — answer them here at build time)
1. Would a 5–8-year-old choose it again?
2. Would a teacher put it on the board?
3. Would a parent trust it?
4. Is it creative — what is the one-sentence invention?

## Layout
(at build: wide ≥ 560 / stack; pictures ≥ 96 px at 704 and ≥ 64 px at 360; taps ≥ 44; Check above the 360×740 and 320×640 fold.)

## Gates
(at build — NEW-RECIPE.md §3.)
