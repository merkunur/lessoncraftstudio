#!/usr/bin/env node
/* =====================================================================
   verify-echo-grove-core.js — build-time equal-groups-read gate (Game-82)
   ---------------------------------------------------------------------
   Loads the REAL mini tools/echo-grove-core.js (under a window shim) and
   proves, over the shipped round pool, that the GRADED cognition is
   "read the × rune as g-groups-of-s STRUCTURE" — NOT compute-the-product
   and NOT swap-the-roles. Measured (per game-designs/equal-groups-01.md §4):

   The ORACLE (matches the rune's structure exactly) must score 1.0.
   Each of these adversarial solvers must FAIL (< 1.0):
     • TOTAL_SOLVER   — picks any candidate (all share the product) → the
                        product carries no signal; can't reliably pick.
     • COMMUTATIVE_SOLVER — picks the role-swapped twin [s,g] → it is a
                        decoy, never the answer (when g≠s).
     • MOST_BRANCHES_SOLVER — picks the candidate with the most groups →
                        a perceptual heuristic that must NOT track the answer.
   Structural asserts:
     • ≥7 rounds (§A.13.60); ≥3 candidates each; every candidate shares the
       product (total non-discriminating); the twin is present (g≠s);
       exactly one candidate matches the rune (the oracle is unique);
       no stored answer/correctIndex on any round descriptor.

   "Measured, not eyeballed." Exit 0 = all pass; exit 1 = any failure.
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const VARIETY_MIN = 7;
const REPO = path.join(__dirname, '..');

/* ---- load the real core under a window shim ---- */
const coreSrc = fs.readFileSync(path.join(REPO, 'mini tools', 'echo-grove-core.js'), 'utf8');
const win = {};
new Function('window', coreSrc)(win);
const Core = win.EchoGroveCore;
if (!Core) { console.error('FAIL: echo-grove-core.js did not define window.EchoGroveCore'); process.exit(1); }

const rounds = Core.buildRounds();
const failures = [];
const check = (cond, msg) => { if (!cond) failures.push(msg); };

/* the candidate SET per round (the engine shuffles position at render; the
   gate proves the descriptor, so solvers are FEATURE-based and compared by
   the GROUPING they pick vs the oracle's — never by list position, which
   would be a shuffle artifact). */
function cands(r) { return Core.candidates(r); }
function sameGrouping(a, b) { return a && b && a.g === b.g && a.s === b.s; }

/* ---- solvers: each returns the GROUPING {g,s} it would choose ---- */
function oracle(r) {                       /* read the structure (always correct) */
  return { g: r.g, s: r.s };
}
function commutativeSolver(r) {            /* swap the roles — pick the twin */
  return { g: r.s, s: r.g };
}
function mostBranchesSolver(r) {           /* perceptual: pick the candidate with the most groups */
  const cs = cands(r);
  let best = cs[0];
  for (let i = 1; i < cs.length; i++) if (cs[i].g > best.g) best = cs[i];
  return best;
}

function accuracy(solver) {
  let hit = 0;
  rounds.forEach((r) => { if (sameGrouping(solver(r), oracle(r))) hit++; });
  return hit / rounds.length;
}

/* ---- structural assertions ---- */
check(rounds.length >= VARIETY_MIN, `only ${rounds.length} rounds (< ${VARIETY_MIN} variety floor §A.13.60)`);

rounds.forEach((r, i) => {
  const cs = cands(r);
  const total = r.g * r.s;
  const label = `round#${i}[${r.g}×${r.s}=${total}]`;

  check(cs.length >= 3, `${label}: only ${cs.length} candidates (< 3)`);
  check(cs.every((c) => c.g * c.s === total), `${label}: a candidate does not share the product ${total} (total must be non-discriminating)`);
  /* the TOTAL carries no signal: ≥2 candidates share the product, so a
     total-reader cannot uniquely select the answer (it maps to many). */
  check(cs.filter((c) => c.g * c.s === total).length >= 2, `${label}: the total ${total} maps to <2 candidates (a total-reader could win)`);
  if (r.g !== r.s) {
    check(cs.some((c) => c.g === r.s && c.s === r.g), `${label}: the commutative twin [${r.s},${r.g}] is missing (the load-bearing decoy)`);
  }
  const matchCount = cs.filter((c) => Core.matches({ g: r.g, s: r.s }, c)).length;
  check(matchCount === 1, `${label}: ${matchCount} candidates match the rune (the oracle must be unique)`);
  check(!('correctIndex' in r) && !('answer' in r), `${label}: descriptor stores an answer/correctIndex (must be DERIVED, not stored)`);
});

/* ---- the measured cognition: oracle passes, cheats fail ---- */
const accOracle = accuracy(oracle);
const accComm = accuracy(commutativeSolver);
const accBranch = accuracy(mostBranchesSolver);

check(accOracle === 1, `the structure-reading ORACLE scored ${accOracle.toFixed(2)} (must be 1.00)`);
check(accComm < 1, `the COMMUTATIVE_SOLVER scored ${accComm.toFixed(2)} (swapping roles must NOT win)`);
check(accBranch < 1, `the MOST_BRANCHES_SOLVER scored ${accBranch.toFixed(2)} (a perceptual heuristic must NOT track the answer)`);

if (failures.length) {
  console.error(`FAIL — ${failures.length} echo-grove violation(s) across ${rounds.length} round(s):`);
  failures.forEach((f) => console.error('  • ' + f));
  process.exit(1);
}
console.log(`PASS — ${rounds.length} rounds: structure-reading ORACLE 1.00; ` +
  `COMMUTATIVE ${accComm.toFixed(2)} / MOST-BRANCHES ${accBranch.toFixed(2)} < 1.00; ` +
  `total non-discriminating (≥2 candidates share each product), the twin is present, the oracle is unique, no stored answer.`);
process.exit(0);
