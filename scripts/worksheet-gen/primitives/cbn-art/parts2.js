/**
 * cbn-art/parts2.js — Color by Number parts, batch 1 (2026-10-05): more animals, things to eat, vehicles, weather,
 * and three more backdrops. Same conventions as parts.js: local units (a character ~ 250 units tall, origin near
 * its middle, y down), every object wrapped as ONE group at export (lib/cbn-render.js checkSolid: one solid piece).
 */
'use strict';
const { circle, ellipse, rrect, blob, curve, poly, f } = require('./core.js');
const { eye, smile, face } = require('./parts.js');

/** the part of an ellipse between x1 and x2 (a bee's stripe, a band round a cup) */
function ellipseBand(cx, cy, rx, ry, x1, x2, n = 14) {
  const top = [], bot = [];
  for (let i = 0; i <= n; i++) {
    const x = x1 + (x2 - x1) * i / n, u = Math.max(0, 1 - ((x - cx) / rx) ** 2), h = ry * Math.sqrt(u);
    top.push([x, cy - h]); bot.push([x, cy + h]);
  }
  return 'M' + top.concat(bot.reverse()).map((p) => `${f(p[0])} ${f(p[1])}`).join('L') + 'Z';
}
/** the part of a circle above (or below) a horizontal line y0 */
function circleCap(cx, cy, r, y0, below = false, n = 24) {
  const h = y0 - cy, w = Math.sqrt(Math.max(0, r * r - h * h));
  const a0 = Math.atan2(h, -w), a1 = Math.atan2(h, w);
  const pts = [];
  // the arc on the chosen side, from the left chord end to the right chord end
  let s = a0, e = a1;
  if (!below) { if (e > s) e -= 2 * Math.PI; } else { if (e < s) e += 2 * Math.PI; }
  for (let i = 0; i <= n; i++) { const t = s + (e - s) * i / n; pts.push([cx + r * Math.cos(t), cy + r * Math.sin(t)]); }
  return 'M' + pts.map((p) => `${f(p[0])} ${f(p[1])}`).join('L') + 'Z';
}
const whiskers = (a, x, y, dir = 1) => { a.line(curve([[x, y], [x + 22 * dir, y - 4], [x + 40 * dir, y - 8]]), 2.2); a.line(curve([[x, y + 8], [x + 22 * dir, y + 9], [x + 40 * dir, y + 12]]), 2.2); };

/* ---------------------------------------------------------------- animals */
function cat(a, fur = 'orange', inner = 'pink', belly = 'none') {
  // SITTING, facing us: head and body ONE silhouette, front legs down to the ground (it had two paw ovals under a
  // pasted head), ears rooted in the head, the tail curling up from behind the hip; sits on y = 112
  const { outline } = require('./v2.js');
  a.group('cat', () => {
    a.region(outline([[40, 80], [94, 56], [114, 6], [102, -30], [84, -24], [92, 10], [76, 40], [38, 56]]), fur, 'tail');
    [-1, 1].forEach((k) => {
      a.region(outline([[k * 70, -70], [k * 60, -160, 1], [k * 8, -112]]), fur, 'ear');
      a.region(outline([[k * 56, -96], [k * 54, -140, 1], [k * 26, -114]]), inner, 'inner ear');
    });
    a.region(outline([[0, -120], [44, -114], [66, -86], [60, -40], [40, -16], [56, 0], [70, 40], [72, 90],
      [60, 112, 1], [-60, 112, 1], [-72, 90], [-70, 40], [-56, 0], [-40, -16], [-60, -40], [-66, -86], [-44, -114]]), fur, 'cat');
    a.region(ellipse(0, 48, 28, 34), belly, 'tummy');
    [-1, 1].forEach((k) => a.region(outline([[k * 2, 50], [k * 30, 50], [k * 32, 98], [k * 34, 112, 1], [k * 2, 112, 1]]), fur, 'leg'));
    a.line('M-17 102V112M17 102V112', 2.4);
    face(a, 0, -70, 1.25, 44);
    a.ink(poly([[-8, -56], [8, -56], [0, -48]], 2));
    whiskers(a, 16, -50, 1); whiskers(a, -16, -50, -1);
  });
}
function dog(a, fur = 'brown', ears = 'brown', spot = 'none', collar = 'red') {
  // SITTING, facing us: head and body are ONE silhouette (the head was pasted on), front legs down to the ground
  // (it had only two paw ovals), the tail curls up from behind the hip; sits on y = 112
  const { outline } = require('./v2.js');
  a.group('dog', () => {
    a.region(outline([[46, 78], [94, 54], [112, 10], [98, 2], [80, 40], [42, 58]]), fur, 'tail');
    a.region(outline([[0, -124], [44, -118], [66, -90], [62, -46], [44, -20], [58, -4], [72, 40], [74, 90],
      [62, 112, 1], [-62, 112, 1], [-74, 90], [-72, 40], [-58, -4], [-44, -20], [-62, -46], [-66, -90], [-44, -118]]), fur, 'dog');
    a.region(ellipse(0, 50, 30, 36), 'none', 'tummy');
    [-1, 1].forEach((k) => a.region(outline([[0, 34], [k * 40, 34], [k * 42, 96], [k * 44, 112, 1], [0, 112, 1]]), fur, 'leg'));
    a.line('M-24 100V112M24 100V112', 2.4);
    a.region(rrect(-44, -26, 88, 22, 11), collar, 'collar');
    a.region(circle(0, 6, 13), 'yellow', 'tag');
    a.region(ellipse(24, -80, 24, 22), spot, 'eye patch');
    a.region(outline([[-36, -116], [-82, -98], [-94, -40], [-74, -24], [-56, -62]]), ears, 'ear');
    a.region(outline([[36, -116], [82, -98], [94, -40], [74, -24], [56, -62]]), ears, 'ear');
    a.region(ellipse(0, -42, 32, 24), 'none', 'muzzle');
    eye(a, -24, -80, 1.25); eye(a, 24, -80, 1.25);
    a.ink(ellipse(0, -52, 10, 7));
    a.line(curve([[-12, -34], [0, -28], [12, -34]]), 2.6);
  });
}
function elephant(a, skin = 'grey', ear = 'pink', trunkUp = false) {
  a.region(rrect(-64, 18, 36, 80, 13), skin, 'leg'); a.region(rrect(28, 18, 36, 80, 13), skin, 'leg');
  a.line(curve([[-96, -10], [-114, 10], [-110, 34]]), 3); a.ink(blob([[-116, 30], [-104, 30], [-104, 48], [-118, 46]], 1));
  a.region(ellipse(-12, -2, 90, 62), skin, 'elephant body');
  a.region(rrect(-84, 26, 34, 80, 13), skin, 'leg'); a.region(rrect(10, 26, 34, 80, 13), skin, 'leg');
  if (trunkUp) a.region(blob([[104, -50], [138, -72], [150, -112], [168, -128], [182, -116], [170, -100], [160, -62], [124, -14]], 1), skin, 'trunk');   // raised: spraying water
  else a.region(blob([[104, -30], [130, 6], [134, 52], [150, 62], [158, 48], [152, 36], [152, 4], [130, -40]], 1), skin, 'trunk');
  a.region(circle(84, -40, 54), skin, 'elephant head');
  a.region(blob([[56, -78], [10, -74], [-2, -20], [26, 18], [62, -6]], 1), skin, 'ear');
  a.region(blob([[52, -64], [20, -60], [12, -24], [30, 0], [54, -14]], 1), ear, 'inner ear');
  eye(a, 100, -52, 1.25);
  a.line(curve([[92, -20], [104, -14], [114, -22]]), 2.6);
}
function frog(a, skin = 'green', belly = 'lightgreen') {
  a.region(blob([[-36, 46], [-96, 30], [-110, 74], [-62, 90]], 1), skin, 'back leg'); a.region(blob([[36, 46], [96, 30], [110, 74], [62, 90]], 1), skin, 'back leg');
  a.region(ellipse(0, 34, 64, 54), skin, 'frog body');
  a.region(ellipse(0, 44, 38, 34), belly, 'belly');
  a.region(ellipse(-32, 88, 24, 12), skin, 'foot'); a.region(ellipse(32, 88, 24, 12), skin, 'foot');
  a.region(ellipse(0, -26, 78, 46), skin, 'frog head');
  a.region(circle(-42, -66, 27), skin, 'eye bump'); a.region(circle(42, -66, 27), skin, 'eye bump');
  eye(a, -42, -68, 1.45); eye(a, 42, -68, 1.45);
  a.line(curve([[-40, -16], [0, 6], [40, -16]]), 3);
}
function bee(a, body = 'yellow', stripes = 'black', wings = 'lightblue') {
  a.region(blob([[-16, -36], [-56, -104], [-14, -118], [16, -54]], 1), wings, 'wing');
  a.region(blob([[10, -40], [36, -112], [80, -106], [44, -40]], 1), wings, 'wing');
  a.region(poly([[58, -25], [128, 0], [58, 25]], 6), stripes, 'stinger');
  a.region(ellipse(4, 0, 80, 54), body, 'bee body');
  a.region(ellipseBand(4, 0, 80, 54, -6, 18), stripes, 'stripe');
  a.region(ellipseBand(4, 0, 80, 54, 38, 60), stripes, 'stripe');
  a.line(curve([[-90, -36], [-96, -66], [-84, -84]]), 2.6); a.line(curve([[-70, -40], [-62, -70], [-46, -82]]), 2.6);
  a.ink(circle(-84, -88, 8)); a.ink(circle(-44, -86, 8));
  a.region(circle(-74, -4, 40), body, 'bee head');
  face(a, -76, -8, 1.1, 30);
}
function snail(a, shell = 'orange', mid = 'yellow', body = 'lightgreen') {
  a.region(blob([[-118, 42], [-96, 20], [60, 18], [92, -14], [104, -52], [126, -40], [122, 18], [98, 46]], 1), body, 'snail body');
  a.line(curve([[100, -50], [96, -82], [88, -100]]), 3); a.line(curve([[116, -46], [122, -80], [130, -96]]), 3);
  a.region(circle(88, -104, 11), 'none', 'eye ball'); a.region(circle(132, -100, 11), 'none', 'eye ball');
  a.ink(circle(90, -104, 4.5)); a.ink(circle(133, -100, 4.5));
  smile(a, 112, -16, 9, 5);
  // a SPIRAL shell (it was a bull's-eye of circles) — 2026-10-05: one band winding out from the centre
  a.region(circle(-20, -30, 66), shell, 'shell');
  {
    // band width and turns adapt to the drawn size: a small snail gets a wider band and fewer turns (both stay colourable)
    const sc = a.S, w = Math.min(28, Math.max(20, 20 / sc)), k = 2.0 * w / (2 * Math.PI), T = (60 - 12) / k;
    const cx = -16, cy = -28, K = 90, out = [], inn = [];
    for (let i = 0; i <= K; i++) { const t = (i / K) * T, ro = 12 + k * t, ri = Math.max(3, ro - w); out.push([cx + ro * Math.cos(t), cy + ro * Math.sin(t)]); inn.push([cx + ri * Math.cos(t), cy + ri * Math.sin(t)]); }
    a.region('M' + out.concat(inn.reverse()).map((p) => p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join('L') + 'Z', mid, 'shell spiral');
  }
}
function penguin(a, body = 'black', front = 'none', beak = 'orange') {
  a.region(ellipse(-28, 100, 30, 16), beak, 'foot'); a.region(ellipse(28, 100, 30, 16), beak, 'foot');
  a.region(blob([[-60, -20], [-92, 30], [-84, 52], [-54, 34]], 1), body, 'flipper'); a.region(blob([[60, -20], [92, 30], [84, 52], [54, 34]], 1), body, 'flipper');
  a.region(ellipse(0, 10, 66, 94), body, 'penguin body');
  a.region(blob([[-28, -58], [28, -58], [40, 30], [0, 88], [-40, 30]], 1), front, 'front');
  // a rounded heart-shaped face: the old mask dipped in a V over the eyes and made the penguin look angry — 2026-10-05
  a.region(blob([[-38, -30], [-40, -52], [-22, -64], [0, -54], [22, -64], [40, -52], [38, -30], [0, -16]], 1), front, 'face');
  eye(a, -18, -46, 1.15); eye(a, 18, -46, 1.15);
  a.region(poly([[-21, -40], [21, -40], [0, -8]], 5), beak, 'beak');
}
function chick(a, fluff = 'yellow', beak = 'orange') {
  void 0; a.line('M-20 80V100M-32 104L-20 100L-10 104M20 80V100M10 104L20 100L32 104', 4);   // little legs: ink (too thin to number)
  a.region(ellipse(0, 26, 66, 58), fluff, 'chick body');
  a.region(blob([[-60, 14], [-96, 0], [-88, 34], [-56, 44]], 1), fluff, 'wing');
  a.region(circle(0, -50, 46), fluff, 'chick head');
  a.region(blob([[-12, -88], [-24, -126], [0, -110], [18, -130], [16, -88]], 1), fluff, 'tuft');
  eye(a, -16, -56, 1.15); eye(a, 16, -56, 1.15);
  a.region(poly([[-26, -48], [26, -48], [0, -8]], 6), beak, 'beak');   // big enough to colour at a chick's small size
}
function ladybird(a, shell = 'red', head = 'black') {
  a.line(curve([[-22, -60], [-34, -86], [-48, -92]]), 2.8); a.line(curve([[22, -60], [34, -86], [48, -92]]), 2.8);
  a.ink(circle(-50, -94, 8)); a.ink(circle(50, -94, 8));
  // six legs, three each side (a ladybird had none) — 2026-10-05
  [-1, 1].forEach((sd) => [[6, -8], [36, 34], [66, 86]].forEach(([y0, y1]) => a.line(curve([[sd * 60, y0], [sd * 92, (y0 + y1) / 2 - 4], [sd * 108, y1]]), 3.4)));
  a.region(circle(0, -48, 34), head, 'ladybird head');
  a.region(blob([[0, -26], [-62, -14], [-78, 34], [-46, 84], [0, 90]], 1), shell, 'wing case');
  a.region(blob([[0, -26], [62, -14], [78, 34], [46, 84], [0, 90]], 1), shell, 'wing case');
  [[-40, 10], [-34, 54], [40, 10], [34, 54], [-14, 28], [14, 28]].forEach(([x, y]) => a.ink(circle(x, y, 11)));
}
function whale(a, body = 'blue', belly = 'lightblue', flipper = true) {
  a.region(blob([[-104, -20], [-150, -62], [-160, -32], [-136, -10], [-162, 16], [-146, 34]], 1), body, 'tail');
  // the flipper hangs BELOW the body, behind it (it was pasted across the white belly) — 2026-10-05
  if (flipper) a.region(blob([[-24, 50], [-52, 100], [-18, 104], [8, 58]], 1), body, 'flipper');   // off where the whale's lower half is under water
  a.region(blob([[-120, 4], [-60, -64], [40, -76], [116, -30], [120, 40], [40, 72], [-80, 52]], 1), body, 'whale body');
  a.region(blob([[-60, 40], [20, 24], [104, 30], [60, 66], [-30, 60]], 1), belly, 'belly');
  eye(a, 70, -16, 1.3); smile(a, 92, 10, 14, 6);
  a.line('M30 -78Q20 -112 0 -122M34 -78Q34 -118 40 -132M38 -78Q52 -110 74 -118', 3);
}
function pig(a, skin = 'pink', snout = 'pink') {
  // legs in overlapping pairs (side by side with a gap they left slits)
  a.region(rrect(-64, 20, 28, 62, 10), skin, 'leg'); a.region(rrect(-42, 24, 28, 62, 10), skin, 'leg');
  a.region(rrect(28, 24, 28, 62, 10), skin, 'leg'); a.region(rrect(50, 20, 28, 62, 10), skin, 'leg');
  a.line(curve([[-94, -10], [-114, -18], [-114, -36], [-100, -38]]), 3);   // an OPEN curl: a closed loop would trap a crumb of background
  a.region(ellipse(0, 0, 96, 60), skin, 'pig body');
  a.region(poly([[56, -80], [68, -134], [108, -88]], 9), skin, 'ear'); a.region(poly([[96, -88], [138, -132], [148, -76]], 9), skin, 'ear');   // the ears cross INSIDE the head: the notch between them opens upward, no pocket
  a.region(circle(102, -48, 50), skin, 'pig head');
  a.region(ellipse(114, -30, 28, 20), snout, 'snout');
  a.ink(ellipse(104, -30, 4.5, 6)); a.ink(ellipse(124, -30, 4.5, 6));
  eye(a, 86, -64, 1.1); eye(a, 120, -66, 1.1);
}

/* ---------------------------------------------------------------- food */
function iceCream(a, cone = 'orange', s1 = 'pink', s2 = 'brown', cherry = 'red') {
  a.region(poly([[-52, 10], [52, 10], [0, 150]], 10), cone, 'cone');
  // waffle lines stop short of the outline, so they never cut the cone into fiddly pieces
  a.line('M-30 32L8 94M-2 28L22 66M24 26L36 44', 2.6);   // one direction only: crossing lines would close off tiny cells
  a.region(blob([[-62, 20], [-66, -24], [-30, -60], [30, -60], [66, -24], [62, 20], [30, 30], [0, 18], [-30, 30]], 1), s1, 'scoop');
  a.region(blob([[-48, -50], [-48, -94], [-20, -120], [20, -120], [48, -94], [48, -50], [0, -42]], 1), s2, 'scoop');
  a.region(circle(0, -132, 18), cherry, 'cherry');
  a.line(curve([[0, -150], [8, -170], [24, -178]]), 3);
}
function cupcake(a, wrapper = 'blue', icing = 'pink', cherry = 'red') {
  a.region(poly([[-70, 10], [70, 10], [50, 110], [-50, 110]], 8), wrapper, 'wrapper');
  a.line('M-40 18L-30 104M-12 18L-8 104M14 18L10 104M40 18L30 104', 2.4);
  a.region(blob([[-84, 20], [-86, -18], [-56, -50], [-20, -80], [20, -80], [56, -50], [86, -18], [84, 20], [42, 32], [0, 22], [-42, 32]], 1), icing, 'icing');
  [[-46, -12], [-14, -40], [18, -16], [44, -36], [-10, 6], [48, 4]].forEach(([x, y], i) => a.line(`M${x} ${y}l${i % 2 ? 10 : -8} 6`, 4));
  a.region(circle(0, -96, 20), cherry, 'cherry');
  a.line(curve([[0, -116], [6, -136], [22, -144]]), 3);
}
function apple(a, skin = 'red', leaf = 'green', stalk = 'brown') {
  void stalk; a.line(curve([[0, -72], [2, -96], [10, -116]]), 8);
  if (leaf !== 'none') a.region(blob([[8, -96], [44, -128], [72, -110], [40, -86]], 1), leaf, 'leaf');
  a.region(blob([[0, -76], [-46, -96], [-92, -60], [-92, 20], [-50, 84], [0, 70], [50, 84], [92, 20], [92, -60], [46, -96]], 1), skin, 'apple');
  a.shine(ellipse(-50, -30, 10, 22));
}
function strawberry(a, berry = 'red', top = 'green') {
  a.region(blob([[0, -62], [-70, -64], [-76, 0], [-28, 80], [0, 96], [28, 80], [76, 0], [70, -64]], 1), berry, 'strawberry');
  [[-40, -30], [0, -34], [40, -30], [-22, 4], [22, 4], [-40, 30], [40, 30], [0, 36], [-14, 64], [14, 64]].forEach(([x, y]) => a.ink(ellipse(x, y, 3.2, 5)));
  a.region(poly([[-64, -62], [-30, -86], [0, -76], [30, -86], [64, -62], [30, -50], [0, -56], [-30, -50]], 6), top, 'leaves');
  a.line(curve([[0, -76], [2, -96], [8, -108]]), 7);
}

/* ---------------------------------------------------------------- things */
function car(a, body = 'red', glass = 'lightblue', tyre = 'black', hub = 'grey', light = 'yellow') {
  a.region(blob([[-60, -24], [-40, -78], [52, -78], [80, -24]], 0.5), body, 'car roof');
  a.region(poly([[-46, -28], [-30, -68], [4, -68], [4, -28]], 6), glass, 'window');
  a.region(poly([[16, -28], [16, -68], [44, -68], [64, -28]], 6), glass, 'window');
  a.region(rrect(-130, -34, 260, 70, 24), body, 'car body');
  a.region(rrect(108, -22, 22, 18, 6), light, 'light');
  a.line('M-4 -30V30', 2.6); a.line('M-20 -6h12M28 -6h12', 3);
  [-74, 74].forEach((x) => { a.region(circle(x, 38, 34), tyre, 'tyre'); a.region(circle(x, 38, 15), hub, 'hubcap'); });
}
function sailboat(a, hull = 'red', sail = 'none', sail2 = 'yellow', flag = 'blue') {
  // the sails run right up to the mast (the solid gate found a slit between them)
  a.region(poly([[0, -150], [0, -20], [-110, -20]], 6), sail, 'sail');
  a.region(poly([[0, -160], [0, -20], [96, -20]], 6), sail2, 'sail');
  a.region(poly([[0, -180], [62, -162], [0, -142]], 5), flag, 'flag');
  a.line('M0 -176V0', 7);   // the mast: ink (too thin to number)
  a.region(poly([[-130, -8], [130, -8], [96, 50], [-96, 50]], 12), hull, 'hull');
  a.region(circle(-60, 18, 13), 'none', 'porthole'); a.region(circle(0, 18, 13), 'none', 'porthole'); a.region(circle(60, 18, 13), 'none', 'porthole');
}
function balloon(a, c1 = 'red', c2 = 'yellow', basket = 'brown') {
  a.line('M-46 70L-26 128M46 70L26 128M-14 82L-10 128M14 82L10 128', 2.6);
  a.region(rrect(-34, 124, 68, 46, 8), basket, 'basket');
  a.line('M-24 140H24M-24 154H24', 2.2);   // weave lines stop short of the sides: they never cut the basket into strips
  a.region(blob([[0, 90], [-74, 40], [-104, -40], [-70, -112], [0, -134], [70, -112], [104, -40], [74, 40]], 1), c1, 'balloon');
  a.region(blob([[0, 88], [-30, 40], [-40, -40], [-24, -112], [0, -132], [24, -112], [40, -40], [30, 40]], 1), c2, 'balloon stripe');
  a.region(rrect(-30, 82, 60, 18, 6), c1, 'balloon band');
}
function snowman(a, snow = 'none', hat = 'black', scarf = 'red', nose = 'orange') {
  a.line(curve([[-56, -20], [-96, -54], [-112, -66]]), 4); a.line('M-100 -58l-6 -18M-100 -58l-18 4', 3);
  a.line(curve([[56, -20], [96, -54], [112, -66]]), 4); a.line('M100 -58l6 -18M100 -58l18 4', 3);
  a.region(circle(0, 70, 82), snow, 'snowball');
  a.region(circle(0, -24, 60), snow, 'snowball');
  [[0, 40], [0, 76], [0, 112]].forEach(([x, y]) => a.ink(circle(x, y, 7)));
  a.region(blob([[-58, -64], [58, -64], [66, -40], [44, -32], [0, -40], [-44, -32], [-66, -40]], 1), scarf, 'scarf');
  a.region(rrect(18, -50, 26, 66, 10), scarf, 'scarf end');
  a.region(circle(0, -110, 46), snow, 'snowman head');
  a.region(rrect(-38, -214, 76, 70, 8), hat, 'hat'); a.region(rrect(-62, -152, 124, 24, 10), hat, 'hat brim');
  a.region(rrect(-38, -178, 76, 24, 0), scarf, 'hat band');
  eye(a, -16, -118, 1.1); eye(a, 16, -118, 1.1);
  a.region(poly([[-8, -110], [52, -96], [-8, -82]], 5), nose, 'carrot nose');
  [[-18, -80], [-8, -76], [4, -76], [14, -80]].forEach(([x, y]) => a.ink(circle(x, y, 3)));
}
function kite(a, c1 = 'red', c2 = 'yellow', bow = 'blue', string = true) {
  // the STRING (to the child holding it, off the picture) and a TAIL with bows spaced along it
  if (string === 'short') a.line(curve([[0, 0], [-50, 160], [-120, 300], [-140, 340]]), 2.6);   // ends on the ground in a scene
  else if (string) a.line(curve([[0, 0], [-60, 160], [-150, 330], [-260, 560]]), 2.6);
  a.line(curve([[0, 60], [0, 110], [24, 150], [-6, 200], [14, 250]]), 3);   // starts inside the kite: tied on, not touching a tip
  // each bow is ONE piece (two triangles meeting at a point would be the tangent-joint mistake)
  [[18, 146], [-2, 216]].forEach(([x, y]) => a.region(poly([[x - 30, y - 18], [x, y - 7], [x + 30, y - 18], [x + 30, y + 18], [x, y + 7], [x - 30, y + 18]], 5), bow, 'bow'));
  a.region(poly([[0, -110], [0, 0], [-80, 0]], 6), c1, 'kite'); a.region(poly([[0, -110], [80, 0], [0, 0]], 6), c2, 'kite');
  a.region(poly([[-80, 0], [0, 0], [0, 110]], 6), c2, 'kite'); a.region(poly([[0, 0], [80, 0], [0, 110]], 6), c1, 'kite');
}
function umbrella(a, c1 = 'purple', c2 = 'pink', handle = 'brown') {
  void handle;
  a.line(curve([[0, -10], [0, 96], [-4, 112], [-22, 114], [-28, 98]]), 7);   // the shaft and hook: ink (too thin to number)
  a.region('M-130 0A130 120 0 0 1 130 0Q104 -22 78 0Q52 -22 26 0Q0 -22 -26 0Q-52 -22 -78 0Q-104 -22 -130 0Z', c1, 'umbrella');
  a.region('M-26 0Q-30 -90 0 -120Q30 -90 26 0Q0 -22 -26 0Z', c2, 'umbrella panel');
  a.region('M-130 0Q-120 -76 -60 -108Q-84 -60 -78 0Q-104 -22 -130 0Z', c2, 'umbrella panel');
  a.region('M130 0Q120 -76 60 -108Q84 -60 78 0Q104 -22 130 0Z', c2, 'umbrella panel');
  a.line('M0 -118V-136', 7);
}

/* ---------------------------------------------------------------- backdrops */
function beach(a, W, H, { sky = 'lightblue', sea = 'blue', sand = 'yellow', horizon = 0.5 } = {}) {
  a.region(rrect(0, 0, W, H, 0), sky, 'sky');
  const y = H * horizon;
  a.region(`M0 ${y}L${W} ${y}L${W} ${H}L0 ${H}Z`, sea, 'sea');
  a.region(`M0 ${y + 130}C${W * 0.3} ${y + 96} ${W * 0.6} ${y + 140} ${W} ${y + 110}L${W} ${H}L0 ${H}Z`, sand, 'sand');
}
function snow(a, W, H, { sky = 'lightblue', snow_ = 'none', horizon = 0.6 } = {}) {
  a.region(rrect(0, 0, W, H, 0), sky, 'sky');
  const y = H * horizon;
  a.region(`M0 ${y}C${W * 0.3} ${y - 50} ${W * 0.6} ${y - 30} ${W} ${y - 6}L${W} ${H}L0 ${H}Z`, snow_, 'snow');
}
function road(a, W, H, { sky = 'lightblue', grass = 'green', road_ = 'grey', horizon = 0.56 } = {}) {
  a.region(rrect(0, 0, W, H, 0), sky, 'sky');
  const y = H * horizon;
  a.region(`M0 ${y}C${W * 0.3} ${y - 40} ${W * 0.7} ${y - 30} ${W} ${y}L${W} ${H}L0 ${H}Z`, grass, 'grass');
  a.region(`M0 ${y + 110}L${W} ${y + 110}L${W} ${y + 190}L0 ${y + 190}Z`, road_, 'road');
  for (let x = 30; x < W; x += 110) a.line(`M${x} ${y + 150}h50`, 5);
}
function snowflake(a) { a.line('M0 -16V16M-14 -8L14 8M-14 8L14 -8', 3); }

const RAW = { cat, dog, elephant, frog, bee, snail, penguin, chick, ladybird, whale, pig, iceCream, cupcake, apple, strawberry, car, sailboat, balloon, snowman, kite, umbrella };
const OUT = { beach, snow, road, snowflake, ellipseBand, circleCap, RAW };
const EDGE_OK = new Set([]);
for (const [k, fn] of Object.entries(RAW)) OUT[k] = (a, ...args) => a.group(k, () => fn(a, ...args), { edgeOk: EDGE_OK.has(k) });
module.exports = OUT;
