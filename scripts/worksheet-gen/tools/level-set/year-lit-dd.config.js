/** Level Set config — Year pages, literacy DD (Daily Teaching System, Part 12.3), 2026-11-17. PDF only.
 *  Four NEW Grade 3 page types on word meanings: G3-540 Context Clues: What Kind of Clue? and G3-541 Context Clues in a Passage (L.3.4.a); G3-542 Use a Dictionary: Guide Words and Meanings and G3-543 Use a Glossary: Find the Meaning (L.3.4.d). Factory types/_shared/word-meanings-g3.js; bank data/literacy/word-meanings-g3.en.json.
 *  No theme: a copy draws other items from one small bank, so two copies of a level DO share items: at most three
 *  quarters of a page (shareFrac 0.75; no two copies are the same page). Every face is NEW (noPublished). English only. */
'use strict';
const FACES = ['G3-540', 'G3-541', 'G3-542', 'G3-543'];
module.exports = {
  prefix: 'yldd',
  themeless: true,
  interactive: false,   // PDF only
  titleMax: 100,
  maxCopies: 5,
  maxShared: 30,
  shareFrac: 0.75,
  seeds: 60,
  allowFewer: true,
  note: 'Level Set 2026-11-17: Year pages, literacy DD (Part 12.3). Four new Grade 3 page types: context clues in a sentence and in a passage, a dictionary page with guide words, and a text with its glossary, three levels each. English only, PDF only.',
  faces: Object.fromEntries(FACES.map((id) => [id, { levels: [2, 1, 3], noPublished: true }])),
  include: (loc) => loc === 'en',
};
