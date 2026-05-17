-- DropForeignKey
ALTER TABLE "public"."lesson_plans" DROP CONSTRAINT "lesson_plans_topic_slug_fkey";

-- DropForeignKey
ALTER TABLE "public"."parent_notes" DROP CONSTRAINT "parent_notes_topic_slug_fkey";

-- DropForeignKey
ALTER TABLE "public"."bundle_decks" DROP CONSTRAINT "bundle_decks_bundle_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."bundle_decks" DROP CONSTRAINT "bundle_decks_deck_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."bundle_lesson_plans" DROP CONSTRAINT "bundle_lesson_plans_bundle_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."bundle_lesson_plans" DROP CONSTRAINT "bundle_lesson_plans_lesson_plan_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."teaching_packages" DROP CONSTRAINT "teaching_packages_lesson_plan_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."bundle_teaching_packages" DROP CONSTRAINT "bundle_teaching_packages_bundle_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."bundle_teaching_packages" DROP CONSTRAINT "bundle_teaching_packages_teaching_package_id_fkey";

-- DropTable
DROP TABLE "public"."topics";

-- DropTable
DROP TABLE "public"."lesson_plans";

-- DropTable
DROP TABLE "public"."parent_notes";

-- DropTable
DROP TABLE "public"."bundles";

-- DropTable
DROP TABLE "public"."bundle_decks";

-- DropTable
DROP TABLE "public"."bundle_lesson_plans";

-- DropTable
DROP TABLE "public"."teaching_packages";

-- DropTable
DROP TABLE "public"."bundle_teaching_packages";
