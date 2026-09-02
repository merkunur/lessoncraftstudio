/** G1-291 — Write the Word: Only the First Letter. nt20-B-VAR variation of G1-244. */
'use strict';
const base = require('./G1-244-write-the-word.js');
// One object for all three levels: the waves ship d2 only, so a face must
// render identically whichever level is asked for. Spreading the base entry
// (not a JSON literal) carries function-valued params through intact.
const D = { ...base.difficulty[1], ...{"bank":false,"starter":true,"cards":6,"maxLetters":12,"pic":80,"glyphH":30,"rulingW":214} };
module.exports = {
  ...base,
  id: 'G1-291',
  slug: 'write-the-word-first-letter-only',
  difficulty: { 1: D, 2: D, 3: D },
  i18n: { en: { title: "Write the Word: Only the First Letter", instruction: "No word bank. The first letter is on the line to start you off." } },
};
