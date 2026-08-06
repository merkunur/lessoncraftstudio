#!/usr/bin/env node
/* =====================================================================
   verify-river-steer-core.js — build-time gate for the binary-compare
   cognition behind "Comparison Creek" (CCSS K.CC.C.7). Loads the REAL
   mini tools/river-steer-core.js under a window shim and proves, MEASURED:

     • UNIQUE-DETERMINACY — deriveCorrect yields exactly one valid response
       per fork (side forks have unequal values; tie forks are equal);
     • the READER (read both buoys, apply the rule) scores 1.0;
     • every FIXED blind strategy FAILS — always-left / always-right /
       bigger-print / by-ear (commit-lock → can't compare) all score < the
       reader, and the reader is ≥ 1.5× the BEST fixed strategy;
     • ADJACENCY ≥80% of scored steer-compare forks are diff-1 (the heart —
       reading is the only way to win);
     • correct SIDE balanced ~50/50 + printScale ⊥ correct side (the
       bigger-PRINT buoy is not the answer);
     • ≥7 DISTINCT signatures on {renderType, responseMode, channelCount};
       a productive (relation) beat present; values ∈ 1..10; no stored answer.

   "Measured, not eyeballed." Exit 0 = all pass; exit 1 = any failure.
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const REPO = path.join(__dirname, '..');
const coreSrc = fs.readFileSync(path.join(REPO, 'mini tools', 'river-steer-core.js'), 'utf8');
const win = {};
new Function('window', coreSrc)(win);
const Core = win.RiverSteerCore;
if (!Core) { console.error('FAIL: river-steer-core.js did not define window.RiverSteerCore'); process.exit(1); }

const forks = Core.buildRounds();
const failures = [];
const check = (cond, msg) => { if (!cond) failures.push(msg); };

/* ---- structural / per fork ---- */
check(forks.length >= 7, `only ${forks.length} forks (< 7 §A.13.60)`);
check(new Set(forks.map((f) => f.id)).size === forks.length, 'fork ids not distinct');

forks.forEach((f, i) => {
  const label = `fork#${i}[${f.id}/${f.promptKey}]`;
  check(!('answer' in f) && !('correctSide' in f), `${label}: stores an answer/correctSide (must be DERIVED)`);
  const L = Core.forkVal(f, 'L'), R = Core.forkVal(f, 'R');
  check([L, R].every((v) => v >= 1 && v <= 10) || f.promptKey === 'sum', `${label}: a buoy value out of 1..10 (L=${L} R=${R})`);
  const ans = Core.deriveCorrect(f);
  if (f.responseMode === 'side') { check(L !== R, `${label}: side fork has equal values (no unique side)`); check(ans === 'L' || ans === 'R', `${label}: side answer not L/R`); }
  if (f.responseMode === 'equal') check(L === R && ans === 'equal', `${label}: tie fork not equal`);
  if (f.responseMode === 'relation') check(ans === 'more' || ans === 'less', `${label}: relation answer not more/less`);
});

/* ---- solver accuracies ---- */
function acc(solver) { let hit = 0; forks.forEach((f) => { const r = solver(f); if (r !== null && Core.isCorrect(f, r)) hit++; }); return hit / forks.length; }
const S = Core.SOLVERS;
const readerAcc = acc(S.reader);
const fixed = { alwaysLeft: acc(S.alwaysLeft), alwaysRight: acc(S.alwaysRight), biggerPrint: acc(S.biggerPrint), byEar: acc(S.byEar) };
const bestFixed = Math.max.apply(null, Object.keys(fixed).map((k) => fixed[k]));
check(readerAcc === 1, `the READER scored ${readerAcc.toFixed(2)} (must be 1.00)`);
Object.keys(fixed).forEach((k) => check(fixed[k] < 1, `blind strategy '${k}' scored ${fixed[k].toFixed(2)} (must be < the reader)`));
check(readerAcc >= 1.5 * bestFixed, `reader ${readerAcc.toFixed(2)} not ≥ 1.5× the best blind strategy ${bestFixed.toFixed(2)}`);

/* ---- adjacency: ≥80% of scored steer-compare forks are diff-1 ---- */
const steer = forks.filter((f) => Core.isSteerCompare(f));
const adj = steer.filter((f) => Core.diff(f) === 1).length;
check(steer.length >= 1, 'no pure steer-compare forks');
check(steer.length === 0 || adj / steer.length >= 0.8, `adjacency ${steer.length ? (adj / steer.length).toFixed(2) : '—'} of steer-compare forks are diff-1 (must be ≥0.80 — the reading heart)`);

/* ---- side balance + printScale ⊥ side ---- */
const sideForks = forks.filter((f) => f.responseMode === 'side');
const lCorrect = sideForks.filter((f) => Core.deriveCorrect(f) === 'L').length;
const rCorrect = sideForks.length - lCorrect;
check(Math.abs(lCorrect - rCorrect) <= Math.ceil(sideForks.length * 0.34), `correct side imbalanced (L=${lCorrect} R=${rCorrect} of ${sideForks.length})`);
const printForks = forks.filter((f) => f.channels.some((c) => c.printScale && c.printScale !== 1));
const printAcc = printForks.length ? printForks.filter((f) => { const r = S.biggerPrint(f); return r !== null && Core.isCorrect(f, r); }).length / printForks.length : 0;
check(printForks.length === 0 || printAcc < 1, `bigger-print solver scored ${printAcc.toFixed(2)} on print-scaled forks (printScale must be ⊥ the correct side)`);

/* ---- distinct signatures + productive beat ---- */
const sigs = new Set(forks.map((f) => Core.signature(f)));
check(sigs.size >= 7, `only ${sigs.size} distinct signatures (< 7 — distinctness is render×responseMode×channelCount)`);
check(forks.some((f) => f.responseMode === 'relation'), 'no productive (name-it/relation) beat');

if (failures.length) {
  console.error(`FAIL — ${failures.length} river-steer violation(s) across ${forks.length} fork(s):`);
  failures.forEach((f) => console.error('  • ' + f));
  process.exit(1);
}
console.log(`PASS — ${forks.length} forks / ${sigs.size} signatures: READER 1.00 vs blind {L ${fixed.alwaysLeft.toFixed(2)} / R ${fixed.alwaysRight.toFixed(2)} / print ${fixed.biggerPrint.toFixed(2)} / ear ${fixed.byEar.toFixed(2)}}; ` +
  `adjacency ${(adj / steer.length).toFixed(2)} of steer-compare diff-1; side ${lCorrect}L/${rCorrect}R balanced; printScale ⊥ side; productive beat present.`);
process.exit(0);
