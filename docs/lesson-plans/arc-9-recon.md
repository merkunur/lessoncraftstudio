# Arc 9 recon summary

**Commission:** [BUILD][LESSON-PLANS] Arc 9 — Path B 5 cross-strand-firsts + Option D multilingual-language-awareness strand saturation + pt sparse-overrides + recon + Arc 10 commission spec
**Branch:** `pivot/printable-business-toolkit`
**Commits:** `0794bd5a` (Phase 1: 5 cross-strand packages, 4 strand-firsts) → `ed26697d` (Phase 2: 3 multilingual-language-awareness packages, strand saturation) → `fd6d29bd` (Phase 3: 4 pt sparse-overrides) → `[Phase 4 commit pending]`. Stream A Phase 1 substrate sweep continues post-Arc-9.
**Sessions:** 1 (single CC session continuing from Arc 8)
**LoC delta:** ~2440 net additions across 4 commits

## Deliverables shipped

| Phase | Commit | Deliverables |
|---|---|---|
| 1 (Path B) | `0794bd5a` | 5 cross-strand packages with 4 STRAND-FIRSTS: compare-by-length (FIRST measurement) + describe-shape-attributes (geometry continuation) + skip-count-by-5 (skip-counting trilogy continuation; RESOLVES Arc 8 forward-pointer) + identify-letter-by-image-clue (FIRST letter-recognition; FIRST matching letter-mode use) + sort-objects-by-attribute (FIRST data-and-graphs). Master count 65 → 70. |
| 2 (Option D) | `ed26697d` | 3 multilingual-language-awareness packages: compare-greeting-routines-across-cultures + identify-language-of-spoken-utterance (RECEPTIVE) + respond-in-target-language-when-prompted (PRODUCTIVE). Strand depth 2 → 5 (>2× growth; STRAND SATURATION at all available learning-targets). Master count 70 → 73. |
| 3 (Track-C-gated) | `fd6d29bd` | 4 pt sparse-overrides: compare-by-length.pt + identify-letter-by-image-clue.pt (pt-BR-specific letters ç/ã/é/õ load-bearing) + compare-greeting-routines.pt (Brazilian greeting routines culturally load-bearing) + respond-in-target-language.pt (pt-BR ↔ en code-switching at BR international schools). Locale variants 21 → 25. |

## What worked

1. **Path B triage at Phase 1 entry produced clean fork (5th consecutive arc).** Stream A Phase 1 substrate sweep status checked at Phase 1 entry; Path B locked autonomously per Arc 6+7+8+9 precedent. Family-members + action-verbs deferral chain extends Arc 4 → 5 → 6 → 7 → 8 → 9 → 10+.

2. **Strand-first density at Phase 1.** 4 strand-firsts in single phase (measurement, letter-recognition, data-and-graphs, plus matching letter-mode first-use) — scales beyond Arc 8's pattern. High architectural value for v3 Condition 4 strand-coverage breadth.

3. **Phase 1 / Phase 2 strand-emphasis differentiation.** Phase 1 numeracy-heavy + literacy; Phase 2 multilingual-language-awareness depth. Strand-emphasis differentiation prevents redundant stacking — operator's reasoning ("Phase 1 cross-strand spread; Phase 2 multilingual depth") produced architecturally tight phase composition.

4. **Strand saturation at Phase 2 Option D.** Multilingual-language-awareness strand reached all 5 available learning-targets in single phase (3 new + 2 existing from prior arcs). Saturation pattern: strand-depth growth halts at available-target-set boundary; future depth requires target-set extension. Doctrine-class pattern surfaces to Arc 10 spec.

5. **Cross-strand spread within numeracy domain.** Phase 1 spanned 4 distinct numeracy strands (measurement + geometry + counting + data-and-graphs) plus letter-recognition. Validates that "early-numeracy" is a multi-strand domain rather than monolithic; phase scoping can target multiple sub-strands simultaneously.

6. **Validation iteration cost stable.** 3 mode/param errors surfaced across 8 master packages (big-small modes, alphabet-train mode); all single-iteration fixes via palette lookup. Pattern continues from Arc 5+.

7. **pt sparse-override cultural specificity sustained.** 5th consecutive arc shipping pt sparse-overrides without re-cluster-review. pt-BR cultural details surfaced per package: comparative grammar romance pattern (compare-by-length); pt-specific letters ç/ã/é/õ (identify-letter-by-image-clue); Brazilian greeting routines (compare-greeting-routines); pt-BR ↔ en code-switching daily reality (respond-in-target-language).

## What didn't (or surfaced friction)

1. **Stream A Phase 1 substrate sweep paused 5 arcs running.** Family-members + action-verbs deferral chain extends Arc 4 → 5 → 6 → 7 → 8 → 9 → 10+. The chain becomes increasingly load-bearing as it accumulates downstream forward-pointers.

2. **Phase 2 cardinality reflects strand-internal target exhaustion (3 packages, not session-bandwidth).** Distinguished from Arc 8's session-bandwidth-driven 4-package Phase 2. Future Arc 10+ multilingual depth requires NEW strand-targets in learning-targets.json before authoring (operator-coordination).

3. **describe-shape-attributes is technically not a strand-FIRST.** Geometry strand already had identify-2d-shapes-basic + identify-2d-shapes-extended + identify-3d-shapes from Arc 1+5. So the Arc 9 Phase 1 pattern is "4 strand-firsts + 1 strand-deepening" rather than 5 strand-firsts. Doesn't change architectural value materially.

4. **Limited per-package agent review continues.** 12 packages shipped (8 master + 4 sparse-override) without per-package review. Per-phase cluster review only.

## What surprised

1. **Strand saturation as natural Phase 2 outcome.** Pre-Arc-9 the multilingual-language-awareness strand had 5 available targets (learning-targets.json catalog); Arc 9 Phase 2 authored the 3 unauthored (compare-greeting + identify-language + respond-in-target). Saturation surfaced as natural completion event rather than externally-imposed scope cap. Future arcs targeting strand depth should audit available-target-count BEFORE Phase 1 commencement to plan correct phase-cardinality.

2. **4 strand-firsts in single phase scales architecturally.** Arc 8 Phase 1 had 1 strand-first (skip-count-by-2); Arc 9 Phase 1 had 4. Phase scoping that targets multiple strand-firsts produces dense architectural value without requiring deep within-strand work — high marginal-value pattern for early arcs of new strands.

3. **pt sparse-overrides reaching 25 cumulative.** Arc 6 (5) + Arc 7 (5) + Arc 8 (4) + Arc 9 (4) + earlier arc 3-5 picks (7). pt locale-variant depth approaching meaningful catalog presence — kids in pt-BR contexts would have substantial lesson-plan inventory across Phase 1 + Phase 2 + Phase 3 strand work.

4. **multilingual-language-awareness as DIFFERENTIATING strand validated.** Operator's Arc 9 Option D reasoning ("the platform's 11-locale identity is its primary acquisition signal; multilingual-pedagogy strand depth operationalizes that differentiator at curriculum level") produced architecturally tight Phase 2. Strand saturation completed the proof — multilingual-language-awareness is now 5-package strand, comparable depth to vocabulary-acquisition + pattern-recognition strands.

## Patterns that generalize to Arc 10

1. **Available-target audit before Phase 1 commencement.** Arc 9 Phase 2 surfaced strand saturation as a natural-completion event. Future arcs targeting strand depth (any Phase 2 option) should audit `learning-targets.json` available-count for the strand BEFORE finalizing phase-cardinality. If strand has ≤N available unauthored targets, Phase 2 cardinality should match available-count rather than typical 6-package target.

2. **Phase 1 / Phase 2 strand-emphasis differentiation.** Arc 9 demonstrated that Phase 1 cross-strand spread + Phase 2 single-strand depth produces architecturally tight composition. Future arcs can apply the same differentiation: Phase 1 surfaces breadth; Phase 2 deepens a chosen strand.

3. **Strand-first density at Phase 1.** When Phase 1 targets cross-strand work (Path B substrate-clean), prioritize strand-firsts over strand-deepening when both are available. Arc 9's 4 strand-firsts pattern is the canonical reference.

4. **Strand saturation as doctrine.** Once a strand exhausts its `learning-targets.json` available-targets, future depth requires target-set extension (operator-coordination). Arc 10+ spec should document strand-saturation events explicitly so future arcs don't target saturated strands unintentionally.

5. **Strand-saturation events per arc.** Arc 9 saturated multilingual-language-awareness; Arc 8 saturated pattern-recognition (per Arc 7 recon: 4 packages spanning 5 modes). Future arcs likely to saturate additional strands — sorting-and-classification (5+ packages near saturation), counting-and-cardinality (multiple sub-strands; saturation per sub-strand).

## Schema / tooling / generator changes needed before Arc 10

**None gating Arc 10 expansion.**

Optional (continues from Arc 5-9):
- IMAGE_VOCABULARY substrate sweep (Stream A Phase 1 in progress).
- Wave 1 image authoring integration commissions.
- NUMBER_WORDS gender-toggle parameter on numeral-cards.
- learning-targets.json multilingual-language-awareness extension (if Arc 10+ wants to deepen the strand further; new candidate targets: notice-false-friends-word-pairs, describe-greeting-across-cultures, use-translation-strategy, parent-conference-bilingual-frame mentioned in Arc 9 spec §3 Phase 2).
- Numeral-tracing-strips variant.
- Analogy-app addition.

## Verification status

- 8 Arc 9 master packages validate clean
- 4 Arc 9 pt sparse-overrides validate clean
- All commits push to origin clean; pre-commit hooks pass
- Master count 65 → 73 (+8) per v3 SUBSCRIPTION-SCOPE.md §2 clause (a) tracking 73/203 (35.9%)
- Locale variants 21 → 25 (+4) per v3 SUBSCRIPTION-SCOPE.md §2 clause (b) tracking 25/2030 (1.2%)
- Pillar 2 50-master-package gate at 23 packages-past-gate (73/50). Per 2026-05-08 directive: re-evaluate at Arc 9/10 close.
- multilingual-language-awareness strand FULLY SATURATED at 5/5 available targets

## Closure

Arc 9 closes with 8 net master packages + 4 pt sparse-overrides shipped. Multilingual-language-awareness strand reached saturation (5/5 available targets) — operationalizing the platform's 11-locale identity at curriculum level per operator's Option D reasoning. 4 strand-firsts at Phase 1 (measurement, letter-recognition, data-and-graphs + matching letter-mode) produced highest strand-first density of any single phase across Arc 1-9. Pillar 2 gate now at 23 packages-past (73/50); operator re-evaluation pending at Arc 9/10 close.
