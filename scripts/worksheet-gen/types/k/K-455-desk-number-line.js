/** K-455 — desk number lines to cut out and laminate (T6, material). Number Lines maker, 2026-11-01. See types/_shared/number-line-more.js. */
'use strict';
const { makeLineMoreType } = require('../_shared/number-line-more.js');

module.exports = makeLineMoreType({
  id: 'K-455', slug: 'desk-number-line', mode: 'strip', gradeBand: 'K',
  i18n: { en: { title: "Desk Number Lines", instruction: "Cut out the number lines along the dashed lines." } },
});
