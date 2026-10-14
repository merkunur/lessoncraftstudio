/** G3-344 — Elapsed time between two clocks. */
'use strict';
const { makeClockType, levelsFor } = require('../_shared/clock-tasks.js');
module.exports = makeClockType({
  id: 'G3-344', slug: 'elapsed-time', mode: 'elapsed', gradeBand: 'G23',
  difficulty: levelsFor('G3-344', { cards: 4, stepM: 30 }),
  i18n: { en: { title: 'How Much Time Passed?', instruction: 'Compare the two clocks. Write how many hours passed.' } },
});
