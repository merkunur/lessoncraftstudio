# Row 149 — Hundreds, Tens, and Ones → THE CAPPED MAT: every column must wear a numeral cap before the mat will close — an empty column needs its 0, or it folds shut and 307 collapses into 37 (2.NBT.A.1)

## 0. Identity
- **id** `place-value.hundreds-tens-and-ones.2-nbt-a-1` (kept; slugs, titles and intros frozen in all 11 locales) · grade 2 · CCSS 2.NBT.A.1 (a, b) · strand Number and Operations in Base Ten · own files `capped-mat-core.js`, `capped-mat-activity.js`, `capped-mat-activity.html`, `capped-mat-activities.json` (the row moves out of `place-value-activities.json`; register the new manifest in `frontend/lib/activities.ts MANIFEST_FILES`; 0 lines to `place-value-core.js` and `lcs-shell.*`). Row 150 (the other row of the old manifest) gets its own instrument; after both rebuilds `place-value-activities.json` may be emptied to `[]`.
- **Page title / intro (frozen):** "Hundreds, Tens, and Ones" — "Build each three-digit number using hundreds, tens, and ones. Tap to add a hundreds-flat, a ten-rod, or a unit-cube — and watch the number grow." Every promise is kept: the **Build** job is exactly that (tap a column to add a flat, rod or cube; the blocks grow in their columns, and at Check the caps drop on and read the number that was built — the caps never show live, or Build would become "press + until the cap says 4").
- **Worksheets it must also cover:** G2-222 "Read the Blocks" (count H/T/O, write the number) → **Read** job · G2-224 "Sort the Places" (count the blocks, fill the place-value chart) → **Read** job (the caps ARE the chart) · G2-227 "Match the Blocks" (circle the blocks that show the number) → **Match** job.
- **What the old activity did:** "Build {n}" with 18 targets (108, 160, 200, 247, 305, 408, 420, 463, 500, 583, 604, 670, 702, 730, 836, 850, 906, 974), tap blocks, generic "need more / too many" hints. **Kept:** all 18 targets (Build job, two passes of 9), the tap-to-add interaction, the 11-locale `taskBuild` strings ("Build {n}" …) as the Build prompt. **New:** the caps, the folding column, the Read and Match jobs.

## 1. The pitch
"The place-value mat only closes when every column wears a numeral cap — a column with nothing in it still needs a 0 cap, and if you leave it bare the empty column folds shut and 307 squeezes into 37."

## 2. Why a child will want it again
- **The caps click.** Each digit is a chunky bottle cap (a numeral on a round cap with a ribbed rim). Drop one on a column and it snaps on with a satisfying *click-twist* and a little spin. Ten caps 0–9 sit in a rack like sweets in a box.
- **The fold-shut is funny and unforgettable.** Leave an empty column without a cap and press Check: the mat starts to close like a lunchbox, the bare column squeezes flat like an accordion, the neighbours' caps bump together — *3-7* — the mat shudders, then springs back open with the empty column glowing. Children leave a cap off on purpose just to see it (free play allows it: no miss outside a round).
- **The mat closes like a lunchbox.** When every column is capped, the lid swings down over the blocks with a soft *thunk*; the three caps stay visible through three round windows in the lid and light up one by one — 3… 0… 7 — then a ticket slides out of the side with the number printed on it.
- **Blocks are honest:** a flat really is ten rods wide and ten cubes tall (drawn to scale), so "three hundred" *looks* three hundred.
- **Free play:** build anything; try a tenth rod and the column refuses — a cap has room for only one digit (§5) — so ten rods must leave and one flat come instead.

## 3. The skill and the misconception
- **Skill (2.NBT.A.1, G2-222/224/227):** the three digits of a three-digit number tell how many hundreds, tens and ones; 100 is ten tens (a); 100, 200, … 900 are one to nine hundreds with 0 tens and 0 ones (b). Read a set of blocks as a number, build a number as blocks, and pick the set that shows a number.
- **Misconception 1 — dropping the empty place** (3 flats + 7 cubes written "37"). **Pushback:** the bare column folds shut and the mat *shows* the result: two caps squeezed together reading 37 over a mat that plainly still has hundreds — the 3 is now standing on the tens. A 0 cap is the only thing that holds the column open.
- **Misconception 2 — reading in the order the blocks appear** (cubes lying on the left → "7 3"). **Pushback:** the caps go on the *columns*, and the columns are always hundreds-tens-ones; in the Read job's jumbled setting the blocks lie in the delivery in scrambled order (§6, 8 of 9 rounds not in H-T-O order), and a tapped block always slides into its own column.
- **Misconception 3 — counting pieces, not values** (2 flats + 4 rods + 7 cubes = "13"). **Pushback:** a cap holds one digit per column; there is no way to write a count of pieces.
- **Misconception 4 — ten in one place** ("14 tens"). **Pushback:** the cap's single digit means a column holds at most nine; the tenth rod will not go on (§5) and the hint shows ten rods sliding together into the shape of a flat.

## 4. The stage
**Layout: stacked at every width** (layout check 2026-10-17: no `layout:'split'` — its stage column is only ≈ 370 px at 704, too narrow for this apparatus). The stage takes the full card width, ≈ 648 px at 704 (≈ 656 at 1024); whatever §4 places in a left, right, side or bubble column stays side by side inside the stage when the activity draws it, while the shell's bubble, keypad and Check sit under the stage. Sizes written for a wider stage fit the 648 px by closing margins and gaps first; no picture drops below 96 px, no tap below 44, no data mark or grid cell below 40.

**At 704 px (stacked layout):**
- **Task line** (≤ 24 px): Build — **"Build {n}."** (kept `taskBuild`) · Read — **"Cap each column with how many it holds."** · Match — **"Which tray shows {n}? Drag the ticket onto it."**
- **The mat** (left, 470 × 380): cream board, teal rim, three columns separated by 3 px teal lines. Column glyphs at the top (drawn, no words): a little flat, a little rod, a little cube. Widths: hundreds 190, tens 180, ones 100.
  - Block scale at 704: cube 12 px, rod 12 × 120, flat 120 × 120 (true 1 : 10 : 100). Flats stack in a fan offset 10 px (9 flats → 200 × 200); rods stand side by side, 5 px apart (9 rods → 153 × 120); cubes nest 3 × 3 at 16 px pitch (48 × 48).
  - Under each column: **+** and **−** buttons (52 × 44, coral +, ink −) — the Build job's tap-to-add.
  - Above each column: a **cap seat** (64 × 64 dashed ring). A cap on it is a 60-px round cap, numeral 34 px.
- **The cap rack** (under the mat, 470 × 60): caps 0–9 (each 44 × 44 tap target, drawn 40 px, numerals 24 px).
- **The side column** (180 px): Build — the order ticket (160 × 90, numeral 44 px); Read (jumbled) — **the delivery tray** (180 × 300) holding the blocks to read at the delivery scale (cube 10, rod 10 × 100, flat 100 × 100), laid in loose groups whose order is the round's "appearance order" (§6); Match — the ticket at the top and nothing else (the three trays replace the mat, below).
- **Match job stage:** the mat is replaced by **three trays** stacked vertically (each 470 × 120, blocks at cube 8 / rod 8 × 80 / flat 80 × 80; flats fan offset 8, at most 6 flats per tray by design). The ticket (numeral 44 px) is dragged onto a tray.
- Lid: a drawn panel the width of the mat with three round windows over the cap seats; it is hidden until Check.
- No words on the apparatus: numerals on caps and tickets only; block glyphs instead of column names.

**At 360 px (stacked):** task 52 · ticket / delivery strip (328 × 100; delivery blocks at cube 7, rod 7 × 70, flat 70 × 70, wrapped in two rows) · the mat 328 × 300 (cube 8, rod 8 × 80, flat 80 × 80; hundreds 136 wide — 9 flats fanned 80 + 8 × 7 = 136 — tens 120, ones 72; cap seats 52) · ± buttons 48 × 44 · cap rack 2 rows × 5 caps (60 × 48 each) = 104 · Check 48. Budget: header 56 + 52 + 100 + 300 + 44 + 104 + 48 + gaps 32 = **736 ≤ 740**. Match on phones: three trays 328 × 110 (cube 6, rod 6 × 60, flat 60 × 60, flats fanned offset 6) = 330 + ticket row 64.
**At 320 px:** mat 288 × 280 (cube 7), rack keys 54 × 44 → **636 ≤ 640**.

No library pictures: the blocks are the content and are drawn apparatus (the base-ten blocks of the Place Value Lab palette: flat teal, rod coral, cube gold, 2 px ink outlines).

## 5. The hand
- **+ / −** (Build): + adds one block to that column (a flat drops in from above, 200 ms, *thup*; a rod slides in, 160 ms, *tik*; a cube pops, 120 ms, *pip*); − lifts the top one away. First motion within 60 ms. **A tenth block is refused:** the column's 9th block jiggles, the tenth hovers and floats back, and (Build only) the bubble says "A cap holds only one digit — ten tens make one hundred." while ten rod outlines slide together into a flat outline over the hundreds column for 1 s. No auto-regrouping: the child does it.
- **Caps** (all jobs): drag a cap from the rack onto a seat, or tap a seat then tap a cap (keyboard-friendly). The cap clicks on with a 90° twist (180 ms). Drop a different cap on a capped seat → swaps. Tap a seated cap → it returns to the rack. A cap is not used up — the rack holds endless copies (two columns can both wear a 4).
- **Build job:** the child only uses + / −; the caps drop by themselves at Check (they read what was built).
- **Read job:** the blocks are already in the columns (tidy setting) or lie in the delivery tray (jumbled setting). In the jumbled setting the child taps (or drags) each delivery block and it slides to its own column on the mat (a flat always to hundreds, a rod to tens, a cube to ones — the column decides, 240 ms). All blocks must be on the mat before caps can be judged (Check with blocks still in the delivery → hint, no miss).
- **Match job:** drag the ticket onto a tray (or tap a tray). The tray rises 6 px and gets a teal outline. Change by dragging the ticket elsewhere.
- **Undo:** − removes, caps lift off, the ticket moves; a jumbled block on the mat can be tapped back to the delivery.
- **Keyboard:** Tab → columns (+/−) → seats → rack → Check; digits 0–9 put a cap on the focused seat.

## 6. The rounds
**Build (2.NBT.A.1, kept targets):** pass A **108, 247, 305, 420, 500, 604, 730, 850, 974** · pass B **160, 200, 408, 463, 583, 670, 702, 836, 906** — passes alternate; order-only reshuffle inside a pass. Zeros: 13 of the 18 targets carry a 0 (108, 160, 200, 305, 408, 420, 500, 604, 670, 702, 730, 850, 906), including the two double-zeros 200 and 500 (2.NBT.A.1b); pass A has 7, pass B 6.
**Read (G2-222 / G2-224):** **136, 254, 307, 412, 529, 640, 718, 805, 963.** In the jumbled setting the delivery lays the kinds in this left-to-right order: 136 O-H-T · 254 T-O-H · 307 O-H · 412 H-T-O · 529 O-T-H · 640 T-H · 718 T-H-O · 805 O-H · 963 H-O-T. Measured (`work-34/m149.js`): a child who writes the counts in the order the kinds appear gets **1 of 9** right (only 412); three rounds have an empty place (307, 640, 805), so leaving out the 0 fails a third of the pass.
**Match (G2-227):** ticket · tray contents (first / second / third tray) · right tray:

| Ticket | Trays (top → bottom) | Right tray |
|---|---|---|
| 427 | **427** · 472 · 527 | 1st |
| 306 | 360 · **306** · 406 | 2nd |
| 518 | 158 · 517 · **518** | 3rd |
| 340 | 304 · **340** · 440 | 2nd |
| 263 | 623 · 264 · **263** | 3rd |
| 605 | **605** · 506 · 615 | 1st |
| 461 | 164 · 451 · **461** | 3rd |
| 380 | **380** · 308 · 480 | 1st |
| 452 | 352 · **452** · 425 | 2nd |

Measured (`work-34/v149.js`): right tray in each position **3 / 3 / 3**; every place of the ticket is shared with at least one wrong tray, so counting **only** the flats, **only** the rods or **only** the cubes never singles out the right tray (0 / 9 each); the right tray is **never** the one with uniquely the most or the fewest pieces (0 / 9); and the right tray is the smallest, the middle and the largest NUMBER of its three exactly 3 / 3 / 3 times (critic, `work-c34/c149.js` — the designer's table had the right tray as the middle value 5 / 9, so "pick the middle tray" beat chance; rows 306 and 263 were re-made) — permutation trays (472, 360, 158 …) have exactly as many pieces as the right one; zero traps in 306/360/406, 340/304, 380/308, 605/506. At most 6 flats in any tray.
- **Answer position:** Build and Read are typed by caps (no position); Match is balanced as above.
- **Order:** order-only reshuffle per pass, never the same order twice.

## 7. Check, the misses, the success
- **Check with nothing done** → "Tap + to add blocks." (Build) / "Put a cap on every column." (Read) / "Drag the ticket onto a tray." (Match) — no miss. **Read, blocks still in the delivery** → "Put every block on the mat first." — no miss. **Read, a column holding blocks has no cap** → its blocks bob and the seat pulses — "This column needs its cap." — no miss.
- **Read — a bare EMPTY column (the zero error) — miss 1:** the lid starts to close, the bare column folds flat, the two caps slide together and read e.g. **37** in the lid windows; the mat shudders (500 ms) and springs open; the empty column glows — **"Without a cap the empty column folds away and 307 becomes 37. What cap says 'none here'?"** (the number in the hint is the child's own two-cap reading, so it is always true).
- **Read — a wrong cap — miss 1:** the lid closes over the correct columns; the wrong column's blocks rise and bob one after another (no numbers) — **"Count the blocks under this cap again."** **Miss 2:** they number themselves 1, 2, 3… — **"Count with the numbers."**
- **Build — wrong blocks — miss 1:** the caps drop by themselves and read what was built (e.g. 704 for the ticket 740); the column where cap and ticket differ flashes in both — **"Your caps say {built}. Look at the {place} column."** ({place} is shown as the block glyph, no words: "Look at this column"). **Miss 2:** the needed number of block outlines appear in that column (e.g. 4 rod outlines) — **"Fill the outlines."**
- **Match — wrong tray — miss 1:** that tray's blocks slide into a ghost mat and its caps drop: e.g. **472** beside the ticket 427; the two places that differ flash — **"This tray shows {shown}. Look at the tens and the ones."** (places as glyphs). **Miss 2:** every tray shows its own caps over its blocks — **"Find the tray whose caps match the ticket."**
- A new move takes the help away until the next Check.
- **Success:** the lid swings shut (300 ms, *thunk*), the caps light one by one (150 ms each), the ticket slides out printed with the number, and the blocks underneath tap once per hundred (*bong*), ten (*tik*) and one (*pip*) — a quick musical count. Bubble: **"{h} hundreds, {t} tens, {o} ones: {n}."** (counts as numerals).

## 8. Settings
1. **Job:** build · read · match — changes the whole stage at rest (± buttons / cap rack / three trays).
2. **Blocks:** tidy · jumbled — in Read, tidy puts the blocks in their columns (G2-224), jumbled lays them in the delivery in scrambled order (G2-222); in Match, tidy trays lay H-T-O left to right, jumbled trays scatter the kinds.

## 9. Words (EN source; `taskBuild` kept in all 11 locales)
- title (frozen) **Hundreds, Tens, and Ones** · instruction **"Every column needs a cap — even an empty one."**
- prompts **"Build {n}."** (kept) · **"Cap each column with how many it holds."** · **"Which tray shows {n}? Drag the ticket onto it."**
- hints as in §7, plus **"A cap holds only one digit — ten tens make one hundred."**
- success **"{h} hundreds, {t} tens, {o} ones: {n}."**
- settings **Job** — build / read / match · **Blocks** — tidy / jumbled.
- **Locale traps:**
  - The success sentence takes a plural/singular per count: "1 hundred" vs "3 hundreds" (en), "1 Hunderter / 3 Hunderter" (de, invariable), "1 centaine / 3 centaines" (fr), "1 centena / 3 centenas" (es), "1 centinaio / 3 centinaia" (it — irregular plural), "1 centena / 3 centenas" (pt), "1 honderdtal / 3 honderdtallen" (nl), "1 hundratal / 3 hundratal" (sv, invariable), da "1 hundreder / 3 hundreder" (the place word *hundreder* is used for both — the da author confirms against the shipped title "Hundreder, tiere og enere"), no "1 hunder / 3 hundrere" (confirm against "Hundrere, tiere og enere"), fi "1 satanen / 3 satasta" (place words *satanen, kymmenen, ykkönen*; partitive after numerals > 1 — confirm against "Sadat, kymmenet ja ykköset"). Author singular/plural forms per place per locale; 0 takes the plural in en/fr/es/pt/it/nl ("0 tens") and the partitive in fi ("0 kymmentä"). Use the existing per-locale tables in `place-value-core.js _NUMBER_WORD_HELPERS` / `scripts/worksheet-gen/lib/number-words.js` as the reference, never a new hand table.
  - Column order on the mat is always H-T-O left to right in all 11 locales (the written order of digits); the delivery's scrambled order is never a reading order.
  - Digit glyphs 0–9 are universal; no thousands separators (3-digit only).
  - "cap" = de *Kappe/Deckel*, fr *capuchon*, es *tapa*, it *tappo*, pt *tampa*, nl *dop*, sv *kork/lock*, da *låg*, no *kork*, fi *korkki* — the authors pick the everyday bottle-cap word.

## 10. Sound off, access, phones
- Legible with the sound off: the fold-shut is pure motion; caps and lid windows are visual; the block taps are a bonus.
- aria: column "Hundreds column, {k} flats — cap {d or 'none'}"; + "Add a hundred"; seat "Cap seat, hundreds"; cap "Cap {d}"; tray "Tray {i}: {h} flats, {t} rods, {o} cubes".
- Taps: ± 52 × 44 (48 × 44 phones), caps 44, seats ≥ 52, trays full width.
- No library pictures (no picture floor applies); drawn blocks keep the true 1 : 10 : 100 scale (cube ≥ 7 px on phones — never a tap target).
- Check above the fold: 736 at 360 × 740, 636 at 320 × 640.

## 11. Distinct from
- **Place Value Lab** (premium tool: ten ones snap into a ten) — nothing snaps here; a tenth block is *refused*, and the child regroups by hand. The invention is the cap/fold, not the bundling.
- **Exchange Machine, Counting Cups, Number Hotel, Number Drum** (tools) — regrouping, scooping, corridors, rings; none has caps or a folding empty place.
- **Row 98 The Zero-Swallowing Cards** (1.NBT.B.2: the 7 laid on the 0 of 40) — expanded form with arrow cards, two digits; here the zero is a *placeholder cap* in a three-digit chart.
- **Row 142 The Twin Tubes** (2.NBT.A.3: forms pour into tubes) — matching forms by pouring; no blocks are built or read on a mat.
- **Row 150 The Value-Key Adding Machine** (this batch) — expanded form via value keys and a crank; no caps, no mat.
- **Rows 95 / 96 / 97** (drawers, roll-up mats, nine-stop tubes) — compare / add / ten-more with two digits. Row 96's invention is the tenth well hanging over the edge of a mat; here the refused tenth block is only a guard rail of the cap rule (one digit per cap), never the show — the show is the bare column folding shut.

## 12. Build plan
- **Core state:** `{ job, setting, n, mat:{h,t,o}, delivery:[{kind,x,y}], caps:{h,t,o}|null, trays:[3], chosenTray }`. Functions: `add(place)` (refused at 9), `remove(place)`, `sendBlock(i)` (delivery → its column), `cap(place, d)`, `uncap(place)`, `pickTray(i)`, `check()` → `{ ok, kind: 'empty' | 'deliveryLeft' | 'capMissing' | 'zeroFold' | 'wrongCap' | 'wrongBuild' | 'wrongTray', shown }`; `foldReading()` returns the digits left after bare empty columns fold (e.g. caps 3,–,7 → "37").
- **The gate's own ground truth (`verify-capped-mat-core.js`):** every Build target is one of the 18 kept ones and 100–999; Read rounds have every count ≤ 9 and their appearance order ≠ H-T-O in ≥ 8/9; `foldReading` of every Read round with the zero left bare ≠ the number; Match: positions 3/3/3, every ticket place shared by a wrong tray, the right tray never the unique max/min piece count, ≤ 6 flats per tray; `add` refuses a 10th block; `check` returns zeroFold only for a bare empty column; the success sentence's counts equal the mat.
- **Mutations:** allow a 10th block · auto-regroup at ten · let a bare empty column pass · fold a non-empty column · read caps in delivery order · accept a count of pieces as a cap · put the right Match tray always first · make a Match tray identifiable by its flats alone · drop the 0 from a Build target · treat the Build caps as typed by the child (skipping the reading).
- **Local test:** real drags (caps, delivery blocks, ticket) at 320·360·412·704·768·1024·1366, all rounds, 11 locales; assert the fold-shut renders two caps adjacent and the lid opens again; Check above the fold; no overflow of the 9-flat fan.
- **Pictures:** none. **Risks:** the 12 px cubes at 704 / 8 px on phones are small — they are never tapped, and the hierarchy audit must count the mat (not the blocks) as the hero. Nothing BLOCKED.

## 13. The four questions
1. **Would a 5–8-year-old choose it again?** Yes — clicking caps, a lunchbox lid that shuts, and a column that squeezes away when you forget its 0.
2. **Would a teacher put it on the board?** Yes — the place-value chart a teacher draws, with the one error every grade-2 teacher fights (the missing zero) shown as a physical collapse, plus read, build and match faces of 2.NBT.A.1.
3. **Would a parent trust it?** Calm, drawn blocks at true scale, numerals only, no timer.
4. **The invention:** every place must wear a numeral cap before the mat will close, and an empty place needs its 0 — leave it off and the column folds away, turning 307 into 37.

## 14. Critic review (2026-10-17)
Scores before → after: invention 5→5 · fun 5→5 · completeness 5→5 · correctness 4→5 · distinctness 5→5 · reality 5→5
What changed:
- Re-measured the Match table with my own script (`work-c34/c149.js`): positions 3/3/3, every place shared by a wrong tray, no unique most/fewest pieces — all confirmed — but the right tray was the **middle number 5 of 9 times**; rows 306 (now 360 · 306 · 406) and 263 (now 623 · 264 · 263) were re-made so the right tray is the smallest / middle / largest number 3/3/3, still ≤ 6 flats, still one zero trap in 306/360.
- Read's "appearance order" bot re-measured: 1 / 9 (only 412), confirmed.
- §0 no longer promises live caps in Build (caps live would turn Build into "press + until the cap shows the digit"); the caps read the build at Check.
- §11 names Row 96 (the tenth well) and keeps the refused tenth block as a guard rail, not the show.
- Layout check (2026-10-17): switched to stacked — split stage column is ~370 px at 704.
