# Pillar 2 Arc 3 commission spec — bundle catalog continuation + deck-bundle linkage + locale-variant evaluation

**Type:** `[BUILD][BUNDLES]` continuing bundle-curation; potential `[INFRA][BUNDLES]` for deck-bundle linkage tooling
**Branch:** `pivot/printable-business-toolkit`
**Estimated phases:** 3 sub-commits per arc
**Estimated LoC:** ~1500-2500
**Estimated sessions:** 1-2
**Status: RATIFIED 2026-05-10 — operator Phase 2 batch (substrate-audit/priority-queue commission). β shape with Arc 14 concurrent. Shape A (3-4 new bundles) default adjudicator-forward per spec.**

## 1. Context

Pillar 2 Arc 2 closed at 11 themed bundles + DB-seed companion script shipped. Bundle architecture pluralism established (4 distinct architectural patterns: tight-strand + minimum-viable + produce-parallel + broadest-cross-strand). 2-concurrent-arc commission with Arc 13 lesson-plan validated.

**Notable arc-2-recon patterns generalizing forward:**
1. Bundle architecture pluralism continues (no template lock).
2. Theme-axis-key density audit pre-Phase-2 always.
3. DB-seed graceful-degradation pattern (reusable).
4. Bundle-package-overlap when pedagogically coherent.
5. CONTEXT-anchored vs TOPIC-anchored bundles both valid.

**Bundle catalog at Pillar 2 Arc 3 commencement:** 11 bundles spanning 11 themes:
- animals + shapes + emotions (Arc 1 Phase 1)
- vehicles + weather + body_parts + fruits (Arc 1 Phase 2)
- colors + clothing + vegetables + classroom (Arc 2 Phase 2)

**Available themes for Arc 3 expansion:** 89 of 100 themes in topics-taxonomy.json axes.theme remain unbundled. Operator-strategic theme picks at Phase 2 OR shift focus to deck-bundle linkage / locale-variant evaluation.

## 2. Pre-locked architecture

Per Pillar 2 Arc 1+2 + Arc 1-13 lesson-plan ship state. CC adjudicates within these locks.

- Bundle Prisma schema stable.
- Bundle YAML schema established at Arc 1 (validator + 11 bundles).
- thematicCoherence pattern + theme-axis-key constraint binding.
- Filesystem-territory: `docs/lesson-plans/bundles/` + `frontend/scripts/`.
- DB-seed companion ships (Arc 2); deck-bundle linkage tooling available for Arc 3 if commissioned.

## 3. Phase plan

Pillar 2 Arc 3 has THREE possible phase shapes per operator strategic choice:

### Shape A — Continued bundle expansion (3-4 additional bundles + recon)

For when sufficient teaching-package density exists at additional themes + operator wants to grow Pillar 2 catalog.

- **Phase 1:** 3-4 CC-adjudicated theme picks. Candidate themes (CC default-recommended): farm-animals (sub-theme of animals; could compose differently); flowers; transportation (broader than vehicles); occupations; pets (sub-theme of animals); seasons (cross-strand seasonal-content); music; toys.
- **Phase 2:** recon + Pillar-2-Arc-4 spec.

### Shape B — Deck-bundle linkage focus (deck-bundle linkage tooling + bundle deckIds population)

For when sufficient Track-C deck-publish coverage exists at bundled themes + operator wants to populate empty `deckIds: []` arrays across the 11 existing bundles.

- **Phase 1:** Deck-bundle linkage tooling. Companion script `frontend/scripts/link-bundle-decks.ts` or similar. Reads bundle.yaml `themeAxisKey`; queries Deck table for `language + theme_axis_key` matching rows; populates BundleDeck join rows. Idempotent. Per-bundle status report.
- **Phase 2:** Run linkage tooling against current Track-C state; populate deckIds for bundles where coverage is sufficient. Document zero-deck bundles for future Track C focus.
- **Phase 3:** recon + Pillar-2-Arc-4 spec.

### Shape C — Locale-variant bundle evaluation (limited scope, IF subscriber-data signal warrants)

For when subscriber-data signal warrants bundle-level pt or other-locale variants. Lower-priority; deferred from Arc 1 + Arc 2.

- **Phase 1:** Audit subscriber-data signal (or operator-stated strategic need) for which bundles warrant locale-variant. Default if no signal: defer further to Pillar 2 Arc 4+.
- **Phase 2:** Author identified locale-variant bundles (if any).
- **Phase 3:** recon + Pillar-2-Arc-4 spec.

CC default-recommends **Shape A or Shape B at operator-strategic choice.** Shape B is structurally important (empty `deckIds: []` blocks subscriber-side bundle-browse UX); Shape A continues catalog momentum. Shape C deferred unless signal warrants.

## 4. Adjudication delegations (CC handles without surfacing)

- Phase shape recommendation at commencement.
- Bundle theme picks at Shape A Phase 1 (adjudicator-forward; glance-review surface only).
- Per-bundle composition decisions.
- Per-bundle thematicCoherence narrative.
- Deck-bundle linkage script implementation details (Shape B).
- Commit cadence within phases.

## 5. Surface only at

- Commencement: surface for operator phase-shape choice (Shape A vs B vs C).
- Phase 1 ratification IF Shape A: glance-review surface for theme picks.
- Phase 1 ratification IF Shape B: surface if linkage script reveals theme-bundle deck-coverage gaps requiring strategic decisions.
- Phase 3 commit (recon + Arc 4 spec).
- If anything contradicts Pillar 2 Arc 1+2 architectural locks.

## 6. Verification

- All bundle.yaml files (new + existing) validate via author-teaching-bundle.ts.
- DB-seed script runs clean against any new bundles (Shape A).
- Deck-bundle linkage script runs clean (Shape B); populated deckIds materialize in DB.
- Filesystem-territory separation maintained (`docs/lesson-plans/bundles/` + `frontend/scripts/`).

## 7. Out of scope

- Subscriber-facing UI for bundle browsing.
- Bundle-marketing copy.
- Bundle thumbnail asset authoring (operator-pace separate).
- Mac Studio AI bundle-recommendation.
- Locale-variant bundles UNLESS Shape C selected.
- New TeachingPackage authoring (lesson-plan arcs handle).
- IMAGE_VOCABULARY extension (Stream A territory if applicable).

## 8. Doctrine to load before starting Pillar 2 Arc 3

Same as Pillar 2 Arc 2 + add `docs/lesson-plans/bundles/pillar-2-arc-2-recon.md`.

## 9. Authorization

Operator ratifies these locks at Pillar 2 Arc 2 Phase 3 (this commit) before Pillar 2 Arc 3 commences:

1. **Phase shape choice** (Shape A vs B vs C) — operator picks at commencement. CC default-recommends Shape A or Shape B based on Track-C state.
2. **Phase 1 entry** (theme picks IF Shape A; linkage tooling IF Shape B; subscriber-data audit IF Shape C) — adjudicator-forward; glance-review surface only.
3. **Concurrent-arc evaluation** — operator may commission Arc 14 lesson-plan + Stream A Arc 2 concurrently per Arc 12+13 precedent OR sequentially.
4. **Surface posture:** standard (no [DOCS] fold; no CLAUDE.md amendments expected).
