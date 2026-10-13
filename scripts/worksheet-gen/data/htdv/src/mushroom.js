'use strict';
// a mushroom: a half-circle cap on a rounded-rectangle stem; a happy face on the stem
const { circle, ellipse, rrect, dome } = require('../../../lib/htd-vector.js');
module.exports = {
  key: 'mushroom',
  parts: [
    { id: 'stem', step: 1, guide: true, major: true, shape: 'rectangle', d: rrect(232, 236, 136, 236, 42) },
    { id: 'cap', step: 1, guide: true, major: true, shape: 'half-circle', d: dome(300, 260, 206, 196, 0.16) },
    { id: 'spot1', step: 2, kind: 'line', w: 3.8, d: circle(300, 120, 30) },
    { id: 'spot2', step: 2, kind: 'line', w: 3.8, d: ellipse(196, 186, 30, 26) },
    { id: 'spot3', step: 2, kind: 'line', w: 3.8, d: ellipse(404, 186, 30, 26) },
    { id: 'spot4', step: 2, kind: 'line', w: 3.8, d: circle(232, 112, 14) + circle(368, 112, 14) },
    { id: 'eye-l', step: 3, kind: 'solid', d: ellipse(274, 330, 11, 15) },
    { id: 'eye-r', step: 3, kind: 'solid', d: ellipse(326, 330, 11, 15) },
    { id: 'shine-l', step: 3, kind: 'shine', d: circle(277, 324, 4) },
    { id: 'shine-r', step: 3, kind: 'shine', d: circle(329, 324, 4) },
    { id: 'smile', step: 3, kind: 'line', w: 3.6, d: 'M280 366C292 380 308 380 320 366' },
    { id: 'cheeks', step: 4, kind: 'line', w: 3, d: circle(256, 360, 9) + circle(344, 360, 9) },
    { id: 'grass', step: 4, kind: 'line', w: 3.6, d: 'M200 474C198 456 190 444 182 438M206 474C210 454 218 444 228 438M372 474C376 456 386 446 396 440M396 474C398 458 404 448 414 444M150 474L450 474' },
  ],
};
