# #167 — Read a Line Plot → THE TIDE YOU PUSH (2.MD.D.9; all 11 locales)

ORDER row 167 · id `line-plot.read.2-md-d-9` (kept). Design: `designs/167-line-plot.md`.

## The invention
- **Water you push over a line plot.** Shelly's tide-line is a sandy beach with its numbers, the X's stacked above them. Two wave handles push the sea in from the left and right; a buoy raises the sea level row by row. The child answers each question by drowning every shell that does not count, so only the ones the question is about stay dry. Then the child answers on a pebble.
- **The tide is part of the answer.** "Longer than 4" with the 5s under water is a miss even when the number is right. The question kinds are: at a length, longer, shorter, the most common length (raise the sea until one stack sticks out), longest minus shortest (both shores touching the first and last shell; footprints count the steps on the dry sand), and how many more.
- **X's under water stay visible** (blue, slightly faded): nothing is hidden, only marked.
- **Measuring with a real shell.** In measuring rounds a library seashell rides in on a board with a ruler, and not always at 0. The child slides it to the brass stop, reads where its edge ends, and carries it down to the tide-line, where it becomes an X. It is drawn true to its length: its measured ink box, not its image box.
- **Miss 1** names what is wrong:
  - the sea: which shells are still wet or dry;
  - the answer: the dry X's number themselves;
  - a measurement: "slide it to 0 first", or "read the edge".
- **Miss 2** sets the sea right and rings the answer. In measuring rounds the shell slides to 0 and a teal guide runs from its edge to its length.
- **Settings:**
  - Level: Reading the tide-line (default) · Measure and plot · Half centimetres (a beach marked in halves; success lines add «4½ cm = 4,5 cm» where the locale writes a decimal comma).
  - Footprints: on / off.

## Deviations from the design
- **Board above the beach** in measuring rounds (the design put them side by side). It is stacked at every width, so the carry runs downward and the shell's drawn length never shrinks to make room.
- **Answers are always on pebbles.** The design had the most common length tapped on the sand. Seven to nine columns cannot be 44 px wide on a phone (measured: 25 px at 320). The mode is answered on length pebbles that carry the unit ("6 cm"), so a count never looks like an option, and the chosen length still lights its column. qMode, helpMode and how-to-play now say "pebble".
- **Columns are drop targets, not buttons.** A shell is carried by drag. The keyboard path is Enter or Space on the shell, which drops it where its edge reads. A wrong (unzeroed) Enter drop gives the same miss as a wrong carry.
- **Only a sideways step slides the shell.** A drag step that goes more down than across lifts it, so carrying it to the beach never changes where it was read. A diagonal carry once moved a shell 10 → 21 mm on the way.
- **An X the child dropped is itself a drop target**, so a second shell of the same length can land on a column that already holds one.
- **Wave handles ride on their own water**, never over the dry gap. When the shores close on one column they no longer overlap each other or the top shell. Reading rounds keep two empty rows of sky so a handle at the top never covers a stack.
- **No free play** (Next 0.5 s after success, as in rows 164–166).
- **da/no/fi** metadata created at build (slugs `laes-et-prikdiagram-skaller-2-klasse`, `les-et-prikkdiagram-skjell-2-trinn`, `lue-pistekaaviota-simpukat-2-luokka`). The strand override for line-plot gained da/no/fi. Other locales' metadata is frozen. The row stays in `line-plot-activities.json` (tool `tide-plot-activity`, old params dropped).

## Review (one native + pedagogy reviewer, all 11 locales) — all fixed at the source
- **SEVERE:**
  - okMode said "most shells are 6 cm" while the mode is never a majority (3 of 7). It now says "6 cm is the most common length" in all 11 locales.
  - hintCountSteps named footprints the setting can switch off; it now says "count the steps on the dry sand".
  - de qMore was ungrammatical ("sind mehr … lang").
  - fi "Puolet senttimetrit" → "Puolikkaat senttimetrit" (label and prose).
- **MINOR:**
  - en okMore / okMore1 → "There are … more shells that are …".
  - sv/da/no okMore word order → "Det finns / Der er / Det er … på {a} cm".
  - pt qRange and qMore.
  - fr tideRange subject ("jusqu'à ce qu'ils touchent").
  - it "lei" for a thing (two strings).
  - es "Suelta".
  - nl "uitzetten".
  - fi howToPlay step 2 and practices.
  - The prose's second-miss sentence now reads "numbers what to count and rings the answer" (range rounds number the footprints, not the shells).
- **Checked fine:** gender and agreement; fi case after numerals; the Check labels equal the shell's in every locale; da "skaller" / "prikdiagram".

## Gates
- `verify-tide-plot-core.js` 2,758/0. Ground truth is parsed from the design's §6 tables. Coverage:
  - every tide state; Check incl. tide-before-answer;
  - measuring offsets (0/1/2 = 5/6/5, zeroing in 11 of 16);
  - the ink box; the plan; strings ×11; the row.
- `mutate-tide-plot.js` 23/23 killed, control passes.
- `local-test-tide-plot.js` 4,400/0 in 11 locales. Covered by real drags, taps and keys:
  - waves, buoy, pebbles and length pebbles;
  - the shell slid and carried; Enter-drops;
  - a steep diagonal carry that must not slide (poisoned against the old slide);
  - a second shell carried onto an X;
  - handles clear of dry X's (poisoned against the old placement).
  
  Then 9 states × 8 widths with Check above the fold at rest.
- visual-qa 240 renders × 11 locales; hierarchy 1,214/0 (the painted sky is now its own layer, so the gate measures the drawn beach); settings efficacy 2 live; prose-claims, SERP copy, content tells, preflight routes, next-delay all PASS.
