'use strict';
// a happy hippo, front view: a wide oval head in front of a big oval body; little ears and eye bumps behind the head
const { circle, ellipse } = require('../../../lib/htd-vector.js');
module.exports = {
  key: 'hippo',
  parts: [
    { id: 'foot-l', step: 2, d: ellipse(228, 470, 46, 32) },
    { id: 'foot-r', step: 2, d: ellipse(372, 470, 46, 32) },
    { id: 'nails', step: 4, kind: 'line', w: 3.2, d: 'M206 494C210 484 220 484 222 494M234 494C238 484 248 484 250 494M350 494C352 484 362 484 366 494M378 494C380 484 390 484 394 494' },
    { id: 'body', step: 1, guide: true, major: true, shape: 'oval', d: ellipse(300, 372, 136, 112) },
    { id: 'ear-l', step: 2, d: ellipse(214, 132, 20, 26, -20) },
    { id: 'ear-r', step: 2, d: ellipse(386, 132, 20, 26, 20) },
    { id: 'bump-l', step: 2, d: circle(256, 150, 34) },
    { id: 'bump-r', step: 2, d: circle(344, 150, 34) },
    { id: 'eye-l', step: 3, kind: 'solid', d: circle(256, 146, 13) },
    { id: 'eye-r', step: 3, kind: 'solid', d: circle(344, 146, 13) },
    { id: 'shine-l', step: 3, kind: 'shine', d: circle(260, 141, 4.5) },
    { id: 'shine-r', step: 3, kind: 'shine', d: circle(348, 141, 4.5) },
    { id: 'head', step: 1, guide: true, major: true, shape: 'oval', d: ellipse(300, 248, 130, 90) },
    { id: 'nostril-l', step: 3, kind: 'solid', d: ellipse(258, 222, 10, 14, -10) },
    { id: 'nostril-r', step: 3, kind: 'solid', d: ellipse(342, 222, 10, 14, 10) },
    { id: 'mouth', step: 3, kind: 'line', w: 4, d: 'M214 266C250 302 350 302 386 266' },
    { id: 'tooth-l', step: 4, d: 'M262 290L262 306L280 306L280 294Z' },
    { id: 'tooth-r', step: 4, d: 'M320 294L320 306L338 306L338 290Z' },
    { id: 'cheeks', step: 4, kind: 'line', w: 3, d: 'M194 256C198 246 206 242 214 244M406 256C402 246 394 242 386 244' },
    { id: 'belly', step: 4, kind: 'line', w: 3.4, d: 'M240 420C268 438 332 438 360 420' },
  ],
};
