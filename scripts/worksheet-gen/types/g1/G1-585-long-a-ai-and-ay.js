/** G1-585 — Long a: ai and ay (vowels-g1 factory; English literacy year 2026-11-17) */
'use strict';
const { makeVowelType } = require('../_shared/vowels-g1.js');
module.exports = makeVowelType({
  id: 'G1-585', slug: 'long-a-ai-and-ay', mode: 'team', pair: 'ai-ay',
  i18n: { en: { title: "Long a: ai and ay", instruction: "ai and ay both spell long a." } },
});
