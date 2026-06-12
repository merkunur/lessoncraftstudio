/** G2-228 — Half and Half (fraction-tasks factory, mode shade) */
'use strict';
const { makeFractionType } = require('../_shared/fraction-tasks.js');
module.exports = makeFractionType({
  id: 'G2-228', slug: 'halves', mode: 'shade', ds: [2],
  i18n: { en: { title: 'Half and Half', instruction: 'Color one half of each shape.' } },
});
