/**
 * htd-vector.js — How to Draw lessons for the DOTTED-SHAPE pages, drawn from simple shapes (2026-10-13).
 *
 * Why: the shapes face (K-401), base level 1 and memory level 1 print dotted guide shapes on the paper. Fitted to a
 * library drawing (htd-steps.js fitShape) the shapes never coincided with the drawing's lines, so a child who traced
 * them had lines to erase (operator 2026-10-12). These lessons are DRAWN from the shapes: every dotted segment is a
 * line of the finished picture, by construction, and gated.
 *
 * A drawing (data/htdv/src/<key>.js) = { key, parts: [...] } back to front. A part:
 *   { id, step: 1..n, d: <absolute path: M L C Q Z>, kind: 'shape' (white fill, ink line; default)
 *     | 'line' (an open ink stroke) | 'solid' (filled ink: a pupil, a nose) | 'shine' (white, no line: an eye shine),
 *     w: line width in units (default LINE), guide: true (a dotted shape: a step-1 'shape'), major: true (L3 keeps it),
 *     shape: 'circle' | 'oval' | 'triangle' | 'rectangle' | 'half-circle' (what the guide is called — recorded) }
 * compile(src) → the S the pages already consume: { bbox, full, steps:[{d}], shapes:[{kind:'path', d, major, shape}],
 *   lesson:'vector', stats:{ ..., laws } }.
 *
 * THE LAWS (stats.laws; tools/htdv-build.js refuses a drawing that breaks one):
 *   1 guide ⊆ ink     every dotted segment, drawn solid, lies on the finished drawing's ink
 *   2 no erasing      the drawing at step k (only steps ≤ k drawn) ⊆ the finished drawing, every k
 *   3 partition       the steps' ink is exactly the finished drawing (assigned by first appearance)
 *   4 a real shape    ≥ 2 guides; each keeps ≥ 70 % of its outline visible
 */
'use strict';
const L = require('./cbn-lineart.js');
const W = 600, H = 560, U = L.UNIT, PW = L.CW, PH = L.CH;
const LINE = 4.2;          // the outline weight in picture units (measured against the library lessons' ink)
const INK = '#000';

/* ---------- shape helpers (absolute paths, so the sampler stays small) ---------- */
const K = 0.5522847498;
const f = (v) => +v.toFixed(2);
function ellipse(cx, cy, rx, ry, rot = 0) {
  const a = (rot * Math.PI) / 180, c = Math.cos(a), s = Math.sin(a);
  const P = (x, y) => `${f(cx + x * c - y * s)} ${f(cy + x * s + y * c)}`;
  return `M${P(rx, 0)}C${P(rx, ry * K)} ${P(rx * K, ry)} ${P(0, ry)}C${P(-rx * K, ry)} ${P(-rx, ry * K)} ${P(-rx, 0)}` +
    `C${P(-rx, -ry * K)} ${P(-rx * K, -ry)} ${P(0, -ry)}C${P(rx * K, -ry)} ${P(rx, -ry * K)} ${P(rx, 0)}Z`;
}
const circle = (cx, cy, r) => ellipse(cx, cy, r, r);
function rrect(x, y, w, h, r) {
  r = Math.min(r, w / 2, h / 2); const k = r * (1 - K);
  return `M${f(x + r)} ${f(y)}L${f(x + w - r)} ${f(y)}C${f(x + w - k)} ${f(y)} ${f(x + w)} ${f(y + k)} ${f(x + w)} ${f(y + r)}L${f(x + w)} ${f(y + h - r)}` +
    `C${f(x + w)} ${f(y + h - k)} ${f(x + w - k)} ${f(y + h)} ${f(x + w - r)} ${f(y + h)}L${f(x + r)} ${f(y + h)}C${f(x + k)} ${f(y + h)} ${f(x)} ${f(y + h - k)} ${f(x)} ${f(y + h - r)}` +
    `L${f(x)} ${f(y + r)}C${f(x)} ${f(y + k)} ${f(x + k)} ${f(y)} ${f(x + r)} ${f(y)}Z`;
}
/** a polygon with its corners rounded by r (a friendly triangle ear) */
function rpoly(pts, r = 6) {
  const n = pts.length; let d = '';
  for (let i = 0; i < n; i++) {
    const p = pts[i], a = pts[(i - 1 + n) % n], b = pts[(i + 1) % n];
    const t = (q, dist) => { const Lq = Math.hypot(q[0] - p[0], q[1] - p[1]) || 1, k = Math.min(0.45, dist / Lq); return [p[0] + (q[0] - p[0]) * k, p[1] + (q[1] - p[1]) * k]; };
    const s = t(a, r), e = t(b, r);
    d += `${i ? 'L' : 'M'}${f(s[0])} ${f(s[1])}Q${f(p[0])} ${f(p[1])} ${f(e[0])} ${f(e[1])}`;
  }
  return d + 'Z';
}
/** a half-ellipse dome (flat side down): a mushroom cap, a hill */
function dome(cx, by, rx, ry, flat = 0.18) {
  const k = K;
  return `M${f(cx - rx)} ${f(by)}C${f(cx - rx)} ${f(by - ry * k)} ${f(cx - rx * k)} ${f(by - ry)} ${f(cx)} ${f(by - ry)}C${f(cx + rx * k)} ${f(by - ry)} ${f(cx + rx)} ${f(by - ry * k)} ${f(cx + rx)} ${f(by)}` +
    `C${f(cx + rx * 0.6)} ${f(by + ry * flat)} ${f(cx - rx * 0.6)} ${f(by + ry * flat)} ${f(cx - rx)} ${f(by)}Z`;
}

/* ---------- path sampling (M L C Q Z, absolute) ---------- */
function parse(d) {
  const toks = d.match(/[MLCQZ]|-?\d*\.?\d+(?:e-?\d+)?/gi) || [];
  const cmds = []; let i = 0;
  while (i < toks.length) {
    const c = toks[i++]; const n = { M: 2, L: 2, C: 6, Q: 4, Z: 0 }[c.toUpperCase()];
    if (n == null) throw new Error('htd-vector: unsupported path command ' + c);
    if (c !== c.toUpperCase()) throw new Error('htd-vector: relative path command ' + c + ' (write absolute)');
    if (!n) { cmds.push([c]); continue; }
    do { cmds.push([c, ...toks.slice(i, i + n).map(Number)]); i += n; } while (i < toks.length && !/[MLCQZ]/i.test(toks[i]) && c !== 'M');
  }
  return cmds;
}
/** points along a path every ~step units; returns subpaths [{pts, closed}] */
function sample(d, step = 1.5) {
  const out = []; let cur = null, x = 0, y = 0, sx = 0, sy = 0;
  const push = (px, py) => cur.pts.push([px, py]);
  const seg = (fn, len) => { const n = Math.max(2, Math.ceil(len / step)); for (let k = 1; k <= n; k++) push(...fn(k / n)); };
  for (const c of parse(d)) {
    if (c[0] === 'M') { cur = { pts: [[c[1], c[2]]], closed: false }; out.push(cur); x = sx = c[1]; y = sy = c[2]; }
    else if (c[0] === 'L') { const [, X, Y] = c, x0 = x, y0 = y; seg((t) => [x0 + (X - x0) * t, y0 + (Y - y0) * t], Math.hypot(X - x0, Y - y0)); x = X; y = Y; }
    else if (c[0] === 'C') { const [, a, b, cc, dd, X, Y] = c, x0 = x, y0 = y; const len = Math.hypot(a - x0, b - y0) + Math.hypot(cc - a, dd - b) + Math.hypot(X - cc, Y - dd);
      seg((t) => { const u = 1 - t; return [u * u * u * x0 + 3 * u * u * t * a + 3 * u * t * t * cc + t * t * t * X, u * u * u * y0 + 3 * u * u * t * b + 3 * u * t * t * dd + t * t * t * Y]; }, len); x = X; y = Y; }
    else if (c[0] === 'Q') { const [, a, b, X, Y] = c, x0 = x, y0 = y; const len = Math.hypot(a - x0, b - y0) + Math.hypot(X - a, Y - b);
      seg((t) => { const u = 1 - t; return [u * u * x0 + 2 * u * t * a + t * t * X, u * u * y0 + 2 * u * t * b + t * t * Y]; }, len); x = X; y = Y; }
    else if (c[0] === 'Z') { if (Math.hypot(x - sx, y - sy) > 0.01) seg((t) => [x + (sx - x) * t, y + (sy - y) * t], Math.hypot(sx - x, sy - y)); cur.closed = true; x = sx; y = sy; }
  }
  return out;
}

/* ---------- rendering ---------- */
function partSvg(p, opts = {}) {
  const w = (p.w || LINE);
  const ink = opts.ink || INK;
  if (p.kind === 'line') return `<path d="${p.d}" fill="none" stroke="${ink}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/>`;
  if (p.kind === 'solid') return `<path d="${p.d}" fill="${ink}" stroke="${ink}" stroke-width="${p.w || 1}" stroke-linejoin="round"/>`;
  if (p.kind === 'shine') return `<path d="${p.d}" fill="#fff"/>`;
  if (p.kind === 'fill') return `<path d="${p.d}" fill="#fff"/>`;   // a white patch with no line (covers what is behind it, draws nothing)
  return `<path d="${p.d}" fill="#fff" stroke="${ink}" stroke-width="${w}" stroke-linejoin="round"/>`;
}
const svgOf = (parts, extra = '') => `<svg xmlns="http://www.w3.org/2000/svg" width="${PW}" height="${PH}" viewBox="0 0 ${W} ${H}"><rect width="${W}" height="${H}" fill="#fff"/>${parts.map((p) => partSvg(p)).join('')}${extra}</svg>`;
async function raster(svg) {
  const sharp = require('sharp');
  const { data } = await sharp(Buffer.from(svg)).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const m = new Uint8Array(PW * PH);
  for (let i = 0; i < PW * PH; i++) { const l = 0.3 * data[i * 3] + 0.59 * data[i * 3 + 1] + 0.11 * data[i * 3 + 2]; if (l < 128) m[i] = 1; }
  return m;
}
function bboxOf(m) {
  let x0 = PW, y0 = PH, x1 = -1, y1 = -1;
  for (let y = 0; y < PH; y++) for (let x = 0; x < PW; x++) if (m[y * PW + x]) { if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y; }
  return x1 < 0 ? null : [x0 / U, y0 / U, (x1 + 1) / U, (y1 + 1) / U].map((v) => +v.toFixed(1));
}
function maskToPath(m) {
  const bb = bboxOf(m); if (!bb) return '';
  const px = bb.map((v) => Math.round(v * U));
  return L.maskPath((x, y) => x >= 0 && y >= 0 && x < PW && y < PH && m[y * PW + x] === 1, [px[0], px[1], px[2] - 1, px[3] - 1], U, 0.6);
}
const count = (m) => { let n = 0; for (let i = 0; i < m.length; i++) n += m[i]; return n; };

/** the visible runs of a guide's outline: points not hidden under a part drawn in FRONT of it (its fill, minus its line) */
async function visibleContour(parts, gi) {
  const g = parts[gi];
  // only the OTHER step-1 shapes can hide a dotted shape: a later part never covers a line already drawn (law 2), and a
  // muzzle or an eye drawn later INSIDE the shape must not break its dots (the yak's head, visual review 2026-10-13)
  const front = parts.slice(gi + 1).filter((p) => (module.exports.__frontAll || p.step === 1) && p.kind !== 'line' && p.kind !== 'solid' && p.kind !== 'shine');
  let cover = new Uint8Array(PW * PH), inside = cover;
  if (front.length) {
    // the inside of the front parts, drawn black with NO line
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${PW}" height="${PH}" viewBox="0 0 ${W} ${H}"><rect width="${W}" height="${H}" fill="#fff"/>${front.map((p) => `<path d="${p.d}" fill="#000"/>`).join('')}</svg>`;
    const m = await raster(svg);
    inside = m;
    // the front parts' insides GROWN past their own line: a guide arc stops just OUTSIDE the line of the shape in front, so
    // its last dash never pokes into that shape (the visual review saw a tick inside every head at a junction, 2026-10-13)
    cover = L.dilate(m, PW, PH, Math.round((LINE / 2 + 0.8) * U));
  }
  const runs = [];
  for (const sp of sample(g.d, 1)) {
    let run = [];
    const flush = () => { if (run.length >= 24) runs.push(run); run = []; };   // a sliver between two front parts is no shape to follow
    for (const [x, y] of sp.pts) {
      const X = Math.round(x * U), Y = Math.round(y * U);
      const hidden = X >= 0 && Y >= 0 && X < PW && Y < PH && cover[Y * PW + X];
      if (hidden) flush(); else run.push([x, y]);
    }
    flush();
  }
  // law 4 measures the TRUE overlap (points under a front part's inside), not the trimmed dashes
  let total = 0, vis = 0;
  for (const sp of sample(g.d, 1)) for (const [x, y] of sp.pts) { total++; const X = Math.round(x * U), Y = Math.round(y * U); if (!(X >= 0 && Y >= 0 && X < PW && Y < PH && inside[Y * PW + X])) vis++; }
  const d = runs.map((r) => 'M' + r.map(([x, y]) => `${f(x)} ${f(y)}`).join('L')).join('');
  // counted on its own (never from `front`): the step-1 shapes that really overlap this one
  const nFront = parts.slice(gi + 1).filter((p) => p.step === 1 && (p.kind || 'shape') === 'shape').length;
  return { d, share: vis / total, runs: runs.length, nFront };
}

/**
 * compile a drawing → S. Throws on a broken law unless opts.report (the gate's poisons read the laws instead).
 */
async function compile(src, opts = {}) {
  const parts = src.parts.map((p) => ({ kind: 'shape', ...p }));
  const nSteps = Math.max(...parts.map((p) => p.step));
  const finalM = await raster(svgOf(parts));
  const finalGrow = L.dilate(finalM, PW, PH, Math.round(0.6 * U));
  const owner = new Int8Array(PW * PH).fill(-1);
  const laws = { guideInk: 1, erase: [], partition: { missing: 0, extra: 0 }, guides: [] };
  const stepMasks = [];
  for (let k = 1; k <= nSteps; k++) {
    const cm = await raster(svgOf(parts.filter((p) => p.step <= k)));
    let bad = 0; for (let i = 0; i < cm.length; i++) if (cm[i] && !finalGrow[i]) bad++;
    laws.erase.push(bad);
    for (let i = 0; i < cm.length; i++) if (cm[i] && finalM[i] && owner[i] < 0) owner[i] = k - 1;
  }
  for (let k = 0; k < nSteps; k++) { const m = Uint8Array.from(owner, (o) => (o === k ? 1 : 0)); stepMasks.push(m); }
  for (let i = 0; i < finalM.length; i++) if (finalM[i] && owner[i] < 0) laws.partition.missing++;
  // guides
  const shapes = [];
  for (let gi = 0; gi < parts.length; gi++) {
    const g = parts[gi]; if (!g.guide) continue;
    const vc = await visibleContour(parts, gi);
    // law 1: the guide drawn solid (at the guide's own width, 4 units on the page) must lie on the ink
    const gm = await raster(`<svg xmlns="http://www.w3.org/2000/svg" width="${PW}" height="${PH}" viewBox="0 0 ${W} ${H}"><rect width="${W}" height="${H}" fill="#fff"/><path d="${vc.d}" fill="none" stroke="#000" stroke-width="3" stroke-linecap="butt"/></svg>`);
    let on = 0, all = 0; for (let i = 0; i < gm.length; i++) if (gm[i]) { all++; if (finalGrow[i]) on++; }
    const onInk = all ? on / all : 0;
    laws.guides.push({ id: g.id, shape: g.shape || null, share: +vc.share.toFixed(3), onInk: +onInk.toFixed(4), step: g.step, runs: vc.runs, nFront: vc.nFront });
    shapes.push({ kind: 'path', d: vc.d, major: !!g.major, shape: g.shape || null, id: g.id });
  }
  laws.guideInk = laws.guides.length ? Math.min(...laws.guides.map((x) => x.onInk)) : 0;
  const fails = [];
  if (laws.guides.length < 2) fails.push(`${laws.guides.length} guides (needs ≥ 2)`);
  for (const g of laws.guides) {
    if (g.onInk < 0.995) fails.push(`law 1: guide ${g.id} only ${(g.onInk * 100).toFixed(2)} % on the ink`);
    if (g.share < 0.7) fails.push(`law 4: guide ${g.id} only ${(g.share * 100).toFixed(0)} % of its outline visible`);
    if (g.step !== 1) fails.push(`guide ${g.id} is in step ${g.step}, not step 1`);
    if (!g.shape) fails.push(`guide ${g.id} names no shape`);
    if (!g.nFront && g.runs !== 1) fails.push(`law 4: guide ${g.id} has nothing in front of it yet prints in ${g.runs} pieces`);
  }
  laws.erase.forEach((b, k) => { if (b > 40) fails.push(`law 2: step ${k + 1} draws ${b} px the finished drawing does not keep (an erase)`); });
  if (laws.partition.missing) fails.push(`law 3: ${laws.partition.missing} px of ink in no step`);
  if (parts.filter((p) => p.step === 1).some((p) => !p.guide && p.kind === 'shape')) fails.push('step 1 holds a shape that is not a guide (card 1 must show exactly the dotted shapes)');
  if (fails.length && !opts.report) throw new Error(`htd-vector ${src.key}: ` + fails.join('; '));
  const bbox = bboxOf(finalM);
  const total = count(finalM);
  return {
    src: 'htdv/' + src.key, lesson: 'vector', w: W, h: H, bbox, full: maskToPath(finalM),
    steps: stepMasks.map((m) => ({ d: maskToPath(m), share: +(count(m) / total).toFixed(3) })),
    shapes,
    stats: { totalPx: total, missing: laws.partition.missing, extra: 0, dup: 0, nSteps, laws, fails },
  };
}

module.exports = { compile, ellipse, circle, rrect, rpoly, dome, sample, parse, partSvg, svgOf, raster, LINE, W, H };
