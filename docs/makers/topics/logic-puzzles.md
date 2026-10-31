# Maker: Logic & Math Puzzles (`logic-puzzles`)

Group **math** · language need **little** · 20 existing templates + 3 new · replaces old app(s): `sudoku`, `math-puzzle`, `code-addition`

## Settings a teacher sets

- puzzle: picture sudoku 4×4 / 6×6 / number sudoku / logic grid / number wall / magic square / balance / analogy / code addition
- difficulty
- pictures or numbers
- (plus the settings every maker has: language (one of our 11); template (gallery by sub-topic); level 1-3; picture theme / own pictures where pictures appear; number of problems / page fill; title + instruction text (editable); answer key on/off; pages: add / duplicate / delete; regenerate (new seed, same settings); paper: Letter for en-US, A4 elsewhere (switchable))

## Templates from today's worksheet types

**Complete a picture grid: each row holds one kind; find the piece that fits the gap**

- `K-068` What Fits the Gap? — Each row shows one kind of picture. Circle the piece that fits the empty box. · picture themes (scripts/worksheet-gen/types/k/K-068-missing-piece.js)

**Picture analogies: A is to B as C is to ?**

- `G1-157` Picture Puzzles — Look at the first pair. Circle what completes the second pair the same way. · picture themes (scripts/worksheet-gen/types/g1/G1-157-picture-analogy.js)

**4x4 picture sudoku: every row, column and box has each picture once**

- `G1-158` Picture Sudoku — Every row, column, and box needs all four pictures — draw or write what goes in each empty cell. · picture themes (scripts/worksheet-gen/types/g1/G1-158-picture-sudoku.js)

**Number walls: each brick is the sum of the two below; find a missing brick by subtracting; work top-down**

- `G1-246` Number Walls — Each brick is the sum of the two bricks under it. Fill in the missing numbers. · screen version (scripts/worksheet-gen/types/g1/G1-246-number-walls.js)
- `G1-266` Number Walls to 10 — Each brick is the sum of the two bricks under it. Build every wall to the top. · screen version (scripts/worksheet-gen/types/g1/G1-266-number-walls-to-10.js)
- `G1-267` Number Walls: Build Every Row — Four rows and no gaps. Add each pair of bricks up to the top. · screen version (scripts/worksheet-gen/types/g1/G1-267-number-walls-four-courses.js)
- `G1-268` Number Walls: Find the Missing Brick — One bottom brick is missing. Find it, then build the whole wall. · screen version (scripts/worksheet-gen/types/g1/G1-268-number-walls-missing-brick.js)
- `G1-289` Number Walls: Start at the Top — The top brick is given this time. Work downwards and subtract. · screen version (scripts/worksheet-gen/types/g1/G1-289-number-walls-from-the-top-down.js)

**Logic grid with picture clues (cross out / circle what each child has)**

- `G1-349` Picture Clue Logic Puzzles: Cross Out and Find — A crossed-out picture means the child does not have it, a circled one means the child has it. Cross out on the grid, then circle each answer. · screen version · picture themes (scripts/worksheet-gen/types/g1/G1-349-logic-puzzles-picture-clues.js)

**Add/subtract within 100 in puzzle formats: number walls and the math maze**

- `G2-313` Number Walls with Two-Digit Answers — The bricks climb past twenty, so add in writing as you go. · screen version (scripts/worksheet-gen/types/g2/G2-313-number-walls-to-100.js)

**Solve a logic grid from yes/no/either-or clues (cross out what cannot be, check what must be) and read a solved grid**

- `G2-319` Logic Grid Puzzles: Three Clues, One Answer — Read the clues. Cross out on the grid what cannot be true, check what must be true, then circle the picture each child has. · screen version · picture themes (scripts/worksheet-gen/types/g2/G2-319-logic-puzzles.js)
- `G2-344` Logic Grid Puzzles with Yes, No and Either-Or Clues — A yes clue gets a check mark, a no clue gets an X and an either-or clue crosses out the third picture. Finish the grid, then circle each answer. · screen version · picture themes (scripts/worksheet-gen/types/g2/G2-344-logic-puzzles-yes-no-either-or-clues.js)
- `G2-345` Read the Logic Grid: True or False — The grid is already solved. Read it, then circle the check mark if the sentence is true or the X if it is false. · screen version · picture themes (scripts/worksheet-gen/types/g2/G2-345-logic-puzzles-read-the-grid-true-or-false.js)

**Solve a 6×6 picture sudoku: each picture once in every row, column and box**

- `G3-348` Big Picture Sudoku — Every row, column, and box needs all six pictures — fill the empty cells. · picture themes (scripts/worksheet-gen/types/g3/G3-348-picture-sudoku-6.js)

**Complete a magic square so every row and column has the same sum**

- `G3-349` Magic Squares — Every row and column adds up to the magic number. Fill the empty cells. (scripts/worksheet-gen/types/g3/G3-349-magic-square.js)

**The equal sign means both sides are the same amount; find the missing number with an operation on both sides**

- `G3-350` Make It Balance — Both sides must weigh the same. Write the missing number. (scripts/worksheet-gen/types/g3/G3-350-number-balance.js)

**Classify by two attributes at once (two-circle Venn, row × column table, the missing cell) (part moved to logic-cabinet)**

- `G3-351` What Completes the Puzzle? — Rows share a picture. Columns share a size. Circle what fits the empty cell. · picture themes (scripts/worksheet-gen/types/g3/G3-351-matrix-reasoning.js)

**Classify by two attributes at once (two-circle Venn, row × column table, the missing cell)**

- `G3-353` Two-Circle Sort — Left circle: this kind. Right circle: BIG ones. Middle: both! Draw a line from each picture to its place. · picture themes (scripts/worksheet-gen/types/g3/G3-353-venn-sort.js)

**Solve a logic grid from clues (cross out what cannot be, tick what must be)**

- `G3-378` 4 by 4 Logic Grid Puzzles: Six Clues — Four children and four pictures. Use every clue: cross out what cannot be true and check what must be true until each row has one answer. · screen version · picture themes (scripts/worksheet-gen/types/g3/G3-378-logic-puzzles-4-by-4-six-clues.js)
- `G3-379` Two-Attribute Logic Puzzles: Two Pictures per Child — Each child has one picture from each set. Use the linking clues to fill all three grids. · screen version · picture themes (scripts/worksheet-gen/types/g3/G3-379-logic-puzzles-two-attributes.js)

## New templates to add

- **Code addition (pictures stand for numbers)** — the old code-addition app
- **Number sudoku 4×4 and 6×6 with numerals** — only picture sudoku exists
- **KenKen-style cage puzzle (small)** — arithmetic logic for G2-3

## FABLE-QUESTIONS (answered before the build)

1. [logic-puzzles-Q1] Puzzle generators must guarantee ONE solution (sudoku, logic grids, magic squares, code addition) for any teacher setting — confirm each existing engine proves uniqueness and that the browser can do it fast enough.
