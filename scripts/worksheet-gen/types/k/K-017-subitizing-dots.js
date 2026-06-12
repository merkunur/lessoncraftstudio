/** K-017 — Quick Look! (frame-counting factory, mode subitize-dots) */
'use strict';
const { makeFrameCountingType } = require('../_shared/frame-counting.js');
module.exports = makeFrameCountingType({
  id: 'K-017', slug: 'subitizing-dots', mode: 'subitize-dots', 
  i18n: { en: { title: 'Quick Look!', instruction: 'Do not count one by one! Look quickly and circle how many.' } },
});
