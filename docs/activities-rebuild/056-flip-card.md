# #56 — Pepper's Sound Swap → PEPPER'S FLIP CARD (RF.K.2.e, all 11 locales)

ORDER row 56 · id `pepper-sound-swap.substitute.rf-k-2-e` (kept).

- **Files:**
  - Added: `flip-card-core.js`, `flip-card-activity.js`, `flip-card-activity.html`.
  - The row stays in `pepper-sound-swap-activities.json`, its only row. `tool` is repointed to `flip-card-activity`, and `params` mirror the core.
  - The old `pepper-sound-swap-activity.*` files are untouched. 0 shared-core lines.
- **Locales:**
  - The row was English only. en keeps its frozen slug, title and intro; the other ten locales get new ones. The prose is written in all 11.
  - **Grade:** grade 1 for de/nl/pt/no (as #54/#55).
  - **Strand:** each locale shows its national phonological-awareness strand.
- **Design:** `designs/056-pepper-sound-swap.md`. **Prefix:** `fcd-`. Pepper is the library parrot `pets/parrot`, the green one, so she differs from es *loro*'s yellow parrot.
- **The old gates:** `verify-phoneme-swap-core.js` and `local-test-pepper-sound-swap.js` carry a RETIRED guard.

## The apparatus and its invention: EVERY SWAP TURNS THE CARD
- **The card:** the word sits on a flip card, one tile per SOUND along its bottom.
- **What the card shows:** whatever word the tiles really make.
  - A swap pops the old tile out (it tumbles away), and the card flips (rotateY, 600 ms; a cross-fade under reduced motion).
  - It shows the picture of the word the tiles spell, matched by SOUND keys, never by letters.
  - When the library has no picture for that word, the card turns calm grey with only its letters. It never says "not a word".
- **Predict levels (first / other / add):** Pepper brings a tile, and the child taps the picture the card will turn into.
  - **At Check:** the swap plays and the card shows the TRUE new word.
  - **A wrong guess:** it shows its own tiles with the differing ones marked, or a coral "+" for a missing sound.
  - **Miss 2:** the slot to change pulses.
- **Swap level:** a goal picture (with a star) and a tray of four tiles. The child drags a tile, or taps a tile and then a slot.
  - **A miss:** the differing slot glows and the goal's tiles line up.
  - **Miss 2:** the slot pulses.
- **Word chains:** one tile at a time. The goal moves on after each step, and each word reached leaves a ticket on the strip.
- **Levels shown** (each needs ≥ 7 honest rounds, measured):

  | Locales | Levels |
  |---|---|
  | en | all five |
  | de, nl, sv, es | first, other, swap, chain |
  | no, it, pt, fr, fi | first, other, swap |
  | da | first, swap |
- **Phones:**
  - On narrow cards the goal sits at the card's top-right corner.
  - Below 340 px the predict levels put Pepper and her tile on the card's top corners (the design's 320 layout).
  - A guess's tiles become one compact letter pill.

## Deviations from the design (each measured or ruled)
- **Level 5 "Add a sound":**
  - The design's *ear + b = bear*, *ear + p = pear* and *owl + b = bowl* are wrong in speech (the vowel changes too). They are struck, as is *egg* (the only egg pictures are refused).
  - Level 5 now adds a sound at the START or the END (RF.K.2.e covers both): oar → door, eye → pie, eye → tie, lock → clock, nail → snail, ear → deer, bee → beach, cow → couch, car → cart.
  - No other locale reaches 7 such pairs with pictures, so Level 5 is en only.
- **The other ten locales are generated from a hand-written sound-keyed lexicon** (seeded from the design's measured pairs and a scan of every locale's labels), under rules the gate re-checks:
  - one sound apart;
  - trays of four distinct tiles;
  - chains never reuse a word set.
- **Every tray tile must give an HONEST flip** (from the native review). Every place it can go must show either the picture of a word spelled exactly that way, or a grey card that spells no pictured word, and nothing rude by sound or by spelling. This struck:
  - de *kot*, homophone ei/ai flips (*meis* → Mais) and *hant* → Hand;
  - it *potta*, *porna*;
  - pt *morta*, and the grey *saco* / *cama*;
  - es *porro*, *paja*, *coca*;
  - nl/sv/no *pus*, no *lus*;
  - da grey *sol*.
- **Pictures that name each other cannot share a round** (nl *bol*/*bal*).
- **Words out:**
  - *Pictures a child names otherwise:* no *vann*, fi *vesi* (bottles), pt *jato* (a plane), sv *gam* (vulture), nl *das* (badger), fi *maki* (lemur).
  - *Near-twin drawings:* de *Lamm* (beside *Schaf*), nl *hen* (beside *kip*).
  - *Six-tile words* (they cannot keep 44 px tiles at 320).
- **The "Letters on the tiles: sounds only" setting is not built.** The page must read with the sound off, and TTS exists in only 5 locales.
- **Titles renamed in review:** it «La carta che si gira», pt «O cartão-surpresa», no «vendekort» (new metadata, not frozen).

## FROZEN-NOTEs (en metadata untouched)
- The en page title says "Pepper's Sound Swap", while the activity is titled "Pepper's Flip Card".
- The en intro opens "Headphones recommended! Tap a picture to HEAR its name". Tapping a picture or tile still speaks it where TTS exists, but the task no longer depends on sound.

## Gates
- `verify-flip-card-core.js`: 9931 / 0. Its own swap rule, honest-flip and deny rules, pictures on disk, en metadata frozen from git.
- `mutate-flip-card.js`: 20 / 20 killed.
- `local-test-flip-card.js`: 2764 / 0. A real pointer plays every round of every shown level in 11 locales at 704. The 320–1366 sweep checks rest and miss states.
- `visual-qa-activity.js` (en / de / fi / fr / no) PASS · `audit-activity-hierarchy.js` 422 / 0 · `audit-settings-efficacy` live · the static gates are green.

## Deploy (2026-10-20)
- Commit `c77303cf`. Copied the files and the preview to `/var/www/lcs-media/mini-tools/`, then ran `deploy.sh`: EXIT 0, payment canary clean, server 133 GB free.
- `live-verify-flip-card.js`: 75 / 0 on production. The first run raced the page cache (19 / 7 "page embeds"); the re-run was clean.
- Variety probe (en): 10 distinct, pass 2 reshuffled.
- All 11 locale pages return 200.
