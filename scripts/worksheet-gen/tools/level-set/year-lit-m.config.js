/** Level Set config — Year pages, literacy M (Daily Teaching System, Part 12.3), 2026-11-17. PDF only.
 *  Four NEW Grade 1 phonics page types for the unit "Long Vowels: Silent e and Vowel Teams" (Grade 1):
 *    G1-584 Silent e Changes the Vowel, G1-585 Long a: ai and ay, G1-586 Long e: ee and ea, G1-587 Long o: oa and ow
 *    (RF.1.3.c; types/_shared/vowels-g1.js). No theme: a copy draws other words from one small word bank
 *  (data/literacy/long-vowels.en.json), so two copies of a level DO share words: at most three quarters of a page
 *  (shareFrac 0.75; no two copies are the same page). Level 1 of G1-584 gets TWO copies: it draws six of the eight a_e
 *  pairs, so a third copy shares more than three quarters of its words with another (measured 2026-11-17); the
 *  operator rule is "only copies that differ". Every face is NEW (noPublished). English only. */
'use strict';
const FACES = ['G1-584', 'G1-585', 'G1-586', 'G1-587'];
module.exports = {
  prefix: 'ylm',
  themeless: true,
  interactive: false,   // PDF only
  titleMax: 100,
  maxCopies: 5,
  maxShared: 30,
  shareFrac: 0.75,
  seeds: 60,
  allowFewer: true,
  note: 'Level Set 2026-11-17: Year pages, literacy M (Part 12.3). Four new Grade 1 phonics page types on long vowels: silent e, and the vowel teams ai and ay, ee and ea, oa and ow, with word pairs, pictures, word sorts, gap words and sentences, three levels each, for the lessons of the English literacy year. Noindex.',
  faces: Object.fromEntries(FACES.map((id) => [id, { levels: [2, 1, 3], noPublished: true }])),
  include: (loc) => loc === 'en',
};
