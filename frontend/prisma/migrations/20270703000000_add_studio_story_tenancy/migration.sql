-- [FEAT][SCHEMA] Story Studio tenancy (premium class #3): studio_stories (sb-1 JSON
-- + rev optimistic concurrency + soft delete + asset quota), studio_share_links
-- (preview/share capability links, PlayLink precedent), studio_story_revisions
-- (JSON snapshots replacing local .bak files). Additive only; zero existing-table impact.

-- CreateTable
CREATE TABLE "studio_stories" (
    "id" TEXT NOT NULL,
    "teacher_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'draft',
    "story_json" JSONB NOT NULL,
    "strings_json" JSONB NOT NULL,
    "rev" INTEGER NOT NULL DEFAULT 1,
    "locale" TEXT NOT NULL DEFAULT 'en',
    "grade_band" TEXT,
    "asset_bytes" INTEGER NOT NULL DEFAULT 0,
    "deleted_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "studio_stories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "studio_share_links" (
    "id" TEXT NOT NULL,
    "link_id" VARCHAR(12) NOT NULL,
    "story_id" TEXT NOT NULL,
    "teacher_id" TEXT NOT NULL,
    "kind" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "revoked_at" TIMESTAMP(3),

    CONSTRAINT "studio_share_links_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "studio_story_revisions" (
    "id" TEXT NOT NULL,
    "story_id" TEXT NOT NULL,
    "rev" INTEGER NOT NULL,
    "story_json" JSONB NOT NULL,
    "strings_json" JSONB NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "studio_story_revisions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "studio_stories_teacher_id_idx" ON "studio_stories"("teacher_id");

-- CreateIndex
CREATE UNIQUE INDEX "studio_share_links_link_id_key" ON "studio_share_links"("link_id");

-- CreateIndex
CREATE INDEX "studio_share_links_story_id_idx" ON "studio_share_links"("story_id");

-- CreateIndex
CREATE INDEX "studio_share_links_teacher_id_idx" ON "studio_share_links"("teacher_id");

-- CreateIndex
CREATE UNIQUE INDEX "studio_story_revisions_story_id_rev_key" ON "studio_story_revisions"("story_id", "rev");

-- AddForeignKey
ALTER TABLE "studio_stories" ADD CONSTRAINT "studio_stories_teacher_id_fkey" FOREIGN KEY ("teacher_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "studio_share_links" ADD CONSTRAINT "studio_share_links_story_id_fkey" FOREIGN KEY ("story_id") REFERENCES "studio_stories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "studio_share_links" ADD CONSTRAINT "studio_share_links_teacher_id_fkey" FOREIGN KEY ("teacher_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "studio_story_revisions" ADD CONSTRAINT "studio_story_revisions_story_id_fkey" FOREIGN KEY ("story_id") REFERENCES "studio_stories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

