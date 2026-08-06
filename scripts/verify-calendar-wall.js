#!/usr/bin/env node
/* =====================================================================
   verify-calendar-wall.js — the MODEL gate. Node only, no browser.
   ---------------------------------------------------------------------
   Run:  node scripts/verify-calendar-wall.js

   It drives the pure MODEL block inside `mini tools/calendar-wall.js` and
   proves the arithmetic a calendar has to get right: local date keys
   across both DST transitions and both year boundaries, the month matrix
   over nine years x twelve months x two week-starts, the school-day
   record, event runs and yearly repeats, and the two countdown numbers.

   ⭐ IT EXTRACTS THE MODEL BY BRACE-MATCHING RATHER THAN require()-ing
   THE TOOL, so it can run against a file whose view half is mid-edit.
   That is what let the model be proven before a single pixel existed —
   which is the whole point of having the seam.

   ⚠ THE GROUND TRUTH IS ITS OWN. Where the model computes a month
   matrix, this recomputes the offset and the day list independently and
   compares; it never asks the tool whether the tool is right. A gate
   that reads its expectation off the thing under test marks its own
   homework, and this programme has shipped that mistake before.

   ⚠ AND IT IS POISON-TESTED: `mutate-calendar-wall.js` breaks twelve
   invariants one at a time and requires this to fail on every one. The
   first run of that harness found a REAL HOLE here — the
   "an event never changes the day count" assertion was being made on a
   day that carried no count, so it could not have failed. It is now made
   where it can.
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');
/* env indirection so the mutation harness can point us at a copy */
const TOOL = process.env.CWL_TOOL || path.join(__dirname, '..', 'mini tools', 'calendar-wall.js');
const src = fs.readFileSync(TOOL, 'utf8');
const start = src.indexOf('var MODEL = {');
if (start < 0) { console.error('MODEL not found'); process.exit(1); }
let i = src.indexOf('{', start), depth = 0, end = -1, inStr = null, inCmt = null;
for (; i < src.length; i++) {
  const c = src[i], n = src[i + 1];
  if (inCmt === 'line') { if (c === '\n') inCmt = null; continue; }
  if (inCmt === 'block') { if (c === '*' && n === '/') { inCmt = null; i++; } continue; }
  if (inStr) { if (c === '\\') { i++; continue; } if (c === inStr) inStr = null; continue; }
  if (c === '/' && n === '/') { inCmt = 'line'; i++; continue; }
  if (c === '/' && n === '*') { inCmt = 'block'; i++; continue; }
  if (c === '"' || c === "'") { inStr = c; continue; }
  if (c === '{') depth++;
  else if (c === '}') { depth--; if (depth === 0) { end = i; break; } }
}
if (end < 0) { console.error('unbalanced MODEL'); process.exit(1); }
const M = new Function('return ' + src.slice(src.indexOf('{', start), end + 1))();

let fails = 0;
const ok = (c, m) => { console.log((c ? '  ok   ' : '  FAIL ') + m); if (!c) fails++; };

console.log('\n-- keys + day arithmetic --');
ok(M.keyOf(2026, 7, 4) === '2026-08-04', 'keyOf is 0-indexed months');
ok(M.isKey('2026-08-04') && !M.isKey('2026-02-30') && !M.isKey('2026-13-01'), 'isKey rejects impossible dates');
ok(!M.isKey('2027-02-29') && M.isKey('2028-02-29'), 'isKey knows leap years');
ok(M.shiftKey('2026-08-31', 1) === '2026-09-01', 'shiftKey crosses a month');
ok(M.shiftKey('2026-12-31', 1) === '2027-01-01', 'shiftKey crosses a year');
ok(M.shiftKey('2028-02-28', 1) === '2028-02-29', 'shiftKey crosses into a leap day');
/* DST: EU clocks go forward last Sunday of March, back last Sunday of October */
ok(M.shiftKey('2026-03-28', 1) === '2026-03-29' && M.shiftKey('2026-03-29', 1) === '2026-03-30', 'shiftKey across spring DST');
ok(M.shiftKey('2026-10-24', 1) === '2026-10-25' && M.shiftKey('2026-10-25', 1) === '2026-10-26', 'shiftKey across autumn DST');
ok(M.sleepsBetween('2026-03-01', '2026-04-01') === 31, 'sleepsBetween spans a DST change exactly');
ok(M.sleepsBetween('2026-10-01', '2026-11-01') === 31, 'sleepsBetween spans the other DST change');
ok(M.sleepsBetween('2026-08-04', '2026-08-04') === 0, 'sleepsBetween of one day is 0');
ok(M.sleepsBetween('2026-08-05', '2026-08-04') === -1, 'sleepsBetween is signed');

console.log('\n-- month matrix --');
let bad = [];
for (let y = 2024; y <= 2032; y++) for (let m = 0; m < 12; m++) {
  for (const ws of ['mon', 'sun']) {
    const ym = y + '-' + String(m + 1).padStart(2, '0');
    const mx = M.monthMatrix(ym, ws);
    const days = mx.cells.filter(c => c.key).map(c => c.day);
    const n = new Date(y, m + 1, 0).getDate();
    if (mx.cells.length !== mx.rows * 7) bad.push(ym + '/' + ws + ' cells!=rows*7');
    if (days.length !== n) bad.push(ym + '/' + ws + ' has ' + days.length + ' of ' + n);
    if (days.join(',') !== Array.from({ length: n }, (_, k) => k + 1).join(',')) bad.push(ym + '/' + ws + ' out of order');
    if (mx.rows < 4 || mx.rows > 6) bad.push(ym + '/' + ws + ' rows=' + mx.rows);
    const first = mx.cells.findIndex(c => c.key);
    const wantOff = (new Date(y, m, 1).getDay() - (ws === 'sun' ? 0 : 1) + 7) % 7;
    if (first !== wantOff) bad.push(ym + '/' + ws + ' offset ' + first + '!=' + wantOff);
  }
}
ok(bad.length === 0, 'monthMatrix over 9 years x 12 months x 2 week-starts' + (bad.length ? ' :: ' + bad.slice(0, 4).join(' | ') : ''));
const feb = M.monthMatrix('2027-02', 'mon');
ok(feb.rows === 4, 'Feb 2027 from Monday is the genuine 4-row month (rows=' + feb.rows + ')');

console.log('\n-- the school-day record --');
let w = M.newWall(null);
ok(M.dayCount(w) === 0, 'a new wall counts 0');
ok(M.countDay(w, '2026-08-03') === 1, 'first counted day is ordinal 1');
ok(M.countDay(w, '2026-08-03') === null, 'counting the same day twice REFUSES');
ok(M.countDay(w, '2026-08-08') === null, 'counting a Saturday REFUSES (default meets)');
ok(M.countDay(w, '2026-08-04') === 2, 'second school day is ordinal 2');
ok(M.dayCount(w) === 2 && M.ordinalOn(w, '2026-08-04') === 2, 'ordinal is written into the day');
ok(M.uncountDay(w, '2026-08-03') === null, 'only the LATEST day can be un-counted');
ok(M.uncountDay(w, '2026-08-04') === 1, 'un-counting the latest returns the new count');
ok(M.dayCount(w) === 1, 'and the count really dropped');

console.log('\n-- events, and the invariant that they never touch the count --');
const before = M.dayCount(w);
const id = M.addEvent(w, '2026-08-10', 'trip', '  Zoo   trip  ', 3, 'once');
ok(!!id, 'addEvent returns an id');
ok(M.findEvent(w, id).e.t === 'Zoo trip', 'cleanText collapsed the whitespace');
ok(M.eventsOn(w, '2026-08-10').length === 1 && M.eventsOn(w, '2026-08-10')[0].isStart, 'run day 1 is the start');
ok(M.eventsOn(w, '2026-08-12').length === 1 && M.eventsOn(w, '2026-08-12')[0].isEnd, 'run day 3 is the end');
ok(M.eventsOn(w, '2026-08-13').length === 0, 'the run stops after span');
ok(M.dayCount(w) === before, 'THE INVARIANT: adding an event did not change the count');
const offId = M.addEvent(w, '2026-08-05', 'off', '', 1, 'once');
ok(M.isSchoolDay(w, '2026-08-05') === false, 'an off mark makes a weekday not a school day');
ok(M.countDay(w, '2026-08-05') === null, 'and the +1 refuses on it');
ok(M.dayCount(w) === before, 'THE INVARIANT again: the off mark did not change the count');
M.removeEvent(w, offId);
ok(M.isSchoolDay(w, '2026-08-05') === true, 'removing the off mark restores the school day');

/* ⚠ THE ASSERTION ABOVE WAS VACUOUS ON ITS OWN AND THE POISON RUN PROVED IT.
   `2026-08-03` is the only counted day here, so marking `2026-08-05` off
   could not have disturbed a count even if the code had tried — the
   "an off mark decrements the count" poison SURVIVED against it. The
   invariant is only tested when the marked day is one that CARRIES a
   count, which is exactly the case a teacher hits: she counts Monday,
   then remembers Monday was an in-service day. */
let wInv = M.newWall(null);
M.countDay(wInv, '2026-08-03');          /* Monday, ordinal 1 */
M.countDay(wInv, '2026-08-04');          /* Tuesday, ordinal 2 */
const invBefore = M.dayCount(wInv);
const invOrd = M.ordinalOn(wInv, '2026-08-03');
M.addEvent(wInv, '2026-08-03', 'off', '', 1, 'once');
ok(M.dayCount(wInv) === invBefore, 'THE INVARIANT, tested where it can fail: marking a COUNTED day off leaves the count at ' + invBefore);
ok(M.ordinalOn(wInv, '2026-08-03') === invOrd, 'and that day keeps the ordinal it earned');
const invId = M.addEvent(wInv, '2026-08-04', 'off', '', 1, 'once');
ok(M.dayCount(wInv) === invBefore, 'marking the LATEST counted day off still leaves the count alone');
M.removeEvent(wInv, invId);
ok(M.dayCount(wInv) === invBefore, 'and removing the mark does not change it either');

console.log('\n-- yearly repeats --');
let w2 = M.newWall(null);
M.addEvent(w2, '2026-03-09', 'bday', '', 1, 'year');
ok(M.eventsOn(w2, '2026-03-09').length === 1, 'the origin year fires');
ok(M.eventsOn(w2, '2027-03-09').length === 1 && M.eventsOn(w2, '2027-03-09')[0].viaRepeat, 'the next year repeats');
ok(M.eventsOn(w2, '2030-03-09').length === 1, 'four years on still repeats');
ok(M.eventsOn(w2, '2027-03-10').length === 0, 'and not on the wrong day');
ok(M.eventsOn(w2, '2025-03-09').length === 0, 'a repeat never fires BEFORE its origin');
let w3 = M.newWall(null);
M.addEvent(w3, '2028-02-29', 'bday', '', 1, 'year');
ok(M.eventsOn(w3, '2028-02-29').length === 1, 'a 29 Feb event exists in its own leap year');
ok(M.eventsOn(w3, '2029-02-28').length === 0, 'and does NOT slide onto the 28th in a common year');

console.log('\n-- the two countdown numbers --');
let w4 = M.newWall(null);
const tid = M.addEvent(w4, '2026-08-17', 'trip', 'Zoo', 1, 'once');   /* a Monday */
M.setTarget(w4, tid);
let c = M.countdown(w4, '2026-08-05');                                 /* a Wednesday */
ok(c && c.sleeps === 12, 'sleeps = 12 (got ' + (c && c.sleeps) + ')');
ok(c && c.schoolDays === 8, 'school days = 8, the gap being the lesson (got ' + (c && c.schoolDays) + ')');
M.addEvent(w4, '2026-08-13', 'off', '', 1, 'once');
c = M.countdown(w4, '2026-08-05');
ok(c && c.sleeps === 12 && c.schoolDays === 7, 'one off mark moves ONLY the school-day number');
ok(M.countdown(w4, '2026-07-01') === null, 'beyond the 21-day horizon the chip does not render');
ok(M.countdown(w4, '2026-08-18') === null, 'a past target does not render');
c = M.countdown(w4, '2026-08-17');
ok(c && c.today === true && c.sleeps === 0, 'on the day it says so');
ok(M.countdownPath(w4, '2026-08-05').length === 12, 'the path is 12 cells');
ok(M.countdownPath(w4, '2026-08-05')[0].n === 1, 'numbered from 1 (never an arrow)');

console.log('\n-- the inverted pattern --');
let w5 = M.newWall(null);
w5.pattern = 'ab';
M.countDay(w5, '2026-08-03'); M.countDay(w5, '2026-08-04'); M.countDay(w5, '2026-08-05');
ok(M.patternIndexOn(w5, '2026-08-03') === 0 && M.patternIndexOn(w5, '2026-08-04') === 1 && M.patternIndexOn(w5, '2026-08-05') === 0, 'AB runs over ORDINALS, not dates');
ok(M.patternIndexOn(w5, '2026-08-06') === null, 'an uncounted day has no card yet');
ok(M.nextPatternIndex(w5) === 1, 'and "what goes on tomorrow?" has a findable answer');

console.log('\n-- totality --');
ok(M.wall(null).days && M.wall(undefined).events && M.wall(0).weather, 'wall() is total on null/undefined/0');
ok(M.wall({ days: { 'nope': { n: 3 }, '2026-08-04': { n: -1 } } }).days['2026-08-04'] === undefined, 'wall() drops junk days');
ok(M.cleanText(null) === '' && M.cleanText(undefined) === '' && M.cleanText(12) === '12', 'cleanText is total');
ok(M.cleanText('x'.repeat(80), 40).length === 40, 'cleanText caps');
ok(M.event({ k: 'nope' }) === null && M.event(null) === null, 'event() rejects an unknown kind');
ok(M.event({ k: 'trip', span: 999 }).span === M.MAX_SPAN, 'span is clamped');

console.log('\n' + (fails ? 'RESULT: FAIL (' + fails + ')' : 'RESULT: PASS'));
process.exit(fails ? 1 : 0);
