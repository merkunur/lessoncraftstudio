/** Level Set config — Map Skills (`maps`: G1-379 base + K-377 / G2-369 / G2-370 / G2-371 / G3-396), 2026-10-14.
 *  PDF ONLY (operator: only PDF — no screen version, no answer key). Themeless: a copy = a seed. The levels live in
 *  G1-379 (base difficulty 1/3 + FACE_LEVELS / levelsFor): level 1 easier, level 2 the published page, level 3 harder.
 *  Copies of a level differ by spec.levelSetWords (the counts asked, the models drawn, the rose letters, the numbering,
 *  the rows asked); the two world-map faces get 3 copies a level (operator 2026-10-14: the map never changes, so a copy
 *  can only re-number it). */
'use strict';
module.exports = {
  prefix: 'mps',
  themeless: true,
  interactive: false,
  titleMax: 100,
  maxCopies: 5,
  maxShared: 3,
  shareFrac: 0.5,
  seeds: 80,
  allowFewer: true,
  noUnits: true,
  note: 'Level Set 2026-10-14: Map Skills. Level 1 easier (a smaller map key with the symbols on the cards; four bigger upright compass roses with the four direction words; four pairs of things seen from above; two continent names or numbers already written; two pictures to choose from), level 2 the published page with a new draw, level 3 harder (bigger counts on a fuller map; every compass rose turned; the long and square things seen from above turned round; no word box; the names of the continents and oceans written from memory; a north arrow instead of a compass rose and nearer wrong pictures). Visible to teachers, never indexed; PDF only.',
  faces: {
    'G1-379': { levels: [2, 1, 3] },
    'K-377': { levels: [2, 1, 3], shareFrac: 0.4 },
    'G2-369': { levels: [2, 1, 3], shareFrac: 0.34 },
    'G2-370': { levels: [2, 1, 3], maxCopiesAt: { 1: 3, 2: 3, 3: 3 }, shareFrac: 0.3 },
    'G2-371': { levels: [2, 1, 3], shareFrac: 0.3 },
    'G3-396': { levels: [2, 1, 3], maxCopiesAt: { 1: 3, 2: 3, 3: 3 }, shareFrac: 0.3 },
  },
  include: () => true,
};
