/** G1-260 — Write the Word on Plain Lines. nt20-B-VAR variation of G1-244. */
'use strict';
const base = require('./G1-244-write-the-word.js');
// One object for all three levels: the waves ship d2 only, so a face must
// render identically whichever level is asked for. Spreading the base entry
// (not a JSON literal) carries function-valued params through intact.
const D = { ...base.difficulty[3], ...{} };
module.exports = {
  ...base,
  id: 'G1-260',
  slug: 'write-the-word-on-plain-lines',
  // Level Set 2026-10-03: real easier / harder levels (level 2 = the published config); PDF only
  difficulty: { 1: { ...D, cards: 6, rows: 3, minLetters: 2, maxLetters: 6, pic: 104, glyphH: 36, rulingW: 190 }, 2: D, 3: { ...D, minLetters: 7 } },
  i18n: { en: { title: "Write the Word on Plain Lines", instruction: "No word bank this time. Write each picture word on the lines." } },
};
