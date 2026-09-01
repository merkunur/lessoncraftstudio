/** K-267 — Subtraction Color by Code. nt20-VAR variation of K-241 (same family: color-by-number). */
'use strict';
const base = require('./K-241-color-by-code.js');
module.exports = {
  ...base,
  id: 'K-267',
  slug: 'color-by-subtraction',
  difficulty: { 1: {"mode":"sums","codes":4,"items":12,"size":100,"max":10,"ops":["-"]}, 2: {"mode":"sums","codes":4,"items":12,"size":100,"max":10,"ops":["-"]}, 3: {"mode":"sums","codes":4,"items":12,"size":100,"max":10,"ops":["-"]} },
  i18n: { en: { title: "Subtraction Color by Code", instruction: "Look at the code. Then color every shape to match it." } },
};
