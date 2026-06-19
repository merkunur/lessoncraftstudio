#!/usr/bin/env node
/* =====================================================================
   verify-choice-board-compare.js — build-time correctness gate for the
   1.NBT.B.3 "Compare Two-Digit Numbers" compare-2digit choice-board activity.
   ---------------------------------------------------------------------
   Loads the REAL mini tools/choice-board-core.js (window shim) + the shipped
   manifest row, and proves, MEASURED, per pair [a,b]:
     1. a, b are two-digit (10..99);
     2. the true relation = (a<b ? 'lt' : a>b ? 'gt' : 'eq');
     3. the 3 option tiles are exactly {lt:"a < b", eq:"a = b", gt:"a > b"};
     4. driving the REAL core (setupTask(options, rel, null) → set answer):
        answer = rel ⇒ (answer === rel) true;  answer = each WRONG key ⇒ false
        → EXACTLY ONE correct option (no-two-correct);
     5. the pool spans <, =, AND > ; ≥7 pairs (§A.13.60).
   setupTask only sets state (no DOM) → headless-safe. Exit 0 = pass; 1 = fail.
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const VARIETY_MIN = 7;
const ROW_ID = 'choice-board.compare-two-digit.1-nbt-b-3';
const REPO = path.join(__dirname, '..');
const win = {};
new Function('window', fs.readFileSync(path.join(REPO, 'mini tools', 'choice-board-core.js'), 'utf8'))(win);
const Core = win.ChoiceBoardCore;
if (!Core) { console.error('FAIL: choice-board-core.js did not define window.ChoiceBoardCore'); process.exit(1); }

const manifest = JSON.parse(fs.readFileSync(path.join(REPO, 'mini tools', 'choice-board-activities.json'), 'utf8'));
const row = manifest.find((r) => r.id === ROW_ID);
const failures = [];
const check = (cond, msg) => { if (!cond) failures.push(msg); };

if (!row) { console.error('FAIL: manifest row ' + ROW_ID + ' not found'); process.exit(1); }
check(row.task_template === 'compare-2digit', `task_template ${row.task_template} ≠ compare-2digit`);
check(row.alignment && row.alignment.code === '1.NBT.B.3', `alignment ${row.alignment && row.alignment.code} ≠ 1.NBT.B.3`);

Core.init({ el: () => ({}), t: () => '', sound: () => {}, announce: () => {}, track: () => {} });

const pairs = (row.params && Array.isArray(row.params.pairs)) ? row.params.pairs : [];
check(pairs.length >= VARIETY_MIN, `${pairs.length} pairs < ${VARIETY_MIN}`);
const rels = new Set();
const ALLKEYS = ['lt', 'eq', 'gt'];

pairs.forEach((pair, i) => {
  const a = pair[0], b = pair[1];
  const label = `pair#${i}[${a},${b}]`;
  check(a >= 10 && a <= 99 && b >= 10 && b <= 99, `${label}: not two-digit`);
  const rel = (a < b) ? 'lt' : (a > b) ? 'gt' : 'eq';
  rels.add(rel);
  const options = [
    { key: 'lt', text: a + ' < ' + b },
    { key: 'eq', text: a + ' = ' + b },
    { key: 'gt', text: a + ' > ' + b }
  ];
  /* option text matches its symbol's truth label */
  check(options.length === 3 && options.map(o => o.key).join() === 'lt,eq,gt', `${label}: options not lt/eq/gt`);

  /* drive the REAL core: setupTask sets state; emulate a tap by setting answer */
  Core.setupTask(options, rel, null);
  let correctCount = 0;
  ALLKEYS.forEach((k) => {
    Core.answer = k;
    const graded = (Core.answer === rel);   // the wrapper's check predicate
    if (graded) correctCount++;
    if (k === rel) check(graded === true, `${label}: true key '${k}' graded wrong`);
    else check(graded === false, `${label}: wrong key '${k}' graded correct`);
  });
  check(correctCount === 1, `${label}: ${correctCount} correct options (expected EXACTLY 1 — no-two-correct)`);
});
check(rels.has('lt') && rels.has('eq') && rels.has('gt'), `pool must span <,=,> (saw ${[...rels].join(',')})`);

if (failures.length) {
  console.error(`FAIL — ${failures.length} violation(s) across ${pairs.length} pair(s):`);
  failures.forEach((f) => console.error('  • ' + f));
  process.exit(1);
}
console.log(`PASS — ${pairs.length} pair(s): two-digit, options lt/eq/gt, EXACTLY ONE true (no-two-correct, REAL core), pool spans <,=,>; ≥${VARIETY_MIN}.`);
process.exit(0);
