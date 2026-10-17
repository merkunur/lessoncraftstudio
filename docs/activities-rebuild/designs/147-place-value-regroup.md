# Row 147 — Tuck Breaks a Ten → THE TAKE-AWAY SCOOP (2.NBT.B.7)

## 0. Identity
- **id** `place-value-regroup.subtract-decompose.2-nbt-b-7` (frozen) · grade 2 · CCSS 2.NBT.B.7 · strand Number & Operations in Base Ten · own files `takeaway-scoop-core.js`, `takeaway-scoop-activity.js`, `takeaway-scoop-activity.html`; the manifest row stays in `place-value-regroup-activities.json` (tool → `takeaway-scoop-activity`). Metadata frozen en..sv; da/no/fi new at build. (de slug *klasse-3*, nl *groep-5*, sv *åk 3* — grade report only.)
- **Worksheets covered:** G2-205 Take Away the Blocks (the new "nothing to snap" warm-up — the sheet's own two-digit take-aways with no borrowing — and every setting's scoop act); G2-251 / G2-256 / G2-257 / G2-259 and G3-357 / G3-360 / G3-363 (subtraction in columns with one borrow — the "tens and ones" setting with the written sum shown). Across zeros (G3-362) is row 146. The coverage map also lists the addition sheets G2-255 / G2-258 / G3-359 / G3-361: a take-away scoop cannot honestly carry addition, so they are carried by #267 One-Digit Boxes (the written method, add and take away) and row 145 Square Vice (carrying with blocks) — recorded here, not claimed.
- **Old activity:** Tuck the hamster beside a base-ten mat; a button "Break a ten" decomposed one ten automatically; the child typed the answer. **Kept:** the eight rounds (342−5, 451−8, 213−7, 132−5, 415−9, 124−6, 351−8, 243−5), Tuck (library `pets/hamster`), typing the answer. **Dropped:** the button — the ten is now snapped by hand, and the take-away itself became a physical object.

## 1. The pitch
"The number you take away is a scoop with exactly that many cups — it only lifts when every cup has a block under it, so when there are not enough ones you have to snap a ten into ten ones first."

## 2. Why a child will want it again
- **The scoop is a toy.** A chunky tray with a handle, the number printed on its handle, and a little cup for every one it takes (five cups for 5). Drag it over the mat and the cups light up one by one as they find blocks under them. Let go — if every cup is full it *slurps* the blocks up with a pop and swings away to Tuck's bowl (the away tray beside him).
- **A scoop with empty cups is funny.** It presses down, the empty cups blink like hungry mouths, it lifts off empty-handed with a disappointed *boing*. It is the scoop that is short, not the child.
- **Snapping a ten is satisfying.** Every rod is scored like a chocolate bar. Tap it: it bends a little and snaps — *crack* — into ten cubes that tumble down onto the ones shelf. The child does the breaking.
- **Free play:** after each round, snap rods, snap a flat into ten rods, scoop anything; the scoop's number can be changed by tapping its handle (1–9) to scoop any amount for fun.

## 3. The skill and the misconception
- **Skill (2.NBT.B.7):** subtract within 1000 using concrete models; when there are not enough ones, decompose one ten into ten ones; relate it to the written column method (G2/G3 column sheets: ones first, write the borrowed ten).
- **Misconception 1 — "smaller from bigger"** (342 − 5 → 343, because 5 − 2 = 3; 52 − 27 → 35): **pushback, structural:** the take-away number is the scoop. It has five cups; it always takes five from the shelf. There is no way to hold it so that it takes the shelf's 2 away from its own 5 — the scoop can never be turned around. With only two cubes, three cups stay empty and it will not lift.
- **Misconception 2 — breaking a ten but forgetting it is gone** (342 − 5 → 347, ten ones added but the tens still 4): **pushback:** snapping physically removes the rod from the tens shelf — the shelf shows 3 rods now; the digit check counts the shelf.
- **Misconception 3 — breaking a hundred instead of a ten:** in the tens-and-ones setting the scoop's rod-slots sit over the tens shelf; a flat can be snapped into ten rods when the tens are short (627 − 346), and only then.
- **Misconception 4 — the written marks** (written-sum setting): snapping a rod strikes the tens digit (4 → 3) and writes a small 1 before the ones digit (2 → 12) at the moment it cracks.

## 4. The stage
**Layout: stacked at every width** (layout check 2026-10-17: no `layout:'split'` — its stage column is only ≈ 370 px at 704, too narrow for this apparatus). The stage takes the full card width, ≈ 648 px at 704 (≈ 656 at 1024); whatever §4 places in a left, right, side or bubble column stays side by side inside the stage when the activity draws it, while the shell's bubble, keypad and Check sit under the stage. Sizes written for a wider stage fit the 648 px by closing margins and gaps first; no picture drops below 96 px, no tap below 44, no data mark or grid cell below 40.

**At 704 px (stacked layout: mat 450 px left, scoop/Tuck column 230 px right):**
- **Task line** (≤ 24 px): see §9.
- **The mat** (450 × 360): three shelves side by side — hundreds | tens | ones — 145 px each, wooden frames 2.5 px ink, headed by a block icon and the column name (16 px).
  - **Flats** 60 × 60 (10 × 10 faint grid; score lines between the ten rod-rows drawn 1.5 px darker so a flat visibly snaps into rods), two wide.
  - **Rods** vertical 16 × 120 standing in a row (pitch 22 px → 9 rods = 198 px; two rows if more), each scored into ten cells with darker score lines.
  - **Cubes** 18 px, in rows of five (pitch 22 px), up to 19.
  - The first number is coral; cubes that came from a snapped rod stay coral.
- **The scoop** (right column, parked at the top): a drawn tray 200 × 76 with a handle tab (60 × 44) carrying the take-away number (36 px Baloo 2); its cups are round wells Ø 28 px in rows of five (a 5-well row for 5, two rows for 6–9), in the tens-and-ones setting also long rod-slots 20 × 120 (one per ten) on the scoop's left part. The scoop's parts are spaced exactly like the shelves so that, held over the mat, its rod-slots sit over the tens shelf and its cups over the ones shelf — it snaps sideways onto that alignment and cannot sit one column off.
- **Tuck** (`pets/hamster`, 96 × 96) under the scoop's parking place, beside the **away tray** (a drawn bowl-shaped tray 120 × 40) where scooped blocks land.
- **Answer box** 120 × 60 under Tuck; shell keypad.
- **Written sum** (setting on): column subtraction under the mat, 36 px digits, room above each digit for strike-and-rewrite.
- **Feedback bubble** under the mat, 18 px. **No words on the apparatus** except column names and numerals.

**At 360 px (stacked):** task line → scoop strip 328 × 100 (scoop 220 × 64, cups Ø 22, handle 52 × 44; Tuck 64 px and the away tray at its right) → mat 328 × 250 (shelves 104 px; flats 44 × 44; rods 12 × 88, pitch 16; cubes 13 px, pitch 16) → answer box → shell keypad. When the child drags the scoop down over the mat it scales to the mat's column spacing (its parts always match the shelves). Targets: the scoop (≥ 220 × 64), a rod (12 px wide visually, **44 px hit width** — rods are tapped by their column of the shelf, the rod nearest the finger snaps), a flat (44 px). Check above the 740 fold; at 320 × 640 rods pitch 14, cups Ø 20 → fits.

## 5. The hand
- **Drag the scoop** from its parking place over the mat (the scoop follows the finger ≤ 100 ms; it snaps horizontally to the shelf alignment). While hovering, every cup with a block under it lights teal; empty cups stay dark. A small tick per lit cup.
- **Release:**
  - every cup (and rod-slot) has a block → the scoop lowers (120 ms), lifts with a pop (the blocks ride up in its cups), swings over to the away tray and tips them in (500 ms), then flies back to its parking place, **empty and greyed** — a round has one scoop, used once.
  - any cup empty → the scoop presses, the empty cups blink coral three times, a *boing*, and it springs back to its parking place. No blocks move. No miss.
- **Snap a rod:** tap a rod on the tens shelf → it bends 3° (80 ms) and cracks along its score lines (220 ms); ten cubes tumble onto the ones shelf (25 ms stagger). One tap, one rod. In the written-sum setting the tens digit is struck and the ones digit gets its small 1 at the crack.
- **Snap a flat** (tens-and-ones setting, and free play): tap a flat → it cracks into ten rods that stand up on the tens shelf.
- **Snapping is only allowed downhill:** cubes cannot be snapped; a snap is refused when the next shelf already holds ten or more (the shelf glows: "there is already enough here") — so a child never snaps a ten they do not need, and the shelves never overflow.
- **Type** the answer: what is left on the mat after the scoop.
- **Undo:** until Check, drag ten cubes back onto the tens shelf and they click into a rod again (a snapped rod can be rebuilt); a used scoop can be tapped in the away tray to pour its blocks back and return to its parking place.
- **Keyboard:** Tab → scoop (Enter picks it up, ←/→ is not needed — it auto-aligns, Enter drops it over the mat) → tens shelf (Enter snaps a rod) → hundreds shelf (Enter snaps a flat) → answer.

## 6. The rounds
One round = one take-away; the minuend is on the mat, the scoop is the subtrahend.

**Ones only (default — the old eight):**
| # | mat | scoop | snap | left | answer |
|---|---|---|---|---|---|
| 1 | 342 | 5 cups | 1 rod | 3 flats, 3 rods, 7 cubes | 337 |
| 2 | 451 | 8 | 1 rod | 4, 4, 3 | 443 |
| 3 | 213 | 7 | 1 rod | 2, 0, 6 | 206 |
| 4 | 132 | 5 | 1 rod | 1, 2, 7 | 127 |
| 5 | 415 | 9 | 1 rod | 4, 0, 6 | 406 |
| 6 | 124 | 6 | 1 rod | 1, 1, 8 | 118 |
| 7 | 351 | 8 | 1 rod | 3, 4, 3 | 343 |
| 8 | 243 | 5 | 1 rod | 2, 3, 8 | 238 |
Every round has fewer ones than the scoop's cups (so a snap is always needed); two rounds (#3, #5) leave 0 tens — the 0 digit; all answers different.

**Nothing to snap** (warm-up, G2-205 — "Subtract the second group from the first"; two-digit, no borrowing; the scoop has rod-slots and cups and lifts on the first try, which is the lesson: when every cup finds a block there is nothing to break):
| # | mat − scoop | answer |
|---|---|---|
| 1 | 58 − 23 | 35 |
| 2 | 47 − 15 | 32 |
| 3 | 86 − 52 | 34 |
| 4 | 79 − 46 | 33 |
| 5 | 64 − 21 | 43 |
| 6 | 95 − 54 | 41 |
| 7 | 38 − 14 | 24 |
| 8 | 77 − 35 | 42 |
All answers different; no column of any round needs a borrow (script-checked). A snap "just in case" is allowed (the ones shelf holds fewer than ten), the scoop still lifts, and before the celebration the ten spare cubes click back into a rod in front of the child (§7 "untidy mat") — so the child sees the snap was not needed.

**Tens and ones** (G2-256 / G3-360; the scoop has rod-slots and cups):
| # | mat − scoop | answer | snap needed |
|---|---|---|---|
| 1 | 52 − 27 | 25 | a rod |
| 2 | 84 − 39 | 45 | a rod |
| 3 | 71 − 44 | 27 | a rod |
| 4 | 345 − 128 | 217 | a rod |
| 5 | 462 − 37 | 425 | a rod |
| 6 | 536 − 219 | 317 | a rod |
| 7 | 93 − 58 | 35 | a rod |
| 8 | 627 − 346 | 281 | a flat (the tens are short: 2 rods for 4 slots) |
All answers different; exactly one snap per round; three-digit scoops (128, 219, 346) have a flat-slot too — 346's needs 3 flats, 4 rods, 6 cubes.

- **Answer position:** typed — nothing to guess by place. **Measured shortcut bots:** "smaller digit from bigger" 0/8 in both tables (343, 457, 214, 133, 414, 122, 357, 242 / 35, 55, 33, 223, 435, 323, 45, 321); "snap but forget the rod is gone" (342 → 347) 0/8; "copy the minuend" 0/8. The gate recomputes all three.
- **Order:** order-only reshuffle per pass; the two 0-tens rounds never adjacent at the start.

## 7. Check, the misses, the success
- **Check with the scoop still parked** → the scoop's handle bounces; bubble "Take the scoop's number away first." (no miss).
- **Check with the scoop used but no answer** → "Type what is left on the mat." (no miss).
- **Miss 1** (wrong answer) → the shelf whose digit disagrees counts itself in place-value steps (flats `100, 200 …`, rods `10, 20 …`, cubes `1, 2 …`; 160 ms each) and the matching digit of the answer wobbles. EN **"Count what is left on each shelf."**
- **Miss 2** → the whole mat counts up in one run from the biggest blocks to the smallest — `100, 200, 300, 310, 320, 330, 331 … 337` — with a running chip that stops one step short of the end, showing `…336, ?`; the written sum (shown for this look) replays its strike and the small 1. EN **"Count on from the flats to the last cube."**
- A new move or keystroke takes the help away until the next Check.
- **Right value, untidy mat** (an extra snap left ten or more cubes on the ones shelf, e.g. 627 − 346 with a rod snapped first): the answer is right and is accepted — ten cubes click back into a rod in front of the child before the celebration, so the mat ends up reading its digits.
- **Success** → the remaining blocks light shelf by shelf left to right in step with the answer's digits; Tuck munches at his bowl (a two-step nod) — the scooped blocks sit in his tray; EN **"{a} take away {b} leaves {c} — you snapped a ten into ten ones!"** · tens-and-ones with a flat: **"{a} take away {b} leaves {c} — you snapped a hundred into ten tens!"**

## 8. Settings
1. **Take away:** nothing to snap / ones only (default) / tens and ones — two-digit numbers on the mat with a rod-slot scoop, three-digit numbers with a cups-only scoop, or rod-slots (and a flat-slot) plus cups, at rest.
2. **Written sum:** hidden (default) / shown — the column subtraction under the mat at rest.

## 9. Words (EN source)
- in-tool title: **"Tuck Breaks a Ten"** (frozen)
- instruction: **"Scoop the number away. The scoop only lifts when every cup is full — snap a ten if you need more ones. Then type what is left."**
- prompt (kept): `{a} − {b} = ?`
- hints: hintScoop **"Take the scoop's number away first."** · hintType **"Type what is left on the mat."** · hintCount **"Count what is left on each shelf."** · hintCountOn **"Count on from the flats to the last cube."** · hintShort (bubble after a refused lift) **"Some cups are empty. Where could more ones come from?"** · hintEnough (refused snap) **"There are already enough here."**
- celebrations as §7. settings: **"Take away"**: "nothing to snap" / "ones only" / "tens and ones" · **"Written sum"**: "hidden" / "shown". aria: scoop **"scoop that takes 5: 2 cups full, 3 empty"**.
- **Locale traps:**
  - (a) **"Scoop" and "cup"**: de *Schaufel / Mulde*, fr *pelle / creux*, es-MX *cuchara grande / hueco*, pt *concha / buraco*, it *paletta / incavo*, nl *schep / kuiltje*, sv *skopa / grop*, da *skovl / hul*, no *spade / hull*, fi *kauha / kolo* — bubble words; the drawn wells carry the meaning.
  - (b) **"Snap"**: a word for breaking a bar, not "borrow": de *abbrechen* (in bubbles), fr *casser*, it *spezzare*, es *partir*, pt *partir*, nl *afbreken*, sv *bryta*, da *brække*, no *brekke*, fi *katkaista*. The math verb (row 96 §9a: *entbündeln, casser une dizaine, cambio, desagrupar, inwisselen, växla, veksle, vaihtaa*) appears in the celebration where the curriculum word is expected.
  - (c) **Borrow notation:** strike-and-rewrite in all eleven (row 96 §9b); de never *Ergänzungsverfahren*; nl *cijferend*.
  - (d) The scoop's handle numeral is the content numeral — safe in every locale. Minus U+2212.

## 10. Sound off, access, phones
- Legible with the sound off: lit and dark cups, the refused lift, the cracking rod, the struck digit and the counting labels show everything; pops, cracks and boings are bonus.
- Keyboard path in §5; aria live: **"scoop over the mat: 2 of 5 cups full"**, **"a ten snapped: 3 tens, 12 ones"**.
- Taps: scoop ≥ 220 × 64; rods 44 px hit width; flats ≥ 44 px; keypad ≥ 44 px. Tuck 96 / 64 px. Check above the folds (§4).
- Reduced motion: no bend; the rod is replaced by ten cubes in one fade; the scoop moves without the swing.

## 11. Distinct from
- **Row 96 Roll-Up Mats:** take-away by dragging blocks to an away tray; a rod unrolls into a mat. Here the take-away number is **an object with that many cups** — the misconception "smaller from bigger" is made impossible by the shape of the scoop, not discouraged by a message.
- **Row 146 Nested Crates (sibling):** across a zero by nesting, with an order slip the child fills piece by piece. Here no nesting and no slip: one scoop, one lift, one snap.
- **Row 145 Trading Scale (sibling):** composing by an equal-weight trade.
- **exchange-machine (tool):** a tap trades automatically; here a ten is broken in the hand, and only when the next shelf is short.
- **counting-cups (tool):** the class scoops loose chips into cups of ten to count a big pile — grouping. Here the scoop is the *subtrahend*: it has exactly b wells and refuses to lift with any empty — taking away, not grouping.
- **Rows 26 / 28 (lunchbox, ten-seat wheel):** "exactly full" containers for making a number. The scoop is the reverse — it *removes* exactly its number and refuses to remove less.

## 12. Build plan
- **Core state:** `{ face:'none'|'ones'|'tens', a, b, mat:{H, T, O}, scoop:{need:{H,T,O}, used:false}, snaps:{H:n, T:n}, typed, written:{marks:[]} }`.
- **Functions:** `cupsFilled()` → `{H: min(mat.H, need.H), T: …, O: …}` · `canLift()` ⇔ every `mat[col] ≥ need[col]` · `lift()` (refused unless `canLift()`; refused if used) → `mat[col] −= need[col]`, `used = true` · `snap('T')` (refused if T = 0 or O ≥ 10) → T−1, O+10 · `snap('H')` (refused if H = 0 or T ≥ 10) → H−1, T+10 · `rebuild(col)` (ten of the next place back into one) · `check(n)` → `{ok, wrongCol}` · `nextTask`.
- **Gate's own truth (`verify-takeaway-scoop-core.js`):** independent column subtraction gives each answer and its borrow; `canLift()` is false at the start of every round (a snap is always needed) and true after exactly one correct snap; a scripted solver (snap → lift → type) passes every round; exhaustive search over 4-move sequences finds no way to lift with an empty cup and no state where any shelf goes negative; value conserved by every snap/rebuild; answers distinct per table; the §6 bots at 0/8.
- **Mutations:** lift allowed with empty cups · scoop takes `min(need, mat)` (partial lift) · scoop reusable in the same round · snap puts the ten cubes on the tens shelf · snap does not remove the rod · snap allowed while the ones shelf holds 10+ · cubes snappable · scoop aligns one column off · written strike made before the crack · Check allowed with the scoop parked · same order twice · celebration with the previous round's numbers.
- **Pictures:** `pets/hamster` only. Scoop, cups, rods, flats, cubes and tray are apparatus geometry.
- **Risks:** a 3-digit scoop (346) at 360 is wide — flat-slots 34 px, rod-slots 12 × 70, cups Ø 18: 3 × 38 + 4 × 16 + a 5-cup row (5 × 22) ≈ 290 px ≤ 328: fits. Nothing blocked.

## 13. The four questions
1. **Would a 5–8-year-old choose it again?** Yes — a scoop that slurps, a scoop that goes *boing*, and rods that snap like chocolate.
2. **Would a teacher put it on the board?** Yes — "you can't take 5 from 2, so we break a ten" is exactly what the scoop shows, and the scoop makes the "smaller from bigger" error physically impossible; the written strike appears at the crack.
3. **Would a parent trust it?** Calm, one library hamster, numerals and column names only, no timer or score.
4. **The invention in one sentence:** the number you take away is a scoop with that many cups, and it only lifts when every cup has a block under it.

## 14. Critic review (2026-10-17)
Scores before → after: invention 5→5 · fun 5→5 · completeness 4→5 · correctness 4→5 · distinctness 4→5 · reality 5→5
What changed:
- Both tables re-solved by script (`work-c33/verify.js`): ones-only answers 337 443 206 127 406 118 343 238 (each needs exactly one rod snap; #3 and #5 leave 0 tens), tens-and-ones answers 25 45 27 217 425 317 35 281 (exactly one snap each — 627 − 346 is the one flat snap, the tens being 2 against 4). The smaller-from-bigger bot re-measured: 35 55 33 223 435 323 45 321 / 343 457 214 133 414 122 357 242 — 0/16, as claimed.
- **G2-205 was not covered:** the sheet is two-digit take-away with **no** borrowing, and every round here needed a snap. Added the **nothing to snap** warm-up (58−23, 47−15, 86−52, 79−46, 64−21, 95−54, 38−14, 77−35 — answers 35 32 34 33 43 41 24 42, distinct, no borrow in any column): the scoop lifts at once, which is the lesson.
- **Coverage stated honestly:** the addition sheets on this row's map (G2-255/258, G3-359/361) are carried by #267 and row 145; a take-away scoop does not pretend to add.
- Distinct from the counting-cups tool stated (its scoop groups; this scoop is the subtrahend). Notation re-checked against row 96 §9b: strike-and-rewrite at the crack, de *entbündeln*.
- Layout check (2026-10-17): switched to stacked — split stage column is ~370 px at 704.
