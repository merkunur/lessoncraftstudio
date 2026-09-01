/** G1-231 — Two-Coin Counting. nt20-VAR variation of G1-211 (same family: money). */
'use strict';
const base = require('./G1-211-counting-coins.js');
module.exports = {
  ...base,
  id: 'G1-231',
  slug: 'two-coin-counting',
  difficulty: { 1: {"coinsMin":2,"coinsMax":4,"denomsUsed":2,"cards":6,"cols":2,"rows":3,"minPx":54,"maxPx":74}, 2: {"coinsMin":2,"coinsMax":4,"denomsUsed":2,"cards":6,"cols":2,"rows":3,"minPx":54,"maxPx":74}, 3: {"coinsMin":2,"coinsMax":4,"denomsUsed":2,"cards":6,"cols":2,"rows":3,"minPx":54,"maxPx":74} },
  i18n: { en: { title: "Two-Coin Counting", instruction: "Count the coins in each purse. Write the total amount in the box." } },
};
