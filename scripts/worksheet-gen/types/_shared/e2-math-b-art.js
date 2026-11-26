/**
 * e2-math-b-art.js — the drawings of Batch DE-B (Daily Teaching System Stage E-2, 2026-11-26; German mathematics
 * Klasse 3, types G3-633 .. G3-646, factory e2-math-b.js). Every drawing is an <svg data-lcs-prim="sk-art"> (the page
 * lint leaves its colours to this batch's gate, qa/verify-e2-de-b.js, which holds every colour this file writes to
 * PAL_E2B).
 *
 *   euro money       the cent and euro coins in the euro's colours (1, 2, 5 ct copper; 10, 20, 50 ct gold; 1 € silver
 *                    centre and gold ring; 2 € gold centre and silver ring), in the ORDER of their real sizes, the value
 *                    large inside; no motif, not at real size (E-1's play-money rule). The notes are E-1's (e1-math-art).
 *   base ten         Zehnerstangen, Einerwürfel and Hunderterplatten (G3-635, G3-637), optionally split by a dashed line
 *   dot field        a Punktefeld of a rows x b columns, a gap after every tenth column, split at the tens (G3-636)
 *   REAL SIZE        a millimetre ruler (10 cm), lines of a whole number of millimetres with end marks, a paper clip, an
 *                    eraser, a screw and a short pencil drawn to a whole number of millimetres (G3-638); centre marks,
 *                    model circles and the seven-circle flower (G3-644). 96 px to the inch: printed at 100 % (A4, no
 *                    shrink) every length is the length it says. Each role draws in its OWN ink (REAL_*) so the gate
 *                    finds it in the PDF and measures it there.
 *   town map         five places joined by roads with their lengths in metres (G3-639)
 *   tape measure     a strip of a Maßband with a mark at every centimetre and an arrow at the length (G3-640)
 *   charts           a bar chart (from 0 or from a raised start) and a picture chart (G3-645)
 *   clothes          a T-shirt and trousers in a colour, an outline outfit to colour (G3-646); a tree diagram
 * Pure functions; nothing here reads a picture or the cache while the module loads.
 */
'use strict';
const TOK = require('../../primitives/_tokens.js');
const E1 = require('./e1-math-art.js');

const T = TOK.color;
const { f1, esc, text, artSvg } = E1;
const PX_MM = 96 / 25.4;   // the page's millimetre: 96 px to the inch

/** every colour this file writes (the gate scans the source for hex values and refuses any other) */
const COPPER = '#D69A6B', COPPER_DARK = '#8E4E24', GOLD = '#E8C462', GOLD_DARK = '#A07D1C', SILVER = '#D9DEE4', METAL_DARK = '#5F6873';
const ROAD = '#EDE5D6', GRASS = '#E6F0DD', WATER = '#BFDDF0', WATER_DARK = '#4A86B5', TAPE = '#F7E39A', TAPE_DARK = '#B8902A';
const REAL_TICK = '#2B2724', REAL_LINE = '#1F1B18', REAL_THING = '#36302A', REAL_CIRCLE = '#0F5A4E', REAL_MODEL = '#2F5D8C', REAL_CENTRE = '#C24E2A';
const CLOTH = { rot: '#E35B4C', blau: '#4A7FC1', gelb: '#F2C84B', gruen: '#5DAA5A' };
const PAL_E2B = new Set([T.cream, T.creamDeep, T.teal, T.tealSoft, T.coral, T.coralSoft, T.ink, T.inkSoft, T.white, T.grid,
  COPPER, COPPER_DARK, GOLD, GOLD_DARK, SILVER, METAL_DARK, ROAD, GRASS, WATER, WATER_DARK, TAPE, TAPE_DARK,
  REAL_TICK, REAL_LINE, REAL_THING, REAL_CIRCLE, REAL_MODEL, REAL_CENTRE, ...Object.values(CLOTH)].map((c) => c.toUpperCase()));
const REAL_INK = { tick: REAL_TICK, line: REAL_LINE, thing: REAL_THING, circle: REAL_CIRCLE, model: REAL_MODEL, centre: REAL_CENTRE };

/* ================================================================ euro money */
/** real diameters in mm (only their ORDER is drawn: a 10-cent coin is smaller than a 5-cent coin) */
const COIN_MM = { 1: 16.25, 2: 18.75, 5: 21.25, 10: 19.75, 20: 22.25, 50: 24.25, 100: 23.25, 200: 25.75 };
const coinLabel = (c) => (c >= 100 ? `${c / 100} €` : `${c} ct`);
/** what a coin shows: a euro coin its value and €, a cent coin its number alone and large (as on the real coin, where
 *  the numeral fills the face; copper and gold say "cent", and "1 ct" squeezed into a 6-mm coin was not legible) */
const coinFace = (c) => (c >= 100 ? `${c / 100} €` : String(c));
/** a coin of c cents; d2 = the drawn diameter of the 2-euro coin (the largest) */
function euroCoin(c, d2 = 44) {
  const d = Math.round(d2 * COIN_MM[c] / COIN_MM[200]), r = d / 2;
  const look = c <= 5 ? { ring: COPPER, centre: COPPER, edge: COPPER_DARK } : c <= 50 ? { ring: GOLD, centre: GOLD, edge: GOLD_DARK } : c === 100 ? { ring: GOLD, centre: SILVER, edge: GOLD_DARK } : { ring: SILVER, centre: GOLD, edge: METAL_DARK };
  const s = coinFace(c), fs = c >= 100 ? Math.max(10, Math.round(d * 0.33)) : Math.max(11, Math.round(d * (s.length > 1 ? 0.46 : 0.5)));
  return artSvg(`<circle cx="${f1(r)}" cy="${f1(r)}" r="${f1(r - 1.3)}" fill="${look.ring}" stroke="${look.edge}" stroke-width="2.2"/>` +
    `<circle cx="${f1(r)}" cy="${f1(r)}" r="${f1(r - 5)}" fill="${look.centre}" stroke="${look.edge}" stroke-width="1"/>` +
    text(r, r + 0.5, s, fs, { attrs: 'data-e2b-coinlabel="1"' }), d, d, `data-e2b-coin="${c}" role="img" aria-label="${esc(coinLabel(c))}"`);
}
/** a play note (E-1's): 5, 10 or 20 euros, h px high */
const euroNote = (v, h = 26) => E1.note('EUR', v, h).replace('<svg ', `<svg data-e2b-note="${v * 100}" `);

/* ================================================================ base ten (Zehnerstange, Einerwürfel, Hunderterplatte) */
/**
 * the number n as plates, rods and cubes (s = the side of one small cube). split (optional) = the value of the LEFT part
 * (a whole number of tens): a dashed coral line between the two parts, the left part drawn with hundreds and tens only.
 */
function baseTen(n, { s = 6, split = null, attrs = '' } = {}) {
  const parts = split == null ? [n] : [split, n - split];
  let b = '', x = 0;
  const H = 10 * s;
  const cubeCol = (k, x0) => { let o = ''; for (let i = 0; i < k; i++) { const cx = x0 + Math.floor(i / 5) * (s + 3), cy = H - (i % 5 + 1) * (s + 1); o += `<rect x="${f1(cx)}" y="${f1(cy)}" width="${s}" height="${s}" fill="${T.coralSoft}" stroke="${T.coral}" stroke-width="1" data-e2b-cube="1"/>`; } return o; };
  parts.forEach((v, pi) => {
    if (pi === 1) { b += `<line x1="${f1(x + 2)}" y1="-4" x2="${f1(x + 2)}" y2="${H + 4}" stroke="${T.coral}" stroke-width="2.2" stroke-dasharray="4 3" data-e2b-splitline="1"/>`; x += 7; }
    const h = Math.floor(v / 100), z = Math.floor(v / 10) % 10, e = v % 10;
    for (let i = 0; i < h; i++) {
      let g = `<rect x="${f1(x)}" y="0" width="${10 * s}" height="${H}" fill="${T.tealSoft}" stroke="${T.teal}" stroke-width="1.4"/>`;
      for (let k = 1; k < 10; k++) g += `<line x1="${f1(x + k * s)}" y1="0" x2="${f1(x + k * s)}" y2="${H}" stroke="${T.teal}" stroke-width="0.6"/><line x1="${f1(x)}" y1="${f1(k * s)}" x2="${f1(x + 10 * s)}" y2="${f1(k * s)}" stroke="${T.teal}" stroke-width="0.6"/>`;
      b += `<g data-e2b-plate="1">${g}</g>`; x += 10 * s + 4;
    }
    for (let i = 0; i < z; i++) {
      let g = `<rect x="${f1(x)}" y="0" width="${s}" height="${H}" fill="${T.tealSoft}" stroke="${T.teal}" stroke-width="1.2"/>`;
      for (let k = 1; k < 10; k++) g += `<line x1="${f1(x)}" y1="${f1(k * s)}" x2="${f1(x + s)}" y2="${f1(k * s)}" stroke="${T.teal}" stroke-width="0.6"/>`;
      b += `<g data-e2b-rod="1">${g}</g>`; x += s + 3;
    }
    if (e) { b += cubeCol(e, x); x += (e > 5 ? 2 * (s + 3) : s + 3); }
  });
  return artSvg(b, Math.max(x, 4), H, `data-e2b-art="blocks" data-e2b-n="${n}"${split != null ? ` data-e2b-split="${split}"` : ''}${attrs ? ' ' + attrs : ''}`, `-1 -5 ${f1(Math.max(x, 4) + 2)} ${H + 10}`);
}
/** groups of tens rods: g groups of k rods each, each group in a rounded frame (3 · 40: 3 groups of 4 rods) */
function rodGroups(g, k, { s = 5, attrs = '' } = {}) {
  const H = 10 * s, gw = k * (s + 3) + 7;
  let b = '';
  for (let i = 0; i < g; i++) {
    const x0 = i * (gw + 8);
    b += `<rect x="${f1(x0)}" y="0" width="${f1(gw)}" height="${H + 8}" rx="6" fill="none" stroke="${T.coral}" stroke-width="1.8" data-e2b-group="1"/>`;
    for (let j = 0; j < k; j++) {
      const x = x0 + 5 + j * (s + 3);
      let r = `<rect x="${f1(x)}" y="4" width="${s}" height="${H}" fill="${T.tealSoft}" stroke="${T.teal}" stroke-width="1.1"/>`;
      for (let q = 1; q < 10; q++) r += `<line x1="${f1(x)}" y1="${f1(4 + q * s)}" x2="${f1(x + s)}" y2="${f1(4 + q * s)}" stroke="${T.teal}" stroke-width="0.5"/>`;
      b += `<g data-e2b-rod="1">${r}</g>`;
    }
  }
  const W = g * (gw + 8) - 8;
  return artSvg(b, W, H + 8, `data-e2b-art="rod-groups" data-e2b-g="${g}" data-e2b-k="${k}"${attrs ? ' ' + attrs : ''}`);
}

/* ================================================================ the dot field (G3-636) */
/**
 * a Punktefeld: a rows of b dots, a small gap after every fifth column and a bigger one after every tenth, a coral line
 * at the tens (between column 10z and 10z + 1). Returns the svg and where the two parts' middles lie (for the boxes above).
 */
function dotField(a, b, { pitch = 6, r = 2.1 } = {}) {
  const z = Math.floor(b / 10) * 10;
  const colX = (c) => 4 + c * pitch + Math.floor(c / 5) * 2 + Math.floor(c / 10) * 2 + (c >= z ? 6 : 0);
  let s = '';
  for (let i = 0; i < a; i++) for (let c = 0; c < b; c++) s += `<circle cx="${f1(colX(c))}" cy="${f1(4 + i * pitch)}" r="${r}" fill="${c < z ? T.teal : T.coral}"/>`;
  const xs = (colX(z - 1) + colX(z)) / 2, w = colX(b - 1) + 5, h = 8 + (a - 1) * pitch;
  s += `<line x1="${f1(xs)}" y1="-1" x2="${f1(xs)}" y2="${f1(h + 1)}" stroke="${T.coral}" stroke-width="2" data-e2b-fieldsplit="1"/>`;
  return { svg: artSvg(s, w, h, `data-e2b-art="dot-field" data-e2b-rows="${a}" data-e2b-cols="${b}" data-e2b-z="${z}"`), w, h, left: (colX(0) + colX(z - 1)) / 2, right: (colX(z) + colX(b - 1)) / 2 };
}

/* ================================================================ REAL SIZE (G3-638, G3-644) */
/** a 10-cm millimetre ruler at its real size: a tick every mm (5 mm longer, cm longest), the cm numbered */
function mmRuler(cm = 10) {
  const pad = 16, L = cm * 10 * PX_MM, W = L + 2 * pad, H = 50;
  let b = `<rect x="1" y="1" width="${f1(W - 2)}" height="${H - 2}" rx="5" fill="${T.white}" stroke="${T.teal}" stroke-width="2"/>`;
  for (let i = 0; i <= cm * 10; i++) {
    const x = pad + i * PX_MM, len = i % 10 === 0 ? 17 : i % 5 === 0 ? 12 : 8;
    b += `<line x1="${x.toFixed(3)}" y1="2" x2="${x.toFixed(3)}" y2="${2 + len}" stroke="${REAL_TICK}" stroke-width="${i % 10 === 0 ? 1.2 : 0.8}" data-e2b-tick="${i}"/>`;
    if (i % 10 === 0) b += text(x, 30, String(i / 10), 13, { attrs: `data-e2b-cmnum="${i / 10}"` });
  }
  b += text(W - 14, 41, 'cm', 10, { fill: T.inkSoft });
  return artSvg(b, W, H, `data-e2b-art="mm-ruler" data-e2b-cm="${cm}" data-e2b-zero="${pad}"`);
}
/** a line of len mm at its real size: a stroke from the start mark to the end mark; the end marks are short uprights */
function mmLine(len, { pad = 6, h = 22, attrs = '' } = {}) {
  const L = len * PX_MM, W = L + 2 * pad, y = h / 2;
  const b = `<line x1="${pad.toFixed(3)}" y1="${y}" x2="${(pad + L).toFixed(3)}" y2="${y}" stroke="${REAL_LINE}" stroke-width="1.8" stroke-linecap="butt" data-e2b-seg="1"/>` +
    `<line x1="${pad.toFixed(3)}" y1="${y - 7}" x2="${pad.toFixed(3)}" y2="${y + 7}" stroke="${REAL_LINE}" stroke-width="1" data-e2b-endmark="0"/>` +
    `<line x1="${(pad + L).toFixed(3)}" y1="${y - 7}" x2="${(pad + L).toFixed(3)}" y2="${y + 7}" stroke="${REAL_LINE}" stroke-width="1" data-e2b-endmark="1"/>`;
  return artSvg(b, W, h, `data-e2b-art="mm-line" data-e2b-mm="${len}" data-e2b-pad="${pad}"${attrs ? ' ' + attrs : ''}`);
}
/** the start point of a line the child draws, with room for len mm (and a little more) to its right */
function startPoint(roomMm, { h = 22 } = {}) {
  const W = roomMm * PX_MM + 16;
  return artSvg(`<circle cx="6" cy="${h / 2}" r="3.2" fill="${REAL_CENTRE}" data-e2b-start="1"/>`, W, h, `data-e2b-art="start-point" data-e2b-room="${roomMm}"`);
}
/**
 * a small thing at its real size, len mm from its left end to its right end (the ink, stroke included). The path's own
 * extremes lie half a stroke inside, so the ink reaches exactly len mm (the gate measures the path in the PDF and adds the
 * stroke). sw = the stroke in px.
 */
const THING_SW = 1.4;
function realThing(id, len) {
  const sw = THING_SW, L = len * PX_MM - sw, o = sw / 2;   // L: the path's own length; o: its inset from the ink
  let body = '', h;
  if (id === 'klammer') {
    // a paper clip: the outer loop (left, radius H/2), the right loop, the inner loop
    const H = Math.min(9 * PX_MM, L * 0.3); h = H + sw + 2;
    const u = (x) => o + x, v = (y) => o + 1 + y * H;
    // each arc a half circle between its two ends: its radius given a hair SHORT of half the ends' distance, so the
    // renderer takes exactly half of it (a radius rounded a hair too long would draw a flatter arc that misses the ink's end)
    const R1 = 0.42 * H, r2 = 0.29 * H, q = 0.97;
    body = `<path d="M${f1(u(L - 0.9 * H))} ${f1(v(0))} L${f1(u(0.5 * H))} ${f1(v(0))} A${f1(q * 0.5 * H)} ${f1(q * 0.5 * H)} 0 0 0 ${f1(u(0.5 * H))} ${f1(v(1))} L${f1(u(L - R1))} ${f1(v(1))} A${f1(q * R1)} ${f1(q * R1)} 0 0 0 ${f1(u(L - R1))} ${f1(v(0.16))} L${f1(u(0.62 * H))} ${f1(v(0.16))} A${f1(q * r2)} ${f1(q * r2)} 0 0 0 ${f1(u(0.62 * H))} ${f1(v(0.74))} L${f1(u(L - 1.0 * H))} ${f1(v(0.74))}" fill="none" stroke="${REAL_THING}" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round" data-e2b-outline="1"/>`;
  } else if (id === 'radierer') {
    const H = 17 * PX_MM; h = H + sw + 2;
    const x0 = o, y0 = o + 1;
    body = `<rect x="${f1(x0)}" y="${f1(y0)}" width="${f1(L)}" height="${f1(H)}" rx="5" fill="${T.coralSoft}" stroke="${REAL_THING}" stroke-width="${sw}" data-e2b-outline="1"/>` +
      `<rect x="${f1(x0 + L * 0.3)}" y="${f1(y0)}" width="${f1(L * 0.62)}" height="${f1(H)}" fill="${T.tealSoft}" stroke="${REAL_THING}" stroke-width="${sw}"/>`;
  } else if (id === 'schraube') {
    const H = 7 * PX_MM, hw = 3 * PX_MM, sh = 3.2 * PX_MM, tip = 5 * PX_MM; h = H + sw + 2;
    const yc = o + 1 + H / 2, x0 = o;
    // the head (side view of a countersunk head), the shaft with its thread, the point
    body = `<path d="M${f1(x0)} ${f1(yc - H / 2)} L${f1(x0 + hw)} ${f1(yc - sh / 2)} L${f1(x0 + L - tip)} ${f1(yc - sh / 2)} L${f1(x0 + L)} ${f1(yc)} L${f1(x0 + L - tip)} ${f1(yc + sh / 2)} L${f1(x0 + hw)} ${f1(yc + sh / 2)} L${f1(x0)} ${f1(yc + H / 2)} Z" fill="${SILVER}" stroke="${REAL_THING}" stroke-width="${sw}" stroke-linejoin="round" data-e2b-outline="1"/>`;
    for (let x = x0 + hw + 5; x < x0 + L - tip - 2; x += 5) body += `<line x1="${f1(x)}" y1="${f1(yc - sh / 2)}" x2="${f1(x + 3)}" y2="${f1(yc + sh / 2)}" stroke="${REAL_THING}" stroke-width="0.8"/>`;
  } else if (id === 'bleistift') {
    const H = 7.5 * PX_MM, cone = 9 * PX_MM, lead = 2.5 * PX_MM; h = H + sw + 2;
    const yc = o + 1 + H / 2, x0 = o, xb = x0 + L - cone;
    body = `<path d="M${f1(x0)} ${f1(yc - H / 2)} L${f1(xb)} ${f1(yc - H / 2)} L${f1(x0 + L)} ${f1(yc)} L${f1(xb)} ${f1(yc + H / 2)} L${f1(x0)} ${f1(yc + H / 2)} Z" fill="${GOLD}" stroke="${REAL_THING}" stroke-width="${sw}" stroke-linejoin="round" data-e2b-outline="1"/>` +
      `<path d="M${f1(xb)} ${f1(yc - H / 2)} L${f1(x0 + L)} ${f1(yc)} L${f1(xb)} ${f1(yc + H / 2)} Z" fill="${TAPE}" stroke="${REAL_THING}" stroke-width="${sw * 0.7}" stroke-linejoin="round"/>` +
      `<path d="M${f1(x0 + L - lead)} ${f1(yc - H * lead / cone / 2)} L${f1(x0 + L)} ${f1(yc)} L${f1(x0 + L - lead)} ${f1(yc + H * lead / cone / 2)} Z" fill="${T.ink}" stroke="none"/>` +
      `<line x1="${f1(x0)}" y1="${f1(yc)}" x2="${f1(xb)}" y2="${f1(yc)}" stroke="${GOLD_DARK}" stroke-width="0.8"/>`;
  } else throw new Error('realThing: ' + id);
  return artSvg(body, len * PX_MM, h, `data-e2b-art="real-thing" data-e2b-thing="${id}" data-e2b-mm="${len}" data-e2b-sw="${sw}"`);
}
/** a centre point M for the child's circle: a small cross and the letter M */
const centreMark = (x, y, label = 'M') => `<g data-e2b-centre="1" data-e2b-cx="${f1(x)}" data-e2b-cy="${f1(y)}"><line x1="${f1(x - 5)}" y1="${f1(y - 5)}" x2="${f1(x + 5)}" y2="${f1(y + 5)}" stroke="${REAL_CENTRE}" stroke-width="1.6"/><line x1="${f1(x - 5)}" y1="${f1(y + 5)}" x2="${f1(x + 5)}" y2="${f1(y - 5)}" stroke="${REAL_CENTRE}" stroke-width="1.6"/>` + (label ? text(x + 11, y - 8, label, 13, { fill: REAL_CENTRE }) : '') + '</g>';
/** a circle drawn true (radius in mm) in the given role's ink */
const realCircle = (cx, cy, rMm, role = 'circle', attrs = '') => `<circle cx="${cx.toFixed(3)}" cy="${cy.toFixed(3)}" r="${(rMm * PX_MM).toFixed(3)}" fill="none" stroke="${REAL_INK[role]}" stroke-width="1.3" data-e2b-circle="${role}" data-e2b-rmm="${rMm}"${attrs ? ' ' + attrs : ''}/>`;
/** the seven-circle flower: the middle circle and six around it, each centred on the middle circle at 60-degree steps */
function flowerCentres(cx, cy, rPx) { return [[cx, cy]].concat(Array.from({ length: 6 }, (_, k) => [cx + rPx * Math.cos(k * Math.PI / 3), cy - rPx * Math.sin(k * Math.PI / 3)])); }

/* ================================================================ the town map (G3-639) */
/**
 * places: [{ id, name, x, y, icon }], roads: [{ a, b, m }] (m = the length in metres printed on the road). A road is a
 * wide pale band with a dark edge; its length sits on a white label at its middle. The icons are drawn (a school, a
 * pretzel sign, a slide, waves, a train); the names under them.
 */
function townMap({ w, h, places, roads }) {
  let b = `<rect x="0" y="0" width="${w}" height="${h}" rx="10" fill="${GRASS}" stroke="${T.grid}" stroke-width="1.5"/>`;
  const P = Object.fromEntries(places.map((p) => [p.id, p]));
  for (const r of roads) { const A = P[r.a], B = P[r.b]; b += `<line x1="${f1(A.x)}" y1="${f1(A.y)}" x2="${f1(B.x)}" y2="${f1(B.y)}" stroke="${T.grid}" stroke-width="15" stroke-linecap="round"/><line x1="${f1(A.x)}" y1="${f1(A.y)}" x2="${f1(B.x)}" y2="${f1(B.y)}" stroke="${ROAD}" stroke-width="11" stroke-linecap="round" data-e2b-road="${r.a}-${r.b}" data-e2b-m="${r.m}"/>`; }
  // each length on its road, where it covers no place and no other length (tried from the middle outwards)
  const busy = places.map((p) => [{ l: p.x - 22, r: p.x + 22, t: p.y - 22, b: p.y + 22 }, { l: p.x - 49, r: p.x + 49, t: p.y + 15, b: p.y + 43 }]).flat();
  const hit = (q) => busy.some((z) => Math.min(q.r, z.r) - Math.max(q.l, z.l) > 0 && Math.min(q.b, z.b) - Math.max(q.t, z.t) > 0);
  for (const r of roads) {
    const A = P[r.a], B = P[r.b], s = `${r.m} m`, lw = 9 * s.length + 10;
    let mx = (A.x + B.x) / 2, my = (A.y + B.y) / 2;
    for (const tt of [0.5, 0.43, 0.57, 0.36, 0.64, 0.3, 0.7]) { const x = A.x + tt * (B.x - A.x), y = A.y + tt * (B.y - A.y), q = { l: x - lw / 2, r: x + lw / 2, t: y - 11, b: y + 11 }; if (!hit(q)) { mx = x; my = y; busy.push(q); break; } }
    b += `<g data-e2b-roadlabel="${r.a}-${r.b}"><rect x="${f1(mx - lw / 2)}" y="${f1(my - 11)}" width="${f1(lw)}" height="22" rx="6" fill="${T.white}" stroke="${T.teal}" stroke-width="1.6"/>` + text(mx, my + 0.5, s, 14, { attrs: `data-e2b-roadm="${r.m}"` }) + '</g>';
  }
  for (const p of places) b += `<g data-e2b-place="${p.id}">${placeIcon(p.icon, p.x, p.y)}<rect x="${f1(p.x - 46)}" y="${f1(p.y + 18)}" width="92" height="22" rx="7" fill="${T.white}" stroke="${T.ink}" stroke-width="1.4"/>${text(p.x, p.y + 29.5, p.name, 14, { attrs: `data-e2b-placename="${esc(p.name)}"` })}</g>`;
  return artSvg(b, w, h, 'data-e2b-art="town-map"');
}
/** a drawn place sign, centred at (x, y), about 40 px */
function placeIcon(kind, x, y) {
  const o = (dx, dy) => `${f1(x + dx)} ${f1(y + dy)}`;
  const base = `<circle cx="${f1(x)}" cy="${f1(y)}" r="19" fill="${T.white}" stroke="${T.teal}" stroke-width="2"/>`;
  if (kind === 'schule') return base + `<path d="M${o(-11, 10)} L${o(-11, -3)} L${o(0, -12)} L${o(11, -3)} L${o(11, 10)} Z" fill="${T.coralSoft}" stroke="${T.ink}" stroke-width="1.5" stroke-linejoin="round"/><rect x="${f1(x - 3)}" y="${f1(y + 2)}" width="6" height="8" fill="${T.white}" stroke="${T.ink}" stroke-width="1.2"/><circle cx="${f1(x)}" cy="${f1(y - 4)}" r="2.6" fill="${GOLD}" stroke="${T.ink}" stroke-width="1"/>`;
  if (kind === 'baeckerei') return base + `<path d="M${o(-10, 6)} C${o(-16, -4)} ${o(-6, -14)} ${o(0, -4)} C${o(6, -14)} ${o(16, -4)} ${o(10, 6)} C${o(4, 12)} ${o(-4, 12)} ${o(-10, 6)} Z M${o(-6, 6)} L${o(4, -6)} M${o(6, 6)} L${o(-4, -6)}" fill="none" stroke="${COPPER_DARK}" stroke-width="3" stroke-linecap="round"/>`;
  if (kind === 'spielplatz') return base + `<path d="M${o(-12, 11)} L${o(-6, -11)} L${o(-2, -11)} L${o(-2, 11)} M${o(-2, -9)} C${o(6, -6)} ${o(6, 8)} ${o(13, 11)}" fill="none" stroke="${T.ink}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M${o(-6, -3)} L${o(-2, -3)} M${o(-8, 4)} L${o(-2, 4)}" stroke="${T.ink}" stroke-width="1.5"/>`;
  if (kind === 'schwimmbad') return base + `<path d="M${o(-13, 2)} q4 -4 8 0 t8 0 t8 0 M${o(-13, 8)} q4 -4 8 0 t8 0 t8 0" fill="none" stroke="${WATER_DARK}" stroke-width="2.4" stroke-linecap="round"/><circle cx="${f1(x + 3)}" cy="${f1(y - 9)}" r="3.5" fill="${COPPER}" stroke="${T.ink}" stroke-width="1"/><path d="M${o(-4, -5)} L${o(3, -5)}" stroke="${T.ink}" stroke-width="1.6" stroke-linecap="round"/>`;
  if (kind === 'bahnhof') return base + `<rect x="${f1(x - 11)}" y="${f1(y - 11)}" width="22" height="17" rx="4" fill="${T.tealSoft}" stroke="${T.ink}" stroke-width="1.5"/><rect x="${f1(x - 7)}" y="${f1(y - 7)}" width="6" height="5" fill="${T.white}" stroke="${T.ink}" stroke-width="1"/><rect x="${f1(x + 1)}" y="${f1(y - 7)}" width="6" height="5" fill="${T.white}" stroke="${T.ink}" stroke-width="1"/><circle cx="${f1(x - 6)}" cy="${f1(y + 8)}" r="2.6" fill="${T.ink}"/><circle cx="${f1(x + 6)}" cy="${f1(y + 8)}" r="2.6" fill="${T.ink}"/><line x1="${f1(x - 14)}" y1="${f1(y + 12)}" x2="${f1(x + 14)}" y2="${f1(y + 12)}" stroke="${T.ink}" stroke-width="1.5"/>`;
  throw new Error('placeIcon: ' + kind);
}

/* ================================================================ the tape measure (G3-640) */
/** a strip of a tape measure from cm c0 to c1 (a mark at every cm, longer at every 5 and 10, the tens numbered) and a coral
 *  arrow over cm v. Not at real size: a reading picture. */
function tape(c0, c1, v, { px = 13, h = 46 } = {}) {
  const W = (c1 - c0) * px + 28;
  let b = `<rect x="1" y="8" width="${f1(W - 2)}" height="${h - 16}" rx="3" fill="${TAPE}" stroke="${TAPE_DARK}" stroke-width="1.5"/>`;
  for (let c = c0; c <= c1; c++) {
    const x = 14 + (c - c0) * px, len = c % 10 === 0 ? 14 : c % 5 === 0 ? 11 : 6;
    b += `<line x1="${f1(x)}" y1="9" x2="${f1(x)}" y2="${9 + len}" stroke="${T.ink}" stroke-width="${c % 10 === 0 ? 1.6 : 1}" data-e2b-tapecm="${c}"/>`;
    if (c % 5 === 0) b += text(x, 32, String(c), 12, { attrs: `data-e2b-tapenum="${c}"` });
  }
  const xv = 14 + (v - c0) * px;
  b += `<path d="M${f1(xv)} 9 L${f1(xv - 5)} 1 L${f1(xv + 5)} 1 Z" fill="${T.coral}" data-e2b-tapearrow="${v}"/>`;
  return artSvg(b, W, h, `data-e2b-art="tape" data-e2b-c0="${c0}" data-e2b-c1="${c1}" data-e2b-v="${v}" data-e2b-px="${px}"`);
}

/* ================================================================ charts (G3-645) */
/**
 * a bar chart: cats (names) and values, the scale from y0 to y1 in steps of `step` (y0 > 0: the axis starts there, no
 * break mark: the lesson is to notice it), every step a grid line and a number.
 */
function barChart({ cats, values, y0 = 0, y1, step, w = 300, h = 184, attrs = '' }) {
  const left = 34, bottom = h - 20, top = 8, right = w - 6, n = cats.length;
  const Y = (v) => bottom - (v - y0) / (y1 - y0) * (bottom - top);
  let b = `<rect x="${left}" y="${top}" width="${right - left}" height="${bottom - top}" fill="${T.white}"/>`;
  for (let v = y0; v <= y1; v += step) { b += `<line x1="${left}" y1="${f1(Y(v))}" x2="${right}" y2="${f1(Y(v))}" stroke="${T.grid}" stroke-width="1" data-e2b-grid="${v}"/>` + text(left - 6, Y(v), String(v), 11, { anchor: 'end', attrs: `data-e2b-ynum="${v}"` }); }
  const slot = (right - left) / n, bw = Math.min(34, slot * 0.6);
  cats.forEach((c, i) => {
    const x = left + i * slot + (slot - bw) / 2;
    b += `<rect x="${f1(x)}" y="${f1(Y(values[i]))}" width="${f1(bw)}" height="${f1(bottom - Y(values[i]))}" fill="${T.teal}" stroke="${T.teal}" stroke-width="1" data-e2b-bar="${esc(c)}" data-e2b-val="${values[i]}"/>`;
    b += text(left + (i + 0.5) * slot, bottom + 13, c, 11, { font: "'Nunito'", weight: 800, attrs: `data-e2b-cat="${esc(c)}"` });
  });
  b += `<line x1="${left}" y1="${top - 4}" x2="${left}" y2="${bottom}" stroke="${T.ink}" stroke-width="2"/><line x1="${left}" y1="${bottom}" x2="${right + 3}" y2="${bottom}" stroke="${T.ink}" stroke-width="2"/>`;
  return artSvg(b, w, h, `data-e2b-art="bar-chart" data-e2b-y0="${y0}" data-e2b-y1="${y1}" data-e2b-step="${step}"${attrs ? ' ' + attrs : ''}`);
}
/** a picture chart: one row per category, `per` children per picture (a smiling face), half a face for half of `per` */
function pictureChart({ cats, values, per, w = 400, rowH = 30, s = 22, attrs = '' }) {
  const lw = 96, H = cats.length * rowH + 4;
  let b = '';
  cats.forEach((c, i) => {
    const y = 4 + i * rowH;
    b += `<line x1="0" y1="${y + rowH - 2}" x2="${w}" y2="${y + rowH - 2}" stroke="${T.grid}" stroke-width="1"/>` + text(lw - 8, y + rowH / 2, c, 13, { anchor: 'end', font: "'Nunito'", weight: 800, attrs: `data-e2b-cat="${esc(c)}"` });
    const full = Math.floor(values[i] / per), half = values[i] % per ? 1 : 0;
    for (let k = 0; k < full + half; k++) {
      const x = lw + k * (s + 5), cy = y + rowH / 2 - 1, hf = k === full;
      const face = `<circle cx="${f1(x + s / 2)}" cy="${f1(cy)}" r="${s / 2 - 1}" fill="${T.coralSoft}" stroke="${T.coral}" stroke-width="1.6"/><circle cx="${f1(x + s / 2 - 4)}" cy="${f1(cy - 3)}" r="1.6" fill="${T.ink}"/><circle cx="${f1(x + s / 2 + 4)}" cy="${f1(cy - 3)}" r="1.6" fill="${T.ink}"/><path d="M${f1(x + s / 2 - 5)} ${f1(cy + 3)} Q${f1(x + s / 2)} ${f1(cy + 8)} ${f1(x + s / 2 + 5)} ${f1(cy + 3)}" fill="none" stroke="${T.ink}" stroke-width="1.4"/>`;
      b += hf ? `<g data-e2b-face="half"><clipPath id="e2bhalf${i}"><rect x="${f1(x)}" y="${f1(cy - s)}" width="${f1(s / 2)}" height="${2 * s}"/></clipPath><g clip-path="url(#e2bhalf${i})">${face}</g></g>` : `<g data-e2b-face="full">${face}</g>`;
    }
  });
  return artSvg(b, w, H, `data-e2b-art="picture-chart" data-e2b-per="${per}"${attrs ? ' ' + attrs : ''}`);
}

/* ================================================================ clothes and trees (G3-646) */
/** a T-shirt (fill = a colour, or white to colour in), s px wide */
function tshirt(fill, s = 34, attrs = '') {
  const k = s / 34;
  const p = `M${f1(10 * k)} ${f1(2 * k)} L${f1(2 * k)} ${f1(9 * k)} L${f1(6 * k)} ${f1(15 * k)} L${f1(9 * k)} ${f1(13 * k)} L${f1(9 * k)} ${f1(30 * k)} L${f1(25 * k)} ${f1(30 * k)} L${f1(25 * k)} ${f1(13 * k)} L${f1(28 * k)} ${f1(15 * k)} L${f1(32 * k)} ${f1(9 * k)} L${f1(24 * k)} ${f1(2 * k)} Q${f1(17 * k)} ${f1(7 * k)} ${f1(10 * k)} ${f1(2 * k)} Z`;
  return artSvg(`<path d="${p}" fill="${fill}" stroke="${T.ink}" stroke-width="1.5" stroke-linejoin="round"/>`, s, 32 * k, `data-e2b-art="tshirt"${attrs ? ' ' + attrs : ''}`);
}
/** trousers (fill = a colour, or white) */
function trousers(fill, s = 26, attrs = '') {
  const k = s / 26;
  const p = `M${f1(3 * k)} ${f1(2 * k)} L${f1(23 * k)} ${f1(2 * k)} L${f1(24 * k)} ${f1(34 * k)} L${f1(16 * k)} ${f1(34 * k)} L${f1(13 * k)} ${f1(12 * k)} L${f1(10 * k)} ${f1(34 * k)} L${f1(2 * k)} ${f1(34 * k)} Z`;
  return artSvg(`<path d="${p}" fill="${fill}" stroke="${T.ink}" stroke-width="1.5" stroke-linejoin="round"/>`, s, 36 * k, `data-e2b-art="trousers"${attrs ? ' ' + attrs : ''}`);
}
const clothFill = (id) => CLOTH[id];

const MONEY_NOTE_MM = E1.MONEY.EUR.notes;
module.exports = { PAL_E2B, PX_MM, REAL_INK, COIN_MM, MONEY_NOTE_MM, coinLabel, euroCoin, euroNote, baseTen, rodGroups, dotField, mmRuler, mmLine, startPoint, realThing, THING_SW, centreMark, realCircle, flowerCentres, townMap, placeIcon, tape, barChart, pictureChart, tshirt, trousers, clothFill, CLOTH, artSvg, text, esc, f1 };
