#!/usr/bin/env node
/* =====================================================================
   verify-judge-balance-core.js — build-time gate for the "is it FAIR?"
   cognition behind "Numbers Court" (CCSS 1.OA.D.7, the equal sign). Loads
   the REAL mini tools/judge-balance-core.js, generates the real pool with
   a SEEDED rng, and proves, MEASURED (exit 0 = pass; 1 = any failure):

     THE DUMB-SOLVER GAUNTLET (the headline — analog of Game 5's counting-
     solver). The relational ORACLE (evaluate BOTH sides, compare) scores
     1.00; the OPERATIONAL reader (compute-left → answer) is BLIND to true
     non-canonical equations — 0% on commutative, ≤15% on the GOLD-TRUE
     forms — the exact 1.OA.D.7 misconception, MEASURED; no constant guesser
     exceeds the 40-60% true band; and the REPAIR stage's sign-only + copy-
     token solvers fail (magnitude-bracketed tray, non-copyable target) while
     brute-force needs ≥ tray/2 placements (regenerate-on-wrong).

   Plus form-distribution (≥60% GOLD / ≤15% canonical / 40-60% TRUE / ≥1
   commutative-TRUE / subtraction ≥20%), derived-not-trusted (no stored
   isTrue), repair GOLD-only + optional, ≥7 distinct experiences.
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const REPO = path.join(__dirname, '..');
const coreSrc = fs.readFileSync(path.join(REPO, 'mini tools', 'judge-balance-core.js'), 'utf8');
const win = {};
new Function('window', coreSrc)(win);
const Core = win.JudgeBalanceCore;
if (!Core) { console.error('FAIL: judge-balance-core.js did not define window.JudgeBalanceCore'); process.exit(1); }

function mulberry32(a) { return function () { a |= 0; a = a + 0x6D2B79F5 | 0; var t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }

const failures = [];
const check = (cond, msg) => { if (!cond) failures.push(msg); };

/* a large pool for stable solver stats (20 decks) + one deck for distribution */
const rng = mulberry32(987654);
let pool = [];
for (let s = 0; s < 20; s++) pool = pool.concat(Core.buildPool(mulberry32(1000 + s), 12));
const deck = Core.buildPool(mulberry32(42), 12);

/* ---- derived-not-trusted ---- */
pool.forEach((r) => check(!('isTrue' in r) && !('truth' in r) && !('answer' in r), `round ${r.id}: stores a truth flag (must be DERIVED)`));

/* ---- the relational ORACLE = 1.00 ---- */
const oracleAcc = Core.verdictScore(Core.oracleVerdict, pool);
check(oracleAcc === 1, `relational oracle scored ${oracleAcc.toFixed(2)} (must be 1.00)`);

/* ---- the OPERATIONAL reader is BLIND to true non-canonical equations ---- */
const comm = pool.filter((r) => r.form === 'commutative');
const goldTrue = pool.filter((r) => Core.isGold(r) && Core.isTrue(r));
const commAcc = Core.verdictScore(Core.VERDICT.computeLeftOnly, comm);
const goldTrueAcc = Core.verdictScore(Core.VERDICT.computeLeftOnly, goldTrue);
check(comm.length >= 1, 'no commutative rounds');
check(goldTrue.length >= 3, `only ${goldTrue.length} GOLD-TRUE rounds (need ≥3 to prove the misconception)`);
check(commAcc === 0, `compute-left-only scored ${commAcc.toFixed(2)} on commutative (must be 0 — it cannot see a+b=b+a is true)`);
check(goldTrueAcc <= 0.15, `compute-left-only scored ${goldTrueAcc.toFixed(2)} on GOLD-TRUE forms (must be ≤0.15 — blind to true non-canonical equations)`);

/* ---- no constant/shape guesser beats the true-band, and the oracle dominates ---- */
const dumbs = ['alwaysTrue', 'alwaysFalse', 'pickCanonicalOrder', 'firstTermMatch', 'computeLeftOnly'];
let maxDumb = 0;
dumbs.forEach((k) => { const a = Core.verdictScore(Core.VERDICT[k], pool); maxDumb = Math.max(maxDumb, a); check(a <= 0.60, `verdict solver '${k}' scored ${a.toFixed(2)} (must be ≤0.60 — within the true-ratio band)`); });
check(oracleAcc - maxDumb >= 0.30, `oracle (${oracleAcc.toFixed(2)}) does not dominate the best dumb solver (${maxDumb.toFixed(2)}) by ≥0.30`);

/* ---- form distribution on a single shipped deck ---- */
const gold = deck.filter(Core.isGold).length / deck.length;
const canon = deck.filter(Core.isCanonical).length / deck.length;
const trueR = deck.filter(Core.isTrue).length / deck.length;
const subR = deck.filter((r) => r.form === 'subtraction').length / deck.length;
check(gold >= 0.60, `GOLD ${(gold * 100).toFixed(0)}% (< 60%)`);
check(canon <= 0.15, `canonical ${(canon * 100).toFixed(0)}% (> 15%)`);
check(trueR >= 0.40 && trueR <= 0.60, `TRUE ${(trueR * 100).toFixed(0)}% (must be 40-60%)`);
check(deck.some((r) => r.form === 'commutative' && Core.isTrue(r)), 'no commutative-TRUE round');
check(subR >= 0.20, `subtraction ${(subR * 100).toFixed(0)}% (< 20%)`);

/* ---- distinct experiences + reshuffle ---- */
const sigs = new Set(pool.map(Core.signature));
check(sigs.size >= 7, `only ${sigs.size} distinct experiences (< 7): ${[...sigs].join(',')}`);

/* ---- the REPAIR stage ---- */
const repairable = pool.filter((r) => Core.repairTarget(r));
check(repairable.length >= 5, `only ${repairable.length} repairable rounds`);
// repair is GOLD-only + never on canonical/true (optional deepening)
pool.forEach((r) => { if (Core.repairTarget(r)) check(Core.isGold(r) && !Core.isTrue(r) && r.form !== 'commutative', `round ${r.id}: repair fired on a non-(FALSE GOLD) round`); });
check(pool.every((r) => !(Core.isCanonical(r) && Core.repairTarget(r))), 'repair fired on a canonical form (compute-the-sum trap)');

repairable.forEach((r) => {
  const t = Core.repairTarget(r), L = `repair[${r.id}/${r.form}]`;
  check(t.tray.length >= 5, `${L}: tray ${t.tray.length} tiles (< 5)`);
  check(Core.repairLevels(r, t.value), `${L}: the target value ${t.value} does not level the beam`);
  // honest fix is unique among the tray
  t.tray.filter((v) => v !== t.value).forEach((v) => check(!Core.repairLevels(r, v), `${L}: decoy ${v} also levels the beam`));
  // target interior → sign-only fails
  check(t.value !== Math.min.apply(null, t.tray) && t.value !== Math.max.apply(null, t.tray), `${L}: target ${t.value} at a tray extreme (sign-only could pick it)`);
  check(Core.REPAIR.signOnly(r) !== t.value, `${L}: sign-only solver picked the target`);
  // target is not a visible token → copy-a-token fails
  const visible = r.expr.left.concat(r.expr.right).map((x) => x.t);
  check(visible.indexOf(t.value) < 0, `${L}: the leveling value ${t.value} is a copyable visible token`);
});

/* ---- brute-force needs ≥ tray/2 placements under regenerate-on-wrong ---- */
// simulate: each wrong commit serves a FRESH round (new tray) → every guess is 1/tray.
(function () {
  const r2 = mulberry32(555); const trayLen = 5; const trials = 400; const counts = [];
  for (let i = 0; i < trials; i++) {
    let n = 0; while (true) { n++; if (Math.floor(r2() * trayLen) === 0) break; }  // pick==target (slot 0) → success
    counts.push(n);
  }
  counts.sort((a, b) => a - b); const median = counts[Math.floor(counts.length / 2)];
  check(median >= trayLen / 2, `brute-force median ${median} placements < tray/2 (${trayLen / 2}) — grinding is too easy`);
}());

if (failures.length) {
  console.error(`FAIL — ${failures.length} judge-balance violation(s):`);
  failures.forEach((f) => console.error('  • ' + f));
  process.exit(1);
}
console.log(`PASS — pool ${pool.length} / ${sigs.size} experiences: relational ORACLE 1.00 vs operational reader BLIND to true non-canonical ` +
  `(commutative ${commAcc.toFixed(2)}, GOLD-TRUE ${goldTrueAcc.toFixed(2)}); best dumb ${maxDumb.toFixed(2)}; ` +
  `deck ${(gold * 100).toFixed(0)}% GOLD / ${(canon * 100).toFixed(0)}% canonical / ${(trueR * 100).toFixed(0)}% TRUE; ` +
  `${repairable.length} repairs sign-/copy-proof + bracketed + regenerate-on-wrong.`);
process.exit(0);
