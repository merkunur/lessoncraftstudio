/** Level Set config — Doubles and Halves, the NUMBER pages (G1-271 mixed, G1-298 doubles, G1-299 halves), 2026-10-07.
 *  Themeless: a copy = a seed; a copy shares at most half of its cards with another copy of its level. Level 2 copy 1
 *  is the published page. PDF + interactive + key. The picture pages run from doubles-halves.config.js. */
'use strict';
module.exports = {
  prefix: 'dhn',
  themeless: true,
  titleMax: 100,
  maxCopies: 5,
  maxShared: 99,
  shareFrac: 0.75,   // only 9 numbers to double or halve: a copy differs in at least 2 of its cards
  seeds: 40,
  allowFewer: true,
  note: 'Level Set 2026-10-07: Doubles and Halves, number pages. Level 1 numbers to 12 and fewer cards, level 2 the published page, level 3 thinks backwards (the double or the halves are given: find the number). Visible to teachers, never indexed; PDF + interactive screen version + answer key.',
  faces: Object.fromEntries(['G1-271', 'G1-298', 'G1-299'].map((id) => [id, { levels: [2, 1, 3] }])),
  include: () => true,
};
