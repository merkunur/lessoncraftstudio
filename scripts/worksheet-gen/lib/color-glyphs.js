/**
 * color-glyphs.js — the colouring alphabet and numbers (docs/makers/FLAGSHIP.md): fat, round letters and digits to colour, from
 * data/fl/glyphs.json (tools/fl-glyphs.js: every letter of the 11 languages and the ten digits).
 *
 *   glyph(ch, { h, skin, seed, stroke })   one character as an inline <svg>, h px tall → { svg, w, h }
 *   word(text, { h, maxW, skin, seed, gap, tight })  a row of characters → { svg, w, h, px } (px = the height that fits
 *                                           maxW; tight = the box hugs the text's ink instead of a whole line's height)
 *   has(text)                               can every character of this text be drawn?
 *   SKINS                                   the dresses of a letter
 * Skins: plain · face (a friendly face in the letter's deepest place) · dots · stripes · hearts · stars · waves · zigzag · scales
 * · friend (a face and two feet). A pattern is drawn inside the letter, in closed shapes a child can colour one by one.
 */
'use strict';
const path = require('path');
const platform = require('./platform/index.js');

const FILE = path.join(__dirname, '..', 'data', 'fl', 'glyphs.json');
let _G = null;
const G = () => (_G = _G || platform.readJson(FILE));
const INK = '#141414';
const SKINS = ['plain', 'dots', 'stripes', 'hearts', 'stars', 'waves', 'zigzag', 'scales'];
const n1 = (v) => +(+v).toFixed(1);
const has = (text) => [...String(text)].every((c) => c === ' ' || !!G().g[c]);

function star(x, y, R) { const p = []; for (let i = 0; i < 10; i++) { const a = (-90 + i * 36) * Math.PI / 180, q = i % 2 ? R * 0.48 : R; p.push(`${n1(x + q * Math.cos(a))} ${n1(y + q * Math.sin(a))}`); } return `M${p.join('L')}Z`; }
function heart(x, y, S) { return `M${x} ${n1(y + S * 0.9)}C${n1(x - S * 1.5)} ${n1(y - S * 0.1)} ${n1(x - S * 0.75)} ${n1(y - S * 1.05)} ${x} ${n1(y - S * 0.35)}C${n1(x + S * 0.75)} ${n1(y - S * 1.05)} ${n1(x + S * 1.5)} ${n1(y - S * 0.1)} ${x} ${n1(y + S * 0.9)}Z`; }

/** the pattern of a skin over the box, in glyph units; sw = the line weight */
function pattern(skin, b, sw) {
  const [x0, y0, x1, y1] = b, st = `fill="none" stroke="${INK}" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round"`;
  const grid = (step, fn) => { const out = []; let r = 0; for (let y = y0; y < y1 + step; y += step, r++) for (let x = x0 - (r % 2 ? step / 2 : 0); x < x1 + step; x += step) out.push(fn(n1(x), n1(y))); return out.join(''); };
  switch (skin) {
    case 'dots': return grid(170, (x, y) => `<circle cx="${x}" cy="${y}" r="46" ${st}/>`);
    case 'hearts': return grid(190, (x, y) => `<path d="${heart(x, y, 44)}" ${st}/>`);
    case 'stars': return grid(190, (x, y) => `<path d="${star(x, y, 58)}" ${st}/>`);
    case 'stripes': { const out = []; for (let k = -1200; k < 1800; k += 130) out.push(`<path d="M${x0 + k} ${y1 + 80}L${x0 + k + (y1 - y0) + 160} ${y0 - 80}" ${st}/>`); return out.join(''); }
    case 'waves': { const out = []; for (let y = y0; y < y1 + 120; y += 120) { let d = `M${x0 - 120} ${y}`; for (let x = x0 - 120; x < x1 + 120; x += 160) d += `q40 -60 80 0t80 0`; out.push(`<path d="${d}" ${st}/>`); } return out.join(''); }
    case 'zigzag': { const out = []; for (let y = y0; y < y1 + 130; y += 130) { let d = `M${x0 - 120} ${y}`; for (let x = x0 - 120; x < x1 + 120; x += 120) d += `l60 -56l60 56`; out.push(`<path d="${d}" ${st}/>`); } return out.join(''); }
    case 'scales': { const out = []; let r = 0; for (let y = y0 - 60; y < y1 + 120; y += 82, r++) for (let x = x0 - 140 + (r % 2 ? 82 : 0); x < x1 + 140; x += 164) out.push(`<path d="M${x - 82} ${y}a82 82 0 0 0 164 0" ${st}/>`); return out.join(''); }
    default: return '';
  }
}
/** the parts of one character, in glyph units */
function parts(ch, skin, sw) {
  const g = G().g[ch];
  if (!g) throw new Error('color-glyphs: no glyph for "' + ch + '"');
  const id = 'lcg' + ch.codePointAt(0).toString(16);   // from the character: Node and the browser must print the same page
  const outline = `<path d="${g.d}" fill="#fff" fill-rule="evenodd" stroke="${INK}" stroke-width="${sw}" stroke-linejoin="round"/>`;
  const inner = pattern(skin, [g.x0, g.y0, g.x1, g.y1], sw * 0.72);
  const clip = inner ? `<clipPath id="${id}"><path d="${g.d}" clip-rule="evenodd"/></clipPath><g clip-path="url(#${id})">${inner}</g><path d="${g.d}" fill="none" stroke="${INK}" stroke-width="${sw}" stroke-linejoin="round"/>` : '';
  return outline + clip;
}

/** the skin of letter i of a run: one skin, or walking a list */
const skinAt = (skin, i) => (Array.isArray(skin) ? skin[i % skin.length] : skin || 'plain');

function glyph(ch, o = {}) {
  const g = G().g[ch];
  if (!g) throw new Error('color-glyphs: no glyph for "' + ch + '"');
  const skin = skinAt(o.skin, o.i || 0), h = o.h || 200;
  const top = g.y0 - 20, bottom = g.y1 + 20, left = g.x0 - 20, right = g.x1 + 20;
  const k = h / (bottom - top), w = Math.ceil((right - left) * k), sw = (o.stroke || 3.2) / k;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="${left} ${top} ${right - left} ${bottom - top}" data-lcs-prim="color-glyph" data-lcs-glyph="${ch === '"' ? '&quot;' : ch}"${o.attrs || ''} style="display:block">${parts(ch, skin, n1(sw))}</svg>`;
  return { svg, w, h };
}

/** a row of characters on one baseline; px = the height that keeps the row inside maxW */
function word(text, o = {}) {
  const gs = G(), chars = [...String(text)];
  // room for marks and descenders; tight: the box hugs this text's own ink (20 units round it, as glyph() does) — a lone
  // big number drawn on a whole line left a third of its box blank under the digits (2026-11-10, K-580 / K-610 / K-611)
  const ink = chars.filter((c) => c !== ' ');
  const cap = 'H', top = o.tight && ink.length ? Math.min(...ink.map((c) => gs.g[c].y0)) - 20 : gs.g[cap].y0 - 150;
  const bottom = o.tight && ink.length ? Math.max(...ink.map((c) => gs.g[c].y1)) + 20 : gs.base + 240;
  const adv = (c) => (c === ' ' ? 300 : gs.g[c].x1 - gs.g[c].x0 + 44);
  const units = chars.reduce((a, c) => a + adv(c), 0);
  let px = o.h || 120;
  if (o.maxW) px = Math.min(px, o.maxW / units * (bottom - top));
  const k = px / (bottom - top), sw = (o.stroke || 3) / k;
  let x = 0; const parts2 = [];
  chars.forEach((c, i) => {
    if (c === ' ') { x += adv(c); return; }
    const g = gs.g[c];
    parts2.push(`<g transform="translate(${n1(x - g.x0 + 22)} 0)" data-lcs-glyph-at="${i}"${o.attrsAt ? o.attrsAt(i, c) : ''}>${parts(c, skinAt(o.skin, i), n1(sw))}</g>`);
    x += adv(c);
  });
  const w = Math.ceil(units * k);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${Math.ceil(px)}" viewBox="0 ${top} ${units} ${bottom - top}" data-lcs-prim="color-word" style="display:block">${parts2.join('')}</svg>`;
  // uw / uh: the box in glyph units, so a caller can draw two words at ONE scale (h = k × uh for each)
  return { svg, w, h: Math.ceil(px), px, uw: units, uh: bottom - top };
}
/** a glyph's closed lines in glyph units, the biggest first: [{ pts:[[x,y]…], area }] (M, C, L and Z, absolute) */
function contours(ch) {
  const g = G().g[ch];
  if (!g) throw new Error('color-glyphs: no glyph for "' + ch + '"');
  const tok = g.d.match(/[MCLZ]|-?[0-9.]+/g), out = [];
  let cur = null, i = 0, x = 0, y = 0, cmd = '';
  const num = () => parseFloat(tok[i++]);
  while (i < tok.length) {
    if (/[MCLZ]/.test(tok[i])) cmd = tok[i++];
    if (cmd === 'Z') { if (cur) out.push(cur); cur = null; continue; }
    if (cmd === 'M') { x = num(); y = num(); cur = [[x, y]]; cmd = 'L'; continue; }
    if (cmd === 'L') { x = num(); y = num(); cur.push([x, y]); continue; }
    const a = num(), b = num(), c = num(), d = num(), e = num(), f = num();
    for (let k = 1; k <= 10; k++) { const t = k / 10, u = 1 - t; cur.push([u * u * u * x + 3 * u * u * t * a + 3 * u * t * t * c + t * t * t * e, u * u * u * y + 3 * u * u * t * b + 3 * u * t * t * d + t * t * t * f]); }
    x = e; y = f;
  }
  if (cur) out.push(cur);
  const area = (p) => p.reduce((s2, q, j) => { const r = p[(j + 1) % p.length]; return s2 + q[0] * r[1] - r[0] * q[1]; }, 0) / 2;
  return out.map((pts) => ({ pts, area: area(pts) })).sort((p, q) => Math.abs(q.area) - Math.abs(p.area));
}

/**
 * n dots round a glyph's outer line, clockwise, dot 1 at its top: evenly spaced, each moved onto a corner within half a step,
 * so a letter keeps its corners at any count. → [[x,y]…] in glyph units
 */
function outlineDots(ch, n) {
  let p = contours(ch)[0].pts.slice();
  if (contours(ch)[0].area < 0) p.reverse();
  let top = 0; p.forEach((q, i) => { if (q[1] + q[0] * 0.15 < p[top][1] + p[top][0] * 0.15) top = i; });
  p = p.slice(top).concat(p.slice(0, top));
  const L = [0]; for (let i = 1; i <= p.length; i++) { const a = p[i - 1], b = p[i % p.length]; L.push(L[i - 1] + Math.hypot(b[0] - a[0], b[1] - a[1])); }
  const total = L[p.length], step = total / n, W = Math.max(3, Math.round(p.length * 0.012));
  const turn = p.map((q, i) => { const a = p[(i - W + p.length) % p.length], b = p[(i + W) % p.length]; const u = Math.atan2(q[1] - a[1], q[0] - a[0]), v = Math.atan2(b[1] - q[1], b[0] - q[0]); let d = Math.abs(u - v); if (d > Math.PI) d = 2 * Math.PI - d; return d; });
  void step;
  let corners = []; turn.forEach((t, i) => { if (t > 0.75 && t >= turn[(i - 1 + p.length) % p.length] && t > turn[(i + 1) % p.length]) corners.push(i); });
  const at = (s) => { s = ((s % total) + total) % total; let i = 0; while (i < p.length - 1 && L[i + 1] < s) i++; const a = p[i], b = p[(i + 1) % p.length], t = (s - L[i]) / ((L[i + 1] - L[i]) || 1); return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t]; };
  // EVERY corner of the letter is a dot (flagship visual check 2026-11-08: dots spread evenly snapped to a corner only when one
  // lay near the spacing, so an M lost its inner V, an S its turns, an E its middle arm); the first point (top, start dot) is
  // one too; the remaining dots share out the runs between them by length. Too many corners for n: the sharpest n stay.
  corners = corners.filter((c) => c !== 0 && L[c] > 1e-6);
  // two corners closer than 0.45 of the even spacing (a rounded corner read twice, a bubble letter's narrow notch) keep the
  // sharper one: closer dots leave no room for their numbers
  const gap = 0.45 * total / n, arc = (a, b) => { const d = Math.abs(L[a] - L[b]); return Math.min(d, total - d); };
  const keep = [];
  for (const c of corners.slice().sort((a, b) => turn[b] - turn[a])) if (arc(c, 0) >= gap && keep.every((k) => arc(c, k) >= gap)) keep.push(c);
  corners = keep.sort((a, b) => a - b);
  if (corners.length > n - 1) corners = corners.slice().sort((a, b) => turn[b] - turn[a]).slice(0, n - 1).sort((a, b) => a - b);
  const anchors = [0].concat(corners).map((i) => L[i]);
  const segs = anchors.map((s, i) => [s, i + 1 < anchors.length ? anchors[i + 1] : total]);
  const free = n - anchors.length, lens = segs.map(([a, b]) => b - a), sum = lens.reduce((x, y) => x + y, 0) || 1;
  const share = lens.map((l) => (l / sum) * free), extra = share.map(Math.floor);
  let left = free - extra.reduce((x, y) => x + y, 0);
  share.map((v, i) => [v - Math.floor(v), i]).sort((a, b) => b[0] - a[0]).forEach(([, i]) => { if (left > 0) { extra[i]++; left--; } });
  const out = [];
  segs.forEach(([a, b], i) => { out.push(at(a)); for (let j = 1; j <= extra[i]; j++) out.push(at(a + ((b - a) * j) / (extra[i] + 1))); });
  return out;
}

/** a character as dashes to trace: its outlines dashed (dash, gap in px at h), the start of the outer line marked. → { svg, w, h } */
function dashed(ch, o = {}) {
  // o.maxW: a wide character (W, M) is drawn smaller so it fits the width (flagship visual check 2026-11-08: a giant W at
  // 640 px high ran off both sides of the page)
  if (o.maxW) { const g0 = G().g[ch], w0 = Math.ceil(((g0.x1 - g0.x0) + 60) * (o.h || 500) / ((g0.y1 - g0.y0) + 60)); if (w0 > o.maxW) return dashed(ch, { ...o, h: Math.floor((o.h || 500) * o.maxW / w0), maxW: null }); }
  const g = G().g[ch], h = o.h || 500, top = g.y0 - 30, bottom = g.y1 + 30, left = g.x0 - 30, right = g.x1 + 30;
  const k = h / (bottom - top), w = Math.ceil((right - left) * k), sw = (o.stroke || 5) / k, dash = (o.dash || 16) / k, gap = (o.gap || 12) / k;
  const dot = outlineDots(ch, 8)[0];
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="${left} ${top} ${right - left} ${bottom - top}" data-lcs-prim="color-glyph" data-lcs-glyph="${ch}" data-lcs-dashed="1" style="display:block"><path d="${g.d}" fill="none" stroke="${INK}" stroke-width="${n1(sw)}" stroke-dasharray="${n1(dash)} ${n1(gap)}" stroke-linecap="round"/><circle cx="${n1(dot[0])}" cy="${n1(dot[1])}" r="${n1(sw * 1.7)}" fill="${INK}"/></svg>`;
  return { svg, w, h };
}
module.exports = { glyph, word, has, SKINS, contours, outlineDots, dashed };
