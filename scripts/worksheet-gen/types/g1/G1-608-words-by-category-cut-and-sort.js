/** G1-608 — Words by Category: Cut and Sort (word-meanings-g1 factory; English literacy year 2026-11-18) */
'use strict';
const { makeWordMeaningsG1Type } = require('../_shared/word-meanings-g1.js');
module.exports = makeWordMeaningsG1Type({
  id: 'G1-608', slug: 'words-by-category-cut-and-sort', mode: 'sort', exerciseType: 'sorting-categories',
  i18n: { en: { title: "Words by Category: Cut and Sort", instruction: "A category is a group of things that are alike. Dogs and cats are pets." } },
});
