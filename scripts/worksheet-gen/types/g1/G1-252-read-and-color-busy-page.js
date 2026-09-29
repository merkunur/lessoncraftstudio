/** G1-252 — Read and Color: A Busy Page. nt20-B-VAR variation of G1-242. */
'use strict';
const base = require('./G1-242-read-and-color.js');
// One object for all three levels: the waves ship d2 only, so a face must
// render identically whichever level is asked for. Spreading the base entry
// (not a JSON literal) carries function-valued params through intact.
const D = { ...base.difficulty[3], ...{} };
module.exports = {
  ...base,
  id: 'G1-252',
  slug: 'read-and-color-busy-page',
  // Level Set 2026-09-30: L1 two or three of each picture, six colours, bigger pictures · L3 four or five, three pictures of two other nouns, smaller pictures; L2 = the published page
  difficulty: { 1: { ...D, nMin: 2, nMax: 3, distract: [1, 2], others: 1, colors: 6, icon: 64 }, 2: D, 3: { ...D, nMin: 4, nMax: 5, distract: [3], others: 2, icon: 50 } },
  i18n: { en: { title: "Read and Color: A Busy Page", instruction: "More pictures and more colors. Read each sentence carefully." } },
};
