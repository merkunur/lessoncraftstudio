# G1-398 `habitats`: PEDAGOGY + CONTENT (nt5-F / b6, 2026-09-23)

Measured this session (read-only): `cache/manifest.json` themes join; `lib/b2-common.js entriesFor(theme, loc)` for every noun below ×11 (all 11 singulars present unless marked); `lib/b3-picture-index.js hasPicture` (`polar_bear` = **false** in every theme, no vocab key; `walrus`, `sloth` = true); `i18n/strings.<loc>.json` G1-202 + G2-318 titles; `frontend/config/topics-taxonomy.json` (`apps.habitats` + `axes['exercise-type'].habitats` ALREADY present, **en only**: slug `habitats`, name "Animal Habitats", subject `science`, age `6-8`); `_records/v2/harvest-candidates.<loc>.json` (de/en/es/fr/it/pt re-probe). **Every picture named in §A-§D was OPENED** on 7 labelled contact sheets built from `cache/themes/<theme>/<noun>@3x.webp` (scratch `G1-398/s1..s7.png`); what a 6-year-old would say is recorded per picture.

---

## Boundary (load-bearing)

G1-202 `where-animals-live` (`types/g1/G1-202-land-water-air.js`, science-sort, bins **Land / Water / Air**, instruction "Draw a line from each animal to where it lives", eagle/parrot/bee filed under "air") owns the element sort and the question-title in all 11 locales ("Where Do Animals Live?", "Wo leben die Tiere?", "¿Dónde viven los animales?", "Onde os Animais Vivem?", "Où vivent les animaux ?", "Dove vivono gli animali?", "Waar wonen de dieren?", "Var bor djuren?", "Hvor bor dyrene?" ×2, "Missä eläimet elävät?"): no face here sorts into land/water/air, draws a line from an animal to a word-labelled place, or carries those title strings. G2-318 `animal-fact-file` (+G2-339..343) owns the ONE-animal card with a `habitat` field (land/water/air, `data/b3/animal-facts.json`, 54 animals), G2-342 compare two animals, and **G2-343 who-am-i riddles** (first-person clue cards → a picture bank): no face here fills a fact card, compares two animals field by field, or writes first-person riddles. K-204 pets/wild, K-209 farm/wild, `what-animals-eat.json` (plant/meat sort), K-201 living, the animal-life-cycles family G1-377 (+faces) and plants G1-376 (F1 "what plants need": two pots, circle the one with light AND water) are neighbours: no pet/farm animal, no diet sort, no life stage, no plant needs. **This type therefore owns three things nobody has:** (1) ECOLOGICAL places as drawn habitat tiles (ocean, forest, pond/lake, meadow, polar ice, savanna, rainforest, and each locale's native set) matched to the animals that live there; (2) animal HOMES built or used by the animal (nest, hive, web, burrow, anthill, lodge, cave), as drawn primitives; (3) ADAPTATION: a body feature and the place it helps in. Its own bank `data/b6/habitats.js` stores an ecological habitat per animal and never reads the land/water/air field.

---

## A. Identity

| loc | genre head (rail / base; from the SEO panels + v2 re-probe) | school year (G1 base) | national strand (framework NAME; `strand-names.ts` `Science` row) | CCSS (en only, honest) |
|---|---|---|---|---|
| en | Animal Habitats (base "Animal Habitats: Match the Animal"; "animal homes" separate K head, 24 strings) | grade 1 | Science (NGSS in prose: K-ESS3-1 base/F5, 2-LS4-1 base/F3, 3-LS4-3 F4 readiness) | **NONE** (science; no `educationalAlignment`; `teaches` = "Animal habitats (science readiness)") |
| de | Lebensräume der Tiere (faces carry "Lebensraum Wald / Wiese / Teich": v2 measured `lebensraum wald arbeitsblatt`, `lebensraum wiese klasse 1/2/3`, `lebensraum teich grundschule`; `tierwohnungen namen`, `tierbauten`) | 1. Klasse | Sachunterricht (Lehrplan) | n/a |
| es | El hábitat de los animales (MX "hábitat"; v2: `adaptación de los animales grado segundo`, `animales segun su habitat primer grado`) | primer grado | row reads "Conocimiento del Medio" (a SPAIN term) ⚠ MX panel must rule a NEM literal ("Saberes y pensamiento científico"); SEP/NEM | n/a |
| pt | Habitat dos animais (+ "moradia dos animais" ×12 = F2; v2: `onde vivem os animais 2 ano fundamental`, `adaptação dos animais`) | 1º ano | Ciências (BNCC; EF02CI04 / EF03CI04 panel-verified, never in metadata) | n/a |
| fr | Les milieux de vie des animaux (v2: `milieux de vie des animaux cp`, `adaptation des animaux à leur milieu`) | CP | Questionner le monde (programmes officiels) | n/a |
| it | Gli ambienti degli animali (base cannot be "Dove vivono gli animali?" = G1-202 it) | classe prima | Scienze (Indicazioni nazionali) | n/a |
| nl | Dieren en hun leefgebied (provisional; nl dead as seeded, re-probe) | groep 3 | Oriëntatie op jezelf en de wereld (SLO kerndoelen) | n/a |
| sv | Djurens livsmiljöer (NOT "Var bor djuren?" = G1-202 sv; the Nordic panel's rail conflicts with the LOCK) | åk 1 | Naturorienterande ämnen (Lgr22) | n/a |
| da | Dyrs levesteder (NOT "Hvor bor dyrene?" = G1-202 da) | 1. klasse | Natur/teknologi (Fælles Mål) | n/a |
| no | Dyrenes leveområder (NOT "Hvor bor dyrene?" = G1-202 no) | 2. trinn | Naturfag (LK20) | n/a |
| fi | Missä eläimet asuvat (legal: G1-202 fi is "elävät"; never "eläinten kodit" alone = homeless-animal SERP) | 1. luokka | Ympäristöoppi (OPS 2014) | n/a |

**Theme axis: THEMELESS** (`themeAxis.applicable:false`, landings `coordinate.theme:''`). Animals come from `lib/b3-picture-index.js` by vocabKey (it throws on a missing picture; `polar_bear` is unreachable, correctly) using the EXACT picture paths of the claim table (§D), never a random theme pick. `unitAxis`: none (the habitat set is per-locale DATA, not a fan). Theme slugs `animals` / `ocean_life` / `forest_creatures` / `zoo_animals` / `insects_and_bugs` / `winter` / `spring` are never a bare title word.

**The one rule that locks the type:** every animal on a page is scored against a hand-read ANIMAL→HABITAT claim table (`lives:[…]`, the full list of habitats it truly lives in, not the favourite one), and a page is legal only if **each animal's `lives` intersects the page's tile set in EXACTLY ONE tile** (Arctic and Antarctic are two different habitats even when one "polar" tile is drawn). Two right answers are therefore impossible by construction, never by curation.

---

## B. The six faces

Page facts used below: body 722, lane 639, G1 floors min element 44 / answer letter 26 / 6-12 items; K floors 56 / 30 / 4-8; G2 36 / 22 / 8-16. All px heights *est.* until the design role measures.

### Base: Animal Habitats, match the animal (G1, G1-398, base config)
**Move:** CLASSIFY by ecological place: read four drawn habitat tiles (each lettered A-D with its native name), then write the tile LETTER under each of 8 animal pictures.
**Child:** "Look at the four habitats. Write the letter of the right habitat under each animal." (84 chars)
**Params:** d1 `{tiles:3, animals:6, perTile:[1,3]}` · **d2 `{tiles:4, animals:8, perTile:[1,3], answerBox:'letter'}` (ships)** · d3 `{tiles:4, animals:10, perTile:[1,4]}`. Tile set = the locale's `SETS[loc]` (§C); when a set has >4 tiles, rng picks 4 subject to the co-occurrence rules (§D rule 5-8). Guard keys on `tiles`/`animals`, never on the level.
**verify():** each animal card stamps `data-lcs-animal=<key>`, `data-lcs-answer=<tile letter>`; each tile `data-lcs-tile=<habitat key>` `data-lcs-letter=A..D`. Re-derive: `lives(animal) ∩ pageTiles` has exactly one element and its letter === `data-lcs-answer`; every tile holds ≥1 animal; per-tile count vector not all equal (so "two each" is not a solving rule); answer-letter sequence in reading order is not constant, not strictly alternating, not sorted (measured on the SHIPPED seed: the seed carries no locale, so a tell ships to all 11 at once); no animal name printed in the body; boxes empty.
**Refusals:** none. Every locale set reaches 4 tiles × ≥3 pool animals (§C table measured). Per-page polar/pond limits are co-occurrence rules, not refusals.
**Query face:** the bare head + "match" (en "animal habitats matching", de "Tiere Lebensraum zuordnen", es "une cada animal con su hábitat", it "chi vive dove").

### F2: Animal Homes (K, K-3xx TBD by the emitter, CODE `layout:'homes'`)
**Move:** PAIR an animal with the home it builds or uses (a home is not a habitat): 6 library animals left, 6 DRAWN homes right (`primitives/animal-home.js`, all homes drawn incl. the nest), draw a line.
**Child:** "Draw a line from each animal to its home." (41 chars)
**Params:** d1 `{layout:'homes', pairs:4}` · **d2 `{layout:'homes', pairs:6}` (ships)** · d3 `{layout:'homes', pairs:6, labels:true}` (home word under each home; NOT shipped: the es/pt/it lodge word collides with the burrow word, see §C). Pair pool (claim table §D-3): bird↔nest, bee↔hive, spider↔web, rabbit↔burrow, ant↔anthill, beaver↔lodge, bear↔cave, woodpecker↔tree hole (8; d2 draws 6). Conflict rules: woodpecker never with bird or squirrel (a tree hole IS a nest; squirrels use tree holes); squirrel never on this face (drey ≈ nest).
**verify():** left items `data-lcs-animal`, right `data-lcs-home`; bijection from `HOMES`; right-column order ≠ left order, ≠ reversed, no pair on the same row more than once per page (row tell); every home drawn by the primitive (no `<image>` in the right column).
**Refusals:** none (no word on the page). Home words matter only for titles/landings.
**Query face:** "animal homes" (en 24 strings), de "Tierwohnungen", es "la casa de los animales", pt "moradia dos animais", fr "la maison des animaux: le nid, le terrier", it "la tana degli animali", nl "dierenwoningen", sv "djurens bon", da "dyrenes boliger", no "dyrenes hjem", fi "eläinten pesät".

### F3: Who Does Not Live Here? (G1, G1-4xx TBD, CODE `layout:'odd'`)
**Move:** EXCLUDE: each row = one habitat tile + 4 animals; 3 truly live there, 1 stranger comes from a FAR habitat (the `far` matrix, §D rule 9); the child crosses out the stranger.
**Child:** "In each row, cross out the animal that does not live in that habitat." (69 chars)
**Params:** d1 `{layout:'odd', rows:3, perRow:3}` · **d2 `{layout:'odd', rows:4, perRow:4}` (ships)** · d3 `{layout:'odd', rows:5, perRow:5}`. Rows = 4 different tiles of the locale set.
**verify():** row `data-lcs-tile=<key>`, cards `data-lcs-animal` + `data-lcs-odd="1|0"`; for each row exactly one card with `tile ∉ lives(animal)`, the other three `lives(animal) === [tile]` exactly (single-habitat members only, per locale); stranger `lives` ∩ `far[tile]` ≠ ∅ and stranger ∉ `multi` list; stranger column index over the page takes ≥3 distinct values and is not monotone.
**Refusals:** none. A polar row uses ARCTIC members only (walrus, white seal pup, narwhal: 3); a penguin never appears in an Arctic row, as member or as stranger (true, but it would print a "polar" tile with a penguin crossed out, and the pole is not written on the tile).
**Query face:** "habitat odd one out" / de "Welches Tier lebt nicht im Wald?" / es "el animal que no vive aquí" / fr "l'intrus du milieu" / it "l'intruso".

### F4: How Animals Adapt (G2, G2-3xx TBD, CODE `layout:'adapt'`)
**Move:** MATCH a body feature to its animal: 5 animals pictured and lettered A-E at the top; 5 feature sentences (whole panel literals, each naming the feature AND the place it helps in), each with an empty letter box.
**Child:** "Read each sentence about a body part that helps an animal live in its habitat. Write the letter of that animal." (111 chars)
**Params:** d1 `{layout:'adapt', items:4}` · **d2 `{layout:'adapt', items:5, textPx:17, maxLines:3}` (ships)** · d3 `{layout:'adapt', items:6, decoy:1}` (one extra animal with no sentence).
**verify():** sentence rows `data-lcs-adapt=<claim key>` + `data-lcs-answer=<letter>`; for each on-page sentence exactly ONE on-page animal ∈ `ADAPT[claim].trueOf` (the claim's full truth list, §D-4) and its letter === answer; bijection at d2; sentence text === `adapt[loc][claim]`; no sentence contains any on-page animal's name (`names[loc]`, `(?<!\p{L})…(?!\p{L})`, NFC-lowercase); row order ≠ picture order, ≠ reversed.
**Refusals:** none expected (sentences are literals). A locale that cannot write a claim without naming the animal drops that claim (data).
**Query face:** "animal adaptations" (en 50+ v2 strings incl. "animal adaptations worksheets grade 2/3"), de "Angepasst an den Lebensraum", es "adaptación de los animales" (v2 "grado segundo"), pt "adaptação dos animais", fr "l'adaptation des animaux à leur milieu", it "l'adattamento degli animali all'ambiente".

### F5: What Animals Need from Their Habitat (G1, G1-4xx TBD, CODE `layout:'needs'`)
**Move:** JUDGE a conjunction for ONE specific animal: each row = an animal + 4 chips (its food, water, its home, and ONE distractor that is ANOTHER row's food or home that this animal never eats/uses); circle the three needs. Not "circle what animals need among toys" (the plants file rejected common-sense-solvable chips: `G1-376-plants.md` Rejected non-moves); here the decision is food-vs-wrong-food or home-vs-wrong-home.
**Child:** "Circle the three things each animal needs from its habitat: its food, water and its home." (89 chars)
**Params:** d1 `{layout:'needs', rows:3, chips:4}` · **d2 `{layout:'needs', rows:4, chips:4, mix:{wrongFood:2, wrongHome:2}}` (ships)** · d3 `{layout:'needs', rows:5, chips:5, mix:{wrongFood:2, wrongHome:2, both:1}}` (5 chips, 2 distractors).
**verify():** chip `data-lcs-need="food|water|home|none"` + `data-lcs-item=<key>`; per row: food ∈ `NEEDS[a].eats`, home === `NEEDS[a].home`, distractor ∈ `NEEDS[a].neverEats ∪ neverHome` AND is some other row's food/home on the page (so it is never a random object); row multiset of distractor kinds === `d.mix`; chip position of the distractor takes ≥3 values over the page; water chip identical in every row (one picture), its position varies.
**Refusals:** none (no words on the body).
**Query face:** "animal needs: food, water, shelter" / de "Was brauchen Tiere zum Leben?" / es "¿qué necesitan los animales?" / pt "do que os animais precisam" / fr "les besoins des animaux" / fi "mitä eläimet tarvitsevat".

### F6: My Habitat Report (G2, G2-3xx TBD, CODE `layout:'report'`)
**Move:** RECORD (open): one printed habitat tile + its name; a draw box; 3 writing rows "animals that live here", 1 row "a plant that grows here"; two chip pairs to circle (hot | cold, wet | dry).
**Child:** "Draw the habitat. Write three animals and one plant that live there. Circle the words that fit it." (98 chars)
**Params:** d1 `{layout:'report', animalRows:2, chipPairs:1}` · **d2 `{layout:'report', animalRows:3, plantRows:1, chipPairs:2, tile:SETS[loc][0]}` (ships; the locale's first/home habitat: forest / Wald / skog / bosque / Floresta Amazônica)** · d3 `{layout:'report', animalRows:3, plantRows:2, chipPairs:2, whyRows:2}` ("Why can the animals live here?").
**verify():** open-ended: no answer verify; layout lints + floors only; the printed tile is a `SETS[loc]` key; no example animal printed on the page (the page must not answer itself).
**Refusals:** none.
**Query face:** "habitat project / report" (en), fr "fiche milieu de vie", es "mi reporte del hábitat", de "Forscherblatt Lebensraum" (NOT "Steckbrief": G2-318 de is "Tiersteckbrief").

**Rejected non-moves.** land/water/air sort (G1-202) · a sort into 2-3 named habitat bins (base re-labelled as science-sort; G1-202 look) · a habitat fact card (G2-318) · riddle cards (G2-343) · "label the habitat picture" (picture vocabulary over the drawn tiles; RESERVE if a locale refuses F3) · Nordic "where do animals live in winter" (sv/da/no measured "på vintern / om vinteren"; true data thin: bear/ide, hedgehog, frog under mud, birds migrate, none drawn; RESERVE #2, needs a hibernation claim table) · desert anything (no pool: camel + meerkat only, no cactus picture) · relabelling the base's d1/d3 (fails `gate-variation-distinct`).

---

## C. Native rebuild ×11

**Per-locale habitat SETS (tile keys; the panel writes the tile label literal). Pool = animals in the claim table that pass the page rules for that set, measured by hand over §D-2 (picOpened all).**

| loc | tiles (base picks 4) | pool per tile (measured; "w/ sea" = when a sea/ocean tile shares the page) |
|---|---|---|
| en · fr · it · nl (generic) | forest · pond · meadow · ocean · polar · savanna · rainforest (7; panel may drop meadow/pond to its native frame) | forest 7 · pond 6 (3 w/ sea) · meadow 4 · ocean 9 · polar 3 (1 w/ sea: penguin OR walrus) · savanna 6 · rainforest 8 (5 distinct-looking; max 1 ape) |
| de | Wald · Wiese · Teich · Meer (exactly 4, native) | Wald 7 · Wiese 4 · Teich 3 (sea present) · Meer 10 (+ grey seal: no polar tile) |
| sv / da / no / fi | skog/skov/skog/metsä · äng/eng/eng/niitty · sjö/sø/**vann (innsjø)**/järvi · hav/hav/hav/meri | forest 7 · meadow 4 · lake 3 · sea 10. ⚠ no **sjø = the SEA**, never the lake word. fjäll/fjell dropped (reindeer confusable, no lemming/fjällräv art), suo dropped (no pool) |
| es (MX) | selva · bosque · mar · lago (**desierto REFUSED**: pool 2, no cactus) | selva 8 · bosque 7 · mar 9 · lago 3 |
| pt (BR) | Floresta Amazônica · Mar · Savana · Polo (+ Pantanal only in F3 rows / F6) | Amazônia **5** (Amazon fauna only: monkey, sloth, toucan, macaw, jaguar; no gorilla/chimp/orangutan/chameleon) · Mar 9 · Savana 6 · Polo 3 (1 w/ Mar). Pantanal {alligator=jacaré, heron, duck} = 3 but herons/ducks are coastal and jaguar/macaw/toucan/otter live in both Amazônia AND Pantanal, so Pantanal never shares a base page with Amazônia or Mar. Cerrado / Caatinga / Mata Atlântica: no pool (no tamanduá, lobo-guará, capivara, mico-leão pictures) |

| loc | literals the panel authors (counts) | slots/forms and where they exist | refusal / re-target | traps |
|---|---|---|---|---|
| en | 7 tile labels · 8 home words · 12 adapt sentences · 6 face titles + 6 instructions · report prompts 6 (animals / plant / hot cold wet dry) · 2 needs words (water chip alt, home alt) | none: no inflection anywhere (animal names are never inserted into a frame; sentences are whole) | none | "polar" tile: copy never says penguins and walruses share it; "Ocean Animals" = theme cannibal |
| de | 4 tile labels · 8 home words · 12 sentences · titles/instr · 6 report | none | none | noun capitals; deer picture is a spotted FAWN: vocab "Hirsch", child says "Reh"; `Bienenstock` = a beekeeper's box (drawn home is a wild comb in a hollow tree: panel picks "Bienennest"/"Bienenwabe"); "Steckbrief" (G2-318); bear is not a native Wald animal (panel may bench it for de) |
| es | 4 + 8 + 12 + … | none | desierto refused (whole tile) | MX "hábitat"; lodge word = burrow word ("madriguera") only matters at d3 labels; "animales" theme slug compound only; "ficha" never in a title |
| pt | 5 (incl. Pantanal) + 8 + 12 + … | none | Pantanal base-refused (fauna overlap, recorded) | "moradia" (home) ≠ "habitat": F2 vs base; lodge/burrow both "toca"; "atividade" never in a title |
| fr | 7 + 8 + 12 + … | none | none | "milieu de vie" is the school word; penguin = "manchot" (vocab already); "la maison" collides with theme "Autour de la maison" (use "le nid, le terrier"); "hutte" for the lodge |
| it | 7 + 8 + 12 + … | none | none | base ≠ "Dove vivono gli animali?"; "tana" = den AND burrow AND lodge; "scheda" never in a title |
| nl | 7 + 8 + 12 + … | none | none | de/het in sentences written whole; "dierenverblijven" = hutches for sale (never); "Waar wonen de dieren?" = G1-202 |
| sv | 4 + 8 + 12 + … | none | none | "Var bor djuren?" = G1-202; bee "bi", home "bo" (fågelbo) vs "kupa"; definite plural "djuren" never *djurna; "Djur och natur" = a chain store |
| da | 4 + 8 + 12 + … | none | none | "Hvor bor dyrene?" = G1-202; nest "rede" |
| no | 4 + 8 + 12 + … | none | none | **sjø = sea**; lake "vann"/"innsjø"; "Hvor bor dyrene?" = G1-202; nest "reir", bear winter den "hi" |
| fi | 4 + 8 + 12 + … | none | none | case: every sentence whole (no nominative token in a frame); "pesä" = nest AND anthill AND bee nest AND den (titles only; the page is picture-only); "eläinten kodit" alone = homeless SERP; heron and stork are BOTH "haikara" (stork is excluded) |

Every panel OPENS every picture its locale keeps (§D-2 paths) and reads one render of every face.

---

## D. Data + gates

### D-1 Bank shape: `data/b6/habitats.js` + `data/b6/locales/habitats.<loc>.json` (read by `lib/b6-common.js bank('habitats', loc)`; a missing locale block THROWS)

```js
// data/b6/habitats.js (locale-free truth)
HABITATS = ['forest','meadow','pond','ocean','polar-arctic','polar-antarctic','savanna','rainforest','wetland-pantanal']
TILE_OF  = { 'polar-arctic':'polar', 'polar-antarctic':'polar' }        // one drawn tile, two habitats
ANIMALS  = [{ key, pic:{theme,noun}, picOpened:true, kidName:'deer (a spotted fawn)',
              lives:['forest'], coastal:false, multi:false, lookalike:['reindeer','gazelle'], group:null /* 'ape'|'spotted-cat' */ }]
FAR      = { forest:['ocean','polar-arctic','savanna'], ocean:['forest','meadow','savanna','rainforest'], ... }
HOMES    = [{ key:'nest', animal:'bird', drawn:'nest', conflictsWith:['woodpecker','squirrel'] }]
ADAPT    = [{ key:'camel-hump', animal:'camel', trueOf:['camel'] }]
NEEDS    = [{ animal:'squirrel', food:'acorn', home:'tree-hole', neverEats:[...], neverHome:[...] }]
// locales/habitats.<loc>.json
{ sets:{ base:[tileKey…], extra:[…] }, tileLabel:{forest:'…'}, homeWord:{nest:'…'}, adapt:{'camel-hump':'…'},
  names:{camel:'…'}, report:{animals:'…', plant:'…', hot:'…', cold:'…', wet:'…', dry:'…'}, refusals:{…} }
```

### D-2 The ANIMAL→HABITAT claim table (all OPENED 2026-09-23)

| key | picture (`cache/themes/…@3x.webp`) | picOpened: what a 6-year-old says | lives | page rule |
|---|---|---|---|---|
| whale | ocean life/whale | yes: "whale" (grey, blue-white belly) | ocean | |
| dolphin | ocean life/dolphin | yes: "dolphin" | ocean | |
| octopus | ocean life/octopus | yes: "octopus" (pink) | ocean | never with squid |
| starfish | ocean life/starfish | yes: "starfish" | ocean | |
| jellyfish | ocean life/jellyfish | yes: "jellyfish" | ocean | |
| shark | ocean life/shark | yes: "shark" | ocean | |
| clownfish | ocean life/clownfish | yes: "clownfish / Nemo" | ocean | |
| crab | ocean life/crab | yes: "crab" | ocean | |
| ray | ocean life/ray | yes: "stingray" (orange, smiling) | ocean | |
| seal (grey) | ocean life/seal | yes: "seal" | ocean, polar-arctic | `multi`: only on pages WITHOUT a polar tile (de, Nordic) |
| seal (white pup) | zoo animals/seal | yes: "seal / baby seal" (white harp-seal pup) | polar-arctic, ocean | only on pages WITHOUT an ocean tile, or as an F3 Arctic-row member |
| walrus | winter/walrus | yes: "walrus" (red, tusks) | polar-arctic | never with penguin |
| penguin | birds 2/penguin (alt winter/penguin) | yes: "penguin" | polar-antarctic | never with walrus / white seal / narwhal; never in an Arctic row |
| narwhal | ocean life/narwhal | yes: "narwhal / unicorn whale" | polar-arctic, ocean | F3 Arctic-row member only |
| bear | forest creatures/bear | yes: "bear / teddy bear" (brown) | forest | de panel may bench (not native) |
| deer | forest creatures/deer | yes: "deer / Bambi" (spotted fawn) | forest | never with reindeer, gazelle, antelope (look-alikes) |
| squirrel | forest creatures/squirrel | yes: "squirrel" | forest | never with chipmunk |
| woodpecker | forest creatures/woodpecker | yes: "woodpecker" | forest | |
| badger | forest creatures/badger | yes: "badger" | forest | |
| wolf | forest creatures/wolf | yes: "wolf / grey dog" ⚠ | forest | panel confirms legibility |
| moose | animals/moose (NOT forest creatures/moose, which reads as a deer) | yes: "moose" (palmate antlers, dewlap) | forest | wades in lakes in summer: textbook skog/Wald animal; panel may bench on lake pages |
| frog | forest creatures/frog | yes: "frog" | pond | never with toad (same look); not on pages with a rainforest tile (tree frogs) |
| beaver | forest creatures/beaver | yes: "beaver" | pond | |
| dragonfly | forest creatures/dragonfly | yes: "dragonfly" | pond | |
| duck | birds 2/duck | yes: "duck / duckling" (yellow) | pond, (coast) | `coastal`: only on pages WITHOUT a sea/ocean tile |
| swan | birds 2/swan | yes: "swan" | pond, (coast: Baltic) | `coastal` |
| heron | birds 2/heron | yes: "heron / bird with long legs" | pond, wetland, (coast) | `coastal`; never with stork |
| butterfly | forest creatures/butterfly | yes: "butterfly" | meadow | |
| bee | forest creatures/bee | yes: "bee" | meadow | |
| grasshopper | forest creatures/grasshopper | yes: "grasshopper" | meadow | (insects and bugs/grasshopper has NO file) |
| ladybug | forest creatures/ladybug | yes: "ladybug / ladybird" | meadow | |
| lion | zoo animals/lion | yes: "lion" | savanna | |
| zebra | zoo animals/zebra | yes: "zebra" | savanna | |
| giraffe | zoo animals/giraffe | yes: "giraffe" | savanna | |
| elephant | zoo animals/elephant | yes: "elephant" (sitting baby) | savanna | |
| cheetah | zoo animals/cheetah | yes: "cheetah / leopard" | savanna | `spotted-cat`: max 1 of cheetah/jaguar per page |
| rhinoceros | zoo animals/rhinoceros | yes: "rhino" (pink) | savanna | |
| monkey | zoo animals/monkey | yes: "monkey" | rainforest | `ape` group max 1 per page |
| chimpanzee | zoo animals/chimpanzee | yes: "monkey / chimp" | rainforest | `ape`; not pt |
| gorilla | zoo animals/gorilla | yes: "gorilla" | rainforest | `ape`; not pt |
| orangutan | zoo animals/orangutan | yes: "orangutan / monkey" | rainforest | `ape`; not pt |
| sloth | zoo animals/sloth | yes: "sloth" (orange) | rainforest | |
| toucan | birds 2/toucan | yes: "toucan" | rainforest | |
| macaw | birds 2/macaw | yes: "parrot" (yellow-green) | rainforest | never with birds 2/parrot (same look) |
| jaguar | zoo animals/jaguar | yes: "leopard / cheetah" ⚠ | rainforest (+ Pantanal in pt) | `spotted-cat` |
| alligator | reptiles and Amphibians/alligator | yes: "crocodile / alligator" | wetland-pantanal | pt F3 Pantanal row only |

**Opened and EXCLUDED (record):** squid (reads as a second octopus; sv/da/no vocab = the octopus word) · orca (polar waters) · fish (ponds too) · manatee · chipmunk + porcupine (read as squirrel / hedgehog) · hedgehog, owl, fox, raccoon, snail (several habitats) · toad (= frog look) · salamander + chameleon (read as lizard) · reindeer (zoo + animals: a spotted fawn with antlers = deer look-alike) · forest creatures/moose (deer look) · gazelle + antelope (spotted, = deer look) · hyena (unreadable, tiger-dog) · otter (reads as weasel/meerkat) · meerkat, camel (desert, no tile; camel is F4 only) · parrot (= macaw look) · puffin (= penguin look) · stork (= heron look; fi both "haikara") · leopard, tiger, hippopotamus, bison, koala, panda (not needed; hippo is river/savanna multi) · polar_bear (zoo + winter: opened, white bear, **no vocab key, `hasPicture` false**) · mouse, rabbit (read as pets; rabbit is F2/F5 only) · earthworm + insects/worm (read as a snake) · spring/nest (nest with two CHICKEN chicks; all homes are drawn) · spring/birdhouse, winter/igloo (human-made).

### D-3 Homes (F2) and D-4 Adaptations (F4) and D-5 Needs (F5): claim tables (en source; panels rebuild)

Homes: bird (spring/bird, "bird", opened) ↔ nest · bee ↔ hive (DRAW a honeycomb inside a hollow tree trunk, cut-away: wild honeybees live in tree hollows; a comb hanging from a branch is a wasp/hornet picture) · spider ↔ web · rabbit (forest creatures/rabbit, "bunny") ↔ burrow · ant ↔ anthill · beaver ↔ lodge · bear ↔ cave · woodpecker ↔ tree hole.

Adaptations (each `trueOf` = every pooled animal it is true of; the page carries exactly one of them):
| claim | en sentence (≤95 chars) | trueOf |
|---|---|---|
| camel-hump | Its hump stores fat, so it can go a long time without food in the desert. | camel (animals/camel, one hump, opened) |
| giraffe-neck | Its long neck reaches the leaves high up in the trees. | giraffe |
| elephant-trunk | Its long trunk sucks up water and picks up food. | elephant |
| penguin-flippers | Its wings are flippers: it swims fast in the icy sea but cannot fly. | penguin |
| walrus-tusks | It pulls itself up onto the ice with its long tusks. | walrus |
| woodpecker-beak | Its strong, sharp beak drills holes in tree trunks. | woodpecker |
| beaver-teeth | Its big front teeth cut down trees for its home in the water. | beaver |
| whale-blowhole | It breathes air through a hole on top of its head. | whale, dolphin, narwhal |
| fish-gills | It breathes under water with gills. | clownfish, shark, ray |
| duck-feet | Its webbed feet push the water like paddles. | duck, swan, frog, beaver, penguin |
| sloth-claws | Its long curved claws let it hang from branches for hours. | sloth |
| cheetah-legs | Its long legs and light body make it the fastest runner on land. | cheetah |
| toucan-beak | Its huge beak picks fruit far out on thin branches. | toucan |
| squirrel-tail | Its bushy tail helps it balance when it jumps from branch to branch. | squirrel, monkey |
Banned claims (false or contested): hump stores WATER · stripes confuse lions · chameleons change colour to hide · "fat keeps it warm" (true of 7 pooled animals, cannot be one-answer) · whale/dolphin "is a fish".

Needs (F5): squirrel {eats: acorn (miscellaneous/acorn), home: tree hole, neverHome: web, hive} · bee {eats: flower (spring/flower), home: hive, neverEats: acorn, worm, mosquito, leaf} · bird = spring/robin {eats: worm ⚠ panel confirms insects and bugs/worm legibility, else mosquito; home: nest, neverEats: acorn, leaf, flower} · spider {eats: mosquito (insects and bugs/mosquito), home: web, neverEats: acorn, leaf, flower} · beaver {eats: leaf (spring/leaf), home: lodge, neverEats: worm, mosquito} · rabbit {eats: grass (spring/grass), home: burrow, neverEats: worm, mosquito, acorn?⚠(rabbits rarely eat acorns: not used)}. Water = `weather/raindrop` (opened, blue drop) in every row. Distractors are drawn ONLY from other rows' foods/homes on the same page, filtered by `neverEats`/`neverHome`; squirrel's distractor is always a wrong HOME (squirrels occasionally eat insects/eggs).

### D-6 Validator rules (`tools/validate-b6-draft.js`, habitats section)
1. Every `ANIMALS[].pic` exists on disk and `picOpened:true`; `hasPicture(key, loc)` true in all 11 locales.
2. No animal is a pet/farm animal (`pets`, `farm animals` themes) or a human home (`igloo`, `birdhouse`).
3. Every `lives` value ∈ `HABITATS`; `multi` === (`lives.length > 1`).
4. Every `sets[loc].base` tile has ≥3 animals whose `lives` includes it (excluding look-alike and group duplicates).
5. **Page oracle:** for every animal on a base page, `|lives ∩ pageHabitats| === 1` (polar tile expands to the ONE pole present).
6. penguin never co-occurs with walrus / white seal / narwhal on any page of any face.
7. `coastal` animals never on a page with an ocean/sea tile; `seal (grey)` never with a polar tile; `seal (white)` never with an ocean tile (except F3 Arctic row).
8. `lookalike` pairs never on one page; `group:'ape'` and `group:'spotted-cat'` max 1 per page.
9. F3 stranger: `lives ∩ FAR[rowTile] ≠ ∅`, `lives ∩ {rowTile} = ∅`, not `multi`.
10. F4: every sentence's on-page `trueOf` count === 1; no sentence contains an on-page animal name (Unicode-aware boundary).
11. F5: distractor ∈ `neverEats ∪ neverHome` of its row AND is another on-page row's food/home.
12. F2: `conflictsWith` pairs never on one page.
13. No visible string contains a free-predication, "Common Core", or a G1-202 / G2-318 title string.
14. pt Amazônia tile excludes `group:'ape'` and non-American animals (`region` tag).

**Poison cases (each must FAIL; the correct draft is the control):** (P1) penguin + walrus on one polar base page · (P2) duck on a page with the ocean tile · (P3) squid + octopus on one page · (P4) a base page where a frog shares the page with a rainforest tile · (P5) F4 page with duck-feet sentence + duck AND swan · (P6) F4 sentence "The camel's hump stores water" (banned claim) · (P7) F4 sentence containing "giraffe" with the giraffe on the page · (P8) F3 row forest with the stranger = owl (multi) · (P9) F3 Arctic row containing penguin · (P10) F5 bee row with distractor = flower (its own food) · (P11) F5 distractor = a toy (not another row's need) · (P12) polar_bear in `ANIMALS` (hasPicture false) · (P13) cat from `pets` · (P14) F2 page with bird↔nest AND woodpecker↔tree hole · (P15) pt base page with Amazônia + gorilla · (P16) base answer-letter sequence ABCDABCD (alternation tell) · (P17) instruction "Draw a line from each animal to where it lives" (G1-202 string).

### D-7 `qa/verify-b6-habitats.js` asserts on the RENDER (every face, every locale, shipped seed + 200 seeds)
floors per band (K 56/30, G1 44/26, G2 36/22; animal pictures ≥ 72 px at G1, ≥ 84 px at K); every tile is the `habitat-tile` primitive and every home the `animal-home` primitive (no `<image>` inside them); the page oracle re-run from stamps (rules 5-12); no answer printed (letter boxes empty, no circles/crosses pre-drawn, no animal name in the body of base/F2/F3/F5); tile letters A-D unique; answer-position tells measured both directions on the shipped seed (letters, stranger column, distractor chip slot, F2 row alignment); stack ≤ 722 (677 fi); nothing overflows; all text ≥ 9 px.

---

## E. SEO

**Title patterns** (≤70 chars, no worksheet-word, no bare theme slug, never a G1-202/G2-318 string; panels finalise):
| face | Germanic (en · de · nl) | Romance (es · pt · fr · it) | Nordic + fi (sv · da · no · fi) |
|---|---|---|---|
| base | Animal Habitats: Match the Animal · Lebensräume der Tiere: Wald, Wiese, Teich und Meer · Dieren en hun leefgebied: welk dier woont waar? | El hábitat de los animales: une cada animal · Habitat dos animais: ligue cada animal · Les milieux de vie des animaux · Gli ambienti degli animali: chi vive dove? | Djurens livsmiljöer: skog, äng, sjö och hav · Dyrs levesteder: skov, eng, sø og hav · Dyrenes leveområder: skog, eng, vann og hav · Missä eläimet asuvat? Metsä, niitty, järvi ja meri |
| F2 | Animal Homes · Tierwohnungen: Nest, Bau und Höhle · Dierenwoningen | La casa de los animales · Moradia dos animais · Le nid, le terrier: les maisons des animaux · La tana degli animali | Djurens bon · Dyrenes boliger · Dyrenes hjem · Eläinten pesät |
| F3 | Animal Habitats Odd One Out · Welches Tier lebt hier nicht? · Welk dier woont hier niet? | El animal que no vive aquí · Qual animal não vive aqui? · L'intrus du milieu de vie · L'intruso: chi non vive qui? | Vilket djur bor inte här? · Hvilket dyr bor ikke her? · Hvilket dyr bor ikke her? · Kuka ei asu täällä? |
| F4 | Animal Adaptations · Angepasst an den Lebensraum · Hoe dieren zich aanpassen | Adaptación de los animales · Adaptação dos animais · L'adaptation des animaux à leur milieu · L'adattamento degli animali all'ambiente | Djurens anpassningar · Dyrs tilpasninger · Dyrenes tilpasninger · Eläinten sopeutuminen |
| F5 | What Animals Need from Their Habitat · Was brauchen Tiere zum Leben? · Wat hebben dieren nodig? | ¿Qué necesitan los animales? · Do que os animais precisam? · Les besoins des animaux · Di cosa hanno bisogno gli animali? | Vad behöver djuren? · Hvad har dyr brug for? · Hva trenger dyrene? · Mitä eläimet tarvitsevat? |
| F6 | My Habitat Report · Forscherblatt: mein Lebensraum · Mijn leefgebied onderzoeken | Mi reporte del hábitat · Meu relatório de habitat · Ma fiche milieu de vie · Il mio ambiente: ricerca | Min livsmiljö: undersök och rita · Mit levested: undersøg og tegn · Mitt leveområde: undersøk og tegn · Oma elinympäristöni: tutki ja piirrä |

**Meta MIDDLEs** (en source; the child's instruction extended to 120-170 whole with the family sentence; panels re-fit per locale):
- base: "Children read four habitats and write the right letter under each of eight animals, from the forest and the pond to the ocean and the polar ice."
- F2: "Children draw a line from each animal to the home it builds or uses: a nest, a hive, a web, a burrow, an anthill or a beaver lodge."
- F3: "In each row children cross out the one animal that does not live in the pictured habitat and say where it really lives."
- F4: "Children read how a body part helps an animal live in its habitat, like the camel's hump or the penguin's flippers, and write that animal's letter."
- F5: "For each animal children circle the three things its habitat must give it: its own food, water and its home, and leave the one that belongs to another animal."
- F6: "Children draw one habitat, write three animals and one plant that live there, and circle whether it is hot or cold, wet or dry."

**coordinate per face:** base `{type:'habitats', mode:'base', level:<G1 key>, theme:''}` · F2 `{mode:'homes', level:<K key>}` · F3 `{mode:'odd', level:<G1 key>}` · F4 `{mode:'adapt', level:<G2 key>}` · F5 `{mode:'needs', level:<G1 key>}` · F6 `{mode:'report', level:<G2 key>}` (level keys = the locale's existing LEVELS keys, `frontend/app/[locale]/worksheets/[slug]/page.tsx:306`; all `theme:''`).

**Non-cannibalisation (est. whole-page 3-gram Jaccard):** base↔F3 0.18 (same tiles, different move) · base↔F2 0.12 · F2↔F5 0.20 (homes reused; F5 adds food + water + the conjunction; highest in family, watch) · F4↔F5 0.10 · F6↔base 0.14 · base↔G1-202 `where-animals-live` 0.10 · F2↔G1-202 0.08 · F4↔G2-343 who-am-i 0.12 · F6↔G2-318 fact file 0.15 · F5↔G1-376 F1 plant needs 0.10 · F3↔visual-logic odd-one-out G1-157/158 0.08.

---

## F. Open questions + summary

**Engineer must measure:** every px in §B (tile 148 × ~150 with label, 8 cards at 96 px pictures + 44 px letter box; F4 sentence rows at de/fi length, 3 lines × 22); the F2 home primitives' legibility at K 84 px; that `hasPicture` resolves the EXACT theme/noun paths of §D-2 (not another theme's same noun: `animals/moose` vs `forest creatures/moose` differ in art); the answer-tell statistics on the shipped seed; the taxonomy entry `habitats` already exists en-only (working tree) and needs the 10 other locales at apply time.

**Only a native panel can rule:** each locale's tile set and labels (esp. no lake word, pt Pantanal, es 4th tile lago vs polo, nl native weide/sloot vs generic); the 8 home words (fi pesä and es/pt/it burrow/lodge collisions: titles only); whether de benches bear and Nordic benches moose on lake pages; wolf and jaguar picture legibility; the 12 adaptation sentences as whole literals (truth re-checked, never naming the animal); the robin's food picture (worm reads as a snake); the es strand literal (row says Spain's "Conocimiento del Medio"); the sv/da/no head, since the LOCK forbids the G1-202 question the Nordic SEO panel proposed.

**Summary.** Themeless G1 family, six faces: base classify 8 animals into 4 drawn native habitat tiles (letter answer) · F2 K animal↔drawn home · F3 G1 cross out the stranger per habitat row · F4 G2 adaptation sentence → animal · F5 G1 circle food + water + home against another animal's need · F6 G2 open habitat report. Correctness is structural: a hand-read claim table with the FULL `lives` list per animal and a page oracle (exactly one tile per animal), pole segregation, coastal/look-alike/group rules, all poison-tested. 46 animals kept of ~80 opened; desert refused everywhere, Pantanal base-refused in pt; no face refused in any locale.
