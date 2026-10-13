'use strict';
// a bee: an oval body with a circle head in front of it; two oval wings behind the body, stripes inside it
const { circle, ellipse, rpoly } = require('../../../lib/htd-vector.js');
module.exports = {
  key: 'bee',
  parts: [
    { id: 'wing-back', step: 2, d: ellipse(370, 176, 54, 86, 22) },
    { id: 'wing-front', step: 2, d: ellipse(300, 170, 50, 82, -14) },
    { id: 'wing-lines', step: 4, kind: 'line', w: 3, d: 'M300 220C296 196 296 160 304 124M372 226C372 200 380 168 392 138' },
    { id: 'sting', step: 2, d: rpoly([[470, 290], [470, 330], [520, 310]], 6) },
    { id: 'legs', step: 4, kind: 'line', w: 4, d: 'M290 386L280 414M340 390L340 418M390 380L400 406' },
    { id: 'body', step: 1, guide: true, major: true, shape: 'oval', d: ellipse(340, 310, 140, 90) },
    { id: 'stripe-1', step: 3, kind: 'line', w: 18, d: 'M338 236C350 270 350 350 338 384' },
    { id: 'stripe-2', step: 3, kind: 'line', w: 18, d: 'M410 248C420 280 420 340 410 372' },
    { id: 'antennae', step: 2, kind: 'line', w: 4, d: 'M154 214C140 176 120 152 98 146M200 208C206 170 222 146 244 134' },
    { id: 'antenna-tips', step: 2, kind: 'solid', d: circle(96, 144, 11) + circle(246, 132, 11) },
    { id: 'head', step: 1, guide: true, major: true, shape: 'circle', d: circle(186, 290, 84) },
    { id: 'eye-l', step: 3, kind: 'solid', d: ellipse(160, 278, 12, 16) },
    { id: 'eye-r', step: 3, kind: 'solid', d: ellipse(214, 278, 12, 16) },
    { id: 'shine', step: 3, kind: 'shine', d: circle(164, 271, 4.5) + circle(218, 271, 4.5) },
    { id: 'smile', step: 3, kind: 'line', w: 3.6, d: 'M164 318C178 334 198 334 212 318' },
    { id: 'cheeks', step: 4, kind: 'line', w: 3, d: circle(134, 312, 10) + circle(240, 312, 10) },
  ],
};
