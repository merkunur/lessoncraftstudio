/** G1-474 — Secret Word Addition (Logic & Math Puzzles maker; the old code-addition app's word reveal, 2026-11-01). See types/_shared/logic-picture-more.js. */
'use strict';
const { makePicturePuzzleType } = require('../_shared/logic-picture-more.js');

module.exports = makePicturePuzzleType({
  id: 'G1-474', slug: 'secret-word-addition', mode: 'secret', gradeBand: 'G1',
  i18n: { en: { title: "Secret Word Addition", instruction: "Add the pictures in each row and write the sum. Find that number in the code, then write its letter in the box with the row's number to spell the secret word." } },
});
