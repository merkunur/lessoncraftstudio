/** K-043 — Odd one out by category: which doesn't belong? */
'use strict';
const { makeOddOneOutType } = require('../_shared/odd-one-out.js');

module.exports = makeOddOneOutType({
  id: 'K-043',
  slug: 'odd-one-out',
  mode: 'category',
  i18n: {
    en: {
      title: 'Which One Is Different?',
      instruction: 'Look at each row. Circle the picture that does not belong.',
    },
  },
});
