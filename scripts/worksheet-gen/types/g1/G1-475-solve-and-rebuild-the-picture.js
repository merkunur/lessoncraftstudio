/** G1-475 — Solve and Rebuild the Picture (Logic & Math Puzzles maker; the old math-puzzle app, NEW-TEMPLATES T5, 2026-11-01). See types/_shared/logic-picture-more.js. */
'use strict';
const { makePicturePuzzleType } = require('../_shared/logic-picture-more.js');

module.exports = makePicturePuzzleType({
  id: 'G1-475', slug: 'solve-and-rebuild-the-picture', mode: 'rebuild', gradeBand: 'G1',
  i18n: { en: { title: "Solve and Rebuild the Picture", instruction: "Solve each problem. Cut out the pieces and glue each one on the problem whose answer is its number. They make a picture." } },
});
