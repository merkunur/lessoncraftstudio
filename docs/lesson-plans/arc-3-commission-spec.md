# Arc 3 commission spec — numeral-cards generator + Arc 3 numeracy expansion + Tier 1 + 2 localization

**Type:** `[FEATURE][LESSON-PLANS]` — generator implementation + content authoring
**Branch:** `pivot/printable-business-toolkit`
**Estimated phases:** 4 sub-commits (Phase 4 was Phase 5 in draft; merged with Phase 4 sparse-override per ratification)
**Estimated LoC:** ~3000-5000
**Estimated sessions:** 3-5

**Status: ratified by operator** — see §9 Authorization for locked ratifications.

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

### Phase 1 — numeral-cards generator + sparse-override + count-objects close-loop (1 sub-commit; bundled per ratification)

Bundled deliverables (operator-ratified — Phase 1 closes generator + infrastructure debt + Arc 2 cross-strand prototype loop in one commit):

**1. numeral-cards material generator:**
- `REFERENCE APPS/material-generators/numeral-cards.html` (new generator HTML; mirrors flashcards.html shape but renders numerals + number-words instead of images + vocabulary labels).
- `REFERENCE TRANSLATIONS/material-generator-shared.js` extension: NUMBER_WORDS resource per locale (en: ["one","two",...,"twenty"]; de: ["eins","zwei",...]; es: ["uno","dos",...]; etc.); helper function `localizedNumberWord(n, locale)`.
- `REFERENCE APPS/material-generators/README.md` updated.

**2. Sparse-override storage support:**
- `frontend/scripts/author-teaching-package.ts` extension: detect `package.<locale>.yaml` as sparse override; merge with `package.yaml` (canonical) at validation time (deep merge, override-wins per field); validate the merged result against schema.
- `frontend/scripts/__tests__/author-teaching-package.test.ts` extension: tests for sparse-override merge behavior.
- Migrate `docs/lesson-plans/packages/identify-and-name-10-farm-animals/package.es.yaml` from full standalone to sparse-override pattern (proves migration works + DRYs the existing es file).

**3. count-objects-1-to-10 numeral-cards material completion:**
- Extend `count-objects-1-to-10/package.yaml` to ADD a numeral-cards material (using the new generator from this Phase 1).
- Closes the Arc 2 cross-strand prototype loop — count-objects-1-to-10 now uses the material it pre-spec'd at Arc 2 boundary.
- Re-validate via Phase 2 CLI.

**Surface trigger:** if sparse-override turns out to be substantially larger than expected (e.g., requires multi-phase work or schema changes), surface size estimate to operator for re-adjudication. Default-fold otherwise.

**CC adjudication on number-word grammar:** Spanish + Italian + Portuguese have gender variants for "one" (uno/una). CC adjudicates to use masculine default ("uno") with note that Arc 4+ may add gender-toggle. Finnish "yksi"/"yhden"/"yhtä" case morphology is single-form for K-3 cards (nominative "yksi"); document NSR-flag in commit body if Phase 1 surfaces uncertainty.

Verification: numeral-cards renders in browser for at least 3 locales; sparse-override validator passes existing 13 tests + new merge tests; count-objects-1-to-10 re-validates clean.

### Phase 2 — Locale variants (gated on operator Track C state; 1 sub-commit)

**Single-question gate before Phase 2 starts:** CC asks operator "Which locale is your worksheet-deck Track C currently at?" and locks the localization target accordingly per the SUBSCRIPTION-SCOPE.md sequencing en → es → pt → it → de → fr → nl → sv → da → no → fi.

Locale-sequencing rule (operator-locked at Arc 3 commission): lesson-plan localization rhythm tracks operator's worksheet-deck Track C currently-authoring-locale, NOT jumps ahead. Master rule = SUBSCRIPTION-SCOPE.md sequencing. Examples:
- If operator's Track C is at en + es → lesson-plan Arc 3 localizes to **pt** next.
- If at en + es + pt → localize to **it**.
- If at en + es + pt + it → localize to **de**.
- And so on.

CC adjudicates 3-package selection per locale (CC default: farm-animals + clothing + count-objects-1-to-10 — the 3 Arc 1+2 packages with strongest cross-locale validation surface). Operator may override at Track C question time.

Phase 2 uses sparse-override pattern from Phase 1 — author 3 sparse-override `package.<locale>.yaml` files + verify via merged validation.

CC adjudicates locale-specific CLIL register per CLAUDE.md §17.9 cross-locale teacher-address-register doctrine. Agent review: 1 per-locale cluster review (across all 3 packages).

### Phase 3 — 5 numeracy packages (en authoring; 1-2 sub-commits)

1. count-objects-1-to-5 → simpler precursor to count-objects-1-to-10
2. count-objects-1-to-20 → extension; integrates teen numbers (10-20)
3. match-numeral-to-quantity-1-to-10 → uses numeral-cards material from Phase 1; previously-unimplementable target
4. compare-quantities-more-fewer → comparison; integrates more-less app heavily
5. decompose-numbers-to-10 → extends to 7=4+3=5+2 patterns

Each package: theme-mode (operator picks visual content), 6-material baseline (mirrors count-objects-1-to-10), uses numeral-cards material from Phase 1, math-app-heavy exercise composition.

Per-package agent review: cluster review across all 5 (operator's "extra attention" was for the Arc 2 prototype; Arc 3 numeracy is now templated work).

### Phase 4 — Recon summary + Arc 4 commission spec (1 sub-commit)

Arc 4 likely scope:
- Continue locale-variant authoring per operator's Track C progression (the locale AFTER Arc 3 Phase 2's locale, per SUBSCRIPTION-SCOPE.md sequencing).
- Deferred vocabulary packages: family-members + foods + action-verbs (deferred from Arc 3 per ratification — Arc 3 already grows scope; vocabulary strand most-validated; not time-pressured).
- Tier 3+ locale variants (sv/fi/no/da) — Nordic NSR pass + closing the suffix-article + case-marking architectural gaps from Arc 2 (deferred until operator's worksheet-deck Track C reaches Tier 3).
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

## 9. Authorization — operator-ratified locks

Operator ratified all 4 surfaced subjects at Arc 3 commission:

1. **Numeral-cards generator: Phase 1, no defer.** Same discipline as Arc 1 Phase 3 generators before Phase 4 first-package authoring. Catching numeral-cards at Arc 2 boundary served exactly to prevent Arc 3 authoring against an incomplete material set; respect that by landing the generator first. Count-objects-1-to-10 also gets its numeral-cards material rendered in this same phase — close the loop on the Arc 2 cross-strand prototype.

2. **Locale-variant order: track operator's worksheet-deck Track C, NOT jump ahead.** Master rule = SUBSCRIPTION-SCOPE.md sequencing en → es → pt → it → de → fr → nl → sv → da → no → fi. Lesson-plan localization rhythm tracks operator's worksheet-deck Track C currently-authoring-locale rate, not advances independently. Single operator question worth asking before Arc 3 Phase 2 starts: "Which locale is your worksheet-deck Track C currently at?" CC asks operator that one question, then locks the localization target accordingly. The "de + nl default" CC originally proposed assumes operator is several locales further along than visibility allows; replaced with operator-Track-C-driven selection.

3. **Sparse-override: fold into Arc 3 Phase 1, alongside numeral-cards generator.** Default-fold reasoning: Arc 2 surfaced sparse-override as a need; Arc 3 addresses it; Arc 4 builds on complete substrate. Don't carry infrastructure debt across arc boundaries when cost is bounded. **Surface trigger:** if sparse-override turns out to be substantially larger than the numeral-cards generator (e.g., requires multi-phase work or significant schema changes), CC surfaces size estimate and re-adjudicate.

4. **Optional deferred-vocab fold: defer to Arc 4.** Reasoning: Arc 3 already grows scope (generator + sparse-override + new packages + locale-variant authoring). Adding deferred-vocab fold risks scope-blow. Bank for Arc 4 — vocabulary strand is the most-validated strand; not time-pressured.

**Surface posture (operator-locked):** Surface only at Arc 3's natural cadence (Phase 4 equivalent) unless one of:
- Sparse-override surfaces as substantially larger than expected at Phase 1 entry → surface size estimate, re-adjudicate.
- Operator Track C state is unclear → ask the single localization-target question, lock, proceed.
- Architectural issue surfaces during package authoring that warrants pause-and-discuss.

Otherwise autonomous through Phase 4.

Arc 3 authorized; CC commences Phase 1 (numeral-cards generator + sparse-override + count-objects-1-to-10 numeral-cards material completion).
