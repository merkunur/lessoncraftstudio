# Row 202 — Sprout's Patchwork Meadow → THE WATERING ROUND: the can waters every square once, so bare soil and doubled patches show themselves (3.MD.C.6)

## 0. Identity
- **id** `patchwork-meadow.tile.3-md-c-6` (KEPT; slug/title/intro frozen en..nl; sv/da/no/fi get new metadata at build, grade 3) · grade 3 · CCSS 3.MD.C.6 (also 3.MD.C.5) · Measurement & Data · own files `patchwork-meadow-core.js` (rewritten), `-activity.js`, `-activity.html`, manifest row.
- **Worksheets covered:** G3-313 "Count the Squares" (count the squares; the rectangle bed's watering round counts row by row and the success sentence gives rows × columns).
- **What the old activity did:** cover irregular beds with moss squares, repair a cover with a gap and a double, choose an area estimate from three numbers, finish a partial bed, build a bed of an exact size. **Kept:** every round kind and every bed from the old table (flowerbed, staircase, cross, repair bed, L-pond, L-bed, zigzag, big staircase, build-6, build-5), the moss patches, the "no gaps, no overlaps" rule, Sprout the gardener. **Replaced:** the three estimate cards (the live answer was the middle number of the three in both estimate rounds — {9, 6, 5} → 6 and {9, 5, 4} → 5 — a "pick the middle" tell; now the prediction is typed), the drawn Sprout placeholder (now `occupations/gardener`), and the check: instead of a verdict, the watering round.

## 1. The pitch
"When the bed looks covered, send Sprout's watering can round it: it waters each square once and numbers it — a bare square turns into a mud puddle, a doubled patch gets washed off onto the path, and the last number is the bed's area."

## 2. Why a child will want it again
- **Sweep-laying moss.** Put a finger on the bed and sweep: every empty square the finger crosses gets a moss patch that drops in with a soft "pff" (60 ms, a 4 px bounce). Long strokes carpet a bed in a second; a tap lifts a single patch back off. It feels like painting with turf.
- **The watering round (the show).** Press Check: the can glides along the rows in reading order, a little arc of water drops on each square (180 ms per square), the moss brightens and the square's number pops (1, 2, 3…). Bare soil gives a brown splash and a puddle that stays; a doubled patch wobbles and slides off onto the stone path. On a rectangle bed the running total pops at the end of each row (4… 8… 12).
- **Sprout's quilt (end of pass):** all the beds of the pass, watered and numbered, slide together into one patchwork map — each bed tagged with its area — and Sprout's picture stands beside it.
- **Free play:** the bed stays live after the round; sweep, lift, water again.

## 3. The skill and the misconception
- **Skill:** a plane figure covered without gaps or overlaps by n unit squares has area n square units (3.MD.C.5–6), measured by covering and counting, including shapes with no single length × width (L-shapes, staircases, crosses); predicting an area from the edge marks; finishing a cover by counting on from what is laid; building a figure of a given area.
- **Misconception 1 — gaps don't matter** ("it's nearly covered"). **Pushback:** the can cannot water bare soil without making a puddle, and the numbering skips it: the last number is short of the bed.
- **Misconception 2 — overlapping patches still count** (counting patches, not squares). **Pushback:** in repair rounds the bed carries a doubled patch; the can numbers the square once and the extra patch is washed off onto the path — 7 patches, 6 squares.
- **Misconception 3 — area = the bed's length × width even for an L or a staircase** (the bounding box). **Pushback:** predict rounds give only edge marks; the child who multiplies the outside (3 × 3 = 9 for the L-bed) covers it and the can stops at 5.
- **Misconception 4 — count only the new patches** when finishing. **Pushback:** the can numbers the laid patches first, then the new ones; the last number is the whole bed.

## 4. The stage
**Layout: stacked at every width** (layout check 2026-10-17: no `layout:'split'` — its stage column is only ≈ 370 px at 704, too narrow for this apparatus). The stage takes the full card width, ≈ 648 px at 704 (≈ 656 at 1024); whatever §4 places in a left, right, side or bubble column stays side by side inside the stage when the activity draws it, while the shell's bubble, keypad and Check sit under the stage. Sizes written for a wider stage fit the 648 px by closing margins and gaps first; no picture drops below 96 px, no tap below 44, no data mark or grid cell below 40.

**At 704 px (stacked: garden left 470 px, Sprout + bubble right 210 px):**
- **Task line** (20 px) per kind, §9.
- **The garden:** a stone path (grey cobbles, drawn) around a soil bed (warm brown) whose outline is a 3 px dark edge; cell size **64 px** for beds up to 5 squares wide (the 5 × 5 staircase is 320 × 320), faint cell lines (setting "squares shown") or only tick marks on every straight edge (setting "edge marks only" and always in predict rounds).
- **The moss:** patches are drawn rounded squares in two greens with a darker 2 px rim and a stipple; a doubled patch sits 6 px askew on top of another with a shadow so it reads as two.
- **The watering can** (drawn: 72 × 56, spout, tilt) rests at the bed's top-left corner.
- **Build rounds:** a wooden frame (garden plot) of 3 × 3, 2 × 4 or 4 × 5 squares on the path; the child lays a bed of the given size anywhere inside it.
- **Right column:** Sprout = `occupations/gardener` at **96 px**; the bubble (18 px); the answer box 110 × 60 with "square units" printed under it as the unit chip; keypad 3 × 4 keys 56 × 52; Check 140 × 56.
- No words on the apparatus; numbers on watered squares are numerals (Baloo 2 22 px).

**At 360 px (stacked):** task 2 lines; garden full width, cells **52 px** (5 wide = 260 px; the 4 × 5 build frame 208 × 260); Sprout 64 px inline with the bubble; answer box 96 × 52, keypad 4 × 3 keys 76 × 46, Check full width 52 px. Budget 360 × 740: header 56 + task 48 + garden ≤ 290 + Sprout/bubble 70 + answer/keys 150 + Check 52 = 666 ✓. 320 × 640: cells 46 px (≥ 44 tap), garden ≤ 250, keys 70 × 44 → 600 ✓.

## 5. The hand
- **Sweep:** pointerdown inside the bed starts laying; each empty cell the pointer enters gets a patch within 16 ms (60 ms drop). Covered cells and path cells are ignored while sweeping, so sweeping can never create a double. Keyboard: arrow keys move a cursor square; Space lays/lifts.
- **Lift:** a tap on a single patch (no sweep) lifts it (it hops off and fades, 120 ms). In repair rounds a tap on a doubled patch lifts the top one.
- **Type:** keypad, ≤ 2 digits.
- **Check = water:** the can tilts and glides cell to cell in reading order (top row left → right, then the next row), 180 ms per cell; numbered squares stay numbered until the next change.
- **Build rounds:** sweeping works inside the frame only; the shape is free (any connected bed — the core checks edge-connection, §12).
- **Undo:** lift; ⌫.

## 6. The rounds
Beds as rows ('1' bed square, '.' path). Repair `pre`: '1' one patch, '2' a doubled patch, '0' bare. Finish `pre`: '1' laid, '0' to lay.

**Beds up to 10 squares (default), 13 rounds:**
1. Cover — flowerbed `11,11,11,1.` → **7**
2. Cover — staircase `1..,11.,111` → **6**
3. Cover — cross `.1.,111,.1.` → **5**
4. Repair — bed `111,111`, pre `101,122` (one bare square, two doubles: 7 patches) → **6**
5. Repair — L-pond `11.,111`, pre `10.,102` (two bare squares, one double: 4 patches) → **5**
6. Predict — L-bed `111,1..,1..` (edge marks only) → **5**
7. Predict — T-bed `111,.1.` → **4**
8. Finish — zigzag `.11,111,11.`, pre `.10,111,00.` (4 laid, 3 to lay) → **7**
9. Finish — big staircase `1...,11..,111.,1111`, pre `0...,00..,111.,1111` (7 laid, 3 to lay) → **10**
10. Build — frame 3 × 3, make a bed of **6**
11. Build — frame 2 × 4, make a bed of **5**
12. Cover — rectangle bed 4 across × 2 down → **8** (the can pops the row totals 4, 8)
13. Predict — rectangle bed 3 × 3 (edge marks only) → **9** — the one predict bed where "rows × squares in a row" IS the answer, set beside the L-bed and T-bed where the outside measure fails: multiplying works for a rectangle, and only for a rectangle (G3-313)

**Beds up to 20 squares, 10 rounds:**
1. Cover — big L `111..,111..,11111,11111` → **16**
2. Cover — rectangle 4 × 3 → **12** (row totals 4, 8, 12)
3. Cover — E-bed `111,1..,111,1..,111` → **11**
4. Repair — rectangle 5 × 3, pre `11011,21111,11110` (two bare, one double: 14 patches) → **15**
5. Predict — staircase `1....,11...,111..,1111.,11111` → **15**
6. Predict — plus `.11.,1111,1111,.11.` → **12**
7. Finish — `1111,1111,11..,11..`, pre `1111,1111,00..,00..` (8 laid, 4 to lay) → **12**
8. Cover — T-bed `11111,.111.,.111.` → **11**
9. Build — frame 4 × 5, make a bed of **14**
10. Predict — rectangle bed 5 across × 4 down (edge marks only) → **20** (row totals 5, 10, 15, 20 when watered)

**Measured (`work-38/geo.js`, every mask re-counted by the critic):** the patch-count bot (count every patch, doubles included) is wrong in all 3 repair rounds (7≠6, 4≠5, 14≠15); the bounding-box bot (outside length × width) is wrong in all 4 irregular predict rounds (9≠5, 6≠4, 25≠15, 16≠12) and right — by design — in the 2 rectangle predict rounds (3 × 3, 5 × 4), so "always multiply the outside" scores 2 of 6 and "never multiply" scores 4 of 6: only looking at the shape works; the edge-sum bot (length + width) is wrong in all 4 (6, 5, 10, 8); the perimeter bot is wrong in all 4 (12, 10, 20, 16); the "only the new patches" bot is wrong in all 3 finish rounds (3, 3, 4). Areas are never 0.
**Answer position:** every answer is typed (or built), so there is no position. **Order:** order-only reshuffle per pass, never the same order twice.

## 7. Check, the misses, the success
- **Check with an empty answer box** (Cover/Repair/Finish/Predict) → the box pulses; **"Type how many squares cover the bed."** (no miss). **Predict, bed still bare after typing** → the prediction is pinned on a little stake and the task line's second line becomes active: **"Now cover the bed to find out."** (predict = type first, then cover; Check waters).
- **Water finds a bare square** → puddle, the can pauses on it 600 ms and goes on; no miss is counted, bubble **"A bare spot! Cover it and water again."**
- **Water finds a double** (repair) → the extra patch is washed onto the path; bubble **"One square, one patch — the extra one washed away."** (no miss; the child then retypes if needed).
- **Miss 1** — covered correctly but the typed number is wrong: the can's numbers stay on every square and the child's number stands on a stake at the bed's corner; the last square's number glows. Bubble **"Look at the number on the last square."**
- **Miss 2** — the numbers re-pop row by row, and each row's count appears at its end (e.g. 3 + 2 + 1 for the staircase). Bubble **"Add the rows: {rowList}."** (rowList built from the bed, e.g. "1, 2 and 3").
- **Build miss** — the can numbers the child's bed; bubble **"Your bed has {k} squares. Make it {n}."**
- A new patch, lift or key takes the help away.
- **Success** — every square brightens in a wave in counting order, the bed's area stamps onto a wooden tag on the path, Sprout's picture nods (a 6 px bob). EN: **"{n} squares cover the bed — its area is {n} square units!"** · rectangle bed: **"{rows} rows of {cols}: {n} square units!"** — and on rectangle beds the wooden tag on the path is stamped **"{rows} × {cols} = {n}"** in the locale's school sign (· in de/sv/da/no/fi, × elsewhere), the multiplication G3-313 asks the child to finish · build: **"A bed of {n} square units — in your own shape!"** · repair: **"No gaps, no overlaps: {n} square units!"**. After the last round: Sprout's quilt (§2), **"Every bed, measured in squares."**

## 8. Settings
1. **Beds:** up to 10 squares (default) / up to 20 squares — switches the table; bigger beds at rest.
2. **Bed lines:** squares shown (default) / edge marks only — cover, repair and finish beds show their cell grid or only edge ticks (patches still snap to the hidden squares). Predict rounds always use edge marks.

## 9. Words (EN source)
- title **"Sprout's Patchwork Meadow"** (frozen)
- task lines: Cover **"Cover the bed with moss. How many squares cover it?"** · Repair **"Fix the bed — no bare spots, no double patches. Then count the squares."** · Predict **"How many squares will cover this bed? Type first, then cover it."** · Finish **"Finish the bed. How many squares cover it now?"** · Build **"Make a bed of exactly {n} squares."**
- unit chip **"square units"**
- hints **"Type how many squares cover the bed."** · **"Now cover the bed to find out."** · **"A bare spot! Cover it and water again."** · **"One square, one patch — the extra one washed away."** · **"Look at the number on the last square."** · **"Add the rows: {rowList}."** · **"Your bed has {k} squares. Make it {n}."**
- celebrations as §7; **"Every bed, measured in squares."**
- settings **"Beds"**: "up to 10 squares" / "up to 20 squares" · **"Bed lines"**: "squares shown" / "edge marks only"
- **Locale traps:** (a) **"square units"** — de *Flächeneinheiten* is too abstract for Klasse 3; use *Kästchen* in prose and *Kästchen* on the chip (the de reviewer decides between *Kästchen* and *Einheitsquadrate*); fr *carrés-unités* (CE2 term) or *carreaux*; es *unidades cuadradas*/*cuadritos*; it *quadretti*; pt *unidades quadradas*; nl *vierkante eenheden*/*hokjes*; sv *rutor*; da *felter*/*kvadrater*; no *ruter*; fi *ruutua* (partitive after a numeral, authored whole). (b) **rowList** joining ("1, 2 and 3") uses each locale's list conjunction (de *und*, fr *et*, fi *ja*, sv *och*…), built with `Intl.ListFormat` and a hand fallback. (c) **"bed"** — a flower bed (de *Beet*, fr *parterre/massif*, es *cantero/parterre*, it *aiuola*, pt *canteiro*, nl *perkje/bed*, sv *rabatt*, da *bed*, no *bed*, fi *penkki/kukkapenkki*), never the sleeping bed. (d) **"moss patch"** (de *Moosstück*, fr *carré de mousse*, fi *sammalpala*) — kept from the old live strings where the reviewer approves them. (e) The × / · sign appears only on the stamped tag of a watered rectangle bed, in each locale's school form; sentences say "rows of" in words.

## 10. Sound off, access, phones
- Sound off: patches, puddles, washed-off doubles, numbers and row totals are all visible.
- Keyboard: cursor square on the bed (arrows, Space lays/lifts), Tab to keypad, Enter = Check (water).
- aria: bed `"flower bed, {rows} rows"` (never the area); after water `"{n} squares watered, {g} bare"`; each patch a button `"square row {r} column {c}, covered"`.
- Taps: cells 64/52/46 px (≥ 44). Sprout 96/64 px (floors met). Moss, can, path are drawn apparatus.
- Check above the fold (§4).

## 11. Distinct from
- **Batch siblings:** 201 The Tile Spill moves a FIXED set of tiles into another shape (conservation); 305 The Tile Roller lays whole rows of a rectangle and predicts the product. Here an irregular bed is covered square by square from an endless supply and the watering round is the count.
- **New 292 The Pouring Frame** (stretch a frame until poured counters fit — division) and **Row 170 The Stamp Sheet** (perforate a rectangle into rows and columns) never cover an irregular shape and never count a covering.
- **Row 100 The One-Hop Helpers** (length units with gaps/overlaps on a line) — 1-D length, not area. **New 224 The Tile Twin** (copy a grid) and **tool `folding-sheet`** — no area counting.

## 12. Build plan
- **Core state:** `{ table, lines, round:{kind, bed, pre?, frame?, target?}, cover:{key: 0|1|2}, typed, predicted, misses }`.
- **Functions:** `sweepEnter(cell)` (lays only on empty bed cells), `lift(cell)`, `waterOrder(bed)` (reading order of bed cells), `water()` → `{numbers:{cell:k}, bare:[...], washed:[...], last}`, `rowCounts(bed)`, `isConnected(cells)` (build), `check()`.
- **Gate (own truth):** areas recomputed from the masks; repair `pre` patch count ≠ area; predict beds' bbox, edge-sum and perimeter ≠ area; finish "new only" ≠ area; sweeping never produces a 2; water numbers each bed cell once in reading order and never numbers a path cell; a double is washed and numbered once; build accepts every connected shape of size n inside the frame and rejects n ± 1 and disconnected beds; ≥ 7 rounds per table; reshuffle never repeats.
- **Mutations (each killed):** sweep lays on covered cells (creates doubles) · water numbers patches instead of squares · water skips a bare cell silently · predict rounds showing the cell grid · finish counts only new patches · build accepts a disconnected bed · repair pre with patch count = area · drawn Sprout placeholder · the old estimate cards returning.
- **Pictures:** `occupations/gardener` (seen: a man with a shovel among flowers). Everything else is apparatus.
- **Risks:** sweep vs tap disambiguation on touch (a move of < 6 px = tap). Nothing blocked.

## 13. The four questions
1. **Choose it again?** Yes — sweeping moss on with a finger is pure pleasure, and the watering can's walk, splash and wash-off is a little show with a punchline.
2. **Teacher on the board?** Yes — area as covering-and-counting on shapes with no length × width, gaps and overlaps refuted by the can, predictions from edge marks.
3. **Parent trust?** Calm, no timer or score, one library picture, nothing sold.
4. **Invention:** the watering can waters each square once and numbers it — so bare soil, doubled patches and the true area all show themselves.

## 14. Critic review (2026-10-17)
Scores before → after: invention 5→5 · fun 5→5 · completeness 4→5 · correctness 4→5 · distinctness 5→5 · reality 5→5
What changed:
- Every mask re-counted (areas, repair patch counts, finish laid/new, perimeters, bounding boxes) — all correct.
- The row's teaching point is "area of a rectangle = rows × columns" (G3-313), yet the default table had no rectangle to cover or predict. Added a 4 × 2 cover bed (row totals) and a 3 × 3 predict bed, and a 5 × 4 predict bed to the 20 table, so multiplying the outside is shown to work on rectangles and fail on L/T/staircase/plus beds — "always multiply" and "never multiply" both lose; only reading the shape wins.
- Rectangle beds now get a stamped "{rows} × {cols} = {n}" tag in each locale's school sign; distinctness from New 292 and Row 170 written out.
- Layout check (2026-10-17): switched to stacked — split stage column is ~370 px at 704.
