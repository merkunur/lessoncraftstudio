/** Level Set config — Year pages, literacy Y (Daily Teaching System, Part 12.3), 2026-11-17. PDF only.
 *  Ten NEW Grade 3 page types on sentences and conventions: G3-521 Choose the Joining Word and G3-520 Join Sentences with Joining Words (L.3.1.h); G3-522 Simple, Compound, and Complex Sentences and G3-523 Build Compound and Complex Sentences (L.3.1.i); G3-525 Comparing Words: Choose the Right Form and G3-524 Better, Best: Comparing with Adjectives and Adverbs (L.3.1.g); G3-526 Possessive Nouns: One Owner or More and G3-527 Add the Apostrophe: Fix the Possessives (L.3.2.d); G3-529 Find the Capitals in Titles and G3-528 Capitals in Titles (L.3.2.a). Factory types/_shared/sentences-g3.js; bank data/literacy/sentences-g3.en.json.
 *  No theme: a copy draws other items from one small bank, so two copies of a level DO share items: at most three
 *  quarters of a page (shareFrac 0.75; no two copies are the same page). Every face is NEW (noPublished). English only. */
'use strict';
const FACES = ['G3-520', 'G3-521', 'G3-522', 'G3-523', 'G3-524', 'G3-525', 'G3-526', 'G3-527', 'G3-528', 'G3-529'];
module.exports = {
  prefix: 'yly',
  themeless: true,
  interactive: false,   // PDF only
  titleMax: 100,
  maxCopies: 5,
  maxShared: 30,
  shareFrac: 0.75,
  seeds: 60,
  allowFewer: true,
  note: 'Level Set 2026-11-19: Year pages, literacy Y (Part 12.3). Ten new Grade 3 page types: joining words, simple, compound and complex sentences, comparing with adjectives and adverbs, possessive nouns, and capitals in titles, three levels each. English only, PDF only.',
  faces: Object.fromEntries(FACES.map((id) => [id, { levels: [2, 1, 3], noPublished: true }])),
  include: (loc) => loc === 'en',
};
