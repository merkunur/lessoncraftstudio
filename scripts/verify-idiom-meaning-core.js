#!/usr/bin/env node
/* =====================================================================
   verify-idiom-meaning-core.js — the MEASURED build-gate for "Gabby's Funny
   Sayings" (L.3.5.a). Drives the REAL idiom-meaning-core.js over the REAL
   manifest. The child taps what the idiom REALLY means.

     • ORACLE (the 'correct' figurative card) → 100%;
     • POSITION / LONGEST / SHORTEST card bots → <= chance;
     • OVERLAP bot (pick the card sharing the most words with the idiom) → <=
       chance — so "take it literally / pick the wordiest match" fails.
   Plus STRUCTURAL per round: exactly one 'correct' + a 'literal' trap present;
   3 distinct; an idiom present; >=8 rounds.
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const REPO = path.join(__dirname, '..');
const CORE = path.join(REPO, 'mini tools', 'idiom-meaning-core.js');
const MANIFEST = path.join(REPO, 'mini tools', 'gabby-sayings-activities.json');
const CHANCE = 0.45;

function loadCore() { const src = fs.readFileSync(CORE, 'utf8'); const win = {}; new Function('window', src)(win); if (!win.IdiomMeaningCore) throw new Error('core did not attach window.IdiomMeaningCore'); return win.IdiomMeaningCore; }

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
    F(f.oneCorrect, `${r.id}: not exactly one 'correct'`);
    F(f.hasLiteral, `${r.id}: missing the 'literal' trap`);
    F(f.threeChoices, `${r.id}: not 3 choices`);
    F(f.distinct, `${r.id}: choices not distinct`);
    F(f.hasIdiom, `${r.id}: missing the idiom`);
    if (Core.grade(r, Core.oracle(r))) oracleHits++;
    const view = Core.childView(r);
    F((view.choices || []).every((c) => !('kind' in c)), `${r.id}: childView leaks card kind`);
  });
  F(oracleHits === N, `oracle ${oracleHits}/${N} (must be 100%)`);

  const d = Core.deckFacts(rounds);
  F(d.positionBot <= CHANCE, `position bot ${pct(d.positionBot)} > ${pct(CHANCE)}`);
  F(d.longestBot <= CHANCE, `longest bot ${pct(d.longestBot)} > ${pct(CHANCE)}`);
  F(d.shortestBot <= CHANCE, `shortest bot ${pct(d.shortestBot)} > ${pct(CHANCE)}`);
  F(d.overlapBot <= CHANCE, `overlap bot ${pct(d.overlapBot)} > ${pct(CHANCE)} (the correct card echoes the idiom too often)`);

  console.log(`bank: ${N} rounds`);
  console.log(`  ${oracleHits === N ? 'ok  ' : 'FAIL'} oracle: ${oracleHits}/${N}`);
  console.log(`  position ${pct(d.positionBot)} | longest ${pct(d.longestBot)} | shortest ${pct(d.shortestBot)} | overlap ${pct(d.overlapBot)}  (ceiling ${pct(CHANCE)})`);
  console.log('');
  if (fails.length) { console.error(`VERIFY-IDIOM-MEANING FAILED — ${fails.length} issue(s):`); fails.forEach((m) => console.error('  • ' + m)); process.exit(1); }
  console.log('VERIFY-IDIOM-MEANING PASSED — oracle 100%; one correct + a literal trap each round; position/longest/shortest/overlap bots <= chance; >=8 rounds.');
  process.exit(0);
})();
