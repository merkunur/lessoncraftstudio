/**
 * data/ptx/scenes-K422.js — K-422 "Down, across, slanted" Level Set copies (ptl): three columns under their arrow badges,
 * pictures made mostly of DOWN / ACROSS / SLANTED straight lines. Concepts: _work/ptl-scenes-A.json (Designer A; every
 * library picture's direction mix measured with tools/pt-straight.js); levels ptl-levels.md §K-422: L1 K-1 — 1 picture per
 * column · L2 K (published band) — 2 per column · L3 K-3 — 3 per column.
 * Where the library has no clean straight drawing, the page carries a DRAWN one (SHAPES: unit-square polylines, scaled into
 * the cell) in the library's line style — every drawn shape is made of the column's direction by construction.
 */
'use strict';
const { sceneFor } = require('../b9/face-scenes.js');
const BAND = { 1: { band: 'K-1', style: 'P1' }, 2: { band: 'K', style: 'P2' }, 3: { band: 'K-3', style: 'P3' } };
const cols = () => sceneFor('straight-lines').decor;   // the two column lines + the three arrow badges
const P = (pts) => pts;                              // a polyline in the unit square (x right, y down)
const R = (x0, y0, x1, y1) => P([[x0, y0], [x1, y0], [x1, y1], [x0, y1], [x0, y0]]);
/** drawn straight-line pictures, each mostly in ONE direction (d = down, a = across, s = slanted) */
const SHAPES = {
  // DOWN
  ladder: { d: 'd', lines: [P([[0.25, 0], [0.25, 1]]), P([[0.75, 0], [0.75, 1]]), P([[0.25, 0.25], [0.75, 0.25]]), P([[0.25, 0.5], [0.75, 0.5]]), P([[0.25, 0.75], [0.75, 0.75]])], aspect: 0.5 },
  door: { d: 'd', lines: [R(0.15, 0, 0.85, 1), P([[0.7, 0.5], [0.7, 0.6]])], aspect: 0.5 },
  // a street lamp: a tall pole, a lantern (upright sides) on top, a foot
  lampPost: { d: 'd', lines: [P([[0.5, 1], [0.5, 0.3]]), R(0.3, 0.05, 0.7, 0.3), P([[0.4, 0.05], [0.4, 0.3]]), P([[0.6, 0.05], [0.6, 0.3]]), P([[0.25, 1], [0.75, 1]])], aspect: 0.35 },
  signPost: { d: 'd', lines: [P([[0.5, 1], [0.5, 0.3]]), R(0.2, 0, 0.8, 0.3)], aspect: 0.45 },
  floorLamp: { d: 'd', lines: [P([[0.5, 1], [0.5, 0.25]]), R(0.25, 0, 0.75, 0.25), P([[0.25, 1], [0.75, 1]])], aspect: 0.4 },
  chimney: { d: 'd', lines: [R(0.2, 0.08, 0.8, 1), R(0.1, 0, 0.9, 0.08), P([[0.4, 0.08], [0.4, 0.55]]), P([[0.6, 0.45], [0.6, 1]])], aspect: 0.5 },   // upright brick joints (horizontal bands made it 50 % across)
  scaffold: { d: 'd', lines: [P([[0.15, 0], [0.15, 1]]), P([[0.85, 0], [0.85, 1]]), P([[0.15, 0.33], [0.85, 0.33]]), P([[0.15, 0.66], [0.85, 0.66]])], aspect: 0.55 },
  bollard: { d: 'd', lines: [R(0.3, 0.1, 0.7, 1), P([[0.3, 0.1], [0.5, 0], [0.7, 0.1]])], aspect: 0.35 },
  fridge: { d: 'd', lines: [R(0.1, 0, 0.9, 1), P([[0.1, 0.35], [0.9, 0.35]]), P([[0.78, 0.08], [0.78, 0.26]]), P([[0.78, 0.45], [0.78, 0.75]])], aspect: 0.55 },
  tallGlass: { d: 'd', lines: [P([[0.25, 0.2], [0.3, 1], [0.7, 1], [0.75, 0.2]]), P([[0.55, 0.6], [0.55, 0]])], aspect: 0.45 },
  tower: { d: 'd', lines: [P([[0.4, 1], [0.4, 0.3]]), P([[0.6, 1], [0.6, 0.3]]), R(0.2, 0.12, 0.8, 0.3), P([[0.5, 0.12], [0.5, 0]]), P([[0.25, 1], [0.75, 1]])], aspect: 0.45 },
  brushJar: { d: 'd', lines: [R(0.15, 0.55, 0.85, 1), P([[0.32, 0.55], [0.32, 0]]), P([[0.5, 0.55], [0.5, 0.05]]), P([[0.68, 0.55], [0.68, 0]])], aspect: 0.5 },
  posterTube: { d: 'd', lines: [R(0.3, 0, 0.7, 1), P([[0.3, 0.12], [0.7, 0.12]]), P([[0.3, 0.88], [0.7, 0.88]])], aspect: 0.3 },
  // ACROSS
  tray: { d: 'a', lines: [R(0, 0.2, 1, 0.8), R(0.06, 0.38, 0.16, 0.62), R(0.84, 0.38, 0.94, 0.62)], aspect: 3 },
  paintBox: { d: 'a', lines: [R(0, 0.1, 1, 0.9), P([[0, 0.5], [1, 0.5]]), P([[0.25, 0.5], [0.25, 0.9]]), P([[0.5, 0.5], [0.5, 0.9]]), P([[0.75, 0.5], [0.75, 0.9]])], aspect: 2.6 },
  towel: { d: 'a', lines: [R(0, 0, 1, 1), P([[0, 0.3], [1, 0.3]]), P([[0, 0.55], [1, 0.55]]), P([[0, 0.8], [1, 0.8]])], aspect: 2.4 },
  // a wall shelf with books LYING on it (a shelf of upright books would be DOWN lines)
  shelf: { d: 'a', lines: [R(0, 0.78, 1, 0.88), R(0.08, 0.56, 0.62, 0.78), R(0.12, 0.36, 0.56, 0.56), R(0.68, 0.6, 0.94, 0.78), P([[0.12, 0.88], [0.12, 1]]), P([[0.88, 0.88], [0.88, 1]])], aspect: 2.2 },
  // a chest of three drawers seen from the front, each with a long handle
  drawer: { d: 'a', lines: [R(0, 0, 1, 0.3), R(0, 0.34, 1, 0.64), R(0, 0.68, 1, 0.98), P([[0.35, 0.15], [0.65, 0.15]]), P([[0.35, 0.49], [0.65, 0.49]]), P([[0.35, 0.83], [0.65, 0.83]])], aspect: 1.9 },
  coffeeTable: { d: 'a', lines: [R(0, 0, 1, 0.22), P([[0.1, 0.22], [0.1, 1]]), P([[0.9, 0.22], [0.9, 1]])], aspect: 2.5 },
  workbench: { d: 'a', lines: [R(0, 0, 1, 0.18), P([[0.08, 0.18], [0.08, 1]]), P([[0.92, 0.18], [0.92, 1]]), P([[0.08, 0.7], [0.92, 0.7]])], aspect: 2.2 },
  planks: { d: 'a', lines: [R(0, 0, 1, 0.3), R(0.05, 0.35, 0.95, 0.65), R(0.1, 0.7, 1, 1)], aspect: 3.2 },
  zebra: { d: 'a', lines: [R(0, 0, 1, 0.14), R(0, 0.29, 1, 0.43), R(0, 0.57, 1, 0.71), R(0, 0.86, 1, 1)], aspect: 2.4 },
  beam: { d: 'a', lines: [P([[0, 0], [1, 0], [1, 0.2], [0.62, 0.2], [0.62, 0.8], [1, 0.8], [1, 1], [0, 1], [0, 0.8], [0.38, 0.8], [0.38, 0.2], [0, 0.2], [0, 0]])], aspect: 3 },
  lowWall: { d: 'a', lines: [R(0, 0, 1, 1), P([[0, 0.5], [1, 0.5]]), P([[0.33, 0], [0.33, 0.5]]), P([[0.66, 0], [0.66, 0.5]]), P([[0.17, 0.5], [0.17, 1]]), P([[0.5, 0.5], [0.5, 1]]), P([[0.83, 0.5], [0.83, 1]])], aspect: 2.8 },
  counter: { d: 'a', lines: [R(0, 0, 1, 0.2), R(0.04, 0.2, 0.96, 1), P([[0.04, 0.6], [0.96, 0.6]])], aspect: 2.4 },
  crayonBox: { d: 'a', lines: [R(0, 0.2, 1, 1), P([[0.2, 0.2], [0.2, 0]]), P([[0.4, 0.2], [0.4, 0.05]]), P([[0.6, 0.2], [0.6, 0]]), P([[0.8, 0.2], [0.8, 0.05]])], aspect: 2.4 },
  bed: { d: 'a', lines: [R(0, 0.5, 1, 0.8), P([[0, 0.5], [0, 0.1], [0.12, 0.1], [0.12, 0.5]]), P([[0.04, 0.8], [0.04, 1]]), P([[0.96, 0.8], [0.96, 1]]), P([[0.2, 0.5], [0.2, 0.38], [0.45, 0.38], [0.45, 0.5]])], aspect: 2.6 },
  rug: { d: 'a', lines: [R(0.06, 0, 0.94, 1), P([[0.06, 0.33], [0.94, 0.33]]), P([[0.06, 0.66], [0.94, 0.66]]), P([[0, 0.2], [0.06, 0.2]]), P([[0, 0.5], [0.06, 0.5]]), P([[0, 0.8], [0.06, 0.8]]), P([[0.94, 0.2], [1, 0.2]]), P([[0.94, 0.5], [1, 0.5]]), P([[0.94, 0.8], [1, 0.8]])], aspect: 2.8 },
  belt: { d: 'a', lines: [P([[0, 0.3], [1, 0.3]]), P([[0, 0.7], [1, 0.7]]), P([[0.2, 0.7], [0.2, 1]]), P([[0.8, 0.7], [0.8, 1]])], aspect: 3.2 },
  // SLANTED
  tent: { d: 's', lines: [P([[0, 1], [0.5, 0], [1, 1], [0, 1]]), P([[0.5, 0], [0.25, 1]]), P([[0.5, 0], [0.75, 1]])], aspect: 1.2 },
  pizzaSlice: { d: 's', lines: [P([[0.05, 0.05], [1, 0.45], [0.35, 1], [0.05, 0.05]]), P([[0.92, 0.38], [0.3, 0.92]])], aspect: 1 },
  seesaw: { d: 's', lines: [P([[0, 0.2], [1, 0.75]]), P([[0, 0.3], [1, 0.85]]), P([[0.4, 1], [0.5, 0.55], [0.6, 1]])], aspect: 1.4 },
  leaningLadder: { d: 's', lines: [P([[0.1, 1], [0.55, 0]]), P([[0.45, 1], [0.9, 0]]), P([[0.2, 0.78], [0.55, 0.78]]), P([[0.3, 0.55], [0.65, 0.55]]), P([[0.4, 0.33], [0.75, 0.33]])], aspect: 0.9 },
  barrier: { d: 's', lines: [P([[0.05, 1], [0.05, 0.55]]), P([[0.05, 0.55], [1, 0.05]]), P([[0.05, 0.7], [1, 0.2]]), P([[0.3, 0.42], [0.36, 0.56]]), P([[0.55, 0.29], [0.61, 0.43]]), P([[0.8, 0.16], [0.86, 0.3]])], aspect: 1.3 },
  baguette: { d: 's', lines: [P([[0.05, 0.85], [0.85, 0.05], [0.95, 0.15], [0.15, 0.95], [0.05, 0.85]]), P([[0.3, 0.55], [0.42, 0.67]]), P([[0.5, 0.35], [0.62, 0.47]]), P([[0.7, 0.15], [0.82, 0.27]])], aspect: 1 },
  stairs: { d: 's', lines: [P([[0, 1], [0.8, 0.1]]), P([[0.2, 1], [1, 0.1]]), P([[0.2, 0.78], [0.38, 0.78]]), P([[0.4, 0.55], [0.58, 0.55]]), P([[0.6, 0.33], [0.78, 0.33]])], aspect: 1.2 },
  kite: { d: 's', lines: [P([[0.5, 0], [0.95, 0.4], [0.5, 1], [0.05, 0.4], [0.5, 0]]), P([[0.05, 0.4], [0.95, 0.4]])], aspect: 0.8 },
};
// every drawn shape must be ≥ 60 % of its column's direction (ptl-levels.md §K-422), measured on its own segments
const LOW = [];
for (const [k, S] of Object.entries(SHAPES)) {
  let v = 0, h = 0, sl = 0;
  for (const pl of S.lines) for (let i = 1; i < pl.length; i++) {
    const dx = (pl[i][0] - pl[i - 1][0]) * S.aspect, dy = pl[i][1] - pl[i - 1][1], L = Math.hypot(dx, dy);
    let ang = Math.abs(Math.atan2(dy, dx) * 180 / Math.PI); if (ang > 90) ang = 180 - ang;
    if (ang > 75) v += L; else if (ang < 15) h += L; else sl += L;
  }
  const t = v + h + sl, share = { d: v / t, a: h / t, s: sl / t }[S.d];
  if (share < 0.6) LOW.push(k + ' ' + Math.round(share * 100) + ' % ' + S.d);
}
if (LOW.length) throw new Error('K-422 drawn shapes under 60 % of their direction: ' + LOW.join(', '));
/** a drawn shape fitted into the cell (cx, cy, w, h), keeping its aspect */
function shapeIn(key, cx, cy, w, h) {
  const S = SHAPES[key]; if (!S) throw new Error('K-422: no drawn shape ' + key);
  const a = S.aspect; let sw = w, sh = w / a; if (sh > h) { sh = h; sw = h * a; }
  const x0 = cx - sw / 2, y0 = cy - sh / 2;
  return S.lines.map((pl) => ({ m: 'line', a: [pl.map(([u, v]) => [x0 + u * sw, y0 + v * sh]), pl.length > 2 && pl[0][0] === pl[pl.length - 1][0] && pl[0][1] === pl[pl.length - 1][1]] }));
}
/** the grid: col 0 down, 1 across, 2 slanted; n pictures per column, each a library key or 'draw:<shape>' */
function grid(columns) {
  const items = [], motifs = [];
  const CX = [120, 338, 556], top = 82, bottom = 702;
  columns.forEach((list, c) => {
    const n = list.length, cellH = (bottom - top) / n;
    list.forEach((p, i) => {
      const cx = CX[c], cy = top + cellH * (i + 0.5), w = n === 1 ? 204 : 186, h = cellH - (n === 1 ? 40 : 24);
      if (p.startsWith('draw:')) motifs.push(...shapeIn(p.slice(5), cx, cy, w, h));
      else items.push({ src: p, x: cx, y: cy, fitBox: [w, h], anchor: 'centre' });
    });
  });
  return { decor: cols(), items, motifs };
}
const copy = (id, level, name, columns) => ({ id: 'ptx-K-422-' + id, face: 'K-422', level, name: { en: name }, skin: () => ({ ...BAND[level], ...grid(columns) }) });
const SCENES = [
  copy('kitchen-drawer', 1, 'The Kitchen Drawer', [['kitchen bw/fork'], ['draw:tray'], ['kitchen bw/rolling_pin']]),
  copy('art-corner', 1, 'The Art Corner', [['classroom bw 2/pencil'], ['draw:paintBox'], ['education bw/paintbrush']]),
  copy('surf-shop', 1, 'The Surf Shop', [['beach bw/surfboard'], ['draw:towel'], ['draw:tent']]),
  copy('toy-box', 1, 'The Toy Box', [['draw:ladder'], ['sports bw/skateboard'], ['toys bw/party_hat']]),
  copy('travel-desk', 1, 'Ready to Travel', [['objects bw/smartphone'], ['travel and holiday bw/ticket'], ['classroom bw 2/paper_airplane']]),
  copy('kitchen', 2, 'In the Kitchen', [['kitchen bw/spatula', 'kitchen bw/whisk'], ['home bw/oven', 'draw:shelf'], ['kitchen bw/cutting_board', 'draw:pizzaSlice']]),
  copy('office', 2, 'The Office', [['furniture bw/filing_cabinet', 'draw:door'], ['household bw/computer', 'draw:drawer'], ['classroom bw/marker', 'education bw/eraser']]),
  copy('living-room', 2, 'The Living Room', [['household bw/window', 'draw:floorLamp'], ['furniture bw/sofa', 'draw:coffeeTable'], ['home bw 2/broom', 'classroom bw 2/book']]),
  copy('tool-shed', 2, 'The Tool Shed', [['tools bw/double-ended_wrench', 'tools bw/wrench'], ['draw:workbench', 'draw:planks'], ['tools bw/screwdriver', 'draw:leaningLadder']]),
  copy('bus-stop', 2, 'At the Bus Stop', [['draw:lampPost', 'draw:signPost'], ['vehicles bw 2/bus', 'draw:zebra'], ['draw:barrier', 'draw:kite']]),
  copy('art-studio', 3, 'The Art Studio', [['home bw 2/paintbrush', 'draw:brushJar', 'draw:posterTube'], ['draw:paintBox', 'draw:crayonBox', 'draw:shelf'], ['education bw/crayon', 'education bw/pen', 'education bw/pencil']]),
  copy('bedroom', 3, 'The Bedroom', [['apparel bw/necktie', 'beach bw 2/surfboard', 'draw:door'], ['draw:bed', 'draw:rug', 'draw:drawer'], ['objects bw/toothbrush', 'sports bw/cricket', 'draw:kite']]),
  copy('building-site', 3, 'The Building Site', [['draw:chimney', 'draw:scaffold', 'draw:bollard'], ['draw:beam', 'draw:planks', 'draw:lowWall'], ['draw:leaningLadder', 'draw:stairs', 'draw:seesaw']]),
  copy('snack-bar', 3, 'The Snack Bar', [['draw:fridge', 'draw:tallGlass', 'draw:signPost'], ['food bw/hot_dog', 'draw:counter', 'draw:tray'], ['dessert bw/ice_pop', 'draw:baguette', 'draw:pizzaSlice']]),
  copy('airport', 3, 'At the Airport', [['draw:tower', 'draw:lampPost', 'draw:door'], ['vehicles bw 2/airplane_2', 'draw:belt', 'draw:counter'], ['sports bw/hockey', 'draw:stairs', 'draw:barrier']]),
];
module.exports = { SCENES, SHAPES };
