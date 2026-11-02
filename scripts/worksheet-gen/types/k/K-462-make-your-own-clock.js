/** K-462 — Make Your Own Clock (Telling Time maker, 2026-11-02). See types/_shared/clock-more.js. */
'use strict';
const { makeClockMoreType } = require('../_shared/clock-more.js');

module.exports = makeClockMoreType({
  id: 'K-462', slug: 'make-your-own-clock', mode: 'cutout', gradeBand: 'K',
  i18n: { en: { title: "Make Your Own Clock", instruction: "Cut out the clock and the two hands. Attach the hands to the center with a brad (paper fastener)." } },
});
