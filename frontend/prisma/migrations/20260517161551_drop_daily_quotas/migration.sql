-- DropForeignKey
ALTER TABLE "public"."daily_quotas" DROP CONSTRAINT "daily_quotas_user_id_fkey";

-- DropTable
DROP TABLE "public"."daily_quotas";

