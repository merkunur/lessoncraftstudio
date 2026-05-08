# Pillar 2 commission spec — bundle-curation arc (separate parallel)

**Type:** `[BUILD][BUNDLES]` — bundle-curation work shape; curation-over-existing-substrate (NOT substrate-creation per Arc 8 spec §11 / 2026-05-08 doctrine)
**Branch:** `pivot/printable-business-toolkit`
**Estimated phases:** 4 sub-commits (mirroring lesson-plan arc shape)
**Estimated LoC:** ~1500-3000 (bundle YAML + validator extension + first 3-5 bundles)
**Estimated sessions:** 2-3
**Status: AUTHORIZED at Arc 11 close 2026-05-08 — Option α + commencing as separate parallel arc concurrent with Stream A escalation + Arc 12 lesson-plan strand-volume.**

## 1. Context

Pillar 2 cross-strand-depth threshold REACHED at Arc 10 close. Single-package strand count REDUCED 8 → 3 at Arc 11 close (62% reduction). Bundle-curation thin-substrate caution that prompted Arc 10 → Arc 11 deferral now closed.

Per v3 SUBSCRIPTION-SCOPE.md §6, Pillar 2 = **premium themed bundles** — curated multi-package bundles paired with lesson plans on the same themes. 50-master-package gate crossed at Arc 7 Phase 1 close; 92 master packages available at Pillar 2 commencement (42 packages-past-gate).

**Bundle composition feasibility (Arc 11 close):**
- Literacy: 30+ packages (vocab + multilingual + letter-recognition + phonological-awareness + speaking-and-listening)
- Numeracy: 18+ packages (counting + measurement + geometry + data + number-sense + addition)
- World-knowledge: 11+ packages (living-things + environment-and-weather + community + time + SEL)
- Cognitive: 17+ packages (sorting + pattern-recognition + memory + logical-reasoning)
- Fine-motor: 11+ packages (spatial-reasoning + visual-discrimination + drawing-and-tracing)

## 2. Pre-locked architecture (do NOT relitigate)

Per Arc 1-11 + v3 SUBSCRIPTION-SCOPE.md ship state. CC adjudicates within these locks.

- **Bundle Prisma schema:** Bundle + BundleTeachingPackage models per Arc 8 spec + Arc 11 close (already shipped).
- **Storage convention:** docs/lesson-plans/bundles/<bundle-slug>/bundle.yaml (mirroring packages/<slug>/package.yaml pattern).
- **Validator contract:** frontend/scripts/author-teaching-bundle.ts (NEW; required Phase 1 deliverable).
- **Sparse-override pattern:** bundles MAY have locale variants if pedagogically warranted (deferred to Pillar 2 Phase 3 if needed; Phase 1 + 2 ship en-only).
- **Curation-over-existing-substrate work shape (locked at 2026-05-08 doctrine):** Pillar 2 selects from existing 92 packages; does NOT create new packages. Cross-arc pattern: lesson-plan arcs CREATE packages; Pillar 2 arcs CURATE bundles from packages.
- **Filesystem-territory separation (Arc 12 concurrent-arc lock):** Pillar 2 territory = docs/lesson-plans/bundles/ + frontend/prisma/schema.prisma extensions IF needed + frontend/scripts/author-teaching-bundle.ts. Does NOT touch image-vocabulary.js (Stream A territory) OR docs/lesson-plans/packages/ (Arc 12 territory).

## 3. Phase plan

### Phase 1 — Bundle schema audit + validator + 3 first bundles (1 sub-commit)

**Bundle Prisma schema audit:** verify Bundle + BundleTeachingPackage models exist per Arc 8 spec. Surface any schema gaps to operator. If schema needs extension (e.g., for parent-letter-templates per v3 §7), surface as filesystem-territory-overlap question.

**Validator authoring:** frontend/scripts/author-teaching-bundle.ts. Mirrors author-teaching-package.ts pattern:
- YAML parse + sparse-override resolution
- Required field validation (bundleSlug + title + description + packageSlugs[] + thematicCoherence)
- packageSlugs[] verification: each slug exists in docs/lesson-plans/packages/
- DB migration script for Bundle + BundleTeachingPackage rows (mirroring lesson-plan seed pattern)

**3 first bundles authored** (illustrating bundle composition patterns):

1. **kindergarten-week-1** — broad cross-strand bundle (illustrates "Kindergarten Week 1 covering literacy + numeracy + world-knowledge" per operator's Pillar 2 reasoning). Composition: 3 vocab + 2 numeracy + 1 SEL + 1 cognitive = 7 packages spanning a kindergarten classroom week.

2. **early-literacy-fundamentals** — literacy-strand-deep bundle. Composition: 1 phonological-awareness + 2 letter-recognition + 1 speaking-and-listening + 2 vocabulary-acquisition = 6 packages forming a coherent pre-reading pathway.

3. **numbers-and-counting-foundations** — numeracy-strand-deep bundle. Composition: 3 counting-and-cardinality + 1 number-sense + 1 addition + 1 measurement = 6 packages forming a foundational K-3 numeracy pathway.

### Phase 2 — Cross-strand bundles (1 sub-commit)

**3-5 additional bundles spanning more strand combinations.** Operator-strategic bundle-theme choice at Phase 1 ratification.

Candidate bundle themes:
- multilingual-classroom-essentials (5 multilingual + 2 vocab + 1 SEL = 8 packages)
- world-knowledge-explorations (3 world-knowledge + 1 vocab + 1 SEL = 5 packages)
- kindergarten-week-2 (different package mix from week-1)
- preschool-classroom-fundamentals (developmentally-appropriate subset for ages 3-5)
- grade-1-literacy-extension (letter-recognition + phonological + speaking-and-listening for kids past kindergarten)

### Phase 3 — Locale-variant bundle authoring (Track-C-state-gated; 1 sub-commit; OPTIONAL)

If operator selects locale-variant bundle work, author 2-4 sparse-override bundle variants for Track-C-state locales. May not be needed if bundles are locale-portable in default state.

### Phase 4 — recon + Pillar-2-Arc-2 commission spec (1 sub-commit)

Authors pillar-2-arc-1-recon.md + pillar-2-arc-2-commission-spec.md.

## 4. Adjudication delegations (CC handles without surfacing)

- Bundle composition selection (which packages compose which bundles).
- thematicCoherence rationale per bundle.
- Bundle pedagogical-sequencing (which packages first, which last).
- Per-bundle agent review depth.
- Commit cadence within phases.

## 5. Surface only at

- Phase 1 entry: surface if Bundle schema needs extension beyond Arc 8 spec.
- Phase 2 ratification: surface bundle-theme choices for operator strategic input.
- Phase 4 commit (recon + Pillar-2-Arc-2 spec).
- If bundle composition would require packages NOT in catalog (operator-strategic decision: defer bundle vs author missing packages first).
- If anything contradicts Arc 1-11 architectural locks.

## 6. Verification

- `frontend/scripts/author-teaching-bundle.ts` validates clean on all bundles.
- All packageSlugs[] verified to exist in docs/lesson-plans/packages/.
- Bundle DB migration runs clean.
- thematicCoherence rationale validates each bundle's pedagogical fit.
- Cross-arc filesystem-territory separation verified at each commit.

## 7. Out of scope (commission-locked)

- Subscriber-facing UI for bundle browsing.
- Bundle-marketing copy (separate commission).
- Mac Studio AI bundle-recommendation.
- Bundle-purchase flow integration.
- New TeachingPackage authoring (lesson-plan arcs handle that).
- IMAGE_VOCABULARY extension (Stream A territory).

## 8. Doctrine to load before starting Pillar 2 Phase 1

- §1, §3.4, §10.3, §A.13.6, §A.14 (still binding).
- `docs/lesson-plans/arc-1-recon.md` through `arc-11-recon.md` (commission antecedents; package inventory).
- `frontend/prisma/schema.prisma` (Bundle + BundleTeachingPackage models).
- `frontend/config/learning-targets.json` (strand inventory).
- `docs/SUBSCRIPTION-SCOPE.md` (v3 canonical Pillar 2 scope).
- `docs/lesson-plans/arc-12-commission-spec.md` (concurrent-arc context).

## 9. Authorization

Operator ratified at Arc 11 close (2026-05-08): "Decision 1: Pillar 2 — Option α (commission NOW, separate parallel arc). Single-package strand reduction from 8 → 3 at Arc 11 closed the thin-substrate caution... Cross-strand depth now supports bundle composition spanning literacy + numeracy + world-knowledge + cognitive + fine-motor without rework debt."

Pillar 2 commences immediately as separate parallel arc concurrent with Stream A escalation + Arc 12 lesson-plan strand-volume.

## 10. Concurrent-arc protections (per Arc 11 close lock)

**Operator-attention serialization at surface points.** When Pillar 2 surfaces (Phase 4 recon, mid-arc operator-strategic question), CC ensures no surface-collision with Stream A or Arc 12 surfaces.

**Filesystem-territory separation.** Pillar 2 territory: `docs/lesson-plans/bundles/` + `frontend/scripts/author-teaching-bundle.ts` + Bundle Prisma schema (extension IF needed; surfaces as coordination question if so). Does NOT touch:
- `frontend/lib/image-vocabulary.js` (Stream A territory)
- `docs/lesson-plans/packages/` (Arc 12 territory)

**Cross-arc dependency:** Pillar 2 needs lesson-plan packages to exist. Arc 12 + earlier arc packages provide substrate. If Arc 12 ships new packages mid-Pillar-2-work, Pillar 2 can incorporate them at Phase 2 (bundle-composition includes new packages) — coordination via package-inventory at Pillar 2 phase entry.

**Surface posture:** standard (per Arc 11 close lock for all 3 concurrent arcs).
