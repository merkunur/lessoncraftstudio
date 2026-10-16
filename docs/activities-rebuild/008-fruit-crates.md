# 008 — Write the Number 0 to 20 with Fruits (K.CC.A.3) — the Fruit Crates

Replaces `ten-frame.write-numeral.0-20.fruits` (the shared ten-frame engine: two flat frames of small fruit counters and the shell keypad). Same manifest id; all eleven slugs, page titles and intros already exist and stay frozen (they still describe the activity truthfully: count the fruit on a double ten-frame, write the numeral 0–20). New tool `fruit-crates-activity`, own core `fruit-crates-core.js`, own manifest `fruit-crates-activities.json`; the row leaves `ten-frame-activities.json` (the other six rows stay on the engine). Pictures from the library through `lcs-pictures.js` (theme `fruits`: apple, banana, pear, lemon, strawberry, orange, pineapple, cherry — contact sheet read 2026-10-16; plum / nectarine / peach / apricot read as apples, cut fruit is not one whole thing, so they are out).

## The four questions

1. **Would a 5–8-year-old choose it again?** Two wooden fruit crates with ten boxes each. At the start of a round the fruit drops in, one box after another, a row of five first, then the next. The child writes how many on a slate with number keys. Check reads the slate against the crates — and the crates read themselves: a right number turns the slate gold, the landmark numbers appear on the fruit (5, 10, 15, 20) and the last fruit carries the child's number, which is spoken.
2. **Would a teacher put it on the board?** K.CC.A.3: represent a number of objects (0–20) with a written numeral. The double ten-frame is the apparatus every K teacher uses for exactly this: a full crate is ten, so 14 is read as "a full crate and four", and the written 14 is a 1 for the full crate and a 4 for the rest. The slips teachers see are named: 41 for 14 (the digits the other way round), 4 for 14 (only the second crate), 10 for 14 (only the first crate), a number for an empty crate (zero).
3. **Would a parent trust it?** No mascot, no score, no timer. Real fruit pictures, honest structure, the help never types the answer: the second help runs the count-on numbers to the fruit before the last, which shows "?".
4. **The invention: THE CRATES READ THEMSELVES.** First miss (6 and more): numbers appear on the landmark fruit (the 5th, 10th, 15th) — start there and count on. First miss (5 or fewer): count again, one at a time. Second miss: the count-on numbers run along the fruit from the last landmark and stop at a "?" on the last fruit. "Quick look" (teacher setting): the crates are covered with a cloth after a moment; Peek lifts it again — the frame is read by its rows of five, not one by one.

## Apparatus and layout

- Stage ≥ 560 px ('row'): the crates stand one above the other, each 5 × 2 boxes, a box as wide as the stage allows (the crates fill the width) and at most 104 px tall; the fruit is 104 px (≥ 96 at 704); the slate and one aligned row of eleven keys (1 2 3 4 5 6 7 8 9 0 ⌫) under them (slate on its own line below 632 px).
- Stage < 560 px ('stack'): the crates stand side by side as vertical frames (2 × 5, left column first), boxes ≤ 68 px, the slate above with a pencil that opens a floating pad (Done closes it), as in #7; the 320 × 640 fold holds both crates and Check; after a miss the shell's hint bubble pushes Check below the 320 × 640 fold (a scroll) — holding it would need fruit under the 64 px floor; from 360 × 740 it stays in.
- Numbers to 10: one crate. Numbers to 20: two crates (an empty second crate for 0–10 — an empty crate adds nothing).

## Rounds

To 20 (default): 0, 3, 8, 10, 11–20 (14 rounds). To 10: 0–10 (11 rounds). One fruit per round, order-only reshuffle per pass (§A.13.60). Typing: two digits at most, a leading zero is replaced.

## Slip table (typed a, crates n)

none (nothing written) · zero (n = 0) · reversed (a ≥ 10, digits reversed = n) · oneDigit (1 ≤ a ≤ 9, n ≥ 10, a = the ones of n) · tensOnly (a = 10, n > 10) · more / fewer.

## Refuse-list

No mascot, no drawn fruit, no marks to tick (the frame is the tracking device), no answer typed by the help, no timer or score, no words on the apparatus.

## Gates

`verify-fruit-crates-core.js` (pools, typing, slip table, help ladder, chips, layout floors) · `mutate-fruit-crates.js` · `local-test-fruit-crates.js` (real taps, every locale at 704, width sweep) · `visual-qa-activity.js` · `audit-activity-hierarchy.js` · `audit-settings-efficacy.js --tool=fruit-crates-activity` · `live-verify-fruit-crates.js`.
