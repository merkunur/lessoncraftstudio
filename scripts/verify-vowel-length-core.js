#!/usr/bin/env node
/* =====================================================================
   verify-vowel-length-core.js — the MEASURED build-gate for "Stretch the
   Giraffe" (RF.1.2.a). Drives the REAL vowel-length-core.js over the REAL
   manifest. The child taps the word whose vowel matches the ask.

     • ORACLE (the choice whose vowel === ask) → 100%;
     • POSITION / LONGEST / SHORTEST / FIXED-GUESS form bots → <= chance.
   The long/short axis is the SKILL (like Booker's alphabetical axis), not a
   gated form-bot; it is mitigated by ASK-BALANCE (|#long − #short| ≤ 1) so a
   prompt-ignoring reader can't beat reading the prompt.
   Plus STRUCTURAL per round: valid ask; EXACTLY ONE choice matches the ask;
   all choices vowel-tagged; 3 distinct; >=8 rounds.
   Plus ASSET: every noun resolves to a REAL `<themeDir>/<noun>@2x.webp`.
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const REPO = path.join(__dirname, '..');
const CORE = path.join(REPO, 'mini tools', 'vowel-length-core.js');
const MANIFEST = path.join(REPO, 'mini tools', 'stretch-giraffe-activities.json');
const IMG_BASE = path.join(REPO, 'frontend', 'public', 'image-library-webp', 'themes');
const CHANCE = 0.45;

function loadCore() { const src = fs.readFileSync(CORE, 'utf8'); const win = {}; new Function('window', src)(win); if (!win.VowelLengthCore) throw new Error('core did not attach window.VowelLengthCore'); return win.VowelLengthCore; }

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
    F(f.validAsk, `${r.id}: invalid ask "${r.ask}"`);
    F(f.exactlyOneMatch, `${r.id}: not exactly one choice matches ask "${r.ask}"`);
    F(f.allTagged, `${r.id}: a choice is not vowel-tagged`);
    F(f.threeChoices, `${r.id}: not 3 choices`);
    F(f.distinct, `${r.id}: choices not distinct`);
    if (Core.grade(r, Core.oracle(r))) oracleHits++;
    const view = Core.childView(r);
    F((view.choices || []).every((c) => !('vowel' in c)), `${r.id}: childView leaks vowel`);
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
  F(Math.abs(d.askLong - d.askShort) <= 1, `ask not balanced (long ${d.askLong} / short ${d.askShort})`);

  console.log(`bank: ${N} rounds | ask long ${d.askLong}/short ${d.askShort} | images all present: ${missing.length === 0}`);
  console.log(`  ${oracleHits === N ? 'ok  ' : 'FAIL'} oracle: ${oracleHits}/${N}`);
  console.log(`  position ${pct(d.positionBot)} | longest ${pct(d.longestBot)} | shortest ${pct(d.shortestBot)} | fixed-guess ${pct(d.fixedGuessBot)}  (ceiling ${pct(CHANCE)})`);
  console.log('');
  if (fails.length) { console.error(`VERIFY-VOWEL-LENGTH FAILED — ${fails.length} issue(s):`); fails.forEach((m) => console.error('  • ' + m)); process.exit(1); }
  console.log('VERIFY-VOWEL-LENGTH PASSED — oracle 100%; exactly one matches the ask; ask balanced; position/longest/shortest/fixed-guess form bots <= chance; every picture present; >=8 rounds.');
  process.exit(0);
})();
