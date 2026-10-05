/** G1-231 — Two-Coin Counting. nt20-VAR variation of G1-211 (same family: money). */
'use strict';
const base = require('./G1-211-counting-coins.js');
module.exports = {
  ...base,
  id: 'G1-231',
  slug: 'two-coin-counting',
  // Level Set 2026-10-05: real levels (level 2 = the published page)
  difficulty: { 1: {"coinsMin":2,"coinsMax":4,"denomsUsed":2,"pairFrom":3,"cards":4,"cols":2,"rows":2,"minPx":66,"maxPx":86}, 2: {"coinsMin":2,"coinsMax":4,"denomsUsed":2,"pairFrom":3,"cards":6,"cols":2,"rows":3,"minPx":54,"maxPx":74}, 3: {"coinsMin":4,"coinsMax":6,"denomsUsed":2,"pairFrom":99,"cards":6,"cols":2,"rows":3,"minPx":44,"maxPx":62} },
  i18n: { en: { title: "Two-Coin Counting", instruction: "Count the coins in each purse. Write the total amount in the box." } },
};
