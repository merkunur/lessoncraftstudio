/** Level Set config — Year pages, literacy V (Daily Teaching System, Part 12.3), 2026-11-17. PDF only.
 *  Three NEW Grade 2 page types on word building: G2-535 Prefixes un- and re- (L.2.4.b); G2-536 Suffixes -ful, -less, and -ly (RF.2.3.d); G2-537 Apostrophes (L.2.2.c: contractions and one owner). Factory types/_shared/word-building-g2.js; bank data/literacy/word-building-g2.en.json.
 *  No theme: a copy draws other items from one small bank, so two copies of a level DO share items: at most three
 *  quarters of a page (shareFrac 0.75; no two copies are the same page). Every face is NEW (noPublished). English only. */
'use strict';
const FACES = ['G2-535', 'G2-536', 'G2-537'];
module.exports = {
  prefix: 'ylv',
  themeless: true,
  interactive: false,   // PDF only
  titleMax: 100,
  maxCopies: 5,
  maxShared: 30,
  shareFrac: 0.75,
  seeds: 60,
  allowFewer: true,
  note: 'Level Set 2026-11-18: Year pages, literacy V (Part 12.3). Three new Grade 2 page types: the prefixes un- and re-, the suffixes -ful, -less and -ly, and apostrophes in contractions and for one owner, three levels each. English only, PDF only.',
  faces: Object.fromEntries(FACES.map((id) => [id, { levels: [2, 1, 3], noPublished: true }])),
  include: (loc) => loc === 'en',
};
