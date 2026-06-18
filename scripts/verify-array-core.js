#!/usr/bin/env node
/* =====================================================================
   verify-array-core.js — build-time array-correctness gate
   ---------------------------------------------------------------------
   Loads the REAL mini tools/array-core.js (under a window shim) and proves,
   for the shipped activity manifest, that:

     1. every round's dimensions are within 2.OA.C.4 bounds (rows ∈ [2,5],
        cols ∈ [2,5]) — on-grade + fits the grid;
     2. the MEASURED identity holds: filling the real core's full R×C grid
        yields a repeated-addition equation of exactly R equal addends, each
        = C, whose sum === rows×cols === the total the keypad is graded
        against (the "sum of equal addends = total" claim, not authored);
     3. a partial fill (one cell short) does NOT report a complete equation
        (the strip honestly reflects state);
     4. the grading rule discriminates: total grades correct, total−1 wrong;
     5. the pool has ≥7 rounds (CLAUDE.md §A.13.60 variety floor).

   "Measured, not eyeballed." Exit 0 = all pass; exit 1 = any failure.
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const VARIETY_MIN = 7;
const REPO = path.join(__dirname, '..');

/* ---- load the real core under a window shim ---- */
const coreSrc = fs.readFileSync(path.join(REPO, 'mini tools', 'array-core.js'), 'utf8');
const win = {};
new Function('window', coreSrc)(win);
const Core = win.ArrayCore;
if (!Core) { console.error('FAIL: array-core.js did not define window.ArrayCore'); process.exit(1); }

const manifest = JSON.parse(fs.readFileSync(path.join(REPO, 'mini tools', 'array-activities.json'), 'utf8'));

const failures = [];
function check(cond, msg) { if (!cond) failures.push(msg); }

/* fill the core's full R×C grid (drives the real cell-state) */
function fillAll(rows, cols) {
  Core.filled = {};
  for (var r = 0; r < rows; r++) { for (var c = 0; c < cols; c++) { Core.filled[Core._key(r, c)] = true; } }
}

/* mode-aware setup: equal-groups maps groups→rows, each→cols (the math layer
   is shared: total = rows×cols, one addend per completed unit). */
function setup(row, rows, cols, seed) {
  if (row.task_template === 'equal-groups') Core.setupTask({ mode: 'equal-groups', groups: rows, each: cols, seed: seed });
  else Core.setupTask({ rows: rows, cols: cols, seed: seed });
}

let roundCount = 0;
for (const row of manifest) {
  const isGroups = row.task_template === 'equal-groups';
  const rounds = (row.params && row.params.rounds) || [];
  check(rounds.length >= VARIETY_MIN, `${row.id}: ${rounds.length} rounds < ${VARIETY_MIN} variety floor (§A.13.60)`);
  rounds.forEach((r, i) => {
    roundCount++;
    const rows = isGroups ? r.groups : r.rows;   // N groups / R rows
    const cols = isGroups ? r.each : r.cols;     // M each / C cols
    const label = `${row.id}#${i}[${rows}×${cols}${isGroups ? ' groups' : ''}]`;

    // 1. dimensions within 2.OA.C.4 bounds (≤5×5, total ≤25)
    check(rows >= 2 && rows <= 5, `${label}: ${isGroups ? 'groups' : 'rows'} ${rows} outside 2..5`);
    check(cols >= 2 && cols <= 5, `${label}: ${isGroups ? 'each' : 'cols'} ${cols} outside 2..5`);

    setup(row, rows, cols, r.seed);

    // 2. full fill → N equal addends of M summing to N×M === total()
    fillAll(rows, cols);
    const eq = Core.builtEquation();
    check(eq.length === rows, `${label}: full build gave ${eq.length} addends, expected ${rows}`);
    check(eq.every((a) => a === cols), `${label}: addends ${JSON.stringify(eq)} are not all = ${cols} (equal-addends violated)`);
    const sum = eq.reduce((a, b) => a + b, 0);
    check(sum === rows * cols, `${label}: equation sum ${sum} ≠ ${rows * cols}`);
    check(Core.total() === rows * cols, `${label}: total() ${Core.total()} ≠ ${rows * cols}`);
    check(Core._filledCount() === rows * cols, `${label}: filled count ${Core._filledCount()} ≠ ${rows * cols}`);

    // 3. one cell short → not all units complete (equation incomplete)
    setup(row, rows, cols, r.seed);
    fillAll(rows, cols);
    delete Core.filled[Core._key(rows - 1, cols - 1)];
    check(Core.builtEquation().length < rows, `${label}: one cell short still reported a complete ${rows}-addend equation`);

    // 4. grading rule (mirror the wrapper's check: answer === total) discriminates
    setup(row, rows, cols, r.seed);
    const total = rows * cols;
    check((total === Core.total()) === true, `${label}: correct total not accepted`);
    check((total - 1 === Core.total()) === false, `${label}: a wrong total (${total - 1}) was accepted`);
  });
}

if (failures.length) {
  console.error(`FAIL — ${failures.length} array-correctness violation(s) across ${roundCount} round(s):`);
  failures.forEach((f) => console.error('  • ' + f));
  process.exit(1);
}
console.log(`PASS — ${roundCount} round(s) across ${manifest.length} coordinate(s): every full build = R equal addends of C summing to rows×cols = the graded total; dims within 2..5; ≥${VARIETY_MIN} rounds.`);
process.exit(0);
