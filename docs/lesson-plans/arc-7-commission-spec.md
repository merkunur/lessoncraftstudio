# Arc 7 commission spec — Pillar 2 bundle-curation gate crossing + family-members/action-verbs deferral closure + continued strand-volume

**Type:** `[BUILD][LESSON-PLANS]` — content authoring (vocab + cross-strand expansion + first bundle-curation work) + potential `[INFRA][LESSON-PLANS]` if Stream A Phase 1 substrate sweep folds into Arc 7
**Branch:** `pivot/printable-business-toolkit`
**Estimated phases:** 4 sub-commits
**Estimated LoC:** ~3500-5500 (mostly YAML)
**Estimated sessions:** 3-5

**Status: DRAFT — operator ratification pending at Arc 6 Phase 4 close.**

## 1. Context

Arc 6 closed at 45 master packages + 12 locale variants. Pillar 2 bundle-curation arc gate per v3 SUBSCRIPTION-SCOPE.md §6: ≥50 master packages threshold. Arc 6 ship at 45 = 90% of threshold; Arc 7 will cross the gate likely in Phase 1 or Phase 2.

Arc 7 ships:
1. **Family-members + action-verbs deferral chain closure** if Stream A Phase 1 substrate sweep ships (operator-coordinated apply to canonical IMAGE_VOCABULARY) AND/OR Wave 1.1+1.2 image authoring integrates between Arc 6 ship and Arc 7 commencement. Path A vs Path B triage at Phase 1 entry per Arc 6 ratification 1 protocol.
2. **Continued strand-volume content authoring** (Option A vocab-anchored continuation OR Option B-D shifts).
3. **Continued Track-C-driven locale-variant authoring** per single-question gate.
4. **Pillar 2 bundle-curation arc commencement** if master-package count crosses 50 mid-arc (likely scenario).

Out of scope for Arc 7: Tier 3+ locale variants when Track C reaches Tier 3 (Arc 8+); subscriber UI for browsing packages; Mac Studio AI enrichment.

## 2. Pre-locked architecture (do NOT relitigate)

Per Arc 1-6 ship state. CC adjudicates within these locks.

- Schema: TeachingPackage + Bundle + BundleTeachingPackage stable. Bundle table substrate ready since Brief B Phase 2 (`20260504081907_add_bundle_schema`); BundleTeachingPackage join is the v3-canonical PRIMARY join per Pillar 2 redefinition.
- Storage convention: docs/lesson-plans/packages/<target-slug>/package.yaml + sparse-override package.<locale>.yaml + (Arc 7 new) docs/lesson-plans/bundles/<bundle-slug>/bundle.yaml if Pillar 2 commences.
- Validator contract: frontend/scripts/author-teaching-package.ts; needs Pillar 2 bundle-curation extension if bundle work commences in Arc 7.
- Materials catalog: 10 entries; valid pedagogicalRoles per Arc 5 Phase 3 discovery.
- Exercise palette: 29 §14.10 apps unchanged.
- Sparse-override pattern + substrate-audit-at-arc-commencement + cross-strand spread + vocab-anchored cross-strand interpretation (Arc 6) all binding.
- v3 SUBSCRIPTION-SCOPE.md 6-condition launch-trigger framework + Pillar 2 redefinition (canonical at `3f46b846`).

## 3. Phase plan

### Phase 1 — Path triage + family-members/action-verbs OR substrate-clean continuation (1 sub-commit)

**Triage at Phase 1 entry:** check whether Stream A Phase 1 substrate sweep has shipped AND whether Wave 1.1+1.2 image authoring has integrated.

**Path A (substrate ready):** Author identify-and-name-family-members + identify-and-name-action-verbs. **family-members gets FULL agent depth** per Arc 5+6 ratification carry-forward. action-verbs cluster review.

**Path B (substrate not ready):** Continue substrate-clean strand-volume work. Class A CLEAN list is exhausted at master level; Phase 1 Path B works against Class A GAP packages whose substrate has closed (none expected; Wave 1 hasn't shipped batches as of Arc 6 close) OR shifts to Class B FLEXIBLE deeper (4-6 packages).

### Phase 2 — Strand-volume content + Pillar 2 bundle-curation gate-crossing (1 sub-commit)

**Master-package count check:** Phase 2 entry checks current master count. If count crosses 50 mid-Phase-2, Pillar 2 bundle-curation arc commissioning becomes viable. Two sub-options:

**Option A (continue strand-volume):** 6-10 master-package authoring within an operator-strategic-choice strand (Option A vocab-acquisition continuation; Option B cognitive-and-executive-function deepening; Option C early-numeracy depth; Option D world-knowledge depth).

**Option B (Pillar 2 bundle-curation arc commencement):** First Pillar 2 bundle authored. Per v3 §1 Condition 6 + Feature Area 2 launch list: 7 bundles per locale × 2 locales = 14 bundles total. Phase 2 Option B authors 1-2 first bundles (e.g., back-to-school bundle + Halloween bundle as Tier-1+2 launch primacy).

**Operator-strategic choice at Phase 1 ratification.** Default Option A; escalate to Option B if operator wants to commence Pillar 2 work post-Arc-6.

### Phase 3 — Continue locale-variant authoring (gated on operator Track C state; 1 sub-commit)

Single-question gate at Phase 3 entry. Operator's Track C state at Arc 6 close = en+es; Phase 3 in Arc 6 added pt → Track C may be at en+es+pt at Arc 7 commencement. Question asks for current state.

**Phase 3 locale-variant set:** 4-6 sparse-override files. Selection per Arc 4-6 fold-in pattern: Phase 1 + Phase 2 packages where locale-relevant.

### Phase 4 — recon + Arc 8 commission spec (1 sub-commit)

Authors arc-7-recon.md + arc-8-commission-spec.md. Arc 8 spec scopes:
- Continued strand-volume authoring.
- Continued Pillar 2 bundle-curation work (toward the 14-bundle launch list).
- Continued Track-C-driven localization (Tier 3+ if Track C reaches Tier 3).
- NSR-resolution arc commissioning if Arc 7+ accumulated substantial NSR-flagged content.

## 4. Adjudication delegations (CC handles without surfacing)

- Path A vs Path B selection at Phase 1 entry (substrate-readiness check).
- Per-package vocabulary list verification.
- Cultural-variation phrasings in family-members + action-verbs packages (Path A).
- Verb-form choice for action-verbs.
- Per-strand depth template selection at Phase 2 (Option A/B/C/D internal package selection).
- Pillar 2 bundle-curation arc shape if commenced (which 1-2 bundles to author first; bundle-content composition per Pillar 2 redefinition: teaching-package-bundles + paired lesson plans + optional deck cross-references).
- Sparse-override locale-variant authoring per Arc 3-6 pattern.
- Per-package agent review depth.
- Commit cadence within phases.

## 5. Surface only at

- Phase 1 entry: surface Path A vs Path B if ambiguous.
- Phase 1 family-members agent review surfaces scenarios warranting operator-strategic policy ratification (Path A only) → batched single review.
- Phase 2 ratification: surface strand-depth Option A/B/C/D + Pillar 2 commencement decision (Option B vs Option A) for operator strategic choice.
- Phase 2 Pillar 2 bundle-curation gate-crossing: if commencing Option B, surface bundle-curation scope (which 1-2 bundles to author first) + bundle-validator extension proposal if needed.
- Phase 3 Track C gate question.
- Phase 4 commit (arc-7-recon.md + arc-8-commission-spec.md).
- If anything contradicts Arc 1-6 architectural locks.
- If Pillar 2 bundle-curation work surfaces unexpected schema or validator gaps.

## 6. Verification

### Phase 1
- All authored packages validate clean.
- Path A: family-members full agent review applied + iteration documented.

### Phase 2
- 6-10 packages validate clean (Option A) OR 1-2 bundles validate clean (Option B; bundle-validator may need extension first).
- If Option B: bundle authoring validates against Pillar 2 redefinition (teaching-package-bundles per BundleTeachingPackage primary join).

### Phase 3
- 4-6 sparse-override files validate clean.

### Phase 4
- arc-6-recon.md + arc-7-commission-spec.md (this file) read at handoff.
- arc-7-recon.md + arc-8-commission-spec.md authored.

### Cross-phase
- All commits push to origin clean.
- Pre-commit hooks pass.
- Git status clean at end of each phase.

## 7. Out of scope (commission-locked)

- Tier 3+ locale variants except Phase 3 organic extension (Arc 8+).
- Subscriber-facing UI for browsing packages.
- Mac Studio AI enrichment.
- 29/156 plan-count drift reconciliation (legacy; v3 framework supersedes).
- Material additions beyond catalog (10 entries stable).
- Numeral-tracing-strips variant (Arc 8+ candidate).
- App-side modifications (per CLAUDE.md §3.2).
- More than 2 bundles in Phase 2 Option B (single-batch Pillar 2 commencement gate; further bundles in Arc 8+).

## 8. Doctrine to load before starting Arc 7

- §1, §3.4, §10.3, §17.9, §A.13.6, §A.13.11, §A.14 (still binding).
- `docs/lesson-plans/arc-1-recon.md` through `arc-6-recon.md` (commission antecedents).
- `docs/lesson-plans/substrate-gap-inventory.md` (Stream B inventory; reference at Phase 1 entry).
- `frontend/config/learning-targets.json` (target slugs).
- `frontend/config/materials-catalog.json`.
- `frontend/lib/exercise-palette.json`.
- `REFERENCE TRANSLATIONS/material-generator-shared.js`.
- `REFERENCE TRANSLATIONS/image-vocabulary.js` (check Stream A Phase 1 substrate sweep apply status at Arc 7 commencement).
- `project_k3_phrasing_native_speaker_review.md`.
- `docs/SUBSCRIPTION-SCOPE.md` (v3 canonical; Pillar 2 redefinition + bundle launch list reference for Phase 2 Option B).
- `frontend/prisma/schema.prisma` (Bundle + BundleTeachingPackage models for Pillar 2 work).

## 9. Authorization — operator ratification surface

Operator ratifies these locks at Arc 6 Phase 4 (this commit) before Arc 7 commences:

1. **Phase 1 path triage:** CC adjudicates Path A vs Path B at Phase 1 entry per Arc 6 ratification 1 protocol carry-forward.
2. **family-members agent depth (Path A):** full agent depth carries forward.
3. **Phase 2 strand-depth + Pillar 2 commencement:** Operator selects Option A (continue strand-volume per chosen strand) OR Option B (Pillar 2 bundle-curation commencement) at Phase 1 ratification. Default Option A; escalate to Option B if 50-package threshold confirmed crossed at Phase 2 entry.
4. **Phase 3 deferred-vocab fold-in:** continues per Arc 4-6 pattern.
5. **Surface posture:** standard.

## 10. Deferral-chain audit-trail (Arc 4 → Arc 5 → Arc 6 → Arc 7)

The deferral chain extends across multiple arcs:

- **Arc 4 Phase 1** deferred family-members + action-verbs to Arc 5 via Path B substrate-driven scope pivot.
- **Arc 5 Phase 1** specced family-members + action-verbs against completed substrate; course correction at Arc 5 mid-arc deferred to Arc 6 (or whenever Wave 1.1+1.2 integrates).
- **Arc 6 Phase 1** triaged to Path B (Stream A Phase 1 substrate sweep not shipped); deferred to Arc 7.
- **Arc 7 Phase 1** triages Path A vs Path B per substrate state at Arc 7 commencement.

The deferral chain validates the substrate-completion + content-against-completed-substrate pairing pattern across multiple arcs. The pattern is doctrine-class; surfaces to CLAUDE.md §A.13 fold candidates at next [DOCS] cycle.

## 11. Pillar 2 bundle-curation arc — first-time-shipping considerations

If Phase 2 commences Option B (Pillar 2 bundle-curation), this is the first-time-shipping of Pillar 2 work. Considerations:

**Bundle authoring shape (per v3 §Feature Area 2 + schema):**

```yaml
slug: back-to-school-2026
themeAxisKey: back-to-school
language: en
title:
  en: "Back to School Bundle"
description:
  en: "..."
thumbnailUrl: "..."

# v3 PRIMARY join: teaching packages this bundle organizes
teachingPackages:
  - identify-and-name-school-objects
  - identify-and-name-clothing
  - point-to-named-color
  - use-color-words
  - count-objects-1-to-10
  # ...

# Paired lesson plans (per bundle/lesson-plan pairing requirement)
lessonPlans:
  - <lesson-plan-id-for-back-to-school-week>

# Optional deck cross-references (Arc 1-3 era; preserved as cross-reference annotation)
decks: []
```

**Validator extension:** `frontend/scripts/author-teaching-package.ts` may need a sibling validator `author-bundle.ts` for bundle YAML authoring. Surface as Phase 2 Option B Sub-step 1 if commenced.

**Migration considerations:** Bundle table is shipped + empty. First Pillar 2 bundle inserts pure-content rows; no data migration required per v3 §Bundle relationship semantics finding. Clean substrate.

**Cultural-variation considerations:** Per v3 §Feature Area 2 + Pillar 2 redefinition, bundles are downstream curation of teaching packages. Cultural-variation acknowledged at the constituent-package level; bundle layer does NOT re-acknowledge (avoids duplication). If a constituent package has cultural-sensitivity considerations (e.g., family-members has family-structure variation), the bundle inherits the consideration; bundle-level note references constituent-package coverage.
