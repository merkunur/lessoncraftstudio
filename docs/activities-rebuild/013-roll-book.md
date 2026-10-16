# 013 — Mama's Roll Call (K.CC.B.5) — the Roll Book

Replaces `mamas-roll-call.numeral-trace.k-cc-b-5` (old engine: a drawn Mama Duck, a raft of drawn ducklings, a numeral called, the numeral traced). Same manifest id; the seven slugs and titles stay; the intros say "send exactly as many as she asks, count them out one by one, then sign the roll by writing the number" — and the en / pt intros still promised a zero round, which the operator's ruling removed (fixed with this build). New sv / da / no / fi slugs, titles, intros (grade 1, K-cluster rule). New tool `roll-book-activity`, own core `roll-book-core.js` which LOADS `number-trace-core.js` (the digit shapes, the barred seven) and `stroke-trace-core.js` (the stroke judge) unchanged; own manifest `roll-book-activities.json`. Pictures: the library duck (animals/duck), identical instances. Never 0.

Distinct from the other count-out instruments (#10 the Animal Train, #11 the Fruit Stand: a NUMERAL is the target): here Mama's call is a DOT CARD, never a numeral, and the child writes the numeral themselves — count a quantity, make the same quantity, write how many.

## The four questions

1. **Would a 5–8-year-old choose it again?** A pond bank, a raft full of ducklings, and Mama's call card with dots on it. Every tap on the raft sends one duckling paddling to the bank; a tap on a duckling sends it back. Then sign the roll: press the number stamp and trace the number in the mud with a finger.
2. **Would a teacher put it on the board?** K.CC.B.5 both ways: count to answer "how many?" (the dots, the ducklings on the bank, scattered) and "given a number, count out that many" (send exactly as many); and writing the numeral that tells how many (K.CC.A.3) — the numeral is never shown, so the writing is the child's own answer. Check reads the bank first (too many / too few), then the signature (no number yet / not traced yet / a number that is not how many came). The help never moves a duckling: after a wrong Check the ducklings on the bank are numbered; after a second, Mama's dots are too.
3. **Would a parent trust it?** No mascot is drawn, no timer, no score; real duckling pictures; the digits come from the same handwriting shapes as the Fading Line (barred seven where schools write one).
4. **The invention: THE ROLL BOOK — the count becomes writing.** A quantity on a card becomes the same quantity on the bank, and that quantity becomes a numeral the child forms.

## Rounds

Up to 9 (default): 5 · 7 · 3 · 9 · 6 · 8 · 4 · 2 (dots in two rows of five, or a small scatter for ≤ 5). Up to 5: 3 · 5 · 2 · 4 · 1 · 5 · 2 · 4. The raft holds ten (seven up to 5), always more than Mama calls, so the child decides when to stop. Teacher setting: Mama shows dots (default) or the numeral (then the writing is copying — for children who are just starting to write).

## Layout

The pond is a grid: Mama's card takes two cells top-left, the raft one cell top-right, the rest are landing spots (scattered order, fixed per round). Wide (≥ 560): 5 × 3 cells ≤ 112 px; the roll book (mud slate + number stamps) under it. Phone: 4 × 4 cells. The shell Check under everything.

## Refuse-list

No drawn mascot, no 0, no numeral on the call card (unless the teacher chooses it), no running count, no help that moves a duckling, no timer, no score.
