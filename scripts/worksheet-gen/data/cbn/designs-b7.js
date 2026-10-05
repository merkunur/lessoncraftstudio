/**
 * data/cbn/designs-b7.js — Color by Number, batch 7 (2026-10-05): 10 scenes + 10 pictures.
 * Reviewed against docs/worksheet-gen/cbn-review-checklist.md; gated by tools/cbn-preview.js.
 */
'use strict';
const P = require('../../primitives/cbn-art/parts.js');
const Q = require('../../primitives/cbn-art/parts2.js');
const T = require('../../primitives/cbn-art/parts5.js');
const W8 = require('../../primitives/cbn-art/parts8.js');
const { blob, rrect, ellipse } = require('../../primitives/cbn-art/core.js');

const W = 600, H = 560;
const mound = (a, x, y, w, c = 'green', h = 34) => a.group('mound', () => a.region(blob([[x - w, y + h * 0.5], [x - w * 0.7, y - h * 0.5], [x, y - h * 0.8], [x + w * 0.7, y - h * 0.5], [x + w, y + h * 0.5], [x, y + h * 0.9]], 1), c, 'grass'));
const skyGrass = (a, horizon = 0.6, sky = 'lightblue', grass = 'green') => { a.region(`M0 0H${W}V${H}H0Z`, sky, 'sky'); a.region(`M0 ${H * horizon}C${W * 0.3} ${H * horizon - 34} ${W * 0.7} ${H * horizon - 14} ${W} ${H * horizon}V${H}H0Z`, grass, 'grass'); };
const stars = (a, pts, c = 'yellow') => pts.forEach(([x, y, s]) => a.at({ x, y, s: s || 1 }, (b) => P.star5(b, c)));
const bubbles = (a, pts) => pts.forEach(([x, y]) => a.at({ x, y }, (b) => P.bubble(b, 13)));

const B7 = [
  /* ------------------------------------------------------------ pictures */
  { id: 'panda', kind: 'picture', level: 2, names: { en: 'Panda' },
    draw(a) { mound(a, 300, 486, 240); a.at({ x: 500, y: 420, s: 0.9 }, (b) => P.flower(b, 'red', 'orange', 'green', 25)); a.at({ x: 500, y: 100, s: 0.8 }, (b) => P.sun(b)); a.at({ x: 270, y: 320, s: 1.5 }, (b) => W8.panda(b, 'none', 'black', 'green')); } },
  { id: 'seahorse', kind: 'picture', level: 1, names: { en: 'Seahorse' },
    draw(a) {
      a.at({ x: 470, y: 520 }, (b) => P.seaweed(b, 'green', 200));
      a.at({ x: 280, y: 290, s: 1.45 }, (b) => W8.seahorse(b, 'orange', 'yellow', 'yellow'));
      [[120, 120], [150, 80], [100, 200]].forEach(([x, y]) => a.at({ x, y }, (b) => P.bubble(b, 14)));
    } },
  { id: 'gingerbread', kind: 'picture', level: 1, names: { en: 'Gingerbread Man' },
    draw(a) { a.at({ x: 300, y: 290, s: 1.45 }, (b) => W8.gingerbread(b, 'brown', 'red', 'green', 'pink')); } },
  { id: 'koala', kind: 'picture', level: 2, names: { en: 'Koala' },
    draw(a) {
      a.group('branch', () => { a.region('M60 440Q300 400 520 430L520 466Q300 436 60 474Z', 'brown', 'branch'); a.at({ x: 490, y: 446, r: -40 }, (c) => c.region('M0 0Q30 -40 70 -24Q44 12 0 0Z', 'green', 'leaf')); a.at({ x: 100, y: 456, r: 200 }, (c) => c.region('M0 0Q30 -40 70 -24Q44 12 0 0Z', 'green', 'leaf')); });
      a.at({ x: 300, y: 312, s: 1.3 }, (b) => W8.koala(b, 'grey', 'pink', 'black'));
    } },
  { id: 'flamingo', kind: 'picture', level: 2, names: { en: 'Flamingo' },
    draw(a) {
      a.group('water', () => a.region(ellipse(300, 490, 240, 34), 'lightblue', 'water'));
      a.at({ x: 280, y: 300, s: 1.35 }, (b) => W8.flamingo(b, 'pink', 'none', 'black'));
      a.at({ x: 500, y: 460, s: 0.9 }, (b) => P.cattail(b, 'brown', 'green'));
    } },
  { id: 'pizza-slice', kind: 'picture', level: 2, names: { en: 'Pizza Slice' },
    draw(a) { a.group('plate', () => a.region(ellipse(300, 460, 220, 40), 'blue', 'plate')); a.at({ x: 300, y: 290, s: 1.45 }, (b) => W8.pizza(b, 'orange', 'yellow', 'red', 'green')); } },
  { id: 'astronaut', kind: 'picture', level: 3, names: { en: 'Astronaut' },
    draw(a) {
      a.at({ x: 300, y: 300, s: 1.3 }, (b) => W8.astronaut(b, 'none', 'lightblue', 'blue', 'grey', 'red'));
      // stars only (a planet beside his glove looked like he was holding it)
      [[90, 110, 'yellow'], [510, 120, 'orange'], [80, 420, 'orange'], [520, 440, 'yellow']].forEach(([x, y, c]) => a.at({ x, y }, (b) => P.star5(b, c)));
    } },
  { id: 'ufo', kind: 'picture', level: 3, names: { en: 'Friendly Alien' },
    draw(a) {
      a.at({ x: 300, y: 270, s: 1.45 }, (b) => W8.ufo(b, 'purple', 'lightblue', 'green', 'yellow'));
      [[80, 80], [520, 90], [90, 480], [510, 470]].forEach(([x, y]) => a.at({ x, y }, (b) => P.star5(b, 'orange')));
    } },
  { id: 'camping-tent', kind: 'picture', level: 3, names: { en: 'Camping' },
    draw(a) {
      mound(a, 300, 486, 270);
      a.at({ x: 210, y: 330, s: 1.0 }, (b) => W8.tent(b, 'orange', 'yellow', 'red'));
      a.at({ x: 460, y: 390, s: 0.8 }, (b) => W8.campfire(b, 'brown', 'red', 'orange', 'yellow', 'grey'));
    } },
  /* ------------------------------------------------------------ scenes */
  { id: 'panda-bamboo', kind: 'scene', level: 1, names: { en: 'Panda in the Forest' },
    draw(a) {
      skyGrass(a, 0.68);
      a.at({ x: 90, y: 480, s: 1.0 }, (b) => W8.bamboo(b, 'lightgreen', 380, false));
      a.at({ x: 300, y: 330, s: 1.3 }, (b) => W8.panda(b, 'none', 'black', 'green'));
      a.at({ x: 500, y: 90, s: 0.85 }, (b) => P.sun(b));
    } },
  { id: 'seahorse-sea', kind: 'scene', level: 1, names: { en: 'Little Seahorse' },
    draw(a) {
      P.sea(a, W, H);
      a.at({ x: 500, y: 520 }, (b) => P.seaweed(b, 'green', 200));
      a.at({ x: 270, y: 230, s: 1.2 }, (b) => W8.seahorse(b, 'orange', 'yellow', 'yellow'));
      bubbles(a, [[110, 100], [140, 60], [470, 120]]);
    } },
  { id: 'gingerbread-snow', kind: 'scene', level: 1, names: { en: 'Gingerbread in the Snow' },
    draw(a) {
      Q.snow(a, W, H, { horizon: 0.72, sky: 'lightblue' });
      a.at({ x: 300, y: 296, s: 1.25 }, (b) => W8.gingerbread(b, 'brown', 'red', 'green', 'red'));
      [[90, 80], [520, 90], [80, 260], [530, 280]].forEach(([x, y]) => a.at({ x, y }, (b) => Q.snowflake(b)));
    } },
  { id: 'koala-tree', kind: 'scene', level: 2, names: { en: 'Koala in the Tree' },
    draw(a) {
      skyGrass(a, 0.82);
      a.group('tree', () => { a.region('M440 570L460 120L520 120L540 570Z', 'brown', 'trunk'); a.region('M300 140C300 60 420 30 520 60C610 80 620 160 600 200C560 240 340 240 300 140Z', 'green', 'leaves'); }, { edgeOk: true });
      a.at({ x: 290, y: 214, s: 1.15 }, (b) => W8.koala(b, 'grey', 'pink', 'black'));
      // the branch it SITS on, in front of its lap and joined to the trunk
      a.group('branch', () => a.region('M150 326Q300 312 470 300L470 336Q300 348 150 360Z', 'brown', 'branch'));
      a.at({ x: 100, y: 90, s: 0.85 }, (b) => P.sun(b));
    } },
  { id: 'flamingo-lake', kind: 'scene', level: 2, names: { en: 'Flamingo at the Lake' },
    draw(a) {
      a.region(`M0 0H${W}V${H}H0Z`, 'lightblue', 'sky');
      a.region(`M0 ${H * 0.6}H${W}V${H}H0Z`, 'blue', 'lake');
      a.at({ x: 90, y: 90, s: 0.85 }, (b) => P.sun(b));   // away from the beak
      // the flamingo WADES: its legs go down into the water (standing on the horizon it hung in the air)
      a.at({ x: 230, y: 290, s: 1.3 }, (b) => W8.flamingo(b, 'pink', 'none', 'black'));
      a.at({ x: 100, y: 470, s: 0.8 }, (b) => P.lilyPad(b, 'green', 40));
      a.at({ x: 560, y: 460, s: 0.9 }, (b) => P.cattail(b, 'brown', 'green'));
    } },
  { id: 'campsite', kind: 'scene', level: 2, names: { en: 'Camping at Night' },
    draw(a) {
      a.region(`M0 0H${W}V${H}H0Z`, 'blue', 'night sky');
      a.region(`M0 ${H * 0.66}C${W * 0.3} ${H * 0.6} ${W * 0.7} ${H * 0.64} ${W} ${H * 0.66}V${H}H0Z`, 'green', 'grass');
      a.at({ x: 470, y: 90, s: 1.1 }, (b) => P.moon(b));
      stars(a, [[90, 80], [230, 60], [330, 150], [80, 220]]);
      a.at({ x: 200, y: 380, s: 0.95 }, (b) => W8.tent(b, 'orange', 'yellow', 'red'));
      a.at({ x: 460, y: 440, s: 0.75 }, (b) => W8.campfire(b, 'brown', 'red', 'orange', 'yellow', 'grey'));
    } },
  { id: 'pizza-picnic', kind: 'scene', level: 2, names: { en: 'Pizza Picnic' },
    draw(a) {
      skyGrass(a, 0.48);
      a.at({ x: 90, y: 80, s: 0.8 }, (b) => P.sun(b));
      a.group('blanket', () => a.region('M40 470L150 320L560 340L500 520Z', 'red', 'blanket'));
      a.at({ x: 300, y: 380, s: 0.85, r: -12 }, (b) => W8.pizza(b, 'orange', 'yellow', 'brown', 'green'));
      a.at({ x: 500, y: 230, s: 0.7 }, (b) => P.tree(b));
    } },
  { id: 'space-explorer', kind: 'scene', level: 3, names: { en: 'Space Explorer' },
    draw(a) {
      P.space(a, W, H, { sky: 'blue' });
      a.region(`M0 ${H * 0.78}C${W * 0.3} ${H * 0.72} ${W * 0.7} ${H * 0.76} ${W} ${H * 0.72}V${H}H0Z`, 'grey', 'moon ground');
      a.at({ x: 480, y: 96, s: 1.05 }, (b) => P.planet(b, 'orange', 'pink'));
      stars(a, [[80, 70], [230, 50], [60, 240], [560, 280]]);
      a.at({ x: 200, y: 290, s: 1.1 }, (b) => W8.astronaut(b, 'none', 'lightblue', 'red', 'purple', 'yellow'));
      a.at({ x: 460, y: 296, s: 1.0 }, (b) => P.rocket(b, 'none', 'red', 'red', 'lightblue', 'orange', 'yellow'));
    } },
  { id: 'alien-visit', kind: 'scene', level: 3, names: { en: 'Alien Visit' },
    draw(a) {
      a.region(`M0 0H${W}V${H}H0Z`, 'blue', 'night sky');
      a.region(`M0 ${H * 0.76}C${W * 0.3} ${H * 0.7} ${W * 0.7} ${H * 0.74} ${W} ${H * 0.76}V${H}H0Z`, 'green', 'grass');
      stars(a, [[80, 70], [520, 60], [60, 260], [550, 250]]);
      a.at({ x: 300, y: 180, s: 1.15 }, (b) => W8.ufo(b, 'purple', 'lightblue', 'green', 'orange'));
      a.at({ x: 100, y: 400, s: 0.85 }, (b) => P.pineTree(b, 'green', 'brown'));
    } },
  { id: 'beach-friends', kind: 'scene', level: 3, names: { en: 'Beach Friends' },
    draw(a) {
      a.region(`M0 0H${W}V${H}H0Z`, 'lightblue', 'sky');
      a.region(`M0 ${H * 0.42}H${W}V${H}H0Z`, 'blue', 'sea');
      a.region(`M0 ${H * 0.6}C${W * 0.3} ${H * 0.56} ${W * 0.6} ${H * 0.64} ${W} ${H * 0.58}V${H}H0Z`, 'yellow', 'sand');
      a.at({ x: 90, y: 80, s: 0.8 }, (b) => P.sun(b));
      a.at({ x: 160, y: 446, s: 1.05 }, (b) => P.turtle(b, 'green', 'lightgreen', 'green'));
      a.at({ x: 420, y: 424, s: 1.15 }, (b) => P.crab(b, 'red'));
      a.at({ x: 520, y: 520, s: 0.5 }, (b) => T.starfish(b, 'orange'));
      a.at({ x: 300, y: 520, s: 0.85 }, (b) => P.shell(b, 'pink'));
    } },
];

module.exports = { B7 };
