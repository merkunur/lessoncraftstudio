---
name: Catalog-side Prisma models recon — Topic + LessonPlan + workspace family
description: Recon-only snapshot of catalog-side §8.1 model implementation gap, three target model families, FK dependency graph, embedding-mechanic specification status, and SUBSCRIPTION-SCOPE.md open-decision dependencies. Drives the subsequent commission-pass plan. Out-of-tree per CLAUDE.md §10.4.
type: project
originSessionId: b1fc4fb5-c078-4a51-a4e1-b3680342e11b
---
# Catalog-side Prisma models recon — at commit `a06cd835`

## Inputs read

- CLAUDE.md §8.1 (lines 229-414), §4.5 (lines 133-148), §16-§16.5 (lines 1123-1233), §A.3 (line 1916), §A.6 (Lemon Squeezy conventions), §10.3 (never-without-approval), §11 (queued items), §13 (one-sentence summary post-doctrine-hygiene)
- `docs/SUBSCRIPTION-SCOPE.md` (in-tree at e7a055cc): Pillar 1 lesson plans, Pillar 2 themed bundles, Pillar 3 workspace tooling, Pillar 4 embedding-stays-free
- `frontend/prisma/schema.prisma` (38 models)
- `frontend/prisma/migrations/` (14 historical migrations + lock file)
- Production DB row counts (read-only psql query)

## §8.1 catalog-side model inventory

§8.1 specifies **11 catalog-side-or-related models** in the Prisma block at lines 237-411:

| # | Model | §8.1 line range | Implementation state | Notes |
|---|---|---|:-:|---|
| 1 | Deck | 238-270 | ✅ implemented | schema.prisma:1124 (added 20260428220521; field-level diff vs §8.1: `manifestUrl` becomes `manifest_url` with @map; `version` defaults match; `contentFamilyId` reserved nullable per §17.8.7) |
| 2 | DeckEnrichment | 272-281 | ❌ unimplemented | embedding column for semantic-search ranking |
| 3 | Topic | 283-300 | ❌ unimplemented | Driven by §16.1 cross-product topic pages |
| 4 | LessonPlan | 302-316 | ❌ unimplemented | Driven by SUBSCRIPTION-SCOPE.md Pillar 1 |
| 5 | ParentNote | 321-333 | ❌ unimplemented | Feature deferred per SUBSCRIPTION-SCOPE.md (see disposition Q) |
| 6 | PlayLink | 335-347 | ❌ unimplemented | Student-facing share-link route (§4.4) |
| 7 | Collection | 350-361 | ❌ unimplemented | SUBSCRIPTION-SCOPE.md Pillar 3 Tool 1 |
| 8 | CollectionDeck | 363-373 | ❌ unimplemented | Pillar 3 Tool 1 join table |
| 9 | DeckFavorite | 377-386 | ❌ unimplemented | Free-tier favorites (collections-CTA trigger) |
| 10 | EmbedConfig | 391-403 | ❌ unimplemented | Reclassified as platform-infra (see disposition Q) |
| 11 | Subscription | 405-411 (stub) | ✅ implemented + extended | schema.prisma:184 (LS fields added 20260430154422; grace period via `User.gracePeriodEndsAt`) |

**N-of-N: 2-of-11 implemented (Deck + extended Subscription); 9 unimplemented.** SESSION-STATE.md §10 item 3 "0-of-9" matches counting only the 9 NEW catalog-side models excluding Deck (counted separately) and Subscription (auth-side originally, extended for LS). The 0-of-9 framing is correct.

§8.1 closing note (line 414): "When the `Deck` and `Topic` models are actually built in `schema.prisma`, `ageRange` should land as a Prisma `enum AgeRange { AGE_3_5 AGE_5_7 AGE_6_8 AGE_7_9 AGE_8_10 }` rather than a free-form `String`, so the database enforces the same five-tier set as §17.8.6." — Topic should land with the enum; Deck shipped with `String` (drift from this guidance, but Deck is already shipped; out of scope to retrofit per §10.3).

## Three target model families

### Topic family (driven by §16.1)

**§8.1 stated-intent shape:**
```
slug             String   @id    // e.g. "addition-kindergarten-spanish"
title            Json
description      Json
subject          String
ageRange         String          // (per §8.1 line 414, Topic should use AgeRange enum on first build)
language         String
curriculumTags   String[]        // e.g. ["pyp-mathematics-numbers", "ipc-early-years-counting"]
parentSlug       String?         // optional taxonomy nesting
isHighPriority   Boolean  @default(false)
createdAt        DateTime
updatedAt        DateTime
lessonPlans      LessonPlan[]
parentNotes      ParentNote[]
@@index([subject, language])
```

**§16.1 prose requirements** (at lines 1129-1137):
- Topic resolution: (1) exact slug match → (2) embedding-similarity match against existing `Topic` rows → (3) faceted-browse fallback.
- §16.2 line 1145: "ordered by `LessonPlan.recommendedDeckIds` if a plan exists, otherwise by an embedding-similarity ranking against the topic"

**Embedding column gap.** §8.1 Topic model spec does NOT include an embedding column. §16.1 prose explicitly relies on embedding-similarity against Topic rows. Halt-and-surface candidate (see Step 5 detail below).

**Cross-product slug naming.** §8.1 line 284 example slug: `"addition-kindergarten-spanish"` — cross-product subject × age × language pattern. Distinct from the **single-axis** Pass 7b topic-page slugs (per-axis-key, locale-prefixed, like `/de/topic/addition/`). The cross-product pages and single-axis pages are different surfaces; Pass 7b says cross-product "layer on top when the Topic table and LessonPlan content exist." Topic.slug = cross-product slug (cluster-key); single-axis-page slugs continue to come from `topics-taxonomy.json.axes.<axis>.<key>.slug.<locale>`.

### LessonPlan family (driven by SUBSCRIPTION-SCOPE.md Pillar 1)

**§8.1 stated-intent shape:**
```
id                     String   @id @default(cuid())
topicSlug              String   // FK → Topic.slug
language               String
durationMinutes        Int
structure              Json     // {warmup: {...}, main: {...}, closure: {...}}
recommendedDeckIds     String[] // ordered list — drives the deck grid on the topic page
recommendedPdfDeckIds  String[]
generatedBy            String   // model identifier, e.g. "ollama:llama3.3:70b@q4"
generatedAt            DateTime
generationVersion      Int      @default(1)
@@unique([topicSlug, language])
```

**SUBSCRIPTION-SCOPE.md Pillar 1 implications:**
- Content-only library (no plan-builder; explicit lock at SUBSCRIPTION-SCOPE.md line 59). LessonPlan rows are AI-generated content artifacts, not user-edited.
- Deck-linked: `recommendedDeckIds` array carries the link.
- Per-locale rows: `@@unique([topicSlug, language])` already commits to per-locale-rows model. (Pillar 1 open decision #5 "lesson-plan localization strategy" is **resolved by §8.1's commitment** unless operator overrides.)
- Pedagogical stance encoded in `structure Json` shape — schema-shape-INDEPENDENT of the open decision; AI service can write any internal structure into the JSON.
- `generatedBy` + `generatedAt` + `generationVersion` carry provenance for re-generation when prompts/models change (per §15.3 AI service contract).
- `durationMinutes` Int — fixed-duration commitment per plan. Acceptable.

**No additional fields surfaced from SUBSCRIPTION-SCOPE.md beyond §8.1 spec.** The model is sufficient for Pillar 1 feature shape.

### Workspace family (driven by SUBSCRIPTION-SCOPE.md Pillar 3)

**§8.1 covers Tools 1, 2, partially 5 (free-tier favorites + collections + collection deck membership):**

| Pillar 3 Tool | §8.1 model coverage |
|---|---|
| Tool 1: Saved decks + collections | Collection + CollectionDeck (subscriber); DeckFavorite (free-tier flat-bookmark trigger) ✓ |
| Tool 2: My classroom workspace home | Aggregates from Collection + DeckFavorite + PlayLink + recent-activity timestamps. **No new model needed.** ✓ |
| Tool 3: Advanced personalized filtering | **NOT IN §8.1.** Saved-filter model would persist filter state. Pillar 3 names "filtering tuned to recurring teacher criteria... what you've already used, what's tagged to your Week 3 vocabulary"; persistent filters help but aren't strictly required for v1. |
| Tool 4: Curriculum mapping | **NOT IN §8.1.** Pillar 3 names "teachers tag saved decks with their own unit labels (e.g., 'my Week 3 vocabulary unit'... pull up everything tagged)." Schema would be CurriculumTag model + UserCurriculumDeckTag join. |
| Tool 5: Bulk operations | Application-layer; no schema. ✓ |
| Tool 6: Personalized feed | Deferred per SUBSCRIPTION-SCOPE.md. ✓ |

**Tools 3+4 are net-new model territory beyond §8.1.** Halt-and-surface candidate (see Step 7 disposition below). Plausible model shapes:
- **SavedFilter** `{ id, teacherId, name, filterJson, createdAt, updatedAt }` — persists filter state per-teacher.
- **CurriculumTag** `{ id, teacherId, name, color?, position, createdAt }` + **CurriculumTagDeck** `{ tagId, deckId, position, addedAt @@id([tagId, deckId]) }` — per-teacher folksonomy.

Or both could be lighter: lift to user-level JSON columns on User. SUBSCRIPTION-SCOPE.md Pillar 3 is feature-spec-not-schema-spec, so multiple shapes are valid.

**EmbedConfig disposition:** §8.1 line 388 comment says "Subscriber-only feature." SUBSCRIPTION-SCOPE.md Pillar 4 moves embed to free per §3 flywheel. Doctrine-hygiene Pass B closure note: "EmbedConfig becomes platform-infrastructure (not subscription-gated)." The MODEL still has utility (per-deck per-teacher iframe sizing + allowedOrigins) but it's **no longer subscriber-gated**. Build the model; update §8.1 comment when we touch §8.1 in a future hygiene pass.

## Pillar 2 (themed bundles) — Bundle model NOT IN §8.1

SUBSCRIPTION-SCOPE.md Pillar 2 names themed bundles (Halloween bundle, first-week bundle, numbers-1-20 German bundle) — each bundle is "a set of decks + a paired lesson plan."

§8.1 does NOT define a Bundle model. Pillar 2 needs one (bundle records linking deck IDs + a pinned LessonPlan + theme + locale + premium-flag).

**Halt-and-surface candidate.** This commission pass should either:
- Scope-OUT Bundle: defer to a Pillar 2 scope pass that adds Bundle model. The current commission pass focuses on §8.1 catalog-side scope only.
- Scope-IN Bundle: extend beyond §8.1 with a new Bundle model. Operator-authorized doctrine extension.

Recommendation: **scope-out** for this pass. Bundle deserves its own model-shape adjudication discussion before commit.

## ParentNote + EmbedConfig disposition (Step 3 question)

Doctrine-hygiene Pass B closure noted both as left-intact:
- ParentNote: documented-but-deferred per SUBSCRIPTION-SCOPE.md (parent-communication templates moved to deferred features at §7).
- EmbedConfig: reclassified as platform-infrastructure not subscription-gated.

**Question for commission pass:**
1. **ParentNote — build, skip, or build-as-documented-deferred?**
   - Build: §8.1 spec is straightforward; FK to Topic.slug; AI-generated content. Adds 1 table to the migration.
   - Skip: feature deferred → no point materializing the table now → extends §8.1 cleanup scope.
   - Build-as-documented-deferred: same as build but with a comment "feature deferred per SUBSCRIPTION-SCOPE.md; table created for forward-compatibility per §17.8.7 reservation pattern." This is consistent with the §17.8.7 `content_family_id` reservation precedent — reserve schema field/table even if feature ships in v2.
   
   **Recommendation: build-as-documented-deferred.** Matches the §17.8.7 reservation pattern; avoids a second migration when Pillar-1.5 parent-comm reactivates.

2. **EmbedConfig — comment-update during build?**
   - The §8.1 line 388 comment says "Subscriber-only feature." After SUBSCRIPTION-SCOPE.md, embed is free. The Prisma model can be created with an updated docstring reflecting platform-infrastructure status. The §8.1 prose itself (in CLAUDE.md) is doctrine-hygiene scope and stays for a separate pass.
   - Build with model-level docstring "Platform-infrastructure (not subscription-gated). Each EmbedConfig is a per-teacher per-deck iframe configuration; embedding itself is free per §3 flywheel."

## Migration cadence + FK dependency graph

### Migration naming pattern

YYYYMMDDHHMMSS-prefixed; verb-noun descriptive suffix. Recent precedents:
- `20260428220521_add_deck_table` — single new table.
- `20260430154422_add_ls_subscription_fields` — alter existing table (LS fields).
- `20260430200000_add_subscription_interest` — single new table.
- `20260501000000_drop_purchases_and_wplus_transactions` — multi-table drop.
- `20270501000000_drop_wplus_orphans` — multi-table drop.

**Pattern: 1 model = 1 migration historically.** But multi-table operations (drops, presumably also creates) are also acceptable.

### FK dependency graph (additive only — no ALTER on existing tables)

```
                                 Deck (existing)        User (existing)
                                  │                      │
       ┌──────────────┐           ↓                      ↓
       │  Topic (NEW) │───┬───→  DeckEnrichment(NEW)    Collection(NEW)
       └──────────────┘   │                              │
        ↑                 │                              ↓
        │                 │                             CollectionDeck(NEW) ←── Deck
   ┌────┴───────┐    ┌────┴────────┐
   │            │    │             │                    DeckFavorite(NEW) ←── Deck
   │ LessonPlan │   PlayLink(NEW) ←── EmbedConfig(NEW) ←── User
   │   (NEW)    │       ↓
   └────────────┘      Deck + User
   
   ParentNote(NEW) ─→ Topic
```

**Topological build order:**
1. **Topic** (no FK out)
2. **LessonPlan, ParentNote, DeckEnrichment** (depend on Topic / Deck — existing)
3. **EmbedConfig, Collection, DeckFavorite** (depend on User / Deck — existing)
4. **PlayLink** (depends on Deck + User + EmbedConfig)
5. **CollectionDeck** (depends on Collection + Deck)

**Suggested split into 3 logical migrations** (mirrors the three doctrine families):

- **Migration A: Catalog enrichment** — DeckEnrichment + Topic + LessonPlan + ParentNote (4 tables; Topic-rooted family).
- **Migration B: Player + embeds** — EmbedConfig + PlayLink (2 tables; player-side family). Subscriber-vs-free distinction inherits from §8.1's per-model commenting.
- **Migration C: Workspace** — Collection + CollectionDeck + DeckFavorite (3 tables; teacher-side family).

Single-commit-single-deploy is the §9 hard constraint. **A single 3-migration commit is acceptable** if all three migrations land in one Prisma migrate cycle. If the operator prefers 3-pass cadence, each pass = 1 migration + 1 commit + 1 deploy.

### §10.3 schema discipline check

- All 9 new models reference Deck.id / User.id via FKs. Deck and User are existing tables. **Adding a foreign key TO an existing table = additive (no SQL ALTER on the existing table).** Prisma virtual back-relations (e.g. `User.collections Collection[]`) emit no SQL.
- No DROP / RENAME / column removal on existing tables.
- No modification of existing migrations.
- §A.3 NEVER-DROP list: `users`, `ls_webhook_events`, `design_elements`, `image_library_items`. None affected.
- Compliant with §10.3 / §A.3.

### Production data risk assessment

| Existing table | Row count | Change in this commission |
|---|:---:|---|
| users | 142 | back-relations only (Prisma virtual; no SQL) |
| subscriptions | 41 | none |
| license_keys | 20 | none |
| decks | 16 | back-relations only (Prisma virtual; no SQL) |
| subscription_interest | 2 | none |

**Zero blast radius on existing data.** All migrations are CREATE TABLE only.

## Embedding-column decision-premise (Step 5)

**§16.1 specifies embedding-similarity against Topic rows.** Three places to land it:

| Option | Where embedding lives | Implication |
|---|---|---|
| A | `Topic.embedding Bytes` column (mirroring `DeckEnrichment.embedding`) | Schema-explicit; AI service generates per-topic embeddings; halt-and-surface for §8.1 spec extension. |
| B | Compute at query time from member-deck embeddings (DeckEnrichment) clustered by topic | Schema unchanged; query layer aggregates. Slow at large catalogs; OK at v1 scale. |
| C | Compute at query time by encoding the user query string and comparing against `DeckEnrichment.embedding`, bucketing by Deck.topicSlugs | Schema unchanged; the "Topic similarity" really means "decks-with-this-topic similarity." |

**§4.5 AI service tasks (line 139): "Generate embeddings for each deck's metadata."** No mention of generating per-topic embeddings. Implies B or C (deck-only embedding).

**§15.1 enrichment.json schema:** has deck-level `"embedding": [...]`. No topic-level field.

**Postgres extension:** `Bytes` type implies app-layer cosine computation (no DB-side vector index). pgvector NOT required for v1 scale (15 decks → 600 launch target). Skip pgvector decision; revisit at scale.

**§8.1 Topic spec is silent on embedding.** Halt-and-surface item: which option? Recommendation: **Option A** (Topic.embedding Bytes) for parity with DeckEnrichment + cleaner mental model. AI service then has 2 generation tasks (per-deck embeddings + per-topic embeddings) instead of 1. Adds field to §8.1 Topic spec (operator authorization needed for §8.1 schema extension).

Operator may prefer Option B/C if the AI compute budget is constrained or if Topic embeddings won't carry meaningful cross-deck signal at small catalog sizes.

## SUBSCRIPTION-SCOPE.md open-decision dependency check (Step 6)

| Open decision | Schema-shape-dependent? | Status |
|---|:---:|---|
| 1. Pedagogical stance | NO | `LessonPlan.structure Json` carries any shape; resolution affects content authoring, not schema. |
| 2. Initial library size | NO | Volume question. |
| 3. Lesson-plan localization strategy | RESOLVED-BY-§8.1 | `@@unique([topicSlug, language])` commits to per-locale rows. Operator can override but spec is opinionated. |
| 4. Bundle pricing structure | YES (Pillar 2 scope) | Pillar 2 schema not in §8.1; bundle pricing affects Bundle model shape (bundle-with-priceField vs all-included-in-subscription). **Out of this pass's scope per recommendation.** |
| 5. Workspace tooling implementation order | NO | Sequencing question; doesn't gate model commission. |

**No open decision blocks the commission of Topic + LessonPlan + workspace family models.** Pillar 2 (bundles) is the only schema-shape-impacted open decision and is recommended out-of-scope.

## Halt-and-surface findings

### H1 — Embedding column for Topic (specification gap)

§16.1 prose requires embedding-similarity against Topic rows. §8.1 Topic model has no embedding column. §4.5 AI service does not currently mandate per-topic embedding generation. Three options surfaced (Step 5); recommendation Option A. **Operator decision needed before commission.**

### H2 — Tools 3+4 (advanced filtering + curriculum mapping) — schema scope

§8.1 covers Pillar 3 Tools 1, 2, 5, 6 cleanly. Tools 3+4 are net-new model territory not in §8.1. Two options: scope-out (commission pass covers §8.1 only; Tools 3+4 deferred to a follow-on subscription-features pass) OR scope-in (extend the commission pass to include net-new SavedFilter + CurriculumTag models). **Operator decision needed.**

### H3 — Bundle model (Pillar 2 scope)

§8.1 silent on Bundle. Pillar 2 needs one. Recommendation: **scope-out** for this pass; defer to a Pillar 2 scope pass that adjudicates Bundle model shape + open decision #4 (bundle pricing structure) together.

### H4 — ParentNote disposition

Build (per §8.1 + reserve forward-compatibility per §17.8.7 pattern) vs skip (per SUBSCRIPTION-SCOPE.md feature deferral). Recommendation: **build-as-documented-deferred** with a comment explaining the deferred feature status.

### H5 — EmbedConfig comment update

§8.1 says "subscriber-only"; SUBSCRIPTION-SCOPE.md says embed is free. Recommendation: **build with updated model-level docstring** marking it as platform-infrastructure. §8.1 prose update is doctrine-hygiene scope; defer to that pass.

## Out-of-scope guardrails (re-stated)

This recon does NOT touch:
- Existing tables: users, subscriptions, license_keys, Deck, Subscription model schema, any other extant table.
- Existing migrations.
- Auth flows, Lemon Squeezy integration, AI service interface, publish-cli.
- Application-layer code (no API routes, no Prisma queries authored).

## Summary table for plan-pass adjudication

| Concern | State | Recommended commission scope |
|---|---|---|
| Topic family | 1 model (+ embedding column TBD per H1) | Build (with H1 resolved) |
| LessonPlan family | 1 model | Build |
| ParentNote (deferred feature) | spec-complete in §8.1 | Build-as-documented-deferred (H4) |
| DeckEnrichment | 1 model | Build |
| PlayLink + EmbedConfig | 2 models (EmbedConfig with updated docstring per H5) | Build |
| Collection + CollectionDeck + DeckFavorite | 3 models | Build |
| Pillar 3 Tools 3+4 (SavedFilter + CurriculumTag) | not in §8.1 | Defer per H2 (recommendation) |
| Pillar 2 Bundle | not in §8.1 | Defer per H3 (recommendation) |

**If H1, H2, H3, H4, H5 resolve as recommended:** 9 new tables (DeckEnrichment, Topic, LessonPlan, ParentNote, EmbedConfig, PlayLink, Collection, CollectionDeck, DeckFavorite) commissioned in a single pass via 3 logical migrations or 1 multi-table migration.

**Pre-existing dirty working tree (~890 entries) untouched throughout.**
