/* =====================================================================
   FOX & FORGE — Pip's Chocolate Forge — CORE  (fox-forge-core.js)
   ---------------------------------------------------------------------
   CCSS 3.NF.A.1 — understand 1/b as ONE of b EQUAL parts of a whole, and a/b
   as a COPIES of the unit 1/b. Pure cognition, NO DOM. The graded cognition is
   CONSTRUCT-AN-AMOUNT: recognize the unit fraction 1/b by its SIZE (the piece
   that tiles THIS bar exactly b times — the molds are UNLABELED, no digit to
   read) and ITERATE it a times. value/size of 1/b ≠ the denominator digit ≠ a
   count of pieces of any size. 0 lines to any protected core + lcs-shell.{js,css}
   AND 0 lines to the E14 fractions-core.js (that engine owns K-2 partition
   RECOGNITION 1.G.A.3/2.G.A.3 — a different cognition; this CONSTRUCTS).

   THE GATE-CAN'T-CHEAT PROOF (verify-fox-forge-core.js): a build oracle wins
   100% while MOLD-MATCHER (no digit on the mold → must judge size) / COMMIT-
   PROBER (the hand-over is SPENT) / COUNT-THE-NUMERATOR (forges a of the WRONG
   size → the unit-size gate rejects) / GLOW-CHASER (no mid-build signal) /
   UNEQUAL-PARTS (the forge refuses) / DENOMINATOR-BLIND / OVERFILL / MIXED-SIZE
   all score <= chance.

   CORE CONSTANT: a piece's size is ALWAYS wholeLen/b (a pure function of the
   bar + the denominator) — the art can never resize a piece, or the denominator
   stops being load-bearing. The unit is recognized BY that size.
   ===================================================================== */
(function (global) {
  'use strict';

  var DENOMS = [2, 3, 4, 6, 8];                 /* the allowed denominators b */
  var BUILD_COGS = { 'build': 1, 'equal-parts': 1, 'denominator': 1, 'the-whole': 1, 'magnitude': 1 };
  var CHOOSE_COGS = { 'name-unit': 1 };          /* tap the unit fraction the piece names */
  var NONSCORED_COGS = { 'cross-shape': 1 };     /* same amount across shapes — observational, neutral advance */
  var COGS = ['build', 'name-unit', 'equal-parts', 'denominator', 'the-whole', 'magnitude', 'cross-shape'];

  function isScored(cog) { return !!(BUILD_COGS[cog] || CHOOSE_COGS[cog]); }

  /* a piece of denominator b in a bar of length wholeLen occupies wholeLen/b.
     This is THE core constant — pure, deterministic, never per-round-overridden. */
  function unitSize(round, b) { return (round.wholeLen || 120) / b; }

  function moldsOf(round) { return round.molds || []; }
  /* a mold is forgeable iff it carries a real numeric denominator (the cracked
     "unequal" mold — used on equal-parts rounds — is NOT forgeable: the forge
     refuses it, the construction consequence of "1/b needs EQUAL parts"). */
  function canForge(moldB) { return typeof moldB === 'number' && moldB > 0; }
  /* the molds that carry a wrong denominator (≠ round.b) AND are forgeable —
     the "wrong-but-reachable" set the size-judgment must navigate. */
  function wrongForgeableMolds(round) {
    return moldsOf(round).filter(function (m) { return canForge(m.b) && m.b !== round.b; });
  }
  function hasUnequalMold(round) { return moldsOf(round).some(function (m) { return m.b === 'unequal'; }); }

  /* evaluate(round, placed, committed) — `placed` is an array of {b} (each
     forged piece carries the denominator of the mold it came from). Returns ONE
     distinct status. Correct ONLY on a deliberate commit (no mid-build signal:
     a full-but-uncommitted build is 'placed-ok-awaiting-commit', never correct). */
  function evaluate(round, placed, committed) {
    placed = placed || [];
    if (CHOOSE_COGS[round.cog]) return { status: 'choose' };       /* graded via gradeChoose */
    if (NONSCORED_COGS[round.cog]) return { status: 'nonscored' };
    /* BUILD family */
    if (!placed.length) return { status: 'short' };
    var seen = {}; placed.forEach(function (p) { seen[p.b] = 1; });
    if (Object.keys(seen).length > 1) return { status: 'mixed-size' };
    var pb = placed[0].b;
    if (!canForge(pb)) return { status: 'unequal' };               /* an unequal piece reached the bar — refused upstream, defended here */
    if (pb !== round.b) return { status: 'wrong-size-piece' };     /* the unit-size gate: a of 1/3 ≠ a of 1/4 */
    if (placed.length > round.a) return { status: 'over' };
    if (placed.length < round.a) return { status: 'short' };
    if (!committed) return { status: 'placed-ok-awaiting-commit' };
    return { status: 'correct', a: round.a, b: round.b };
  }

  function gradeBuild(round, placed) { return evaluate(round, placed, true).status === 'correct'; }

  /* name-unit: the bar is partitioned into b equal parts, ONE highlighted; the
     piece names the UNIT fraction 1/b. choice = [num, den]; correct = [1, b]. */
  function gradeChoose(round, choice) {
    if (round.cog !== 'name-unit') return false;
    return Array.isArray(choice) && Number(choice[0]) === 1 && Number(choice[1]) === round.b;
  }

  /* snapshot — the renderer's view. Molds carry their denominator b (the activity
     renders ONLY the sample-piece SIZE = wholeLen/b, NEVER the digit) + an
     'unequal' marker. Deliberately NO solution, NO target-count readout. */
  function snapshot(round) {
    return {
      cog: round.cog,
      isBuild: !!BUILD_COGS[round.cog],
      isChoose: !!CHOOSE_COGS[round.cog],
      isNonscored: !!NONSCORED_COGS[round.cog],
      a: round.a, b: round.b,
      wholeLen: round.wholeLen || 120,
      molds: moldsOf(round).map(function (m) { return { b: m.b }; }),   /* b drives the SIZE only — never shown as a digit */
      options: round.options || null,
      refWhole: round.refWhole || null,
      shape: round.shape || 'bar',
      scenario: round.scenario || '',
      prompt: round.prompt || ''
      /* NO a-target numeral, NO solution, NO mold labels */
    };
  }

  function facts(round) {
    var molds = moldsOf(round), wrong = wrongForgeableMolds(round);
    return {
      cog: round.cog,
      moldsUnlabeled: true,                    /* the activity renders no denominator digit on a mold */
      unitSizeIsConstant: true,                /* a piece is ALWAYS wholeLen/b (pure function) */
      noMidBuildSignal: true,                  /* nothing changes at count===a; only the deliberate commit grades */
      commitIsSpent: true,                     /* a hand-over ends the order; no re-commit of the same box */
      reshuffleOnWrong: true,
      wrongDenominatorReachable: !BUILD_COGS[round.cog] || (molds.length >= 2 && wrong.length >= 1),
      hasUnequalMold: hasUnequalMold(round),
      denomInRange: DENOMS.indexOf(round.b) !== -1,
      properFraction: round.a >= 1 && round.a <= round.b,
      isScored: isScored(round.cog),
      wholeRandomized: round.cog === 'magnitude',
      twoWholes: round.cog === 'the-whole' && !!round.refWhole
    };
  }

  /* audit — answers + per-round data for the gate's solvers (gate-only). */
  function audit(round) {
    var molds = moldsOf(round);
    return {
      id: round.id, cog: round.cog, isBuild: !!BUILD_COGS[round.cog], isChoose: !!CHOOSE_COGS[round.cog], isScored: isScored(round.cog),
      a: round.a, b: round.b, wholeLen: round.wholeLen || 120,
      molds: molds.slice(),
      correctMoldB: round.b,
      forgeableWrongMolds: wrongForgeableMolds(round).map(function (m) { return m.b; }),
      hasUnequalMold: hasUnequalMold(round),
      options: round.options || null,
      correctChoice: round.cog === 'name-unit' ? [1, round.b] : null
    };
  }

  global.FoxForgeCore = {
    DENOMS: DENOMS, COGS: COGS, BUILD_COGS: BUILD_COGS, CHOOSE_COGS: CHOOSE_COGS, NONSCORED_COGS: NONSCORED_COGS,
    isScored: isScored, unitSize: unitSize, moldsOf: moldsOf, canForge: canForge,
    wrongForgeableMolds: wrongForgeableMolds, hasUnequalMold: hasUnequalMold,
    evaluate: evaluate, gradeBuild: gradeBuild, gradeChoose: gradeChoose,
    snapshot: snapshot, facts: facts, audit: audit
  };

}(typeof window !== 'undefined' ? window : this));
