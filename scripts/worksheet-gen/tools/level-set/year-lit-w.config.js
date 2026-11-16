/** Level Set config — Year pages, literacy W (Daily Teaching System, Part 12.3), 2026-11-17. PDF only.
 *  Six NEW Grade 2 page types, the second pages of the phonics lessons and two more lessons: G2-543 Reading Words with oo, ou, ow, oi, and oy; G2-544 Reading Words with ar and or; G2-545 Reading Words with er, ir, and ur (yes or no, riddles, read and draw); G2-546 Long Vowels in Two-Syllable Words and G2-547 Build and Read Two-Syllable Words (RF.2.3.c); G2-548 Heart Words: could, would, should (RF.2.3.f). Factory types/_shared/vowels-g2b.js; bank data/literacy/vowels-g2b.en.json.
 *  No theme: a copy draws other items from one small bank, so two copies of a level DO share items: at most three
 *  quarters of a page (shareFrac 0.75; no two copies are the same page). Every face is NEW (noPublished). English only. */
'use strict';
const FACES = ['G2-543', 'G2-544', 'G2-545', 'G2-546', 'G2-547', 'G2-548'];
module.exports = {
  prefix: 'ylw',
  themeless: true,
  interactive: false,   // PDF only
  titleMax: 100,
  maxCopies: 5,
  maxShared: 30,
  shareFrac: 0.75,
  seeds: 60,
  allowFewer: true,
  note: 'Level Set 2026-11-18: Year pages, literacy W (Part 12.3). Six new Grade 2 page types: reading for meaning with oo, ou, ow, oi and oy, with ar and or, and with er, ir and ur; long vowels in two-syllable words; and the heart words could, would, should, three levels each. English only, PDF only.',
  faces: Object.fromEntries(FACES.map((id) => [id, { levels: [2, 1, 3], noPublished: true }])),
  include: (loc) => loc === 'en',
};
