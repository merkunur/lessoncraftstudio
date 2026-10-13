'use strict';
// a little goat, front view: a long oval head on an oval body; curved horns and side ears behind the head, a beard below
const { circle, ellipse, rrect } = require('../../../lib/htd-vector.js');
module.exports = {
  key: 'goat',
  parts: [
    { id: 'leg-l', step: 2, d: rrect(234, 420, 44, 96, 18) },
    { id: 'leg-r', step: 2, d: rrect(322, 420, 44, 96, 18) },
    { id: 'hoof', step: 4, kind: 'solid', d: rrect(236, 498, 40, 16, 7) + rrect(324, 498, 40, 16, 7) },
    { id: 'tail', step: 3, d: 'M394 356C414 340 434 336 446 344C438 360 418 368 396 370Z' },
    { id: 'body', step: 1, guide: true, major: true, shape: 'oval', d: ellipse(300, 370, 106, 98) },
    { id: 'horn-l', step: 2, d: 'M272 112C258 80 230 66 204 78C226 84 244 100 254 122Z' },
    { id: 'horn-r', step: 2, d: 'M328 112C342 80 370 66 396 78C374 84 356 100 346 122Z' },
    { id: 'ear-l', step: 2, d: ellipse(212, 168, 46, 18, 15) },
    { id: 'ear-r', step: 2, d: ellipse(388, 168, 46, 18, -15) },
    { id: 'head', step: 1, guide: true, major: true, shape: 'oval', d: ellipse(300, 190, 70, 96) },
    { id: 'beard', step: 3, kind: 'line', d: 'M290 286C292 300 296 308 300 314C304 308 308 300 310 286' },
    { id: 'nostril-l', step: 3, kind: 'solid', d: ellipse(286, 250, 5, 8, -15) },
    { id: 'nostril-r', step: 3, kind: 'solid', d: ellipse(314, 250, 5, 8, 15) },
    { id: 'mouth', step: 3, kind: 'line', w: 3.4, d: 'M286 270C294 276 306 276 314 270' },
    { id: 'eye-l', step: 3, kind: 'solid', d: ellipse(272, 184, 11, 14) },
    { id: 'eye-r', step: 3, kind: 'solid', d: ellipse(328, 184, 11, 14) },
    { id: 'shine-l', step: 3, kind: 'shine', d: circle(275, 178, 4) },
    { id: 'shine-r', step: 3, kind: 'shine', d: circle(331, 178, 4) },
    { id: 'tuft', step: 4, kind: 'line', w: 3.4, d: 'M284 104C288 90 300 88 300 100C302 88 314 90 316 104' },
    { id: 'leg-lines', step: 4, kind: 'line', d: 'M266 400C262 430 262 450 264 466M334 400C338 430 338 450 336 466' },
  ],
};
