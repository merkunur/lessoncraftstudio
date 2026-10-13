'use strict';
// a sitting puppy, front view: a circle head on an oval body; floppy ears hang behind the head, a muzzle sits inside it
const { circle, ellipse } = require('../../../lib/htd-vector.js');
module.exports = {
  key: 'dog',
  parts: [
    { id: 'tail', step: 2, d: 'M392 420C430 418 462 392 470 352C474 334 462 326 452 336C444 362 424 386 392 392Z' },
    { id: 'paw-l', step: 2, d: ellipse(258, 474, 32, 24) },
    { id: 'paw-r', step: 2, d: ellipse(342, 474, 32, 24) },
    { id: 'body', step: 1, guide: true, major: true, shape: 'oval', d: ellipse(300, 378, 108, 104) },
    { id: 'ear-l', step: 2, d: ellipse(206, 218, 40, 78, 22) },
    { id: 'ear-r', step: 2, d: ellipse(394, 218, 40, 78, -22) },
    { id: 'head', step: 1, guide: true, major: true, shape: 'circle', d: circle(300, 200, 100) },
    { id: 'muzzle', step: 3, d: ellipse(300, 248, 58, 42) },
    { id: 'nose', step: 3, kind: 'solid', d: ellipse(300, 226, 22, 15) },
    { id: 'nose-shine', step: 3, kind: 'shine', d: ellipse(293, 221, 6, 3.5) },
    { id: 'mouth', step: 3, kind: 'line', w: 3.6, d: 'M300 241L300 258C292 270 276 270 270 260M300 258C308 270 324 270 330 260' },
    { id: 'eye-l', step: 3, kind: 'solid', d: ellipse(258, 180, 15, 19) },
    { id: 'eye-r', step: 3, kind: 'solid', d: ellipse(342, 180, 15, 19) },
    { id: 'shine-l', step: 3, kind: 'shine', d: circle(263, 172, 5.5) },
    { id: 'shine-r', step: 3, kind: 'shine', d: circle(347, 172, 5.5) },
    { id: 'leg-l', step: 3, kind: 'line', d: 'M270 404C266 432 266 456 268 474' },
    { id: 'leg-r', step: 3, kind: 'line', d: 'M330 404C334 432 334 456 332 474' },
    { id: 'tongue', step: 4, d: 'M288 266C288 284 312 284 312 266Z' },
    { id: 'tongue-line', step: 4, kind: 'line', w: 2.6, d: 'M300 268L300 278' },
    { id: 'brow-l', step: 4, kind: 'line', w: 3.2, d: 'M244 152C252 146 264 146 272 151' },
    { id: 'brow-r', step: 4, kind: 'line', w: 3.2, d: 'M328 151C336 146 348 146 356 152' },
    { id: 'spot', step: 4, kind: 'line', w: 3.4, d: 'M318 330C346 320 372 336 370 362C368 384 342 390 326 378C312 368 300 342 318 330Z' },
    { id: 'toes', step: 4, kind: 'line', w: 3, d: 'M248 494L248 482M268 494L268 482M332 494L332 482M352 494L352 482' },
  ],
};
