/** K-506 — Even or Odd Dot-to-Dot (Dot to Dot maker 2026-11-02, NEW-TEMPLATES §25 T4; types/_shared/d2d-more.js mode 'parity'). */
'use strict';
const { makeD2dMoreType } = require('../_shared/d2d-more.js');
module.exports = makeD2dMoreType({
  id: 'K-506', slug: 'even-dots-only-dot-to-dot', mode: 'parity', gradeBand: 'G1',
  i18n: { en: { title: 'Even or Odd Dot-to-Dot', instruction: 'Start at the orange dot. Join only the even numbers in order: 2, 4, 6 and so on. Skip the odd numbers.' } },
});
