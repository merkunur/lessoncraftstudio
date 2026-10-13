'use strict';
// a sitting raccoon: a circle head on an oval body; a striped tail behind the body, a black mask inside the head
const { circle, ellipse, rpoly } = require('../../../lib/htd-vector.js');
module.exports = {
  key: 'raccoon',
  parts: [
    { id: 'tail', step: 2, d: 'M370 452C420 470 486 442 500 380C510 330 480 296 452 310C430 322 438 352 450 372C462 396 428 420 380 410Z' },
    { id: 'tail-rings', step: 3, kind: 'solid', d: 'M462 318C484 316 498 336 500 354L486 360C480 342 468 330 452 330Z' + 'M478 410C468 428 450 440 430 446L424 432C442 426 456 416 464 400Z' },
    { id: 'tail-tip', step: 3, kind: 'solid', d: 'M500 370C498 384 494 396 488 404L474 398C482 386 486 372 486 362Z' },
    { id: 'paw-l', step: 2, d: ellipse(258, 474, 32, 24) },
    { id: 'paw-r', step: 2, d: ellipse(342, 474, 32, 24) },
    { id: 'body', step: 1, guide: true, major: true, shape: 'oval', d: ellipse(300, 380, 104, 102) },
    { id: 'ear-l', step: 2, d: rpoly([[202, 160], [210, 82], [272, 118]], 14) },
    { id: 'ear-r', step: 2, d: rpoly([[398, 160], [390, 82], [328, 118]], 14) },
    { id: 'ear-l-in', step: 3, kind: 'solid', d: rpoly([[220, 140], [222, 106], [250, 122]], 6) },
    { id: 'ear-r-in', step: 3, kind: 'solid', d: rpoly([[380, 140], [378, 106], [350, 122]], 6) },
    { id: 'head', step: 1, guide: true, major: true, shape: 'circle', d: circle(300, 210, 100) },
    { id: 'mask', step: 3, kind: 'solid', d: 'M214 196C230 168 270 170 300 192C330 170 370 168 386 196C392 218 372 236 346 234C326 232 312 222 300 214C288 222 274 232 254 234C228 236 208 218 214 196Z' },
    { id: 'eye-l', step: 3, kind: 'shine', d: circle(260, 204, 13) },
    { id: 'eye-r', step: 3, kind: 'shine', d: circle(340, 204, 13) },
    { id: 'pupil-l', step: 3, kind: 'solid', d: circle(262, 206, 7.5) },
    { id: 'pupil-r', step: 3, kind: 'solid', d: circle(338, 206, 7.5) },
    { id: 'nose', step: 3, kind: 'solid', d: ellipse(300, 246, 15, 10) },
    { id: 'mouth', step: 4, kind: 'line', w: 3.6, d: 'M300 256L300 266C292 274 282 272 278 266M300 266C308 274 318 272 322 266' },
    { id: 'brow', step: 4, kind: 'line', w: 3.2, d: 'M300 150L300 176' },
    { id: 'leg-l', step: 4, kind: 'line', d: 'M272 404C268 432 268 456 270 474' },
    { id: 'leg-r', step: 4, kind: 'line', d: 'M328 404C332 432 332 456 330 474' },
  ],
};
