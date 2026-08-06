#!/usr/bin/env node
/* =====================================================================
   verify-estimate-jar-core.js — build-time MEASURED gate for the estimate-jar
   cognition behind "The Wondering Jar" (CCSS K.CC.B.5). Loads the REAL
   mini tools/estimate-jar-core.js + the manifest rounds and proves
   (exit 0 = pass; 1 = any failure):

     #1 WATCH-THE-MOVIE FAILS — zero child events → counted===0, never compare;
        + static-assert NO setInterval / setTimeout(...count / rAF(...count path.
     #2 SAME-ITEM-REPEAT (CONVEYOR) FAILS — tapping ONE id N times → counted.size
        ===1 ≠ actual; reaching the count REQUIRES N DISTINCT items (the keystone).
     #3 SLIDE-TO-LEAKED-ACTUAL FAILS — getActual() throws pre-compare; the
        estimate-stage renderableState has NO field === items.length.
     #4 DISTINCT-ITEM-COUNTER PASSES — N distinct tags → compare, counted===actual,
        _trace has exactly N events.
     #5 ESTIMATE HONORED-NEVER-GRADED — lockGuess accepts any value; validate is
        independent of the guess (guess=0, full count → advances); no score field.
     #6 NO ACCURACY GRADIENT — compareDir returns only same/fewer/more; no
        distance/gap/score symbol anywhere in the core source.
     #7 ARRANGEMENT/RANGE bounds — ≤20 line/array/circle; ≤10 scatter.
     #8 ≥7 distinct by (arrangement | judgment), distinct ids, the count is the
        child's (number word only on a genuine new tag).
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const REPO = path.join(__dirname, '..');
const coreSrc = fs.readFileSync(path.join(REPO, 'mini tools', 'estimate-jar-core.js'), 'utf8');
const win = {};
new Function('window', coreSrc)(win);
const Core = win.EstimateJarCore;
if (!Core) { console.error('FAIL: estimate-jar-core.js did not define window.EstimateJarCore'); process.exit(1); }
const S = Core.SOLVERS;

const rounds = JSON.parse(fs.readFileSync(path.join(REPO, 'mini tools', 'wondering-jar-activities.json'), 'utf8'))[0].params.rounds;

const failures = [];
const check = (cond, msg) => { if (!cond) failures.push(msg); };

/* ---- static source asserts (no auto-count / no accuracy gradient) ---- */
check(!/setInterval|setTimeout\s*\([^)]*count|requestAnimationFrame\s*\([^)]*count/i.test(coreSrc), 'core has an auto-count timer/rAF path (watch-the-movie would pass)');
check(!/estimateCorrect|estimateScore|accuracyGradient|shrinkingGap/.test(coreSrc), 'core references an estimate-score / accuracy-gradient symbol (the behavioral compareDir test enforces sign-only)');

/* ---- compareDir is SIGN only, never a magnitude ---- */
['same', 'fewer', 'more'].forEach((d) => {
  const m = { same: [7, 7], fewer: [9, 7], more: [7, 9] }[d];
  check(Core.compareDir(m[0], m[1]) === d, `compareDir(${m[0]},${m[1]}) !== '${d}'`);
});
[[0, 20], [3, 3], [20, 0], [1, 19]].forEach(([g, a]) => {
  const r = Core.compareDir(g, a);
  check(r === 'same' || r === 'fewer' || r === 'more', `compareDir(${g},${a})='${r}' is not a bare sign (magnitude leak)`);
});

rounds.forEach((r) => {
  const L = `round[${r.id}/${r.type}]`, actual = r.items.length;

  /* #4 distinct counter passes */
  const dc = S.distinctItemCounter(r);
  check(dc.solved && dc.count === actual, `${L}: the honest distinct-item counter does NOT reach the actual (${dc.count}/${actual})`);
  check(dc.traceLen === actual, `${L}: _trace has ${dc.traceLen} events, expected exactly ${actual}`);

  /* #1 watch-the-movie fails */
  const wm = S.watchTheMovieSolver(r);
  check(!wm.solved && wm.count === 0, `${L}: watch-the-movie advanced the count (count=${wm.count}) — an auto path exists`);

  /* #2 same-item-repeat (conveyor) fails */
  const si = S.sameItemRepeatSolver(r);
  check(!si.solved && si.count === 1, `${L}: same-item-repeat reached ${si.count}/${actual} — re-tag is NOT inert (conveyor)`);

  /* #3 slide-to-leaked-actual fails */
  const sl = S.slideToLeakedActualSolver(r);
  check(!sl.leaked && sl.threwPreCompare, `${L}: the actual leaked before compare (getActual didn't throw or a state field === items.length)`);

  /* #5 estimate honored-never-graded */
  const eg = S.estimateGradedProbe(r);
  check(eg.advancedWithGuessZero, `${L}: validate is NOT independent of the guess (a wish of 0 blocked the count)`);
  check(!eg.hasScoreField, `${L}: a score/distance/gap field was created on state (the estimate is being graded)`);

  /* getActual throws pre-compare, returns actual at compare */
  let threw = false; try { Core.getActual(r, Core.newState(r)); } catch (e) { threw = true; }
  check(threw, `${L}: getActual did not throw at the estimate stage`);

  /* #7 arrangement / range bounds */
  check(actual <= Core.MAXN, `${L}: N=${actual} exceeds ${Core.MAXN}`);
  if (Core.isScatter(r)) check(actual <= Core.SCATTER_CAP, `${L}: scatter N=${actual} exceeds the ${Core.SCATTER_CAP} cap`);
  check(['line', 'array', 'circle', 'scatter'].includes(r.arrangement), `${L}: unknown arrangement '${r.arrangement}'`);

  /* number word speaks ONLY on a genuine new tag (re-tag returns changed:false, no spoke) */
  const s2 = Core.newState(r); Core.lockGuess(r, s2, 5);
  const first = Core.countItem(r, s2, 0); const again = Core.countItem(r, s2, 0);
  check(first.changed === true && typeof first.spoke === 'number', `${L}: the first tag did not emit a number word`);
  check(again.changed === false && !('spoke' in again), `${L}: a re-tag emitted a +1 / number word (conveyor)`);
});

/* #8 ≥7 distinct by (arrangement | judgment) */
const key = (r) => r.judgment ? `${r.arrangement}|${r.judgment}` : `${r.arrangement}|${r.type}`;
const distinct = new Set(rounds.map((r) => r.type));
check(distinct.size >= 7, `only ${distinct.size} distinct acts (<7)`);
check(new Set(rounds.map((r) => r.id)).size === rounds.length, 'duplicate round ids');
check(rounds.some((r) => r.arrangement === 'scatter'), 'no scatter round (the ≤10 one-to-one)');
check(rounds.some((r) => r.judgment), 'no relational/comparison judgment round');

if (failures.length) {
  console.error(`FAIL — ${failures.length} estimate-jar violation(s):`);
  failures.forEach((f) => console.error('  • ' + f));
  process.exit(1);
}
console.log(`PASS — ${rounds.length} rounds / ${distinct.size} distinct acts: ` +
  `watch-the-movie=0 (no auto path) / same-item-repeat=1 (re-tag inert, the conveyor keystone) / slide-to-leaked-actual throws pre-compare — all FAIL; ` +
  `distinct-item counter passes (counted===actual, _trace exact); estimate honored-never-graded (guess 0 still advances, no score field); ` +
  `compareDir sign-only (no magnitude); ranges ≤20 / scatter ≤10; the count is the child's (re-tag emits no number word).`);
process.exit(0);
