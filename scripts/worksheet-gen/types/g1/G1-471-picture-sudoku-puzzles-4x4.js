/** G1-471 — Picture Sudoku Puzzles (Logic & Math Puzzles maker, task 6 of the ten, 2026-11-01). See types/_shared/logic-more.js. */
'use strict';
const { makeLogicType } = require('../_shared/logic-more.js');

module.exports = makeLogicType({
  id: 'G1-471', slug: 'picture-sudoku-puzzles-4x4', mode: 'sudoku', gradeBand: 'G1', size: 4, symbols: 'pictures',
  i18n: { en: { title: "Picture Sudoku Puzzles", instruction: "Every row, column, and box needs each of the four pictures once. Draw the missing pictures." } },
});
