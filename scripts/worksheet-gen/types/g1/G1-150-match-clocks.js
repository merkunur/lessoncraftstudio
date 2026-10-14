/** G1-150 — Match analog clocks to digital times. */
'use strict';
const { makeClockType, levelsFor } = require('../_shared/clock-tasks.js');
module.exports = makeClockType({
  id: 'G1-150', slug: 'matching-clocks', difficulty: levelsFor('G1-150', { cards: 4, stepM: 30 }),   // Level Set 2026-10-14: level 2 = the published default
  mode: 'match', stepM: 30,
  i18n: { en: { title: 'Clock Partners', instruction: 'Draw a line from each clock to its digital time.' } },
});
