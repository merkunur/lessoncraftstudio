# #20 — Which Number Is Smaller? → THE BLOCK TOWERS (K.CC.C.7)

ORDER row 20 · id `choice-board.pick-smaller.k-c-c-7` · own files `block-towers-core.js`, `block-towers-activity.js`, `block-towers-activity.html`, `block-towers-activities.json` (the row left `choice-board-activities.json`). Slugs and titles in all 11 locales are unchanged (metadata frozen).

## The skill
K.CC.C.7: compare two numbers between 1 and 10 given as written numerals.

## The apparatus and its invention: THE COUNT THAT STOPS
- Two big number cards side by side (left numeral coral, right teal). Above each sits an empty tower of faint slots, the same for both. Below is an optional counting row 1…10.
- The task stays on the written numerals: tap the smaller one, then Check.
- Right: both towers grow at the same time, one block per beat, while the counting row lights 1, 2, 3 … The smaller number's tower stops first and raises a flag with its numeral; the other climbs on.
  - Smaller is the number you reach first when you count, and the towers show how many each numeral means.
  - #19 (the Number Elevator) shows the same comparison as POSITION on a vertical number line; this one shows it as QUANTITY and ORDER IN THE COUNT.
- Miss 1: "count from 1: which do you say first?" (no towers). Miss 2: the towers grow for that look, until a new choice.
- Rounds:
  - up to 10: 3/8 7/2 8/9 5/1 4/7 10/8 5/6 2/9 8/4;
  - up to 5: 2/3 4/1 3/5 5/4 1/3 4/2 2/5 3/1.
- The smaller number is on the left 5× and on the right 4×. Neighbours appear at least twice. No pair is shared with #19. The pair is never equal and never includes 0.

## Layout
- Wide (≥ 560): blocks 34 px (52 for five), cards ≤ 140 px.
- Phones: blocks 24 px (40 for five; ten blocks ≤ 240 for the 360 fold), cards 76–104 px.
- The two cards are always level (same row).

## Settings
Numbers up to 5 / up to 10 · Counting row shown / hidden.

## Gates
verify-block-towers-core 353 · mutate-block-towers 21/21 · local-test 11 locales × 7 widths 1425/0 · visual-qa 54 · hierarchy 110/0 · settings-efficacy 2 live (`--tool=block-towers-activity`) · preflight PASS · content ×11, prose-claims, SERP, tells PASS.

## Review (one reviewer)
No MUST-FIX. Applied: "one block per beat" read oddly when translated literally; it now uses each locale's own "one at a time" idiom (à la fois / a la vez / de cada vez / alla volta / ad gangen / om gangen / i taget / Klötzchen für Klötzchen). no title "Klosstårnene" (no linking -e). it "Striscia dei numeri"; nl "Getallenrij"; fi "Kumman luvun sanot ensin?"; it "è quella del numero più piccolo". Self-caught before review: three up-to-10 pairs were #19's pairs with the question flipped (now gated: ≤ 1 shared); the flag sat under the empty-slot outlines; an element field named `_strip` shadowed the `_strip()` settings getter.
