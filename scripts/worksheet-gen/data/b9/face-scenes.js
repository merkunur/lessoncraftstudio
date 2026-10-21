/**
 * data/b9/face-scenes.js — the twenty Picture Tracing pages (FINAL contract docs/worksheet-gen/b9-designs/
 * K-418-picture-tracing.md §2-§3), one scene per face mode, authored in page px on the 675 × 716 body (lib/pt-scene.js).
 * Placements are the contract's tables; where a render showed a defect the change is noted beside the entry and in
 * METHOD-picture-tracing.md §6. Library keys are B&W drawings from _SUBSTRATE-POOL.md; motifs are lib/pt-motifs.js.
 */
'use strict';
const SOLID = '#1a1a1a';
const GREY = '#8a8a8a';

/** a 44 px black badge disc with a white glyph (structure) */
const badge = (cx, cy, glyph, args = []) => [
  { m: 'circle', a: [cx, cy, 22], fill: SOLID, stroke: false },
  { m: 'glyph.' + glyph, a: [cx, cy, 15, ...args], colour: '#FFFFFF', w: 3, clip: false },
];
/** a wave row clipped to the inside of a circle (the porthole sea): the polyline's ends lie ON the ring */
function ringWave(cx, cy, r, y, amp, wl) {
  const hw = Math.sqrt(r * r - (y - cy) * (y - cy)) - 3;
  const pts = []; for (let x = cx - hw; x <= cx + hw + 0.01; x += 3) pts.push([x, y + amp * Math.sin(((x - (cx - hw)) / wl) * 2 * Math.PI)]);
  return 'M' + pts.map((p) => p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join('L');
}

/** a stamp's perforation: n solid dots round a square (x, y, side) */
function stampDots(x, y, side, n) {
  return Array.from({ length: n }, (_, k) => {
    const t = k / n, edge = Math.floor(t * 4), u = (t * 4) % 1;
    const P = [[x + side * u, y], [x + side, y + side * u], [x + side - side * u, y + side], [x, y + side - side * u]][edge];
    return { m: 'circle', a: [P[0], P[1], 3], fill: SOLID, stroke: false };
  });
}
const grassSolid = (x, y, h, n = 3) => ({ m: 'grass', a: [x, y, h, n], colour: GREY, w: 2 });

const SCENES = {
  // §2 BASE — the path to the door (design B #1, built verbatim, measured 10,063 px)
  base: {
    band: 'K', style: 'P2',
    motifs: [
      { m: 'cloud', a: [165, 128, 190] },
      { m: 'sun', a: [590, 82, 40, 10] },
      { m: 'ground', a: [14, 661, 470, 6, 3] },
      { m: 'pathBand', a: [[[338, 716], [300, 640], [250, 560], [215, 474]], 120] },
    ],
    decor: [grassSolid(420, 700, 26), grassSolid(610, 702, 24), grassSolid(40, 560, 22)],
    items: [
      { src: 'home and nature bw/house', x: 205, y: 472, h: 250 },
      { src: 'home and nature bw/tree', x: 545, y: 480, h: 312 },
      { src: 'nature bw/butterfly', x: 400, y: 300, w: 130 },
      // the contract's `nature bw/flower` ×2: its petals run closer than the K gap (18 px) at h 170 — two tulips
      // (grade 1, long clean strokes) make the same gateway (render read 2026-10-22)
      { src: 'Easter bw/tulip', x: 85, y: 702, h: 175 },
      { src: 'Easter bw/tulip', x: 165, y: 700, h: 150, flip: true },
      { src: 'animals bw 5/rabbit', x: 520, y: 702, h: 150 },
    ],
  },

  // F2 my first tracing — the porthole whale (PreK, one picture, one start dot)
  'first-tracing': {
    band: 'PreK', style: 'P1', occlusion: false,
    decor: [
      { m: 'circle', a: [338, 360, 322], w: 4 }, { m: 'circle', a: [338, 360, 308], w: 2.5 },
      ...[0, 1, 2, 3, 4, 5, 6, 7].map((k) => ({ m: 'circle', a: [338 + 315 * Math.cos(k * Math.PI / 4 + Math.PI / 8), 360 + 315 * Math.sin(k * Math.PI / 4 + Math.PI / 8), 5], fill: SOLID, stroke: false })),
      { d: ringWave(338, 360, 308, 586, 8, 70), w: 2.5 }, { d: ringWave(338, 360, 308, 616, 8, 70), w: 2.5 },
      { m: 'bubble', a: [470, 190, 16], colour: GREY, w: 2 }, { m: 'bubble', a: [505, 145, 10], colour: GREY, w: 2 }, { m: 'bubble', a: [540, 200, 12], colour: GREY, w: 2 },   // inside the rim (one sat on the ring)
    ],
    items: [{ src: 'sea life bw/whale', x: 330, y: 545, w: 540, start: 'top', outline: true }],   // outline only: the belly stripes and the mouth are drawn (pedagogy #2: inner details ≤ 3 runs)
  },

  // F3 look, then trace — polaroid models (PreK, 2 rows)
  'look-then-trace': {
    band: 'PreK', style: 'P1', occlusion: false,
    decor: [
      { m: 'roundRect', a: [20, 22, 230, 296, 10] }, { d: 'M20 292 L250 292', w: 2.5 },
      { m: 'roundRect', a: [20, 380, 230, 296, 10] }, { d: 'M20 650 L250 650', w: 2.5 },
      ...badge(135, 22, 'eye'), ...badge(135, 380, 'eye'),
      { m: 'glyph.arrow', a: [300, 180, 34], w: 4 }, { m: 'glyph.arrow', a: [300, 538, 34], w: 4 },
      { d: 'M20 358 L655 358', w: 1.5 },
    ],
    items: [
      { src: 'animals bw 5/penguin', x: 135, y: 262, h: 207, render: 'model' },
      { src: 'animals bw 5/penguin', x: 490, y: 330, h: 300, start: 'top' },
      { src: 'animals bw 4/kangaroo', x: 135, y: 620, h: 207, render: 'model' },
      { src: 'animals bw 4/kangaroo', x: 490, y: 688, h: 300, start: 'top' },
    ],
  },

  // F4 round and round — the marble run (PreK, three round pictures resting on ramps)
  'round-and-round': {
    band: 'PreK', style: 'P1', occlusion: false,
    decor: [
      { d: 'M20 338 L310 352', w: 4 }, { d: 'M20 312 L20 338', w: 4 },
      { d: 'M365 518 L655 532', w: 4 }, { d: 'M655 506 L655 532', w: 4 },
      { d: 'M20 702 L330 712', w: 4 },
    ],
    items: [
      // outline only: the lesson is the round outline (the seams and leaf veins are drawn), and the full trace was
      // 5,365 px over the PreK budget; the start comes from the silhouette at 2 o'clock, anticlockwise
      { src: 'sports bw/beach_ball', x: 170, y: 336, h: 300, start: 'contour', outline: true },
      { src: 'fruits bw/orange', x: 505, y: 516, h: 300, start: 'contour', outline: true },
      { src: 'fruits bw/apple_2', x: 175, y: 700, h: 300, start: 'contour', outline: true },
    ],
  },

  // F5 straight-line pictures — three direction columns (K)
  'straight-lines': {
    band: 'K', style: 'P2', occlusion: false,
    decor: [
      { d: 'M225 20 L225 700', w: 1.5 }, { d: 'M450 20 L450 700', w: 1.5 },
      ...badge(120, 36, 'arrow', [90]), ...badge(338, 36, 'arrow', [0]), ...badge(556, 36, 'arrow', [45]),
    ],
    items: [
      { src: 'tools bw/ladder', x: 120, y: 400, h: 300 },
      { src: 'furniture bw/cabinet', x: 118, y: 700, w: 178 },   // the wardrobe's double outline pushed the page over the K budget
      // straightness measured (tools/pt-straight.js, calibrated: apple 41 %, ladder 72 %): the contract's furniture bw/table
      // is an oval top on a pedestal (69 %) → classroom bw 2/table (83 %); the cone (65 %) → beach bw/sailboat (79 %)
      { src: 'classroom bw 2/table', x: 338, y: 330, w: 190 },
      { src: 'furniture bw/dresser_2', x: 338, y: 690, h: 215 },
      { src: 'Christmas bw/envelope', x: 560, y: 330, w: 180 },
      { src: 'beach bw/sailboat', x: 560, y: 690, w: 185 },
    ],
  },

  // F6 zigzags — storm over the mountain camp (K)
  zigzags: {
    band: 'K', style: 'P2',
    motifs: [
      { m: 'star', a: [110, 110, 34] },
      { m: 'moon', a: [590, 110, 34] },
      // (the contract's vector storm cloud is gone: the library 'lightning' drawing IS a storm cloud with rain and a bolt)
      { m: 'mountains', a: [4, 671, 470, 170, 4] },
      { m: 'ground', a: [4, 671, 636, 4, 3] },
      { m: 'fir', a: [100, 450, 580, 75, 636, 13], z: 10 },
      { m: 'fir', a: [255, 480, 584, 60, 636, 11], z: 11 },
      { m: 'fir', a: [618, 520, 598, 45, 636, 9], z: 12 },
    ],
    decor: [grassSolid(60, 704, 24), grassSolid(250, 706, 22), grassSolid(440, 704, 24), grassSolid(620, 706, 22)],
    items: [
      { src: 'travel and holiday bw/lightning', x: 337, y: 285, h: 225 },
      { src: 'travel and holiday bw/tent', x: 445, y: 636, h: 140, z: 13 },
    ],
  },

  // F7 curls and spirals — the curl gallery (K, bento)
  curls: {
    band: 'K', style: 'P2', occlusion: false,
    decor: [
      { m: 'roundRect', a: [14, 8, 406, 396, 18] }, { d: 'M30 384 L404 384', w: 2.5 },
      { m: 'roundRect', a: [434, 8, 227, 396, 18] },
      { m: 'roundRect', a: [14, 418, 196, 290, 18] }, { m: 'roundRect', a: [224, 418, 196, 290, 18] }, { m: 'roundRect', a: [434, 418, 227, 290, 18] },
      { m: 'bubble', a: [380, 330, 6], colour: GREY, w: 2 }, { m: 'bubble', a: [395, 300, 8], colour: GREY, w: 2 }, { m: 'bubble', a: [388, 262, 10], colour: GREY, w: 2 },
    ],
    items: [
      { src: 'animals bw/snail', x: 210, y: 380, w: 330 },
      { src: 'Christmas bw/lollipop', x: 548, y: 380, h: 350 },
      { src: 'Christmas bw/bow', x: 112, y: 650, w: 170 },
      { src: 'food bw/pretzel', x: 322, y: 650, w: 170 },
      { src: 'toys bw 2/pinwheel', x: 548, y: 690, h: 260 },
    ],
  },

  // F8 trace and color — the picnic under the tree (K)
  'trace-and-color': {
    band: 'K', style: 'P2',
    motifs: [
      { m: 'sun', a: [560, 90, 38, 8, false] },
      { m: 'cloud', a: [380, 115, 160] },
      { m: 'ground', a: [4, 671, 425, 5, 3] },
      { m: 'roundRect', a: [40, 455, 595, 235, 28] },
    ],
    decor: [grassSolid(20, 708, 24), grassSolid(337, 712, 22), grassSolid(655, 708, 24)],
    items: [
      { src: 'home and nature bw/tree_3', x: 140, y: 425, h: 330 },
      { src: 'fruits bw/watermelon', x: 125, y: 645, h: 150 },
      { src: 'home and nature bw/teacup', x: 285, y: 625, w: 140 },
      { src: 'fruits bw/pear', x: 425, y: 645, h: 150 },
      { src: 'fruits bw/lemon', x: 555, y: 645, w: 135 },
      { src: 'Easter bw/bird', x: 460, y: 335, h: 135 },   // the empty sky right of the tree (render read)
    ],
  },

  // F9 where do I start? — the staircase (K, a marker on every line)
  'where-to-start': {
    band: 'K', style: 'P2', occlusion: false,
    decor: [
      { d: 'M13 183 L177 183 L177 358 L337 358 L337 533 L497 533 L497 708 L661 708', w: 3 },
      { m: 'roundRect', a: [520, 20, 128, 60, 30] },
      { m: 'circle', a: [556, 50, 8], fill: SOLID, stroke: false }, { m: 'glyph.arrow', a: [598, 50, 26], w: 3 },
      grassSolid(40, 700, 22), grassSolid(120, 702, 20), { m: 'daisy', a: [70, 640, 18, 6, 40], colour: GREY, w: 2 },
    ],
    // the contract's four library drawings fragmented into 2-8 lines each (eight start dots on the flag): the four
    // pictures are DESIGNED STROKES (lib/pt-motifs.js `stroke`), every stroke starting top or left, in teaching order
    motifs: [
      { m: 'stroke.flag', a: [100, 180, 150], start: 'lines' },
      { m: 'stroke.heart', a: [257, 346, 150], start: 'lines' },
      { m: 'stroke.stocking', a: [412, 522, 165], start: 'lines' },
      { m: 'stroke.bell', a: [578, 698, 170], start: 'lines' },
    ],
  },

  // F10 trace and count — ducks on the pond (K, N = 5, K.CC.B.5)
  'trace-and-count': {
    band: 'K', style: 'P2', count: { key: 'birds bw 2/duck', n: 5 },
    decor: [
      { m: 'roundRect', a: [16, 16, 120, 120, 16], w: 3 }, { d: 'M34 112 L118 112', w: 2 },
      { m: 'cloud', a: [570, 110, 130], colour: GREY, w: 2 },
      { m: 'ellipse', a: [337, 500, 325, 205], w: 2.5 },
      grassSolid(40, 400, 40, 4), grassSolid(640, 410, 36, 4),
      { m: 'waves', a: [215, 460, 684, 40, 4], colour: GREY, w: 2, clip: true },   // below the ducks (at y 560 they ran through two necks)
    ],
    items: [
      { src: 'nature bw/tree', x: 337, y: 285, h: 250, render: 'model' },
      { src: 'animals bw 5/frog', x: 90, y: 280, h: 100, render: 'model' },
      { src: 'animals bw/turtle', x: 590, y: 280, w: 140, render: 'model' },
      { src: 'birds bw 2/duck', x: 200, y: 485, h: 135 },
      { src: 'birds bw 2/duck', x: 360, y: 455, h: 135, flip: true },
      { src: 'birds bw 2/duck', x: 530, y: 520, h: 135 },
      { src: 'birds bw 2/duck', x: 185, y: 640, h: 135, flip: true },
      { src: 'birds bw 2/duck', x: 380, y: 640, h: 135 },
    ],
  },

  // F11 finish the picture — the mending shelf (K, `part`: only the missing parts are dashed)
  'finish-the-picture': {
    band: 'K', style: 'P2', occlusion: false,
    decor: [
      { m: 'roundRect', a: [10, 345, 655, 10, 5], fill: SOLID }, { m: 'roundRect', a: [10, 700, 655, 10, 5], fill: SOLID },
      { m: 'bunting', a: [4, 671, 30, 30, 8], w: 2 },
    ],
    items: [
      { src: 'vehicles bw/car_2', x: 115, y: 340, w: 205, render: 'part', part: { x0: 0, y0: 0.68, x1: 1, y1: 1 } },
      { src: 'home bw/teapot', x: 337, y: 340, w: 205, flip: true, render: 'part', part: { x0: 0.6, y0: 0, x1: 1, y1: 1 } },   // flipped: the spout is on the drawing's LEFT, so the region marked the handle while the instruction says spout
      { src: 'education bw/umbrella_2', x: 560, y: 340, w: 205, render: 'part', part: { x0: 0, y0: 0.42, x1: 1, y1: 1 } },   // the whole shaft + hook (0.55 left only the hook dashed)
      { src: 'household bw/cup', x: 115, y: 695, w: 190, render: 'part', part: { x0: 0.68, y0: 0, x1: 1, y1: 0.85 } },   // the whole handle (0.75 was 16 % < 20 %)
      { src: 'toys bw/spinning_top', x: 337, y: 695, h: 220, render: 'part', part: { x0: 0, y0: 0.66, x1: 1, y1: 1 } },   // the whole point (0.72 was 18 %)
      { src: 'Easter bw/bunny', x: 560, y: 695, h: 230, render: 'part', part: { x0: 0, y0: 0, x1: 1, y1: 0.45 } },
    ],
  },
  // F12 Christmas: close every bauble (K, indoors, no snow)
  christmas: {
    band: 'K', style: 'P2',
    motifs: [
      { m: 'line', a: [[[230, 102], [380, 470], [80, 470], [230, 102]], true] },
      { m: 'shape', shape: 'rect', a: [230, 495, 40, 50] },
      { m: 'shape', shape: 'rect', a: [230, 580, 120, 120] },
      { m: 'star', a: [230, 62, 28] },
      { m: 'circle', a: [230, 230, 22] }, { m: 'circle', a: [190, 320, 22] }, { m: 'circle', a: [270, 320, 22] }, { m: 'circle', a: [230, 410, 22] },
      { m: 'star', a: [150, 412, 22] }, { m: 'star', a: [310, 412, 22] },
      { m: 'roundRect', a: [430, 60, 210, 230, 18] }, { m: 'line', a: [[[535, 60], [535, 290]]] }, { m: 'line', a: [[[430, 175], [640, 175]]] },
      { m: 'moon', a: [482, 117, 28] }, { m: 'star', a: [588, 118, 22] }, { m: 'star', a: [588, 232, 24] },
      { m: 'ground', a: [4, 671, 642, 0, 1] },
    ],
    decor: [{ m: 'roundRect', a: [150, 660, 380, 40, 20], colour: GREY, w: 2 }],
    items: [
      { src: 'Christmas bw/gift_box', x: 92, y: 640, h: 140 },
      { src: 'Christmas bw 2/gift_box', x: 375, y: 640, h: 130 },
      { src: 'furniture bw/armchair_2', x: 585, y: 640, h: 170 },
    ],
  },

  // F13 shape picture: the shape rocket (K, true shapes only, K.G.A.2)
  'shape-picture': {
    band: 'K', style: 'P2', occlusion: false,
    motifs: [
      { m: 'shape', shape: 'rect', a: [337.5, 360, 135, 320] },
      { m: 'line', a: [[[337, 70], [412, 180], [262, 180], [337, 70]], true] },
      { m: 'circle', a: [337, 280, 42] }, { m: 'circle', a: [337, 375, 26] },
      { m: 'shape', shape: 'square', a: [337, 469, 58] },
      { m: 'line', a: [[[250, 430], [250, 540], [170, 540], [250, 430]], true] },
      { m: 'line', a: [[[425, 430], [505, 540], [425, 540], [425, 430]], true] },
      { m: 'line', a: [[[295, 560], [380, 560], [337, 640], [295, 560]], true] },
      { m: 'shape', shape: 'rect', a: [337.5, 678, 375, 36] },
      { m: 'shape', shape: 'square', a: [110, 150, 70, 45] },
      { m: 'shape', shape: 'square', a: [570, 305, 50] },
      { m: 'circle', a: [560, 120, 55] },
      { m: 'circle', a: [110, 420, 38] },
    ],
    decor: [{ m: 'roundRect', a: [26, 620, 92, 64, 32] }, { m: 'circle', a: [72, 652, 20], fill: '#9a9a9a', stroke: false }],
  },

  // F14 summer at the sea: a postcard (K)
  'summer-sea': {
    band: 'K', style: 'P2',
    motifs: [
      { m: 'sun', a: [110, 100, 44, 10] },
      { m: 'line', a: [[[30, 222], [645, 222]]] },
      { m: 'waves', a: [30, 645, 300, 60, 9] },
      { m: 'waves', a: [30, 645, 380, 60, 9] },
      { m: 'ground', a: [30, 645, 452, 8, 3] },
    ],
    decor: [
      { m: 'roundRect', a: [14, 8, 647, 700, 18], w: 2.5 }, { m: 'roundRect', a: [22, 16, 631, 684, 12], w: 1.2, clip: false },
      ...stampDots(548, 26, 92, 28),
      { m: 'roundRect', a: [554, 32, 80, 80, 4], w: 1.5, clip: false },
    ],
    items: [
      { src: 'beach bw/anchor', x: 594, y: 100, h: 56, render: 'model', hides: false },
      { src: 'beach bw/sailboat', x: 450, y: 298, h: 170 },
      { src: 'beach bw/parasol', x: 148, y: 640, h: 210 },
      { src: 'beach bw/bucket', x: 318, y: 688, h: 135 },
      { src: 'beach bw/sandcastle', x: 455, y: 630, h: 155 },
      { src: 'beach bw/crab', x: 582, y: 682, w: 136 },
    ],
  },

  // F15 big, middle and small (K; P1 → P2 → P3 per copy)
  'big-middle-small': {
    band: 'K', style: 'P2', occlusion: false,
    decor: [
      { m: 'cloud', a: [560, 60, 110], colour: GREY, w: 2 },
      { d: 'M4 402 L671 402', w: 2.5 },
      { m: 'waves', a: [4, 671, 660, 48, 6], w: 2.5 },
    ],
    items: [
      { src: 'vehicles bw 2/airplane', x: 155, y: 180, w: 290, style: 'P1' },
      { src: 'vehicles bw 2/airplane', x: 425, y: 170, w: 197, style: 'P2' },
      { src: 'vehicles bw 2/airplane', x: 605, y: 160, w: 130, style: 'P3' },
      { src: 'vehicles bw 2/car', x: 155, y: 400, w: 290, style: 'P1' },
      { src: 'vehicles bw 2/car', x: 425, y: 400, w: 197, style: 'P2' },
      { src: 'vehicles bw 2/car', x: 605, y: 400, w: 130, style: 'P3' },
      { src: 'vehicles bw/boat_2', x: 155, y: 655, w: 290, style: 'P1' },
      { src: 'vehicles bw/boat_2', x: 425, y: 655, w: 197, style: 'P2' },
      { src: 'vehicles bw/boat_2', x: 605, y: 655, w: 130, style: 'P3' },
    ],
  },

  // F16 trace the dots: morning on Main Street (G1, P4 dots, one spacing)
  'dotted-street': {
    band: 'G1', style: 'P4',
    motifs: [
      { m: 'cloud', a: [320, 82, 120] },
      { m: 'ground', a: [4, 671, 422, 0, 1] },
      { m: 'ground', a: [4, 671, 562, 0, 1] },
    ],
    items: [
      // measured 20,659 px > the G1 budget 15,000: the contract's drop order (pigeon, then bicycle — its spokes crowd the
      // dots) + the buildings 8 % smaller; the bus moves clear of the kerb line (its roof sat 8 px under it)
      { src: 'travel and holiday bw/museum', x: 150, y: 420, h: 218 },
      { src: 'travel and holiday bw/hotel', x: 515, y: 420, h: 226 },
      { src: 'travel and holiday bw/signpost', x: 190, y: 562, h: 125 },
      { src: 'animals bw/dog', x: 470, y: 562, h: 102 },
      { src: 'vehicles bw/bus_2', x: 175, y: 708, h: 106 },
      { src: 'vehicles bw/car', x: 505, y: 700, w: 190 },
    ],
  },

  // F17 trace the picture, say its name, trace the word (G1; the words are each locale's own, from its bank)
  'picture-and-word': (words) => ({
    band: 'G1', style: 'P3', occlusion: false,
    decor: [{ m: 'roundRect', a: [14, 14, 316, 332, 18] }, { m: 'roundRect', a: [345, 14, 316, 332, 18] }, { m: 'roundRect', a: [14, 370, 316, 332, 18] }, { m: 'roundRect', a: [345, 370, 316, 332, 18] }],
    items: [
      { src: 'nature bw/sun', x: 172, y: 204, h: 165 },
      { src: 'nature bw/fish', x: 503, y: 204, w: 220 },
      { src: 'animals bw 4/cat', x: 172, y: 560, h: 165 },
      { src: 'fruits bw/apple', x: 503, y: 560, h: 165 },
    ],
    words: [
      { text: words[0], x: 38, y: 236, w: 268, h: 92 },
      { text: words[1], x: 369, y: 236, w: 268, h: 92 },
      { text: words[2], x: 38, y: 592, w: 268, h: 92 },
      { text: words[3], x: 369, y: 592, w: 268, h: 92 },
    ],
  }),

  // F18 trace it, then draw: the empty trailer (G1, the one open-ended face)
  'trace-and-draw': {
    band: 'G1', style: 'P3',
    motifs: [
      { m: 'sun', a: [90, 78, 38, 10] },
      { m: 'cloud', a: [450, 120, 200] },
      { m: 'ground', a: [14, 661, 272, 14, 2] },
      { m: 'line', a: [[[287, 505], [305, 505]]] },
      // low side walls (to y 440): the open load space above them is the drawing space (295 × 170 from y 320); walls up to
      // y 320 read as an empty cupboard frame, not a trailer (render read)
      { m: 'line', a: [[[305, 440], [305, 520], [600, 520], [600, 440]]] },
      { m: 'line', a: [[[305, 490], [600, 490]]] },
      { m: 'circle', a: [365, 545, 25] }, { m: 'circle', a: [540, 545, 25] },
      { m: 'line', a: [[[14, 570], [661, 570]]] },
    ],
    items: [
      { src: 'farm bw/tractor', x: 168, y: 570, h: 175 },
      { src: 'farm bw/goat', x: 120, y: 702, h: 112 },   // the contract's alternate: the pig is a cultural risk for some families (design A flag)
      { src: 'birds bw 2/goose', x: 335, y: 704, h: 115 },
      { src: 'farm bw/cow', x: 555, y: 702, h: 115 },
    ],
  },

  // F19 the other half: the open book (G1; split at each drawing's MEASURED symmetry axis)
  'other-half': {
    band: 'G1', style: 'P3', occlusion: false,
    decor: [
      { d: 'M337 22 Q180 18 24 34 L24 404 Q180 388 337 392 Z', w: 2.5 },
      { d: 'M338 22 Q495 18 651 34 L651 404 Q495 388 338 392 Z', w: 2.5 },
      { d: 'M596 22 L596 70 L604 60 L612 70 L612 22', w: 2, fill: SOLID },
      { d: 'M337.5 30 L337.5 388', w: 1, colour: '#777', dash: '8 3 2 3' },
      ...[18, 237, 456].map((x) => ({ d: 'M' + x + ' 706 L' + x + ' 520 A100 100 0 0 1 ' + (x + 200) + ' 520 L' + (x + 200) + ' 706 Z', w: 2.5 })),
      ...[118, 337, 556].map((x) => ({ d: 'M' + x + ' 432 L' + x + ' 694', w: 1, colour: '#777', dash: '8 3 2 3' })),
    ],
    items: [
      { src: 'Easter bw/butterfly', axisX: 337.5, y: 365, h: 290, render: 'half' },
      { src: 'animals bw/owl', axisX: 118, y: 690, h: 210, render: 'half' },
      { src: 'Easter bw/bell', axisX: 337, y: 690, h: 200, render: 'half' },   // the contract's Christmas bell measured 15.7 px between its halves (> the 10 px G1 gap)
      { src: 'faces bw/koala', axisX: 556, y: 690, h: 160, render: 'half' },
    ],
  },

  // F20 find and trace the hidden animals (G1, N = 5). The forest is SOLID traced lines (the halos can cut it) and BUSY:
  // the contract's two trees on white left the animals in plain sight (render read 2026-10-22) — three trees, fourteen
  // leaves over crowns and ground, mushrooms, flowers, a nest, grass. NO solid animal anywhere: the only animals on the page
  // are the five to find, so the count has one answer.
  'hidden-animals': {
    band: 'G1', style: 'P3', count: { n: 5 },
    motifs: [
      { m: 'ground', a: [14, 661, 560, 6, 3], render: 'solid' },
      { m: 'pathBand', a: [[[338, 716], [330, 640], [360, 600], [338, 562]], 110], render: 'solid' },
    ],
    decor: [{ m: 'grass', a: [90, 600, 26, 4], w: 2 }, { m: 'grass', a: [190, 585, 22, 4], w: 2 }, { m: 'grass', a: [300, 690, 24, 4], w: 2 }, { m: 'grass', a: [455, 700, 26, 4], w: 2 }, { m: 'grass', a: [600, 660, 22, 4], w: 2 }, { m: 'grass', a: [520, 590, 20, 4], w: 2 }],
    items: [
      // the back row (behind everything, solid): two more trees fill the sky band and make the forest busy (render read)
      { src: 'home and nature bw/tree', x: 330, y: 470, w: 290, render: 'solid', z: -5 },
      { src: 'home and nature bw/tree_3', x: 590, y: 300, w: 160, render: 'solid', z: -6 },
      { src: 'home and nature bw/tree_2', x: 110, y: 300, w: 170, render: 'solid', z: -6 },
      { src: 'nature bw/tree', x: 170, y: 560, w: 320, render: 'solid' },
      { src: 'nature bw/tree_2', x: 505, y: 545, w: 320, render: 'solid' },
      { src: 'nature bw/leaf', x: 80, y: 260, h: 40, render: 'model' },
      { src: 'home and nature bw/leaf', x: 250, y: 245, h: 36, flip: true, render: 'model' },
      { src: 'nature bw/leaf', x: 290, y: 330, h: 34, render: 'model' },
      { src: 'home and nature bw/leaf', x: 420, y: 230, h: 38, render: 'model' },
      { src: 'nature bw/leaf', x: 620, y: 250, h: 36, flip: true, render: 'model' },
      { src: 'home and nature bw/leaf', x: 470, y: 330, h: 34, flip: true, render: 'model' },
      { src: 'home and nature bw/leaf', x: 640, y: 360, h: 34, render: 'model' },
      { src: 'nature bw/leaf', x: 40, y: 470, h: 34, flip: true, render: 'model' },
      { src: 'home and nature bw/leaf', x: 265, y: 470, h: 36, render: 'model' },
      { src: 'nature bw/leaf', x: 560, y: 600, h: 32, render: 'model' },
      { src: 'home and nature bw/leaf', x: 380, y: 690, h: 34, flip: true, render: 'model' },
      { src: 'nature bw/leaf', x: 40, y: 708, h: 30, render: 'model' },
      { src: 'Easter bw/mushroom', x: 255, y: 702, h: 72, render: 'model' },
      { src: 'nature bw/mushroom', x: 520, y: 708, h: 64, render: 'model' },
      { src: 'vegetables bw 2/mushroom', x: 645, y: 706, h: 58, render: 'model' },
      { src: 'home bw 2/flower', x: 40, y: 640, h: 90, render: 'model' },
      { src: 'nature bw/flower', x: 175, y: 712, h: 96, render: 'model' },
      { src: 'animals bw 5/owl', x: 545, y: 270, h: 100, halo: 10, hidden: true },
      { src: 'animals bw/squirrel', x: 150, y: 330, h: 100, halo: 10, hidden: true },
      { src: 'animals bw 5/fox', x: 455, y: 640, h: 110, halo: 10, hidden: true },
      { src: 'animals bw 2/rabbit', x: 105, y: 706, h: 112, halo: 10, hidden: true },
      { src: 'animals bw 3/mouse', x: 590, y: 708, h: 85, halo: 10, hidden: true },
    ],
  },
};
for (const sc of Object.values(SCENES)) if (typeof sc === 'object') { sc.W = sc.W || 675; sc.H = sc.H || 716; }
/** the scene of a face for a locale (F17 is a function of the locale's four words) */
function sceneFor(mode, ctx = {}) {
  const sc = SCENES[mode];
  if (typeof sc !== 'function') return sc;
  const out = sc(ctx.words || ['sun', 'fish', 'cat', 'apple']); out.W = out.W || 675; out.H = out.H || 716; return out;
}
module.exports = { SCENES, sceneFor };
