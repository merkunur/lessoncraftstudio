# #156 — Bram's Board Shop → THE SPIRIT LEVEL (2.MD.B.5; all 11 locales)

ORDER row 156 · id `bram-board-shop.length-word-problems.2-md-b-5` (kept). Design: `designs/156-bram-board-shop.md`.

## The invention
- **Every length story becomes two rails that must end together.** The child lays the story's two lengths on Bram's bench:
  - the whole (the longest length) on the top rail;
  - the parts end to end on the bottom rail.
  Eleven story shapes (add-to / take-from with the start, the change or the result unknown; take-apart; compare difference / bigger / smaller; put-together) all become that one picture.
- **The rack has a decoy.** Besides the story's two boards it holds the answer a keyword-only child would get (the sum in a "saws off" story, the difference in an "is longer than" compare-bigger story).
- **The answer cuts a real board.** Once two boards are on the bench, the keypad unlocks and the typed number shows in the dashed mystery place. On Check the saw cuts a board exactly as long as the typed number and drops it in. A spirit level against the two rail ends then:
  - stands straight when the rails end together;
  - leans toward the longer rail otherwise, with the gap or overhang shaded.
- **Misses:**
  - a board that is not in the story, or a length on the wrong rail, gets its own hint — including when the wrong bench happens to balance (*"the rails end together, but one of these boards is not in the story"*);
  - a wrong number → "Is the mystery board too long or too short?";
  - miss 2 marks on the ruler where the mystery board starts and must reach. When the mystery is the whole, it starts at 0 and its end IS the answer, so the help names only where the first piece ends and never marks the end. On a wrong bench, miss 2 moves the boards to the story's rails.
- **Success:** the level straight, the ticket stamped, and the equation in the story's own shape (*"? + 15 = 40, so the stick was 25 cm at first!"*).
- **The level button** tests the bench at any time (no number shown).

## Deviations from the design
- **The answer is typed on the activity's keypad** (not a two-wheel dial): the dial does not fit a phone. The keypad stays locked until the bench is built, and the typed number shows in the mystery place.
- **Stool → board in the compare stories.** A stool is measured by its height, and a "47 cm long" stool is a bench (the row 155 real-size lesson).
- **Stories are shape templates** (numbers as placeholders), one per shape per language, shared by the two levels. The grammar cannot depend on the numbers.
- **The rack packs boards side by side and shrinks as the bench fills**, so phones fit. Every board and both rails are 44-px touch targets, with the wood drawn at scale inside. At 320 px the job picture drops out of the ticket.
- **sv / da / no / fi pages are NEW** (slug, title, intro written in this build, native-reviewed). The frozen metadata of the other seven is untouched.

## Review (one native + pedagogy reviewer, all 11 locales) — all fixed at the source
- **Hints:**
  - hintFull no longer says "the saw cuts the THIRD board" (the third board is always the decoy);
  - hintRail says the whole can be the mystery board;
  - hintLevel asks whether the mystery board is too long or too short (the only thing the child can change);
  - the top-rail count-up help no longer states the answer (text and ruler marks).
- **Story wording:**
  - pronouns that could mean the piece are replaced by the noun (de/sv/da/no/en/es/it);
  - es-MX «listón» (a ribbon in Mexico) → «tira de madera»;
  - no «lekten»; it «una dopo l'altra»; pt «Quantos centímetros…»;
  - en "type how long the mystery board is"; en "a 15 cm piece".
- **Per-locale wording:**
  - fi «samaan kohtaan» (place, not time);
  - sv «den hemliga brädan», «brädstället»;
  - da «regnestykket», «ender samme sted»;
  - de/es rack ≠ shelf;
  - step-of-5 labels;
  - fr « plus longue ».
- **Curriculum and prose:**
  - it «obiettivi di apprendimento al termine della classe terza». The same wrong «traguardi» citation was also fixed on the four live pages of rows 152–155.
  - no LK20 aims;
  - en prose split.
- **Checked as false alarms:** French narrow spaces are present in the file; the dump was taken before injection.
- **Found in my own render reading:** a balanced but wrong bench showed a straight level with a "wrong" hint, which was confusing. That is now a separate, honest hint.

## Gates
- **Logic:**
  - `verify-spirit-bench-core.js` 12,486/0 — own story table, own solver per shape, own bench model, own keyword-trap rule; every bench the child can build × typed numbers graded; regrouping at level 2; bots never beat the operation-guess baseline (7 of 11 shapes have a subtraction answer).
  - `mutate-spirit-bench.js` 32/32 killed, control passes.
- **Browser:**
  - `local-test-spirit-bench.js` 2,618/0 — 11 locales; real taps and a real drag; boards at scale; the mystery place sized; cut, lean and overhang; count-up; decoy (balanced); wrong rail; third board; top-rail help; level test; keyboard; ruler hidden; within 100; 7 states × 6 widths. Poisoned: the saw cutting the answer instead of the typed number fails 2.
  - `visual-qa-activity.js` 462/462; hierarchy 662/0; settings efficacy 2 live.
- **Content:** content gates ×11, prose claims, SERP copy, preflight routes.
