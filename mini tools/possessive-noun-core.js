/* =====================================================================
   HATTIE'S WHOSE-IS-IT — CORE  (possessive-noun-core.js)
   ---------------------------------------------------------------------
   CCSS L.1.1.b — use common, proper, and possessive nouns (the POSSESSIVE-noun
   facet). First skin: "Hattie's Whose-Is-It." Pure cognition, NO DOM. One thing
   belongs to one owner; the child taps the form that shows that ONE owner owns
   it (the singular possessive). 0 lines to any protected core + lcs-shell.{js,css}.

   THE 3 FORMS ARE DERIVED FROM `noun`, NEVER STORED: from a singular noun the
   core builds
     answer = noun + "'s"     (singular possessive — the owner)
     foil-1 = noun + "s"      (plain plural — no apostrophe)
     foil-2 = noun + "s'"     (plural possessive)
   oracle = the answer's index. The plural-possessive foil is the SAME length as
   the answer, so the correct card is never the unique longest; the plain plural
   is the unique shortest (a foil). childView shows the forms but no correctness
   flag.
   ===================================================================== */
(function (global) {
  'use strict';

  function answerOf(round) { return round.noun + "'s"; }
  /* DERIVED forms; the answer is placed at the per-round `slot` (balanced across
     the bank so position varies — gate-honest), foils fill the rest. The
     activity additionally shuffles a fresh copy for the screen. */
  function formsOf(round) {
    var a = round.noun + "'s", foils = [round.noun + 's', round.noun + "s'"];
    var slot = (((round.slot || 0) % 3) + 3) % 3, out = [], fi = 0;
    for (var i = 0; i < 3; i++) { if (i === slot) out.push(a); else out.push(foils[fi++]); }
    return out;
  }
  function correctIndex(round) { return formsOf(round).indexOf(answerOf(round)); }
  function oracle(round) { return correctIndex(round); }
  function grade(round, id) { return formsOf(round)[id] === answerOf(round); }

  function childView(round) {
    return { noun: round.noun, thing: round.thing, choices: formsOf(round).map(function (w, i) { return { id: i, word: w }; }) };
  }

  function facts(round) {
    var forms = formsOf(round), a = answerOf(round);
    return {
      hasNoun: typeof round.noun === 'string' && round.noun.length > 0,
      oneMatch: forms.filter(function (w) { return w === a; }).length === 1,
      threeForms: forms.length === 3,
      distinct: new Set(forms).size === forms.length,
      answerIsPossessive: a === round.noun + "'s"
    };
  }

  function deckFacts(rounds) {
    rounds = rounds || [];
    var n = rounds.length || 1, longHits = 0, shortHits = 0, posCount = {}, ans = {};
    rounds.forEach(function (r) {
      var forms = formsOf(r), ci = correctIndex(r);
      posCount[ci] = (posCount[ci] || 0) + 1;
      ans[answerOf(r)] = (ans[answerOf(r)] || 0) + 1;
      var lens = forms.map(function (w) { return w.length; });
      var mx = Math.max.apply(null, lens), mn = Math.min.apply(null, lens);
      if (lens[ci] === mx && lens.filter(function (l) { return l === mx; }).length === 1) longHits++;
      if (lens[ci] === mn && lens.filter(function (l) { return l === mn; }).length === 1) shortHits++;
    });
    var maxPos = Math.max.apply(null, Object.keys(posCount).map(function (k) { return posCount[k]; }));
    var maxAns = Math.max.apply(null, Object.keys(ans).map(function (k) { return ans[k]; }));
    return { total: rounds.length, positionBot: maxPos / n, longestBot: longHits / n, shortestBot: shortHits / n, fixedGuessBot: maxAns / n };
  }

  function audit(round) { return { noun: round.noun, thing: round.thing, forms: formsOf(round), answer: answerOf(round) }; }

  global.PossessiveNounCore = {
    answerOf: answerOf, formsOf: formsOf, oracle: oracle, grade: grade, childView: childView,
    facts: facts, deckFacts: deckFacts, audit: audit
  };

}(typeof window !== 'undefined' ? window : this));
