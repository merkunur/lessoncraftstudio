/** G1-228 — Counting Coins: First Steps. nt20-VAR variation of G1-211 (same family: money). */
'use strict';
const base = require('./G1-211-counting-coins.js');
module.exports = {
  ...base,
  id: 'G1-228',
  slug: 'counting-coins-first-steps',
  difficulty: { 1: {"coinsMin":2,"coinsMax":3,"denomsUsed":3,"cards":4,"cols":2,"rows":2,"minPx":66,"maxPx":86}, 2: {"coinsMin":2,"coinsMax":3,"denomsUsed":3,"cards":4,"cols":2,"rows":2,"minPx":66,"maxPx":86}, 3: {"coinsMin":2,"coinsMax":3,"denomsUsed":3,"cards":4,"cols":2,"rows":2,"minPx":66,"maxPx":86} },
  i18n: { en: { title: "Counting Coins: First Steps", instruction: "Count the coins in each purse. Write the total amount in the box." } },
};
