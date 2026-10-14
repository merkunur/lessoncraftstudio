/** G3-356 — Add and subtract time (start clock + duration → write end time). */
'use strict';
const { makeClockType, levelsFor } = require('../_shared/clock-tasks.js');
module.exports = makeClockType({
  id: 'G3-356', slug: 'adding-and-subtracting-time', mode: 'time-arith', gradeBand: 'G3',
  difficulty: levelsFor('G3-356', { cards: 4, stepM: 30 }),
  i18n: { en: { title: 'Add and Subtract Time', instruction: 'Start at the time shown, then add or subtract. Write the new time.' } },
});
