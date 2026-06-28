/* =====================================================================
   CENTRAL MESSAGE — CORE  (central-message-core.js)
   ---------------------------------------------------------------------
   CCSS RL.1.2 — demonstrate understanding of a story's CENTRAL MESSAGE or
   LESSON. First skin: "Juniper's Story Lantern." Pure cognition, NO DOM.
   The child reads a short fable, then taps the card that states its LESSON.

   THE ANSWER IS THE CARD TAGGED `moral`, NEVER A STORED INDEX. Each round's
   options are {id, text, kind} with exactly one kind:'moral', one
   kind:'detail' (a TRUE line from the story — high word-overlap, but NOT the
   lesson), and one kind:'wrongmoral' (a plausible-but-wrong lesson). The
   abstract moral has LOW story-word overlap, so a "pick the card most like
   the story" shortcut grabs the detail foil and is WRONG — comprehension is
   load-bearing. `childView` exposes the story + the option TEXTS only (never
   `kind`). 0 lines to any protected core + lcs-shell.{js,css}.
   ===================================================================== */
(function (global) {
  'use strict';

  function options(round) { return round.options || []; }
  function optionById(round, id) { var o = options(round); for (var i = 0; i < o.length; i++) if (o[i].id === id) return o[i]; return null; }
  function moralOption(round) { var o = options(round); for (var i = 0; i < o.length; i++) if (o[i].kind === 'moral') return o[i]; return null; }

  /* THE GRADE — the tapped card IS the `moral` card. DERIVED from the tag;
     no stored correctIndex. Pure → the verify gate tests it. */
  function grade(round, pickedId) { var o = optionById(round, pickedId); return !!(o && o.kind === 'moral'); }
  function oracle(round) { var m = moralOption(round); return m ? m.id : null; }

  function storyText(round) { return (round.story || []).join(' '); }
  /* word-overlap of an option's text with the story (gate's "most-like-the-text" bot) */
  function words(s) { return String(s || '').toLowerCase().replace(/[^a-z ]/g, ' ').split(/\s+/).filter(Boolean); }
  function overlap(round, opt) {
    var sw = {}; words(storyText(round)).forEach(function (w) { sw[w] = 1; });
    var n = 0; words(opt.text).forEach(function (w) { if (sw[w]) n++; }); return n;
  }

  /* the ANSWER surface — story + option texts; NEVER the kind/answer. */
  function childView(round) {
    return { id: round.id, story: (round.story || []).slice(), options: options(round).map(function (o) { return { id: o.id, text: o.text }; }) };
  }

  function facts(round) {
    var o = options(round);
    return {
      threeOptions: o.length === 3,
      oneMoral: o.filter(function (x) { return x.kind === 'moral'; }).length === 1,
      oneDetail: o.filter(function (x) { return x.kind === 'detail'; }).length === 1,
      oneWrongMoral: o.filter(function (x) { return x.kind === 'wrongmoral'; }).length === 1,
      derivedNotStored: !('answer' in round) && !('correctIndex' in round)
    };
  }

  function audit(round) {
    return {
      id: round.id, story: storyText(round),
      options: options(round).map(function (o) { return { id: o.id, text: o.text, kind: o.kind, overlap: overlap(round, o), len: o.text.length }; }),
      moralId: (moralOption(round) || {}).id
    };
  }

  global.CentralMessageCore = {
    options: options, optionById: optionById, moralOption: moralOption,
    grade: grade, oracle: oracle, storyText: storyText, overlap: overlap,
    childView: childView, facts: facts, audit: audit
  };

}(typeof window !== 'undefined' ? window : this));
