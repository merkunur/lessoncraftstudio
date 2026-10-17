# New 213 — The Alphabet Lockers (READINESS · alphabet order)

## 0. Identity
- **id** `alphabet-lockers.play.alphabet-order` · grade K (word modes reach grade 1) · framework: READINESS — alphabet order (`alignment.framework` from `frontend/lib/frameworks.ts`; CCSS has no K code for ABC order — RF.K.1.d is naming letters, and ABC order of words arrives with dictionary use in grade 2, so the readiness framework is the honest label) · strand Reading: Foundational Skills.
- **files (key `alphabet-lockers`)** `mini tools/alphabet-lockers-core.js`, `alphabet-lockers-activity.js`, `alphabet-lockers-activity.html`, `alphabet-lockers-activities.json`. Scaffold: `node scripts/new-activity.js --num=213`.
- **worksheets it covers:** K-223 Missing Letters · K-309 ABC Dot-to-Dot · G1-245 ABC Order (number picture words 1–6) · G1-262 ABC Order: Number the Words · G1-263 Number Them, Then Write Them · G1-264 When Words Start the Same · G1-426 (ABC-order sheet, untitled in the map — covered by the word modes).
- **merged into it:** grade-1 "The ABC Rail" (abc-rail) — its rail of letter stops and its "second rail for the second letter" become this corridor's word modes and its inner corridor (§5); nothing of it is lost.
- New instrument; no old activity.

## 1. The pitch
"The alphabet is a corridor of lockers, and a locker's door only shuts on the letter that lives between its two neighbours — so you learn the alphabet as places, not as a song."

## 2. Why a child will want it again (the fun)
- **Doors that slam.** School lockers are irresistible: each one has a nameplate letter, a vent and a latch. Put the right letter in an open locker and its door swings shut with a metal *clang* and the latch light turns green. A row of shut doors is deeply satisfying.
- **The wave.** When every door is shut, a light runs along the whole corridor from the first letter to the last (å ä ö, æ ø å, ñ included) and then the doors do a Mexican wave — open-shut, open-shut along the corridor with a rising scale of notes (one note per letter), ending with a clang on the last locker.
- **Lockers can hold cards.** In the word games, picture cards hang on locker hooks. When two cards want the same locker, its door swings open and inside there is a tiny second corridor — a whole little alphabet inside one locker — where the cards find their places by their second letter. Children find this delightful: "a corridor inside a locker!"
- **Free play:** run a finger along the doors (or drag across them) and they open and shut in turn, playing the alphabet as a scale; tap one door to hear (where TTS works) and see its letter swell.
- No timer, score, streak or lives.

## 3. The skill and the misconception
- **Skill:** know the order of the alphabet as positions — which letter comes before, after and between (K-223); say/tap it in order (K-309); put picture words in ABC order by their first letter (G1-245, G1-262, G1-263) and, when first letters match, by the second (G1-264).
- **Misconception 1 — the sung blob** ("elemenopee"): the child can recite but cannot say what comes after K without starting at A. A gap's two lit neighbours ask for exactly that: what lives between K and M?
- **Misconception 2 — direction:** "before" read as "after". The corridor only runs one way (an arrow track along the floor), and at miss 2 the doors open one by one from the nearest letter, walking forward to the gap.
- **Misconception 3 — ordering words by length, by the last letter, or by the picture:** a card hung on any locker but its first letter's slides off the hook; the answer row is read off the corridor.
- **Misconception 4 — giving up when two words start alike** (ball, bus): the shared locker opens into its inner corridor, and the second letter decides — the material shows what to do next.
- **Misconception 5 (other locales) — where the extra letters live:** sv/fi Å Ä Ö come AFTER Z; da/no Æ Ø Å after Z; es Ñ after N; de Ä Ö Ü sit with A O U (no lockers of their own). The corridor is each locale's alphabet, so a Swedish child shuts Ä between Å and Ö.
- **How the material pushes back:** a door only shuts on the right letter (a wrong tile bounces out), a card only hangs on its own locker, and an inner corridor appears exactly when the first letters tie.

## 4. The stage
Full-width layout (no split at 704: the corridor needs the width); the bubble sits under the corridor, right-aligned beside Check.

**At 704 px** (stage 680 × 470):
- **The corridor:** lockers in **reading-order rows** (each row left → right) with a drawn **return track** (a curved ink arrow, 3 px, from the end of one row back to the start of the next) so adjacency is never broken and letters never run right-to-left. 26 letters = rows of 10 · 10 · 6; 27 (es) = 10 · 10 · 7; 29 (sv da no fi) = 10 · 10 · 9. Each locker **60 × 84**: a teal steel body (`#146B5E`), a cream nameplate at the top with the letter in Baloo 2 **34 px**, three vent slits, a round latch light (green when shut, grey when open). An **open** locker shows its door swung 70° to the side (a narrow parallelogram) and a dark empty inside with an empty nameplate. A floor strip under each row carries small forward arrows (the direction).
- **The tray** (letters games): a rail under the corridor with the round's letter tiles **60 × 60** (cream, ink letter 36 px).
- **Word games:** the corridor shrinks to lockers **56 × 64** (nameplate letter 28 px) on top; the **card rail** below holds 4–6 picture cards **100 × 124** (library picture **96 px**, the word under it in Nunito 18 px, lowercase); below that the **answer row**: 4–6 numbered slots 100 × 40 (numerals 1–6 are content).
- **Inner corridor:** when opened, the locker grows into a panel (480 × 196) overlaid above the corridor: the WHOLE locale alphabet again in miniature — **3 rows of up to 10 mini-lockers 40 × 52** (letter 22 px; never smaller, because the child reads these letters) with the same return tracks — a corridor inside a locker. Only the second letters' lockers have open doors; the cards are dragged onto them (a card snaps to the nearest mini-locker). At 360 the panel is 344 × 260 with rows of 7 mini-lockers 44 × 48.
- **Task line** above (≤ 24 px). Bubble + Check under the corridor (right).

**At 360 px:** corridor rows of **6** lockers **52 × 70** (letter 28 px) → 26 = 5 rows (6·6·6·6·2), 27 = 6·6·6·6·3, 29 = 6·6·6·6·5; return tracks between rows; tray tiles 56 × 56 in one row (3) or two rows (6); word games: lockers 46 × 56 (letter 24 px, rows of 7), cards **2 × 3 grid of 104 × 116 (pictures 72 px)**, answer row 3 × 2 slots; inner corridor panel 344 × 260 (the full alphabet in rows of 7 mini-lockers 44 × 48, letter 22 px); Check bottom ≤ 710 at 360 × 740. **At 320 × 640:** lockers 46 × 62, rows of 6; word cards 92 × 104 (pictures 64 px); Check ≤ 630.

Words on the apparatus: only letters (nameplates, tiles) and the card words; numerals in the answer row.

## 5. The hand
- **Fill a gap (Letters games):** drag a tile to an open locker; over it the locker's inside lights (hover). Drop: right → the tile becomes the nameplate letter, the door swings shut (220 ms ease-out, *clang*), the latch goes green. Wrong → §7 (the tile bounces back to the tray, 260 ms). Tap a tile, then tap a locker = the same as a drag.
- **Hop (Dot-hop game):** tap closed doors in order; each correct tap lights the door's latch and draws a lit stretch of the floor track to it (a glowing path); tapping a letter out of order: §7.
- **Hang a card (Word games):** drag a card onto a locker; right (its first letter) → the card hangs on the locker's hook (120 ms swing). Wrong → it slides off the hook back to the rail (§7). When a second card hangs on an occupied locker, that locker's door opens and the **inner corridor** grows out of it (300 ms); both cards slide into the panel; the child then drags each card along the inner row onto its SECOND letter's mini-locker (the card snaps to the nearest mini-locker; a wrong one slides back).
- **Number the cards:** drag cards from the corridor into the numbered answer row (1 = first along the corridor); or tap a card then a slot. G1-263's "write them" becomes a setting where the answer row slots are write boxes with the locale keyboard (the card's word must be typed into its slot).
- **Free play:** a drag along the doors opens and shuts them in turn with a note each (the scale); tapping a shut door swells its letter.
- **Undo:** tiles and cards can be taken back until Check (cards in the answer row tap back to the corridor).

## 6. The rounds
**Game 1 — Fill the gaps (K-223), 9 rounds.** The corridor has 3 open lockers (setting: 6); the tray holds exactly the missing letters (3 or 6), so every tile has one home and the task is WHICH gap. EN gaps (capitals or lowercase per setting), one gap in each third of the alphabet per round:
1. C · K · T  2. F · M · W  3. B · L · R  4. E · J · U  5. H · O · Y  6. D · N · V  7. G · Q · X  8. I · P · Z  9. A · K · S
(Every letter is a gap at least once per pass; A (no left neighbour) and Z (no right neighbour) are "before B" and "after Y" gaps.) With 6 gaps a round joins two rows — **1+2 (CKTFMW) · 2+3 (FMWBLR) · 3+4 (BLREJU) · 4+5 (EJUHOY) · 5+1 (HOYCKT) · 6+7 (DNVGQX) · 7+8 (GQXIPZ) · 8+9 (IPZAKS) · 9+6 (AKSDNV)** — computed by the critic's search (`work-c10/gaps.js`) so that every 6-gap round has at most ONE pair of adjacent open lockers and no two rounds are the same set (the first draft's 2+7 and 6+2 each had two pairs: F·G + W·X, M·N + V·W). No two adjacent letters are both open in the 3-gap game; an adjacent pair in the 6-gap game is solved from its outer neighbours — a stronger step.
**Locale letters:** sv/fi Å Ä Ö, da/no Æ Ø Å and es Ñ are gaps in ≥ 2 rounds each (e.g. sv round 4: E · J · Ä; round 8: I · P · Å).

**Game 2 — Hop in order (K-309), 8 rounds.** All doors closed and grey; tap the letters in order through a stretch; the lit path grows. Stretches: A–J · K–T · N–Z · A–T (K-309) · a–j · k–t (lowercase) · F–P · M–Z (sv/fi/da/no: through Ö/Å; es: through Ñ). No picture forms (no hand-drawn art): the finished path lights the whole stretch and its doors wave.

**Game 3 — Words by first letter (G1-245, G1-262, G1-263), 7 sets** (4–6 library picture words, all first letters different; labels from `image-vocabulary.js`, lowercase; every picture checked to exist 2026-10-17):
1. apple (fruits) · dog (animals) · kite (toys) · sun (beach)
2. bus (vehicles) · fish (animals) · moon (space) · tiger (animals)
3. cat (animals) · hat (accessories) · lamp (furniture) · owl (animals) · pig (animals)
4. bed (around-the-house) · goat (farm-animals) · nest (spring) · rabbit (animals) · zebra (animals)
5. duck (farm-animals) · fox (animals) · igloo (winter) · jug (kitchen-tools) · mop (around-the-house) · van (vehicles)
6. ant (insects-and-bugs) · horse (animals) · nose (body-parts) · whale (animals)
7. bee (farm-animals) · cup (kitchen-tools) · lion (zoo-animals) · ring (accessories) · tent (camping) · umbrella (accessories)

**Game 4 — Words by second letter (G1-264), 7 sets** (every pair differs at letter 2, never later):
1. ball (toys) · bus (vehicles) · cake (bakery) · sock (accessories) — one pair: ba / bu
2. cat (animals) · cow (farm-animals) · hen (farm-animals) · pig (animals) · tent (camping) — one pair: ca / co
3. fan (around-the-house) · fish (animals) · mop (around-the-house) · mug (kitchen-tools) · sun (beach) — two pairs: fa / fi, mo / mu
4. pan (around-the-house) · pen (around-the-house) · rug (around-the-house) · rock (beach) · tiger (animals) · zebra (animals) — two pairs: pa / pe, ro / ru
5. bat (animals) · bed (around-the-house) · fox (animals) · frog (camping) — two pairs: ba / be, fo / fr
6. dog (animals) · duck (farm-animals) · hat (accessories) · horse (animals) · sun (beach) — two pairs: do / du, ha / ho
7. gate (around-the-house) · goat (farm-animals) · lamp (furniture) · lion (zoo-animals) · pig (animals) — two pairs: ga / go, la / li
(The first draft had 5 + 4 word sets — under the law's 7 per level; the critic added sets 6–7 and 5–7.)
Every set has one right order; no set's right order equals its rail order or its alphabet-of-pictures order.

**Answer position.** Letters: gaps spread across rows (each row holds a gap in ≥ 6 of 9 rounds); tray order per pass from a Latin square so each tile visits every tray slot; the tray is never in alphabet order (gate). Words: the card rail order is dealt so the first card is the alphabetically first in ≤ 1 of 9 sets, and no set is dealt in reverse alphabetical order; answer-row numbering is the child's. A bot that numbers cards in rail order scores 0/7 per game; a bot that orders by word length scores ≤ 2/7 (gate-measured).

**Order:** order-only reshuffle per pass (rounds and card deals); never the same order twice.

## 7. Check, the misses, the success
Letters game: each drop is checked as it lands (the door is the check); Words game: hanging is checked on drop, the answer row on Check.
- **Check with the answer row empty** (Words): hint, no miss — the corridor's hung cards pulse — "Hang every card on its first letter's locker first."
- **Miss 1 (a wrong tile in a gap):** the tile bounces back to the tray; the gap's two neighbouring doors light their nameplates (amber) · "That letter lives somewhere else. Which letter comes between {K} and {M}?" (for an end gap: "Which letter comes before {B}?" / "after {Y}?")
- **Miss 2:** the doors walk to the gap — starting at the nearest shut locker at least three letters before it, each door opens and shuts in turn (180 ms apart, its note playing) and the walk stops on the empty locker with its two neighbours still lit · "Watch the doors walk the alphabet to the gap."
- **Miss 3 and after:** the empty nameplate shows its letter as a faint ghost; the child still places the tile.
- **Dot-hop miss:** a tap on a letter out of order makes that door shudder; the next correct letter's latch blinks once (miss 1); at miss 2 the doors from the last lit one walk forward to the next letter · "Which letter comes after {G}?"
- **Card miss (wrong locker):** the card slides off the hook; the card's word lights its first letter and the corridor lights that letter's nameplate faintly · miss 1 "Look at the first letter of {fish}." · miss 2: the walk from A (or the nearest row start) to that locker.
- **Answer-row miss (Check):** cards in wrong slots slide back up to their lockers; the corridor's hung cards light in corridor order with small numerals 1, 2, 3 on their hooks at miss 2 · "Read the cards along the corridor, from the start."
- **A new move takes the help away** until the next Check.
- **Success (Letters):** every door shut → the light run and the door wave · "{A} to {Z} — every locker is shut!" **(Words):** the cards drop into the answer row in order with a soft *tock* each · "{apple}, {dog}, {kite}, {sun} — in ABC order!" With pairs: "{ball} comes before {bus}: a comes before u."

## 8. Settings
1. **Game:** Fill the gaps (default) · Hop in order · Words: first letter · Words: second letter — the board at rest shows open lockers + tray, all-grey doors, or the card rail + answer row.
2. **Letters:** Capitals (default) · Lowercase — every nameplate and tile changes at rest. (Gaps: 3 / 6 is a sub-option of Fill the gaps, shown as the number of open doors.)

## 9. Words (EN source)
- title: **The Alphabet Lockers** · instruction: "Every letter has its own locker. Shut the doors in ABC order."
- task lines: Fill "Put each letter in the locker between its neighbours." · Hop "Tap the lockers in ABC order, from {A} to {J}." · Words 1 "Hang each card on the locker of its first letter, then number the cards." · Words 2 "Two cards share a locker? Look at the second letter."
- hints/celebrations: §7 exactly.
- settings: "Game", "Fill the gaps", "Hop in order", "Words: first letter", "Words: second letter", "Letters", "Capitals", "Lowercase", "Open doors", "3", "6", "Answer", "Number them", "Number and write them". aria: "Locker {letter}, shut", "Open locker between {L1} and {L2}", "Card {word} on locker {letter}", "Inner corridor for {letter}".

**Locale traps (the alphabet and its collation ARE the content):**
- **Alphabets (corridor length):** en/fr/pt/nl/de 26; **es 27** (…N Ñ O…; ch and ll are NOT letters since 2010); **sv/fi 29** (…X Y Z Å Ä Ö); **da/no 29** (…X Y Z Æ Ø Å); **it**: the school alphabet is 21 letters (A B C D E F G H I L M N O P Q R S T U V Z — no J K W X Y) — it shows the 21-letter corridor (rows 10 · 11 at 704; 6 · 6 · 6 · 3 at 360) in every game; the five *lettere straniere* appear only in the Hop game's last stretch ("alfabeto completo"), as narrower lockers in their international places (j k after i, w x y after v), never as gaps and never on word cards (no it word set uses a j/k/w/x/y word); **de**: Ä Ö Ü ß are not lockers; in word order they sort as A O U ss (DIN 5007-1, dictionary order), so "Äpfel" hangs on A.
- **fr/pt/es accents** (é, ç, á, ã) do not change the locker: a word hangs on its base letter; a pair that differs only by an accent is never used.
- **nl ij:** in alphabetical order ij is i + j (ijsje sorts under I). Word sets never include ij-words (teacher practice varies: some classrooms teach IJ as one letter), and the gate refuses them.
- **Lowercase and German nouns:** the cards show labels lowercased, except **de**, where nouns stay capitalised on cards (Hund, Ball) — sorting ignores case.
- **Second-letter pairs per locale** are authored from library labels in that language — checked against `image-vocabulary.js` 2026-10-17: sv **bil · boll** (toys/car "Bil", toys/ball "Boll"), es **pato · perro** (farm-animals/duck, animals/dog), de **Haus · Hund** (miscellaneous/house, animals/dog — the first draft's "Hase" is not a library label: rabbit is "Kaninchen") — each pair differing at letter 2, never at letter 3. **sv/fi/da/no** also author one set per game that uses a word starting with their extra letters (labels checked: fi **ämpäri** (beach/bucket "Ämpäri"), sv **öra** (body-parts/ear "Öra"), da/no **ørn** (birds/eagle "Ørn"); easter/egg "Ägg" is a painted egg and stays out), so the letters after Z are ordered in word mode too, not only in Game 1.
- **Sound off:** order is shown by the corridor and the walks; TTS (letter names) is a bonus — and letter NAMES differ by locale (fi "äks", fr "double v"), so no string spells a letter name.

## 10. Sound off, access, phones
- **Silent legibility:** lit neighbours, the walking doors, the lit path, the corridor's own order.
- **Keyboard:** arrows move along the corridor (reading order; Down/Up jump rows); Tab to the tray; Enter picks a tile, Enter on a locker drops it; Hop: Enter on the focused locker; Words: Enter picks a card, arrows choose a locker, Enter hangs; number keys 1–6 send a focused card to an answer slot.
- **aria-live:** "Locker L is shut." / "M lives somewhere else. The neighbours are K and M." — written as "between K and M".
- **Taps:** lockers ≥ 46 × 56, tiles ≥ 56, cards ≥ 92 × 104, answer slots ≥ 92 × 40 (44 tall at 360).
- **Pictures:** cards 96 px at 704, 72 px at 360, 64 px at 320.
- **Phone layout:** rows of 6 lockers with return tracks; tray and cards wrap; the inner corridor shows only the useful second-letter range; Check above both folds (measured, 29-letter corridors included).

## 11. Distinct from
- **Row 41 Match Uppercase and Lowercase** (pairs of letter forms) and **Row 73 The Writing Carriage** (letter formation) — no order.
- **New 207 The Bus Queue** (ordinal positions from a door) and **New 205 The Hopscotch Court** (number before/after) — numbers, not letters; here a letter's place is the door that only shuts between its neighbours.
- **Row 61 The Word Keys (this batch)** — keys and locks for spelling; lockers here hold no keys, only letters and cards.
- **Built registry:** #6 Letterbox Street is a street of numbered letterboxes for writing numerals — this corridor is the alphabet, and its doors shut only in place.
- **Premium tools:** none sort words alphabetically.

## 12. Build plan
- **Core state** `{locale, game, case, gaps:3|6, alphabet:[letters], round:{open:[idx], tray:[letter]}|{stretch:[a,b], next:idx}|{cards:[{id, word, pic}], hung:{cardId: idx}, inner:{idx: {cardId: idx2}}, answer:[cardId|null]}, misses, help}`.
- **Functions:** `drop(tile, lockerIdx)` → ok, `hop(idx)` → ok, `hang(cardId, idx)` → ok, `hangInner(cardId, idx2)` → ok, `toAnswer(cardId, slot)`, `check()` → `{ok, wrongSlots:[s]}`, `collateKey(word, locale)` (DIN 5007-1 for de, ñ after n for es, å ä ö / æ ø å after z, ij → i+j for nl, accents folded for fr/pt/es/it), `walkFrom(idx)` → the door sequence for miss 2.
- **Gate's own ground truth** (`verify-alphabet-lockers-core.js`): its OWN alphabet table per locale (lengths 26/27/29/21) and its own collation, re-sorting every word set and comparing with the set's answer; asserts each gap's tray letter is exactly the letter at that index; every letter is a gap ≥ 1 per pass; locale letters gapped ≥ 2 rounds; every 6-gap round has ≤ 1 adjacent open pair; ≥ 7 sets per word game; it word sets free of j k w x y; trays never in alphabet order; second-letter pairs share letter 1 and differ at letter 2; no ij-word (nl), no accent-only pair; card rail never in answer order and never reversed; length-bot ≤ 2/9; every picture exists, colour theme, label lowercased per locale (de nouns capitalised).
- **Mutations:** a door shuts on a wrong letter · Å placed before Z in sv · de Ä given its own locker · es Ñ missing · es "ch" treated as a letter · cards sortable by length · a card hangs on its last letter's locker · inner corridor opens when first letters differ · miss-2 walk runs backwards · tray dealt in alphabet order · answer accepted in rail order.
- **Pictures to view:** fruits/apple, animals (dog, tiger, cat, owl, pig, rabbit, zebra, fish, fox), toys (kite, ball), beach (sun, rock — seen), vehicles (bus, van), space/moon, accessories (hat, sock — seen), furniture/lamp, farm-animals (goat, duck, cow, hen), spring/nest, winter/igloo, kitchen-tools (jug, mug — seen), around-the-house (bed, mop, fan, pan, pen, rug — seen), bakery/cake, camping/tent.
- **Risks:** the 29-letter corridor at 320 px (measure five rows + tray + Check); the inner corridor's mini-lockers are not tap targets (cards are) — local-test must drag cards onto them at every width.
- **Blocked:** none.

## 13. The four questions
1. **Would a 5–8-year-old choose it again?** Yes — clanging locker doors, a corridor that waves, and a secret corridor inside a locker.
2. **Would a teacher put it on the board?** Yes — "what lives between K and M?" is the exact question that turns the alphabet song into knowledge, and the inner corridor is the clearest picture of second-letter ordering there is.
3. **Would a parent trust it?** Yes — every language's own alphabet in its own order (Å Ä Ö after Z, Ñ after N, de umlauts with their vowels), calm, no words to read except the content.
4. **The invention:** the alphabet is a corridor of lockers whose doors only shut on the letter between their neighbours — and a locker opens into a second corridor when two words start alike.

## 14. Critic review (2026-10-17)
Scores before → after: invention 5→5 · fun 5→5 · completeness 3→5 · correctness 3→5 · distinctness 5→5 · reality 4→5
What changed:
- Word games had 5 and 4 sets (under the law's 7): now 7 + 7, every picture checked to exist, every second-letter pair differing at letter 2.
- 6-gap pairings recomputed by search: the draft's 2+7 and 6+2 each opened two adjacent pairs; the new nine rounds have ≤ 1 and are all distinct.
- Inner corridor letters were 12 px (unreadable): now the full alphabet in 3 rows of 40 × 52 mini-lockers, 22 px letters (phone: rows of 7).
- Alphabets checked: sv/fi …Z Å Ä Ö, da/no …Z Æ Ø Å, es Ñ after N (no ch/ll), de Ä Ö Ü ß sorted with A O U ss and no lockers of their own, it 21 letters with the five lettere straniere only in the last Hop stretch and never on word cards; de pair fixed (Hase is not a library label → Haus · Hund); Nordic word sets now include an extra-letter word (fi ämpäri, sv öra, da/no ørn).
