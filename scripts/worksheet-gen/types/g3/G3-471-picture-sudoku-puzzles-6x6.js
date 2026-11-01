/** G3-471 — Picture Sudoku 6 × 6 (Logic & Math Puzzles maker, task 6 of the ten, 2026-11-01). See types/_shared/logic-more.js. */
'use strict';
const { makeLogicType } = require('../_shared/logic-more.js');

module.exports = makeLogicType({
  id: 'G3-471', slug: 'picture-sudoku-puzzles-6x6', mode: 'sudoku', gradeBand: 'G3', size: 6, symbols: 'pictures',
  i18n: { en: { title: "Picture Sudoku 6 × 6", instruction: "Every row, column, and box needs each of the six pictures once. Draw the missing pictures." } },
});
