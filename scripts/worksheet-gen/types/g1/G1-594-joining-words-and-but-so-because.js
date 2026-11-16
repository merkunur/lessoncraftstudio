/** G1-594 — Joining Words: and, but, so, because (grammar-g1 factory; English literacy year 2026-11-17) */
'use strict';
const { makeGrammarG1Type } = require('../_shared/grammar-g1.js');
module.exports = makeGrammarG1Type({
  id: 'G1-594', slug: 'joining-words-and-but-so-because', mode: 'join', exerciseType: 'sentence-building',
  i18n: { en: { title: "Joining Words: and, but, so, because", instruction: "A joining word puts two sentences together. Circle the one that fits best in each sentence. Then join two sentences and write them as one." } },
});
