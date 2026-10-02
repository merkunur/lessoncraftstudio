/** K-291 — Trace the Longer Words. nt20-B-VAR variation of K-284. */
'use strict';
const base = require('./K-284-word-tracing.js');
// One object for all three levels: the waves ship d2 only, so a face must
// render identically whichever level is asked for. Spreading the base entry
// (not a JSON literal) carries function-valued params through intact.
const D = { ...base.difficulty[3], ...{"rows":3,"minLetters":8,"maxLetters":12,"glyphH":42,"laneH":54,"pic":104,"cardW":210,"rowH":218} };
module.exports = {
  ...base,
  id: 'K-291',
  slug: 'word-tracing-long-words',
  // Level Set 2026-10-02: real easier / harder levels (level 2 = the published config); PDF only
  difficulty: { 1: { ...D, minLetters: 7, maxLetters: 9, glyphH: 48, laneH: 60, pic: 120 }, 2: D, 3: { ...D, rows: 4, minLetters: 8, maxLetters: 13, glyphH: 36, laneH: 48, pic: 88, cardW: 190, rowH: 178 } },
  i18n: { en: { title: "Trace the Longer Words", instruction: "These words are long. Trace each one, then write it yourself." } },
};
