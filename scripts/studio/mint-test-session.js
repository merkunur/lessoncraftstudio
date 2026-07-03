#!/usr/bin/env node
/* =====================================================================
   mint-test-session.js — mint (or revoke) a short-lived admin session for
   the Story Studio live verification (prove-studio-tenant.js), WITHOUT
   needing any password. Server-side only (needs .env.production's JWT
   secret + DB). Writes ONLY a sessions row — never touches user data.

   USAGE (on Hetzner, from /opt/lessoncraftstudio/frontend with env loaded):
     node ../scripts/studio/mint-test-session.js            # prints a token
     node ../scripts/studio/mint-test-session.js --revoke   # deletes the
                                                            # sessions it made
   Then from any machine:
     LCS_BASE_URL=https://www.lessoncraftstudio.com \
     LCS_TEST_TOKEN=<token> node scripts/storybook/prove-studio-tenant.js
   ===================================================================== */
'use strict';
const path = require('path');

const FRONTEND = path.resolve(__dirname, '..', '..', 'frontend');
const { PrismaClient } = require(path.join(FRONTEND, 'node_modules', '@prisma', 'client'));
const jwt = require(path.join(FRONTEND, 'node_modules', 'jsonwebtoken'));
const crypto = require('crypto');

const prisma = new PrismaClient();
const REVOKE = process.argv.includes('--revoke');
const MARKER = 'studio-verify';
const TTL_MIN = 60;

(async () => {
  if (REVOKE) {
    const gone = await prisma.session.deleteMany({ where: { deviceName: MARKER } });
    console.log('[mint-test-session] revoked ' + gone.count + ' verification session(s)');
    await prisma.$disconnect();
    return;
  }

  const secret = process.env.JWT_SECRET || process.env.JWT_ACCESS_SECRET;
  if (!secret) {
    console.error('JWT secret env missing — run with .env.production sourced (set -a; source .env.production; set +a)');
    process.exit(2);
  }

  const admin = await prisma.user.findFirst({
    where: { isAdmin: true },
    select: { id: true, email: true, subscriptionTier: true, isAdmin: true },
    orderBy: { createdAt: 'asc' },
  });
  if (!admin) {
    console.error('No admin user found');
    process.exit(2);
  }

  const expiresAt = new Date(Date.now() + TTL_MIN * 60 * 1000);
  const token = jwt.sign(
    { userId: admin.id, email: admin.email, subscriptionTier: admin.subscriptionTier, isAdmin: true },
    secret,
    { expiresIn: TTL_MIN + 'm' }
  );

  await prisma.session.create({
    data: {
      userId: admin.id,
      token,
      refreshToken: crypto.randomBytes(32).toString('hex'),
      expiresAt,
      deviceName: MARKER,
    },
  });

  console.log('[mint-test-session] admin=' + admin.email + ' expires=' + expiresAt.toISOString());
  console.log('TOKEN=' + token);
  await prisma.$disconnect();
})().catch(e => { console.error('[mint-test-session] ' + (e.stack || e)); process.exit(1); });
