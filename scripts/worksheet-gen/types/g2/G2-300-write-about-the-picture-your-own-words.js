/** G2-300 — Write About the Picture: Your Own Words. nt20-B-VAR variation of G2-278. */
'use strict';
const base = require('./G2-278-write-about-the-picture.js');
// One object for all three levels: the waves ship d2 only, so a face must
// render identically whichever level is asked for. Spreading the base entry
// (not a JSON literal) carries function-valued params through intact.
const D = { ...base.difficulty[3], ...{} };
module.exports = {
  ...base,
  id: 'G2-300',
  slug: 'write-about-the-picture-your-own-words',
  difficulty: { 1: D, 2: D, 3: D },
  i18n: { en: { title: "Write About the Picture: Your Own Words", instruction: "No sentence starters this time. Use the word bank and write your own story." } },
};
