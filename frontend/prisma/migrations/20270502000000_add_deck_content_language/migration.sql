-- [FIX][CATALOG] Add decks.content_language — the TARGET language of a cross-language
-- (second-language vocab) deck; NULL = monolingual. Drives the /learn ("Languages")
-- category fetchers (content_language = <target>) AND the monolingual-surface
-- exclusion filter (content_language IS NULL), which stops cross-language decks from
-- polluting the monolingual catalog. Additive nullable column + one read-path index;
-- zero blast radius on existing rows (all become NULL = monolingual until backfilled).

-- AlterTable
ALTER TABLE "decks" ADD COLUMN "content_language" TEXT;

-- CreateIndex
CREATE INDEX "decks_language_status_content_language_idx" ON "decks"("language", "status", "content_language");
