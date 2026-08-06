#!/usr/bin/env node
/* =====================================================================
   verify-word-intensity-core.js — the MEASURED build-gate for "Roary's Roar
   Meter" (L.2.5.b). Drives the REAL word-intensity-core.js over the REAL
   manifest. The child taps the strongest/weakest word in a graded set.

     • ORACLE (the max/min-rank word) → 100%;
     • POSITION / LONGEST / SHORTEST / FIXED-GUESS form bots → <= chance.
   The intensity axis is the SKILL (mitigated by ASK-BALANCE so a prompt-
   ignoring reader can't beat reading the prompt). Plus STRUCTURAL per round:
   valid ask; ranks distinct; the MIDDLE-rank word is NEVER the answer; 3
   distinct; ask balanced (|#strongest − #weakest| ≤ 1); >=8 rounds.
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const REPO = path.join(__dirname, '..');
const CORE = path.join(REPO, 'mini tools', 'word-intensity-core.js');
const MANIFEST = path.join(REPO, 'mini tools', 'roary-roar-meter-activities.json');
const CHANCE = 0.45;

function loadCore() { const src = fs.readFileSync(CORE, 'utf8'); const win = {}; new Function('window', src)(win); if (!win.WordIntensityCore) throw new Error('core did not attach window.WordIntensityCore'); return win.WordIntensityCore; }

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
    F(f.validAsk, `${r.id}: invalid ask "${r.ask}"`);
    F(f.threeWords, `${r.id}: not 3 words`);
    F(f.ranksDistinct, `${r.id}: ranks not distinct`);
    F(f.distinct, `${r.id}: words not distinct`);
    F(f.answerNotMiddle, `${r.id}: the answer is the middle-rank word (must be an extreme)`);
    if (Core.grade(r, Core.oracle(r))) oracleHits++;
    const view = Core.childView(r);
    F((view.words || []).every((w) => !('rank' in w)), `${r.id}: childView leaks rank`);
  });
  F(oracleHits === N, `oracle ${oracleHits}/${N} (must be 100%)`);

  const d = Core.deckFacts(rounds);
  F(d.middleHits === 0, `middle-rank was the answer in ${d.middleHits} round(s) (must be 0)`);
  F(Math.abs(d.askStrong - d.askWeak) <= 1, `ask not balanced (strongest ${d.askStrong} / weakest ${d.askWeak})`);
  F(d.positionBot <= CHANCE, `position bot ${pct(d.positionBot)} > ${pct(CHANCE)}`);
  F(d.longestBot <= CHANCE, `longest bot ${pct(d.longestBot)} > ${pct(CHANCE)}`);
  F(d.shortestBot <= CHANCE, `shortest bot ${pct(d.shortestBot)} > ${pct(CHANCE)}`);
  F(d.fixedGuessBot <= CHANCE, `fixed-guess bot ${pct(d.fixedGuessBot)} > ${pct(CHANCE)}`);

  console.log(`bank: ${N} rounds | ask strongest ${d.askStrong}/weakest ${d.askWeak} | middle-as-answer ${d.middleHits}`);
  console.log(`  ${oracleHits === N ? 'ok  ' : 'FAIL'} oracle: ${oracleHits}/${N}`);
  console.log(`  position ${pct(d.positionBot)} | longest ${pct(d.longestBot)} | shortest ${pct(d.shortestBot)} | fixed-guess ${pct(d.fixedGuessBot)}  (ceiling ${pct(CHANCE)})`);
  console.log('');
  if (fails.length) { console.error(`VERIFY-WORD-INTENSITY FAILED — ${fails.length} issue(s):`); fails.forEach((m) => console.error('  • ' + m)); process.exit(1); }
  console.log('VERIFY-WORD-INTENSITY PASSED — oracle 100%; middle never the answer; ask balanced; position/longest/shortest/fixed-guess form bots <= chance; >=8 rounds.');
  process.exit(0);
})();
