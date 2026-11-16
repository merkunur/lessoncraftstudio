/** K-661 — Short a and Short i (cvc-k factory; English literacy year 2026-11-17) */
'use strict';
const { makeCvcKType } = require('../_shared/cvc-k.js');
module.exports = makeCvcKType({
  id: 'K-661', slug: 'short-a-and-short-i', mode: 'vowel', set: 'ai', exerciseType: 'word-building',
  i18n: { en: { title: "Short a and Short i", instruction: "Short a says /⁠ă⁠/, as in apple. Short i says /⁠ĭ⁠/, as in igloo." } },
});
