/**
 * data/cbn/designs-b9.js — Color by Number, batch 9 (2026-10-05): the last 13 scenes + 13 pictures, built from the
 * proven parts. Reviewed against docs/worksheet-gen/cbn-review-checklist.md; gated by tools/cbn-preview.js.
 */
'use strict';
const P = require('../../primitives/cbn-art/parts.js');
const Q = require('../../primitives/cbn-art/parts2.js');
const R = require('../../primitives/cbn-art/parts3.js');
const S = require('../../primitives/cbn-art/parts4.js');
const T = require('../../primitives/cbn-art/parts5.js');
const U = require('../../primitives/cbn-art/parts6.js');
const V = require('../../primitives/cbn-art/parts7.js');
const { blob, rrect, ellipse } = require('../../primitives/cbn-art/core.js');

const W = 600, H = 560;
const mound = (a, x, y, w, c = 'green', h = 34) => a.group('mound', () => a.region(blob([[x - w, y + h * 0.5], [x - w * 0.7, y - h * 0.5], [x, y - h * 0.8], [x + w * 0.7, y - h * 0.5], [x + w, y + h * 0.5], [x, y + h * 0.9]], 1), c, 'grass'));
const skyGrass = (a, horizon = 0.6, sky = 'lightblue', grass = 'green') => { a.region(`M0 0H${W}V${H}H0Z`, sky, 'sky'); a.region(`M0 ${H * horizon}C${W * 0.3} ${H * horizon - 34} ${W * 0.7} ${H * horizon - 14} ${W} ${H * horizon}V${H}H0Z`, grass, 'grass'); };
const stars = (a, pts, c = 'yellow') => pts.forEach(([x, y, s]) => a.at({ x, y, s: s || 1 }, (b) => P.star5(b, c)));
const table = (a, y = 450, c = 'brown') => a.group('table', () => a.region(rrect(30, y, 540, 40, 10), c, 'table'));

const B9 = [
  /* ------------------------------------------------------------ pictures */
  { id: 'strawberry', kind: 'picture', level: 1, names: { en: 'Strawberry' },
    draw(a) { a.group('plate', () => a.region(ellipse(300, 470, 180, 30), 'lightblue', 'plate')); a.at({ x: 300, y: 300, s: 1.65 }, (b) => Q.strawberry(b, 'red', 'green')); } },
  { id: 'red-apple', kind: 'picture', level: 1, names: { en: 'Red Apple' },
    draw(a) { a.group('plate', () => a.region(ellipse(300, 470, 180, 30), 'blue', 'plate')); a.at({ x: 300, y: 300, s: 1.65 }, (b) => Q.apple(b, 'red', 'green', 'brown')); } },
  { id: 'kite', kind: 'picture', level: 1, names: { en: 'Kite' },
    draw(a) { a.at({ x: 340, y: 190, s: 1.2, r: 10 }, (b) => Q.kite(b, 'red', 'yellow', 'blue')); a.at({ x: 120, y: 120, s: 0.75 }, (b) => P.cloud(b)); } },
  { id: 'snowman', kind: 'picture', level: 2, names: { en: 'Snowman' },
    draw(a) {
      a.group('snow', () => a.region(blob([[80, 490], [140, 450], [300, 440], [460, 450], [520, 490], [300, 520]], 1), 'lightblue', 'snow'));
      a.at({ x: 300, y: 330, s: 1.2 }, (b) => Q.snowman(b, 'none', 'black', 'red', 'orange'));
      [[90, 100], [80, 300], [520, 310]].forEach(([x, y]) => a.at({ x, y }, (b) => Q.snowflake(b)));
      a.at({ x: 500, y: 110, s: 0.8 }, (b) => P.sun(b));
    } },
  { id: 'umbrella-rain', kind: 'picture', level: 2, names: { en: 'Umbrella in the Rain' },
    draw(a) {
      a.at({ x: 300, y: 280, s: 1.45 }, (b) => Q.umbrella(b, 'purple', 'yellow', 'brown'));
      a.at({ x: 150, y: 70, s: 0.8 }, (b) => P.cloud(b, 'grey')); a.at({ x: 450, y: 70, s: 0.8 }, (b) => P.cloud(b, 'grey'));
      [[100, 220], [500, 210], [120, 360], [480, 380]].forEach(([x, y]) => a.at({ x, y }, (b) => R.raindrop(b, 'lightblue')));
      a.group('puddle', () => a.region(ellipse(300, 490, 200, 26), 'blue', 'puddle'));
    } },
  { id: 'teddy-present', kind: 'picture', level: 3, names: { en: 'Teddy and Present' },
    draw(a) {
      table(a, 460);
      a.at({ x: 210, y: 290, s: 1.35 }, (b) => R.teddy(b, 'brown', 'orange', 'red'));
      a.at({ x: 460, y: 380, s: 0.75 }, (b) => S.giftBox(b, 'blue', 'pink', 'purple'));
    } },
  { id: 'sweet-treats', kind: 'picture', level: 3, names: { en: 'Sweet Treats' },
    draw(a) {
      table(a, 460, 'blue');
      a.at({ x: 130, y: 258, s: 1.15 }, (b) => Q.iceCream(b, 'orange', 'pink', 'brown', 'red'));
      a.group('cone holder', () => a.region('M80 400H180L170 460H90Z', 'green', 'holder'));   // the cone stands in a holder (on its point it would fall)
      a.at({ x: 330, y: 360, s: 1.0 }, (b) => Q.cupcake(b, 'purple', 'pink', 'red'));
      a.at({ x: 490, y: 410, s: 0.62 }, (b) => U.donut(b, 'orange', 'yellow', null));
    } },
  { id: 'fruit-friends', kind: 'picture', level: 2, names: { en: 'Fruit Friends' },
    draw(a) {
      table(a, 470, 'blue');
      a.at({ x: 120, y: 360, s: 0.95 }, (b) => Q.apple(b, 'lightgreen', 'green', 'brown'));
      a.at({ x: 300, y: 340, s: 1.0 }, (b) => S.pineapple(b, 'yellow', 'green'));
      a.at({ x: 470, y: 380, s: 0.95 }, (b) => V.cherries(b, 'red', 'green'));
    } },
  { id: 'owl-moon', kind: 'picture', level: 3, names: { en: 'Owl and Moon' },
    draw(a) {
      a.group('branch', () => { a.region('M40 430Q300 400 560 420L560 452Q300 430 40 462Z', 'brown', 'branch'); a.at({ x: 520, y: 436, r: -30 }, (c) => c.region('M0 0Q30 -40 70 -24Q44 12 0 0Z', 'green', 'leaf')); });
      a.at({ x: 260, y: 300, s: 1.35 }, (b) => P.owl(b, 'brown', 'orange', 'pink', 'orange'));
      a.at({ x: 480, y: 150, s: 1.3 }, (b) => P.moon(b, 'yellow'));
      stars(a, [[90, 100, 1], [520, 330, 0.9]], 'purple');
    } },
  { id: 'toy-box', kind: 'picture', level: 3, names: { en: 'My Toys' },
    draw(a) {
      table(a, 470, 'brown');
      a.at({ x: 180, y: 290, s: 1.15 }, (b) => R.robot(b, 'grey', 'blue', 'yellow', 'red', 'green', 'purple'));
      a.at({ x: 430, y: 390, s: 0.95 }, (b) => T.beachBall(b, ['red', 'yellow', 'blue', 'green']));
    } },
  { id: 'garden-friends', kind: 'picture', level: 3, names: { en: 'Garden Friends' },
    draw(a) {
      mound(a, 300, 486, 270);
      a.at({ x: 130, y: 400, s: 1.0 }, (b) => P.flower(b, 'pink', 'yellow', 'green', 26));
      a.at({ x: 470, y: 390, s: 1.0 }, (b) => P.flower(b, 'purple', 'orange', 'green', 26));
      a.at({ x: 300, y: 420, s: 1.0 }, (b) => Q.snail(b, 'orange', 'yellow', 'lightgreen'));
      a.at({ x: 300, y: 150, s: 0.95 }, (b) => P.butterfly(b, 'blue', 'yellow', 'brown'));
    } },
  { id: 'whale-and-fish', kind: 'picture', level: 3, names: { en: 'Whale and Fish' },
    draw(a) {
      a.at({ x: 280, y: 260, s: 1.3 }, (b) => Q.whale(b, 'blue', 'lightblue'));
      a.at({ x: 170, y: 460, s: 0.95 }, (b) => P.fish(b, 'orange', 'yellow', 'none'));
      a.at({ x: 450, y: 460, s: 0.9, fx: true }, (b) => P.fish(b, 'pink', 'purple', 'none'));
    } },
  { id: 'kitten-butterfly', kind: 'picture', level: 3, names: { en: 'Kitten and Butterfly' },
    draw(a) {
      mound(a, 300, 486, 260);
      a.at({ x: 250, y: 314, s: 1.42 }, (b) => Q.cat(b, 'grey', 'pink', 'none'));
      a.at({ x: 470, y: 160, s: 0.9 }, (b) => P.butterfly(b, 'orange', 'yellow', 'purple'));
      a.at({ x: 490, y: 420, s: 0.95 }, (b) => P.flower(b, 'red', 'yellow', 'green', 25));
    } },

  /* ------------------------------------------------------------ scenes */
  { id: 'kite-sky', kind: 'scene', level: 1, names: { en: 'Kite in the Sky' },
    draw(a) { skyGrass(a, 0.78); a.at({ x: 480, y: 90, s: 0.9 }, (b) => P.sun(b)); a.at({ x: 290, y: 150, s: 1.0, r: 12 }, (b) => Q.kite(b, 'red', 'yellow', 'blue', 'short')); } },
  { id: 'rainy-umbrella', kind: 'scene', level: 1, names: { en: 'Rainy Day Umbrella' },
    draw(a) {
      skyGrass(a, 0.74);
      a.at({ x: 150, y: 80, s: 0.85 }, (b) => P.cloud(b)); a.at({ x: 450, y: 80, s: 0.85 }, (b) => P.cloud(b));
      a.at({ x: 300, y: 300, s: 1.3 }, (b) => Q.umbrella(b, 'red', 'yellow', 'brown'));
      [[90, 220], [510, 220], [110, 350], [490, 350]].forEach(([x, y]) => a.at({ x, y, s: 1.2 }, (b) => R.raindrop(b, 'blue')));   // it is raining
    } },
  { id: 'piggy-mud', kind: 'scene', level: 1, names: { en: 'Pig in the Mud' },
    draw(a) {
      skyGrass(a, 0.56);
      a.at({ x: 480, y: 90, s: 0.9 }, (b) => P.sun(b));
      a.group('mud', () => a.region(blob([[60, 470], [140, 420], [400, 420], [500, 470], [400, 520], [140, 520]], 1), 'brown', 'mud'));
      a.at({ x: 260, y: 400, s: 1.2 }, (b) => Q.pig(b, 'pink', 'pink'));
    } },
  { id: 'owl-branch-day', kind: 'scene', level: 2, names: { en: 'Owl in the Sunshine' },
    draw(a) {
      a.region(`M0 0H${W}V${H}H0Z`, 'lightblue', 'sky');
      a.at({ x: 480, y: 90, s: 0.9 }, (b) => P.sun(b));
      a.group('branch', () => { a.region('M-10 430Q300 400 610 420V456Q300 432 -10 470Z', 'brown', 'branch'); a.at({ x: 480, y: 432, r: -30 }, (c) => c.region('M0 0Q30 -40 70 -24Q44 12 0 0Z', 'green', 'leaf')); a.at({ x: 120, y: 448, r: 200 }, (c) => c.region('M0 0Q30 -40 70 -24Q44 12 0 0Z', 'green', 'leaf')); }, { edgeOk: true });
      a.at({ x: 280, y: 300, s: 1.35 }, (b) => P.owl(b, 'brown', 'yellow', 'none', 'orange'));
    } },
  { id: 'cat-butterfly', kind: 'scene', level: 2, names: { en: 'Cat and Butterfly' },
    draw(a) {
      skyGrass(a, 0.6);
      a.at({ x: 90, y: 80, s: 0.8 }, (b) => P.sun(b));
      a.at({ x: 250, y: 330, s: 1.4 }, (b) => Q.cat(b, 'orange', 'pink', 'none'));
      a.at({ x: 470, y: 180, s: 0.95 }, (b) => P.butterfly(b, 'purple', 'yellow', 'brown'));
    } },
  { id: 'rainbow-meadow', kind: 'scene', level: 2, names: { en: 'Rainbow Meadow' },
    draw(a) {
      skyGrass(a, 0.66);
      a.at({ x: 300, y: 360, s: 1.6 }, (b) => P.rainbow(b, ['red', 'orange', 'yellow', 'green', 'blue']));
      a.at({ x: 66, y: 360, s: 0.85 }, (b) => P.cloud(b)); a.at({ x: 534, y: 360, s: 0.85 }, (b) => P.cloud(b));
    } },
  { id: 'snowman-penguin', kind: 'scene', level: 2, names: { en: 'Snowman and Penguin' },
    draw(a) {
      Q.snow(a, W, H, { horizon: 0.62 });
      a.at({ x: 220, y: 330, s: 1.0 }, (b) => Q.snowman(b, 'none', 'black', 'red', 'orange'));
      a.at({ x: 450, y: 400, s: 0.95 }, (b) => Q.penguin(b, 'black', 'none', 'orange'));
      [[90, 90], [400, 150]].forEach(([x, y]) => a.at({ x, y }, (b) => Q.snowflake(b)));
      a.at({ x: 510, y: 90, s: 0.8 }, (b) => P.sun(b));
    } },
  { id: 'ladybug-flowers', kind: 'scene', level: 2, names: { en: 'Ladybug and Flowers' },
    draw(a) {
      skyGrass(a, 0.56);
      a.at({ x: 500, y: 80, s: 0.85 }, (b) => P.sun(b));
      a.at({ x: 120, y: 420, s: 1.05 }, (b) => P.flower(b, 'purple', 'yellow', 'green', 26));
      a.at({ x: 480, y: 420, s: 1.05 }, (b) => P.flower(b, 'pink', 'yellow', 'green', 26));
      a.at({ x: 300, y: 380, s: 1.25 }, (b) => Q.ladybird(b, 'red', 'black'));
    } },
 { id: 'elephant-savanna', kind: 'scene', level: 2, names: { en: 'Elephant on the Savanna' },
    draw(a) {
      a.region(`M0 0H${W}V${H}H0Z`, 'lightblue', 'sky');
      a.region(`M0 ${H * 0.6}C${W * 0.3} ${H * 0.55} ${W * 0.7} ${H * 0.58} ${W} ${H * 0.6}V${H}H0Z`, 'yellow', 'dry grass');
      a.at({ x: 500, y: 80, s: 0.85 }, (b) => P.sun(b));
      a.at({ x: 120, y: 250, s: 0.85 }, (b) => R.acacia(b));
      a.at({ x: 330, y: 400, s: 1.2 }, (b) => Q.elephant(b, 'grey', 'pink'));
    } },
  { id: 'picnic-day', kind: 'scene', level: 3, names: { en: 'Picnic Day' },
    draw(a) {
      skyGrass(a, 0.46);
      a.at({ x: 90, y: 76, s: 0.75 }, (b) => P.sun(b));
      a.at({ x: 500, y: 190, s: 0.75 }, (b) => P.tree(b));
      a.group('blanket', () => a.region('M40 480L150 330L560 350L490 530Z', 'yellow', 'blanket'));   // not red: the strawberry sits on it
      a.at({ x: 210, y: 316, s: 1.3 }, (b) => R.teddy(b, 'brown', 'orange', 'blue'));
      a.at({ x: 440, y: 440, s: 0.8 }, (b) => Q.strawberry(b, 'red', 'green'));   // a picnic-sized fruit (an apple as big as the teddy looked wrong)
    } },
  { id: 'toy-room', kind: 'scene', level: 3, names: { en: 'Toy Room' },
    draw(a) {
      a.region(`M0 0H${W}V${H}H0Z`, 'yellow', 'wall');
      a.region(`M0 ${H * 0.74}H${W}V${H}H0Z`, 'brown', 'floor');
      a.at({ x: 200, y: 290, s: 1.2 }, (b) => R.robot(b, 'grey', 'blue', 'yellow', 'red', 'green', 'purple'));
      a.at({ x: 450, y: 440, s: 0.9 }, (b) => T.beachBall(b, ['red', 'yellow', 'blue', 'green']));
    } },
  { id: 'north-pole', kind: 'scene', level: 1, names: { en: 'North Pole Friends' },
    draw(a) {
      Q.snow(a, W, H, { horizon: 0.58 });
      a.at({ x: 480, y: 80, s: 0.8 }, (b) => P.sun(b));
      a.at({ x: 170, y: 350, s: 0.85 }, (b) => U.igloo(b, 'none', 'blue'));
      a.at({ x: 370, y: 420, s: 1.05 }, (b) => U.polarBear(b, 'none', 'black', 'red'));
    } },
  { id: 'garden-party', kind: 'scene', level: 3, names: { en: 'Garden Party' },
    draw(a) {
      skyGrass(a, 0.58);
      a.at({ x: 90, y: 76, s: 0.75 }, (b) => P.sun(b));
      a.at({ x: 430, y: 210, s: 0.72 }, (b) => P.house(b, 'pink', 'blue', 'brown', 'lightblue', false));
      a.at({ x: 150, y: 420, s: 0.95 }, (b) => P.flower(b, 'pink', 'yellow', 'green', 25));
      a.at({ x: 380, y: 470, s: 0.9 }, (b) => Q.snail(b, 'pink', 'yellow', 'lightgreen'));
    } },
];

module.exports = { B9 };
