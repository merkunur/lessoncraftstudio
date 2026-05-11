# Pillar 2 Arc 6 commission spec — bundle catalog continuation OR deck-bundle linkage tooling OR holiday-template extension

**Type:** `[BUILD][BUNDLES]` continuing bundle-curation; OR `[INFRA][BUNDLES]` for deck-bundle linkage tooling
**Branch:** `pivot/printable-business-toolkit`
**Estimated phases:** 3 sub-commits per arc (mirroring Arc 3-4-5 shape)
**Estimated LoC:** ~1500-2500
**Estimated sessions:** 1-2
**Status: DRAFT — operator ratification pending at Pillar 2 Arc 5 Phase 3 close.**

## 1. Context

Pillar 2 Arc 5 closed at 37 themed bundles + holiday-bundle template at 2-instance threshold + community-context + emotion-regulation crossover + 13-cluster cluster taxonomy + ~25+ cross-bundle package reuse instances + cross-arc cross-Phase package reuse pattern validated at 4 instances. β shape (P3) sustained across 3 paired phases in 3rd commission cycle. Asymmetric scope concurrent commissioning empirically validated.

**Notable arc-5-recon patterns generalizing forward:**

1. β shape concurrent commissioning works at asymmetric scope (Pillar 4 Arc 2 heavier + Pillar 2 Arc 5 lighter; sustained clean).
2. Cluster taxonomy expanding faster than bundle-count depth (13 distinct patterns at 37 bundles).
3. Holiday-bundle template + community-context+emotion-regulation crossover are new architectural-pattern types emerged at Arc 5.
4. Cross-arc cross-Phase package reuse compounding (4 empirical instances now).
5. Cost-balloon escape hatch surface discipline preserves operator-attention at mid-execution scope discoveries.

**Themes covered at Arc 5 close (37 themeAxisKeys):** animals + farm-animals + pets + birds + insects + ocean-life + forest-creatures + dinosaurs (8 animal cluster) + winter + summer + spring + beach (4 seasonal cluster) + breakfast + kitchen-tools + classroom + bakery + at-the-supermarket (5 daily-life cluster) + body-parts (1) + shapes + colors (2 visual) + vegetables + fruits + flowers + tree (4 plant cluster) + emotions (1) + vehicles + weather + clothing + occupations + toys + camping (6 other) + post-office + hospital (2 community-context) + furniture (1 home-context) + music (1 cultural-arts) + easter + christmas (2 holiday).

**Themes available for Arc 6+ (~65 themeAxisKeys remaining):**

- Holiday cluster extension: thanksgiving + halloween + diwali + ramadan + hanukkah + chinese-new-year + tet + lunar-new-year + valentines + 4th-of-july (10+ candidates)
- Community-context cluster extension: library + fire-station + police-station + bank + restaurant + farm-stand (4+ candidates)
- Home-context cluster expansion: around-the-house + decoration + appliances (3+ candidates)
- Daily-life cluster expansion: laundry + bath-time + bedtime + morning-routine + grocery-shopping (5+ candidates)
- Cultural-arts cluster expansion: dance + arts-and-crafts + sports + theater (4+ candidates)
- Plant cluster expansion: garden + jungle + meadow (3+ candidates)
- Animal cluster expansion: wild-animals + safari-animals + arctic-animals + extinct-animals (4+ candidates)
- Misc (20+ candidates): space + tools + technology + travel-and-holiday + various others

## 2. Pre-locked architecture (do NOT relitigate)

Per CLAUDE.md §6 + Pillar 2 Arc 1-5 ship state. CC adjudicates within these locks.

- **Bundle architecture pluralism continues.** 13 distinct patterns confirmed at Arc 5 close; new bundles compose patterns based on theme + strand profile.
- **Theme-axis-key density audit pre-Phase-2.** Threshold ~3 packages minimum for minimum-viable bundle architecture.
- **DB-seed graceful-degradation pattern reusable.** Per Arc 2.
- **Cross-bundle package sharing encouraged.** ~25+ packages reused at Arc 5 close; pattern continues compounding.
- **Template-based composition viable.** Seasonal-template (3+ instantiations) + holiday-template (2 instantiations) empirically validated; future template families structurally available.
- **Cross-strand crossover composition flexible.** Community-context + emotion-regulation crossover at hospital-bundle precedent — bundles can compose ANY strand pair as pedagogically coherent.

## 3. Phase shape (operator chooses at commencement)

Pillar 2 Arc 6 offers four potential shapes; CC default-recommends based on operator strategic priority + post-Arc-5 catalog state:

### Shape A — Continued bundle expansion (3-4 additional bundles + recon)

- **Phase 1:** 3-4 CC-adjudicated theme picks. Candidate themes (CC default-recommended):
  - **hospital-bundle-PIVOT** OR **library-bundle** (themeAxisKey: library) — extends community-context cluster
  - **arts-and-crafts-bundle** OR **dance-bundle** — extends cultural-arts cluster
  - **around-the-house-bundle** — extends home-context cluster
  - **garden-bundle** — extends plant cluster (anchor for outdoor-classroom contexts)
  - **morning-routine-bundle** — extends daily-life cluster (parallels breakfast)
- **Phase 2:** 3-4 additional bundles + bundle theme-axis-key density audit refresh.
- **Phase 3:** Recon + Pillar-2-Arc-7 spec drafting.

### Shape B — Deck-bundle linkage tooling

- **Phase 1:** Author `frontend/scripts/link-bundle-decks.ts` companion script — populates `deckIds: []` across existing 37 bundles via matching theme-axis-key + locale + educational-level + subject-tags criteria. Graceful-degradation pattern per Arc 2 seed-teaching-bundles.ts. **Increasingly attractive at 37-bundle catalog scale.**
- **Phase 2:** Run linkage tooling against production deck catalog. Update bundles' deckIds in YAML; commit linkage state.
- **Phase 3:** Recon + Pillar-2-Arc-7 spec drafting.

### Shape C — Locale-variant bundle audit

- **Phase 1:** Audit subscriber-data signal OR operator-stated need for bundle-level pt variants. Catalog which existing 37 bundles would benefit from pt-variant authoring.
- **Phase 2:** Author 2-3 pt sparse-override bundles per audit findings (parallel pattern to package.pt.yaml sparse-override).
- **Phase 3:** Recon + Pillar-2-Arc-7 spec drafting.

### Shape D — Holiday-template extension (NEW at Pillar 2 Arc 6)

- **Phase 1:** 4 holiday-themed bundles per established template (action-verbs + counting + color-sorting + cross-cultural-greetings + four-seasons). Candidate themes:
  - **thanksgiving-bundle** (themeAxisKey: thanksgivinng per topics-taxonomy.json — typo lock-in)
  - **halloween-bundle** (themeAxisKey: halloween if registered)
  - **valentines-bundle** (themeAxisKey: valentines if registered)
  - **4th-of-july-bundle** (themeAxisKey: 4th_of_july)
- **Phase 2:** 4 additional holiday bundles (diwali + hanukkah + chinese-new-year + ramadan candidates).
- **Phase 3:** Recon + Pillar-2-Arc-7 spec drafting.

## 4. Concurrent-arc compatibility

Pillar 2 Arc 6 supports concurrent-arc commencement per Arc 12+ precedent + (P3) β shape 3-cycle validation. Likely concurrent candidates at Pillar 2 Arc 5 close:

- **Pillar 4 Arc 2 Phase 3** — 200-package integration scoped to 143 actual; downstream Phase 2 mass-generation close
- **Stream A Arc 2** — if operator commissions
- **Arc 16** — if final ~150 lesson-plan-target requires additional packages

CC default-recommendation: (β-continued) Pillar 4 Arc 2 Phase 3+ + Pillar 2 Arc 6 paired commencement per the empirically-validated 3-cycle β shape pattern.

## 5. Verification expectations

- Per-bundle YAML validates against `frontend/scripts/author-teaching-bundle.ts` schema
- Theme-axis-key verified in topics-taxonomy.json axes.theme map
- DB-seed graceful-degradation script runs clean against any new bundles
- Cross-bundle package reuse maintained or increased (current ~25 of ~143 master packages reused; target maintain or grow)
- Holiday-bundle additions (if Shape D) use locked 5-package strand-spread template

## 6. Authorization

Operator-strategic decisions at commencement:

1. **Phase shape choice** (Shape A vs B vs C vs D) — operator picks at commencement. CC default-recommends:
   - Shape A if catalog growth momentum continues
   - Shape B if deckIds population is operator priority (catalog at 37 bundles increasingly justifies linkage tooling)
   - Shape C if subscriber-data signal warrants locale-variant bundle work
   - Shape D if operator wants holiday cluster build-out (template ready post-Arc-5)
2. **Theme picks** (if Shape A or D) — adjudicator-forward per CC selection from candidate themes; operator override at glance-review surface only.
3. **Concurrent-arc evaluation** — at Pillar 2 Arc 5 close per Pillar 4 Arc 2 Phase 3+ commencement candidate.

## 7. Out of scope (Pillar 2 Arc 7+)

- Bundle thumbnail asset authoring (operator-pace separate work)
- LessonPlan linkage population (blocked on Pillar 1 clause (a) lesson-plan-content authoring)
- DB-seed invocation (deferred until operator strategic timing)
- ~60+ remaining themes (gradual coverage across Arc 6-10+)
- Bundle-flashcard linkage (Pillar 4 Arc 3+ candidate per flashcard-arc-2-commission-spec.md §7)

## 8. Cost projection

- **Shape A:** ~1-2 sessions; ~1500-2500 LoC; 3-4 new bundles + 3-4 additional + recon
- **Shape B:** ~1 session; ~500-800 LoC (link-bundle-decks.ts script + run-output)
- **Shape C:** ~1-2 sessions; ~1000-1500 LoC (2-3 pt sparse-override bundles + recon)
- **Shape D:** ~1-2 sessions; ~1500-2500 LoC; 4 holiday bundles + 4 additional + recon

Within Pillar 2 Arc 1-5 session-count precedent.

## 9. Q-recon at Arc 5 close

Pillar 2 Arc 5 closed at 37 bundles. v3 launch-trigger C6 progress: bundle catalog continues toward final operator-strategic target (~50? ~80? Unknown at this point; CC commission specs continue per operator commission cadence).

**Operator-strategic decisions surfacing at Pillar 2 Arc 5 close:**

- Pillar 2 Arc 6 Shape choice + ratification timing
- Concurrent-arc pairing (β-continued with Pillar 4 Arc 2 Phase 3 OR alternative)
- Pillar 4 Arc 2 Phase 2 mass-generation timing (currently paused per cost-balloon escape hatch surface)
- (μ) slug-rationalization commission timing (deferred indefinitely; surfaces at operator strategic moment)

CC awaits operator direction at Pillar 2 Arc 5 close + Pillar 4 Arc 2 Phase 2 cost-balloon resolution session.

---

*End of Pillar 2 Arc 6 commission spec draft.*
