'use strict';
// a sitting tiger cub: a circle head on an oval body; round ears behind the head, stripes inside the shapes
const { circle, ellipse } = require('../../../lib/htd-vector.js');
module.exports = {
  key: 'tiger',
  parts: [
    { id: 'tail', step: 2, d: 'M394 430C440 432 476 404 482 360C486 334 470 326 458 338C452 368 430 396 394 400Z' },
    { id: 'paw-l', step: 2, d: ellipse(258, 474, 32, 24) },
    { id: 'paw-r', step: 2, d: ellipse(342, 474, 32, 24) },
    { id: 'body', step: 1, guide: true, major: true, shape: 'oval', d: ellipse(300, 378, 108, 104) },
    { id: 'ear-l', step: 2, d: circle(220, 120, 34) },
    { id: 'ear-r', step: 2, d: circle(380, 120, 34) },
    { id: 'ear-l-in', step: 3, kind: 'solid', d: circle(222, 124, 15) },
    { id: 'ear-r-in', step: 3, kind: 'solid', d: circle(378, 124, 15) },
    { id: 'head', step: 1, guide: true, major: true, shape: 'circle', d: circle(300, 205, 104) },
    { id: 'muzzle', step: 3, kind: 'line', w: 3.6, d: 'M300 236C286 226 256 228 252 252C250 276 280 282 300 268C320 282 350 276 348 252C344 228 314 226 300 236' },
    { id: 'nose', step: 3, kind: 'solid', d: 'M284 232C284 226 316 226 316 232C316 240 306 248 300 248C294 248 284 240 284 232Z' },
    { id: 'eye-l', step: 3, kind: 'solid', d: ellipse(256, 192, 14, 17) },
    { id: 'eye-r', step: 3, kind: 'solid', d: ellipse(344, 192, 14, 17) },
    { id: 'shine-l', step: 3, kind: 'shine', d: circle(260, 185, 5) },
    { id: 'shine-r', step: 3, kind: 'shine', d: circle(348, 185, 5) },
    { id: 'head-stripes', step: 4, kind: 'solid', d: 'M286 104L300 134L314 104Z' + 'M262 112L276 140L268 108Z' + 'M338 112L324 140L332 108Z' + 'M198 190L232 198L198 206Z' + 'M402 190L368 198L402 206Z' + 'M202 228L230 230L206 240Z' + 'M398 228L370 230L394 240Z' },
    { id: 'body-stripes', step: 4, kind: 'solid', d: 'M194 360L226 368L196 378Z' + 'M406 360L374 368L404 378Z' + 'M200 408L228 412L204 420Z' + 'M400 408L372 412L396 420Z' },
    { id: 'leg-l', step: 4, kind: 'line', d: 'M272 404C268 432 268 456 270 474' },
    { id: 'leg-r', step: 4, kind: 'line', d: 'M328 404C332 432 332 456 330 474' },
  ],
};
