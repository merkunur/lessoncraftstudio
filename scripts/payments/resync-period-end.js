#!/usr/bin/env node
/**
 * resync-period-end.js — sets every LS subscription's currentPeriodEnd to Lemon Squeezy's own date.
 *
 * Why (2026-10-30): on renewal LS sends only subscription_payment_success, and the webhook used to
 * leave currentPeriodEnd at the PREVIOUS period, so the workspace showed "Renews on" a past date.
 * The webhook now fetches renews_at on every renewal; this script repairs the rows written before.
 *
 * Target date per LS status: active / on_trial / past_due / unpaid / paused → renews_at;
 * cancelled / expired → ends_at. Only currentPeriodEnd is written; status, tier and everything
 * else are left alone. Rows whose LS lookup fails are reported and skipped.
 *
 * Usage (on the server, env loaded the way deploy.sh loads it):
 *   ( set -a; . /opt/lessoncraftstudio/frontend/.env.production; set +a; node scripts/payments/resync-period-end.js [--apply] )
 * Without --apply it only prints what it would change.
 */
const path = require('path');
const { PrismaClient } = require(path.resolve(__dirname, '..', '..', 'frontend', 'node_modules', '@prisma', 'client'));

const APPLY = process.argv.includes('--apply');
const KEY = process.env.LEMONSQUEEZY_API_KEY;
const DAY = (d) => (d ? new Date(d).toISOString().slice(0, 10) : '—');

async function lsSubscription(id) {
  const res = await fetch(`https://api.lemonsqueezy.com/v1/subscriptions/${id}`, {
    headers: { Authorization: `Bearer ${KEY}`, Accept: 'application/vnd.api+json' },
  });
  if (!res.ok) throw new Error('HTTP ' + res.status);
  return (await res.json()).data.attributes;
}

(async () => {
  if (!KEY) { console.error('LEMONSQUEEZY_API_KEY not in env — load frontend/.env.production first.'); process.exit(2); }
  const prisma = new PrismaClient();
  let changed = 0, same = 0, failed = 0;
  try {
    const rows = await prisma.subscription.findMany({ where: { lsSubscriptionId: { not: null } }, select: { id: true, lsSubscriptionId: true, status: true, currentPeriodEnd: true } });
    for (const r of rows) {
      let a;
      try { a = await lsSubscription(r.lsSubscriptionId); } catch (e) { failed++; console.log(`${r.lsSubscriptionId}  LOOKUP FAILED (${e.message}) — skipped`); continue; }
      const raw = ['cancelled', 'expired'].includes(a.status) ? a.ends_at : a.renews_at;
      const target = raw ? new Date(raw) : null;
      if (!target || isNaN(target.getTime())) { failed++; console.log(`${r.lsSubscriptionId}  LS ${a.status} has no usable date — skipped`); continue; }
      if (r.currentPeriodEnd && new Date(r.currentPeriodEnd).getTime() === target.getTime()) { same++; continue; }
      changed++;
      console.log(`${r.lsSubscriptionId}  LS ${a.status} / ours ${r.status}: ${DAY(r.currentPeriodEnd)} → ${DAY(target)}${APPLY ? '' : '  (dry run)'}`);
      if (APPLY) await prisma.subscription.update({ where: { id: r.id }, data: { currentPeriodEnd: target } });
    }
    console.log(`resync-period-end: ${rows.length} LS subscriptions — ${changed} ${APPLY ? 'updated' : 'would change'}, ${same} already right, ${failed} skipped`);
  } finally {
    await prisma.$disconnect();
  }
  process.exit(failed ? 1 : 0);
})().catch((e) => { console.error(e); process.exit(1); });
