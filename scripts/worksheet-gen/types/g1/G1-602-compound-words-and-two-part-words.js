/** G1-602 — Compound Words and Two-Part Words (syllables-g1 factory; English literacy year 2026-11-18) */
'use strict';
const { makeSyllG1Type } = require('../_shared/syllables-g1.js');
module.exports = makeSyllG1Type({
  id: 'G1-602', slug: 'compound-words-and-two-part-words', mode: 'parts', exerciseType: 'compound-words',
  i18n: { en: { title: "Compound Words and Two-Part Words", instruction: "Read a long word in two parts: sun | set, rab | bit." } },
});
