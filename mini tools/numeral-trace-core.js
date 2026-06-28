/* =====================================================================
   CORE — Numeral Trace  (numeral-trace-core.js)
   ---------------------------------------------------------------------
   Generic, LOCALE-NEUTRAL "COUNT OUT exactly N (no reaction), then COMMIT by
   FORMING the numeral in stroke order" cognition. First skin: "Mama's Roll
   Call" — CCSS K.CC.B.5 (count to answer how-many up to 20; AND given a number,
   COUNT OUT that many). The 3rd draw-trace family member (sibling to
   connect-sequence). The graded cognition = CARDINALITY in BOTH directions,
   LED BY THE REVERSE (count-out-that-many — produce a set of exactly N).

   THE SPINE: Mama calls N; the child sends ducklings out of an abundant raft
   one at a time — WITH NO GAME REACTION — then signs the roll by FORMING the
   numeral (ordered strokes). The roll seals ONLY at the commit, IFF the set
   sent === the call AND the numeral was formed in stroke order.

   LOCKED ANTI-CHEATS (all gate-proven against this REAL core):
     • NO REACTION DURING COUNT-OUT — `sendDuck` returns NO correctness/seal/
       counter; the seal is checked ONLY in `commit()`. `reactionDuringCountOut
       ===false` is a structural invariant → the stop-on-reaction cheat (the
       differentiator from Mochi's bowl-fill) is impossible.
     • SET PRODUCTION IS LOAD-BEARING — form-without-sending → sent ≠ call → no
       seal. The trace alone cannot pass.
     • STRICT STROKE ORDER — `attemptStroke` accepts a stroke only when it is the
       NEXT one AND (the pointer path traverses its ordered checkpoints in order,
       OR the ordered-tap fallback names the next stroke). A scribble / out-of-
       order tap is rejected.
     • CARDINALITY (not one-to-one) — vary-N + N≥6 + the match-set + running-total
       acts prove a HELD cardinal.

   Pure functions, no DOM. Mirrors connect-sequence / numeral-album / rail-decompose.
   ===================================================================== */
(function (global) {
  'use strict';

  /* per-digit 0-9 ORDERED stroke paths in a normalized 0..100 glyph box (EN
     print, K-handwriting stroke order/direction). Each digit = array of strokes;
     each stroke = ordered points that lie ON a smooth standard print-numeral
     curve — the activity renders them as a Catmull-Rom SPLINE (passes through
     every point), so the guide is a professional, traceable numeral; the SAME
     points are the ordered trace checkpoints (loose TOL — wobble fine, STRICT on
     order). Per-locale variants (1/4/7/9) are a fast-follow. */
  var GLYPHS = {
    0: [[{ x: 50, y: 14 }, { x: 34, y: 22 }, { x: 28, y: 40 }, { x: 28, y: 60 }, { x: 36, y: 80 }, { x: 50, y: 86 }, { x: 64, y: 80 }, { x: 72, y: 60 }, { x: 72, y: 40 }, { x: 66, y: 22 }, { x: 50, y: 14 }]],
    1: [[{ x: 36, y: 30 }, { x: 50, y: 16 }, { x: 50, y: 52 }, { x: 50, y: 86 }]],
    2: [[{ x: 30, y: 30 }, { x: 44, y: 16 }, { x: 60, y: 18 }, { x: 68, y: 34 }, { x: 54, y: 52 }, { x: 36, y: 70 }, { x: 28, y: 84 }, { x: 50, y: 84 }, { x: 72, y: 84 }]],
    3: [[{ x: 30, y: 24 }, { x: 48, y: 14 }, { x: 66, y: 26 }, { x: 50, y: 48 }, { x: 68, y: 60 }, { x: 68, y: 76 }, { x: 48, y: 86 }, { x: 28, y: 78 }]],
    4: [[{ x: 58, y: 14 }, { x: 40, y: 40 }, { x: 24, y: 62 }, { x: 50, y: 62 }, { x: 78, y: 62 }], [{ x: 64, y: 14 }, { x: 64, y: 50 }, { x: 64, y: 88 }]],
    5: [[{ x: 66, y: 16 }, { x: 36, y: 16 }, { x: 34, y: 32 }, { x: 34, y: 48 }, { x: 54, y: 46 }, { x: 70, y: 60 }, { x: 60, y: 82 }, { x: 34, y: 80 }]],
    6: [[{ x: 66, y: 18 }, { x: 46, y: 16 }, { x: 32, y: 38 }, { x: 28, y: 62 }, { x: 32, y: 80 }, { x: 48, y: 86 }, { x: 64, y: 80 }, { x: 68, y: 64 }, { x: 56, y: 52 }, { x: 38, y: 54 }, { x: 28, y: 62 }]],
    7: [[{ x: 26, y: 16 }, { x: 50, y: 16 }, { x: 76, y: 16 }, { x: 56, y: 52 }, { x: 44, y: 88 }]],
    8: [[{ x: 50, y: 16 }, { x: 34, y: 24 }, { x: 34, y: 42 }, { x: 50, y: 50 }, { x: 66, y: 60 }, { x: 66, y: 76 }, { x: 50, y: 86 }, { x: 34, y: 76 }, { x: 34, y: 60 }, { x: 50, y: 50 }, { x: 66, y: 42 }, { x: 66, y: 24 }, { x: 50, y: 16 }]],
    9: [[{ x: 66, y: 38 }, { x: 52, y: 16 }, { x: 34, y: 24 }, { x: 30, y: 42 }, { x: 46, y: 54 }, { x: 64, y: 50 }, { x: 68, y: 34 }, { x: 66, y: 60 }, { x: 58, y: 86 }]]
  };
  var TOL = 20; // checkpoint hit tolerance (normalized units) — lenient on precision

  function glyphFor(n) { return GLYPHS[n | 0] || GLYPHS[0]; }
  function numStrokes(n) { return glyphFor(n).length; }
  function numeralFor(n) { n = n | 0; return String(n); }

  function isProductionAct(round) { return round.act_type !== 'count-set' && round.act_type !== 'running-total'; }

  /* build the raft (production acts) / brood (forward acts) duck lists. */
  function buildDucks(round) {
    var raft = [], brood = [], i;
    if (isProductionAct(round)) {
      if (round.act_type === 'count-out-distract') {
        var kinds = round.raft.kinds || {};
        Object.keys(kinds).forEach(function (k) { for (var j = 0; j < kinds[k]; j++) raft.push({ id: k + j, kind: k }); });
      } else {
        var total = round.raft.total | 0;
        for (i = 0; i < total; i++) raft.push({ id: 'r' + i, kind: 'duck' });
      }
    } else {
      var m = (round.act_type === 'running-total') ? (round.arriving || []).reduce(function (a, b) { return a + b; }, 0) : (round.forwardSet | 0);
      for (i = 0; i < m; i++) brood.push({ id: 'b' + i, kind: 'duck' });
    }
    return { raft: raft, brood: brood };
  }

  function newState(round) {
    var d = buildDucks(round);
    return { round: round, call: round.call, raft: d.raft, brood: d.brood, sent: [], counted: {}, stage: 'count-out', strokesDone: 0, committed: false, sealed: false, wheezed: false };
  }

  /* COUNT-OUT (production) — send one duck. Returns ONLY {ok} — NO correctness/
     seal/counter. The roll is judged solely in commit(). */
  function sendDuck(s, id) {
    if (!isProductionAct(s.round)) return { ok: false };
    if (s.sent.some(function (x) { return x.id === id; })) return { ok: false };
    var d = null; for (var i = 0; i < s.raft.length; i++) if (s.raft[i].id === id) { d = s.raft[i]; break; }
    if (!d) return { ok: false };
    s.sent.push(d); return { ok: true };
  }
  function recallDuck(s, id) { for (var i = 0; i < s.sent.length; i++) if (s.sent[i].id === id) { s.sent.splice(i, 1); return { ok: true }; } return { ok: false }; }
  function sentCount(s) { return s.sent.length; }

  /* FORWARD (count-set / running-total) — tap a given brood duck to count it. */
  function countDuck(s, id) { if (isProductionAct(s.round)) return { ok: false }; s.counted[id] = true; return { ok: true }; }
  function countedSize(s) { return Object.keys(s.counted).length; }
  /* #5 forward-minority anti-cheat: the glyph guide is ABSENT until the count completes. */
  function numeralPathPresent(s) { if (isProductionAct(s.round)) return s.stage === 'sign'; return countedSize(s) >= s.brood.length && s.brood.length > 0 ? s.stage === 'sign' : false; }
  function countComplete(s) { return isProductionAct(s.round) ? true : (countedSize(s) >= s.brood.length); }

  function goToSign(s) { s.stage = 'sign'; return s.stage; }
  function backToRaft(s) { s.stage = 'count-out'; s.strokesDone = 0; return s.stage; }

  /* the number the child has PRODUCED (production: sent of the right kind; forward: counted). */
  function producedCount(s) {
    if (!isProductionAct(s.round)) return countedSize(s);
    if (s.round.act_type === 'count-out-distract') { var k = s.call.kind; for (var i = 0; i < s.sent.length; i++) if (s.sent[i].kind !== k) return -1; return s.sent.length; }
    return s.sent.length;
  }

  function dist(a, b) { var dx = a.x - b.x, dy = a.y - b.y; return Math.sqrt(dx * dx + dy * dy); }
  /* distance from point p to the segment a-b (not just the endpoints). */
  function segDist(a, b, p) {
    var vx = b.x - a.x, vy = b.y - a.y, wx = p.x - a.x, wy = p.y - a.y;
    var L2 = vx * vx + vy * vy; if (L2 === 0) return dist(a, p);
    var t = (wx * vx + wy * vy) / L2; t = t < 0 ? 0 : t > 1 ? 1 : t;
    return dist({ x: a.x + t * vx, y: a.y + t * vy }, p);
  }
  /* does a pointer path traverse the stroke's checkpoints IN ORDER (within tol)?
     POINT-TO-SEGMENT: a checkpoint counts if ANY drawn segment passes within TOL
     of it (not just a sampled vertex), and one segment may cover several
     checkpoints (the inner while). This makes a real/fast drag — which emits far
     fewer pointer samples than there are checkpoints — complete the trace, while
     order/direction stay strict (cp only advances forward) and a garbage path
     (segments nowhere near the checkpoints) still fails. */
  function traceScore(stroke, path) {
    if (!path || path.length < 2) return false;
    var cp = 0;
    for (var i = 0; i < path.length - 1 && cp < stroke.length; i++) {
      while (cp < stroke.length && segDist(path[i], path[i + 1], stroke[cp]) <= TOL) cp++;
    }
    return cp >= stroke.length;
  }
  /* STRICT order: a stroke is accepted only when it is the NEXT one AND (the
     pointer path traverses its checkpoints in order, OR an ordered-tap fallback
     names the next stroke with no path). */
  function attemptStroke(s, idx, path) {
    if (s.stage !== 'sign') return 'not-signing';
    if (idx !== s.strokesDone) return 'wrong-order';
    var strokes = glyphFor(s.call.n);
    if (path && path.length) { if (!traceScore(strokes[idx], path)) return 'off-path'; }
    s.strokesDone++;
    return s.strokesDone >= strokes.length ? 'formed' : 'stroke-ok';
  }

  /* the COMMIT — the ONLY correctness check. Seals IFF the produced set === the
     call AND the numeral was fully formed in stroke order. */
  function commit(s) {
    var ok = (producedCount(s) === (s.call.n | 0)) && (s.strokesDone === numStrokes(s.call.n));
    s.committed = true;
    if (ok) { s.sealed = true; return 'sealed'; }
    s.wheezed = true; return 'mismatch';
  }

  function isComplete(round, s) { return s.sealed; }
  function facts(round, s) {
    return {
      n: round.call.n | 0, target: round.call.target || 'numeral',
      reactionDuringCountOut: false,                              // structural invariant
      numeralPathPresent: numeralPathPresent(s),
      strokeOrderOK: s.strokesDone === numStrokes(round.call.n),
      producedCount: producedCount(s)
    };
  }
  function snapshot(round, s) { return { call: s.call, sentCount: s.sent.length, countedSize: countedSize(s), stage: s.stage, strokesDone: s.strokesDone, committed: s.committed, sealed: s.sealed }; }

  /* ---- the SOLVER gauntlet (the gate drives these against the REAL core) ---- */
  function idealPath(stroke) { return stroke.map(function (p) { return { x: p.x, y: p.y }; }); } // a perfect on-checkpoint trace
  /* COUNT-OUT→FORM — the genuine strategy: produce exactly N (no reaction), form
     the numeral in stroke order, commit → seals EVERY round (the UNIQUE pass). */
  function countOutFormSolver(round, usePath) {
    var s = newState(round), i;
    if (isProductionAct(round)) {
      var k = round.call.kind;
      var pool = k ? s.raft.filter(function (d) { return d.kind === k; }) : s.raft;
      for (i = 0; i < round.call.n; i++) sendDuck(s, pool[i].id);
    } else { for (i = 0; i < s.brood.length; i++) countDuck(s, s.brood[i].id); }
    goToSign(s);
    var strokes = glyphFor(round.call.n);
    for (i = 0; i < strokes.length; i++) attemptStroke(s, i, usePath ? idealPath(strokes[i]) : null);
    return { result: commit(s), sealed: s.sealed };
  }
  /* FORM-WITHOUT-COUNT-OUT — form the numeral while sending 0 → for n>0 the set
     ≠ the call → no seal (set production is load-bearing). */
  function formWithoutCountOutSolver(round) {
    var s = newState(round); goToSign(s);
    var strokes = glyphFor(round.call.n);
    for (var i = 0; i < strokes.length; i++) attemptStroke(s, i, null);
    return { result: commit(s), sealed: s.sealed };
  }
  /* STOP-ON-REACTION — sends one duck and inspects the return for any seal/
     correctness signal to halt on. There is none → returns the absence proof. */
  function stopOnReactionSolver(round) {
    if (!isProductionAct(round)) return { skip: true };
    var s = newState(round), r = sendDuck(s, s.raft[0].id);
    var hasSignal = !!(r && (r.sealed !== undefined || r.correct !== undefined || r.count !== undefined || r.reachedTarget !== undefined));
    return { hasSignalToHaltOn: hasSignal, reactionDuringCountOut: facts(round, s).reactionDuringCountOut };
  }
  /* SCRIBBLE — produces N correctly but drags a garbage pointer path → off-path
     → strokes never complete → commit mismatch. */
  function scribbleSolver(round) {
    var s = newState(round), i;
    if (isProductionAct(round)) { var k = round.call.kind, pool = k ? s.raft.filter(function (d) { return d.kind === k; }) : s.raft; for (i = 0; i < round.call.n; i++) sendDuck(s, pool[i].id); }
    else { for (i = 0; i < s.brood.length; i++) countDuck(s, s.brood[i].id); }
    goToSign(s);
    var garbage = [{ x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }];
    attemptStroke(s, 0, garbage);                                 // off-path → strokesDone stays 0
    return { result: commit(s), sealed: s.sealed, strokesDone: s.strokesDone };
  }
  /* OUT-OF-ORDER — taps stroke 2 before stroke 1 (multi-stroke digits). */
  function outOfOrderSolver(round) {
    if (numStrokes(round.call.n) < 2) return { skip: true };
    var s = newState(round); goToSign(s);
    return { result: attemptStroke(s, 1, null) };                  // expect 'wrong-order'
  }

  global.NumeralTraceCore = {
    GLYPHS: GLYPHS, TOL: TOL, glyphFor: glyphFor, numStrokes: numStrokes, numeralFor: numeralFor, isProductionAct: isProductionAct,
    newState: newState, sendDuck: sendDuck, recallDuck: recallDuck, sentCount: sentCount, countDuck: countDuck, countedSize: countedSize,
    numeralPathPresent: numeralPathPresent, countComplete: countComplete, goToSign: goToSign, backToRaft: backToRaft,
    producedCount: producedCount, traceScore: traceScore, attemptStroke: attemptStroke, commit: commit, isComplete: isComplete, facts: facts, snapshot: snapshot,
    SOLVERS: { countOutFormSolver: countOutFormSolver, formWithoutCountOutSolver: formWithoutCountOutSolver, stopOnReactionSolver: stopOnReactionSolver, scribbleSolver: scribbleSolver, outOfOrderSolver: outOfOrderSolver }
  };

}(typeof window !== 'undefined' ? window : this));
