/* =====================================================================
   LENGTH TAPE — CORE  (length-tape-core.js)
   ---------------------------------------------------------------------
   CCSS 2.MD.B.5 — add/subtract WITHIN 100 to solve word problems involving
   LENGTHS (same units), using a drawing (a tape/ruler) + an equation with a
   symbol for the unknown. First skin: "Bram's Board Shop." Pure cognition,
   NO DOM. The graded cognition is MODEL THE LENGTH SITUATION: bind each known
   length TILE to its segment-role (change=start/change/result · bracket=
   whole/partA/partB · compare=bigger/smaller/difference), mark the unknown
   segment "?", leave the magnitude-DECOY unbound, and dial the DERIVED length.

   The number is DERIVED (solveUnknown) — NO `answer` field on a round, so a
   number-grab is structurally impossible. Mirrors vet-diagnosis-core.js
   (1.OA.A.1) but the quantities are LENGTHS within 100 and the renderer draws
   a proportional tape. 0 lines to any protected core + lcs-shell.{js,css}.
   ===================================================================== */
(function (global) {
  'use strict';

  var DIAGRAMS = {
    change:  { roles: ['start', 'change', 'result'] },     /* add-to / take-from a length */
    bracket: { roles: ['whole', 'partA', 'partB'] },       /* combine / take-apart lengths */
    compare: { roles: ['bigger', 'smaller', 'difference'] } /* how much longer */
  };
  var ROLE_TOKENS = ['start', 'change', 'result', 'whole', 'part', 'parta', 'partb', 'bigger', 'smaller', 'difference', 'addend', 'sum', 'minuend', 'subtrahend'];
  var COGS = ['combine-whole', 'combine-part', 'addto-result', 'takefrom-result', 'takefrom-change', 'takefrom-start', 'compare-diff', 'compare-bigger', 'compare-smaller'];

  function valueOf(round, tileId) { var t = (round.tiles || []).filter(function (x) { return x.id === tileId; })[0]; return t ? t.value : null; }

  function solveUnknown(diagram, op, known, unknownRole) {
    var sign = (op === 'sub') ? -1 : 1;
    if (diagram === 'change') {
      if (unknownRole === 'result') return known.start + sign * known.change;
      if (unknownRole === 'start') return known.result - sign * known.change;
      if (unknownRole === 'change') return sign * (known.result - known.start);
    } else if (diagram === 'bracket') {
      if (unknownRole === 'whole') return known.partA + known.partB;
      if (unknownRole === 'partA') return known.whole - known.partB;
      if (unknownRole === 'partB') return known.whole - known.partA;
    } else if (diagram === 'compare') {
      if (unknownRole === 'bigger') return known.smaller + known.difference;
      if (unknownRole === 'smaller') return known.bigger - known.difference;
      if (unknownRole === 'difference') return known.bigger - known.smaller;
    }
    return null;
  }

  function knownValues(round) {
    var known = {};
    (round.slots || []).forEach(function (s) { if (s.role !== round.unknownRole && s.correct) known[s.role] = valueOf(round, s.correct); });
    return known;
  }
  function trueAnswer(round) { return solveUnknown(round.diagram, round.op, knownValues(round), round.unknownRole); }

  /* gradeAttempt — every slot's bound tile === its authored correct (unknown
     marked '?'), the decoy UNBOUND, AND the dialed number === the derived answer. */
  function gradeAttempt(round, binding, number) {
    binding = binding || {};
    var slots = round.slots || [];
    for (var i = 0; i < slots.length; i++) {
      var s = slots[i], got = binding[s.role];
      if (s.role === round.unknownRole) { if (got !== '?') return false; }
      else { if (got !== s.correct) return false; }
    }
    for (var r in binding) { if (binding.hasOwnProperty(r) && binding[r] === round.decoyId) return false; }
    return Number(number) === trueAnswer(round);
  }
  function fullyBound(round, binding) {
    binding = binding || {}; var slots = round.slots || [];
    for (var i = 0; i < slots.length; i++) { if (binding[slots[i].role] == null) return false; }
    return true;
  }

  function snapshot(round) {
    return {
      cog: round.cog, diagram: round.diagram, op: round.op, unit: round.unit || 'cm',
      unknownRole: round.unknownRole,
      roles: (DIAGRAMS[round.diagram] || {}).roles ? DIAGRAMS[round.diagram].roles.slice() : (round.slots || []).map(function (s) { return s.role; }),
      tiles: (round.tiles || []).map(function (t) { return { id: t.id, value: t.value }; })
    };
  }

  function storyHasRoleToken(round) {
    var s = String(round.story || '').toLowerCase();
    for (var i = 0; i < ROLE_TOKENS.length; i++) { if (new RegExp('\\b' + ROLE_TOKENS[i] + '\\b').test(s)) return true; }
    return false;
  }
  function isReversed(round) {
    var k = knownValues(round), d = round.diagram, op = round.op, u = round.unknownRole;
    var a = solveUnknown(d, op, k, u);
    var vals = []; for (var rr in k) vals.push(k[rr]);
    var solvingIsAdd = (a != null) && (a === (vals[0] + vals[1]));
    var addKw = /\b(more|added|glue|glues|glued|ties|tied|joins|joined|longer|taller|extra)\b/.test(String(round.story || '').toLowerCase());
    var subKw = /\b(cut|cuts|saw|saws|sawed|off|shorter|trimmed|broke)\b/.test(String(round.story || '').toLowerCase());
    var kwIsAdd = addKw && !subKw ? true : (subKw && !addKw ? false : null);
    if (kwIsAdd === null) return false;
    return kwIsAdd !== solvingIsAdd;
  }
  function facts(round) {
    var allVals = (round.tiles || []).map(function (t) { return t.value; }).concat([trueAnswer(round)]);
    var maxV = Math.max.apply(null, allVals);
    return {
      cog: round.cog,
      answerDerivedNotAuthored: !('answer' in round),
      slotsIconicUnlabeled: true,
      fullBindingGraded: true,
      hasDecoy: !!round.decoyId,
      noSlotLabelWordInQuestion: !storyHasRoleToken(round),
      withinHundred: maxV <= 100,
      reversed: isReversed(round)
    };
  }
  function audit(round) {
    var correct = {};
    (round.slots || []).forEach(function (s) { correct[s.role] = (s.role === round.unknownRole) ? '?' : s.correct; });
    return {
      id: round.id, cog: round.cog, diagram: round.diagram, op: round.op, unknownRole: round.unknownRole,
      roles: (DIAGRAMS[round.diagram] || {}).roles.slice(),
      tiles: (round.tiles || []).map(function (t) { return { id: t.id, value: t.value }; }),
      decoyId: round.decoyId, correct: correct, answer: trueAnswer(round), story: round.story || ''
    };
  }

  global.LengthTapeCore = {
    DIAGRAMS: DIAGRAMS, COGS: COGS, ROLE_TOKENS: ROLE_TOKENS,
    valueOf: valueOf, solveUnknown: solveUnknown, knownValues: knownValues, trueAnswer: trueAnswer,
    gradeAttempt: gradeAttempt, fullyBound: fullyBound, snapshot: snapshot, facts: facts, audit: audit
  };

}(typeof window !== 'undefined' ? window : this));
