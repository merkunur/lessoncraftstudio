/** G3-317 — Fractions on the Line (fraction-tasks factory, mode line) */
'use strict';
const { makeFractionType } = require('../_shared/fraction-tasks.js');
module.exports = makeFractionType({
  id: 'G3-317', slug: 'fractions-on-a-number-line', mode: 'line', ds: [3,4,6],
  i18n: { en: { title: 'Fractions on the Line', instruction: 'The dot marks a fraction. Circle which one.' } },
});
