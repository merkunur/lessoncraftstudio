/** Level Set config — Year pages, literacy S (Daily Teaching System, Part 12.3), 2026-11-17. PDF only.
 *  Five NEW Grade 2 phonics page types: G2-530 Short or Long Vowel? (RF.2.3.a), G2-531 Vowel Teams for Long a, e, and o, G2-532 Vowel Sounds: oo, ou, ow, oi, and oy, G2-533 Bossy r: ar and or (RF.2.3.b), G2-534 er, ir, and ur: One Sound, Three Spellings (RF.2.3.e). Factory types/_shared/vowels-g2.js; bank data/literacy/vowels-g2.en.json.
 *  No theme: a copy draws other items from one small bank, so two copies of a level DO share items: at most three
 *  quarters of a page (shareFrac 0.75; no two copies are the same page). Every face is NEW (noPublished). English only. */
'use strict';
const FACES = ['G2-530', 'G2-531', 'G2-532', 'G2-533', 'G2-534'];
module.exports = {
  prefix: 'yls',
  themeless: true,
  interactive: false,   // PDF only
  titleMax: 100,
  maxCopies: 5,
  maxShared: 30,
  shareFrac: 0.75,
  seeds: 60,
  allowFewer: true,
  note: 'Level Set 2026-11-18: Year pages, literacy S (Part 12.3). Five new Grade 2 phonics page types: short and long vowels, the vowel teams for long a, e and o, the vowel sounds of oo, ou, ow, oi and oy, ar and or, and er, ir and ur, with word sorts, gap words, pictures to write and sentences, three levels each. English only, PDF only.',
  faces: Object.fromEntries(FACES.map((id) => [id, { levels: [2, 1, 3], noPublished: true }])),
  include: (loc) => loc === 'en',
};
