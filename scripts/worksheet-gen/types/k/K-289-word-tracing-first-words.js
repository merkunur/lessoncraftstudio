/** K-289 — Trace Your First Words. nt20-B-VAR variation of K-284. */
'use strict';
const base = require('./K-284-word-tracing.js');
// One object for all three levels: the waves ship d2 only, so a face must
// render identically whichever level is asked for. Spreading the base entry
// (not a JSON literal) carries function-valued params through intact.
const D = { ...base.difficulty[1], ...{} };
module.exports = {
  ...base,
  id: 'K-289',
  slug: 'word-tracing-first-words',
  // Level Set 2026-10-02: real easier / harder levels (level 2 = the published config); PDF only
  difficulty: { 1: { ...base.difficulty[1], maxLetters: 4, glyphH: 62, laneH: 72, pic: 160, cardW: 184, rowH: 230 }, 2: D, 3: { ...base.difficulty[2], maxLetters: 6 } },
  i18n: { en: { title: "Trace Your First Words", instruction: "Trace the dashed word, then write it on the empty line." } },
};
