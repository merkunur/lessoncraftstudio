#!/usr/bin/env node
/**
 * The retention job and the backup step (scripts/class-results/retention.js, strip-class-data.js).
 *
 *   node scripts/class-results/tests/retention.test.js        exit 1 on any failure
 *
 * 1. The job's plain-JS rule agrees with what the website runs (store.ts classExpired + entitlements.ts
 *    isSubscriptionUsable), over a grid of plans and dates — so neither side can change alone.
 * 2. The job over a stand-in database: what is deleted, what stays, a dry run deletes nothing, the log holds
 *    counts and never a name, and before the tables exist it does nothing.
 * 3. The backup step on a made dump: class rows leave dumps older than 35 days, everything else stays byte for
 *    byte, a recent dump is untouched, a second run reads nothing again, and a row of another table that LOOKS like
 *    a class block header is not touched.
 */
'use strict';
const fs = require('fs');
const os = require('os');
const path = require('path');
const zlib = require('zlib');
const REPO = path.join(__dirname, '..', '..', '..');
const esbuild = require(path.join(REPO, 'node_modules', 'esbuild'));
const R = require('../retention.js');
const strip = require('../strip-class-data.js');

let fails = 0, n = 0;
const ok = (cond, name, extra) => { n++; if (!cond) { fails++; console.log('FAIL  ' + name + (extra === undefined ? '' : ' — ' + JSON.stringify(extra).slice(0, 400))); } };

const out = path.join(REPO, 'out', 'class-results', '_tests', 'retention.bundle.js');
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(path.join(path.dirname(out), 'retention-entry.ts'), "export { classExpired, RETENTION_UNUSED_DAYS, RETENTION_AFTER_SUBSCRIPTION_DAYS } from '" + path.join(REPO, 'frontend/lib/class-results/store.ts').replace(/\\/g, '/') + "';\nexport { isSubscriptionUsable, SUBSCRIPTION_GRACE_DAYS } from '" + path.join(REPO, 'frontend/lib/entitlements.ts').replace(/\\/g, '/') + "';\n");
esbuild.buildSync({ entryPoints: [path.join(path.dirname(out), 'retention-entry.ts')], bundle: true, platform: 'node', format: 'cjs', outfile: out, logLevel: 'error' });
const W = require(out);

const DAY = 24 * 3600 * 1000;
const NOW = new Date('2026-11-11T08:00:00Z');
const ago = (d) => new Date(NOW.getTime() - d * DAY);

(async () => {
  // ── 1. the two copies of the rule ──
  ok(R.UNUSED_DAYS === W.RETENTION_UNUSED_DAYS && R.AFTER_PLAN_DAYS === W.RETENTION_AFTER_SUBSCRIPTION_DAYS && R.GRACE_DAYS === W.SUBSCRIPTION_GRACE_DAYS, 'the job and the website use the same three numbers', [R.UNUSED_DAYS, W.RETENTION_UNUSED_DAYS, R.AFTER_PLAN_DAYS, W.RETENTION_AFTER_SUBSCRIPTION_DAYS, R.GRACE_DAYS, W.SUBSCRIPTION_GRACE_DAYS]);
  const days = [-400, -61, -59, -15, -13, -1, 1, 30];
  const teachers = [{ name: 'no row', t: { isAdmin: false, subscription: null } }, { name: 'admin', t: { isAdmin: true, subscription: null } }];
  for (const status of ['active', 'past_due', 'canceled', 'unpaid', 'incomplete'])
    for (const ls of ['ls_1', null])
      for (const d of days) teachers.push({ name: `${status} ls=${ls} d=${d}`, t: { isAdmin: false, subscription: { status, lsSubscriptionId: ls, pastDueAt: ago(-d), currentPeriodEnd: ago(-d), canceledAt: ago(-d + 5), updatedAt: ago(-d + 2) } } });
  const realNow = Date.now;
  let usableDiff = 0, expiredDiff = 0, grid = 0;
  for (const { name, t } of teachers) {
    Date.now = () => NOW.getTime();
    const web = W.isSubscriptionUsable(t);
    Date.now = realNow;
    const st = R.teacherState(t, NOW);
    if (st.usable !== web) { usableDiff++; console.log('      usable differs: ' + name + ' job=' + st.usable + ' web=' + web); }
    for (const used of [0, 10, 100, 426, 428, 900]) {
      grid++;
      const cls = { lastUsedAt: ago(used) };
      const job = !!R.expired(cls, st, NOW);
      // the website's rule needs an end date; where the job has none it counts from the last use (checked below)
      const webExp = W.classExpired(cls, { usable: web, endedAt: st.endedAt !== null ? new Date(st.endedAt) : cls.lastUsedAt }, NOW);
      if (job !== webExp) { expiredDiff++; console.log('      expired differs: ' + name + ' used ' + used + 'd job=' + job + ' web=' + webExp); }
    }
  }
  ok(usableDiff === 0, `"is the plan usable" agrees with the website for ${teachers.length} plans`);
  ok(expiredDiff === 0, `"is the class expired" agrees with the website over ${grid} cases`);
  const st = (t) => R.teacherState(t, NOW);
  ok(R.expired({ lastUsedAt: ago(428) }, st({ isAdmin: false, subscription: { status: 'active', lsSubscriptionId: 'x' } }), NOW) === 'unused', '428 days unused: deleted even with an active plan');
  ok(R.expired({ lastUsedAt: ago(426) }, st({ isAdmin: false, subscription: { status: 'active', lsSubscriptionId: 'x' } }), NOW) === null, '426 days unused with an active plan: kept');
  ok(R.expired({ lastUsedAt: ago(5) }, st({ isAdmin: false, subscription: { status: 'canceled', lsSubscriptionId: 'x', currentPeriodEnd: ago(61) } }), NOW) === 'plan-ended', 'plan ended 61 days ago: deleted, however recently the class was used');
  ok(R.expired({ lastUsedAt: ago(5) }, st({ isAdmin: false, subscription: { status: 'canceled', lsSubscriptionId: 'x', currentPeriodEnd: ago(59) } }), NOW) === null, 'plan ended 59 days ago: kept');
  ok(R.expired({ lastUsedAt: ago(5) }, st({ isAdmin: false, subscription: { status: 'past_due', lsSubscriptionId: 'x', pastDueAt: ago(14 + 61) } }), NOW) === 'plan-ended', 'a card that failed: the plan ends when the 14 days of grace end, then 60 days');
  ok(R.expired({ lastUsedAt: ago(5) }, st({ isAdmin: false, subscription: { status: 'past_due', lsSubscriptionId: 'x', pastDueAt: ago(14 + 59) } }), NOW) === null, 'grace + 59 days: kept');
  ok(R.expired({ lastUsedAt: ago(61) }, st({ isAdmin: false, subscription: null }), NOW) === 'plan-ended' && R.expired({ lastUsedAt: ago(59) }, st({ isAdmin: false, subscription: null }), NOW) === null, 'no plan on record at all: 60 days from the last use');

  // ── 2. the job over a stand-in database ──
  const active = { isAdmin: false, subscription: { status: 'active', lsSubscriptionId: 'a' } };
  const ended = { isAdmin: false, subscription: { status: 'canceled', lsSubscriptionId: 'b', currentPeriodEnd: ago(90) } };
  const make = () => {
    const classes = [
      { id: 'keep-active', name: 'Class Secret-Name', lastUsedAt: ago(3), teacher: active, seats: 20, attempts: 50 },
      { id: 'gone-unused', name: 'Old Zebra-Name', lastUsedAt: ago(500), teacher: active, seats: 12, attempts: 30 },
      { id: 'gone-ended', name: 'Lapsed Koala-Name', lastUsedAt: ago(70), teacher: ended, seats: 8, attempts: 9 },
      { id: 'keep-ended-recent', name: 'x', lastUsedAt: ago(2), teacher: { isAdmin: false, subscription: { status: 'canceled', lsSubscriptionId: 'c', currentPeriodEnd: ago(10) } }, seats: 5, attempts: 4 },
    ];
    const open = [{ id: 'o1', createdAt: ago(8) }, { id: 'o2', createdAt: ago(6) }];
    // results of the class that STAYS and is used every week: one older than 427 days, one younger; and one old result of a class that goes anyway
    const results = [{ id: 'r-old', classId: 'keep-active', createdAt: ago(428) }, { id: 'r-young', classId: 'keep-active', createdAt: ago(426) }, { id: 'r-gone', classId: 'gone-unused', createdAt: ago(480) }];
    const oldOf = (where) => results.filter((a) => a.createdAt < where.createdAt.lt && !(where.assignment && where.assignment.classId.notIn.includes(a.classId)));
    const calls = { deleted: [], deletedOpen: 0, deletedOld: null };
    const prisma = {
      classroom: {
        findMany: async () => classes.map((c) => ({ id: c.id, lastUsedAt: c.lastUsedAt, _count: { seats: c.seats }, teacher: c.teacher })),
        delete: async ({ where }) => { calls.deleted.push(where.id); },
      },
      classAttempt: {
        count: async ({ where }) => (where.reportedAt && where.reportedAt.not === null ? oldOf(where).length : where.assignment ? classes.filter((c) => where.assignment.classId.in.includes(c.id)).reduce((a, c) => a + c.attempts, 0) : open.filter((a) => a.createdAt < where.createdAt.lt).length),
        deleteMany: async ({ where }) => { if (where.reportedAt && where.reportedAt.not === null) calls.deletedOld = oldOf(where).map((a) => a.id); else calls.deletedOpen = open.filter((a) => a.createdAt < where.createdAt.lt).length; },
      },
    };
    return { prisma, calls };
  };
  let lines = [], m = make();
  let r = await R.run({ prisma: m.prisma, now: NOW, apply: false, log: (l) => lines.push(l) });
  ok(r.unused === 1 && r.planEnded === 1 && r.seats === 20 && r.attempts === 39 && r.openAttempts === 1 && r.deleted === 0 && m.calls.deleted.length === 0 && m.calls.deletedOpen === 0, 'a dry run counts two classes (20 children, 39 results, 1 open attempt) and deletes nothing', { r, calls: m.calls });
  ok(lines.length === 1 && /dry run/.test(lines[0]) && !/Name|Secret|Zebra|Koala|gone-|keep-/.test(lines[0]), 'the log line holds counts only: no class name, no id', lines);
  lines = []; m = make();
  r = await R.run({ prisma: m.prisma, now: NOW, apply: true, log: (l) => lines.push(l) });
  ok(JSON.stringify(m.calls.deleted.sort()) === JSON.stringify(['gone-ended', 'gone-unused']) && m.calls.deletedOpen === 1 && r.deleted === 2 && /APPLIED/.test(lines[0]), '--apply deletes exactly the two expired classes and the one stale open attempt', m.calls);
  // a result's own maximum age (legal decision 2026-11-14, E5)
  ok(r.oldResults === 1 && JSON.stringify(m.calls.deletedOld) === JSON.stringify(['r-old']), 'a result 428 days old is deleted in a class that is used every week; one 426 days old stays; the old result of a deleted class is not counted twice', { old: r.oldResults, deleted: m.calls.deletedOld });
  ok(R.RESULT_MAX_DAYS === 427 && /1 results older than 427 days removed/.test(lines[0]), 'the log line counts the old results', lines);
  lines = [];
  r = await R.run({ prisma: { classroom: { findMany: async () => { const e = new Error('The table `public.class_rooms` does not exist in the current database.'); e.code = 'P2021'; throw e; } } }, now: NOW, apply: true, log: (l) => lines.push(l) });
  ok(r.noTables === true && lines.length === 1, 'before the migration is applied the job says so and does nothing');
  let threw = false;
  try { await R.run({ prisma: { classroom: { findMany: async () => { throw new Error('connection refused'); } } }, now: NOW, apply: true, log: () => {} }); } catch (e) { threw = true; }
  ok(threw, 'any other database error is NOT swallowed (the cron line fails loudly)');

  // ── 3. the backup step ──
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'lcs-strip-'));
  const dump = [
    '--', '-- PostgreSQL database dump', '--', '',
    'CREATE TABLE public.class_seats (id text, display_name text);',
    'COPY public.users (id, email) FROM stdin;', 'u1\tteacher@example.com', 'u2\tother@example.com', '\\.', '',
    'COPY public.class_rooms (id, teacher_id, name, code) FROM stdin;', 'c1\tu1\tClass 1B\tabcdefghij', '\\.', '',
    'COPY public.class_seats (id, class_id, seat_no, display_name, icon) FROM stdin;', 's1\tc1\t1\tMax\tanimals/cat', 's2\tc1\t2\tAna María\tanimals/dog', '\\.', '',
    'COPY public.notes (id, body) FROM stdin;', 'n1\tCOPY public.class_seats (id, class_id) FROM stdin;', 'n2\tMax is a name in a NOTE, not in a class table', '\\.', '',
    'COPY public.class_assignments (id, class_id, kind, title) FROM stdin;', 'a1\tc1\tdeck\tTelling Time', '\\.', '',
    'COPY public.class_attempts (id, token, seat_id, "right", total) FROM stdin;', 't1\ttok1\ts1\t4\t6', 't2\ttok2\ts2\t6\t6', 't3\ttok3\ts1\t\\N\t\\N', '\\.', '',
    'ALTER TABLE ONLY public.class_seats ADD CONSTRAINT class_seats_pkey PRIMARY KEY (id);', '',
  ].join('\n');
  const write = (name) => fs.writeFileSync(path.join(dir, name), zlib.gzipSync(dump));
  const read = (name) => zlib.gunzipSync(fs.readFileSync(path.join(dir, name))).toString('utf8');
  write('db_20260901.sql.gz'); write('db_20261101.sql.gz'); write('db_20261005.sql.gz');
  fs.writeFileSync(path.join(dir, 'db_20250101.sql.gz.noclass'), 'orphan marker'); // its dump is gone
  const quiet = console.log; console.log = () => {};
  const dry = await strip.main(dir, 35, true, NOW);
  console.log = quiet;
  ok(dry.read === 2 && dry.rows === 14 && read('db_20260901.sql.gz') === dump && !fs.existsSync(path.join(dir, 'db_20260901.sql.gz.noclass')), 'a dry run finds 7 class rows in each of the two old dumps and changes nothing', dry);
  console.log = () => {};
  const done = await strip.main(dir, 35, false, NOW);
  console.log = quiet;
  const after = read('db_20260901.sql.gz');
  const want = dump.split('\n').filter((l) => !/^(c1|s1|s2|a1|t1|t2|t3)\t/.test(l)).join('\n');
  ok(done.read === 2 && done.rows === 14 && after === want, 'the old dumps lose exactly the 7 class rows; every other line is identical (tables, other data, the look-alike note row)', { done, same: after === want });
  ok(!/Max\tanimals|Ana María|abcdefghij|tok1/.test(after) && /teacher@example\.com/.test(after) && /n1\tCOPY public\.class_seats/.test(after) && /Max is a name in a NOTE/.test(after), 'no child name, class code or token is left; unrelated rows that merely look alike stay');
  ok(/COPY public\.class_seats \(id, class_id, seat_no, display_name, icon\) FROM stdin;\n\\\.\n/.test(after), 'the emptied blocks are still valid COPY blocks (a restore works)');
  ok(read('db_20261101.sql.gz') === dump && !fs.existsSync(path.join(dir, 'db_20261101.sql.gz.noclass')), 'a dump younger than 35 days is not touched');
  ok(fs.existsSync(path.join(dir, 'db_20260901.sql.gz.noclass')) && !fs.existsSync(path.join(dir, 'db_20250101.sql.gz.noclass')), 'a stripped dump gets its marker; a marker without a dump is removed');
  console.log = () => {};
  const again = await strip.main(dir, 35, false, NOW);
  console.log = quiet;
  ok(again.read === 0 && again.rows === 0, 'a second run reads nothing again');
  ok(strip.DEFAULT_DAYS + 7 <= 35, 'the default age (28 days) plus the weekly run keeps the 35-day promise of the privacy texts', strip.DEFAULT_DAYS);
  // --all (what the server runs on the copy it hands to the PC): a dump of TODAY loses its class rows too
  const today = 'db_' + NOW.toISOString().slice(0, 10).replace(/-/g, '') + '.sql.gz';
  write(today);
  console.log = () => {};
  const none = await strip.main(dir, 28, false, NOW);
  const all = await strip.main(dir, -Infinity, false, NOW);
  console.log = quiet;
  ok(none.read === 0 && all.read === 2 && all.rows === 14 && read(today) === want && read('db_20261101.sql.gz') === want, 'by age a dump of today is left alone; with --all it and the young dump lose their class rows', { none, all });
  fs.rmSync(dir, { recursive: true, force: true });

  console.log(fails ? `${fails} of ${n} FAILED` : `retention: ${n} checks pass`);
  process.exit(fails ? 1 : 0);
})().catch((e) => { console.error(e); process.exit(1); });
