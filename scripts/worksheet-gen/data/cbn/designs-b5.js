/**
 * data/cbn/designs-b5.js — Color by Number, batch 5 (2026-10-05): 10 scenes + 10 pictures.
 * Reviewed against docs/worksheet-gen/cbn-review-checklist.md; gated by tools/cbn-preview.js.
 */
'use strict';
const P = require('../../primitives/cbn-art/parts.js');
const Q = require('../../primitives/cbn-art/parts2.js');
const R = require('../../primitives/cbn-art/parts3.js');
const S = require('../../primitives/cbn-art/parts4.js');
const U = require('../../primitives/cbn-art/parts6.js');
const { blob, rrect, ellipse } = require('../../primitives/cbn-art/core.js');

const W = 600, H = 560;
const mound = (a, x, y, w, c = 'green', h = 34) => a.group('mound', () => a.region(blob([[x - w, y + h * 0.5], [x - w * 0.7, y - h * 0.5], [x, y - h * 0.8], [x + w * 0.7, y - h * 0.5], [x + w, y + h * 0.5], [x, y + h * 0.9]], 1), c, 'grass'));
const skyGrass = (a, horizon = 0.6, sky = 'lightblue', grass = 'green') => { a.region(`M0 0H${W}V${H}H0Z`, sky, 'sky'); a.region(`M0 ${H * horizon}C${W * 0.3} ${H * horizon - 34} ${W * 0.7} ${H * horizon - 14} ${W} ${H * horizon}V${H}H0Z`, grass, 'grass'); };
const flakes = (a, pts) => pts.forEach(([x, y]) => a.at({ x, y }, (b) => Q.snowflake(b)));

const B5 = [
  /* ------------------------------------------------------------ pictures */
  { id: 'caterpillar', kind: 'picture', level: 2, names: { en: 'Caterpillar' },
    draw(a) {
      a.group('leaf', () => { a.region('M40 420Q300 330 560 420Q300 500 40 420Z', 'green', 'leaf'); });
      a.at({ x: 320, y: 360, s: 1.25 }, (b) => U.caterpillar(b, ['yellow', 'lightgreen'], 'red', 'brown'));
    } },
  { id: 'peacock', kind: 'picture', level: 3, names: { en: 'Peacock' },
    draw(a) { a.at({ x: 300, y: 320, s: 1.35 }, (b) => U.peacock(b, 'blue', ['green', 'lightgreen'], ['purple', 'yellow'], 'orange')); } },
  { id: 'burger', kind: 'picture', level: 3, names: { en: 'Burger' },
    draw(a) {
      a.group('plate', () => a.region(ellipse(300, 440, 230, 34), 'lightblue', 'plate'));
      a.at({ x: 300, y: 320, s: 1.45 }, (b) => U.burger(b, 'orange', 'brown', 'yellow', 'green', 'red'));
    } },
  { id: 'crayon-box', kind: 'picture', level: 3, names: { en: 'Box of Crayons' },
    draw(a) { a.at({ x: 300, y: 330, s: 1.5 }, (b) => U.crayonBox(b, 'yellow', 'green', ['red', 'orange', 'blue', 'purple', 'pink', 'brown'])); } },
  { id: 'paint-palette', kind: 'picture', level: 3, names: { en: 'Paint Palette' },
    draw(a) { a.at({ x: 290, y: 300, s: 1.55 }, (b) => U.palette(b, 'brown', ['red', 'yellow', 'blue', 'green', 'purple', 'orange'], 'yellow')); } },
  { id: 'donut', kind: 'picture', level: 1, names: { en: 'Donut' },
    draw(a) { a.at({ x: 300, y: 290, s: 1.7 }, (b) => U.donut(b, 'orange', 'pink', 'lightblue')); } },
  { id: 'watermelon', kind: 'picture', level: 1, names: { en: 'Watermelon' },
    draw(a) { a.at({ x: 300, y: 230, s: 1.6 }, (b) => U.watermelon(b, 'red', 'green', 'lightgreen')); } },
  { id: 'polar-bear', kind: 'picture', level: 1, names: { en: 'Polar Bear' },
    draw(a) {
      // the bear stands on an ice floe floating in the water (water behind, floe on top)
      a.group('water', () => a.region('M20 450Q300 420 580 450V524Q300 544 20 524Z', 'blue', 'water'));
      a.group('ice', () => a.region(blob([[80, 470], [120, 436], [300, 428], [480, 436], [520, 470], [300, 496]], 1), 'lightblue', 'ice'));
      a.at({ x: 270, y: 350, s: 1.4 }, (b) => U.polarBear(b, 'none', 'black', 'red'));
      a.at({ x: 500, y: 110, s: 0.9 }, (b) => P.sun(b));
    } },
  { id: 'hedgehog', kind: 'picture', level: 2, names: { en: 'Hedgehog' },
    draw(a) {
      mound(a, 300, 470, 250);
      a.at({ x: 90, y: 400, s: 0.9 }, (b) => P.mushroom(b, 'red', 'none'));
      a.at({ x: 290, y: 360, s: 1.4 }, (b) => U.hedgehog(b, 'brown', 'orange', 'red'));
    } },
  { id: 'rain-boots', kind: 'picture', level: 2, names: { en: 'Rain Boots' },
    draw(a) {
      // the umbrella STANDS on its hook on the ground behind the boots (it hung in mid-air)
      a.at({ x: 484, y: 398, s: 0.7 }, (b) => Q.umbrella(b, 'blue', 'pink', 'brown'));
      a.at({ x: 250, y: 340, s: 1.35 }, (b) => U.boots(b, 'yellow', 'brown'));
      a.group('puddle', () => a.region(ellipse(300, 490, 240, 30), 'lightblue', 'puddle'));
    } },

  /* ------------------------------------------------------------ scenes */
  { id: 'caterpillar-leaf', kind: 'scene', level: 2, names: { en: 'Hungry Caterpillar' },
    draw(a) {
      skyGrass(a, 0.7, 'lightblue', 'lightgreen');
      a.at({ x: 490, y: 90, s: 0.9 }, (b) => P.sun(b));
      // it crawls along a BIG leaf (the name promises one)
      a.group('leaf', () => { a.region('M20 460Q250 290 580 400Q330 560 20 460Z', 'green', 'leaf'); a.line('M60 456Q300 420 540 404', 3); });
      a.at({ x: 300, y: 350, s: 1.15 }, (b) => U.caterpillar(b, ['yellow', 'orange'], 'red', 'brown'));
    } },
  { id: 'igloo', kind: 'scene', level: 1, names: { en: 'Igloo' },
    draw(a) {
      Q.snow(a, W, H, { horizon: 0.64 });
      a.at({ x: 480, y: 90, s: 0.9 }, (b) => P.sun(b));
      a.at({ x: 280, y: 380, s: 1.2 }, (b) => U.igloo(b, 'none', 'blue'));
      flakes(a, [[80, 80], [200, 150], [330, 60], [90, 250], [540, 260]]);
    } },
  { id: 'swan-lake', kind: 'scene', level: 1, names: { en: 'Swan on the Lake' },
    draw(a) {
      a.region(`M0 0H${W}V${H}H0Z`, 'lightblue', 'sky');
      a.region(`M0 ${H * 0.5}H${W}V${H}H0Z`, 'blue', 'lake');
      a.at({ x: 480, y: 90, s: 0.9 }, (b) => P.sun(b));
      a.at({ x: 280, y: 380, s: 1.35 }, (b) => U.swan(b, 'none', 'orange'));
      a.line('M60 470q20 -10 40 0M440 500q20 -10 40 0M120 520q20 -10 40 0', 3);
    } },
  { id: 'polar-ice', kind: 'scene', level: 1, names: { en: 'Polar Bear on the Ice' },
    draw(a) {
      a.region(`M0 0H${W}V${H}H0Z`, 'lightblue', 'sky');
      a.region(`M0 ${H * 0.62}H${W}V${H}H0Z`, 'blue', 'sea');
      a.group('ice', () => a.region('M-10 400Q120 360 300 368Q480 360 610 400V560H-10Z', 'none', 'ice'), { edgeOk: true });
      a.at({ x: 250, y: 330, s: 1.2 }, (b) => U.polarBear(b, 'none', 'black', 'red'));
      a.at({ x: 490, y: 90, s: 0.9 }, (b) => P.sun(b));
    } },
  { id: 'windmill-hill', kind: 'scene', level: 2, names: { en: 'Windmill on the Hill' },
    draw(a) {
      P.meadow(a, W, H, { horizon: 0.6 });
      a.at({ x: 90, y: 80, s: 0.8 }, (b) => P.sun(b));
      a.at({ x: 300, y: 300, s: 1.0 }, (b) => U.windmill(b, 'red', 'brown', 'none', 'blue'));
    } },
  { id: 'hedgehog-autumn', kind: 'scene', level: 2, names: { en: 'Hedgehog in Autumn' },
    draw(a) {
      skyGrass(a, 0.6);
      a.at({ x: 470, y: 230, s: 0.95 }, (b) => P.tree(b, 'orange', 'brown'));
      a.at({ x: 100, y: 80, s: 0.8 }, (b) => P.sun(b));
      a.at({ x: 230, y: 420, s: 1.05 }, (b) => U.hedgehog(b, 'brown', 'yellow', 'red'));
    } },
  { id: 'christmas-tree', kind: 'scene', level: 2, names: { en: 'Christmas Tree' },
    draw(a) {
      Q.snow(a, W, H, { horizon: 0.72, sky: 'blue' });
      flakes(a, [[80, 80], [520, 90], [70, 260], [530, 280], [120, 170], [480, 190]]);
      a.at({ x: 300, y: 270, s: 1.05 }, (b) => U.christmasTree(b, 'green', 'yellow', ['red', 'yellow', 'purple'], 'brown'));
    } },
  { id: 'fire-truck', kind: 'scene', level: 3, names: { en: 'Fire Truck' },
    draw(a) {
      Q.road(a, W, H, { horizon: 0.56 });
      a.at({ x: 80, y: 66, s: 0.75 }, (b) => P.sun(b));
      a.at({ x: 522, y: 236, s: 0.7 }, (b) => P.tree(b));
      a.at({ x: 270, y: 404, s: 1.05 }, (b) => U.fireTruck(b, 'red', 'lightblue', 'black', 'grey', 'grey', 'blue'));
    } },
  { id: 'birthday-party', kind: 'scene', level: 3, names: { en: 'Birthday Party' },
    draw(a) {
      a.region(`M0 0H${W}V${H}H0Z`, 'yellow', 'wall');
      a.region(`M0 ${H * 0.78}H${W}V${H}H0Z`, 'brown', 'floor');
      a.group('table', () => { a.region(rrect(160, 330, 260, 30, 10), 'blue', 'table top'); a.region(rrect(176, 350, 32, 100, 8), 'blue', 'table leg'); a.region(rrect(372, 350, 32, 100, 8), 'blue', 'table leg'); });
      a.at({ x: 290, y: 222, s: 0.8 }, (b) => R.cake(b, 'pink', 'orange', 'none', 'purple', 'orange', 'none'));
      // the balloons are tied to a weight standing on the floor
      a.at({ x: 500, y: 372, s: 0.85 }, (b) => U.balloonBunch(b, ['red', 'purple', 'green'], 'pink'));
      a.at({ x: 82, y: 424, s: 0.62 }, (b) => S.giftBox(b, 'green', 'red', 'purple'));
    } },
];

module.exports = { B5 };
