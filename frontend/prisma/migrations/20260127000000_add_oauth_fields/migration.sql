-- AlterTable: Add OAuth fields to users table
-- Make password_hash optional (nullable) for OAuth users
ALTER TABLE "users" ALTER COLUMN "password_hash" DROP NOT NULL;

-- Add OAuth provider fields
ALTER TABLE "users" ADD COLUMN "oauth_provider" TEXT;
ALTER TABLE "users" ADD COLUMN "oauth_provider_id" TEXT;

-- Create index for OAuth lookups
CREATE INDEX "users_oauth_provider_oauth_provider_id_idx" ON "users"("oauth_provider", "oauth_provider_id");
