/**
 * data/cbn/designs-b6.js — Color by Number, batch 6 (2026-10-05): 11 scenes + 10 pictures, mostly the proven
 * characters in new settings. Reviewed against docs/worksheet-gen/cbn-review-checklist.md; gated by cbn-preview.
 */
'use strict';
const P = require('../../primitives/cbn-art/parts.js');
const Q = require('../../primitives/cbn-art/parts2.js');
const R = require('../../primitives/cbn-art/parts3.js');
const T = require('../../primitives/cbn-art/parts5.js');
const U = require('../../primitives/cbn-art/parts6.js');
const V = require('../../primitives/cbn-art/parts7.js');
const { blob, rrect, ellipse } = require('../../primitives/cbn-art/core.js');

const W = 600, H = 560;
const mound = (a, x, y, w, c = 'green', h = 34) => a.group('mound', () => a.region(blob([[x - w, y + h * 0.5], [x - w * 0.7, y - h * 0.5], [x, y - h * 0.8], [x + w * 0.7, y - h * 0.5], [x + w, y + h * 0.5], [x, y + h * 0.9]], 1), c, 'grass'));
const skyGrass = (a, horizon = 0.6, sky = 'lightblue', grass = 'green') => { a.region(`M0 0H${W}V${H}H0Z`, sky, 'sky'); a.region(`M0 ${H * horizon}C${W * 0.3} ${H * horizon - 34} ${W * 0.7} ${H * horizon - 14} ${W} ${H * horizon}V${H}H0Z`, grass, 'grass'); };
const plate = (a, x, y, w, c) => a.group('plate', () => a.region(ellipse(x, y, w, w * 0.16), c, 'plate'));

const B6 = [
  /* ------------------------------------------------------------ pictures */
  { id: 'cherries', kind: 'picture', level: 1, names: { en: 'Cherries' },
    draw(a) { plate(a, 300, 450, 190, 'lightblue'); a.at({ x: 300, y: 300, s: 1.6 }, (b) => V.cherries(b, 'red', 'green')); } },
  { id: 'happy-carrot', kind: 'picture', level: 1, names: { en: 'Happy Carrot' },
    draw(a) { mound(a, 300, 480, 200, 'brown', 40); a.at({ x: 300, y: 300, s: 1.35 }, (b) => V.carrot(b, 'orange', 'green')); } },
  { id: 'rainbow', kind: 'picture', level: 1, names: { en: 'Rainbow' },
    draw(a) {
      a.at({ x: 300, y: 380, s: 1.75 }, (b) => P.rainbow(b, ['red', 'orange', 'yellow', 'green', 'blue']));
      a.at({ x: 90, y: 380, s: 0.95 }, (b) => P.cloud(b)); a.at({ x: 510, y: 380, s: 0.95 }, (b) => P.cloud(b));
    } },
  { id: 'backpack', kind: 'picture', level: 1, names: { en: 'School Backpack' },
    draw(a) { a.at({ x: 300, y: 300, s: 1.25 }, (b) => V.backpack(b, 'blue', 'red', 'yellow', 'grey')); } },
  { id: 'doghouse', kind: 'picture', level: 2, names: { en: 'Doghouse' },
    draw(a) {
      mound(a, 300, 480, 270);
      a.at({ x: 196, y: 300, s: 1.1 }, (b) => V.doghouse(b, 'red', 'brown', 'black', 'yellow'));
      a.at({ x: 462, y: 322, s: 1.2 }, (b) => Q.dog(b, 'yellow', 'brown', 'none', 'blue'));
    } },
  { id: 'cocoa-mug', kind: 'picture', level: 2, names: { en: 'Mug of Cocoa' },
    draw(a) {
      a.group('saucer', () => a.region(ellipse(300, 450, 200, 32), 'blue', 'saucer'));
      a.at({ x: 290, y: 320, s: 1.3 }, (b) => V.mug(b, 'red', 'brown', 'none', 'yellow'));
      a.group('cookie', () => { a.region(ellipse(424, 452, 46, 20), 'orange', 'cookie'); a.ink(ellipse(408, 448, 5, 3)); a.ink(ellipse(440, 454, 5, 3)); a.ink(ellipse(424, 442, 5, 3)); });   // the cookie sits ON the saucer
    } },
  { id: 'rocket', kind: 'picture', level: 2, names: { en: 'Rocket' },
    draw(a) {
      a.at({ x: 300, y: 250, s: 1.45 }, (b) => P.rocket(b, 'grey', 'red', 'red', 'lightblue', 'orange', 'yellow'));
      [[100, 120], [500, 140], [110, 380], [490, 420]].forEach(([x, y]) => a.at({ x, y, s: 1.0 }, (b) => P.star5(b, 'purple')));
    } },
  { id: 'treasure-chest', kind: 'picture', level: 3, names: { en: 'Treasure Chest' },
    draw(a) {
      a.group('sand', () => a.region(blob([[40, 470], [120, 420], [300, 406], [480, 420], [560, 470], [300, 530]], 1), 'orange', 'sand'));
      a.at({ x: 300, y: 320, s: 1.4 }, (b) => V.treasureChest(b, 'brown', 'yellow', 'yellow', ['red', 'blue', 'green']));
    } },
  { id: 'ice-cream-sundae', kind: 'picture', level: 3, names: { en: 'Ice Cream Sundae' },
    draw(a) {
      a.group('cloth', () => a.region(rrect(90, 470, 420, 34, 10), 'blue', 'tablecloth'));
      a.at({ x: 300, y: 330, s: 1.3 }, (b) => V.sundae(b, 'none', 'pink', 'yellow', 'brown', 'none', 'red', 'orange'));
    } },
  { id: 'party-balloons', kind: 'picture', level: 3, names: { en: 'Party Balloons' },
    draw(a) { a.at({ x: 300, y: 330, s: 1.25 }, (b) => U.balloonBunch(b, ['red', 'yellow', 'blue', 'green', 'purple'], 'pink')); } },

  /* ------------------------------------------------------------ scenes */
  { id: 'cat-garden', kind: 'scene', level: 1, names: { en: 'Cat in the Garden' },
    draw(a) { skyGrass(a, 0.62); a.at({ x: 490, y: 90, s: 0.9 }, (b) => P.sun(b)); a.at({ x: 290, y: 320, s: 1.42 }, (b) => Q.cat(b, 'orange', 'pink', 'none')); } },
  { id: 'puppy-park', kind: 'scene', level: 1, names: { en: 'Puppy in the Park' },
    draw(a) { skyGrass(a, 0.62); a.at({ x: 120, y: 90, s: 0.9 }, (b) => P.sun(b)); a.at({ x: 300, y: 330, s: 1.25 }, (b) => Q.dog(b, 'yellow', 'brown', 'none', 'red')); } },
  { id: 'bunny-hop', kind: 'scene', level: 1, names: { en: 'Little Bunny' },
    draw(a) { skyGrass(a, 0.6); a.at({ x: 490, y: 90, s: 0.9 }, (b) => P.sun(b)); a.at({ x: 290, y: 340, s: 1.6 }, (b) => P.bunny(b, 'grey', 'pink')); } },
  { id: 'ladybug-leaf', kind: 'scene', level: 1, names: { en: 'Ladybug on a Leaf' },
    draw(a) {
      a.region(`M0 0H${W}V${H}H0Z`, 'lightblue', 'sky');
      a.at({ x: 490, y: 90, s: 0.9 }, (b) => P.sun(b));
      // a real LEAF: pointed tip, stalk and veins (the first one read as a hill)
      a.group('leaf', () => { a.region('M40 470Q160 300 400 320Q520 330 580 300Q540 420 400 470Q220 530 40 470Z', 'green', 'leaf'); a.line('M40 470L10 500', 6); a.line('M70 466Q300 420 560 312', 3); });
      a.at({ x: 300, y: 340, s: 1.3 }, (b) => Q.ladybird(b, 'red', 'black'));
    } },
  { id: 'doghouse-yard', kind: 'scene', level: 2, names: { en: 'Dog and Doghouse' },
    draw(a) {
      skyGrass(a, 0.56);
      a.at({ x: 500, y: 80, s: 0.8 }, (b) => P.sun(b));
      a.at({ x: 160, y: 286, s: 1.05 }, (b) => V.doghouse(b, 'red', 'brown', 'black', 'yellow'));
      a.at({ x: 440, y: 350, s: 1.22 }, (b) => Q.dog(b, 'yellow', 'brown', 'brown', 'blue'));
    } },
  { id: 'bear-picnic', kind: 'scene', level: 2, names: { en: 'Bear Picnic' },
    draw(a) {
      skyGrass(a, 0.5);
      a.at({ x: 100, y: 80, s: 0.8 }, (b) => P.sun(b));
      a.group('blanket', () => a.region('M60 450L180 380L560 400L470 500Z', 'blue', 'blanket'));
      a.at({ x: 220, y: 330, s: 1.15 }, (b) => T.bear(b, 'brown', 'orange', 'orange'));
      a.at({ x: 440, y: 432, s: 0.62 }, (b) => Q.apple(b, 'red', 'green', 'brown'));
      a.at({ x: 500, y: 200, s: 0.75 }, (b) => P.tree(b));
    } },
  { id: 'pony-farm', kind: 'scene', level: 2, names: { en: 'Pony on the Farm' },
    draw(a) {
      skyGrass(a, 0.5);
      a.at({ x: 500, y: 80, s: 0.8 }, (b) => P.sun(b));
      a.at({ x: 14, y: 260, s: 0.9 }, (b) => P.fence(b, 3, 'brown', 70));
      a.at({ x: 330, y: 360, s: 1.0 }, (b) => T.pony(b, 'orange', 'brown', 'grey'));
    } },
  { id: 'farm-friends', kind: 'scene', level: 3, names: { en: 'Farm Friends' },
    draw(a) {
      P.meadow(a, W, H, { horizon: 0.45 });
      a.at({ x: 90, y: 70, s: 0.75 }, (b) => P.sun(b));
      a.at({ x: 460, y: 170, s: 0.8 }, (b) => R.barn(b, 'red', 'brown', 'none', 'none'));
      a.at({ x: 170, y: 360, s: 1.0 }, (b) => P.cow(b, 'none', 'brown', 'pink'));
      a.at({ x: 430, y: 446, s: 1.02 }, (b) => Q.pig(b, 'pink', 'pink'));
    } },
  { id: 'ocean-friends', kind: 'scene', level: 3, names: { en: 'Ocean Friends' },
    draw(a) {
      P.sea(a, W, H);
      a.at({ x: 60, y: 520 }, (b) => P.seaweed(b, 'green', 170));
      a.at({ x: 470, y: 190, s: 1.1 }, (b) => P.octopus(b, 'purple'));
      a.at({ x: 170, y: 150, s: 1.15 }, (b) => P.fish(b, 'orange', 'yellow', 'none'));
      a.at({ x: 250, y: 330, s: 1.0, fx: true }, (b) => P.fish(b, 'pink', 'blue', 'none'));
      a.at({ x: 420, y: 462, s: 1.12 }, (b) => P.crab(b, 'red'));
    } },
  { id: 'zoo-friends', kind: 'scene', level: 3, names: { en: 'Zoo Friends' },
    draw(a) {
      skyGrass(a, 0.6);
      a.at({ x: 520, y: 70, s: 0.75 }, (b) => P.sun(b));
      a.at({ x: 132, y: 330, s: 0.9 }, (b) => R.giraffe(b, 'yellow', 'brown', 'brown'));
      a.at({ x: 410, y: 400, s: 1.12 }, (b) => Q.elephant(b, 'grey', 'pink'));
    } },
  { id: 'treasure-island', kind: 'scene', level: 3, names: { en: 'Treasure Island' },
    draw(a) {
      a.region(`M0 0H${W}V${H}H0Z`, 'lightblue', 'sky');
      a.region(`M0 ${H * 0.5}H${W}V${H}H0Z`, 'blue', 'sea');
      a.at({ x: 90, y: 80, s: 0.8 }, (b) => P.sun(b));
      a.group('island', () => a.region(blob([[40, 470], [120, 380], [300, 356], [480, 380], [560, 470], [300, 512]], 1), 'yellow', 'sand'));
      a.at({ x: 180, y: 256, s: 0.85 }, (b) => R.palmTree(b, 'green', 'brown', 'brown'));
      a.at({ x: 396, y: 380, s: 0.95 }, (b) => V.treasureChest(b, 'brown', 'orange', 'orange', ['red', 'purple', 'green']));
    } },
];

module.exports = { B6 };
