/** G3-344 — Elapsed time between two clocks. */
'use strict';
const { makeClockType, levelsFor } = require('../_shared/clock-tasks.js');
module.exports = makeClockType({
  id: 'G3-344', slug: 'elapsed-time', mode: 'elapsed', gradeBand: 'G23',
  // enMin (2026-11-19, review en-1119-math): the English page's level of hour and minute cards (clock-tasks.js, elapsed)
  difficulty: levelsFor('G3-344', { cards: 4, stepM: 30, enMin: 2 }, { 1: { enMin: 1 }, 3: { enMin: 3 } }),
  i18n: { en: { title: 'How Much Time Passed?', instruction: 'Compare the two clocks. Write how many hours passed.' } },
});
