/** G2-300 — Write About the Picture: Your Own Words. nt20-B-VAR variation of G2-278. */
'use strict';
const base = require('./G2-278-write-about-the-picture.js');
// One object for all three levels: the waves ship d2 only, so a face must
// render identically whichever level is asked for. Spreading the base entry
// (not a JSON literal) carries function-valued params through intact.
// Frozen 2026-09-29 (Level Set): the published page's values, written out so a change to the base's level 3
// (tightened for long fr/pt titles) can never reach this published page.
const D = { nouns: 6, repeats: 1, sceneH: 230, rows: 6, rowH: 56, glyphH: 24, starters: null };
module.exports = {
  ...base,
  id: 'G2-300',
  slug: 'write-about-the-picture-your-own-words',
  // Level Set 2026-09-29: L1 the first sentence started; L2 published; L3 a 5-word bank with a tick box beside every picture (use at least three words, tick each one used)
  difficulty: {
    1: { ...base.difficulty[1], starters: null, starterRows: [0], starterSet: 'd2' },
    2: D,
    3: { ...D, nouns: 5, repeats: 2, rowH: 50, tick: true },   // 5 words: a ticked bank stays on one line (6 wrapped and overflowed de/nl)
  },
  i18n: { en: { title: "Write About the Picture: Your Own Words", instruction: "No sentence starters this time. Use the word bank and write your own story." } },
};
