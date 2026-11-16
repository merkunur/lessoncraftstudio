/** K-662 — Short o, Short u, and Short e (cvc-k factory; English literacy year 2026-11-17) */
'use strict';
const { makeCvcKType } = require('../_shared/cvc-k.js');
module.exports = makeCvcKType({
  id: 'K-662', slug: 'short-o-short-u-and-short-e', mode: 'vowel', set: 'oue', exerciseType: 'word-building',
  i18n: { en: { title: "Short o, Short u, and Short e", instruction: "Short o says /⁠ŏ⁠/, as in octopus. Short u says /⁠ŭ⁠/, as in umbrella. Short e says /⁠ĕ⁠/, as in elephant." } },
});
