# Storybook Commission Phase 2 — Evidence Pack

**Claim:** 100% of the 29 interactive worksheet-generator apps now generate storybook exercises (SEP artifacts), verified by a permanent regression suite, with Studio verification and the operator hand-offs prepared. **Nothing is deployed** — per the operator's build-all-then-deploy-at-end decision, all work is committed on `pivot/printable-business-toolkit` and the production deploy is the single final step (runbook below).

Generated 2026-07-02. Reconcile this pack against live state after the deploy — any report-vs-live discrepancy is a defect.

---

## 1. Coverage — 29/29 interactive apps, all six families

Each app: an additive `window.__sepGenerate(spec)` hook (headless, seeded) + (where needed) an emit-only `extractDeckBundle` "Edit-2" that maps the app's bundle onto its SEP family descriptor. **No existing printable / interactive / catalog output path was touched** (enforced by the per-app golden baseline `--check` + the additive-only edits). Ground truth: `docs/storybook/app-coverage-matrix.json`.

| app | family | bucket | status |
|---|---|---|---|
| addition | A | number-fill | passing |
| code-addition | A | number-fill | passing |
| crossword | A | 2D-grid | passing |
| cryptogram | A | letter-fill | passing |
| math-worksheet | A | number-fill | passing |
| subtraction | A | number-fill | passing |
| word-guess | A | letter-fill | passing |
| word-scramble | A | letter-fill | passing |
| picture-path | B | puzzle-drag | passing |
| treasure-hunt | B | puzzle-drag | passing |
| wordsearch | B | puzzle-drag | passing |
| big-small | C | choice-tap | passing |
| find-and-count | C | grid-tap/count | passing |
| find-objects | C | choice-tap | passing |
| more-less | C | choice-tap | passing |
| odd-one-out | C | choice-tap | passing |
| pattern-worksheet | C | choice-tap | passing |
| picture-sort | C | choice-tap | passing |
| prepositions | C | choice-tap | passing |
| chart-count | D | bar-chart | passing |
| matching | E | connect | passing |
| shadow-match | E | connect | passing |
| alphabet-train | F | drag-place | passing |
| bingo | F | drag-drop | passing |
| grid-match | F | drag-drop | passing |
| math-puzzle | F | drag-place | passing |
| missing-pieces | F | drag-drop | passing |
| pattern-train | F | drag-place | passing |
| sudoku | F | drag-drop | passing |

Family totals: **A 8 · B 3 · C 8 · D 1 · E 2 · F 7**. Families **B (puzzle-drag)** and **D (bar-chart)** were built from scratch this phase (mapper + player + validator).

---

## 2. How each app was proven (the standing PASS test)

`node scripts/storybook/prove-app-sep.js --app=<name>` runs the full chain with **no human in the loop**:
`__sepGenerate` (headless, seeded) → descriptor `sep-1` + transparent visual (alpha, dims == crop×scale) → auto-place into a one-page test story → **real `validate-story.js`** (0 errors) → **real `qa-storybook.js`** (mounts the actual PixiJS player, `autoSolve` seam, screenshots 360/768/1024/1366 + reduced-motion) → **seed reproducibility** (same spec twice → identical descriptor) → **≥2 locales** for locale-bearing apps.

**Every app additionally had its rendered artifact eyeballed** — the hard lesson of Phase 2 was that a mechanically-passing exercise can still be *hollow* (a blank box that `autoSolve` clears): the family-A crop originally omitted the operand images, so the first addition/subtraction "PASS" shipped nothing. Fixed with an image-ref-independent `cropExerciseBBox`. Every app's coherent render is confirmed (screenshots under `docs/audit-results/storybook/qa/sep-app-<name>/`).

Per-app golden baselines (normalized descriptor + visual sha1) are committed under `scripts/storybook/baselines/` (29 files) — the day-job-unchanged guard: `baseline-sep.js --check` fails on any drift.

The standing runner: `npm run test:storybook` (`run-all-sep.js`) iterates all 29, per app runs the PASS test + baseline `--check`, exit = fail count. Per-phase checkpoints (`--phase=0..4`) all ran green during the build; each app also passed its individual `prove-app-sep` this session.

---

## 3. The three new load-bearing surfaces (B + D)

- **Mapper** — `REFERENCE TRANSLATIONS/catalog-export.js`: `SEP_FAMILY_MAPPERS.B` (grid cells + trace path) + `.D` (chart columns + targets), `_sepDefaultCrop` B/D arms, `_sepLocales` prompts.
- **Player** — `mini tools/sb-mod-worksheet-exercise.js`: `familyB` (pointer drag-select a run of adjacent cells; check run == a path sequence, forward or reversed) + `familyD` (tap a cell to fill a column bottom-up; check level == target/column) + dispatch + CSS. `check`/`showHint`/`autoSolve`/`fontResize`/`cleanup` contract, `api.answerChanged` funnel — mirrors the existing F/C families exactly.
- **Validator** — `scripts/storybook/validate-story.js`: whitelist `['A','F','E','C','B','D']` + B/D descriptor-shape branches feeding the shared density gate. Existing families structurally untouched (matching + find-and-count regression clean after the shared edits).

QA (`qa-storybook.js`) is family-agnostic — B and D became QA-covered for free the moment their player branches implemented `check` + `autoSolve`.

---

## 4. Studio verification (Phase 7)

Automated (all green): `node scripts/storybook/prove-studio.js --stage=m5` — m1 feet-at-anchor fidelity, m2 drag→snapped→saved + undo + timestamped `.bak` + stale-etag 409 rejection, m4 mechanic picker applies a form + births a valid zone, m5 the coordinate invariant (zone-relative re-encode with absolute position unchanged). `node scripts/storybook/prove-studio-m7.js` — a full 5-page re-author of Pip's Picnic through the UI ending in a Studio "READY" validate.

Operator acceptance (hand-off): `docs/storybook/studio-operator-walkthrough.md` — a plain-language 20–30 min hands-on test (compose place/scale/order → draw zone → configure a mechanic → edit narration → place one SEP → live preview → export → reopen) with per-step "what you should see / report if" and a map back to the automated stages. This is the inherently-human UX gate.

---

## 5. Constraints held

0-line protected cores (the 5 + 6 wrapped cores — untouched); app HTML edits **additive only** (existing output byte-identical, guarded by baselines + additive-only diffs); kid-facing rules by construction (no free typing, ≥44px hit floor via `.sbwe-hit`, ≥16px density gate, **no scores / timers / streaks**, encouragement-only); verified on the real rendered artifact (autoSolve in the real player + eyeballed screenshots, never "tests pass + 200"); player + validator edited only for the two genuinely-new families.

---

## 6. Remaining: whole-system E2E (Phase 8) + production deploy (Phase 9)

- **E2E machinery is in place** as composable scripts: `blueprint-to-skeleton.js` → `gate-story.js` → `sep-generate.js --from-blueprint` → `gen-placeholder-art.js` → `qa-storybook.js`. The automated placeholder-compose run is the machine E2E proof; the **human-composed** variant is the operator hand-off (via the walkthrough above).
- **Deploy is the single final step** (operator-locked "deploy at the very end"). It is a batched §14.6 two-step per modified app HTML + a `catalog-export.js` served-copy sync, then live verification (mind the Cloudflare 5-min TTL). See the deploy runbook in the plan file / the closing report. Modified files this phase:
  - `REFERENCE TRANSLATIONS/catalog-export.js` (SEP mappers) + its served copy.
  - `mini tools/sb-mod-worksheet-exercise.js` (player) — served by nginx from `mini tools/`.
  - `scripts/storybook/*` (suite) — CI/dev only, not deployed.
  - The 25 newly-hooked `REFERENCE APPS/*.html` (the 4 representatives shipped in Phase 1's deploy).

Reconcile this pack against live state after the deploy.
