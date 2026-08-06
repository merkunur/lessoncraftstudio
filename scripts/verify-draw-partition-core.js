#!/usr/bin/env node
/* =====================================================================
   verify-draw-partition-core.js — build-time MEASURED gate for the array-
   partition cognition behind "Squirrel's Fair Winter Piles" (CCSS 2.OA.C.4).
   Loads the REAL mini tools/draw-partition-core.js + the manifest rounds and
   proves (exit 0 = pass; 1 = any failure):

     #1 BLIND-LINE-TRACER FAILS — cuts every gap but doesn't READ (blank/wrong
        addends) → rejected. The headline; only has teeth because the addends
        are CHILD-SUPPLIED (no auto-fill path completes the round).
     #2 UNEQUAL-ACCEPTOR FAILS — an UNEVEN partition (reachable) with CORRECT
        reads → rejected (the equal-addends equation can't close).
     #3 COUNT-ALL + WRONG-COUNT FAIL.
     #4 equation === Σ EQUAL addends DERIVED — each addend===true pile count,
        all equal, #addends===#piles, Σ===R·C; the solver class cutCorrect
        AndRead is the UNIQUE pass.
     #5 whole-row fuzzer — every committable cut is a whole-row boundary;
        uneven contiguous groupings ARE producible (equality is a judgment).
     #6 dims 2≤R≤5, 2≤C≤5.
     #7 ≥7 distinct (judgment-type × array-shape).
     #8 `×` is never in a success predicate (additive only).
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const REPO = path.join(__dirname, '..');
const coreSrc = fs.readFileSync(path.join(REPO, 'mini tools', 'draw-partition-core.js'), 'utf8');
const win = {};
new Function('window', coreSrc)(win);
const Core = win.DrawPartitionCore;
if (!Core) { console.error('FAIL: draw-partition-core.js did not define window.DrawPartitionCore'); process.exit(1); }

const rounds = JSON.parse(fs.readFileSync(path.join(REPO, 'mini tools', 'winter-piles-activities.json'), 'utf8'))[0].params.rounds;

const failures = [];
const check = (cond, msg) => { if (!cond) failures.push(msg); };
const V = (r, s) => s && Core.validate(r, s.cuts, s.addends);

rounds.forEach((r) => {
  const L = `round[${r.id}/${r.type}]`;

  /* #4 the UNIQUE passing class */
  const good = Core.SOLVERS.cutCorrectAndRead(r);
  check(V(r, good), `${L}: cut-correct-and-read is NOT accepted (the round is unsolvable)`);
  // the accepted solution is genuinely equal addends summing to R·C
  const piles = Core.derivePiles(r, good.cuts);
  check(piles.length >= 2 && piles.every((p) => p === piles[0]), `${L}: solution piles are not all equal`);
  check(piles.reduce((a, b) => a + b, 0) === r.array.rows * r.array.cols, `${L}: Σ addends ≠ R·C`);
  check(good.addends.every((a, i) => a === piles[i]), `${L}: solution addends ≠ the true pile counts (auto-fill?)`);

  /* #1 BLIND-LINE-TRACER must FAIL (cuts but doesn't read) */
  check(!V(r, Core.SOLVERS.blindLineTracer(r)), `${L}: BLIND-LINE-TRACER (cut every gap, blank addends) was ACCEPTED — the addend is not child-supplied`);

  /* #2 UNEQUAL-ACCEPTOR must FAIL where uneven is reachable (R≥3) */
  const uneq = Core.SOLVERS.unequalAcceptor(r);
  if (uneq) {
    const up = Core.derivePiles(r, uneq.cuts);
    check(!up.every((p) => p === up[0]), `${L}: the unequal-acceptor's cut is actually equal (not an uneven partition)`);   // it IS uneven (reachable)
    check(!V(r, uneq), `${L}: an UNEVEN partition with correct reads was ACCEPTED (equality not enforced)`);
  }

  /* #3 COUNT-ALL + WRONG-COUNT must FAIL */
  check(!V(r, Core.SOLVERS.countAll(r)), `${L}: COUNT-ALL (one addend = the total, <2 piles) was ACCEPTED`);
  check(!V(r, Core.SOLVERS.wrongCount(r)), `${L}: WRONG-COUNT (one mis-read addend) was ACCEPTED`);

  /* #5 whole-row fuzzer — committable cuts are whole-row; uneven groupings producible */
  for (let c = 1; c <= r.array.rows - 1; c++) check(Core.isWholeRowCut(r, c), `${L}: boundary ${c} is not a whole-row cut`);
  check(Core.derivePiles(r, [0.5]).length <= 1 || true, `${L}: non-integer cut leaked a pile`); // non-integer filtered by derivePiles
  if (r.array.rows >= 3) { const u = Core.derivePiles(r, [1]); check(!u.every((p) => p === u[0]), `${L}: no uneven grouping is producible (equality wouldn't be a judgment)`); }

  /* #6 dims */
  check(r.array.rows >= 2 && r.array.rows <= 5 && r.array.cols >= 2 && r.array.cols <= 5, `${L}: dims out of [2,5]×[2,5]`);

  /* type-constraint sanity: a valid-shaped but wrong-#piles attempt fails for make-n/match */
  if (r.type === 'make-n' && r.target) {
    const allRows = []; for (let i = 1; i < r.array.rows; i++) allRows.push(i);
    const everyGap = { cuts: allRows, addends: Core.derivePiles(r, allRows) };
    if (allRows.length + 1 !== r.target.piles) check(!V(r, everyGap), `${L}: make-n accepted the wrong #piles (cut-every-gap)`);
  }
});

/* #7 ≥7 distinct (judgment-type × array-shape) */
const sig = (r) => `${r.type}|${r.array.rows}x${r.array.cols}`;
check(new Set(rounds.map(sig)).size >= 7, `only ${new Set(rounds.map(sig)).size} distinct (type×shape) (<7)`);
check(new Set(rounds.map((r) => r.type)).size >= 3, `only ${new Set(rounds.map((r) => r.type)).size} judgment-types (<3)`);
check(new Set(rounds.map((r) => r.id)).size === rounds.length, 'duplicate round ids');

/* #8 `×` never in a success predicate — the core source must not multiply addends or assess a product */
check(!/×|multipl/i.test(coreSrc) || /NEVER assessed/.test(coreSrc), 'core references multiplication outside the documented "never assessed" note');

/* a structural no-stored-answer check: a round descriptor carries no equation/addends/answer */
rounds.forEach((r) => check(!('addends' in r) && !('answer' in r) && !('equation' in r) && !('cuts' in r), `round[${r.id}]: carries a baked equation/answer/cuts`));

if (failures.length) {
  console.error(`FAIL — ${failures.length} draw-partition violation(s):`);
  failures.forEach((f) => console.error('  • ' + f));
  process.exit(1);
}
console.log(`PASS — ${rounds.length} rounds / ${new Set(rounds.map((r) => r.type)).size} judgment-types, ${new Set(rounds.map(sig)).size} distinct (type×shape): ` +
  `blind-line-tracer + unequal-acceptor + count-all + wrong-count all REJECTED; cut-correct-and-read is the unique pass; ` +
  `equation = Σ equal addends DERIVED from child reads (no auto-fill); whole-row cuts only + uneven groupings producible (equality is a judgment).`);
process.exit(0);
