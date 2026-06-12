/** G3-320 — Fraction of the Group (fraction-tasks factory, mode set-circle) */
'use strict';
const { makeFractionType } = require('../_shared/fraction-tasks.js');
module.exports = makeFractionType({
  id: 'G3-320', slug: 'fraction-of-a-set-g3', mode: 'set-circle', ds: [2,3,4],
  i18n: { en: { title: 'Fraction of the Group', instruction: 'Circle the fraction of the pictures. Write how many that is.' } },
});
