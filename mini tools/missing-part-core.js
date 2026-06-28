/* =====================================================================
   CORE — Missing Part  (missing-part-core.js)
   ---------------------------------------------------------------------
   Generic, LOCALE-NEUTRAL "determine the unknown" cognition (the spec's
   `engine-missing-part.js`). First skin: "Fixit's Fix-It Corner" — CCSS
   1.OA.D.8 (determine the unknown whole number in an add/sub equation,
   unknown in ALL positions). A broken gadget shows an equation with one
   glowing socket (the blank); the child supplies the part that whirs it
   to life. The unknown is DERIVED from the linear constraint (never
   stored), so the activity can't leak it.

   Round descriptor (engine-opaque, from the manifest params.rounds):
     LINEAR  { id, band, experience, a, op:'+'|'-', b, c, range, modelState, tool? }
             — exactly ONE of a/b/c is null (the blank). a op b = c.
     BALANCE { id, band, experience:'balance', kind:'balance', a, b, c:null, d, ... }
             — a + b = c + d, c is the blank → c = a+b−d.
     PRODUCE { id, band, experience:'produce', kind:'produce', whole, p1, p2, ... }
             — a complete fact-family; the child HIDES one term to make a
               problem. Every hide is uniquely determined (solveUnique).

   The HEART is the POSITION of the unknown (which strategy it forces),
   NOT number size — and a CONFIRM-AFTER-COMMIT fade so no countable gap
   is ever shown on a computation band (counting a gap would bypass the
   +/− computation). Proven by the build-gate: a computing READER scores
   1.0; a COUNTING-solver fails on every computation band; the bounded
   common-error tray (named error classes, never random) starves a blind
   guesser; and the count-on/back ESCALATION makes the number emerge from
   an enacted operation (hops = the answer), never a gap-match.

   Pure functions, no DOM (mirrors river-steer-core.js / ordering-core.js).
   ===================================================================== */
(function (global) {
  'use strict';

  /* the EN round pool — a FIXED authored ladder (band 1 on-ramp → 2 core →
     3 hard → 4 capstone). Bands 1–3 carry ≥2 members so the within-band
     order-only reshuffle (§A.13.60) changes the sequence every pass. */
  var ROUNDS = [
    /* band 1 — ON-RAMP: counting is the correct method here (full countable). */
    { id: 'm10-7', band: 1, experience: 'make10', a: 7, op: '+', b: null, c: 10, range: 10, modelState: 'countable' },
    { id: 'm10-6', band: 1, experience: 'make10', a: 6, op: '+', b: null, c: 10, range: 10, modelState: 'countable' },
    { id: 'sum-8-5', band: 1, experience: 'missingSum', a: 8, op: '+', b: 5, c: null, range: 20, modelState: 'countable' },
    { id: 'sum-6-7', band: 1, experience: 'missingSum', a: 6, op: '+', b: 7, c: null, range: 20, modelState: 'countable' },
    /* band 2 — CORE: confirm-after-commit (no countable gap); count-on / count-back. */
    { id: 'ma-8-13', band: 2, experience: 'missingAddend', a: 8, op: '+', b: null, c: 13, range: 20, modelState: 'confirmOnly', tool: 'countOn' },
    { id: 'ma-9-15', band: 2, experience: 'missingAddend', a: 9, op: '+', b: null, c: 15, range: 20, modelState: 'confirmOnly', tool: 'countOn' },
    { id: 'ms-13-8', band: 2, experience: 'missingSubtrahend', a: 13, op: '-', b: null, c: 8, range: 20, modelState: 'confirmOnly', tool: 'countBack' },
    /* band 3 — HARD: faded / strategy-tools only (think-addition, recombine, balance). */
    { id: 'mfa-5-12', band: 3, experience: 'missingFirstAddend', a: null, op: '+', b: 5, c: 12, range: 20, modelState: 'faded', tool: 'triangle' },
    { id: 'mm-5-8', band: 3, experience: 'missingMinuend', a: null, op: '-', b: 5, c: 8, range: 20, modelState: 'faded', tool: 'recombine' },
    { id: 'bal-6-6-4', band: 3, experience: 'balance', kind: 'balance', a: 6, b: 6, c: null, d: 4, range: 20, modelState: 'faded' },
    /* band 4 — CAPSTONE: produce-a-problem (deepest no-test mastery). */
    { id: 'prod-13-8-5', band: 4, experience: 'produce', kind: 'produce', whole: 13, p1: 8, p2: 5, range: 20, modelState: 'faded', tool: 'triangle' }
  ];

  var NAMED_ERRORS = ['off-by-one', 'off-by-two', 'copy-shown', 'add-the-visibles', 'wrong-operation'];

  /* the two (or three) SHOWN numbers of a round (blank excluded). */
  function visibles(round) {
    if (round.kind === 'balance') return [round.a, round.b, round.d];
    if (round.kind === 'produce') return [round.whole, round.p1, round.p2];
    var v = [];
    ['a', 'b', 'c'].forEach(function (k) { if (round[k] != null) v.push(round[k]); });
    return v;
  }

  /* THE ONLY answer source — derive the unknown from the constraint.
     LINEAR: solve a op b = c for the one null term. BALANCE: c = a+b−d. */
  function deriveUnknown(round) {
    if (round.kind === 'balance') return round.a + round.b - round.d;   // a+b = c+d
    if (round.kind === 'produce') return null;                          // no single unknown
    var a = round.a, b = round.b, c = round.c, plus = round.op === '+';
    if (c == null) return plus ? a + b : a - b;     // missing result / difference
    if (b == null) return plus ? c - a : a - c;     // missing 2nd addend / subtrahend
    if (a == null) return plus ? c - b : c + b;     // missing 1st addend / minuend
    return null;
  }

  /* brute-force 0..range scan: how many in-range values satisfy the constraint
     in the blank position (uniqueness proof + produce validator). */
  function solveUnique(round) {
    var range = round.range || 20;
    if (round.kind === 'produce') {
      // a hidden config: round.hidden ∈ 'whole'|'p1'|'p2'; the family must
      // make exactly one in-range value fit (whole = p1 + p2).
      var hid = round.hidden || 'whole', count = 0, found = null;
      for (var x = 0; x <= range; x++) {
        var w = hid === 'whole' ? x : round.whole;
        var p1 = hid === 'p1' ? x : round.p1;
        var p2 = hid === 'p2' ? x : round.p2;
        if (w === p1 + p2 && w <= range && p1 <= range && p2 <= range) { count++; found = x; }
      }
      return { count: count, value: found };
    }
    var blankKey = round.kind === 'balance' ? 'c' : (round.a == null ? 'a' : round.b == null ? 'b' : 'c');
    var n = 0, val = null;
    for (var y = 0; y <= range; y++) {
      var holds, terms;
      if (round.kind === 'balance') { holds = (round.a + round.b === y + round.d); }
      else {
        terms = { a: round.a, b: round.b, c: round.c }; terms[blankKey] = y;
        holds = (round.op === '+') ? (terms.a + terms.b === terms.c) : (terms.a - terms.b === terms.c);
        // all terms must stay in range (no negative parts)
        holds = holds && terms.a >= 0 && terms.b >= 0 && terms.c >= 0 && terms.a <= range && terms.b <= range && terms.c <= range;
      }
      if (holds) { n++; val = y; }
    }
    return { count: n, value: val };
  }

  function isCorrect(round, response) {
    if (round.kind === 'produce') {
      // any hide that leaves a uniquely-determined in-range problem is valid
      var probe = Object.assign({}, round, { hidden: response });
      return solveUnique(probe).count === 1;
    }
    return response === deriveUnknown(round);
  }

  /* the bounded common-error tray: 1 correct + 2–3 NAMED common-error parts
     (never random). Out-of-range / duplicate candidates fall to ANOTHER named
     class. Caller shuffles display order. */
  function candidateErrors(round, x) {
    var vis = visibles(round);
    var sumVis = vis.reduce(function (p, n) { return p + n; }, 0);
    var maxVis = Math.max.apply(null, vis);
    var twoDiff = vis.length >= 2 ? Math.abs(vis[0] - vis[1]) : null;
    return [
      { value: x + 1, errorClass: 'off-by-one' },
      { value: x - 1, errorClass: 'off-by-one' },
      { value: maxVis, errorClass: 'copy-shown' },          // copy the biggest shown number (often the total)
      { value: sumVis, errorClass: 'add-the-visibles' },    // add every shown number
      { value: twoDiff, errorClass: 'wrong-operation' },    // subtract the shown numbers (wrong op)
      { value: x + 2, errorClass: 'off-by-two' },
      { value: x - 2, errorClass: 'off-by-two' }
    ];
  }

  function commonErrorParts(round, x) {
    var range = round.range || 20;
    var out = [{ value: x, errorClass: 'correct' }];
    var seen = {}; seen[x] = true;
    var cands = candidateErrors(round, x);
    for (var i = 0; i < cands.length && out.length < 4; i++) {
      var e = cands[i];
      if (e.value == null || e.value < 0 || e.value > range || seen[e.value]) continue;
      seen[e.value] = true; out.push(e);
    }
    // guarantee ≥3 total (1 correct + ≥2 named errors) — pad with off-by-N, NEVER random
    var k = 2;
    while (out.length < 3 && k < range + 3) {
      k++;
      var up = x + k, dn = x - k;
      if (up >= 0 && up <= range && !seen[up]) { seen[up] = true; out.push({ value: up, errorClass: 'off-by-two' }); continue; }
      if (dn >= 0 && dn <= range && !seen[dn]) { seen[dn] = true; out.push({ value: dn, errorClass: 'off-by-two' }); continue; }
    }
    return out;
  }

  /* the after-2-misses escalation: the number EMERGES from an enacted
     operation (count-on/back), the hop COUNT equals the answer — never a
     gap to match. Returns null for bands with no count operation. */
  function escalationOp(round) {
    var x = deriveUnknown(round);
    if (x == null || x < 0) return null;
    var hops, i;
    if (round.experience === 'missingAddend' || round.tool === 'countOn') {
      hops = []; for (i = 1; i <= x; i++) hops.push(round.a + i);
      return { kind: 'countOn', from: round.a, to: round.c, hops: hops };
    }
    if (round.experience === 'missingSubtrahend' || round.tool === 'countBack') {
      hops = []; for (i = 1; i <= x; i++) hops.push(round.a - i);
      return { kind: 'countBack', from: round.a, to: round.c, hops: hops };
    }
    return null;
  }

  /* per-round helpers */
  function signature(round) { return round.experience; }                          // distinctness = the position-family
  function modelState(round) { return round.modelState || 'confirmOnly'; }
  function isComputationBand(round) { return modelState(round) !== 'countable'; }  // confirmOnly / faded
  function hasTray(round) { return round.kind !== 'produce'; }                     // produce has no tray
  function hasInverseScaffold(round) { return round.tool === 'triangle' || round.experience === 'missingFirstAddend' || round.experience === 'produce'; }

  /* ---- solvers for the gate ---- */
  // the computing READER: derive the unknown → always correct (produce: any valid hide).
  function reader(round) { return round.kind === 'produce' ? 'whole' : deriveUnknown(round); }
  // the COUNTING adversary: counts a visible discrete affordance. One exists ONLY
  // on the countable on-ramp; on a computation band there is no countable gap to
  // count → it cannot answer (null). This is what the fade enforces.
  function counting(round) { return modelState(round) === 'countable' ? deriveUnknown(round) : null; }
  // first-try accuracy of a blind picker on the bounded common-error tray.
  function blindTrayAcc(round) { if (!hasTray(round)) return 1; var x = deriveUnknown(round); var t = x == null ? 3 : commonErrorParts(round, x).length; return 1 / t; }

  global.MissingPartCore = {
    ROUNDS: ROUNDS,
    NAMED_ERRORS: NAMED_ERRORS,
    buildRounds: function () { return ROUNDS.map(function (r) { return JSON.parse(JSON.stringify(r)); }); },
    deriveUnknown: deriveUnknown,
    solveUnique: solveUnique,
    isCorrect: isCorrect,
    commonErrorParts: commonErrorParts,
    candidateErrors: candidateErrors,
    visibles: visibles,
    escalationOp: escalationOp,
    signature: signature,
    modelState: modelState,
    isComputationBand: isComputationBand,
    hasTray: hasTray,
    hasInverseScaffold: hasInverseScaffold,
    SOLVERS: { reader: reader, counting: counting, blindTrayAcc: blindTrayAcc }
  };

}(typeof window !== 'undefined' ? window : this));
