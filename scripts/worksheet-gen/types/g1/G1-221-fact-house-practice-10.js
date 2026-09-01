/** G1-221 — Fact House Practice to 10. nt20-VAR variation of G1-209 (same family: fact-families). */
'use strict';
const base = require('./G1-209-fact-families.js');
module.exports = {
  ...base,
  id: 'G1-221',
  slug: 'fact-house-practice-10',
  difficulty: { 1: {"max":10,"cards":6,"cols":2,"rows":3}, 2: {"max":10,"cards":6,"cols":2,"rows":3}, 3: {"max":10,"cards":6,"cols":2,"rows":3} },
  i18n: { en: { title: "Fact House Practice to 10", instruction: "Use the three numbers on the roof. Complete the four related facts." } },
};
