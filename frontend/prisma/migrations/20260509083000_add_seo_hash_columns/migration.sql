-- [ARC][SEO][DECK-PAGE] Phase 3a.1 schema migration per Phase 2 doctrine §1+§2.
-- Adds title_hash + description_hash sha256 columns + compound unique on
-- (language, title_hash) to enforce same-locale title uniqueness invariant.
-- Both columns nullable; backfilled at Phase 4a retrofit pass per
-- mutable-regions contract extension.

-- AlterTable
ALTER TABLE "decks" ADD COLUMN     "description_hash" TEXT,
ADD COLUMN     "title_hash" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "decks_language_title_hash_key" ON "decks"("language", "title_hash");
