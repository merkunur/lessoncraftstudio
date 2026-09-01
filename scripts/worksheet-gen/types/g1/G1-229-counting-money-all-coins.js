/** G1-229 — Counting Money: All the Coins. nt20-VAR variation of G1-211 (same family: money). */
'use strict';
const base = require('./G1-211-counting-coins.js');
module.exports = {
  ...base,
  id: 'G1-229',
  slug: 'counting-money-all-coins',
  difficulty: { 1: {"coinsMin":5,"coinsMax":7,"denomsUsed":99,"cards":6,"cols":2,"rows":3,"minPx":42,"maxPx":60}, 2: {"coinsMin":5,"coinsMax":7,"denomsUsed":99,"cards":6,"cols":2,"rows":3,"minPx":42,"maxPx":60}, 3: {"coinsMin":5,"coinsMax":7,"denomsUsed":99,"cards":6,"cols":2,"rows":3,"minPx":42,"maxPx":60} },
  i18n: { en: { title: "Counting Money: All the Coins", instruction: "Count the coins in each purse. Write the total amount in the box." } },
};
