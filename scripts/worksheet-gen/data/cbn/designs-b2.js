/**
 * data/cbn/designs-b2.js — Color by Number, batch 2 (2026-10-05): 10 scenes + 10 pictures (pictures lean to
 * levels 2-3). Reviewed against docs/worksheet-gen/cbn-review-checklist.md; gated by tools/cbn-preview.js.
 */
'use strict';
const P = require('../../primitives/cbn-art/parts.js');
const Q = require('../../primitives/cbn-art/parts2.js');
const R = require('../../primitives/cbn-art/parts3.js');
const V = require('../../primitives/cbn-art/v2.js');
const { blob, rrect, ellipse } = require('../../primitives/cbn-art/core.js');

const W = 600, H = 560;
const mound = (a, x, y, w, c = 'green', h = 34) => a.group('mound', () => a.region(blob([[x - w, y + h * 0.5], [x - w * 0.7, y - h * 0.5], [x, y - h * 0.8], [x + w * 0.7, y - h * 0.5], [x + w, y + h * 0.5], [x, y + h * 0.9]], 1), c, 'grass'));
const stars = (a, pts, c = 'yellow') => pts.forEach(([x, y, s]) => a.at({ x, y, s: s || 0.8 }, (b) => P.star5(b, c)));
const savanna = (a, horizon = 0.6) => { a.region(`M0 0H${W}V${H}H0Z`, 'lightblue', 'sky'); a.region(`M0 ${H * horizon}C${W * 0.3} ${H * horizon - 30} ${W * 0.7} ${H * horizon - 10} ${W} ${H * horizon}V${H}H0Z`, 'yellow', 'dry grass'); };

const B2 = [
  /* ------------------------------------------------------------ pictures */
  { id: 'teddy-bear', kind: 'picture', level: 1, names: { en: 'Teddy Bear' },
    draw(a) { a.at({ x: 300, y: 330, s: 1.5 }, (b) => R.teddy(b, 'brown', 'orange', 'red')); } },
  { id: 'lion-flowers', kind: 'picture', level: 2, names: { en: 'Lion and Flowers' },
    draw(a) {
      mound(a, 300, 480, 250);
      a.at({ x: 110, y: 420, s: 0.95 }, (b) => P.flower(b, 'pink', 'yellow', 'green', 25));
      a.at({ x: 500, y: 420, s: 0.95 }, (b) => P.flower(b, 'purple', 'yellow', 'green', 25));
      a.at({ x: 290, y: 300, s: 1.4 }, (b) => R.lion(b, 'orange', 'yellow', 'none'));
    } },
  { id: 'tall-giraffe', kind: 'picture', level: 2, names: { en: 'Tall Giraffe' },
    draw(a) {
      // v2 one-silhouette giraffe (horns rooted in the head), a yellow sun — 2026-10-05
      mound(a, 300, 512, 250);
      a.at({ x: 494, y: 470, s: 0.7 }, (b) => P.bush(b, 'lightgreen'));
      a.at({ x: 236, y: 512, s: 0.95 }, (b) => V.giraffe(b, 'yellow', 'brown', 'brown'));
      a.at({ x: 90, y: 90, s: 0.8 }, (b) => P.sun(b, 'yellow'));
      a.at({ x: 100, y: 300, s: 0.75 }, (b) => P.butterfly(b, 'purple', 'yellow', 'purple'));
    } },
  { id: 'hen-nest', kind: 'picture', level: 1, names: { en: 'Hen on Her Nest' },
    draw(a) {
      // the hen SITS IN a bowl-shaped straw nest (drawn over her lower body), with two eggs peeking out
      a.at({ x: 300, y: 320, s: 1.45 }, (b) => R.hen(b, 'none', 'red', 'orange'));
      a.group('eggs', () => { a.region(ellipse(156, 392, 26, 32), 'lightblue', 'egg'); a.region(ellipse(196, 396, 26, 32), 'lightblue', 'egg'); });
      a.group('nest', () => { a.region('M100 400Q300 430 500 400Q490 500 300 506Q110 500 100 400Z', 'yellow', 'nest'); a.line('M160 446q40 14 80 0M260 458q40 14 80 0M360 446q40 14 80 0', 2.6); });
    } },
  { id: 'goldfish-bowl', kind: 'picture', level: 2, names: { en: 'Goldfish Bowl' },
    draw(a) {
      a.group('table', () => a.region(rrect(80, 514, 440, 34, 10), 'brown', 'table'));   // the bowl stands ON the table (it hung in front of it) — 2026-10-05
      a.at({ x: 300, y: 330, s: 1.55 }, (b) => R.fishbowl(b, 'lightblue', 'orange', 'yellow', 'purple', 'green'));
    } },
  { id: 'friendly-robot', kind: 'picture', level: 2, names: { en: 'Friendly Robot' },
    draw(a) { a.at({ x: 300, y: 300, s: 1.45 }, (b) => R.robot(b, 'grey', 'blue', 'yellow', 'red', 'green', 'purple')); } },
  { id: 'fairy-castle', kind: 'picture', level: 3, names: { en: 'Castle' },
    draw(a) {
      mound(a, 300, 490, 270, 'green', 40);
      a.at({ x: 300, y: 320, s: 1.25 }, (b) => R.castle(b, 'grey', 'blue', 'red', 'brown'));
    } },
  { id: 'toy-train', kind: 'picture', level: 3, names: { en: 'Toy Train' },
    draw(a) {
      a.group('track', () => a.region(rrect(14, 356 + R.TRAIN_RAIL_TOP * 1.2, 572, 30, 8), 'brown', 'track'));
      a.at({ x: 425, y: 356, s: 1.2 }, (b) => R.train(b, 'red', 'blue', 'yellow', 'green', 'black', 'none'));
    } },
  { id: 'birthday-cake', kind: 'picture', level: 3, names: { en: 'Birthday Cake' },
    draw(a) { a.at({ x: 300, y: 330, s: 1.45 }, (b) => R.cake(b, 'pink', 'yellow', 'none', 'blue', 'orange', 'lightblue')); } },
  { id: 'fruit-bowl', kind: 'picture', level: 3, names: { en: 'Bowl of Fruit' },
    draw(a) { a.at({ x: 300, y: 320, s: 1.6 }, (b) => R.fruitBowl(b, 'blue', 'red', 'yellow', 'lightgreen', 'purple', 'orange')); } },

  /* ------------------------------------------------------------ scenes */
  { id: 'red-barn', kind: 'scene', level: 3, names: { en: 'The Red Barn' },
    draw(a) {
      P.meadow(a, W, H, { horizon: 0.5 });
      a.at({ x: 90, y: 74, s: 0.8 }, (b) => P.sun(b));
      a.at({ x: 380, y: 70, s: 0.75 }, (b) => P.cloud(b));
      a.at({ x: 200, y: 250, s: 0.95 }, (b) => R.barn(b, 'red', 'brown', 'none', 'yellow'));   // the hay window shows hay (a white disc read as a hole) — 2026-10-05
      a.at({ x: 420, y: 458, s: 1.0 }, (b) => Q.pig(b, 'pink', 'pink'));
      a.at({ x: 140, y: 440, s: 1.0 }, (b) => R.hen(b, 'none', 'red', 'orange'));
    } },
  { id: 'hen-chicks', kind: 'scene', level: 2, names: { en: 'Hen and Chicks' },
    draw(a) {
      P.meadow(a, W, H, { horizon: 0.42 });
      a.at({ x: 500, y: 76, s: 0.85 }, (b) => P.sun(b));
      a.at({ x: 14, y: 196, s: 0.9 }, (b) => P.fence(b, 3, 'brown', 70));
      // chicks are SMALL beside their mother (they were as big as the hen) — 2026-10-05
      a.at({ x: 210, y: 380, s: 1.25 }, (b) => R.hen(b, 'none', 'red', 'orange'));
      a.at({ x: 410, y: 462, s: 0.76 }, (b) => Q.chick(b, 'yellow', 'orange'));
      a.at({ x: 522, y: 470, s: 0.76, fx: true }, (b) => Q.chick(b, 'yellow', 'orange'));
    } },
  { id: 'rainy-day', kind: 'scene', level: 2, names: { en: 'Rainy Day' },
    draw(a) {
      P.meadow(a, W, H, { horizon: 0.62 });
      a.at({ x: 160, y: 86, s: 0.95 }, (b) => P.cloud(b, 'grey'));
      a.at({ x: 430, y: 70, s: 0.85 }, (b) => P.cloud(b, 'grey'));
      [[90, 200], [170, 240], [250, 190], [400, 180], [480, 230], [550, 170], [120, 300]].forEach(([x, y]) => a.at({ x, y }, (b) => R.raindrop(b, 'blue')));   // none on the duck
      // the duck floats IN a pond that fits it (it sat on a puddle smaller than itself) — 2026-10-05
      a.region('M40 470C40 400 580 400 580 470C580 545 40 545 40 470Z', 'blue', 'pond');
      a.at({ x: 330, y: 494, s: 0.95 }, (b) => V.duck(b, 'yellow', 'orange'));
    } },
  { id: 'castle-hill', kind: 'scene', level: 3, names: { en: 'Castle on the Hill' },
    draw(a) {
      P.meadow(a, W, H, { horizon: 0.62 });
      a.at({ x: 562, y: 236, s: 0.62 }, (b) => P.sun(b));   // clear of the flags and the tower
      a.at({ x: 120, y: 70, s: 0.7 }, (b) => P.cloud(b));
      a.at({ x: 300, y: 290, s: 1.08 }, (b) => R.castle(b, 'grey', 'purple', 'red', 'brown'));
      a.at({ x: 76, y: 440, s: 0.62 }, (b) => P.tree(b, 'green'));   // whole trees on the hill (the bottom edge cut them)
      a.at({ x: 524, y: 444, s: 0.62 }, (b) => P.tree(b, 'green'));
    } },
  { id: 'train-hills', kind: 'scene', level: 3, names: { en: 'Train in the Hills' },
    draw(a) {
      a.region(`M0 0H${W}V${H}H0Z`, 'lightblue', 'sky');
      a.region(`M0 ${H * 0.5}C${W * 0.3} ${H * 0.44} ${W * 0.7} ${H * 0.48} ${W} ${H * 0.46}V${H}H0Z`, 'green', 'grass');
      a.at({ x: 90, y: 76, s: 0.8 }, (b) => P.sun(b));
      a.at({ x: 360, y: 80, s: 0.75 }, (b) => P.cloud(b));
      // rails: their top meets the wheels (R.TRAIN_RAIL_TOP below the train's origin)
      a.group('track', () => a.region(`M-10 ${380 + R.TRAIN_RAIL_TOP * 1.15}H610V${380 + R.TRAIN_RAIL_TOP * 1.15 + 26}H-10Z`, 'brown', 'rails'), { edgeOk: true });
      a.at({ x: 400, y: 380, s: 1.15 }, (b) => R.train(b, 'red', 'blue', 'yellow', 'blue', 'black', 'none'));
    } },
  { id: 'lion-savanna', kind: 'scene', level: 2, names: { en: 'Lion on the Savanna' },
    draw(a) {
      savanna(a, 0.58);
      // a yellow sun; the tree taller than the lion (the lion was nearly as tall as the tree) — 2026-10-05
      a.at({ x: 510, y: 78, s: 0.8 }, (b) => P.sun(b, 'yellow'));
      a.at({ x: 150, y: 226, s: 1.2 }, (b) => R.acacia(b));
      a.at({ x: 404, y: 404, s: 0.92 }, (b) => R.lion(b, 'brown', 'orange', 'none'));
    } },
  { id: 'giraffe-savanna', kind: 'scene', level: 2, names: { en: 'Giraffe and Tree' },
    draw(a) {
      // v2 (2026-10-05 quality pass): the giraffe is ONE silhouette; yellow sun; green savanna; the tree whole
      a.region(`M0 0H${W}V${H}H0Z`, 'lightblue', 'sky');
      a.region(`M0 ${H * 0.7}C${W * 0.3} ${H * 0.7 - 24} ${W * 0.7} ${H * 0.7 - 8} ${W} ${H * 0.68}V${H}H0Z`, 'lightgreen', 'savanna');
      a.at({ x: 86, y: 84, s: 0.8 }, (b) => P.sun(b, 'yellow'));
      a.at({ x: 452, y: 262, s: 0.8 }, (b) => R.acacia(b));
      a.at({ x: 196, y: 520, s: 1.0 }, (b) => V.giraffe(b, 'yellow', 'brown', 'brown'));
    } },
  { id: 'palm-island', kind: 'scene', level: 2, names: { en: 'Palm Tree Island' },
    draw(a) {
      a.region(`M0 0H${W}V${H}H0Z`, 'lightblue', 'sky');
      a.region(`M0 ${H * 0.55}H${W}V${H}H0Z`, 'blue', 'sea');
      a.at({ x: 500, y: 80, s: 0.85 }, (b) => P.sun(b));
      a.group('island', () => a.region(blob([[60, 470], [140, 400], [300, 380], [440, 410], [520, 470], [300, 500]], 1), 'yellow', 'sand'));
      a.at({ x: 280, y: 250, s: 1.0 }, (b) => R.palmTree(b, 'green', 'brown', 'brown'));
      a.at({ x: 120, y: 90, s: 0.75 }, (b) => P.cloud(b));
    } },
  { id: 'robot-moon', kind: 'scene', level: 2, names: { en: 'Robot on the Moon' },
    draw(a) {
      P.space(a, W, H, { sky: 'blue' });
      a.region(`M0 ${H * 0.72}C${W * 0.3} ${H * 0.66} ${W * 0.7} ${H * 0.7} ${W} ${H * 0.66}V${H}H0Z`, 'grey', 'moon ground');
      a.group('crater', () => a.region('M70 500a40 14 0 1 0 80 0a40 14 0 1 0 -80 0Z', 'grey', 'crater'));
      a.at({ x: 494, y: 104, s: 1.05 }, (b) => P.planet(b, 'orange', 'pink'));   // clear of the robot's head
      stars(a, [[80, 70, 1], [210, 56, 1], [520, 250, 1], [80, 250, 1]]);
      a.at({ x: 300, y: 300, s: 1.3 }, (b) => R.robot(b, 'lightblue', 'red', 'yellow', 'red'));
    } },
  { id: 'night-owl', kind: 'scene', level: 2, names: { en: 'Owl at Night' },
    draw(a) {
      P.space(a, W, H, { sky: 'blue' });
      a.at({ x: 470, y: 100, s: 1.1 }, (b) => P.moon(b));
      stars(a, [[80, 80, 1], [80, 250, 1], [330, 60, 1], [550, 250, 1]]);
      a.group('branch', () => {
        a.region('M-10 400Q200 380 440 420L440 452Q200 422 -10 444Z', 'brown', 'branch');
        a.at({ x: 440, y: 436, r: -20 }, (c) => c.region('M0 0Q30 -40 84 -26Q50 14 0 0Z', 'green', 'leaf'));
        a.at({ x: 380, y: 420, r: 30 }, (c) => c.region('M0 0Q30 -40 84 -26Q50 14 0 0Z', 'green', 'leaf'));
        a.at({ x: 80, y: 404, r: 150 }, (c) => c.region('M0 0Q30 -40 84 -26Q50 14 0 0Z', 'green', 'leaf'));
      }, { edgeOk: true });
      a.at({ x: 240, y: 268, s: 1.38 }, (b) => P.owl(b, 'brown', 'yellow', 'none', 'orange'));
    } },
];

module.exports = { B2 };
