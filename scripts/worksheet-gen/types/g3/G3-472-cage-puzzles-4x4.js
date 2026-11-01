/** G3-472 — Cage Puzzles 4 × 4 (Logic & Math Puzzles maker, task 6 of the ten, 2026-11-01). See types/_shared/logic-more.js. */
'use strict';
const { makeLogicType } = require('../_shared/logic-more.js');

module.exports = makeLogicType({
  id: 'G3-472', slug: 'cage-puzzles-4x4', mode: 'cages', gradeBand: 'G3', size: 4,
  i18n: { en: { title: "Cage Puzzles 4 × 4", instruction: "Every row and column needs 1, 2, 3, and 4 once. The numbers inside a thick-lined cage add up to the small number in its corner.{RULE}" } },
});
