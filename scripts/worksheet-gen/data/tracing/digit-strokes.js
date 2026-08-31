/**
 * Hand-authored digit CENTERLINE stroke paths for number tracing (K-237).
 * Coordinate box: 100 wide × 140 tall (baseline at y=140 area bottom ≈ 132,
 * top ≈ 10). Each digit = ordered stroke array; each stroke = { d, angle }
 * where `angle` is the start-direction (deg, SVG screen coords) for the
 * arrowhead. The renderer derives the start point from the path's leading M.
 *
 * Two form variants (a live platform gap this dataset closes for printables):
 *  - plain:       en — bare downstroke 1, uncrossed 7
 *  - continental: de fr es it nl pt sv da no fi — up-flag 1, crossed 7
 * All other digits are shared.
 *
 * Stroke ORDER follows common school teaching (top-first, left-first).
 */
'use strict';

const SHARED = {
  0: [{ d: 'M 50 12 C 20 12 16 45 16 71 C 16 97 20 130 50 130 C 80 130 84 97 84 71 C 84 45 80 12 50 12', angle: 195 }],
  2: [{ d: 'M 20 42 C 20 8 80 8 80 42 C 80 68 42 86 20 130 L 84 130', angle: -72 }],
  3: [{ d: 'M 22 30 C 38 6 84 12 79 42 C 76 61 56 68 46 70 C 56 72 84 80 80 108 C 76 136 30 138 18 112', angle: -38 }],
  4: [
    { d: 'M 62 14 L 20 86 L 88 86', angle: 120 },
    { d: 'M 70 10 L 70 130', angle: 90 },
  ],
  5: [
    { d: 'M 32 14 L 27 62 C 42 52 84 56 81 94 C 78 130 30 138 18 110', angle: 95 },
    { d: 'M 32 14 L 80 14', angle: 0 },
  ],
  6: [{ d: 'M 68 14 C 42 30 22 60 21 94 C 20 124 44 134 58 130 C 82 123 84 88 60 84 C 45 81 29 90 23 101', angle: 150 }],
  8: [{ d: 'M 50 66 C 18 58 18 12 50 12 C 82 12 82 58 50 66 C 16 76 16 131 50 131 C 84 131 84 76 50 66', angle: 200 }],
  9: [
    { d: 'M 79 41 C 79 10 24 8 22 42 C 20 74 77 76 79 41', angle: 265 },
    { d: 'M 79 41 L 78 130', angle: 90 },
  ],
};

const FORMS = {
  plain: {
    ...SHARED,
    1: [{ d: 'M 52 12 L 52 130', angle: 90 }],
    7: [{ d: 'M 20 14 L 82 14 L 46 130', angle: 0 }],
  },
  continental: {
    ...SHARED,
    1: [{ d: 'M 28 46 L 55 12 L 55 130', angle: -52 }],
    7: [
      { d: 'M 20 14 L 82 14 L 46 130', angle: 0 },
      { d: 'M 34 72 L 72 72', angle: 0 },
    ],
  },
};

/** Which digit form each locale's school convention expects. */
const FORM_BY_LOCALE = {
  en: 'plain',
  // es = PLAIN per the native panel ruling (2026-09-01): Spanish school
  // caligraphy models teach the simple 1 and the UNCROSSED 7 (the crossed 7
  // is adult handwriting, not the school model — both Spain and LatAm).
  es: 'plain',
  de: 'continental', fr: 'continental', it: 'continental',
  nl: 'continental', pt: 'continental', sv: 'continental', da: 'continental',
  no: 'continental', fi: 'continental',
};

const BOX = { w: 100, h: 140 };

module.exports = { FORMS, FORM_BY_LOCALE, BOX };
