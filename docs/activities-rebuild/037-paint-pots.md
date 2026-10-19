# #37 — Identify the Shape → THE PAINT POTS (K.G.A.2)

ORDER row 37 · id `choice-board.shape-id.k-g-a-2` (kept).
- **Files:**
  - Added: `paint-pots-core.js`, `paint-pots-activity.js`, `paint-pots-activity.html`, `paint-pots-activities.json`.
  - The row left `choice-board-activities.json` as text (14 rows remain, CRLF kept).
  - 0 shared-core lines.
- **Metadata:** slug, title and intro are frozen in all 11 locales; the prose is rewritten ×11.
- **Design:** `designs/037-choice-board.md`.

## The apparatus and its invention: THE PAINT SETS ONLY IN THE TIN'S SHAPE
- **Pictures** are made only of shape pieces (house, rocket, fish, sailboat, beehive, train, robot, lighthouse, garden). There are no library pictures, because `shapes/diamond` is a turned square.
- **The tins:** a tin's label shows the shape (outline + word), only the name, or only a clue (corner beads and side ticks).
- **The brush:** it runs round a tapped piece, leaving a bead on every corner, ticks on equal sides, or a pin and string on a round piece.
- **Paint stays wet** (with a gloss); nothing is judged at the tap. A second tap lifts the paint back.
- **Check is the drying moment:** right pieces set and stay set after a miss. Wrong pieces shed their paint into the puddle, and open figures leak through their gap.
- **What a piece IS comes from its geometry** (corners, sides, angles, closed / curved / rounded), never from its authored name.
- **Boards:**
  - shape pictures (two tins);
  - real-or-not quilts (one tin, 8 patches; the patch is the tap target);
  - count pictures (triangles + squares, then a −/+ counter per tin; never below 1).

## Deviations from the design (each measured)
- **A piece is at least 68 px wide on the 440 px board,** so it is still a 44 px tap on a 320 phone (stage 288). The sailboat's mast is 1:3, not 1:6.
- **Quilt pieces may be thin and tiny,** because the patch is the tap target.
- **Count rounds use −/+ counters, not two 1–9 chip rows:** nine 44 px chips cannot fit a 288 px stage.
- **Insets** (windows in the house wall and the rocket, flower centres, the robot's chest) sit inside their parent with a measured margin. Every other pair of pieces keeps a ≥ 3 px gap. Every piece is ≥ 7 px from the 3 px frame.

## Fixes from the build (each found by a gate or a render)
- **A set piece could be re-painted:** the guard `st.set[pid]` read tin 0 as false.
- **The rhombus angle parameter shared the rotation key,** so every diamond lost its turn, and the tin's diamond label drew a sliver.
- **A kite in diamond paint was told "count its corners"** — it has 4, like the diamond. The miss hint now names the attribute that differs: corners, equal sides, square corners, a bent side, round vs corners, or the gap.
- **The house read as scattered shapes,** so a wall piece now holds the windows and door.
- **22 pieces sat on the board's frame:** the gate's 3 px allowance ignored the 3 px stroke, so the margin is now 7 px.
- **FAST mode collapsed the cosmetic timers,** so tests could not see the trace or the run-off. They now run on real time.
- **The settings gate called `.click()` on SVG controls,** which have none. It now dispatches the click event; the thresholds are unchanged.

## Gates
- **`verify-paint-pots-core.js`:** 5,479 checks (own oracle).
  - Every piece's kind re-derived from its points.
  - Hand-built positive and negative figures, and every turn of a square, rectangle and skinny triangle.
  - The design tables; sizes and turns of every target kind; the targets spread; no square beside a rectangle or diamond tin; the diamonds are rhombi.
  - Count values 2–7 / 1–4, never 0.
  - Stage geometry: in the frame, ≥ 68 px, no touching, insets with margins.
  - State rules; every miss hint; strings ×11 with the true numbers; riddles that never name their shape.
  - Order, and layout 288–1100.
- **`mutate-paint-pots.js`:** 25/25 killed.
- **`local-test-paint-pots.js --locales=all`:** 699 / 0.
  - Real pointer; wet paint, lift, shed and puddle; the miss ladder; leak; the kite's hint; counters; clue and name labels; the settings; the keyboard.
  - The 320–1366 sweep at rest, wet, miss 1 and miss 2, with a press point found for every piece.
- **visual-qa:** 54 renders. **Hierarchy:** 272 / 0. **Settings:** 2 live.
- **Content gates ×11:** PASS.

## Review (one agent, native ×11 + pedagogy) — applied
- **Square riddle:** it fit a rhombus, so in clue mode the rhombus took the paint and then shed it. It now says "4 corners like the corner of a book" / right angles.
- **Diamond riddle:** it defined the shape by "leaning" (orientation). It now says "equal sides, corners not square".
- **Round piece in a tin with corners:** it was told "round the same way?". It now gets `hintCurve`, and a piece with corners in a round tin gets `hintCornersRound`.
- **Circles:** they are never "turned" (`hintMore_circle`, `hintMoreTinRound`).
- **`hintBent` "sharp" corners:** de/nl/sv/da/no/fi had "acute", which is wrong for square corners.
- **Singular `ariaCorner1`.**
- **Grammar:**
  - nl het-words; da/no neuter kvadrat / rektangel / hjerte; sv "ett litet";
  - it "gli esagoni" and "cercane";
  - fr "cherches-en" and "angles";
  - de article cases and "Sind es";
  - es "la misma cantidad";
  - pt "apoiado na ponta";
  - nl/sv/da/no −/+ labels.
- **Prose claim:** it now says the shapes a tin asks for come in several sizes, and those with corners also come turned. This is what the gate measures.
- **FROZEN-NOTE (not changed):**
  - Every locale's intro still says "tap the shape named in each prompt" (the old mechanic).
  - The slug and title stay "Identify the Shape".
  - no: the title says barnehagen.
