# Arc 4 commission spec — continue Track-C-driven localization + deferred vocab packages + numeracy expansion

**Type:** `[BUILD][LESSON-PLANS]` — content authoring (mostly) + small infra hygiene (NUMBER_WORDS gender-toggle if operator prioritizes)
**Branch:** `pivot/printable-business-toolkit`
**Estimated phases:** 4 sub-commits
**Estimated LoC:** ~3000-5000 (mostly YAML; small TS for NUMBER_WORDS gender-toggle if scoped in)
**Estimated sessions:** 3-5

This is a draft spec. Operator ratifies / revises before commissioning Arc 4.

## 1. Context

Arc 3 closed with 6 numeracy packages + sparse-override pattern proven + numeral-cards generator shipped + 4 locale variants (1 es + 3 pt). Arc 4 continues the localization rhythm + addresses Arc 1's deferred-vocab queue + extends numeracy further.

Arc 4 ships:
1. **Continue locale-variant authoring** per operator's Track C progression. Single operator-question gates Phase 2 entry (same pattern as Arc 3 Phase 2).
2. **3 deferred vocabulary packages** (family-members + foods + action-verbs from Arc 1 agent's "save for later" flag). Cultural-variation + verb-form complexity that warranted deferral.
3. **3 additional numeracy packages** (subitize-quantities-1-to-5 + count-on-from-given-number + add-within-5). Builds on Arc 3 numeracy template; closes early-numeracy / counting-and-cardinality strand foundational layer.
4. **Optional: NUMBER_WORDS gender-toggle** (if operator prioritizes; closes Romance + Nordic gender-mismatch architectural gap from Arc 3 Phase 2 review). Defer if Arc 4 scope tight.

Out of scope for Arc 4: Tier 3+ locale variants when operator's Track C reaches Tier 3 (Arc 5+); subscriber UI for browsing packages (Arc 5+); Mac Studio AI enrichment.

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

Per agent's deferral notes: each package needs explicit cultural-variation acknowledgment in compositionalRationale field + extra agent review attention for cultural-fit (operator may want operator-specified scenario context: "international school in Berlin with Turkish + Arabic-speaking families" vs "US ELL bilingual classroom with Mexican-immigrant families").

**Per-package agent review APPLIED for these 3 packages** (operator's "extra attention" framing for cross-strand prototype extends to culturally-sensitive packages).

### Phase 2 — Continue locale-variant authoring (gated on operator Track C state; 1 sub-commit)

**Single-question gate before Phase 2 starts:** CC asks operator "What is your worksheet-deck Track C state currently?" Locks the next-locale per SUBSCRIPTION-SCOPE.md sequence.

Examples (assuming Arc 3 Phase 2 closed at pt):
- If operator Track C now at en + es + pt → next is **it**.
- If at en + es + pt + it → next is **de**.
- If at en + es + pt + it + de → next is **fr**.

CC adjudicates 3-package selection per locale. Default mirrors Arc 3 Phase 2: farm-animals + clothing + count-objects-1-to-10 (cross-strand validation). Operator may override at Track C question time + may also include 1-2 deferred-vocab packages from Phase 1 if locale-relevant.

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

## 9. Authorization

This is a draft commission spec. Operator reviews + ratifies (or revises) before commissioning Arc 4 to a future session.

Subjects to surface for ratification before Arc 4 starts:

- **Phase 1 culturally-sensitive package authoring scenarios** — operator selects target classroom contexts for the 3 deferred-vocab packages: family-members (international-school multilingual vs US bilingual etc.), foods (universal vs region-specific), action-verbs (verb-form convention).
- **Phase 2 locale-variant order** — gated on operator Track C state question; CC asks at Phase 2 entry per Arc 3 precedent.
- **NUMBER_WORDS gender-toggle in Arc 4 vs defer to Arc 5** — operator pre-authorized Arc 4-or-defer decision; ratify at commission time.
- **Optional: 1-2 deferred-vocab packages folded into Phase 2 locale-variant authoring** if locale-relevant (CC default: Phase 2 locales the same 3 cross-strand packages as Arc 3; operator may add deferred-vocab if desired).
