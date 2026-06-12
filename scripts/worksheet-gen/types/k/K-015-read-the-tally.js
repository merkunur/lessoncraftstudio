/** K-015 — Read the Tally (frame-counting factory, mode tally-read) */
'use strict';
const { makeFrameCountingType } = require('../_shared/frame-counting.js');
module.exports = makeFrameCountingType({
  id: 'K-015', slug: 'reading-tally-marks', mode: 'tally-read', 
  i18n: { en: { title: 'Read the Tally', instruction: 'Count the tally marks. Write the number.' } },
});
