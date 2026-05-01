-- Pass 9 of the seller-era teardown (CLAUDE.md §17.1). Drops the seller-era
-- purchases table (0 rows) and the pre-LS-era wplus_transactions table (0 rows).
-- Operator authorization for the §10.3-protected DROP on purchases delegated
-- chat-side to the strategic copilot for this teardown arc; commit message
-- audit-trails the delegation.

-- DropForeignKey: drop the FK first so CASCADE has nothing to chase.
ALTER TABLE "purchases" DROP CONSTRAINT IF EXISTS "purchases_user_id_fkey";

-- DropTable: purchases (Prisma-managed, 0 rows confirmed Pass 1 §8 + Pass 9
-- pre-migration safety snapshot).
DROP TABLE IF EXISTS "purchases" CASCADE;

-- DropTable: wplus_transactions (manual: pre-LS-era, never in Prisma schema,
-- 0 rows confirmed Pass 1 §8 + Pass 9 pre-migration safety snapshot).
DROP TABLE IF EXISTS "wplus_transactions" CASCADE;
