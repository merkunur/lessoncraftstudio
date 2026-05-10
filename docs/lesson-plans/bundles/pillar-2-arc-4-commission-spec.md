# Pillar 2 Arc 4 commission spec — bundle catalog continuation + deck-bundle linkage evaluation + locale-variant evaluation

**Type:** `[BUILD][BUNDLES]` continuing bundle-curation; potential `[INFRA][BUNDLES]` for deck-bundle linkage tooling OR `[CHORE][BUNDLES]` for locale-variant audit
**Branch:** `pivot/printable-business-toolkit`
**Estimated phases:** 3 sub-commits per arc (mirroring Arc 3 shape)
**Estimated LoC:** ~1500-2500
**Estimated sessions:** 1-2
**Status: RATIFIED 2026-05-11 — operator (i) ratification at Arc 14 Phase 4 close. β shape continuation with Arc 15. Shape choice (A/B/C) adjudicator-forward per CC at commencement.**

## 1. Context

Pillar 2 Arc 3 closed at 20 themed bundles + 7+ architectural patterns + ~10 packages reused across 2+ bundles each. Cross-arc cross-Phase package reuse pattern empirically validated (describe-butterfly-life-cycle Phase 1 → insects-bundle Phase 2). β shape concurrent-arc cadence stable across 3 paired phases with Arc 14 lesson-plan.

**Notable arc-3-recon patterns generalizing forward:**
1. Sub-theme bundle pattern (animals → farm-animals + pets); theme-axis-key granularity flexibility.
2. Cross-strand daily-life pattern (breakfast-bundle as first meal-context anchor).
3. Cross-arc cross-Phase package reuse reliable in concurrent-arc commissioning.
4. Operator override of spec Phase structure absorbable at commencement.
5. Bundle catalog growth amortizes master-package authoring (8% reuse rate at 20 bundles).

**Themes covered at Arc 3 close (15 themeAxisKeys):** animals + body_parts + shapes + emotions + fruits + vehicles + weather + colors + clothing + vegetables + classroom + farm_animals + occupations + toys + flowers + pets + insects_and_bugs + ocean_life + winter + breakfast.

**Themes available for Arc 4+ (85 themeAxisKeys remaining in topics-taxonomy.json axes.theme map):** narrowed by package density to ~10-15 strong-density candidates.

## 2. Pre-locked architecture (do NOT relitigate)

Per CLAUDE.md §6 + Pillar 2 Arc 1-3 ship state. CC adjudicates within these locks.

- **Bundle architecture pluralism continues.** 7+ patterns demonstrated; new bundles compose architectural patterns based on theme + strand profile.
- **Theme-axis-key density audit pre-Phase-2.** Threshold ~3 packages minimum for minimum-viable bundle architecture.
- **DB-seed graceful-degradation pattern reusable.** Per Arc 2.
- **Cross-bundle package sharing encouraged when pedagogically coherent.** Bundles can share packages; sharing density compounds catalog growth efficiency.

## 3. Phase shape (operator chooses at commencement)

Pillar 2 Arc 4 offers three potential shapes; CC default-recommends based on Track-C state + Pillar 4 Arc 2 commencement window proximity:

### Shape A — Continued bundle expansion (3-4 additional bundles + recon)

- **Phase 1:** 3-4 CC-adjudicated theme picks. Candidate themes (CC default-recommended):
  - **kitchen-tools-bundle** (themeAxisKey: kitchen_tools; daily-life cluster paired with breakfast-bundle)
  - **birds-bundle** (themeAxisKey: birds; animal sub-theme parallel to farm-animals/pets)
  - **forest-creatures-bundle** (themeAxisKey: forest_creatures; animal sub-theme)
  - **camping-bundle** (themeAxisKey: camping; outdoor activity context)
  - **summer-bundle** (themeAxisKey: summer; seasonal parallel to winter-bundle)
  - **spring-bundle** (themeAxisKey: spring; seasonal parallel to winter-bundle)
- **Phase 2:** 2-3 additional bundles + bundle theme-axis-key density audit refresh.
- **Phase 3:** Recon + Pillar-2-Arc-5 spec drafting.

### Shape B — Deck-bundle linkage tooling

- **Phase 1:** Author `frontend/scripts/link-bundle-decks.ts` companion script — populates `deckIds: []` across existing 20 bundles via matching theme-axis-key + locale + educational-level + subject-tags criteria. Graceful-degradation pattern per Arc 2 seed-teaching-bundles.ts.
- **Phase 2:** Run linkage tooling against production deck catalog (4,137 published decks; theme distribution per Phase 0 substrate audit). Update bundles' deckIds in YAML; commit linkage state.
- **Phase 3:** Recon + Pillar-2-Arc-5 spec drafting.

### Shape C — Locale-variant bundle audit

- **Phase 1:** Audit subscriber-data signal OR operator-stated need for bundle-level pt variants. Catalog which existing 20 bundles would benefit from pt-variant authoring (likely theme-based selection: pets / breakfast / family / similar daily-life themes most relevant to multilingual classrooms).
- **Phase 2:** Author 2-3 pt sparse-override bundles per audit findings (parallel pattern to package.pt.yaml sparse-override; bundle.pt.yaml overrides title.pt + description.pt + thematicCoherence.pt only).
- **Phase 3:** Recon + Pillar-2-Arc-5 spec drafting.

## 4. Concurrent-arc compatibility

Pillar 2 Arc 4 supports concurrent-arc commencement per Arc 12+ precedent. Likely concurrent candidates:
- **Arc 15 lesson-plan** (concurrent β shape continuation per Arc 14 + Arc 3 precedent)
- **Pillar 4 Arc 2** (likely commencement at Arc 15-16 close per Q2 trajectory; concurrent territory: bundles ↔ flashcards cleanly separable)

## 5. Verification expectations

- Per-bundle YAML validates against `frontend/scripts/author-teaching-bundle.ts` schema
- Theme-axis-key verified in topics-taxonomy.json axes.theme map
- DB-seed graceful-degradation script runs clean against any new bundles
- Cross-bundle package reuse maintained or increased (current 10/120 master packages reused; target maintain or grow)

## 6. Authorization

Operator-strategic decisions at commencement:

1. **Phase shape choice** (Shape A vs B vs C) — operator picks at commencement. CC default-recommends:
   - Shape A if catalog growth momentum continues + master packages haven't crossed Q2 threshold yet
   - Shape B if deckIds population is operator priority (e.g., subscriber-side bundle-browse UX shipping pre-launch)
   - Shape C if subscriber-data signal warrants locale-variant bundle work
2. **Theme picks** (if Shape A) — adjudicator-forward per CC selection from candidate themes; operator override at glance-review surface only.
3. **Concurrent-arc evaluation** — per Arc 12+ precedent.

## 7. Out of scope (Pillar 2 Arc 5+)

- Bundle thumbnail asset authoring (operator-pace separate work)
- LessonPlan linkage population (blocked on Pillar 1 clause (a) lesson-plan-content authoring)
- DB-seed invocation (deferred until operator strategic timing)
- 80+ remaining themes (gradual coverage across Arc 4-7+)

## 8. Cost projection

- **Shape A:** ~1-2 sessions; ~1500-2500 LoC; 3-4 new bundles + 2-3 additional + recon
- **Shape B:** ~1 session; ~500-800 LoC (link-bundle-decks.ts script + run-output)
- **Shape C:** ~1-2 sessions; ~1000-1500 LoC (2-3 pt sparse-override bundles + recon)

Within Pillar 2 Arc 1-3 session-count precedent.

## 9. Q2 trajectory note

Pillar 4 Arc 2 commencement window opens at Arc 15-16 close (master packages ~140-145). Pillar 2 Arc 4 + Pillar 4 Arc 2 likely concurrent commission candidates at that point. **Operator-strategic timing**: Pillar 2 Arc 4 ratification timing may align with Arc 15 close (concurrent with Arc 15) OR Arc 16 close (concurrent with Pillar 4 Arc 2 commencement). CC awaits operator direction.

---

*End of Pillar 2 Arc 4 commission spec draft.*
