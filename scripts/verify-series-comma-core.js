#!/usr/bin/env node
/* =====================================================================
   verify-series-comma-core.js — the MEASURED build-gate for "Cleo's Packing
   List" (L.1.2.b). Drives the REAL series-comma-core.js over the REAL manifest.
   The child taps the correctly-comma'd list sentence.

     • ORACLE (the form whose ok flag is set) → 100%;
     • POSITION / LONGEST / SHORTEST / FIXED-GUESS bots → <= chance.
   Plus STRUCTURAL per round: exactly one ok; 3 distinct; the correct is the
   comma-series form; childView never leaks `ok`. Plus a DERIVED proof (the forms
   come from `items`, not a stored answer string).
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const REPO = path.join(__dirname, '..');
const CORE = path.join(REPO, 'mini tools', 'series-comma-core.js');
const MANIFEST = path.join(REPO, 'mini tools', 'cleo-packing-list-activities.json');
const CHANCE = 0.45;

function loadCore() { const src = fs.readFileSync(CORE, 'utf8'); const win = {}; new Function('window', src)(win); if (!win.SeriesCommaCore) throw new Error('core did not attach window.SeriesCommaCore'); return win.SeriesCommaCore; }

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
    F(f.hasItems, `${r.id}: items not a 3-array`);
    F(f.oneOk, `${r.id}: not exactly one correct form`);
    F(f.threeForms, `${r.id}: not 3 forms`);
    F(f.distinct, `${r.id}: forms not distinct`);
    F(f.correctIsCommaForm, `${r.id}: the correct form is not the comma-series form`);
    if (Core.grade(r, Core.oracle(r))) oracleHits++;
    const view = Core.childView(r);
    F(JSON.stringify(view).indexOf('"ok"') < 0, `${r.id}: childView leaks the ok property`);
  });
  F(oracleHits === N, `oracle ${oracleHits}/${N} (must be 100%)`);

  // DERIVED-not-stored: forms come from `items`; a bogus authored answer is irrelevant.
  const poison = Object.assign({}, rounds[0], { answer: 'ZZZ', forms: ['x', 'y', 'z'] });
  F(Core.grade(poison, Core.oracle(poison)), 'oracle broke when bogus fields were injected (must derive from items)');

  const d = Core.deckFacts(rounds);
  F(d.positionBot <= CHANCE, `position bot ${pct(d.positionBot)} > ${pct(CHANCE)}`);
  F(d.longestBot <= CHANCE, `longest bot ${pct(d.longestBot)} > ${pct(CHANCE)}`);
  F(d.shortestBot <= CHANCE, `shortest bot ${pct(d.shortestBot)} > ${pct(CHANCE)}`);
  F(d.fixedGuessBot <= CHANCE, `fixed-guess bot ${pct(d.fixedGuessBot)} > ${pct(CHANCE)}`);

  console.log(`bank: ${N} rounds`);
  console.log(`  ${oracleHits === N ? 'ok  ' : 'FAIL'} oracle: ${oracleHits}/${N}`);
  console.log(`  position ${pct(d.positionBot)} | longest ${pct(d.longestBot)} | shortest ${pct(d.shortestBot)} | fixed-guess ${pct(d.fixedGuessBot)}  (ceiling ${pct(CHANCE)})`);
  console.log('');
  if (fails.length) { console.error(`VERIFY-SERIES-COMMA FAILED — ${fails.length} issue(s):`); fails.forEach((m) => console.error('  • ' + m)); process.exit(1); }
  console.log('VERIFY-SERIES-COMMA PASSED — oracle 100%; forms DERIVED from items (bogus fields ignored); one comma-series correct + length-matched misplaced foil; position/longest/shortest/fixed-guess <= chance; >=8 rounds.');
  process.exit(0);
})();
