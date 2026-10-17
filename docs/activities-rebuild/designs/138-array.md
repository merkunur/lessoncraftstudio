# Row 138 — Build an Array → THE SKEWER PLATE: every row of the array is threaded on one skewer, so a row can only be lifted whole — and every skewer you lift out holds the same, which IS the repeated addition (2.OA.C.4)

## 0. Identity
- **id** `array.build-array.2-oa-c-4` (kept; slugs, titles and intros frozen in all 11 locales) · grade 2 · CCSS 2.OA.C.4 (with 3.OA.A.1 / 3.OA.C.7 / 3.MD.C.7 for the big-array setting) · strand Operations & Algebraic Thinking · own files `skewer-plate-core.js`, `skewer-plate-activity.js`, `skewer-plate-activity.html`, `skewer-plate-activities.json` (the row leaves `array-activities.json`; register the manifest in `frontend/lib/activities.ts MANIFEST_FILES`; 0 lines to `array-core.js` and `lcs-shell.*`).
- **Page intro (frozen):** "An interactive Grade 2 math activity: build a rectangular array — equal rows — and find the total by repeated addition (4 + 4 + 4 = 12). Tap to fill the rows, watch the equal groups add up, then type how many in all." Kept: the **Build** job builds the array (tap the row and column buttons — the rows fill), the **Count** job lifts it out skewer by skewer so the addition "4 + 4 + 4" appears in the rack, and the child types how many in all.
- **Worksheets it must also cover:** G2-211 "Rows and Columns" (count rows and columns, finish the multiplication sentence) → Count job and its success line · G2-212 "Pick the Array" (circle the array that matches the multiplication) → **Find** job · G3-301 "Big Arrays" (count all to 10 × 10), G3-302 "Tricky Groups" (equal groups → multiplication), G3-313 "Count the Squares" (area grid → multiplication), G3-358 "Times Tables Practice" and the per-table faces G3-364…368 and G3-402…405 (tables 2–10) → the **big arrays** setting (square tiles, one fact of each table 2–10 per pass, plus a one-table sub-pass).
- **What the old activity did:** 8 rounds (2×3, 3×4, 4×2, 2×5, 3×3, 5×2, 4×4, 4×3), tap to fill an R × C grid, a repeated-addition strip, type the total. **Kept:** all 8 arrays (plus 3×5 as a 9th) as the Count and Build rounds, tap-to-fill as the Build job's interaction, the repeated-addition strip (now the skewer rack).
- **Critic 2026-10-17 — the invention was replaced.** The designer's "Snap Tray" (crack the tray along a groove, turn it with a handle, push the pieces back) was the premium tool **Baking Tray**'s three moves exactly (`mini tools/baking-tray.js`: ROTATE · CRACK along a seam · PUSH together). The skewer keeps every round table, the misconception handling and the worksheet coverage, and changes the hand.

## 1. The pitch
"The array is a plate of fruit kebabs — every row is threaded on one skewer — so you can only ever lift a whole row, every skewer you lift holds the same, and the skewers lined up in the rack ARE the repeated addition: 4 + 4 + 4."

## 2. Why a child will want it again
- **Pulling a kebab off the plate.** Grab a skewer by its round wooden handle-bead and slide it out to the right: the whole row of fruit rides along, bobbing a little, with a soft *shhk*, and drops into the rack beside the plate with a *tock*. A row can't come out in bits — it's on a stick.
- **The rack fills like a menu.** Each skewer lands in its own slot in the rack, and its slot shows an empty box; skewer after skewer, the rack reads "▢ + ▢ + ▢" — the sum is literally made of kebabs.
- **Re-skewer the other way.** The skewer pot (a little jar of sticks at the plate's corner) pulls every skewer out with a *zip* and pushes new ones in from the TOP: 3 skewers of 4 become 4 skewers of 3 — the same fruit, never moved — and the rack's sum becomes "3 + 3 + 3 + 3". The fruit stays put; only the sticks change.
- **The earned show:** the kebabs slide back onto the plate one by one (*tock-tock-tock*), the plate glows, the fruit does a little wave from corner to corner, and the two sentences appear: "4 + 4 + 4 = 12" and "3 × 4 = 12".
- **Free play:** after a round, pull skewers out and slide them back as often as you like, re-skewer the other way, and watch the rack rewrite itself.

## 3. The skill and the misconception
- **Skill (2.OA.C.4; G2-211/212; G3-301/302/313/358…405):** find the total of a rectangular array of up to 5 rows and 5 columns and write it as a sum of equal addends (rows or columns); read an array as rows × columns; pick the array that shows a multiplication; for grade 3, arrays and area grids to 10 × 10 and the facts of the tables 2–10.
- **Misconception 1 — rows + columns** ("3 rows and 4 columns make 7"). **Pushback:** a typed total equal to rows + columns (or rows + columns − 1) lights only the end fruit of each skewer and the first skewer, while the middle fruit pulse — "you counted the edges". Measured (critic, `work-c34`): rows + columns equals the total in **0/9** Count rounds and **0/9** big-array rounds (2 × 2 is left out: 2 + 2 = 4 = 2 × 2).
- **Misconception 2 — losing count in the middle / counting a picture twice.** **Pushback:** each lifted skewer leaves the plate and carries its own box; a lifted row cannot be counted again.
- **Misconception 3 — unequal groups are fine.** **Pushback:** a skewer always runs the full width of the plate, so every lifted group is a full row — equal by construction; in the Build job the wrong shape (4 rows of 3 for "4 + 4 + 4") lifts out as 3 + 3 + 3 + 3 and the rack shows it does not match.
- **Misconception 4 — rows and columns mixed up** (G2-211, G2-212). **Pushback:** the Find job's wrong plates differ by one row or one column (never the turned-round plate, which would also be right), and the miss lifts the chosen plate's skewers so the child sees "4 skewers of 4", not "3 skewers of 4".

## 4. The stage
**At 704 px (`layout:'split'`):**
- **Task line** (≤ 24 px): count — **"Lift out the skewers. Write the addition."** · build — **"Make the plate for {sum}."** · find — **"Which plate is {r} rows of {c}?"** · big arrays — **"How many in all? Lift the skewers to check."**
- **The plate** (left, 540 × 540): a cream oval-cornered board, teal rim 3 px. Up to 5 × 5 **library pictures at 96 px** in cells of 102 px (5 × 102 = 510). Each row is threaded on a **skewer** — a drawn 6-px wooden stick (warm sand fill, 2 px ink) running behind the pictures, sticking out 16 px on the left as a round **handle-bead** (a 44-px tap/drag target, coral) and 10 px on the right as a point. When the plate is skewered by columns the sticks run top → bottom and the beads sit on the top edge. The **skewer pot** (a drawn jar of sticks, 56 × 56) sits at the plate's top-left corner — tap = re-skewer the other way.
- **The rack** (right column, 140 × 540): five stacked slots (each 140 × 100). A lifted skewer lies in its slot (fruit at 96 px would not fit 140 px across five pictures — in the rack the skewer is shown **as a drawn stick with the same number of coloured round tokens (24 px) as it holds fruit**, with the full-size picture still on the plate as the label; the empty plate row shows faint outlines where its fruit was). Beside each slot its **box** (64 × 56, digits 34 px) with "+" between slots, and under the rack "= [ ]" (80 × 56).
- **The digit strip** under the plate: one row 0–9, keys 56 × 48.
- **Build job:** the plate starts empty (a 5 × 5 ghost grid of faint cells); two steppers on its left and top edges — **rows ▲▼** and **columns ◀▶** (44 × 44 each) — grow and shrink it; a new row slides in already on its skewer. The target sum is shown as the order card above the rack ("4 + 4 + 4", numerals 32 px).
- **Find job:** three plates side by side (each 200 × 200) with **drawn counters** (round dots, 22 px at 704 — tokens, not pictures) on thin skewers in up to 5 × 5; the target card above ("3 rows of 4" with a small drawn row-arrow glyph).
- **Big arrays:** cells are **plain square tiles** (drawn, 2 px ink, cream fill with a teal edge) of 36 px up to 10 × 10 (360 × 360), each row on a thin skewer with a 44-px handle-bead; the rack holds up to 10 slim slots (each 140 × 44, the skewer drawn with its tile count as tokens 14 px — never tapped) and the strip becomes "{r} × {c} = [ ]" (factors fixed, only the product typed).
- Vertical budget (count, 5 rows): task 56 + plate 540 + keys 48 + gaps 32 = **676** (the rack sits beside the plate).

**At 360 px (stacked):** task 52 · plate 328 × 328 (pictures **64 px**, 5 × 64 + 4 × 2 = 328; the handle-beads overlap the left rim, 44 px) · the rack becomes a **row of slots under the plate** (328 × 64: each lifted skewer is a short drawn stick with tokens 10 px, its box 44 × 44 under it — up to 5 slots of 64 px) · keys 2 × 5 (62 × 44) = 92 · Check 48. Budget: header 56 + 52 + 328 + 64 + 44 (boxes) + 92 + 48 + gaps 40 = **724 ≤ 740**. Find on phones: three plates stacked 328 × 110 (counters 16 px) → 56 + 52 + 40 + 330 + 48 + 24 = **550**. Big arrays on phones: tiles 28 px (10 × 28 = 280), rack slots 2 rows of 5.
**At 320 px:** pictures 56 px (5 × 56 + 4 × 2 = 288), keys 54 × 44 → **≈ 636 ≤ 640**.

**Library pictures** (identical instances, round and compact — things a child would believe on a skewer; checked on the fruits/vegetables contact sheets): fruits/strawberry, raspberry, blueberry, blackberry, kiwi (a cut half), lemon, apple, orange · vegetables/tomato. Not used: fruits/cherry (drawn as an apple), plum / peach / apricot / mango / persimmon / nectarine (read as apples or oranges), banana (curved), watermelon (a slice), grapefruit (a half). In the Find job and big arrays, drawn counters / tiles (never shrunken pictures — the picture-size ruling).

No words on the apparatus: numerals in the boxes and on the order card only.

## 5. The hand
- **Lift a skewer:** drag its handle-bead (or any fruit on it) to the right ≥ 24 px, or tap the bead → the whole row slides off the plate (220 ms), the fruit bobbing, and its stick drops into the next free rack slot (*shhk… tock*); its box appears. First motion within 60 ms. A drag up or down on a row-skewered plate does nothing but a 3-px wiggle of the whole skewer — a skewer only comes out along its own length.
- **Put back:** drag a rack skewer onto the plate (or tap it) → it slides back into its row (*tock*), its box disappears. Lifting is free and undoable.
- **Re-skewer:** tap the skewer pot → all skewers slide back onto the plate if any were out, pull out with a *zip* (300 ms), and new sticks push in from the other edge (300 ms); the fruit never moves. Allowed in Count and big arrays (either direction is right); in Build the plate is always skewered by rows (the order card's addend is the row).
- **Type:** tap a box, then digit keys; ⌫ deletes.
- **Build:** the row/column steppers add or remove a whole row (it slides in on its skewer, *pop-pop-pop* per fruit) or a whole column (one fruit is threaded onto the end of every skewer).
- **Find:** tap a plate → it rises 6 px with a teal outline.
- **Keyboard:** Tab → handle-beads (Space lifts / puts back) → skewer pot → boxes → keys → Check.

## 6. The rounds
**Count (2.OA.C.4; the 8 old arrays + 3 × 5):** 2 × 3 strawberry (6) · 3 × 4 raspberry (12) · 4 × 2 kiwi (8) · 2 × 5 lemon (10) · 3 × 3 apple (9) · 5 × 2 orange (10) · 4 × 4 blueberry (16) · 4 × 3 tomato (12) · 3 × 5 blackberry (15). (r × c = r rows of c.) Measured (`work-34/m138.js`, confirmed in `work-c34`): rows + columns 0/9, rows + columns − 1 0/9, rows × (columns − 1) 0/9; the "edge only" count (2r + 2c − 4) equals the total in 4/9 rounds — exactly the 2-row and 2-column plates, where every picture *is* on the edge, so it is right there anyway.
**Build (the same 9, given as sums):** 3 + 3 (2 rows of 3) · 4 + 4 + 4 · 2 + 2 + 2 + 2 · 5 + 5 · 3 + 3 + 3 · 2 + 2 + 2 + 2 + 2 · 4 + 4 + 4 + 4 · 3 + 3 + 3 + 3 · 5 + 5 + 5. The plate must be built as rows of the addend (the turned plate has the right total but lifts out as the wrong addends — §7).
**Find (G2-212)** — target · the three plates left → right · right plate:

| Target | Plates | Right |
|---|---|---|
| 3 rows of 4 (12) | **3 × 4** · 3 × 5 · 4 × 4 | 1st |
| 2 rows of 5 (10) | 2 × 4 · **2 × 5** · 3 × 5 | 2nd |
| 4 rows of 3 (12) | 3 × 3 · 4 × 2 · **4 × 3** | 3rd |
| 2 rows of 4 (8) | 2 × 5 · **2 × 4** · 3 × 4 | 2nd |
| 3 rows of 3 (9) | 2 × 3 · 3 × 4 · **3 × 3** | 3rd |
| 4 rows of 5 (20) | **4 × 5** · 4 × 4 · 3 × 5 | 1st |
| 2 rows of 3 (6) | 2 × 4 · 3 × 3 · **2 × 3** | 3rd |
| 5 rows of 2 (10) | **5 × 2** · 4 × 2 · 5 × 3 | 1st |
| 5 rows of 4 (20) | 4 × 4 · **5 × 4** · 5 × 3 | 2nd |

Measured (`work-34/pick138.js`, re-run by the critic in `work-c34`): right plate in each position **3 / 3 / 3**; the right plate is the smallest total 3×, the middle 3×, the largest 3×; every wrong plate differs by exactly one row or one column; no wrong plate is the turned-round target; counting only the rows, or only the columns, never singles out the right plate (each is shared by a wrong plate); no plate shares its total with another in the same round.
**Big arrays (G3-301/302/313; the tables 2–10, one fact of each per pass):** 7 × 2 (14) · 9 × 3 (27) · 10 × 4 (40) · 6 × 5 (30) · 4 × 6 (24) · 8 × 7 (56) · 6 × 8 (48) · 7 × 9 (63) · 5 × 10 (50) — all products distinct, rows + columns never equals the product; the second factor is the table (rows of it), so a pass touches every table 2–10. A "table" sub-pass (setting-free, from the round menu chip "only the table of {n}") draws the ten facts 1…10 × n in shuffled order for G3-364…368 / 402…405 (1 × n is one skewer — a legitimate fact, not a 0).
- **Answer position:** typed (count, build, big arrays); Find balanced as above.
- **Order:** order-only reshuffle per pass, never the same order twice; never two rounds with the same total in a row.

## 7. Check, the misses, the success
- **Check before lifting** (count) → "Lift out the skewers first." · **some skewers still on the plate** → "Keep going — every skewer comes out." · **a box empty** → "Fill every box." · **build with an empty plate** → "Use the buttons to add rows and columns." · **find with no plate** → "Tap a plate." (none are misses).
- **Count — unequal addends typed — miss 1:** the rack skewer whose box disagrees wobbles and its tokens ring one by one, left to right (no numbers) — **"Every skewer holds the same. Count this one again."** **Miss 2:** its tokens number themselves.
- **Count — total equals rows + columns (or − 1) — miss 1:** on the plate's outline, the first skewer's fruit and the end fruit of every other skewer glow, the middle outlines pulse — **"You counted the edges. The middle ones count too."**
- **Count — other wrong total — miss 1:** the rack skewers slide into one long line end to end, with a small gap at each join (no numbers) — **"Add one skewer at a time."** **Miss 2:** running totals appear at each join (4, 8, 12) — **"Count on skewer by skewer."**
- **Build — wrong shape — miss 1:** the built plate lifts its own skewers into the rack and the rack shows its addends next to the target ("3 + 3 + 3 + 3" under "4 + 4 + 4") — **"Your skewers hold {k} each. The sum wants skewers of {c}."** (if the turned plate: **"Same total, but the skewers go the wrong way. Each skewer must hold {c}."**) **Miss 2:** ghost outlines of the right plate appear over the grid.
- **Find — wrong plate — miss 1:** the chosen plate's skewers lift out one by one and its rows and columns are counted with small numerals on its edges — **"This plate has {r2} rows of {c2}."** **Miss 2:** every plate shows its row and column numerals.
- **Big arrays — wrong product — miss 1:** the skewers lift into the rack (no numbers) — **"{r} rows of {c}. Count the skewers of {c}."** **Miss 2:** running totals appear at each rack slot (the skip count of {c}).
- A new move takes the help away until the next Check.
- **Success:** the skewers slide back onto the plate one by one, the plate glows, the fruit waves corner to corner; bubble: **"{r} rows of {c}: {sum} = {total}. {r} × {c} = {total}."** (big arrays: **"{r} × {c} = {total}."**; skewered by columns: the sentence follows the skewers — "{c} columns of {r}: {r} + {r} + … = {total}").

## 8. Settings
1. **Job:** count · build · find — the plate at rest is full, empty with steppers, or three small plates.
2. **Size:** pictures up to 5 × 5 · big arrays to 10 × 10 (tiles) — library fruit at full size, or square tiles (the area look of G3-313).

## 9. Words (EN source)
- title (frozen) **Build an Array — Rows, Columns & Repeated Addition (Grade 2)** · instruction **"Every row is on one skewer. Lift them out — every skewer holds the same."**
- prompts, hints, success as in §4 and §7; settings **Job** — count / build / find · **Size** — up to 5 × 5 / big arrays.
- **Locale traps:**
  - **"skewer"** — the kitchen word a child knows: de *Spieß*, fr *brochette* (the stick: *pique*), es *brocheta*, it *spiedino*, pt *espetinho*, nl *spies*, sv *grillspett*, da *grillspyd*, no *grillspyd*, fi *varras* (partitive "varrasta" after numerals: "4 varrasta"). The word appears in hints and the instruction only, never on the stage.
  - **Multiplication glyph:** × in en/es/fr/it/pt/nl, **·** in de/sv/da/no/fi (the G3-358 convention) — in the rack's success line and the big-array prompt.
  - **"r rows of c"** is the phrase for r × c in every locale (de "3 Reihen mit je 4", fr "3 rangées de 4", es "3 filas de 4", it "3 righe da 4", pt "3 fileiras de 4", nl "3 rijen van 4", sv "3 rader med 4", da "3 rækker med 4", no "3 rader med 4", fi "3 riviä, joissa kussakin 4" — partitive after the numeral). The factor order (first = number of rows = number of groups) is the school convention in all 11; the column-skewered plate is always accepted in Count and big arrays.
  - "rows / columns": de Reihe/Spalte, fr rangée/colonne, es fila/columna, it riga/colonna, pt fileira (linha)/coluna, nl rij/kolom, sv rad/kolumn, da række/kolonne, no rad/kolonne, fi rivi/sarake — the school words, matching the frozen titles (de "Reihen mal Spalten", sv "rader").
  - Numerals only; no number words; no fruit noun after a number in the sentences (the picture is the noun), so the only agreement is the row / skewer word.

## 10. Sound off, access, phones
- Legible with the sound off: skewers slide out, the rack fills, boxes appear; *shhk* and *tock* are bonuses.
- aria: plate "{r} rows of {c}"; handle-bead "Skewer {i} — lift out" / "put back"; skewer pot "Skewer the other way"; boxes "Skewer {i}"; plates (find) "Plate {i}: {r} rows of {c}".
- Taps: handle-beads 44, skewer pot 56, steppers 44, keys ≥ 48 × 44, plates full size.
- Pictures 96 px at 704, 64 px at 360 (56 at 320) on the plate; rack tokens, counters and tiles are drawn tokens (never tapped as content).
- Check above the fold: 724 at 360 × 740, ≈ 636 at 320 × 640.

## 11. Distinct from
- **Baking Tray** (premium tool #46: ROTATE the tray, CRACK it along one seam into two blocks of known facts, PUSH them back — 3.OA.B.5) — nothing here cracks, turns or pushes; the plate never moves, a row is lifted whole on its stick, and the skewers change direction while the fruit stays put. (This row's first draft, the "Snap Tray", was a copy of Baking Tray's three moves and was replaced by the critic.)
- **New 291 The Turntable** (3.OA.B.5: the table turns under fixed row rails, 3 rows of 5 become 5 rows of 3) — commutativity by turning; here re-skewering is a side move inside a repeated-addition activity and the plate never turns.
- **New 305 The Tile Roller** (3.MD.C.7.a: one pass of a roller lays one row of tiles) — making rows by laying; here a finished array is taken apart row by row.
- **Row 139 The Accordion Sentence** (2.OA.C.4: the adding sentence on pleats that only fold shut when all the same height) — the equal-groups sentence is the object; here the array is the object and the sentence is its skewers.
- **Row 192 The Echo Grove** (3.OA.A.1: a call of beads on a pole, echoes copy it) — making equal groups by copying; here the groups are found by lifting rows out of a given array.
- **New 292 The Pouring Frame** (3.OA.B.6: counters pour into a frame of fixed rows to find a missing width) — division / missing factor; no skewers, no repeated-addition rack.
- **Folding Wall** (tool: put away known tables) — fact inventory, no array. **Row 170 The Stamp Sheet** (2.G.A.2: perforate a rectangle into same-size squares) — partitioning a shape. **New 293 The Table Ladder** — derived facts on a ladder. **Row 268 The Dealing Tray** (this batch) — parts of a set by dealing, fractions.

## 12. Build plan
- **Core state:** `{ job, size, r, c, picture, dir: 'rows' | 'cols', lifted:[skewerIndex…], boxes:[…], total, build:{r,c}, trays:[3], chosen }`. Functions: `lift(i)` / `putBack(i)` (a skewer is the whole row or column in `dir`), `reskewer()` (puts all back, flips `dir`; fruit positions unchanged), `pieces()` (the lifted skewers' lengths), `type(box, d)`, `step(axis, ±1)`, `pick(i)`, `check()` → `{ ok, kind: 'notLifted' | 'partly' | 'emptyBox' | 'unequal' | 'edges' | 'total' | 'shape' | 'turned' | 'tray' }`.
- **The gate's own ground truth (`verify-skewer-plate-core.js`):** every skewer holds exactly c (rows) or r (columns) pictures; no partial skewer can exist; `reskewer` never changes a picture's cell; the sum of boxes equals r·c for the right answer; edge detection flags exactly r + c and r + c − 1; Count: rows + columns ≠ total in all 9; Find: positions 3/3/3, size ranks 3/3/3, no transposed distractor, distractors one row or column off, rows-only / columns-only never unique, totals distinct within a round; big arrays: products distinct, every table 2–10 present, no 0 fact in the table sub-pass; Build accepts only r rows of c (the turned plate → 'turned'); every picture file exists on disk and no B&W theme is referenced.
- **Mutations:** let a skewer lift part of a row · accept unequal addends · accept rows + columns · put the turned target among the Find plates · put the right plate always first · make the right plate always the biggest · accept a turned plate in Build · let big arrays repeat a table · show running totals at miss 1 · let `reskewer` move the fruit.
- **Local test:** real drags on the handle-beads (lift, put back) and skewer-pot taps at 320·360·412·704·768·1024·1366, all rounds, 11 locales; assert pictures ≥ 64 px at 360 / 96 px at 704 (`data-pic`), handle-beads ≥ 44, the 5-slot rack fits beside the plate at 704 and under it at 360, Check above the fold.
- **Pictures verified on contact sheets:** fruits (strawberry, raspberry, blueberry, blackberry, kiwi, lemon, apple, orange — all read as themselves at 64 px), vegetables/tomato. **Risks:** the skewer must read as a stick through the fruit, not a line behind it — draw it behind the pictures with its two ends showing, and the visual critic confirms at 360. Nothing BLOCKED.

## 13. The four questions
1. **Would a 5–8-year-old choose it again?** Yes — sliding kebabs off a plate, a rack that fills up, re-skewering the other way with a *zip*, and kebabs sliding home at the end.
2. **Would a teacher put it on the board?** Yes — equal rows → equal addends → multiplication, with the rows-plus-columns error shown on the plate itself, and the same plate reaching up to the grade-3 tables and area.
3. **Would a parent trust it?** Calm, library fruit at full size, numerals only, no timer.
4. **The invention:** every row of the array is threaded on one skewer, so a row can only come out whole — and the skewers lined up in the rack are the repeated addition.

## 14. Critic review (2026-10-17)
Scores before → after: invention 4→5 · fun 5→5 · completeness 4→5 · correctness 5→5 · distinctness 1→5 · reality 4→5
What changed:
- **The invention was replaced.** The "Snap Tray" (crack along a groove, turn with a handle, push back together) was premium tool Baking Tray's three moves exactly — a copy of a premium interaction. Now THE SKEWER PLATE: every row is on a skewer, so a row is lifted whole; the skewers in the rack are the repeated addition; re-skewering changes direction while the fruit never moves.
- Pictures changed to round fruit a child believes on a skewer (strawberry, raspberry, blueberry, blackberry, kiwi, lemon, apple, orange, tomato); toys/cupcakes/cookies removed. The rack draws lifted skewers as tokens (no picture shrinks below the floor).
- Re-measured every table with my own scripts (`work-c34`): Count rows + columns 0/9; Find positions 3/3/3, total ranks 3/3/3, rows-only / columns-only 0/9, no transposed distractor, all distractors one row/column off, totals distinct; big arrays products distinct.
- §11 corrected: New 292 is The Pouring Frame (not "Array Frame"); added Baking Tray, 291 Turntable, 305 Tile Roller, 139 Accordion Sentence and 192 Echo Grove with the difference stated.
- Locale trap added for the skewer word (fi partitive "varrasta").
