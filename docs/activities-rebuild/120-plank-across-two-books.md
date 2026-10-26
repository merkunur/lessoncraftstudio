# #120 — Two Moons → THE PLANK ACROSS TWO BOOKS (RL.1.9; all 11 locales)

ORDER row 120 · id `two-tales.compare.rl-1-9` (kept). Design: `designs/120-two-tales.md`.

## Files and wiring
- **Files:**
  - `mini tools/two-tales-core.js` is rewritten in place (`TwoTalesCore`; the old core was this activity's own and no other page loads it). It holds the model:
    - nine tales per locale, each in a 3-page and a 2-page telling, with each tale's experience tags, its proof page and its "glow" page per tag;
    - three tasks: SAME (9 rounds), ONLY ONE (9 rounds), SORT (7 rounds);
    - where a plank truly belongs (`truth`: across · gold · silver · basket), the page-by-page walk of each end, the checks, the hints, the help from miss 2 and the plan.
    - DATA is written by a build script that checks every tag against its tale.
  - `two-tales-activity.js` is rewritten. It draws the bridge row (Mossbeard, the across zone with a moon at each end), the two books, the tray of planks, the basket (SORT), Check, and the walk animation (CSS prefix `tt-`, `apparatusClasses: ['tt-plankart', 'tt-moonart']`).
  - `two-tales-activity.html` loads core `?v=2` and activity `?v=9`, with no height pin.
- **Manifest:** the row stays in `two-tales-activities.json`.
  - `params` = `{task: [same, only, sort], pages: ['3', '2'], rounds: {same: 9, only: 9, sort: 7}}`.
  - en, de, fr, es, pt, it and nl slug, title and intro are frozen.
  - **sv, da, no and fi slug, title and intro are authored new.**
- **Route:** `ACTIVITY_WRAPPER_VERSION` 9.864.
- **Prose:** en, de, fr, es, pt, it and nl replaced; sv, da, no and fi added.
- **Sources** (scratchpad): `tt-src.js` (every locale's tales) → `tt-build.js` (meta, DATA); `tt-strings.json` → `tt-apply.js`; `tt-prose.js`, `tt-manifest.js`, `tt-dump.js` (the review dump), `tt-qcheck.js`, `tt-e-rev.js` (the review's fixes), `tt-probe.js`.

## The invention
**An experience is a plank laid across two books.** Each end walks its own book page by page, like a reading finger.
- Where a page SHOWS that experience, the end rests there and a moon dot marks the page.
- If both books have it, the plank lies flat like a bridge.
- If only one has it, the other end finds nothing to rest on and the plank tips into the book that holds it.
- If neither has it, the plank drops and goes back to the tray.
- Two-part experiences (lost → found, scared → safe) glow on the first half and rest only on the page that completes them, so "she lost her ball" never counts as "lost it, then found it".
- On a solved SAME round, Mossbeard is shown on the bridge.

## The three tasks
- **SAME:** lay the one plank true in both stories across the two books.
- **ONLY ONE:** put the plank true in just one story on that story's book.
- **SORT:** every plank gets its own place — across, the gold book, the silver book, or the basket (in neither story).

## Deviations from the design (each measured or ruled)
- **Tap, then tap** (pick a plank, then tap where it goes) instead of a drag: the place is the content, and a tap target can be ≥ 44 px on a phone where a book-sized drop zone cannot.
- **The book's head is the drop target** for "only this book"; the across zone sits above the books, between the two moons.
- **On phones** one book shows at a time with gold and silver tabs either side of the across zone, and Check sits inside the tray (it no longer fits under the books above the fold).
- **One library picture per page** instead of a character plus a prop: two 96 px pictures and a caption do not fit a page at 704. The picture is the one the caption needs (the nest, the ball, the apple).
- **Captions say "gave half" and "mended"** where the design said "shared" and "fixed", so no caption copies a plank's own words (a word-matching bot would otherwise solve the round).
- **Bo's tale:** Dot the dog *showed Bo where the ball was* (the picture is the dog alone, not the dog with the ball).
- **Pip's nest is torn** by the wind (the library nest holds chicks; a torn nest gives "mended" something to mend).
- **Every helper and sharer is named "friend"** in the caption so the GOT_HELP / SHARED planks rest on a page that says so.
- **sv / da / no plank labels** reworded by the reviewer; the fi SORT task line shortened to stay on two lines.
- **No scene actions on tapping a page, no long-press read-aloud, no free-play walking of Mossbeard.**

## Pictures
All checked by eye on the contact sheet: fox, cap, log, grass; bunny, ball (a black-and-white football, never called red), dog; mouse, owl, beaver; robin, nest with chicks, apple tree; frog, lamp; duck, lunchbox, goat; hedgehog, apple, rabbit; squirrel, acorn, pinecone, bird; cat, kite, pig; turtle (Mossbeard only). The robin tale and the squirrel tale (near-twin birds) never share a round (gate-asserted).

## Review
ONE native + Grade-1 reading reviewer over all 11 locales (compact dump of every caption, plank, task line and hint).
- **MUST, applied (×11 unless named):**
  - Bo: "her friend found the ball for her" did not match the picture → the friend *showed Bo where the ball was*.
  - Millie and Dilly 2-page captions dropped "friend", so the GOT_HELP / SHARED proof page did not say it → restored.
  - Sam: "dropped his acorn and lost it" read as the end of the story → "and it was gone", then "spotted it next to a pinecone".
  - Pip: a nest that only fell gave "mended" nothing to mend → the wind tore it.
  - Grammar and register fixes in de, fr, es, pt, it, nl, sv, da, no and fi captions and hints.
- **SHOULD, applied:** plank labels in sv / da / no made shorter and child-plain; fi SORT task line shortened; es-MX wording in the hints.
- **Open (frozen metadata, not edited):** the en..nl titles and intros describe the old card-tap task, de / es / it / nl titles name grade 2, and the fr / it / pt intros name Mossbeard the turtle.

## Gates
- **`verify-two-tales-core.js`:** 62,726 checks with its own ground truth (its own tag and proof tables, written in the gate): every round's truth, every plank × every place, all 256 SORT arrangements, word-matching and position bots, the plan, strings ×11 and the manifest. **0 fail.**
- **`mutate-two-tales.js`:** 12 of 12 mutations killed (including a data mutation that swaps a tale), and the control survived.
- **`local-test-two-tales.js`:** real pointer, 11 locales, 320–1366.
  - The scenarios: both settings; an empty Check; a wrong plank across → the walk, the tip and hintMiss1; miss 2 → the moon dots on each book; the answer across → the flat bridge and okSame; ONLY ONE on the right and the wrong book (and laid again → back to the tray); SORT with every place including the basket; the 2-page telling.
  - Then every round of all three tasks at rest / miss 2 / solved, resized through 320–1366: no sideways scroll, Check above the fold, the hint and the success line in view, controls ≥ 44, pictures ≥ 64 (≥ 96 from 704), everything inside the card, no word cut off.
  - **30,492 pass, 0 fail.** It found: the 320 fold (tabs beside the across zone, Check in the tray); German mid-word breaks (`hyphens:manual`); a tip drawn toward the wrong book; a stray line in the empty across zone.
- **`visual-qa-activity`:** PASSED, 54 renders. **`audit-activity-hierarchy`:** 650 / 0 (the planks and moons declared as the apparatus). **`audit-settings-efficacy`:** "task" and "pages" both change the board.
- **Preview:** a seed in `generate-activity-previews.js` lays the answer plank across, so the card shows the bridge.
- **Content:** `verify-activity-content-<loc>` ×11, `verify-activity-prose-claims`, `verify-activity-serp-copy`, `audit-activity-content-tells` and `preflight-activity-routes` all pass.
- **Renders read** at 360 and 704 (de), 1024 (fi, en) and the preview card.

## Live
`live-verify-two-tales.js` on production: **52 pass, 0 fail**. All 11 pages return 200 with wrapper 9.864. Real pointer in en, de, sv and fi at 1366 and 390 (SAME, round 0): a wrong plank across → the walk, the tip and the locale's first hint; the answer across → the plank lies flat, the proof page is marked in the book, and the success line names the plank. The iframe grows with the card. The first run fell inside the deploy window (the edge still served the old embed) and was rerun once.
