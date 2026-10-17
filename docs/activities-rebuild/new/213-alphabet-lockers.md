# New #213 — The Alphabet Lockers (READINESS alphabet-order)

Backlog entry #213 of the worksheet→activity coverage plan (`NEW-ORDER.md`). Grade K · Reading: Foundational Skills. Planned files: `alphabet-lockers-core.js`, `alphabet-lockers-activity.js`, `alphabet-lockers-activity.html`, `alphabet-lockers-activities.json` (id `alphabet-lockers.play.alphabet-order`). Start with `node scripts/new-activity.js --num=213`, then `NEW-RECIPE.md`.

## The skill
Know the order of the alphabet (before, after, between), fill gaps, and put words in ABC order by the first letter and, when first letters match, by the second.

## The apparatus and its invention
THE LOCKER THAT ONLY SHUTS BETWEEN ITS NEIGHBOURS. A corridor of lockers runs the locale alphabet as ONE snake (rows of 7–10 at 704, of 5–6 at 360; a bend arrow joins row ends so adjacency is never broken). Closed doors show their letter; 3 or 6 doors stand open and empty. Letter tiles wait in a tray. Drag a tile into an open locker: if it is the letter between the two closed neighbours, the door swings shut with a click and the latch lights. Miss 1: the tile bounces back and the two neighbouring doors light. Miss 2: the doors from the nearest closed letter open one by one along the corridor, ending on the empty locker (the order walks itself to the gap). Success: when every door is shut, a light runs the whole corridor A→Z (Å/Ä/Ö, Æ/Ø/Å, Ñ included). WORD MODE (G1-245/262–264): 4–6 picture-word cards; each card dropped on the corridor slides to the locker of its FIRST letter and hangs there; when two cards share a locker, that locker opens into a small second corridor and the two slide again to their SECOND letters. A card is accepted only at its own locker (a card dropped by last letter or by length slides off). Finally the cards drop into the answer row in corridor order — the order is read off the corridor, never guessed. DOT-HOP mode (K-309, G1-426): the closed doors are tapped in order to light the corridor; a skipped letter keeps its door dark. Free play: run a finger along the doors and they open in turn.

- **Misconception the apparatus makes visible:** Knowing the alphabet as one sung blob ("elemenopee") instead of positions between neighbours; in word mode ordering by length, by last letter, or giving up when two words start alike.
- **Pictures:** none (lockers and letters are apparatus and content)
- **Settings:** Mode: fill the gaps / hop in order / words by 1st letter / words by 2nd letter · Letters: capitals / lowercase · Gaps: 3 / 6
- **Rounds:** Letters: 9 rounds; every third of the alphabet gets a gap each round; the locale-specific letters (Å Ä Ö / Æ Ø Å / Ñ) are gaps in ≥ 2 rounds; tray shuffled so each tile visits every tray slot across a pass. Words: 9 sets of 4–6 library picture words (labels from image-vocabulary.js, lower-cased per locale), each 2nd-letter set has exactly one pair sharing a first letter; one right order.
- **Worksheet types it covers:** G1-245, G1-262, G1-263, G1-264, G1-426, K-223, K-309
- **Distinct from:** No alphabet-order activity exists (the alphabet maze is a deck screen).
- **Build risk:** Per-locale collation is the content: sv/fi …XYZÅÄÖ, da/no …XYZÆØÅ, de ä=a ö=o ü=u ß=ss (DIN 5007-1), es ñ after n (ch/ll not separate since 2010), nl ij sorted as i+j. Word mode refuses labels whose first letter is ambiguous in that locale (nl ij-words) — one reviewer per locale.
- **Grade span (settings):** K (word mode: 1)

## Merged into this instrument (cover each as a setting or round set)
- grade 1 "The ABC Rail" (abc-rail): Put words in alphabetical order by the first letter, and by the second letter when the first letters are the same. — A RAIL WITH LETTER STOPS: the locale alphabet runs along a rail (26, or 29 with å ä ö / æ ø å). Word cards hang on hooks; dragging a card to the rail makes its hook slide to the stop of its FIRST letter. When two cards land on the same stop, that stop opens into a small second rail for the second letter and the cards slide again. When all cards hang, they drop into the answer row in rail order and the child confirms. A card hung by the last letter or by length will not slide to that stop.

## Before building (the LAW's four questions — answer them here at build time)
1. Would a 5–8-year-old choose it again?
2. Would a teacher put it on the board?
3. Would a parent trust it?
4. Is it creative — what is the one-sentence invention?

## Layout
(at build: wide ≥ 560 / stack; pictures ≥ 96 px at 704 and ≥ 64 px at 360; taps ≥ 44; Check above the 360×740 and 320×640 fold.)

## Gates
(at build — NEW-RECIPE.md §3.)
