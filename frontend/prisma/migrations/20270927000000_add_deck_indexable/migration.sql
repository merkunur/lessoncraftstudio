-- Do-not-index marker (Level Set programme). Additive; default true keeps every existing deck unchanged.
ALTER TABLE "public"."decks" ADD COLUMN "indexable" BOOLEAN NOT NULL DEFAULT true;
