# #170 — Make and Count Squares → THE STAMP SHEET (2.G.A.2; all 11 locales)

ORDER row 170 · id `fractions.make-and-count-squares.2-g-a-2` (kept). Design: `designs/170-fractions.md`.

## The invention
- **The rectangle is a sheet of stamps.** A perforating wheel runs on a rail along the top (lines of holes down the sheet) and another on the left (lines across).
  - Each rail has a notch every half square, and all the notches look alike, so the rails never tell where the squares are.
  - A tap sends the wheel to the nearest notch and runs it; a drag along the rail runs it where it is let go; a tap on a line of holes takes it away.
  - On a phone, where half-notches are under 44 px apart, the first tap parks the wheel at the nearest notch and a second tap there runs it.
- **On Check the press prints the plate square at the top-left of every piece:**
  - a true square prints a perfect stamp (white frame, star);
  - a piece too thin or short prints a part-stamp with a torn coral edge (sliced);
  - a piece too big prints its stamp beside spare paper with a dashed coral edge (bordered).
- **The plate** can be laid on the first square (tap) or slid over the sheet (drag, snapping to whole squares).
- **Count:** once every stamp prints true, the child counts them on a keypad. A tap on a stamp makes it glow, as a counting aid.
- **Three boards (setting):**
  - **make by numbers:** the card shows the plan, plus a "3 rows / 4 columns" line with row and column icons;
  - **make by the plate:** the card shows only the plate, and the child finds how many squares fit;
  - **pick the sheet:** a card and three finished sheets.
- **Card setting:** "3 rows of 4" / "4 + 4 + 4" / "3 × 4". de, sv, da, no and fi use "3 · 4".
- **Misses:**
  - **make, miss 1:** the misprints, plus the press hint; the by-numbers board adds "3 rows and 4 columns: count the pieces, not the lines".
  - **make, miss 2:** a dotted lattice and glowing whole-square notches, shown until the next move.
  - **count, miss 1:** the rows separate and the stamps light one by one.
  - **count, miss 2:** each row shows its running total.
  - **pick, miss 1:** the card's album page shows the chosen sheet's rows filed into it (overhang coral, empty slots dashed).
  - **pick, miss 2:** the page is numbered.
- **Success:** the rows tear off into the album, a postmark lands, and the success line names the card (rows of / the addition / the multiplication) and the total. Next appears 0.5 s later.

## Deviations from the design
- **The row stays in `fractions-activities.json`.** Only the tool and template change; the old params are dropped. Rows 108 and 172 keep the old engine there, so `MANIFEST_FILES` is unchanged and the metadata stays frozen in all 11 locales.
  - The old gates for this row are retired: `verify-fractions-gridcount.js` and `local-test-fractions-gridcount.js`.
  - `fractions-activity.js` keeps its now-unreached `grid-count` branch: no lines changed in the shared engine.
- **Pick-board bot, corrected in the design §6 (measured):**
  - the rows-only bot scores 5/9, not 4.5. K9, the same-total trap, has no second 3-row sheet.
  - Three sheets can't hold a same-rows, a same-length and a same-total distractor at once. The K9 trap (misconception 5) is kept.
  - The gate asserts: size bots ≤ 3.5/9, length-only ≤ 4.5/9, rows-only exactly 5/9 with its only full win in K9.
- **Count step, own keypad:** a keypad drawn by the activity (the shell's Check is hidden, as in rows 164–169). On a wide screen it takes the press's place in the side column; on a phone it sits under the sheet.
- **Phone layouts:**
  - the card steps aside in the count step, because the grid itself is the plan;
  - the album chip shows only on wide screens;
  - pick sheets go two to a row;
  - the cut-step sheet uses a smaller height budget, so the longest locales keep Check above a 320×640 fold.
- **Misprint drawing:** the design's "sliced = coral hatch over the overhang" was drawn first, and the hatching crossed into the neighbouring pieces' stamps and was unreadable. The part-stamp + torn edge (sliced) and spare paper (bordered) both stay inside the piece.
- **No free play after success** (Next 0.5 s, as in rows 164–169). The tear-off is a short animation.

## Review (one native + pedagogy reviewer, all 11 locales) — all fixed at the source
- **SEVERE:**
  - en "this adding" → "this addition";
  - de *Punktefeld* (a dot array, and there are no dots here) → "Feld aus Quadraten";
  - pt "não as linhas" (*linhas* is also the row word) → "não as linhas de furinhos";
  - nl *klare vellen* (reads "clear sheets") → *afgemaakte vellen*;
  - sv/da/no *fyrkantiga/firkantede*, and da *felter* (any four-sided shape would do) → *kvadratiska/kvadratiske/kvadrater*;
  - sv *hållinje* (an existing word for a stance) → *hålremsa*;
  - fi *painua* (to sink) → *painaa* (painettiin / on painettu).
- **MINOR:**
  - en: "to a notch"; "take it away"/"gone" instead of "heal"; "spare paper"; "didn't print true"; "equal rows" instead of "rows of a number" (every locale followed);
  - de: *sauber gedruckt*;
  - fr: "Continue à compter", "de gauche à droite", "rangées égales";
  - es: "Lleva la ruedita a", "exactamente", "por ejemplo";
  - pt: "Leve a rodinha até", "por exemplo";
  - nl: "weg te halen", *Plussom*;
  - sv: "ta bort", "hur många det är", "Efter två missar";
  - da/no: "Efter to fejl"/"Etter to feil", *prikkede*;
  - fi: "vastaa korttia", "Toisen virheen jälkeen".
- **Kept:** it *tratteggiati*. The help squares are drawn dashed, so the word is accurate.

## Found by reading the renders (no gate saw them)
- **The miss-2 lattice was invisible:** the misprints' spare paper was painted over it, while the hint told the child to use the dotted squares. It is now painted above the misprints; local-test asserts the paint order, poisoned both ways.
- **The lattice and glowing notches outlived the next move:** they were keyed on `help`, not on the current verdict. Now a new line clears them, as the design says; local-test asserts it, poisoned.
- **The count step's 6-column keypad overflowed the 190 px side column at 1024.** The column is now 4 keys wide in a 210 px side column.

## Gates
- `verify-stamp-sheet-core.js` 8,971/0. Ground truth is the design's §6 tables, with its own piece arithmetic. It checks:
  - the rounds; totals 4–20, never 0;
  - **exhaustively**, over all 2^(notches) cut sets per sheet size (e.g. 65,536 for 4×5): only the whole-square set is accepted, and every other set prints misprints on exactly the pieces that are not one plate square (sliced if thin, bordered if big); the named misconceptions are checked by name;
  - the check and count flow, the keypad, running totals;
  - pick: one match, no transposed sheet, the distractor types, slots 3/3/3 per pass and moving each pass, the bots, the page fit;
  - the plan (no repeat, no three slots running);
  - every line in 11 locales for every board, card and round; the multiplication sign; the pieces hint never on the plate board (through the real `_check`); no dead strings; the manifest.
- `mutate-stamp-sheet.js` 26/26 killed, control passes.
- `local-test-stamp-sheet.js`, 11 locales:
  - real taps and drags on the rails, healing, misses, help, count and keypad, stamp glow, the card settings, the plate, the keyboard (slider + Enter), the phone's two-tap rail, the pick board;
  - the notches identical at rest; the lattice above the misprints and gone after a move;
  - 9 states × 8 widths with Check above the fold.
- `local-test-stamp-sheet.js` final run 3,641/0. Visual QA ×11 locales PASSED (324 renders each: 6 phases × 9 rounds × 6 viewports, plus tablet reach). Hierarchy 416/0. Settings efficacy: 2 live. Prose-claims, SERP copy, content tells, preflight routes and next-delay all PASS.

## Live
- LIVE 2026-10-30 (commit 2511d677e): `live-verify-stamp-sheet.js` 68/0 on production (11 pages 200; en/de/sv/fi at 1366 and 390: real rail taps, a misplaced line → misprints, heal, the true grid → count, 12 on the keypad → solved, iframe grows with the card).
