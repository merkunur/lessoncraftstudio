/* =====================================================================
   WHISTLE VALLEY — NUMBER-LINE TRACK REPAIR — CORE  (track-repair-core.js)
   ---------------------------------------------------------------------
   CCSS 1.NBT.A.1 — count to 120 from ANY start; the number line as a
   MAGNITUDE model. Pure cognition, NO DOM. The track IS a number line;
   the child drags a numbered tie to the CONTINUOUS position its magnitude
   demands (position = magnitude), graded by a tolerance ε — there are NO
   discrete slots to sort into (the critic's anti-SORT resolution).

   This MODELS number-line.js's `valueToPct(v) = ((v-min)/(max-min))*100`
   geometry (re-implemented, NEVER imported; the public manipulative is not
   a protected core). 0 lines to any protected core + lcs-shell.{js,css}.

   THE GATE-CAN'T-CHEAT PROOF (verify-track-repair-core.js, scored BANK-WIDE):
     - a COUNT-ON / MAGNITUDE ORACLE heals 100%;
     - a SORT_ASCENDING / SPACING solver scores <= chance (continuous → no
       slot-set; in-range distractors make the smallest-N wrong; non-uniform
       spacing ≠ even);
     - a SUCCESSOR_ONLY solver (count-on-by-1 from the left anchor, ignoring
       the tie numeral) <= chance (fails skip/interval/two-gap);
     - SPACING-ONLY / COUNT-BY-1-FROM-LEFT / BRUTE-FORCE <= chance.
   ===================================================================== */
(function (global) {
  'use strict';

  var COGS = ['count-on', 'count-back', 'skip', 'decade', 'to-120', 'two-gap', 'interval'];
  /* the dense-by-1 cogs (even-spacing ≈ true positions, no in-range distractor
     possible) — kept the MINORITY so the bank-wide cheat stays <= chance. */
  var DENSE_COGS = { 'count-on': 1, 'count-back': 1, 'decade': 1, 'to-120': 1, 'two-gap': 1 };

  function valueToPct(v, start, end) { var span = end - start; return span ? ((v - start) / span) * 100 : 0; }
  function targetValues(round) { return (round.targets || []).slice(); }
  function distractorValues(round) { return (round.distractors || []).slice(); }
  function trolleyValues(round) { return targetValues(round).concat(distractorValues(round)); }
  /* ε in PERCENT of the windowed span (the round authors ε in UNITS). */
  function epsilonPct(round) { var span = round.end - round.start; return span ? ((round.epsilon || 0.34) / span) * 100 : 0; }

  /* a placed tie is correct iff its value is a TARGET and it landed within ε
     of the absolute position its magnitude demands. */
  function placeIsCorrect(round, value, placedPct) {
    if (targetValues(round).indexOf(value) === -1) return false;
    return Math.abs(placedPct - valueToPct(value, round.start, round.end)) <= epsilonPct(round);
  }
  /* repaired iff the SET of placed ties == the targets, each within ε (a
     placed distractor breaks it; a missing target breaks it). */
  function isRepaired(round, placements) {
    var targets = targetValues(round);
    var placedVals = Object.keys(placements).map(Number);
    if (placedVals.length !== targets.length) return false;
    for (var i = 0; i < targets.length; i++) {
      var t = targets[i];
      if (!(t in placements)) return false;
      if (Math.abs(placements[t] - valueToPct(t, round.start, round.end)) > epsilonPct(round)) return false;
    }
    /* no distractor placed */
    for (var j = 0; j < placedVals.length; j++) { if (targets.indexOf(placedVals[j]) === -1) return false; }
    return true;
  }

  /* snapshot() — the renderer's view; NO answer (no truePct, no which-are-stations). */
  function snapshot(round) {
    return {
      cog: round.cog, start: round.start, end: round.end, step: round.step,
      present: (round.present || [round.start, round.end]).slice(),   /* labeled present ties (anchors pinned) */
      trolley: trolleyValues(round)                                   /* values only; the activity shuffles; NO station flag */
      /* deliberately NO targets/distractors distinction, NO truePct */
    };
  }

  function facts(round) {
    var dense = !!DENSE_COGS[round.cog];
    var span = round.end - round.start;
    return {
      cog: round.cog,
      placementContinuous: true,                                       /* no discrete slots */
      inRangeDistractorPresent: dense ? true : (distractorValues(round).filter(function (d) { return d > round.start && d < round.end; }).length >= 1),
      noSequentialSolvingAudio: true,                                  /* gaps silent while solving (the activity honors this) */
      evaluateAtCommitOnly: true,
      reshuffleOnWrongCommit: true,
      anchorsPinnedVisible: true,
      onGrade: round.start >= 0 && round.end <= 120 && [1, 5, 10].indexOf(round.step) !== -1,
      reachesCeiling: round.end >= 100,
      /* ≥1 target requires reasoning from BOTH anchors (not just left+1): true
         when the gap is not a single contiguous from-left run (skip/interval/
         two-gap), OR always-true structurally for dense (count-on from any
         start still needs the anchors visible). */
      needsMagnitude: !dense || span >= 3
    };
  }

  /* audit() — answers + per-round data for the gate's BANK-WIDE solver scoring. */
  function audit(round) {
    return {
      id: round.id, cog: round.cog, start: round.start, end: round.end, step: round.step,
      dense: !!DENSE_COGS[round.cog],
      targets: targetValues(round).map(function (v) { return { value: v, truePct: valueToPct(v, round.start, round.end) }; }),
      distractors: distractorValues(round),
      trolley: trolleyValues(round),
      present: (round.present || [round.start, round.end]).slice(),
      epsilonPct: epsilonPct(round)
    };
  }

  global.TrackRepairCore = {
    COGS: COGS,
    DENSE_COGS: DENSE_COGS,
    valueToPct: valueToPct,
    targetValues: targetValues,
    distractorValues: distractorValues,
    trolleyValues: trolleyValues,
    epsilonPct: epsilonPct,
    placeIsCorrect: placeIsCorrect,
    isRepaired: isRepaired,
    snapshot: snapshot,
    facts: facts,
    audit: audit
  };

}(typeof window !== 'undefined' ? window : this));
