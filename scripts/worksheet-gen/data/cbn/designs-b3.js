/**
 * data/cbn/designs-b3.js — Color by Number, batch 3 (2026-10-05): 10 scenes (mostly level 1) + 10 pictures (mostly
 * levels 2-3). Reviewed against docs/worksheet-gen/cbn-review-checklist.md; gated by tools/cbn-preview.js.
 */
'use strict';
const P = require('../../primitives/cbn-art/parts.js');
const Q = require('../../primitives/cbn-art/parts2.js');
const R = require('../../primitives/cbn-art/parts3.js');
const S = require('../../primitives/cbn-art/parts4.js');
const { blob, rrect, ellipse, circle } = require('../../primitives/cbn-art/core.js');

const W = 600, H = 560;
const mound = (a, x, y, w, c = 'green', h = 34) => a.group('mound', () => a.region(blob([[x - w, y + h * 0.5], [x - w * 0.7, y - h * 0.5], [x, y - h * 0.8], [x + w * 0.7, y - h * 0.5], [x + w, y + h * 0.5], [x, y + h * 0.9]], 1), c, 'grass'));
const skyGrass = (a, horizon = 0.6, sky = 'lightblue', grass = 'green') => { a.region(`M0 0H${W}V${H}H0Z`, sky, 'sky'); a.region(`M0 ${H * horizon}C${W * 0.3} ${H * horizon - 34} ${W * 0.7} ${H * horizon - 14} ${W} ${H * horizon}V${H}H0Z`, grass, 'grass'); };
const stars = (a, pts, c = 'yellow') => pts.forEach(([x, y, s]) => a.at({ x, y, s: s || 1 }, (b) => P.star5(b, c)));
const gull = (a, x, y, s = 1) => a.line(`M${x - 18 * s} ${y}q${9 * s} ${-12 * s} ${18 * s} 0q${9 * s} ${-12 * s} ${18 * s} 0`, 3);

const B3 = [
  /* ------------------------------------------------------------ pictures */
  { id: 'unicorn', kind: 'picture', level: 2, names: { en: 'Unicorn' },
    draw(a) {
      mound(a, 300, 492, 250);
      a.at({ x: 290, y: 330, s: 1.2 }, (b) => S.unicorn(b, 'none', ['pink', 'purple', 'blue'], 'yellow', 'purple'));
    } },
  { id: 'parrot', kind: 'picture', level: 2, names: { en: 'Parrot' },
    draw(a) {
      a.group('branch', () => {
        a.region('M70 370Q300 350 540 380L540 408Q300 380 70 398Z', 'brown', 'branch');
        a.at({ x: 520, y: 390, r: -30 }, (c) => c.region('M0 0Q30 -40 84 -26Q50 14 0 0Z', 'green', 'leaf'));
        a.at({ x: 100, y: 384, r: 160 }, (c) => c.region('M0 0Q30 -40 84 -26Q50 14 0 0Z', 'green', 'leaf'));
      });
      a.at({ x: 300, y: 318, s: 1.3 }, (b) => S.parrot(b, 'red', 'blue', 'green', 'yellow', 'none', false));   // in front of the branch: the branch would cut its tail
    } },
  { id: 'airplane', kind: 'picture', level: 2, names: { en: 'Airplane' },
    draw(a) {
      a.at({ x: 120, y: 120, s: 0.8 }, (b) => P.cloud(b));
      a.at({ x: 470, y: 440, s: 0.8 }, (b) => P.cloud(b));
      a.at({ x: 490, y: 110, s: 0.9 }, (b) => P.sun(b));
      a.at({ x: 300, y: 290, s: 1.5 }, (b) => S.airplane(b, 'red', 'blue', 'lightblue', 'orange'));
    } },
  { id: 'school-bus', kind: 'picture', level: 3, names: { en: 'School Bus' },
    draw(a) {
      a.group('road', () => a.region(rrect(30, 430, 540, 40, 10), 'grey', 'road'));
      a.at({ x: 300, y: 340, s: 1.55 }, (b) => S.bus(b, 'yellow', 'lightblue', 'red', 'black', 'grey', 'orange'));
      a.at({ x: 500, y: 90, s: 0.85 }, (b) => P.sun(b));
    } },
  { id: 'lighthouse', kind: 'picture', level: 3, names: { en: 'Lighthouse' },
    draw(a) {
      a.group('rocks', () => {
        a.region(blob([[130, 470], [170, 420], [280, 400], [400, 412], [470, 470], [300, 500]], 1), 'grey', 'rock');
        a.region(blob([[110, 480], [130, 452], [190, 456], [214, 486], [160, 500]], 1), 'brown', 'rock');
      });
      a.group('water', () => a.region('M60 480Q150 466 240 482T420 482T560 480L560 520Q300 540 60 520Z', 'blue', 'water'));
      a.at({ x: 300, y: 270, s: 1.15 }, (b) => S.lighthouse(b, 'none', 'red', 'red', 'yellow', 'green'));
      gull(a, 120, 130, 1.2); gull(a, 470, 100, 1);
    } },
  { id: 'pineapple', kind: 'picture', level: 1, names: { en: 'Pineapple' },
    draw(a) {
      a.group('plate', () => a.region(ellipse(300, 470, 150, 28), 'blue', 'plate'));
      a.at({ x: 300, y: 330, s: 1.25 }, (b) => S.pineapple(b, 'yellow', 'green'));
    } },
  { id: 'gift-box', kind: 'picture', level: 1, names: { en: 'Present' },
    draw(a) { a.at({ x: 300, y: 330, s: 1.5 }, (b) => S.giftBox(b, 'blue', 'red', 'purple')); } },
  { id: 'tea-time', kind: 'picture', level: 2, names: { en: 'Tea Time' },
    draw(a) {
      a.at({ x: 230, y: 330, s: 1.3 }, (b) => S.teapot(b, 'pink', 'purple', 'lightblue', 'blue', 'yellow'));
      a.group('cup', () => {
        a.region(ellipse(470, 446, 66, 12), 'blue', 'saucer');
        a.region(blob([[506, 382], [546, 384], [550, 414], [506, 424]], 1), 'lightblue', 'cup handle');
        a.region('M418 370H520Q518 440 470 444Q422 440 418 370Z', 'lightblue', 'cup');
        a.region(circle(470, 400, 13), 'green', 'dot');
      });
    } },
  { id: 'monkey-banana', kind: 'picture', level: 2, names: { en: 'Monkey with a Banana' },
    draw(a) {
      mound(a, 300, 486, 240);
      a.at({ x: 100, y: 420, s: 0.95 }, (b) => P.flower(b, 'red', 'yellow', 'green', 25));
      a.at({ x: 290, y: 320, s: 1.4 }, (b) => S.monkey(b, 'brown', 'orange', 'yellow'));
    } },
  { id: 'little-sheep', kind: 'picture', level: 1, names: { en: 'Little Sheep' },
    draw(a) {
      mound(a, 300, 470, 250);
      a.at({ x: 280, y: 330, s: 1.45 }, (b) => S.sheep(b, 'none', 'grey', 'black'));
    } },

  /* ------------------------------------------------------------ scenes */
  { id: 'sheep-meadow', kind: 'scene', level: 1, names: { en: 'Sheep in the Meadow' },
    draw(a) {
      skyGrass(a, 0.5);
      a.at({ x: 490, y: 90, s: 0.95 }, (b) => P.sun(b));
      a.at({ x: 140, y: 90, s: 0.85 }, (b) => P.cloud(b));
      a.at({ x: 280, y: 400, s: 1.3 }, (b) => S.sheep(b, 'none', 'grey', 'black'));
    } },
  { id: 'plane-sky', kind: 'scene', level: 1, names: { en: 'Up in the Sky' },
    draw(a) {
      a.region(`M0 0H${W}V${H}H0Z`, 'lightblue', 'sky');
      a.at({ x: 490, y: 96, s: 0.95 }, (b) => P.sun(b));
      a.at({ x: 130, y: 110, s: 0.9 }, (b) => P.cloud(b));
      a.at({ x: 460, y: 460, s: 1.0 }, (b) => P.cloud(b));
      a.at({ x: 120, y: 450, s: 0.7 }, (b) => P.cloud(b));
      a.at({ x: 300, y: 280, s: 1.35 }, (b) => S.airplane(b, 'red', 'blue', 'lightblue', 'yellow'));
    } },
  { id: 'fish-friends', kind: 'scene', level: 1, names: { en: 'Fish Friends' },
    draw(a) {
      P.sea(a, W, H);
      a.at({ x: 80, y: 520 }, (b) => P.seaweed(b, 'green', 190));
      a.at({ x: 520, y: 520 }, (b) => P.seaweed(b, 'green', 160));
      a.at({ x: 250, y: 200, s: 1.7 }, (b) => P.fish(b, 'orange', 'yellow', 'none'));
      a.at({ x: 380, y: 360, s: 1.4, fx: true }, (b) => P.fish(b, 'orange', 'yellow', 'none'));
      [[120, 120], [150, 80], [470, 130], [490, 90]].forEach(([x, y]) => a.at({ x, y }, (b) => P.bubble(b, 13)));
    } },
  { id: 'dolphin-jump', kind: 'scene', level: 1, names: { en: 'Jumping Dolphin' },
    draw(a) {
      a.region(`M0 0H${W}V${H}H0Z`, 'lightblue', 'sky');
      a.region(`M0 ${H * 0.62}Q${W * 0.125} ${H * 0.58} ${W * 0.25} ${H * 0.62}T${W * 0.5} ${H * 0.62}T${W * 0.75} ${H * 0.62}T${W} ${H * 0.62}V${H}H0Z`, 'blue', 'sea');
      a.at({ x: 480, y: 90, s: 0.95 }, (b) => P.sun(b));
      a.at({ x: 130, y: 90, s: 0.85 }, (b) => P.cloud(b));
      a.at({ x: 300, y: 248, s: 1.3, r: -16 }, (b) => S.dolphin(b, 'grey', 'none'));
    } },
  { id: 'moon-night', kind: 'scene', level: 1, names: { en: 'Good Night' },
    draw(a) {
      a.region(`M0 0H${W}V${H}H0Z`, 'blue', 'night sky');
      a.region(`M0 ${H * 0.72}C${W * 0.3} ${H * 0.62} ${W * 0.7} ${H * 0.66} ${W} ${H * 0.72}V${H}H0Z`, 'green', 'hill');
      a.at({ x: 420, y: 140, s: 1.6 }, (b) => P.moon(b));
      stars(a, [[90, 90, 1.1], [220, 60, 0.9], [160, 210, 1], [560, 300, 0.9], [300, 180, 0.85]]);
      a.at({ x: 120, y: 380, s: 0.9 }, (b) => P.tree(b, 'lightgreen'));
    } },
  { id: 'snail-garden', kind: 'scene', level: 1, names: { en: 'Snail in the Garden' },
    draw(a) {
      skyGrass(a, 0.56);
      a.at({ x: 110, y: 90, s: 0.85 }, (b) => P.sun(b));
      a.at({ x: 420, y: 90, s: 0.85 }, (b) => P.cloud(b));
      a.at({ x: 300, y: 420, s: 1.3 }, (b) => Q.snail(b, 'orange', 'yellow', 'lightgreen'));
    } },
  { id: 'lighthouse-coast', kind: 'scene', level: 3, names: { en: 'Lighthouse by the Sea' },
    draw(a) {
      a.region(`M0 0H${W}V${H}H0Z`, 'lightblue', 'sky');
      a.region(`M0 ${H * 0.62}H${W}V${H}H0Z`, 'blue', 'sea');
      a.at({ x: 90, y: 80, s: 0.8 }, (b) => P.sun(b));
      a.at({ x: 300, y: 70, s: 0.7 }, (b) => P.cloud(b));
      a.group('cliff', () => a.region('M330 560L360 430Q420 380 520 390Q600 400 610 430V560Z', 'grey', 'cliff'), { edgeOk: true });
      a.group('grass', () => a.region('M360 432Q420 380 520 392Q600 402 610 430L610 446Q520 414 440 420Q390 426 356 452Z', 'green', 'grass'), { edgeOk: true });
      // it STANDS on the cliff top (its base at the grass line, y ~402)
      a.at({ x: 480, y: 250, s: 1.05 }, (b) => S.lighthouse(b, 'none', 'red', 'red', 'yellow', 'blue'));
      a.at({ x: 170, y: 430, s: 1.0 }, (b) => Q.sailboat(b, 'orange', 'none', 'yellow', 'red'));
      gull(a, 230, 150, 1.2); gull(a, 160, 210, 1);
    } },
  { id: 'bus-street', kind: 'scene', level: 3, names: { en: 'Bus in Town' },
    draw(a) {
      Q.road(a, W, H, { horizon: 0.56 });
      a.at({ x: 80, y: 66, s: 0.75 }, (b) => P.sun(b));
      a.at({ x: 112, y: 228, s: 0.74 }, (b) => P.house(b, 'pink', 'red', 'brown', 'lightblue', false));
      a.at({ x: 488, y: 228, s: 0.74 }, (b) => P.house(b, 'pink', 'red', 'brown', 'lightblue', false));
      a.at({ x: 300, y: 222, s: 0.72 }, (b) => P.tree(b));
      a.at({ x: 300, y: 398, s: 1.08 }, (b) => S.bus(b, 'yellow', 'lightblue', 'red', 'black', 'grey', 'yellow'));
    } },
  { id: 'unicorn-rainbow', kind: 'scene', level: 3, names: { en: 'Unicorn and Rainbow' },
    draw(a) {
      skyGrass(a, 0.62);
      // the rainbow stands to one side and the unicorn faces away from it: an animal across the bands cut them into slivers
      a.at({ x: 430, y: 330, s: 1.2 }, (b) => P.rainbow(b, ['red', 'orange', 'yellow', 'green', 'blue']));
      a.at({ x: 262, y: 322, s: 0.75 }, (b) => P.cloud(b));
      a.at({ x: 590, y: 322, s: 0.75 }, (b) => P.cloud(b));
      a.at({ x: 200, y: 404, s: 1.05, fx: true }, (b) => S.unicorn(b, 'none', ['pink', 'purple', 'blue'], 'yellow', 'purple'));
    } },
  { id: 'jungle-friends', kind: 'scene', level: 3, names: { en: 'Jungle Friends' },
    draw(a) {
      skyGrass(a, 0.66, 'lightblue', 'green');
      a.at({ x: 452, y: 214, s: 0.95 }, (b) => R.palmTree(b, 'green', 'brown', 'brown'));
      a.at({ x: 90, y: 440, s: 0.9 }, (b) => P.bush(b, 'lightgreen'));
      a.at({ x: 240, y: 400, s: 1.22 }, (b) => S.monkey(b, 'brown', 'orange', 'yellow'));
      a.at({ x: 130, y: 170, s: 0.9 }, (b) => P.butterfly(b, 'purple', 'yellow', 'red'));   // a perching parrot would float in the air here
    } },
];

module.exports = { B3 };
