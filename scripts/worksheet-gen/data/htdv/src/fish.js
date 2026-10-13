'use strict';
// a happy fish: an oval body with a triangle tail behind it; fins behind the body, bubbles above
const { circle, ellipse, rpoly } = require('../../../lib/htd-vector.js');
module.exports = {
  key: 'fish',
  parts: [
    { id: 'tail', step: 1, guide: true, major: true, shape: 'triangle', d: rpoly([[196, 300], [70, 196], [70, 404]], 18) },
    { id: 'fin-top', step: 2, d: 'M250 214C270 162 330 146 372 172C364 190 360 204 356 216Z' },
    { id: 'fin-bottom', step: 2, d: 'M290 384C300 418 330 430 356 420C350 404 348 392 348 380Z' },
    { id: 'body', step: 1, guide: true, major: true, shape: 'oval', d: ellipse(320, 300, 160, 104) },
    { id: 'eye', step: 3, kind: 'solid', d: circle(408, 276, 20) },
    { id: 'shine', step: 3, kind: 'shine', d: circle(415, 268, 7) },
    { id: 'mouth', step: 3, kind: 'line', w: 3.8, d: 'M452 318C462 330 474 332 466 316' },
    { id: 'gill', step: 3, kind: 'line', d: 'M366 236C344 270 344 330 366 364' },
    { id: 'scales', step: 4, kind: 'line', w: 3.2, d: 'M220 262C232 252 244 252 254 262M246 290C258 280 270 280 280 290M220 318C232 308 244 308 254 318M246 346C258 336 270 336 280 346M310 236C320 228 330 228 338 236' },
    { id: 'tail-lines', step: 4, kind: 'line', w: 3.2, d: 'M100 250L150 286M98 300L148 300M100 350L150 314' },
    { id: 'bubbles', step: 4, d: circle(500, 196, 16) + circle(530, 150, 11) + circle(506, 112, 8) },
  ],
};
