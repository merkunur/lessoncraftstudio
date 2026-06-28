/* =====================================================================
   COCO'S SOUND BOXES — CORE  (sound-boxes-core.js)
   ---------------------------------------------------------------------
   CCSS RF.K.2.d — isolate and pronounce the INITIAL, MEDIAL-VOWEL, and FINAL
   sounds (phonemes) in three-phoneme CVC words. Pure cognition, NO DOM. 0 lines
   to ANY existing core + lcs-shell.{js,css} / game-shell.*.

   Deferred from the E2 phoneme work ("RF.K.2.d DEFER→phoneme/Elkonin core"):
   the live E2 activities cover INITIAL-sound recognition only (RF.K.3.a); the
   medial-vowel + final-sound isolation across all 3 positions — in the iconic
   Elkonin-box frame — is the unowned RF.K.2.d core.

   GRADING CONSTRAINT (decisive): a child's spoken sound can't be graded and
   isolated-phoneme TTS is unreliable. So "isolate the position-sound" is graded
   in its clarity-first, whole-word-audio form: MATCH the position-phoneme across
   CVC-word pictures, with the Elkonin boxes (+ the highlighted target box) as
   the segmentation scaffold.

   THE ANSWER IS DERIVED FROM THE position-PHONEME, NEVER STORED. A round stores
   { position:'b'|'m'|'e', target:{noun,themeDir,b,m,e}, options:[{…b,m,e}] };
   each word carries its 3 phonemes as SOUND keys (k for c/k, etc.) so
   grapheme≠phoneme never mis-matches. isAnswer(round,i) = options[i][position]
   === target[position]; oracle = that index. No stored correctIndex. Re-pointable:
   change round.position → a different option matches.
   ===================================================================== */
(function (global) {
  'use strict';

  var POS = { b: 1, m: 1, e: 1 };   /* valid position keys */

  function opts(round) { return (round && round.options) || []; }
  function phonemeAt(word, pos) { return word ? word[pos] : undefined; }

  function isAnswer(round, i) {
    var o = opts(round), p = round && round.position, t = round && round.target;
    if (i < 0 || i >= o.length || !t || !POS[p]) return false;
    return phonemeAt(o[i], p) === phonemeAt(t, p);
  }
  function oracle(round) {
    var o = opts(round);
    for (var i = 0; i < o.length; i++) if (isAnswer(round, i)) return i;
    return -1;
  }
  function correctCount(round) {
    var o = opts(round), n = 0;
    for (var i = 0; i < o.length; i++) if (isAnswer(round, i)) n++;
    return n;
  }

  function snapshot(round) {
    return {
      id: round.id, position: round.position,
      target: { noun: round.target.noun },
      options: opts(round).map(function (x) { return { noun: x.noun }; })   /* phoneme-match NOT exposed */
    };
  }

  function hasPhonemes(w) { return !!w && !!w.b && !!w.m && !!w.e; }

  function facts(round) {
    var o = opts(round);
    return {
      position: round.position,
      positionValid: !!POS[round.position],
      optionCount: o.length,
      exactlyOneMatch: correctCount(round) === 1,
      allHavePhonemes: hasPhonemes(round.target) && o.every(hasPhonemes),
      derivedNotStored: true,
      oracleValid: oracle(round) >= 0
    };
  }

  function deckFacts(rounds) {
    var pos = {}, tg = {}, ex = {};
    (rounds || []).forEach(function (r) { pos[r.position] = 1; tg[r.target.noun] = 1; ex[r.id] = 1; });
    return {
      total: (rounds || []).length,
      distinctPositions: Object.keys(pos).length,
      distinctTargets: Object.keys(tg).length,
      distinctExercises: Object.keys(ex).length
    };
  }

  function audit(round) {
    return { id: round.id, position: round.position, target: round.target.noun, oracleIndex: oracle(round), options: opts(round).map(function (x) { return x.noun + ':' + x[round.position]; }) };
  }

  global.SoundBoxesCore = {
    isAnswer: isAnswer, oracle: oracle, correctCount: correctCount, phonemeAt: phonemeAt,
    snapshot: snapshot, facts: facts, deckFacts: deckFacts, audit: audit
  };

}(typeof window !== 'undefined' ? window : this));
