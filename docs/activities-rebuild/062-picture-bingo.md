# #62 — Bingo's Word Hunt → BINGO'S PICTURE CARD (RF.K.3.d, all 11 locales)

ORDER row 62 · id `bingo-word-hunt.read-match.rf-k-3-d` (kept).
- **Files:** new `picture-bingo-core.js`, `picture-bingo-activity.js` and `picture-bingo-activity.html`.
- **Manifest:** the row stays in `bingo-word-hunt-activities.json`, edited as text. `tool` is `picture-bingo-activity`, `task_template` is `picture-bingo`, and params mirror the core (calls per level per locale).
- **Metadata:** en and fr slugs, titles and intros are frozen; the gate checks them by hash. de, es, it, pt, nl, sv, da, no and fi are new: slug, title and intro. Grade K, strand Reading: Foundational Skills.
- **Shared code:** 0 lines in shared cores or lcs-shell.
- **Prose:** written in 11 locales. Every example is a real card or round, checked against the core.
- **Legacy:** `verify-word-match-core.js` and `local-test-bingo-word-hunt.js` exit 0 with a pointer when the row runs picture-bingo.
- **Design:** `designs/062-bingo-word-hunt.md`. CSS prefix `pbg-`.

## The apparatus and its invention: A CARD OF LOOK-ALIKE WORDS THAT TURNS INTO A PICTURE CARD
- **The booth.** Bingo, the library dog (`farm animals/dog`, never a call picture), calls a picture on a call card. A setting adds the picture's first letter on a tab.
- **The card.** A bingo card of look-alike words. The child puts a chip on the word that names the picture, by tap or by dragging the tray chip, then presses Check.
  - **Right:** the square flips into its picture. When a full line is pictures, Bingo hops: BINGO. When every called word is a picture, the card names the leftovers, the words Bingo never called.
  - **Wrong:** the chip slides off and the differing letters (or the syllable) light up (miss 1).
  - **Miss 2:** every word dims except the right one, its two nearest look-alikes by edit distance, and the chosen one. It is never the right word alone.
  - **Miss 3:** the right square pulses.
  - A move takes the help away. A flipped square takes no chip.
- **Levels** (the Card setting, shown per locale only with ≥ 7 calls):
  - **Look-alikes:** one-letter look-alikes.
  - **Word families:** one family per row.
  - **Blends:** two-consonant starts. fi has no blend level.
  - **Syllables:** two-syllable words with syllable-swap leftovers, using TeX-agreed approved splits.
  - **You call:** Bingo holds 9 pictures, his needed one ringed and the two others on its line chipped. The child holds 3 word cards and puts one in his slot. Bingo covers exactly what the card says: his BINGO, a decoy picture on his card (a miss, its differing letters lit), or nothing (a shrug). After miss 2 the needed word ghosts in under his picture.
- **Order:** card by card, never the same row twice in a row when it can be helped, never the previous order. You call: the needed picture visits all nine squares over two passes, and the right card's slot is balanced 3/3/2.
- **Phones:** a four-wide card turns on its side, so its rows become columns.

## Words and pictures
- Every called word is the picture's own library label, in colour, not refused. Every leftover is no library or vocabulary word.
- **Contact sheet:** the pictures behind the reviewer's flagged words were opened. de «Band» showed a bow (a Schleife) and es «niña» read as a doll; both were removed.

## Native + pedagogy review (one reviewer, a compact dump of every card, round, string and prose)
- **MUST, fixed at the source:**
  - **All 11:** «only one letter / syllable is different» at miss 2 was false, because the nearest words can differ by more. It now reads «look at each letter / syllable».
  - **en:** hat and cap on one card (a cap is a hat) → **pot**.
  - **de:** Hahn and Huhn (a rooster is a Huhn) → Kahn (also in the You-call hand). Sand and Strand → Land, Wand.
  - **da:** kage / bage do not rhyme with drage / krage → a kat / hat row. bus does not rhyme with mus / hus → lus.
  - **no:** skip (sj-sound) is no blend → sko.
  - **it:** scala and scale (both mean ladder or stairs) → scarpa.
  - **pt:** pomba and pombo → pombo with tombo / lombo.
  - **fr:** bouge does not rhyme with juge / luge → déluge.
  - **sv:** «mark» (ground) → «marker»; «markeren» → «markern».
- **SHOULD, applied:**
  - **Hint:** «the coral letters» in the plural.
  - **Leftovers:** en pug → dot, de Grab → Glanz, da skud → skal, fr plaie → plaid, fi kallo → pulla.
  - **Words:** no bolle → dukke, it croco → cravatta, pt pega → peça.
  - **Nothing-cards:** es ropa → ropo, pt bota → bova.
  - **Strings:** pt «Você sorteia» → «Você canta»; sv card = «bricka»; da / sv / no «står det … på»; no «sprekk» → «åpning»; fi «pelimerkki».
  - **Prose:** wording in nl, it, fr, sv, da, no and fi.
- **SHOULD, not applied:** sv / da / no «glad» stays as the word for the happy face.

## FROZEN-NOTEs
- The en intro describes the old activity («read the three little words … tap the one»); the en title is «Bingo's Word Hunt».
- The fr title «Confusion de sons» describes sound confusion, not reading; the fr intro says «sans inscription». Not touched.

## Gates
- **`verify-picture-bingo-core.js` — 27,383 / 0.** It uses its own index of the library and vocabulary, and checks:
  - every card rule (look-alike, family, blend, syllable split with TeX);
  - an all-called line on every card;
  - the answer-position share and the order;
  - the You-call cards, decoys, fillers and positions;
  - the round state machine, including the nearest-two dim and pulse timing;
  - strings × 11, the manifest mirror, and the frozen hash.
- **`mutate-picture-bingo.js` — 19 / 19 killed.** On the first run 5 survived: the pulse at miss 2, nearest vs random, the card full early, accents in the diff, and MIN_ROUNDS. The assertions were added.
- **`local-test-picture-bingo.js` — 0 fail:**
  - every round of every level × 11 locales at 704 with a real pointer (tap, drag, miss 1–3, the right word, You call decoy / nothing / BINGO);
  - a full card and its leftovers; First letter; arrow keys;
  - the phone transpose;
  - the sweep 320–1366 (en) and 320 · 704 · 1366 (all).
  - Fixes it forced: the tiny threshold (the 360 page is a 330 wrap), squares tall enough for a 72 px flipped picture, and the You-call hand on one row at 320.
- **Other audits:** `visual-qa-activity.js` (en, fi) green; `audit-activity-hierarchy.js` 266 / 0; `audit-settings-efficacy --tool=picture-bingo-activity`: Card and Read the call both change the board; route and indexable preflights and `verify-activity-content` × 11 green.
