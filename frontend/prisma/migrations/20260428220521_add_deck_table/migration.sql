-- CreateTable
CREATE TABLE "public"."decks" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" JSONB NOT NULL,
    "description" JSONB NOT NULL,
    "exercise_type" TEXT NOT NULL,
    "exercise_mode" TEXT,
    "language" TEXT NOT NULL,
    "subject_tags" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "topic_slugs" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "age_range" TEXT NOT NULL,
    "html_url" TEXT NOT NULL,
    "pdf_url" TEXT NOT NULL,
    "answer_key_url" TEXT,
    "thumbnail_url" TEXT NOT NULL,
    "manifest_url" TEXT NOT NULL,
    "published_at" TIMESTAMP(3),
    "status" TEXT NOT NULL DEFAULT 'draft',
    "created_by" TEXT NOT NULL,
    "version" INTEGER NOT NULL DEFAULT 1,
    "content_family_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "decks_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "decks_status_published_at_idx" ON "public"."decks"("status", "published_at");

-- CreateIndex
CREATE INDEX "decks_exercise_type_language_idx" ON "public"."decks"("exercise_type", "language");

-- CreateIndex
CREATE UNIQUE INDEX "decks_language_slug_key" ON "public"."decks"("language", "slug");

