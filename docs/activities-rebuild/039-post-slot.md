# #39 — Flat or Solid? → THE LETTERBOX (K.G.A.3; G2 count the faces)

ORDER row 39 · id `choice-board.flat-solid.k-g-a-3` (kept).
- **Files:**
  - Added: `post-slot-core.js`, `post-slot-activity.js`, `post-slot-activity.html`, `post-slot-activities.json`.
  - The row left `choice-board-activities.json` as text (13 rows remain, CRLF kept, the other rows byte-identical in JSON).
  - 0 shared-core lines.
- **Metadata:** slug, title and intro are frozen in all 11 locales; the prose is rewritten ×11.
- **Design:** `designs/039-choice-board.md`.
- ⚠ **Name.** The design names the files `letterbox-*`, but **row #6 (Letterbox Street) already owns `letterbox-core.js`**. The first write overwrote #6's core in the working tree; it was restored from git at once, and #39 uses `post-slot-*`. Check `ls "mini tools" | grep <prefix>` before naming a new core.

## The apparatus and its invention: ONLY SOMETHING FLAT FITS THROUGH THE SLOT
- **The counter:** a mail bag of flat shapes and drawn solids, a letter tray and a parcel tray (wordless motifs), and a red post box with a thin slot and a flag. In the sort task there is also a parcel shelf with a side window.
- **Sorting:**
  - The child drags a shape to a tray, or taps it and then the tray.
  - A tap lifts and wiggles the shape; it never turns edge-on before Check, because that would give the answer away.
- **Check is the slot's verdict:**
  - Each letter turns edge-on at the slot. A flat shape becomes a line and slips through; a solid stays thick, jams and drops back into the bag.
  - Parcels go to the shelf (shown as blocks in the side window); a flat shape put there topples into a line and slides off.
- **The help ladder:**
  - Miss 1: the bounced shapes show their edge-on views (a line beside a thick block).
  - Miss 2: each bounced shape carries an arrow to its tray.
  - A new move clears the showing; the help level stays.
- **The win:** the flag flips up. In free play, a tap turns a shape edge-on and back.
- **Counting faces (drawn solids, 8 rounds):**
  - The solid stands see-through on a turntable, hidden edges dashed; every starting pose hides at least one face. A turn button turns it a quarter.
  - The pull tab opens it into its net; the faces grow out of their hinges one after another.
  - The child taps faces to postmark them (a second tap removes the mark). The cylinder's curved side is a striped sheet that curls and takes no stamp.
  - The child picks the count on chips 1–9.
  - A wrong number is a miss. Miss 1 wobbles the unstamped faces; miss 2 numbers the stamps in order.
  - The right number with a face unstamped bumps back. It is not a miss: the stamps are the price of posting.
  - Every flat face stamped plus the right number: the net slides through the slot.
- **Everyday things (7 rounds):** a dice, present, book, eraser, can, drum and a can lying down. Each is a library picture with its solid's see-through outline:
  - **Boxes:** the outline is derived from the picture's own silhouette hexagon (front corner = h0 + h2 − h1, hidden corner = h1 + h4 − front).
  - **Cylinders:** the outline is measured ellipses.
- **Face counts come from the solid's own vertex/face model.** Prisms and pyramids are built from a base polygon, with outward normals forced; Euler is checked in the gate.

## Deviations from the design (each measured)
- **One setting, three options (flat or solid? / count faces / everyday things).** The design had a separate "Things" setting for the counting tasks. On the default sort board it would change nothing, and the settings gate requires every setting to change the board at rest.
- **"Flat faces" in every string.** German school counts a cylinder as 3 faces (2 flat + the curved *Mantelfläche*); the worksheets count 2. Saying *ebene Flächen / faces planes / caras planas / plana sidoytor / plane flader / plane flater / tahko* makes "2" true in every convention.
- **The present is a box, not a cube.** The picture is visibly wider than tall; the design itself calls it box-shaped.
- **The hexagonal prism is squat (side = height) and has the compact net:** the lid with six side squares round it and the base on one of them. A strip of six sides cannot keep each face ≥ 44 px on a 320 phone (measured 39 px). The compact net gives 45 px, and the drawn solid has the same proportions as its net.
- **No stamp pad.** On a wide page it pushed the 1–9 chips into two rows; the postmark itself is the stamp.
- **Phones, counting tasks:** the small post box sits beside Check rather than in a strip, so the chips fit two rows and Check stays above the fold at 320×640.

## Fixes from the build (each found by a gate or a render)
- **Overwrote row #6's core** (see Name above). Restored from git before anything else.
- **Two of the nets were badly built.** The triangular pyramid's root face and the hexagonal prism's parents were rewritten as plain literals. The first splice used a stale offset and cut code; caught by `node --check`.
- **A stale field name:** the layout returned `box` while the activity read `post`.
- **The bag-cell clamp** (fit six in a row) applied on phones too and shrank cells to 37 px. It is now wide-only; on a phone the bag wraps.
- **On phones the counter collapsed** to its content in the column layout (`align-items:flex-start`). The trays fell to 28 px and the net was sized from the shrunken table (42–43 px faces). Fixed with `align-items:stretch` on narrow; caught by the local sweep.
- **The net was sized from a guessed width.** It now reads the table's `clientWidth`.
- **The postmark's wavy lines crossed into neighbouring faces.** The mark is now sized from the face's inradius.
- **The flag flew off diagonally.** A CSS transform overrode the SVG placement with one offset for both box forms. The flag is now an arm that hangs down and flips up (`scale(1 -1)`) on success.
- **Two mutants survived the first gate** (a "nearly paid" net fitting the slot; a turn wiping the chosen number). The gate now stamps all faces but one for every round, and sets a number before turning.

## Gates
- **`verify-post-slot-core.js`:** 2,262 checks, 0 failures. Its own oracle covers:
  - the flat table, the school face counts, Euler and convexity;
  - nets as real nets: hinges shared, every face reachable from the root, no overlap;
  - the rounds re-typed from §6, twin pairs, no strict F/S alternation over 400 random bags, and no face count answering more than three rounds;
  - pictures (case-exact paths) and the outlines' corners inside each silhouette;
  - order (no repeat pass, never the same answer three rounds running), both state machines and the help ladder;
  - strings ×11 (placeholders, reachability including the core's `hint()`, the per-language "free" ban poisoned both ways, Mexican Spanish);
  - taps and net faces ≥ 44 px at every width.
- **`mutate-post-slot.js`:** 25 of 25 mutations killed.
- **`local-test-post-slot.js`:** 720 checks, 0 failures, in all 11 locales. It covers:
  - real drag and tap, both misses, the win and the flag, the count path end to end, the curved sheet, things pictures and outlines, the setting, and the keyboard (en/fi);
  - a width sweep (320–1366) over sort at rest, half sorted, miss 1 and miss 2, and the nets after miss 2.
- **Animated path (no FAST):** six flyers run and clean up, the busy lock releases, the net posts and celebrates, with no console errors.
- **Other gates:** `visual-qa-activity.js` 48 renders pass; `audit-activity-hierarchy.js` 524 / 0; `audit-settings-efficacy.js` passes (the task setting changes the board); content gates ×11, prose claims, SERP copy, content tells, answer rank, route preflight and font shorthand are all green.
- I read the 320 / 360 / 704 / 1024 renders myself: sort at rest, miss 2, the win and the flag; the cube, the prism and the cylinder nets; the dice and the book outlines.

## Review (one agent, native ×11 + pedagogy) — applied
- **No "free" word in any locale.** Spheres, the twins and the face counts were all confirmed correct, and no zero is reachable.
- **en:** the box-shaped win lines say "like a rectangular prism" (a present "like a box" compared nothing).
- **de:** the imperative is "Stemple", not the noun "Stempel"; the cylinder's curved side is a "gewölbte Fläche". German school counts it as a third face, so the wording stays honest about why only two get stamped.
- **es-MX:** the setting reads "¿figura plana o cuerpo?"
- **pt-BR:** "fica preso", not "entala".
- **nl:** the setting reads "vlakke figuur of ruimtefiguur?" and the letter tray is "(plat)", because "vlak" is the word for a face here.
- **sv:** "vika ut" (the school verb behind "utvikning"), not "vika upp"; "plana ytor", not "sidoytor", because a can's two ends are not sides.
- **fi:** "tasainen pinta", not "tahko". Finnish school keeps *tahko* for polyhedra and teaches a cylinder as 2 bases + vaippa, so "tölkissä on 2 tahkoa" was wrong. "Kuutiossa on kuusi tahkoa" stays.
- **Pedagogy:** a white highlight now goes on the sphere, so the tiny ones (×0.4) never read as circles.

## FROZEN-NOTEs (not changed — metadata is frozen)
- **Intros:** the en / es / it / pt / sv / da / no / fi intros describe "tap whether it is flat or solid". The trays and the counting tasks are not mentioned, but the line is still true of the sort.
- **sv / no titles and intros:** they use "solid", which is not the geometric term in Swedish or Norwegian (it means sturdy). The screen says "kropp" / "romfigur".
- **nl title:** "lichaam" (dated) where the screen says "ruimtefiguur".
- **no title:** "i barnehagen" is preschool in Norway.
- **de title:** "Kindergarten" is not a school level in Germany.
- **es title:** "¿Plana o sólida?", while the screen uses the SEP term "cuerpo geométrico".
