'use strict';
// a snowman: three circles; the top hat sits behind the head, the stick arms behind the middle
const { circle, rrect, rpoly } = require('../../../lib/htd-vector.js');
module.exports = {
  key: 'snowman',
  parts: [
    { id: 'base', step: 1, guide: true, major: true, shape: 'circle', d: circle(300, 420, 102) },
    { id: 'arm-l', step: 2, kind: 'line', w: 5, d: 'M270 300L170 248M196 262L180 232M196 262L166 266' },
    { id: 'arm-r', step: 2, kind: 'line', w: 5, d: 'M330 300L430 248M404 262L420 232M404 262L434 266' },
    { id: 'middle', step: 1, guide: true, major: true, shape: 'circle', d: circle(300, 280, 76) },
    { id: 'brim', step: 2, d: rrect(222, 128, 156, 20, 9) },
    { id: 'hat', step: 2, d: rrect(250, 54, 100, 84, 10) },
    { id: 'band', step: 3, kind: 'line', w: 9, d: 'M256 118L344 118' },
    { id: 'head', step: 1, guide: true, shape: 'circle', d: circle(300, 172, 54) },
    { id: 'eye-l', step: 3, kind: 'solid', d: circle(280, 160, 8) },
    { id: 'eye-r', step: 3, kind: 'solid', d: circle(320, 160, 8) },
    { id: 'nose', step: 3, d: rpoly([[300, 172], [300, 188], [338, 184]], 3) },
    { id: 'smile', step: 4, kind: 'solid', d: circle(278, 198, 4) + circle(290, 205, 4) + circle(304, 207, 4) + circle(318, 203, 4) },
    { id: 'btn', step: 4, kind: 'solid', d: circle(300, 250, 8) + circle(300, 282, 8) + circle(300, 314, 8) },
    { id: 'btn-base', step: 4, kind: 'solid', d: circle(300, 380, 8) + circle(300, 412, 8) },
  ],
};
