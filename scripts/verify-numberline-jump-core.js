#!/usr/bin/env node
/* =====================================================================
   verify-numberline-jump-core.js — the MEASURED build-gate for "Hopper's
   Number Line" (2.MD.B.6, sums/differences on a number line). Drives the
   REAL numberline-jump-core.js over the REAL manifest. The cognition is
   REPRESENT-THE-HOP (start + direction + size) → the landing is DERIVED.

   Threat model (a correct attempt needs the full model AND the computed
   landing):
     • MODELER ORACLE (correct start/dir/size + computed landing) → 100%;
     • DIAL-GRAB (right landing, but NO model) → 0 (model graded);
     • WRONG-SIZE (decoy size + right landing-of-that-size) → 0 (size graded);
     • WRONG-DIR (flipped direction) → 0;
     • WRONG-START (a different tick) → 0.
   Plus STRUCTURAL: landing DERIVED-not-authored; a decoy size (≠ the real
   size) on every round; start/size/landing all land ON a tick + ON the line
   (0..max); within 100; forward (sum) AND back (difference) present; >=7
   distinct rounds.
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const REPO = path.join(__dirname, '..');
const MINI = path.join(REPO, 'mini tools');
const CORE = path.join(MINI, 'numberline-jump-core.js');
const MANIFEST = path.join(MINI, 'hoppers-number-line-activities.json');

function loadCore() { const src = fs.readFileSync(CORE, 'utf8'); const win = {}; new Function('window', src)(win); if (!win.NumberlineJumpCore) throw new Error('core did not attach window.NumberlineJumpCore'); return win.NumberlineJumpCore; }

const fails = [];
const F = (cond, msg) => { if (!cond) fails.push(msg); };

(function main() {
  const Core = loadCore();
  const manifest = JSON.parse(fs.readFileSync(MANIFEST, 'utf8'));
  const row = Array.isArray(manifest) ? manifest[0] : manifest;
  const rounds = (row && row.params && row.params.rounds) || [];
  const N = rounds.length || 1;

  F(rounds.length >= 7, `bank has ${rounds.length} rounds (need >=7)`);

  /* ---- structural ---- */
  rounds.forEach((r) => {
    const f = Core.facts(r);
    F(f.answerDerivedNotAuthored, `${r.id}: has an authored answer/landing field`);
    F(f.hasDecoy, `${r.id}: no decoy hop-size`);
    F(f.decoyNotSize, `${r.id}: a decoy equals the real size`);
    F(f.onLine, `${r.id}: start/landing off the line (must be 0..max)`);
    F(f.startOnTick, `${r.id}: start ${r.start} is not on a tick (step ${r.step})`);
    F(f.sizeOnTick, `${r.id}: size ${r.size} is not a whole number of ticks (step ${r.step})`);
    F(f.withinHundred, `${r.id}: out of range (within-100)`);
    F(r.dir === 'fwd' || r.dir === 'back', `${r.id}: dir must be fwd|back`);
  });

  const dirs = new Set(rounds.map((r) => r.dir));
  F(dirs.has('fwd'), 'no forward (sum) round');
  F(dirs.has('back'), 'no backward (difference) round');
  F(new Set(rounds.map((r) => r.id)).size >= 7, 'fewer than 7 distinct round ids');

  /* ---- solvers ---- */
  let oracle = 0, dialGrab = 0, wrongSize = 0, wrongDir = 0, wrongStart = 0;
  rounds.forEach((r) => {
    const a = Core.audit(r);
    // oracle
    if (Core.gradeAttempt(r, { start: a.start, dir: a.dir, size: a.size }, a.answer)) oracle++;
    // dial-grab: correct landing, but no model
    if (Core.gradeAttempt(r, { start: null, dir: null, size: null }, a.answer)) dialGrab++;
    // wrong-size: pick a decoy size + the landing THAT size would give (still graded against real size → fail)
    const d = a.decoys[0];
    const decoyLanding = a.start + (a.dir === 'back' ? -1 : 1) * d;
    if (Core.gradeAttempt(r, { start: a.start, dir: a.dir, size: d }, decoyLanding)) wrongSize++;
    // wrong-dir: flip direction + that landing
    const flip = a.dir === 'back' ? 'fwd' : 'back';
    const flipLanding = a.start + (flip === 'back' ? -1 : 1) * a.size;
    if (Core.gradeAttempt(r, { start: a.start, dir: flip, size: a.size }, flipLanding)) wrongDir++;
    // wrong-start: nudge start by one tick + that landing
    const ws = a.start + a.step <= a.max ? a.start + a.step : a.start - a.step;
    const wsLanding = ws + (a.dir === 'back' ? -1 : 1) * a.size;
    if (Core.gradeAttempt(r, { start: ws, dir: a.dir, size: a.size }, wsLanding)) wrongStart++;
  });

  F(oracle === N, `modeler oracle ${oracle}/${N} (must be 100%)`);
  F(dialGrab === 0, `DIAL-GRAB solved ${dialGrab}/${N} (landing without a model must fail)`);
  F(wrongSize === 0, `WRONG-SIZE (decoy) solved ${wrongSize}/${N} (size must be graded)`);
  F(wrongDir === 0, `WRONG-DIR solved ${wrongDir}/${N} (direction must be graded)`);
  F(wrongStart === 0, `WRONG-START solved ${wrongStart}/${N} (start must be graded)`);

  console.log(`bank: ${rounds.length} rounds | dirs: ${[...dirs].join('/')} | max range: ${Math.min.apply(null, rounds.map(r => r.max))}..${Math.max.apply(null, rounds.map(r => r.max))}`);
  console.log(`  ${oracle === N ? 'ok  ' : 'FAIL'} modeler oracle: ${oracle}/${N}`);
  ['dialGrab', 'wrongSize', 'wrongDir', 'wrongStart'].forEach((k) => { const v = { dialGrab, wrongSize, wrongDir, wrongStart }[k]; console.log(`  ${v === 0 ? 'ok  ' : 'FAIL'} ${k}: ${v}/${N} (must be 0)`); });
  console.log('');
  if (fails.length) { console.error(`VERIFY-NUMBERLINE-JUMP FAILED — ${fails.length} issue(s):`); fails.forEach((m) => console.error('  • ' + m)); process.exit(1); }
  console.log('VERIFY-NUMBERLINE-JUMP PASSED — the hop-modeler oracle solves 100%; DIAL-GRAB / WRONG-SIZE / WRONG-DIR / WRONG-START all 0 (the full model — start + direction + size — is graded, and the landing is computed not read). Landing derived-not-authored; decoy size on every round; start/size/landing on-tick + on-line; within-100; forward + back present; >=7 distinct rounds.');
  process.exit(0);
})();
