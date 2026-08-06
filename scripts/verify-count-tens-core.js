#!/usr/bin/env node
/* =====================================================================
   verify-count-tens-core.js — the MEASURED build-gate for "Posy's Egg Cartons"
   (K.CC.A.1). Drives the REAL count-tens-core.js over the REAL manifest. The
   child counts `tens` cartons of ten BY TENS and taps the total.

     • ORACLE (the card whose value === 10*tens) → 100%;
     • POSITION / LONGEST / SHORTEST / FIXED-GUESS bots → <= chance.
   Plus STRUCTURAL per round: answer === 10*tens; exactly one card matches; 3
   distinct; tens in 1..10. Plus a DERIVED-not-stored proof: a bogus authored
   `answer`/`choices` on a round is IGNORED (the oracle still picks 10*tens).
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const REPO = path.join(__dirname, '..');
const CORE = path.join(REPO, 'mini tools', 'count-tens-core.js');
const MANIFEST = path.join(REPO, 'mini tools', 'posy-egg-cartons-activities.json');
const CHANCE = 0.45;

function loadCore() { const src = fs.readFileSync(CORE, 'utf8'); const win = {}; new Function('window', src)(win); if (!win.CountTensCore) throw new Error('core did not attach window.CountTensCore'); return win.CountTensCore; }

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
    F(f.oneMatch, `${r.id}: not exactly one card === 10*tens`);
    F(f.threeChoices, `${r.id}: not 3 cards`);
    F(f.distinct, `${r.id}: cards not distinct`);
    F(f.tensInRange, `${r.id}: tens ${r.tens} not in 1..10`);
    F(f.answerIsTenTimes, `${r.id}: answer is not 10*tens`);
    if (Core.grade(r, Core.oracle(r))) oracleHits++;
    const view = Core.childView(r);
    F(JSON.stringify(view).indexOf('answer') < 0, `${r.id}: childView leaks an answer property`);
  });
  F(oracleHits === N, `oracle ${oracleHits}/${N} (must be 100%)`);

  // DERIVED-not-stored: poison a round with a bogus answer/choices → ignored.
  const poison = Object.assign({}, rounds[0], { answer: 999, choices: [{ value: 999 }, { value: 1 }, { value: 2 }] });
  F(Core.answerValue(poison) === 10 * poison.tens, 'answer is read from a stored field (must DERIVE 10*tens)');
  F(Core.grade(poison, Core.oracle(poison)), 'oracle broke when a bogus answer was injected (must ignore it)');

  const d = Core.deckFacts(rounds);
  F(d.positionBot <= CHANCE, `position bot ${pct(d.positionBot)} > ${pct(CHANCE)}`);
  F(d.longestBot <= CHANCE, `longest bot ${pct(d.longestBot)} > ${pct(CHANCE)}`);
  F(d.shortestBot <= CHANCE, `shortest bot ${pct(d.shortestBot)} > ${pct(CHANCE)}`);
  F(d.fixedGuessBot <= CHANCE, `fixed-guess bot ${pct(d.fixedGuessBot)} > ${pct(CHANCE)}`);

  console.log(`bank: ${N} rounds`);
  console.log(`  ${oracleHits === N ? 'ok  ' : 'FAIL'} oracle: ${oracleHits}/${N}`);
  console.log(`  position ${pct(d.positionBot)} | longest ${pct(d.longestBot)} | shortest ${pct(d.shortestBot)} | fixed-guess ${pct(d.fixedGuessBot)}  (ceiling ${pct(CHANCE)})`);
  console.log('');
  if (fails.length) { console.error(`VERIFY-COUNT-TENS FAILED — ${fails.length} issue(s):`); fails.forEach((m) => console.error('  • ' + m)); process.exit(1); }
  console.log('VERIFY-COUNT-TENS PASSED — oracle 100%; answer DERIVED 10*tens (bogus answer ignored); one match + 3 distinct + tens 1..10; position/longest/shortest/fixed-guess <= chance; >=8 rounds.');
  process.exit(0);
})();
