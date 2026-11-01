-- CreateTable
CREATE TABLE "public"."maker_recipes" (
    "id" TEXT NOT NULL,
    "teacher_id" TEXT NOT NULL,
    "maker" VARCHAR(40) NOT NULL,
    "lang" VARCHAR(5) NOT NULL,
    "title" VARCHAR(200) NOT NULL,
    "template" VARCHAR(12) NOT NULL,
    "recipe" JSONB NOT NULL,
    "rev" INTEGER NOT NULL DEFAULT 1,
    "deleted_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "maker_recipes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."maker_share_links" (
    "id" TEXT NOT NULL,
    "link_id" VARCHAR(12) NOT NULL,
    "recipe_id" TEXT NOT NULL,
    "teacher_id" TEXT NOT NULL,
    "kind" VARCHAR(10) NOT NULL,
    "revoked_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "maker_share_links_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "maker_recipes_teacher_id_updated_at_idx" ON "public"."maker_recipes"("teacher_id", "updated_at");

-- CreateIndex
CREATE UNIQUE INDEX "maker_share_links_link_id_key" ON "public"."maker_share_links"("link_id");

-- CreateIndex
CREATE INDEX "maker_share_links_recipe_id_idx" ON "public"."maker_share_links"("recipe_id");

-- CreateIndex
CREATE INDEX "maker_share_links_teacher_id_idx" ON "public"."maker_share_links"("teacher_id");

-- AddForeignKey
ALTER TABLE "public"."maker_recipes" ADD CONSTRAINT "maker_recipes_teacher_id_fkey" FOREIGN KEY ("teacher_id") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."maker_share_links" ADD CONSTRAINT "maker_share_links_recipe_id_fkey" FOREIGN KEY ("recipe_id") REFERENCES "public"."maker_recipes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."maker_share_links" ADD CONSTRAINT "maker_share_links_teacher_id_fkey" FOREIGN KEY ("teacher_id") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

