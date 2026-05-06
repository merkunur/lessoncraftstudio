# Arc 3 commission spec — numeral-cards generator + Arc 3 numeracy expansion + Tier 1 + 2 localization

**Type:** `[FEATURE][LESSON-PLANS]` — generator implementation + content authoring
**Branch:** `pivot/printable-business-toolkit`
**Estimated phases:** 5 sub-commits
**Estimated LoC:** ~3000-5000
**Estimated sessions:** 4-6

This is a draft spec. Operator ratifies / revises before commissioning Arc 3 to a future CC session.

## 1. Context

Arc 2 closed with 10 packages shipped (Arc 1 farm-animals + Arc 2's 9 + es localization) and the cross-strand fold validated the architecture for non-vocabulary-strand work. The numeral-cards material spec landed at Arc 2 boundary; Arc 3 implements the generator + expands the numeracy strand.

Arc 3 ships:
1. **numeral-cards material generator** (Arc 2-landed spec → Arc 3 implementation). Highest priority — gates 5+ Arc 3 numeracy packages.
2. **5 numeracy packages** (count-objects-1-to-5 / count-objects-1-to-20 / match-numeral-to-quantity-1-to-10 / compare-quantities-more-fewer / decompose-numbers-to-10) — expand cross-strand confidently per Arc 2 validation.
3. **3 Tier 1 + 2 locale variants** of Arc 1+2 packages (de-localized + nl-localized of farm-animals + clothing + count-objects, per operator's en+de+es+nl Tier 1+2 priority).
4. **Sparse-override storage convention** for locale variants (current full-file duplication doesn't scale past ~3 locales per package).
5. **Optional: deferred vocab packages** if scope budget allows (family-members + foods + action-verbs per Arc 1 agent's "save for later" flag).

Out of scope for Arc 3: Tier 3+ locale variants (Arc 4+); subscriber UI; AI enrichment; bingo-board / matching-mat / word-wall / mini-book material additions.

## 2. Pre-locked architecture (do NOT relitigate)

Per Arc 1 + Arc 2 ship state. CC adjudicates within these locks; do not surface for confirmation:

- Schema: TeachingPackage + BundleTeachingPackage stable; no migration needed.
- Storage convention: docs/lesson-plans/packages/<target-slug>/package.yaml + package.<locale>.yaml.
- Validator contract: frontend/scripts/author-teaching-package.ts; passes unknown fields through.
- Materials catalog: 10 v1 entries (8 generators + vocabulary-tracing-strips + numeral-cards SPEC). Arc 3 Phase 1 implements numeral-cards generator.
- Exercise palette: 29 §14.10 apps unchanged; per CLAUDE.md §3.2 do NOT modify any app.
- Article auto-resolution + sentence-strips: 11-locale FRAME_BY_LOCALE (Romance Tier 1+2 full grammar; Nordic NSR-flagged).
- 8 MVP generalizations from Arc 1 agent review (still binding).
- Arc 2 cross-strand findings (still binding):
  - Vocabulary packages: 8-material baseline. Numeracy packages: 6-material baseline.
  - theme-mode workaround for non-vocab targets.
  - chart-count app has empty exercise-customization-parameters; pass only universal layer.
  - Frame template undersize for numeracy: only there-are-count-plural reinforces counting.

## 3. Phase plan

### Phase 1 — numeral-cards material generator (1 sub-commit)

Implement the Arc 2-landed spec.

Deliverables:
- `REFERENCE APPS/material-generators/numeral-cards.html` (new generator HTML; mirrors flashcards.html shape but renders numerals + number-words instead of images + vocabulary labels).
- `REFERENCE TRANSLATIONS/material-generator-shared.js` extension: NUMBER_WORDS resource per locale (en: ["one","two",...,"twenty"]; de: ["eins","zwei",...]; es: ["uno","dos",...]; etc.); helper function `localizedNumberWord(n, locale)`.
- `REFERENCE APPS/material-generators/README.md` updated.

Verification: render numeral-cards in browser for at least 3 locales (en + de + es); spot-check pdf output for K-3 readability.

**CC adjudication on number-word grammar:** Spanish + Italian + Portuguese have gender variants for "one" (uno/una; uno/una). CC adjudicates to use masculine default ("uno") with note that future Arc 4+ work may add gender-toggle. Finnish "yksi"/"yhden"/"yhtä" case morphology is single-form for K-3 cards (nominative "yksi"); document NSR-flag in commit body if Phase 1 surfaces uncertainty.

### Phase 2 — 5 numeracy packages (en authoring; 1-2 sub-commits)

1. count-objects-1-to-5 → simpler precursor to count-objects-1-to-10
2. count-objects-1-to-20 → extension; integrates teen numbers (10-20)
3. match-numeral-to-quantity-1-to-10 → uses new numeral-cards material; previously-unimplementable target
4. compare-quantities-more-fewer → comparison; integrates more-less app heavily
5. decompose-numbers-to-10 → extends to 7=4+3=5+2 patterns

Each package: theme-mode (operator picks visual content), 6-material baseline (mirrors count-objects-1-to-10), uses numeral-cards material, math-app-heavy exercise composition.

Per-package agent review: cluster review across all 5 (operator's "extra attention" was for the Arc 2 prototype; Arc 3 numeracy is now templated work).

### Phase 3 — 3 Tier 1 + 2 locale variants (1-2 sub-commits)

Localize 3 Arc 1+2 packages to de + nl (Tier 1+2 priority per §19):
- identify-and-name-10-farm-animals → de + nl (farm-animals.de.yaml + farm-animals.nl.yaml)
- identify-and-name-clothing → de + nl
- count-objects-1-to-10 → de + nl

Total: 6 locale-variant files.

CC adjudicates locale-specific register per CLAUDE.md §17.9 cross-locale teacher-address-register doctrine (de: Sie-form; nl: u-form). Agent reviews per locale (1 review per locale, NOT per package — operators in DE-medium classroom + nl-medium classroom can validate full-locale register at cluster level).

### Phase 4 — Sparse-override storage convention (1 sub-commit)

Phase 4 introduces sparse-override locale-variant pattern + extends author-teaching-package.ts to merge canonical + override at validation time.

Per docs/lesson-plans/packages/README.md original convention: only locale-bound fields in `package.<locale>.yaml`. Non-locale-bound fields (composedExercises, materials, durationMinutes, etc.) inherited from canonical.

Validator extension:
- Detects package.<locale>.yaml as sparse override
- Merges with package.yaml at validation time
- Validates the merged result against schema

Migrate Arc 2 farm-animals.es.yaml to sparse-override pattern (proves migration works); Arc 3 Phase 3 uses sparse-override format directly for de + nl variants.

### Phase 5 — Recon summary + Arc 4 commission spec (1 sub-commit)

Arc 4 likely scope:
- Tier 3+ locale variants (sv/fi/no/da) — Nordic NSR pass + closing the suffix-article + case-marking architectural gaps from Arc 2.
- Deferred vocabulary packages: family-members + foods + action-verbs.
- Subscriber UI for browsing packages (or deferred to Arc 5).

## 4. Adjudication delegations (CC handles without surfacing)

- Per-package vocab list (verify all keys against IMAGE_VOCABULARY pre-authoring).
- Number-word grammar choices (uno vs una; nominative vs accusative for Finnish numerals).
- numeral-cards generator UI shape + customization parameter ranges.
- Sparse-override merge semantics (last-write-wins per field; validator-fail on missing-canonical-required-field).
- Per-locale CLIL register (Sie-form for de; u-form for nl per §17.9 lock).
- Phase 2 numeracy package commit cadence (1 commit × 5 packages OR 2 commits × 3+2; CC picks).
- Phase 3 locale variant commit cadence (1 commit × 6 files OR per-locale 2 commits; CC picks).
- Per-package agent review depth (cluster review for templated work; full review per locale for net-new locale variants).

## 5. Surface only at

- Phase 5 commit (Arc 2-style recon + Arc 4 commission spec) — operator ratifies before commissioning Arc 4.
- If anything contradicts Arc 1 + Arc 2 architectural locks (per §2 above) — surface early.
- If Phase 1 numeral-cards generator surfaces a pedagogical-design choice CC can't adjudicate (e.g., should number-words always render alongside numerals, or operator-toggle?). 
- If Phase 4 sparse-override semantics expose a load-bearing schema decision (e.g., what happens when locale variant has FEWER materials than canonical — is that a override-omits or a override-error?).

## 6. Verification

### Phase 1 (numeral-cards generator)
- numeral-cards.html opens in browser; render 1-10 numeral cards in en + de + es; visual spot-check.
- NUMBER_WORDS resource extends material-generator-shared.js cleanly.
- README updated.

### Phase 2 (5 numeracy packages)
- All 5 packages validate clean via Phase 2 CLI.
- Cluster agent review applied + iteration documented.
- compositionalRationale field on each package.

### Phase 3 (locale variants)
- 6 locale-variant files validate (or merge cleanly via Phase 4 sparse-override if Phase 4 ships first).
- Per-locale agent review applied (1 per locale = 2 reviews total for de + nl).

### Phase 4 (sparse-override)
- Validator extension preserves all 13 existing tests; adds new tests for sparse-override merge.
- Existing package.es.yaml migrated to sparse-override; validates clean.
- New de + nl variants authored as sparse-override directly.

### Phase 5
- arc-2-recon.md + arc-3-commission-spec.md (this file) read at handoff.
- arc-3-recon.md + arc-4-commission-spec.md authored.
- Operator ratifies Arc 4 spec.

### Cross-phase
- All commits push to origin.
- Pre-commit hooks pass (no [SCHEMA] commit expected — Arc 3 is content + tooling, not schema).
- Git status clean at end of each phase.

## 7. Out of scope (commission-locked)

- Tier 3+ locale variants beyond de + nl (Arc 4+).
- Non-numeracy non-vocab strand packages.
- Subscriber-facing UI for browsing packages.
- Mac Studio AI enrichment.
- SUBSCRIPTION-SCOPE.md re-lock against new package definition.
- 29/156 plan-count drift reconciliation (still in deferred queue).
- bingo-board, matching-mat, word-wall, mini-book material additions.
- App-side modifications to chart-count for theme-customization (per CLAUDE.md §3.2 do-not-modify).

## 8. Doctrine to load before starting Arc 3

- §1 (SEO + embed-virality flywheel — relevant for theme-agnostic packages locking)
- §3.4 (cooperation pattern; adjudicator-forward)
- §10 (Claude Code session conduct)
- §17.9 (Pillar 1 lesson-plan production discipline)
- §A.13.11 (operator-strategic adjudication batching at recon-completion)
- `docs/lesson-plans/arc-1-recon.md` + `docs/lesson-plans/arc-2-recon.md` (this commission's antecedents)
- `docs/lesson-plans/packages/identify-and-name-10-farm-animals/agent-review.md` (canonical iteration log; Arc 2 added es-localization audit trail)
- `docs/lesson-plans/taxonomy-v1.md` (203-target pedagogical-target taxonomy)
- `frontend/config/learning-targets.json` (early-numeracy strand for Arc 3 Phase 2 numeracy targets)
- `frontend/config/materials-catalog.json` (10 entries; Arc 3 Phase 1 implements numeral-cards generator)
- `frontend/lib/exercise-palette.json` (29 apps + chart-count empty-param caveat)
- `REFERENCE APPS/material-generators/sentence-strips.html` (FRAME_BY_LOCALE 11-locale coverage; Romance + Nordic NSR-flagged)

## 9. Authorization

This is a draft commission spec. Operator reviews + ratifies (or revises) before commissioning Arc 3 to a future session.

Subjects to surface for ratification before Arc 3 starts:
- **Phase 1 numeral-cards generator priority** — confirm Arc 3 starts with numeral-cards (gates Phase 2 numeracy expansion) vs. starts with Phase 2 packages using theme-mode workaround for the duration of Arc 3.
- **Phase 3 locale variant order** — de + nl per §19 Tier 1+2 priority (CC default) vs. operator override.
- **Phase 4 sparse-override priority** — implement at Arc 3 (CC default; benefits Phase 3) vs. defer to Arc 4 (Phase 3 ships full-file duplication; lower cost at 6-file scale).
- **Optional deferred vocab packages** — fold family-members + foods + action-verbs into Arc 3 if scope budget allows (CC default: NO, defer to Arc 4) vs. operator-pulled-forward.
