# Row 141 — Hopper's Lily Hops → THE FLIP PADS: a hop of ten flips only the tens flap (2.NBT.A.2)

## 0. Identity
- **id** `skipcount.fill.2-nbt-a-2` (kept; slugs and metadata frozen for en, de, fr, es, pt, it, nl, sv; da / no / fi slug, title and intro are new at build) · grade 2 · CCSS 2.NBT.A.2 · strand Number & Operations in Base Ten · own files `flip-pads-core.js`, `flip-pads-activity.js`, `flip-pads-activity.html`, `flip-pads-activities.json` (the old `skipcount-activities.json` is emptied to `[]` and the row moves; `skipcount-core.js` stays for history).
- **Page title (frozen):** "Hopper's Lily Hops — Skip-Counting by 5s, 10s & 100s (Grade 2)". The frozen intro ("read the numbered lily pads, follow the +5, +10, or +100 hops, and tap the number that goes on the empty pad … forward and backward … within 1000") stays true: the child taps the empty pad's digits into place.
- **Worksheets it must also cover:** G1-123 Count by Tens · G1-124 Count by Fives · G1-125 Count by Twos · G1-126 Count in Groups · G1-285 Dot-to-Dot: Count by Twos · G1-278/279/280 Number Line Counting in Fives/Tens · G1-281 Where on the Number Line? 0 to 120 · G2-304 / G2-314 Dot-to-Dot by Fives/Tens · G2-392 Skip-Counting Maze by 5s · G2-207 Count by Threes · G2-208 Count by Fours · G3-308 Multiplication Hops (multiples from 0) · G3-326 Crack the Pattern · G3-327 Going Down! · G3-329 Big Skip Counting (25s, 50s, 100s). The count-by-2/3/4 and 25/50/100 sets are settings; the dot-to-dot / maze formats are the winding chain (§4); the "crack the pattern" skill is the **find-the-hop** rounds.
- **What the old activity did:** a row of numbered lily pads with "+5/+10/+100" arc labels, one pad blank, tap one of three numbers (and three "how big is each hop?" rounds). **Kept:** Hopper, the pond, the lily-pad row, forward and backward counting, crossing a hundred, the non-multiple start (3, 8, 13 …), find-the-hop rounds — every old round's pattern is in the new tables (5s from a multiple, 5s from a non-multiple, 10s across 100, 10s backward, 100s). **Dropped:** the three-choice tap — its choices were always {answer − step, answer, answer + step}, so the right one was **always the middle value**, and the two wrong ones were usually already printed on the neighbouring pads (an answer tell, see the defect list).

## 1. The pitch
"Every lily pad shows its number on flip-flaps like a station board — the empty pad arrives showing the number Hopper is standing on, and you flip it forward by one hop: a hop of ten flips only the tens flap, a hop of a hundred only the hundreds flap, and when the ones run past 9 you have to flip the tens yourself."

## 2. Why a child will want it again
- **Split-flap flaps are hypnotic.** Each digit is a drawn flap that falls with a crisp *clack* (the top half folds down over 120 ms, a tiny shadow sweeps across). Tap the top of a flap and it flips forward (4 → 5); tap the bottom and it flips back. Children flip them for the sound alone.
- **Hopper jumps the board.** When the empty pad is right, Hopper (the library frog) leaps onto it in a high arc, and the flaps that changed on that hop give one extra celebratory flutter — so the child *sees* which place moved: one flap for +10, two for 95 → 100, two for 900 → 1000.
- **The pond grows.** After the last pad, Hopper keeps hopping by himself onto new pads that rise from the water (three more, flaps clacking), then sits back to watch. Free play: tap Hopper and he makes one more hop by the round's step on a new pad — counting on as far as the child likes, up to 1000.
- **The end-of-round show — THE COLUMN LADDER:** the pads' numbers float up and stack in a column like a written list, digits aligned by place; the place that changes every hop glows in a stripe (the tens column ticking 3, 4, 5, 6 …; the ones column alternating 3, 8, 3, 8 for fives from 63). The pattern of skip counting is laid bare.

## 3. The skill and the misconception
- **Skill:** skip-count by 5s, 10s and 100s within 1000, forward and backward, from multiples and non-multiples (2.NBT.A.2); also by 2s, 3s, 4s from the start (G1-125, G2-207/208, the multiples of G3-308) and by 25s, 50s, 100s (G3-329); find the constant hop of a growing or shrinking pattern (G3-326/327).
- **Misconception 1 — "after 95 comes 96" / a hop of 5 is a step of 1.** **Pushback:** the empty pad arrives as a copy of 95; flipping the ones flap once gives 96 — and at Check the leap meter shows "+1" next to Hopper's "+5" (miss 1). The flaps make "how much did I add" visible.
- **Misconception 2 — crossing a ten or a hundred** ("90, 100" written "90, 910"; "95 + 5 = 90" by flipping only the ones 5 → 0). **Pushback:** the flaps do *not* carry — a ones flap passing 9 → 0 leaves the tens alone, so "90" appears on the pad and Hopper's leap meter reads "−5": Hopper would have jumped *backwards*. The child has to flip the tens (and from 90, the hundreds from blank to 1) themselves — which is exactly what regrouping in a count means.
- **Misconception 3 — the wrong place changes** (counting by tens from 370 by flipping the ones: 371). **Pushback:** the leap meter reads "+1" instead of "+10"; the column ladder at success shows only the tens stripe moving.
- **Misconception 4 — backward counting by adding.** **Pushback:** in "going down" rounds the copy must be flipped *back*; flipping forward makes the meter read "+10" where Hopper needs "−10".

## 4. The stage
**At 704 px (stacked; the chain is the hero):**
- **Task line** (≤ 24 px) — fill: **"Count by {s}s. Flip the empty pad to the next number."** · going down: **"Count back by {s}s. Flip the empty pad."** · find the hop: **"How big is each hop? Flip Hopper's sign."**
- **The pond:** a soft blue field 680 × 300. **The chain:** 5 (or 6) drawn lily pads, 120 × 76 each (green ellipse with a notch, 2 px ink), along a gently winding path (straight, an arc, or a shallow S per round — the dot-to-dot / maze feel of G1-285, G2-304/314/392), 12–20 px apart. Each pad carries its number as **split-flaps**: 3 flaps (4 when the chain reaches 1000) of 30 × 44 px, digits 28 px Baloo 2, cream on dark teal. Leading places of smaller numbers show a **blank flap** (so 85 is ␣85 on a 3-flap chain — never "085").
- **Hopper:** `pets/frog` (side view; the picture faces left, so it is mirrored to face along the chain) at **96 px**, sitting on the pad before the first empty one.
- **The empty pad (a bud):** a closed water-lily bud pad, its flaps showing a faint copy of the pad before it.
- **The flap board** (under the pond, 360 × 110): the active bud's flaps enlarged to **72 × 96 px** each (digits 56 px), the top half (48 px) = flip forward, the bottom half = flip back (a small ▲/▼ notch on the flap's hinge shows which half does what). The board is the input; the small pad mirrors it live.
- **Hopper's sign** (find-the-hop rounds): a drawn wooden sign on a stick beside Hopper: a sign flap (+/−) and 3 digit flaps, enlarged on the flap board the same way.
- **Check** 120 × 52, right of the flap board. A bubble beside it.
- No words on the apparatus — numerals and the +/− sign only.

**At 360 px:** the chain wraps into two rows (3 pads + 2–3 pads) with a hop arc at the turn; pads 96 × 62, small flaps 24 × 34 (digits 22 px); Hopper **64 px**; the flap board full width 328 px: flaps 72 × 96 for 3 places (3 × 72 + gaps = 236 px) and 64 × 96 for 4 places (4 × 64 + 3 × 8 = 280 px); Check full width under it. Budget 360 × 740: header 56, task 52, pond 2 rows 230, board 110, Check 52 → 500 px. At 320: pads 86 × 56, flaps on the board 60 × 88 (4 places = 264 px), Hopper 64 px → 470 px.

## 5. The hand
- **Flip:** tap the top half of a board flap → it flips forward one digit (an inner flap wraps 9 → 0 and 0 → 9; a leading flap cycles blank → 1 → … → 9 → blank, so it never shows a leading 0); tap the bottom half → back one. 120 ms per flip with a *clack*; a fast swipe down over a flap flips it forward repeatedly (one per 60 ms while the finger moves). Every flip mirrors on the small pad within the same frame. Nothing carries; nothing is judged until Check.
- **Choose a bud:** when a round has two buds, the board edits the first; after it is right, the board moves to the second, which now arrives as a copy of the *first bud's* number.
- **Find the hop:** flip the sign's +/− flap and digit flaps (leading blanks allowed) to the hop size.
- **Hopper:** tap him between Checks and he wiggles; after success he hops on along new pads (free play).
- **Keyboard:** ←/→ choose a flap, ↑/↓ flip it, Enter = Check.
- **Sound** (bonus): the flap clack, a plop on each landing; TTS reads a landed number where a voice exists.

## 6. The rounds
One round = one chain. Buds (empty pads) are in brackets; every bud arrives showing the number before it. All rounds measured (`work-32/flap.js`): no 0 and nothing above 1000 anywhere (counting by 2/3/4 starts on the first multiple — Hopper starts on the bank, the 0 is never a pad).
- **Count by 5 · 10 · 100 (default):** 35, 40, [45], 50, [55] · 63, 68, [73], 78, [83] · 85, 90, [95], [100], 105 · 10, 20, [30], 40, [50] (from the bank — straight line + groups) · 370, 380, [390], [400], 410 · 600, 700, [800], 900, [1000] · going down: 530, [520], 510, [500], 490 · 900, 800, [700], 600, [500] · find the hop: 245, 255, 265, 275 (+10) · 615, 620, 625, 630 (+5) · 400, 500, 600, 700 (+100).
- **Count by 2 · 3 · 4:** 2, 4, [6], 8, [10] · 46, [48], 50, [52], 54 · 3, 6, [9], 12, 15, [18] · 21, 24, [27], 30, [33] · 4, 8, [12], [16], 20 · 28, 32, [36], [40], 44 · going down: 30, [28], 26, 24, [22] · 30, 27, [24], 21, [18] · find the hop: 12, 15, 18, 21 (+3) · 16, 20, 24, 28 (+4) · 7, 9, 11, 13 (+2).
- **Count by 25 · 50 · 100:** 25, 50, [75], 100, [125] · 150, 175, [200], 225, [250] · 50, [100], 150, 200, [250] · 350, 400, [450], [500], 550 · 130, 230, [330], 430, [530] · going down: 300, 275, [250], 225, [200] · 900, [850], 800, [750], 700 · 1000, 900, [800], 700, [600] · find the hop: 125, 150, 175, 200 (+25) · 640, 590, 540, 490 (−50) · 360, 460, 560, 660 (+100).
- **Measured (re-solved by the critic, `work-c32/flap.js`):** 11 rounds per set (8 fill with 2 buds + 3 find-the-hop); 16 buds per set, of which only 5, 5, 6 sit on the last pad and 8 in the first half — the empty pad is not "always the end"; the number of flaps that must change per bud: 1 flap ×11 / 2 flaps ×4 / 3 flaps ×1 (default), 1 ×11 / 2 ×5 (2·3·4), 1 ×6 / 2 ×9 / 3 ×1 (25·50·100) — so a bud that crosses a ten or a hundred (≥ 2 flaps change: the regrouping the flaps refuse to do for the child) is in every pass: **5, 5 and 10** per set (the designer's 8 / 9 counted differently and were wrong). Going-down rounds: **2, 2 and 3** per set; a round reaching or starting at 1000 (the 4-flap board): **1, 0, 1** (the 2·3·4 set stays below 100 — it never needs the 4-flap board).
- **From the bank — the number-line and equal-groups rounds (critic addition; G1-123/124/125/126, G1-278/279/280/281, G3-308):** every chain that STARTS AT ITS OWN STEP (default 10, 20, [30] …; 2·3·4 set 2, 4, [6] … · 3, 6, [9] … · 4, 8, [12] …; 25 set 25, 50, [75] …) is drawn **straight along a ruled number line**: the bank is a printed **0** tick (a tick, never a pad — counting never lands on 0), one tick per hop, the pads sit on their ticks — so the "number line counting in fives / tens" and "multiplication hops from 0" worksheets are this exact picture. And each pad on such a chain carries its hop as an **equal group** beside the flaps: 2 / 3 / 4 / 5 / 10 drawn dots in a ten-frame strip (25 = two drawn ten-rods + five dots), apparatus geometry, so the pad's number is visibly the running total of the groups (G1-126 "Count in Groups"). Every other chain winds (the dot-to-dot / maze format). A bud's group is drawn faint until it is right.
- **The clacks ARE the hop (critic):** a hop of 5 is five forward clacks of the ones flap (68 → 73: 8, 9, 0, 1, 2, 3 — five clacks, and the 9 → 0 one owes the tens a clack); a hop of 10 is one clack of the tens; a hop of 100 one clack of the hundreds. The bud's flaps count each forward flip in a faint tally under the flap board (·····), so the child can see five clacks = +5 even before Check — the leap meter at miss 1 is the same count with its sign.
- **Direction setting:** "up only" drops the going-down rounds and doubles two up rounds from the pass; "up and down" (default) as written.
- **Answer position:** there are no options to guess between (the old middle-value tell is gone); the buds' positions are spread as measured; the gate fails if any set has more than 6 of 16 buds on the last pad.
- **Order:** order-only reshuffle per pass, never the same order twice.

## 7. Check, the misses, the success
- **Check with the bud unchanged** (still the copy) → the bud wobbles; **"Flip it forward by one hop of {s}."** (going down: "back by"). (no miss)
- **Miss 1 — the leap meter:** a drawn tape-measure ribbon stretches from the pad before to the bud and shows the jump the child made, "+1" / "−5" / "+820", in coral, beside Hopper's own sign "+5" in teal. EN **"Hopper hops {hop}. Your pad is {made} away."**
- **Miss 2 — the column ladder:** the pad before slides down above the flap board, digits aligned over the bud's flaps, with the hop written under its place ("  + 10" under the tens); the flap(s) that must change get a soft ring. EN **"Line them up: {prev} and {s} more."** (going down: "{prev} take away {s}.")
- A new flip takes the help away until the next Check.
- **Success:** the bud opens into a white water-lily (petals unfold 300 ms), Hopper leaps onto it, the changed flaps flutter. EN **"{prev}, {next} — that's one hop of {s}!"** · find the hop: **"Every hop is {sign}{s}!"** After the last bud of the round: the column ladder show (§2) and **"{list} … counting by {s}s!"** (list built from the chain).

## 8. Settings
1. **Count by:** 5, 10, 100 (default) / 2, 3, 4 / 25, 50, 100 — the chain's numbers and flap count change at rest.
2. **Direction:** up and down (default) / up only.

## 9. Words (EN source)
- title (frozen in en..sv): "Hopper's Lily Hops" — the on-page tool title stays; da / no / fi titles are authored new.
- instructions **"Count by {s}s. Flip the empty pad to the next number."** · **"Count back by {s}s. Flip the empty pad."** · **"How big is each hop? Flip Hopper's sign."**
- hints **"Flip it forward by one hop of {s}."** · **"Flip it back by one hop of {s}."** · **"Hopper hops {hop}. Your pad is {made} away."** · **"Line them up: {prev} and {s} more."** · **"Line them up: {prev} take away {s}."**
- celebrations **"{prev}, {next} — that's one hop of {s}!"** · **"Every hop is {sign}{s}!"** · **"{list} … counting by {s}s!"**
- settings **"Count by"**: "5, 10, 100" / "2, 3, 4" / "25, 50, 100" · **"Direction"**: "up and down" / "up only"
- **Keep the old native strings where they fit** — the live de/fr/es/pt/it/nl/sv string sets in `skipcount-activity.js` (e.g. de *in {step}er-Schritten*, fr *de {step} en {step}* — never *compter par 10*, es *de {step} en {step}*, nl *in sprongen van {step}*, sv *{step} i taget*, the backward forms *rückwärts / en reculant / hacia atrás / para trás / all'indietro / terug / baklänges*) are the starting point for the new frames; da / no / fi are authored new (da *tælle {s} ad gangen*, no *telle med {s} om gangen*, fi *luetella {s}:n välein* — native authors decide).
- **Locale traps:** (a) **"count by 5s"** is never a calque — the frames above. (b) **number words never appear** (numerals only), so no vigesimal da/fr trap — but the hint "{prev} and {s} more" must not be rendered with a word that implies addition in going-down rounds (separate frames). (c) **digit grouping:** no thousands separator appears (max 1000 shown as 1000 on four flaps — never "1 000" / "1.000"). (d) **"hop"** — de *Sprung*, fr *bond*, es *brinco* (es-MX) / *salto*, pt *pulo*, it *salto*, nl *sprong*, sv *hopp*, da *hop*, no *hopp*, fi *loikka / hyppy*; keep the old live choices. (e) the plus/minus on Hopper's sign and the meter: U+2212 for minus.

## 10. Sound off, access, phones
- Sound off: flaps flipping, the leap meter, the column ladder, the opening bud, Hopper's leap — all visible.
- Keyboard path §5; aria: pad `"lily pad {n}"`, bud `"empty pad, now showing {digits}"`, flap `"tens flap, {d}"`.
- Taps: board flaps ≥ 60 × 88 with 44 px halves; Check ≥ 52 px tall. Picture: Hopper 96 px at 704 / 64 px at 360 (one picture, identical every round).
- Check above the 360 × 740 and 320 × 640 folds (§4 budgets).

## 11. Distinct from
- **New 252 The Washing Line:** equal bags on a rope, a wrong tag runs to its peg — skip counting as length. **New 288 The Measuring Rod / New 297 The Step Spring (backlog):** rods laid end to end; a set spring that tumbles at the first wrong stone. Here there is no length at all: the hop is a change of *digits*, place by place.
- **number-drum (tool):** turning the ones ring past 9 drags the tens ring round — automatic carrying. Here the flaps deliberately do **not** carry: the child does the regrouping, and the leap meter shows what happens when they don't.
- **Row 51 The Syllable-Family Lock (designed):** a lock that opens when each wheel shows the right syllable — choose-the-symbol. Here the pad starts as a copy and is *advanced* by the hop; the action, not the final face, is the skill.
- **choral-counting (tool):** a chart that highlights patterns; our column ladder is the earned end-of-round view of the child's own chain.
- **Batch siblings:** 269 (count single ticks from a landmark), 142 (place value of the digits as tubes) — 141 is the *moving* place value of counting.

## 12. Build plan
- **Core state:** `{ set, dir, round:{seq, buds, kind:'fill'|'hop'}, flaps:{bud:[d|null]}, sign:{s:+1|-1, digits}, active }`.
- **Functions:** `flaps(n, places)` → digits with leading null (blank), `flip(i, ±1)` (no carry; leading flap cycles null→1…9→null), `valueOf(flaps)`, `meter()` = valueOf(bud) − seq[bud−1], `check()`.
- **Gate's own truth (`verify-flip-pads-core.js`):** independent arithmetic over all 33 rounds: each chain is arithmetic with its step; no 0, nothing > 1000; buds never at index 0; ≤ 6 of 16 buds on the last pad per set; ≥ 5 boundary-crossing buds (≥ 2 flaps change) per set; ≥ 2 going-down rounds per set; every chain that starts at its step is drawn straight from a printed 0 tick with equal-group dots on each pad, and no other chain is; find-the-hop answer = seq[1] − seq[0]; flip never carries; a leading blank never renders "0"; the 4-flap board appears iff the chain contains 1000; the old 11 rounds' patterns each have a counterpart (5s multiple, 5s non-multiple, 10s across 100, 10s down, 100s).
- **Mutations (each killed):** flip carries into the next flap · leading flap shows "0" · bud preset to blank instead of the copy · second bud preset from the printed pad instead of the first bud · meter shows |difference| (loses the sign) · going-down accepted when flipped forward · a chain containing 0 · a 4-flap board on a 3-digit chain · buds all on the last pad · find-the-hop ignores the sign · same order twice.
- **Pictures:** `pets/frog` (seen on the pets contact sheet — a side/three-quarter view facing left; mirrored here, no text in it). Lily pads, flaps, the bud, the sign and the meter are drawn apparatus.
- **Risks:** the da/no/fi metadata (new); flap legibility at 320 (board flaps ≥ 60 × 88). Nothing blocked.

## 13. The four questions
1. **Choose it again?** Yes — clacking split-flaps, a frog that leaps when you are right, and a pond that keeps growing while you watch.
2. **Teacher on the board?** Yes — "counting by ten only changes the tens" is the exact understanding 2.NBT.A.2 is after, and the flaps refuse to regroup for the child; the leap meter shows a forgotten carry as a jump backwards.
3. **Parent trust?** One library frog, numerals only, calm, no timer, no score.
4. **Invention:** the empty pad arrives as a copy of the last one and you flip it forward by one hop — a hop of ten flips only the tens flap, and past 9 you must flip the next flap yourself.

## 14. Critic review (2026-10-17)
Scores before → after: invention 5→5 · fun 5→5 · completeness 4→5 · correctness 4→5 · distinctness 5→5 · reality 5→5
What changed:
- **Measured claims corrected** (`work-c32/flap.js`): the bud-crossing counts are 5 / 5 / 10 per set, not 8 / 5 / 9; the 25·50·100 set has 3 going-down rounds, not 2; the 2·3·4 set never reaches 1000 (no 4-flap board) — the gate now asserts "≥", not a false "=".
- **Coverage closed for the worksheets the map assigns here:** the number-line worksheets (G1-278/279/280/281: counting in fives/tens on a line) and Multiplication Hops (G3-308: equal jumps from 0) and Count in Groups (G1-126) had no counterpart in a winding pond. Every chain that starts at its own step is now drawn straight from a printed 0 tick (the bank — a tick, never a pad, so 0 is never counted) with an equal group of drawn dots on each pad, so the pad's number is visibly the running total. The default set's 140-round became 10, 20, [30], 40, [50] for this (flap and crossing counts unchanged).
- **The clacks are the hop:** a faint tally of forward flips under the flap board shows that +5 is five clacks of the ones flap and +10 one clack of the tens — the split-flap mechanic now enacts the size of the hop, not just its result.
