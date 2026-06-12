/** K-005 — Fill the Frame (frame-counting factory, mode fill-frame) */
'use strict';
const { makeFrameCountingType } = require('../_shared/frame-counting.js');
module.exports = makeFrameCountingType({
  id: 'K-005', slug: 'fill-the-ten-frame', mode: 'fill-frame', 
  i18n: { en: { title: 'Fill the Frame', instruction: 'Draw a dot in the frame for each one the number shows.' } },
});
