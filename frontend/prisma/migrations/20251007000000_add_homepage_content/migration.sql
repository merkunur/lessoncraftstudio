-- CreateTable
CREATE TABLE IF NOT EXISTS "homepage_content" (
    "id" TEXT NOT NULL DEFAULT 'homepage',
    "content" JSONB NOT NULL,
    "updated_by" TEXT,
    "version" INTEGER NOT NULL DEFAULT 1,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "homepage_content_pkey" PRIMARY KEY ("id")
);

-- Create index for faster JSON queries
CREATE INDEX IF NOT EXISTS "homepage_content_updated_at_idx" ON "homepage_content"("updated_at");
