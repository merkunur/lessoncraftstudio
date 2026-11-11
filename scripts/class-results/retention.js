#!/usr/bin/env node
/**
 * Class results — the retention job (Daily Teaching System, Part 9.4; operator ruling 2026-11-11).
 *
 * A class with its children and every result is deleted when
 *   - it has not been used for 14 months (427 days), or
 *   - its teacher's plan ended more than 60 days ago.
 * (A teacher can delete a class, a child or a child's results at any time on the Classes screen; this job is for
 * what nobody came back to.) It also removes attempts a child opened and never checked, after 7 days: they hold no
 * result.
 *
 *   node scripts/class-results/retention.js            says what it would delete, deletes nothing
 *   node scripts/class-results/retention.js --apply    deletes (the daily cron on the server runs this)
 *
 * It prints COUNTS only — never a class name, a child's name or a code. Before the class tables exist (the
 * migration is applied at the dark deploy) it says so and exits 0.
 *
 * The rule lives twice on purpose: frontend/lib/class-results/store.ts `classExpired` + lib/entitlements.ts
 * `isSubscriptionUsable` (what the website runs) and `teacherState` / `expired` below (plain JS, so the server's
 * cron needs no build step). tests/retention.test.js compares the two over a grid of cases, and fails when either
 * side changes alone.
 */
'use strict';
const path = require('path');

const DAY = 24 * 3600 * 1000;
const UNUSED_DAYS = 427;          // = store.ts RETENTION_UNUSED_DAYS (14 months)
const AFTER_PLAN_DAYS = 60;       // = store.ts RETENTION_AFTER_SUBSCRIPTION_DAYS
const GRACE_DAYS = 14;            // = lib/entitlements.ts SUBSCRIPTION_GRACE_DAYS
const OPEN_ATTEMPT_DAYS = 7;

const time = (v) => { if (!v) return null; const t = v instanceof Date ? v.getTime() : Date.parse(v); return Number.isFinite(t) ? t : null; };

/**
 * Is the teacher's plan usable now, and if not, when did it end?
 * @param teacher { isAdmin, subscription: { status, lsSubscriptionId, pastDueAt, currentPeriodEnd, canceledAt, updatedAt } | null }
 * @returns { usable: boolean, endedAt: number | null }   endedAt null = the end date is not known
 */
function teacherState(teacher, now) {
  const t = now.getTime();
  if (teacher && teacher.isAdmin === true) return { usable: true, endedAt: null };
  const sub = teacher && teacher.subscription;
  if (!sub) return { usable: false, endedAt: null };
  if (!sub.lsSubscriptionId) return { usable: false, endedAt: time(sub.updatedAt) };
  if (sub.status === 'active') return { usable: true, endedAt: null };
  if (sub.status === 'past_due') {
    const due = time(sub.pastDueAt);
    if (due !== null && t - due < GRACE_DAYS * DAY) return { usable: true, endedAt: null };
    return { usable: false, endedAt: due !== null ? due + GRACE_DAYS * DAY : time(sub.updatedAt) };
  }
  if (sub.status === 'canceled') {
    const end = time(sub.currentPeriodEnd);
    if (end !== null && end > t) return { usable: true, endedAt: null };
    return { usable: false, endedAt: end !== null ? end : (time(sub.canceledAt) || time(sub.updatedAt)) };
  }
  return { usable: false, endedAt: time(sub.updatedAt) };
}

/** store.ts classExpired, with one addition: a plan whose end date is unknown counts from the class's last use */
function expired(cls, state, now) {
  const t = now.getTime(), used = time(cls.lastUsedAt);
  if (used !== null && t - used > UNUSED_DAYS * DAY) return 'unused';
  if (state.usable) return null;
  const ended = state.endedAt !== null ? state.endedAt : used;
  return ended !== null && t - ended > AFTER_PLAN_DAYS * DAY ? 'plan-ended' : null;
}

/**
 * @param o { prisma, now: Date, apply: boolean, log: (line) => void }
 * @returns { classes, unused, planEnded, seats, attempts, openAttempts, deleted }
 */
async function run(o) {
  const { prisma, now, apply } = o;
  const log = o.log || console.log;
  let rows;
  try {
    rows = await prisma.classroom.findMany({
      select: { id: true, lastUsedAt: true, _count: { select: { seats: true } }, teacher: { select: { isAdmin: true, subscription: { select: { status: true, lsSubscriptionId: true, pastDueAt: true, currentPeriodEnd: true, canceledAt: true, updatedAt: true } } } } },
    });
  } catch (e) {
    if (/does not exist|P2021/.test(String(e && (e.code || '') + ' ' + e.message))) { log('retention: the class tables do not exist yet (migration not applied): nothing to do'); return { classes: 0, unused: 0, planEnded: 0, seats: 0, attempts: 0, openAttempts: 0, deleted: 0, noTables: true }; }
    throw e;
  }
  const out = { classes: rows.length, unused: 0, planEnded: 0, seats: 0, attempts: 0, openAttempts: 0, deleted: 0 };
  const gone = [];
  for (const c of rows) {
    const why = expired(c, teacherState(c.teacher, now), now);
    if (!why) continue;
    if (why === 'unused') out.unused++; else out.planEnded++;
    out.seats += c._count.seats;
    gone.push(c.id);
  }
  if (gone.length) out.attempts = await prisma.classAttempt.count({ where: { assignment: { classId: { in: gone } } } });
  const stale = { reportedAt: null, createdAt: { lt: new Date(now.getTime() - OPEN_ATTEMPT_DAYS * DAY) } };
  out.openAttempts = await prisma.classAttempt.count({ where: stale });
  if (apply) {
    for (const id of gone) { await prisma.classroom.delete({ where: { id } }); out.deleted++; } // seats, assignments and attempts cascade
    await prisma.classAttempt.deleteMany({ where: stale });
  }
  log(`retention ${now.toISOString().slice(0, 10)} ${apply ? 'APPLIED' : 'dry run'}: ${out.classes} classes read; ${out.unused} unused for ${UNUSED_DAYS} days + ${out.planEnded} whose plan ended ${AFTER_PLAN_DAYS}+ days ago ${apply ? 'deleted' : 'would be deleted'} (${out.seats} children, ${out.attempts} results); ${out.openAttempts} never-checked attempts older than ${OPEN_ATTEMPT_DAYS} days ${apply ? 'removed' : 'would be removed'}`);
  return out;
}

if (require.main === module) {
  const { PrismaClient } = require(path.resolve(__dirname, '..', '..', 'frontend', 'node_modules', '@prisma', 'client'));
  const prisma = new PrismaClient();
  run({ prisma, now: new Date(), apply: process.argv.includes('--apply') })
    .then(() => prisma.$disconnect())
    .catch(async (e) => { console.error('retention FAILED: ' + (e && e.message)); try { await prisma.$disconnect(); } catch (e2) { /* closing */ } process.exit(1); });
}
module.exports = { run, teacherState, expired, UNUSED_DAYS, AFTER_PLAN_DAYS, GRACE_DAYS, OPEN_ATTEMPT_DAYS };
