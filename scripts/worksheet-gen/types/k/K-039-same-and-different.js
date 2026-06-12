/** K-039 — Same vs different: circle the one that differs. */
'use strict';
const { makeOddOneOutType } = require('../_shared/odd-one-out.js');

module.exports = makeOddOneOutType({
  id: 'K-039',
  slug: 'same-and-different',
  mode: 'category',
  i18n: {
    en: {
      title: 'Same and Different',
      instruction: 'Three pictures are the same. Circle the one that is different.',
    },
  },
});
