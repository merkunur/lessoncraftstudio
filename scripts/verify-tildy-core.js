#!/usr/bin/env node
/* =====================================================================
   verify-tildy-core.js — the MEASURED, critic-armed build-gate for "Tildy's
   Tailor Shop / Ruler Lab" (2.MD.A.1). Drives the REAL core (loaded via
   `new Function`) over the REAL manifest. HALTS the build on any failure. The
   cognition is ALIGNMENT + READ (position the zero at the start, read the far
   numeral). The solver set proves no shortcut survives:

     • IDENTIFY-ALIGN-READ ORACLE → 100% (zero at the start, reads the far end);
     • NUDGE-TO-GREEN-SEARCHER → <= chance (the critic's DEEPEST: NO proximity
       gradient — binary post-commit, position-narration only → cannot tell
       closer from farther without committing → commits its first guess);
     • AUTO-ALIGN-READER → <= chance (reads the Knot-nudged unplaced ruler);
     • OFF-BY-ONE → <= chance (zero one INTO the strip → reads one short);
     • MIS-ALIGN / ANSWER-READER / WRONG-TOOL → <= chance.

   Plus the NO-PROXIMITY-GRADIENT proof: for every align round, a set of WRONG
   placements ALL return the SAME categorical status (no monotone distance
   signal → nothing to hill-climb). Plus STRUCTURAL: no-auto-align; integer
   lattice; the off-by-one reads one-short post-commit; only-commit-graded;
   also_teaches empty; >=7 distinct rounds; >=1 span/broken + >=1 diagnose +
   >=1 select-tool + >=1 off-by-one-reachable align round.
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const REPO = path.join(__dirname, '..');
const MINI = path.join(REPO, 'mini tools');
const CORE = path.join(MINI, 'tildy-core.js');
const MANIFEST = path.join(MINI, 'tildy-activities.json');
const CHANCE = 0.45;

function loadCore() {
  const src = fs.readFileSync(CORE, 'utf8');
  const win = {};
  new Function('window', src)(win);
  if (!win.TildyCore) throw new Error('core did not attach window.TildyCore');
  return win.TildyCore;
}

const fails = [];
const F = (cond, msg) => { if (!cond) fails.push(msg); };
const pct = (x) => (100 * x).toFixed(1) + '%';

(function main() {
  const C = loadCore();
  const manifest = JSON.parse(fs.readFileSync(MANIFEST, 'utf8'));
  const row = Array.isArray(manifest) ? manifest[0] : manifest;
  const rounds = row.params.rounds || [];
  const N = rounds.length || 1;

  F(rounds.length >= 7, `bank has ${rounds.length} rounds (need >=7)`);
  F(!(row.alignment && row.alignment.also_teaches && row.alignment.also_teaches.length), 'alignment has a non-empty also_teaches');

  /* ---- (A) per-round structural facts ---- */
  rounds.forEach((r) => {
    const f = C.facts(r);
    F(f.noProximityGradient, `${r.id}: a proximity gradient is present`);
    F(f.noLiveLamp, `${r.id}: a live lamp is present`);
    F(f.readingRelativeToPlacement, `${r.id}: the reading is not relative to placement`);
    F(f.integerLattice, `${r.id}: not on an integer lattice`);
    F(f.startIdentifiedByChild, `${r.id}: start not child-identified`);
    if (C.ALIGN_COGS[r.cog]) {
      F(f.noAutoAlign, `${r.id}: the ruler starts ALIGNED (initialZero === stripStart — no positioning to do)`);
      F(f.offByOneReachableAndShown, `${r.id}: the off-by-one is not reachable as a clean one-short`);
    }
  });

  /* ---- (B) only-commit-graded + the off-by-one reads one-short ---- */
  rounds.filter((r) => C.ALIGN_COGS[r.cog]).forEach((r) => {
    F(C.evaluate(r, r.stripStart, C.trueLen(r), false).status === 'not-committed', `${r.id}: graded before the commit (no live lamp violated)`);
    F(C.evaluate(r, r.stripStart, C.trueLen(r), true).status === 'correct', `${r.id}: a committed aligned read is not 'correct'`);
    const ob = C.evaluate(r, r.stripStart + 1, C.reading(r, r.stripStart + 1), true);
    F(ob.status === 'zero-not-at-start' && ob.shows === C.trueLen(r) - 1, `${r.id}: the off-by-one (zero at the 1) does not read one short (status=${ob.status} shows=${ob.shows})`);
  });

  /* ---- (C) THE NO-PROXIMITY-GRADIENT PROOF ---- */
  let gradientLeak = false;
  rounds.filter((r) => C.ALIGN_COGS[r.cog]).forEach((r) => {
    const sts = C.alignStatusesForWrongPlacements(r);
    if (!(sts.length && sts.every((s) => s === sts[0]))) gradientLeak = true;   /* every wrong placement → the SAME status → no gradient */
  });
  F(!gradientLeak, 'a placement-proximity gradient leaks — wrong placements return non-uniform statuses (a nudge-to-green could climb it)');

  /* ---- (D) coverage ---- */
  const cogs = new Set(rounds.map((r) => r.cog));
  C.COGS.forEach((c) => F(cogs.has(c), `cog "${c}" missing`));
  F(new Set(rounds.map((r) => r.id)).size >= 7, 'fewer than 7 distinct round ids');

  /* ---- (E) THE SOLVER SET ---- */
  const S = C.SOLVERS;
  const names = ['oracleSolver', 'nudgeSearcherSolver', 'autoAlignSolver', 'offByOneSolver', 'misAlignSolver', 'answerReaderSolver', 'wrongToolSolver'];
  const score = {}; names.forEach((n) => (score[n] = 0));
  rounds.forEach((r) => names.forEach((n) => { if (S[n](r).ok) score[n]++; }));

  F(score.oracleSolver === N, `identify-align-read oracle ${score.oracleSolver}/${N} (must be 100%)`);
  ['nudgeSearcherSolver', 'autoAlignSolver', 'offByOneSolver', 'misAlignSolver', 'answerReaderSolver', 'wrongToolSolver'].forEach((n) => {
    F(score[n] / N <= CHANCE, `${n} scores ${pct(score[n] / N)} over the deck (> ${pct(CHANCE)} ceiling)`);
  });

  /* ---- report ---- */
  console.log(`bank: ${rounds.length} rounds, cogs: ${[...cogs].sort().join('/')}`);
  console.log(`align: ${rounds.filter((r) => C.ALIGN_COGS[r.cog]).length} | span: ${rounds.filter((r) => C.SPAN_COGS[r.cog]).length} | diagnose: ${rounds.filter((r) => C.DIAG_COGS[r.cog]).length} | select-tool: ${rounds.filter((r) => C.TOOL_COGS[r.cog]).length}`);
  console.log('solvers (over the deck):');
  console.log(`  ${score.oracleSolver === N ? 'ok  ' : 'FAIL'} identify-align-read oracle: ${score.oracleSolver}/${N}`);
  ['nudgeSearcherSolver', 'autoAlignSolver', 'offByOneSolver', 'misAlignSolver', 'answerReaderSolver', 'wrongToolSolver'].forEach((n) => {
    console.log(`  ${score[n] / N <= CHANCE ? 'ok  ' : 'FAIL'} ${n}: ${pct(score[n] / N)} (chance ${pct(CHANCE)})`);
  });
  console.log(`  no-proximity-gradient proof (wrong placements all share one status): ${!gradientLeak}`);
  console.log('');
  if (fails.length) {
    console.error(`VERIFY-TILDY FAILED — ${fails.length} issue(s):`);
    fails.forEach((m) => console.error('  • ' + m));
    process.exit(1);
  }
  console.log('VERIFY-TILDY PASSED — the identify-align-read oracle measures 100%; NUDGE-TO-GREEN-SEARCHER / AUTO-ALIGN-READER / OFF-BY-ONE / MIS-ALIGN / ANSWER-READER / WRONG-TOOL all <= chance; the NO-PROXIMITY-GRADIENT proof holds (every wrong placement returns the SAME categorical status → nothing to hill-climb). The ruler starts off-zero (child-positioned); the off-by-one reads one-short post-commit; only-commit-graded; integer lattice; also_teaches empty; >=7 distinct rounds; span/broken + diagnose + select-tool + off-by-one all present.');
  process.exit(0);
})();
