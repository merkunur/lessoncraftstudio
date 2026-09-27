/** K-306 — Circle the Right Word: Four Pictures. nt20-B-VAR variation of K-288. */
'use strict';
const base = require('./K-288-articles.js');
// D = the published level-2 face (byte-identical). Spreading the base entry
// (not a JSON literal) carries function-valued params through intact.
const D = { ...base.FOUR, ...{} };
module.exports = {
  ...base,
  id: 'K-306',
  slug: 'articles-four-pictures',
  // Level Set 2026-09-28: L1 = the noun printed under each picture (read it, don't guess the name);
  // no harder level exists (ladder verdict TWO-ONLY) — 3 stays the published config and is never waved.
  difficulty: { 1: { ...D, showWord: true }, 2: D, 3: D },
  i18n: { en: { title: "Circle the Right Word: Four Pictures", instruction: "Say each picture word, then circle the word that belongs with it." } },
};
