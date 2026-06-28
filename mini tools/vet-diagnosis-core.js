/* =====================================================================
   VET'S DIAGNOSIS WINDOW — CORE  (vet-diagnosis-core.js)
   ---------------------------------------------------------------------
   CCSS 1.OA.A.1 — add/subtract WITHIN 20 to solve WORD PROBLEMS (adding to,
   taking from, putting together, comparing) with UNKNOWNS IN ALL POSITIONS.
   Pure cognition, NO DOM. The graded cognition is MODEL THE SITUATION: bind
   each known quantity TILE to its iconic role-SLOT (start/change/result,
   whole/partA/partB, bigger/smaller/difference), mark the unknown slot "?",
   and LEAVE the magnitude-DECOY tile unbound. The number is DERIVED from the
   bound model (solveUnknown) — there is NO `answer` field on a round, so a
   number-grab is structurally impossible. 0 lines to any protected core +
   lcs-shell.{js,css}.

   THE GATE-CAN'T-CHEAT PROOF (verify-vet-diagnosis.js, scored over the deck):
     - a SITUATION-MODELER ORACLE binds correctly + derives → 100%;
     - a MAGNITUDE-HEURISTIC solver (biggest tile incl. the decoy → the most
       container-like known slot) → <= chance: the 4 magnitude-BREAKING cells
       (takefrom-change, compare-bigger) get the binding wrong outright, and
       on every magnitude-FRIENDLY cell the DECOY (> the container known)
       lures the biggest-tile into the container slot → wrong binding;
     - a KEYWORD-MATCH / NUMBER-GRAB solver → <= chance (positional binding +
       keyword op; reversed on start-unknown / inconsistent-compare);
     - a LABEL-MATCH solver → <= chance (slots are ICONIC; the story carries
       no role token → no signal); asserted by noSlotLabelWordInQuestion;
     - a BRUTE-FORCE solver → <= chance.
   ===================================================================== */
(function (global) {
  'use strict';

  /* the three diagram metaphors + their role sets + the invariant.
     change : result = start (+/- op) change           [add-to / take-from]
     bracket: whole  = partA + partB                    [put-together / take-apart]
     compare: bigger = smaller + difference             [compare] */
  var DIAGRAMS = {
    change:  { roles: ['start', 'change', 'result'] },
    bracket: { roles: ['whole', 'partA', 'partB'] },
    compare: { roles: ['bigger', 'smaller', 'difference'] }
  };

  /* the literal role tokens that must NEVER appear in a story (the slots are
     iconic; a story echoing a role word would hand the label-match cheat a
     signal). Greppable defensive set. */
  var ROLE_TOKENS = ['start', 'change', 'result', 'whole', 'part', 'parta', 'partb', 'bigger', 'smaller', 'difference', 'addend', 'sum', 'minuend', 'subtrahend'];

  var COGS = ['addto-change', 'addto-start', 'takefrom-change', 'takefrom-start', 'puttogether-addend', 'compare-diff', 'compare-bigger', 'compare-smaller', 'result'];

  function valueOf(round, tileId) {
    var t = (round.tiles || []).filter(function (x) { return x.id === tileId; })[0];
    return t ? t.value : null;
  }

  /* solveUnknown — DERIVE the unknown role's value from the two KNOWN role
     values + the situation invariant. Never reads an authored answer. */
  function solveUnknown(diagram, op, known, unknownRole) {
    var sign = (op === 'sub') ? -1 : 1;   /* op is the SITUATION op (add-to / put-together / compare = add; take-from = sub) */
    if (diagram === 'change') {
      /* result = start + sign*change */
      if (unknownRole === 'result') return known.start + sign * known.change;
      if (unknownRole === 'start') return known.result - sign * known.change;
      if (unknownRole === 'change') return sign * (known.result - known.start);
    } else if (diagram === 'bracket') {
      /* whole = partA + partB */
      if (unknownRole === 'whole') return known.partA + known.partB;
      if (unknownRole === 'partA') return known.whole - known.partB;
      if (unknownRole === 'partB') return known.whole - known.partA;
    } else if (diagram === 'compare') {
      /* bigger = smaller + difference */
      if (unknownRole === 'bigger') return known.smaller + known.difference;
      if (unknownRole === 'smaller') return known.bigger - known.difference;
      if (unknownRole === 'difference') return known.bigger - known.smaller;
    }
    return null;
  }

  /* the correct role->value map for the KNOWN roles, read off the authored
     binding (each non-unknown slot's `correct` tile). */
  function knownValues(round) {
    var known = {};
    (round.slots || []).forEach(function (s) {
      if (s.role !== round.unknownRole && s.correct) known[s.role] = valueOf(round, s.correct);
    });
    return known;
  }

  /* trueAnswer — derived, in-closure; NOT a field. */
  function trueAnswer(round) {
    return solveUnknown(round.diagram, round.op, knownValues(round), round.unknownRole);
  }

  /* gradeAttempt — true iff EVERY slot's bound tile === its authored `correct`
     (the unknown slot marked '?'), the decoy is left UNBOUND, AND the dialed
     number === the derived answer. The binding is graded in full (a role-wrong-
     but-magnitude-correct placement is rejected). */
  function gradeAttempt(round, binding, number) {
    binding = binding || {};
    var slots = round.slots || [];
    for (var i = 0; i < slots.length; i++) {
      var s = slots[i];
      var got = binding[s.role];
      if (s.role === round.unknownRole) {
        if (got !== '?') return false;            /* the unknown slot must be marked '?' */
      } else {
        if (got !== s.correct) return false;      /* known slot must hold its correct tile */
      }
    }
    /* the decoy must not be bound anywhere */
    for (var r in binding) { if (binding.hasOwnProperty(r) && binding[r] === round.decoyId) return false; }
    return Number(number) === trueAnswer(round);
  }

  function fullyBound(round, binding) {
    binding = binding || {};
    var slots = round.slots || [];
    for (var i = 0; i < slots.length; i++) {
      var s = slots[i];
      if (binding[s.role] == null) return false;   /* every slot has a tile or '?' */
    }
    return true;
  }

  /* snapshot — the renderer's view. Exposes the roles (so the activity can lay
     out the diagram) + the shuffled tiles (knowns + decoy, NO flag) + which
     role is the unknown. Deliberately NO `correct`, NO decoyId, NO answer. */
  function snapshot(round) {
    return {
      cog: round.cog,
      diagram: round.diagram,
      op: round.op,                                /* the situation action (the enactment shows it) */
      unknownRole: round.unknownRole,
      roles: (DIAGRAMS[round.diagram] || {}).roles ? DIAGRAMS[round.diagram].roles.slice() : (round.slots || []).map(function (s) { return s.role; }),
      tiles: (round.tiles || []).map(function (t) { return { id: t.id, value: t.value }; })
    };
  }

  function storyHasRoleToken(round) {
    var s = String(round.story || '').toLowerCase();
    for (var i = 0; i < ROLE_TOKENS.length; i++) {
      if (new RegExp('\\b' + ROLE_TOKENS[i] + '\\b').test(s)) return true;
    }
    return false;
  }

  function isReversed(round) {
    /* the dominant story keyword implies the OPPOSITE of the op needed to
       SOLVE for the unknown (the keyword-reversal trap). */
    var solvingIsAdd = (trueAnswer(round) != null) && (function () {
      var k = knownValues(round), d = round.diagram, op = round.op, u = round.unknownRole;
      /* "solving op" = whether you ADD the two knowns to get the answer */
      var a = solveUnknown(d, op, k, u);
      var vals = []; for (var rr in k) vals.push(k[rr]);
      return a === (vals[0] + vals[1]);
    })();
    var addKw = /\b(more|found|got|added|laid|gave him|gained|joined|came)\b/.test(String(round.story || '').toLowerCase());
    var subKw = /\b(away|ate|eaten|left|gave|flew|lost|fell|took|hopped)\b/.test(String(round.story || '').toLowerCase());
    var kwIsAdd = addKw && !subKw ? true : (subKw && !addKw ? false : null);
    if (kwIsAdd === null) return false;
    return kwIsAdd !== solvingIsAdd;
  }

  function facts(round) {
    var allVals = (round.tiles || []).map(function (t) { return t.value; }).concat([trueAnswer(round)]);
    var maxV = Math.max.apply(null, allVals);
    return {
      cog: round.cog,
      answerDerivedNotAuthored: !('answer' in round),     /* no authored answer field */
      slotsIconicUnlabeled: true,                          /* the activity renders no role words */
      fullBindingGraded: true,
      enactmentHidesUnknown: true,                         /* the activity fogs the unknown in the enactment */
      hasDecoy: !!round.decoyId,
      noSlotLabelWordInQuestion: !storyHasRoleToken(round),
      withinTwenty: maxV <= 20 && (round.cog !== 'result' || maxV <= 10),  /* result on-ramp stays within 10 */
      reversed: isReversed(round)
    };
  }

  /* audit — answers + per-round data for the gate's solvers (gate-only). */
  function audit(round) {
    var correct = {};
    (round.slots || []).forEach(function (s) { correct[s.role] = (s.role === round.unknownRole) ? '?' : s.correct; });
    return {
      id: round.id, cog: round.cog, diagram: round.diagram, op: round.op,
      unknownRole: round.unknownRole,
      roles: (DIAGRAMS[round.diagram] || {}).roles.slice(),
      tiles: (round.tiles || []).map(function (t) { return { id: t.id, value: t.value }; }),
      decoyId: round.decoyId,
      correct: correct,                                    /* role -> tileId | '?' */
      answer: trueAnswer(round),                           /* derived, for the oracle */
      story: round.story || ''
    };
  }

  global.VetDiagnosisCore = {
    DIAGRAMS: DIAGRAMS,
    COGS: COGS,
    ROLE_TOKENS: ROLE_TOKENS,
    valueOf: valueOf,
    solveUnknown: solveUnknown,
    knownValues: knownValues,
    trueAnswer: trueAnswer,
    gradeAttempt: gradeAttempt,
    fullyBound: fullyBound,
    snapshot: snapshot,
    facts: facts,
    audit: audit
  };

}(typeof window !== 'undefined' ? window : this));
