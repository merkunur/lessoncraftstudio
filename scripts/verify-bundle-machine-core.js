#!/usr/bin/env node
/* =====================================================================
   verify-bundle-machine-core.js — build-time MEASURED gate for the CHILD-
   authored-bundle cognition behind "Bundle Bot" (CCSS 1.NBT.B.2.a). Loads the
   REAL mini tools/bundle-machine-core.js + the manifest rounds and proves
   (exit 0 = pass; 1 = any failure) the converged + critic-fixed solver set:

     #1 NO-AUTO-BUNDLE (STRUCTURAL) — no `if(ones===10)bundle()`; feeding ten
        ones with NO lever-pull leaves ten loose + the tens column EMPTY
        (`autoBundlePathExists===false`).
     #2 SUB-TEN-REFUSE — pull at 8 → state unchanged, no rod.
     #3 IMPOSTOR-REFUSE (the discriminating assertion) — on an impostor round a
        fullness-reflex pull on the seeded 9 REFUSES; a counting solver feeds one
        then bundles. `scatterNotCleanTenFrame===true`.
     #4 TAP-ONLY FAILS — feeds ones, never authors a bundle → can't reach a
        ≥2-tens canonical solve.
     #5 ROTE FAILS — pulls at sub-ten → refused → never bundles.
     #6 CANONICAL-SOLVE — value-correct-but-non-canonical (one ten still loose)
        is NOT solved (bundling load-bearing).
     #7 COUNT-AND-AUTHOR PASSES 100% — across the 6 cogs (build/unbundle/
        impostor/decade/read-state/overfill).
     #8 ≥2-TENS FLOOR — every target ≥20; a teen FAILS.
     #9 6 DISTINCT COGS by `cog` with a BLOCKLIST; non-monotonic within 20-49.
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const REPO = path.join(__dirname, '..');
const coreSrc = fs.readFileSync(path.join(REPO, 'mini tools', 'bundle-machine-core.js'), 'utf8');
const win = {};
new Function('window', coreSrc)(win);
const Core = win.BundleMachineCore;
if (!Core) { console.error('FAIL: bundle-machine-core.js did not define window.BundleMachineCore'); process.exit(1); }
const S = Core.SOLVERS;

const manifest = JSON.parse(fs.readFileSync(path.join(REPO, 'mini tools', 'bundle-bot-activities.json'), 'utf8'))[0];
const rounds = manifest.params.rounds;

const failures = [];
const check = (cond, msg) => { if (!cond) failures.push(msg); };
const COGS = ['build', 'unbundle', 'impostor', 'decade', 'read-state', 'overfill'];

/* #1 static: no auto-bundle code path on the count */
check(!/if\s*\(\s*(s|state)\.ones\s*===?\s*10\s*\)[^\n]*bundle/i.test(coreSrc), 'core has an `if(ones===10)bundle()` auto-path');
check(!/source\s*:\s*['"]auto['"]/.test(coreSrc), 'core can log a bundle with source:"auto"');

rounds.forEach((r) => {
  const L = `round[${r.id}/${r.cog}]`;
  const f = Core.facts(r, Core.newState(r));

  /* #1 no-auto-bundle behavioral */
  check(f.autoBundlePathExists === false, `${L}: autoBundlePathExists !== false`);
  const nab = S.noAutoBundleSolver(r);
  check(nab.ones >= 10 && nab.addedRod === false, `${L}: feeding ten ones with no pull AUTO-BUNDLED (addedRod=${nab.addedRod})`);

  /* #2 sub-ten refuse */
  check(f.bundleRefusedBelowTen === true, `${L}: bundleRefusedBelowTen !== true`);
  const st = S.subTenRefuseSolver(r);
  check(st.result === 'refused' && st.addedRod === false, `${L}: a pull at 8 did not refuse (result=${st.result}, addedRod=${st.addedRod})`);

  /* #4 tap-only fails */
  check(S.tapOnlySolver(r).solved === false, `${L}: a TAP-ONLY solver (never bundles) reached a solve`);

  /* #5 rote fails */
  check(S.roteSolver(r).result === 'refused', `${L}: a ROTE (pull-at-any-fill) solver was not refused at sub-ten`);

  /* #3 scatter not a clean ten-frame */
  check(f.scatterNotCleanTenFrame === true, `${L}: scatterNotCleanTenFrame !== true`);

  /* #7 count-and-author solves */
  check(S.countAndAuthorSolver(r).solved === true, `${L}: the COUNT-AND-AUTHOR solver did not solve`);

  /* #8 ≥2-tens floor */
  check((r.target | 0) >= 20 && (r.target | 0) <= 49, `${L}: target ${r.target} out of 20..49 (≥2-tens floor)`);
  check(f.tensFloor >= 2, `${L}: tensFloor ${f.tensFloor} < 2`);

  /* #9 cog in the allowed set */
  check(COGS.indexOf(r.cog) >= 0, `${L}: cog "${r.cog}" not in {${COGS.join(',')}} (BLOCKLIST: not-yet-inhibition/mixed-start/over-build-stop)`);
});

/* #3 impostor-refuse on every impostor round */
rounds.filter((r) => r.cog === 'impostor').forEach((r) => {
  const ir = S.impostorRefuseSolver(r);
  check(ir.seeded < 10 && ir.reflexResult === 'refused' && ir.bundledAfterCount === true, `round[${r.id}]: impostor flow wrong (seeded=${ir.seeded}, reflex=${ir.reflexResult}, bundledAfterCount=${ir.bundledAfterCount})`);
});

/* #6 canonical-solve on every build round */
rounds.filter((r) => r.cog === 'build').forEach((r) => {
  const cs = S.canonicalSolveSolver(r);
  check(cs.valueCorrect === true && cs.solvedNonCanonical === false, `round[${r.id}]: a value-correct NON-canonical state (one ten still loose) was accepted as solved`);
});

/* #9 6 cogs, ≥7 rounds, decade present, non-monotonic, BLOCKLIST */
const cogsSeen = new Set(rounds.map((r) => r.cog));
COGS.forEach((c) => check(cogsSeen.has(c), `missing cog "${c}"`));
check(cogsSeen.size === 6, `expected exactly 6 cogs, got ${cogsSeen.size} (${[...cogsSeen].join(',')})`);
check(rounds.length >= 7, `only ${rounds.length} rounds (<7)`);
check(new Set(rounds.map((r) => r.id)).size === rounds.length, 'duplicate round ids');
check(rounds.some((r) => r.cog === 'decade'), 'no decade round');
check(!rounds.some((r) => /not-yet|mixed-start|over-build|regroup|one-more-ten/.test(r.cog)), 'a padding/1.NBT.C-drift cog is present');
const ts = rounds.map((r) => r.target | 0);
let asc = true; for (let i = 1; i < ts.length; i++) if (ts[i] <= ts[i - 1]) asc = false;
check(!asc, `targets strictly ascending ${JSON.stringify(ts)} (anti-ordering)`);

if (failures.length) {
  console.error(`FAIL — ${failures.length} bundle-machine violation(s):`);
  failures.forEach((f) => console.error('  • ' + f));
  process.exit(1);
}
console.log(`PASS — ${rounds.length} rounds / ${cogsSeen.size} cogs: ` +
  `NO auto-bundle (feeding ten with no pull leaves the tens column empty; no auto-path); sub-ten + rote pulls REFUSED; ` +
  `impostor-refuse (a looks-~10-but-9 fullness-reflex pull refuses, a counted ten bundles); tap-only fails; ` +
  `canonical-solve required (a value-correct non-canonical state is not solved); COUNT-AND-AUTHOR solves 100% across the 6 cogs; ` +
  `≥2-tens floor (every target 20-49), decade-present, non-monotonic.`);
process.exit(0);
