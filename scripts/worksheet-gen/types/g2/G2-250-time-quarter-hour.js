/** G2-250 — Telling time to the quarter hour (read the clock, circle the time). */
'use strict';
const { makeClockType } = require('../_shared/clock-tasks.js');
module.exports = makeClockType({
  id: 'G2-250', slug: 'telling-time-quarter-hour', mode: 'read-circle', stepM: 15, gradeBand: 'G2',
  i18n: { en: { title: 'Quarter Hours', instruction: 'Read each clock. Circle the matching time.' } },
});
