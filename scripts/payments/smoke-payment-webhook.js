#!/usr/bin/env node
/**
 * Payment webhook canary — post-deploy self-test of the live Lemon Squeezy payment path.
 *
 * Runs AFTER the release flip (needs the new code serving). Proves, end-to-end, that a
 * real purchase would still activate a subscriber after this deploy:
 *   1. A correctly SIGNED synthetic `subscription_created` (LIVE yearly product id) →
 *      the webhook must return 200 AND create an ACTIVE Subscription AND bridge
 *      user.subscriptionTier -> 'full'. (Verifies signature check + product allowlist +
 *      subscription upsert + the subscriptionTier bridge all still work.)
 *   2. A BAD-signature event → the webhook must return 401 (signature enforcement intact —
 *      a forged webhook is still rejected).
 * Then it cleans up its own smoke Subscription + webhook-event rows, leaving only a single
 * bare internal user `deploy-smoke@lcs.internal` (created emailVerified so no setup email is
 * ever sent; the account has a non-bcrypt passwordHash so it can never be logged into).
 *
 * Reads LEMONSQUEEZY_WEBHOOK_SECRET + DATABASE_URL from process.env — deploy.sh sources
 * frontend/.env.production before invoking (same as the deck-url-drift check). Run from the
 * frontend/ cwd so @prisma/client resolves. Exit 0 = payments healthy, 1 = broken.
 *
 * deploy.sh runs this WARN-only (post-flip can't un-deploy); a failure prints a loud
 * "!!! PAYMENT CANARY FAILED" line so it is never silent. See CLAUDE.md §A payment protection.
 */
const crypto = require('crypto');
const http = require('http');
const path = require('path');
// Node resolves modules relative to THIS file's dir (scripts/payments/), not the cwd, and the
// generated Prisma client lives in frontend/node_modules (where `prisma generate` writes it).
// Resolve it explicitly so the canary works when deploy.sh runs it by absolute path.
const { PrismaClient } = require(path.resolve(__dirname, '..', '..', 'frontend', 'node_modules', '@prisma', 'client'));

const SECRET = process.env.LEMONSQUEEZY_WEBHOOK_SECRET;
const PORT = Number(process.env.PORT) || 3000;
const ROUTE = '/api/webhooks/lemonsqueezy';
const EMAIL = 'deploy-smoke@lcs.internal';
const LIVE_YEARLY_PRODUCT_ID = 1194166; // SUBSCRIPTION_PRODUCT.productId
const LIVE_YEARLY_VARIANT_ID = 1866999;

function post(bodyObj, eventId, { badSig = false } = {}) {
  return new Promise((resolve) => {
    const body = JSON.stringify(bodyObj);
    let sig = crypto.createHmac('sha256', SECRET).update(body).digest('hex');
    if (badSig) {
      // flip the last hex char → guaranteed-different, valid-length signature
      const last = sig.slice(-1);
      sig = sig.slice(0, -1) + (last === 'a' ? 'b' : 'a');
    }
    const req = http.request(
      {
        host: '127.0.0.1', port: PORT, path: ROUTE, method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Signature': sig,
          'X-Event-Id': eventId,
          'Content-Length': Buffer.byteLength(body),
        },
      },
      (res) => { let d = ''; res.on('data', (c) => (d += c)); res.on('end', () => resolve({ code: res.statusCode, body: d.slice(0, 80) })); }
    );
    req.on('error', (e) => resolve({ code: 0, body: e.message }));
    req.write(body);
    req.end();
  });
}

(async () => {
  if (!SECRET) {
    console.error('PAYMENT CANARY: LEMONSQUEEZY_WEBHOOK_SECRET not present in env — cannot verify payments.');
    process.exit(1);
  }
  const prisma = new PrismaClient();
  const stamp = `canary-${Date.now()}`;
  const lsSubId = `smoke-${Date.now()}`;
  const fails = [];
  try {
    // 1. ensure the fixed internal user exists (verified → no email; non-hash password → no login)
    const user = await prisma.user.upsert({
      where: { email: EMAIL },
      update: {},
      create: {
        email: EMAIL,
        passwordHash: 'x-canary-not-a-real-hash-no-login',
        firstName: 'Deploy',
        lastName: 'Canary',
        emailVerified: true,
        emailVerifiedAt: new Date(),
      },
    });
    await prisma.subscription.deleteMany({ where: { userId: user.id } });

    // 2. correctly-signed subscription_created (LIVE product) → 200 + active + tier full
    const evt = {
      meta: { event_name: 'subscription_created', test_mode: false },
      data: {
        id: lsSubId,
        attributes: {
          product_id: LIVE_YEARLY_PRODUCT_ID,
          variant_id: LIVE_YEARLY_VARIANT_ID,
          user_email: EMAIL,
          user_name: 'Deploy Canary',
          status: 'active',
          renews_at: new Date(Date.now() + 365 * 864e5).toISOString(),
        },
      },
    };
    const r1 = await post(evt, `${stamp}-created`);
    if (r1.code !== 200) fails.push(`signed subscription_created → HTTP ${r1.code} (expected 200): ${r1.body}`);
    await new Promise((r) => setTimeout(r, 800)); // let the handler finish
    const after = await prisma.user.findUnique({ where: { email: EMAIL }, include: { subscription: true } });
    if (!after || !after.subscription || after.subscription.status !== 'active') {
      fails.push(`no ACTIVE subscription created (status=${after && after.subscription && after.subscription.status})`);
    }
    if (!after || after.subscriptionTier !== 'full') {
      fails.push(`subscriptionTier not bridged to 'full' (got '${after && after.subscriptionTier}')`);
    }

    // 3. bad signature → must be rejected 401 (forgery protection intact)
    const r2 = await post(evt, `${stamp}-badsig`, { badSig: true });
    if (r2.code !== 401) fails.push(`bad-signature event → HTTP ${r2.code} (expected 401)`);

    // 4. cleanup — remove the smoke subscription, reset the bridged tier, drop this run's
    //    event rows; leave only a bare internal free-tier user (no active-sub/full-tier drift).
    await prisma.subscription.deleteMany({ where: { userId: user.id } });
    await prisma.user.update({ where: { id: user.id }, data: { subscriptionTier: 'free' } });
    try {
      await prisma.lSWebhookEvent.deleteMany({
        where: { eventId: { in: [`ls_event_${stamp}-created`, `ls_event_${stamp}-badsig`] } },
      });
    } catch (_) { /* event-log cleanup is best-effort */ }
  } catch (e) {
    fails.push(`canary threw: ${e.message}`);
  } finally {
    await prisma.$disconnect();
  }

  if (fails.length) {
    console.error('PAYMENT CANARY FAILED:\n  - ' + fails.join('\n  - '));
    process.exit(1);
  }
  console.log('PAYMENT CANARY: OK — signed activation + tier-bridge + bad-signature rejection all verified.');
  process.exit(0);
})();
