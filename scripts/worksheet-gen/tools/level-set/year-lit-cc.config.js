/** Level Set config — Year pages, literacy CC (Daily Teaching System, Part 12.3), 2026-11-17. PDF only.
 *  Three NEW Grade 2 page types on choosing the right word: G2-549 Describing Words in Real Life and G2-550 Draw and Write with Describing Words (L.2.5.a); G2-551 Adjective or Adverb? (L.2.1.e). Factory types/_shared/word-choice-g2.js; bank data/literacy/word-choice-g2.en.json.
 *  No theme: a copy draws other items from one small bank, so two copies of a level DO share items: at most three
 *  quarters of a page (shareFrac 0.75; no two copies are the same page). Every face is NEW (noPublished). English only. */
'use strict';
const FACES = ['G2-549', 'G2-550', 'G2-551'];
module.exports = {
  prefix: 'ylcc',
  themeless: true,
  interactive: false,   // PDF only
  titleMax: 100,
  maxCopies: 5,
  maxShared: 30,
  shareFrac: 0.75,
  seeds: 60,
  allowFewer: true,
  note: 'Level Set 2026-11-17: Year pages, literacy CC (Part 12.3). Three new Grade 2 page types: describing words for real things (spicy, juicy, crunchy), to choose and to draw and write, and adjective or adverb, three levels each. English only, PDF only.',
  faces: Object.fromEntries(FACES.map((id) => [id, { levels: [2, 1, 3], noPublished: true }])),
  include: (loc) => loc === 'en',
};
