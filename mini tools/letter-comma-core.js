/* =====================================================================
   PIM'S COMMA MAIL — CORE  (letter-comma-core.js)
   ---------------------------------------------------------------------
   CCSS L.2.2.b — use commas in the greeting and the closing of a letter. First
   skin: "Pim's Comma Mail." Pure cognition, NO DOM. 3 candidate forms of a
   letter's greeting/closing — the correctly-comma'd one + a no-comma form + a
   misplaced-comma form; the child taps the correct one. 0 lines to any protected
   core + lcs-shell.{js,css}.

   THE ANSWER IS DERIVED BY THE `ok` FLAG, NEVER A STORED INDEX. A round stores
   { id, kind, forms:[{text, ok}×3] } with EXACTLY ONE ok:true; oracle = that
   form. The misplaced-comma foil is the SAME length as the correct form (so the
   correct card is never the unique longest); the no-comma foil is the unique
   shortest (a foil). childView exposes {kind, forms:[{text}]} only — no `ok`.
   ===================================================================== */
(function (global) {
  'use strict';

  function correctIndex(round) {
    var f = round.forms || [];
    for (var i = 0; i < f.length; i++) { if (f[i].ok) return i; }
    return -1;
  }
  function oracle(round) { return correctIndex(round); }
  function grade(round, id) { var c = (round.forms || [])[id]; return !!c && !!c.ok; }

  function childView(round) {
    return { kind: round.kind, forms: (round.forms || []).map(function (f, i) { return { id: i, text: f.text }; }) };
  }

  function facts(round) {
    var f = round.forms || [], texts = f.map(function (x) { return x.text; });
    return {
      kindValid: round.kind === 'greeting' || round.kind === 'closing',
      oneOk: f.filter(function (x) { return x.ok; }).length === 1,
      threeForms: f.length === 3,
      distinctTexts: new Set(texts).size === texts.length,
      okHasComma: (function () { var c = f[correctIndex(round)]; return !!c && c.text.indexOf(',') >= 0; })()
    };
  }

  function deckFacts(rounds) {
    rounds = rounds || [];
    var n = rounds.length || 1, longHits = 0, shortHits = 0, posCount = {}, ans = {}, gr = 0, cl = 0;
    rounds.forEach(function (r) {
      var f = r.forms || [], ci = correctIndex(r);
      posCount[ci] = (posCount[ci] || 0) + 1;
      ans[f[ci].text] = (ans[f[ci].text] || 0) + 1;
      if (r.kind === 'greeting') gr++; else if (r.kind === 'closing') cl++;
      var lens = f.map(function (x) { return x.text.length; });
      var mx = Math.max.apply(null, lens), mn = Math.min.apply(null, lens);
      if (lens[ci] === mx && lens.filter(function (l) { return l === mx; }).length === 1) longHits++;
      if (lens[ci] === mn && lens.filter(function (l) { return l === mn; }).length === 1) shortHits++;
    });
    var maxPos = Math.max.apply(null, Object.keys(posCount).map(function (k) { return posCount[k]; }));
    var maxAns = Math.max.apply(null, Object.keys(ans).map(function (k) { return ans[k]; }));
    return { total: rounds.length, positionBot: maxPos / n, longestBot: longHits / n, shortestBot: shortHits / n, fixedGuessBot: maxAns / n, greeting: gr, closing: cl, kindMix: gr > 0 && cl > 0 };
  }

  function audit(round) { var ci = correctIndex(round); return { kind: round.kind, forms: (round.forms || []).map(function (f) { return f.text + (f.ok ? '*' : ''); }), answer: (round.forms[ci] || {}).text }; }

  global.LetterCommaCore = {
    oracle: oracle, grade: grade, childView: childView,
    facts: facts, deckFacts: deckFacts, audit: audit
  };

}(typeof window !== 'undefined' ? window : this));
