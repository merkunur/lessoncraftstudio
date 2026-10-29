# #153 — Tildy's Tailor Shop → THE CM CUTTER AND THE PIECE JAR (2.MD.A.1; all 11 locales)

ORDER row 153 · id `tildy.measure-ruler.2-md-a-1` (kept). Design: `designs/153-tildy.md`. Covers worksheet G2-235 (Measure It!): the part #152 does not, i.e. putting the 0 at the start yourself, broken rulers, and a ruler long enough.

## The invention
- **A fabric strip lies on Tildy's cutting table**, and the cat (library picture) has just bumped the ruler off its place. The child drags the ruler until its 0 meets the strip's start, then taps the numeral at the strip's end.
- **On Check, Tildy's cutter rides the ruler from its 0 and snips at every centimeter.** The pieces drop into the jar, and whatever the ruler missed stays on the table:
  - the 0 inside the strip leaves a stub before it;
  - the 0 before the strip means the first snips cut air (puffs);
  - a ruler too short leaves a tail.
- **Nothing signals "close" before Check** (the old tildy-core's rule, now gated three ways):
  - the state has no aligned or distance field;
  - the drawing never compares the 0 with the strip;
  - the DOM drawn at the right spot and 1 cm off has the same parts.
- **Tricky rulers:**
  - broken rulers that start at 1, 2 or 3, where the child stitches each centimeter space; the cutter cuts only the stitched spaces, so the jar never shows the true length for free;
  - two of Tildy's mistakes to find (her 0 at 1; her 9-cm ruler on a 10-cm strip);
  - a shelf of three rulers with exactly one long enough, shuffled per pass; the long-enough one sits in each position 20–47 % of the time.
- **Success:** the jar shows the pieces, Tildy's picture shakes, and the strip hangs on Tildy's rail with its length.

## Deviations from the design
- **The row stays in `tildy-activities.json`**; only `tool` and `task_template` change. The old `tildy-core.js` / `tildy-activity.js` stay on disk, unused.
- **Strips are drawn bands** (ribbon, leather, yarn, cord, denim, felt, lace, braid, elastic). "Wide ribbon" became "denim strip".
- **Simplified, as recorded:**
  - the pieces stay cut in place rather than flying out and stitching back;
  - the reading tag cannot be dragged (tap another numeral instead);
  - no TTS on Tildy or the jar.
- **The ruler's "only 0, 5, 10 …" setting** is labelled without the 15 (a 12-cm ruler never shows one).
- **The rulers have a blank margin before 0 and after their end**, as real rulers do.
- **sv / da / no / fi pages are NEW** (slug, title, intro written in this build, native-reviewed). The tailor is named Tilda / Tilde / Tilde / Tiina. The frozen metadata of the other seven locales is untouched.

## Native + pedagogy review (one reviewer)
Fixed at the source:
- **tFix in all 11:** "Fix her ruler" told the child to do the wrong thing in the 9-cm round. It now says "Find her mistake and measure again".
- **sv / da / no / fi intros:** "something left on the table → the 0 was wrong" was false for a short ruler's tail; the intros now name the stub before the 0.
- **nl:** "het reepje spijkerstof" (an open-compound spelling error), "kantlint", "afgemeten", and "hokjes" for the spaces so they differ from the jar's "stukjes".
- **fi:** the aria-label grammar, "lopussa olevaa lukua", and the strip list in the nominative.
- **The real tool name:** de Rollschneider, fr roulette de coupe, nl rolmesje, sv rullkniv, da/no rullekniv; the knife "skär" (sv).
- **es-MX:** "lo suficientemente larga".
- **it:** ripiano (not rastrelliera), "prima dello 0".
- **sv:** "även med en trasig linjal".
- **fr:** "sans son".
- **en:** the instruction, and "shelf" vs "rail" so "rack" no longer means two things.

## Gates
- `verify-cm-cutter-core.js`: 8,851 / 0. The gate keeps its own oracle:
  - its own tables, its own cutter, and its own verdict over every placement × reading;
  - the bots: read without fixing 0/9, push to the table edge 0/9, start at the 1 0/9, count to the end number on a broken ruler 0/3; take the longest ruler 4/4 (recorded as correct);
  - the no-lamp checks.
- `mutate-cm-cutter.js`: 31 / 31 killed, control passes. The first survivor was "the same order every pass", now caught by the replayed-stream check.
- `local-test-cm-cutter.js`: 2,475 / 0, 11 locales. Real numeral taps, real ruler drags, real stitch taps, the shelf, the keyboard, the no-lamp DOM check, and six states × 320…1366.
- `visual-qa-activity`: 324 / 324.
- `audit-activity-hierarchy`: 380 / 0.
- `audit-settings-efficacy`: 2 live.
- Also passing: content ×11 (including the new sv / da / no / fi pages), prose claims, SERP, tells, preflight, next-delay.
- I read the 360 / 768 / 1024 renders myself.
