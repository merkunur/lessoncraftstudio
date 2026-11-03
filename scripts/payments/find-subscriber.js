#!/usr/bin/env node
/**
 * find-subscriber.js — READ-ONLY diagnosis of "I paid but I am still blocked".
 *
 * Usage (on Hetzner, env loaded from frontend/.env.production):
 *   node scripts/payments/find-subscriber.js <term> [<term> …]
 *
 * Each term is matched case-insensitively against user email / first / last name, against the raw
 * payload of every Lemon Squeezy webhook event we stored, and against the store's subscriptions in
 * the Lemon Squeezy API (user_name / user_email). For every match it prints:
 *   - our user: email, tier, last login, its Subscription row and whether that row grants access;
 *   - our webhook events that mention the term (type, status, error, buyer email, product, LS sub id);
 *   - the LS subscriptions that mention the term, and which of OUR users (if any) holds each one.
 * The usual causes it separates: a purchase made with a different email than the account the customer
 * signs in with (the webhook then created a second account for the checkout email); a webhook that never
 * arrived or failed; a product id outside the allowlist.
 *
 * Writes nothing.
 */
'use strict';
const path = require('path');
const fs = require('fs');

function prismaClient() {
  const candidates = [
    process.env.PRISMA_CLIENT_PATH,
    path.resolve(__dirname, '..', '..', 'frontend', 'node_modules', '@prisma', 'client'),
    '/opt/lessoncraftstudio/frontend/node_modules/@prisma/client',
  ].filter(Boolean);
  for (const c of candidates) { if (fs.existsSync(c)) return require(c); }
  throw new Error('cannot find @prisma/client');
}

const GRACE_DAYS = 14;
/** mirrors frontend/lib/entitlements.ts isSubscriptionUsable (kept in step by hand; read-only use) */
function usable(sub, isAdmin) {
  if (isAdmin) return 'yes (admin)';
  if (!sub) return 'NO — no subscription row';
  if (!sub.lsSubscriptionId) return 'NO — row has no Lemon Squeezy id';
  const t = (v) => (v ? new Date(v).getTime() : null);
  if (sub.status === 'active') return 'yes (active)';
  if (sub.status === 'past_due') {
    const p = t(sub.pastDueAt);
    return p !== null && Date.now() - p < GRACE_DAYS * 864e5 ? 'yes (past_due, in grace)' : 'NO — past_due beyond grace';
  }
  if (sub.status === 'canceled') {
    const e = t(sub.currentPeriodEnd);
    return e !== null && e > Date.now() ? 'yes (canceled, paid through ' + new Date(e).toISOString().slice(0, 10) + ')' : 'NO — canceled and expired';
  }
  return 'NO — status ' + sub.status;
}

async function lsSubscriptions() {
  const key = process.env.LEMONSQUEEZY_API_KEY, store = process.env.LEMONSQUEEZY_STORE_ID;
  if (!key || !store) return { error: 'LEMONSQUEEZY_API_KEY / STORE_ID not in env' };
  const out = [];
  for (let page = 1; page <= 10; page++) {
    const url = `https://api.lemonsqueezy.com/v1/subscriptions?filter[store_id]=${encodeURIComponent(store)}&page[size]=100&page[number]=${page}`;
    const res = await fetch(url, { headers: { Authorization: `Bearer ${key}`, Accept: 'application/vnd.api+json' } });
    if (!res.ok) return { error: `LS API ${res.status}`, list: out };
    const j = await res.json();
    out.push(...(j.data || []));
    if (!j.meta || !j.meta.page || page >= j.meta.page.lastPage) break;
  }
  return { list: out };
}

async function main() {
  const terms = process.argv.slice(2).map((t) => t.toLowerCase()).filter(Boolean);
  if (!terms.length) { console.error('usage: find-subscriber.js <term> [<term> …]'); process.exit(2); }
  const { PrismaClient } = prismaClient();
  const prisma = new PrismaClient();
  try {
    console.log(`== terms: ${terms.join(', ')}   (now ${new Date().toISOString()})`);

    // 1) our users
    const users = await prisma.user.findMany({
      where: { OR: terms.flatMap((t) => [
        { email: { contains: t, mode: 'insensitive' } },
        { firstName: { contains: t, mode: 'insensitive' } },
        { lastName: { contains: t, mode: 'insensitive' } },
      ]) },
      include: { subscription: true },
      orderBy: { createdAt: 'asc' },
    });
    console.log(`\n== OUR USERS (${users.length})`);
    for (const u of users) {
      const s = u.subscription;
      console.log(`- ${u.email} | id ${u.id} | name ${u.firstName || ''} ${u.lastName || ''} | created ${u.createdAt.toISOString().slice(0, 16)} | last login ${u.lastLoginAt ? u.lastLoginAt.toISOString().slice(0, 16) : 'never'} | tier ${u.subscriptionTier}${u.isSuspended ? ' | SUSPENDED' : ''}`);
      console.log(`    subscription: ${s ? `status ${s.status} | ls ${s.lsSubscriptionId} | variant ${s.lsVariantId} | ${s.billingInterval} | period end ${s.currentPeriodEnd ? s.currentPeriodEnd.toISOString().slice(0, 10) : '-'} | created ${s.createdAt.toISOString().slice(0, 16)}` : 'none'}`);
      console.log(`    access: ${usable(s, u.isAdmin)}`);
    }

    // 2) our webhook events whose payload mentions a term
    const evs = [];
    for (const t of terms) {
      const rows = await prisma.$queryRawUnsafe(
        `SELECT event_id, event_type, status, error_message, processed_at, payload FROM ls_webhook_events WHERE payload::text ILIKE $1 ORDER BY processed_at ASC`, `%${t}%`);
      for (const r of rows) if (!evs.some((e) => e.event_id === r.event_id)) evs.push(r);
    }
    console.log(`\n== OUR WEBHOOK EVENTS mentioning a term (${evs.length})`);
    for (const e of evs) {
      const a = (e.payload && e.payload.data && e.payload.data.attributes) || {};
      console.log(`- ${new Date(e.processed_at).toISOString().slice(0, 16)} ${e.event_type} | ${e.status}${e.error_message ? ' | ERROR ' + e.error_message : ''} | buyer ${a.user_email || a.customer_email || '-'} | product ${a.product_id || '-'} | ls id ${e.payload && e.payload.data ? e.payload.data.id : '-'} | ls status ${a.status || '-'}`);
    }

    // 2b) the latest subscription_* events overall (to see whether any arrive at all, and failures)
    const recent = await prisma.$queryRawUnsafe(
      `SELECT event_type, status, error_message, processed_at FROM ls_webhook_events WHERE processed_at > now() - interval '30 days' ORDER BY processed_at DESC LIMIT 15`);
    console.log(`\n== LAST 30 DAYS: newest webhook events (any customer; types/status only)`);
    for (const r of recent) console.log(`- ${new Date(r.processed_at).toISOString().slice(0, 16)} ${r.event_type} | ${r.status}${r.error_message ? ' | ERROR ' + r.error_message : ''}`);

    // 3) Lemon Squeezy's own record
    const ls = await lsSubscriptions();
    if (ls.error) console.log(`\n== LEMON SQUEEZY: ${ls.error}`);
    const hits = (ls.list || []).filter((s) => terms.some((t) => `${s.attributes.user_name} ${s.attributes.user_email}`.toLowerCase().includes(t)));
    console.log(`\n== LEMON SQUEEZY SUBSCRIPTIONS mentioning a term (${hits.length} of ${(ls.list || []).length} in the store)`);
    for (const s of hits) {
      const a = s.attributes;
      const ours = await prisma.subscription.findUnique({ where: { lsSubscriptionId: String(s.id) }, include: { user: { select: { email: true } } } });
      console.log(`- ls ${s.id} | ${a.user_name} <${a.user_email}> | product ${a.product_id} (${a.product_name}) variant ${a.variant_id} | status ${a.status} | created ${String(a.created_at).slice(0, 16)} | renews ${String(a.renews_at || '').slice(0, 10)}`);
      console.log(`    in our DB: ${ours ? `YES → user ${ours.user.email} (status ${ours.status})` : 'NO ROW'}`);
    }
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((e) => { console.error('find-subscriber failed:', e.message); process.exit(1); });
