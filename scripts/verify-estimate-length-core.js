#!/usr/bin/env node
/* =====================================================================
   verify-estimate-length-core.js — the MEASURED build-gate for "Gauge's Good
   Guess" (2.MD.A.3). Drives the REAL estimate-length-core.js over the REAL
   manifest. The child taps the sensible length estimate.

     • ORACLE (the option === the answer) → 100%;
     • POSITION / LONGEST / SHORTEST / FIXED-GUESS bots → <= chance;
     • SMALLEST / MIDDLE / LARGEST magnitude bots → <= chance (the estimation
       exploit: a fixed-magnitude correct would teach "pick the middle number").
   Plus STRUCTURAL per round: exactly one option === answer; 3 distinct; numeric
   options; childView never leaks the answer; a DERIVED proof (bogus index ignored).
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const REPO = path.join(__dirname, '..');
const CORE = path.join(REPO, 'mini tools', 'estimate-length-core.js');
const MANIFEST = path.join(REPO, 'mini tools', 'gauge-good-guess-activities.json');
const CHANCE = 0.45;

function loadCore() { const src = fs.readFileSync(CORE, 'utf8'); const win = {}; new Function('window', src)(win); if (!win.EstimateLengthCore) throw new Error('core did not attach window.EstimateLengthCore'); return win.EstimateLengthCore; }

const fails = [];
const F = (cond, msg) => { if (!cond) fails.push(msg); };
const pct = (x) => (100 * x).toFixed(1) + '%';

(function main() {
  const Core = loadCore();
  const manifest = JSON.parse(fs.readFileSync(MANIFEST, 'utf8'));
  const rounds = manifest[0].params.rounds || [];
  const N = rounds.length || 1;

  F(rounds.length >= 8, `bank has ${rounds.length} rounds (need >=8)`);

  let oracleHits = 0;
  rounds.forEach((r) => {
    const f = Core.facts(r);
    F(f.hasAnswer, `${r.id}: missing answer`);
    F(f.oneMatch, `${r.id}: not exactly one option === answer "${r.answer}"`);
    F(f.threeOptions, `${r.id}: not 3 options`);
    F(f.distinct, `${r.id}: options not distinct`);
    F(f.numeric, `${r.id}: an option has no number`);
    if (Core.grade(r, Core.oracle(r))) oracleHits++;
    const view = Core.childView(r);
    F(JSON.stringify(view).indexOf('"answer"') < 0, `${r.id}: childView leaks the answer property`);
  });
  F(oracleHits === N, `oracle ${oracleHits}/${N} (must be 100%)`);

  // DERIVED-not-stored: a bogus authored index is ignored (oracle = options.indexOf(answer)).
  const poison = Object.assign({}, rounds[0], { correctIndex: 2, answerIndex: 2 });
  F(Core.oracle(poison) === rounds[0].options.indexOf(rounds[0].answer), 'oracle is read from a stored index (must DERIVE options.indexOf(answer))');

  const d = Core.deckFacts(rounds);
  F(d.positionBot <= CHANCE, `position bot ${pct(d.positionBot)} > ${pct(CHANCE)}`);
  F(d.longestBot <= CHANCE, `longest bot ${pct(d.longestBot)} > ${pct(CHANCE)}`);
  F(d.shortestBot <= CHANCE, `shortest bot ${pct(d.shortestBot)} > ${pct(CHANCE)}`);
  F(d.fixedGuessBot <= CHANCE, `fixed-guess bot ${pct(d.fixedGuessBot)} > ${pct(CHANCE)}`);
  F(d.smallestBot <= CHANCE, `smallest-magnitude bot ${pct(d.smallestBot)} > ${pct(CHANCE)}`);
  F(d.middleBot <= CHANCE, `middle-magnitude bot ${pct(d.middleBot)} > ${pct(CHANCE)}`);
  F(d.largestBot <= CHANCE, `largest-magnitude bot ${pct(d.largestBot)} > ${pct(CHANCE)}`);

  console.log(`bank: ${N} rounds`);
  console.log(`  ${oracleHits === N ? 'ok  ' : 'FAIL'} oracle: ${oracleHits}/${N}`);
  console.log(`  position ${pct(d.positionBot)} | longest ${pct(d.longestBot)} | shortest ${pct(d.shortestBot)} | fixed ${pct(d.fixedGuessBot)}  (ceiling ${pct(CHANCE)})`);
  console.log(`  magnitude — smallest ${pct(d.smallestBot)} | middle ${pct(d.middleBot)} | largest ${pct(d.largestBot)}`);
  console.log('');
  if (fails.length) { console.error(`VERIFY-ESTIMATE-LENGTH FAILED — ${fails.length} issue(s):`); fails.forEach((m) => console.error('  • ' + m)); process.exit(1); }
  console.log('VERIFY-ESTIMATE-LENGTH PASSED — oracle 100%; DERIVED options.indexOf(answer); one numeric match; position/longest/shortest/fixed + smallest/middle/largest magnitude bots <= chance; >=8 rounds.');
  process.exit(0);
})();
