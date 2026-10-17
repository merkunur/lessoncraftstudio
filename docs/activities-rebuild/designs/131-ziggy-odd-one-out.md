# Row 131 — The Group Photo (L.1.5.a)

## 0. Identity
- id `ziggy-odd-one-out.category.l-1-5-a` (KEPT) · grade 1 · Common Core L.1.5.a (sort words into categories to gain a sense of the concepts they represent) · strand Language · page title (frozen) "Ziggy's Odd One Out — Which One Doesn't Belong? (Grade 1)" · own files `mini tools/group-photo-core.js`, `group-photo-activity.js`, `group-photo-activity.html`; manifest row stays in `ziggy-odd-one-out-activities.json` (id, slugs en..sv, page_title, page_intro unchanged), `tool` repointed. da/no/fi get new slug/title/intro at build.
- worksheets it covers: **K-043** Which One Is Different? · **G2-348** Recycling Sort: Odd One Out · **G3-397** Word Fields: Words for Go and Look · **G2-319** Logic Grid Puzzles: Three Clues, One Answer · **G2-344** Logic Grid with Yes, No and Either-Or Clues · **G2-345** Read the Logic Grid: True or False.
- what the old activity did: four library pictures, tap the one that doesn't belong. **Kept:** the eight round sets and their categories in all eight shipped locales (animal / food / vehicle / clothing / plant / bird / kitchen object / bug); the localized labels already authored per locale. **Fixed:** "oak" labelled "tree" is a known mismatch (the picture is a tree, but the vocab word is "oak") — the label now comes from the vocab entry the picture really is (tree/oak shows its own label, or is swapped for flowers/tulip in the plant rounds); "butterfly" moves from easter (a painted-egg theme risk) to spring/butterfly; the cup "object" category ("kitchen things") gets a real name. **Gone:** tap-one-and-Check with nothing physical happening.

## 1. The pitch
"Ziggy's camera only takes a sharp group photo when everyone on the bench is the same kind of thing — so you send the one that doesn't belong off the bench, snap, and the photo comes out sharp with the group's name written under it."

## 2. Why a child will want it again (the fun)
- **It is a real camera.** The child presses a big shutter: the screen flashes white, there is a *click-whirr*, and a photo slides out of the camera's slot and develops from grey to colour over a second. A sharp photo gets a caption written on the white border in handwriting-style letters ("ANIMALS") and is pinned on Ziggy's photo wall with a coloured pin.
- **A wrong group comes out funny but kind:** the photo develops cloudy, as if someone moved, and the caption line under it stays empty with a little wobbling pencil — "these aren't one kind yet".
- **The wall fills up** across a pass with sharp group photos — animals, foods, vehicles, glass, "ways to go" — Ziggy's album of kinds. Tapping a pinned photo makes it big again.
- The pictures on the bench can be shuffled around freely before the shot (drag to swap seats) — kids line them up "nicely" for the photo.
- No timer, score, streak or lives.

## 3. The skill and the misconception
- **Skill:** sort by category and name the category (L.1.5.a): find the one that is not the same kind (K-043), by material (G2-348), by meaning field for verbs (G3-397), and reason with yes/no/either-or clues to place each thing with its owner, then read a solved grid (G2-319/344/345 — the "who belongs with what" reasoning the coverage map puts here).
- **Misconception 1 — sorting by look, not kind** (a yellow banana goes with a yellow duck; a round ball with round apples). Pushback: the rounds plant exactly these colour/shape decoys; sending off the "wrong-looking" one gives a cloudy photo, because the camera sorts by kind.
- **Misconception 2 — the category is too wide** ("they're all things"; a bat "flies, so it's a bird"). Pushback: the caption must be ONE kind word; with the bat on the bench of birds, the photo stays cloudy — miss 2 shows which three share a name (birds) and the bat stays blurred.
- **Misconception 3 (word fields) — close words are interchangeable / any verb fits.** Pushback: the word card that is not a way of going (e.g. "stare") clouds the "ways to go" photo.
- **Misconception 4 (logic) — a "no" clue tells you nothing.** Pushback: each X crosses a cell; when a row has only one open cell left, the ✓ in it is the only place left — and placing a ✓ pushes Xs along its row and column by itself (the grid's physics).

## 4. The stage
`layout:'split'` at ≥ 700 px: stage left (480 × 470), bubble column right (200 px; the photo wall lives under the bubble).

**At 704 px:**
- **The camera** (top of stage, 440 × 130): drawn geometry — a wide rounded body (`#2A2A35` with a `#146B5E` band), a big lens circle (90 px, concentric rings), a red shutter button 64 px on its top right, a photo slot along its bottom edge. No face, no character.
- **The viewfinder frame** (under the camera, left, 360 × 250): a cream rectangle with four corner brackets holding a **tiered group-photo bench** — like a class photo: a back row and a front row (two drawn plank bars 340 × 12). Four seats sit 2 + 2, five seats 3 + 2 (back row three). Each seat is a library picture **96 px** with its label under it in 18 px (labels from `image-vocabulary.js`, page locale): 3 × 96 + 2 × 14 = 316 px fits the 340 bench. Word-field rounds show word cards (110 × 56, Nunito 22 px bold) in the same tiers.
- **The step** (right of the viewfinder, outside its brackets, 110 × 250): a small drawn platform at mid-height where the sent-off one stands (picture 96 px); 360 + 10 + 110 = 480, the stage width.
- **The photo** (after a snap): slides down from the camera slot over the viewfinder, a white-bordered card 360 × 260 holding the bench's remaining pictures at **96 px** in their tiers (never shrunk); caption line under them.
- **The photo wall** (bubble column): pinned photo-shaped cards 88 × 68 that carry the caption WORD on a coloured border (a record is drawn geometry — never shrunken pictures); a tap opens the full photo with its 96 px pictures again.
- **Logic-grid mode** replaces the bench with **Ziggy's seat plan**: a 3 × 3 grid of cells 96 × 96 — rows = three library friends (picture **96 px** at each row start), columns = three things (picture **96 px** at each column top): 4 × 96 + 3 × 4 = 396 px wide, fits the 480 stage; a stack of X stones and ✓ stones (drawn); two or three clue cards (≤ 2 lines, 18 px) in the bubble column; the "photo" is taken of the finished seat plan. Puzzles 1–4 use the friends animals/zebra, animals/owl, animals/fox with toys/kite, toys/ball, music/drum; puzzles 5–8 use farm-animals/pig, farm-animals/duck, animals/cat with accessories/hat, accessories/sock, accessories/scarf (a fresh set halfway through the pass).
- **Task line** above; **bubble** right.

**At 360 px** (stacked): camera 330 × 80 with the shutter (56 px) on its top right — the shutter is the topmost control, so it is always above the 360 × 740 and 320 × 640 folds; viewfinder full width 330 × 260: four seats 2 + 2 at **88 px**, five seats 3 + 2 at **80 px** (3 × 80 + 2 × 10 = 260); the step is a strip under the viewfinder (330 × 100, picture 80 px); photo 330 × 260 with pictures 80 px; the wall becomes a horizontal strip of caption cards under the bubble. Logic grid: cells 64 × 64, row/column pictures **64 px** (4 × 64 + 3 × 4 = 268 px; fits 320 too). Nothing on the stage renders a library picture below 64 px.

Pictures (library, colour; theme JSON verified AND seen on the contact sheets by the critic 2026-10-17): animals/dog, cat, pig, fish, duck, owl, zebra, fox, swan; at-the-supermarket/apple, banana, pear, cherry, bread, carrot, can, water, shampoo, juice, bag, jam (never fruits/cherry — drawn as an apple; **grapes do not exist** as a labelled picture); accessories/sock, hat, mitten, scarf; clothing/shoe; vehicles/car, train, boat, helicopter (the VEHICLES theme, not toys/car — a toy car is a toy); toys/ball, kite; flowers/rose, tulip, sunflower, daffodil; desserts-and-sweets/lollipop; birds-2/robin, parrot; things-that-fly/bat; around-the-house/cup, spoon, fork; farm-animals/bee, pig, duck; forest-creatures/ant, ladybug; spring/butterfly; kitchen-tools/glass (the tumbler — never around-the-house/glass, a wine glass), jar, bottle (a glass bottle with a red drink); post-office/envelope, package; tools/bolt, nail; camping/log; music/drum. **Not used:** tree/oak (does not exist), miscellaneous/leaf (a leaf is part of a plant, not a plant), farm-animals/chick beside the duck (twins at small size).

## 5. The hand
- **Tap a seat** → that picture hops off the bench onto the step (240 ms arc, a soft *boing*). Tap the step → it hops back to its seat. Only one can stand on the step; tapping another seat swaps them (the first hops back as the second hops off).
- **Drag** a picture along the bench to swap seats (free play; no effect on the answer).
- **Press the shutter** (= Check; enabled when one picture is on the step): flash (white overlay 0→70 %→0 over 180 ms), *click-whirr*, the photo slides out (500 ms) and develops (800 ms from grey to colour).
- **Logic-grid hand:** drag an X stone onto a cell (or tap a cell once = X, twice = ✓, thrice = empty). Placing a ✓: within 100 ms an X slides into every other open cell of its row and column (200 ms, stone-on-wood clack) — the "only one each" physics. Removing a ✓ lifts only the Xs it pushed. Clue cards can be tapped to dim them when used (the child's own bookkeeping; no effect on grading).
- **Free play:** pinned photos can be enlarged; benches can be rearranged before shooting.

## 6. The rounds
One round = one bench (or one seat plan). Exactly one picture does not share the kind of the others; the others share exactly one kind word that the odd one lacks.

**Level 1 — Odd one out** (4 seats), 8 rounds (the old eight, repaired):

| # | seats | odd one | caption | decoy built in |
|---|---|---|---|---|
| 1 | apple · dog · cat · pig | apple | animals | — |
| 2 | banana · pear · sock · apple | sock | food | — |
| 3 | car · train · boat · tulip | tulip | vehicles | — |
| 4 | fish · hat · sock · shoe | fish | clothes | — |
| 5 | rose · sunflower · car · tulip | car | flowers | — |
| 6 | robin · duck · owl · cup | cup | birds | — |
| 7 | dog · cup · spoon · fork | dog | kitchen things | — |
| 8 | bee · ant · banana · butterfly | banana | bugs | colour (yellow banana with the yellow-black bee) |

**Level 2 — Trickier groups** (5 seats, one odd; every round plants a look-alike decoy), 9 rounds:

| # | seats | odd one | caption | the decoy |
|---|---|---|---|---|
| 1 | robin · owl · duck · parrot · bat | bat | birds | the bat flies and has wings |
| 2 | apple · banana · bread · jam · ball | ball | food | the ball is round like the apple |
| 3 | car · train · boat · helicopter · kite | kite | vehicles | the kite flies like the helicopter |
| 4 | apple · banana · pear · cherry · carrot | carrot | fruit | the carrot is food and brightly coloured |
| 5 | sock · hat · shoe · mitten · bag | bag | clothes | the bag is carried, not worn |
| 6 | cup · spoon · fork · glass · ball | ball | kitchen things | — (plain round, keeps the level honest) |
| 7 | bee · ant · butterfly · ladybug · chick | chick | bugs | the chick is small and yellow like the bee |
| 8 | rose · tulip · sunflower · daffodil · lollipop | lollipop | flowers | the lollipop is a bright round top on a stick, shaped like a flower |
| 9 | owl · duck · robin · swan · butterfly | butterfly | birds | the butterfly has wings |

Drafts the design rejected (kept so the build does not reinvent them): a round with two vegetables (two odd ones), "jam" in a fruit round (jam is not a fruit), "animals with four legs" (a two-part kind), a robin among animals (a robin is an animal too). The gate enforces the rule that made them fail.

**Level 3 — What is it made of?** (G2-348, 4 seats, caption = a material word), 8 rounds:
1 jar · glass · bottle · **can** (glass; can = metal) · 2 water · shampoo · juice · **jar** (plastic; jar = glass) · 3 envelope · package · bag · **can** (paper) · 4 can · bolt · nail · **envelope** (metal) · 5 jar · glass · bottle · **log** (glass; wood has only one clear library picture, so wood is only ever the odd one, never a caption) · 6 envelope · package · bag · **water** (paper) · 7 water · shampoo · juice · **glass** (plastic — and the glass looks like a plastic cup: the real material decoy) · 8 can · bolt · nail · **package** (metal).
Material truth per picture is fixed in data after looking (seen on the contact sheets 2026-10-17: can = tin, water/shampoo/juice = plastic bottles, jar = clear glass jar, glass = clear tumbler, bag = paper shopping bag; checked by the critic: around-the-house/spoon is orange-wooden and kitchen-tools/spoon purple plastic, and both forks have a green plastic handle — so **metal = can, tools/bolt, tools/nail only**; bag = a printed paper shopping bag; package = a cardboard box (paper family, as in every recycling worksheet); bottle = glass with a red drink).

**Level 4 — Word fields** (G3-397, word cards, no pictures; captions "ways to go" / "ways to look"), 8 rounds (en; the odd card always belongs to the OTHER field, so meaning decides, not an unknown word):
1 walk · run · hop · march · **stare** · 2 look · peek · stare · glance · **dash** · 3 stroll · dash · skip · climb · **peek** · 4 glance · watch · peek · look · **jump** · 5 run · jump · walk · stroll · **glance** · 6 stare · watch · glance · peek · **march** · 7 hop · skip · march · dash · **watch** · 8 peek · look · stare · watch · **stroll**.

**Level 5 — Seat plan** (G2-319/344/345), 8 puzzles: three friends × three things, 2–3 clues, exactly one solution. EN puzzles (two friend/thing sets — see the table):

| # | friends × things | clues (EN, exact) | solution | true/false statements (G2-345) |
|---|---|---|---|---|
| 1 | Zebra, Owl, Fox × kite, ball, drum | "Zebra has the kite." · "Owl does not have the drum." | Z-kite, O-ball, F-drum | "Owl has the ball." ✓ · "Fox has the kite." ✗ |
| 2 | same | "Fox does not have the ball." · "Owl has the kite." | F-drum, O-kite, Z-ball | "Zebra has the drum." ✗ · "Owl has the kite." ✓ |
| 3 | same | "Owl has either the ball or the drum." · "Zebra has the drum." | Z-drum, O-ball, F-kite | "Fox has the kite." ✓ · "Zebra has the ball." ✗ |
| 4 | same | "Zebra does not have the ball." · "Owl does not have the ball." · "Owl does not have the kite." | F-ball, O-drum, Z-kite | "Owl has the kite." ✗ · "Zebra has the kite." ✓ |
| 5 | Pig, Duck, Cat × hat, sock, scarf | "Cat has either the hat or the sock." · "Duck has the hat." | D-hat, C-sock, P-scarf | "Pig has the scarf." ✓ · "Duck has the sock." ✗ |
| 6 | same | "Pig has either the sock or the hat." · "Cat has the sock." | C-sock, P-hat, D-scarf | "Duck has the hat." ✗ · "Cat has the sock." ✓ |
| 7 | same | "Duck does not have the scarf." · "Duck does not have the sock." · "Pig does not have the scarf." | D-hat, P-sock, C-scarf | "Cat has the scarf." ✓ · "Pig has the hat." ✗ |
| 8 | same | "Cat has either the scarf or the hat." · "Pig has either the scarf or the hat." · "Cat does not have the hat." | D-sock, C-scarf, P-hat | "Pig has the sock." ✗ · "Duck has the sock." ✓ |

Every puzzle has exactly one solution (checked by hand by the critic and re-proved by the gate's solver), and removing any one clue leaves ≥ 2 solutions (no clue is decoration). Statements: 8 true / 8 false per pass, and the true one alternates first/second, so neither "always true" nor "first true" beats 50 %. Each statement has two lamps (✓ true / ✗ false).

**Answer position / guessability.** Level 1–4: the odd one's seat is balanced (Level 1: each of 4 seats twice; Level 2: 5 seats, no seat > 2 times in 9; Level 3/4 the same rule) and re-shuffled per render with the balance kept per pass; the gate also measures "the picture that looks different by colour" bot ≤ chance by building the colour decoys into the rounds. Level 5: true/false answers balanced 8/8 per pass; puzzles verified unique by the gate's own solver.
**Order:** order-only reshuffle per pass.

## 7. Check, the misses, the success
- **Shutter with nobody on the step:** hint, no miss — the step glows: "Send the one that doesn't belong to the step first."
- **Miss 1** — the photo develops cloudy (all four pictures soft-blurred 3 px), caption line empty with a wobbling pencil; the photo stays on screen. Hint: "The camera can't find one name for this group. Who doesn't belong?"
- **Miss 2** — the photo develops again: the pictures that DO share a kind come out sharp and the camera writes their kind word on the caption line in pencil-grey; the one that breaks it stays blurred on the bench in the photo. Hint: "These are all {kind}. Which one is not a {kind}?" (kind word and its singular from data, page locale).
- **A new move takes the help away** (photo slides back into the camera) until the next snap.
- **Success:** the photo develops sharp, the caption writes itself in coral ("ANIMALS"), the photo pins to the wall with a pin-pop; the sent-off picture on the step waves its frame once (a 6° tilt, no face). Bubble: "{a}, {b} and {c} are all {kind}. {odd} is not." (list with the locale's own list rule.) Materials: "{a}, {b} and {c} are made of {material}." Word fields: "{a}, {b}, {c} and {d} are ways to {go/look}."
- **Logic grid:** Check with an incomplete plan → hint "Every friend needs one thing." Miss 1 → every cell that contradicts a clue shakes and its clue card lights. Miss 2 → the row with only one open cell left glows ("only one place left"). Success → the photo of the seat plan pins up; bubble reads the solution: "Zebra has the kite, Owl has the ball, Fox has the drum." Then the two true/false statements; a wrong lamp makes that cell of the photo pulse.

## 8. Settings
1. **Seats:** 4 (default) · 5. Visible at rest: the bench holds four or five pictures (Levels 1–4).
2. **Captions:** show the kind word on the photo (default) · let me name it — after a sharp photo, three kind words appear as tags and the child drops one on the caption line (the naming half of L.1.5.a; a wrong tag slides off the border).
(The shell level picker: Odd one out / Trickier groups / Made of… / Word fields / Seat plan.)

## 9. Words (EN source)
- title: "Ziggy's Odd One Out".
- instruction: "Send the one that doesn't belong to the step. Then take the photo."
- task lines: L1/L2 "Who doesn't belong in the group photo?" (the old prompt "Tap the one that doesn't belong!" is the aria of the seats) · L3 "Which one is made of something else?" · L4 "Which word doesn't belong with the others?" · L5 "Read the clues. Give every friend one thing."
- kind words (captions): animals · food · vehicles · clothes · flowers · birds · kitchen things · bugs (en; "insects" word in the other locales) · fruit · glass · plastic · paper · metal · ways to go · ways to look.
- hints/celebrations: §7. Labels: "Take the photo", settings names, "only one place left".
- aria: "Seat {n}: {label}", "{label} is on the step", "Photo: sharp, {kind}", "Photo: cloudy", "Row {friend}, column {thing}: X / ✓ / empty".

**Locale traps:**
- **Kind words are plurals or mass nouns, chosen per locale by the native reviewer** (de Tiere, Essen, Fahrzeuge, Kleidung, Pflanzen, Vögel, Küchensachen, Insekten — note "bugs" ≠ Käfer; fr animaux, aliments, véhicules, vêtements, plantes, oiseaux, ustensiles de cuisine, insectes; fi nominative plurals or mass nouns: eläimet, ruoka, kulkuneuvot, vaatteet, kasvit, linnut, keittiötavarat, hyönteiset). The caption grammar is one bare word, never a sentence, so no agreement problems on the photo.
- **"Vehicles" must hold the boat and the helicopter in every locale** (critic): many locales' everyday "vehicle" word means road vehicles only (de Fahrzeuge, sv fordon, da køretøjer, no kjøretøy, nl voertuigen), so a child could rightly say the boat is the odd one. The kind word is the means-of-transport word: de Verkehrsmittel · fr moyens de transport · es medios de transporte · pt meios de transporte · it mezzi di trasporto · nl vervoermiddelen · sv transportmedel · da transportmidler · no transportmidler · fi kulkuneuvot · en vehicles.
- **"Bugs" is not one category everywhere** — the bee/ant/butterfly/ladybug group is "insects" in most locales (de Insekten, sv insekter, fi hyönteiset); a spider is never in that round (not an insect).
- **"Food" vs "fruit"**: the Level 2 fruit round's caption is the locale's fruit word, and the carrot must be a vegetable in that culinary tradition (it is in all 11).
- **Materials**: "plastic" etc. are taught in every locale's Sachunterricht/science (de Kunststoff vs Plastik — the reviewer picks the school word; sv plast; fi muovi).
- **Word fields (Level 4) are rebuilt per locale, never translated**: de gehen/laufen/rennen/schlendern/hüpfen vs schauen/gucken/starren/blinzeln; fr marcher/courir/sautiller/flâner vs regarder/fixer/jeter un coup d'œil (multi-word fine on a card); es caminar/correr/pasear vs mirar/observar/echar un vistazo; fi kävellä/juosta/hypätä/kipittää vs katsoa/tuijottaa/vilkaista. Each field ≥ 6 words a grade 1–3 child knows; the native reviewer confirms every card belongs to exactly one field.
- **Logic clues — the either-or wording is SETTLED (critic):** every friend holds exactly one thing, so an "or" clue is exclusive by the rules of the plan; the clue still uses each locale's either-or pair because that clue type is what G2-344 teaches. Pattern (the build authors every clue whole, with the case each verb needs): en "Owl has either the ball or the drum." · de "Die Eule hat entweder den Ball oder die Trommel." · fr "Le hibou a soit le ballon, soit le tambour." · es "El búho tiene o la pelota o el tambor." · pt "A coruja tem ou a bola ou o tambor." · it "Il gufo ha o la palla o il tamburo." · nl "De uil heeft óf de bal óf de trommel." · sv "Ugglan har antingen bollen eller trumman." · da "Uglen har enten bolden eller trommen." · no "Ugla har enten ballen eller trommen." · fi "Pöllöllä on joko pallo tai rumpu." (adessive owner + nominative thing, authored per friend). "Not" clues use the locale's plain negation with the case it needs, authored whole: de "Die Eule hat keine Trommel." · fr "Le hibou n'a pas le tambour." · fi "Pöllöllä ei ole rumpua." (partitive after the negative). Animal names in clues use the vocab label with the article the language needs ("Der Fuchs hat …", "Le renard a …"); no gendered pronouns in clues (always the name).
- **Lists in the celebration** follow the locale's list rule (no comma before und/et/och…; en serial comma — consistent with row 129).

## 10. Sound off, access, phones
- Silent legibility: bench → step → photo sharp/cloudy → caption. The shutter sound is decoration.
- Keyboard: arrows move between seats, Enter sends to/returns from the step, S or Enter on the shutter snaps; grid: arrows move cells, X/V/Delete keys place stones.
- aria-live announces the photo result and caption.
- Taps ≥ 44 px (seats 64–96 px, step 110, shutter 56–64, grid cells 56–72).
- Pictures 96 px at 704, 64 px at 360.
- Phone: step under the bench; the wall becomes a strip.

## 11. Distinct from
- **Sorting Hoops (premium tool)** — two overlapping hoops with a hidden attribute rule; here the child finds the single outsider and the kind word names the group (L.1.5.a categories, not attribute Venn).
- **WODB (premium tool)** — every answer defensible; here exactly one answer, and the photo shows why.
- **Row 35 Sorting Chutes / Olive's Kind-Of Tree (row 132)** — placing things INTO groups; here the group is given and one must leave it.
- **New 225 The Sorting Cabinet** — matrix reasoning with drawers; the seat plan is a yes/no clue grid whose ✓ pushes Xs, a different mechanic and skill.
- Not a reused invention: no registered design uses a camera that sharpens only a same-kind group.

## 12. Build plan
- **Data:** `group-photo-rounds.json` per locale: `kinds` (id → caption word, singular), `pictures` (noun → kinds[] and material), `rounds:[{id, level, seats:[noun|word], odd}]`, `fields` (word → field), `puzzles:[{rows, cols, clues:[{type:'has'|'not'|'or', a, b, c?}], statements:[{text, truth}]}]`.
- **Core state** `{level, round, seats, step:null|i, photo:null|{sharp, kind, blurred:[i]}, grid:[[0|'x'|'v']], pushed:Map, misses}`; functions `send(i)`, `back()`, `snap()` → `{sharp, kind, sharedBy:[i], odd:i}`, `place(r,c,stone)`, `checkPlan()`, `solve(puzzle)`.
- **Gate's own ground truth** (`verify-group-photo-core.js`): the gate owns a category table (noun → kinds) and recomputes, for every round, that exactly one seat is outside the largest kind shared by all others and that this kind is shared by ALL the others (no round with two odd ones; no round where the odd one shares the kind); materials table; field table; its own brute-force solver proves each puzzle has exactly one solution and that each clue is needed or the puzzle is still unique (≤ 1 redundant clue); seat balance per pass; true/false balance 8/8; "colour decoy" bot ≤ 1/4.
- **Mutations:** snap sharp with the odd one on the bench · caption from the odd one's kind · two odd ones allowed in data · ✓ does not push Xs · removing ✓ lifts the child's own Xs too · or-clue read inclusively · solver accepts two solutions · seat of the odd one always 0 · word-field card counted in both fields · material of the glass set to plastic.
- **Pictures to verify on contact sheets:** animals, fruits, at-the-supermarket (seen: can = tin, water/juice/shampoo plastic bottles, bag = paper bag), kitchen-tools (seen: jar clear glass, glass clear tumbler, bottle red glass-like bottle — the bottle's material reads ambiguous, so it is only used where glass is the caption and is swapped out if the reviewer calls it plastic), accessories, clothing, toys (seen), flowers, miscellaneous/leaf, birds-2/robin, things-that-fly/bat, helicopter, around-the-house (spoon/fork — check they read as metal), farm-animals, forest-creatures/ant, spring/butterfly, post-office, camping/log, music/drum, vegetables.
- **Risks:** "ladybug" is in forest-creatures and things-that-fly — use one source; the bee in farm-animals vs forest-creatures must be the same picture across rounds (identical instance rule is per round only, but consistency helps). The seat-plan mode is a second apparatus inside one activity — it shares the photo/wall and the step-free grammar of "one place each", and must still pass the hierarchy audit at 704 (grid 216 px + headers fill ≥ the floor).
- **Blocked:** none. Wood appears only as an odd one (one clear picture: camping/log); a wood caption is a recorded gap until a second wooden picture is verified.

## 13. The four questions
1. **Would a 5–8-year-old choose it again?** Yes — a shutter, a flash, a photo that develops, and a wall of their own sharp photos is a little camera toy.
2. **Would a teacher put it on the board?** Yes — the cloudy photo says "not one kind" and the caption names the category, which is what L.1.5.a asks; the decoys are the exact sorting-by-look errors teachers see, and the materials, word-field and logic worksheets live in the same instrument.
3. **Would a parent trust it?** Yes — library pictures, no scores, warm wording, nothing scary in a "wrong" photo.
4. **The invention:** the camera only takes a sharp photo of a group that is all one kind — send the outsider to the step and the photo names the group.

## 14. Critic review (2026-10-17)
Scores before → after: invention 5→5 · fun 5→5 · completeness 4→5 · correctness 3→5 · distinctness 5→5 · reality 2→5
What changed:
- Removed pictures that do not exist or lie: grapes (unlabelled, three rounds), tree/oak (does not exist, two rounds), fruits/cherry (an apple), the spoon and forks in the metal rounds (wooden/plastic-looking — metal is now can, bolt, nail), toys/car-train-boat in vehicle rounds (a toy car is a toy; now the vehicles theme).
- Fixed two rounds with a wrong group: "plants" with a leaf in it (a leaf is part of a plant) is now "flowers"; Level 2 round 1 put the chick beside the duck (near-identical at small size) — the parrot replaces it; the flower round's weak kite decoy is now a lollipop (a round top on a stick).
- Rebuilt the stage so no picture is ever under 96 px at 704 / 64 px at 360: a tiered class-photo bench (2 + 2 / 3 + 2) with the step beside it, the shutter on top of the camera (always above the fold), the photo keeps 96 px pictures, the wall pins caption cards (drawn), the seat-plan grid is 96 / 64 px.
- Seat plan: all eight puzzles written out as a table with solutions (re-checked unique by hand) and the 16 true/false statements (8/8, alternating), a second friend/thing set for puzzles 5–8, and the either-or wording settled in all 11 locales.
