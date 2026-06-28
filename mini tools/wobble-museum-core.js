/* =====================================================================
   THE WOBBLE MUSEUM — CORE  (wobble-museum-core.js)
   ---------------------------------------------------------------------
   CCSS W.K.2 — compose informative/explanatory texts: name a TOPIC and supply
   facts about it (the topic-COHERENCE / FOCUS cognition — the documented K
   "knowledge-telling drift"). Pure cognition, NO DOM. 0 lines to ANY existing
   core + lcs-shell.{js,css}.

   CLARITY-FIRST redesign of #85 (2026-06-27): the program's FIRST writing game.
   The spec's CATCH-THE-DRIFT spine is KEPT (a genuinely clear whole-text
   mechanic — find the sentence that wandered off the stated topic) + the
   KEYWORD-DEFEAT (≥1 on-topic fact lacks the topic word; the drift shares
   vocab → it's about TOPIC, not word-matching). SET ASIDE: the commit-topic-
   before-facts authorial flow, the separate graded re-home phase, the hard-lure-
   only grading distinction, and the CATEGORIZATION_BIN/TOPIC_AS_CLUSTER/
   OBVIOUS_LURE solver suite. One clean mechanic: a stated-topic room of 4 facts;
   tap the one that wandered in.

   THE ANSWER IS DERIVED FROM THE about-RELATION vs the room's TOPIC, NEVER
   STORED. A room stores {topic, topicWord, sentences:[{text, about}]}. The drift
   is the sentence where about !== topic (exactly one). isDrift / oracle compute
   it; no stored correctIndex. Re-pointable: change room.topic → the drift moves.
   ===================================================================== */
(function (global) {
  'use strict';

  function sentences(room) { return (room && room.sentences) || []; }

  function isDrift(room, i) {
    var s = sentences(room);
    return i >= 0 && i < s.length && s[i].about !== room.topic;
  }
  function oracle(room) {
    var s = sentences(room);
    for (var i = 0; i < s.length; i++) if (s[i].about !== room.topic) return i;
    return -1;
  }
  function correctCount(room) {
    var s = sentences(room), n = 0;
    for (var i = 0; i < s.length; i++) if (s[i].about !== room.topic) n++;
    return n;
  }
  function driftAbout(room) { var i = oracle(room); return i >= 0 ? sentences(room)[i].about : null; }

  function snapshot(room) {
    return { id: room.id, topic: room.topic, sentences: sentences(room).map(function (s) { return { text: s.text }; }) };   /* about-relation NOT exposed */
  }

  function hasWord(text, word) {
    if (!word) return false;
    /* word-START boundary, any continuation → matches frog/frogs, truck/trucks */
    return new RegExp('\\b' + String(word).replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i').test(String(text || ''));
  }

  function facts(room) {
    var s = sentences(room), tw = room.topicWord;
    var onTopic = s.filter(function (x) { return x.about === room.topic; });
    var topicWordPresent = onTopic.some(function (x) { return hasWord(x.text, tw); });
    var onTopicLacksWord = onTopic.some(function (x) { return !hasWord(x.text, tw); });
    return {
      topic: room.topic,
      sentenceCount: s.length,
      exactlyOneDrift: correctCount(room) === 1,
      topicWordPresent: topicWordPresent,
      keywordDefeat: onTopicLacksWord,   /* ≥1 on-topic fact lacks the topic word → the drift isn't the lone word-absent line */
      derivedNotStored: true,
      oracleValid: oracle(room) >= 0
    };
  }

  function deckFacts(rounds) {
    var topics = {}, ex = {}, positions = {};
    (rounds || []).forEach(function (r) { topics[r.topic] = 1; ex[r.id] = 1; positions[oracle(r)] = 1; });
    return {
      total: (rounds || []).length,
      distinctTopics: Object.keys(topics).length,
      distinctDriftPositions: Object.keys(positions).length,
      distinctExercises: Object.keys(ex).length
    };
  }

  function audit(room) {
    return { id: room.id, topic: room.topic, driftIndex: oracle(room), driftAbout: driftAbout(room), abouts: sentences(room).map(function (s) { return s.about; }) };
  }

  global.WobbleMuseumCore = {
    isDrift: isDrift, oracle: oracle, correctCount: correctCount, driftAbout: driftAbout, hasWord: hasWord,
    snapshot: snapshot, facts: facts, deckFacts: deckFacts, audit: audit
  };

}(typeof window !== 'undefined' ? window : this));
