-- Catalog-side §8.1 commission pass — Migration B: player + embeds family.
-- 2 new tables: embed_configs, play_links.
-- CREATE-only; zero blast radius on extant tables.
-- embed_configs: per-teacher per-deck iframe config; platform-infrastructure
--   per H5 (NOT subscription-gated; embedding is free per §3 acquisition flywheel).
-- play_links: 10-char random alphanumeric public ID per §4.4 student-facing route.
-- play_links.embed_config_id is nullable — present only when the link backs an
-- embed iframe; allowedOrigins enforcement happens at link resolution time.

-- CreateTable: embed_configs
CREATE TABLE "public"."embed_configs" (
    "id" TEXT NOT NULL,
    "teacher_id" TEXT NOT NULL,
    "deck_id" TEXT NOT NULL,
    "width" TEXT,
    "height" TEXT,
    "allowed_origins" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "embed_configs_pkey" PRIMARY KEY ("id")
);

-- CreateTable: play_links
CREATE TABLE "public"."play_links" (
    "id" TEXT NOT NULL,
    "link_id" VARCHAR(10) NOT NULL,
    "deck_id" TEXT NOT NULL,
    "teacher_id" TEXT NOT NULL,
    "embed_config_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "play_links_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "embed_configs_teacher_id_idx" ON "public"."embed_configs"("teacher_id");

-- CreateIndex
CREATE UNIQUE INDEX "play_links_link_id_key" ON "public"."play_links"("link_id");

-- CreateIndex
CREATE INDEX "play_links_teacher_id_idx" ON "public"."play_links"("teacher_id");

-- AddForeignKey: embed_configs.teacher_id → users.id (existing table, unmodified)
ALTER TABLE "public"."embed_configs" ADD CONSTRAINT "embed_configs_teacher_id_fkey" FOREIGN KEY ("teacher_id") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey: embed_configs.deck_id → decks.id (existing table, unmodified)
ALTER TABLE "public"."embed_configs" ADD CONSTRAINT "embed_configs_deck_id_fkey" FOREIGN KEY ("deck_id") REFERENCES "public"."decks"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey: play_links.deck_id → decks.id (existing table, unmodified)
ALTER TABLE "public"."play_links" ADD CONSTRAINT "play_links_deck_id_fkey" FOREIGN KEY ("deck_id") REFERENCES "public"."decks"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey: play_links.teacher_id → users.id (existing table, unmodified)
ALTER TABLE "public"."play_links" ADD CONSTRAINT "play_links_teacher_id_fkey" FOREIGN KEY ("teacher_id") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey: play_links.embed_config_id → embed_configs.id (just-created above; nullable FK)
ALTER TABLE "public"."play_links" ADD CONSTRAINT "play_links_embed_config_id_fkey" FOREIGN KEY ("embed_config_id") REFERENCES "public"."embed_configs"("id") ON DELETE SET NULL ON UPDATE CASCADE;
