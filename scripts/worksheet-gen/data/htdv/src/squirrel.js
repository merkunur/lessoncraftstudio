'use strict';
// a squirrel holding an acorn: a circle head on an oval body, a big oval tail behind the body
const { circle, ellipse, rpoly, dome } = require('../../../lib/htd-vector.js');
module.exports = {
  key: 'squirrel',
  parts: [
    { id: 'tail', step: 1, guide: true, shape: 'oval', d: ellipse(440, 262, 84, 152, 14) },
    { id: 'foot-l', step: 2, d: ellipse(244, 474, 40, 22) },
    { id: 'foot-r', step: 2, d: ellipse(334, 474, 40, 22) },
    { id: 'body', step: 1, guide: true, major: true, shape: 'oval', d: ellipse(292, 368, 92, 110) },
    { id: 'ear-l', step: 2, d: rpoly([[200, 140], [206, 70], [250, 116]], 10) },
    { id: 'ear-r', step: 2, d: rpoly([[300, 116], [334, 66], [344, 136]], 10) },
    { id: 'tufts', step: 4, kind: 'line', w: 3.2, d: 'M206 70L198 54M206 70L214 52M334 66L330 48M334 66L344 50' },
    { id: 'head', step: 1, guide: true, major: true, shape: 'circle', d: circle(270, 196, 82) },
    { id: 'eye', step: 3, kind: 'solid', d: ellipse(240, 186, 14, 17) },
    { id: 'eye-2', step: 3, kind: 'solid', d: ellipse(304, 186, 14, 17) },
    { id: 'shine', step: 3, kind: 'shine', d: circle(244, 179, 5) + circle(308, 179, 5) },
    { id: 'nose', step: 3, kind: 'solid', d: ellipse(272, 222, 12, 8) },
    { id: 'mouth', step: 3, kind: 'line', w: 3.4, d: 'M272 230L272 238C266 246 256 244 252 238M272 238C278 246 288 244 292 238' },
    { id: 'teeth', step: 3, d: 'M264 240L264 252L280 252L280 240Z' },
    { id: 'nut', step: 3, d: ellipse(292, 362, 30, 36) },
    { id: 'cap', step: 3, d: dome(292, 344, 38, 28, 0.2) },
    { id: 'stalk', step: 3, kind: 'line', w: 4, d: 'M292 316L296 302' },
    { id: 'paws', step: 3, d: ellipse(256, 352, 18, 13, -20) + ellipse(328, 352, 18, 13, 20) },
    { id: 'tail-fur', step: 4, kind: 'line', w: 3.2, d: 'M452 146C466 176 472 206 470 236M482 206C492 236 492 276 484 306M442 296C452 326 454 356 446 386' },
    { id: 'cheeks', step: 4, kind: 'line', w: 3, d: 'M216 218L228 214M326 218L314 214' },
  ],
};
