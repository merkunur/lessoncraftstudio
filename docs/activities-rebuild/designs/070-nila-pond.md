# Row 70 — Nila's Idea Pond → THE IDEA UMBRELLA (RI.K.2)

## 0. Identity
- **id** `nila-pond.main-idea-net.ri-k-2` (KEPT; slugs/metadata frozen en..nl; sv da no fi new at build) · grade K · CCSS RI.K.2 (with prompting, identify the main topic and retell key details of a text) · strand Reading: Informational Text · own files `nila-pond-core.js` (new; the old `main-idea-core.js` stays untouched for others), `nila-pond-activity.js` (rewritten), html, `nila-pond-activities.json`.
- **Worksheets covered:** none mapped.
- **Old activity:** hear a paragraph, net the "big idea" fish among four, commit, then nest the true detail fish and send the non-belonger back. **Kept:** all 12 EN paragraphs (bear ×4, bee ×4, duck ×4) and their 6 translations, the four phrases per group, the cognitive types (pick-topic, nest-reject, reject-narrow, supply-detail), the "target moves on a wrong commit" idea, and the umbrella image (which was the old reward — it becomes the instrument). **Gone:** hand-drawn SVG fish and otter (Nila is now the library `zoo-animals/otter`), audio-only phrases.

## 1. The pitch
"The big idea is the umbrella that keeps every detail dry — open a small idea over the pond and the rain shows you which sentences it leaves out."

## 2. Why a child will want it again
- **Real rain.** The pond is a calm blue oval with the paragraph's detail sentences floating on it as lily pads. Above it, a grey cloud (drawn geometry). On Check the cloud rains — drawn drops falling with tiny splash rings — and whatever the umbrella does not cover gets rained on.
- **Umbrellas that show their real size in the rain.** Four folded umbrellas hang on a peg rail, each with an idea written on its handle tag. Drag one onto the hook over the pond and it *opens* (a 320 ms unfurl with a springy "foomp") — every umbrella opens to the SAME big size while the sky is dry, so hanging umbrellas one after another tells the child nothing. The truth comes with the rain: on Check the first drops hit, and the canopy pulls in to exactly what the idea really covers — the big idea stays wide over every pad; a detail-sized idea shrinks to its own pad; an idea that is not in the text folds right in and slides over open water.
- **Wet ink.** A rained-on pad's sentence ink runs and blurs and the pad bobs under — the child sees exactly which sentences the chosen idea did not hold.
- **Nila waits on the bank** (library otter). When every pad stays dry, Nila slides into the water, swims under the umbrella and the pads glow one by one as she passes, reading the paragraph back.
- No timer, score, streak or lives.

## 3. The skill and the misconception
- **Skill:** find the main topic of a short informational paragraph read aloud, and tell the key details that belong to it (RI.K.2).
- **Misconception 1 — picking one interesting detail as the main topic** ("berries!"). The detail umbrella opens small; the rain falls on the other details. The physics is the definition: a main topic *covers* all the details.
- **Misconception 2 — picking something plausible that is not in the text.** That umbrella opens over open water — it covers nothing.
- **Misconception 3 — a fact about the subject belongs just because it is about the subject** (nest-reject rounds: "A bear eats sweet juicy berries" floats in among the warm-keeping details). Under the "keeps warm" umbrella it gets wet; the child must push it out into the rain.
- **reject-narrow rounds:** the narrowest true phrase is the most tempting distractor; its umbrella is the smallest of all.

## 4. The stage
**Layout: stacked at every width** (layout check 2026-10-17: no `layout:'split'` — its stage column is only ≈ 370 px at 704, too narrow for this apparatus). The stage takes the full card width, ≈ 648 px at 704 (≈ 656 at 1024); whatever §4 places in a left, right, side or bubble column stays side by side inside the stage when the activity draws it, while the shell's bubble, keypad and Check sit under the stage. Sizes written for a wider stage fit the 648 px by closing margins and gaps first; no picture drops below 96 px, no tap below 44, no data mark or grid cell below 40.

**At 704 px:**
- **The paragraph card** (top, 440 px wide): the 4-sentence paragraph in 20 px, each sentence on its own line; a speaker button 36 px inline (TTS reads it, sentence-highlighted). The subject picture 96 × 96 px beside it: zoo-animals/bear · spring/bee · farm-animals/duck.
- **The pond** (440 × 220 px) under it: blue oval, 3 lily pads (green ovals 132 × 64 px, 3 px outline) floating in a row, each holding one detail sentence in 16 px (2 lines max). In nest-reject / supply-detail rounds a 4th pad drifts in at step 2.
- **The cloud** above the pond (geometry, 300 × 50 px, grey), still until Check.
- **The hook** — a T-shaped stand over the pond centre where an umbrella hangs.
- **The peg rail** (right side at 704, 120 px wide; top row on phones): four folded umbrellas, each 44 × 120 px, with a tag 110 × 40 px bearing the idea phrase (16 px). Canopy colours by POSITION on the rail (coral, teal, gold, sky) — never by idea.
- **Nila** — library `zoo-animals/otter`, 96 px, on the bank at the pond's left.
- **Task line (EN):** "Read the story. Hang the umbrella that keeps every lily pad dry."

**At 360 px:** paragraph 18 px, picture 72 px; umbrellas in one row of four across the top (76 × 56 folded, tag below 76 × 44, 13 px text, 2 lines); pond 328 × 190, pads stacked in a 2-1 arrangement (150 × 58); Nila 64 px; Check at ≈ 690 px (above 740); at 320 × 640 the paragraph collapses to a "read it" strip (tap to expand), Check ≈ 610.

Only content text (the paragraph, the pad sentences, the idea tags) is on the apparatus.

## 5. The hand
- **Drag an umbrella** from the rail to the hook: it snaps on and opens to the standard full width (320 ms unfurl) — the same for every umbrella, so hanging gives no clue. **On Check**, as the rain starts, the canopy pulls in to its true reach (420 ms): a semicircle whose width is computed from which pads the idea covers, sliding sideways to centre over those pads (small canopies over their own pad; a not-in-text idea over the water gap between pads). Dragging another umbrella swaps them (the first folds and returns).
- **Tap an open umbrella:** it twirls once (fun, no effect).
- **Step 2 (nest-reject / supply-detail):** drag a pad. Pads under the canopy can be pushed out into the open water at the pond's edge; pads at the edge can be pulled back under. 
- **Speaker:** reads the paragraph; tap a single pad sentence to hear it.
- **Keyboard:** Tab to an umbrella, Enter hangs it; Tab to pads, Enter toggles "under / out".
- **Free play:** after success, the child can tap the cloud to make it rain again on the dry pond (Nila splashes).

## 6. The rounds
A round: step 1 hang the umbrella → Check → (step 2 where the cog says so) → Check. 12 rounds per pass, order-only reshuffle; no group three times in a row.

**Why the content was rewritten (critic, 2026-10-17).** In the old data the four "idea fish" were the SAME four sentences in every round of a group, all of one grain, and the "big idea" was simply one of the detail sentences — e.g. *bear-coat*: the right answer "A bear grows a thick coat" was supposed to cover "It rests inside a cozy cave"; *duck-dive*: "A duck dives for little fish" was supposed to cover "It rests by its soft nest" (the old `details` even marked the nest as belonging to diving). A child who reads carefully would be marked wrong. Under an umbrella that honestly covers only what an idea is about, those rounds have no right answer. So each round now has: **a real main-topic tag** (taken from the paragraph's own lead sentence) that covers all three pads, **two detail tags** that each cover exactly their own pad, and **one tag not in the text** that covers nothing. Pads 2–4 were rewritten where they did not belong to the lead sentence (marked ✎); everything else is kept verbatim. The six shipped translations are re-authored for the ✎ rounds by hand.

**Tags are all the same shape** — short "-ing" phrases of similar length (the topic is longest in 3 rounds, shortest in 3, in between in 6; the gate measures it) — so the right one cannot be spotted by its grammar or size, only by reading what it is about.

| # | id · cog | lead (card) | pads 2–4 | topic tag (covers all 3) | detail tags (each covers its own pad) | not-in-text tag (covers 0) | step 2 |
|---|---|---|---|---|---|---|---|
| 1 | bear-warm · nest-reject | When the cold snow falls, a bear must stay snug. | It grows a thick coat. · It keeps its body warm. · It rests inside a deep cave. | staying warm in the snow | growing a thick coat · resting in a deep cave | catching fish in a cold river | "It eats sweet juicy berries." drifts in → push out |
| 2 | bear-eat · pick-topic | Before its long winter sleep, a bear gets very hungry. | It eats sweet juicy berries. · It carries some to its cave. · A full belly keeps it warm. | filling up before the long sleep | eating sweet juicy berries · keeping its body warm | growing a thick coat | — |
| 3 | bear-cave · nest-reject ✎ | All winter, a bear needs a safe place to hide. | It finds a deep cave. · It makes a bed of soft leaves inside. · It sleeps there until spring. | hiding safely all winter | finding a deep cave · making a bed of leaves | climbing up a tall pine tree | "It eats sweet juicy berries." drifts in → push out |
| 4 | bear-coat · pick-topic ✎ | As fall ends, a bear grows new fur for the cold. | Its fur grows long and thick. · The new fur is soft and fluffy. · This coat keeps it warm all winter. | getting a winter coat | growing long, thick fur · staying warm all winter | eating sweet juicy berries | — |
| 5 | bee-honey · pick-topic | All day a bee works hard to make food. | It visits many bright flowers. · It flies back to its hive. · There the bee makes sweet sticky honey. | making food for the hive | visiting bright flowers · making sweet sticky honey | sleeping in a nest | — |
| 6 | bee-flowers · nest-reject | A bee has a busy job in the garden. | It zips out from its hive. · It visits many bright flowers. · It flaps its tiny wings to fly. | working in the garden | zipping out of the hive · flapping its tiny wings | swimming in a cool pond | "Its stripes are black and yellow." drifts in → push out |
| 7 | bee-hive · reject-narrow ✎ | Every bee belongs to one big home. | This hive holds the whole busy family. · Inside, bees make sweet sticky honey. · Every night, they all fly back home. | living in one big home | making sweet sticky honey (the narrow lure) · flying back every night | living all alone | — |
| 8 | bee-wings · nest-reject ✎ | A bee's wings are tiny but strong. | They flap very, very fast. · They make a buzzing sound. · They carry the bee from flower to flower. | using its tiny wings | buzzing loudly · flying from flower to flower | growing soft feathers | "It makes sweet sticky honey." drifts in → push out |
| 9 | duck-swim · pick-topic | A duck loves the cool water all day. | It swims across the wide pond. · It dives for a little fish. · Then it paddles home to its nest. | spending the day on the water | swimming across the pond · diving for a little fish | sleeping up in a tree | — |
| 10 | duck-dive · nest-reject ✎ | A hungry duck looks for lunch in the pond. | It swims out past the tall reeds. · It looks down into the water. · Down it goes to catch a little fish. | catching its lunch | swimming past the reeds · looking down into the water | eating bread from a bag | "It quacks a happy song." drifts in → push out |
| 11 | duck-nest · supply-detail | A mother duck has a big job by the water. | She swims out to gather soft reeds. · She builds a warm nest for her eggs. · She quacks softly to her little ducklings. | taking care of her babies | gathering soft reeds · building a warm nest | climbing a tall tree | two new pads float near: "She sits on her eggs to keep them warm." (belongs) / "She has an orange beak." (true, but not about caring for babies) → pull the one that belongs under |
| 12 | duck-quack · reject-narrow ✎ | A duck has a loud little voice. | It quacks to say hello. · It quacks loudly when a fox comes near. · It quacks softly to its ducklings. | using its loud little voice | quacking to say hello (the narrow lure) · warning that a fox is coming near | singing like a robin | — |

The pads are the paragraph's sentences 2–4 (sentence 1, the lead, is on the card). The coverage (`covers: [padIds]`) is authored data per round and the gate checks it against its own hand-written table, never by string matching. Every step-2 stranger is a TRUE fact about the same animal that is not about the topic (misconception 3) — never a silly one. A **wrong umbrella in step 1** (old "target moves" idea, kept): after miss 2 the round is swapped for a sibling paragraph from the same group, so brute-forcing four umbrellas does not work.

**Answer position.** The right umbrella's peg is balanced over the 4 pegs (each peg 3 times per 12 rounds); tags are shuffled every round. The gate also asserts the topic tag is the longest phrase in ≤ 4 of 12 rounds and the shortest in ≤ 4 of 12.

## 7. Check, the misses, the success
- **Check with no umbrella** → no miss; the hook wiggles. Hint: "Hang one umbrella over the pond."
- **Miss 1:** it rains. Pads not under the canopy get drops; their ink blurs and they bob under and back up (1.6 s). The umbrella folds and returns to its peg. Hint: "Some lily pads got wet. Which idea covers ALL of them?"
- **Miss 2:** each pad lights its KEY WORD (*coat*, *warm*, *cave*) and the umbrella tags that share none of those words dim to 40 %. Hint: "Listen to every sentence. What are they all about?" A further wrong commit swaps in the sibling paragraph (the target moves).
- A new hang removes the hints until the next Check.
- **Step 2 miss:** rain falls; a stranger pad still under the canopy turns grey-wet and floats back to the centre; a true detail pushed out gets rained on and drifts back. Hint: "One lily pad is not about {topic}. Push it out into the rain."
- **Success:** the canopy holds, rain bounces off it (drops slide down the edges), every pad stays bright; the stranger pad (step 2) drifts away. Nila slides in and swims under, each pad glows as she passes, and the bubble retells: "This story is about {topicTag}. It tells us: {details}." e.g. "This story is about staying warm in the snow. It tells us: it grows a thick coat, it keeps its body warm, and it rests inside a deep cave."

## 8. Settings
1. **Reading:** I read it / Read it to me — the second auto-plays the paragraph at the start of each round (where TTS exists) and highlights each sentence; the first hides the speaker until tapped. (Visible: the speaker shows "playing" and the sentence highlight moves.)
2. **Umbrellas:** 3 / 4 — with 3, the not-in-text umbrella is removed (easier); the rail visibly has three pegs.

## 9. Words (EN source)
- stage title "Nila's Idea Pond" · instruction "Read the story. Hang the umbrella that keeps every lily pad dry." (not "Listen": TTS exists in only 5 of 11 locales; the speaker button stays beside the text) · step 2 instruction "Push the lily pad that does not belong out into the rain." · supply step "Pull the lily pad that belongs under the umbrella."
- hints: empty "Hang one umbrella over the pond." · miss1 "Some lily pads got wet. Which idea covers ALL of them?" · miss2 "Listen to every sentence. What are they all about?" · step2Miss "One lily pad is not about {topic}. Push it out into the rain." · supplyMiss "Which sentence tells more about {topic}?"
- celebration "This story is about {topicTag}. It tells us: {details}." e.g. "This story is about staying warm in the snow. It tells us: it grows a thick coat, it keeps its body warm, and it rests inside a deep cave." (the {details} list is the three pad sentences, authored per locale as clauses)
- aria: umbrella "Umbrella: {phrase}" · pad "Lily pad: {sentence}, {under|outside} the umbrella" · cloud "Rain cloud".
- **Locale traps.** The "-ing" tag shape must be rebuilt per locale so all four tags of a round share ONE grammatical shape (de nominalised infinitives "im Schnee warm bleiben"; fr "rester au chaud dans la neige"; fi -minen nouns "lämpimänä pysyminen lumessa") — a locale where the topic tag alone has a different shape re-opens the grammar tell. The celebration inserts phrases as clauses: per locale the topic phrase is authored in a *clause form* (`topicClause`), never built by stripping "A bear" (de "wie ein Bär seinen Körper warm hält" needs verb-final; fr "comment l'ours garde son corps au chaud"; fi uses a nominal: "karhun lämpimänä pysymisestä" — author whole, don't assemble). The detail list joiner via `Intl.ListFormat` (§17.8.13 convention). Subject animals keep the 6 shipped translations; sv/da/no/fi paragraphs are written new (bear = björn/bjørn/karhu; duck young = *ungar*, *ællinger*, *ankanpoikaset*). The umbrella metaphor is fine in every locale (Swedish/German teachers use "Oberbegriff"/"paraply" naturally). "Lily pad" → de *Seerosenblatt*, sv *näckrosblad*, fi *lumpeenlehti*.

## 10. Sound off, access, phones
- Legible with sound off: the paragraph and every pad are written; the rain shows coverage. TTS (5 locales) is "Read it to me".
- Keyboard: §5; results announced ("2 lily pads got wet").
- Taps ≥ 44 px (umbrellas 44 × 120 / 76 × 56; pads ≥ 58 px tall). Subject picture 96 at 704 / 72 at 360; Nila 96 / 64.
- Check above the fold at 360 × 740 and 320 × 640 (§4). Phone: the rail becomes a top row; the bubble goes under Check.

## 11. Distinct from
- **#221 Everyday Plate** (a plate that tips until balanced) and **#33 Tipping Pour** — physics of balance/volume; here the physics is coverage.
- **#069 Atlas** finds one key detail; **#070** finds what covers them all; **#071 Linc** links two facts.
- The old Nila's net/fish commit loop is replaced; only its paragraphs and cognitive design remain.

## 12. Build plan
- **Core** `NilaPondCore`: `newRound(round, setting)`; `hang(state, tagId)` → canopy `{covers:[padIds], x, width}` from authored `covers`; `grade1(state)` → `{ok, wetPads}`; `move(state, padId, under)`; `grade2(state)` → `{ok, wrongUnder, wrongOut}`; `swapSibling(state)` after miss 2.
- **Gate's truth** (`verify-nila-pond-core.js`): its own hand table of coverage per round (12 × 4) — the topic covers all 3 pads; each detail tag covers exactly 1 pad; the not-in-text distractor covers 0; before Check every hung canopy has the same width (no pre-Check tell); topic-tag length is longest in ≤ 4 and shortest in ≤ 4 of 12; in nest-reject the drifting pad is exactly the round's `belongs:false` detail; supply-detail has one belonging and one not; canopy width is monotone in covered-pad count; peg balance 3 per peg per 12.
- **Mutations:** topic covers 2 pads · a distractor covers 3 · canopy width fixed · canopy shows its true width on hang (before Check) · rain wets covered pads · step 2 accepts the stranger under · no sibling swap after miss 2 · tags in the same order every round · canopy colour by idea. All killed.
- **Pictures (critic, opened 2026-10-17):** zoo-animals/bear, zoo-animals/otter (a brown otter standing, whiskers, long tail — reads as an otter), spring/bee, farm-animals/duck.
- **Risks:** the paragraph text is long for a 320 px phone — the collapsible "read it" strip handles it. Nothing BLOCKED.

## 13. The four questions
1. **Choose it again?** Yes — umbrellas that pop open to different sizes, real rain that smudges the ink, an otter that swims under your umbrella.
2. **Teacher on the board?** Yes — "the main idea is the umbrella" is already how teachers explain it; here the umbrella literally decides which details stay dry.
3. **Parent trust?** Calm, real texts, no guessing loop (the target moves), library pictures only.
4. **Invention:** each idea opens an umbrella exactly as wide as what it covers — only the big idea keeps every detail dry.

## 14. Critic review (2026-10-17)
Scores before → after: invention 4→5 · fun 5→5 · completeness 4→5 · correctness 1→5 · distinctness 5→5 · reality 4→5
What changed:
- **The kept content had no honest main topic.** The four "big idea" phrases were the same detail-grain sentences in every round of a group, and the authored "covers all" answer often did not cover the pads (bear-coat's "grows a thick coat" covering "rests inside a cozy cave"; duck-dive's "dives for fish" covering "rests by its soft nest"; bee-wings, duck-quack and bear-cave likewise). A careful reader would have been marked wrong. §6 rewritten: a real topic tag from each paragraph's lead sentence, two one-pad detail tags, one not-in-text tag; pads rewritten in 6 rounds (✎) so they belong to the lead; every step-2 stranger is a true but off-topic fact.
- **Pre-Check tell removed:** umbrellas opened to their true width on HANG, so a child could hang all four and pick the widest without reading. Every umbrella now opens to the same width; the true reach shows only when the rain starts on Check (gate + mutation added).
- **Shape/length tell removed:** all tags are "-ing" phrases; the topic is longest in 3 and shortest in 3 of 12 (measured).
- "Listen to the story" → "Read the story" (TTS in 5 of 11 locales). Otter picture opened and confirmed.
- Layout check (2026-10-17): switched to stacked — split stage column is ~370 px at 704.
