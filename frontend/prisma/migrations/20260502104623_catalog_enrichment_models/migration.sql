-- Catalog-side §8.1 commission pass — Migration A: catalog-enrichment family.
-- 4 new tables: topics, deck_enrichments, lesson_plans, parent_notes.
-- CREATE-only; zero blast radius on extant tables (per project_catalog_models_recon.md).
-- Topic-rooted FK chain: lesson_plans + parent_notes both FK → topics.slug.
-- deck_enrichments FK → decks.id (1:1 with Deck; deck_id is both PK and FK).
-- Topic.embedding column per H1 authorization (§16.1 embedding-similarity mechanic).
-- ParentNote table reserved per §17.8.7 pattern; feature deferred per docs/SUBSCRIPTION-SCOPE.md.

-- CreateTable: topics (root of family A; no FK out)
CREATE TABLE "public"."topics" (
    "slug" TEXT NOT NULL,
    "title" JSONB NOT NULL,
    "description" JSONB NOT NULL,
    "subject" TEXT NOT NULL,
    "age_range" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "curriculum_tags" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "parent_slug" TEXT,
    "is_high_priority" BOOLEAN NOT NULL DEFAULT false,
    "embedding" BYTEA,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "topics_pkey" PRIMARY KEY ("slug")
);

-- CreateTable: deck_enrichments (1:1 with decks via deck_id FK)
CREATE TABLE "public"."deck_enrichments" (
    "deck_id" TEXT NOT NULL,
    "embedding" BYTEA NOT NULL,
    "long_description" JSONB NOT NULL,
    "learning_objectives" JSONB NOT NULL,
    "ai_tags" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "enriched_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "enrichment_version" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "deck_enrichments_pkey" PRIMARY KEY ("deck_id")
);

-- CreateTable: lesson_plans (one row per (topic_slug, language) per @@unique)
CREATE TABLE "public"."lesson_plans" (
    "id" TEXT NOT NULL,
    "topic_slug" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "duration_minutes" INTEGER NOT NULL,
    "structure" JSONB NOT NULL,
    "recommended_deck_ids" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "recommended_pdf_deck_ids" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "generated_by" TEXT NOT NULL,
    "generated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "generation_version" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "lesson_plans_pkey" PRIMARY KEY ("id")
);

-- CreateTable: parent_notes (deferred feature per H4; reserved per §17.8.7)
CREATE TABLE "public"."parent_notes" (
    "id" TEXT NOT NULL,
    "topic_slug" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "tone" TEXT NOT NULL,
    "generated_by" TEXT NOT NULL,
    "generated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "generation_version" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "parent_notes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "topics_subject_language_idx" ON "public"."topics"("subject", "language");

-- CreateIndex
CREATE UNIQUE INDEX "lesson_plans_topic_slug_language_key" ON "public"."lesson_plans"("topic_slug", "language");

-- CreateIndex
CREATE UNIQUE INDEX "parent_notes_topic_slug_language_tone_key" ON "public"."parent_notes"("topic_slug", "language", "tone");

-- AddForeignKey: deck_enrichments.deck_id → decks.id (existing table, unmodified)
ALTER TABLE "public"."deck_enrichments" ADD CONSTRAINT "deck_enrichments_deck_id_fkey" FOREIGN KEY ("deck_id") REFERENCES "public"."decks"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey: lesson_plans.topic_slug → topics.slug
ALTER TABLE "public"."lesson_plans" ADD CONSTRAINT "lesson_plans_topic_slug_fkey" FOREIGN KEY ("topic_slug") REFERENCES "public"."topics"("slug") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey: parent_notes.topic_slug → topics.slug
ALTER TABLE "public"."parent_notes" ADD CONSTRAINT "parent_notes_topic_slug_fkey" FOREIGN KEY ("topic_slug") REFERENCES "public"."topics"("slug") ON DELETE CASCADE ON UPDATE CASCADE;
