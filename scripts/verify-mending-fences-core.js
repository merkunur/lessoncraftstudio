#!/usr/bin/env node
/* =====================================================================
   verify-mending-fences-core.js — build-time perimeter-correctness gate
   ---------------------------------------------------------------------
   Loads the REAL mini tools/mending-fences-core.js (window shim) and proves,
   for the shipped manifest (3.MD.D.8 — perimeter / distance-around), that
   every cheat solver FAILS the game while the oracle is 100%:

     1. ORACLE 100% — mend-board: candidates contains ½P−side and the oracle
        keys it; joint-ranking: deriveMoreFence/Grass are valid distinct
        indices; units: unitOracle ∈ {edge,interior}; roll: reachOracle valid;
        same-area: deriveMoreFence valid, same area, different perimeter.
     2. OWNED_SUBTRACTION_SOLVER (P − shownSide) → lands on the mandatory
        `P−side` FOIL, never the answer (the dominant bar);
        MISCONCEPTION_FOIL_PRESENT (the foil plate is present AND wrong) is
        the headline assert — a "correct-answer-exists" check is insufficient.
     3. AREA_COVARIATION_SOLVER (same field for fence & grass) → FAILS on
        joint-ranking; JOINT_RANKING_ORDERS_DISAGREE.
     4. TWO_PERCEPTUAL_RULES / SQUARER_LOOKS_MORE (longest/biggest = most
        fence) → FAILS: PERCEPTUAL_INVERSION_PRESENT (≥1 round where the
        max-perimeter field is NOT the max-bbox-extent field).
     5. CHARACTER_KEYWORD / BORDER_SQUARES (units) → FAIL: grades the UNIT
        (edge vs interior), the border-ring foil present and wrong.
     6. FORWARD_SUM / AREA_NEVER_GRADED → no child-produced perimeter/area
        number; ANSWER_DERIVED_FROM_STRUCTURE_NOT_STORED (no perimeter/area/
        answer/correct field on any descriptor — deep scan; mutate a side →
        the answer moves); GAP_HIDDEN_AT_GRADE (no continuous-signal cog);
        ≥7 distinct rounds (§A.13.60).

   "Measured, not eyeballed." Exit 0 = all pass; exit 1 = any failure.
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const VARIETY_MIN = 7;
const REPO = path.join(__dirname, '..');
const KNOWN_COGS = ['mend-board', 'more-fence-or-grass', 'fence-it-or-plant', 'roll-reach', 'same-area-diff-perim', 'l-closure'];
const FORBIDDEN_KEYS = ['perimeter', 'area', 'answer', 'correct', 'correctIndex', 'total'];

const coreSrc = fs.readFileSync(path.join(REPO, 'mini tools', 'mending-fences-core.js'), 'utf8');
const win = {};
new Function('window', coreSrc)(win);
const Core = win.MendingFencesCore;
if (!Core) { console.error('FAIL: mending-fences-core.js did not define window.MendingFencesCore'); process.exit(1); }

const manifest = JSON.parse(fs.readFileSync(path.join(REPO, 'mini tools', 'mending-fences-activities.json'), 'utf8'));
const failures = [];
const check = (cond, msg) => { if (!cond) failures.push(msg); };

function scanForbidden(obj, label) {
  if (obj == null || typeof obj !== 'object') return;
  Object.keys(obj).forEach((k) => {
    if (FORBIDDEN_KEYS.indexOf(k) >= 0) failures.push(`${label}: forbidden stored key "${k}" (ANSWER_DERIVED_NOT_STORED)`);
    scanForbidden(obj[k], label);
  });
}

let roundCount = 0;
const cogs = {};
const allRounds = [];

for (const row of manifest) {
  const rounds = (row.params && row.params.rounds) || [];
  check(rounds.length >= VARIETY_MIN, `${row.id}: ${rounds.length} rounds < ${VARIETY_MIN} (§A.13.60)`);
  rounds.forEach((d) => {
    roundCount++; cogs[d.cog] = 1; allRounds.push(d);
    const label = `${d.id}[${d.cog}]`;
    check(KNOWN_COGS.indexOf(d.cog) >= 0, `${label}: unknown cog`);
    scanForbidden(d, label);
    const f = Core.facts(d);
    check(f.noContinuousSignalAtGrade, `${label}: GAP_HIDDEN_AT_GRADE violated`);

    if (d.cog === 'mend-board') {
      const ans = Core.deriveDoublingAnswer(d), foil = Core.subtractionFoil(d), oi = Core.mendOracle(d);
      // 1. oracle 100%
      check(oi >= 0 && Number(d.candidates[oi]) === ans, `${label}: oracle did not key ½P−side (${ans})`);
      // 2. owned-subtraction lands on the foil, never the answer
      check(ans !== foil, `${label}: GRADED_INVERSE_IS_DOUBLING_NOT_BARE_SUBTRACTION — ½P−s (${ans}) === P−s (${foil})`);
      check(f.misconceptionFoilPresent, `${label}: MISCONCEPTION_FOIL_PRESENT — the P−side foil (${foil}) is NOT among candidates`);
      check(f.misconceptionFoilIsWrong, `${label}: the P−side foil equals the answer`);
      const ownedSolver = d.candidates.indexOf(foil);   // the solver picks P−shown
      check(ownedSolver !== oi, `${label}: OWNED_SUBTRACTION_SOLVER reached the answer`);
      check(f.correctNotIndex0, `${label}: correct candidate at index 0`);
      check(f.threePlusChoices, `${label}: <3 candidates`);
    } else if (d.cog === 'more-fence-or-grass') {
      const mf = Core.deriveMoreFence(d.fields), mg = Core.deriveMoreGrass(d.fields);
      check(mf >= 0 && mg >= 0, `${label}: invalid fence/grass index`);
      check(f.jointRankingOrdersDisagree, `${label}: JOINT_RANKING_ORDERS_DISAGREE — fence & grass pick the same field (AREA_COVARIATION passes)`);
      // the area-covariation solver answers mg for BOTH → wrong on fence
      check(mg !== mf, `${label}: AREA_COVARIATION_SOLVER (grass-rank for fence) would pass`);
    } else if (d.cog === 'same-area-diff-perim') {
      check(f.sameArea, `${label}: fields are NOT same area`);
      check(f.diffPerimeter, `${label}: fields have the SAME perimeter (no decoupling)`);
      check(Core.deriveMoreFence(d.fields) >= 0, `${label}: invalid more-fence index`);
    } else if (d.cog === 'fence-it-or-plant') {
      const u = Core.unitOracle(d);
      check(u === 'edge' || u === 'interior', `${label}: AROUND_VS_FILL oracle not edge/interior`);
      check(Core.UNIT_OPTIONS.indexOf('border') >= 0, `${label}: BORDER_SQUARES foil not offered`);
      // CHARACTER_KEYWORD / BORDER solvers: 'border' is always wrong
      check('border' !== u, `${label}: the border-ring foil is the oracle`);
    } else if (d.cog === 'roll-reach') {
      const r = Core.reachOracle(d);
      check(r === 'reach' || r === 'short', `${label}: reachOracle invalid`);
      check(d.roll != null, `${label}: no roll given`);
    } else if (d.cog === 'l-closure') {
      const oi = Core.lclosureOracle(d);
      check(oi >= 0, `${label}: l-closure oracle failed`);
    }
  });
}

/* ANSWER_DERIVED_NOT_STORED — mutate the MISSING side (= the answer side; the
   shown side is held), the derived ½P−shown answer must move by the same amount. */
manifest.forEach((row) => (row.params.rounds || []).forEach((d) => {
  if (d.cog !== 'mend-board') return;
  const a0 = Core.deriveDoublingAnswer(d);
  const missKey = d.shownSide === 'w' ? 'h' : 'w';
  const mutated = Object.assign({}, d); mutated[missKey] = d[missKey] + 1;
  const a1 = Core.deriveDoublingAnswer(mutated);
  check(a1 === a0 + 1, `${d.id}: deriveDoublingAnswer did not track the missing side (stored?) — ${a0}→${a1}`);
}));

/* PERCEPTUAL_INVERSION_PRESENT (deck-level) — kills "longest = most fence" */
const df = Core.deckFacts(allRounds);
check(df.jointRankingRounds >= 1, `no joint-ranking rounds`);
check(df.perceptualInversionPresent, `PERCEPTUAL_INVERSION_PRESENT — no joint-ranking round where max-perimeter ≠ max-bbox-extent (perceptual shortcut would pass)`);

/* AREA_NEVER_GRADED / FORWARD_SUM — no child-produced perimeter/area number act */
check(Object.keys(cogs).every((c) => KNOWN_COGS.indexOf(c) >= 0), `a cog outside the known (no-produce-number) set`);

const distinctCogs = Object.keys(cogs);
check(distinctCogs.length >= 4, `only ${distinctCogs.length} distinct cogs`);

if (failures.length) {
  console.error(`FAIL — ${failures.length} perimeter-correctness violation(s) across ${roundCount} round(s):`);
  failures.forEach((f) => console.error('  • ' + f));
  process.exit(1);
}
console.log(`PASS — ${roundCount} round(s), ${distinctCogs.length} cogs [${distinctCogs.join('/')}]: oracle 100%; OWNED_SUBTRACTION lands on the present-and-wrong P−side foil (never the answer); AREA_COVARIATION fails (joint orders disagree); PERCEPTUAL_INVERSION present (max-perimeter ≠ max-extent); around-vs-fill grades the unit (border foil wrong); answer derived-not-stored; gap hidden; ≥${VARIETY_MIN} rounds.`);
process.exit(0);
