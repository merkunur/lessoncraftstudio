/** K-307 — Circle the Right Word: Eight Pictures. nt20-B-VAR variation of K-288. */
'use strict';
const base = require('./K-288-articles.js');
// D = the published level-2 face (byte-identical). Spreading the base entry
// (not a JSON literal) carries function-valued params through intact.
const D = { ...base.EIGHT, ...{} };
module.exports = {
  ...base,
  id: 'K-307',
  slug: 'articles-eight-pictures',
  // Level Set 2026-09-28: L1 = the noun printed under each picture; no harder level (TWO-ONLY).
  difficulty: { 1: { ...D, showWord: true }, 2: D, 3: D },
  i18n: { en: { title: "Circle the Right Word: Eight Pictures", instruction: "Eight pictures this time. Circle the word that belongs with each." } },
};
