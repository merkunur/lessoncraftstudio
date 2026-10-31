/** K-454 — colour the frame to show the parts (T7, K.OA.A.3). Ten Frames maker, 2026-10-31. See types/_shared/frame-more.js. */
'use strict';
const { makeFrameMoreType } = require('../_shared/frame-more.js');

module.exports = makeFrameMoreType({
  id: 'K-454', slug: 'colour-the-parts-ten-frame', mode: 'colour-parts',
  i18n: { en: { title: "Color the Parts of 5 and 10", instruction: "Color the squares: as many red as the red number, as many blue as the blue number." } },
});
