/**
 * fdx-scenery.js — the SCENERY of the Find the Differences Level Set scenes (2026-10-10): the only lines in a scene that
 * are not a library drawing. Operator rule (2026-10-05, CBN): objects and characters come only from the image library;
 * what is drawn here is structure — a horizon, hills, a path, a road, a river, a pond, the sea, dunes, a seabed, the
 * floor and wall of a room, a counter, a shelf, a rug, a platform, a pier. Every line is a stroke of the library's own
 * weight (7 picture units, round caps and joins), every area it closes is coloured by a named point (`fixed`), and the
 * scenery is BACKGROUND: it is never a difference.
 *
 *   sceneryFor(setting, variant, mirror) → { hy, lines:[{d}], fixed:[{name, at:[x,y], colour}], zones }
 *
 * zones (where a library drawing may stand; picture units, 600 × 560):
 *   ground  { y0, y1 }                 the baseline band of a ground drawing (y = its bottom), back (y0) to front (y1)
 *   sky     { y0, y1 }                 the centre band of a sky drawing
 *   wall    { y0, y1 }                 indoor: the centre band of a wall drawing
 *   water   { x0, x1, y0, y1 }         under water: where a swimming animal may be (its centre)
 *   float   { y }                      the water line a boat floats on (its bottom)
 *   surfaces [{ x0, x1, y }]           a counter / shelf / stall top a 't' drawing stands on
 *   keepOut [[x0, y0, x1, y1]]         areas no ground drawing may stand in (a pond, a river, a road's lanes)
 */
'use strict';
const W = 600, H = 560;
const r1 = (v) => Math.round(v * 10) / 10;

/** one settings' geometry, x mirrored when `m` */
function geo(m) {
  const X = (x) => r1(m ? W - x : x);
  const P = (pts) => pts.map(([x, y]) => `${X(x)} ${r1(y)}`).join(' ');
  const mounds = [];   // every hill / dune / peak drawn: [x0, x1, top] in output units (sky drawings stay above them)
  const mound = (a, b, top) => { const p = [X(a), X(b)].sort((u, v) => u - v); mounds.push([p[0], p[1], top]); };
  return {
    X, mounds, mound,
    /** a gently curved horizon across the whole frame */
    horizon: (y, a = 14) => ({ d: `M${X(-20)} ${y} C${X(150)} ${y - a} ${X(450)} ${y + a} ${X(620)} ${y}` }),
    /** a straight line */
    line: (x0, y0, x1, y1) => ({ d: `M${X(x0)} ${r1(y0)} L${X(x1)} ${r1(y1)}` }),
    /** a hill: an arch standing on the horizon line y (closes a region with it) */
    hill: (x0, x1, y, h) => (mound(x0, x1, y - h), { d: `M${X(x0)} ${y} C${X(x0 + (x1 - x0) * 0.18)} ${y - h * 1.32} ${X(x1 - (x1 - x0) * 0.18)} ${y - h * 1.32} ${X(x1)} ${y}` }),
    /** a path from the bottom edge (bl..br) narrowing to a point near the horizon (tx, ty) */
    path: (bl, br, tx, ty, bend = 60) => [
      { d: `M${X(bl)} ${H + 10} C${X(bl + bend)} ${r1(H - (H - ty) * 0.45)} ${X(tx - 30)} ${r1(ty + 30)} ${X(tx - 8)} ${ty}` },
      { d: `M${X(br)} ${H + 10} C${X(br + bend * 0.6)} ${r1(H - (H - ty) * 0.45)} ${X(tx + 30)} ${r1(ty + 30)} ${X(tx + 8)} ${ty}` },
    ],
    /** a band across the frame between two wavy edges (a river, a road) */
    band: (y0, y1, a = 10) => [
      { d: `M${X(-20)} ${y0} C${X(160)} ${y0 - a} ${X(420)} ${y0 + a} ${X(620)} ${y0}` },
      { d: `M${X(-20)} ${y1} C${X(170)} ${y1 + a} ${X(430)} ${y1 - a} ${X(620)} ${y1}` },
    ],
    /** an ellipse (a pond, a rug, a sandpit) */
    ellipse: (cx, cy, rx, ry) => ({ d: `M${X(cx - rx)} ${cy}a${rx} ${ry} 0 1 0 ${m ? -2 * rx : 2 * rx} 0a${rx} ${ry} 0 1 0 ${m ? 2 * rx : -2 * rx} 0` }),
    /** a rounded rectangle outline */
    rect: (x0, y0, x1, y1, r = 6) => {
      const a = Math.min(X(x0), X(x1)), b = Math.max(X(x0), X(x1));
      return { d: `M${a + r} ${y0} H${b - r} Q${b} ${y0} ${b} ${y0 + r} V${y1 - r} Q${b} ${y1} ${b - r} ${y1} H${a + r} Q${a} ${y1} ${a} ${y1 - r} V${y0 + r} Q${a} ${y0} ${a + r} ${y0} Z` };
    },
    /** the short dashes down the middle of a road (ink only, they close no area) */
    dashes: (y, x0, x1, len = 34, gap = 30) => { const out = []; for (let x = x0; x + len <= x1; x += len + gap) out.push({ d: `M${X(x)} ${y} L${X(x + len)} ${y}` }); return out; },
    /** a wavy water line */
    waves: (y, a = 8, n = 8) => { let d = `M${X(-20)} ${y}`; const step = 640 / n; for (let i = 0; i < n; i++) { const x0 = -20 + i * step; d += ` Q${X(x0 + step / 2)} ${y - a * (i % 2 ? -1 : 1)} ${X(x0 + step)} ${y}`; } return { d }; },
    /** a rock on the ground line y: a low dome */
    rock: (cx, y, w, h) => ({ d: `M${X(cx - w / 2)} ${y} C${X(cx - w / 2)} ${y - h * 1.1} ${X(cx + w / 2)} ${y - h * 1.1} ${X(cx + w / 2)} ${y}` }),
    /** point helper for fixed colour points */
    at: (x, y) => [X(x), y],
  };
}

const S = {};   // setting key → (g, variant) => scenery

/* ------------------------------------------------------------------------------------------------ outdoor, grass */
S.park = (g, v) => {
  const hy = [300, 320, 290][v];
  const lines = [g.horizon(hy)];
  const fixed = [{ name: 'sky', at: g.at(20, 20), colour: 'lightblue' }];
  if (v !== 1) { lines.push(g.hill(-30, 260, hy, 70), g.hill(330, 640, hy, 50)); fixed.push({ name: 'hill', at: g.at(110, hy - 30), colour: 'lightgreen' }, { name: 'hill', at: g.at(480, hy - 22), colour: 'lightgreen' }); }
  const p = v === 2 ? g.path(300, 520, 300, hy, 70) : g.path(190, 420, 330, hy, -50);
  lines.push(...p);
  fixed.push({ name: 'path', at: g.at(v === 2 ? 395 : 320, 545), colour: 'orange' }, { name: 'ground', at: g.at(30, 548), colour: 'green' }, { name: 'ground', at: g.at(580, 548), colour: 'green' });
  const pathX = v === 2 ? [280, 540] : [170, 440];
  void pathX;
  return { hy, lines, fixed, zones: { ground: { y0: hy + 36, y1: 545 }, sky: { y0: 70, y1: hy - 60 } } };
};
S.meadow = (g, v) => {
  const hy = [310, 290, 330][v];
  const lines = [g.horizon(hy), g.hill(-20, 200, hy, 60), g.hill(200, 430, hy, 85), g.hill(430, 640, hy, 55)];
  const fixed = [{ name: 'sky', at: g.at(20, 20), colour: 'lightblue' }, { name: 'hill', at: g.at(80, hy - 25), colour: 'lightgreen' }, { name: 'hill', at: g.at(315, hy - 40), colour: 'green' }, { name: 'hill', at: g.at(540, hy - 25), colour: 'lightgreen' }, { name: 'ground', at: g.at(20, 548), colour: 'lightgreen' }];
  return { hy, lines, fixed, zones: { ground: { y0: hy + 36, y1: 545 }, sky: { y0: 60, y1: hy - 100 } } };
};
S.farmyard = (g, v) => {
  const hy = [330, 300, 320][v];
  const lines = [g.horizon(hy)];
  const fixed = [{ name: 'sky', at: g.at(20, 20), colour: 'lightblue' }, { name: 'ground', at: g.at(20, 548), colour: 'green' }];
  let keepOut = [];
  if (v === 1) { lines.push(...g.path(420, 560, 470, hy, 40)); fixed.push({ name: 'path', at: g.at(490, 545), colour: 'brown' }); }
  if (v === 2) { lines.push(g.ellipse(470, 470, 100, 34)); fixed.push({ name: 'pond', at: g.at(470, 470), colour: 'blue' }); keepOut = [[360, 430, 580, 510]]; }
  return { hy, lines, fixed, zones: { ground: { y0: hy + 36, y1: 545 }, sky: { y0: 70, y1: hy - 60 }, keepOut } };
};
S.pond = (g, v) => {
  const hy = [290, 300, 280][v];
  const ex = [300, 320, 280][v], ey = [430, 425, 435][v], rx = [190, 170, 210][v], ry = [56, 52, 58][v];
  const lines = [g.horizon(hy), g.ellipse(ex, ey, rx, ry)];
  const fixed = [{ name: 'sky', at: g.at(20, 20), colour: 'lightblue' }, { name: 'pond', at: g.at(ex, ey), colour: 'blue' }, { name: 'ground', at: g.at(20, 548), colour: 'green' }, { name: 'ground', at: g.at(20, hy + 20), colour: 'green' }];
  if (v === 1) { lines.push(g.hill(380, 640, hy, 60)); fixed.push({ name: 'hill', at: g.at(520, hy - 25), colour: 'lightgreen' }); }
  return { hy, lines, fixed, zones: { ground: { y0: hy + 34, y1: 545 }, sky: { y0: 70, y1: hy - 60 }, float: { y: ey + 10, x0: ex - rx + 60, x1: ex + rx - 60 }, keepOut: [[ex - rx - 10, ey - ry - 4, ex + rx + 10, ey + ry + 6]] } };
};
S.river = (g, v) => {
  const hy = [280, 300, 290][v];
  const ry0 = [400, 380, 420][v], ry1 = ry0 + 60;
  const lines = [g.horizon(hy), ...g.band(ry0, ry1, 12)];
  const fixed = [{ name: 'sky', at: g.at(20, 20), colour: 'lightblue' }, { name: 'river', at: g.at(300, ry0 + 30), colour: 'blue' }, { name: 'ground', at: g.at(20, hy + 20), colour: 'green' }, { name: 'ground', at: g.at(20, 548), colour: 'green' }];
  if (v !== 0) { lines.push(g.hill(-30, 300, hy, 60)); fixed.push({ name: 'hill', at: g.at(130, hy - 25), colour: 'lightgreen' }); }
  return { hy, lines, fixed, zones: { ground: { y0: hy + 34, y1: 545 }, sky: { y0: 70, y1: hy - 60 }, float: { y: ry0 + 40, x0: 80, x1: 520 }, keepOut: [[-10, ry0 - 30, 610, ry1 + 16]] } };
};
S.forest = (g, v) => {
  const hy = [330, 350, 310][v];
  const lines = [g.horizon(hy)];
  const fixed = [{ name: 'sky', at: g.at(20, 20), colour: 'lightblue' }, { name: 'ground', at: g.at(20, 548), colour: 'green' }];
  if (v === 1) { lines.push(...g.path(200, 330, 260, hy, 40)); fixed.push({ name: 'path', at: g.at(265, 545), colour: 'brown' }); }
  return { hy, lines, fixed, zones: { ground: { y0: hy + 30, y1: 545 }, sky: { y0: 70, y1: hy - 80 } } };
};
S.mountain = (g, v) => {
  const hy = [330, 310, 340][v];
  const lines = [g.horizon(hy)];
  const pk = [[[-20, hy], [90, hy - 170], [190, hy - 60], [300, hy - 200], [420, hy - 80], [520, hy - 160], [620, hy]], [[-20, hy], [120, hy - 140], [240, hy - 40], [380, hy - 190], [620, hy]], [[-20, hy], [80, hy - 120], [200, hy - 190], [330, hy - 70], [450, hy - 150], [620, hy]]][v];
  lines.push({ d: 'M' + pk.map(([x, y]) => `${g.X(x)} ${y}`).join(' L') });
  for (let k = 1; k < pk.length; k++) g.mound(pk[k - 1][0], pk[k][0], Math.min(pk[k - 1][1], pk[k][1]));
  const fixed = [{ name: 'sky', at: g.at(20, 20), colour: 'lightblue' }, { name: 'mountain', at: g.at(pk[1][0], pk[1][1] + 60), colour: 'grey' }, { name: 'ground', at: g.at(20, 548), colour: 'lightgreen' }];
  return { hy, lines, fixed, zones: { ground: { y0: hy + 34, y1: 545 }, sky: { y0: 60, y1: 120 } } };
};
S.savanna = (g, v) => {
  const hy = [340, 320, 350][v];
  const lines = [g.horizon(hy, 8)];
  if (v === 1) lines.push(g.hill(320, 640, hy, 40));
  const fixed = [{ name: 'sky', at: g.at(20, 20), colour: 'lightblue' }, { name: 'ground', at: g.at(20, 548), colour: 'yellow' }];
  if (v === 1) fixed.push({ name: 'hill', at: g.at(480, hy - 18), colour: 'orange' });
  return { hy, lines, fixed, zones: { ground: { y0: hy + 34, y1: 545 }, sky: { y0: 70, y1: hy - 70 } } };
};
S.desert = (g, v) => {
  const hy = [340, 320, 330][v];
  const lines = [g.horizon(hy, 8), g.hill(-30, 260, hy, 45), g.hill(260, 640, hy, 35)];
  const fixed = [{ name: 'sky', at: g.at(20, 20), colour: 'lightblue' }, { name: 'dune', at: g.at(120, hy - 15), colour: 'orange' }, { name: 'dune', at: g.at(450, hy - 12), colour: 'orange' }, { name: 'ground', at: g.at(20, 548), colour: 'yellow' }];
  return { hy, lines, fixed, zones: { ground: { y0: hy + 34, y1: 545 }, sky: { y0: 70, y1: hy - 80 } } };
};
S.winter = (g, v) => {
  const hy = [340, 320, 350][v];
  const lines = [g.horizon(hy), g.hill(-30, 280, hy, 50), g.hill(280, 640, hy, 65)];
  const fixed = [{ name: 'sky', at: g.at(20, 20), colour: 'lightblue' }, { name: 'hill', at: g.at(110, hy - 20), colour: 'none' }, { name: 'hill', at: g.at(470, hy - 28), colour: 'none' }, { name: 'ground', at: g.at(20, 548), colour: 'none' }];
  return { hy, lines, fixed, zones: { ground: { y0: hy + 34, y1: 545 }, sky: { y0: 60, y1: hy - 100 } } };
};
S.polar = (g, v) => {
  const hy = [360, 340, 370][v];
  const lines = [g.waves(hy, 6, 10), g.horizon(hy + 50, 4)];
  const fixed = [{ name: 'sky', at: g.at(20, 20), colour: 'lightblue' }, { name: 'sea', at: g.at(20, hy + 25), colour: 'blue' }, { name: 'ice', at: g.at(20, 548), colour: 'none' }];
  return { hy: hy + 50, lines, fixed, zones: { ground: { y0: hy + 84, y1: 545 }, sky: { y0: 60, y1: hy - 70 }, float: { y: hy + 30, x0: 60, x1: 540 } } };
};
S.beach = (g, v) => {
  const hy = [290, 270, 300][v];
  const sl = [380, 360, 400][v];
  const lines = [g.horizon(hy, 4), g.waves(sl, 10, 6)];
  const fixed = [{ name: 'sky', at: g.at(20, 20), colour: 'lightblue' }, { name: 'sea', at: g.at(20, hy + 20), colour: 'blue' }, { name: 'sea', at: g.at(580, hy + 20), colour: 'blue' }, { name: 'sand', at: g.at(20, 548), colour: 'yellow' }];
  return { hy: sl, lines, fixed, zones: { ground: { y0: sl + 40, y1: 545 }, sky: { y0: 70, y1: hy - 60 }, float: { y: hy + 50, x0: 80, x1: 520 } } };
};
S.sea = (g, v) => {
  // under water: the water line high up, a sandy seabed with rocks
  const wl = [70, 60, 80][v], bed = [470, 480, 460][v];
  const lines = [g.waves(wl, 6, 10), { d: `M${g.X(-20)} ${bed} C${g.X(160)} ${bed - 22} ${g.X(420)} ${bed + 18} ${g.X(620)} ${bed - 6}` }];
  const rocks = [[[110, 110, 50], [500, 130, 60]], [[90, 120, 54], [520, 100, 46]], [[450, 150, 64]]][v];
  for (const [cx, w, h] of rocks) lines.push(g.rock(cx, bed + 2, w, h));
  const fixed = [{ name: 'sky', at: g.at(20, 15), colour: 'lightblue' }, { name: 'water', at: g.at(20, wl + 40), colour: 'lightblue' }, { name: 'seabed', at: g.at(20, 548), colour: 'yellow' }, ...rocks.map(([cx, , h]) => ({ name: 'rock', at: g.at(cx, bed - h * 0.4), colour: 'grey' }))];
  return { hy: bed, lines, fixed, zones: { ground: { y0: bed + 30, y1: 545 }, water: { x0: 40, x1: 560, y0: wl + 60, y1: bed - 50 }, sky: null } };
};
S.harbour = (g, v) => {
  const hy = [280, 300, 270][v], py = [400, 410, 390][v];
  const lines = [g.horizon(hy, 4), g.line(-20, py, 620, py), g.line(-20, py + 22, 620, py + 22)];
  for (let x = 40; x < 600; x += 110) lines.push(g.line(x, py + 22, x, 560));
  const fixed = [{ name: 'sky', at: g.at(20, 20), colour: 'lightblue' }, { name: 'sea', at: g.at(20, hy + 30), colour: 'blue' }, { name: 'pier', at: g.at(300, py + 11), colour: 'brown' }, { name: 'pier', at: g.at(95, 548), colour: 'brown' }, { name: 'pier', at: g.at(205, 548), colour: 'brown' }, { name: 'pier', at: g.at(315, 548), colour: 'brown' }, { name: 'pier', at: g.at(425, 548), colour: 'brown' }, { name: 'pier', at: g.at(20, 548), colour: 'brown' }, { name: 'pier', at: g.at(560, 548), colour: 'brown' }];
  return { hy: py, lines, fixed, zones: { ground: { y0: py + 60, y1: 545 }, sky: { y0: 70, y1: hy - 60 }, float: { y: py - 4, x0: 60, x1: 540 } } };
};
S.street = (g, v) => {
  const hy = [300, 290, 310][v], r0 = [430, 420, 440][v];
  const lines = [g.horizon(hy, 4), g.line(-20, r0, 620, r0), g.line(-20, r0 + 80, 620, r0 + 80), ...g.dashes(r0 + 40, 10, 590)];
  const fixed = [{ name: 'sky', at: g.at(20, 20), colour: 'lightblue' }, { name: 'pavement', at: g.at(20, hy + 30), colour: 'grey' }, { name: 'road', at: g.at(20, r0 + 20), colour: 'grey' }, { name: 'grass', at: g.at(20, 552), colour: 'green' }];
  fixed[1].colour = 'lightgreen';
  return { hy, lines, fixed, zones: { ground: { y0: hy + 40, y1: r0 - 4 }, road: { y0: r0 + 50, y1: r0 + 76 }, sky: { y0: 70, y1: hy - 60 } } };
};
S.station = (g, v) => {
  const hy = [300, 290, 310][v], pl = [440, 430, 450][v];
  const lines = [g.horizon(hy, 4), g.line(-20, pl - 70, 620, pl - 70), g.line(-20, pl - 58, 620, pl - 58), g.line(-20, pl, 620, pl), g.rect(-20, pl, 640, pl + 30, 2)];
  for (let x = 10; x < 600; x += 46) lines.push(g.line(x, pl - 76, x, pl - 52));
  const fixed = [{ name: 'sky', at: g.at(20, 20), colour: 'lightblue' }, { name: 'ground', at: g.at(20, hy + 30), colour: 'lightgreen' }, { name: 'track', at: g.at(300, pl - 30), colour: 'grey' }, { name: 'platform', at: g.at(300, pl + 15), colour: 'orange' }, { name: 'platform', at: g.at(300, 548), colour: 'grey' }];
  return { hy, lines, fixed, zones: { ground: { y0: pl + 70, y1: 545 }, rail: { y: pl - 64 }, sky: { y0: 70, y1: hy - 60 } } };
};
S.camp = (g, v) => {
  const hy = [320, 300, 330][v];
  const lines = [g.horizon(hy), g.hill(-30, 220, hy, 55), g.hill(400, 640, hy, 70)];
  const fixed = [{ name: 'sky', at: g.at(20, 20), colour: v === 2 ? 'blue' : 'lightblue' }, { name: 'hill', at: g.at(90, hy - 22), colour: 'green' }, { name: 'hill', at: g.at(530, hy - 30), colour: 'green' }, { name: 'ground', at: g.at(20, 548), colour: 'lightgreen' }];
  return { hy, lines, fixed, zones: { ground: { y0: hy + 34, y1: 545 }, sky: { y0: 70, y1: hy - 90 } }, night: v === 2 };
};
S.night = (g, v) => {
  const hy = [360, 340, 370][v];
  const lines = [g.horizon(hy), g.hill(-30, 260, hy, 40)];
  const fixed = [{ name: 'sky', at: g.at(20, 20), colour: 'blue' }, { name: 'hill', at: g.at(110, hy - 15), colour: 'green' }, { name: 'ground', at: g.at(20, 548), colour: 'green' }];
  return { hy, lines, fixed, zones: { ground: { y0: hy + 30, y1: 545 }, sky: { y0: 60, y1: hy - 80 } } };
};
S.space = (g, v) => {
  const hy = [440, 430, 450][v];
  const lines = [{ d: `M${g.X(-20)} ${hy} C${g.X(150)} ${hy - 40} ${g.X(450)} ${hy - 40} ${g.X(620)} ${hy}` }, g.ellipse(120, hy + 50, 40, 12), g.ellipse(430, hy + 70, 55, 14)];
  const fixed = [{ name: 'sky', at: g.at(20, 20), colour: 'purple' }, { name: 'moon-ground', at: g.at(20, 548), colour: 'grey' }, { name: 'crater', at: g.at(120, hy + 50), colour: 'grey' }, { name: 'crater', at: g.at(430, hy + 70), colour: 'grey' }];
  return { hy, lines, fixed, zones: { ground: { y0: hy + 20, y1: 545 }, sky: { y0: 60, y1: hy - 80 }, keepOut: [[70, hy + 30, 170, hy + 70], [365, hy + 50, 495, hy + 90]] } };
};

S.garden = (g, v) => {
  // a lawn with a flower bed along the back (a long low band) and stepping stones
  const hy = [300, 310, 290][v], by = hy + 40;
  const lines = [g.horizon(hy), { d: `M${g.X(-20)} ${by} C${g.X(150)} ${by + 14} ${g.X(450)} ${by - 14} ${g.X(620)} ${by}` }];
  const stones = [[[150, 520], [230, 488], [300, 462]], [[420, 525], [350, 490], [290, 462]], [[300, 525], [300, 486], [300, 455]]][v];
  for (const [x, y] of stones) lines.push(g.ellipse(x, y, 34, 12));
  const fixed = [{ name: 'sky', at: g.at(20, 20), colour: 'lightblue' }, { name: 'bed', at: g.at(20, hy + 18), colour: 'brown' }, { name: 'ground', at: g.at(20, 548), colour: 'green' }, ...stones.map(([x, y]) => ({ name: 'stone', at: g.at(x, y), colour: 'grey' }))];
  return { hy: by, lines, fixed, zones: { ground: { y0: by + 30, y1: 545 }, back: { y0: hy + 18, y1: by - 2 }, sky: { y0: 70, y1: hy - 60 } } };
};
S.jungle = (g, v) => {
  const hy = [300, 280, 310][v], ry0 = [505, 500, 510][v];
  const lines = [g.horizon(hy), g.hill(-30, 220, hy, 70), g.hill(220, 420, hy, 90), g.hill(420, 640, hy, 60), ...g.band(ry0, ry0 + 40, 8)];
  const fixed = [{ name: 'sky', at: g.at(20, 20), colour: 'lightblue' }, { name: 'hill', at: g.at(90, hy - 30), colour: 'green' }, { name: 'hill', at: g.at(320, hy - 45), colour: 'lightgreen' }, { name: 'hill', at: g.at(530, hy - 25), colour: 'green' }, { name: 'ground', at: g.at(20, hy + 20), colour: 'green' }, { name: 'river', at: g.at(300, ry0 + 20), colour: 'blue' }, { name: 'ground', at: g.at(20, 552), colour: 'green' }];
  return { hy, lines, fixed, zones: { ground: { y0: hy + 34, y1: ry0 - 10 }, sky: { y0: 70, y1: hy - 110 }, keepOut: [[-10, ry0 - 14, 610, ry0 + 56]] } };
};
S.zoo = (g, v) => {
  // a wooden fence across the back of the enclosure (two rails on posts), a sandy walk in front
  const hy = [260, 250, 270][v], f0 = hy + 16, f1 = hy + 100, wy = [470, 480, 460][v];
  const rails = [[f0 + 14, f0 + 30], [f0 + 52, f0 + 68]];
  const lines = [g.horizon(hy), g.line(-20, wy, 620, wy)];
  for (const [a, b] of rails) lines.push(g.line(-20, a, 620, a), g.line(-20, b, 620, b));
  const posts = []; for (let x = 30; x <= 570; x += 90) { posts.push(x); lines.push(g.rect(x - 9, f0, x + 9, f1, 3)); }
  const fixed = [{ name: 'sky', at: g.at(20, 20), colour: 'lightblue' }, { name: 'ground', at: g.at(300, f1 + 30), colour: 'lightgreen' }, { name: 'walk', at: g.at(20, 548), colour: 'yellow' }];
  // every cell of a post (top, rail, gap, rail, foot) and every rail span between posts
  for (const x of posts) for (const y of [f0 + 7, rails[0][0] + 8, (rails[0][1] + rails[1][0]) / 2, rails[1][0] + 8, (rails[1][1] + f1) / 2]) fixed.push({ name: 'post', at: g.at(x, y), colour: 'brown' });
  const spans = [0, ...posts.map((x) => x + 45)];
  for (const x of spans) for (const [a, b] of rails) fixed.push({ name: 'rail', at: g.at(Math.max(4, Math.min(596, x === 0 ? 8 : x)), (a + b) / 2), colour: 'brown' });
  // the grass seen between the horizon, the rails and the posts
  for (const x of spans) for (const y of [(hy + rails[0][0]) / 2 + 4, (rails[0][1] + rails[1][0]) / 2, (rails[1][1] + f1) / 2]) fixed.push({ name: 'ground', at: g.at(Math.max(4, Math.min(596, x === 0 ? 8 : x)), y), colour: 'lightgreen' });
  return { hy: f1, lines, fixed, zones: { ground: { y0: f1 + 26, y1: 545 }, sky: { y0: 70, y1: hy - 60 } } };
};
S.village = (g, v) => {
  const hy = [290, 300, 280][v], r0 = [480, 470, 490][v];
  const lines = [g.horizon(hy), g.hill(-30, 300, hy, 50), ...g.band(r0, r0 + 44, 4)];
  const fixed = [{ name: 'sky', at: g.at(20, 20), colour: 'lightblue' }, { name: 'hill', at: g.at(130, hy - 20), colour: 'lightgreen' }, { name: 'ground', at: g.at(20, hy + 20), colour: 'green' }, { name: 'lane', at: g.at(300, r0 + 22), colour: 'grey' }, { name: 'ground', at: g.at(20, 553), colour: 'green' }];
  return { hy, lines, fixed, zones: { ground: { y0: hy + 40, y1: r0 - 6 }, road: { y0: r0 + 30, y1: r0 + 40 }, sky: { y0: 70, y1: hy - 60 } } };
};
S.lake = (g, v) => {
  const hy = [250, 240, 260][v], sh = [370, 360, 380][v];
  const lines = [{ d: `M${g.X(-20)} ${hy} L${g.X(620)} ${hy}` }, g.hill(-30, 260, hy, 80), g.hill(260, 640, hy, 60), { d: `M${g.X(-20)} ${sh} C${g.X(160)} ${sh - 18} ${g.X(420)} ${sh + 18} ${g.X(620)} ${sh}` }];
  const fixed = [{ name: 'sky', at: g.at(20, 20), colour: 'lightblue' }, { name: 'hill', at: g.at(110, hy - 30), colour: 'green' }, { name: 'hill', at: g.at(450, hy - 22), colour: 'lightgreen' }, { name: 'lake', at: g.at(300, (hy + sh) / 2), colour: 'blue' }, { name: 'ground', at: g.at(20, 548), colour: 'green' }];
  return { hy: sh, lines, fixed, zones: { ground: { y0: sh + 36, y1: 545 }, sky: { y0: 60, y1: hy - 110 }, float: { y: sh - 18, x0: 70, x1: 530 } } };
};
/* ------------------------------------------------------------------------------------------------ indoor */
function room(g, v, { wall, floor, hy, counter, shelf, rug }) {
  const lines = [g.line(-20, hy, 620, hy)];
  // the skirting board runs along the wall but not behind a counter (it would cut a strip off the counter's foot)
  // (only the parts of it a child can see: a stub under 40 units beside a frame-wide counter is left out)
  const sk = counter ? [[-20, counter[0]], [counter[1], 620]].filter(([a, b]) => Math.min(b, 600) - Math.max(a, 0) > 40) : [[-20, 620]];
  for (const [a, b] of sk) lines.push(g.line(a, hy - 14, b, hy - 14));
  const fixed = [{ name: 'sky', at: g.at(20, 20), colour: wall }, { name: 'ground', at: g.at(20, 548), colour: floor }];
  for (const [a, b] of sk) fixed.push({ name: 'skirting', at: g.at((Math.max(0, a) + Math.min(600, b)) / 2, hy - 7), colour: 'brown' });
  const surfaces = [];
  const keepOut = [];
  const blocks = [];   // drawn furniture: nothing may stand IN FRONT of it (a fridge across the counter hides what stands on it)
  if (counter) {
    const [x0, x1, top] = counter;
    lines.push(g.rect(x0, top, x1, hy, 4), g.line(x0, top + 16, x1, top + 16));
    fixed.push({ name: 'counter-top', at: g.at((x0 + x1) / 2, top + 8), colour: 'brown' }, { name: 'counter', at: g.at((x0 + x1) / 2, (top + hy) / 2 + 8), colour: floor === 'orange' ? 'red' : 'orange' });
    surfaces.push({ x0: Math.min(g.X(x0), g.X(x1)) + 14, x1: Math.max(g.X(x0), g.X(x1)) - 14, y: top });
    blocks.push([Math.min(g.X(x0), g.X(x1)), top, Math.max(g.X(x0), g.X(x1)), hy]);
  }
  if (shelf) {
    const [x0, x1, y] = shelf;
    lines.push(g.rect(x0, y, x1, y + 14, 3), g.line(x0 + 24, y + 14, x0 + 24, y + 40), g.line(x1 - 24, y + 14, x1 - 24, y + 40));
    fixed.push({ name: 'shelf', at: g.at((x0 + x1) / 2, y + 7), colour: 'brown' });
    surfaces.push({ x0: Math.min(g.X(x0), g.X(x1)) + 10, x1: Math.max(g.X(x0), g.X(x1)) - 10, y, shelf: true });
    blocks.push([Math.min(g.X(x0), g.X(x1)), y, Math.max(g.X(x0), g.X(x1)), y + 40]);
  }
  if (rug) {
    const [cx, cy, rx, ry, c] = rug;
    lines.push(g.ellipse(cx, cy, rx, ry), g.ellipse(cx, cy, rx - 16, ry - 8));
    fixed.push({ name: 'rug', at: g.at(cx - rx + 8, cy), colour: c }, { name: 'rug', at: g.at(cx, cy), colour: c === 'red' ? 'yellow' : 'pink' });
  }
  return { hy, lines, fixed, zones: { ground: { y0: hy + 40, y1: 545 }, wall: { y0: 70, y1: hy - 90 }, ceiling: { y0: 50, y1: 70 }, surfaces, keepOut, blocks }, indoor: true };
}
S.kitchen = (g, v) => room(g, v, [
  { wall: 'yellow', floor: 'orange', hy: 380, counter: [330, 600, 270] },
  { wall: 'lightblue', floor: 'brown', hy: 390, counter: [0, 280, 280], shelf: [360, 560, 150] },
  { wall: 'pink', floor: 'orange', hy: 370, counter: [200, 600, 262] },
][v]);
S.livingroom = (g, v) => room(g, v, [
  { wall: 'lightblue', floor: 'brown', hy: 380, rug: [300, 480, 170, 40, 'red'] },
  { wall: 'yellow', floor: 'orange', hy: 370, shelf: [40, 240, 150], rug: [330, 470, 160, 38, 'purple'] },
  { wall: 'pink', floor: 'brown', hy: 390, rug: [280, 485, 190, 42, 'blue'] },
][v]);
S.bedroom = (g, v) => room(g, v, [
  { wall: 'lightblue', floor: 'orange', hy: 380, shelf: [380, 580, 140], rug: [260, 480, 150, 36, 'pink'] },
  { wall: 'purple', floor: 'brown', hy: 370, rug: [320, 470, 170, 40, 'yellow'] },
  { wall: 'yellow', floor: 'brown', hy: 390, shelf: [30, 230, 150] },
][v]);
S.classroom = (g, v) => room(g, v, [
  { wall: 'lightgreen', floor: 'orange', hy: 380, counter: [380, 600, 290] },
  { wall: 'yellow', floor: 'brown', hy: 370, shelf: [360, 580, 160] },
  { wall: 'lightblue', floor: 'orange', hy: 390, counter: [0, 220, 300] },
][v]);
// the bakery counter runs low across the shop (read 2026-10-10: a high counter left the bottom 40 % of the picture empty)
S.bakery = (g, v) => room(g, v, [
  { wall: 'pink', floor: 'brown', hy: 490, counter: [0, 600, 400], shelf: [60, 540, 190] },
  { wall: 'yellow', floor: 'orange', hy: 490, counter: [0, 600, 390], shelf: [100, 500, 200] },
  { wall: 'lightblue', floor: 'brown', hy: 490, counter: [0, 600, 400], shelf: [120, 480, 200] },
][v]);
S.toyshop = (g, v) => room(g, v, [
  { wall: 'yellow', floor: 'brown', hy: 400, shelf: [40, 560, 150], counter: [0, 600, 310] },
  { wall: 'lightblue', floor: 'orange', hy: 390, shelf: [30, 290, 140] },
  { wall: 'pink', floor: 'brown', hy: 400, shelf: [300, 580, 140], counter: [0, 600, 310] },
][v]);
S.bathroom = (g, v) => room(g, v, [
  { wall: 'lightblue', floor: 'none', hy: 390, shelf: [380, 580, 150] },
  { wall: 'lightgreen', floor: 'none', hy: 380 },
  { wall: 'pink', floor: 'lightblue', hy: 390, shelf: [30, 230, 150] },
][v]);
S.party = (g, v) => room(g, v, [
  { wall: 'pink', floor: 'brown', hy: 390, counter: [120, 480, 300] },
  { wall: 'lightblue', floor: 'orange', hy: 380, counter: [0, 330, 290] },
  { wall: 'yellow', floor: 'brown', hy: 400, counter: [260, 600, 300] },
][v]);
S.market = (g, v) => {
  // a market stall: a low counter under a striped awning on two posts (the awning fills the sky the stall would leave empty)
  const hy = [300, 290, 310][v], top = [420, 410, 425][v], bot = top + 80;
  const a0 = 200, a1 = 262, n = 8, sw = 640 / n;
  const lines = [g.horizon(hy, 4), g.rect(-20, top, 640, bot, 2), g.line(-20, top + 16, 640, top + 16),
    g.line(40, a1, 40, top), g.line(54, a1, 54, top), g.line(546, a1, 546, top), g.line(560, a1, 560, top),
    { d: `M${g.X(-20)} ${a0} L${g.X(620)} ${a0}` }, { d: `M${g.X(-20)} ${a1 - 14} L${g.X(620)} ${a1 - 14}` }];
  // the scalloped edge of the awning and its stripes
  let d = `M${g.X(-20)} ${a1 - 14}`;
  for (let k = 0; k < n; k++) { const x0 = -20 + k * sw; d += ` Q${g.X(x0 + sw / 2)} ${a1 + 22} ${g.X(x0 + sw)} ${a1 - 14}`; }
  lines.push({ d });
  for (let k = 1; k < n; k++) lines.push(g.line(-20 + k * sw, a0, -20 + k * sw, a1 - 14));
  const stripe = [['red', 'none'], ['blue', 'none'], ['green', 'yellow']][v];
  const fixed = [{ name: 'sky', at: g.at(20, 20), colour: 'lightblue' }, { name: 'ground', at: g.at(300, hy + 20), colour: 'lightgreen' }, { name: 'stall-top', at: g.at(300, top + 8), colour: 'brown' }, { name: 'stall', at: g.at(300, top + 50), colour: v === 1 ? 'red' : 'orange' }, { name: 'ground', at: g.at(20, 548), colour: 'grey' }];
  for (let k = 0; k < n; k++) { const xc = -20 + k * sw + sw / 2; fixed.push({ name: 'awning', at: g.at(xc, (a0 + a1 - 14) / 2), colour: stripe[k % 2] }, { name: 'awning', at: g.at(xc, a1 - 4), colour: stripe[k % 2] }); }
  for (const x of [47, 553]) fixed.push({ name: 'post', at: g.at(x, (a1 + top) / 2), colour: 'brown' });
  return { hy: bot, lines, fixed, zones: { ground: { y0: top + 70, y1: 545 }, sky: { y0: 70, y1: 130 }, surfaces: [{ x0: 70, x1: 530, y: top }], blocks: [[-20, a0, 620, a1 + 26], [30, a1, 64, top], [536, a1, 570, top]] } };
};
S.picnic = (g, v) => {
  // a checked blanket to one side of the grass (the hero stands beside it)
  const hy = [290, 300, 280][v], bx0 = 260, bx1 = 540, by0 = 410, by1 = 500;
  const lines = [g.horizon(hy), g.hill(300, 640, hy, 55), g.rect(bx0, by0, bx1, by1, 6), g.line(bx0, 440, bx1, 440), g.line(bx0, 470, bx1, 470), g.line(353, by0, 353, by1), g.line(447, by0, 447, by1)];
  const fixed = [{ name: 'sky', at: g.at(20, 20), colour: 'lightblue' }, { name: 'hill', at: g.at(470, hy - 22), colour: 'lightgreen' }, { name: 'ground', at: g.at(20, 548), colour: 'green' }];
  [306, 400, 494].forEach((cx, i) => [425, 455, 485].forEach((cy, j) => fixed.push({ name: 'blanket', at: g.at(cx, cy), colour: (i + j) % 2 ? 'none' : 'red' })));
  const xs = [g.X(bx0), g.X(bx1)].sort((a, b) => a - b);
  return { hy, lines, fixed, zones: { ground: { y0: hy + 34, y1: 545 }, sky: { y0: 70, y1: hy - 60 }, surfaces: [{ x0: xs[0] + 10, x1: xs[1] - 10, y: 470, blanket: true }], keepOut: [[bx0 - 10, by0 - 10, bx1 + 10, by1 + 10]], blocks: [[xs[0], by0, xs[1], by1]] } };
};

const SETTINGS = Object.keys(S);
/** the catalogue tags (data/fdx/catalog.js) a setting's drawings carry: the swap / add partners come from these */
const TAGS = {
  park: ['park', 'garden', 'playground'], meadow: ['meadow', 'garden'], farmyard: ['farm'], pond: ['pond'], river: ['river', 'pond'],
  forest: ['forest'], mountain: ['mountain'], savanna: ['savanna'], desert: ['desert'], winter: ['winter'], polar: ['polar'],
  beach: ['beach'], sea: ['sea', 'reef'], harbour: ['harbour'], street: ['street', 'town'], station: ['station', 'travel'],
  camp: ['camp'], night: ['night'], space: ['space'], kitchen: ['kitchen'], livingroom: ['livingroom'], bedroom: ['bedroom'],
  classroom: ['classroom'], bakery: ['bakery'], toyshop: ['toyshop'], bathroom: ['bathroom'], market: ['market'], picnic: ['picnic'],
  garden: ['garden'], jungle: ['jungle'], zoo: ['zoo'], village: ['street', 'town', 'village', 'garden'], lake: ['lake', 'river', 'pond'], party: ['party'],
};
function sceneryFor(setting, variant = 0, mirror = false) {
  const f = S[setting]; if (!f) throw new Error(`fdx-scenery: no setting ${setting}`);
  const g = geo(!!mirror);
  const sc = f(g, variant);
  sc.zones.mounds = g.mounds;
  // keepOut boxes are written in UNMIRRORED units (the pond's box did not follow the pond: a pig stood in it)
  if (mirror && sc.zones.keepOut) sc.zones.keepOut = sc.zones.keepOut.map(([x0, y0, x1, y1]) => [W - x1, y0, W - x0, y1]);
  if (mirror && sc.zones.float && sc.zones.float.x0 != null) sc.zones.float = { ...sc.zones.float, x0: W - sc.zones.float.x1, x1: W - sc.zones.float.x0 };
  return sc;
}
module.exports = { sceneryFor, SETTINGS, TAGS, W, H };
