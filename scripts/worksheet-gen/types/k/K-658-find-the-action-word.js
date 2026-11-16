/** K-658 — Find the Action Word (sentences-k factory; English literacy year 2026-11-16) */
'use strict';
const { makeSentencesKType } = require('../_shared/sentences-k.js');
module.exports = makeSentencesKType({
  id: 'K-658', slug: 'find-the-action-word', mode: 'find', exerciseType: 'word-classes',
  i18n: { en: { title: "Find the Action Word", instruction: "Read the three words in each row. Circle the action word." } },
});
