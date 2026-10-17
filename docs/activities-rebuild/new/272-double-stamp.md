# New 272 — The Double Stamp: one press prints a picture worth two — and the row unfolds back into its ones to prove it (3.MD.B.3)

## 0. Identity
- **id** `double-stamp.play.3-md-b-3` · grade 2 (scaled graphs are taught in Grade 2–3; CCSS 3.MD.B.3) · strand Measurement & Data · key `double-stamp` → `double-stamp-core.js`, `double-stamp-activity.js`, `double-stamp-activity.html`, `double-stamp-activities.json`. Start with `node scripts/new-activity.js --num=272`.
- **Worksheets covered:** G2-238 "Each Picture Counts Double" (pictograph, scale 2, write the real count per row) · G3-333 "Each Picture Means 5" (pictograph, scale 5) · G3-332 "Big Scale Bars" (bar graph, scale 5, read each bar) · G3-334 "Build the Graph" (from a table, colour the bars).
- **Merged:** grade-3 "The Value Bricks" — becomes the **bars** graph setting: bricks stamped with the scale (2, 5 or 10) build each column to the table value; a half-brick exists only where the scale needs it (2 → 1, 10 → 5; never for 5); read mode types each bar's value; the miss counts up by the scale.
- New instrument; no old activity.

## 1. The pitch
"Each press of the stamp prints one picture that is worth two — so seven needs three presses and the half-stamp; and when you are done, pull the row's tab and the pictures unfold back into the ones they stand for, along a number track, so you can see whether your row really reaches seven."

## 2. Why a child will want it again
- **A rubber stamp with a key on its handle.** The stamp (drawn apparatus — a wooden handle, a rubber foot) carries the key card on its side: the row's picture and "= 2". Press it on a row and it prints the picture with a satisfying *thump* (the board shakes 2 px, an ink ring spreads and fades). A second, smaller **half-stamp** prints the left half of the picture (cut on a straight vertical edge) for 1.
- **The unfold — the toy part.** Every row ends in a pull-tab. Pull it and the row's pictures **unfold like a paper concertina** into small ones-tokens (each picture into 2 or 5 cream counters, the half into 1) that fall in a line along a number track under the row. The last token lands on the track's number — the row's true count — and if it overshoots or falls short of the table's value, the track shows the gap in coral. Folding back up is just as fun (tap the tab).
- **The bricks clack.** In the bars graph, bricks stamped "5" (or "2", "10") slide up a column and click onto each other; the axis beside counts by the scale.
- **The end-of-round show:** every row unfolds at once in a ripple from top to bottom, the tokens dance down to the track, and then fold back into pictures while the key card glows.
- **Free play:** after each round any row can be stamped on, unfolded and folded.

## 3. The skill and the misconception
- **Skill:** read and make a pictograph whose key says each picture stands for 2 (half a picture = 1) or 5; read and build a bar graph whose scale counts by 2, 5 or 10 (3.MD.B.3; G2-238, G3-332/333/334).
- **Misconception 1 — counting pictures as ones** (a row of 4 pictures read as 4, not 8). **Pushback:** the unfold turns 4 pictures into 8 tokens that reach 8 on the track; in make mode, stamping 7 pictures for a "7" row overshoots — the unfold runs to 14 and the 7 extra tokens fall past the table's mark in coral.
- **Misconception 2 — not knowing what half a picture means.** **Pushback:** the half-stamp prints exactly half a picture and unfolds into exactly one token; an odd count can *only* be printed with it, and a whole picture where a half is needed overshoots by one token — one coral token past the mark.
- **Misconception 3 — reading the bar's top as a count of bricks or reading the axis by ones** (a bar of 7 five-bricks read as 7). **Pushback:** the axis numbers beside the column count by the scale (5, 10 … 35) and the unfold drops 35 tokens in tens-rows onto the track.

## 4. The stage
**At 704 px (split: board left 500 px, table + key column right 180 px):**
- **Task line** (≤ 24 px) — make: **"Use the table. Stamp each row to show its number."** · read: **"Each picture stands for {k}. How many in each row?"** · bars make: **"Use the table. Build each bar with bricks."** · bars read: **"Each brick stands for {k}. What is each bar worth?"**
- **The board (pictograph):** 3 or 4 rows, each 64 px high with 16 px gaps: a row label = the library picture at **96 px** on the left (labels are full size); the row track 360 px long where printed pictures sit as **data marks at 44 px** (the data-mark ruling: ≥ 40 at 704, ≥ 30 at 360) with 4 px gaps — 8 marks max (16 ÷ 2, 40 ÷ 5) = 8 × 48 = 384 px → the track is 390 px. A pull-tab (28 × 44 px, a drawn paper tab) at each row's right end. Under each row, folded away, a thin number track (0 to the level's max, numerals every 2/5/10) that appears only during an unfold.
- **The key card** (right column top, 160 × 96): the picture at 64 px, "= 2" (or "= 5") in 28 px; in read mode also a half picture "= 1" when the key is 2.
- **The table** (right column, make modes): rows of picture (40 px data-mark size) + numeral (22 px) — the counts to show.
- **The stamps** (make): the stamp 72 × 88 and the half-stamp 52 × 72 standing in an ink tray under the board; the stamp's foot shows the current row's picture.
- **Answer tags** (read): a 64 × 48 box at each row's right end (before the tab) with a shared keypad 0–9 ⌫ under the board (keys 52 × 52); the focused box has a teal ring.
- **Bars graph:** the board widens to 560 px and the right column narrows to 120 px. 3–4 columns 64 px wide and 320 px tall, each above its library picture label at **96 px** (4 × 96 + 3 × 24 = 456 px). A y-axis on the left with numerals at every brick height, counting by the scale, up to the level's max (20 / 50 / 100). Bricks are 64 × 30 px coral blocks stamped with the scale in white 16 px; a half-brick is 64 × 15. The brick bin (bricks, and half-bricks only when the scale is 2 or 10) sits right of the axis.
- No words on the apparatus.

**At 360 px (stacked):** rows: label picture 64 px, data marks 30 px with 1 px gaps (8 marks = 248 px) → 64 + 6 + 248 = 318 px within the 328 px content width; there is no room for a separate tab, so at ≤ 480 px **the row's label picture is the pull-tab** (drag it right or tap it to unfold; it wears a small drawn tab corner); key card and table become a strip above the board (table: picture 30 px + numeral 18 px per row, in one line); stamps 60 × 72 / 44 × 60 under the board; keypad full width (56 × 46). Bars: 4 columns 56 px wide under labels at 64 px (4 × 64 + 3 × 8 = 280 px + axis 36 px = 316 ✓), column height 240 px (10 bricks × 24 px; half 12). Budget 360 × 740: header 56, task 52, table strip 56, board 4 × 80 = 320, stamps or keypad 104, Check 52 → 640. At 320 × 640: data marks stay 30 px with 2 px gaps (8 × 32 = 256 px) and row labels shrink to the 64 px floor, so a row is 64 + 256 = 320 px — the full width with no gutter; therefore at ≤ 340 px the label moves ABOVE its row as a 64 px picture at the row's left with the marks line (34 px) under it, and the stamps sit in one 52 px row beside Check. Budget for a 4-row round: header 56 + task 40 (one line, `instructionShort`) + key/table strip 48 + board 4 × 100 = 400 + stamps/Check row 52 → 596 px ✓.

## 5. The hand
- **Stamp (make):** tap a row (or drag the stamp onto it) — the stamp lifts (80 ms), thumps onto the next free mark place (120 ms), and prints a whole picture; the half-stamp prints a half. Each print = one press; a tap on the last print in a row lifts it off (undo, 100 ms). A half can only be the LAST print in a row (pressing another stamp after a half moves the half to the end — it never sits in the middle).
- **Build (bars make):** drag a brick (or tap the column) — it slides up the column and clicks on top (140 ms); drag/tap the top brick to remove; the half-brick only in the bin when the scale is 2 or 10.
- **Type (read):** tap a row's box (or Tab), type, the next box gets focus on Enter.
- **Unfold:** drag a row's tab to the right (or tap it) — the pictures unfold left to right (each picture's tokens spill out in 160 ms), tokens drop onto the row's number track and line up from 0; the last token's number lights. Picture = 2 rows (≤ 16 tokens) lie in one line of 9 px tokens; **picture = 5 rows (up to 40 tokens) lie in groups of five** (a 5-gap after each group, so 35 reads as seven fives on the track whose numerals count 5, 10 … 40) — never 40 loose dots. Tap the tab again to fold back. Bars: pull the column's tab (a small tab under the column) and the bricks unfold into tokens laid in rows of ten beside the column.
- **Check:** every row unfolds automatically (the truth), then the judgement is given.
- **Keyboard:** ↑/↓ choose a row, S = stamp, H = half-stamp, Backspace = lift the last print, U = unfold; digits in read mode.

## 6. The rounds
Rows are distinct library pictures from one theme per round: fruits (`apple`, `banana`, `pear`, `strawberry`, `lemon`, `orange`, `pineapple`), animals via `farm-animals` (`cow`, `pig`, `sheep`, `horse`, `goat`, `rabbit` — never chick + duck, never hen + chicken, never calf), toys (`car`, `boat`, `train`, `robot`, `kite`, `dinosaur`, `truck`, `rocket`). The dossier's "sports" theme does not exist in the library and is not used. Counts per row (top to bottom; the round's pictures are shuffled onto the rows each pass):

| level | rounds |
|---|---|
| picture = 2 (make and read) | 7, 10, 4, 13 · 6, 11, 16, 3 · 9, 4, 12 · 14, 5, 8, 11 · 2, 15, 10, 7 · 12, 9, 6 · 5, 16, 13, 8 · 11, 8, 3, 14 |
| picture = 5 (make and read) | 15, 30, 10, 25 · 20, 5, 35 · 40, 15, 25, 10 · 30, 20, 5, 35 · 10, 35, 20 · 25, 40, 15, 30 · 5, 20, 30, 15 · 35, 10, 25, 40 |
| bars, brick = 2 | 7, 12, 4, 15 · 10, 3, 16 · 13, 8, 18, 5 · 6, 11, 2, 9 · 17, 14, 8 · 4, 19, 12, 7 · 11, 6, 15, 20 · 9, 16, 3, 12 |
| bars, brick = 5 | 15, 35, 20, 40 · 25, 10, 45 · 30, 5, 50, 20 · 45, 15, 35, 25 · 10, 40, 30 · 20, 50, 15, 35 · 35, 25, 5, 45 · 40, 30, 10, 15 |
| bars, brick = 10 | 35, 60, 20, 85 · 50, 15, 90 · 70, 45, 30, 95 · 25, 80, 55, 40 · 65, 10, 75 · 90, 35, 60, 20 · 100, 45, 70, 15 · 30, 85, 55, 60 |

- **Measured (`work-32/stamp.js`):** 8 rounds per level, 2 with three rows and 6 with four; no two rows equal in a round; never 0; every "= 2" round and every brick-2 / brick-10 round has at least one value that needs the half (odd / ends in 5) — 8 of 8; "= 5" and brick-5 values are multiples of the scale (no half exists there); the most marks in any row = 8 (pictographs) and 10 (bars), matching the board.
- **Answer position:** the biggest row sits in each of the four row positions 2/2/2/2 (= 2), 1/3/2/2 (= 5 and bars by 2), 2/2/2/2 (bars by 5), 2/2/2/2 (bars by 10); in 3-row rounds the slots are 1–3. Values stay with their rows (the table is the round), the pictures are re-dealt onto the rows every pass. In read mode every row is asked — there is no "which row" to guess.
- **Order:** order-only reshuffle per pass, never the same order twice.

## 7. Check, the misses, the success
- **Check with an empty row** (make) or an empty box (read) → that row pulses; **"Every row needs its number."** (no miss).
- **Miss 1 — the prints count up by the key:** under each print in the wrong row(s) a small numeral appears counting by the key (2, 4, 6, 7) — the half's numeral one more than the last whole; bars: the axis numerals beside the wrong column light up brick by brick to its top. EN **"Each picture is {k}. Count by {k}s along the row."** (bars **"Each brick is {k}. Count up the bar by {k}s."**)
- **Miss 2 — each print splits into its units:** the wrong row stays unfolded with its tokens grouped under their pictures (two under each picture), the table's number marked on the track with a flag, and the extra or missing tokens coral. EN make **"Your row makes {made}. The table says {target}."** · read **"Count the counters: the row makes {value}."**
- A new stamp, brick or digit takes the help away until the next Check.
- **Success:** the ripple unfold-and-fold show (§2), the row totals pop at the row ends, the key card glows. EN **"Every picture is {k} — your graph is right!"** (read **"{a}, {b}, {c} — you read every row!"** built from the row values).

## 8. Settings
1. **Mode:** make the graph (default) / read the graph — stamps and table vs answer boxes, visible at rest.
2. **Graph:** picture = 2 (default) / picture = 5 / bars by 2 / bars by 5 / bars by 10 — the key card, the stamps or bricks and the axis change at rest; each option plays its own table in §6.

## 9. Words (EN source)
- title **"The Double Stamp"**
- instructions (four, §4) + `instructionShort` for 320 px: **"Stamp each row."** / **"How many in each row?"** / **"Build each bar."** / **"What is each bar worth?"**
- hints **"Every row needs its number."** · **"Each picture is {k}. Count by {k}s along the row."** · **"Each brick is {k}. Count up the bar by {k}s."** · **"Your row makes {made}. The table says {target}."** · **"Count the counters: the row makes {value}."**
- celebrations **"Every picture is {k} — your graph is right!"** · **"{list} — you read every row!"**
- settings **"Mode"**: "make the graph" / "read the graph" · **"Graph"**: "picture = 2" / "picture = 5" / "bars by 2" / "bars by 5" / "bars by 10"
- key card text: only "= 2", "= 5", "= 1" (numerals and the equals sign — no words).
- **Locale traps:** (a) **"pictograph / picture graph"** — de *Bilddiagramm*, fr *pictogramme*, es *pictograma*, it *pittogramma / ideogramma*, pt *pictograma / gráfico pictórico*, nl *pictogram / beeldgrafiek*, sv *stapeldiagram med bilder / bilddiagram*, da *piktogram*, no *piktogram / søylediagram med bilder*, fi *kuvadiagrammi* — the instruction avoids the term and says "row" and "picture". (b) **"stands for"** — de *steht für*, fr *vaut / représente*, es *vale*, it *vale*, pt *vale*, nl *staat voor*, sv *betyder / är värd*, da *står for*, no *står for*, fi *tarkoittaa / on* — author the key sentence natively; fi needs the partitive in "Each picture stands for {k}" only if a noun follows (it does not). (c) **"bar graph"**: es *gráfica de barras* (es-MX) vs *diagrama de barras*; author per locale. (d) **halves:** "half a picture" is never in the prose (the half-stamp is wordless) — avoids fr *une demi-image* agreement and fi *puolikas kuva* case issues. (e) Numbers ≤ 100, no separators.

## 10. Sound off, access, phones
- Sound off: the thump and ink ring, the unfold, tokens landing on the track, coral overshoot — all visible.
- Keyboard path §5; aria: row `"row {picture}: {n} whole pictures and {half? 'one half'}"`; track after unfold `"{value} counters"`.
- Taps: rows ≥ 64 px tall, tabs 24–28 × 44, stamps ≥ 44 px, keys ≥ 46 × 44. Pictures: labels 96 px at 704 / 64 at 360; data marks 44 / 30 px (graph data-mark ruling).
- Check above the folds (§4 budgets, incl. the 320 decision).

## 11. Distinct from
- **class-graph (tool):** the class votes, one child one picture, pictures become bars — scale 1. **New 254 Catch-Up Cubbies:** "how many more" in a scale-1 picture graph with ghosts. **Row 35 Sorting Chutes:** sorting into tubes that make a graph (scale 1).
- **Row 170 The Stamp Sheet / New 285 The Ink-and-Stamp Press (designed):** a press that prints one square into every perforated piece (area), and a fold that prints wet ink onto its mirror (symmetry) — the stamp checks a shape, it carries no value. **Row 23 The Stamp Frame / Row 108 The One-Piece Stamp (designed):** stamps that print dots on a ten-frame or copy a piece to test equal parts. Here the stamp's own *value* is the content (one press = 2), the half-stamp is the odd count, and the proof is the unfold into ones — none of those mechanics are used there.
- **Batch siblings:** 270 (money bar), 271 (weights) — different quantities; here the unit of the graph itself changes.

## 12. Build plan
- **Core state:** `{ mode, graph, k, rows:[{key, target, prints:[1|0.5], typed}], unfolded:{row:bool} }` (bars: `bricks:[1|0.5]` per column).
- **Functions:** `stamp(row, half)`, `lift(row)`, `rowValue(row)` = k × (wholes + 0.5 × halves), `canHalf()` (k = 2 or bars k ∈ {2, 10}), `unfold(row)` → token count = rowValue, `check()` (make: rowValue = target per row; read: typed = target).
- **Gate's own truth (`verify-double-stamp-core.js`):** independent recount of every table; ≥ 1 half-needing value per round where halves exist; no half at k = 5; max marks ≤ 8 (pictographs) / 10 (bars); no equal rows; no 0; a half can only be last; unfold token counts equal values; biggest-row position ≤ 3 of 8 per slot per pass after the brick-10 rotation; pictures from the allowed lists only.
- **Mutations (each killed):** rowValue counts pictures as ones · half worth k/2 at k = 5 (2.5) · half allowed mid-row · unfold tokens = number of prints · axis numbered by ones · a round with two equal rows · a half-needing round missing at k = 2 · read mode asks only one row · chick and duck in one round · same order twice.
- **Pictures verified on contact sheets:** fruits, toys, farm animals listed above. The half-picture is the library picture clipped by a straight vertical cut at 50 % of its ink box (computed from the image's alpha bounds, not the canvas) so a half reads as half. **Risks:** the 320 four-row layout (decided in §4). Nothing blocked.

## 13. The four questions
1. **Choose it again?** Yes — a thumping stamp, a half-stamp, and a row that unfolds into counters like a paper concertina.
2. **Teacher on the board?** Yes — the scale is no longer a sentence on a key card; overshooting by stamping ones is something the row itself shows by unfolding past the table's number.
3. **Parent trust?** Library fruits, animals and toys, numerals only, calm, no timer.
4. **Invention:** each press prints a picture worth two (half a press, one), and pulling the row's tab unfolds every picture back into the ones it stands for along a number track.

## 14. Critic review (2026-10-17)
Scores before → after: invention 5→5 · fun 5→5 · completeness 4→5 · correctness 5→5 · distinctness 4→5 · reality 5→5
What changed:
- All five tables re-solved by my own script (`work-c32/stamp.js`): 8 rounds per level, 2 three-row; no equal rows, no 0; every "= 2", brick-2 and brick-10 round needs a half (8/8), no value at k = 5 needs one; max marks 8 (pictographs) / 10 (bars); biggest row 2/2/2/2 or 1/3/2/2 across slots — every claim held.
- The unfold for picture = 5 rows (up to 40 tokens) now lands in groups of five on a track counting by 5 — 40 loose dots would have shown the ones and hidden the scale.
- Distinctness made explicit against the other designed stamps (Row 170 Stamp Sheet, New 285 Ink-and-Stamp Press, Row 23, Row 108): only here does one press carry a VALUE, and only here does a row unfold back into its ones.
- Pictures re-checked on the toys / fruits / farm-animals contact sheets: every row label exists and reads as itself; the half-picture cut on the ink box keeps a half recognisable.
