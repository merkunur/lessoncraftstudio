# #136 — Story Problems → THE REPLAY TRACK (2.OA.A.1 · 1.OA.A.1 · 3.OA.A.3; all 11 locales)

ORDER row 136 · id `numberbond.story-problem.2-oa-a-1` (kept). Design: `designs/136-numberbond.md`.

## The invention
The child types the number they think is missing and presses **Replay**. The story then plays itself out on a measuring track with that number put in:
- The play-head walks the story step by step, and each told number lights up as a chip in the story card while its bar grows or shrinks.
- Every number the story told is a flag the bars must land on.
- A wrong number makes a bar overshoot or fall short of its flag, and the shaded gap shows by how much. Adding the told numbers in Tom's marbles story (62) starts Tom at 62, grows him by 17, and sails far past the 45 flag.
- A second miss replays the right story backwards as ghosts and outlines the place where the number belongs. It never prints the numeral.
- On success the flags wave, and the track folds into the number bond with the equation underneath (28 + 17 = 45; × or · and ÷, : or / per locale).
- After success, replays are free play and are never judged.
- The step dots (and ← →) re-watch any step.

## Files and wiring
- **New files:**
  - `mini tools/replay-track-core.js` (`ReplayTrackCore`) holds the model:
    - Every story is a script of steps on up to three lanes (set / add / sub / rep), with the child's number as `?` and flags at told numbers or at another lane's end. A flag counts as hit only on exact equality.
    - `play`, `rewind`, `bond`, `equation`, and the keypad state.
    - `plan()`: every pass is a fresh order that never puts two rounds of one story type in a row and never three of one operation.
  - `replay-track-activity.js` draws the story card, the track (the within-20 bars are drawn as unit squares), the replay, the help and the success panel.
    - Phones: the keypad sits in one 6-column block, and on success the track folds into the bond so the equation stays in view.
    - Keyboard: digits type, ⌫ deletes, Enter replays, ← → scrub.
    - CSS prefix `rt-`, `apparatusClasses: ['rt-art']`.
  - `replay-track-activity.html` loads the core and the activity at `?v=1`.
- **Rounds:**
  - **Within 100: 14 rounds.** Rounds 1–8 are the shipped stories, byte for byte in all 11 locales. Rounds 9–14 are new, and keep add : subtract at exactly 7 : 7 against the stories that are actually live.
  - **Within 20, with pictures: 10 rounds.**
  - **Two steps: 8 rounds,** each with a grey flag at its middle.
  - **Equal groups: 10 rounds** (5 multiply, 3 share, 2 make groups).
  - All 34 new stories were written by hand in all 11 locales.
- **Manifest:** the row stays in `number-bond-activities.json`. Its id, slug, title and intro are frozen in all 11 locales. `tool` → `replay-track-activity`; `params` = `{story: [w20, w100, two, groups], flags: [first, replay], rounds}`. The other rows are untouched (gated).
- **Route:** `ACTIVITY_WRAPPER_VERSION` 9.880 → 9.881.
- **Prose ×11:** all replaced. Each quotes the marbles round the activity really shows (62 overshoots; 28 + 17 = 45).
- **Deviations from the design:**
  - **The shipped stories are not the ones in the design's table.** Rounds 4, 7 and 8 as shipped are the sheep start-unknown, Mia/Leo "how many more" and Ben/Ana "23 more". The new rounds 9–14 were chosen against the shipped stories, so the bots still sit at exactly 7/14.
  - The row stays in the shared manifest instead of its own file (the #133/#135 precedent).
  - Each told number's chip lights during the replay instead of the whole sentence, because sentence boundaries differ by locale.
  - The two-step ruler runs 0–60 (all values ≤ 50), not 0–100.
  - Story pictures: bus for the bus stories, bicycle for the bikes, chair for the chairs. The stamp picture is left out because it prints a numeral, and so is the Easter egg because it is decorated.

## Native + pedagogy review (one reviewer, all 11 locales)
Every finding was fixed at the source:
- **Playing cards:** es "tarjetas" → "cartas" and nl "kaartjes" → "kaarten" in the three card stories, so the word matches the playing-card picture and the dealing.
- **Wording:**
  - es: the frogs now "llegan saltando" onto the log.
  - pt: the comparison stories say "São 12 a mais / 9 a menos", and the take-away stories say "ela ainda tem".
  - it: "Guarda dove qualcosa non torna"; "annulla" for undo.
  - fr: "quand l'histoire est rejouée".
- **Bar word:** sv "stapel" → "remsa" and no "søyle" → "strimmel" (those words name a vertical chart column; the bar model is remsa / strimmel).
- **Division sign:** sv uses "/", not ":".
- **Checked clean everywhere:** numbers in English order, one right answer per story, the more/fewer traps and their direction, sharing vs. making groups, no answer tells, and the shipped stories.

## Gates
- **`verify-replay-track-core.js`: 15,870 checks, 0 fail.** It checks:
  - its own answer table and its own script runner: exactly one number in 0…200 lands every flag, and it is the table's, while one more and one less each miss;
  - the told numbers read off every locale's text, in order;
  - the shipped stories byte for byte from git;
  - the bots at or below chance (add the told numbers 7/14 and 5/10; keyword 7/14 and 4/10; two steps add-all 0/8; groups multiply 5/10 and divide 5/10), and every bot's number is judged a miss;
  - no 0, no answer that is a told number, every value inside its ruler;
  - the equations true per locale with the school's signs, and the bonds adding up;
  - the model (empty, miss, miss 2 help, a digit takes it away, success, free play);
  - the plan rules over 1,500 passes, the pictures on disk and in colour;
  - strings ×11, prose and the manifest.
- **`mutate-replay-track.js`:** 21/21 killed; the control passes. The first run caught a gap: grading by "add all the told numbers" survived, so the gate now replays every bot's number.
- **`local-test-replay-track.js`:** real pointer, 11 locales. At 1024: the empty replay, the keypad and ⌫, the told numbers added (62) overshooting the 45 flag, miss 2 with the outlined place and no numeral, a digit taking the help away, scrubbing, 28 → bond + 28 + 17 = 45 + Next 0.5 s, free play unjudged, the track only on replay (a blank ruler), sharing vs making groups. Then all 42 rounds at rest, miss 2 and solved through 320…1366: 12,241 pass with 2 cells 2 px over at 320 (the three-lane two-step story); the phone lane gap was tightened and the 320 sweep rerun over every setting: 2,541 pass, 0 fail.
- **`visual-qa-activity`:** 336 renders pass. The first runs caught the keypad below the fold after a miss at 320 × 640 and the solved panel pushing the keypad down at desktop; the track now folds into the bond on success, phones scrub by dragging the track (no step-dot row), the task line is one sentence and the picture floats in the phone story card. Phase driver `visual-qa-phases/numberbond.story-problem.2-oa-a-1.js`.
- **`audit-activity-hierarchy`:** 242 / 0. It caught the undeclared track drawing and a `role="img"` on the bond and the flags (the flag labels now sit on the track box).
- **`audit-settings-efficacy`:** both live. It caught "flags" changing nothing on rounds whose only flag is the story's end; per the design's §8, "only on replay" now keeps the ruler blank (no numerals, no flags) until Replay, and the setting is called Track.
- **Other gates:** `audit-activity-next-delay` passes. Content ×11, prose claims, SERP copy, content tells and route preflight all pass.
- **0 lines** in shared cores or `lcs-shell`.
