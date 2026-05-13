# Arc 17 commencement — Phase 0 substrate audit

**Commission:** `[ARC-17]` master authoring — Arc 17 commencement toward 203-package C1 SATISFIED threshold
**Baseline commits:** `eb2e9320` (Arc 16 close — 7 packages + 7 pt variants) + `0cda12b8` (Arc 16 P2 close — 180 PDFs deployed + 9 cross-bundle composition entries + SUBSCRIPTION-SCOPE.md amendment)
**Master-package state:** 150 / 203 (73.9%); canonical DRAFT ~150 launch-envelope reached at exact match
**Phase 0 audit date:** 2026-05-13
**Status:** READ-ONLY substrate verification; surfaces for operator inspection before Phase 1.1 commences

---

## §1 — Strand-priority surface analysis

### Canonical taxonomy SoT

`frontend/config/learning-targets.json` is the canonical taxonomy:
- **5 domains × 30 strands × 203 targets** total
- Threshold per strand = `targets.length` per canonical schema

### Per-strand operational saturation

Empirical enumeration of 150 packages × per-package `targetSlug` (matched against canonical taxonomy + rationale-strand-attribution for extensions):

| Domain | Strand | Canonical | Extensions | Total | Threshold | Status |
|---|---|---:|---:|---:|---:|---|
| **early-literacy** | phonological-awareness | 2 | 0 | 2 | 9 | **PARTIAL** (7 left) |
| | letter-recognition | 6 | 0 | 6 | 6 | **SAT** |
| | phonics-decoding | 2 | 1 | 3 | 11 | **PARTIAL** (8 left) |
| | vocabulary-acquisition | 24 | 0 | 24 | 24 | **SAT** |
| | spelling-and-encoding | 2 | 1 | 3 | 5 | **PARTIAL** (2 left) |
| | reading-comprehension | 3 | 0 | 3 | 10 | **PARTIAL** (7 left) |
| | speaking-and-listening | 3 | 0 | 3 | 10 | **PARTIAL** (7 left) |
| | writing-composition | 2 | 1 | 3 | 8 | **PARTIAL** (5 left) |
| | multilingual-language-awareness | 5 | 0 | 5 | 5 | **SAT** |
| **early-numeracy** | counting-and-cardinality | 8 | 4 | 12 | 10 | **SAT** (overshot via extensions) |
| | number-sense-comparison | 2 | 1 | 3 | 6 | **PARTIAL** (3 left) |
| | addition-subtraction | 6 | 3 | 9 | 14 | **PARTIAL** (5 left) |
| | place-value | 0 | 4 | 4 | 3 | **SAT** (extensions overshoot canonical) |
| | measurement | 3 | 2 | 5 | 9 | **PARTIAL** (4 left) |
| | geometry | 4 | 1 | 5 | 8 | **PARTIAL** (3 left) |
| | data-and-graphs | 4 | 0 | 4 | 4 | **SAT** |
| **world-knowledge** | living-things | 6 | 0 | 6 | 6 | **SAT** |
| | environment-and-weather | 4 | 0 | 4 | 4 | **SAT** |
| | community-and-roles | 2 | 1 | 3 | 3 | **SAT** |
| | time-and-routine | 2 | 2 | 4 | 4 | **SAT** |
| | materials-and-properties | 0 | 2 | 2 | 2 | **SAT** |
| | personal-social-emotional-development | 2 | 5 | 7 | 8 | **NEAR** (1 left) |
| **cognitive-EF** | pattern-recognition | 5 | 0 | 5 | 5 | **SAT** |
| | sorting-and-classification | 5 | 0 | 5 | 5 | **SAT** |
| | logical-reasoning | 4 | 0 | 4 | 5 | **NEAR** (1 left) |
| | memory-and-attention | 3 | 0 | 3 | 3 | **SAT** |
| **fine-motor-spatial** | handwriting | 0 | 0 | 0 | 3 | **EMPTY** (3 left) |
| | drawing-and-tracing | 4 | 0 | 4 | 4 | **SAT** |
| | spatial-reasoning | 5 | 0 | 5 | 5 | **SAT** |
| | visual-discrimination | 4 | 0 | 4 | 4 | **SAT** |

**Tally:** 17 SAT + 2 NEAR + 10 PARTIAL + 1 EMPTY = 30 strands; 150 packages classified.

### Doctrine-cross-reference note

SUBSCRIPTION-SCOPE.md reports "16 saturated strands" + per-strand fractions using **operational thresholds** that diverge from canonical-taxonomy thresholds in 5 strands:
- measurement: SUBSCRIPTION-SCOPE.md threshold = 4 (canonical = 9)
- place-value: SUBSCRIPTION-SCOPE.md threshold = 8 (canonical = 3; extensions overshoot)
- PSED: SUBSCRIPTION-SCOPE.md threshold = 6 (canonical = 8)
- comparison (= number-sense-comparison): SUBSCRIPTION-SCOPE.md threshold reported in 11-20 extension framing
- addition-subtraction: matches (canonical 14)

This audit uses **canonical taxonomy thresholds** as authoritative per `frontend/config/learning-targets.json` SoT. Operational divergences carried forward to Phase 6 [DOCS] cycle for doctrine reconciliation. Recent ARC-16 reports of "16 saturated strands" map approximately to this audit's 17 SAT operational count (one-strand discrepancy in counting convention).

### Closeable saturation opportunity surface (Arc 17 Phase 1.1 candidates)

**2 NEAR strands × 1 package each:**
- **personal-social-emotional-development**: 7/8 → 8/8 SAT — pick 1 of 6 unfilled canonical targets (share-and-take-turns / wait-my-turn / make-and-name-a-friend / identify-classroom-rules / identify-safe-vs-unsafe-situations / name-things-i-can-do-myself)
- **logical-reasoning**: 4/5 → 5/5 SAT — author `complete-analogy-image-pair` (the only canonical-target gap)

**Saturation-near-close (2-3 packages each):**
- **spelling-and-encoding**: 3/5 (2 left) — spell-high-frequency-sight-words-tier-2 + spell-words-with-blends + spell-words-with-digraphs
- **counting-and-cardinality**: 12/10 SAT operationally; 2 canonical unfilled (count-by-rote-1-to-100 + skip-count-by-10)

### Foundation-strand advancement surface (5+ strands × multi-package depth)

- **addition-subtraction**: 9/14 (5 canonical left) — 6 canonical unfilled: add-2-digit-without-regrouping + subtract-2-digit-without-regrouping + find-missing-addend-within-10 + fact-families-within-10 + make-10-strategy + add-3-numbers-within-20 + add-2-digit-numbers + subtract-2-digit-numbers
- **place-value**: 4 extensions only; 3 canonical unfilled (decompose-tens-and-ones-within-19 + identify-tens-and-ones-2-digit + compare-2-digit-numbers)
- **measurement**: 5/9 (4 canonical left, including tell-time-to-the-hour/half-hour/quarter-hour + order-3-objects-by-length + identify-coin-values + recognize-money-amounts)
- **geometry**: 5/8 (3 canonical left: compose-shapes-from-parts + identify-symmetry-line + partition-shape-halves-quarters + identify-fractions-half-third-quarter)
- **number-sense-comparison**: 3/6 (3 left: compare-numerals-1-to-10 + use-greater-less-equal-symbols + order-numerals-1-to-10 + find-number-before-after)
- **PSED**: 7/8 — see closeable-near above; further depth requires v2 strand-extension

### Partial-strand status (6+ strands × broader scope; multi-arc)

- phonological-awareness: 2/9 (7 left)
- phonics-decoding: 3/11 (8 left, includes language-family-specific Spanish/Finnish/German/French phonics)
- reading-comprehension: 3/10 (7 left)
- speaking-and-listening: 3/10 (7 left)
- writing-composition: 3/8 (5 left)
- handwriting: 0/3 EMPTY (3 left)

### Empty strand (foundation start required)

- **handwriting** (0/3 EMPTY): canonical targets form-uppercase-letters + form-lowercase-letters + form-numerals-0-to-10. Operational strand-start candidate for Arc 17 Phase 1.4 or 1.5.

---

## §2 — Cross-bundle reuse opportunity inventory

### 14-cluster taxonomy state (post Pillar 2 cycle close)

Per `docs/lesson-plans/pillar-2-cycle-close-out.md` §4 (48 bundles spanning 14+ clusters):

| # | Cluster | Constituent bundles (sample) | Avg-package-reuse | Arc 17 authoring-gap-feasibility |
|---|---|---|---:|---|
| 1 | seasonal | spring/summer/winter/4th-of-july/thanksgiving/easter/christmas | ~4 pkgs/bundle | low — saturated |
| 2 | animal | animals/farm-animals/zoo-animals/pets/birds/ocean-life/forest-creatures/insects/reptiles | ~5 pkgs/bundle | low — saturated |
| 3 | food (daily-life sub-cluster) | breakfast/at-the-supermarket/bakery/desserts-and-sweets/fruits/vegetables/kitchen-tools | ~6 pkgs/bundle | medium — Arc 16 advanced (+9 entries) |
| 4 | cultural-arts (paired-cluster) | music-bundle + activities-bundle | ~3 pkgs/bundle | medium |
| 5 | body-and-self | body-parts/emotions/accessories/clothing | ~5 pkgs/bundle | medium — Arc 16 advanced (PSED) |
| 6 | place-and-context | around-the-house/classroom/hospital/post-office/occupations/beach/camping | ~4 pkgs/bundle | medium — Arc 16 advanced (measure-time) |
| 7 | object-and-tool | tools/toys/furniture/things-that-fly/vehicles | ~4 pkgs/bundle | medium |
| 8 | world-knowledge | dinosaurs/tree/flowers/colors/shapes/space/weather | ~3 pkgs/bundle | medium-high |
| 9-14 | emerging clusters | (paired-cluster + crossover-bundle sub-patterns; cluster names deferred per §A.13.25) | varies | high — sub-pattern emergence area |

### High-reuse-density target slots

Packages most likely to compose into ≥3 bundles on first ship:
- **add-2-digit-without-regrouping** + **subtract-2-digit-without-regrouping** → food-context bundles + classroom-bundle + supermarket (math-application contexts)
- **tell-time-to-the-hour** + **tell-time-to-half-hour** → daily-routine cluster (breakfast-bundle + classroom-bundle + around-the-house-bundle as already-Arc-16-mapped for measure-time-in-hours)
- **complete-analogy-image-pair** (logic close) → cognitive-EF cluster + visual-discrimination/sorting compositions
- **share-and-take-turns** or **wait-my-turn** (PSED close) → emotions-bundle + classroom-bundle

### Paired-cluster + crossover-bundle sub-pattern advancement (per §A.13.25)

- cultural-arts paired-cluster (music + activities) is the canonical reference at 2 bundles; Arc 17 could extend with **dance** or **visual-arts** sub-axes
- Emerging clusters 9-14 (not formally named at Pillar 2 cycle close) may surface naming opportunities through Arc 17 cross-bundle composition advancement

---

## §3 — Per-strand-class composition gate defaults

Per Phase 1.1 §A.13.6-firing-corrected class-conditional pattern (Arc 16 disposition):

| Class | Materials count | Composition |
|---|---:|---|
| **Numeracy** | 7 | flashcards + picture-cards + matching-mat OR place-value-mat (per resolution path §8) + vocabulary-tracing-strips + manipulative-cut-outs + parent-take-home-letter + answer-key |
| **Literacy + Vocabulary** | 8 | flashcards + picture-cards + matching-mat + sentence-strips + vocabulary-tracing-strips + manipulative-cut-outs + parent-take-home-letter + answer-key |
| **World-knowledge** | 7 | flashcards + picture-cards + matching-mat + manipulative-cut-outs + parent-take-home-letter + answer-key + vocabulary-tracing-strips OR sentence-strips per topic-fit |
| **SEL (PSED)** | 6 | flashcards + picture-cards + sentence-strips + manipulative-cut-outs + parent-take-home-letter + answer-key (REMOVE matching-mat + vocabulary-tracing-strips per Arc 16 SEL fan-out disposition) |
| **Geometry/spatial** | 7 | flashcards + picture-cards + matching-mat + manipulative-cut-outs (mode: 2d-cut-outs OR 3d-net) + parent-take-home-letter + answer-key + vocabulary-tracing-strips |
| **Handwriting** | TBD | likely 5-6: flashcards + picture-cards + vocabulary-tracing-strips (primary handwriting material) + manipulative-cut-outs + parent-take-home-letter + answer-key (skip matching-mat + sentence-strips per shape-of-tracing-strips-as-primary) — adjudicate at Phase 1.4/1.5 commencement |

Reference: see canonical existing `package.yaml` examples per class:
- Numeracy: `docs/lesson-plans/packages/add-within-100/package.yaml`
- Literacy: `docs/lesson-plans/packages/identify-letter-sounds-vowels/package.yaml`
- SEL: `docs/lesson-plans/packages/name-and-describe-feelings-detailed/package.yaml`
- Geometry: `docs/lesson-plans/packages/identify-3d-shape-properties/package.yaml`

---

## §4 — Arc 17 candidate package slate (16 packages, ~73.9% → ~81.8%)

Adjudicated per §3.4 cooperation discipline. Slate-shape balances 3 pressures: saturation-closing (visible C4 progress) + foundation-strand depth (numeracy spine) + cluster-taxonomy advancement (cross-bundle reuse density). Per-package entries below; all `language: en`, pt locale variants ship per multi-arc locale cadence.

| # | targetSlug | Strand | Class | Theme axis-key | Phase | Cross-bundle composition |
|---|---|---|---|---|---|---|
| 1 | `complete-analogy-image-pair` | logical-reasoning (4/5 → 5/5 **SAT**) | Cognitive | animals | 1.1 | sort-by-category bundles + visual-discrimination cluster |
| 2 | `share-and-take-turns` | PSED (7/8 → 8/8 **SAT**) | SEL | emotions | 1.1 | emotions-bundle + classroom-bundle |
| 3 | `identify-community-places` | community-and-roles (canonical 2/3 fill) | World-K | community | 1.1 | classroom-bundle + community-cluster |
| 4 | `add-2-digit-without-regrouping` | addition-subtraction | Numeracy | animals | 1.2 | food-context bundles + classroom-bundle |
| 5 | `subtract-2-digit-without-regrouping` | addition-subtraction | Numeracy | animals | 1.2 | food-context bundles + classroom-bundle |
| 6 | `make-10-strategy` | addition-subtraction | Numeracy | fruits | 1.2 | foundational K-3 strategy; cross-arc reuse anchor |
| 7 | `find-missing-addend-within-10` | addition-subtraction | Numeracy | animals | 1.2 | classroom + numeracy puzzles |
| 8 | `decompose-tens-and-ones-within-19` | place-value (canonical fill 0/3 → 1/3) | Numeracy | shapes | 1.3 | place-value cluster; **gated on §8 (C) DEFER** |
| 9 | `identify-tens-and-ones-2-digit` | place-value (1/3 → 2/3) | Numeracy | school-objects | 1.3 | place-value cluster; **gated on §8 (C) DEFER** |
| 10 | `compose-shapes-from-parts` | geometry (5/8 → 6/8) | Geometry | shapes | 1.3 | shapes-bundle + crafts |
| 11 | `identify-symmetry-line` | geometry (6/8 → 7/8) | Geometry | shapes | 1.3 | shapes-bundle + visual-discrimination |
| 12 | `tell-time-to-the-hour` | measurement (canonical fill 5/9 → 6/9) | Numeracy | classroom | 1.4 | breakfast-bundle + classroom-bundle + Arc 16 pair |
| 13 | `tell-time-to-half-hour` | measurement (6/9 → 7/9) | Numeracy | classroom | 1.4 | daily-life cluster |
| 14 | `order-3-objects-by-length` | measurement (7/9 → 8/9) | Numeracy | shapes | 1.4 | measurement-cluster |
| 15 | `form-uppercase-letters` | handwriting (0/3 → 1/3 foundation start) | Handwriting | letters | 1.5 | letter-recognition cluster cross-reference |
| 16 | `identify-main-character` | reading-comprehension (3/10 → 4/10) | Literacy | animals | 1.5 | literacy-cluster |

**Slate target:** 150 → 166 master packages (Arc 17 close).

**Saturation advancement projection:**
- 17 SAT pre-Arc-17 → 19 SAT post-Arc-17 (+logical-reasoning + PSED)
- counting-and-cardinality + community-and-roles + materials-and-properties + place-value remain SAT (no change)
- Foundation strands advance: addition-subtraction 9 → 13/14 (1 left for full canonical saturation); place-value canonical 0 → 2/3; measurement 5 → 8/9; geometry 5 → 7/8
- Handwriting EMPTY → 1/3 (foundation start)
- Reading-comprehension 3 → 4/10 (continuation)

---

## §5 — Phase decomposition

Per Arc 14/15 cadence precedent (15-22 packages × 4 phases). Arc 17 = 16 packages × 5 phases:

### Phase 1.1 — Saturation closing (3 packages)
- complete-analogy-image-pair (logic SAT close)
- share-and-take-turns (PSED SAT close)
- identify-community-places (community-and-roles canonical fill)
- **Rationale:** 2 SAT closures + 1 community fill; high-confidence cadence-setting Phase 1.1; visible C4 advancement (17 SAT → 19 SAT).

### Phase 1.2 — Addition-subtraction continuation (4 packages)
- add-2-digit-without-regrouping
- subtract-2-digit-without-regrouping
- make-10-strategy
- find-missing-addend-within-10
- **Rationale:** strand-depth advancement; addition-subtraction 9 → 13/14; foundational K-3 strategies (make-10 + missing-addend) anchor future mental-math work.

### Phase 1.3 — Place-value + geometry advancement (4 packages)
- decompose-tens-and-ones-within-19 (place-value canonical fill, gated on §8)
- identify-tens-and-ones-2-digit (gated)
- compose-shapes-from-parts
- identify-symmetry-line
- **Rationale:** canonical place-value fills (extensions already overshoot threshold; canonical-1:1 fills strengthen taxonomy alignment); geometry continuation toward saturation.

### Phase 1.4 — Measurement continuation (3 packages)
- tell-time-to-the-hour (canonical 1:1 with Arc 16 measure-time-in-hours extension)
- tell-time-to-half-hour
- order-3-objects-by-length
- **Rationale:** measurement strand 5 → 8/9; tell-time pair anchors daily-routine + classroom-bundle reuse.

### Phase 1.5 — Foundation strand-starts + close-out (2 packages)
- form-uppercase-letters (handwriting EMPTY → 1/3 foundation start)
- identify-main-character (reading-comprehension continuation)
- **Rationale:** opens 2 broad-scope strands for Arc 18-19 multi-arc investment; close-out batch.

### Multi-session ship pattern

Per Arc 14/15/16 precedent:
- Phase 1.1 + 1.2 ship across separate sessions OR paired (operator strategic call)
- Phase 1.3-1.5 each ship per session per CC↔assistant cooperation cadence
- pt locale variants ship continuously per locale-cadence (Arc 17 = 15th consecutive arc per Arc 16 baseline)
- **Arc 17 P2 close-out (separate commission)**: materials mass-run + CDN deploy + cross-bundle composition + SUBSCRIPTION-SCOPE.md amendment per Arc 14/15/16 decoupled-ship pattern

---

## §6 — Forward-pointer queue from Arc 16 close

| # | Item | Source | Disposition for Arc 17 |
|---|---|---|---|
| 1 | place-value-mat generator authoring | `[FEATURE][PILLAR-5]` per §A.13.6 firing #3 | See §8 below — recommend (C) DEFER |
| 2 | F9b deck-card answer-key fan-out | Arc 16 forward-pointer | Operator-coordinated; out-of-scope Arc 17 |
| 3 | F9c canonical-docs catch-up | Arc 16 forward-pointer | Out-of-scope; separate commission |
| 4 | 28+ authoring-drift filings | Arc 16 P2 close-out | Operator-coordinated authoring-cleanup; out-of-scope |
| 5 | Tier 3+4 i18n Wave 3 backlog | Pillar 5 ship state | Continues independent of Arc 17 |
| 6 | SUBSCRIPTION-SCOPE.md canonical reconciliation | §A.8.2 multi-copy doctrine drift | Separate `[CHORE][DOCS]`; out-of-scope |
| 7 | Phase 6 [DOCS] fold cycle | accumulated post-Phase-5 doctrine | Out-of-scope; commission when triggered |
| 8 | C3 NSR-resolution arc | 88+ NSR-flag entries | Gated on native-speaker procurement; out-of-scope |
| 9 | Operational-vs-canonical threshold reconciliation (per §1 of this audit) | This audit | Surface to Phase 6 [DOCS] |

---

## §7 — Phase 1.1 candidate slate (next-session commencement)

**Recommended Phase 1.1 batch (3 packages, saturation-closing, lowest-risk start):**

1. **`complete-analogy-image-pair`** — logical-reasoning 4/5 → 5/5 SAT
   - Class: Cognitive (matching-mat-heavy; analogy = A:B :: C:?)
   - Theme axis-key: `animals` (cross-reuse with Pillar 2 animal-cluster)
   - Cross-bundle: sort-by-category + visual-discrimination cluster compositions
   - Curriculum: CCSS K logic-reasoning extension; EYFS.UW analogical reasoning

2. **`share-and-take-turns`** — PSED 7/8 → 8/8 SAT
   - Class: SEL (6-material per Arc 16 fan-out disposition: skip matching-mat + voc-tracing)
   - Theme axis-key: `emotions` (cross-reuse with emotions-bundle)
   - Cross-bundle: emotions-bundle (composes alongside Arc 16's name-and-describe-feelings-detailed + show-perspective-taking) + classroom-bundle (turn-taking is canonical classroom-routine work)
   - Curriculum: CASEL.SELF_MANAGEMENT + EYFS.PSED.M.R + IB-PYP.WhoWeAre

3. **`identify-community-places`** — community-and-roles canonical 2/3 → 3/3 SAT
   - Class: World-knowledge (7-material)
   - Theme axis-key: `community` OR `occupations` (locations like school, hospital, library, supermarket, fire-station)
   - Cross-bundle: classroom-bundle + at-the-supermarket-bundle + post-office-bundle + occupations-bundle (high-reuse)
   - Curriculum: EYFS.UW.PaW + IB-PYP.WhereWeAreInPlaceAndTime

**Rationale:** 3-strand-saturation in one Phase 1.1 batch is the Arc 14 Phase 1 precedent shape. Closes 2 SAT-near strands + 1 canonical community-and-roles fill. Sets cadence rhythm for Arc 17. Visible C4 advancement: 17 SAT → 19 SAT (+2 strand closures + 1 canonical fill within saturated strand).

**(Optional 4th):** `wait-my-turn` (PSED 8/8 → already SAT; second PSED fill if Phase 1.1 expands to 4 packages) OR defer to Phase 1.5.

---

## §8 — Place-value-mat generator authoring resolution path

**Context:** `generate-place-value-mat.ts` + `place-value-mat-package-loader.ts` + `place-value-mat-render.ts` are ABSENT in `frontend/scripts/`. Referenced by 3 Arc 16 packages (add-within-100 + subtract-within-100 + identify-place-value-hundreds) + 3 Arc 15 packages (tens-and-ones-1-to-20 + 21-to-50 + 51-to-100). Arc 17 Phase 1.3 slate includes 2 more place-value canonical-fill packages (decompose-tens-and-ones-within-19 + identify-tens-and-ones-2-digit) — both would reference place-value-mat per material-composition convention.

**Adjudication options:**

### (A) NEW GENERATOR
Author `generate-place-value-mat.ts` + `place-value-mat-package-loader.ts` + `place-value-mat-render.ts` per Pillar 5 generator scaffold pattern (mirror `generate-matching-mat.ts` shape). Separate `[FEATURE][PILLAR-5]` commission before Arc 17 Phase 1.3 ship.
- **Pros:** maintains pedagogical-anchor intent at authoring time; future-proofs the material; aligns Arc 15/16/17 place-value packages
- **Cons:** new authoring commission inserts ahead of Arc 17 Phase 1.3; ~3-5 sessions estimated per Pillar 5 generator authoring precedent

### (B) MATERIAL SUBSTITUTION
Replace `place-value-mat` material references in Arc 17 place-value packages with:
- `manipulative-cut-outs (mode: base-ten-blocks)` — leverages existing generator; base-ten-blocks mode aligns pedagogically (tens-rods + ones-cubes)
- OR `matching-mat (variant: number-quantity-pairing)` — leverages existing generator; less tactile but supports numeral-quantity matching

Retroactively update Arc 15/16 place-value packages' material lists.
- **Pros:** zero new generator authoring; Arc 17 ships on schedule
- **Cons:** loses place-value-mat-specific tactile pedagogical anchor (the base-ten place-value visual grid is canonical K-3 place-value tooling); retroactive package edits add commission overhead

### (C) DEFER (RECOMMENDED — mirrors Arc 16 disposition)
Arc 17 place-value packages ship with `place-value-mat` material references but flagged for Arc 18+ deploy. Arc 17 P2 close-out mass-run skips place-value-mat consistently (analogous to Arc 16 disposition: 12 deferred PDFs at Arc 16 close; ~8 deferred PDFs at Arc 17 close = 2 packages × 4 locales).
- **Pros:** maintains pedagogical-anchor intent at authoring time; operator-coordinated `[FEATURE][PILLAR-5]` queue advances on its own cadence; cumulative deferred PDFs (~20 across Arc 15+16+17 place-value) collected for single Pillar 5 commission resolution
- **Cons:** continues accumulation of deferred place-value-mat material output; Pillar 5 generator commission grows in scope per arc

**Recommendation: (C) DEFER.** Mirrors Arc 16 disposition; maintains pedagogical authoring intent; keeps Pillar 5 generator queue operator-coordinated per locked discipline. Total deferred PDFs at Arc 17 close projected: 8 (2 packages × 4 locales) on top of Arc 16's deferred 12 PDFs = 20 PDFs cumulative deferred through Arc 17.

**(A) NEW GENERATOR** is operator-override-available if operator strategic direction commences Pillar 5 generator-authoring arc; this would land before Arc 17 Phase 1.3 to ship place-value packages with operational material.

---

## §9 — Verification of Phase 0 deliverable

1. **Strand-inventory completeness**: ✓ 30 strands enumerated per canonical SoT `frontend/config/learning-targets.json`
2. **Cross-bundle reuse density baseline**: ✓ 14-cluster taxonomy state documented per Pillar 2 close-out
3. **Per-package slate completeness**: ✓ 16 entries with strand + class + theme + phase + cross-bundle composition + curriculum-alignment-cue
4. **Phase decomposition coherence**: ✓ 5 phases respect strand/cluster groupings; Phase 1.1 batch self-consistent + saturation-closing precedent-aligned
5. **place-value-mat resolution path explicit**: ✓ (A)/(B)/(C) options with recommendation (C) DEFER + audit trail
6. **Forward-pointer queue complete transfer**: ✓ 9 items from Arc 16 close documented

---

## §10 — Subsequent arc trajectory projection

Arc 17 close: **150 → 166** master packages (~16 packages); 17 SAT → 19 SAT projected
Arc 18 close: ~166 → 183 (~17 packages) — continuation of foundation-strand depth + cluster-taxonomy advancement + broader-scope strand starts (phonological-awareness + phonics-decoding + reading-comprehension)
Arc 19 close: ~183 → 200-203 (~17-20 packages) — reaches **C1 SATISFIED** threshold; completes language-family-specific phonics-decoding strand (Spanish + Finnish + German + French canonical targets); broadens speaking-and-listening + writing-composition + handwriting strands

**Trajectory to C1 SATISFIED:** Arc 19 close at 200-203/203 = 98-100% (full canonical taxonomy realization). Subsequent arcs (Arc 20+) would advance into post-canonical extensions per K-3 multilingual classroom audience-feedback signal.

---

## Appendix: substrate audit empirical sources

- **Canonical taxonomy SoT (machine-readable):** `frontend/config/learning-targets.json` — 30 strands × 203 targets parsed via Node script
- **Canonical taxonomy prose:** `docs/lesson-plans/taxonomy-v1.md`
- **Cluster-taxonomy SoT:** `docs/lesson-plans/pillar-2-cycle-close-out.md` §4 (14+ cluster names + paired-cluster patterns)
- **Existing package enumeration:** 150 of 150 packages classified via `compositionalRationale` rationale-strand attribution + canonical `targetSlug` matching
- **Arc 16 baseline:** `docs/lesson-plans/arc-16-p2-close-out-substrate-audit.md` (canonical Phase 0 doc shape reference) + Arc 16 commit `eb2e9320` + P2 close commit `0cda12b8`
- **SUBSCRIPTION-SCOPE.md state:** `important/SUBSCRIPTION-SCOPE.md` post-Arc-16-P2 amendment (150/203 = 73.9% master + 56 pt + 17 saturation operational + Arc 17 trajectory deferred per locked hybrid framing)
- **Strand classification methodology:** scripted enumeration parsing per-package `targetSlug` (canonical match) + fallback to `compositionalRationale.en` "Primary strand:" attribution for extensions
