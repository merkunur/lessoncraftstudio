/** Level Set config — Color by Number illustrated pictures (K-393 Scenes + K-394 Pictures), 2026-10-04. PDF + interactive + key.
 *  One copy per DESIGN (the unit), at the design's own level (lib/cbn-type.js builds a design only at its level). */
'use strict';
const PILOT = process.env.CBN_PILOT === '1';
module.exports = {
  prefix: 'cbn',
  themeless: true,
  unitsOnly: true,
  noExemplarSkip: true,   // new faces: no published page to skip
  titleMax: 100,
  maxCopies: 999,
  maxShared: 99,
  seeds: 1,
  allowFewer: true,
  note: 'Color by Number 2026-10-04: illustrated scenes (K-393) and single multi-part pictures (K-394), one worksheet per design, levels by measured complexity (L1 big parts, 3-5 colours; L2 5-7 colours; L3 6-8 colours, many parts). Visible to teachers, never indexed; PDF + tap-to-colour screen version + coloured answer key.',
  faces: { 'K-393': { levels: [1, 2, 3] }, 'K-394': { levels: [1, 2, 3] } },
  include: (loc) => !PILOT || loc === 'en',
};
