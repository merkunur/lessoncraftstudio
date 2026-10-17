# Row 96 — The Roll-Up Mats: the tenth well hangs over the edge (1.NBT.C.4)

## 0. Identity
- **id** `place-value-regroup.add-compose-ten.1-nbt-c-4` (frozen) · grade 1 · CCSS 1.NBT.C.4 (+ 2.NBT.B.5 / 2.NBT.B.7 column faces) · strand Number & Operations in Base Ten · own files `roll-mat-core.js`, `roll-mat-activity.js`, `roll-mat-activity.html`; the manifest row stays in `place-value-regroup-activities.json` (its `tool` becomes `roll-mat-activity`; slug, title and intro frozen en..sv; da/no/fi metadata new at build).
- **Worksheets covered:** G2-203 Add the Blocks · G2-251 Column Addition and Subtraction · G2-255 2-Digit Column Addition · G2-256 2-Digit Column Subtraction · G2-257 3-Digit Numbers in Columns · G2-258 3-Digit Column Addition · G2-259 Column Method Review.
- **Old activity:** Tuck the hamster beside a base-ten mat; a button "🔁 Make a ten" bundled ten ones automatically, then the child typed the total. **Kept:** the eight rounds (27+5, 48+6, 36+7, 19+4, 55+8, 63+9, 74+8, 28+6); Tuck (now the library picture `pets/hamster`, never a drawing); the authored column names `colHundreds/colTens/colOnes` (8 locales) and the spoken frame (`plus` / `minus` / `makes`). **Dropped:** the button that did the regrouping for the child — the child's own hand now rolls the ten.

## 1. The pitch
"Every column has a mat with exactly ten wells — and the tenth well hangs out over the answer box, so a full mat has to be rolled up into a ten and carried next door, where it writes the little 1."

## 2. Why a child will want it again
- **Rolling a mat is pure toy.** When the tenth cube clicks in, the mat's loose edge curls up 6 px and wiggles. The child swipes across the mat and it rolls up like a sleeping bag (320 ms, the wells vanishing one after another into the roll) into a single ten-rod that stays under the finger. Children will roll mats for the sake of rolling them.
- **Carrying is a real carry.** The rod rides on the finger over the column wall and drops onto a little shelf on top of the tens column. Where it lands, the small "1" appears in the written sum, exactly in the carry place. The written mark and the physical ten are one object.
- **Unrolling is just as good** (take-away faces): drag a rod down into the ones column and it unrolls into a full mat of ten with a soft *flump*.
- **Tuck keeps a stack of tens.** The library hamster sits at the bench's right edge. Every ten rolled in the round is laid as a small ten-rod (drawn apparatus, 6 × 30 px, the same segment lines as the bench rods — never a drawn log) on a stack at Tuck's feet; on success Tuck hops (a 2-step translate, 240 ms). Over a pass the stack grows — a quiet record of every ten the child made, never a score and never counted for them.
- **Free play:** after each celebration the bench stays live ("workbench"): cubes can be poured from the bin, mats rolled and unrolled at will, the written sum below following every move. No task, just the toy, until Next.

## 3. The skill and the misconception
- **Skill:** add a two-digit and a one-digit number when the ones make ten or more, by composing a ten (1.NBT.C.4); in the column faces, add and subtract 2- and 3-digit numbers one place at a time, ones first, recording the carried or borrowed ten (the G2 column sheets).
- **Misconception 1 — the ten that never leaves:** writing the whole ones sum in the ones place (27 + 5 → "212"), or writing the 2 and losing the ten (→ 22). **Pushback by physics:** a column's frame is nine wells tall; the mat's tenth well sticks out *over the answer box* below the column. As long as a full mat lies in a column, its tenth cube sits on the box where the digit goes — the box is physically covered and cannot be written in. Only rolling the mat away uncovers it, and a rolled ten cannot stay (a rod does not fit a well): it has to go next door.
- **Misconception 2 — the carry that is never added:** **Pushback:** the rod on the carry shelf overhangs the tens box exactly as the tenth well did; the tens box stays covered until the shelf rod is tapped down into the tens mat.
- **Misconception 3 (take-away) — "smaller from bigger":** 52 − 17 written as 7 − 2 = 5 ones. **Pushback:** the child drags 7 cubes away from a column that holds 2; the third drag picks up air and the empty mat gives a small shake. To take more, a rod must be pulled down from the tens and unrolled — and that same motion strikes the written tens digit and writes the new one above it.

## 4. The stage
**At 704 px (stacked; the bench is the hero, ≈ 640 × 520):**
- **The sum strip** (top, 72 px): the exercise in written column form on squared paper (` 27` over `+  5`, a rule, one answer box per column, 52 × 60 px, digits 40 px Baloo 2). Above the tens digit a dashed carry box 28 × 28. Columns align exactly with the bays below. In the grade-1 face the strip shows `27 + 5 = ▢` with one wide total box (96 × 60) under the bench's ones/tens boundary.
- **The bench** (640 × 380): two (three) column bays with low walls, headed by the localized column name in 18 px (content words of place value — allowed). Bay width 240 px (3 bays: 200 px).
  - **One rule for every mat:** 2 columns × 5 rows of wells shaped for that column's block, filled column by column top to bottom (so a full mat always reads as two fives); the tenth well (bottom of the right column) protrudes 40 px below the bay floor, over that column's answer box (grade-1 face: over the right half of the total box).
  - **Ones bay:** wells 34 px, cubes 30 px (mat 76 × 178 + the protruding well).
  - **Tens bay:** rods lie *horizontal* in rod-wells, two stacks of five (rod 100 × 22 px, a strip of ten cube segments with faint lines; mat 212 × 128 + the protruding well). A **carry shelf** (200 × 18 ledge) on top of the tens bay wall; in 3-digit faces a second shelf on top of the hundreds bay.
  - **Hundreds bay (3-digit faces, bays 200 px):** flats 56 × 56 px (a 10 × 10 grid of faint lines) in 2 columns × 5 rows (mat 120 × 300 + the protruding well); in 3-digit faces the tens rods shrink to 80 × 18 and cubes to 26 px so the three bays share one baseline.
  - **Doorstep:** a ledge above each mat (two rows of five) where blocks wait when the mat is full.
- **The bin** (left of the bench at 704; under it at 360): the second number's blocks in a shallow tray — cubes heaped, rods side by side, flats stacked. **Colours:** the first number's blocks coral, the second number's teal (kept in the mats so the child sees where each came from); a rolled ten turns plain cream-ink, it belongs to neither.
- **The away tray** (take-away faces only): bottom strip, where taken blocks go.
- **Tuck:** `pets/hamster`, 96 px (64 px phones), bottom-right, never over a bay; his stack of small ten-rods to his left.
- **The written carry and borrow marks (per locale, decided — see §9 traps b/c):** the carry box sits above the top number in every locale except **de**, where it sits in the slim *Übertragszeile* just above the answer rule, under the next column (the German book layout). Borrowing is written strike-and-rewrite in every locale (the struck digit, the new digit small above it, a small 1 in front of the ones digit).
- **Task line** (≤ 24 px): see §9.
- **Keypad** (0–9, ⌫, 44 px keys) docks under the box being written.
- **No words on the apparatus** except the column names and the numerals of the sum.

**At 360 px:** sum strip on top (boxes 44 × 52); two bays × 164 px (cube wells 26 px, cubes 24 px; rods 70 × 16 in two stacks; targets are whole mats, whole rods, the heap — all ≥ 44 px); bin becomes a strip under the bench; keypad docks at the bottom; Check above the 740 fold. 3-digit at 360: bays 108 px, cubes 18 px, rods 48 × 12, flats 40 × 40, all in the same 2 × 5 mats (tenth protrudes); the drag targets stay whole mats/shelves (≥ 44 px), a single small block is never the only target. At 320: bays 96 px, keypad 6 + 5 keys of 44 px.

## 5. The hand
- **Pour:** drag a cube from the bin into a bay — or press-and-hold the heap to lift a handful that pours in one cube every 80 ms. Each cube flies to the next free well (fill order column by column, top to bottom, so a full mat always reads as two fives). A click per cube, rising a semitone after five.
- **The tenth cube** drops into the protruding well with a heavier *clunk*; the mat's left edge curls 6 px and a grip shows (≤ 100 ms). Cubes that arrive while the mat is full do not enter; they line up on the doorstep, glowing softly — there is nowhere for them to go.
- **Roll:** drag across the full mat ≥ 40 px in any direction (keyboard: Enter on the mat). The mat rolls (320 ms) into one rod held by the finger. Released over the next bay's shelf → it lies there and the "1" fades into the carry box (180 ms). Released anywhere else → after 400 ms the rod glides to the shelf on its own: a ten has exactly one place to go. The doorstep cubes then tumble into the fresh empty mat (60 ms each).
- **Drop the carry:** tap the shelf rod → it drops into the tens mat's next rod-well. A full tens mat rolls into a flat by the same gesture onto the hundreds shelf.
- **Unroll (take-away):** drag a rod from the tens mat down into the ones bay → the ones already there step onto the doorstep, the rod unrolls into a full mat (300 ms), then the doorstep ones slide back onto it… they cannot — the mat is full — so they stay on the doorstep beside it, and the bay now plainly holds "a full ten and 2". In the sum strip the tens digit gets a pencil stroke, the new digit appears above it, and a small "1" appears in front of the ones digit (2 → 12). A flat dragged into the tens bay unrolls into ten rods the same way (across-zero rounds).
- **Take away:** drag blocks (or a press-and-hold handful) from a bay to the away tray, one soft tick each; the doorstep empties first, then the mat. An empty bay gives nothing (air, a little shake).
- **Write:** tap an open box → keypad, one digit per box. **A box opens only when its own column AND every column to its right is settled** (nothing of that column still in the bin, nothing on a doorstep, no full mat, no rod on a shelf). Until then the box is frosted and the keypad does not dock. So the boxes open right to left by themselves — ones first is a property of the bench, never an instruction — and a child cannot write the tens digit of 27 + 5 before the carried ten has arrived.
- **Undo:** until Check every block can be dragged back; a rolled ten can be unrolled by dragging it back into the ones bay; a written digit can be cleared with ⌫.

## 6. The rounds
One round = one exercise. The first number is already on the bench; the second waits in the bin.

**"Numbers: + one digit"** (default, grade 1; one total box) — the old eight plus two that teach judgement:
| # | sum | ones | what the bench does |
|---|---|---|---|
| 1 | 27 + 5 = 32 | 12 | roll, 2 left |
| 2 | 48 + 6 = 54 | 14 | roll, 4 left |
| 3 | 36 + 7 = 43 | 13 | roll, 3 left |
| 4 | 19 + 4 = 23 | 13 | roll, 3 left |
| 5 | 55 + 8 = 63 | 13 | roll, 3 left |
| 6 | 63 + 9 = 72 | 12 | roll, 2 left |
| 7 | 74 + 8 = 82 | 12 | roll, 2 left |
| 8 | 28 + 6 = 34 | 14 | roll, 4 left |
| 9 | 46 + 4 = 50 | 10 | mat exactly full → roll, nothing left |
| 10 | 42 + 5 = 47 | 7 | no ten — nothing to roll |

Take-away in this face (Way = take away): 32−5=27 · 54−6=48 · 43−7=36 · 23−4=19 · 63−8=55 · 72−9=63 · 81−3=78 · 50−6=44 · 47−5=42 (no unroll) · 68−4=64 (no unroll).

**"Numbers: two digits"** (columns; G2-251/255/256/259)
- add: 38+25=63 · 47+36=83 · 29+44=73 · 56+28=84 · 15+67=82 · 64+17=81 · 52+34=86 (no carry) · 45+45=90 (ones exactly ten).
- take away: 52−17=35 · 63−29=34 · 71−46=25 · 84−39=45 · 45−18=27 · 90−34=56 (ones bay starts empty) · 76−32=44 (no unroll) · 60−23=37.

**"Numbers: three digits"** (G2-203/257/258/259)
- add: 247+135=382 · 368+154=522 · 456+273=729 · 189+236=425 · 305+478=783 · 625+193=818 · 432+215=647 (no carry) · 199+201=400 (two carries, two mats exactly full).
- take away: 452−127=325 · 634−281=353 · 503−168=335 (across a zero: a flat must be unrolled first) · 721−345=376 · 860−412=448 · 915−308=607 · 586−243=343 (none) · 400−156=244 (zero cascade).

**Way:** add / take away / both (both alternates via the shuffle, never three of one kind in a row).
- **Answer position:** typed answers — nothing to guess by position. The gate checks that the no-carry round is never first in a pass and that carry kinds (ones only / tens only / both / exactly-ten) are spread across each pass.
- **Order:** order-only reshuffle per pass, never the same order twice.
- **No 0 as a count:** every result ≥ 19; a 0 *digit* (50, 90, 400) is place-value content.

## 7. Check, the misses, the success
- **Check with nothing done** → bubble "Bring the blocks over first." (no miss).
- **Check while a box is covered or frosted** → the covering mat, shelf rod or waiting doorstep cubes pulse and the grip wiggles; bubble "Something is lying on that box." (no miss — the apparatus already shows why).
- **Miss 1** (a digit does not match what lies loose in its column / wrong total): every block in that column lifts 4 px and gets a faint numeral in fill order (1, 2, 3 …) — the column counts itself; the wrong digit wobbles. EN **"Count what is left in this column — that is the digit."**
- **Miss 2:** the column's blocks shuffle back into two fives and the written digit's correct value ghosts in pencil under the box (grade-1 face: ghost rods and cubes under the total box, "3 tens, 2 ones"). EN **"{t} tens and {o} ones — write it as a number."**
- A new move takes the help away until the next Check.
- **Success:** the written digits light right to left, the carry "1" lighting with its column; Tuck hops; the round's rolled tens slide onto his stack. EN **"27 plus 5 makes 32 — ten ones rolled up into one ten!"** (no-carry: **"42 plus 5 makes 47 — no ten to roll this time."** · take-away: **"52 take away 17 leaves 35 — you unrolled a ten!"**).

## 8. Settings
1. **Numbers:** + one digit (default) / two digits / three digits — changes the bays (2 / 2 / 3) and the sum strip at rest.
2. **Way:** add / take away / both — take-away puts the away tray on the bench at rest and changes the task line.

## 9. Words (EN source)
- in-tool title: **"Tuck's Ten Bundles"** (page title frozen)
- instruction (add): **"Add the blocks. Roll up a full mat and carry it next door."** · (take away): **"Take away. Need more? Pull one down from next door and unroll it."**
- prompts (kept): `{a} + {b} = ?` · `{a} − {b} = ?`
- hints: hintStart **"Bring the blocks over first."** · hintCovered **"Something is lying on that box."** · hintCount **"Count what is left in this column — that is the digit."** · hintShow **"{t} tens and {o} ones — write it as a number."** · hintEmpty **"This column is empty. Pull one down from next door."**
- celebrations: **"{a} plus {b} makes {c} — ten ones rolled up into one ten!"** · **"{a} plus {b} makes {c} — no ten to roll this time."** · **"{a} take away {b} leaves {c} — you unrolled a ten!"** · **"{a} take away {b} leaves {c}."** (3-digit add with a hundred: **"… ten tens rolled up into one hundred!"**)
- settings: **"Numbers"**: "+ one digit" / "two digits" / "three digits" · **"Way"**: "add" / "take away" / "both"
- column names kept; new: da *enere / tiere / hundreder*, no *enere / tiere / hundrere*, fi *ykköset / kymmenet / sadat*.
- **Locale traps:** (a) **regrouping words are not translatable one-to-one** — de *bündeln / entbündeln, Übertrag*; fr *retenue*; it *cambio*; es *llevar / reagrupar* (es-MX *llevar*); pt *vai um / empresta*; nl *inwisselen, onthouden*; sv *växla, minnessiffra*; da *veksle, mente*; no *veksle, minnetall*; fi *muistinumero, lainata* — they appear only in bubbles; the apparatus shows the act. (b) **Borrow notation — DECIDED: strike-and-rewrite in all 11 locales, because it is the written shadow of the one act the bench performs (unrolling a ten).** de: this is the *Abziehverfahren mit Entbündeln*, the method the newer Länder curricula prescribe (e.g. Bayern LehrplanPLUS) and that most current Klasse-3 books teach; the older *Ergänzungsverfahren mit Erweitern* (adding up, a small 1 written under the subtrahend's next digit) is a **different algorithm** — it adds ten to both numbers instead of unbundling one — so the bench cannot honestly enact it and does not pretend to; the de bubbles say *entbündeln*, never *borgen/ergänzen*. nl: the bench enacts **cijferend** column subtraction (ones first, *inwisselen* written strike-and-rewrite); *kolomsgewijs* rekenen works left to right on whole place values with no carry digits at all, so it is a different method the bench does not model — the nl copy says *inwisselen* and never *kolomsgewijs*. No notation setting (it would be a third setting that changes nothing on the bench). (c) **Where the carry is written — DECIDED per locale:** de draws the carry box in the *Übertragszeile* (small, just above the answer rule, under the next column) — where German children write the *Übertrag*; every other locale (incl. sv *minnessiffra*, da *mente*, no *minnetall*, nl *onthouden*, fr *retenue*, fi *muistinumero*) draws it above the top number. The rod still lands on the shelf; only the strip's box moves. (d) Number words never appear on the bench, so de/nl/da ones-first and fr/da vigesimal names cannot collide with the columns; spoken celebrations use each locale's words (TTS bonus only). (e) Minus is U+2212 everywhere.

## 10. Sound off, access, phones
- Legible with sound off: curl, doorstep glow, covered box, strike-through digit, woodpile are all visible; tones are bonus.
- Keyboard: Tab cycles bin → bays → shelves → boxes; Space lifts the selected block or a handful; ←/→ choose the bay; Enter drops; Enter on a full mat rolls it; Enter on a shelf rod drops it.
- aria: bay `aria-label="ones: 12 — the mat is full"`; box `aria-label="ones answer, covered by a full mat"` while covered.
- Taps: mats, rods, flats, the heap, the shelf ≥ 44 px; a single cube is never the only target. Tuck 96 / 64 px. Check above the fold at 360×740 and 320×640 (the keypad overlays the bin strip while open).

## 11. Distinct from
- **exchange-machine (tool):** a tap trades automatically. Here the trade is the child's gesture and the *reason* to trade is physical — the tenth well covers the box.
- **place-value-lab (tool):** ten ones snap into a ten by themselves. Nothing snaps by itself here.
- **#30 Overflow Trays / #31 Ghost Rafts (designed):** teen numbers; no columns, no written method.
- **New #267 One-Digit Box (designed):** written digits only. Here the blocks come first and the written sum is their shadow; #267 is the next step that drops the blocks.
- **Rows 93/94 (Bo's pantry, Bundle Bot):** making tens to *count*, not to add or subtract.

## 12. Build plan
- **Core state:** `{ face:'add1'|'col2'|'col3', way:'add'|'sub', a, b, bays:[{col:'O'|'T'|'H', mat:[{src:'a'|'b'|'r'}…], door:[…], shelf:null|'rod'|'flat'}], bin:{O,T,H}, away:{O,T,H}, boxes:{O,T,H}, total, struck:{T,H} }`.
- **Functions:** `pour(col,n)` · `isFull(col)` · `roll(col)` (refused unless 10 in the mat) · `dropShelf(col)` · `unroll(col)` (refused if nothing above) · `takeAway(col,n)` → number actually taken (never more than present) · `isCovered(col)` = `isFull(col) || shelf(col)` · `write(col,d)` refused while covered · `check()` → `{ok, missCol}` · `nextTask` with order-only reshuffle.
- **Gate's own truth (`verify-roll-mat-core.js`):** a from-scratch column-arithmetic oracle gives the expected digits, carries and borrows of every round; a scripted solver using only public functions must reach them; `write` refuses on every covered state; `roll` refuses at 9; `takeAway` never below 0; one right answer per round; all results ≥ 19; carry kinds spread per pass; celebration numbers equal the round's numbers.
- **Mutations:** roll allowed with 9 · tenth well not protruding (write allowed while full) · shelf rod not covering the tens box · rolled rod may stay in the ones bay · takeAway goes negative · unroll without striking the tens digit · fill order row-wise (full mat no longer two fives) · no-carry round first · same order twice · celebration uses the previous round's numbers · across-zero round solvable without unrolling the hundred.
- **Pictures:** `pets/hamster` (seen on the pets contact sheet; `pets/gerbil` is a near-twin and is never used). Everything else is apparatus geometry.
- **Mutations (added by the critic):** a box opens while a column to its right is unsettled · the de carry box drawn above the top number · a rolled ten laid on Tuck's stack before it was carried.
- **Risks:** doorstep of 9 cubes at 360 → two rows of five (fits 164 px). de/nl notation decided (§9 b/c) — the native reviewer checks wording only. Nothing blocked.

## 13. The four questions
1. **Choose it again?** Yes — rolling a mat up and carrying it over is a gesture children repeat for its own sake, and Tuck's woodpile grows.
2. **Teacher on the board?** Yes — it is the workmat teachers already use, plus the one thing a workmat cannot do: the tenth cube covers the digit, so "why do we carry?" is answered by the apparatus, and the written column method appears in the same motion.
3. **Parent trust?** Calm, no timer, a library hamster, numerals only, the school method.
4. **Invention:** each column's mat has ten wells and the tenth hangs over the answer box — a full mat must be rolled up and carried next door, where it writes the little 1.

## 14. Critic review (2026-10-17)
Scores before → after: invention 5→5 · fun 5→5 · completeness 4→5 · correctness 4→5 · distinctness 4→5 · reality 4→5
What changed:
- Every round re-computed (10 + 10 grade-1, 8 + 8 two-digit, 8 + 8 three-digit): all correct, all results ≥ 19, carry/borrow kinds as labelled.
- **Ones first is now physics, not luck:** a box opens only when its column and every column to its right is settled — the old text let a child write the tens digit of 27 + 5 before the carry arrived.
- **Mat geometry made buildable:** ten 30 × 150 px rods could not fit a 240 px bay and 96 px flats could not fit a 200 px bay; one 2 × 5 rule per block with exact sizes at 704 / 360 / 320.
- **Open question decided:** strike-and-rewrite everywhere (de = *Abziehen mit Entbündeln*, nl = *cijferend*); the Ergänzungsverfahren and kolomsgewijs are named as different algorithms the bench does not enact; no notation setting. Carry box position decided per locale (de *Übertragszeile*).
- Tuck's "woodpile of logs" (a hand-drawn object) became a stack of small drawn ten-rods.
- Distinct from the premium exchange-machine re-checked: the tool trades on a tap at any time; here a trade is possible only at exactly ten, is forced by the covered box, and takes two gestures (roll, carry).
