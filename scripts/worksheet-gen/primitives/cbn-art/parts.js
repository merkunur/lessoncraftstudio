/**
 * cbn-art/parts.js — the cute characters, props and backdrops of the Color by Number pictures.
 * Every function draws into an Art at its local origin (place it with art.at({x, y, s, fx})). Colours are the
 * natural ones (a duck is yellow, grass is green); a design may pass `c` to recolour a part (a red car, a blue car).
 * Faces are details (ink): big glossy eyes, a small smile — never numbered.
 */
'use strict';
const { circle, ellipse, rrect, blob, curve, poly, star, ring, puff, bumps } = require('./core.js');

/* ---------------------------------------------------------------- faces */
function eye(a, x, y, s = 1) {
  a.ink(ellipse(x, y, 6.2 * s, 7.6 * s));
  a.shine(circle(x - 2 * s, y - 2.8 * s, 2.3 * s));
  a.shine(circle(x + 2.2 * s, y + 2.4 * s, 1.1 * s));
}
function smile(a, x, y, w = 10, d = 5) { a.line(curve([[x - w, y], [x, y + d], [x + w, y]]), 2.6); }
function face(a, x, y, s = 1, gap = 22) { eye(a, x - gap / 2 * s, y, s); eye(a, x + gap / 2 * s, y, s); smile(a, x, y + 13 * s, 7 * s, 4 * s); }

/* ---------------------------------------------------------------- sky things */
function sun(a, c = 'yellow') {
  for (let i = 0; i < 10; i++) { const t = i * 36 * Math.PI / 180; a.line(`M${(48 * Math.cos(t)).toFixed(1)} ${(48 * Math.sin(t)).toFixed(1)}L${(64 * Math.cos(t)).toFixed(1)} ${(64 * Math.sin(t)).toFixed(1)}`, 3.2); }
  a.region(circle(0, 0, 38), c, 'sun');
  face(a, 0, -4, 0.9, 26);
}
function cloud(a, c = 'none', w = 92, h = 44) { a.region(bumps(0, 0, w, h, 7, 0.44, 0.35, -110), c, 'cloud'); }
function rainbow(a, cols = ['red', 'orange', 'yellow', 'green', 'blue']) {
  const R = 150, band = 18;
  cols.forEach((c, i) => {
    const r1 = R - i * band, r2 = r1 - band;
    a.region(`M${-r1} 0A${r1} ${r1} 0 0 1 ${r1} 0L${r2} 0A${r2} ${r2} 0 0 0 ${-r2} 0Z`, c, 'rainbow ' + c);
  });
}
function moon(a, c = 'yellow') { a.region('M16 -43A46 46 0 1 0 16 43A54 54 0 0 1 16 -43Z', c, 'moon'); eye(a, -14, -4, 0.75); smile(a, -12, 12, 6, 3); }
function bigStar(a, c = 'yellow', R = 26) { a.region(star(0, 0, R, R * 0.48, 5, -90, R * 0.18), c, 'star'); }
function planet(a, body = 'orange', ringC = 'purple') {
  a.region(circle(0, 0, 46), body, 'planet');
  a.region('M-88 -10A88 28 0 0 0 88 -10L58 -10A58 9 0 0 1 -58 -10Z', ringC, 'ring');
  a.line(curve([[-30, -26], [-6, -32], [20, -22]]), 2.6);
}

/* ---------------------------------------------------------------- ground things */
function tree(a, crown = 'green', trunk = 'brown') {
  a.region(poly([[-14, 0], [14, 0], [18, 92], [-18, 92]], 4), trunk, 'trunk');
  a.region(bumps(0, -36, 72, 64, 9, 0.42), crown, 'crown');
  a.line(curve([[-30, -40], [-14, -52], [4, -48]]), 2.4);
  a.line(curve([[14, -14], [30, -20], [42, -10]]), 2.4);
}
function pineTree(a, crown = 'green', trunk = 'brown') {
  a.region(rrect(-12, 70, 24, 34, 3), trunk, 'trunk');
  a.region(poly([[0, -96], [44, -20], [26, -20], [58, 34], [36, 34], [72, 80], [-72, 80], [-36, 34], [-58, 34], [-26, -20], [-44, -20]], 6), crown, 'pine');
}
function bush(a, c = 'green', w = 70, h = 44) { a.region(bumps(0, 0, w, h, 7, 0.44, 0.3, -100), c, 'bush'); }
function grassTuft(a, x, y, s = 1) { a.line(curve([[x - 10 * s, y], [x - 8 * s, y - 14 * s], [x - 4 * s, y]]), 2.4); a.line(curve([[x - 3 * s, y], [x, y - 20 * s], [x + 3 * s, y]]), 2.4); a.line(curve([[x + 4 * s, y], [x + 8 * s, y - 13 * s], [x + 10 * s, y]]), 2.4); }
function flower(a, petals = 'pink', centre = 'yellow', stem = 'green', r = 25) {
  a.region(rrect(-11, -r, 22, 70 + r, 8), stem, 'stem');
  a.region(blob([[6, 40], [44, 18], [56, 30], [36, 52], [10, 54]], 1.1), stem, 'leaf');
  const k = 6; for (let i = 0; i < k; i++) { const t = i * 2 * Math.PI / k; a.region(circle(r * 1.05 * Math.cos(t), -r * 0.3 + r * 1.05 * Math.sin(t) - r * 0.7, r * 0.78), petals, 'petal'); }
  a.region(circle(0, -r * 1.0, r * 0.82), centre, 'flower centre');
}
function mushroom(a, cap = 'red', stalk = 'none') {
  a.region(poly([[-22, 0], [22, 0], [26, 52], [-26, 52]], 10), stalk, 'stalk');
  a.region('M-64 6Q-62 -66 0 -68Q62 -66 64 6Q30 16 0 16Q-30 16 -64 6Z', cap, 'cap');
  [[-30, -32, 11], [8, -46, 13], [36, -18, 9], [-6, -12, 8]].forEach(([x, y, r]) => a.region(circle(x, y, r), 'none', 'spot'));
  eye(a, -10, 30, 0.7); eye(a, 10, 30, 0.7); smile(a, 0, 40, 5, 3);
}
function fence(a, n = 4, c = 'brown', gap = 60) {
  const w = (n - 1) * gap + 28;
  a.region(rrect(0, 12, w, 24, 5), c, 'rail');
  a.region(rrect(0, 60, w, 24, 5), c, 'rail');
  for (let i = 0; i < n; i++) a.region(poly([[i * gap, 0], [i * gap + 15, -16], [i * gap + 30, 0], [i * gap + 30, 84], [i * gap, 84]], 3), c, 'post');
}
function rock(a, c = 'grey', w = 50, h = 30) { a.region(blob([[-w, h * 0.5], [-w * 0.8, -h * 0.4], [-w * 0.1, -h], [w * 0.7, -h * 0.6], [w, h * 0.5]], 1), c, 'rock'); }

/* ---------------------------------------------------------------- water things */
function lilyPad(a, c = 'green', r = 34) {
  const rx = r * 1.3, ry = r * 0.62;
  a.region(`M${(-rx * 0.15).toFixed(1)} 0L${(rx * Math.cos(-0.42)).toFixed(1)} ${(ry * Math.sin(-0.42)).toFixed(1)}A${rx} ${ry} 0 1 0 ${(rx * Math.cos(0.42)).toFixed(1)} ${(ry * Math.sin(0.42)).toFixed(1)}Z`, c, 'lily pad');
}
function cattail(a, head = 'brown', stem = 'green') {
  a.line('M0 -56V60', 3);
  a.region(blob([[-34, 60], [-20, 10], [-6, -20], [-4, 0], [-10, 60]], 1), stem, 'reed leaf');
  a.region(rrect(-11, -112, 22, 58, 11), head, 'cattail');
}
function seaweed(a, c = 'green', h = 150) {
  const pts = []; const k = 6;
  for (let i = 0; i <= k; i++) pts.push([(i % 2 ? 14 : -14) + 0, -i * h / k]);
  const left = pts.map(([x, y]) => [x - 13, y]), right = pts.map(([x, y]) => [x + 13, y]).reverse();
  a.region(blob([...left, [0, -h - 18], ...right, [0, 10]], 0.9), c, 'seaweed');
}
function shell(a, c = 'pink') {
  a.region(blob([[0, -34], [30, -20], [40, 10], [26, 26], [-26, 26], [-40, 10], [-30, -20]], 1), c, 'shell');
  [-18, 0, 18].forEach((x) => a.line(curve([[x * 0.45, -18], [x * 0.8, 0], [x, 14]]), 2.2));
}
function bubble(a, r = 12) { a.region(circle(0, 0, r), 'none', 'bubble'); a.line(curve([[-r * 0.5, -r * 0.2], [-r * 0.35, -r * 0.5], [-r * 0.05, -r * 0.62]]), 2); }

/* ---------------------------------------------------------------- animals */
function duck(a, body = 'yellow', beak = 'orange') {
  a.region(blob([[-112, 18], [-138, -52], [-96, -28], [-40, -34], [40, -26], [104, 6], [100, 52], [36, 82], [-66, 80], [-110, 54]], 1), body, 'duck body');
  a.region(blob([[-74, 10], [-14, -6], [42, 18], [12, 54], [-50, 50]], 1), body, 'wing');
  a.line(curve([[-52, 26], [-20, 22], [14, 32]]), 2.6);
  a.line(curve([[-44, 40], [-14, 36], [12, 44]]), 2.6);
  a.region(circle(36, -96, 64), body, 'duck head');
  a.line(curve([[30, -159], [30, -182], [46, -188], [56, -176], [48, -168]]), 2.8);
  a.region(blob([[86, -104], [150, -100], [160, -84], [146, -66], [94, -62]], 1), beak, 'beak');
  a.line(curve([[96, -82], [124, -82], [152, -84]]), 2.4);
  eye(a, 54, -112, 1.6);
}
function bunny(a, fur = 'grey', inner = 'pink') {
  a.region(ellipse(0, 40, 54, 58), fur, 'bunny body');
  a.region(ellipse(-28, 90, 31, 16), fur, 'foot'); a.region(ellipse(28, 90, 31, 16), fur, 'foot');
  a.region(ellipse(-34, -96, 18, 52), fur, 'ear'); a.region(ellipse(34, -96, 18, 52), fur, 'ear');
  a.region(ellipse(-34, -92, 9.5, 36), inner, 'inner ear'); a.region(ellipse(34, -92, 9.5, 36), inner, 'inner ear');
  a.region(ellipse(0, -30, 50, 44), fur, 'bunny head');
  a.region(ellipse(0, 52, 30, 30), 'none', 'tummy');
  face(a, 0, -32, 1, 30);
  a.ink(ellipse(0, -18, 5, 3.4));
}
function butterfly(a, wing = 'purple', spots = 'yellow', body = 'brown') {
  a.region(blob([[-4, -6], [-70, -64], [-92, -18], [-60, 10]], 1.1), wing, 'upper wing');
  a.region(blob([[4, -6], [70, -64], [92, -18], [60, 10]], 1.1), wing, 'upper wing');
  a.region(blob([[-4, 8], [-56, 14], [-62, 54], [-22, 52]], 1.1), wing, 'lower wing');
  a.region(blob([[4, 8], [56, 14], [62, 54], [22, 52]], 1.1), wing, 'lower wing');
  a.region(circle(-56, -26, 15), spots, 'wing spot'); a.region(circle(56, -26, 15), spots, 'wing spot');
  a.region(ellipse(0, 10, 15, 48), body, 'butterfly body');
  a.line(curve([[-4, -34], [-14, -58], [-26, -66]]), 2.4); a.line(curve([[4, -34], [14, -58], [26, -66]]), 2.4);
  a.ink(circle(-26, -66, 4)); a.ink(circle(26, -66, 4));
}
function fish(a, body = 'orange', fin = 'yellow', stripe = 'none') {
  a.region(blob([[52, 0], [74, -34], [82, 0], [74, 34]], 1), fin, 'tail');
  a.region(blob([[-14, -40], [24, -70], [40, -32]], 1), fin, 'top fin');
  a.region(blob([[-62, 0], [-30, -44], [26, -38], [58, 0], [26, 38], [-30, 44]], 1.05), body, 'fish body');
  a.region(blob([[4, -36], [20, -34], [24, 0], [20, 34], [4, 36], [10, 0]], 1), stripe, 'stripe');
  a.region(blob([[-10, 4], [24, 14], [0, 32]], 1), fin, 'side fin');
  eye(a, -34, -8, 1.05);
  smile(a, -48, 10, 5, 3);
}
function octopus(a, c = 'purple') {
  for (let i = 0; i < 5; i++) {
    const x = -72 + i * 36, dir = i % 2 ? 1 : -1;
    a.region(blob([[x - 17, 6], [x + 17, 6], [x + 21, 52], [x + 22 * dir, 88], [x + 4 * dir, 100], [x - 18, 58]], 1), c, 'tentacle');
  }
  a.region(blob([[-74, 30], [-76, -24], [-34, -76], [34, -76], [76, -24], [74, 30], [0, 40]], 1.05), c, 'octopus head');
  face(a, 0, -6, 1.15, 36);
}
function crab(a, c = 'red') {
  a.region(blob([[-78, -54], [-62, -78], [-40, -66], [-50, -50]], 1), c, 'claw'); a.region(blob([[78, -54], [62, -78], [40, -66], [50, -50]], 1), c, 'claw');
  a.line(curve([[-48, -50], [-46, -30], [-36, -12]]), 3); a.line(curve([[48, -50], [46, -30], [36, -12]]), 3);
  [-1, 1].forEach((sd) => [0, 1, 2].forEach((k) => a.line(curve([[sd * 40, 6 + k * 10], [sd * 62, 10 + k * 12], [sd * 72, 26 + k * 12]]), 3)));
  a.region(blob([[-56, 10], [-40, -24], [40, -24], [56, 10], [0, 30]], 1.05), c, 'crab body');
  a.line(curve([[-12, -24], [-14, -42]]), 2.6); a.line(curve([[12, -24], [14, -42]]), 2.6);
  a.region(circle(-14, -48, 9), 'none', 'eye ball'); a.region(circle(14, -48, 9), 'none', 'eye ball');
  a.ink(circle(-13, -47, 4.4)); a.ink(circle(15, -47, 4.4));
  smile(a, 0, -2, 9, 5);
}
function cow(a, hide = 'none', spot = 'brown', nose = 'pink') {
  [[-62, 30], [-40, 34], [36, 34], [58, 30]].forEach(([x, y]) => { a.region(rrect(x - 14, y, 28, 52, 10), hide, 'leg'); a.region(rrect(x - 15, y + 40, 30, 24, 8), 'grey', 'hoof'); });
  a.region(blob([[-84, -20], [-70, -58], [50, -60], [86, -30], [80, 40], [-80, 42]], 0.9), hide, 'cow body');
  a.region(blob([[-60, -46], [-24, -50], [-30, -12], [-62, -8]], 1), spot, 'spot');
  a.region(blob([[10, 0], [44, -6], [48, 26], [12, 28]], 1), spot, 'spot');
  a.line(curve([[-84, -14], [-104, 0], [-100, 26]]), 3); a.region(blob([[-104, 22], [-94, 24], [-98, 44], [-110, 40]], 1), spot, 'tail tip');
  a.region(ellipse(52, -78, 22, 13), spot, 'ear'); a.region(ellipse(138, -78, 22, 13), spot, 'ear');
  a.region(blob([[64, -92], [50, -128], [84, -104]], 1), 'yellow', 'horn'); a.region(blob([[126, -92], [140, -128], [106, -104]], 1), 'yellow', 'horn');
  a.region(blob([[60, -90], [130, -90], [134, -40], [56, -40]], 1), hide, 'cow head');
  a.region(ellipse(95, -36, 38, 22), nose, 'muzzle');
  a.ink(ellipse(82, -36, 4.5, 6)); a.ink(ellipse(108, -36, 4.5, 6));
  eye(a, 80, -70, 0.95); eye(a, 110, -70, 0.95);
}
function owl(a, body = 'brown', belly = 'yellow', face_ = 'none', feet = 'orange') {
  a.region(blob([[-72, 30], [-60, -40], [-30, -70], [30, -70], [60, -40], [72, 30], [40, 90], [-40, 90]], 1), body, 'owl body');
  a.region(blob([[-62, -66], [-48, -100], [-28, -68]], 1), body, 'ear tuft'); a.region(blob([[62, -66], [48, -100], [28, -68]], 1), body, 'ear tuft');
  a.region(blob([[-40, 14], [0, -4], [40, 14], [32, 78], [-32, 78]], 1), belly, 'belly');
  [[-14, 36], [14, 36], [0, 54], [-18, 62], [18, 62]].forEach(([x, y]) => a.line(curve([[x - 7, y], [x, y + 6], [x + 7, y]]), 2.2));
  a.region(blob([[-80, 0], [-62, -20], [-46, 30], [-64, 64]], 1), body, 'wing'); a.region(blob([[80, 0], [62, -20], [46, 30], [64, 64]], 1), body, 'wing');
  a.region(circle(-27, -34, 28), face_, 'eye patch'); a.region(circle(27, -34, 28), face_, 'eye patch');
  eye(a, -28, -34, 1.5); eye(a, 28, -34, 1.5);
  a.region(poly([[-16, -30], [16, -30], [0, 6]], 4), 'orange', 'beak');
  [-17, 17].forEach((x) => a.region(blob([[x - 16, 86], [x + 16, 86], [x + 12, 100], [x, 94], [x - 12, 100]], 1), feet, 'foot'));
}
function turtle(a, shell_ = 'green', skin = 'lightgreen', plates = 'brown') {
  a.region(ellipse(-62, 46, 28, 20), skin, 'leg'); a.region(ellipse(56, 46, 28, 20), skin, 'leg');
  a.region(blob([[-100, 8], [-138, 26], [-100, 36]], 1), skin, 'tail');
  a.region(blob([[86, 0], [112, -36], [150, -40], [168, -12], [150, 16], [104, 22]], 1), skin, 'turtle head');
  eye(a, 146, -18, 1); smile(a, 156, 0, 6, 3);
  a.region('M-106 30Q-100 -86 0 -88Q100 -86 106 30Z', shell_, 'shell');
  a.region(rrect(-112, 22, 224, 22, 11), plates, 'shell rim');
  a.region(poly([[-26, -52], [26, -52], [40, -14], [0, 6], [-40, -14]], 8), plates, 'shell plate');
  a.region(poly([[-86, 0], [-60, -46], [-46, -10]], 8), plates, 'shell plate');
  a.region(poly([[86, 0], [60, -46], [46, -10]], 8), plates, 'shell plate');
}
function dino(a, skin = 'green', plates = ['red', 'orange', 'yellow', 'blue', 'purple', 'pink'], belly = 'yellow', spots = 'lightgreen') {
  // tail sweeping down-left, behind everything
  a.region(blob([[-60, -26], [-130, 6], [-196, 48], [-214, 64], [-176, 66], [-110, 50], [-54, 40]], 1), skin, 'dino tail');
  // back plates along tail, back and neck (behind the body)
  const P = [[-128, -2, 18, -32], [-88, -40, 24, -14], [-38, -62, 26, 0], [12, -66, 26, 10], [58, -90, 22, 30]];
  P.forEach(([x, y, sz, r], i) => a.at({ x, y, r }, (b) => b.region(poly([[-sz, sz * 0.5], [0, -sz * 1.15], [sz, sz * 0.5]], sz * 0.25), plates[i % plates.length], 'back plate')));
  // back legs, then body, then front legs
  a.region(rrect(-76, 30, 40, 74, 16), skin, 'leg'); a.region(rrect(28, 30, 40, 74, 16), skin, 'leg');
  a.region(ellipse(0, 0, 104, 72), skin, 'dino body');
  a.region(rrect(-48, 34, 42, 78, 16), skin, 'leg'); a.region(rrect(52, 34, 42, 78, 16), skin, 'leg');
  [-27, 73].forEach((x) => a.line(curve([[x - 12, 104], [x - 12, 96]]), 2.4) && a.line(curve([[x, 106], [x, 97]]), 2.4) && a.line(curve([[x + 12, 104], [x + 12, 96]]), 2.4));
  a.region(blob([[-40, 10], [10, -12], [70, 4], [78, 46], [22, 74], [-36, 64]], 1), belly, 'belly');
  [[-70, -22, 15], [-38, -42, 11], [-86, 16, 11]].forEach(([x, y, r]) => a.region(circle(x, y, r), spots, 'spot'));
  // neck + head in ONE flowing shape
  a.region(blob([[40, -36], [74, -96], [92, -150], [128, -178], [176, -172], [204, -146], [196, -116], [160, -104], [126, -102], [110, -60], [92, -6]], 1), skin, 'neck and head');
  eye(a, 150, -146, 1.3);
  smile(a, 178, -122, 10, 5);
  a.ink(circle(196, -150, 2.6));
  a.region(ellipse(126, -122, 12, 8), 'pink', 'cheek');
}

/* ---------------------------------------------------------------- objects */
function house(a, wall = 'yellow', roof = 'red', door = 'brown', win = 'lightblue') {
  a.region(rrect(70, -132, 34, 60, 3), 'grey', 'chimney');
  a.region(rrect(-118, -46, 236, 166, 4), wall, 'wall');
  a.region(poly([[-142, -40], [0, -150], [142, -40], [124, -22], [0, -118], [-124, -22]], 10), roof, 'roof');
  a.region(poly([[-124, -22], [0, -118], [124, -22]], 4), wall, 'gable');
  a.region(circle(0, -58, 18), win, 'round window');
  a.region(rrect(-26, 36, 52, 84, 22), door, 'door'); a.ink(circle(14, 82, 4));
  [[-92, 0], [52, 0]].forEach(([x, y]) => { a.region(rrect(x, y, 40, 40, 5), win, 'window'); a.line(`M${x + 20} ${y}V${y + 40}M${x} ${y + 20}H${x + 40}`, 2.6); });
}
function flowerPot(a, petals = 'red', face_ = 'yellow', leaves = 'green', pot = 'orange', rim = 'brown') {
  a.region(rrect(-12, 0, 24, 96, 8), leaves, 'stem');
  a.region(blob([[-6, 66], [-64, 36], [-84, 56], [-40, 82]], 1.1), leaves, 'leaf');
  a.region(blob([[6, 66], [64, 36], [84, 56], [40, 82]], 1.1), leaves, 'leaf');
  for (let i = 0; i < 8; i++) { const t = i * Math.PI / 4; a.region(ellipse(Math.cos(t) * 62, -60 + Math.sin(t) * 62, 30, 30), petals, 'petal'); }
  a.region(circle(0, -60, 48), face_, 'flower face');
  face(a, 0, -64, 1.3, 32);
  a.region(poly([[-74, 140], [74, 140], [58, 236], [-58, 236]], 8), pot, 'pot');
  a.region(rrect(-86, 110, 172, 36, 10), rim, 'pot rim');
}
function rocket(a, body = 'grey', nose = 'red', fins = 'red', win = 'lightblue', flame = 'orange', flame2 = 'yellow') {
  a.region(blob([[-26, 96], [0, 172], [26, 96]], 1), flame, 'flame');
  a.region(blob([[-13, 98], [0, 142], [13, 98]], 1), flame2, 'inner flame');
  a.region(blob([[-34, 40], [-72, 96], [-60, 106], [-30, 92]], 1), fins, 'fin'); a.region(blob([[34, 40], [72, 96], [60, 106], [30, 92]], 1), fins, 'fin');
  a.region('M-40 100L-40 -30Q-38 -96 0 -132Q38 -96 40 -30L40 100Z', body, 'rocket body');
  a.region('M-34 -56Q-26 -104 0 -132Q26 -104 34 -56Q0 -66 -34 -56Z', nose, 'nose');
  a.region(circle(0, -6, 24), win, 'window');
  a.region(rrect(-40, 72, 80, 28, 6), fins, 'band');
}
function star5(a, c) { bigStar(a, c); }

/* ---------------------------------------------------------------- backdrops (fill the whole frame) */
/** sky + rolling hills (meadow) — returns nothing; draws sky, far hill, near ground */
function meadow(a, W, H, { sky = 'lightblue', far = 'lightgreen', near = 'green', horizon = 0.55 } = {}) {
  a.region(rrect(0, 0, W, H, 0), sky, 'sky');
  const y = H * horizon;
  a.region(`M0 ${y + 10}C${W * 0.25} ${y - 50} ${W * 0.55} ${y - 40} ${W} ${y - 10}L${W} ${H}L0 ${H}Z`, far, 'far hill');
  a.region(`M0 ${y + 60}C${W * 0.3} ${y + 20} ${W * 0.7} ${y + 50} ${W} ${y + 40}L${W} ${H}L0 ${H}Z`, near, 'grass');
}
function pond(a, W, H, { sky = 'lightblue', bank = 'green', water = 'blue' } = {}) {
  a.region(rrect(0, 0, W, H, 0), sky, 'sky');
  a.region(`M0 ${H * 0.5}C${W * 0.3} ${H * 0.44} ${W * 0.7} ${H * 0.46} ${W} ${H * 0.5}L${W} ${H}L0 ${H}Z`, bank, 'grass bank');
  a.region(`M${W * 0.08} ${H * 0.72}C${W * 0.08} ${H * 0.6} ${W * 0.92} ${H * 0.6} ${W * 0.92} ${H * 0.72}C${W * 0.92} ${H * 0.95} ${W * 0.08} ${H * 0.95} ${W * 0.08} ${H * 0.72}Z`, water, 'pond');
}
function sea(a, W, H, { water = 'lightblue', sand = 'yellow' } = {}) {
  a.region(rrect(0, 0, W, H, 0), water, 'sea');
  a.region(`M0 ${H * 0.82}C${W * 0.3} ${H * 0.76} ${W * 0.6} ${H * 0.86} ${W} ${H * 0.8}L${W} ${H}L0 ${H}Z`, sand, 'sand');
}
function space(a, W, H, { sky = 'blue' } = {}) { a.region(rrect(0, 0, W, H, 0), sky, 'night sky'); }

module.exports = {
  eye, smile, face, sun, cloud, rainbow, moon, bigStar, planet, tree, pineTree, bush, grassTuft, flower, mushroom, fence, rock,
  lilyPad, cattail, seaweed, shell, bubble, duck, bunny, butterfly, fish, octopus, crab, cow, owl, turtle, dino,
  house, flowerPot, rocket, star5, meadow, pond, sea, space, ring,
};
