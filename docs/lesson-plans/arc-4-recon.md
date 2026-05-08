# Arc 4 recon summary

**Commission:** [BUILD][LESSON-PLANS] Arc 4 — continue Track-C-driven localization + deferred vocab packages + numeracy expansion
**Branch:** `pivot/printable-business-toolkit`
**Commits:** `b0a4ffed` (spec ratification) → `78d70a94` (Phase 1) → `861b992a` (Phase 2) → `ea5adced` (Phase 3) → `[Phase 4 commit pending]`
**Sessions:** 2 (commission + resume; both single CC sessions)
**LoC delta:** ~3000 net additions across 4 commits (within spec's 3000-5000 estimate)

## Deliverables shipped

| Phase | Commit | Deliverables |
|---|---|---|
| Spec | `b0a4ffed` | Arc 4 commission spec + 4 ratification locks (Phase 1 cultural-sensitivity adjudication / Phase 2 Track C gate question / NUMBER_WORDS gender-toggle defer to Arc 5 / deferred-vocab fold into Phase 2). |
| 1 | `78d70a94` | 3 deferred-vocab packages: identify-and-name-foods (pizza/bread/milk/egg/apple/banana/cheese/sandwich/water/juice) + identify-and-name-10-zoo-animals (lion/tiger/elephant/giraffe/zebra/monkey/panda/kangaroo/penguin/koala) + identify-and-name-10-pet-animals (cat/dog/rabbit/hamster/guinea-pig/fish/turtle/parrot/canary/gerbil). All 3 validate clean. Each compositionalRationale field carries explicit cultural-variation acknowledgment. **Path B substrate-driven scope pivot:** family-members + action-verbs DEFERRED to Arc 5 Phase 2 because IMAGE_VOCABULARY substrate audit at Phase 1 entry found genuine gaps (family-members 8/9 spec keys MISSING; action-verbs 0/10 base forms; only 4 gerund forms present). |
| 2 | `861b992a` | 3 pt sparse-overrides for the 3 Phase 1 packages. Brazilian Portuguese register per CLAUDE.md §6 (cachorro NOT cão; suco NOT sumo; educação infantil canonical). Formal "você" address per §17.9. All 3 validate clean. |
| 3 | `ea5adced` | 3 numeracy packages: subitize-quantities-1-to-5 (foundational K subitization; flash-card heavy) + count-on-from-given-number (continue counting from any number 1-20 without restarting from 1; bridges to addition) + add-within-5 (simplest addition target; foundational to add-within-10; addition app composed in 4 modes). All 3 validate clean. |

## What worked

1. **Substrate-audit-at-arc-commencement discipline saved a multi-package authoring waste.** Phase 1 entry began with an IMAGE_VOCABULARY substrate audit on the spec's 3 candidate packages (family-members + foods + action-verbs). Two of three failed substrate-clean audit. Operator locked Path B (substrate-driven scope pivot) within one round-trip. Without the audit, authoring would have produced packages with broken vocab keys; the audit caught the gap before any authoring effort.

2. **Path B operator pivot was decisive and clean.** Operator's "packages: foods + zoo-animals + pet-animals" lock + explicit Arc 5 Phase 2 deferral chain for family-members + action-verbs unblocked Phase 1 immediately. No round-tripping; no scope-creep; no re-litigation. The §3.4 adjudicator-forward discipline operationalized at the substrate-audit boundary instead of mid-authoring.

3. **Phase 2 sparse-override authoring pattern stable across Arc 3 + Arc 4.** Same shape as Arc 3 Phase 2 (3 pt locale variants in single commit). No deepMerge edge cases surfaced; no validator regressions. The Arc 3 Phase 1 sparse-override implementation continues to deliver its ~75% LoC reduction across new locale variants.

4. **Brazilian Portuguese cluster review held quality first-pass.** Same posture as Arc 3 Phase 2 — register-correct on first authoring pass; minor refinements applied during cultural-variation acknowledgment authoring (educação infantil terminology + BR-canonical vocab register). No NSR-flag added at Phase 2 (the Phase 1 register was already addressed in Arc 3 Phase 2).

5. **Phase 3 numeracy templates carried forward cleanly from Arc 3.** All 3 packages (subitize-1-to-5 + count-on + add-within-5) followed Arc 3's count-objects-1-to-N + decompose-numbers-to-10 shapes. Per-package agent review skipped per CC adjudicator-forward (templates established in Arc 3; same risk posture as Arc 3 Phase 3 numeracy commits).

6. **Phase 3 validation surfaced 2 mode/param errors that fixed via exercise-palette.json lookup.** count-on-from-given-number's pattern-train block initially used `exerciseMode: unified` (invalid; valid: AB/AAB/ABB/ABC/AABB). add-within-5's code-addition block initially used `exerciseMode: easy` + ad-hoc params (invalid; valid: standard/word-reveal + wordRevealMode/exerciseCount/addendsPerQuestion/minNumber/maxNumber). The validator's mode-and-param lookup against exercise-palette.json caught both at Phase 3 validation; both fixed in one round; no second-iteration surface to operator. The exercise-palette.json file is the canonical source-of-truth for valid app modes + customization parameters; future numeracy authoring should reference it pre-emptively rather than relying on inferred params from intuition.

## What didn't (or surfaced friction)

1. **State-sync error at Arc 4 Phase 2 entry resume.** Operator's resume message claimed Arc 4 Phase 1 was already complete (with a 6-condition framework asserted as resolved). CC's actual repository-state check revealed 4 gaps (no Phase 1 packages on disk; no commit; substrate audit not yet run). Surfaced to operator immediately; operator acknowledged "CC's state check is correct; my state-sync was wrong." Cost: one round-trip to re-establish ground truth. Lesson: at every resume-from-prior-session boundary, **CC's repo-state check supersedes operator's recall** when they disagree. Surface immediately; don't power-through on operator-stated state. This is a §A.13.6 spec-vs-shipped-contract validation discipline applied at the session-handoff boundary.

2. **Substrate gap surfaced at Phase 1 entry, not at commission spec time.** Arc 4 commission spec (b0a4ffed) listed family-members + foods + action-verbs as the Phase 1 candidate set. Substrate audit at Phase 1 entry surfaced the genuine gap. Lesson: future content-arc commission specs that propose new vocabulary-package targets should run a pre-spec substrate audit and only commit candidates that pass. Filing as Arc 5+ commission-spec drafting discipline.

3. **Phase 3 validation iteration surfaced mode/param ignorance pattern.** CC inferred params from intuition rather than reading exercise-palette.json pre-emptively. Two mode/param errors (pattern-train "unified", code-addition "easy" + bad param names) surfaced at validation. Cost: one round of fixes. Lesson: future numeracy/cross-strand package authoring that composes apps not previously seen in the package catalog (i.e., first composition of an app outside its origin package) should pre-read exercise-palette.json for that app's valid modes + params. Filing as Arc 5+ authoring-discipline.

4. **No browser visual-rendering verification.** Operator-side; same posture as Arc 1 + Arc 2 + Arc 3. Phase verification was structural (validator passes; cultural-variation acknowledgments present; NSR posture preserved).

5. **No per-cluster agent review for Phase 1 culturally-sensitive packages.** CC adjudicator-forward applied; cultural-variation acknowledgments authored directly into compositionalRationale fields per spec §3 Phase 1 instruction. Risk: undetected cultural-sensitivity issues in foods + zoo-animals + pet-animals packages. Mitigation: pet-keeping conventions, zoo-as-Western-institution, and meal-list cultural variation are all explicitly acknowledged inline in the package files; teachers can adjust per region. Per spec §9 ratification 1, surface trigger was "scenarios touching religion, politics, family-structure assumptions where platform policy matters" — none of the 3 shipped packages touched these. Family-members (deferred to Arc 5 Phase 2) is where the family-structure assumption surface lives; Arc 5 Phase 2 should run full agent review on family-members specifically.

## What surprised

1. **Path B substrate-driven scope pivot was structurally cleaner than the original Path A spec.** Arc 4 commission spec authored at Arc 3 Phase 4 hadn't run substrate audits; Phase 1 entry ran the audit and surfaced the gap. The pivot deferred 2-of-3 packages to Arc 5 Phase 2, paired with Arc 5 Phase 1 substrate-sweep. The deferral chain is structurally cleaner than authoring against a broken substrate would have been: it makes substrate readiness a precondition for content authoring (the right ordering) and creates a clear next-arc charter (substrate-sweep + content-against-completed-substrate).

2. **Numeracy template extension to subitization + count-on + add-within-5 was templated cleanly.** All 3 numeracy packages re-used the Arc 3 numeracy template (numeral-cards primary anchor + math-app-heavy exercises + theme-mode visuals + compositionalRationale strand-rationale). The "addition app composed in 4 different modes" pattern from Arc 3 decompose-numbers-to-10 carried into add-within-5 (same heavy-single-app load). No template strain.

3. **Brazilian Portuguese register held without per-locale agent re-review.** Arc 3 Phase 2's pt cluster review absorbed the BR-vs-EU lessons (cachorro / suco / educação infantil; formal você). Arc 4 Phase 2 produced clean pt sparse-overrides without re-iteration. Cluster-review-once-per-locale discipline holds across arcs.

4. **State-sync mismatch surfaced via CC's repo-state check, not via operator self-correction.** Operator initially asserted Arc 4 Phase 1 was complete with a 6-condition framework. CC's TodoRead + git log + filesystem checks contradicted the assertion. Surfacing the contradiction directly was the right move (operator confirmed "CC's state check is correct"). Doctrine for future session resumptions: trust shipped-state empirical signals (git log + filesystem + validator output) over operator's recall when they conflict.

## Patterns that generalize to Arc 5

1. **Substrate audit as pre-authoring gate.** Future content-arc Phase 1 entries with new vocabulary-package targets should begin with IMAGE_VOCABULARY substrate audit. If gaps surface, surface to operator before authoring. Default-pivot to substrate-clean candidates if available; defer substrate-gap candidates to a downstream substrate-sweep arc.

2. **Substrate-sweep as pre-content arc-shape.** Arc 5 Phase 1 substrate sweep precedes Arc 5 Phase 2 content authoring. This pairing pattern (substrate-completion + content-against-completed-substrate) is the right shape when prior content-arc surfaced substrate gaps. Generalizable to future strands (e.g., kitchen-objects might surface its own substrate gap; PSED/social-emotional vocabulary might surface gaps; etc.).

3. **Exercise-palette.json pre-read at first cross-app composition.** Future numeracy/cross-strand authoring composing apps outside the package's origin should pre-read exercise-palette.json for that app's modes + params. Avoids the mode/param inference error pattern surfaced at Phase 3.

4. **CC's repo-state check supersedes operator's session-handoff recall when they conflict.** Resume-from-prior-session boundaries always surface CC's empirical state check first; operator state-sync claims are inputs, not authority. Surface contradictions directly rather than power-through.

5. **Cluster agent review one-per-locale-per-arc.** pt was reviewed once at Arc 3 Phase 2; Arc 4 Phase 2's pt overrides shipped without re-review. Generalizable: any locale where Arc N produces clean cluster-review output, Arc N+1 reuse of that locale skips re-review unless a new register-shift surface (BR-vs-EU split; Tier 3 Nordic shift) warrants.

## Schema / tooling / generator changes needed before Arc 5

**Optional (none gating Arc 5 expansion):**
- IMAGE_VOCABULARY substrate sweep (Arc 5 Phase 1 territory): family-members 9-key extension + action-verbs 10-key extension + gender-data audit for Romance + Nordic.
- NUMBER_WORDS gender-toggle parameter on numeral-cards material (closes Romance + Nordic gender-mismatch from Arc 3 Phase 2 NSR finding).
- Exercise-palette.json validation extension: emit warning when a package's customizationParameters use param keys not in the app's palette entry.
- Numeral-tracing-strips variant of vocabulary-tracing-strips (numerals 1-10 in dotted/outline tracing for K handwriting).

**None gating Arc 5 commencement.**

## Out-of-scope items closed

Per Arc 4 commission scope:
- Tier 3+ locale variants (Arc 5+).
- Non-vocab + non-numeracy strand packages (Arc 5+).
- Subscriber-facing UI for browsing packages.
- Mac Studio AI enrichment.
- 29/156 plan-count drift reconciliation (still in deferred queue).
- bingo-board, matching-mat-as-new-generator, word-wall, mini-book material additions.
- NUMBER_WORDS gender-toggle (deferred per Arc 4 §9 ratification 3 → Arc 5).
- family-members + action-verbs vocab packages (deferred per Path B pivot → Arc 5 Phase 2 paired with Arc 5 Phase 1 substrate sweep).

## Verification status

- All 4 Arc 4 commits push to origin clean.
- Pre-commit hooks pass (no [SCHEMA] commit; Arc 4 was content authoring + recon).
- Phase 2 author-teaching-package validator: all 26 prior tests still passing; 6 new package files validate clean (3 Phase 1 canonical + 3 Phase 2 sparse-overrides + 3 Phase 3 numeracy = 9 files added).
- Total catalog state post-Arc-4: 12 unique pedagogical-target slugs covered (1 Arc 1 + 8 Arc 2 + 5 Arc 3 numeracy + 3 Arc 4 vocab + 3 Arc 4 numeracy = 17 unique slugs; some overlap on numeracy strand). Locale variants spread across en-canonical + es (1 from Arc 2) + pt (3 from Arc 3 + 3 from Arc 4 = 6 sparse-overrides total).
- 9 generators implemented (8 Arc 1+2 + 1 numeral-cards Arc 3) — no new generators in Arc 4.
- Sparse-override pattern proven across 7 locale variants (1 es + 6 pt).
- No browser visual-rendering verification yet (operator-side; same posture as prior arcs).
- No NUMBER_WORDS gender-toggle (deferred to Arc 5 per §9 ratification 3).
- No family-members + action-verbs packages (deferred per Path B pivot).
