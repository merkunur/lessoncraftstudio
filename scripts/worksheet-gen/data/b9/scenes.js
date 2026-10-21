/**
 * data/b9/scenes.js — the Picture Tracing scenes (b9). Authored in page px on the 675 × H body (lib/pt-scene.js).
 * Every library drawing is a B&W drawing from _SUBSTRATE-POOL.md; every motif is lib/pt-motifs.js.
 */
'use strict';
const SCENES = {
  'test-prek': {
    W: 675, H: 716, style: 'P1', band: 'PreK', occlusion: false,
    items: [
      { src: 'fruits bw/apple', x: 180, y: 360, h: 330 },
      { src: 'sea life bw/whale', x: 337, y: 700, w: 600 },
    ],
  },
  'test-start': {
    W: 675, H: 716, style: 'P2', band: 'K', occlusion: false,
    items: [
      { src: 'Easter bw/gift', x: 170, y: 330, h: 260, start: 'lines' },
      { src: 'Christmas bw/stocking', x: 500, y: 330, h: 280, start: 'lines' },
      { src: 'Easter bw/bell', x: 337, y: 700, h: 300, start: 'picture', style: 'P1', band: 'PreK' },
    ],
  },
  // engine test: model + guide twin (#3) and a half-solid symmetric drawing (#12)
  'test-modes': {
    W: 675, H: 716, style: 'P2', band: 'K', occlusion: false,
    decor: [{ m: 'roundRect', a: [20, 20, 290, 300, 16] }, { d: 'M337 380 L337 700', w: 1.2, dash: '8 3 2 3', colour: '#555' }],
    items: [
      { src: 'Easter bw/bunny', x: 165, y: 290, h: 220, render: 'model' },
      { src: 'vehicles bw/bus', x: 500, y: 690, h: 150, render: 'part', part: { x0: 0, y0: 0.62, x1: 1, y1: 1 } },
      { src: 'Easter bw/bunny', x: 500, y: 300, h: 260 },
      { src: 'Easter bw/butterfly', x: 190, y: 690, h: 260, render: 'half', split: 190, style: 'P3', band: 'G1' },
    ],
  },
  // design B #1 "the path to the door" (docs/worksheet-gen/b9-designs/_work/design-B.md), verbatim placement
  'b1-path-to-door': {
    W: 675, H: 716, style: 'P2', band: 'K',
    motifs: [
      { m: 'cloud', a: [165, 128, 190] },
      { m: 'sun', a: [590, 82, 40, 10] },
      { m: 'ground', a: [14, 661, 470, 6, 3] },
      { m: 'pathBand', a: [[[338, 716], [300, 640], [250, 560], [215, 474]], 120] },
      { m: 'grass', a: [420, 700, 26, 3] }, { m: 'grass', a: [610, 702, 24, 3] }, { m: 'grass', a: [40, 560, 22, 3] },
    ],
    items: [
      { src: 'home and nature bw/house', x: 205, y: 472, h: 250 },
      { src: 'home and nature bw/tree', x: 545, y: 480, h: 312 },
      { src: 'nature bw/butterfly', x: 400, y: 300, w: 130 },
      { src: 'nature bw/flower', x: 95, y: 702, h: 170 },
      { src: 'nature bw/flower', x: 175, y: 700, h: 150, flip: true },
      { src: 'animals bw 5/rabbit', x: 520, y: 702, h: 150 },
    ],
  },
  // prototype (studio pending): a sunny garden — house, tree, sun, cloud, butterfly, flowers, bunny, mushrooms on a meadow
  'proto-garden': {
    W: 675, H: 716, style: 'P2', band: 'K',
    motifs: [
      { m: 'hill', a: [-30, 400, 380, 90] },
      { m: 'hill', a: [330, 705, 440, 70] },
      { m: 'ground', a: [6, 669, 452, 4, 4] },
      { m: 'grass', a: [40, 600, 26, 3] }, { m: 'grass', a: [300, 690, 22, 3] }, { m: 'grass', a: [640, 610, 24, 3] },
    ],
    items: [
      { src: 'nature bw/sun', x: 92, y: 150, h: 120 },
      { src: 'home and nature bw/cloud', x: 330, y: 120, w: 160 },
      { src: 'home and nature bw/cloud', x: 565, y: 160, w: 120, flip: true },
      { src: 'home and nature bw/house', x: 185, y: 462, h: 270 },
      { src: 'home and nature bw/tree', x: 525, y: 470, h: 310 },
      { src: 'Easter bw/butterfly', x: 365, y: 300, h: 72 },
      { src: 'nature bw/flower', x: 385, y: 610, h: 120 },
      { src: 'farm bw/rabbit', x: 500, y: 700, h: 140 },
      { src: 'Easter bw/mushroom', x: 625, y: 700, h: 78 },
      { src: 'nature bw/ladybug', x: 145, y: 680, h: 58 },
    ],
  },
};
module.exports = { SCENES };
