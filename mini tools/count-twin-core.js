/* =====================================================================
   CORE — Count Twin  (count-twin-core.js)
   ---------------------------------------------------------------------
   Generic, LOCALE-NEUTRAL "reproduce a model's CARDINALITY across
   DECORRELATED arrangements" cognition (the spec's `engine-count-twin.js`).
   First skin: "Twinsies" — CCSS K.CC.B.5 (count "how many?" + count out N).
   The REVERSE of filling a pre-structured ten-frame: a GIVEN model in one
   arrangement, the child counts it, then builds a twin of the SAME MANY on a
   NEUTRAL plate whose shape DIFFERS (so shape-copying yields the wrong count
   — only the number bridges). Win on the child's DECLARE ("We're twins!"),
   never on a live auto-match.

   The anti-cheat lives in the FEEDBACK CHANNEL: feedback is BINARY — twins or
   not, with NO direction / magnitude / count / pairing. feedback(n−1) and
   feedback(n+1) are byte-identical → a respond-to-the-nudge hill-climb cannot
   converge (the Game-7-beam / Game-10-thread leak, closed). Validity DERIVED
   (placed === the count the child produced), NO stored answer. Pure functions,
   no DOM. Mirrors compound-order / retell-story / draw-partition cores.
   ===================================================================== */
(function (global) {
  'use strict';

  /* coarse arrangement FAMILY — decorrelation is family(build) ≠ family(model) */
  function modelCoarse(round) {
    if (round.source === 'numeral') return 'numeral';
    var a = round.model.arrangement;
    return a === 'array' ? 'grid' : a === 'scattered' ? 'scatter' : 'row'; // line/circle → row (count-along)
  }
  function buildCoarse(round) {
    var b = round.buildFamily;
    return b === 'ten-frame' ? 'grid' : b === 'jar' ? 'scatter' : 'row'; // track/line → row
  }
  function arrangementFamily(round, which) { return which === 'build' ? buildCoarse(round) : modelCoarse(round); }
  function decorrelated(round) { if (round.source === 'numeral') return true; return modelCoarse(round) !== buildCoarse(round); }

  function isAssessment(round) { return round.assessment !== false; }   // default true; the on-ramp is explicitly false
  function requiresCover(round) { return !!round.cover; }
  function targetN(round) { return round.model.n; }
  function capacityFor(round) { return round.buildFamily === 'ten-frame' ? 20 : Math.max(round.model.n + 3, 10); } // ALWAYS > n

  /* validity DERIVED — checked ONLY on the declare; placed === the count the child produced */
  function validate(round, placed) { return placed === round.model.n; }

  /* the ONLY feedback channel — BINARY, undirected. No direction/magnitude/count/pairing.
     feedback(n−1) and feedback(n+1) MUST be byte-identical (the anti-nudge keystone). */
  function feedback(round, placed) { return { twins: placed === round.model.n }; }

  /* ---- the SOLVER gauntlet (the gate drives these) ---- */
  function countCorrect(round) { return round.model.n; }                                  // the unique passing class
  // the respond-to-the-nudge hill-climb: declare → read BINARY feedback → adjust. With seeFeedback it tries to
  // exploit the wrong-signal (but it's directionless → a random ±step); blind ignores it. The gate proves SAME
  // convergence (the binary channel carries no localizing signal — the #10 seen-vs-hidden analog).
  function nudgeClimber(round, rng, opts) {
    var K = opts.K || 40, cap = capacityFor(round), placed = 1 + Math.floor(rng() * cap);
    for (var t = 0; t < K; t++) {
      var res = feedback(round, placed);
      if (res.twins) return { placed: placed, calls: t + 1, solved: true };
      if (opts.seeFeedback) { placed = placed + (rng() < 0.5 ? -1 : 1); if (placed < 1) placed = 1; if (placed > cap) placed = cap; } // directionless ±1 (binary gives no direction)
      else { placed = 1 + Math.floor(rng() * cap); }                                       // blind: fresh random
    }
    return { placed: placed, calls: K, solved: false };
  }
  function subitizeSolver(round, rng) { return round.model.n <= 4 ? round.model.n : (1 + Math.floor(rng() * capacityFor(round))); } // random for n≥5 → fails the deck

  global.CountTwinCore = {
    validate: validate, feedback: feedback,
    arrangementFamily: arrangementFamily, decorrelated: decorrelated,
    isAssessment: isAssessment, requiresCover: requiresCover, targetN: targetN, capacityFor: capacityFor,
    SOLVERS: { countCorrect: countCorrect, nudgeClimber: nudgeClimber, subitizeSolver: subitizeSolver }
  };

}(typeof window !== 'undefined' ? window : this));
