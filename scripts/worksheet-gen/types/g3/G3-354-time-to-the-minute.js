/** G3-354 — Telling time to the minute (read the clock, circle the time). */
'use strict';
const { makeClockType, levelsFor } = require('../_shared/clock-tasks.js');
module.exports = makeClockType({
  id: 'G3-354', slug: 'telling-time-to-the-minute', mode: 'read-circle', stepM: 1, gradeBand: 'G3',
  // minuteFoils (2026-11-19, review en-1119-math): level 2's wrong times are the nearest five and the next hour (clock-tasks.js)
  difficulty: levelsFor('G3-354', { cards: 4, stepM: 1, minuteFoils: true }, { 1: { cards: 4, stepM: 5 }, 3: { cards: 6, stepM: 1 } }),
  i18n: { en: { title: 'To the Minute', instruction: 'Read each clock. Circle the matching time.' } },
});
