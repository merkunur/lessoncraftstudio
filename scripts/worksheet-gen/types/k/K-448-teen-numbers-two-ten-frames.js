/** K-448 — teen numbers on two ten-frames (T1, K.NBT.A.1). Ten Frames maker, 2026-10-31. See types/_shared/frame-more.js. */
'use strict';
const { makeFrameMoreType } = require('../_shared/frame-more.js');

module.exports = makeFrameMoreType({
  id: 'K-448', slug: 'teen-numbers-two-ten-frames', mode: 'double-frame',
  i18n: { en: { title: "Teen Numbers on Two Ten-Frames", instruction: "Count what is in the two ten-frames. Write the number, then finish the number sentence." } },
});
