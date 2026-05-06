-- CreateTable
CREATE TABLE "public"."teaching_packages" (
    "id" TEXT NOT NULL,
    "target_slug" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "title" JSONB NOT NULL,
    "description" JSONB NOT NULL,
    "duration_minutes" INTEGER NOT NULL,
    "structure" JSONB NOT NULL,
    "composed_exercises" JSONB NOT NULL,
    "materials" JSONB NOT NULL,
    "curriculum_standards" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "assessment_criteria" JSONB NOT NULL,
    "recommended_deck_ids" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "recommended_pdf_deck_ids" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "lesson_plan_id" TEXT,
    "status" TEXT NOT NULL DEFAULT 'draft',
    "published_at" TIMESTAMP(3),
    "generated_by" TEXT NOT NULL,
    "generated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "generation_version" INTEGER NOT NULL DEFAULT 1,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "teaching_packages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."bundle_teaching_packages" (
    "bundle_id" TEXT NOT NULL,
    "teaching_package_id" TEXT NOT NULL,

    CONSTRAINT "bundle_teaching_packages_pkey" PRIMARY KEY ("bundle_id","teaching_package_id")
);

-- CreateIndex
CREATE INDEX "teaching_packages_status_published_at_idx" ON "public"."teaching_packages"("status", "published_at");

-- CreateIndex
CREATE INDEX "teaching_packages_target_slug_idx" ON "public"."teaching_packages"("target_slug");

-- CreateIndex
CREATE UNIQUE INDEX "teaching_packages_target_slug_language_key" ON "public"."teaching_packages"("target_slug", "language");

-- AddForeignKey
ALTER TABLE "public"."teaching_packages" ADD CONSTRAINT "teaching_packages_lesson_plan_id_fkey" FOREIGN KEY ("lesson_plan_id") REFERENCES "public"."lesson_plans"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."bundle_teaching_packages" ADD CONSTRAINT "bundle_teaching_packages_bundle_id_fkey" FOREIGN KEY ("bundle_id") REFERENCES "public"."bundles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."bundle_teaching_packages" ADD CONSTRAINT "bundle_teaching_packages_teaching_package_id_fkey" FOREIGN KEY ("teaching_package_id") REFERENCES "public"."teaching_packages"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

