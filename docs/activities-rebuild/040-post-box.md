# #40 — Count the Sides → THE NUMBER POST BOX (K.G.B.4)

ORDER row 40 · id `choice-board.count-sides.k-g-b-4` (kept).
- **Files:**
  - Added: `post-box-core.js`, `post-box-activity.js`, `post-box-activity.html`, `post-box-activities.json`.
  - The row left `choice-board-activities.json` as text (12 rows remain, CRLF kept, the other rows byte-identical in JSON).
  - 0 shared-core lines.
- **Metadata:** slug, title and intro are frozen in all 11 locales; the prose is rewritten ×11.
- **Design:** `designs/040-choice-board.md`.
- The `post-box` prefix was checked free before the first write (the #39 lesson).

## The apparatus and its invention: A DOOR'S STICKS LIE ONE ON EACH SIDE
- **The box:** a red post box under a dotted play mat. Its doors carry a numeral (count and sort), a shape name (name mode) or the target's defining parts (real-or-not: three mixed sticks + three dots; four equal sticks + four square-corner marks; two coloured pairs + four marks). Under each door are that many sticks and corner dots.
- **An offer** (drag, or tap the shape then the door). The door lays its sticks one per side:
  - **fit:** the shape drops through into the drawer;
  - **too many:** a stick tumbles off;
  - **too few:** a bare side glows coral;
  - **open:** the sides fall apart into a heap;
  - **curve:** the straight stick rocks on the bulge and slides off;
  - **lengths:** equal sticks leave gaps and overhangs on unequal sides;
  - **corners:** the square-corner marks tilt in slanted corners.

  A line under the box names the result ("3 sticks for 4 sides: a side has no stick"). Offers are free; every bounce shows the difference.
- **Count mode:**
  - **Pegs:** tap a side to plant a numbered peg; only the last peg lifts, and tapping an earlier one wiggles it.
  - **Help ladder:** after bounce 2, ticks on every side and dots on every corner; after bounce 4, the pegs plant themselves and the right door breathes.
  - **Ending:** a fit ends the round, so there is no Check.
- **Tray modes** (sort / real / name):
  - Check before any offer asks; this is not a miss.
  - Check with shapes left: miss 1 wobbles them; miss 2 hovers each one's door sticks above it.
  - A new offer clears the showing, but the help level stays.
- **The drawer** collects the posted shapes; at the end each one shows its name plate.
- **Spin:** a double tap (or R) turns a shape 45°. A door tap or Check in between cancels a pending double tap.
- **One right door per tile:**
  - Every shape fits exactly one door in every mode × level (the gate's own classifier).
  - A square fits the rectangle door because it is one. Square tiles never meet a rectangle door, and a rhombus door never meets a square tile.
  - The round tables keep one right answer; no door is made false.

## Deviations from the design (each measured)
- **Name mode, "more" level: heptagon / octagon / rhombus doors, not the trapezoid.** Under the inclusive definition, every rectangle and square tile on those trays would also fit a trapezoid door. The rhombus door goes only to rounds without square tiles.
- **Phones:**
  - Trays with more than six tiles use four columns (62–72 px tiles, above the 44 px tap floor but under the design's 76 px floor at 320), so Check stays above the fold at 320×640 in every locale.
  - Four name doors go two per row and 70 px tall.
- **Long names carry soft hyphens at their seams** (viisi-kulmio, kahdeksan-kulmio, åtta-hörning, parallell-trapets, Sieben-eck, rettan-golo…). Breaking anywhere split "viisikul|mio".
- **No spin knob on tray tiles.** A 44 px knob would cover a quarter of a 62–96 px tile; spin is by double tap or R.

## Fixes from the build (each found by a gate or a render)
- **The real door's corner marks read as the letters "LL".** They are now proper square-corner marks with the small square, and the rectangle door's sticks are shortened so they no longer run into the marks.
- **Name doors at 360 split Finnish names mid-word** (soft hyphens and the two-per-row grid, above).
- **Trays wrapped 4 + 1 on a desktop;** six or fewer now fit one row.
- **The fold at 320:** the name and sort "more" trays and the French prompt pushed Check below the fold. Fixed with four-column trays, shorter phone name doors, a tighter drawer, and a mat minimum height applied only to the counting shape.
- **The miss-2 hover badges of an octagon** (8 sticks) overflowed the card; they now stay inside the tile and wrap.
- **A double tap never spun a tray tile:** the first tap repaints, so the second landed on a new button whose timer started at zero. The timer now lives on the activity, keyed by tile, and a door tap or Check in between clears it. The local test found this, and then a timing variant of it.
- **The gate held vacuous `|| true` assertions.** They were removed, and the one real assertion they shared a line with was restored.

## Gates
- **`verify-post-box-core.js`:** 4,456 checks, 0 failures. Its own oracle covers:
  - corners counted by atan2 turns; square, rectangle and rhombus decided from measured lengths and angles;
  - every catalogue shape × 14 doors (fit / too many / too few with the right difference);
  - every near-miss verdict;
  - the rounds re-typed from §6, one right door per tile in every mode × level, and every door an answer in the tray modes;
  - real sets, never square + rectangle doors together, never a rhombus door with a square;
  - tray slots uniform within ±5 % over 2,000 deals, distinct dealt turns, the name-door order shuffled;
  - order (no repeat, never the same answer three rounds running), both state machines;
  - strings ×11 (placeholders, reachability including the core's `hint()` and `resultKey()`, each count win line naming its number, soft hyphens only in name plates, the per-language "free" ban poisoned both ways, Mexican Spanish);
  - doors and tiles ≥ 44 px at every width.
- **`mutate-post-box.js`:** 20 of 20 mutations killed (the design's 15 + the help ladder, the rhombus door, the name-door shuffle, the dealt turns, and "Check with shapes left is no miss").
- **`local-test-post-box.js`:** 633 checks, 0 failures, in all 11 locales. It covers:
  - real pointer: pegs, every bounce visual, both help levels, a drag post, the tray misses, every near-miss verdict, the name doors, the settings, the keyboard (en/fi) and double-tap spin;
  - a width sweep 320–1366 over seven boards at rest and at help 2 / miss 2, including every side of the counting shape being hit-testable;
  - the 320 fold in every locale on the tallest boards.
- **Animated path (no FAST):** the flyer runs and cleans up, both wins reach the shell, the drawer shows six plates, and there are no console errors.
- **Other gates:** `visual-qa-activity.js` 54 renders pass; `audit-activity-hierarchy.js` 164 / 0; `audit-settings-efficacy.js` passes (mode and shapes both change the board); content gates ×11, prose claims, SERP copy, content tells, answer rank, route preflight and font shorthand are all green.
- I read the 320 / 360 / 704 / 1024 renders myself: count at rest and at help 2 (the octagon, the heptagon's pegs), every near-miss on the real door, the sort win with the drawer plates, and the name doors with Finnish names after miss 2.

## Review (one agent, native ×11 + pedagogy) — applied
- **Confirmed:**
  - every round's doors are unique and correct;
  - every near-miss verdict matches its failure;
  - the trapezoid is right under both definitions;
  - every count win line names the right shape;
  - no zero is reachable, and no "free" word appears.
- ⚠ **Pedagogy (fixed in all 11 locales):** the rectangle riddle said "2 long sides, 2 short sides and 4 square corners", which excludes squares by definition, while the rectangle door accepts them. It now reads "4 straight sides and 4 square corners", satisfied by exactly the real rectangles of each round. The triangle riddle gains "closed".
- **Prose:** a square fits the rectangle door *and the rhombus door*, in all 11 locales.
- **en:** the mode is "doors with names" (the child reads them; the other ten languages already said so).
- **de:** pegs are "Fähnchen" ("Stecker" is an electric plug).
- **fr:** pegs are "fanions" ("fiche" reads as a card or a plug); the prose says "glisser", like the strings.
- **nl:** "stoppen … door de deur", not the anglicism "posten".
- **sv:** "under brevlådan" (lådan is the drawer).
- **da:** "sidernes længder" (genitive); "prel" and "indsendt" are rewritten.
- **fi:** "Oikein!", not the stiff "Kyllä!"; the drawer is "vetolaatikko" (laatikko is also the post box).
- **it:** the prose says "angoli" throughout, like the strings.

## FROZEN-NOTEs (not changed — metadata is frozen)
- **All 11 intros** describe the old "tap how many sides" mechanic.
- **de title:** "Geometrie im Kindergarten".
- **no title:** "i barnehagen" (this is 1. trinn content).
- **pt title:** "pré-escolar", where Brazil says "educação infantil".
- **es title and intro:** "forma" where the screen says "figura".

## Deploy (2026-10-19)
- **Commit 17cc0866.** deploy.sh returned EXIT 0, with 0 payment-canary failures. All eleven locale pages return 200.
- **Production play:** 104 / 104 (en / sv / fi / de at 1366 and 390).
  - Count: a real-pointer peg; door 3 says "3 sticks for 4 sides"; door 4 posts the shape, and the win line reads.
  - Sort: one shape dragged, the rest tapped, Check, six name plates.
  - Real: the long rectangle bounces off the square door, and the real square is posted.
  - The wrapper version matches, and the iframe grows with the card.
- **Live variety probe:** 9 distinct rounds, and pass 2 is reshuffled, in all 11 locales. Finnish timed out as the 11th page and passes on its own.
- **Server disk after the deploy:** 134 GB available of 436 GB (68 % used).
