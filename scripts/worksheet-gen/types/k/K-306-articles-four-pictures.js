/** K-306 — Circle the Right Word: Four Pictures. nt20-B-VAR variation of K-288. */
'use strict';
const base = require('./K-288-articles.js');
// One object for all three levels: the waves ship d2 only, so a face must
// render identically whichever level is asked for. Spreading the base entry
// (not a JSON literal) carries function-valued params through intact.
const D = { ...base.difficulty[1], ...{} };
module.exports = {
  ...base,
  id: 'K-306',
  slug: 'articles-four-pictures',
  difficulty: { 1: D, 2: D, 3: D },
  i18n: { en: { title: "Circle the Right Word: Four Pictures", instruction: "Say each picture word, then circle the word that belongs with it." } },
};
