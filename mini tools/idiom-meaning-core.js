/* =====================================================================
   GABBY'S FUNNY SAYINGS — CORE  (idiom-meaning-core.js)
   ---------------------------------------------------------------------
   CCSS L.3.5.a — distinguish the literal and nonliteral (figurative) meanings of
   words and phrases in context. First skin: "Gabby's Funny Sayings." Pure
   cognition, NO DOM. The child reads an idiom in a sentence and taps what it
   REALLY means.

   ANSWER IS DERIVED FROM THE CARD KINDS, NEVER A BARE STORED ANSWER. A round
   stores {idiom, sentence, choices:[{text, kind}]} with kinds:
     • 'correct' — the figurative meaning;
     • 'literal' — the trap: what the words literally say (echoes the idiom's
                   words — a "take it literally" reader bites);
     • 'off'     — unrelated.
   `oracle` = the index of the 'correct' card. 0 lines to any protected core +
   lcs-shell.{js,css}.
   ===================================================================== */
(function (global) {
  'use strict';

  var STOP = {};
  ('the a an to at of on in so it its is that and for with was were he she they you we i my her his ' +
   'be been being as by from this these those then there here are am or not no out up off your our')
    .split(' ').forEach(function (w) { STOP[w] = 1; });

  function correctIndex(round) {
    var ch = round.choices || [];
    for (var i = 0; i < ch.length; i++) { if (ch[i].kind === 'correct') return i; }
    return -1;
  }
  function oracle(round) { return correctIndex(round); }
  function grade(round, id) { var c = (round.choices || [])[id]; return !!c && c.kind === 'correct'; }

  function childView(round) {
    return { idiom: round.idiom, sentence: round.sentence, choices: (round.choices || []).map(function (c, i) { return { id: i, text: c.text }; }) };
  }

  function contentTokens(s) {
    return String(s || '').toLowerCase().replace(/[.,!?;:'"]/g, '').split(/\s+/).filter(function (t) { return t && !STOP[t]; });
  }
  function overlapCount(choiceText, idiom) {
    var st = {}; contentTokens(idiom).forEach(function (t) { st[t] = 1; });
    var n = 0, seen = {};
    contentTokens(choiceText).forEach(function (t) { if (st[t] && !seen[t]) { seen[t] = 1; n++; } });
    return n;
  }
  function maxOverlapIndex(round) {
    var best = -1, bestN = -1, tie = false;
    (round.choices || []).forEach(function (c, i) {
      var n = overlapCount(c.text, round.idiom);
      if (n > bestN) { bestN = n; best = i; tie = false; }
      else if (n === bestN) { tie = true; }
    });
    return (tie || bestN <= 0) ? -1 : best;
  }

  function facts(round) {
    var ch = round.choices || [], texts = ch.map(function (c) { return c.text; });
    return {
      oneCorrect: ch.filter(function (c) { return c.kind === 'correct'; }).length === 1,
      hasLiteral: ch.some(function (c) { return c.kind === 'literal'; }),
      threeChoices: ch.length === 3,
      distinct: new Set(texts).size === ch.length,
      hasIdiom: !!round.idiom
    };
  }

  function deckFacts(rounds) {
    rounds = rounds || [];
    var n = rounds.length || 1, longHits = 0, shortHits = 0, overlapHits = 0, posCount = {};
    rounds.forEach(function (r) {
      var ch = r.choices || [], ci = correctIndex(r);
      posCount[ci] = (posCount[ci] || 0) + 1;
      var lens = ch.map(function (c) { return c.text.length; });
      var mx = Math.max.apply(null, lens), mn = Math.min.apply(null, lens);
      if (lens[ci] === mx && lens.filter(function (l) { return l === mx; }).length === 1) longHits++;
      if (lens[ci] === mn && lens.filter(function (l) { return l === mn; }).length === 1) shortHits++;
      if (maxOverlapIndex(r) === ci) overlapHits++;
    });
    var maxPos = Math.max.apply(null, Object.keys(posCount).map(function (k) { return posCount[k]; }));
    return { total: rounds.length, positionBot: maxPos / n, longestBot: longHits / n, shortestBot: shortHits / n, overlapBot: overlapHits / n };
  }

  function audit(round) { return { idiom: round.idiom, correct: (round.choices[correctIndex(round)] || {}).text, choices: round.choices }; }

  global.IdiomMeaningCore = {
    oracle: oracle, grade: grade, childView: childView, overlapCount: overlapCount, maxOverlapIndex: maxOverlapIndex,
    facts: facts, deckFacts: deckFacts, audit: audit
  };

}(typeof window !== 'undefined' ? window : this));
