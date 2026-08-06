#!/usr/bin/env node
/* =====================================================================
   verify-jump-tens-core.js — the MEASURED build-gate for "Skip the Kangaroo"
   (2.NBT.B.8, mentally add/subtract 10 or 100). Drives the REAL jump-tens-
   core.js over the REAL manifest. The child types the result on the keypad.

     • ORACLE (start + delta) → 100%;
     • COPY-THE-START bot (types `start`) → 0% (every delta ≠ 0);
     • FIXED-GUESS bot (always the same number) → <= chance (results spread);
     • the PLACE-VALUE-JUMP invariant: result's ONES digit === start's ONES
       digit for EVERY round (a tens/hundreds hop never touches the ones).
   Plus STRUCTURAL: answer DERIVED-not-stored; every delta ∈ {±10,±100};
   start & result both in [100,900]; all four deltas present; >=9 rounds.
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const REPO = path.join(__dirname, '..');
const CORE = path.join(REPO, 'mini tools', 'jump-tens-core.js');
const MANIFEST = path.join(REPO, 'mini tools', 'comet-kangaroo-activities.json');
const CHANCE = 0.45;

function loadCore() { const src = fs.readFileSync(CORE, 'utf8'); const win = {}; new Function('window', src)(win); if (!win.JumpTensCore) throw new Error('core did not attach window.JumpTensCore'); return win.JumpTensCore; }

const fails = [];
const F = (cond, msg) => { if (!cond) fails.push(msg); };
const pct = (x) => (100 * x).toFixed(1) + '%';

(function main() {
  const Core = loadCore();
  const manifest = JSON.parse(fs.readFileSync(MANIFEST, 'utf8'));
  const rounds = manifest[0].params.rounds || [];
  const N = rounds.length || 1;

  F(rounds.length >= 9, `bank has ${rounds.length} rounds (need >=9)`);

  rounds.forEach((r, i) => {
    const f = Core.facts(r);
    F(f.validDelta, `round ${i}: delta ${r.delta} not in {±10,±100}`);
    F(f.inRange, `round ${i}: start ${r.start} / result ${Core.oracle(r)} out of [100,900]`);
    F(f.onesUnchanged, `round ${i}: ones digit changed (${r.start} ${r.delta>0?'+':''}${r.delta} = ${Core.oracle(r)}) — not a place-value hop`);
    F(f.derivedNotStored, `round ${i}: has a stored answer`);
    F(JSON.stringify(Core.childView(r)).indexOf('result') < 0, `round ${i}: childView leaks result`);
  });

  let oracle = 0, copyStart = 0;
  const ansCount = {};
  rounds.forEach((r) => {
    if (Core.isAnswer(r, Core.oracle(r))) oracle++;
    if (Core.isAnswer(r, r.start)) copyStart++;
    const a = Core.oracle(r); ansCount[a] = (ansCount[a] || 0) + 1;
  });
  const maxFixed = Math.max.apply(null, Object.keys(ansCount).map((k) => ansCount[k]));

  F(oracle === N, `oracle ${oracle}/${N} (must be 100%)`);
  F(copyStart === 0, `copy-the-start bot got ${copyStart}/${N} (must be 0 — delta must never be 0)`);
  F(maxFixed / N <= CHANCE, `fixed-guess bot ${pct(maxFixed / N)} > ${pct(CHANCE)} (results not spread)`);

  const deltas = Core.deckFacts(rounds).distinctDeltas.sort((a, b) => a - b);
  [10, -10, 100, -100].forEach((d) => F(deltas.indexOf(d) >= 0, `missing delta ${d}`));

  console.log(`bank: ${N} rounds | deltas: ${deltas.join('/')} | results: ${rounds.map(Core.oracle).join(',')}`);
  console.log(`  ${oracle === N ? 'ok  ' : 'FAIL'} oracle: ${oracle}/${N}`);
  console.log(`  copy-start ${pct(copyStart / N)} | fixed-guess ${pct(maxFixed / N)}  (ceiling ${pct(CHANCE)})`);
  console.log('');
  if (fails.length) { console.error(`VERIFY-JUMP-TENS FAILED — ${fails.length} issue(s):`); fails.forEach((m) => console.error('  • ' + m)); process.exit(1); }
  console.log('VERIFY-JUMP-TENS PASSED — oracle 100%; copy-start 0%; fixed-guess <= chance; the ones digit never changes (place-value hop); answer DERIVED from start+delta; all four deltas present; start & result in [100,900]; >=9 rounds.');
  process.exit(0);
})();
