/**
 * data/ptx/scenes-K420.js — K-420 "Look, then trace" Level Set copies (ptl): a framed solid MODEL with the eye badge, an
 * arrow, and the SAME drawing dashed beside it (same orientation, never mirrored), one pair per row.
 * Concepts: _work/ptl-scenes-A.json (Designer A); levels _work/ptl-levels.md §K-420: L1 PreK-1 · L2 PreK (published band) —
 * 2 rows; L3 PreK-3 — 3 rows (smaller twins). The row geometry for 2 rows is the published page's, scaled for 3.
 */
'use strict';
const { helpers: H } = require('../b9/face-scenes.js');
// L1 twins are 300-320 px in this layout (ptl-levels.md §K-420), under the generic PreK-1 floor of 340
const BAND = { 1: { band: 'PreK-1', style: 'P1', minPicFloor: 290, budget: 3200 }, 2: { band: 'PreK', style: 'P1' }, 3: { band: 'PreK-3', style: 'P2' } };
/** n rows of (model frame, eye badge, arrow, dashed twin), the published 2-row geometry scaled to n rows */
function rows(srcs, level, scale = 1) {
  const n = srcs.length, P = 716 / n, k = P / 358;
  const decor = [], items = [];
  srcs.forEach((src, i) => {
    const top = 22 + i * P * (n === 2 ? 1 : 1);
    const fw = 230 * (n === 2 ? 1 : 0.8), fh = 296 * k, fx = 20;
    const cx = fx + fw / 2;
    decor.push({ m: 'roundRect', a: [fx, top, fw, fh, 10] }, { d: `M${fx} ${top + fh - 26 * k} L${fx + fw} ${top + fh - 26 * k}`, w: 2.5 });
    decor.push(...H.badge(cx, top, 'eye'));
    decor.push({ m: 'glyph.arrow', a: [fx + fw + 50, top + 158 * k, 34 * (n === 2 ? 1 : 0.85)], w: 4 });
    if (i < n - 1) decor.push({ d: `M20 ${top + P - 22} L655 ${top + P - 22}`, w: 1.5 });
    // fitted, not sized by height: a wide drawing sized by height ran out of its frame and off the page
    const mTop = top + 26, mBot = top + fh - 26 * k - 10;
    items.push({ src, x: cx, y: (mTop + mBot) / 2, fitBox: [fw - 34, mBot - mTop], anchor: 'centre', render: 'model' });
    const tx0 = fx + fw + 90, tx1 = 655, ty0 = top + 8, ty1 = top + P - 26;
    items.push({ src, x: (tx0 + tx1) / 2, y: (ty0 + ty1) / 2, fitBox: [(tx1 - tx0) * scale, Math.min(ty1 - ty0, 300 * k) * scale], anchor: 'centre', start: 'top', outline: level === 1 });   // L1: a simple silhouette to trace (ptl-levels.md), inner lines drawn
  });
  return { decor, items };
}
const copy = (id, level, name, srcs, scale) => ({ id: 'ptx-K-420-' + id, face: 'K-420', level, name: { en: name }, skin: () => ({ ...BAND[level], ...rows(srcs, level, scale) }) });
const SCENES = [
  copy('garden-bugs', 1, 'Ladybug and Butterfly', ['nature bw/ladybug', 'Easter bw/butterfly']),
  copy('tea-party', 1, 'Teapot and Cup', ['kitchen bw/teapot', 'home and nature bw/teacup']),
  copy('sky-flyers', 1, 'Plane and Helicopter', ['vehicles bw 2/airplane', 'vehicles bw 2/helicopter_2']),
  copy('pond-pals', 1, 'Frog and Swan', ['animals bw/frog', 'animals bw/swan']),
  copy('fruit-bowl', 1, 'Banana and Cherries', ['fruits bw/banana', 'fruits bw/cherry']),
  copy('farm-babies', 2, 'Chick and Kitten', ['animals bw 4/chick', 'animals bw 4/cat']),
  copy('seaside-rocks', 2, 'Seal and Turtle', ['sea life bw 2/seal', 'sea life bw 2/turtle']),
  copy('woodland', 2, 'Owl and Hedgehog', ['animals bw/owl', 'animals bw 5/hedgehog']),
  copy('under-sea', 2, 'Shark and Fish', ['animals bw 5/shark', 'animals bw 5/fish']),   // the octopus's arms were over the PreK budget
  copy('safari', 2, 'Camel and Hippo', ['animals bw/camel_2', 'animals bw 5/hippopotamus']),   // every giraffe is over the PreK budget
  copy('dino-valley', 3, 'Three Dinosaurs', ['animals bw/tyrannosaurus_rex', 'animals bw 3/dinosaur', 'animals bw 5/dinosaur_2']),
  copy('jungle', 3, 'Monkey, Toucan and Snake', ['animals bw/monkey', 'birds bw 2/toucan', 'animals bw 5/snake']),
  copy('toy-shelf', 3, 'Rocking Horse, Robot and Teddy', ['toys bw/rocking_horse', 'toys bw 2/robot', 'toys bw/teddy_bear']),
  copy('pet-shop', 3, 'Puppy, Bunny and Hamster', ['animals bw 5/dog', 'animals bw/rabbit', 'animals bw 5/hamster']),
  copy('on-the-road', 3, 'Bus, Ambulance and Car', ['vehicles bw/bus', 'vehicles bw 3/ambulance', 'vehicles bw 2/car'], 0.9),   // the fire engine + police car were 9,000 px of tracing
];
module.exports = { SCENES };
