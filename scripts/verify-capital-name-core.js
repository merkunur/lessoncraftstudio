#!/usr/bin/env node
/* =====================================================================
   verify-capital-name-core.js — the MEASURED build-gate for "Wally's Capital
   Crane" (L.2.2.a). Drives the REAL capital-name-core.js over the REAL manifest.
   The child taps the special-name word that needs a capital letter.

     • ORACLE (the chip === the stored special name) → 100%;
     • POSITION / LONGEST / SHORTEST / FIXED-GUESS bots → <= chance.
   Plus STRUCTURAL per round: exactly one token === proper; proper is lowercase;
   the target is NOT the sentence-start word; capitalizing actually changes it.
   Plus a DERIVED proof (a bogus authored index is ignored — oracle is computed
   by tokens.indexOf(proper)).
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const REPO = path.join(__dirname, '..');
const CORE = path.join(REPO, 'mini tools', 'capital-name-core.js');
const MANIFEST = path.join(REPO, 'mini tools', 'wally-capital-crane-activities.json');
const CHANCE = 0.45;

function loadCore() { const src = fs.readFileSync(CORE, 'utf8'); const win = {}; new Function('window', src)(win); if (!win.CapitalNameCore) throw new Error('core did not attach window.CapitalNameCore'); return win.CapitalNameCore; }

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
    F(f.hasProper, `${r.id}: missing proper`);
    F(f.oneMatch, `${r.id}: not exactly one token === proper "${r.proper}"`);
    F(f.properLower, `${r.id}: proper "${r.proper}" is not lowercase`);
    F(f.notSentenceStart, `${r.id}: the special name is the sentence-start word`);
    F(f.capForm, `${r.id}: capitalizing "${r.proper}" does not change it`);
    if (Core.grade(r, Core.oracle(r))) oracleHits++;
    const view = Core.childView(r);
    F(JSON.stringify(view).indexOf('"proper"') < 0, `${r.id}: childView leaks the proper property`);
  });
  F(oracleHits === N, `oracle ${oracleHits}/${N} (must be 100%)`);

  // DERIVED-not-stored: a bogus authored index is ignored (oracle = indexOf(proper)).
  const poison = Object.assign({}, rounds[0], { targetIndex: 0, answer: 0 });
  F(Core.oracle(poison) === (rounds[0].tokens.indexOf(rounds[0].proper)), 'oracle is read from a stored index (must DERIVE indexOf(proper))');

  const d = Core.deckFacts(rounds);
  F(d.positionBot <= CHANCE, `position bot ${pct(d.positionBot)} > ${pct(CHANCE)}`);
  F(d.longestBot <= CHANCE, `longest bot ${pct(d.longestBot)} > ${pct(CHANCE)}`);
  F(d.shortestBot <= CHANCE, `shortest bot ${pct(d.shortestBot)} > ${pct(CHANCE)}`);
  F(d.fixedGuessBot <= CHANCE, `fixed-guess bot ${pct(d.fixedGuessBot)} > ${pct(CHANCE)}`);

  console.log(`bank: ${N} rounds`);
  console.log(`  ${oracleHits === N ? 'ok  ' : 'FAIL'} oracle: ${oracleHits}/${N}`);
  console.log(`  position ${pct(d.positionBot)} | longest ${pct(d.longestBot)} | shortest ${pct(d.shortestBot)} | fixed-guess ${pct(d.fixedGuessBot)}  (ceiling ${pct(CHANCE)})`);
  console.log('');
  if (fails.length) { console.error(`VERIFY-CAPITAL-NAME FAILED — ${fails.length} issue(s):`); fails.forEach((m) => console.error('  • ' + m)); process.exit(1); }
  console.log('VERIFY-CAPITAL-NAME PASSED — oracle 100%; oracle DERIVED indexOf(proper) (bogus index ignored); one lowercase special name, not the sentence start; position/longest/shortest/fixed-guess <= chance; >=8 rounds.');
  process.exit(0);
})();
