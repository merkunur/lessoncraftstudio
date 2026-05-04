# Scale-Checkpoint Framework

Synthetic load-test framework for the LessonCraftStudio catalog read-path. Validates query latency at scale checkpoints (291 baseline / 3K / 10K / 30K / 55K decks).

Re-runnable at every catalog milestone. Isolated from production via Docker-local Postgres.

## Quick start

```sh
# 1. Stand up isolated Postgres (port 5433)
cd frontend/scripts/scale-checkpoint
docker compose up -d postgres-loadtest

# 2. Apply prod schema
LOADTEST_DATABASE_URL="postgresql://loadtest:loadtest_pw@localhost:5433/lcs_loadtest" \
  npx prisma migrate deploy --schema=../../prisma/schema.prisma

# 3. Synthesize N decks at a checkpoint
LOADTEST_DATABASE_URL="postgresql://loadtest:loadtest_pw@localhost:5433/lcs_loadtest" \
  node synthesize.js --target 55000

# 4. Run load test (Phase 3, not yet implemented)
# LOADTEST_DATABASE_URL=... node run-loadtest.js

# 5. Clear synthetic data (preserves schema; for re-run at different N)
LOADTEST_DATABASE_URL=... node clear.js

# 6. Tear down container entirely
docker compose down -v
```

## Files

| file | purpose |
|---|---|
| `docker-compose.yml` | Isolated `postgres:15-alpine` on port 5433; volume-persistent |
| `synthesize.js` | Generates N synthetic Deck rows + adjacent Topic / LessonPlan / Bundle / BundleDeck / BundleLessonPlan rows; matches prod-derived distribution shape |
| `clear.js` | Truncates synthetic-deck-bearing tables; preserves schema |
| `lib/distribution.js` | Locale + theme + exercise-type weights derived from current 291-deck shape projected to 55K |
| `lib/deck-factory.js` | Synthetic Deck row generator |
| `lib/topic-factory.js` | Topic row generator from `topics-taxonomy.json` |
| `lib/lesson-plan-factory.js` | LessonPlan generator (Pillar 1, ~50/156 in-flight cap) |
| `lib/bundle-factory.js` | Bundle / BundleDeck / BundleLessonPlan generator (Pillar 2, ~7/14 cap) |
| `run-loadtest.js` | (Phase 3) executes the 7 query paths × 100 invocations × 5 checkpoints; captures p50/p95/p99 + EXPLAIN ANALYZE |

## Distribution model

The synthesizer matches the operator's stated catalog target shape:

- **11 platform locales:** en / de / es / nl / fr / it / pt / sv / da / no / fi (substrate-complete per `a47ea021`)
- **29 §14.10 exercise-types per locale:** evenly distributed (~170 decks/exerciseType/locale at 55K)
- **100 theme axis-keys** (50 color + 50 BW per `134614dc`+`947ad260`) **+ themeless:**
  - Heavy-published themes: `animals` (25%), `vehicles` (10%), `food` (8%), `fruits` (6%) ≈ 49% of themed
  - Long-tail themes: 96 themes × ~0.5% each ≈ 48% of themed
  - Themeless: 30% of total
  - Themed: 70% of total
- **5 educational-level age-ranges:** preschool (3-5) 15%, kindergarten (5-7) 50%, grade-1 (6-8) 20%, grade-2 (7-9) 12%, grade-3 (8-10) 3% (matches §17.8.6 mapping table; kindergarten dominates K-3 catalog naturally)

## Adjacent rows

- **Topics:** Generated from `frontend/config/topics-taxonomy.json` × 11 locales = up to ~1500 Topic rows. Constant regardless of deck count.
- **LessonPlans:** ~50 rows (matches in-flight Pillar 1 cap; Path A 156-cap targets full coverage post-launch).
- **Bundles:** ~7 rows (matches in-flight Pillar 2 cap; 14-bundle full launch).
- **BundleDecks / BundleLessonPlans:** Per Bundle composition.

User-side rows (Collections, Favorites, EmbedConfigs, PlayLinks) are NOT synthesized — they're subscriber-side load, not catalog-read load.

## Re-run cadence

- Every Track C wave that adds 100+ decks
- Every catalog milestone (3K / 10K / 30K / 55K)
- Before any catalog-affecting schema change

## See also

- CLAUDE.md §A.5.1 — Prisma migrate two-step doctrine
- CLAUDE.md §17.8.6 — age-range to educational-level mapping
- `project_mass_publish_recon.md §B4` — original index-rationale document
- `docs/SCALING-CHECKPOINT.md` — (Phase 6) operational documentation
