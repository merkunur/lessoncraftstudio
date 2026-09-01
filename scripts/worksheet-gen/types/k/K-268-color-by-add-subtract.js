/** K-268 — Add and Subtract Coloring. nt20-VAR variation of K-241 (same family: color-by-number). */
'use strict';
const base = require('./K-241-color-by-code.js');
module.exports = {
  ...base,
  id: 'K-268',
  slug: 'color-by-add-subtract',
  difficulty: { 1: {"mode":"sums","codes":4,"items":12,"size":100,"max":10,"ops":["+","-"]}, 2: {"mode":"sums","codes":4,"items":12,"size":100,"max":10,"ops":["+","-"]}, 3: {"mode":"sums","codes":4,"items":12,"size":100,"max":10,"ops":["+","-"]} },
  i18n: { en: { title: "Add and Subtract Coloring", instruction: "Look at the code. Then color every shape to match it." } },
};
