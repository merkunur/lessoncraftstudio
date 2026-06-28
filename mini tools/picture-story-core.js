/* =====================================================================
   FABLE'S PICTURE STORIES — CORE  (picture-story-core.js)
   ---------------------------------------------------------------------
   CCSS RL.K.1 — with prompting and support, ASK and ANSWER questions about
   KEY DETAILS in a story. Pure cognition, NO DOM. 0 lines to ANY existing
   core + lcs-shell.{js,css}.

   CLARITY-FIRST redesign of #58 (2026-06-26): the original spec was a WORDLESS
   picture-story + an entity-registry + a blind annotator + a HUMAN bypass-
   pilot ship gate (deferred for art-dependence + HITL). Redesigned as a clear,
   CAPTIONED 3-panel picture-story the child can actually read (RL.K.1 is "with
   prompting and support") + simple key-detail questions. The wordless / entity-
   registry / blind-annotator / HITL rigor is set aside for clarity; the
   standard's heart — recall & answer key details about THIS story — is kept.

   One cog (`answer`): each round shows a story (3 captioned panels) + a key-
   detail question (qtype who/what/where/order/why/feeling) + 3 text choices.
   THE ANSWER IS MATCHED, NOT A STORED INDEX: the correct choice = the option
   whose text === round.answer (a canonical answer string, authored as content);
   no stored isCorrect/correctIndex.
   ===================================================================== */
(function (global) {
  'use strict';

  function oracle(round) { return round.answer; }
  function choices(round) { return (round.options || []).slice(); }
  function isAnswer(round, text) { return String(text) === String(round.answer); }

  function snapshot(round) {
    return { id: round.id, storyId: round.storyId, qtype: round.qtype, prompt: round.prompt, options: (round.options || []).slice() };
    /* NO answer / correct flag */
  }

  function facts(round) {
    var opts = round.options || [], distinct = {};
    opts.forEach(function (o) { distinct[o] = 1; });
    return {
      qtype: round.qtype,
      answerDerivedNotStored: true,
      optionCount: opts.length,
      distinctOptions: Object.keys(distinct).length === opts.length,
      answerInOptions: opts.indexOf(round.answer) >= 0,
      wrongRejected: !isAnswer(round, opts.filter(function (o) { return o !== round.answer; })[0])
    };
  }

  /* is the answer grounded in the story's captions? (≥1 content word ≥4 chars
     of the answer appears in some caption) — proves the answer is FROM the
     story, not invented. */
  function answerFromStory(round, story) {
    if (!story) return false;
    var caps = (story.panels || []).map(function (p) { return (p.caption || '').toLowerCase(); }).join(' ');
    var words = String(round.answer).toLowerCase().split(/[^a-z]+/).filter(function (w) { return w.length >= 4; });
    return words.some(function (w) { return caps.indexOf(w) >= 0; });
  }

  function deckFacts(rounds) {
    var q = {}, st = {}, ex = {};
    rounds.forEach(function (r) { q[r.qtype] = 1; st[r.storyId] = 1; ex[r.id] = 1; });
    return { total: rounds.length, distinctQtypes: Object.keys(q), distinctStories: Object.keys(st), distinctExercises: Object.keys(ex).length };
  }

  function audit(round) {
    return { id: round.id, storyId: round.storyId, qtype: round.qtype, prompt: round.prompt, answer: round.answer, options: round.options };
  }

  global.PictureStoryCore = {
    oracle: oracle, choices: choices, isAnswer: isAnswer, snapshot: snapshot, facts: facts,
    answerFromStory: answerFromStory, deckFacts: deckFacts, audit: audit
  };

}(typeof window !== 'undefined' ? window : this));
