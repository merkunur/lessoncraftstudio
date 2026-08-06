#!/usr/bin/env node
/* =====================================================================
   verify-context-clue-core.js — the MEASURED build-gate for "Fern's Clue
   Garden" (L.2.4.a, context clues). Drives the REAL context-clue-core.js over
   the REAL manifest. The child taps the meaning the sentence points to.

     • ORACLE (the 'correct' card) → 100%;
     • POSITION bot (always the same authored slot) → <= chance;
     • LONGEST / SHORTEST card bots → <= chance;
     • OVERLAP bot (pick the card sharing the most content words with the
       sentence) → <= chance — so "pick the wordiest match" fails.
   Plus STRUCTURAL per round: exactly one 'correct' + a 'no-context' obvious
   foil present; 3 distinct choices; the word appears in the sentence; >=8 rounds.
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const REPO = path.join(__dirname, '..');
const CORE = path.join(REPO, 'mini tools', 'context-clue-core.js');
const MANIFEST = path.join(REPO, 'mini tools', 'fern-clue-garden-activities.json');
const CHANCE = 0.45;

function loadCore() { const src = fs.readFileSync(CORE, 'utf8'); const win = {}; new Function('window', src)(win); if (!win.ContextClueCore) throw new Error('core did not attach window.ContextClueCore'); return win.ContextClueCore; }

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
    F(f.hasNoContext, `${r.id}: missing the 'no-context' obvious foil`);
    F(f.threeChoices, `${r.id}: not 3 choices`);
    F(f.distinct, `${r.id}: choices not distinct`);
    F(f.wordInSentence, `${r.id}: word "${r.word}" not in the sentence`);
    if (Core.grade(r, Core.oracle(r))) oracleHits++;
    const view = Core.childView(r);
    F((view.choices || []).every((c) => !('kind' in c)), `${r.id}: childView leaks card kind`);
  });
  F(oracleHits === N, `oracle ${oracleHits}/${N} (must be 100%)`);

  const d = Core.deckFacts(rounds);
  F(d.positionBot <= CHANCE, `position bot ${pct(d.positionBot)} > ${pct(CHANCE)} (correct sits in one authored slot too often)`);
  F(d.longestBot <= CHANCE, `longest-card bot ${pct(d.longestBot)} > ${pct(CHANCE)}`);
  F(d.shortestBot <= CHANCE, `shortest-card bot ${pct(d.shortestBot)} > ${pct(CHANCE)}`);
  F(d.overlapBot <= CHANCE, `overlap bot ${pct(d.overlapBot)} > ${pct(CHANCE)} (correct card echoes the sentence too often)`);

  console.log(`bank: ${N} rounds`);
  console.log(`  ${oracleHits === N ? 'ok  ' : 'FAIL'} oracle: ${oracleHits}/${N}`);
  console.log(`  position ${pct(d.positionBot)} | longest ${pct(d.longestBot)} | shortest ${pct(d.shortestBot)} | overlap ${pct(d.overlapBot)}  (ceiling ${pct(CHANCE)})`);
  console.log('');
  if (fails.length) { console.error(`VERIFY-CONTEXT-CLUE FAILED — ${fails.length} issue(s):`); fails.forEach((m) => console.error('  • ' + m)); process.exit(1); }
  console.log('VERIFY-CONTEXT-CLUE PASSED — oracle 100%; position/longest/shortest/overlap bots all <= chance; one correct + a no-context foil each round; word-in-sentence; >=8 rounds.');
  process.exit(0);
})();
