/**
 * Draw the Other Half (G1-484, Symmetry & Grid Copy maker 2026-11-02) — how-to-draw lessons (data/htd, data/htdv: the
 * library's own line art, reduced to clean ink) that face the front, so their LEFT half mirrored is the whole picture.
 * Chosen by measurement (the ink overlaps its own mirror image across x = 300 by 0.73 – 0.98) and then by eye on a
 * contact sheet of each left half with its mirror (every one a natural picture). The page shows the left half on a grid;
 * the answer key adds that half mirrored, so a picture whose own right half differs a little never makes a wrong key.
 * `axis` = the mirror line in the lesson's own coordinates; `level` = how much there is to draw:
 *   1 — few, large parts (a 6 × 6 grid) · 2 — a face and a body (8 × 8) · 3 — many parts and small details (10 × 10)
 */
'use strict';

const DRAW_HALF = [
  { id: 'htd/toys-bw-ufo', axis: 300, level: 1 },
  { id: 'htdv/mushroom', axis: 300, level: 1 },
  { id: 'htdv/snowman', axis: 300, level: 1 },
  { id: 'htdv/chick', axis: 300, level: 1 },
  { id: 'htd/space-bw-rocket', axis: 300, level: 1 },
  { id: 'htdv/hippo', axis: 300, level: 1 },
  { id: 'htd/easter-bw-butterfly', axis: 300, level: 1 },
  { id: 'htdv/panda', axis: 300, level: 2 },
  { id: 'htdv/koala', axis: 300, level: 2 },
  { id: 'htdv/teddy-bear', axis: 300, level: 2 },
  { id: 'htdv/bear', axis: 300, level: 2 },
  { id: 'htdv/goat', axis: 300, level: 2 },
  { id: 'htdv/dog', axis: 300, level: 2 },
  { id: 'htdv/tiger', axis: 300, level: 2 },
  { id: 'htdv/raccoon', axis: 300, level: 2 },
  { id: 'htd/nature-bw-ladybug', axis: 300, level: 2 },
  { id: 'htd/animals-bw-5-crab', axis: 300, level: 3 },
  { id: 'htd/animals-bw-5-panda', axis: 300, level: 3 },
  { id: 'htdv/bull', axis: 300, level: 3 },
  { id: 'htdv/yak', axis: 300, level: 3 },
  { id: 'htd/vehicles-bw-2-rocket', axis: 300, level: 3 },
  { id: 'htd/travel-and-holiday-bw-tent', axis: 300, level: 3 },
];

module.exports = { DRAW_HALF };
