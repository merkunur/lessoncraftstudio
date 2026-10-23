# #75 — Daisy's Plate Stack → THE ENDING THAT ARRIVES WITH THE SECOND PLATE (L.K.1.c, all 11 locales)

ORDER row 75 · id `daisy-plate-stack.plurals.l-k-1-c` (kept). Design: `designs/075-daisy-plate-stack.md`.

## Files and wiring
- **New files:** `mini tools/plate-stack-core.js`, `plate-stack-activity.js`, `plate-stack-activity.html`. CSS prefix `ps-`.
- **Pictures:** through `lcs-pictures.js`.
- **Manifest:** the row stays in `daisy-plate-stack-activities.json`.
  - `tool` is repointed;
  - `params` became a mirror of the core;
  - en/de/fr/pt/it/nl slug, title and intro are frozen (gate hash `2e0b1e93…`);
  - es/sv/da/no/fi slug, title and intro are new.
- **Route:** `GRADE_OVERRIDE` '2' for es/sv/da/no/fi, the same as the five siblings; `ACTIVITY_WRAPPER_VERSION` 9.816.
- **Legacy gates:** `verify-plural-noun-core.js` and `local-test-daisy-plate-stack.js` exit 0 with a pointer. `plural-noun-core.js` stays on disk, unused.

## The invention: the slot opens with the second plate
- **The ticket:** it shows how many the order needs (fi: dots only).
- **The holders:** a tap on the pile lands a plate on a stepped serving shelf, carrying the round's library picture. Animal customers (and the elf) sit on stools on the stepped counter, so nothing living rides a plate. Five ghost holders mark the steps.
- **The word:** it stands on a bench as letter tiles: stem + ending slot.
  - With ONE holder the slot is shut. In it/sv/fi the singular's own last vowel sits in it (barattol|o).
  - The SECOND holder opens it, the vowel lifts out, and an ending tile is needed.
  - Back to one, the ending must come off; a tile left on rattles.
- **The tray:** three tiles — the right ending, another REAL ending of the locale, and the flip tile. No invented misspelling is ever offered.
  - A word that changes itself (knives, mice, Gläser, messen, ratones, kupit) has no slot: its card flips.
  - A word that stays the same (sheep, Löffel, glas, kiwi, radis) takes the empty tile.
  - A hump on a tile means that ending adds a heard beat to THIS word.
- **Levels:** first words · two contrasting endings · words that change · back to one · sentences with a live gap. Answer: tiles / Write it, where the keys spell the ending.
- **Misses:**
  - An empty Check is a hint, no miss.
  - Wrong count: the ticket pulses.
  - Empty slot: the slot pulses.
  - Wrong ending: beat dots appear when the syllable counts differ, otherwise "say it slowly" (fr: look at the end — s and x are silent).
  - Unflipped changer: "the word itself changes".
  - Back to one with the ending still on: it rattles.
  - Miss 2: the right tile rises with a ring.

## Data
- **Source:** every pool is built from the library's own [singular, plural] pairs (`image-vocabulary.js` through `mini tools/pictures/*.json`; scratchpad `ps-build.js`) and classified by the plural's shape. Nothing is spelled by code.
- **Refused:**
  - nl appel, sinaasappel, aardappel, wortel (two accepted plurals: a "wrong" tile would build a real word);
  - de Lauch (mass noun), Kürbis (only s-doubling, not a change), Kohl (the pair is Kohl → Kohlköpfe);
  - da skræller, it cocco, pt pinguim, es pelador/batidor (reviewer);
  - uncountable "same plural" pairs (corn, maïs, milho) and the vocab defects es Elote→Elote and fi Maissi→Maissi;
  - en mango, tomato, potato (their -es adds no beat).
- **Pictures:** every one was opened on a contact sheet. Banned everywhere:
  - mango (reads as a peach) and squash (reads as a pear);
  - the maple leaf (not food);
  - a plate (on a plate);
  - pot, pan, toaster, kettle (cookware on plates).

## Native + pedagogy review (one reviewer over every string, pair, sentence, title and paragraph of 11 locales)
- **MUST, en source inherited ×10:** the flip class said "does not take an ending, it changes inside". That is false for knives/Gläser/messen/ratones/kupit, which DO take an ending and also change spelling, and it was harmful where the refused tile is the one a teacher accepts (nl/es/da/fi).
  - Now "An ending alone is not enough here. The word itself changes." ×11, which is true for every flip word: mes+en = "mesen", not "messen".
  - The flip tile on a regular word says "only an ending is needed" (not "stays the same", which would be false for cup → cups).
  - The flip tile on sheep says "stays the same".
  - learningGoals[0] became "usually changes".
- **MUST, en source:** one apparatus had two names (stand / shelf) → "shelf" ×11 (sv "ställning" = scaffold).
- **MUST, it:** the singular already has a desinenza; the strings now say the desinenza is swapped (nOne, hNoEnding, okAdd, hStillOn, okBack, okSame).
- **MUST, fr:** "terminaison" → "marque du pluriel" (CP/CE1); hWrong no longer appeals to sound (s and x are silent); the flip class is "-al → -aux, sa fin change".
- **MUST, intros:**
  - es/sv/da/no/fi said the WORDS are flipped; now it is their card that turns;
  - sv named -or, which no word in the data uses;
  - fi named only -t; it now says -t / -et.
- **SHOULD, applied:**
  - de «Bring mir bitte», nl «Breng me», it «Portami» / «vengono a pranzo», pt «se sentam», sv «kommer och äter lunch»;
  - pt «De quantos»; da okSame; no word order; fi dot-ticket hints; es level name «Palabras que cambian al escribirse».

## FROZEN-NOTEs (for the operator; not changed)
- **en intro:** the frozen intro still describes the old sentence-and-chips activity.
- **de/fr/pt/it/nl intros:** "online üben" style; still true.
- **nl title:** «Margriet» is not the activity's name (Daisy).

## Gates (local)
- verify-plate-stack-core 7748/0 · mutate-plate-stack 19/19.
- local-test-plate-stack 2662/0: every round of every level × 11 locales by real clicks, every miss path, Write it, settings, the width sweep.
- visual-qa ×11 · hierarchy 380/0 · settings 2 live.

## Traps paid for
- **A class name must be TRUE of every word in the class.** "Changes inside" was true for 2 of 6 English flips; the source wording infected ten locales.
- **A word that already reads as its plural (sheep) makes "the wrong tile does not build the plural" vacuous.** The rule there is "Check refuses it".
- **A gate that asserts the core's own limit (`C.MAXH`) marks its own homework.** A sixth-holder mutation survived until the gate said 5.
- **Plates stacked straight up a pole hide the pictures under the plate above.** A stepped shelf keeps every picture readable.
- **An open slot sized to its answer gives away s vs es.** The empty hole is always two letters wide.
