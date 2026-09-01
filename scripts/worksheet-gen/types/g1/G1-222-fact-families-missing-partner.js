/** G1-222 — Fact Families: Missing Partners. nt20-VAR variation of G1-209 (same family: fact-families). */
'use strict';
const base = require('./G1-209-fact-families.js');
module.exports = {
  ...base,
  id: 'G1-222',
  slug: 'fact-families-missing-partner',
  difficulty: { 1: {"max":20,"cards":4,"cols":2,"rows":2,"blank":"partner"}, 2: {"max":20,"cards":4,"cols":2,"rows":2,"blank":"partner"}, 3: {"max":20,"cards":4,"cols":2,"rows":2,"blank":"partner"} },
  i18n: { en: { title: "Fact Families: Missing Partners", instruction: "Use the three numbers on the roof. Write the missing number in each fact." } },
};
