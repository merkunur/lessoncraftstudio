/** K-224 — Write the missing letter to finish each CVC word. LITERACY word-build. */
'use strict';
const { makeLitWordBuild } = require('../_shared/lit-word-build.js');
module.exports = makeLitWordBuild({
  id: 'K-224', slug: 'cvc-missing-letter', gradeBand: 'K', exerciseType: 'word-building', mode: 'cvc-missing',
  data: require('../../data/literacy/word-build.json'),
  i18n: { en: { title: 'Missing Sound', instruction: 'Write the missing letter to finish each word.' } },
});
