/**
 * data/ptx/scenes-K421.js — K-421 "Round and round" Level Set copies (ptl): ROUND pictures resting on ramps, each traced round
 * from a dot at 2 o'clock, anticlockwise (like o); only the round outline is dashed, inner details are drawn.
 * Cast chosen BY MEASUREMENT (silhouette circularity, out/pt/_round.js): Designer A's list held a paddle, a magnifying glass,
 * a UFO, a jellyfish, grapes, a cauliflower — not round — and was replaced; where the library runs out of round drawings the
 * page carries DRAWN round pictures (buttons, a moon, a sun, a planet) whose outer ring is traced and details drawn.
 * Levels (ptl-levels.md §K-421): L1 PreK-1 — 2 big pictures on 2 ramps · L2 PreK — 3 on the published zigzag of ramps ·
 * L3 PreK-3 — 4 smaller pictures, two per ramp.
 */
'use strict';
const BAND = { 1: { band: 'PreK-1', style: 'P1' }, 2: { band: 'PreK', style: 'P1' }, 3: { band: 'PreK-3', style: 'P2' } };
const ramp = (x0, y0, x1, y1, stopAt) => [{ d: `M${x0} ${y0} L${x1} ${y1}`, w: 4 }, ...(stopAt === 'left' ? [{ d: `M${x0} ${y0 - 26} L${x0} ${y0}`, w: 4 }] : stopAt === 'right' ? [{ d: `M${x1} ${y1 - 26} L${x1} ${y1}`, w: 4 }] : [])];
const yOn = (x0, y0, x1, y1, x) => y0 + (y1 - y0) * (x - x0) / (x1 - x0);
/** a library round picture resting on a ramp point, fitted to `size` */
const pic = (src, x, yBottom, size, outline = true) => ({ src, x, y: yBottom - 2, fit: size, start: 'contour', outline });
/** DRAWN round pictures: the outer ring traced from 2 o'clock (start: lines), the details drawn solid behind nothing */
const ringPic = (cx, cyBottom, r, details, inner) => {
  const cy = cyBottom - r - 2;
  // inner: a second traced ring (a button's rim) — the L3 button box traces both rings
  return { motifs: [{ m: 'circle', a: [cx, cy, r], start: 'lines' }, ...(inner ? [{ m: 'circle', a: [cx, cy, r * inner], start: 'lines' }] : [])], decor: details(cx, cy, r) };
};
const D = {
  button: (cx, cy, r) => [{ m: 'circle', a: [cx, cy, r * 0.78], w: 2.5 }, ...[[-1, -1], [1, -1], [-1, 1], [1, 1]].map(([a, b]) => ({ m: 'circle', a: [cx + a * r * 0.24, cy + b * r * 0.24, r * 0.1], fill: '#1a1a1a', stroke: false }))],
  buttonHoles: (cx, cy, r) => [[-1, -1], [1, -1], [-1, 1], [1, 1]].map(([a, b]) => ({ m: 'circle', a: [cx + a * r * 0.22, cy + b * r * 0.22, r * 0.1], fill: '#1a1a1a', stroke: false })),
  moon: (cx, cy, r) => [[-0.3, -0.25, 0.2], [0.32, 0.05, 0.15], [-0.05, 0.4, 0.12], [0.2, -0.45, 0.09]].map(([a, b, k]) => ({ m: 'circle', a: [cx + a * r, cy + b * r, k * r], w: 2.5 })),
  sun: (cx, cy, r) => [{ d: `M${cx - r * 0.35} ${cy + r * 0.15} Q${cx} ${cy + r * 0.45} ${cx + r * 0.35} ${cy + r * 0.15}`, w: 3 }, { m: 'circle', a: [cx - r * 0.3, cy - r * 0.2, r * 0.07], fill: '#1a1a1a', stroke: false }, { m: 'circle', a: [cx + r * 0.3, cy - r * 0.2, r * 0.07], fill: '#1a1a1a', stroke: false }],
  bauble: (cx, cy, r) => [{ m: 'roundRect', a: [cx - r * 0.22, cy - r - r * 0.22, r * 0.44, r * 0.24, 3], w: 2.5 }, { m: 'circle', a: [cx, cy - r - r * 0.32, r * 0.1], w: 2.5 }, { d: 'M' + [-0.9, -0.6, -0.3, 0, 0.3, 0.6, 0.9].map((u, k) => (cx + u * r).toFixed(1) + ' ' + (cy - r * (k % 2 ? 0.32 : 0.1)).toFixed(1)).join(' L'), w: 2.5 }],
  wheel: (cx, cy, r) => [{ m: 'circle', a: [cx, cy, r * 0.74], w: 2.5 }, { m: 'circle', a: [cx, cy, r * 0.16], fill: '#1a1a1a', stroke: false }, ...[0, 1, 2, 3, 4, 5].map((k) => { const t = k * Math.PI / 3; return { d: `M${(cx + Math.cos(t) * r * 0.16).toFixed(1)} ${(cy + Math.sin(t) * r * 0.16).toFixed(1)} L${(cx + Math.cos(t) * r * 0.74).toFixed(1)} ${(cy + Math.sin(t) * r * 0.74).toFixed(1)}`, w: 2.5 }; })],
  plate: (cx, cy, r) => [{ m: 'circle', a: [cx, cy, r * 0.68], w: 2.5 }],
  planet: (cx, cy, r) => [{ d: `M${cx - r * 0.95} ${cy - r * 0.2} Q${cx} ${cy + r * 0.1} ${cx + r * 0.95} ${cy - r * 0.2}`, w: 2.5 }, { d: `M${cx - r * 0.85} ${cy + r * 0.35} Q${cx} ${cy + r * 0.62} ${cx + r * 0.85} ${cy + r * 0.35}`, w: 2.5 }],
};
const merge = (...parts) => parts.reduce((a, p) => ({ items: [...a.items, ...(p.items || [])], motifs: [...a.motifs, ...(p.motifs || [])], decor: [...a.decor, ...(p.decor || [])] }), { items: [], motifs: [], decor: [] });
/** L1: two ramps (top-left, bottom-right), one big round picture on each */
const two = (a, b) => merge({ decor: [...ramp(20, 352, 360, 366, 'left'), ...ramp(315, 704, 655, 714, 'right')] },
  a.motifs ? a : { items: [pic(a, 192, yOn(20, 352, 360, 366, 192), 350)] }, b.motifs ? b : { items: [pic(b, 485, yOn(315, 704, 655, 714, 485), 350)] });
/** L2: the published zigzag of three ramps */
const three = (a, b, c) => merge({ decor: [...ramp(20, 338, 310, 352, 'left'), ...ramp(365, 518, 655, 532, 'right'), { d: 'M20 702 L330 712', w: 4 }] },
  { items: [pic(a, 170, 336, 300), pic(b, 505, 516, 300), pic(c, 175, 700, 300)] });
/** L2 with DRAWN pictures: the published ramps, a drawn ring picture on each */
const threeDrawn = (a, b, c) => merge({ decor: [...ramp(20, 338, 310, 352, 'left'), ...ramp(365, 518, 655, 532, 'right'), { d: 'M20 702 L330 712', w: 4 }] }, a(170, 336), b(505, 516), c(175, 700));
/** L3: two long ramps, two smaller pictures each; an entry is a library key or a DRAWN ring picture */
// L3: the inner round lines are traced too (ptl-levels.md: L3 may carry inner closed round parts)
const four = (list, size = 240) => {
  const R = [[20, 326, 655, 342], [20, 700, 655, 712]];
  const parts = list.map((p, i) => { const r = R[i >> 1], x = i % 2 ? 495 : 185, yb = yOn(r[0], r[1], r[2], r[3], x); return typeof p === 'string' ? { items: [pic(p, x, yb, size, false)] } : p(x, yb); });
  return merge({ decor: [...ramp(...R[0], 'left'), ...ramp(...R[1], 'right')] }, ...parts);
};
const drawn = (kind, r = 108, inner) => (x, yb) => ringPic(x, yb, r, kind === 'button' && inner ? D.buttonHoles : D[kind], inner);
const copy = (id, level, name, layout) => ({ id: 'ptx-K-421-' + id, face: 'K-421', level, name: { en: name }, skin: () => ({ ...BAND[level], ...layout }) });
const SCENES = [
  copy('two-balls', 1, 'Two Balls', two('sports bw 2/soccer_ball', 'sports bw/basketball')),
  copy('egg-cookie', 1, 'Egg and Cookie', two('food bw 3/egg', 'Easter bw/cookie')),   // the muffin is a dome on a case, not round
  copy('pool', 1, 'At the Pool', two('beach bw/preserver_ring', 'beach bw/beach_ball')),
  copy('pumpkin-ball', 1, 'Pumpkin and Ball', two('vegetables bw/pumpkin', 'sports bw 2/tennis_ball')),   // the pie is a dish seen from the side
  copy('duckling-egg', 1, 'Duckling and Egg', two('faces bw/duckling', 'Easter bw 2/egg')),
  copy('ball-games', 2, 'Ball Games', three('sports bw/volleyball', 'sports bw 2/tennis_ball', 'sports bw 2/bowling_ball')),
  copy('sweet-treats', 2, 'Sweet Treats', three('food bw 3/cookie', 'dessert bw/donut', 'Easter bw 2/egg')),   // the muffin is a dome on a case
  copy('winter', 2, 'Winter Rounds', threeDrawn((x, y) => ({ items: [pic('Christmas bw/ornament', x, y, 300)] }), (x, y) => ({ items: [pic('Christmas bw/wreath', x, y, 300)] }), drawn('bauble', 128))),
  copy('wheels', 2, 'Three Wheels', threeDrawn(drawn('wheel', 145), drawn('wheel', 145), drawn('wheel', 145))),   // food bw 2/egg reads as an avocado; the plate is an oval in perspective
  copy('sports-day', 2, 'Sports Day', three('sports bw 2/basketball', 'sports bw/baseball_2', 'sports bw 2/soccer_ball')),   // the American football is an oval
  copy('balls-galore', 3, 'Balls Galore', four(['sports bw 2/tennis_ball', 'sports bw 2/bowling_ball', 'sports bw/basketball', 'sports bw/beach_ball'], 225)),   // the 8-ball carries a printed digit
  copy('bakery', 3, 'The Bakery Window', four(['food bw/donut_2', 'Easter bw/cookie', 'food bw 3/cookie', 'food bw 2/donut'], 225)),   // the biscuit is square layers
  copy('baubles', 3, 'Christmas Baubles', four([drawn('bauble', 100), 'Christmas bw 2/ornament', drawn('bauble', 92), drawn('bauble', 104)], 230)),   // the snow globe stands on a flat base; the wreath + ornament are the L2 winter page's
  copy('sewing-box', 3, 'The Button Box', four([drawn('button', 112, 0.72), drawn('button', 100, 0.72), drawn('button', 106, 0.72), drawn('button', 96, 0.72)])),
  copy('sky', 3, 'Sun, Moon and Earth', four(['space bw/earth', drawn('moon', 105), drawn('sun', 110), drawn('planet', 95)])),
];
module.exports = { SCENES };
