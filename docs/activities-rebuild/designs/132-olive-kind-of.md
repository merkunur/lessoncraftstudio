# Row 132 — The Climbing Tree (L.1.5.b)

## 0. Identity
- id `olive-kind-of.category-attribute.l-1-5-b` (KEPT) · grade 1 · Common Core L.1.5.b (define words by category and by one or more key attributes — "a duck is a bird that swims") · strand Language · page title (frozen) "Olive's Kind-Of Tree — What Kind of Thing Is It? (Grade 1)" · own files `mini tools/climbing-tree-core.js`, `climbing-tree-activity.js`, `climbing-tree-activity.html`; manifest row stays in `olive-kind-of-activities.json` (id, slugs en..sv, page_title, page_intro unchanged), `tool` repointed. da/no/fi get new slug/title/intro at build.
- worksheets it covers: **G1-160** Three Groups.
- what the old activity did: a picture + a clue sentence ("It flies and has feathers."), tap the category word among three. **Kept:** all eight EN rounds (robin, banana, truck, hat, rose, dog, apple, boat) with their clues and distractor categories, and every locale's authored rounds and clues (de/fr/es/pt/it/nl/sv) as seed data; the frozen promise ("read the clue… tap the group it belongs to"). **Gone:** three word buttons and a Check; the category is now a place on a tree, and the definition (category + attribute) is built by climbing.

## 1. The pitch
"Every branch of Olive's tree holds one kind of thing, and every twig on it one kind of that kind — so you climb a picture up to where it belongs, and the path you climbed reads out its definition: a duck is a bird that swims."

## 2. Why a child will want it again (the fun)
- **Climbing is the hand-feel.** The child drags the picture up the trunk; it follows the bark, and at each fork it leans toward the branch the finger goes to. Let go on a branch and it hops along to the family perch at the end.
- **The tree is honest by gravity.** At Check a right perch holds — the family members shuffle up to make room and the newcomer settles with a leafy rustle. A wrong branch can't hold it: the branch dips, and the picture slides back down the bark to the roots with a soft *whoosh* — funny, never scolding.
- **The definition grows as a leaf.** In the climbing levels, every fork the picture passes writes part of a sentence on a leaf tag ("A duck is" → "a bird" → "that swims."). A finished leaf turns gold and stays on the twig; across a pass the tree fills with golden definition leaves and the family perches fill up — the tree visibly gets fuller.
- **End of a pass:** the whole tree sways once, every gold leaf glints in turn left to right, and Olive's (unseen) hoot is a two-note owl tone.
- No timer, score, streak or lives.

## 3. The skill and the misconception
- **Skill:** say what KIND of thing something is (category) from its key attributes (the clue), and define a word by category + one attribute that sets it apart from others of its kind (L.1.5.b); sort pictures into three groups (G1-160).
- **Misconception 1 — category by surface feature** (the yellow banana with the yellow chick; the round ball with the apples). Pushback: the decoy branches carry family members that LOOK like the newcomer (Level 2/3 rounds plant them); a look-alike branch still dips and drops it.
- **Misconception 2 — attribute without category** ("a duck is a thing that swims" — but so is a fish, a boat). Pushback: in Level 3 the twig is only reachable THROUGH the right branch: the "swims" twig on the bird branch holds the swan, and the "floats" twig on the vehicle branch holds the boat — the same attribute lives on different branches, so the category has to come first.
- **Misconception 3 — any true attribute is a definition** ("a duck is a bird that has two legs" — true of every bird). Pushback: every twig on a branch is one attribute that only some of that kind have; a newcomer on the wrong twig sits beside a family member it does not share the attribute with (a duck beside the owl on "hoots at night") and slides off at Check.

## 4. The stage
Stacked (one column) at every width — the tree is tall and the bubble sits under it (layout check 2026-10-17: no `layout:'split'` — its stage column is only ≈ 370 px at 704); the stage is ≈ 648 px wide at 704.

**At 704 px** (tree stage 480 × 500):
- **The tree** (drawn apparatus geometry, no leaves-with-faces): a trunk 46 px wide from the bottom centre, forking into **three branches** (left, up, right), each a tapered 22→12 px limb ending in a **family perch** — a flat shelf 150 × 14 with a wooden sign (130 × 36, the category word in Nunito 22 px bold; content). Trunk/branches `#8C5A2B` with a 3 px ink outline; a soft green canopy blob (`#7FB23A` at 25 % opacity) behind, as shape only.
- **Family members** (Level 1): on each perch ONE library picture **96 px** of the branch's kind, standing on the shelf (three branches × 150 px perches fit the 480 stage; two members per perch would force them under 96 px). Level 2 perches start empty and fill as a **fanned stack**: each placed picture stays 96 px and overlaps the one before by 72 px (three pictures = 144 px wide).
- **Twigs** (Level 3 only) — **the two-stage climb**: when the newcomer is let go on a branch, the view follows it — the tree zooms (450 ms) until that branch fills the stage, and three twigs fan out of it, each with an **attribute sign** (words only, 18 px, e.g. "that swims" — the words ARE the content, so no icon picture is needed) and its one resident at **96 px**. A small drawn "back down" trunk tab (44 × 44) zooms out again. A wrong branch never zooms: it dips and drops the newcomer at Check (§5), so the category really must come first.
- **The newcomer** (start of a round): at the roots, in a cream "nest box" frame 150 × 150 — library picture **110 px**, and under it the **clue card** (≤ 2 lines, 20 px). In Level 2 the nest box shows the next picture at 96 px with the others waiting behind it as a stack of card edges (drawn geometry; no number).
- **The definition leaf** (Levels 1 and 3): a leaf-shaped tag (drawn geometry: a rounded lens shape 200 × 60) that hangs from wherever the newcomer is, its sentence written in 18 px.
- **Task line** above; **bubble** to the right (≥ 700) or under the tree.

**At 360 px:** tree 330 × 430; perches 104 × 12 with signs 96 × 30 (category word 16 px); one family member **80 px** per perch (Level 1); Level 2 fans at 72 px with a 16 px offset (104 px for three); Level 3's zoomed branch shows three twigs with residents at **80 px** and attribute words at 15 px; newcomer 96 px in a 120 × 120 nest box; clue card 16 px. Check bottom ≤ 690 at 360 × 740 and ≤ 610 at 320 × 640 (at 320 the perches are 96 wide and the family member 72 px — never under 64).

Pictures (library, colour; theme JSON verified AND seen on the contact sheets by the critic 2026-10-17): birds-2/robin, swan, woodpecker, parrot; animals/duck, owl, dog, cat, tiger, zebra, elephant, whale, dolphin; at-the-supermarket/banana, apple, cherry, pear, orange, bread, cheese, carrot (the supermarket set — fruits/cherry is drawn as an apple); vegetables/radish; desserts-and-sweets/cake, muffin; vehicles/truck, car, airplane, helicopter, boat, ship, train (vehicles/truck, never post-office/truck, which has "Post" printed on it); accessories/hat, cap, glove, mitten, sock; clothing/shoe, coat, dress; flowers/rose, tulip, sunflower, daffodil, clover; farm-animals/chick (never in a round with the duck — near-identical at small size); toys/ball, kite, blocks. **Not used:** tree/oak (does not exist in the library), miscellaneous/leaf (part of a plant, not a plant), the old attribute icons (they would render under 96 px).

## 5. The hand
- **Drag the newcomer** from the nest box up the trunk: it follows the finger but stays on the bark (it snaps to the nearest point on the trunk/branch path within 40 px); at a fork it leans toward the branch under the finger (tilt 8°, 80 ms). Dropping anywhere on a branch sends it hopping along to that branch's perch (Level 1/2) or to the twig under the finger (Level 3). Within 100 ms the leaf tag updates.
- **Tap instead of drag** (accessibility and phones): tap the newcomer, then tap a perch or twig — it climbs there by itself (500 ms along the path).
- **Move it again** before Check: drag it to another branch, or tap the roots to send it back.
- **Level 2 (Three groups):** nine pictures wait in the nest box as a 3 × 3 grid; each is climbed separately; a perch can hold up to 4 (it lengthens).
- **Check:** each newcomer on a right perch stays; a wrong one is shaken off (branch dips 10 px, 200 ms) and slides down the bark to the roots (600 ms).
- **Free play:** tap any family member or gold leaf to hear its word or definition (TTS bonus); between rounds, drag the finished newcomers along their own branch — they cannot be moved off it (the tree keeps what it knows).

## 6. The rounds
One round = one newcomer (Levels 1, 3) or nine (Level 2). Exactly one right perch/twig.

**Level 1 — What kind is it?** (picture + clue → one of three branches), 10 rounds. The old eight kept, plus two:

| # | newcomer | clue (en, kept) | branches (right first) | leaf on success |
|---|---|---|---|---|
| 1 | robin | It flies and has feathers. | bird · food · vehicle | A robin is a bird. |
| 2 | banana | It is yellow and you can eat it. | fruit · animal · clothes | A banana is a fruit. |
| 3 | truck | It has wheels and drives on the road. | vehicle · food · plant | A truck is a vehicle. |
| 4 | hat | You wear it on your head. | clothes · vehicle · food | A hat is clothing. |
| 5 | rose | It grows in a garden and smells nice. | plant · animal · vehicle | A rose is a plant. |
| 6 | dog | It has four legs and says woof. | animal · food · clothes | A dog is an animal. |
| 7 | apple | It is sweet and crunchy, and you can eat it. | fruit · vehicle · animal | An apple is a fruit. |
| 8 | boat | It floats and carries people on the water. | vehicle · clothes · plant | A boat is a vehicle. |
| 9 | chick | It is small and fluffy and says cheep. | bird · fruit · toy | A chick is a bird. (decoy: the fruit branch shows a banana — yellow like the chick) |
| 10 | ball | It is round and you can throw it. | toy · fruit · animal | A ball is a toy. (decoy: the fruit branch shows an orange — round) |

The family member on each branch per round is one library picture of that kind, chosen so that in rounds 2, 9 and 10 a decoy branch's member shares the newcomer's colour or shape (round 2: the animal branch shows the yellow chick; round 9: the fruit branch shows a banana; round 10: the fruit branch shows an orange).

**Level 2 — Three groups** (G1-160: nine pictures onto three branches, three each), 8 rounds:
1 animals · food · vehicles: dog, cat, tiger | apple, bread, cake | car, train, boat · 2 birds · clothes · plants: robin, owl, swan | hat, sock, shoe | rose, tulip, sunflower · 3 food · toys · animals: banana, cherry, bread | ball, kite, blocks | zebra, whale, dog (no toy car — a car is a vehicle in every other round) · 4 vehicles · clothes · birds: airplane, ship, truck | coat, mitten, cap | duck, parrot, woodpecker · 5 plants · animals · food: clover, daffodil, rose | elephant, dolphin, cat | bread, muffin, cheese · 6 clothes · vehicles · food: dress, glove, sock | helicopter, car, boat | bread, apple, cake · 7 birds · toys · plants: swan, robin, owl | ball, kite, blocks | tulip, daffodil, sunflower · 8 animals · clothes · vehicles: tiger, zebra, whale | coat, hat, shoe | train, truck, airplane. (Rules for every round: no two branches may contain each other — birds are animals, so "animals" and "birds" never share a tree; and **when "plants" and "food" share a tree, the foods are made foods (bread, muffin, cheese), never fruit or vegetables**, because an apple or a carrot is a plant part too and would have two homes.)
Family perches start empty in Level 2 (only the sign).

**Level 3 — Climb to the definition** (category branch, then attribute twig), 10 rounds. Branches per round are three mutually exclusive kinds; the right branch carries three twigs, each with one attribute that only some of that kind have, and one resident:

| # | newcomer | right branch | twigs on it (resident) — right twig first | leaf on success |
|---|---|---|---|---|
| 1 | duck | bird | that swims (swan) · that hoots at night (owl) · that pecks wood (woodpecker) | A duck is a bird that swims. |
| 2 | helicopter | vehicle | that flies (airplane) · that floats on water (boat) · that runs on rails (train) | A helicopter is a vehicle that flies. |
| 3 | cherry | food | that grows on a tree (apple) · that grows under the ground (carrot) · that is baked (bread) | A cherry is a food that grows on a tree. |
| 4 | tiger | animal | that has stripes (zebra) · that lives in the sea (whale) · that has a trunk (elephant) | A tiger is an animal that has stripes. |
| 5 | hat | clothes | for your head (cap) · for your feet (shoe) · for your hands (glove) | A hat is clothing for your head. |
| 6 | ship | vehicle | that floats on water (boat) · that flies (airplane) · that runs on rails (train) | A ship is a vehicle that floats on water. |
| 7 | radish | food | that grows under the ground (carrot) · that grows on a tree (apple) · that is baked (bread) | A radish is a food that grows under the ground. |
| 8 | dolphin | animal | that lives in the sea (whale) · that has stripes (zebra) · that has a trunk (elephant) | A dolphin is an animal that lives in the sea. |
| 9 | mitten | clothes | for your hands (glove) · for your head (cap) · for your feet (shoe) | A mitten is clothing for your hands. |
| 10 | muffin | food | that is baked (bread) · that grows under the ground (carrot) · that grows on a tree (apple) | A muffin is a food that is baked. |

The two wrong branches in each round come from {bird, vehicle, food, animal, clothes} minus the right one and minus any branch that contains it (never "animal" in a duck round). The attribute "that swims / floats" appears on two different branches across rounds 1 and 6 on purpose (misconception 2).

**Answer position:** the right branch's position (left / up / right) is balanced per level (Level 1: 10 rounds → 3/3/4; Level 3 the same), the right twig's position on its branch balanced 3/3/4, and positions re-shuffled per render while keeping the balance per pass. Level 2 branch order shuffled. The gate's bot "always the up branch", "the branch whose members share the newcomer's colour", "always the first twig" each ≤ 4/10.
**Order:** order-only reshuffle per pass.

## 7. Check, the misses, the success
- **Check with the newcomer still in the nest box:** hint, no miss — the trunk glows: "Climb the picture up to the branch where it belongs."
- **Miss 1** — the branch dips and the newcomer slides back to the roots; the leaf tag keeps the sentence it had ("A banana is a bird.") for a moment, then fades. Hint: "{label} can't stay on the {kind} branch. Read the clue again." (Level 3 wrong twig, authored whole per twig: "Yes, a duck is a bird. But is it a bird that hoots at night?" / "Yes, a mitten is clothing. But is it clothing for your head?")
- **Miss 2** — the stronger showing: the clue card's key words light (e.g. "feathers", "flies"), and the family members on the right branch do what the clue says (they bob once as if flapping — a 6 px lift; for attribute twigs the matching twig's attribute picture pulses); the newcomer waits at the roots. Hint: "Look at the glowing words. Which family is like that?"
- **A new move takes the help away** until the next Check.
- **Success:** the newcomer settles on its perch/twig, the family shuffles, the leaf turns gold with the full sentence; bubble repeats it: "A duck is a bird that swims." (Level 1: "A robin is a bird."; Level 2: "Birds: robin, owl, swan. Clothes: hat, sock, shoe. Plants: rose, tulip, oak.")

## 8. Settings
1. **Clue:** picture and clue (default) · clue only — the newcomer's picture is hidden behind a leaf in the nest box and appears only once it perches right (reading the attributes becomes the whole task). Visible at rest: the nest box shows the picture or a leaf.
2. **Branches:** 3 (default) · 4 (Level 1 and 3 add a fourth kind from the set). Visible at rest: the tree grows a fourth branch.
(The shell level picker: What kind is it? / Three groups / Climb to the definition.)

## 9. Words (EN source)
- title: "Olive's Kind-Of Tree".
- instruction: "Read the clue. Climb the picture up to the branch where its kind lives."
- task lines: L1 "Read the clue — what kind of thing is it?" (the old prompt, kept) · L2 "Put each picture on the branch of its kind." · L3 "Climb to its kind, then to the twig that tells it apart."
- kind words (signs): bird · fruit · food · vehicle · clothes · plant · animal · toy. Attribute signs: as in the Level 3 table.
- leaf sentences: "A {label} is a {kind}." / "A {label} is a {kind} {attribute}." with article and agreement authored per locale (never built by code — see traps).
- hints/celebrations: §7. Settings labels as §8.
- aria: "Branch: {kind}", "Twig: {attribute}", "{label} is on the {kind} branch", "Leaf: {sentence}".

**Locale traps:**
- **The definition sentence is authored whole per locale and per round**, because articles, gender and agreement change it: de "Eine Ente ist ein Vogel, der schwimmt." (relative clause, gender of Vogel → der; comma before the relative clause), fr "Un canard est un oiseau qui nage.", es "Un pato es un ave que nada." (ave takes masculine article "un ave"/"el ave" though feminine — a classic trap; the reviewer may prefer "pájaro"), it "Un'anatra è un uccello che nuota." (elision Un'), pt "Um pato é uma ave que nada." (ave feminine in pt), nl "Een eend is een vogel die zwemt.", sv "En anka är en fågel som simmar.", da "En and er en fugl, der svømmer.", no "En and er en fugl som svømmer.", fi "Ankka on lintu, joka ui." (no articles; relative pronoun joka). The leaf grows in three pieces, so each locale stores the three pieces per round (`"Eine Ente ist" | "ein Vogel," | "der schwimmt."`) — the pieces are chosen at authoring so they never need inflecting at runtime.
- **Kind words that are not single nouns:** "clothes" is a plural in en, a mass noun elsewhere (de Kleidung, fr vêtements (pl), fi vaatteet); "food" as a count noun ("A banana is a food") is awkward in several languages (de "ein Essen" is wrong; de says "Eine Banane ist Obst"). Each locale may rename a branch to its natural kind word (de Obst/Gemüse/Essen by round, fr un fruit/un aliment) — the native reviewer authors the sign and the leaf together; the round's grouping and the gate's kind table stay the same.
- **"Vehicles" must hold the boat and the helicopter in every locale** (critic): many locales' everyday "vehicle" word means road vehicles only (de Fahrzeuge, sv fordon, da køretøjer, no kjøretøy, nl voertuigen), so a child could rightly say the boat is the odd one. The kind word is the means-of-transport word: de Verkehrsmittel · fr moyens de transport · es medios de transporte · pt meios de transporte · it mezzi di trasporto · nl vervoermiddelen · sv transportmedel · da transportmidler · no transportmidler · fi kulkuneuvot · en vehicles.
- **"Animal" vs "bird"** — in every language a bird is an animal; the rule "no two branches in a round may contain each other" is asserted.
- **Clues** are the old authored clues; new clues (rounds 9–10) authored per locale; a clue must not contain the kind word ("It is a bird that…" would give the answer) — asserted by a per-locale banned-word check.
- **Vehicle words for helicopter/ship**: settled above — the means-of-transport word in every locale (sv transportmedel, not fordon).

## 10. Sound off, access, phones
- Silent legibility: picture, clue text, branch signs, the dip-and-slide, the gold leaf. TTS optional for clues and leaves.
- Keyboard: Tab to the newcomer, arrows choose a branch (left/up/right) and then a twig, Enter places; Check by Enter on the Check button.
- aria-live announces placements and results.
- Taps ≥ 44 px (perch hit areas 100 × 60, twig hit areas 64 × 64, newcomer 96 px).
- Pictures 110 px (newcomer) / 72 px (family) at 704; ≥ 64 px at 360.
- Phone: one-column; tap-to-climb is the default interaction on touch screens below 480 px.

## 11. Distinct from
- **Row 131 The Group Photo** — the group is given and one leaves it; here the child places a thing into its group and then its sub-group.
- **Sorting Hoops (premium tool)** — two hoops and an attribute rule decided by the hoop; here a hierarchy (kind → kind-of-kind) with a written definition.
- **Row 72 The Two-Ended Rod** — meaning as a position on a scale; here meaning as a place in a tree.
- **Row 35 Sorting Chutes** — counting into tubes; no hierarchy or definitions.
- Not a reused invention: no registered design builds a definition from a climbing path.

## 12. Build plan
- **Data:** `climbing-tree-rounds.json` per locale: `kinds` (id → sign word, contains:[ids]), `pictures` (noun → kind, attributes:[ids]), `attributes` (id → sign words), `level1:[{newcomer, clue, branches, members}]`, `level2:[{branches, pictures}]`, `level3:[{newcomer, branches, twigs:[{attr, resident}], leafPieces}]`. Seed = old rounds + `roundsL10n`.
- **Core state** `{level, round, placed:Map(noun → {branch, twig}), misses}`; functions `branchesFor(round)`, `place(noun, branch, twig?)`, `check()` → `[{noun, ok, slideBack}]`, `leaf(noun)` → current sentence pieces.
- **Gate's own ground truth** (`verify-climbing-tree-core.js`): the gate's own kind table and attribute table; for every round exactly one branch contains the newcomer's kind, no two branches contain each other, exactly one twig on the right branch is an attribute of the newcomer, every resident has its twig's attribute and is of the branch's kind, the newcomer is not an attribute-twin of a resident on a wrong twig; clue contains no kind word (per locale); position balance; bots ≤ 4/10; Level 2 every picture belongs to exactly one branch of its round.
- **Mutations:** wrong branch holds · wrong twig holds on the right branch · "animal" branch allowed in a bird round · a resident given the wrong attribute · clue allowed to contain the kind word · leaf built from code instead of authored pieces · branch position always "up" · Level 2 counts a wrong picture as right because its perch has room.
- **Pictures verified on contact sheets (critic 2026-10-17):** the list in §4; the supermarket fruit set, vehicles/truck (faces right), the flowers set and the chick were looked at; tree/oak does not exist and is not used.
- **Risks:** the zoomed twig fan at 360 px must not overlap three residents + signs — local-test asserts no sibling overlap per round; attribute signs are words only (no icons), so no picture can give the answer away.
- **Blocked:** none.

## 13. The four questions
1. **Would a 5–8-year-old choose it again?** Yes — climbing a picture up a tree, watching it slide down when it's wrong and the tree fill with gold leaves, is play.
2. **Would a teacher put it on the board?** Yes — "a duck is a bird that swims" is the exact form of L.1.5.b, built by the child step by step, and "swims" living on two branches shows why the category comes first.
3. **Would a parent trust it?** Yes — library pictures, gentle physics, no scores, sentences correct in the family's language.
4. **The invention:** a tree whose branches are kinds and whose twigs are kinds-of-kinds — the path the picture climbs reads out its definition.

## 14. Critic review (2026-10-17)
Scores before → after: invention 5→5 · fun 5→5 · completeness 4→5 · correctness 3→5 · distinctness 5→5 · reality 2→5
What changed:
- Two rounds rested on a picture that does not exist (tree/oak) and three on pictures that lie or break a ruling (fruits/cherry is an apple, post-office/truck has printed text, chick beside duck): replaced with flowers/sunflower, daffodil, clover, the supermarket cherry, vehicles/truck and the parrot.
- Level 3 "potato" had two right twigs (it grows under the ground AND a baked potato is baked): the newcomer is now a radish. Level 2 put fruit/vegetables on the food branch beside a plants branch (two homes for a carrot) and milk/juice as "food": the rule "plants + food → made foods only" is written and the rounds obey it. "A banana is a food" is now "A banana is a fruit".
- Every picture now meets the size floor: one 96 px family member per perch instead of two at 72, Level 2 fanned stacks at 96, and Level 3 became a two-stage climb — the tree zooms into the chosen branch so the three twig residents are 96 px and the attribute signs are words (no 48 px icons). The zoom also makes "category first" physical: a wrong branch never opens its twigs.
- The Level 3 miss hint template ("does it {attribute}?" → "does it that swims?") was ungrammatical: hints are authored whole per twig.
- Layout check (2026-10-17): switched to stacked — split stage column is ~370 px at 704.
