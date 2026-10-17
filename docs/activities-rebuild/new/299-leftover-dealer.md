# New 299 — The Leftover Dealer: the sharing wheel only turns when every box can get one (4.NBT.B.6, taught in Grade 3)

## 0. Identity
- id `leftover-dealer.play.4-nbt-b-6` · grade label 3 (as the worksheets; code 4.NBT.B.6) · strand Number & Operations in Base Ten · files `mini tools/leftover-dealer-core.js`, `leftover-dealer-activity.js`, `leftover-dealer-activity.html`, `leftover-dealer-activities.json` (key `leftover-dealer`; scaffold `node scripts/new-activity.js --num=299`).
- worksheets it covers: **G3-377** Ring the Groups (each turn of the wheel rings the group it takes) · **G3-380** Share It Out (deal one at a time into the boxes) · **G3-381** Practice Rows (write, then deal) · **G3-382** Exact or Not? (predict the cup) · **G3-383** Find the Error: the remainder is too big (the cup tips) · **G3-384** Hop Back on the Number Line (every turn is a hop back on the record strip).
- new instrument (no old activity).

## 1. The pitch
"The boxes ride on a sharing wheel: one turn of the crank drops exactly one counter into every box — and the wheel simply will not turn if there are fewer counters left than boxes, so those last few roll into the leftover cup, and a cup can never hold as many as there are boxes."

## 2. Why a child will want it again (the fun)
- **The crank.** A big wooden crank in the middle of the wheel: wind it once and the dealer arm sweeps round, *tick-tick-tick* dropping a counter into each box as it passes — a music-box feeling. Winding fast makes the arm whirl; each full turn is one round of dealing.
- **The jam.** When too few counters are left, the crank pushes, the wheel shudders and won't go (a wooden *clunk* and a little shake) — and the leftovers roll down a chute into the cup with a *plink* each. The jam is the moment of truth, and it is funny.
- **The tipping cup.** In fix-the-mistake rounds a friend's cup is overfull; tap it and it tips, pouring one more round round the wheel — the child watches the "too big" remainder fix itself.
- **The earned show:** on success every box lid closes with its own little knock (one after another round the wheel), the leftover cup gives a satisfied wobble, and the pile's picture (a library apple, ball, crayon …) is shown once per box, popping on each lid.

## 3. The skill and the misconception
- **Skill (4.NBT.B.6 at the grade-3 level of the six worksheets):** divide a number of things into equal groups (share among d boxes, or ring groups of d); find how many each box gets (quotient) and how many are left (remainder); know the remainder is always smaller than the number of boxes; decide whether a division comes out exactly; correct a remainder that is too big; see division as hops back of d on a number line until a whole hop no longer fits.
- **Misconception 1 — a remainder as big as, or bigger than, the divisor** (17 ÷ 3 = 4 r 5). *Push-back:* the wheel turns whenever at least d counters remain, so a cup can only fill once fewer than d are left — the apparatus physically cannot make a remainder ≥ d; and a friend's overfull cup tips and deals again.
- **Misconception 2 — the remainder written into the quotient** (17 ÷ 3 = 52). *Push-back:* the answer slate has two separate places drawn as a box icon and a cup icon; what goes in each is what the child sees in one box and in the cup.
- **Misconception 3 — every division comes out exactly.** *Push-back:* exact-or-not rounds ask for a prediction before dealing; about half the cups end non-empty.

## 4. The stage
Layout `split` at ≥ 700 px; stacked below. Wheel, boxes, cup, counters, crank and strip are drawn apparatus; the round's library picture appears only as a label (rulings: countable tokens drawn, one picture as the label).

**At 704 — left 440 px, right 232 px:**
- **The pile (top-left, 440 × 150):** a counter track in rows of 12 (cells 25 px, counters 20 px discs; the largest pile, 63, is 6 rows = 150 px — rows of 10 at 30 px would need 210 px in the item's colour, drawn, all identical), filled from the start of the track; beside it the **label picture** at 96 px (fruits apple / orange / banana / strawberry / lemon; at-the-supermarket pear (the green one); toys ball / car / dinosaur / robot; classroom crayon / book / glue — one per round) and the pile's numeral N (Baloo 2 36 px).
- **The hop strip (under the pile, 440 × 48):** a number line 0…N (ticks every 1, numerals every 5 / every 10 when N > 40); a marker starts at N; each turn draws a hop arc of d back. When fewer than d remain, a dashed arc tries to hop, would pass 0, and bounces back; the stretch 0…r is coloured coral (the leftover).
- **The sharing wheel (left, 440 × 300):** a round wooden tray (diameter 280) with d boxes (open-topped, 64 × 64, cream, 3 px ink) evenly round its rim; in the centre the **crank** (a 64 px wooden hub with a handle knob 36 px) and the dealer arm. Inside each box, dealt counters sit as drawn discs in a 3 × 3 pattern (up to 9).
- **The leftover cup (right column, top):** a glass cup 88 × 96 at the end of a little chute from the pile; leftovers rest in it as discs.
- **The answer slate (right column):** two drawn fields, each 88 × 56 with an icon in front — a **box icon** (each box gets) and a **cup icon** (left over) — and the shell number keypad (keys 48 px) with one extra key showing an **empty cup** (= nothing left over).
- **Exact-or-not prediction:** two big buttons 96 × 72 above the slate — an **empty cup** and a **cup with three discs** (icons only).
- **The friend's slate (fix-the-mistake rounds):** a chalk card 200 × 64 showing the friend's answer in the same icon form — box icon 4, cup icon 5 — next to the wheel already dealt to that state.
- **Task line** above, ≤ 2 lines, 22 px. Check/Next under the slate.

**At 360 — stacked:** task line · pile track 15 per row, cells 20 px (300 × ≤ 100) with the label picture 64 px · hop strip 330 × 40 · the wheel diameter 250 (boxes 52 px, crank 56 px, knob 36 px hit 52) · cup + slate side by side (cup 64 × 72; fields 80 × 48) — the keypad opens as a sheet when a field is tapped · Check at y ≈ 660 on 360 × 740; at 320 × 640 the wheel shrinks to 220 and the track to cells 18 px, Check ≈ 600.

No words on the apparatus: numerals, icons, counters.

**Task lines (EN):**
- share, deal then write: "Share {N} {items} into {d} boxes. Turn the crank, then write what each box gets and what is left over."
- share, write then deal: "Share {N} {items} into {d} boxes. Write your answer first, then turn the crank to check."
- exact or not: "Will {N} {items} share into {d} boxes with none left over? Choose a cup, then deal."
- fix the mistake: "A friend shared {N} {items} into {d} boxes and got this. Fix it."

({items} is the plural of the label picture's noun from `image-vocabulary.js` in the page locale.)

## 5. The hand
- **Turn the crank:** drag the knob round the hub (angle tracked; ≤ 16 ms), or tap the hub for one automatic turn (600 ms). One full turn = one round: the arm passes each box in order, each time a counter leaves the END of the pile track (highest number first), is ringed for 200 ms together with the others of this turn (the ring stays on the track as a faint outline — the "group" of G3-377) and lands in the box (*tick*). The hop strip draws one arc of d back.
- **The jam:** when remaining < d, the crank refuses — it rotates 20° and springs back (*clunk*, 2 px wheel shake). After the first jam the remaining counters roll down the chute into the cup (one *plink* each, 150 ms apart) and the strip draws the bouncing dashed hop and the coral 0…r stretch. If remaining = 0, the crank rests and the empty cup gives a clear glass *ting*.
- **Undo a turn:** a small back-arrow on the hub (44 px) takes the last turn back (counters fly back to the track, the arc erases). Free.
- **Fix rounds — write first, then tip:** the friend's wheel and slate arrive dealt; the friend's cup is padlocked until both of the child's fields are filled (the child must reason "5 in the cup can go round 3 boxes once more"). Check tips it: if it holds ≥ d, it tips and the arm deals one round from the cup (one to each box), the cup keeps the rest, and it tips again while it still holds ≥ d; when it holds < d it wobbles and stays (*clunk*). Then the child's slate is graded against the wheel. After success the cup can be refilled and tipped freely.
- **Write:** tap a field → keypad → digits (≤ 2); the empty-cup key fills the cup field with the empty-cup icon (no zero is ever typed).
- **Predict (exact rounds):** tap one of the two cup buttons; it lifts and is outlined; the crank unlocks.
- **Keyboard:** Tab → crank (Enter = one turn, Backspace = undo) → prediction buttons → fields → Check.
- **Free play:** after success the crank and undo stay live; the child can deal and undo as they like.

## 6. The rounds
Computed in `work-39/dealer.js`. q = each box gets, r = left over.

**Share it out · boxes 2–5 (9 rounds; used by "deal, then write" and "write, then deal"):**

| # | N | d | q | r | label picture |
|---|---|---|---|---|---|
| 1 | 17 | 3 | 5 | 2 | apple |
| 2 | 14 | 4 | 3 | 2 | ball |
| 3 | 23 | 5 | 4 | 3 | crayon |
| 4 | 11 | 2 | 5 | 1 | banana |
| 5 | 20 | 4 | 5 | none | car |
| 6 | 19 | 5 | 3 | 4 | strawberry |
| 7 | 13 | 3 | 4 | 1 | book |
| 8 | 18 | 3 | 6 | none | orange |
| 9 | 25 | 4 | 6 | 1 | robot |

**Share it out · boxes 2–9 (9 rounds):**

| # | N | d | q | r | picture |
|---|---|---|---|---|---|
| 1 | 38 | 6 | 6 | 2 | lemon |
| 2 | 45 | 7 | 6 | 3 | dinosaur |
| 3 | 29 | 8 | 3 | 5 | glue |
| 4 | 52 | 9 | 5 | 7 | pear |
| 5 | 42 | 6 | 7 | none | ball |
| 6 | 33 | 4 | 8 | 1 | apple |
| 7 | 47 | 9 | 5 | 2 | crayon |
| 8 | 56 | 8 | 7 | none | orange |
| 9 | 31 | 7 | 4 | 3 | car |

(2 of 9 exact in each share pool, ≈ 25%; remainders run 1 → d − 1, including the largest possible, 4 of 5 and 7 of 9 and 7 of 8.)

**Exact or not? · boxes 2–5 (8 rounds):** 18 ÷ 3 (exact) · 21 ÷ 3 (exact) · 20 ÷ 4 (exact) · 25 ÷ 5 (exact) · 17 ÷ 2 (1 left) · 22 ÷ 5 (2 left) · 10 ÷ 4 (2 left) · 15 ÷ 2 (1 left).
**Exact or not? · boxes 2–9 (8 rounds):** 36 ÷ 6 · 63 ÷ 9 · 40 ÷ 8 · 35 ÷ 7 (all exact) · 44 ÷ 7 (2 left) · 51 ÷ 9 (6 left) · 45 ÷ 6 (3 left) · 50 ÷ 8 (2 left).

**Fix the mistake · boxes 2–5 (8 rounds):** each friend's answer is consistent (q·d + r = N) but its cup is too full.

| # | N ÷ d | friend: box / cup | the cup tips | right: box / cup |
|---|---|---|---|---|
| 1 | 17 ÷ 3 | 4 / 5 | once | 5 / 2 |
| 2 | 14 ÷ 4 | 2 / 6 | once | 3 / 2 |
| 3 | 23 ÷ 5 | 3 / 8 | once | 4 / 3 |
| 4 | 19 ÷ 2 | 8 / 3 | once | 9 / 1 |
| 5 | 22 ÷ 4 | 4 / 6 | once | 5 / 2 |
| 6 | 16 ÷ 5 | 2 / 6 | once | 3 / 1 |
| 7 | 12 ÷ 3 | 3 / 3 | once | 4 / none |
| 8 | 23 ÷ 3 | 5 / 8 | twice | 7 / 2 |

**Fix the mistake · boxes 2–9 (8 rounds):** 38 ÷ 6 (5/8 → 6/2) · 45 ÷ 7 (5/10 → 6/3) · 29 ÷ 8 (2/13 → 3/5) · 52 ÷ 9 (4/16 → 5/7) · 40 ÷ 6 (5/10 → 6/4) · 35 ÷ 7 (4/7 → 5/none, a cup exactly as big as the boxes) · 47 ÷ 8 (4/15 → 5/7) · 50 ÷ 6 (6/14 → 8/2, tips twice).

**Answer position and shortcut bots (measured).** Share and fix answers are typed; exact-or-not has two buttons whose order is fixed (empty cup left, full cup right — always) and whose right answer is balanced 4 / 4 per pool. Bots on the exact pools: "even N → exact" 4/8 and 4/8; "N ends in 0 or 5 → exact" 4/8 and 4/8; "always empty" 4/8 — none beats a coin. Typed-answer bots on the share pools: "r = d − 1" 3/9 (2–5) and 0/9 (2–9); "r = last digit of N" 3/9 and 0/9; "r = none" 2/9 each; no bot gets both fields right in more than 2 of 9. The pile picture changes every round, so no item predicts anything.

**Order:** order-only reshuffle per pass (never the previous order). "Write, then deal" uses the share table with the crank locked until both fields are filled.

## 7. Check, the misses, the success
- **Check with nothing done** → hint, no miss: "Turn the crank to deal." / "Write both answers first." / "Choose a cup first." / "Write the right answer first. Then Check tips the friend's cup."
- **Miss 1:**
  - box field wrong: one box glows and its counters number themselves 1…q. Hint: "Count what is in ONE box."
  - cup field wrong: the cup's counters number themselves. Hint: "Count what rolled into the cup."
  - r ≥ d typed (in any mode): the cup on the slate overflows into a tip animation — the child's own number of counters are shown in a ghost cup that tips and deals once round the wheel. Hint: "A cup with {r} could deal again — there are only {d} boxes. Left over must be less than {d}."
  - exact prediction wrong: after the deal, the predicted cup icon shakes beside the real cup. Hint: "{N} into {d} boxes leaves {r} in the cup." / "{N} into {d} boxes leaves the cup empty."
  - write-then-deal: the crank deals automatically (the child watches), then the wrong field glows as above.
  - fix rounds (the cup has tipped at Check and the child's field is still wrong): the friend's cup is shown again with d dots beside it, one dot lighting per counter that left it in the tip. Hint: "The friend's cup had {r} — enough for {tips} more round(s) of {d}. Each box gets {tips} more."
- **Miss 2:** the ringed groups on the pile track number themselves 1…q (groups), the hop strip labels each hop's landing (N, N−d, N−2d, … r), and the slate shows the multiplication check "{q} × {d} + {r} = {N}" written under it (or "{q} × {d} = {N}" when exact). Hint: "{q} turns of the crank gave every box {q}. {q} × {d} is {qd}, and {N} − {qd} is left over."
- A new action takes the help away until the next Check.
- **Success** → the lids close round the wheel one by one (knock … knock …), the picture pops on each lid, the cup wobbles. Bubble: "{N} shared into {d} boxes: {q} in each box and {r} left over." · exact: "{N} shared into {d} boxes: {q} in each box, none left over." · fix: "Now it's right: {q} in each box and {r} left over — fewer than {d}." Then the written division appears in the locale's notation under the bubble (en "17 ÷ 3 = 5 r 2", de "17 : 3 = 5 R 2", see §9).

## 8. Settings
1. **Job: deal, then write · write, then deal · exact or not? · fix the mistake.** Visible at rest: the slate is empty with the crank live / the crank is padlocked / the two cup buttons appear / the wheel arrives already dealt with the friend's slate and a padlocked cup.
2. **Boxes: 2–5 · 2–9.** Visible at rest: the number of boxes on the wheel and the pile size.

## 9. Words (EN source)
- title: "The Leftover Dealer" · instruction: "Turn the crank: each turn gives every box one. What can't go round rolls into the cup."
- prompts: four task lines (§4) · hints: §7 (empty ×4, miss 1 ×6, miss 2 ×1) · celebrations: three (§7) · settings: "Job", "deal, then write", "write, then deal", "exact or not?", "fix the mistake", "Boxes", "2–5", "2–9".
- aria: crank "Crank: turn to give every box one" · box "Box {n}: {count}" · cup "Leftover cup: {count | empty}" · empty-cup key "nothing left over" · prediction buttons "empty cup", "something left over".
- **Locale traps (important):**
  - **Division sign:** en/es/pt "÷"; de, fr, it, nl, sv, da, no, fi ":" in school (fr also "÷" rarely — use ":"). The success line uses the locale's sign.
  - **Remainder notation:** en "5 r 2"; de "5 R 2" (*Rest*); fr "17 = 3 × 5 + 2" (quotient *5*, reste *2* — French school writes the Euclidean equality, not an "r"); es "5, resto 2" / *residuo* (es-MX) — author with the es panel; pt "5 e resto 2"; it "5 con resto di 2"; nl "5 rest 2"; sv "5 rest 2"; da "5 rest 2"; no "5 rest 2"; fi "5, jakojäännös 2". The apparatus never shows any of these (box and cup icons); only the success line does, authored per locale.
  - **Multiplication sign** in miss 2: "×" everywhere except de/nl/da/no/sv/fi schools often use "·" — use "·" for de, nl, sv, da, no, fi.
  - {items} plural from `image-vocabulary.js`; numerals before nouns: fi partitive ("17 omenaa"), so task lines are templates authored per locale with the noun slot in the right case (fi panel picks the partitive form; the vocab gives nominative singular/plural — a per-locale partitive override list for the 13 label nouns is part of the build).
  - Gender: es/pt/it/fr nouns vary — task lines avoid articles before {items} (bare plural after a numeral is natural in all Romance locales).

## 10. Sound off, access, phones
- Legible with the sound off: the jam shake, counters in the cup, the tipping cup, numbered groups and hop labels carry everything.
- Keyboard path in §5; aria-live on the cup and boxes after each turn ("Every box has 4. 5 left in the pile.").
- Taps: crank knob 36 px with 52 px hit, hub 64/56 px, undo 44, cup 88/64, fields ≥ 48, keypad 48, prediction buttons 96 × 72.
- Pictures: one label picture 96 px (704) / 64 px (360); counters are drawn tokens (the record rule).
- Check above the fold at 360 × 740 and 320 × 640.

## 11. Distinct from
- **Premium `lids`** (lids put on a table of counters, every lid hides the same number, the remainder stays in sight) and **`pair-gate`** (a parade through an archway in ranks of two): the Dealer's rule lives in the wheel — a turn must reach every box or it does not happen.
- **New 288 The Measuring Rod** (rods of b fit back from N to 0 — a leftover gap) and **Row 193 Maple's Bakery** (exact sharing): no remainder rule, no exact-or-not, no tipping cup.
- **Row 140 Winter Piles / Row 139 arrays:** equal groups without remainders.
- Registry: no built or designed invention uses a wheel that refuses to turn.

## 12. Build plan
- **Core (`LeftoverDealerCore`, pure):** `canTurn(remaining, d)` = remaining ≥ d · `turn(state)` (moves d counters from the pile end, one per box) · `jam(state)` (moves the rest to the cup) · `undo(state)` · `tipCup(state)` (if cup ≥ d: one per box from the cup) · `divide(N,d)` → {q, r} · `gradeShare(fields)`, `gradeExact(prediction)`, `gradeFix(fields, tipped)` · `hops(N,d)` → landing list.
- **Gate (`verify-leftover-dealer-core.js`, own oracle):** recompute q and r by repeated subtraction (not `%`); assert every share/exact round's table values; assert every friend's answer is consistent (q·d + r = N) with r ≥ d, and that tipping k times reaches the right answer (k as listed); assert a simulated full deal never leaves the cup with ≥ d; assert the bot tallies of §6; assert exact pools are 4/4 and share pools have 2 exact; assert no counter count of 0 is ever *typed* (empty-cup key only); assert every EN template number equals the model; assert the hop list ends at r and never goes below 0.
- **Mutations:** `canTurn` uses > instead of ≥ (a full round of exactly d jams) · jam leaves one counter on the track · tip allowed when cup < d · the friend's cup tips before both fields are filled · undo double-removes · grade accepts r ≥ d · grade swaps the fields · exact prediction graded before dealing finishes · hop strip draws hops of d − 1 · the fix table's friend answer inconsistent · prediction buttons swap sides between rounds.
- **Local test:** real crank drags (full turns) and hub taps for every round to the jam; undo; tip cups; keypad entry; 7 widths; 11 locales (the success-line notation per locale is printed and checked against §9).
- **Pictures:** fruits apple, orange, banana, strawberry, lemon; at-the-supermarket pear (green — fruits/pear has a red blush, ruling); toys ball, car, dinosaur, robot; classroom crayon, book, glue — all on contact sheets and in their JSONs; never cherry, plum or peach (rulings). **Risks:** fi partitive forms for the 13 nouns must be authored (listed above). Nothing blocked.

## 13. The four questions
1. **Choose it again?** Yes — a crank, a jam, a tipping cup.
2. **Teacher on the board?** Yes — "the remainder is smaller than the divisor" is a property of the machine, all six worksheet formats are one apparatus, and the hop strip ties dealing to the number line.
3. **Parent trust?** Calm, one library picture per round, drawn counters, nothing scored.
4. **The invention:** a sharing wheel that only turns when every box can get one — so what is left over always rolls into a cup smaller than the number of boxes.

## 14. Critic review (2026-10-17)
Scores before → after: invention 5→5 · fun 5→5 · completeness 4→5 · correctness 5→5 · distinctness 5→5 · reality 5→5
What changed:
- Re-solved every table with my own repeated-subtraction oracle (`work-c39/dealer.js`): all share, exact and fix rounds correct; remainder always < divisor in every right answer; every friend answer consistent (q·d + r = N) with r ≥ d and the listed number of tips; 2/9 exact per share pool; exact pools 4/4; bots as stated ("r = d − 1" 3/9 and 0/9, "last digit" 3/9 and 0/9, "even → exact" and "ends 0/5 → exact" 4/8 each). No 0 is ever typed (empty-cup key) and no quotient is 0.
- **Fix-the-mistake now asks for the reasoning first:** the friend's cup used to be tappable before writing, so the tip did the correcting and the child copied it. Now the cup is padlocked until both fields are filled and Check tips it (G3-383 is "cross out and write the right numbers"). Miss and empty-Check strings updated.
- The pile could not hold its largest pile (63 counters in rows of 10 at 30 px = 210 px in a 120 px box): now rows of 12 at 25 px in 440 × 150.
