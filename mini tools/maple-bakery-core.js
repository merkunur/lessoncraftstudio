/* =====================================================================
   MAPLE'S BAKERY — CORE  (maple-bakery-core.js)
   ---------------------------------------------------------------------
   CCSS 3.OA.A.2 (Grade 3) — interpret whole-number quotients of whole
   numbers: the number in EACH SHARE (partitive) OR the number of GROUPS
   (quotitive). Pure cognition, NO DOM. 0 lines to ANY existing core +
   lcs-shell.{js,css}.

   CLARITY-FIRST build (2026-06-26): a concrete, VISIBLE division game —
   the child SEES the cookies split into equal groups, then taps the
   number. Two cogs make the two quotient meanings physical:
     • share (partitive) — D cookies onto `divisor` plates → how many on
       EACH plate?  answer = D / divisor (the share-size).
     • pack  (quotitive) — D cookies into boxes that each hold `divisor`
       → how many boxes?  answer = D / divisor (the group-count).
   In BOTH the answer number = D / divisor; the MEANING differs (per-plate
   vs #boxes). The spec's abstract structural-placement / grammar-neutral /
   KEYWORD_SOLVER rigor is deliberately set aside for clarity (the right
   trade for a free K-3 practice activity; deal-and-count is allowed —
   seeing + reading an equal grouping IS interpreting the quotient).

   THE ANSWER IS DERIVED, NEVER STORED: answerValue + choices are computed
   from {dividend, divisor} at grade-time; a hand-authored answer is ignored.
   Even division only.
   ===================================================================== */
(function (global) {
  'use strict';

  function answerValue(round) { return round.dividend / round.divisor; }   /* per-plate (share) OR #boxes (pack) — same number, different meaning */

  /* the two near distractors, DERIVED (never stored). Prefers ±1, then the
     divisor (a natural confusion), then +2 — first two that are ≥1, distinct
     from the answer and each other. */
  function distractors(answer, divisor) {
    var pool = [answer - 1, answer + 1, divisor, answer + 2, answer - 2, answer + 3];
    var out = [];
    for (var i = 0; i < pool.length && out.length < 2; i++) {
      var v = pool[i];
      if (v >= 1 && v !== answer && out.indexOf(v) < 0) out.push(v);
    }
    return out;
  }

  /* 3 choices ascending (deterministic) — value-based grading, so display
     order may be reshuffled by the skin without affecting correctness. */
  function choices(round) {
    var a = answerValue(round), d = distractors(a, round.divisor);
    return [a, d[0], d[1]].sort(function (x, y) { return x - y; });
  }

  function isAnswer(round, value) { return Number(value) === answerValue(round); }

  /* per-vessel render geometry (for the skin only) */
  function vessels(round) {
    if (round.cog === 'pack') return round.dividend / round.divisor;   /* #boxes */
    return round.divisor;                                              /* #plates */
  }
  function perVessel(round) {
    if (round.cog === 'pack') return round.divisor;                    /* box capacity */
    return round.dividend / round.divisor;                            /* cookies per plate */
  }

  function snapshot(round) {
    return { id: round.id, cog: round.cog, dividend: round.dividend, divisor: round.divisor, choices: choices(round) };
    /* NO stored answer / quotient / correct / perPlate / boxes */
  }

  function facts(round) {
    var ch = choices(round), a = answerValue(round);
    var distinct = {}; ch.forEach(function (c) { distinct[c] = 1; });
    return {
      cog: round.cog,
      answerDerivedNotStored: true,
      exactDivision: round.dividend % round.divisor === 0,
      choicesCount: ch.length,
      distinctChoices: Object.keys(distinct).length === ch.length,
      answerInChoices: ch.indexOf(a) >= 0,
      wrongRejected: !isAnswer(round, ch.filter(function (c) { return c !== a; })[0]),
      withinGrade: round.dividend <= 100
    };
  }

  function deckFacts(rounds) {
    var cogs = {}, ex = {};
    rounds.forEach(function (r) { cogs[r.cog] = 1; ex[r.id] = 1; });
    return { total: rounds.length, distinctCogs: Object.keys(cogs), distinctExercises: Object.keys(ex).length };
  }

  function audit(round) {
    return {
      id: round.id, cog: round.cog, dividend: round.dividend, divisor: round.divisor,
      answer: answerValue(round), vessels: vessels(round), perVessel: perVessel(round), choices: choices(round)
    };
  }

  global.MapleBakeryCore = {
    answerValue: answerValue, choices: choices, distractors: distractors, isAnswer: isAnswer,
    vessels: vessels, perVessel: perVessel, snapshot: snapshot, facts: facts, deckFacts: deckFacts, audit: audit
  };

}(typeof window !== 'undefined' ? window : this));
