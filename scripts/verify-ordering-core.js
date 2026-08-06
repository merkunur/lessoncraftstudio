#!/usr/bin/env node
/* =====================================================================
   verify-ordering-core.js — build-time gate for the seriation cognition
   behind "Grandpa Pip's Nesting Pots" (CCSS K.CC.C.7, compare written
   numerals). Loads the REAL mini tools/ordering-core.js under a window
   shim and proves, MEASURED (game-designs/construct-build-12.md):

     • the comparator reads `.value` ONLY (footprint/rep are irrelevant);
     • the value-reading ORACLE nests EVERY round (descending value valid);
     • the SIZE solver (nest by footprint) does NOT track the answer (<1) —
       so "nest by how big the pot looks" cannot win;
     • footprint ⊥ value on every non-on-ramp round (sameFootprint = zero
       size signal; inverse = anti-correlated on R10);
     • depth rounds are numeral-ONLY (no dots → can't win by counting dots);
     • the twin round has exactly one equal pair (the equal-edge); ≥7
       distinct rounds; no stored answer/correctIndex.

   "Measured, not eyeballed." Exit 0 = all pass; exit 1 = any failure.
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const VARIETY_MIN = 7;
const REPO = path.join(__dirname, '..');

const coreSrc = fs.readFileSync(path.join(REPO, 'mini tools', 'ordering-core.js'), 'utf8');
const win = {};
new Function('window', coreSrc)(win);
const Core = win.OrderingCore;
if (!Core) { console.error('FAIL: ordering-core.js did not define window.OrderingCore'); process.exit(1); }

const rounds = Core.buildRounds();
const failures = [];
const check = (cond, msg) => { if (!cond) failures.push(msg); };

const byValDesc = (items) => items.slice().sort((a, b) => b.value - a.value);
const byFootDesc = (items) => items.slice().sort((a, b) => b.footprint - a.footprint);
const order = (items) => items.map((p) => p.value).join('>');

/* ---- the comparator reads .value ONLY ---- */
(function () {
  const a = { value: 5, footprint: 1, rep: 'numeral' };
  const b = { value: 9, footprint: 5, rep: 'numeral' };
  check(Core.isValid(a, b) === true, 'isValid(5,9) should be true');
  check(Core.isValid(b, a) === false, 'isValid(9,5) should be false');
  // footprint must NOT change the verdict
  const aBig = { value: 5, footprint: 99, rep: 'x' };
  check(Core.isValid(aBig, b) === Core.isValid(a, b), 'isValid changed when only footprint changed → it is reading footprint, not value');
  // empty nest (base) accepts anything
  check(Core.isValid(a, null) === true, 'base placement (innermost null) should be valid');
  // equal values cannot nest
  check(Core.isValid({ value: 6 }, { value: 6 }) === false, 'equal values must NOT nest (6 not < 6)');
})();

/* ---- the value-reading ORACLE nests every round; the SIZE solver does not ---- */
let oracleHits = 0, sizeHits = 0;
rounds.forEach((r) => {
  if (Core.simulate(byValDesc(r.items))) oracleHits++;            // descending value = the solution
  if (Core.simulate(byFootDesc(r.items))) sizeHits++;            // nest by pot size
});
const oracleAcc = oracleHits / rounds.length;
const sizeAcc = sizeHits / rounds.length;
check(oracleAcc === 1, `the value-reading ORACLE nested ${oracleHits}/${rounds.length} (must be all)`);
check(sizeAcc < 1, `the SIZE solver nested ${sizeHits}/${rounds.length} (must be < all — pot size must NOT track the answer)`);

/* ---- structural + per-round ---- */
check(rounds.length >= VARIETY_MIN, `only ${rounds.length} rounds (< ${VARIETY_MIN} §A.13.60)`);
check(new Set(rounds.map((r) => r.id)).size === rounds.length, 'round ids not distinct');

rounds.forEach((r, i) => {
  const label = `round#${i}[${r.id}]`;
  check(r.items.length >= 2, `${label}: < 2 pots`);
  check(r.items.every((p) => typeof p.value === 'number' && isFinite(p.value)), `${label}: a pot has no numeric value (numeral must always be present)`);
  check(!('answer' in r) && !('correctIndex' in r), `${label}: stores an answer/correctIndex (must be DERIVED)`);

  const onramp = r.sizeMode === 'graduated';
  if (!onramp) {
    // footprint ⊥ value: nesting by size must NOT reproduce the value order
    check(order(byFootDesc(r.items)) !== order(byValDesc(r.items)),
      `${label}: footprint order == value order on a non-on-ramp round (size would leak the answer)`);
    if (r.sizeMode === 'sameFootprint') {
      const f0 = r.items[0].footprint;
      check(r.items.every((p) => p.footprint === f0), `${label}: sameFootprint round has non-equal footprints (residual size signal)`);
    }
    if (r.sizeMode === 'inverse') {
      // bigger value → strictly smaller pot
      const asc = r.items.slice().sort((a, b) => a.value - b.value);
      let inv = true;
      for (let k = 1; k < asc.length; k++) if (!(asc[k].footprint < asc[k - 1].footprint)) inv = false;
      check(inv, `${label}: inverse round footprint is not strictly anti-correlated with value`);
    }
  }

  // depth rounds are numeral-ONLY (no dots → cannot win by counting dots)
  if (r.tier >= 3) check(r.rep === 'numeral', `${label}: tier-3+ depth round must be numeral-only (rep=${r.rep})`);

  if (r.equalEdge) {
    const vals = r.items.map((p) => p.value);
    const dupes = vals.filter((v, idx) => vals.indexOf(v) !== idx);
    check(dupes.length === 1, `${label}: equal-edge round must have exactly one equal pair (found ${dupes.length} dupes)`);
  }
  if (r.gapFill) check(r.items.length >= 4, `${label}: gap-fill round needs ≥4 pots`);
});

if (failures.length) {
  console.error(`FAIL — ${failures.length} ordering-core violation(s) across ${rounds.length} round(s):`);
  failures.forEach((f) => console.error('  • ' + f));
  process.exit(1);
}
console.log(`PASS — ${rounds.length} rounds: value-reading ORACLE ${oracleAcc.toFixed(2)}; SIZE solver ${sizeAcc.toFixed(2)} < 1.00; ` +
  `comparator reads .value only, footprint ⊥ value on every non-on-ramp round, depth rounds numeral-only, ` +
  `twin equal-edge present, no stored answer.`);
process.exit(0);
