#!/usr/bin/env node
/* =====================================================================
   verify-halfway-harbors-core.js — build-time gate [CLARITY REBUILD]
   ---------------------------------------------------------------------
   Loads the REAL mini tools/halfway-harbors-core.js (window shim) and proves,
   for the shipped manifest (3.NBT.A.1), the clear number-line rounding game:

     1. ORACLE 100% — nearest/big-trail: the oracle harbor IS the nearest to the
        boat AND equals roundHalfUp(target, place); halfway: the oracle marker
        IS the true midpoint of the two harbors.
     2. ANSWER_DERIVED_NOT_STORED — mutate target → the nearest harbor moves;
        no stored answer/nearest/home/midpoint field on any round (deep scan).
     3. DISCRIMINATES — a wrong harbor / wrong marker is NOT accepted.
     4. ≥3 NEAREST_100 rounds; ≥3 choices on every round (not a coin-flip);
        correct ∉ index-0; distinct harbors (no ties in the harbor set);
        ≥7 distinct rounds + 3 cogs (§A.13.60).

   NOTE: this is the clarity-first rebuild — a clear forward number-line game.
   The prior #81 SMART-solver anti-cheat suite is intentionally retired (the
   abstract grade-the-inverse design was incomprehensible to a child).
   Exit 0 = all pass; exit 1 = any failure.
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const VARIETY_MIN = 7;
const REPO = path.join(__dirname, '..');
const FORBIDDEN_KEYS = ['answer', 'nearest', 'home', 'midpoint', 'rounded', 'correct', 'correctIndex'];

const coreSrc = fs.readFileSync(path.join(REPO, 'mini tools', 'halfway-harbors-core.js'), 'utf8');
const win = {};
new Function('window', coreSrc)(win);
const Core = win.HalfwayHarborsCore;
if (!Core) { console.error('FAIL: halfway-harbors-core.js did not define window.HalfwayHarborsCore'); process.exit(1); }

const manifest = JSON.parse(fs.readFileSync(path.join(REPO, 'mini tools', 'halfway-harbors-activities.json'), 'utf8'));
const failures = [];
const check = (cond, msg) => { if (!cond) failures.push(msg); };
function scanForbidden(obj, label) {
  if (obj == null || typeof obj !== 'object') return;
  Object.keys(obj).forEach((k) => { if (FORBIDDEN_KEYS.indexOf(k) >= 0) failures.push(`${label}: forbidden stored-answer key "${k}"`); scanForbidden(obj[k], label); });
}

let roundCount = 0;
const cogs = {};

for (const row of manifest) {
  const rounds = (row.params && row.params.rounds) || [];
  check(rounds.length >= VARIETY_MIN, `${row.id}: ${rounds.length} rounds < ${VARIETY_MIN} (§A.13.60)`);
  rounds.forEach((r) => {
    roundCount++; cogs[r.cog] = 1;
    const label = `${r.id}[${r.cog}]`;
    scanForbidden(r, label);
    const f = Core.facts(r);
    const oi = Core.oracle(r);

    check(oi >= 0 && Core.isAnswer(r, oi), `${label}: oracle not a valid accepted answer`);
    check(f.correctNotIndex0, `${label}: correct at index 0`);
    check(f.distinctHarbors, `${label}: duplicate harbors`);
    check(f.answerDerivedNotStored, `${label}: derived invariant`);

    if (r.cog === 'halfway') {
      check(f.threeMarkers, `${label}: <3 buoy markers`);
      check(f.midpointPresent, `${label}: the true midpoint is not among the markers`);
      check(Number(r.buoyMarkers[oi]) === Core.midpoint(r.harbors[0], r.harbors[1]), `${label}: oracle marker ≠ midpoint`);
      // a non-midpoint marker is rejected
      const wrong = r.buoyMarkers.findIndex((m, i) => i !== oi);
      check(!Core.isAnswer(r, wrong), `${label}: a non-midpoint marker was accepted`);
    } else {
      check(f.fourHarbors, `${label}: <3 harbors (a coin-flip)`);
      check(f.bracketed, `${label}: the boat is not within the harbor range`);
      check(f.matchesRoundHalfUp, `${label}: nearest harbor ≠ roundHalfUp(${r.target},${r.place})`);
      check(Core.nearestHarbor(r.target, r.harbors) === r.harbors[oi], `${label}: oracle ≠ nearest harbor`);
      // a non-nearest harbor is rejected
      const wrong = r.harbors.findIndex((h, i) => i !== oi);
      check(!Core.isAnswer(r, wrong), `${label}: a non-nearest harbor was accepted`);
    }
  });

  const df = Core.deckFacts(rounds);
  check(df.nearest100Count >= 3, `only ${df.nearest100Count} nearest-100 round(s) (<3)`);

  // ANSWER_DERIVED_NOT_STORED — mutate target on a nearest round → nearest moves
  const nr = rounds.find((r) => r.cog === 'nearest');
  if (nr) {
    const before = Core.nearestHarbor(nr.target, nr.harbors);
    const after = Core.nearestHarbor(nr.target + nr.place, nr.harbors);
    check(before !== after || nr.target + nr.place > Math.max.apply(null, nr.harbors), `${nr.id}: nearestHarbor did not move when the boat moved (stored?)`);
  }
}

const distinctCogs = Object.keys(cogs);
check(distinctCogs.length >= 3, `only ${distinctCogs.length} distinct cogs (expected 3: nearest/big-trail/halfway)`);

if (failures.length) {
  console.error(`FAIL — ${failures.length} rounding-correctness violation(s) across ${roundCount} round(s):`);
  failures.forEach((f) => console.error('  • ' + f));
  process.exit(1);
}
console.log(`PASS — ${roundCount} round(s), ${distinctCogs.length} cogs [${distinctCogs.join('/')}]: oracle 100% (nearest = roundHalfUp; halfway = the true midpoint); answer derived-not-stored; a wrong harbor/marker is rejected; ≥3 choices each; ≥3 nearest-100; ≥${VARIETY_MIN} rounds. [clarity-first rebuild]`);
process.exit(0);
