-- AlterTable: subscriptions
-- Add nullable Lemon Squeezy fields alongside the existing Stripe-era fields.
-- Per HOMEPAGE-IMPLEMENTATION-PROMPT.md §5.5 + SUBSCRIPTION-SCOPE.md, the active-LCS-
-- subscription predicate matches against ls_subscription_id IS NOT NULL AND status = 'active'.
-- Stripe fields remain untouched per CLAUDE.md §A.6 (Stripe is dormant; LS is live).
ALTER TABLE "subscriptions" ADD COLUMN "ls_subscription_id" TEXT;
ALTER TABLE "subscriptions" ADD COLUMN "ls_variant_id" TEXT;

-- CreateIndex: ls_subscription_id is unique (matches @unique on the Prisma model field).
CREATE UNIQUE INDEX "subscriptions_ls_subscription_id_key" ON "subscriptions"("ls_subscription_id");
