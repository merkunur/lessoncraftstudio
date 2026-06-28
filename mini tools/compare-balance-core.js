/* =====================================================================
   CORE — Compare Balance  (compare-balance-core.js)
   ---------------------------------------------------------------------
   Generic, LOCALE-NEUTRAL "compare two groups by MATCHING and COUNTING —
   judge MORE / FEWER / SAME, defeating the perceptual cue" cognition. First
   skin: "The Friendship Bridge" — CCSS K.CC.C.6 (identify whether one group
   is greater than / less than / equal to another, ≤10, by matching/counting).
   Head of the quantifying-comparison family.

   THE SPINE: two groups (Big's friends + Bit's friends) of discrete fuzzballs.
   The child pairs them 1-to-1 into a no-crossing LADDER (the matching strategy
   made physical); the unmatched LEFTOVER = the "more". The relation is the
   child's COMMITTED word — never an auto-rendered "6 > 5".

   THE WHOLE POINT — DEFEAT PERCEPTION. ≥⅓ of the deck is MISLEADING: a spread
   row of 5 LOOKS longer/more than a tight cluster of 6 (the Piagetian length↔
   number conflation). The eyeball heuristic (count × layout-spread) is encoded
   here so the gate can PROVE it fails below chance on the misleading subset,
   while matching/counting passes 100%.

   LOCKED ANTI-CHEATS (all gate-proven against this REAL core):
     • NO PERCEPTUAL PROXY — `perceptualSolver` (judge by the longer/more-spread
       side) is WRONG on every misleading round. `matchSolver` (judge by the
       true count) is the UNIQUE pass. The beam never carries the answer (it is
       a skin element, locked flat; the core has no tilt/weight field at all).
     • THE COMPARISON IS THE CHILD'S — `judge(state, choice)` checks the chosen
       relation WORD against the ground-truth count-relation; the core NEVER
       emits a >/</= comparison of the two cardinals. `correctChoice` is the
       only resolver, returns 'left'/'right'/'same', never a number.
     • COUNT-NOT-LENGTH — group sizes are integer counts of discrete discs.
     • RELATION WORDS ONLY — left/right/same map to MORE/FEWER/SAME in the skin;
       no inequality symbols anywhere in the cognition.

   Pure functions, no DOM. Mirrors rail-decompose / ten-frame-tank / estimate-jar.
   ===================================================================== */
(function (global) {
  'use strict';

  /* the eyeball heuristic: how "much" a group LOOKS, = count × layout spread.
     A spread/scattered row reads as MORE than a tight cluster of equal-or-more
     items — the very illusion the standard extinguishes. Used ONLY to (a) let
     the gate prove perception fails on the misleading subset and (b) let the
     skin choose honest-vs-illusory layouts. NEVER part of the answer path. */
  var SPREAD = { cluster: 0.62, grid: 0.78, row: 1.0, scatter: 1.12, spread: 1.45 };
  function spreadOf(layout) { return SPREAD[layout] != null ? SPREAD[layout] : 1.0; }
  function perceptualMag(group) { return group.count * spreadOf(group.layout); }
  /* which side LOOKS like more (or 'same' when they look within half a unit). */
  function perceptualSideOf(round) {
    var ml = perceptualMag(round.left), mr = perceptualMag(round.right);
    if (Math.abs(ml - mr) < 0.5) return 'same';
    return ml > mr ? 'left' : 'right';
  }

  function newState(round) {
    var L = [], R = [], i;
    for (i = 0; i < round.left.count; i++) L.push('L' + i);
    for (i = 0; i < round.right.count; i++) R.push('R' + i);
    return { round: round, L: L, R: R, pairs: {}, rpairs: {}, counted: {}, prediction: null, statedDiff: null, judged: null, produced: false };
  }

  function leftCount(s) { return s.L.length; }
  function rightCount(s) { return s.R.length; }

  /* the TRUTH — by count, never by length. */
  function relation(s) { var lc = s.L.length, rc = s.R.length; return lc > rc ? 'left' : (rc > lc ? 'right' : 'same'); }

  /* the child's 1-to-1 pairing (the match-pairs tap-to-pair shape). No auto-pair;
     the leftover emerges only from the child's own pairings. */
  function addPair(s, lid, rid) {
    if (s.pairs[lid] !== undefined || s.rpairs[rid] !== undefined) return false;
    if (s.L.indexOf(lid) < 0 || s.R.indexOf(rid) < 0) return false;
    s.pairs[lid] = rid; s.rpairs[rid] = lid; return true;
  }
  function removePair(s, lid) { var rid = s.pairs[lid]; if (rid === undefined) return false; delete s.pairs[lid]; delete s.rpairs[rid]; return true; }
  function pairCount(s) { return Object.keys(s.pairs).length; }
  function leftovers(s) {
    var lo = { left: [], right: [] }, i;
    for (i = 0; i < s.L.length; i++) if (s.pairs[s.L[i]] === undefined) lo.left.push(s.L[i]);
    for (i = 0; i < s.R.length; i++) if (s.rpairs[s.R[i]] === undefined) lo.right.push(s.R[i]);
    return lo;
  }

  /* tap-to-count (the count-judge strategy). */
  function markCounted(s, id) { s.counted[id] = true; return countedOn(s, id.charAt(0) === 'L' ? 'left' : 'right'); }
  function countedOn(s, side) { var arr = side === 'left' ? s.L : s.R, n = 0, i; for (i = 0; i < arr.length; i++) if (s.counted[arr[i]]) n++; return n; }

  /* make-equal / build-equal — add or remove a friend on a side. */
  function addFriend(s, side) { if (side === 'left') s.L.push('L' + s.L.length); else s.R.push('R' + s.R.length); s.produced = true; return true; }
  function removeFriend(s, side) {
    var arr = side === 'left' ? s.L : s.R; if (!arr.length) return false;
    var id = arr.pop();
    if (id.charAt(0) === 'L') { var rid = s.pairs[id]; if (rid !== undefined) { delete s.pairs[id]; delete s.rpairs[rid]; } }
    else { var lid = s.rpairs[id]; if (lid !== undefined) { delete s.rpairs[id]; delete s.pairs[lid]; } }
    return true;
  }

  /* the difference, for how-many-more. */
  function howManyMore(s) { return Math.abs(s.L.length - s.R.length); }
  function setDiff(s, n) { s.statedDiff = (n == null ? null : (n | 0)); return s.statedDiff; }
  function predict(s, side) { s.prediction = side; return side; }

  /* THE ONLY answer resolver. Returns a relation WORD slot ('left'/'right'/
     'same'), honoring the round's question word (more vs fewer). Never a number,
     never a symbol. */
  function correctChoice(s) {
    var rel = relation(s);
    if (rel === 'same') return 'same';
    if (s.round.compareWord === 'fewer') return rel === 'left' ? 'right' : 'left';
    return rel; // 'more' (default)
  }
  function judge(s, choice) { s.judged = choice; return choice === correctChoice(s); }

  function facts(s) {
    var ps = perceptualSideOf(s.round), ms = relation(s);
    return { leftCount: s.L.length, rightCount: s.R.length, perceptualSide: ps, matchSide: ms, misleading: ps !== ms };
  }

  function isComplete(round, s) {
    if (round.ask === 'how-many-more') return s.statedDiff != null && s.statedDiff === howManyMore(s);
    if (round.ask === 'make-equal' || round.ask === 'build-equal') return s.produced && s.L.length === s.R.length;
    return s.judged != null && s.judged === correctChoice(s); // identify
  }

  function snapshot(round, s) {
    return { left: s.L.length, right: s.R.length, pairs: pairCount(s), leftovers: leftovers(s), relation: relation(s), correctChoice: correctChoice(s), facts: facts(s), complete: isComplete(round, s) };
  }

  /* ---- the SOLVER gauntlet (the gate drives these against the REAL core) ---- */
  /* MATCH/COUNT — the genuine strategy. Pairs (or counts), then answers by the
     TRUE count-relation / the true difference / builds to equal. The UNIQUE pass
     across the whole deck. */
  function matchSolver(round) {
    var s = newState(round), guard = 0;
    if (round.ask === 'how-many-more') { var i, n = Math.min(s.L.length, s.R.length); for (i = 0; i < n; i++) addPair(s, 'L' + i, 'R' + i); setDiff(s, howManyMore(s)); return { complete: isComplete(round, s) }; }
    if (round.ask === 'make-equal' || round.ask === 'build-equal') { while (s.L.length !== s.R.length && guard++ < 40) { if (s.L.length < s.R.length) addFriend(s, 'left'); else addFriend(s, 'right'); } return { complete: isComplete(round, s) }; }
    var m = Math.min(s.L.length, s.R.length), k; for (k = 0; k < m; k++) addPair(s, 'L' + k, 'R' + k); // the ladder
    judge(s, correctChoice(s)); return { complete: isComplete(round, s), correct: true };
  }
  /* PERCEPTION — judge by the side that LOOKS bigger (the longer/more-spread
     row), no counting. WRONG on every misleading round (the cheat to defeat). */
  function perceptualSolver(round) {
    if (round.ask && round.ask !== 'identify') return { skip: true };
    var s = newState(round), p = perceptualSideOf(round);
    var choice = (p === 'same') ? 'same' : (round.compareWord === 'fewer' ? (p === 'left' ? 'right' : 'left') : p);
    var ok = judge(s, choice);
    return { correct: ok, perceptualSide: p, matchSide: relation(s) };
  }
  /* FREE-TILE — the single perceptual tap with NO pairing/counting (= what the
     free which-more tile allows). Alias of perception; proves THIS activity is
     not completable by a perceptual tap on the misleading subset. */
  function freeTapSolver(round) { return perceptualSolver(round); }

  global.CompareBalanceCore = {
    SPREAD: SPREAD, spreadOf: spreadOf, perceptualMag: perceptualMag, perceptualSideOf: perceptualSideOf,
    newState: newState, leftCount: leftCount, rightCount: rightCount, relation: relation,
    addPair: addPair, removePair: removePair, pairCount: pairCount, leftovers: leftovers,
    markCounted: markCounted, countedOn: countedOn, addFriend: addFriend, removeFriend: removeFriend,
    howManyMore: howManyMore, setDiff: setDiff, predict: predict, correctChoice: correctChoice, judge: judge,
    facts: facts, isComplete: isComplete, snapshot: snapshot,
    SOLVERS: { matchSolver: matchSolver, perceptualSolver: perceptualSolver, freeTapSolver: freeTapSolver }
  };

}(typeof window !== 'undefined' ? window : this));
