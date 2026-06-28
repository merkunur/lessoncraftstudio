/* =====================================================================
   DOT'S STORY SPINE — CORE  (story-spine-core.js)
   ---------------------------------------------------------------------
   CCSS RL.K.3 — with prompting and support, describe characters, settings,
   and major events in a story (the story-grammar role-typing facet: the
   SETTING / PROBLEM / SOLUTION — "the start / the trouble / the fix"). Also
   RL.K.5 (common story structure). Pure cognition, NO DOM. 0 lines to ANY
   existing core + lcs-shell.{js,css}.

   CLARITY-FIRST redesign of #62 (2026-06-26): the spec's graded-per-role
   AFFECT_SOLVER / ELIMINATION_SOLVER / affect-matched swing-pairs / load-
   bearing decoy / blind-annotator / HUMAN bypass-pilot / role≠order rigor is
   set aside for clarity. The standard's heart — assign each major part its
   narrative JOB — is kept in a clear, readable form: a captioned 3-panel
   story (in order) + "which part is the start / the trouble / the fix?".
   Distinct from #58 (Fable, RL.K.1 detail-recall) by mechanic: function-
   typing of the story PARTS (tap a panel), not detail recall.

   THE ANSWER IS DERIVED FROM THE STORY, NEVER STORED: the correct panel is
   the one whose `role` === the round's asked role; no stored isCorrect/index.
   ===================================================================== */
(function (global) {
  'use strict';

  function panelsOf(story) { return (story && story.panels) || []; }

  function oracle(round, story) {
    var p = panelsOf(story);
    for (var i = 0; i < p.length; i++) if (p[i].role === round.role) return i;
    return -1;
  }
  function isAnswer(round, story, idx) {
    var p = panelsOf(story);
    return idx >= 0 && idx < p.length && p[idx].role === round.role;
  }

  function snapshot(round, story) {
    return {
      id: round.id, storyId: round.storyId, role: round.role, prompt: round.prompt,
      panels: panelsOf(story).map(function (p) { return { caption: p.caption, glyphs: (p.glyphs || []).slice() }; })   /* role NOT exposed */
    };
  }

  function facts(round, story) {
    var p = panelsOf(story), n = p.filter(function (x) { return x.role === round.role; }).length;
    return {
      role: round.role,
      roleDerivedNotStored: true,
      panelCount: p.length,
      exactlyOneRolePanel: n === 1,
      oracleValid: oracle(round, story) >= 0
    };
  }

  function deckFacts(rounds, stories) {
    var roles = {}, st = {}, ex = {};
    rounds.forEach(function (r) { roles[r.role] = 1; st[r.storyId] = 1; ex[r.id] = 1; });
    return { total: rounds.length, distinctRoles: Object.keys(roles), distinctStories: Object.keys(st), distinctExercises: Object.keys(ex).length };
  }

  function audit(round, story) {
    return { id: round.id, storyId: round.storyId, role: round.role, oracleIndex: oracle(round, story), panelRoles: panelsOf(story).map(function (p) { return p.role; }) };
  }

  global.StorySpineCore = {
    oracle: oracle, isAnswer: isAnswer, snapshot: snapshot, facts: facts, deckFacts: deckFacts, audit: audit
  };

}(typeof window !== 'undefined' ? window : this));
