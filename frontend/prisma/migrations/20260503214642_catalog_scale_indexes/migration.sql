-- CreateIndex
CREATE INDEX "decks_subject_tags_idx" ON "public"."decks" USING GIN ("subject_tags");

-- CreateIndex
CREATE INDEX "decks_language_status_age_range_idx" ON "public"."decks"("language", "status", "age_range");

-- CreateIndex
CREATE INDEX "decks_language_status_exercise_type_idx" ON "public"."decks"("language", "status", "exercise_type");

