# New 305 — The Tile Roller → ONE PASS, ONE ROW: a roller exactly one row wide lays a whole row of tiles with every pass, so the floor is rows × tiles in a row (3.MD.C.7.a)

## 0. Identity
- **id** `tile-roller.play.3-md-c-7-a` · grade 3 · CCSS 3.MD.C.7.a · Measurement & Data · key `tile-roller` → `tile-roller-core.js`, `tile-roller-activity.js`, `-activity.html`, `tile-roller-activities.json` (start with `node scripts/new-activity.js --num=305`; 0 lines to shared cores).
- **Worksheets covered:** G3-313 "Count the Squares" (count the squares in a rectangle; finish the multiplication) — the equation strip under the floor is that sheet's sentence, completed by the child.
- New instrument; no old activity.

## 1. The pitch
"Stretch the roller's drum until it spans the floor — that is one row of tiles — then roll it down: every pass lays one whole row and the counter jumps by a row; stop after one or two rows and say how many tiles the whole floor will take."

## 2. Why a child will want it again
- **Stretching the drum.** Grab the roller's end cap and pull: the drum lengthens tile by tile, each new tile printing on the drum with a click, until it clunks against the floor's far wall. It is a satisfying, slightly squeaky piece of machinery.
- **Rolling.** Drag the roller down the bare floor: as it crosses each row line it squishes down a full row of shiny tiles in one go (a 200 ms press with a "shhk"), and the counter beside the floor flips to the new total. The tiles come in a two-colour pattern so the rows read as rows.
- **The roller rolls itself.** After you predict, press Check and the roller finishes the floor on its own, row after row, the counter climbing — towards your flag.
- **The room moves in (the show).** On a finished floor a piece of library furniture slides in and stands on it (a sofa, an armchair, a bed, a bookcase, a table, a lamp, a stool — one per round), and the room is ready. End of a pass: all the rooms side by side as a little house plan, each floor with its tile count on the doorstep.

## 3. The skill and the misconception
- **Skill (3.MD.C.7.a):** find the area of a rectangle with whole-number sides by tiling it, and show that it is the same as multiplying the side lengths — rows × tiles in each row.
- **Misconception 1 — count every tile one by one.** **Pushback:** the roller never lays single tiles, only whole rows; after one pass the counter says the row (e.g. 6), and each further pass adds exactly that much again (12, 18, 24). Counting by ones is never needed and the apparatus never shows a 1-step.
- **Misconception 2 — add the two sides** (6 × 4 → 10) **or go round the edge** (→ 20). **Pushback:** the child's flag is planted on the counter's column of row totals; 10 sits between the first and second row totals and 20 between the third and fourth — a floor cannot end halfway along a row, and the roller rolls straight past the flag to 24.
- **Misconception 3 — rows and columns get confused** (4 × 6 as 4 rows of 4). **Pushback:** the drum's printed tiles ARE the row; the rows are counted by the tick marks down the side and by the roller's passes.

## 4. The stage
**Layout: stacked at every width** (layout check 2026-10-17: no `layout:'split'` — its stage column is only ≈ 370 px at 704, too narrow for this apparatus). The stage takes the full card width, ≈ 648 px at 704 (≈ 656 at 1024); whatever §4 places in a left, right, side or bubble column stays side by side inside the stage when the activity draws it, while the shell's bubble, keypad and Check sit under the stage. Sizes written for a wider stage fit the 648 px by closing margins and gaps first; no picture drops below 96 px, no tap below 44, no data mark or grid cell below 40.

**At 704 px (stacked: workshop left 470 px, answer column right 210 px):**
- **Task line** (20 px): **"Roll the first rows. How many tiles will the whole floor take?"**
- **The floor:** an empty rectangle with a 4 px skirting-board outline; **tick marks down its left side** (one per row) and **along its top** (one per column); inside it is bare plaster — no grid — until tiles are laid. Square tiles of size min(440 / columns, 400 / rows) px: 44 px for 10 × 7, 55 px for 8 × 8, 88 px for 5 × 3.
- **The roller:** a drawn paint-roller: a drum one tile tall with a handle above it (handle grip 52 px round); the drum shows its tiles as printed squares; an end cap (44 px) on the drum's right end to stretch it.
- **The counter column:** to the right of the floor, one counter window per row, level with the row (Baloo 2 22 px), blank until its row is laid; it is a vertical number track of row totals (marks at w, 2w, 3w …), and the child's prediction **flag** (coral pennant) is planted on it at the predicted value.
- **The equation strip** under the floor: **"{rows} rows of {w} = [ __ ]"** — rows and w fill in from the apparatus (rows from the side ticks, w from the drum) as soon as the drum is fitted; the box is the answer.
- **Answer column:** the equation's answer box 110 × 60 (repeated in the column for reach), keypad 3 × 4 keys 56 × 52, Check 140 × 56, bubble 18 px.
- **The furniture** (success only): a library picture at **112 px** standing on the finished floor.
- No words on the apparatus: numerals only.

**At 360 px (stacked):** floor tile size min(300 / columns, 240 / rows): 30 px for 10 × 7 (300 × 210), 32 px for 8 × 8 (256 × 256), 60 px for 5 × 3. Roller handle grip 44 px; end cap 44 px. Counter column 32 px wide right of the floor (numerals 16 px). Equation strip one line, answer box 96 × 52, keypad 4 × 3 keys 76 × 46, Check full width 52. Furniture 72 px. Budget 360 × 740: header 56 + task 48 + floor ≤ 260 + roller headroom 50 + equation 52 + keys 100 + Check 52 = 618 ✓; 320 × 640: tiles 27 px, keys 70 × 44 → 580 ✓.

## 5. The hand
- **Stretch:** drag the end cap right; the drum grows one tile per tile-width dragged (click each), within 16 ms; it cannot pass the floor's right wall and clunks when it reaches it (it also cannot be left shorter: the roller only rolls when the drum spans the floor; a short drum wiggles when dragged down). Keyboard: → grows the drum.
- **Roll:** drag the handle down; crossing each row line lays that row (200 ms) and fills its counter window with the running total; dragging up does nothing (rows stay). After the setting's stop row(s) the roller lifts and parks beside the floor and further rows cannot be rolled by hand. Keyboard: ↓ rolls a row.
- **Predict:** type the total; the flag rises on the counter track to the typed value (for values beyond the floor it stands above the top, dashed).
- **Check:** the roller finishes the floor by itself (300 ms per row), each counter filling; the flag either sits on the last counter or is passed/left short.
- **Undo:** ⌫; the stretch and the stop rows are fixed once rolled (they are the given information).

## 6. The rounds
One round = one floor, w columns × h rows. The roller stops after **1 row** or **2 rows** (setting); on a 2-row floor it always stops after 1 row (otherwise the floor would already be finished).

**Floors up to 5 × 5 (default), 8 rounds** (w × h → area; the counter after the stop row(s)):
1. 3 × 2 → **6** (stop 1: shows 3)
2. 2 × 4 → **8** (shows 2 / 4)
3. 3 × 3 → **9** (shows 3 / 6)
4. 5 × 2 → **10** (stop 1: shows 5)
5. 4 × 3 → **12** (shows 4 / 8)
6. 5 × 3 → **15** (shows 5 / 10)
7. 4 × 5 → **20** (shows 4 / 8)
8. 5 × 5 → **25** (shows 5 / 10)
(4 × 4 = 16 is left out on purpose: its edge, 16, equals its area, so the perimeter error would be "right"; 2 × 2 = 4 likewise equals w + h. These 8 are ALL the distinct products a 2–5 × 2–5 floor can have once those two are excluded — the coverage note's "≥ 9 rounds, no repeated product" is impossible at this size, so the default level has 8 rounds, above the LAW's 7; the critic's solver `work-c38/c305.js` enumerates it.)

**Floors up to 10 × 10, 10 rounds:** 6 × 4 → **24** · 7 × 3 → **21** · 8 × 5 → **40** · 9 × 4 → **36** · 6 × 7 → **42** · 10 × 3 → **30** · 8 × 8 → **64** · 7 × 5 → **35** · 9 × 6 → **54** · 10 × 7 → **70**.

**Measured (`work-38/m305.js`):** every product inside a table is different (8 / 8, 10 / 10); the **add-the-sides bot** (w + h) is wrong in all 18 rounds; the **perimeter bot** 2(w + h) is wrong in all 18 (4 × 4 removed for that reason); the **read-the-counter bot** (answer = what the counter shows at the stop) is wrong in all 18 under both stop settings, because the stop always leaves at least one row unrolled. Squares (3 × 3, 5 × 5; 8 × 8) are never consecutive after the reshuffle (the order generator re-draws until they are not).
**Answer position:** typed; no position. **Order:** order-only reshuffle per pass, never the same order twice.

## 7. Check, the misses, the success
- **Check before the drum spans the floor** → the end cap pulses; **"Stretch the roller across the floor first."** (no miss). **Before the stop rows are rolled** → the handle pulses; **"Roll the roller down."** (no miss). **Nothing typed** → **"How many tiles for the whole floor?"** (no miss).
- **Miss 1** — the roller finishes the floor; the flag stays where the child put it (between two row totals or past the end). The laid rows stay. Bubble **"Your flag is at {typed}. The rows go {w}, {2w}, {3w} …"** (the first three row totals, built from the round).
- **Miss 2** — the rows separate slightly into strips, each with its count "{w}" at its end, and a repeated-addition strip builds under the floor: {w} + {w} + … with the running totals; the equation strip highlights "{rows} rows of {w}". Bubble **"{rows} rows of {w} tiles."** The floor stays finished; the child types again (the roller does not re-roll).
- A new key takes the help away.
- **Success** — the last counter and the flag meet with a gold flash; the equation strip completes "{rows} rows of {w} = {n}" and then, underneath, writes the same fact as the worksheet does — **"{rows} × {w} = {n}"** in the locale's school sign (· in de/sv/da/no/fi, × elsewhere): G3-313's "finish the multiplication", reached from the rows, never shown before them; the furniture slides in. EN **"{rows} rows of {w} tiles make {n} tiles — the floor's area is {n} square units!"** End of pass: the house plan (§2), **"Rows × tiles in a row = the whole floor."**

## 8. Settings
1. **Floor sizes:** up to 5 × 5 (default) / up to 10 × 10 — at rest the floor is visibly bigger and finer.
2. **Stop after:** 1 row (default) / 2 rows — how much of the floor the child rolls before predicting; at rest a small marker on the side ticks shows where the roller will lift.

## 9. Words (EN source)
- title **"The Tile Roller"**
- task **"Roll the first rows. How many tiles will the whole floor take?"**
- equation strip **"{rows} rows of {w} ="**
- hints **"Stretch the roller across the floor first."** · **"Roll the roller down."** · **"How many tiles for the whole floor?"** · **"Your flag is at {typed}. The rows go {w}, {2w}, {3w} …"** · **"{rows} rows of {w} tiles."**
- celebration **"{rows} rows of {w} tiles make {n} tiles — the floor's area is {n} square units!"** · **"Rows × tiles in a row = the whole floor."**
- settings **"Floor sizes"**: "up to 5 × 5" / "up to 10 × 10" · **"Stop after"**: "1 row" / "2 rows"
- **Locale traps:** (a) **The multiplication sign:** de, sv, da, no and fi primary schools write multiplication with a raised dot (3 · 4), en/fr/es/it/pt/nl with ×. The equation strip uses words ("3 rows of 4"), and wherever a sign appears (the end-of-pass line, the size setting labels "5 × 5") each locale uses its own sign: "·" in de/sv/da/no/fi, "×" elsewhere. (b) **"rows of"** is authored per locale (de *3 Reihen mit je 4*, fr *3 rangées de 4*, es *3 filas de 4*, it *3 file da 4*, pt *3 fileiras de 4*, nl *3 rijen van 4*, sv *3 rader med 4*, da *3 rækker med 4*, no *3 rader med 4*, fi *3 riviä, joissa on 4*). (c) **"square units"** — the per-locale school word (de *Kästchen*/*Einheitsquadrate*, fr *carrés-unités*, fi *ruutua*…), the same choice as the batch sibling 202 so the family speaks one language. (d) **Plurals with numbers** are authored whole with the numeral in a fixed slot (fi partitive). (e) No floor or furniture noun appears in any sentence (the furniture is a picture only), so no article or gender is needed.

## 10. Sound off, access, phones
- Sound off: the drum's printed tiles, the rows, the counters, the flag, the repeated-addition strip — all visible.
- Keyboard: → stretches, ↓ rolls, digits type, Enter = Check.
- aria: floor `"floor, {rows} rows"`; drum `"roller, {k} tiles wide"`; counter `"{r} rows laid: {total} tiles"`; the answer box labelled with the equation strip text.
- Taps: grips and end cap ≥ 44 px; keys ≥ 46 × 44. Furniture 112 / 72 px (floors met). Tiles, roller, counters are drawn apparatus (tiles are not tap targets).
- Check above the fold (§4).

## 11. Distinct from
- **Batch siblings:** 201 The Tile Spill (the same tiles poured into a new shape), 202 The Watering Round (irregular beds covered square by square), 203 The Fence Roll (the edge). Here only whole rows are ever laid, so the product is the mechanism.
- **New 292 The Pouring Frame** (a known total poured into a frame of fixed rows to find the width — division) and **Row 170 The Stamp Sheet** (perforate a rectangle into equal squares — partitioning, 2.G.A.2): neither predicts a whole area from the first row.
- **tool `baking-tray`** (break an array into two known facts), **Row 96 The Roll-Up Mats** (place value), **New 272 The Double Stamp** (picture-graph scale) — none lays an area by the row from a fitted drum.

## 12. Build plan
- **Core state:** `{ size:'to5'|'to10', stop:1|2, round:{w,h}, drum, rowsLaid, typed, misses }`.
- **Functions:** `stretch(k)` (clamps at w, `fitted` iff drum = w), `rollRow()` (only while fitted and rowsLaid < stopRows(round)), `stopRows(round)` = min(stop, h − 1), `finish()` (rowsLaid → h), `rowTotals()` = [w, 2w, … hw], `check()`, `orderPass(table, seed)` (no consecutive squares).
- **Gate (own truth):** products distinct per table; w + h ≠ wh and 2(w + h) ≠ wh for every round; the counter at the stop ≠ wh for both settings; `stopRows` < h always; squares never adjacent in 1,000 generated passes; tile size ≥ 27 px at 320 for 10 × 7.
- **Mutations (each killed):** roller lays single tiles · roll allowed with an unfitted drum · stop row equals h on 2-row floors · counter counts tiles laid by ones · 4 × 4 back in the table · grid shown on the bare floor · flag snaps to the nearest row total · consecutive squares · same order twice.
- **Pictures:** furniture/sofa, furniture/armchair, furniture/bed, furniture/bookcase, furniture/table, furniture/lamp, furniture/stool (seen on the furniture contact sheet; `furniture/rug` is drawn hanging upright and `furniture/couch` is a near-twin of the sofa — neither used). Tiles, roller and floor are apparatus.
- **Risks:** none significant; the drum stretch is fixed-width so the build is simple. Nothing blocked.

## 13. The four questions
1. **Choose it again?** Yes — stretching a squeaky drum and squishing down whole rows is a toy, and the room filling with furniture at the end is a reward children wait for.
2. **Teacher on the board?** Yes — area of a rectangle as rows × tiles in a row, built by the apparatus; counting-by-ones and adding the sides are refuted by a counter that only ever jumps by a row.
3. **Parent trust?** Calm, clean, real multiplication, no timer, no score.
4. **Invention:** a roller exactly one row wide — every pass lays a whole row, so the floor's area is the number of passes times the drum.

## 14. Critic review (2026-10-17)
Scores before → after: invention 5→5 · fun 5→5 · completeness 4→5 · correctness 5→5 · distinctness 4→5 · reality 5→5
What changed:
- Re-solved both tables independently: products distinct, w + h, 2(w + h) and the counter-at-the-stop never equal the area under either stop setting. Proved that 8 is the maximum number of rounds a ≤ 5 × 5 table can have under the row's own rules, so the coverage note's "≥ 9" is recorded as impossible rather than silently missed.
- G3-313 ends in a multiplication sentence; the success now writes "{rows} × {w} = {n}" (locale sign) under "{rows} rows of {w} = {n}" — the bridge 3.MD.C.7.a is about.
- Distinctness from New 292 The Pouring Frame and Row 170 The Stamp Sheet written out (siblings 201/202 also tally rows, but only here is the whole area predicted from one or two rolled rows).
- Layout check (2026-10-17): switched to stacked — split stage column is ~370 px at 704.
