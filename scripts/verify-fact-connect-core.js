#!/usr/bin/env node
/* =====================================================================
   verify-fact-connect-core.js — the MEASURED build-gate for "Linc's Fact Chain"
   (RI.K.3). Drives the REAL fact-connect-core.js over the REAL manifest. The
   child taps the fact that connects to the stem (next / cause).

     • ORACLE (the option === the answer) → 100%;
     • POSITION / LONGEST / SHORTEST / FIXED-GUESS bots → <= chance.
   Plus STRUCTURAL per round: mode valid; exactly one option === answer; 3
   distinct; has a stem; childView never leaks the answer. Plus a mode-MIX
   assertion (both sequence + cause present) + a DERIVED proof (a bogus authored
   index is ignored — oracle = options.indexOf(answer)).
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const REPO = path.join(__dirname, '..');
const CORE = path.join(REPO, 'mini tools', 'fact-connect-core.js');
const MANIFEST = path.join(REPO, 'mini tools', 'linc-fact-chain-activities.json');
const CHANCE = 0.45;

function loadCore() { const src = fs.readFileSync(CORE, 'utf8'); const win = {}; new Function('window', src)(win); if (!win.FactConnectCore) throw new Error('core did not attach window.FactConnectCore'); return win.FactConnectCore; }

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
    F(f.modeValid, `${r.id}: mode "${r.mode}" not sequence/cause`);
    F(f.hasAnswer, `${r.id}: missing answer`);
    F(f.oneMatch, `${r.id}: not exactly one option === answer "${r.answer}"`);
    F(f.threeOptions, `${r.id}: not 3 options`);
    F(f.distinct, `${r.id}: options not distinct`);
    F(f.hasStem, `${r.id}: missing stem`);
    if (Core.grade(r, Core.oracle(r))) oracleHits++;
    const view = Core.childView(r);
    F(JSON.stringify(view).indexOf('"answer"') < 0, `${r.id}: childView leaks the answer property`);
  });
  F(oracleHits === N, `oracle ${oracleHits}/${N} (must be 100%)`);

  // DERIVED-not-stored: a bogus authored index is ignored (oracle = options.indexOf(answer)).
  const poison = Object.assign({}, rounds[0], { correctIndex: 0, answerIndex: 0 });
  F(Core.oracle(poison) === rounds[0].options.indexOf(rounds[0].answer), 'oracle is read from a stored index (must DERIVE options.indexOf(answer))');

  const d = Core.deckFacts(rounds);
  F(d.modeMix, `bank is not a mix of sequence + cause (sequence ${d.sequence} / cause ${d.cause})`);
  F(d.positionBot <= CHANCE, `position bot ${pct(d.positionBot)} > ${pct(CHANCE)}`);
  F(d.longestBot <= CHANCE, `longest bot ${pct(d.longestBot)} > ${pct(CHANCE)}`);
  F(d.shortestBot <= CHANCE, `shortest bot ${pct(d.shortestBot)} > ${pct(CHANCE)}`);
  F(d.fixedGuessBot <= CHANCE, `fixed-guess bot ${pct(d.fixedGuessBot)} > ${pct(CHANCE)}`);

  console.log(`bank: ${N} rounds  (sequence ${d.sequence} / cause ${d.cause})`);
  console.log(`  ${oracleHits === N ? 'ok  ' : 'FAIL'} oracle: ${oracleHits}/${N}`);
  console.log(`  position ${pct(d.positionBot)} | longest ${pct(d.longestBot)} | shortest ${pct(d.shortestBot)} | fixed-guess ${pct(d.fixedGuessBot)}  (ceiling ${pct(CHANCE)})`);
  console.log('');
  if (fails.length) { console.error(`VERIFY-FACT-CONNECT FAILED — ${fails.length} issue(s):`); fails.forEach((m) => console.error('  • ' + m)); process.exit(1); }
  console.log('VERIFY-FACT-CONNECT PASSED — oracle 100%; oracle DERIVED options.indexOf(answer) (bogus index ignored); one match + mode-mix; position/longest/shortest/fixed-guess <= chance; >=8 rounds.');
  process.exit(0);
})();
