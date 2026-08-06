#!/usr/bin/env node
/* =====================================================================
   verify-missing-part-core.js — build-time gate for the determine-the-
   unknown cognition behind "Fixit's Fix-It Corner" (CCSS 1.OA.D.8). Loads
   the REAL mini tools/missing-part-core.js under a window shim and proves,
   MEASURED (exit 0 = all pass; exit 1 = any failure):

     1. DERIVE + UNIQUELY-DETERMINED — deriveUnknown + a 0..range scan find
        exactly one in-range solution per round (produce: every hide unique);
     2. NO STORED ANSWER — no literal answer field on any round;
     3. NAMED DISTRACTORS — every tray distractor is a NAMED common-error
        class (FAIL on any random), in range, ≠ correct, distinct; tray ≥3;
     4. BLIND LOSES — the computing READER scores 1.0; a blind tray picker's
        first-try accuracy is < the reader (reader ≥ 1.5× the blind);
     5. COUNTING-SOLVER ADVERSARY — a strategy that counts a visible discrete
        affordance FAILS on every computation band (no countable gap there);
     6. ESCALATION-FORCES-OPERATION — the count-on/back scaffold's hop COUNT
        equals the answer (the number emerges from an operation, not a match);
     7. CONFIRM-AFTER-COMMIT — every computation band is confirmOnly/faded
        (never countable → no pre-commit countable gap);
     8. ≥7 DISTINCT position-families (signature on experience/action);
     9. ≥1 INVERSE-SCAFFOLD (fact-family triangle / think-addition) scored;
    10. RANGE — every term + the derived unknown + sums ∈ 0..range.

   "Measured, not eyeballed."
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const REPO = path.join(__dirname, '..');
const coreSrc = fs.readFileSync(path.join(REPO, 'mini tools', 'missing-part-core.js'), 'utf8');
const win = {};
new Function('window', coreSrc)(win);
const Core = win.MissingPartCore;
if (!Core) { console.error('FAIL: missing-part-core.js did not define window.MissingPartCore'); process.exit(1); }

const rounds = Core.buildRounds();
const failures = [];
const check = (cond, msg) => { if (!cond) failures.push(msg); };

/* ---- structural ---- */
check(rounds.length >= 7, `only ${rounds.length} rounds (< 7 §A.13.60)`);
check(new Set(rounds.map((r) => r.id)).size === rounds.length, 'round ids not distinct');

/* ---- 1 + 2 + 7 + 10 : per round ---- */
rounds.forEach((r, i) => {
  const label = `round#${i}[${r.id}/${r.experience}]`;

  // (2) no stored answer
  check(!('answer' in r) && !('correct' in r) && !('unknown' in r) && !('solution' in r),
    `${label}: stores an answer (must be DERIVED)`);

  // (1) uniquely determined
  if (r.kind === 'produce') {
    ['whole', 'p1', 'p2'].forEach((h) => {
      const probe = Object.assign({}, r, { hidden: h });
      check(Core.solveUnique(probe).count === 1, `${label}: hiding ${h} is not uniquely determined`);
    });
    check(r.whole === r.p1 + r.p2, `${label}: fact-family not consistent (${r.whole} ≠ ${r.p1}+${r.p2})`);
  } else {
    const su = Core.solveUnique(r);
    const x = Core.deriveUnknown(r);
    check(su.count === 1, `${label}: ${su.count} in-range solutions (must be exactly 1)`);
    check(su.value === x, `${label}: solveUnique ${su.value} ≠ deriveUnknown ${x}`);

    // (7) confirm-after-commit: computation bands are never 'countable'
    if (Core.isComputationBand(r)) check(Core.modelState(r) !== 'countable', `${label}: computation band is countable (must be confirmOnly/faded)`);

    // (10) range: terms + derived ∈ 0..range
    const range = r.range || 20;
    const terms = r.kind === 'balance' ? [r.a, r.b, r.d, x] : [r.a, r.b, r.c, x].filter((v) => v != null);
    terms.forEach((v) => check(v >= 0 && v <= range, `${label}: term/unknown ${v} out of 0..${range}`));
  }
});

/* ---- 3 : every tray distractor is a NAMED common-error class ---- */
const NAMED = new Set(Core.NAMED_ERRORS);
rounds.filter((r) => Core.hasTray(r)).forEach((r) => {
  const x = Core.deriveUnknown(r);
  const tray = Core.commonErrorParts(r, x);
  const range = r.range || 20;
  const label = `round[${r.id}]`;
  check(tray.length >= 3, `${label}: tray has ${tray.length} parts (< 3)`);
  check(tray.filter((p) => p.errorClass === 'correct').length === 1, `${label}: tray must hold exactly one correct part`);
  const vals = new Set();
  tray.forEach((p) => {
    check(!vals.has(p.value), `${label}: duplicate tray value ${p.value}`); vals.add(p.value);
    check(p.value >= 0 && p.value <= range, `${label}: tray value ${p.value} out of 0..${range}`);
    if (p.errorClass !== 'correct') {
      check(NAMED.has(p.errorClass), `${label}: distractor ${p.value} has un-named class '${p.errorClass}' (RANDOM distractors are forbidden)`);
      check(p.value !== x, `${label}: a distractor equals the correct answer ${x}`);
    }
  });
});

/* ---- 4 : computing reader 1.0 ; blind tray picker loses ---- */
const readerAcc = rounds.filter((r) => Core.isCorrect(r, Core.SOLVERS.reader(r))).length / rounds.length;
const blindAcc = rounds.reduce((s, r) => s + Core.SOLVERS.blindTrayAcc(r), 0) / rounds.length;
check(readerAcc === 1, `the computing READER scored ${readerAcc.toFixed(2)} (must be 1.00)`);
check(blindAcc < 1, `blind tray accuracy ${blindAcc.toFixed(2)} (must be < 1 — bounded common-error tray)`);
check(readerAcc >= 1.5 * blindAcc, `reader ${readerAcc.toFixed(2)} not ≥ 1.5× blind ${blindAcc.toFixed(2)}`);

/* ---- 5 : counting-solver ADVERSARY fails on every computation band ---- */
const compBands = rounds.filter((r) => Core.isComputationBand(r));
let countingWins = 0;
compBands.forEach((r) => {
  const guess = Core.SOLVERS.counting(r);
  if (guess !== null && Core.isCorrect(r, guess)) countingWins++;
});
check(compBands.length >= 1, 'no computation bands to defend');
check(countingWins === 0, `the counting-solver won on ${countingWins} computation band(s) (a countable gap is leaking the answer — FAIL)`);

/* ---- 6 : escalation forces an operation (hop count === answer) ---- */
const escRounds = rounds.map((r) => ({ r, op: Core.escalationOp(r) })).filter((o) => o.op);
check(escRounds.length >= 1, 'no count-on/back escalation present');
escRounds.forEach(({ r, op }) => {
  const x = Core.deriveUnknown(r);
  check(op.hops.length === x, `round[${r.id}]: escalation hop count ${op.hops.length} ≠ answer ${x} (number must EMERGE from the operation)`);
  check(op.hops[op.hops.length - 1] === op.to, `round[${r.id}]: escalation does not land on the target ${op.to}`);
});

/* ---- 8 : ≥7 distinct position-families ---- */
const sigs = new Set(rounds.map((r) => Core.signature(r)));
check(sigs.size >= 7, `only ${sigs.size} distinct position-families (< 7)`);

/* ---- 9 : ≥1 inverse-scaffold in the scored set ---- */
check(rounds.some((r) => Core.hasInverseScaffold(r)), 'no inverse-scaffold (fact-family triangle / think-addition) present');

if (failures.length) {
  console.error(`FAIL — ${failures.length} missing-part violation(s) across ${rounds.length} round(s):`);
  failures.forEach((f) => console.error('  • ' + f));
  process.exit(1);
}
console.log(`PASS — ${rounds.length} rounds / ${sigs.size} position-families: READER 1.00 vs blind-tray ${blindAcc.toFixed(2)}; ` +
  `counting-solver 0/${compBands.length} computation bands; ${escRounds.length} escalation(s) hop-count=answer; ` +
  `every tray distractor a named common-error class; inverse-scaffold present.`);
process.exit(0);
