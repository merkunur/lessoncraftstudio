# New #260 — The Clue Table (READINESS logic-grids)

Backlog entry #260 of the worksheet→activity coverage plan (`NEW-ORDER.md`). Grade 1 · Logic & Visual Thinking. Planned files: `clue-table-core.js`, `clue-table-activity.js`, `clue-table-activity.html`, `clue-table-activities.json` (id `clue-table.play.logic-grids`). Start with `node scripts/new-activity.js --num=260`, then `NEW-RECIPE.md`.

## The skill
Logic grids: use yes/no picture clues to cross out impossibilities and find what each child has.

## The apparatus and its invention
THE CLUE STAMPS. A grid: library animal friends down the side (3 or 4), things across the top (toys, fruits, pets). Clue cards lie beside it, each made of pictures only: friend + thing with a ring (has it) or a cross (does not). The child drags a clue card onto the grid; it stamps its tick or cross into the right cell and fades to a small mark at the side. When a row or column has all but one cell crossed, the last cell glows and the child taps it to tick it; the thing then slides to that friend's plate. Miss 1 (a tick against a clue): the cell shakes and the clue that forbids it flips back over. Miss 2: the forced cell glows brighter. SWEEP setting (G3-378/379): a tick does not cross its row and column automatically — the child taps the crosses; a wrong sweep cell shakes. READ mode (G2-345): a solved grid and picture sentences dropped on tick or cross.

- **Misconception the apparatus makes visible:** Reads a cross as "has it", or stops after one clue instead of using elimination.
- **Pictures:** Friends: farm-animals/animals (cat, dog, rabbit, duck, pig, sheep). Things: toys (ball, kite, car, doll), fruits (apple, banana, pear), pets.
- **Settings:** Grid: 2×2 / 3×3 / 4×4 · Clues: yes/no / with either-or (G2-344) · Sweep: automatic / by hand
- **Rounds:** 9 puzzles per grid size with a unique solution found by an exhaustive solver; clue order shuffled; the first forced cell varies across rows and columns; one right grid.
- **Worksheet types it covers:** G1-349, G2-319, G2-344, G2-345, G3-378, G3-379
- **Distinct from:** No activity teaches elimination; the Sudoku Garden is placement under constraints, this is deduction from clues.
- **Build risk:** Child pictures in the library are few (baby, baby_girl, girl, occupations) — may need animal friends instead.

## Merged into this instrument (cover each as a setting or round set)
- grade 2 "The Clue Board — Logic Grid Puzzles" (clue-board): Solve a small logic grid (3 children × 3 pets/foods) from yes, no and either-or clues, and read a solved grid. — A 3×3 grid: children down the side (library children/occupations), things across the top (pets, fruits, toys). Clue cards lie beside it. Dragging a clue card onto the grid stamps it: a "yes" clue places a check AND automatically crosses out the rest of its row and column (the rule of the grid pushes back); a "no" clue places an X. When a row has two X's, the last square glows — the child taps it to check it. Read mode: a solved grid and true/false sentence cards the child drops on ✓ or ✗.
- grade 3 "The Clue Stamps" (clue-stamps): Solve a logic grid by turning each clue into crosses and ticks and using 'one per row and column'. — THE CLUE STAMPS: a 3×3 or 4×4 grid of children × pictures; each clue is a card shown with pictures (e.g. 'Mia does NOT have the kite'). The child drags a clue card onto the grid; it stamps the cross or tick it proves into the right cell and fades. When a row gets a tick, the child taps the rest of the row and column to cross them (the 'sweep'); a wrong sweep cell shakes and the clue that forbids it lights. A tick placed against a clue makes that clue card turn back over. The puzzle is solved when each child has one picture.

## Before building (the LAW's four questions — answer them here at build time)
1. Would a 5–8-year-old choose it again?
2. Would a teacher put it on the board?
3. Would a parent trust it?
4. Is it creative — what is the one-sentence invention?

## Layout
(at build: wide ≥ 560 / stack; pictures ≥ 96 px at 704 and ≥ 64 px at 360; taps ≥ 44; Check above the 360×740 and 320×640 fold.)

## Gates
(at build — NEW-RECIPE.md §3.)
