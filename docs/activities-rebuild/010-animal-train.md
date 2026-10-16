# 010 — Count to 10 with Animals (K.CC.B.4) — the Animal Train

Replaces `ten-frame.count-to-10.make-n.animals` (the shared ten-frame engine's make-n template: "Make 7" on one flat frame of small animal counters, shell Check). Same manifest id; all eleven slugs, page titles and intros already exist and stay frozen (they describe counting 0–10 on a ten-frame with animals — the carriage's ten seats in two rows of five ARE that ten-frame). New tool `animal-train-activity`, own core `animal-train-core.js`, own manifest `animal-train-activities.json`; the row leaves `ten-frame-activities.json`. Pictures from the library through `lcs-pictures.js` (theme `animals`, contact sheet read 2026-10-16: cat, dog, pig, duck, rabbit, sheep, panda, penguin, fox, koala, tiger, elephant — upright, whole, one animal each; dolphin/whale/fish/bat are out, nobody rides a train in water or upside down).

## The four questions

1. **Would a 5–8-year-old choose it again?** A train carriage with ten windows waits at a platform full of animals. A ticket on the carriage shows a number. Every tap on an animal sends it hopping into the next seat, the front row of five first; a tap on the train lets one off again. When the child thinks the number is right, they press Go — the train counts its passengers out loud and, if the ticket is right, chugs on to the next stop.
2. **Would a teacher put it on the board?** K.CC.B.4 in all three parts, PRODUCED rather than recognised: (a) one animal per seat, one number per animal — the seats fill in order, a seat never holds two; (b) the last number said tells how many: the child has to decide when to STOP, which is the whole of cardinality in the make-n direction (more animals wait than the ticket asks for); (c) the next number is one more: at a second stop the ticket changes to one more (or one fewer) and the child adds (or lets off) exactly one, instead of starting over. The ten seats are a ten-frame, so 7 can be seen as "a full row and two".
3. **Would a parent trust it?** No mascot, no score, no timer. Real animal pictures. A wrong Go is named in plain words ("On the train: 8. On the ticket: 7. Too many."), the train numbers its passengers so the child can see why, and the child fixes it — the help never moves an animal.
4. **The invention: THE TRAIN COUNTS ITS PASSENGERS.** The ticket is the target, the seats are the count, and Go is the moment of decision. While the animals board, each one shows its number for a moment and it fades (teacher setting: numbers shown as they get on / said aloud by the child) — so the child keeps the count, not the screen. After a wrong Go the train numbers everyone on board; after a second wrong Go it marks the extra passengers, or the empty seats still waiting.

## Rounds

To 10 (default, 12 animals waiting): 4 · 7 → one more · 9 · 6 → one fewer · 10 · 3 → one more · 8 · 5 → one more · 9 → one fewer · 7. To 5 (7 animals waiting): 3 · 2 → one more · 5 · 4 → one fewer · 1 → one more · 4 · 3 → one more · 5 → one fewer. One animal kind per round (identical pictures), a different kind every round. Guessers measured in the gate: "put everyone on" is right only where the train is full anyway (one stop of ten at to 10, none at to 5); "press Go at once" is never right (no ticket says 0).

## Layout

From 560 px: the ticket and Go side by side above the carriage; the carriage full width (two rows of five seats, ≤ 120 px); the platform below (6 animals a row, 4 at to 5; ≥ 96 px at 704). Below 560: the ticket and Go on top; the carriage stands upright on the left (two columns of five — a column of five fills first) and the platform beside it on the right, two columns. The note under the train carries the feedback; the shell Check stays hidden until the last stop is right (the train presses it).

## Refuse-list

No mascot, no drawn animals, no running total left on screen while boarding, no help that moves animals for the child, no timer or score, no words on the apparatus (the ticket carries a numeral only).
