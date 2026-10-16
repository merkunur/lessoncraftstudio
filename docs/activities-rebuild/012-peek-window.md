# 012 — How Many Are There? (K.CC.B.5) — the Peek Window

Replaces `choice-board.how-many-group.k-c-c-b-5` (the shared choice-board engine: a group of pictures and four numeral options). Same manifest id; the eleven slugs, page titles and intros stay (en/es/fr/it/pt/nl/sv/da/no/fi "count the objects in each group and tap the matching number, up to 10"; de "Simultanerfassung — kleine Mengen auf einen Blick erfassen"). The row leaves `choice-board-activities.json`. New tool `peek-window-activity`, own core `peek-window-core.js`, own manifest `peek-window-activities.json`. Pictures from three library themes (contact sheets read 2026-10-16): animals duck, cat, owl, rabbit, pig; fruits apple, orange, strawberry, pear, lemon; vegetables tomato, carrot, onion, pumpkin, corn — compact, upright, one object each (the toadstool mushroom is out). Counting never includes 0.

Distinct from #1 the Counting Table (K.CC.B.5 too): there the child tags every picture and the last tag answers; here the child first SEES how many — small groups at a glance, larger ones by their shape (a full five and two more, pairs, dice faces) — and counting is the way to check.

## The four questions

1. **Would a 5–8-year-old choose it again?** A little window with two shutters. They swing open — ducks! — and close again. How many were there? Tap a number. Wasn't sure? Look again, as often as you like. Then Check: the shutters open and the pictures count themselves.
2. **Would a teacher put it on the board?** K.CC.B.5, "how many?", to 10, with the arrangement doing the work teachers use in number talks: dice faces to 6, two rows of five (6–10 as five and some more), pairs, a short line, a small scatter (≤ 5 — a scatter of more is counted, not seen). A wrong answer opens the window for good and asks the child to count; a second wrong answer runs the numbers along the pictures to a "?" on the last one, so the child still says how many. Teacher setting: the window opens for a moment, a little longer, or stays open (plain counting).
3. **Would a parent trust it?** No mascot, no timer, no score; real library pictures; "look again" is never punished; nothing on the window but the pictures.
4. **The invention: THE WINDOW THAT SHOWS THEN HIDES.** A short look makes the child read the group as a whole (five-and-two, a dice four) instead of tapping one by one; the look can always be repeated, and counting is the check.

## Rounds

Up to 10 (default): 4 dice apples · 7 five-and-more ducks · 2 pair carrots · 5 dice cats · 9 five-and-more oranges · 3 scatter tomatoes · 6 dice owls · 8 pairs strawberries · 10 two rows of five pumpkins · 5 line rabbits. Up to 5: 3 dice pears · 1 pig · 4 dice onions · 2 pair lemons · 5 dice corn · 3 scatter ducks · 4 pairs apples · 5 line carrots. The answer rail is a fixed 1…10 (1…5) — position carries no information but the value.

## Layout

From 560 px: the window landscape (5 × 3 cells, ≤ 112 px), the rail of ten under it, Look again beside the rail. 328–559 px (a 360 phone): the window upright (3 × 5) with the rail beside it in two columns. Below 328 px (the 320 × 640 phone): the window landscape again with the rail in two rows under it. The shell Check under everything.

## Refuse-list

No mascot, no timer, no score, no running count, no words on the window, no 0, no scatter of more than five in the quick look, no penalty for looking again.
