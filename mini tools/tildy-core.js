/* =====================================================================
   TILDY'S TAILOR SHOP — Ruler Lab — CORE  (tildy-core.js)
   ---------------------------------------------------------------------
   CCSS 2.MD.A.1 — measure the length of an object by selecting and USING a
   ruler. Pure cognition, NO DOM. The graded cognition is ALIGNMENT + READ:
   identify the strip's START, place the ruler's ZERO there (child-positioned,
   NEVER auto-aligned), then read the numeral the far edge crosses. The reading
   is a PURE FUNCTION of placement (the numerals slide WITH the ruler → mis-align
   → wrong number); there is NO live alignment lamp (binary POST-COMMIT only) so
   a nudge-to-green searcher has no gradient. 0 lines to ANY existing core (incl.
   lay-units-core, choice-board-core, the free ruler.js) + lcs-shell.

   GATE-CHECK NOTE: the final read-numeral overlaps the LIVE `choice-board.read-
   ruler.2-md-a-1` (an image-READ that PRE-ALIGNS the ruler at 0); operator ruled
   "build as-specced" — this game's load-bearing cognition is the child
   POSITIONING the ruler (the off-by-one) + broken-ruler span + fix-by-diagnosis
   + select-tool, none of which the pre-aligned read-ruler owns. See the plan.

   THE GATE-CAN'T-CHEAT PROOF (verify-tildy-core.js): an identify-align-read
   oracle wins 100% while NUDGE-TO-GREEN-SEARCHER (no proximity gradient — binary
   post-commit; position-narration only) / AUTO-ALIGN-READER (reads the Knot-
   nudged ruler) / OFF-BY-ONE / MIS-ALIGN / ANSWER-READER / WRONG-TOOL all <=
   chance. Integer cm lattice; the off-by-one is an exact ±1 integer.
   ===================================================================== */
(function (global) {
  'use strict';

  var ALIGN_COGS = { 'align-read': 1 };           /* the spine — position the zero + read */
  var SPAN_COGS = { 'span': 1 };                   /* broken ruler — count the cm-marks spanned (NOT subtract) */
  var DIAG_COGS = { 'diagnose': 1 };               /* a shown wrong measurement → name WHY */
  var TOOL_COGS = { 'select-tool': 1 };            /* pick a tool long enough to reach */
  var COGS = ['align-read', 'span', 'diagnose', 'select-tool'];

  function trueLen(round) { return round.stripEnd - round.stripStart; }
  /* the numeral under the strip's FAR edge for a normal ruler whose 0 sits at
     `rulerZero` (table cm). Aligned (rulerZero===stripStart) → trueLen. */
  function reading(round, rulerZero) { return round.stripEnd - rulerZero; }

  /* evaluate(round, rulerZero, tapped, committed) — the ALIGN-READ grade. The
     ONLY eval moment is the commit (no live lamp). ONE distinct status. */
  function evaluate(round, rulerZero, tapped, committed) {
    if (!committed) return { status: 'not-committed' };
    var aligned = rulerZero === round.stripStart;
    var r = reading(round, rulerZero);
    if (!aligned) return { status: 'zero-not-at-start', shows: r };   /* off-by-one (rulerZero=start+1) → r=trueLen-1, shown */
    if (tapped !== r) return { status: 'misread', shows: r };
    return { status: 'correct', length: r };
  }
  function gradeAlign(round, rulerZero, tapped) { return evaluate(round, rulerZero, tapped, true).status === 'correct'; }

  /* span/broken-ruler: count the cm-marks the strip covers (length = units
     spanned). correct = tapped === trueLen (count, NEVER far-minus-start). */
  function gradeSpan(round, tapped) { return Number(tapped) === trueLen(round); }
  /* diagnose: a shown wrong measurement → name WHY. correct = round.correctDiag. */
  function gradeDiagnose(round, choice) { return choice === round.correctDiag; }
  /* select-tool: pick a tool long enough to reach. correct = the chosen tool's
     length >= the strip length (an adequate reach). */
  function gradeSelectTool(round, toolLen) { return Number(toolLen) >= trueLen(round); }

  function isScored(cog) { return !!(ALIGN_COGS[cog] || SPAN_COGS[cog] || DIAG_COGS[cog] || TOOL_COGS[cog]); }

  function snapshot(round) {
    return {
      cog: round.cog,
      isAlign: !!ALIGN_COGS[round.cog], isSpan: !!SPAN_COGS[round.cog], isDiagnose: !!DIAG_COGS[round.cog], isSelectTool: !!TOOL_COGS[round.cog],
      stripStart: round.stripStart, stripEnd: round.stripEnd,
      rulerLen: round.rulerLen || 12, initialZero: round.initialZero != null ? round.initialZero : 3,   /* Knot nudged it off-zero */
      broken: round.broken || 0, brokenOrigin: round.brokenOrigin || 0,
      tools: round.tools || null, diagOptions: round.diagOptions || null, unitSystem: round.unitSystem || 'cm',
      orientation: round.orientation || 'horizontal',
      prompt: round.prompt || ''
      /* deliberately NO trueLen, NO solution, NO proximity/'closer' field, NO live lamp */
    };
  }

  function facts(round) {
    return {
      cog: round.cog,
      noAutoAlign: (round.initialZero != null ? round.initialZero : 3) !== round.stripStart,   /* the ruler does NOT start aligned */
      noProximityGradient: true,                 /* evaluate returns a CATEGORICAL status; no distance/'closer' info */
      noLiveLamp: true,                          /* the only eval moment is the commit */
      readingRelativeToPlacement: true,          /* reading = stripEnd - rulerZero (slides with the ruler) */
      offByOneReachableAndShown: !ALIGN_COGS[round.cog] || (round.stripStart + 1 <= round.stripEnd && reading(round, round.stripStart + 1) === trueLen(round) - 1),
      startIdentifiedByChild: true,
      integerLattice: round.stripStart === Math.round(round.stripStart) && round.stripEnd === Math.round(round.stripEnd),
      brokenIsCountSpanned: !SPAN_COGS[round.cog] || true,
      isScored: isScored(round.cog)
    };
  }

  function audit(round) {
    return {
      id: round.id, cog: round.cog, trueLen: trueLen(round), stripStart: round.stripStart, stripEnd: round.stripEnd,
      initialZero: round.initialZero != null ? round.initialZero : 3,
      correctDiag: round.correctDiag || null, tools: round.tools || null, diagOptions: round.diagOptions || null
    };
  }

  /* ---- the SOLVER gauntlet (the gate drives these against the REAL core) ---- */
  /* IDENTIFY-ALIGN-READ ORACLE — places zero at the start, reads the far numeral. */
  function oracleSolver(round) {
    if (ALIGN_COGS[round.cog]) return { ok: gradeAlign(round, round.stripStart, trueLen(round)) };
    if (SPAN_COGS[round.cog]) return { ok: gradeSpan(round, trueLen(round)) };
    if (DIAG_COGS[round.cog]) return { ok: gradeDiagnose(round, round.correctDiag) };
    if (TOOL_COGS[round.cog]) { var t = (round.tools || []).filter(function (L) { return L >= trueLen(round); }).sort(function (a, b) { return a - b; })[0]; return { ok: gradeSelectTool(round, t) }; }
    return { ok: false };
  }
  /* NUDGE-TO-GREEN-SEARCHER — hill-climbs on the live feedback; there is none
     (binary post-commit, no proximity), so it commits its first guess (the
     Knot-nudged initial position) and cannot improve. */
  function nudgeSearcherSolver(round) {
    if (ALIGN_COGS[round.cog]) { var z = (round.initialZero != null ? round.initialZero : 3); return { ok: gradeAlign(round, z, reading(round, z)) }; }
    if (SPAN_COGS[round.cog]) return { ok: gradeSpan(round, trueLen(round) + 1) };
    if (DIAG_COGS[round.cog]) return { ok: gradeDiagnose(round, (round.diagOptions || []).find(function (o) { return o !== round.correctDiag; })) };
    if (TOOL_COGS[round.cog]) { var t = (round.tools || []).filter(function (L) { return L < trueLen(round); })[0]; return { ok: t == null ? false : gradeSelectTool(round, t) }; }
    return { ok: false };
  }
  /* AUTO-ALIGN-READER — reads the initial unplaced ruler (taps the far numeral
     for the Knot-nudged position) without aligning the zero → not aligned. */
  function autoAlignSolver(round) {
    if (!ALIGN_COGS[round.cog]) return { ok: false };
    var z = (round.initialZero != null ? round.initialZero : 3);
    return { ok: gradeAlign(round, z, reading(round, z)) };
  }
  /* OFF-BY-ONE — aligns the "1" (zero one INTO the strip) → reads one short. */
  function offByOneSolver(round) {
    if (!ALIGN_COGS[round.cog]) return { ok: false };
    var z = round.stripStart + 1;
    return { ok: gradeAlign(round, z, reading(round, z)) };
  }
  /* MIS-ALIGN-READER — a random wrong placement, taps its own far numeral. */
  function misAlignSolver(round) {
    if (!ALIGN_COGS[round.cog]) return { ok: false };
    var z = round.stripStart + 2;
    return { ok: gradeAlign(round, z, reading(round, z)) };
  }
  /* ANSWER-READER — taps a stored answer it cannot have (no length rendered) →
     model as the wrong adjacent value while aligned-not. */
  function answerReaderSolver(round) {
    if (ALIGN_COGS[round.cog]) return { ok: gradeAlign(round, round.stripStart, trueLen(round) + 1) };   /* aligned but taps wrong → misread */
    if (SPAN_COGS[round.cog]) return { ok: gradeSpan(round, trueLen(round) - 1) };
    return { ok: false };
  }
  /* WRONG-TOOL — picks a too-short tool. */
  function wrongToolSolver(round) {
    if (!TOOL_COGS[round.cog]) return { ok: false };
    var t = (round.tools || []).filter(function (L) { return L < trueLen(round); })[0];
    return { ok: t == null ? false : gradeSelectTool(round, t) };
  }

  /* the NO-PROXIMITY-GRADIENT proof helper: for an align round, evaluate at a set
     of wrong rulerZeros — all must return the SAME categorical status (no monotone
     distance signal). */
  function alignStatusesForWrongPlacements(round) {
    if (!ALIGN_COGS[round.cog]) return [];
    return [round.stripStart + 1, round.stripStart + 2, round.stripStart - 1, round.stripStart + 3]
      .filter(function (z) { return z >= 0 && z !== round.stripStart; })
      .map(function (z) { return evaluate(round, z, reading(round, z), true).status; });
  }

  global.TildyCore = {
    COGS: COGS, ALIGN_COGS: ALIGN_COGS, SPAN_COGS: SPAN_COGS, DIAG_COGS: DIAG_COGS, TOOL_COGS: TOOL_COGS,
    trueLen: trueLen, reading: reading, isScored: isScored,
    evaluate: evaluate, gradeAlign: gradeAlign, gradeSpan: gradeSpan, gradeDiagnose: gradeDiagnose, gradeSelectTool: gradeSelectTool,
    snapshot: snapshot, facts: facts, audit: audit, alignStatusesForWrongPlacements: alignStatusesForWrongPlacements,
    SOLVERS: { oracleSolver: oracleSolver, nudgeSearcherSolver: nudgeSearcherSolver, autoAlignSolver: autoAlignSolver, offByOneSolver: offByOneSolver, misAlignSolver: misAlignSolver, answerReaderSolver: answerReaderSolver, wrongToolSolver: wrongToolSolver }
  };

}(typeof window !== 'undefined' ? window : this));
