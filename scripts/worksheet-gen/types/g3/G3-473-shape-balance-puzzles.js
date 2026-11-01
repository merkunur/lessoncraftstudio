/** G3-473 — Shape Balance Puzzles (Logic & Math Puzzles maker, task 6 of the ten, 2026-11-01). See types/_shared/logic-more.js. */
'use strict';
const { makeLogicType } = require('../_shared/logic-more.js');

module.exports = makeLogicType({
  id: 'G3-473', slug: 'shape-balance-puzzles', mode: 'balance', gradeBand: 'G3',
  i18n: { en: { title: "Shape Balance Puzzles", instruction: "The scales balance. Find how much each shape weighs and write it in its box." } },
});
