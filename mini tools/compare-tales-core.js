/* =====================================================================
   CORE — Compare Tales  (compare-tales-core.js)
   ---------------------------------------------------------------------
   Generic, LOCALE-NEUTRAL "compare/contrast the adventures of characters
   across two stories" cognition — CCSS RL.K.9 (with prompting and support,
   compare and contrast the adventures and experiences of characters in
   familiar stories). First skin: "Willow's Story Corner."

   CHARACTER-CENTRIC by design (distinct from two-tales-core, RL.1.9, which
   asks the child to tap an EXPERIENCE statement). Here the answer is a
   CHARACTER: the child reads two short tales (A & B), then a question names
   an experience and they tap WHO had it — A / B / Both / Neither.

   THE ANSWER IS DERIVED FROM THE STORIES' FACT-KEYS, NEVER STORED. Each
   story carries a closed boolean fact-set; the round names one dim. The
   answer is derived: in A only → 'a'; in B only → 'b'; in both → 'both';
   in neither → 'neither'. No baked answer/correctKey anywhere. `childView`
   carries the two tales (panels + captions) + the four option labels —
   never the facts or the answer. Pure functions, no DOM.

   A round passed in is RESOLVED: { id, prompt, dim, a:{name,glyph,beats,
   facts}, b:{name,glyph,beats,facts} } (the skin resolves aId/bId against
   params.stories before calling these).
   ===================================================================== */
(function (global) {
  'use strict';

  var OPTIONS = ['a', 'b', 'both', 'neither'];

  function has(story, dim) { return !!(story && story.facts && story.facts[dim] === true); }

  /* THE DERIVED ANSWER — which character(s) had the named experience. */
  function answerKey(round) {
    var aM = has(round.a, round.dim), bM = has(round.b, round.dim);
    return (aM && bM) ? 'both' : aM ? 'a' : bM ? 'b' : 'neither';
  }
  /* THE GRADE — the tapped option IS the derived answer. Pure → testable. */
  function grade(round, pickedKey) { return pickedKey != null && pickedKey === answerKey(round); }

  function optionList(round) {
    return [
      { key: 'a', label: round.a.name },
      { key: 'b', label: round.b.name },
      { key: 'both', label: 'Both' },
      { key: 'neither', label: 'Neither' }
    ];
  }

  /* the two tales to read/narrate (captions visible/spoken — the input) */
  function tale(story) { return { name: story.name, glyph: story.glyph, beats: (story.beats || []).map(function (b) { return { panel: b.panel, caption: b.caption }; }) }; }

  /* the ANSWER surface — the two tales + the question + the option labels;
     NEVER the facts or the answer key. */
  function childView(round) {
    return { id: round.id, prompt: round.prompt, a: tale(round.a), b: tale(round.b), options: optionList(round) };
  }

  /* ---- seeded rng (the gate drives solvers deterministically) ---- */
  function mulberry32(seed) { var a = seed >>> 0; return function () { a |= 0; a = (a + 0x6D2B79F5) | 0; var t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }

  /* ---- SOLVERS (the gate's adversary bank) ---- */
  function oracleSolver(round) { return answerKey(round); }
  function randomGuess(round, rng) { return OPTIONS[Math.floor(rng() * OPTIONS.length)]; }
  function fixedPick(round, key) { return key; }   // "always tap A" / "always Both" etc.

  global.CompareTalesCore = {
    OPTIONS: OPTIONS,
    has: has, answerKey: answerKey, grade: grade, optionList: optionList,
    tale: tale, childView: childView, mulberry32: mulberry32,
    SOLVERS: { oracleSolver: oracleSolver, randomGuess: randomGuess, fixedPick: fixedPick }
  };

}(typeof window !== 'undefined' ? window : this));
