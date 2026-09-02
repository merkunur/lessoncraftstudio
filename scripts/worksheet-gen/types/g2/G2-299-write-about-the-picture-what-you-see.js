/** G2-299 — Write About the Picture: What You See. nt20-B-VAR variation of G2-278. */
'use strict';
const base = require('./G2-278-write-about-the-picture.js');
// One object for all three levels: the waves ship d2 only, so a face must
// render identically whichever level is asked for. Spreading the base entry
// (not a JSON literal) carries function-valued params through intact.
const D = { ...base.difficulty[1], ...{} };
module.exports = {
  ...base,
  id: 'G2-299',
  slug: 'write-about-the-picture-what-you-see',
  difficulty: { 1: D, 2: D, 3: D },
  i18n: { en: { title: "Write About the Picture: What You See", instruction: "Look at the picture. The word bank names everything in it. Write about what you see." } },
};
