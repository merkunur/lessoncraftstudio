/** Level Set config — Year pages, literacy U (Daily Teaching System, Part 12.3), 2026-11-17. PDF only.
 *  Four NEW Grade 1 grammar page types: G1-592 Names, Days, and Months Get Capitals and G1-593 Capital Letter or Small Letter? (L.1.2.a); G1-594 Joining Words: and, but, so, because (L.1.1.g); G1-595 Yesterday, Today, and Tomorrow (L.1.1.e). Factory types/_shared/grammar-g1.js; bank data/literacy/grammar-g1.en.json.
 *  No theme: a copy draws other items from one small bank, so two copies of a level DO share items: at most three
 *  quarters of a page (shareFrac 0.75; no two copies are the same page). Every face is NEW (noPublished). English only. */
'use strict';
const FACES = ['G1-592', 'G1-593', 'G1-594', 'G1-595'];
module.exports = {
  prefix: 'ylu',
  themeless: true,
  interactive: false,   // PDF only
  titleMax: 100,
  maxCopies: 5,
  maxShared: 30,
  shareFrac: 0.75,
  seeds: 60,
  allowFewer: true,
  note: 'Level Set 2026-11-18: Year pages, literacy U (Part 12.3). Four new Grade 1 grammar page types: capitals for names, days and months; a capital or a small letter; the joining words and, but, so, because; verbs for yesterday, today and tomorrow, three levels each. English only, PDF only.',
  faces: Object.fromEntries(FACES.map((id) => [id, { levels: [2, 1, 3], noPublished: true }])),
  include: (loc) => loc === 'en',
};
