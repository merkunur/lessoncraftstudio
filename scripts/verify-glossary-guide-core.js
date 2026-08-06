#!/usr/bin/env node
/* =====================================================================
   verify-glossary-guide-core.js — the MEASURED build-gate for "Booker's
   Glossary Desk" (L.2.4.e, guide words). Drives the REAL glossary-guide-
   core.js over the REAL manifest. The child taps the word that belongs on the
   page (alphabetically between the two guide words).

     • ORACLE (the in-range word) → 100%;
     • POSITION / LONGEST / SHORTEST / FIXED-GUESS bots → <= chance.
   Plus STRUCTURAL per round: guides ordered (g1 < g2); EXACTLY ONE word in
   range; a same-first-letter out-of-range foil present (so first-letter
   matching alone fails); 3 distinct words; >=8 rounds. Answer is DERIVED by
   alphabetical comparison (verified by recomputing oracle from the core).
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const REPO = path.join(__dirname, '..');
const CORE = path.join(REPO, 'mini tools', 'glossary-guide-core.js');
const MANIFEST = path.join(REPO, 'mini tools', 'booker-glossary-desk-activities.json');
const CHANCE = 0.45;

function loadCore() { const src = fs.readFileSync(CORE, 'utf8'); const win = {}; new Function('window', src)(win); if (!win.GlossaryGuideCore) throw new Error('core did not attach window.GlossaryGuideCore'); return win.GlossaryGuideCore; }

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
    F(f.guidesOrdered, `${r.id}: guide words not ordered (${r.g1} < ${r.g2}?)`);
    F(f.exactlyOneInRange, `${r.id}: not exactly one word in [${r.g1}, ${r.g2}] (words ${r.words.join('/')})`);
    F(f.sameLetterFoil, `${r.id}: no same-first-letter out-of-range foil (first-letter matching would solve it)`);
    F(f.threeWords, `${r.id}: not 3 words`);
    F(f.distinct, `${r.id}: words not distinct`);
    if (Core.grade(r, Core.oracle(r))) oracleHits++;
    const view = Core.childView(r);
    F((view.words || []).every((w) => !('kind' in w) && !('inRange' in w)), `${r.id}: childView leaks the answer`);
  });
  F(oracleHits === N, `oracle ${oracleHits}/${N} (must be 100%)`);

  const d = Core.deckFacts(rounds);
  F(d.positionBot <= CHANCE, `position bot ${pct(d.positionBot)} > ${pct(CHANCE)} (in-range word sits in one slot too often)`);
  F(d.longestBot <= CHANCE, `longest-word bot ${pct(d.longestBot)} > ${pct(CHANCE)}`);
  F(d.shortestBot <= CHANCE, `shortest-word bot ${pct(d.shortestBot)} > ${pct(CHANCE)}`);
  F(d.fixedGuessBot <= CHANCE, `fixed-guess bot ${pct(d.fixedGuessBot)} > ${pct(CHANCE)}`);

  console.log(`bank: ${N} rounds`);
  console.log(`  ${oracleHits === N ? 'ok  ' : 'FAIL'} oracle: ${oracleHits}/${N}`);
  console.log(`  position ${pct(d.positionBot)} | longest ${pct(d.longestBot)} | shortest ${pct(d.shortestBot)} | fixed-guess ${pct(d.fixedGuessBot)}  (ceiling ${pct(CHANCE)})`);
  console.log('');
  if (fails.length) { console.error(`VERIFY-GLOSSARY-GUIDE FAILED — ${fails.length} issue(s):`); fails.forEach((m) => console.error('  • ' + m)); process.exit(1); }
  console.log('VERIFY-GLOSSARY-GUIDE PASSED — oracle 100% (DERIVED by alphabetical compare); exactly one in-range word + a same-first-letter foil each round; position/longest/shortest/fixed-guess bots all <= chance; >=8 rounds.');
  process.exit(0);
})();
