#!/usr/bin/env node
/* =====================================================================
   verify-time-preposition-core.js — the MEASURED build-gate for "Tempo's Day
   Plan" (L.1.1.i). Drives the REAL time-preposition-core.js over the REAL
   manifest. The child taps the time preposition (before/during/after).

     • ORACLE (the card === correct) → 100%;
     • POSITION / LONGEST / SHORTEST / FIXED-GUESS bots → <= chance;
     • FORM-MIX (all of before/during/after appear) → genuine 3-way.
   Plus STRUCTURAL per round: correct ∈ {before,during,after}; 3 distinct; the
   gap is followed by a noun object (a preposition, not a clause); childView
   never leaks a "correct" property.
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const REPO = path.join(__dirname, '..');
const CORE = path.join(REPO, 'mini tools', 'time-preposition-core.js');
const MANIFEST = path.join(REPO, 'mini tools', 'tempo-day-plan-activities.json');
const CHANCE = 0.45;

function loadCore() { const src = fs.readFileSync(CORE, 'utf8'); const win = {}; new Function('window', src)(win); if (!win.TimePrepositionCore) throw new Error('core did not attach window.TimePrepositionCore'); return win.TimePrepositionCore; }

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
    F(f.correctValid, `${r.id}: correct "${r.correct}" not before/during/after`);
    F(f.hasSentence, `${r.id}: missing sentence`);
    F(f.threeChoices, `${r.id}: not 3 cards`);
    F(f.distinct, `${r.id}: cards not distinct`);
    F(f.hasNounObject, `${r.id}: the gap has no noun object (must be a preposition, not a clause)`);
    if (Core.grade(r, Core.oracle(r))) oracleHits++;
    const view = Core.childView(r);
    F(JSON.stringify(view).indexOf('"correct"') < 0, `${r.id}: childView leaks the correct property`);
  });
  F(oracleHits === N, `oracle ${oracleHits}/${N} (must be 100%)`);

  const d = Core.deckFacts(rounds);
  F(d.formMix, `bank is not a genuine 3-way (before ${d.hasBefore} / during ${d.hasDuring} / after ${d.hasAfter})`);
  F(d.positionBot <= CHANCE, `position bot ${pct(d.positionBot)} > ${pct(CHANCE)}`);
  F(d.longestBot <= CHANCE, `longest bot ${pct(d.longestBot)} > ${pct(CHANCE)}`);
  F(d.shortestBot <= CHANCE, `shortest bot ${pct(d.shortestBot)} > ${pct(CHANCE)}`);
  F(d.fixedGuessBot <= CHANCE, `fixed-guess bot ${pct(d.fixedGuessBot)} > ${pct(CHANCE)}`);

  console.log(`bank: ${N} rounds  (form-mix ${d.formMix ? 'yes' : 'NO'})`);
  console.log(`  ${oracleHits === N ? 'ok  ' : 'FAIL'} oracle: ${oracleHits}/${N}`);
  console.log(`  position ${pct(d.positionBot)} | longest ${pct(d.longestBot)} | shortest ${pct(d.shortestBot)} | fixed-guess ${pct(d.fixedGuessBot)}  (ceiling ${pct(CHANCE)})`);
  console.log('');
  if (fails.length) { console.error(`VERIFY-TIME-PREPOSITION FAILED — ${fails.length} issue(s):`); fails.forEach((m) => console.error('  • ' + m)); process.exit(1); }
  console.log('VERIFY-TIME-PREPOSITION PASSED — oracle 100%; correct before/during/after; genuine 3-way (form-mix); noun-object prepositions; position/longest/shortest/fixed-guess <= chance; >=8 rounds.');
  process.exit(0);
})();
