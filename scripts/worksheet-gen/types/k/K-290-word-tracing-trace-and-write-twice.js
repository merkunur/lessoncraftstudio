/** K-290 — Trace Once, Write It Twice. nt20-B-VAR variation of K-284. */
'use strict';
const base = require('./K-284-word-tracing.js');
// One object for all three levels: the waves ship d2 only, so a face must
// render identically whichever level is asked for. Spreading the base entry
// (not a JSON literal) carries function-valued params through intact.
const D = { ...base.difficulty[3], ...{} };
module.exports = {
  ...base,
  id: 'K-290',
  slug: 'word-tracing-trace-and-write-twice',
  // Level Set 2026-10-02: real easier / harder levels (level 2 = the published config); PDF only
  difficulty: { 1: { ...D, rows: 3, minLetters: 3, maxLetters: 6, glyphH: 50, laneH: 62, pic: 120, cardW: 170, rowH: 210 }, 2: D, 3: { ...D, minLetters: 8, maxLetters: 12, glyphH: 36, laneH: 48, pic: 88 } },
  i18n: { en: { title: "Trace Once, Write It Twice", instruction: "Trace the word once, then write it twice on your own." } },
};
