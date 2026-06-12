/** G2-229 — Thirds and Quarters (fraction-tasks factory, mode shade) */
'use strict';
const { makeFractionType } = require('../_shared/fraction-tasks.js');
module.exports = makeFractionType({
  id: 'G2-229', slug: 'quarters-and-thirds', mode: 'shade', ds: [3,4],
  i18n: { en: { title: 'Thirds and Quarters', instruction: 'Color the fraction of each shape.' } },
});
