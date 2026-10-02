/** K-311 — Copy the Word. nt20-B-VAR variation of K-284. */
'use strict';
const base = require('./K-284-word-tracing.js');
// One object for all three levels: the waves ship d2 only, so a face must
// render identically whichever level is asked for. Spreading the base entry
// (not a JSON literal) carries function-valued params through intact.
const D = { ...base.difficulty[3], ...{"traceLane":false} };
module.exports = {
  ...base,
  id: 'K-311',
  slug: 'word-tracing-copy-the-word',
  // Level Set 2026-10-02: real easier / harder levels (level 2 = the published config); PDF only
  difficulty: { 1: { ...D, rows: 3, minLetters: 2, maxLetters: 5, glyphH: 52, laneH: 64, pic: 130, cardW: 176, rowH: 218 }, 2: D, 3: { ...D, minLetters: 8, maxLetters: 12, glyphH: 36, laneH: 48, pic: 88 } },
  i18n: { en: { title: "Copy the Word", instruction: "There are no dashed letters. Look at the word on the card and copy it twice." } },
};
