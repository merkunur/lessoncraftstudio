/* =====================================================================
   MAIN TOPIC — CORE  (main-topic-core.js)
   ---------------------------------------------------------------------
   CCSS RI.2.2 — identify the MAIN TOPIC of a text. First skin: "Marina's
   Headline Desk." Pure cognition, NO DOM. The child reads a short article,
   then taps the card that names what it is MOSTLY about.

   THE ANSWER IS THE CARD TAGGED `topic`, NEVER A STORED INDEX. The foils are
   a `detail` (a true small fact the article actually states — high word-
   overlap, but not the topic) and an `offtopic` fact. The detail has the
   HIGHEST word-overlap with the article, so a "pick the card most like the
   text" shortcut grabs the small detail and MISSES the broad topic.
   `childView` exposes the article + option TEXTS only (never `kind`).
   0 lines to any protected core + lcs-shell.{js,css}.
   ===================================================================== */
(function (global) {
  'use strict';

  function options(round) { return round.options || []; }
  function optionById(round, id) { var o = options(round); for (var i = 0; i < o.length; i++) if (o[i].id === id) return o[i]; return null; }
  function topicOption(round) { var o = options(round); for (var i = 0; i < o.length; i++) if (o[i].kind === 'topic') return o[i]; return null; }

  function grade(round, pickedId) { var o = optionById(round, pickedId); return !!(o && o.kind === 'topic'); }
  function oracle(round) { var t = topicOption(round); return t ? t.id : null; }
  function storyText(round) { return (round.story || []).join(' '); }

  function words(s) { return String(s || '').toLowerCase().replace(/[^a-z ]/g, ' ').split(/\s+/).filter(Boolean); }
  function overlap(round, opt) {
    var sw = {}; words(storyText(round)).forEach(function (w) { sw[w] = 1; });
    var n = 0; words(opt.text).forEach(function (w) { if (sw[w]) n++; }); return n;
  }

  function childView(round) {
    return { id: round.id, story: (round.story || []).slice(), options: options(round).map(function (o) { return { id: o.id, text: o.text }; }) };
  }

  function facts(round) {
    var o = options(round);
    return {
      threeOptions: o.length === 3,
      oneTopic: o.filter(function (x) { return x.kind === 'topic'; }).length === 1,
      oneDetail: o.filter(function (x) { return x.kind === 'detail'; }).length === 1,
      oneOfftopic: o.filter(function (x) { return x.kind === 'offtopic'; }).length === 1,
      derivedNotStored: !('answer' in round) && !('correctIndex' in round)
    };
  }

  function audit(round) {
    return {
      id: round.id, story: storyText(round),
      options: options(round).map(function (o) { return { id: o.id, text: o.text, kind: o.kind, overlap: overlap(round, o), len: o.text.length }; }),
      topicId: (topicOption(round) || {}).id
    };
  }

  global.MainTopicCore = {
    options: options, optionById: optionById, topicOption: topicOption,
    grade: grade, oracle: oracle, storyText: storyText, overlap: overlap,
    childView: childView, facts: facts, audit: audit
  };

}(typeof window !== 'undefined' ? window : this));
