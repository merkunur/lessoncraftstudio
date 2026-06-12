/** K-023 — Count backward from 10: fill the missing numbers. */
'use strict';
const { makeNumberStripType } = require('../_shared/number-strip.js');
module.exports = makeNumberStripType({
  id: 'K-023', slug: 'counting-backwards-from-10', step: 1, rangeMax: 10, len: 10, startFixed: 10, descending: true,
  i18n: { en: { title: 'Blast Off! 10, 9, 8…', instruction: 'Count backward. Write each missing number.' } },
});
