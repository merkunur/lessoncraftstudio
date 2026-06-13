/** K-017 — Quick Look! (frame-counting factory, mode subitize-dots) */
'use strict';
const { makeFrameCountingType } = require('../_shared/frame-counting.js');
module.exports = makeFrameCountingType({
  id: 'K-017', slug: 'subitizing-dots', mode: 'subitize-dots',
  // diceFace supports 1-9 pips — cap below the factory default's max 10
  // (seed-dependent range error surfaced at wave-001).
  difficulty: {
    1: { min: 1, max: 6, items: 4 },
    2: { min: 2, max: 9, items: 4 },
    3: { min: 4, max: 9, items: 6 },
  },
  i18n: { en: { title: 'Quick Look!', instruction: 'Do not count one by one! Look quickly and circle how many.' } },
});
