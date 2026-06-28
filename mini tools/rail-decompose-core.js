/* =====================================================================
   CORE — Rail Decompose  (rail-decompose-core.js)
   ---------------------------------------------------------------------
   Generic, LOCALE-NEUTRAL "decompose a whole N into two parts in MORE THAN
   ONE WAY, the child STATING each split" cognition (the spec's
   `engine-rail-decompose.js`). First skin: "Chuffer's Switchyard" — CCSS
   K.OA.A.3 (decompose ≤10 into pairs in more than one way, recording each).
   Head of the construct-build / decomposition family.

   THE SPINE: N discrete crates split between a Left car (a) and a Right car
   (b); the child MOVES crates (a+b===N is unbreakable — no target sum to hunt),
   READS each car, STATES the split, and pulls the coupler. The round completes
   at the FULL family of distinct unordered non-zero ways (the staircase).

   LOCKED ANTI-CHEATS (all gate-proven against this REAL core):
     • THE CHILD STATES THE PARTS — the equation NEVER auto-prints. `record()`
       banks ONLY when `stated` matches the ACTUAL car-counts (the named claim /
       recording requirement) → a mindless-nudger who never states parts can't
       bank (the keystone; mindlessNudgerSolver FAILS).
     • UNORDERED DISTINCTNESS — {2,3} and {3,2} are ONE way (the commutative
       cheat closed); a swap is a CELEBRATED 'mirror', never a new rung.
     • MOVE-NOT-CREATE — a+b===N across every reachable state (no wrong-sum
       state; trial-and-error is meaningless).
     • COUNT-NOT-LENGTH — a,b are integer counts of discrete crates.
     • NO PAIR-GENERATOR in the public API — the manifest grows ONLY via
       `record()` after a child `stateParts`; `trace[]` proves the provenance.

   Pure functions, no DOM. Mirrors ten-frame-tank / estimate-jar / count-twin.
   ===================================================================== */
(function (global) {
  'use strict';

  // the completion universe of N: unordered NON-ZERO pairs {a≤b, a+b=N, a≥1}.
  function waysFor(N) { var out = []; for (var a = 1; a <= Math.floor(N / 2); a++) out.push({ a: a, b: N - a }); return out; }
  function keyOf(a, b) { return Math.min(a, b) + '-' + Math.max(a, b); }
  function ordOf(a, b) { return a + '-' + b; }

  // how many distinct ways a round must bank to complete (full set; or 1 for the
  // single-target make-ten / equation-build acts; judge/predict acts complete
  // via the skin's own flag, not the manifest).
  function targetWays(round) {
    if (round.actType === 'make-ten' || round.actType === 'equation-build') return 1;
    return waysFor(round.whole).length;
  }

  function newState(round) {
    var whole = round.whole, a, b, sealed = null;
    if (round.sealedCar) { sealed = round.sealedCar.car; if (sealed === 'a') { a = round.sealedCar.k; b = whole - a; } else { b = round.sealedCar.k; a = whole - b; } }
    else if (round.givenEquation) { a = 1; b = whole - 1; }     // start OFF the target so the child must build it
    else { a = 1; b = whole - 1; }
    return { whole: whole, a: a, b: b, sealed: sealed, stated: null, manifest: {}, ordered: {}, trace: [], lastResult: null };
  }

  /* MOVE one crate toward `toCar` from the other (a+b invariant). A sealed car
     can neither give nor receive. Re-arranging clears the pending claim. */
  function move(state, toCar) {
    if (state.sealed) return { changed: false };
    if (toCar === 'a' && state.b > 0) { state.a++; state.b--; }
    else if (toCar === 'b' && state.a > 0) { state.b++; state.a--; }
    else return { changed: false };
    state.stated = null; state.trace.push({ via: 'move', a: state.a, b: state.b });
    return { changed: true, a: state.a, b: state.b };
  }
  // set a directly (steppers); compensates b. Sealed cars are immovable.
  function setA(state, val) {
    if (state.sealed) return { changed: false };
    val = Math.max(0, Math.min(state.whole, val | 0)); if (val === state.a) return { changed: false };
    state.a = val; state.b = state.whole - val; state.stated = null; state.trace.push({ via: 'move', a: state.a, b: state.b });
    return { changed: true };
  }

  /* the child's CLAIM — what they read in each car. */
  function stateParts(state, sa, sb) { state.stated = { a: sa | 0, b: sb | 0 }; state.trace.push({ via: 'state', statedA: sa | 0, statedB: sb | 0 }); return state.stated; }

  /* the coupler. Banks ONLY when stated matches the ACTUAL car-counts AND the
     unordered key is new. Never banks without a matching claim. */
  function record(state) {
    if (!state.stated) { state.lastResult = 'mismatch'; return 'mismatch'; }
    if (state.stated.a !== state.a || state.stated.b !== state.b) { state.lastResult = 'mismatch'; return 'mismatch'; }
    var a = state.a, b = state.b;
    if (a === 0 || b === 0) { state.lastResult = 'zero'; return 'zero'; }            // zeros never count toward the floor
    var key = keyOf(a, b), ord = ordOf(a, b), res;
    if (state.ordered[ord]) res = 'duplicate';
    else if (state.manifest[key]) { state.ordered[ord] = true; res = 'mirror'; }     // known way, new order — celebrated, no rung
    else { state.manifest[key] = true; state.ordered[ord] = true; state.trace.push({ via: 'record', key: key }); res = 'recorded'; }
    state.lastResult = res; return res;
  }

  function manifestSize(state) { return Object.keys(state.manifest).length; }
  function isComplete(round, state) { return manifestSize(state) >= targetWays(round); }
  function snapshot(round, state) { return { whole: state.whole, a: state.a, b: state.b, sealed: state.sealed, stated: state.stated, manifest: Object.keys(state.manifest), size: manifestSize(state), universe: waysFor(state.whole), complete: isComplete(round, state) }; }

  /* ---- the SOLVER gauntlet (the gate drives these against the REAL core) ---- */
  // distribute + STATE + bank the full unordered set → complete (the unique pass).
  function genuineDecomposer(round) {
    var s = newState(round), ways = waysFor(round.whole);
    ways.forEach(function (w) { setA(s, w.a); stateParts(s, s.a, s.b); record(s); });
    return { complete: isComplete(round, s), size: manifestSize(s) };
  }
  function oneWaySolver(round) { var s = newState(round), w = waysFor(round.whole)[0]; setA(s, w.a); stateParts(s, s.a, s.b); record(s); return { complete: isComplete(round, s), size: manifestSize(s) }; }
  function reSubmitSolver(round) { var s = newState(round), w = waysFor(round.whole)[0]; setA(s, w.a); stateParts(s, s.a, s.b); record(s); var r = record(s); return { secondResult: r, size: manifestSize(s) }; }
  function commutativeOnlySolver(round) { var s = newState(round), w = waysFor(round.whole)[0]; if (w.a === w.b) return { skip: true, size: 1 }; setA(s, w.a); stateParts(s, s.a, s.b); record(s); setA(s, w.b); stateParts(s, s.a, s.b); var r = record(s); return { secondResult: r, size: manifestSize(s) }; }
  function zeroPaddingSolver(round) { var s = newState(round); if (s.sealed) return { skip: true, size: 0 }; setA(s, round.whole); stateParts(s, s.a, s.b); var r = record(s); return { result: r, size: manifestSize(s) }; }
  // MOVES + couples WITHOUT stating (or states wrong) → mismatch, never banks.
  function mindlessNudgerSolver(round) {
    var s = newState(round), ways = waysFor(round.whole);
    ways.forEach(function (w) { setA(s, w.a); /* NO stateParts */ record(s); });            // never states → mismatch
    var noState = isComplete(round, s);
    var s2 = newState(round);
    ways.forEach(function (w) { setA(s2, w.a); stateParts(s2, s2.a + 1, s2.b); record(s2); }); // states WRONG
    return { completeNoState: noState, completeWrongState: isComplete(round, s2), sizeNoState: manifestSize(s), sizeWrong: manifestSize(s2) };
  }

  global.RailDecomposeCore = {
    waysFor: waysFor, keyOf: keyOf, targetWays: targetWays,
    newState: newState, move: move, setA: setA, stateParts: stateParts, record: record,
    manifestSize: manifestSize, isComplete: isComplete, snapshot: snapshot,
    SOLVERS: {
      genuineDecomposer: genuineDecomposer, oneWaySolver: oneWaySolver, reSubmitSolver: reSubmitSolver,
      commutativeOnlySolver: commutativeOnlySolver, zeroPaddingSolver: zeroPaddingSolver, mindlessNudgerSolver: mindlessNudgerSolver
    }
  };

}(typeof window !== 'undefined' ? window : this));
