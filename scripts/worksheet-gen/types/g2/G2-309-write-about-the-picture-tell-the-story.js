/** G2-309 — Write About the Picture: Tell the Story. nt20-B-VAR variation of G2-278. */
'use strict';
const base = require('./G2-278-write-about-the-picture.js');
// One object for all three levels: the waves ship d2 only, so a face must
// render identically whichever level is asked for. Spreading the base entry
// (not a JSON literal) carries function-valued params through intact.
const D = { ...base.difficulty[2], ...{} };
module.exports = {
  ...base,
  id: 'G2-309',
  slug: 'write-about-the-picture-tell-the-story',
  difficulty: { 1: D, 2: D, 3: D },
  i18n: { en: { title: "Write About the Picture: Tell the Story", instruction: "Start with the story openers and tell what happened in the picture." } },
};
