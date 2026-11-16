/** Level Set config — Year pages, literacy T (Daily Teaching System, Part 12.3), 2026-11-17. PDF only.
 *  Four NEW Kindergarten page types for short vowels and consonant-vowel-consonant words: K-661 Short a and Short i; K-662 Short o, Short u, and Short e (RF.K.3.b: read words, match them to pictures, write the vowel, sort, write the word); K-663 Change One Sound to Make a New Word (RF.K.2.e: a ladder the teacher dictates); K-664 Which Word Matches? One Letter Is Different (RF.K.3.d). Factory types/_shared/cvc-k.js; bank data/literacy/cvc-k.en.json.
 *  No theme: a copy draws other items from one small bank, so two copies of a level DO share items: at most three
 *  quarters of a page (shareFrac 0.75; no two copies are the same page). Every face is NEW (noPublished). English only. */
'use strict';
const FACES = ['K-661', 'K-662', 'K-663', 'K-664'];
module.exports = {
  prefix: 'ylt',
  themeless: true,
  interactive: false,   // PDF only
  titleMax: 100,
  maxCopies: 5,
  maxShared: 30,
  shareFrac: 0.75,
  seeds: 60,
  allowFewer: true,
  note: 'Level Set 2026-11-18: Year pages, literacy T (Part 12.3). Four new Kindergarten page types: short a and i, short o, u and e, change one sound to make a new word, and two words that differ in one letter, three levels each. English only, PDF only.',
  faces: Object.fromEntries(FACES.map((id) => [id, { levels: [2, 1, 3], noPublished: true }])),
  include: (loc) => loc === 'en',
};
