/* =====================================================================
   DAISY'S PLATE STACK — CORE  (plural-noun-core.js)
   ---------------------------------------------------------------------
   CCSS L.K.1.c — form REGULAR plural nouns by adding /s/ or /es/. First
   skin: "Daisy's Plate Stack." Pure cognition, NO DOM. The child reads a
   request for more-than-one ("Please bring two ___.") and taps the
   correctly-spelled plural.

   THE ANSWER IS DERIVED FROM A RULE, NEVER STORED. A round stores
   {noun, sentence} — never the plural literal. `oracle` = pluralize(noun)
   = noun + "es" after s/x/z/ch/sh, else noun + "s". The 3 chips are DERIVED:
   [pluralize(noun), noun (singular), wrongPlural(noun)] where wrongPlural
   uses the OTHER suffix (cup→"cupes", dish→"dishs") so the /s/-vs-/es/ choice
   is load-bearing. A no-answer-leak check keeps the plural out of the
   sentence. 0 lines to any protected core + lcs-shell.{js,css}.

   NOTE: this is DISTINCT from the existing `plural` engine (L.2.1.b, IRREGULAR
   plurals — mouse→mice). This one is the regular /s/-or-/es/ rule for K.
   ===================================================================== */
(function (global) {
  'use strict';

  var ES_RE = /(?:s|x|z|ch|sh)$/i;   /* the /es/ trigger endings */

  function pluralize(noun) { noun = String(noun || ''); return noun + (ES_RE.test(noun) ? 'es' : 's'); }
  /* the wrong plural = the OTHER branch's suffix (makes the rule load-bearing) */
  function wrongPlural(noun) { noun = String(noun || ''); return noun + (ES_RE.test(noun) ? 's' : 'es'); }

  function oracle(round) { return pluralize(round.noun); }
  function chips(round) { return [oracle(round), String(round.noun || ''), wrongPlural(round.noun)]; }  /* fixed order; the skin shuffles */
  function isAnswer(round, str) { return str === oracle(round); }
  function isEsClass(noun) { return ES_RE.test(String(noun || '')); }

  function sentenceNoAnswerLeak(round) {
    var ans = oracle(round);
    var toks = String(round.sentence || '').toLowerCase().replace(/[.,!?;:]/g, '').split(/\s+/);
    return toks.indexOf(ans.toLowerCase()) < 0;
  }

  function childView(round) {
    return { id: round.id, sentence: round.sentence, chips: chips(round) };   /* noun/answer NOT labeled */
  }

  function facts(round) {
    var ch = chips(round);
    return {
      hasNoun: !!round.noun,
      sentenceHasBlank: String(round.sentence || '').indexOf('___') >= 0,
      sentenceNoAnswerLeak: sentenceNoAnswerLeak(round),
      derivedNotStored: !('answer' in round) && !('plural' in round) && !('expect' in round),
      threeDistinctChips: new Set(ch).size === 3,
      esClass: isEsClass(round.noun)
    };
  }

  function deckFacts(rounds) {
    var nouns = {}, ans = {}, ids = {}, es = 0;
    (rounds || []).forEach(function (r) { nouns[r.noun] = 1; ans[oracle(r)] = (ans[oracle(r)] || 0) + 1; ids[r.id] = 1; if (isEsClass(r.noun)) es++; });
    return { total: (rounds || []).length, distinctNouns: Object.keys(nouns).length, esCount: es, answerCounts: ans, distinctExercises: Object.keys(ids).length };
  }

  function audit(round) {
    return { id: round.id, sentence: round.sentence, noun: round.noun, correct: oracle(round), chips: chips(round), esClass: isEsClass(round.noun) };
  }

  global.PluralNounCore = {
    pluralize: pluralize, wrongPlural: wrongPlural, isEsClass: isEsClass,
    oracle: oracle, chips: chips, isAnswer: isAnswer,
    childView: childView, facts: facts, deckFacts: deckFacts, audit: audit
  };

}(typeof window !== 'undefined' ? window : this));
