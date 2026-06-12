/** K-025 — Tally Match (frame-counting factory, mode match-tally) */
'use strict';
const { makeFrameCountingType } = require('../_shared/frame-counting.js');
module.exports = makeFrameCountingType({
  id: 'K-025', slug: 'tally-matching', mode: 'match-tally', 
  i18n: { en: { title: 'Tally Match', instruction: 'Draw a line from each number to its tally marks.' } },
});
