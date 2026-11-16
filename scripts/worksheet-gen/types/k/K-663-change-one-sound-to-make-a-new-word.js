/** K-663 — Change One Sound to Make a New Word (cvc-k factory; English literacy year 2026-11-17) */
'use strict';
const { makeCvcKType } = require('../_shared/cvc-k.js');
module.exports = makeCvcKType({
  id: 'K-663', slug: 'change-one-sound-to-make-a-new-word', mode: 'chain', exerciseType: 'phonological-awareness',
  i18n: { en: { title: "Change One Sound to Make a New Word", instruction: "Change the first or the last sound of a word, and you make a new word." } },
});
