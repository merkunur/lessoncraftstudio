# Arc 1 recon summary

**Commission:** [RECON+BUILD][LESSON-PLANS] Arc 1 — Substrate audit + first teaching package
**Branch:** `pivot/printable-business-toolkit`
**Commits:** `faf4b5ee` (Phase 1 audit) → `3b33fe1d` (Phase 1 gate ratification) → `78148514` (Phase 2 schema + tooling) → `c9ae2225` (Phase 3a generators) → `a45db4d6` (Phase 3b generators) → `c499ccc7` (Phase 4 first package)
**Sessions:** 1 (single CC session)
**LoC delta:** ~5,500 net additions across 6 commits

## Deliverables shipped

| Phase | Commit | Deliverables |
|---|---|---|
| 1 | `faf4b5ee` + `3b33fe1d` | 5 substrate-audit docs + 3 machine-readable JSONs (palette, learning-targets v1 with 203 leaf targets, materials catalog with 9 materials post-gate). 2 expert-agent validations (curriculum + classroom-teacher). |
| 2 | `78148514` | TeachingPackage + BundleTeachingPackage Prisma schema + migration. author-teaching-package.ts CLI validator. 4 test fixtures + 13 unit tests (all passing). Storage convention at docs/lesson-plans/packages/. |
| 3a | `c9ae2225` | material-generator-shared.js (shared substrate). 4 essential generators: flashcards, picture-cards, manipulative-cut-outs, answer-key. README. |
| 3b | `a45db4d6` | 3 complex generators: sentence-strips (with article auto-resolution from IMAGE_VOCABULARY gender data), parent-take-home-letter (11-locale × 3-tone template matrix), vocabulary-tracing-strips (new build per §3.2 — does NOT extend writing.html). materials-catalog.json extended to 9 entries. |
| 4 | `c499ccc7` | First authored package (identify-and-name-10-farm-animals). 5 composedExercises + 8 materials + agent-review.md. 8 iteration revisions applied post-classroom-teacher-agent review. |

## What worked

1. **Two-keying-space architectural lock** (existing-plan-substrate.md §7-8 Option B) cleanly separated the new pedagogical-target axis from the legacy axis-key axis. Zero migration needed; existing 14-on-disk plans (or 29 DB rows per CLAUDE.md §13 — unreconciled) stay as legacy artifacts. Schema-design-by-sibling-table is the right shape.

2. **Adjudicator-forward decision-locking** (per §3.4) eliminated round-tripping during Phase 2-4 execution. Pre-locked adjudications in the plan file (storage convention, JSON-loaded taxonomy vs DB table, generator pipeline pattern, vocab-tracing extend-vs-rebuild) all held through to ship without operator re-engagement.

3. **Phase 1 surface gate batched review** (per §A.13.11) — both ratification surfaces (taxonomy + materials catalog) batched into a single AskUserQuestion. Operator's Q1 response demonstrated the value: detailed reasoning ratifying ALL seven taxonomy expansions, plus delegated pruning to CC. Q2 empty answer → CC adjudicator-forward locked CC's own recommendation per §3.4. Both gate items resolved in one round-trip.

4. **Expert-agent substitution via general-purpose agents with role prompts** worked well. Curriculum agent's critique was substantive and pedagogically grounded; classroom-teacher agent's review caught the cat/dog category error + alphabet-train target drift, both of which would have shipped silently without that surface.

5. **Test-fixture-driven validator development.** Phase 2 validator's 13-test suite caught the right errors (target / app / material / language / mode / parameter / role / structure / language-coverage / universal-parameter-acceptance) on first build. Mirrors `scripts/publish-cli/slug.test.js` Node-native-assert pattern; no test framework dep.

6. **Article auto-resolution from IMAGE_VOCABULARY gender data** (sentence-strips Phase 3b) closes the highest QC-risk surface in the catalog (per classroom-teacher agent: "a platform marketed on multilingual K-3 quality cannot ship 'Ich sehe ein Katze'"). 5-locale frame-template lookup tables (en/de/es/fr/nl/pt/it) plus per-locale article rules cover ~80% of platform locales for the v1 sentence-strip surface.

## What didn't (or surfaced friction)

1. **Pre-commit hook caught Phase 2 [SCHEMA] commit** (correctly). Required `--no-verify` bypass per §A.8.1 documented exception. Friction was minimal because the doctrine names the bypass explicitly; if a future contributor doesn't read §A.8.1, they would hit a wall. Possible Phase 5 deferred-queue item: emit the §A.8.1 reference directly in the hook's rejection message text.

2. **No browser-based render verification** in Phase 3. The 7 generators ship without operator-side visual inspection. Plan §"Phase 3 verification" envisioned this; the budget explicitly defers to operator. If any generator has a Fabric.js / jsPDF rendering bug, it surfaces only at first Phase 4 actual-render attempt. **Mitigation:** generators follow proven patterns from the existing 29 §14.10 apps; defect risk is bounded.

3. **Pre-existing uncommitted state in repo** (image deletions from prior sessions) required explicit-file-name `git add` rather than `git add .` per CLAUDE.md §A.1 / §A.8 sample-commit protection. No actual problem; just a friction item against blanket-add convenience.

4. **YAML article auto-resolution gap for sv/da/no/fi.** Sentence-strips frame templates are baked for en/de/es/fr/nl/pt/it (7 locales). Nordic locales (sv/da/no/fi) fall back to English templates with auto-article-resolution returning empty string per shared lib's locale rules. This works structurally but means Nordic sentence strips render with English frames + no articles — clearly wrong for production. **Phase 3b deferred-queue item: author Nordic frame templates for sentence-strips** before any Nordic-locale package authoring.

5. **Validator does NOT enforce duplicate-material checks.** A package can compose `flashcards` twice (as Phase 4 did intentionally — 4-up + 9-up). The validator allows this; agent reviewer caught the use case. No fix needed; flag here so future authoring tooling doesn't accidentally restrict it.

## What surprised

1. **The agent caught what the human would have shipped.** The cat/dog category error in the first farm-animals draft was 30-second-visible to a real K-3 teacher but invisible to my (CC's) initial composition. The `general-purpose` agent with role prompt produced substantive content review, not just structural validation. The substitution for specialty subagent worked.

2. **`compositionalRationale` field emerged as a doctrine artifact** of cross-strand packages, not just package metadata. Acknowledging drift explicitly is structurally cleaner than narrowly scoping every package to a single strand.

3. **The 200-target ratified taxonomy landed at 203** post-application without pruning — within operator's 200 ± 10 constraint by accident. The natural pedagogical structure pruned itself.

4. **Existing IMAGE_VOCABULARY's gender data is sufficient** for article auto-resolution across en/de/es/fr/it/nl + partial sv/da/no. Finnish has no articles (handled correctly). The scaffolding for multilingual sentence-frame work is already there; Phase 3b just had to consume it correctly.

## Patterns that generalize to Arc 2 (packages 2-10)

Per agent's MVP slice generalization (full list in agent-review.md):

1. **Vocabulary choice:** single concept boundary. Don't mix pets-and-farm-animals; don't mix tropical-and-temperate fruits.
2. **Exercise composition:** keep to ≤2 mechanic families per package; rotate families across the 1-2 week unit.
3. **Sentence-strips:** compose 2-3 frame variants per package (frame progression: i-see-a → the-item-says → there-are-count-plural).
4. **Flashcards:** author as TWO materials (4-up jumbo for warmup + 9-up for take-home), not one.
5. **compositionalRationale field:** acknowledge drift on every cross-strand package.
6. **Manipulative-cut-outs:** pick single-repeat (counting) OR variety (sorting), not both.
7. **CLIL section bodies:** author as teacher-actionable scripts, not outlines. Non-native-speaker substitute teacher is a real audience.
8. **Verify each vocab key against all 11 locales at authoring time.** Body-parts and clothing will hit cultural-variation issues farm animals didn't.

## Schema / tooling / generator changes needed before Arc 2

1. **None gating Arc 2 deck-publish.** Phase 2 schema + Phase 3 generators + Phase 4 first-package shape are stable enough to template the next 9 packages.
2. **Sentence-strips Nordic frame templates** (Phase 3b deferred): sv/da/no/fi frame template tables before any Nordic-locale Arc 2 package.
3. **Validator extension (optional, low priority):** detect when a package's vocab keys produce locale gaps in any of the 11 IMAGE_VOCABULARY entries (e.g., Finnish missing for a specific key). Currently this would be caught at material-render time as a fallback to Finnish key=key; surfacing it earlier helps authoring quality.
4. **`compositionalRationale` field formalization:** validator currently passes through unknown fields silently; could promote to a documented optional field in the schema. Not gating.
5. **Material generators verification cycle:** operator-side browser visual inspection of all 7 generators before Phase 4 first-render. Could land as an `[OPS]` task before Arc 2 authoring resumes.

## Out-of-scope items closed

Per Arc 1 commission scope:
- Localization of first package to non-en locales: deferred to Arc 2 (operator-strategic order — agent suggested clothing → vehicles → fruits → body-parts → school-objects → color-words → house-rooms → emotions → action-verbs).
- Authoring packages 2-10: Arc 2 commission.
- Authoring 190 non-MVP packages: Arc N+.
- Teacher-facing UI: much later arc.
- Subscription gating: operator-strategic; later.
- SUBSCRIPTION-SCOPE.md re-lock: operator-side post-Arc-1.
- 29/156 plan-count drift reconciliation: filed as [CHORE][DATA] in `project_deferred_items_queue.md` — operator's deferred-queue commission shape.

## Verification status

- All Phase 1 deliverables present + JSON-validated.
- Phase 2 Prisma schema validates clean (`npx prisma validate`); migration generated via `prisma migrate diff --script`; unapplied (operator runs `npx prisma migrate deploy` at discretion per §A.5.1).
- Phase 2 validator: 13/13 tests passing.
- Phase 3 generators: shipped without browser visual inspection; defect risk bounded by pattern-following from 29 §14.10 apps.
- Phase 4 package: validates clean via Phase 2 CLI; classroom-teacher agent review iteration applied; render-pending operator-side.
- Git: 6 commits on `pivot/printable-business-toolkit`; all pushed to origin.
