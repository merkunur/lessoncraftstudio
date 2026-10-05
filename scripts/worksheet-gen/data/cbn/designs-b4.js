/**
 * data/cbn/designs-b4.js — Color by Number, batch 4 (2026-10-05): 10 scenes (6 level 1, 4 level 3) + 10 pictures
 * (4 level 2, 6 level 3). Reviewed against docs/worksheet-gen/cbn-review-checklist.md; gated by tools/cbn-preview.js.
 */
'use strict';
const P = require('../../primitives/cbn-art/parts.js');
const Q = require('../../primitives/cbn-art/parts2.js');
const R = require('../../primitives/cbn-art/parts3.js');
const T = require('../../primitives/cbn-art/parts5.js');
const N = require('../../primitives/cbn-art/v2.js');
const { blob, rrect, ellipse } = require('../../primitives/cbn-art/core.js');

const W = 600, H = 560;
const mound = (a, x, y, w, c = 'green', h = 34) => a.group('mound', () => a.region(blob([[x - w, y + h * 0.5], [x - w * 0.7, y - h * 0.5], [x, y - h * 0.8], [x + w * 0.7, y - h * 0.5], [x + w, y + h * 0.5], [x, y + h * 0.9]], 1), c, 'grass'));
const skyGrass = (a, horizon = 0.6, sky = 'lightblue', grass = 'green') => { a.region(`M0 0H${W}V${H}H0Z`, sky, 'sky'); a.region(`M0 ${H * horizon}C${W * 0.3} ${H * horizon - 34} ${W * 0.7} ${H * horizon - 14} ${W} ${H * horizon}V${H}H0Z`, grass, 'grass'); };
const seaSand = (a, horizon = 0.5, sandTop = 0.74) => { a.region(`M0 0H${W}V${H}H0Z`, 'lightblue', 'sky'); a.region(`M0 ${H * horizon}H${W}V${H}H0Z`, 'blue', 'sea'); a.region(`M0 ${H * sandTop}C${W * 0.3} ${H * sandTop - 30} ${W * 0.6} ${H * sandTop + 20} ${W} ${H * sandTop - 10}V${H}H0Z`, 'yellow', 'sand'); };

const B4 = [
  /* ------------------------------------------------------------ pictures */
  { id: 'brown-bear', kind: 'picture', level: 2, names: { en: 'Brown Bear' },
    draw(a) {
      mound(a, 300, 470, 260);
      a.at({ x: 535, y: 405, s: 0.9 }, (b) => P.flower(b, 'red', 'yellow', 'green', 25));
      a.at({ x: 212, y: 470, s: 1.1 }, (b) => N.bear(b, 'brown', 'orange', 'orange'));
    } },
  { id: 'red-fox', kind: 'picture', level: 2, names: { en: 'Little Fox' },
    draw(a) {
      mound(a, 300, 480, 250);
      a.at({ x: 535, y: 430, s: 0.85 }, (b) => P.mushroom(b, 'red', 'none'));
      a.at({ x: 100, y: 410, s: 0.95 }, (b) => P.flower(b, 'purple', 'yellow', 'green', 25));
      a.at({ x: 262, y: 478, s: 1.28 }, (b) => N.fox(b, 'orange', 'none', 'black'));
    } },
  { id: 'pony', kind: 'picture', level: 2, names: { en: 'Pony' },
    draw(a) {
      mound(a, 300, 492, 250);
      a.at({ x: 510, y: 420, s: 1.0 }, (b) => P.flower(b, 'pink', 'yellow', 'green', 25));
      a.at({ x: 280, y: 476, s: 1.05 }, (b) => N.pony(b, 'brown', 'black', 'grey'));
    } },
  { id: 'sunflower', kind: 'picture', level: 2, names: { en: 'Sunflower' },
    draw(a) {
      a.at({ x: 300, y: 250, s: 1.12 }, (b) => T.sunflower(b, 'yellow', 'brown', 'green', 'orange'));
      a.at({ x: 300, y: 470, s: 0.5 }, (b) => Q.ladybird(b, 'red', 'black'));
    } },
  { id: 'tractor', kind: 'picture', level: 3, names: { en: 'Tractor' },
    draw(a) {
      mound(a, 300, 480, 270);
      a.at({ x: 300, y: 380, s: 1.3 }, (b) => T.tractor(b, 'red', 'black', 'yellow', 'lightblue', 'grey'));
      a.at({ x: 500, y: 90, s: 0.85 }, (b) => P.sun(b));
    } },
  { id: 'helicopter', kind: 'picture', level: 3, names: { en: 'Helicopter' },
    draw(a) {
      a.at({ x: 110, y: 450, s: 0.75 }, (b) => P.cloud(b));
      a.at({ x: 500, y: 100, s: 0.85 }, (b) => P.sun(b));
      a.at({ x: 330, y: 280, s: 1.25 }, (b) => T.helicopter(b, 'blue', 'lightblue', 'red', 'grey', 'orange'));
    } },
  { id: 'baby-dragon', kind: 'picture', level: 3, names: { en: 'Baby Dragon' },
    draw(a) {
      mound(a, 300, 480, 260, 'lightgreen');
      a.at({ x: 330, y: 476, s: 1.12 }, (b) => N.dragon(b, 'green', 'yellow', 'purple', 'orange', 'pink'));
    } },
  { id: 'mushroom-house', kind: 'picture', level: 3, names: { en: 'Mushroom House' },
    draw(a) {
      mound(a, 300, 486, 260);
      a.at({ x: 300, y: 320, s: 1.3 }, (b) => T.mushroomHouse(b, 'red', 'yellow', 'brown', 'lightblue', 'none'));
      a.at({ x: 90, y: 410, s: 0.9 }, (b) => P.flower(b, 'pink', 'orange', 'green', 25));
      a.at({ x: 510, y: 410, s: 0.9 }, (b) => P.flower(b, 'purple', 'orange', 'green', 25));
    } },
  { id: 'flower-vase', kind: 'picture', level: 3, names: { en: 'Flowers in a Vase' },
    draw(a) { a.at({ x: 300, y: 310, s: 1.32 }, (b) => T.flowerVase(b, 'blue', 'brown', 'red', 'yellow', 'purple', 'orange', 'green')); } },
  { id: 'beach-toys', kind: 'picture', level: 3, names: { en: 'Beach Toys' },
    draw(a) {
      // the whole picture lifted and enlarged (it sat low under a big empty space)
      a.at({ x: -36, y: -60, s: 1.12 }, (a) => {
        a.group('sand', () => a.region(blob([[62, 476], [130, 424], [300, 408], [470, 424], [548, 476], [300, 516]], 1), 'yellow', 'sand'));
        a.at({ x: 200, y: 360, s: 1.2 }, (b) => T.bucket(b, 'blue', 'yellow', 'red'));
        a.at({ x: 430, y: 380, s: 1.15 }, (b) => T.beachBall(b, ['red', 'purple', 'blue', 'green']));   // no yellow panel on yellow sand
        // on the sand, not floating above it
        a.at({ x: 316, y: 474, s: 0.5 }, (b) => T.starfish(b, 'orange'));
        a.at({ x: 112, y: 482, s: 0.8 }, (b) => P.shell(b, 'pink'));
      });
    } },

  /* ------------------------------------------------------------ scenes */
  { id: 'starfish-beach', kind: 'scene', level: 1, names: { en: 'Starfish on the Beach' },
    draw(a) {
      seaSand(a, 0.48, 0.66);
      a.at({ x: 480, y: 90, s: 0.95 }, (b) => P.sun(b));
      a.at({ x: 140, y: 90, s: 0.8 }, (b) => P.cloud(b));
      a.at({ x: 300, y: 478, s: 1.05 }, (b) => T.starfish(b, 'orange'));
    } },
  { id: 'octopus-sea', kind: 'scene', level: 1, names: { en: 'Happy Octopus' },
    draw(a) {
      P.sea(a, W, H);
      a.at({ x: 520, y: 520 }, (b) => P.seaweed(b, 'green', 200));
      a.at({ x: 270, y: 232, s: 1.8 }, (b) => P.octopus(b, 'purple'));   // floating clear of the sand: tips on the sand line left slivers
      [[80, 110], [110, 64], [470, 120], [500, 76]].forEach(([x, y]) => a.at({ x, y }, (b) => P.bubble(b, 13)));
    } },
  { id: 'turtle-beach', kind: 'scene', level: 1, names: { en: 'Turtle on the Beach' },
    draw(a) {
      seaSand(a, 0.44, 0.6);
      a.at({ x: 480, y: 86, s: 0.9 }, (b) => P.sun(b));
      a.at({ x: 290, y: 430, s: 1.25 }, (b) => P.turtle(b, 'green', 'lightgreen', 'green'));
    } },
  { id: 'helicopter-sky', kind: 'scene', level: 1, names: { en: 'Helicopter in the Sky' },
    draw(a) {
      a.region(`M0 0H${W}V${H}H0Z`, 'lightblue', 'sky');
      a.at({ x: 490, y: 96, s: 0.9 }, (b) => P.sun(b));
      a.at({ x: 120, y: 120, s: 0.85 }, (b) => P.cloud(b));
      a.at({ x: 460, y: 470, s: 0.9 }, (b) => P.cloud(b));
      a.at({ x: 320, y: 290, s: 1.15 }, (b) => T.helicopter(b, 'red', 'lightblue', 'red', 'red', 'yellow'));
    } },
  { id: 'sunflower-field', kind: 'scene', level: 1, names: { en: 'Sunflower Day' },
    draw(a) {
      skyGrass(a, 0.8);
      a.at({ x: 480, y: 80, s: 0.85 }, (b) => P.sun(b));
      // ONE big sunflower with 8 petals: two 12-petal ones were far past level 1's 16 parts
      a.at({ x: 280, y: 250, s: 1.25 }, (b) => T.sunflower(b, 'yellow', 'brown', 'green', null, 8));
    } },
  { id: 'fox-snow', kind: 'scene', level: 1, names: { en: 'Fox in the Snow' },
    draw(a) {
      Q.snow(a, W, H, { horizon: 0.6 });
      a.at({ x: 490, y: 290, s: 1.15 }, (b) => P.pineTree(b));
      a.at({ x: 232, y: 492, s: 1.18 }, (b) => N.fox(b, 'orange', 'none', 'black'));
    } },
  { id: 'dragon-castle', kind: 'scene', level: 3, names: { en: 'Dragon and Castle' },
    draw(a) {
      skyGrass(a, 0.58, 'lightblue', 'lightgreen');   // light grass: the green dragon stands out
      a.at({ x: 90, y: 80, s: 0.75 }, (b) => P.sun(b));
      a.at({ x: 452, y: 304, s: 0.72 }, (b) => R.castle(b, 'grey', 'purple', 'red', 'brown'));   // far away on the hill
      a.at({ x: 204, y: 520, s: 0.86 }, (b) => N.dragon(b, 'green', 'yellow', 'purple', 'yellow', 'red'));
    } },
  { id: 'tractor-farm', kind: 'scene', level: 3, names: { en: 'Tractor on the Farm' },
    draw(a) {
      skyGrass(a, 0.52);
      a.at({ x: 90, y: 80, s: 0.75 }, (b) => P.sun(b));
      a.at({ x: 460, y: 206, s: 0.86 }, (b) => R.barn(b, 'red', 'brown', 'none', 'none'));
      a.at({ x: 260, y: 410, s: 1.05 }, (b) => T.tractor(b, 'blue', 'black', 'yellow', 'lightblue', 'grey'));
    } },
  { id: 'beach-day', kind: 'scene', level: 3, names: { en: 'Day at the Beach' },
    draw(a) {
      seaSand(a, 0.42, 0.62);
      a.at({ x: 110, y: 80, s: 0.8 }, (b) => P.sun(b));
      // ON the sea (it floated in the sky above the horizon)
      a.at({ x: 440, y: 282, s: 0.82 }, (b) => Q.sailboat(b, 'red', 'none', 'orange', 'purple'));
      a.at({ x: 150, y: 430, s: 1.0 }, (b) => T.bucket(b, 'blue', 'orange', 'red'));
      a.at({ x: 400, y: 440, s: 0.95 }, (b) => T.beachBall(b, ['red', 'blue', 'green', 'purple']));
      a.at({ x: 520, y: 510, s: 0.5 }, (b) => T.starfish(b, 'orange'));
    } },
  { id: 'mushroom-village', kind: 'scene', level: 3, names: { en: 'Mushroom Village' },
    draw(a) {
      skyGrass(a, 0.6);
      a.at({ x: 500, y: 76, s: 0.8 }, (b) => P.sun(b));
      a.at({ x: 150, y: 290, s: 0.85 }, (b) => T.mushroomHouse(b, 'red', 'yellow', 'brown', 'lightblue', 'none'));
      a.at({ x: 452, y: 330, s: 0.76 }, (b) => T.mushroomHouse(b, 'purple', 'yellow', 'brown', 'lightblue', 'none'));
      a.at({ x: 220, y: 512, s: 0.9 }, (b) => Q.snail(b, 'orange', 'yellow', 'lightgreen'));
    } },
];

module.exports = { B4 };
