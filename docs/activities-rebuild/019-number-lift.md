# #19 — Which Number Is Bigger? → THE NUMBER ELEVATOR (K.CC.C.7)

ORDER row 19 · id `choice-board.pick-bigger.k-c-c-7` · own files `number-lift-core.js`, `number-lift-activity.js`, `number-lift-activity.html`, `number-lift-activities.json` (the row left `choice-board-activities.json`). Slugs and titles in all 11 locales are unchanged (metadata frozen).

## The skill
K.CC.C.7: compare two numbers between 1 and 10 given as written numerals.

## The apparatus and its invention: THE BUILDING
- A building with ten floors (five in "up to 5"), with its floor numbers on the wall in counting order: a number line stood upright. Because a bigger number is a higher floor, the comparison is something the child can see.
- Two library farm animals (pig, dog, cat, sheep, cow, duck, rabbit, goat, donkey, llama) are the passengers. Each holds a ticket with a numeral (left coral, right teal). "Who goes higher?" The child taps a passenger, then Check.
- Right: the elevator rides up, stops at the smaller floor (that ticket stays there), then carries on to the bigger floor. The bubble says "Yes — 9 is bigger than 6!".
- Miss 1: "find both numbers on the building" (with hidden numbers: "count the floors from the bottom"). Miss 2: both floors light up in their passengers' colours. A new choice takes the lights away.
- Rounds:
  - up to 10: 6/9 4/3 8/2 5/7 10/9 1/6 7/8 3/5 9/4;
  - up to 5: 2/4 5/3 1/2 4/5 3/1 2/5 4/1 3/4.
- The bigger number is on the left 4× and on the right 5× (to10). Neighbours appear at least twice. The pair is never equal and never includes 0.

## Layout
- Wide (≥ 560): building 168 px wide, floors 40 px (64 for five floors), passengers side by side, pictures ≤ 120.
- Phones: building ≤ 110 px, floors 28 px (50 for five floors), the two passengers SIDE BY SIDE beside it at the same height, pictures 64–96 (from a 286 px stage). On screen, height only ever means floors.

## Settings
Numbers up to 5 / up to 10 · Floor numbers on the wall / hidden (count the floors).

## Gates
verify-number-lift-core 368 · mutate-number-lift 22/22 · local-test 11 locales × 7 widths 1590/0 · visual-qa 54 · hierarchy 218/0 · settings-efficacy 2 live (`--tool=number-lift-activity`) · preflight PASS · content ×11, prose-claims, SERP, tells PASS.

## Review (one reviewer)
MUST-FIX: on phones the passengers stood one above the other, so the physically higher card held the smaller number half the time — a lure aimed straight at "who goes higher?". Now side by side at the same height, gated (`sameHeight` at every width).
SHOULD-FIX applied: fr U+202F in the prose; it "Qual è"; nl "staat hoger" / "Welk getal staat hoger?"; pt "sobe mais alto"; da title "Tal-elevatoren"; the prose now names the count-the-floors hint; ordinal floors ("6. Stock", "6e étage", "9º"…) replaced by bare numbers (the bottom floor is labelled 1). da/no superlative with two kept (standard).
