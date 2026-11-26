/** Level Set config — Year pages, mathematics E-2 SV (Daily Teaching System, Stage E-2), 2026-11-26. PDF only.
 *  The ten Swedish page types of batch SV (types/_shared/e2-math-sv.js, e2-math-sv-art.js, and two Swedish sets of the
 *  DE-A measuring table in e2-math.js; the lessons and rulings: lcs-stage-d/batch-sv/LINES.md, BATCH-SV-RESULT.md; a
 *  Swedish lågstadium teacher read them in two rounds):
 *    sv  K-727 Vad rymmer mest? · G1-676 · G1-677 · G2-637 · G3-647 to G3-652
 *  Themeless: a copy = a seed. Every face is NEW (noPublished). Noindex like every Level Set; the units link the pages. */
'use strict';
const LOC = Object.fromEntries(['K-727', 'G1-676', 'G1-677', 'G2-637', 'G3-647', 'G3-648', 'G3-649', 'G3-650', 'G3-651', 'G3-652'].map((id) => [id, 'sv']));
module.exports = {
  prefix: 'yed',
  themeless: true,
  interactive: false,   // PDF only
  titleMax: 100,
  maxCopies: 5,
  maxShared: 99,
  shareFrac: 0.5,
  seeds: 60,
  allowFewer: true,
  note: 'Level Set 2026-11-26: Year pages, mathematics E-2 SV. Ten Swedish page types for lessons of the year design (capacity, units, subtraction as difference, metres and centimetres, number symbols, is the answer reasonable, mental arithmetic with steps, old measures, proportional tables, half centimetres in a diagram), three levels each, PDF only.',
  faces: Object.fromEntries(Object.keys(LOC).map((id) => [id, { levels: [2, 1, 3], noPublished: true }])),
  include: (loc, id) => LOC[id] === loc,
};
