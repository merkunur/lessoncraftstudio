# Row 78 — Mim's Memory Baskets → THE COUSIN RAIN (L.K.5.A)

## 0. Identity
- id `mims-baskets.category-sort.l-k-5-a` (KEPT; slug, title and intro frozen for en; de/fr/es/pt/it/nl/sv/da/no/fi slug, title and intro authored new at build, grade K / the platform age-range names, §17.4.2) · grade K · CCSS L.K.5.A (sort common objects into categories to gain a sense of the concepts the categories represent) · Vocabulary Acquisition and Use · own files `cousin-rain-core.js`, `cousin-rain-activity.js`, `cousin-rain-activity.html`, `cousin-rain-activities.json` (`mims-baskets-activities.json` emptied to `[]`).
- worksheets it covers: K-043 Which One Is Different? (L2 "The stray") · K-042 Sort It Out, K-235 Sort by Category, K-240 Cut, Sort, and Paste, K-264 Cut and Paste: Two Big Groups (L1, 2-basket and 3-basket sorts) · K-202 Fruits and Vegetables (L1 #10, L2 #9) · G1-160 Three Groups (L1 3-basket rounds) · G2-380 How Animals Adapt + G2-381 My Habitat Report (L1 #11–12 habitat sorts; the body-feature point is carried by the cousins and the success line, see §3 — partial) · G3-353 Two-Circle Sort (L3 "Two clouds": classify by two attributes, the middle place is "both").
- old activity: a spill of 3–4 pictures, labelled baskets (animal / food / vehicle / toy / clothing / shape), drag each to its basket; confound rounds (red apple + red fire truck, round ball + round orange, yellow banana + yellow duck), a diverse-animals round, an odd-one-out round. **Kept**: Mim the forgetful cloud-friend and her tipped-over basket (the frozen intro), the six categories, and every cognitive move of the old list — plain sort, the colour confound, the shape (round) confound, the yellow confound, "animals look very different from each other" (fish, duck, turtle in one group), odd-one-out, a shapes round. **Changed**: the baskets are no longer labelled with the answer — the child makes the groups, which is what "sort into categories" means; the old one-item-per-basket rounds (a basket with one thing teaches nothing about a category) now have at least two of every kind. **Dropped**: fire_truck (not in the picture library's JSON — the red tractor takes its job), a hand-drawn Mim (Mim is now the library's own smiling cloud, weather/cloud).

## 1. The pitch
"Put things that are the same kind together and Mim's little cloud rains down a cousin — mix two kinds and the cloud splits in two, each half raining a cousin of its own."

## 2. Why a child will want it again
- **The spill.** Each round starts with Mim's basket tipping: a woven basket on the hill rocks, tips, and its treasures tumble down onto the meadow with little bounces (each thing a different arc, 700 ms). Children love a spill.
- **Rain that brings presents.** Over every empty basket floats a tiny version of Mim (weather/cloud, the smiling library cloud). The moment a basket holds two things of the same kind and nothing else, its cloud puffs up, rains a soft shower of drops, and one NEW thing of that kind falls out of the rain into the basket: put a dog and a cat together and down drops a rabbit. "Mim remembers!" The child is rewarded with more of the category — and learns the category from a fresh example.
- **The split cloud.** At Check, a basket that mixes two kinds makes its cloud wobble and split into two little clouds, each raining a cousin of ONE of the things: over the red apple and the red tractor, one half rains a green kiwi and the other a purple airplane. The two families appear before the child's eyes — and they are not red.
- **The end of the round**: every basket's cloud joins the big Mim above the meadow, Mim's own basket rights itself on the hill, and the baskets' treasures (the child's things + the cousins) march back up the hill into it, kind by kind, in a little parade (900 ms). Mim grows a little rosier each round — her memory coming back.
- **Free play**: after success, the cousins can be picked up and sorted too; dropping any library thing into a full family basket makes the cloud give a happy puff.

## 3. The skill and the misconception
- Skill (L.K.5.A and the mapped worksheets): group things by WHAT THEY ARE (animal, food, vehicle, toy, clothing, shape; fruit vs vegetable; where an animal lives), find the one that does not belong by kind, and — at the top level — sort by two attributes at once with a "both" place.
- Misconceptions made visible:
  1. **Sorting by looks instead of kind** (colour, roundness): red apple with red tractor, round ball with round orange, yellow banana with yellow duck. Push-back: the split cloud rains a cousin of each kind chosen to NOT share the confusing look (a green pear, a purple airplane) — the shared colour is visibly not what the family has in common.
  2. **"Things in a group must look alike"**: fish, duck, turtle and dog look nothing alike. Push-back: their basket rains a fourth animal (a rabbit) that looks like none of them — the family is "animals", not "looks".
  3. **Odd one out by looks** (the kite next to a fish, an owl and a turtle "because the owl flies too"). Push-back: in the stray basket the kite's cloud rains a toy cousin (a ball); the big basket's cloud rains an animal.
  4. **Two attributes = one** (L3): a thing that has BOTH traits must go in the middle. Push-back: at Check both clouds rain on every thing; each thing catches the drops of the traits it really has (teal drops for one cloud, coral for the other) and wears them as little drop-badges — a duck catches both, an eagle only the flying cloud's.
- Body features in habitats (G2-380/381) are touched, not taught in full: the habitat rounds' success lines name one true body feature per habitat ("The dolphin swims with fins; the fox's thick fur keeps it warm in the forest.") — never a claim about every animal in the basket (a crab and an octopus have no fins). The design records this as partial coverage of G2-380/381.

## 4. The stage
At 704 (stacked, stage ≈ 660 × 480):
- **The sky band** (top, 660 × 120): Mim — weather/cloud, 120 px, top-left at (24, 8) — floats beside a drawn grassy **hill** (a soft green arc, #8CC56B with a 3 px ink edge) where **Mim's basket** sits (a drawn woven basket 96 × 72: trapezoid body #D9A15B with 2 px ink weave lines, a handle arc). The basket tips at round start and rights itself at the end.
- **The meadow** (660 × 230, the spill zone): the round's things land here in a loose scatter (positions dealt so that no two things overlap and same-kind things are never next to each other), library pictures **96 px** each on a soft shadow ellipse. Up to 8 things (two rows of 4 at 120 px pitch).
- **The baskets row** (660 × 230): 2–4 drawn woven baskets, equally spaced, sized by count — 2 baskets 300 × 130, 3 baskets 210 × 130, 4 baskets 156 × 150. Things dropped in keep their FULL size (96 px — no library picture renders below 96 px at 704 / 64 px at 360, PICTURE-RULINGS) and heap in the basket mouth in two tiers (back tier up to 3, front tier for the rest and the cousin), each picture at least 60 % visible (the gate measures the overlap); a tap on a basket fans its heap out above it for 1.5 s. Over each basket a **little cloud** (weather/cloud, 96 px) on a dotted thread — wispy (40 % opacity) while the basket is empty or mixed, full (100 %) when it holds one kind.
- L2 baskets: one big basket (300 × 130) and one **stray basket** — visibly smaller (150 × 110), tilted 8°, set slightly lower on the right; things in both stay 96 px.
- L3 places: **three baskets** in a row (each 140 × 104) under **two clouds** — Cloud A (teal-tinted, `hue` untouched; a teal 4 px ring round the cloud picture) spanning baskets 1–2 and Cloud B (coral ring) spanning baskets 2–3, overlapping over basket 2. Each cloud carries its **rule** as two example pictures hanging under it on threads like big raindrops (96 px each at 704, 64 px at 360 — Cloud A's pair over the left half of the stage, Cloud B's over the right half, so the four never overlap), e.g. for "flies": airplane + bee. No words.
- Task line above (≤ 24 px). Check button (shell) and bubble under the baskets row.

At 360 (stacked, stage ≈ 336 × 620): sky band 336 × 84 (Mim 80 px, hill basket 64 × 48), meadow 336 × 176 (things **72 px**, rows of 4 at 82 px pitch, two rows; 8 things max), baskets row: 2 baskets of 160 × 110, 3 baskets of 108 × 104, 4 baskets as a 2 × 2 grid (160 × 104 each); clouds 64 px; things inside baskets 64 px (the floor), heaped ≥ 60 % visible. L3 on a phone: three baskets 108 × 104, clouds 64 px with 64 px rule pictures (two per half-width, 168 px). Check at y ≈ 690 at 360 × 740 (the meadow empties as things move, and the shell keeps Check pinned under the baskets; the gate measures it above the fold); at 320 × 640 things are 64 px, the meadow 320 × 150 and Check y ≈ 600.

Library pictures (all verified in `mini tools/pictures/*.json`; contact sheets seen for weather, clothing, toys, vehicles, shapes, easter, kitchen-tools, birds-2, tree; the rest checked by noun list and re-read at build, §12): weather/cloud (Mim and the little clouds), pets/dog, pets/cat, pets/fish, pets/rabbit, pets/turtle, farm-animals/duck, farm-animals/horse, farm-animals/cow, farm-animals/pig, farm-animals/sheep, fruits/apple, fruits/banana, at-the-supermarket/pear (GREEN — fruits/pear has a big red blush and is not used), fruits/orange, fruits/strawberry, at-the-supermarket/kiwi, at-the-supermarket/cherry, at-the-supermarket/blueberry (no plum anywhere: fruits/plum and the supermarket plum are drawn as red apples), vegetables/carrot, vegetables/broccoli, vegetables/potato, vegetables/corn, vegetables/lettuce, at-the-supermarket/bread, at-the-supermarket/cheese, vehicles/car, vehicles/bus, vehicles/train, vehicles/tractor (red), vehicles/boat, vehicles/airplane, vehicles/helicopter, toys/ball, toys/blocks, toys/robot, toys/kite, clothing/shoe, clothing/hat (yellow straw hat), clothing/coat, clothing/shirt, clothing/t-shirt, clothing/swimsuit, clothing/mitten, accessories/hat (blue), shapes/star, shapes/circle, shapes/triangle, ocean-life/crab, ocean-life/octopus, ocean-life/dolphin, ocean-life/jellyfish, ocean-life/starfish, ocean-life/whale, forest-creatures/fox, forest-creatures/deer, forest-creatures/squirrel, forest-creatures/hedgehog, forest-creatures/butterfly, things-that-fly/bee, birds-2/eagle, birds-2/swan, birds-2/pelican, birds-2/seagull, birds-2/penguin, birds-2/owl (never in the habitat rounds — the library files owl under farm AND forest), birds-2/cardinal, insects-and-bugs/ladybug, zoo-animals/lion, zoo-animals/elephant, zoo-animals/tiger, thanksgivinng/haystack, thanksgivinng/scarecrow, thanksgivinng/corn, winter/snowman, winter/igloo, winter/sled, clothing/cap, kitchen-tools/plate, vehicles/ship, weather/snowflake, around-the-house/clock, miscellaneous/house, forest-creatures/mouse. The baskets, hill and meadow are drawn apparatus geometry. **No words on the apparatus.**

## 5. The hand
1. **Spill** (round start, not interactive): Mim's basket tips (300 ms), things tumble in arcs to their meadow spots (700 ms, staggered 60 ms), each landing with a tiny squash.
2. **Drag a thing** (pointer down lifts it 1.15× with a shadow within 50 ms; it follows the finger) **into a basket** (drop zone = basket rect + 20 px) → it drops into the mouth with a 120 ms settle and a soft wicker *thump*. Tap-then-tap works too (tap a thing, it lifts and the baskets glow; tap a basket). Drop outside any basket → it floats back to the meadow (200 ms). A thing in a basket can be dragged out again at any time (undo).
3. **The cloud responds live** (≤ 100 ms after each drop):
   - basket empty or holding one thing → cloud wispy;
   - basket holding ≥ 2 things, all one kind → the cloud fills (200 ms), rains (a 600 ms shower of 12 drawn drops) and **one cousin** of that kind falls from it into the basket (400 ms) — once per basket per round (the cousin stays even if things move later; if the basket later becomes mixed, the cousin fades back up into the cloud);
   - basket holding two kinds → the cloud stays wispy and gives a single grey drip (no split yet — the split is the Check's showing, so live play never solves a round for the child).
   A soft rain sound (filtered noise, 600 ms) and a bright *plink* as the cousin lands.
4. **Check** (shell button) → §7.
5. **L3**: drag things into the three baskets the same way; clouds do NOT rain live in L3 (the drop-badges are the Check's showing), only the rule pictures sway when a thing is lifted.
- **Free play**: after success the cousins and things can be lifted and re-sorted; each family basket gives a happy puff when a matching thing arrives. A long-press on any picture speaks its name (TTS, where available) and shows its word in a small tag under it for 1.5 s (the word is content: vocabulary).

## 6. The rounds
One round = a spill of 4–8 things that must ALL end up in baskets, one kind per basket, with the number of baskets equal to the number of kinds (L1) — any assignment of kinds to baskets is right (the baskets have no labels, so there is one right GROUPING, never a right basket). L2: the same-kind things in the big basket and the one stray in the stray basket. L3: every thing in the place its two traits decide.

Kinds are written in brackets; **cousins** are the pictures the clouds rain (one per family; the split cloud uses the same cousins); in confound rounds the cousins never share the confusing feature.

**Level 1 — Sort** (2–4 baskets)
| # | move | things (grouped by kind; the meadow scatter mixes them) | baskets | cousins |
|---|---|---|---|---|
| 1 | on-ramp | [animal] dog, cat · [food] apple, banana | 2 | rabbit · bread |
| 2 | sort three | [animal] dog, horse · [food] apple, corn · [vehicle] car, train | 3 | pig · cheese · bus |
| 3 | colour confound | [food] apple (red), banana · [vehicle] tractor (red), bus (blue) | 2 | kiwi (green) · airplane (purple) |
| 4 | diverse | [animal] dog, fish, duck, turtle · [vehicle] car, boat | 2 | rabbit · helicopter |
| 5 | round confound | [toy] ball, blocks · [food] orange, pear · [clothing] shoe, hat (blue) | 3 | kite · banana · shirt |
| 6 | sort four | [clothing] hat (blue), shoe · [vehicle] train, bus · [food] corn, carrot · [animal] cat, rabbit | 4 | coat · car · bread · cow |
| 7 | diverse three | [animal] rabbit, turtle, owl · [toy] blocks, robot · [food] bread, cheese | 3 | fish · ball · apple |
| 8 | yellow confound | [food] banana (yellow), strawberry · [animal] duck (yellow), pig · [clothing] hat (yellow straw), coat | 3 | kiwi · cow · shirt (pink) |
| 9 | shapes | [shape] star, circle, triangle · [food] strawberry, apple · [animal] horse, cow | 3 | shapes/square · banana · sheep |
| 10 | fruit or vegetable | [fruit] apple, banana, pear · [vegetable] carrot, broccoli, potato | 2 | strawberry · lettuce |
| 11 | where they live | [ocean] crab, octopus, dolphin · [forest] fox, deer, squirrel | 2 | starfish · hedgehog |
| 12 | where they live (three) | [farm] cow, pig · [ocean] crab, jellyfish · [forest] fox, hedgehog | 3 | sheep · whale · deer |

Round 10 avoids the botanical traps (tomato, cucumber, pumpkin, corn, avocado — fruits in botany, vegetables in the kitchen); its success line teaches the K-202 idea at child level ("fruits grow from flowers and hold seeds; vegetables are other parts of plants"). Rounds 11–12 avoid owl and frog (animals that appear in more than one habitat theme).

**Level 2 — The stray** (one big basket + one stray basket; the stray's cloud rains a cousin of the stray's own kind)
| # | things | the stray | big basket's cousin | stray's cousin | trap |
|---|---|---|---|---|---|
| 1 | dog, cat, fish, car | car | rabbit | bus | — |
| 2 | apple, banana, pear, ball | ball | kiwi | kite | — |
| 3 | train, bus, car, rabbit | rabbit | boat | cow | — |
| 4 | shoe, hat (blue), coat, apple | apple | shirt | banana | — |
| 5 | strawberry, apple, cherry, tractor | tractor | pear (green) | airplane | red (four red things — colour cannot pick the stray) |
| 6 | orange, apple, blueberry, ball | ball | banana | kite | round (four round things) |
| 7 | duck, pig, cow, banana | banana | sheep | bread | yellow (duck + banana) |
| 8 | fish, owl, turtle, kite | kite | rabbit | ball | "it flies like the owl" |
| 9 | carrot, broccoli, potato, banana | banana | lettuce | kiwi | fruit among vegetables |

**Level 3 — Two clouds** (three baskets; Cloud A over 1–2, Cloud B over 2–3; basket 2 = both; two things per place)
| # | Cloud A (rule pictures) | Cloud B (rule pictures) | basket 1: A only | basket 2: both | basket 3: B only |
|---|---|---|---|---|---|
| 1 | flies (airplane, butterfly) | swims (octopus, whale) | eagle, bee | duck, swan | dolphin, fish |
| 2 | flies (helicopter, bee) | swims (octopus, dolphin) | owl, butterfly | pelican, seagull | whale, penguin |
| 3 | is a fruit (kiwi, orange) | is red (cardinal, clothing/coat) | banana, pear | strawberry, apple | ladybug, tractor |
| 4 | is an animal (dog, fish) | is on a farm (scarecrow, corn) | lion, dolphin | cow, sheep | tractor, haystack |
| 5 | is a vehicle (bus, boat) | flies (bee, owl) | car, train | airplane, helicopter | kite, butterfly |
| 6 | is clothing (shoe, cap) | goes with winter (snowflake, igloo) | swimsuit, t-shirt | coat, mitten | snowman, sled |
| 7 | is food (bread, cheese) | is round (shapes/circle, plate) | banana, carrot | orange, apple | ball, clock |
| 8 | is an animal (cat, duck) | is big in real life (train, ship) | mouse, ladybug | elephant, whale | bus, house |

Rule pictures never repeat a thing that has to be sorted in the same round, and each has its cloud's trait. Every thing has at least one of the two traits (no thing belongs nowhere). The trait set of every thing is part of the round data (flies / swims / fruit / red / animal / farm / vehicle / clothing / cold / food / round / big), written once per picture and re-written independently in the gate.

**Trait truth notes** (the reviewer checks these): duck, swan, pelican, seagull fly AND swim; penguin swims and does not fly; eagle, owl, bee, butterfly fly and do not swim; strawberry and apple (the library apple is red) are red fruits; the library banana and pear are not red; cow and sheep are farm animals; lion and dolphin are animals not on a farm; airplane and helicopter are flying vehicles; coat (clothing/coat, red wool) and mitten are winter clothing, snowman and sled are winter things that are not clothing; swimsuit and t-shirt are not winter things; the crab is never a "swims" rule picture (crabs mostly walk); orange and apple are round foods; banana and carrot are not round; elephant and whale are big animals; mouse and ladybug are small animals.

- **Answer position**: meadow scatter positions are dealt so that same-kind things are never adjacent and the first thing in reading order is each kind about equally often (gate: over 2,000 deals, every kind leads with p ∈ [1/k − 0.05, 1/k + 0.05]); in L2 the stray's meadow spot is uniform over the spots (p ∈ [0.21, 0.29] for 4 spots); in L3 basket membership is fixed by traits but the meadow order is dealt the same way. Baskets have no identity in L1 — there is no "right basket" to guess.
- **Order**: order-only reshuffle per pass; L1 #1 always opens; the rest reshuffled, never the same order twice in a row.

## 7. Check, the misses, the success
- **Check with things still on the meadow** → no miss; the meadow things bob once; bubble: "Mim still has things on the grass. Put every one in a basket."
- **Miss 1** → every mixed basket's cloud **splits** (the cloud stretches and pinches into two little clouds, 400 ms), and each half rains the cousin of one kind straight down over the thing it belongs to — so a mixed basket ends up with two cousins, each landing on its own relative (a pear on the apple, an airplane on the tractor). In L2 the same happens if the stray is in the big basket (the big basket's cloud splits). In L3 both clouds rain on every thing; each thing catches the drops of the traits it really has and wears them as drop-badges (teal for Cloud A, coral for Cloud B, 18 px); a thing whose badges do not match its basket (badges teal+coral but in basket 1, …) glows softly. Bubble: "Mim's cloud split in two — two different kinds are in one basket." (L1/L2) · "Look at the raindrops each thing caught." (L3)
- **Miss 2** → the stronger showing: the misplaced thing and its cousin are joined by a dotted thread to the basket where that cousin's family already is (or to the empty basket, if none), and that basket's cloud bobs. In L3 the target basket of each glowing thing lights its rim in the colour mix of the badges. Bubble: "Follow the dotted line — this one's family is over there."
- A new move (any drag) clears the threads and badges (help taken away until the next Check).
- **Success** → every cloud full; the clouds lift and join big Mim (600 ms), Mim's basket rights itself on the hill, the families march up the hill into it in a parade (900 ms) — and Mim's cheeks turn one shade rosier (a gentle filter on the library cloud; 7 steps over a pass). Bubble — L1: "{Kind1} with {kind1}, {kind2} with {kind2}! Mim remembers." (e.g. "Animals with animals, foods with foods!") with the round's real category words; habitat rounds add one true feature: #11 "The dolphin swims with fins; the fox's thick fur keeps it warm." · #12 "The whale swims with flippers; the hedgehog hides in its spines." L2: "The {stray} is not {kindPlural} — it is {strayKindArticle}!" L3: "{Both1} and {both2} {traitA} and {traitB}!" (e.g. "Duck and swan fly and swim!").

## 8. Settings (each visibly changes the board at rest)
1. **Baskets**: two (rounds with 2 kinds only — L1 #1, 3, 4, 10, 11; L2 unchanged; the baskets row shows 2 baskets) · any (default; 2–4 baskets).
2. **Helping rain**: on (default; clouds rain cousins live) · only at Check (the little clouds over the baskets are hidden until Check — a visibly cloudless sky — for children ready to sort without the live reward).
Level picker (shell): Sort · The stray · Two clouds.

## 9. Words (EN source)
- title (frozen en): Mim's Memory Baskets — Sort Things into Groups
- instruction: "Mim's basket tipped over! Put things that are the same kind in the same basket."
- task lines: L1 "Same kind, same basket." · L2 "Which one is a different kind? Put it in the little basket." · L3 "Which cloud's rain does each thing catch? The middle basket is for both."
- hints and celebrations: §7. Category words (plural, for the success line): animals, foods, vehicles, toys, clothes, shapes, fruits, vegetables, ocean animals, forest animals, farm animals; trait phrases for L3: fly, swim, are fruits, are red, are animals, live on a farm (are on a farm), are vehicles, are clothes, go with winter, are food, are round, are big.
- settings labels: "Baskets" — "two" / "any"; "Helping rain" — "on" / "only at Check"; levels "Sort" / "The stray" / "Two clouds".

**Locale traps**:
- **Category words differ in grain**: "food" vs "fruit/vegetable" is the same split everywhere, but "clothes" (de *Kleidung* is a mass noun, fr *vêtements* plural, fi *vaatteet*), and "vehicles" (de *Fahrzeuge*, nl *voertuigen*, sv *fordon* — the K-level word is often "things that drive": de *Fahrzeuge* is fine, fi *kulkuneuvot* vs *ajoneuvot* — reviewer picks the child word).
- **Fruit vs vegetable**: culinary convention is not identical — the round uses only items every locale's kitchen agrees on (apple, banana, pear, strawberry, kiwi / carrot, broccoli, potato, lettuce). Potato is a vegetable in school sorts in all 11 (the reviewer confirms; in some Nordic school materials potato is its own group — if so that locale swaps in *cabbage* or *leek*).
- **Success line agreement**: "{kind} with {kind}" needs plural forms and per-locale prepositions (de *Tiere zu den Tieren*, fr *les animaux avec les animaux*, fi comitative or *kanssa*: *eläimet eläinten kanssa*); authored per category per locale, not assembled from a template.
- **L2 line** "The X is not an animal — it is a vehicle" needs the stray's article + gender (vocab gender column) and an indefinite article for the kind noun; fi no article; da/no/sv indefinite *en/ett/ei*.
- **L3 trait phrases** are verbs in some languages and adjectives in others ("fly and swim" / "are red" / "are on a farm"); author each trait as a full predicate per locale.
- **Animal names**: "swan" / "duck" / "pelican" are distinct words everywhere; "seagull" de *Möwe*. "Penguin" swims-not-flies is universal.
- Colour words are not used on screen; nothing else locale-specific on the apparatus. TTS only on long-press.

## 10. Sound off, access, phones
- Sound off: the rain, the cousin dropping in, the split cloud and the drop-badges carry every result; nothing depends on sound.
- Keyboard: Tab to a thing, Enter lifts it, Left/Right choose a basket (the basket glows), Enter drops; Escape returns it to the meadow. Check reachable by Tab.
- aria: things `aria-label="{noun}"` (page locale); baskets `aria-label="basket {n}, holds {list}"`; live region announces "Mim's cloud rained a {cousin} into basket {n}" and, at miss 1, "basket {n} has two kinds: {list}".
- Taps: things 96 px (72 / 64 on phones), baskets ≥ 104 × 80.
- Pictures ≥ 96 px at 704 on the meadow, ≥ 64 px at 320.
- Check above the fold: y ≈ 560 at 360 × 740, y ≈ 520 at 320 × 640.

## 11. Distinct from
- **sorting-hoops** tool (two overlapping hoops, a HIDDEN rule, the hoop decides): L3 shows its rules openly as pictures under two clouds over three separate baskets, and the test is drops caught per trait — no hoops, no hidden rule, no hoop deciding.
- **Row 35 Sorting Chutes** (conveyor + chutes → picture graph): one thing at a time, fixed chutes, counting. **New 225 Sorting Cabinet** (3 × 3 drawers, rows/columns): matrix reasoning, a jammed drawer. Here: free grouping into unlabelled baskets, with rain that ADDS a new member of the category.
- **#22 Nesting Pots** bounce-back and **#35** — no shared mechanic. **wodb** (which one doesn't belong, every answer defensible): L2 has one right stray by KIND, with the stray's own family revealed.
- No built invention reused (registry checked).

## 12. Build plan
- **Core** `CousinRainCore`: `state = { round, placement: {thingId: basketIndex|null}, cousinsDropped: {basketIndex: cousinId}, phase, misses }`. Data: each thing `{id, kind, traits:[...]}`; `familyOf(basket)` = set of kinds present; `isPure(basket)` = ≥ 2 things and one kind; `liveCousin(basket)` = cousin of that kind if pure and not yet dropped; `check()` → `{complete, mixedBaskets, strayOk (L2), mismatches (L3: thing → expected basket from traits)}`; `expectedPlaceL3(thing)` = A-only → 0, both → 1, B-only → 2; `split(basket)` → per kind the cousin + the thing it lands on; `dealMeadow(rng)` under the adjacency/lead constraints.
- **Gate's own ground truth** (`verify-cousin-rain-core.js`): kinds and traits re-read from the round tables as literals (the gate's own copy); assert (a) every L1 round has ≥ 2 things per kind and baskets = kinds; (b) any permutation of kinds to baskets is accepted and any non-pure grouping is rejected (exhaustive over assignments for rounds ≤ 6 things; sampled 20,000 for 8); (c) cousins are of their family's kind, not on the meadow, and in confound rounds do NOT share the confound feature (a per-picture feature table: red/yellow/round, written in the gate); (d) L2: exactly one stray per round, its kind ≠ the others'; (e) L3: every thing's expected place follows from its traits, every thing has ≥ 1 trait, rule pictures are disjoint from the round's things and have the cloud's trait; (f) answer-position balance (§6); (g) every picture key exists in the theme JSON and no B&W theme is referenced (localized B&W markers, §20.5); (h) every success sentence exists for every category pair used, all 11 locales.
- **Mutations**: pure test accepts one thing · pure test ignores kind (accepts a mix) · cousin rains for a mixed basket · split rains the same cousin twice · a confound cousin that shares the colour · L2 stray accepted in the big basket · L3 "both" thing accepted in basket 1 · L3 badges show a trait the thing lacks · meadow deal puts same kinds adjacent · baskets labelled (a basket accepts only its "own" kind — breaks free grouping) · Check with meadow things counts a miss · success line names the wrong category.
- **Pictures to verify on a contact sheet at build**: pets, farm-animals, fruits, vegetables, ocean-life, forest-creatures, insects-and-bugs (ladybug red), at-the-supermarket (bread, cheese), zoo-animals, winter (snowman, igloo, sled), thanksgivinng (haystack, scarecrow, corn), miscellaneous/house, vehicles/ship. Ladybug must read as red; if it does not, row L3-#3 swaps it for easter/ribbon (a red bow — red, not a fruit). The apple must be red (fruits/apple — confirm; at-the-supermarket/apple as the alternative).
- **Risks**: (1) live rain makes trial-and-error possible — bounded: the cousin only confirms a PURE pair, the split (which explains the mistake) only comes at Check, and the gate's bot that drops at random and watches for rain must need > 3× the minimum moves on average; (2) the B&W localized-theme filter; (3) category words in 11 locales — authored, one reviewer.
- **Nothing BLOCKED.**

## 13. The four questions
1. **Would a 5–8-year-old choose it again?** Yes — a spill, baskets, clouds that rain presents, and a cloud that splits in two: each round is a little weather show the child makes happen.
2. **Would a teacher put it on the board?** Yes — the child makes the groups (no answer labels), the confound rounds name the exact misconception (sorting by colour or shape), and the split cloud explains a wrong grouping with two fresh examples instead of a red cross; the top level is the two-circle sort without hoops.
3. **Would a parent trust it?** Calm, library pictures, a smiling library cloud as Mim, no score, no timer.
4. **The invention in one sentence:** a basket of one kind makes Mim's cloud rain a new cousin of that kind, and a mixed basket makes the cloud split in two, each half raining a cousin of its own thing.

## 14. Critic review (2026-10-17)
Scores before → after: invention 5→5 · fun 5→5 · completeness 4→5 · correctness 3→5 · distinctness 5→5 · reality 3→5
What changed:
- **Pictures (opened on contact sheets):** fruits/plum (and the supermarket plum) are drawn as RED APPLES (PICTURE-RULINGS) — removed from 6 places; the plum's jobs go to kiwi, strawberry, cherry and blueberry. **fruits/pear has a big red blush**, so it could not be the "not red" cousin in the colour confound or the "not red" fruit in L3 #3 — switched to at-the-supermarket/pear, which is green (new ruling line added). Duck (yellow), coat (red), straw hat (yellow), shirt (pink), bus (blue), airplane (purple), clock and plate (round) confirmed.
- **Confound rounds re-checked:** each confound now forms a real alternative grouping by looks (red apple + red tractor vs banana + blue bus; yellow banana/duck/straw hat vs strawberry/pig/coat; round ball/orange), every cousin avoids the confound feature (kiwi green, airplane purple, cousins of the yellow round not yellow), and L2 #5/#6 now hold FOUR red / four round things so colour or shape cannot find the stray.
- **Two false claims fixed:** "ocean animals swim with fins and flippers" (crab, octopus, starfish have none) → one true feature per named animal; crab as a "swims" rule picture → whale / dolphin. "Is for the cold" (a snowman is not "for" anything) → "goes with winter".
- **Size floor:** clouds, rule pictures and things in baskets were 36–72 px; now 96 px at 704 / 64 px at 360 everywhere, baskets sized by count with heaps ≥ 60 % visible.
