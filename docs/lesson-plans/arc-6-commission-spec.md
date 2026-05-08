# Arc 6 commission spec — strand-volume content authoring + family-members + action-verbs (Arc 4→5 deferral chain closure)

**Type:** `[BUILD][LESSON-PLANS]` — content authoring (vocab + numeracy + cognitive + cross-strand expansion); no infrastructure work in this arc unless Stream A Phase 1 substrate sweep hasn't shipped by Arc 6 commencement
**Branch:** `pivot/printable-business-toolkit`
**Estimated phases:** 4 sub-commits
**Estimated LoC:** ~3000-5000 (mostly YAML)
**Estimated sessions:** 3-5

**Status: DRAFT — operator ratification pending at Arc 5 Phase 4 close.**

## 1. Context

Arc 5 closed at Phase 3 with 5-of-5 domain coverage (cross-strand validation milestone per §A.14 scaling-checkpoint discipline). Master-package count 21 → 34 across 13 cross-strand-spread packages. Stream B substrate-gap-inventory shipped as standing tool; Wave 1 image authoring decoupled and operator-pace; Stream A Phase 1 substrate sweep continues post-Arc-5 ship.

Arc 6 ships:
1. **Family-members + action-verbs packages** (Arc 4→5 deferral chain closure). Authored against completed Stream A Phase 1 substrate (NUMBER_WORDS gender-toggle + IMAGE_VOCABULARY family-members + action-verbs extension + Romance/Nordic gender-data audit) when that ships, OR rerouted again if Stream A Phase 1 substrate sweep hasn't completed by Arc 6 commencement.
2. **Strand-volume content authoring.** With 5-of-5 domain coverage validated at Arc 5, Arc 6 can commit strand-volume work — author 6-10 packages within a single strand (e.g., vocabulary-acquisition depth: more identify-and-name-X clusters; or cognitive-and-executive-function depth: sort-by-size + sort-by-category + sort-by-multiple-attributes + complete-AB-pattern + complete-AAB-ABB-patterns + solve-6×6-picture-sudoku).
3. **Continued Track-C-driven locale-variant authoring.** Single-question gate at Phase 3 entry per Arc 3+4 precedent; operator's worksheet-deck Track C state determines next-locale.
4. **Class A GAP package authoring** for any GAP packages whose substrate gaps have closed via Wave 1 integration commissions between Arc 5 ship and Arc 6 commencement.

Out of scope for Arc 6: Tier 3+ locale variants when operator's Track C reaches Tier 3 (Arc 7+); subscriber UI for browsing packages (Arc 7+); Mac Studio AI enrichment.

## 2. Pre-locked architecture (do NOT relitigate)

Per Arc 1 + Arc 2 + Arc 3 + Arc 4 + Arc 5 ship state. CC adjudicates within these locks.

- Schema: TeachingPackage + BundleTeachingPackage stable per `9ba9fa2d` + `3b33fe1d` + `20260504081907_add_bundle_schema`.
- Storage convention: docs/lesson-plans/packages/<target-slug>/package.yaml + sparse-override package.<locale>.yaml.
- Validator contract: frontend/scripts/author-teaching-package.ts; sparse-override merge support; passes unknown fields through.
- Materials catalog: 10 entries. Valid pedagogicalRoles per Arc 5 Phase 3 validation discovery: vocabulary-anchor / vocabulary-game / language-frame / teacher-reference / home-school-bridge / production-prompt / concrete-manipulative / math-and-categorization-support.
- Exercise palette: 29 §14.10 apps unchanged.
- Article auto-resolution: sentence-strips 11-locale FRAME_BY_LOCALE.
- NUMBER_WORDS: 11-locale × 1-20 (masculine/common-gender default; gender-toggle extension is Stream A Phase 1 territory).
- Sparse-override pattern from Arc 3 Phase 1 + substrate-audit-at-arc-commencement discipline from Arc 4 Path B + Arc 5 cross-strand spread pattern (still binding).
- v3 SUBSCRIPTION-SCOPE.md 6-condition launch-trigger framework (canonical at `3f46b846`).

## 3. Phase plan

### Phase 1 — family-members + action-verbs OR strand-volume vocab-expansion (1 sub-commit)

**Triage at Phase 1 entry:** check whether Stream A Phase 1 substrate sweep has shipped (operator-coordinated apply to canonical IMAGE_VOCABULARY).

**Path A (substrate ready):** Author identify-and-name-family-members + identify-and-name-action-verbs against completed substrate. Per Arc 5 ratification 2: family-members gets **FULL agent depth** (cultural-sensitivity + multilingual-pedagogy agent covering family-structure cultural variation across 11 locales + gendered-vs-gender-neutral term selection + extended-family inclusion + diverse-family-structure inclusion per locale norms). Surface trigger: scenarios touching religion / politics / family-structure assumptions where platform policy matters → batched single review. Action-verbs: cluster review (verb-form complexity per locale convention; CC adjudicates per CLAUDE.md §17.9 + locale-natural conventions).

**Path B (substrate not ready):** strand-volume vocab-expansion. Author 4-6 receptive-variant packages (point-to-named-zoo-animal + point-to-named-color + point-to-named-vehicle + point-to-named-clothing-item — all CLEAN-substrate per Stream B inventory). Plus 1-2 additional strand-volume vocab packages that became available via Wave 1 integration commissions between Arc 5 ship and Arc 6 commencement (whichever Class A GAP clusters had their substrate gaps closed).

**Decision rubric:** Stream A Phase 1 substrate sweep status checked at Phase 1 entry; surface to operator if path is unclear; otherwise CC adjudicates and proceeds.

### Phase 2 — strand-volume content authoring (1 sub-commit)

Now that 5-of-5 domain coverage is validated, Arc 6 can commit strand-volume work. Phase 2 selects ONE strand and authors 6-10 packages within it, validating that strand-volume scales without architectural debt.

**Recommended strand options (operator strategic choice at Phase 1 ratification):**

- **Option A — vocabulary-acquisition depth (early-literacy domain):** 6-10 receptive-variant + cluster-extension packages. Builds on Arc 5 Phase 3's receptive-pairing pattern. Lower risk; deeper validation of vocabulary architecture.
- **Option B — cognitive-and-executive-function depth:** 6-10 cognitive packages (sort-by-size + sort-by-category + sort-by-multiple-attributes + complete-AB-pattern + complete-AAB-ABB-patterns + solve-6×6-picture-sudoku + identify-AB-pattern + identify-ABC-pattern). Medium risk; expands the cognitive domain validated in Arc 5 Phase 3.
- **Option C — early-numeracy depth:** 6-10 numeracy packages including remaining counting-and-cardinality + addition-subtraction targets + early geometry expansion. Builds on Arc 3 + Arc 5 numeracy work.
- **Option D — world-knowledge depth:** 6-10 world-knowledge packages (identify-four-seasons + describe-day-night-cycle + describe-water-cycle-basic + identify-community-helpers + identify-community-places + sequence-daily-routine — substrate-readiness varies; check Stream B inventory at Phase 1 entry).

Default Option A unless operator surfaces strategic reason for B/C/D at ratification.

### Phase 3 — Continue locale-variant authoring (gated on operator Track C state; 1 sub-commit)

Single-question gate at Phase 3 entry: CC asks operator "What is your worksheet-deck Track C state currently?" Locks the next-locale per SUBSCRIPTION-SCOPE.md sequence. Same pattern as Arc 3 Phase 2 + Arc 4 Phase 2.

**Phase 3 locale-variant set:** 4-6 sparse-override files. Selection per Arc 4 ratification 4 fold-in pattern: include 1-2 of the Phase 1 vocab packages (family-members / action-verbs) where locale-relevant; include cross-strand variety (geometry + cognitive + world-knowledge sparse-overrides per locale-fit considerations).

Phase 3 uses sparse-override pattern from Arc 3 Phase 1.

### Phase 4 — recon + Arc 7 commission spec (1 sub-commit)

Authors `arc-6-recon.md` + `arc-7-commission-spec.md`. Arc 7 spec scopes:
- **Continued strand-volume authoring** in remaining strands not covered in Arc 6 Phase 2.
- **Class A GAP package authoring** for additional packages whose substrate gaps closed via Wave 1+ integration.
- **Continued Track-C-driven localization.**
- **NSR-resolution arc commissioning** if Arc 5+6 accumulated substantial NSR-flagged content.
- **Pillar 2 bundle-curation arc** when ≥50 master packages exist (per v3 SUBSCRIPTION-SCOPE.md §6); Arc 6 closes near or past this threshold (34 + 6-10 + 0 + 4-6 = 44-50 packages projected at Arc 6 ship).

## 4. Adjudication delegations (CC handles without surfacing)

- Path A vs Path B selection at Phase 1 entry (substrate-readiness check).
- Per-package vocabulary list verification against IMAGE_VOCABULARY pre-authoring.
- Cultural-variation phrasings in family-members + action-verbs packages.
- Verb-form choice (gerund vs imperative vs base form) for action-verbs per locale convention + §17.9 doctrine.
- Per-strand depth template selection at Phase 2 (which packages within Options A/B/C/D).
- Sparse-override locale-variant authoring per Arc 3+4+5 pattern.
- Per-package agent review depth (full review for family-members; cluster review for templated packages).
- Commit cadence within phases.

## 5. Surface only at

- Phase 1 entry: surface Path A vs Path B decision if substrate-readiness check is ambiguous (Stream A Phase 1 status genuinely unclear at Arc 6 commencement).
- Phase 1 family-members agent review surfaces scenarios warranting operator-strategic policy ratification → batched single review.
- Phase 2 ratification: surface strand-depth Option A/B/C/D for operator strategic choice.
- Phase 3 Track C gate question (single question at Phase 3 entry; lock per answer; proceed).
- Phase 4 commit (arc-6-recon.md + arc-7-commission-spec.md) — operator ratifies before commissioning Arc 7.
- If anything contradicts Arc 1-5 architectural locks — surface early.
- If Phase 2 strand-depth authoring grows substantially beyond expected (e.g., novel architectural finding within the chosen strand) → surface size impact and re-adjudicate.

## 6. Verification

### Phase 1 (family-members + action-verbs OR vocab-expansion)
- All authored packages validate clean via author-teaching-package CLI.
- family-members full agent review applied + iteration documented (Path A only).
- Cultural-variation acknowledgment in compositionalRationale fields.

### Phase 2 (strand-volume)
- 6-10 packages validate clean.
- Strand-internal architectural consistency: packages within the chosen strand share template patterns (e.g., 5 composedExercises + 7-8 materials + cluster-cohesive compositionalRationale).

### Phase 3 (locale variants)
- 4-6 sparse-override files validate clean via merge resolution.
- Cluster agent review per locale (re-review only if new register-shift surface).

### Phase 4
- arc-5-recon.md + arc-6-commission-spec.md (this file) read at handoff.
- arc-6-recon.md + arc-7-commission-spec.md authored.
- Operator ratifies Arc 7 spec.

### Cross-phase
- All commits push to origin clean.
- Pre-commit hooks pass.
- Git status clean at end of each phase.

## 7. Out of scope (commission-locked)

- Tier 3+ locale variants except as Phase 3 organic extension (Arc 7+ if Track C reaches Tier 3).
- Subscriber-facing UI for browsing packages.
- Mac Studio AI enrichment.
- 29/156 plan-count drift reconciliation.
- bingo-board, matching-mat-as-new-generator, word-wall, mini-book material additions.
- Numeral-tracing-strips variant of vocabulary-tracing-strips (Arc 7+ candidate).
- Sparse-override extension for composedExercises + materials per-element field-overrides (Arc 7+ candidate).
- App-side modifications (per CLAUDE.md §3.2).
- Bundle-curation arc + free-tier-curation arc (deferred to Arc 7+ per v3 §6).
- More than 1 strand-depth selection in Phase 2 (single-strand gate; further strand-volume work in Arc 7+).

## 8. Doctrine to load before starting Arc 6

- §1, §3.4, §10.3, §17.9, §A.13.6, §A.13.11, §A.14 (still binding).
- `docs/lesson-plans/arc-1-recon.md` + `arc-2-recon.md` + `arc-3-recon.md` + `arc-4-recon.md` + `arc-5-recon.md` (commission antecedents).
- `docs/lesson-plans/substrate-gap-inventory.md` (Stream B inventory; reference at Phase 1 entry to identify Class A GAP packages whose substrate has closed via Wave 1 integration).
- `frontend/config/learning-targets.json` (target slugs).
- `frontend/config/materials-catalog.json` (10 entries; valid pedagogicalRoles enum per Arc 5 Phase 3 discovery).
- `frontend/lib/exercise-palette.json` (canonical app modes + customization parameters; pre-read at first cross-app composition per Arc 4-5 authoring discipline).
- `REFERENCE TRANSLATIONS/material-generator-shared.js` (NUMBER_WORDS resource + sparse-override merge).
- `REFERENCE TRANSLATIONS/image-vocabulary.js` (current state; check Stream A Phase 1 substrate sweep apply status at Arc 6 commencement).
- `project_k3_phrasing_native_speaker_review.md` (NSR queue; Arc 6 may add or close NSR-flagged items).
- `docs/SUBSCRIPTION-SCOPE.md` (v3 canonical; reference for launch-trigger framework + Pillar 2 reframe + authoring envelope).

## 9. Authorization — operator ratification surface

Operator ratifies these locks at Arc 5 Phase 4 (this commit) before Arc 6 commences:

1. **Phase 1 path triage protocol:** CC adjudicates Path A vs Path B at Phase 1 entry based on Stream A Phase 1 substrate-readiness check. **Surface:** operator confirms CC adjudicates without batched review unless ambiguous.

2. **family-members agent depth (Path A):** full agent depth per Arc 5 ratification 2 (continues forward). Surface trigger: scenarios touching religion/politics/family-structure assumptions where platform policy matters → batched single review. **Surface:** operator confirms full-review + surface-trigger discipline carries forward.

3. **Phase 2 strand-depth choice:** Operator selects Option A (vocabulary-acquisition depth, default), Option B (cognitive-and-executive-function depth), Option C (early-numeracy depth), OR Option D (world-knowledge depth) at Phase 1 ratification.

4. **Phase 3 deferred-vocab fold-in:** family-members + action-verbs (or other Phase 1 packages) fold into Phase 3 locale variants where locale-relevant per Arc 4-5 ratification precedent. **Surface:** operator confirms fold-in pattern carries forward.

5. **Surface posture:** Surface only at Arc 6's natural cadence (Phase 4 equivalent) unless one of the Phase 1/2/3 surface triggers fires. Otherwise autonomous through Phase 4.

## 10. Deferral-chain audit-trail (Arc 4 → Arc 5 → Arc 6)

The deferral chain extends across multiple arcs:

- **Arc 4 Phase 1** deferred family-members + action-verbs to Arc 5 via Path B substrate-driven scope pivot. Reason: IMAGE_VOCABULARY substrate gap (8/9 family-members keys MISSING; 0/10 action-verbs base forms — only 4 gerunds present).
- **Arc 5 Phase 1** specced family-members + action-verbs against completed Phase 1 substrate (NUMBER_WORDS gender-toggle + IMAGE_VOCABULARY extension + Romance/Nordic gender-data audit). Course correction at Arc 5 mid-arc: Wave 1 image authoring decoupled from Arc 5 forward motion; family-members + action-verbs re-routed to Arc 6 Phase 1 OR whenever Wave 1.1+1.2 integrates (whichever later).
- **Arc 6 Phase 1** authors family-members + action-verbs against completed Stream A Phase 1 substrate (Path A) OR continues vocab-expansion against substrate-clean targets (Path B) if substrate sweep hasn't shipped.

The deferral chain validates the **substrate-completion + content-against-completed-substrate** pairing pattern (per Arc 5 recon §"Patterns that generalize to Arc 6" item 1) — substrate sweep precedes content authoring at the right granularity. This is a doctrine-class pattern; surfaces to CLAUDE.md §A.13 fold candidates at next [DOCS] cycle.
