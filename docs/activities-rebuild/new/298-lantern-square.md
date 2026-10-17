# New 298 — The Lantern Square: every tile pours its light into two lanterns at once (3.NBT.A.2)

## 0. Identity
- id `lantern-square.play.3-nbt-a-2` · grade 3 · CCSS 3.NBT.A.2 (add and subtract within 1000; here as sums of three and missing addends) · strand Number & Operations in Base Ten · files `mini tools/lantern-square-core.js`, `lantern-square-activity.js`, `lantern-square-activity.html`, `lantern-square-activities.json` (key `lantern-square`; scaffold `node scripts/new-activity.js --num=298`).
- worksheets it covers: **G3-349 "Magic Squares"** (every row and column adds up to the magic number; fill the empty cells) — the same 3×3 rows-and-columns rule, its three levels (3, 4, 5 blanks; shifted values), and beyond it into the hundreds so the sums are true 3.NBT.A.2 work (regrouping within 1000).
- new instrument (no old activity).

## 1. The pitch
"Each row and each column has a glass lantern that fills with light as the numbers in it add up — and every tile you drop pours into TWO lanterns at once, its row's and its column's, so a number only belongs where both of its lanterns can light exactly."

## 2. Why a child will want it again (the fun)
- **Pouring light.** A tile dropped in a cell sends two streams of golden light along its row and down its column into two lanterns; each lantern's glass fills to its new level (240 ms, a soft glassy *ting* whose pitch rises with the level).
- **Too full spills; exactly full lights — at Check.** While the child works, each lantern's light level rises and falls live, and a line that goes over the magic number **spills over the rim** in coral drips that run down the glass — the child can feel "too much" at once. Whether a line is *exactly* full is decided at Check: the lanterns light one by one (warm glow, a little flame flicker), so the child has to add and subtract to know, not wait for a glow.
- **The crossing is the puzzle.** Fixing a row can spill its crossing column — the two lanterns of one tile are visibly tied together, a satisfying knot to untie.
- **The festival.** When all six lanterns are lit, they lift off their hooks one by one (row lanterns, then column lanterns, 120 ms apart), float up a few pixels like sky lanterns, and the grid glows gold from inside; the magic number's badge rings like a little bell.
- **Big numbers feel grown-up.** In the "big numbers" setting the tiles read 111, 199, 475 — a child who did 15-squares can now do 825-squares with the same lanterns.

## 3. The skill and the misconception
- **Skill:** add three numbers (within 1000 in the big setting, with regrouping); find a missing addend (magic number − the other two) — both for G3-349 and 3.NBT.A.2.
- **Misconception 1 — fixing one line and breaking a crossing line.** *Push-back:* a tile pours into two lanterns; a value that lights the row spills (or under-fills) the column, visibly, at once.
- **Misconception 2 — guessing instead of computing the missing addend.** *Push-back:* no lantern lights before Check, and the light level is analog (one unit of 150 is under 1 px of glass), so "try tiles until something lights" does not work; the tray's extra tile is a near-miss (89 beside 90, 112 beside 111) that fits **no** cell, and on the big numbers it is invisible on the glass — only computing the missing addend finds it. Miss 1 shows the sums of the dark lines; miss 2 writes the gap as a subtraction.
- **Misconception 3 — adding only two of the three numbers** (or the row but not the column). *Push-back:* a lantern lights only when its line is complete AND exact; an incomplete line stays dim however close it is.

## 4. The stage
**Layout: stacked at every width** (layout check 2026-10-17: no `layout:'split'` — its stage column is only ≈ 370 px at 704, too narrow for this apparatus). The stage takes the full card width, ≈ 648 px at 704 (≈ 656 at 1024); whatever §4 places in a left, right, side or bubble column stays side by side inside the stage when the activity draws it, while the shell's bubble, keypad and Check sit under the stage. Sizes written for a wider stage fit the 648 px by closing margins and gaps first; no picture drops below 96 px, no tap below 44, no data mark or grid cell below 40. Grid, tiles and lanterns are drawn apparatus; no pictures.

**At 704 — left 440 px (the square), right 232 px (the tray and Check):**
- **The magic number badge:** top-left of the square, a gold circle 72 px with the magic number (Baloo 2 34 px; three digits fit at 30 px) and a small lantern-rim icon — the gold rim on every lantern is the same gold.
- **The grid:** 3 × 3 cells of 92 px with 6 px gaps (288 × 288), cream `#FBF3E4` with a 3 px teal frame. Given numbers are carved into their cells (Baloo 2 34 px, dark ink); empty cells are recessed sockets (inner shadow).
- **Row lanterns:** to the right of each row, a lantern 44 × 92: a hanging hook, a glass cylinder (geometry: rounded rectangle, 2 px ink, faint glass highlight), a gold rim line at the top = the magic number, light fill from the bottom proportional to the line's sum (capped at 115 %; above 100 % the excess is drawn as coral drips over the rim), a blank base plate (the line's sum numeral, 20 px, appears there only at miss 1 — the adding is the child's). The light level starts at the givens' sum (a row 5, 10, _ starts at 15/24 of the glass before any tile moves). The lantern's flame lights only at Check.
- **Column lanterns:** below each column, the same lantern laid in a row (44 wide × 92 tall), hanging from a rail under the grid.
- **The tray (right column):** a wooden tray with the n + 1 number tiles (n = empty cells): tiles 72 × 56, Baloo 2 30 px, in a 2-column grid; order shuffled per mount (never the reading order of the empty cells, never ascending).
- **Task line** above the square, ≤ 2 lines, 22 px. Check/Next under the tray.

**At 360 — stacked:** task line · badge (56 px) left of a 3 × 3 grid of 70 px cells with 5 px gaps (220 × 220) · row lanterns 30 × 70 to the right (whole block 264 wide), column lanterns 70 × 64 below · the tray as one row of tiles (56 × 48 each; 6 tiles = 336 px; a 6-tile tray wraps to two rows of 3) · Check at y ≈ 620 on 360 × 740; at 320 × 640 cells shrink to 62 px and lanterns to 26 px wide, Check at ≈ 590.

No words on the apparatus: numerals, the gold rim, light and drips only.

**Task lines (EN):**
- "Make every row and every column add up to {M}. Drag the tiles into the empty squares."
- (first round of a pool, shown once) "Each tile lights two lanterns: its row and its column. One tile in the tray will not fit anywhere."

## 5. The hand
- **Drag a tile** from the tray (pointer events, tile lifts 1.05 with shadow ≤ 16 ms) onto an empty socket (snap radius 40 px). On drop (≤ 100 ms): the tile seats with a *clack*, two light streams run along its row and column (160 ms), both lanterns refill (240 ms, a glassy *ting* whose pitch follows the level); a line over the magic number drips coral (a low *plip*). No lantern lights before Check.
- **Move or return a tile:** drag a placed tile to another empty socket (both lines of the old place and the new place update) or back to the tray. Dropping on an occupied socket swaps the two tiles.
- **Tap instead of drag:** tap a tile (it rises, outlined), then tap a socket → it moves there; tap a placed tile then the tray → back.
- **Keyboard:** Tab through tiles and sockets; Enter picks up / puts down; Esc returns the held tile to the tray.
- **Free play:** the light levels and spills respond live to everything — this is the toy; Check lights the lanterns that are exactly full. After success the lanterns stay lit and the child may swap tiles to watch them go dark and spill.

## 6. The rounds
One round = one square: the givens, the empty cells (never a whole row or column), the tray (the missing numbers + one decoy). Every round below was proved in `work-39/lan3.js`–`lan6.js`: (a) the full square sums to M on all six lines; (b) **exactly one** placement of tray tiles lights all six lanterns (brute force over every ordered choice of n tiles from n + 1); (c) the square is **chain-solvable** — some line starts with one empty cell, and filling single-empty lines in turn finishes it, so pure missing-addend reasoning always works; (d) the decoy is not in the square. Grids are written row by row, `_` = empty.

**Small numbers · 2–3 empty (8 rounds):**

| # | M | grid | tray answers (reading order) | decoy |
|---|---|---|---|---|
| 1 | 15 | _ 1 6 / _ 5 7 / 4 9 2 | 8, 3 | 10 |
| 2 | 18 | 5 10 _ / 4 6 _ / 9 _ 7 | 3, 8, 2 | 1 |
| 3 | 21 | 6 5 10 / _ 7 _ / 4 9 8 | 11, 3 | 12 |
| 4 | 24 | 5 10 _ / _ 8 _ / 7 6 11 | 9, 12, 4 | 3 |
| 5 | 27 | 6 13 8 / 11 _ 7 / 10 5 _ | 9, 12 | 14 |
| 6 | 30 | 11 _ 13 / 12 10 8 / _ _ 9 | 6, 7, 14 | 5 |
| 7 | 30 | 12 14 4 / 2 10 _ / _ 6 8 | 18, 16 | 17 |
| 8 | 18 | 9 _ 5 / _ 6 10 / 7 8 _ | 4, 2, 3 | 1 |

**Small numbers · 4–5 empty (8 rounds):**

| # | M | grid | answers | decoy |
|---|---|---|---|---|
| 1 | 15 | _ 1 6 / _ 5 7 / 4 _ _ | 8, 3, 9, 2 | 10 |
| 2 | 21 | _ 11 _ / 5 _ _ / 10 _ 8 | 6, 4, 7, 9, 3 | 2 |
| 3 | 27 | 8 _ 12 / 13 9 _ / _ _ 10 | 7, 5, 6, 11 | 14 |
| 4 | 30 | _ 14 _ / 18 10 _ / _ _ 16 | 4, 12, 2, 8, 6 | 7 |
| 5 | 30 | _ _ 9 / 12 10 8 / 11 _ _ | 7, 14, 6, 13 | 15 |
| 6 | 24 | _ _ 11 / 10 _ _ / 5 12 _ | 9, 4, 8, 6, 7 | 3 |
| 7 | 18 | 7 8 _ / 2 6 _ / _ _ 5 | 3, 10, 9, 4 | 11 |
| 8 | 30 | _ 6 _ / 2 _ _ / _ 14 4 | 16, 8, 10, 18, 12 | 11 |

**Big numbers · 2–3 empty (8 rounds):**

| # | M | grid | answers | decoy |
|---|---|---|---|---|
| 1 | 150 | 40 30 80 / _ 50 10 / _ 70 60 | 90, 20 | 89 |
| 2 | 330 | 50 150 _ / 190 _ 30 / 90 70 _ | 130, 110, 170 | 109 |
| 3 | 375 | 50 _ 100 / _ 125 75 / 150 25 200 | 225, 175 | 250 |
| 4 | 465 | 166 _ 188 / 177 155 133 / _ 199 _ | 111, 122, 144 | 112 |
| 5 | 330 | 122 134 74 / 62 110 _ / 146 _ 98 | 158, 86 | 170 |
| 6 | 345 | 160 85 100 / _ 115 175 / _ 145 _ | 55, 130, 70 | 40 |
| 7 | 489 | 253 43 193 / _ 163 223 / 133 _ 73 | 103, 283 | 104 |
| 8 | 750 | 200 450 100 / 150 _ 350 / _ _ 300 | 250, 400, 50 | 49 |

**Big numbers · 4–5 empty (8 rounds):**

| # | M | grid | answers | decoy |
|---|---|---|---|---|
| 1 | 150 | _ _ 80 / 90 50 _ / 20 _ 60 | 40, 30, 10, 70 | 41 |
| 2 | 330 | 50 _ 130 / _ 110 _ / _ _ 170 | 150, 190, 30, 90, 70 | 10 |
| 3 | 375 | 50 _ _ / _ _ 75 / 150 25 200 | 225, 100, 175, 125 | 250 |
| 4 | 465 | 166 _ _ / _ 155 133 / _ _ 144 | 111, 188, 177, 122, 199 | 112 |
| 5 | 330 | _ 134 74 / 62 110 _ / _ _ 98 | 122, 158, 146, 86 | 170 |
| 6 | 345 | _ _ 100 / 55 115 _ / 130 _ _ | 160, 85, 175, 145, 70 | 40 |
| 7 | 489 | 253 43 _ / 103 163 _ / _ _ 73 | 193, 223, 133, 283 | 194 |
| 8 | 825 | _ _ 125 / 175 _ 375 / _ 75 _ | 225, 475, 275, 425, 325 | 224 |

The squares are the 8 rotations/reflections of the classic 2 7 6 / 9 5 1 / 4 3 8, scaled by k and shifted by c (k = 1, 2, 10, 11, 12, 15, 20, 25, 30, 50): the big setting reaches three-digit sums with regrouping (253 + 43 + 193 = 489; 475 + 125 + 225 = 825). No 0 anywhere; every tile ≥ 1.

**Decoys (measured, `work-39/lan6.js`).** Each decoy is a near-miss of a real answer (± one step, or ± 1 off the step lattice in the big setting: 89 beside 90, 112 beside 111, 194 beside 193, 224 beside 225 — exactly the number a careless subtraction produces). Where the decoy sits among the tray values: small 2–3 low 4 / mid 1 / high 3; small 4–5 low 2 / mid 2 / high 4; big 2–3 low 3 / mid 3 / high 2; big 4–5 low 3 / mid 3 / high 2. (In a square built from consecutive numbers (k = 1) a "mid" decoy is impossible — any number between the smallest and largest answer is already in the square, so there the edge position of the decoy is a property of the square; where k = 2 (rounds with even values) the decoy is put in the middle (17 between 16 and 18) so "leave out the biggest or smallest tile" is not a rule.)

**Answer position.** The child builds; what can be guessed is the placement from the tray order. The tray is shuffled per mount, never in the empty cells' reading order and never ascending. Bots measured over each pool's 8 rounds: "smallest n tiles ascending into the empty cells in reading order" 1/8 (small 2–3), 0/8 elsewhere; "largest n descending" 0/32; "leave out the largest tile" = the decoy rule above (≤ 4/8 in every pool).

**Order:** order-only reshuffle per pass (never the previous order).

## 7. Check, the misses, the success
- **Check with an empty socket** → hint, no miss: "Fill every empty square first. One tile stays in the tray."
- **Miss 1** → the correct lines' lanterns light and stay lit; every lantern of an incorrect line pulses (dim ones blink, spilling ones drip faster), its sum numeral appears on its base plate, and the tiles sitting on two unlit lines wobble (they are the likely culprits). Hint: "{k} lanterns are not lit. A dark lantern needs more; a spilling lantern has too much."
- **Miss 2** → the apparatus writes the missing addend: for one line that started with a single empty cell (the chain's first step), its lantern's empty band shows a subtraction written on the glass — "{M} − {sum}" (e.g. "24 − 15") — and that cell's socket glows; the child still computes and places. Hint: "This row has {sum} already. It needs {M} − {sum} more."
- A new move takes the help away until the next Check.
- **Success** (all six lit and the decoy in the tray) → the festival (§2): lanterns float up in turn, the grid glows, the badge rings. Bubble: "All six lanterns light up! Every row and every column makes {M}." · and for the big setting, one example line is read out: "{a} + {b} + {c} = {M}."

## 8. Settings
1. **Numbers: small (magic numbers 15–30) · big (150–825).** Visible at rest: the badge and all tiles change from one/two-digit to two/three-digit.
2. **Empty squares: 2–3 · 4–5.** Visible at rest: the grid shows more sockets and the tray more tiles.

## 9. Words (EN source)
- title: "The Lantern Square" · instruction: "Every tile lights two lanterns. Make all six lanterns glow."
- prompts: the two task lines (§4) · hints: empty, miss 1, miss 2 (§7) · celebrations: two (§7) · settings: "Numbers", "small", "big", "Empty squares", "2–3", "4–5".
- aria: cell "Row {r}, column {c}: {value | empty}" · lantern "Row {r} lantern: {sum} of {M}, {lit | dark | spilling}" (column likewise) · tile "Tile {n}".
- **Locale traps:** "magic number" — de *Zauberzahl*, fr *nombre magique*, es *número mágico*, it *numero magico*, pt *número mágico*, nl *tovergetal*, sv *magiskt tal*, da *magisk tal*, no *magisk tall*, fi *taikaluku* (all used for magic squares in school). "row / column": de *Zeile / Spalte*, fr *ligne / colonne*, es *fila / columna*, it *riga / colonna*, pt *linha / coluna*, nl *rij / kolom*, sv *rad / kolumn*, da *række / kolonne*, no *rad / kolonne*, fi *rivi / sarake*. Numbers ≤ 825: no thousands separator ever printed. The minus sign in miss 2 is "−" (U+2212) in Baloo 2 — check it is in the font subset; fallback "-". No plural agreement issues (the numeral "{k} lanterns": fi partitive "{k} lyhtyä", authored per class).

## 10. Sound off, access, phones
- Legible with the sound off: light levels, gold rims, coral drips, base numerals and the written subtraction carry all meaning; *ting/plip* are decoration.
- Keyboard path in §5; aria-live on lanterns when they change state ("Row 2 lantern lit").
- Taps: sockets 92 / 70 / 62 px, tiles ≥ 48 px tall, Check 48 px.
- No pictures. Check above the fold at 360 × 740 and 320 × 640.

## 11. Distinct from
- **Row 27 Make the Number → THE TWO-ENDED LANTERN STRING** (K.OA.A.3): one string lit from both ends by two numbers that must meet. Here there is no string: six independent glass lanterns, each a sum gauge for a line of three, and the invention is that one tile feeds two of them.
- **Row 165 THE PRICE GLASS** (coins melt into a glass) and **Row 91 THE FAIR RIBBON**: single comparisons of one amount; no crossing constraint.
- **New 290 The Even Beam** (one equation balanced) and **New 261 The Sudoku Garden** (roots check rows/columns/boxes — no arithmetic).
- **New 250 The Light Wall** (light rises through a number wall of bricks): pyramid sums of two, not row/column sums of three.
- Registry: no built or designed invention uses a two-lantern crossing.

## 12. Build plan
- **Core (`LanternSquareCore`, pure):** `square(sym, k, c)` → 9 values · `lineSums(grid)` · `lanternState(sum, M, complete)` → `dark | lit | spill` · `place(state, tile, cell)` / `swap` / `remove` · `solutions(givens, blanks, tray, M)` (brute force) · `chainSolvable(givens, M)` · `missingAddend(line)` · `grade(state)` → `{ok, unlit:[lines], culprits:[cells]}` · `trayOrder(round, prev)` (shuffle, not reading order, not ascending, not the previous).
- **Gate (`verify-lantern-square-core.js`, own oracle):** for every round recompute the full square from (sym, k, c) independently of the stored answers; assert six sums = M; assert `solutions` = 1 by its own brute force (not the core's); assert chain-solvable; assert no full empty line; assert decoy ∉ square and decoy places nowhere legally (for every empty cell, the decoy in that cell makes at least one complete line wrong in every completion); assert every tile ≥ 1 and every M ≤ 999; recompute the decoy-position and ordering-bot tallies of §6; assert miss-2's subtraction picks a line with exactly one original empty cell and its result equals that cell's answer; assert every EN template number equals the model.
- **Mutations:** a lantern lights while its line is incomplete · a lantern lights before Check · a base numeral shows before miss 1 · spill drawn under 100 % · tile pours into the row only · swap loses a tile · decoy accepted in a winning state · `solutions` counts permutations of identical lines wrongly (a round with 2 solutions slips in) · a round whose empty cells fill a whole column · tray order equals reading order · miss 2 chooses a two-empty line · M miscomputed with the offset (15k + 3c → 15k + c).
- **Local test:** real drags of every tile into every socket in every round (the full correct fill, plus a decoy drop in each socket asserting a dark or spilling lantern), swaps, returns, 7 widths, 11 locales.
- **Pictures:** none. **Risks:** three-digit numerals in 62 px cells at 320 → 26 px font, measured to fit "825". Nothing blocked.

## 13. The four questions
1. **Choose it again?** Yes — pouring light, the spill, and the six-lantern festival make a puzzle feel like play.
2. **Teacher on the board?** Yes — the crossing is visible (one tile, two lanterns), the missing addend is a measurable gap, and the big setting is genuine three-digit addition with regrouping.
3. **Parent trust?** Calm, drawn, nothing scored, one right answer proven per round.
4. **The invention:** every tile pours its light into its row's lantern and its column's lantern at once — a number belongs only where both of its lanterns light exactly.

## 14. Critic review (2026-10-17)
Scores before → after: invention 5→5 · fun 5→5 · completeness 5→5 · correctness 4→5 · distinctness 5→5 · reality 5→5
What changed:
- Re-proved all 32 squares with my own brute force (`work-c39/lantern.js`, rows + columns only, every ordered choice of tray tiles): each round has exactly one lighting placement, is chain-solvable by single missing addends, has no full empty line, no 0, and its decoy is outside the square.
- **The lanterns no longer give the answer away live.** Exact "lit" and the running-sum numerals were an oracle: with 3–6 tiles a child could drop tiles until a glow appeared. Now the light level is analog and live (over-full still spills at once), the base numerals appear only at miss 1, and the flames light only at Check — the adding and the missing addend are the child's work, which is what 3.NBT.A.2 and the misconception ("guessing instead of computing") demand.
- Small 2–3 round 7's decoy 20 → 17 (a middle decoy where the square allows one); the false claim "a mid decoy is impossible in the small setting" corrected (it is impossible only for k = 1 squares); decoy tallies re-measured (small 2–3: low 4 / mid 1 / high 3).
- Layout check (2026-10-17): switched to stacked — split stage column is ~370 px at 704.
