# Pillar 2 Arc 5 commission spec — bundle catalog continuation + deck-bundle linkage evaluation + seasonal-template completion

**Type:** `[BUILD][BUNDLES]` continuing bundle-curation; potential `[INFRA][BUNDLES]` for deck-bundle linkage tooling
**Branch:** `pivot/printable-business-toolkit`
**Estimated phases:** 3 sub-commits per arc (mirroring Arc 3-4 shape)
**Estimated LoC:** ~1500-2500
**Estimated sessions:** 1-2
**Status: DRAFT — operator ratification pending at Pillar 2 Arc 4 Phase 3 close.**

## 1. Context

Pillar 2 Arc 4 closed at 28 themed bundles + 8-bundle animal sub-theme cluster + seasonal-trilogy template (winter+summer+spring) + ~20 packages reused across 2+ bundles each. Cross-arc cross-Phase package reuse pattern empirically validated at second instance (compare-by-capacity → kitchen-tools); pattern reliability now confirmed across both directional flows. β shape multi-phase concurrent + cross-session resumption stable.

**Notable arc-4-recon patterns generalizing forward:**
1. β shape multi-phase concurrent commissioning durable across session boundaries.
2. Cross-bundle reuse density compounds with catalog growth (~1:1 ratio).
3. Template-based bundle composition viable architectural sub-pattern (seasonal-template 3 instantiations).
4. Sub-theme bundle architecture scales past initial threshold (8-bundle animal cluster).
5. Strand-foundations as forward-investment pattern (Arc 15's 4-strand-foundations positions Arc 16+).

**Themes covered at Arc 4 close (28 themeAxisKeys):** animals + farm-animals + pets + birds + insects + ocean-life + forest-creatures + dinosaurs (8 animal cluster) + winter + summer + spring + beach (4 seasonal cluster) + breakfast + kitchen-tools + classroom (3 daily-life cluster) + body-parts (1) + shapes + colors (2 visual) + vegetables + fruits + flowers (3 plant cluster) + vehicles + weather + emotions + clothing + occupations + toys + camping (7 other).

**Themes available for Arc 5+ (~70 themeAxisKeys remaining):** strong-density candidates listed in arc-4-recon §"Themes remaining". Autumn-bundle natural Phase 1 inclusion to complete seasonal-template quartet.

## 2. Pre-locked architecture (do NOT relitigate)

Per CLAUDE.md §6 + Pillar 2 Arc 1-4 ship state. CC adjudicates within these locks.

- **Bundle architecture pluralism continues.** Now 8+ patterns demonstrated (4 from Arc 1-2 + sub-theme + seasonal + daily-life + outdoor-activity from Arc 3-4); new bundles compose patterns based on theme + strand profile.
- **Theme-axis-key density audit pre-Phase-2.** Threshold ~3 packages minimum for minimum-viable bundle architecture.
- **DB-seed graceful-degradation pattern reusable.** Per Arc 2.
- **Cross-bundle package sharing encouraged.** Now ~20 packages reused; pattern continues compounding.
- **Template-based composition viable.** Seasonal-template empirical; future template families structurally available.

## 3. Phase shape (operator chooses at commencement)

Pillar 2 Arc 5 offers three potential shapes; CC default-recommends based on Track-C state + Pillar 4 Arc 2 commencement-window proximity:

### Shape A — Continued bundle expansion (3-4 additional bundles + recon)

- **Phase 1:** 3-4 CC-adjudicated theme picks. Candidate themes (CC default-recommended):
  - **autumn-bundle** (themeAxisKey: autumn IF verified in topics-taxonomy.json; completes seasonal-template quartet — natural Phase 1 inclusion)
  - **music-bundle** (themeAxisKey: music; cultural-arts cluster)
  - **at-the-supermarket-bundle** (themeAxisKey: at_the_supermarket; daily-life cluster extension)
  - **hospital-bundle** (themeAxisKey: hospital; community-context cluster)
  - **post-office-bundle** (themeAxisKey: post_office; community-context cluster)
  - **furniture-bundle** (themeAxisKey: furniture; home-context cluster)
- **Phase 2:** 2-3 additional bundles + bundle theme-axis-key density audit refresh.
- **Phase 3:** Recon + Pillar-2-Arc-6 spec drafting.

### Shape B — Deck-bundle linkage tooling

- **Phase 1:** Author `frontend/scripts/link-bundle-decks.ts` companion script — populates `deckIds: []` across existing 28 bundles via matching theme-axis-key + locale + educational-level + subject-tags criteria. Graceful-degradation pattern per Arc 2 seed-teaching-bundles.ts. **Increasingly attractive at 28-bundle catalog scale.**
- **Phase 2:** Run linkage tooling against production deck catalog. Update bundles' deckIds in YAML; commit linkage state.
- **Phase 3:** Recon + Pillar-2-Arc-6 spec drafting.

### Shape C — Locale-variant bundle audit

- **Phase 1:** Audit subscriber-data signal OR operator-stated need for bundle-level pt variants. Catalog which existing 28 bundles would benefit from pt-variant authoring.
- **Phase 2:** Author 2-3 pt sparse-override bundles per audit findings (parallel pattern to package.pt.yaml sparse-override).
- **Phase 3:** Recon + Pillar-2-Arc-6 spec drafting.

## 4. Concurrent-arc compatibility

Pillar 2 Arc 5 supports concurrent-arc commencement per Arc 12+ precedent. Likely concurrent candidates at Arc 15 close:

- **Arc 16 lesson-plan** (β shape continuation if Q2 threshold not crossed at Arc 15 close OR if final ~150 target requires Arc 16)
- **Pillar 4 Arc 2** (per operator (P3) pre-thinking — concurrent with Pillar 2 Arc 5 if Q2 crosses at Arc 15 close per 145+ scenario)

## 5. Verification expectations

- Per-bundle YAML validates against `frontend/scripts/author-teaching-bundle.ts` schema
- Theme-axis-key verified in topics-taxonomy.json axes.theme map
- DB-seed graceful-degradation script runs clean against any new bundles
- Cross-bundle package reuse maintained or increased (current ~20 of ~137 master packages reused; target maintain or grow)
- Autumn-bundle uses 5-package seasonal-template (if Shape A includes autumn)

## 6. Authorization

Operator-strategic decisions at commencement:

1. **Phase shape choice** (Shape A vs B vs C) — operator picks at commencement. CC default-recommends:
   - Shape A if catalog growth momentum continues + autumn-bundle completes seasonal-template trilogy → quartet
   - Shape B if deckIds population is operator priority (catalog at 28 bundles increasingly justifies linkage tooling)
   - Shape C if subscriber-data signal warrants locale-variant bundle work
2. **Theme picks** (if Shape A) — adjudicator-forward per CC selection from candidate themes; operator override at glance-review surface only.
3. **Concurrent-arc evaluation** — at Arc 15 close per Q2 threshold crossing state + operator P1/P2/P3 commissioning-shape decision.

## 7. Out of scope (Pillar 2 Arc 6+)

- Bundle thumbnail asset authoring (operator-pace separate work)
- LessonPlan linkage population (blocked on Pillar 1 clause (a) lesson-plan-content authoring)
- DB-seed invocation (deferred until operator strategic timing)
- ~70+ remaining themes (gradual coverage across Arc 5-8+)

## 8. Cost projection

- **Shape A:** ~1-2 sessions; ~1500-2500 LoC; 3-4 new bundles + 2-3 additional + recon
- **Shape B:** ~1 session; ~500-800 LoC (link-bundle-decks.ts script + run-output)
- **Shape C:** ~1-2 sessions; ~1000-1500 LoC (2-3 pt sparse-override bundles + recon)

Within Pillar 2 Arc 1-4 session-count precedent.

## 9. Q2 trajectory note

Pillar 4 Arc 2 commencement window opens at Arc 15 close (master ~140-145). Pillar 2 Arc 5 + Pillar 4 Arc 2 likely concurrent commission candidates at that point per operator (P3) pre-thinking. **Operator-strategic timing**: Pillar 2 Arc 5 ratification timing may align with Arc 15 close (concurrent with Pillar 4 Arc 2) OR Arc 16 close (if Arc 15 closes <140 and Arc 16 needed). CC awaits operator direction at Arc 15 close paired-review surface point.

---

*End of Pillar 2 Arc 5 commission spec draft.*
