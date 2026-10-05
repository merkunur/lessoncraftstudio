/** Level Set config — Counting Money, themeless faces (G1-211 Counting Coins + 4 variations, G1-232 Which Purse Has
 *  More?), 2026-10-05. Coins in the native currency per locale; 5 new copies per level, a copy shares at most half its
 *  purses with another copy of its level. Level 2 copy 1 is the published page (skipped). PDF + interactive + key.
 *  The shop faces (G2-276 + 7 variations) run from money-shop.config.js. */
'use strict';
const ALL = ['G1-211', 'G1-228', 'G1-229', 'G1-230', 'G1-231', 'G1-232'];
module.exports = {
  prefix: 'mon',
  themeless: true,
  titleMax: 100,
  maxCopies: 5,
  maxShared: 99,
  shareFrac: 0.5,
  seeds: 40,
  allowFewer: true,
  note: 'Level Set 2026-10-05: Counting Money (coin purses and Which Purse Has More?). Level 1 fewer and bigger coins, level 2 the published page, level 3 more coins and every kind (close totals and the more-coins-less-money trap on the purse page). Visible to teachers, never indexed; PDF + interactive screen version + answer key.',
  faces: Object.fromEntries(ALL.map((id) => [id, { levels: [2, 1, 3] }])),
  include: () => true,
};
