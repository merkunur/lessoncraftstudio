# #14 — Feed Mochi → THE TREAT BOX (K.CC.B.5, count out a given number)

ORDER row 13 · id `mochi-feast.count-out.k-cc-b-5` · own files `treat-box-core.js`, `treat-box-activity.js`, `treat-box-activity.html`, `treat-box-activities.json` (`mochi-feast-activities.json` emptied to `[]`).

## The skill
K.CC.B.5, the count-out half: given a number, count out that many, and stop there. Behind it, K.CC.B.4b: the last number said tells how many.

## The apparatus and its invention: THE LID
- An order ticket (a numeral; tap = spoken).
- A tray of library treats, one kind per round (cookie, cupcake, donut, muffin, lollipop, brownie, waffle; the contact sheet ruled out "cherry" (drawn as an apple) and the stacks/slices). Always 12 treats (7 up to five), so the tray's size never tells.
- A bakery box of 12 places (6 up to five) with a **lid**: a tapped treat drops through a slot and is gone from sight, so the count has to live in the child's head. A tap on the lid is a peek (≈2 s, drops by itself). While open, a tap on a treat inside puts it back. "Empty the box".
- Check opens the box. Empty → start hint, no miss. Too many / too few → a miss, the lid stays off for the round. Second miss → treats numbered 1..a, extra places ringed coral, needed places dashed. Right → numbered, last gold, number spoken. The help never moves a treat.

## Why it differs from the other count-out rebuilds
Jar Label fill rounds (open jar) · Animal Train (seats, ticket) · Fruit Stand (fill-to-here trays) · Roll Book (visible bank + writing). Here the objects DISAPPEAR, which is the step that shows whether a child trusts the count.

## Refuse-list
No numerals on the treats while counting; no running count anywhere; no box-full stop (capacity always exceeds the order); no mascot drawn (Mochi is only the customer named in the title); no 0.

## Layout
wide (W ≥ 560): box 6×2 over tray 6×2, cell ≤ 112, picture cell − 6 (≥ 96 at 704). stack (300–559, and < 280): 4×3 + 4×3, cell ≤ 66, picture cell − 2 (≥ 64). narrow (280–299, the 320 phone): 6×2 + 6×2, picture = cell, half tilt.

## Settings
Numbers up to 5 / up to 10 · Lid on (keep count) / off (box stays open).

## Gates
verify-treat-box-core 712 · mutate-treat-box 33/33 · local-test-treat-box 11 locales 1,278/0 · visual-qa 54 · hierarchy 812/0 · settings-efficacy 2 live · preflight PASS · content ×11, prose-claims, SERP, tells PASS · live-verify-treat-box.
