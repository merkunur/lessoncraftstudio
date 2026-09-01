/** K-266 — Color by Number. nt20-VAR variation of K-241 (same family: color-by-number). */
'use strict';
const base = require('./K-241-color-by-code.js');
module.exports = {
  ...base,
  id: 'K-266',
  slug: 'color-by-number-classic',
  difficulty: { 1: {"mode":"numbers","codes":4,"items":12,"size":100,"values":[1,2,3,4,5,6]}, 2: {"mode":"numbers","codes":4,"items":12,"size":100,"values":[1,2,3,4,5,6]}, 3: {"mode":"numbers","codes":4,"items":12,"size":100,"values":[1,2,3,4,5,6]} },
  i18n: { en: { title: "Color by Number", instruction: "Look at the code. Color every shape to match its number." } },
};
