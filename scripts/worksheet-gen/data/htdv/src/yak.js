'use strict';
// a shaggy yak, front view: an oval head on a big oval body; wide horns behind the head, the muzzle inside it
const { circle, ellipse, rrect } = require('../../../lib/htd-vector.js');
module.exports = {
  key: 'yak',
  parts: [
    { id: 'leg-l', step: 2, d: rrect(222, 420, 56, 96, 20) },
    { id: 'leg-r', step: 2, d: rrect(322, 420, 56, 96, 20) },
    { id: 'hoof', step: 4, kind: 'solid', d: rrect(224, 498, 52, 18, 8) + rrect(324, 498, 52, 18, 8) },
    { id: 'body', step: 1, guide: true, major: true, shape: 'oval', d: ellipse(300, 352, 150, 110) },
    { id: 'horn-l', step: 2, d: 'M244 130C200 136 168 116 160 80C150 104 156 130 176 146C196 160 224 158 248 150Z' },
    { id: 'horn-r', step: 2, d: 'M356 130C400 136 432 116 440 80C450 104 444 130 424 146C404 160 376 158 352 150Z' },
    { id: 'ear-l', step: 2, d: ellipse(214, 176, 36, 16, -10) },
    { id: 'ear-r', step: 2, d: ellipse(386, 176, 36, 16, 10) },
    { id: 'head', step: 1, guide: true, major: true, shape: 'oval', d: ellipse(300, 192, 80, 98) },
    { id: 'muzzle', step: 3, d: ellipse(300, 248, 58, 34) },
    { id: 'fringe', step: 3, kind: 'line', w: 3.6, d: 'M246 144L256 166L268 140L280 166L292 138L304 166L316 138L328 166L340 140L350 164' },
    { id: 'nostril-l', step: 3, kind: 'solid', d: ellipse(282, 244, 7, 10, -15) },
    { id: 'nostril-r', step: 3, kind: 'solid', d: ellipse(318, 244, 7, 10, 15) },
    { id: 'smile', step: 3, kind: 'line', w: 3.4, d: 'M284 264C294 272 306 272 316 264' },
    { id: 'eye-l', step: 3, kind: 'solid', d: ellipse(268, 194, 11, 13) },
    { id: 'eye-r', step: 3, kind: 'solid', d: ellipse(332, 194, 11, 13) },
    { id: 'shine-l', step: 3, kind: 'shine', d: circle(271, 189, 4) },
    { id: 'shine-r', step: 3, kind: 'shine', d: circle(335, 189, 4) },
    { id: 'hair-l', step: 4, kind: 'line', w: 3.4, d: 'M170 360L184 384M188 384L196 410M214 404L220 430M162 330L176 350' },
    { id: 'hair-r', step: 4, kind: 'line', w: 3.4, d: 'M430 360L416 384M412 384L404 410M386 404L380 430M438 330L424 350' },
    { id: 'hair-mid', step: 4, kind: 'line', w: 3.4, d: 'M250 400L256 426M300 410L300 438M350 400L344 426' },
  ],
};
