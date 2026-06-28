/* =====================================================================
   POSY'S EGG CARTONS — CORE  (count-tens-core.js)
   ---------------------------------------------------------------------
   CCSS K.CC.A.1 — count to 100 by ones and by TENS. First skin: "Posy's Egg
   Cartons." Pure cognition, NO DOM. The child sees `tens` full cartons of ten
   eggs and counts BY TENS to the total. 0 lines to any protected core +
   lcs-shell.{js,css}.

   THE ANSWER IS DERIVED FROM `tens`, NEVER STORED: answer = 10 * tens. A round
   stores only { id, tens }. The 3 number cards are DERIVED too — the correct
   total plus two pedagogically-meaningful miscounts:
     • `tens`        — "counted the cartons by ones / forgot the zero"
     • `10*tens + 10`— "one carton too many"
   By value  tens < 10*tens < 10*tens+10,  so the correct total is the MIDDLE
   value: a longest-card bot lands on the +10 foil, a shortest-card bot on the
   by-ones foil (both wrong). The canonical card order places the correct card
   at index `tens % 3` so its position varies across the bank (gate-honest); the
   activity ADDITIONALLY shuffles the cards for display.
   ===================================================================== */
(function (global) {
  'use strict';

  function answerValue(round) { return 10 * round.tens; }

  /* The two foils, ascending. Defensive de-dup keeps 3 distinct for tens >= 1. */
  function foils(round) {
    var t = round.tens, base = 10 * t;
    var f = [t, base + 10];
    f.sort(function (a, b) { return a - b; });
    return f;
  }

  /* DERIVED canonical order: correct card at index (tens % 3), foils in the
     other two slots in ascending order. Deterministic (no RNG) so verify is
     stable; the activity shuffles a fresh copy for the screen. */
  function orderedValues(round) {
    var base = answerValue(round), f = foils(round);
    var idx = ((round.tens % 3) + 3) % 3, out = [], fi = 0;
    for (var i = 0; i < 3; i++) { if (i === idx) out.push(base); else out.push(f[fi++]); }
    return out;
  }

  function correctIndex(round) { return orderedValues(round).indexOf(answerValue(round)); }
  function oracle(round) { return correctIndex(round); }
  function grade(round, id) { return orderedValues(round)[id] === answerValue(round); }

  function childView(round) {
    return { tens: round.tens, choices: orderedValues(round).map(function (v, i) { return { id: i, value: v }; }) };
  }

  function facts(round) {
    var vals = orderedValues(round), a = answerValue(round);
    return {
      oneMatch: vals.filter(function (v) { return v === a; }).length === 1,
      threeChoices: vals.length === 3,
      distinct: new Set(vals).size === vals.length,
      tensInRange: round.tens >= 1 && round.tens <= 10,
      answerIsTenTimes: a === 10 * round.tens
    };
  }

  function deckFacts(rounds) {
    rounds = rounds || [];
    var n = rounds.length || 1, longHits = 0, shortHits = 0, posCount = {}, ans = {};
    rounds.forEach(function (r) {
      var vals = orderedValues(r), ci = correctIndex(r), a = answerValue(r);
      posCount[ci] = (posCount[ci] || 0) + 1;
      ans[a] = (ans[a] || 0) + 1;
      var lens = vals.map(function (v) { return String(v).length; });
      var mx = Math.max.apply(null, lens), mn = Math.min.apply(null, lens);
      if (lens[ci] === mx && lens.filter(function (l) { return l === mx; }).length === 1) longHits++;
      if (lens[ci] === mn && lens.filter(function (l) { return l === mn; }).length === 1) shortHits++;
    });
    var maxPos = Math.max.apply(null, Object.keys(posCount).map(function (k) { return posCount[k]; }));
    var maxAns = Math.max.apply(null, Object.keys(ans).map(function (k) { return ans[k]; }));
    return { total: rounds.length, positionBot: maxPos / n, longestBot: longHits / n, shortestBot: shortHits / n, fixedGuessBot: maxAns / n };
  }

  function audit(round) { return { tens: round.tens, answer: answerValue(round), choices: orderedValues(round) }; }

  global.CountTensCore = {
    answerValue: answerValue, oracle: oracle, grade: grade, childView: childView,
    facts: facts, deckFacts: deckFacts, audit: audit
  };

}(typeof window !== 'undefined' ? window : this));
