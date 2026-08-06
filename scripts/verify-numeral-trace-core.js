#!/usr/bin/env node
/* =====================================================================
   verify-numeral-trace-core.js — build-time MEASURED gate for the count-out +
   commit-by-formation cognition behind "Mama's Roll Call" (CCSS K.CC.B.5).
   Loads the REAL mini tools/numeral-trace-core.js + the manifest rounds and
   proves (exit 0 = pass; 1 = any failure):

     #1 COUNT-OUT→FORM PASSES 100% — produce exactly N (no reaction) + form the
        numeral in stroke order (BOTH the ordered-tap fallback AND a pointer
        path) → commit seals EVERY round (incl. 0-case, match-set, count-set,
        running-total).
     #2 FORM-WITHOUT-COUNT-OUT FAILS — form the numeral while sending 0 → for
        n>0 the set ≠ the call → no seal (set production is load-bearing).
     #3 STOP-ON-REACTION structurally impossible — `sendDuck` returns NO seal/
        correctness/counter; `reactionDuringCountOut===false` → no signal to
        halt on (the differentiator from Mochi's bowl-fill).
     #4 SCRIBBLE FAILS — produce N correctly but a garbage pointer path → off-
        path → strokes never complete → commit mismatch.
     #5 STRICT STROKE ORDER — an out-of-order stroke (stroke 2 before 1, on a
        2-stroke digit) is rejected ('wrong-order').
     #6 CARDINALITY PROBE — vary-N + N≥6 on count-out/scatter + ≥1 match-set +
        ≥1 running-total + ≥1 count-set.
     #7 FORWARD-MINORITY anti-cheat (#5) — `numeralPathPresent===false` until the
        count completes (no glyph to trace until counted).
     #8 0-CASE REQUIRED — ≥1 roll n===0, sealed by sending zero + forming "0".
     #9 DISTRACT — sending a wrong-KIND duck makes the roll un-sealable.
     #10 RANGE 0-9 (teens deferred) + non-monotonic calls + ≥7 act_types + the
        GLYPHS table complete (0-9, ordered, non-empty).
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const REPO = path.join(__dirname, '..');
const coreSrc = fs.readFileSync(path.join(REPO, 'mini tools', 'numeral-trace-core.js'), 'utf8');
const win = {};
new Function('window', coreSrc)(win);
const Core = win.NumeralTraceCore;
if (!Core) { console.error('FAIL: numeral-trace-core.js did not define window.NumeralTraceCore'); process.exit(1); }
const S = Core.SOLVERS;

const manifest = JSON.parse(fs.readFileSync(path.join(REPO, 'mini tools', 'mamas-roll-call-activities.json'), 'utf8'))[0];
const rounds = manifest.params.rounds;

const failures = [];
const check = (cond, msg) => { if (!cond) failures.push(msg); };
const isProd = (r) => r.act_type !== 'count-set' && r.act_type !== 'running-total';

rounds.forEach((r) => {
  const L = `round[${r.id}/${r.act_type}]`, n = r.call.n | 0;

  /* #1 genuine solver seals — both the ordered-tap fallback AND a pointer path */
  check(S.countOutFormSolver(r, false).sealed === true, `${L}: count-out→form (ordered-tap) did NOT seal`);
  check(S.countOutFormSolver(r, true).sealed === true, `${L}: count-out→form (pointer path) did NOT seal`);

  /* #2 form-without-count-out fails on n>0 */
  if (n > 0) check(S.formWithoutCountOutSolver(r).sealed === false, `${L}: forming the numeral while sending NOTHING sealed (set production not load-bearing)`);

  /* #3 stop-on-reaction structurally impossible (production rounds) */
  if (isProd(r)) {
    const so = S.stopOnReactionSolver(r);
    check(so.hasSignalToHaltOn === false, `${L}: sendDuck returned a seal/correctness signal to halt on (stop-on-reaction cheat alive)`);
    check(so.reactionDuringCountOut === false, `${L}: reactionDuringCountOut !== false`);
    /* sendDuck return carries no correctness keys */
    const s = Core.newState(r), ret = Core.sendDuck(s, s.raft[0].id);
    check(ret && ret.sealed === undefined && ret.correct === undefined && ret.count === undefined && ret.reachedTarget === undefined, `${L}: sendDuck return exposes a correctness field`);
  }

  /* #4 scribble fails */
  const sc = S.scribbleSolver(r);
  check(sc.sealed === false && sc.strokesDone === 0, `${L}: a garbage scribble formed the numeral + sealed (sealed=${sc.sealed}, strokesDone=${sc.strokesDone})`);

  /* #10 range + non-empty glyph */
  check(n >= 0 && n <= 9, `${L}: call ${n} out of 0..9 (teens deferred)`);
});

/* #5 strict stroke order — synthetic 2-stroke digit (4 is not in the N≥6 pool) */
check(Core.numStrokes(4) === 2, 'glyph "4" is not 2 strokes (cannot test multi-stroke order)');
{ const fake = { id: 'syn4', act_type: 'count-out', call: { n: 4, target: 'numeral' }, raft: { total: 6, arrangement: 'tidy' } };
  check(S.outOfOrderSolver(fake).result === 'wrong-order', 'tapping stroke 2 before stroke 1 was accepted (stroke order not strict)'); }

/* #6 cardinality probe */
const calls = rounds.map((r) => r.call.n | 0);
check(new Set(calls).size >= 3, `calls do not vary enough (${[...new Set(calls)].join(',')})`);
rounds.filter((r) => r.act_type === 'count-out' || r.act_type === 'scatter-out').forEach((r) => check((r.call.n | 0) >= 6, `${r.id}: count-out/scatter call ${r.call.n} < 6 (subitizing not killed)`));
check(rounds.some((r) => r.act_type === 'match-set'), 'no match-set round (the two-set cardinality probe)');
check(rounds.some((r) => r.act_type === 'running-total'), 'no running-total round (held-cardinal probe)');
check(rounds.some((r) => r.act_type === 'count-set'), 'no count-set round (forward minority)');

/* #7 forward-minority anti-cheat — glyph absent until count completes */
{ const r = rounds.find((x) => x.act_type === 'count-set'); const s = Core.newState(r);
  Core.goToSign(s); check(Core.numeralPathPresent(s) === false, 'count-set: the glyph guide is present before the count completes (a trace-without-count cheat)');
  s.stage = 'count-out'; s.brood.forEach((b) => Core.countDuck(s, b.id)); Core.goToSign(s);
  check(Core.numeralPathPresent(s) === true, 'count-set: the glyph guide never appears after counting'); }

/* #8 0-case */
const zr = rounds.find((r) => (r.call.n | 0) === 0);
check(!!zr && zr.act_type === 'zero', 'no 0-case roll (n===0)');
if (zr) check(S.countOutFormSolver(zr, false).sealed === true && Core.numeralFor(0) === '0', 'the 0-roll did not seal by sending zero + forming "0"');

/* #9 distract — a wrong-kind send is un-sealable */
{ const r = rounds.find((x) => x.act_type === 'count-out-distract'); const s = Core.newState(r);
  const brown = s.raft.filter((d) => d.kind !== r.call.kind);
  const yellow = s.raft.filter((d) => d.kind === r.call.kind);
  for (let i = 0; i < r.call.n - 1; i++) Core.sendDuck(s, yellow[i].id); Core.sendDuck(s, brown[0].id); // n-1 right + 1 wrong-kind
  check(Core.producedCount(s) === -1, 'distract: sending a wrong-kind duck did not poison producedCount'); }

/* #10 non-monotonic + act-types + glyph table */
let asc = true; for (let i = 1; i < calls.length; i++) if (calls[i] <= calls[i - 1]) asc = false;
check(!asc, `calls are strictly ascending ${JSON.stringify(calls)} (anti-ordering: must not sort)`);
const acts = new Set(rounds.map((r) => r.act_type));
['count-out', 'count-out-distract', 'match-set', 'zero', 'count-set', 'running-total', 'scatter-out'].forEach((a) => check(acts.has(a), `missing act_type "${a}"`));
check(acts.size >= 7, `only ${acts.size} distinct act-types (<7)`);
check(new Set(rounds.map((r) => r.id)).size === rounds.length, 'duplicate round ids');
for (let d = 0; d <= 9; d++) { const g = Core.GLYPHS[d]; check(Array.isArray(g) && g.length >= 1 && g.every((st) => Array.isArray(st) && st.length >= 2), `GLYPHS["${d}"] missing/malformed`); }

/* #11 REAL-TRACE robustness — a coarse, on-curve drag with FEWER samples than
   the stroke has checkpoints (what a real finger/mouse trace produces) MUST be
   accepted; an off-shape drag MUST be rejected. The old point-to-POINT traceScore
   (≤1 checkpoint per sample) FAILS the coarse case — this locks the point-to-
   segment fix so "can't trace it" can't regress. The path follows the SAME
   Catmull-Rom curve the renderer draws. */
function crPoint(p0, p1, p2, p3, t) {
  const t2 = t * t, t3 = t2 * t;
  return {
    x: 0.5 * (2 * p1.x + (-p0.x + p2.x) * t + (2 * p0.x - 5 * p1.x + 4 * p2.x - p3.x) * t2 + (-p0.x + 3 * p1.x - 3 * p2.x + p3.x) * t3),
    y: 0.5 * (2 * p1.y + (-p0.y + p2.y) * t + (2 * p0.y - 5 * p1.y + 4 * p2.y - p3.y) * t2 + (-p0.y + 3 * p1.y - 3 * p2.y + p3.y) * t3)
  };
}
function curveSamples(pts, perSeg) {
  if (pts.length < 3) return pts.slice();
  const out = [pts[0]];
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] || pts[i], p1 = pts[i], p2 = pts[i + 1], p3 = pts[i + 2] || p2;
    for (let s = 1; s <= perSeg; s++) out.push(crPoint(p0, p1, p2, p3, s / perSeg));
  }
  return out;
}
for (let d = 0; d <= 9; d++) {
  Core.GLYPHS[d].forEach((stroke, si) => {
    const dense = curveSamples(stroke, 8);
    const K = Math.max(2, Math.ceil(stroke.length * 0.6));            // FEWER samples than checkpoints
    const step = Math.max(1, Math.floor((dense.length - 1) / (K - 1)));
    const coarse = []; for (let j = 0; j < dense.length; j += step) coarse.push(dense[j]);
    if (coarse[coarse.length - 1] !== dense[dense.length - 1]) coarse.push(dense[dense.length - 1]);
    check(coarse.length < stroke.length || stroke.length <= 3, `digit ${d} stroke ${si}: coarse path not actually coarse (${coarse.length} vs ${stroke.length} checkpoints)`);
    check(Core.traceScore(stroke, coarse) === true, `digit ${d} stroke ${si}: a coarse on-curve trace (${coarse.length} pts) was REJECTED — not traceable by a real drag`);
    const off = coarse.map((p) => ({ x: p.x + 45, y: p.y + 45 }));   // a clearly off-shape drag
    check(Core.traceScore(stroke, off) === false, `digit ${d} stroke ${si}: an off-shape drag was ACCEPTED (trace too loose)`);
  });
}

if (failures.length) {
  console.error(`FAIL — ${failures.length} numeral-trace violation(s):`);
  failures.forEach((f) => console.error('  • ' + f));
  process.exit(1);
}
console.log(`PASS — ${rounds.length} rolls / ${acts.size} act-types: ` +
  `count-out→form seals 100% (tap + pointer); form-without-count-out FAILS (set production load-bearing); STOP-ON-REACTION impossible (sendDuck emits no seal, reactionDuringCountOut===false); ` +
  `scribble FAILS; stroke order strict (out-of-order rejected); cardinality probe holds (vary-N, N≥6 count-out/scatter, match-set + running-total + count-set); ` +
  `forward-minority glyph absent until count completes; 0-case seals via the same mechanic; distract wrong-kind un-sealable; 0-9 non-monotonic; GLYPHS 0-9 complete.`);
process.exit(0);
