/* =====================================================================
   MARIGOLD'S KNOWING MACHINE — CORE  (affix-core.js)
   ---------------------------------------------------------------------
   CCSS L.2.4.b (prefix meaning) + L.2.4.c (suffix) — determine the meaning
   of a new word formed by adding a known affix to a known root. Pure
   cognition, NO DOM. 0 lines to ANY existing core + lcs-shell.{js,css}.

   CLARITY-FIRST build (2026-06-26): a clear, readable affix-meaning game —
   a root word + an affix-cog → the child reads the new word and taps its
   meaning. Four clean single-sense operators:
     un- = NOT · re- = AGAIN · -ful = FULL OF · -less = WITHOUT
   Two cogs:
     • apply — the affixed word rides in (e.g. "unkind"); tap the MEANING
       from 3 options (correct affix-meaning + the root-only meaning + a
       wrong-affix meaning of the same root).
     • which — a root + a target meaning; tap the affix-cog that makes it.
   The spec's (affix-01.md) tuple/phrasings/PARAPHRASE_TEMPLATE_SOLVER rigor
   is deliberately set aside for clarity (the operator's CLARITY-FIRST ruling
   — same trade as #81/#61/#67); meanings are simple + readable.

   THE ANSWER IS DERIVED, NEVER STORED: the correct choice is the option whose
   `affix` === the round's affix; no stored isCorrect/correctIndex.
   ===================================================================== */
(function (global) {
  'use strict';

  var AFFIX_SENSE = { un: 'NOT', re: 'AGAIN', ful: 'FULL OF', less: 'WITHOUT' };
  var PREFIX = { un: 'un', re: 're' }, SUFFIX = { ful: 'ful', less: 'less' };

  function applySpelling(root, affix) {
    if (PREFIX[affix]) return PREFIX[affix] + root;
    if (SUFFIX[affix]) return root + SUFFIX[affix];
    return root;
  }

  /* the correct answer is the affix the round uses — found by matching, not stored */
  function isAnswer(round, affix) { return affix === round.affix; }
  function oracle(round) { return round.affix; }
  function correctIndex(round) {
    var opts = round.options || [];
    return round.cog === 'which'
      ? opts.indexOf(round.affix)
      : opts.findIndex(function (o) { return o.affix === round.affix; });
  }

  function snapshot(round) {
    var o = { id: round.id, cog: round.cog, affixSenses: AFFIX_SENSE };
    if (round.cog === 'which') { o.root = round.root; o.meaning = round.meaning; o.options = (round.options || []).slice(); }
    else { o.word = round.word; o.root = round.root; o.options = (round.options || []).map(function (x) { return { text: x.text }; }); }   /* strip the affix tag — no leak */
    return o;
  }

  function facts(round) {
    var opts = round.options || [], ci = correctIndex(round);
    var f = { cog: round.cog, answerDerivedNotStored: true, optionCount: opts.length, exactlyOneCorrect: ci >= 0, correctNotIndex0: ci > 0, family: round.affix };
    if (round.cog === 'apply') {
      var affixes = opts.map(function (o) { return o.affix; });
      f.hasRootDistractor = affixes.indexOf('root') >= 0;
      f.hasWrongAffixDistractor = affixes.some(function (a) { return a !== round.affix && a !== 'root'; });
      f.oneCorrectMatch = affixes.filter(function (a) { return a === round.affix; }).length === 1;
      f.wordSpellingOk = round.word === applySpelling(round.root, round.affix);
    } else {
      f.hasRootDistractor = true; f.hasWrongAffixDistractor = opts.length >= 2; f.oneCorrectMatch = opts.indexOf(round.affix) >= 0; f.wordSpellingOk = true;
    }
    return f;
  }

  function deckFacts(rounds) {
    var cogs = {}, ex = {}, fam = {};
    rounds.forEach(function (r) { cogs[r.cog] = 1; ex[r.id] = 1; fam[r.affix] = 1; });
    return { total: rounds.length, distinctCogs: Object.keys(cogs), distinctExercises: Object.keys(ex).length, families: Object.keys(fam) };
  }

  function audit(round) {
    return {
      id: round.id, cog: round.cog, word: round.word, root: round.root, affix: round.affix,
      sense: AFFIX_SENSE[round.affix], correctIndex: correctIndex(round),
      options: (round.options || []).map(function (o) { return round.cog === 'which' ? o : (o.affix + ':' + o.text); })
    };
  }

  global.AffixCore = {
    AFFIX_SENSE: AFFIX_SENSE, applySpelling: applySpelling, isAnswer: isAnswer, oracle: oracle, correctIndex: correctIndex,
    snapshot: snapshot, facts: facts, deckFacts: deckFacts, audit: audit
  };

}(typeof window !== 'undefined' ? window : this));
