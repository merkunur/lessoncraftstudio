#!/usr/bin/env node
/**
 * The class-results rules (frontend/lib/class-results/store.ts = what /api/classes/* and /api/class/* do), over an
 * in-memory database:
 *
 *   node scripts/class-results/tests/class-store.test.js        exit 1 on any failure
 *
 * Every refusal has a twin that passes (poison both ways): signed out vs signed in · no subscription vs a usable one ·
 * another teacher's class vs the owner's · a bad name vs a good one · the cap vs the cap − 1 · a print-only page vs an
 * interactive one · a malformed report vs a clean one · a lapsed teacher's class link vs a live one. The Level Set
 * rule is checked step by step against the five sentences of the printed class sheet.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const REPO = path.join(__dirname, '..', '..', '..');

const esbuild = require(path.join(REPO, 'node_modules', 'esbuild'));
const out = path.join(REPO, 'out', 'class-results', '_tests', 'store.bundle.js');
fs.mkdirSync(path.dirname(out), { recursive: true });
// CLASS_STORE_SRC: the mutation harness (mutate-class-store.js) points this at a deliberately broken copy
esbuild.buildSync({ entryPoints: [process.env.CLASS_STORE_SRC || path.join(REPO, 'frontend', 'lib', 'class-results', 'store.ts')], bundle: true, platform: 'node', format: 'cjs', outfile: out, logLevel: 'error' });
const S = require(out);

let fails = 0, n = 0;
function ok(cond, name) { n++; if (!cond) { fails++; console.log('FAIL  ' + name); } }
function eq(a, b, name) { const x = JSON.stringify(a), y = JSON.stringify(b); n++; if (x !== y) { fails++; console.log('FAIL  ' + name + '\n      got  ' + x + '\n      want ' + y); } }

const { memDb: makeDb } = require('../mem-db.js');
const memDb = () => makeDb({ now: () => new Date(T) });
let T = Date.parse('2026-11-11T08:00:00Z');
const now = () => new Date(T);
const hours = (h) => { T += h * 3600 * 1000; };
let seq = 0;
const A = 'abcdefghijkmnpqrstuvwxyz23456789';
const gen = (len) => () => { let x = ++seq, s = ''; for (let i = 0; i < len; i++) { s += A[x % 32]; x = Math.floor(x / 32); } return s; };
const newCode = gen(10), newToken = gen(20);
// (SUB and SUB2 hold the first-names permission, so the names paths stay tested; NONAMES is what every teacher is at launch)
const SUB = { userId: 'sub', usable: true, names: true }, SUB2 = { userId: 'sub2', usable: true, names: true }, FREE = { userId: 'free', usable: false }, NONAMES = { userId: 'plain', usable: true };

(async () => {
  // ── text ──
  eq(S.cleanSeatName('  Max  '), 'Max', 'a name is trimmed');
  eq(S.cleanSeatName('Ana María'), 'Ana María', 'a two-word first name is kept');
  eq(S.cleanSeatName('José Luis G.'), 'José Luis G.', 'a first name with an initial is kept');
  eq(S.cleanSeatName('max@example.com'), null, 'an e-mail address is refused');
  eq(S.cleanSeatName('12'), null, 'digits only are refused');
  eq(S.cleanSeatName('Maximilian Alexander von Hohenzollern'), null, 'a line longer than the cap is refused');
  eq(S.cleanSeatName('a b c d'), null, 'four words are refused');
  eq(S.cleanSeatName('<b>Max'), null, 'markup is refused');
  eq(S.parseNames('Max\nLea, Tom\n\nx@y.z'), { names: ['Max', 'Lea', 'Tom'], refused: ['x@y.z'] }, 'a pasted list splits on lines and commas and reports what it refused');
  eq(S.cleanClassName('  Class   1B '), 'Class 1B', 'a class name is trimmed');
  eq(S.cleanClassName(''), null, 'an empty class name is refused');

  // ── links ──
  eq(S.parseAssignmentLink('https://www.lessoncraftstudio.com/en/decks/count-k002/'), { kind: 'deck', locale: 'en', slug: 'count-k002' }, 'a deck address');
  eq(S.parseAssignmentLink('/de/decks/zaehlen-k002'), { kind: 'deck', locale: 'de', slug: 'zaehlen-k002' }, 'a deck path without the host');
  eq(S.parseAssignmentLink('https://lessoncraftstudio.com/en/worksheets?set=k002&type=counting-pictures'), { kind: 'set', locale: 'en', code: 'k002' }, 'a Level Set address (hub form)');
  eq(S.parseAssignmentLink('https://www.lessoncraftstudio.com/fi/worksheets/sets/g1245'), { kind: 'set', locale: 'fi', code: 'g1245' }, 'a Level Set address (old form)');
  eq(S.parseAssignmentLink('https://www.lessoncraftstudio.com/en/worksheets/count-the-animals'), { kind: 'landing', locale: 'en', slug: 'count-the-animals' }, 'a worksheet landing address');
  eq(S.parseAssignmentLink('https://www.lessoncraftstudio.com/s/abcdefghjkmn'), { kind: 'maker', linkId: 'abcdefghjkmn' }, 'a maker student link');
  eq(S.parseAssignmentLink('https://www.lessoncraftstudio.com/play/a1b2c3d4e5'), { kind: 'play', linkId: 'a1b2c3d4e5' }, 'a deck share link');
  eq(S.parseAssignmentLink('https://www.lessoncraftstudio.com/en/decks/count-k002/#lcs=abc'), { kind: 'deck', locale: 'en', slug: 'count-k002' }, 'a fragment is ignored');
  eq(S.parseAssignmentLink('https://evil.example/en/decks/count-k002/'), null, 'another site is refused');
  eq(S.parseAssignmentLink('https://www.lessoncraftstudio.com.evil.example/en/decks/x/'), null, 'a look-alike host is refused');
  eq(S.parseAssignmentLink('https://www.lessoncraftstudio.com/en/pricing'), null, 'a page that is not a worksheet is refused');
  eq(S.parseAssignmentLink('https://www.lessoncraftstudio.com/xx/decks/count-k002/'), null, 'an unknown language is refused');
  eq(S.parseAssignmentLink('https://www.lessoncraftstudio.com/en/decks/../../etc/'), null, 'a path that is not a slug is refused');

  // ── bands: the class sheet's words ──
  eq(S.bandOf(10, 10), 'high', 'all right is high');
  eq(S.bandOf(9, 10), 'high', 'one wrong of ten is high (almost all right)');
  eq(S.bandOf(4, 5), 'high', 'one wrong of five is high');
  eq(S.bandOf(3, 4), 'mid', 'one wrong of four is NOT almost all right');
  eq(S.bandOf(8, 10), 'mid', 'two wrong of ten is between');
  eq(S.bandOf(6, 10), 'mid', 'six of ten is between');
  eq(S.bandOf(5, 10), 'low', 'five of ten is several wrong');
  eq(S.bandOf(1, 3), 'low', 'one of three is several wrong');
  eq(S.bandOf(2, 3), 'mid', 'two of three is between');
  eq(S.bandOf(null, null), null, 'a page with no marks has no band');

  // ── teacher routes ──
  const db = memDb();
  eq((await S.createClass(db, null, { name: '1B' }, newCode)).status, 401, 'signed out cannot make a class');
  eq((await S.createClass(db, FREE, { name: '1B' }, newCode)).status, 403, 'a free account cannot make a class');
  eq((await S.createClass(db, SUB, { name: '' }, newCode)).status, 400, 'a class needs a name');
  let r = await S.createClass(db, SUB, { name: 'Class 1B', namesMode: 'names', locale: 'en', names: 'Max\nLea\nTom\nbad@x.y' }, newCode);
  eq([r.status, r.body.seats, r.body.refused], [201, 3, ['bad@x.y']], 'a subscriber makes a class with three children; the bad line is reported, not stored');
  const cid = r.body.id, code = r.body.code;
  ok(S.CODE_RE.test(code), 'the class link key has the right shape');
  eq((await S.getClass(db, SUB2, cid)).status, 404, "another teacher cannot read the class");
  eq((await S.getClass(db, null, cid)).status, 401, 'signed out cannot read the class');
  r = await S.getClass(db, SUB, cid);
  eq(r.body.seats.map((s) => [s.seatNo, s.displayName, s.icon]), [[1, 'Max', 'animals/cat'], [2, 'Lea', 'animals/dog'], [3, 'Tom', 'animals/elephant']], 'seats are numbered in order and each gets its own picture');
  const [max, lea, tom] = r.body.seats.map((s) => s.id);
  eq((await S.addSeats(db, SUB, cid, { names: ['Ida'] }, now())).body.added, 1, 'a child is added later');
  r = await S.getClass(db, SUB, cid);
  eq([r.body.seats[3].seatNo, r.body.seats[3].icon], [4, 'animals/giraffe'], 'the new child takes the next number and a picture nobody has');
  eq((await S.updateSeat(db, SUB, cid, max, { icon: 'animals/dog' })).status, 409, 'two children cannot share a picture');
  eq((await S.updateSeat(db, SUB, cid, max, { icon: 'birds/parrot' })).status, 200, 'a free picture can be chosen');
  eq((await S.updateSeat(db, SUB, cid, max, { icon: 'animals/unicorn' })).status, 400, 'a picture outside the list is refused');
  eq((await S.updateSeat(db, SUB, cid, max, { displayName: 'Max M.' })).status, 200, 'a name can be corrected');
  eq((await S.updateSeat(db, SUB2, cid, max, { displayName: 'X' })).status, 404, "another teacher cannot rename a child");
  eq((await S.addSeats(db, SUB, cid, { names: Array.from({ length: 37 }, (_, i) => 'N' + String.fromCharCode(97 + (i % 26)) + 'x') }, now())).status, 429, 'the 41st seat is refused');
  eq((await S.addSeats(db, SUB, cid, { names: Array.from({ length: 36 }, (_, i) => 'N' + String.fromCharCode(97 + (i % 26)) + 'x') }, now())).status, 201, 'the 40th seat is accepted');
  r = await S.getClass(db, SUB, cid);
  eq(new Set(r.body.seats.map((s) => s.icon)).size, 40, 'forty seats, forty different pictures');

  // the list says whose classes these are and what the caller may do
  r = await S.listClasses(db, SUB);
  eq([r.status, r.body.items.map((c) => c.id).includes(cid), r.body.canEdit], [200, true, true], 'a subscriber lists her classes and may edit');
  r = await S.listClasses(db, SUB2);
  eq([r.body.items.map((c) => c.id).includes(cid), r.body.canEdit], [false, true], "another teacher's list does not hold this class");
  eq((await S.listClasses(db, FREE)).body.canEdit, false, 'an account without a usable plan is told it may not edit');
  eq((await S.listClasses(db, null)).status, 401, 'signed out: no list');

  // assignments
  eq((await S.addAssignment(db, FREE, cid, { link: '/en/decks/count-k002/' }, now())).status, 403, 'a free account cannot assign');
  eq((await S.addAssignment(db, SUB, cid, { link: 'https://evil.example/x' }, now())).status, 400, 'a foreign address is refused');
  eq((await S.addAssignment(db, SUB, cid, { link: '/en/decks/nothing-here/' }, now())).status, 404, 'a deck that does not exist is refused');
  eq((await S.addAssignment(db, SUB, cid, { link: '/en/decks/trace-k100/' }, now())).body.error, 'print_only', 'a page with no screen version is refused, with the reason');
  eq((await S.addAssignment(db, SUB, cid, { link: '/en/worksheets?set=k100' }, now())).body.error, 'print_only', 'a Level Set with no screen pages is refused');
  r = await S.addAssignment(db, SUB, cid, { link: 'https://www.lessoncraftstudio.com/en/decks/count-k002/' }, now());
  eq([r.status, r.body.kind, r.body.title], [201, 'deck', 'Count the Animals'], 'an interactive deck is assigned under its own title');
  const deckA = r.body.id;
  eq((await S.addAssignment(db, SUB, cid, { link: '/en/worksheets/count-the-animals' }, now())).body.existing, true, 'the same deck through its landing page is the same assignment');
  eq((await S.addAssignment(db, SUB, cid, { link: '/play/a1b2c3d4e5' }, now())).body.existing, true, 'the same deck through a share link is the same assignment');
  r = await S.addAssignment(db, SUB, cid, { link: '/en/worksheets?set=k002&type=counting-pictures' }, now());
  eq([r.status, r.body.kind], [201, 'ladder'], 'a Level Set is assigned');
  const ladA = r.body.id;
  eq((await S.addAssignment(db, SUB2, cid, { link: '/s/abcdefghjkmn' }, now())).status, 404, "another teacher's class refuses");
  r = await S.addAssignment(db, SUB, cid, { link: '/s/abcdefghjkmn' }, now());
  eq([r.status, r.body.kind], [201, 'maker'], "the teacher's own maker worksheet is assigned");
  const db2cls = (await S.createClass(db, SUB2, { name: 'Other', namesMode: 'names' }, newCode)).body.id;
  eq((await S.addAssignment(db, SUB2, db2cls, { link: '/s/abcdefghjkmn' }, now())).status, 404, "another teacher's maker link cannot be assigned");

  // ── child routes ──
  eq((await S.classPage(db, 'nope')).status, 404, 'a malformed class key is not found');
  eq((await S.classPage(db, 'zzzzzzzzzz')).status, 404, 'an unknown class key is not found');
  r = await S.classPage(db, code);
  eq([r.status, r.body.name, r.body.seats.length, r.body.assignments.length], [200, 'Class 1B', 40, 3], 'the class page lists the children and the assignments');
  ok(!JSON.stringify(r.body).includes('teacherId') && !JSON.stringify(r.body).includes('right'), 'the class page carries no owner id and no results');
  eq(r.body.seats[1].name, 'Lea', 'a names class shows the name');

  r = await S.startAttempt(db, { code, seatId: lea, assignmentId: deckA }, newToken, now());
  ok(r.status === 200 && /^\/en\/decks\/count-k002\/#lcs=[a-z2-9]{20}$/.test(r.body.url), 'a child starts a deck: the page address carries the token after #');
  const tok1 = r.body.url.split('#lcs=')[1];
  eq((await S.startAttempt(db, { code, seatId: lea, assignmentId: deckA }, newToken, now())).body.url, r.body.url, 'a second tap hands out the same attempt, not a new row');
  eq((await S.startAttempt(db, { code, seatId: 's000000999', assignmentId: deckA }, newToken, now())).status, 404, 'a seat that does not exist is refused');
  await S.addSeats(db, SUB2, db2cls, { names: ['Stranger'] }, now());
  const stranger = (await S.getClass(db, SUB2, db2cls)).body.seats[0].id;
  eq((await S.startAttempt(db, { code, seatId: stranger, assignmentId: deckA }, newToken, now())).status, 404, "a real seat of ANOTHER class is refused");
  eq((await S.updateSeat(db, SUB, cid, stranger, { displayName: 'Mine' })).status, 404, "a teacher cannot rename a child of another teacher's class through their own");
  eq(await S.tokenSkipsMeter(db, tok1), true, 'a live class token skips the play meter');
  eq(await S.tokenSkipsMeter(db, 'abcdefghijkmnpqrstuv'), false, 'an unknown token does not');

  eq((await S.report(db, { token: tok1, right: 11, total: 10 }, newToken, now())).status, 400, 'more right than asked is refused');
  eq((await S.report(db, { token: tok1, right: 3, total: 5, items: [1, 1, 0, 0, 0] }, newToken, now())).status, 400, 'item marks that do not add up are refused');
  eq((await S.report(db, { token: tok1 }, newToken, now())).status, 400, 'an empty report is refused');
  eq((await S.report(db, { token: 'x', right: 1, total: 1 }, newToken, now())).status, 400, 'a malformed token is refused');
  eq((await S.report(db, { token: 'abcdefghijkmnpqrstuv', right: 1, total: 1 }, newToken, now())).status, 404, 'an unknown token is not found');
  r = await S.report(db, { token: tok1, right: 3, total: 5, items: [1, 1, 1, 0, 0] }, newToken, now());
  eq([r.status, r.body.done, r.body.back], [200, true, '/c/' + code], 'a clean report is stored and sends the child back to the class page');
  await S.report(db, { token: tok1, right: 5, total: 5 }, newToken, now());
  let att = await db.getAttempt(tok1);
  eq([att.right, att.total, att.items, att.checks, att.finished], [3, 5, [1, 1, 1, 0, 0], 2, true], 'the FIRST Check is the result; the second only counts the press and marks the page finished');

  // a page with no marks: its Check is "played", its celebration "finished"; never a number
  r = await S.startAttempt(db, { code, seatId: tom, assignmentId: deckA }, newToken, now());
  const tok2 = r.body.url.split('#lcs=')[1];
  eq((await S.report(db, { token: tok2, finished: 'yes' }, newToken, now())).status, 400, 'finished must be true or false');
  eq((await S.report(db, { token: tok2, finished: false }, newToken, now())).status, 200, 'a page with no marks may report a Check that did not finish it');
  att = await db.getAttempt(tok2);
  eq([att.right, att.total, att.finished, !!att.reportedAt], [null, null, false, true], 'played, not finished: no marks are invented');
  eq((await S.report(db, { token: tok2, finished: true }, newToken, now())).status, 200, 'a page with no marks may report "finished"');
  att = await db.getAttempt(tok2);
  eq([att.right, att.total, att.finished, att.checks], [null, null, true, 2], 'finished only: no marks are invented');

  // ── the Level Set rule, sentence by sentence ──
  const play = async (seat, right, total) => {
    const s = await S.startAttempt(db, { code, seatId: seat, assignmentId: ladA }, newToken, now());
    if (!s.body.url) return s.body;
    const token = s.body.url.split('#lcs=')[1];
    const a = await db.getAttempt(token);
    const rep = await S.report(db, { token, right, total }, newToken, now());
    return { level: a.level, page: a.pageRef, next: rep.body.next || null, why: rep.body.why || null };
  };
  // play(seat, right, total): the page the rule hands out, then the child's first Check ON THAT PAGE
  // sitting 1
  let p = await play(max, 6, 10);
  eq([p.level, p.page], ['core', 'c1'], '"Start every child on the core page."');
  p = await play(max, 7, 10); // the core page before went 6/10: between
  eq([p.level, p.page], ['core', 'c2'], '"Otherwise: another core page next time." (and a page the child has not had)');
  p = await play(max, 3, 10); // 7/10: between again → the third core page; on it the child gets 3/10
  eq([p.level, p.page, p.why], ['core', 'c3', 'rest'], 'the third page of a sitting is the last: the child rests');
  eq((await play(max, 1, 1)).done, 'rest', 'a fourth page in the same sitting is not handed out');
  r = await S.seatPage(db, code, max, now());
  eq(r.body.assignments.find((a) => a.id === ladA).state, 'rest', "the child's page shows the set as done for now");
  // sitting 2: the last Check was 3/10 on core
  hours(7);
  p = await play(max, 2, 10);
  eq([p.level, p.page], ['easy', 'e1'], '"Several answers wrong: give the easier page ..."');
  p = await play(max, 9, 10); // whatever happened on the easy page (2/10), the next page is core
  eq([p.level, p.page], ['core', 'c1'], '"... then back to the core page the time after." (the core page played longest ago)');
  p = await play(max, 5, 10); // 9/10 on core
  eq([p.level, p.page, p.why], ['hard', 'h1', 'rest'], '"Almost all answers right: give the harder page next time."');
  // sitting 3: the last Check was 5/10 on hard
  hours(7);
  p = await play(max, 10, 10);
  eq([p.level, p.page], ['core', 'c2'], 'several wrong on the hard page: back to core');
  p = await play(max, 10, 10); // 10/10 on core
  eq([p.level, p.page, p.why], ['hard', 'h2', 'mastered'], 'almost all right on core: the other hard page; almost all right on it ends the set');
  eq((await play(max, 1, 1)).done, 'mastered', 'a mastered set hands out no more pages');
  r = await S.seatPage(db, code, max, now());
  eq(r.body.assignments.find((a) => a.id === ladA).state, 'mastered', "the child's page shows the set as mastered");
  ok(!JSON.stringify(r.body).includes('right'), "the child's page never carries a score");

  // a set with one level
  const one = (await S.addAssignment(db, SUB, cid, { link: '/en/worksheets/sets/k300' }, now())).body.id;
  let s1 = await S.startAttempt(db, { code, seatId: lea, assignmentId: one }, newToken, now());
  eq((await db.getAttempt(s1.body.url.split('#lcs=')[1])).level, 'core', 'a set with only core pages starts on core');
  r = await S.report(db, { token: s1.body.url.split('#lcs=')[1], right: 10, total: 10 }, newToken, now());
  eq(r.body.why, 'mastered', 'with no harder page, almost all right on core ends the set');

  // ── the dashboard ──
  await S.startAttempt(db, { code, seatId: (await S.getClass(db, SUB, cid)).body.seats[3].id, assignmentId: deckA }, newToken, now()); // Ida opens the page and never presses Check
  eq((await S.classResults(db, SUB2, cid)).status, 404, "another teacher cannot read the results");
  r = await S.classResults(db, SUB, cid);
  const cell = r.body.cells[lea][deckA];
  eq([cell.plays, cell.first.right, cell.first.total, cell.first.band, cell.checks], [1, 3, 5, 'mid', 2], "a deck cell shows the first Check and how many presses it took");
  eq(r.body.cells[tom][deckA].first, { right: null, total: null, band: null, finished: true, at: r.body.cells[tom][deckA].first.at }, 'a finished-only cell says finished and no more');
  const lad = r.body.cells[max][ladA].ladder;
  eq(lad.levels.map((l) => [l.n, l.level, l.status]), [[1, 'easy', 'struggled'], [2, 'core', 'passed'], [3, 'hard', 'passed']], "a Level Set cell gives the child's standing per level: the last first Check at each");
  eq([lad.mastered, lad.current], [true, null], 'and says the set is mastered');
  ok(r.body.cells[ida = r.body.seats[3].id] && Object.keys(r.body.cells[ida]).length === 0, 'a child who opened a page and never pressed Check has no cells: an opened page is not a result');

  // ── closing an assignment hides it from the children and keeps its results ──
  eq((await S.updateAssignment(db, SUB2, cid, deckA, { closed: true }, now())).status, 404, "another teacher cannot close it");
  eq((await S.updateAssignment(db, SUB, cid, deckA, { closed: true }, now())).status, 200, 'the teacher closes an assignment');
  ok(!(await S.classPage(db, code)).body.assignments.some((a) => a.id === deckA), 'a closed assignment is not on the class page');
  eq((await S.startAttempt(db, { code, seatId: ida, assignmentId: deckA }, newToken, now())).status, 404, 'and cannot be started');
  ok((await S.classResults(db, SUB, cid)).body.cells[lea][deckA].plays === 1, 'its results are kept');
  eq((await S.addAssignment(db, SUB, cid, { link: '/en/decks/count-k002/' }, now())).body.existing, true, 'assigning it again reopens it');
  ok((await S.classPage(db, code)).body.assignments.some((a) => a.id === deckA), 'and it is back on the class page');

  // ── removal: always possible, and it really removes ──
  db.usable.delete('sub');
  const LAPSED = { userId: 'sub', usable: false };
  eq((await S.classPage(db, code)).body, { inactive: true }, "a lapsed teacher's class link says inactive and lists nobody");
  eq((await S.startAttempt(db, { code, seatId: lea, assignmentId: deckA }, newToken, now())).body, { inactive: true }, 'and starts nothing');
  eq((await S.report(db, { token: tok1, right: 1, total: 1 }, newToken, now())).body, { inactive: true }, 'and stores nothing');
  eq(await S.tokenSkipsMeter(db, tok1), false, 'and its tokens no longer skip the meter');
  eq((await S.addSeats(db, LAPSED, cid, { names: ['New'] }, now())).status, 403, 'a lapsed teacher cannot add a child');
  eq((await S.classResults(db, LAPSED, cid)).status, 200, 'but can still read the results');
  const before = db.attempts.size;
  eq((await S.deleteSeat(db, LAPSED, cid, tom, true)).status, 200, "and can delete one child's results");
  ok(db.attempts.size === before - 1 && db.seats.has(tom), "the results are gone, the seat stays");
  eq((await S.deleteSeat(db, LAPSED, cid, lea, false)).status, 200, 'and can remove a child');
  ok(!db.seats.has(lea) && ![...db.attempts.values()].some((a) => a.seatId === lea), 'the child and every result of theirs are gone');
  eq((await S.updateClass(db, LAPSED, cid, { name: 'Renamed' }, newCode, now())).status, 403, 'a lapsed teacher cannot rename');
  eq((await S.updateClass(db, LAPSED, cid, { namesMode: 'numbers' }, newCode, now())).status, 200, 'but can switch the class to numbers only');
  ok([...db.seats.values()].filter((s) => s.classId === cid).every((s) => s.displayName === null), 'switching to numbers only removes every stored name');
  eq((await S.deleteClass(db, SUB2, cid)).status, 404, "another teacher cannot delete the class");
  eq((await S.deleteClass(db, LAPSED, cid)).status, 200, 'the owner deletes the class');
  ok(!db.classes.has(cid) && ![...db.seats.values()].some((s) => s.classId === cid) && ![...db.assignments.values()].some((a) => a.classId === cid) && ![...db.attempts.values()].some((a) => a.assignmentId === ladA || a.assignmentId === deckA), 'the class, its seats, its assignments and its results are all gone');

  // ── first names need the teacher's own permission (legal decision 2026-11-14, E1): without it the server stores no name, whatever is sent ──
  {
    db.usable.add('plain');
    let q = await S.createClass(db, NONAMES, { name: '3C', namesMode: 'names', locale: 'en', names: ['Max', 'Lea', 'Tom'], count: 2 }, newCode);
    const pid = q.body.id;
    eq([q.status, db.classes.get(pid).namesMode, q.body.seats], [201, 'numbers', 2], 'a teacher without the permission asks for a names class: a numbers class is made, with the counted seats');
    ok([...db.seats.values()].filter((s) => s.classId === pid).every((s) => s.displayName === null), 'and not one of the names she sent is stored');
    eq(db.classes.get((await S.createClass(db, NONAMES, { name: '3D' }, newCode)).body.id).namesMode, 'numbers', 'a class made without a kind is a numbers class');
    eq((await S.updateClass(db, NONAMES, pid, { namesMode: 'names' }, newCode, now())).body, { error: 'names_off' }, 'she cannot switch the class to first names');
    eq(db.classes.get(pid).namesMode, 'numbers', 'and the class is still a numbers class');
    eq((await S.updateClass(db, NONAMES, pid, { name: '3C blue' }, newCode, now())).status, 200, 'twin: renaming the class works');
    const seat0 = [...db.seats.values()].find((s) => s.classId === pid).id;
    eq((await S.updateSeat(db, NONAMES, pid, seat0, { displayName: 'Max' })).body, { error: 'names_off' }, 'no seat takes a name');
    eq(db.seats.get(seat0).displayName, null, 'and none was stored');
    eq((await S.updateSeat(db, NONAMES, pid, seat0, { icon: db.seats.get(seat0).icon })).status, 200, 'twin: the seat picture can be set');
    eq([(await S.addSeats(db, NONAMES, pid, { names: ['Ida'], count: 1 }, now())).status, [...db.seats.values()].filter((s) => s.classId === pid).length], [201, 3], 'adding seats to her numbers class adds counted seats');
    ok([...db.seats.values()].filter((s) => s.classId === pid).every((s) => s.displayName === null), 'again without a name');
    // a names class that exists (made while its teacher held the permission) takes no new name once she does not
    const held = await S.createClass(db, SUB2, { name: 'Held', namesMode: 'names', names: 'Ann' }, newCode);
    eq((await S.addSeats(db, { userId: 'sub2', usable: true }, held.body.id, { names: ['Bob'] }, now())).body, { error: 'names_off' }, 'a names class takes no new name from a teacher without the permission');
    eq((await S.addSeats(db, SUB2, held.body.id, { names: ['Bob'] }, now())).status, 201, 'twin: with the permission the name is added');
    eq((await S.updateClass(db, { userId: 'sub2', usable: true }, held.body.id, { namesMode: 'numbers' }, newCode, now())).status, 200, 'and she can always switch it to numbers only');
    db.usable.delete('plain');
  }

  // ── the one-time confirmation before a first class (legal decision 2026-11-14, E2) ──
  {
    db.usable.add('fresh'); db.unconfirmed.add('fresh');
    const FRESH = { userId: 'fresh', usable: true };
    eq((await S.listClasses(db, FRESH)).body.confirmed, false, 'a new teacher has not confirmed');
    let q = await S.createClass(db, FRESH, { name: 'First', count: 2 }, newCode);
    eq([q.status, q.body.error, q.body.version], [403, 'confirm_first', S.CONFIRM_VERSION], 'without the confirmation no class is made');
    eq((await S.createClass(db, FRESH, { name: 'First', count: 2, confirm: 'an-older-text' }, newCode)).status, 403, 'a confirmation of another text does not count');
    eq((await S.createClass(db, FRESH, { name: '', count: 2, confirm: S.CONFIRM_VERSION }, newCode)).status, 400, 'a class that cannot be made is refused for its own fault');
    ok(!db.confirmations.has('fresh') && ![...db.classes.values()].some((c) => c.teacherId === 'fresh'), 'and until then nothing is stored: no class, no confirmation');
    q = await S.createClass(db, FRESH, { name: 'First', count: 2, confirm: S.CONFIRM_VERSION }, newCode, now());
    eq([q.status, db.confirmations.get('fresh') && db.confirmations.get('fresh').version], [201, S.CONFIRM_VERSION], 'with the confirmation the class is made, and the confirmation is stored with the version of its text');
    ok(db.confirmations.get('fresh').at instanceof Date, 'and with its date');
    eq((await S.createClass(db, FRESH, { name: 'Second', count: 1 }, newCode)).status, 201, 'her second class needs no new confirmation');
    eq((await S.listClasses(db, FRESH)).body.confirmed, true, 'and the list says she has confirmed');
    db.usable.delete('fresh');
  }

  // numbers-only from the start, a new link key, the class cap
  db.usable.add('sub');
  r = await S.createClass(db, SUB, { name: '2A', namesMode: 'numbers', count: 3, names: 'Max\nLea' }, newCode);
  const c2 = r.body.id, code2 = r.body.code;
  r = await S.classPage(db, code2);
  eq(r.body.seats.map((s) => [s.n, s.name]), [[1, null], [2, null], [3, null]], 'a numbers-only class stores and shows no names, even if names were sent');
  eq((await S.updateSeat(db, SUB, c2, r.body.seats[0].id, { displayName: 'Max' })).status, 400, 'and refuses a name later');
  db.seats.get(r.body.seats[0].id).displayName = 'Leftover'; // a row that should not exist: the page must still not show it
  eq((await S.classPage(db, code2)).body.seats[0].name, null, 'a numbers-only class page shows no name even if one were left in the row');
  db.seats.get(r.body.seats[0].id).displayName = null;
  r = await S.updateClass(db, SUB, c2, { newCode: true }, newCode, now());
  ok(r.status === 200 && r.body.code !== code2, 'the teacher replaces the class link');
  eq((await S.classPage(db, code2)).status, 404, 'the old link stops working');
  eq((await S.classPage(db, r.body.code)).status, 200, 'the new one works');
  for (let i = 0; i < 18; i++) await S.createClass(db, SUB, { name: 'C' + i }, newCode);
  eq((await db.countClasses('sub')), 19, '(nineteen classes exist)');
  eq((await S.createClass(db, SUB, { name: 'twentieth' }, newCode)).status, 201, 'the twentieth class is accepted');
  eq((await S.createClass(db, SUB, { name: 'twenty-first' }, newCode)).status, 429, 'the twenty-first is refused');

  // ── release 2: an activity as an assignment ──
  eq(S.parseAssignmentLink('https://www.lessoncraftstudio.com/en/activities/make-10'), { kind: 'activity', locale: 'en', slug: 'make-10' }, 'an activity address');
  eq(S.parseAssignmentLink('/de/activities/verliebte-zahlen/'), { kind: 'activity', locale: 'de', slug: 'verliebte-zahlen' }, 'an activity path without the host, with a closing slash');
  eq(S.parseAssignmentLink('https://www.lessoncraftstudio.com/en/activities'), null, 'the list of activities is not an activity');
  eq(S.parseAssignmentLink('https://www.lessoncraftstudio.com/en/activities/make-10/more'), null, 'a longer path under an activity is refused');
  {
    const adb = makeDb({ now: () => new Date(T), activities: { 'en/make-10': { id: 'number-bond.make-10', title: 'Make 10' }, 'en/set-the-clock': { id: 'clock.set-the-clock', title: 'Set the Clock' } } });
    let q = await S.createClass(adb, SUB, { name: 'Class 1C', namesMode: 'names', locale: 'en', names: 'Max\nLea' }, newCode);
    const acid = q.body.id, acode = q.body.code;
    const [amax, alea] = (await S.getClass(adb, SUB, acid)).body.seats.map((s) => s.id);
    eq((await S.addAssignment(adb, SUB, acid, { link: '/en/activities/no-such-activity' }, now())).status, 404, 'an activity that does not exist is refused');
    eq((await S.addAssignment(adb, SUB, acid, { link: '/de/activities/make-10' }, now())).status, 404, 'an activity address in a language it does not have is refused');
    eq((await S.addAssignment(adb, FREE, acid, { link: '/en/activities/make-10' }, now())).status, 403, 'a free account cannot assign an activity');
    q = await S.addAssignment(adb, SUB, acid, { link: 'https://www.lessoncraftstudio.com/en/activities/make-10' }, now());
    eq([q.status, q.body.kind, q.body.title], [201, 'activity', 'Make 10'], 'an activity is assigned under its own title');
    const actA = q.body.id;
    eq((await S.addAssignment(adb, SUB, acid, { link: '/en/activities/make-10/' }, now())).body.existing, true, 'the same activity twice is the same assignment');
    q = await S.addAssignment(adb, SUB, acid, { link: '/en/activities/set-the-clock' }, now());
    eq([q.status, q.body.existing || false, q.body.title], [201, false, 'Set the Clock'], 'another activity is another assignment');
    eq((await adb.getAssignment(actA)).content, { kind: 'activity', locale: 'en', slug: 'make-10', activity: 'number-bond.make-10' }, 'the assignment keeps the address AND the id of the activity');
    q = await S.startAttempt(adb, { code: acode, seatId: amax, assignmentId: actA }, newToken, now());
    ok(q.status === 200 && /^\/en\/activities\/make-10#lcs=[a-z2-9]{20}$/.test(q.body.url), 'a child starts an activity: the activity page with the token after #');
    const atok = q.body.url.split('#lcs=')[1];
    eq((await adb.getAttempt(atok)).pageRef, 'make-10', "the attempt's page is the activity");
    eq(await S.tokenSkipsMeter(adb, atok), true, 'a class token on an activity skips the play meter');
    // the page reports once: seven solved tasks, one mark each (right at its first Check or not)
    q = await S.report(adb, { token: atok, right: 5, total: 7, items: [1, 1, 0, 1, 1, 0, 1], finished: true }, newToken, now());
    eq([q.status, q.body.done, q.body.back], [200, true, '/c/' + acode], 'a sitting of seven tasks is stored and sends the child back to the class page');
    const aatt = await adb.getAttempt(atok);
    eq([aatt.right, aatt.total, aatt.items, aatt.finished], [5, 7, [1, 1, 0, 1, 1, 0, 1], true], 'the result is the seven first Checks');
    q = await S.seatPage(adb, acode, amax, now());
    eq(q.body.assignments.find((a) => a.id === actA).state, 'done', "the child's page shows the activity as done");
    q = await S.seatPage(adb, acode, alea, now());
    eq(q.body.assignments.find((a) => a.id === actA).state, 'new', 'a child who has not played it sees it as new');
    q = await S.classResults(adb, SUB, acid);
    const cell = q.body.cells[amax][actA];
    eq([cell.plays, cell.first.right, cell.first.total, cell.first.band, cell.first.finished, cell.ladder], [1, 5, 7, 'mid', true, null], "the class sheet shows the activity's result and its band");
    ok(!q.body.cells[alea][actA], "a child who has not played has no cell");
    eq(q.body.assignments.find((x) => x.id === actA).kind, 'activity', "the class sheet names the assignment's kind");
    eq((await S.classResults(adb, SUB2, acid)).status, 404, "another teacher cannot read an activity's results");
  }

  // ── release 2: the dashboard by curriculum ──
  {
    const IX = {
      registry: 'en', locale: 'en', name: 'United States (Common Core, NGSS)',
      groups: [
        { fw: 'Common Core', code: 'K.CC.B.5', titles: ['Counting and Cardinality'], outside: false },
        { fw: null, code: null, titles: ['Handwriting'], outside: true },
        { fw: 'Common Core', code: '1.MD.B.3', titles: ['Measurement and Data'], outside: false },
      ],
      points: {
        'K:count': { g: 0, order: 5, set: 'k002', acts: ['retired-activity', 'make-10', 'count-on'], tool: { slug: 'ten-frame', name: 'Ten Frame' }, unit: { slug: 'counting-unit', n: 2, title: 'Count to 10', unit: 'Counting' } },
        'K:trace': { g: 1, order: 2, set: null, acts: [], tool: null, unit: null },
        '1:clock': { g: 2, order: 40, set: null, acts: ['set-the-clock'], tool: null, unit: null },
      },
      types: { k002: 'K:count', k100: 'K:trace' },
      activities: { 'number-bond.make-10': 'K:count', 'count.count-on': 'K:count', 'clock.set-the-clock': '1:clock' },
    };
    const CHOICES = [{ key: 'en', name: IX.name }, { key: 'en-tx', name: 'Texas (TEKS)' }];
    const asked = [];
    const pick = async (locale, wanted) => { asked.push([locale, wanted]); return locale === 'en' ? { index: wanted === 'en-tx' ? Object.assign({}, IX, { registry: 'en-tx', name: 'Texas (TEKS)' }) : IX, choices: CHOICES } : null; };
    eq(S.pointOfAssignment({ kind: 'deck', locale: 'en', slug: 'count-k002' }, IX), 'K:count', 'a page is placed by the type code its address ends with');
    eq(S.pointOfAssignment({ kind: 'deck', locale: 'en', slug: 'count-easy-k002-3' }, IX), 'K:count', 'a numbered copy of a page is placed like the page');
    eq(S.pointOfAssignment({ kind: 'deck', locale: 'en', slug: 'addition-animals' }, IX), null, 'a page with no type code is placed nowhere');
    eq(S.pointOfAssignment({ kind: 'deck', locale: 'en', slug: 'color-by-number-k002-10-forestrabbit' }, IX), 'K:count', 'a page whose address carries a picture name after the code is placed by the code');
    eq(S.pointOfAssignment({ kind: 'deck', locale: 'en', slug: 'trace-k100-then-count-k002-3' }, IX), 'K:count', 'the LAST code-shaped part of an address is its type code');
    eq(S.pointOfAssignment({ kind: 'ladder', locale: 'en', code: 'K002', levels: { easy: [], core: [], hard: [] } }, IX), 'K:count', 'a Level Set is placed by its code');
    eq(S.pointOfAssignment({ kind: 'activity', locale: 'en', slug: 'make-10', activity: 'number-bond.make-10' }, IX), 'K:count', 'an activity is placed by its id');
    eq(S.pointOfAssignment({ kind: 'maker', linkId: 'abcdefghjkmn' }, IX), null, "a teacher's own worksheet names no teaching point");

    const sdb = makeDb({ now: () => new Date(T), decks: { 'en/count-k002': { title: 'Count the Animals', interactive: true }, 'en/lines-k100': { title: 'Trace the Lines', interactive: true } }, activities: { 'en/make-10': { id: 'number-bond.make-10', title: 'Make 10' }, 'en/count-on': { id: 'count.count-on', title: 'Count On' }, 'en/set-the-clock': { id: 'clock.set-the-clock', title: 'Set the Clock' } } });
    let q = await S.createClass(sdb, SUB, { name: 'Class 1D', namesMode: 'names', locale: 'en', names: 'Max\nLea\nTom\nIda' }, newCode);
    const sid = q.body.id, scode = q.body.code;
    const [smax, slea, stom, sida] = (await S.getClass(sdb, SUB, sid)).body.seats.map((s) => s.id);
    const deckS = (await S.addAssignment(sdb, SUB, sid, { link: '/en/decks/count-k002/' }, now())).body.id;
    const actS = (await S.addAssignment(sdb, SUB, sid, { link: '/en/activities/make-10' }, now())).body.id;
    const makerS = (await S.addAssignment(sdb, SUB, sid, { link: '/s/abcdefghjkmn' }, now())).body.id;
    const playS = async (seat, assignment, marks) => {
      const s = await S.startAttempt(sdb, { code: scode, seatId: seat, assignmentId: assignment }, newToken, now());
      if (s.body.url) await S.report(sdb, Object.assign({ token: s.body.url.split('#lcs=')[1] }, marks), newToken, now());
      hours(1);
    };
    eq((await S.classSkills(sdb, null, sid, null, pick)).status, 401, 'signed out cannot read the view by curriculum');
    eq((await S.classSkills(sdb, SUB2, sid, null, pick)).status, 404, 'another teacher cannot read it');
    q = await S.classSkills(sdb, SUB, sid, null, pick);
    eq([q.status, q.body.groups.length, q.body.other.map((o) => o.id)], [200, 1, [makerS]], 'before any result: one heading with the work under it; the maker worksheet stands apart');
    eq([q.body.groups[0].counts, q.body.groups[0].next], [{ high: 0, mid: 0, low: 0, played: 0, none: 4 }, []], 'nobody has played: four children "not yet", no next step');
    eq(q.body.curriculum, { key: 'en', name: IX.name }, "the country's own curriculum is the one shown first");
    eq(q.body.curricula, CHOICES, 'the other curricula of the language are offered');

    await playS(smax, deckS, { right: 5, total: 5 });
    await playS(slea, deckS, { right: 2, total: 6 });
    await playS(stom, actS, { finished: true });
    q = await S.classSkills(sdb, SUB, sid, null, pick);
    let g = q.body.groups[0];
    eq([g.key, g.fw, g.code, g.titles, g.outside], ['g0', 'Common Core', 'K.CC.B.5', ['Counting and Cardinality'], false], 'the heading is the framework, the official code and the title of the part it stands under');
    eq(g.work.map((w) => [w.id, w.kind]), [[deckS, 'deck'], [actS, 'activity']], 'a page and an activity on the same teaching point stand under one heading');
    eq(g.bands, { [smax]: 'high', [slea]: 'low', [stom]: 'played' }, 'per child: almost all right, many wrong, played with no marks');
    eq(g.counts, { high: 1, mid: 0, low: 1, played: 1, none: 1 }, 'the counts add up to the class');
    eq(g.next, [
      { kind: 'set', title: 'Count and Write', link: '/en/worksheets/sets/k002' },
      { kind: 'activity', title: 'Count On', link: '/en/activities/count-on' },
      { kind: 'tool', title: 'Ten Frame', href: '/en/tools/ten-frame' },
      { kind: 'unit', title: 'Count to 10', unit: 'Counting', n: 2, href: '/en/units/counting-unit' },
    ], 'a child had many wrong: the Level Set, an activity the class does not have yet (and that is live: the retired one is passed over), the tool and the unit lesson are offered');
    ok(!JSON.stringify(q.body).includes('teacherId'), 'the view carries no owner id');
    eq((await S.addAssignment(sdb, SUB, sid, { link: g.next[0].link }, now())).body.kind, 'ladder', 'the offered Level Set link can be assigned as it is');
    eq((await S.addAssignment(sdb, SUB, sid, { link: g.next[1].link }, now())).body.kind, 'activity', 'the offered activity link can be assigned as it is');
    q = await S.classSkills(sdb, SUB, sid, null, pick);
    g = q.body.groups[0];
    eq(g.next.map((n) => n.kind), ['tool', 'unit'], 'what the class now has is not offered again');
    eq(g.work.length, 4, 'the new work stands under the same heading');

    // the most recent result under a heading counts
    await playS(slea, actS, { right: 7, total: 7, items: [1, 1, 1, 1, 1, 1, 1] });
    q = await S.classSkills(sdb, SUB, sid, null, pick);
    eq(q.body.groups[0].bands[slea], 'high', 'a later result under the same heading replaces the earlier one');
    eq(q.body.groups[0].next, [], 'no child with some or many wrong: no next step');
    // the same page played again is not new evidence
    await playS(smax, deckS, { right: 1, total: 5 });
    q = await S.classSkills(sdb, SUB, sid, null, pick);
    eq(q.body.groups[0].bands[smax], 'high', 'a single page counts by its FIRST play');
    // a Level Set counts by the last page played; a finished set is almost all right
    const ladS = q.body.groups[0].work.find((w) => w.kind === 'ladder').id;
    await playS(sida, ladS, { right: 3, total: 10 });
    q = await S.classSkills(sdb, SUB, sid, null, pick);
    eq(q.body.groups[0].bands[sida], 'low', 'a Level Set: the last page played');
    await playS(sida, ladS, { right: 9, total: 10 });
    q = await S.classSkills(sdb, SUB, sid, null, pick);
    eq(q.body.groups[0].bands[sida], 'high', 'a Level Set: a later page replaces the earlier one');

    // headings come in teaching order; a point the curriculum does not name stands under its domain
    const clockS = (await S.addAssignment(sdb, SUB, sid, { link: '/en/activities/set-the-clock' }, now())).body.id;
    await playS(stom, clockS, { right: 5, total: 7, items: [1, 1, 0, 1, 0, 1, 1] });
    q = await S.classSkills(sdb, SUB, sid, null, pick);
    eq(q.body.groups.map((x) => x.code), ['K.CC.B.5', '1.MD.B.3'], 'headings stand in teaching order');
    eq([q.body.groups[1].bands, q.body.groups[1].next], [{ [stom]: 'mid' }, []], 'some wrong, and nothing else exists for that point: no step is invented');
    await S.addAssignment(sdb, SUB, sid, { link: '/en/decks/lines-k100/' }, now());
    q = await S.classSkills(sdb, SUB, sid, null, pick);
    eq(q.body.groups.map((x) => [x.code, x.outside, x.titles[0]]), [[null, true, 'Handwriting'], ['K.CC.B.5', false, 'Counting and Cardinality'], ['1.MD.B.3', false, 'Measurement and Data']], 'work added last but taught first stands first; a point the curriculum does not name stands under its domain, marked as outside');

    // another curriculum of the same language; a curriculum of another language is refused
    q = await S.classSkills(sdb, SUB, sid, 'en-tx', pick);
    eq(q.body.curriculum.key, 'en-tx', 'the teacher can read the class against Texas');
    await S.classSkills(sdb, SUB, sid, 'DROP TABLE', pick);
    eq(asked[asked.length - 1], ['en', null], 'a curriculum key that is not a key is not passed on');
    eq((await S.classSkills(sdb, SUB, sid, null, async () => ({ index: Object.assign({}, IX, { locale: 'de' }), choices: [] }))).status, 404, 'an index of another language is refused');
    eq((await S.classSkills(sdb, SUB, sid, null, async () => null)).status, 404, 'a language with no curriculum registry answers "not found", not an error');
    eq((await S.classSkills(sdb, { userId: 'sub', usable: false }, sid, null, pick)).body.canEdit, false, 'a lapsed teacher can read the view and is told she cannot edit');
  }

  // ── retention ──
  const day = 24 * 3600 * 1000, t0 = new Date('2026-01-01T00:00:00Z');
  const at = (d) => new Date(t0.getTime() + d * day);
  eq(S.classExpired({ lastUsedAt: t0 }, { usable: true, endedAt: null }, at(427)), false, 'a class unused for exactly 427 days is kept');
  eq(S.classExpired({ lastUsedAt: t0 }, { usable: true, endedAt: null }, at(428)), true, 'a class unused for 14 months is removed');
  eq(S.classExpired({ lastUsedAt: at(100) }, { usable: false, endedAt: at(40) }, at(100)), false, 'sixty days after the plan ended the class is still kept');
  eq(S.classExpired({ lastUsedAt: at(101) }, { usable: false, endedAt: at(40) }, at(101)), true, 'on day sixty-one it is removed');
  eq(S.classExpired({ lastUsedAt: at(200) }, { usable: true, endedAt: at(40) }, at(200)), false, 'a teacher who subscribed again keeps the class');

  console.log(fails ? `${fails} of ${n} checks FAILED` : `class-store: ${n} checks pass`);
  process.exit(fails ? 1 : 0);
})().catch((e) => { console.error(e); process.exit(1); });
let ida;
