/** Level Set config — Year pages, literacy X (Daily Teaching System, Part 12.3), 2026-11-17. PDF only.
 *  Eight NEW Grade 3 page types on reading long words: G3-512 Closed and Open Syllables and G3-513 Closed or Open? Sort Long Words (RF.3.3.c); G3-514 Silent-e, Vowel-Team, and Consonant-le Syllables and G3-515 Build Long Words from Syllables (RF.3.3.c); G3-516 Base Words and Suffixes and G3-517 Which Word Fits? Suffixes in Sentences (RF.3.3.a); G3-518 Heart Words: enough, though, ocean and G3-519 The Sounds of ough: Sort the Words (RF.3.3.d). Factory types/_shared/long-words-g3.js; bank data/literacy/long-words-g3.en.json.
 *  No theme: a copy draws other items from one small bank, so two copies of a level DO share items: at most three
 *  quarters of a page (shareFrac 0.75; no two copies are the same page). Every face is NEW (noPublished). English only. */
'use strict';
const FACES = ['G3-512', 'G3-513', 'G3-514', 'G3-515', 'G3-516', 'G3-517', 'G3-518', 'G3-519'];
module.exports = {
  prefix: 'ylx',
  themeless: true,
  interactive: false,   // PDF only
  titleMax: 100,
  maxCopies: 5,
  maxShared: 30,
  shareFrac: 0.75,
  seeds: 60,
  allowFewer: true,
  note: 'Level Set 2026-11-18: Year pages, literacy X (Part 12.3). Eight new Grade 3 page types: closed and open syllables, silent-e, vowel-team and consonant-le syllables, suffixes, and heart words with the sounds of ough, three levels each. English only, PDF only.',
  faces: Object.fromEntries(FACES.map((id) => [id, { levels: [2, 1, 3], noPublished: true }])),
  include: (loc) => loc === 'en',
};
