# #138 — Build an Array → THE SKEWER PLATE (2.OA.C.4; big arrays 3.OA.A.1 / 3.OA.C.7; all 11 locales)

ORDER row 138 · id `array.build-array.2-oa-c-4` (kept). Design: `designs/138-array.md`.

## The invention
- **One skewer per row.** Every row of fruit on the plate is threaded on one skewer, so a row can only be lifted out whole.
- **The rack is the addition.** Each lifted skewer lies in the rack, drawn as a stick with one token per piece, and gets its own box. The rack reads 4 + 4 + 4 = the repeated addition made of kebabs.
- **The skewer pot** turns the sticks the other way (columns instead of rows) while no picture moves. The success line then follows the skewers: "4 columns of 3: 3 + 3 + 3 + 3 = 12. 4 × 3 = 12."
- **The misses:**
  - A box that disagrees with its skewer wobbles; on miss 2 its tokens number themselves.
  - Rows + columns (or − 1) lights exactly one row and one column — what the child added — while the rest pulse.
  - Another wrong total is miss 1 "one skewer at a time"; on miss 2, running totals appear at each skewer.
- **Build:** steppers grow the plate by whole rows and whole columns for a sum like 4 + 4 + 4. The turned plate is refused ("the skewers go the wrong way"); on miss 2 the right plate is outlined.
- **Find:** pick the plate that is r rows of c. A wrong plate names its own rows and columns; on miss 2 every plate does.
- **Big arrays:** square tiles up to 10 × 10, one fact of every table 2–10. Only the product is typed; a wrong product lifts every skewer into the rack, and on miss 2 the running totals show the skip count.

## Files and wiring
- **New files:**
  - `mini tools/skewer-plate-core.js` (`SkewerPlateCore`) holds the model:
    - the tables: Count is the 8 shipped arrays + 3 × 5, each with a library fruit; Find is the design's 9 rows; Big is 7 × 2 … 5 × 10;
    - skewers by rows or columns;
    - lift / putBack / reskewer, focus / type / del, step, pick;
    - `check()` with literal hint keys;
    - `plan()`: a fresh order every pass, never two rounds with the same total in a row.
  - `skewer-plate-activity.js` draws the plate (pictures behind their sticks, a coral bead on each, the whole row as the tap target), the skewer pot, the rack, the build steppers (drawn row / column icons with + / −), the find plates (counters on thin skewers), the keys and Check.
    - Wide: the rack sits beside the plate. When the pictures would fall under the 96-px floor beside it (the five-column plates), the rack goes under the plate instead.
    - Phones: the rack is a row under the plate. Once every skewer is in the rack the outline plate shrinks; the pot sits in the rack while it is empty; Check is the ✓ twelfth key; the big-array plate is display-only (its miss lifts every skewer).
    - CSS prefix `sp-`, `apparatusClasses: ['sp-art']`.
  - `skewer-plate-activity.html` loads the core and the activity at `?v=1`.
- **Manifest:** the row stays in `array-activities.json`. Its id, slug, title and intro are frozen in all 11 locales. `tool` → `skewer-plate-activity`; `params` = `{job: [count, build, find], size: [pics, big], rounds}`. The other row is untouched (gated).
- **Route:** `ACTIVITY_WRAPPER_VERSION` 9.882 → 9.883.
- **Prose ×11:** all replaced. Each quotes 4 + 4 + 4 = 12 and 3 × 4 = 12 (3 · 4 in de/sv/da/no/fi).
- **Deviations from the design:**
  - A skewer is lifted by a tap on its row, not a drag.
  - The "only the table of n" sub-pass is left out.
  - The five-column plates stack the rack under the plate on wide screens.
  - On phones, the pot shows only while the rack is empty.

## Native + pedagogy review (one reviewer, all 11 locales)
Every finding was fixed at the source:
- **Two teaching defects from my English:**
  - **"You counted the edges"** described a count the child did not make. Rows + columns is adding the rows and the columns, and the glow already marks one row and one column. Now: "You added the rows and the columns. Count every piece — the middle ones too", in all 11 locales and in the prose.
  - **The column view printed r × c** under "c columns of r". Now c × r, so the equation matches the skewers on screen.
- **"holds the same"** with no noun became "holds the same number" (and de "gleich viele", fr "autant de morceaux", es "la misma cantidad").
- **Titles:** de "Punktefeld", fr "disposition rectangulaire" / "quadrillages", es "arreglo rectangular", pt "disposição retangular".
- **it:** "togli" instead of "sfila", which means sliding the fruit off the stick.
- **sv, da, no:** "med {c} i varje / i hver", because without it "med {c}" can read as "with c in total".
- **da, no:** the pot label gained its object.
- **fi:** "Millä lautasella…", "omassa vartaassaan", "Tee lautanen, joka sopii laskuun", "Laskuun tarvitaan", "Enintään 5 · 5".

## Gates
- **`verify-skewer-plate-core.js`: 14,032 checks, 0 fail.** It checks:
  - the shipped 8 arrays from git;
  - its own skewers: whole rows or whole columns covering the plate exactly once, in both directions, for every Count and Big plate;
  - rows + columns (and its kin) never the total;
  - pictures on disk in colour;
  - the Find table: positions 3/3/3, size ranks 3/3/3, every wrong plate one row or one column off, never the turned target, rows-only / columns-only never unique, totals distinct;
  - Big: every table 2–10 once, products distinct;
  - every verdict and hint key in Count (both directions), Build, Find and Big;
  - the plan over 1,500 passes;
  - strings ×11 with the school's × / ·, the success lines filled and true, prose and the manifest.
- **`mutate-skewer-plate.js`:** 21/21 killed; the control passes.
- **`local-test-skewer-plate.js`:** real pointer, 11 locales: Check before lifting, a skewer lifted and put back, a box off by one (that skewer wobbles), 3 + 4 → one row and one column (6 pieces) glow, miss 2 running totals, 12 → the line and Next 0.5 s; the pot turns the sticks and a column lifts whole; build (empty plate, the turned 4 rows of 3 refused, 3 rows of 4); find (the wrong plate names its own 4 rows of 4); big (a wrong product lifts all eight skewers, 8 × 7 = 56); then every round of every job at rest, a miss and solved through 320…1366. The full run: 10,120 pass, 396 fail — all one measurement error in the test (the tile-size check counted the empty outlines left when every skewer is in the rack); fixed to measure only tiles on the plate, and the big-array sweep rerun in all 11 locales: 2,794 pass, 0 fail.
- **`visual-qa-activity`:** 216 renders pass. The first runs caught the keys below the fold on 320 phones after a miss, and the rack wrapping when five skewers are out.
- **`audit-activity-hierarchy`:** 752 / 0. It caught the five-column plates' pictures under the floor (85 px at 1024, 58 px at 360); now they are 98 px and 64 px.
- **`audit-settings-efficacy`:** job and size are both live.
- **Other gates:** `audit-activity-next-delay` passes. Content ×11, prose claims, SERP copy, content tells and route preflight all pass.
- **0 lines** in shared cores or `lcs-shell`.

## Live
`live-verify-skewer-plate.js` ran on production on 2026-10-27: **60 pass, 0 fail.**
- All 11 pages return 200.
- en, de, sv and fi, at 1366 and at 390, embed skewer-plate-activity.html at wrapper 9.883.
- With a real pointer, on 3 rows of 4:
  - three taps lift three whole skewers;
  - 4 typed in each box, then 7 (rows + columns), gives the miss line;
  - 12 gives "3 rows of 4: 4 + 4 + 4 = 12. 3 × 4 = 12." (the locale's own phrasing and sign).
- The iframe grows with the card.

The first run fell in the cache window: some pages still served the old embed. Once curl showed 9.883 everywhere, the second run was clean.
