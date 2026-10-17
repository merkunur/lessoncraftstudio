# Row 126 — The Turning Bridge (L.1.1.g)

## 0. Identity
- id `hazel-word-bridge.joining-words.l-1-1-g` (KEPT) · grade 1 · Common Core L.1.1.g (use frequently occurring conjunctions: and, but, or, so, because) · strand Language · page title (frozen) "Hazel's Word Bridge — Joining Words (Grade 1)" · own files `mini tools/turning-bridge-core.js`, `turning-bridge-activity.js`, `turning-bridge-activity.html`; the manifest row stays in `hazel-word-bridge-activities.json` (id, slugs en/de/fr/es/pt/it/nl/sv, title, intro frozen), `tool` repointed. New da/no/fi metadata at build.
- worksheets it covers: none mapped.
- what the old activity did: a sentence with a gap; chips for the joining words; tap one. **Kept:** Hazel's word bridge between two ideas (the title's own image — now a real bridge); the relation tags on every round (addition / contrast / cause / result / alternative); every locale's sentences as the seed (de *und/oder/aber/denn* with V2 order, fr *et/ou/mais/car*, es *y/o/pero/porque*, pt *e/ou/mas/porque*, it *e/o/ma/perché*, nl *en/of/maar/want*, sv *och/eller/men/för*); en *I packed a hat ___ a coat / I like milk ___ not juice / The box is small ___ very heavy / I wore my boots ___ it was raining / She was happy ___ she won the game / It got dark ___ we went inside / He felt tired ___ he took a rest*. **Gone:** en *We jumped ___ we ran* (two joining words fit); every round where a foil also makes a sensible sentence (*It got dark AND we went inside* is fine English — the old tray offered *and* there: two right answers). Each round's tray now holds only words that genuinely fail (§6).

## 1. The pitch
"Every joining word is a bridge plank with its own shape — AND is a straight plank, BUT has a turn in it, OR splits in two, and BECAUSE and SO are the SAME arrow plank seen from the two banks — so when you swap the two halves of a sentence, the plank turns over by itself and *because* becomes *so*."

## 2. Why a child will want it again (the fun)
- **Two banks and a river.** Hazel's river runs down the middle of the stage. On the left bank stands the first half of the sentence on a signboard, with its library picture (a rain cloud); on the right bank the second half (an umbrella). Between them, a gap where a bridge should be.
- **Planks with personalities.** On the plank rack lie three wooden planks (from the round's set): **and** — a straight plank with two bolts; **but** — a plank with a sharp turn in its middle (a zig); **or** — a plank that splits into a Y so the path forks; **because / so** — one plank, painted with a big arrow, *because* on one face and *so* on the other.
- **The little cart.** Lay a plank, press Check, and a little library toy car rolls across. On a straight *and* plank it trundles over carrying the left picture to stand beside the right one (both together). On a *but* plank it takes the turn — the car swerves at the zig, a little surprised wobble. On an *or* plank it reaches the fork and chooses ONE branch — the other picture fades, one or the other. On the arrow plank it drives the way the arrow points — from the reason to what happened — and the reason picture (the cloud) rides on the car and stops over the result (the umbrella opens wider: the picture scales up with a little pop).
- **The turn.** Grab the right-hand signboard and drag it to the left bank: the halves swap places, and the arrow plank **turns over by itself** in mid-air (a 3-D flip, 420 ms) — *because* goes underneath, *so* comes up, and the arrow still points from the rain to the umbrella. Children swap back and forth to watch it turn.
- **The finished bridge.** Every solved round adds a plank to a long bridge drawn across the top of the stage; after a pass Hazel's bridge reaches all the way across the river, and the car drives the whole length, over a straight, a turn, a fork and two arrows, honking at the end.
- No timer, score, streak or lives.

## 3. The skill and the misconception
- **Skill (L.1.1.g):** choose the joining word that makes the two parts make sense: *and* adds, *but* turns to something unexpected, *or* offers a choice, *because* gives the reason (it introduces the cause), *so* gives the result (it introduces the effect).
- **Misconception 1 — "because" and "so" are interchangeable** (*I wore my boots so it was raining*). The arrow drives from reason to result. With *so* in that sentence the arrow points from the boots to the rain: the cart carries the boots over to the cloud, and the cloud — the thing that really came first — gets "caused" by boots. The picture shows the silly claim; the hint names it.
- **Misconception 2 — the order of the parts is fixed.** Swapping the halves physically turns the plank: *because* and *so* are one link read from two ends. Level 4 asks for exactly this.
- **Misconception 3 — "and" for everything.** *and* is never in a tray where it would also make a sentence; in *and* rounds the other planks visibly fail (the car takes a turn into nothing on *but*, the arrow plank has no reason/result to carry).
- **Misconception 4 — "but" without a surprise** (*I have a cat but a dog*). The *but* plank's zig sends the car into the turn; nothing in the second half is a turn — the car wobbles and stops at the bend.

## 4. The stage
**Layout: stacked at every width** (layout check 2026-10-17: no `layout:'split'` — its stage column is only ≈ 370 px at 704, too narrow for this apparatus). The stage takes the full card width, ≈ 648 px at 704 (≈ 656 at 1024); whatever §4 places in a left, right, side or bubble column stays side by side inside the stage when the activity draws it, while the shell's bubble, keypad and Check sit under the stage. Sizes written for a wider stage fit the 648 px by closing margins and gaps first; no picture drops below 96 px, no tap below 44, no data mark or grid cell below 40.

**At 704 px** (stage 480 × 450):
- **The finished bridge** (top, y 0–40): a thin long bridge across the stage; each solved round adds a plank segment (with its shape: straight / zig / fork / arrow).
- **The river scene** (y 50–300): a drawn river band (light blue, wavy edges) down the middle, 120 px wide. **Left bank** (x 0–180): a signboard 176 × 96 with the first half of the sentence (Nunito 22 px, three lines max) and **its library picture 104 px** above it. **Right bank** (x 300–480) likewise. **The gap** over the river: two drawn stone abutments; a plank lies across 120 × 40.
- **The sentence strip** (y 310–360): the whole sentence in one line (24 px; wraps to two at 360) with the gap as a dotted box — the reading surface; it updates when a plank is laid and when halves swap.
- **The plank rack** (y 370–450): three planks 128 × 52, each with its word painted on it (Baloo 2, 24 px — content) and its shape drawn as the plank itself (straight, zig, fork, arrow). The arrow plank shows ONE face (the round decides which face is up at rest by random; the child can flip it by tapping its edge).
- **The car**: library toys/car, 64 px, parked at the left bank's foot.
- **Task line** above (≤ 24 px). **Bubble** right.

**At 360 px** (stacked; stage 360 × 560): finished bridge 360 × 28; banks stack: left signboard top (344 × 84, picture **72 px**), river as a horizontal band in the middle (the "bridge" goes top → bottom; planks rotate 90°), right signboard bottom; sentence strip 344 × 60 (22 px, two lines); rack 3 × 108 × 48; car 48 px; Check below. Check bottom ≤ 700 at 360 × 740, ≤ 630 at 320 × 640 (at 320 pictures 64 px, the finished bridge hides).

No words on the apparatus except content (the halves, the plank words).

## 5. The hand
- **Lay a plank:** drag a plank onto the gap (or tap it: it slides there, 220 ms). It drops onto the abutments with a wooden *klonk*; the sentence strip fills the gap.
- **Flip the arrow plank:** tap its edge (on the rack or on the bridge) → it turns over (3-D flip 420 ms): *because* ↔ *so*. The arrow on it flips direction as the face changes (because-face arrow points back toward the first half, so-face arrow points forward), so it always reads "from the reason to the result" for that face.
- **Swap the halves:** drag either signboard to the other bank (or tap the ⇄ handle between the banks — a drawn double-arrow knob 44 px). The boards cross over the river (360 ms). If the arrow plank is on the bridge, it turns over by itself during the swap; *and*/*or* planks stay; a *but* plank stays (the turn is still there — whether the sentence still makes sense is for the child to read).
- **Send the car (free play, any time a plank lies):** tap the car — it drives the plank's way (straight / turn / fork / arrow) and shows what that bridge means. No miss, no hint.
- **Remove:** drag the plank back to the rack, or tap it.

## 6. The rounds
One round = two halves (with pictures where the library has them) and a gap. The tray holds the right plank and two planks that genuinely fail in this sentence (checked per round by the native + pedagogy reviewer against the claim column).

**Level 1 — And or but?, 9 rounds.** Tray per round as listed (*and* rounds: *and · but · so*; *but* rounds: *but · so · because* — *and* is never offered where it would also make a sentence).

| # | left half [picture] | right half [picture] | right | why the others fail |
|---|---|---|---|---|
| 1 | I packed a hat [accessories/hat] | a coat. [clothing/coat] | and | tray and · but · so — *but a coat*: no turn; *so a coat*: not a result |
| 2 | I have a cat [pets/cat] | a dog. [pets/dog] | and | tray and · but · so — as row 1 |
| 3 | I like milk [at-the-supermarket/milk] | not juice. [at-the-supermarket/juice] | but | tray but · so · because — *so/because not juice* make no sentence |
| 4 | The box is small | very heavy. | but | tray but · so · because |
| 5 | We ate cake [bakery/cake] | cupcakes. [bakery/cupcake] | and | tray and · because · so |
| 6 | It is sunny [weather/sunny] | it is cold. (no picture) | but | tray *but · so · because* |
| 7 | I found a shell [beach/seashell] | a crab. [beach/crab] | and | tray and · but · because |
| 8 | The kite is big [toys/kite] | very light. | but | tray *but · so · because* |
| 9 | I brushed my teeth [around-the-house/toothbrush] | washed my face. | and | tray *and · because · so* |

Rule for every round: *and* appears in a tray ONLY in *and* rounds; in *but* rounds the tray is *but · so · because*.

**Level 2 — Because or so?, 9 rounds.** Tray: the arrow plank (because/so — its face up at rest is random, 50/50) · *but* · *or*. (*and* is refused in cause rounds: it always half-fits.) The child must lay the arrow plank AND turn it to the right face.

| # | left [picture] | right [picture] | right |
|---|---|---|---|
| 1 | I took my umbrella [weather/umbrella] | it was rainy. [weather/rainy] | because |
| 2 | It was cold (no picture) | I put on my scarf. [weather/scarf] | so |
| 3 | I wore my boots | it was raining. [weather/rainy] | because |
| 4 | It got dark [space/moon] | we went inside. | so |
| 5 | She was happy [emotions/happy] | she won the game. | because |
| 6 | He felt tired [emotions/tired] | he took a rest. [furniture/bed] | so |
| 7 | I put on sunglasses [weather/sunglasses] | it was sunny. [weather/sunny] | because |
| 8 | It snowed [weather/snowflake] | we made a snowman. [winter/snowman] | so |
| 9 | The snowman melted [winter/snowman] | it was hot. [weather/hot] | because |

because 5 / so 4; the face up at rest is random so the face itself is never the tell.

**Level 3 — Any joining word, 9 rounds.** Tray: three planks, chosen per round so exactly one fits (the arrow plank counts as one plank with two faces, and its face must be right too). *and* is never in a tray where it would also make a sentence — which rules it out of every *or*, *so*, *because* and most *but* rounds.

| # | left [picture] | right [picture] | right | tray | why the others fail |
|---|---|---|---|---|---|
| 1 | Do you want an apple [at-the-supermarket/apple] | a pear? [at-the-supermarket/pear] | or | or · but · arrow | *but a pear?*, *because/so a pear?* make no question |
| 2 | Should we paint | draw? | or | or · but · arrow | as row 1 |
| 3 | I was hungry | I ate a banana. [at-the-supermarket/banana] | so | arrow · but · or | *but I ate*: no surprise; *or*: not a choice |
| 4 | The dog barked [pets/dog] | it saw a cat. [pets/cat] | because | arrow · but · or | as row 3 |
| 5 | I put on my coat [clothing/coat] | it was cold. | because | arrow · but · or | as row 3 |
| 6 | I like dogs [pets/dog] | I like cats. [pets/cat] | and | and · or · arrow | *I like dogs or I like cats* is not a statement; no cause |
| 7 | I have a ball [toys/ball] | a kite. [toys/kite] | and | and · but · arrow | *but a kite*: no turn |
| 8 | Sam is small | fast. | but | but · or · arrow | *small or fast* is not a statement about Sam; no cause; *and* not offered (it fits) |
| 9 | The cake looks nice [bakery/cake] | it tastes bad. | but | but · or · arrow | *or*: no choice; *so/because*: looking nice does not cause a bad taste |

Right: or 2, so 1, because 2, and 2, but 2. (The draft's *We can play inside ___ we can go out* offered *but*, which also fits — "…but we can go out" — and *The sun came out ___ the snowman melted* would have accepted *and*; both removed.)

**Level 4 — Turn it round (because ⇄ so), 9 rounds.** The sentence starts complete with the arrow plank in (*I took my umbrella because it was rainy.*); the task: "Say it the other way round." The child swaps the halves; the plank turns by itself; Check accepts the swapped sentence with the plank showing *so*. Two traps keep it a real task: (a) in 3 of 9 rounds the plank is *so* at the start, and swapping gives *because*; (b) in 2 of 9 rounds the starting plank is an *and* plank joining two whole clauses — *The sun shines and the birds sing.* → *The birds sing and the sun shines.*; *Mom cooks and Dad sings.* → *Dad sings and Mom cooks.* — swapping is right and nothing turns; the child learns *and* does not care about order. (The draft's *I have a cat and a dog* cannot swap: its halves are *I have a cat* and *a dog*, and *a dog and I have a cat* is nonsense.) Rounds: the 9 L2 pairs minus two, plus the two *and* clause pairs. **Each half is authored for both positions** — capital and full stop move with it (*it was rainy.* ↔ *It was rainy,*), and the comma before *so* appears only on the so-face — never computed.

**Answer position.** Rack order shuffled per render; across each level the right plank sits in each rack slot 3 times. In L2 the arrow plank's resting face is random (the gate asserts face-up-at-rest = right face in 40–60% over 200 renders). The gate's bots: *always the arrow plank* (L3 ≤ 3/9), *always and* (L3 ≤ 2/9), *always the first slot* (3/9), *the longest word* (*because* — ≤ 3/9 in L3).
**Order:** order-only reshuffle per pass; never three rounds of the same relation in a row.

## 7. Check, the misses, the success
- **Check with the gap empty:** hint, no miss — "Lay a plank across the river. How do the two parts go together?"
- **Miss 1:** the car drives the plank's way and shows what the bridge claims:
  - *wrong arrow face* (so in a because-round): the car carries the WRONG picture across — the umbrella rides over to the rain cloud; a dotted arrow from cloud to umbrella appears beneath, pointing the other way · "Which came first — the rain or the umbrella? The arrow goes from the reason to what happened. Turn the plank."
  - *but in an and-round:* the car swerves at the zig into the river bank and stops with a wobble · "Is the second part a surprise? Or does it just add more?"
  - *or in a cause round:* the car reaches the fork and both pictures flicker — one or the other? · "Is this a choice? Or does one part cause the other?"
  - *arrow plank in an and-round:* the car starts, finds no reason to carry and rolls back · "Does one part make the other happen?"
- **Miss 2:** the right plank lifts 6 px with a teal glow on the rack (and, for the arrow plank, its right face shows) · "Try the plank that is glowing."
- **A new move takes the help away** until the next Check.
- **Success:** the car drives across the right way (the reason rides to the result, both pictures meet and bob), the plank flies up to join the long bridge, a soft *klonk-klonk* · en "I took my umbrella BECAUSE it was rainy — the rain is the reason!" · "It was cold, SO I put on my scarf — the scarf is what happened!" · "A hat AND a coat — both!" · "Small BUT heavy — a surprise!" · "An apple OR a pear — just one!" · L4 "It was rainy, so I took my umbrella — the same, the other way round!"

## 8. Settings
1. **Joining words:** And · but (L1) · Because · so (L2) · All five (L3) · Turn it round (L4) — the level picker; the rack changes at rest.
2. **Pictures:** Show pictures (default) · Words only — hides the bank pictures for children ready to read the halves alone (the car then carries the half's signboard instead); visible at rest.

## 9. Words (EN source)
- title (shell): **Hazel's Word Bridge** (frozen) · instruction: "Lay the plank that joins the two parts so they make sense."
- task lines: L1–L3 "Which plank makes the two parts make sense?" · L4 "Say it the other way round."
- hints and celebrations: §7 exactly.
- settings: "Joining words", "And · but", "Because · so", "All five", "Turn it round", "Pictures", "Show pictures", "Words only"
- aria: "First part: {left}", "Second part: {right}", "Plank {word}: straight / with a turn / that splits / an arrow from the reason", "The car carried {reason} to {result}".

**Locale traps (sentences literal per locale; each tray hand-checked for one right answer):**
- **Word order after the joining word.** de: *weil* sends the verb to the end, *denn* keeps V2 — the old de sentences use *denn* (*…, denn es regnet*) and are kept; *deshalb/also* for SO invert the verb (*Es ist kalt, deshalb ziehe ich…*) — the right half's text is authored per face, so **turning the plank also rewrites the right half's word order** in de/nl/sv/da/no (the signboard text cross-fades during the flip). nl *want* (V2) / *dus* (inversion); sv/da/no *för/for* (V2) and *så* (inversion: *…, så tog jag…*). In these locales level 4 shows the rewritten half — honest, and a native check per round.
- **fr** *car* / *parce que* for because (the old data uses *car*; *parce que* is the grade-1 word — the panel picks one per round) and *donc* / *alors* for so; *ou* (or) vs *où* (where) — *ou* only. **es** *porque* (never *por qué*), *así que* for so; *o* becomes *u* before an *o*-sound (*siete u ocho*) — avoided by authoring. **pt** *porque* (never *por que*), *então* for so. **it** *perché* (accent required), *quindi* for so; *o / oppure*.
- **fi** *ja / mutta / tai / koska / joten* — *koska* (because) and *joten* (so) mirror exactly; Finnish keeps SVO in both halves.
- **sv/da/no** *eller* for or; *men* for but. The old sv rounds (*antingen … eller*) are kept where the tray stays single-answer.
- Commas: de/fr/sv conventions put a comma before *aber/denn/mais/car/men/för/så*; the signboard text carries them as content.
- Sound off: the car's path (straight / turn / fork / arrow) carries the meaning; TTS reads the finished sentence only.

## 10. Sound off, access, phones
- Silent legibility: a car that drives the wrong way, swerves into a bank, or stalls at a fork; a plank that visibly turns over when the halves swap.
- Keyboard: Tab to a plank, Enter lays it; F flips the arrow plank; S swaps the halves; Enter on the car sends it.
- aria-live: "The car carried the rain to the umbrella. The rain is the reason." / "The plank turned over: because became so."
- Taps: planks 128 × 52 (108 × 48 at 360); the swap knob 44 px; the gap drop zone 140 × 80.
- Pictures 104 px at 704, 72 px at 360, ≥ 64 at 320.
- Phone: banks stack vertically and the bridge runs top → bottom; the car drives downward.

## 11. Distinct from
- **New 217 Article Caps** — caps that fit words; nothing here fits by shape — the plank's shape is what the car does.
- **Row 72 Two-Ended Rod** — opposites on one rod; here two ends of ONE link (because/so) — a different idea entirely.
- **Row 127 Event Tunnel (this batch)** — a day road with an event tunnel and a lantern that walks it; no vehicle and no joining. Here a car crosses a bridge between two clauses.
- **Tool story-line** — ordering beats; no joining.

## 12. Build plan
- **Data:** per locale, levels of rounds `{id, left:{text, pic?}, right:{text, textAfterFlip?, pic?}, relation, tray:[word…], right, claims:{word: why-it-fails}}`; L4 `{start:{order, plank}, target:{order, plank}}`.
- **Core state:** `{level, round, gap:null|{plank, face}, order:'AB'|'BA', misses}`; functions `lay(p)`, `flip()`, `swap()` (turns an arrow plank automatically: face = face === 'because' ? 'so' : 'because'), `drive()` → `{path:'straight'|'turn'|'fork'|'arrow', carried, to}` (pure), `sentence()`, `check()`.
- **Gate's own ground truth** (`verify-turning-bridge-core.js`): its own relation → word map per locale; for every round it asserts the right plank (and face, and order) is the only tray combination whose relation equals the round's relation; *and* never appears in a non-and tray; `swap()` turns the arrow plank and keeps the meaning (relation reversed ↔ face reversed); L4 targets reachable by one swap; rack-slot balance; resting-face randomness 40–60%; bots under caps; every picture exists; every round has a non-empty `claims` entry for each foil (the reviewer's single-answer proof).
- **Mutations:** swap does not turn the arrow plank · arrow points result → reason · *and* allowed in a because-tray · L2 resting face always right · fork car keeps both pictures · L4 accepts unswapped with the plank flipped only · de flip keeps the V2 half on *deshalb*.
- **Pictures** (critic, contact sheets 2026-10-17; every key exists): weather umbrella, rainy (a rain cloud), scarf, sunny, sunglasses, snowflake, hot (a sun); ⚠ **weather/cold is a SNOWMAN wearing a scarf**, not a feeling of cold — it would show the scarf answer in L2 #2, so "it is/was cold" halves have no picture (the signboard stands alone); emotions happy, tired (emoji faces, acceptable for feelings); toys/car (green), ball, kite; pets dog, cat; accessories/hat; clothing/coat; at-the-supermarket milk, juice (an orange bottle), apple, pear, banana; bakery cake, cupcake; beach seashell, crab; around-the-house/toothbrush; space/moon; furniture/bed; winter/snowman; activities/painting is drawn but has NO label — not used.
- **Risks:** any half without a picture shows its signboard alone (the bank never shows a blank frame). The flip-rewrite in V2 languages must be authored, never computed.
- **Blocked:** none.

## 13. The four questions
1. **Would a 5–8-year-old choose it again?** Yes — planks with a turn, a fork and an arrow, a little car that drives each one, and a plank that flips over by itself when you swap the banks.
2. **Would a teacher put it on the board?** Yes — "because and so are the same bridge from the two banks" is a lesson in one move; every tray is checked for exactly one sensible answer.
3. **Would a parent trust it?** Yes — real sentences with real pictures, correct word order in their own language, no scores.
4. **The invention:** each joining word is a plank with its own shape, and *because* and *so* are one arrow plank that turns over when the two halves swap.

## 14. Critic review (2026-10-17)
Scores before → after: invention 5→5 · fun 5→5 · completeness 4→5 · correctness 3→5 · distinctness 5→5 · reality 4→5
What changed:
- **Level 3 rewritten as a full table with a tray and a failure proof per round.** Two draft rounds had two right planks (*We can play inside ___ we can go out* accepted *but*; *The sun came out ___ the snowman melted* would accept *and*), three rounds had no tray at all, and the stated count (2/2/2/2/1) did not match the sentences (or 3, and 1). Now or 2 · but 2 · and 2 · because 2 · so 1, every foil shown to fail.
- **Level 4's *and* trap could not swap:** *I have a cat and a dog* → *a dog and I have a cat*. Replaced by clause pairs (*The sun shines and the birds sing*). Both orders of every half are authored (capitals, full stops, the comma on the so-face).
- **weather/cold is a snowman in a scarf** — as the picture for "it was cold, so I put on my scarf" it gave the answer away; cold halves now have no picture. Recorded in PICTURE-RULINGS.
- Layout check (2026-10-17): switched to stacked — split stage column is ~370 px at 704.
