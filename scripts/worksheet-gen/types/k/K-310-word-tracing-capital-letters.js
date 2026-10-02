/** K-310 — Trace the Words in Capital Letters. nt20-B-VAR variation of K-284. */
'use strict';
const base = require('./K-284-word-tracing.js');
// One object for all three levels: the waves ship d2 only, so a face must
// render identically whichever level is asked for. Spreading the base entry
// (not a JSON literal) carries function-valued params through intact.
const D = { ...base.difficulty[1], ...{"case":"upper"} };
module.exports = {
  ...base,
  id: 'K-310',
  slug: 'word-tracing-capital-letters',
  // Level Set 2026-10-02: real easier / harder levels (level 2 = the published config); PDF only
  difficulty: { 1: { ...base.difficulty[1], case: 'upper', maxLetters: 4, glyphH: 62, laneH: 72, pic: 160, cardW: 184, rowH: 230 }, 2: D, 3: { ...base.difficulty[2], case: 'upper', maxLetters: 8 } },
  i18n: { en: { title: "Trace the Words in Capital Letters", instruction: "Trace each word in capitals, then write it yourself." } },
};
