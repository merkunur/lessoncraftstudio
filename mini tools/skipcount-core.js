/* =====================================================================
   HOPPER'S LILY HOPS — CORE  (skipcount-core.js)
   ---------------------------------------------------------------------
   CCSS 2.NBT.A.2 (Grade 2) — count within 1000; skip-count by 5s, 10s, 100s.
   Pure cognition, NO DOM. 0 lines to ANY existing core + lcs-shell.{js,css}.

   CLARITY-FIRST build (2026-06-26): a concrete, VISIBLE skip-count game —
   a row of numbered lily-pad stepping stones with one blank pad; the child
   reads the +step pattern and taps the missing number. Two cogs:
     • fill      — one pad is blank (?), tap the missing number (forward OR
                   backward); answer = start + unknownIndex*step.
     • whichstep — a complete row, tap how big each hop is (+5/+10/+100);
                   answer = step.
   The spec's (skipcount-01.md) produce-builder / anti-search / forced-
   interstitial rigor is deliberately set aside for clarity (the operator's
   "#67 skip-counting, CLARITY-FIRST" ruling — same trade as #81/#61).

   THE ANSWER IS DERIVED, NEVER STORED: landing(k) = start + k*step, computed
   from {start, step, unknownIndex}; a hand-authored answer is ignored.
   ===================================================================== */
(function (global) {
  'use strict';

  function term(round, k) { return round.start + k * round.step; }
  function sequence(round) {
    var out = [];
    for (var k = 0; k < round.length; k++) out.push(term(round, k));
    return out;
  }
  function answerValue(round) {
    return round.cog === 'whichstep' ? Math.abs(round.step) : term(round, round.unknownIndex);
  }

  /* the two near distractors for `fill`, DERIVED = the adjacent skip-terms
     (the meaningful miscount: one hop short / one hop long). Clamps below 0. */
  function fillChoices(round) {
    var a = answerValue(round), s = Math.abs(round.step);
    var lo = a - s, hi = a + s;
    if (lo < 0) lo = a + 2 * s;                 /* no negative pad numbers */
    var set = [a, lo, hi].filter(function (v, i, arr) { return arr.indexOf(v) === i; });
    while (set.length < 3) set.push(a + s * (set.length));   /* defensive: keep 3 distinct */
    return set.sort(function (x, y) { return x - y; });
  }
  function choices(round) {
    return round.cog === 'whichstep' ? [5, 10, 100] : fillChoices(round);
  }

  function isAnswer(round, value) { return Number(value) === answerValue(round); }

  function nonMultipleStart(round) { return round.start % Math.abs(round.step) !== 0; }
  function crossesHundred(round) {
    if (Math.abs(round.step) === 100) return false;   /* by-100 trivially "crosses" — not the meaningful test */
    var seq = sequence(round);
    for (var i = 0; i < seq.length - 1; i++) {
      if (Math.floor(seq[i] / 100) !== Math.floor(seq[i + 1] / 100)) return true;
    }
    return false;
  }
  function withinGrade(round) {
    return sequence(round).every(function (v) { return v >= 0 && v <= 1000; });
  }

  function snapshot(round) {
    var seq = sequence(round), o = { id: round.id, cog: round.cog, choices: choices(round) };
    if (round.cog === 'whichstep') { o.sequence = seq; o.direction = round.step < 0 ? 'down' : 'up'; }
    else { o.sequence = seq.map(function (v, i) { return i === round.unknownIndex ? null : v; }); o.step = Math.abs(round.step); o.direction = round.step < 0 ? 'down' : 'up'; }
    return o;   /* NO stored answer / landing / term / correct */
  }

  function facts(round) {
    var ch = choices(round), a = answerValue(round), seq = sequence(round);
    var distinct = {}; ch.forEach(function (c) { distinct[c] = 1; });
    var f = {
      cog: round.cog,
      answerDerivedNotStored: true,
      withinGrade: withinGrade(round),
      choicesCount: ch.length,
      distinctChoices: Object.keys(distinct).length === ch.length,
      answerInChoices: ch.indexOf(a) >= 0,
      wrongRejected: !isAnswer(round, ch.filter(function (c) { return c !== a; })[0]),
      nonMultipleStart: nonMultipleStart(round),
      crossesHundred: crossesHundred(round)
    };
    if (round.cog === 'fill') f.answerNotDisplayed = seq.filter(function (v, i) { return i !== round.unknownIndex; }).indexOf(a) < 0;
    return f;
  }

  function deckFacts(rounds) {
    var cogs = {}, ex = {}, nonMult = 0, cross = 0;
    rounds.forEach(function (r) { cogs[r.cog] = 1; ex[r.id] = 1; if (nonMultipleStart(r)) nonMult++; if (crossesHundred(r)) cross++; });
    return { total: rounds.length, distinctCogs: Object.keys(cogs), distinctExercises: Object.keys(ex).length, nonMultipleCount: nonMult, crossHundredCount: cross };
  }

  function audit(round) {
    return {
      id: round.id, cog: round.cog, start: round.start, step: round.step, length: round.length,
      unknownIndex: round.unknownIndex, sequence: sequence(round), answer: answerValue(round), choices: choices(round),
      nonMultipleStart: nonMultipleStart(round), crossesHundred: crossesHundred(round)
    };
  }

  global.SkipCountCore = {
    term: term, sequence: sequence, answerValue: answerValue, choices: choices, isAnswer: isAnswer,
    nonMultipleStart: nonMultipleStart, crossesHundred: crossesHundred, withinGrade: withinGrade,
    snapshot: snapshot, facts: facts, deckFacts: deckFacts, audit: audit
  };

}(typeof window !== 'undefined' ? window : this));
