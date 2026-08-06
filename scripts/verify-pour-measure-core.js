#!/usr/bin/env node
/* =====================================================================
   verify-pour-measure-core.js — build-time MEASURED gate for the read-a-liquid-
   level cognition behind "Pippa's Pond-Juice Lab" (CCSS 3.MD.A.2). Loads the
   REAL mini tools/pour-measure-core.js + the manifest rounds and proves (exit 0
   = pass; 1 = any failure) the critic-fixed solver set:

     #1 SCALE-READER PASSES 100% — reads the revealed level → reports/picks it
        across the 4 cogs (incl. a read-between + a compare + a diff-scale).
     #2 NUMERAL-MATCH FAILS (the headline — proves LEVEL-reading) — reporting the
        ORDER numeral on an estimate-pour round is WRONG (order ≠ revealed level;
        `noGivenNumeralToMatch`, `answerIsFunctionOfLevelNotPrompt`).
     #3 PERCEPTUAL-POUR FAILS — `levelHiddenDuringPour===true` (no level to chase).
     #4 MOTOR-TIMING FAILS — `pourPrecisionNotAssessed===true` (the reading is
        judged, not the pour).
     #5 HEIGHT-READER FAILS on diff-scale — picking the TALLER column is WRONG
        (the shorter column is MORE; conservation).
     #6 ESTIMATE-IS-LOOP — every estimate-pour round carries an order.
     #7 CONSERVATION present — ≥1 compare + ≥1 diff-scale.
     #8 4 COGS by `cog` with a BLOCKLIST; scale 0-10/0-20; ≥1 read-between.
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const REPO = path.join(__dirname, '..');
const coreSrc = fs.readFileSync(path.join(REPO, 'mini tools', 'pour-measure-core.js'), 'utf8');
const win = {};
new Function('window', coreSrc)(win);
const Core = win.PourMeasureCore;
if (!Core) { console.error('FAIL: pour-measure-core.js did not define window.PourMeasureCore'); process.exit(1); }
const S = Core.SOLVERS;

const manifest = JSON.parse(fs.readFileSync(path.join(REPO, 'mini tools', 'pond-juice-activities.json'), 'utf8'))[0];
const rounds = manifest.params.rounds;

const failures = [];
const check = (cond, msg) => { if (!cond) failures.push(msg); };
const COGS = ['estimate-pour', 'read-level', 'compare', 'diff-scale'];

/* #2 static: report compares to the revealed level, never the order */
check(/value === levelValue/.test(coreSrc) || /levelValue\(s\.round\)/.test(coreSrc), 'report() does not compare to the revealed level (levelValue)');
check(!/round\.order/.test(coreSrc.split('function report')[1] ? coreSrc.split('function report')[1].split('}')[0] : ''), 'report() references round.order (the answer must be the level, not the order)');

rounds.forEach((r) => {
  const L = `round[${r.id}/${r.cog}]`;
  const f = Core.facts(r, Core.newState(r));

  /* #1 scale-reader solves */
  check(S.scaleReader(r).solved === true, `${L}: the SCALE-READER did not solve`);

  /* #3/#4 structural */
  check(f.levelHiddenDuringPour === true, `${L}: levelHiddenDuringPour !== true`);
  check(f.answerIsFunctionOfLevelNotPrompt === true, `${L}: answerIsFunctionOfLevelNotPrompt !== true`);
  check(f.noGivenNumeralToMatch === true, `${L}: noGivenNumeralToMatch !== true`);
  check(f.pourPrecisionNotAssessed === true, `${L}: pourPrecisionNotAssessed !== true`);

  /* #2 numeral-match fails (estimate-pour: order ≠ actual) */
  if (r.cog === 'estimate-pour') {
    check(f.orderEqualsActual === false, `${L}: the order EQUALS the actual level (a numeral-matcher would win)`);
    const nm = S.numeralMatchSolver(r);
    check(nm.skip || nm.correct === false, `${L}: reporting the ORDER numeral was accepted (numeral-matching not defeated)`);
  }

  /* #5 height-reader fails on diff-scale */
  if (r.cog === 'diff-scale') {
    check(f.heightTrapPresent === true, `${L}: the diff-scale's taller column is NOT the lower value (no height trap)`);
    const hr = S.heightReaderSolver(r);
    check(hr.skip || hr.correct === false, `${L}: picking the taller column was accepted (height-reader not defeated)`);
  }

  /* #6 estimate-is-loop */
  if (r.cog === 'estimate-pour') check(r.order != null, `${L}: an estimate-pour round has no order (estimate not the loop)`);

  /* #8 cog in the allowed set + scale */
  check(COGS.indexOf(r.cog) >= 0, `${L}: cog "${r.cog}" not in {${COGS.join(',')}}`);
  check(r.scale && r.scale.max <= 20 && r.scale.min === 0, `${L}: scale out of 0..20`);
});

/* #1 scale-reader: a wrong report/pick is NOT accepted */
rounds.forEach((r) => {
  const s = Core.newState(r); if (r.cog === 'estimate-pour') { Core.pour(s); Core.release(s); } else Core.reveal(s);
  if (r.cog === 'compare' || r.cog === 'diff-scale') { const wrong = (Core.argMaxCup(r) === 0) ? 1 : 0; check(Core.pick(s, wrong).correct === false, `round[${r.id}]: a wrong cup pick was accepted`); }
  else { check(Core.report(s, Core.levelValue(r) + 1).correct === false, `round[${r.id}]: a wrong level report was accepted`); }
});

/* #7 conservation + #8 cogs */
const cogsSeen = new Set(rounds.map((r) => r.cog));
COGS.forEach((c) => check(cogsSeen.has(c), `missing cog "${c}"`));
check(cogsSeen.size === 4, `expected 4 cogs, got ${cogsSeen.size} (${[...cogsSeen].join(',')})`);
check(rounds.length >= 7, `only ${rounds.length} rounds (<7)`);
check(new Set(rounds.map((r) => r.id)).size === rounds.length, 'duplicate round ids');
check(rounds.filter((r) => r.cog === 'compare').length >= 1, 'no compare round (conservation)');
check(rounds.filter((r) => r.cog === 'diff-scale').length >= 1, 'no diff-scale round (conservation)');
check(rounds.some((r) => r.cog === 'estimate-pour'), 'no estimate-pour round (the spine)');
/* ≥1 read-between (a level on an unlabeled tick: actualLevel not a multiple of step) */
check(rounds.some((r) => r.actualLevel != null && r.scale.step > 1 && (r.actualLevel % r.scale.step !== 0)), 'no read-between round (a level on an unlabeled tick of a by-2s scale)');

if (failures.length) {
  console.error(`FAIL — ${failures.length} pour-measure violation(s):`);
  failures.forEach((f) => console.error('  • ' + f));
  process.exit(1);
}
const estN = rounds.filter((r) => r.cog === 'estimate-pour').length;
console.log(`PASS — ${rounds.length} rounds / ${cogsSeen.size} cogs (${estN} estimate-pour): ` +
  `SCALE-READER solves 100% (+ a wrong report/pick is rejected); NUMERAL-MATCH fails (the order ≠ the revealed level, no on-screen numeral); ` +
  `PERCEPTUAL-POUR + MOTOR-TIMING fail (level hidden during the pour, the reading is judged not the pour); HEIGHT-READER fails on diff-scale (the shorter column is more); ` +
  `estimate-is-loop, conservation present (compare + diff-scale), 4 cogs, scale 0-10/0-20, a read-between tick.`);
process.exit(0);
