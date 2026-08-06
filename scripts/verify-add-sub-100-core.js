#!/usr/bin/env node
/* =====================================================================
   verify-add-sub-100-core.js — the MEASURED build-gate for "Gus's Snack Cart"
   (2.NBT.B.5). Drives the REAL add-sub-100-core.js over the REAL manifest. The
   child types the sum/difference on the keypad.

     • ORACLE (typing the DERIVED answer a±b) → 100%; any other number → false;
     • keypad bots FIXED-GUESS / ECHO-A / ECHO-B → <= chance.
   Plus STRUCTURAL per round: op valid; result in 0..100; operands in range;
   within-100; b >= 1. Plus an op-MIX assertion (both + and − present) and a
   DERIVED-not-stored proof (a bogus authored `answer` is IGNORED).
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const REPO = path.join(__dirname, '..');
const CORE = path.join(REPO, 'mini tools', 'add-sub-100-core.js');
const MANIFEST = path.join(REPO, 'mini tools', 'gus-snack-cart-activities.json');
const CHANCE = 0.45;

function loadCore() { const src = fs.readFileSync(CORE, 'utf8'); const win = {}; new Function('window', src)(win); if (!win.AddSub100Core) throw new Error('core did not attach window.AddSub100Core'); return win.AddSub100Core; }

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
    F(f.opValid, `${r.id}: op "${r.op}" not + or -`);
    F(f.resultInRange, `${r.id}: result ${Core.answerValue(r)} not in 0..100`);
    F(f.operandsInRange, `${r.id}: operands out of 0..100`);
    F(f.withinHundred, `${r.id}: not within 100`);
    F(f.bNonZero, `${r.id}: b is 0 (makes echo-a a free pass)`);
    const a = Core.answerValue(r);
    if (Core.grade(r, a) && !Core.grade(r, a + 1) && !Core.grade(r, a - 1)) oracleHits++;
    const view = Core.childView(r);
    F(JSON.stringify(view).indexOf('answer') < 0, `${r.id}: childView leaks an answer property`);
  });
  F(oracleHits === N, `oracle ${oracleHits}/${N} (typed answer grades true, neighbours false)`);

  // DERIVED-not-stored: a bogus authored `answer` is ignored.
  const poison = Object.assign({}, rounds[0], { answer: 999 });
  F(Core.answerValue(poison) === (poison.op === '+' ? poison.a + poison.b : poison.a - poison.b), 'answer is read from a stored field (must DERIVE a±b)');

  const d = Core.deckFacts(rounds);
  F(d.opMix, 'bank is not a mix of + and − (need both)');
  F(d.fixedGuessBot <= CHANCE, `fixed-guess bot ${pct(d.fixedGuessBot)} > ${pct(CHANCE)}`);
  F(d.echoABot <= CHANCE, `echo-a bot ${pct(d.echoABot)} > ${pct(CHANCE)}`);
  F(d.echoBBot <= CHANCE, `echo-b bot ${pct(d.echoBBot)} > ${pct(CHANCE)}`);

  console.log(`bank: ${N} rounds`);
  console.log(`  ${oracleHits === N ? 'ok  ' : 'FAIL'} oracle: ${oracleHits}/${N}  | op-mix: ${d.opMix ? 'yes' : 'NO'}`);
  console.log(`  fixed-guess ${pct(d.fixedGuessBot)} | echo-a ${pct(d.echoABot)} | echo-b ${pct(d.echoBBot)}  (ceiling ${pct(CHANCE)})`);
  console.log('');
  if (fails.length) { console.error(`VERIFY-ADD-SUB-100 FAILED — ${fails.length} issue(s):`); fails.forEach((m) => console.error('  • ' + m)); process.exit(1); }
  console.log('VERIFY-ADD-SUB-100 PASSED — oracle 100% (neighbours false); answer DERIVED a±b (bogus answer ignored); result 0..100 + within 100 + b>=1; op-mix present; fixed-guess/echo-a/echo-b <= chance; >=8 rounds.');
  process.exit(0);
})();
