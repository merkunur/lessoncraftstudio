/** G1-300 — Naming Words and Describing Words. nt20-B-VAR variation of G2-275. */
'use strict';
const base = require('../g2/G2-275-word-classes.js');
// One object for all three levels: the waves ship d2 only, so a face must
// render identically whichever level is asked for. Spreading the base entry
// (not a JSON literal) carries function-valued params through intact.
const D = { ...base.difficulty[1], ...{"classes":["noun","adj"],"per":5,"pics":false,"tiers":[1],"lines":6} };
module.exports = {
  ...base,
  id: 'G1-300',
  slug: 'word-classes-nouns-and-adjectives',
  difficulty: { 1: D, 2: D, 3: D },
  i18n: { en: { title: "Naming Words and Describing Words", instruction: "Sort each word into the right bin." } },
};
