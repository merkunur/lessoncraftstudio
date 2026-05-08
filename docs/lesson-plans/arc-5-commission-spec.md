# Arc 5 commission spec — IMAGE_VOCABULARY substrate sweep + family-members + action-verbs authoring + Track-C-driven localization continuation

**Type:** `[BUILD][LESSON-PLANS]` + `[FEATURE][SUBSTRATE]` — substrate-completion + content authoring (paired arc-shape per Arc 4 recon §"Patterns that generalize to Arc 5" item 2)
**Branch:** `pivot/printable-business-toolkit`
**Estimated phases:** 4 sub-commits
**Estimated LoC:** ~3500-5500 (substrate sweep ~1500-2500; content authoring ~2000-3000)
**Estimated sessions:** 4-6 (substrate sweep adds 1-2 sessions vs Arc 4's 3-5)

**Status: DRAFT — operator ratification pending at Phase 4 of Arc 4.**

## 1. Context

Arc 4 closed with 6 new packages (3 deferred-vocab + 3 numeracy) + 3 pt locale variants. The substrate-driven scope pivot at Arc 4 Phase 1 entry deferred 2 originally-spec'd packages (family-members + action-verbs) to Arc 5, paired with a substrate sweep that completes IMAGE_VOCABULARY for those vocab keys.

Arc 5 ships:
1. **Arc 5 Phase 1: IMAGE_VOCABULARY substrate sweep** — extend `REFERENCE TRANSLATIONS/image-vocabulary.js` to cover family-members + action-verbs + gender-data audit for Romance and Nordic locales. **Operator-coordinated** per §3 (operator authorizes vocabulary additions to the canonical file).
2. **Arc 5 Phase 2: family-members + action-verbs vocab packages** authored against the completed substrate. The first content output of Arc 5; deferral chain from Arc 4 Phase 1 closes here.
3. **Arc 5 Phase 3: Continue Track-C-driven locale-variant authoring** per operator's locale state at Phase 3 entry. Single-question gate per Arc 3/Arc 4 precedent.
4. **Arc 5 Phase 4: NUMBER_WORDS gender-toggle infrastructure** OR a 1-package non-vocab non-numeracy strand expansion (operator-strategic choice at Phase 1 ratification time; default to NUMBER_WORDS gender-toggle per Arc 4 §9 ratification 3).

Out of scope for Arc 5: Tier 3+ locale variants when operator's Track C reaches Tier 3 (Arc 6+); subscriber UI for browsing packages (Arc 6+); Mac Studio AI enrichment.

## 2. Pre-locked architecture (do NOT relitigate)

Per Arc 1 + Arc 2 + Arc 3 + Arc 4 ship state. CC adjudicates within these locks.

- Schema: TeachingPackage + BundleTeachingPackage stable.
- Storage convention: docs/lesson-plans/packages/<target-slug>/package.yaml + sparse-override package.<locale>.yaml.
- Validator contract: frontend/scripts/author-teaching-package.ts; sparse-override merge support; passes unknown fields through.
- Materials catalog: 10 entries (8 generators + numeral-cards from Arc 3 + vocabulary-tracing-strips spec).
- Exercise palette: 29 §14.10 apps unchanged.
- Article auto-resolution: sentence-strips 11-locale FRAME_BY_LOCALE.
- NUMBER_WORDS: 11-locale × 1-20 (masculine/common-gender default — Arc 5 Phase 4 may extend with gender-toggle).
- IMAGE_VOCABULARY canonicality: per CLAUDE.md §10.3, modifying `REFERENCE TRANSLATIONS/image-vocabulary.js` requires operator approval. Arc 5 Phase 1 IS that approval — substrate sweep is the explicit purpose of the arc.
- 8 MVP generalizations from Arc 1 + cross-strand findings from Arc 2 + sparse-override pattern from Arc 3 + substrate-audit-as-pre-authoring-gate from Arc 4 (still binding).

## 3. Phase plan

### Phase 1 — IMAGE_VOCABULARY substrate sweep (1 sub-commit; operator-coordinated)

Three parallel substrate extensions to `REFERENCE TRANSLATIONS/image-vocabulary.js`:

**A. family-members substrate (9 keys; 11 locales each):**
- mother / father / sister / brother / grandmother / grandfather / baby / son / daughter
- Per-key per-locale: singular form + plural form + grammatical gender (where the locale grammaticalizes gender).
- One inclusive term TBD per Arc 4 spec §3 Phase 1 (e.g., parent / caregiver / family-member). CC adjudicates phrasing per locale; surface to operator if a particular locale's inclusive-term has policy implications.

**B. action-verbs substrate (10 keys; 11 locales each):**
- run / walk / jump / sit / stand / eat / drink / sleep / read / write
- Per-key per-locale: gerund form + imperative form + base form per locale convention. CC adjudicates form selection per locale per CLAUDE.md §17.9 cross-locale teacher-address-register doctrine + locale-natural conventions.
- 4 keys (run / jump / read / write) currently have IMAGE_VOCABULARY entries as gerunds (running / jumping / reading / writing) — Arc 5 Phase 1 normalizes those to consistent multi-form representation alongside the new keys.

**C. Romance + Nordic gender-data audit:**
- Audit existing IMAGE_VOCABULARY entries for Romance (es / pt / it / fr) and Nordic (sv / da / no) gender consistency. Filed as known-debt at Arc 3 Phase 2 NSR review (`um vaca` should be `uma vaca`; `en hus` should be `et hus`).
- Output: corrected gender data + Phase 4 readiness signal (gender-data must be complete before NUMBER_WORDS gender-toggle ships).

**Operator-coordination boundary:** CC drafts the substrate extensions in a working file (e.g., `REFERENCE TRANSLATIONS/image-vocabulary.js.arc5-draft`); operator reviews + ratifies + applies to the canonical file. CC does NOT push directly to origin until operator confirms the draft. This protects the §10.3 "never modify image-vocabulary directly without operator approval" rule.

### Phase 2 — family-members + action-verbs vocab packages (en authoring; 1 sub-commit)

Authored against the Phase 1 completed substrate. The first content output of Arc 5; closes the Arc 4 Phase 1 deferral chain.

1. **identify-and-name-family-members** (sensitive: family-structure variation per Arc 4 Phase 1 spec). 9 vocab keys + 1 inclusive term from Phase 1. Cultural-variation acknowledgment in compositionalRationale field per Arc 4 Phase 1 discipline; full agent review (NOT cluster review) per Arc 4 recon §"What didn't" item 5 — family-members was flagged at Arc 4 as the touch-point where family-structure assumptions warrant operator-strategic surface if specific scenarios surface.
2. **identify-and-name-action-verbs** (verb-form complexity per Phase 1). 10 vocab keys; per-locale form selection adjudicated at Phase 1 substrate authoring.

Each package follows Arc 4 vocab template (5 composedExercises + 8 materials + cultural-variation acknowledgment + assessmentCriteria with K-3 differentiation + K-3 curriculum standards).

**Surface trigger:** if family-members agent review surfaces specific scenarios touching religion, politics, or family-structure assumptions where platform policy matters, batch as a single policy-shaped review for operator. Otherwise CC + agent adjudicate and proceed.

### Phase 3 — Continue locale-variant authoring (gated on operator Track C state; 1 sub-commit)

**Single-question gate before Phase 3 starts:** CC asks operator "What is your worksheet-deck Track C state currently?" Locks the next-locale per SUBSCRIPTION-SCOPE.md sequence. Same pattern as Arc 3 Phase 2 + Arc 4 Phase 2.

Examples (assuming Arc 4 Phase 2 closed at pt):
- If operator Track C now at en + es + pt → next is **it**.
- If at en + es + pt + it → next is **de** OR **fr** depending on Tier 1+2 sequencing.
- If at Tier 3 (sv / fi / no) → Tier-3 NSR pass kicks in (per CLAUDE.md §17.5).

**Operator-locked: deferred-vocab fold IN per Arc 4 ratification 4 precedent.** Phase 3 locale-variant set EXPANDS from a 3-cross-strand default to include 1-2 of the Phase 2 family-members + action-verbs packages where locale-relevant. CC adjudicates which to include per operator's locale answer + Phase 1 substrate completion + Phase 2 cultural-fit considerations.

Total Phase 3 locale-variant count: 4-5 sparse-override files (matches Arc 4 Phase 2's 3 + Phase 2 fold-in pattern).

Phase 3 uses sparse-override pattern from Arc 3 Phase 1.

### Phase 4 — NUMBER_WORDS gender-toggle OR non-vocab non-numeracy strand expansion (1 sub-commit; operator-strategic choice)

**Operator-strategic choice at Phase 1 ratification:**

**Option A (default per Arc 4 §9 ratification 3):** NUMBER_WORDS gender-toggle infrastructure on numeral-cards material. Closes Romance gender-mismatch (`um vaca` → `uma vaca`) + Nordic gender-mismatch (`en hus` → `et hus`) for K-3-quality numeral rendering. Touches:
- `REFERENCE TRANSLATIONS/material-generator-shared.js` (NUMBER_WORDS resource extension; localizedNumberWord helper extension to accept gender param).
- `frontend/config/materials-catalog.json` (numeral-cards entry adds `numberGender` parameter).
- `frontend/scripts/author-teaching-package.ts` validation extension.
- Per-package customizationParameters audit (where numeral-cards is used; Arc 3 + Arc 4 numeracy packages).

**Option B (escalation lane):** First non-vocab non-numeracy strand package (e.g., from PSED / social-emotional or fine-motor-and-visual-spatial strands per `frontend/config/learning-targets.json`). Validates the architecture beyond vocab + numeracy strands. Authoring + cultural-variation acknowledgment + agent review.

**Default Option A** unless operator surfaces strategic reason for Option B at ratification.

## 4. Adjudication delegations (CC handles without surfacing)

- Per-key vocabulary list at Phase 1 substrate (verify all keys are absent + add the right number of forms per locale convention).
- Cultural-variation phrasings in family-members package (sensitive: family-structure variation across cultures).
- Verb-form choice (gerund vs imperative vs base form) for action-verbs per locale convention + CLAUDE.md §17.9 doctrine.
- Sparse-override locale-variant authoring per Arc 3+4 pattern.
- NUMBER_WORDS gender-toggle parameter naming + default value selection.
- Per-package agent review depth (full review for family-members; cluster review for action-verbs templated; cluster review for Phase 3 locale variants).
- Commit cadence within phases.

## 5. Surface only at

- Phase 1 substrate sweep needs operator authorization to apply changes to canonical `REFERENCE TRANSLATIONS/image-vocabulary.js` (per CLAUDE.md §10.3). CC drafts; operator applies.
- Phase 2 family-members agent review surfaces scenarios warranting operator-strategic policy ratification (religion, politics, family-structure assumptions where platform policy matters) → batched single review.
- Phase 3 Track C gate question (single question at Phase 3 entry; lock per answer; proceed).
- Phase 4 Option A vs Option B at Phase 1 ratification.
- Phase 4 commit (Arc 4-style recon + Arc 6 commission spec) — operator ratifies before commissioning Arc 6.
- If anything contradicts Arc 1/2/3/4 architectural locks — surface early.
- If Phase 1 substrate sweep grows substantially beyond expected (e.g., Romance gender-data audit reveals systemic data-quality gap that compounds across many keys) → surface size impact and re-adjudicate.

## 6. Verification

### Phase 1 (substrate sweep)
- IMAGE_VOCABULARY draft file passes substrate-audit script (CC writes audit script if not yet present).
- Operator ratifies + applies draft to canonical file.
- Romance + Nordic gender-data audit produces corrected entries documented in arc-5-recon.md.

### Phase 2 (family-members + action-verbs)
- Both validate clean via author-teaching-package CLI.
- family-members full agent review applied + iteration documented.
- action-verbs cluster agent review applied.
- Cultural-variation acknowledgments in compositionalRationale fields.

### Phase 3 (locale variants)
- 3-5 sparse-override files validate clean via merge resolution.
- Cluster agent review per locale (re-review only if new register-shift surface).

### Phase 4 (Option A or B)
- **Option A:** numeral-cards material renders with gender-correct number words across Romance + Nordic locales. NUMBER_WORDS gender-toggle parameter validated. All Arc 3 + Arc 4 numeracy package customizationParameters audited.
- **Option B:** 1 strand-expansion package validates clean; cluster agent review applied; cultural-variation acknowledgment present.

### Cross-phase
- All commits push to origin clean.
- Pre-commit hooks pass.
- Git status clean at end of each phase.
- arc-4-recon.md + arc-5-commission-spec.md (this file) read at handoff.
- arc-5-recon.md + arc-6-commission-spec.md authored at Phase 4.

## 7. Out of scope (commission-locked)

- Tier 3+ locale variants except as Phase 3 organic extension (Arc 6+ if Track C reaches Tier 3).
- Subscriber-facing UI for browsing packages.
- Mac Studio AI enrichment.
- 29/156 plan-count drift reconciliation.
- bingo-board, matching-mat-as-new-generator, word-wall, mini-book material additions.
- Numeral-tracing-strips variant of vocabulary-tracing-strips (Arc 6+ candidate).
- Sparse-override extension for composedExercises + materials per-element field-overrides (Arc 6+ candidate).
- App-side modifications (per CLAUDE.md §3.2).
- More than 1 strand-expansion package in Phase 4 (single-package gate; further expansion is Arc 6+).

## 8. Doctrine to load before starting Arc 5

- §1, §3.4, §10.3, §17.9, §A.13.6, §A.13.11 (still binding).
- `docs/lesson-plans/arc-1-recon.md` + `arc-2-recon.md` + `arc-3-recon.md` + `arc-4-recon.md` (commission antecedents).
- `frontend/config/learning-targets.json` (Arc 5 Phase 2 + Phase 4 target slugs if Option B).
- `frontend/config/materials-catalog.json` (numeral-cards entry; Arc 5 Phase 4 may extend with numberGender parameter).
- `frontend/lib/exercise-palette.json` (canonical app modes + customization parameters; pre-read at first cross-app composition per Arc 4 recon discipline).
- `REFERENCE TRANSLATIONS/material-generator-shared.js` (NUMBER_WORDS resource; Arc 5 Phase 4 Option A extension).
- `REFERENCE TRANSLATIONS/image-vocabulary.js` (Arc 5 Phase 1 substrate-sweep target; operator-coordinated edits per §10.3).
- `project_k3_phrasing_native_speaker_review.md` (NSR queue; Arc 5 may resolve some flagged items via NUMBER_WORDS gender-toggle + IMAGE_VOCABULARY gender-audit).
- `project_brief_a_translation_debt.md` (translation-debt cross-reference; gender-data audit cohort).

## 9. Authorization — operator ratification surface

Operator ratifies these locks at Arc 4 Phase 4 (this commit) before Arc 5 commences:

1. **Substrate sweep operator-coordination boundary:** CC drafts in working file (e.g., `image-vocabulary.js.arc5-draft`); operator reviews + ratifies + applies to canonical file. CC does NOT push directly. **Surface:** operator confirms this draft-then-apply protocol matches preferred operator-coordination shape.

2. **family-members agent review depth:** full agent review (NOT cluster) per Arc 4 recon §"What didn't" item 5 flag. Surface trigger: scenarios touching religion, politics, family-structure assumptions where platform policy matters → batched single review. **Surface:** operator confirms full-review + surface-trigger discipline.

3. **Phase 4 Option A vs Option B:** default Option A (NUMBER_WORDS gender-toggle) per Arc 4 §9 ratification 3. **Surface:** operator confirms Option A OR escalates to Option B at Phase 1 ratification.

4. **Phase 3 deferred-vocab fold-in:** family-members + action-verbs fold into Phase 3 locale variants where locale-relevant per Arc 4 ratification 4 precedent. **Surface:** operator confirms fold-in pattern carries forward.

5. **Surface posture:** Surface only at Arc 5's natural cadence (Phase 4 equivalent) unless one of the Phase 1/2/3 surface triggers fires. Otherwise autonomous through Phase 4.

## 10. Deferral-chain audit-trail (Arc 4 → Arc 5)

Arc 4 Phase 1 deferred 2 originally-spec'd packages to Arc 5 via Path B substrate-driven scope pivot:

- **family-members** — IMAGE_VOCABULARY substrate gap (8/9 spec keys MISSING). Arc 5 Phase 1 substrate sweep covers; Arc 5 Phase 2 authors against completed substrate.
- **action-verbs** — IMAGE_VOCABULARY substrate gap (0/10 base forms; only 4 gerunds present). Arc 5 Phase 1 substrate sweep covers; Arc 5 Phase 2 authors against completed substrate.

This deferral chain is explicit in arc-4-recon.md §"Deliverables shipped" Phase 1 entry and §"What surprised" item 1. The Arc 5 spec preserves the chain so it doesn't get lost across commission boundaries.

The chain validates the **substrate-completion + content-against-completed-substrate** pairing pattern (Arc 4 recon §"Patterns that generalize to Arc 5" item 2) as the right shape when prior content-arc surfaced substrate gaps.
