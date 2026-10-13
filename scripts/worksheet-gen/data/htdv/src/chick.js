'use strict';
// a little chick: a circle head on a big circle body; feet behind the body, a tuft on the head
const { circle, ellipse, rpoly } = require('../../../lib/htd-vector.js');
module.exports = {
  key: 'chick',
  parts: [
    { id: 'feet', step: 2, kind: 'line', w: 5, d: 'M256 440L256 484M256 484L234 500M256 484L256 506M256 484L278 500M344 440L344 484M344 484L322 500M344 484L344 506M344 484L366 500' },
    { id: 'body', step: 1, guide: true, major: true, shape: 'circle', d: circle(300, 340, 128) },
    { id: 'head', step: 1, guide: true, major: true, shape: 'circle', d: circle(300, 180, 86) },
    { id: 'tuft', step: 2, kind: 'line', w: 4, d: 'M290 96C284 74 292 60 304 58M302 96C306 78 318 70 330 72' },
    { id: 'wing-l', step: 2, kind: 'line', d: 'M196 300C170 330 172 372 200 396C214 372 218 334 196 300Z' },
    { id: 'wing-r', step: 2, kind: 'line', d: 'M404 300C430 330 428 372 400 396C386 372 382 334 404 300Z' },
    { id: 'beak', step: 3, d: rpoly([[278, 196], [322, 196], [300, 224]], 6) },
    { id: 'beak-line', step: 3, kind: 'line', w: 3, d: 'M284 204L316 204' },
    { id: 'eye-l', step: 3, kind: 'solid', d: ellipse(266, 170, 13, 16) },
    { id: 'eye-r', step: 3, kind: 'solid', d: ellipse(334, 170, 13, 16) },
    { id: 'shine', step: 3, kind: 'shine', d: circle(270, 164, 4.5) + circle(338, 164, 4.5) },
    { id: 'cheeks', step: 4, kind: 'line', w: 3, d: circle(240, 206, 11) + circle(360, 206, 11) },
    { id: 'chest', step: 4, kind: 'line', w: 3.2, d: 'M276 300L284 314L292 300L300 314L308 300L316 314L324 300' },
  ],
};
