/** K-265 — Color by Shape Code. nt20-VAR variation of K-241 (same family: color-by-number). */
'use strict';
const base = require('./K-241-color-by-code.js');
module.exports = {
  ...base,
  id: 'K-265',
  slug: 'color-by-shape-code',
  difficulty: { 1: {"mode":"shapes","codes":4,"items":12,"size":96}, 2: {"mode":"shapes","codes":4,"items":12,"size":96}, 3: {"mode":"shapes","codes":4,"items":12,"size":96} },
  i18n: { en: { title: "Color by Shape Code", instruction: "Look at the code. Then color every shape to match it." } },
};
