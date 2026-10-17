# Row 170 — Make and Count Squares: THE STAMP SHEET — perforate it into rows and columns, and the square printing plate tells you if your stamps are true (2.G.A.2)

## 0. Identity
- id `fractions.make-and-count-squares.2-g-a-2` (KEPT; slugs, titles, intros frozen in all 11 locales) · grade 2 · CCSS 2.G.A.2 · strand Geometry.
- own files at rebuild (the row leaves the shared fractions engine; `fractions-activities.json` keeps rows 108 and 172 until those move): `stamp-sheet-core.js`, `stamp-sheet-activity.js`, `stamp-sheet-activity.html`, `stamp-sheet-activities.json`. 0 lines to `fractions-core.js`, `lcs-shell.*` or any shared core.
- page title (frozen): "Make and Count Squares — Partition a Rectangle into a Grid"; intro (frozen): "Tap the dotted lines to make the grid — like 3 rows and 4 columns — and type how many squares there are in all." — kept: the child makes the grid line by line (now by perforating at notches) and types the total.
- worksheets it covers: **G2-211** Rows and Columns (array → its rows, columns, adding sentence and multiplication sentence: the card setting) · **G2-212** Pick the Array ("circle the array that matches the multiplication": the pick board).
- old activity: dotted candidate lines on a rectangle; tap the right ones (the exact lines were the only lines offered) and type the total. **Kept:** all 8 old (rows, cols) rounds — 2×3, 2×4, 3×3, 2×5, 3×4, 4×4, 3×5, 4×5 — the "make the grid, then count" order, the keypad answer. **Changed:** the child is no longer handed only the right lines: notches every half square on both rails let a child space lines wrongly, and the printing plate shows what that does. **Dropped:** nothing.

## 1. The pitch
"The rectangle is a sheet of stamps: run the perforating wheel down it and across it to make rows and columns — then the printing press stamps one square picture into every piece, and only true, same-size squares print perfectly."

## 2. Why a child will want it again
- **The perforating wheel.** A little toothed wheel sits on the rail along the top of the sheet. Tap a notch (or drag the wheel there) and it zips down the sheet *zzzzip*, punching a neat line of holes edge to edge. Another wheel on the left rail punches across. It is a stationery toy children already love.
- **The press comes down.** On Check the press lowers with a satisfying *ka-CHUNK* and prints a stamp into every piece the child made: a coloured square with a white frame and a little star. Where the pieces are true squares of the plate's size, every stamp is perfect and sits neatly inside its holes. Where they are not, the misprint is plain to see — a stamp sliced by a line of holes, or a stamp swimming in a white border. (Real stamp collectors call that a "misperf".)
- **Tear-off.** A correct sheet tears off row by row with a crisp *rrrip*; each strip flies into the stamp album and the page fills up.
- **The album.** Every finished sheet adds a page to the album in the corner — over a session the child collects a little book of their own sheets.
- **Earned show per round:** the album snaps shut on the new page, a postmark *thunks* across it, and the album's spine grows one page thicker. No timer, score, streak or lives.
- **Free play:** the plate can be lifted off the press and slid over the sheet at any time — it is the square the sheet is measured in. Perforations heal with a tap.

## 3. The skill and the misconception
- **Skill (2.G.A.2 + G2-211/212):** partition a rectangle into rows and columns of same-size squares and count to find the total; read an array as rows × columns, as a repeated-addition sentence (4 + 4 + 4) and as a multiplication (3 × 4); pick the array that matches a sentence.
- **Misconceptions and the push-back:**
  1. **Squares that are not the same size** (lines spaced by eye): the plate is one fixed square; any piece that is not that square prints wrong — sliced or bordered — on exactly the pieces that are wrong.
  2. **The fence-post error** ("4 columns" → draws 4 lines → 5 thin columns): the thin columns cannot hold the plate; every stamp in them is sliced. The task's numbers are pieces, the lines are what you make — the misprint shows the difference.
  3. **Rows and columns swapped** ("3 rows of 4" read as 4 rows of 3): the sheet is exactly 4 squares wide and 3 tall, so 4 rows will not fit at all — the left rail's notches are at half squares, 4 equal rows would need cuts at ¾ of a square, and any 3 cuts the child can make leave rows of different heights; the press misprints every stamp in the wrong rows. Rows run ACROSS: the tear-off strips are rows.
  4. **Adding rows and columns** (3 + 4 = 7): counting step — at the first miss the sheet tears into its rows and each strip lights its stamps; at the second each strip is labelled with the running total (4, 8, 12).
  5. **An array that "has the right total" is the right array** (pick board): the card's album page only takes the array with the card's rows and row-length — a 2-by-6 sheet does not fit a "3 rows of 4" page even though both make 12.

## 4. The stage
**At 704 — split layout:**
- **Task line** (20 px, ≤ 2 lines), e.g. "Make 3 rows ▤ and 4 columns ▥ of same-size squares." The ▤/▥ glyphs are drawn icons (a 3-cell bar lying / standing, 18 px), not characters, so "row" and "column" are shown, not only named.
- **The sheet** (left, up to 440 × 340): a cream rectangle (#FFFDF6, 3 px ink outline, soft shadow) sized `cols·u × rows·u` with `u = min(440/cols, 340/rows, 120)` px (2×3 → u 120, sheet 360 × 240; 4×5 → u 85, sheet 425 × 340). The rectangle's true size in plate units is never printed on it.
  - **Top rail** (24 px tall, over the sheet's width): a brass-coloured bar with **notches every half square** (2·cols − 1 interior notches; every notch looks the same, so the rail never tells where the squares are). The **column wheel** (a 30 px toothed wheel, teal) parks at the left end.
  - **Left rail** (24 px wide) likewise with the **row wheel**.
  - **Perforations:** lines of 4 px holes every 8 px, edge to edge.
- **Right column (190 px):**
  - **The order card** (180 × 120, cream card with a coral stamp-edge border): the round's plan in the card setting (§8): "3 rows of 4" + icons · "4 + 4 + 4" · "3 × 4" (de/sv/da/no/fi: "3 · 4"). In plate rounds the card shows the **plate** instead: a 64 px coloured square on a handle.
  - **The press** (180 × 80): a drawn lever press whose plate is the stamp square (side u at sheet scale; drawn here at 56 px with "= this size" shown by a dotted ghost of the same square on the sheet's corner at rest).
  - **The album** (180 × 110): a closed book; its spine shows one thin line per finished sheet this session.
  - **Keypad** (shell number keypad, appears in the count step) under the album.
- **Bubble** under the sheet; Check at the right (shell).

**At 360 — stacked:** task (2 lines) · order card + press side by side (160 × 96 each) · the sheet with `u = min(296/cols, 236/rows, 84)` (4×5 → u 59, sheet 295 × 236; 2×3 → u 84, sheet 252 × 168) plus rails 20 px · keypad (count step) · bubble · Check. At 320: `u = min(262/cols, 210/rows, 76)` (4×5 → 52; cells stay ≥ 44 px for the tap-a-stamp count help).

**Pictures:** none. Stamps, sheet, rails, wheels, press, album and card are drawn apparatus geometry. (A library picture inside each stamp was considered and refused: at 4×5 a stamp is 59 px on a phone, below the 64 px picture floor, and a "record" must be drawn, never a shrunken picture — PICTURE-RULINGS.) Each round's stamp colour comes from the shell palette in round order (teal, coral, gold, plum, leaf, sky, rose, sand, mint) — colour is decoration only.

## 5. The hand
- **Tap a notch on the top rail** → the column wheel rolls along the rail to it (speed 900 px/s, ≤ 250 ms), drops, and runs down the sheet (300 ms, *zzzip*), leaving a perforation. **Drag** the wheel along the rail: it follows the finger, clicks into each notch (a tiny tick sound), and on release at a notch it runs down. Same for the left rail (across).
- **Tap an existing perforation** (or its notch) → the holes heal from the far end back to the rail (200 ms, a soft "fff"); undo.
- **Lift the plate** (drag it off the press) → a translucent ghost square of side u follows the finger over the sheet and snaps to the sheet's top-left-aligned square lattice (whole squares only) — the child can lay it against their pieces to see; release returns it to the press. This is exploration; it never counts as Check.
- **Count step** (after the partition is accepted): the keypad appears; type the total; tapping a stamp makes it lift 2 px and glow (a counting aid; tap again to un-glow).
- **Pick board:** three finished sheets lie on the counter; tap one → it lifts 8 px with a shadow (another tap swaps). Check sends it.
- **Keyboard:** Tab → top rail (Left/Right move the wheel notch by notch, Enter perforates/heals) → left rail (Up/Down) → Check; count step: digits; pick: Left/Right selects a sheet.

## 6. The rounds
**Board MAKE — by numbers (9 rounds):** the sheet is exactly `cols × rows` squares; the card says how many rows and columns.
| # | rows | cols | total | notches top / left (interior) |
|---|---|---|---|---|
| M1 | 2 | 3 | 6 | 5 / 3 |
| M2 | 2 | 4 | 8 | 7 / 3 |
| M3 | 3 | 3 | 9 | 5 / 5 |
| M4 | 2 | 5 | 10 | 9 / 3 |
| M5 | 3 | 4 | 12 | 7 / 5 |
| M6 | 4 | 4 | 16 | 7 / 7 |
| M7 | 3 | 5 | 15 | 9 / 5 |
| M8 | 4 | 5 | 20 | 9 / 7 |
| M9 | 3 | 2 | 6 | 3 / 5 |
(M1–M8 are the old rounds; M9 is the tall twin of M1 — same total, other shape — so "rows" and "columns" are read, not assumed.)

**Board MAKE — by the plate (8 rounds):** the card shows only the plate; the child finds how many rows and columns fit.
| # | sheet in plate units (cols × rows) | total |
|---|---|---|
| P1 | 3 × 2 | 6 |
| P2 | 4 × 3 | 12 |
| P3 | 2 × 2 | 4 |
| P4 | 5 × 2 | 10 |
| P5 | 4 × 4 | 16 |
| P6 | 5 × 3 | 15 |
| P7 | 3 × 4 | 12 |
| P8 | 5 × 4 | 20 |

**Board PICK (9 rounds):** the card's plan + three finished sheets (✓ = matches). Every round offers ONE sheet with the card's number of rows but the wrong row length and ONE with the card's row length but the wrong number of rows (K9: the same total in another shape), so a child who checks only rows, or only the row length, is left with a 50/50 every round; **a transposed sheet (4 rows of 3 for "3 rows of 4") is never offered** — under "3 × 4" read as "3 rows of 4" it would be wrong, under other readings right, so it is left out in every locale. The fixed slot (1-3) of the ✓ in the first pass is given; later passes permute it.
| # | card (rows of length) | sheets offered (rows×length) | ✓ total is the … of the three | ✓ slot, pass 1 |
|---|---|---|---|---|
| K1 | 2 of 3 | 2×3 ✓ · 2×4 · 3×3 | smallest (6 · 8 · 9) | 2 |
| K2 | 3 of 4 | 3×4 ✓ · 3×3 · 2×4 | largest (12 · 9 · 8) | 3 |
| K3 | 2 of 5 | 2×5 ✓ · 2×6 · 3×5 | smallest (10 · 12 · 15) | 1 |
| K4 | 4 of 4 | 4×4 ✓ · 4×5 · 3×4 | middle (16 · 20 · 12) | 3 |
| K5 | 3 of 5 | 3×5 ✓ · 3×4 · 2×5 | largest (15 · 12 · 10) | 1 |
| K6 | 4 of 3 | 4×3 ✓ · 4×4 · 5×3 | smallest (12 · 16 · 15) | 2 |
| K7 | 3 of 3 | 3×3 ✓ · 3×4 · 2×3 | middle (9 · 12 · 6) | 1 |
| K8 | 4 of 5 | 4×5 ✓ · 4×4 · 3×5 | largest (20 · 16 · 15) | 2 |
| K9 | 3 of 4 | 3×4 ✓ · 2×6 (same total) · 4×4 | tied smallest (12 · 12 · 16) | 3 |
(rows × row-length; sheets in pick are drawn with the square size of the largest that fits all three, so a smaller array is not tellable by its size.)

- **Answer position:** MAKE has no position (the child builds it; the total is typed). PICK: the matching sheet stands in slots 1/2/3 three times each per pass (table above: 3/3/3, never the same slot three rounds running), permuted per pass. **Size is not a tell — measured by the critic (`work-c26/k170.js`):** the draft's distractors made the ✓ the MIDDLE-sized sheet in 6 of 9 rounds, so a "pick the middle one" bot scored 67 %; the rebuilt table puts the ✓ smallest 3 · middle 2 · largest 3 · tied 1, so the best size bot scores 3.5/9 (chance 3/9), a rows-only or length-only bot scores 4.5/9 (a coin toss every round), and the odd-total-out bot is wrong in the one round where it applies (K9). The gate re-runs these bots and fails if any exceeds 4.5/9.
- **Never 0;** every total 4–20.
- **Order:** order-only reshuffle per pass.

## 7. Check, the misses, the success
**MAKE, step 1 (the partition):**
- **Check with no perforation** → hint "Run the wheel along a notch to make a line of holes." (no miss).
- **Miss** = the pieces are not all plate squares (any line misplaced, missing or extra).
  - **Miss 1:** the press comes down and prints every piece: true pieces print perfectly; each wrong piece prints the plate square anchored at its top-left — **sliced** where it runs over a perforation (the overlap shown as torn coral hatch) or **bordered** where it leaves white (shown as a cream gap with a dashed edge). The misprints stay until the next move. Hint: "The press only fits same-size squares. Look at the stamps that didn't fit." (by-numbers rounds add "{rows} rows and {cols} columns — count the pieces, not the lines.").
  - **Miss 2:** the plate's ghost lattice appears on the sheet (faint dotted squares where every true square is), and the rail notches at whole squares glow teal. Hint: "Put the holes where the dotted squares meet."
  - A new perforation or heal takes the showing away until the next Check.
- **Accepted:** all stamps print perfectly (the *ka-CHUNK* and a little shimmer across the sheet), and the task line's second sentence appears: "How many stamps?" — the keypad slides up.

**MAKE, step 2 (the count):**
- **Check with nothing typed** → hint "Count the stamps and type how many." (no miss).
- **Miss 1:** the sheet tears into its rows (left-to-right strips sliding 12 px apart); each strip lights its stamps one after another (250 ms each) — no numerals. Hint: "Count one row, then count how many rows."
- **Miss 2:** each strip gets its running total at its right end (4, 8, 12 — Baloo 2, 18 px) as it lights. Hint: "Count on, row by row."
- **Success:** the rows tear off one by one into the album (*rrrip*, 300 ms each), the album snaps shut, a postmark thunks across it. Bubble by card setting: "3 rows of 4 make 12 stamps!" · "4 + 4 + 4 = 12 stamps!" · "3 × 4 = 12 stamps!" (plate rounds use the rows-of phrase).

**PICK:**
- **Check with no sheet chosen** → hint "Choose the sheet that matches the card." (no miss).
- **Miss 1:** the card's album page slides out from under the card — an empty page of exactly the card's rows and row-length — and the chosen sheet tears into rows that try to file into it: a row too long overhangs the page edge (coral), a row too short leaves empty slots (dashed), an extra row has no slot and drifts off the page. Hint: "Count its rows. Count the stamps in one row."
- **Miss 2:** the page stays out, its slots numbered along the first row (1 … row-length) and down the side (1 … rows). Hint: "Find the sheet that fills the page exactly."
- **Success:** the right sheet's rows file into the page perfectly (each *click*), the album shuts. Bubble: "Yes — {rows} rows of {cols}: {total} stamps!" (card wording per setting).

## 8. Settings (each visibly changes the board at rest)
1. **Board:** make by numbers / make by the plate / pick the sheet — the card shows the plan, or the plate on its handle, or the card plus three sheets on the counter.
2. **Card shows:** rows of (3 rows of 4 + icons) / adding (4 + 4 + 4) / multiplying (3 × 4, or 3 · 4 where the school writes the dot) — the order card's text changes (greyed on the plate board).

## 9. Words (EN source; the other 10 locales authored by hand, then one native + pedagogy reviewer)
- title (in-tool): "The Stamp Sheet"
- instruction: "Make the sheet into same-size square stamps. Then count them."
- task lines: by numbers "Make {rows} rows ▤ and {cols} columns ▥ of same-size squares." · adding card "Make the sheet that this adding shows: {sum}." · multiplying card "Make the sheet for {rows} × {cols}." · plate "Make stamps the size of the press plate." · count "How many stamps?" · pick "Which sheet matches the card?"
- card: rowsOf "{rows} rows of {cols}" · adding "{cols} + {cols} + …" (generated: the row-length written `rows` times) · multiplying "{rows} × {cols}"
- hints: hintStart "Run the wheel along a notch to make a line of holes." · hintPress "The press only fits same-size squares. Look at the stamps that didn't fit." · hintPieces "{rows} rows and {cols} columns — count the pieces, not the lines." · hintGhost "Put the holes where the dotted squares meet." · hintCountStart "Count the stamps and type how many." · hintRow "Count one row, then count how many rows." · hintCountOn "Count on, row by row." · hintPickStart "Choose the sheet that matches the card." · hintPickRows "Count its rows. Count the stamps in one row." · hintPickFill "Find the sheet that fills the page exactly."
- celebrations: as §7.
- settings: "Board" · "make by numbers" · "make by the plate" · "pick the sheet" · "Card shows" · "rows of" · "adding" · "multiplying"
- aria: sheet "sheet of stamps, {k} lines of holes made"; notches "top rail notch {i} of {n}"/"left rail notch {i} of {n}" with "holes made" state; stamps (count step) "stamp, row {r}, place {c}"; pick sheets "sheet {k} of 3" (never its size).
- **Locale traps:**
  - **Multiplication sign:** de, sv, da, no, fi schools write the raised dot ("3 · 4"); en, fr, es, it, pt, nl write "×". The card and celebration use the locale's sign (a per-locale constant `mulSign`), never a hard-coded ×.
  - **Which factor is the rows:** "3 × 4" is read "3 rows/groups of 4" in this activity everywhere (CCSS 3.OA reading; de "3 mal 4" = 4 + 4 + 4; nl "3 keer 4" likewise). Because some families read the factors the other way, the pick board never offers the transposed sheet (§6) and the make board's by-numbers card always also names rows and columns in words + icons.
  - **row / column words:** de *Reihe* (not *Zeile*, which is a text line) / *Spalte*; fr *rangée* or *ligne* / *colonne* (native panel picks the CE1 word); es *fila / columna*; it *riga / colonna* (or *fila*); pt *fileira / coluna* (BNCC "linhas e colunas" — native picks); nl *rij / kolom*; sv *rad / kolumn*; da *række / kolonne* (or *søjle*); no *rad / kolonne*; fi *rivi / sarake*. The ▤/▥ icons carry the meaning wherever the word is uncertain.
  - **stamp:** de *Briefmarke*, fr *timbre*, es *sello* (es-MX *timbre* or *estampilla* — native picks; es-MX is the shipped es), it *francobollo*, pt *selo*, nl *postzegel*, sv *frimärke*, da *frimærke*, no *frimerke*, fi *postimerkki*.
  - **plural after numerals:** fi partitive ("12 postimerkkiä", "3 riviä"); de "3 Reihen mit je 4" reads better than a calque of "of" — the native panel writes the frame.
- **Sound off:** misprints, tear-offs and the album page show everything; numerals on the card are the only reading needed.

## 10. Sound off, access, phones
- Keyboard path §5; rails are sliders (role="slider" with notch steps), stamps are buttons in the count step.
- Taps: notches are 26 px apart at the smallest (4×5 at 320: u 52 → half 26 px) — below the 44 px floor, so the rail is NOT a row of tiny buttons: the whole rail (≥ 44 px deep) is one target; a tap anywhere on it sends the wheel to the NEAREST notch and shows a 44 px ghost wheel there, and the perforation runs only when the child taps the ghost wheel again (or releases a drag on it). Dragging the 44 px wheel itself clicks notch by notch. Where half-notch spacing is ≥ 44 px (every sheet at 704) a single tap perforates directly. Stamps ≥ 52 px.
- Fold: 360 × 740 → task 48 + card/press 96 + sheet with rails 256 (4×5) + keypad 150 (count step only, it replaces the press row) + bubble/Check 60 ≈ 610. 320 × 640: card/press 88, sheet 230, keypad 140, Check at ≈ 586. Check above both folds.
- Phone layout: card and press side by side above the sheet; the album shrinks to a 40 px spine chip in the header row.

## 11. Distinct from
- **Rows 138/139 build-array / equal-groups (2.OA.C.4), tool baking-tray** (break a tray of buns into known facts) and **new #292 array-frame** (missing factor): those fill or split an array of objects; here the child PARTITIONS a continuous rectangle with straight edge-to-edge lines, and a fixed-size plate tests that the pieces are true squares — the geometry of 2.G.A.2, not counting objects.
- **Row 23 the Stamp Frame** prints counters onto a ten-frame with rubber stamps; here the stamp is a postage stamp and the verdict is the fit of a fixed plate to the child's own grid lines.
- **Rows 107/108/171/172** (fractions) cut a shape into equal shares; this makes a grid of unit squares and counts them.

## 12. Build plan
- **Core state:** `{board:'numbers'|'plate'|'pick', card:'rowsOf'|'add'|'mul', round:{rows, cols}, colCuts:Set<halfIdx>, rowCuts:Set<halfIdx>, step:'cut'|'count', typed:'', pick:null|0..2, miss, help}` (cut positions stored in half-square units; whole-square positions are even numbers).
- **Core functions:** `pieces()` → the rectangles made by the cuts · `isTrueGrid()` (colCuts = {2,4,…,2(cols−1)} AND rowCuts = {2,4,…,2(rows−1)}) · `misprints()` → per piece `{ok}` or `{sliced: rect, border: rect}` (plate square at the piece's top-left vs the piece) · `total()` · `runningTotals()` · `cardText(card, locale)` · `pageFit(sheet, card)` → per row `{ok|over|short}`, extra rows · `check()`.
- **Gate's own ground truth (verify-stamp-sheet-core.js):** for every round, the ONLY cut set accepted is the whole-square set (exhaustive over all 2^(top + left notches) cut sets — at most 2^16 = 65,536 for 4×5); every accepted grid's pieces are congruent squares of side u (computed by the gate from the cut coordinates); misprints are non-empty for every wrong cut set; totals = rows × cols; pick: exactly one sheet matches each card (rows AND row-length), no transposed sheet, the K9 trap has equal totals but fails `pageFit`; the slot balance and size-not-a-tell of §6; never 0.
- **Mutations:** a pick round whose ✓ is the middle-total sheet in more than 3 rounds (the measured size tell) · accept a grid with one cut at a half notch · accept 3 cuts for "4 columns" (fence-post) · accept rows/columns swapped · total = rows + cols · pick accepts equal total (2×6 for 3 rows of 4) · a transposed sheet offered · the rail notches at whole squares look different at rest (a tell) · the help survives a new perforation · the count step opens before the grid is accepted · mulSign hard-coded × in de.
- **Pictures to verify:** none.
- **Risks:** half-notch spacing on a 4×5 sheet at 320 px is 26 px — the drag-the-wheel fallback must be smooth; the sliced/bordered misprint must read at 52 px stamps (hatch ≥ 6 px).
- **BLOCKED:** nothing.

## 13. The four questions
1. **Would a 5–8-year-old choose it again?** Yes — a perforating wheel that zips, a press that thunks, stamps that rip off into an album that grows: it is a toy stationery shop.
2. **Would a teacher put it on the board?** Yes — it shows precisely why "same-size squares" matters, catches the fence-post error and rows/columns swaps by physics, and links the grid to "4 + 4 + 4" and "3 × 4" without saying so.
3. **Would a parent trust it?** Yes — calm, no score, every number derived from the grid the child made, nothing sold.
4. **The invention, in one sentence:** the rectangle is a stamp sheet the child perforates into rows and columns, and a fixed square printing plate prints true stamps only into true, same-size squares.

## 14. Critic review (2026-10-17)
Scores before → after: invention 5→5 · fun 5→5 · completeness 4→5 · correctness 3→5 · distinctness 5→5 · reality 4→5
What changed:
- PICK board had a size tell: the ✓ was the middle-sized sheet in 6 of 9 rounds (a "middle one" bot scored 67 %). Rebuilt K1–K9: one same-rows and one same-length distractor every round, ✓ smallest 3 · middle 2 · largest 3 · tied 1; best size bot 3.5/9, rows-only/length-only 4.5/9 (coin toss), explicit pass-1 slots 3/3/3. Gate re-runs the bots.
- 4×5 at 320 has 26 px notch spacing (below 44): the rail is now one target — tap sends the wheel to the nearest notch, tap the ghost wheel to perforate; the 22/26 px contradiction removed.
- Misconception 3 rewritten honestly: 4 equal rows cannot be made on a 3-tall sheet with half-square notches.
