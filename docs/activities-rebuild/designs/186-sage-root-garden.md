# Row 186 — The Root Bulb (L.2.4.c)

## 0. Identity
- id `sage-root-garden.roots.l-2-4-c` (KEPT) · grade 2 · Common Core L.2.4.c (use a known root word as a clue to the meaning of an unknown word with the same root) · strand Language · page title (frozen) "Sage's Root Garden — Find the Root Word Family (Grade 2)" · own files `mini tools/root-bulb-core.js`, `root-bulb-activity.js`, `root-bulb-activity.html`; manifest row stays in `sage-root-garden-activities.json` (id, slugs en de fr es pt it nl sv, titles, intros unchanged), `tool` repointed. da/no/fi get new slug/title/intro at build.
- worksheets it covers: **G1-397** Root Words with Pictures: Circle the Word · **G2-359** Root Words: Sort by the Root · **G2-375** Find the Root Word · **G3-398** Who Does It? The Person Word · **G3-399** Root Words in Sentences.
- what the old activity did: a root and three words — the family member and two look-alikes; tap the one that grows from the root. **Kept:** all 8 rounds in each of the eight authored locales (en farm … jump; de spiel … wasch; fr chat … grand; es flor … papel; pt flor … livro; it gatto … sale; nl kat … spel; sv sol … stor), and the sv set's excellent "contains the root's letters but is not family" traps (bil → biljett, stor → stork/storm, hund → hundra). **Fixed:** in en and most locales every look-alike merely LOOKED like the root and did not contain it, so "pick the word that starts with the root's letters" solved 8/8 without any thought about meaning; the new en Level 1 has look-alikes that DO contain the root's letters (pigeon, starting, panther, antler, caterpillar, teacher-for-tea), and the bulb shows why they still do not grow.

## 1. The pitch
"Plant a word on Sage's root bulb: the root's letters sink into the bulb, and whatever is left above the soil has to be a real growing part — an ending like -er or -ful, or a real word — or it withers. A word that only looks like the root can't sink at all."

## 2. Why a child will want it again (the fun)
- **A bulb you feed words to.** A big drawn bulb sits in the soil with the root word printed across its skin: **farm**. The child drags a word card down onto it. A family member *sinks*: the letters f-a-r-m slide down into the bulb one by one with a soft *glug*, and "-er" stays above the soil and unfurls as a green shoot with a leaf — a living ending. The word now reads across bulb and shoot: farm|er.
- **Look-alikes fail in two funny ways.** "former" can't sink at all: the bulb's letters light one by one and stop at the mismatched "o", and the card bounces off. "pigeon" on **pig** DOES sink — p-i-g go down — but the leftover "eon" is not a part: it pokes out as a grey, curled stub, wilts, and the whole card pops back out. Children laugh at the stub.
- **Sentences make it grow on purpose** (Level 2): the bulb **bake** and three endings waiting as shoots (-er, -ing, -ed); plant -er and the e melts into it — *baker* — while the occupations picture of the baker appears beside the sentence.
- **Digging up roots** (Level 4): a family word lies on the soil; tap where the root ends and the ending lifts off like a weed — "spoon|ful" — and the bare root drops into the ground as a bulb, its picture blooming above it.
- **End-of-round show:** each solved root is planted in Sage's bed along the bottom as a small drawn bulb token with its shoots; after the set, all the shoots grow a leaf at once.
- No timer, score, streak or lives.

## 3. The skill and the misconception
- **Skill:** a word family shares a root you already know; a family word = root + a part (ending, prefix, or a second word); the root's meaning is a clue to the new word's meaning (farmer = someone who farms; spoonful = as much as a spoon holds); the right family form fits the sentence (baker / baking / baked).
- **Misconception 1 — "looks alike = same family"** (former for farm). Pushback: the root's letters cannot all sink; the bulb shows exactly where the spelling breaks.
- **Misconception 2 — "contains the root = same family"** (pigeon for pig, teacher for tea, caterpillar for cat). Pushback: the root sinks, but the leftover is not a part — it withers as a stub. The meaning test is made physical: "-eon" means nothing, so pigeon isn't "pig + something".
- **Misconception 3 — any ending fits** (The *baking* sells bread). Pushback (Level 2): the grown word is read in the sentence; the person-picture appears only for the person word.
- **Misconception 4 — the root is the first few letters** (cutting "sp|oonful"). Pushback (Level 4): a wrong cut leaves pieces that are not root + part, and they snap back together.
- **Misconception 5 — spelling changes break families** (baker has no "bake", sunny has two n's). Pushback: the bulb animates the e melting into -er and the extra n budding before -y, so the root is visibly still there.

## 4. The stage
`layout:'split'` at ≥ 700 px: stage left (470 × 440), bubble column right (200 px).

**At 704 px:**
- **The bulb** (centre-low, 200 × 150, drawn: a cream-brown bulb with three root threads, 2 px ink, in a drawn soil band 450 × 90): the root word across its skin, Nunito 34 px bold. Above the soil line, the **shoot zone** (450 × 110) where parts stand as green shoots carrying their letters (Nunito 30 px; a shoot is a drawn stem + one leaf).
- **Word cards** (Level 1, three, on a shelf above: 132 × 56 cream cards, Nunito 24 px; Level 3 six cards in two rows).
- **Ending shoots** (Level 2: three seedling tags in a tray, 96 × 56, Nunito 24 px: "-er", "-ing", "-ed" …) and the **sentence** above them (Nunito 20 px, gap 96 × 44).
- **Level 3:** two bulbs side by side (190 × 140 each) and a compost heap (drawn brown mound 120 × 90) at the right.
- **Level 4:** the family word lying on the soil as letter tiles (40 × 52, Nunito 30 px) with a cut-gap hit area (44 × 52) between every two letters.
- **Pictures** (where the root or the person is picturable): library picture 96 px beside the bulb (Level 4: the root's picture blooming above the planted bulb; Level 2: the person picture beside the sentence, ONLY after a right answer).
- **Sage's bed** (bottom strip 450 × 48): drawn bulb tokens of solved roots.
- **Task line** (≤ 24 px): L1 "Plant the word that grows from the root." · L2 "Which ending makes the word for this sentence?" · L3 "Plant every word on its own root. Words that don't belong go to the compost." · L4 "Dig up the root: tap where the root ends."

**At 360 px** (stacked): bulb 160 × 120 (root 26 px); shoot zone 340 × 90 (letters 22 px); word cards 104 × 48 (20 px); Level 3 bulbs 150 × 110 stacked over a compost row; Level 4 tiles 30 × 44 (22 px, 44 px tall hit areas; 10-letter words fit at 30 px); pictures 64 px. Check bottom ≤ 690 at 360 × 740 and ≤ 620 at 320 × 640 (at 320 Level 4 tiles are 27 px with full-height hit areas).

Pictures (library, colour; the word-parts bank's picture pins, opened by its gate, plus): occupations/baker, farmer, teacher, singer; activities/running (Level 2 "runner"); animals/dog, farm-animals/pig, zoo-animals/lion, fruits/lemon, kitchen-tools/spoon, music/violin (Level 4). Occupations pictures hold their own tools (ruling) — no round asks about a tool, and no answer depends on the person's sex (-er words are neutral).

## 5. The hand
- **Level 1 / 3 — drag a card onto a bulb** (or tap card then bulb; keyboard: Tab card, Enter, Tab bulb, Enter). The drop IS the decision (one card per Check in Level 1; Level 3 places all six, then Check). On drop, 400 ms: the root's letters are matched left to right against the card (a teal light runs along both); a match sinks letter by letter (60 ms each); the leftover rises as a shoot (300 ms). Level 3 cards can be moved until Check; the compost accepts anything.
- **Level 2 — drag an ending shoot onto the bulb's shoot zone.** The bulb grows the word with the locale's spelling rule animated (en: final e melts into a vowel ending; a short final consonant buds a twin before -er/-ing/-y/-ed); the grown word slides into the sentence gap.
- **Level 4 — tap a cut gap** between two letters: a dashed cut line appears (tap another gap to move it). Check lifts the piece outside the cut; if root + part, the part flies off as a weed and the root drops into the soil as a bulb (doubled letter goes with the ending; a dropped e returns to the root, 300 ms).
- **Free play:** after a round, any word card from the round can be dragged onto the bulb to see what happens (sink, bounce, or stub) — nothing is recorded.

## 6. The rounds
One right answer per round. Card/shoot positions are FIXED per round (balanced) and the pass reshuffle permutes round order only.

**Level 1 — Grow from the root (G1-397), EN, 10 rounds** (cards A · B · C; what the bulb does to each):
| # | root | A | B | C | right | the look-alikes on the bulb |
|---|---|---|---|---|---|---|
| 1 | farm | farmer | former | forest | A | both bounce (no "farm") |
| 2 | help | hammer | helper | hello | B | both bounce |
| 3 | care | cabin | carrot | careful | C | both bounce (carrot breaks at the second r) |
| 4 | teach | teacher | feather | beacon | A | both bounce |
| 5 | pig | pigeon | piggy | pillow | B | pigeon: stub "eon" · pillow bounces |
| 6 | star | stare | starting | starry | C | stare: stub "e" · starting: stub "ting" |
| 7 | pan | pancake | panther | panda | A | panther: stub "ther" · panda: stub "da" |
| 8 | ant | antler | anthill | antenna | B | antler: stub "ler" · antenna: stub "enna" |
| 9 | cat | caterpillar | catch | catfish | C | caterpillar: stub "erpillar" · catch: stub "ch" |
| 10 | tea | teacup | teacher | team | A | teacher: stub "cher" (it grows from **teach**, not tea — round 4!) · team: stub "m" |

**Measured (`work-28`):** positions A/B/C = 4/3/3. "The only card that starts with the root's letters" = 4/10 (rounds 1–4; in 5–10 two or three cards start with the root). "The longest card" unique-right = 1/10; "the shortest" unique-right = 1/10. The gate requires each ≤ 40 % per locale.
The en part list (gate ground truth): endings -er -ing -ed -s -es -y -ful -less -ness -ly -ist -ess -ade; prefixes re- un- pre-; plus any word in the locale's signed word list (pot, cup, cake, hill, fish, shell …). No stub in the data may be a part (asserted: eon, e, ting, ther, da, ler, enna, erpillar, ch, cher, m). **Doubling and e-drop in the sink (critic):** `sink` first strips the locale's spelling change before judging the leftover — a leftover that starts with a twin of the root's last consonant followed by a part (pig|gy, star|ry, sun|ny, run|ner) is a member, the twin budding green; a root ending in e whose e is missing before a vowel part (bak·er) is a member, the e fading. "starry" therefore grows, "stare" (leftover "e", no part) withers.

**Level 2 — Which ending? (G3-398, G3-399), EN, 12 rounds** (shoots A · B · C):
| # | root | sentence | shoots | right |
|---|---|---|---|---|
| 1 | bake | The ___ sells fresh bread. | -er · -ing · -ed | A (baker — e melts; picture occupations/baker) |
| 2 | bake | Mom is ___ a cake. | -ed · -ing · -er | B (baking — e melts) |
| 3 | bake | We ___ cookies yesterday. | -er · -s · -ed | C (baked) |
| 4 | run | The fastest ___ won the race. | -er · -s · -ing | A (runner — n buds; picture activities/running) |
| 5 | farm | The ___ feeds the pigs every morning. | -ing · -er · -s | B (farmer; occupations/farmer) |
| 6 | help | Thank you for being so ___. | -er · -ing · -ful | C (helpful) |
| 7 | teach | Our ___ reads us a story. | -er · -es · -ing | A (teacher; occupations/teacher) |
| 8 | paint | Leo is ___ a picture of a horse. | -er · -ing · -ed | B (painting) |
| 9 | play | The kids are ___ outside. | -er · -s · -ing | C (playing) — critic fix: the draft offered -ful, and "The kids are playful outside" is a correct sentence: two right answers |
| 10 | sun | It is warm and ___ today. | -y · -s · -er | A (sunny — n buds) |
| 11 | jump | The frog ___ into the pond yesterday. | -s · -ed · -ing | B (jumped) |
| 12 | bake | Grandpa ___ bread every Sunday. | -er · -ing · -s | C (bakes) |
Positions 4/4/4. Endings right: -er 4, -ing 3, -ed 2, -y 1, -ful 1, -s 1 — "always -er" scores 4/12.
**No picture before the answer (critic fix):** the draft showed the person picture beside the sentence in exactly the four -er rounds, so "picture shown → -er" solved 4/4 and "no picture → not -er" narrowed the rest. The person picture now appears ONLY on success, rising beside the grown word (baker, runner, farmer, teacher) as the reward; before the answer every Level-2 round looks alike. The gate checks each sentence has exactly one ending that fits (from the gate's own table, re-signed by the reviewer).

**Level 3 — Sort by the root (G2-359), EN, 7 rounds** — two bulbs, six cards, compost; each round 2 · 2 · 2:
1 play | sun: player, replay · sunny, sunset · plate, funny · 2 help | jump: helper, helpful · jumping, jumpy · hello, jumbo · 3 paint | care: painter, painting · careful, careless · plain, carrot · 4 farm | teach: farmer, farmyard · teacher, teaching · teapot (contains "tea", not "teach"), former · 5 kind | spot: kindness, unkind · spotty, spotless · sport, kitten · 6 dream | color: dreamer, dreamy · colorful, colorless · dress, collar · 7 sweet | rain: sweetly, sweetness · rainy, raincoat · sweater, train (critic: "trusty/trustful" are not Grade-2 words; "train" CONTAINS rain — it sinks and leaves a front stub "t", the Level-1 containing trap in the sort). (From the signed word-parts bank; card order on the shelf is fixed per round with the two compost cards never adjacent.)

**Level 4 — Dig up the root (G2-375, G1-397), EN, 10 rounds** (right cut ‖): dog‖gy (picture dog) · pig‖gy (pig) · lion‖ess (lion) · lemon‖ade (lemon) · spoon‖ful (spoon) · violin‖ist (violin) · kind‖ness · help‖er · un‖kind (the prefix lifts off the FRONT) · re‖play. **Measured (critic recount):** "cut before the last 2 letters" 3/10, "before the last 3" 4/10, "after the first 2" 2/10, "after the first 3" 2/10 — none above 40 %.

**Order:** order-only reshuffle per pass.

## 7. Check, the misses, the success
- **Check with nothing planted / no cut:** hint, no miss — the bulb pulses: "Plant a word on the bulb." / "Tap where the root ends."
- **Miss 1** — the bulb's own reaction is the showing: a bounce (the letter where the spelling breaks glows coral on the card and on the bulb) or a withering stub (the stub stays grey above the soil for 2 s). Hints: bounce — "{word} doesn't have all of {root} in it." · stub — "{root} sinks in, but {stub} isn't a part that grows. Is {word} really about {root}?" · Level 2 — the grown word sits in the sentence for the child to read: "The *baking* sells fresh bread." — "Read it. Who sells bread?" · Level 4 — the wrong pieces wobble and snap back: "{a} + {b} — is that a root and an ending?"
- **Miss 2** — Level 1: the right card's root letters glow teal and its ending glows green before it is planted. Level 2: the sentence's clue word glows (sells / is / yesterday / every Sunday / so) and the right shoot leans toward the bulb — never a picture. Level 3: each misplaced card shows a teal outline of the bulb it belongs to. Level 4: the root's picture (or the root letters) shows faintly above the right cut. Hint: "Find {root} inside the word — what grows after it?"
- **A new move takes the help away** until the next Check.
- **Success:** the shoot unfurls a leaf, the bulb glows, the word reads root|part. Bubble with the meaning: "farm + er = farmer: someone who farms!" · "spoon + ful: as much as a spoon holds!" · "help + ful: full of help!" · Level 3: "Every word is on its own root!" · Level 4: "spoonful — the root is spoon!" (Meaning lines are authored per family per locale in the data — never generated.)

## 8. Settings
1. **Root picture:** shown (default where the root has one) · hidden. Visible at rest: the picture beside the bulb or not.
2. **Spelling help:** on (default — the e melting and letter budding are animated slowly, 600 ms) · off (the change happens in one 200 ms step, for confident spellers). Visible at rest: a small drawn "slow" glyph on the bulb's label strip (two small tick marks vs one) — and in Level 4 the cut line's dash length.

## 9. Words (EN source)
- title "Sage's Root Garden".
- instruction "Big words grow from little root words. Plant a word on Sage's bulb: if the root sinks in and what's left can really grow, it's in the family."
- task lines §4 · hints and celebrations §7 · settings names · aria: "Root {root}" · "{word}: the root sank in, {part} is growing" · "{word}: {stub} withered — not in the family" · "{word} bounced — {root} isn't in it" · "Cut after {letters}".

**Locale traps:**
- **Each locale's part list is its own** (gate ground truth, signed by the native reviewer): de -er -in -ung -heit -keit -chen -lein -ig -lich, ge-/be-/ver- prefixes, compounds with Fugen-letters; fr -eur -euse -iste -ier -ière -on -ette, re-/dé-; es -ero -era -ería -ito -ita -oso, des-/re-; pt -eiro -eira -ista -inho -inha -aria; it -aio -ino -etta -ista -iera -ería; nl -er -je -tje -ig, compounds with -e-/-s-/-en- linking letters; sv -are -ig -ning -lek, compounds; da/no -er -ig -else, compounds; fi -ja/-jä (person), -inen, -llinen, compounds.
- **Roots that change inside the family:** de backen → Bäcker (umlaut), fahr- → Fahrrad; fr chant → chanteur; es/pt/it roots lose their final vowel before an ending (gato → gat|inho, flor → flor|ero, libro → libr|eria). The data stores each family's sinking STEM (the bank's `aStem`), e.g. it "libr" for libro; the bulb shows the root word and sinks the stem with the vowel fading out (animated, never a child decision).
- **Spelling rules animated per locale:** en e-drop and consonant doubling; nl doubling (spel → speler is single, zon → zonne-bloem takes -ne); de nothing doubles but umlauts appear; sv/da/no compounds may insert -s-; fi consonant gradation (e.g. *kirja → kirjasto*, no gradation; avoided in data where gradation would change the root's letters at this grade).
- **Containing traps per locale** are authored natively (sv already has bil → biljett, stor → stork/storm, hund → hundra; de candidates Spiel → Spiegel do NOT contain the root and stay as bounce traps).
- **Gender in sentences (Level 2):** the sentence frames are authored with the right article for the grown word (de "Der Bäcker verkauft Brot." — Bäcker masculine; fr "Le boulanger" is not in the family of "pain", so fr uses "La fleuriste vend des fleurs." with fleur → fleuriste); no frame lets an article give away the ending.
- **Person words and sex:** de/fr/es/pt/it person words are gendered (Bäcker/Bäckerin, chanteur/chanteuse) — the round uses the form that matches the frame's article; pictures never decide it (the gate checks that no round's answer differs between the masculine and feminine reading).

## 10. Sound off, access, phones
- Silent legibility: sinking letters, the living shoot, the withering stub and the bounce point carry the reasoning; TTS reads root, cards and sentences as a bonus.
- Keyboard: Tab through cards/shoots/bulbs; Enter picks and plants; Level 4 Left/Right move the cut, Enter checks.
- aria-live per §9. Taps ≥ 44 px (cards 104 × 48+, shoots 96 × 56, cut gaps 44 tall). Pictures ≥ 96 px at 704 and ≥ 64 px at 360/320.

## 11. Distinct from
- **Row 187 The Weld (this batch)** — compounds stand on their last word; here every family member is root + part tested by sinking. Compounds appear here only as family members (teacup, anthill), never as the lesson.
- **Row 185 The Clue Jug (this batch)** — a garden too, but the jug finds clues in a sentence; nothing sinks.
- **Row 75 The Ending That Arrives With the Second Plate** — plural endings driven by quantity; here endings are tested for being real parts of a family.
- **New 255 The Letter Barges** — syllables by vowels floating; unrelated.
- Not a reused invention: no registered design sinks a root's letters into a bulb and judges the leftover as a living part or a dead stub.

## 12. Build plan
- **Data** `root-bulb-rounds.json` per locale: `grow:[{root, stem, cards:[{word, kind:"member"|"bounce"|"stub", part|stub}], right}]`, `fit:[{root, stem, sentence, shoots:[…], right, grown, picture?}]`, `sort:[{roots:[a,b], cards:[{word, home:0|1|"compost"}]}]`, `dig:[{word, cut, root, picture?}]`, `parts:{endings:[…], prefixes:[…], words:[…]}`, `spelling:{eDrop, doubling, …}`, `meaning:{familyId: sentence}`.
- **Core state** `{level, round, placed:{card:bulb}, shoot:null, cut:null, misses}`; functions `sink(word, root)` → `{matched:k, leftover, kind:"member"|"stub"|"bounce"}`, `grow(stem, ending)` (applies the locale's spelling rules), `cutAt(i)` → `{root, part, valid}`, `check()`.
- **Gate's own ground truth** (`verify-root-bulb-core.js`): its own part lists and spelling rules per locale; asserts for every card that `sink` returns exactly the kind the data claims (a "stub" card contains the stem and its leftover is NOT in the part list; a "member" leftover IS a part or a listed word; a "bounce" card does not contain the stem); every Level-2 round has exactly one ending whose grown word appears in the gate's signed fit table; every Level-4 word has exactly one valid cut; the §6 bots each ≤ 40 % per locale; no dropped bank word (en "hairy") is used.
- **Mutations:** a stub accepted as a member · prefix match only (first letters) accepted as sinking · e-drop not applied (bakeer) · doubling not applied (runer) · Level 4 accepts any cut that leaves a real word · compost refuses a look-alike · right card always A · meaning line generated instead of read from data.
- **Pictures to confirm:** occupations/baker, farmer, teacher; activities/running; animals/dog; farm-animals/pig; zoo-animals/lion; fruits/lemon; kitchen-tools/spoon; music/violin.
- **Risks:** long de/fi compounds in Level 4 at 320 px (the gate measures; words over 11 letters refused for Level 4); stem-variant animations for es/pt/it.
- **Blocked:** none.

## 13. The four questions
1. **Would a 5–8-year-old choose it again?** Yes — feeding words to a bulb, watching letters sink and a shoot unfurl, and laughing at a withered "eon" stub is a toy they'll play with between rounds.
2. **Would a teacher put it on the board?** Yes — "pigeon has pig in it, so is it a pig word?" is the exact argument L.2.4.c wants, and the bulb settles it with a visible part test; one apparatus covers five worksheets including person words and family forms in sentences.
3. **Would a parent trust it?** Yes — library pictures, calm motion, word families authored by native speakers with their real spelling changes.
4. **The invention:** the root sinks into the bulb, and only a real ending or a real word can grow from what's left — a word that merely contains the root withers.

## 14. Critic review (2026-10-17)
Scores before → after: invention 5→5 · fun 5→5 · completeness 4→5 · correctness 3→5 · distinctness 5→5 · reality 5→5
What changed:
- Level 2 round 9 had two right answers ("The kids are playful outside" is correct) — -ful replaced by -s.
- Level 2 picture tell: the person picture appeared only in the four -er rounds (picture ⇒ -er, 4/4). Now it appears only on success; miss 2 glows the sentence's clue word instead.
- sink() spec now strips doubling/e-drop before judging the leftover (starry/piggy/sunny/baker grow; stare withers); -ess/-ade added to the part list; Level 3 "reteach", "trusty/trustful" replaced (teaching; rain with the containing trap "train").
