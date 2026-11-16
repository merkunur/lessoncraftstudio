/** Level Set config — Year pages, literacy N (Daily Teaching System, Part 12.3), 2026-11-17. PDF only.
 *  Seven NEW Kindergarten page types for the unit Words and Sentences: K-654 Naming Words and Action Words, K-658 Find the Action Word (L.K.1.b); K-655 A Sentence Starts with a Capital Letter, K-660 Fix the First Letter (L.K.2.a); K-656 A Period or a Question Mark?, K-659 Telling or Asking? Sort the Sentences (L.K.2.b); K-657 Say More: Make the Sentence Longer (L.K.1.f). Factory types/_shared/sentences-k.js; bank data/literacy/sentences-k.en.json.
 *  No theme: a copy draws other items from one small bank, so two copies of a level DO share items: at most three
 *  quarters of a page (shareFrac 0.75; no two copies are the same page). Every face is NEW (noPublished). English only. */
'use strict';
const FACES = ['K-654', 'K-655', 'K-656', 'K-657', 'K-658', 'K-659', 'K-660'];
module.exports = {
  prefix: 'yln',
  themeless: true,
  interactive: false,   // PDF only
  titleMax: 100,
  maxCopies: 5,
  maxShared: 30,
  shareFrac: 0.75,
  seeds: 60,
  allowFewer: true,
  note: 'Level Set 2026-11-17: Year pages, literacy N (Part 12.3). Seven new Kindergarten page types on words and sentences: naming words and action words, the capital letter at the start, the period and the question mark, and longer sentences, with cards to cut and glue, words to circle and rows to write on, three levels each. English only, PDF only.',
  faces: Object.fromEntries(FACES.map((id) => [id, { levels: [2, 1, 3], noPublished: true }])),
  include: (loc) => loc === 'en',
};
