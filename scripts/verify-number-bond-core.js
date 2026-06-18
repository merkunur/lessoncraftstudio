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
