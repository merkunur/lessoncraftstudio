'use strict';
// a sitting spotted calf: an oval head with an oval muzzle on an oval body; black spots inside the shapes
const { circle, ellipse } = require('../../../lib/htd-vector.js');
module.exports = {
  key: 'cow-spotted',
  parts: [
    { id: 'tail', step: 3, kind: 'line', w: 4.2, d: 'M404 420C446 420 466 392 462 356' },
    { id: 'tuft', step: 3, kind: 'solid', d: 'M450 360C452 342 462 330 472 330C478 344 472 360 462 366Z' },
    { id: 'hoof-l', step: 2, d: ellipse(252, 478, 34, 26) },
    { id: 'hoof-r', step: 2, d: ellipse(348, 478, 34, 26) },
    { id: 'hoof-tip', step: 4, kind: 'solid', d: 'M222 488C236 506 268 506 282 488C270 496 234 496 222 488Z' + 'M318 488C332 506 364 506 378 488C366 496 330 496 318 488Z' },
    { id: 'body', step: 1, guide: true, major: true, shape: 'oval', d: ellipse(300, 380, 116, 104) },
    { id: 'horn-l', step: 2, d: 'M254 124C240 110 238 90 246 74C258 88 266 102 274 114Z' },
    { id: 'horn-r', step: 2, d: 'M346 124C360 110 362 90 354 74C342 88 334 102 326 114Z' },
    { id: 'ear-l', step: 2, d: ellipse(208, 156, 46, 20, -15) },
    { id: 'ear-r', step: 2, d: ellipse(392, 156, 46, 20, 15) },
    { id: 'ear-in', step: 3, kind: 'line', w: 3, d: 'M180 160C196 156 212 154 228 156M420 160C404 156 388 154 372 156' },
    { id: 'head', step: 1, guide: true, major: true, shape: 'oval', d: ellipse(300, 186, 86, 86) },
    { id: 'muzzle', step: 1, guide: true, shape: 'oval', d: ellipse(300, 258, 72, 46) },
    { id: 'nostril-l', step: 3, kind: 'solid', d: ellipse(276, 254, 8, 11, -15) },
    { id: 'nostril-r', step: 3, kind: 'solid', d: ellipse(324, 254, 8, 11, 15) },
    { id: 'smile', step: 3, kind: 'line', w: 3.4, d: 'M278 282C292 292 308 292 322 282' },
    { id: 'eye-l', step: 3, kind: 'solid', d: ellipse(266, 178, 12, 15) },
    { id: 'eye-r', step: 3, kind: 'solid', d: ellipse(334, 178, 12, 15) },
    { id: 'shine-l', step: 3, kind: 'shine', d: circle(269, 172, 4.5) },
    { id: 'shine-r', step: 3, kind: 'shine', d: circle(337, 172, 4.5) },
    { id: 'spot-head', step: 4, kind: 'solid', d: 'M226 140C236 120 262 120 270 136C276 150 262 160 246 160C232 160 222 152 226 140Z' },
    { id: 'spot-1', step: 4, kind: 'solid', d: 'M206 360C214 336 246 336 252 358C258 380 234 396 218 390C206 384 202 372 206 360Z' },
    { id: 'spot-2', step: 4, kind: 'solid', d: 'M346 330C360 318 384 324 386 346C388 366 366 374 352 366C340 358 336 340 346 330Z' },
    { id: 'spot-3', step: 4, kind: 'solid', d: 'M300 420C312 410 334 416 334 432C334 448 314 454 302 446C292 440 290 428 300 420Z' },
    { id: 'leg-l', step: 4, kind: 'line', d: 'M266 404C262 430 262 450 264 466' },
    { id: 'leg-r', step: 4, kind: 'line', d: 'M334 404C338 430 338 450 336 466' },
  ],
};
