'use strict';
// a kangaroo with a joey in its pouch: an oval head on a tall oval body; snout, ears, tail and feet behind them
const { circle, ellipse } = require('../../../lib/htd-vector.js');
module.exports = {
  key: 'kangaroo',
  parts: [
    { id: 'tail', step: 2, d: 'M230 420C190 452 140 482 90 492C84 478 96 466 112 460C152 446 190 420 220 390Z' },
    { id: 'foot', step: 2, d: 'M250 470C270 500 340 506 380 498C388 486 380 476 366 474C334 468 300 462 276 446Z' },
    { id: 'body', step: 1, guide: true, major: true, shape: 'oval', d: ellipse(286, 336, 92, 136, -6) },
    { id: 'ear-l', step: 2, d: ellipse(286, 92, 18, 46, -18) },
    { id: 'ear-r', step: 2, d: ellipse(334, 88, 18, 46, 12) },
    { id: 'ear-in', step: 3, kind: 'line', w: 3, d: 'M282 70C280 86 284 104 290 116M334 66C334 82 334 100 330 114' },
    { id: 'snout', step: 2, d: ellipse(386, 182, 46, 30, 10) },
    { id: 'head', step: 1, guide: true, major: true, shape: 'oval', d: ellipse(318, 168, 66, 58) },
    { id: 'nose', step: 3, kind: 'solid', d: ellipse(424, 178, 11, 9) },
    { id: 'mouth', step: 3, kind: 'line', w: 3.4, d: 'M424 194C414 206 398 208 388 202' },
    { id: 'eye', step: 3, kind: 'solid', d: ellipse(338, 156, 11, 14) },
    { id: 'shine', step: 3, kind: 'shine', d: circle(341, 150, 4) },
    { id: 'arm', step: 3, d: 'M326 236C348 242 360 262 358 288C357 300 344 304 338 294C336 274 330 258 318 248Z' },
    { id: 'pouch', step: 3, kind: 'line', d: 'M226 366C250 402 318 404 340 362' },
    { id: 'joey', step: 4, d: circle(286, 352, 24) },
    { id: 'joey-ears', step: 4, kind: 'line', w: 3.2, d: 'M276 330C268 316 268 302 274 300C280 302 282 316 280 330M292 330C294 316 298 302 304 302C308 306 304 320 296 332' },
    { id: 'joey-eyes', step: 4, kind: 'solid', d: circle(278, 350, 4.5) + circle(296, 350, 4.5) },
    { id: 'joey-nose', step: 4, kind: 'solid', d: ellipse(287, 360, 4, 3) },
  ],
};
