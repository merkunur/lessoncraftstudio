# Arc 10 commission spec — strand-volume continuation + family-members/action-verbs deferral chain (6-arc) + strand-saturation operational pattern + Pillar 2 / H1 / Commission B follow-on parallel-arc options

**Type:** `[BUILD][LESSON-PLANS]` — content authoring (vocab + cross-strand expansion + locale variants); potential parallel `[INFRA][LESSON-PLANS]` if Stream A Phase 1 substrate sweep folds into Arc 10 OR `[BUILD][BUNDLES]` if Pillar 2 bundle-curation arc commences in parallel
**Branch:** `pivot/printable-business-toolkit`
**Estimated phases:** 4 sub-commits
**Estimated LoC:** ~2500-4500 (mostly YAML)
**Estimated sessions:** 2-4

**Status: DRAFT — operator ratification pending at Arc 9 Phase 4 close.**

## 1. Context

Arc 9 closed at 73 master packages + 25 locale variants. Multilingual-language-awareness strand SATURATED at 5/5 available targets. Pillar 2 50-master-package gate crossed at Arc 7 Phase 1; 23 packages past gate at Arc 9 close. RECON SEO audit shipped Arc 7; H1 [FIX][SEO] commission filed in deferred queue.

**Notable arc-9-recon patterns generalizing forward:**
1. Available-target audit before Phase 1 commencement (avoid saturated strands).
2. Phase 1 / Phase 2 strand-emphasis differentiation (Phase 1 breadth; Phase 2 depth).
3. Strand-first density at Phase 1 (4 firsts in Arc 9).
4. Strand saturation as doctrine — saturated strands require target-set extension.
5. pt sparse-override pattern stable across 5 consecutive arcs (Arc 5+6+7+8+9).
6. Validation iteration cost stable at 1-2 errors per package.

**Saturated strands as of Arc 9:**
- multilingual-language-awareness (5/5 targets, all authored)
- pattern-recognition (4 packages spanning all 5 pattern-train modes; saturated at mode-coverage)

**Available unauthored targets by strand (as of Arc 9 close):**
- early-numeracy/measurement: 3 unauthored (compare-by-weight, compare-by-capacity, order-3-objects-by-length)
- early-numeracy/counting-and-cardinality: 2 unauthored (count-by-rote-1-to-100, skip-count-by-10)
- early-numeracy/geometry: minimal (describe-shape-attributes used; few remaining targets)
- early-numeracy/data-and-graphs: 0 unauthored (sort-objects-by-attribute used; any future packages need target-set extension)
- cognitive-and-executive-function/sorting: 0 unauthored
- cognitive-and-executive-function/logical-reasoning: 0 unauthored
- cognitive-and-executive-function/memory-and-attention: minimal
- early-literacy/letter-recognition: minimal (1 target authored)
- early-literacy/vocabulary-acquisition: many unauthored (point-to-named-clothing-item, identify-and-name-action-verbs, identify-and-name-family-members, etc.)
- early-literacy/speaking-and-listening: minimal
- world-knowledge: many unauthored (describe-plant-life-cycle, describe-butterfly-life-cycle, describe-water-cycle-basic, etc.)
- fine-motor-and-visual-spatial: minimal

Arc 10 ships:
1. **Family-members + action-verbs deferral chain closure** if Stream A Phase 1 substrate sweep ships AND/OR Wave 1.1+1.2 image authoring integrates between Arc 9 ship and Arc 10 commencement. Path A vs Path B triage at Phase 1 entry per Arc 6+7+8+9 ratification protocol carry-forward.
2. **Continued strand-volume content authoring** with operator-strategic strand-depth choice (avoiding saturated strands).
3. **Continued Track-C-driven locale-variant authoring**.
4. **Pillar 2 bundle-curation arc** OR **Commission B follow-on (F2-F6)** OR **H1 [FIX][SEO]** as operator-strategic separate-arc commissioning options.

## 2. Pre-locked architecture (do NOT relitigate)

Per Arc 1-9 ship state. CC adjudicates within these locks.

- Schema: TeachingPackage + Bundle + BundleTeachingPackage stable.
- Storage convention: docs/lesson-plans/packages/<target-slug>/package.yaml + sparse-override package.<locale>.yaml.
- Validator contract: frontend/scripts/author-teaching-package.ts.
- Materials catalog: 10 entries; valid pedagogicalRoles.
- Exercise palette: 29 §14.10 apps unchanged.
- Sparse-override pattern + substrate-audit-at-arc-commencement + cross-strand spread + vocab-anchored cross-strand interpretation + cluster-review-once-per-locale (all binding per Arc 1-9).
- v3 SUBSCRIPTION-SCOPE.md 6-condition launch-trigger framework.
- H1 [FIX][SEO] commission spec at `docs/audit-results/fix-seo-h1-es-title-localization.md`.

## 3. Phase plan

### Phase 1 — Path triage + family-members/action-verbs OR substrate-clean continuation (1 sub-commit)

**Triage at Phase 1 entry:** check Stream A Phase 1 substrate sweep status + Wave 1 integration status.

**Path A (substrate ready):** Author identify-and-name-family-members + identify-and-name-action-verbs. **family-members FULL agent depth** per Arc 5+6+7+8+9 ratification carry-forward. action-verbs cluster review.

**Path B (substrate not ready):** Continue substrate-clean strand-volume. Path B options at Arc 10 (avoiding saturated strands):
- Measurement strand depth: compare-by-weight + compare-by-capacity + order-3-objects-by-length (RESOLVES compare-by-length forward-pointer to weight + capacity).
- Skip-counting trilogy completion: skip-count-by-10 (RESOLVES Arc 9 skip-count-by-5 forward-pointer).
- Letter-recognition deepening: identify-final-letters + identify-middle-letters (NEW targets needed in learning-targets.json) OR existing targets if any.
- World-knowledge depth: describe-plant-life-cycle + describe-butterfly-life-cycle + describe-day-night-cycle + describe-water-cycle-basic + use-before-after-vocabulary (5+ targets available).
- Cross-strand vocab-anchored work continues.

### Phase 2 — Strand-volume content authoring (1 sub-commit)

**Operator-strategic strand-depth choice at Phase 1 ratification:**

- **Option A — vocab-acquisition continuation (continued from Arc 6+7+8).** Many unauthored targets remain (point-to-named-clothing-item, identify-and-name-action-verbs once substrate ships, etc.).
- **Option B — cognitive-and-executive-function deepening.** Most strand-internal targets exhausted; would require target-set extension OR cross-strand cognitive work.
- **Option C — early-numeracy depth (measurement + skip-counting completion).** Resolves multiple forward-pointers.
- **Option E — world-knowledge depth (NEW emphasis at Arc 10).** Build on Arc 5 Phase 2 + Arc 5 Phase 3. Many unauthored targets across living-things + environment-and-weather + community-and-roles + time-and-routine + materials-and-properties + personal-social-emotional-development.

**Option D (multilingual-language-awareness depth) UNAVAILABLE** at Arc 10 — strand saturated at Arc 9. Future depth requires learning-targets.json target-set extension (operator-coordination).

Default Option A unless operator surfaces strategic reason for B/C/E at ratification.

### Phase 3 — Continue locale-variant authoring (Track-C-state-gated; 1 sub-commit)

Single-question gate at Phase 3 entry. 4-6 sparse-override files. Selection per Arc 4-9 fold-in pattern.

### Phase 4 — recon + Arc 11 commission spec (1 sub-commit)

Authors arc-10-recon.md + arc-11-commission-spec.md. Arc 11 spec scopes:
- Continued strand-volume + Pillar 2 commissioning evaluation (gate now at 73/50, ~30 packages past gate at Arc 10 close).
- Continued Track-C-driven localization.
- NSR-resolution arc commissioning if accumulated.

## 4. Adjudication delegations (CC handles without surfacing)

- Path A vs Path B selection at Phase 1 entry.
- Per-package vocabulary list verification.
- Per-strand depth template selection at Phase 2.
- Sparse-override locale-variant authoring.
- Per-package agent review depth.
- Commit cadence within phases.

## 5. Surface only at

- Phase 1 entry: surface Path A vs Path B if ambiguous.
- Phase 1 family-members agent review (Path A only) → batched single review.
- Phase 2 ratification: surface strand-depth Option A/B/C/E for operator strategic choice.
- Phase 3 Track C gate question.
- Phase 4 commit (arc-10-recon.md + arc-11-commission-spec.md).
- If anything contradicts Arc 1-9 architectural locks.

## 6. Verification

- All authored packages validate clean.
- Path A: family-members full agent review applied + iteration documented.
- Strand-internal architectural consistency.
- Sparse-override files validate clean; cluster review only if new locale OR new register-shift surfaces.
- Doctrine carry-forward verified.

## 7. Out of scope (commission-locked)

- Tier 3+ locale variants except Phase 3 organic extension (Arc 11+).
- Subscriber-facing UI for browsing packages.
- Mac Studio AI enrichment.
- Material additions beyond catalog.
- Numeral-tracing-strips variant (Arc 11+ candidate).
- Analogy-app addition (Arc 11+ candidate).
- App-side modifications.
- Pillar 2 bundle-curation arc UNLESS commissioned as separate parallel arc.
- Commission B follow-on (F2-F6) UNLESS commissioned as separate parallel arc.
- H1 [FIX][SEO] commission UNLESS triggered by next es-deck-publish wave.
- learning-targets.json target-set extension for saturated strands (multilingual-language-awareness, pattern-recognition) — operator-coordination if Arc 10+ wants to deepen those strands.

## 8. Doctrine to load before starting Arc 10

- §1, §3.4, §10.3, §17.9, §A.13.6, §A.13.11, §A.14 (still binding).
- `docs/lesson-plans/arc-1-recon.md` through `arc-9-recon.md` (commission antecedents).
- `docs/lesson-plans/substrate-gap-inventory.md` (Stream B inventory).
- `frontend/config/learning-targets.json` (audit available-target-counts before Phase 2).
- `frontend/config/materials-catalog.json`.
- `frontend/lib/exercise-palette.json`.
- `REFERENCE TRANSLATIONS/material-generator-shared.js`.
- `REFERENCE TRANSLATIONS/image-vocabulary.js`.
- `project_k3_phrasing_native_speaker_review.md`.
- `docs/SUBSCRIPTION-SCOPE.md` (v3 canonical).
- `frontend/prisma/schema.prisma` (Bundle + BundleTeachingPackage models for Pillar 2 work).
- `docs/audit-results/deck-page-indexability.md`.
- `docs/audit-results/fix-seo-h1-es-title-localization.md`.

## 9. Authorization — operator ratification surface

Operator ratifies these locks at Arc 9 Phase 4 (this commit) before Arc 10 commences:

1. **Phase 1 path triage:** CC adjudicates Path A vs Path B at Phase 1 entry per Arc 6+7+8+9 ratification protocol carry-forward.
2. **family-members agent depth (Path A):** full agent depth carries forward.
3. **Phase 2 strand-depth choice:** Operator selects Option A (vocab-acquisition; default) / Option B (cognitive deepening; limited) / Option C (numeracy depth) / Option E (world-knowledge depth — NEW emphasis at Arc 10) at Phase 1 ratification. **Option D UNAVAILABLE** (multilingual-language-awareness saturated at Arc 9).
4. **Phase 3 deferred-vocab fold-in:** continues per Arc 4-9 pattern.
5. **Surface posture:** standard.

## 10. Deferral-chain audit-trail (Arc 4 → 5 → 6 → 7 → 8 → 9 → 10)

- **Arc 4-9** triaged Path A → Path B per substrate state at Phase 1.
- **Arc 10 Phase 1** triages Path A vs Path B per substrate state at Arc 10 commencement.

The chain validates substrate-completion + content-against-completed-substrate pairing pattern across 6 arcs. Family-members + action-verbs deferral approaching maturity threshold — consider structural escalation if chain extends past Arc 11.

## 11. Pillar 2 + H1 [FIX][SEO] + Commission B follow-on — separate-arc commission options

Per operator pacing directive (carried forward from 2026-05-08): three commissions queued for separate parallel commissioning, NOT folded into Arc 10 main:

**Pillar 2 bundle-curation arc.** Gate crossed at Arc 7 Phase 1 (50/50); 23 packages past gate at Arc 9 close (73/50). **Re-evaluation window now open per 2026-05-08 directive (Arc 9/10 close milestones).** Operator-strategic timing for Arc 10 vs separate-parallel-commissioning.

**H1 [FIX][SEO]** — at next es-deck-publish wave gate.

**Commission B follow-on (F2-F6 candidates).** Per `docs/lesson-plans/deck-end-strip-recon-phase6.md`. F1 closed Arc 8-adjacent. F2-F6 remain queued.

These can ship in any order; no inter-dependence. Arc 10 Phase 1-4 main work proceeds independently of any of the three.
