/** G3-470 — Number Sudoku 6 × 6 (Logic & Math Puzzles maker, task 6 of the ten, 2026-11-01). See types/_shared/logic-more.js. */
'use strict';
const { makeLogicType } = require('../_shared/logic-more.js');

module.exports = makeLogicType({
  id: 'G3-470', slug: 'number-sudoku-6x6', mode: 'sudoku', gradeBand: 'G3', size: 6, symbols: 'numbers',
  i18n: { en: { title: "Number Sudoku 6 × 6", instruction: "Every row, column, and box needs the numbers 1 to 6 once. Write the missing numbers." } },
});
