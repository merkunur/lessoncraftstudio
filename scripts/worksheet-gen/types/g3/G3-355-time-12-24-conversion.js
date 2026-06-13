/** G3-355 — 12-hour / 24-hour conversion (circle the matching form). */
'use strict';
const { makeClockType } = require('../_shared/clock-tasks.js');
module.exports = makeClockType({
  id: 'G3-355', slug: 'time-12-24-hour', mode: 'convert-24h', gradeBand: 'G3',
  difficulty: { 1: { cards: 4, stepM: 60 }, 2: { cards: 4, stepM: 30 }, 3: { cards: 6, stepM: 5 } },
  i18n: { en: { title: '12-Hour and 24-Hour Time', instruction: 'Match each time to its 12-hour or 24-hour form. Circle the correct one.' } },
});
