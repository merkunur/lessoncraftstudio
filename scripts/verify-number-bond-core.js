#!/usr/bin/env node
/* =====================================================================
   verify-number-bond-core.js — build-time bond-correctness gate
   ---------------------------------------------------------------------
   Loads the REAL mini tools/number-bond-core.js (window shim) and proves,
   for the shipped manifest, that:
     1. every round is K.OA.A.4 scope: whole present, given ∈ 1..whole-1;
     2. the MEASURED identity: given + (whole − given) === whole, and
        driving the core to filled = (whole − given) gives isCorrect true;
     3. the discrete grade DISCRIMINATES: a wrong fill (missing ± 1, and 0)
        gives isCorrect false;
     4. missing() === whole − given;
     5. ≥7 rounds (§A.13.60).
   "Measured, not eyeballed." Exit 0 = pass; 1 = any failure.
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const VARIETY_MIN = 7;
const REPO = path.join(__dirname, '..');
const coreSrc = fs.readFileSync(path.join(REPO, 'mini tools', 'number-bond-core.js'), 'utf8');
const win = {};
new Function('window', coreSrc)(win);
const Core = win.NumberBondCore;
if (!Core) { console.error('FAIL: number-bond-core.js did not define window.NumberBondCore'); process.exit(1); }

const manifest = JSON.parse(fs.readFileSync(path.join(REPO, 'mini tools', 'number-bond-activities.json'), 'utf8'));
const failures = [];
const check = (cond, msg) => { if (!cond) failures.push(msg); };

let roundCount = 0;
for (const row of manifest) {
  const rounds = (row.params && row.params.rounds) || [];
  check(rounds.length >= VARIETY_MIN, `${row.id}: ${rounds.length} rounds < ${VARIETY_MIN} variety floor (§A.13.60)`);

  if (row.task_template === 'make-ten-to-add') {
    // 1.OA.C.6: bond decomposes B; the make-ten part = 10 − A completes a ten.
    rounds.forEach((r, i) => {
      roundCount++;
      const A = r.first, B = r.second, mt = 10 - A;
      const label = `${row.id}#${i}[${A}+${B}]`;
      // scope: A∈6..9, make-ten part < B (rest ≥1), total within 20 + crosses ten
      check(A >= 6 && A <= 9, `${label}: first ${A} not in 6..9`);
      check(mt >= 1 && mt < B, `${label}: make-ten part ${mt} not in 1..${B - 1}`);
      check(A + B > 10 && A + B <= 18, `${label}: ${A}+${B} not a clean cross-ten ≤18`);

      Core.init({});
      Core.setupTask({ mode: 'make-ten-to-add', first: A, second: B });
      // parts sum to whole (B): filled + rest = B by construction
      check(Core.whole === B, `${label}: whole ${Core.whole} ≠ B ${B}`);
      check(Core.missing() === mt, `${label}: missing() ${Core.missing()} ≠ ${mt}`);
      // correct: make-ten part = 10 − A → isCorrect; A + mt === 10
      check(A + mt === 10, `${label}: ${A} + ${mt} ≠ 10`);
      Core.filled = mt;
      check(Core.isCorrect() === true, `${label}: correct make-ten part (${mt}) rejected`);
      // wrong: ±1 and 0 rejected
      Core.filled = mt + 1; check(Core.isCorrect() === false, `${label}: over-fill (${mt + 1}) accepted`);
      Core.filled = mt - 1; check(Core.isCorrect() === false, `${label}: under-fill (${mt - 1}) accepted`);
      Core.filled = 0; check(Core.isCorrect() === false, `${label}: empty accepted`);
    });
    continue;
  }

  // default: make-ten (K.OA.A.4) — unchanged
  rounds.forEach((r, i) => {
    roundCount++;
    const whole = r.whole || 10;
    const label = `${row.id}#${i}[${r.given}+?=${whole}]`;

    // 1. scope
    check(r.given >= 1 && r.given < whole, `${label}: given ${r.given} not in 1..${whole - 1}`);
    const missing = whole - r.given;

    Core.init({});
    Core.setupTask({ whole: whole, given: r.given });

    // 4. missing()
    check(Core.missing() === missing, `${label}: missing() ${Core.missing()} ≠ ${missing}`);

    // 2. correct fill → isCorrect true; identity given+missing===whole
    check(r.given + missing === whole, `${label}: ${r.given} + ${missing} ≠ ${whole}`);
    Core.filled = missing;
    check(Core.isCorrect() === true, `${label}: correct fill (${missing}) rejected`);

    // 3. wrong fills → false
    Core.filled = missing + 1;
    check(Core.isCorrect() === false, `${label}: over-fill (${missing + 1}) accepted`);
    if (missing - 1 >= 0) { Core.filled = missing - 1; check(Core.isCorrect() === false, `${label}: under-fill (${missing - 1}) accepted`); }
    Core.filled = 0;
    check(Core.isCorrect() === (missing === 0), `${label}: empty fill wrongly graded`);
  });
}

if (failures.length) {
  console.error(`FAIL — ${failures.length} bond-correctness violation(s) across ${roundCount} round(s):`);
  failures.forEach((f) => console.error('  • ' + f));
  process.exit(1);
}
console.log(`PASS — ${roundCount} round(s) across ${manifest.length} coordinate(s): given+missing=whole (measured); correct fill accepted, wrong fill rejected; given ∈ 1..whole-1; ≥${VARIETY_MIN} rounds.`);
process.exit(0);
