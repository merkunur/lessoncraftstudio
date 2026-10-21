# #72 — Quill's Mirror Market → THE TWO-ENDED ROD (K.L.5.b, all 11 locales)

ORDER row 72 · id `opposites.antonyms.k-l-5-b` (kept).
- **Files:**
  - a new `opposites-rod-core.js`, `opposites-rod-activity.js` and its html (no `#lcs-root` height pin);
  - the row's `tool` is repointed from the old shared engine to `opposites-rod-activity`. `opposites-core.js` and `opposites-pairs.json` are untouched.
- **Manifest:** in `opposites-activities.json`, edited as text. Its params are now a mirror of the core (rounds per level, per locale).
- **Metadata:**
  - slug, title and intro stay frozen in en, de, fr, es, pt, it and nl (gate hash `9a097079…`);
  - sv, da, no and fi are new: slug, title, intro, and GRADE_OVERRIDE '1' (with de..nl).
- **Shared code:** 0 lines in shared cores or lcs-shell.
- **Legacy gates:** `verify-opposites-core.js` and `local-test-opposites.js` exit 0 with a pointer to the new gates.
- **Design and CSS:** design in `designs/072-opposites.md`; CSS prefix `tr-`.

## The apparatus and its invention: a word slides to where its meaning lives
- **The rod:** every pair of opposites lives on one rod, with the target word on one end and an empty clip at the other. Each rod is painted for its dimension:
  - size tapers;
  - temperature runs red → blue;
  - black/white runs grey;
  - day/night is a sky;
  - full/empty is a filling tube;
  - feelings are cream with a groove.
- **Dropping a card on the rod** (drag it, or tap it):
  - **the opposite** slides all the way into the far clip;
  - **a middle word** (warm, half full, medium) stops in the middle groove;
  - **a word that means the same** parks beside the target;
  - **a word from another family** bumps off the rod and falls back.
- **Rod shapes:**
  - up/down stand on an upright rod, and "left" rides the crossing rod instead;
  - on/off and open/closed are short **switch rods** with no groove, because complementary pairs have no middle.
- **Levels:**
  - **Pictures** (9 rods + the bedtime scene, three flips);
  - **Same or opposite?** (8 rounds: put each word at the same end or the other end, then Check; one round has a word that fits nowhere);
  - **Pair up** (7 rounds: three stacked rods, each card slides home only on its own rod);
  - **Sentences** (9: the far clip is the sentence blank, which takes a capital when it starts the sentence);
  - **Prefixes** (9 flip rounds; plus 9 meaning rounds in en): hang a clip on the empty end and push the word. Only the right clip closes and makes the opposite; a wrong clip rolls back and never builds a word. The fi ending clip -ton/-tön closes on the back of the word.
- **Misses:**
  - miss 1: a hint that names what the rod did;
  - miss 2: the far end pulses (on Pair up the right rod glows; on Prefixes the right clip glints).
- **Settings:**
  - Level;
  - Words: Pictures / Words only;
  - Answer: Pick a card / Write it. A typed word slides like its card. The target itself typed is a miss. A word the locale does not know shakes and is never counted as a miss. ß is folded to ss.

## Content decisions (beyond the design)
- **Sizes are drawn by the BIGGER ball being bigger:** small is the picture floor, medium 1.22×, big 1.45×, and the card widens to hold it. A shrunken small ball put the picture at 53 px.
- **The open door** is the door standing beside a dark doorway, not turned on its hinge (that narrowed the picture to 54 px).
- **A parked card keeps its full size**, so its picture never drops under the floor.
- **Wrong prefix clips are chosen so they never form a real word** (the gate checks that the right clip's letters begin, or for fi end, the word it makes). For example, en like → obey ("unlike" is a word).
- **The en meaning clips re / pre / mis** run 3/3/3. They are a recorded refusal in the other ten locales, where no transparent K-2 set exists.

## Native + pedagogy review (one reviewer over every round, card, sentence, clip, string, the new metadata and the prose of 11 locales)
- **MUST — a wrong clip made a real word**, so the base was swapped:
  - en like → obey;
  - no fornøyd → trygg ("ufornøyd");
  - es armar → tapar ("prearmar", used in Mexico);
  - it utile → certo ("disutile");
  - fi rauhallinen → vaarallinen ("epärauhallinen").
- **MUST — a clip that does not make the opposite:** sv frisk → trygg ("ofrisk" means stale).
- **MUST — a second opposite (all locales):** the unrelated card "down" (en "I feel down", it "sono giù") means sad. It is now white in the happy picture round and black in the sad sentence.
- **MUST:**
  - fr pleonasm «monte en haut … redescend en bas» → «monte tout en haut … redescend tout en bas»;
  - da/no hPair2 «dens» on a neuter noun → «kortets» / «hjemmet til kortet»;
  - fi howToPlay named a level that does not exist → «Etu- ja loppuliitteet -tasossa»;
  - en prose «a wrong clip never builds a word» is untrue of re/pre/mis → «never turns the word into its opposite».
- **SHOULD, applied:**
  - nl tevreden → bekend;
  - sv snäll → vänlig;
  - it coprire → gonfiare and fermare → terminare;
  - pt fazer → abotoar (the prose example follows) and frente → «na frente»;
  - fr faire → boutonner, «Il fait jour. Bientôt, il fera ___.», «Ce ballon-ci», véloce → «très rapide»;
  - de lärmend → lautstark;
  - es ligero → rapidísimo;
  - it «scritta bene»;
  - no tPairs «over på»;
  - fi ariaPush «sana {w}», «yhdessä päässä», «toiseen ryhmään kuuluva»;
  - "five levels" lines in nl/da/sv/no/es/it/pt/fr/en;
  - native quotation marks in the nl/da/sv/no/it prose.

## FROZEN-NOTEs
- **Intros:** the en, de, fr, es, pt, it and nl intros describe the old Mirror Market (tap-a-mirror) game, and the title still reads "Quill's Mirror Market".
- **Strands:** the strand overrides for de..nl are kept.

## Gates (local, all green)
- **verify-opposites-rod-core:** 30298 pass, 0 fail. It covers:
  - the gate's own table of every picture and sentence round (target, far, near-miss and where the rod sends it, unrelated): every card × slot × end × locale dropped and typed;
  - every placement on every same-or-opposite round; every card × rod on Pair up;
  - every clip on every prefix round, plus the en word table and the clip-forms-the-word check;
  - the scene; capitals at a sentence start; no digits; fr narrow spaces; strings ×11; pictures colour and labelled; floors; 500 passes never repeating; slots 3/3/3;
  - the manifest mirror and the frozen hash.
- **mutate-opposites-rod:** 23/23 killed.
- **local-test-opposites-rod:** 4006 pass, 0 fail. A real pointer through every round × level × 11 locales (near-miss dragged and where it lands, unrelated card tapped, miss 2 pulse, the opposite dragged and the celebration; scene flips; Same or opposite with an empty Check, a wrong end and the win; Pair up by drag and by tap-then-rod; Prefixes with no clip, a wrong clip rolled back and the right clip), plus Write it (nonsense, the word itself, the answer in capitals), Words only, and a sweep of all 5 levels × rest/miss/won at 320–1366.
  - **Found by it:** on Same or opposite? a dragged word never landed, because the rod box caught the drop before the end zones inside it. The ends are now checked first.
- **visual-qa:** en and fi 60 renders each, and de at 320, all pass. The first run failed SPARSE on the shrunken ball and the turned door.
- **audit-activity-hierarchy:** 320/0. The first run failed PICTURE (53/54 px) for the same two drawings.
- **Other gates:** audit-settings-efficacy 3 live; both preflights; verify-activity-content ×11.
- **Found by reading the renders:**
  - the switch rods' bar floated between the two ends (only the bar was short); the whole rod is now short;
  - fi «hyväntuulinen» broke mid-word in a same-or-opposite end zone; the zones now grow to fit the word;
  - a filled blank left a gap before the full stop ("closed .").
  - a parked card shrank to 82 %, its picture under the floor; it now keeps full size.
