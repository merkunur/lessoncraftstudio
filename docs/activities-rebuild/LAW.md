# The activity law — every activity is an instrument (2026-10-15)

Operator rulings this file serves, verbatim:

- *"The activities are very raw and even useless because they are not child friendly top quality designs. They are very generic and boring for the child … the size and proportion of the elements … Sometimes the main elements of the activities are smaller than secondary stuff. The illustrations are terrible. Although you have the opportunity to use the image library images you have drawn disgusting images … You should take the tools as reference point."*
- *"Take the quality of the following as reference point: Number Talk Easel, Learning Clock, Place Value Lab, Pattern Bench."*
- *"There is no quick fix. All activities should be transformed into top quality, child friendly, creative, innovative tools … treating each activity as an individual masterpiece of educational content. You should go one by one."*
- *"There are a lot of free activities online. In order to be able to justify the paid subscription, each of the activities should be designed as top quality, child friendly, pedagogically smart, creative, innovative activities. The kids should enjoy them and the teachers and parents should trust them."*

## The four questions (asked before any gate, answered in the design sheet)

1. **Would a 5–8-year-old choose it again?** A physical thing to move; motion that answers the hand within 100 ms; a small, earned delight on success; never a quiz with a Check button.
2. **Would a teacher put it on the board?** The mechanic IS the skill (the invention enacts the concept); the material pushes back on the misconception the standard names; the hints teach, never scold; no timer, score, streak or lives; one right answer per round; answer position measured.
3. **Would a parent trust it?** Calm; library pictures only; nothing drawn by hand; no words on the apparatus; legible with the sound off; works on a phone; nothing is sold inside the play.
4. **Is it creative?** It has a NAMED invention a teacher could describe in one sentence — the easel's curtain, the clock's geared hands, the bench's bead-that-is-a-handle. Free play (explore) exists beside the task.

## The ten rules (measured where a number is named)

1. **The apparatus is the hero.** At 704 px (the live iframe width on every desktop) the stage content fills ≥ the floor measured from the four reference tools (`scripts/audit-activity-hierarchy.js` header). No empty band below the content.
2. **One task line, small.** ≤ 24 px, ≤ 2 lines, above the apparatus; speaker 36 px inline. Feedback is a bubble under/beside the apparatus; the task line never changes colour or wording.
3. **Header like a tool.** Title left; progress chip + controls right (the shell does this).
4. **Pictures only from the library** (`/image-library-webp/themes/<dir>/<noun>@2x.webp` through `mini tools/lcs-pictures.js`), ≥ 96 px short side at 704 and ≥ 64 px at 360, labelled from `image-vocabulary.js` in the page locale, colour themes only, refusals honoured. Countable objects are identical instances.
5. **No hand-drawn characters or objects.** Inline SVG only for apparatus geometry (frames, dials, grids, rails, tags, blocks) in the shell palette, 2–3 px ink outlines.
6. **Every engine names its invention** in the design sheet and in the file header.
7. **Side-by-side at ≥ 700 px** when there is a readout/bubble column (`layout:'split'`); stacked below.
8. **Legible with the sound off; no words on the apparatus** except letters/numerals that are the content. TTS is a bonus (reliable in 5 of 11 locales).
9. **≥ 7 rounds + order-only reshuffle**; one right answer; the answer position is measured for guessability.
10. **The four reference renders are the taste bar** — `docs/audit-results/{number-talk-easel,learning-clock,place-value-lab,pattern-bench}/qa/`.

## The recipe per activity (one per session)

design sheet `docs/activities-rebuild/NNN-<key>.md` → own wrapper `mini tools/<key>-activity.js` + own core `<key>-core.js` + html + manifest row (0 lines to shared cores and `lcs-shell.*`) → `verify-<key>-core.js` (own oracle, poisoned) → `mutate-<key>.js` every mutation killed → `local-test-<key>.js` (real pointer, widths 320·360·412·704·768·1024·1366, every round) → `smoke-<key>-locales` ×11 → `visual-qa-activity.js` + `audit-activity-hierarchy.js` → one reviewer agent (native ×11 + pedagogy) over the compact string dump + round data → personal Read of 360 / 704 / 1024 → preview webp → `preflight-activity-routes.js` → commit. Deploys batch after the operator has seen the renders.

## New activities (the worksheet→activity coverage plan, 2026-10-17)

The same law governs the 111 NEW instruments that close the gap between what the worksheets teach and what the activities teach: `new/NEW-ORDER.md` (after ORDER.md row 204), one design sheet per row in `new/`, the recipe `new/NEW-RECIPE.md`, the scaffold `node scripts/new-activity.js --num=<#>`, the coverage gate `node scripts/audit-activity-coverage.js`, art and rulings the operator owns in `new/ART-NEEDS.md`. Non-Common-Core rows (science, health, social studies, SEL, readiness skills) use `alignment.framework` from `frontend/lib/frameworks.ts`.
