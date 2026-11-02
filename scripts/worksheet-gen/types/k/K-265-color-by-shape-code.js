/** K-265 — Color by Shape Code. nt20-VAR variation of K-241 (same family: color-by-number). */
'use strict';
const base = require('./K-241-color-by-code.js');
module.exports = {
  ...base,
  id: 'K-265',
  slug: 'color-by-shape-code',
  // real levels (2026-11-02: all three were the published level 2)
  difficulty: { 1: {"mode":"shapes","codes":3,"items":9,"size":110}, 2: {"mode":"shapes","codes":4,"items":12,"size":96}, 3: {"mode":"shapes","codes":5,"items":12,"size":90} },
  i18n: { en: { title: "Color by Shape Code", instruction: "Look at the code. Then color every shape to match it." } },
};
