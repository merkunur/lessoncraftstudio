/** K-014 — Make Your Tally (frame-counting factory, mode tally-write) */
'use strict';
const { makeFrameCountingType } = require('../_shared/frame-counting.js');
module.exports = makeFrameCountingType({
  id: 'K-014', slug: 'tally-marks-write', mode: 'tally-write', 
  i18n: { en: { title: 'Make Your Tally', instruction: 'Count the pictures. Draw tally marks in the box.' } },
});
