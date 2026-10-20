# #44 — Bouw het woord met klankgroepen → DE KLEISLANG, the clay snake (RF.K.2.B, Dutch only)

ORDER row 44 · id `syllable-builder.bouw-het-woord-met-klankgroepen.rf-k-2-b` (kept).

- **Files:**
  - Added: `clay-snake-core.js`, `clay-snake-activity.js`, `clay-snake-activity.html`, `clay-snake-activities.json`.
  - The row left `syllable-builder-activities.json` as text (CRLF kept; the other 11 rows are byte-identical).
  - 0 shared-core lines.
- **Locales:** Dutch only by design.
- **Metadata:** slug, title and intro are frozen. The nl prose is rewritten.
- **Strand chip:** the nl strand chip is overridden to «Fonologisch bewustzijn», as on #42 rijmen. The RF default «Lezen: technisch lezen» is a reading strand.
- **Design:** `designs/044-syllable-builder.md`.
- **Prefix:** `clay-snake` was checked free.

## The apparatus and its invention: A SNAKE OF CLAY THAT IS ALWAYS THE SAME LENGTH
- **The parts exist only where the child chops.** The snake has the same length for every word, so its length tells nothing.
- **The hand:** tap the snake to chop it with the clay knife. A cut closer than 36 px to another cut or to an end is refused, and there are at most 6 pieces. Tapping a seam kneads two pieces back together.
- **Klaar! (Hakken):** the stamp prints the klankgroepen onto the child's pieces, left to right.
  - **Too few pieces:** the last piece carries the rest, with a dotted seam, and the knife pulses above it.
  - **Too many pieces:** the extra pieces stay blank and crumble.
  - **Miss 2:** the word is printed on the snake, the seams glow and the klankgroepen are spoken.
  - **One-klankgroep words** (kat, fiets): Klaar! with no chop is right. On a longer word, Klaar! with nothing done only asks.
- **Plakken:**
  - Klankgroep lumps lie in a tub. With "Extra stukje", a decoy klankgroep from another word joins them. The child drags or taps the lumps onto the board from a start mark.
  - Only true neighbours stick; a wrong joint cracks and springs apart. The decoy is sent back to the tub.
  - Lumps still in the tub trigger a question, not a miss. At miss 2 the first klankgroep locks onto the start mark.
- **Hakken met letters:**
  - The word is printed along the snake, and cuts snap to the letter gaps ("ij" is one letter).
  - A cut inside a klankgroep heals (a miss). A missing seam shows as a dimple; at miss 2 the seams glow.
  - For *bij*, no cut is right.
- **Success:** the pieces close into one smooth snake carrying the word, and a coil goes onto the shelf.
- **Settings:** Niveau (Hakken / Plakken / Hakken met letters), Extra stukje (Uit / Aan), and Letters op de klei (Pas na het hakken / Meteen). Meteen prints the word faint on the snake in Hakken.
- **Keyboard:**
  - On the snake: the arrows move the knife, Enter chops, and Backspace kneads the nearest seam.
  - In Plakken: Backspace takes back the last lump.

## Deviations from the design (each measured or ruled)
- **Tub balance target:**
  - **The design** asked that the tub order solve Plakken in ≤ 30 % of rounds, with the first lump first in ≤ 35 %.
  - **Why not:** for a two-lump word (7 of the 10 rounds), any order is right 50 % of the time by chance. Getting below that needs a bias toward reversed trays, which is itself a tell.
  - **Instead:** two lumps lie in reading order exactly half the time over two passes. Three or more lumps are never in reading order and never reversed, and the decoy's position moves.
- **hintLong:**
  - **The design** said the blank piece "rolls back to the tub".
  - **Why not:** the child's cuts stay on the snake, so that would describe something that does not happen.
  - **Instead** (reviewer's wording): "Dit stukje is leeg: je hebt een stukje te veel. Plak het er weer aan."
- **Own manifest:** the design kept the row in `syllable-builder-activities.json` with its tool repointed. It now has its own manifest, the established recipe since #39, so the shared file keeps only the rows still on the old engine.
- **Not built:** the clay-ball free play between rounds and the end-of-pass coil wobble. The shelf of coils is built.

## Fixes from the build (each found by a render or a gate)
- **On the win, the letters spread over the child's pieces** ("z o n n | e b l | o e m"). The snake now closes into one piece with the word at word spacing, and the seam buttons are gone.
- **The four-lump Plakken row:**
  - At 704 it wrapped onto two lines; the letters are now smaller and the crack gap narrower.
  - At 320 it ran off the board; phone lumps are now tighter, with a 46 px minimum.
- **The whole word** on a Plakken win ran off the board at 320. It now has its own line.
- **Keyboard focus:**
  - **The bug:** `_focusArea` asked *after* the repaint whether focus was in the activity, and by then the repaint had already dropped it. Arrow keys and Enter worked once.
  - **The fix:** the state is now recorded before the repaint. This is the same defect class as #43.
- **The never-repeat rule:**
  - **The miss:** the gate checked the order rule only by random sampling, and with 8–10 rounds a repeated order essentially never occurs by chance. The "may repeat" mutation survived.
  - **The fix:** a deterministic check now feeds the same random stream with the previous order. The same blind spot may exist in earlier rows' order checks; it is recorded for the next touch.

## Gates
- **`verify-clay-snake-core.js`: 787 checks, 0 failures.** It carries its own typed copy of the 28 splits, the letter seams and the decoys. It checks:
  - **Data:** splits match `approved-words-nl.json` (≥ 3 sources); every nl label equals its word; every picture exists; meisje, schoorsteen and tapijt are never used; the Hakken counts are 1×2 / 2×3 / 3×3 / 4×2.
  - **The stamp:** exact for every word × 1–6 pieces, plus the 36 px refuse rule and the 6-piece limit.
  - **Plakken arrangements:** every one (2,872, with the decoy in every place) gives exact joints, decoy handling and verdict, and miss 2 locks the FIRST lump.
  - **Letter seams:** ij is one cell, every inner cut heals, and *bij* is right with zero cuts.
  - **Tub and decoys:** the tub balance holds, and no decoy plus lumps spells a library word.
  - **Also:** the hint ladder, the order rule (sampled and deterministic), strings, and the frozen manifest.
- **`mutate-clay-snake.js`:** 20 of 20 mutations killed. The design's list covers the zero-cut bij, the overflow on the last piece, blank extras, consecutive-only joints, the decoy never sticking, reading order required, inner cuts healing, ij never split, the 36 px rule, no repeated order, and miss 2 locking the first lump. The harness refuses to run on a red clean gate.
- **`local-test-clay-snake.js`:** 979 checks, 0 failures, real pointer, every round of every level. It covers:
  - the flows in the three levels;
  - the settings and the keyboard;
  - a width sweep from 320 to 1366 at rest and done.
- **Other gates:**
  - `visual-qa-activity.js --locale=nl`: 60 renders pass;
  - `audit-activity-hierarchy.js`: 242 / 0;
  - `audit-settings-efficacy.js`: 3 live;
  - the nl content gate, prose claims, SERP copy, content tells, answer rank, route preflight and font shorthand are green.
- **Read by me:** the 28-picture contact sheet; the short miss, the joint cracks, the dents, and the wins at 320, 360 and 704; the preview.

## Review (one agent, Dutch native + pedagogy): applied
- **Confirmed:**
  - all 28 splits and counts;
  - every Level-1 picture keeps its klankgroep count under its common alternative name;
  - no decoy forms a word;
  - the celebration lines and the level and setting names.
- **Required, applied:**
  - **instruction:** it told a Hakken child to knead a right chop shut again;
  - **hintShort:** "nog meer klankgroepen";
  - **hintClap:** "waar de klei oplicht";
  - **aria counts:** label forms, so no "1 stukjes";
  - **prose:** "echte klei" was false.
- **Optional, applied:** hintLong, hintHealed ("midden in een klankgroep kun je niet hakken"), and the prose ending "rolletje".
- **Not applied:**
  - **kat is drawn as a kitten**, so a child may think "katje" (2 klankgroepen). Tapping the picture says "kat", and "poes" also has one klankgroep. The reviewer marked it optional.
  - **The terminology note:** "klankgroep" is paired with "stukje" throughout, as the reviewer advised.

## FROZEN-NOTEs (not changed — metadata is frozen)
- **The title** says "Fonetiek in de kleuterklas". Fonetiek is the linguistic science; the right term is "Fonologisch bewustzijn" or "Klankgroepen".
- **The intro** describes only the Plakken level and does not mention hakken.
