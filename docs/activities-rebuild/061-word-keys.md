# #61 — Tell the Words Apart → THE WORD KEYS (RF.K.3.c, all 11 locales)

ORDER row 61 · id `choice-board.tell-words-apart.rf-k-3-c` (kept).
- **Files:** new `word-keys-core.js`, `word-keys-activity.js` and `word-keys-activity.html`.
- **Manifest:** the row stays in `choice-board-activities.json`, edited as text. Its `tool` is repointed, `task_template` is `word-keys`, and params mirror the core (games × rounds per locale). Every other row is byte-identical.
- **Metadata:** slugs, titles and intros are frozen in the 10 locales that had them; the gate checks them by hash. fi is new: slug `erota-samannakoiset-sanat-esiopetus`, a title and an intro. Grade K, strand Reading: Foundational Skills.
- **Shared code:** 0 lines in shared cores or lcs-shell.
- **Prose:** rewritten in 11 locales. Every example is a real round, checked against the core.
- **Legacy:** `verify-sight-word.js` and `local-test-sight-word.js` now exit 0 with a pointer, because both sight-word rows run their own instruments.
- **Design:** `designs/061-choice-board.md`. CSS prefix `wky-`.

## The apparatus and its invention: EACH WORD IS A KEY, ITS LETTERS ARE THE TEETH
- **The padlock.** A brass padlock sits in the sentence's gap. It is the same size for every word, so its size never tells the length.
- **The keys** hang on a rail: a bow and a blade whose teeth carry the letters. Tap a key or drag it into the lock, then press Turn.
  - The right key turns: the lock opens, the word drops into the sentence in teal, and the key goes onto the key ring.
  - A wrong key jams and shows why: differing teeth glow, an extra tooth sticks out of the lock, a missing tooth leaves an empty notch.
  - Miss 2: the lock turns to glass and shows one pin per letter of the word, with the pins under wrong teeth glowing.
  - Miss 3: faint ghost letters appear on the pins.
  - A move takes the help away. A tap on the lock pulls the key out.
- **Games** (the Game setting):
  - **Three keys:** one sentence, the word and two of its three look-alikes. The look-alike left out rotates per pass, but never the last one sharing the word's first letter. The word's peg is balanced 3/3/2 per pass.
  - **Key ring:** three sentences and three keys; each key opens exactly one lock. The rail is never in lock order. On phones a 3-tab pager shows one sentence at a time.
  - **Cut the key:** cut the word tooth by tooth from 8 letter tiles (by tap or by typing; Backspace uncuts). The tiles never show two of the word's letters side by side in spelling order.
- **Help in the sentence:** picture on or off.

## Words and sentences (the content risk: one key per sentence, in 11 languages)
- **The old targets are kept** in 10 locales; fi is new. Look-alikes that let a second key fit the same slot were replaced, and each replaced word now has a look-alike with the same first letter.
  - **Words that slot in where their target does:** possessives (es mi/su, pt seu/teu, de sein/mein), numbers (es dos), opposites (es sin, sv ute), past tenses (sv/da/no var, fi oli, nl kon), demonstratives (fi tuo) and gender-neutral pronouns (sv hen).
  - **Removed for other reasons:** rare words (es vid, fr rune, it nudo / seno / pero, sv ock).
  - **Swapped by the gate:** look-alikes sharing no letter with their word (da ud / nu, sv att, pt eu), and fr arc / sel, for the middle-length bot.
- **Bots:** first-letter guessing is beaten in every dealt round; the "pick the middle-length key" bot wins ≤ 50 % in every locale (fr 48.9 % after two swaps).
- **Content:** 64 library pictures, all opened via labels and colour. Boards may have one picture-less lock.

## Native + pedagogy review (one reviewer; every key read into every sentence)
- **MUST** (each replacement checked by the reviewer against every key it meets):
  - es, it and pt «Juego / Gioco / Eu brinco ___ mi perro»: «como / come» also fits. Now «Me lavo las manos ___ jabón» and its it/pt equivalents (sink picture; the library has no soap).
  - nl «een nieuw fiets» is ungrammatical; now «Mijn fiets is ___».
  - da «Jeg er en hund» fit; now «Jeg ___ to hunde».
  - sv «inte» fit «Katten sover ___ i huset»; now «Katten vill vara ___ när det regnar».
  - no «En ligger her» fit; now «Jeg ser ___ ikke».
  - fi: «Sana-avaimet» needed its hyphen; «Hän ui meressä» fit the shark sentence; the matto / mato sentences each accepted both words. All replaced.
- **SHOULD:**
  - de «ein, zwei, drei» → «Drei, zwei, ___ – los!»; nl «Wat dek je» and the comb sentence that printed its answer; sv «Här kommer bussen» → «___ fyller du år?»; no «Jeg er en ball»; da / no «leker ved»; fr «Je joue avant»; it «Il suono è caldo».
  - Look-alikes: it nono → nonno, fi hai → hänen.
  - Wording: learning goals ×11 now name «one letter changed»; native quote marks; prose wording in nl, sv, es, fr and fi.

## FROZEN-NOTEs
- The 10 frozen intros describe the old audio game («hear a word, tap it»). The fr intro says «sans inscription»; the pt title says «(PDF)»; the nl title says «luisteroefening».
- Six titles name grade 1 or 2 (Klasse 1, CP, groep 3, åk 1, 1. klasse, 2. trinn) while the chip is K. Not touched.

## Gates
- **`verify-word-keys-core.js` — 59,557 / 0.** Its own ground truth:
  - its own compare and diff;
  - old targets kept, a reviewed word list per locale, a letter shared, the first-letter rule;
  - pictures exist, in colour, labelled, not refused; ≤ 1 picture-less lock per board;
  - the design's rejected frames never used;
  - every ring lock opens for exactly one key;
  - deals over 60 seeds: pegs, first-letter key on the rail, every look-alike met, the middle-length bot, the ring derangement, the tray rules;
  - the full round state machine;
  - strings ×11, the manifest mirror, the frozen hash and the fi metadata.
- **`mutate-word-keys.js` — 19 / 19 killed.** One survived on the first run (an opened ring lock taking another key mid-board); the test was added.
- **`local-test-word-keys.js` — 3,592+ / 0:**
  - every round of all three games × 11 locales at 704 with a real pointer: tap, drag, focus-then-tap, jams to glass, pull-out, the right key, partial ring boards;
  - typing and Backspace; Picture off; the phone pager;
  - the sweep 320–1366 (en) and 320 · 704 · 1366 (all) at rest / keyed / jam / glass / won.

  The 320 fold was fixed three times: smaller tray tiles, a top-aligned phone ask row, and tighter tiny spacing.
- **Other audits:** `visual-qa-activity.js` (en, fi) 48 renders each, green; `audit-activity-hierarchy.js` 146 / 0; `audit-settings-efficacy --tool=word-keys-activity`: Game and Picture both change the board; route and indexable preflights and `verify-activity-content` ×11 green.
- **My own read of the renders:** the three-lock board at 704 and 1024, the phone pager, the glass and ghost pins, and the fi cut jam.
