# #171 — Same Size, Different Shape → THE DOUGH PRESS (2.G.A.3; all 11 locales)

ORDER row 171 · id `choice-board.fraction-noncongruent.2-g-a-3` (kept). Design: `designs/171-choice-board.md`.

## The invention
- **Every piece of a cut shape is a slab of dough.** Under the press it squashes into a round patty holding exactly its amount (patty area ∝ piece area). So equal shares give identical patties whatever their shape, and an unfair cut gives a big patty and a small one.
- **Squash:** the outline is resampled and morphs into a circle, keeping the area at every step (gate-checked).
- **MATCH (16 rounds):** the model's patties wait on a tray, seen from above (up to 4 slots). On Check the chosen shape's patties land centred on them:
  - equal → one patty with a teal outline;
  - bigger → a coral rim;
  - smaller → a pale ring;
  - extra → a wobbling patty with nothing under it;
  - missing → an empty dashed ring.
- **FAIR (8 rounds):** tap every shape cut into equal parts to tie a ribbon on it. On Check each ribboned shape is pressed onto a little plate under it, and an unfair one's ribbon slips off.
- **WHICH (9 rounds):** the card shows the fraction (words, or stacked numbers) with a row of dashed outlines. On Check the coral patties roll into one lump and the rest into another, and each must fill its dashed ring. W9's two triangle quarters fill the "one half" ring exactly, and the success line says why: "2 of 4 equal parts is the same amount as 1 of 2".
- **Miss 2:** every tile shows its patties (or its lumps). **Success:** the patties glaze and a bell jar goes on the shelf. Next follows 0.5 s later.

## Deviations from the design
- **The row stays in `choice-board-activities.json`.** Only the tool and template change; the old params are dropped. The other rows keep the shared engine, so `MANIFEST_FILES` is unchanged and the metadata stays frozen. `choice-board-activity.js` keeps its now-unreached `fraction-noncongruent` branch: no lines changed in the shared engine.
- **The stack test is seen from above (a tray of up to 4 slots), not as side-on stacks.** It was built side-on first, and the rims and gaps of near-equal patties were unreadable at the activity's sizes. Top-view concentric patties show them at a glance.
  - The patty scale is fixed per round from the largest cut piece of the round.
  - The uncut whole's one big patty is clipped to the tray: it still reads as "far too much".
  - On a phone the tray sits beside the model, and the press drawing steps aside.
- **The fair board's ribbon:** the whole tile is the toggle (aria-pressed) instead of a separate 44 px ribbon button under it.
- **The match task line:** only "Find another shape cut into {fourths} — the pieces may look different." The first sentence ("This shape is cut into …") repeated what the model shows and took 4 lines at 320 in de/fi.
- **The miss-1 hint** drops its opening "Look at the patties." The question names the patties itself, and the full sentence took 3 lines at 320 in fr/de/pt/nl (found by the full 11-locale runs, which the fi/de-only fit check had not covered).
- **Phones:**
  - at 320 the tiles are 104 px, the tray slots 46 px, and the gaps and board padding are tighter;
  - in the miss-2 showing every whole of the round is drawn at 0.72× (one scale still), so the patty previews fit inside the tiles;
  - on the which board the lumps sit beside the card;
  - once solved, only the matching tile stays beside the model, making room for the success line and Next. Free play after success is wide-screen only.
- **No free play after Next** (as in rows 164–170). The model-and-tile slide to the shelf is a bell jar added to the shelf (wide screens).

## Review (one native + pedagogy reviewer, all 11 locales) — all fixed at the source
- **SEVERE:**
  - `hintCard` said "the card needs 2 equal parts with 1 coral". On the 1/2 card the right tile (W9) is cut into 4, so the hint steered away from it. It now speaks only of the coral lump filling its dashed ring.
  - es/pt success lines started with a lowercase word.
  - it `hintPatties` was cut off ("Sono tanti quanti?").
  - no "hver delte" → "hver delt" (3×).
- **MINOR:**
  - en/fr/es/pt/it/nl prose: "a strip and a triangle of the same size" → "with the same amount of dough" (size is the very doubt the activity answers).
  - en: "holding exactly that piece's dough".
  - de: *orangefarbenen*; "in zwei Hälften".
  - fr: *la moitié*, «galettes de pâte», «{k} parts égales sur {n}».
  - pt: *achatar* (not *amassar*, which also means knead).
  - it: «divisa in parti uguali» (not «in modo giusto»), «a ogni figura».
  - nl: *de helft*.
  - da: «forskelligt store».
  - fi: *taikinakiekko* throughout (*lätty* is a pancake).
  - New `okWhichEq` for "2 of 4 is the same amount as 1 of 2".
- **Not changed:** the "these 1 are fair" case cannot occur. Every fair round has 2–3 fair shapes (gate-checked).

## Found by building and measuring (no gate had them)
- **Side-on stacks hid the verdict** (see above). I read the first render and redrew the tray.
- **Fit first:** fi/de on phones before the long runs found the miss-2 previews, the which lumps and the long task line pushing Check past the fold. All were fixed before any long run.
- **The squash rescaled about the moving point mean, so a triangle's final circle drifted off-centre.** It is now rescaled about the piece's fixed centre.
- **Reading the miss-2 phone render: the uncut square lost its bottom edge.** The tile is a flex column, so it squeezed the shape's svg box to make room for the patty plate. The drawing was clipped, while no box overlapped any other.
  - **The fix:** the in-tile shape scale is derived from the tile size, so a square plus its plate always fit: (tile − 54)/(tile − 22), i.e. 0.61× at 320 and 0.72× at 360. There is one plate scale per round, so the tiles still compare.
  - **The check:** local-test asserts each shape keeps its full drawn height. It was vacuous at first: it compared boxes, which never overlap. Corrected, it is poisoned both ways.

## Gates
- `verify-dough-press-core.js` 4,965/0. Ground truth is the design: cut percentages, staircase vertices, the three tables, and the design's own measured shaded-share line. It checks:
  - **pieces:** its own areas; mixed figures equal in area but different in shape; the step's pieces congruent to each other only;
  - **rounds:** one ✓ per match and which round; the fair sets; no distractor within 0.04;
  - **the press:** patty² ∝ area; the squash keeps the area and ends a circle; the stack fit;
  - **slots:** match 4/4/4/4 and moving every pass; which 2/2/2/3; fair never in one row or column; the plan;
  - **check flows** for all three boards;
  - **every line** in 11 locales × 3 boards × words/numbers; the W9 success line; no dead strings; the manifest.
- `mutate-dough-press.js` 25/25 killed, control passes.
- `local-test-dough-press.js`, 11 locales:
  - real taps on all three boards, the keyboard, free play, the real (not fast-forwarded) press once, W9;
  - 7 states × 8 widths with Check above the fold.
- **Visual QA** ×11 locales (4 phases × 16 rounds × 6 viewports, plus tablet reach).
- **Other audits:** hierarchy 640/0, settings efficacy 2 live; prose-claims, SERP copy, content tells, preflight routes and next-delay all PASS.
