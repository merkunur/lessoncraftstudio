/** G2-250 — Telling time to the quarter hour (read the clock, circle the time). */
'use strict';
const { makeClockType } = require('../_shared/clock-tasks.js');
module.exports = makeClockType({
  id: 'G2-250', slug: 'telling-time-quarter-hour', mode: 'read-circle', stepM: 15, gradeBand: 'G2',
  // levels (2026-09-27): stepM alone made levels 1 and 2 identical. Level 1 =
  // o'clock, quarter past and half past only (no "quarter to"); level 2 is the
  // factory default unchanged (published level); level 3 = six clocks.
  difficulty: {
    1: { cards: 4, stepM: 15, minutes: [0, 15, 30] },
    2: { cards: 4, stepM: 15 },
    3: { cards: 6, stepM: 15 },
  },
  i18n: { en: { title: 'Quarter Hours', instruction: 'Read each clock. Circle the matching time.' } },
});
