/** G1-229 — Counting Money: All the Coins. nt20-VAR variation of G1-211 (same family: money). */
'use strict';
const base = require('./G1-211-counting-coins.js');
module.exports = {
  ...base,
  id: 'G1-229',
  slug: 'counting-money-all-coins',
  // Level Set 2026-10-05: real levels (level 2 = the published page)
  difficulty: { 1: {"coinsMin":4,"coinsMax":5,"denomsUsed":99,"cards":4,"cols":2,"rows":2,"minPx":50,"maxPx":70}, 2: {"coinsMin":5,"coinsMax":7,"denomsUsed":99,"cards":6,"cols":2,"rows":3,"minPx":42,"maxPx":60}, 3: {"coinsMin":6,"coinsMax":8,"denomsUsed":99,"cards":6,"cols":2,"rows":3,"minPx":38,"maxPx":54} },
  i18n: { en: { title: "Counting Money: All the Coins", instruction: "Count the coins in each purse. Write the total amount in the box." } },
};
