/** G2-474 — A.M. or P.M.? (Telling Time maker, 2026-11-02): en-US circles a.m. or p.m.; the ten 24-hour locales circle the 12-hour or the 24-hour time. See types/_shared/clock-more.js. */
'use strict';
const { makeClockMoreType } = require('../_shared/clock-more.js');

module.exports = makeClockMoreType({
  id: 'G2-474', slug: 'am-or-pm', mode: 'ampm', gradeBand: 'G2',
  i18n: { en: { title: "A.M. or P.M.?", instruction: "Look at the picture and the time. Circle a.m. if it happens before noon and p.m. if it happens after noon." } },
});
