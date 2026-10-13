/** Level Set config — Number Bonds (K-243 + K-273/274/275/276/277, new K-414..417), 2026-10-13. PDF + interactive + key.
 *  Themeless: a copy = a seed; a copy shares at most half of its bonds (and blank circles) with another copy of its level.
 *  The levels live in K-243 bondLevels(face): level 1 easier (counting dots, fewer cards, small missing parts), level 2
 *  the published page, level 3 harder (every way to split the whole incl. 0 — two plans, in order / mixed —; the whole
 *  missing too; teen answers; crossing ten). K-414..417 (bonds of 6, 7, 8, 9) are new faces (face.noPublished). */
'use strict';
const OLD = ['K-273', 'K-274', 'K-275', 'K-276', 'K-277'];
const NEW = ['K-414', 'K-415', 'K-416', 'K-417'];
module.exports = {
  prefix: 'nb',
  themeless: true,
  titleMax: 100,
  maxCopies: 5,
  maxShared: 99,
  shareFrac: 0.5,
  seeds: 60,
  allowFewer: true,
  note: 'Level Set 2026-10-13: Number Bonds. Level 1 easier (counting dots, fewer bonds, small missing parts), level 2 the published page, level 3 harder (every way to split the number including 0, the whole missing as well, teen answers, wholes past ten). New variations for the bonds of 6, 7, 8 and 9. Visible to teachers, never indexed; PDF + interactive screen version + answer key.',
  faces: {
    'K-243': { levels: [2, 1, 3], maxCopiesAt: { 1: 3, 3: 2 } },
    'K-273': { levels: [2, 1, 3], maxCopiesAt: { 1: 2, 3: 2 } },
    ...Object.fromEntries(OLD.slice(1).map((id) => [id, { levels: [2, 1, 3], maxCopiesAt: id === 'K-277' ? { 1: 3, 3: 2 } : {} }])),
    ...Object.fromEntries(NEW.map((id) => [id, { levels: [2, 1, 3], maxCopiesAt: { 1: 2, 2: 3, 3: 2 }, noPublished: true }])),
  },
  include: () => true,
};
