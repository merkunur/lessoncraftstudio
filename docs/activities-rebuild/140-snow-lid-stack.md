# #140 — Squirrel's Fair Winter Piles → THE SNOW-LID STACK (2.OA.C.4; G2-216/217 in Levels 2–3; all 11 locales)

ORDER row 140 · id `winter-piles.draw-partition.2-oa-c-4` (kept). Design: `designs/140-winter-piles.md`.

## The invention
- **Stacking tests fairness.** Twigs cut the acorn tray between rows into piles. A tap on the tree stump stacks the piles one on top of another, and the snow lays one flat lid only on a fair stack.
- **An unfair stack fails visibly.** A bigger pile's extra acorns stick out of the stack in coral, the lid slides off into a little snow heap, and on a miss each layer's size is printed beside it.
- **Level 1 — fair piles.**
  - The nine kept round ids, re-specified so that each has exactly one right cut.
  - The child types how many acorns are in each pile.
  - The match rounds name the total and how many equal piles are wanted ("Cut the rows to make ▢ + ▢ + ▢ = 18"), never the pile size.
- **Level 2 — how many holes (G2-217, grouping).** Each hole holds k. A mould of k dents sits on the stump; a pile that does not fit shows dashed empty dents and coral extras. The child types how many holes.
- **Level 3 — share the heap (G2-216, sharing).** A loose, seeded, scattered heap is shared one acorn at a time into n holes (tap to add, hold to take one back). The child types how many each hole gets. A fair share with acorns still in the heap is not finished.
- **Misses and help.**
  - Miss 2 on a cut shows a dotted twig in every right gap.
  - Miss 2 on unequal holes puts every acorn back and deals one into each hole, so the child continues "one for each hole".
  - A wrong number lights the top layer; on miss 2 its acorns are numbered (Level 2: the layers are ticked).
- **The winter hollow.** Every finished stack goes into the trunk's hollow, as a drawn acorn counter.
- **Pictures.** Acorns everywhere are drawn counters. The library acorn (`miscellaneous/acorn`) is their full-size label, and the library squirrel (`forest creatures/squirrel`) sits by the stump. This follows the array ruling: no library picture is ever used as an array cell.

## Files and wiring
- **New files:**
  - `mini tools/snow-stack-core.js` (`SnowStackCore`) holds the model:
    - the three tables;
    - piles from twigs or holes, `isFair`, toggleCut / deal / undeal / stack (a test, never a commitment: any change slides the stack off);
    - one-digit typing, 1–9 only;
    - `check()` with literal hint keys;
    - `plan()`: a fresh order every pass.
  - `mini tools/snow-stack-activity.js` (`SnowStackActivity`, prefix `ws-`, `apparatusClasses: ['ws-art']`) draws the board, tray, gaps, twigs, heap, stump, stack, lid, holes, equation strip and keys.
    - Phones: Check is the ✓ key.
    - Narrowest band: tighter tray rows, and the squirrel sits against the trunk.
- **Rewritten:** `winter-piles-activity.html`, which loads the new core and activity.
  - The old `winter-piles-activity.js` and `draw-partition-core.js` stay on disk, unused.
- **Manifest:** `winter-piles-activities.json`.
  - id, alignment and the en..nl slug / title / intro are frozen.
  - sv/da/no/fi get a new slug, title and intro, so the row now ships in 11 locales.
  - params = `{level: [1, 2, 3], eq: [shown, hidden], rounds}`.
- **Route:** `ACTIVITY_WRAPPER_VERSION` 9.884 → 9.885.
- **Prose ×11:** all written; each quotes 4 + 4 + 4 = 12 and 6 + 6 = 12, both real Level 1 rounds.
- **Deviations from the design:**
  - The free-play "Snow yard" level is left out.
  - The squeeze/stack is a tap on the stump.
  - The match prompt shows "▢ + ▢ + ▢ = 18" instead of "6 + 6 + 6" (the reviewer's ruling, below).
  - L2 round 3 is 5 × 4 in holes of 4 (answer 5) instead of 4 × 4 in holes of 4. The prompt "holds 4" plus the answer 4 was a tell.
  - L3 round 5 is 16 into 2 instead of 16 into 4, for the same reason.
  - Before any twig, Level 1's equation strip reads "▢ + … = 12", so the equation setting changes the board at rest.

## Native + pedagogy review (one reviewer, all 11 locales)
Every finding was fixed at the source:
- **A pedagogical tell:** the match rounds printed "Cut the rows to make 6 + 6 + 6." and then asked how many were in each pile. Now the prompt shows ▢ + ▢ + ▢ = 18. A new gate asserts, in every locale and every round, that the task line never shows the typed answer. That gate then found the two round tells above.
- **unfairDeal "make every hole match" (en and every copy):** now "Give every hole the same number", because the old line read as "make the holes alike" (de, it, nl, sv, da, no, fi).
- **Prose:** "the oldest way to compare piles" (an unprovable claim) is now "a direct way", in all 11 locales.
- **de:** heapLeft "Bis jetzt gleich viele!", okHoles "füllen", "einer bestimmten Größe".
- **fr:** "peut contenir" (not "contient"), "remplissent", "chaque cachette en a autant", "alignés en rangées", "Seuls les tas".
- **es / pt:** "la misma cantidad de bellotas" / "de bolotas".
- **it:** "della stessa grandezza".
- **nl:** "dienblad"; "Leg in elk holletje evenveel".
- **sv:** "Lika många hittills!", "syns det", "rektangulärt mönster".
- **da:** "Lige mange", "jævn stabel", "Fortsæt rundt", "tal og algebra", and "gruppering og ligelig deling" instead of the clumsy "at at gruppere".
- **no:** "Like mange så langt!".
- **fi:** "yhtä suuret" (not "samanlaiset"); "Kokeile laittaa oksa pisteviivan kohdalle"; "yhtä suurten kasojen pino".

## Gates
- **`verify-snow-stack-core.js`: 11,941 checks, 0 fail.** It checks:
  - The nine shipped round ids, read from git, kept in order.
  - My own enumerator over all 2^(rows−1) cut sets of every tray round: exactly one is fair and meets the target, and it is the core's. Fix presets are never already right.
  - The design's three fixed-strategy bots pass exactly 3/9 and 3/8, 4/9 and 2/8, 4/9 and 3/8.
  - Level 3: of every full share, only total ÷ n each is fair. Every one-acorn move breaks it. The heap is seeded and scattered.
  - Every verdict and its literal hint key at all three levels.
  - The task line never shows the typed answer, in any locale or any round.
  - The plan over 1,500 passes; both pictures on disk and in colour.
  - Strings ×11:
    - no digit in a hint or task template;
    - the placeholders;
    - never "free";
    - fr / it typography and es ¡¿;
    - the success lines true, including a numeral-order check;
    - never a 0.
  - Prose; the manifest (frozen fields; the four new locales).
- **`mutate-snow-stack.js`:** 29/29 killed; the control passes. The first run left two mutants alive, a single pile counting as fair and a success line with swapped numbers. Both gaps in the gate are closed.
- **`local-test-snow-stack.js`: 7,480 pass, 0 fail** (real pointer, 11 locales). It covers:
  - Level 1: twigs by tap; the stump stacks 4 on 8 (the lid slides, the extra row coral); miss 1 shows the sizes, miss 2 a dotted twig; flat lid, ▢ + ▢ + ▢ = 12; then a wrong number (the top layer lights) and 4, with Next 0.5 s later.
  - The fix round.
  - Level 2: the mould, a wrong cut that does not fit, then 2 holes; the equation hidden.
  - Level 3: one each with acorns left; miss 2, one acorn back in every hole; a held press; shared 4 / 4 / 4.
  - Every round at rest, at a miss and solved through 320…1366, including every drawn numeral inside its drawing, never a 0, and the pictures at full size.
  - The run caught Italian's long strip squeezing the answer box and the Spanish Level 3 keys under the 320 fold. Both are fixed.
- **`visual-qa-activity`:** 216 renders pass. The first run failed 23 times at 320 × 640 after a miss; fixed with a tighter tray on the narrowest band, the squirrel seated against the trunk, and a capped stack size.
- **`audit-activity-hierarchy`:** 326 / 0; the apparatus share is 0.80 at 704.
- **`audit-settings-efficacy`:** level and equation are both live at rest.
- **Other gates:** `audit-activity-next-delay` passes. Content ×11, prose claims, SERP, content tells and route preflight all pass.
- **My own reading of the renders** (360 / 768 / 1024) found what no gate had: the raw {eq}/{n} placeholders (a formatter bug), a stack too small to be the hero, invisible twigs, lower-layer sizes hidden under the upper slab, and a preview seed that never ran (the global is SnowStackActivity, not the tool-name guess). All fixed.
- **0 lines** in shared cores or `lcs-shell`.

## Live
`live-verify-snow-stack.js` ran on production on 2026-10-27: **68 pass, 0 fail.**
- All 11 pages return 200, including the four new sv/da/no/fi pages.
- en, de, sv and fi, at 1366 and at 390, embed winter-piles-activity.html at wrapper 9.885.
- With a real pointer, on 3 rows of 4:
  - one twig plus a tap on the stump: the lid slides;
  - Check gives the miss line;
  - the second twig: the lid lies flat;
  - 4 gives "Fair piles! 4 + 4 + 4 = 12." (in each locale's own words).
- The iframe grows with the card.

The first run, just after the deploy, found no iframe. The page itself served 9.885 (curl), and a probe a minute later saw it, so the run had hit the page while it was still warming up. The rerun was clean.
