/** K-683 — Words with Two Meanings (two-meanings-k factory; English literacy year 2026-11-17) */
'use strict';
const { makeTwoMeaningsKType } = require('../_shared/two-meanings-k.js');
module.exports = makeTwoMeaningsKType({
  id: 'K-683', slug: 'words-with-two-meanings', mode: 'choose', exerciseType: 'picture-vocabulary',
  i18n: { en: { title: "Words with Two Meanings", instruction: "Some words have two meanings. The sentence tells which one." } },
});
