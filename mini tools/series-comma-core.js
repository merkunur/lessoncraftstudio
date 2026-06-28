/* =====================================================================
   CLEO'S PACKING LIST — CORE  (series-comma-core.js)
   ---------------------------------------------------------------------
   CCSS L.1.2.b — use commas to separate single words in a series. First skin:
   "Cleo's Packing List." Pure cognition, NO DOM. 3 versions of a 3-item list
   sentence; the child taps the one with the commas in the right places. 0 lines
   to any protected core + lcs-shell.{js,css}.

   THE 3 FORMS ARE DERIVED FROM `items`, NEVER STORED: from a lead + [a,b,c] the
   core builds
     correct   = "<lead> a, b, and c."
     nocomma   = "<lead> a b and c."           (no commas — unique shortest)
     misplaced = "<lead> a, b and, c."         (comma after "and" — wrong, SAME
                                                 length as correct)
   oracle = the correct form's index, placed at the per-round `slot` (balanced so
   canonical position varies); the activity shuffles a fresh copy for display.
   The misplaced foil is length-matched to the correct → correct is never the
   unique longest; the no-comma foil is the unique shortest (a foil).
   ===================================================================== */
(function (global) {
  'use strict';

  function correctText(round) { var i = round.items; return round.lead + ' ' + i[0] + ', ' + i[1] + ', and ' + i[2] + '.'; }
  function nocommaText(round) { var i = round.items; return round.lead + ' ' + i[0] + ' ' + i[1] + ' and ' + i[2] + '.'; }
  function misplacedText(round) { var i = round.items; return round.lead + ' ' + i[0] + ', ' + i[1] + ' and, ' + i[2] + '.'; }

  /* DERIVED forms; correct placed at the per-round slot, foils fill the rest. */
  function formsOf(round) {
    var correct = correctText(round), foils = [nocommaText(round), misplacedText(round)];
    var slot = (((round.slot || 0) % 3) + 3) % 3, out = [], fi = 0;
    for (var i = 0; i < 3; i++) { if (i === slot) out.push({ text: correct, ok: true }); else out.push({ text: foils[fi++], ok: false }); }
    return out;
  }

  function correctIndex(round) { var f = formsOf(round); for (var i = 0; i < f.length; i++) { if (f[i].ok) return i; } return -1; }
  function oracle(round) { return correctIndex(round); }
  function grade(round, id) { var f = formsOf(round)[id]; return !!f && !!f.ok; }

  function childView(round) {
    return { lead: round.lead, choices: formsOf(round).map(function (f, i) { return { id: i, text: f.text }; }) };
  }

  function facts(round) {
    var f = formsOf(round), texts = f.map(function (x) { return x.text; });
    return {
      hasItems: Array.isArray(round.items) && round.items.length === 3,
      oneOk: f.filter(function (x) { return x.ok; }).length === 1,
      threeForms: f.length === 3,
      distinct: new Set(texts).size === texts.length,
      correctIsCommaForm: (function () { var c = f[correctIndex(round)]; return !!c && c.text === correctText(round); })()
    };
  }

  function deckFacts(rounds) {
    rounds = rounds || [];
    var n = rounds.length || 1, longHits = 0, shortHits = 0, posCount = {}, ans = {};
    rounds.forEach(function (r) {
      var f = formsOf(r), ci = correctIndex(r);
      posCount[ci] = (posCount[ci] || 0) + 1;
      ans[f[ci].text] = (ans[f[ci].text] || 0) + 1;
      var lens = f.map(function (x) { return x.text.length; });
      var mx = Math.max.apply(null, lens), mn = Math.min.apply(null, lens);
      if (lens[ci] === mx && lens.filter(function (l) { return l === mx; }).length === 1) longHits++;
      if (lens[ci] === mn && lens.filter(function (l) { return l === mn; }).length === 1) shortHits++;
    });
    var maxPos = Math.max.apply(null, Object.keys(posCount).map(function (k) { return posCount[k]; }));
    var maxAns = Math.max.apply(null, Object.keys(ans).map(function (k) { return ans[k]; }));
    return { total: rounds.length, positionBot: maxPos / n, longestBot: longHits / n, shortestBot: shortHits / n, fixedGuessBot: maxAns / n };
  }

  function audit(round) { var ci = correctIndex(round); return { lead: round.lead, items: round.items, forms: formsOf(round).map(function (f) { return f.text + (f.ok ? '*' : ''); }), answer: formsOf(round)[ci].text }; }

  global.SeriesCommaCore = {
    correctText: correctText, oracle: oracle, grade: grade, childView: childView,
    facts: facts, deckFacts: deckFacts, audit: audit
  };

}(typeof window !== 'undefined' ? window : this));
