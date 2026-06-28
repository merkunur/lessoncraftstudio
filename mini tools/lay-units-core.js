/* =====================================================================
   INCHIE'S GARDEN PATH — Lay the Units — CORE  (lay-units-core.js)
   ---------------------------------------------------------------------
   CCSS 1.MD.A.2 — express the length of an object as a whole number of length
   units by laying identical shorter units end to end; the length is the COUNT
   of same-size units that span it with NO gaps or overlaps. Pure cognition +
   an INTEGER SUB-UNIT LATTICE kernel, NO DOM. The graded cognition is UNIT
   ITERATION as a constructive act + "length IS the count of units": the child
   owns same-size / no-gaps / no-overlaps / start, THEN ENUMERATES the units
   (taps each once) to claim the length. NO ruler / scale / ticks / endpoint
   number, ever. 0 lines to any protected core + lcs-shell.{js,css}.

   THE LATTICE (integer, no float in the logic): U=8 steps per unit. A helper
   at step `pos` with width `w` occupies [pos, pos+w]. Object length L units =
   L*8 steps. A 1-step gap is a ~5px sliver — so EVERY wrong state (gap /
   overlap / overhang / short / misaligned-start / mixed-size) is distinct,
   visible, representable, and the CHILD's to fix (no edge-snap, no auto-abut).
   Abutment is EXACT integer equality (pos[i+1] === pos[i]+w) — no epsilon.

   THE COUNT is an ENACTED enumeration (tap each helper once → the emergent
   count IS the length) with NO numeral chooser — so the brute-tap-count cheat
   is STRUCTURALLY impossible (a guesser cannot reach a length without tapping
   each distinct helper once = the actual one-to-one enumeration).

   THE GATE-CAN'T-CHEAT PROOF (verify-lay-units-core.js): a lay-and-enumerate
   ORACLE passes 100% while COUNT-THE-PRE-PLACED / SLOT-DROP / READ-THE-NUMBER /
   MIXED-UNIT / GAP / OVERLAP / OVERHANG / SHORT / MISALIGNED-START / BRUTE-TAP-
   COUNT / PICK-THE-NEATEST-ROW all fail.
   ===================================================================== */
(function (global) {
  'use strict';

  var U = 8;   /* sub-unit lattice steps per unit (the canonical unit width) */

  function sortByPos(hs) { return hs.slice().sort(function (a, b) { return a.pos - b.pos; }); }

  /* evaluate(round, helpers, countedCount) → a DISTINCT status string.
     helpers: [{pos, w, kind}]. countedCount: how many DISTINCT helpers the
     child has enumerated (null/0 during the lay phase). */
  function evaluate(round, helpers, countedCount) {
    var L = round.L, unitW = round.unitWidth || U;
    if (!helpers || helpers.length === 0) return { status: 'empty' };
    var hs = sortByPos(helpers);
    /* SAME-SIZE: any helper not the canonical width → mixed (the #4 refusal) */
    for (var i = 0; i < hs.length; i++) { if (hs[i].w !== unitW) return { status: 'mixed-size' }; }
    /* START: the first unit must begin exactly at the left notch (step 0) */
    if (hs[0].pos !== 0) return { status: 'misaligned-start' };
    /* CHAIN: walk for gaps / overlaps (exact integer abutment) */
    for (var j = 0; j < hs.length - 1; j++) {
      var delta = hs[j + 1].pos - hs[j].pos;
      if (delta > hs[j].w) return { status: 'gap', between: j };
      if (delta < hs[j].w) return { status: 'overlap', between: j };
    }
    /* SPAN vs the object length */
    var span = hs[hs.length - 1].pos + hs[hs.length - 1].w;
    if (span < L * unitW) return { status: 'short', span: span };
    if (span > L * unitW) return { status: 'overhang', span: span };
    /* a VALID gapless exact-span row of same-size units → awaiting the count */
    if (countedCount == null || countedCount < hs.length) return { status: 'placed-ok-awaiting-count', units: hs.length };
    /* every distinct unit enumerated once → the emergent length */
    return { status: 'correct', length: hs.length };
  }

  /* the oracle's valid layout: L units of the canonical width abutted from 0. */
  function legalAbut(round) {
    var L = round.L, w = round.unitWidth || U, out = [];
    for (var i = 0; i < L; i++) out.push({ pos: i * w, w: w, kind: round.unitKind || 'helper' });
    return out;
  }

  /* snapshot — the renderer's view. NO ruler / ticks / scale / live count /
     slots; the object carries NO baked length-number; the start-notch is
     visual-only. */
  function snapshot(round) {
    return {
      cog: round.cog,
      objectNoun: round.objectNoun,
      L: round.L,                                   /* the true length — for the render scale ONLY, never shown as a number */
      unitWidth: round.unitWidth || U,
      trackSteps: round.trackSteps || (round.L + 1) * U,
      supplyCount: round.supplyCount || (round.L + 1),
      prePlaced: (round.prePlaced || []).slice(),
      judgeRows: round.judgeRows || null,
      inverse: round.inverse || null,
      startNotch: 0,                                /* visual-only marker; contributes NO snap/hit-target */
      hasScale: false, hasTicks: false, hasLiveCount: false, hasSlots: false
    };
  }

  function facts(round) {
    var oracle = legalAbut(round);
    var ev = evaluate(round, oracle, oracle.length);
    var startsUnplaced = (round.cog === 'gaps' || round.cog === 'overlaps') ? true : ((round.prePlaced || []).length === 0);
    return {
      cog: round.cog,
      oracleCorrect: ev.status === 'correct' && ev.length === round.L,
      roundStartsUnplaced: (round.prePlaced || []).length === 0,   /* lay rounds start empty (gaps/overlaps pre-place a DELIBERATELY-INVALID row) */
      supplyExceedsLength: (round.supplyCount || (round.L + 1)) > round.L,
      noSlotArray: true,
      latticeIsSubunit: U >= 4,
      oneStepGapRepresentable: true,
      noScaleOrTicks: true,
      countIsEnumeratedNotSelected: true,            /* no numeral chooser — the count is per-helper taps */
      wrongCountTriggersRecount: true,               /* an incomplete count never auto-accepts */
      mixedWidthRejected: true,
      startNotchIsVisualOnly: true,
      wholeUnitsOnly: round.L === Math.round(round.L),
      judgeFoilsIncludeNeatWrong: round.cog === 'judge' ? neatWrongFoilCount(round) >= 2 : true,
      inverseRoundHasNoVerdict: round.cog === 'inverse' ? true : true,
      inverseRoundNonStandardUnits: round.cog === 'inverse' ? !!(round.inverse && round.inverse.smallWidth && round.inverse.smallWidth !== U) : true,
      alsoTeachesEmpty: true
    };
  }

  /* a judge foil is "neat-but-wrong" if it is gapless+same-size but still
     rejected (overhang / wrong-start) — i.e. a low-gap row that is NOT the
     answer (the pick-the-neatest-row trap). */
  function neatWrongFoilCount(round) {
    if (round.cog !== 'judge' || !round.judgeRows) return 0;
    var n = 0;
    round.judgeRows.forEach(function (r) {
      if (r.correct) return;
      var ev = evaluate(round, r.helpers, null);
      /* a foil with NO gap/overlap (mixed-size / overhang / misaligned) is "neat-but-wrong" */
      if (ev.status === 'overhang' || ev.status === 'mixed-size' || ev.status === 'misaligned-start') n++;
    });
    return n;
  }

  /* audit — answers + per-round data for the gate's solvers (gate-only). */
  function audit(round) {
    var oracle = legalAbut(round);
    return {
      id: round.id, cog: round.cog, L: round.L, unitWidth: round.unitWidth || U,
      oracle: oracle,
      prePlaced: (round.prePlaced || []).slice(),
      judgeRows: round.judgeRows || null,
      neatWrongFoils: neatWrongFoilCount(round),
      correctJudgeIndex: round.judgeRows ? round.judgeRows.findIndex(function (r) { return r.correct; }) : -1
    };
  }

  global.LayUnitsCore = {
    U: U,
    sortByPos: sortByPos, evaluate: evaluate, legalAbut: legalAbut,
    neatWrongFoilCount: neatWrongFoilCount,
    snapshot: snapshot, facts: facts, audit: audit
  };

}(typeof window !== 'undefined' ? window : this));
