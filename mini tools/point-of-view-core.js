/* =====================================================================
   LUMEN'S LIGHTHOUSE WINDOWS — CORE  (point-of-view-core.js)
   ---------------------------------------------------------------------
   CCSS RL.1.6 — identify who is telling the story at various points. Pure
   cognition, NO DOM. 0 lines to ANY existing core + lcs-shell.{js,css}.

   CLARITY-FIRST redesign of #66 (2026-06-27): the spec's gate-consumes-the-
   render lock / position-vs-canSee field split / *_NOT_LEXICALLY_IN_LABEL
   keyword lints / teller-shift rung / knowledge tier / human bypass-pilot is
   set aside for clarity. The grade-1-embodied heart is kept: a creature HIGH
   on the tower sees things tiny/far; a creature LOW by the water sees them
   big/close — so a first-person line's VIEW tells you whose eyes it is.

   One cog: a first-person line (view = high|low) + 3 creatures at high/mid/low
   → tap the creature whose viewpoint it is. Heights VARY per round (not a
   fixed cast). THE ANSWER IS DERIVED: correct = the creature whose pos === the
   round's view; no stored isCorrect/index.
   ===================================================================== */
(function (global) {
  'use strict';

  function chars(round) { return round.chars || []; }

  function oracle(round) {
    var c = chars(round);
    for (var i = 0; i < c.length; i++) if (c[i].pos === round.view) return i;
    return -1;
  }
  function isAnswer(round, i) { var c = chars(round); return i >= 0 && i < c.length && c[i].pos === round.view; }

  function snapshot(round) {
    return {
      id: round.id, event: round.event, line: round.line, view: round.view,
      chars: chars(round).map(function (c) { return { id: c.id, name: c.name, glyph: c.glyph, pos: c.pos }; })
    };   /* pos IS shown (the window height the child reasons from); no "correct" flag */
  }

  function facts(round) {
    var c = chars(round), n = c.filter(function (x) { return x.pos === round.view; }).length;
    return {
      view: round.view,
      derivedNotStored: true,
      charCount: c.length,
      exactlyOneViewMatch: n === 1,
      hasHighAndLow: c.some(function (x) { return x.pos === 'high'; }) && c.some(function (x) { return x.pos === 'low'; }),
      oracleValid: oracle(round) >= 0
    };
  }

  function arrangementSig(round) {
    return chars(round).map(function (c) { return c.name + ':' + c.pos; }).sort().join('|');
  }

  function deckFacts(rounds) {
    var views = {}, ex = {}, arr = {};
    rounds.forEach(function (r) { views[r.view] = 1; ex[r.id] = 1; arr[arrangementSig(r)] = 1; });
    return { total: rounds.length, distinctViews: Object.keys(views), distinctExercises: Object.keys(ex).length, distinctArrangements: Object.keys(arr).length };
  }

  function audit(round) {
    return { id: round.id, view: round.view, oracleIndex: oracle(round), chars: chars(round).map(function (c) { return c.name + '@' + c.pos; }) };
  }

  global.PointOfViewCore = {
    oracle: oracle, isAnswer: isAnswer, snapshot: snapshot, facts: facts, deckFacts: deckFacts, audit: audit, arrangementSig: arrangementSig
  };

}(typeof window !== 'undefined' ? window : this));
