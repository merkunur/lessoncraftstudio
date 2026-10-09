/** Level Set config — Measurement, the THEMELESS faces (G3-345 Hot or Cold?, G3-346 Cube Towers, G2-260 Reading
 *  Measuring Jugs, G2-263 Measuring Jugs to 2000 ml), 2026-10-09. PDF + interactive + key. A copy = a seed; a copy
 *  shares at most half of the numbers it asks with another copy of its level. Level 2 copy 1 is the published page; the
 *  June level-1 and level-3 pages of G3-345 / G3-346 are copy 1 of those levels (liveAt). */
'use strict';
module.exports = {
  prefix: 'msr',
  themeless: true,
  titleMax: 100,
  maxCopies: 5,
  maxShared: 99,
  shareFrac: 0.5,
  seeds: 60,
  allowFewer: true,
  note: 'Level Set 2026-10-09: Measurement (thermometers, cube towers, measuring jugs). Level 1 a tens scale / small walls / every jug mark labelled, level 2 the published page, level 3 per-degree marks / big walls / finer jug marks. Every page redesigned so the drawings fill their cards. Visible to teachers, never indexed; PDF + interactive screen version + answer key.',
  faces: {
    'G3-345': { levels: [2, 1, 3], liveAt: [1, 3], shareFrac: 0.67 },
    'G3-346': { levels: [2, 1, 3], liveAt: [1, 3], shareFrac: 0.75 },
    'G2-260': { levels: [2, 1, 3], shareFrac: 0.67 },
    'G2-263': { levels: [2, 1, 3], shareFrac: 0.67 },
  },
  include: () => true,
};
