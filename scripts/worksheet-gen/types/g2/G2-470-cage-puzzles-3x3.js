/** G2-470 — Cage Puzzles 3 × 3 (Logic & Math Puzzles maker, task 6 of the ten, 2026-11-01). See types/_shared/logic-more.js. */
'use strict';
const { makeLogicType } = require('../_shared/logic-more.js');

module.exports = makeLogicType({
  id: 'G2-470', slug: 'cage-puzzles-3x3', mode: 'cages', gradeBand: 'G2', size: 3,
  i18n: { en: { title: "Cage Puzzles 3 × 3", instruction: "Every row and column needs 1, 2, and 3 once. The numbers inside a thick-lined cage add up to the small number in its corner." } },
});
