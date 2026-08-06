#!/usr/bin/env node
/* =====================================================================
   verify-mosaic-menders-core.js — build-time area-conservation gate (Game-80)
   ---------------------------------------------------------------------
   Loads the REAL mini tools/mosaic-menders-core.js (under a window shim)
   and proves, over the shipped round pool, that the GRADED cognition is
   "read AREA = tile-count, invariant under shape" — NOT a perceptual
   "biggest box" / "looks largest" read. Measured (game-designs/area-cover-01.md):

   The ORACLE (same tile-count as the target) scores 1.0. Each cheat fails:
     • BIGGEST_BBOX_SOLVER — pick the candidate with the largest bounding
       box → must FAIL (a bigger box is engineered to have the wrong area).
     • MOST_TILES_SOLVER — pick the candidate with the most tiles → must
       FAIL (a decoy has more tiles than the target).
   Structural asserts:
     • ≥7 rounds (§A.13.60); 3 candidates each; EXACTLY ONE shares the
       target's area (the oracle is unique); ≥1 decoy has a STRICTLY
       bigger bounding box than the match (perceptual decorrelation
       present); ≥1 decoy has MORE tiles than the target; no stored
       answer/correctIndex on any round.

   "Measured, not eyeballed." Exit 0 = all pass; exit 1 = any failure.
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const VARIETY_MIN = 7;
const REPO = path.join(__dirname, '..');

/* ---- load the real core under a window shim ---- */
const coreSrc = fs.readFileSync(path.join(REPO, 'mini tools', 'mosaic-menders-core.js'), 'utf8');
const win = {};
new Function('window', coreSrc)(win);
const Core = win.MosaicMendersCore;
if (!Core) { console.error('FAIL: mosaic-menders-core.js did not define window.MosaicMendersCore'); process.exit(1); }

const rounds = Core.buildRounds();
const failures = [];
const check = (cond, msg) => { if (!cond) failures.push(msg); };

function cands(r) { return Core.candidates(r); }

/* ---- solvers: each returns the candidate NAME it would choose ---- */
function oracle(r) { return cands(r).find((n) => Core.matches(r.target, n)); }
function biggestBboxSolver(r) {
  return cands(r).slice().sort((a, b) => Core.bboxArea(b) - Core.bboxArea(a))[0];
}
function mostTilesSolver(r) {
  return cands(r).slice().sort((a, b) => Core.area(b) - Core.area(a))[0];
}
function accuracy(solver) {
  let hit = 0;
  rounds.forEach((r) => { if (solver(r) === oracle(r)) hit++; });
  return hit / rounds.length;
}

/* ---- structural assertions ---- */
check(rounds.length >= VARIETY_MIN, `only ${rounds.length} rounds (< ${VARIETY_MIN} variety floor §A.13.60)`);

rounds.forEach((r, i) => {
  const cs = cands(r);
  const ta = Core.area(r.target);
  const label = `round#${i}[target ${r.target}=${ta}t]`;

  check(cs.length >= 3, `${label}: only ${cs.length} candidates (< 3)`);

  const matchN = cs.filter((n) => Core.area(n) === ta).length;
  check(matchN === 1, `${label}: ${matchN} candidates share the target area (the oracle must be unique)`);

  const matchBbox = Core.bboxArea(oracle(r));
  check(cs.some((n) => Core.bboxArea(n) > matchBbox), `${label}: no decoy has a bigger bounding box than the match (perceptual size must be decorrelated)`);
  check(cs.some((n) => Core.area(n) > ta), `${label}: no decoy has more tiles than the target (a "most tiles" reader could win)`);
  check(!('correctIndex' in r) && !('answer' in r), `${label}: descriptor stores an answer/correctIndex (must be DERIVED, not stored)`);
});

/* ---- the measured cognition: oracle passes, perceptual cheats fail ---- */
const accOracle = accuracy(oracle);
const accBbox = accuracy(biggestBboxSolver);
const accTiles = accuracy(mostTilesSolver);

check(accOracle === 1, `the area-reading ORACLE scored ${accOracle.toFixed(2)} (must be 1.00)`);
check(accBbox < 1, `the BIGGEST_BBOX_SOLVER scored ${accBbox.toFixed(2)} (a bigger box must NOT track the answer)`);
check(accTiles < 1, `the MOST_TILES_SOLVER scored ${accTiles.toFixed(2)} (most tiles must NOT track the answer)`);

if (failures.length) {
  console.error(`FAIL — ${failures.length} mosaic-menders violation(s) across ${rounds.length} round(s):`);
  failures.forEach((f) => console.error('  • ' + f));
  process.exit(1);
}
console.log(`PASS — ${rounds.length} rounds: area-reading ORACLE 1.00; ` +
  `BIGGEST-BBOX ${accBbox.toFixed(2)} / MOST-TILES ${accTiles.toFixed(2)} < 1.00; ` +
  `exactly one same-area candidate per round, a bigger-box decoy present, no stored answer.`);
process.exit(0);
