/** G3-344 — Elapsed time between two clocks. */
'use strict';
const { makeClockType } = require('../_shared/clock-tasks.js');
module.exports = makeClockType({
  id: 'G3-344', slug: 'elapsed-time', mode: 'elapsed', gradeBand: 'G23',
  difficulty: { 1: { cards: 4, stepM: 60 }, 2: { cards: 4, stepM: 30 }, 3: { cards: 4, stepM: 30 } },
  i18n: { en: { title: 'How Much Time Passed?', instruction: 'Compare the two clocks. Write how many hours passed.' } },
});
