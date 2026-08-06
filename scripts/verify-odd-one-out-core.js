#!/usr/bin/env node
/* =====================================================================
   verify-odd-one-out-core.js — the MEASURED build-gate for "Ziggy's Odd One Out"
   (L.1.5.a). Drives the REAL odd-one-out-core.js over the REAL manifest. The
   child taps the picture that doesn't belong.

     • ORACLE (the minority-category item) → 100%;
     • POSITION / LONGEST / SHORTEST / FIXED-GUESS bots → <= chance.
   Plus STRUCTURAL per round: a clean 3-1 split (exactly one outsider, exactly
   two categories); 4 distinct; >=8 rounds. Plus ASSET: every noun resolves to a
   REAL @2x.webp.
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const REPO = path.join(__dirname, '..');
const CORE = path.join(REPO, 'mini tools', 'odd-one-out-core.js');
const MANIFEST = path.join(REPO, 'mini tools', 'ziggy-odd-one-out-activities.json');
const IMG_BASE = path.join(REPO, 'frontend', 'public', 'image-library-webp', 'themes');
const CHANCE = 0.45;

function loadCore() { const src = fs.readFileSync(CORE, 'utf8'); const win = {}; new Function('window', src)(win); if (!win.OddOneOutCore) throw new Error('core did not attach window.OddOneOutCore'); return win.OddOneOutCore; }

const fails = [];
const F = (cond, msg) => { if (!cond) fails.push(msg); };
const pct = (x) => (100 * x).toFixed(1) + '%';
function imgExists(themeDir, noun) { return fs.existsSync(path.join(IMG_BASE, themeDir, noun + '@2x.webp')); }

(function main() {
  const Core = loadCore();
  const manifest = JSON.parse(fs.readFileSync(MANIFEST, 'utf8'));
  const rounds = manifest[0].params.rounds || [];
  const N = rounds.length || 1;

  F(rounds.length >= 8, `bank has ${rounds.length} rounds (need >=8)`);

  let oracleHits = 0;
  rounds.forEach((r) => {
    const f = Core.facts(r);
    F(f.fourItems, `${r.id}: not 4 items`);
    F(f.cleanSplit, `${r.id}: not a clean 3-1 split (exactly one outsider, two categories)`);
    F(f.distinct, `${r.id}: items not distinct`);
    if (Core.grade(r, Core.oracle(r))) oracleHits++;
    const view = Core.childView(r);
    F((view.items || []).every((it) => !('category' in it)), `${r.id}: childView leaks category`);
  });
  F(oracleHits === N, `oracle ${oracleHits}/${N} (must be 100%)`);

  const nouns = Core.allNouns(rounds);
  let missing = [];
  Object.keys(nouns).forEach((noun) => { if (!imgExists(nouns[noun], noun)) missing.push(noun + ' (' + nouns[noun] + ')'); });
  F(missing.length === 0, `missing image(s): ${missing.join(', ')}`);

  const d = Core.deckFacts(rounds);
  F(d.positionBot <= CHANCE, `position bot ${pct(d.positionBot)} > ${pct(CHANCE)}`);
  F(d.longestBot <= CHANCE, `longest bot ${pct(d.longestBot)} > ${pct(CHANCE)}`);
  F(d.shortestBot <= CHANCE, `shortest bot ${pct(d.shortestBot)} > ${pct(CHANCE)}`);
  F(d.fixedGuessBot <= CHANCE, `fixed-guess bot ${pct(d.fixedGuessBot)} > ${pct(CHANCE)}`);

  console.log(`bank: ${N} rounds | nouns: ${Object.keys(nouns).length} | images all present: ${missing.length === 0}`);
  console.log(`  ${oracleHits === N ? 'ok  ' : 'FAIL'} oracle: ${oracleHits}/${N}`);
  console.log(`  position ${pct(d.positionBot)} | longest ${pct(d.longestBot)} | shortest ${pct(d.shortestBot)} | fixed-guess ${pct(d.fixedGuessBot)}  (ceiling ${pct(CHANCE)})`);
  console.log('');
  if (fails.length) { console.error(`VERIFY-ODD-ONE-OUT FAILED — ${fails.length} issue(s):`); fails.forEach((m) => console.error('  • ' + m)); process.exit(1); }
  console.log('VERIFY-ODD-ONE-OUT PASSED — oracle 100%; clean 3-1 split each round; position/longest/shortest/fixed-guess <= chance; every picture present; >=8 rounds.');
  process.exit(0);
})();
