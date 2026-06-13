/** K-231 — Use the scrambled letters to build each word. LITERACY word-build. */
'use strict';
const { makeLitWordBuild } = require('../_shared/lit-word-build.js');
module.exports = makeLitWordBuild({
  id: 'K-231', slug: 'build-the-word', gradeBand: 'K', exerciseType: 'word-building', mode: 'build-the-word',
  data: require('../../data/literacy/build-word.json'),
  i18n: { en: { title: 'Build the Word', instruction: 'Use the letters to build the word for each picture.' } },
});
