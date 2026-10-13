'use strict';
// a sitting cat, front view: a circle head on an oval body (the two dotted shapes)
const { circle, ellipse, rpoly } = require('../../../lib/htd-vector.js');
module.exports = {
  key: 'cat',
  parts: [
    // step 2: the tail curls up behind the body; the paws peek out under it
    { id: 'tail', step: 2, d: 'M378 430C430 440 470 410 470 360C470 318 448 290 425 300C412 306 414 322 426 326C440 331 446 350 440 372C432 400 405 410 380 400Z' },
    { id: 'paw-l', step: 2, d: circle(262, 470, 28).replace(/Z$/, 'Z') },
    { id: 'paw-r', step: 2, d: circle(338, 470, 28) },
    { id: 'body', step: 1, guide: true, major: true, shape: 'oval', d: ellipse(300, 375, 112, 108) },
    // step 2: the ears sit behind the head
    { id: 'ear-l', step: 2, d: rpoly([[196, 175], [206, 72], [282, 118]], 10) },
    { id: 'ear-r', step: 2, d: rpoly([[404, 175], [394, 72], [318, 118]], 10) },
    { id: 'ear-l-in', step: 4, kind: 'line', w: 3.2, d: 'M214 142L219 100L253 122' },
    { id: 'ear-r-in', step: 4, kind: 'line', w: 3.2, d: 'M386 142L381 100L347 122' },
    { id: 'head', step: 1, guide: true, major: true, shape: 'circle', d: circle(300, 215, 102) },
    // step 3: the legs and the face
    { id: 'leg-l', step: 3, kind: 'line', d: 'M272 400C268 430 268 452 270 470' },
    { id: 'leg-r', step: 3, kind: 'line', d: 'M328 400C332 430 332 452 330 470' },
    { id: 'eye-l', step: 3, kind: 'solid', d: ellipse(258, 205, 17, 22) },
    { id: 'eye-r', step: 3, kind: 'solid', d: ellipse(342, 205, 17, 22) },
    { id: 'shine-l', step: 3, kind: 'shine', d: circle(264, 196, 6.5) },
    { id: 'shine-r', step: 3, kind: 'shine', d: circle(348, 196, 6.5) },
    { id: 'nose', step: 3, kind: 'solid', d: rpoly([[288, 240], [312, 240], [300, 254]], 4) },
    { id: 'mouth', step: 3, kind: 'line', w: 3.6, d: 'M300 254C300 266 292 272 282 268M300 254C300 266 308 272 318 268' },
    // step 4: whiskers, toes, the tail tip
    { id: 'wh-l1', step: 4, kind: 'line', w: 3, d: 'M232 240L178 230' },
    { id: 'wh-l2', step: 4, kind: 'line', w: 3, d: 'M232 252L180 260' },
    { id: 'wh-r1', step: 4, kind: 'line', w: 3, d: 'M368 240L422 230' },
    { id: 'wh-r2', step: 4, kind: 'line', w: 3, d: 'M368 252L420 260' },
    { id: 'toe-l', step: 4, kind: 'line', w: 3, d: 'M254 486L254 476M270 486L270 476' },
    { id: 'toe-r', step: 4, kind: 'line', w: 3, d: 'M330 486L330 476M346 486L346 476' },
    { id: 'tail-tip', step: 4, kind: 'line', w: 3.2, d: 'M432 306C424 318 430 330 444 334' },
  ],
};
