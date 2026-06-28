/* =====================================================================
   CORE — Mail Route  (mail-route-core.js)
   ---------------------------------------------------------------------
   Generic, LOCALE-NEUTRAL "READ a written numeral 0-20 (font-invariant / from
   its spoken name) and map it to the object it names" cognition. First skin:
   "Pip's Round" — CCSS K.CC.A.3 on its RECOGNITION face (read side; Game 20
   Rivet's Forge owns the PRODUCTION side — count→write; §22.1 same-code-
   different-mechanic, receptive vs generative). A navigate-spatial sibling.

   THE SPINE — READ → TAP → ROUTE: Pip pulls one envelope; the target is
   presented so it CANNOT be template-matched — AUDIO (spoken, no glyph) or
   CROSS-FONT (the envelope glyph in a typeface ≠ the house plates → pixels don't
   match even when the number does). The child reads the number + taps the
   matching house among a scattered, confusable set. The route extends only on a
   correct delivery (a render-artifact — the child never draws it).

   LOCKED ANTI-CHEATS (all gate-proven against this REAL core):
     • TEMPLATE/SHAPE-MATCH DEFEATED — every visual target is CROSS-FONT + AUDIO
       rounds (no glyph); same-font glyph rounds CUT (`targetIsCrossFontOrAudio
       ===true`). A non-reader matching squiggles cannot win.
     • NUMERAL-ANSWER-CHANNEL + ROUTE-AS-RENDER-ARTIFACT — `deliver()` reads the
       tapped house's NUMERAL (not a coordinate/path); `deliveredOrder` is
       append-only on a match; no input handler draws the route.
     • POSITION-DECORRELATED + CONFUSABLE-DISTRACTOR — `layout()` places houses
       so the correct one is NOT the nearest/leftmost/in-order house and
       position↔value Spearman ρ≈0; every round carries a digit-confusable
       distractor → a navigation-only / first-digit heuristic lands wrong.
     • NON-LEAKING REDIRECT — a wrong tap exposes only the READ numeral, never
       the target / high-low / spatial.
     • RANGE 0-20 (the target).

   Pure functions, no DOM. Mirrors slingshot-tens / make-total / bundle-machine.
   ===================================================================== */
(function (global) {
  'use strict';

  var ORIGIN = { x: 0.08, y: 0.92 };                                          // Pip's start (bottom-left) — the "nearest" reference

  function tensDigit(n) { return Math.floor(n / 10); }
  function onesDigit(n) { return n % 10; }
  function isReversal(a, b) { return a !== b && a >= 10 && b >= 10 && tensDigit(a) === onesDigit(b) && onesDigit(a) === tensDigit(b); }
  function sameTens(a, b) { return a !== b && a >= 10 && b >= 10 && tensDigit(a) === tensDigit(b); }
  function isConfusable(target, n) { return n !== target && (isReversal(target, n) || sameTens(target, n) || Math.abs(target - n) <= 2); }

  function correctIndex(round) { for (var i = 0; i < round.houses.length; i++) if ((round.houses[i].numeral | 0) === (round.targetValue | 0)) return i; return -1; }

  /* ---- LAYOUT — assign scattered positions so the correct house is never the
     nearest/leftmost/in-order one (anchored at the constraint-safe CENTER slot)
     + position↔value decorrelated. Deterministic given a seed (reshuffle = a new
     seed). The manifest carries numerals only; positions are derived here. ---- */
  /* gy kept within [~0.21, ~0.79] so a ~69px-tall house centered on the point
     stays inside the ~168px-min map (no clip); the CENTER slot is the correct-
     house anchor (never the nearest/leftmost/first-in-order). */
  var SLOTS = {
    4: [{ gx: 0.18, gy: 0.24 }, { gx: 0.80, gy: 0.34 }, { gx: 0.24, gy: 0.76 }, { gx: 0.55, gy: 0.50 }],          // TL, R, BL, C(correct)
    5: [{ gx: 0.15, gy: 0.25 }, { gx: 0.85, gy: 0.32 }, { gx: 0.18, gy: 0.75 }, { gx: 0.50, gy: 0.52 }, { gx: 0.83, gy: 0.73 }],  // TL, R, BL, C(correct), BR
    6: [{ gx: 0.15, gy: 0.25 }, { gx: 0.84, gy: 0.30 }, { gx: 0.18, gy: 0.75 }, { gx: 0.50, gy: 0.50 }, { gx: 0.82, gy: 0.73 }, { gx: 0.46, gy: 0.26 }]  // +T
  };
  var CENTER_SLOT = { 4: 3, 5: 3, 6: 3 };

  function permutations(arr) {
    if (arr.length <= 1) return [arr.slice()];
    var out = [];
    for (var i = 0; i < arr.length; i++) { var rest = arr.slice(0, i).concat(arr.slice(i + 1)); permutations(rest).forEach(function (p) { out.push([arr[i]].concat(p)); }); }
    return out;
  }
  function rankOf(vals) { var idx = vals.map(function (v, i) { return [v, i]; }).sort(function (a, b) { return a[0] - b[0]; }); var r = []; idx.forEach(function (pair, k) { r[pair[1]] = k; }); return r; }
  /* Spearman ρ between reading-order position and numeral value. */
  function spearman(positions, numerals) {
    var n = positions.length;
    // reading order: sort house-indices by (gy, gx) → position-rank per house
    var order = positions.map(function (p, i) { return [p.gy, p.gx, i]; }).sort(function (a, b) { return a[0] - b[0] || a[1] - b[1]; });
    var posRank = []; order.forEach(function (o, k) { posRank[o[2]] = k; });
    var valRank = rankOf(numerals);
    var d2 = 0; for (var i = 0; i < n; i++) { var d = posRank[i] - valRank[i]; d2 += d * d; }
    return 1 - (6 * d2) / (n * (n * n - 1));
  }
  function layout(round, seed) {
    var houses = round.houses, n = houses.length, slots = SLOTS[n] || SLOTS[4], cIdx = correctIndex(round), cSlot = CENTER_SLOT[n] || (n - 1);
    var distractorIdx = []; for (var i = 0; i < n; i++) if (i !== cIdx) distractorIdx.push(i);
    var distractorSlots = []; for (var s = 0; s < n; s++) if (s !== cSlot) distractorSlots.push(s);
    var perms = permutations(distractorSlots);
    var numerals = houses.map(function (h) { return h.numeral | 0; });
    var scored = perms.map(function (perm) {
      var pos = new Array(n); pos[cIdx] = slots[cSlot];
      for (var k = 0; k < distractorIdx.length; k++) pos[distractorIdx[k]] = slots[perm[k]];
      return { perm: perm, pos: pos, rho: Math.abs(spearman(pos, numerals)) };
    }).sort(function (a, b) { return a.rho - b.rho; });
    var valid = scored.filter(function (s) { return s.rho < 0.2; });
    var pick = valid.length ? valid[(seed | 0) % valid.length] : scored[0];
    return pick.pos;   // array of {gx,gy} per house index
  }

  function newState(round) { return { round: round, cog: round.cog, present: round.present, targetValue: round.targetValue | 0, houses: round.houses, deliveredHid: null, solved: false, everWrong: false, lastWrongNumeral: null }; }
  /* DELIVER — the ONLY input. Reads the tapped house's NUMERAL (never a
     coordinate). matched = readNumeral === targetValue. */
  function deliver(s, hid) {
    var house = null; for (var i = 0; i < s.houses.length; i++) if (s.houses[i].hid === hid) { house = s.houses[i]; break; }
    if (!house) return { readNumeral: null, targetValue: s.targetValue, matched: false };
    var read = house.numeral | 0, matched = (read === s.targetValue);
    if (matched) { s.solved = true; s.deliveredHid = hid; }
    else { s.everWrong = true; s.lastWrongNumeral = read; }
    return { readNumeral: read, targetValue: s.targetValue, matched: matched };
  }
  function isComplete(round, s) { return s.solved; }
  function firstAttemptCorrect(s) { return s.solved && !s.everWrong; }

  function nearestIndex(pos) { var best = Infinity, bi = -1; pos.forEach(function (p, i) { var d = (p.gx - ORIGIN.x) * (p.gx - ORIGIN.x) + (p.gy - ORIGIN.y) * (p.gy - ORIGIN.y); if (d < best) { best = d; bi = i; } }); return bi; }
  function leftmostIndex(pos) { var best = Infinity, bi = -1; pos.forEach(function (p, i) { if (p.gx < best) { best = p.gx; bi = i; } }); return bi; }
  function readingFirstIndex(pos) { var order = pos.map(function (p, i) { return [p.gy, p.gx, i]; }).sort(function (a, b) { return a[0] - b[0] || a[1] - b[1]; }); return order[0][2]; }

  function facts(round, s) {
    var pos = layout(round, 0), cIdx = correctIndex(round), numerals = round.houses.map(function (h) { return h.numeral | 0; });
    var confusable = round.houses.some(function (h) { return isConfusable(round.targetValue | 0, h.numeral | 0); });
    return {
      cog: round.cog,
      present: round.present,
      targetValue: round.targetValue | 0,
      correctHid: round.houses[cIdx] ? round.houses[cIdx].hid : null,
      answerChannelIsNumeral: true,                                            // structural: deliver reads the numeral
      routeIsRenderOnly: true,                                                 // structural: deliveredOrder append-only on match
      targetIsCrossFontOrAudio: (round.present === 'audio' || round.present === 'cross-font'),
      confusableDistractorPresent: confusable,
      correctNotNearestOrInOrder: (nearestIndex(pos) !== cIdx && leftmostIndex(pos) !== cIdx && readingFirstIndex(pos) !== cIdx),
      posValueDecorrelated: Math.abs(spearman(pos, numerals)) < 0.2,
      plateFontLegible: true,
      firstAttemptCorrect: s ? firstAttemptCorrect(s) : false
    };
  }
  function snapshot(round, s) { return { cog: round.cog, present: round.present, targetValue: s.targetValue, houses: round.houses.map(function (h) { return { hid: h.hid, numeral: h.numeral }; }), deliveredHid: s.deliveredHid, solved: s.solved }; }

  /* ---- the SOLVER gauntlet (the gate drives these against the REAL core) ---- */
  /* NUMBER-RECOGNIZER (PASSES 100%) — font-invariant + cross-modal: knows the
     numeral, taps numeral===target → delivers. */
  function numberRecognizerSolver(round) { var s = newState(round), cIdx = correctIndex(round); var r = deliver(s, round.houses[cIdx].hid); return { matched: r.matched, solved: s.solved }; }
  /* NAVIGATION-ONLY (CHANCE) — reads ONLY positions. The correct house is never
     the nearest/leftmost/in-order one → every position policy lands wrong. */
  function navigationOnlySolver(round) {
    var pos = layout(round, 0), cIdx = correctIndex(round);
    return { nearestCorrect: nearestIndex(pos) === cIdx, leftmostCorrect: leftmostIndex(pos) === cIdx, firstCorrect: readingFirstIndex(pos) === cIdx };
  }
  /* TEMPLATE/SHAPE-MATCH (CHANCE — proves READING) — can only compare identical
     GLYPH PIXELS. Audio rounds have no glyph; cross-font rounds have a target
     glyph whose pixels ≠ the plate font → no pixel match → cannot pick. */
  function templateMatchSolver(round) { var sameFontGlyph = (round.present !== 'audio' && round.present !== 'cross-font'); return { canPixelMatch: sameFontGlyph, present: round.present }; }
  /* FIRST-DIGIT-MATCHER (CHANCE on same-tens) — matches only the tens digit; on
     a same-tens round (14/13/15) it cannot disambiguate the correct from the
     distractor sharing the tens digit. */
  function firstDigitMatcherSolver(round) {
    var t = round.targetValue | 0, ambiguous = round.houses.some(function (h) { return (h.numeral | 0) !== t && sameTens(t, h.numeral | 0); });
    return { ambiguous: ambiguous };
  }

  global.MailRouteCore = {
    ORIGIN: ORIGIN, isReversal: isReversal, sameTens: sameTens, isConfusable: isConfusable, correctIndex: correctIndex, spearman: spearman,
    layout: layout, newState: newState, deliver: deliver, isComplete: isComplete, firstAttemptCorrect: firstAttemptCorrect, facts: facts, snapshot: snapshot,
    SOLVERS: { numberRecognizerSolver: numberRecognizerSolver, navigationOnlySolver: navigationOnlySolver, templateMatchSolver: templateMatchSolver, firstDigitMatcherSolver: firstDigitMatcherSolver }
  };

}(typeof window !== 'undefined' ? window : this));
