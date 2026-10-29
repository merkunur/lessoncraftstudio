# #152 — Read the Ruler → THE GLOW RULER (2.MD.A.1; all 11 locales)

ORDER row 152 · id `choice-board.read-ruler.2-md-a-1` (kept). Design: `designs/152-choice-board.md`. Covers worksheet G2-235 (Measure It!).

## The invention
- **A library picture lies on a glass 15-cm ruler, its left end on 0 and its right end on N.**
  - The picture's measured ink box (`art-extents.json`) is registered, never its padded square box: the G2-235 rule.
  - The key, the glue bottle and the ice pop are drawn standing, so they are turned 90° to lie flat.
- **The child slides a glow marker under the ruler to where the object ends**, by a drag, a tap on the ruler, the ±1 cm arrows or the keyboard, then presses Check.
- **Light fills the centimeter SPACES one by one from 0**, each lit space showing its count, and stops at the marker. The number on a ruler counts the spaces before it.
- **Misses:**
  - Too far: the extra spaces glow coral with nothing above them, and the hint says "Count the spaces, not the lines".
  - Too short: the unlit end of the object dims.
  - Miss 2: a dashed line drops from the end and the end tick pulses. On level 2 (only 0, 5, 10, 15 printed), the printed number below the end glows and count-on numerals appear. Below 5 the hint says to count from 0.
- **Success:** the object wiggles, a "{n} cm" tag lands on it, and the sentence "The ice pop starts at 0 and ends at 13: it is 13 cm long." appears. The object then joins today's shelf, a small chart of lengths, shortest first, with the pictures as data marks.
- **Lengths are real lengths** (the critic's rule, gated): snail 4, seashell 5/4, toy car 6, lemon 7, key 8, centipede 9/8, glue bottle 11/13, ice pop 13/11/12, kiwi 6, toy train 7, toy airplane 9.
- **The old activity's defect is gone:** its four number tiles always put the answer second-smallest.

## Deviations from the design
- **Level 2 at 9 cm is the toy airplane.** The design had the glue bottle at 9; measured, it is 60 px thick at 320 (floor 64). The lemon, the first replacement, is 242 px at 704 (cap 210). The airplane is 171 / 75 px.
- **The arrows and readout show at every width**, not only on phones.
- **Free play after a win is the marker with the light following it.** Tapping a shelf object to bring it back is left out.
- **The success tag lands ON the object** rather than above it, so it never runs into the task line.
- **No TTS on the readout.**
- **The row stays in `choice-board-activities.json`**, as for rows 98 / 148–151. Only `tool` and `task_template` change.

## Files
- `mini tools/glow-ruler-core.js` (`GlowRulerCore`).
- `glow-ruler-activity.js` (`GlowRulerActivity`, prefix `gr-`, `apparatusClasses: ['gr-art']`).
- `glow-ruler-activity.html` (with `lcs-pictures.js`).
- `ACTIVITY_WRAPPER_VERSION` 9.896 → 9.897.
- Preview seed in `generate-activity-previews.js`.

## Native + pedagogy review (one reviewer, in parallel with the gates)
4 MUST and 14 SHOULD findings; fixed at the source:
- **en (and every locale) prose:** "as on a real school ruler" was false (school rulers print every number). It now says "a ruler that prints only some of its numbers".
- **Every locale:** "glow coral under nothing" was a literal calque; rewritten to "with no object above them".
- **it:** "lumaca" is a shell-less slug; the picture has a shell, so it is now "chiocciola".
- **About lists** now include the kiwi, the toy train and the toy airplane.
- **hintDrop0:** a new hint for "count from 0" (4-cm seashell, level 2), because "count on from 0" is not counting on.
- **de:** Kleberflasche, "Zahlen im Licht", Zentimeterabstände, and no calque in "antwortet auf".
- **es:** botella de pegamento, and the NEM campo formativo.
- **pt:** tubo de cola.
- **fi:** tuhatjalkainen.
- **da:** derhen / oplyst.
- **no:** opplyst / forblir.
- **it:** the Indicazioni framing, and the truncated "dalla più corta".

## Gates
- `verify-glow-ruler-core.js`: 4,669 / 0. It has its own oracle: the gate measures every picture's ink box from the real pixels (sharp), works out the lie-flat turn and the registration itself, and checks the floors (≥ 96 px at 704, ≥ 64 at 360 and 320, ≤ 210 at 704) and the real-size ranges.
- `mutate-glow-ruler.js`: 32 / 32 killed, control passes.
- `local-test-glow-ruler.js`: 2,209 / 0.
  - Real-pixel registration, measured in the page: ink edges within 1.5 px of tick 0 and tick N for every round of both levels at 320 / 360 / 704 / 1024.
  - Real taps on the ruler, a real marker drag, the arrows and the keyboard.
  - 11 locales, five states × 320…1366.
  - The test caught a real drag bug: the drag measured against a ruler element the first repaint had replaced.
- `visual-qa-activity`: 288 / 288. The 320 win screen first put Next past the fold once the shelf held 7–8 objects; the narrow shelf is now one row.
- `audit-activity-hierarchy`: 386 / 0.
- `audit-settings-efficacy`: 2 live.
- Also passing: next-delay, content ×11, prose claims, SERP, tells, preflight.
- I read the 360 / 768 / 1024 renders myself. That caught the desktop "15" touching the glass and the marker line crossing its numeral; the marker's numeral now turns coral instead.
