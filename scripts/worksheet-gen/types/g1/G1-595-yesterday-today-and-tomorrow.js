/** G1-595 — Yesterday, Today, and Tomorrow (grammar-g1 factory; English literacy year 2026-11-17) */
'use strict';
const { makeGrammarG1Type } = require('../_shared/grammar-g1.js');
module.exports = makeGrammarG1Type({
  id: 'G1-595', slug: 'yesterday-today-and-tomorrow', mode: 'tense', exerciseType: 'verb-forms',
  i18n: { en: { title: "Yesterday, Today, and Tomorrow", instruction: "A verb tells when: yesterday I walked, today I walk, tomorrow I will walk. Write the missing verbs. Then circle the verb that fits." } },
});
