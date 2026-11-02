/** K-264 — Cut and Paste: Two Big Groups. nt20-VAR variation of K-240 (same family: cutting-practice). */
'use strict';
const base = require('./K-240-cut-and-paste.js');
module.exports = {
  ...base,
  id: 'K-264',
  slug: 'cut-and-paste-two-groups',
  // real levels (2026-11-02: all three were the published level 2): 3, 4 and 5 pictures a group
  difficulty: { 1: {"bins":2,"perBin":3,"tilePx":104,"ghostGrid":true}, 2: {"bins":2,"perBin":4,"tilePx":104,"twoStrips":true,"ghostGrid":true}, 3: {"bins":2,"perBin":5,"tilePx":96,"twoStrips":true,"ghostGrid":true} },
  i18n: { en: { title: "Cut and Paste: Two Big Groups", instruction: "Cut out the pictures at the bottom. Sort them and glue each one into its box." } },
};
