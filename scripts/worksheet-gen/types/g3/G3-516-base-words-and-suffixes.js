/** G3-516 — Base Words and Suffixes: -ful, -less, -ness, -ment, -able (long-words-g3 factory; English literacy year 2026-11-18) */
'use strict';
const { makeLongWordsG3Type } = require('../_shared/long-words-g3.js');
module.exports = makeLongWordsG3Type({
  id: 'G3-516', slug: 'base-words-and-suffixes', mode: 'suffix', exerciseType: 'word-parts',
  i18n: { en: { title: "Base Words and Suffixes", instruction: "A suffix at the end changes the word: kind + ness = kindness." } },
});
