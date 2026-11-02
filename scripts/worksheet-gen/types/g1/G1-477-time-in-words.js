/** G1-477 — Time in Words (Telling Time maker, 2026-11-02). See types/_shared/clock-more.js. */
'use strict';
const { makeClockMoreType } = require('../_shared/clock-more.js');

module.exports = makeClockMoreType({
  id: 'G1-477', slug: 'time-in-words', mode: 'words', gradeBand: 'G1',
  i18n: { en: { title: "Time in Words", instruction: "Read the time in words. Draw a line from each clock to the words that tell its time." } },
});
