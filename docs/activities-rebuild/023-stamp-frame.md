# #23 — Show the Operation → THE STAMP FRAME (K.OA.A.1)

ORDER row 23 · id `ten-frame.show-the-operation.k-oa-a-1` (kept) · own files `stamp-frame-core.js`, `stamp-frame-activity.js`, `stamp-frame-activity.html`, `stamp-frame-activities.json`. The row left `ten-frame-activities.json` (round-tripped in the file's own 1-space format). Metadata was frozen; all 11 locales already had slug, title and intro. Design: `designs/023-ten-frame.md`.

## The skill
K.OA.A.1: represent addition and subtraction with objects, drawings and expressions; find how many altogether and how many are left.

## The apparatus and its invention: THE EQUATION REACHES DOWN
- Three rubber stamps on a rack.
  - Addition rounds: orange + green.
  - Take-away rounds: orange + cross. The green stamp is absent, which pushes back on "subtraction is a second group".
  - Free play ("Stamp anything"): all three. The equation writes itself from the ink (e.g. 3 + 2 − 1 = 4).
- Pressing stamps:
  - Same stamp on a counter wipes it.
  - The other dot stamp recolours.
  - The cross stamp crosses or uncrosses an orange counter and refuses everything else, including a green counter (it would turn orange).
  - Within 20: the second frame refuses ink while the first has room (the hint "Fill the first ten-frame first" + a pulse on the first empty place).
- Check (the frame's own button; the shell's Check is hidden and pressed by the frame on the right answer):
  - Empty frame → "Lift a stamp…", no miss.
  - Otherwise THE TIDY slides the counters into reading order. It is a permutation only (gate rule 0): orange from place 1, green from the start of the second bracket (so a short orange run leaves visible dashed gaps); take-away: uncrossed then crossed, contiguous.
  - Then every number of the equation drops an outline bracket over its run of places, with its numeral as a tag. The take-away bracket of b sits dashed INSIDE the bracket of a.
  - A miss names the number to look under (outside / empty, then crosses more / fewer). That bracket glows (needed on 2 + 2 and 6 + 6, where two tags carry the same numeral).
  - On the second miss the places number themselves:
    - addition: both brackets;
    - take-away: 1..a when the slip is about the a, else the crossed run 1..b.
- Right printing:
  - Addition: the brackets merge into one with a "?" tag.
  - Take-away: the crossed counters peel off one by one into the away dish beside the frame, and one bracket closes round the ones left.
  - Only then is "how many altogether / left?" asked. The rack gives way to a number strip 1–10 (1–20), where position = value.
- The answer:
  - A part (addition) → "That's only the 4 part", and that part glows.
  - Tapping a or b (take-away) → "Those were taken away…", and the dish glows.
  - Anything else → "Count every counter", and the counters wave.
  - Second wrong → numbers 1..c−1 and "?" on the last; the help never writes the answer.
  - Right → box gold, counters numbered, the number spoken, the shell celebrates ("4 + 3 = 7. The two parts make 7!", "1 is left!" for c = 1, the dots line only when both addends ≥ 2).

## Rounds
- Within 5: 2+1 1+3 2+2 3+2 1+4 5−1 4−2 5−3 3−1 4−3.
- Within 10 (default, the old ten problems word for word): 3+2 4+3 5+4 2+6 1+5 5−2 8−3 7−4 9−6 6−2.
- Within 20 (two frames): 8+5 9+7 6+6 7+8 10+4 15−6 13−5 18−7 14−7 17−7.
- No 0 anywhere.
- Order-only reshuffle per pass: no two equal answers adjacent, + and − runs ≤ 2, never the same order twice (gate: 10 000 seeds per level).
- Settings:
  - Numbers: Within 5 / 10 / 20.
  - Show as: Numerals / Dots (die faces 1–6, dominoes 7–10; within 20 the numbers > 10 stay numerals).

## Layout
- Wide (≥ 560):
  - The frame is centred, with places ≤ 80 (two frames ≤ 72).
  - The away dish sits beside it in take-away rounds only (136 px column).
  - The note, then the rack or the strip, run full width under it. The strip is one number line of ten keys (two rows within 20).
- Narrow:
  - Everything is stacked.
  - Places ≤ 56; two frames 46, so the 1–20 strip stays in the 360 × 740 fold.
  - The strip is in rows of five.
- Frame padding is 12, so the brackets sit between the places and the frame border instead of on it.
- Departure from the design sheet: the design's right-hand 196 px answer column could not hold five 48 px keys per row. The strip took the rack's place under the frame instead (all widths), and the note moved under the frame.

## Gates
- `verify-stamp-frame-core.js`: 51 274.
- `mutate-stamp-frame.js`: 37/37.
- `local-test-stamp-frame.js`: real pointer taps, 11 locales × every Within 10 round + Within 20 / Within 5 + Dots / free play, width sweep 320–1366.
- `visual-qa-activity.js`: 60 renders.
- `audit-activity-hierarchy.js`: 362/0.
- `audit-settings-efficacy --tool=stamp-frame-activity`: 2 live.
- Preflight routes PASS.
- Content ×11, prose-claims, SERP, tells and answer-rank: PASS.
- The old `verify-ten-frame-operation.js` exits "retired", and `local-test-ten-frame.js` dropped the row.

## Review (one agent, native ×11 + pedagogy) — applied
- MUST: the instruction told the child to stamp the second number in green and to "stamp crosses". It was false for take-away rounds (no green stamp; the cross only lands on an orange counter). Rewritten in all 11 locales.
- MUST: no "kryssstempel" — bokmål never writes three identical consonants, so it became "kryss-stempel".
- Two code fixes:
  - The take-away second-miss numbering never counted to a.
  - The doubles were ambiguous ("under the 2") until the hinted bracket glowed.
- The prose sentence about tapping a part was scoped to addition, and en "sum" became "equation" (8 − 3 is not a sum).
- Native wording:
  - de askSub "davon nehme ich {b} weg";
  - fr "en dehors de l'accolade";
  - es showNumerals "Cifras" (was the same as the setting name);
  - it "griglia del dieci" ("tabella del dieci" sounds like the ten times table);
  - sv "bricka" not "markör";
  - fi "yliviivaaminen";
  - da "Ved 3 + 2".

## Traps
- The bash tool mangles regex backslashes in heredocs again (`\{[^\n]` → "unterminated character set"). Edit scripts belong in files.
- A mutation needle that copies a line breaks the moment that line gains a field: 3 harness faults after `g:` was added. The harness reports them as faults, not survivors, which is why they were seen.
- An addition-only free-play hole (cross on a green counter) survived the first mutation run. A rule reachable only in free play needs its own assertion.
