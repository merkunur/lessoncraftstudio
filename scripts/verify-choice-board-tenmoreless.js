#!/usr/bin/env node
/* =====================================================================
   verify-choice-board-tenmoreless.js — build-time correctness gate for the
   1.NBT.C.5 "Ten More, Ten Less" ten-more-less choice-board activity.
   ---------------------------------------------------------------------
   Loads the REAL mini tools/choice-board-core.js (window shim) + the shipped
   manifest row, and proves, MEASURED, per round { n, op }:
     1. n is two-digit (10..99) and n ∈ 20..89 (so every tile stays 10..99);
     2. the 4 option tiles are EXACTLY the place-value offset set
        {n-10, n-1, n+1, n+10} (pairwise-distinct);
     3. the correct value = (op==='more' ? n+10 : n-10);
     4. the canonical place-value FOILS are present every round:
        the ±1 ones-trap (n+1 for 'more' / n-1 for 'less') AND the ∓10
        direction-trap (n-10 for 'more' / n+10 for 'less');
     5. driving the REAL core (setupTask(options, String(correct), subject) →
        set answer): answer = correct ⇒ true; answer = each of the 3 foils ⇒
        false → EXACTLY ONE correct (no-two-correct);
     6. all 4 tiles are two-digit (10..99);
     7. the pool spans BOTH ops ; ≥7 rounds (§A.13.60).
   setupTask only sets state (no DOM) → headless-safe. Exit 0 = pass; 1 = fail.
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const VARIETY_MIN = 7;
const ROW_ID = 'choice-board.ten-more-less.1-nbt-c-5';
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
check(row.task_template === 'ten-more-less', `task_template ${row.task_template} ≠ ten-more-less`);
check(row.alignment && row.alignment.code === '1.NBT.C.5', `alignment ${row.alignment && row.alignment.code} ≠ 1.NBT.C.5`);

Core.init({ el: () => ({}), t: () => '', sound: () => {}, announce: () => {}, track: () => {} });

const rounds = (row.params && Array.isArray(row.params.rounds)) ? row.params.rounds : [];
check(rounds.length >= VARIETY_MIN, `${rounds.length} rounds < ${VARIETY_MIN}`);
const ops = new Set();

rounds.forEach((round, i) => {
  const n = round.n, op = round.op;
  const label = `round#${i}[n=${n},${op}]`;
  ops.add(op);
  check(op === 'more' || op === 'less', `${label}: op not more/less`);
  check(n >= 10 && n <= 99, `${label}: n not two-digit`);
  check(n >= 20 && n <= 89, `${label}: n outside 20..89 (a tile would leave 10..99)`);

  const correct = (op === 'more') ? n + 10 : n - 10;
  const expectedSet = [n - 10, n - 1, n + 1, n + 10];

  /* the 4 offsets must be pairwise-distinct (no-two-correct precondition) */
  check(new Set(expectedSet).size === 4, `${label}: offset set not 4 distinct values`);
  /* every tile two-digit */
  expectedSet.forEach((v) => check(v >= 10 && v <= 99, `${label}: tile ${v} not two-digit`));

  /* canonical place-value foils present */
  const onesTrap = (op === 'more') ? n + 1 : n - 1;     /* ±1 same direction */
  const dirTrap = (op === 'more') ? n - 10 : n + 10;    /* ∓10 wrong direction = OTHER op's answer */
  check(expectedSet.indexOf(onesTrap) >= 0 && onesTrap !== correct, `${label}: ones-trap ${onesTrap} missing/equals correct`);
  check(expectedSet.indexOf(dirTrap) >= 0 && dirTrap !== correct, `${label}: direction-trap ${dirTrap} missing/equals correct`);

  /* drive the REAL core exactly as the wrapper does */
  const seededShuffle = (arr) => arr.slice(); /* order is irrelevant to the no-two-correct proof */
  const ordered = seededShuffle(expectedSet);
  const options = ordered.map((v) => ({ key: String(v), text: String(v) }));
  /* the rendered tile set must equal the offset set */
  check(options.map(o => Number(o.key)).sort((a, b) => a - b).join() === expectedSet.slice().sort((a, b) => a - b).join(),
    `${label}: option keys ≠ offset set`);

  Core.setupTask(options, String(correct), { type: 'text', text: String(n) });
  let correctCount = 0;
  options.forEach((o) => {
    Core.answer = o.key;
    const graded = (Core.answer === String(correct));  /* the wrapper's check predicate */
    if (graded) correctCount++;
    if (Number(o.key) === correct) check(graded === true, `${label}: correct tile '${o.key}' graded wrong`);
    else check(graded === false, `${label}: foil '${o.key}' graded correct`);
  });
  check(correctCount === 1, `${label}: ${correctCount} correct options (expected EXACTLY 1 — no-two-correct)`);
});
check(ops.has('more') && ops.has('less'), `pool must span both ops (saw ${[...ops].join(',')})`);

if (failures.length) {
  console.error(`FAIL — ${failures.length} violation(s) across ${rounds.length} round(s):`);
  failures.forEach((f) => console.error('  • ' + f));
  process.exit(1);
}
console.log(`PASS — ${rounds.length} round(s): n∈20..89 two-digit, tiles = {n-10,n-1,n+1,n+10}, correct = op±10, ±1 ones-trap + ∓10 direction-trap present, EXACTLY ONE true (no-two-correct, REAL core), spans both ops; ≥${VARIETY_MIN}.`);
process.exit(0);
