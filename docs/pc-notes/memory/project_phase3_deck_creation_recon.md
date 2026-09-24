---
name: Phase-3 bulk deck creation — recon report
description: Current catalog state + coverage-gap inventory + endpoint-criterion adjudication candidates + batch-plan + operator-coordination shape. Recon-only output (no DB writes, no publish-cli runs, no commits). Drives the subsequent plan-pass, where copilot locks the structural shape (endpoint criterion + batch plan + propagation-gap resolution stance + operator-coordination model). Per-batch content choices come at execution time from the operator, not at plan-pass time.
type: project
originSessionId: b1fc4fb5-c078-4a51-a4e1-b3680342e11b
---
**Reading rule:** read at start of Phase-3 plan-pass. Adjudicate C-1 through C-5 endpoint criterion + propagation-gap resolution stance + batch-plan structural shape.

**Status:** recon-only pass complete (2026-05-03). Catalog substrate VERIFIED via direct production DB query; 3 pre-existing operational warts surfaced; 5 endpoint candidates framed; no commits, no in-tree edits.

---

## 1. Current catalog state (verified 2026-05-03 via production DB)

**Source of truth:** `SELECT ... FROM decks WHERE status='published'` + `WHERE status='archived'` against the production database (`postgresql://lessoncraftstudio_prod` on Hetzner). Direct query, not SESSION-STATE.md write-back.

### Totals

| Status | Count |
|---|---:|
| published | **15** |
| archived | **1** (picture-path en, sealed by Brief B Phase 5 decision) |

SESSION-STATE.md §4 wrote-back "15 across en+de Tier 1." Verified accurate.

### Per-(app, locale) inventory (all 15 published rows)

| App | en | de | Mirrored? | exercise_mode | age_range | subject_tags |
|---|:-:|:-:|:-:|---|---|---|
| addition | ✓ | ✓ | YES | image-image | 5-7 | {animals} both |
| bingo | ✓ | ✓ | YES | (null) | 5-7 | en={animals}, de={} |
| crossword | ✓ | ✓ | YES | (null) | 7-9 | both {} |
| cryptogram | ✓ | ✓ | YES | (null) | 5-7 | both {} |
| pattern-train | ✓ | ✓ | YES | (null) | 5-7 | both {} |
| picture-path | ✗ | ✓ | NO (sealed) | (null) | 5-7 | de={} |
| sudoku | ✓ | ✓ | YES | (null) | 5-7 | both {} |
| word-scramble | ✓ | ✓ | YES | (null) | 6-8 | both {} |

**8 apps shipped**, 7 fully en+de mirrored. picture-path en archived (sealed; not a content-completeness gap per the closed deferred-queue entry "Deferred-pending-taxonomy locale-mirror gap" 2026-05-02).

### Per-locale + per-app + per-level + per-theme

| Slice | Distribution |
|---|---|
| **Locale** | en: 7 / de: 8 |
| **Apps with ≥1 published deck** | 8 of 29 catalog-eligible (28%) |
| **Apps with 0 decks** | 21 — alphabet-train, big-small, chart-count, code-addition, find-and-count, find-objects, grid-match, math-puzzle, math-worksheet, matching, missing-pieces, more-less, odd-one-out, pattern-worksheet, picture-sort, prepositions, shadow-match, subtraction, treasure-hunt, word-guess, wordsearch |
| **Themes represented** | `animals` only (in 3 of 15 rows: addition-de + addition-en + bingo-en) |
| **Themes absent** | `vehicles`, `food`, `fruit` — 0 decks each |
| **Educational-levels** | kindergarten (5-7): 11 / grade-1 (6-8): 2 / grade-2 (7-9): 2 |
| **Levels absent** | preschool (3-5): 0 / grade-3 (8-10): 0 (per §17.8.6 ceiling — grade-3 acceptably absent at K-3 audience natural ceiling) |

### subject_tags coverage gap (publish-cli propagation gap signal)

Only **3 of 15 rows** have populated `subject_tags`. Distribution:

| Row | subject_tags |
|---|---|
| addition-image-image en | `{animals}` |
| addition-image-image de | `{animals}` |
| bingo en | `{animals}` |
| (12 other rows) | `{}` empty |

Confirms the deferred-queue entry "publish-cli theme→subject_tags propagation gap." Stop-gap UPDATE applied to those 3 rows on 2026-05-02; new themed-deck publishes since then would re-introduce empty `subject_tags`. **No new themed publishes have happened post-stop-gap** (the 12 empty rows pre-date both stop-gap and theme adoption — they were authored without `theme` in the manifest).

### Asset directory growth

```
59M total at /var/www/lcs-media/decks/
14M at /var/www/lcs-media/decks/.archived/
```

Well below the 1GB OR 100-deck cleanup trigger (§15.12). Multi-version churn visible in production (e.g., `addition-image-image-v3` through `v7` for de) — versioning growth is real but small.

---

## 2. Coverage-gap inventory against the universe matrix

Universe per §14.10 + §16.5 + §17.8.6 + §11 Tier-1 scope:

```
29 apps × 2 locales (en, de) × 4 themes × 5 educational-levels = 1160 cells
```

(Tier 2-4 locales scope-OUT per §11 + §19 sequencing.)

### Gap shape

| Coverage axis | Cells filled / total | % |
|---|---:|---:|
| **(app)** | 8/29 | 28% |
| **(app, locale)** | 15/58 strictly (or 14 mirrored + 1 unilateral) | 26% |
| **(app, theme=animals)** | 3 (one app × en+de + one app × en) | <1% of (29 × 4) |
| **(app, theme=non-animals)** | 0 | 0% |
| **(app, level=kindergarten)** | 11 | n/a |
| **(app, level=preschool)** | 0 | 0% |
| **(app, level=grade-3)** | 0 | 0% (acceptable per §17.8.6) |
| **(app × locale × theme × level)** | ≤15 of 1160 | ~1% |

### Per-axis-key topic-page coverage signal (per §16.5 + Pass-7b live route)

Topic destination pages render at `/<locale>/topic/<axis-key-slug>/` per §16.5. Coverage today:

- **exercise-type axis:** 8 of 29 axis-keys × 2 locales = 16 of 58 topic pages have ≥1 deck. Pages exist but render with thin deck grids (1–2 decks per page).
- **theme axis:** only `animals` axis-key has ≥1 deck. 3 of 8 (4 themes × 2 locales) topic pages live. Other 5 theme pages are 404 (empty axis-keys auto-skipped per §16.5 fallback).
- **educational-level axis:** kindergarten + grade-1 + grade-2 axis-keys live in en+de. preschool + grade-3 axis-keys empty.

This is the gap Phase-3 fills.

---

## 3. Endpoint-criterion adjudication candidates

Five candidates surfaced for plan-pass adjudication. **Recon does NOT lock; the operator + copilot adjudicate at plan-pass.**

### C-1 — Per-app coverage threshold

**Definition:** Phase-3 closes when every catalog-eligible app has at least one published deck per locale. Target: **58 (app, locale) rows** (29 apps × en + de).

**From current 15 → 58 = +43 publishes** (+1 to fill picture-path-en if reactivated; otherwise +43 new across the 21 zero-shipped apps × 2 locales = 42, + picture-path-en if reactivated = 43).

**Pros:** minimal viable; covers every app surface; supports launch-trigger clause (a) at 58 lesson-plans authored; bounded; single endpoint flag.
**Cons:** thin theme/level coverage; topic-pages stay sparse; limited SEO compounding.

### C-2 — Per-(app, theme) coverage threshold

**Definition:** Each app × each registered theme × per-locale has at least one deck. Target: **232 deck rows** (29 apps × 4 themes × 2 locales).

**From current 15 → 232 = +217 publishes.** Heavy.

**Pros:** lights up all (app, theme) topic pages; rich faceted-browse experience; strong SEO surface area.
**Cons:** crosses 100-deck archive-cleanup trigger (§15.12); operator-coordination heavy; many forced theme assignments are unnatural (e.g., math-worksheet × food makes pedagogical sense; sudoku × fruit may not).

### C-3 — Per-app + theme-strategic threshold

**Definition:** Each app has at least one deck per locale (C-1 baseline); each app × ITS-NATURAL-THEMES has additional decks; non-natural themes skipped. Operator-coordinated per-app theme assignment. **Target: variable, ~80–120 publishes** (estimate: 58 baseline + ~25–60 themed additions).

**Pros:** every app surface covered; theme richness where it adds value; operator-bounded; natural pedagogical fit; topic pages get meaningful (not exhaustive) population.
**Cons:** the "natural theme" judgment requires operator adjudication per app — adds plan-pass complexity but defers per-deck decision to operator at execution time.

### C-4 — Catalog-size target threshold

**Definition:** Pure count target (e.g., 100 published decks). **Target: 100 publishes.**

**Pros:** simple to track; bounded.
**Cons:** doesn't enforce coverage shape — risks heavy-on-some-apps + zero-on-others distribution. The launch-trigger clauses (a) + (b) need *coverage* not *volume*.

**Recon recommendation against:** doesn't shape catalog correctly. Skip.

### C-5 — Acquisition-flywheel threshold

**Definition:** Phase-3 closes when topic-page coverage hits a target shape — every (axis, axis-key, locale) combination with at least N decks. With N=2 across all axes:

```
exercise-type: 29 axis-keys × 2 locales × 2 decks = 116
theme:         4 axis-keys × 2 locales × 2 decks = 16 (overlap with exercise-type cells)
level:         5 axis-keys × 2 locales × 2 decks = 20 (overlap with exercise-type cells)
```

Net unique deck count: ~120–150 (deck rows count toward multiple axis-keys via the §16.5 α-granular schema).

**Pros:** structurally maps to §3 acquisition flywheel; every topic page becomes a meaningful landing surface; SEO compounding maximized.
**Cons:** large; crosses archive-cleanup trigger; operator-coordination heaviest; level=preschool and level=grade-3 axis-keys force unnatural age-range coverage on apps designed for kindergarten.

### Recon recommendation (NOT a lock — for plan-pass adjudication)

**Hybrid C-1 + C-3 with C-5 selective batches:**

1. **Phase-3a (priority): C-1 baseline — 58 (app, locale) rows.** Closes every-app-covered. +43 publishes from current 15. Supports launch-trigger clause (a) at 58 lesson plans authored.
2. **Phase-3b (theme depth): C-3 selective expansion** — operator picks ~5–8 natural-fit apps for theme variety. +20–40 publishes. Lights up `vehicles` / `food` / `fruit` theme pages.
3. **Phase-3c (level breadth, optional): preschool axis-key population for K-3-natural apps** (more-less, big-small, alphabet-train, find-and-count). +6–10 publishes.

**Estimated total: ~80–100 publishes, ~7–10 batches at 8-per-batch cadence.**

Plan-pass alternative: ship Phase-3a only at C-1 endpoint, defer 3b + 3c to post-launch growth arc. Faster to launch trigger, leaner.

---

## 4. Batch-plan candidate (structural shape)

Per the six-pass batched-arc methodology (SESSION-STATE.md §9 + the Pass 1-6 taxonomy expansion arc precedent at CLAUDE.md §11).

### Cluster shape — natural batching axes

Multiple natural batching axes; the plan-pass picks one or composes:

**Axis A — by app-family (subject):**
- math: 8 apps (addition shipped; +7 missing — subtraction, code-addition, more-less, math-puzzle, math-worksheet, chart-count, find-and-count)
- logic: 8 apps (sudoku shipped; +7 missing — big-small, grid-match, matching, picture-sort, missing-pieces, odd-one-out, find-objects)
- letters: 8 apps (bingo, crossword, cryptogram, word-scramble shipped; +4 missing — alphabet-train, prepositions, word-guess, wordsearch)
- spatial-reasoning: 5 apps (pattern-train, picture-path-de shipped; +3 missing en — pattern-worksheet, shadow-match, treasure-hunt; +1 picture-path-en if reactivated)

**Axis B — by mechanic-shape (products.ts.category):**
- math: 5 apps cluster (per Pass 1)
- visual: 4 apps (per Pass 2)
- matching: 5 apps (per Pass 3)
- literacy: 5 apps (per Pass 4)
- search: 4 apps (per Pass 5)
- puzzle: 2 apps (per Pass 6)

**Axis C — by theme (when Phase-3b lights up):**
- animals (3 decks shipped; the warm-start theme)
- vehicles (0 decks; cold-start)
- food (0 decks; cold-start)
- fruit (0 decks; cold-start)

**Axis D — by educational-level (when Phase-3c lights up):**
- preschool baseline (0 decks)
- kindergarten depth (already populous)
- grade-1 + grade-2 light expansion

### Per-batch deck count

Historical cadence (commits 27-29 in SESSION-STATE.md §6, batches `71bfba3a` / `7d97cf2b` / `bb1b3356`):
- 4 ZIPs per pass typical (deferred-pending-taxonomy unblock).
- Locale-mirror closure pass: 4 ZIPs published in 0.657s wall-clock (Brief B Phase 5.7 dry-run-vs-real parity). Publish-cli throughput bounded by operator-side authoring effort, not pipeline.

**Candidate per-batch sizes:**
- **4 per batch:** matches historical cadence; tolerable per-week operator load; ~11 batches to C-1.
- **8 per batch:** double cadence; ~6 batches to C-1; depends on operator authoring throughput.
- **12 per batch:** aggressive; ~4 batches to C-1; risks operator-tolerance ceiling.

### Working-hypothesis discipline (preserved from Pass 1-6)

Per-batch prompts must declare hypotheses:
- Apps included this batch (verify against `topics-taxonomy.json` registration).
- Themes assigned (verify against axis-key registration).
- Educational-levels (verify §17.8.6 mapping).
- Locale-mirror parity (en + de in same batch unless operator splits).

Recon-claims-verified-against-actual-state at batch start: query DB for current state, surface gap, declare what this batch fills.

### Halt-and-surface watch points per batch

- subject_tags propagation gap (decision: per-batch SQL stop-gap until publish-cli fix).
- exercise_mode null on most rows (separate from subject_tags; surfaces same batch if publish-cli fix bundled).
- Locale-mirror parity (always en + de in same batch).
- Archive directory growth (<100 decks until 60+ publishes accumulate).
- Operator-tolerance ceiling (subjective; surface if batch authoring slips).

---

## 5. Operator-coordination shape

**What the operator produces per batch:**
- Deck content per (app, theme, level, locale): word lists / image selections / problem sets / themed decoration.
- Output as ZIPs ingestible by publish-cli at `/opt/lessoncraftstudio/publish-inbound/` (current convention).
- Per the 29 catalog-eligible apps' existing operator-side tooling (REFERENCE APPS/* generators).

**What copilot produces per batch:**
- The plan-pass prompt naming the (app × theme × level × locale) targets.
- Pre-batch decision-premise verification: DB state query confirms recon claims.
- The publish-cli invocation sequence (single-publish vs bulk-publish per Brief B sub-phase 5.13 parity).
- Post-publish verification checklist: subject_tags propagation patch (if propagation gap stop-gap holds), Footer column update commit, sitemap update verification, smoke tests, locale-mirror parity confirmation, asset-directory growth check.

**Operator-tolerance bound:**
- 4 ZIPs in a single afternoon: established cadence (locale-mirror closure pass).
- 8 ZIPs in a day: untested but likely tolerable for 1-2 batches before fatigue.
- 12+ ZIPs per batch: untested; surface as plan-pass risk.

**Key constraint:** per-batch operator-side authoring time scales linearly with deck count, NOT with publish-cli throughput. Pipeline can ingest 100 decks in seconds; operator can produce ~4–8/day sustainably.

---

## 6. Pre-existing operational warts (Phase-3 commission awareness)

### W-1: publish-cli theme→subject_tags propagation gap (DECIDE BEFORE PHASE-3 BATCH 1)

**Status:** open deferred entry. 12 of 15 production rows have empty `subject_tags`; theme topic pages stay 404 unless populated.

**Decision for plan-pass:**
- **Option A — Resolve as Phase-3.0 prerequisite pass.** Extend `scripts/publish-cli/db.js insertDeck` (and `--update-slug` UPDATE site) to populate `Deck.subject_tags` from `manifest.theme` at INSERT time. Single-commit publish-cli amendment + sweep production for newly-published themed decks. Adds ~1 commit before Phase-3 batch 1.
- **Option B — Live with gap; per-batch SQL stop-gap.** Accept manual `UPDATE decks SET subject_tags = subject_tags || ARRAY['<theme>']` per batch's themed-deck publishes. Established pattern from 2026-05-02 stop-gap.

**Recon recommendation:** Option A if Phase-3 endpoint includes Phase-3b theme-depth expansion (C-3 hybrid); Option B if Phase-3 ships only C-1 baseline (themes mostly absent → fewer SQL stop-gaps to manage). The stop-gap-per-batch overhead grows with theme adoption.

### W-2: exercise_mode null on 14 of 15 rows (NEW-FINDING)

Surfaced during Step 1 query: `addition-image-image` carries `exercise_mode='image-image'`; the other 14 rows have `exercise_mode=null`. The mode field is registered per CLAUDE.md §15.1 (`generation.json.exercise_mode`) but publish-cli appears to not propagate it to the Deck row at INSERT time, OR the affected app-generators don't emit the field in their generation.json.

**Phase-3 implication:** if topic-page or future search/filter surfaces key on `exercise_mode`, those queries would 404-empty for non-addition decks. Bundled with W-1 if propagation gap is resolved as Phase-3.0 — same fix shape (extend insertDeck to populate from manifest).

**Recon recommendation:** investigate at plan-pass — is exercise_mode populated in the generation.json of the affected apps, or is publish-cli dropping it? If populated, fix bundles cleanly with W-1; if absent, larger app-side investigation deferred.

### W-3: Archive-cleanup trigger awareness

Currently 14M / 1GB and 16 versioned dirs / 100-deck threshold. C-1 endpoint adds +43 → ~58 dirs (still below). C-3 endpoint adds +60-90 → 75-105 dirs (crosses 100-deck threshold; archive-cleanup pass becomes due during or after Phase-3).

**Phase-3 implication:** archive-cleanup is its own out-of-tree pass when triggered; Phase-3 doesn't perform cleanup, just notes the trigger.

### W-4: Dirty working tree (~890 entries — pass-report observation)

Phase-3 batches don't touch git-tracked files much (publish-cli runtime is DB+filesystem operations). Footer-column update commits (per locale-mirror pattern in commits 27-29) are the only touch. Dirty-tree contamination low-risk; flag for awareness.

### W-5: Trailing-slash routing-contract divergence (deferred queue, partially mitigated)

Topic-page deck-card click-throughs were 404'ing post-Pass-7b (resolved 2026-05-02 with Fix B per-component plain-`<a>` discipline). Phase-3 batches don't introduce new code that would re-trigger; non-blocking.

---

## 7. Cadence + pacing surfacing

| Endpoint | Total publishes from current 15 | Batches @ 4/batch | Batches @ 8/batch | Batches @ 12/batch |
|---|---:|---:|---:|---:|
| C-1 (58) | +43 | ~11 | ~6 | ~4 |
| C-3 hybrid (~80–100) | +65–85 | ~17–21 | ~9–11 | ~6–7 |
| C-5 flywheel (~120–150) | +105–135 | ~26–34 | ~13–17 | ~9–12 |

**Per-batch elapsed time:** 1 batch ≈ 1 operator-day for content authoring + ~1 hour for publish-cli + verification + 1 commit + deploy. Sustainable cadence is **~2 batches/week** without overload (operator-content production is the bottleneck).

| Endpoint × cadence | Phase-3 elapsed time |
|---|---|
| C-1 @ 8/batch @ 2 batches/week | ~3 weeks |
| C-3 @ 8/batch @ 2 batches/week | ~5 weeks |
| C-5 @ 8/batch @ 2 batches/week | ~7 weeks |

**Plan-pass tradeoff:** the launch-arc target is "first meaningful subscription revenue months 6-9" per CLAUDE.md §1. Phase-3 elapsed time competes with Pillar 1 (lesson-plan authoring) and Pillar 2 (bundle commission) which both depend on Phase-3 endpoint catalog. Faster Phase-3 (C-1 baseline) → faster launch readiness; richer Phase-3 (C-3 / C-5) → stronger SEO compounding at launch but later launch.

---

## 8. Out-of-scope guardrails

This recon and the subsequent Phase-3 plan-pass do NOT touch:
- **Tier 2-4 locale expansion** — Tier 1 en+de only per §11 + §19. Tier 2 (es, nl) folds in at Tier 2 launch arc, separately scoped.
- **Pillar 1 lesson plan authoring** — sequenced after Phase-3 endpoint per copilot's order (lesson plans need the catalog they describe).
- **Pillar 2 Bundle commission** — sequenced after Phase-3 endpoint.
- **Tool 2B Favorites surface** — independent track per copilot's order; can interleave with Phase-3 batches.
- **Cross-product topic pages** per §16.1 — gated on Pillar 1 lesson plans + Topic embeddings; downstream of Phase-3.
- **publish-cli pipeline modifications** — Brief B Phases 1-5 sealed; Phase-3 uses sealed pipeline. EXCEPTION: W-1/W-2 propagation-gap fix is its own scoped publish-cli amendment if the operator chooses Option A for W-1.
- **Schema modifications** — Phase-3 is application-data growth only.
- **deploy.sh Prisma Client regen wart** — non-blocking for Phase-3 (zero schema changes); deferred entry.

---

## Halt-and-surface findings

**No 6th endpoint-criterion needed** — C-1 through C-5 frame the design space cleanly.

**No re-sequencing required vs Logic A** — Phase-3 elapsed time at C-1 baseline (3 weeks) fits well within the 6-9 month launch window. C-3 hybrid (5 weeks) also fits. C-5 flywheel (7 weeks) is borderline; plan-pass adjudicates.

**W-2 (exercise_mode null) is NEW-FINDING** not in the operator's prompt's pre-existing-warts surfacing — flagged here for plan-pass investigation. Likely bundles with W-1 propagation gap.

**SESSION-STATE.md §4 write-back accurate** — no amendment required. picture-path-de unilateral status is sealed-by-Brief-B-Phase-5, not a content-completeness gap.

---

## Summary for plan-pass adjudication

**Substrate:** 15 published decks, 8 distinct apps (28% of catalog-eligible 29), 7 fully en+de mirrored, 1 archived (picture-path en, sealed). subject_tags propagation gap visible (12 of 15 empty). Theme corpus essentially zero (`animals` only, 3 rows). Level corpus kindergarten-heavy.

**Universe:** 29 apps × 2 locales × 4 themes × 5 levels = 1160 cells; ~1% covered today.

**Endpoint candidates:** C-1 (58 rows, +43 publishes), C-2 (heavy, +217 publishes; not recommended), C-3 (hybrid +65-85, recommended), C-4 (count-only, not recommended), C-5 (flywheel +105-135, ambitious).

**Recon recommendation:** Hybrid Phase-3a (C-1) + Phase-3b (C-3 selective theme depth) + optional Phase-3c (preschool axis), ~80-100 publishes total, ~9-11 batches @ 8/batch @ 2/week → ~5 weeks elapsed.

**Pre-existing warts:** W-1 (subject_tags propagation) — Decide Option A (resolve before) vs Option B (per-batch SQL stop-gap). W-2 (exercise_mode null, NEW) — investigate; likely bundles with W-1. W-3 (archive trigger) — awareness only; pass at C-3 endpoint.

**Cadence:** 8 ZIPs per batch, 2 batches/week, ~3 weeks (C-1) to ~5 weeks (C-3 hybrid) to ~7 weeks (C-5 flywheel).

**Operator-coordination model:** operator authors per-deck content (ZIPs); copilot adjudicates batch shape + invokes publish-cli + verifies post-publish.

After adjudication, Phase-3 batch 1 plan-pass commissions against the locked structural shape with operator-supplied content choices.
