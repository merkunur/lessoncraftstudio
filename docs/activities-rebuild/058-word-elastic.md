# #58 — Build the CVC Word → THE WORD ELASTIC (RF.K.3, all 11 locales)

ORDER row 58 · id `cvc-builder.build-cvc-word.rf-k-3` (kept).

- **Files:** new `word-elastic-core.js`, `word-elastic-activity.js` and `word-elastic-activity.html`.
- **Manifest:** the row stays in `cvc-builder-activities.json`, where only its `tool` is repointed. The other two rows (#110 build-blend-word and #111 magic-e) are byte-identical and keep the old engine; their gates still pass.
- **Shared code:** 0 lines changed in shared cores.
- **Metadata:** en keeps its frozen slug, title and intro. The other ten locales get a new slug, title and intro; the es/it/pt/fi ones never promise three-letter or CVC words.
- **Grade:** 1 for all ten (Klasse 1 / groep 3 / 1. klasse / åk 1 / 1. trinn / 1.º / classe prima / 1º ano / CP / 1. luokka).
- **Strand:** nl/da/no/es/it/pt/fr/fi get a writing strand. The child spells here, and the RF default chips name reading comprehension.
- **Prose:** rewritten in all 11 locales. Every example is a real round.
- **Design:** `designs/058-cvc-builder.md`. CSS prefix `wel-`.

## The apparatus and its invention: THE WORD IS AN ELASTIC
- **The band.** A coral elastic runs from a peg to a teal knob. The band runs from the peg to the knob and is as long as it is stretched.
- **Stretching.** Drag the knob (or press the arrow keys) and one bead pops out per sound, with a rising *plip*. In fixed modes the band stops at the word's bead count.
- **Placing letters.** Tap or drag letter tiles onto the beads. Tapping a filled bead sends its letter home.
- **The snap.** Check, or letting the knob back past half-way, snaps the band.
  - Every right bead clacks home.
  - A bead whose letter is not the sound in that place is kicked up on a loop and wobbles.
  - On success the beads clack into one word tile, a tag flies onto the picture, and the picture joins the 9-slot word shelf.
- **Misses:**
  - Empty beads: a hint, no miss.
  - Miss 1: the kick.
  - Miss 2: a place arrow under the kicked bead, "Listen for the first/middle/last sound", and the tray dims every tile except two: the right one and the chosen one.
  - Miss 3: a ghost letter to copy.
- **Clues (7):**
  - letter beads;
  - first sound given (locked teal bead);
  - one sound missing (a tray of 4; the missing bead is middle, last or first in the ratio 4 : 3 : 2 per nine);
  - word bank (four printed words);
  - write it (the locale's keyboard, with team keys in the teams setting);
  - stretch it yourself (no stops; typing never adds a bead, the count is the child's own):
    - too many beads → "One bead too many";
    - too few → a slack gap where the sound is missing;
  - blend and find (a lettered band; dragging the knob home lights each bead in turn; pick 1 of 3 pictures).
- **Words (2):**
  - **simple:** one letter per sound; 3 beads, or 4 in es/it/pt/fi.
  - **teams:** a team shares one pill bead.
    - fi: long sounds are a doubled letter in two beads, played stop-less.
    - fr: complex sounds plus a quiet bead that shows silent letters but is never a sound.
    - da: none, so the setting is hidden.

## Deviations from the design (each measured or ruled)
- **Word lists come only from the banks.** No split is authored; the gate checks every split against its `sound-boxes-bank-<loc>.json` row.
  - The decorated `weather/sun` is re-pointed to `beach/sun` in every locale.
  - Refused drawings stay out: the lake, the carton egg, the cone, the colour swatch *Rot*, the lip, *Hose*, *chuva*, *muna*, *poro*.
- **en cup's look-alike trap is b, not the design's q.** q spells /k/, which the design's own trap rule forbids.
- **One letter of a team is never "the wrong sound".** k on the ck bead, t on the tt bead or u on the uh bead makes the right sound. The engine now answers with "Two letters can make one sound" at once.
- **German Schwein** leaves the teams set (two teams overflow the tray).
- **French "simple" set** = bol, sac, bus, clé, vélo, sel + lune. After the review, coq, sofa and râpe left, so the transparent set alone was 6. *lune* (the most regular mute-e word) is the seventh.
- **Milk and juice are refused in every locale** (de *Milch*, nl/no *melk*, es *leche*, pt *suco*, fi *mehu*). Both are drawn as plain bottles, which a child names "bottle" (the row 56 finding). Read on the 1024 render, not caught by any gate.
- **Phones:**
  - The knob hangs under the band's end on its own line, with a short coral tail, so up to six 44 px beads fit at 320 px. It is still dragged sideways.
  - In keyboard modes Check sits above the keyboard.
  - At 320 px the picture is 84 px (design 96; floor 64) and the tiles are 46 px.
- **Bead size and cap:** the beads size themselves to the band's room, never below 44 px. The stop-less band is capped at the beads that fit (always at least the word's count + 1).
- **Typing never adds a bead** in "stretch it yourself", so the count is the child's own.
- **Blend and find:** the picture is chosen and then checked. Closing the band is optional and reads the beads aloud where TTS exists.

## Native + pedagogy review (one reviewer, all 11 locales) — every required fix applied at the source
- **Team-letter traps (en, de, sv, no):** the engine route above. en/sv/no `hintWrong` now says "does not belong in that place".
- **de:**
  - *Kleid* (its final d is /t/) and *Elf* (also "eleven") are out.
  - *Bär*'s e trap → i (ä and e sound the same).
  - *Huhn* and *Hahn* never share a blend or a bank.
  - `hintOrder` reworded.
- **es:** *taza* is out (z = s in Mexico). *gallo* and *pollo* never share a bank.
- **pt:** in Brazil a final o is /u/ and a final e is /i/, so copo and lobo get trap a instead of u, and chave gets o instead of i. `hintPull` → «puxador».
- **fr:** *râpe* (â = a), *coq* (the q is not heard) and *sofa* (children say canapé) are out. `hintWrong` reworded.
- **sv / no:** the teams label → «Två bokstäver – ett ljud» / «To bokstaver – én lyd» (ring, säng and sau are not doubled consonants).
- **fi:** `hintTeam` and `pLong` now say what Finnish teaches: a long sound is two letters in two beads.
- **Polish applied:** de, nl and da `hintTooMany`; it `hintTeam`; fi «Lyhyet äänteet».
- **Not applied — the reviewer misread:** Danish already hides the Words setting.

## FROZEN-NOTEs
- **en intro:** it says "three-letter word" and "tapping the right letters" and talks of decoding. The activity encodes (spells), and its letter-team words have 4 letters.
- **en title:** "Build the CVC Word" does not cover the team words.

## Gates
- **`verify-word-elastic-core.js` (12,521 / 0)** has its own ground truth. It reads the banks itself and checks:
  - every split against its bank row;
  - pictures, labels and refusals;
  - its own alternative-spelling table, including the Brazilian final o/e;
  - traps, and the team's single letters in the tray;
  - trays never reading the word in order, and per-tile slot shares;
  - the missing-bead pattern;
  - the blend and bank choices: one right picture, a one-letter neighbour, no confusable pair;
  - the state machine;
  - the deals;
  - every string and hint;
  - the manifest mirroring the core;
  - frozen en metadata;
  - the other two cvc-builder rows untouched.
- **`mutate-word-elastic.js`:** 19 / 19 mutations killed (the design's 12 + 7 found in this build).
- **`local-test-word-elastic.js` (7,239 checks):** a real pointer plays every beads round of every Words setting in 11 locales at 704. The 4,220 interaction checks cover:
  - the knob dragged out (it stops at the count);
  - an empty Check, a trap kicking exactly its bead, and the right tile dragged in;
  - the snap;
  - first / missing / bank / write;
  - stretch (typing first adds nothing, too many, let back);
  - blend;
  - the shelf.

  The 320–1366 sweep (3,019 checks) covers every Clue × Words, at rest and after a miss. A full run once timed out on a busy Check; every locale passes alone, and the wait is now 15 s.
- **Other checks:**
  - `visual-qa-activity.js` passes in en, de, fi, fr and sv;
  - `audit-activity-hierarchy.js` 266 / 0;
  - `audit-settings-efficacy`: both settings change the board;
  - `preflight-activity-routes`, `preflight-indexable-routes` and the 11 `verify-activity-content-*` gates are green.
