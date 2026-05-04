# Scaling-checkpoint framework

**Status:** operational; first arc closed at commit `9e83ddff` (variety-strips refactor) post-empirical validation against the 55K-deck synthetic dataset.

**Path:** `frontend/scripts/scale-checkpoint/`

**Purpose:** synthetic load-test framework that validates the LessonCraftStudio catalog read-path query workload at scale checkpoints (291 baseline / 3K / 10K / 30K / 55K decks). Re-runnable at every catalog milestone. Isolates from production via Docker-local Postgres. Does not require Mac Studio or any prod infrastructure.

---

## When to re-run

1. **Every Track C wave that adds 100+ decks** to the catalog. Minor publishes (1-10 decks) are generally noise; substantial waves shift the per-locale + per-axis-key distribution shape and warrant a reproducibility check.
2. **Every catalog milestone:** 3K / 10K / 30K / 55K thresholds. Each is anticipated to surface a planner-shift somewhere in the workload; validate empirically before traffic outpaces the baseline.
3. **Before any catalog-affecting schema change.** New indexes, dropped indexes, schema rewrites — re-run the full sweep against the current schema to capture before/after deltas.
4. **When a query-path latency complaint surfaces in production.** Run the framework as a local-isolated reproducibility check before adjudicating index changes.

---

## How to invoke

### One-time setup

```sh
cd frontend/scripts/scale-checkpoint

# 1. Stand up isolated Postgres (port 5433, isolated from any local dev DB on 5432)
docker compose up -d postgres-loadtest

# 2. Apply current Prisma schema. Note: use `prisma db push` (not `migrate deploy`)
# because migration history may include out-of-band drops that fail on fresh DB.
LOADTEST_DATABASE_URL="postgresql://loadtest:loadtest_pw@localhost:5433/lcs_loadtest" \
  DATABASE_URL=$LOADTEST_DATABASE_URL \
  npx --prefix=../.. prisma db push --schema=../../prisma/schema.prisma --accept-data-loss --skip-generate
```

### Per-checkpoint cycle

```sh
# Synthesize at target N
LOADTEST_DATABASE_URL=... node synthesize.js --target 55000

# Run query workload
LOADTEST_DATABASE_URL=... node run-loadtest.js --checkpoints 55000 --invocations 100

# Clear between checkpoints
LOADTEST_DATABASE_URL=... node clear.js
```

### Full sweep (one shot)

```sh
LOADTEST_DATABASE_URL=... node run-loadtest.js \
  --checkpoints 291,3000,10000,30000,55000 \
  --invocations 100
```

`run-loadtest.js` orchestrates the full clear → synthesize → measure cycle per checkpoint.

### Pre/post output parity verification (refactor validation)

```sh
LOADTEST_DATABASE_URL=... node capture-strips.js > capture-output.json
# Inspect capture-output.json — each test case shows pre/post deck IDs + match flag
```

The `capture-strips.js` helper is structured for variety-strips parity verification but the pattern generalizes to any read-path refactor: capture output before applying the refactor, apply, recapture, diff.

### Teardown

```sh
docker compose down -v   # removes container + volume
```

---

## How to interpret results

### Per-path threshold table (Phase 3 baseline at Arc 1)

| # | Path | Description | p95 threshold | Notes |
|---|---|---|---|---|
| 1 | path1a | Topic-page deck listing (exercise-type axis) | 100ms | Index hit `(language, status, exercise_type)` |
| 2 | path1b | Topic-page deck listing (theme axis) | 100ms | Index hit `(language, status, age_range)` + GIN filter |
| 3 | path1c | Topic-page deck listing (educational-level axis) | 100ms | **Watch-list:** super-linear sort-cost growth; trajectory warrants re-evaluation at 100K+ |
| 4 | path2 | Variety strips (4 sub-queries) | 100ms | Strips 2+4 refactored at `9e83ddff` to per-locale bounded fetch |
| 5 | path3 | Sitemap topic enumeration (groupBy + findMany) | n/a | ISR-bound 30-min revalidate; no synchronous threshold |
| 6 | path4 | BreadthGrid (12 parallel: 11 per-locale LIMIT 20 + 1 groupBy) | 200ms | Refactored at `317cb1a7` to per-locale bounded fetch |
| 7 | path5 | Lesson-plan findUnique by (topicSlug, language) | 150ms | Constant via unique constraint index |
| 8 | path6 | Deck findUnique/findMany by id | 50ms | Constant via PK index |

### Phase 3 baseline reference snapshot (5 checkpoints × 7 paths, p95 in ms)

| Path | 291 | 3K | 10K | 30K | 55K |
|---|---|---|---|---|---|
| path1a | 1.36 | 2.57 | 1.90 | 3.56 | 5.28 |
| path1b | 1.37 | 1.87 | 2.56 | 6.88 | 8.49 |
| path1c | 1.72 | 3.20 | 9.44 | 26.15 | 47.73 |
| path2 (pre-refactor) | 6.28 | 8.11 | 21.23 | 58.21 | **104.45** ❌ |
| path2 (post-9e83ddff) | — | — | — | — | **87.29** ✅ |
| path3 | 1.35 | 2.45 | 4.26 | 11.49 | 16.97 |
| path4 (post-317cb1a7) | 4.20 | 4.11 | 6.14 | 11.80 | 19.38 |
| path5 | 1.26 | 1.22 | 1.29 | 1.30 | 1.09 |
| path6 | 1.72 | 1.71 | 1.89 | 1.69 | 1.62 |

### Planner-shift signals to watch for

- **Sort method = "external merge Disk: NkB"** in EXPLAIN ANALYZE → query has spilled sort to disk; bounded-fetch refactor warranted (mirrors variety-strips Strip 4 pre-`9e83ddff`)
- **Seq Scan replacing Index Scan** between checkpoints → planner cost-shift; investigate whether a more-specific index would help
- **Sort buffer growing super-linearly** between checkpoints (memory KB rising faster than row count) → ORDER BY column not covered by available index; consider adding `(filter_columns..., order_column)` covering index
- **Bitmap Heap Scan with high `Rows Removed by Filter`** → index covers prefix but not the full filter; index extension may help
- **`Filter` line on a query that should be index-covered** → index missing; check schema migrations
- **`Buffers: shared read` (vs `shared hit`)** → page cache miss; benign noise on first invocation, concerning if it persists

### Cross-validation against prod baseline

The synthetic dataset distribution is designed to roughly approximate production at any catalog scale. To cross-validate:

1. Run a single representative EXPLAIN ANALYZE on prod (read-only):
   ```sh
   plink ... "PGPASSWORD=... psql -U lcs_user -d lessoncraftstudio_prod -c \"EXPLAIN (ANALYZE, BUFFERS) SELECT ... FROM decks WHERE ... ORDER BY ... LIMIT N\""
   ```
2. Run the same query against the synthetic 291-checkpoint DB.
3. Plans should be structurally similar (same index hit OR same Seq Scan behavior at small cardinality). Execution times will differ by Prisma+Node overhead vs bare-SQL EXPLAIN.

The synthetic baseline is fair if checkpoint-to-checkpoint scaling shape holds across the run. Absolute latencies are less important than the trajectory.

---

## Doctrine cross-references

- **§A.5.1** — Prisma migrate two-step doctrine (`deploy.sh` does NOT run `prisma migrate deploy`; manual step required for prod schema migrations). Note: framework uses `prisma db push` for the local isolated DB to bypass the out-of-band-table migration failure.
- **§15.7** — nginx routing for deck pages (deck URLs are nginx-served, not Next.js routes). The framework's load-test does NOT measure nginx; it measures the Prisma read-path that the topic-page + homepage React components consume.
- **§16.2** — variety-strips composition rules (Strip 1-4 cardinality caps; self-skip threshold of 2). Refactor at `9e83ddff` preserves all caps.
- **§17.4** — descriptor-differentiation pattern. Synthetic data generation respects the §17.8.6 K-3 age-range curve (kindergarten-dominant 50%) but does not model per-locale axis-key naming variance (the framework tests the read-path, not the URL slug layer).
- **§18.4** — BreadthGrid three-equilibria curation; refactored at `317cb1a7`.

---

## Worked examples

### BreadthGrid pre-Arc-1 fix (`317cb1a7`)

Phase 1 inventory of the [FEATURE][SCALE] Arc 1 commission identified `lib/breadth-grid-selection.ts:140-144` as the obvious scale tripwire: `prisma.deck.findMany({where: {status: 'published'}})` with no LIMIT, no language filter. At 291 decks ~17 KB; at 55K target ~3 MB × 11 locales × every ISR revalidation.

**Refactor shape:** replace single full-catalog findMany with `Promise.all` of 11 per-locale findMany calls (LIMIT 20 each) + 1 groupBy aggregate for true deck-counts. Total per-render at any catalog size: ≤ 220 rows + groupBy result.

**Empirical validation post-refactor at 55K:**
- EXPLAIN ANALYZE: Index Scan Backward using `decks_status_published_at_idx` + Incremental Sort + Limit 20 short-circuit. 0.303ms execution per locale.
- Phase 3 measurement: p95 = 19.38ms at 55K (vs 200ms threshold; 90% headroom).

### Variety-strips refactor (`9e83ddff`)

Phase 3 sweep surfaced Path 2 (variety strips) at 55K p95 = 104.45ms vs 100ms threshold. EXPLAIN at 55K isolated Strip 4 (`fetchDecksCatalogHighlights`) as the cause: external-merge-on-disk sort (10MB temp file spill, 61ms+ execution alone).

Same defect class as BreadthGrid. Same fix shape applied: per-locale parallel queries with `take=200` for Strip 2 + Strip 4. Strips 1 + 3 untouched (already had axis-key WHERE filters).

**Why `take=200`:** initial baseline `take=50` failed pre/post output parity on the strip2-educational-level case (rare grade-3 age-range at 3% distribution didn't always include 2+ decks in top-50, causing the diversity cap to return 7 instead of 8 picks). `take=200` covers the rarest age-range with ~99.5% probability while still capping fetch volume at ~0.04 MB per Strip-4 invocation.

**Empirical validation post-refactor at 55K:**
- EXPLAIN: Index Scan Backward using `decks_status_published_at_idx` + Incremental Sort + Limit 200. 1.5-7.3ms per locale. NO disk spill.
- Phase 3 re-run: p95 = 87.29ms at 55K (vs 100ms threshold; 13ms headroom).
- Pre/post output parity: 5/5 representative test cases match exactly.

### Pattern recognition

Both refactors followed the same structural pattern:
1. **Identify** the no-WHERE-filter or no-LIMIT findMany.
2. **Replace** with per-locale parallel findMany (Promise.all of 11 queries, take=N each).
3. **Merge + re-sort** in JS to preserve diversity-cap algorithm input ordering.
4. **Verify pre/post output parity** empirically against the 55K loadtest dataset.
5. **Verify EXPLAIN** confirms Index Scan Backward + LIMIT short-circuit; no disk spill.
6. **Re-run** the affected path against the loadtest framework to confirm latency under threshold.

If a third surface of this pattern is identified, the convention is now well-established. Watch for new full-fetch findMany shapes during code review.

---

## Phase 6 closeout state

This document was authored as part of the [FEATURE][SCALE] Arc 1 Phase 6 framework-completion commission, alongside the persistence of `run-loadtest.js` in git. Arc 1 is closed: read-path empirically validated to 55K with 0 threshold violations; framework re-runnable at every future catalog milestone.

**Outstanding watch-list items** (filed in doctrine queue, not in scope this commission):

- **path1c educational-level sort trajectory** — currently 47.73ms p95 at 55K (under 100ms threshold) on a super-linear growth curve. Compound index `(language, status, age_range)` covers WHERE filter but not ORDER BY publishedAt. Re-evaluate at 100K+ catalog scale; if sort cost crosses threshold, propose covering index `(language, status, age_range, published_at DESC)`.
- **`ALL_LOCALES` constant** — duplicated between `lib/breadth-grid-selection.ts` and `lib/topic-variety.ts`. DRY-extraction to a shared `lib/locales.ts` is a future-consolidation candidate; defer until a third consumer surfaces (per §14.13 list-joiner-promotion threshold pattern).

**Future arcs:**

- Arc 2 — pg_vector embeddings migration (deferred per Arc 1 commission)
- Arc 3 — asset-tree organization audit
- Arc 4 — sitemap-index implementation
- Arc 5 — bulk-publish path validation
