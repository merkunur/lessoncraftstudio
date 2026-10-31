/** K-451 — take away on the ten-frame (T4, K.OA.A.1-2). Ten Frames maker, 2026-10-31. See types/_shared/frame-more.js. */
'use strict';
const { makeFrameMoreType } = require('../_shared/frame-more.js');

module.exports = makeFrameMoreType({
  id: 'K-451', slug: 'ten-frame-take-away', mode: 'frame-minus',
  i18n: { en: { title: "Take Away on the Ten-Frame", instruction: "Count the dots. The crossed-out dots are taken away. Write how many are left." } },
});
