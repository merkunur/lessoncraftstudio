#!/usr/bin/env node
/* =====================================================================
   verify-number-trace-core.js — the MEASURED build-gate for "Digby's Number
   Trace" (K.CC.A.3). Drives the REAL number-trace-core.js over the REAL
   manifest. The child traces each numeral in stroke order.

     • ORACLE (in-order, on-path trace) completes EVERY numeral → 100%;
     • SCRIBBLER (garbage path) never completes (off-path);
     • OUT-OF-ORDER (stroke 2 before 1) is rejected (wrong-order).
   Plus STRUCTURAL: every manifest digit exists with >=1 stroke + a valid start +
   a dense first stroke; all 10 digits 0–9 present.
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const REPO = path.join(__dirname, '..');
const CORE = path.join(REPO, 'mini tools', 'number-trace-core.js');
const MANIFEST = path.join(REPO, 'mini tools', 'digby-number-trace-activities.json');

function loadCore() { const src = fs.readFileSync(CORE, 'utf8'); const win = {}; new Function('window', src)(win); if (!win.NumberTraceCore) throw new Error('core did not attach window.NumberTraceCore'); return win.NumberTraceCore; }

const fails = [];
const F = (cond, msg) => { if (!cond) fails.push(msg); };

(function main() {
  const Core = loadCore();
  const manifest = JSON.parse(fs.readFileSync(MANIFEST, 'utf8'));
  const rounds = manifest[0].params.rounds || [];
  const N = rounds.length || 1;

  F(rounds.length >= 10, `bank has ${rounds.length} rounds (need 10)`);
  const digits = rounds.map((r) => String(r.digit));
  F(new Set(digits).size === digits.length, 'digits not distinct');
  for (let d = 0; d <= 9; d++) F(digits.indexOf(String(d)) >= 0, `digit ${d} missing`);

  let oracleHits = 0, scribbleFails = 0, oooRejected = 0, oooApplicable = 0;
  rounds.forEach((r) => {
    const f = Core.facts(r);
    F(f.hasStrokes, `${r.id} (${r.digit}): no strokes`);
    F(f.validStart, `${r.id} (${r.digit}): invalid start point`);
    F(f.denseFirst, `${r.id} (${r.digit}): first stroke has <2 points`);
    const o = Core.SOLVERS.oracleSolver(r); if (o.complete) oracleHits++;
    const sc = Core.SOLVERS.scribbleSolver(r); if (!sc.complete) scribbleFails++;
    const oo = Core.SOLVERS.outOfOrderSolver(r); if (!oo.skip) { oooApplicable++; if (oo.result === 'wrong-order') oooRejected++; }
  });
  F(oracleHits === N, `oracle completed ${oracleHits}/${N} (must be 100%)`);
  F(scribbleFails === N, `scribbler completed on ${N - scribbleFails} round(s) (must fail ALL)`);
  F(oooRejected === oooApplicable, `out-of-order accepted on ${oooApplicable - oooRejected}/${oooApplicable} multi-stroke round(s)`);

  console.log(`bank: ${N} digits (0–9 present)`);
  console.log(`  ${oracleHits === N ? 'ok  ' : 'FAIL'} oracle: ${oracleHits}/${N}`);
  console.log(`  scribbler fails: ${scribbleFails}/${N} | out-of-order rejected: ${oooRejected}/${oooApplicable}`);
  console.log('');
  if (fails.length) { console.error(`VERIFY-NUMBER-TRACE FAILED — ${fails.length} issue(s):`); fails.forEach((m) => console.error('  • ' + m)); process.exit(1); }
  console.log('VERIFY-NUMBER-TRACE PASSED — oracle traces every numeral in order (100%); scribbler + out-of-order both fail; every glyph valid; 0–9 present.');
  process.exit(0);
})();
