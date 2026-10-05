/**
 * cbn-art/parts6.js — Color by Number parts, batch 5 (2026-10-05): caterpillar, peacock, burger, crayon box, paint
 * palette, donut, watermelon slice, polar bear, hedgehog, rain boots, igloo, swan, windmill, Christmas tree, fire
 * truck, balloon bunch. Conventions as parts.js; every object is ONE group at export (checkSolid).
 */
'use strict';
const { circle, ellipse, rrect, blob, curve, poly, star, bumps } = require('./core.js');
const { eye, smile, face } = require('./parts.js');

function caterpillar(a, cols = ['green', 'lightgreen'], head = 'red', feet = 'brown') {
  const xs = [-150, -100, -50, 0, 50];
  xs.forEach((x, i) => { a.region(ellipse(x, 40, 12, 14), feet, 'foot'); });
  xs.forEach((x, i) => a.region(circle(x, 0, 36), cols[i % 2], 'body segment'));
  a.line('M100 -40Q90 -80 70 -96M126 -40Q132 -80 150 -94', 3); a.ink(circle(70, -98, 8)); a.ink(circle(152, -96, 8));
  a.region(circle(110, -10, 46), head, 'caterpillar head');
  face(a, 112, -14, 1.3, 32);
}
function peacock(a, body = 'blue', tail = ['green', 'lightgreen'], eyes = ['purple', 'yellow'], beak = 'orange') {
  const { outline } = require('./v2.js');
  a.group('peacock', () => {
    // the fan: seven feathers drawn outside-in (0,6,1,5,2,4,3) so the layering is the same on both sides and the
    // middle feather is on top
    [0, 6, 1, 5, 2, 4, 3].forEach((i) => {
      const t = (-160 + i * 23.3) * Math.PI / 180, x = Math.cos(t) * 150, y = Math.sin(t) * 150 + 20;
      a.at({ x: x * 0.55, y: y * 0.55 + 10, r: -160 + i * 23.3 + 90 }, (c) => {
        c.region(ellipse(0, -60, 38, 80), Array.isArray(tail) ? tail[i % tail.length] : tail, 'tail feather');
        c.region(ellipse(0, -90, 22, 28), eyes[0], 'feather eye');
        c.region(ellipse(0, -90, 10, 13), eyes[1], 'feather eye centre');
      });
    });
    a.line('M-14 112V136M14 112V136M-26 140L-14 136L-4 140M4 140L14 136L26 140', 4);
    // the crest grows out of the head (it floated as three dots above it)
    a.region(outline([[-16, -98], [-30, -124], [4, -140], [38, -124], [36, -98]]), body, 'crest');
    [[-28, -126], [4, -141], [36, -126]].forEach(([x, y]) => a.ink(circle(x, y, 6)));
    // ONE silhouette: body, neck and head (the neck sat on the body with a seam)
    a.region(outline([[-40, 112], [-50, 60], [-36, 18], [-14, -2], [-14, -42], [-22, -80], [-8, -108], [18, -110],
      [32, -92], [28, -68], [14, -50], [16, -2], [36, 18], [50, 60], [40, 112], [0, 124]]), body, 'peacock');
    a.region(outline([[26, -98], [58, -86, 1], [26, -74]]), beak, 'beak');
    eye(a, 10, -88, 0.95);
  });
}
function burger(a, bun = 'orange', patty = 'brown', cheese = 'yellow', lettuce = 'green', tomato = 'red') {
  a.region('M-130 50H130Q130 100 90 104H-90Q-130 100 -130 50Z', bun, 'bottom bun');
  a.region(rrect(-138, 18, 276, 40, 20), patty, 'patty');
  a.region('M-140 10H140L126 42L100 18L76 54L52 18L28 54L4 18L-20 54L-44 18L-68 54L-92 18L-116 46Z', cheese, 'cheese');   // big drips: the small ones were crumbs
  a.region(rrect(-128, -14, 256, 30, 12), tomato, 'tomato');
  // the lettuce's top runs straight up under the bun (scallops left white gaps under it); the wavy edge hangs below
  a.region('M-148 -12L-138 -32H138L148 -12Q130 -2 104 -12Q78 -2 52 -12Q26 -2 0 -12Q-26 -2 -52 -12Q-78 -2 -104 -12Q-130 -2 -148 -12Z', lettuce, 'lettuce');
  a.region('M-130 -24Q-130 -120 0 -126Q130 -120 130 -24Z', bun, 'top bun');
  [[-60, -80], [-20, -100], [30, -94], [70, -70], [0, -64], [-90, -52]].forEach(([x, y]) => a.region(ellipse(x, y, 9, 5), 'none', 'seed'));
}
function crayonBox(a, box = 'yellow', label = 'green', cols = ['red', 'orange', 'blue', 'purple', 'pink', 'brown']) {
  cols.forEach((c, i) => { const x = -100 + i * 40; a.region(`M${x - 17} -40V-96L${x} -128L${x + 17} -96V-40Z`, c, 'crayon'); a.line(`M${x - 17} -96H${x + 17}`, 2.6); });
  a.region(rrect(-130, -60, 260, 190, 12), box, 'crayon box');
  a.region(rrect(-96, -10, 192, 90, 20), label, 'label');
  a.region(star(0, 34, 34, 15, 5, -90, 4), box, 'star');
}
function palette(a, board = 'brown', cols = ['red', 'yellow', 'blue', 'green', 'purple', 'orange'], brush = 'yellow') {
  a.region('M-150 0C-160 -100 -40 -150 60 -130C160 -110 180 -10 120 40C80 70 90 110 40 120C-60 140 -140 100 -150 0Z', board, 'palette');
  a.region(ellipse(36, 60, 26, 20), 'none', 'thumb hole');
  [[-100, -20], [-70, -86], [0, -110], [74, -94], [114, -30], [-70, 60]].forEach(([x, y], i) => a.region(blob([[x - 24, y], [x - 10, y - 22], [x + 18, y - 20], [x + 26, y + 6], [x + 4, y + 22], [x - 20, y + 16]], 1), cols[i % cols.length], 'paint'));
  a.at({ x: 40, y: 0, r: -36 }, (c) => { c.region(rrect(-12, -20, 24, 140, 10), brush, 'brush handle'); c.region(rrect(-14, -44, 28, 28, 4), 'grey', 'ferrule'); c.region('M-14 -44Q-16 -80 0 -96Q16 -80 14 -44Z', cols[0], 'bristles'); });
}
function donut(a, dough = 'orange', icing = 'pink', plate = 'lightblue') {
  if (plate) a.region(ellipse(0, 70, 150, 30), plate, 'plate');
  a.region('M-120 0A120 90 0 1 0 120 0A120 90 0 1 0 -120 0ZM-40 0A40 28 0 1 1 40 0A40 28 0 1 1 -40 0Z', dough, 'donut');
  a.region('M-110 -8C-110 -70 110 -70 110 -8C104 20 80 6 60 22C40 46 20 44 0 48C-20 50 -50 30 -70 30C-90 36 -104 18 -110 -8ZM-40 0A40 28 0 1 1 40 0A40 28 0 1 1 -40 0Z', icing, 'icing');   // the same hole as the donut: no sliver of dough
  [[-70, -30, 20], [-30, -42, -30], [40, -40, 30], [80, -20, -20], [-84, 6, 40], [70, 8, 70]].forEach(([x, y, r]) => a.at({ x, y, r }, (c) => c.line('M-8 0H8', 5)));
}
function watermelon(a, flesh = 'red', rind = 'green', inner = 'lightgreen') {
  a.region('M-170 -20H170A170 170 0 0 1 -170 -20Z', rind, 'rind');
  a.region('M-150 -20H150A150 150 0 0 1 -150 -20Z', inner, 'inner rind');
  a.region('M-132 -20H132A132 132 0 0 1 -132 -20Z', flesh, 'watermelon');
  [[-70, 20], [-20, 40], [40, 30], [80, 4], [-40, 70], [10, 84], [-100, 0]].forEach(([x, y]) => a.ink(ellipse(x, y, 6, 9)));
}
function polarBear(a, fur = 'none', nose = 'black', scarf = null) {
  // the one-silhouette walking bear (the old one was a head blob pasted on an ellipse); same footprint as before
  a.at({ x: -4, y: 86, s: 0.8 }, (b) => require('./v2.js').bear(b, fur, 'none', fur, scarf));
}
function hedgehog(a, spines = 'brown', face_ = 'orange', apple = 'red', feet = 'pink') {
  a.region(rrect(-56, 40, 40, 46, 14), feet, 'foot'); a.region(rrect(18, 40, 40, 46, 14), feet, 'foot');
  // the spiky coat: one zigzag shape (separate spikes would be crumbs)
  // the coat ends UNDER the face (running it to the far side left a spike poking out above the face)
  const pts = []; for (let i = 0; i <= 15; i++) { const t = Math.PI * (1 + 0.72 * i / 15), r = i % 2 ? 96 : 120; pts.push([Math.cos(t) * r * 1.1, Math.sin(t) * r * 0.9 + 30]); }
  a.region('M' + pts.map((p) => p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join('L') + 'L120 50Q0 80 -132 50Z', spines, 'spines');
  a.region(blob([[56, -40], [124, -16], [168, 18], [172, 34], [140, 58], [70, 60], [36, 26]], 1), face_, 'hedgehog face');
  a.ink(circle(170, 28, 8)); eye(a, 112, 12, 1.1);
  a.region(circle(-20, -62, 32), apple, 'apple'); a.region(blob([[-22, -84], [-2, -124], [18, -104], [4, -84]], 1), 'green', 'leaf');   // grows OUT of the apple (it touched it at a point)   // the apple sits INTO the spines (it only rested on a tip)
}
function boots(a, c = 'yellow', sole = 'brown') {
  [[-60, 0], [60, 20]].forEach(([x, y]) => {
    a.region(`M${x - 40} ${y - 140}H${x + 30}V${y + 20}Q${x + 90} ${y + 30} ${x + 90} ${y + 70}H${x - 40}Z`, c, 'boot');
    a.region(rrect(x - 44, y + 58, 138, 28, 9), sole, 'sole');
    a.region(rrect(x - 46, y - 150, 82, 26, 8), c, 'boot top');
  });
}
function igloo(a, snow = 'none', door = 'blue') {
  a.region('M-160 60A160 150 0 0 1 160 60Z', snow, 'igloo');
  // brick lines stay INSIDE the dome (the first draft's top row stuck out into the sky)
  a.line('M-150 10H150M-116 -40H116M-100 60V10M100 60V10M0 10V-40M-74 10V-40M74 10V-40M-40 -40V-82M40 -40V-82', 2.6);
  a.region('M-50 60V20A50 50 0 0 1 50 20V60Z', 'lightblue', 'entrance');
  a.region('M-30 60V30A30 30 0 0 1 30 30V60Z', door, 'doorway');
}
function swan(a, body = 'none', beak = 'orange', water = null) {
  void water;
  const { outline } = require('./v2.js');
  a.group('swan', () => {
    // ONE silhouette: body, S-neck and head (the neck was pasted on the body with a seam)
    a.region(outline([[-150, -40, 1], [-100, -30], [10, -34], [56, -26], [90, -70], [70, -122], [76, -158], [100, -178],
      [126, -174], [138, -156], [120, -148], [100, -152], [96, -130], [114, -80], [114, -30], [112, 2], [80, 50],
      [-80, 50], [-122, 6]]), body, 'swan');
    a.region(blob([[-90, -10], [-60, -60], [20, -40], [40, 10], [-20, 30]], 1), body, 'wing');
    a.line(curve([[-50, -10], [-10, -12], [20, 4]]), 2.4);
    a.region(outline([[132, -166], [172, -152, 1], [134, -140]]), beak, 'beak');
    eye(a, 112, -160, 0.95);
  });
}
function windmill(a, wall = 'red', roof = 'brown', sails = 'none', door = 'blue') {
  a.region(poly([[-60, -60], [60, -60], [80, 160], [-80, 160]], 6), wall, 'windmill tower');
  a.region(poly([[-72, -54], [0, -130], [72, -54]], 8), roof, 'roof');
  a.region('M-24 160V110A24 24 0 0 1 24 110V160Z', door, 'door');
  a.region(circle(0, 30, 18), 'lightblue', 'window');
  [0, 90, 180, 270].forEach((r) => a.at({ x: 0, y: -80, r: r + 45 }, (c) => c.region(rrect(-26, -170, 52, 140, 6), sails, 'sail')));
  a.region(circle(0, -80, 18), roof, 'hub');
}
function christmasTree(a, tree = 'green', star_ = 'yellow', balls = ['red', 'blue', 'purple'], pot = 'brown') {
  a.region(rrect(-40, 150, 80, 60, 8), pot, 'trunk pot');
  a.region(poly([[0, -150], [70, -60], [40, -60], [110, 30], [70, 30], [140, 150], [-140, 150], [-70, 30], [-110, 30], [-40, -60], [-70, -60]], 8), tree, 'tree');
  [[-30, -40], [30, 0], [-60, 70], [10, 60], [70, 110], [-20, 120], [50, -60]].forEach(([x, y], i) => a.region(circle(x, y, 15), balls[i % balls.length], 'bauble'));
  a.region(star(0, -156, 36, 16, 5, -90, 5), star_, 'star');
}
function fireTruck(a, body = 'red', glass = 'lightblue', tyre = 'black', hub = 'grey', ladder = 'grey', light = 'blue') {
  a.region(rrect(-190, -60, 260, 100, 12), body, 'truck body');
  a.region(rrect(96, -138, 34, 34, 8), light, 'siren');   // on the cab roof (it floated above the body, under the ladder)
  a.region(rrect(60, -110, 110, 150, 18), body, 'cab');
  a.region(rrect(80, -94, 72, 56, 8), glass, 'window');
  // the ladder RESTS on the truck (it floated 14 units above it)
  a.region(rrect(-180, -82, 200, 28, 6), ladder, 'ladder');
  a.line('M-150 -82V-54M-110 -82V-54M-70 -82V-54M-30 -82V-54', 3);
  a.region(rrect(-170, -40, 200, 30, 6), 'yellow', 'stripe');
  a.region(rrect(146, -4, 30, 24, 7), 'yellow', 'light');
  [-120, 110].forEach((x) => { a.region(circle(x, 50, 36), tyre, 'tyre'); a.region(circle(x, 50, 15), hub, 'hubcap'); });
}
function balloonBunch(a, cols = ['red', 'yellow', 'blue', 'green'], weight = 'pink') {
  // one ROW of balloons (none in front of another: a string behind a balloon left slivers), strings that never cross,
  // tied to a weight on the ground (a bunch tied to nothing floated)
  const n = cols.length, gap = 78, x0 = -gap * (n - 1) / 2;
  const pos = cols.map((c, i) => [x0 + i * gap, -150 + Math.abs(i - (n - 1) / 2) * 22]);
  pos.forEach(([x, y]) => a.line(`M${x} ${y + 40}L${(x * 0.22).toFixed(1)} 72`, 2.6));
  pos.forEach(([x, y], i) => { a.region(blob([[x, y - 46], [x + 36, y - 10], [x + 4, y + 40], [x - 4, y + 40], [x - 36, y - 10]], 1), cols[i], 'balloon'); a.shine(ellipse(x - 14, y - 18, 5, 10)); });
  a.region(rrect(-34, 66, 68, 44, 10), weight, 'balloon weight');
}

const RAW = { caterpillar, peacock, burger, crayonBox, palette, donut, watermelon, polarBear, hedgehog, boots, igloo, swan, windmill, christmasTree, fireTruck, balloonBunch };
const OUT = { RAW };
for (const [k, fn] of Object.entries(RAW)) OUT[k] = (a, ...args) => a.group(k, () => fn(a, ...args));
module.exports = OUT;
