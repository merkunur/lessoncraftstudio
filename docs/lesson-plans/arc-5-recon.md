# Arc 5 recon summary

**Commission:** [BUILD][LESSON-PLANS] Arc 5 — substrate sweep (Stream A Phase 1 in progress) + 2 upstream items (v3 SUBSCRIPTION-SCOPE.md merge + Stream B substrate-gap-inventory) + Phase 2-3 substrate-clean cross-strand authoring + Phase 4 recon + Arc 6 commission spec
**Branch:** `pivot/printable-business-toolkit`
**Commits:** `3f46b846` (v3 SUBSCRIPTION-SCOPE.md merge — upstream Item A) → `b9dd07de` (Stream B inventory) → `3e649df1` (style-guide reference) → `4284f647` (Phase 2: 6 packages) → `f46f84e7` (Phase 3: 7 packages) → `[Phase 4 commit pending]`. Stream A Phase 1 substrate sweep separately committed when ready (operator-coordinated per CLAUDE.md §10.3).
**Sessions:** 1 (single CC session continuing from Arc 4)
**LoC delta:** ~5500 net additions across 5 commits + Stream A Phase 1 pending

## Deliverables shipped

| Phase | Commit | Deliverables |
|---|---|---|
| Upstream A | `3f46b846` | v3 SUBSCRIPTION-SCOPE.md merge: 6-condition launch-trigger framework + Pillar 2 redefinition (teaching-package bundles) + NSR bifurcated discipline + post-Arc-4 master/locale count update + Bundle relationship semantics policy locks (552-line canonical document; +334/−87). 7 reconciliation deltas applied per operator ratification batch. |
| Upstream B | `b9dd07de` | Stream B substrate-gap-inventory: 657-line audit of 182 unauthored packages (29 Class A + 55 Class B + 98 Class C) with per-package candidate-key gap data + aggregate stats. Standing-tool generator script at `scripts/substrate-gap-inventory.js`. |
| Style-guide | `3e649df1` | 349-line Image Vocabulary style guide for Wave 1 image authoring; 8 anchor samples across distinct clusters (animals, fruits, vehicles, body-parts, occupations, emotions, weather, shapes); per-Wave-1-cluster authoring guidance + quality-bar / rejection criteria. |
| Phase 2 | `4284f647` | 6 substrate-clean cross-strand packages: identify-2d-shapes-basic + identify-3d-shapes (numeracy/geometry) + identify-and-name-vegetables (literacy/vocab) + classify-animals-by-habitat + identify-transportation-types (world-knowledge) + use-position-vocabulary (fine-motor/spatial-reasoning). 4-of-5 domain coverage. |
| Phase 3 | `f46f84e7` | 7 substrate-clean packages: identify-2d-shapes-extended + classify-animals-by-diet + point-to-named-body-part + point-to-named-farm-animal (Class A CLEAN) + sort-by-color + sort-by-shape + solve-4x4-picture-sudoku (Class B FLEXIBLE; cognitive-and-executive-function expansion). **5-of-5 domain coverage achieved.** |

## What worked

1. **Course-correction-mid-arc to substrate-clean targets.** Operator's directive to decouple Arc 5 forward motion from Wave 1 image authoring (operator-pace; CC must NOT idle waiting) reframed Phase 2-4 against the 15 Class A CLEAN list + selected Class B FLEXIBLE packages. Result: 13 packages shipped across Phase 2+3 in a single session without depending on Wave 1 image timing. Family-members + action-verbs (originally Phase 2 deliverables) re-routed to Arc 6 Phase 1 per Wave 1.1+1.2 integration timing — the deferral chain extends Arc 4 Path B → Arc 5 Phase 2 originally → Arc 6 Phase 1 actually.

2. **Cross-strand spread reaching 5-of-5 domain coverage at Arc 5 ship.** Phase 2 (4 domains) + Phase 3 (5th domain via cognitive-and-executive-function expansion) operationalize the §A.14 scaling-checkpoint discipline as the canonical Arc-5-shape pattern. Cross-strand validation across the full domain set validates architecture broadly before strand-volume commits in Arc 6+. This is the architectural milestone of Arc 5.

3. **Sparse-override pattern stable across Arc 3 + Arc 4 + Arc 5.** No Phase 5 locale-variant arc shipped this session (deferred per single-session pacing); pattern continues to be the canonical locale-variant authoring approach for future arcs.

4. **Stream B inventory generator as standing tool.** `scripts/substrate-gap-inventory.js` is reusable at any future arc closeout to regenerate the substrate-gap snapshot. Future content-arc commission specs can re-run the inventory before Phase 1 entry to surface substrate gaps proactively (per the substrate-audit-at-arc-commencement discipline emerging from Arc 4 Path B).

5. **Style-guide reference shipped pre-Wave-1-authoring.** 8-sample multimodal-inspection inventory + per-cluster authoring guidance + quality-bar criteria gives operator a reference document to consult during async Wave 1 image authoring without per-batch style-iteration loss.

6. **Phase 2 + Phase 3 surface gate as small batched review.** Operator's discipline of "package-list review only, not architectural" produced clean ratification in single AskUserQuestion round — no round-tripping; clear scope decisions; immediate forward motion. The discipline contrasts with deeper architectural reviews (e.g., v3 reconciliation) which warrant detailed delta-batch surfacing; package-list selections lock cleanly via batched-question pattern.

7. **Validation iteration pattern from Arc 4 Phase 3 reapplied at Arc 5 Phase 3.** Arc 4 surfaced mode/param errors at validation; Arc 5 Phase 3 surfaced an invalid pedagogicalRole ('writing-readiness' not in catalog enum) on 2 packages. Both fixed in single iteration via materials-catalog enum lookup. Same exercise-palette + materials-catalog pre-read discipline applies; surface for Arc 6+ packages.

## What didn't (or surfaced friction)

1. **Stream A Phase 1 substrate sweep paused at Arc 5 ship.** NUMBER_WORDS gender-toggle drafting + Romance/Nordic gender-data audit + IMAGE_VOCABULARY family-members + action-verbs extension are all in-progress but not yet surfaced for operator coordination per CLAUDE.md §10.3. Arc 5 forward motion (Phase 2+3 authoring) ran in parallel; substrate-sweep work continues into Arc 6 OR ships separately as `[INFRA][LESSON-PLANS]` commission once draft is operator-coordination-ready. Acceptable per parallel-stream commitment; operator-pace coordination boundary preserved.

2. **No Phase 5 locale-variant authoring at Arc 5 ship.** Arc 5 originally specced Phase 3 as locale-variant-Track-C-gated; course-corrected to substrate-clean cross-strand authoring instead. Phase 5 (or Phase 4 of an Arc 5 extension) would have been Track-C-driven locale variants. Locale-variant work is not in Arc 5 ship; queued for Arc 6 OR a separate commission per operator's Track C state.

3. **Limited per-package agent review in Phase 2-3.** CC adjudicator-forward call per Arc 3 Phase 3 + Arc 4 Phase 3 templates. 13 packages × cluster agent review would have substantially extended single-session scope. Cluster review applied at higher level (e.g., the cognitive-domain trio of sort-by-color + sort-by-shape + solve-4x4-picture-sudoku reviewed together as a cognitive-strand-validation cluster). Risk: undetected pedagogical issues in any of the 13 packages; Arc 6+ deeper review per operator feedback.

4. **No browser visual-rendering verification.** Operator-side; same posture as Arc 1-4. Arc 5 verification was structural (validator passes; cross-strand spread confirmed; substrate-clean against IMAGE_VOCABULARY; cultural-variation acknowledgments where applicable).

5. **Wave 1 image authoring gating Arc 6+ family-members + action-verbs.** Operator-pace; uncertain Arc 6 commencement timing depends on whether Wave 1.1+1.2 batches have integrated by Arc 6 Phase 1 entry. If yes, Arc 6 Phase 1 authors family-members + action-verbs; if no, Arc 6 Phase 1 selects another deferred-vocab cluster from Wave 1+ availability OR continues Phase 2-3 substrate-clean expansion.

## What surprised

1. **Stream A + Stream B parallel-safe genuinely held.** Different filesystem territory (image-vocabulary.js draft work vs read-only audit document); no merge conflicts; no idle-waiting mid-stream. The operator's three-stream coordination protocol (Stream A CC substrate sweep + Stream B CC inventory + Stream C operator image authoring) operationalized cleanly.

2. **Cognitive-domain expansion templated cleanly off vocabulary + numeracy patterns.** sort-by-color + sort-by-shape + solve-4x4-picture-sudoku composed against existing exercise palette (picture-sort + matching + odd-one-out + sudoku) without requiring novel architectural patterns. The §A.14 scaling-checkpoint risk ("cognitive-domain packages may stress architecture") did not surface as expected; existing palette + materials covered the cognitive-domain packages without strain.

3. **Bundle schema reconciliation surfaced load-bearing finding at v3 merge.** Pre-v3 canonical described Bundle as deck-bundles (Bundle.deckIds[]); shipped schema at migration `20260504081907_add_bundle_schema` actually has all three M2M joins (BundleDeck + BundleLessonPlan + BundleTeachingPackage). The BundleTeachingPackage join was reserved per §17.8.7 reservation pattern with no v1 consumers expected; v3 promotes it to PRIMARY join per Delta C Option 1 lock. Architecturally clean: schema substrate ready for v3 Pillar 2 framing without data migration.

4. **Operator's "lock as proposed" pattern across ALL 7 v3 deltas + 2 Phase-list ratifications.** Single-batch ratification with detailed delta surfacing produced clean locks at every decision point. Pattern: surface concrete options + recommendation + implication; operator picks option per CLAUDE.md priority foundations + reasoning summary; no round-tripping. The discipline scales — works equally well on architectural reframes (v3 Pillar 2) as on small package-list selections (Phase 2/3 lists).

## Patterns that generalize to Arc 6

1. **Substrate-audit-at-arc-commencement is the new standard.** Pre-Phase-1 substrate audit (run `scripts/substrate-gap-inventory.js` against current authored-set + IMAGE_VOCABULARY state) catches gaps before authoring effort. Arc 6 commission spec runs this audit; surfaces results in the commission spec itself rather than mid-Phase-1.

2. **Decouple content-arc forward motion from operator-pace external work.** Arc 5's Wave 1 decoupling (substrate-clean targets in Phase 2-3; family-members + action-verbs deferred to Arc 6 Phase 1 OR whenever Wave 1.1+1.2 integrates) generalizes: any future arc where content authoring depends on operator-pace external work (image authoring, native-speaker review, infrastructure operator-applies) should re-scope to non-blocking targets when external work is async; queue blocking targets to a future phase OR future arc.

3. **5-of-5 domain coverage at Arc 5 ship enables strand-volume commitment in Arc 6+.** Per §A.14 scaling-checkpoint discipline: cross-strand validation across all 5 domains must complete before strand-volume commits. Arc 5 satisfies this; Arc 6+ can commit larger strand-volume work (e.g., 8-12 vocabulary-acquisition packages in a single phase, or full numeracy-strand sweep) knowing the architecture handles it.

4. **Receptive-pairing pattern as canonical vocabulary-expansion shape.** point-to-named-body-part + point-to-named-farm-animal validated the receptive-variant pattern. Arc 6+ can scale this across other vocabulary clusters (point-to-named-zoo-animal, point-to-named-color, point-to-named-vehicle, point-to-named-clothing-item — all CLEAN-substrate; ready to ship).

5. **Cognitive-domain depth via single-domain-arc.** sort-by-color + sort-by-shape + solve-4x4-picture-sudoku validated cognitive-domain integration. Arc 6+ can author single-domain depth (e.g., 4-6 cognitive-domain packages including sort-by-size, sort-by-multiple-attributes, complete-AB-pattern, solve-6×6-picture-sudoku) without re-validating architecture.

6. **Stream-coordination protocol as commission shape.** Arc 5's 3-stream protocol (CC Stream A + CC Stream B + operator Stream C) generalizes to any commission with parallel-safe work across CC + operator. Future arcs commission both CC streams + operator-coordination separately; coordination-boundary surfaces respect operator-pace asynchrony.

## Schema / tooling / generator changes needed before Arc 6

**Optional (none gating Arc 6 expansion):**

- IMAGE_VOCABULARY substrate sweep (Stream A Phase 1 in progress): family-members 9-key extension + action-verbs 10-key extension + Romance/Nordic gender-data audit. Operator-coordinated per §10.3; ships when draft ready.
- Wave 1 image authoring integration commissions (small `[INFRA][LESSON-PLANS]` commits as operator ships batches). Each integration unblocks specific package authoring at Arc 6+.
- NUMBER_WORDS gender-toggle parameter on numeral-cards material (closes Romance + Nordic gender-mismatch from Arc 3 Phase 2 NSR finding). Stream A Phase 1 territory.
- Numeral-tracing-strips variant of vocabulary-tracing-strips (numerals 1-10 in dotted/outline tracing for K handwriting). Future-arc material extension; not gating.

**None gating Arc 6 commencement.**

## Out-of-scope items closed

Per Arc 5 commission scope (post-course-correction):
- Wave 1 image authoring (operator-pace; decoupled per course correction).
- Family-members + action-verbs packages (Arc 6 Phase 1 OR whenever Wave 1.1+1.2 integrates; whichever later).
- Class A GAP packages whose substrate isn't closed yet (14 packages from Stream B inventory).
- Class B FLEXIBLE packages not selected for Phase 3 (52 of 55; future-arc candidates).
- Class C N/A packages (98; future-arc candidates).
- CLAUDE.md doctrine fold of v2 §7 fold candidates (deferred to next [DOCS] cycle per Delta H).
- Tier 3+ locale variants (Arc 6+).
- Subscriber-facing UI for browsing packages.
- Bundle-curation arc + free-tier-curation arc (deferred per v3 SUBSCRIPTION-SCOPE.md §6).
- App-side modifications (per CLAUDE.md §3.2).
- Stream A Phase 1 substrate sweep ship (in-progress; ships separately when draft ready).

## Verification status

- All 5 Arc 5 commits push to origin clean.
- Pre-commit hooks pass (no [SCHEMA] commits; Arc 5 was content + tooling + docs).
- Phase 2 + Phase 3 author-teaching-package validator: 13 new packages validate clean. 26 prior tests still passing (no validator regressions).
- 5-of-5 domain coverage achieved at Arc 5 Phase 3 close. All 5 domains have at least 1 authored package; cognitive-and-executive-function domain validated for the first time.
- Master count: 21 → 34 (post-Arc-5). Per v3 SUBSCRIPTION-SCOPE.md §2 clause (a) tracking: 34/203 (16.7%).
- Locale variants: 7 (unchanged from Arc 4; no locale-variant work in Arc 5 ship).
- Substrate-gap-inventory tool ships as standing reusable script.
- Style-guide reference ships as Wave 1 authoring reference document.
- v3 SUBSCRIPTION-SCOPE.md merged with all 7 reconciliation deltas applied + Bundle relationship semantics policy locks documented.
- No browser visual-rendering verification yet (operator-side; same posture as prior arcs).
- Stream A Phase 1 substrate sweep continues post-Arc-5; ships separately when operator-coordination-ready.
