#!/usr/bin/env node
/**
 * Class results against the REAL database, while the feature is still switched off (Part 9.4, the dark deploy).
 *
 * The rules are tested over an in-memory database (tests/class-store.test.js); the Prisma layer under them
 * (frontend/lib/class-results/db.ts) and the catalogue lookups (a deck, a Level Set, a landing page) can only be
 * proven where Postgres and the catalogue are: on the server, after the migration. This script does that without
 * the website: it runs the bundled rules + Prisma layer as one throwaway class owned by an admin account, walks a
 * teacher's and a child's whole path, and deletes everything it made (also when a step fails).
 *
 *   PC:      node scripts/class-results/live-db-check.js --build      → out/class-results/_live/class-live.bundle.js
 *   server:  cd /opt/lessoncraftstudio/frontend && set -a && . ./.env.production && set +a \
 *            && node ../scripts/class-results/live-db-check.js --bundle=./.class-live.bundle.js
 *
 * The bundle must sit in frontend/ (it loads @prisma/client from there and reads content/seo-landing relative to
 * the working directory). Nothing here needs CLASS_RESULTS_ENABLED: no HTTP route is called.
 * It prints checks and counts; the class it makes is numbers-only (no name is typed anywhere).
 */
'use strict';
const fs = require('fs');
const path = require('path');
const REPO = path.join(__dirname, '..', '..');
const arg = (k) => { const a = process.argv.find((x) => x.startsWith('--' + k + '=')); return a ? a.split('=').slice(1).join('=') : null; };

if (process.argv.includes('--build')) {
  const esbuild = require(path.join(REPO, 'node_modules', 'esbuild'));
  const dir = path.join(REPO, 'out', 'class-results', '_live');
  fs.mkdirSync(dir, { recursive: true });
  const lib = path.join(REPO, 'frontend', 'lib').replace(/\\/g, '/');
  fs.writeFileSync(path.join(dir, 'entry.ts'), `export * as store from '${lib}/class-results/store';\nexport { prismaClassDb, newClassCode, newAttemptToken } from '${lib}/class-results/db';\nexport { prisma } from '${lib}/prisma';\n`);
  esbuild.buildSync({ entryPoints: [path.join(dir, 'entry.ts')], bundle: true, platform: 'node', format: 'cjs', outfile: path.join(dir, 'class-live.bundle.js'), external: ['@prisma/client', 'next', 'next/*'], alias: { '@': path.join(REPO, 'frontend') }, logLevel: 'error' });
  console.log('built ' + path.relative(REPO, path.join(dir, 'class-live.bundle.js')) + ' (' + Math.round(fs.statSync(path.join(dir, 'class-live.bundle.js')).size / 1024) + ' KB)');
  process.exit(0);
}

const bundle = arg('bundle');
if (!bundle || !fs.existsSync(bundle)) { console.error('usage: live-db-check.js --build | --bundle=<class-live.bundle.js in frontend/>'); process.exit(2); }
const B = require(path.resolve(bundle));
const S = B.store, db = B.prismaClassDb, prisma = B.prisma;

let fails = 0;
const check = (name, ok, extra) => { if (!ok) fails++; console.log((ok ? 'ok    ' : 'FAIL  ') + name + (ok || extra === undefined ? '' : ' — ' + JSON.stringify(extra).slice(0, 500))); };
const DECK = arg('deck') || '/en/decks/telling-time-easy-g1148-2/';
const PRINT_ONLY = arg('print-only') || '/en/decks/picture-tracing-k418/';
const SET = arg('set') || '/en/worksheets/sets/g1116';

(async () => {
  let classId = null;
  const now = () => new Date();
  try {
    const admin = await prisma.user.findFirst({ where: { isAdmin: true }, select: { id: true } });
    if (!admin) { console.log('FAIL  no admin account to own the throwaway class'); process.exit(1); }
    const me = { userId: admin.id, usable: true };
    const before = { classes: await prisma.classroom.count(), seats: await prisma.classSeat.count(), assignments: await prisma.classAssignment.count(), attempts: await prisma.classAttempt.count() };
    console.log('      before: ' + JSON.stringify(before));

    let r = await S.createClass(db, me, { name: 'zz live check ' + Date.now(), namesMode: 'numbers', locale: 'en', count: 3 }, B.newClassCode);
    check('a class is made in Postgres (201, a 10-character code, three seats)', r.status === 201 && S.CODE_RE.test(r.body.code) && r.body.seats === 3, r);
    classId = r.body.id; let code = r.body.code;
    r = await S.listClasses(db, me);
    check('the owner\'s list holds it with its counts', r.status === 200 && r.body.items.some((c) => c.id === classId && c.seats === 3 && c.assignments === 0), r.body.items.filter((c) => c.id === classId));
    check('another account does not see it', (await S.getClass(db, { userId: 'someone-else-0000', usable: true }, classId)).status === 404);

    r = await S.addAssignment(db, me, classId, { link: 'https://www.lessoncraftstudio.com' + DECK }, now());
    check('a real interactive deck is found in the catalogue and assigned, with its title', r.status === 201 && r.body.kind === 'deck' && !!r.body.title, r);
    const deckA = r.body.id;
    r = await S.addAssignment(db, me, classId, { link: PRINT_ONLY }, now());
    check('a real print-only deck is refused as print_only', r.status === 422 && r.body.error === 'print_only', r);
    r = await S.addAssignment(db, me, classId, { link: SET }, now());
    check('a real Level Set is found and assigned', r.status === 201 && r.body.kind === 'ladder' && !!r.body.title, r);
    const setA = r.body.id;
    const setRow = await db.getAssignment(setA);
    const lv = setRow.content.levels;
    console.log('      Level Set pages with a screen: easy ' + lv.easy.length + ' · core ' + lv.core.length + ' · hard ' + lv.hard.length + ' — core: ' + lv.core.join(', '));
    check('the set keeps only pages with a screen version (its first page, print-only, is left out)', lv.core.length > 0 && !lv.core.includes('number-lines-g1116') || SET !== '/en/worksheets/sets/g1116', lv.core);
    r = await S.addAssignment(db, me, classId, { link: '/en/decks/this-page-does-not-exist-zz/' }, now());
    check('a page that does not exist is refused', r.status === 404, r);

    r = await S.classPage(db, code);
    check('the class page: three seats without a name, two assignments', r.status === 200 && r.body.seats.length === 3 && r.body.seats.every((s) => s.name === null && !!s.icon) && r.body.assignments.length === 2, r.body);
    const seat = r.body.seats[0].id;
    r = await S.seatPage(db, code, seat, now());
    check('a child\'s list: both new', r.status === 200 && r.body.assignments.map((a) => a.state).join() === 'new,new', r.body);

    r = await S.startAttempt(db, { code, seatId: seat, assignmentId: deckA }, B.newAttemptToken, now());
    const url = r.body && r.body.url;
    check('a child starts the deck: the play address ends in #lcs=<token>', r.status === 200 && new RegExp('^' + DECK.replace(/[/]/g, '\\/') + '#lcs=[a-z2-9]{20}$').test(url || ''), r.body);
    const token = url ? url.split('#lcs=')[1] : '';
    check('that token frees the play from the per-device meter; a made-up token does not', (await S.tokenSkipsMeter(db, token)) === true && (await S.tokenSkipsMeter(db, 'zzzzzzzzzzzzzzzzzzzz')) === false);
    r = await S.report(db, { token, right: 4, total: 6, items: [1, 1, 1, 1, 0, 0] }, B.newAttemptToken, now());
    check('the first Check is stored and the child is sent back to /c/<code>', r.status === 200 && r.body.back === '/c/' + code, r);
    await S.report(db, { token, right: 6, total: 6 }, B.newAttemptToken, now());
    const att = await db.getAttempt(token);
    check('a second Check only counts: the result stays 4 of 6 with its marks, checks = 2, finished', att.right === 4 && att.total === 6 && JSON.stringify(att.items) === '[1,1,1,1,0,0]' && att.checks === 2 && att.finished === true, att);

    r = await S.startAttempt(db, { code, seatId: seat, assignmentId: setA }, B.newAttemptToken, now());
    const t2 = r.body.url ? r.body.url.split('#lcs=')[1] : '';
    check('the Level Set starts on a core page', r.status === 200 && lv.core.some((p) => (r.body.url || '').includes('/decks/' + p + '/')), r.body);
    r = await S.report(db, { token: t2, right: 3, total: 3 }, B.newAttemptToken, now());
    check('all right on the core page → the next page is a harder one', r.status === 200 && !!r.body.next && lv.hard.some((p) => r.body.next.includes('/decks/' + p + '/')), r.body);

    r = await S.classResults(db, me, classId);
    const cell = r.body.cells[seat];
    check('the dashboard: 4 of 6 "some wrong", checked twice; the set shows the core level passed and the child on the hard level', r.status === 200 && cell[deckA].first.right === 4 && cell[deckA].first.band === 'mid' && cell[deckA].checks === 2 && cell[setA].ladder.current === 'hard' && cell[setA].ladder.levels.find((l) => l.level === 'core').status === 'passed', cell);

    r = await S.updateClass(db, me, classId, { namesMode: 'names' }, B.newClassCode, now());
    r = await S.updateSeat(db, me, classId, seat, { displayName: 'Zz Check' });
    check('a name can be stored once the class uses names', r.status === 200 && (await db.getSeat(seat)).displayName === 'Zz Check', r);
    r = await S.updateClass(db, me, classId, { namesMode: 'numbers' }, B.newClassCode, now());
    check('switching to numbers only erases it in Postgres', r.status === 200 && (await db.getSeat(seat)).displayName === null);
    r = await S.updateClass(db, me, classId, { newCode: true }, B.newClassCode, now());
    check('a new link: the old code no longer opens the class', r.status === 200 && r.body.code !== code && (await S.classPage(db, code)).status === 404 && (await S.classPage(db, r.body.code)).status === 200);
    code = r.body.code;
    r = await S.deleteSeat(db, me, classId, seat, true);
    check('"delete this child\'s results" leaves the seat and removes the attempts', r.status === 200 && !!(await db.getSeat(seat)) && (await prisma.classAttempt.count({ where: { seatId: seat } })) === 0);

    r = await S.deleteClass(db, me, classId);
    const left = { seats: await prisma.classSeat.count({ where: { classId } }), assignments: await prisma.classAssignment.count({ where: { classId } }), cls: await prisma.classroom.count({ where: { id: classId } }) };
    check('deleting the class removes its seats, assignments and attempts (cascade)', r.status === 200 && left.seats === 0 && left.assignments === 0 && left.cls === 0, left);
    classId = left.cls === 0 ? null : classId;
    const after = { classes: await prisma.classroom.count(), seats: await prisma.classSeat.count(), assignments: await prisma.classAssignment.count(), attempts: await prisma.classAttempt.count() };
    check('the four tables hold exactly what they held before', JSON.stringify(after) === JSON.stringify(before), { before, after });
  } catch (e) {
    fails++; console.log('FAIL  the check crashed: ' + (e && e.stack || e));
  } finally {
    if (classId) { try { await prisma.classroom.delete({ where: { id: classId } }); console.log('      cleaned up the throwaway class'); } catch (e) { console.log('FAIL  could NOT delete the throwaway class ' + classId + ': ' + e.message); fails++; } }
    await prisma.$disconnect();
  }
  console.log(fails ? `\n${fails} FAILURE(S)` : '\nlive-db-check: no failures');
  process.exit(fails ? 1 : 0);
})();
