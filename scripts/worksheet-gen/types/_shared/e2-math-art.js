/**
 * e2-math-art.js — the drawings of Batch DE-A (Daily Teaching System Stage E-2, 2026-11-26; German mathematics Klasse 1-2,
 * types G1-673 .. G2-636, factory e2-math.js). Every drawing is an <svg data-lcs-prim="sk-art"> (the page lint leaves its
 * colours to this batch's gate, qa/verify-e2-de-a.js, which holds every colour this file writes to PAL_E2).
 *
 *   story panels     the places of the Klasse-1 picture stories (a branch, a pond, a leaf, a stone, a meadow, a car park,
 *                    a plate, a basket, a bowl, a tray) with library pictures standing on them; a thing taken away is
 *                    CROSSED OUT (durchgestrichen, as the unit's lesson before taught), the things that come stand apart
 *                    with a coral arrow curving down onto them (G1-673)
 *   number lines     a Zahlenstrahl section from one ten to the next with a tick at every one, the tens printed and one
 *                    number marked (G2-634)
 *   body measures    a hand span (an open hand, the arrow from thumb tip to little-finger tip), a foot (a footprint, the
 *                    arrow from heel to toe), a step (two footprints, the arrow from heel to heel) (G1-675)
 *   tools            a 30-cm ruler, a folding Meterstab, a tape measure (G2-636)
 *   classroom things a table, a table's height, a Heft, a pencil case, the board, a door (its width, its height), a window
 *                    sill, a rug, a cupboard, the classroom, the corridor, a Schulhof bench, a table-tennis table; each with
 *                    a coral double arrow on the side the child measures (G1-675, G2-636)
 *   the heart        the mark of the "verliebte Zahlen" (two numbers that make 10) (G2-634)
 *   children         the figure set of dk-social-k-art.js (person(), NOT edited), with a speech bubble (G1-674, G2-635)
 * Pure functions; nothing here reads a picture or the cache while the module loads.
 */
'use strict';
const TOK = require('../../primitives/_tokens.js');
const K = require('./dk-social-k-art.js');
const E1 = require('./e1-math-art.js');

const T = TOK.color;
const { f1, esc, text } = E1;

/** every colour this file writes (the gate scans the source for hex values and refuses any other) */
const C = {
  wood: '#C98A4B', woodDark: '#8C5A2B', woodLight: '#E8C89A', leaf: '#6BB36B', leafDark: '#3F8A4A', grass: '#9CCB7C',
  water: '#BFE3F2', waterDark: '#4FA3D1', stone: '#B9C3CC', stoneDark: '#7A848C', asphalt: '#C9CDD2', asphaltDark: '#7A7F86',
  plate: '#FFFFFF', board: '#2F5D50', boardLine: '#E9F2EE', door: '#B07A4E', glass: '#DDEFF5', rug: '#E98AB0', rugDark: '#B5546F',
  skin: '#F0C08F', skinDark: '#B97A45', ruler: '#F4C542', rulerDark: '#B08A1C', tapeCase: '#E4574B', blue: '#4A7BD0', blueDark: '#34405A',
  heart: '#E4574B', net: '#FFFFFF', table: '#3F8A4A',
};
const PAL_E2 = new Set([...K.PAL, ...Object.values(C), T.cream, T.creamDeep, T.teal, T.tealSoft, T.coral, T.coralSoft, T.ink, T.inkSoft, T.white, T.grid].map((c) => c.toUpperCase()));

/** an svg drawing of this batch */
const artSvg = (body, w, h, attrs = '', vb = null) => `<svg xmlns="http://www.w3.org/2000/svg" width="${f1(w)}" height="${f1(h)}" viewBox="${vb || `0 0 ${f1(w)} ${f1(h)}`}" style="display:block;overflow:visible" data-lcs-prim="sk-art"${attrs ? ' ' + attrs : ''}>${body}</svg>`;
/** the ink box of a library picture (data/hm/ink-boxes.json: fractions of its square), read when a page is built */
let _ink = null;
const inkOf = (key) => { if (!_ink) _ink = require('../../data/hm/ink-boxes.json'); return (key && _ink[key]) || { l: 0, t: 0, w: 1, h: 1 }; };
const img = (src, x, y, s, attrs = '') => `<image href="${src}" x="${f1(x)}" y="${f1(y)}" width="${f1(s)}" height="${f1(s)}" preserveAspectRatio="xMidYMid meet"${attrs ? ' ' + attrs : ''}/>`;
/** a coral double arrow from (x1,y1) to (x2,y2) (the side a child measures) */
function dblArrow(x1, y1, x2, y2, sw = 2.4, hd = 6) {
  const a = Math.atan2(y2 - y1, x2 - x1), c = Math.cos(a), s = Math.sin(a);
  const tip = (x, y, d) => `<path d="M${f1(x - d * c * hd - s * hd * 0.7)} ${f1(y - d * s * hd + c * hd * 0.7)} L${f1(x)} ${f1(y)} L${f1(x - d * c * hd + s * hd * 0.7)} ${f1(y - d * s * hd - c * hd * 0.7)}" fill="none" stroke="${T.coral}" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round"/>`;
  return `<g data-e2-measure="1"><line x1="${f1(x1)}" y1="${f1(y1)}" x2="${f1(x2)}" y2="${f1(y2)}" stroke="${T.coral}" stroke-width="${sw}" stroke-linecap="round"/>${tip(x2, y2, 1)}${tip(x1, y1, -1)}</g>`;
}

/* ================================================================ G1-673: the story panels */
/** how many rows each place holds. A lens-shaped place (a leaf, a pond, a stone, a plate) holds one row: a back row on
 *  it would stand where its curved edge has already dropped away, in the air (review round 2). A deep place (a meadow, a
 *  parking lot, a basket, a bowl, a tray, a branch with a second branch behind it) holds two. */
const SCENE_ROWS = { branch: 2, meadow: 2, parking: 2, basket: 2, bowl: 2, tray: 2, pond: 1, leaf: 1, stone: 1, plate: 1 };
const STORY = { gap: 3, apart: 22, DEPTH: 1.08, SHIFT: 0.5 };
/**
 * The layout of a story, shared by its two pictures: the things that are there (`nStay`, on the left) and the ones that
 * come (`nCome`, apart on the right, only in picture 2 but their place kept free in picture 1), so picture 2 shows the
 * first group EXACTLY where picture 1 has it (review round 2). Fewest rows first, pictures at least 21 px; then smaller.
 * Returns null when the place cannot hold them (the generator then picks another thing for the story).
 */
function storyLayout({ scene, nStay, nCome = 0, w = 186, h = 84, px = 34 }) {
  const { gap, apart, DEPTH, SHIFT } = STORY, maxR = SCENE_ROWS[scene] || 1;
  const per = (m, r) => Math.ceil(m / r);
  const gw = (m, r, p) => (m ? per(m, r) * p + (per(m, r) - 1) * gap + (r > 1 ? SHIFT * (p + gap) : 0) : 0);
  const fit = (r1, r2, p) => gw(nStay, r1, p) + (nCome ? apart + gw(nCome, r2, p) : 0) <= w - 12 && p * (1 + DEPTH * (Math.max(r1, nCome ? r2 : 1) - 1)) <= h - 22;
  const CONFIGS = [[1, 1], [2, 1], [1, 2], [2, 2]].filter(([r1, r2]) => r1 <= maxR && r2 <= maxR && r1 <= Math.max(1, nStay) && r2 <= Math.max(1, nCome) && (nCome || r2 === 1));
  for (const [lo, hi] of [[21, px], [15, 20]]) for (const [r1, r2] of CONFIGS) for (let p = hi; p >= lo; p--) if (fit(r1, r2, p)) {
    const rowsMax = Math.max(r1, nCome ? r2 : 1);
    return { p, r1, r2, rowsMax, depth: DEPTH * p * (rowsMax - 1), wStay: gw(nStay, r1, p), wCome: gw(nCome, r2, p), total: gw(nStay, r1, p) + (nCome ? apart + gw(nCome, r2, p) : 0) };
  }
  return null;
}
/**
 * One picture of a story. `things` = this picture's things; `come` = how many come in picture 2 (picture 1 keeps their
 * place free). Every thing stands ON its place: the place is drawn as deep as the rows on it, and the parts a thing rests
 * on carry data-e2-ground ("fill" a surface, "stroke" a branch) so a gate can check that nothing hangs in the air.
 */
function storyPanel({ scene, things, come = null, w = 186, h = 84, px = 34, attrs = '' }) {
  const stay = things.filter((x) => !x.arrives), comers = things.filter((x) => x.arrives);
  const nCome = come == null ? comers.length : come;
  const L = storyLayout({ scene, nStay: stay.length, nCome, w, h, px });
  if (!L) throw new Error(`e2-math-art: ${stay.length} + ${nCome} things do not fit a story picture on "${scene}"`);
  const { gap, apart, DEPTH, SHIFT } = STORY, { p, depth } = L;
  const per = (m, r) => Math.ceil(m / r);
  const groundY = h - 12;   // where the front row stands
  let b = `<rect x="0.75" y="0.75" width="${f1(w - 1.5)}" height="${f1(h - 1.5)}" rx="8" fill="${T.white}" stroke="${T.grid}" stroke-width="1.5"/>`;
  // the place (as deep as the rows on it)
  if (scene === 'branch') {
    for (let r = L.rowsMax - 1; r >= 0; r--) { const y = groundY + 2 - r * DEPTH * p; b += `<path d="M${6 + r * 8} ${f1(y)} Q${f1(w / 2)} ${f1(y - 4)} ${f1(w - 6 - r * 8)} ${f1(y + 1)}" fill="none" stroke="${C.woodDark}" stroke-width="${r ? 4 : 7}" stroke-linecap="round" data-e2-ground="stroke"/>`; }
    b += `<path d="M${f1(w * 0.18)} ${groundY + 3} q-6 8 -14 9 q7 -8 14 -9 Z" fill="${C.leaf}" stroke="${C.leafDark}" stroke-width="1"/><path d="M${f1(w * 0.8)} ${groundY + 2} q5 8 13 9 q-6 -8 -13 -9 Z" fill="${C.leaf}" stroke="${C.leafDark}" stroke-width="1"/>`;
  }
  if (scene === 'pond') b += `<ellipse cx="${f1(w / 2)}" cy="${f1(groundY - 2)}" rx="${f1(w / 2 - 5)}" ry="13" fill="${C.water}" stroke="${C.waterDark}" stroke-width="1.5" data-e2-ground="fill"/>`;
  if (scene === 'leaf') b += `<path d="M5 ${groundY + 4} Q${f1(w / 2)} ${groundY - 26} ${f1(w - 5)} ${groundY + 4} Q${f1(w / 2)} ${groundY + 12} 5 ${groundY + 4} Z" fill="${C.leaf}" stroke="${C.leafDark}" stroke-width="1.5" data-e2-ground="fill"/><line x1="10" y1="${groundY + 4}" x2="${f1(w - 10)}" y2="${groundY + 4}" stroke="${C.leafDark}" stroke-width="1.2"/>`;
  if (scene === 'stone') b += `<path d="M7 ${groundY + 9} Q8 ${groundY - 4} ${f1(w * 0.3)} ${groundY - 3} Q${f1(w / 2)} ${groundY - 8} ${f1(w * 0.72)} ${groundY - 3} Q${f1(w - 7)} ${groundY - 4} ${f1(w - 7)} ${groundY + 9} Z" fill="${C.stone}" stroke="${C.stoneDark}" stroke-width="1.5" data-e2-ground="fill"/>`;
  if (scene === 'meadow') b += `<rect x="3" y="${f1(groundY - depth)}" width="${f1(w - 6)}" height="${f1(h - groundY + depth - 3)}" rx="3" fill="${C.grass}" data-e2-ground="fill"/>` + Array.from({ length: 7 }, (_, k) => `<path d="M${f1(10 + k * (w - 20) / 6)} ${groundY + 7} l-3 -6 M${f1(10 + k * (w - 20) / 6)} ${groundY + 7} l3 -6" stroke="${C.leafDark}" stroke-width="1.3" stroke-linecap="round"/>`).join('');
  if (scene === 'parking') b += `<rect x="3" y="${f1(groundY - p - depth - 2)}" width="${f1(w - 6)}" height="${f1(h - groundY + p + depth - 1)}" rx="3" fill="${C.asphalt}" data-e2-ground="fill"/>` + Array.from({ length: 8 }, (_, k) => `<line x1="${f1(7 + k * (w - 14) / 7)}" y1="${f1(groundY + 2)}" x2="${f1(7 + k * (w - 14) / 7)}" y2="${groundY + 9}" stroke="${T.white}" stroke-width="1.6"/>`).join('');
  if (scene === 'plate') b += `<ellipse cx="${f1(w / 2)}" cy="${groundY}" rx="${f1(w / 2 - 5)}" ry="11" fill="${C.plate}" stroke="${T.inkSoft}" stroke-width="1.5" data-e2-ground="fill"/><ellipse cx="${f1(w / 2)}" cy="${groundY}" rx="${f1(w / 2 - 17)}" ry="6" fill="none" stroke="${T.grid}" stroke-width="1"/>`;
  // a tray is a FLAT board seen from the front (review round 2: the deep trapezoid read as a box): its top, narrower at
  // the back, as deep as the rows standing on it, and a thin front edge
  if (scene === 'tray') { const top = groundY - depth - 6; b += `<path d="M16 ${f1(top)} L${f1(w - 16)} ${f1(top)} L${f1(w - 5)} ${groundY + 5} L5 ${groundY + 5} Z" fill="${C.woodLight}" stroke="${C.woodDark}" stroke-width="1.5" data-e2-ground="fill"/><path d="M5 ${groundY + 5} L${f1(w - 5)} ${groundY + 5} L${f1(w - 6)} ${groundY + 9} L6 ${groundY + 9} Z" fill="${C.wood}" stroke="${C.woodDark}" stroke-width="1.5"/>`; }
  // a basket or a bowl with more than one row: the back wall, as high as the rows, behind the things
  if (scene === 'basket' && depth > 0) b += `<path d="M9 ${f1(groundY - 12 - depth)} L${f1(w - 9)} ${f1(groundY - 12 - depth)} L${f1(w - 9)} ${groundY - 12} L9 ${groundY - 12} Z" fill="${C.woodLight}" stroke="${C.woodDark}" stroke-width="1.5" data-e2-backwall="1" data-e2-ground="fill"/>`;
  if (scene === 'bowl' && depth > 0) b += `<path d="M9 ${groundY - 10} L9 ${f1(groundY - 10 - depth)} Q${f1(w / 2)} ${f1(groundY - 16 - depth)} ${f1(w - 9)} ${f1(groundY - 10 - depth)} L${f1(w - 9)} ${groundY - 10} Z" fill="${C.water}" stroke="${C.waterDark}" stroke-width="1.5" data-e2-backwall="1" data-e2-ground="fill"/>`;
  // the things (a basket and a bowl are drawn after them: the things sit inside)
  const placed = [];
  const lay = (grp, rows, x0) => {
    const k0 = per(grp.length, rows);
    for (let r = 0; r < rows; r++) {
      // the front row (r = 0) is full and holds the LAST things (a crossed thing stands in front); the back rows the first
      const end = grp.length - r * k0, row = grp.slice(Math.max(0, end - k0), end);
      const yFoot = groundY - r * DEPTH * p + (scene === 'basket' || scene === 'bowl' ? -4 : 0);
      row.forEach((t, k) => { const ink = inkOf(t.pic); placed.push({ t, x: x0 + (r % 2) * SHIFT * (p + gap) + k * (p + gap), y: yFoot - (ink.t + ink.h) * p, r, first: k === 0 }); });
    }
  };
  const left = (w - L.total) / 2;
  lay(stay, L.r1, left);
  if (comers.length) lay(comers, L.r2, left + L.wStay + apart);
  placed.sort((a, c) => (c.r - a.r) || (a.x - c.x));   // the back rows first
  for (const q of placed) {
    b += img(q.t.src, q.x, q.y, p, `data-e2-thing="${q.t.crossed ? 'crossed' : q.t.arrives ? 'arrives' : 'stays'}" data-e2-pic="${esc(q.t.pic)}"`);
    if (q.t.crossed) b += `<g data-e2-cross="1"><line x1="${f1(q.x + 1)}" y1="${f1(q.y + 1)}" x2="${f1(q.x + p - 1)}" y2="${f1(q.y + p - 1)}" stroke="${T.ink}" stroke-width="2.6" stroke-linecap="round"/><line x1="${f1(q.x + p - 1)}" y1="${f1(q.y + 1)}" x2="${f1(q.x + 1)}" y2="${f1(q.y + p - 1)}" stroke="${T.ink}" stroke-width="2.6" stroke-linecap="round"/></g>`;
  }
  // the things that come: a coral arrow curving down onto their group from the panel's top right ("es kommen dazu")
  const cg = placed.filter((q) => q.t.arrives);
  if (cg.length) {
    const gx0 = Math.min(...cg.map((q) => q.x)), gx1 = Math.max(...cg.map((q) => q.x)) + p, gTop = Math.min(...cg.map((q) => q.y + inkOf(q.t.pic).t * p));
    const ex = (gx0 + gx1) / 2, ey = gTop - 3, sx = Math.min(w - 8, gx1 + 8), sy = Math.max(4, ey - 16);
    b += `<g data-e2-comes="1"><path d="M${f1(sx)} ${f1(sy)} Q${f1(ex + 2)} ${f1(sy - 2)} ${f1(ex)} ${f1(ey - 1)}" fill="none" stroke="${T.coral}" stroke-width="2.2" stroke-linecap="round"/><path d="M${f1(ex - 4)} ${f1(ey - 6)} L${f1(ex)} ${f1(ey)} L${f1(ex + 4)} ${f1(ey - 6)}" fill="none" stroke="${T.coral}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></g>`;
  }
  if (scene === 'basket') b += `<path d="M9 ${groundY - 12} L${f1(w - 9)} ${groundY - 12} L${f1(w - 19)} ${groundY + 8} L19 ${groundY + 8} Z" fill="${C.wood}" stroke="${C.woodDark}" stroke-width="1.5" data-e2-ground="fill"/>` + [0.33, 0.66].map((q) => `<line x1="${f1(12 + q * 4)}" y1="${f1(groundY - 12 + q * 20)}" x2="${f1(w - 12 - q * 4)}" y2="${f1(groundY - 12 + q * 20)}" stroke="${C.woodDark}" stroke-width="1"/>`).join('');
  if (scene === 'bowl') b += `<path d="M9 ${groundY - 10} L${f1(w - 9)} ${groundY - 10} Q${f1(w - 13)} ${groundY + 9} ${f1(w / 2)} ${groundY + 9} Q13 ${groundY + 9} 9 ${groundY - 10} Z" fill="${C.water}" stroke="${C.waterDark}" stroke-width="1.5" data-e2-ground="fill"/>`;
  return artSvg(b, w, h, `data-e2-art="story" data-e2-scene="${scene}" data-e2-px="${p}"${attrs ? ' ' + attrs : ''}`);
}
/** the arrow between the two pictures of a story */
const storyArrow = (w = 26, h = 20) => artSvg(`<path d="M3 ${h / 2} H${w - 6} M${w - 12} ${h / 2 - 6} L${w - 4} ${h / 2} L${w - 12} ${h / 2 + 6}" fill="none" stroke="${T.coral}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>`, w, h, 'data-e2-art="story-arrow"');

/* ================================================================ G2-634: a Zahlenstrahl section */
/**
 * from `from` (a ten) to from + 10: a tick at every one (longer at the five), the two tens printed under their ticks, a
 * coral dot on `mark` with its number over it (no other number printed). w px wide.
 */
function tensLine({ from, mark, w = 250, h = 46 }) {
  const x0 = 14, x1 = w - 14, step = (x1 - x0) / 10, y = 22;
  let b = `<line x1="${x0 - 6}" y1="${y}" x2="${x1 + 6}" y2="${y}" stroke="${T.ink}" stroke-width="2.4" stroke-linecap="round"/>`;
  for (let k = 0; k <= 10; k++) { const x = x0 + k * step, t = k === 0 || k === 10 ? 8 : k === 5 ? 6 : 4; b += `<line x1="${f1(x)}" y1="${y - t}" x2="${f1(x)}" y2="${y + t}" stroke="${T.ink}" stroke-width="${k % 5 ? 1.4 : 2}" data-e2-tick="${from + k}"/>`; }
  b += text(x0, y + 17, String(from), 13, { attrs: `data-e2-tenlabel="${from}"` }) + text(x1, y + 17, String(from + 10), 13, { attrs: `data-e2-tenlabel="${from + 10}"` });
  if (mark != null) { const x = x0 + (mark - from) * step; b += `<circle cx="${f1(x)}" cy="${y}" r="5" fill="${T.coral}" stroke="${T.ink}" stroke-width="1" data-e2-mark="${mark}"/>` + (mark !== from && mark !== from + 10 ? text(x, y - 13, String(mark), 13, { fill: T.coral, attrs: `data-e2-marklabel="${mark}"` }) : ''); }
  return artSvg(b, w, h, `data-e2-art="tens-line" data-e2-from="${from}"`);
}
/** the heart of the "verliebte Zahlen" (two numbers that make 10) */
const heart = (s = 18) => artSvg(`<path d="M${f1(s / 2)} ${f1(s * 0.88)} C${f1(s * 0.05)} ${f1(s * 0.55)} ${f1(s * 0.02)} ${f1(s * 0.12)} ${f1(s * 0.28)} ${f1(s * 0.12)} C${f1(s * 0.42)} ${f1(s * 0.12)} ${f1(s / 2)} ${f1(s * 0.25)} ${f1(s / 2)} ${f1(s * 0.3)} C${f1(s / 2)} ${f1(s * 0.25)} ${f1(s * 0.58)} ${f1(s * 0.12)} ${f1(s * 0.72)} ${f1(s * 0.12)} C${f1(s * 0.98)} ${f1(s * 0.12)} ${f1(s * 0.95)} ${f1(s * 0.55)} ${f1(s / 2)} ${f1(s * 0.88)} Z" fill="${C.heart}" stroke="${T.ink}" stroke-width="1"/>`, s, s, 'data-e2-art="heart"');

/* ================================================================ G1-675: the body measures (w x h, about 54 x 40) */
/** the library pictures the hand span and the foot are drawn from (body parts/hand: an open hand, fingers spread, the
 *  thumb out to the right; body parts/foot: a bare foot from the side, the heel on the left), and where on each (fractions
 *  of its square, measured on the picture's ink) the arrow ends: the thumb tip and the little-finger tip; the heel and the
 *  big toe */
const BODY_PICS = { span: { pic: ['body parts', 'hand'], from: [0.86, 0.5], to: [0.14, 0.24] }, foot: { pic: ['body parts', 'foot'], from: [0.05, 0.86], to: [0.985, 0.86] } };
/**
 * a body measure, w x h: span = the open hand and a coral double arrow from the thumb tip to the little-finger tip;
 * foot = the bare foot from the side and the arrow under it from heel to toe; step = two drawn footprints, one stepped
 * in front of the other, and the arrow from heel to heel. `src(pic)` gives a library picture's href (build time).
 */
/** the unit drawings by name: a later batch adds its own (the Swedish äldre mått: tum, fot, aln, famn) to UNIT_ART */
const UNIT_ART = { span: (src, w, h) => bodyUnit('span', src, w, h), foot: (src, w, h) => bodyUnit('foot', src, w, h), step: (src, w, h) => bodyUnit('step', src, w, h) };
const unitArt = (draw, src, w, h) => { if (!UNIT_ART[draw]) throw new Error('e2-math-art: no unit drawing ' + draw); return UNIT_ART[draw](src, w, h); };
function bodyUnit(kind, src, w = 58, h = 44) {
  let b = '';
  if (kind === 'span' || kind === 'foot') {
    const P = BODY_PICS[kind], s = kind === 'span' ? h : w * 0.84, x0 = (w - s) / 2, y0 = kind === 'span' ? 0 : h - s * 0.98;
    b += img(src(P.pic), x0, y0, s, `data-e2-pic="${P.pic.join('/')}"`);
    const ax = (q) => x0 + q[0] * s, ay = (q) => y0 + q[1] * s + (kind === 'foot' ? 4 : 0);
    if (kind === 'foot') b += dblArrow(ax(P.from), Math.min(h - 3, ay(P.from)), ax(P.to), Math.min(h - 3, ay(P.to)), 2.2, 4.5);
    else b += dblArrow(ax(P.from), ay(P.from), ax(P.to), ay(P.to), 2.2, 4.5);
  } else if (kind === 'step') {
    // two footprints seen from above, heel left, toes right; the back one low, the front one a step ahead and higher: the
    // arrow under them from heel to heel (a child's step is about two and a half foot lengths)
    const k = 0.7;
    const fp = (x, y) => `<g transform="translate(${f1(x)} ${f1(y)}) scale(${k})"><path d="M0 0 Q0 -5.5 7 -5.5 Q15 -7 21 -5 Q24.5 -3 24.5 0 Q24.5 4.5 20 5 Q13 3 7 5.5 Q0 5.5 0 0 Z" fill="${C.skin}" stroke="${T.ink}" stroke-width="1.4"/>` +
      [[27.5, -4.2, 2.1], [28.4, -0.6, 1.7], [28, 2.6, 1.5], [26.6, 5.3, 1.3]].map(([cx, cy, r]) => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${C.skin}" stroke="${T.ink}" stroke-width="1.1"/>`).join('') + '</g>';
    // drawn in a 58 x 44 frame and scaled to w x h (so a larger cell shows larger footprints)
    const H = 44, back = [2, H * 0.68], front = [36, H * 0.3];
    let g = fp(back[0], back[1]) + fp(front[0], front[1]);
    g += `<line x1="${f1(back[0])}" y1="${f1(back[1] + 4.5)}" x2="${f1(back[0])}" y2="${f1(H - 2)}" stroke="${T.inkSoft}" stroke-width="1" stroke-dasharray="2 2"/><line x1="${f1(front[0])}" y1="${f1(front[1] + 4.5)}" x2="${f1(front[0])}" y2="${f1(H - 2)}" stroke="${T.inkSoft}" stroke-width="1" stroke-dasharray="2 2"/>`;
    g += dblArrow(back[0], H - 4, front[0], H - 4, 2.2, 4);
    b += `<g transform="scale(${f1(w / 58)} ${f1(h / H)})">${g}</g>`;
  }
  return artSvg(b, w, h, `data-e2-art="unit" data-e2-unit="${kind}"`);
}

/* ================================================================ G2-636: the measuring tools (about 64 x 30) */
function toolArt(kind, w = 64, h = 30) {
  let b = '';
  if (kind === 'ruler') {
    b += `<rect x="2" y="${h / 2 - 7}" width="${w - 4}" height="14" rx="2" fill="${C.ruler}" stroke="${C.rulerDark}" stroke-width="1.3"/>` +
      Array.from({ length: 13 }, (_, k) => `<line x1="${f1(6 + k * (w - 12) / 12)}" y1="${h / 2 - 7}" x2="${f1(6 + k * (w - 12) / 12)}" y2="${h / 2 - 7 + (k % 2 ? 3.5 : 6)}" stroke="${T.ink}" stroke-width="1"/>`).join('');
  } else if (kind === 'folding') {
    // a folding Meterstab, half opened: a zigzag of wooden segments
    const pts = [[3, h - 6], [20, 7], [37, h - 6], [54, 7], [w - 3, h - 9]];
    for (let i = 0; i < pts.length - 1; i++) { const [x1, y1] = pts[i], [x2, y2] = pts[i + 1]; b += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${C.rulerDark}" stroke-width="8" stroke-linecap="round"/><line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${C.ruler}" stroke-width="5.6" stroke-linecap="round"/>`; }
    b += pts.slice(1, -1).map(([x, y]) => `<circle cx="${x}" cy="${y}" r="2" fill="${T.ink}"/>`).join('');
  } else if (kind === 'tape') {
    // a tape measure: a round case and the tape pulled out to the right
    b += `<rect x="24" y="${h / 2 + 2}" width="${w - 27}" height="7" fill="${C.ruler}" stroke="${C.rulerDark}" stroke-width="1"/>` + Array.from({ length: 8 }, (_, k) => `<line x1="${f1(28 + k * (w - 31) / 8)}" y1="${h / 2 + 2}" x2="${f1(28 + k * (w - 31) / 8)}" y2="${h / 2 + 5}" stroke="${T.ink}" stroke-width="0.9"/>`).join('') +
      `<rect x="${w - 5}" y="${h / 2}" width="3" height="11" fill="${T.ink}"/><circle cx="15" cy="${h / 2}" r="12.5" fill="${C.tapeCase}" stroke="${T.ink}" stroke-width="1.4"/><circle cx="15" cy="${h / 2}" r="5" fill="${T.white}" stroke="${T.ink}" stroke-width="1.1"/>`;
  }
  return artSvg(b, w, h, `data-e2-art="tool" data-e2-tool="${kind}"`);
}

/* ================================================================ G1-675, G2-636: the classroom things (w x h about 66 x 46) */
function thingArt(kind, w = 66, h = 46) {
  let b = '';
  const leg = (x, y1, y2) => `<rect x="${f1(x - 2)}" y="${f1(y1)}" width="4" height="${f1(y2 - y1)}" fill="${C.woodDark}"/>`;
  switch (kind) {
    case 'table':   // a pupil's table from the front; the arrow along its long side, over it
      b += `<rect x="6" y="20" width="${w - 12}" height="6" rx="2" fill="${C.wood}" stroke="${C.woodDark}" stroke-width="1.3"/>` + leg(12, 26, h - 3) + leg(w - 12, 26, h - 3) + dblArrow(6, 11, w - 6, 11); break;
    case 'tableHeight':   // the table's height: the arrow beside it from the floor to the top
      b += `<rect x="16" y="12" width="${w - 22}" height="6" rx="2" fill="${C.wood}" stroke="${C.woodDark}" stroke-width="1.3"/>` + leg(22, 18, h - 3) + leg(w - 12, 18, h - 3) + `<line x1="2" y1="${h - 2}" x2="${w - 2}" y2="${h - 2}" stroke="${T.inkSoft}" stroke-width="1.4"/>` + dblArrow(8, 12, 8, h - 3); break;
    case 'notebook':   // a Heft (portrait): the arrow along its long side, on its right
      b += `<rect x="18" y="3" width="26" height="${h - 6}" rx="2" fill="${C.blue}" stroke="${C.blueDark}" stroke-width="1.3"/><rect x="22" y="9" width="18" height="9" rx="1.5" fill="${T.white}" stroke="${C.blueDark}" stroke-width="0.8"/>` + dblArrow(52, 3, 52, h - 3); break;
    case 'pencilcase':   // a zip pencil case: the arrow along it, under it
      b += `<rect x="6" y="10" width="${w - 12}" height="20" rx="9" fill="${C.rug}" stroke="${C.rugDark}" stroke-width="1.3"/><line x1="11" y1="15" x2="${w - 11}" y2="15" stroke="${C.rugDark}" stroke-width="1.4" stroke-dasharray="2 1.5"/><rect x="${w - 16}" y="12" width="6" height="6" rx="1" fill="${C.stone}" stroke="${T.ink}" stroke-width="0.8"/>` + dblArrow(6, h - 7, w - 6, h - 7); break;
    case 'board':   // the board on its wall, the chalk tray: the arrow along its length, under it
      b += `<rect x="4" y="4" width="${w - 8}" height="26" rx="2" fill="${C.board}" stroke="${C.woodDark}" stroke-width="2"/><path d="M12 14 q6 -5 12 0 t12 0" fill="none" stroke="${C.boardLine}" stroke-width="1.2"/><rect x="2" y="30" width="${w - 4}" height="3" fill="${C.wood}"/>` + dblArrow(4, h - 6, w - 4, h - 6); break;
    case 'doorWidth':   // a door in its frame: the arrow across its width
      b += `<rect x="16" y="2" width="${w - 32}" height="${h - 3}" fill="${C.door}" stroke="${C.woodDark}" stroke-width="1.5"/><rect x="21" y="7" width="${w - 42}" height="12" fill="${C.glass}" stroke="${C.woodDark}" stroke-width="1"/><circle cx="${w - 21}" cy="${h / 2 + 4}" r="1.8" fill="${T.ink}"/>` + dblArrow(16, h / 2 + 11, w - 16, h / 2 + 11); break;
    case 'doorHeight':   // a door: the arrow beside it from the floor to its top
      b += `<rect x="20" y="2" width="${w - 32}" height="${h - 3}" fill="${C.door}" stroke="${C.woodDark}" stroke-width="1.5"/><rect x="25" y="7" width="${w - 42}" height="12" fill="${C.glass}" stroke="${C.woodDark}" stroke-width="1"/><circle cx="${w - 17}" cy="${h / 2 + 4}" r="1.8" fill="${T.ink}"/>` + dblArrow(10, 2, 10, h - 1); break;
    case 'sill':   // a window and its sill: the arrow along the sill, under it
      b += `<rect x="10" y="2" width="${w - 20}" height="26" fill="${C.glass}" stroke="${T.ink}" stroke-width="1.5"/><line x1="${w / 2}" y1="2" x2="${w / 2}" y2="28" stroke="${T.ink}" stroke-width="1.2"/><rect x="4" y="28" width="${w - 8}" height="5" rx="1" fill="${T.white}" stroke="${T.ink}" stroke-width="1.2"/>` + dblArrow(4, h - 6, w - 4, h - 6); break;
    case 'rug':   // a rug seen from above: the arrow along its length
      b += `<rect x="6" y="6" width="${w - 12}" height="22" rx="4" fill="${C.rug}" stroke="${C.rugDark}" stroke-width="1.5"/><rect x="11" y="10" width="${w - 22}" height="14" rx="3" fill="none" stroke="${C.rugDark}" stroke-width="1"/>` + dblArrow(6, h - 7, w - 6, h - 7); break;
    case 'cupboard':   // a cupboard: the arrow beside it from the floor to its top
      b += `<rect x="20" y="2" width="${w - 26}" height="${h - 4}" rx="1.5" fill="${C.wood}" stroke="${C.woodDark}" stroke-width="1.5"/><line x1="${f1(20 + (w - 26) / 2)}" y1="2" x2="${f1(20 + (w - 26) / 2)}" y2="${h - 2}" stroke="${C.woodDark}" stroke-width="1.2"/><circle cx="${f1(17 + (w - 26) / 2)}" cy="${h / 2}" r="1.4" fill="${T.ink}"/><circle cx="${f1(23 + (w - 26) / 2)}" cy="${h / 2}" r="1.4" fill="${T.ink}"/>` + dblArrow(10, 2, 10, h - 2); break;
    case 'room':   // the classroom from above: walls, the door gap, tables; the arrow along its long wall
      b += `<rect x="4" y="4" width="${w - 8}" height="28" fill="${T.cream}" stroke="${T.ink}" stroke-width="2"/><line x1="12" y1="32" x2="22" y2="32" stroke="${T.white}" stroke-width="3"/>` + [[14, 10], [30, 10], [46, 10], [14, 21], [30, 21], [46, 21]].map(([x, y]) => `<rect x="${x}" y="${y}" width="10" height="5" fill="${C.wood}" stroke="${C.woodDark}" stroke-width="0.8"/>`).join('') + dblArrow(4, h - 6, w - 4, h - 6); break;
    case 'roomShort':   // the classroom from above: the arrow along its SHORT wall (on the right)
      b += `<rect x="4" y="4" width="${w - 20}" height="${h - 8}" fill="${T.cream}" stroke="${T.ink}" stroke-width="2"/><line x1="10" y1="${h - 4}" x2="20" y2="${h - 4}" stroke="${T.white}" stroke-width="3"/>` + [[10, 9], [24, 9], [38, 9], [10, 20], [24, 20], [38, 20], [10, 31], [24, 31], [38, 31]].map(([x, y]) => `<rect x="${x}" y="${y}" width="9" height="5" fill="${C.wood}" stroke="${C.woodDark}" stroke-width="0.8"/>`).join('') + dblArrow(w - 8, 4, w - 8, h - 4); break;
    case 'corridor':   // a corridor: the floor between two walls with doors; the arrow across the floor
      b += `<path d="M2 ${h - 3} L22 12 L${w - 22} 12 L${w - 2} ${h - 3} Z" fill="${T.creamDeep}" stroke="${T.ink}" stroke-width="1.3"/><path d="M2 2 L22 12 L22 2 Z M${w - 2} 2 L${w - 22} 12 L${w - 22} 2 Z" fill="${T.cream}"/><line x1="22" y1="2" x2="22" y2="12" stroke="${T.ink}" stroke-width="1.3"/><line x1="${w - 22}" y1="2" x2="${w - 22}" y2="12" stroke="${T.ink}" stroke-width="1.3"/><path d="M8 8 L14 11 L14 24 L8 29 Z" fill="${C.door}" stroke="${C.woodDark}" stroke-width="0.8"/><path d="M${w - 8} 8 L${w - 14} 11 L${w - 14} 24 L${w - 8} 29 Z" fill="${C.door}" stroke="${C.woodDark}" stroke-width="0.8"/>` + dblArrow(9, h - 8, w - 9, h - 8); break;
    case 'bench':   // a bench in the Schulhof: the arrow along its seat, over it
      b += `<rect x="6" y="15" width="${w - 12}" height="5" rx="1.5" fill="${C.wood}" stroke="${C.woodDark}" stroke-width="1.2"/><rect x="6" y="25" width="${w - 12}" height="5" rx="1.5" fill="${C.wood}" stroke="${C.woodDark}" stroke-width="1.2"/>` + leg(12, 30, h - 3) + leg(w - 12, 30, h - 3) + `<rect x="10" y="20" width="3" height="5" fill="${C.woodDark}"/><rect x="${w - 13}" y="20" width="3" height="5" fill="${C.woodDark}"/>` + dblArrow(6, 7, w - 6, 7); break;
    case 'pingpong':   // a table-tennis table: the green top, the white middle line, the net; the arrow along it
      b += `<path d="M4 22 L${w - 4} 22 L${w - 10} 32 L10 32 Z" fill="${C.table}" stroke="${T.ink}" stroke-width="1.2"/><line x1="${w / 2}" y1="14" x2="${w / 2}" y2="32" stroke="${T.ink}" stroke-width="1.2"/><rect x="${w / 2 - 1.5}" y="14" width="3" height="10" fill="${C.net}" stroke="${T.ink}" stroke-width="0.8"/>` + leg(14, 32, h - 3) + leg(w - 14, 32, h - 3) + dblArrow(4, 7, w - 4, 7); break;
    default: throw new Error('e2-math-art: no thing ' + kind);
  }
  return artSvg(b, w, h, `data-e2-art="thing" data-e2-thingart="${kind}"`);
}

/* ================================================================ children (G1-674, G2-635) */
/** a child of the figure set, front view, smiling, `px` tall; look = the dk-social cast entry */
function child(look, px = 78, attrs = '') {
  const s = px / 66, w = Math.round(46 * s * 0.9);
  const p = K.person({ age: 'child', x: w / 2, y: px - 1, s, skin: look.skin, hair: look.hair, hairColor: look.hairColor, top: look.top, bottom: look.bottom, bottomColor: look.bottomColor, mood: 'smile' });
  return artSvg(p.svg, w, px + 2, `data-e2-art="child" data-e2-skin="${look.skin}"${attrs ? ' ' + attrs : ''}`);
}
/** a bubble's tail: a small triangle pointing left (to the child), drawn on the bubble's left edge */
const bubbleTail = (h = 16, w = 12) => artSvg(`<path d="M${w} 1 L1 ${h / 2} L${w} ${h - 1}" fill="${T.white}" stroke="${T.teal}" stroke-width="2.5" stroke-linejoin="round"/><line x1="${w}" y1="2.5" x2="${w}" y2="${h - 2.5}" stroke="${T.white}" stroke-width="3"/>`, w, h, 'data-e2-art="tail"');

module.exports = { PAL_E2, C, artSvg, dblArrow, storyPanel, storyLayout, SCENE_ROWS, STORY, storyArrow, tensLine, heart, bodyUnit, UNIT_ART, unitArt, BODY_PICS, toolArt, thingArt, child, bubbleTail, inkOf, f1, esc, text };
