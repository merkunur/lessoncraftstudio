/** K-505 — Number-Word Dot-to-Dot (Dot to Dot maker 2026-11-02, NEW-TEMPLATES §25; types/_shared/d2d-more.js mode 'words'). */
'use strict';
const { makeD2dMoreType } = require('../_shared/d2d-more.js');
module.exports = makeD2dMoreType({
  id: 'K-505', slug: 'number-word-dot-to-dot', mode: 'words', gradeBand: 'K',
  i18n: { en: { title: 'Number-Word Dot-to-Dot', instruction: 'Start at the orange dot. Read the number words and join the dots in counting order.' } },
});
