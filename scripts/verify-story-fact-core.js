#!/usr/bin/env node
/* =====================================================================
   verify-story-fact-core.js — the MEASURED build-gate for "Bea's Two
   Bookshelves" (RL.1.5). Drives the REAL story-fact-core.js over the REAL
   manifest. The child taps the book of the asked kind (story or fact).

     • ORACLE (the book whose type === ask) → 100%;
     • POSITION / LONGEST / SHORTEST / FIXED-GUESS bots → <= chance.
   Plus STRUCTURAL per round: ask valid; EXACTLY ONE book of the asked type;
   3 distinct titles; types valid; childView never leaks `type`. Plus an
   ask-BALANCE assertion (≈half story-asked, half fact-asked, so a prompt-blind
   bot can't win).
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const REPO = path.join(__dirname, '..');
const CORE = path.join(REPO, 'mini tools', 'story-fact-core.js');
const MANIFEST = path.join(REPO, 'mini tools', 'bea-two-bookshelves-activities.json');
const CHANCE = 0.45;

function loadCore() { const src = fs.readFileSync(CORE, 'utf8'); const win = {}; new Function('window', src)(win); if (!win.StoryFactCore) throw new Error('core did not attach window.StoryFactCore'); return win.StoryFactCore; }

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
    F(f.askValid, `${r.id}: ask "${r.ask}" not story/fact`);
    F(f.oneOfAsk, `${r.id}: not exactly one book of the asked type "${r.ask}"`);
    F(f.threeBooks, `${r.id}: not 3 books`);
    F(f.distinctTitles, `${r.id}: titles not distinct`);
    F(f.typesValid, `${r.id}: a book has an invalid type`);
    if (Core.grade(r, Core.oracle(r))) oracleHits++;
    const view = Core.childView(r);
    F(JSON.stringify(view).indexOf('"type"') < 0, `${r.id}: childView leaks the type property`);
  });
  F(oracleHits === N, `oracle ${oracleHits}/${N} (must be 100%)`);

  const d = Core.deckFacts(rounds);
  F(d.askBalanced, `ask not balanced (story ${d.askStory} / fact ${d.askFact})`);
  F(d.positionBot <= CHANCE, `position bot ${pct(d.positionBot)} > ${pct(CHANCE)}`);
  F(d.longestBot <= CHANCE, `longest bot ${pct(d.longestBot)} > ${pct(CHANCE)}`);
  F(d.shortestBot <= CHANCE, `shortest bot ${pct(d.shortestBot)} > ${pct(CHANCE)}`);
  F(d.fixedGuessBot <= CHANCE, `fixed-guess bot ${pct(d.fixedGuessBot)} > ${pct(CHANCE)}`);

  console.log(`bank: ${N} rounds  (ask story ${d.askStory} / fact ${d.askFact})`);
  console.log(`  ${oracleHits === N ? 'ok  ' : 'FAIL'} oracle: ${oracleHits}/${N}`);
  console.log(`  position ${pct(d.positionBot)} | longest ${pct(d.longestBot)} | shortest ${pct(d.shortestBot)} | fixed-guess ${pct(d.fixedGuessBot)}  (ceiling ${pct(CHANCE)})`);
  console.log('');
  if (fails.length) { console.error(`VERIFY-STORY-FACT FAILED — ${fails.length} issue(s):`); fails.forEach((m) => console.error('  • ' + m)); process.exit(1); }
  console.log('VERIFY-STORY-FACT PASSED — oracle 100%; one book of the asked type + no type leak + ask-balanced; position/longest/shortest/fixed-guess <= chance; >=8 rounds.');
  process.exit(0);
})();
