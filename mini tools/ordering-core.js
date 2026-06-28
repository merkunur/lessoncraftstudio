/* =====================================================================
   CORE — Ordering / Seriation  (ordering-core.js)
   ---------------------------------------------------------------------
   Generic, representation-agnostic seriation cognition (the spec's
   `engine-ordering.js`). First skin: "Grandpa Pip's Nesting Pots" —
   CCSS K.CC.C.7 (compare written NUMERALS 1–10). The child nests pots
   biggest-NUMBER → smallest-NUMBER; each next pot must hold FEWER friends
   than the current innermost. The graded comparison reads the belly
   NUMERAL (`.value`), never the pot's drawn size (`.footprint`).

   THE LOAD-BEARING INVARIANT: `isValid(selected, innermost)` compares
   `.value` ONLY — so "nest by size" cannot win. Pot footprint is:
     • graduated (correlated with value) ONLY on the R1/R2 on-ramp,
     • sameFootprint (all equal → zero size signal) on the standard rounds,
     • inverse (anti-correlated) on the R10 capstone "trust the number".
   The correct nest order is DERIVED (sort by value desc), never stored.

   A "round" = { id, tier, sizeMode, rep, items:[{value, footprint, rep}],
   insertion?, gapFill?, equalEdge?, twoDigit? }. Pure functions + no DOM
   (mirrors mosaic-menders-core.js). The skin owns rendering + tray order.
   ===================================================================== */
(function (global) {
  'use strict';

  /* ---- the 8 distinct rounds (tier-ramped; §A.13.60 ≥7 + reshuffle).
     `items` are authored in a NON-value order on purpose (so an "input
     order" / "biggest footprint first" reader does not get the answer for
     free). `footprint` is assigned by sizeMode in buildRounds(). ---- */
  var ROUNDS = [
    /* Tier 1 on-ramp — numeral + visible dots; footprint graduated (size
       tracks number here, the gentle introduction). */
    { id: 'two-pots',   tier: 1, sizeMode: 'graduated',     rep: 'numeral-dots',      values: [6, 9] },
    { id: 'tuck-three', tier: 1, sizeMode: 'graduated',     rep: 'numeral-dots',      values: [5, 8, 2] },
    /* Tier 2 standard — numeral primary, dots peek-on-tap; identical footprint
       (size ⊥ value). R3 is the clean assessed K.CC.C.7 surface; R4 inserts
       one pot at a time. */
    { id: 'same-coat',  tier: 2, sizeMode: 'sameFootprint', rep: 'numeral-dotpeek',   values: [7, 9, 2, 4] },
    { id: 'one-at-time', tier: 2, sizeMode: 'sameFootprint', rep: 'numeral-dotpeek', insertion: true, values: [5, 10, 3, 7] },
    /* Tier 3 depth — numeral only. gap-fill, equal-twin edge, two-digit. */
    { id: 'whos-missing', tier: 3, sizeMode: 'sameFootprint', rep: 'numeral', gapFill: true, values: [7, 3, 9, 1, 5] },
    { id: 'twin-pots',  tier: 3, sizeMode: 'sameFootprint', rep: 'numeral', equalEdge: true, values: [8, 6, 3, 6] },
    { id: 'big-belly',  tier: 3, sizeMode: 'sameFootprint', rep: 'numeral', twoDigit: true, values: [31, 40, 12, 23] },
    /* Tier 4 capstone — footprint INVERSE to value ("trust the number, not
       the size"). */
    { id: 'sneakiest',  tier: 4, sizeMode: 'inverse',       rep: 'numeral', values: [9, 4, 6, 2] }
  ];

  /* footprint scale: 1 (smallest pot) … 5 (biggest pot). For sameFootprint
     every pot is the SAME middle size (3) → no size signal at all. */
  var SAME_SIZE = 3;

  function assignFootprints(values, sizeMode) {
    var n = values.length;
    /* rank by value ascending: rankOf[value] = 0..n-1 */
    var sorted = values.slice().sort(function (a, b) { return a - b; });
    return values.map(function (v) {
      if (sizeMode === 'sameFootprint') return SAME_SIZE;
      var rank = sorted.indexOf(v);                 // 0 = smallest value
      if (sizeMode === 'graduated') return rank + 1;            // bigger value → bigger pot
      if (sizeMode === 'inverse')   return n - rank;            // bigger value → smaller pot
      return SAME_SIZE;
    });
  }

  function buildRound(r) {
    var foot = assignFootprints(r.values, r.sizeMode);
    var items = r.values.map(function (v, i) {
      return { value: v, footprint: foot[i], rep: r.rep };
    });
    return {
      id: r.id, tier: r.tier, sizeMode: r.sizeMode, rep: r.rep,
      insertion: !!r.insertion, gapFill: !!r.gapFill, equalEdge: !!r.equalEdge, twoDigit: !!r.twoDigit,
      items: items
    };
  }

  function buildRounds() { return ROUNDS.map(buildRound); }

  /* ---- THE COMPARATOR — reads .value ONLY (the K.CC.C.7 invariant). A pot
     is legal to nest INTO the current innermost iff it holds fewer friends.
     Empty nest (innermost == null): only the BIGGEST remaining pot is a
     legal base (place biggest first → never a dead-end). ---- */
  function isValid(selected, innermost) {
    if (!selected) return false;
    if (innermost == null) return true;             // base placement (pair with legalBase)
    return selected.value < innermost.value;        // .value ONLY — never footprint
  }

  /* the legal moves right now, given the unplaced tray + the innermost placed
     pot (null when the nest is empty). Empty nest → the max-value tray pot(s).
     Equal-value twins are NOT legal to nest into each other. */
  function legalMoves(tray, innermost) {
    if (!tray.length) return [];
    if (innermost == null) {
      var max = tray.reduce(function (m, p) { return p.value > m ? p.value : m; }, -Infinity);
      return tray.filter(function (p) { return p.value === max; });
    }
    return tray.filter(function (p) { return p.value < innermost.value; });
  }

  /* the canonical solution: values strictly descending. For the equal-edge
     round the two twins can't nest — they come to rest side-by-side, so the
     "nest" is the distinct-valued chain and the twins are an aside. */
  function correctOrder(round) {
    return round.items.slice().sort(function (a, b) { return b.value - a.value; });
  }

  /* simulate placing `order` (an array of items) one-by-one; returns true iff
     every step is legal (a full valid nest). Twins that tie are skipped as
     "rest aside" (equalEdge), not failures. */
  function simulate(order) {
    var innermost = null;
    for (var i = 0; i < order.length; i++) {
      var p = order[i];
      if (innermost != null && p.value === innermost.value) continue;   // twin rests aside
      if (!isValid(p, innermost)) return false;
      innermost = p;
    }
    return true;
  }

  global.OrderingCore = {
    ROUNDS: ROUNDS,
    SAME_SIZE: SAME_SIZE,
    buildRounds: buildRounds,
    buildRound: buildRound,
    isValid: isValid,
    legalMoves: legalMoves,
    correctOrder: correctOrder,
    simulate: simulate
  };

}(typeof window !== 'undefined' ? window : this));
