/** G1-259 — Write the Word: Word Bank, No First Letter. nt20-B-VAR variation of G1-244. */
'use strict';
const base = require('./G1-244-write-the-word.js');
// One object for all three levels: the waves ship d2 only, so a face must
// render identically whichever level is asked for. Spreading the base entry
// (not a JSON literal) carries function-valued params through intact.
const D = { ...base.difficulty[1], ...{"cards":8,"rows":4,"starter":false,"pic":80,"glyphH":30,"rulingW":214,"maxLetters":12} };
module.exports = {
  ...base,
  id: 'G1-259',
  slug: 'write-the-word-word-bank-only',
  // Level Set 2026-10-03: real easier / harder levels (level 2 = the published config); PDF only
  difficulty: { 1: { ...D, cards: 6, rows: 3, maxLetters: 6, pic: 104, glyphH: 36, rulingW: 190 }, 2: D, 3: { ...D, minLetters: 6 } },
  i18n: { en: { title: "Write the Word: Word Bank, No First Letter", instruction: "Every word is in the bank. Write the right one by each picture." } },
};
