# #34 — Comparing Length → THE DROP-DOWN STANDS (K.MD.A.2)

ORDER row 34 · id `choice-board.compare-length.k-md-2` (kept).
- **Own files:** `drop-stands-core.js`, `drop-stands-activity.js`, `drop-stands-activity.html`, `drop-stands-activities.json`.
- **Removed:** the row left `choice-board-activities.json` (16 rows remain) as text, with CRLF kept. The shared engine's `compare-length` branch is now unreached.
- **Shared code:** 0 lines in any shared core.
- **Metadata:** slug, title and intro are frozen in all 11 locales. No grade change.
- **Prose:** rewritten ×11.
- **Design:** `designs/034-choice-board.md`.

## The apparatus and its invention: THE STANDS LIE, THE FLOOR DOES NOT
- **Height rounds:** the same library picture at 2–4 sizes, on folding stands of different heights. In 8 of 12 pairs the stands make the wrong answer look right.
- **Length rounds:** the things lie on rails at different distances from a start wall.
- **The hand:**
  - drag a picture down → its stand folds (clack-clack);
  - drag it up → the stand unfolds;
  - a tap on the stand (below the picture) folds it;
  - drag a lying thing left → it slides to the wall;
  - tap a picture → choose it;
  - keyboard: Arrow keys and Space.
- **Check:** every stand folds and everything slides to the wall. A golden level beam glides in and rests on the TRUE tallest top or longest end, and each shorter one shows its coral gap up to the beam.
- **Misses:** miss 1 says "look where the beam rests / stops". Miss 2 puts a gold halo on the right one ("reaches the beam" / "furthest from the beam"). The pictures stay aligned after a miss.
- **Pictures:** every one is placed by its ink box, measured from the file, so its bottom sits exactly on the plate or floor and its left end exactly at the wall.
- **Settings:**
  - Compare: Two things / A whole row (tallest, longest, shortest, biggest).
  - Start: On stands / On the floor (everything lined up, for the youngest).

## Design fixes found by the gate (applied, both pedagogical)
- **Pairs.** The design claimed the right answer was 6 left / 6 right, but its own table gave 5 left / 7 right. P12 (corn) is mirrored, and the lure is kept.
- **Rows.** The design balanced the answer slots only for the unmirrored pass. Reversed on alternate passes, slot 1 answered 5 of 9 rows (56 %).
  - R3, R5 and R9 were re-placed, so both orientations stay at 3 of 9 or fewer per slot.
  - Every lure is kept, and the naive judge is still right only in R2 and R5.

## Gates
- **`verify-drop-stands-core.js`: 2,710 checks.**
  - The design tables, re-typed.
  - Every ink box re-measured with sharp.
  - Lying things lie flat (w ≥ 2.5 h) and standing things stand.
  - Its own naive judge (tops as they stand) is right in exactly the 4 unlured pairs, and in ≤ 2 of 9 rows.
  - The beam is on the true extreme; on shortest questions, the biggest gap is on the answer.
  - Miss 1 / miss 2 / halo, and "on the floor".
  - The order over 10,000 seeds plus a same-dealer check; the first pass is shuffled.
  - The stage at 280–1100 px.
  - Strings ×11; "shorter" is split into height and length in 10 locales.
- **`mutate-drop-stands.js`: 19/19 killed.**
- **`local-test-drop-stands.js --locales=all`: 517/0.**
  - Real drag down and up, the stand tap, the wall slide.
  - The beam measured in pixels on the true top and end.
  - The sweep at rest and revealed, including a press hit-test.
- **visual-qa:** 72 renders.
- **Hierarchy:** 308/0.
- **Settings efficacy:** 2 live.
- **Content gates:** PASS.

## Traps
- **Folded stand buttons failed the 44 px tap floor.** A folded stand is 4 px tall. The stands are now drawings; a tap below the picture (on its stand) folds it, and the column's aria label carries the stand state.
- **An automatic "stands spring back up" after a win** erased the evidence while the bubble said "on the same floor…". It was removed; after a win everything stays aligned under the beam.
- **The folded slab was drawn over the trunk** (stand above picture). It is restacked: picture above, stand below.
- **Another bash heredoc ate backslashes.** Edit scripts are written with the Write tool.

## Review (one agent, native ×11 + pedagogy) — applied
- **⭐ An answer tell in the stands themselves (reproduced, then fixed).** In every staged pair the right answer stood on the lower stand (taller/longer) or the higher one (shorter): "pick by stand height" won 10 of 12 pairs and 7 of 9 rows, without comparing anything.
  - The design's gate checked "pick the higher/lower top" but never "pick by stand".
  - **Fix:** P2, P6, P9, P11 and R1, R3, R4, R6 put the right one on the "wrong" stand. All lures are kept (8 lured / 4 unlured pairs; the naive judge is still right in ≤ 2 rows).
  - **Result:** the stand judge now wins 8/12 pairs (no better than the lure itself) and 3/9 rows.
  - The gate asserts both, and there are 2 new mutations.
  - The phone length layout now scales by the rail LESS the wall and the beam, so a full-length thing on a 40 offset plus the beam still fits.
- **"Picture … higher" reads as "placed higher"** (the very lure).
  - de now says größer / kleiner / am größten / am kleinsten.
  - fr / nl / sv / da / no height prompts add "when all stand on the floor".
- **Prose claims:**
  - "only its length or height differs" was false (uniform scaling) → "the child compares a thing with itself".
  - "the two kinds of shorter" was English-only → the two words are named in each locale.
  - howToPlay names the row words.
- **Wording:**
  - en: instruction (zeugma), "farthest".
  - nl: krukje everywhere (instruction, setting, aria), "Wat is…", "elk korter ding".
  - fr / es / fi: prose fixes.
  - no: the prose says 1. trinn (LK20 is a school curriculum).
- **FROZEN-NOTE (not changed):**
  - **no:** the title says Barnehage and the intro says "LK20 for barnehagen", but barnehage follows the Rammeplan, not LK20.
  - **de:** the intro says Kindergarten, while the Lehrplan is a Grundschule curriculum; the title says größer, which now agrees with the strings.
  - **fr:** the title says "plus grand".
  - **fi:** the intro says "OPS 2014" for esiopetus.
