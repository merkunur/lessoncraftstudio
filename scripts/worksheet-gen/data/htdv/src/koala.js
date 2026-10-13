'use strict';
// a sitting koala: a circle head on an oval body; big fluffy ears behind the head
const { circle, ellipse, rrect } = require('../../../lib/htd-vector.js');
module.exports = {
  key: 'koala',
  parts: [
    { id: 'foot-l', step: 2, d: ellipse(254, 474, 34, 24) },
    { id: 'foot-r', step: 2, d: ellipse(346, 474, 34, 24) },
    { id: 'body', step: 1, guide: true, major: true, shape: 'oval', d: ellipse(300, 380, 98, 104) },
    { id: 'ear-l', step: 2, d: circle(196, 138, 52) },
    { id: 'ear-r', step: 2, d: circle(404, 138, 52) },
    { id: 'ear-l-in', step: 3, kind: 'line', w: 3.4, d: 'M176 168C168 146 172 120 190 108M196 162C190 146 192 128 204 118' },
    { id: 'ear-r-in', step: 3, kind: 'line', w: 3.4, d: 'M424 168C432 146 428 120 410 108M404 162C410 146 408 128 396 118' },
    { id: 'head', step: 1, guide: true, major: true, shape: 'circle', d: circle(300, 200, 100) },
    { id: 'nose', step: 3, kind: 'solid', d: 'M300 196C320 196 326 214 324 232C322 252 312 260 300 260C288 260 278 252 276 232C274 214 280 196 300 196Z' },
    { id: 'nose-shine', step: 3, kind: 'shine', d: ellipse(292, 212, 4, 8) },
    { id: 'eye-l', step: 3, kind: 'solid', d: circle(250, 196, 12) },
    { id: 'eye-r', step: 3, kind: 'solid', d: circle(350, 196, 12) },
    { id: 'shine-l', step: 3, kind: 'shine', d: circle(254, 192, 4) },
    { id: 'shine-r', step: 3, kind: 'shine', d: circle(354, 192, 4) },
    { id: 'arms', step: 4, d: ellipse(238, 370, 20, 46, -25) + ellipse(362, 370, 20, 46, 25) },
    { id: 'toes', step: 4, kind: 'line', w: 3, d: 'M236 488L236 476M254 490L254 478M346 490L346 478M364 488L364 476' },
    { id: 'mouth', step: 4, kind: 'line', w: 3.4, d: 'M286 274C294 280 306 280 314 274' },
    { id: 'belly', step: 4, kind: 'line', w: 3.4, d: ellipse(300, 352, 46, 40) },
  ],
};
