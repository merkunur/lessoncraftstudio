-- CreateTable
CREATE TABLE "public"."daily_quotas" (
    "id" TEXT NOT NULL,
    "user_id" TEXT,
    "anonymous_id" TEXT,
    "date" TIMESTAMP(3) NOT NULL,
    "action_count" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "daily_quotas_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "daily_quotas_date_idx" ON "public"."daily_quotas"("date");

-- CreateIndex
CREATE INDEX "daily_quotas_user_id_idx" ON "public"."daily_quotas"("user_id");

-- CreateIndex
CREATE INDEX "daily_quotas_anonymous_id_idx" ON "public"."daily_quotas"("anonymous_id");

-- CreateIndex
CREATE UNIQUE INDEX "daily_quotas_user_date_key" ON "public"."daily_quotas"("user_id", "date");

-- CreateIndex
CREATE UNIQUE INDEX "daily_quotas_anon_date_key" ON "public"."daily_quotas"("anonymous_id", "date");

-- AddForeignKey
ALTER TABLE "public"."daily_quotas" ADD CONSTRAINT "daily_quotas_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

