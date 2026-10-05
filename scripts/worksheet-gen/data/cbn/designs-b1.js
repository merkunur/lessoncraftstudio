/**
 * data/cbn/designs-b1.js — Color by Number, batch 1 (2026-10-05): 10 scenes + 10 pictures.
 * Reviewed against docs/worksheet-gen/cbn-review-checklist.md; gated by tools/cbn-preview.js.
 */
'use strict';
const P = require('../../primitives/cbn-art/parts.js');
const Q = require('../../primitives/cbn-art/parts2.js');
const { ellipse, blob, rrect } = require('../../primitives/cbn-art/core.js');

const W = 600, H = 560;
/** a soft grassy mound a picture's character stands on */
const mound = (a, x, y, w, c = 'green', h = 34) => a.group('mound', () => a.region(blob([[x - w, y + h * 0.5], [x - w * 0.7, y - h * 0.5], [x, y - h * 0.8], [x + w * 0.7, y - h * 0.5], [x + w, y + h * 0.5], [x, y + h * 0.9]], 1), c, 'grass'));
const flakes = (a, pts) => pts.forEach(([x, y]) => a.at({ x, y }, (b) => Q.snowflake(b)));

const B1 = [
  /* ------------------------------------------------------------ pictures */
  { id: 'cat-yarn', kind: 'picture', level: 1, names: { en: 'Cat with Yarn' },
    draw(a) {
      a.at({ x: 270, y: 300, s: 1.55 }, (b) => Q.cat(b, 'orange', 'pink', 'none'));
      a.group('yarn', () => { a.region(ellipse(470, 456, 58, 56), 'blue', 'yarn ball'); a.line('M426 430Q470 400 512 440M420 462Q470 432 524 470M438 494Q476 470 516 498', 3); });
    } },
  { id: 'puppy-bowl', kind: 'picture', level: 1, names: { en: 'Puppy and Bowl' },
    draw(a) {
      a.at({ x: 250, y: 300, s: 1.55 }, (b) => Q.dog(b, 'yellow', 'brown', 'brown', 'red'));
      a.group('bowl', () => { a.region(blob([[400, 470], [540, 470], [524, 512], [416, 512]], 0.6), 'blue', 'bowl'); a.region(ellipse(470, 470, 70, 16), 'brown', 'food'); });
    } },
  { id: 'elephant-splash', kind: 'picture', level: 1, names: { en: 'Elephant Splash' },
    draw(a) {
      mound(a, 280, 470, 210);
      a.at({ x: 250, y: 330, s: 1.4 }, (b) => Q.elephant(b, 'grey', 'pink', true));
      [[500, 92], [548, 118], [462, 64], [530, 58]].forEach(([x, y], i) => a.group('drop', () => a.region(blob([[x, y - 26], [x + 17, y + 6], [x, y + 20], [x - 17, y + 6]], 1), 'lightblue', 'water drop')));
    } },
  { id: 'happy-frog', kind: 'picture', level: 1, names: { en: 'Happy Frog' },
    draw(a) {
      a.at({ x: 300, y: 474, s: 1.25 }, (b) => P.lilyPad(b, 'green', 96));   // wide enough for the frog to sit on
      a.at({ x: 300, y: 290, s: 1.6 }, (b) => Q.frog(b, 'lightgreen', 'yellow'));
    } },
  { id: 'busy-bee', kind: 'picture', level: 2, names: { en: 'Busy Bee' },
    draw(a) {
      mound(a, 440, 492, 110, 'lightgreen');
      // a bee is SMALLER than the flower it visits (it was three times the size); a real stem, not a stump — 2026-10-05
      a.at({ x: 440, y: 300, s: 1.5 }, (b) => P.flower(b, 'pink', 'orange', 'green', 30, 125));
      a.at({ x: 200, y: 190, s: 1.15 }, (b) => Q.bee(b, 'yellow', 'black', 'lightblue'));
    } },
  { id: 'smiling-snail', kind: 'picture', level: 1, names: { en: 'Smiling Snail' },
    draw(a) {
      mound(a, 300, 470, 240);
      a.at({ x: 290, y: 370, s: 1.55 }, (b) => Q.snail(b, 'purple', 'pink', 'yellow'));
    } },
  { id: 'little-penguin', kind: 'picture', level: 1, names: { en: 'Little Penguin' },
    draw(a) {
      a.group('ice', () => a.region(blob([[110, 500], [140, 452], [300, 440], [460, 452], [490, 500], [300, 530]], 1), 'lightblue', 'ice'));
      a.at({ x: 300, y: 300, s: 1.75 }, (b) => Q.penguin(b, 'black', 'none', 'orange'));
    } },
  { id: 'ice-cream', kind: 'picture', level: 1, names: { en: 'Ice Cream Cone' },
    draw(a) { a.at({ x: 300, y: 300, s: 1.45 }, (b) => Q.iceCream(b, 'orange', 'pink', 'brown', 'red')); } },
  { id: 'red-car', kind: 'picture', level: 2, names: { en: 'Little Red Car' },
    draw(a) {
      a.group('road', () => { a.region(rrect(10, 448, 580, 96, 40), 'lightgreen', 'grass verge'); a.region(rrect(40, 470, 520, 46, 22), 'grey', 'road'); a.line('M90 493H150M220 493H280M350 493H410M480 493H520', 3); });   // a road in a grass verge (a bare grey bar read as a floating platform) — 2026-10-05
      a.at({ x: 300, y: 380, s: 1.6 }, (b) => Q.car(b, 'red', 'lightblue', 'black', 'grey', 'yellow'));
      a.at({ x: 500, y: 110, s: 0.9 }, (b) => P.sun(b));
    } },
  { id: 'cupcake', kind: 'picture', level: 1, names: { en: 'Cupcake' },
    draw(a) { a.at({ x: 300, y: 320, s: 1.65 }, (b) => Q.cupcake(b, 'blue', 'pink', 'red')); } },

  /* ------------------------------------------------------------ scenes */
  { id: 'sailboat-beach', kind: 'scene', level: 2, names: { en: 'Sailboat at the Beach' },
    draw(a) {
      Q.beach(a, W, H, { horizon: 0.5 });
      a.at({ x: 500, y: 86, s: 0.9 }, (b) => P.sun(b));
      a.at({ x: 150, y: 80, s: 0.8 }, (b) => P.cloud(b));
      a.at({ x: 230, y: 330, s: 1.05 }, (b) => Q.sailboat(b, 'red', 'none', 'yellow', 'orange'));
      a.at({ x: 470, y: 500, s: 0.9 }, (b) => P.shell(b, 'pink'));
      a.at({ x: 110, y: 500, s: 0.9 }, (b) => P.shell(b, 'orange'));
    } },
  { id: 'snowman-day', kind: 'scene', level: 2, names: { en: 'Snowman Day' },
    draw(a) {
      Q.snow(a, W, H, { horizon: 0.62 });
      a.at({ x: 90, y: 330, s: 0.8 }, (b) => P.pineTree(b));
      a.at({ x: 520, y: 320, s: 0.75 }, (b) => P.pineTree(b));
      a.at({ x: 300, y: 330, s: 1.0 }, (b) => Q.snowman(b, 'none', 'black', 'red', 'orange'));
      flakes(a, [[80, 70], [180, 140], [460, 60], [530, 170], [400, 120], [120, 220]]);
    } },
  { id: 'balloon-ride', kind: 'scene', level: 2, names: { en: 'Hot Air Balloon' },
    draw(a) {
      P.meadow(a, W, H, { horizon: 0.8 });
      a.at({ x: 110, y: 90, s: 0.85 }, (b) => P.cloud(b));
      a.at({ x: 500, y: 190, s: 0.7 }, (b) => P.cloud(b));
      a.at({ x: 300, y: 178, s: 1.2 }, (b) => Q.balloon(b, 'red', 'yellow', 'brown'));   // flying, clear of the hill (its basket sat on it) — 2026-10-05
      a.at({ x: 500, y: 74, s: 0.8 }, (b) => P.sun(b));
    } },
  { id: 'frog-pond', kind: 'scene', level: 1, names: { en: 'Frog in the Pond' },
    draw(a) {
      // a pond big enough for the frog, its pad wholly IN the water (it hung over the bank) — 2026-10-05
      a.region(`M0 0H${W}V${H}H0Z`, 'lightblue', 'sky');
      a.region(`M0 ${H * 0.46}C${W * 0.3} ${H * 0.4} ${W * 0.7} ${H * 0.43} ${W} ${H * 0.47}V${H}H0Z`, 'green', 'grass bank');
      a.region('M20 432C20 330 580 330 580 432C580 540 20 540 20 432Z', 'blue', 'pond');
      a.at({ x: 490, y: 90, s: 0.9 }, (b) => P.sun(b));
      a.at({ x: 296, y: 448, s: 1.4 }, (b) => P.lilyPad(b, 'green', 64));
      a.at({ x: 296, y: 362, s: 1.0 }, (b) => Q.frog(b, 'lightgreen', 'yellow'));
    } },
  { id: 'bee-garden', kind: 'scene', level: 3, names: { en: 'Bee in the Garden' },
    draw(a) {
      a.region(`M0 0H${W}V${H}H0Z`, 'lightblue', 'sky');
      a.region(`M0 ${H * 0.64}C${W * 0.3} ${H * 0.6} ${W * 0.7} ${H * 0.62} ${W} ${H * 0.64}V${H}H0Z`, 'lightgreen', 'grass');   // one grass, light: the green stems and leaves stay visible
      a.at({ x: 80, y: 80, s: 0.8 }, (b) => P.sun(b));
      // the flowers are taller than the bee and the butterfly that visit them (the bee was twice a flower's size) — 2026-10-05
      a.at({ x: 112, y: 320, s: 1.3 }, (b) => P.flower(b, 'red', 'yellow', 'green', 32, 120));
      a.at({ x: 488, y: 330, s: 1.3 }, (b) => P.flower(b, 'purple', 'yellow', 'green', 32, 112));
      a.at({ x: 300, y: 378, s: 1.2 }, (b) => P.flower(b, 'pink', 'yellow', 'green', 32, 100));
      a.at({ x: 262, y: 190, s: 1.02 }, (b) => Q.bee(b, 'yellow', 'black', 'none'));   // white wings: light blue vanished into the sky
      a.at({ x: 478, y: 170, s: 0.74 }, (b) => P.butterfly(b, 'pink', 'yellow', 'purple'));
    } },
  { id: 'penguins-ice', kind: 'scene', level: 1, names: { en: 'Penguins on the Ice' },
    draw(a) {
      Q.snow(a, W, H, { horizon: 0.66 });
      a.at({ x: 480, y: 90, s: 0.9 }, (b) => P.sun(b));
      a.at({ x: 200, y: 330, s: 1.3 }, (b) => Q.penguin(b, 'black', 'none', 'orange'));
      a.at({ x: 420, y: 380, s: 1.05 }, (b) => Q.penguin(b, 'black', 'none', 'orange'));
    } },
  { id: 'car-trip', kind: 'scene', level: 3, names: { en: 'Car Trip' },
    draw(a) {
      Q.road(a, W, H, { horizon: 0.56 });
      a.at({ x: 520, y: 74, s: 0.8 }, (b) => P.sun(b));   // clear of the roof — 2026-10-05
      a.at({ x: 360, y: 70, s: 0.7 }, (b) => P.cloud(b));
      a.at({ x: 150, y: 200, s: 1.0 }, (b) => P.house(b, 'yellow', 'red', 'brown', 'lightblue', false));
      a.at({ x: 470, y: 260, s: 0.75 }, (b) => P.tree(b));
      a.at({ x: 340, y: 418, s: 1.12 }, (b) => Q.car(b, 'blue', 'lightblue', 'black', 'grey', 'yellow'));   // smaller than the house — 2026-10-05
    } },
  { id: 'kite-day', kind: 'scene', level: 2, names: { en: 'Kite Day' },
    draw(a) {
      P.meadow(a, W, H, { horizon: 0.66 });
      a.at({ x: 500, y: 80, s: 0.8 }, (b) => P.sun(b));
      a.at({ x: 130, y: 90, s: 0.75 }, (b) => P.cloud(b));
      a.at({ x: 300, y: 126, s: 0.85, r: 14 }, (b) => Q.kite(b, 'red', 'yellow', 'blue', true));   // the string runs out of the picture to the child holding it (it ended in the grass) — 2026-10-05
      a.at({ x: 480, y: 360, s: 0.85 }, (b) => P.tree(b));
      a.at({ x: 120, y: 500, s: 0.9 }, (b) => P.bush(b, 'lightgreen'));
    } },
  { id: 'ladybird-meadow', kind: 'scene', level: 3, names: { en: 'Ladybug in the Meadow' },
    draw(a) {
      P.meadow(a, W, H, { horizon: 0.5, far: 'green', near: 'lightgreen' });
      a.at({ x: 500, y: 80, s: 0.85 }, (b) => P.sun(b));
      a.at({ x: 140, y: 80, s: 0.8 }, (b) => P.cloud(b));
      // a SMALL ladybug on a big leaf among tall flowers (it was bigger than the flowers) — 2026-10-05
      a.at({ x: 100, y: 330, s: 1.3 }, (b) => P.flower(b, 'pink', 'yellow', 'green', 28, 120));
      a.at({ x: 504, y: 340, s: 1.3 }, (b) => P.flower(b, 'purple', 'yellow', 'green', 28, 112));
      a.group('leaf', () => { a.region('M150 512C150 380 340 330 460 392C420 490 300 540 150 512Z', 'green', 'big leaf'); a.line('M200 494Q300 440 420 400', 2.6); });   // the vein stops short of the leaf's edge
      a.at({ x: 304, y: 420, s: 0.72, r: -16 }, (b) => Q.ladybird(b, 'red', 'black'));
    } },
  { id: 'whale-hello', kind: 'scene', level: 1, names: { en: 'Hello, Whale!' },
    draw(a) {
      a.region(`M0 0H${W}V${H}H0Z`, 'lightblue', 'sky');
      a.region(`M0 ${H * 0.42}C${W * 0.3} ${H * 0.38} ${W * 0.6} ${H * 0.46} ${W} ${H * 0.42}V${H}H0Z`, 'blue', 'sea');
      a.at({ x: 480, y: 80, s: 0.85 }, (b) => P.sun(b));
      a.at({ x: 140, y: 80, s: 0.8 }, (b) => P.cloud(b));
      a.at({ x: 300, y: 300, s: 1.3 }, (b) => Q.whale(b, 'grey', 'none', false));   // its back above the surface: the spout is in the air
      // the near water in front of its belly: the whale swims IN the sea, not on top of it
      a.region('M0 372Q75 350 150 372T300 372T450 372T600 372V560H0Z', 'blue', 'sea');
      a.line('M60 440q20 -12 40 0M420 470q20 -12 40 0M250 500q20 -12 40 0', 3);
    } },
];

module.exports = { B1 };
