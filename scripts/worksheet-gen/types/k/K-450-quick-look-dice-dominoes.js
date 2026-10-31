/** K-450 — quick look at dice and dominoes (T3, K.CC.B.4 subitizing). Ten Frames maker, 2026-10-31. See types/_shared/frame-more.js. */
'use strict';
const { makeFrameMoreType } = require('../_shared/frame-more.js');

module.exports = makeFrameMoreType({
  id: 'K-450', slug: 'quick-look-dice-dominoes', mode: 'quick-look',
  i18n: { en: { title: "Quick Look: Dice and Dominoes", instruction: "Don’t count one by one! Look quickly and circle how many dots." } },
});
