#!/usr/bin/env node
/* =====================================================================
   verify-money-core.js — build-time tender-correctness gate
   ---------------------------------------------------------------------
   Loads the REAL mini tools/money-core.js (window shim) and proves, for
   every round of every LOCALE in the shipped manifest (money is per-locale —
   params.byLocale.<loc>), that:
     1. every solution coin is in the round's palette;
     2. sum(solution) === target (tendered total === target, minor units), AND
        driving the core (tray = solution) gives isCorrect() true;
     3. genuine count-out FOIL — no single palette coin equals the target
        (so it can't be one tap), the solution uses ≥2 coins, and a near-miss
        (solution minus its last coin) does NOT equal the target;
     4. the core's discrete grade DISCRIMINATES (a wrong tray → isCorrect false);
     5. ≥7 rounds per locale (§A.13.60 variety floor).
   "Measured, not eyeballed." Exit 0 = pass; 1 = any failure.
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const VARIETY_MIN = 7;
const REPO = path.join(__dirname, '..');
const coreSrc = fs.readFileSync(path.join(REPO, 'mini tools', 'money-core.js'), 'utf8');
const win = {};
new Function('window', coreSrc)(win);
const Core = win.MoneyCore;
if (!Core) { console.error('FAIL: money-core.js did not define window.MoneyCore'); process.exit(1); }

const manifest = JSON.parse(fs.readFileSync(path.join(REPO, 'mini tools', 'money-activities.json'), 'utf8'));
const failures = [];
const check = (cond, msg) => { if (!cond) failures.push(msg); };
const sum = (a) => a.reduce((x, y) => x + y, 0);

let roundCount = 0, localeCount = 0;
for (const row of manifest) {
  const byLoc = (row.params && row.params.byLocale) || {};
  for (const loc of Object.keys(byLoc)) {
    localeCount++;
    const L = byLoc[loc];
    const rounds = (L && L.rounds) || [];
    const paletteAll = new Set((L.coins || []).map((c) => c.v));
    const isChange = row.task_template === 'make-change';
    check(rounds.length >= VARIETY_MIN, `${row.id}/${loc}: ${rounds.length} rounds < ${VARIETY_MIN} variety floor`);
    rounds.forEach((r, i) => {
      roundCount++;
      // count-out: target = r.target ; make-change: target (the change) = paid − cost
      const target = isChange ? (r.paid - r.cost) : r.target;
      const label = `${row.id}/${loc}#${i}[→${target}]`;
      const palette = r.palette || [];
      const solution = r.solution || [];
      // 1. solution coins ∈ palette (and palette ⊆ declared coins)
      palette.forEach((v) => check(paletteAll.has(v), `${label}: palette coin ${v} not in declared coins`));
      solution.forEach((v) => check(palette.indexOf(v) >= 0, `${label}: solution coin ${v} not in palette`));
      // make-change sanity: paid must exceed cost
      if (isChange) check(r.paid > r.cost, `${label}: paid ${r.paid} not > cost ${r.cost}`);
      // 2. sum(solution) === target + core grades the solution correct (mode-aware setup)
      check(sum(solution) === target, `${label}: solution sums ${sum(solution)} ≠ ${isChange ? 'change' : 'target'} ${target}`);
      Core.init({});
      if (isChange) Core.setupTask({ mode: 'make-change', currency: L.currency, coins: L.coins, cost: r.cost, paid: r.paid, palette: palette });
      else Core.setupTask({ currency: L.currency, coins: L.coins, target: r.target, palette: palette });
      check(Core.target === target, `${label}: core target ${Core.target} ≠ expected ${target}`);
      Core.tray = solution.slice();
      check(Core.total() === target, `${label}: core total ${Core.total()} ≠ target`);
      check(Core.isCorrect() === true, `${label}: correct tender rejected`);
      // 3. ≥2 coins (genuine count-out). For count-out also: no one-tap single coin.
      check(solution.length >= 2, `${label}: trivial solution (<2 coins)`);
      if (!isChange) check(palette.indexOf(target) < 0, `${label}: target ${target} equals a single palette coin (one-tap, not a count-out)`);
      if (solution.length) {
        const nearMiss = solution.slice(0, -1);
        check(sum(nearMiss) !== target, `${label}: near-miss (solution minus last) also equals target — not a genuine foil`);
      }
      // 4. discriminate: a wrong tray → isCorrect false
      Core.tray = solution.slice(0, -1);
      check(Core.isCorrect() === false, `${label}: an under-tender was accepted`);
    });
  }
}

if (failures.length) {
  console.error(`FAIL — ${failures.length} tender-correctness violation(s) across ${roundCount} round(s):`);
  failures.forEach((f) => console.error('  • ' + f));
  process.exit(1);
}
console.log(`PASS — ${roundCount} round(s) across ${localeCount} locale(s): solution ⊆ palette, sum(solution)===target (measured), core grades correct tender + rejects under-tender, genuine count-out (≥2 coins, no one-tap, near-miss≠target), ≥${VARIETY_MIN} rounds/locale.`);
process.exit(0);
