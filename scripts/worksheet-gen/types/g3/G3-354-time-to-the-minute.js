/** G3-354 — Telling time to the minute (read the clock, circle the time). */
'use strict';
const { makeClockType } = require('../_shared/clock-tasks.js');
module.exports = makeClockType({
  id: 'G3-354', slug: 'telling-time-to-the-minute', mode: 'read-circle', stepM: 1, gradeBand: 'G3',
  difficulty: { 1: { cards: 4, stepM: 5 }, 2: { cards: 4, stepM: 1 }, 3: { cards: 6, stepM: 1 } },
  i18n: { en: { title: 'To the Minute', instruction: 'Read each clock. Circle the matching time.' } },
});
