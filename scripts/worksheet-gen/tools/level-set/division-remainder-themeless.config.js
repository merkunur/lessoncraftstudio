/** Level Set config — Division with Remainders, the NUMBER pages (G3-381 Practice Rows, G3-382 Exact or Not, G3-383
 *  Find the Error, G3-384 Hop Back on the Number Line), 2026-10-06. Themeless: a copy = (divisor set, seed); a copy
 *  shares at most half of its divisions with another copy of its level. Level 2 copy 1 is the published page.
 *  PDF + interactive + key. The picture pages run from division-remainder.config.js. */
'use strict';
module.exports = {
  prefix: 'dwrn',
  themeless: true,
  titleMax: 100,
  maxCopies: 5,
  maxShared: 99,
  shareFrac: 0.5,
  seeds: 40,
  allowFewer: true,
  note: 'Level Set 2026-10-06: Division with Remainders, number pages (practice rows, exact or not, find the error, hop back on the number line). Level 1 small divisors and fewer rows, level 2 the published page, level 3 divisors 6 to 9 and bigger numbers. Visible to teachers, never indexed; PDF + interactive screen version + answer key.',
  faces: Object.fromEntries(['G3-381', 'G3-382', 'G3-383', 'G3-384'].map((id) => [id, { levels: [2, 1, 3] }])),
  include: () => true,
};
