#!/usr/bin/env node
/**
 * Create (or refresh) a NON-ADMIN test subscriber account so the operator can
 * test the real subscriber path (unlimited play/downloads, hosted worksheets,
 * no admin bypass). Idempotent: upserts by email; (re)writes an active
 * Subscription that satisfies isSubscriptionUsable (status='active' +
 * lsSubscriptionId set, currentPeriodEnd +1yr).
 *
 * Run on Hetzner:
 *   cd /opt/lessoncraftstudio/frontend && node ../scripts/ops/create-test-subscriber.js <email> <password>
 */
'use strict';
const path = require('path');
const bcrypt = require(path.resolve(process.cwd(), 'node_modules/bcryptjs'));
const { PrismaClient } = require(path.resolve(process.cwd(), 'node_modules/@prisma/client'));
const prisma = new PrismaClient();

async function main() {
  const email = (process.argv[2] || '').trim().toLowerCase();
  const password = process.argv[3] || '';
  if (!email || !password) {
    console.error('usage: node create-test-subscriber.js <email> <password>');
    process.exit(1);
  }

  const passwordHash = await bcrypt.hash(password, 12);

  const user = await prisma.user.upsert({
    where: { email },
    update: { passwordHash, emailVerified: true, isAdmin: false },
    create: {
      email,
      passwordHash,
      firstName: 'Test',
      lastName: 'Subscriber',
      emailVerified: true,
      emailVerifiedAt: new Date(),
      isAdmin: false,
    },
    select: { id: true, email: true, isAdmin: true },
  });

  const now = new Date();
  const end = new Date(now.getTime() + 365 * 24 * 60 * 60 * 1000);
  await prisma.subscription.upsert({
    where: { userId: user.id },
    update: {
      status: 'active',
      lsSubscriptionId: 'test-sub-' + user.id.slice(0, 12),
      lsVariantId: '1866999',
      planName: 'lcs-subscription',
      billingInterval: 'yearly',
      currentPeriodStart: now,
      currentPeriodEnd: end,
      cancelAtPeriodEnd: false,
      canceledAt: null,
      pastDueAt: null,
    },
    create: {
      userId: user.id,
      status: 'active',
      lsSubscriptionId: 'test-sub-' + user.id.slice(0, 12),
      lsVariantId: '1866999',
      planName: 'lcs-subscription',
      billingInterval: 'yearly',
      currentPeriodStart: now,
      currentPeriodEnd: end,
      cancelAtPeriodEnd: false,
    },
  });

  console.log('OK — non-admin subscriber ready:');
  console.log('  email:   ' + user.email);
  console.log('  isAdmin: ' + user.isAdmin);
  console.log('  sub:     active until ' + end.toISOString().slice(0, 10));
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
