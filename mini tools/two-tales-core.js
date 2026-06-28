/* =====================================================================
   TWO MOONS — CORE  (two-tales-core.js)
   ---------------------------------------------------------------------
   CCSS RL.1.9 — compare and contrast the adventures and experiences of
   characters in two stories (the CROSS-text experience-comparison facet).
   Pure cognition, NO DOM. 0 lines to ANY existing core + lcs-shell.{js,css}.

   CLARITY-FIRST redesign of #68 (2026-06-27): the spec's per-enum varied-
   wording SYNONYM BANK, the render-consuming EXPERIENCE_WORD_MATCH_SOLVER /
   lexical-distance / NO_POLARITY_ONLY_DIVERGENCE / picture-mutual-information
   / mute-QA rigor and the 2nd which-part-differs cognition are set aside for
   clarity. The standard's heart — compare two characters' EXPERIENCES across
   two stories — is kept in a clear, readable form: read two short tales, then
   judge what is the SAME in both / what happened in ONLY ONE. Distinct from
   the within-text RL builds (#58 detail-recall, #62 role-typing, #66 POV) by
   being CROSS-text.

   THE ANSWER IS DERIVED FROM THE STORIES, NEVER STORED. Each story carries a
   small set of experience TAGS (a closed set). The correct card is the one
   whose tag satisfies the round's mode predicate over the two tag-sets:
     mode 'same' → tag is in BOTH stories      (tag ∈ A.tags ∩ B.tags)
     mode 'diff' → tag is in EXACTLY ONE story  (tag ∈ A.tags △ B.tags)
   No stored isCorrect / correctIndex / verdict anywhere.
   ===================================================================== */
(function (global) {
  'use strict';

  function tagsOf(story) { return (story && story.tags) || []; }
  function has(story, tag) { return tagsOf(story).indexOf(tag) >= 0; }

  function inBoth(round, stories, tag) {
    return has(stories[round.aId], tag) && has(stories[round.bId], tag);
  }
  function inOne(round, stories, tag) {
    return has(stories[round.aId], tag) !== has(stories[round.bId], tag);   /* XOR */
  }
  function pred(round) { return round.mode === 'diff' ? inOne : inBoth; }

  function isAnswer(round, stories, i) {
    var t = (round.cardTags || [])[i];
    return t != null && pred(round)(round, stories, t);
  }
  function oracle(round, stories) {
    var c = round.cardTags || [];
    for (var i = 0; i < c.length; i++) if (pred(round)(round, stories, c[i])) return i;
    return -1;
  }
  function correctCount(round, stories) {
    var c = round.cardTags || [], n = 0;
    for (var i = 0; i < c.length; i++) if (pred(round)(round, stories, c[i])) n++;
    return n;
  }

  function snapshot(round, stories) {
    var a = stories[round.aId] || {}, b = stories[round.bId] || {};
    return {
      id: round.id, mode: round.mode,
      a: { summary: a.summary }, b: { summary: b.summary },
      cardTags: (round.cardTags || []).slice()   /* verdict NOT exposed */
    };
  }

  function facts(round, stories) {
    return {
      mode: round.mode,
      modeValid: round.mode === 'same' || round.mode === 'diff',
      cardCount: (round.cardTags || []).length,
      exactlyOneCorrect: correctCount(round, stories) === 1,
      derivedNotStored: true,
      bothHaveTags: tagsOf(stories[round.aId]).length > 0 && tagsOf(stories[round.bId]).length > 0,
      oracleValid: oracle(round, stories) >= 0
    };
  }

  function deckFacts(rounds, stories) {
    var modes = {}, pairs = {}, ex = {};
    (rounds || []).forEach(function (r) {
      modes[r.mode] = 1; ex[r.id] = 1;
      pairs[[r.aId, r.bId].sort().join('~')] = 1;
    });
    return {
      total: (rounds || []).length,
      distinctModes: Object.keys(modes),
      distinctPairs: Object.keys(pairs).length,
      distinctExercises: Object.keys(ex).length
    };
  }

  function audit(round, stories) {
    return {
      id: round.id, mode: round.mode, pair: [round.aId, round.bId],
      aTags: tagsOf(stories[round.aId]), bTags: tagsOf(stories[round.bId]),
      cardTags: (round.cardTags || []).slice(), oracleIndex: oracle(round, stories)
    };
  }

  global.TwoTalesCore = {
    tagsOf: tagsOf, inBoth: inBoth, inOne: inOne,
    isAnswer: isAnswer, oracle: oracle, correctCount: correctCount,
    snapshot: snapshot, facts: facts, deckFacts: deckFacts, audit: audit
  };

}(typeof window !== 'undefined' ? window : this));
