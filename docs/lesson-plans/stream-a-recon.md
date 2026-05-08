# Stream A Phase 1-3 recon summary

**Commission:** [INFRA][LESSON-PLANS] Stream A — IMAGE_VOCABULARY substrate sweep escalation (Phase 1: family-members + action-verbs extension; Phase 2: NUMBER_WORDS infrastructure; Phase 3: gender-data audit + recon)
**Branch:** `pivot/printable-business-toolkit`
**Authorized:** Arc 11 close 2026-05-08 (Option σ-α Stream A escalation; concurrent parallel arc).
**Commits:** `29d158c4` (Phase 1: 17 IMAGE_VOCABULARY entries + commission specs) → `[Phase 2 + 3 commit pending]`. Stream A Phase 1 ship CLOSED the 7-arc family-members + action-verbs deferral chain.

## Deliverables shipped

| Phase | Deliverable | Detail |
|---|---|---|
| 1 | IMAGE_VOCABULARY family-members + action-verbs extension | 17 entries (7 family-members + 10 action-verbs) across 11 platform locales with full singular + plural + grammatical gender. Vocab count 1246 → 1263 (+1.4%). |
| 2 | NUMBER_WORDS infrastructure | New file at REFERENCE TRANSLATIONS/number-words.js with 11-locale 1-20 cardinal numbers + gender-toggle for "1" in Romance locales (es/it/pt/fr) + helper module exposing get(numeral, locale, gender) + hasGenderToggle(numeral, locale). Module + browser exposure. |
| 3 | gender-data audit script + this recon | New script at frontend/scripts/audit-image-vocabulary-gender.js auditing all 1263 entries against per-locale gender conventions. Findings: 141 minor data-quality issues across 3 locales surfaced for operator-side review. |

## Audit findings (Stream A Phase 3 surface)

**Per-locale gender-data audit on 1263 IMAGE_VOCABULARY entries:**

| Locale | Status | Issues | Detail |
|---|---|---|---|
| en | CLEAN | 0 | No gender required |
| fi | CLEAN | 0 | No gender required |
| de | CLEAN | 0 | All entries have valid m/f/n |
| fr | CLEAN | 0 | All entries have valid m/f |
| es | CLEAN | 0 | All entries have valid m/f |
| pt | CLEAN | 0 | All entries have valid m/f |
| it | CLEAN | 0 | All entries have valid m/f |
| no | CLEAN | 0 | All entries have valid m/f |
| **nl** | **125 invalid-gender** | 125 | gender="h" instead of expected d/n. Likely "het" article shortened erroneously during prior data-import. Sample: baby-girl, bacon, beach. |
| **sv** | **15 invalid-gender** | 15 | gender="d" instead of expected n/t. Sample: alarm-clock, analog-clock, apricot. |
| **da** | **1 invalid-gender** | 1 | gender="d" — single entry: bat. |

**Total: 141 issues across 3 locales.**

**Operator-side review needed for:**
1. **nl gender="h" pattern (125 entries)** — likely systematic data-import bug. Resolution options: (a) bulk-corrective UPDATE to map "h" → "n" (Dutch het = neuter); OR (b) operator-curated audit per-entry if some "h" usages are intentional. Bulk option recommended pending operator confirmation.
2. **sv gender="d" pattern (15 entries)** — likely confused with Dutch "d" convention. Resolution: bulk UPDATE "d" → appropriate sv-specific gender ("n" or "t" per noun gender; needs per-entry lookup).
3. **da bat gender="d"** — single isolated issue; quick manual fix to "n" (Danish neuter).

**No issues blocking lesson-plan-arc consumption** of family-members + action-verbs vocabulary. Audit findings are data-quality refinement opportunities; not gating downstream work.

## What worked

1. **7-arc deferral chain CLOSED at first opportunity.** Stream A Phase 1 IMAGE_VOCABULARY extension shipped at Arc 12 commencement enabled Arc 12 Phase 1 Path A engagement (family-members + action-verbs packages authored in same session).

2. **NUMBER_WORDS schema mirrors IMAGE_VOCABULARY pattern.** Locale-specific data with optional gender-toggle. Helper module API straightforward (get + hasGenderToggle).

3. **Gender-toggle handled correctly in NUMBER_WORDS.** "1" in es/it/pt/fr returns m/f forms; en/fi/etc. ignore gender parameter; de always returns "eins" cardinal (article-form deferred to material-side parameter).

4. **Audit script idempotent + non-blocking.** Surfaces findings without halting downstream work. Operator-side review at natural cadence.

5. **Filesystem-territory separation maintained.** Stream A territory exclusively touched: REFERENCE TRANSLATIONS/image-vocabulary.js + REFERENCE TRANSLATIONS/number-words.js + frontend/scripts/audit-image-vocabulary-gender.js + docs/lesson-plans/stream-a-*.md. Zero overlap with Pillar 2 OR Arc 12 territories.

## What didn't (or surfaced friction)

1. **141 gender-data issues surfaced (operator-coordination).** Not Stream A scope to bulk-correct (per spec §5: "surface any large-scale gender-data corrections needed (operator-coordination work item)"). Filed for operator review.

2. **NUMBER_WORDS v1 limited to 1-20.** Stream A Phase 2 scope kept minimal; tens (30-100) deferred to Stream A Arc 2 if numeracy work warrants. Currently 1-20 sufficient for K-3 K-Grade-1 work + skip-counting work uses multiples-of-N (skip-count-by-2 + 5 + 10 packages).

3. **de gender-toggle simplified.** Returns "eins" cardinal regardless of gender parameter; article-form ("ein"/"eine"/"einen") is locale-specific to gender + grammatical case. Material-side handles article rendering separately.

## What surprised

1. **No issues in 8 of 11 locales.** Most gender data is clean — only nl (systematic) + sv (small) + da (isolated) surfaced issues.

2. **nl "h" pattern is systematic (125 entries).** Suggests automated import error rather than per-entry author mistakes. Bulk-fix more efficient than per-entry review.

## Cross-arc unblocking confirmation

- **family-members (8 entries)**: father, mother, sister, brother, grandfather, grandmother, baby (existed), family — ALL AVAILABLE for Arc 12+ package authoring.
- **action-verbs (10 entries)**: run, jump, walk, sit, stand, sleep, eat, drink, play, read — ALL AVAILABLE.
- **NUMBER_WORDS 1-20**: AVAILABLE for numeral-cards material gender-toggle parameter (Arc 12+ numeracy work).
- **Audit findings**: 141 issues filed for operator-side review; not blocking downstream.

## Stream A Arc 2 candidates (deferred)

- NUMBER_WORDS tens/hundreds extension (30-100 + ordinals) IF numeracy work warrants
- Bulk gender-data corrections per audit findings (operator-coordination commission)
- IMAGE_VOCABULARY further extensions IF lesson-plan arcs surface substrate gaps in additional vocab domains (e.g., body-parts extended for medical-context; clothing extended for cultural-dress; etc.)

## Verification status

- IMAGE_VOCABULARY syntactic validation via node require ✓
- NUMBER_WORDS module + helper API tested ✓ (1-en, 1-es-m/f, 1-de, 5-pt, 17-fi all return expected values)
- audit script runs clean on all 1263 entries (0 fatal errors; 141 data-quality findings surfaced)
- All commits push to origin clean; pre-commit hooks pass
- Filesystem-territory separation verified at every commit

## Closure

Stream A Phases 1-3 complete. **7-arc family-members + action-verbs deferral chain CLOSED.** NUMBER_WORDS infrastructure shipped. Gender-data audit complete with 141 minor data-quality findings filed for operator-side review.

Stream A as concurrent arc winds down at Phase 3 ship; Stream A Arc 2 candidates filed for future commissioning when warranted by lesson-plan arc work.

Cross-arc state: Pillar 2 + Arc 12 lesson-plan arcs continue per their respective schedules.
