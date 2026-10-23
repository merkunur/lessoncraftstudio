# #77 — Sunny-Side Diner → THE MAGNET PLATES AND THE GOLDEN "AND" (L.K.1.f, all 11 locales)

ORDER row 77 · id `sunny-side-diner.compound-order.l-k-1-f` (kept). Design: `designs/077-sunny-side-diner.md`.

## Files and wiring
- **New files:** `mini tools/magnet-plates-core.js`, `magnet-plates-activity.js`, `magnet-plates-activity.html`. CSS prefix `mp-`.
- **Pictures:** through `lcs-pictures.js`; all 20 checked on a contact sheet.
- **Manifest:** the row stays in `sunny-side-diner-activities.json`.
  - `tool` is repointed;
  - `params` became a mirror of the core (each round's sentence per locale);
  - en/fr slug, title and intro are frozen (gate hash `e2482d65…`);
  - de/nl/da/sv/no/es/it/pt/fi slug, title and intro are new.
- **Route:** `GRADE_OVERRIDE` '1' for the nine new locales (fr already '1'); `ACTIVITY_WRAPPER_VERSION` 9.818.
- **Legacy gates:** `verify-compound-order-core.js` and `local-test-sunny-side-diner.js` exit 0 with a pointer. The old files stay on disk, unused.
- **Strings source:** scratchpad `mp-strings.js` (per-locale blocks), baked by `mp-bake.js`, which also writes the fr narrow no-break spaces.

## The invention
- **Plates are magnets:**
  - Order plates sit on a brass rail and push each other apart: a tapped plate springs toward the open gap and its neighbour springs away.
  - Only the golden "and", lifted off its hook (beside the ticket) and dropped into the gap, holds two plates together.
  - An "and" dropped on an open end slides back to the hook.
- **The hatch:** the kitchen hatch at the end of the rail opens only for a WHOLE sentence: the beginning cap, the plates joined, and the end cap. Then the sentence lights up word by word and the customer bobs.
- **The comma:** with a third plate, the first "and" turns into a comma by itself. Only en keeps the serial comma (", and").
- **Rounds:**
  1. gather the order on the tray (bins, with one picture and a dot per item), then build the sentence;
  2. the missing "and" (the end cap is already docked in three of the seven);
  3. fix the robot's order: the counter opens when the wrong plate goes back;
  4. "one more thing!".
- **Order setting:** Show the ticket, or Listen (the ticket folds after 5 s, or 7 s without a voice; one re-open).
- **Misses:**
  - an empty Check is a hint, not a miss;
  - miss 1 makes the place glow (the gap, the dock, the amber wrong plate, or the blinking ticket line and tray group);
  - miss 2 lifts the needed piece off its hook, waiting over its place.

## Rulings this build made
- ⭐ **The picture floor beats the design's sizes.** The sheet wanted 40–48 px pictures on the ticket and the plates. Every library picture renders at 96 px (desktop) or 64 px (phone), and counts on the tray are drawn dots.
- **The 320 px fold:**
  - the hook hangs beside the ticket;
  - on the narrowest phones the customer steps aside during the rail phase, the ticket numeral becomes a badge on the picture, and the end cap may wrap;
  - the robot's counter opens only once a plate has gone back.
- **Bins:** the donut and the bagel (both rings) are never in one bin row; the robot's bagel mistake is a cupcake.
- **Reviewer fixes** (all 11 locales read, no blocking defects):
  - no «smultring» → «donut» (the picture is a glazed donut);
  - de «Pancake(s)» (in Berlin «Pfannkuchen» is a doughnut);
  - es/pt magnets «se repelen / se repelem» and «se separan / se afastam» (the earlier reflexive did not say *apart*);
  - de level 3 «Den Fehler verbessern»;
  - sv «Typer av omgångar» and «Det ”och” som saknas»;
  - nl hint commas and wording;
  - no negation order;
  - fi round-type wording.

## Gates
| Gate | Result |
|---|---|
| verify-magnet-plates-core (own frames, number words and articles per locale) | 9011 / 0 |
| mutate-magnet-plates | 19 / 19 killed, plus one control that survives |
| local-test-magnet-plates (11 locales × 320–1366, real clicks, every round at rest) | see the commit |
| visual-qa | 48 renders green |
| hierarchy | 434 / 0 |
| settings-efficacy | 2 live |
| preflight, prose-claims, serp-copy | green |

## Open
- The frozen en intro still quotes "two pancakes and a milk" (the form the design rules out). It is page metadata, so it is left for the operator.
