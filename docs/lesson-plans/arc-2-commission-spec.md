# Arc 2 commission spec — author 9 vocab packages + localize Arc 1 package + Nordic sentence-strips + Phase 3 verification cycle

**Type:** `[BUILD][LESSON-PLANS]` — content authoring (mostly) + small infra hygiene
**Branch:** `pivot/printable-business-toolkit`
**Estimated phases:** 4 sub-commits
**Estimated LoC:** ~3000-5000 (mostly YAML; small TS for Nordic frame additions)
**Estimated sessions:** 3-5

This is a draft spec. Operator ratifies / revises before commissioning Arc 2 to a future CC session.

## 1. Context

Arc 1 shipped the substrate + tooling + first-authored-package proof of concept. The architecture is now stable enough to template the remaining 9 MVP vocabulary-acquisition packages + localize Arc 1's farm-animals package to other priority locales.

Arc 2 ships:
- 9 additional vocabulary-acquisition packages (en authoring; following Arc 1 patterns)
- Localization of the farm-animals package to es (or whatever locale operator prioritizes)
- Sentence-strips Nordic frame templates (sv/da/no/fi) — closes Phase 3b deferred-queue gap
- Phase 3 generator browser-render verification cycle (operator-coordinated; Arc 2 surfaces are in-tree but render verification is operator-side)

Out of scope for Arc 2: packages 11-200 (Arc N+); non-vocab-strand targets (Arc N+); subscriber UI for browsing packages (much later); Mac Studio AI enrichment of packages (deferred per §3.4 cooperation-pattern lock).

## 2. Pre-locked architecture (do NOT relitigate)

Per Arc 1 ship state. CC adjudicates within these locks; do not surface for confirmation:

- **Schema:** TeachingPackage + BundleTeachingPackage sibling tables in production via Phase 2 migration. Existing 29-or-14 LessonPlan rows stay as legacy artifacts.
- **Storage convention:** `docs/lesson-plans/packages/<target-slug>/package.yaml` (canonical) + `package.<locale>.yaml` (locale variants). Operator-side render outputs at `rendered/<locale>/*.pdf` (not tracked at scale; first package's rendered/ tracked in Arc 1 commit if operator renders; generally untracked in Arc 2+).
- **Validator contract:** `frontend/scripts/author-teaching-package.ts` validates per §3 contracts; passes unknown fields through (e.g., `compositionalRationale`).
- **Materials catalog:** 9 v1 materials. Bingo + matching-mat remain Arc 2+ deferred (per Phase 1 surface gate). Word-wall, mini-book, vocab-tracing-strips already in catalog.
- **Exercise palette:** 29 §14.10 apps unchanged; per CLAUDE.md §3.2 do NOT modify any app's generation logic.
- **Article auto-resolution:** sentence-strips.html + shared library handle 7 locales (en/de/es/fr/nl/pt/it). Nordic locales currently English-fallback; this commission's Phase 1 closes that.
- **MVP slice generalizations** (per Arc 1 agent-review.md):
  1. Single concept boundary on vocabulary lists
  2. ≤2 mechanic families per package
  3. 2-3 sentence-frame variants per package (frame progression)
  4. Flashcards as TWO materials (4-up + 9-up)
  5. compositionalRationale field on cross-strand packages
  6. Manipulative single-repeat OR variety (not both)
  7. CLIL bodies as teacher-actionable scripts (not outlines)
  8. Verify each vocab key against all 11 locales at authoring time

## 3. Phase plan

### Phase 1 — Sentence-strips Nordic frame templates (1 sub-commit)

Add Nordic frame templates to `REFERENCE APPS/material-generators/sentence-strips.html` `FRAME_BY_LOCALE` table:
- sv (Swedish): jag-ser / jag-har / det-ar-en / jag-tycker-om / det-finns / X-ar-fargen / X-sager
- da (Danish): jeg-ser / jeg-har / det-er-en / jeg-kan-lide / der-er / X-er-farve / X-siger
- no (Norwegian bokmål): jeg-ser / jeg-har / det-er-en / jeg-liker / det-er / X-er-farge / X-sier
- fi (Finnish): minä-näen / minulla-on / tämä-on / pidän / on-N / X-on-väri / X-sanoo

Finnish uses partitive case for indefinite ("näen kissan" → "I see (a) cat" — accusative direct object) — verify Finnish frame templates with project_k3_phrasing_native_speaker_review.md flagged-for-NSR convention before committing. NSR-flag the Nordic batch in commit body.

CC adjudication: hardcoded fallback per locale rather than inferring from gender; Finnish has no articles so frame templates must include partitive/case morphology baked into the strings (gender-data-driven approach won't work for Finnish).

### Phase 2 — Localize Arc 1 farm-animals package to es (1 sub-commit)

Author `docs/lesson-plans/packages/identify-and-name-10-farm-animals/package.es.yaml` as the locale variant. Override fields:
- title.es
- description.es
- structure.{warmup,contentActivity,scaffold,closure}.body — Spanish CLIL register
- assessmentCriteria.es
- compositionalRationale.es
- Per-material customizationParameters.language → es
- Per-material customizationParameters.languageSelect → es
- Parent-letter.homeLanguage → es; tone unchanged

Validate via Phase 2 CLI. K-3 classroom-teacher agent review with Spanish-medium classroom context (Spain dual-language school OR US ELL bilingual classroom — operator selects scenario). Iterate per agent feedback. Commit.

### Phase 3 — Author 9 additional vocabulary packages (en, 1-3 sub-commits)

Per agent's prioritized order (highest image-library coverage + cross-locale stability first):

1. clothing → identify-and-name-clothing
2. vehicles → identify-and-name-vehicles
3. fruits → identify-and-name-fruits
4. body-parts → identify-and-name-body-parts
5. school-objects → identify-and-name-school-objects
6. color-words → use-color-words
7. house-rooms → identify-and-name-house-rooms
8. emotions → identify-and-name-emotions
9. action-verbs → identify-and-name-action-verbs

Each package mirrors Arc 1's farm-animals structure with the 8 generalizations applied. Save family-members + foods (meals/snacks) for later — agent flagged cultural-variation cost.

Per package author, validate, agent-review, iterate. Cluster commits sensibly (1 commit per 3 packages, or per pedagogical cluster — CC adjudicates).

CC adjudication on bingo composition: Arc 2 packages with ≥24 vocab keys (none in this list have 24+ from the curated set, but vehicles + fruits could extend) MAY compose bingo; lower-cardinality packages skip bingo per Arc 1 doctrine. Verify cardinality before composing bingo.

### Phase 4 — Recon summary + commission spec for Arc 3 (1 sub-commit)

Mirror Arc 1 Phase 5 shape: `docs/lesson-plans/arc-2-recon.md` + `docs/lesson-plans/arc-3-commission-spec.md`.

Arc 3 likely scope: localization of all 10 MVP packages to remaining priority locales (de, nl per Tier 2; sv/fi/no per Tier 3) + first non-vocab-strand package (probably `count-objects-1-to-10` from early-numeracy/counting-and-cardinality strand to test the cross-domain authoring shape). Operator ratifies Arc 3 spec.

## 4. Adjudication delegations (CC handles without surfacing)

- Per-package vocabulary list (10 items each); verify all 10 present in IMAGE_VOCABULARY across 11 locales.
- Per-package exercise composition (5 exercises within ≤2 mechanic families).
- Per-package material composition (mirror Arc 1 baseline; deviate where pedagogically justified).
- Per-package CLIL section bodies (teacher-actionable scripts, not outlines).
- Per-package compositionalRationale where cross-strand drift exists.
- Sentence-strips frame-template authoring for sv/da/no/fi (NSR-flag as per project_k3_phrasing_native_speaker_review.md convention).
- Spanish CLIL section body register (formal usted vs warm tú; CC adjudicator-forward — locked at usted per CLAUDE.md §17.9 cross-locale teacher-address-register doctrine).
- Per-package agent review iteration depth (apply load-bearing fixes; defer polish to Arc 3 if budget-bound).
- Commit cadence within Arc 2 (split Phase 3 into multiple commits if helpful; CC adjudicates).

## 5. Surface only at

- Phase 4 commit (recon summary + Arc 3 commission spec) — operator ratifies before commissioning Arc 3.
- If something contradicts Arc 1 architectural locks (per §2 above) — surface early.
- If any package's vocabulary list reveals a substantive IMAGE_VOCABULARY locale gap that requires operator-side data fix.
- If sentence-strips Nordic frame templates require operator-strategic-input on register choices that exceed CC's authority (e.g., formal vs informal default for sv/da; CC's default lock is informal per K-3 register, but operator may override).

## 6. Verification

### Phase 1 (Nordic sentence-strips)
- `REFERENCE APPS/material-generators/sentence-strips.html` updated; `FRAME_BY_LOCALE` extended with sv/da/no/fi entries.
- Master-sync runs cleanly (operator-side: `scripts\master-sync.bat`).
- Visual spot-check operator-side: render one sv strip + one fi strip from farm-animals package to verify frame text is grammatical.

### Phase 2 (es localization)
- `package.es.yaml` validates clean via Phase 2 CLI.
- Spanish CLIL bodies match agent-acceptable register.
- Render-pending operator-side.

### Phase 3 (9 packages)
- All 9 package.yaml files validate clean.
- Each package has classroom-teacher agent review applied (per Arc 1 cooperation pattern).
- compositionalRationale field present on cross-strand packages.
- 8 generalizations from Arc 1 honored.

### Phase 4
- arc-2-recon.md + arc-3-commission-spec.md present.
- Operator ratifies Arc 3 spec before commissioning.

### Cross-phase
- All commits push to origin.
- Pre-commit hooks pass (no `--no-verify` expected; Arc 2 should not introduce schema changes).
- Git status clean at end of each phase.

## 7. Out of scope (commission-locked)

- Packages 11-200 (Arc N+).
- Non-vocab-strand packages (Arc 3 first).
- Localization to Tier 3+ locales beyond what Phase 1 Nordic sentence-strips closes (Arc 3+).
- Subscriber-facing UI for browsing packages.
- Mac Studio AI enrichment of packages (cooperation-pattern lock per §3.4).
- SUBSCRIPTION-SCOPE.md re-lock against new package definition (operator-side; not Arc 2 scope).
- 29/156 plan-count drift reconciliation (deferred queue [CHORE][DATA]).
- bingo-board, matching-mat material additions (Arc 2+ deferred per Phase 1 surface gate).
- Word-wall cards, mini-book / fold-book material additions (Arc 2+ deferred).

## 8. Doctrine to load before starting Arc 2

- §1 (SEO + embed-virality flywheel — relevant for theme-agnostic packages locking)
- §3.4 (cooperation pattern; adjudicator-forward)
- §10 (Claude Code session conduct)
- §17.9 (Pillar 1 lesson-plan production discipline — closure forward-pointer pattern, illustrative-example framing for deck-portable plans, schema-authority over commission-spec field-enumeration)
- §A.13.11 (operator-strategic adjudication batching at recon-completion)
- `docs/lesson-plans/arc-1-recon.md` (this commission's antecedent)
- `docs/lesson-plans/packages/identify-and-name-10-farm-animals/agent-review.md` (canonical iteration log)
- `docs/lesson-plans/taxonomy-v1.md` (pedagogical-target keying space)
- `frontend/config/learning-targets.json` (203 targets — Arc 2 packages target the 9 next vocab-acquisition slugs)
- `frontend/config/materials-catalog.json` (9 materials; `bingo-board` skipped at low-cardinality)
- `frontend/lib/exercise-palette.json` (29 apps + their per-app contracts)

## 9. Authorization

This is a draft commission spec. Operator reviews + ratifies (or revises) before commissioning Arc 2 to a future session.

Subjects to surface for ratification before Arc 2 starts:
- Phase 2 localization target locale: es (CC default per §19 launch sequence) vs de (Tier 1 priority) vs operator override.
- Phase 3 commit cadence: 3 commits × 3 packages (CC default) vs 9 separate commits vs single mega-commit.
- Phase 1 sentence-strips Nordic NSR posture: ship NSR-flagged at first commit (CC default per §17.5.1 Nordic NSR-flag pattern) vs operator-side native-speaker review before commit.
- Whether Phase 3 of Arc 2 or Arc 3 should fold the cross-strand `count-objects-1-to-10` package as a non-vocab-strand prototype (currently deferred to Arc 3).
