# 007 — Rivet's Number Forge (K.CC.A.3) — the Jar Label

Replaces `rivets-number-forge.numeral-album.k-cc-a-3` (a drawn raccoon, foil packs of drawn acorns/buttons/fireflies, a lever that "forged" the numeral from the count; 7 locales, sv/da/no/fi missing). Same manifest id; the seven existing slugs, page titles and intros frozen; sv/da/no/fi authored new. New tool `jar-label-activity`, own core `jar-label-core.js`, own manifest `jar-label-activities.json`; `rivets-number-forge-activities.json` is emptied. Pictures from the library through `lcs-pictures.js` (theme `toys`: ball, balloon, kite, car, truck, robot, dinosaur, boat, rocket, train, airplane, helicopter — contact sheet read 2026-10-16).

## The four questions

1. **Would a 5–8-year-old choose it again?** A big glass jar of toys with an empty label on its lid. The child counts — every toy takes a mark when tapped — then writes the number on the keypad; the digits appear on the label. Check lays the written number against the jar: the toys file into numbered places one by one, and if the label is right it turns gold and sticks, the number is spoken. In the other kind of round the label is already written — "12" — and the jar is empty: the child taps toys on the shelf to drop them in until the jar holds that many.
2. **Would a teacher put it on the board?** K.CC.A.3, the third face: represent a number of objects (0–20) with a written numeral — and, read a numeral, show that many. The jar shows 0–10 loosely and 11–20 in an orderly array (what K.CC.B.5 allows for counting to 20); every toy can be marked once, so one-to-one is enacted, and the running count is the child's own — no tags with numerals (the Counting Table's invention). A wrong label is answered by the jar, not by a red cross: the toys file into as many places as the label says — a label too small leaves toys standing without a place, a label too big leaves empty dashed places — and the slip is named: *the same digits the other way round* (41 for 14), *only the ones* (4 for 14), *none means 0*. Settings: Numbers to 10 / to 20; Rounds count & write / fill the jar / both. No timer, no score.
3. **Would a parent trust it?** No mascot. A jar, a lid, a label, number keys, library toys ≥ 96 px (≥ 64 on a phone), identical instances per round. Legible with the sound off; works at 320 px.
4. **Is it creative?** The invention: **the label laid against the jar — the number the child writes becomes a row of places the toys file into, so a wrong label shows exactly the gap or the leftover, and a right one sticks.**

## Apparatus

- **The jar** (`.jl-jar`): a lid band (`.jl-lid`) carrying the label (`.jl-label`, the typed digits in print; a pencil button on phones opens the pad) and the glass body (`.jl-body`) with the toys in a grid — 5 columns from 560 px, 4 below; picture = cell − gap; ≤ 10 toys sit with a small seeded jitter (loose), 11–20 in straight rows. Marks (`.jl-mark`) toggle per toy. On Check the places appear (`.jl-place`): ticked for the first *a* toys, coral-ringed leftovers beyond *a*, dashed empty places beyond *n*.
- **The pad** (`.jl-pad`): keys 1–9, 0, erase (≥ 44 px). From 560 px one aligned row of eleven keys under the full-width jar (1 2 3 … 9 0 ⌫ — the operator's 2026-10-16 note "the numbers are not aligned" retired the two-column side pad); below 560 a floating pad over the lower jar, opened from the lid's pencil and closed by Done or a tap outside.
- **The shelf** (`.jl-shelf`, fill rounds): a row of toys; tap one → it drops into the jar; tap a toy in the jar → it goes back.
- **A note** (`.jl-note`) under the jar carrying the numerals the hint cannot ("3 left over", "2 empty places").
- Settings drawer: Numbers (to 10 / to 20), Rounds (both / count & write / fill the jar).

## Rounds

To 20: count 0, 6, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20 + fill 7, 12, 15 (17 rounds). To 10: count 0…10 + fill 3, 5, 8 (14). Toy rotated per round (seeded). Order-only reshuffle. One right answer. The keypad has no position tell; the label can take two digits (so 41 can be written and named).

Slip table (count rounds, a = written, n = in the jar): a = n → right · n = 0 → zero · a ≥ 10 and reverse(a) = n → reversed · a < 10 and n ≥ 10 and n mod 10 = a → oneDigit · a < n → more (k = n − a left over) · a > n → fewer (k = a − n empty places). Fill rounds: in = n → right · in < n → fillMore · in > n → fillFewer.

## Layout

Stacked shell; the jar spans the stage, the key row under it from 560 px, the floating pad below 560. No `vh`. Budget at 320 × 640: lid 48 + body (5 rows × 67 + 8 + 12) = 403 with no standing note on a phone (the note under the jar is shown beside the pad only; slip notes always) — measured Check bottom 623 of 640.

## Strings (×11, one reviewer)

title · instruction · promptCount · promptFill · hintNoLabel · hintZero · hintReversed · hintOneDigit · hintMore · hintFewer · hintFillMore · hintFillFewer · hintNone · noteLeft ("{k} left over") · noteEmpty ("{k} empty places") · noteMarked? (no) · celebrateCount ("Yes! {n} — the label sticks.") · celebrateFill ("Yes! {n} in the jar.") · jarLabel · lidLabel ("the label: {a}") · lidEmpty · toyMarked · toyUnmarked · shelfLabel · write · done · erase · setRange / rangeTo10 / rangeTo20 · setTask / taskBoth / taskCount / taskFill.

## Refuse-list

No raccoon, no drawn treasure. No numbered tags (the Counting Table's). No numeral built from objects. No red cross: the jar answers. No hint that states the right number. No timer.

## Gates

`verify-jar-label-core.js` (own oracle: pools and coverage, the slip table exhaustively, typing rules, fill moves, layout floors incl. the 320 budget) · `mutate-jar-label.js` · `local-test-jar-label.js` (real taps and typing, every round, 11 locales, widths 320…1366) · `visual-qa-activity.js` · `audit-activity-hierarchy.js` · `audit-settings-efficacy.js --tool=jar-label-activity` · `preflight-activity-routes.js` · `verify-activity-prose-claims.js` · preview · one reviewer · `live-verify-jar-label.js`.
