#!/usr/bin/env node
/* =====================================================================
   verify-word-match-core.js — the MEASURED build-gate for "Bingo's Word Hunt"
   (RF.K.3.d). Drives the REAL word-match-core.js over the REAL manifest. The
   child reads 3 near-words and taps the one that names the picture.

     • ORACLE (the choice whose word === picture noun) → 100%;
     • POSITION / LONGEST / SHORTEST / FIXED-GUESS bots → <= chance.
   Plus STRUCTURAL per round: exactly one word matches the picture; EVERY foil
   differs from the answer by EXACTLY ONE letter (real minimal pair); 3 distinct;
   >=8 rounds. Plus ASSET: every picture noun resolves to a REAL @2x.webp.
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const REPO = path.join(__dirname, '..');
const CORE = path.join(REPO, 'mini tools', 'word-match-core.js');
const MANIFEST = path.join(REPO, 'mini tools', 'bingo-word-hunt-activities.json');
const IMG_BASE = path.join(REPO, 'frontend', 'public', 'image-library-webp', 'themes');
const CHANCE = 0.45;

function loadCore() { const src = fs.readFileSync(CORE, 'utf8'); const win = {}; new Function('window', src)(win); if (!win.WordMatchCore) throw new Error('core did not attach window.WordMatchCore'); return win.WordMatchCore; }

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
    F(f.oneMatch, `${r.id}: not exactly one word matches the picture`);
    F(f.foilsMinimalPair, `${r.id}: a foil is not a 1-letter minimal pair of "${r.target.noun}"`);
    F(f.threeChoices, `${r.id}: not 3 choices`);
    F(f.distinct, `${r.id}: choices not distinct`);
    if (Core.grade(r, Core.oracle(r))) oracleHits++;
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

  console.log(`bank: ${N} rounds | pictures: ${Object.keys(nouns).length} | images all present: ${missing.length === 0}`);
  console.log(`  ${oracleHits === N ? 'ok  ' : 'FAIL'} oracle: ${oracleHits}/${N}`);
  console.log(`  position ${pct(d.positionBot)} | longest ${pct(d.longestBot)} | shortest ${pct(d.shortestBot)} | fixed-guess ${pct(d.fixedGuessBot)}  (ceiling ${pct(CHANCE)})`);
  console.log('');
  if (fails.length) { console.error(`VERIFY-WORD-MATCH FAILED — ${fails.length} issue(s):`); fails.forEach((m) => console.error('  • ' + m)); process.exit(1); }
  console.log('VERIFY-WORD-MATCH PASSED — oracle 100%; one match + all foils are 1-letter minimal pairs; position/longest/shortest/fixed-guess <= chance; every picture present; >=8 rounds.');
  process.exit(0);
})();
