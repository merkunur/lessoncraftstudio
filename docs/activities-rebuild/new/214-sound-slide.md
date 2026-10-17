# New #214 — The Sound Slide (RF.1.2.d)

Backlog entry #214 of the worksheet→activity coverage plan (`NEW-ORDER.md`). Grade K · Reading: Foundational Skills. Planned files: `sound-slide-core.js`, `sound-slide-activity.js`, `sound-slide-activity.html`, `sound-slide-activities.json` (id `sound-slide.play.rf-1-2-d`). Start with `node scripts/new-activity.js --num=214`, then `NEW-RECIPE.md`.

## The skill
Segment a spoken word into its sounds, one token per sound, count the sounds, and see that two letters can make one sound.

## The apparatus and its invention
THE TRAY THAT GROWS ITS WALLS. A library picture over ONE long open tray; a pile of round tokens below. The child says the word slowly and slides tokens up into the tray, one per sound; each token drops a thin wall behind it, so the tray becomes boxes as the child goes — the number of boxes is the child's answer, never shown in advance. Check: the boxes flip to show the spelling. Right: a box holding two letters for one sound (en sh/ck/ch, de sch/ch, nl ng/ch, fr ou/ch, sv sj/ng…) shows them under ONE curve, and the boxes light left to right. Miss 1, too many (one token per LETTER for "ship"): the two letters join under one curve and the extra token is pushed back out to the pile, its wall dissolving. Miss 1, too few: a box holding two sounds cracks in two and an empty box opens. Miss 2: the walls are pre-drawn and the child refills them. COUNT setting (K-329): after the check the boxes show dots, never letters. FIRST-SOUND-GIVEN setting (K-330): the first token and its letters are already in place.

- **Misconception the apparatus makes visible:** One sound per letter (four sounds for "ship"), and blending two sounds into one.
- **Pictures:** animals, farm-animals, kitchen-tools, classroom, fruits, toys — nouns in approved-words-<locale>.json, each with a NEW hand-authored phoneme split (~20 words × 11 locales).
- **Settings:** Words: 3 sounds / 3–4 sounds with digraphs · Show: letters after check / count only
- **Rounds:** 9 words per pass from the authored per-locale list: 3 three-sound words, 3 four-sound words, 3 words with a two-letter-one-sound grapheme (setting 2 only); never more than half the pass with letters = sounds; one right count.
- **Worksheet types it covers:** K-318, K-329, K-330
- **Distinct from:** Coco's Sound Boxes asks where a sound sits; the CVC Builder spells. This is segmentation and counting.
- **Build risk:** No phoneme data exists in the repo: each locale needs a split table checked by the native reviewer (fi/es/it nearly 1:1; en/fr/da/nl/de digraph-heavy; da uses the K-1 orthographic policy pool). Audio is a bonus only.

## Before building (the LAW's four questions — answer them here at build time)
1. Would a 5–8-year-old choose it again?
2. Would a teacher put it on the board?
3. Would a parent trust it?
4. Is it creative — what is the one-sentence invention?

## Layout
(at build: wide ≥ 560 / stack; pictures ≥ 96 px at 704 and ≥ 64 px at 360; taps ≥ 44; Check above the 360×740 and 320×640 fold.)

## Gates
(at build — NEW-RECIPE.md §3.)
