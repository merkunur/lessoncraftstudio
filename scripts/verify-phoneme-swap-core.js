#!/usr/bin/env node
/* =====================================================================
   verify-phoneme-swap-core.js — the MEASURED build-gate for "Pepper's Sound
   Swap" (RF.K.2.e). Drives the REAL phoneme-swap-core.js over the REAL
   manifest. The child swaps one sound and taps the new word's picture.

     • ORACLE (the choice whose b/m/e == target with the swap applied) → 100%;
     • POSITION / LONGEST / SHORTEST / FIXED-GUESS bots → <= chance.
   Plus STRUCTURAL per round: valid swap position; EXACTLY ONE choice matches
   the swap; a 2-of-3-phoneme NEAR-MISS foil present; the target is NOT among
   the choices; 3 distinct choices; >=8 rounds.
   Plus ASSET: every noun resolves to a REAL `<themeDir>/<noun>@2x.webp` in the
   image library (the exact URL the activity requests) — no broken pictures.
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const REPO = path.join(__dirname, '..');
const CORE = path.join(REPO, 'mini tools', 'phoneme-swap-core.js');
const MANIFEST = path.join(REPO, 'mini tools', 'pepper-sound-swap-activities.json');
const IMG_BASE = path.join(REPO, 'frontend', 'public', 'image-library-webp', 'themes');
const CHANCE = 0.45;

function loadCore() { const src = fs.readFileSync(CORE, 'utf8'); const win = {}; new Function('window', src)(win); if (!win.PhonemeSwapCore) throw new Error('core did not attach window.PhonemeSwapCore'); return win.PhonemeSwapCore; }

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
    F(f.validPosition, `${r.id}: invalid swap position ${r.swap.position}`);
    F(f.exactlyOneMatch, `${r.id}: not exactly one choice matches the swap`);
    F(f.nearMissPresent, `${r.id}: no 2-of-3-phoneme near-miss foil`);
    F(f.targetNotAmongChoices, `${r.id}: the target appears among the choices`);
    F(f.threeChoices, `${r.id}: not 3 choices`);
    F(f.distinct, `${r.id}: choices not distinct`);
    if (Core.grade(r, Core.oracle(r))) oracleHits++;
    const view = Core.childView(r);
    F((view.choices || []).every((c) => !('b' in c) && !('m' in c) && !('e' in c)), `${r.id}: childView leaks phonemes`);
  });
  F(oracleHits === N, `oracle ${oracleHits}/${N} (must be 100%)`);

  // ASSET: every noun -> exact <themeDir>/<noun>@2x.webp
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
  if (fails.length) { console.error(`VERIFY-PHONEME-SWAP FAILED — ${fails.length} issue(s):`); fails.forEach((m) => console.error('  • ' + m)); process.exit(1); }
  console.log('VERIFY-PHONEME-SWAP PASSED — oracle 100%; exactly one swap-match + a 2-of-3 near-miss each round; target not in choices; position/longest/shortest/fixed-guess <= chance; every picture present; >=8 rounds.');
  process.exit(0);
})();
