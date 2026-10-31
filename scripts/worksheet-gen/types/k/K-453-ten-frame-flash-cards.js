/** K-453 — ten-frame flash cards to cut (T6, K.CC.B.5 fluency). Ten Frames maker, 2026-10-31. See types/_shared/frame-more.js. */
'use strict';
const { makeFrameMoreType } = require('../_shared/frame-more.js');

module.exports = makeFrameMoreType({
  id: 'K-453', slug: 'ten-frame-flash-cards', mode: 'flash-cards',
  i18n: { en: { title: "Ten-Frame Flash Cards", instruction: "Cut out the cards along the dashed lines. Show a card: how many dots?" } },
});
