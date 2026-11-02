/** G1-479 — Quarter Hours on the Clock (Telling Time maker, 2026-11-02). See types/_shared/clock-more.js. */
'use strict';
const { makeClockMoreType } = require('../_shared/clock-more.js');

module.exports = makeClockMoreType({
  id: 'G1-479', slug: 'quarter-hours-on-the-clock', mode: 'sector', gradeBand: 'G1',
  i18n: { en: { title: "Quarter Hours on the Clock", instruction: "The minute hand started at 12. Shade the part of the clock it has moved past." } },
});
