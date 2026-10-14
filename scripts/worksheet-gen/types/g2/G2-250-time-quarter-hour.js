/** G2-250 — Telling time to the quarter hour (read the clock, circle the time). */
'use strict';
const { makeClockType, levelsFor } = require('../_shared/clock-tasks.js');
module.exports = makeClockType({
  id: 'G2-250', slug: 'telling-time-quarter-hour', mode: 'read-circle', stepM: 15, gradeBand: 'G2',
  // levels (2026-09-27): stepM alone made levels 1 and 2 identical. Level 1 =
  // o'clock, quarter past and half past only (no "quarter to"); level 2 is the
  // factory default unchanged (published level); level 3 = six clocks.
  // Level Set 2026-10-14: level 2 = the published page; levels 1 / 3 in clock-tasks FACE_LEVELS
  difficulty: levelsFor('G2-250', { cards: 4, stepM: 15 }, { 1: { cards: 4, stepM: 15, minutes: [0, 15, 30] }, 3: { cards: 6, stepM: 15 } }),
  i18n: { en: { title: 'Quarter Hours', instruction: 'Read each clock. Circle the matching time.' } },
});
