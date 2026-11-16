/** G1-603 — Heart Words: said, was, of, could (syllables-g1 factory; English literacy year 2026-11-18) */
'use strict';
const { makeSyllG1Type } = require('../_shared/syllables-g1.js');
module.exports = makeSyllG1Type({
  id: 'G1-603', slug: 'heart-words-said-was-of-could', mode: 'heart', exerciseType: 'sight-words',
  i18n: { en: { title: "Heart Words: said, was, of, could", instruction: "Some words have a tricky part. We learn that part by heart." } },
});
