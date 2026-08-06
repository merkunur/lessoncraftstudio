#!/usr/bin/env node
/* =====================================================================
   verify-place-by-relation-core.js — build-time gate for the positional
   cognition behind "Bramble's Parking Tower" (CCSS K.G.A.1). Loads the REAL
   mini tools/place-by-relation-core.js under a window shim and proves, MEASURED:

     • the ORACLE — an INDEPENDENT geometry re-derive of the correct bay from
       the relation + landmark grid positions — MATCHES the author's
       targetSpotIds for EVERY round (the author can't mis-label which bay is
       "above"/"between"/…);
     • the non-grammatical HEURISTIC BANK (topmost / bottommost / nearest-
       landmark / center-most) does NOT reliably win — each heuristic's
       accuracy across the round set is < 1.0 (a guesser who ignores the WORD
       cannot clear the activity), AND every receptive round carries a
       confusable near-miss bay that is NOT a target;
     • ≥2 candidate bays per round (the word is load-bearing — remove it and
       the board is ambiguous); ≥7 DISTINCT rounds; no stored answer beyond
       targetSpotIds.

   "Measured, not eyeballed." Exit 0 = all pass; exit 1 = any failure.
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const VARIETY_MIN = 7;
const REPO = path.join(__dirname, '..');

const coreSrc = fs.readFileSync(path.join(REPO, 'mini tools', 'place-by-relation-core.js'), 'utf8');
const win = {};
new Function('window', coreSrc)(win);
const Core = win.PlaceByRelationCore;
if (!Core) { console.error('FAIL: place-by-relation-core.js did not define window.PlaceByRelationCore'); process.exit(1); }

const rounds = Core.buildRounds();
const failures = [];
const check = (cond, msg) => { if (!cond) failures.push(msg); };
const sameSet = (a, b) => a.length === b.length && a.slice().sort().join('|') === b.slice().sort().join('|');

/* ---- structural / variety ---- */
check(rounds.length >= VARIETY_MIN, `only ${rounds.length} rounds (< ${VARIETY_MIN} §A.13.60)`);
check(new Set(rounds.map((r) => r.id)).size === rounds.length, 'round ids not distinct');

/* ---- per round ---- */
let oracleHits = 0;
rounds.forEach((r, i) => {
  const label = `round#${i}[${r.id}/${r.relation}]`;
  check(!('answer' in r) && !('correctIndex' in r), `${label}: stores a UI answer (must be DERIVED from targetSpotIds)`);
  check(Array.isArray(r.targetSpotIds) && r.targetSpotIds.length > 0, `${label}: no targetSpotIds`);
  check(r.scene.candidates.length >= 2, `${label}: < 2 candidate bays (the word must be load-bearing)`);

  // ORACLE: independent geometry re-derive matches the author
  const derived = Core.deriveTargets(r);
  if (derived.length && sameSet(derived, r.targetSpotIds)) oracleHits++;
  else failures.push(`${label}: re-derived target [${derived.join(',')}] ≠ author targetSpotIds [${r.targetSpotIds.join(',')}]`);

  // every target id is a real candidate
  const candIds = r.scene.candidates.map((c) => c.id);
  r.targetSpotIds.forEach((id) => check(candIds.indexOf(id) >= 0, `${label}: target ${id} is not a candidate`));

  // a confusable near-miss exists, is a real candidate, and is NOT a target
  const nm = Object.keys(r.nearMiss || {});
  check(nm.length >= 1, `${label}: no near-miss sibling bay`);
  nm.forEach((id) => {
    check(candIds.indexOf(id) >= 0, `${label}: near-miss ${id} is not a candidate`);
    check(r.targetSpotIds.indexOf(id) < 0, `${label}: near-miss ${id} is ALSO a target`);
  });
});

/* ---- the heuristic bank: each must score < 1.0 across the round set ---- */
const accByH = {};
Object.keys(Core.HEURISTICS).forEach((h) => {
  let hit = 0;
  rounds.forEach((r) => { const pick = Core.HEURISTICS[h](r); if (pick && Core.isCorrect(r, pick)) hit++; });
  accByH[h] = hit / rounds.length;
  check(accByH[h] < 1, `heuristic '${h}' scored ${accByH[h].toFixed(2)} (a non-grammatical guesser must NOT reliably win)`);
});

const oracleAcc = oracleHits / rounds.length;
check(oracleAcc === 1, `the geometry ORACLE matched ${oracleHits}/${rounds.length} (must be all)`);

if (failures.length) {
  console.error(`FAIL — ${failures.length} place-by-relation violation(s) across ${rounds.length} round(s):`);
  failures.forEach((f) => console.error('  • ' + f));
  process.exit(1);
}
console.log(`PASS — ${rounds.length} rounds: geometry ORACLE ${oracleAcc.toFixed(2)}; ` +
  `heuristics ${Object.keys(accByH).map((h) => h + ' ' + accByH[h].toFixed(2)).join(' / ')} (all < 1.00); ` +
  `every round has ≥2 bays + a non-target near-miss, no stored answer.`);
process.exit(0);
