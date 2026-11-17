/** K-684 — Two Pictures, One Word (two-meanings-k factory; English literacy year 2026-11-17) */
'use strict';
const { makeTwoMeaningsKType } = require('../_shared/two-meanings-k.js');
module.exports = makeTwoMeaningsKType({
  id: 'K-684', slug: 'two-pictures-one-word', mode: 'match', exerciseType: 'picture-vocabulary',
  i18n: { en: { title: "Two Pictures, One Word", instruction: "One word can name two different things." } },
});
