/* =====================================================================
   INKY'S BOOK WORKSHOP — CORE  (author-illustrator-core.js)
   ---------------------------------------------------------------------
   CCSS RL.K.6 — name the author and illustrator of a story and define the role
   of each. First skin: "Inky's Book Workshop." Pure cognition, NO DOM. Inky's
   book shows a job being done; the child taps WHOSE job it is. 0 lines to any
   protected core + lcs-shell.{js,css}.

   THE ANSWER IS DERIVED FROM `job`, NEVER A STORED INDEX. A round stores only
   { id, job } with job ∈ {wrote, drew, read}; the role is mapped
     wrote → author     drew → illustrator     read → reader
   and the oracle is the card whose role === that. The 3 role cards are constant
   (canonical order author/illustrator/reader); the activity shuffles them for
   display. The standard is centered on author vs illustrator; the `read` rounds
   add the Reader contrast (the reader does NOT make the book) and make the third
   card a real option so the answer is a true 3-way (no binary 50% floor).
   ===================================================================== */
(function (global) {
  'use strict';

  var ROLES = ['author', 'illustrator', 'reader'];
  var JOB_ROLE = { wrote: 'author', drew: 'illustrator', read: 'reader' };

  function roleOf(round) { return JOB_ROLE[round.job]; }
  function cards() { return ROLES.slice(); }                 /* canonical order */
  function correctIndex(round) { return ROLES.indexOf(roleOf(round)); }
  function oracle(round) { return correctIndex(round); }
  function grade(round, id) { return ROLES[id] === roleOf(round); }

  function childView(round) {
    return { job: round.job, choices: ROLES.map(function (r, i) { return { id: i, role: r }; }) };
  }

  function facts(round) {
    var role = roleOf(round);
    return {
      jobValid: round.job === 'wrote' || round.job === 'drew' || round.job === 'read',
      oneMatch: ROLES.filter(function (r) { return r === role; }).length === 1,
      threeChoices: ROLES.length === 3,
      distinct: new Set(ROLES).size === ROLES.length,
      readerOnlyOnRead: (role === 'reader') === (round.job === 'read')
    };
  }

  function deckFacts(rounds) {
    rounds = rounds || [];
    var n = rounds.length || 1, longHits = 0, shortHits = 0, posCount = {}, ans = {};
    var lens = ROLES.map(function (r) { return r.length; });
    var mx = Math.max.apply(null, lens), mn = Math.min.apply(null, lens);
    rounds.forEach(function (r) {
      var ci = correctIndex(r);
      posCount[ci] = (posCount[ci] || 0) + 1;
      ans[ROLES[ci]] = (ans[ROLES[ci]] || 0) + 1;
      if (lens[ci] === mx && lens.filter(function (l) { return l === mx; }).length === 1) longHits++;
      if (lens[ci] === mn && lens.filter(function (l) { return l === mn; }).length === 1) shortHits++;
    });
    var maxPos = Math.max.apply(null, Object.keys(posCount).map(function (k) { return posCount[k]; }));
    var maxAns = Math.max.apply(null, Object.keys(ans).map(function (k) { return ans[k]; }));
    return { total: rounds.length, positionBot: maxPos / n, longestBot: longHits / n, shortestBot: shortHits / n, fixedGuessBot: maxAns / n };
  }

  function audit(round) { return { job: round.job, role: roleOf(round), choices: ROLES.slice() }; }

  global.AuthorIllustratorCore = {
    ROLES: ROLES, roleOf: roleOf, cards: cards, oracle: oracle, grade: grade, childView: childView,
    facts: facts, deckFacts: deckFacts, audit: audit
  };

}(typeof window !== 'undefined' ? window : this));
