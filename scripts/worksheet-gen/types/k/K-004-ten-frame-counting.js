/** K-004 — Ten-Frame Count (frame-counting factory, mode count-frame) */
'use strict';
const { makeFrameCountingType } = require('../_shared/frame-counting.js');
module.exports = makeFrameCountingType({
  id: 'K-004', slug: 'ten-frame-counting', mode: 'count-frame', 
  i18n: { en: { title: 'Ten-Frame Count', instruction: 'Count the pictures in the frame. Write the number.' } },
});
