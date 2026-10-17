# Row 130 — The Mirror Chart (L.1.2.e)

## 0. Identity
- id `word-clinic.spell-by-ear.l-1-2-e` (KEPT) · grade 1 · Common Core L.1.2.e (spell untaught words phonetically, drawing on phonemic awareness and spelling conventions) · strand Language · page title (frozen) "Word Doctor's Clinic — Heal the Sick Sound" · own files `mini tools/mirror-chart-core.js`, `mirror-chart-activity.js`, `mirror-chart-activity.html`; manifest row stays in `word-clinic-activities.json` (id, en slug, page_title, page_intro unchanged), `tool` repointed. Only en has a slug: the ten other locales get new slug/title/intro at build (grade 1).
- worksheets it covers: **G1-244** Write the Word · **G1-258** Write the Word: The First Letter Is Given · **G1-259** Word Bank, No First Letter · **G1-260** Write the Word on Plain Lines · **G1-291** Only the First Letter · **G1-301** Word Bank and Letter Boxes · **G1-303** Letter Boxes and the First Letter · **G1-304** Every Clue · **G2-315** Spelling Rules · **G2-324** Which One? · **G2-325** Rule Detective · **G2-326** Sort by Spelling Rule · **G2-327** Write the Word (rule unit) · **G2-328** Plurals.
- what the old activity did: a picture "patient" on a cot, one sick (empty) grapheme slot in a scaffolded word, a Listen lamp (TTS whole word), a medicine tray of competing graphemes; a wrong pick voiced a different word. **Kept:** the clinic story and the frozen promise ("heal the one poorly sound"); the one-sick-slot round shape as Level 1; the rule that the correct spelling is shown nowhere while the task is live; the round words that have library art (lamp, nest, vest, fish, sock, jug, drum, ship, boat, leaf, frog, flag); the idea that a wrong spelling is *another word*. **Fixed/gone:** the feedback depended on hearing (TTS works in 5 of 11 locales) — now it is a picture; "chin" (no body-parts/chin picture) and "rain" (no spring/rain picture) are replaced; emoji fever faces are gone (no drawn faces); en-only becomes 11 locales.

## 1. The pitch
"Doctor's mirror only shows what your letters really spell — spell 'cap' and a cap appears, spell 'cup' and you get a cup, spell nonsense and the mirror stays foggy — so the patient is healed when the mirror shows the same picture as the patient."

## 2. Why a child will want it again (the fun)
- **The mirror is a magic trick.** The child spells, taps the mirror, and the fog wipes away in a swirl to show… whatever they actually wrote. It is funny when it is wrong (the dog patient, and the mirror proudly shows a *log*), satisfying when it is right (two identical pictures side by side, they click together, the patient's card glows and hops off the chart).
- **Children try silly spellings on purpose in free play** — "what does p-a-n make? p-e-n?" — the mirror answers with library pictures for every real picture word in the language (1,495 nouns), so exploring IS spelling practice.
- **The earned show:** the healed patient's card flips into Doctor's "All better" album on the clinic wall — a growing gallery of healed words with their spelling written under each.
- **Plurals are visible:** spell "fox" for the two-fox patient and the mirror shows ONE fox — the count is wrong, and the child sees it.
- No timer, score, streak or lives; no fever numbers.

## 3. The skill and the misconception
- **Skill:** spell a picture word by its sounds and its spelling conventions — one sick grapheme (vowel, digraph, vowel team, blend), then whole words with fading help (first letter, word bank, letter boxes, plain line), then position rules (ck/k, tch/ch, ai/ay, -dge/-ge) and plural endings (-s/-es/-ies) — and in each locale its own conventions (§9).
- **Misconception 1 — "one letter is as good as another if it's close"** (cup for cap, pen for pan). Pushback: the mirror shows *the other word's* picture — the meaning changed.
- **Misconception 2 — "spell what it looks like / leave a sound out"** (lap for lamp, fog for frog). Pushback: the mirror shows a different picture if one exists, or stays foggy; the letter boxes (when on) show one box per letter, so a missing letter leaves an empty box that blocks the mirror ("the mirror needs every box").
- **Misconception 3 — "a sound is always one letter"** (s for sh, o for oa). Pushback: "sip"/"cot"-type strings are fog; the tiles in the tray include two-letter tiles that physically take one box each in Level 1 sick-slot rounds (a sound box), so the child learns a sound can be two letters.
- **Misconception 4 — plural = always add -s** (foxs, cherrys). Pushback: fog — "foxs" is not a word; "foxes" shows two foxes. The singular shows one, which visibly disagrees with the two-picture patient.

## 4. The stage
**Layout: stacked at every width** (layout check 2026-10-17: no `layout:'split'` — its stage column is only ≈ 370 px at 704, too narrow for this apparatus). The stage takes the full card width, ≈ 648 px at 704 (≈ 656 at 1024); whatever §4 places in a left, right, side or bubble column stays side by side inside the stage when the activity draws it, while the shell's bubble, keypad and Check sit under the stage. Sizes written for a wider stage fit the 648 px by closing margins and gaps first; no picture drops below 96 px, no tap below 44, no data mark or grid cell below 40.

**At 704 px:**
- **The patient chart** (stage left half, 220 × 250): a clipboard-style card (drawn geometry: rounded rectangle, a clip bar at the top, 3 px ink) holding the **patient picture** — library picture 150 px (plural rounds: two identical instances 110 px each, overlapping 20 %). A small Listen button (36 px speaker, shell style) in the card corner.
- **The mirror** (stage right half, 220 × 250): an oval frame (drawn geometry, 10 px teal `#146B5E` rim, cream inner `#FBF3E4`) whose inner area is **fogged** (a white 70 % radial gradient over a soft blur-noise texture). When it reads, the fog swirls out (400 ms) and shows the picture the letters spell, same size as the patient picture — or stays fogged with the typed letters faintly drawn into the fog as if written by a finger (so the child sees what was read).
- **The letter boxes** (under both, centred, 460 wide): one box per letter of the target (Level 1: one box per *sound*, see §6), 52 × 64 each at 704 (shrinks to fit ≥ 40 px for 7+ letters), Fredoka 36 px letters; the given letters are printed in ink, the boxes to fill are empty cream with a dashed outline. Level 2 "plain line" replaces the boxes with one writing line (no length cue).
- **The tray** (below the boxes): letter/grapheme tiles 56 × 56 (Fredoka 30 px). Level 1: 3 tiles (the right grapheme + 2 competitors). Level 2 with "word bank": the word bank (4 words in 22 px, tappable cards) appears instead of/above a full alphabet keyboard; Level 2 otherwise: a locale alphabet keyboard (keys 40 × 48, 44 touch).
- **The mirror button** is the Check: a 64 px round button under the mirror with a drawn mirror-handle glyph; the shell's Check triggers the same.
- **Doctor's album** (bubble column, under the bubble): small healed cards (48 px pictures) collect in a 3-column grid.
- **Task line** above the stage; **bubble** in the right column.

**At 360 px** (stacked): patient and mirror side by side, 160 × 180 each, pictures **96 px** (plural: two at 72 px — the pair still reads; single pictures never under 64 px); boxes 40 × 52 (letters 28 px); tray tiles 48 × 48; keyboard keys 30 × 44 in 3 rows (letters only, locale set). Mirror button 56 px under the boxes. Bubble below. Mirror button bottom ≤ 690 at 360 × 740; at 320 × 640 the keyboard collapses to the word bank automatically if the alphabet would push the button below 610 (Level 2 "plain line" is the only mode that always shows the keyboard; there the boxes row is dropped, so it fits).

Pictures (library, colour; theme JSON verified): around-the-house/lamp, hose, pan, rug, bed, cup; spring/nest, bud, snail, grass; accessories/vest, sock, cap, hat, watch; animals/fish, dog, fox, cat; kitchen-tools/jug, mug, glass; music/drum; vehicles/ship, bus, truck; beach/boat, crab; miscellaneous/leaf; camping/frog, log; 4th-of-july/flag; around-the-house/mop, couch; classroom/map; furniture/crib, bench; farm-animals/goat, duck, bull, chick; clothing/coat, shirt, skirt; at-the-supermarket/cherry, strawberry, cake (never fruits/cherry or fruits/peach — both are drawn as apples; no peach anywhere); spring/bunny; body-parts/nose; flowers/rose; at-the-supermarket/milk; classroom/desk; around-the-house/clock, lock, fork; toys/train; summer/beach (the peach/beach neighbour); christmas/bell, christmas/sack (Santa's sack — reads as a sack).

## 5. The hand
- **Tap a tile** (or drag it) → it flies into the next empty box (or the box the child drags it to) in 120 ms with a soft click. Tap a filled box to empty it (the tile flies back). Two-letter tiles take one box in Level 1 (sound boxes).
- **Keyboard / word bank** (Level 2): keys type into the next empty box (or onto the line); Backspace clears; a word-bank card tapped fills all boxes with that word (and can be cleared with one tap on the boxes).
- **Listen** (bonus, any time): speaks the patient's whole word (never an isolated phoneme); a second tap speaks it slower.
- **Tap the mirror** (= Check), allowed when every box is filled (Level 2 plain line: when ≥ 1 letter): the fog swirls; the core looks the string up in the page locale's picture vocabulary (every singular and plural label, case-folded, diacritics exact). Result in ≤ 100 ms, animation 400 ms:
  - same word as the patient (same noun, same number) → healed (§7);
  - another picture word → that picture appears in the mirror, singular as one, plural as two;
  - not a picture word → fog stays, with the letters finger-written in the fog.
- **Free play:** a "Try the mirror" toggle in the bubble area under the stage (after a round is healed) lets the child spell anything on the keyboard and look; nothing is counted. This is the toy.

## 6. The rounds
One round = one patient. One right spelling (the vocab label in the locale; where a locale's vocab has two accepted spellings, both are listed in data and either heals).

**Level 1 — Heal the sick sound** (one empty box; tray of 3; default, the old engine's shape). Sound boxes: one box per grapheme. Every competitor tile makes either another library picture (the mirror shows it) or nonsense (fog) — chosen so most misses show a real other thing. EN, 16 rounds:

| # | patient | boxes (sick in [ ]) | tray (right first; order shuffled on screen) | what a wrong tile shows |
|---|---|---|---|---|
| 1 | cap | c [a] p | a · u · o | u → cup · o → fog |
| 2 | mop | m [o] p | o · a · u | a → map · u → fog |
| 3 | pen | p [e] n | e · a · i | a → pan · i → fog |
| 4 | bed | b [e] d | e · u · a | u → bud · a → fog |
| 5 | rug | [r] u g | r · j · m | j → jug · m → mug |
| 6 | dog | [d] o g | d · l · b | l → log · b → fog |
| 7 | sock | s [o] ck | o · a · i | a → sack · i → fog |
| 8 | bell | b [e] ll | e · a · u | a → ball · u → bull |
| 9 | ship | [sh] i p | sh · s · ch | s, ch → fog |
| 10 | coat | c [oa] t | oa · a · o | a → cat · o → fog |
| 11 | goat | g [oa] t | oa · o · ee | fog, fog |
| 12 | snail | sn [ai] l | ai · a · ee | fog, fog |
| 13 | crab | cr [a] b | a · i · o | i → crib · o → fog |
| 14 | glass | g [l] a ss | l · r · s | r → grass · s → fog |
| 15 | skirt | [sk] ir t | sk · sh · s | sh → shirt · s → fog |
| 16 | frog | [fr] o g | fr · f · fl | f → fog is a real English word but NOT a picture → fog (deliberately funny) · fl → fog |

(Band order: vowels 1–8, digraphs/teams 9–12, blends 13–16. The old rounds lamp, nest, vest, fish, jug, drum, boat, leaf, flag stay in Level 2's word pool.)

**Level 2 — Write the word** (whole word; the help setting picks the worksheet shape), 12 words per pass from the locale's picture list, filtered to words of 3–6 letters whose spelling is regular for grade 1 (per-locale list authored by the native reviewer from the gated `approved-words-<locale>.json` keys, which guarantees the noun has a vetted picture and label). EN pool (24): lamp, nest, vest, fish, jug, drum, boat, leaf, flag, frog, duck, crab, snail, goat, sock, bed, cup, hat, dog, pig, fox, bus, hen, sun.
Help (setting, each = one worksheet): **Every clue** — boxes + first letter + word bank (G1-304) · **Boxes + first letter** (G1-303) · **Boxes + word bank** (G1-301) · **First letter only** — a line, first letter printed (G1-258/291) · **Word bank only** — a line, bank of 4 (G1-259) · **Plain line** — no help (G1-244/260). Word bank = the right word + 3 words from the same pool, at least one differing by one letter (so reading, not shape, decides).

**Level 3 — Rule letters** (G2-315/324/325/326/327), per-locale rule units. EN units (each ≥ 8 rounds; the sick box holds the rule letters, tray = the two rule spellings):
- **ck or k** (after a short vowel → ck; after a consonant or a long vowel → k): duck, sock, lock, clock, truck, chick (ck) · milk, desk, fork, cake (k).
- **tch or ch** (after a short vowel → tch; else ch): watch (tch) · bench, couch, beach (ch) — plus word-only rounds (no picture, the mirror shows the word in clear letters on a clean mirror instead of a picture when the word is a real word in the unit's word list): match, patch, lunch, porch.
- **ai or ay** (middle → ai; end → ay): snail, nail (tools/nail — the canonical picture), train (ai, pictures) · rain (word-only, ai) · day, play, tray, hay, say (word-only, ay) — 9 rounds.
- **-dge or -ge**: word-only unit (bridge, badge, fudge, hedge · huge, cage, page, stage).
Modes inside Level 3: **Fill** (the rule box, G2-315/327) · **Which one?** — two spellings on two cards; the child picks one, then the mirror (G2-324/325) · **Sort** — 8 word cards drop into two rule jars labelled with the rule letters (ck · k); the mirror becomes the jar-check (a wrong card slides back out of its jar and sits at the jar's lip) (G2-326).

**Level 4 — Plurals** (G2-328): the patient shows two identical pictures; the boxes hold the singular already, plus 3 empty ending boxes; the tray has ending tiles **s · es · ies**, and a y-box swap (dropping "ies" on a word ending in y replaces the y — the y tile slides out). EN, 10 rounds: cats, dogs, hens, foxes, buses, watches, couches, benches, cherries, bunnies (+ strawberries in pass 2). Mirror: correct plural → two pictures, heals; singular left alone → one picture (count wrong); "foxs"/"cherrys" → fog.

**Answer position:** Level 1 tray order is shuffled per render; the gate asserts the right tile's slot is balanced (each of 3 slots holds it 5 or 6 times in 16) and that "always the first tile", "always the single letter", "always the two-letter tile" each heal ≤ 6 of 16. Level 3 "Which one?": the right card left/right 4/4 per unit. Sort: jars balanced 4/4.
**Order:** order-only reshuffle per pass; bands keep their order in Level 1 (vowels before teams).

## 7. Check, the misses, the success
- **Mirror tapped with empty boxes:** hint, no miss — the empty boxes pulse: "The mirror needs a letter in every box."
- **Miss 1** — the mirror shows what was spelled (the other picture, or fog with the letters). Hint: other picture → "The mirror shows a {other}! Which letter makes it a {patient}?" ({other}/{patient} = labels in the page locale) · fog → "The mirror can't find a picture for those letters. Say the word slowly." · plural one picture → "The mirror shows one. The patient is two."
- **Miss 2** — the stronger showing: the mirror keeps its picture/fog, and every box whose letter is wrong turns misty (the right boxes stay crisp); in Level 1 the wrong tile in the tray dims. Listen plays once automatically (where TTS exists). Hint: "The misty box is the poorly sound."
- **A new move takes the help away** (fog returns over the mirror, mist leaves the boxes) until the next tap.
- **Success:** the mirror's picture and the patient's picture slide together and click (a two-note chime), the chart glows, the full word writes itself under the patient in big letters with the healed box in coral, and the card flips into the album. Bubble: "All better! {word} — the mirror shows a {label} too." Plurals: "All better! {plural}: more than one {singular}."

## 8. Settings
1. **Help** (Level 2): Every clue · Boxes + first letter · Boxes + word bank · First letter only · Word bank only · Plain line. Visible at rest: the boxes/line, first letter and bank change on the board.
2. **Rule unit** (Level 3, per locale; e.g. en ck or k · tch or ch · ai or ay · dge or ge). Visible at rest: the rule jar labels / rule tiles.
(The shell level picker: Heal the sick sound / Write the word / Rule letters / Plurals.)

## 9. Words (EN source)
- title: "Word Doctor's Clinic".
- instruction: "Spell the patient's name. Then look in the mirror: it shows what your letters spell."
- task lines: L1 "Heal the poorly sound — which letters go in the empty box?" · L2 "Spell the patient's name." · L3 Fill "Which rule letters go in the box?" · L3 Which one "Which spelling is right? Pick one, then look in the mirror." · L3 Sort "Sort the words into the rule jars." · L4 "There are two patients! Spell more than one."
- hints and celebrations: §7 exactly. Labels: "Listen", "Mirror", "Try the mirror", settings names as in §8.
- aria: "Patient: {label}", "Mirror: fogged", "Mirror shows {label}", "Mirror shows two {plural}", "Box {n}, empty", "Box {n}, {letter}", "Tile {grapheme}".

**Locale traps (the mirror works in every locale because every locale's library has dozens of one-letter picture neighbours — measured 2026-10-17: en 120 pairs, de 48, fr 29, es 54, pt 64, it 31, nl 142, sv 76, da 111, no 82, fi 41 among words ≤ 6 letters):**
- **Level 1 is rebuilt per locale from its own neighbours**, never translated: de Hund/Mund/Hand, Fisch/Tisch, Hose/Rose/Dose, Topf/Kopf; fr lune/luge, robe/rose, œuf/bœuf; es gato/pato, luna/cuna, mano/mono; pt gato/pato/rato, faca/vaca, pão/mão; it cane/pane, naso/vaso, oca/foca; nl pan/pen, kam/jam/lam, vos/vis; sv hatt/katt, band/hand/tand, kopp/mopp; da hat/kat, hund/mund, bord/bold; no katt/hatt, skip/ski, lås/gås; fi kala/kana, matto/maito/mato, takki/taksi. The native reviewer approves each set.
- **Sound boxes differ by language:** de sch/ch/ei/ie/äu, nl ui/ij/oe/eu, sv sj/tj/ng, da/no kj/sk, fr ou/on/an/eau, es ch/ll/rr, it gn/gl/ch/sc, pt nh/lh/ão, fi has long sounds written double (kuu = one long sound → one box holds "uu"). Box splits come from a per-locale grapheme table authored by the native reviewer (never from code); the gate asserts every box string is in that table.
- **Capitalisation:** de nouns are capitalised — the first box takes a capital tile/key (the keyboard shows capitals for box 1 in de); all other locales lower-case in the boxes. The mirror lookup is case-folded except in de, where a lower-case first letter is a recorded miss with the hint "Nouns start with a capital letter."
- **Diacritics are letters:** å ä ö ø æ é è ê ç ñ ü ß õ ã à ì ù — the keyboard per locale carries them; the lookup is exact on them (pão ≠ pao), and a missing accent gives fog, never a silent heal.
- **Rule units are per locale (Level 3):** de: ck/k and tz/z after a short vowel (Socke/Haken, Katze/Kerze), ie/i; nl: double consonant in plurals after a short vowel (kat→katten), ei/ij (word-only); sv: double consonant after a short vowel (katt/kat-type), sj-sound spellings (word-only); da/no: double consonant after a short vowel; fr: c/ç/qu before a/o/u, -eau/-o (word-only); es: c/qu, g/gu before e/i; pt: ç/ss, rr/r; it: c/ch, g/gh before e/i; fi: long vowel or consonant doubled (tuli/tuuli, kuka/kukka — pictures: kukka/kukko/kuu). A locale with fewer than 8 transparent rounds for a unit drops that unit (recorded refusal); every locale ships ≥ 1 unit.
- **Plurals per locale (Level 4):** de -e/-en/-er/-s (+umlaut tile ä/ö/ü that swaps a vowel: Hand→Hände), nl -en/-s, sv -ar/-or/-er, da -e/-er, no -er/-ar, fr -s/-x (mute — the mirror is the only feedback that shows it, perfect for fr), es/pt -s/-es, it vowel swap (-o→-i, -a→-e: the last-letter box swaps), fi -t. Ending tiles are per-locale data; labels come from the vocab plural column, so the right answer is always the library's own plural.
- **TTS only as a bonus** (5 of 11 locales): no step depends on hearing; the picture is the prompt, the mirror is the feedback.

## 10. Sound off, access, phones
- Silent legibility: patient picture → spell → mirror picture. Nothing needs sound.
- Keyboard: physical keys type into boxes; Tab to the tray/mirror; Enter on the mirror = Check; Backspace empties the last box.
- aria-live: "The mirror shows {label}" / "The mirror is foggy: {letters}" / "All better".
- Taps ≥ 44 px (tiles 48–56, keys 44 touch, mirror button 56–64).
- Pictures 150 px at 704 (plural 110), 96 px at 360 (plural 72; never under 64).
- Phone: patient and mirror stay side by side (the comparison is the point); album hides behind a small "album" chip.

## 11. Distinct from
- **Dictation Desk (premium tool)** — the class writes on paper and the tool uncovers the word sound by sound; here the child builds the spelling and a mirror shows the word it makes.
- **Heart Words (premium tool)** — maps irregular words sound by sound; here regular spelling, rules and plurals with picture feedback.
- **Row 74 The Rewind Rail / Row 73 The Writing Carriage** — handwriting and spacing; nothing about spelling choices.
- **Picture Word Wall (tool)** — shows a word for a picture; the mirror does the reverse (a picture for a spelling) and only as feedback.
- Not a reused invention: no registered design uses "the letters draw their own picture".

## 12. Build plan
- **The mirror index holds NOUN pictures only.** Adjective/state pictures are excluded (weather/hot, cold, sunny, rainy, cloudy, partly_cloudy, stormy, thunderstorm; every emotions/ picture; activities/ verb pictures): spelling "hot" for *hat* must give fog, not a smiling sun the child would read as "sun" (seen on the weather contact sheet: weather/hot IS a smiling sun). **One canonical picture per word:** where a label has several pictures (cup, cap, hat, nail, map, frog…) the mirror shows the patient's own picture on a match, and otherwise a fixed canonical picture per word recorded in data (first verified theme; pan = around-the-house/pan, because kitchen-tools/pan is drawn as a pot; glass = kitchen-tools/glass, never the wine glass), so the same spelling always shows the same picture.
- **Data:** `mirror-chart-rounds.json` per locale: `graphemes` (box table), `level1:[{id, target, boxes, sick, tray}]`, `level2Pool:[nouns]`, `rules:[{unit, rounds:[…], wordOnly:[…]}]`, `plurals:[{noun, ending, swap?}]`, `keyboard` (letters). The mirror index is built at load from the page locale's picture vocabulary: `{folded string → {theme, noun, number:'sg'|'pl'}}` over all 1,495 nouns' singular and plural labels (+ the word-only lists for Level 3).
- **Core state** `{level, round, boxes:[{given, value}], tray, mirror:null|{kind:'match'|'other'|'fog', noun, number, letters}, misses}`; functions `newRound(spec)`, `place(tile, box)`, `clear(box)`, `spelled()`, `lookUp(str)` → `{noun, number}|null`, `look()` → mirror result, `isHealed()`.
- **Gate's own ground truth** (`verify-mirror-chart-core.js`): its own copy of each round's correct spelling written in the gate; asserts `isHealed` iff spelled == target (and number matches); for every tray tile in Level 1 the gate predicts its mirror outcome from its own vocab scan and compares with `look()`; no round's wrong tile spells the target's own word in another form; every Level 1 round has ≥ 1 wrong tile that shows a real picture (en: ≥ 12 of 16 — exactly 12 in the table above: rounds 1–8, 10, 13–15); every picture exists and is a colour theme; tray slot balance; the bots ("first tile", "single letter", "two-letter tile") ≤ 6/16; de capital rule; diacritic exactness (a folded-accent string never heals); plurals: singular yields one picture, the right plural two.
- **Mutations:** heal on prefix match · lookup ignores diacritics · lookup ignores number (singular heals a plural patient) · fog shown for a real picture word · mirror shows the patient picture for a wrong spelling · de lower-case first letter heals · word bank omits the right word · Level 2 first-letter help gives two letters · tray slot always 0 · plural "foxs" heals · it vowel swap not applied.
- **Pictures to verify on contact sheets:** around-the-house (lamp, hose, pan, rug, bed, cup, clock, lock, fork), spring (nest, bud, snail, grass, bunny), accessories (vest, sock, cap, hat, watch), animals, kitchen-tools (jug, mug, glass — seen 2026-10-17: glass is a clear tumbler, mug a blue mug, jug an orange jug, all distinct), music/drum, vehicles, beach, miscellaneous/leaf, camping, 4th-of-july/flag, weather/hot, furniture (crib, bench), farm-animals, clothing (shirt, skirt — must read as different at 96 px), fruits, body-parts/nose, flowers/rose, summer/beach, at-the-supermarket/milk, classroom/desk, toys/train. christmas/sack and christmas/bell (the sock/sack and bell/ball/bull neighbours) — confirm at 96 px; if the sack reads as a Christmas present bag, round 7's tray becomes o · i · u (both wrong tiles fog) and that is still valid.
- **Risks:** a mirror that recognises every noun can show a picture the child finds surprising (e.g., "hot" is a weather picture of heat) — every Level 1 competitor's picture is listed in data and seen; free-play surprises are fine. Word-only rule rounds show the WORD on a clean mirror (clear letters, no fog) when it is in the unit's list — the same physics without art.
- **Blocked:** none. (dge/ge and ay have no pictures — they ship as word-only rounds, which is honest: the mirror clears to show the real word.)

## 13. The four questions
1. **Would a 5–8-year-old choose it again?** Yes — a mirror that turns your letters into pictures is a magic trick, and spelling nonsense on purpose to see the fog is play that is still spelling.
2. **Would a teacher put it on the board?** Yes — "you wrote cup, and that's a cup" is the clearest possible feedback for L.1.2.e, it covers every Write-the-Word worksheet as a help setting, and the rules and plurals are shown, not lectured.
3. **Would a parent trust it?** Yes — library pictures only, no scores or fever numbers, works with the sound off, and the right spelling is always the library's own word in the family's language.
4. **The invention:** a mirror that shows only what your letters really spell — the patient is healed when the mirror shows the same picture.

## 14. Critic review (2026-10-17)
Scores before → after: invention 5→5 · fun 5→5 · completeness 4→5 · correctness 4→5 · distinctness 5→5 · reality 3→5
What changed:
- Round 2 (hat, wrong tile o → "hot") would have shown weather/hot, which is a smiling SUN: a child reads it as "sun" and the feedback lies. Round 2 is now mop (a → map, a real one-letter neighbour); the mirror index is restricted to noun pictures, and a canonical-picture rule makes the same spelling always show the same picture. 12 of 16 Level 1 rounds still show a real other picture.
- fruits/peach and fruits/cherry are drawn as apples: the tch/ch unit uses couch instead of peach, Level 4 uses couches, and cherry/strawberry come from the supermarket set.
- The ai/ay rule unit had 7 rounds (below the 8-round floor it set itself): rain and say added (9). ck/k gains cake (k after a long vowel), so the "long vowel → k" half of the rule is actually exercised.
- The mirror (your letters draw their own picture) is kept as the invention: it is the clearest spelling feedback possible, silent-legible, and works in every locale from that locale's own one-letter neighbours.
- Layout check (2026-10-17): switched to stacked — split stage column is ~370 px at 704.
