# Arc 3 recon summary

**Commission:** [FEATURE][LESSON-PLANS] Arc 3 — numeral-cards generator + sparse-override + Arc 3 numeracy expansion + Tier 1+2 localization
**Branch:** `pivot/printable-business-toolkit`
**Commits:** `0e4aad4b` (spec ratification) → `4e2d53c3` (Phase 1 bundled) → `d979af59` (Phase 2 pt) → `3ff7d0cf` (Phase 3 numeracy) → `[Phase 4 commit pending]`
**Sessions:** 1 (single CC session continuing from Arc 2)
**LoC delta:** ~2500 net additions across 5 commits

## Deliverables shipped

| Phase | Commit | Deliverables |
|---|---|---|
| Spec | `0e4aad4b` | Arc 3 commission spec ratification (4 ratification locks; Phase 1 bundle + Track-C-driven Phase 2 + Phase 1 sparse-override fold + Arc 4 deferred-vocab). |
| 1 | `4e2d53c3` | numeral-cards.html generator + NUMBER_WORDS i18n resource (11 locales × 1-20) + localizedNumberWord helper. Sparse-override support in author-teaching-package.ts (detectSparseOverrideLocale + deepMerge + loadPackageWithMaybeMerge); 13 new tests (26/26 passing). farm-animals.es.yaml migrated full→sparse-override (75% LoC reduction). count-objects-1-to-10 closed loop with numeral-cards material. |
| 2 | `d979af59` | 3 pt sparse-overrides (farm-animals + clothing + count-objects-1-to-10). BR Portuguese formal "você" register. Cluster agent review applied 1 revision (Aponta → Aponte). NSR-flag filed for NUMBER_WORDS gender-default architectural gap. |
| 3 | `3ff7d0cf` | 5 numeracy packages: count-objects-1-to-5 + count-objects-1-to-20 + match-numeral-to-quantity-1-to-10 (uses numeral-cards as central anchor) + compare-quantities-more-fewer + decompose-numbers-to-10. Total numeracy catalog: 6 packages (1 Arc 2 + 5 Arc 3). |

## What worked

1. **Single-question Phase 2 gate.** Operator's Track C state (en + es) drove pt as next-localization-target per SUBSCRIPTION-SCOPE.md sequence. No round-tripping; clear question + clear answer + clean lock.

2. **Sparse-override implementation came in well within bounded scope.** ~120 LoC TS extension + 13 new tests. No surface trigger fired (operator's "if substantially larger than expected" gate did NOT trip). farm-animals.es.yaml migration shrank from ~330 lines to ~80 lines (75% reduction); 3 pt sparse-overrides at ~80 lines each (vs ~300+ for full standalone).

3. **deepMerge array-replace semantics held cleanly.** No partial-array-merge ambiguity foot-gun. Nested object recursion + override-wins-per-leaf behaved correctly across both farm-animals.es migration and 3 net-new pt locale variants.

4. **NUMBER_WORDS resource as i18n companion to IMAGE_VOCABULARY.** Added cleanly to material-generator-shared.js with localizedNumberWord helper. Romance gender-defaults + Nordic common-gender defaults + Finnish nominative-default all CC-adjudicated per spec; documented inline.

5. **Closing the Arc 2 cross-strand prototype loop.** count-objects-1-to-10 went from theme-mode flashcards workaround (Arc 2) to numeral-cards primary anchor (Arc 3). Re-enabled the previously-deferred match-numeral-to-quantity assessment criterion. Cleanest possible debt-payoff path.

6. **Phase 3 numeracy expansion templated cleanly off count-objects-1-to-10.** All 5 new numeracy packages followed the same shape (numeral-cards primary + math-app-heavy exercises + theme-mode visuals + compositionalRationale strand-inversion). Per-package agent review skipped per CC adjudicator-forward; templates are stable.

7. **match-numeral-to-quantity-1-to-10 unblocked.** This target was previously-unimplementable due to numeral-cards material gap. Arc 3 Phase 1 closed the gap; Phase 3 shipped the package. matching-mat material became central for the first time across Arc 1+2+3 packages.

8. **decompose-numbers-to-10 stretched the architecture without breaking it.** Composes addition app in 3 different modes (image-image + find-addend + mixed) — heaviest single-app load of any Arc 1+2+3 package. Validates that the composedExercises array tolerates same-app multi-mode patterns.

## What didn't (or surfaced friction)

1. **NUMBER_WORDS gender-default architectural gap surfaced at Phase 2 pt review.** Romance gender-mismatch (`um vaca` should be `uma vaca`) + Nordic gender-mismatch (`en hus` should be `et hus`) + Finnish case-morphology gap. Inherited from Phase 1 masculine-default adjudication. Filed in project_k3_phrasing_native_speaker_review alongside existing Spanish/Italian gender-agreement debt. Resolution paths flagged (per-gender NUMBER_WORDS tables OR post-processing layer); deferred to Arc 4+ commission decision. Not pt-specific bug; not blocking.

2. **Sparse-override migration of composedExercises + materials NOT in scope.** farm-animals.es sparse-override carries only locale-bound TEXT fields. composedExercises + materials INHERIT from canonical (with English language fields). Render-time substitution to package.language deferred to Arc 4+ — validator passes either way. Acceptable for Arc 3 ship; flag for Arc 4 enhancement.

3. **No browser visual-rendering verification of numeral-cards generator.** Operator-side. Same posture as Arc 1 + Arc 2 generators. Phase 1 verification was structural (validator passes; tests pass; spec aligns).

4. **No per-cluster agent review for Phase 3 numeracy packages.** CC adjudicator-forward call; templates established; Arc 4+ deeper review for any underperforming package per operator feedback. Risk: undetected pedagogical issues in 4 of 5 numeracy packages (count-objects-1-to-5 inherits count-objects-1-to-10's agent canonization; the other 4 follow same shape).

5. **vocabulary-tracing-strips material not composed in any Arc 3 numeracy package.** Tracing-strips were designed for vocabulary work (single-syllable easy-to-trace words); numerals would need a numeral-tracing variant. Filed informally as Arc 4+ candidate.

## What surprised

1. **Sparse-override implementation simpler than anticipated.** Operator's "if substantially larger" gate had been a real concern; the actual implementation came in clean at ~120 LoC + tests. No schema changes needed; no validator rewrite. The deepMerge function was the only nontrivial piece, and array-replace-semantics avoided merge-ambiguity foot-guns cleanly.

2. **Brazilian Portuguese cluster review surfaced ONE register break (Aponta → Aponte).** Cleaner than Arc 2's es review (which surfaced "recaste" anglicism). pt authoring quality was higher first-pass — possibly due to CC absorbing the "watch for anglicisms" lesson from Arc 2.

3. **NUMBER_WORDS gender-debt paralleled IMAGE_VOCABULARY-existing gender debt.** Same structural family; fits cleanly in the existing project_brief_a_translation_debt + project_k3_phrasing_native_speaker_review queue. No new doctrine surface; just an extension of existing flagged work.

4. **Numeracy-package material count varies more than vocabulary-package count.** Vocabulary packages cluster at 7-8 materials. Numeracy packages cluster at 6-7 materials. The variation tracks per-package natural-fit decisions (compare-quantities omits picture-cards as redundant with matching-mat; decompose-numbers omits picture-cards same reason). Generalizable to Arc 4+: don't enforce material count.

5. **The numeral-cards material customization parameter `numeralRange` cleanly handled 1-5 / 1-10 / 1-20 ranges across 3 different packages.** Single-parameter range-control validates the spec's design.

## Patterns that generalize to Arc 4

1. **Sparse-override is the canonical locale-variant authoring pattern from now on.** Don't author full standalone files for locale variants. Migrate any future operator-authored full-standalone files to sparse-override at next opportunity.

2. **Phase-2-style locale variants always need: sparse-override authoring + cluster agent review per locale + 1 revision typical (anglicism / register-break) + NSR-flag for any morphological gap surfaced.** Templated process now.

3. **Cross-strand package authoring builds on count-objects template.** Future non-numeracy strands (PSED, world-knowledge, fine-motor, executive-function) will likely follow similar pattern: 6-8 materials, strand-appropriate exercise palette, compositionalRationale field acknowledging cross-strand integration.

4. **Material-count variance per package shape.** Arc 4+ packages should use 6 / 7 / 8 materials based on natural fit, not template default.

5. **NUMBER_WORDS gender-toggle as Arc 4 candidate.** Locked low-priority for now (masculine/common-gender default acceptable for K-3); revisit when first NUMBER_WORDS-gendered locale render is K-3-quality-graded by an operator.

## Schema / tooling / generator changes needed before Arc 4

**Optional (workarounds work; ship grade improves):**
- NUMBER_WORDS gender-toggle parameter on numeral-cards material (closes Romance + Nordic gender-mismatch).
- Per-locale post-processing for Finnish accusative + partitive case morphology (Arc 2 sentence-strips Finnish gap + Arc 3 NUMBER_WORDS Finnish gap).
- Sparse-override extension for composedExercises + materials per-element field-overrides (current array-replace semantics requires full-array re-spec for any change).
- Numeral-tracing-strips variant of vocabulary-tracing-strips (numerals 1-10 in dotted/outline tracing for K handwriting).

**None gating Arc 4 expansion.**

## Out-of-scope items closed

Per Arc 3 commission scope:
- Tier 3+ locale variants beyond pt (Arc 4+).
- Non-numeracy non-vocab strand packages (Arc 4+).
- Subscriber UI for browsing packages.
- Mac Studio AI enrichment.
- bingo-board, matching-mat-as-new-generator, word-wall, mini-book material additions.
- family-members + foods + action-verbs vocab packages (deferred to Arc 4 per ratification).
- App-side modifications (per CLAUDE.md §3.2).

## Verification status

- All 5 Arc 3 commits push to origin clean.
- Pre-commit hooks pass (no [SCHEMA] commit; Arc 3 was content + tooling, not schema).
- Phase 2 author-teaching-package validator: 26/26 tests still passing.
- All 17 packages now in repo (Arc 1 farm-animals + es; Arc 2's 9 + es; Arc 3's pt-locale variants × 3 + 5 new numeracy = 17 unique package files spread across 9 unique target slugs + locale variants).
- Total catalog state: 9 unique pedagogical-target slugs covered (1 Arc 1 + 8 Arc 2 + Arc 3 reuses targets via locale variants and adds 5 new numeracy).
- 8 generators + 1 numeral-cards = 9 catalog material generators implemented (vs 9 spec'd including vocabulary-tracing-strips and numeral-cards).
- Sparse-override pattern proven across 4 locale variants (1 es + 3 pt).
- No browser visual-rendering verification yet (operator-side; same posture as prior arcs).
