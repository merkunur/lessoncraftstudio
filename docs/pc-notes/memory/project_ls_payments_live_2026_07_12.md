---
name: project-ls-payments-live-2026-07-12
description: "Lemon Squeezy subscription payments went LIVE 2026-07-12 — the 3 root-cause fixes, the test-vs-live gotchas, and how activation now works end-to-end"
metadata: 
  node_type: memory
  type: project
  originSessionId: aaf336ec-30a7-4d56-b21f-c711a6b23431
---

# LS SUBSCRIPTION PAYMENTS — LIVE + VERIFIED 2026-07-12

A real live purchase (`lena.zhyvova@gmail.com`, live monthly product `1194171`) activated flawlessly: `Subscription active | user.subscriptionTier='full' | interval=monthly | lsSub=2336227`. The whole flow was proven: activation (test+live), tier-bridge/admin display, subscriber premium (unlimited play+download), full lifecycle (renew / payment_failed→past_due 14-day grace / cancel→paid-through / expire→canceled+free), idempotency (duplicate→200), forged-signature→401/no-row, out-of-order resilience.

## The 3 root causes (why "payment succeeded but the account stayed FREE")
Fixed in commit **`ee920581`** (frontend/config/lemonsqueezy-product-config.ts + app/api/webhooks/lemonsqueezy/route.ts + 4 email templates) + prod env:
1. **No LS webhook was configured** pointing at us → LS took the money and told our app nothing (`ls_webhook_events` was 0 forever; deliveries that did come 401'd on a secret mismatch). Fix = create the webhook + make its signing secret match `LEMONSQUEEZY_WEBHOOK_SECRET`.
2. **Activation allowlisted only LIVE product ids** (`isLcsSubscriptionProduct` → `1194166`/`1194171`). A TEST purchase carries a different product id → handler early-returned "not an LCS product" (`route.ts:227`), event marked `processed`, no Subscription row. Fix = new env `LCS_TEST_SUBSCRIPTION_PRODUCT_IDS` (comma-sep) merged into the allowlist at runtime (`envExtraSubscriptionProductIds()`); **cleared at go-live** (live ids are hardcoded).
3. **Webhook never wrote `user.subscriptionTier`** — it only wrote the new `Subscription` table. But `/api/admin/users` (+ me-route `limits` + ~51 legacy read-sites) key off the legacy `user.subscriptionTier` (free/core/full) → a correctly-activated subscriber still displayed "free". Fix = **`syncUserTierForSubscription(lsSubscriptionId)`** called at the end of all 5 handlers; sets `subscriptionTier = isSubscriptionUsable({subscription}) ? 'full' : 'free'` (reuses `lib/entitlements.ts`; reuses existing top tier `'full'` so no new enum). Verified: signin→me shows full limits, `/api/quota/status` kind=subscriber + unlimited.

## LEMON SQUEEZY test-vs-live GOTCHAS (the hard-won lessons)
- **Test mode is a SEPARATE STORE** — separate product ids, separate buy links (UUIDs), separate webhook, separate signing secret. "in live mode, but used a known test card" = you used a LIVE buy link (test cards only work on the TEST product's Share link).
- **Product ids:** LIVE yearly `1194166` / LIVE monthly `1194171` (hardcoded in `SUBSCRIPTION_PRODUCT`). TEST yearly `1194204` / TEST monthly `1194201` (were in `LCS_TEST_SUBSCRIPTION_PRODUCT_IDS`, now cleared). The website's config buy links (`2863e2e7…`/`edf54b11…`) are the LIVE links.
- **The LIVE webhook MUST subscribe to the `subscription_*` events** (`subscription_created/updated/cancelled/payment_success/payment_failed`) — NOT just `order_created`/`order_refunded`. Our handler log-and-IGNORES order_* (seller-era). A webhook with only order_* checked → live purchases never activate. (Operator's first live webhook had only order_* ticked — caught via screenshot.)
- **Webhook URL** = `https://www.lessoncraftstudio.com/api/webhooks/lemonsqueezy`. **Live secret** = `lcs_webhook_2027_secure_key` (stored in prod `.env.production`; operator chose to keep it — mildly guessable, a stronger random one would be better someday).
- **Idempotency** = `X-Event-Id` header → `ls_event_<uuid>` (falls back to `ls_<eventName>_<orderId>`). `LSWebhookEvent.payload` (Json) stores the raw body — you can HARVEST the real product id / replay a purchase from it.
- **Refund**: operator to refund the `lena.zhyvova` smoke purchase in LS.

## ENV is runtime-loaded (no rebuild needed for env-only changes)
The app runs `next start` from `/opt/lessoncraftstudio/frontend/releases/current` (pm2 `lessoncraftstudio`), loading env from **that release's** `.env.production` copy. `deploy.sh` copies source `frontend/.env.production` → each new release. To change env WITHOUT a rebuild: edit BOTH `frontend/.env.production` (source, persists across deploys) AND `releases/current/.env.production` (live), then `pm2 reload lessoncraftstudio --update-env` (re-reads at boot). `LEMONSQUEEZY_WEBHOOK_SECRET` + `LCS_TEST_SUBSCRIPTION_PRODUCT_IDS` are read at request time via `process.env`.

## Also shipped
- **Emails rebranded** (were stale seller-era "Word Search Studio Pro / Watermarked downloads / POD"): `base-layout.tsx` blue `#007bff`→teal `#146B5E`; `welcome-email.tsx` rewritten to accurate free-platform copy ×11 langs; `password-reset` + `subscription-upgrade` buttons teal. Live send path = the `.tsx` templates via `lib/email.ts` (NOT the admin DB editor). Pre-commit hook blocks email files → `git commit --no-verify` (documented bypass).
- **Cleanup done**: 8 test users deleted; stale duplicate `_prisma_migrations` row for `20270404` (finished_at NULL) removed.

## REDEPLOY PROTECTION (added 2026-07-12, commits `b9a64157`+`e586c2c7`)
Payments can't break on a redeploy, by construction + 2 guards (doc: CLAUDE.md §A.6.1):
- **Already-safe:** the `LEMONSQUEEZY_*` env lives in source `frontend/.env.production` → `deploy.sh` copies it into every release → the secret persists across redeploys. A failed build aborts BEFORE the zero-downtime release-flip → the old working release keeps serving. Redeploys never touch the DB or run migrations.
- **Guard 1 — pre-build FAIL** (`deploy.sh`, right after the hreflang check): aborts if `LEMONSQUEEZY_WEBHOOK_SECRET`/`API_KEY`/`STORE_ID` are missing/empty in source `.env.production`. Verified: real env passes; stripped/emptied secret aborts.
- **Guard 2 — post-flip canary** `scripts/payments/smoke-payment-webhook.js` (WARN + loud `!!! PAYMENT CANARY FAILED`): signs a synthetic `subscription_created` (LIVE product `1194166`) → asserts 200 + active `Subscription` + `subscriptionTier='full'`; asserts bad-sig → 401; cleans up (leaves a bare `deploy-smoke@lcs.internal` user, tier reset to free). Verified passing in the exact deploy invocation.
- **GOTCHA (fixed `e586c2c7`):** deploy-run scripts under `scripts/` must resolve Prisma via `require(path.resolve(__dirname,'..','..','frontend','node_modules','@prisma','client'))` — a bare `require('@prisma/client')` MODULE_NOT_FOUNDs because Node resolves relative to the script dir, not cwd, and the generated client is in `frontend/node_modules`. (My `/tmp` test only passed because it set `NODE_PATH`; the real deploy invocation doesn't.)
- Guards are LIVE from the next deploy (server already `git pull`'d the new `deploy.sh`).

## Open / optional (operator's call)
- Refund the `lena.zhyvova` live smoke purchase.
- Admin tier badge shows "Full" for subscribers (a cheap relabel to "Subscriber" if wanted).
- The `subscriptionTier`→'full' bridge is a pragmatic patch; the cleaner long-term is migrating the ~51 read-sites to read the `Subscription` table via `isSubscriptionUsable`. Not needed now.
