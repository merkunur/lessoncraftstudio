/* =====================================================================
   CORE — Judge Balance  (judge-balance-core.js)
   ---------------------------------------------------------------------
   Generic, LOCALE-NEUTRAL "is the equation FAIR?" cognition (the spec's
   `engine-judge-balance.js`). First skin: "Numbers Court" — CCSS 1.OA.D.7
   (the meaning of the EQUAL SIGN: judge add/sub equations TRUE/FALSE
   RELATIONALLY — "both sides are the same amount" — NOT operationally
   "the answer comes next"). The "=" is a SEE-SAW FULCRUM; each side sits
   in a pan; TRUE means the beam is LEVEL.

   Truth + proof are DERIVED by this engine's own arithmetic (evalSide),
   NEVER a stored `isTrue` tag — so a descriptor can't leak the answer and
   the build-gate can recompute everything.

   The anti-guess backbone, proven MEASURED by the gate (the analog of
   Game 5's counting-solver): the pool is GOLD-dominant (≥60% non-canonical
   forms — commutative a+b=b+a, reversed c=a+b, both-sides a+b=c+d,
   subtraction c=a−b), so an OPERATIONAL reader (compute the left, expect
   the answer on the right) scores ≤0.50; only a RELATIONAL reader (evaluate
   BOTH sides and compare) passes. The periodic REPAIR stage adds a
   regenerate-on-wrong + magnitude-bracketed tray so brute-forcing one beam
   is impossible.

   Pure functions, no DOM, NO Date/Math.random (rng injected so the gate
   can replay). Mirrors missing-part-core.js / mend-page-core.js.
   ===================================================================== */
(function (global) {
  'use strict';

  var GOLD_FORMS = ['commutative', 'reversed', 'both-sides', 'subtraction'];

  /* walk a token stream → integer.  [{t:4},{op:'+',t:3}] → 7 ; [{t:8},{op:'-',t:1}] → 7 */
  function evalSide(tokens) {
    if (!tokens || !tokens.length) return 0;
    var v = tokens[0].t;
    for (var i = 1; i < tokens.length; i++) { var k = tokens[i]; v = (k.op === '-') ? v - k.t : v + k.t; }
    return v;
  }
  function L(round) { return evalSide(round.expr.left); }
  function R(round) { return evalSide(round.expr.right); }
  function isTrue(round) { return L(round) === R(round); }
  function heavier(round) { var d = L(round) - R(round); return d === 0 ? 'level' : (d > 0 ? 'left' : 'right'); }
  function isGold(round) { return GOLD_FORMS.indexOf(round.form) >= 0; }
  function isCanonical(round) { return round.form === 'canonical'; }
  function signature(round) {
    // distinctness = the child's experience (form + verdict + whether repairable),
    // not "same form, new numbers".
    return round.form + '|' + (isTrue(round) ? 'T' : 'F');
  }

  /* ---- round generation (rng = ()=>[0,1); injected) ---- */
  function ri(rng, lo, hi) { return lo + Math.floor(rng() * (hi - lo + 1)); }
  function off(rng) { return rng() < 0.5 ? (rng() < 0.5 ? -1 : 1) : (rng() < 0.5 ? -2 : 2); }   // ±1 or ±2

  /* generate ONE round of `form`. opts.truth (bool) requests a TRUE/FALSE variant
     where the form supports both (commutative + equal-id are intrinsic). range≤10 default. */
  function generateRound(form, rng, opts) {
    opts = opts || {}; var want = opts.truth, max = opts.max || 10, id = 'g' + Math.floor(rng() * 1e6).toString(36);
    var a, b, c, d, wrong;
    switch (form) {
      case 'commutative': {                    // a+b = b+a — always TRUE
        a = ri(rng, 1, max - 1); b = ri(rng, 1, max - a);
        return { id: id, form: form, expr: { left: [{ t: a }, { op: '+', t: b }], right: [{ t: b }, { op: '+', t: a }] }, rel: '=' };
      }
      case 'reversed': {                        // c = a+b  (answer on the LEFT)
        a = ri(rng, 1, max - 1); b = ri(rng, 1, max - a); c = a + b;
        if (want === false) { do { wrong = c + off(rng); } while (wrong < 0 || wrong > max || wrong === c); c = wrong; }
        return { id: id, form: form, expr: { left: [{ t: c }], right: [{ t: a }, { op: '+', t: b }] }, rel: '=' };
      }
      case 'both-sides': {                      // a+b = c+d
        a = ri(rng, 1, max - 1); b = ri(rng, 1, max - a); var s = a + b;
        c = ri(rng, 1, Math.min(max - 1, s - 0)); d = s - c; if (d < 0) d = 0;
        if (want === false) { do { wrong = d + off(rng); } while (wrong < 0 || c + wrong > max || c + wrong === s); d = wrong; }
        return { id: id, form: form, expr: { left: [{ t: a }, { op: '+', t: b }], right: [{ t: c }, { op: '+', t: d }] }, rel: '=' };
      }
      case 'subtraction': {                     // c = a−b
        a = ri(rng, 2, max); b = ri(rng, 1, a - 1); c = a - b;
        if (want === false) { do { wrong = c + off(rng); } while (wrong < 0 || wrong > max || wrong === c); c = wrong; }
        return { id: id, form: form, expr: { left: [{ t: c }], right: [{ t: a }, { op: '-', t: b }] }, rel: '=' };
      }
      case 'canonical': {                       // a+b = c  (the operational form; CAPPED)
        a = ri(rng, 1, max - 1); b = ri(rng, 1, max - a); c = a + b;
        if (want === false) { do { wrong = c + off(rng); } while (wrong < 0 || wrong > max || wrong === c); c = wrong; }
        return { id: id, form: form, expr: { left: [{ t: a }, { op: '+', t: b }], right: [{ t: c }] }, rel: '=' };
      }
      case 'equal-id': {                        // a = a  (useful edge)
        a = ri(rng, 1, max); var rr = a; if (want === false) { do { rr = a + off(rng); } while (rr < 0 || rr > max || rr === a); }
        return { id: id, form: form, expr: { left: [{ t: a }], right: [{ t: rr }] }, rel: '=' };
      }
      default: return generateRound('reversed', rng, opts);
    }
  }

  /* a distribution-correct deck (≥60% GOLD, ≤15% canonical, 40-60% TRUE,
     ≥1 commutative-TRUE, subtraction ≥~20%). Used by the activity at mount
     + by the gate. n≈12. */
  function buildPool(rng, n) {
    n = n || 12;
    var plan = [
      ['commutative', true], ['commutative', true],
      ['reversed', true], ['reversed', false], ['reversed', false],
      ['both-sides', true], ['both-sides', false],
      ['subtraction', true], ['subtraction', false], ['subtraction', false],
      ['canonical', false],
      ['equal-id', true]
    ];
    var out = plan.slice(0, n).map(function (p, i) { var rnd = generateRound(p[0], rng, { truth: p[1] }); rnd.id = p[0] + '-' + i; rnd.band = bandFor(p[0]); return rnd; });
    return out;
  }
  function bandFor(form) { return form === 'commutative' || form === 'canonical' || form === 'equal-id' ? 1 : 2; }

  /* ---- the periodic REPAIR (GOLD-only): swap one element to LEVEL the beam ----
     Swap the STANDALONE side (reversed/subtraction: the lone number on the left)
     or the LAST operand (both-sides) to the value V that makes both sides equal.
     V = the OTHER side's value → always ≥1, never a visible token (a+b is not a
     drawn token), and the tray brackets it interior so the tilt's SIGN can't pick
     it. Returns null on a degenerate target (V∉[1,9]) so the gate skips it. */
  function repairTarget(round) {
    if (!isGold(round) || isTrue(round) || round.form === 'commutative') return null;  // FALSE non-commutative GOLD only
    var side, slotIndex, V;
    if (round.form === 'both-sides') {
      side = 'right'; slotIndex = round.expr.right.length - 1;
      V = L(round) - evalSide(round.expr.right.slice(0, slotIndex));   // c + V = (a+b)
    } else {                                                            // reversed / subtraction: left is the standalone
      side = 'left'; slotIndex = 0;
      V = R(round);                                                     // make the lone left number = the right side
    }
    if (V < 1 || V > 9) return null;
    // repair fires ONLY when the leveling value is NOT a copyable visible token —
    // so the child must REASON the quantity, never copy a number off the board.
    var visible = round.expr.left.concat(round.expr.right).map(function (x) { return x.t; });
    if (visible.indexOf(V) >= 0) return null;
    return { side: side, slotIndex: slotIndex, value: V, tray: bracketTray(V, 5, 10) };
  }
  // magnitude-bracketed tray: V kept INTERIOR (≥1 below + ≥1 above), 5 tiles in [0,max].
  function bracketTray(V, n, max) {
    var set = {}; set[V] = true; var lo = V, hi = V;
    while (Object.keys(set).length < n) {
      lo--; hi++;
      if (lo >= 0) set[lo] = true;
      if (hi <= max && Object.keys(set).length < n) set[hi] = true;
      if (lo < 0 && hi > max) break;
    }
    return Object.keys(set).map(Number).sort(function (a, b) { return a - b; });
  }
  function repairLevels(round, V) {
    var t = repairTarget(round); if (!t) return false;
    var arr = round.expr[t.side].map(function (x) { return Object.assign({}, x); });
    arr[t.slotIndex] = Object.assign({}, arr[t.slotIndex], { t: V });
    var other = evalSide(t.side === 'right' ? round.expr.left : round.expr.right);
    return evalSide(arr) === other;
  }

  /* ---- the dumb-solver gauntlet (the gate runs these) ---- */
  // VERDICT solvers return 'true'|'false'; scored vs the derived isTrue verdict.
  var VERDICT = {
    alwaysTrue: function () { return 'true'; },
    alwaysFalse: function () { return 'false'; },
    // operational reader: only accepts "<computation> = <single answer>"; blind to GOLD shapes.
    computeLeftOnly: function (r) { var rt = r.expr.right; return (rt.length === 1 && rt[0].t === evalSide(r.expr.left)) ? 'true' : 'false'; },
    // shape guesser: "looks canonical (…=one number)" → true.
    pickCanonicalOrder: function (r) { return r.expr.right.length === 1 ? 'true' : 'false'; },
    // reads only the first term of each side.
    firstTermMatch: function (r) { return r.expr.left[0].t === r.expr.right[0].t ? 'true' : 'false'; }
  };
  function verdictScore(solver, pool) {
    var hit = 0; pool.forEach(function (r) { var pred = solver(r) === 'true'; if (pred === isTrue(r)) hit++; }); return hit / pool.length;
  }
  // the honest RELATIONAL oracle — evaluate both sides + compare → always correct.
  function oracleVerdict(r) { return isTrue(r) ? 'true' : 'false'; }

  // REPAIR solvers (over FALSE GOLD rounds).
  var REPAIR = {
    // sign-only: knows which pan is heavy, picks the most extreme tile in the lightening direction.
    signOnly: function (round) { var t = repairTarget(round); var heavy = heavier(round); var pick = heavy === 'right' ? Math.min.apply(null, t.tray) : Math.max.apply(null, t.tray); return pick; },
    // copy a visible token from the other side into the slot.
    copyVisibleToken: function (round) { var other = round.expr.left.concat(round.expr.right).map(function (x) { return x.t; }); var t = repairTarget(round); return other.filter(function (v) { return t.tray.indexOf(v) >= 0; })[0]; }
  };

  global.JudgeBalanceCore = {
    GOLD_FORMS: GOLD_FORMS,
    evalSide: evalSide, L: L, R: R,
    isTrue: isTrue, heavier: heavier, isGold: isGold, isCanonical: isCanonical, signature: signature,
    generateRound: generateRound, buildPool: buildPool, bandFor: bandFor,
    repairTarget: repairTarget, bracketTray: bracketTray, repairLevels: repairLevels,
    VERDICT: VERDICT, verdictScore: verdictScore, oracleVerdict: oracleVerdict, REPAIR: REPAIR
  };

}(typeof window !== 'undefined' ? window : this));
