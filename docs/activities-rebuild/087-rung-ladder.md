# #87 — Addition & Subtraction Pairs → THE RUNG LADDER (1.OA.D.7, all 11 locales)

ORDER row 87 · id `match-pairs.addition-and-subtraction-pairs.1-oa-d-7` (kept). Design: `designs/087-match-pairs.md`.

## Files and wiring
- **New files:**
  - `mini tools/rung-ladder-core.js`: 18 "Same answer" card sets and 10 "Undo it" fact families; rails, climb, select / go / cancel / unfold, the misses, the tags.
  - `rung-ladder-activity.js`
  - `rung-ladder-activity.html`, which loads `lcs-pictures.js` for the squirrel and the acorn.
  - CSS prefix `rl-`.
- **Pictures:** `forest creatures/squirrel` and `miscellaneous/acorn`. Both are colour library pictures and were opened before use. The acorn is 96 px wide and 64 px on a phone (hierarchy law).
- **Manifest:**
  - The row stays in `match-pairs-activities.json`. Only this row changed: `tool` is repointed and `params` mirrors the core.
  - The metadata of all 11 locales was already authored and is frozen (sha1 `08e843d2…`, checked).
  - The other five rows were checked unchanged, and the commutative and fluency gates still pass.
- **Route:** `ACTIVITY_WRAPPER_VERSION` 9.828.
- **Legacy gates:** none to step aside. `local-test-match-pairs.js` and the commutative/fluency gates drive the other rows only.
- **Sources:** scratchpad `rl-manifest.js`, `rl-prose.json`, `rl-dump.md` (the reviewer's text), `rl-fix1.js`, `rl-fr.js`, `rl-probe.js`.

## The invention
**Every card is one rail of a ladder, and the squirrel lays a rung at every height where both rails have a hole. Equal rails give the gold cap rung and the acorn: the ladder IS the equals sign.**
- **Building the rails.** An addition is two short rails clicked end to end: 2 + 3 is 2 holes, then 3. A subtraction is a tall rail with its top sawn off: 9 − 4 shows 9 holes and the top 4 fall away.
- **Climbing.** The child taps an addition and a subtraction, then taps the squirrel to climb.
- **The tag.** A climbed ladder folds into a tag on the rack, `2 + 3 = 9 − 4`: expressions on both sides of the equals sign, shown to be equal. Tapping a tag takes the ladder apart.
- **Undo it.** The four cards of one fact family all make rails w holes tall, so height cannot decide. Each rail changes colour at its seam: a + b after a holes, w − b after w − b. The squirrel climbs only while the colours agree, so 3 + 5 goes with 8 − 5. The tag reads `3 + 5 = 8 · 8 − 5 = 3`.
- **Miss 1.**
  - Same answer: the extra holes on the taller rail glow and are numbered.
  - Undo it: the band where the colours disagree is ringed on both rails, with no numerals.
- **Miss 2.** Little rails appear on every card; the hint is hLook or hSeam.
- **Not misses:** two cards of the same kind (hKind), and tapping a lifted card again.

## Rulings this build made
- **The design's guessing claims, measured and redefined honestly:**
  - **"The same first number"** (the addition's first number on a subtraction card in the same place) finds the partner 0 of 41 times. The gate's limit is 20 %.
  - **The neighbouring rule** "the subtraction takes away the addition's first number" (9 − 2 with 2 + …) is right 12 of the 20 times it applies. The design's ≤ 20 % claim does not hold for it, so it is recorded as a ratchet (≤ 12/20, may only shrink), not hidden.
  - **"Biggest with biggest"** (by first number) fails in at least 6 of 18 rounds, as the design asks.
- **Reviewer fixes, applied at the source:**
  - **P1:** the hint for a stopped ladder in Undo it is not "glowing holes". The how-to now says so in every locale ("the ringed holes").
  - **P2:** the "second stop shows little rails on the cards" sentence moved into the general paragraph. The rails also show at miss 2 in Undo it, where they carry the colour seams.
  - **P3:** the en prose says only Same answer is the 1.OA.D.7 alignment; Undo it practises the link between addition and subtraction.
  - **P4:** hColour said "try the other subtraction". With only two subtractions on an Undo board, that named the answer. It is now a question: "The colours don't match — where does each colour end?"
  - **P5/P6:** hLook says "the little sides on the cards" (hints never say "rails"), and the about text says "the extra holes on the taller side".
  - **P8:** setting names quoted mid-sentence are now in each locale's quotation marks.
  - **Locale wording:**
    - nl title *sportenladder* (gym wall bars) → *klimladder*; es/pt titles drop the redundant "de peldaños/degraus";
    - fi *puoli* (also "half", next to *puola*, rung) → *sivu* throughout;
    - it/fr: *montant(e)* → the UI's *lato/côté*; "disfa/défait" → "operazione/opération inversa";
    - de Rechenhaus → Aufgabenfamilie; nl rekenhuisje → sommenfamilie; pt "família de fatos" → "de operações", "empaca" → "fica preso";
    - da countable "flere"; sv *pinne* for the rung and *stället* for the rack; it *appendiabiti*;
    - agreement fixes in de/nl/es/it/fi.
- **UI fixes found while probing:**
  - a stopped ladder and its help now stay until the next card tap;
  - the sawn-off top no longer reappears after the climb;
  - the Undo it help rings the right holes.
- **A stuck squirrel waits beside the ladder.** Centred over the rails, it covered the very holes the help rings, which on a phone is the whole Undo it hint. Found by reading the 360 render; the sweep now asserts the squirrel never covers a glowing or ringed hole (poison: the old placement fails 56×).
- **The rack is not a live region.** The note and `api.announce` already say every line, so announcing the rack as well was a duplicate. (The visual-qa SCALE gate had been reading the rack as the feedback region.)

## Gates
| Gate | Result |
|---|---|
| verify-rung-ladder-core (own oracle: every card set has exactly one partner per card, within 20; every family's partners; EVERY addition × subtraction climb (done iff equal values / seams, rungs, gap, the longer side); rails and seams; selection, misses, help cleared by the next tap, complete only with every card, locked when done, unfold; the guessers; the plan never replays the order it was handed; the pictures) | 5,078 / 0 |
| mutate-rung-ladder | 17 / 17 killed, control survives |
| local-test-rung-ladder (11 locales; real taps on cards, the squirrel and the rack tags, Enter; every round of both levels at rest, waiting, at miss 2 and solved — each state reached ONCE per locale by real taps, then resized through 320–1366 and measured at every width, the state asserted unchanged by the resize) | 45,551 / 0 (21 min; was ~2 h replaying taps per width) |
| visual-qa | 108 renders green |
| hierarchy | 332 / 0 |
| settings-efficacy | 2 live |
| preflight, prose-claims, serp-copy | green |
| variety (production, en) | 18 distinct, pass 2 reshuffled |
| live-verify-rung-ladder (11 pages 200; en/de/sv/fi × 1366/390, real pointer: 2 + 3 with 9 − 2 stops (hMore 2), both ladders climb, the tag, okAll) | 67 / 0 (the first two runs, inside the Cloudflare window, failed the embeds) |

## Open (page metadata — for the operator)
- **All 11 locales:** the intro says "every round has two answers to find". 5 of the 18 Same answer rounds have three pairs. Undo it rounds are one family with two ladders.
- **All 11 locales:** "tap one card, then its match, and watch the pair link" still describes the taps. The squirrel's climb is not mentioned.
- None of these were changed, because they are frozen metadata.
