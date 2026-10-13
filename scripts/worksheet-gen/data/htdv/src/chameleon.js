'use strict';
// a chameleon on a branch: an oval body with a circle head in front of it and a circle curl for the tail behind it
const { circle, ellipse, rrect } = require('../../../lib/htd-vector.js');
module.exports = {
  key: 'chameleon',
  parts: [
    { id: 'branch', step: 2, d: rrect(100, 384, 420, 28, 14) },
    { id: 'leg-1', step: 2, d: rrect(232, 320, 34, 76, 14) },
    { id: 'leg-2', step: 2, d: rrect(342, 320, 34, 76, 14) },
    { id: 'curl', step: 1, guide: true, shape: 'circle', d: circle(178, 334, 46) },
    { id: 'curl-in', step: 3, kind: 'line', d: 'M178 334C190 334 192 320 180 316C164 312 156 332 166 346C180 364 208 356 212 332' },
    { id: 'body', step: 1, guide: true, major: true, shape: 'oval', d: ellipse(290, 262, 132, 84) },
    { id: 'crest', step: 2, d: 'M374 186C390 140 432 128 466 152C452 160 442 170 436 182Z' },
    { id: 'head', step: 1, guide: true, major: true, shape: 'circle', d: circle(432, 236, 68) },
    { id: 'eye', step: 3, d: circle(440, 220, 26) },
    { id: 'pupil', step: 3, kind: 'solid', d: circle(448, 220, 10) },
    { id: 'shine', step: 3, kind: 'shine', d: circle(451, 216, 3.5) },
    { id: 'mouth', step: 3, kind: 'line', w: 3.6, d: 'M398 270C426 284 462 280 490 260' },
    { id: 'ridge', step: 4, kind: 'line', w: 3.2, d: 'M190 196L204 182L218 194L232 180L246 192L260 178L274 190L288 176L302 188L316 176L330 188' },
    { id: 'stripes', step: 4, kind: 'line', w: 3.4, d: 'M228 214C218 240 218 280 230 312M276 204C266 236 266 284 278 330M324 202C314 236 314 284 326 330' },
    { id: 'cheek', step: 4, kind: 'line', w: 3, d: circle(470, 262, 8) },
  ],
};
