/** G1-230 — Coin Counting Practice. nt20-VAR variation of G1-211 (same family: money). */
'use strict';
const base = require('./G1-211-counting-coins.js');
module.exports = {
  ...base,
  id: 'G1-230',
  slug: 'coin-counting-practice',
  difficulty: { 1: {"coinsMin":3,"coinsMax":5,"denomsUsed":4,"cards":8,"cols":2,"rows":4,"minPx":40,"maxPx":56}, 2: {"coinsMin":3,"coinsMax":5,"denomsUsed":4,"cards":8,"cols":2,"rows":4,"minPx":40,"maxPx":56}, 3: {"coinsMin":3,"coinsMax":5,"denomsUsed":4,"cards":8,"cols":2,"rows":4,"minPx":40,"maxPx":56} },
  i18n: { en: { title: "Coin Counting Practice", instruction: "Count the coins in each purse. Write the total amount in the box." } },
};
