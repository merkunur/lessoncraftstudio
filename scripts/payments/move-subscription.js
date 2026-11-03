#!/usr/bin/env node
/**
 * move-subscription.js — move a paid subscription to the account the customer actually signs in with.
 *
 * Usage (on Hetzner, env loaded from frontend/.env.production):
 *   node scripts/payments/move-subscription.js --from=<checkout email> --to=<sign-in email>          # preview
 *   node scripts/payments/move-subscription.js --from=<checkout email> --to=<sign-in email> --apply  # do it
 *
 * Why: the webhook files a new subscription under the CHECKOUT email (route.ts resolveOrCreateUserByEmail);
 * a customer who types another address at checkout gets a second, unused account holding the subscription
 * while their own account stays free (2026-11-03: paid as jroesen@hotmail.com, signs in as jaroesen@gmail.com).
 *
 * What it changes (one transaction): the Subscription row's userId → the sign-in account; that account's
 * legacy subscriptionTier → 'full' when the row grants access; the checkout account's tier → 'free'.
 * Every later webhook (updated / cancelled / payment_success / payment_failed) finds the row by its Lemon
 * Squeezy subscription id, so renewals keep landing on the moved row. Deletes nothing; refuses when the
 * sign-in account already has a subscription row.
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

/** mirrors frontend/lib/entitlements.ts isSubscriptionUsable */
function usable(sub) {
  if (!sub || !sub.lsSubscriptionId) return false;
  if (sub.status === 'active') return true;
  if (sub.status === 'past_due') return !!sub.pastDueAt && Date.now() - new Date(sub.pastDueAt).getTime() < 14 * 864e5;
  if (sub.status === 'canceled') return !!sub.currentPeriodEnd && new Date(sub.currentPeriodEnd).getTime() > Date.now();
  return false;
}

async function main() {
  const arg = (k) => { const a = process.argv.find((x) => x.startsWith(`--${k}=`)); return a ? a.slice(k.length + 3).trim().toLowerCase() : ''; };
  const from = arg('from'), to = arg('to'), apply = process.argv.includes('--apply');
  if (!from || !to || from === to) { console.error('usage: move-subscription.js --from=<email> --to=<email> [--apply]'); process.exit(2); }
  const { PrismaClient } = prismaClient();
  const prisma = new PrismaClient();
  try {
    const find = (email) => prisma.user.findFirst({ where: { email: { equals: email, mode: 'insensitive' } }, include: { subscription: true } });
    const src = await find(from), dst = await find(to);
    if (!src) throw new Error(`no account ${from}`);
    if (!dst) throw new Error(`no account ${to}`);
    const sub = src.subscription;
    if (!sub) throw new Error(`${from} holds no subscription`);
    if (dst.subscription) throw new Error(`${to} already holds a subscription row (${dst.subscription.id}, status ${dst.subscription.status}) — refusing`);
    const grants = usable(sub);
    console.log(`subscription ${sub.id} | ls ${sub.lsSubscriptionId} | ${sub.status} | ${sub.billingInterval} | period end ${sub.currentPeriodEnd ? sub.currentPeriodEnd.toISOString().slice(0, 10) : '-'}`);
    console.log(`  from ${src.email} (id ${src.id}, tier ${src.subscriptionTier}) → to ${dst.email} (id ${dst.id}, tier ${dst.subscriptionTier})`);
    console.log(`  after: ${dst.email} tier '${grants ? 'full' : 'free'}', ${src.email} tier 'free'`);
    if (!apply) { console.log('PREVIEW only — re-run with --apply'); return; }
    await prisma.$transaction([
      prisma.subscription.update({ where: { id: sub.id }, data: { userId: dst.id } }),
      prisma.user.update({ where: { id: dst.id }, data: { subscriptionTier: grants ? 'full' : 'free' } }),
      prisma.user.update({ where: { id: src.id }, data: { subscriptionTier: 'free' } }),
    ]);
    const check = await find(to);
    console.log(`DONE: ${check.email} → subscription ${check.subscription && check.subscription.lsSubscriptionId} (${check.subscription && check.subscription.status}), tier ${check.subscriptionTier}, access ${usable(check.subscription) ? 'YES' : 'NO'}`);
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((e) => { console.error('move-subscription failed:', e.message); process.exit(1); });
