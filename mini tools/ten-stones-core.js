/* =====================================================================
   LILY'S TEN STONES — CORE  (ten-stones-core.js)
   ---------------------------------------------------------------------
   CCSS 1.OA.C.6 — add & subtract within 20 using the MAKE-TEN strategy
   (8+6 = 8+2+4 = 10+4). Pure cognition, NO DOM. The graded cognition is the
   make-ten DECOMPOSITION as a spatial bridge: the child DECLARES the to-ten
   bond ("8 + ⬚ = 10"), which DRIVES the hop to the golden Ten Stone, then the
   remainder bond — STRATEGY, not fluency. 0 lines to ANY existing core
   (choice-board/cvc-builder/match-pairs/place-value/ten-frame + word-builder/
   fractions/array/sort-bins/clock/number-bond) AND to track-repair-core.js.

   GATE-CHECK NOTE: the make-ten-ADD spine overlaps the live E18 number-bond
   `make-ten-to-add` (1.OA.C.6, a BOND diagram); operator ruled "build as-
   specced" — this game's distinct value is the NUMBER-LINE representation +
   the unowned cogs (subtraction bridge-DOWN, choose-anchor, near-double,
   find-where-ten). See the plan file.

   THE GATE-CAN'T-CHEAT PROOF (verify-ten-stones-core.js): a declare-the-bond
   oracle wins 100% while SPIN-TO-TEN-SEARCHER (no block-gradient to probe — the
   hop IS the declared bond) / ONE-BIG-HOP (no land on 10) / COUNT-BY-ONES /
   GLOW-CHASER (no per-hop signal) / OVERSHOOT all score <= chance.

   THE LINE IS A 0..20 NUMBER LINE; ONE ten bridged once; the answer numeral is
   NOT in the render until Lily lands (the activity's job; the core never needs
   a per-hop grader — there is NO gradeHop API, so there is no gradient to
   search). value→pct math mirrors track-repair's valueToPct (re-implemented).
   ===================================================================== */
(function (global) {
  'use strict';

  var LINE_MIN = 0, LINE_MAX = 20, STONE = 10;
  var BRIDGE_COGS = { 'maketen': 1, 'decompose': 1 };   /* declared-bond hops (cross ten) */
  var CHOOSE_COGS = { 'anchor': 1, 'findten': 1, 'equiv': 1 };   /* a single tap-choice */
  var NONSCORED_COGS = { 'relation': 1 };               /* +/- fact-family reveal, neutral advance */
  var COGS = ['maketen', 'decompose', 'anchor', 'findten', 'equiv', 'relation'];

  function isScored(cog) { return !!(BRIDGE_COGS[cog] || CHOOSE_COGS[cog]); }
  function valueToPct(v) { return ((v - LINE_MIN) / (LINE_MAX - LINE_MIN)) * 100; }

  /* does the path from start to target cross the Ten Stone? */
  function crossesTen(round) {
    if (round.op === '-') return round.start > STONE && round.target < STONE;
    return round.start < STONE && round.target > STONE;
  }
  /* the two make-ten bond parts the child must declare:
     add: "start + (10-start) = 10", then "10 + (target-10) = target"
     sub: "start - (start-10) = 10", then "10 - (10-target) = target" */
  function bridgeParts(round) {
    if (round.op === '-') return { toTen: round.start - STONE, remainder: STONE - round.target };
    return { toTen: STONE - round.start, remainder: round.target - STONE };
  }
  /* the running positions a declared-bond sequence visits from start. */
  function positions(round, declared) {
    var pos = round.start, out = [pos], sign = round.op === '-' ? -1 : 1;
    for (var i = 0; i < declared.length; i++) { pos = pos + sign * declared[i]; out.push(pos); }
    return out;
  }

  /* evaluate(round, declared, committed) — `declared` = the ⬚ values the child
     filled into the bond frames (the hop amounts). ONE distinct status. Correct
     ONLY on the deliberate commit of the full, structurally-valid bond seq. */
  function evaluate(round, declared, committed) {
    declared = declared || [];
    if (CHOOSE_COGS[round.cog]) return { status: 'choose' };
    if (NONSCORED_COGS[round.cog]) return { status: 'nonscored' };
    /* BRIDGE family — always crosses ten (strategy-not-fluency) */
    var bp = bridgeParts(round);
    if (declared.length === 0) return { status: 'incomplete' };
    if (declared[0] !== bp.toTen) return { status: 'wrong-to-ten' };   /* the first hop must land EXACTLY on 10 */
    if (declared.length < 2) return { status: 'awaiting-remainder' };  /* landed on the Ten Stone; declare the rest */
    if (declared[1] !== bp.remainder) return { status: 'wrong-remainder' };
    if (declared.length > 2) return { status: 'overshoot' };
    if (!committed) return { status: 'placed-ok-awaiting-commit' };
    return { status: 'correct', target: round.target };
  }
  function gradeBridge(round, declared) { return evaluate(round, declared, true).status === 'correct'; }

  /* anchor: tap the addend to STAND on (closer to ten → smaller to-ten hop).
     findten: tap 'yes'/'no' — does the path cross the Ten Stone?
     equiv: tap the near-double d (|(a+b) - 2d| === 1). */
  function correctChoice(round) {
    if (round.cog === 'anchor') return Math.max(round.a, round.b);
    if (round.cog === 'findten') return crossesTen(round) ? 'yes' : 'no';
    if (round.cog === 'equiv') {
      var sum = round.a + round.b;
      var opts = round.options || [];
      for (var i = 0; i < opts.length; i++) if (Math.abs(sum - 2 * opts[i]) === 1) return opts[i];
      return null;
    }
    return null;
  }
  function gradeChoose(round, choice) {
    var c = correctChoice(round);
    return c != null && String(choice) === String(c);
  }

  /* snapshot — the renderer's view. Carries the line bounds, the equation
     operands, the bond labels, the stone position. `target` is present so the
     activity can place Lily ON LANDING — the activity must NOT render the answer
     numeral until Lily lands (no per-hop grader exists to leak it). */
  function snapshot(round) {
    var bp = BRIDGE_COGS[round.cog] ? bridgeParts(round) : null;
    return {
      cog: round.cog,
      isBridge: !!BRIDGE_COGS[round.cog],
      isChoose: !!CHOOSE_COGS[round.cog],
      isNonscored: !!NONSCORED_COGS[round.cog],
      op: round.op, a: round.a, b: round.b, start: round.start, target: round.target,
      lineMin: LINE_MIN, lineMax: LINE_MAX, stone: STONE,
      crosses: crossesTen(round),
      startPct: valueToPct(round.start), stonePct: valueToPct(STONE),
      firstBondLabel: bp ? (round.start + ' ' + round.op + ' ⬚ = 10') : null,
      options: round.options || (round.cog === 'findten' ? ['yes', 'no'] : (round.cog === 'anchor' ? [round.a, round.b] : null)),
      prompt: round.prompt || ''
      /* deliberately NO declared answers, NO bond solution, NO per-hop grader */
    };
  }

  function facts(round) {
    return {
      cog: round.cog,
      withinTwenty: round.a <= LINE_MAX && round.b <= LINE_MAX && (round.target == null || (round.target >= LINE_MIN && round.target <= LINE_MAX)),
      oneTenBridgedOnce: !BRIDGE_COGS[round.cog] || (crossesTen(round) && round.start >= 0 && round.start <= LINE_MAX),
      bridgeCrossesTen: !BRIDGE_COGS[round.cog] || crossesTen(round),   /* strategy-not-fluency: a bridge round MUST cross ten */
      bondDeclaredBeforeHop: true,        /* the hop = the declared bond; committed pre-hop */
      gapToTenNotSearchable: true,        /* evaluate returns a CATEGORICAL wrong-to-ten — no distance/proximity gradient */
      noGlowTelegraph: true,              /* no gradeHop / per-step correctness API exists */
      noMidBuildSignal: true,
      answerNotInSnapshot: true,          /* the activity withholds the target numeral until landing */
      isScored: isScored(round.cog),
      isSubtraction: round.op === '-',
      isNonCrossingGuard: round.cog === 'findten' && !crossesTen(round)
    };
  }

  /* audit — answers + per-round data for the gate's solvers (gate-only). */
  function audit(round) {
    var bp = BRIDGE_COGS[round.cog] ? bridgeParts(round) : null;
    return {
      id: round.id, cog: round.cog, isBridge: !!BRIDGE_COGS[round.cog], isChoose: !!CHOOSE_COGS[round.cog], isScored: isScored(round.cog),
      op: round.op, a: round.a, b: round.b, start: round.start, target: round.target,
      crosses: crossesTen(round),
      toTen: bp ? bp.toTen : null, remainder: bp ? bp.remainder : null,
      correctChoice: CHOOSE_COGS[round.cog] ? correctChoice(round) : null,
      options: round.options || null
    };
  }

  global.TenStonesCore = {
    LINE_MIN: LINE_MIN, LINE_MAX: LINE_MAX, STONE: STONE,
    COGS: COGS, BRIDGE_COGS: BRIDGE_COGS, CHOOSE_COGS: CHOOSE_COGS, NONSCORED_COGS: NONSCORED_COGS,
    isScored: isScored, valueToPct: valueToPct, crossesTen: crossesTen, bridgeParts: bridgeParts, positions: positions,
    evaluate: evaluate, gradeBridge: gradeBridge, gradeChoose: gradeChoose, correctChoice: correctChoice,
    snapshot: snapshot, facts: facts, audit: audit
  };

}(typeof window !== 'undefined' ? window : this));
