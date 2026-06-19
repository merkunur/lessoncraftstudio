#!/usr/bin/env node
/* =====================================================================
   verify-ten-frame-quickfact.js — build-time correctness gate for the
   K.OA.A.5 "Quick Facts to 5" fluency ten-frame activity.
   ---------------------------------------------------------------------
   Loads the REAL mini tools/ten-frame-core.js + the shipped manifest row,
   and proves, MEASURED, per problem:
     1. op ∈ {+, − [U+2212]}, within 5 (sum ≤5 / minuend ≤5 / answer ≥0);
     2. answer === (op==='+' ? a+b : a−b);
     3. choices: length 3, all distinct, all in 0..10, contains `answer`,
        and EXACTLY ONE chip equals answer (no-two-correct);
     4. driving core.setCount(answer) ⇒ count === answer (fits the frame);
     5. the pool spans BOTH + and −;
     6. ≥7 problems (§A.13.60).
   paint() stubbed (DOM-free). Exit 0 = pass; 1 = any failure.
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const VARIETY_MIN = 7;
const ROW_ID = 'ten-frame.quick-facts-to-5.k-oa-a-5';
const REPO = path.join(__dirname, '..');
const win = {};
new Function('window', fs.readFileSync(path.join(REPO, 'mini tools', 'ten-frame-core.js'), 'utf8'))(win);
const Core = win.TenFrameCore;
if (!Core) { console.error('FAIL: ten-frame-core.js did not define window.TenFrameCore'); process.exit(1); }

const manifest = JSON.parse(fs.readFileSync(path.join(REPO, 'mini tools', 'ten-frame-activities.json'), 'utf8'));
const row = manifest.find((r) => r.id === ROW_ID);
const failures = [];
const check = (cond, msg) => { if (!cond) failures.push(msg); };

if (!row) { console.error('FAIL: manifest row ' + ROW_ID + ' not found'); process.exit(1); }
check(row.task_template === 'quick-fact', `task_template ${row.task_template} ≠ quick-fact`);
check(row.alignment && row.alignment.code === 'K.OA.A.5', `alignment ${row.alignment && row.alignment.code} ≠ K.OA.A.5`);

Core.init({ settings: { frames: 1 }, sound: function () {}, track: function () {}, announce: function () {} });
Core.paint = function () {};

const problems = (row.params && Array.isArray(row.params.problems)) ? row.params.problems : [];
check(problems.length >= VARIETY_MIN, `${problems.length} problems < ${VARIETY_MIN}`);
const opsSeen = new Set();
problems.forEach((p, i) => {
  const label = `problem#${i}[${p.a}${p.op}${p.b}]`;
  const isAdd = (p.op === '+'), isSub = (p.op === '−');
  check(isAdd || isSub, `${label}: op "${p.op}" not + or − (U+2212)`);
  if (!(isAdd || isSub)) return;
  opsSeen.add(isAdd ? '+' : '-');
  const expect = isAdd ? (p.a + p.b) : (p.a - p.b);
  check(p.answer === expect, `${label}: answer ${p.answer} ≠ ${expect}`);
  if (isAdd) check(p.a + p.b <= 5, `${label}: sum ${p.a + p.b} > 5`);
  else check(p.a <= 5, `${label}: minuend ${p.a} > 5`);
  check(p.answer >= 0, `${label}: negative answer`);
  /* choices integrity */
  const ch = Array.isArray(p.choices) ? p.choices : [];
  check(ch.length === 3, `${label}: ${ch.length} choices (expected 3)`);
  check(new Set(ch).size === ch.length, `${label}: duplicate choices ${JSON.stringify(ch)}`);
  check(ch.every((c) => c >= 0 && c <= 10), `${label}: a choice out of 0..10 ${JSON.stringify(ch)}`);
  check(ch.filter((c) => c === p.answer).length === 1, `${label}: answer ${p.answer} not EXACTLY ONE chip (no-two-correct) ${JSON.stringify(ch)}`);
  /* core fits */
  Core.count = 0; Core.setCount(p.answer);
  check(Core.count === p.answer, `${label}: core.setCount(${p.answer}) → ${Core.count}`);
});
check(opsSeen.has('+') && opsSeen.has('-'), `pool must span + and − (saw ${[...opsSeen].join(',')})`);

if (failures.length) {
  console.error(`FAIL — ${failures.length} violation(s) across ${problems.length} problem(s):`);
  failures.forEach((f) => console.error('  • ' + f));
  process.exit(1);
}
console.log(`PASS — ${problems.length} problem(s): op∈{+,−} within 5, answer===a±b, choices len-3 distinct with EXACTLY ONE correct (no-two-correct), core fits frame, pool spans +/−, ≥${VARIETY_MIN}.`);
process.exit(0);
