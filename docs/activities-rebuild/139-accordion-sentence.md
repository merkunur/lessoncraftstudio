# #139 — Equal Groups → THE ACCORDION SENTENCE (2.OA.C.4; Level 3 3.OA.A.1 / 3.OA.C.7; all 11 locales)

ORDER row 139 · id `array.equal-groups.2-oa-c-4` (kept). Design: `designs/139-array.md`.

## The invention
- **The adding sentence is a paper accordion.**
  - Under the bead trays there is one pleat per group, each pleat as tall as its group (24 + 8 × beads).
  - The squeeze handle folds the strip flat **only** when every pleat is the same height. 4 + 4 + 4 becomes one face of 4 with three coloured edges stacked behind it: the face shows how many are in each group, the edges show how many groups.
  - An unequal strip springs back open, and the odd pleat stands out (coral, taller, or dashed and short). Equal groups are not a rule the child is told; the paper will not fold without them.
- **Level 1 — the 8 shipped rounds, kept verbatim:**
  - Fill empty trays to "Make 3 groups of 4."
  - A tap adds a bead; a held press takes one out.
  - Type how many in all.
  - With running totals shown, the creases carry the running totals.
- **Level 2 — easy groups of 2, 5 and 10:**
  - The trays arrive filled. Two fix rounds have one tray off by one, and that tray moves one place each pass.
  - The child types the running total in a window on each crease, then the total.
  - The task line on fix rounds names no number, so the majority alone tells the child what is right.
- **Level 3 — tricky groups and arrays up to 6 rows of 8:**
  - The child writes the times sentence `a × b = c`; either factor order counts.
  - The fold's "g × e" stamp and the running totals stay hidden until success, so nothing copies the answer.
- **The misses:**

  | Miss | What the child sees |
  |---|---|
  | Unequal groups | The odd tray wobbles and the strip springs back. On miss 2, every bead is laid out in one row, with the extra bead coral and ghosts where beads are missing. |
  | Equal groups of the wrong size | The face numeral pulses. |
  | Wrong crease window | The window shakes. The line says "Add one more group of {each} to {previous}"; on the first window it says "Count the beads in the first group", never "to 0". |
  | Wrong total | The running totals appear on the creases. On miss 2, the beads lie in one row, counted on group by group. |
  | Wrong sentence | The edges count themselves out. |

- **Every fair fold adds a page to the small times book** in the board's corner.

## Files and wiring
- **New files:**
  - `mini tools/accordion-core.js` (`AccordionCore`) holds the model:
    - the three tables;
    - `canFold`, running totals, add/remove bead (at most 10 per tray, arrays not editable), squeeze/unfold;
    - windows typed only in Level 2 with the totals shown;
    - `check()` with literal hint keys;
    - `plan()`: a fresh order every pass.
  - `accordion-activity.js` draws the felt board (bead pot, times book, trays or the array), the strip (pleats, creases, windows, the folded panel, the miss-2 bead row), the drawn concertina handle, the total box or the sentence boxes, the keys and Check.
    - Phones:
      - the pot and the book sit in the board's side gutters;
      - the strip is only as tall as the round needs;
      - close windows stagger into two rows;
      - Check is the ✓ twelfth key.
    - CSS prefix `ac-`, `apparatusClasses: ['ac-art']`.
  - `accordion-activity.html` loads the core and the activity at `?v=1`.
- **Manifest:** the row stays in `array-activities.json`.
  - Its id, slug, title and intro are frozen in all 11 locales.
  - `tool` → `accordion-activity`; `params` = `{level: [1, 2, 3], run: [shown, hidden], rounds}`.
  - Row 138 is untouched (gated).
- **Route:** `ACTIVITY_WRAPPER_VERSION` 9.883 → 9.884.
- **Prose ×11:** all replaced. Each quotes 4 + 4 + 4 = 12 and 3 × 4 = 12 (3 · 4 in de/sv/da/no/fi).
- **Deviations from the design:**
  - The row stays in the shared manifest, like #138, instead of a new `accordion-activities.json`.
  - The squeeze is a button, not a dragged handle.
  - A bead is removed by holding its tray, not by tapping the bead.
  - Free play ("Bead board") is left out.
  - The fix line names no number (the reviewer's ruling, below).

## Native + pedagogy review (one reviewer, all 11 locales)
Every finding was fixed at the source:
- **From my English, inherited by every locale:**
  - **"Each group should have {each}"** on fix rounds gave the target away. Now: "One group has a different number. Make them all the same."
  - **"Fair groups!"** carried a sense of fairness. It is now "Equal groups!" (de "Gleich große", nl "Gelijke", fi "Yhtä suuret").
  - **"Fill the groups the same"** became "Put the same number in every group" (fr "de la même façon", es "Pon la misma cantidad", sv "lika mycket").
- **de:** *Malbuch* means a colouring book; it is now "Einmaleins-Buch". "Gezeigt" became "Sichtbar".
- **fr:** "Totaux intermédiaires", "dispositions rectangulaires" instead of *quadrillages*, and "garde le doigt appuyé".
- **es:** the opening ¡ on the success lines (now gated).
- **pt:** *conta* also means "calculation", so beads are now *miçangas*; "disposições retangulares".
- **nl:** "Hoeveel in elke groep"; "rechthoeken" instead of *roosters*.
- **sv, no:** no double *till*. **da:** "en gruppe mere med", and "Synlige" instead of "Vises".
- **fi:** "Siinä on … ryhmää".

Found while building the gates, all fixed:
- The array and the times book carried `role="img"` labels; the array's label spoke the answer ("6 × 8") to screen readers in Level 3. Both are gone.
- A wrong crease window folded the strip and hid the very window the child had to fix. A window miss now keeps the strip open.
- The first-window miss would have printed "to 0".

## Gates
- **`verify-accordion-core.js`: 11,334 checks, 0 fail.** It checks:
  - Level 1 equals the 8 shipped rounds, read from git, in order.
  - Its own fold rule: every fair strip folds, and all 210 ±1 perturbations do not. The core's rule agrees with mine on every strip of up to 4 pleats of 0–5.
  - Running totals end at the product.
  - Fix rounds: one tray off by one, moving one place per pass, landing on every tray equally often.
  - Every verdict and hint key at all three levels, with the running totals shown and hidden.
  - A window miss keeps the strip open.
  - The sentence is accepted in either factor order.
  - The plan over 1,500 passes.
  - Strings ×11:
    - no digit and no number placeholder in a Level 2/3 task line or a hint;
    - no hint names the total;
    - the school's × / ·;
    - es opens its ¡ ¿;
    - pMake equals the shipped `promptGroups` first sentence;
    - the success lines filled and true.
  - No `role="img"` anywhere.
  - Prose and the manifest (frozen fields; row 138 untouched).
- **`mutate-accordion.js`:** 24/24 killed; the control passes.
- **`local-test-accordion.js`: 7,150 pass, 0 fail** (real pointer, 11 locales). It covers:
  - Taps that fill 4 / 4 / 5, the spring-back, a held press removing one bead, the fold (face 4, three edges, stamp 3 × 4), miss 1 and miss 2 (twelve beads in a row counted on 4, 8), 12 → the line, then Next 0.5 s later.
  - The Level 2 fix round: the odd tray and its tall pleat, the fix by a held press, a wrong window that shakes, then done.
  - Totals hidden: no windows.
  - Level 3 array: nothing editable, no stamp, a wrong product, then 6 × 5 accepted.
  - Every round of every level at rest, at a miss and solved, through 320…1366.
  - The run first caught the keys below the fold on a 320 phone in the window rounds. The strip is now as tall as the round needs, the pot and book sit in the gutters, and the trays shrink when two rows of windows are shown.
  - A check added after I read the renders: every numeral lies inside the strip. It fires 8 times against the old strip height.
- **`visual-qa-activity`:** 192 renders pass.
- **`audit-activity-hierarchy`:** 446 / 0; the apparatus share is 0.79 at 704.
- **`audit-settings-efficacy`:** level and running totals are both live.
- **Other gates:** `audit-activity-next-delay` passes. Content ×11, prose claims, SERP copy, content tells and route preflight all pass.
- **My own reading of the renders** (360 / 768 / 1024) found what no gate had: the "3 × 4 = 12" stamp was clipped under the folded panel, and the ribbon ran through the face numeral. Both are fixed.
- **0 lines** in shared cores or `lcs-shell`.

## Live
(pending)
