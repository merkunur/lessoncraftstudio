# Arc 4 commission spec — continue Track-C-driven localization + deferred vocab packages + numeracy expansion

**Type:** `[BUILD][LESSON-PLANS]` — content authoring (vocab + numeracy + locale variants); no infrastructure work in this arc
**Branch:** `pivot/printable-business-toolkit`
**Estimated phases:** 4 sub-commits
**Estimated LoC:** ~3000-5000 (mostly YAML)
**Estimated sessions:** 3-5

**Status: ratified by operator** — see §9 Authorization for locked ratifications.
**HOLD: Arc 4 commissioning paused until operator confirms parallel-vs-serial decision against operator-side hygiene work** (publishing pass on 3 unpublished English apps: alphabet-train + math-worksheet + prepositions; working-tree cleanup). One operator-message away.

## 1. Context

Arc 3 closed with 6 numeracy packages + sparse-override pattern proven + numeral-cards generator shipped + 4 locale variants (1 es + 3 pt). Arc 4 continues the localization rhythm + addresses Arc 1's deferred-vocab queue + extends numeracy further.

Arc 4 ships:
1. **3 deferred vocabulary packages** (family-members + foods + action-verbs from Arc 1 agent's "save for later" flag). Cultural-variation + verb-form complexity that warranted deferral. Authored with cultural-sensitivity / multilingual-pedagogy expert agent invocation per operator-locked discipline (mirrors Arc 1's pedagogical-curriculum + classroom-teacher agent pattern).
2. **Continue locale-variant authoring** per operator's Track C progression. Single operator-question gates Phase 2 entry (same pattern as Arc 3 Phase 2). **Operator-locked: deferred-vocab packages FOLD INTO Phase 2 locale-variant authoring** — Phase 2 locale-variant set expands from 3 cross-strand defaults (farm-animals + clothing + count-objects-1-to-10) to include 1-2 of the Phase 1 deferred-vocab packages where locale-relevant.
3. **3 additional numeracy packages** (subitize-quantities-1-to-5 + count-on-from-given-number + add-within-5). Builds on Arc 3 numeracy template; closes early-numeracy / counting-and-cardinality strand foundational layer.

Out of scope for Arc 4: Tier 3+ locale variants when operator's Track C reaches Tier 3 (Arc 5+); subscriber UI for browsing packages (Arc 5+); Mac Studio AI enrichment; **NUMBER_WORDS gender-toggle infrastructure work** (operator-locked: deferred to Arc 5 OR a separate [INFRA][LESSON-PLANS] commission between Arc 4 and Arc 5; default Arc 5; escalate to between-arcs commission only if Arc 4 surfaces additional gender-related quality issues that compound).

## 2. Pre-locked architecture (do NOT relitigate)

Per Arc 1 + Arc 2 + Arc 3 ship state. CC adjudicates within these locks.

- Schema: TeachingPackage + BundleTeachingPackage stable.
- Storage convention: docs/lesson-plans/packages/<target-slug>/package.yaml + sparse-override package.<locale>.yaml (Arc 3 Phase 1 pattern).
- Validator contract: frontend/scripts/author-teaching-package.ts; sparse-override merge support; passes unknown fields through.
- Materials catalog: 10 entries (8 generators + numeral-cards from Arc 3 + vocabulary-tracing-strips spec).
- Exercise palette: 29 §14.10 apps unchanged.
- Article auto-resolution: sentence-strips 11-locale FRAME_BY_LOCALE (Romance + Germanic; Nordic NSR-flagged).
- NUMBER_WORDS: 11-locale × 1-20 (masculine/common-gender default per Phase 1 lock).
- 8 MVP generalizations from Arc 1 + cross-strand findings from Arc 2 + sparse-override pattern from Arc 3 (still binding).

## 3. Phase plan

### Phase 1 — 3 deferred vocabulary packages (en authoring; 1 sub-commit)

Author the 3 vocab packages deferred at Arc 1 agent review for cultural-variation + verb-form complexity:

1. identify-and-name-family-members (sensitive: family-structure variation across cultures; agent flagged "single-mother families, blended families, grandparent-as-primary-caregiver families"). 10 vocabulary keys: mother, father, sister, brother, grandmother, grandfather, baby, son, daughter + one inclusive term TBD per agent recommendation.
2. identify-and-name-foods (cultural-variation: meal/snack list varies by culture; pizza is universal but rice/tortilla/bread are region-specific). 10 keys with universal-recognition prioritized.
3. identify-and-name-action-verbs (verb-form complexity: gerund vs imperative vs base form per locale convention; CC adjudicates). 10 keys: run, walk, jump, sit, stand, eat, drink, sleep, read, write — most have IMAGE_VOCABULARY entries.

**Cultural-sensitivity / multilingual-pedagogy expert agent invocation** (operator-locked discipline; mirrors Arc 1's pedagogical-curriculum + classroom-teacher agent pattern). CC + agent adjudicate scenario contexts per package; surface to operator ONLY if specific scenarios warrant operator-strategic ratification (scenarios touching religion, politics, family-structure assumptions where platform policy matters). If surface needed, batch as a single policy-shaped review at Phase 1 entry — not per-scenario.

Each package needs explicit cultural-variation acknowledgment in compositionalRationale field. Per-package agent review APPLIED.

### Phase 2 — Continue locale-variant authoring (gated on operator Track C state; 1 sub-commit)

**Single-question gate before Phase 2 starts:** CC asks operator "What is your worksheet-deck Track C state currently?" Locks the next-locale per SUBSCRIPTION-SCOPE.md sequence. Track C state may advance between Arc 4 commission time and Phase 2 entry depending on operator's English-side authoring rhythm; question is asked at Phase 2 entry, not pre-locked.

Examples (assuming Arc 3 Phase 2 closed at pt):
- If operator Track C now at en + es + pt → next is **it**.
- If at en + es + pt + it → next is **de**.
- If at en + es + pt + it + de → next is **fr**.

**Operator-locked: deferred-vocab fold IN.** Phase 2 locale-variant set EXPANDS from Arc 3 Phase 2's 3-cross-strand default (farm-animals + clothing + count-objects-1-to-10) to include 1-2 of the Phase 1 deferred-vocab packages (family-members / foods / action-verbs) where locale-relevant. CC adjudicates which deferred-vocab packages to include per operator's locale answer + cultural-fit considerations from Phase 1 agent review. Default lean: include family-members + foods (universal-relevance for K-3 home/school bridge); defer action-verbs to Arc 5 if locale-specific verb-form complexity surfaces at Phase 1 authoring.

Total Phase 2 locale-variant count: 4-5 sparse-override files (vs Arc 3 Phase 2's 3).

**Surface trigger:** if folding deferred-vocab grows Phase 2 substantially beyond expected (e.g., Phase 1 cultural-variation surface caused authoring delays that compound at Phase 2), surface size impact and re-adjudicate. Default-fold otherwise.

Phase 2 uses sparse-override pattern from Arc 3 Phase 1.

### Phase 3 — 3 additional numeracy packages (en authoring; 1 sub-commit)

Closing the foundational layer of early-numeracy / counting-and-cardinality strand:

1. subitize-quantities-1-to-5 (recognize small quantities at a glance without counting; foundational K skill).
2. count-on-from-given-number (continue counting from any number without restarting from 1; bridges to addition).
3. add-within-5 (simplest addition target; foundational to add-within-10).

Each follows Arc 3 numeracy template. Cluster agent review.

### Phase 4 — Recon + Arc 5 commission spec (1 sub-commit)

Arc 5 likely scope:
- Continue locale-variant authoring per operator's Track C progression.
- Tier 3+ locale variants (sv/fi/no/da) when operator's Track C reaches Tier 3 — Nordic NSR pass + closing the suffix-article + case-marking architectural gaps from Arc 2.
- NUMBER_WORDS gender-toggle (if not folded into Arc 4 Phase 4).
- Subscriber UI for browsing packages (or Arc 6).
- First non-vocab + non-numeracy strand package (e.g., from PSED or fine-motor-and-visual-spatial strands).

## 4. Adjudication delegations (CC handles without surfacing)

- Per-package vocabulary list (verify all keys against IMAGE_VOCABULARY pre-authoring).
- Cultural-variation phrasings in family-members + foods + action-verbs packages.
- Verb-form choice (gerund vs imperative vs base form) for action-verbs package per CLAUDE.md §17.9 cross-locale teacher-address-register doctrine + locale-natural conventions.
- Numeracy package mirroring of Arc 3 template.
- Sparse-override locale-variant authoring per Arc 3 pattern.
- Per-package agent review depth (cluster review for templated; full review for culturally-sensitive packages + Phase 2 locale variants).
- Commit cadence within phases.

## 5. Surface only at

- Phase 4 commit (Arc 3-style recon + Arc 5 commission spec) — operator ratifies before commissioning Arc 5.
- If anything contradicts Arc 1/2/3 architectural locks — surface early.
- If Phase 1 culturally-sensitive packages surface a substantive cultural-variation issue that requires operator-strategic input.
- If Phase 2 operator-Track-C-state question is needed (single question; lock per answer; proceed).
- If NUMBER_WORDS gender-toggle scope grows substantially beyond expected (operator pre-authorized Arc 4-or-defer; surface if scope blows).

## 6. Verification

### Phase 1 (3 deferred vocab packages)
- All 3 validate clean via Phase 2 CLI.
- Per-package agent review applied + iteration documented.
- Cultural-variation acknowledgment in compositionalRationale field.

### Phase 2 (locale variants)
- 3 sparse-override files validate clean via merge resolution.
- Cluster agent review per locale.

### Phase 3 (3 numeracy packages)
- All 3 validate clean.
- Cluster agent review applied.

### Phase 4
- arc-3-recon.md + arc-4-commission-spec.md (this file) read at handoff.
- arc-4-recon.md + arc-5-commission-spec.md authored.
- Operator ratifies Arc 5 spec.

### Cross-phase
- All commits push to origin.
- Pre-commit hooks pass.
- Git status clean at end of each phase.

## 7. Out of scope (commission-locked)

- Tier 3+ locale variants (Arc 5+).
- Non-vocab + non-numeracy strand packages (Arc 5+).
- Subscriber-facing UI for browsing packages.
- Mac Studio AI enrichment.
- 29/156 plan-count drift reconciliation (still in deferred queue).
- bingo-board, matching-mat-as-new-generator, word-wall, mini-book material additions.

## 8. Doctrine to load before starting Arc 4

- §1, §3.4, §10, §17.9, §A.13.11 (still binding).
- `docs/lesson-plans/arc-1-recon.md` + `arc-2-recon.md` + `arc-3-recon.md` (commission antecedents).
- `frontend/config/learning-targets.json` (Arc 4 Phase 1 + Phase 3 target slugs).
- `frontend/config/materials-catalog.json` (10 entries; Arc 4 may add NUMBER_WORDS gender-toggle parameter to numeral-cards).
- `REFERENCE TRANSLATIONS/material-generator-shared.js` (Arc 3 Phase 1 NUMBER_WORDS resource + sparse-override merge from Arc 3 Phase 1).
- `project_k3_phrasing_native_speaker_review.md` (NSR queue; Arc 4 may resolve some flagged items via NUMBER_WORDS gender-toggle).

## 9. Authorization — operator-ratified locks

Operator ratified all 4 surfaced subjects at Arc 4 commission:

1. **Phase 1 culturally-sensitive scenario contexts: CC adjudicates with cultural-sensitivity / multilingual-pedagogy expert agent.** Same discipline as Arc 1's pedagogical-curriculum + classroom-teacher agent invocations. Operator-side cultural-specificity validation isn't possible without the expert layer. **Surface trigger:** if specific scenario contexts in CC's spec warrant operator-strategic ratification (scenarios touching religion, politics, family-structure assumptions where platform policy matters), surface those as a single batched policy-shaped review at Phase 1 entry — not per-scenario. Otherwise CC + agent adjudicate and proceed.

2. **Phase 2 Track C gate question: CC asks at Phase 2 entry per Arc 3 precedent.** No pre-lock. Same protocol that worked for Arc 3 — Track C state may advance between Arc 4 commission and Phase 2 entry depending on operator's English-side authoring rhythm.

3. **NUMBER_WORDS gender-toggle: defer to Arc 5.** Reasoning: gender-default architectural finding from Arc 3 NSR memory isn't load-bearing yet — surfaces as Romance/Nordic/Finnish localization quality issue but doesn't block authoring. Arc 4 is primarily content authoring; adding infrastructure work mid-content-arc is same anti-pattern as Arc 1 material-deferrals. Right home: Arc 5 if Arc 5 is shaped as infrastructure-sweep, OR a separate `[INFRA][LESSON-PLANS]` commission between Arc 4 and Arc 5. **Default Arc 5; escalate to between-arcs commission only if Arc 4 surfaces additional gender-related quality issues that compound.**

4. **Deferred-vocab fold into Phase 2: FOLD IN.** Reverses the Arc 3-era default of deferring to Arc 4 entry. Reasoning:
   - Vocabulary strand most-validated (no architectural risk)
   - Sparse-override delivering 75% LoC reduction on locale variants → vocab packages are the cheapest packages to author
   - Arc 4 has lighter infrastructure load than Arc 3 (no numeral-cards + sparse-override on the plate), so deferred-vocab fits cleanly

**Surface trigger:** if folding deferred-vocab grows Arc 4 beyond the draft spec (4 phases, 3-5 sessions, ~3000-5000 LoC), surface size impact and re-adjudicate. Default-fold otherwise.

**Surface posture (operator-locked):** Surface only at Arc 4's natural cadence (Phase 4 equivalent) unless one of:
- Phase 1 cultural-sensitivity expert agent surfaces scenarios warranting operator-strategic policy ratification → batched single review at Phase 1 entry.
- Phase 2 Track C gate question (single question at Phase 2 entry; lock per answer; proceed).
- Deferred-vocab fold grows Arc 4 substantially beyond spec → surface size impact, re-adjudicate.
- Architectural issue surfaces during package authoring that warrants pause-and-discuss.

Otherwise autonomous through Phase 4.

## 10. HOLD before Arc 4 commences

**Operator-side hygiene work pending before Arc 4 commissioning is authorized:**

- Publishing pass on 3 unpublished English apps: alphabet-train, math-worksheet, prepositions.
- Working-tree cleanup.

**Two paths operator may authorize:**

A. **Serial:** Arc 4 starts AFTER operator-side hygiene completes. CC waits for operator's "go" message.
B. **Parallel:** Arc 4 starts in parallel with operator-side hygiene IF operator confirms the work is non-conflicting. Arc 4 touches `docs/lesson-plans/` + `frontend/scripts/author-teaching-package.ts` (Phase 4 only if NUMBER_WORDS gender-toggle scoped in — currently deferred per ratification 3 → Arc 4 touches NO infrastructure that would conflict with publish-cli or worksheet-deck publishing).

CC holds Arc 4 commencement until operator confirms parallel-vs-serial decision in a follow-up message.
