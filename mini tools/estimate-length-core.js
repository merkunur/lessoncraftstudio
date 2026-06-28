/* =====================================================================
   GAUGE'S GOOD GUESS — CORE  (estimate-length-core.js)
   ---------------------------------------------------------------------
   CCSS 2.MD.A.3 — estimate lengths using units of inches, feet, centimeters,
   and meters. First skin: "Gauge's Good Guess." Pure cognition, NO DOM. The
   child reads an object + question and taps the reasonable estimate. 0 lines to
   any protected core + lcs-shell.{js,css}.

   THE ANSWER IS DERIVED BY MATCH, NEVER A STORED INDEX. A round stores
   { id, object, question, answer, options:[3] }; oracle = options.indexOf(answer);
   exactly one option === answer. childView exposes {object, question,
   options:[{text}]} only.

   ESTIMATION-SPECIFIC ANTI-CHEAT: a child could otherwise learn "always pick the
   middle number." So the correct estimate's MAGNITUDE is distributed across the
   bank (sometimes the smallest of the three, sometimes the middle, sometimes the
   largest); deckFacts measures smallest/largest/middle magnitude bots, each of
   which must stay <= chance.
   ===================================================================== */
(function (global) {
  'use strict';

  function correctIndex(round) { return (round.options || []).indexOf(round.answer); }
  function oracle(round) { return correctIndex(round); }
  function grade(round, id) { var o = (round.options || [])[id]; return o != null && o === round.answer; }

  function childView(round) {
    return { object: round.object, question: round.question, options: (round.options || []).map(function (o, i) { return { id: i, text: o }; }) };
  }

  function numOf(s) { var m = String(s).match(/-?\d+(\.\d+)?/); return m ? parseFloat(m[0]) : NaN; }
  /* rank of the correct value among the 3 numeric values: 'min' | 'mid' | 'max' */
  function magRank(round) {
    var vals = (round.options || []).map(numOf);
    var cv = numOf(round.answer);
    var below = vals.filter(function (v) { return v < cv; }).length;
    var above = vals.filter(function (v) { return v > cv; }).length;
    if (below === 0 && above > 0) return 'min';
    if (above === 0 && below > 0) return 'max';
    return 'mid';
  }

  function facts(round) {
    var opts = round.options || [];
    return {
      hasAnswer: typeof round.answer === 'string' && round.answer.length > 0,
      oneMatch: opts.filter(function (o) { return o === round.answer; }).length === 1,
      threeOptions: opts.length === 3,
      distinct: new Set(opts).size === opts.length,
      numeric: opts.every(function (o) { return !isNaN(numOf(o)); })
    };
  }

  function deckFacts(rounds) {
    rounds = rounds || [];
    var n = rounds.length || 1, longHits = 0, shortHits = 0, posCount = {}, ans = {}, mag = { min: 0, mid: 0, max: 0 };
    rounds.forEach(function (r) {
      var opts = r.options || [], ci = correctIndex(r);
      posCount[ci] = (posCount[ci] || 0) + 1;
      ans[r.answer] = (ans[r.answer] || 0) + 1;
      mag[magRank(r)]++;
      var lens = opts.map(function (o) { return o.length; });
      var mx = Math.max.apply(null, lens), mn = Math.min.apply(null, lens);
      if (lens[ci] === mx && lens.filter(function (l) { return l === mx; }).length === 1) longHits++;
      if (lens[ci] === mn && lens.filter(function (l) { return l === mn; }).length === 1) shortHits++;
    });
    var maxPos = Math.max.apply(null, Object.keys(posCount).map(function (k) { return posCount[k]; }));
    var maxAns = Math.max.apply(null, Object.keys(ans).map(function (k) { return ans[k]; }));
    return {
      total: rounds.length, positionBot: maxPos / n, longestBot: longHits / n, shortestBot: shortHits / n, fixedGuessBot: maxAns / n,
      smallestBot: mag.min / n, middleBot: mag.mid / n, largestBot: mag.max / n
    };
  }

  function audit(round) { return { object: round.object, question: round.question, options: round.options, answer: round.answer, mag: magRank(round) }; }

  global.EstimateLengthCore = {
    oracle: oracle, grade: grade, childView: childView,
    facts: facts, deckFacts: deckFacts, audit: audit
  };

}(typeof window !== 'undefined' ? window : this));
