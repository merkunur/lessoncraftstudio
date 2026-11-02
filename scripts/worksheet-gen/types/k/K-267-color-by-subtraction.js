/** K-267 — Subtraction Color by Code. nt20-VAR variation of K-241 (same family: color-by-number). */
'use strict';
const base = require('./K-241-color-by-code.js');
module.exports = {
  ...base,
  id: 'K-267',
  slug: 'color-by-subtraction',
  // real levels (2026-11-02: all three were the published level 2)
  difficulty: { 1: {"mode":"sums","codes":3,"items":9,"size":104,"ops":["-"],"values":[1,2,3,4],"top":5}, 2: {"mode":"sums","codes":4,"items":12,"size":100,"max":10,"ops":["-"]}, 3: {"mode":"sums","codes":4,"items":12,"size":100,"ops":["-"],"values":[2,3,4,5,6,7,8,9,10],"top":18} },
  i18n: { en: { title: "Subtraction Color by Code", instruction: "Look at the code. Then color every shape to match it." } },
};
