/** Level Set config — Year pages, literacy O (Daily Teaching System, Part 12.3), 2026-11-17. PDF only.
 *  Four NEW Grade 1 phonics page types for the unit Digraphs and Blends (Grade 1): G1-588 Digraphs: sh, ch, and th; G1-589 Digraphs: ck, ng, and wh; G1-590 Blends at the Start; G1-591 Blends at the End (RF.1.3.a, RF.1.3.b; types/_shared/blends-g1.js; bank data/literacy/blends-g1.en.json).
 *  No theme: a copy draws other items from one small bank, so two copies of a level DO share items: at most three
 *  quarters of a page (shareFrac 0.75; no two copies are the same page). Every face is NEW (noPublished). English only. */
'use strict';
const FACES = ['G1-588', 'G1-589', 'G1-590', 'G1-591'];
module.exports = {
  prefix: 'ylo',
  themeless: true,
  interactive: false,   // PDF only
  titleMax: 100,
  maxCopies: 5,
  maxShared: 30,
  shareFrac: 0.75,
  seeds: 60,
  allowFewer: true,
  note: 'Level Set 2026-11-17: Year pages, literacy O (Part 12.3). Four new Grade 1 phonics page types on digraphs and blends: sh, ch and th; ck, ng and wh; blends at the start; blends at the end, with words to build, matching, word sorts, gap words and sentences, three levels each. English only, PDF only.',
  faces: Object.fromEntries(FACES.map((id) => [id, { levels: [2, 1, 3], noPublished: true }])),
  include: (loc) => loc === 'en',
};
