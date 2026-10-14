/** Level Set config — Grid Coordinates (G2-279 + G2-302 6x6 / G2-303 10x10 / G2-308 Write the Codes), 2026-10-14.
 *  PDF ONLY (operator: only PDF — no screen version, no answer key). Themeless: a copy = a seed = a new PICTURE; no two
 *  copies of a level (the published page included at level 2) show the same picture (levelSetWords = the picture key,
 *  maxShared 0). The levels live in G2-279 levelsFor(id): level 1 easier, level 2 the published page, level 3 harder. */
'use strict';
module.exports = {
  prefix: 'grc',
  themeless: true,
  interactive: false,
  titleMax: 100,
  maxCopies: 5,
  maxShared: 0,
  seeds: 80,
  allowFewer: true,
  noUnits: true,
  note: 'Level Set 2026-10-14: Grid Coordinates. Level 1 easier (a 6x6 grid; on the 6x6 and 10x10 pages a smaller picture with the codes listed in reading order; on Write the Codes a small picture with fewer codes to write), level 2 the published page with a new picture, level 3 harder (the 10x10 grid; more colour groups on the 6x6 page; a bigger picture on the 10x10 page; an 8x8 grid on Write the Codes). Every copy of a level is a different picture. Visible to teachers, never indexed; PDF only.',
  faces: {
    'G2-279': { levels: [2, 1, 3] },
    'G2-302': { levels: [2, 1, 3] },
    'G2-303': { levels: [2, 1, 3] },
    'G2-308': { levels: [2, 1, 3] },
  },
  include: () => true,
};
