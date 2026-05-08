# Pillar 2 Arc 2 commission spec — DB-seed companion + additional bundles + locale-variant evaluation

**Type:** `[BUILD][BUNDLES]` continuing bundle-curation; potential `[INFRA][BUNDLES]` for DB-seed
**Branch:** `pivot/printable-business-toolkit`
**Estimated phases:** 3 sub-commits (smaller than Arc 1 4-phase shape; DB-seed + bundles + recon)
**Estimated LoC:** ~1500-2500
**Estimated sessions:** 1-2
**Status: DRAFT — operator ratification pending at Pillar 2 Arc 1 Phase 4 close.**

## 1. Context

Pillar 2 Arc 1 closed at 7 themed bundles + bundle validator. Bundle architecture established. **DB-seed companion script deferred from Arc 1 Phase 1 → Arc 2 Phase 1 priority.**

**Notable arc-1-recon patterns generalizing forward:**
1. Bundle composition discipline (thematicCoherence + sub-strand spread + duration + multilingual-relevance).
2. Theme-axis-key underscore naming convention.
3. Cross-strand bundle composition feasibility (fruits-bundle pattern).
4. Concurrent-arc filesystem-territory separation maintained.

**Bundle catalog at Pillar 2 Arc 2 commencement:** 7 bundles spanning 7 themes:
- animals + shapes + emotions (Arc 1 Phase 1)
- vehicles + weather + body_parts + fruits (Arc 1 Phase 2)

**Available themes for Arc 2 expansion:** 93 of 100 themes in topics-taxonomy.json axes.theme remain unbundled. Operator-strategic theme picks at Phase 2.

## 2. Pre-locked architecture

Per Pillar 2 Arc 1 + Arc 1-12 lesson-plan ship state. CC adjudicates within these locks.

- Bundle Prisma schema stable (no changes since v3 SUBSCRIPTION-SCOPE.md merge).
- Bundle YAML schema established at Arc 1 (validator + 7 bundles).
- thematicCoherence pattern + theme-axis-key constraint binding.
- Filesystem-territory: docs/lesson-plans/bundles/ + frontend/scripts/.
- Curation-over-existing-substrate work shape.

## 3. Phase plan

### Phase 1 — DB-seed companion script (1 sub-commit)

**Required Phase 1 deliverable:** frontend/scripts/seed-teaching-bundles.ts. Mirrors seed-teaching-packages.ts pattern. Ingests bundle.yaml definitions into Bundle + BundleTeachingPackage rows.

**Implementation requirements:**
- Read all bundle.yaml files in docs/lesson-plans/bundles/<slug>/.
- Validate each (call existing author-teaching-bundle.ts validation or shared validation logic).
- Upsert Bundle row keyed on (themeAxisKey, language) per @@unique constraint.
- Insert BundleTeachingPackage rows linking bundle to its teachingPackageSlugs (via TeachingPackage table lookup).
- Optional --dry-run flag.
- Per-bundle status report.
- Idempotent: safe to re-run.

**DB-seed unblocks subscriber-side bundle queries** (when subscriber UI commissions; out-of-scope here, but DB-seed is the prerequisite).

### Phase 2 — Additional bundles (1 sub-commit)

**Operator-strategic theme picks at Phase 1 ratification.** CC-adjudicated 4-6 additional themes building Pillar 2 catalog from 7 → 11-13 bundles.

Candidate themes (CC default-recommended subset; operator may override):
- **colors** (color vocabulary + sorting + visual-discrimination work)
- **foods** (vocabulary + counting + healthy-eating science)
- **clothing** (vocabulary + sorting + cultural-clothing-awareness)
- **school-objects** (vocabulary + classroom-routine + community-helpers bridge)
- **house-rooms** (vocabulary + spatial-reasoning + describe-a-picture work)
- **transport** OR similar travel-related theme

CC adjudicates 4-6 picks per Pillar 2 Arc 1 adjudicator-forward pattern.

### Phase 3 — recon + Pillar-2-Arc-3 commission spec (1 sub-commit)

Authors pillar-2-arc-2-recon.md + pillar-2-arc-3-commission-spec.md.

Pillar 2 Arc 3+ scopes (deferred from Arc 1 + Arc 2):
- Locale-variant bundle evaluation IF subscriber-data signals warrant
- Bundle-marketing copy commission (subscriber-facing copy)
- Bundle thumbnail asset coordination
- Bundle deck + lessonPlan population at launch

## 4. Adjudication delegations (CC handles without surfacing)

- DB-seed implementation details (mirroring seed-teaching-packages.ts).
- Bundle theme picks at Phase 2 (adjudicator-forward; glance-review surface only).
- Per-bundle composition decisions.
- Per-bundle thematicCoherence narrative.
- Commit cadence within phases.

## 5. Surface only at

- Phase 1 entry: surface if seed-teaching-bundles.ts requires schema changes (none expected).
- Phase 2 ratification: glance-review surface for theme picks (adjudicator-forward).
- Phase 3 commit (recon + Arc 3 spec).
- If anything contradicts Arc 1-12 lesson-plan or Pillar 2 Arc 1 architectural locks.

## 6. Verification

- seed-teaching-bundles.ts runs clean on all 7 Arc 1 bundles + new Phase 2 bundles.
- All bundle.yaml files validate via author-teaching-bundle.ts.
- Bundle + BundleTeachingPackage rows materialize in DB (verify via Prisma query).
- Filesystem-territory separation maintained (docs/lesson-plans/bundles/ + frontend/scripts/).

## 7. Out of scope

- Subscriber-facing UI for bundle browsing.
- Bundle-marketing copy.
- Bundle thumbnail asset authoring (operator-pace separate).
- Mac Studio AI bundle-recommendation.
- Locale-variant bundles UNLESS operator surfaces specific signal warranting.
- New TeachingPackage authoring (lesson-plan arcs handle).
- IMAGE_VOCABULARY extension (Stream A territory if applicable).

## 8. Doctrine to load before starting Pillar 2 Arc 2

Same as Pillar 2 Arc 1 + add `docs/lesson-plans/bundles/pillar-2-arc-1-recon.md`.

## 9. Authorization

Operator ratifies these locks at Pillar 2 Arc 1 Phase 4 (this commit) before Pillar 2 Arc 2 commences:

1. **DB-seed script as Phase 1 priority** (CC-recommended; required to unblock future subscriber-side work).
2. **4-6 additional bundles at Phase 2** (CC adjudicates theme picks; glance-review surface).
3. **Locale-variant bundles deferred to Pillar 2 Arc 3+** unless operator surfaces specific signal at Arc 2 commencement.
4. **Surface posture:** standard.
5. **Concurrent-arc commissioning:** operator-strategic per Arc 12 precedent. Pillar 2 Arc 2 may run concurrent with Arc 13 lesson-plan IF operator chooses.
