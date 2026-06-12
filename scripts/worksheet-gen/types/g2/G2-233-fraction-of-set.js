/** G2-233 — Share the Set (fraction-tasks factory, mode set-circle) */
'use strict';
const { makeFractionType } = require('../_shared/fraction-tasks.js');
module.exports = makeFractionType({
  id: 'G2-233', slug: 'fraction-of-a-set', mode: 'set-circle', ds: [2,3,4],
  i18n: { en: { title: 'Share the Set', instruction: 'Circle the fraction of the pictures. Write how many that is.' } },
});
