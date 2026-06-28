/* =====================================================================
   WIGGLES' SENTENCE BUILDER — CORE  (sentence-builder-core.js)
   ---------------------------------------------------------------------
   CCSS L.1.1.j — produce complete simple declarative sentences (also L.K.1.b —
   use frequently occurring nouns and verbs). Pure cognition, NO DOM. 0 lines to
   ANY existing core + lcs-shell.{js,css} / game-shell.*.

   The last "productive-language" deferred core. "Produce a sentence" is open-
   ended, so the clarity-first gradeable form is: arrange SCRAMBLED word-tiles
   into a complete sentence (capital first, period last, words in order). The
   sentences are curated to a UNIQUE grammatical order (Determiner/number/
   possessive + Adjective + Noun + Verb [+ complement]) so exact-order grading
   is unambiguous and a child can't form a different valid sentence.

   THE ANSWER IS THE WORD ORDER (the canonical sentence is the content, like
   cvc-builder's target word) — graded by ordered equality, NEVER a stored
   correctIndex. gradeOrder(placed, canonical) = same words in the same order.
   Re-pointable: change the canonical order → a previously-correct arrangement
   now fails.
   ===================================================================== */
(function (global) {
  'use strict';

  function words(round) { return (round && round.canonical) || []; }

  function gradeOrder(placed, canonical) {
    if (!placed || !canonical || placed.length !== canonical.length) return false;
    for (var i = 0; i < canonical.length; i++) if (placed[i] !== canonical[i]) return false;
    return true;
  }
  function isComplete(placed, n) {
    if (!placed || placed.length !== n) return false;
    for (var i = 0; i < n; i++) if (placed[i] == null) return false;
    return true;
  }

  function _mulberry(seed) {
    return function () {
      seed |= 0; seed = (seed + 0x6D2B79F5) | 0;
      var t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  /* deterministic scramble of the words, GUARANTEED ≠ the canonical order (so
     there is always something to arrange). Locale-stable per seed. */
  function scramble(arr, seed) {
    var canon = arr.join('|'), a = arr.slice(), rnd = _mulberry(seed || 1), g = 0;
    do {
      for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(rnd() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; }
      g++;
    } while (a.join('|') === canon && g < 24 && arr.length > 1);
    return a;
  }

  function snapshot(round) {
    return { id: round.id, slots: words(round).length, tiles: scramble(words(round), round.seed || 1) };   /* the word SET (scrambled) + slot count — NOT the order */
  }

  function facts(round) {
    var w = words(round);
    return {
      wordCount: w.length,
      startsCapital: !!w[0] && /^[A-Z]/.test(w[0]),
      endsPeriod: !!w[w.length - 1] && /[.!?]$/.test(w[w.length - 1]),
      noDuplicateWords: new Set(w.map(function (x) { return x.toLowerCase(); })).size === w.length,
      scrambleDiffers: w.length < 2 || scramble(w, round.seed || 1).join('|') !== w.join('|'),
      derivedNotStored: true
    };
  }

  function deckFacts(rounds) {
    var s = {}, subj = {};
    (rounds || []).forEach(function (r) { s[words(r).join(' ')] = 1; if (r.subject) subj[r.subject.noun] = 1; });
    return {
      total: (rounds || []).length,
      distinctSentences: Object.keys(s).length,
      distinctSubjects: Object.keys(subj).length
    };
  }

  function audit(round) { return { id: round.id, canonical: words(round).join(' '), tiles: scramble(words(round), round.seed || 1) }; }

  global.SentenceBuilderCore = {
    gradeOrder: gradeOrder, isComplete: isComplete, scramble: scramble,
    snapshot: snapshot, facts: facts, deckFacts: deckFacts, audit: audit
  };

}(typeof window !== 'undefined' ? window : this));
