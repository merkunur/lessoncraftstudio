-- Pass 7a closeout: removes the WPlusTransaction + WPlusWebhookEvent
-- orphan models from the Prisma schema. Idempotent drops because
-- wplus_transactions was already raw-SQL-dropped in Pass 9 (migration
-- 20260501000000_drop_purchases_and_wplus_transactions), but
-- wplus_webhook_events was a Pass 9 oversight and still exists in
-- production DB at Pass 7a authoring time (verified via psql 2026-05-01).
--
-- Both tables are zero-row (pre-LS WarriorPlus tracking; never migrated
-- to the LS payment processor).

DROP TABLE IF EXISTS "wplus_transactions" CASCADE;
DROP TABLE IF EXISTS "wplus_webhook_events" CASCADE;
