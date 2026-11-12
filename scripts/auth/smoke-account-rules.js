#!/usr/bin/env node
/**
 * Live self-test of the account rules of the meter (operator rulings 2026-11-12; frontend/lib/quota.ts):
 *   - an activity or a classroom tool needs an account (an anonymous play is answered "signup_required");
 *   - what needs an account needs an account whose e-mail is CONFIRMED ("verify_required");
 *   - an interactive worksheet plays without either;
 *   - a confirmation link is good for 24 hours from when it was SENT, not from when the account was made.
 *
 * Runs ON THE SERVER after a deploy, against the running site on 127.0.0.1 (the payment canary's pattern):
 *   cd /opt/lessoncraftstudio/frontend && set -a && . ./.env.production && set +a && node ../scripts/auth/smoke-account-rules.js
 *   … --confirm-link   also opens a fresh confirmation link of a two-day-old account (the site then sends its welcome
 *                      mail to the internal address, which goes nowhere; so only on request)
 *
 * It makes ONE internal account (account-rule-smoke@lcs.internal, a random password that is never printed or kept),
 * signs it in through the real sign-in route, asks the real meter, and removes the account and everything it wrote.
 * No real account is read. Exit 0 = every rule holds, 1 = a rule is broken, 2 = the test could not run.
 */
'use strict';
const crypto = require('crypto');
const path = require('path');
const FRONT = path.resolve(__dirname, '..', '..', 'frontend');
const { PrismaClient } = require(path.join(FRONT, 'node_modules', '@prisma', 'client'));
const bcrypt = require(path.join(FRONT, 'node_modules', 'bcryptjs'));
const BASE = 'http://127.0.0.1:' + (Number(process.env.PORT) || 3000);
const EMAIL = 'account-rule-smoke@lcs.internal';
const UA = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36';
const prisma = new PrismaClient();
let bad = 0;
const check = (ok, what) => { console.log((ok ? 'ok    ' : 'FAIL  ') + what); if (!ok) bad++; };

async function call(method, url, { body, token } = {}) {
  const res = await fetch(BASE + url, { method, redirect: 'manual', headers: { 'Content-Type': 'application/json', 'User-Agent': UA, ...(token ? { Authorization: 'Bearer ' + token } : {}) }, body: body ? JSON.stringify(body) : undefined });
  let json = {}; try { json = await res.json(); } catch { /* not JSON */ }
  return { status: res.status, json, location: res.headers.get('location') || '' };
}
const meter = (body, token) => call('POST', '/api/quota/check-and-increment', { body, token });

async function cleanup() {
  const u = await prisma.user.findUnique({ where: { email: EMAIL } });
  if (!u) return;
  for (const model of ['session', 'usageQuota', 'activityLog']) { try { await prisma[model].deleteMany({ where: { userId: u.id } }); } catch { /* the table has no such rows */ } }
  await prisma.user.delete({ where: { id: u.id } });
}

(async () => {
  if (process.env.METERING_ENABLED !== '1') { console.log('the meter is switched off in this environment: nothing to test'); process.exit(2); }
  await cleanup();

  // ---- a visitor without an account ----
  let r = await meter({ kind: 'play', surface: 'activity' });
  check(r.status === 401 && r.json.reason === 'signup_required', 'no account: an activity play is answered "sign up" (' + r.status + ' ' + r.json.reason + ')');
  r = await meter({ kind: 'play', surface: 'tool' });
  check(r.status === 401 && r.json.reason === 'signup_required', 'no account: a tool play is answered "sign up"');
  r = await meter({ kind: 'play' });
  check(r.status === 200 || r.status === 402, 'no account: an interactive worksheet is not asked for an account (' + r.status + ')');

  // ---- an account that has not confirmed its e-mail ----
  const password = crypto.randomBytes(18).toString('base64url');
  const twoDaysAgo = new Date(Date.now() - 48 * 3600 * 1000);
  const oldToken = crypto.randomBytes(32).toString('hex'); // the form of a token from before 2026-11-12: no time in it
  const user = await prisma.user.create({ data: { email: EMAIL, passwordHash: await bcrypt.hash(password, 10), firstName: 'Account', lastName: 'Canary', emailVerified: false, verificationToken: oldToken, createdAt: twoDaysAgo } });
  const signin = await call('POST', '/api/auth/signin', { body: { email: EMAIL, password, deviceId: 'account-rule-smoke-' + crypto.randomBytes(6).toString('hex') } });
  const token = signin.json.accessToken;
  if (!token) { console.log('FAIL  the test account could not sign in (' + signin.status + ' ' + (signin.json.error || '') + ')'); await cleanup(); process.exit(2); }

  r = await meter({ kind: 'play', surface: 'activity' }, token);
  check(r.status === 401 && r.json.reason === 'verify_required', 'unconfirmed account: an activity play is answered "confirm your e-mail" (' + r.status + ' ' + r.json.reason + ')');
  r = await meter({ kind: 'play', surface: 'tool' }, token);
  check(r.status === 401 && r.json.reason === 'verify_required', 'unconfirmed account: a tool play is answered "confirm your e-mail"');
  r = await meter({ kind: 'download' }, token);
  check(r.status === 401 && r.json.reason === 'verify_required', 'unconfirmed account: a download is answered "confirm your e-mail" (' + r.status + ' ' + r.json.reason + ')');
  r = await meter({ kind: 'make' }, token);
  check(r.status === 401 && r.json.reason === 'verify_required', 'unconfirmed account: a make is answered "confirm your e-mail"');
  r = await meter({ kind: 'play' }, token);
  check(r.status === 200, 'unconfirmed account: an interactive worksheet still plays (' + r.status + ')');
  const counted = await prisma.usageQuota.findMany({ where: { userId: user.id } });
  check(counted.every((q) => q.kind === 'play') && counted.reduce((n, q) => n + q.actionCount, 0) === 1, 'unconfirmed account: nothing was counted but the one worksheet play');
  r = await call('GET', '/api/quota/status', { token });
  check(r.json.kind === 'free-user' && typeof r.json.make?.remaining === 'number' && r.json.make.remaining > 0, 'unconfirmed account: the read-only status still reports the numbers (the makers read it)');

  // ---- the confirmation link ----
  r = await call('POST', '/api/auth/verify-email', { body: { token: oldToken } });
  check(r.status === 400 && /expired/i.test(r.json.error || ''), 'an old-form link of a two-day-old account is refused as expired (' + r.status + ')');
  const stale = crypto.randomBytes(32).toString('hex') + '.' + (Date.now() - 25 * 3600 * 1000).toString(36);
  await prisma.user.update({ where: { id: user.id }, data: { verificationToken: stale } });
  r = await call('POST', '/api/auth/verify-email', { body: { token: stale } });
  check(r.status === 400 && /expired/i.test(r.json.error || ''), 'a link sent 25 hours ago is refused as expired (' + r.status + ')');
  if (process.argv.includes('--confirm-link')) {
    const fresh = crypto.randomBytes(32).toString('hex') + '.' + (Date.now() - 60 * 1000).toString(36);
    await prisma.user.update({ where: { id: user.id }, data: { verificationToken: fresh } });
    r = await call('POST', '/api/auth/verify-email', { body: { token: fresh } });
    const after = await prisma.user.findUnique({ where: { id: user.id } });
    check(r.status === 200 && after.emailVerified === true && !!after.emailVerifiedAt, 'a link sent a minute ago confirms a two-day-old account, and the time is written (' + r.status + ')');
  } else {
    await prisma.user.update({ where: { id: user.id }, data: { emailVerified: true, emailVerifiedAt: new Date(), verificationToken: null } });
  }

  // ---- the same account, confirmed ----
  r = await meter({ kind: 'play', surface: 'activity' }, token);
  check(r.status === 200, 'confirmed account: an activity plays (' + r.status + ' ' + (r.json.reason || '') + ')');
  r = await meter({ kind: 'play', surface: 'tool' }, token);
  check(r.status === 200, 'confirmed account: a tool plays');
  r = await meter({ kind: 'download' }, token);
  check(r.status === 200 && r.json.remaining === 2, 'confirmed account: a download is given and counted (' + r.status + ', ' + r.json.remaining + ' left)');
  // the eleventh play of the day is refused: the activity and tool plays share the worksheets' counter
  let last = null;
  for (let i = 0; i < 9; i++) last = await meter({ kind: 'play', surface: 'activity' }, token);
  check(last.status === 402 && last.json.reason === 'quota_exceeded', 'confirmed account: the eleventh play of the day is refused (' + last.status + ' ' + (last.json.reason || '') + ')');

  await cleanup();
  check(!(await prisma.user.findUnique({ where: { email: EMAIL } })), 'the test account and everything it wrote are removed');
  console.log(bad ? bad + ' rule(s) broken' : 'account rules: all hold');
  await prisma.$disconnect();
  process.exit(bad ? 1 : 0);
})().catch(async (e) => { console.log('the test could not run: ' + (e && e.message)); try { await cleanup(); } catch { /* nothing more to do */ } await prisma.$disconnect(); process.exit(2); });
