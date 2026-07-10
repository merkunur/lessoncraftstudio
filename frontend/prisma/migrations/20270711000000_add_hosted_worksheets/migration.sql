-- CreateTable
CREATE TABLE "public"."hosted_worksheets" (
    "id" TEXT NOT NULL,
    "link_id" VARCHAR(12) NOT NULL,
    "teacher_id" TEXT NOT NULL,
    "app_id" VARCHAR(40) NOT NULL,
    "title" VARCHAR(200) NOT NULL,
    "locale" VARCHAR(5) NOT NULL DEFAULT 'en',
    "html_bytes" INTEGER NOT NULL,
    "view_count" INTEGER NOT NULL DEFAULT 0,
    "status" VARCHAR(10) NOT NULL DEFAULT 'live',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "hosted_worksheets_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "hosted_worksheets_link_id_key" ON "public"."hosted_worksheets"("link_id");

-- CreateIndex
CREATE INDEX "hosted_worksheets_teacher_id_idx" ON "public"."hosted_worksheets"("teacher_id");

-- CreateIndex
CREATE INDEX "hosted_worksheets_status_idx" ON "public"."hosted_worksheets"("status");

-- AddForeignKey
ALTER TABLE "public"."hosted_worksheets" ADD CONSTRAINT "hosted_worksheets_teacher_id_fkey" FOREIGN KEY ("teacher_id") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

