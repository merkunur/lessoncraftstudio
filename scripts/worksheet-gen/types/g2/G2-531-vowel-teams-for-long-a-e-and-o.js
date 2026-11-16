/** G2-531 — Vowel Teams for Long a, e, and o (vowels-g2 factory; English literacy year 2026-11-17) */
'use strict';
const { makeVowelG2Type } = require('../_shared/vowels-g2.js');
module.exports = makeVowelG2Type({
  id: 'G2-531', slug: 'vowel-teams-for-long-a-e-and-o', mode: 'teams',
  i18n: { en: { title: "Vowel Teams for Long a, e, and o", instruction: "ai and ay spell long a. ee and ea spell long e. oa and ow spell long o." } },
});
