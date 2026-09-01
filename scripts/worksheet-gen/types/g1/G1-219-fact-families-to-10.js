/** G1-219 — Fact Families to 10. nt20-VAR variation of G1-209 (same family: fact-families). */
'use strict';
const base = require('./G1-209-fact-families.js');
module.exports = {
  ...base,
  id: 'G1-219',
  slug: 'fact-families-to-10',
  difficulty: { 1: {"max":10,"cards":4,"cols":2,"rows":2}, 2: {"max":10,"cards":4,"cols":2,"rows":2}, 3: {"max":10,"cards":4,"cols":2,"rows":2} },
  i18n: { en: { title: "Fact Families to 10", instruction: "Use the three numbers on the roof. Complete the four related facts." } },
};
