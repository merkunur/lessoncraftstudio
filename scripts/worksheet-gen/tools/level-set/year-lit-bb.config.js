/** Level Set config — Year pages, literacy BB (Daily Teaching System, Part 12.3), 2026-11-17. PDF only.
 *  Four NEW Grade 1 page types on word meanings and word parts: G1-608 Words by Category: Cut and Sort and G1-609 A Duck Is a Bird That Swims: Define Words (L.1.5.b); G1-610 Add -s, -ed, and -ing and G1-611 Which Ending Fits? -s, -ed, or -ing (RF.1.3.f). Factory types/_shared/word-meanings-g1.js; bank data/literacy/word-meanings-g1.en.json.
 *  No theme: a copy draws other items from one small bank, so two copies of a level DO share items: at most three
 *  quarters of a page (shareFrac 0.75; no two copies are the same page). Every face is NEW (noPublished). English only. */
'use strict';
const FACES = ['G1-608', 'G1-609', 'G1-610', 'G1-611'];
module.exports = {
  prefix: 'ylbb',
  themeless: true,
  interactive: false,   // PDF only
  titleMax: 100,
  maxCopies: 5,
  maxShared: 30,
  shareFrac: 0.75,
  seeds: 60,
  allowFewer: true,
  note: 'Level Set 2026-11-17: Year pages, literacy BB (Part 12.3). Four new Grade 1 page types: words by category, defining a word by its category and one attribute, and the endings -s, -ed and -ing, three levels each. English only, PDF only.',
  faces: Object.fromEntries(FACES.map((id) => [id, { levels: [2, 1, 3], noPublished: true }])),
  include: (loc) => loc === 'en',
};
