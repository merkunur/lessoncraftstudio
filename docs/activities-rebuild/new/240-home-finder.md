# New 240 — The Home Finder → THE THREE NEED BADGES (NGSS K-ESS3-1)

## 0. Identity
- id `home-finder.play.k-ess3-1` · grade K (Food and Adapt modes reach grade 1–2) · framework NGSS K-ESS3-1 (the relationship between the needs of animals and the places they live) · strand Science · files `home-finder-core.js`, `home-finder-activity.js`, `home-finder-activity.html`, `home-finder-activities.json` (scaffold `--num=240`).
- Worksheets covered: **K-204** Pets and Wild Animals + **K-209** Farm and Wild Animals (Who-lives-with-us mode) · **G1-202** Where Do Animals Live? + **G1-398** Animal Habitats + **K-383** Animal Homes, partly (Habitats mode; the nest is the one home with art — hive, web, burrow, anthill, lodge are BLOCKED, §12) · **G1-406** Who Does Not Live Here? (Stranger mode) · **G1-206** What Animals Eat + **G1-407** What Animals Need, food half (Food mode) · **G2-380** How Animals Adapt (Adapt mode) · **G2-381** My Habitat Report — draw-and-write, stays a worksheet (free play lets the child fill a habitat with its animals, nothing more is claimed).
- Merged: grade-1 "The Habitat Map" (need badges = this instrument's invention; its stranger and eat settings = Stranger and Food modes); grade-2 "The Habitat Diorama" (its feature flash = Adapt mode's ring; its shiver/overheat icons are replaced by the badges, which are honest and need no character expression).
- Correctness SoT: the hand-read, picture-checked bank `scripts/worksheet-gen/data/b6/habitats.js` (`ANIMALS` with full `lives` lists, `EXCLUDED`, `HOMES`, `ADAPT` with `answers`, `NEEDS`, `FOOD_PICS`, `TEMPERATE`) and `data/science/{pets-vs-wild-animals,farm-vs-wild-animals,what-animals-eat}.json`.

## 1. The pitch
"Walk an animal to a place and three badges above it — food, water, shelter — fill only if that place gives this animal what it needs; a whale in the forest stands there with an empty water badge, and turns and walks back."

## 2. Why a child will want it again
Along the bottom of the stage runs a landscape of big place pictures standing like signposts — a flower meadow, a lake, an island in the sea, and in the bigger landscape a forest (and an icy arctic, once its picture is indexed). The child picks up an animal and lets go anywhere near a place: the animal hops there along a little dotted path (a gentle bounce per step), stops in front of the place, and three empty round badges pop up above its head. Then the place answers: one by one the badges fill — a bowl fills with food, a drop fills with water, a little roof closes over — each with a bright *pling*. All three full and the animal settles in, a tiny heart-shaped spark rises, and it stays there as one of the place's residents. Put the clownfish in the forest and the bowl and roof might stay grey while the water badge stays stubbornly empty; the fish waits a beat, turns round and hops back. By the end of a round the landscape is populated: a squirrel under the forest, a swan by the lake, a starfish on the island's shore. The show: every resident gives a little hop in turn, left to right, and every badge row flashes full together.

## 3. The skill and the misconception
- **Skill:** tell pets, farm animals and wild animals apart; match animals to the habitat that meets their needs (food, water, shelter); spot the animal that does not live in a habitat; sort animals by what they eat (plants / other animals); match an adaptation sentence to the animal whose body shows it.
- **Misconceptions and the push-back (mechanism):**
  1. *"A fish could live in a nest / anywhere."* The badges are a fact table, not a judgement: the forest gives the clownfish no sea water, and the empty drop is visible. The walk back is the consequence.
  2. *"All animals live on farms."* In Who-lives-with-us mode, a squirrel walked to the farm stops at the gate, and the farm's own residents (a cow and a hen) appear as soft ghosts beside it — the child compares the squirrel with the animals that really live there; it turns back.
  3. *"Wild means dangerous."* The wild animals here are a deer, a squirrel, a hedgehog, a badger, a fox, a woodpecker — wild means "lives on its own, not cared for by people", shown by the forest giving all three badges by itself while the house and the farm give theirs through a person's bowl and water bucket (§4).
  4. *Food:* a lion-style guess that "big animals eat meat" — the elephant and giraffe are plant-eaters; the badge that fills is the food the animal actually eats.

## 4. The stage
**Layout: stacked at every width** (layout check 2026-10-17: no `layout:'split'` — its stage column is only ≈ 370 px at 704): the landscape uses the full stage width, ≈ 648 px at 704 (gaps close; pictures stay 120 / 96 px); Adapt mode's sentence cards sit under the porch line inside the stage.

**At 704 px:**
- **The landscape** (680 × 260, bottom half): 3–5 place pictures standing side by side at 120 px on a drawn ground strip (a soft line with tufts), each with an empty "porch" area in front where residents settle at 96 px (never smaller: a Habitats round sends exactly one animal to each place, With-people rounds two per place side by side, and a Stranger round shows its one place enlarged across the stage with its four animals in a row at 96 px). Places keep fixed slots per mode (the place is the content).
- **The badge row** (above each walker at arrival): three circles of 30 px, apparatus icons: food = a bowl outline, water = a drop outline, shelter = a roof outline; empty = grey outline, full = filled colour (food amber, water teal, shelter coral).
- **The animal pen** (top, 680 × 150): the round's animals at 104 px on a drawn wooden fence rail, each on its own post.
- **Who-lives-with-us mode:** the places are a house (`miscellaneous/house`), a farm (`thanksgivinng/haystack`) and the wild (`camping/forest`); the house and farm each have a drawn bowl + bucket on their porch (apparatus) — "people give the badges here"; the forest's porch is bare grass — "the place gives them by itself".
- **Food mode:** places are replaced by two (or three) food tables: a plant table (`spring/grass` + `spring/leaf`, 96 px each), an animal-food table (`insects-and-bugs/mosquito` + `ocean-life/fish`, 96 px); G1-407 rounds show one animal and three single food pictures (`spring/flower`, `insects-and-bugs/mosquito`, `spring/grass`, `spring/leaf`).
- **Adapt mode:** 3 animals stand on the porch line at 128 px; 2 sentence cards (18 px type, 220 × 72) side by side under the porch line; one animal is left over.

**At 360 px:** stacked — task → pen as a row of up to 4 animals at 72 px (5th+ on a second row) → landscape as a horizontally laid strip of 3 places at 96 px; 4–5 places become 2 rows (3 + 2) at 88 px, porches 88 × 72, residents at 64 px → Check. Adapt: animals 2 + 1 rows at 96 px, cards full width below. At 320: places 84 px, residents 64 px (fanned 2 per row).

**Library pictures** (activity labels; animals from the bank's `ANIMALS` + the K sort banks, filtered to labelled pictures; nothing from `EXCLUDED`):
- Places: `camping/forest`, `camping/lake` (pond), `beach/island` (the sea), `spring/garden` (meadow — a flower meadow scene), `winter/ice` (the arctic — an ice floe on dark water; **BLOCKED until indexed**, §12 — `winter/icicle` is refused: an icicle hangs off a roof, it is not a place where animals live), `miscellaneous/house`, `thanksgivinng/haystack` (the farm), `spring/nest` (the bird's home, Habitats Homes rounds).
- Forest: `forest-creatures/deer`, `forest-creatures/squirrel`, `forest-creatures/woodpecker`, `forest-creatures/badger`.
- Pond: `forest-creatures/frog`, `forest-creatures/dragonfly`, `forest-creatures/beaver`, `animals/swan`.
- Sea: `ocean-life/whale`, `ocean-life/dolphin`, `ocean-life/octopus`, `ocean-life/starfish`, `ocean-life/jellyfish`, `ocean-life/crab`, `ocean-life/clownfish`, `ocean-life/shark`.
- Meadow: `forest-creatures/butterfly`, `forest-creatures/bee`, `forest-creatures/grasshopper`, `forest-creatures/ladybug`.
- Arctic: `winter/walrus`, `zoo-animals/seal` (the white pup — the bank's arctic seal), `ocean-life/narwhal`. All three ALSO live in the ocean (bank `lives`), so they never stand on a page that shows the sea place: until `winter/ice` is indexed they appear only as SEA animals (true), and once it is indexed the arctic rounds swap the sea place out (§6).
- Stranger extras (savanna animals, strangers only): `zoo-animals/giraffe`, `zoo-animals/zebra`.
- Nest: `spring/robin`, `spring/bird`.
- Pets: `pets/cat`, `pets/dog`, `pets/hamster`, `pets/goldfish`. Farm: `farm-animals/cow`, `farm-animals/pig`, `farm-animals/sheep`, `farm-animals/goat`, `farm-animals/horse`, `farm-animals/hen`, `farm-animals/donkey`. Wild: `forest-creatures/deer`, `forest-creatures/squirrel`, `forest-creatures/hedgehog`, `forest-creatures/badger`, `forest-creatures/fox`, `forest-creatures/woodpecker`.
- Food (what-animals-eat): plant-eaters `farm-animals/cow`, `farm-animals/sheep`, `farm-animals/horse`, `animals/rabbit`, `zoo-animals/elephant`, `zoo-animals/giraffe`, `forest-creatures/deer`; meat-eaters `zoo-animals/lion`, `zoo-animals/tiger`, `ocean-life/shark`, `birds/eagle`. **Refused here though the G1-206 bank lists them:** the fox (an OMNIVORE — foxes eat berries, fruit and insects too, so "meat-eater" is false) and `animals/wolf` (drawn as a husky-like pup; the habitats bank refuses the wolf pictures for the same reason).
- Adapt answers (the bank's `answers`): `animals/camel` (hump — the bank's one-hump camel), `zoo-animals/elephant` (trunk), `birds-2/penguin` (flippers), `winter/walrus` (tusks), `forest-creatures/woodpecker` (beak), `forest-creatures/beaver` (teeth), `birds-2/toucan` (beak — the bank's toucan), `forest-creatures/squirrel` (tail).
- **Refused (bank + here):** rabbit, parrot, ferret in pet/wild (cultural); `forest-creatures/wolf` (reads as a husky), `forest-creatures/bear` (a teddy-like cub), the three spotted cats, `forest-creatures/rabbit` (a hare — never in Homes), heron, stork, `spring/birdhouse` (a human home), `winter/igloo`, every duck picture outside Adapt (all are yellow ducklings read as chicks), penguin in the arctic (it lives at the other pole — never on an arctic page), camel in any habitat (no desert place).

**Task line** (≤ 24 px): Who-lives-with-us "Does it live with people at home, on a farm, or in the wild? Send it there." · Habitats "Where can it find food, water and a home? Send it there." · Stranger "One animal does not live here. Tap it." · Food "Does it eat plants or other animals? Send it to its food." / "What does it eat? Send it to its food." · Adapt "Drop each sentence on the animal it tells about."

## 5. The hand
- **Pick up an animal** from the pen: lifts within 50 ms; while held, the place under the finger gets a soft outline.
- **Let go** over or near a place: the animal hops along a dotted arc to the place's porch (each hop 180 ms, 3–5 hops, 6 px bounce). On arrival the 3 badges pop up (120 ms) and fill one by one in a fixed order (food → water → shelter, 220 ms each, *pling*) for every need the table says this place meets for this animal. All full → the animal settles into a porch slot (a small spark rises). Any badge empty → §7.
- **Who-lives-with-us:** on arrival the place's porch bowl and bucket (house, farm) or the bare forest grass acts: right → the animal steps onto the porch; wrong → the place's two ghost residents fade in beside it.
- **Stranger:** a place already has 4 residents; tap one: its badges appear above it and fill (or not).
- **Food:** drop on a food table: right → the food badge fills and the animal stays at the table; G1-407 rounds: drag the animal to one of three single foods.
- **Adapt:** drag a sentence card onto an animal: right → a ring pulses on the body part the sentence names (hand-set point per picture, from the bank's re-opened answers) and the card docks under the animal.
- **Undo:** any settled animal can be lifted back to the pen until the round succeeds.
- **Free play:** after success every pen animal can be walked anywhere (badges show, nothing counted) until Next.
- Sound (optional): soft hops, badge plings, a hollow tock for an empty badge; TTS reads the task line and, on long-press, the animal's name (5 locales).

## 6. The rounds
**Who-lives-with-us (8 rounds; 6 animals, 2 per place):**
| # | home (pets) | farm | wild |
|---|---|---|---|
| 1 | cat, hamster | cow, hen | deer, squirrel |
| 2 | dog, goldfish | pig, sheep | hedgehog, fox |
| 3 | cat, dog | goat, horse | badger, woodpecker |
| 4 | hamster, goldfish | donkey, cow | squirrel, hedgehog |
| 5 | dog, cat | hen, pig | fox, deer |
| 6 | goldfish, hamster | sheep, goat | woodpecker, badger |
| 7 | cat, goldfish | horse, donkey | deer, hedgehog |
| 8 | dog, hamster | cow, sheep | squirrel, fox |
(pets theme cat/dog are used; the farm-animals cat/dog never appear — no animal is both.)

**Habitats — the one-home rule (critic, from the bank's full `lives` lists).** Many animals truly live in TWO of these places (deer and badger: forest AND meadow; frog: pond, meadow, forest; butterfly, bee, ladybug: meadow AND forest; walrus, seal, narwhal: arctic AND sea). On a page that shows both, two places would fill all three badges — two right answers. So each round shows only places among which every animal on that round has exactly ONE home; deer, badger, frog and butterfly never appear in Habitats (they live in Who-lives-with-us, Stranger and Food instead). Gate-asserted: for every animal, |lives ∩ shown places| = 1.

**Places: 3 (default, K) — meadow · pond · sea, fixed slots left to right; 3 animals per round:**
| # | meadow | pond | sea |
|---|---|---|---|
| 1 | bee | dragonfly | whale |
| 2 | ladybug | swan | octopus |
| 3 | grasshopper | beaver | starfish |
| 4 | bee | swan | crab |
| 5 | ladybug | dragonfly | jellyfish |
| 6 | grasshopper | beaver | dolphin |
| 7 | bee | beaver | clownfish |
| 8 | ladybug | swan | walrus |
(No forest on the page, so the bee and the ladybug have one home here: the meadow. The walrus in round 8 is a sea animal — true; it also lives in the arctic, which is not on the page.)

**Places: 4 (G1) — forest · meadow · pond · sea; 4 animals per round:**
| # | forest | meadow | pond | sea |
|---|---|---|---|---|
| 1 | squirrel | grasshopper | dragonfly | whale |
| 2 | woodpecker | grasshopper | beaver | seal |
| 3 | woodpecker | grasshopper | swan | octopus |
| 4 | squirrel | grasshopper | dragonfly | narwhal |
| 5 | squirrel | grasshopper | beaver | starfish |
| 6 | woodpecker | grasshopper | swan | dolphin |
| 7 | woodpecker | grasshopper | dragonfly | crab |
| 8 | squirrel | grasshopper | beaver | shark |
(With the forest on the page the grasshopper is the only animal whose one home is the meadow — kept honest rather than varied; the pen order is shuffled so it never sits on the same post.) **When `winter/ice` is indexed:** rounds 2, 4, 6, 8 show forest · meadow · pond · **arctic** (the sea place steps out) and their sea animal (seal, narwhal, dolphin→walrus, shark→seal) goes to the arctic. **Homes rounds** (part of Habitats, every 4th round in the pass when the K-383 subset is on): robin or bird → `spring/nest` replaces the meadow place for that round (that round has no meadow animal).

**Need table (the badges; hand-authored from the bank's `lives`, NEAR/FAR):** an animal in a `lives` habitat → food ✓ water ✓ shelter ✓. Outside it, the empty badges are fixed per (animal-group, place): sea animals in forest/meadow/pond → water ✗ (no sea water) + food ✗ (in forest/meadow); pond animals in the sea → water ✗ (salt water, not fresh); forest animals (squirrel, woodpecker) in the meadow → shelter ✗ (no trees); forest animals in the sea/pond → shelter ✗ and food ✗; meadow insects in the forest never arise (they are only on forest-free pages); meadow insects in the pond → food ✗ (no flowers or grass to eat); meadow insects in the sea → food ✗ and shelter ✗; arctic animals in forest/meadow/pond → food ✗ (and shelter ✗ for the walrus and narwhal: no ice, no sea). Every wrong pairing leaves ≥ 1 badge empty (gate-asserted). Which badges stay empty is chosen to be TRUE and kept to the most obvious need (never "all empty" unless all are truly missing).

**Stranger (8 rounds; a place with 3 residents + 1 stranger; the bank's rules: every habitat the stranger lives in is FAR from the place — FAR: forest ↔ sea/arctic/savanna, sea ↔ forest/meadow/savanna, pond ↔ savanna/arctic, meadow ↔ sea/arctic — and ≥ 1 stranger per pass comes from a temperate habitat):**
| # | place | residents | stranger | stranger's slot |
|---|---|---|---|---|
| 1 | sea | whale, crab, octopus | squirrel (forest) | 2 |
| 2 | forest | deer, badger, woodpecker | starfish (sea) | 4 |
| 3 | pond | frog, beaver, dragonfly | giraffe (savanna) | 1 |
| 4 | meadow | bee, butterfly, ladybug | dolphin (sea) | 3 |
| 5 | sea | jellyfish, shark, clownfish | grasshopper (meadow) | 4 |
| 6 | forest | squirrel, deer, woodpecker | octopus (sea) | 1 |
| 7 | meadow | grasshopper, badger, deer | whale (sea) | 3 |
| 8 | pond | swan, frog, beaver | zebra (savanna) | 2 |
(The old pond rows used a walrus and a badger: the walrus also lives in the sea, which is NEAR the pond, and the badger lives at field edges by water — not clean strangers by the bank's rule. Residents are any animal whose `lives` includes the place, so deer, badger and frog are used here.)
Stranger slot 1–4 each twice per pass.

**Food (8 rounds):** rounds 1–6 = plant table vs animal-food table, 4 animals per round (2 + 2):
| # | plant-eaters | meat-eaters |
|---|---|---|
| 1 | cow, giraffe | lion, shark |
| 2 | sheep, elephant | tiger, eagle |
| 3 | horse, deer | lion, eagle |
| 4 | rabbit, cow | tiger, shark |
| 5 | giraffe, sheep | shark, eagle |
| 6 | elephant, horse | lion, tiger |
Rounds 7–8 = G1-407 food (the bank's `NEEDS`; one animal, three single foods, the bank's `neverEats` lists guarantee exactly one right food): 7 · bee → flower (choices: flower, mosquito, grass) · 8 · rabbit → grass (choices: mosquito, grass, flower). In the second pass these two become spider → mosquito (choices: flower, mosquito, leaf) and beaver → leaf (choices: leaf, mosquito, flower); the right food sits in each of the three positions across a pass.

**Adapt (8 rounds; 3 animals, 2 sentences, 1 animal left over; the bank's `adapt` sentences, `answers` only):**
| # | animals | sentences (→ animal) | left over |
|---|---|---|---|
| 1 | camel, elephant, beaver | hump → camel; trunk → elephant | beaver |
| 2 | penguin, walrus, squirrel | flippers → penguin; tusks → walrus | squirrel |
| 3 | woodpecker, toucan, camel | woodpecker beak → woodpecker; toucan beak → toucan | camel |
| 4 | beaver, squirrel, elephant | teeth → beaver; tail → squirrel | elephant |
| 5 | walrus, camel, toucan | tusks → walrus; hump → camel | toucan |
| 6 | elephant, penguin, woodpecker | trunk → elephant; flippers → penguin | woodpecker |
| 7 | squirrel, beaver, walrus | tail → squirrel; teeth → beaver | walrus |
| 8 | toucan, woodpecker, penguin | toucan beak → toucan; woodpecker beak → woodpecker | penguin |
(The two beak sentences are never on one page with the other bird unless both are answers — rounds 3 and 8 carry both, and the bank's sentences name the job — "drills holes in tree trunks" vs "picks fruit far out on thin branches" — so each has exactly one match; the gate asserts `trueOf` exclusivity per page.)

- **Answer position:** the place is fixed per mode (content); the pen order is shuffled so each place's animal stands on each pen post 1–2 times per pass (gate-measured; no post holds the same place's animal > 30 % over 200 passes). Stranger slot and Adapt left-over position balanced as in the tables.
- **Order:** order-only reshuffle per pass (`nextTask`).

## 7. Check, the misses, the success
- **Check with animals still in the pen** → hint, no miss: "Some animals are still waiting. Send each one to a place."
- **Habitats — miss 1:** at the wrong place the badges fill only as far as the table allows; the empty badge(s) shake once with a hollow tock; the animal waits 600 ms, turns (mirror flip), hops back to its post · "It cannot find everything it needs here. Look at the empty badge." **miss 2 (same animal):** before it leaves, its true place gives a small wave (a 4° sway, twice) and its porch outline glows · "Try the place that is waving."
- **Who-lives-with-us — miss 1:** the ghost residents appear beside it (house: cat + dog; farm: cow + hen; wild: deer + squirrel — never the animal itself), it hops back · "Does it live with these animals?" **miss 2:** its right place waves.
- **Stranger — miss 1 (tapped a resident):** its badges appear and all fill — it belongs · "That one has everything it needs here. Which one does not?" **miss 2:** the stranger's empty badge outline appears faintly above it before the tap.
- **Food — miss 1:** the food badge stays empty, the animal turns back · "Does it eat that?" **miss 2:** the right table/food glows.
- **Adapt — miss 1:** the card docks, the animal's picture shows no ring (nothing on it matches), the card slides back · "Look at the animal. Does it have that?" **miss 2:** the right animal's matching body part rings faintly.
- A new move takes the help away until the next Check.
- **Success:** every resident hops in turn, every badge row flashes full; bubble: Habitats "Everyone found food, water and a home!" · Who-lives-with-us "Pets at home, farm animals on the farm, wild animals in the wild." · Stranger "Yes — the {animal} does not live here." (gendered locales: "Yes — this one does not live here.") · Food "Plant-eaters and meat-eaters, each at its own food." · Adapt "Yes — and the {leftover} is the one left over." (gendered: "…and this one is left over", the left-over animal glows).

## 8. Settings
1. **Mode:** with people or wild · habitats · who does not live here · what it eats · how it is built — at rest: house/farm/forest · five habitat places · a full place · food tables · animals + sentence cards.
2. **Places** (Habitats mode): 3 · 4 — at rest: three vs four place pictures.

## 9. Words (EN source)
- title "The Home Finder" · instruction "Send each animal to the place where it lives — its food, water and shelter badges fill only where it finds what it needs."
- prompts (§4); hints and celebrations (§7) — every hint naming a place or an animal is stored whole per locale or avoids the name.
- adaptation sentences: the bank's `adapt` block (already authored and reviewed in the bank's locale files) — never re-translated here.
- aria: ariaBadges "{animal} at the {place}: food {✓|empty}, water {✓|empty}, shelter {✓|empty}" (per locale stored order) · ariaPlace "{place}".
- settings: setMode "Mode" · modePeople "With people or wild" · modeHabitats "Habitats" · modeStranger "Who does not live here?" · modeFood "What it eats" · modeAdapt "How it is built" · setPlaces "Places" · places3 "3" · places4 "4".
- **Locale traps:**
  - **Pet / farm / wild is cultural:** rabbit, parrot, ferret refused; the reviewer rules per locale for hamster and goldfish (pets everywhere) and donkey and goat (farm everywhere). da/no "Husdyr" means farm animals AND (in no) pets — the bank's labels are stored per locale (da "Husdyr" = farm, "Kæledyr" = pets); the stage needs no labels, only the hint and celebration strings.
  - **"Wild" ≠ "dangerous":** de "Wildtiere", fr "animaux sauvages" (also "savage" connotation — the reviewer checks the K register), fi "villieläimet".
  - **Animal names:** from the bank's per-locale `names` and vocab; `rabbit` is a hare in two library pictures (never used); `seal` labels must say seal pup in locales where the white pup is not recognised as a seal; `walrus` vs `seal` look-alike rule from the bank.
  - **"At the {place}":** place prepositions vary (de "im Wald / am Teich / im Meer / auf der Wiese", fi "metsässä / lammella / meressä / niityllä") — every place string is stored with its case/preposition per locale; nothing is assembled.
  - **Food words:** "plant-eaters / meat-eaters" (bank labels: de Pflanzenfresser/Fleischfresser, fr herbivores/carnivores — the reviewer may prefer "mangent des plantes" at K); only in hints/aria.

## 10. Sound off, access, phones
- Sound off: badges filling or staying empty, the walk back, the ghost residents, the waving place — all visual.
- Keyboard: Tab to a pen animal; ← / → choose a place (outline moves); Enter sends it. Stranger: Tab across residents, Enter. Adapt: Tab to a card, Tab to an animal, Enter.
- aria-live per arrival (`ariaBadges`).
- Taps: pen animals 72–104 px; places 84–120 px plus porch; cards ≥ 220 × 72; Check 48 px.
- Pictures: animals 104 px, places 120 px, residents and food pictures 96 px at 704; ≥ 64 px at 360.
- Fold at 360 × 740: header 56 + task 52 + pen 2 × 80 + landscape 2 × 150 + Check 56 = 624 px. At 320 × 640: pen 2 × 76, landscape 2 × 140 → 596 px.

## 11. Distinct from
- **Mother and Baby** (new 233: a magnifier comparing a baby with grown-ups) — offspring, not places.
- **The Life Test** (242, same batch: lamps for what living things do) — the badges here are what a place gives, not what a thing is.
- **The Measuring Stations** (row 32: put the thing on the right station) — a measurement choice; here the place answers with need badges.
- **sorting-hoops / Sorting Chutes** — containers; here the animal walks and the destination reports its needs.

## 12. Build plan
- **Model (core):** `state = { mode, places, round, pen:[{key, group}], porch:{place:[keys]}, misses }`. `send(key, place)` → `{badges:{food,water,shelter}, settled}` from `needTable(key, place)` (TRUE badges from `lives` + the group rules of §6); `tapStranger(i)`; `feed(key, table)`; `dock(sentence, animal)` → right iff `animal ∈ ADAPT[sentence].answers` and exclusive on the page; `nextTask`.
- **Gate ground truth (`verify-home-finder-core.js`, own copy of the bank's `ANIMALS.lives`, NEAR/FAR, `ADAPT`, `NEEDS`, asserted equal to the bank):** every round has exactly one right place per animal; every wrong (animal, place) leaves ≥ 1 badge empty and every right one fills all three; no `EXCLUDED` picture or key; no penguin on an arctic page; no camel in a habitat; every Stranger round has exactly one stranger and ≥ 1 temperate stranger per pass; Adapt sentences exclusive per page; pen-post balance; every picture labelled.
- **Mutations:** a wrong place fills all badges · a right place leaves a badge empty · penguin admitted to the arctic · camel admitted to a habitat · stranger round with two strangers · Adapt sentence true of two animals on one page · pet cat from farm-animals used (ambiguous) · pen order fixed · stranger always slot 1 · walk-back skipped on miss · Check with pen animals succeeds · ghost residents include the walker itself.
- **Pictures to re-open at 64 px:** `beach/island` (reads as "the sea"), `spring/garden` (reads as a meadow), `zoo-animals/seal` (white pup), `zoo-animals/giraffe` (a calf — must still read as a giraffe), `forest-creatures/dragonfly`, `camping/lake`.
- **BLOCKED (partial):** K-383's other homes — hive, web, burrow, anthill, lodge — have no place pictures (the bank refuses drawing them); the arctic place is `winter/ice` (the ice floe — seen on the winter contact sheet; the file exists, it lacks only its activity-index line); desert (camel) and savanna/rainforest have no place art. Honest fallback: K-383 is covered by the nest rounds only; until `winter/ice` is indexed there is no arctic place and the arctic animals stand in the sea (true for all three).

## 13. The four questions
1. **Choose it again?** Hopping animals, plinging badges, a landscape that fills with residents, free walking after each round — yes.
2. **On the board?** "Why can't the whale live in the forest?" — the empty water badge answers; the stranger rounds are G1-406 exactly; the badges teach the needs vocabulary of every K habitat unit.
3. **Parent trust?** A reviewed animal table with look-alikes and cultural cases refused, no scary content, no scores.
4. **The invention:** "Three need badges — food, water, shelter — fill above an animal only where the place gives what it needs, so a wrong home is visibly missing something."

## 14. Critic review (2026-10-17)
Scores before → after: invention 5→5 · fun 5→5 · completeness 4→5 · correctness 2→5 · distinctness 5→5 · reality 3→5
What changed:
- **Two right answers removed from Habitats.** Read against the bank's full `lives` lists, 5 of the 8 old rounds had animals with two homes on the page (deer and badger forest+meadow; frog pond+meadow+forest; butterfly/bee/ladybug meadow+forest; walrus/seal/narwhal arctic+sea). Habitats now shows only place sets where every animal has exactly one home (Places 3 meadow·pond·sea by default, Places 4 forest·meadow·pond·sea), gate-asserted.
- **Stranger rows now obey the bank's FAR rule** (the walrus and badger "strangers" by the pond both had a defensible home there); savanna strangers (giraffe, zebra) added.
- **Food: the fox is an omnivore** — removed as a "meat-eater"; `animals/wolf` reads as a husky pup — removed. Meat-eaters are lion, tiger, shark, eagle. ⚠ The same fox and wolf rows are in the LIVE G1-206 worksheet bank (`data/science/what-animals-eat.json`) — reported to the orchestrator as a content defect to fix at the source.
- **Arctic place:** `winter/icicle` refused (not a habitat); `winter/ice` (an ice floe, file exists) needs an index line — until then no arctic place.
- **Picture floor:** residents were 64–72 px at 704; now 96 (one animal per place in Habitats, a Stranger place enlarged). Adapt pictures aligned to the bank (animals/camel, birds-2/toucan).
- Layout check (2026-10-17): switched to stacked — split stage column is ~370 px at 704.
