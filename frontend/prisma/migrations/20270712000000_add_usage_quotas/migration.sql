-- CreateTable
CREATE TABLE "public"."usage_quotas" (
    "id" TEXT NOT NULL,
    "user_id" TEXT,
    "anonymous_id" VARCHAR(64),
    "kind" VARCHAR(10) NOT NULL,
    "period_start" TIMESTAMP(3) NOT NULL,
    "action_count" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "usage_quotas_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "usage_quotas_period_start_idx" ON "public"."usage_quotas"("period_start");

-- CreateIndex
CREATE UNIQUE INDEX "usage_quotas_user_id_kind_period_start_key" ON "public"."usage_quotas"("user_id", "kind", "period_start");

-- CreateIndex
CREATE UNIQUE INDEX "usage_quotas_anonymous_id_kind_period_start_key" ON "public"."usage_quotas"("anonymous_id", "kind", "period_start");

-- AddForeignKey
ALTER TABLE "public"."usage_quotas" ADD CONSTRAINT "usage_quotas_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

