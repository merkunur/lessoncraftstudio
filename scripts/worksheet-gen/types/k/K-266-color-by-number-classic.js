/** K-266 — Color by Number. nt20-VAR variation of K-241 (same family: color-by-number). */
'use strict';
const base = require('./K-241-color-by-code.js');
module.exports = {
  ...base,
  id: 'K-266',
  slug: 'color-by-number-classic',
  // real levels (2026-11-02: all three were the published level 2)
  difficulty: { 1: {"mode":"numbers","codes":3,"items":9,"size":110,"values":[1,2,3,4]}, 2: {"mode":"numbers","codes":4,"items":12,"size":100,"values":[1,2,3,4,5,6]}, 3: {"mode":"numbers","codes":5,"items":12,"size":96,"values":[1,2,3,4,5,6,7,8,9]} },
  i18n: { en: { title: "Color by Number", instruction: "Look at the code. Color every shape to match its number." } },
};
