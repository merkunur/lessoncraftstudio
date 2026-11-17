/** G3-526 — Possessive Nouns: One Owner or More (sentences-g3 factory; English literacy year 2026-11-18) */
'use strict';
const { makeSentencesG3Type } = require('../_shared/sentences-g3.js');
module.exports = makeSentencesG3Type({
  id: 'G3-526', slug: 'possessive-nouns-one-owner-or-more', mode: 'possess', exerciseType: 'capitals-punctuation',
  i18n: { en: { title: "Possessive Nouns: One Owner or More", instruction: "One owner: the bee's hive. More than one owner: the bees' hives." } },
});
