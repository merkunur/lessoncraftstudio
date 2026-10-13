'use strict';
// a sitting panda, front view: a circle head on an oval body; black ears behind the head, black arms and patches inside the shapes
const { circle, ellipse } = require('../../../lib/htd-vector.js');
module.exports = {
  key: 'panda',
  parts: [
    { id: 'foot-l', step: 2, kind: 'solid', d: ellipse(238, 470, 42, 32, -10) },
    { id: 'foot-r', step: 2, kind: 'solid', d: ellipse(362, 470, 42, 32, 10) },
    { id: 'body', step: 1, guide: true, major: true, shape: 'oval', d: ellipse(300, 372, 116, 110) },
    { id: 'ear-l', step: 2, kind: 'solid', d: circle(212, 120, 38) },
    { id: 'ear-r', step: 2, kind: 'solid', d: circle(388, 120, 38) },
    { id: 'head', step: 1, guide: true, major: true, shape: 'circle', d: circle(300, 205, 106) },
    { id: 'patch-l', step: 3, kind: 'solid', d: ellipse(254, 196, 28, 36, 30) },
    { id: 'patch-r', step: 3, kind: 'solid', d: ellipse(346, 196, 28, 36, -30) },
    { id: 'eye-l', step: 3, kind: 'shine', d: circle(258, 190, 12) },
    { id: 'eye-r', step: 3, kind: 'shine', d: circle(342, 190, 12) },
    { id: 'pupil-l', step: 3, kind: 'solid', d: circle(260, 192, 7) },
    { id: 'pupil-r', step: 3, kind: 'solid', d: circle(340, 192, 7) },
    { id: 'nose', step: 3, kind: 'solid', d: ellipse(300, 238, 17, 11) },
    { id: 'mouth', step: 3, kind: 'line', w: 3.6, d: 'M300 248L300 258C292 268 282 266 276 260M300 258C308 268 318 266 324 260' },
    { id: 'arm-l', step: 4, kind: 'solid', d: 'M204 318C228 316 250 336 258 366C264 390 256 410 238 412C222 414 210 396 204 372C198 350 196 330 204 318Z' },
    { id: 'arm-r', step: 4, kind: 'solid', d: 'M396 318C372 316 350 336 342 366C336 390 344 410 362 412C378 414 390 396 396 372C402 350 404 330 396 318Z' },
    { id: 'belly', step: 4, kind: 'line', w: 3.4, d: 'M270 440C284 452 316 452 330 440' },
  ],
};
