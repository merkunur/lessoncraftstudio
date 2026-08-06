#!/usr/bin/env node
/* =====================================================================
   verify-place-value-regroup-core.js — build-time gate (MEASURED)
   ---------------------------------------------------------------------
   Loads the REAL mini tools/place-value-regroup-core.js (window shim) and
   proves, for the shipped manifest, BOTH activities on the regroup core:

   ADD rows (task_template 'add-compose-ten', 1.NBT.C.4):
     • NEEDS-COMPOSE every round — startOnes = ones(a)+b ≥ 10 (one ten) and a+b ≤ 99.
     • sum derived; decompose(sum).ones < 10; bundle exact (startOnes−10 = ones(sum),
       tens(a)+1 = tens(sum)).
     • REGROUP LOAD-BEARING — gradeAnswer rejects the right total when not bundled.
     • derived-not-stored; ≥7 distinct sums.

   SUBTRACT rows (task_template 'subtract-decompose', 2.NBT.B.7):
     • NEEDS-BORROW every round — ones(a) < b; tens(a) ≥ 1 (single break); a ≥ 100
       (3-digit); hundreds(a) ≤ 4 + tens(a) ≤ 5 (the 3-column mat fits 320).
     • difference derived (a−b); after the break ones(a)+10 ≥ b (enough to take away).
     • BORROW LOAD-BEARING — gradeSubtract rejects the right difference when NOT
       decomposed; accepts it once decomposed; wrong answers rejected.
     • derived-not-stored; ≥7 distinct differences.

   Exit 0 = pass.
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const VARIETY_MIN = 7;
const REPO = path.join(__dirname, '..');
const FORBIDDEN_KEYS = ['sum', 'answer', 'total', 'correct', 'correctIndex', 'isCorrect', 'result', 'diff', 'difference'];

const coreSrc = fs.readFileSync(path.join(REPO, 'mini tools', 'place-value-regroup-core.js'), 'utf8');
const win = {};
new Function('window', coreSrc)(win);
const Core = win.PlaceValueRegroupCore;
if (!Core) { console.error('FAIL: place-value-regroup-core.js did not define window.PlaceValueRegroupCore'); process.exit(1); }

const manifest = JSON.parse(fs.readFileSync(path.join(REPO, 'mini tools', 'place-value-regroup-activities.json'), 'utf8'));
const failures = [];
const check = (cond, msg) => { if (!cond) failures.push(msg); };
function scanKeys(obj, label) {
  if (obj == null || typeof obj !== 'object') return;
  Object.keys(obj).forEach((k) => { if (FORBIDDEN_KEYS.indexOf(k) >= 0) failures.push(`${label}: forbidden stored-answer key "${k}"`); scanKeys(obj[k], label + '.' + k); });
}

let addRounds = 0, subRounds = 0;
const summary = [];

for (const row of manifest) {
  const rounds = (row.params && row.params.rounds) || [];
  const tmpl = row.task_template;
  check(rounds.length >= VARIETY_MIN, `${row.id}: ${rounds.length} rounds < ${VARIETY_MIN} (§A.13.60)`);

  if (tmpl === 'add-compose-ten') {
    const sums = {};
    rounds.forEach((r) => {
      addRounds++;
      const label = `${row.id}/${r.id}`;
      scanKeys(r, label);
      const round = { a: r.a, b: r.b };
      const sum = Core.sumOf(round), so = Core.startOnes(round), dec = Core.decompose(sum, 2);
      sums[sum] = 1;
      check(Core.needsCompose(round), `${label}: ones(a)+b = ${so} < 10 — no ten to compose`);
      check(so >= 10 && so <= 18, `${label}: startOnes ${so} outside [10,18]`);
      check(sum === r.a + r.b && sum <= 99, `${label}: sum ${sum} wrong or > 99`);
      check(dec.ones < 10 && so - 10 === dec.ones && Core.tensOf(r.a, 2) + 1 === dec.tens, `${label}: bundle arithmetic off`);
      check(Core.gradeAnswer(round, sum, dec.ones) === true, `${label}: correct+bundled not accepted`);
      check(Core.gradeAnswer(round, sum, so) === false, `${label}: accepted WITHOUT bundling — regroup not required`);
      check(Core.gradeAnswer(round, sum + 1, dec.ones) === false, `${label}: wrong total accepted`);
      check(Core.sumOf({ a: r.a + 1, b: r.b }) !== sum && Core.sumOf({ a: r.a, b: r.b + 1 }) !== sum, `${label}: sum not derived`);
    });
    check(Object.keys(sums).length >= VARIETY_MIN, `${row.id}: only ${Object.keys(sums).length} distinct sums (<${VARIETY_MIN})`);
    summary.push(`${row.id}: ${rounds.length} add-compose rounds, ${Object.keys(sums).length} sums`);

  } else if (tmpl === 'subtract-decompose') {
    const diffs = {};
    rounds.forEach((r) => {
      subRounds++;
      const label = `${row.id}/${r.id}`;
      scanKeys(r, label);
      const round = { a: r.a, b: r.b };
      const diff = Core.diffOf(round), dec = Core.decompose(r.a, 3);
      diffs[diff] = 1;
      check(Core.needsBorrow(round), `${label}: ones(a)=${Core.onesOf(r.a)} ≥ b=${r.b} — no borrow needed`);
      check(dec.tens >= 1, `${label}: tens(a)=${dec.tens} < 1 — a single break-a-ten can't cover it`);
      check(r.a >= 100 && r.a <= 999, `${label}: minuend ${r.a} not 3-digit`);
      check(dec.hundreds <= 4, `${label}: hundreds(a)=${dec.hundreds} > 4 (flat fold-cap)`);
      check(dec.tens <= 5, `${label}: tens(a)=${dec.tens} > 5 (3-column fold-cap)`);
      check(diff === r.a - r.b, `${label}: diffOf ${diff} !== a−b`);
      check(Core.onesOf(r.a) + 10 >= r.b, `${label}: even after a break, ${Core.onesOf(r.a) + 10} ones < b=${r.b}`);
      check(Core.gradeSubtract(round, diff, true) === true, `${label}: correct diff + decomposed not accepted`);
      check(Core.gradeSubtract(round, diff, false) === false, `${label}: accepted WITHOUT breaking — borrow not required`);
      check(Core.gradeSubtract(round, diff + 1, true) === false, `${label}: wrong diff (diff+1) accepted`);
      check(Core.gradeSubtract(round, diff - 1, true) === false, `${label}: wrong diff (diff−1) accepted`);
      check(Core.diffOf({ a: r.a + 1, b: r.b }) !== diff && Core.diffOf({ a: r.a, b: r.b + 1 }) !== diff, `${label}: diff not derived`);
    });
    check(Object.keys(diffs).length >= VARIETY_MIN, `${row.id}: only ${Object.keys(diffs).length} distinct differences (<${VARIETY_MIN})`);
    summary.push(`${row.id}: ${rounds.length} subtract-decompose rounds, ${Object.keys(diffs).length} diffs`);

  } else if (tmpl === 'add-compose-hundred') {
    const sums = {};
    rounds.forEach((r) => {
      addRounds++;
      const label = `${row.id}/${r.id}`;
      scanKeys(r, label);
      const round = { a: r.a, b: r.b };
      const sum = Core.sumOf(round), startTens = Core.tensOf(r.a, 3) + r.b / 10, dec = Core.decompose(sum, 3);
      sums[sum] = 1;
      check(r.b > 0 && r.b % 10 === 0, `${label}: b=${r.b} is not a positive multiple of 10`);
      check(startTens >= 10 && startTens <= 11, `${label}: tens(a)+b/10 = ${startTens} outside [10,11] (fold-cap: ≤11 rods fit one row)`);
      check(sum === r.a + r.b && sum <= 999, `${label}: sum ${sum} wrong or > 999`);
      check(Core.decompose(r.a, 3).hundreds <= 4, `${label}: hundreds(a) > 4 (flat fold-cap)`);
      check(startTens - 10 === dec.tens && Core.decompose(r.a, 3).hundreds + 1 === dec.hundreds, `${label}: make-a-hundred arithmetic off`);
      check(Core.gradeAddHundred(round, sum, dec.tens) === true, `${label}: correct+hundred-made not accepted`);
      check(Core.gradeAddHundred(round, sum, startTens) === false, `${label}: accepted WITHOUT making a hundred (tens=${startTens}≥10)`);
      check(Core.gradeAddHundred(round, sum + 1, dec.tens) === false, `${label}: wrong total accepted`);
      check(Core.sumOf({ a: r.a + 1, b: r.b }) !== sum && Core.sumOf({ a: r.a, b: r.b + 10 }) !== sum, `${label}: sum not derived`);
    });
    check(Object.keys(sums).length >= VARIETY_MIN, `${row.id}: only ${Object.keys(sums).length} distinct sums (<${VARIETY_MIN})`);
    summary.push(`${row.id}: ${rounds.length} add-compose-hundred rounds, ${Object.keys(sums).length} sums`);

  } else if (tmpl === 'subtract-decompose-hundred') {
    const diffs = {};
    rounds.forEach((r) => {
      subRounds++;
      const label = `${row.id}/${r.id}`;
      scanKeys(r, label);
      const round = { a: r.a, b: r.b };
      const diff = Core.diffOf(round), dec = Core.decompose(r.a, 3);
      diffs[diff] = 1;
      check(dec.tens === 0, `${label}: tens(a)=${dec.tens} ≠ 0 — not a decompose-a-HUNDRED case (use the decompose-a-ten activity)`);
      check(Core.needsBorrow(round), `${label}: ones(a)=${Core.onesOf(r.a)} ≥ b=${r.b} — no borrow needed`);
      check(dec.hundreds >= 2 && dec.hundreds <= 4, `${label}: hundreds(a)=${dec.hundreds} outside [2,4]`);
      check(r.a >= 100 && r.a <= 999 && diff === r.a - r.b, `${label}: minuend/diff invalid`);
      check(Core.onesOf(r.a) + 10 >= r.b, `${label}: even after the cascade, ${Core.onesOf(r.a) + 10} ones < b=${r.b}`);
      check(Core.onesOf(r.a) + 10 <= 13, `${label}: post-cascade ones ${Core.onesOf(r.a) + 10} > 13 (fold-cap → ones(a) must be ≤3)`);
      check(Core.gradeSubtract(round, diff, true) === true, `${label}: correct diff + decomposed not accepted`);
      check(Core.gradeSubtract(round, diff, false) === false, `${label}: accepted WITHOUT the cascade — borrow not required`);
      check(Core.gradeSubtract(round, diff + 1, true) === false, `${label}: wrong diff accepted`);
      check(Core.diffOf({ a: r.a + 1, b: r.b }) !== diff && Core.diffOf({ a: r.a, b: r.b + 1 }) !== diff, `${label}: diff not derived`);
    });
    check(Object.keys(diffs).length >= VARIETY_MIN, `${row.id}: only ${Object.keys(diffs).length} distinct differences (<${VARIETY_MIN})`);
    summary.push(`${row.id}: ${rounds.length} subtract-decompose-hundred rounds, ${Object.keys(diffs).length} diffs`);

  } else {
    failures.push(`${row.id}: unknown task_template "${tmpl}"`);
  }
}

check(addRounds > 0 && subRounds > 0, `expected both add and subtract rows (add=${addRounds}, sub=${subRounds})`);

if (failures.length) {
  console.error(`FAIL — ${failures.length} place-value-regroup violation(s):`);
  failures.forEach((f) => console.error('  • ' + f));
  process.exit(1);
}
console.log(`PASS — place-value-regroup core, BOTH activities:\n  ` + summary.join('\n  ') +
  `\n  ADD: every round composes one ten, regroup load-bearing (rejected until bundled); SUBTRACT: every round needs one break-a-ten (3-digit, hundreds≤4/tens≤5), borrow load-bearing (rejected until decomposed); all derived-not-stored; ≥${VARIETY_MIN} distinct per activity. [1.NBT.C.4 + 2.NBT.B.7]`);
process.exit(0);
