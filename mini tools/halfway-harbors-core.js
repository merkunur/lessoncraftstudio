/* =====================================================================
   THE HALFWAY HARBORS — CORE  (halfway-harbors-core.js)  [CLARITY REBUILD]
   ---------------------------------------------------------------------
   CCSS 3.NBT.A.1 (Grade 3) — round whole numbers to the nearest 10 or 100.
   Pure cognition, NO DOM. 0 lines to ANY existing core + lcs-shell.{js,css}.

   CLARITY-FIRST rebuild (2026-06-26): the prior abstract grade-the-inverse
   design (band edges / which-place) was incomprehensible to a child — so this
   is a CLEAR, VISIBLE number-line rounding game: a to-scale line of round-
   number HARBORS, the boat at its true position, the halfway buoy at the
   midpoint. The child SEES which harbor the boat is nearer to. (The #81 SMART-
   solver anti-cheat rigor is deliberately set aside for clarity — the right
   trade for a free practice activity.)

   THE ANSWER IS DERIVED, NEVER STORED: nearestHarbor / midpoint are computed
   from {target, harbors} at grade-time; a hand-authored answer is ignored.

   3 cogs: nearest (round to nearest 10) · big-trail (nearest 100) · halfway
   (tap the midpoint between two harbors). round-half-up ties → the larger.
   ===================================================================== */
(function (global) {
  'use strict';

  function roundHalfUp(t, p) { return Math.round(t / p) * p; }   /* JS round = half-up for positives */
  function midpoint(a, b) { return (a + b) / 2; }

  /* the round-number harbor the boat is nearest to (ties → the LARGER, matching
     round-half-up). Pure function of target + the harbors shown on the line. */
  function nearestHarbor(target, harbors) {
    var best = harbors[0], bestD = Infinity;
    for (var i = 0; i < harbors.length; i++) {
      var d = Math.abs(target - harbors[i]);
      if (d < bestD || (d === bestD && harbors[i] > best)) { bestD = d; best = harbors[i]; }
    }
    return best;
  }

  function oracle(round) {
    if (round.cog === 'halfway') return (round.buoyMarkers || []).indexOf(midpoint(round.harbors[0], round.harbors[1]));
    return (round.harbors || []).indexOf(nearestHarbor(round.target, round.harbors));   /* nearest / big-trail */
  }
  function isAnswer(round, resp) { return Number(resp) === Number(oracle(round)); }

  /* the boat's to-scale fraction along the harbor line (for rendering only) */
  function boatFraction(round) {
    var hs = round.harbors, lo = Math.min.apply(null, hs), hi = Math.max.apply(null, hs);
    return hi === lo ? 0.5 : (round.target - lo) / (hi - lo);
  }

  function snapshot(round) {
    var o = { id: round.id, cog: round.cog, harbors: (round.harbors || []).slice() };
    if (round.cog === 'halfway') o.buoyMarkers = (round.buoyMarkers || []).slice();
    else { o.target = round.target; o.place = round.place; }
    return o;   /* NO stored answer / nearest / midpoint */
  }

  function distinctHarbors(round) {
    var seen = {}, hs = round.harbors || [];
    for (var i = 0; i < hs.length; i++) { if (seen[hs[i]]) return false; seen[hs[i]] = 1; }
    return true;
  }

  function facts(round) {
    var f = { cog: round.cog, answerDerivedNotStored: true };
    f.distinctHarbors = distinctHarbors(round);
    f.correctNotIndex0 = oracle(round) > 0;
    if (round.cog === 'halfway') {
      f.midpointPresent = (round.buoyMarkers || []).indexOf(midpoint(round.harbors[0], round.harbors[1])) >= 0;
      f.threeMarkers = (round.buoyMarkers || []).length >= 3;
      f.nearest100 = false;
    } else {
      f.nearest100 = round.place === 100;
      f.bracketed = Math.min.apply(null, round.harbors) <= round.target && round.target <= Math.max.apply(null, round.harbors);
      f.matchesRoundHalfUp = nearestHarbor(round.target, round.harbors) === roundHalfUp(round.target, round.place);
      f.fourHarbors = (round.harbors || []).length >= 3;   /* ≥3 options → not a coin-flip */
    }
    return f;
  }

  function deckFacts(rounds) {
    var distinctCogs = {}, ex = {}, nearest100 = 0;
    rounds.forEach(function (r) { distinctCogs[r.cog] = 1; ex[r.id] = 1; if (r.place === 100) nearest100++; });
    return { total: rounds.length, distinctCogs: Object.keys(distinctCogs), distinctExercises: Object.keys(ex).length, nearest100Count: nearest100 };
  }

  function audit(round) {
    var o = { id: round.id, cog: round.cog, harbors: round.harbors };
    if (round.cog === 'halfway') { o.mid = midpoint(round.harbors[0], round.harbors[1]); o.markers = round.buoyMarkers; o.oracle = oracle(round); }
    else { o.target = round.target; o.place = round.place; o.nearest = nearestHarbor(round.target, round.harbors); o.roundHalfUp = roundHalfUp(round.target, round.place); o.oracle = oracle(round); }
    return o;
  }

  global.HalfwayHarborsCore = {
    roundHalfUp: roundHalfUp, midpoint: midpoint, nearestHarbor: nearestHarbor, boatFraction: boatFraction,
    oracle: oracle, isAnswer: isAnswer, snapshot: snapshot, facts: facts, deckFacts: deckFacts, audit: audit
  };

}(typeof window !== 'undefined' ? window : this));
