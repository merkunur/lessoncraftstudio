# #69 — Atlas's Fact Files → THE HIGHLIGHTER THAT LIFTS FACTS (RI.K.1, all 11 locales)

ORDER row 69 · id `atlas-fact-files.key-detail.ri-k-1` (kept).
- **Files:** a new `atlas-fact-files-core.js`; `atlas-fact-files-activity.js` and its html are rewritten. The html no longer loads `fact-detail-core.js` (left untouched) and no longer pins `#lcs-root` to 100 % height.
- **Manifest:** in `atlas-fact-files-activities.json`, edited as text. The old rounds/roundsL10n (answer cards) are replaced by a mirror of the core: rounds per level, per locale.
- **Metadata:** slug, title and intro stay frozen in en, de, fr, es, pt, it and nl (gate hash `57745b3d…`). sv, da, no and fi are new: slug, title, intro, GRADE_OVERRIDE '1'.
- **Shared code:** 0 lines in shared cores or lcs-shell.
- **Legacy gate:** `verify-fact-detail-core.js` exits 0 with a pointer. `local-test-atlas-fact-files.js` is rewritten.
- **Design:** `designs/069-atlas-fact-files.md`. CSS prefix `af-`.

## The apparatus and its invention: the answer is found, not chosen
- **Find the answer (RI.K.1):** a two-sentence fact card (library picture, punched paper) and a question. The child swipes a highlighter across the words (snapping to whole words, across the line break; a tap marks one word; keyboard ← → with Shift, Enter, Escape). The caught words drop live into the question's own sentence on Atlas's file card ("A penguin lives ___."). Check: right = the highlight ends on the answer's last word and starts inside the answer — the card then reads the whole authored sentence and slides into the drawer; an echo (the whole answer plus more of the same sentence) is accepted and the extra words peel away; anything else is a miss and the card reads the wrong words back ("A penguin lives black wings.").
- **Two questions per fact:** one answered in each sentence, each the other's trap. A pass asks the sentence-1 question in 4 or 5 of the 9 facts, and the next pass asks the other question of every fact — so "grab the end of the second sentence" never works.
- **Fill the fact file:** an animal's five sentences go into five drawers (eats, lives, moves, is covered in, babies — the locale's own labels). No sentence holds its drawer's word, so sorting is reading, not word-matching. A filed strip shrinks to its key detail inside the drawer. Then three claims: "in the file" or "not in the file"; the claim that is not in the file sits at each place 2–3 times a pass.
- **Word-bank file:** the same five sentences with the key detail as a gap; the bank holds the five details plus one trap from another animal's file; then the child picks three favourite sentences, written out in the order picked.
- **Settings:** Level (Find the answer / Fill the fact file / Word-bank file); Pictures on/off (off = only the words count).
- **Misses:** Find — miss 1 the card reads the words back ("Read the card. Does it answer the question?"); miss 2 the answer sentence stays bright, the other fades, and the word just before the answer turns gold. File — miss 1 the strip slides back with "Is that fact about…"; miss 2 the right drawer glows; claims — the hint names the file. Bank — the hint; miss 2 the right sentence glows (or "That word is not in this text." for the trap).

## Content decisions (beyond the design)
- **Every answer span verbatim in its sentence, in every locale** (the shipped nl answers "lang" / "zwart" were not in their own texts — a highlighter could never find them). Every fact, question, frame and span authored per locale.
- **Key details never start a sentence** (a capitalised tile would give its frame away): "covered" sentences read "It has soft fur." and "moves" sentences keep the verb as the detail ("It ___ on strong back legs.").
- **The duck file is a hen** (every library duck is a duckling — RULINGS): seeds and bugs, a coop, walks and flaps, soft feathers, chicks.
- **Two-answer traps removed:** the armadillo's eating verb ("slurps up") no longer says "digs" like its moving sentence; its babies sentence no longer repeats the burrow; the turtle's trap tile no longer equals its own answer in the locales where turtles and owls both hatch from eggs.
- **Drawer labels checked against every sentence** (it "Casa" was in every home sentence → "Dove vive").

## Native + pedagogy review (one reviewer over every fact, question, frame, span, file sentence, claim, label, string, the new metadata and the prose of 11 locales)
- **MUST, the ten non-English locales — two tiles fit one gap:** the armadillo's babies detail was a place ("unter der Erde", "sous la terre", "maan alla"…), and a place also fits the home sentence ("Sein Zuhause ist unter der Erde"). It is now "often four at a time" («zu viert», «par quatre», «neljä kerrallaan»…). The rabbit's "in a nest" fitted the home gap too: now "born blind" (fr keeps «des lapereaux»).
- **MUST, nl/da/sv/no:** the rain question in verb-second order could read "What makes rain wet?" — now "What becomes wet from the rain?".
- **SHOULD, applied:** de/nl babies drawer «Junge» / «Jongen» read as "boys" → «Tierkinder» / «Jonkies»; de instruction «die die Frage beantworten»; da «på kortet» (not «i kortet») everywhere; es «Hogar» (not «Vivienda»), «lame»; it the answer card is a «cartellino» (the «scheda» is the file), «lecca formiche e scarabei» («scarafaggi» are cockroaches); pt «lambe», the turtle's home «na água e na beira da água»; fr prose «ne soit pas toujours»; fi «taapertaa».
- **Checked, kept:** "A penguin has black wings / lives on cold ice" is a K-level generalisation, kept in every locale.

## FROZEN-NOTEs
- **Intros:** the en, de, fr, es, pt, it and nl intros describe the old tap-a-card game.

## Gates (local, all green)
- **verify-atlas-fact-files-core:** 22128 pass, 0 fail. It covers:
  - Find: every fact in 11 locales tokenized by the gate itself (both spans verbatim once in their own sentence, one-gap frames), EVERY possible highlight [i ≤ j] graded by the core against the gate's rule, the trap a miss read back on the card, the bare last word right with the whole span on the card; 2,000 seeds: 4 or 5 sentence-1 answers a pass, the next pass asks the other question;
  - File: spans verbatim, never first; no sentence holds its drawer's word; every strip × drawer; the claims (the NOT claim must say something the text never says); judging; false-claim places 2/3/2;
  - Bank: frames rebuild their sentences; every tile × frame; the trap fits nothing and is not in the text; picks and summary;
  - hints and help per level; texts and strings ×11; no digits; fr spaces; pictures; floors; the manifest mirror and the frozen hash.
- **mutate-atlas-fact-files:** 16/16 killed. "A claim not in the file that IS in the text" survived the first run (the gate only checked a verbatim match); the gate now requires the NOT claim to carry a word the text never uses.
- **local-test-atlas-fact-files:** 2415 pass, 0 fail. Real pointer: every fact of two passes, every file and every word bank in all 11 locales (swipes, taps, drags, the echo, the empty check, Pictures off, claims, picks), plus a width sweep at 320–1366. The first runs found: the swipe caught only its first word (the card was rebuilt under the captured pointer — the stripe now updates in place); the echo's extra words never peeled (they do now); words below the 44 px tap height on phones (line-height now ≥ 44 px); the Check button 1–27 px below the fold at 320 on the longest de/nl/da/fr facts (tighter tiny layout, picture at its 64 px floor).
- **Other audits:** visual-qa en and fi, 54 renders each across all 9 rounds, passed; audit-activity-hierarchy 218/0; audit-settings-efficacy 2 settings live; both preflights pass; verify-activity-content ×11 pass.
- **My own read:** the contact sheet of every picture (the duck file became a hen); the 360, 704 and 1024 renders (the miss-2 gold signpost, the filled drawers and a claim in de, the three picked facts) — it found the pick number covering the answer at 360 (frames now keep room on their right).

## Live (2026-10-21)
- Commits `721cdccc` and `5172d001` (the round id names the fact, so the next pass — the other question of the same facts — reads as the same items in a new order; activity `?v=10`, wrapper 9.810), deployed (`git pull` → cp the four mini-tools files → `deploy.sh`), preview webp uploaded first.
- `live-verify-atlas-fact-files.js`: 59 pass, 0 fail on the second run (the first run after each deploy raced the page cache). It covers all 11 pages returning 200, plus en/de/sv/fi at 1366 and 390: the other sentence's answer highlighted is read back as a miss with its hint; the answer highlighted reads the authored sentence; a fact-file strip filed shows its key detail; wrapper 9.810; the iframe grows with the card.
- Variety probe en/sv/fi: 9 distinct facts, reshuffled per pass.
