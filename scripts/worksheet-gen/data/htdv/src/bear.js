'use strict';
// a sitting bear cub, front view: a circle head on an oval body; round ears behind the head
const { circle, ellipse } = require('../../../lib/htd-vector.js');
module.exports = {
  key: 'bear',
  parts: [
    { id: 'foot-l', step: 2, d: ellipse(240, 470, 40, 30, -10) },
    { id: 'foot-r', step: 2, d: ellipse(360, 470, 40, 30, 10) },
    { id: 'pad-l', step: 4, kind: 'solid', d: ellipse(234, 480, 14, 10, -10) },
    { id: 'pad-r', step: 4, kind: 'solid', d: ellipse(366, 480, 14, 10, 10) },
    { id: 'body', step: 1, guide: true, major: true, shape: 'oval', d: ellipse(300, 372, 118, 112) },
    { id: 'ear-l', step: 2, d: circle(214, 118, 38) },
    { id: 'ear-r', step: 2, d: circle(386, 118, 38) },
    { id: 'ear-l-in', step: 3, kind: 'line', w: 3.4, d: circle(216, 122, 19) },
    { id: 'ear-r-in', step: 3, kind: 'line', w: 3.4, d: circle(384, 122, 19) },
    { id: 'head', step: 1, guide: true, major: true, shape: 'circle', d: circle(300, 205, 108) },
    { id: 'muzzle', step: 3, d: ellipse(300, 248, 52, 40) },
    { id: 'nose', step: 3, kind: 'solid', d: ellipse(300, 230, 21, 14) },
    { id: 'nose-shine', step: 3, kind: 'shine', d: ellipse(294, 225, 6, 3.5) },
    { id: 'mouth', step: 3, kind: 'line', w: 3.6, d: 'M300 244L300 258C292 268 280 268 274 262M300 258C308 268 320 268 326 262' },
    { id: 'eye-l', step: 3, kind: 'solid', d: circle(256, 190, 15) },
    { id: 'eye-r', step: 3, kind: 'solid', d: circle(344, 190, 15) },
    { id: 'shine-l', step: 3, kind: 'shine', d: circle(261, 184, 5.5) },
    { id: 'shine-r', step: 3, kind: 'shine', d: circle(349, 184, 5.5) },
    { id: 'belly', step: 4, kind: 'line', w: 3.6, d: ellipse(300, 392, 62, 64) },
    { id: 'arm-l', step: 4, kind: 'line', d: 'M210 318C226 350 236 380 240 410' },
    { id: 'arm-r', step: 4, kind: 'line', d: 'M390 318C374 350 364 380 360 410' },
    { id: 'cheek-l', step: 4, kind: 'line', w: 3, d: 'M218 230L230 226M220 242L232 240' },
    { id: 'cheek-r', step: 4, kind: 'line', w: 3, d: 'M382 230L370 226M380 242L368 240' },
  ],
};
