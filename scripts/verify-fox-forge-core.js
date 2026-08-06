#!/usr/bin/env node
/* =====================================================================
   verify-fox-forge-core.js — the MEASURED, critic-armed build-gate for
   "Fox & Forge / Pip's Chocolate Forge" (3.NF.A.1). Drives the REAL core
   (loaded via `new Function`) over the REAL manifest. HALTS the build on any
   failure. The cognition is CONSTRUCT-AN-AMOUNT: recognize 1/b by SIZE (the
   molds are UNLABELED) + iterate it a times. The solver set proves no shortcut
   survives:

     • BUILD ORACLE → 100% (picks the size-correct mold b===round.b, forges a
       pieces, commits → correct; name-unit → 1/b);
     • MOLD-MATCHER → <= chance (no digit on a mold → it lands on a WRONG
       forgeable mold → the unit-size gate rejects);
     • COMMIT-PROBER → <= chance (the hand-over is SPENT → one shot at count 1 →
       only the a=1 round can pass);
     • COUNT-THE-NUMERATOR → <= chance (forges the right COUNT a of the WRONG
       size → wrong-size-piece);
     • GLOW-CHASER → <= chance (no mid-build signal → forges till the bar is
       FULL = b pieces → over);
     • OVERFILL / MIXED-SIZE → <= chance (b pieces / two molds → over/mixed);
     • UNEQUAL-PARTS → fails 100% of equal-parts rounds (the forge refuses the
       cracked mold).

   Plus STRUCTURAL: molds unlabeled; the unit size is wholeLen/b (constant); no
   mid-build signal (a full-but-uncommitted build is NOT correct); commit-is-
   spent; >=1 wrong-forgeable mold per build round; >=1 equal-parts (unequal
   mold) + >=1 two-whole + >=1 magnitude round; also_teaches empty; b in
   {2,3,4,6,8}; a<=b; >=7 structurally-distinct cogs; >=7 distinct rounds.
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const REPO = path.join(__dirname, '..');
const MINI = path.join(REPO, 'mini tools');
const CORE = path.join(MINI, 'fox-forge-core.js');
const MANIFEST = path.join(MINI, 'fox-forge-activities.json');
const CHANCE = 0.45;

function loadCore() {
  const src = fs.readFileSync(CORE, 'utf8');
  const win = {};
  new Function('window', src)(win);
  if (!win.FoxForgeCore) throw new Error('core did not attach window.FoxForgeCore');
  return win.FoxForgeCore;
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
  F(!(row.alignment && row.alignment.also_teaches && row.alignment.also_teaches.length), 'alignment has a non-empty also_teaches (3.NF.A.1 teaches NOTHING else)');

  /* ---- (A) per-round structural facts ---- */
  rounds.forEach((r) => {
    const f = C.facts(r);
    F(f.moldsUnlabeled, `${r.id}: molds are not unlabeled`);
    F(f.unitSizeIsConstant, `${r.id}: the unit size is not wholeLen/b`);
    F(f.noMidBuildSignal, `${r.id}: a mid-build signal is present`);
    F(f.commitIsSpent, `${r.id}: the commit is not spent`);
    F(f.reshuffleOnWrong, `${r.id}: no reshuffle-on-wrong`);
    F(f.denomInRange, `${r.id}: denominator b=${r.b} not in {2,3,4,6,8}`);
    F(f.properFraction, `${r.id}: a=${r.a} not in 1..b (a<=b required)`);
    if (C.BUILD_COGS[r.cog]) F(f.wrongDenominatorReachable, `${r.id}: a build round without a reachable WRONG mold (mold-match would be free)`);
  });

  /* ---- (B) >=7 cogs; the named-misconception rounds present ---- */
  const cogs = new Set(rounds.map((r) => r.cog));
  F(cogs.size >= 7, `only ${cogs.size} distinct cogs (need >=7)`);
  C.COGS.forEach((c) => F(cogs.has(c), `cog "${c}" missing`));
  F(new Set(rounds.map((r) => r.id)).size >= 7, 'fewer than 7 distinct round ids');
  F(rounds.some((r) => r.cog === 'equal-parts' && C.hasUnequalMold(r)), 'no equal-parts round with an UNEQUAL (cracked) mold');
  F(rounds.some((r) => C.facts(r).twoWholes), 'no the-whole round with a second reference bar');
  F(rounds.some((r) => C.facts(r).wholeRandomized), 'no magnitude round (whole randomized)');

  /* ---- (C) no-mid-build-signal: a full-but-uncommitted build is NOT correct ---- */
  rounds.filter((r) => C.BUILD_COGS[r.cog]).forEach((r) => {
    const full = []; for (let i = 0; i < r.a; i++) full.push({ b: r.b });
    F(C.evaluate(r, full, false).status === 'placed-ok-awaiting-commit', `${r.id}: a full build is graded BEFORE the commit (mid-build signal leak)`);
    F(C.evaluate(r, full, true).status === 'correct', `${r.id}: a committed correct build is not 'correct'`);
  });

  /* ---- (D) THE SOLVER SET (scored over the SCORED rounds only) ---- */
  const scored = rounds.filter((r) => C.isScored(r.cog));
  const SN = scored.length || 1;

  function grade(r, out) {
    if (C.BUILD_COGS[r.cog]) return C.gradeBuild(r, out.placed || []);
    if (C.CHOOSE_COGS[r.cog]) return C.gradeChoose(r, out.choice);
    return false;
  }
  const piecesOf = (b, n) => { const a = []; for (let i = 0; i < n; i++) a.push({ b }); return a; };

  function oracle(a, r) {
    if (C.CHOOSE_COGS[r.cog]) return { choice: a.correctChoice };
    return { placed: piecesOf(r.b, r.a) };
  }
  /* mold-matcher: would digit-match, but the molds carry no digit → it lands on
     a WRONG forgeable mold (the worst-case representative of "guessing"). */
  function moldMatcher(a, r) {
    if (C.CHOOSE_COGS[r.cog]) return { choice: (r.options || [])[0] };   /* options[0] is authored != correct */
    const wrong = a.forgeableWrongMolds[0];
    return { placed: piecesOf(wrong != null ? wrong : r.b, r.a) };
  }
  /* commit-prober: hands over after ONE piece (the spent commit = one shot). */
  function commitProber(a, r) {
    if (C.CHOOSE_COGS[r.cog]) return { choice: (r.options || [])[0] };
    return { placed: piecesOf(r.b, 1) };
  }
  /* count-the-numerator: forges the right COUNT a but of a WRONG size. */
  function countNumerator(a, r) {
    if (C.CHOOSE_COGS[r.cog]) return { choice: [1, (a.forgeableWrongMolds[0] || r.b)] };   /* right numerator, wrong denom */
    const wrong = a.forgeableWrongMolds[0];
    return { placed: piecesOf(wrong != null ? wrong : r.b, r.a) };
  }
  /* glow-chaser: no per-step signal → forges till the bar is FULL (b pieces). */
  function glowChaser(a, r) {
    if (C.CHOOSE_COGS[r.cog]) return { choice: (r.options || [])[0] };
    return { placed: piecesOf(r.b, r.b) };
  }
  /* overfill: always forges b pieces (the whole bar). */
  function overfill(a, r) {
    if (C.CHOOSE_COGS[r.cog]) return { choice: (r.options || [])[0] };
    return { placed: piecesOf(r.b, r.b) };
  }
  /* mixed-size: forges a-1 of the right size + 1 of a wrong size. */
  function mixedSize(a, r) {
    if (C.CHOOSE_COGS[r.cog]) return { choice: (r.options || [])[0] };
    const wrong = a.forgeableWrongMolds[0];
    if (wrong == null || r.a < 2) return { placed: piecesOf(r.b, r.b) };   /* fall back to overfill when no mix possible */
    return { placed: piecesOf(r.b, r.a - 1).concat([{ b: wrong }]) };
  }

  const solvers = { oracle, moldMatcher, commitProber, countNumerator, glowChaser, overfill, mixedSize };
  const score = {}; Object.keys(solvers).forEach((k) => (score[k] = 0));
  scored.forEach((r) => {
    const a = C.audit(r);
    Object.keys(solvers).forEach((name) => { if (grade(r, solvers[name](a, r))) score[name]++; });
  });

  F(score.oracle === SN, `build oracle ${score.oracle}/${SN} (must be 100%)`);
  ['moldMatcher', 'commitProber', 'countNumerator', 'glowChaser', 'overfill', 'mixedSize'].forEach((name) => {
    F(score[name] / SN <= CHANCE, `${name} solver scores ${pct(score[name] / SN)} over the scored deck (> ${pct(CHANCE)} ceiling)`);
  });

  /* ---- (E) UNEQUAL-PARTS targeted: the forge refuses the cracked mold ---- */
  const eqRounds = rounds.filter((r) => r.cog === 'equal-parts');
  let unequalForgedSomething = false;
  eqRounds.forEach((r) => {
    const a = C.audit(r);
    const unequal = (a.molds.find((m) => m.b === 'unequal') || {}).b;
    F(unequal === 'unequal', `${r.id}: equal-parts round has no 'unequal' mold to refuse`);
    F(!C.canForge(unequal), `${r.id}: the unequal mold is forgeable (the forge must refuse it)`);
    /* a child who forges from the unequal mold reaches an 'unequal' piece → not correct */
    if (C.gradeBuild(r, [{ b: 'unequal' }])) unequalForgedSomething = true;
  });
  F(!unequalForgedSomething, 'an unequal-mold build was graded correct (the forge must refuse the cracked mold)');

  /* ---- report ---- */
  console.log(`bank: ${rounds.length} rounds (${SN} scored), cogs: ${[...cogs].sort().join('/')}`);
  console.log(`equal-parts: ${eqRounds.length} | two-whole: ${rounds.filter((r) => C.facts(r).twoWholes).length} | magnitude: ${rounds.filter((r) => C.facts(r).wholeRandomized).length} | denominators: ${[...new Set(rounds.map((r) => r.b))].sort((x, y) => x - y).join(',')}`);
  console.log('solvers (over the scored deck):');
  console.log(`  ${score.oracle === SN ? 'ok  ' : 'FAIL'} build oracle: ${score.oracle}/${SN}`);
  ['moldMatcher', 'commitProber', 'countNumerator', 'glowChaser', 'overfill', 'mixedSize'].forEach((name) => {
    console.log(`  ${score[name] / SN <= CHANCE ? 'ok  ' : 'FAIL'} ${name}: ${pct(score[name] / SN)} (chance ${pct(CHANCE)})`);
  });
  console.log(`  unequal-parts forges nothing valid: ${!unequalForgedSomething}`);
  console.log('');
  if (fails.length) {
    console.error(`VERIFY-FOX-FORGE FAILED — ${fails.length} issue(s):`);
    fails.forEach((m) => console.error('  • ' + m));
    process.exit(1);
  }
  console.log('VERIFY-FOX-FORGE PASSED — the build oracle recognizes 1/b by SIZE + iterates it a times (100%); MOLD-MATCHER (no digit → wrong forgeable mold) / COMMIT-PROBER (spent commit, one shot) / COUNT-THE-NUMERATOR (right count, wrong size) / GLOW-CHASER (no mid-build signal → fills the bar) / OVERFILL / MIXED-SIZE all <= chance; UNEQUAL-PARTS forges nothing valid (the forge refuses the cracked mold). Molds unlabeled; the unit size is wholeLen/b (a constant); a full-but-uncommitted build is NOT correct; commit-is-spent; >=1 wrong mold per build round; >=1 equal-parts + >=1 two-whole + >=1 magnitude; also_teaches empty; b in {2,3,4,6,8}; a<=b; >=7 distinct cogs + rounds.');
  process.exit(0);
})();
