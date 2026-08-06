#!/usr/bin/env node
/* =====================================================================
   verify-make-total-core.js — build-time MEASURED gate for the decompose-to-a-
   target cognition behind "Clunk's Lost Lunch" (CCSS K.OA.A.3 + 1.OA.D.8). Loads
   the REAL mini tools/make-total-core.js + the manifest rounds and proves
   (exit 0 = pass; 1 = any failure):

     #1 PLAN-THEN-FEED PASSES 100% — assemble a declared good combination → feed
        → seals EVERY round (all 7 schemas + two-ways' 2 multiset-distinct ways +
        a within-20).
     #2 NO LIVE AGGREGATE — `hasLiveAggregate===false`; `snapshot()` exposes NO
        sum/total/aggregate field; the core never STORES the sum on state (the
        sum is a transient local inside commit). The climb cheat is impossible.
     #3 COMMIT-SPAM FAILS — repeated wrong commits empty the tray → never seals,
        never accumulates.
     #4 BRUTE-FORCE — no single wall snack ≥ T (`noSingleItemGEtarget`); a single
        max snack on a free round does NOT seal (no 1-tap solve).
     #5 DIRECTIONAL-ABSENCE — an OVER tray and an UNDER tray wrong commit are the
        same observable state (`wrongStateDirectional===false`).
     #6 MULTISET-REPEAT-REJECTION (two-ways) — feed a way → 'next-way'; the SAME
        multiset → 'repeat' (rejected); a distinct multiset → 'sealed'.
     #7 EXACT-ONLY + ≥2 NON-SUBSET DECOMPOSITIONS PER GENERATIVE TARGET — each
        declared free solution independently seals; the two two-ways solutions are
        multiset-distinct; ≥2 declared for generative rounds.
     #8 ≥7 distinct schemas (the 7 present, BLOCKLIST), distinct ids, non-
        monotonic targets, a within-20 round, within-10 base.
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const REPO = path.join(__dirname, '..');
const coreSrc = fs.readFileSync(path.join(REPO, 'mini tools', 'make-total-core.js'), 'utf8');
const win = {};
new Function('window', coreSrc)(win);
const Core = win.MakeTotalCore;
if (!Core) { console.error('FAIL: make-total-core.js did not define window.MakeTotalCore'); process.exit(1); }
const S = Core.SOLVERS;

const manifest = JSON.parse(fs.readFileSync(path.join(REPO, 'mini tools', 'clunks-lost-lunch-activities.json'), 'utf8'))[0];
const rounds = manifest.params.rounds;

const failures = [];
const check = (cond, msg) => { if (!cond) failures.push(msg); };
const isGen = (r) => r.schema === 'free' || r.schema === 'two-ways';

/* #2 no aggregate stored on state (static) */
check(!/\b(s|state)\.(sum|total|aggregate)\s*=/.test(coreSrc), 'core stores a sum/total/aggregate on state (a live-aggregate climb surface)');

rounds.forEach((r) => {
  const L = `round[${r.id}/${r.schema}]`;

  /* #1 plan-then-feed seals */
  check(S.planThenFeedSolver(r).sealed === true, `${L}: plan-then-feed did NOT seal`);

  /* #2 facts + snapshot carry no aggregate */
  const s0 = Core.newState(r), f0 = Core.facts(r, s0), snap = Core.snapshot(r, s0);
  check(f0.hasLiveAggregate === false, `${L}: hasLiveAggregate !== false`);
  check(!('sum' in snap) && !('total' in snap) && !('aggregate' in snap), `${L}: snapshot exposes a sum/total/aggregate field`);

  /* #3 commit-spam fails */
  const cs = S.commitSpamSolver(r);
  check(cs.sealed === false, `${L}: commit-spam sealed (a wrong commit must empty the tray)`);

  /* #4 palette-floor */
  check(Core.noSingleItemGEtarget(r) === true, `${L}: a wall snack is ≥ the target (a 1-tap trivial solve)`);
  if (r.schema === 'free') check(S.bruteForceSolver(r).result === 'wrong', `${L}: a single max snack sealed a free round (no decomposition)`);

  /* #5 directional absence */
  const da = S.directionalAbsenceSolver(r);
  if (!da.skip) { check(da.overResult === 'wrong' && da.underResult === 'wrong', `${L}: an over/under wrong feed did not both go 'wrong'`); check(da.identical === true, `${L}: over and under wrong states are observationally DIFFERENT (a hill-climb tell)`); }

  /* #8 within-10/20 */
  check((r.target | 0) >= 1 && (r.target | 0) <= 20, `${L}: target ${r.target} out of 1..20`);

  /* #7 generative ≥2 + each free solution seals + two-ways distinct */
  if (isGen(r)) {
    check((r.solutions || []).length >= 2, `${L}: a generative round has <2 declared decompositions`);
    if (r.schema === 'free') (r.solutions || []).forEach((sol, i) => { const s = Core.newState(r); sol.forEach((c) => Core.addChip(s, c)); check(Core.commit(s) === 'sealed', `${L}: declared free solution #${i} (${sol}) did not seal`); });
    if (r.schema === 'two-ways') check(Core.sortedMultiset(r.solutions[0]) !== Core.sortedMultiset(r.solutions[1]), `${L}: the two two-ways solutions are the SAME multiset (not a different way)`);
  }
});

/* #6 multiset-repeat on every two-ways round */
rounds.filter((r) => r.schema === 'two-ways').forEach((r) => {
  const m = S.multisetRepeatSolver(r);
  check(m.firstWay === 'next-way' && m.repeat === 'repeat' && m.distinct === 'sealed', `round[${r.id}]: multiset-repeat flow wrong (first=${m.firstWay}, repeat=${m.repeat}, distinct=${m.distinct})`);
});

/* #8 schemas + ids + non-monotonic + within-20 */
const schemas = new Set(rounds.map((r) => r.schema));
['free', 'two-ways', 'missing-addend', 'multi-completer', 'exact-n', 'constrained-wall', 'reduce'].forEach((sc) => check(schemas.has(sc), `missing schema "${sc}"`));
check(schemas.size >= 7, `only ${schemas.size} distinct schemas (<7)`);
check(new Set(rounds.map((r) => r.id)).size === rounds.length, 'duplicate round ids');
const ts = rounds.map((r) => r.target | 0);
let asc = true; for (let i = 1; i < ts.length; i++) if (ts[i] <= ts[i - 1]) asc = false;
check(!asc, `targets strictly ascending ${JSON.stringify(ts)} (anti-ordering)`);
check(rounds.some((r) => (r.target | 0) > 10), 'no within-20 round (target >10)');
check(rounds.some((r) => (r.target | 0) <= 10), 'no within-10 base round');

if (failures.length) {
  console.error(`FAIL — ${failures.length} make-total violation(s):`);
  failures.forEach((f) => console.error('  • ' + f));
  process.exit(1);
}
console.log(`PASS — ${rounds.length} rounds / ${schemas.size} schemas: ` +
  `plan-then-feed seals 100%; NO live aggregate (hasLiveAggregate===false, no sum on state/snapshot); commit-spam empties + fails; ` +
  `palette-floor (no snack ≥ T, no 1-tap free solve); over/under wrong states identical (non-directional); two-ways rejects a multiset-repeat + accepts a distinct way; ` +
  `≥2 decompositions per generative target; 7 distinct schemas, non-monotonic targets, within-10 + within-20.`);
process.exit(0);
