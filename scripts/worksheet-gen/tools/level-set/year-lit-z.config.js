/** Level Set config — Year pages, literacy Z (Daily Teaching System, Part 12.3), 2026-11-17. PDF only.
 *  Four NEW Grade 1 page types on two-syllable words: G1-600 Every Syllable Has a Vowel and G1-601 One Syllable or Two? (RF.1.3.d); G1-602 Compound Words and Two-Part Words (RF.1.3.e); G1-603 Heart Words: said, was, of, could (RF.1.3.g). Factory types/_shared/syllables-g1.js; bank data/literacy/syllables-g1.en.json.
 *  No theme: a copy draws other items from one small bank, so two copies of a level DO share items: at most three
 *  quarters of a page (shareFrac 0.75; no two copies are the same page). Every face is NEW (noPublished). English only. */
'use strict';
const FACES = ['G1-600', 'G1-601', 'G1-602', 'G1-603'];
module.exports = {
  prefix: 'ylz',
  themeless: true,
  interactive: false,   // PDF only
  titleMax: 100,
  maxCopies: 5,
  maxShared: 30,
  shareFrac: 0.75,
  seeds: 60,
  allowFewer: true,
  note: 'Level Set 2026-11-18: Year pages, literacy Z (Part 12.3). Four new Grade 1 page types: the vowel sound in every syllable, one syllable or two, compound and two-part words, and the heart words said, was, of, could, three levels each. English only, PDF only.',
  faces: Object.fromEntries(FACES.map((id) => [id, { levels: [2, 1, 3], noPublished: true }])),
  include: (loc) => loc === 'en',
};
