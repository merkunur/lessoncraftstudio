/**
 * e2-math-sv-art.js — the drawings of Batch SV (Daily Teaching System Stage E-2, 2026-11-26; Swedish mathematics
 * förskoleklass to åk 3, factory e2-math-sv.js). Every drawing is an <svg data-lcs-prim="sk-art"> (the page lint leaves its
 * colours to this batch's gate, qa/verify-e2-sv.js, which holds every colour this file writes to PAL_SV).
 *
 *   measuring strip  a thing lying flat (penna, pensel, krita, bok, sked, tandborste) and under it one or two rows of
 *                    units laid end to end from its left end to its right end (klossar, gem, pinnar), with a dashed guide
 *                    at both ends (G1-676). Every length is a whole number of every unit in it: the thing's ink and each
 *                    row's ink start and end at the same x (each in its OWN ink, so the gate measures them in the PDF).
 *   number line      0-20 with a tick at every whole number, labels at every number / every five / 0, 10, 20 only, two
 *                    numbers marked and the jump from the smaller to the larger as an arc (G1-677)
 *   number signs     the Egyptian signs for 1 (a stroke), 10 (an arch, the hobble), 100 (a coiled rope), 1 000 (a lotus)
 *                    and an Egyptian number built from them, largest first (G3-647)
 *   real size        a pencil of a whole or half number of centimetres at its true size (96 px to the inch), its flat
 *                    rubber end and its sharp lead tip in their own inks (G3-652); the line plot over a number line in
 *                    half centimetres with its title and its scale (G3-652)
 * Pure functions; nothing here reads a picture or the cache while the module loads.
 */
'use strict';
const TOK = require('../../primitives/_tokens.js');
const E1 = require('./e1-math-art.js');

const T = TOK.color;
const { f1, esc, text } = E1;
const PX_MM = 96 / 25.4;   // the page's millimetre (the print pipeline prints CSS px at 96 to the inch)

/** every colour this file writes (the gate scans the source for hex values and refuses any other) */
const C = {
  // the measured inks (each role its own, so the PDF gate can find it): the thing's outline, the units' outlines
  THING: '#3A2E28', KLOSS: '#4B2A1C', GEM: '#3F5566', PINNE: '#6E4A26',
  // fills
  klossA: '#E4574B', klossB: '#4A7BD0', klossTop: '#FFFFFF', gemFill: '#DCE3EA', pinneFill: '#E8C89A', pinneDark: '#C9A06A',
  wood: '#E8C89A', woodDark: '#C98A4B', yellow: '#F4C542', yellowDark: '#D9A21C', pink: '#F2A3B5', silver: '#C7CED6', lead: '#3A3A3A',
  red: '#D9534F', redDark: '#9E2F2C', blue: '#4A7BD0', green: '#4FA36B', paper: '#FFF8E7', pageEdge: '#E9DFC8', handle: '#2AA3A3', bristle: '#F7F2E8',
  // number signs
  glyph: '#2B2724', lotusPetal: '#4FA36B',
  // the real-size pencil (G3-652): the rubber end and the lead tip in their own inks (the gate measures between them)
  REAL_RUBBER: '#EE9BB0', REAL_LEAD: '#26221F', realFerrule: '#B8C0C8', realWood: '#F0D3A6',
  // the line plot
  axis: '#2B2724',
};
/** the pencils' bodies (G3-652): data/e2sv PENCIL_COLOURS, repeated here so the palette holds them */
const PENCIL_BODY = [['#3E7CC9', '#24548F'], ['#D9534F', '#9E2F2C'], ['#4FA36B', '#2F6E44'], ['#8A63C7', '#5B3D8F'], ['#E3922B', '#A86414'], ['#2AA3A3', '#1A6E6E']];
const PAL_SV = new Set([...Object.values(C), ...PENCIL_BODY.flat(), T.cream, T.creamDeep, T.teal, T.tealSoft, T.coral, T.coralSoft, T.ink, T.inkSoft, T.white, T.grid].map((c) => c.toUpperCase()));

const artSvg = (body, w, h, attrs = '', vb = null) => `<svg xmlns="http://www.w3.org/2000/svg" width="${f1(w)}" height="${f1(h)}" viewBox="${vb || `0 0 ${f1(w)} ${f1(h)}`}" style="display:block;overflow:visible" data-lcs-prim="sk-art"${attrs ? ' ' + attrs : ''}>${body}</svg>`;
const r3 = (n) => (Math.round(n * 1000) / 1000).toString();

/* ================================================================ G1-676: a thing lying flat, x0 .. x0 + L, top y, height h */
/**
 * thingFlat(kind, x0, y, L, h): the outline in C.THING runs exactly from x0 to x0 + L (its own path's extremes), every
 * fill inside it. Every kind reads at any length the page gives it (the pencil and the brush grow in their bodies, the
 * book in its pages).
 */
function thingFlat(kind, x0, y, L, h) {
  const x1 = x0 + L, m = y + h / 2;
  const sw = 1.5, out = (d) => `<path d="${d}" fill="none" stroke="${C.THING}" stroke-width="${sw}" stroke-linejoin="round" data-sv-thing-outline="1"/>`;
  let b = '';
  if (kind === 'pencil') {
    // rubber 14, ferrule 8, body, wood cone 22, lead tip 7 (the tip a point at x1)
    const xr = x0 + 14, xf = xr + 8, xc = x1 - 29, xl = x1 - 7;
    b += `<rect x="${f1(x0)}" y="${f1(y)}" width="14" height="${f1(h)}" fill="${C.pink}"/><rect x="${f1(xr)}" y="${f1(y)}" width="8" height="${f1(h)}" fill="${C.silver}"/>` +
      `<rect x="${f1(xf)}" y="${f1(y)}" width="${f1(xc - xf)}" height="${f1(h)}" fill="${C.yellow}"/><line x1="${f1(xf)}" y1="${f1(m)}" x2="${f1(xc)}" y2="${f1(m)}" stroke="${C.yellowDark}" stroke-width="1.2"/>` +
      `<path d="M${f1(xc)} ${f1(y)} L${f1(xl)} ${f1(m - h * 0.16)} L${f1(xl)} ${f1(m + h * 0.16)} L${f1(xc)} ${f1(y + h)} Z" fill="${C.wood}"/><path d="M${f1(xl)} ${f1(m - h * 0.16)} L${f1(x1)} ${f1(m)} L${f1(xl)} ${f1(m + h * 0.16)} Z" fill="${C.lead}"/>`;
    b += out(`M${f1(x0)} ${f1(y)} L${f1(xc)} ${f1(y)} L${f1(x1)} ${f1(m)} L${f1(xc)} ${f1(y + h)} L${f1(x0)} ${f1(y + h)} Z M${f1(xr)} ${f1(y)} L${f1(xr)} ${f1(y + h)} M${f1(xf)} ${f1(y)} L${f1(xf)} ${f1(y + h)} M${f1(xc)} ${f1(y)} L${f1(xc)} ${f1(y + h)}`);
  } else if (kind === 'brush') {
    // a long thin handle (teal), the ferrule (silver), the bristles narrowing to a point at x1
    const hh = h * 0.5, hy = m - hh / 2, xf = x1 - 64, xb = x1 - 44;
    b += `<rect x="${f1(x0)}" y="${f1(hy)}" width="${f1(xf - x0)}" height="${f1(hh)}" fill="${C.handle}"/><path d="M${f1(xf)} ${f1(hy)} L${f1(xb)} ${f1(y + h * 0.18)} L${f1(xb)} ${f1(y + h * 0.82)} L${f1(xf)} ${f1(hy + hh)} Z" fill="${C.silver}"/>` +
      `<path d="M${f1(xb)} ${f1(y + h * 0.18)} L${f1(x1 - 12)} ${f1(m - h * 0.12)} L${f1(x1)} ${f1(m)} L${f1(x1 - 12)} ${f1(m + h * 0.12)} L${f1(xb)} ${f1(y + h * 0.82)} Z" fill="${C.woodDark}"/>`;
    b += out(`M${f1(x0)} ${f1(hy)} L${f1(xf)} ${f1(hy)} L${f1(xb)} ${f1(y + h * 0.18)} L${f1(x1 - 12)} ${f1(m - h * 0.12)} L${f1(x1)} ${f1(m)} L${f1(x1 - 12)} ${f1(m + h * 0.12)} L${f1(xb)} ${f1(y + h * 0.82)} L${f1(xf)} ${f1(hy + hh)} L${f1(x0)} ${f1(hy + hh)} Z M${f1(xf)} ${f1(hy)} L${f1(xf)} ${f1(hy + hh)} M${f1(xb)} ${f1(y + h * 0.18)} L${f1(xb)} ${f1(y + h * 0.82)}`);
  } else if (kind === 'crayon') {
    // a wax crayon: the paper wrapper with two bands, a cone and a blunt flat tip at x1
    const xc = x1 - 24, xt = x1 - 2;
    b += `<rect x="${f1(x0)}" y="${f1(y)}" width="${f1(xc - x0)}" height="${f1(h)}" fill="${C.blue}"/><rect x="${f1(x0 + 8)}" y="${f1(y)}" width="5" height="${f1(h)}" fill="${C.paper}"/><rect x="${f1(xc - 13)}" y="${f1(y)}" width="5" height="${f1(h)}" fill="${C.paper}"/>` +
      `<path d="M${f1(xc)} ${f1(y + 2)} L${f1(xt)} ${f1(m - 3)} L${f1(x1)} ${f1(m - 3)} L${f1(x1)} ${f1(m + 3)} L${f1(xt)} ${f1(m + 3)} L${f1(xc)} ${f1(y + h - 2)} Z" fill="${C.blue}"/>`;
    b += out(`M${f1(x0)} ${f1(y)} L${f1(xc)} ${f1(y)} L${f1(xc)} ${f1(y + 2)} L${f1(xt)} ${f1(m - 3)} L${f1(x1)} ${f1(m - 3)} L${f1(x1)} ${f1(m + 3)} L${f1(xt)} ${f1(m + 3)} L${f1(xc)} ${f1(y + h - 2)} L${f1(xc)} ${f1(y + h)} L${f1(x0)} ${f1(y + h)} Z`);
  } else if (kind === 'book') {
    // review round 1: a closed book lying flat, seen from above: the cover with a darker spine band at its left end, a
    // white title label with two lines of "title", and the white page edge showing along the bottom (the book is thick)
    const sp = Math.max(10, Math.min(16, L * 0.07)), pe = Math.max(4, h * 0.1), lw = Math.min(110, (L - sp) * 0.5), lx = x0 + sp + (L - sp - lw) / 2;
    b += `<rect x="${f1(x0)}" y="${f1(y)}" width="${f1(L)}" height="${f1(h)}" fill="${C.paper}"/>` +
      `<rect x="${f1(x0)}" y="${f1(y)}" width="${f1(L)}" height="${f1(h - pe)}" fill="${C.red}"/><rect x="${f1(x0)}" y="${f1(y)}" width="${f1(sp)}" height="${f1(h - pe)}" fill="${C.redDark}"/>` +
      `<rect x="${f1(lx)}" y="${f1(y + (h - pe) * 0.24)}" width="${f1(lw)}" height="${f1((h - pe) * 0.52)}" rx="2" fill="${C.paper}"/>` +
      [0.4, 0.6].map((q) => `<line x1="${f1(lx + lw * 0.15)}" y1="${f1(y + (h - pe) * q)}" x2="${f1(lx + lw * (q < 0.5 ? 0.85 : 0.6))}" y2="${f1(y + (h - pe) * q)}" stroke="${C.redDark}" stroke-width="2"/>`).join('') +
      [0.35, 0.7].map((q) => `<line x1="${f1(x0 + sp)}" y1="${f1(y + h - pe * q)}" x2="${f1(x1)}" y2="${f1(y + h - pe * q)}" stroke="${C.pageEdge}" stroke-width="0.8"/>`).join('');
    b += out(`M${f1(x0)} ${f1(y)} L${f1(x1)} ${f1(y)} L${f1(x1)} ${f1(y + h)} L${f1(x0)} ${f1(y + h)} Z M${f1(x0)} ${f1(y + h - pe)} L${f1(x1)} ${f1(y + h - pe)}`);
  } else if (kind === 'spoon') {
    // a wooden spoon: a straight handle, the bowl an ellipse whose right end is x1
    const bw = Math.min(70, L * 0.34), cx = x1 - bw / 2, hh = h * 0.32;
    b += `<rect x="${f1(x0)}" y="${f1(m - hh / 2)}" width="${f1(cx - x0)}" height="${f1(hh)}" fill="${C.wood}"/><ellipse cx="${f1(cx)}" cy="${f1(m)}" rx="${f1(bw / 2)}" ry="${f1(h / 2)}" fill="${C.wood}"/><ellipse cx="${f1(cx + 2)}" cy="${f1(m)}" rx="${f1(bw / 2 - 6)}" ry="${f1(h / 2 - 5)}" fill="${C.woodDark}" opacity="0.35"/>`;
    b += out(`M${f1(x0)} ${f1(m - hh / 2)} L${f1(cx - bw / 2 + 2)} ${f1(m - hh / 2)} M${f1(x0)} ${f1(m + hh / 2)} L${f1(cx - bw / 2 + 2)} ${f1(m + hh / 2)} M${f1(x0)} ${f1(m - hh / 2)} L${f1(x0)} ${f1(m + hh / 2)}`) +
      `<ellipse cx="${f1(cx)}" cy="${f1(m)}" rx="${f1(bw / 2)}" ry="${f1(h / 2)}" fill="none" stroke="${C.THING}" stroke-width="${sw}" data-sv-thing-outline="1"/>`;
  } else if (kind === 'toothbrush') {
    // a toothbrush lying flat: the handle (teal, wider at its end), a thin neck, the head at the right end with white
    // tufts standing up on it; the outline runs exactly from x0 to x1
    const hw = 40, xh = x1 - hw, xn = xh - 26, base = y + h, hTop = base - h * 0.42, nTop = base - h * 0.27, headTop = base - h * 0.36;
    const d = `M${f1(x0)} ${f1(hTop)} L${f1(xn)} ${f1(nTop + 1)} L${f1(xh)} ${f1(nTop)} L${f1(xh)} ${f1(headTop)} L${f1(x1)} ${f1(headTop)} L${f1(x1)} ${f1(base)} L${f1(x0)} ${f1(base)} Z`;
    b += `<path d="${d}" fill="${C.handle}"/>` +
      Array.from({ length: 6 }, (_, k) => `<rect x="${f1(xh + 3 + k * 6)}" y="${f1(y + 1)}" width="4.2" height="${f1(headTop - y - 1)}" rx="1" fill="${C.bristle}" stroke="${C.blue}" stroke-width="0.8"/>`).join('');
    b += out(d);
  } else throw new Error('e2-math-sv-art: no thing ' + kind);
  return `<g data-sv-thing="${kind}" data-sv-x0="${r3(x0)}" data-sv-len="${r3(L)}">${b}</g>`;
}
/** one unit, slot x .. x + u at height y; i = its place in the row (klossar alternate two colours to be counted) */
function unitShape(kind, x, y, u, i) {
  if (kind === 'kloss') {
    const h = 24;
    return `<g data-sv-unit="kloss"><rect x="${r3(x)}" y="${f1(y)}" width="${r3(u)}" height="${h}" fill="${i % 2 ? C.klossB : C.klossA}" stroke="${C.KLOSS}" stroke-width="1.4"/><rect x="${r3(x + 3)}" y="${f1(y + 3)}" width="${r3(u - 6)}" height="4" rx="1.5" fill="${C.klossTop}" opacity="0.55"/></g>`;
  }
  if (kind === 'gem') {
    // a paper clip lying flat, one wire: the inner line (L2) to the small loop on the left, along L3 to the loop on the
    // right, back along the top (L1) to the big loop on the left, and out along the bottom (L4). It runs x .. x + u.
    const h = 13, r1 = h / 2, r2 = (h - 3.5) / 2, ri = (h - 7) / 2;
    const d = `M${r3(x + u - 9)} ${r3(y + 3.5)} L${r3(x + 9)} ${r3(y + 3.5)} A${r3(ri)} ${r3(ri)} 0 0 0 ${r3(x + 9)} ${r3(y + h - 3.5)} L${r3(x + u - r2)} ${r3(y + h - 3.5)} A${r3(r2)} ${r3(r2)} 0 0 0 ${r3(x + u - r2)} ${r3(y)} L${r3(x + r1)} ${r3(y)} A${r3(r1)} ${r3(r1)} 0 0 0 ${r3(x + r1)} ${r3(y + h)} L${r3(x + u - 10)} ${r3(y + h)}`;
    return `<g data-sv-unit="gem"><path d="${d}" fill="none" stroke="${C.GEM}" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></g>`;
  }
  if (kind === 'pinne') {
    const h = 11;
    return `<g data-sv-unit="pinne"><rect x="${r3(x)}" y="${f1(y)}" width="${r3(u)}" height="${h}" rx="5.5" fill="${C.pinneFill}" stroke="${C.PINNE}" stroke-width="1.4"/><line x1="${r3(x + 8)}" y1="${f1(y + h / 2)}" x2="${r3(x + u - 8)}" y2="${f1(y + h / 2)}" stroke="${C.pinneDark}" stroke-width="1"/></g>`;
  }
  throw new Error('e2-math-sv-art: no unit ' + kind);
}
const UNIT_H = { kloss: 24, gem: 13, pinne: 11 };
/**
 * A thing and its unit rows: the thing (height th) at x0 .. x0 + L, then each row's units from x0, `gap` px apart; a
 * dashed guide at x0 and at x0 + L through all of it. Returns the svg (w x h) and where each row sits.
 */
function measureStrip({ kind, L, rows, w = 560, th = 26, gap = 9, x0 = 14 }) {
  let y = 4, b = '';
  const yThing = y; y += th + gap;
  const rowY = rows.map((r) => { const at = y; y += UNIT_H[r.unit] + gap; return at; });
  const h = y + 2;
  // the guides first (under everything)
  b += [x0, x0 + L].map((x, k) => `<line x1="${r3(x)}" y1="1" x2="${r3(x)}" y2="${f1(h - 1)}" stroke="${T.inkSoft}" stroke-width="1.2" stroke-dasharray="3 3" data-sv-guide="${k}"/>`).join('');
  b += thingFlat(kind, x0, yThing, L, th);
  rows.forEach((r, k) => {
    let g = '';
    for (let i = 0; i < r.n; i++) g += unitShape(r.unit, x0 + i * r.px, rowY[k], r.px, i);
    b += `<g data-sv-row="${k}" data-sv-rowunit="${r.unit}" data-sv-rown="${r.n}" data-sv-rowpx="${r3(r.px)}">${g}</g>`;
  });
  return artSvg(b, w, h, `data-sv-art="strip" data-sv-kind="${kind}" data-sv-len="${r3(L)}"`);
}

/* ================================================================ G1-677: the number line 0-20 */
/**
 * numberLine20({ a, b, labels, marks, arc, w }): labels 'all' (every number), 'fives' (0 5 10 15 20) or 'ends' (0 10 20);
 * marks = the two numbers drawn as coral dots (their numbers printed over them when not every number is labelled);
 * arc = the jump from a to b drawn over the line.
 */
function numberLine20({ a, b, labels = 'all', marks = true, arc = true, w = 640, h = 78 }) {
  const x0 = 18, x1 = w - 18, step = (x1 - x0) / 20, y = h - 26;
  const X = (n) => x0 + n * step;
  let s = `<line x1="${f1(x0 - 8)}" y1="${y}" x2="${f1(x1 + 8)}" y2="${y}" stroke="${T.ink}" stroke-width="2.4" stroke-linecap="round" data-sv-axis="1"/>`;
  for (let n = 0; n <= 20; n++) {
    const big = n % 5 === 0, t = n % 10 === 0 ? 9 : big ? 7 : 5;
    s += `<line x1="${f1(X(n))}" y1="${y - t}" x2="${f1(X(n))}" y2="${y + t}" stroke="${T.ink}" stroke-width="${big ? 2 : 1.4}" data-sv-tick="${n}"/>`;
    const show = labels === 'all' || (labels === 'fives' && n % 5 === 0) || (labels === 'ends' && n % 10 === 0);
    if (show) s += text(X(n), y + 19, String(n), 15, { attrs: `data-sv-ticklabel="${n}"` });
  }
  if (arc) {
    const xa = X(a), xb = X(b), top = y - 16 - Math.min(26, 8 + (b - a) * 5);
    s += `<path d="M${f1(xa)} ${y - 5} Q${f1((xa + xb) / 2)} ${f1(top)} ${f1(xb - 1)} ${y - 6}" fill="none" stroke="${T.coral}" stroke-width="2.6" stroke-linecap="round" data-sv-arc="${a}-${b}"/>` +
      `<path d="M${f1(xb - 8)} ${y - 11} L${f1(xb - 1)} ${y - 5} L${f1(xb - 2)} ${y - 14}" fill="none" stroke="${T.coral}" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>`;
  }
  if (marks) for (const n of [a, b]) {
    s += `<circle cx="${f1(X(n))}" cy="${y}" r="5.5" fill="${T.coral}" stroke="${T.ink}" stroke-width="1.2" data-sv-mark="${n}"/>`;
    if (labels !== 'all') s += `<rect x="${f1(X(n) - 11)}" y="${y + 8}" width="22" height="20" fill="${T.white}"/>` + text(X(n), y + 19, String(n), 15, { fill: T.coral, attrs: `data-sv-marklabel="${n}"` });
  }
  return artSvg(s, w, h, `data-sv-art="line20" data-sv-labels="${labels}"${marks ? ` data-sv-a="${a}" data-sv-b="${b}"` : ''}`);
}

/* ================================================================ G3-647: the Egyptian number signs */
/** one sign with its top-left at (x, y), s = the height of a stroke (the other signs are sized from it) */
function glyph(kind, x, y, s) {
  const sw = Math.max(2.2, s * 0.1);
  if (kind === 'stroke') return `<rect x="${f1(x + s * 0.08)}" y="${f1(y)}" width="${f1(s * 0.13)}" height="${f1(s)}" rx="${f1(s * 0.06)}" fill="${C.glyph}" data-sv-glyph="stroke"/>`;
  if (kind === 'heel') {
    // the hobble for cattle: an arch, open at the bottom
    const w = s * 0.62, x0 = x + 1, y0 = y + s * 0.18;
    return `<path d="M${f1(x0)} ${f1(y + s)} L${f1(x0)} ${f1(y0 + w / 2)} A${f1(w / 2)} ${f1(w / 2)} 0 0 1 ${f1(x0 + w)} ${f1(y0 + w / 2)} L${f1(x0 + w)} ${f1(y + s)}" fill="none" stroke="${C.glyph}" stroke-width="${f1(sw)}" stroke-linecap="round" data-sv-glyph="heel"/>`;
  }
  if (kind === 'coil') {
    // a coiled rope: a spiral of three turns and its end hanging down
    const cx = x + s * 0.5, cy = y + s * 0.47, R = s * 0.47;
    let d = `M${f1(cx)} ${f1(cy)}`;
    for (let k = 1; k <= 48; k++) { const a = k / 48 * Math.PI * 5, r = R * k / 48; d += ` L${f1(cx + r * Math.cos(a))} ${f1(cy + r * Math.sin(a))}`; }
    return `<path d="${d}" fill="none" stroke="${C.glyph}" stroke-width="${f1(sw * 0.85)}" stroke-linecap="round" stroke-linejoin="round" data-sv-glyph="coil"/><path d="M${f1(cx - R * 0.95)} ${f1(cy + R * 0.3)} Q${f1(cx - R * 1.05)} ${f1(y + s)} ${f1(cx - R * 0.55)} ${f1(y + s)}" fill="none" stroke="${C.glyph}" stroke-width="${f1(sw * 0.85)}" stroke-linecap="round"/>`;
  }
  if (kind === 'lotus') {
    // a lotus (water lily) on its stem: the stem bending at the foot, a flower of three petals on top
    const cx = x + s * 0.4, top = y - s * 0.3;
    return `<g data-sv-glyph="lotus"><path d="M${f1(cx)} ${f1(top + s * 0.42)} L${f1(cx)} ${f1(y + s * 0.85)} Q${f1(cx)} ${f1(y + s)} ${f1(cx + s * 0.3)} ${f1(y + s)}" fill="none" stroke="${C.glyph}" stroke-width="${f1(sw)}" stroke-linecap="round"/>` +
      `<path d="M${f1(cx)} ${f1(top + s * 0.45)} Q${f1(cx - s * 0.42)} ${f1(top + s * 0.25)} ${f1(cx - s * 0.32)} ${f1(top)} Q${f1(cx - s * 0.1)} ${f1(top + s * 0.22)} ${f1(cx)} ${f1(top + s * 0.45)} Z" fill="${C.lotusPetal}" stroke="${C.glyph}" stroke-width="1.4"/>` +
      `<path d="M${f1(cx)} ${f1(top + s * 0.45)} Q${f1(cx + s * 0.42)} ${f1(top + s * 0.25)} ${f1(cx + s * 0.32)} ${f1(top)} Q${f1(cx + s * 0.1)} ${f1(top + s * 0.22)} ${f1(cx)} ${f1(top + s * 0.45)} Z" fill="${C.lotusPetal}" stroke="${C.glyph}" stroke-width="1.4"/>` +
      `<path d="M${f1(cx)} ${f1(top + s * 0.42)} Q${f1(cx - s * 0.13)} ${f1(top + s * 0.1)} ${f1(cx)} ${f1(top - s * 0.08)} Q${f1(cx + s * 0.13)} ${f1(top + s * 0.1)} ${f1(cx)} ${f1(top + s * 0.42)} Z" fill="${C.lotusPetal}" stroke="${C.glyph}" stroke-width="1.4"/></g>`;
  }
  throw new Error('e2-math-sv-art: no glyph ' + kind);
}
/** how wide one sign of each kind is, at stroke height s */
const GLYPH_W = { stroke: 0.3, heel: 0.75, coil: 1.0, lotus: 0.85 };
/**
 * an Egyptian number, largest first (left): each value's signs in one row, or two rows when there are five or more (the
 * upper row the larger half), groups apart. s = the stroke height. Returns { svg, w, h }.
 */
function egyptNumber(n, s = 24, attrs = '') {
  const parts = [[1000, 'lotus'], [100, 'coil'], [10, 'heel'], [1, 'stroke']];
  let rest = n, x = 2, b = '';
  const top = s * 0.34, rowGap = s * 0.18, twoH = 2 * s + rowGap;
  const groups = [];
  for (const [v, kind] of parts) { const k = Math.floor(rest / v); rest -= k * v; if (k) groups.push({ kind, k, v }); }
  const tall = groups.some((g) => g.k >= 5);
  const H = top + (tall ? twoH : s) + 2;
  for (const g of groups) {
    const gw = GLYPH_W[g.kind] * s + s * 0.12;
    const rowsK = g.k >= 5 ? [Math.ceil(g.k / 2), Math.floor(g.k / 2)] : [g.k];
    const y0 = top + (tall && rowsK.length === 1 ? (twoH - s) / 2 : 0);
    let gwMax = 0;
    rowsK.forEach((cnt, r) => { for (let i = 0; i < cnt; i++) b += glyph(g.kind, x + i * gw, y0 + r * (s + rowGap), s); gwMax = Math.max(gwMax, cnt * gw); });
    b += `<g data-sv-group="${g.v}" data-sv-count="${g.k}"></g>`;
    x += gwMax + s * 0.45;
  }
  const w = x - s * 0.45 + 4;
  return { svg: artSvg(b, w, H, `data-sv-art="egypt" data-sv-value="${n}"${attrs ? ' ' + attrs : ''}`), w, h: H };
}
/** the key's sign for one value, with its height s */
const egyptSign = (kind, s = 26) => artSvg(glyph(kind, 2, s * 0.34, s), GLYPH_W[kind] * s + 6, s * 1.36, `data-sv-art="sign" data-sv-sign="${kind}"`);

/* ================================================================ G3-652: real size */
/**
 * a pencil len mm long at its true size: the rubber (REAL_RUBBER) a flat end at x = pad, the lead (REAL_LEAD) a point at
 * x = pad + len mm. Fills only, no stroke at either end, so the ink is exactly the length (the gate measures it in the PDF).
 */
function realPencil(mm, colour, pad = 4, attrs = '') {
  const L = mm * PX_MM, H = 7 * PX_MM, h = H + 8, y = 4, m = y + H / 2;
  const rub = 5 * PX_MM, fer = 3 * PX_MM, cone = 7 * PX_MM, lead = 2.5 * PX_MM;
  const x0 = pad, xr = x0 + rub, xf = xr + fer, xc = x0 + L - cone, xl = x0 + L - lead;
  const [body, edge] = colour;
  const s = `<rect x="${r3(x0)}" y="${r3(y)}" width="${r3(rub)}" height="${r3(H)}" fill="${C.REAL_RUBBER}" data-sv-real="rubber"/>` +
    `<rect x="${r3(xr)}" y="${r3(y)}" width="${r3(fer)}" height="${r3(H)}" fill="${C.realFerrule}"/>` +
    `<rect x="${r3(xf)}" y="${r3(y)}" width="${r3(xc - xf)}" height="${r3(H)}" fill="${body}"/><rect x="${r3(xf)}" y="${r3(y + H * 0.42)}" width="${r3(xc - xf)}" height="${r3(H * 0.16)}" fill="${edge}"/>` +
    `<path d="M${r3(xc)} ${r3(y)} L${r3(xl)} ${r3(m - H * 0.17)} L${r3(xl)} ${r3(m + H * 0.17)} L${r3(xc)} ${r3(y + H)} Z" fill="${C.realWood}"/>` +
    `<path d="M${r3(xl)} ${r3(m - H * 0.17)} L${r3(x0 + L)} ${r3(m)} L${r3(xl)} ${r3(m + H * 0.17)} Z" fill="${C.REAL_LEAD}" data-sv-real="lead"/>`;
  return artSvg(s, L + 2 * pad, h, `data-sv-art="real-pencil" data-sv-mm="${mm}" data-sv-pad="${pad}"${attrs ? ' ' + attrs : ''}`);
}
/** the comma a Swedish class writes: 7,5 */
const cm = (v) => (Number.isInteger(v) ? String(v) : String(v).replace('.', ','));
/**
 * the line plot: a number line from lo to hi in half centimetres (a tick at every half, a longer one at every whole),
 * labels at every half ('all') or every whole ('whole'), room above for the crosses; the title above, the axis word below.
 */
function linePlot({ lo, hi, labels = 'whole', w = 640, room = 5, title, axis }) {
  const n = Math.round((hi - lo) * 2), x0 = 34, x1 = w - 34, step = (x1 - x0) / n, cross = 17;
  const yTitle = 16, yLine = 30 + room * cross + 6, h = yLine + 48;
  let s = text(w / 2, yTitle, title, 18, { fill: T.teal, attrs: 'data-sv-plottitle="1"' });
  s += `<line x1="${f1(x0 - 14)}" y1="${f1(yLine)}" x2="${f1(x1 + 14)}" y2="${f1(yLine)}" stroke="${C.axis}" stroke-width="2.4" stroke-linecap="round" data-sv-plotaxis="1"/>`;
  for (let k = 0; k <= n; k++) {
    const v = lo + k / 2, whole = k % 2 === 0, x = x0 + k * step, t = whole ? 8 : 5;
    s += `<line x1="${f1(x)}" y1="${f1(yLine - t)}" x2="${f1(x)}" y2="${f1(yLine + t)}" stroke="${C.axis}" stroke-width="${whole ? 2 : 1.4}" data-sv-ptick="${v}"/>`;
    if (labels === 'all' || whole) s += text(x, yLine + 20, cm(v), whole ? 16 : 14, { attrs: `data-sv-plabel="${v}"` });
  }
  s += text(w / 2, yLine + 40, axis, 15, { fill: T.inkSoft, attrs: 'data-sv-plotaxisword="1"' });
  return artSvg(s, w, h, `data-sv-art="lineplot" data-sv-lo="${lo}" data-sv-hi="${hi}" data-sv-step="${f1(step)}" data-sv-room="${room}"`);
}

module.exports = { PAL_SV, C, PENCIL_BODY, PX_MM, artSvg, thingFlat, unitShape, UNIT_H, measureStrip, numberLine20, glyph, GLYPH_W, egyptNumber, egyptSign, realPencil, linePlot, cm, f1, esc, text };
