# Row 185 — The Clue Jug (L.2.4.a)

## 0. Identity
- id `fern-clue-garden.context-clues.l-2-4-a` (KEPT) · grade 2 · Common Core L.2.4.a (use sentence-level context as a clue to the meaning of a word or phrase) · strand Language · page title (frozen) "Fern's Clue Garden — Find a Word's Meaning from the Sentence (Grade 2)" · own files `mini tools/clue-jug-core.js`, `clue-jug-activity.js`, `clue-jug-activity.html`; manifest row stays in `fern-clue-garden-activities.json` (id, slugs en de fr es pt it nl, titles, intros unchanged), `tool` repointed. sv/da/no/fi get new slug/title/intro at build.
- worksheets it covers: **G1-350** Fill in the Blank Sentences · **G1-366** Fill in the Blank: Letter Boxes · **G1-367** Fill in the Blank: Choose the Word · **G1-368** Match the Sentence to the Picture · **G2-350** Fill in the Blank Story.
- what the old activity did: a sentence with a multiple-meaning word and three meaning glosses (correct / the word's other meaning / an unrelated "off" meaning); tap the one that fits. **Kept:** all 9 rounds in each of the seven locales (en bark … duck; de Ball … Kiefer; fr souris … avocat; es gato … pico; pt manga … pena; it penna … pianta; nl bank … veer), their three-kind distractor design (the other real meaning is the trap; the off meaning catches guessing). **Added:** the cloze family the coverage map assigns (choose the word, letter boxes, match the sentence to the picture, the story), built from the native-signed cloze bank (`scripts/worksheet-gen/data/b4/cloze-levelset.json`). **Fixed:** (critic re-measured the live data, `work-c28`: the right gloss is the longest in en 3 · de 3 · fr 4 · es 3 · pt 4 · it 4 · nl 2 of 9 — the earlier "de 6 of 9" claim was wrong and no locale has a length tell today; positions in the live data are A/B/C 3/3/3 everywhere EXCEPT **pt, where the right gloss is listed first in 9/9** — harmless live because the old engine shuffles, but this design FIXES positions in data, so the pt author re-places the pt beds to 3/3/3 before build); nl "veer" correct gloss "dons-plukje" (down, not a feather) → native rewrite.

## 1. The pitch
"Fern's jug only fills at the words that give a clue — tip it over 'the' and nothing comes out — and a meaning only blooms when you pour clue water on it. So you have to find the clue before you can choose."

## 2. Why a child will want it again (the fun)
- **A jug you dip into the sentence.** The sentence lies across the garden as a path of word stones. The child drags Fern's orange jug (library picture) along it. Over most words the jug tips and — nothing, a dry little *tock*, a pebble ripple. Over a clue word ("puppy") it dips with a *gloop*, the word gets a dewdrop underline, and one of the two drop sockets on the jug's gauge fills blue. Finding the clue feels like finding water.
- **Pouring is the decision.** Three garden beds, each with a meaning tag (or a picture seed in the cloze levels). Tip the jug over a bed: the water arcs down in drawn drops. The right bed bursts into a flower (a library flower, a different one every round, rising 96 px out of the soil) and its tag slides up into the sentence in place of the tricky word. The wrong bed drinks the water and stays bare.
- **End-of-round show:** each solved sentence adds a sprout to the garden row along the bottom; when the set is done, every sprout token turns from green to coral, one after another, and the row ripples once, all together.
- **Free play:** after a round, the jug can be dipped anywhere to see which words were clues (they sparkle); nothing is recorded.
- No timer, score, streak or lives.

## 3. The skill and the misconception
- **Skill:** read the WHOLE sentence; find the words that tell what the tricky word (or the missing word) means; choose the meaning or word that those clues support. For cloze: the missing word must fit both the grammar and the clues; in a story, the clues may sit in a neighbouring sentence.
- **Misconception 1 — the first meaning you know is the meaning** (bark = tree bark because that's the meaning the child met first). Pushback: the other real meaning is always one of the beds; pouring the "puppy" water on "the hard cover on a tree" grows nothing, and on miss 1 that meaning is put INTO the sentence for the child to read: "The puppy began to *the hard cover on a tree* at the mail truck."
- **Misconception 2 — any word nearby is a clue** (filling at "the", "began"). Pushback: the jug stays dry at non-clue words; only words that carry meaning about the target fill it.
- **Misconception 3 — the picture/word that looks right is right without reading** (cloze: "horse" for "has a big hump"). Pushback: the clue "hump" is what fills the jug; poured on the horse seed, nothing grows, and the sentence reads back with the horse in it.
- **Misconception 4 — one sentence is enough in a story.** Pushback (Level 5): some clues fill the jug only from the neighbouring sentence; the jug's gauge shows how many clues the blank has.

## 4. The stage
**Layout: stacked at every width** (layout check 2026-10-17: no `layout:'split'` — its stage column is only ≈ 370 px at 704, too narrow for this apparatus). The stage takes the full card width, ≈ 648 px at 704 (≈ 656 at 1024); whatever §4 places in a left, right, side or bubble column stays side by side inside the stage when the activity draws it, while the shell's bubble, keypad and Check sit under the stage. Sizes written for a wider stage fit the 648 px by closing margins and gaps first; no picture drops below 96 px, no tap below 44, no data mark or grid cell below 40.

**At 704 px:**
- **The sentence path** (top, 450 wide, 1–3 lines): each word is a flat stone tile (drawn rounded rectangle, cream with a soft grey edge), Nunito 22 px, 44 px tall; the tricky word sits on a teal stone with a white seed-label outline; a blank is an empty drawn soil hollow 96 × 44 (letter-box level: N boxes 36 × 44).
- **Fern's jug** (library **kitchen-tools/jug**, 96 px, resting at the path's left end) and its **gauge** beside it (drawn: two drop-shaped sockets 28 × 36, outlined; filled = blue `#4BA3D9`).
- **Three beds** (below the path, each 140 × 150, drawn soil rectangles with a wooden edge): Level 1 — a drawn plant tag (cream card 132 × 76, Nunito 16 px, up to 3 lines) holding a meaning gloss; Levels 2–5 — a picture seed: the library picture 96 px with its word under it (Nunito 18 px, image-vocabulary label in the page locale).
- **The garden row** (bottom, 450 × 56): every solved round adds a drawn green sprout token on a soil strip (a record is drawn geometry, per the size ruling); the full 96 px library flower appears only in the bed at the moment of success.
- **Task line** (≤ 24 px): L1 "Fill Fern's jug at the clue words, then pour it on the meaning that fits." · L2 "Fill the jug at the clues, then pour it on the word that fits the gap." · L3 "Find a clue, then write the word in the boxes." · L4 "Give every sentence its picture: find a clue, then pour." · L5 "Read the story. Find the clues and fill every gap."

**At 360 px** (stacked): path 340 wide (stones 18 px, 44 tall, wrapping); jug 64 px with the gauge beside it; beds in a row of three at 108 × 128 (Level 1 tags 104 × 96, 14 px, up to 4 lines; Levels 2–5 pictures 64 px with 16 px labels); Level 4 stacks its three sentences, each with its own bed below; garden row as tokens. Check/pour target bottom ≤ 700 at 360 × 740 and ≤ 630 at 320 × 640 (at 320 beds 96 × 120, pictures 64 px — the floor holds).

Pictures (library, colour; the cloze bank's pins, opened by the bank's own gate; confirmed for this design): kitchen-tools/jug (orange, open top), the blooms flowers/tulip, sunflower, rose, daffodil, lily, zinnia, violet, peony, dahlia (rotating, unlabelled decoration), and the seed pictures listed in §6. Ruled out: the savanna story (zoo-animals/cheetah is a near-twin of leopard/jaguar), the busy-street story (vehicles/taxi prints "TAXI"), the spring-babies story (farm-animals/lamb is the sheep drawing), the balloon frame (it says "red", toys/balloon is green), fruits/cherry anywhere (drawn as an apple).

## 5. The hand
- **Drag the jug** along the path (or tap a word with the jug selected; keyboard: Left/Right walk the words, Enter dips). Over a word for ≥ 150 ms it tips: clue → *gloop*, one socket fills (300 ms), the word gets a dewdrop underline; non-clue → a dry ripple, no fill; the tricky word itself → the jug lifts away (it can't fill from the word it is solving). The gauge holds two drops; a third clue tap is accepted silently (the word still gets its underline). A filled clue cannot fill twice.
- **Pour:** drag the jug onto a bed (or select a bed and press Pour). Pouring needs ≥ 1 drop — an empty jug over a bed tips and shows its empty inside (hint, no miss). The pour animates drawn drops (400 ms). Right → the flower rises (500 ms), the tag or seed word slides into the sentence. Wrong → the soil darkens, nothing grows, the drops are used up (the jug must be refilled — the clues stay underlined, so a refill is one dip).
- **Letter boxes (L3):** after a clue is found, the jug is poured onto the boxes; a letter tray (the word's letters shuffled + 2 others, tiles 44 × 44) appears; tap letters to fill the boxes left to right; tap a filled box to clear it.
- **Free play:** §2.

## 6. The rounds
One right meaning / word per gap. Positions are FIXED per round in data (balanced), not left to a render shuffle; the pass reshuffle permutes round order only.

**Level 1 — Two meanings (old content kept), EN, 9 rounds** — clue words the jug fills at in [ ]:
| # | sentence | beds (A · B · C) | right | clues |
|---|---|---|---|---|
| 1 | The puppy began to **bark** at the mail truck. | the sound a dog makes · the hard cover on a tree · a soft warm coat | A | [puppy, truck] |
| 2 | After dark, a **bat** flew out of the cave. | a wooden stick for hitting a ball · a small animal that flies at night · a cup for drinking milk | B | [dark, flew, cave] |
| 3 | The elephant picked up the log with its **trunk**. | a big box for keeping things · a path through a forest · a long bendy nose | C | [elephant, picked, log] |
| 4 | The phone started to **ring** during dinner. | to make a loud sound · a band you wear on a finger · a place where pigs sleep | A | [phone] |
| 5 | The box was so **light** that I lifted it easily. | a kind of juicy fruit · not heavy at all · the brightness that helps us see | B | [lifted, easily] |
| 6 | We rode every ride at the **fair** on Saturday. | when everyone is treated the same · a tool for cutting paper · a fun place with rides and games | C | [rode, ride] |
| 7 | She lifted her hand to **wave** at her friend. | to say hello by moving your arm · a small green plant · water that rolls onto the beach | A | [hand, friend] |
| 8 | Dad will **park** the van next to the store. | a grassy place to play outside · to stop and leave a car somewhere · a bowl of warm soup | B | [van, store] |
| 9 | **Duck** quickly so the branch misses your head! | a tall stone tower · a bird that swims on a pond · to bend down low and fast | C | [quickly, branch, misses, head] |
**Clue-list rule (critic):** a dry jug at a word a teacher would accept as a clue teaches the child that their good reasoning was wrong. So every content word in the sentence is classified by the native author as clue / not-a-clue, and the list errs WIDE: any content word that narrows the meaning (truck for bark, log for trunk, store for park) fills the jug; only function words, the target and words that leave every meaning possible ("began", "Saturday", "dinner") stay dry. The reviewer signs "no dry content word supports the right meaning" per round.
Positions A/B/C = 3/3/3. Length (measured, `work-28`): the right gloss is the longest of its three in 3/9, middle 3/9, shortest 3/9 — no length tell. The gate requires every locale within 2–4 of 9 for "right is the longest".

**Level 2 — Choose the word (G1-350, G1-367), EN, 9 rounds** — picture seeds; frames from the signed cloze bank; seeds = the fit, the bank's near foil, and another round's fit (far):
| # | sentence | seeds (A · B · C) | right | clues |
|---|---|---|---|---|
| 1 | The ___ has a big hump on its back. | camel · horse · lemon | A | [hump, back] |
| 2 | The yellow ___ tastes very sour. | goat · lemon · pear | B | [yellow, sour] |
| 3 | The ___ has a beard and climbs rocky hills. | canoe · lamb · goat | C | [beard, climbs, hills] |
| 4 | Ana paddles the ___ down the river. | canoe · ferry · cat | A | [paddles, river] |
| 5 | The ___ purrs and chases a mouse. | dog · cat · bucket | B | [purrs, mouse] |
| 6 | Ana carries water to the garden in a ___. | turkey · shovel · bucket | C | [carries, water] |
| 7 | The ___ gobbles and spreads its tail feathers. | turkey · goose · forklift | A | [gobbles, feathers] |
| 8 | The ___ lifts heavy boxes in the warehouse. | camel · forklift · bulldozer | B | [lifts, boxes] |
| 9 | The ___ has long ears and says hee-haw. | horse · avocado · donkey | C | [ears, hee-haw] |
Pictures: animals/camel, farm-animals/horse, fruits/lemon, fruits/pear, farm-animals/goat, farm-animals/lamb (foil only — it is the sheep drawing, which is still "not the goat"), vehicles/canoe, vehicles/ferry, pets/cat, animals/dog, beach/bucket, toys/shovel, farm-animals/turkey, farm-animals/goose, vehicles/forklift, vehicles/bulldozer, farm-animals/donkey, fruits/avocado. Positions 3/3/3. The near foil is never the same category-and-feature as the fit (gate: the near foil fails at least one clue word, from the bank's signed `fits`).

**Level 3 — Letter boxes (G1-366), EN, 8 rounds:** the frame's picture stands at the start of the sentence (as on the worksheet), the gap shows one box per letter, NO seed bank. The child fills the jug at a clue, pours on the boxes, then spells from the tray: camel (5) · lemon (5) · goat (4) · canoe (5) · cat (3) · bucket (6) · turkey (6) · donkey (6). Tray = the word's letters shuffled + 2 letters not in the word; the shuffle never shows the word in order.

**Level 4 — Match the sentence to the picture (G1-368), EN, 7 rounds of three:** three sentences, three picture seeds; each sentence is poured separately (its own clue, its own pour). Triples, each sentence the bank frame of that id (`cloze-levelset.json` en.frames, `{name}` from the locale name list):
1. otter "The ___ floats on its back and cracks shells." · seal "The ___ claps its flippers and balances a ball." · rhinoceros "The ___ has a big horn on its nose."
2. kiwi "The fuzzy brown ___ is bright green inside." · watermelon "The ___ has a green rind and black seeds." · lemon "The yellow ___ tastes very sour." (critic: strawberry left this triple — "The red ___ has tiny seeds" also reads true of the red watermelon SLICE the library draws: two right answers)
3. llama "The ___ has soft wool and spits when it is angry." · gorilla "The ___ beats on its chest with its fists." · meerkat "The ___ stands up tall to look out for danger." (never beside the otter: near-twins at 64 px)
4. submarine "The ___ takes the sailors deep under the sea." · motorcycle "The ___ roars down the road on two wheels." · bicycle "{name} pedals the ___ and rings the bell."
5. shovel "{name} digs a hole in the garden with a ___." · bucket "{name} carries water to the garden in a ___." · skateboard "{name} stands on the ___ and rolls down the path."
6. donkey · turkey · goat (the Level-2 frames) · 7. camel · cat · avocado (the Level-2 frames — the only two triples that repeat Level-2 sentences; acceptable because Level 4's task is one-to-one matching, not choosing).
Every sentence's seeds are the triple's three pictures, so each sentence has exactly one fit among them (asserted from each frame's `fits`). Seed order is a fixed derangement of sentence order (no seed starts under its own sentence).

**Level 5 — The story (G2-350), EN, 7 stories of three blanks:** from the bank — farm-chores (hen, pig, horse), toy-box (robot, doll, dinosaur), playground (slide, swing, sandbox), building-site (excavator, bulldozer, truck), garden-night (bee, raccoon, bat), in-the-trees (panda, koala, sloth), fruit-snack (banana, pineapple, coconut); a seed shelf of the three fits + one extra seed from another story. The gauge shows the clue count per blank; in two of the seven stories one clue sits in the sentence BEFORE the gap (a native rewrite of the bank sentence, e.g. playground: "Ana climbs up the ladder. Then she zooms down the ___." — "ladder" is the clue for slide, one sentence back); the gate tracks each clue's sentence index.

**Order:** order-only reshuffle per pass.

## 7. Check, the misses, the success
- **Pour with an empty jug:** hint, no miss — the jug tips, empty: "Fill the jug first — find a word that gives a clue."
- **Miss 1** — the water soaks in and the bed stays bare; then the poured meaning/word is placed INTO the sentence in coral, for the child to read: "The puppy began to *the hard cover on a tree* at the mail truck." / "The *horse* has a big hump on its back." Hint: "Read it with that inside. Does it fit the clue {clue}?"
- **Miss 2** — the strongest clue word glows and a thin drawn stream runs from it to the right bed's edge (the bed does not bloom until poured). Hint: "{clue} is the clue. Which meaning goes with {clue}?" (cloze: "Which word goes with {clue}?")
- **Letter boxes:** a wrong letter set leaves boxes with the misplaced letters wobbling on Check; miss 2 shows the picture's word beneath the boxes in faint dotted letters (for tracing).
- **A new move takes the help away** until the next pour.
- **Success:** the flower rises, the meaning/word slides into the sentence and the sentence reads whole (clue words keep their dew underline). Bubble: "{clue} told you: here, {word} means {meaning}!" · cloze: "{clue} told you: it's the {word}!" · story: "Every gap filled — and the clues were in the story!"

## 8. Settings
1. **Clue words:** find them (default) · show them (practice — the clue words already carry their dew underline at rest; the jug still must be dipped). Visible at rest: underlines present or not.
2. **Sentence size:** normal (default) · big (stones 26 px at 704 / 20 px at 360; beds stack 2 + 1). Visible at rest: the type size.

## 9. Words (EN source)
- title "Fern's Clue Garden".
- instruction "Some words have more than one meaning, and some sentences have a gap. Fill Fern's jug at the words that give a clue, then pour it on the meaning or the word that fits."
- task lines §4 · hints and celebrations §7 · labels "Pour", settings names.
- aria: "{word}: a clue — the jug filled" · "{word}: no clue here" · "Bed {n}: {meaning}" · "{meaning} bloomed: it fits".

**Locale traps:**
- **Every locale's rounds are its own** (multiple-meaning words do not translate): the seven authored sets are kept; sv/da/no/fi author 9 Level-1 rounds each from native homonyms (e.g. sv *fil* (file / lane / yoghurt), da *bank*, no *ball*, fi *kuusi* (six / spruce)) — the reviewer checks each has exactly one meaning the clues support.
- **Clue words are authored per locale** (index lists, not translated), because languages put the clue in different words (de "bellen" is a verb, en "bark" too; fi case endings sit on the clue words themselves). The gate refuses a round with no clue word or with a clue that is a function word (from a per-locale stop list).
- **Gender and articles in cloze:** gap frames carry their article/agreement in the frame ("Le ___ a une grosse bosse" with masculine seeds only; de "Das ___" with neuter seeds only) — every seed in one round agrees with the frame, so grammar never tells the answer (asserted from image-vocabulary gender). Where a locale's article would leak the answer (it l'/lo/il, fr l'), the frame uses a determiner that is the same for all three seeds or the bank's signed rewrite.
- **Length tells per locale:** the right gloss may be the longest of three in at most 4 of 9 rounds and at least 2 (all seven live sets already pass: 2–4 of 9; pt must also re-place its beds from 9/0/0 to 3/3/3).
- **Names in frames** ({name}) come from the locale's name list in the bank.
- **Letter boxes in de** are capitalised nouns (the first box takes the capital); fi/sv/da/no letters å ä ö æ ø are tiles like any other.

## 10. Sound off, access, phones
- Silent legibility: dew underlines, the gauge, the bloom and the read-back sentence carry everything; TTS reads the sentence and the beds as a bonus.
- Keyboard: Tab to the path; Left/Right to walk words; Enter dips; Tab to a bed; Enter pours; letter tray: Left/Right/Enter.
- aria-live per §9. Taps ≥ 44 px (stones 44 tall, beds 96+, tray tiles 44). Pictures ≥ 96 px at 704 and ≥ 64 px at 360/320.

## 11. Distinct from
- **Row 67 The Proof Pins** — pins fly from sentence words to the things a picture shows; here clue words fill a jug and the child decides which meaning the clues support.
- **New 257 The Test Frames** — word-class sentence machines; nothing about meaning from context.
- **Row 131 The Group Photo / Row 132** — categories; no sentence context.
- Not a reused invention: no registered design makes clue-finding a vessel that fills only at meaning-bearing words and then pours on a choice.

## 12. Build plan
- **Data** `clue-jug-rounds.json` per locale: `meanings:[{id, words, target, beds:[{text, kind}], right, clues:[i]}]`, `cloze:[{frame, seeds:[{vocab, pic}], right, clues}]`, `boxes:[{frame, word, pic, clues, extra}]`, `match:[{sentences:[…], seeds:[…], perm}]`, `stories:[{sentences, gaps, seeds, clueSentence:[…]}]`, per-locale `stopWords`.
- **Core state** `{level, round, drops, clueHits:Set, poured:null, letters:[], misses}`; functions `dip(i)` → `{clue:bool}`, `pour(bed)` → `{ok}`, `place(letter)`, `readBack(bed)` (the sentence with the bed's text in the gap).
- **Gate's own ground truth** (`verify-clue-jug-core.js`): its own tables of right beds, clue indices and stop words per locale; asserts dip fills only at listed clues; pour needs ≥ 1 drop; every round has 1–3 clues, none a stop word, none the target; positions balanced (each ≤ ceil(n/3)+1); length rank rule; every cloze seed agrees with the frame's gender/article; the near foil fails a clue (from `fits`); story clue-sentence indices exist; no ruled-out picture referenced.
- **Mutations:** dip fills at any word · a listed content clue stays dry · pour allowed with no drops · wrong bed blooms · read-back missing on miss 1 · right bed always A (the pt live order) · a length tell (right = longest 6/9) · a seed of the wrong gender admitted · letter tray shows the word in order.
- **Pictures to confirm:** done for jug and flowers; every cloze seed is a bank pin already opened by the bank's gate.
- **Risks:** fi/de long glosses on 104 px tags at 360 (4 lines max — the gate measures); the jug drag over a wrapped path.
- **Blocked:** none.

## 13. The four questions
1. **Would a 5–8-year-old choose it again?** Yes — dipping a jug into a sentence and hearing it *gloop* at the right word is a small thrill, and every right pour grows a flower.
2. **Would a teacher put it on the board?** Yes — "find the clue first" is the strategy teachers beg for; the read-back on a miss ("began to *the hard cover on a tree*") makes the class laugh and learn; one apparatus covers five fill-in-the-blank worksheets.
3. **Would a parent trust it?** Yes — library pictures, calm motion, sentences written by native speakers, one right answer.
4. **The invention:** a jug that only fills at clue words — so the child must find the clue before they can make any meaning bloom.

## 14. Critic review (2026-10-17)
Scores before → after: invention 5→5 · fun 5→5 · completeness 4→5 · correctness 3→5 · distinctness 5→5 · reality 5→5
What changed:
- Re-measured the live data: the claimed "de right gloss longest 6/9" is false (de 3/9); the real defect is pt, whose right gloss is listed FIRST in 9/9 — must be re-placed because this design fixes positions in data.
- Clue-list rule: a dry jug at a word a teacher accepts as a clue (truck, log, store) teaches that good reasoning is wrong — lists widened, native sign-off "no dry content word supports the answer", mutation added.
- Level 4 now has its exact sentences (bank frames); strawberry left the kiwi/watermelon triple (the red watermelon slice also "has seeds" — two right answers), lemon in.
- Layout check (2026-10-17): switched to stacked — split stage column is ~370 px at 704.
