/* =====================================================================
   CORE — The Echo Grove  (echo-grove-core.js)
   ---------------------------------------------------------------------
   The cognition core for Game-82 "The Echo Grove" (CCSS 3.OA.A.1 —
   INTERPRET products of whole numbers: read the × rune as equal-groups
   STRUCTURE). Re-centered (per game-designs/equal-groups-01.md) onto
   READ / DISCRIMINATE, never construction:

     The child reads a rune "g × s" and picks the tree that is g groups
     of s — among SAME-TOTAL decoys. The total is held CONSTANT across
     every candidate (g×s), so "compute the product" carries ZERO signal;
     the commutative twin [s,g] is always present (when g≠s) so a child
     who only knows the total, or who swaps the roles, picks WRONG. Only
     reading the symbol AS structure (g groups of s) discriminates.

   Answer is DERIVED, never stored: a round carries only {g, s, decoys};
   the correct candidate is whichever satisfies matches(rune, candidate).
   No correctIndex / answer field exists anywhere (the verify gate proves
   this + that the total is non-discriminating + the twin is a decoy).
   ===================================================================== */
(function (global) {
  'use strict';

  /* all [g, s] with g·s === total and g,s ≥ 2 (the 1×total degenerate is
     excluded — a single group / a group of one is not a discrimination). */
  function factorPairs(total) {
    var out = [];
    for (var g = 2; g <= total - 1; g++) {
      if (total % g === 0) {
        var s = total / g;
        if (s >= 2) out.push([g, s]);
      }
    }
    return out;
  }

  /* same-total decoys for (g,s): other pairs with the SAME product. The
     commutative twin [s,g] (same numbers, swapped roles) is preferred
     first — it is the load-bearing distractor (same total, different
     structure), so a role-swapper or a total-reader lands on it. */
  function sameTotalDecoys(g, s, count) {
    var all = factorPairs(g * s).filter(function (p) {
      return !(p[0] === g && p[1] === s);
    });
    all.sort(function (a, b) {
      var aTwin = (a[0] === s && a[1] === g) ? 0 : 1;
      var bTwin = (b[0] === s && b[1] === g) ? 0 : 1;
      return aTwin - bTwin;
    });
    return all.slice(0, count || 2);
  }

  /* the ONLY discriminator: does this grouping match the rune's structure?
     (g groups of s — order matters; the twin s groups of g does NOT match). */
  function matches(rune, grouping) {
    return rune.g === grouping.g && rune.s === grouping.s;
  }

  /* a round's candidate groupings (correct first, then decoys). The engine
     SHUFFLES this (position is decorrelated) and derives the correct one
     via matches() — there is no stored index. */
  function candidates(round) {
    var list = [{ g: round.g, s: round.s }];
    (round.decoys || []).forEach(function (d) { list.push({ g: d[0], s: d[1] }); });
    return list;
  }

  /* the round pool. Targets chosen so every product has ≥2 same-total
     factor-pairs ≥2 (3 candidates/round), factors ≤10, products ≤24
     (Grade-3 equal-groups band). The twin is present in all but the
     square (4,4). The order is shuffled per mount by the shell. */
  var TARGETS = [
    [3, 4],  /* 12 */
    [2, 6],  /* 12 */
    [4, 3],  /* 12 */
    [2, 8],  /* 16 */
    [4, 4],  /* 16 (no twin; decoys 2×8, 8×2) */
    [3, 6],  /* 18 */
    [2, 9],  /* 18 */
    [4, 5],  /* 20 */
    [3, 8],  /* 24 */
    [4, 6]   /* 24 */
  ];

  function buildRounds() {
    return TARGETS.map(function (t) {
      return {
        g: t[0],
        s: t[1],
        decoys: sameTotalDecoys(t[0], t[1], 2),
        promptKey: 'find',
        promptArgs: { g: t[0], s: t[1] }
      };
    });
  }

  global.EchoGroveCore = {
    total: function (g, s) { return g * s; },
    factorPairs: factorPairs,
    sameTotalDecoys: sameTotalDecoys,
    matches: matches,
    candidates: candidates,
    TARGETS: TARGETS,
    buildRounds: buildRounds
  };

}(typeof window !== 'undefined' ? window : this));
