/** K-507 — Capital and Small Letter Dot-to-Dot (Dot to Dot maker 2026-11-02, NEW-TEMPLATES §25; types/_shared/d2d-more.js mode 'pairs'). */
'use strict';
const { makeD2dMoreType } = require('../_shared/d2d-more.js');
module.exports = makeD2dMoreType({
  id: 'K-507', slug: 'capital-and-small-letter-dot-to-dot', mode: 'pairs', gradeBand: 'K',
  i18n: { en: { title: 'Uppercase and Lowercase Dot-to-Dot', instruction: 'Start at the orange dot. Join an uppercase letter, then its lowercase letter, then the next uppercase letter: A, a, B, b and so on.' } },
});
