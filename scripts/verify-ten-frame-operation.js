#!/usr/bin/env node
/* =====================================================================
   verify-ten-frame-operation.js — build-time correctness gate for the
   K.OA.A.1 "Show the Operation" represent-operation ten-frame activity.
   ---------------------------------------------------------------------
   Loads the REAL mini tools/ten-frame-core.js (window shim) + the shipped
   manifest row, and proves, MEASURED:
     1. each problem op ∈ {+, − [U+2212]}, within 10 (sums ≤10; subtraction
        a ≤10, b ≥1, a−b ≥0; both addends ≥1);
     2. driving the REAL core.setCount (capacity = frames*10 = 10):
        addition  setCount(0) → setCount(a+b) ⇒ count === a+b;
        subtraction setCount(a) → setCount(a−b) ⇒ count === a−b
        (i.e. the result fits the single frame, no clamp distortion);
     3. the wrapper grade predicate count === result accepts the result and
        rejects result ± 1;
     4. the pool spans BOTH + and −;
     5. ≥7 problems (§A.13.60).
   paint() is stubbed (DOM-free); the two-colour RENDER is covered by the
   puppeteer local-test + the 280/390 eyeball. Exit 0 = pass; 1 = any failure.
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const VARIETY_MIN = 7;
const ROW_ID = 'ten-frame.show-the-operation.k-oa-a-1';
const REPO = path.join(__dirname, '..');
const coreSrc = fs.readFileSync(path.join(REPO, 'mini tools', 'ten-frame-core.js'), 'utf8');
const win = {};
new Function('window', coreSrc)(win);
const Core = win.TenFrameCore;
if (!Core) { console.error('FAIL: ten-frame-core.js did not define window.TenFrameCore'); process.exit(1); }

const manifest = JSON.parse(fs.readFileSync(path.join(REPO, 'mini tools', 'ten-frame-activities.json'), 'utf8'));
const row = manifest.find((r) => r.id === ROW_ID);
const failures = [];
const check = (cond, msg) => { if (!cond) failures.push(msg); };

if (!row) { console.error('FAIL: manifest row ' + ROW_ID + ' not found'); process.exit(1); }
check(row.task_template === 'represent-operation', `row task_template ${row.task_template} ≠ represent-operation`);
check(row.alignment && row.alignment.code === 'K.OA.A.1', `row alignment ${row.alignment && row.alignment.code} ≠ K.OA.A.1`);
check((row.params && row.params.frames) === 1, `row frames ${row.params && row.params.frames} ≠ 1 (within-10 single frame)`);

const problems = (row.params && Array.isArray(row.params.problems)) ? row.params.problems : [];
check(problems.length >= VARIETY_MIN, `${problems.length} problems < ${VARIETY_MIN} variety floor (§A.13.60)`);

/* one shared core; paint stubbed so setCount runs DOM-free */
Core.init({ settings: { frames: 1 }, sound: function () {}, track: function () {}, announce: function () {} });
Core.paint = function () {};
const cap = Core.capacity();
check(cap === 10, `capacity ${cap} ≠ 10 (frames=1)`);

const opsSeen = new Set();
problems.forEach((p, i) => {
  const a = p.a, b = p.b, op = p.op;
  const label = `problem#${i}[${a}${op}${b}]`;
  const isAdd = (op === '+'), isSub = (op === '−');
  check(isAdd || isSub, `${label}: op "${op}" not + or − (U+2212)`);
  if (!(isAdd || isSub)) return;
  opsSeen.add(isAdd ? '+' : '-');
  check(a >= 1 && b >= 1, `${label}: addends not ≥1`);
  const result = isAdd ? (a + b) : (a - b);
  if (isAdd) check(a + b <= 10, `${label}: sum ${a + b} > 10`);
  else { check(a <= 10, `${label}: minuend ${a} > 10`); check(result >= 0, `${label}: negative result ${result}`); }
  check(a <= 10, `${label}: first operand ${a} exceeds capacity`);

  /* drive the REAL core.setCount */
  if (isAdd) {
    Core.count = 0; Core.setCount(0);
    Core.splitAt = a; Core.splitColor = '#1B9E8F';
    Core.setCount(a + b);
    check(Core.count === a + b, `${label}: addition setCount reached ${Core.count} ≠ ${a + b}`);
  } else {
    Core.splitAt = null; Core.splitColor = null;
    Core.count = 0; Core.setCount(a);
    check(Core.count === a, `${label}: subtraction pre-fill reached ${Core.count} ≠ ${a}`);
    Core.setCount(a - b);
    check(Core.count === a - b, `${label}: subtraction setCount reached ${Core.count} ≠ ${a - b}`);
  }
  /* grade predicate count === result */
  check((Core.count === result) === true, `${label}: predicate fails at result ${result}`);
  check((Core.count === result + 1) === false && (Core.count === result - 1) === false, `${label}: predicate not discriminating`);
});

check(opsSeen.has('+') && opsSeen.has('-'), `pool must span BOTH + and − (saw: ${[...opsSeen].join(',')})`);

if (failures.length) {
  console.error(`FAIL — ${failures.length} violation(s) across ${problems.length} problem(s):`);
  failures.forEach((f) => console.error('  • ' + f));
  process.exit(1);
}
console.log(`PASS — ${problems.length} problem(s): op ∈ {+,−}, within 10; REAL core.setCount reaches a+b (add) / a−b (sub) within the single frame; predicate count===result discriminates; pool spans +/−; ≥${VARIETY_MIN}.`);
process.exit(0);
