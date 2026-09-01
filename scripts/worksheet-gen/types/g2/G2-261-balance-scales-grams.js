/** G2-261 — Balance Scales in Grams. nt20-VAR variation of G2-252 (same family: measurement). */
'use strict';
const base = require('./G2-252-capacity-mass.js');
module.exports = {
  ...base,
  id: 'G2-261',
  slug: 'balance-scales-grams',
  difficulty: { 1: {"jugs":0,"balances":6,"cols":3,"rows":2,"jugMax":1000,"jugStep":100,"weightsMax":3}, 2: {"jugs":0,"balances":6,"cols":3,"rows":2,"jugMax":1000,"jugStep":100,"weightsMax":3}, 3: {"jugs":0,"balances":6,"cols":3,"rows":2,"jugMax":1000,"jugStep":100,"weightsMax":3} },
  i18n: { en: { title: "Balance Scales in Grams", instruction: "Look at the weights on each scale. Write how many grams the object weighs." } },
};
