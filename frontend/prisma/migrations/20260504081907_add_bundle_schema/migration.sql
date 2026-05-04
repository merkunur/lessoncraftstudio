-- CreateTable
CREATE TABLE "public"."bundles" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "theme_axis_key" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "title" JSONB NOT NULL,
    "description" JSONB NOT NULL,
    "thumbnail_url" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'draft',
    "published_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "bundles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."bundle_decks" (
    "bundle_id" TEXT NOT NULL,
    "deck_id" TEXT NOT NULL,
    "position" INTEGER NOT NULL,
    "added_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "bundle_decks_pkey" PRIMARY KEY ("bundle_id","deck_id")
);

-- CreateTable
CREATE TABLE "public"."bundle_lesson_plans" (
    "bundle_id" TEXT NOT NULL,
    "lesson_plan_id" TEXT NOT NULL,

    CONSTRAINT "bundle_lesson_plans_pkey" PRIMARY KEY ("bundle_id","lesson_plan_id")
);

-- CreateIndex
CREATE INDEX "bundles_status_published_at_idx" ON "public"."bundles"("status", "published_at");

-- CreateIndex
CREATE INDEX "bundles_language_status_idx" ON "public"."bundles"("language", "status");

-- CreateIndex
CREATE UNIQUE INDEX "bundles_theme_axis_key_language_key" ON "public"."bundles"("theme_axis_key", "language");

-- CreateIndex
CREATE UNIQUE INDEX "bundles_language_slug_key" ON "public"."bundles"("language", "slug");

-- CreateIndex
CREATE INDEX "bundle_decks_bundle_id_position_idx" ON "public"."bundle_decks"("bundle_id", "position");

-- AddForeignKey
ALTER TABLE "public"."bundle_decks" ADD CONSTRAINT "bundle_decks_bundle_id_fkey" FOREIGN KEY ("bundle_id") REFERENCES "public"."bundles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."bundle_decks" ADD CONSTRAINT "bundle_decks_deck_id_fkey" FOREIGN KEY ("deck_id") REFERENCES "public"."decks"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."bundle_lesson_plans" ADD CONSTRAINT "bundle_lesson_plans_bundle_id_fkey" FOREIGN KEY ("bundle_id") REFERENCES "public"."bundles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."bundle_lesson_plans" ADD CONSTRAINT "bundle_lesson_plans_lesson_plan_id_fkey" FOREIGN KEY ("lesson_plan_id") REFERENCES "public"."lesson_plans"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

