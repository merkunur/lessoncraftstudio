-- CreateTable: subscription_interest
-- Notify-me email captures for the pre-launch home page.
-- Per HOMEPAGE-IMPLEMENTATION-PROMPT.md §9 launch readiness item 1 + T5 default
-- (HOMEPAGE_SUBSCRIBE_MODE=notify_me). Standalone table — no foreign keys.
-- Additive only; does not touch any existing tables.
CREATE TABLE "subscription_interest" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "locale" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "subscription_interest_pkey" PRIMARY KEY ("id")
);

-- CreateIndex: email is unique (matches @unique on the Prisma model field).
-- Idempotency for the API route relies on this — POST /api/subscription-interest
-- upserts on email and returns 200 whether the row is new or pre-existing,
-- so the duplicate-submission status doesn't leak.
CREATE UNIQUE INDEX "subscription_interest_email_key" ON "subscription_interest"("email");

-- CreateIndex: created_at lookup for any future "recent signups" admin query.
CREATE INDEX "subscription_interest_created_at_idx" ON "subscription_interest"("created_at");
