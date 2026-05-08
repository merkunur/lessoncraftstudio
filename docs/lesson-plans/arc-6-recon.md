# Arc 6 recon summary

**Commission:** [BUILD][LESSON-PLANS] Arc 6 — Path B substrate-clean vocab + vocab-anchored cross-strand expansion + pt locale-variant fold-in + recon + Arc 7 commission spec
**Branch:** `pivot/printable-business-toolkit`
**Commits:** `1b31a283` (Phase 1: 5 vocab packages) → `c49fdbf2` (Phase 2: 6 vocab-anchored packages) → `3750e4ce` (Phase 3: 5 pt sparse-overrides) → `[Phase 4 commit pending]`. Stream A Phase 1 substrate sweep continues post-Arc-6 (separate commit when ready).
**Sessions:** 1 (single CC session continuing from Arc 5)
**LoC delta:** ~3500 net additions across 4 commits

## Deliverables shipped

| Phase | Commit | Deliverables |
|---|---|---|
| 1 (Path B) | `1b31a283` | 5 substrate-clean vocab packages: point-to-named-zoo-animal + point-to-named-color + point-to-named-vehicle (3 receptive variants) + use-size-comparison-words + use-spatial-position-words (2 abstract-vocab packages). Drained the remaining Class A CLEAN vocab-acquisition substrate. |
| 2 (Option A) | `c49fdbf2` | 6 vocab-anchored packages spanning 3 strands: name-this-object-in-two-languages (FIRST multilingual-language-awareness package) + find-hidden-target-in-busy-scene + count-instances-of-target-in-grid (cognitive/memory-and-attention pair) + match-image-to-shadow + match-image-piece-to-whole + find-missing-piece (visual-discrimination trio). Vocab-anchor framing operationalized. |
| 3 (Track-C-gated) | `3750e4ce` | 5 pt Brazilian Portuguese sparse-overrides: point-to-named-zoo-animal.pt + point-to-named-color.pt + point-to-named-vehicle.pt + use-size-comparison-words.pt + name-this-object-in-two-languages.pt. Operator's Track C state: en+es; next-locale = pt. |

## What worked

1. **Path B triage at Phase 1 entry produced clean fork.** Stream A Phase 1 substrate sweep status checked at Phase 1 entry; substrate confirmed not ready (8/9 family-members + 6/10 action-verbs missing); Path B locked autonomously. The triage protocol from Arc 6 ratification 1 worked exactly as specified — CC adjudicated without round-tripping; family-members + action-verbs deferred to Arc 7 (or whenever Stream A Phase 1 + Wave 1.1+1.2 ship; whichever later).

2. **Vocab-anchored cross-strand expansion as Phase 2 interpretation.** With substrate-clean vocab targets exhausted by Phase 1, Phase 2's "Option A vocab-acquisition strand-depth" interpreted as vocab-anchored work in adjacent strands. The interpretation generalizes — every Phase 2 package preserves vocabulary as the pedagogical thread while contributing to a different strand's architectural shape. Validates that "strand-depth" doesn't require strict strand-internal authoring; cross-strand work preserving anchor-thread is equally valid.

3. **6-domain coverage achieved at Arc 6 ship.** name-this-object-in-two-languages closed the multilingual-language-awareness strand validation gap. Counting strict strand validation: vocabulary-acquisition + multilingual-language-awareness + counting-and-cardinality + number-sense-comparison + addition-subtraction + geometry + living-things + community-and-roles + sorting-and-classification + logical-reasoning + memory-and-attention + spatial-reasoning + visual-discrimination = 13 strands authored across 5 domains. Architectural breadth substantial.

4. **Visual-discrimination trio shipped together (Phase 2 #4-#6).** match-image-to-shadow + match-image-piece-to-whole + find-missing-piece form a coherent visual-discrimination strand-depth wave validating 3 distinct visual-spatial reasoning surfaces. Validates that strand-depth waves can ship as cohesive trios within a single phase.

5. **Phase 3 pt sparse-overrides shipped without re-review.** Arc 3-4 cluster-review-once-per-locale discipline holds — 5 pt sparse-overrides authored in single iteration, no register-shift refinement needed. The pattern of "cluster review at first arc; sparse-overrides at subsequent arcs without re-review unless register-shift" generalizes cleanly across arcs.

6. **Multilingual-language-awareness sparse-override pt cultural specificity.** name-this-object-in-two-languages.pt explicitly acknowledges Brazilian linguistic diversity (Spanish in border regions; indigenous languages — Tupi-Guarani, Macro-Jê, Karib families; immigrant communities — Italian/German/Japanese/Lebanese). The sparse-override deepens cultural-relevance beyond surface-level translation; this is the structural value of the multilingual-language-awareness strand showing through at locale level.

7. **Validation iteration pattern continues from Arc 4-5.** use-size-comparison-words used invalid mode/param on big-small app; fixed via palette enum lookup before re-validation. Same exercise-palette pre-read discipline applies; surface for Arc 7+ packages.

## What didn't (or surfaced friction)

1. **Substrate-clean vocab targets exhausted by Phase 1.** Phase 1 Path B drained the remaining 5 Class A CLEAN vocab-acquisition targets. Phase 2's "Option A vocab-acquisition strand-depth" had to expand to vocab-adjacent strands; "depth in vocabulary-acquisition strand" wasn't strictly available as a within-strand authoring scope. The interpretation worked (vocab-anchored cross-strand) but signals that future "Option A vocab-depth" interpretations need substrate-availability check at Phase 1 entry.

2. **Stream A Phase 1 substrate sweep still paused.** Same finding as Arc 5 recon: Stream A Phase 1 (NUMBER_WORDS gender-toggle + Romance/Nordic gender-data audit + IMAGE_VOCABULARY family-members + action-verbs extension) drafting continues in parallel but hasn't shipped to operator coordination boundary yet. Family-members + action-verbs cannot author until Stream A Phase 1 ships AND/OR Wave 1.1+1.2 image authoring integrates. Both deferral chains feed forward into Arc 7+.

3. **Limited per-package agent review across Phase 1-3.** CC adjudicator-forward continues from Arc 4-5 templates; cluster review at higher level (Phase 1 receptive-variant trio reviewed together; Phase 2 visual-discrimination trio reviewed together; Phase 3 pt sparse-overrides reviewed as locale-cluster). Risk: undetected pedagogical issues in any of the 16 packages shipped this arc.

4. **No browser visual-rendering verification.** Operator-side; same posture as Arc 1-5.

## What surprised

1. **Multilingual-language-awareness strand shipped first as Phase 2 vocab-anchored expansion.** Arc 5 recon predicted multilingual-language-awareness would need its own Phase 4 strand-expansion at Arc 6 OR Arc 7. Course-corrected interpretation of Phase 2 Option A as "vocab-anchored cross-strand" naturally folded the multilingual-language-awareness FIRST package into Phase 2 — name-this-object-in-two-languages is the canonical multilingual-K-3 package, and it composed cleanly as a vocab-anchored Phase 2 deliverable. Multilingual-language-awareness validation thus came earlier than expected.

2. **Visual-discrimination trio template held cleanly across 3 packages.** match-image-to-shadow + match-image-piece-to-whole + find-missing-piece are structurally distinct (different apps; different visual-spatial reasoning surfaces) but the 5-exercise + 7-material template shape held without strain. Validates that Arc 1-5 template was robust enough to handle 3-package strand-depth waves.

3. **Operator Track C state at en+es (not en+es+pt as previously inferred).** Arc 6 spec assumed operator Track C might have advanced to en+es+pt before Arc 6 commenced. Single-question gate at Phase 3 entry surfaced actual state = en+es; next-locale = pt. The Track-C-gate-question discipline continues to produce accurate state info; never assume Track C state without asking.

4. **Brazilian linguistic-diversity content surfaced in name-this-object-in-two-languages.pt.** The multilingual-language-awareness pt sparse-override naturally generated culturally-specific content (Spanish in border regions; Tupi-Guarani indigenous languages; Italian/German/Japanese immigrant communities). This is the strand functioning as designed — multilingual-language-awareness doesn't translate; it deepens cultural relevance per locale.

## Patterns that generalize to Arc 7

1. **Substrate-availability check at Phase 1 entry is now standard.** Every future arc's Phase 1 commences with a substrate-readiness audit (run `scripts/substrate-gap-inventory.js` + check Stream A status + check Wave 1+ integration status). The audit determines whether deferred-vocab can author OR whether substrate-clean fallback needs to scope.

2. **Vocab-anchored cross-strand expansion as the canonical Option-A interpretation.** When substrate-clean targets within a single strand are exhausted, "Option A strand-depth" extends into adjacent strands with anchor-preservation. Future arcs' Phase 2 Option A authoring follows this pattern.

3. **Cluster-review-once-per-locale persists.** pt cluster review applied at Arc 3 Phase 2; Arc 4 Phase 2 + Arc 6 Phase 3 pt sparse-overrides authored without re-review. Generalizes to all locales: future arc Phase 3 sparse-overrides for already-reviewed locales author without re-review.

4. **Track-C-gate-question at every Phase 3 entry.** Never assume Track C state; always ask single-question at Phase 3 entry. Operator's worksheet-deck Track C advances at operator pace and may shift between arcs; the question is cheap; the assumption is expensive.

5. **Multilingual-language-awareness sparse-overrides deepen cultural relevance.** When authoring multilingual-language-awareness sparse-overrides for any locale, surface the locale's specific linguistic-diversity context (immigrant communities; indigenous languages; regional dialects; minority languages). Generalizes from pt-BR template to all 11 platform locales.

## Schema / tooling / generator changes needed before Arc 7

**None gating Arc 7 expansion.**

Optional (continues from Arc 5-6):
- IMAGE_VOCABULARY substrate sweep (Stream A Phase 1 in progress; ships when operator-coordination-ready).
- Wave 1 image authoring integration commissions (operator-pace; small `[INFRA][LESSON-PLANS]` commits per batch).
- NUMBER_WORDS gender-toggle parameter on numeral-cards material.
- Numeral-tracing-strips variant of vocabulary-tracing-strips.

## Out-of-scope items closed

Per Arc 6 commission scope:
- Wave 1 image authoring (operator-pace; decoupled).
- Family-members + action-verbs packages (Arc 7+ Phase 1 OR whenever Stream A Phase 1 + Wave 1.1+1.2 integrates; whichever later).
- Class A GAP packages whose substrate hasn't closed (still 14 GAP per Stream B; Wave 1 hasn't shipped batches yet).
- Class B FLEXIBLE packages not selected for Phase 2 (49 of 55 still unauthored; future-arc candidates).
- Class C N/A packages (98 still unauthored).
- CLAUDE.md doctrine fold of v2 §7 fold candidates (deferred to next [DOCS] cycle per Delta H + extended fold-list from Arc 5-6 recon items).
- Tier 3+ locale variants (Arc 7+).
- Subscriber-facing UI for browsing packages.
- Bundle-curation arc + free-tier-curation arc (deferred per v3 SUBSCRIPTION-SCOPE.md §6; Arc 6 closes at 45 packages — within striking distance of the 50-master-package gate at §6 Pillar 2 bundle-curation arc commission).
- App-side modifications (per CLAUDE.md §3.2).
- Stream A Phase 1 substrate sweep ship (in-progress; ships separately when draft ready).

## Verification status

- All 4 Arc 6 commits push to origin clean.
- Pre-commit hooks pass (no [SCHEMA] commits; Arc 6 was content authoring + sparse-overrides).
- Phase 1 + Phase 2 + Phase 3 author-teaching-package validator: 16 new package files validate clean. 26 prior tests still passing (no validator regressions).
- 6-domain coverage achieved at Arc 6 ship. Counting strict-strand validation: 13 strands across 5 domains have authored packages.
- Master count: 34 → 45 (+11 across Arc 6 Phase 1+2). Per v3 SUBSCRIPTION-SCOPE.md §2 clause (a) tracking: 45/203 (22.2%).
- Locale variants: 7 → 12 (+5 pt sparse-overrides at Phase 3). Per clause (b) tracking: 12/2030 (0.6%).
- Pillar 2 bundle-curation arc gate: 45/50 packages (90% of threshold). Arc 7 commences past the gate likely; Pillar 2 bundle-curation arc commissioning becomes a viable Arc 7+ option.
- Stream A Phase 1 substrate sweep continues post-Arc-6; ships separately when operator-coordination-ready.
- Wave 1 image authoring continues asynchronously at operator pace.
- No browser visual-rendering verification yet (operator-side; same posture as prior arcs).
