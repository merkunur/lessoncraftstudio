/** K-452 — numeral, ten-frame, tally (T5, K.CC.A.3 + K.CC.B.4). Ten Frames maker, 2026-10-31. See types/_shared/frame-more.js. */
'use strict';
const { makeFrameMoreType } = require('../_shared/frame-more.js');

module.exports = makeFrameMoreType({
  id: 'K-452', slug: 'three-ways-to-show-a-number', mode: 'three-ways',
  i18n: { en: { title: "Three Ways to Show a Number", instruction: "Each row shows a number one way. Show it the other two ways: write the number, draw dots in the ten-frame, draw tally marks." } },
});
