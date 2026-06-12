/** K-018 — How Many? Quick! (frame-counting factory, mode subitize-icons) */
'use strict';
const { makeFrameCountingType } = require('../_shared/frame-counting.js');
module.exports = makeFrameCountingType({
  id: 'K-018', slug: 'subitizing-pictures', mode: 'subitize-icons', 
  i18n: { en: { title: 'How Many? Quick!', instruction: 'Look quickly and circle how many you see.' } },
});
