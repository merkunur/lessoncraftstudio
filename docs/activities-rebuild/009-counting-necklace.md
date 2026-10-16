# 009 — The Necklace That Won't Hold Still (K.CC.B.4) — the Counting Necklace

Replaces `necklace.bead-string.k-cc-b-4` (a drawn fox face, small beads under a 48 px prompt, a running "counted" readout that stayed on screen as the answer; 7 locales, sv/da/no/fi missing). Same manifest id; the seven existing slugs, page titles and intros frozen (they still mention the fox — operator item); sv/da/no/fi slugs, titles, intros and prose authored new. New tool `counting-necklace-activity`, own core `counting-necklace-core.js`, own manifest `counting-necklace-activities.json`; `necklace-activities.json` emptied. No pictures: beads, a cord and a clasp are apparatus geometry (SVG, declared `nk-`).

## The four questions

1. **Would a 5–8-year-old choose it again?** A big round necklace. A tap and a bead slides along the cord to the clasp, with a soft rising note and the count in the middle; then the necklace won't hold still — the beads glide apart, squeeze together, or one more bead comes on — and the question is whether the number changed.
2. **Would a teacher put it on the board?** K.CC.B.4 in all three parts: (a) one number per bead in order — the string enforces it, beads cannot pass each other; (b) the last number tells how many, and it stays the same however the beads lie (the Piaget spread/bunch test, with "looks like more / fewer" lures); (c) one more bead is the next number.
3. **Would a parent trust it?** No mascot, no score, no timer; the count shows while counting (or the child says it aloud — setting) and fades before the question; wrong cards are named; recounting is offered as a strategy, never punished.
4. **The invention: A NECKLACE WHOSE BEADS CANNOT BE SKIPPED, AND WON'T HOLD STILL.** One-to-one is a property of the apparatus, not a rule told to the child; conservation and one-more are tested on the same beads the child just counted.

## Rounds

To 10 (default): 5 clumps→spread · 6 spread→bunch · 7 bunch→one more · 8 clumps→spread · 9 spread→bunch · 4 spread→one more · 10 clumps→bunch · 6 bunch→spread · 8 spread→one more · 7 clumps→bunch. To 5: eight rounds of 3–5. Two questions a round, three cards each; lures in the direction of the misconception (spread → "more", bunch → "fewer", one more → the old count or "two more"); the right card's position cycles so no position wins; measured guess rates (smallest / largest / middle / each position) are ratchets in the gate (to 10 ≤ 0.35, to 5 ≤ 0.44).

## Layout

From 600 px: the necklace on the left (D ≤ 440), three tall cards stacked in the panel on the right; below 600: the necklace at 88 % of the width, the cards in a row under it. The question stands inside the necklace where the count stood. Three blank waiting cards hold the panel's place while counting. Count again appears after a wrong card.

## Refuse-list

No mascot, no drawn objects, no running total left on screen at the question, no card position or size that wins, no timer or score, no words on the apparatus.
