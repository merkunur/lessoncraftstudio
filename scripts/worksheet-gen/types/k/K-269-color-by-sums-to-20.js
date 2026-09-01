/** K-269 — Color by Code: Sums to 20. nt20-VAR variation of K-241 (same family: color-by-number). */
'use strict';
const base = require('./K-241-color-by-code.js');
module.exports = {
  ...base,
  id: 'K-269',
  slug: 'color-by-sums-to-20',
  difficulty: { 1: {"mode":"sums","codes":4,"items":12,"size":100,"max":20,"ops":["+"],"values":[11,12,13,14,15,16,17,18,19,20]}, 2: {"mode":"sums","codes":4,"items":12,"size":100,"max":20,"ops":["+"],"values":[11,12,13,14,15,16,17,18,19,20]}, 3: {"mode":"sums","codes":4,"items":12,"size":100,"max":20,"ops":["+"],"values":[11,12,13,14,15,16,17,18,19,20]} },
  i18n: { en: { title: "Color by Code: Sums to 20", instruction: "Look at the code. Then color every shape to match it." } },
};
