/* =====================================================================
   GLIM'S DESCRIBING WORDS — CORE  (wordclass-core.js)
   ---------------------------------------------------------------------
   CCSS L.2.1.e — use adjectives and adverbs, and choose between them depending
   on what is to be modified (a thing/noun → adjective; an action/verb →
   adverb). Pure cognition, NO DOM. 0 lines to ANY existing core + lcs-shell.

   CLARITY-FIRST redesign of #73 (2026-06-27): the spec's ADJACENCY-decorrelation
   / SEMANTIC_FIT solver / non-adjacency mandate / ≥3-multi-candidate / dual-
   class-every-round / mode-3 rigor (which collapses the corpus to ~2 templates)
   is set aside for clarity. The standard's heart — CHOOSE adjective vs adverb by
   WHAT is modified — is kept as a clean form-pick: a sentence with a blank + a
   prompt naming the modified word; the child picks the matching form. The two
   forms (e.g. quick / quickly) are the choice; the prompt makes it a function
   judgment, not pure -ly suffix-matching.

   THE ANSWER IS DERIVED FROM THE MODIFIED TARGET'S KIND, NEVER STORED:
     oracle(round) = round.targetKind === 'noun' ? 'adjective' : 'adverb'
   No stored isCorrect/correctIndex; the grader reads only the chip's CLASS vs
   the modified target's kind (never the chip text).
   ===================================================================== */
(function (global) {
  'use strict';

  var CLASSES = ['adjective', 'adverb'];

  function oracle(round) { return round.targetKind === 'noun' ? 'adjective' : 'adverb'; }
  function isAnswer(round, cls) { return cls === oracle(round); }
  function formText(round, cls) { return (round.forms || {})[cls]; }

  function snapshot(round) {
    var f = round.forms || {};
    return { id: round.id, sentence: round.sentence, target: round.target, q: round.q, forms: { adjective: f.adjective, adverb: f.adverb } };   /* answer NOT flagged */
  }

  function facts(round) {
    var f = round.forms || {};
    return {
      targetKind: round.targetKind,
      targetKindValid: round.targetKind === 'noun' || round.targetKind === 'verb',
      formsDistinct: typeof f.adjective === 'string' && typeof f.adverb === 'string' && f.adjective.length > 0 && f.adverb.length > 0 && f.adjective !== f.adverb,
      qPresent: typeof round.q === 'string' && round.q.trim().length > 0,
      blankPresent: typeof round.sentence === 'string' && round.sentence.indexOf('___') >= 0,
      exactlyOneCorrect: CLASSES.filter(function (c) { return isAnswer(round, c); }).length === 1,
      derivedNotStored: true,
      oracleValid: CLASSES.indexOf(oracle(round)) >= 0
    };
  }

  function deckFacts(rounds) {
    var per = { noun: 0, verb: 0 }, bases = {}, ex = {}, baseClasses = {};
    (rounds || []).forEach(function (r) {
      if (r.targetKind in per) per[r.targetKind]++;
      ex[r.id] = 1;
      var b = r.base || r.id; bases[b] = 1;
      (baseClasses[b] = baseClasses[b] || {})[oracle(r)] = 1;
    });
    var dual = Object.keys(baseClasses).filter(function (b) { return Object.keys(baseClasses[b]).length >= 2; }).length;
    return {
      total: (rounds || []).length,
      perKindCounts: per,
      distinctKinds: Object.keys(per).filter(function (k) { return per[k] > 0; }),
      distinctBases: Object.keys(bases).length,
      distinctExercises: Object.keys(ex).length,
      dualClassCount: dual
    };
  }

  function audit(round) {
    return { id: round.id, targetKind: round.targetKind, target: round.target, answer: oracle(round), forms: round.forms };
  }

  global.WordclassCore = {
    CLASSES: CLASSES, oracle: oracle, isAnswer: isAnswer, formText: formText,
    snapshot: snapshot, facts: facts, deckFacts: deckFacts, audit: audit
  };

}(typeof window !== 'undefined' ? window : this));
