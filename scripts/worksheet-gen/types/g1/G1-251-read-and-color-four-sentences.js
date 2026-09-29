/** G1-251 — Read and Color: Four Sentences. nt20-B-VAR variation of G1-242. */
'use strict';
const base = require('./G1-242-read-and-color.js');
// One object for all three levels: the waves ship d2 only, so a face must
// render identically whichever level is asked for. Spreading the base entry
// (not a JSON literal) carries function-valued params through intact.
const D = { ...base.difficulty[1], ...{} };
module.exports = {
  ...base,
  id: 'G1-251',
  slug: 'read-and-color-four-sentences',
  // Level Set 2026-09-30: L1 one or two of each picture (big pictures) · L3 three or four, among pictures of TWO other nouns; L2 = the published page
  difficulty: { 1: { ...D, nMin: 2, nMax: 2 }, 2: D, 3: { ...D, nMin: 3, nMax: 4, distract: [2], others: 2, icon: 80 } },
  i18n: { en: { title: "Read and Color: Four Sentences", instruction: "Read each sentence, then color exactly what it asks for." } },
};
