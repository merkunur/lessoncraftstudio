# #38 — Professor Pip's Museum → THE CLASPS (K.G.A.2)

ORDER row 38 · id `pip-museum.curate-wing.k-g-a-2` (kept).
- **Files:**
  - Added: `pip-museum-core.js`.
  - Rewritten: `pip-museum-activity.js`, `pip-museum-activity.html`, `pip-museum-activities.json`. The params now describe the two halls; the old hand-placed `rounds` are gone, and the rounds are defined in the core.
  - 0 shared-core lines.
- **Metadata:**
  - en / de / fr / es / pt / it / nl: slug, title and intro are frozen.
  - sv / da / no / fi: slug, title and intro are new.
  - GRADE_OVERRIDE is now `'1'` for sv / da / no / fi, matching de / fr / pt / it / nl.
  - The prose is rewritten ×11.
- **Design:** `designs/038-pip-museum.md`.

## The apparatus and its invention: THE CLASP HOLDS ONLY ITS OWN SHAPE
- **The hall:**
  - Professor Pip stands in the hall (in his own column when the page is wide, next to Check when it is narrow).
  - There are 2–3 pedestals, each topped by a brass clasp in its shape.
  - Some rounds add the doorway of the Mystery Gallery, always as the last column.
- **The belt:** treasures ride a conveyor belt. They are turned (0–300°), sized from 0.3 to 1.0, and stretched; the belt order is shuffled every visit.
- **Routing:**
  - The child drags a treasure, or taps it and then taps a pedestal.
  - Nothing is judged while sorting. An unchecked treasure can be picked up again; a held one cannot.
- **Check is the clasp moment:**
  - Every clasp closes round its treasure, and the shape turns upright inside the clasp.
  - A clasp only holds a shape that its geometry (`kindOf`) says it is. It never reads the authored name.
  - A refused treasure rides back to the belt wearing a **ghost clasp**: equal sides in one colour, right angles locked, a gap where the figure is open, a bent rod where a side is curved.
  - Miss 1 gives the hint "count its corners and look at its sides". At miss 2 the right pedestal glows for the treasure the child picks up. The help level survives the next drag.
- **The look-alikes** go to the Mystery Gallery: a rhombus, an oval, a pentagon, an open square, a curved triangle, a rounded rectangle and an open ring.
- **The capstone (S9):** once every clasp has closed, the child counts the triangles and the squares with −/+ counters. A counter starts at 1 and never shows 0.
- **The hall of solids (D1–D8):**
  - Each pedestal shows a library object in a wire cage: ball, dice, can, book, orange, drum, present, eraser.
  - The solids (sphere, cube, cylinder, box) come standing, lying or turned.
  - Cones, pyramids and any solid with no matching object go to the Mystery Gallery.
- **Settings:** hall (shapes / solids); plates (names / riddles).

## Fixes from the build (each found by a gate or a render)
- **The help ladder was unreachable.** A refused treasure returns to the belt, and the next drag reset `help`, so miss 2 could never happen. Route now keeps the help level.
- **Dragging did nothing.** The first pointer move repaints the belt, which detached the element holding the pointer capture. Move and up are now bound on `window`. Found by the local test's real drag.
- **Check sat below the fold on a 320×640 screen.** On a narrow page an empty tray now reserves one row, not two; the tray grows as it fills and the belt shrinks as it empties.
- **Visual QA measured the wrong text.** The counter value was the first `aria-live` in the stage, so the gate read it as the feedback line. It is now `role="status"`, and the hint line is what gets measured (18 px wide / 15 px narrow).
- **The open ring looked clipped.** Its gap faced the cell edge; it is now turned 40°.
- **fr "livre" (book) was falsely banned.** The "free" ban is per language and is poisoned in both directions.

## Gates
- `verify-pip-museum-core.js`: 3,650 checks, 0 failures. It uses its own oracle and covers:
  - each round has exactly one right answer;
  - slot balance and Mystery ≤ 25 %;
  - capstone counts, state, the ghost clasp, strings ×11, the per-language "free" ban, pictures (case-exact paths) and layout.
- `mutate-pip-museum.js`: 23 of 23 mutations killed.
- `local-test-pip-museum.js`: 664 checks, 0 failures. It covers:
  - real drag and tap, refusal + ghost, the glow, the Mystery Gallery, the capstone counters, solids pictures loading, riddle plates, settings and the keyboard (en/fi), in all 11 locales;
  - a width sweep (320–1366) at rest, half routed, miss 1 and the count phase: no sideways scroll, every control inside the card, ≥ 44 px, above the fold and pressable.
- Other gates:
  - `visual-qa-activity.js`: 54 renders pass.
  - `audit-activity-hierarchy.js`: 596 / 0.
  - `audit-settings-efficacy.js`: both settings change the board.
  - Content gates ×11, prose claims, SERP copy, content tells and route preflight are all green.
- I read the 360 / 704 / 768 / 1024 renders myself, including the count phase, miss 1 and the solids glow.

## Review (one agent, native ×11 + pedagogy) — applied
- **No "free" word in any locale.** French already has its narrow no-break spaces.
- **de:** "kann ihn halten" (Schatz is masculine); "Gegenstand", not "Ding".
- **es-MX:** "prisma rectangular"; "goma", not "borrador"; title "El museo del profesor Pip".
- **pt-BR:** "bloco retangular"; "objeto"; "Pegue o tesouro"; "adivinhações".
- **it:** "all'oggetto".
- **nl:** "voorwerp".
- **sv:** "vid föremålet"; solids riddles use "ytor".
- **da:** "ved den ting"; "rette sider" (not "lige", which reads as equal); solids riddles use "flader".
- **no:**
  - "kube" for the solid and "firkantet prisme" (a triangular prism is also a right prism);
  - "dreid", not "vridd" (which means twisted);
  - "overalt"; "ved tingen"; solids riddles use "flater";
  - "feil", not "bom".
- **fi:** the hints say "pitää siitä kiinni" / "sopii" (the old "voi pitää sen" read as "may keep it"); "tölkki" in the prose.
- **fr prose:** "un ballon", matching the object label.
- **Pedagogy:**
  - S4's not-a-square rectangle was 1.15 : 1, a trick rather than a lesson at phone size; it is now 1.4 : 1.
  - The prose now says any solid with no matching object goes to the Mystery Gallery (D8's sphere).
  - Size variation is present: the scales run from 0.3 to 1.0 in every round.

## FROZEN-NOTEs (not changed — metadata is frozen)
- The **it** intro says the child names shapes "toccando il piedistallo giusto". Dragging works as well, so the line is still true.

## Deploy (2026-10-19)
- **Commit eb535ade.** deploy.sh returned EXIT 0, with 0 payment-canary failures. All eleven locale pages return 200.
- **Production play:** 104 / 104 (en / sv / fi / de at 1366 and 390).
  - S1: three treasures tapped on and one dragged onto the wrong pedestal. At Check three clasps close and the wrong one rides back wearing its ghost clasp; once it is placed right, the wing opens.
  - D3: the solids' library objects load and the wing opens.
  - The wrapper version matches, and the iframe grows with the card.
- **Live variety probe:** 9 distinct rounds, and pass 2 is reshuffled, in all 11 locales. Finnish timed out as the 11th page in one browser session and passes on its own.
- **Server disk after the deploy:** 134 GB available of 436 GB (68 % used).
