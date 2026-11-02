/** K-268 — Add and Subtract Coloring. nt20-VAR variation of K-241 (same family: color-by-number). */
'use strict';
const base = require('./K-241-color-by-code.js');
module.exports = {
  ...base,
  id: 'K-268',
  slug: 'color-by-add-subtract',
  // real levels (2026-11-02: all three were the published level 2)
  difficulty: { 1: {"mode":"sums","codes":3,"items":9,"size":104,"ops":["+","-"],"values":[1,2,3,4,5],"top":5}, 2: {"mode":"sums","codes":4,"items":12,"size":100,"max":10,"ops":["+","-"]}, 3: {"mode":"sums","codes":4,"items":12,"size":100,"ops":["+","-"],"values":[5,6,7,8,9,10,11,12,13,14,15],"top":20} },
  i18n: { en: { title: "Add and Subtract Coloring", instruction: "Look at the code. Then color every shape to match it." } },
};
