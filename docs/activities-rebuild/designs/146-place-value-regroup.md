# Row 146 — Tuck Breaks a Hundred → THE NESTED CRATES (2.NBT.B.7)

## 0. Identity
- **id** `place-value-regroup.subtract-decompose-hundred.2-nbt-b-7` (frozen) · grade 2 · CCSS 2.NBT.B.7 · strand Number & Operations in Base Ten · own files `nested-crates-core.js`, `nested-crates-activity.js`, `nested-crates-activity.html`; the manifest row stays in `place-value-regroup-activities.json` (tool → `nested-crates-activity`). Metadata frozen en..sv; da/no/fi new at build. (de slug *klasse-3*, sv title *åk 3* — grade report only.)
- **Worksheets covered:** G2-205 Take Away the Blocks (the stock room's opening and filling act; the sheet's own no-borrow two-digit sums are the "nothing to snap" warm-up of sibling row 147), G3-362 Subtracting Across Zeros (both settings), G3-357 / G3-360 / G3-363 subtraction with borrowing (the "a three-digit number" setting + the written-sum setting). Addition sheets of the same ids are carried by row 145.
- **Old activity:** Tuck the hamster beside a base-ten mat; buttons "Break a hundred" and "Break a ten" decomposed automatically; the child typed the answer. **Kept:** the eight rounds (302−5, 403−8, 201−6, 402−9, 303−9, 202−8, 301−6, 203−7), Tuck (library `pets/hamster`), typing the answer, the two-step decomposition. **Dropped:** buttons that broke things by themselves — now the order of breaking is the packing itself.

## 1. The pitch
"In Tuck's stock room a hundred is a crate packed with ten boxes, and every box is packed with ten cubes — you can only open what is on the shelf, so when there are no loose boxes the cubes you need are inside a box that is inside a crate."

## 2. Why a child will want it again
- **Opening packages never gets old.** Tap a crate: its lid hinges up (220 ms), and ten long boxes slide out one after another onto the tens shelf (40 ms apart, a stacking clatter); the empty crate folds flat and slips away. Tap a box: its lid flips and ten cubes tumble out onto the ones shelf with a little shower sound.
- **You can see what is inside.** Crates have a clear window in their side through which the ten boxes show; boxes have ten cube outlines on their lid. A closed crate is visibly *full of tens*, not of cubes — so a child sees why opening it does not give ones yet.
- **The order slip is a game.** Each round is a customer's order: an order slip with exactly the right number of empty cells. Drag cubes (and, in bigger orders, boxes and crates) into the cells; when the slip is full it folds itself, Tuck stamps it, and it flies out of the hatch.
- **Free play:** between rounds the shelves stay live — open crates and boxes, and *pack* them back (drag ten cubes onto an empty box outline and it closes; ten boxes into a crate outline and it shuts). Children love packing.

## 3. The skill and the misconception
- **Skill (2.NBT.B.7):** subtract within 1000 using concrete models, understanding that a hundred can be decomposed into ten tens and a ten into ten ones — including when the tens place is zero (subtracting across a zero); relate it to the written method.
- **Misconception 1 — subtracting the smaller digit from the bigger** (302 − 5 → 303): **pushback:** the order slip has five cells; the ones shelf has two cubes; after two drags the shelf is empty and a third drag picks up air (the shelf gives a little hollow knock). Five cannot come out of two.
- **Misconception 2 — breaking the hundred straight into ones** (302 − 5 → 2 hundreds, 0 tens, 12 ones → 207): **pushback by packing:** a crate does not contain cubes — opening it gives ten boxes on the tens shelf. There is no way to get loose cubes out of a crate; the child must also open one box. The nine boxes left on the tens shelf are the 9 in 297.
- **Misconception 3 — "you can't take from a zero"** (giving up, or writing 302 − 5 = 300 − … ): **pushback:** the empty tens shelf is simply empty, but the crate next to it has a window full of boxes — the help is visibly one step away.
- **Misconception 4 — the written marks** (written-sum setting): opening the crate strikes the 3 to a 2 and writes 10 above the tens 0; opening a box strikes the 10 to a 9 and writes a small 1 before the ones 2 (12) — the strike-and-rewrite notation of all eleven locales (row 96 §9b), appearing as the matching package opens.

## 4. The stage
**Layout: stacked at every width** (layout check 2026-10-17: no `layout:'split'` — its stage column is only ≈ 370 px at 704, too narrow for this apparatus). The stage takes the full card width, ≈ 648 px at 704 (≈ 656 at 1024); whatever §4 places in a left, right, side or bubble column stays side by side inside the stage when the activity draws it, while the shell's bubble, keypad and Check sit under the stage. Sizes written for a wider stage fit the 648 px by closing margins and gaps first; no picture drops below 96 px, no tap below 44, no data mark or grid cell below 40.

**At 704 px (stacked layout: stock room 460 px left, order column 220 px right):**
- **Task line** (≤ 24 px): see §9.
- **The stock room** (460 × 380): three shelves side by side — hundreds | tens | ones — 150 px wide each, as wooden shelf frames (2.5 px ink), headed by a block icon and the localized column name (16 px).
  - **Crates** (hundreds shelf): squares 64 × 64 drawn as a box with a lid strip (12 px) along the top and a side window (a 40 × 40 clear pane) through which ten thin box outlines show. Stacked two wide (up to 9: five rows × 68 px = 340 px).
  - **Boxes** (tens shelf): long boxes 120 × 16 with a lid line and ten cube outlines, stacked (pitch 19 px; at most 10 boxes ever lie here, because every round starts with 0 tens).
  - **Cubes** (ones shelf): 16 px cubes in rows of five (pitch 19 px).
  - The first number's packages are coral; packages that came out of a crate or box keep the coral colour (they are still part of the same number).
- **Order column** (right, 220 px): Tuck (`pets/hamster`, 96 × 96) at a hatch (a drawn rounded doorway in the wall). Under him the **order slip** (190 × 120): the take-away number in 36 px at its top and exactly that many empty cells below — cube cells 24 × 24 in rows of five; in three-digit orders also box cells (120 × 16) and crate cells (40 × 40), arranged hundreds-tens-ones like the shelves. Under the slip the answer box 120 × 60 (44 px digits) and the shell keypad.
- **Written sum** (setting on): column subtraction on squared paper under the stock room, 36 px digits, with room above each top digit for the strike-and-rewrite marks.
- **Feedback bubble** under the stock room, 18 px. **No words on the apparatus** except the column names and the numerals.

**At 360 px (stacked):** task line → order strip 328 × 110 (Tuck 64 px at left, slip 250 × 96 with cube cells 20 px) → stock room 328 × 270 (shelves 106 px; crates 46 × 46, windows 28 px; boxes 90 × 12, pitch 15; cubes 12 px, pitch 15) → answer box 100 × 52 → shell keypad. Targets are whole packages: a crate (46 px) or a box row (the shelf's box stack is the target, the top box comes off, ≥ 44 px), the ones shelf as a whole (≥ 44 px). Height fits the 740 fold; at 320 × 640 crates 40 px, slip cells 18 px → fits.

## 5. The hand
- **Open a crate:** tap it (or drag it down onto the tens shelf) → lid up (220 ms), ten boxes slide out onto the tens shelf (40 ms stagger, a clatter rising in pitch), the empty crate folds flat (180 ms) and leaves. One tap opens one crate.
- **Open a box:** tap the top box of the tens shelf (or drag it onto the ones shelf) → lid flips (160 ms), ten cubes tumble onto the ones shelf (30 ms stagger, a soft shower).
- **The shelves only hold what one opening gives:** a crate opens only while the tens shelf has no loose boxes, and a box opens only while the ones shelf has fewer than ten cubes — otherwise the lid lifts 4 px and drops back with a soft "full" thud. So nothing is opened that is not needed, and the shelves never overflow (10 boxes, 19 cubes at most).
- **Nothing else opens:** boxes seen through a crate window are not tappable; a tap on them taps the crate (which opens — the window is the crate's). The ones shelf cannot receive anything from a crate. A drag of a crate onto the ones shelf does not open it: the crate lands back on its shelf with a heavy thump (it is ten boxes, it does not fit the cube shelf).
- **Fill the order:** drag from a shelf to the slip → the piece flies to the next empty cell of its own kind (cubes only to cube cells, boxes to box cells, crates to crate cells; a wrong kind slides home). Press-and-hold on the ones shelf lifts a handful (one more every 250 ms, counter chip). An empty shelf gives air (hollow knock, 4 px wobble).
- **Slip full** → it folds (300 ms), Tuck's stamp lands, and it waits at the hatch until Check (so the child can still change their mind — tap the folded slip to unfold it).
- **Type** the answer: what is left on the shelves.
- **Undo:** drag a piece back from the slip; pack an opened crate back by dragging ten boxes onto the crate outline that appears on the hundreds shelf while boxes are loose (and ten cubes onto a box outline) — free play and undo are the same gesture.
- **Keyboard:** Tab cycles shelves → slip → answer; Enter on a shelf opens its top package; Space lifts one piece for the slip; Enter drops it.

## 6. The rounds
One round = one order. The number on the shelves is the minuend; the slip is the subtrahend.

**A few ones across a zero (default — the old eight):**
| # | shelves | slip | opens | left | answer |
|---|---|---|---|---|---|
| 1 | 302 | 5 | 1 crate, 1 box | 2 crates, 9 boxes, 7 cubes | 297 |
| 2 | 403 | 8 | 1, 1 | 3, 9, 5 | 395 |
| 3 | 201 | 6 | 1, 1 | 1, 9, 5 | 195 |
| 4 | 402 | 9 | 1, 1 | 3, 9, 3 | 393 |
| 5 | 303 | 9 | 1, 1 | 2, 9, 4 | 294 |
| 6 | 202 | 8 | 1, 1 | 1, 9, 4 | 194 |
| 7 | 301 | 6 | 1, 1 | 2, 9, 5 | 295 |
| 8 | 203 | 7 | 1, 1 | 1, 9, 6 | 196 |
All answers different; every round has 0 tens and fewer ones than the slip asks, so every round needs the crate *and* the box.

**A three-digit number** (G3-362 / G3-360; the slip has crate, box and cube cells):
| # | shelves − slip | answer | what must open |
|---|---|---|---|
| 1 | 400 − 136 | 264 | a crate, then a box (0 tens, 0 ones) |
| 2 | 503 − 247 | 256 | a crate, then a box |
| 3 | 600 − 258 | 342 | a crate, then a box |
| 4 | 702 − 365 | 337 | a crate, then a box |
| 5 | 801 − 426 | 375 | a crate, then a box |
| 6 | 300 − 174 | 126 | a crate, then a box |
| 7 | 905 − 368 | 537 | a crate, then a box |
| 8 | 604 − 279 | 325 | a crate, then a box |
All different; every round crosses a zero.

- **Answer position:** typed — nothing to guess by place. **Measured shortcut bots:** "smaller digit from bigger" 0/8 in both tables (it gives 303, 405, 205 … / 336, 344, 458 …); "break the hundred straight into ones, tens stay 0" (302 − 5 → 207, 403 − 8 → 305 …) 0/8; "the 0 becomes 10 but never drops to 9" (302 − 5 → 307; 400 − 136 → 274, 503 − 247 → 266 …) 0/16 — it is always exactly one ten too many, which is exactly the one box left sitting on the tens shelf of a child who did not open it. The gate recomputes these bots from the round data (`work-c33` oracle).
- **Order:** order-only reshuffle per pass, never the same order twice.

## 7. Check, the misses, the success
- **Check before the slip is full** → the empty cells pulse; bubble "Fill the order slip first." (no miss).
- **Check with the slip full but no answer** → "Type what is left on the shelves." (no miss).
- **Miss 1** (wrong answer) → the shelf whose digit disagrees counts itself in place-value steps (crates `100, 200`; boxes `10, 20 …`; cubes `1, 2 …`, 160 ms each) and the answer's digit for that shelf wobbles. EN **"Count what is left on each shelf."**
- **Miss 2** → the written subtraction appears (even with the setting off, for this look) and replays its marks in step with a ghost replay of the openings — crate opens → 3 struck to 2, 10 over the 0; box opens → 10 struck to 9, 1 before the 2. EN **"A crate opens into tens. A box opens into ones."**
- A new move or keystroke takes the help away until the next Check.
- **Success** → the slip flies out of the hatch, Tuck waves it off, the remaining packages light shelf by shelf left to right as the digits light; EN **"{a} take away {b} leaves {c} — a crate opened into tens, and a box opened into ones!"** · big orders: **"{a} take away {b} leaves {c}."**

## 8. Settings
1. **Take away:** a few ones (default) / a three-digit number — the slip shows only cube cells, or crate + box + cube cells, at rest.
2. **Written sum:** hidden (default) / shown — the column subtraction under the stock room at rest.

## 9. Words (EN source)
- in-tool title: **"Tuck Breaks a Hundred"** (frozen)
- instruction: **"Fill Tuck's order slip. Not enough? Open a crate or a box. Then type what is left."**
- prompt (kept): `{a} − {b} = ?`
- hints: hintSlip **"Fill the order slip first."** · hintType **"Type what is left on the shelves."** · hintCount **"Count what is left on each shelf."** · hintNest **"A crate opens into tens. A box opens into ones."** · hintEmpty (bubble when a drag picks air) **"This shelf is empty — what could you open?"**
- celebrations as §7. settings: **"Take away"**: "a few ones" / "a three-digit number" · **"Written sum"**: "hidden" / "shown". aria: crate **"crate of one hundred: ten boxes inside"**, box **"box of ten: ten cubes inside"**.
- **Locale traps:**
  - (a) **Package words** are each locale's ordinary nouns, chosen so *crate* > *box*: de *Kiste / Schachtel*, fr *caisse / boîte*, es-MX *caja grande / cajita*, pt *caixote / caixinha*, it *cassa / scatola*, nl *krat / doosje*, sv *låda / ask*, da *kasse / æske*, no *kasse / eske*, fi *laatikko / rasia*. The column names stay the place-value words; the package words never replace them.
  - (b) **Regrouping verbs** (row 96 §9a): de *entbündeln* (never *borgen*), fr *casser une centaine / une dizaine*, it *cambio*, es-MX *desagrupar*, pt *desagrupar*, nl *inwisselen*, sv *växla*, da *veksle*, no *veksle*, fi *vaihtaa / purkaa*. Bubbles only.
  - (c) **Borrow notation:** strike-and-rewrite in all eleven (row 96 §9b) — de *Abziehverfahren mit Entbündeln*, never the *Ergänzungsverfahren*; nl *cijferend*, never *kolomsgewijs*.
  - (d) **"Order slip"**: de *Bestellzettel*, fr *bon de commande*, es-MX *pedido*, pt *pedido*, it *ordine / bigliettino*, nl *bestelbriefje*, sv *beställningslapp*, da *bestillingsseddel*, no *bestillingslapp*, fi *tilauslappu*.
  - (e) Minus is U+2212.

## 10. Sound off, access, phones
- Legible with the sound off: windows in crates, lid lines on boxes, empty cells on the slip, the hollow-shelf wobble and the counting labels carry everything.
- Keyboard path in §5; aria live after each opening: **"2 crates, 10 boxes, 2 cubes"**.
- Taps: crates ≥ 46 px, the box stack ≥ 90 × 44 hit area, the ones shelf whole ≥ 106 × 80, slip cells are drop targets (dragging needs no precision — a piece finds the next cell). Tuck 96 / 64 px. Check above the folds (§4).
- Reduced motion: openings cross-fade; pieces appear on the next shelf without the slide.

## 11. Distinct from
- **Row 96 Roll-Up Mats:** a rod dragged into the ones bay *unrolls* into a mat; capacity frames drive it. Here there are no frames; the decomposition order is forced by **nesting** — the cubes are inside boxes inside crates, and only the outermost thing on a shelf can be opened.
- **exchange-machine (tool):** a tap on a column trades automatically. Here nothing is traded: packages are opened, and the packing shows what is inside before you open it.
- **Row 145 Trading Scale (sibling):** composing by an equal-weight trade. **Row 147 Take-Away Scoop (sibling):** the take-away number is a scoop; one ten is broken in place. Here: an order slip and nested packaging across a zero.
- **Rows 93 / 94 (pantry, Bundle Bot):** packing to count, no subtraction.

## 12. Build plan
- **Core state:** `{ face:'ones'|'big', a, b, shelves:{H:n, T:n, O:n}, slip:{need:{H,T,O}, have:{H,T,O}}, opened:{H:n, T:n}, typed, written:{marks:[]} }`.
- **Functions:** `openCrate()` (refused if H = 0 or T > 0) → H−1, T+10 · `openBox()` (refused if T = 0 or O ≥ 10) → T−1, O+10 · `pack(col)` (refused unless 10 of the next place lie loose) · `toSlip(col)` → moves one piece if `shelves[col] > 0 && have[col] < need[col]`, else returns `'air'|'full'|'kind'` · `slipFull()` · `check(n)` → `{ok, wrongCol}` · `nextTask`.
- **Gate's own truth (`verify-nested-crates-core.js`):** independent column subtraction gives the answer, the borrow chain and the across-zero flag for each round; a scripted solver (open crate → open box → fill slip → type) passes every round; **no sequence of public calls can move a crate's value directly to the ones shelf** (exhaustive search over 6-move sequences); value is conserved by every open/pack; `toSlip` never makes a shelf negative; every default round needs exactly one crate and one box opened; every big round crosses a zero; answers distinct per table; the three bots of §6 reproduced at 0/8.
- **Mutations:** `openCrate` puts 100 cubes on the ones shelf · `openBox` allowed while T = 0 (from inside a crate) · a crate dropped on the ones shelf opens there · `toSlip` takes from an empty shelf · slip accepts a wrong kind · Check allowed with an unfilled slip · a strike mark written before the package opens · de borrow written as *Ergänzen* (a 1 under the subtrahend) · pack accepts 9 · a second crate opens while boxes are loose · same order twice · celebration with the previous round's numbers.
- **Pictures:** `pets/hamster` only (no gerbil on screen). Crates, boxes, cubes, slip, hatch are apparatus geometry (rectangles, panes, lid lines).
- **Risks:** every round of both tables has 0 tens on the shelf, so the tens shelf never holds more than 10 boxes (one opened crate) — 10 × 19 px = 190 px at 704, 10 × 15 px = 150 px at 360: fits with room. Up to 9 crates (two wide, five rows) fit both widths. Nothing blocked.

## 13. The four questions
1. **Would a 5–8-year-old choose it again?** Yes — opening crates and boxes is unwrapping presents, and packing them back is just as good.
2. **Would a teacher put it on the board?** Yes — subtracting across zeros is the step where most Grade 2–3 children break down; the nesting shows *why* you go to the hundreds first, and *why* 9 tens are left, and the written marks appear exactly when the packages open.
3. **Would a parent trust it?** Calm, one library hamster, numerals and column names only, no timer or score.
4. **The invention in one sentence:** a hundred is a crate packed with ten boxes of ten cubes, and you can only open what is on the shelf — so across a zero the crate must open before the box, every time.

## 14. Critic review (2026-10-17)
Scores before → after: invention 5→5 · fun 5→5 · completeness 5→5 · correctness 4→5 · distinctness 5→5 · reality 5→5
What changed:
- Both tables re-solved by script (`work-c33/verify.js`): default answers 297 395 195 393 294 194 295 196, big answers 264 256 342 337 375 126 537 325 — all distinct, every round borrows in the ones AND across a zero tens (the big table's minuends 400 503 600 702 801 300 905 604 all have 0 tens, so the tens shelf never holds more than the 10 boxes of one crate). "Smaller from bigger" re-measured at 0/16 (303 405 205 … / 336 344 458 …).
- **A mislabelled bot fixed:** "ignore the zero, keep 0 tens → 274" did not compute (274 comes from a different error). The two across-zero bots are now named by what they do and measured: tens-stay-0 (207-type) 0/8, and the 0-becomes-10-but-never-9 bot 0/16 — always exactly one ten too many, i.e. the box a child forgot to open.
- Coverage of G2-205: the sheet's own no-borrow sums now live in row 147's new "nothing to snap" warm-up; this row keeps the across-zero half.
- Notation re-checked against row 96 §9b: strike-and-rewrite across the zero (3 → 2 with 10 over the 0, then 10 → 9 with the small 1 before the ones), de *entbündeln*, nl *cijferend* — the same marks #267 writes.
- Layout check (2026-10-17): switched to stacked — split stage column is ~370 px at 704.
