# Substrate-gap inventory — Arc 5 Stream B sub-arc

**Status:** Single-session read-only audit per CLAUDE.md §A.14.5 audit-only commission shape. Output of Arc 5 Stream B parallel sub-arc (commenced post-v3 SUBSCRIPTION-SCOPE.md merge, 2026-05-08).
**Generated:** 2026-05-08
**Generator script:** `scripts/substrate-gap-inventory.js`
**IMAGE_VOCABULARY source:** `REFERENCE TRANSLATIONS/image-vocabulary.js` (1244 canonical keys).
**Targets source:** `frontend/config/learning-targets.json` (203 leaf target slugs across 5 domains).
**Authored on disk:** 21 packages (subtracting README.md from `docs/lesson-plans/packages/`).
**Unauthored scope:** 182 targets (= 203 - 21).

---

## Methodology

Each unauthored target classified into one of three substrate-classes:

- **Class A — RELEVANT-defined-keys.** Target composes against a specific cluster of IMAGE_VOCABULARY keys (e.g., `identify-and-name-fruits` → `[apple, banana, orange, ...]`). Per-target candidate-key enumeration produces a missing-keys list; `gapClass` ∈ {`CLEAN`, `GAP`, `EMPTY`}.
- **Class B — RELEVANT-flexible.** Target composes against image-library breadth without specific-key bindings (e.g., `solve-4x4-picture-sudoku` works against any 4-key set; `pattern AB` works against any pair of distinct objects). Substrate-readiness measured by theme-coverage breadth, not specific keys. `gapClass` = `FLEXIBLE`.
- **Class C — N/A.** Target is language-bound (phonics / spelling / oral language / text production / reading comprehension) OR abstract-numeric (counting / addition / place-value); IMAGE_VOCABULARY is not load-bearing. `gapClass` = `N/A`.

Class A candidate keys come from a hardcoded `CLUSTER_KEYS` map in the generator script. The map encodes the operator-strategic-locked cluster compositions for the canonical vocabulary domains. Future cluster-edits update the script and regenerate the inventory.

---

## Aggregate summary

**182 unauthored targets classified:**

| Class | Count | % | Description |
|---|---|---|---|
| A — RELEVANT-defined | 29 | 15.9% | Specific candidate-key cluster; gap-measurable |
| B — RELEVANT-flexible | 55 | 30.2% | Image-library-breadth-driven; theme-coverage-measured |
| C — N/A | 98 | 53.8% | Language-bound or abstract-numeric; substrate-irrelevant |

**Class A gap classification breakdown:**

| Gap class | Count | Description |
|---|---|---|
| CLEAN | 15 | All candidate keys exist in IMAGE_VOCABULARY |
| GAP | 14 | Some candidate keys exist; some missing |
| EMPTY | 0 | All candidate keys missing |
| FLEXIBLE | 55 | Class B; not gap-measurable per specific keys |
| N/A | 98 | Class C; image-vocabulary not load-bearing |

## Per-domain breakdown

| Domain | CLEAN | GAP | EMPTY | FLEXIBLE | N/A | Total unauthored |
|---|---|---|---|---|---|---|
| early-literacy | 8 | 4 | 0 | 1 | 63 | 76 |
| early-numeracy | 3 | 0 | 0 | 18 | 24 | 45 |
| world-knowledge | 3 | 10 | 0 | 11 | 3 | 27 |
| cognitive-and-executive-function | 0 | 0 | 0 | 18 | 0 | 18 |
| fine-motor-and-visual-spatial | 1 | 0 | 0 | 7 | 8 | 16 |

## Per-strand breakdown

| Strand | CLEAN | GAP | EMPTY | FLEXIBLE | N/A | Total unauthored |
|---|---|---|---|---|---|---|
| early-literacy/letter-recognition | 0 | 0 | 0 | 0 | 6 | 6 |
| early-literacy/multilingual-language-awareness | 0 | 0 | 0 | 1 | 4 | 5 |
| early-literacy/phonics-decoding | 0 | 0 | 0 | 0 | 11 | 11 |
| early-literacy/phonological-awareness | 0 | 0 | 0 | 0 | 9 | 9 |
| early-literacy/reading-comprehension | 0 | 0 | 0 | 0 | 10 | 10 |
| early-literacy/speaking-and-listening | 0 | 0 | 0 | 0 | 10 | 10 |
| early-literacy/spelling-and-encoding | 0 | 0 | 0 | 0 | 5 | 5 |
| early-literacy/vocabulary-acquisition | 8 | 4 | 0 | 0 | 0 | 12 |
| early-literacy/writing-composition | 0 | 0 | 0 | 0 | 8 | 8 |
| early-numeracy/addition-subtraction | 0 | 0 | 0 | 0 | 13 | 13 |
| early-numeracy/counting-and-cardinality | 0 | 0 | 0 | 0 | 4 | 4 |
| early-numeracy/data-and-graphs | 0 | 0 | 0 | 4 | 0 | 4 |
| early-numeracy/geometry | 3 | 0 | 0 | 5 | 0 | 8 |
| early-numeracy/measurement | 0 | 0 | 0 | 9 | 0 | 9 |
| early-numeracy/number-sense-comparison | 0 | 0 | 0 | 0 | 4 | 4 |
| early-numeracy/place-value | 0 | 0 | 0 | 0 | 3 | 3 |
| world-knowledge/community-and-roles | 1 | 2 | 0 | 0 | 0 | 3 |
| world-knowledge/environment-and-weather | 0 | 2 | 0 | 2 | 0 | 4 |
| world-knowledge/living-things | 2 | 3 | 0 | 1 | 0 | 6 |
| world-knowledge/materials-and-properties | 0 | 1 | 0 | 1 | 0 | 2 |
| world-knowledge/personal-social-emotional-development | 0 | 2 | 0 | 6 | 0 | 8 |
| world-knowledge/time-and-routine | 0 | 0 | 0 | 1 | 3 | 4 |
| cognitive-and-executive-function/logical-reasoning | 0 | 0 | 0 | 5 | 0 | 5 |
| cognitive-and-executive-function/memory-and-attention | 0 | 0 | 0 | 3 | 0 | 3 |
| cognitive-and-executive-function/pattern-recognition | 0 | 0 | 0 | 5 | 0 | 5 |
| cognitive-and-executive-function/sorting-and-classification | 0 | 0 | 0 | 5 | 0 | 5 |
| fine-motor-and-visual-spatial/drawing-and-tracing | 0 | 0 | 0 | 0 | 4 | 4 |
| fine-motor-and-visual-spatial/handwriting | 0 | 0 | 0 | 0 | 3 | 3 |
| fine-motor-and-visual-spatial/spatial-reasoning | 1 | 0 | 0 | 3 | 1 | 5 |
| fine-motor-and-visual-spatial/visual-discrimination | 0 | 0 | 0 | 4 | 0 | 4 |

## Top missing IMAGE_VOCABULARY keys (Class A gaps)

Aggregated across all Class A targets. A key counted multiple times = appears as a candidate key in multiple unauthored targets (cross-cluster overlap).

| Missing key | Cluster appearances |
|---|---|
| `snow` | 2 |
| `wind` | 2 |
| `storm` | 2 |
| `fog` | 2 |
| `fruit` | 2 |
| `seed` | 2 |
| `proud` | 2 |
| `walking` | 1 |
| `sitting` | 1 |
| `standing` | 1 |
| `eating` | 1 |
| `drinking` | 1 |
| `sleeping` | 1 |
| `mother` | 1 |
| `father` | 1 |
| `sister` | 1 |
| `brother` | 1 |
| `grandmother` | 1 |
| `grandfather` | 1 |
| `son` | 1 |
| `daughter` | 1 |
| `socks` | 1 |
| `root` | 1 |
| `stem` | 1 |
| `sprout` | 1 |
| `chrysalis` | 1 |
| `spring` | 1 |
| `summer` | 1 |
| `winter` | 1 |
| `mailman` | 1 |
| `dentist` | 1 |
| `school` | 1 |
| `hospital` | 1 |
| `park` | 1 |
| `library` | 1 |
| `bank` | 1 |
| `store` | 1 |
| `restaurant` | 1 |
| `fire-station` | 1 |
| `wood` | 1 |
| `plastic` | 1 |
| `metal` | 1 |
| `fabric` | 1 |
| `rubber` | 1 |
| `stone` | 1 |

---

## Per-target detail (Class A — RELEVANT-defined-keys)

### `classify-animals-by-diet` — Classify animals as herbivore / carnivore / omnivore

- **Domain / strand:** world-knowledge / living-things
- **Description:** Sort by diet pattern.
- **Cluster:** `farm-animals`
- **Gap class:** CLEAN
- **Candidate keys (10):** `cow`, `pig`, `sheep`, `horse`, `chicken`, `duck`, `goat`, `rabbit`, `donkey`, `dog`
- **Exist in IMAGE_VOCABULARY (10):** `cow`, `pig`, `sheep`, `horse`, `chicken`, `duck`, `goat`, `rabbit`, `donkey`, `dog`
- **Note:** Same multi-cluster animal substrate (carnivore/herbivore/omnivore classification).

### `classify-animals-by-habitat` — Classify animals by habitat

- **Domain / strand:** world-knowledge / living-things
- **Description:** Sort animals into farm / zoo / pet / sea / forest categories.
- **Cluster:** `farm-animals`
- **Gap class:** CLEAN
- **Candidate keys (10):** `cow`, `pig`, `sheep`, `horse`, `chicken`, `duck`, `goat`, `rabbit`, `donkey`, `dog`
- **Exist in IMAGE_VOCABULARY (10):** `cow`, `pig`, `sheep`, `horse`, `chicken`, `duck`, `goat`, `rabbit`, `donkey`, `dog`
- **Note:** Composes against farm-animals + zoo-animals + pet-animals + sea-creatures (multi-cluster); substrate breadth across animal clusters.
- **Prerequisites:** `identify-and-name-10-farm-animals`

### `describe-butterfly-life-cycle` — Describe the butterfly life cycle

- **Domain / strand:** world-knowledge / living-things
- **Description:** Egg → caterpillar → chrysalis → butterfly.
- **Cluster:** `butterfly-life-cycle-stages`
- **Gap class:** GAP
- **Candidate keys (4):** `egg`, `caterpillar`, `chrysalis`, `butterfly`
- **Exist in IMAGE_VOCABULARY (3):** `egg`, `caterpillar`, `butterfly`
- **Missing from IMAGE_VOCABULARY (1):** `chrysalis`
- **Note:** Butterfly life-cycle stages.

### `describe-plant-life-cycle` — Describe the basic plant life cycle

- **Domain / strand:** world-knowledge / living-things
- **Description:** Seed → sprout → plant → flower → fruit → seed.
- **Cluster:** `plant-life-cycle-stages`
- **Gap class:** GAP
- **Candidate keys (5):** `seed`, `sprout`, `plant`, `flower`, `fruit`
- **Exist in IMAGE_VOCABULARY (2):** `plant`, `flower`
- **Missing from IMAGE_VOCABULARY (3):** `seed`, `sprout`, `fruit`
- **Note:** Life-cycle sequence stages.
- **Prerequisites:** `identify-plant-parts`

### `identify-2d-shapes-basic` — Identify basic 2D shapes

- **Domain / strand:** early-numeracy / geometry
- **Description:** Circle, square, triangle, rectangle.
- **Cluster:** `shapes-2d-basic`
- **Gap class:** CLEAN
- **Candidate keys (4):** `circle`, `square`, `triangle`, `rectangle`
- **Exist in IMAGE_VOCABULARY (4):** `circle`, `square`, `triangle`, `rectangle`
- **Note:** 2D basic shapes cluster (4 keys).

### `identify-2d-shapes-extended` — Identify extended 2D shapes

- **Domain / strand:** early-numeracy / geometry
- **Description:** Pentagon, hexagon, oval, star, heart.
- **Cluster:** `shapes-2d-extended`
- **Gap class:** CLEAN
- **Candidate keys (10):** `circle`, `square`, `triangle`, `rectangle`, `oval`, `diamond`, `star`, `heart`, `pentagon`, `hexagon`
- **Exist in IMAGE_VOCABULARY (10):** `circle`, `square`, `triangle`, `rectangle`, `oval`, `diamond`, `star`, `heart`, `pentagon`, `hexagon`
- **Note:** 2D extended shapes cluster (10 keys).
- **Prerequisites:** `identify-2d-shapes-basic`

### `identify-3d-shapes` — Identify 3D shapes

- **Domain / strand:** early-numeracy / geometry
- **Description:** Cube, sphere, cone, cylinder.
- **Cluster:** `shapes-3d`
- **Gap class:** CLEAN
- **Candidate keys (5):** `cube`, `sphere`, `cylinder`, `cone`, `pyramid`
- **Exist in IMAGE_VOCABULARY (5):** `cube`, `sphere`, `cylinder`, `cone`, `pyramid`
- **Note:** 3D shapes cluster (5 keys).
- **Prerequisites:** `identify-2d-shapes-basic`

### `identify-and-name-action-verbs` — Identify and name 10 common action verbs

- **Domain / strand:** early-literacy / vocabulary-acquisition
- **Description:** Run, walk, jump, sit, stand, eat, drink, sleep, read, write (gerund or imperative form per locale convention).
- **Cluster:** `action-verbs`
- **Gap class:** GAP
- **Candidate keys (10):** `running`, `walking`, `jumping`, `sitting`, `standing`, `eating`, `drinking`, `sleeping`, `reading`, `writing`
- **Exist in IMAGE_VOCABULARY (4):** `running`, `jumping`, `reading`, `writing`
- **Missing from IMAGE_VOCABULARY (6):** `walking`, `sitting`, `standing`, `eating`, `drinking`, `sleeping`
- **Note:** Verb-form complexity per CLAUDE.md §17.9; gerund forms expected; substrate gap from Arc 4 Phase 1 Path B.

### `identify-and-name-family-members` — Identify and name family member terms

- **Domain / strand:** early-literacy / vocabulary-acquisition
- **Description:** Mother, father, sister, brother, grandmother, grandfather, baby, etc. — sensitive to family structure variation.
- **Cluster:** `family-members`
- **Gap class:** GAP
- **Candidate keys (9):** `mother`, `father`, `sister`, `brother`, `grandmother`, `grandfather`, `baby`, `son`, `daughter`
- **Exist in IMAGE_VOCABULARY (1):** `baby`
- **Missing from IMAGE_VOCABULARY (8):** `mother`, `father`, `sister`, `brother`, `grandmother`, `grandfather`, `son`, `daughter`
- **Note:** Cultural-variation sensitive per Arc 4 Path B; substrate gap.

### `identify-and-name-vegetables` — Identify and name 10 common vegetables

- **Domain / strand:** early-literacy / vocabulary-acquisition
- **Description:** Recognize and name vegetables familiar to the locale.
- **Cluster:** `vegetables`
- **Gap class:** CLEAN
- **Candidate keys (10):** `carrot`, `tomato`, `potato`, `onion`, `lettuce`, `broccoli`, `cucumber`, `pepper`, `corn`, `pea`
- **Exist in IMAGE_VOCABULARY (10):** `carrot`, `tomato`, `potato`, `onion`, `lettuce`, `broccoli`, `cucumber`, `pepper`, `corn`, `pea`
- **Note:** Standard vocab cluster.

### `identify-and-name-weather-words` — Identify and name 8 weather words

- **Domain / strand:** early-literacy / vocabulary-acquisition
- **Description:** Sunny, rainy, cloudy, snowy, windy, hot, cold, warm.
- **Cluster:** `weather-words`
- **Gap class:** GAP
- **Candidate keys (10):** `sun`, `rain`, `cloud`, `snow`, `wind`, `storm`, `rainbow`, `lightning`, `fog`, `ice`
- **Exist in IMAGE_VOCABULARY (6):** `sun`, `rain`, `cloud`, `rainbow`, `lightning`, `ice`
- **Missing from IMAGE_VOCABULARY (4):** `snow`, `wind`, `storm`, `fog`
- **Note:** Weather vocab cluster.

### `identify-common-materials` — Identify common materials

- **Domain / strand:** world-knowledge / materials-and-properties
- **Description:** Wood, metal, plastic, glass, fabric, paper.
- **Cluster:** `materials`
- **Gap class:** GAP
- **Candidate keys (8):** `wood`, `plastic`, `metal`, `glass`, `paper`, `fabric`, `rubber`, `stone`
- **Exist in IMAGE_VOCABULARY (2):** `glass`, `paper`
- **Missing from IMAGE_VOCABULARY (6):** `wood`, `plastic`, `metal`, `fabric`, `rubber`, `stone`
- **Note:** Material-types cluster.

### `identify-community-helpers` — Identify common community-helper jobs

- **Domain / strand:** world-knowledge / community-and-roles
- **Description:** Doctor, teacher, firefighter, police officer, baker, etc.
- **Cluster:** `community-helpers`
- **Gap class:** GAP
- **Candidate keys (10):** `doctor`, `teacher`, `firefighter`, `police-officer`, `chef`, `farmer`, `mailman`, `nurse`, `dentist`, `mechanic`
- **Exist in IMAGE_VOCABULARY (8):** `doctor`, `teacher`, `firefighter`, `police-officer`, `chef`, `farmer`, `nurse`, `mechanic`
- **Missing from IMAGE_VOCABULARY (2):** `mailman`, `dentist`
- **Note:** Community-helper jobs cluster.

### `identify-community-places` — Identify community places

- **Domain / strand:** world-knowledge / community-and-roles
- **Description:** School, hospital, library, park, store, post office.
- **Cluster:** `community-places`
- **Gap class:** GAP
- **Candidate keys (10):** `school`, `hospital`, `park`, `library`, `bank`, `store`, `restaurant`, `post-office`, `fire-station`, `museum`
- **Exist in IMAGE_VOCABULARY (2):** `post-office`, `museum`
- **Missing from IMAGE_VOCABULARY (8):** `school`, `hospital`, `park`, `library`, `bank`, `store`, `restaurant`, `fire-station`
- **Note:** Community-places cluster.

### `identify-emotions-of-others-from-faces` — Identify emotions of others from facial expressions

- **Domain / strand:** world-knowledge / personal-social-emotional-development
- **Description:** Read another person's emotional state from face cues.
- **Cluster:** `emotions`
- **Gap class:** GAP
- **Candidate keys (10):** `happy`, `sad`, `angry`, `scared`, `surprised`, `tired`, `excited`, `confused`, `proud`, `shy`
- **Exist in IMAGE_VOCABULARY (9):** `happy`, `sad`, `angry`, `scared`, `surprised`, `tired`, `excited`, `confused`, `shy`
- **Missing from IMAGE_VOCABULARY (1):** `proud`
- **Note:** Emotions cluster (overlaps with vocabulary-acquisition; identify-and-name-emotions already authored at Arc 2).
- **Prerequisites:** `identify-and-name-emotions`

### `identify-four-seasons` — Identify the four seasons and their characteristics

- **Domain / strand:** world-knowledge / environment-and-weather
- **Description:** Spring, summer, autumn, winter — including locale-appropriate signals.
- **Cluster:** `four-seasons`
- **Gap class:** GAP
- **Candidate keys (4):** `spring`, `summer`, `autumn`, `winter`
- **Exist in IMAGE_VOCABULARY (1):** `autumn`
- **Missing from IMAGE_VOCABULARY (3):** `spring`, `summer`, `winter`
- **Note:** Seasons cluster (4 keys).

### `identify-own-emotions-in-context` — Identify own emotions in context

- **Domain / strand:** world-knowledge / personal-social-emotional-development
- **Description:** Name what one is feeling and link to a cause (e.g., 'I am sad because...').
- **Cluster:** `emotions`
- **Gap class:** GAP
- **Candidate keys (10):** `happy`, `sad`, `angry`, `scared`, `surprised`, `tired`, `excited`, `confused`, `proud`, `shy`
- **Exist in IMAGE_VOCABULARY (9):** `happy`, `sad`, `angry`, `scared`, `surprised`, `tired`, `excited`, `confused`, `shy`
- **Missing from IMAGE_VOCABULARY (1):** `proud`
- **Note:** Emotions cluster (overlaps with vocabulary-acquisition; identify-and-name-emotions already authored at Arc 2).
- **Prerequisites:** `identify-and-name-emotions`

### `identify-plant-parts` — Identify the main parts of a plant

- **Domain / strand:** world-knowledge / living-things
- **Description:** Roots, stem, leaves, flower, seed.
- **Cluster:** `plant-parts`
- **Gap class:** GAP
- **Candidate keys (6):** `root`, `stem`, `leaf`, `flower`, `fruit`, `seed`
- **Exist in IMAGE_VOCABULARY (2):** `leaf`, `flower`
- **Missing from IMAGE_VOCABULARY (4):** `root`, `stem`, `fruit`, `seed`
- **Note:** Plant anatomy cluster.

### `identify-transportation-types` — Classify transportation as land / sea / air

- **Domain / strand:** world-knowledge / community-and-roles
- **Description:** Sort vehicles by where they travel.
- **Cluster:** `transportation-land`
- **Gap class:** CLEAN
- **Candidate keys (6):** `car`, `bus`, `truck`, `bicycle`, `motorcycle`, `train`
- **Exist in IMAGE_VOCABULARY (6):** `car`, `bus`, `truck`, `bicycle`, `motorcycle`, `train`
- **Note:** Transportation classification (land/sea/air); composes against transportation-land + transportation-sea + transportation-air clusters.
- **Prerequisites:** `identify-and-name-vehicles`

### `identify-weather-types` — Identify common weather types and dress for them

- **Domain / strand:** world-knowledge / environment-and-weather
- **Description:** Sunny / rainy / snowy / windy / cloudy and matching clothing.
- **Cluster:** `weather-words`
- **Gap class:** GAP
- **Candidate keys (10):** `sun`, `rain`, `cloud`, `snow`, `wind`, `storm`, `rainbow`, `lightning`, `fog`, `ice`
- **Exist in IMAGE_VOCABULARY (6):** `sun`, `rain`, `cloud`, `rainbow`, `lightning`, `ice`
- **Missing from IMAGE_VOCABULARY (4):** `snow`, `wind`, `storm`, `fog`
- **Note:** Weather cluster (overlaps with vocabulary-acquisition).
- **Prerequisites:** `identify-and-name-weather-words`, `identify-and-name-clothing`

### `point-to-named-body-part` — Point to a named body part (receptive)

- **Domain / strand:** early-literacy / vocabulary-acquisition
- **Description:** Receptive precursor; can be on the kid's own body or on a picture.
- **Cluster:** `body-parts`
- **Gap class:** CLEAN
- **Candidate keys (10):** `head`, `eye`, `ear`, `nose`, `mouth`, `hand`, `foot`, `arm`, `leg`, `finger`
- **Exist in IMAGE_VOCABULARY (10):** `head`, `eye`, `ear`, `nose`, `mouth`, `hand`, `foot`, `arm`, `leg`, `finger`
- **Note:** Receptive variant.

### `point-to-named-clothing-item` — Point to a named clothing item (receptive)

- **Domain / strand:** early-literacy / vocabulary-acquisition
- **Description:** Receptive precursor.
- **Cluster:** `clothing`
- **Gap class:** GAP
- **Candidate keys (10):** `shirt`, `pants`, `shoes`, `hat`, `jacket`, `dress`, `socks`, `gloves`, `scarf`, `sweater`
- **Exist in IMAGE_VOCABULARY (9):** `shirt`, `pants`, `shoes`, `hat`, `jacket`, `dress`, `gloves`, `scarf`, `sweater`
- **Missing from IMAGE_VOCABULARY (1):** `socks`
- **Note:** Receptive variant.

### `point-to-named-color` — Point to a named color (receptive)

- **Domain / strand:** early-literacy / vocabulary-acquisition
- **Description:** Receptive precursor to use-color-words.
- **Cluster:** `colors`
- **Gap class:** CLEAN
- **Candidate keys (10):** `red`, `blue`, `yellow`, `green`, `orange`, `purple`, `pink`, `brown`, `black`, `white`
- **Exist in IMAGE_VOCABULARY (10):** `red`, `blue`, `yellow`, `green`, `orange`, `purple`, `pink`, `brown`, `black`, `white`
- **Note:** Receptive variant.

### `point-to-named-farm-animal` — Point to a named farm animal (receptive)

- **Domain / strand:** early-literacy / vocabulary-acquisition
- **Description:** When the teacher names a farm animal in the target language, the kid points to the matching image. Receptive precursor to identify-and-name-10-farm-animals.
- **Cluster:** `farm-animals`
- **Gap class:** CLEAN
- **Candidate keys (10):** `cow`, `pig`, `sheep`, `horse`, `chicken`, `duck`, `goat`, `rabbit`, `donkey`, `dog`
- **Exist in IMAGE_VOCABULARY (10):** `cow`, `pig`, `sheep`, `horse`, `chicken`, `duck`, `goat`, `rabbit`, `donkey`, `dog`
- **Note:** Receptive variant; same cluster as productive identify-and-name.

### `point-to-named-vehicle` — Point to a named vehicle (receptive)

- **Domain / strand:** early-literacy / vocabulary-acquisition
- **Description:** Receptive precursor.
- **Cluster:** `vehicles`
- **Gap class:** CLEAN
- **Candidate keys (10):** `car`, `bus`, `truck`, `bicycle`, `motorcycle`, `airplane`, `boat`, `train`, `helicopter`, `ambulance`
- **Exist in IMAGE_VOCABULARY (10):** `car`, `bus`, `truck`, `bicycle`, `motorcycle`, `airplane`, `boat`, `train`, `helicopter`, `ambulance`
- **Note:** Receptive variant.

### `point-to-named-zoo-animal` — Point to a named zoo animal (receptive)

- **Domain / strand:** early-literacy / vocabulary-acquisition
- **Description:** Receptive precursor to identify-and-name-10-zoo-animals.
- **Cluster:** `zoo-animals`
- **Gap class:** CLEAN
- **Candidate keys (10):** `lion`, `tiger`, `elephant`, `giraffe`, `zebra`, `monkey`, `panda`, `kangaroo`, `penguin`, `koala`
- **Exist in IMAGE_VOCABULARY (10):** `lion`, `tiger`, `elephant`, `giraffe`, `zebra`, `monkey`, `panda`, `kangaroo`, `penguin`, `koala`
- **Note:** Receptive variant.

### `use-position-vocabulary` — Use position vocabulary (in / on / under / next-to)

- **Domain / strand:** fine-motor-and-visual-spatial / spatial-reasoning
- **Description:** Describe object position with appropriate prepositions.
- **Cluster:** `spatial-position-words`
- **Gap class:** CLEAN
- **Candidate keys (0):** _(none in cluster map; abstract)_
- **Note:** Position prepositions (in/on/under/next-to); abstract — image-vocabulary supports rendering object-in-position scenes.
- **Prerequisites:** `use-spatial-position-words`

### `use-size-comparison-words` — Use size-comparison vocabulary

- **Domain / strand:** early-literacy / vocabulary-acquisition
- **Description:** Big/small/bigger/smaller/biggest/smallest in target language.
- **Cluster:** `size-comparison-words`
- **Gap class:** CLEAN
- **Candidate keys (0):** _(none in cluster map; abstract)_
- **Note:** Abstract; image-vocabulary supports rendering big/small comparisons via size-attribute.

### `use-spatial-position-words` — Use spatial position vocabulary

- **Domain / strand:** early-literacy / vocabulary-acquisition
- **Description:** In, on, under, next-to, between, behind, in-front-of, above.
- **Cluster:** `spatial-position-words`
- **Gap class:** CLEAN
- **Candidate keys (0):** _(none in cluster map; abstract)_
- **Note:** Prepositions; abstract; image-vocabulary supports rendering object-in-position.

---

## Per-target detail (Class B — RELEVANT-flexible)

Class B targets compose against image-library breadth without specific-key bindings. Substrate-readiness is theme-coverage-measured at material-render time, not via candidate-key enumeration. Authoring proceeds without substrate gaps; theme-coverage breadth determines bundle-curation breadth (per v3 SUBSCRIPTION-SCOPE.md Pillar 2 redefinition).

| Target | Domain / Strand | Note |
|---|---|---|
| `compare-by-capacity` | early-numeracy / measurement | Comparison composes against image-library objects with comparable attribute; substrate-flexible. |
| `compare-by-length` | early-numeracy / measurement | Comparison composes against image-library objects with comparable attribute; substrate-flexible. |
| `compare-by-weight` | early-numeracy / measurement | Comparison composes against image-library objects with comparable attribute; substrate-flexible. |
| `complete-analogy-image-pair` | cognitive-and-executive-function / logical-reasoning | Analogy pairs (A:B :: C:?) compose against image-library breadth. |
| `compose-shapes-from-parts` | early-numeracy / geometry | Geometric-attribute reasoning; composes against shape clusters + diagram primitives. |
| `count-and-graph-categories` | early-numeracy / data-and-graphs | Composes against image-library breadth (objects to sort / graph). Substrate-flexible. |
| `count-instances-of-target-in-grid` | cognitive-and-executive-function / memory-and-attention | Visual-scanning/memory composes against image-library breadth. |
| `create-original-pattern` | cognitive-and-executive-function / pattern-recognition | Pattern AB/AAB/ABB/ABC/AABB composes against image-library breadth (any objects in repeating patterns). Substrate-flexible. |
| `describe-day-night-cycle` | world-knowledge / environment-and-weather | Sun/moon/star imagery; small-cluster. |
| `describe-material-properties` | world-knowledge / materials-and-properties | Material-property descriptions; composes against materials cluster + property attributes. |
| `describe-shape-attributes` | early-numeracy / geometry | Geometric-attribute reasoning; composes against shape clusters + diagram primitives. |
| `describe-water-cycle-basic` | world-knowledge / environment-and-weather | Water-cycle process imagery; small-cluster. |
| `find-hidden-target-in-busy-scene` | cognitive-and-executive-function / memory-and-attention | Visual-scanning/memory composes against image-library breadth. |
| `find-missing-piece` | fine-motor-and-visual-spatial / visual-discrimination | Visual-discrimination composes against image-library breadth. |
| `follow-directions-on-grid` | fine-motor-and-visual-spatial / spatial-reasoning | Grid/maze navigation; composes against image-library breadth (target images on grid). |
| `identify-AAB-ABB-patterns` | cognitive-and-executive-function / pattern-recognition | Pattern AB/AAB/ABB/ABC/AABB composes against image-library breadth (any objects in repeating patterns). Substrate-flexible. |
| `identify-AABB-pattern` | cognitive-and-executive-function / pattern-recognition | Pattern AB/AAB/ABB/ABC/AABB composes against image-library breadth (any objects in repeating patterns). Substrate-flexible. |
| `identify-AB-pattern` | cognitive-and-executive-function / pattern-recognition | Pattern AB/AAB/ABB/ABC/AABB composes against image-library breadth (any objects in repeating patterns). Substrate-flexible. |
| `identify-ABC-pattern` | cognitive-and-executive-function / pattern-recognition | Pattern AB/AAB/ABB/ABC/AABB composes against image-library breadth (any objects in repeating patterns). Substrate-flexible. |
| `identify-classroom-rules` | world-knowledge / personal-social-emotional-development | Social-scene image-library content; substrate-flexible. |
| `identify-coin-values` | early-numeracy / measurement | Currency imagery (locale-dependent: US coins / EU coins / GBP coins / etc.); image-library breadth needed. |
| `identify-fractions-half-third-quarter` | early-numeracy / geometry | Geometric-attribute reasoning; composes against shape clusters + diagram primitives. |
| `identify-living-vs-nonliving` | world-knowledge / living-things | Uses image-library breadth across animals/plants vs objects/materials. Substrate-ready if multi-cluster coverage broad. |
| `identify-odd-one-out-by-attribute` | cognitive-and-executive-function / logical-reasoning | Odd-one-out composes against image-library breadth (categories + attributes); substrate-flexible. |
| `identify-odd-one-out-by-category` | cognitive-and-executive-function / logical-reasoning | Odd-one-out composes against image-library breadth (categories + attributes); substrate-flexible. |
| `identify-safe-vs-unsafe-situations` | world-knowledge / personal-social-emotional-development | Social-scene image-library content; substrate-flexible. |
| `identify-symmetry-line` | early-numeracy / geometry | Geometric-attribute reasoning; composes against shape clusters + diagram primitives. |
| `interpret-simple-bar-graph` | early-numeracy / data-and-graphs | Composes against image-library breadth (objects to sort / graph). Substrate-flexible. |
| `interpret-simple-pictograph` | early-numeracy / data-and-graphs | Composes against image-library breadth (objects to sort / graph). Substrate-flexible. |
| `make-and-name-a-friend` | world-knowledge / personal-social-emotional-development | Social-scene image-library content; substrate-flexible. |
| `match-image-piece-to-whole` | fine-motor-and-visual-spatial / visual-discrimination | Visual-discrimination composes against image-library breadth. |
| `match-image-to-shadow` | fine-motor-and-visual-spatial / visual-discrimination | Visual-discrimination composes against image-library breadth. |
| `name-things-i-can-do-myself` | world-knowledge / personal-social-emotional-development | Self-care action images; composes against routine-activity image-library content. |
| `name-this-object-in-two-languages` | early-literacy / multilingual-language-awareness | Uses image-library breadth (any object, named in two languages). Substrate-ready if theme-coverage broad. |
| `navigate-complex-maze` | fine-motor-and-visual-spatial / spatial-reasoning | Grid/maze navigation; composes against image-library breadth (target images on grid). |
| `navigate-simple-maze` | fine-motor-and-visual-spatial / spatial-reasoning | Grid/maze navigation; composes against image-library breadth (target images on grid). |
| `order-3-objects-by-length` | early-numeracy / measurement | Comparison composes against image-library objects with comparable attribute; substrate-flexible. |
| `partition-shape-halves-quarters` | early-numeracy / geometry | Geometric-attribute reasoning; composes against shape clusters + diagram primitives. |
| `recognize-money-amounts-up-to-1-unit` | early-numeracy / measurement | Currency imagery (locale-dependent: US coins / EU coins / GBP coins / etc.); image-library breadth needed. |
| `remember-image-pair-positions` | cognitive-and-executive-function / memory-and-attention | Visual-scanning/memory composes against image-library breadth. |
| `sequence-daily-routine` | world-knowledge / time-and-routine | Routine activity images (wake-up / brush-teeth / eat-breakfast etc.); image-library breadth. |
| `share-and-take-turns` | world-knowledge / personal-social-emotional-development | Social-scene image-library content; substrate-flexible. |
| `solve-4x4-picture-sudoku` | cognitive-and-executive-function / logical-reasoning | Picture-sudoku composes against any 4-6-key image set. Substrate-flexible. |
| `solve-6x6-picture-sudoku` | cognitive-and-executive-function / logical-reasoning | Picture-sudoku composes against any 4-6-key image set. Substrate-flexible. |
| `sort-by-category` | cognitive-and-executive-function / sorting-and-classification | Sorting by color/shape/size/category/multi-attribute. Composes against image-library breadth + theme-coverage. |
| `sort-by-color` | cognitive-and-executive-function / sorting-and-classification | Sorting by color/shape/size/category/multi-attribute. Composes against image-library breadth + theme-coverage. |
| `sort-by-multiple-attributes` | cognitive-and-executive-function / sorting-and-classification | Sorting by color/shape/size/category/multi-attribute. Composes against image-library breadth + theme-coverage. |
| `sort-by-shape` | cognitive-and-executive-function / sorting-and-classification | Sorting by color/shape/size/category/multi-attribute. Composes against image-library breadth + theme-coverage. |
| `sort-by-size` | cognitive-and-executive-function / sorting-and-classification | Sorting by color/shape/size/category/multi-attribute. Composes against image-library breadth + theme-coverage. |
| `sort-objects-by-attribute` | early-numeracy / data-and-graphs | Composes against image-library breadth (objects to sort / graph). Substrate-flexible. |
| `spot-the-difference-2-pictures` | fine-motor-and-visual-spatial / visual-discrimination | Visual-discrimination composes against image-library breadth. |
| `tell-time-to-half-hour` | early-numeracy / measurement | Analog-clock imagery (clock + hands); small-cluster (clock-related image-library content). |
| `tell-time-to-quarter-hour` | early-numeracy / measurement | Analog-clock imagery (clock + hands); small-cluster (clock-related image-library content). |
| `tell-time-to-the-hour` | early-numeracy / measurement | Analog-clock imagery (clock + hands); small-cluster (clock-related image-library content). |
| `wait-my-turn` | world-knowledge / personal-social-emotional-development | Social-scene image-library content; substrate-flexible. |

---

## Per-target detail (Class C — N/A)

Class C targets are language-bound (phonics / spelling / oral / text-production / reading-comprehension) OR abstract-numeric (counting / addition / place-value). IMAGE_VOCABULARY is not load-bearing for these targets; authoring proceeds against word-lists / numeral-cards / abstract pedagogical primitives. Listed for completeness; not actionable from substrate-gap perspective.

| Target | Domain / Strand | Reason |
|---|---|---|
| `add-2-digit-numbers` | early-numeracy / addition-subtraction | Numeric addition/subtraction; theme-mode visuals optional but image-vocabulary not load-bearing. |
| `add-2-digit-without-regrouping` | early-numeracy / addition-subtraction | Numeric addition/subtraction; theme-mode visuals optional but image-vocabulary not load-bearing. |
| `add-3-numbers-within-20` | early-numeracy / addition-subtraction | Numeric addition/subtraction; theme-mode visuals optional but image-vocabulary not load-bearing. |
| `add-within-10` | early-numeracy / addition-subtraction | Numeric addition/subtraction; theme-mode visuals optional but image-vocabulary not load-bearing. |
| `add-within-20` | early-numeracy / addition-subtraction | Numeric addition/subtraction; theme-mode visuals optional but image-vocabulary not load-bearing. |
| `answer-who-what-where-questions` | early-literacy / reading-comprehension | Text-based comprehension; image-vocabulary not load-bearing (some targets use picture cues but composes against story content). |
| `ask-and-answer-wh-questions` | early-literacy / speaking-and-listening | Oral language; no image-vocabulary load-bearing dependency. |
| `ask-and-answer-yes-no-questions` | early-literacy / speaking-and-listening | Oral language; no image-vocabulary load-bearing dependency. |
| `blend-onset-rime` | early-literacy / phonological-awareness | Phonics — sound-based, not image-vocabulary-bound. Composes against phonics word lists. |
| `blend-phonemes-cvc` | early-literacy / phonological-awareness | Phonics — sound-based, not image-vocabulary-bound. Composes against phonics word lists. |
| `compare-2-digit-numbers` | early-numeracy / place-value | Place-value abstraction; numeral/place-value-blocks primary, not image-vocabulary. |
| `compare-greeting-routines-across-cultures` | early-literacy / multilingual-language-awareness | Oral/text-based language-awareness; not image-vocabulary-bound. |
| `compare-numerals-1-to-10` | early-numeracy / number-sense-comparison | Numeral comparison; numeral-cards primary, not image-vocabulary. |
| `count-by-rote-1-to-100` | early-numeracy / counting-and-cardinality | Abstract numeric counting; numeral-cards primary anchor, not image-vocabulary. |
| `count-syllables-1-to-3` | early-literacy / phonological-awareness | Phonics — sound-based, not image-vocabulary-bound. Composes against phonics word lists. |
| `decompose-tens-and-ones-within-19` | early-numeracy / place-value | Place-value abstraction; numeral/place-value-blocks primary, not image-vocabulary. |
| `describe-a-picture-in-2-3-sentences` | early-literacy / speaking-and-listening | Oral language; no image-vocabulary load-bearing dependency. |
| `distinguish-fiction-from-nonfiction` | early-literacy / reading-comprehension | Text-based comprehension; image-vocabulary not load-bearing (some targets use picture cues but composes against story content). |
| `draw-2d-shapes-freehand` | fine-motor-and-visual-spatial / drawing-and-tracing | Tracing/drawing primitives; no image-vocabulary dependency. |
| `fact-families-within-10` | early-numeracy / addition-subtraction | Numeric addition/subtraction; theme-mode visuals optional but image-vocabulary not load-bearing. |
| `find-missing-addend-within-10` | early-numeracy / addition-subtraction | Numeric addition/subtraction; theme-mode visuals optional but image-vocabulary not load-bearing. |
| `find-number-before-after` | early-numeracy / number-sense-comparison | Numeral comparison; numeral-cards primary, not image-vocabulary. |
| `follow-1-step-oral-instruction` | early-literacy / speaking-and-listening | Oral language; no image-vocabulary load-bearing dependency. |
| `follow-2-step-oral-instruction` | early-literacy / speaking-and-listening | Oral language; no image-vocabulary load-bearing dependency. |
| `follow-3-step-oral-instruction` | early-literacy / speaking-and-listening | Oral language; no image-vocabulary load-bearing dependency. |
| `form-lowercase-letters` | fine-motor-and-visual-spatial / handwriting | Letter/numeral formation; no image-vocabulary dependency. |
| `form-numerals-0-to-10` | fine-motor-and-visual-spatial / handwriting | Letter/numeral formation; no image-vocabulary dependency. |
| `form-uppercase-letters` | fine-motor-and-visual-spatial / handwriting | Letter/numeral formation; no image-vocabulary dependency. |
| `identify-days-of-week` | world-knowledge / time-and-routine | Calendar text labels; not image-vocabulary-bound. |
| `identify-language-of-spoken-utterance` | early-literacy / multilingual-language-awareness | Oral/text-based language-awareness; not image-vocabulary-bound. |
| `identify-letter-by-image-clue` | early-literacy / letter-recognition | Alphabet recognition — letter inventory not in IMAGE_VOCABULARY (alphabet is universal across locale). |
| `identify-letter-sounds-consonants` | early-literacy / letter-recognition | Alphabet recognition — letter inventory not in IMAGE_VOCABULARY (alphabet is universal across locale). |
| `identify-letter-sounds-vowels` | early-literacy / letter-recognition | Alphabet recognition — letter inventory not in IMAGE_VOCABULARY (alphabet is universal across locale). |
| `identify-lowercase-letters` | early-literacy / letter-recognition | Alphabet recognition — letter inventory not in IMAGE_VOCABULARY (alphabet is universal across locale). |
| `identify-main-character` | early-literacy / reading-comprehension | Text-based comprehension; image-vocabulary not load-bearing (some targets use picture cues but composes against story content). |
| `identify-months-of-year` | world-knowledge / time-and-routine | Calendar text labels; not image-vocabulary-bound. |
| `identify-problem-and-solution` | early-literacy / reading-comprehension | Text-based comprehension; image-vocabulary not load-bearing (some targets use picture cues but composes against story content). |
| `identify-rhyming-pairs` | early-literacy / phonological-awareness | Phonics — sound-based, not image-vocabulary-bound. Composes against phonics word lists. |
| `identify-setting` | early-literacy / reading-comprehension | Text-based comprehension; image-vocabulary not load-bearing (some targets use picture cues but composes against story content). |
| `identify-tens-and-ones-2-digit` | early-numeracy / place-value | Place-value abstraction; numeral/place-value-blocks primary, not image-vocabulary. |
| `identify-uppercase-letters` | early-literacy / letter-recognition | Alphabet recognition — letter inventory not in IMAGE_VOCABULARY (alphabet is universal across locale). |
| `infer-character-feeling-from-picture-cue` | early-literacy / reading-comprehension | Text-based comprehension; image-vocabulary not load-bearing (some targets use picture cues but composes against story content). |
| `isolate-final-phoneme` | early-literacy / phonological-awareness | Phonics — sound-based, not image-vocabulary-bound. Composes against phonics word lists. |
| `isolate-initial-phoneme` | early-literacy / phonological-awareness | Phonics — sound-based, not image-vocabulary-bound. Composes against phonics word lists. |
| `isolate-medial-phoneme` | early-literacy / phonological-awareness | Phonics — sound-based, not image-vocabulary-bound. Composes against phonics word lists. |
| `label-a-picture-with-1-word` | early-literacy / writing-composition | Text production; not image-vocabulary-bound (some targets use picture prompts but image-vocabulary is not load-bearing). |
| `label-picture-with-noun-phrase` | early-literacy / writing-composition | Text production; not image-vocabulary-bound (some targets use picture prompts but image-vocabulary is not load-bearing). |
| `make-10-strategy` | early-numeracy / addition-subtraction | Numeric addition/subtraction; theme-mode visuals optional but image-vocabulary not load-bearing. |
| `match-sentence-to-picture` | early-literacy / reading-comprehension | Text-based comprehension; image-vocabulary not load-bearing (some targets use picture cues but composes against story content). |
| `match-uppercase-lowercase` | early-literacy / letter-recognition | Alphabet recognition — letter inventory not in IMAGE_VOCABULARY (alphabet is universal across locale). |
| `notice-cognate-word-pairs` | early-literacy / multilingual-language-awareness | Oral/text-based language-awareness; not image-vocabulary-bound. |
| `order-numerals-1-to-10` | early-numeracy / number-sense-comparison | Numeral comparison; numeral-cards primary, not image-vocabulary. |
| `participate-in-simple-conversation` | early-literacy / speaking-and-listening | Oral language; no image-vocabulary load-bearing dependency. |
| `predict-from-picture-cue` | early-literacy / reading-comprehension | Text-based comprehension; image-vocabulary not load-bearing (some targets use picture cues but composes against story content). |
| `produce-rhyming-words` | early-literacy / phonological-awareness | Phonics — sound-based, not image-vocabulary-bound. Composes against phonics word lists. |
| `read-and-follow-2-sentence-instruction` | early-literacy / reading-comprehension | Text-based comprehension; image-vocabulary not load-bearing (some targets use picture cues but composes against story content). |
| `read-common-prefixes-suffixes` | early-literacy / phonics-decoding | Phonics decoding — sound/grapheme-based, not image-vocabulary-bound. |
| `read-consonant-blends` | early-literacy / phonics-decoding | Phonics decoding — sound/grapheme-based, not image-vocabulary-bound. |
| `read-consonant-digraphs` | early-literacy / phonics-decoding | Phonics decoding — sound/grapheme-based, not image-vocabulary-bound. |
| `read-cvc-words` | early-literacy / phonics-decoding | Phonics decoding — sound/grapheme-based, not image-vocabulary-bound. |
| `read-cvce-words` | early-literacy / phonics-decoding | Phonics decoding — sound/grapheme-based, not image-vocabulary-bound. |
| `read-finnish-words-with-vowel-length` | early-literacy / phonics-decoding | Phonics decoding — sound/grapheme-based, not image-vocabulary-bound. |
| `read-french-silent-final-consonant-pattern` | early-literacy / phonics-decoding | Phonics decoding — sound/grapheme-based, not image-vocabulary-bound. |
| `read-german-compound-word-boundaries` | early-literacy / phonics-decoding | Phonics decoding — sound/grapheme-based, not image-vocabulary-bound. |
| `read-r-controlled-vowels` | early-literacy / phonics-decoding | Phonics decoding — sound/grapheme-based, not image-vocabulary-bound. |
| `read-spanish-cv-syllable-words` | early-literacy / phonics-decoding | Phonics decoding — sound/grapheme-based, not image-vocabulary-bound. |
| `read-vowel-teams` | early-literacy / phonics-decoding | Phonics decoding — sound/grapheme-based, not image-vocabulary-bound. |
| `recite-a-rhyme-or-short-poem` | early-literacy / speaking-and-listening | Oral language; no image-vocabulary load-bearing dependency. |
| `respond-in-target-language-when-prompted` | early-literacy / multilingual-language-awareness | Oral/text-based language-awareness; not image-vocabulary-bound. |
| `respond-to-greeting-in-target-language` | early-literacy / speaking-and-listening | Oral language; no image-vocabulary load-bearing dependency. |
| `retell-a-3-event-story-orally` | early-literacy / speaking-and-listening | Oral language; no image-vocabulary load-bearing dependency. |
| `segment-cvc-into-phonemes` | early-literacy / phonological-awareness | Phonics — sound-based, not image-vocabulary-bound. Composes against phonics word lists. |
| `sequence-3-event-story` | early-literacy / reading-comprehension | Text-based comprehension; image-vocabulary not load-bearing (some targets use picture cues but composes against story content). |
| `skip-count-by-10` | early-numeracy / counting-and-cardinality | Abstract numeric counting; numeral-cards primary anchor, not image-vocabulary. |
| `skip-count-by-2` | early-numeracy / counting-and-cardinality | Abstract numeric counting; numeral-cards primary anchor, not image-vocabulary. |
| `skip-count-by-5` | early-numeracy / counting-and-cardinality | Abstract numeric counting; numeral-cards primary anchor, not image-vocabulary. |
| `spell-cvc-words` | early-literacy / spelling-and-encoding | Word-based; spelling/encoding does not compose against image-vocabulary. |
| `spell-high-frequency-sight-words-tier-1` | early-literacy / spelling-and-encoding | Word-based; spelling/encoding does not compose against image-vocabulary. |
| `spell-high-frequency-sight-words-tier-2` | early-literacy / spelling-and-encoding | Word-based; spelling/encoding does not compose against image-vocabulary. |
| `spell-words-with-blends` | early-literacy / spelling-and-encoding | Word-based; spelling/encoding does not compose against image-vocabulary. |
| `spell-words-with-digraphs` | early-literacy / spelling-and-encoding | Word-based; spelling/encoding does not compose against image-vocabulary. |
| `subtract-2-digit-numbers` | early-numeracy / addition-subtraction | Numeric addition/subtraction; theme-mode visuals optional but image-vocabulary not load-bearing. |
| `subtract-2-digit-without-regrouping` | early-numeracy / addition-subtraction | Numeric addition/subtraction; theme-mode visuals optional but image-vocabulary not load-bearing. |
| `subtract-within-10` | early-numeracy / addition-subtraction | Numeric addition/subtraction; theme-mode visuals optional but image-vocabulary not load-bearing. |
| `subtract-within-20` | early-numeracy / addition-subtraction | Numeric addition/subtraction; theme-mode visuals optional but image-vocabulary not load-bearing. |
| `subtract-within-5` | early-numeracy / addition-subtraction | Numeric addition/subtraction; theme-mode visuals optional but image-vocabulary not load-bearing. |
| `trace-2d-shapes` | fine-motor-and-visual-spatial / drawing-and-tracing | Tracing/drawing primitives; no image-vocabulary dependency. |
| `trace-curved-lines` | fine-motor-and-visual-spatial / drawing-and-tracing | Tracing/drawing primitives; no image-vocabulary dependency. |
| `trace-straight-lines` | fine-motor-and-visual-spatial / drawing-and-tracing | Tracing/drawing primitives; no image-vocabulary dependency. |
| `use-before-after-vocabulary` | world-knowledge / time-and-routine | Time-sequence vocabulary; abstract. |
| `use-capital-letter-at-sentence-start` | early-literacy / writing-composition | Text production; not image-vocabulary-bound (some targets use picture prompts but image-vocabulary is not load-bearing). |
| `use-direction-vocabulary` | fine-motor-and-visual-spatial / spatial-reasoning | Direction terms (left/right/up/down); abstract. |
| `use-greater-less-equal-symbols` | early-numeracy / number-sense-comparison | Numeral comparison; numeral-cards primary, not image-vocabulary. |
| `use-period-at-sentence-end` | early-literacy / writing-composition | Text production; not image-vocabulary-bound (some targets use picture prompts but image-vocabulary is not load-bearing). |
| `write-2-sentences-on-a-topic` | early-literacy / writing-composition | Text production; not image-vocabulary-bound (some targets use picture prompts but image-vocabulary is not load-bearing). |
| `write-a-3-sentence-story` | early-literacy / writing-composition | Text production; not image-vocabulary-bound (some targets use picture prompts but image-vocabulary is not load-bearing). |
| `write-a-simple-sentence-with-picture-prompt` | early-literacy / writing-composition | Text production; not image-vocabulary-bound (some targets use picture prompts but image-vocabulary is not load-bearing). |
| `write-own-name` | early-literacy / writing-composition | Text production; not image-vocabulary-bound (some targets use picture prompts but image-vocabulary is not load-bearing). |

---

## Operator-side image-authoring list trigger

Per Arc 5 ratification 1 + v3 SUBSCRIPTION-SCOPE.md §5 Stream C: the operator's 1,000-image authoring pipeline triggers from this inventory data. Recommended sequencing for image-authoring waves to maximize substrate-gap closure:

**Wave 1 (highest impact — closes Arc 5 Phase 1 substrate sweep dependencies):**
- `family-members` cluster: 9 keys (mother / father / sister / brother / grandmother / grandfather / baby / son / daughter). Per Arc 4 Phase 1 Path B finding.
- `action-verbs` cluster: 10 keys (running / walking / jumping / sitting / standing / eating / drinking / sleeping / reading / writing). Per Arc 4 Phase 1 Path B finding.

**Wave 2 (vocabulary-acquisition completion — unblocks remaining `identify-and-name-X` targets):**
- Any Class A `EMPTY` clusters from this inventory.
- Any Class A `GAP` clusters from this inventory; complete the cluster.

**Wave 3+ (theme-coverage breadth — supports Class B targets + bundle-curation):**
- Operator-strategic theme expansion against Class B theme-coverage targets.
- Curation-priority themes (per Pillar 2 launch list: back-to-school / Halloween / winter-holidays / Valentine's / end-of-year / unit-review).

---

## Methodology limitations + carry-forwards

1. **Class A cluster map is heuristic.** The `CLUSTER_KEYS` map in `scripts/substrate-gap-inventory.js` encodes operator-strategic-locked cluster compositions for the canonical vocabulary-acquisition domains + auxiliary world-knowledge clusters. The map matches Arc 1-4 authored-package cluster choices (e.g., `pet-animals` matches Arc 4 Phase 1 lock; `vehicles` matches Arc 2 ship). Operator-side cluster-edits during image-authoring wave production update the map and regenerate the inventory.

2. **Class B substrate-readiness is not specific-key-measurable.** Class B targets compose against image-library breadth; substrate-readiness is theme-coverage-measured at material-render time. The inventory records Class B targets without producing key-level gap data; future bundle-curation arcs determine which Class B targets are substrate-ready against which themes.

3. **Class C targets are out of scope.** Phonics / spelling / oral language / text-production / reading-comprehension / abstract-numeric targets do not load-bear against IMAGE_VOCABULARY. The inventory lists them for completeness; image-authoring waves do not action them.

4. **Cross-cluster overlap.** Some keys (e.g., `cat`, `dog`, `apple`, `banana`, `egg`) appear in multiple Class A clusters. The "Top missing IMAGE_VOCABULARY keys" aggregate counts cross-cluster appearances; an authoring wave that adds a missing key closes the gap across all clusters that reference it.

5. **Future inventory regeneration.** This inventory is a snapshot at v3-merge state (2026-05-08; 21 packages authored). Re-run `scripts/substrate-gap-inventory.js` at any future arc closeout to regenerate the markdown against current authored-set + IMAGE_VOCABULARY state. Inventory regeneration produces a fresh substrate-gap snapshot; Stream B is one-shot at v3-merge, but the script remains as standing tooling for any future audit trigger.
