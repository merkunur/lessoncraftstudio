/** G2-262 — Reading Scales: Small Steps. nt20-VAR variation of G2-252 (same family: measurement). */
'use strict';
const base = require('./G2-252-capacity-mass.js');
module.exports = {
  ...base,
  id: 'G2-262',
  slug: 'reading-scales-fine-marks',
  difficulty: { 1: {"jugs":3,"balances":3,"cols":3,"rows":2,"jugMax":1000,"jugStep":50,"weightsMax":4}, 2: {"jugs":3,"balances":3,"cols":3,"rows":2,"jugMax":1000,"jugStep":50,"weightsMax":4}, 3: {"jugs":3,"balances":3,"cols":3,"rows":2,"jugMax":1000,"jugStep":50,"weightsMax":4} },
  i18n: { en: { title: "Reading Scales: Small Steps", instruction: "Read each measuring jug and balance scale. Write the amount with its unit." } },
};
