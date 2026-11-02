/** G3-475 — Elapsed Time on a Time Line (Telling Time maker, 2026-11-02). See types/_shared/clock-more.js. */
'use strict';
const { makeClockMoreType } = require('../_shared/clock-more.js');

module.exports = makeClockMoreType({
  id: 'G3-475', slug: 'elapsed-time-on-a-time-line', mode: 'timeline', gradeBand: 'G3',
  i18n: { en: { title: "Elapsed Time on a Time Line", instruction: "Find the start and the end on the time line. Write how many hours and minutes passed." } },
});
