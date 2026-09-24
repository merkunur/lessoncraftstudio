---
name: Pillar 1 lesson-plan authoring arc — recon
description: Recon-only artifact for Pillar 1 launch-trigger-gating arc. 5 strategic questions surfaced for operator review before commission.
type: project
originSessionId: de342ceb-c0c5-463a-8cea-62f861933fc9
---
# Pillar 1 Lesson-Plan Authoring Arc — RECON v1

**Status:** ⏸ AWAITING OPERATOR REVIEW. No implementation, no commits.
**Apply:** in follow-up commission prompt after operator answers Q1–Q5 + confirms A1–A3.
**Branch:** `pivot/printable-business-toolkit` (HEAD `b57e26f7` — doctrine pass).

---

## Strategic questions for operator (Q1–Q5)

1. **Q1 — Reader surface route shape.** `/[locale]/lesson-plans/[topicSlug]/` standalone vs deck-anchored at `/[locale]/decks/[deckSlug]/lesson-plan/` vs topic-anchored inline at `/[locale]/topic/[topicSlug]/` vs hybrid (multiple entry points to the same plan content).
2. **Q2 — Authoring tooling shape (THE central question).** Manual / CMS / AI-assisted via Mac Studio. **Major recon finding:** schema biases strongly toward AI-assisted (`LessonPlan.generatedBy` is a model identifier; `structure: Json` carries CLIL framework as nested JSON). **But:** Mac Studio infrastructure is NOT yet built (`/api/ai-ingest/` endpoints absent; mac-studio-service/ scripts don't exist in repo). Shape (c) requires a Mac Studio infrastructure prerequisite arc before lesson-plan authoring can use AI assistance.
3. **Q3 — CLIL template per-locale variation.** Constant template across en+de+es+nl vs locale-weighted sections.
4. **Q4 — Plan length target.** Short (200-300 words / 1 page) vs medium (500-700 words / 2 pages) vs long (1000+ words / 3+ pages).
5. **Q5 — Authoring volume cadence.** N plans/week + how many commits per batch (mirror Tier-2 Track-C 4/4/4/4/4/2/7 cadence vs different shape).

---

## Copilot-adjudicated technical-architecture calls (A1–A3)

These are not surfaced as questions; reasoning recorded inline:

### A1 — Component shape: extend WorkspaceClient pattern; new LessonPlanReader component subscriber-gated
- Reuse `lib/subscriber-api-gate.ts` (Tool 1A pattern explicitly anticipates Pillar 1 inheritance per the file's leading comment)
- New client component renders `LessonPlan.structure` JSON payload; server component wraps with `requireSubscriber` gate
- Mirror `WorkspaceClient` / `CollectionDetailClient` pattern: server fetch → client render

### A2 — Topic-page integration: axis-driven at launch; cross-product (embedding) post-launch
- Axis-driven: query `LessonPlan` by `(topicSlug, locale)` where `topicSlug` matches the topic-page's axis-key. Launch-feasible.
- Cross-product (embedding-driven): requires `Topic.embedding` populated, which requires Mac Studio AI service to be running. Post-launch enhancement.
- Topic page currently uses `fetchDecksForAxis` from `@/lib/topic-decks` (taxonomy-json-driven, NOT Topic-table-driven). Lesson-plan integration extends that consumer with a parallel `fetchLessonPlanForTopic(topicSlug, locale)` query.

### A3 — Schema sufficient as-is per `9ba9fa2d`; no new migrations expected at launch
- LessonPlan + Topic + ParentNote all present; LessonPlan structure JSON accommodates CLIL framework
- ParentNote reserved per session-state §10; not in Pillar 1 scope
- One subtle ambiguity (recon flag, not blocker): see "Schema ambiguity" below

---

## Recon findings (1.x – 6.x)

### Step 1 — Schema substrate audit

**1.1 LessonPlan model (frontend/prisma/schema.prisma:1238):**

```prisma
model LessonPlan {
  id                    String   @id @default(cuid())
  topicSlug             String   @map("topic_slug")
  language              String
  durationMinutes       Int      @map("duration_minutes")
  structure             Json
  recommendedDeckIds    String[] @default([]) @map("recommended_deck_ids")
  recommendedPdfDeckIds String[] @default([]) @map("recommended_pdf_deck_ids")
  generatedBy           String   @map("generated_by")
  generatedAt           DateTime @default(now()) @map("generated_at")
  generationVersion     Int      @default(1) @map("generation_version")
  topic Topic @relation(fields: [topicSlug], references: [slug], onDelete: Cascade)
  @@unique([topicSlug, language])
  @@map("lesson_plans")
}
```

**Divergences from brief expectation:**
- No `title`, `slug`, `body` fields. Instead: `structure: Json` carries the entire CLIL framework as nested JSON.
- `generatedBy` field is a model identifier (e.g., `ollama:llama3.3:70b@q4`) per CLAUDE.md §15.1 reference.
- `recommendedDeckIds` + `recommendedPdfDeckIds` arrays surface the deck-anchoring model — a plan recommends specific decks within its topic.
- ID is cuid(); plans are addressed via `(topicSlug, language)` compound unique constraint, not via slug.

**Implication for Q2:** schema was commissioned with AI-generation as the canonical authoring shape. Manual authoring (shape a) still works (operator/CC writes JSON content + INSERT) but `generatedBy` semantics expect a model identifier; using `manual` or `operator` as the value works mechanically but signals a non-canonical authoring path.

**1.2 Topic model (frontend/prisma/schema.prisma:1212):**

```prisma
model Topic {
  slug           String   @id
  title          Json
  description    Json
  subject        String
  ageRange       String   @map("age_range")
  language       String
  curriculumTags String[] @default([]) @map("curriculum_tags")
  parentSlug     String?  @map("parent_slug")
  isHighPriority Boolean  @default(false) @map("is_high_priority")
  embedding      Bytes?
  ...
  lessonPlans LessonPlan[]
  parentNotes ParentNote[]
}
```

**Schema ambiguity (worth surfacing):** `Topic.slug` is `@id` (single primary key), but slug values in topics-taxonomy.json are per-locale (e.g., `peuterklas` is nl-only; en uses `preschool`). This means each Topic row is naturally per-locale. The `Topic.language` field is then redundant with the slug's locale-implied language. AND: `LessonPlan.@@unique([topicSlug, language])` allows multiple plans per Topic if language varies — but with per-locale slugs, this can't be exercised meaningfully.

Resolution path (recon hypothesis; not blocking): `Topic.title` and `Topic.description` are `Json` (per-locale string maps `{en: ..., de: ..., es: ..., nl: ...}`). Maybe the intent was `Topic.slug` to be English-canonical (locale-agnostic) and `Topic.language` to specify which locale's title/description is loaded. This would conflict with topics-taxonomy.json's per-locale slug shape.

**Recommend: surface as recon-flag for operator clarification.** Either:
- (a) Topic.slug stays per-locale (status quo of taxonomy-json); Topic.language drops to derived from slug; LessonPlan.@@unique([topicSlug, language]) becomes effectively LessonPlan.@@unique([topicSlug]) with language redundant
- (b) Topic.slug becomes English-canonical; per-locale title/description in Json; LessonPlan.@@unique([topicSlug, language]) preserves cross-locale plans on a shared canonical topic
- (c) Schema-as-is (locale-asymmetric — Topic.slug per-locale + LessonPlan.language allows over-shooting)

Schema-as-is (option c) works for Pillar 1 launch without resolving the ambiguity. **Not a blocker.**

**1.3 ParentNote model (1262-1275):** reserved per session-state §10; v2 reactivation per CLAUDE.md §17.8.7. Not in Pillar 1 scope. Schema present; zero rows.

**1.4 Migrations:**
- `20260502104623_catalog_enrichment_models` — Topic + LessonPlan + ParentNote (3 tables)
- `20260502104624_player_embeds_models` — EmbedConfig + PlayLink (2 tables)
- `20260502104625_workspace_models` — Collection + DeckFavorite + ... (workspace tables)

Migration sequence clean. Maps to `9ba9fa2d` 9-tables-across-3-migrations commission per session-state §6.

**1.5 Production row counts:**
| Table | Rows |
|---|---:|
| topics | **0** |
| lesson_plans | 0 |
| parent_notes | 0 |
| collections | 0 |
| deck_favorites | 0 |
| embed_configs | 0 |
| play_links | 0 |

**Major recon finding:** `topics: 0`. The taxonomy currently lives entirely in `frontend/config/topics-taxonomy.json` (file-based); the `topics` table substrate exists but is empty. Pillar 1 has an implicit prerequisite — Topic table seeding from topics-taxonomy.json — because LessonPlan.topicSlug is FK to Topic.slug.

**Topic seeding scope:**
- exercise-type axes: 29 axis-keys × 4 locales = 116 Topic rows (full coverage of Tier 2 catalog)
- theme axes: 4 themes × 4 locales = 16 Topic rows (8 with-content per current usage)
- educational-level axes: 5 levels × 4 locales = 20 Topic rows (16 with-content; grade-3 unused per CLAUDE.md §17.8.6)
- **Total max:** 152 Topic rows. **With-content:** ~140.

This is its own one-time commission (1 commit; seed script + INSERT). Not technically blocking Q1–Q5 strategic decisions but commission-ordering-relevant.

### Step 2 — Subscriber reader surface recon

**2.1 Existing routes under `/[locale]/`:** apps, auth, collections, contact, dashboard, license, privacy, terms, topic, workspace + a few system routes. No `lesson-plans/` route exists.

**Candidate route shapes for Q1:**

| Shape | Route | Pros | Cons |
|---|---|---|---|
| Standalone | `/[locale]/lesson-plans/[topicSlug]/` | Clean URL semantics; SEO-friendly; mirrors CMS pattern; "library" framing for plan discovery | Detached from deck context; user must navigate from index to find the plan they want |
| Deck-anchored | `/[locale]/decks/[deckSlug]/lesson-plan/` | Plan is contextually anchored to the deck; matches "I'm using this deck — what's the plan?" workflow; simple URL | Multiple plans may apply to a single deck (deck → topic → plans for that topic); ambiguous which plan to render |
| Topic-anchored | `/[locale]/topic/[topicSlug]/` (inline section) | Plan rendered in the context of decks at that topic; subscriber sees plan + decks together; matches K-3 dual-language workflow ("I'm planning a topic — what plan + decks?"); leverages existing topic-page renderer | Requires gating one section of an otherwise-public page; UX must clearly show plan-is-subscriber-gated; plan body can be long → page becomes scroll-heavy |
| Hybrid | All three with consistent canonical | Maximum surface coverage; multiple entry points for different educator workflows | Most engineering work; risk of duplicated rendering logic |

**Copilot lean (not adjudicated; awaiting operator):** topic-anchored is closest to the persona's actual workflow ("I'm planning a topic"). Standalone provides discovery URL for SEO + sharing. Deck-anchored has the plan-per-deck ambiguity problem because lesson plans are per-topic, not per-deck.

**Recommendation if operator splits the difference:** ship topic-anchored at launch + add standalone in a follow-up commission for SEO/discovery; deck-anchored skip.

**2.2 Component shape (A1 adjudication):** extend WorkspaceClient pattern. New `LessonPlanReader` component (client). Server component wraps with `requireSubscriber` gate. Mirror `CollectionDetailClient` pattern: server fetch → client render.

**2.3 Subscriber-API gate:** `frontend/lib/subscriber-api-gate.ts` precedent applies. `requireSubscriber()` function at the top of `lib/subscriber-api-gate.ts` returns either NextResponse error (401/403) or `{userId, user}` context. Comment explicitly anticipates "Pillar 1 (lesson plan content) + Pillar 2 (bundles) inherit per project_pillar3_tool1_collections_recon.md HAS-3". No new gate infrastructure.

### Step 3 — Authoring tooling recon (Q2 territory)

**3.1 Three candidate shapes:**

#### Shape (a) — Manual authoring (markdown + commit OR direct DB INSERT)
- **How:** copilot/operator authors lesson plans as markdown OR JSON files; seed script transforms + INSERTs LessonPlan rows
- **Pros:** zero infrastructure cost; immediate; matches deck-creation operator-authoring pattern; canonical pedagogical content; per-plan operator-curated quality
- **Cons:** 116 plans × ~30-60 min/plan = 60-120 hours of authoring effort; not parallelizable across operator/copilot; burnout-territory at full-scope; doesn't leverage schema's AI-shape

#### Shape (b) — CMS-style admin UI
- **How:** build subscriber-only admin route at `/admin/lesson-plans/` with rich-text editor + per-section CLIL template form; persist directly to lesson_plans table
- **Pros:** lower per-plan effort (10-20 min/plan with template + autosave); no markdown intermediary; non-technical authoring path
- **Cons:** infrastructure cost — admin route + auth gate (admin-only, NOT subscriber-only) + per-section form fields + autosave; ~3-5 commits to ship the admin UI; benefit only realized over the 116-plan authoring effort

#### Shape (c) — AI-assisted via Mac Studio
- **How:** Mac Studio Ollama LLM generates first-draft plans against (deck metadata + CLIL doctrine + per-locale register prompt) → operator reviews/edits → commits
- **Pros:** lowest per-plan effort at scale; unlocks Tier-3+ catalog without proportional authoring scaling; matches schema's `generatedBy` field intent; per CLAUDE.md §15.1 reference example
- **Cons:** **infrastructure prerequisite is its own arc.** Mac Studio is not yet configured per recon findings:
  - `/api/ai-ingest/pending` + `/api/ai-ingest/complete` endpoints **do NOT exist** in `frontend/app/api/`
  - `mac-studio-service/` scripts (per CLAUDE.md §8.2 file organization) **not in repo** (would deploy to Mac Studio separately)
  - Mac Studio Ollama install + Tailscale + auth + AI_INGEST_SHARED_SECRET env var (per CLAUDE.md §A.9) — operator-side configuration
  - Prompt template authoring + iteration cycle (likely 5-10 commits to land the prompt + first-batch quality)
  
  Net: shape (c) requires a Mac Studio infrastructure prerequisite arc (~10-15 commits) before lesson-plan authoring can use AI assistance.

**3.2 Mac Studio configuration state:**

Per CLAUDE.md §15.3 contract:
- Endpoints `/api/ai-ingest/pending` (GET) + `/api/ai-ingest/complete` (POST) on Hetzner — **NOT BUILT**
- Mac Studio service polls Hetzner; Hetzner never calls Mac Studio (per §A.9)
- Auth via `AI_INGEST_SHARED_SECRET` env var on both machines

The schema substrate (LessonPlan + Topic.embedding) is ready for AI ingest, but the API surface + Mac Studio worker scripts + prompt templates are all greenfield.

**Operator-strategic implications for Q2:**

- (a) Manual authoring is **viable today**, immediate, slow per-plan, no infra prerequisite
- (b) CMS-style admin UI is **viable today**, ~3-5 commits to ship admin UI + faster per-plan authoring after, no Mac Studio dependency
- (c) AI-assisted is **not viable today**; requires ~10-15 commits Mac Studio infrastructure arc before lesson-plan authoring; but unlocks scale-economic authoring for Tier-3+ launches

**Hybrid options worth surfacing:**

- **(a+b)** start manual; ship admin UI in parallel as separate arc; switch authoring tool partway through 116-plan run
- **(a→c)** start manual for first 20-30 plans (Tier 1 en+de canonical reference set); commission Mac Studio infra arc; switch to AI-assisted for remaining 90 plans + Tier 3+ scope. Operator's reference set + CLIL doctrine seeds the AI prompt templates.
- **(c)** all-in on Mac Studio commission — block Pillar 1 authoring on Mac Studio infrastructure shipping first

### Step 4 — CLIL pedagogical structure recon

**4.1 CLIL template (per `fbff3466` Decision 1):**

```
Warmup (3-5 min)              activate prior knowledge; introduce theme
                              without target language
↓
Content-language activity     deck play; teacher narrates + students respond
(10-15 min)                   in target language scaffolded by visuals
↓
Language scaffold + practice  vocabulary reinforcement; sentence frames;
(10-15 min)                   pair/group practice
↓
Closure (3-5 min)             output check; transfer-to-next-lesson cue
```

**Total plan duration:** 26-40 minutes (typical K-3 lesson length).

**LessonPlan.structure JSON candidate shape:**
```json
{
  "warmup": { "durationMinutes": 5, "activity": "...", "materials": ["..."] },
  "main":   { "durationMinutes": 15, "activity": "...", "deck": "<deckSlug>", "narration": "..." },
  "scaffold": { "durationMinutes": 10, "activity": "...", "vocabulary": ["..."], "sentenceFrames": ["..."] },
  "closure": { "durationMinutes": 5, "activity": "...", "outputCheck": "..." },
  "learningObjectives": ["..."],
  "preparation": ["..."]
}
```

**4.2 Per-locale variation (Q3):** does template stay constant across en+de+es+nl OR locale-weighted?
- Constant: easier to author + maintain; cross-locale parity for K-3 dual-language pedagogy; matches per-locale-rows-not-translations principle (each locale authored natively)
- Locale-weighted: nl + de classroom norms differ from es + en (e.g., Dutch K-3 typically uses shorter modules; Spanish dual-language often runs longer language-scaffold sections). Could be 25/35/25/15 vs 20/30/30/20.

**Copilot lean:** constant template across locales; per-locale variation lives in *content* not *structure*. Authors adjust durations/emphasis within the constant 4-section frame per their classroom realities.

**4.3 Plan length target (Q4):**

| Length | Words | Pages | 116-plan total scope |
|---|---|---|---|
| Short | 200-300 | 1 page printable | 23K-35K words; 30-40 hours authoring |
| Medium | 500-700 | 2 pages | 60K-80K words; 60-90 hours authoring |
| Long | 1000+ | 3+ pages | 116K+ words; 120-180+ hours authoring |

**Persona consideration:** K-3 dual-language educator wants quick-glance + actionable. Long-form risks abandonment ("too much to read on Sunday night"). Short-form may underspecify the activity scaffolds that distinguish K-3 dual-language from generic K-3.

**Copilot lean:** medium-form (500-700 words). Tight enough to skim before class; rich enough to actually run the lesson without supplementing.

### Step 5 — Topic-page integration recon

**5.1 Topic-page consumer (frontend/app/[locale]/topic/[slug]/page.tsx):**
- Currently uses `fetchDecksForAxis` from `@/lib/topic-decks` — driven by topics-taxonomy.json + Deck table
- Does NOT consume `LessonPlan` or `Topic` table
- Implementing axis-driven lesson-plan integration: add `fetchLessonPlanForTopic(topicSlug, locale)` parallel query; render below deck list when subscriber + plan exists
- Topic table row required for FK target — Topic seeding prerequisite (1.5 finding)

**Topic.embedding has 0 consumers.** Cross-product topic pages haven't been built; embedding column is reserved per CLAUDE.md §16.1 embedding-similarity topic resolution. **Cross-product (embedding-driven) integration is downstream**, requires Mac Studio AI service running for embedding generation.

**A2 adjudication:** axis-driven at launch; cross-product post-launch.

### Step 6 — Launch-trigger sequencing recon

**6.1 Status:**
- Schema commissioned ✓ (`9ba9fa2d`)
- Pillar 3 Tools 1+2+5 ✓ (Wave 2 commits)
- Catalog at full C-1 across en+de+es+nl ✓ (`d3b4f962`)
- Doctrine pass ✓ (`b57e26f7`)
- → **Pillar 1 reader surface + authoring tooling + first plans authored** ← THIS ARC
- → Pillar 2 bundle commission + first bundles authored
- → Launch-trigger flip

**6.2 Pillar 1 forecast commit shape (depends on Q1–Q5 answers):**

Minimum viable arc (manual authoring + topic-anchored reader):
- Commit 1: Topic table seed (script + 152 INSERTs from topics-taxonomy.json)
- Commit 2: Reader surface — topic-page integration (new `lib/lesson-plans.ts` query helper + LessonPlanReader client component + topic-page render extension + subscriber-gate)
- Commit 3: Standalone reader at `/[locale]/lesson-plans/[topicSlug]/` (if Q1=hybrid)
- Commits 4-N: lesson-plan authoring batches at operator-chosen cadence (Q5)

Full-scale arc with Mac Studio (Q2=c):
- Commits 1-2 same as above
- Commit 3+: Mac Studio infrastructure arc (10-15 commits) — `/api/ai-ingest/` endpoints + worker scripts + AI_INGEST_SHARED_SECRET + prompt templates + first AI-generated batch
- Commits 18+: AI-assisted authoring of remaining 90 plans

**6.3 Pillar 1 commit volume forecast:** 4-8 commits (manual) up to 30+ commits (AI-assisted full arc with Mac Studio infra prerequisite). Tier 2 arc was 14 commits; Pillar 1 likely longer if Q2=(c).

---

## Apply checklist (for follow-up commission, post Q1–Q5 answered)

Do NOT execute now. For the apply commission:

1. **Topic table seed** — script that reads topics-taxonomy.json + INSERTs Topic rows (152 max). Single commit. Pre-Pillar-1.
2. **Reader surface commission** — per Q1 outcome:
   - Topic-anchored: extend `/[locale]/topic/[slug]/page.tsx` + new `lib/lesson-plans.ts` + `LessonPlanReader` component + subscriber-gate
   - Standalone: new `/[locale]/lesson-plans/[topicSlug]/` route (if hybrid)
   - Deck-anchored: skip per A1 adjudication
3. **Per Q2 outcome:**
   - (a) Begin manual authoring; cadence per Q5
   - (b) Ship admin UI commission (3-5 commits) → resume manual authoring
   - (c) Ship Mac Studio infrastructure prerequisite arc (10-15 commits) → AI-assisted authoring
4. **Per Q3 outcome:**
   - Constant CLIL template: bake into LessonPlan.structure JSON shape lock
   - Locale-weighted: per-locale section-duration defaults
5. **Per Q4 outcome:** authoring scope per plan length target; informs cadence per Q5
6. **Per Q5 outcome:** commit cadence + batch-size rule of thumb
7. **NO Section 2 grid touch** — Pillar 1 doesn't change home page composition
8. **NO Footer touch** — Pillar 1 doesn't add new axis-keys
9. **NO `[DOCS]` bypass** — Pillar 1 commits are real code + content commits; full pre-commit hygiene applies

---

## Halt-and-surface to operator

**Artifact path:** `C:\Users\rkgen\.claude\projects\C--Users-rkgen-lessoncraftstudio\memory\project_pillar1_lesson_plans_recon.md`

**Strategic questions (Q1–Q5):**

| # | Question | Default lean | Alternatives |
|---|---|---|---|
| Q1 | Reader surface route shape | Topic-anchored at launch + standalone for SEO follow-up | Deck-anchored / hybrid all three |
| Q2 | **Authoring tooling shape** (THE central question) | (a+c) hybrid: manual for first ~20-30 plans (Tier 1 reference set + seed AI prompts); commission Mac Studio infra mid-arc; AI-assisted for remaining 90 plans + Tier-3+ scope | (a) all-manual / (b) CMS-style admin / (c) all-in-Mac-Studio (commission infra first) |
| Q3 | CLIL template per-locale variation | Constant template; per-locale variation in content not structure | Locale-weighted section durations |
| Q4 | Plan length target | Medium (500-700 words / 2 pages) | Short / Long |
| Q5 | Authoring volume cadence | TBD per Q2 outcome (manual = 4-6/week; AI-assisted = 10-15/week with review) | Operator-defined |

**Technical adjudications recorded (A1–A3):**
- A1: extend WorkspaceClient pattern; new LessonPlanReader subscriber-gated component
- A2: axis-driven topic-page integration at launch; cross-product (embedding) post-launch
- A3: schema sufficient as-is per `9ba9fa2d`; no new migrations expected at launch

**Recon flags worth surfacing:**

1. **Major:** `topics: 0` rows. Topic seed prerequisite (one-commit pre-arc step).
2. **Major:** `/api/ai-ingest/` endpoints absent. Mac Studio shape (c) requires infrastructure prerequisite arc (~10-15 commits) before AI-assisted authoring is usable.
3. **Subtle:** Topic schema ambiguity — per-locale slug vs locale-agnostic + Json title/description. Not blocking; surface for operator clarification only.

**Operator response options:**
- "Approve with: Q1=topic-anchored, Q2=a+c hybrid, Q3=constant, Q4=medium, Q5=4-6/week" → commission prompt drafted with adjudications baked in
- "Revise: Q2 is all-manual; skip Mac Studio entirely" → produce v2 recon with revised scope
- "Pause" → defer
