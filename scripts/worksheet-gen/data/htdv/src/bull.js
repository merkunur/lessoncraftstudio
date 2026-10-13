'use strict';
// a strong little bull, front view: an oval head on a rounded-rectangle body; big horns behind, the muzzle inside the head
const { circle, ellipse, rrect } = require('../../../lib/htd-vector.js');
module.exports = {
  key: 'bull',
  parts: [
    { id: 'tail', step: 3, kind: 'line', w: 4.2, d: 'M424 310C466 312 470 352 464 388' },
    { id: 'tuft', step: 3, kind: 'solid', d: 'M454 384C448 400 454 418 464 422C474 418 478 400 470 384Z' },
    { id: 'leg-1', step: 2, d: rrect(180, 390, 58, 122, 22) },
    { id: 'leg-2', step: 2, d: rrect(250, 390, 50, 112, 20) },
    { id: 'leg-3', step: 2, d: rrect(300, 390, 50, 112, 20) },
    { id: 'leg-4', step: 2, d: rrect(362, 390, 58, 122, 22) },
    { id: 'hoof', step: 4, kind: 'solid', d: rrect(182, 492, 54, 18, 8) + rrect(252, 482, 46, 18, 8) + rrect(302, 482, 46, 18, 8) + rrect(364, 492, 54, 18, 8) },
    { id: 'body', step: 1, guide: true, major: true, shape: 'rectangle', d: rrect(160, 250, 280, 196, 70) },
    { id: 'horn-l', step: 2, d: 'M236 150C196 150 162 124 156 84C176 104 206 114 240 118Z' },
    { id: 'horn-r', step: 2, d: 'M364 150C404 150 438 124 444 84C424 104 394 114 360 118Z' },
    { id: 'ear-l', step: 2, d: ellipse(212, 178, 40, 18, -12) },
    { id: 'ear-r', step: 2, d: ellipse(388, 178, 40, 18, 12) },
    { id: 'head', step: 1, guide: true, major: true, shape: 'oval', d: ellipse(300, 200, 86, 100) },
    { id: 'tuft-head', step: 3, kind: 'line', w: 3.6, d: 'M270 122C278 108 290 110 292 124C298 106 312 108 312 124C320 110 332 114 330 128' },
    { id: 'muzzle', step: 3, d: ellipse(300, 252, 64, 36) },
    { id: 'nostril-l', step: 3, kind: 'solid', d: ellipse(278, 250, 8, 11, -15) },
    { id: 'nostril-r', step: 3, kind: 'solid', d: ellipse(322, 250, 8, 11, 15) },
    { id: 'ring', step: 4, kind: 'line', w: 4.2, d: 'M286 270C286 294 314 294 314 270' },
    { id: 'eye-l', step: 3, kind: 'solid', d: ellipse(268, 186, 12, 14) },
    { id: 'eye-r', step: 3, kind: 'solid', d: ellipse(332, 186, 12, 14) },
    { id: 'shine-l', step: 3, kind: 'shine', d: circle(271, 180, 4.5) },
    { id: 'shine-r', step: 3, kind: 'shine', d: circle(335, 180, 4.5) },
    { id: 'brow-l', step: 4, kind: 'line', w: 4, d: 'M250 160L282 168' },
    { id: 'brow-r', step: 4, kind: 'line', w: 4, d: 'M350 160L318 168' },
  ],
};
