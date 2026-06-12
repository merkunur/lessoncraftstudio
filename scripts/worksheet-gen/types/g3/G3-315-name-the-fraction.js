/** G3-315 — Name That Fraction (fraction-tasks factory, mode name) */
'use strict';
const { makeFractionType } = require('../_shared/fraction-tasks.js');
module.exports = makeFractionType({
  id: 'G3-315', slug: 'naming-fractions', mode: 'name', ds: [3,4,6,8],
  i18n: { en: { title: 'Name That Fraction', instruction: 'Write the fraction the shaded parts show.' } },
});
