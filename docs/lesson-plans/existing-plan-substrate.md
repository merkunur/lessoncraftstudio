# Phase 1 audit — Existing clause-a lesson plan substrate

**Audit scope:** the existing Pillar 1 LessonPlan substrate that ships per `9ba9fa2d` (model sealed) and `e912b805` (Phase 1c apply, first plans seeded). This audit informs the architectural decision in §7: the new "teaching package" schema either extends LessonPlan or supersedes it with a sibling table.

## 1. Reconciled draft state

**Drafts on disk** at `lesson-plan-drafts/<locale>/<topicSlug>.md` (single locale per file):

| Locale | Count | Topic slugs |
|---|---|---|
| en | 7 | addition, code-addition, math-puzzle, math-worksheet, more-less, subtraction, sudoku |
| de | 2 | addition, sudoku |
| es | 5 | code-addition, math-puzzle, math-worksheet, more-less, subtraction |
| nl | 0 | — |
| **Total** | **14** | |

**CLAUDE.md §13 cites "29 of 156 text plans shipped"** — the operator's commission directive likewise references "29/156 text-plan progress." The 14-on-disk count is not the same as the 29-shipped claim. Possible explanations:

1. Additional plans were seeded to DB pre-Phase-1c-apply but their `.md` source drafts were removed (data lives in `lesson_plans` rows but the authoring source is gone)
2. Documentation drift — the §13/§17.9 figures are stale relative to the working state
3. Plans for non-en+de+es+nl locales (it/fr/pt/sv/da/no/fi) shipped via a different path that didn't land in `lesson-plan-drafts/`

**Resolution recommended (Phase 1 surface gate item):** operator runs `SELECT topicSlug, language, COUNT(*) FROM lesson_plans GROUP BY topicSlug, language` against production DB at the surface gate to reconcile the actual ship-state. The current arc proceeds on the assumption that 14 drafts is the upper bound of authored material; if DB count is higher, the additional rows are legacy artifacts whose source needs to be recovered or re-authored later.

**Audit posture:** the gap doesn't block Arc 1. Phase 4 first authored package keys on a NEW pedagogical-target taxonomy, not the existing axis-keys. The 14 (or 29) existing plans stay as legacy artifacts per commission scope.

## 2. LessonPlan + Topic Prisma model — confirmed shape

`frontend/prisma/schema.prisma` matches CLAUDE.md §8.1 verbatim. No drift.

```prisma
model Topic {
  slug           String   @id                            // English-canonical axis-key
  title          Json                                     // {en,de,es,nl,...}
  description    Json
  subject        String                                   // math|logic|letters|spatial-reasoning
  ageRange       String   @map("age_range")              // 3-5|5-7|6-8|7-9|8-10
  language       String                                   // always "en" (canonical primary)
  curriculumTags String[] @default([])
  parentSlug     String?  @map("parent_slug")
  isHighPriority Boolean  @default(false)
  embedding      Bytes?                                   // null at seed; Mac Studio §4.5 deferred
  createdAt      DateTime @default(now())
  updatedAt      DateTime @updatedAt

  lessonPlans LessonPlan[]
  parentNotes ParentNote[]

  @@index([subject, language])
  @@map("topics")
}

model LessonPlan {
  id                    String   @id @default(cuid())
  topicSlug             String   @map("topic_slug")        // FK to Topic.slug (axis-key)
  language              String                              // one of {en,de,es,nl,...}
  durationMinutes       Int      @map("duration_minutes")
  structure             Json                               // {title, warmup, contentActivity, scaffold, closure}
  recommendedDeckIds    String[] @default([])
  recommendedPdfDeckIds String[] @default([])
  generatedBy           String   @map("generated_by")
  generatedAt           DateTime @default(now())
  generationVersion     Int      @default(1)

  topic             Topic                @relation(fields: [topicSlug], references: [slug], onDelete: Cascade)
  bundleMemberships BundleLessonPlan[]

  @@unique([topicSlug, language])
  @@map("lesson_plans")
}
```

**Topic table state:** 39 rows seeded (29 exercise-type axis-keys + 4 theme + 5 educational-level). Slug is ALWAYS the English-canonical axis-key (never a per-locale slug). `language` field is always `"en"` — the per-locale slug rendering for URLs happens via the `resolveTopicSlug` helper that maps per-locale slugs back to canonical axis-keys via `topics-taxonomy.json axes.<axis>.<axisKey>.slug.<locale>`.

**`@@unique([topicSlug, language])`** enforces one plan per (topic-axis-key, locale). 14 drafts × 4 locales would max at 56 rows; 39 axes × 11 locales would max at 429 rows.

**Sibling models referencing LessonPlan:** `BundleLessonPlan` (M2M to Bundle, Pillar 2 reservation, zero rows at Pillar 1).

## 3. seed-lesson-plans.js shape

`frontend/scripts/seed-lesson-plans.js` parses Markdown + YAML frontmatter:

**Required frontmatter fields:**
- `topicSlug` — validated against existing `Topic.slug` rows (error if Topic table empty)
- `language` — validated against `VALID_LOCALES` (11-locale set per §6)
- `durationMinutes: { warmup, contentActivity, scaffold, closure }` — total must be > 0
- (optional) `title`, `recommendedDeckIds`, `recommendedPdfDeckIds`

**Required markdown sections (4 H2 headings, regex-matched across 11 locales):**
- `## Warmup` (or locale variant)
- `## Content-language activity` (or locale variant)
- `## Language scaffold and practice` (or locale variant)
- `## Closure` (or locale variant)

**Validation logic:**
- Pre-flight collision check: any existing `(topicSlug, language)` row → fatal abort (no upsert)
- All 4 CLIL sections must be present and non-empty
- Prisma 6.x requires `{ set: [...] }` for `String[]` on `create()`
- Dry-run by default; `--confirm` flag required for INSERT

**Doctrine carry from §17.9:** schema-authority-over-commission-spec lessons hardened the parser; future seed scripts should fail loudly on schema-vs-frontmatter type mismatches.

## 4. Reader UI shape

**Subscription-gated client component** (`frontend/components/lesson-plans/LessonPlanReader.tsx`):

- Auth check: signed-out → "Sign in to read" prompt; signed-in but unsubscribed → "Subscribe to unlock" prompt; subscribed → fetch + render
- Fields consumed from `LessonPlan`: `id`, `topicSlug`, `language`, `durationMinutes`, structure-derived `title` and 4-section `sections`, `recommendedDeckIds`, `recommendedPdfDeckIds`
- Render: header + 4 Section components (warmup / contentActivity / scaffold / closure), each with duration label + `whitespace-pre-wrap` body
- Print-friendly CSS (`@media print` blocks chrome)

**API route** (`frontend/app/api/lesson-plans/[slug]/route.ts`):

- `requireSubscriber(request)` middleware returns 403 if not subscribed
- Per-locale slug → English-canonical axis-key resolution via `resolveTopicSlug(slug, language)`
- Compound unique key lookup: `findUnique({ where: { topicSlug_language: { topicSlug, language } } })`
- Returns `{ plan: { id, topicSlug, language, durationMinutes, title, sections: {warmup, contentActivity, scaffold, closure}, recommendedDeckIds, recommendedPdfDeckIds, generatedAt } }`

**Page route** (`frontend/app/[locale]/lesson-plans/[slug]/page.tsx`): server-side metadata (`robots.noindex=true`); client-component render.

## 5. i18n chrome — `lessonPlanReader` namespace

Full key set in `messages/en.json`:

- `metadata.{title, description}` — page-level head metadata
- `loading`, `errorGeneric`, `notFoundTitle`, `notFoundBody`
- `totalDuration`, `sectionDuration` — ICU `{minutes}` interpolation
- `section.{warmup, contentActivity, scaffold, closure}` — section heading labels
- `gate.{subscribePromptTitle, subscribePromptBody, subscribeCta, signInPromptTitle, signInPromptBody, signInCta}` — auth/subscription gating UI
- `topicReference.{heading, duration, readFullCta}` — pre-positioned for future topic destination page integration (not yet wired)

## 6. Existing plan content sample (en/addition.md)

Structural shape: 4-section CLIL template (warmup 4 min / content-activity 12 min / scaffold 9 min / closure 5 min = 30 min total). Language register is **warm, second-person imperative, classroom-teacher advice** ("Gather the children on the carpet. Hold up two animal flashcards..."). Concrete vocab: animals (cats/dogs/birds/fish), small numerals (1-7), tightly-controlled syntax frames ("___ animals and ___ animals are ___ animals"). Pedagogical stance: CLIL with explicit focus on language acquisition through content. K-3 appropriate per §17.9 discipline (constructive register, no metalinguistic jargon, concrete-sensorial activities, realistic pacing).

## 7. Two-keying-space surface — the architectural decision

The existing `LessonPlan.topicSlug` keys on `topics-taxonomy.json` **axis-keys** — keys like `addition`, `sudoku`, `kindergarten`, `animals`. These describe:
- Worksheet **mechanics** (the kid's interaction shape)
- **Themes** (visual/lexical context)
- **Educational levels** (age-band targeting)

The new teaching-package architecture keys on **pedagogical learning targets** — keys like:
- `count-quantities-to-10-with-objects`
- `identify-and-name-10-farm-animals`
- `add-two-single-digit-numbers-with-sum-less-than-10`
- `recognize-rhyming-words-cvc-pattern`

These describe:
- The specific **skill or conceptual milestone** the child should demonstrate
- The **curriculum standard** addressed (CCSS, EYFS, etc.)
- The **evidence** the teacher collects to validate mastery

These are **orthogonal keying spaces.** A teaching package keyed on `count-quantities-to-10` might use the `more-less` mechanic + `animals` theme + `kindergarten` level — but the package is *not a plan FOR the more-less mechanic*. It's a bundle FOR a learning outcome that uses more-less as one composed tool.

### Option A — Extend LessonPlan (REJECTED)

Add `pedagogicalTargetSlug?` (nullable), `curriculumStandards`, `assessmentCriteria`, etc. Replace `@@unique([topicSlug, language])` with OR-logic.

**Why rejected:**
- **Semantic pollution.** A row with `topicSlug="addition"` AND `pedagogicalTargetSlug="count-quantities-to-10"` conflates two axes. Code consumers must defensively branch on which key is set.
- **Schema ambiguity.** Is a LessonPlan FOR a mechanic or FOR a learning target? The model doesn't answer.
- **Unique-constraint pollution.** `@@unique` becomes OR-logic — application-layer enforcement; messy in SQL.
- **FK relationships become misleading.** `topic` FK is conceptually correct only when `pedagogicalTargetSlug` is null; otherwise it's a leftover.

### Option B — New TeachingPackage sibling table (RECOMMENDED)

```prisma
model TeachingPackage {
  id                    String   @id @default(cuid())
  targetSlug            String   @map("target_slug")           // pedagogical-target axis-key (NEW taxonomy)
  language              String                                  // en|de|es|nl|...
  title                 Json                                    // {en,de,es,nl,...}
  description           Json                                    // curriculum intent
  durationMinutes       Int      @map("duration_minutes")
  structure             Json                                    // {warmup, contentActivity, scaffold, closure} — reuse CLIL shape
  composedExercises     Json                                    // [{appName, exerciseMode, customizationParameters, ordering}, ...]
  materials             Json                                    // [{type, customizationParameters, ordering}, ...]
  curriculumStandards   String[] @default([])                   // ["CCSS.K.CC.A.3", "EYFS.ELG.M.NUM", ...]
  assessmentCriteria    Json                                    // {en: "...", de: "..."}
  recommendedDeckIds    String[] @default([])                   // can reference both mechanic AND theme decks
  recommendedPdfDeckIds String[] @default([])
  lessonPlanId          String?  @map("lesson_plan_id")         // optional 1:1 to LessonPlan if package wraps an existing plan
  generatedBy           String   @map("generated_by")
  generatedAt           DateTime @default(now())
  generationVersion     Int      @default(1)

  lessonPlan        LessonPlan?              @relation(fields: [lessonPlanId], references: [id])
  bundleMemberships BundleTeachingPackage[]

  @@unique([targetSlug, language])
  @@map("teaching_packages")
}

model BundleTeachingPackage {
  bundleId          String @map("bundle_id")
  teachingPackageId String @map("teaching_package_id")

  bundle          Bundle          @relation(fields: [bundleId], references: [id], onDelete: Cascade)
  teachingPackage TeachingPackage @relation(fields: [teachingPackageId], references: [id])

  @@id([bundleId, teachingPackageId])
  @@map("bundle_teaching_packages")
}
```

**Why this is the recommended path:**

1. **Clean semantic separation.** `LessonPlan` = plan FOR a mechanic/theme/level; `TeachingPackage` = bundle FOR a learning outcome. Each table answers exactly one question.
2. **Zero backward-compat risk.** Existing 29-or-14 LessonPlan rows untouched. Reader UI continues to work. `bundleMemberships` (Pillar 2 M2M) is unaffected because it relates to LessonPlan, and a parallel `BundleTeachingPackage` join handles the new table.
3. **Migration path is opt-in, per commission scope.** "Existing 29 stay as legacy/reference until superseded explicitly." The operator chooses, package-by-package, whether a new TeachingPackage supersedes a LessonPlan; the relationship is captured via the optional `lessonPlanId` FK.
4. **Composition fields land at the right level.** `composedExercises` (palette references) and `materials` (materials-catalog references) live on TeachingPackage, NOT polluting LessonPlan with composition concerns. The text-plan portion either lives in `structure` directly OR is wrapped by reference to an existing LessonPlan via `lessonPlanId`.
5. **Curriculum-standards alignment lives at the right level.** `curriculumStandards: String[]` and `assessmentCriteria: Json` are pedagogical-target concerns, not mechanic-axis concerns.
6. **CLIL structure shape can be reused.** `structure` field carries the same 4-section JSON shape as `LessonPlan.structure` — no DRY violation, just shape consistency.

### Option C — Supersede & rekey LessonPlan (REJECTED)

Wholesale rekey LessonPlan on `pedagogicalTargetSlug`; mark existing 29 plans as legacy.

**Why rejected:** the existing plans pair mechanics+themes+levels meaningfully — that pairing has independent value to the operator's existing reader UI. Forcing them into a learning-target paradigm loses information; the commission scope explicitly prohibits the implied data migration ("they stand as legacy/reference until superseded explicitly").

## 8. Recommendation

**Adopt Option B for Phase 2.** Create the `TeachingPackage` and `BundleTeachingPackage` tables in a new Prisma migration. Existing `LessonPlan` and `Topic` schema stay untouched.

**Migration shape:**
- Phase 2 commit adds `teaching_packages` table + `bundle_teaching_packages` join table + a new `LearningTarget` table OR a JSON-loaded taxonomy lookup (final adjudication during Phase 2 — JSON-loaded is leaner if the taxonomy is < 200 entries).
- Phase 2 author-tooling (`scripts/author-teaching-package.ts`) seeds rows by reading `docs/lesson-plans/packages/<target-slug>/package.yaml` files.
- Phase 4 first package (`identify-and-name-10-farm-animals`) lands as one TeachingPackage row + one or more rendered material PDFs.

**For the operator at the Phase 1 surface gate:** this is Phase 1's load-bearing recommendation. If the operator wants Option A (extend LessonPlan) or Option C (rekey + supersede), surface that at the gate — Phase 2 implementation pivots accordingly.

## 9. Out-of-scope for Phase 1 (deferred to later arcs)

- Modifying any existing LessonPlan row (per commission §"Out of scope")
- Modifying `seed-lesson-plans.js` parser (its contract is stable)
- Adding any new fields to existing LessonPlan or Topic models
- Touching the existing reader UI (LessonPlanReader.tsx) — a parallel TeachingPackageReader.tsx will land in a future arc when the operator wires teaching packages into subscriber UI
- Resolving the 14-vs-29 draft drift (operator-side DB query at surface gate)
