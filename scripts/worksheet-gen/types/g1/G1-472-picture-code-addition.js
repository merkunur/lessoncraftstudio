/** G1-472 — Picture Code Addition (Logic & Math Puzzles maker, task 6 of the ten, 2026-11-01). See types/_shared/logic-more.js. */
'use strict';
const { makeLogicType } = require('../_shared/logic-more.js');

module.exports = makeLogicType({
  id: 'G1-472', slug: 'picture-code-addition', mode: 'code', gradeBand: 'G1',
  i18n: { en: { title: "Picture Code Addition", instruction: "Each picture stands for a number. Start with the sum you can solve, then find every picture's number and write it in the box next to that picture." } },
});
