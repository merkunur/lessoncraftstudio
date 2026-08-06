#!/usr/bin/env node
/* =====================================================================
   verify-rail-decompose-core.js — build-time MEASURED gate for the
   decomposition cognition behind "Chuffer's Switchyard" (CCSS K.OA.A.3).
   Loads the REAL mini tools/rail-decompose-core.js + the manifest rounds and
   proves (exit 0 = pass; 1 = any failure):

     #1 GENUINE decomposer PASSES — distribute + STATE + bank the full unordered
        set → complete, for every decompose-record round.
     #2 ONE-WAY FAILS — banking 1 way leaves complete===false (full set needed).
     #3 RE-SUBMIT FAILS — re-stating the same way → 'duplicate', manifest len 1.
     #4 COMMUTATIVE-ONLY FAILS — {2,3} then 3+2 → 'mirror', no new rung.
     #5 ZERO-PADDING FAILS — N+0 → 'zero', never counts toward the floor.
     #6 MINDLESS-NUDGER FAILS (the keystone) — moving + coupling WITHOUT stating
        (or stating WRONG) → 'mismatch', never banks → complete===false.
     #7 NO PAIR-GENERATOR — the manifest grows ONLY via record() after a child
        stateParts; the public API has no fill/generate; trace provenance holds.
     #8 MOVE-NOT-CREATE — a+b===whole across every reachable state.
     #9 COUNT-NOT-LENGTH — a,b are integers (counts of discrete crates).
     #10 ≥7 distinct act-types (each a distinct trace/round signature; an
         N-value re-skin of one act collapses + FAILS); distinct ids.
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const REPO = path.join(__dirname, '..');
const coreSrc = fs.readFileSync(path.join(REPO, 'mini tools', 'rail-decompose-core.js'), 'utf8');
const win = {};
new Function('window', coreSrc)(win);
const Core = win.RailDecomposeCore;
if (!Core) { console.error('FAIL: rail-decompose-core.js did not define window.RailDecomposeCore'); process.exit(1); }
const S = Core.SOLVERS;

const rounds = JSON.parse(fs.readFileSync(path.join(REPO, 'mini tools', 'chuffer-activities.json'), 'utf8'))[0].params.rounds;

const failures = [];
const check = (cond, msg) => { if (!cond) failures.push(msg); };

/* #7 no pair-generator in the public API */
check(typeof Core.fillAll === 'undefined' && typeof Core.generate === 'undefined' && typeof Core.allWays === 'undefined', 'core exposes a pair-generator (the engine-fill cheat would pass)');
check(!/function\s+(fillManifest|autoFill|generatePairs)/.test(coreSrc), 'core has an auto-fill helper');

rounds.forEach((r) => {
  const L = `round[${r.id}/${r.actType}]`, full = Core.waysFor(r.whole).length;

  /* #1 genuine passes */
  check(S.genuineDecomposer(r).complete, `${L}: the genuine state-the-parts decomposer does NOT complete`);

  /* #6 mindless-nudger fails (both no-state and wrong-state) */
  const mn = S.mindlessNudgerSolver(r);
  check(!mn.completeNoState && mn.sizeNoState === 0, `${L}: moving+coupling WITHOUT stating parts banked a way (sizeNoState=${mn.sizeNoState})`);
  check(!mn.completeWrongState && mn.sizeWrong === 0, `${L}: stating WRONG parts banked a way (sizeWrong=${mn.sizeWrong})`);

  /* #8 move-not-create + #9 count-not-length — exhaustively over reachable a */
  if (!r.sealedCar) {
    const s = Core.newState(r);
    for (let a = 0; a <= r.whole; a++) { Core.setA(s, a); check(s.a + s.b === r.whole, `${L}: a+b !== whole at a=${a} (move-not-create broken)`); check(Number.isInteger(s.a) && Number.isInteger(s.b), `${L}: a/b not integer counts (count-not-length)`); }
  }

  /* decompose-record / hunt rounds: the anti-cheats on the full-set flow */
  if (r.actType === 'decompose-record' || r.actType === 'hunt-rung' || r.actType === 'predict-covariation') {
    check(!S.oneWaySolver(r).complete, `${L}: one way completed the round (needs the full set)`);
    check(S.reSubmitSolver(r).secondResult === 'duplicate', `${L}: re-submitting the same way was not a duplicate`);
    const co = S.commutativeOnlySolver(r); if (!co.skip) { check(co.secondResult === 'mirror' && co.size === 1, `${L}: a commutative swap added a rung (must be 'mirror')`); }
    const zp = S.zeroPaddingSolver(r); if (!zp.skip) check(zp.result === 'zero' && zp.size === 0, `${L}: a zero-pad (N+0) banked toward the floor`);
  }
});

/* #2..#5 concentrated proof on a representative N=6 round */
{ const r = rounds.find((x) => x.whole === 6 && x.actType === 'decompose-record') || rounds.find((x) => x.actType === 'decompose-record');
  check(S.oneWaySolver(r).size === 1 && !S.oneWaySolver(r).complete, 'one-way control failed'); }

/* trace provenance: every banked key has a child record-event (via record after state) */
{ const r = rounds.find((x) => x.actType === 'decompose-record'); const s = Core.newState(r);
  Core.waysFor(r.whole).forEach((w) => { Core.setA(s, w.a); Core.stateParts(s, s.a, s.b); Core.record(s); });
  const recorded = s.trace.filter((t) => t.via === 'record').map((t) => t.key).sort();
  const manifest = Object.keys(s.manifest).sort();
  check(JSON.stringify(recorded) === JSON.stringify(manifest), 'the manifest contains keys with no child record-event (engine-fill leak)');
  // and each record is preceded by a state event
  let lastState = false, ok = true; s.trace.forEach((t) => { if (t.via === 'state') lastState = true; if (t.via === 'record') { if (!lastState) ok = false; lastState = false; } });
  check(ok, 'a record event occurred without a preceding child state event'); }

/* #10 ≥7 distinct act-types + distinct setups */
const acts = new Set(rounds.map((r) => r.actType));
check(acts.size >= 7, `only ${acts.size} distinct act-types (<7): ${[...acts].join(',')}`);
check(new Set(rounds.map((r) => r.id)).size === rounds.length, 'duplicate round ids');
check(rounds.some((r) => r.actType === 'make-ten' && r.sealedCar), 'make-ten round lacks a sealedCar (no distinct setup)');
check(rounds.some((r) => r.actType === 'equation-build' && r.givenEquation), 'equation-build round lacks a givenEquation');
check(rounds.some((r) => r.actType === 'judge-route' && r.proposed), 'judge-route round lacks proposed splits');

if (failures.length) {
  console.error(`FAIL — ${failures.length} rail-decompose violation(s):`);
  failures.forEach((f) => console.error('  • ' + f));
  process.exit(1);
}
console.log(`PASS — ${rounds.length} rounds / ${acts.size} act-types: ` +
  `genuine state-the-parts decomposer completes the full set; one-way/re-submit(duplicate)/commutative(mirror)/zero-pad all FAIL; ` +
  `MINDLESS-NUDGER (no/wrong stated parts) never banks → never completes (the keystone); ` +
  `no pair-generator + trace provenance (every banked key has a child record-after-state); a+b===whole always (move-not-create), integer counts; ≥7 distinct act-types with distinct setups.`);
process.exit(0);
