-- CreateTable
CREATE TABLE "public"."activity_play_links" (
    "id" TEXT NOT NULL,
    "link_id" VARCHAR(12) NOT NULL,
    "teacher_id" TEXT NOT NULL,
    "activity_id" VARCHAR(80) NOT NULL,
    "locale" VARCHAR(5) NOT NULL DEFAULT 'en',
    "title" VARCHAR(200) NOT NULL,
    "view_count" INTEGER NOT NULL DEFAULT 0,
    "status" VARCHAR(10) NOT NULL DEFAULT 'live',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "activity_play_links_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "activity_play_links_link_id_key" ON "public"."activity_play_links"("link_id");

-- CreateIndex
CREATE INDEX "activity_play_links_teacher_id_idx" ON "public"."activity_play_links"("teacher_id");

-- CreateIndex
CREATE INDEX "activity_play_links_status_idx" ON "public"."activity_play_links"("status");

-- AddForeignKey
ALTER TABLE "public"."activity_play_links" ADD CONSTRAINT "activity_play_links_teacher_id_fkey" FOREIGN KEY ("teacher_id") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

