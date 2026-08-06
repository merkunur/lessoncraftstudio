#!/usr/bin/env node
/* =====================================================================
   verify-alphabet-trace-core.js — the MEASURED build-gate for "Penny's Alphabet
   Trace" (L.K.1.a). Drives the REAL alphabet-trace-core.js over the REAL
   manifest. The child traces each letter in stroke order.

     • ORACLE (in-order, on-path trace) completes EVERY glyph → 100%;
     • SCRIBBLER (garbage path) never completes (off-path);
     • OUT-OF-ORDER (stroke 2 before 1) is rejected (wrong-order).
   Plus STRUCTURAL: every manifest glyph exists with >=1 stroke + a valid start +
   a dense first stroke; both cases (upper+lower) present; >=26 distinct letters.
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const REPO = path.join(__dirname, '..');
const CORE = path.join(REPO, 'mini tools', 'alphabet-trace-core.js');
const MANIFEST = path.join(REPO, 'mini tools', 'penny-alphabet-trace-activities.json');

function loadCore() { const src = fs.readFileSync(CORE, 'utf8'); const win = {}; new Function('window', src)(win); if (!win.AlphabetTraceCore) throw new Error('core did not attach window.AlphabetTraceCore'); return win.AlphabetTraceCore; }

const fails = [];
const F = (cond, msg) => { if (!cond) fails.push(msg); };

(function main() {
  const Core = loadCore();
  const manifest = JSON.parse(fs.readFileSync(MANIFEST, 'utf8'));
  const rounds = manifest[0].params.rounds || [];
  const N = rounds.length || 1;

  F(rounds.length >= 26, `bank has ${rounds.length} rounds (need >=26)`);
  const letters = rounds.map((r) => r.letter);
  F(new Set(letters).size === letters.length, 'letters not distinct');
  F(letters.some((l) => l === l.toUpperCase() && /[A-Z]/.test(l)), 'no uppercase letters');
  F(letters.some((l) => l === l.toLowerCase() && /[a-z]/.test(l)), 'no lowercase letters');

  let oracleHits = 0, scribbleFails = 0, oooRejected = 0, oooApplicable = 0;
  rounds.forEach((r) => {
    const f = Core.facts(r);
    F(f.hasStrokes, `${r.id} (${r.letter}): no strokes`);
    F(f.validStart, `${r.id} (${r.letter}): invalid start point`);
    F(f.denseFirst, `${r.id} (${r.letter}): first stroke has <2 points`);
    const o = Core.SOLVERS.oracleSolver(r); if (o.complete) oracleHits++;
    const sc = Core.SOLVERS.scribbleSolver(r); if (!sc.complete) scribbleFails++;
    const oo = Core.SOLVERS.outOfOrderSolver(r); if (!oo.skip) { oooApplicable++; if (oo.result === 'wrong-order') oooRejected++; }
  });
  F(oracleHits === N, `oracle completed ${oracleHits}/${N} (must be 100%)`);
  F(scribbleFails === N, `scribbler completed on ${N - scribbleFails} round(s) (must fail ALL)`);
  F(oooRejected === oooApplicable, `out-of-order accepted on ${oooApplicable - oooRejected}/${oooApplicable} multi-stroke round(s)`);

  console.log(`bank: ${N} letters (${new Set(letters).size} distinct; upper+lower present)`);
  console.log(`  ${oracleHits === N ? 'ok  ' : 'FAIL'} oracle: ${oracleHits}/${N}`);
  console.log(`  scribbler fails: ${scribbleFails}/${N} | out-of-order rejected: ${oooRejected}/${oooApplicable}`);
  console.log('');
  if (fails.length) { console.error(`VERIFY-ALPHABET-TRACE FAILED — ${fails.length} issue(s):`); fails.forEach((m) => console.error('  • ' + m)); process.exit(1); }
  console.log('VERIFY-ALPHABET-TRACE PASSED — oracle traces every glyph in order (100%); scribbler + out-of-order both fail; every glyph valid; upper+lower present; >=26 letters.');
  process.exit(0);
})();
