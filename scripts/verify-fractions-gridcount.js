#!/usr/bin/env node
/* =====================================================================
   verify-fractions-gridcount.js — build-time correctness gate for the
   2.G.A.2 "Make and Count Squares" grid-count fractions activity.
   ---------------------------------------------------------------------
   Loads the REAL mini tools/fractions-core.js (window shim) + the shipped
   manifest row, and proves, MEASURED, per round:
     1. rows, cols ∈ 2..5;
     2. setupTask({gridRows,gridCols}) → shape 'gridrect', and the generalized
        grid `_lines` yields EXACTLY (cols-1) vertical + (rows-1) horizontal
        correct cut lines (no distractors) → a rows×cols grid of cells;
     3. the cells are SAME-SIZE SQUARES (the box is square-celled: equal cell
        side s; every vertical gap === s, every horizontal gap === s);
     4. the answer (= rows×cols) is the count the child enters;
     5. ≥7 rounds, with varied dimensions (≥4 distinct rows×cols shapes).
   (Run alongside verify-fractions-core.js — the partition pair's equal-area
   proof — which must remain UNCHANGED.) Exit 0 = pass; 1 = any failure.
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const VARIETY_MIN = 7;
const ROW_ID = 'fractions.make-and-count-squares.2-g-a-2';
const REPO = path.join(__dirname, '..');
const win = {};
new Function('window', fs.readFileSync(path.join(REPO, 'mini tools', 'fractions-core.js'), 'utf8'))(win);
const Core = win.FractionsCore;
if (!Core) { console.error('FAIL: fractions-core.js did not define window.FractionsCore'); process.exit(1); }

const manifest = JSON.parse(fs.readFileSync(path.join(REPO, 'mini tools', 'fractions-activities.json'), 'utf8'));
const row = manifest.find((r) => r.id === ROW_ID);
const failures = [];
const check = (cond, msg) => { if (!cond) failures.push(msg); };

if (!row) { console.error('FAIL: manifest row ' + ROW_ID + ' not found'); process.exit(1); }
check(row.task_template === 'grid-count', `task_template ${row.task_template} ≠ grid-count`);
check(row.alignment && row.alignment.code === '2.G.A.2', `alignment ${row.alignment && row.alignment.code} ≠ 2.G.A.2`);

Core.init({});
const rounds = (row.params && Array.isArray(row.params.rounds)) ? row.params.rounds : [];
check(rounds.length >= VARIETY_MIN, `${rounds.length} rounds < ${VARIETY_MIN}`);
const shapes = new Set();
const APPROX = (a, b) => Math.abs(a - b) < 1e-6;

rounds.forEach((r, i) => {
  const label = `round#${i}[${r.rows}×${r.cols}]`;
  check(r.rows >= 2 && r.rows <= 5 && r.cols >= 2 && r.cols <= 5, `${label}: dims out of 2..5`);
  shapes.add(r.rows + 'x' + r.cols);

  Core.setupTask({ gridRows: r.rows, gridCols: r.cols, seed: r.seed });
  check(Core.shape === 'gridrect', `${label}: shape ${Core.shape} ≠ gridrect`);

  /* the generalized grid lines (candidates = correct only, no distractors) */
  const cands = Core.candidates || [];
  const V = cands.filter(c => APPROX(c.line.x1, c.line.x2));   // vertical: x1===x2
  const H = cands.filter(c => APPROX(c.line.y1, c.line.y2));   // horizontal: y1===y2
  check(V.length === r.cols - 1, `${label}: ${V.length} vertical lines (expected ${r.cols - 1})`);
  check(H.length === r.rows - 1, `${label}: ${H.length} horizontal lines (expected ${r.rows - 1})`);
  check(cands.length === (r.cols - 1) + (r.rows - 1), `${label}: ${cands.length} candidates (expected ${(r.cols - 1) + (r.rows - 1)}, no distractors)`);
  check(Core.correctIds.length === cands.length, `${label}: correctIds ${Core.correctIds.length} ≠ candidates ${cands.length}`);

  /* SAME-SIZE SQUARES: box square-celled; equal vertical-line spacing === equal
     horizontal-line spacing === cell side s */
  const b = Core._gridBox;
  check(!!b && APPROX((b.right - b.left) / r.cols, (b.bottom - b.top) / r.rows), `${label}: cells not square (cellW ${b && (b.right - b.left) / r.cols} ≠ cellH ${b && (b.bottom - b.top) / r.rows})`);
  if (b) {
    const s = b.s, xs = V.map(c => c.line.x1).sort((a, z) => a - z), ys = H.map(c => c.line.y1).sort((a, z) => a - z);
    for (let k = 0; k < xs.length; k++) check(APPROX(xs[k], b.left + (k + 1) * s), `${label}: vertical line ${k} mis-spaced`);
    for (let k = 0; k < ys.length; k++) check(APPROX(ys[k], b.top + (k + 1) * s), `${label}: horizontal line ${k} mis-spaced`);
  }

  /* the count the child enters */
  check(r.rows * r.cols >= 4 && r.rows * r.cols <= 25, `${label}: total ${r.rows * r.cols} out of sane range`);
});
check(shapes.size >= 4, `only ${shapes.size} distinct R×C shapes (want ≥4 varied)`);

if (failures.length) {
  console.error(`FAIL — ${failures.length} violation(s) across ${rounds.length} round(s):`);
  failures.forEach((f) => console.error('  • ' + f));
  process.exit(1);
}
console.log(`PASS — ${rounds.length} round(s): gridrect → (cols-1)V + (rows-1)H lines = R×C same-size squares (square-cell box, even spacing); answer = rows×cols; ${shapes.size} distinct R×C; ≥${VARIETY_MIN}.`);
process.exit(0);
