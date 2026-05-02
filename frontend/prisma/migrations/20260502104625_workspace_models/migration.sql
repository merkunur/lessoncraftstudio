-- Catalog-side §8.1 commission pass — Migration C: workspace family.
-- 3 new tables: collections, collection_decks, deck_favorites.
-- CREATE-only; zero blast radius on extant tables.
--
-- collections + collection_decks: subscriber-only feature per
--   docs/SUBSCRIPTION-SCOPE.md Pillar 3 Tool 1 (saved decks + collections).
-- deck_favorites: free-tier feature; CTA trigger for collections-feature
--   conversion prompt at fifth favorite (per CLAUDE.md §7).
--
-- collection_decks composite PK on (collection_id, deck_id) per §8.1.
-- deck_favorites composite PK on (teacher_id, deck_id) per §8.1.

-- CreateTable: collections
CREATE TABLE "public"."collections" (
    "id" TEXT NOT NULL,
    "teacher_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "collections_pkey" PRIMARY KEY ("id")
);

-- CreateTable: collection_decks (composite PK)
CREATE TABLE "public"."collection_decks" (
    "collection_id" TEXT NOT NULL,
    "deck_id" TEXT NOT NULL,
    "position" INTEGER NOT NULL,
    "added_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "collection_decks_pkey" PRIMARY KEY ("collection_id","deck_id")
);

-- CreateTable: deck_favorites (composite PK)
CREATE TABLE "public"."deck_favorites" (
    "teacher_id" TEXT NOT NULL,
    "deck_id" TEXT NOT NULL,
    "favorited_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "deck_favorites_pkey" PRIMARY KEY ("teacher_id","deck_id")
);

-- CreateIndex
CREATE INDEX "collections_teacher_id_idx" ON "public"."collections"("teacher_id");

-- CreateIndex
CREATE INDEX "collection_decks_collection_id_position_idx" ON "public"."collection_decks"("collection_id", "position");

-- CreateIndex
CREATE INDEX "deck_favorites_teacher_id_favorited_at_idx" ON "public"."deck_favorites"("teacher_id", "favorited_at");

-- AddForeignKey: collections.teacher_id → users.id (existing table, unmodified)
ALTER TABLE "public"."collections" ADD CONSTRAINT "collections_teacher_id_fkey" FOREIGN KEY ("teacher_id") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey: collection_decks.collection_id → collections.id (just-created above)
ALTER TABLE "public"."collection_decks" ADD CONSTRAINT "collection_decks_collection_id_fkey" FOREIGN KEY ("collection_id") REFERENCES "public"."collections"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey: collection_decks.deck_id → decks.id (existing table, unmodified)
ALTER TABLE "public"."collection_decks" ADD CONSTRAINT "collection_decks_deck_id_fkey" FOREIGN KEY ("deck_id") REFERENCES "public"."decks"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey: deck_favorites.teacher_id → users.id (existing table, unmodified)
ALTER TABLE "public"."deck_favorites" ADD CONSTRAINT "deck_favorites_teacher_id_fkey" FOREIGN KEY ("teacher_id") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey: deck_favorites.deck_id → decks.id (existing table, unmodified)
ALTER TABLE "public"."deck_favorites" ADD CONSTRAINT "deck_favorites_deck_id_fkey" FOREIGN KEY ("deck_id") REFERENCES "public"."decks"("id") ON DELETE CASCADE ON UPDATE CASCADE;
