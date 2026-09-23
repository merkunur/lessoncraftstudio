/**
 * sky-bodies.js — the flat line-art astronomy bodies of G1-378 `earth-and-space`
 * (design docs/worksheet-gen/b5-designs/G1-378-earth-and-space.md §2 "NEW
 * primitives/sky-bodies.js"; gate qa/verify-sky-bodies.js). Tokens only; no
 * text inside a body (orbitDisc and the earthTop pins carry a NUMERAL, which is
 * a label, never a body name). No library picture is ever used by this family.
 *
 *   sunDisc({d, discR = 27.8})           the Sun: coral disc + 8 coral rays (unit viewBox -50 -50 100 100)
 *   earthDisc({d})                       the Earth: tealSoft ocean, the Americas + Greenland in teal, teal rim, a cloud swirl
 *   moonDisc({d})                        the (full) Moon as a BODY: white disc, teal rim, 3 grid craters
 *   sunEdge({side, w, h, depth})         the Sun cut by the box edge (F3), px viewBox
 *   earthTop({r, sunDir, pins})          the Earth seen from above the North Pole with numbered pins (F3)
 *   orbitDisc({d, n})                    one numbered orbit slot (F4), identical for every n
 *
 * Every body stamps data-lcs-body; each disc element stamps data-lcs-part="disc"
 * so a gate can measure its rendered diameter. Rims are 3 px on paper at every
 * size (vector-effect: non-scaling-stroke) — the design gives the Earth's rim in
 * px; the Moon's rim and craters use the same rule so a 26 px Moon keeps a
 * printable line (deviation recorded in the build report).
 */
'use strict';
const T = require('./_tokens.js');
const { svgRoot, el, esc } = require('./_svg.js');

const C = T.color;
const NS = 'non-scaling-stroke';
const f2 = (x) => Math.round(x * 100) / 100;

function sunDisc({ d, discR = 27.8 } = {}) {
  if (!(d > 0)) throw new Error(`sky-bodies sunDisc: d ${d}`);
  if (!(discR > 0 && discR + 7.4 < 48)) throw new Error(`sky-bodies sunDisc: discR ${discR} leaves no room for the rays`);
  const rays = [];
  const capR = 3.7 / 2;
  for (let k = 0; k < 8; k++) {
    const a = k * Math.PI / 4;
    const r0 = discR + 7.4, r1 = 50 - capR;   // the round cap ends ON r 50 (never clipped by the box)
    rays.push(el('line', { x1: f2(r0 * Math.cos(a)), y1: f2(r0 * Math.sin(a)), x2: f2(r1 * Math.cos(a)), y2: f2(r1 * Math.sin(a)), stroke: C.coral, 'stroke-width': 3.7, 'stroke-linecap': 'round', 'data-lcs-part': 'ray' }));
  }
  const parts = [el('circle', { cx: 0, cy: 0, r: discR, fill: C.coral, 'data-lcs-part': 'disc' }), ...rays];
  return { svg: svgRoot({ width: d, height: d, viewBox: '-50 -50 100 100', label: '' }, parts, { 'data-lcs-prim': 'sky-body', 'data-lcs-body': 'sun', 'data-lcs-discr': discR }), width: d, height: d, discPx: 2 * discR * d / 100 };
}

/**
 * The Earth as a child knows it from a globe: the AMERICAS facing us (a
 * simplified orthographic view centred near 75° W 15° N, loosely traced from
 * real outlines: Alaska, Hudson Bay, Florida, the Gulf, the Central-American
 * neck, Brazil's bulge, the Patagonian tip) + Greenland, teal land on a
 * tealSoft ocean (greyscale L ~90 vs ~232), one thin white cloud swirl over the
 * Pacific. Replaced the design's two "land blobs" (coordinator review
 * 2026-09-23: they read as footprints / a face). Shared with planets.js.
 */
const LAND = [
  // North America
  'M -40 -22 L -36 -30 L -28 -34 L -20 -33 L -14 -36 L -6 -37 L -2 -33 L -8 -29 L -4 -26 L 2 -30 L 8 -27 L 10 -21 ' +
  'L 6 -17 L 3 -12 L 5 -7 L 3 -5 L 0 -9 L -5 -8 L -8 -4 L -6 1 L -2 3 L 1 7 L -2 8 L -7 3 L -12 -2 ' +
  'L -17 -7 L -22 -10 L -27 -14 L -32 -16 L -37 -17 Z',
  // South America
  'M 2 9 L 8 7 L 14 9 L 21 12 L 26 16 L 24 22 L 19 26 L 15 31 L 10 36 L 7 42 L 4 40 L 4 33 L 2 26 L -1 20 L -2 14 Z',
  // Greenland
  'M 12 -41 L 21 -42 L 24 -37 L 19 -31 L 14 -33 L 11 -37 Z',
];
const CLOUD = 'M -40 12 Q -32 6 -24 12 Q -20 15 -16 12';
let _clipN = 0;
function earthDisc({ d } = {}) {
  if (!(d > 0)) throw new Error(`sky-bodies earthDisc: d ${d}`);
  const cid = 'es-earth-clip-' + (++_clipN);
  const parts = [
    el('defs', {}, el('clipPath', { id: cid }, el('circle', { cx: 0, cy: 0, r: 45 }))),
    el('circle', { cx: 0, cy: 0, r: 46, fill: C.tealSoft, 'data-lcs-part': 'disc' }),
    el('g', { 'clip-path': `url(#${cid})` }, [...LAND.map((dd) => el('path', { d: dd, fill: C.teal, stroke: C.teal, 'stroke-width': 1.5, 'stroke-linejoin': 'round', 'data-lcs-part': 'land' })),
      el('path', { d: CLOUD, fill: 'none', stroke: C.white, 'stroke-width': 2, 'stroke-linecap': 'round', 'vector-effect': NS, 'data-lcs-part': 'cloud' })]),
    el('circle', { cx: 0, cy: 0, r: 46, fill: 'none', stroke: C.teal, 'stroke-width': 3, 'vector-effect': NS, 'data-lcs-part': 'rim' }),
  ];
  return { svg: svgRoot({ width: d, height: d, viewBox: '-50 -50 100 100', label: '' }, parts, { 'data-lcs-prim': 'sky-body', 'data-lcs-body': 'earth' }), width: d, height: d, discPx: 92 * d / 100 };
}

function moonDisc({ d } = {}) {
  if (!(d > 0)) throw new Error(`sky-bodies moonDisc: d ${d}`);
  const crater = (cx, cy, r) => el('circle', { cx, cy, r, fill: 'none', stroke: C.grid, 'stroke-width': 1.5, 'vector-effect': NS, 'data-lcs-part': 'crater' });
  const parts = [
    el('circle', { cx: 0, cy: 0, r: 46, fill: C.white, 'data-lcs-part': 'disc' }),
    crater(-14, -12, 9), crater(16, 6, 12), crater(-6, 22, 6),
    el('circle', { cx: 0, cy: 0, r: 46, fill: 'none', stroke: C.teal, 'stroke-width': 3, 'vector-effect': NS, 'data-lcs-part': 'rim' }),
  ];
  return { svg: svgRoot({ width: d, height: d, viewBox: '-50 -50 100 100', label: '' }, parts, { 'data-lcs-prim': 'sky-body', 'data-lcs-body': 'moon' }), width: d, height: d, discPx: 92 * d / 100 };
}

/** The Sun cut by the box edge: its disc much bigger than the box, a limb and 5 rays showing (F3). */
function sunEdge({ side = 'left', w, h, depth } = {}) {
  if (side !== 'left' && side !== 'right') throw new Error(`sky-bodies sunEdge: side "${side}"`);
  if (!(depth >= 60)) throw new Error(`sky-bodies sunEdge: depth ${depth} < 60`);
  if (!(w > depth && h > 0)) throw new Error(`sky-bodies sunEdge: box ${w}x${h} for depth ${depth}`);
  const R = f2(Math.max(h, (h * h / 4 + depth * depth) / (2 * depth)) + 20);
  const cxL = depth - R, cy = h / 2;
  const cx = side === 'left' ? cxL : w - cxL;
  const nx = side === 'left' ? 1 : -1;
  const cid = 'es-sunedge-clip-' + (++_clipN);
  const rays = [-40, -20, 0, 20, 40].map((deg) => {
    const a = deg * Math.PI / 180;
    const ux = nx * Math.cos(a), uy = Math.sin(a);
    return el('line', { x1: f2(cx + ux * (R + 10)), y1: f2(cy + uy * (R + 10)), x2: f2(cx + ux * (R + 30)), y2: f2(cy + uy * (R + 30)), stroke: C.coral, 'stroke-width': 4, 'stroke-linecap': 'round', 'data-lcs-part': 'ray' });
  });
  const parts = [
    el('defs', {}, el('clipPath', { id: cid }, el('rect', { x: 0, y: 0, width: w, height: h }))),
    el('g', { 'clip-path': `url(#${cid})` }, [el('circle', { cx: f2(cx), cy, r: R, fill: C.coral, 'data-lcs-part': 'disc' }), ...rays]),
  ];
  return { svg: svgRoot({ width: w, height: h, label: '' }, parts, { 'data-lcs-prim': 'sun-edge', 'data-lcs-body': 'sun', 'data-lcs-side': side, 'data-lcs-r': R }), width: w, height: h, R, cx, cy };
}

/**
 * The Earth from above the North Pole (F3). White disc (nothing suggests a lit
 * half), pole dot, a counter-clockwise rotation arrow, numbered coral pins.
 * pin angle: 0° = the rim point facing the Sun, positive counter-clockwise on
 * screen; day iff |angle| < 90. THROWS if a pin is within 40° of the terminator
 * (| |angle| - 90 | < 40), two pin centres are < 50 px apart, or r < 120.
 */
function earthTop({ r, sunDir = 'left', pins = [] } = {}) {
  if (!(r >= 120)) throw new Error(`sky-bodies earthTop: r ${r} < 120`);
  if (sunDir !== 'left' && sunDir !== 'right') throw new Error(`sky-bodies earthTop: sunDir "${sunDir}"`);
  const S = 2 * r + 40, Cc = r + 20;
  const sunPhi = sunDir === 'left' ? 180 : 0;   // screen math angle (counter-clockwise, y up) of the direction to the Sun
  const pos = (angle, rad) => { const p = (sunPhi + angle) * Math.PI / 180; return [Cc + rad * Math.cos(p), Cc - rad * Math.sin(p)]; };
  const norm = (a) => { let x = ((a % 360) + 360) % 360; if (x > 180) x -= 360; return x; };
  const placed = pins.map((p) => {
    const a = norm(p.angle);
    if (Math.abs(Math.abs(a) - 90) < 40) throw new Error(`sky-bodies earthTop: pin ${p.n} at ${a}° is within 40° of the day/night line`);
    const [x, y] = pos(a, 0.8 * r);
    return { n: p.n, angle: a, x, y };
  });
  for (let i = 0; i < placed.length; i++) for (let j = i + 1; j < placed.length; j++) {
    const dd = Math.hypot(placed[i].x - placed[j].x, placed[i].y - placed[j].y);
    if (dd < 50) throw new Error(`sky-bodies earthTop: pins ${placed[i].n} and ${placed[j].n} are ${dd.toFixed(1)} px apart (< 50)`);
  }
  // rotation arrow: radius 0.32 r, screen angle 200° -> 340° through 270° (the bottom), counter-clockwise on screen (sweep 0)
  const ar = 0.32 * r;
  const [x0, y0] = [Cc + ar * Math.cos(200 * Math.PI / 180), Cc - ar * Math.sin(200 * Math.PI / 180)];
  const [x1, y1] = [Cc + ar * Math.cos(340 * Math.PI / 180), Cc - ar * Math.sin(340 * Math.PI / 180)];
  // travel direction at 340° going counter-clockwise (increasing math angle): tangent (-sin, cos) in math coords -> screen (-sin, -cos)
  const t = 340 * Math.PI / 180;
  const tx = -Math.sin(t), ty = -Math.cos(t);
  const nx = -ty, ny = tx;
  const head = `M ${f2(x1 + tx * 10)} ${f2(y1 + ty * 10)} L ${f2(x1 - tx * 2 + nx * 6)} ${f2(y1 - ty * 2 + ny * 6)} L ${f2(x1 - tx * 2 - nx * 6)} ${f2(y1 - ty * 2 - ny * 6)} Z`;
  const parts = [
    el('circle', { cx: Cc, cy: Cc, r, fill: C.white, stroke: C.teal, 'stroke-width': 3, 'data-lcs-part': 'disc' }),
    el('path', { d: `M ${f2(x0)} ${f2(y0)} A ${f2(ar)} ${f2(ar)} 0 0 0 ${f2(x1)} ${f2(y1)}`, fill: 'none', stroke: C.teal, 'stroke-width': 3, 'stroke-linecap': 'round', 'data-lcs-part': 'spin' }),
    el('path', { d: head, fill: C.teal, 'data-lcs-part': 'spin-head' }),
    el('circle', { cx: Cc, cy: Cc, r: 5, fill: C.teal, 'data-lcs-part': 'pole' }),
    ...placed.map((p) => el('g', { 'data-lcs-pin': '', 'data-lcs-n': p.n, 'data-lcs-angle': p.angle }, [
      el('circle', { cx: f2(p.x), cy: f2(p.y), r: 17, fill: 'none', stroke: C.white, 'stroke-width': 4 }),
      el('circle', { cx: f2(p.x), cy: f2(p.y), r: 14, fill: C.coral, 'data-lcs-part': 'pin' }),
      el('text', { x: f2(p.x), y: f2(p.y), 'font-family': "'Baloo 2', sans-serif", 'font-weight': 700, 'font-size': 16, fill: C.white, 'text-anchor': 'middle', 'dominant-baseline': 'central' }, esc(String(p.n))),
    ])),
  ];
  return { svg: svgRoot({ width: S, height: S, label: '' }, parts, { 'data-lcs-prim': 'earth-top', 'data-lcs-body': 'earth', 'data-lcs-sundir': sunDir, 'data-lcs-r': r }), width: S, height: S, pins: placed, centre: [Cc, Cc] };
}

/** One orbit slot (F4): the same white disc + teal ring for every planet; only the numeral differs. */
function orbitDisc({ d, n } = {}) {
  if (!(d >= 36)) throw new Error(`sky-bodies orbitDisc: d ${d} < 36`);
  const c = d / 2;
  const parts = [
    el('circle', { cx: c, cy: c, r: f2(c - 1.5), fill: C.white, stroke: C.teal, 'stroke-width': 3, 'data-lcs-part': 'disc' }),
    el('text', { x: c, y: c, 'font-family': "'Baloo 2', sans-serif", 'font-weight': 700, 'font-size': 18, fill: C.ink, 'text-anchor': 'middle', 'dominant-baseline': 'central' }, esc(String(n))),
  ];
  return { svg: svgRoot({ width: d, height: d, label: '' }, parts, { 'data-lcs-prim': 'orbit-disc', 'data-lcs-slot': n }), width: d, height: d };
}

module.exports = { EARTH_LAND: LAND, EARTH_CLOUD: CLOUD, sunDisc, earthDisc, moonDisc, sunEdge, earthTop, orbitDisc };
