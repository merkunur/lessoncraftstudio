/** K-044 — Odd one out by size. */
'use strict';
const { makeOddOneOutType } = require('../_shared/odd-one-out.js');

module.exports = makeOddOneOutType({
  id: 'K-044',
  slug: 'odd-one-out-size',
  mode: 'size',
  i18n: {
    en: {
      title: 'Find the Different Size',
      instruction: 'Look at each row. Circle the one that is a different size.',
    },
  },
});
