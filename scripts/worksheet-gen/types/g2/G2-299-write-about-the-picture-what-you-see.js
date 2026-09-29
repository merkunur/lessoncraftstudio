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
  // Level Set 2026-09-29: L1 a starter on every one of 3 big rows; L2 published; L3 six rows, the SAME three starters on rows 1/3/5
  difficulty: {
    1: { ...D, nouns: 3, repeats: 2, rows: 3, rowH: 80, glyphH: 30, starters: null, starterRows: [0, 1, 2], starterSet: 'd1' },
    2: D,
    3: { ...base.difficulty[3], sceneH: 220, rowH: 56, starters: null, starterRows: [0, 2, 4], starterSet: 'd1' },
  },
  i18n: { en: { title: "Write About the Picture: What You See", instruction: "Sentence starters help you begin. The word bank names everything." } },
};
