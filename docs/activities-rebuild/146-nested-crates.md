# #146 — Tuck Breaks a Hundred → THE NESTED CRATES (2.NBT.B.7; all 11 locales)

ORDER row 146 · id `place-value-regroup.subtract-decompose-hundred.2-nbt-b-7` (kept). Design: `designs/146-place-value-regroup.md`.

## The invention
- **In Tuck's stock room a hundred is a crate packed with ten boxes, and every box is packed with ten cubes.**
  - A crate shows its ten boxes through a window.
  - A box shows its ten cubes as outlines on its lid.
- **Only what lies on a shelf can be opened:**
  - A crate opens into ten BOXES on the tens shelf, never into cubes. It opens only while no loose box lies on the tens shelf.
  - A box opens into ten cubes on the ones shelf, only while fewer than ten cubes lie loose.
  - So across a zero, the crate must open before the box, every time.
- **The order slip:** each round is a customer's order slip. It has one empty cell for every crate, box or cube taken away. When the slip is full, the child types what is left on the shelves into three digit boxes under them.
- **Packing back:** ten loose pieces show a dashed outline of their package, and pack back into it (free play and undo).
- **Check:**
  - The slip is not full → hintSlip (the slip pulses).
  - Nothing is typed → hintType.
  - A shelf holds ten or more → hintTooMany.
  - None of these is a miss.
- **Misses:**
  - Miss 1: the shelves with a wrong digit count their pieces in place-value steps; hintCount.
  - Miss 2: hintNest, the pencil digit, and the written subtraction with its strike-and-rewrite marks (3→2, 0→10→9, 2→12).
- **Settings:**
  - Take away: a few ones (default, the old eight) / a three-digit number (G3-360/362; the slip gets crate and box cells too).
  - Written subtraction: hidden / shown. When shown, each mark is written as its package opens.

## Files and wiring
- **New files:**
  - `mini tools/nested-crates-core.js` (`NestedCratesCore`): the two tables, openCrate / openBox / pack / toSlip / fromSlip, typing, the check with literal hint keys, the marks (the child's and the method's own), the plan.
  - `nested-crates-activity.js` (`NestedCratesActivity`, prefix `nc-`, `apparatusClasses: ['nc-art']`).
  - `nested-crates-activity.html`.
- **Manifest:**
  - The row stays in `place-value-regroup-activities.json`; en..sv slug, title and intro are frozen.
  - `tool` → `nested-crates-activity`; params mirror the core tables.
  - da/no/fi get a new slug, title and intro (3. klasse / 3. trinn / 3. luokka, like the frozen de/sv Klasse 3 / åk 3).
- **Route:** `ACTIVITY_WRAPPER_VERSION` 9.890 → 9.891.
- **Prose ×11:** rewritten. It quotes 302 − 5 = 297, the 307 slip, and 400 − 136 = 264.
- **Deviations from the design:**
  - **Taps as well as drags:**
    - A tap on a crate or box opens it; a tap on the ones shelf sends a cube to the slip.
    - A tap on a slip row fetches a piece of its kind (press and hold the cube row for a handful).
    - Drags work as designed: onto the next shelf opens, onto the slip fills, and a crate dropped on the ones shelf thumps back.
  - **The digit boxes sit under the shelves** (as in #145), not one answer box in the order column, so miss 1 can mark the wrong shelf's own digit.
  - **A back arrow** on the slip returns the last piece (undo for tap users); a drag back is not needed.
  - **A shelf never exceeds nineteen:** a put-back onto a full shelf is refused. The exhaustive search found this.

## Native + pedagogy review (one reviewer, all 11 locales)
Every finding was fixed at the source:
- **en (source, inherited everywhere):**
  - "an order slip with exactly as many empty cells as the number being taken away" was false for the three-digit setting (400 − 136 has 10 cells). It is now "one empty cell for every crate, box or cube" ×11.
  - "A child who forgets to open the box … writes 307" described a state the activity cannot reach: the slip cannot fill without the box. It is now "a child who writes 307 has taken ten ones out of nowhere; the two crates and nine boxes on the shelves show why" ×11.
  - "each shelf counts" is now "each shelf with a wrong digit counts" ×11.
  - "The crate" is now "A crate".
- **de:**
  - "öffnet sich zu"; "Im Lager von Hamster Tuck".
  - The marks are now described as "durchgestrichen und durch … ersetzt".
  - One term throughout: "Schriftliche Subtraktion".
- **fr:**
  - "barré et remplacé par".
  - The learning goals now say "casser" (not "échanges").
- **es:**
  - The title is now "desagrupa".
  - The 10 over the 0 is the thing that gets crossed out.
  - "La hoja pide".
- **pt:**
  - "Faltou?" (not "Não dá?").
  - The 10 over the 0 is the thing that gets crossed out.
- **it:**
  - The title is now "cambia" (the cambio verb).
  - hintTooMany names the scatola/cassa.
  - "sull'ordine" consistently.
- **nl:**
  - The title is now "wisselt … in" (splitsen is number partitioning).
  - aBack says "stuk" (it may be a doosje or krat).
  - "vervangen door".
  - The kerndoelen are not per groep.
- **sv:**
  - "ersatt med".
  - The setting pair is "dold / visad".
- **da:** "rettet til".
- **no:**
  - "endret til".
  - The metadata title now has "med veksling".
- **fi:**
  - One verb, vaihtaa (title, success line, slug, title).
  - aSlip is read aloud without a slash.
  - The learning goals are all imperative.

## Gates
- **`verify-nested-crates-core.js`: 1,952 checks, 0 fail.**
  - **My own tables, re-solved by column subtraction:**
    - The old eight: 297 395 195 393 294 194 295 196.
    - The three-digit table: 264 256 342 337 375 126 537 325.
    - Every round borrows in the ones and across a zero ten (one crate, one box).
  - **The old rounds**, read from git (67eebf51).
  - **The nesting:**
    - A crate opens into ten boxes and never puts a cube on the ones shelf.
    - A second crate stays shut while boxes lie loose; a box stays shut at ten cubes.
    - Packing back is ten exactly.
  - **An exhaustive search over every 6-move sequence from every round** (4.8 million moves): value conserved, no shelf negative or over nineteen, no slip overfilled. This found a real defect: the back arrow could push the ones shelf to twenty after a second box was opened. It is now refused.
  - **A scripted player for every round of both faces.**
  - **The written marks:** the child's marks equal the method's own; none before anything opens; a crate adds 3→2 and the 10; a box adds 10→9 and 12; packing back removes them.
  - **Right-aligned digits** (97 for 297 → only the hundreds box is off).
  - **The shortcut bots:**
    - smaller digit from the bigger: 0/16;
    - tens stay 0: 0/8;
    - the 0 becomes 10, never 9: 0/16, always exactly one ten too many.
    - The core marks each bot's answer as a miss.
  - **Picture, strings ×11, prose ×11 and the manifest:** sibling rows untouched.
- **`mutate-nested-crates.js`:** 29/29 killed, and the control passes. The first run had two survivors (a 10 mark written before the crate opens; left-aligned digits); both were closed by new gate checks.
- **`local-test-nested-crates.js`: 6,688 pass, 0 fail** (real pointer and drags, 11 locales). It covers:
  - the 302 − 5 walk-through: hintSlip and the slip pulse → two cubes, then air → the empty tens shelf → a crate into ten boxes → a second crate refused → pack back → crate and box → a handful by holding → the back arrow → stamp → hintType → 287 counts 10…90 → 298 shows hintNest, the pencil and the marks → 297 → solved → Next 0.5 s later;
  - 400 − 136 by drags: a crate onto the ones shelf does nothing; onto the tens shelf it opens; a box onto the ones shelf opens; a cube onto the slip goes on; the marks appear as each package opens;
  - Shift+Space and Delete;
  - then every round of both faces at rest / miss 2 / solved through 320…1366.
- **`visual-qa-activity`: 192 renders pass.**
- **`audit-activity-hierarchy`:** 626 / 0 (apparatus share 0.746 at 704).
- **`audit-settings-efficacy --tool=nested-crates-activity`:** both settings live.
- **Other gates:** `audit-activity-next-delay` passes; content ×11, prose claims, SERP, content tells and route preflight all pass.
- **My own reading of the 360 / 704 / 768 / 1024 renders and the preview:**
  - The first render had the shelves stretched to the pack button's column; they are now top-aligned.
  - The three-kind slip spilled out of the 200 px order column at desktop; cube cells now go in rows of three there.
- **0 lines** in shared cores or `lcs-shell`.

## Live
Deployed 2026-10-28 (commit `aeb7a97f`; mini-tools copied before `deploy.sh`; preview scp'd). `live-verify-nested-crates.js`: **60 pass, 0 fail**.
- All 11 locale pages return 200.
- en/de/sv/fi at 1366 and 390:
  - wrapper 9.891;
  - a crate and a box opened and five cubes on the slip give 2 · 9 · 7;
  - typing 287 marks the tens box wrong and shows the first hint;
  - typing 297 solves the round and shows the success line;
  - the iframe grows with the card.
- The first run failed only its iframe lookup (the first page loads after a deploy are slow; the same happened on #145). curl showed the live pages already embedding `nested-crates-activity.html?v=9.891`, and the rerun was clean.
