/** K-024 — Frame Match (frame-counting factory, mode match-frame) */
'use strict';
const { makeFrameCountingType } = require('../_shared/frame-counting.js');
module.exports = makeFrameCountingType({
  id: 'K-024', slug: 'ten-frame-matching', mode: 'match-frame', 
  i18n: { en: { title: 'Frame Match', instruction: 'Draw a line from each number to its ten-frame.' } },
});
