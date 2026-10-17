# New #225 — The Sorting Cabinet (READINESS matrix-reasoning)

Backlog entry #225 of the worksheet→activity coverage plan (`NEW-ORDER.md`). Grade K · Logic & Visual Thinking. Planned files: `logic-cabinet-core.js`, `logic-cabinet-activity.js`, `logic-cabinet-activity.html`, `logic-cabinet-activities.json` (id `logic-cabinet.play.matrix-reasoning`). Start with `node scripts/new-activity.js --num=225`, then `NEW-RECIPE.md`.

## The skill
Use rows, and then rows AND columns, to find the missing picture in a grid.

## The apparatus and its invention
THE DRAWER THAT WILL NOT SHUT. A 3×3 cabinet of drawers; each row holds one kind (apples, ducks, cars) and one drawer stands open and empty. The child drags a piece from the tray into the open drawer; it slides shut only if the piece fits its row. Miss 1: the drawer jams half-open and the row's other drawers glow. Miss 2: the jammed piece and the row's pictures pulse side by side. Success: the drawer shuts with a click and all nine knobs light. ROWS-AND-COLUMNS setting (G3-351): each column also holds one SIZE (big, middle, small — the same library picture at three scales), so a piece must satisfy both; a piece that fits the row but not the column jams with the COLUMN glowing, one that fits the column but not the row jams with the ROW glowing.

- **Misconception the apparatus makes visible:** Matching to the nearest neighbour or the column alone; ignoring one of the two constraints.
- **Pictures:** fruits, animals, vehicles, toys, farm-animals — identical instances per row; sizes are scale transforms (100 / 72 / 50 %) of one picture, never different art.
- **Settings:** Rule: rows only / rows and columns · Tray: 3 pieces / 4 pieces
- **Rounds:** 9 rounds per setting; the empty drawer visits all nine positions across a pass; tray of 3 (or 4) pieces shuffled, the right piece in any tray slot ≤ 40 %; the two-rule tray always holds a right-row-wrong-size piece and a right-size-wrong-row piece; one right answer.
- **Worksheet types it covers:** G3-351, K-068
- **Distinct from:** Not Mim's Baskets (category sort into bins) and not the Bunting Line (sequence): this is two-dimensional constraint reasoning.
- **Build risk:** The smallest scale must stay ≥ 64 px at 360 (cabinet cell ≥ 96 px). Colour as the column attribute is refused (no same-noun colour variants in the library).
- **Grade span (settings):** K (rows-and-columns: 3)

## Before building (the LAW's four questions — answer them here at build time)
1. Would a 5–8-year-old choose it again?
2. Would a teacher put it on the board?
3. Would a parent trust it?
4. Is it creative — what is the one-sentence invention?

## Layout
(at build: wide ≥ 560 / stack; pictures ≥ 96 px at 704 and ≥ 64 px at 360; taps ≥ 44; Check above the 360×740 and 320×640 fold.)

## Gates
(at build — NEW-RECIPE.md §3.)
