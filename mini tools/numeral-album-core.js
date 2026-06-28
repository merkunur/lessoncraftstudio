/* =====================================================================
   CORE — Numeral Album  (numeral-album-core.js)
   ---------------------------------------------------------------------
   Generic, LOCALE-NEUTRAL "REPRESENT a counted quantity WITH a written
   numeral — the numeral MANUFACTURED by the count, no glyph palette"
   cognition. First skin: "Rivet's Number Forge" — CCSS K.CC.A.3 (write 0-20;
   represent a number of objects with a written numeral; 0 = a count of none).
   The 2nd collect-trade family member (sibling to curate-wing).

   THE SPINE: a binder PAGE wants a spread of distinct amounts. For each frame
   the child COUNTS the treasure (taps each object once) and the press MINTS the
   numeral FROM that count — the "3" is built from the three things. Fill the
   page → it gilds.

   LOCKED ANTI-CHEATS (all gate-proven against this REAL core):
     • NO GLYPH MENU — there is NO select/match/palette API; the numeral is
       manufactured only by `pullLever()` after counting. A symbol-matcher /
       palette-recognizer has nothing to submit (the rejected 0-9 palette was
       the symbol-matcher in a new costume).
     • COUNT-COUPLED ⇒ NON-BRUTE-FORCEABLE — `pullLever()` mints ONLY when
       `countedSize===frame.count` (or `produced===target`). A no-count commit
       wheezes; brute-force overshoots/undershoots. The 0-frame is the ONE
       deliberate exception (count nothing → "0").
     • NO ANSWER-GLYPH ON THE PAGE — `printedNumeralsOnPage` carries no glyph
       equal to the true count (verify shows a WRONG decoy; reverse = the
       labeled K.CC.B.5 exception). Quantity + minted numeral are different
       surfaces.
     • COUNT-NOT-MATCH — the cardinality is the integer count of discrete
       objects; the numeral is `String(count)` (leading-zero guard).

   Pure functions, no DOM. Mirrors rail-decompose / compare-balance / curate-wing.
   ===================================================================== */
(function (global) {
  'use strict';

  function isProduceAct(round) { return round.act_type === 'build-mint' || round.act_type === 'reverse'; }

  function newState(round) {
    return { round: round, frameIdx: 0, counted: {}, produced: 0, minted: [], wheezed: false };
  }
  function currentFrame(s) { return s.round.page.frames[s.frameIdx]; }

  /* the objects on the bench for a COUNT-mode frame: `count` target-kind +
     `distractorCount` distractor-kind (subset). Ids: 't'+i target, 'd'+i decoy. */
  function frameObjects(frame) {
    var objs = [], i, n = frame.count | 0, dn = frame.distractorCount | 0;
    for (i = 0; i < n; i++) objs.push({ id: 't' + i, kind: frame.kind || 'treasure', target: true });
    for (i = 0; i < dn; i++) objs.push({ id: 'd' + i, kind: frame.distractorKind || 'other', target: false });
    return objs;
  }

  /* the number the lever checks against (and, for non-reverse, mints). */
  function targetOf(s) { var f = currentFrame(s); return s.round.act_type === 'reverse' ? (f.numeral | 0) : (f.count | 0); }

  /* COUNT mode: register a one-to-one tap on an EXISTING object. Re-tap is a
     no-op (Set semantics). Subset: a non-target ('d') id is inert. */
  function tapObject(s, id) {
    if (isProduceAct(s.round)) return false;
    if (s.round.act_type === 'subset' && String(id).charAt(0) !== 't') return false; // distractor inert
    s.counted[id] = true; return true;
  }
  function countedSize(s) { return Object.keys(s.counted).length; }

  /* PRODUCE mode (build-mint / reverse): the child adds / removes one object. */
  function addObject(s) { if (!isProduceAct(s.round)) return false; s.produced++; return true; }
  function removeObject(s) { if (isProduceAct(s.round) && s.produced > 0) { s.produced--; return true; } return false; }

  /* the press. Mints ONLY when the child's count/production equals the target.
     count-mode → countedSize; produce-mode → produced. reverse mints no numeral
     (the bond run backward). The 0-frame mints at size 0 (the named exception). */
  function pullLever(s) {
    var tgt = targetOf(s), got = isProduceAct(s.round) ? s.produced : countedSize(s);
    if (got === tgt) {
      var numeral = (s.round.act_type === 'reverse') ? null : numeralRepresents(tgt);
      s.minted.push({ frameIdx: s.frameIdx, count: tgt, numeral: numeral, firstTry: !s.wheezed });
      s.frameIdx++; s.counted = {}; s.produced = 0; s.wheezed = false;
      return 'minted';
    }
    s.wheezed = true; return 'wheeze';
  }

  /* the written sign for a count. String(n) IS the leading-zero guard: "0" only
     alone, teens render two digits, no "03". */
  function numeralRepresents(n) { n = n | 0; if (n < 0 || n > 20) return String(n); return String(n); }

  function isComplete(round, s) { return s.frameIdx >= round.page.frames.length; }

  /* per-frame facts for the gate (no answer-glyph authored). */
  function frameFacts(round, i) {
    var f = round.page.frames[i];
    var tgt = round.act_type === 'reverse' ? (f.numeral | 0) : (f.count | 0);
    var printed = [];
    if (round.act_type === 'verify') printed = [f.claimNumeral | 0];        // a WRONG decoy (≠ count)
    else if (round.act_type === 'reverse') printed = [f.numeral | 0];       // the B.5 target glyph
    // count-mint / zero / parade / subset / build-mint: no printed numeral
    return {
      actType: round.act_type,
      target: tgt,
      trueCount: f.count | 0,
      countableTarget: f.count | 0,                                          // target-kind objects to count
      benchCardinality: isProduceAct(round) ? null : ((f.count | 0) + (f.distractorCount | 0)),
      printedNumeralsOnPage: printed,
      isAct3: round.act_type !== 'reverse',
      isProduce: isProduceAct(round),
      isZero: (f.count | 0) === 0 && round.act_type !== 'reverse'
    };
  }
  function snapshot(round, s) {
    return { frameIdx: s.frameIdx, frames: round.page.frames.length, countedSize: countedSize(s), produced: s.produced, minted: s.minted.slice(), complete: isComplete(round, s) };
  }

  /* ---- the SOLVER gauntlet (the gate drives these against the REAL core) ---- */
  /* COUNT→PRODUCE — the genuine strategy. Counts every object (or produces the
     target) on each frame → mints → advances → completes the page. The UNIQUE
     pass across the whole deck (incl. the 0-case + a teen + reverse). */
  function countProduceSolver(round) {
    var s = newState(round), guard = 0;
    while (!isComplete(round, s) && guard++ < 200) {
      var f = currentFrame(s);
      if (isProduceAct(s.round)) { var t = targetOf(s), k; for (k = 0; k < t; k++) addObject(s); }
      else { frameObjects(f).forEach(function (o) { if (round.act_type !== 'subset' || o.target) tapObject(s, o.id); }); }
      if (pullLever(s) !== 'minted') return { complete: false, failedAt: s.frameIdx };
    }
    return { complete: isComplete(round, s), minted: s.minted };
  }
  /* BRUTE-FORCE (no count) — pulls the lever without counting/producing on each
     frame. Mints ONLY a leading 0-frame (the exception); WHEEZES on any count>0
     / produce frame → never completes a non-trivial page. */
  function bruteForceSolver(round) {
    var s = newState(round), guard = 0, mintedNonZero = 0;
    while (!isComplete(round, s) && guard++ < 200) {
      var tgt = targetOf(s), wasZero = (tgt === 0 && s.round.act_type !== 'reverse');
      var r = pullLever(s);                       // commit with counted=0 / produced=0
      if (r === 'minted') { if (!wasZero) mintedNonZero++; }
      else break;                                  // wheeze → stuck
    }
    return { complete: isComplete(round, s), mintedNonZero: mintedNonZero };
  }
  /* RANDOM-COUNT — taps a WRONG number of objects (one too few) then commits →
     never lands the true count → wheezes (proves overshoot/undershoot fails). */
  function miscountSolver(round) {
    if (isProduceAct(round)) return { skip: true };
    var s = newState(round), f = currentFrame(s);
    var objs = frameObjects(f).filter(function (o) { return round.act_type !== 'subset' || o.target; });
    if (objs.length === 0) return { skip: true };                            // 0-frame: nothing to miscount
    objs.slice(0, objs.length - 1).forEach(function (o) { tapObject(s, o.id); }); // one short
    return { result: pullLever(s) };                                          // expect 'wheeze'
  }

  global.NumeralAlbumCore = {
    isProduceAct: isProduceAct, newState: newState, currentFrame: currentFrame, frameObjects: frameObjects,
    targetOf: targetOf, tapObject: tapObject, countedSize: countedSize, addObject: addObject, removeObject: removeObject,
    pullLever: pullLever, numeralRepresents: numeralRepresents, isComplete: isComplete,
    frameFacts: frameFacts, snapshot: snapshot,
    SOLVERS: { countProduceSolver: countProduceSolver, bruteForceSolver: bruteForceSolver, miscountSolver: miscountSolver }
  };

}(typeof window !== 'undefined' ? window : this));
