/** G1-220 — Fact Family Houses to 20. nt20-VAR variation of G1-209 (same family: fact-families). */
'use strict';
const base = require('./G1-209-fact-families.js');
module.exports = {
  ...base,
  id: 'G1-220',
  slug: 'fact-family-houses-20',
  difficulty: { 1: {"max":20,"cards":6,"cols":2,"rows":3}, 2: {"max":20,"cards":6,"cols":2,"rows":3}, 3: {"max":20,"cards":6,"cols":2,"rows":3} },
  i18n: { en: { title: "Fact Family Houses to 20", instruction: "Use the three numbers on the roof. Complete the four related facts." } },
};
