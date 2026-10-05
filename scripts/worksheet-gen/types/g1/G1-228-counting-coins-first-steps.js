/** G1-228 — Counting Coins: First Steps. nt20-VAR variation of G1-211 (same family: money). */
'use strict';
const base = require('./G1-211-counting-coins.js');
module.exports = {
  ...base,
  id: 'G1-228',
  slug: 'counting-coins-first-steps',
  // Level Set 2026-10-05: real levels (level 2 = the published page)
  difficulty: { 1: {"coinsMin":2,"coinsMax":2,"denomsUsed":4,"cards":4,"cols":2,"rows":2,"minPx":70,"maxPx":90}, 2: {"coinsMin":2,"coinsMax":3,"denomsUsed":3,"cards":4,"cols":2,"rows":2,"minPx":66,"maxPx":86}, 3: {"coinsMin":3,"coinsMax":4,"denomsUsed":3,"cards":6,"cols":2,"rows":3,"minPx":54,"maxPx":74} },
  i18n: { en: { title: "Counting Coins: First Steps", instruction: "Count the coins in each purse. Write the total amount in the box." } },
};
