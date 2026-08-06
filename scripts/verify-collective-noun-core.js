#!/usr/bin/env node
/* =====================================================================
   verify-collective-noun-core.js — the MEASURED build-gate for "Mango's Animal
   Groups" (L.2.1.a). Drives the REAL collective-noun-core.js over the REAL
   manifest. The child taps the collective noun for a group of the pictured animal.

     • ORACLE (the choice whose word === correct) → 100%;
     • POSITION / LONGEST / SHORTEST / FIXED-GUESS bots → <= chance.
   Plus STRUCTURAL per round: exactly one choice matches; a plural present; 3
   distinct; >=8 rounds. Plus ASSET: every subject noun resolves to a REAL @2x.webp.
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const REPO = path.join(__dirname, '..');
const CORE = path.join(REPO, 'mini tools', 'collective-noun-core.js');
const MANIFEST = path.join(REPO, 'mini tools', 'mango-animal-groups-activities.json');
const IMG_BASE = path.join(REPO, 'frontend', 'public', 'image-library-webp', 'themes');
const CHANCE = 0.45;

function loadCore() { const src = fs.readFileSync(CORE, 'utf8'); const win = {}; new Function('window', src)(win); if (!win.CollectiveNounCore) throw new Error('core did not attach window.CollectiveNounCore'); return win.CollectiveNounCore; }

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
    F(f.oneMatch, `${r.id}: not exactly one choice matches correct "${r.correct}"`);
    F(f.hasPlural, `${r.id}: missing the plural`);
    F(f.threeChoices, `${r.id}: not 3 choices`);
    F(f.distinct, `${r.id}: choices not distinct`);
    if (Core.grade(r, Core.oracle(r))) oracleHits++;
    const view = Core.childView(r);
    F(JSON.stringify(view).indexOf('correct') < 0, `${r.id}: childView leaks correct`);
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

  console.log(`bank: ${N} rounds | subjects: ${Object.keys(nouns).length} | images all present: ${missing.length === 0}`);
  console.log(`  ${oracleHits === N ? 'ok  ' : 'FAIL'} oracle: ${oracleHits}/${N}`);
  console.log(`  position ${pct(d.positionBot)} | longest ${pct(d.longestBot)} | shortest ${pct(d.shortestBot)} | fixed-guess ${pct(d.fixedGuessBot)}  (ceiling ${pct(CHANCE)})`);
  console.log('');
  if (fails.length) { console.error(`VERIFY-COLLECTIVE-NOUN FAILED — ${fails.length} issue(s):`); fails.forEach((m) => console.error('  • ' + m)); process.exit(1); }
  console.log('VERIFY-COLLECTIVE-NOUN PASSED — oracle 100%; one match + a plural each round; position/longest/shortest/fixed-guess <= chance; every picture present; >=8 rounds.');
  process.exit(0);
})();
