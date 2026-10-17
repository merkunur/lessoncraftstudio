# Row 23 — Show the Operation → THE STAMP FRAME (K.OA.A.1)

## 0. Identity
- id `ten-frame.show-the-operation.k-oa-a-1` (KEPT; slugs/metadata frozen) · grade K · CCSS K.OA.A.1 · Operations & Algebraic Thinking · own files `stamp-frame-core.js`, `stamp-frame-activity.js`, `stamp-frame-activity.html`, `stamp-frame-activities.json` (the row leaves `ten-frame-activities.json`; the id is unchanged).
- page title (frozen): "Show the Operation — Add & Subtract on a Ten Frame"; intro (frozen): "For '3 + 2', place 3 counters then 2 more in a second colour to see the two parts make 5; for '5 − 2', start with 5 and take 2 away." — kept true word for word: counters on a ten-frame, a second colour for the second addend, take-away for subtraction.
- worksheets also covered: **K-028** How Many Altogether? · **K-267** Subtraction Color by Code · **K-268** Add and Subtract Coloring · **K-269** Color by Code: Sums to 20 (the within-20 level, two frames) · **G1-101** Add the Pictures · **G1-102** Picture Addition · **G1-105** Ten-Frame Addition · **G1-110** Domino Math · **G1-111** Roll and Add (the "Dots" setting shows addends as domino halves and dice faces) · **G1-103** Cross Out and Subtract · **G1-104** Picture Subtraction (the cross-out stamp IS the cross-out model).
- old activity: 10 problems (3+2, 4+3, 5+4, 2+6, 1+5, 5−2, 8−3, 7−4, 9−6, 6−2) on one ten-frame, tap cells to place counters. All 10 problems are kept as the "Within 10" level.

## 1. The pitch
"Three rubber stamps — a coral dot, a teal dot, and a big cross — and you print the sum on the ten-frame; the equation's numbers then reach down and check your printing."

## 2. Why a child will want it again (the fun)
- **Stamping is irresistible.** The child lifts a stamp from the rack; it hovers over the frame following the finger with its shadow; a tap presses it down — it squashes (scale-y 0.82, 90 ms), "thup", and leaves a round inked counter that spreads from the centre (a 140 ms ink bloom). Lifting a stamp, choosing a colour, thumping it down: a real-world toy feel.
- **The cross stamp.** In take-away rounds the big X stamp thumps a cross onto a counter, which dims. At success every crossed counter peels off the frame like a sticker (a little curl, 400 ms) and floats into the "away" dish at the side. "Take away" happens before your eyes.
- **The equation reaches down.** At Check each number in the equation drops a bracket down over its own counters. When it is right, the brackets click shut exactly round the counters. When it is wrong, a counter sticks out of its bracket or a dotted gap sits inside it — the child sees it at once.
- **The join.** On a right addition the bracket between the two colours dissolves and one big bracket closes round all of them, and the total pops into the equation's box with a two-note chime.
- **Free play ("Stamp anything"):** all three stamps, two frames, no equation — the equation writes itself live from what is stamped (coral + teal = total, crosses as minus). Children print patterns and watch the sum follow.

## 3. The skill and the misconception
- **Skill (K.OA.A.1):** represent addition and subtraction with objects (counters), drawings (the cross-out picture model of G1-103/104), and expressions; find "how many altogether" and "how many left".
- **Misconception 1: the parts, not the whole.** Children make 4 and 3 and answer "4, 3" or the bigger part. **Push back:** after the parts are proved, the two brackets merge into one around all the counters and the answer box sits under THAT bracket; the answer strip rejects a part (see §7 — the bracket of the part glows to show which group was counted).
- **Misconception 2: subtraction as a second group.** Children stamp 5 and then 2 MORE. **Push back:** subtraction rounds offer the coral stamp and the cross stamp only — the teal stamp is not on the rack; the "2" in "5 − 2" brackets crossed counters, so 2 more uncrossed counters stick out of the first bracket.
- **Misconception 3: counting the crossed ones.** Children cross 3 of 8 and answer 8 or 3. **Push back:** before the answer is asked, the crossed counters peel away into the dish; only the left-over counters remain on the frame.
- **Misconception 4: miscounting a part.** **Push back:** the bracket under each number has exactly that many dotted slots; an extra counter or an empty slot is visible.

## 4. The stage
**Layout: stacked at every width** (layout check 2026-10-17: no `layout:'split'` — its stage column is only ≈ 370 px at 704, too narrow for this apparatus). The stage takes the full card width, ≈ 648 px at 704 (≈ 656 at 1024); whatever §4 places in a left, right, side or bubble column stays side by side inside the stage when the activity draws it, while the shell's bubble, keypad and Check sit under the stage. Sizes written for a wider stage fit the 648 px by closing margins and gaps first; no picture drops below 96 px, no tap below 44, no data mark or grid cell below 40.

**At 704 px:**
- **Task line** 22 px: "Show 4 + 3 on the ten-frame."
- **Equation strip** above the frame: numerals 48 px Baloo 2, the first addend in coral, the second in teal, the subtrahend in ink with a small cross icon after it, the operator and "=" in ink, the answer box a 56 × 56 dashed square. In the **Dots** setting each addend is drawn as a domino half or a die face (pips 10 px, drawn geometry) in its colour instead of a numeral; the answer box stays a numeral box.
- **The ten-frame:** 2 × 5 cells, cells 62 px with 6 px gaps → 340 × 130 px, teal 3 px outline. Within 20: two frames stacked, 12 px apart (the second frame takes ink only once the first is full, §5).
- **Counters (inked):** 50 px discs, coral #F2784B or teal #2E9C88; crossed counters keep their colour at 45 % opacity with a 6 px ink X across them.
- **Stamp rack** under the frame: two (or three in free play) stamps, each a round handle 64 px on a block 72 × 40 px; the stamp face shows a disc (coral or teal) or an X. The selected stamp lifts 12 px off the rack.
- **Away dish** (subtraction rounds): a shallow drawn dish 110 × 44 px to the right of the frame where peeled counters land, stacking.
- **Right column (196 px):** the **answer strip** — numerals 1–10 in two rows of five (1–20 in four rows within 20), each 48 × 48 px (Baloo 2, 26 px) → bubble (≤ 3 lines) → speaker.

**At 360 px:** stacked: task line → equation strip (numerals 38 px, answer box 48) → frame cells 56 px (frame 304 × 118; within 20 two frames, cells 52) → stamp rack (handles 56 px) → answer strip in two rows of five keys 56 × 48 px (within 20: four rows, keys 56 × 40) → bubble → Check. Check bottom ≈ 660 px (within 10) / ≈ 730 px (within 20) at 360×740. At 320×640 the answer strip appears only after the stamping is proved (it replaces the stamp rack in place), so Check stays at ≈ 600 px.

**Pictures:** none on the play surface — counters, stamps, frame, dish and pips are apparatus geometry. (The picture-addition worksheets are served by the same act: two groups combined and counted; their library pictures do not fit ten-frame cells at the required ≥ 96 px, and drawn counters are the honest model. Recorded as a deliberate choice, not a gap.)

**Words on the apparatus:** numerals only.

## 5. The hand
- **Tap a stamp on the rack:** it lifts (12 px, 100 ms) and its ghost follows the pointer over the frame (on touch: the stamp stays lifted; the next tap on a cell stamps). Tap another stamp to switch; tap the lifted stamp to put it back.
- **Tap an empty cell with a dot stamp:** the stamp travels to the cell (90 ms), squashes, "thup" (low wood tone; coral a third lower than teal so the two colours sound different), ink blooms (140 ms), the stamp hops back up.
- **Tap an inked cell with the same dot stamp:** wipes it (the ink shrinks to nothing, 120 ms, a soft "shff").
- **Tap a coral counter with the X stamp:** crosses it (X draws in two strokes, 160 ms, "tick-tick"); tap again with X: uncrosses.
- **Order of filling:** free — the child may stamp any cell. **The tidy (critic: a bracket can only close round counters that sit together, and a child who stamps coral, teal, coral, teal would leave the brackets nothing to enclose):** at Check, before the brackets drop, the inked counters slide into reading order in 300 ms — all coral first, then teal (addition); all uncrossed coral first, then the crossed ones at the end (subtraction) — with a soft "shhk". So the first number's bracket always spans the first run, the second number's bracket the next run (addition) or the crossed tail INSIDE the first bracket (subtraction: the 3 of 8 − 3 is part of the 8). The tidy is also what the ten-frame convention looks like, so the child sees 5 and 2 as "a full row and two". It never changes how many of each colour there are (the gate asserts colour counts are equal before and after).
- **Within 20:** cells of the second frame accept ink only when the first frame is full (a stamp over an empty second-frame cell while the first has room shows a small arrow back to the first empty cell) — the ten-frame convention, fill a ten first.
- **Answer strip:** tap a numeral → it flies into the answer box (200 ms).
- **Free play:** "Stamp anything" — all three stamps, two frames, live equation.

## 6. The rounds
One round = one expression. Two steps: **(1) stamp it** (Check proves the parts), **(2) tap how many altogether / how many left** on the answer strip.

**Level "Within 10" (default; the old 10 problems):**
| # | expression | coral | teal / crossed | answer |
|---|---|---|---|---|
| 1 | 3 + 2 | 3 | 2 | 5 |
| 2 | 4 + 3 | 4 | 3 | 7 |
| 3 | 5 + 4 | 5 | 4 | 9 |
| 4 | 2 + 6 | 2 | 6 | 8 |
| 5 | 1 + 5 | 1 | 5 | 6 |
| 6 | 5 − 2 | 5 | 2 crossed | 3 |
| 7 | 8 − 3 | 8 | 3 crossed | 5 |
| 8 | 7 − 4 | 7 | 4 crossed | 3 |
| 9 | 9 − 6 | 9 | 6 crossed | 3 |
| 10 | 6 − 2 | 6 | 2 crossed | 4 |

**Level "Within 5" (K-028, K-267):** 2 + 1 = 3 · 1 + 3 = 4 · 2 + 2 = 4 · 3 + 2 = 5 · 1 + 4 = 5 · 5 − 1 = 4 · 4 − 2 = 2 · 5 − 3 = 2 · 3 − 1 = 2 · 4 − 3 = 1.

**Level "Within 20" (K-269, two frames):** 8 + 5 = 13 · 9 + 7 = 16 · 6 + 6 = 12 · 7 + 8 = 15 · 10 + 4 = 14 · 15 − 6 = 9 · 13 − 5 = 8 · 18 − 7 = 11 · 14 − 7 = 7 · 17 − 7 = 10. (Answers 13, 16, 12, 15, 14, 9, 8, 11, 7, 10 — all different.)

**Dots setting:** numbers ≤ 6 show as a die face; 7–10 as a domino (two halves, e.g. 8 as 4|4, 9 as 5|4, 7 as 4|3, 10 as 5|5). Within 5 and Within 10 every number becomes dots. Within 20 the Dots setting applies to numbers ≤ 10 only; larger starts stay numerals.

**No 0 anywhere** — no addend, subtrahend or answer is 0 (the gate asserts it). Answers within each level are not all the same (Within 10: 5, 7, 9, 8, 6, 3, 5, 3, 3, 4 — the old set; the three 3s are kept because they are the old content, and the order reshuffle separates them: no two equal answers adjacent).

**Answer position:** the answer strip is a fixed number line 1–10 (1–20), so position = value and cannot be gamed; the guessing risk is reading the answer off the equation — impossible, the box is blank. Step 1 has no options. The gate checks no two equal answers are adjacent after the shuffle and that + and − alternate in runs of at most 2.

**Order:** order-only reshuffle per pass; never the same order twice.

## 7. Check, the misses, the success
- **Check with an empty frame:** no miss. The coral stamp lifts and bobs; bubble: **"Lift a stamp and press it on the frame."**
- **Step 1 right:** each equation number drops a bracket (220 ms) over its counters and it clicks shut (tick). Addition: the two brackets merge into one around all counters (300 ms), the answer box glows and the answer strip wakes. Subtraction: the crossed counters peel off one by one (120 ms apart) into the away dish; the brackets re-form: the first number's bracket now shows only the left-overs. Bubble: **"4 and 3. How many altogether?"** / **"8 take away 3. How many are left?"**
- **Step 1 miss 1:** brackets drop anyway: a counter outside its bracket glows coral-red and wobbles (extra), an empty dotted slot inside a bracket pulses (missing); a wrong colour (teal in a subtraction, or a crossed counter in an addition) sits under no bracket and wobbles. Bubble: **"Look under the {4}: one counter is outside the bracket."** / **"Look under the {3}: one place is still empty."** / subtraction with teal used: **"Take away means cross out. Use the cross stamp."**
- **Step 1 miss 2:** the brackets stay down and the slots number themselves (1, 2, 3, 4 inside the dotted slots); bubble: **"Stamp one counter in each place under the {4}."**
- **Step 2 wrong numeral:** miss 1: if the child tapped a part (4 or 3; 8 or 3), that part's bracket lights and says it — bubble: **"That's the {4} part. Count them all."** (subtraction: **"Those were taken away. Count the ones still on the frame."**). Otherwise the counters under the big bracket get a gentle wave from the first to the last (a counting sweep, 150 ms each) with no numbers; bubble: **"Count every counter on the frame."** Miss 2: the sweep now shows small numerals 1, 2, 3 … on the counters; bubble: **"Count with the numbers."**
- **A new stamp or tap takes the help away** until the next Check.
- **Success:** the answer settles in the box, the whole frame does a soft bounce, and the equation reads complete. Bubble: **"4 + 3 = 7. The two parts make 7!"** / **"8 − 3 = 5. 5 are left!"** In Dots: **"The 4-dot and 3-dot sides make 7!"**

## 8. Settings
1. **Numbers:** Within 5 / Within 10 / Within 20 (default Within 10) — at rest one or two frames and the matching answer strip.
2. **Show as:** Numerals / Dots (dice and dominoes) (default Numerals) — the equation strip at rest shows numerals or pips.

## 9. Words (EN source)
- on-screen title: **The Stamp Frame**
- instruction: **Stamp the first number in coral and the second in teal. To take away, stamp crosses.**
- prompts: **Show {a} + {b} on the ten-frame.** · **Show {a} − {b} on the ten-frame.**
- step 2: **{a} and {b}. How many altogether?** · **{a} take away {b}. How many are left?**
- hints: **Lift a stamp and press it on the frame.** · **Look under the {n}: one counter is outside the bracket.** (plural: **{k} counters are outside the bracket.**) · **Look under the {n}: one place is still empty.** (**{k} places are still empty.**) · **Take away means cross out. Use the cross stamp.** · **Stamp one counter in each place under the {n}.** · **That's the {n} part. Count them all.** · **Those were taken away. Count the ones still on the frame.** · **Count every counter on the frame.** · **Count with the numbers.** · within 20: **Fill the first ten-frame first.**
- success: **{a} + {b} = {c}. The two parts make {c}!** · **{a} − {b} = {c}. {c} are left!** (c = 1: **1 is left!**) · Dots: **The {a}-dot and {b}-dot sides make {c}!**
- free play: **Stamp anything**
- settings: **Numbers** — **Within 5** / **Within 10** / **Within 20** · **Show as** — **Numerals** / **Dots**

**Locale traps:**
- **The minus sign and "take away":** written "−" is universal; the spoken idiom differs (de "weg", fr "moins / enlever", es "menos / quitar", fi "miinus / ota pois", sv "minus / ta bort"). The prompt uses the expression; the step-2 frame uses the natural classroom take-away verb per locale.
- **"Altogether"** (de "zusammen", fr "en tout", es "en total", it "in tutto", pt "ao todo", nl "samen", sv "tillsammans", da "i alt", no "til sammen", fi "yhteensä").
- **Plural agreement with numbers:** "{c} are left" — fi uses the singular verb with the partitive after numerals ("5 on jäljellä"); fr "Il en reste 5"; the frame per locale keeps the numeral and avoids naming a noun (the counters need no noun: "5 are left" → each locale finds the noun-free form).
- **Dice and domino conventions:** pip layouts are universal; dominoes in fi/sv classrooms are less common but recognised; Dots is a setting, not the default.
- **Decimal/thousand separators:** not relevant (≤ 20).

## 10. Sound off, access, phones
- Legible silent: colours, brackets, crosses and the answer box carry everything.
- Keyboard: 1/2/3 select coral/teal/cross stamp; arrow keys move a focus ring over the cells; Space stamps; Tab to the answer strip; Enter enters.
- aria: cells "row {r}, place {p}: empty / coral / teal / crossed"; brackets announced after Check ("4 coral counters, correct"); live region reads hints and success.
- Taps: cells 62/56 px, stamps 64/56 px, answer keys 48 px.
- Phones: §4. Reduced motion: no squash or bloom; peeling becomes a fade.

## 11. Distinct from
- **ten-frame (tool):** drag counters freely; no stamps, no brackets, no cross-out.
- **#24 Solve the Story** (this batch) acts a story out with library pictures in a ten-place scene and types the answer; the Stamp Frame starts from the expression and proves the representation by the equation's brackets.
- **#25 Switchyard** (this batch) splits ONE number into two parts many ways (decomposition); the Stamp Frame combines or takes away.
- **#1 Counting Table / #14 Treat Box** count sets; no operation.

## 12. Build plan
- **Core state:** `{ level, showAs, order[], idx, expr:{a,b,op}, cells:[null|'c'|'t'|'cx'] (10 or 20), stamp:null|'c'|'t'|'x', step:1|2, answer:null, misses, help }`.
- **Functions:** `stamp(cell)`, `brackets()` → per-number `{slots, filled, extra, wrongColour}`, `checkStep1()`, `peel()`, `checkAnswer(n)` → `{ok, part:'a'|'b'|null}`, `nextTask(index)`.
- **Gate `verify-stamp-frame-core.js` (own oracle):** (0) the tidy permutes cells only — the multiset of colours/crosses is unchanged, coral precede teal, uncrossed precede crossed; (1) step 1 ok iff coral count = a and (op + : teal = b, no crosses) / (op − : crosses = b among coral, no teal); (2) the within-20 second frame refuses ink while the first has room; (3) every expression's answer is computed by the gate (not read from data) and within the level range; never 0; (4) the old 10 problems are present in Within 10; (5) Dots shows the right pip counts (a domino's halves sum to the number); (6) no adjacent equal answers and ≤ 2 same-operator runs after the shuffle (10 000 seeds); (7) the "part" hint fires exactly when the tapped number equals a or b and ≠ the answer.
- **Mutations:** accept teal in subtraction; count crossed counters in the answer; skip the peel; let the second frame fill early; read the answer from the data; accept a ± 1 coral count; show the answer in the box before step 2; same-operator runs of 4; let 0 into the answers; break the domino pip sum.
- **Risks:** none blocked.

## 13. The four questions
1. **Would a 5–8-year-old choose it again?** Yes — stamping colours and crosses, thumping and peeling, is toy play; the brackets clicking shut feel like a lock opening.
2. **Would a teacher put it on the board?** Yes — "Show 8 − 3": a child crosses three, the crossed ones peel away, the class counts what is left. The brackets make the representation checkable by everyone.
3. **Would a parent trust it?** Clean apparatus, no characters, no score, the numbers check themselves in plain sight.
4. **The invention:** you print the expression with a coral stamp, a teal stamp and a cross stamp, and each number in the equation reaches down with a bracket to check your printing.

## 14. Critic review (2026-10-17)
Scores before → after: invention 5→5 · fun 4→5 · completeness 4→5 · correctness 4→5 · distinctness 5→5 · reality 5→5
What changed:
- **The tidy:** the brackets (the invention) could not physically close round counters stamped in a mixed order. At Check the frame now slides the counters into reading order — coral then teal, or uncrossed then crossed — so each bracket spans a contiguous run and the subtrahend's bracket sits inside the minuend's (the 3 is part of the 8). A visible, satisfying motion that also shows the ten-frame convention; gate rule 0 guards the counts.
- Checked and kept: all three round tables (old 10 problems intact; within 5 and within 20 sums recomputed; no 0), the part-hint for "4, 3" answers, the cross-out model for G1-103/104, the honest choice of drawn counters over undersized pictures.
- Distinct from #24 in this batch (expression → printing vs story → acting) — confirmed after reading both.
- Layout check (2026-10-17): switched to stacked — split stage column is ~370 px at 704.
