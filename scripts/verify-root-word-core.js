#!/usr/bin/env node
/* =====================================================================
   verify-root-word-core.js — the MEASURED build-gate for "Sage's Root Garden"
   (L.2.4.c). Drives the REAL root-word-core.js over the REAL manifest. The child
   taps the word that grows from the given root.

     • ORACLE (the choice whose word === correct) → 100%;
     • POSITION / LONGEST / SHORTEST / FIXED-GUESS bots → <= chance.
   Plus STRUCTURAL per round: exactly one match; the correct word contains the
   root as its base (startsWith); 3 distinct; >=8 rounds.
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const REPO = path.join(__dirname, '..');
const CORE = path.join(REPO, 'mini tools', 'root-word-core.js');
const MANIFEST = path.join(REPO, 'mini tools', 'sage-root-garden-activities.json');
const CHANCE = 0.45;

function loadCore() { const src = fs.readFileSync(CORE, 'utf8'); const win = {}; new Function('window', src)(win); if (!win.RootWordCore) throw new Error('core did not attach window.RootWordCore'); return win.RootWordCore; }

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
    F(f.oneMatch, `${r.id}: not exactly one choice matches correct "${r.correct}"`);
    F(f.correctFromRoot, `${r.id}: correct "${r.correct}" does not grow from root "${r.root}"`);
    F(f.threeChoices, `${r.id}: not 3 choices`);
    F(f.distinct, `${r.id}: choices not distinct`);
    if (Core.grade(r, Core.oracle(r))) oracleHits++;
    const view = Core.childView(r);
    F(JSON.stringify(view).indexOf('correct') < 0, `${r.id}: childView leaks correct`);
  });
  F(oracleHits === N, `oracle ${oracleHits}/${N} (must be 100%)`);

  const d = Core.deckFacts(rounds);
  F(d.positionBot <= CHANCE, `position bot ${pct(d.positionBot)} > ${pct(CHANCE)}`);
  F(d.longestBot <= CHANCE, `longest bot ${pct(d.longestBot)} > ${pct(CHANCE)}`);
  F(d.shortestBot <= CHANCE, `shortest bot ${pct(d.shortestBot)} > ${pct(CHANCE)}`);
  F(d.fixedGuessBot <= CHANCE, `fixed-guess bot ${pct(d.fixedGuessBot)} > ${pct(CHANCE)}`);

  console.log(`bank: ${N} rounds`);
  console.log(`  ${oracleHits === N ? 'ok  ' : 'FAIL'} oracle: ${oracleHits}/${N}`);
  console.log(`  position ${pct(d.positionBot)} | longest ${pct(d.longestBot)} | shortest ${pct(d.shortestBot)} | fixed-guess ${pct(d.fixedGuessBot)}  (ceiling ${pct(CHANCE)})`);
  console.log('');
  if (fails.length) { console.error(`VERIFY-ROOT-WORD FAILED — ${fails.length} issue(s):`); fails.forEach((m) => console.error('  • ' + m)); process.exit(1); }
  console.log('VERIFY-ROOT-WORD PASSED — oracle 100%; one match + correct grows from the root; position/longest/shortest/fixed-guess <= chance; >=8 rounds.');
  process.exit(0);
})();
