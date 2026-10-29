# #163 — Tell Time to the Nearest 5 Minutes: Set the Clock → THE RUN-ON TEST (2.MD.C.7; all 11 locales)

ORDER row 163 · id `clock.tell-time-5-min.2-md-c-7` (kept). Design: `designs/163-clock.md`.

## The invention
- **The test.** A target card gives the time as digits plus the locale's own spoken phrase, copied byte for byte from the native-reviewed `learning-clock.js` tables. The child drags both hands of a clock. The hands are loose: each moves alone, and nothing reads them while they are being set.
- **Check.**
  - A readout flips up showing the time the hands make: the minutes are read off the long hand, and the hour is the last number the short hand has passed.
  - A gear slides in and the clock runs on to the next o'clock.
  - A clock set right arrives square, with the short hand on its number; the bell strikes that hour (one mark per stroke) and the number lights up.
  - A short hand put in the wrong place arrives crooked between two numbers, and there is no bell.
- **Why it matters.** A digital readout alone can never catch the classic error of 9:20 with the short hand ON the 9: the readout says 9:20, yet the clock runs on crooked.
- **What a miss shows.**
  - Miss 1, short hand wrong: the right gap (h to h+1) is shaded.
  - Miss 1, long hand wrong: a teal ring sits at the mark where the long hand belongs.
  - The hints name what is wrong (hintShort / hintLong / hintReal for "another real time" / hintBoth; o'clock variants).
  - Check again with nothing changed is a reminder, never a second miss.
  - Miss 2: the minute ring plus two dashed slots, and a help line by minutes:
    - :00 on the hour;
    - :05 "the long hand goes on the 1";
    - :10 just past;
    - :15 a quarter;
    - :20/:25 not quite halfway;
    - :30 halfway;
    - :35–:50 more than halfway;
    - :55 nearly at.
- **Settings.**
  - Times: o'clock & half / quarters / five minutes (default) / mixed, 8–10 rounds each, with an order-only reshuffle. At rest the rim bolds 2 / 4 / 12 / 12 marks.
  - Minute ring: off / on.
- **Grips.** Both are 44 px buttons; drag them or use the arrow keys (Shift+arrow moves the short hand a whole hour).

## Deviations from the design
- **No free-play "Run" toggle.** The run-on happens at every Check, and that is the whole test.
- **:20/:25 say "not quite halfway",** not "more than halfway". Found while building, and gated.
- **"Square" means arriving on the GOAL o'clock** (the number after the one the short hand passed), not on just any number. Without this rule, 1:50 with the short hand on the 1 counted as right.
- **The rest pose never lays the two hands on top of each other.** If h+6 falls under the long hand, h+5 is used instead. This was seen in the 360 render (3:15 had both hands on the 9), then gated and mutated.
- **On solved phones (< 330 px) the readout and the disabled Check are hidden,** so the success line and Next fit at 320 × 640. The target card and the bubble carry the time.
- **Metadata unchanged** (frozen). The old page prose was replaced.

## Review (one native + pedagogy reviewer, all 11 locales) — all fixed at the source
- **The verdict:** every time, hand position and next-hour pointer is correct in all 11 locales.
- **SEVERE de:** the help lines «kommt … Weg» → «geht …»; :30 «auf halbem Weg zur …».
- **SEVERE pt:** learningGoals «tão depois da hora» → «além da hora tanto quanto…».
- **Minor:**
  - en: aLong «at the {n}»; instruction «links its hands»; :05 «Count by fives to 5» → «The long hand goes on the 1» (new key helpFive ×11, gated + mutated).
  - fr: «relie ses aiguilles», prose.
  - es: ok lines «está a…/acaba de pasar», hintLong, tOH, title verb.
  - pt: instruction, hints, «visor».
  - it: learningGoals.
  - nl: «weergave», «messing tandwiel», aReadout «wijst … aan».
  - sv, da, no, fi: :20/:25 «not quite halfway».
  - sv: «gå»; no: «nesten helt fram til», «Ei klokke»; fi: «minuuttien kohdalle», «kumea ääni».
- **Kept:** the phrase digits stay byte-faithful from the reviewed learning-clock table.

## Gates
- **Logic:**
  - `verify-run-on-core.js` 189,449/0, with its own oracle. It covers:
    - every round × 36 × 12 × 144 poses graded;
    - the run-on recomputed by the gate;
    - every hint and help key per minute value;
    - the random-drag bot ≤ 1 in 300 (measured 77/28,800);
    - phrases recomposed from `learning-clock.js` ×11;
    - fr U+202F; the per-locale digits; the plan; the manifest row.
  - `mutate-run-on.js` 27/27 killed, and the control passes.
- **Browser:**
  - `local-test-run-on.js` 1,672/0 in 11 locales: real drags of both grips, the keyboard, the readout staying empty while hands are set, 9:20-on-the-9 → readout 9:20 + crooked, help, ten bell strokes, settings, plus 4 states × 8 widths.
  - visual-qa 240 renders each in en/de/fi/fr; hierarchy 242/0; settings efficacy 2 live.
- **Content gates:** prose-claims, SERP copy, content tells, preflight routes, next-delay all PASS.
- **Live (2026-10-30):** live-verify-run-on 37/0 (en/de/sv, 1366 + 390, real drags) + fi 13/0; all 11 pages 200; deploy payment canary OK.
