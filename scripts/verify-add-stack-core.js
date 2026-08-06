#!/usr/bin/env node
/* =====================================================================
   verify-add-stack-core.js — the MEASURED build-gate for "Tally the Squirrel"
   (2.NBT.B.6, add up to four two-digit numbers). Drives the REAL add-stack-
   core.js over the REAL manifest. The child types the total on the keypad.

     • ORACLE (sum of addends) → 100%;
     • COPY-THE-LARGEST-ADDEND bot → 0% (no total equals its biggest part);
     • COPY-THE-FIRST-ADDEND bot → 0%;
     • FIXED-GUESS bot (always the same number) → <= chance (totals spread).
   Plus STRUCTURAL: answer DERIVED-not-stored; every addend two-digit (10–99);
   2–4 addends per round; >=1 round with 4 addends AND >=1 with 3; totals within
   a Grade-2 bound (≤140); >=9 rounds.
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const REPO = path.join(__dirname, '..');
const CORE = path.join(REPO, 'mini tools', 'add-stack-core.js');
const MANIFEST = path.join(REPO, 'mini tools', 'tally-squirrel-activities.json');
const CHANCE = 0.45;

function loadCore() { const src = fs.readFileSync(CORE, 'utf8'); const win = {}; new Function('window', src)(win); if (!win.AddStackCore) throw new Error('core did not attach window.AddStackCore'); return win.AddStackCore; }

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
    F(f.countInRange, `round ${i}: ${(r.addends || []).length} addends (need 2–4)`);
    F(f.allTwoDigit, `round ${i}: an addend is not two-digit (${(r.addends || []).join('/')})`);
    F(f.totalInBound, `round ${i}: total ${Core.oracle(r)} > 140`);
    F(f.derivedNotStored, `round ${i}: has a stored answer`);
    F(JSON.stringify(Core.childView(r)).indexOf('total') < 0, `round ${i}: childView leaks total`);
  });

  let oracle = 0;
  const ansCount = {};
  rounds.forEach((r) => { if (Core.isAnswer(r, Core.oracle(r))) oracle++; const t = Core.oracle(r); ansCount[t] = (ansCount[t] || 0) + 1; });
  const maxFixed = Math.max.apply(null, Object.keys(ansCount).map((k) => ansCount[k]));
  const df = Core.deckFacts(rounds);

  F(oracle === N, `oracle ${oracle}/${N} (must be 100%)`);
  F(df.largestAddendHits === 0, `copy-largest-addend bot got ${df.largestAddendHits}/${N} (must be 0)`);
  F(df.firstAddendHits === 0, `copy-first-addend bot got ${df.firstAddendHits}/${N} (must be 0)`);
  F(maxFixed / N <= CHANCE, `fixed-guess bot ${pct(maxFixed / N)} > ${pct(CHANCE)} (totals not spread)`);
  F((df.addendCounts[4] || 0) >= 1, `no round with 4 addends (need >=1 to instantiate "up to four")`);
  F((df.addendCounts[3] || 0) >= 1, `no round with 3 addends (need >=1)`);

  console.log(`bank: ${N} rounds | addend-counts: ${JSON.stringify(df.addendCounts)} | totals: ${rounds.map(Core.oracle).join(',')}`);
  console.log(`  ${oracle === N ? 'ok  ' : 'FAIL'} oracle: ${oracle}/${N}`);
  console.log(`  largest-addend ${pct(df.largestAddendHits / N)} | first-addend ${pct(df.firstAddendHits / N)} | fixed-guess ${pct(maxFixed / N)}  (ceiling ${pct(CHANCE)})`);
  console.log('');
  if (fails.length) { console.error(`VERIFY-ADD-STACK FAILED — ${fails.length} issue(s):`); fails.forEach((m) => console.error('  • ' + m)); process.exit(1); }
  console.log('VERIFY-ADD-STACK PASSED — oracle 100%; copy-largest/first-addend 0%; fixed-guess <= chance; every addend two-digit; ≥1 four-addend + ≥1 three-addend; totals ≤140; answer DERIVED from the sum; >=9 rounds.');
  process.exit(0);
})();
