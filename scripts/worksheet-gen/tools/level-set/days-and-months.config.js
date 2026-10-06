/**
 * Level Set config — Days and Months (K-321 + K-337 / G1-319 / G1-320 / G1-321 / G1-322), 2026-10-06.
 * PDF + interactive + key. Themeless: a copy = a seed whose page asks something NEW (spec.levelSetWords — the days
 * or months missing / given / asked). Operator ruling 2026-10-06: "only copies that differ" — a level whose copies
 * could only reshuffle the same names gets one copy (maxCopiesAt).
 */
'use strict';
module.exports = {
  prefix: 'dam',
  themeless: true,
  titleMax: 100,
  maxCopies: 5,
  maxShared: 99,
  shareFrac: 0.5,
  seeds: 60,
  allowFewer: true,
  note: 'Level Set 2026-10-06: Days and Months (K-321 + 5 variations). Easier = more given (numbers printed, two gaps, the week or the year printed as a strip, four short forms); harder = one middle day or month given, four gaps, missing middle names, the twelve month short forms. Visible to teachers, never indexed; PDF + interactive screen version + answer key.',
  faces: {
    'K-321': { levels: [2, 1, 3], maxCopiesAt: { 2: 1 } },
    'K-337': { levels: [2, 1, 3] },
    'G1-319': { levels: [2, 1, 3], maxCopiesAt: { 2: 1 }, shareFrac: 0.75 },
    'G1-320': { levels: [2, 1, 3], maxCopiesAt: { 2: 1 } },
    'G1-321': { levels: [2, 1, 3] },
    'G1-322': { levels: [2, 1, 3], maxCopiesAt: { 2: 1, 3: 2 } },
  },
  include: () => true,
};
