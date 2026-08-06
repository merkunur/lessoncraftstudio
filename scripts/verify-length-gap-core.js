#!/usr/bin/env node
/* =====================================================================
   verify-length-gap-core.js — the MEASURED build-gate for "Span's Length Gap"
   (2.MD.A.4). Drives the REAL length-gap-core.js over the REAL manifest. The
   child types how much longer the longer bar is.

     • ORACLE (typing the DERIVED difference aLen−bLen) → 100%; neighbours false;
     • keypad bots FIXED-GUESS / ECHO-A / ECHO-B → <= chance.
   Plus STRUCTURAL per round: aLen > bLen; lengths in range; diff positive; no
   diff === an operand (so echo bots are real misses). Plus a DERIVED proof
   (a bogus authored answer is ignored — answer = aLen − bLen).
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const REPO = path.join(__dirname, '..');
const CORE = path.join(REPO, 'mini tools', 'length-gap-core.js');
const MANIFEST = path.join(REPO, 'mini tools', 'span-length-gap-activities.json');
const CHANCE = 0.45;

function loadCore() { const src = fs.readFileSync(CORE, 'utf8'); const win = {}; new Function('window', src)(win); if (!win.LengthGapCore) throw new Error('core did not attach window.LengthGapCore'); return win.LengthGapCore; }

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
    F(f.aLongerThanB, `${r.id}: aLen (${r.aLen}) not > bLen (${r.bLen})`);
    F(f.lensInRange, `${r.id}: lengths out of 1..20`);
    F(f.diffPositive, `${r.id}: difference not positive`);
    F(f.notEchoA, `${r.id}: difference equals aLen (echo-a free pass)`);
    F(f.notEchoB, `${r.id}: difference equals bLen (echo-b free pass)`);
    const a = Core.answerValue(r);
    if (Core.grade(r, a) && !Core.grade(r, a + 1) && !Core.grade(r, a - 1)) oracleHits++;
    const view = Core.childView(r);
    F(JSON.stringify(view).indexOf('answer') < 0, `${r.id}: childView leaks an answer property`);
  });
  F(oracleHits === N, `oracle ${oracleHits}/${N} (typed diff grades true, neighbours false)`);

  // DERIVED-not-stored: a bogus authored answer is ignored.
  const poison = Object.assign({}, rounds[0], { answer: 999 });
  F(Core.answerValue(poison) === (poison.aLen - poison.bLen), 'answer is read from a stored field (must DERIVE aLen − bLen)');

  const d = Core.deckFacts(rounds);
  F(d.fixedGuessBot <= CHANCE, `fixed-guess bot ${pct(d.fixedGuessBot)} > ${pct(CHANCE)}`);
  F(d.echoABot <= CHANCE, `echo-a bot ${pct(d.echoABot)} > ${pct(CHANCE)}`);
  F(d.echoBBot <= CHANCE, `echo-b bot ${pct(d.echoBBot)} > ${pct(CHANCE)}`);

  console.log(`bank: ${N} rounds`);
  console.log(`  ${oracleHits === N ? 'ok  ' : 'FAIL'} oracle: ${oracleHits}/${N}`);
  console.log(`  fixed-guess ${pct(d.fixedGuessBot)} | echo-a ${pct(d.echoABot)} | echo-b ${pct(d.echoBBot)}  (ceiling ${pct(CHANCE)})`);
  console.log('');
  if (fails.length) { console.error(`VERIFY-LENGTH-GAP FAILED — ${fails.length} issue(s):`); fails.forEach((m) => console.error('  • ' + m)); process.exit(1); }
  console.log('VERIFY-LENGTH-GAP PASSED — oracle 100% (neighbours false); answer DERIVED aLen−bLen (bogus answer ignored); aLen>bLen + no diff===operand; fixed-guess/echo-a/echo-b <= chance; >=8 rounds.');
  process.exit(0);
})();
