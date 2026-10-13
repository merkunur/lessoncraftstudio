'use strict';
// a teddy bear: a circle head on an oval body; arms and legs are ovals behind the body, a bow under the head
const { circle, ellipse, rpoly } = require('../../../lib/htd-vector.js');
module.exports = {
  key: 'teddy-bear',
  parts: [
    { id: 'arm-l', step: 2, d: ellipse(196, 340, 34, 60, 35) },
    { id: 'arm-r', step: 2, d: ellipse(404, 340, 34, 60, -35) },
    { id: 'leg-l', step: 2, d: ellipse(236, 460, 46, 40) },
    { id: 'leg-r', step: 2, d: ellipse(364, 460, 46, 40) },
    { id: 'pad-l', step: 3, kind: 'line', w: 3.4, d: circle(224, 474, 20) },
    { id: 'pad-r', step: 3, kind: 'line', w: 3.4, d: circle(376, 474, 20) },
    { id: 'body', step: 1, guide: true, major: true, shape: 'oval', d: ellipse(300, 370, 100, 108) },
    { id: 'ear-l', step: 2, d: circle(220, 106, 36) },
    { id: 'ear-r', step: 2, d: circle(380, 106, 36) },
    { id: 'ear-l-in', step: 3, kind: 'line', w: 3.4, d: circle(222, 110, 17) },
    { id: 'ear-r-in', step: 3, kind: 'line', w: 3.4, d: circle(378, 110, 17) },
    { id: 'head', step: 1, guide: true, major: true, shape: 'circle', d: circle(300, 186, 96) },
    { id: 'muzzle', step: 3, d: ellipse(300, 222, 46, 36) },
    { id: 'nose', step: 3, kind: 'solid', d: ellipse(300, 208, 17, 11) },
    { id: 'mouth', step: 3, kind: 'line', w: 3.4, d: 'M300 219L300 232C292 240 282 238 278 232M300 232C308 240 318 238 322 232' },
    { id: 'eye-l', step: 3, kind: 'solid', d: circle(262, 170, 11) },
    { id: 'eye-r', step: 3, kind: 'solid', d: circle(338, 170, 11) },
    { id: 'shine', step: 3, kind: 'shine', d: circle(265, 166, 4) + circle(341, 166, 4) },
    { id: 'bow-l', step: 4, d: rpoly([[300, 304], [256, 286], [256, 322]], 6) },
    { id: 'bow-r', step: 4, d: rpoly([[300, 304], [344, 286], [344, 322]], 6) },
    { id: 'knot', step: 4, d: circle(300, 304, 12) },
    { id: 'patch', step: 4, kind: 'line', w: 3.6, d: 'M300 428C266 404 254 384 262 368C270 352 292 354 300 372C308 354 330 352 338 368C346 384 334 404 300 428Z' },
  ],
};
